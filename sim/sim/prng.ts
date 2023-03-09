/**
 * PRNG
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This simulates the on-cartridge PRNG used in the real games.
 *
 * In addition to potentially allowing us to read replays from in-game,
 * this also makes it possible to record an "input log" (a seed +
 * initial teams + move/switch decisions) and "replay" a simulation to
 * get the same result.
 *
 * @license MIT license
 */

/** 64-bit big-endian [high -> low] int */
export type PRNGSeed = [number, number, number, number];

 // DEBUG
const ROOT = require('path').resolve(__dirname, '..', '..', '..') + '/';
const shorten = (s: string) =>  s.replaceAll('at ', '@ ').replaceAll(ROOT, '');
const serialize = (seed: PRNGSeed) => `0x${toBigInt(seed).toString(16).toUpperCase()}`;
const toBigInt = (seed: PRNGSeed) =>
  ((BigInt(seed[0]) << 48n) | (BigInt(seed[1]) << 32n) |
   (BigInt(seed[2]) << 16n) | BigInt(seed[3]));

// DEBUG

/**
 * A PRNG intended to emulate the on-cartridge PRNG for Gen 5 with a 64-bit
 * initial seed.
 */
export class PRNG {
	readonly initialSeed: PRNGSeed;
	seed: PRNGSeed;
	/** Creates a new source of randomness for the given seed. */
	constructor(seed: PRNGSeed | null = null) {
		if (!seed) seed = PRNG.generateSeed();
		this.initialSeed = seed.slice() as PRNGSeed; // make a copy
		this.seed = seed.slice() as PRNGSeed;
	}

	/**
	 * Getter to the initial seed.
	 *
	 * This should be considered a hack and is only here for backwards compatibility.
	 */
	get startingSeed(): PRNGSeed {
		return this.initialSeed;
	}

	/**
	 * Creates a clone of the current PRNG.
	 *
	 * The new PRNG will have its initial seed set to the seed of the current instance.
	 */
	clone(): PRNG {
		return new PRNG(this.seed);
	}

	/**
	 * Retrieves the next random number in the sequence.
	 * This function has three different results, depending on arguments:
	 * - random() returns a real number in [0, 1), just like Math.random()
	 * - random(n) returns an integer in [0, n)
	 * - random(m, n) returns an integer in [m, n)
	 * m and n are converted to integers via Math.floor. If the result is NaN, they are ignored.
	 */
	next(from?: number, to?: number): number {
		this.seed = this.nextFrame(this.seed); // Advance the RNG
		let result = (this.seed[0] << 16 >>> 0) + this.seed[1]; // Use the upper 32 bits
		const original = `0x${(result).toString(16).padStart(8, '0').toUpperCase()}`; // DEBUG
		if (from) from = Math.floor(from);
		if (to) to = Math.floor(to);
		if (from === undefined) {
			result = result / 0x100000000;
		} else if (!to) {
			result = Math.floor(result * from / 0x100000000);
		} else {
			result = Math.floor(result * (to - from) / 0x100000000) + from;
		}
		// DEBUG
		// @ts-ignore
		global.original = original;
		const stack = new Error().stack!;
		if (!stack.includes('random-player-ai') && !stack.includes('exhaustive-runner') && !(stack.includes('PRNG.randomChance') || stack.includes('FixedRNG.randomChance'))) {
			for (const line of stack.split('\n').slice(1)) {
				const l = line.trim();
				if (l.startsWith('at PRNG') || l.startsWith('at FixedRNG') || /^at Battle\.(random|sample)/.test(l)) continue;
				const fn = from === undefined ? '\x1b[35mnext()' :
									to === undefined ? `\x1b[35mnext(\x1b[33m${from}\x1b[35m)` :
									`\x1b[35mnext(\x1b[33m${from}\x1b[35m,\x1b[33m ${to}\x1b[35m)`;
				console.debug(`${where()}${fn} = \x1b[33m${original}\x1b[35m (\x1b[33m${result}\x1b[35m)\x1b[0m \x1b[2m${shorten(l)}\x1b[0m`);
				break;
			}
		}
		// DEBUG

		return result;
	}

