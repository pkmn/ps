import {
  EvoType,
  GenderName,
  GenerationNum,
  ID,
  Nonstandard,
  StatName,
  StatsTable,
  TypeName,
} from '@pkmn/types';

import {
  Dex,
  Effect,
  Nature,
  PureEffect,
  SecondaryEffect,
  SelfEffect,
  Species as DexSpecies,
  SpeciesAbility,
  Type as DexType,
} from '@pkmn/dex-types';

function exists(e: Effect | DexSpecies) {
  if (!e.exists || e.isNonstandard || e.id === 'noability') return false;
  return !('tier' in e && ['Illegal', 'Unreleased'].includes(e.tier));
}

export function toID(text: any): ID {
  if (text?.id) text = text.id;
  if (typeof text !== 'string' && typeof text !== 'number') return '';
  return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '') as ID;
}

const GENERATIONS = Object.create(null) as {[num: number]: Generation};

export class Generations {
  private readonly dex: Dex;
  constructor(dex: Dex) {
    this.dex = dex;
  }

  get(gen: GenerationNum) {
    if (GENERATIONS[gen]) return GENERATIONS[gen];
    return (GENERATIONS[gen] = new Generation(this.dex.forGen(gen)));
  }

  *[Symbol.iterator]() {
    for (let gen = 1; gen <= 8; gen++) {
      yield this.get(gen as GenerationNum);
    }
  }
}

export class Generation {
  readonly abilities: Abilities;
  readonly items: Items;
  readonly moves: Moves;
  readonly species: Species;
  readonly types: Types;
  readonly natures: Natures;
  readonly learnsets: Learnsets;
  readonly effects: Effects;
  readonly stats: Stats;

  readonly dex: Dex;

  constructor(dex: Dex) {
    this.dex = dex;

    this.abilities = new Abilities(this.dex);
    this.items = new Items(this.dex);
    this.moves = new Moves(this.dex);
    this.species = new Species(this.dex);
    this.natures = new Natures(this.dex);
    this.types = new Types(this.dex);
    this.learnsets = new Learnsets(this.dex);
    this.effects = new Effects(this.dex);
    this.stats = new Stats(this.dex);
  }

  get num() {
    return this.dex.gen;
  }
}

export class Abilities {
  private readonly dex: Dex;
  constructor(dex: Dex) {
    this.dex = dex;
  }

  get(name: string) {
    const ability = this.dex.getAbility(name);
    return exists(ability) ? ability : undefined;
  }

  *[Symbol.iterator]() {
    for (const ability in this.dex.data.Abilities) {
      const a = this.get(ability);
      if (a) yield a;
    }
  }
}

export class Items {
  private readonly dex: Dex;
  constructor(dex: Dex) {
    this.dex = dex;
  }

  get(name: string) {
    const item = this.dex.getItem(name);
    return exists(item) ? item : undefined;
  }

  *[Symbol.iterator]() {
    for (const item in this.dex.data.Items) {
      const i = this.get(item);
      if (i) yield i;
    }
  }
}

export class Moves {
  private readonly dex: Dex;
  constructor(dex: Dex) {
    this.dex = dex;
  }

  get(name: string) {
    const move = this.dex.getMove(name);
    return exists(move) ? move : undefined;
  }

  *[Symbol.iterator]() {
    for (const move in this.dex.data.Moves) {
      const m = this.get(move);
      if (m) yield m;
    }
  }
}

export class Species {
  private readonly cache = Object.create(null) as { [id: string]: Specie };

  private readonly dex: Dex;
  constructor(dex: Dex) {
    this.dex = dex;
  }

  getFormeName(name: string) {
    return this.dex.getForme(name);
  }

  get(name: string) {
    const species = this.dex.getSpecies(name);
    if (!exists(species)) return undefined;
    const id = (species as any).speciesid || species.id; // FIXME Event-only ability hack
    const cached = this.cache[id];
    if (cached) return cached;
    return (this.cache[id] = new Specie(this.dex, species));
  }

  *[Symbol.iterator]() {
    for (const species in this.dex.data.Species) {
      const s = this.get(species);
      if (s) yield s;
    }
  }
}

export class Specie implements DexSpecies {
  readonly id!: ID;
  readonly name!: string;
  readonly fullname!: string;
  readonly exists!: boolean;
  readonly num!: number;
  readonly gen!: GenerationNum;
  readonly shortDesc!: string;
  readonly desc!: string;
  readonly isNonstandard!: Nonstandard | null;
  readonly duration?: number;
  readonly noCopy?: boolean;
  readonly affectsFainted?: boolean;
  readonly status?: ID;
  readonly weather?: ID;
  readonly sourceEffect!: string;
  readonly counterMax?: number;
  readonly drain?: [number, number];
  readonly effect?: Partial<PureEffect>;
  readonly infiltrates?: boolean;
  readonly isZ?: boolean | string;
  readonly isMax?: boolean | string;
  readonly recoil?: [number, number];
  readonly secondary?: SecondaryEffect | null;
  readonly secondaries?: SecondaryEffect[] | null;
  readonly self?: SelfEffect | null;


