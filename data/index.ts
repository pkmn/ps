import {
  AbilityName,
  Condition,
  Data,
  Dex,
  EggGroup,
  EvoType,
  FormeName,
  GenderName,
  GenerationNum,
  ID,
  ItemName,
  MoveCategory,
  MoveName,
  Nature,
  Nonstandard,
  Species as DexSpecies,
  SpeciesAbility,
  SpeciesName,
  StatName,
  StatsTable,
  Tier,
  Type as DexType,
  TypeName,
} from '@pkmn/dex-types';

const DEFAULT_EXISTS = (d: Data) => {
  if (!d.exists) return false;
  if ('isNonstandard' in d && d.isNonstandard) return false;
  if (d.kind === 'Ability' && d.id === 'noability') return false;
  return !('tier' in d && ['Illegal', 'Unreleased'].includes(d.tier));
};

type ExistsFn = typeof DEFAULT_EXISTS;

function assignWithout(a: {[key: string]: any}, b: {[key: string]: any}, exclude: Set<string>) {
  for (const key in b) {
    if (Object.prototype.hasOwnProperty.call(b, key) && !exclude.has(key)) {
      a[key] = b[key];
    }
  }
}

export function toID(text: any): ID {
  if (text?.id) text = text.id;
  if (typeof text !== 'string' && typeof text !== 'number') return '';
  return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '') as ID;
}

export class Generations {
  private readonly cache = Object.create(null) as {[num: number]: Generation};

  private readonly dex: Dex;
  private readonly exists: ExistsFn;

  constructor(dex: Dex, exists = DEFAULT_EXISTS) {
    this.dex = dex;
    this.exists = exists;
  }

  get(gen: GenerationNum) {
    if (this.cache[gen]) return this.cache[gen];
    return (this.cache[gen] = new Generation(this.dex.forGen(gen), this.exists));
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

  private readonly exists: ExistsFn;

  constructor(dex: Dex, exists: ExistsFn) {
    this.dex = dex;
    this.exists = exists;

    this.abilities = new Abilities(this.dex, this.exists);
    this.items = new Items(this.dex, this.exists);
    this.moves = new Moves(this.dex, this.exists);
    this.species = new Species(this.dex, this.exists);
    this.natures = new Natures(this.dex, this.exists);
    this.types = new Types(this.dex, this.exists);
    this.learnsets = new Learnsets(this.dex, this.exists);
    this.effects = new Effects(this.dex, this.exists);
    this.stats = new Stats(this.dex);
  }

  get num() {
    return this.dex.gen;
  }
}

export class Abilities {
  private readonly dex: Dex;
  private readonly exists: ExistsFn;

  constructor(dex: Dex, exists: ExistsFn) {
    this.dex = dex;
    this.exists = exists;
  }

