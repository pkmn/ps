import {
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
  StatsTable,
  StatusName,
  StatName,
  TypeName,
} from '@pkmn/types';

import * as T from '@pkmn/dex-types';

import * as AbilitiesJSON from './data/abilities.json';
import * as AliasesJSON from './data/aliases.json';
import * as ItemsJSON from './data/items.json';
import * as MovesJSON from './data/moves.json';
import * as SpeciesJSON from './data/species.json';
import * as TypesJSON from './data/types.json';
import * as FormatsDataJSON from './data/formats-data.json';

export function toID(text: any): ID {
  if (text?.id) text = text.id;
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

// #region Data

export interface FormatsData {
  tier?: string;
  doublesTier?: string;
  isNonstandard?: Nonstandard;
  inherit?: boolean;
}

interface AnyObject { [k: string]: any }

export class BasicEffect<NameT extends string = string> implements T.BasicEffect<NameT> {
  id: ID;
  name: NameT;
  fullname: string;
  effectType: T.EffectType;
  kind: T.DataKind;
  exists: boolean;
  num: number;
  gen: GenerationNum;
  shortDesc: string;
  desc: string;
  isNonstandard: Nonstandard | null;
  duration?: number;

  constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
    this.exists = true;
    data = combine(this, data, ...moreData);

    this.name = getString(data.name).trim() as NameT;
    this.id = data.id as ID || toID(this.name); // Hidden Power hack
    this.fullname = getString(data.fullname) || this.name;
    this.effectType = getString(data.effectType) as T.EffectType || 'Effect';
    this.kind = 'Effect';
    this.exists = !!(this.exists && this.id);
    this.num = data.num || 0;
    this.gen = data.gen || 0;
    this.shortDesc = data.shortDesc || '';
    this.desc = data.desc || '';
    this.isNonstandard = data.isNonstandard || null;
    this.duration = data.duration;
  }

  toString() {
    return this.name;
  }
}

export class PureEffect extends BasicEffect implements T.PureEffect {
  readonly effectType: 'Effect' | 'Weather' | 'Status';
  readonly kind: 'Effect';

  constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
    super(data, ...moreData);
    data = this;
    this.effectType =
      (['Weather', 'Status'].includes(data.effectType) ? data.effectType : 'Effect');
    this.kind = 'Effect';
  }
}

export class Ability extends BasicEffect<T.AbilityName> implements T.Ability {
  readonly effectType: 'Ability';
  readonly kind: 'Ability';
  readonly isUnbreakable?: boolean;
  readonly suppressWeather?: boolean;
  readonly effect?: Partial<PureEffect>;

  constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
    super(data, ...moreData);
    data = this;

    this.fullname = `ability: ${this.name}`;
    this.effectType = 'Ability';
    this.kind = 'Ability';

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

export class Item extends BasicEffect<T.ItemName> implements T.Item {
  readonly effectType: 'Item';
  readonly kind: 'Item';

  readonly forcedForme?: T.SpeciesName;
  readonly megaStone?: T.SpeciesName;
  readonly megaEvolves?: T.SpeciesName;
  readonly onDrive?: TypeName;
  readonly onMemory?: TypeName;
  readonly onPlate?: TypeName;
  readonly zMove?: T.MoveName | true;
  readonly zMoveType?: TypeName;
  readonly itemUser?: T.SpeciesName[];
  readonly fling?: T.FlingData;
  readonly effect?: Partial<PureEffect>;
  readonly ignoreKlutz?: boolean;
  readonly isBerry?: boolean;
  readonly isChoice?: boolean;
  readonly isGem?: boolean;
  readonly isPokeball?: boolean;
  readonly naturalGift?: { basePower: number; type: TypeName };
  readonly boosts?: Partial<BoostsTable> | false;

  constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
    super(data, ...moreData);
    data = this;

    this.fullname = `item: ${this.name}`;
    this.effectType = 'Item';
    this.kind = 'Item';

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

export class Move extends BasicEffect<T.MoveName> implements T.Move {
  readonly effectType: 'Move';
  readonly kind: 'Move';

