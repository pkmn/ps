const {PRNG} = require('./sim');

class FixedRNG extends PRNG {
  constructor(prng, rolls) {
    super([0, 0, 0, 0]);
    this.prng = prng;
    this.rolls = rolls;
    this.decision = 0;
    this.index = 0;
  }

  next(from, to) {
    if (this.index >= this.rolls.length) return this.prng.next(from, to);
    const roll = this.rolls[this.index++];
    const where = locations();
    const locs = where.join(', ');
    if (Array.isArray(roll.key)) {
      if (!roll.key.every(k => where.includes(k))) {
        throw new Error(`Expected roll for (${roll.key.join(', ')}) but got (${locs})`);
      }
    } else if (!where.includes(roll.key)) {
      throw new Error(`Expected roll for (${roll.key}) but got (${locs})`);
    }
    console.debug(`\x1b[1m\x1b[35m${roll.name}\x1b[0m`);
    // DEBUG(new Error().stack);
    let result = roll.value;
    if (from) from = Math.floor(from);
    if (to) to = Math.floor(to);
    if (from === undefined) {
      result = result / 0x100000000;
    } else if (!to) {
      result = Math.floor(result * from / 0x100000000);
    } else {
      result = Math.floor(result * (to - from) / 0x100000000) + from;
    }
    return result;
  }

  randomChance(numerator, denominator) {
    if (this.index >= this.rolls.length) return this.prng.randomChance(numerator, denominator);
		return this.next(denominator) < numerator;
	}

  get startingSeed() {
    throw new Error('Unsupported operation');
  }

  clone() {
    throw new Error('Unsupported operation');
  }

  nextFrame() {
    throw new Error('Unsupported operation');
  }

  makeDecision(fn) {
    fn();
    this.decision++;
    this.index = 0;
  }

  exhausted() {
    return this.decision === this.rolls.length;
  }
}

const METHOD = /^ {4}at ((?:\w|\.)+) /;
const NON_TERMINAL = new Set([
  'FixedRNG.next', 'FixedRNG.randomChance', 'FixedRNG.sample', 'FixedRNG.shuffle',
  'Battle.random', 'Battle.randomChance', 'Battle.sample', 'locations',
]);

function locations() {
  const results = [];
  let last = undefined;
  for (const line of new Error().stack.split('\n').slice(1)) {
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

module.exports = {FixedRNG};