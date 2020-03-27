import {
  BoostsTable,
  EvoType,
  GenderName,
  GenerationNum,
  ID,
  MoveCategory,
  MoveTarget,
  NatureName,
  Nonstandard,
  StatName,
  StatsTable,
  TypeName,
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
  naturalGift?: { basePower: number, type: string };
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
  ignoreImmunity?: boolean | { [k: string]: boolean };
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
  selfBoost?: { boosts?: Partial<BoostsTable> };
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
  genderRatio?: { [k: string]: number };
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
  tier?: string;
}

export interface TypeData {
  damageTaken: { [t in Exclude<TypeName, '???'>]: number } & { [key: string]: number };
  HPdvs?: Partial<StatsTable>;
  HPivs?: Partial<StatsTable>;
}

export interface Tiering {
  overrideTier: { [id: string]: string };
  zuBans?: { [id: string]: 1 };
  nfeBans: { [id: string]: 1 };
}
export interface Overrides {
  overrideStats: { [id: string]: { [stat in StatName]?: number } };
  overrideType: { [id: string]: string };
  overrideAbility: { [id: string]: string };
  overrideHiddenAbility: { [id: string]: string };
  removeSecondAbility: { [id: string]: true };
  overrideAcc: { [id: string]: true | number };
  overrideBP: { [id: string]: number };
  overridePP: { [id: string]: number };
  overrideMoveDesc: { [id: string]: string };
  overrideMoveType: { [id: string]: TypeName };
  overrideItemDesc: { [id: string]: string };
  overrideAbilityDesc: { [id: string]: string };
  overrideTier: { [id: string]: string };
  removeType: {[id in TypeName]?: true};
  overrideTypeChart: {[id in TypeName]: TypeData};
}
export type PastGen = 'gen1' | 'gen2' | 'gen3' | 'gen4' | 'gen5' | 'gen6' | 'gen7';

export type LearnsetData = {
  learnsets: { [id: string]: { [move: string]: string } };
} & {
  [mod: string]: { learnsets: { [id: string]: { [move: string]: string } } };
};

export type FormatsData =
  Tiering & { [mod: string]: Partial<Tiering> } & { [gen in PastGen]: Overrides };

export type EffectType =
  'Effect' | 'Pokemon' | 'Move' | 'Item' | 'Ability' | 'Weather' | 'Status';

interface AnyObject { [k: string]: any }

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

    if (this.isBerry) this.fling = { basePower: 10 };
    if (this.id.endsWith('plate')) this.fling = { basePower: 90 };
    if (this.onDrive) this.fling = { basePower: 70 };
    if (this.megaStone) this.fling = { basePower: 80 };
    if (this.onMemory) this.fling = { basePower: 50 };
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

export class Species extends BasicEffect implements Readonly<BasicEffect & SpeciesData> {
  readonly effectType: 'Pokemon';
  readonly id: ID;
  readonly name: string;
  readonly baseSpecies: string;
  readonly forme: string;
  readonly baseForme: string;
  readonly cosmeticFormes?: string[];
  readonly otherFormes?: string[];
  readonly spriteid: string;
  readonly abilities: SpeciesAbility;
  readonly types: string[];
  readonly addedType?: string;
  readonly prevo: ID;
  readonly evos: ID[];
  readonly evoType?: EvoType
  readonly evoMove?: string;
  readonly evoLevel?: number;
  readonly nfe: boolean;
  readonly eggGroups: string[];
  readonly gender: GenderName;
  readonly genderRatio: { M: number, F: number };
  readonly baseStats: StatsTable;
  readonly maxHP?: number;
  readonly weightkg: number;
  readonly weighthg: number;
  readonly heightm: number;
  readonly color: string;
  readonly unreleasedHidden: boolean | 'Past';
  readonly maleOnlyHidden: boolean;
  readonly isMega?: boolean;
  readonly isPrimal?: boolean;
  readonly isGigantamax?: string;
  readonly battleOnly?: string | string[];
  readonly requiredItem?: string;
  readonly requiredMove?: string;
  readonly requiredAbility?: string;
  readonly requiredItems?: string[];
  readonly inheritsFrom: ID;
  readonly tier: string;
  readonly doublesTier: string;
  readonly randomBattleMoves?: readonly ID[];
  readonly randomDoubleBattleMoves?: readonly ID[];
  readonly exclusiveMoves?: readonly ID[];
  readonly comboMoves?: readonly ID[];
  readonly essentialMove?: ID;

  constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
    super(data, ...moreData);
    data = this;

    this.fullname = `pokemon: ${data.name}`;
    this.effectType = 'Pokemon';
    this.id = data.id as ID;
    this.name = data.name;
    this.baseSpecies = data.baseSpecies || this.name;
    this.forme = data.forme || '';
    this.baseForme = data.baseForme || '';
    this.cosmeticFormes = data.cosmeticFormes || undefined;
    this.otherFormes = data.otherFormes || undefined;
    this.spriteid = data.spriteid ||
      (toID(this.baseSpecies) + (this.baseSpecies !== this.name ? `-${toID(this.forme)}` : ''));
    this.abilities = data.abilities || { 0: '' };
    this.types = data.types || ['???'];
    this.addedType = data.addedType || undefined;
    this.prevo = data.prevo || '';
    this.tier = data.tier || '';
    this.doublesTier = data.doublesTier || '';
    this.evos = data.evos || [];
    this.evoType = data.evoType || undefined;
    this.evoMove = data.evoMove || undefined;
    this.evoLevel = data.evoLevel || undefined;
    this.nfe = !!this.evos.length;
    this.eggGroups = data.eggGroups || [];
    this.gender = data.gender || '';
    this.genderRatio = data.genderRatio || (this.gender === 'M' ? { M: 1, F: 0 } :
      this.gender === 'F' ? { M: 0, F: 1 } :
        this.gender === 'N' ? { M: 0, F: 0 } :
          { M: 0.5, F: 0.5 });
    this.requiredItem = data.requiredItem || undefined;
    this.requiredItems =
      this.requiredItems || (this.requiredItem ? [this.requiredItem] : undefined);
    this.baseStats = data.baseStats || { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
    this.weightkg = data.weightkg || 0;
    this.weighthg = this.weightkg * 10;
    this.heightm = data.heightm || 0;
    this.color = data.color || '';
    this.unreleasedHidden = data.unreleasedHidden || false;
    this.maleOnlyHidden = !!data.maleOnlyHidden;
    this.maxHP = data.maxHP || undefined;
    this.isMega = !!(this.forme && ['Mega', 'Mega-X', 'Mega-Y'].includes(this.forme)) || undefined;
    this.isGigantamax = data.isGigantamax || undefined;
    this.battleOnly =
      data.battleOnly || (this.isMega || this.isGigantamax ? this.baseSpecies : undefined);
    this.inheritsFrom =
      data.inheritsFrom || (this.isGigantamax ? toID(this.baseSpecies) : undefined);

    if (!this.gen && this.num >= 1) {
      if (this.num >= 810 || ['Gmax', 'Galar', 'Galar-Zen'].includes(this.forme)) {
        this.gen = 8;
      } else if (this.num >= 722 || this.forme.startsWith('Alola') || this.forme === 'Starter') {
        this.gen = 7;
      } else if (this.forme === 'Primal') {
        this.gen = 6;
        this.isPrimal = true;
        this.battleOnly = this.baseSpecies;
      } else if (this.num >= 650 || this.isMega) {
        this.gen = 6;
      } else if (this.num >= 494) {
        this.gen = 5;
      } else if (this.num >= 387) {
        this.gen = 4;
      } else if (this.num >= 252) {
        this.gen = 3;
      } else if (this.num >= 152) {
        this.gen = 2;
      } else {
        this.gen = 1;
      }
    }
  }
}

export class Type implements Readonly<TypeData> {
  readonly id: ID;
  readonly name: string;
  readonly effectType: 'Type';
  readonly exists: boolean;
  readonly gen: GenerationNum;
  readonly damageTaken: { [t in Exclude<TypeName, '???'>]: number } & { [key: string]: number };
  readonly HPivs: Partial<StatsTable>;
  readonly HPdvs: Partial<StatsTable>;

  constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
    this.exists = true;
    data = combine(this, data, ...moreData);

    this.id = data.id || '';
    this.name = getString(data.name).trim();
    this.effectType = 'Type';
    this.exists = !!(this.exists && this.id);
    this.gen = data.gen || 0;
    this.damageTaken = data.damageTaken || {};
    this.HPivs = data.HPivs || {};
    this.HPdvs = data.HPdvs || {};
  }

  toString() {
    return this.name;
  }
}

export interface NatureData {
  name: NatureName;
  plus?: keyof StatsTable;
  minus?: keyof StatsTable;
}

export interface Nature extends NatureData {
  effectType: 'Nature';
  id: ID;
  name: NatureName;
  gen: GenerationNum;
  exists?: boolean;
  cached?: boolean;
}

const Natures: { [k: string]: NatureData } = {
  adamant: { name: 'Adamant', plus: 'atk', minus: 'spa' },
  bashful: { name: 'Bashful' },
  bold: { name: 'Bold', plus: 'def', minus: 'atk' },
  brave: { name: 'Brave', plus: 'atk', minus: 'spe' },
  calm: { name: 'Calm', plus: 'spd', minus: 'atk' },
  careful: { name: 'Careful', plus: 'spd', minus: 'spa' },
  docile: { name: 'Docile' },
  gentle: { name: 'Gentle', plus: 'spd', minus: 'def' },
  hardy: { name: 'Hardy' },
  hasty: { name: 'Hasty', plus: 'spe', minus: 'def' },
  impish: { name: 'Impish', plus: 'def', minus: 'spa' },
  jolly: { name: 'Jolly', plus: 'spe', minus: 'spa' },
  lax: { name: 'Lax', plus: 'def', minus: 'spd' },
  lonely: { name: 'Lonely', plus: 'atk', minus: 'def' },
  mild: { name: 'Mild', plus: 'spa', minus: 'def' },
  modest: { name: 'Modest', plus: 'spa', minus: 'atk' },
  naive: { name: 'Naive', plus: 'spe', minus: 'spd' },
  naughty: { name: 'Naughty', plus: 'atk', minus: 'spd' },
  quiet: { name: 'Quiet', plus: 'spa', minus: 'spe' },
  quirky: { name: 'Quirky' },
  rash: { name: 'Rash', plus: 'spa', minus: 'spd' },
  relaxed: { name: 'Relaxed', plus: 'def', minus: 'spe' },
  sassy: { name: 'Sassy', plus: 'spd', minus: 'spe' },
  serious: { name: 'Serious' },
  timid: { name: 'Timid', plus: 'spe', minus: 'atk' },
};

const Data = {
  Abilities: AbilitiesJSON as { [id: string]: AbilityData },
  Aliases: AliasesJSON as { [id: string]: string },
  Items: ItemsJSON as { [id: string]: ItemData },
  Moves: MovesJSON as { [id: string]: MoveData },
  Species: SpeciesJSON as { [id: string]: SpeciesData },
  Natures,
  Types: TypesJSON as { [type in Exclude<TypeName, '???'>]: TypeData },
  FormatsData: FormatsDataJSON as FormatsData,
  Learnsets: null! as LearnsetData,
}

const BASE_MOD = 'gen8' as ID;
const dexes: { [mod: string]: ModdedDex } = Object.create(null);

const nullEffect: PureEffect = new PureEffect({ name: '', exists: false });

export class ModdedDex {
  readonly gen: GenerationNum;
  readonly modid: ID;
  readonly data = Data;
  readonly statNames: ReadonlyArray<StatName> = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
  readonly cache = {
    Abilities: Object.create(null) as { [id: string]: Ability },
    Items: Object.create(null) as { [id: string]: Item },
    Moves: Object.create(null) as { [id: string]: Move },
    Species: Object.create(null) as { [id: string]: Species },
    Types: Object.create(null) as { [id: string]: Type },
  };