  readonly boosts?: Partial<BoostsTable>;
  readonly status?: StatusName;
  readonly volatileStatus?: ID;
  readonly slotCondition?: ID;
  readonly sideCondition?: ID;
  readonly terrain?: ID;
  readonly pseudoWeather?: ID;
  readonly weather?: ID;

  readonly basePower!: number;
  readonly type!: TypeName;
  readonly accuracy!: true | number;
  readonly pp!: number;
  readonly target!: MoveTarget;
  readonly priority!: number;
  readonly flags: T.MoveFlags;
  readonly category!: MoveCategory;

  readonly effect?: Partial<T.PureEffectData>;
  readonly damage?: number | 'level' | false | null;
  readonly noPPBoosts?: boolean;

  readonly isZ: boolean | ID;
  readonly zMovePower?: number;
  readonly zMoveEffect?: ID;
  readonly zMoveBoost?: Partial<BoostsTable>;
  readonly isMax?: T.SpeciesName;
  readonly gmaxPower?: number;

  readonly ohko?: boolean | TypeName;
  readonly thawsTarget?: boolean;
  readonly heal?: number[] | null;
  readonly forceSwitch?: boolean;
  readonly selfSwitch?: boolean | 'copyvolatile';
  readonly selfBoost?: { boosts?: Partial<BoostsTable> };
  readonly selfdestruct?: boolean | 'ifHit' | 'always';
  readonly breaksProtect?: boolean;
  readonly recoil?: [number, number];
  readonly drain?: [number, number];
  readonly mindBlownRecoil?: boolean;
  readonly struggleRecoil?: boolean;
  readonly stealsBoosts?: boolean;
  readonly secondary?: T.SecondaryEffect | null;
  readonly secondaries: T.SecondaryEffect[] | null;
  readonly self?: T.HitEffect | null;

  readonly alwaysHit?: boolean;
  readonly basePowerModifier?: number;
  readonly critModifier?: number;
  readonly critRatio?: number;
  readonly defensiveCategory?: MoveCategory;
  readonly forceSTAB?: boolean;
  readonly ignoreAbility?: boolean;
  readonly ignoreAccuracy?: boolean;
  readonly ignoreDefensive?: boolean;
  readonly ignoreEvasion?: boolean;
  readonly ignoreImmunity?: boolean | { [k in keyof TypeName]?: boolean };
  readonly ignoreNegativeOffensive?: boolean;
  readonly ignoreOffensive?: boolean;
  readonly ignorePositiveDefensive?: boolean;
  readonly ignorePositiveEvasion?: boolean;
  readonly infiltrates?: boolean;
  readonly multiaccuracy?: boolean;
  readonly multihit?: number | number[];
  readonly noCopy?: boolean;
  readonly noDamageVariance?: boolean;
  readonly noFaint?: boolean;
  readonly nonGhostTarget?: MoveTarget;
  readonly pressureTarget?: MoveTarget;
  readonly sleepUsable?: boolean;
  readonly smartTarget?: boolean;
  readonly spreadModifier?: number;
  readonly tracksTarget?: boolean;
  readonly useSourceDefensiveAsOffensive?: boolean;
  readonly useTargetOffensive?: boolean;
  readonly willCrit?: boolean;

  readonly hasCrashDamage?: boolean;
  readonly isConfusionSelfHit?: boolean;
  readonly isFutureMove?: boolean;
  readonly noMetronome?: ID[];
  readonly noSketch?: boolean;
  readonly stallingMove?: boolean;

  constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
    super(data, ...moreData);
    data = this;

    this.fullname = `move: ${this.name}`;
    this.effectType = 'Move';
    this.kind = 'Move';

