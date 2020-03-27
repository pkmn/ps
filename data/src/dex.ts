import {
  BoostsTable,
  StatsTable,
  GenerationNum,
  ID,
  GenderName,
  MoveCategory,
  MoveTarget,
  EvoType,
  StatName,
  TypeName,
  Nonstandard,
} from '@pkmn/types';

import * as AbilitiesJSON from './data/abilities.json';
import * as AliasesJSON from './data/aliases.json';
import * as ItemsJSON from './data/items.json';
import * as MovesJSON from './data/moves.json';
import * as SpeciesJSON from './data/species.json';
import * as TypesJSON from './data/types.json';
import * as FormatsDataJSON from './data/formats-data.json';

export interface EffectData {
	id: string;
	name: string;
	num: number;
	affectsFainted?: boolean;
	counterMax?: number;
	desc?: string;
	drain?: number[]; // [number, number];
	duration?: number;
	effect?: Partial<PureEffect>;
	effectType?: string;
	infiltrates?: boolean;
	isNonstandard?: Nonstandard | null;
	isUnreleased?: boolean | 'Past';
	isZ?: boolean | string;
	isMax?: boolean | string;
	noCopy?: boolean;
	recoil?: number[]; // [number, number];
	secondary?: SecondaryEffect | null;
	secondaries?: SecondaryEffect[] | null;
	self?: SelfEffect | null;
	shortDesc?: string;
	status?: string;
	weather?: string;
}

export interface SecondaryEffect {
	chance?: number;
	ability?: Ability;
	boosts?: Partial<BoostsTable>;
	dustproof?: boolean;
	kingsrock?: boolean;
	self?: SelfEffect;
	status?: string;
	volatileStatus?: string;
}

export interface SelfEffect {
	boosts?: Partial<BoostsTable>;
	chance?: number;
	pseudoWeather?: string;
	sideCondition?: string;
	slotCondition?: string;
	terrain?: string;
	volatileStatus?: string;
	weather?: string;
}

export interface AbilityData extends EffectData {
	rating: number;
	isUnbreakable?: boolean;
	suppressWeather?: boolean;
}

export interface FlingData {
	basePower: number;
	status?: string;
	volatileStatus?: string;
}

export interface ItemData extends EffectData {
	gen: GenerationNum;
	fling?: FlingData;
	forcedForme?: string;
	ignoreKlutz?: boolean;
	isBerry?: boolean;
	isChoice?: boolean;
	isGem?: boolean;
	isPokeball?: boolean;
	megaStone?: string;
	megaEvolves?: string;
	naturalGift?: {basePower: number, type: string};
	onDrive?: string;
	onMemory?: string;
	onPlate?: string;
	spritenum?: number;
	zMove?: string | true;
	zMoveFrom?: string;
	zMoveType?: string;
	itemUser?: string[];
	boosts?: Partial<BoostsTable> | false;
}

export interface MoveFlags {
	authentic?: 1 | 0;
	bite?: 1 | 0;
	bullet?: 1 | 0;
	charge?: 1 | 0;
	contact?: 1 | 0;
	dance?: 1 | 0;
	defrost?: 1 | 0;
	distance?: 1 | 0;
	gravity?: 1 | 0;
	heal?: 1 | 0;
	mirror?: 1 | 0;
	mystery?: 1 | 0;
	nonsky?: 1 | 0;
	powder?: 1 | 0;
	protect?: 1 | 0;
	pulse?: 1 | 0;
	punch?: 1 | 0;
	recharge?: 1 | 0;
	reflectable?: 1 | 0;
	snatch?: 1 | 0;
	sound?: 1 | 0;
}

