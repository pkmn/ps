import {
  As,
  BoostsTable,
  EggGroup,
  EvoType,
  GenderName,
  GenerationNum,
  ID,
  MoveCategory,
  MoveTarget,
  NatureName,
  Nonstandard,
  StatID,
  StatsTable,
  StatusName,
  Tier,
  TypeName,
} from '@pkmn/types';

export type AbilityName = string & As<'AbilityName'>;
export type ItemName = string & As<'ItemName'>;
export type MoveName = string & As<'MoveName'>;
export type SpeciesName = string & As<'SpeciesName'>;
export type FormeName = string & As<'FormeName'>;

export type EffectType =
  'Condition' | 'Pokemon' | 'Move' | 'Item' | 'Ability' |
  'Nature' | 'Weather' | 'Status' | 'Terastal';
export type Effect = Ability | Item | Move | Condition;

export type DataKind =
  'Condition' | 'Species' | 'Move' | 'Item' | 'Ability' | 'Nature' | 'Type' | 'Learnset';
export type Data = Condition | Species | Move | Item | Ability | Nature | Type | Learnset;

export interface EffectData {
  name: string;
  num: number;

  desc?: string;
  effectType?: EffectType;
  isNonstandard?: Nonstandard | null;
  shortDesc?: string;
  inherit?: boolean;
  duration?: number;
}

export interface ConditionData extends Omit<EffectData, 'num'> {
  noCopy?: boolean;
  counterMax?: number;
  affectsFainted?: boolean;
  onResidualOrder?: number;
  onResidualSubOrder?: number;
}

export interface AbilityData extends EffectData {
  isBreakable?: boolean;
  isPermanent?: boolean;
  suppressWeather?: boolean;
  condition?: Partial<ConditionData>;
}

export interface ItemData extends EffectData {
  gen: GenerationNum;

  condition?: Partial<ConditionData>;
  fling?: {
    basePower: number;
    status?: StatusName;
    volatileStatus?: string;
  };
  forcedForme?: string;
  ignoreKlutz?: boolean;
  isBerry?: boolean;
  isChoice?: boolean;
  isGem?: boolean;
  isPokeball?: boolean;
  megaStone?: string;
  megaEvolves?: string;
  naturalGift?: { basePower: number; type: TypeName };
  onDrive?: string;
  onMemory?: string;
  onPlate?: string;
  zMove?: string | true;
  zMoveType?: string;
  zMoveFrom?: string;
  itemUser?: string[];
  boosts?: Partial<BoostsTable> | false;
}

interface MoveFlags {
  bypasssub?: 1 | 0;
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
  allyanim?: 1 | 0;
  nonsky?: 1 | 0;
  powder?: 1 | 0;
  protect?: 1 | 0;
  pulse?: 1 | 0;
  punch?: 1 | 0;
  recharge?: 1 | 0;
  reflectable?: 1 | 0;
  slicing?: 1 | 0;
  snatch?: 1 | 0;
  sound?: 1 | 0;
  wind?: 1 | 0;
}

export interface HitEffect {
  boosts?: Partial<BoostsTable>;
  status?: StatusName;
  volatileStatus?: string;

  sideCondition?: string;
  slotCondition?: string;

  pseudoWeather?: string;
  terrain?: string;
  weather?: string;
}

export interface SecondaryEffect extends HitEffect {
  chance?: number;
  ability?: Ability;
  dustproof?: boolean;
  kingsrock?: boolean;
  self?: HitEffect;
}

export interface MoveData extends EffectData, HitEffect {
  basePower: number;
  type: TypeName;
  accuracy: true | number;
  pp: number;
  target: MoveTarget;
  priority: number;
  flags: MoveFlags;
  category: MoveCategory;

  realMove?: string;
  condition?: Partial<ConditionData>;
  damage?: number | 'level' | false | null;
  noPPBoosts?: boolean;

  isZ?: boolean | string;
  zMove?: {
    basePower?: number;
    effect?: string;
    boost?: Partial<BoostsTable>;
  };
  isMax?: boolean | string;
  maxMove?: {
    basePower: number;
  };