    this.type = getString(data.type) as TypeName;
    this.basePower = Number(data.basePower!);
    this.critRatio = Number(data.critRatio) || 1;
    this.secondary = data.secondary || null;
    this.secondaries = data.secondaries || (this.secondary && [this.secondary]) || null;
    this.priority = Number(data.priority) || 0;
    this.ignoreImmunity =
      (data.ignoreImmunity !== undefined ? data.ignoreImmunity : data.category === 'Status');
    this.pp = Number(data.pp!);
    this.isZ = data.isZ || false;
    this.flags = data.flags || {};
    this.selfSwitch =
      (typeof data.selfSwitch === 'string'
        ? (data.selfSwitch as ID)
        : data.selfSwitch) ||
      undefined;
    this.pressureTarget = data.pressureTarget || undefined;
    this.nonGhostTarget = data.nonGhostTarget || undefined;
    this.ignoreAbility = data.ignoreAbility || false;
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

export class Species extends BasicEffect<T.SpeciesName> implements T.Species {
  readonly effectType: 'Pokemon';
  readonly kind: 'Species';

  readonly baseStats: StatsTable;
  readonly baseSpecies: T.SpeciesName;
  readonly baseForme: T.FormeName | '';
  readonly forme: T.FormeName | '';
  readonly abilities: T.SpeciesAbility<T.AbilityName | ''>;
  readonly types: TypeName[];
  readonly prevo: T.SpeciesName | '';
  readonly evos: T.SpeciesName[];
  readonly nfe: boolean;
  readonly eggGroups: EggGroup[];
  readonly weightkg: number;
  readonly weighthg: number;
  readonly heightm: number;
  readonly unreleasedHidden: boolean | 'Past';
  readonly maleOnlyHidden: boolean;
  readonly changesFrom?: T.SpeciesName;
  readonly tier: string;
  readonly doublesTier: string;

  readonly evoMove?: T.MoveName;
  readonly cosmeticFormes?: T.SpeciesName[];
  readonly otherFormes?: T.SpeciesName[];
  readonly genderRatio: { M: number; F: number };
  readonly isMega?: boolean;
  readonly isPrimal?: boolean;
  readonly battleOnly?: T.SpeciesName | T.SpeciesName[];
  readonly isGigantamax?: T.MoveName;
  readonly requiredAbility?: T.AbilityName;
  readonly requiredItem?: T.ItemName;
  readonly requiredItems?: T.ItemName[];
  readonly requiredMove?: T.MoveName;
  readonly gender?: GenderName;
  readonly maxHP?: number;
  readonly evoLevel?: number;
  readonly evoCondition?: string;
  readonly evoItem?: string;
  readonly evoType?: EvoType;
  readonly effect?: Partial<PureEffect>;
  readonly canHatch?: boolean;

  constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
    super(data, ...moreData);
    data = this;

    this.fullname = `pokemon: ${data.name}`;
    this.effectType = 'Pokemon';
    this.kind = 'Species';