export interface MoveData extends EffectData {
	accuracy: true | number;
	basePower: number;
	category: MoveCategory;
	flags: MoveFlags;
	pp: number;
	priority: number;
	target: MoveTarget;
	type: string;
	alwaysHit?: boolean;
	baseMoveType?: string;
	basePowerModifier?: number;
	boosts?: Partial<BoostsTable> | false;
	breaksProtect?: boolean;
	contestType?: string;
	critModifier?: number;
	critRatio?: number;
	damage?: number | 'level' | false | null;
	defensiveCategory?: MoveCategory;
	forceSwitch?: boolean;
	hasCustomRecoil?: boolean;
	heal?: number[] | null;
	ignoreAbility?: boolean;
	ignoreAccuracy?: boolean;
	ignoreDefensive?: boolean;
	ignoreEvasion?: boolean;
	ignoreImmunity?: boolean | {[k: string]: boolean};
	ignoreNegativeOffensive?: boolean;
	ignoreOffensive?: boolean;
	ignorePositiveDefensive?: boolean;
	ignorePositiveEvasion?: boolean;
	isSelfHit?: boolean;
	isFutureMove?: boolean;
	isViable?: boolean;
	isMax?: boolean | string;
	mindBlownRecoil?: boolean;
	multiaccuracy?: boolean;
	multihit?: number | number[];
	multihitType?: string;
	noDamageVariance?: boolean;
	noFaint?: boolean;
	noMetronome?: string[];
	nonGhostTarget?: string;
	noPPBoosts?: boolean;
	noSketch?: boolean;
	ohko?: boolean | string;
	pressureTarget?: string;
	pseudoWeather?: string;
	selfBoost?: {boosts?: Partial<BoostsTable>};
	selfdestruct?: string | boolean;
	selfSwitch?: string | boolean;
	sideCondition?: string;
	sleepUsable?: boolean;
	slotCondition?: string;
	spreadModifier?: number;
	stallingMove?: boolean;
	stealsBoosts?: boolean;
	struggleRecoil?: boolean;
	terrain?: string;
	thawsTarget?: boolean;
	tracksTarget?: boolean;
	smartTarget?: boolean;
	useTargetOffensive?: boolean;
	useSourceDefensiveAsOffensive?: boolean;
	volatileStatus?: string;
	weather?: string;
	willCrit?: boolean;
	forceSTAB?: boolean;
	zMovePower?: number;
	zMoveEffect?: string;
	zMoveBoost?: Partial<BoostsTable>;
	gmaxPower?: number;
	baseMove?: string;
	isZPowered?: boolean;
	maxPowered?: boolean;
}

export interface SpeciesAbility {
	0: string;
	1?: string;
	H?: string;
	S?: string;
}

export interface SpeciesData {
	abilities: SpeciesAbility;
	baseStats: StatsTable;
	canHatch?: boolean;
	color: string;
	eggGroups: string[];
	heightm: number;
	num: number;
	name: string;
	types: string[];
	weightkg: number;
	baseForme?: string;
	baseSpecies?: string;
	evoLevel?: number;
	evoMove?: string;
	evoCondition?: string;
	evoItem?: string;
	evos?: string[];
	evoType?: EvoType;
	forme?: string;
	gender?: GenderName;
	genderRatio?: {[k: string]: number};
	maxHP?: number;
	cosmeticFormes?: string[];
	otherFormes?: string[];
	prevo?: string;
	gen?: number;
	requiredAbility?: string;
	requiredItem?: string;
	requiredItems?: string[];
	requiredMove?: string;
	battleOnly?: string | string[];
	isGigantamax?: string;
	inheritsFrom?: string;
}

export interface Tiering {
	overrideTier: {[id: string]: string};
	zuBans?: {[id: string]: 1};
	nfeBans: {[id: string]: 1};
}
export interface Overrides {
	overrideStats: {[id: string]: {[stat in StatName]?: number}};
	overrideType: {[id: string]: string};
	overrideAbility: {[id: string]: string};
	overrideHiddenAbility: {[id: string]: string};
	removeSecondAbility: {[id: string]: true};
	overrideAcc: {[id: string]: true | number};
	overridePP: {[id: string]: number};
	overrideMoveDesc: {[id: string]: string};
	overrideMoveType: {[id: string]: TypeName};
	overrideItemDesc: {[id: string]: string};
	overrideAbilityDesc: {[id: string]: string};
}
export type PastGens = 'gen1' | 'gen2' | 'gen3' | 'gen4' | 'gen5' | 'gen6' | 'gen7';

export type Learnset = {[move: string]: string};
export type Learnsets = {
	learnsets: {[id: string]: Learnset};
} & {
	[mod: string]: {learnsets: {[id: string]: Learnset}};
};

export type EffectType =
	'Effect' | 'Pokemon' | 'Move' | 'Item' | 'Ability' | 'Weather' | 'Status';

interface AnyObject {[k: string]: any}

function toID(text: any): ID {
  if (text && text.id) text = text.id;
  if (typeof text !== 'string' && typeof text !== 'number') return '';
  return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '') as ID;
}

function getString(str: any): string {
  return (typeof str === 'string' || typeof str === 'number') ? '' + str : '';
}

function combine(obj: AnyObject, ...data: (AnyObject | null)[]): AnyObject {
  for (const d of data) {
    if (d) Object.assign(obj, d);
  }
  return obj;
}

export class BasicEffect implements Readonly<EffectData> {
	id: ID;
	name: string;
	fullname: string;
	effectType: EffectType;
	exists: boolean;
	num: number;
	gen: GenerationNum;
	isUnreleased: boolean | 'Past';
	shortDesc: string;
	desc: string;
	isNonstandard: Nonstandard | null;
	duration?: number;
	noCopy: boolean;
	affectsFainted: boolean;
	status?: ID;
	weather?: ID;
	sourceEffect: string;

	constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
		this.exists = true;
		data = combine(this, data, ...moreData);