  ohko?: boolean | TypeName;
  thawsTarget?: boolean;
  heal?: number[] | null;
  forceSwitch?: boolean;
  selfSwitch?: 'copyvolatile' | 'shedtail' | boolean;
  selfBoost?: { boosts?: Partial<BoostsTable> };
  selfdestruct?: boolean | 'ifHit' | 'always';
  breaksProtect?: boolean;
  recoil?: [number, number];
  drain?: [number, number];
  mindBlownRecoil?: boolean;
  stealsBoosts?: boolean;
  secondary?: SecondaryEffect | null;
  secondaries?: SecondaryEffect[] | null;
  self?: HitEffect | null;
  struggleRecoil?: boolean;

  alwaysHit?: boolean;
  basePowerModifier?: number;
  critModifier?: number;
  critRatio?: number;
  overrideOffensivePokemon?: 'target' | 'source';
  overrideOffensiveStat?: Exclude<StatID, 'hp'>;
  overrideDefensivePokemon?: 'target' | 'source';
  overrideDefensiveStat?: Exclude<StatID, 'hp'>;
  forceSTAB?: boolean;
  ignoreAbility?: boolean;
  ignoreAccuracy?: boolean;
  ignoreDefensive?: boolean;
  ignoreEvasion?: boolean;
  ignoreImmunity?: boolean | { [k in keyof TypeName]?: boolean };
  ignoreNegativeOffensive?: boolean;
  ignoreOffensive?: boolean;
  ignorePositiveDefensive?: boolean;
  ignorePositiveEvasion?: boolean;
  infiltrates?: boolean;
  orderUpBoost?: boolean;
  multiaccuracy?: boolean;
  multihit?: number | number[];
  noCopy?: boolean;
  noDamageVariance?: boolean;
  noFaint?: boolean;
  nonGhostTarget?: MoveTarget;
  pressureTarget?: MoveTarget;
  sleepUsable?: boolean;
  smartTarget?: boolean;
  spreadModifier?: number;
  tracksTarget?: boolean;
  willCrit?: boolean;

  hasCrashDamage?: boolean;
  hasSheerForce?: boolean;
  isConfusionSelfHit?: boolean;
  isFutureMove?: boolean;
  noMetronome?: string[];
  noSketch?: boolean;
  stallingMove?: boolean;
}

export type SpeciesTag = 'Mythical' | 'Restricted Legendary' | 'Sub-Legendary' | 'Paradox';
export interface SpeciesAbility<A = string> { 0: A; 1?: A; H?: A; S?: A }

export interface SpeciesData {
  abilities: SpeciesAbility;
  baseStats: StatsTable;
  eggGroups: EggGroup[];
  num: number;
  name: string;
  types: string[];
  weightkg: number;

  tags?: SpeciesTag[];
  condition?: Partial<Condition>;
  canHatch?: boolean;
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
  genderRatio?: { M: number; F: number };
  maxHP?: number;
  cosmeticFormes?: string[];
  otherFormes?: string[];
  formeOrder?: string[];
  prevo?: string;
  gen?: GenerationNum;
  requiredAbility?: string;
  requiredItem?: string;
  requiredItems?: string[];
  requiredMove?: string;
  battleOnly?: string | string[];
  canGigantamax?: string;
  gmaxUnreleased?: boolean;
  cannotDynamax?: boolean;
  changesFrom?: string;
  tier?: Tier.Singles | Tier.Other;
  inherit?: boolean;
}

export type MoveSource = string;

export interface EventInfoData {
  generation: number; // sigh

  level?: number;
  shiny?: boolean | 1;
  gender?: GenderName;
  nature?: string;
  ivs?: Partial<StatsTable>;
  perfectIVs?: number;
  isHidden?: boolean;
  abilities?: string[];
  maxEggMoves?: number;
  moves?: string[];
  pokeball?: string;
  from?: string;
  japan?: boolean;
}

export interface LearnsetData {
  learnset?: { [moveid: string]: MoveSource[] };
  eventData?: EventInfoData[];
  eventOnly?: boolean;
  encounters?: EventInfoData[];
  exists?: boolean;
}