    this.baseSpecies = data.baseSpecies || data.name;
    this.forme = data.forme || '';
    this.baseForme = data.baseForme || '';
    this.abilities = data.abilities || {0: ''};
    this.types = data.types || ['???'];
    this.prevo = data.prevo || '';
    this.tier = data.tier || '';
    this.doublesTier = data.doublesTier || '';
    this.evos = data.evos || [];
    this.nfe = !!this.evos.length;
    this.eggGroups = data.eggGroups || [];
    this.genderRatio = data.genderRatio || (this.gender === 'M' ? {M: 1, F: 0}
      : this.gender === 'F' ? {M: 0, F: 1}
      : this.gender === 'N' ? {M: 0, F: 0}
      : {M: 0.5, F: 0.5});
    this.requiredItem = data.requiredItem || undefined;
    this.requiredItems =
      this.requiredItems || (this.requiredItem ? [this.requiredItem] : undefined);
    this.baseStats = data.baseStats || {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
    this.weightkg = data.weightkg || 0;
    this.weighthg = this.weightkg * 10;
    this.heightm = data.heightm || 0;
    this.unreleasedHidden = data.unreleasedHidden || false;
    this.maleOnlyHidden = !!data.maleOnlyHidden;
    this.maxHP = data.maxHP || undefined;
    this.isMega = !!(this.forme && ['Mega', 'Mega-X', 'Mega-Y'].includes(this.forme)) || undefined;
    this.isGigantamax = data.isGigantamax || undefined;
    this.battleOnly =
      data.battleOnly || (this.isMega || this.isGigantamax ? this.baseSpecies : undefined);
    this.changesFrom =
      data.changesFrom || (this.isGigantamax ? toID(this.baseSpecies) : undefined);

    if (!this.gen && data.num >= 1) {
      if (data.num >= 810 || ['Gmax', 'Galar', 'Galar-Zen'].includes(this.forme)) {
        this.gen = 8;
      } else if (data.num >= 722 || this.forme.startsWith('Alola') || this.forme === 'Starter') {
        this.gen = 7;
      } else if (this.forme === 'Primal') {
        this.gen = 6;
        this.isPrimal = true;
        this.battleOnly = this.baseSpecies;
      } else if (data.num >= 650 || this.isMega) {
        this.gen = 6;
      } else if (data.num >= 494) {
        this.gen = 5;
      } else if (data.num >= 387) {
        this.gen = 4;
      } else if (data.num >= 252) {
        this.gen = 3;
      } else if (data.num >= 152) {
        this.gen = 2;
      } else {
        this.gen = 1;
      }
    }
  }
}

export class Learnset implements T.Learnset {
  readonly effectType: 'Learnset';
  readonly kind: 'Learnset';
  readonly learnset?: { [moveid: string]: T.MoveSource[] };
  readonly eventOnly: boolean;
  readonly eventData?: T.EventInfo[];
  readonly encounters?: T.EventInfo[];
  readonly exists: boolean;

  constructor(data: AnyObject) {
    this.effectType = 'Learnset';
    this.kind = 'Learnset';
    this.learnset = data.learnset || undefined;
    this.eventOnly = !!data.eventOnly;
    this.eventData = data.eventData || undefined;
    this.encounters = data.encounters || undefined;
    this.exists = data.exists ?? true;
  }
}

export class Type implements T.Type {
  readonly id: ID;
  readonly name: TypeName;
  readonly effectType: 'Type';
  readonly kind: 'Type';
  readonly exists: boolean;
  readonly gen: GenerationNum;
  readonly damageTaken: { [t in Exclude<TypeName, '???'>]: number } & { [key: string]: number };
  readonly HPivs: Partial<StatsTable>;
  readonly HPdvs: Partial<StatsTable>;