		this.name = getString(data.name).trim();
		this.id = data.id as ID || toID(this.name); // Hidden Power hack
		this.fullname = getString(data.fullname) || this.name;
		this.effectType = getString(data.effectType) as EffectType || 'Effect';
		this.exists = !!(this.exists && this.id);
		this.num = data.num || 0;
		this.gen = data.gen || 0;
		this.isUnreleased = data.isUnreleased || false;
		this.shortDesc = data.shortDesc || '';
		this.desc = data.desc || '';
		this.isNonstandard = data.isNonstandard || null;
		this.duration = data.duration;
		this.noCopy = !!data.noCopy;
		this.affectsFainted = !!data.affectsFainted;
		this.status = data.status as ID || undefined;
		this.weather = data.weather as ID || undefined;
		this.sourceEffect = data.sourceEffect || '';
	}

	toString() {
		return this.name;
	}
}

export class PureEffect extends BasicEffect implements Readonly<BasicEffect> {
	readonly effectType: 'Effect' | 'Weather' | 'Status';

	constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
		super(data, ...moreData);
		data = this;
    this.effectType =
      (['Weather', 'Status'].includes(data.effectType) ? data.effectType : 'Effect');
	}
}

export class Ability extends BasicEffect implements Readonly<BasicEffect & AbilityData> {
	readonly effectType: 'Ability';
	readonly rating: number;
	readonly suppressWeather: boolean;

	constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
		super(data, ...moreData);
		data = this;

		this.fullname = `ability: ${this.name}`;
		this.effectType = 'Ability';
		this.suppressWeather = !!data.suppressWeather;
		this.rating = data.rating!;

		if (!this.gen) {
			if (this.num >= 234) {
				this.gen = 8;
			} else if (this.num >= 192) {
				this.gen = 7;
			} else if (this.num >= 165) {
				this.gen = 6;
			} else if (this.num >= 124) {
				this.gen = 5;
			} else if (this.num >= 77) {
				this.gen = 4;
			} else if (this.num >= 1) {
				this.gen = 3;
			}
		}
	}
}

export class Item extends BasicEffect implements Readonly<BasicEffect & ItemData> {
	readonly effectType: 'Item';
	readonly fling?: FlingData;
	readonly onDrive?: string;
	readonly onMemory?: string;
	readonly megaStone?: string;
	readonly megaEvolves?: string;
	readonly zMove?: true | string;
	readonly zMoveType?: string;
	readonly zMoveFrom?: string;
	readonly itemUser?: string[];
	readonly isBerry: boolean;
	readonly ignoreKlutz: boolean;
	readonly onPlate?: string;
	readonly isGem: boolean;
	readonly isPokeball: boolean;

	constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
		super(data, ...moreData);
		data = this;

		this.fullname = `item: ${this.name}`;
		this.effectType = 'Item';
		this.fling = data.fling || undefined;
		this.onDrive = data.onDrive || undefined;
		this.onMemory = data.onMemory || undefined;
		this.megaStone = data.megaStone || undefined;
		this.megaEvolves = data.megaEvolves || undefined;
		this.zMove = data.zMove || undefined;
		this.zMoveType = data.zMoveType || undefined;
		this.zMoveFrom = data.zMoveFrom || undefined;
		this.itemUser = data.itemUser || undefined;
		this.isBerry = !!data.isBerry;
		this.ignoreKlutz = !!data.ignoreKlutz;
		this.onPlate = data.onPlate || undefined;
		this.isGem = !!data.isGem;
		this.isPokeball = !!data.isPokeball;

		if (!this.gen) {
			if (this.num >= 689) {
				this.gen = 7;
			} else if (this.num >= 577) {
				this.gen = 6;
			} else if (this.num >= 537) {
				this.gen = 5;
			} else if (this.num >= 377) {
				this.gen = 4;
			} else {
				this.gen = 3;
			}
			// Due to difference in gen 2 item numbering, gen 2 items must be
			// specified manually
		}

		if (this.isBerry) this.fling = {basePower: 10};
		if (this.id.endsWith('plate')) this.fling = {basePower: 90};
		if (this.onDrive) this.fling = {basePower: 70};
		if (this.megaStone) this.fling = {basePower: 80};
		if (this.onMemory) this.fling = {basePower: 50};
	}
}

export class Move extends BasicEffect implements Readonly<BasicEffect & MoveData> {
	readonly effectType: 'Move';
	readonly type: string;
	readonly target: MoveTarget;
	readonly basePower: number;
	readonly accuracy: true | number;
	readonly critRatio: number;
	readonly willCrit?: boolean;
	readonly ohko?: boolean | string;
	readonly baseMoveType: string;
	readonly secondary: SecondaryEffect | null;
	readonly secondaries: SecondaryEffect[] | null;
	readonly priority: number;
	readonly category: MoveCategory;
	readonly defensiveCategory?: MoveCategory;
	readonly useTargetOffensive: boolean;
	readonly useSourceDefensiveAsOffensive: boolean;
	readonly ignoreNegativeOffensive: boolean;
	readonly ignorePositiveDefensive: boolean;
	readonly ignoreOffensive: boolean;
	readonly ignoreDefensive: boolean;
	readonly ignoreImmunity: AnyObject | boolean;
	readonly pp: number;
	readonly noPPBoosts: boolean;
	readonly isZ: boolean | string;
	readonly multihit?: number | number[];
	readonly gmaxPower?: number;
	readonly zMovePower?: number;
	readonly flags: MoveFlags;
	readonly selfSwitch?: ID | boolean;
	readonly pressureTarget: string;
	readonly nonGhostTarget: string;
	readonly ignoreAbility: boolean;
	readonly damage: number | 'level' | false | null;
	readonly spreadHit: boolean;
	readonly spreadModifier?: number;
	readonly critModifier?: number;
	readonly forceSTAB: boolean;
	readonly noSketch: boolean;
	readonly stab?: number;

