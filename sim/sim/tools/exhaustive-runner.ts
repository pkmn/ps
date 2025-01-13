import {ObjectReadWriteStream} from '../../lib/streams';
import {ID} from '../exported-global-types';
import {Dex, toID} from '../dex';
import {PRNG, PRNGSeed} from '../prng';
import {RandomPlayerAI} from './random-player-ai';
import {AIOptions, Runner, RunnerOptions} from './runner';

interface Pools {
	pokemon: Pool;
	items: Pool;
	abilities: Pool;
	moves: Pool;
}

export interface ExhaustiveRunnerOptions {
	format: string;
	cycles?: number;
	prng?: PRNG | PRNGSeed | null;
	log?: boolean;
	maxGames?: number;
	maxFailures?: number;
	dual?: boolean | 'debug';
	possible?: ExhaustiveRunnerPossibilities;
	runner?: (options: RunnerOptions) => Promise<void>;
	cmd?: (cycles: number, format: string, seed: string) => string;
}

export interface ExhaustiveRunnerPossibilities {
	pokemon?: ID[];
	items?: ID[];
	abilities?: ID[];
	moves?: ID[];
}

export interface ExhaustiveRunnerUsageTracker {
	pokemon(id: ID): void;
	item(id: ID): void;
	ability(id: ID): void;
	move(id: ID): void;
}

export class ExhaustiveRunner {
	static readonly DEFAULT_CYCLES = 1;
	static readonly MAX_FAILURES = 10;

	// TODO: Add triple battles once supported by the AI.
	static readonly FORMATS = [
		'gen9customgame', 'gen9doublescustomgame',
		'gen8customgame', 'gen8doublescustomgame',
		'gen7customgame', 'gen7doublescustomgame',
		'gen6customgame', 'gen6doublescustomgame',
		'gen5customgame', 'gen5doublescustomgame',
		'gen4customgame', 'gen4doublescustomgame',
		'gen3customgame', 'gen3doublescustomgame',
		'gen2customgame',
		'gen1customgame',
	];

	private readonly format: string;
	private readonly cycles: number;
	private readonly prng: PRNG;
	private readonly log: boolean;
	private readonly maxGames?: number;
	private readonly maxFailures?: number;
	private readonly dual: boolean | 'debug';
	private readonly possible?: ExhaustiveRunnerPossibilities;

	private readonly runner: (options: RunnerOptions) => Promise<void>;
	private readonly cmd: (cycles: number, format: string, seed: string) => string;

	private failures: number;
	private games: number;
	private needsClear: boolean;

	constructor(options: ExhaustiveRunnerOptions) {
		this.format = options.format;
		this.cycles = options.cycles || ExhaustiveRunner.DEFAULT_CYCLES;
		this.prng = (options.prng && !Array.isArray(options.prng)) ?
			options.prng : new PRNG(options.prng);
		this.log = !!options.log;
		this.maxGames = options.maxGames;
		this.maxFailures = options.maxFailures || ExhaustiveRunner.MAX_FAILURES;
		this.dual = options.dual || false;
		this.runner = options.runner || ((o: RunnerOptions) => new Runner(o).run());
		this.possible = options.possible;
		this.cmd = options.cmd || ((cycles: number, format: string, seed: string) =>
			`node tools/simulate exhaustive --cycles=${cycles} --format=${format} --seed=${seed}`);

		this.failures = 0;
		this.games = 0;
		this.needsClear = false;
	}

	async run() {
		const dex = Dex.forFormat(this.format);
		dex.loadData(); // FIXME: This is required for `dex.gen` to be set properly...

		const seed = this.prng.getSeed();
		const pools = this.createPools(dex);
		const usage: ExhaustiveRunnerUsageTracker = {
			pokemon: id => pools.pokemon.markUsed(id),
			item: id => pools.items.markUsed(id),
			ability: id => pools.abilities.markUsed(id),
			move: id => pools.moves.markUsed(id),
		};
		const createAI = (s: ObjectReadWriteStream<string>, o: AIOptions) => new CoordinatedPlayerAI(s, o, pools);
		const generator = new TeamGenerator(dex, this.prng, pools, ExhaustiveRunner.getSignatures(dex, pools));

		const log = console.log;
		const error = console.error;
		try {
			const self = this;
			console.log = (...s) => {
				self.maybeClear();
				log(...s);
			};
			console.error = (...s) => {
				self.maybeClear();
				error(...s);
			};
			do {
				this.games++;
				try {
					// We run these sequentially instead of async so that the team generator
					// and the AI can coordinate usage properly.
					await this.runner({
						prng: this.prng,
						p1options: {team: generator.generate(), createAI},
						p2options: {team: generator.generate(), createAI},
						format: this.format,
						dual: this.dual,
						error: true,
						usage,
					} as any);

					if (this.log) this.logProgress(dex, pools);
				} catch (err) {
					this.failures++;
					console.error(
						`Run \`${this.cmd(this.cycles, this.format, seed.join())}\`:\n`,	err,
					);
				}
			} while ((!this.maxGames || this.games < this.maxGames) &&
						(!this.maxFailures || this.failures < this.maxFailures) &&
						generator.exhausted < this.cycles);

			return this.failures;
		} finally {
			console.log = log;
			console.error = error;
			this.maybeClear();
		}
	}