  constructor(data: AnyObject, ...moreData: (AnyObject | null)[]) {
    this.exists = true;
    data = combine(this, data, ...moreData);

    this.effectType = 'Type';
    this.kind = 'Type';
    this.id = data.id || '';
    this.name = getString(data.name).trim() as TypeName;
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

export interface Nature extends T.Nature {
  cached?: boolean;
}

const Natures: { [k: string]: T.NatureData } = {
  adamant: {name: 'Adamant', plus: 'atk', minus: 'spa'},
  bashful: {name: 'Bashful'},
  bold: {name: 'Bold', plus: 'def', minus: 'atk'},
  brave: {name: 'Brave', plus: 'atk', minus: 'spe'},
  calm: {name: 'Calm', plus: 'spd', minus: 'atk'},
  careful: {name: 'Careful', plus: 'spd', minus: 'spa'},
  docile: {name: 'Docile'},
  gentle: {name: 'Gentle', plus: 'spd', minus: 'def'},
  hardy: {name: 'Hardy'},
  hasty: {name: 'Hasty', plus: 'spe', minus: 'def'},
  impish: {name: 'Impish', plus: 'def', minus: 'spa'},
  jolly: {name: 'Jolly', plus: 'spe', minus: 'spa'},
  lax: {name: 'Lax', plus: 'def', minus: 'spd'},
  lonely: {name: 'Lonely', plus: 'atk', minus: 'def'},
  mild: {name: 'Mild', plus: 'spa', minus: 'def'},
  modest: {name: 'Modest', plus: 'spa', minus: 'atk'},
  naive: {name: 'Naive', plus: 'spe', minus: 'spd'},
  naughty: {name: 'Naughty', plus: 'atk', minus: 'spd'},
  quiet: {name: 'Quiet', plus: 'spa', minus: 'spe'},
  quirky: {name: 'Quirky'},
  rash: {name: 'Rash', plus: 'spa', minus: 'spd'},
  relaxed: {name: 'Relaxed', plus: 'def', minus: 'spe'},
  sassy: {name: 'Sassy', plus: 'spd', minus: 'spe'},
  serious: {name: 'Serious'},
  timid: {name: 'Timid', plus: 'spe', minus: 'atk'},
};

// #endregion

// #region Dex

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : DeepPartial<T[P]>
};

type Writable<T> = { -readonly [P in keyof T]: T[P] };

type Data<T> = { 8: { [id: string]: T } } & {
  [num in Exclude<GenerationNum, 8>]?: { [id: string]: { inherit?: boolean } & DeepPartial<T> }
};

const DATA = {
  Abilities: AbilitiesJSON as Data<T.AbilityData>,
  Aliases: AliasesJSON as { [id: string]: string },
  Items: ItemsJSON as Data<T.ItemData>,
  Moves: MovesJSON as unknown as Data<T.MoveData>,
  Species: SpeciesJSON as Data<T.SpeciesData>,
  Natures,
  Learnsets: null! as Data<T.LearnsetData>,
  Types: TypesJSON as { 8: { [id: string]: T.TypeData } } & {
    [num in Exclude<GenerationNum, 8>]?: { [type in Exclude<TypeName, '???'>]?: T.TypeData | null }
  },
  FormatsData: FormatsDataJSON as Data<FormatsData>,
};

const GEN_IDS = ['gen1', 'gen2', 'gen3', 'gen4', 'gen5', 'gen6', 'gen7', 'gen8'] as const;
type GenID = typeof GEN_IDS[number];
const CURRENT_GEN_ID: GenID = GEN_IDS[7];

const dexes: { [mod: string]: ModdedDex } = Object.create(null);

const nullEffect: PureEffect = new PureEffect({name: '', exists: false});

export class ModdedDex implements T.Dex {
  static readonly STATS: ReadonlyArray<StatName> = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];

  readonly gen: GenerationNum;
  readonly genid: GenID;
  readonly data!: {
    Abilities: { [id: string]: T.AbilityData };
    Aliases: { [id: string]: string };
    Items: { [id: string]: T.ItemData };
    Moves: { [id: string]: T.MoveData };
    Species: { [id: string]: T.SpeciesData };
    Natures: { [id: string]: T.NatureData };
    Learnsets: null | { [id: string]: T.LearnsetData };
    Types: { [type in Exclude<TypeName, '???'>]: T.TypeData };
    FormatsData: { [id: string]: FormatsData };
  };

  private readonly cache = {
    Abilities: Object.create(null) as { [id: string]: Ability },
    Items: Object.create(null) as { [id: string]: Item },
    Moves: Object.create(null) as { [id: string]: Move },
    Species: Object.create(null) as { [id: string]: Species },
    Types: Object.create(null) as { [id: string]: Type },
    Learnsets: Object.create(null) as { [id: string]: Learnset },
    Effects: Object.create(null) as { [id: string]: Ability | Item | Move },
    PureEffects: Object.create(null) as { [id: string]: PureEffect },
  };

  constructor(genid = CURRENT_GEN_ID) {
    if (!GEN_IDS.includes(genid)) throw new Error('Unsupported genid');
    this.genid = genid;
    this.gen = parseInt(genid.slice(3)) as GenerationNum;
    this.loadData();
  }

  get modid() {
    return this.genid as ID;
  }

  mod(genid: GenID) {
    if (genid in dexes) return dexes[genid];
    dexes[genid] = new ModdedDex(genid);
    return dexes[genid];
  }