	readonly volatileStatus?: ID;

	constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
		super(data, ...moreData);
		data = this;

		this.fullname = `move: ${this.name}`;
		this.effectType = 'Move';
		this.type = getString(data.type);
		this.target = data.target;
		this.basePower = Number(data.basePower!);
		this.accuracy = data.accuracy!;
		this.critRatio = Number(data.critRatio) || 1;
		this.baseMoveType = getString(data.baseMoveType) || this.type;
		this.secondary = data.secondary || null;
		this.secondaries = data.secondaries || (this.secondary && [this.secondary]) || null;
		this.priority = Number(data.priority) || 0;
		this.category = data.category!;
		this.defensiveCategory = data.defensiveCategory || undefined;
		this.useTargetOffensive = !!data.useTargetOffensive;
		this.useSourceDefensiveAsOffensive = !!data.useSourceDefensiveAsOffensive;
		this.ignoreNegativeOffensive = !!data.ignoreNegativeOffensive;
		this.ignorePositiveDefensive = !!data.ignorePositiveDefensive;
		this.ignoreOffensive = !!data.ignoreOffensive;
		this.ignoreDefensive = !!data.ignoreDefensive;
    this.ignoreImmunity =
      (data.ignoreImmunity !== undefined ? data.ignoreImmunity : this.category === 'Status');
		this.pp = Number(data.pp!);
		this.noPPBoosts = !!data.noPPBoosts;
		this.isZ = data.isZ || false;
		this.flags = data.flags || {};
    this.selfSwitch =
      (typeof data.selfSwitch === 'string'
        ? (data.selfSwitch as ID)
        : data.selfSwitch)
      || undefined;
		this.pressureTarget = data.pressureTarget || '';
		this.nonGhostTarget = data.nonGhostTarget || '';
		this.ignoreAbility = data.ignoreAbility || false;
		this.damage = data.damage!;
		this.spreadHit = data.spreadHit || false;
		this.forceSTAB = !!data.forceSTAB;
		this.noSketch = !!data.noSketch;
		this.stab = data.stab || undefined;
    this.volatileStatus =
      typeof data.volatileStatus === 'string' ? (data.volatileStatus as ID) : undefined;

		if (this.category !== 'Status' && !this.gmaxPower) {
			if (!this.basePower) {
				this.gmaxPower = 100;
			} else if (['Fighting', 'Poison'].includes(this.type)) {
				if (this.basePower >= 150) {
					this.gmaxPower = 100;
				} else if (this.basePower >= 110) {
					this.gmaxPower = 95;
				} else if (this.basePower >= 75) {
					this.gmaxPower = 90;
				} else if (this.basePower >= 65) {
					this.gmaxPower = 85;
				} else if (this.basePower >= 55) {
					this.gmaxPower = 80;
				} else if (this.basePower >= 45) {
					this.gmaxPower = 75;
				} else {
					this.gmaxPower = 70;
				}
			} else {
				if (this.basePower >= 150) {
					this.gmaxPower = 150;
				} else if (this.basePower >= 110) {
					this.gmaxPower = 140;
				} else if (this.basePower >= 75) {
					this.gmaxPower = 130;
				} else if (this.basePower >= 65) {
					this.gmaxPower = 120;
				} else if (this.basePower >= 55) {
					this.gmaxPower = 110;
				} else if (this.basePower >= 45) {
					this.gmaxPower = 100;
				} else {
					this.gmaxPower = 90;
				}
			}
		}
		if (this.category !== 'Status' && !this.zMovePower) {
			let basePower = this.basePower;
			if (Array.isArray(this.multihit)) basePower *= 3;
			if (!basePower) {
				this.zMovePower = 100;
			} else if (basePower >= 140) {
				this.zMovePower = 200;
			} else if (basePower >= 130) {
				this.zMovePower = 195;
			} else if (basePower >= 120) {
				this.zMovePower = 190;
			} else if (basePower >= 110) {
				this.zMovePower = 185;
			} else if (basePower >= 100) {
				this.zMovePower = 180;
			} else if (basePower >= 90) {
				this.zMovePower = 175;
			} else if (basePower >= 80) {
				this.zMovePower = 160;
			} else if (basePower >= 70) {
				this.zMovePower = 140;
			} else if (basePower >= 60) {
				this.zMovePower = 120;
			} else {
				this.zMovePower = 100;
			}
		}
		if (!this.gen) {
			if (this.num >= 743) {
				this.gen = 8;
			} else if (this.num >= 622) {
				this.gen = 7;
			} else if (this.num >= 560) {
				this.gen = 6;
			} else if (this.num >= 468) {
				this.gen = 5;
			} else if (this.num >= 355) {
				this.gen = 4;
			} else if (this.num >= 252) {
				this.gen = 3;
			} else if (this.num >= 166) {
				this.gen = 2;
			} else if (this.num >= 1) {
				this.gen = 1;
			}
		}
	}
}

