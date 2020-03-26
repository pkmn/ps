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



export const Abilities = AbilitiesJSON as {[id: string]: AbilityData};
export const Aliases = AliasesJSON as {[id: string]: string};
export const Items = ItemsJSON as {[id: string]: ItemData};
export const Moves = MovesJSON as {[id: string]: MoveData};
export const Species = SpeciesJSON as unknown as {[id: string]: SpeciesData}; // FIXME name?
export const Types = TypesJSON as	{
    [type in Exclude<TypeName, '???'>]: {
      damageTaken: {[t in Exclude<TypeName, '???'>]: number} & {[key: string]: number};
      HPivs?: {[stat in StatName]?: number};
      HPdvs?: {[stat in StatName]?: number};
  }
};
export const FormatsData =
  FormatsDataJSON as (Tiering & {[mod: string]: Partial<Tiering>} & {[gen in PastGens]: Overrides});
















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