  forGen(gen: number) {
    if (!gen) return this;
    return this.mod(`gen${gen}` as GenID);
  }

  getSpecies(name: string | Species): Species {
    if (name && typeof name !== 'string') return name;

    name = (name || '').trim();
    let id = toID(name);
    if (id === 'nidoran' && name.slice(-1) === '♀') {
      id = 'nidoranf' as ID;
    } else if (id === 'nidoran' && name.slice(-1) === '♂') {
      id = 'nidoranm' as ID;
    }

    let species = this.cache.Species[id];
    if (species) return species;

    const alias = this.data.Aliases[id];
    if (alias) {
      const data = this.data.FormatsData[id];
      if (data) {
        // special event ID, like Rockruff-Dusk
        const baseId = toID(alias);
        species = new Species(
          {name},
          this.data.Species[baseId],
          this.data.FormatsData[id],
          /* BUG: this.data.Learnsets[id] */
        );
        (species as any).name = id;
        (species as any).species = id; // BUG ???
        (species as any).speciesid = id; // BUG ???
        (species as any).abilities = {0: species.abilities['S']};
      } else {
        species = this.getSpecies(alias);
        if (species.cosmeticFormes) {
          for (const forme of species.cosmeticFormes) {
            if (toID(forme) === id) {
              species = new Species(species, {
                name: forme,
                id,
                forme: forme.slice(species.name.length + 1),
                baseForme: '',
                baseSpecies: species.name,
                otherFormes: null,
                cosmeticFormes: null,
              });
              break;
            }
          }
        }
      }

      if (species?.exists) this.cache.Species[id] = species;
      return species;
    }

    let data = this.data.Species[id];

    if (id && !data) {
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
        const aliased = this.data.Aliases[pokeName];
        if (aliased) pokeName = toID(aliased);
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

    data = this.data.Species[id];

    if (id && data) {
      species = new Species({name}, data, this.data.FormatsData[id]);
      if (!species.tier && !species.doublesTier && species.baseSpecies !== species.name) {
        if (species.baseSpecies === 'Mimikyu') {
          const base = this.data.FormatsData[toID(species.baseSpecies)];
          (species as any).tier = base.tier || 'Illegal';
          (species as any).doublesTier = base.doublesTier || 'Illegal';
        } else if (species.id.endsWith('totem')) {
          const base = this.data.FormatsData[species.id.slice(0, -5)];
          (species as any).tier = base.tier || 'Illegal';
          (species as any).doublesTier = base.doublesTier || 'Illegal';
        } else if (species.battleOnly) {
          const base = this.data.FormatsData[toID(species.battleOnly)];
          (species as any).tier = base.tier || 'Illegal';
          (species as any).doublesTier = base.doublesTier || 'Illegal';
        } else {
          const baseFormatsData = this.data.FormatsData[toID(species.baseSpecies)];
          if (!baseFormatsData) {
            throw new Error(`${species.baseSpecies} has no formats-data entry`);
          }
          (species as any).tier = baseFormatsData.tier || 'Illegal';
          (species as any).doublesTier = baseFormatsData.doublesTier || 'Illegal';
        }
      }
      if (!species.tier) (species as any).tier = 'Illegal';
      if (!species.doublesTier) (species as any).doublesTier = species.tier;
      if (species.gen > this.gen) {
        (species as any).tier = 'Illegal';
        (species as any).doublesTier = 'Illegal';
        (species as any).isNonstandard = 'Future';
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
    return !species.battleOnly
      ? species.name
      : species.changesFrom
        ? this.getSpecies(species.changesFrom).name
        : species.baseSpecies;
  }

  hasAbility(species: Species, ability: string) {
    for (const i in species.abilities) {
      if (ability === species.abilities[i as keyof T.SpeciesAbility]) return true;
    }
    return false;
  }

  async getLearnset(name: string): Promise<Learnset> {
    const id = toID(name);
    let learnset = this.cache.Learnsets[id];
    if (learnset) return learnset;

    if (!DATA.Learnsets) {
      const isNode =
        typeof process !== 'undefined' &&
        process.versions !== null &&
        process.versions.node !== null;
      if (isNode) {
        DATA.Learnsets = require('./data/learnsets.json');
      } else {
        // Casts required since Typescript thinks asynchronously imported JSON have default exports
        DATA.Learnsets =
          (await import('./data/learnsets.json')) as unknown as Data<T.LearnsetData>;
      }
    }
    this.load('Learnsets');

    const data = this.data.Learnsets![id];
    if (id && data) {
      learnset = new Learnset(data);
    } else {
      learnset = new Learnset({exists: false});
    }
    if (learnset.exists) this.cache.Learnsets[id] = learnset;
    return learnset;
  }

  getEffect(name?: string | T.Effect | null): T.Effect {
    if (!name) return nullEffect;
    if (typeof name !== 'string') return name;

    const id = toID(name);
    let effect = this.cache.Effects[id];
    if (effect) return effect;

    if (name.startsWith('move:')) {
      effect = this.getMove(name.slice(5));
    } else if (name.startsWith('item:')) {
      effect = this.getItem(name.slice(5));
    } else if (name.startsWith('ability:')) {
      effect = this.getAbility(name.slice(8));
    }

    if (effect) {
      this.cache.Effects[id] = effect;
      return effect;
    }

    return this.getPureEffectByID(id);
  }

  getPureEffectByID(id: ID): PureEffect {
    if (!id) return nullEffect;

    let effect = this.cache.PureEffects[id];
    if (effect) return effect;

    let found: T.AbilityData | T.ItemData | T.MoveData;
    if ((this.data.Moves.hasOwnProperty(id) && (found = this.data.Moves[id]).effect) ||
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

    this.cache.PureEffects[id] = effect;
    return effect;
  }

  getAbility(name: string | Ability): Ability {
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

    const data = this.data.Abilities[id];
    if (id && data) {
      ability = new Ability({name}, data);
      if (ability.gen > this.gen) (ability as any).isNonstandard = 'Future';
      if (this.gen <= 2 && ability.id === 'noability') (ability as any).isNonstandard = null;
    } else {
      ability = new Ability({id, name, exists: false});
    }

    if (ability.exists) this.cache.Abilities[id] = ability;
    return ability;
  }

  getItem(name: string | Item): Item {
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

    const data = this.data.Items[id];
    if (id && data) {
      item = new Item({name}, data);
      if (item.gen > this.gen) (item as any).isNonstandard = 'Future';
    } else {
      item = new Item({id, name, exists: false});
    }

    if (item.exists) this.cache.Items[id] = item;
    return item;
  }

  getMove(name: string | Move): Move {
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

    const data = this.data.Moves[id];
    if (id && data) {
      move = new Move({name}, data);
      if (id.substr(0, 11) === 'hiddenpower') {
        id = /([a-z]*)([0-9]*)/.exec(id)![1] as ID;
      } else if (id.substr(0, 6) === 'return' && id.length > 6) {
        id = 'return' as ID;
        (move as any).basePower = Number(id.slice(6));
      } else if (id.substr(0, 11) === 'frustration' && id.length > 11) {
        id = 'frustration' as ID;
        (move as any).basePower = Number(id.slice(11));
      }
      if (this.gen <= 3 && data.category !== 'Status') {
        (move as any).category = getGen3Category(data.type);
      }
      if (move.gen > this.gen) (move as any).isNonstandard = 'Future';
    } else {
      move = new Move({id, name, exists: false});
    }
    if (move.exists) this.cache.Moves[id] = move;
    return move;
  }

  getNature(name: string | Nature): Nature {
    if (name && typeof name !== 'string') return name;

    name = (name || '').trim();
    const id = toID(name);
    let nature = {} as Writable<Partial<Nature>>;
    if (id && id !== 'constructor' && this.data.Natures[id]) {
      nature = this.data.Natures[id];
      if (nature.cached) return nature as Nature;
      nature.cached = true;
      nature.exists = true;
    }
    if (!nature.id) nature.id = id;
    if (!nature.name) nature.name = name as NatureName;
    if (!nature.effectType) nature.effectType = 'Nature';
    if (!nature.kind) nature.kind = 'Nature';
    if (!nature.gen) nature.gen = 3;

    return nature as Nature;
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
    const data = this.data.Types[typeName];
    if (id && data) {
      type = new Type({id, name: typeName}, data);
    } else {
      type = new Type({id, name, exists: false});
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
    };
    const stats = {hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
    if (this.gen <= 2) {
      // Gen 2 specific Hidden Power check. IVs are still treated 0-31 so we get them 0-15
      const atkDV = tr(ivs.atk / 2);
      const defDV = tr(ivs.def / 2);
      const speDV = tr(ivs.spe / 2);
      const spcDV = tr(ivs.spa / 2);
      return {
        type: hpTypes[4 * (atkDV % 4) + (defDV % 4)] as TypeName,
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
        type: hpTypes[tr(hpTypeX * 15 / 63)] as TypeName,
        // After Gen 6, Hidden Power is always 60 base power
        power: (this.gen && this.gen < 6) ? tr(hpPowerX * 40 / 63) + 30 : 60,
      };
    }
  }

  loadData() {
    if (this.data) return this.data;
    (this.data as any) = {} as ModdedDex['data'];

    for (const t in DATA) {
      const type = t as keyof typeof DATA;
      if (type === 'Learnsets') continue; // async
      if (type === 'Natures' || type === 'Aliases') {
        (this.data as any)[type] = DATA[type];
        continue;
      }
      this.load(type);
    }
    return this.data;
  }

  includeModData() {
    for (const mod in dexes) {
      dexes[mod].includeData();
    }
    return this;
  }

  includeData() {
    this.loadData();
    return this;
  }

  includeFormats() {
    return this;
  }

  load(type: Exclude<keyof ModdedDex['data'], 'Natures' | 'Aliases'>) {
    if (this.data[type]) return;

    const d = DATA[type][this.gen];
    if (d !== this.data[type]) this.data[type] = Object.assign({}, d, this.data[type]) as any;

    if (this.genid === CURRENT_GEN_ID) return;

    const parentDex = this.forGen(this.gen + 1 as GenerationNum);
    if (type === 'Learnsets') parentDex.load('Learnsets');

    const parentDataType = parentDex.data[type];
    const childDataType = this.data[type] || (this.data[type] = {} as any);
    for (const e in parentDataType) {
      const entry = e as keyof typeof parentDataType;
      if (childDataType[entry] === null) {
        // null means don't inherit
        delete childDataType[entry];
      } else if (!(entry in childDataType)) {
        // If it doesn't exist it's inherited from the parent data
        if (type === 'Species') {
          // Species entries can be modified too many different ways
          // e.g. inheriting different formats-data/learnsets
          childDataType[entry] = deepClone(parentDataType[entry]);
        } else {
          childDataType[entry] = parentDataType[entry];
        }
      } else if (childDataType[entry] && childDataType[entry].inherit) {
        // {inherit: true} can be used to modify only parts of the parent data,
        // instead of overwriting entirely
        delete childDataType[entry].inherit;
        // Merge parent into children entry, preserving existing childs' properties.
        for (const key in parentDataType[entry]) {
          if (key in childDataType[entry]) continue;
          (childDataType[entry])[key] = (parentDataType[entry] as any)[key];
        }
      }
    }
  }
}

const SPECIAL = ['Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Psychic', 'Dark', 'Dragon'];
function getGen3Category(type: TypeName) {
  return SPECIAL.includes(type) ? 'Special' : 'Physical';
}

function deepClone(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(prop => deepClone(prop));
  const clone = Object.create(Object.getPrototypeOf(obj));
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key]);
  }
  return clone;
}

// #endregion

dexes[CURRENT_GEN_ID] = new ModdedDex(CURRENT_GEN_ID);
export const Dex = dexes[CURRENT_GEN_ID];