type FormatsData = Tiering & {[mod: string]: Partial<Tiering>} & {[gen in PastGens]: Overrides};
const Data = {
  Abilities: AbilitiesJSON as {[id: string]: AbilityData},
  Aliases: AliasesJSON as {[id: string]: string},
  Items: ItemsJSON as {[id: string]: ItemData},
  Moves: MovesJSON as {[id: string]: MoveData},
  Species: SpeciesJSON as /* FIXME */ unknown as {[id: string]: SpeciesData},
  Types: TypesJSON as	{
      [type in Exclude<TypeName, '???'>]: {
        damageTaken: {[t in Exclude<TypeName, '???'>]: number} & {[key: string]: number};
        HPivs?: {[stat in StatName]?: number};
        HPdvs?: {[stat in StatName]?: number};
    }
  },
  FormatsData: FormatsDataJSON as FormatsData,
}

const BASE_MOD = 'gen8' as ID;
const dexes: {[mod: string]: ModdedDex} = Object.create(null);

export class ModdedDex {
  readonly ModdedDex: typeof ModdedDex;
  readonly currentMod: string;

  readonly data: typeof Data;

	readonly abilityCache: Map<ID, Ability>;
	readonly effectCache: Map<ID, Effect | Move>;
	readonly itemCache: Map<ID, Item>;
	readonly moveCache: Map<ID, Move>;
	readonly speciesCache: Map<ID, Species>;
	readonly typeCache: Map<string, TypeInfo>;

	gen: GenerationNum;

	constructor(mod = 'base', isOriginal = false) {
    this.ModdedDex = ModdedDex;
    this.data = Data;

		this.currentMod = mod;
		this.abilityCache = new Map();
		this.effectCache = new Map();
		this.itemCache = new Map();
		this.moveCache = new Map();
		this.speciesCache = new Map();
		this.typeCache = new Map();

		this.gen = 8;
	}

	mod(mod: string | undefined): ModdedDex {
		return dexes[mod || 'base'];
	}

	forGen(gen: number) {
		if (!gen) return this;
		return this.mod(`gen${gen}`);
	}

	getImmunity(
		source: {type: string} | string,
		target: {getTypes: () => string[]} | {types: string[]} | string[] | string
	): boolean {
		const sourceType: string = typeof source !== 'string' ? source.type : source;
		// @ts-ignore
		const targetTyping: string[] | string = target.getTypes?.() || target.types || target;
		if (Array.isArray(targetTyping)) {
			for (const type of targetTyping) {
				if (!this.getImmunity(sourceType, type)) return false;
			}
			return true;
		}
		const typeData = this.data.Types[targetTyping];
		if (typeData && typeData.damageTaken[sourceType] === 3) return false;
		return true;
	}

	getEffectiveness(
		source: {type: string} | string,
		target: {getTypes: () => string[]} | {types: string[]} | string[] | string
	): number {
		const sourceType: string = typeof source !== 'string' ? source.type : source;
		// @ts-ignore
		const targetTyping: string[] | string = target.getTypes?.() || target.types || target;
		let totalTypeMod = 0;
		if (Array.isArray(targetTyping)) {
			for (const type of targetTyping) {
				totalTypeMod += this.getEffectiveness(sourceType, type);
			}
			return totalTypeMod;
		}
		const typeData = this.data.Types[targetTyping];
		if (!typeData) return 0;
		switch (typeData.damageTaken[sourceType]) {
		case 1: return 1; // super-effective
		case 2: return -1; // resist
		// in case of weird situations like Gravity, immunity is handled elsewhere
		default: return 0;
		}
	}

	/**
	 * Convert a pokemon name, ID, or species into its species name, preserving
	 * form name (which is the main way Dex.getForme(id) differs from
	 * Dex.getSpecies(id).name).
	 */
	getForme(speciesid: string | Species): string {
		const id = toID(speciesid || '');
		const species = this.getSpecies(id);
		if (species.cosmeticFormes && species.cosmeticFormes.includes(id)) {
			const form = id.slice(species.name.length);
			if (form) return species.name + '-' + form[0].toUpperCase() + form.slice(1);
		}
		return species.name;
	}