	private maybeClear() {
		if (this.needsClear) {
			process.stdout.write('\n');
			this.needsClear = false;
		}
	}

	private createPools(dex: typeof Dex): Pools {
		return {
			pokemon: new Pool(this.possible?.pokemon ??
				ExhaustiveRunner.onlyValid(dex.gen, dex.data.Pokedex, p => dex.species.get(p), (_, p) =>
					(p.name !== 'Pichu-Spiky-eared' && p.name.substr(0, 8) !== 'Pikachu-') &&
						p.name !== 'Greninja-Bond'), this.prng),
			items: new Pool(this.possible?.items ??
				ExhaustiveRunner.onlyValid(dex.gen, dex.data.Items, i => dex.items.get(i)), this.prng),
			abilities: new Pool(this.possible?.abilities ??
				ExhaustiveRunner.onlyValid(dex.gen, dex.data.Abilities, a => dex.abilities.get(a)), this.prng),
			moves: new Pool(this.possible?.moves ??
				ExhaustiveRunner.onlyValid(dex.gen, dex.data.Moves, m => dex.moves.get(m), m =>
					(!['struggle', 'revivalblessing'].includes(m) &&
						(m === 'hiddenpower' || m.substr(0, 11) !== 'hiddenpower'))), this.prng),
		};
	}

	private logProgress(dex: typeof Dex, p: Pools) {
		// `\r` = return to the beginning of the line
		// `\x1b[k` (`\e[K`) = clear all characters from cursor position to EOL
		if (this.games > 1) process.stdout.write('\r\x1b[K');

		const name = this.format.slice(0, this.format.indexOf('customgame'));
		const msg = [`\x1b[1m[${name}]\x1b[22m P:${p.pokemon}`];
		if (dex.gen >= 2) msg.push(`I:${p.items}`);
		if (dex.gen >= 3) msg.push(`A:${p.abilities}`);
		msg.push(`M:${p.moves} = ${this.games}`);

		// Deliberately don't print a `\n` character so that we can overwrite
		process.stdout.write(`\x1b[35m${msg.join(' ')}\x1b[0m`);
		this.needsClear = true;
	}

	private static getSignatures(dex: typeof Dex, pools: Pools): Map<string, {item: string, move?: string}[]> {
		const signatures = new Map();
		for (const id of pools.items.possible) {
			const item = dex.data.Items[id];
			if (item.megaEvolves) {
				const pokemon = toID(item.megaEvolves);
				const combo = {item: id};
				let combos = signatures.get(pokemon);
				if (!combos) {
					combos = [];
					signatures.set(pokemon, combos);
				}
				combos.push(combo);
			} else if (item.itemUser) {
				for (const user of item.itemUser) {
					const pokemon = toID(user);
					const combo: {item: string, move?: string} = {item: id};
					if (item.zMoveFrom) combo.move = toID(item.zMoveFrom);
					let combos = signatures.get(pokemon);
					if (!combos) {
						combos = [];
						signatures.set(pokemon, combos);
					}
					combos.push(combo);
				}
			}
		}
		return signatures;
	}

	private static onlyValid<T>(
		gen: number, obj: {[key: string]: T}, getter: (k: string) => AnyObject,
		additional?: (k: string, v: AnyObject) => boolean, nonStandard?: boolean
	) {
		return Object.keys(obj).filter(k => {
			const v = getter(k);
			return v.gen <= gen &&
				(!v.isNonstandard || !!nonStandard) &&
				(!additional || additional(k, v));
		});
	}
}

// Generates random teams of pokemon suitable for use in custom games (ie. without team
// validation). Coordinates with the CoordinatedPlayerAI below through Pools to ensure as
// many different options as possible get exercised in battle.
class TeamGenerator {
	// By default, the TeamGenerator generates sets completely at random which unforunately means
	// certain signature combinations (eg. Mega Stone/Z Moves which only work for specific Pokemon)
	// are unlikely to be chosen. To combat this, we keep a mapping of these combinations and some
	// fraction of the time when we are generating sets for these particular Pokemon we give them
	// the combinations they need to exercise the simulator more thoroughly.
	static readonly COMBO = 0.5;