	/**
	 * Flip a coin (two-sided die), returning true or false.
	 *
	 * This function returns true with probability `P`, where `P = numerator
	 * / denominator`. This function returns false with probability `1 - P`.
	 *
	 * The numerator must be a non-negative integer (`>= 0`).
	 *
	 * The denominator must be a positive integer (`> 0`).
	 */
	randomChance(numerator: number, denominator: number): boolean {
		const result = this.next(denominator);
		// DEBUG
		// @ts-ignore
		const original = global.original;
		const stack = new Error().stack!;
		if (!stack.includes('random-player-ai') && !stack.includes('exhaustive-runner')) {
			for (const line of stack.split('\n').slice(1)) {
				const l = line.trim();
				if (l.startsWith('at PRNG') || l.startsWith('at FixedRNG') || /^at Battle\.(random|sample)/.test(l)) continue;
				console.debug(`${where()}\x1b[35mrandomChance(\x1b[33m${numerator}\x1b[35m,\x1b[33m ${denominator}\x1b[35m) = \x1b[33m${original}\x1b[35m (\x1b[33m${result}\x1b[35m)\x1b[0m \x1b[2m${shorten(l)}\x1b[0m`);
				break;
			}
		}
		// DEBUG
		return result < numerator;
	}

	/**
	 * Return a random item from the given array.
	 *
	 * This function chooses items in the array with equal probability.
	 *
	 * If there are duplicate items in the array, each duplicate is
	 * considered separately. For example, sample(['x', 'x', 'y']) returns
	 * 'x' 67% of the time and 'y' 33% of the time.
	 *
	 * The array must contain at least one item.
	 *
	 * The array must not be sparse.
	 */
	sample<T>(items: readonly T[]): T {
		if (items.length === 0) {
			throw new RangeError(`Cannot sample an empty array`);
		}
		const index = this.next(items.length);
		const item = items[index];
		if (item === undefined && !Object.prototype.hasOwnProperty.call(items, index)) {
			throw new RangeError(`Cannot sample a sparse array`);
		}
		return item;
	}

	/**
	 * A Fisher-Yates shuffle. This is how the game resolves speed ties.
	 *
	 * At least according to V4 in
	 * https://github.com/smogon/pokemon-showdown/issues/1157#issuecomment-214454873
	 */
	shuffle<T>(items: T[], start = 0, end: number = items.length) {
		while (start < end - 1) {
			const nextIndex = this.next(start, end);
			if (start !== nextIndex) {
				[items[start], items[nextIndex]] = [items[nextIndex], items[start]];
			}
			start++;
		}
	}

	/**
	 * Calculates `a * b + c` (with 64-bit 2's complement integers)
	 *
	 * If you've done long multiplication, this is the same thing.
	 */
	multiplyAdd(a: PRNGSeed, b: PRNGSeed, c: PRNGSeed) {
		const out: PRNGSeed = [0, 0, 0, 0];
		let carry = 0;

		for (let outIndex = 3; outIndex >= 0; outIndex--) {
			for (let bIndex = outIndex; bIndex < 4; bIndex++) {
				const aIndex = 3 - (bIndex - outIndex);

				carry += a[aIndex] * b[bIndex];
			}
			carry += c[outIndex];

			out[outIndex] = carry & 0xFFFF;
			carry >>>= 16;
		}

		return out;
	}

	/**
	 * The RNG is a Linear Congruential Generator (LCG) in the form: `x_{n + 1} = (a x_n + c) % m`
	 *
	 * Where: `x_0` is the seed, `x_n` is the random number after n iterations,
	 *
	 * ````
	 * a = 0x5D588B656C078965
	 * c = 0x00269EC3
	 * m = 2^64
	 * ````
	 */
	nextFrame(seed: PRNGSeed, framesToAdvance = 1): PRNGSeed {
		const before = seed;
		const a: PRNGSeed = [0x5D58, 0x8B65, 0x6C07, 0x8965];
		const c: PRNGSeed = [0, 0, 0x26, 0x9EC3];

		for (let i = 0; i < framesToAdvance; i++) {
			seed = this.multiplyAdd(seed, a, c);
		}

		if (!(new Error().stack)?.includes('PlayerAI')) {
			DEBUG(`[${before.join(', ')}] (${serialize(before)}) -> [${seed.join(', ')}] (${serialize(seed)})`);
		}
		return seed;
	}

	static generateSeed() {
		return [
			Math.floor(Math.random() * 0x10000),
			Math.floor(Math.random() * 0x10000),
			Math.floor(Math.random() * 0x10000),
			Math.floor(Math.random() * 0x10000),
		] as PRNGSeed;
	}
}