	getSpecies(name?: string | Species): Species {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		let id = toID(name);
		if (id === 'nidoran' && name.slice(-1) === '♀') {
			id = 'nidoranf' as ID;
		} else if (id === 'nidoran' && name.slice(-1) === '♂') {
			id = 'nidoranm' as ID;
		}
		let species: any = this.speciesCache.get(id);
		if (species) return species;
		if (this.data.Aliases.hasOwnProperty(id)) {
			if (this.data.FormatsData.hasOwnProperty(id)) {
				// special event ID, like Rockruff-Dusk
				const baseId = toID(this.data.Aliases[id]);
				species = new Species({name}, this.data.Pokedex[baseId], this.data.FormatsData[id]);
				species.name = id;
				species.name = id;
				species.id = id;
				species.abilities = {0: species.abilities['S']};
			} else {
				species = this.getSpecies(this.data.Aliases[id]);
			}
			if (species) {
				this.speciesCache.set(id, species);
			}
			return species;
		}
		if (!this.data.Pokedex.hasOwnProperty(id)) {
			let aliasTo = '';
			const formeNames: {[k: string]: string[]} = {
				alola: ['a', 'alola', 'alolan'],
				galar: ['g', 'galar', 'galarian'],
				gmax: ['gigantamax', 'gmax'],
				mega: ['m', 'mega'],
				primal: ['p', 'primal'],
			};
			for (const forme in formeNames) {
				let pokeName = '';
				for (const i of formeNames[forme]) {
					if (id.startsWith(i)) {
						pokeName = id.slice(i.length);
					} else if (id.endsWith(i)) {
						pokeName = id.slice(0, -i.length);
					}
				}
				if (this.data.Aliases.hasOwnProperty(pokeName)) pokeName = toID(this.data.Aliases[pokeName]);
				if (this.data.Pokedex[pokeName + forme]) {
					aliasTo = pokeName + forme;
					break;
				}
			}
			if (aliasTo) {
				species = this.getSpecies(aliasTo);
				if (species.exists) {
					this.speciesCache.set(id, species);
					return species;
				}
			}
		}
		if (id && this.data.Pokedex.hasOwnProperty(id)) {
			species = new Species({name}, this.data.Pokedex[id], this.data.FormatsData[id]);
			// Inherit any statuses from the base species (Arceus, Silvally).
			const baseSpeciesStatuses = this.data.Statuses[toID(species.baseSpecies)];
			if (baseSpeciesStatuses !== undefined) {
				let key: keyof EffectData;
				for (key in baseSpeciesStatuses) {
					if (!(key in species)) species[key] = baseSpeciesStatuses[key];
				}
			}
			if (!species.tier && !species.doublesTier && species.baseSpecies !== species.name) {
				if (species.baseSpecies === 'Mimikyu') {
					species.tier = this.data.FormatsData[toID(species.baseSpecies)].tier || 'Illegal';
					species.doublesTier = this.data.FormatsData[toID(species.baseSpecies)].doublesTier || 'Illegal';
				} else if (species.id.endsWith('totem')) {
					species.tier = this.data.FormatsData[species.id.slice(0, -5)].tier || 'Illegal';
					species.doublesTier = this.data.FormatsData[species.id.slice(0, -5)].doublesTier || 'Illegal';
				} else if (species.battleOnly) {
					species.tier = this.data.FormatsData[toID(species.battleOnly)].tier || 'Illegal';
					species.doublesTier = this.data.FormatsData[toID(species.battleOnly)].doublesTier || 'Illegal';
				} else {
					const baseFormatsData = this.data.FormatsData[toID(species.baseSpecies)];
					if (!baseFormatsData) {
						throw new Error(`${species.baseSpecies} has no formats-data entry`);
					}
					species.tier = baseFormatsData.tier || 'Illegal';
					species.doublesTier = baseFormatsData.doublesTier || 'Illegal';
				}
			}
			if (!species.tier) species.tier = 'Illegal';
			if (!species.doublesTier) species.doublesTier = species.tier;
			if (species.gen > this.gen) {
				species.tier = 'Illegal';
				species.doublesTier = 'Illegal';
				species.isNonstandard = 'Future';
			}
			if (this.currentMod === 'letsgo' && !species.isNonstandard) {
				const isLetsGo = (
					(species.num <= 151 || ['Meltan', 'Melmetal'].includes(species.name)) &&
					(!species.forme || ['Alola', 'Mega', 'Mega-X', 'Mega-Y', 'Starter'].includes(species.forme))
				);
				if (!isLetsGo) species.isNonstandard = 'Past';
			}
		} else {
			species = new Species({
				id, name, exists: false, tier: 'Illegal', doublesTier: 'Illegal', isNonstandard: 'Custom',
			});
		}
		if (species.exists) this.speciesCache.set(id, species);
		return species;
	}