  readonly effectType!: 'Pokemon';
  readonly baseSpecies!: string;
  readonly baseForme!: string;
  readonly forme!: string;
  readonly abilities!: SpeciesAbility;
  readonly types!: TypeName[];
  readonly prevo!: ID;
  readonly evos!: ID[];
  readonly nfe!: boolean;
  readonly eggGroups!: string[];
  readonly gender?: GenderName;
  readonly genderRatio!: { M: number; F: number };
  readonly baseStats!: StatsTable;
  readonly maxHP?: number;
  readonly weightkg!: number;
  readonly weighthg!: number;
  readonly heightm!: number;
  readonly color!: string;
  readonly unreleasedHidden!: boolean | 'Past';
  readonly maleOnlyHidden!: boolean;
  readonly isMega?: boolean;
  readonly isPrimal?: boolean;
  readonly isGigantamax?: string;
  readonly battleOnly?: string | string[];
  readonly inheritsFrom!: ID;
  readonly tier!: string;
  readonly doublesTier!: string;
  readonly canHatch?: boolean;
  readonly evoLevel?: number;
  readonly evoMove?: string;
  readonly evoCondition?: string;
  readonly evoItem?: string;
  readonly evoType?: EvoType;
  readonly cosmeticFormes?: string[];
  readonly otherFormes?: string[];
  readonly requiredAbility?: string;
  readonly requiredItem?: string;
  readonly requiredItems?: string[];
  readonly requiredMove?: string;

  private readonly dex: Dex;
  constructor(dex: Dex, species: DexSpecies) {
    Object.assign(this, species);
    this.dex = dex;
  }

  hasAbility(ability: string) {
    return this.dex.hasAbility(this, ability);
  }

  getOutOfBattleSpeciesName() {
    return this.dex.getOutOfBattleSpecies(this);
  }
}

export class Effects {
  private readonly dex: Dex;
  constructor(dex: Dex) {
    this.dex = dex;
  }

  get(name: string) {
    const effect = this.dex.getEffect(name);
    return exists(effect) ? effect : undefined;
  }
}

export class Natures {
  private readonly dex: Dex;
  constructor(dex: Dex) {
    this.dex = dex;
  }

  get(name: string) {
    if (this.dex.gen < 3) return undefined;
    const nature = this.dex.getNature(name);
    return nature.exists ? nature : undefined;
  }

  *[Symbol.iterator]() {
    for (const nature in this.dex.data.Natures) {
      const n = this.get(nature);
      if (n) yield n;
    }
  }
}

const EFFECTIVENESS = {
  '-2': 0.25,
  '-1': 0.5,
  '0': 1,
  '1': 2,
  '2': 4,
};

export class Types {
  private readonly cache = Object.create(null) as { [id: string]: Type };

  private readonly dex: Dex;
  constructor(dex: Dex) {
    this.dex = dex;
  }

  get(name: string) {
    const type = this.dex.getType(name);
    if (!type.exists) return undefined;
    const cached = this.cache[type.id];
    if (cached) return cached;
    return (this.cache[type.id] = new Type(type));
  }

  *[Symbol.iterator]() {
    for (const type in this.dex.data.Types) {
      yield this.get(type);
    }
  }

  getHiddenPower(ivs: StatsTable) {
    return this.dex.getHiddenPower(ivs);
  }

  // TODO move to Type, clean up ordering/name
  getImmunity(
    source: { type: string } | string,
    target: { getTypes: () => string[] } | { types: string[] } | string[] | string
  ) {
    return this.dex.getImmunity(source, target);
  }

  // TODO: move to type
  getEffectiveness(
    source: { type: string } | string,
    target: { getTypes: () => string[] } | { types: string[] } | string[] | string
  ) {
    const e = `${this.dex.getEffectiveness(source, target)}`;
    // convert from PS's ridiculous encoding to something usable
    return EFFECTIVENESS[e as keyof typeof EFFECTIVENESS];
  }
}

const DAMAGE_TAKEN = [1, 2, 0.5, 0];

export class Type {
  readonly id!: ID;
  readonly name!: string;
  readonly effectType!: 'Type';
  readonly exists!: boolean;
  readonly gen!: GenerationNum;
  readonly damageTaken: { [t in Exclude<TypeName, '???'>]: number };
  readonly HPivs!: Partial<StatsTable>;
  readonly HPdvs!: Partial<StatsTable>;

