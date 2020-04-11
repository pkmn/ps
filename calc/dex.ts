import {
  GenderName,
  GenerationNum,
  ID,
  MoveCategory,
  MoveTarget,
  NatureName,
  Nonstandard,
  StatsTable,
  TypeName,
  BoostsTable,
} from '@pkmn/types';

export type GenID = 'gen1' | 'gen2' | 'gen3' | 'gen4' | 'gen5' | 'gen6' | 'gen7' | 'gen8';

export interface Dex {
  readonly gen: GenerationNum;
  readonly data: {
    Abilities: { [id: string]: AbilityData },
    Items: { [id: string]: ItemData },
    Moves: { [id: string]: MoveData },
    Species: { [id: string]: SpeciesData },
    Natures: { [k: string]: NatureData },
    Types: { [type in Exclude<TypeName, '???'>]: TypeData },
  }

  mod(genid: GenID): Dex;

  getAbility(id: ID): Ability;
  getItem(id: ID): Item;
  getMove(id: ID): Move;
  getSpecies(id: ID): Species;
  getNature(id: ID): Nature;
}

export interface AbilityData  {
  name: string;
}

export interface ItemData {
  name: string;
  megaEvolves?: string;
  isBerry?: boolean;
  naturalGift?: { basePower: number; type: string };
}

export interface MoveFlags {
  contact?: 1 | 0;
  punch?: 1 | 0;
  bite?: 1 | 0;
  bullet?: 1 | 0;
  sound?: 1 | 0;
  pulse?: 1 | 0;
}

export interface SelfOrSecondaryEffect {
  boosts?: Partial<BoostsTable>;
}

export interface MoveData {
  name: string;
  basePower: number;
  type: TypeName;
  category: MoveCategory;
  secondaries?: {self?: {boosts?: Partial<BoostsTable>}}[] | null;
  target: MoveTarget;
  flags: MoveFlags;
  recoil?: [number, number];
  hasCustomRecoil?: boolean;
  willCrit?: boolean;
  heal?: number[] | null;
  priority: number;
  self: {boosts?: Partial<BoostsTable>}
  ignoreDefensive?: boolean;
  defensiveCategory?: MoveCategory;
  breaksProtect?: boolean;
  isZPowered?: boolean;
  maxPowered?: boolean;
  zMovePower?: number;
  gmaxPower?: number;
  multihit?: number | number[];
}

export interface SpeciesAbility {
  0: string;
  1?: string;
  H?: string;
  S?: string;
}

export interface SpeciesData {
  name: string;
  types: string[];
  baseStats: StatsTable;
  weightkg: number;
  evos?: string[];
  gender?: GenderName;
  abilities: SpeciesAbility;
  tier?: string;
}

export interface NatureData {
  name: NatureName;
  plus?: keyof StatsTable;
  minus?: keyof StatsTable;
}

export interface TypeData {
  damageTaken: { [t in Exclude<TypeName, '???'>]?: number } & { [key: string]: number };
  HPdvs?: Partial<StatsTable>;
  HPivs?: Partial<StatsTable>;
}

export interface Effect {
  id: ID;
  gen: GenerationNum;
  isNonstandard?: Nonstandard | null;
  exists: boolean;
}

export interface Ability extends AbilityData, Effect {}
export interface Item extends ItemData, Effect {}
export interface Move extends MoveData, Effect {}
export interface Species extends SpeciesData, Effect {}
export interface Nature extends NatureData, Effect {}