	private readonly dex: typeof Dex;
	private readonly prng: PRNG;
	private readonly pools: Pools;
	private readonly signatures: Map<string, {item: string, move?: string}[]>;
	private readonly natures: readonly string[];

	constructor(
		dex: typeof Dex, prng: PRNG | PRNGSeed | null, pools: Pools,
		signatures: Map<string, {item: string, move?: string}[]>
	) {
		this.dex = dex;
		this.prng = prng && !Array.isArray(prng) ? prng : new PRNG(prng);
		this.pools = pools;
		this.signatures = signatures;

		this.natures = Object.keys(this.dex.data.Natures);
	}

	get exhausted() {
		const exhausted = [this.pools.pokemon.exhausted, this.pools.moves.exhausted];
		if (this.dex.gen >= 2) exhausted.push(this.pools.items.exhausted);
		if (this.dex.gen >= 3) exhausted.push(this.pools.abilities.exhausted);
		return Math.min.apply(null, exhausted);
	}

	generate() {
		const team: PokemonSet[] = [];
		for (const pokemon of this.pools.pokemon.next(6)) {
			const species = this.dex.species.get(pokemon);
			const randomEVs = () => this.prng.random(253);
			const randomIVs = () => this.prng.random(32);

			let item;
			const moves = [];
			const combos = this.signatures.get(species.id);
			if (combos && this.prng.random() > TeamGenerator.COMBO) {
				const combo = this.prng.sample(combos);
				item = combo.item;
				if (combo.move) moves.push(combo.move);
			} else {
				item = this.dex.gen >= 2 ? this.pools.items.next() : '';
			}

			team.push({
				name: species.baseSpecies,
				species: species.name,
				gender: species.gender,
				item,
				ability: this.dex.gen >= 3 ? this.pools.abilities.next() : 'None',
				moves: moves.concat(...this.pools.moves.next(4 - moves.length)),
				evs: {
					hp: randomEVs(),
					atk: randomEVs(),
					def: randomEVs(),
					spa: randomEVs(),
					spd: randomEVs(),
					spe: randomEVs(),
				},
				ivs: {
					hp: randomIVs(),
					atk: randomIVs(),
					def: randomIVs(),
					spa: randomIVs(),
					spd: randomIVs(),
					spe: randomIVs(),
				},
				nature: this.prng.sample(this.natures),
				level: this.prng.random(50, 100),
				happiness: this.prng.random(256),
				shiny: this.prng.randomChance(1, 1024),
			});
		}
		return team;
	}
}

class Pool {
	readonly possible: string[];

	private readonly prng: PRNG;

	private unused: Set<string>;
	private filled: Set<string> | undefined;
	private filler: string[] | undefined;
	private iter: (Iterator<string> & {done?: boolean}) | undefined;

	exhausted: number;

	constructor(possible: string[], prng: PRNG) {
		this.possible = possible;
		this.prng = prng;
		this.exhausted = 0;
		this.unused = new Set();
	}

	toString() {
		return `${this.exhausted} (${this.unused.size}/${this.possible.length})`;
	}

	private reset() {
		if (this.filled) this.exhausted++;

		this.iter = undefined;
		this.unused = new Set(this.shuffle(this.possible));
		if (this.possible.length && this.filled) {
			for (const used of this.filled) {
				this.unused.delete(used);
			}
			this.filled = new Set();
			if (!this.unused.size) this.reset();
		} else {
			this.filled = new Set();
		}
		this.filler = this.possible.slice();
		// POSTCONDITION: this.unused.size === this.possible.length
		// POSTCONDITION: this.filler.length > 0
		// POSTCONDITION: this.filled.size === 0
		// POSTCONDITION: this.iter === undefined
	}