  constructor(modid = BASE_MOD) {
    this.modid = modid;
    let gen = parseInt(modid.slice(3));
    if (!modid.startsWith('gen') || !gen) throw new Error("Unsupported modid");
    this.gen = gen as GenerationNum;
  }

  mod(modid: ID): ModdedDex {
    if (modid in dexes) return dexes[modid];
    dexes[modid] = new ModdedDex(modid);
    return dexes[modid]; // FIXME what about if missing?
  }

  forGen(gen: number) {
    if (!gen) return this;
    return this.mod(`gen${gen}` as ID);
  }

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

    const alias = this.data.Aliases[id];
    if (alias) {
      name = alias;
      id = toID(alias);
    }

    let species = this.cache.Species[id];
    if (species) return species;

    let data = this.data.Species[id];

    if (id && data) {
      data = {...data};

      const table = this.data.FormatsData[this.modid as PastGen];
      		if (this.gen < 3) {
			data.abilities = {0: "None"};
		} else {
			let abilities = {...data.abilities};
			if (id in table.overrideAbility) {
				abilities['0'] = table.overrideAbility[id];
			}
			if (id in table.removeSecondAbility) {
				delete abilities['1'];
			}
			if (id in table.overrideHiddenAbility) {
				abilities['H'] = table.overrideHiddenAbility[id];
			}
			if (this.gen < 5) delete abilities['H'];
			if (this.gen < 7) delete abilities['S'];

			data.abilities = abilities;
		}
		if (id in table.overrideStats) {
			data.baseStats = {...data.baseStats, ...table.overrideStats[id]};
		}
		if (id in table.overrideType) data.types = table.overrideType[id].split('/');

		if (id in table.overrideTier) data.tier = table.overrideTier[id];
		if (!data.tier && id.slice(-5) === 'totem') {
			data.tier = this.getSpecies(id.slice(0, -5)).tier;
		}
		if (!data.tier && data.baseSpecies && toID(data.baseSpecies) !== id) {
			data.tier = this.getSpecies(data.baseSpecies).tier;
		}
		if (data.gen > this.gen) data.tier = 'Illegal';

    } else {
      species = new Species({
        id, name, exists: false, tier: 'Illegal', doublesTier: 'Illegal', isNonstandard: 'Custom',
      });
    }












    if (!this.data.Species.hasOwnProperty(id)) {
      let aliasTo = '';
      const formeNames: { [k: string]: string[] } = {
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
        if (this.data.Species[pokeName + forme]) {
          aliasTo = pokeName + forme;
          break;
        }
      }
      if (aliasTo) {
        species = this.getSpecies(aliasTo);
        if (species.exists) {
          this.cache.Species[id] = species;
          return species;
        }
      }
    }