export interface TypeData {
  damageTaken: { [t in Exclude<TypeName, '???'>]?: number } & { [key: string]: number };
  HPdvs?: Partial<StatsTable>;
  HPivs?: Partial<StatsTable>;
  isNonstandard?: Nonstandard | null;
  inherit?: boolean;
}

export interface NatureData {
  name: NatureName;
  plus?: Exclude<StatID, 'hp'>;
  minus?: Exclude<StatID, 'hp'>;
}

export interface BasicEffect<NameT extends string = string> extends Readonly<EffectData> {
  id: ID;
  name: NameT;
  fullname: string;
  effectType: EffectType;
  kind: DataKind;
  exists: boolean;
  num: number;
  gen: GenerationNum;
  shortDesc: string;
  desc: string;
  isNonstandard: Nonstandard | null;
  duration?: number;
}

export interface Condition extends Readonly<BasicEffect> {
  readonly effectType: 'Condition' | 'Weather' | 'Status' | 'Terastal';
  readonly kind: 'Condition';
}

export interface Ability extends Readonly<BasicEffect<AbilityName> & AbilityData> {
  readonly effectType: 'Ability';
  readonly kind: 'Ability';
}

export interface Item extends Readonly<BasicEffect<ItemName> & ItemData> {
  readonly effectType: 'Item';
  readonly kind: 'Item';
  readonly forcedForme?: SpeciesName;
  readonly megaStone?: SpeciesName;
  readonly megaEvolves?: SpeciesName;
  readonly onDrive?: TypeName;
  readonly onMemory?: TypeName;
  readonly onPlate?: TypeName;
  readonly zMove?: MoveName | true;
  readonly zMoveType?: TypeName;
  readonly zMoveFrom?: MoveName;
  readonly itemUser?: SpeciesName[];
}

export interface Move extends Readonly<BasicEffect<MoveName> & MoveData> {
  readonly effectType: 'Move';
  readonly kind: 'Move';
  readonly secondaries: SecondaryEffect[] | null;
  readonly flags: MoveFlags;
  readonly zMoveEffect?: ID;
  readonly isZ: boolean | ID;
  readonly zMove?: {
    basePower?: number;
    effect?: ID;
    boost?: Partial<BoostsTable>;
  };
  readonly isMax: boolean | SpeciesName;
  readonly maxMove?: {
    basePower: number;
  };
  readonly noMetronome?: MoveName[];
  readonly volatileStatus?: ID;
  readonly slotCondition?: ID;
  readonly sideCondition?: ID;
  readonly terrain?: ID;
  readonly pseudoWeather?: ID;
  readonly weather?: ID;
}

export interface Species extends Readonly<BasicEffect<SpeciesName> & SpeciesData> {
  readonly effectType: 'Pokemon';
  readonly kind: 'Species';
  readonly baseSpecies: SpeciesName;
  readonly baseForme: FormeName | '';
  readonly canHatch: boolean;
  readonly forme: FormeName | '';
  readonly abilities: SpeciesAbility<AbilityName | ''>;
  readonly types: [TypeName] | [TypeName, TypeName];
  readonly prevo?: SpeciesName | '';
  readonly evos?: SpeciesName[];
  readonly nfe: boolean;
  readonly evoMove?: MoveName;
  readonly cosmeticFormes?: SpeciesName[];
  readonly otherFormes?: SpeciesName[];
  readonly formeOrder?: SpeciesName[];
  readonly genderRatio: { M: number; F: number };
  readonly weighthg: number;
  readonly tags: SpeciesTag[];
  readonly unreleasedHidden: boolean | 'Past';
  readonly maleOnlyHidden: boolean;
  readonly changesFrom?: SpeciesName;
  readonly tier: Tier.Singles | Tier.Other | 'Illegal';
  readonly doublesTier: Tier.Doubles | 'Illegal';
  readonly isMega?: boolean;
  readonly isPrimal?: boolean;
  readonly battleOnly?: SpeciesName | SpeciesName[];
  readonly isGigantamax?: MoveName;
  readonly requiredAbility?: AbilityName;
  readonly requiredItem?: ItemName;
  readonly requiredItems?: ItemName[];
  readonly requiredMove?: MoveName;
}