// The following commented-out function is designed to emulate the on-cartridge
// PRNG for Gens 3 and 4, as described in
// https://www.smogon.com/ingame/rng/pid_iv_creation#pokemon_random_number_generator
// This RNG uses a 32-bit initial seed
// m and n are converted to integers via Math.floor. If the result is NaN, they
// are ignored.
/*
random(m: number, n: number) {
	this.seed = (this.seed * 0x41C64E6D + 0x6073) >>> 0; // truncate the result to the last 32 bits
	let result = this.seed >>> 16; // the first 16 bits of the seed are the random value
	m = Math.floor(m)
	n = Math.floor(n)
	return (m ? (n ? (result % (n - m)) + m : result % m) : result / 0x10000)
}
*/

// DEBUG

const METHOD = /^ {4}at ((?:\w|\.)+) /;
const NON_TERMINAL = new Set([
	'PRNG.next', 'PRNG.randomChance', 'PRNG.sample', 'PRNG.shuffle',
  'FixedRNG.next', 'FixedRNG.randomChance', 'FixedRNG.sample', 'FixedRNG.shuffle',
  'Battle.random', 'Battle.randomChance', 'Battle.sample', 'locations', 'where',
]);

function locations() {
  const results = [];
  let last = undefined;
  for (const line of new Error().stack!.split('\n').slice(1)) {
    const match = METHOD.exec(line);
    if (!match) continue;
    const m = match[1];
    if (NON_TERMINAL.has(m)) {
      last = m;
      continue;
    }

    if (!results.length && last) results.push(last);
    results.push(m);
  }
  return results;
}

const ROLLS = {
	HIT_MISS: [
		'Battle.randomChance, BattleActions.tryMoveHit, BattleActions.useMove, BattleActions.runMove',
		'Battle.randomChance, BattleActions.tryMoveHit, BattleActions.useMove, Battle.onHit, Battle.singleEvent, BattleActions.moveHit', // MM
		'Battle.randomChance, BattleActions.tryMoveHit, BattleActions.useMoveInner, BattleActions.useMove',
	],
	CRITICAL: [
		'Battle.randomChance, BattleActions.getDamage, Battle.onTryHit, Battle.runEvent',
		'Battle.randomChance, BattleActions.getDamage, BattleActions.moveHit, BattleActions.tryMoveHit'
	],
	DAMAGE: [
		'Battle.random, BattleActions.getDamage, Battle.onTryHit, Battle.runEvent',
		'Battle.random, BattleActions.getDamage, BattleActions.moveHit, BattleActions.tryMoveHit',
	],
	SRF_RES: 'Battle.sample, Side.randomFoe, Battle.getRandomTarget, BattleQueue.resolveAction',
	SRF_RUN: 'Battle.sample, Side.randomFoe, Battle.getRandomTarget, Battle.getTarget, BattleActions.runMove',
	SRF_USE: 'Battle.sample, Side.randomFoe, Battle.getRandomTarget, BattleActions.useMove, Battle.onHit',
	SS_MOD: 'Battle.speedSort, Battle.runEvent, Pokemon.setStatus, BattleActions.moveHit, BattleActions.tryMoveHit',
	SS_RES: 'Battle.speedSort, Battle.residualEvent, Battle.runAction, Battle.go',
	SS_RUN: 'Battle.speedSort, Battle.runEvent, BattleActions.runMove, Battle.runAction',
	SS_EACH: 'Battle.speedSort, Battle.eachEvent, Battle.runAction, Battle.go',
	INS: 'Battle.random, BattleQueue.insertChoice, BattleActions.switchIn, Battle.runAction',
	TIE: 'Battle.speedSort, BattleQueue.sort, Battle.commitDecisions, Battle.makeChoices',
	GLM: 'Battle.speedSort, Battle.runEvent, Pokemon.getLockedMove',
	QKC: 'Battle.randomChance, Battle.nextTurn, Battle.go',
	GMF: 'Battle.random, new, new, Battle.setPlayer, startBattle',
};

function where() {
	const locs = locations().join(', ');
	for (const name in ROLLS) {
		const rolls = ROLLS[name as keyof typeof ROLLS];
		const match = Array.isArray(rolls) ? rolls.some((roll: string) => locs.includes(roll)) : locs.includes(rolls);
		if (match) return `\x1b[1m\x1b[35m${name}\x1b[0m `;
	}
	const stack = new Error().stack!.split('\n').slice(4).join('\n');
	console.debug(`\x1b[35m(${locs})\n${shorten(stack)}\x1b[0m`);
	return '';
}
// DEBUG