	getOutOfBattleSpecies(species: Species) {
		return !species.battleOnly ? species.name :
			species.inheritsFrom ? this.getSpecies(species.inheritsFrom).name :
			species.baseSpecies;
	}

	getLearnsetData(id: ID): LearnsetData {
		let learnsetData = this.learnsetCache.get(id);
		if (learnsetData) return learnsetData;
		if (!this.data.Learnsets.hasOwnProperty(id)) {
			return new Learnset({exists: false});
		}
		learnsetData = new Learnset(this.data.Learnsets[id]);
		this.learnsetCache.set(id, learnsetData);
		return learnsetData;
	}

	getMove(name?: string | Move): Move {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		let id = toID(name);
		let move = this.moveCache.get(id);
		if (move) return move;
		if (this.data.Aliases.hasOwnProperty(id)) {
			move = this.getMove(this.data.Aliases[id]);
			if (move.exists) {
				this.moveCache.set(id, move);
			}
			return move;
		}
		if (id.substr(0, 11) === 'hiddenpower') {
			id = /([a-z]*)([0-9]*)/.exec(id)![1] as ID;
		}
		if (id && this.data.Moves.hasOwnProperty(id)) {
			move = new Move({name}, this.data.Moves[id]);
			if (move.gen > this.gen) {
				(move as any).isNonstandard = 'Future';
			}
		} else {
			move = new Move({id, name, exists: false});
		}
		if (move.exists) this.moveCache.set(id, move);
		return move;
	}

	/**
	 * While this function can technically return any kind of effect at
	 * all, that's not a feature TypeScript needs to know about.
	 */
	getEffect(name?: string | Effect | null): PureEffect {
		if (!name) return nullEffect;
		if (typeof name !== 'string') return name as PureEffect;

		const id = toID(name);
		let effect = this.effectCache.get(id);
		if (effect) return effect as PureEffect;

		if (name.startsWith('move:')) {
			effect = this.getMove(name.slice(5));
		} else if (name.startsWith('item:')) {
			effect = this.getItem(name.slice(5));
		} else if (name.startsWith('ability:')) {
			effect = this.getAbility(name.slice(8));
		}
		if (effect) {
			this.effectCache.set(id, effect);
			// @ts-ignore
			return effect;
		}
		return this.getEffectByID(id, effect);
	}

	getEffectByID(id: ID, effect?: Effect | Move): PureEffect {
		if (!id) return nullEffect;

		if (!effect) effect = this.effectCache.get(id);
		if (effect) return effect as PureEffect;

		let found;
		if ((this.data.Movedex.hasOwnProperty(id) && (found = this.data.Movedex[id]).effect) ||
        (this.data.Abilities.hasOwnProperty(id) && (found = this.data.Abilities[id]).effect) ||
        (this.data.Items.hasOwnProperty(id) && (found = this.data.Items[id]).effect)) {
			effect = new PureEffect({name: found.name || id}, found.effect!);
		} else if (id === 'recoil') {
			effect = new PureEffect({id, name: 'Recoil', effectType: 'Recoil'});
		} else if (id === 'drain') {
			effect = new PureEffect({id, name: 'Drain', effectType: 'Drain'});
		} else {
			effect = new PureEffect({id, name: id, exists: false});
		}

		this.effectCache.set(id, effect);
		return effect as PureEffect;
	}

	getItem(name?: string | Item): Item {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		const id = toID(name);
		let item = this.itemCache.get(id);
		if (item) return item;
		if (this.data.Aliases.hasOwnProperty(id)) {
			item = this.getItem(this.data.Aliases[id]);
			if (item.exists) {
				this.itemCache.set(id, item);
			}
			return item;
		}
		if (id && !this.data.Items[id] && this.data.Items[id + 'berry']) {
			item = this.getItem(id + 'berry');
			this.itemCache.set(id, item);
			return item;
		}
		if (id && this.data.Items.hasOwnProperty(id)) {
			item = new Item({name}, this.data.Items[id]);
			if (item.gen > this.gen) {
				(item as any).isNonstandard = 'Future';
			}
			// hack for allowing mega evolution in LGPE
			if (this.currentMod === 'letsgo' && !item.isNonstandard && !item.megaStone) {
				(item as any).isNonstandard = 'Past';
			}
		} else {
			item = new Item({id, name, exists: false});
		}

		if (item.exists) this.itemCache.set(id, item);
		return item;
	}