export interface EventInfo extends Readonly<EventInfoData> {
  readonly gen: GenerationNum;
  readonly nature?: NatureName;
  readonly abilities?: ID[];
  readonly moves?: string[];
  readonly pokeball?: string;
}

export interface Learnset {
  readonly effectType: 'Learnset';
  readonly kind: 'Learnset';
  readonly exists: boolean;
  readonly eventOnly: boolean;
  readonly eventData?: EventInfo[];
  readonly encounters?: EventInfo[];
  readonly learnset?: { [moveid: string]: MoveSource[] };
}

export interface Type extends Readonly<TypeData> {
  readonly effectType: 'Type';
  readonly kind: 'Type';
  readonly id: ID;
  readonly name: TypeName;
  readonly exists: boolean;
  readonly gen: GenerationNum;
  readonly damageTaken: { [t in Exclude<TypeName, '???'>]: number } & { [key: string]: number };
  readonly HPivs: Partial<StatsTable>;
  readonly HPdvs: Partial<StatsTable>;
}

export interface Nature extends NatureData {
  readonly effectType: 'Nature';
  readonly kind: 'Nature';
  readonly id: ID;
  readonly name: NatureName;
  readonly gen: GenerationNum;
  readonly exists?: boolean;
}

export type GenID = 'gen1' | 'gen2' | 'gen3' | 'gen4' | 'gen5' | 'gen6' | 'gen7' | 'gen8' | 'gen9';
export type ModData = DeepPartial<Dex['data'] & {Scripts: {inherit: GenID}}>;

export interface DexTable<T> {
  get(name: string): T;
  getByID(id: ID): T;
}

export interface Dex {
  readonly gen: GenerationNum;
  readonly modid: ID;
  readonly data: {
    Abilities: { [id: string]: AbilityData };
    Aliases: { [id: string]: string };
    Items: { [id: string]: ItemData };
    Moves: { [id: string]: MoveData };
    Species: { [id: string]: SpeciesData };
    Natures: { [id: string]: NatureData };
    Learnsets: null | { [id: string]: LearnsetData };
    Types: { [id: string]: TypeData };
  };

  mod(genid: GenID): Dex;
  mod(modid: ID, modData: ModData): Dex;

  forGen(gen: number): Dex;
  includeModData(): this;
  includeData(): this;
  includeFormats(): this;

  abilities: DexTable<Ability>;
  conditions: DexTable<Condition>;
  items: DexTable<Item>;
  learnsets: DexTable<Promise<Learnset>>;
  moves: DexTable<Move>;
  natures: DexTable<Nature>;
  species: DexTable<Species>;
  types: DexTable<Type>;

  getHiddenPower(ivs: StatsTable): { type: TypeName; power: number };
  getImmunity(
    source: { type: string } | string,
    target: { getTypes: () => string[] } | { types: string[] } | string[] | string
  ): boolean;
  getEffectiveness(
    source: { type: string } | string,
    target: { getTypes: () => string[] } | { types: string[] } | string[] | string
  ): number;
}

export * from '@pkmn/types';

// https://github.com/krzkaczor/ts-essentials v6.0.5
// MIT License Copyright 2018-2019 Chris Kaczor

export type Primitive = string | number | boolean | bigint | symbol | undefined | null;
export type Builtin = Primitive | Function | Date | Error | RegExp;

export type IsTuple<T> =
  T extends [infer A] ? T
  : T extends [infer A, infer B] ? T
  : T extends [infer A, infer B, infer C] ? T
  : T extends [infer A, infer B, infer C, infer D] ? T
  : T extends [infer A, infer B, infer C, infer D, infer E] ? T
  : never;

export type DeepPartial<T> =
  T extends Builtin ? T
  : T extends Map<infer K, infer V> ? Map<DeepPartial<K>, DeepPartial<V>>
  : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepPartial<K>, DeepPartial<V>>
  : T extends Set<infer U> ? Set<DeepPartial<U>>
  : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPartial<U>>
  : T extends Array<infer U> ? T extends IsTuple<T>
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : Array<DeepPartial<U>>
  : T extends Promise<infer U> ? Promise<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