	private shuffle<T>(arr: T[]): T[] {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = this.prng.random(i + 1);
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	wasUsed(k: string) {
		// NOTE: We are intentionally clearing our iterator even though `unused`
		// hasn't been modified, see explanation below.
		this.iter = undefined;
		return !this.unused.has(k);
	}

	markUsed(k: string) {
		this.iter = undefined;
		this.unused.delete(k);
	}

	next(): string;
	next(num: number): string[];
	next(num?: number): string | string[] {
		if (!num) return this.choose();
		const chosen = [];
		for (let i = 0; i < num; i++) {
			chosen.push(this.choose());
		}
		return chosen;
	}

	// Returns the next option in our set of unused options which were shuffled
	// before insertion so as to come out in random order. The iterator is
	// reset when the pools are manipulated by the CombinedPlayerAI (`markUsed`
	// as it mutates the set, but also `wasUsed` because resetting the
	// iterator isn't so much 'marking it as invalid' as 'signalling that we
	// should move the unused options to the top again').
	//
	// As the pool of options dwindles, we run into scenarios where `choose`
	// will keep returning the same options. This helps ensure they get used,
	// but having a game with every Pokemon having the same move or ability etc
	// is less realistic, so instead we 'fill' out the remaining choices during a
	// generator round (ie. until our iterator gets invalidated during gameplay).
	//
	// The 'filler' choices are tracked in `filled` to later subtract from the next
	// exhaustion cycle of this pool, but in theory we could be so unlucky that
	// we loop through our fillers multiple times while dealing with a few stubborn
	// remaining options in `unused`, therefore undercounting our `exhausted` total,
	// but this is considered to be unlikely enough that we don't care (and
	// `exhausted` is a lower bound anyway).
	private choose() {
		if (!this.unused.size) this.reset();

		if (this.iter) {
			if (!this.iter.done) {
				const next = this.iter.next();
				this.iter.done = next.done;
				if (!next.done) return next.value;
			}
			return this.fill();
		}

		this.iter = this.unused.values();
		const next = this.iter.next();
		this.iter.done = next.done;
		// this.iter.next() must have a value (!this.iter.done) because this.unused.size > 0
		// after this.reset(), and the only places that mutate this.unused clear this.iter.
		return next.value;
	}

	private fill() {
		let length = this.filler!.length;
		if (!length) {
			this.filler = this.possible.slice();
			length = this.filler.length;
		}
		const index = this.prng.random(length);
		const element = this.filler![index];
		this.filler![index] = this.filler![length - 1];
		this.filler!.pop();
		this.filled!.add(element);
		return element;
	}
}

// Random AI which shares Pools with the TeamGenerator to coordinate creating battle simulations
// that test out as many different Pokemon/Species/Items/Moves as possible. The logic is still
// random, so it's not going to optimally use as many new effects as would be possible, but it
// should exhaust its pools much faster than the naive RandomPlayerAI alone.
//
// NOTE: We're tracking 'usage' when we make the choice and not what actually gets used in Battle.
// These can differ in edge cases and so its possible we report that we've 'used' every option
// when we haven't (for example, we may switch in a Pokemon with an ability, but we're not
// guaranteeing the ability activates, etc).
class CoordinatedPlayerAI extends RandomPlayerAI {
	private readonly pools: Pools;

	constructor(playerStream: ObjectReadWriteStream<string>, options: AIOptions, pools: Pools) {
		super(playerStream, options);
		this.pools = pools;
	}

	protected chooseTeamPreview(team: AnyObject[]): string {
		return `team ${this.choosePokemon(team.map((p, i) => ({slot: i + 1, pokemon: p}))) || 1}`;
	}

	protected chooseMove(active: AnyObject, moves: {choice: string, move: AnyObject}[]): string {
		this.markUsedIfGmax(active);
		// Prefer to use a move which hasn't been used yet.
		for (const {choice, move} of moves) {
			const id = this.fixMove(move);
			if (!this.pools.moves.wasUsed(id)) {
				this.pools.moves.markUsed(id);
				return choice;
			}
		}
		return super.chooseMove(active, moves);
	}

	protected chooseSwitch(active: AnyObject | undefined, switches: {slot: number, pokemon: AnyObject}[]): number {
		this.markUsedIfGmax(active);
		return this.choosePokemon(switches) || super.chooseSwitch(active, switches);
	}

	private choosePokemon(choices: {slot: number, pokemon: AnyObject}[]) {
		// Prefer to choose a Pokemon that has a species/ability/item/move we haven't seen yet.
		for (const {slot, pokemon} of choices) {
			const species = toID(pokemon.details.split(',')[0]);
			if (!this.pools.pokemon.wasUsed(species) ||
					!this.pools.abilities.wasUsed(pokemon.baseAbility) ||
					!this.pools.items.wasUsed(pokemon.item) ||
					pokemon.moves.some((m: AnyObject) => !this.pools.moves.wasUsed(this.fixMove(m)))) {
				this.pools.pokemon.markUsed(species);
				this.pools.abilities.markUsed(pokemon.baseAbility);
				this.pools.items.markUsed(pokemon.item);
				return slot;
			}
		}
	}

	// The move options provided by the simulator have been converted from the name
	// which we're tracking, so we need to convert them back.
	private fixMove(m: AnyObject) {
		const id = toID(m.move);
		if (id.startsWith('return')) return 'return';
		if (id.startsWith('frustration')) return 'frustration';
		if (id.startsWith('hiddenpower')) return 'hiddenpower';
		return id;
	}

	// Gigantamax Pokemon need to be special cased for tracking because the current
	// tracking only works if you can switch in a Pokemon.
	private markUsedIfGmax(active: AnyObject | undefined) {
		if (active && !active.canDynamax && active.maxMoves && active.maxMoves.gigantamax) {
			this.pools.pokemon.markUsed(toID(active.maxMoves.gigantamax));
		}
	}
}