  constructor(type: DexType) {
    Object.assign(this, type);

    this.damageTaken = {} as { [t in Exclude<TypeName, '???'>]: number };
    for (const k in type.damageTaken) {
      const t = k as Exclude<TypeName, '???'>;
      // convert from PS's ridiculous encoding to something usable
      this.damageTaken[t] = DAMAGE_TAKEN[type.damageTaken[k]];
    }
  }
}

export class Learnsets {
  private readonly dex: Dex;
  constructor(dex: Dex) {
    this.dex = dex;
  }

  async get(name: string) {
    const learnset = await this.dex.getLearnset(toID(name));
    return learnset.exists ? learnset : undefined;
  }

  async *[Symbol.iterator]() {
    if (!this.dex.data.Learnsets) await this.dex.getLearnset('LOAD' as ID);
    for (const id in this.dex.data.Learnsets) {
      const l = await this.get(id);
      if (l) yield l;
    }
  }
}

const STATS = ['hp', 'atk', 'def', 'spe', 'spa', 'spd'] as const;

const NAMES: Readonly<{ [name: string]: StatName }> = {
  HP: 'hp', hp: 'hp',
  Attack: 'atk', Atk: 'atk', atk: 'atk',
  Defense: 'def', Def: 'def', def: 'def',
  'Special Attack': 'spa', SpA: 'spa', SAtk: 'spa', SpAtk: 'spa', spa: 'spa',
  Special: 'spa', spc: 'spa', Spc: 'spa',
  'Special Defense': 'spd', SpD: 'spd', SDef: 'spd', SpDef: 'spd', spd: 'spd',
  Speed: 'spe', Spe: 'spe', Spd: 'spe', spe: 'spe',
};

const DISPLAY: Readonly<{ [stat: string]: Readonly<[string, string]> }> = {
  hp: ['HP', 'HP'],
  atk: ['Atk', 'Attack'],
  def: ['Def', 'Defense'],
  spa: ['SpA', 'Special Attack'],
  spd: ['SpD', 'Special Defense'],
  spe: ['Spd', 'Speed'],
  spc: ['Spc', 'Special'],
};

export class Stats {
  private readonly dex: Dex;
  constructor(dex: Dex) {
    this.dex = dex;
  }

  calc(stat: StatName, base: number, iv?: number, ev?: number, level?: number): number;
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  calc(stat: StatName, base: number, iv: number, ev: number, level: number, nature: Nature): number;
  calc(stat: StatName, base: number, iv = 31, ev = 252, level = 100, nature?: Nature) {
    return this.dex.gen < 3
      ? calcRBY(stat, base, this.itod(iv), ev, level)
      : calcADV(stat, base, iv, ev, level, nature);
  }

  get(s: string): StatName | undefined {
    return NAMES[s];
  }

  display(str: string, full = false): string {
    let s: StatName | 'spc' | undefined = NAMES[str];
    if (s === undefined) return str;
    if (this.dex.gen === 1 && s === 'spa') s = 'spc';
    return DISPLAY[s][+full];
  }

  fill<T>(stats: Partial<StatsTable<T>>, val: T): StatsTable<T> {
    for (const stat of STATS) {
      if (!(stat in stats)) stats[stat] = val;
    }
    return stats as StatsTable<T>;
  }

  getHPDV(ivs: Partial<StatsTable>): number {
    return (
      (this.itod(ivs.atk === undefined ? 31 : ivs.atk) % 2) * 8 +
      (this.itod(ivs.def === undefined ? 31 : ivs.def) % 2) * 4 +
      (this.itod(ivs.spe === undefined ? 31 : ivs.spe) % 2) * 2 +
      (this.itod(ivs.spa === undefined ? 31 : ivs.spa) % 2)
    );
  }

  *[Symbol.iterator](): IterableIterator<StatName> {
    for (const s of STATS) {
      yield s;
    }
  }

  itod(iv: number): number {
    return Math.floor(iv / 2);
  }

  dtoi(dv: number): number {
    return dv * 2 + 1;
  }
}

function calcRBY(stat: StatName, base: number, dv: number, ev: number, level: number) {
  // BUG: we ignore EVs - do we care about converting ev to stat experience?
  if (stat === 'hp') {
    return Math.floor((((base + dv) * 2 + 63) * level) / 100) + level + 10;
  } else {
    return Math.floor((((base + dv) * 2 + 63) * level) / 100) + 5;
  }
}

function calcADV(
  stat: StatName,
  base: number,
  iv: number,
  ev: number,
  level: number,
  nature?: Nature
) {
  if (stat === 'hp') {
    return base === 1
      ? base
      : Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
  } else {
    let mod = 1;
    if (nature !== undefined) {
      if (nature.plus === stat) {
        mod = 1.1;
      } else if (nature.minus === stat) {
        mod = 0.9;
      }
    }
    return Math.floor((Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * level) / 100) + 5) * mod);
  }
}