  get(name: string) {
    const ability = this.dex.getAbility(name);
    return this.exists(ability) ? ability : undefined;
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
  private readonly exists: ExistsFn;

  constructor(dex: Dex, exists: ExistsFn) {
    this.dex = dex;
    this.exists = exists;
  }

  get(name: string) {
    const item = this.dex.getItem(name);
    return this.exists(item) ? item : undefined;
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
  private readonly exists: ExistsFn;

  constructor(dex: Dex, exists: ExistsFn) {
    this.dex = dex;
    this.exists = exists;
  }

  get(name: string) {
    const move = this.dex.getMove(name);
    return this.exists(move) ? move : undefined;
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
  private readonly exists: ExistsFn;

  constructor(dex: Dex, exists: ExistsFn) {
    this.dex = dex;
    this.exists = exists;
  }

  get(name: string) {
    const species = this.dex.getSpecies(name);
    if (!this.exists(species)) return undefined;
    const id = (species as any).speciesid || species.id; // FIXME Event-only ability hack
    const cached = this.cache[id];
    if (cached) return cached;
    return (this.cache[id] = new Specie(this.dex, this.exists, species));
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
  readonly name!: SpeciesName;
  readonly fullname!: string;
  readonly exists!: boolean;
  readonly num!: number;
  readonly gen!: GenerationNum;
  readonly shortDesc!: string;
  readonly desc!: string;
  readonly isNonstandard!: Nonstandard | null;
  readonly duration?: number;

  readonly effectType!: 'Pokemon';
  readonly kind!: 'Species';
  readonly baseStats!: StatsTable;
  readonly baseSpecies!: SpeciesName;
  readonly baseForme!: FormeName | '';
  readonly forme!: FormeName | '';
  readonly abilities!: SpeciesAbility<AbilityName | ''>;
  readonly types!: [TypeName] | [TypeName, TypeName];
  readonly prevo?: SpeciesName | '';
  readonly evos?: SpeciesName[];
  readonly nfe: boolean;
  readonly eggGroups!: EggGroup[];
  readonly weightkg!: number;
  readonly weighthg!: number;
  readonly heightm!: number;
  readonly unreleasedHidden!: boolean | 'Past';
  readonly maleOnlyHidden!: boolean;
  readonly inheritsFrom!: ID;
  readonly tier!: Tier.Singles | Tier.Other;
  readonly doublesTier!: Tier.Doubles;

  readonly evoMove?: MoveName;
  readonly cosmeticFormes?: SpeciesName[];
  readonly otherFormes?: SpeciesName[];
  readonly formeOrder?: SpeciesName[];
  readonly formes?: SpeciesName[];
  readonly genderRatio: { M: number; F: number };
  readonly isMega?: boolean;
  readonly isPrimal?: boolean;
  readonly battleOnly?: SpeciesName | SpeciesName[];
  readonly isGigantamax?: MoveName;
  readonly requiredAbility?: AbilityName;
  readonly requiredItem?: ItemName;
  readonly requiredItems?: ItemName[];
  readonly requiredMove?: MoveName;
  readonly gender?: GenderName;
  readonly maxHP?: number;
  readonly evoLevel?: number;
  readonly evoCondition?: string;
  readonly evoItem?: string;
  readonly evoType?: EvoType;
  readonly condition?: Partial<Condition>;
  readonly canHatch!: boolean;

  private readonly dex: Dex;

  private static readonly EXCLUDE = new Set([
    'evos',
    'gender',
    'genderRatio',
    'cosmeticFormes',
    'nfe',
    'otherFormes',
    'prevo',
  ]);

  constructor(dex: Dex, exists: ExistsFn, species: DexSpecies) {
    assignWithout(this, species, Specie.EXCLUDE);
    this.dex = dex;
    if (this.dex.gen >= 2) {
      this.gender = species.gender;
      this.genderRatio = species.genderRatio;
    } else {
      this.genderRatio = {M: 0, F: 0};
    }
    this.evos = species.evos?.filter(s => exists(this.dex.getSpecies(s)));
    this.nfe = !!this.evos?.length;
    if (!this.nfe) this.evos = undefined;
    this.cosmeticFormes = species.cosmeticFormes?.filter(s => exists(this.dex.getSpecies(s)));
    if (!this.cosmeticFormes?.length) this.cosmeticFormes = undefined;
    this.otherFormes = species.otherFormes?.filter(s => exists(this.dex.getSpecies(s)));
    if (!this.otherFormes?.length) this.otherFormes = undefined;
    this.formeOrder = species.formeOrder?.filter(s => exists(this.dex.getSpecies(s)));
    if (!this.formeOrder?.length) this.formeOrder = undefined;
    this.formes = this.formeOrder?.filter(s => !this.dex.getSpecies(s).isGigantamax);
    this.prevo =
      species.prevo && exists(this.dex.getSpecies(species.prevo)) ? species.prevo : undefined;
  }

  hasAbility(ability: string) {
    return this.dex.hasAbility(this, ability);
  }

  get formeNum() {
    return (this.baseSpecies === this.name
      ? this.formeOrder ? this.formeOrder.findIndex(name => name === this.name) : 0
      : this.dex.getSpecies(this.baseSpecies).formeOrder!.findIndex(
        name => name === (this.isGigantamax ? this.baseSpecies : this.name)
      ));
  }
}

export class Effects {
  private readonly dex: Dex;
  private readonly exists: ExistsFn;

  constructor(dex: Dex, exists: ExistsFn) {
    this.dex = dex;
    this.exists = exists;
  }

  get(name: string) {
    const effect = this.dex.getEffect(name);
    return this.exists(effect) ? effect : undefined;
  }
}

export class Natures {
  private readonly dex: Dex;
  private readonly exists: ExistsFn;

  constructor(dex: Dex, exists: ExistsFn) {
    this.dex = dex;
    this.exists = exists;
  }

  get(name: string) {
    if (this.dex.gen < 3) return undefined;
    const nature = this.dex.getNature(name);
    return this.exists(nature) ? nature : undefined;
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

type TypeTarget = { getTypes: () => TypeName[] } | { types: TypeName[] } | TypeName[] | TypeName;

export class Types {
  private readonly cache = Object.create(null) as { [id: string]: Type };

  private readonly unknown: Type;
  private readonly dex: Dex;
  private readonly exists: ExistsFn;

  constructor(dex: Dex, exists: ExistsFn) {
    this.dex = dex;
    this.exists = exists;
    // PS doesn't contain data for the '???' type
    this.unknown = new Type({
      effectType: 'Type',
      kind: 'Type',
      // Regrettably PS ID's can't represent '???'
      id: '',
      name: '???',
      // Technically this only exists as a true type in Gens 2-4, but there are moves dealing
      // typeless damage in Gen 1 so we include it there.
      exists: dex.gen <= 4,
      gen: 1,
      // This gets filled in for us by Type's constructor
      damageTaken: {} as { [t in Exclude<TypeName, '???'>]: number },
      HPivs: {},
      HPdvs: {},
    }, dex, this);
  }

  get(name: string) {
    if (name === '???') return this.unknown;
    const type = this.dex.getType(name);
    if (!this.exists(type)) return undefined;
    const cached = this.cache[type.id];
    if (cached) return cached;
    return (this.cache[type.id] = new Type(type, this.dex, this));
  }

  *[Symbol.iterator]() {
    for (const type in this.dex.data.Types) {
      yield this.get(type)!;
    }
    if (this.dex.gen >= 2 && this.dex.gen <= 4) {
      yield this.unknown;
    }
  }

  getHiddenPower(ivs: StatsTable) {
    return this.dex.getHiddenPower(ivs);
  }

  canDamage(source: { type: TypeName } | TypeName, target: TypeTarget) {
    return this.dex.getImmunity(source, target);
  }

  totalEffectiveness(source: { type: TypeName } | TypeName, target: TypeTarget) {
    const e = `${this.dex.getEffectiveness(source, target)}`;
    // convert from PS's ridiculous encoding to something usable
    return EFFECTIVENESS[e as keyof typeof EFFECTIVENESS];
  }
}

export type TypeEffectiveness = 0 | 0.5 | 1 | 2;

const DAMAGE_TAKEN = [1, 2, 0.5, 0] as TypeEffectiveness[];
const SPECIAL = ['Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Psychic', 'Dark', 'Dragon'];

export class Type {
  readonly id!: ID;
  readonly name!: TypeName;
  readonly effectType!: 'Type';
  readonly kind!: 'Type';
  readonly exists!: boolean;
  readonly gen!: GenerationNum;
  readonly effectiveness: { [t in TypeName]: TypeEffectiveness };
  readonly HPivs!: Partial<StatsTable>;
  readonly HPdvs!: Partial<StatsTable>;
  readonly category?: Exclude<MoveCategory, 'Status'>;

  private readonly types: Types;

  constructor(type: DexType, dex: Dex, types: Types) {
    Object.assign(this, type);
    this.types = types;
    this.category =
      this.name === 'Fairy' ? undefined : SPECIAL.includes(this.name) ? 'Special' : 'Physical';
    // convert from PS's ridiculous encoding to something usable (plus damage taken -> dealt)
    this.effectiveness = {'???': 1} as { [t in TypeName]: TypeEffectiveness };
    for (const k in dex.data.Types) {
      const t = k as Exclude<TypeName, '???'>;
      this.effectiveness[t] = DAMAGE_TAKEN[dex.data.Types[t].damageTaken[this.name] || 0];
    }
  }

  canDamage(target: TypeTarget) {
    return this.types.canDamage(this.name, target);
  }

  totalEffectiveness(target: TypeTarget) {
    return this.types.totalEffectiveness(this.name, target);
  }
}

export class Learnsets {
  private readonly dex: Dex;
  private readonly exists: ExistsFn;

  constructor(dex: Dex, exists: ExistsFn) {
    this.dex = dex;
    this.exists = exists;
  }

  async get(name: string) {
    const learnset = await this.dex.getLearnset(toID(name));
    return this.exists(learnset) ? learnset : undefined;
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
  spe: ['Spe', 'Speed'],
  spc: ['Spc', 'Special'],
};

export class Stats {
  private readonly dex: Dex;
  constructor(dex: Dex) {
    this.dex = dex;
  }

  calc(stat: StatName, base: number, iv = 31, ev?: number, level = 100, nature?: Nature) {
    if (ev === undefined) ev = this.dex.gen < 3 ? 252 : 0;
    if (this.dex.gen < 3) {
      iv = this.toDV(iv) * 2;
      nature = undefined;
    }
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
      return Math.floor(
        (Math.floor(((base * 2 + iv + Math.floor(ev / 4)) * level) / 100) + 5) * mod
      );
    }
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
      (this.toDV(ivs.atk === undefined ? 31 : ivs.atk) % 2) * 8 +
      (this.toDV(ivs.def === undefined ? 31 : ivs.def) % 2) * 4 +
      (this.toDV(ivs.spe === undefined ? 31 : ivs.spe) % 2) * 2 +
      (this.toDV(ivs.spa === undefined ? 31 : ivs.spa) % 2)
    );
  }

  *[Symbol.iterator](): IterableIterator<StatName> {
    for (const s of STATS) {
      yield s;
    }
  }

  toDV(iv: number): number {
    return Math.floor(iv / 2);
  }

  toIV(dv: number): number {
    return dv * 2 + 1;
  }
}

export {
  ID,
  As,
  Weather,
  FieldCondition,
  SideCondition,
  GenerationNum,
  GenderName,
  StatName,
  StatsTable,
  BoostName,
  BoostsTable,
  MoveCategory,
  MoveTarget,
  Nonstandard,
  EvoType,
  EggGroup,
  SideID,
  Player,
  GameType,
  HPColor,
  StatusName,
  NatureName,
  TypeName,
  HPTypeName,
  Tier,
  PokemonSet,
  AbilityName,
  ItemName,
  MoveName,
  SpeciesName,
  FormeName,
  EffectType,
  Effect,
  DataKind,
  Data,
  EffectData,
  HitEffect,
  SecondaryEffect,
  ConditionData,
  AbilityData,
  ItemData,
  MoveData,
  SpeciesData,
  MoveSource,
  EventInfoData,
  LearnsetData,
  TypeData,
  NatureData,
  BasicEffect,
  Condition,
  Ability,
  Item,
  Move,
  // Species,
  EventInfo,
  Learnset,
  // Type,
  Nature,
  GenID,
  Dex,
} from '@pkmn/dex-types';