    if (id && this.data.Species.hasOwnProperty(id)) {




      species = new Species({ name }, this.data.Species[id], this.data.FormatsDataFIXME[id]);
      if (!species.tier && !species.doublesTier && species.baseSpecies !== species.name) {
        if (species.baseSpecies === 'Mimikyu') {
          species.tier = this.data.FormatsDataFIXME[toID(species.baseSpecies)].tier || 'Illegal';
          species.doublesTier = this.data.FormatsDataFIXME[toID(species.baseSpecies)].doublesTier || 'Illegal';
        } else if (species.id.endsWith('totem')) {
          species.tier = this.data.FormatsDataFIXME[species.id.slice(0, -5)].tier || 'Illegal';
          species.doublesTier = this.data.FormatsDataFIXME[species.id.slice(0, -5)].doublesTier || 'Illegal';
        } else if (species.battleOnly) {
          species.tier = this.data.FormatsDataFIXME[toID(species.battleOnly)].tier || 'Illegal';
          species.doublesTier = this.data.FormatsDataFIXME[toID(species.battleOnly)].doublesTier || 'Illegal';
        } else {
          const baseFormatsData = this.data.FormatsDataFIXME[toID(species.baseSpecies)];
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




    } else {
      species = new Species({
        id, name, exists: false, tier: 'Illegal', doublesTier: 'Illegal', isNonstandard: 'Custom',
      });
    }
    if (species.exists) this.cache.Species[id] = species;
    return species;
  }

  getOutOfBattleSpecies(species: Species) {
    return !species.battleOnly ? species.name :
      species.inheritsFrom ? this.getSpecies(species.inheritsFrom).name :
        species.baseSpecies;
  }

  hasAbility(species: Species, ability: string) {
    for (const i in species.abilities) {
      // @ts-ignore
      if (ability === species.abilities[i]) return true;
    }
    return false;
  }

  /* TODO
  var LEARNSETS: Promise<Learnsets> | null = null;
  (Dex as any).getLearnsets = () => {
    if (LEARNSETS) return LEARNSETS;
    if (typeof window === 'undefined') {
      LEARNSETS = Promise.resolve(require('./data/learnsets.json') as Learnsets);
    } else {
      LEARNSETS = import('./data/learnsets.json') as unknown as Promise<Learnsets>;
    }
    return LEARNSETS;
  };*/

  async getLearnsetData(id: ID): LearnsetData {
    let learnsetData = this.cache.Learnsets.get(id);
    if (learnsetData) return learnsetData;
    if (!this.data.Learnsets.hasOwnProperty(id)) {
      return new Learnset({ exists: false });
    }
    learnsetData = new Learnset(this.data.Learnsets[id]);
    this.learnsetCache.set(id, learnsetData);
    return learnsetData;
  }

	/**
	 * While this function can technically return any kind of effect at
	 * all, that's not a feature TypeScript needs to know about.
	 */
  // getEffect(name?: string | Effect | null): PureEffect {
  //   if (!name) return nullEffect;
  //   if (typeof name !== 'string') return name as PureEffect;

  //   const id = toID(name);
  //   let effect = this.effectCache.get(id);
  //   if (effect) return effect as PureEffect;

  //   if (name.startsWith('move:')) {
  //     effect = this.getMove(name.slice(5));
  //   } else if (name.startsWith('item:')) {
  //     effect = this.getItem(name.slice(5));
  //   } else if (name.startsWith('ability:')) {
  //     effect = this.getAbility(name.slice(8));
  //   }
  //   if (effect) {
  //     this.effectCache.set(id, effect);
  //     // @ts-ignore
  //     return effect;
  //   }
  //   return this.getEffectByID(id, effect);
  // }

  // getEffectByID(id: ID, effect?: Effect | Move): PureEffect {
  //   if (!id) return nullEffect;

  //   if (!effect) effect = this.effectCache.get(id);
  //   if (effect) return effect as PureEffect;

  //   let found;
  //   if ((this.data.Movedex.hasOwnProperty(id) && (found = this.data.Movedex[id]).effect) ||
  //     (this.data.Abilities.hasOwnProperty(id) && (found = this.data.Abilities[id]).effect) ||
  //     (this.data.Items.hasOwnProperty(id) && (found = this.data.Items[id]).effect)) {
  //     effect = new PureEffect({ name: found.name || id }, found.effect!);
  //   } else if (id === 'recoil') {
  //     effect = new PureEffect({ id, name: 'Recoil', effectType: 'Recoil' });
  //   } else if (id === 'drain') {
  //     effect = new PureEffect({ id, name: 'Drain', effectType: 'Drain' });
  //   } else {
  //     effect = new PureEffect({ id, name: id, exists: false });
  //   }

  //   this.effectCache.set(id, effect);
  //   return effect as PureEffect;
  // }

  getAbility(name: string | Ability = ''): Ability {
    if (name && typeof name !== 'string') return name;

    name = (name || '').trim();
    let id = toID(name);
    const alias = this.data.Aliases[id];
    if (alias) {
      name = alias;
      id = toID(alias);
    }

    let ability = this.cache.Abilities[id];
    if (ability) return ability;

    let data = this.data.Abilities[id];
    if (id && data) {
      data = {...data};
      for (let i = this.gen; i < 8; i++) {
        if (id in this.data.FormatsData['gen' + i as PastGen].overrideAbilityDesc) {
          data.shortDesc = this.data.FormatsData['gen' + i as PastGen].overrideAbilityDesc[id];
          break;
        }
      }
      ability = new Ability({ name }, data);
      if (ability.gen > this.gen) (ability as any).isNonstandard = 'Future';
    } else {
      ability = new Ability({ id, name, exists: false });
    }

    if (ability.exists) this.cache.Abilities[id] = ability;
    return ability;
  }

  getItem(name?: string | Item): Item {
    if (name && typeof name !== 'string') return name;

    name = (name || '').trim();
    let id = toID(name);
    const alias = this.data.Aliases[id];
    if (alias) {
      name = alias;
      id = toID(alias);
    }

    let item = this.cache.Items[id];
    if (item) return item;

    if (id && !this.data.Items[id] && this.data.Items[id + 'berry']) {
      item = this.getItem(id + 'berry');
      this.cache.Items[id] = item;
      return item;
    }

    let data = this.data.Items[id];
    if (id && data) {
      data = {...data};
      for (let i = this.gen; i < 8; i++) {
        if (id in this.data.FormatsData['gen' + i as PastGen].overrideItemDesc) {
          data.shortDesc = this.data.FormatsData['gen' + i as PastGen].overrideItemDesc[id];
          break;
        }
      }
      item = new Item({ name }, data);
      if (item.gen > this.gen) (item as any).isNonstandard = 'Future';
    } else {
      item = new Item({ id, name, exists: false });
    }

    if (item.exists) this.cache.Items[id] = item;
    return item;
  }

  getMove(name?: string | Move): Move {
    if (name && typeof name !== 'string') return name;

    name = (name || '').trim();
    let id = toID(name);
    const alias = this.data.Aliases[id];
    if (alias) {
      name = alias;
      id = toID(alias);
    }

    let move = this.cache.Moves[id];
    if (move) return move;

   let basePower = 0;
    if (id.substr(0, 11) === 'hiddenpower') {
      id = /([a-z]*)([0-9]*)/.exec(id)![1] as ID;
    } else if (id.substr(0, 6) === 'return' && id.length > 6) {
      id = 'return' as ID;
      basePower = Number(id.slice(6));
    } else if (id.substr(0, 11) === 'frustration' && id.length > 11) {
      id = 'frustration' as ID;
      basePower = Number(id.slice(11));
    }

    let data = this.data.Moves[id];
    if (id && data) {
      data = {...data};
      const table = this.data.FormatsData[this.modid as PastGen];
      if (id in table.overrideAcc) data.accuracy = table.overrideAcc[id];
      if (id in table.overrideBP) data.basePower = table.overrideBP[id];
      if (id in table.overridePP) data.pp = table.overridePP[id];
      if (id in table.overrideMoveType) data.type = table.overrideMoveType[id];
      for (let i = this.gen; i < 8; i++) {
        if (id in this.data.FormatsData['gen' + i as PastGen].overrideMoveDesc) {
          data.shortDesc = this.data.FormatsData['gen' + i as PastGen].overrideMoveDesc[id];
          break;
        }
      }
      if (this.gen <= 3 && data.category !== 'Status') {
        data.category = Dex.getGen3Category(data.type);
      }
      if (basePower) data.basePower = basePower;
      move = new Move({ name }, data);
      if (move.gen > this.gen) (move as any).isNonstandard = 'Future';
    } else {
      move = new Move({ id, name, exists: false });
    }
    if (move.exists) this.cache.Moves[id] = move;
    return move;
  }

  getGen3Category(type: string): MoveCategory {
    return [
      'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Psychic', 'Dark', 'Dragon',
    ].includes(type) ? 'Special' : 'Physical';
  }

  getNature(name: string | Nature): Nature {
    if (name && typeof name !== 'string') return name;

    name = (name || '').trim();
    const id = toID(name);
    // tslint:disable-next-line:no-object-literal-type-assertion
    let nature: Nature = {} as Nature;
    if (id && id !== 'constructor' && this.data.Natures[id]) {
      nature = this.data.Natures[id] as Nature;
      if (nature.cached) return nature;
      nature.cached = true;
      nature.exists = true;
    }
    if (!nature.id) nature.id = id;
    if (!nature.name) nature.name = name as NatureName;
    if (!nature.effectType) nature.effectType = 'Nature';
    if (!nature.gen) nature.gen = 3;

    return nature;
  }

  getType(name: string | Type): Type {
    if (name && typeof name !== 'string') return name;

    name = (name || '').trim();
    let id = toID(name);
    const alias = this.data.Aliases[id];
    if (alias) {
      name = alias;
      id = toID(alias);
    }

    let type = this.cache.Types[id];
    if (type) return type;

    const typeName = id.charAt(0).toUpperCase() + id.substr(1) as Exclude<TypeName, '???'>;
    let data = this.data.Types[typeName];
    if (id && data) {
      for (let i = 7; i >= this.gen; i--) {
        const gen = `gen${i}` as PastGen;
        if (id in this.data.FormatsData[gen].removeType) {
          (data as any) = {...data, exists: false};
          // don't bother correcting its attributes given it doesn't exist
          break;
        }
        if (id in this.data.FormatsData[gen].overrideTypeChart) {
          data = {...data, ...this.data.FormatsData[gen].overrideTypeChart[typeName]};
        }
      }
      type = new Type({ id, name: typeName }, data);
    } else {
      type = new Type({ id, name, exists: false });
    }

    if (type.exists) this.cache.Types[id] = type;
    return type;
  }

  getImmunity(
    source: { type: string } | string,
    target: { getTypes: () => string[] } | { types: string[] } | string[] | string
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
    const typeData = this.data.Types[targetTyping as Exclude<TypeName, '???'>];
    if (typeData && typeData.damageTaken[sourceType] === 3) return false;
    return true;
  }

  getEffectiveness(
    source: { type: string } | string,
    target: { getTypes: () => string[] } | { types: string[] } | string[] | string
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
    const typeData = this.data.Types[targetTyping as Exclude<TypeName, '???'>];
    if (!typeData) return 0;
    switch (typeData.damageTaken[sourceType]) {
      case 1: return 1; // super-effective
      case 2: return -1; // resist
      // in case of weird situations like Gravity, immunity is handled elsewhere
      default: return 0;
    }
  }

  getHiddenPower(ivs: StatsTable) {
    const hpTypes = [
      'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
      'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark',
    ];
    const tr = (num: number, bits = 0) => {
      if (bits) return (num >>> 0) % (2 ** bits);
      return num >>> 0;
    }
    const stats = { hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31 };
    if (this.gen <= 2) {
      // Gen 2 specific Hidden Power check. IVs are still treated 0-31 so we get them 0-15
      const atkDV = tr(ivs.atk / 2);
      const defDV = tr(ivs.def / 2);
      const speDV = tr(ivs.spe / 2);
      const spcDV = tr(ivs.spa / 2);
      return {
        type: hpTypes[4 * (atkDV % 4) + (defDV % 4)],
        power: tr(
          (5 * ((spcDV >> 3) +
            (2 * (speDV >> 3)) +
            (4 * (defDV >> 3)) +
            (8 * (atkDV >> 3))) +
            (spcDV % 4)) / 2 + 31
        ),
      };
    } else {
      // Hidden Power check for Gen 3 onwards
      let hpTypeX = 0;
      let hpPowerX = 0;
      let i = 1;
      for (const s in stats) {
        hpTypeX += i * (ivs[s as StatName] % 2);
        hpPowerX += i * (tr(ivs[s as StatName] / 2) % 2);
        i *= 2;
      }
      return {
        type: hpTypes[tr(hpTypeX * 15 / 63)],
        // After Gen 6, Hidden Power is always 60 base power
        power: (this.gen && this.gen < 6) ? tr(hpPowerX * 40 / 63) + 30 : 60,
      };
    }
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

  includeFormats(): ModdedDex {
    return this;
  }
}

dexes[BASE_MOD] = new ModdedDex(BASE_MOD);

// 'gen8' is an alias for the current base data
export const Dex = dexes[BASE_MOD];