	getAbility(name: string | Ability = ''): Ability {
		if (name && typeof name !== 'string') return name;

		const id = toID(name);
		let ability = this.abilityCache.get(id);
		if (ability) return ability;
		if (this.data.Aliases.hasOwnProperty(id)) {
			ability = this.getAbility(this.data.Aliases[id]);
			if (ability.exists) {
				this.abilityCache.set(id, ability);
			}
			return ability;
		}
		if (id && this.data.Abilities.hasOwnProperty(id)) {
			ability = new Ability({name}, this.data.Abilities[id]);
			if (ability.gen > this.gen) {
				(ability as any).isNonstandard = 'Future';
			}
			if (this.currentMod === 'letsgo' && ability.id !== 'noability') {
				(ability as any).isNonstandard = 'Past';
			}
			if ((this.currentMod === 'letsgo' || this.gen <= 2) && ability.id === 'noability') {
				(ability as any).isNonstandard = null;
			}
		} else {
			ability = new Ability({id, name, exists: false});
		}

		if (ability.exists) this.abilityCache.set(id, ability);
		return ability;
	}

	getType(name: string | TypeInfo): TypeInfo {
		if (name && typeof name !== 'string') return name;

		const id = toID(name);
		const typeName = id.charAt(0).toUpperCase() + id.substr(1);
		let type = this.typeCache.get(typeName);
		if (type) return type;
		if (typeName && this.data.TypeChart.hasOwnProperty(typeName)) {
			type = new Data.TypeInfo({id, name: typeName}, this.data.TypeChart[typeName]);
		} else {
			type = new Data.TypeInfo({id, name, exists: false, effectType: 'EffectType'});
		}

		if (type.exists) this.typeCache.set(id, type);
		return type;
	}

	getNature(name: string | Nature): Nature {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		const id = toID(name);
		// tslint:disable-next-line:no-object-literal-type-assertion
		let nature: Nature = {} as Nature;
		if (id && id !== 'constructor' && this.data.Natures[id]) {
			nature = this.data.Natures[id];
			if (nature.cached) return nature;
			nature.cached = true;
			nature.exists = true;
		}
		if (!nature.id) nature.id = id;
		if (!nature.name) nature.name = name;
		nature.toString = this.effectToString;
		if (!nature.effectType) nature.effectType = 'Nature';
		if (!nature.gen) nature.gen = 3;

		return nature;
	}

  getHiddenPower(ivs: AnyObject) {
		const hpTypes = [
			'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
			'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark',
		];
		const tr = this.trunc;
		const stats = {hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
		if (this.gen <= 2) {
			// Gen 2 specific Hidden Power check. IVs are still treated 0-31 so we get them 0-15
			const atkDV = tr(ivs.atk / 2);
			const defDV = tr(ivs.def / 2);
			const speDV = tr(ivs.spe / 2);
			const spcDV = tr(ivs.spa / 2);
			return {
				type: hpTypes[4 * (atkDV % 4) + (defDV % 4)],
				power: tr(
					(5 * ((spcDV >> 3) + (2 * (speDV >> 3)) + (4 * (defDV >> 3)) + (8 * (atkDV >> 3))) + (spcDV % 4)) / 2 + 31
				),
			};
		} else {
			// Hidden Power check for Gen 3 onwards
			let hpTypeX = 0;
			let hpPowerX = 0;
			let i = 1;
			for (const s in stats) {
				hpTypeX += i * (ivs[s] % 2);
				hpPowerX += i * (tr(ivs[s] / 2) % 2);
				i *= 2;
			}
			return {
				type: hpTypes[tr(hpTypeX * 15 / 63)],
				// After Gen 6, Hidden Power is always 60 base power
				power: (this.gen && this.gen < 6) ? tr(hpPowerX * 40 / 63) + 30 : 60,
			};
		}
  }

  trunc(num: number, bits = 0) {
		if (bits) return (num >>> 0) % (2 ** bits);
		return num >>> 0;
	}

	deepClone(obj: any): any {
		if (obj === null || typeof obj !== 'object') return obj;
		if (Array.isArray(obj)) return obj.map(prop => this.deepClone(prop));
		const clone = Object.create(Object.getPrototypeOf(obj));
		for (const key of Object.keys(obj)) {
			clone[key] = this.deepClone(obj[key]);
		}
		return clone;
	}

	loadDataFile(basePath: string, dataType: DataType | 'Aliases'): AnyObject {
		return {};
	}

	includeMods(): ModdedDex {
		return this;
	}

	includeModData(): ModdedDex {
		return this;
	}

	includeData(): ModdedDex {
		return this;
	}

	loadData(): DexTableData {
		return this.dataCache;
	}

	includeFormats(): ModdedDex {
		return this;
	}
}








dexes['base'] = new ModdedDex(undefined, true);

// "gen8" is an alias for the current base data
dexes[BASE_MOD] = dexes['base'];
export const Dex = dexes['base'];





/* TODO
var LEARNSETS: Promise<Learnsets> | null = null;
(Dex as any).getLearnsets = () => {
	if (LEARNSETS) return LEARNSETS;
	if (typeof window === "undefined") {
		LEARNSETS = Promise.resolve(require('./data/learnsets.json') as Learnsets);
	} else {
		LEARNSETS = import('./data/learnsets.json') as unknown as Promise<Learnsets>;
	}
	return LEARNSETS;
};*/


