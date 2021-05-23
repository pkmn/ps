import * as T from '@pkmn/dex-types';

import * as AbilitiesJSON from './data/abilities.json';
import * as AliasesJSON from './data/aliases.json';
import * as ConditionsJSON from './data/conditions.json';
import * as ItemsJSON from './data/items.json';
import * as MovesJSON from './data/moves.json';
import * as NaturesJSON from './data/natures.json';
import * as SpeciesJSON from './data/species.json';
import * as TypesJSON from './data/types.json';
import * as FormatsDataJSON from './data/formats-data.json';

export function toID(text: any): T.ID {
  if (text?.id) text = text.id;
  if (typeof text !== 'string' && typeof text !== 'number') return '';
  return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '') as T.ID;
}

function getString(str: any): string {
  return (typeof str === 'string' || typeof str === 'number') ? '' + str : '';
}

// #region Data

export interface FormatData {
  tier?: string;
  doublesTier?: string;
  isNonstandard?: T.Nonstandard;
  inherit?: boolean;
}

interface AnyObject { [k: string]: any }

export class BasicEffect<NameT extends string = string> implements T.BasicEffect<NameT> {
  id: T.ID;
  name: NameT;
  fullname: string;
  effectType: T.EffectType;
  kind: T.DataKind;
  exists: boolean;
  num: number;
  gen: T.GenerationNum;
  shortDesc: string;
  desc: string;
  isNonstandard: T.Nonstandard | null;
  duration?: number;

  constructor(data: AnyObject) {
    this.exists = true;
    Object.assign(this, data);

    this.name = getString(data.name).trim() as NameT;
    this.id = data.realMove ? toID(data.realMove) : toID(this.name); // Hidden Power hack
    this.fullname = getString(data.fullname) || this.name;
    this.effectType = getString(data.effectType) as T.EffectType || 'Condition';
    this.kind = 'Condition';
    this.exists = !!(this.exists && this.id);
    this.num = data.num || 0;
    this.gen = data.gen || 0;
    this.shortDesc = data.shortDesc || '';
    this.desc = data.desc || this.shortDesc;
    this.isNonstandard = data.isNonstandard || null;
    this.duration = data.duration;
  }

  toString() {
    return this.name;
  }
}

export class Condition extends BasicEffect implements T.Condition {
  readonly effectType: 'Condition' | 'Weather' | 'Status';
  readonly kind: 'Condition';

  constructor(data: AnyObject) {
    super(data);
    data = this;
    this.effectType =
      (['Weather', 'Status'].includes(data.effectType) ? data.effectType : 'Condition');
    this.kind = 'Condition';
  }
}

const EMPTY_CONDITION: Condition = new Condition({name: '', exists: false});

class DexConditions implements T.DexTable<Condition> {
  readonly dex: ModdedDex;
  readonly cache = Object.create(null) as { [id: string]: Condition };

  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name: string): Condition {
    // This treatment of 'item:id' and 'ability:id' is kind of repugnant but regrettably exists
    // for loose compatibility with Pokémon Showdown's Dex API
    if (name.startsWith('item:')) {
      const item = this.dex.items.get(name.slice(5));
      return item as any as Condition;
    } else if (name.startsWith('ability:')) {
      const ability = this.dex.abilities.get(name.slice(8));
      return ability as any as Condition;
    }
    return this.getByID(toID(name));
  }

  getByID(id: T.ID): Condition {
    if (!id) return EMPTY_CONDITION;

    let condition = this.cache[id];
    if (condition) return condition;

    let found: T.AbilityData | T.ItemData | T.MoveData;
    if (this.dex.data.Conditions.hasOwnProperty(id)) {
      condition = new Condition({kind: 'Condition', ...this.dex.data.Conditions[id]});
    } else if (
      (this.dex.data.Moves.hasOwnProperty(id) &&
        (found = this.dex.data.Moves[id]).condition) ||
      (this.dex.data.Abilities.hasOwnProperty(id) &&
        (found = this.dex.data.Abilities[id]).condition) ||
      (this.dex.data.Items.hasOwnProperty(id) &&
        (found = this.dex.data.Items[id]).condition)) {
      condition = new Condition({name: found.name || id, ...found.condition});
    } else if (id === 'recoil') {
      condition = new Condition({name: 'Recoil', effectType: 'Recoil'});
    } else if (id === 'drain') {
      condition = new Condition({name: 'Drain', effectType: 'Drain'});
    } else {
      condition = new Condition({name: id, exists: false});
    }

    this.cache[id] = condition;
    return condition;
  }
}

export class Ability extends BasicEffect<T.AbilityName> implements T.Ability {
  readonly effectType: 'Ability';
  readonly kind: 'Ability';
  readonly isBreakable?: boolean;
  readonly suppressWeather?: boolean;
  readonly condition?: Partial<Condition>;

  constructor(data: AnyObject) {
    super(data);
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

class DexAbilities implements T.DexTable<Ability> {
  readonly dex: ModdedDex;
  readonly caches = {
    get: Object.create(null) as { [id: string]: Ability },
    all: undefined as ReadonlyArray<Ability> | undefined,
  };

  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name: string): Ability {
    return this.getByID(toID(name));
  }

  getByID(id: T.ID): Ability {
    const alias = this.dex.data.Aliases[id];
    if (alias) id = toID(alias);

    let ability = this.caches.get[id];
    if (ability) return ability;

    const data = this.dex.data.Abilities[id];
    if (id && data) {
      ability = new Ability(data);
      if (ability.gen > this.dex.gen) (ability as any).isNonstandard = 'Future';
      if (this.dex.gen <= 2 && ability.id === 'noability') (ability as any).isNonstandard = null;
    } else {
      ability = new Ability({id, name: id, exists: false});
    }

    if (ability.exists) this.caches.get[id] = ability;
    return ability;
  }

  all(): readonly Ability[] {
    if (this.caches.all) return this.caches.all;
    const abilities = [];
    for (const id in this.dex.data.Abilities) {
      abilities.push(this.getByID(id as T.ID));
    }
    return (this.caches.all = abilities);
  }
}

export class Item extends BasicEffect<T.ItemName> implements T.Item {
  readonly effectType: 'Item';
  readonly kind: 'Item';

  readonly forcedForme?: T.SpeciesName;
  readonly megaStone?: T.SpeciesName;
  readonly megaEvolves?: T.SpeciesName;
  readonly onDrive?: T.TypeName;
  readonly onMemory?: T.TypeName;
  readonly onPlate?: T.TypeName;
  readonly zMove?: T.MoveName | true;
  readonly zMoveType?: T.TypeName;
  readonly zMoveFrom?: T.MoveName;
  readonly itemUser?: T.SpeciesName[];
  readonly fling?: T.ItemData['fling'];
  readonly condition?: Partial<Condition>;
  readonly ignoreKlutz?: boolean;
  readonly isBerry?: boolean;
  readonly isChoice?: boolean;
  readonly isGem?: boolean;
  readonly isPokeball?: boolean;
  readonly naturalGift?: { basePower: number; type: T.TypeName };
  readonly boosts?: Partial<T.BoostsTable> | false;

  constructor(data: AnyObject) {
    super(data);
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

class DexItems implements T.DexTable<Item> {
  readonly dex: ModdedDex;
  readonly caches = {
    get: Object.create(null) as { [id: string]: Item },
    all: undefined as ReadonlyArray<Item> | undefined,
  };

  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name?: string): Item {
    return this.getByID(toID(name));
  }

  getByID(id: T.ID): Item {
    const alias = this.dex.data.Aliases[id];
    if (alias) id = toID(alias);

    let item = this.caches.get[id];
    if (item) return item;

    if (id && !this.dex.data.Items[id] && this.dex.data.Items[id + 'berry']) {
      item = this.getByID(id + 'berry' as T.ID);
      return (this.caches.get[id] = item);
    }

    const data = this.dex.data.Items[id];
    if (id && data) {
      item = new Item(data);
      if (item.gen > this.dex.gen) (item as any).isNonstandard = 'Future';
    } else {
      item = new Item({name: id, exists: false});
    }

    if (item.exists) this.caches.get[id] = item;
    return item;
  }

  all(): readonly Item[] {
    if (this.caches.all) return this.caches.all;
    const items = [];
    for (const id in this.dex.data.Items) {
      items.push(this.getByID(id as T.ID));
    }
    return (this.caches.all = items);
  }
}

export class Move extends BasicEffect<T.MoveName> implements T.Move {
  readonly effectType: 'Move';
  readonly kind: 'Move';

  readonly boosts?: Partial<T.BoostsTable>;
  readonly status?: T.StatusName;
  readonly volatileStatus?: T.ID;
  readonly slotCondition?: T.ID;
  readonly sideCondition?: T.ID;
  readonly terrain?: T.ID;
  readonly pseudoWeather?: T.ID;
  readonly weather?: T.ID;

  readonly basePower!: number;
  readonly type!: T.TypeName;
  readonly accuracy!: true | number;
  readonly pp!: number;
  readonly target!: T.MoveTarget;
  readonly priority!: number;
  readonly flags: T.Move['flags'];
  readonly category!: T.MoveCategory;

  readonly condition?: Partial<T.Condition>;
  readonly damage?: number | 'level' | false | null;
  readonly noPPBoosts?: boolean;

  readonly isZ: boolean | T.ID;
  readonly zMove?: {
    basePower?: number;
    effect?: T.ID;
    boost?: Partial<T.BoostsTable>;
  };
  readonly isMax: boolean | T.SpeciesName;
  readonly maxMove?: {
    basePower: number;
  };

  readonly ohko?: boolean | T.TypeName;
  readonly thawsTarget?: boolean;
  readonly heal?: number[] | null;
  readonly forceSwitch?: boolean;
  readonly selfSwitch?: boolean | 'copyvolatile';
  readonly selfBoost?: { boosts?: Partial<T.BoostsTable> };
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
  readonly defensiveCategory?: T.MoveCategory;
  readonly forceSTAB?: boolean;
  readonly ignoreAbility?: boolean;
  readonly ignoreAccuracy?: boolean;
  readonly ignoreDefensive?: boolean;
  readonly ignoreEvasion?: boolean;
  readonly ignoreImmunity?: boolean | { [k in keyof T.TypeName]?: boolean };
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
  readonly nonGhostTarget?: T.MoveTarget;
  readonly pressureTarget?: T.MoveTarget;
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
  readonly noMetronome?: T.MoveName[];
  readonly noSketch?: boolean;
  readonly stallingMove?: boolean;

  constructor(data: AnyObject) {
    super(data);
    data = this;

    this.fullname = `move: ${this.name}`;
    this.effectType = 'Move';
    this.kind = 'Move';

    this.type = getString(data.type) as T.TypeName;
    this.basePower = Number(data.basePower!);
    this.critRatio = Number(data.critRatio) || 1;
    this.secondary = data.secondary || null;
    this.secondaries = data.secondaries?.length
      ? data.secondaries : this.secondary
        ? [this.secondary]
        : null;
    this.priority = Number(data.priority) || 0;
    this.ignoreImmunity =
      (data.ignoreImmunity !== undefined ? data.ignoreImmunity : data.category === 'Status');
    this.pp = Number(data.pp!);
    this.isZ = data.isZ || false;
    this.isMax = data.isMax || false;
    this.flags = data.flags || {};
    this.selfSwitch =
      (typeof data.selfSwitch === 'string'
        ? (data.selfSwitch as T.ID)
        : data.selfSwitch) ||
      undefined;
    this.pressureTarget = data.pressureTarget || undefined;
    this.nonGhostTarget = data.nonGhostTarget || undefined;
    this.ignoreAbility = data.ignoreAbility || false;
    this.volatileStatus =
      typeof data.volatileStatus === 'string' ? (data.volatileStatus as T.ID) : undefined;

    if (this.category !== 'Status' && !this.maxMove && this.id !== 'struggle') {
      this.maxMove = {basePower: 1};
      if (this.isMax || this.isZ) {
        // already initialized to 1
      } else if (!this.basePower) {
        this.maxMove.basePower = 100;
      } else if (['Fighting', 'Poison'].includes(this.type)) {
        if (this.basePower >= 150) {
          this.maxMove.basePower = 100;
        } else if (this.basePower >= 110) {
          this.maxMove.basePower = 95;
        } else if (this.basePower >= 75) {
          this.maxMove.basePower = 90;
        } else if (this.basePower >= 65) {
          this.maxMove.basePower = 85;
        } else if (this.basePower >= 55) {
          this.maxMove.basePower = 80;
        } else if (this.basePower >= 45) {
          this.maxMove.basePower = 75;
        } else {
          this.maxMove.basePower = 70;
        }
      } else {
        if (this.basePower >= 150) {
          this.maxMove.basePower = 150;
        } else if (this.basePower >= 110) {
          this.maxMove.basePower = 140;
        } else if (this.basePower >= 75) {
          this.maxMove.basePower = 130;
        } else if (this.basePower >= 65) {
          this.maxMove.basePower = 120;
        } else if (this.basePower >= 55) {
          this.maxMove.basePower = 110;
        } else if (this.basePower >= 45) {
          this.maxMove.basePower = 100;
        } else {
          this.maxMove.basePower = 90;
        }
      }
    }
    if (this.category !== 'Status' && !this.zMove &&
        !this.isZ && !this.isMax && this.id !== 'struggle') {
      let basePower = this.basePower;
      this.zMove = {};
      if (Array.isArray(this.multihit)) basePower *= 3;
      if (!basePower) {
        this.zMove.basePower = 100;
      } else if (basePower >= 140) {
        this.zMove.basePower = 200;
      } else if (basePower >= 130) {
        this.zMove.basePower = 195;
      } else if (basePower >= 120) {
        this.zMove.basePower = 190;
      } else if (basePower >= 110) {
        this.zMove.basePower = 185;
      } else if (basePower >= 100) {
        this.zMove.basePower = 180;
      } else if (basePower >= 90) {
        this.zMove.basePower = 175;
      } else if (basePower >= 80) {
        this.zMove.basePower = 160;
      } else if (basePower >= 70) {
        this.zMove.basePower = 140;
      } else if (basePower >= 60) {
        this.zMove.basePower = 120;
      } else {
        this.zMove.basePower = 100;
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

class DexMoves implements T.DexTable<Move> {
  readonly dex: ModdedDex;
  readonly caches = {
    get: Object.create(null) as { [id: string]: Move },
    all: undefined as ReadonlyArray<Move> | undefined,
  };

  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name: string): Move {
    return this.getByID(toID(name));
  }

  getByID(id: T.ID): Move {
    const alias = this.dex.data.Aliases[id];
    if (alias) id = toID(alias);

    let move = this.caches.get[id];
    if (move) return move;


    if (id.startsWith('hiddenpower')) {
      id = /([a-z]*)([0-9]*)/.exec(id)![1] as T.ID;
    }

    const data = this.dex.data.Moves[id];
    if (id && data) {
      move = new Move(data);
      if (id.substr(0, 11) === 'hiddenpower') {
        id = /([a-z]*)([0-9]*)/.exec(id)![1] as T.ID;
      } else if (id.substr(0, 6) === 'return' && id.length > 6) {
        id = 'return' as T.ID;
        (move as any).basePower = Number(id.slice(6));
      } else if (id.substr(0, 11) === 'frustration' && id.length > 11) {
        id = 'frustration' as T.ID;
        (move as any).basePower = Number(id.slice(11));
      }
      if (this.dex.gen <= 3 && data.category !== 'Status') {
        (move as any).category = getGen3Category(data.type);
      }
      if (move.gen > this.dex.gen) (move as any).isNonstandard = 'Future';
    } else {
      move = new Move({id, name: id, exists: false});
    }

    if (move.exists) this.caches.get[id] = move;
    return move;
  }

  all(): readonly Move[] {
    if (this.caches.all) return this.caches.all;
    const moves = [];
    for (const id in this.dex.data.Moves) {
      moves.push(this.getByID(id as T.ID));
    }
    return (this.caches.all = moves);
  }
}

export class Nature extends BasicEffect<T.NatureName> implements T.Nature {
  readonly effectType: 'Nature';
  readonly kind: 'Nature';
  readonly plus?: Exclude<T.StatID, 'hp'>;
  readonly minus?: Exclude<T.StatID, 'hp'>;
  constructor(data: AnyObject) {
    super(data);
    data = this;

    this.fullname = `nature: ${this.name}`;
    this.effectType = 'Nature';
    this.kind = 'Nature';
    this.gen = 3;
    this.plus = data.plus || undefined;
    this.minus = data.minus || undefined;
  }
}

class DexNatures implements T.DexTable<Nature> {
  readonly dex: ModdedDex;
  readonly caches = {
    get: Object.create(null) as { [id: string]: Nature },
    all: undefined as ReadonlyArray<Nature> | undefined,
  };

  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name: string): Nature {
    return this.getByID(toID(name));
  }

  getByID(id: T.ID): Nature {
    const alias = this.dex.data.Aliases[id];
    if (alias) id = toID(alias);

    let nature = this.caches.get[id];
    if (nature) return nature;

    const data = this.dex.data.Natures[id];
    if (id && data) {
      nature = new Nature(data);
      if (nature.gen > this.dex.gen) nature.isNonstandard = 'Future';
    } else {
      nature = new Nature({name: id, exists: false});
    }

    if (nature.exists) this.caches.get[id] = nature;
    return nature;
  }

  all(): readonly Nature[] {
    if (this.caches.all) return this.caches.all;
    const natures = [];
    for (const id in this.dex.data.Natures) {
      natures.push(this.getByID(id as T.ID));
    }
    return (this.caches.all = natures);
  }
}

export class Species extends BasicEffect<T.SpeciesName> implements T.Species {
  readonly effectType: 'Pokemon';
  readonly kind: 'Species';

  readonly baseStats: T.StatsTable;
  readonly bst: number;
  readonly baseSpecies: T.SpeciesName;
  readonly baseForme: T.FormeName | '';
  readonly forme: T.FormeName | '';
  readonly abilities: T.SpeciesAbility<T.AbilityName | ''>;
  readonly types: [T.TypeName] | [T.TypeName, T.TypeName];
  readonly prevo?: T.SpeciesName | '';
  readonly evos?: T.SpeciesName[];
  readonly nfe: boolean;
  readonly eggGroups: T.EggGroup[];
  readonly canHatch: boolean;
  readonly weightkg: number;
  readonly weighthg: number;
  readonly tags: T.SpeciesTag[];
  readonly unreleasedHidden: boolean | 'Past';
  readonly maleOnlyHidden: boolean;
  readonly changesFrom?: T.SpeciesName;
  readonly tier: T.Tier.Singles | T.Tier.Other | 'Illegal';
  readonly doublesTier: T.Tier.Doubles | 'Illegal';

  readonly evoMove?: T.MoveName;
  readonly cosmeticFormes?: T.SpeciesName[];
  readonly otherFormes?: T.SpeciesName[];
  readonly genderRatio: { M: number; F: number };
  readonly isMega?: boolean;
  readonly isPrimal?: boolean;
  readonly battleOnly?: T.SpeciesName | T.SpeciesName[];
  readonly canGigantamax?: T.MoveName;
  readonly gmaxUnreleased?: boolean;
  readonly cannotDynamax?: boolean;
  readonly requiredAbility?: T.AbilityName;
  readonly requiredItem?: T.ItemName;
  readonly requiredItems?: T.ItemName[];
  readonly requiredMove?: T.MoveName;
  readonly gender?: T.GenderName;
  readonly maxHP?: number;
  readonly evoLevel?: number;
  readonly evoCondition?: string;
  readonly evoItem?: string;
  readonly evoType?: T.EvoType;
  readonly condition?: Partial<Condition>;

  constructor(data: AnyObject) {
    super(data);
    data = this;

    this.fullname = `pokemon: ${data.name as string}`;
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
    this.nfe = !!this.evos?.length;
    this.eggGroups = data.eggGroups || [];
    this.canHatch = data.canHatch || false;
    this.genderRatio = data.genderRatio || (this.gender === 'M' ? {M: 1, F: 0}
      : this.gender === 'F' ? {M: 0, F: 1}
      : this.gender === 'N' ? {M: 0, F: 0}
      : {M: 0.5, F: 0.5});
    this.requiredItem = data.requiredItem || undefined;
    this.requiredItems =
      this.requiredItems || (this.requiredItem ? [this.requiredItem] : undefined);
    this.baseStats = data.baseStats || {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
    this.bst = this.baseStats.hp + this.baseStats.atk + this.baseStats.def +
      this.baseStats.spa + this.baseStats.spd + this.baseStats.spe;
    this.weightkg = data.weightkg || 0;
    this.weighthg = this.weightkg * 10;
    this.tags = data.tags || [];
    this.unreleasedHidden = data.unreleasedHidden || false;
    this.maleOnlyHidden = !!data.maleOnlyHidden;
    this.maxHP = data.maxHP || undefined;
    this.isMega = !!(this.forme && ['Mega', 'Mega-X', 'Mega-Y'].includes(this.forme)) || undefined;
    this.canGigantamax = data.canGigantamax || undefined;
    this.gmaxUnreleased = !!data.gmaxUnreleased;
    this.cannotDynamax = !!data.cannotDynamax;
    this.battleOnly = data.battleOnly || (this.isMega ? this.baseSpecies : undefined);
    this.changesFrom = data.changesFrom ||
      (this.battleOnly !== this.baseSpecies ? this.battleOnly : this.baseSpecies);
    if (Array.isArray(data.changesFrom)) this.changesFrom = data.changesFrom[0]; // BUG

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

type Mutable<T> = {-readonly [P in keyof T]: T[P]};

class DexSpecies implements T.DexTable<Species> {
  readonly dex: ModdedDex;
  readonly caches = {
    get: Object.create(null) as { [id: string]: Species },
    all: undefined as ReadonlyArray<Species> | undefined,
  };

  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name: string): Species {
    name = name.trim();
    let id = toID(name);
    if (id === 'nidoran' && name.endsWith('♀')) {
      id = 'nidoranf' as T.ID;
    } else if (id === 'nidoran' && name.endsWith('♂')) {
      id = 'nidoranm' as T.ID;
    }
    return this.getByID(id);
  }

  getByID(id: T.ID): Species {
    let species: Mutable<Species> | undefined = this.caches.get[id];
    if (species) return species;

    const alias = this.dex.data.Aliases[id];
    if (alias) {
      const data = this.dex.data.FormatsData[id];
      if (data) {
        // special event ID, like Rockruff-Dusk
        const baseId = toID(alias);
        species = new Species({
          ...this.dex.data.Species[baseId],
          ...this.dex.data.FormatsData[id],
          name: id,
        });
        species.abilities = {0: species.abilities['S']!};
      } else {
        species = this.get(alias);
        if (species.cosmeticFormes) {
          for (const forme of species.cosmeticFormes) {
            if (toID(forme) === id) {
              species = new Species({
                ...species,
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

      if (species?.exists) this.caches.get[id] = species;
      return species;
    }

    let data = this.dex.data.Species[id];
    if (id && !data) {
      let aliasTo = '';
      const formeNames: {[k: string]: string[]} = {
        alola: ['a', 'alola', 'alolan'],
        galar: ['g', 'galar', 'galarian'],
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
        if (this.dex.data.Aliases.hasOwnProperty(pokeName)) {
          pokeName = toID(this.dex.data.Aliases[pokeName]);
        }
        if (this.dex.data.Species[pokeName + forme]) {
          aliasTo = pokeName + forme;
          break;
        }
      }
      if (aliasTo) {
        species = this.get(aliasTo);
        if (species.exists) {
          this.caches.get[id] = species;
          return species;
        }
      }
    }

    data = this.dex.data.Species[id];

    if (id && data) {
      const tags = data.baseSpecies && this.dex.data.Species[toID(data.baseSpecies)].tags;
      species = new Species({tags, ...data, ...this.dex.data.FormatsData[id]});
      if (!species.tier && !species.doublesTier && species.baseSpecies !== species.name) {
        if (species.baseSpecies === 'Mimikyu') {
          (species as any).tier =
            this.dex.data.FormatsData[toID(species.baseSpecies)].tier || 'Illegal';
          (species as any).doublesTier =
            this.dex.data.FormatsData[toID(species.baseSpecies)].doublesTier || 'Illegal';
        } else if (species.id.endsWith('totem')) {
          (species as any).tier =
            this.dex.data.FormatsData[species.id.slice(0, -5)].tier || 'Illegal';
          (species as any).doublesTier =
            this.dex.data.FormatsData[species.id.slice(0, -5)].doublesTier || 'Illegal';
        } else if (species.battleOnly) {
          (species as any).tier =
            this.dex.data.FormatsData[toID(species.battleOnly)].tier || 'Illegal';
          (species as any).doublesTier =
            this.dex.data.FormatsData[toID(species.battleOnly)].doublesTier || 'Illegal';
        } else {
          const baseFormatsData = this.dex.data.FormatsData[toID(species.baseSpecies)];
          if (!baseFormatsData) {
            throw new Error(`${species.baseSpecies} has no formats-data entry`);
          }
          (species as any).tier = baseFormatsData.tier || 'Illegal';
          (species as any).doublesTier = baseFormatsData.doublesTier || 'Illegal';
        }
      }
      if (!species.tier) species.tier = 'Illegal';
      if (!species.doublesTier) species.doublesTier = species.tier as any;
      if (species.gen > this.dex.gen) {
        species.tier = 'Illegal';
        species.doublesTier = 'Illegal';
        species.isNonstandard = 'Future';
      }
      species.nfe = !!(species.evos?.length && this.get(species.evos[0]).gen <= this.dex.gen);
      species.canHatch = species.canHatch ||
        (!['Ditto', 'Undiscovered'].includes(
          species.eggGroups[0]
        ) && !species.prevo && species.name !== 'Manaphy');
      if (this.dex.gen === 1) species.bst -= species.baseStats.spd;
      if (this.dex.gen < 5) delete species.abilities['H'];
    } else {
      species = new Species({
        id, name: id,
        exists: false, tier: 'Illegal', doublesTier: 'Illegal', isNonstandard: 'Custom',
      });
    }

    if (species.exists) this.caches.get[id] = species;
    return species;
  }

  all(): readonly Species[] {
    if (this.caches.all) return this.caches.all;
    const species = [];
    for (const id in this.dex.data.Species) {
      species.push(this.getByID(id as T.ID));
    }
    return (this.caches.all = species);
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

class DexLearnsets {
  readonly dex: ModdedDex;
  readonly cache = Object.create(null) as { [id: string]: Learnset };

  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  async get(name: string): Promise<Learnset> {
    return this.getByID(toID(name));
  }

  async getByID(id: T.ID): Promise<Learnset> {
    let learnset = this.cache[id];
    if (learnset) return learnset;

    if (!DATA.Learnsets) {
      const isNode =
        typeof process !== 'undefined' &&
        process.versions !== null &&
        process.versions.node !== null;
      if (isNode) {
        DATA.Learnsets = require('./data/learnsets.json');
      } else {
        try {
          // Cast required since Typescript thinks asynchronously imported JSON have default exports
          DATA.Learnsets =
            (await import('./data/learnsets.json')) as unknown as Data<T.LearnsetData>;
        } catch (err) {
          // @ts-ignore If we're being used via a <script> tag we depend on Learnsets being required
          DATA.Learnsets = (window as any).DexLearnsets as Data<T.LearnsetData>;
          if (!DATA.Learnsets) throw new Error('Learnsets have not been included!');
        }
      }
    }
    this.dex.load('Learnsets', this.dex.modData);
    this.dex.modData = undefined;

    const data = this.dex.data.Learnsets![id];
    if (id && data) {
      learnset = new Learnset(data);
    } else {
      learnset = new Learnset({exists: false});
    }
    if (learnset.exists) this.cache[id] = learnset;
    return learnset;
  }
}

export class Type implements T.Type {
  readonly id: T.ID;
  readonly name: T.TypeName;
  readonly effectType: 'Type';
  readonly kind: 'Type';
  readonly exists: boolean;
  readonly gen: T.GenerationNum;
  readonly isNonstandard: T.Nonstandard | null;
  readonly damageTaken: { [t in Exclude<T.TypeName, '???'>]: number } & { [key: string]: number };
  readonly HPivs: Partial<T.StatsTable>;
  readonly HPdvs: Partial<T.StatsTable>;

  constructor(data: AnyObject) {
    this.exists = true;
    Object.assign(this, data);

    this.effectType = 'Type';
    this.kind = 'Type';
    this.id = data.id;
    this.name = data.name;
    this.exists = !!(this.exists && this.id);
    this.gen = data.gen || 0;
    this.isNonstandard = data.isNonstandard || null;
    this.damageTaken = data.damageTaken || {};
    this.HPivs = data.HPivs || {};
    this.HPdvs = data.HPdvs || {};
  }

  toString() {
    return this.name;
  }
}

class DexTypes implements T.DexTable<Type> {
  readonly dex: ModdedDex;
  readonly caches = {
    get: Object.create(null) as { [id: string]: Type },
    all: undefined as ReadonlyArray<Type> | undefined,
    names: undefined as ReadonlyArray<string> | undefined,
  };

  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name: string): Type {
    if (name && typeof name !== 'string') return name;
    return this.getByID(toID(name));
  }

  getByID(id: T.ID): Type {
    const alias = this.dex.data.Aliases[id];
    if (alias) id = toID(alias);

    let type = this.caches.get[id];
    if (type) return type;

    const typeName = id.charAt(0).toUpperCase() + id.substr(1) as Exclude<T.TypeName, '???'>;
    const data = this.dex.data.Types[id];
    if (typeName && data) {
      type = new Type({name: typeName, id, ...data});
    } else {
      type = new Type({name: typeName, id, exists: false});
    }

    if (type.exists) this.caches.get[id] = type;
    return type;
  }

  names(): readonly string[] {
    if (this.caches.names) return this.caches.names;
    this.caches.names = this.all().filter(type => !type.isNonstandard).map(type => type.name);
    return this.caches.names;
  }

  isName(name: string): boolean {
    const id = name.toLowerCase();
    const typeName = id.charAt(0).toUpperCase() + id.substr(1);
    return name === typeName && this.dex.data.Types.hasOwnProperty(id);
  }

  all(): readonly Type[] {
    if (this.caches.all) return this.caches.all;
    const types = [];
    for (const id in this.dex.data.Types) {
      types.push(this.getByID(id as T.ID));
    }
    return (this.caches.all = types);
  }
}

const STATS: readonly T.StatID[] = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];

class DexStats {
  readonly shortNames: {readonly [k in T.StatID]: string};
  readonly mediumNames: {readonly [k in T.StatID]: string};
  readonly names: {readonly [k in T.StatID]: string};

  constructor(dex: ModdedDex) {
    if (dex.gen !== 1) {
      this.shortNames = {
        __proto__: null,
        hp: 'HP', atk: 'Atk', def: 'Def',
        spa: 'SpA', spd: 'SpD', spe: 'Spe',
      } as any;
      this.mediumNames = {
        __proto__: null,
        hp: 'HP', atk: 'Attack', def: 'Defense',
        spa: 'Sp. Atk', spd: 'Sp. Def', spe: 'Speed',
      } as any;
      this.names = {
        __proto__: null,
        hp: 'HP', atk: 'Attack', def: 'Defense',
        spa: 'Special Attack', spd: 'Special Defense', spe: 'Speed',
      } as any;
    } else {
      this.shortNames = {
        __proto__: null,
        hp: 'HP', atk: 'Atk', def: 'Def',
        spa: 'Spc', spd: '[SpD]', spe: 'Spe',
      } as any;
      this.mediumNames = {
        __proto__: null,
        hp: 'HP', atk: 'Attack', def: 'Defense',
        spa: 'Special', spd: '[Sp. Def]', spe: 'Speed',
      } as any;
      this.names = {
        __proto__: null,
        hp: 'HP', atk: 'Attack', def: 'Defense',
        spa: 'Special', spd: '[Special Defense]', spe: 'Speed',
      } as any;
    }
  }

  ids(): typeof STATS {
    return STATS;
  }
}

// #endregion

// #region Dex

type Data<T> = { 8: { [id: string]: T } } & {
  [num in Exclude<T.GenerationNum, 8>]?: { [id: string]: { inherit?: boolean } & T.DeepPartial<T> }
};

const DATA = {
  Abilities: AbilitiesJSON as Data<T.AbilityData>,
  Aliases: AliasesJSON as { [id: string]: string },
  Conditions: ConditionsJSON as Data<T.ConditionData>,
  Items: ItemsJSON as Data<T.ItemData>,
  Moves: MovesJSON as unknown as Data<T.MoveData>,
  Species: SpeciesJSON as Data<T.SpeciesData>,
  Natures: NaturesJSON as Data<T.NatureData>,
  Learnsets: null! as Data<T.LearnsetData>,
  Types: TypesJSON as Data<T.TypeData>,
  FormatsData: FormatsDataJSON as Data<FormatData>,
};

const HP_TYPES = [
  'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
  'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark',
];

const GEN_IDS = ['gen1', 'gen2', 'gen3', 'gen4', 'gen5', 'gen6', 'gen7', 'gen8'] as const;
type GenID = typeof GEN_IDS[number];
const CURRENT_GEN_ID: GenID = GEN_IDS[7];

const dexes: { [mod: string]: ModdedDex } = Object.create(null);

export type ModData = T.DeepPartial<ModdedDex['data']> & T.ModData;

export class ModdedDex implements T.Dex {
  static readonly STATS: ReadonlyArray<T.StatID> = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];

  readonly gen: T.GenerationNum;
  readonly modid: T.ID;
  readonly data!: {
    Abilities: { [id: string]: T.AbilityData };
    Aliases: { [id: string]: string };
    Conditions: { [id: string]: T.ConditionData };
    FormatsData: { [id: string]: FormatData };
    Items: { [id: string]: T.ItemData };
    Learnsets: null | { [id: string]: T.LearnsetData };
    Moves: { [id: string]: T.MoveData };
    Natures: { [id: string]: T.NatureData };
    Species: { [id: string]: T.SpeciesData };
    Types: { [id: string]: T.TypeData };
  };

  readonly abilities: DexAbilities;
  readonly conditions: DexConditions;
  readonly items: DexItems;
  readonly learnsets: DexLearnsets;
  readonly moves: DexMoves;
  readonly natures: DexNatures;
  readonly species: DexSpecies;
  readonly stats: DexStats;
  readonly types: DexTypes;

  /* private */ modData?: ModData = undefined;

  constructor(modid = CURRENT_GEN_ID as GenID | T.ID, modData?: ModData) {
    const isGen = (GEN_IDS as unknown as Array<GenID | T.ID>).includes(modid);
    if (!isGen && !modData) throw new Error(`Must provide mod data with mod '${modid}'`);
    this.modid = modid as T.ID;
    this.gen = parseInt((modData?.Scripts?.inherit ?? modid).slice(3)) as T.GenerationNum || 8;
    this.loadData(modData);

    this.abilities = new DexAbilities(this);
    this.conditions = new DexConditions(this);
    this.items = new DexItems(this);
    this.learnsets = new DexLearnsets(this);
    this.moves = new DexMoves(this);
    this.natures = new DexNatures(this);
    this.species = new DexSpecies(this);
    this.stats = new DexStats(this);
    this.types = new DexTypes(this);
  }

  mod(genid: GenID): ModdedDex;
  mod(modid: T.ID, modData: ModData): ModdedDex;
  mod(modid: GenID | T.ID, modData?: ModData) {
    if (modid in dexes) return modData ? new ModdedDex(modid, modData) : dexes[modid];
    return (dexes[modid] = new ModdedDex(modid as T.ID, modData));
  }

  forGen(gen: number) {
    if (!gen) return this;
    return this.mod(`gen${gen}` as GenID);
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
    const typeData = this.types.get(targetTyping as Exclude<T.TypeName, '???'>);
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
    const typeData = this.types.get(targetTyping as Exclude<T.TypeName, '???'>);
    if (!typeData) return 0;
    switch (typeData.damageTaken[sourceType]) {
    case 1: return 1; // super-effective
    case 2: return -1; // resist
      // in case of weird situations like Gravity, immunity is handled elsewhere
    default: return 0;
    }
  }

  getHiddenPower(ivs: T.StatsTable) {
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
        type: HP_TYPES[4 * (atkDV % 4) + (defDV % 4)] as T.TypeName,
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
        hpTypeX += i * (ivs[s as T.StatID] % 2);
        hpPowerX += i * (tr(ivs[s as T.StatID] / 2) % 2);
        i *= 2;
      }
      return {
        type: HP_TYPES[tr(hpTypeX * 15 / 63)] as T.TypeName,
        // After Gen 6, Hidden Power is always 60 base power
        power: (this.gen && this.gen < 6) ? tr(hpPowerX * 40 / 63) + 30 : 60,
      };
    }
  }

  includeModData() {
    return this;
  }

  includeData() {
    return this;
  }

  includeFormats() {
    return this;
  }

  loadData(modData?: ModData) {
    if (this.data) return this.data;
    (this.data as any) = {} as ModdedDex['data'];

    for (const t in DATA) {
      const type = t as keyof typeof DATA;
      if (type === 'Learnsets') {
        this.modData = modData;
        continue; // async
      }
      if (type === 'Aliases') {
        (this.data as any)[type] = DATA[type];
        continue;
      }
      this.load(type, modData);
    }
    return this.data;
  }

  load(type: Exclude<keyof ModdedDex['data'], 'Aliases'>, modData?: ModData) {
    if (this.data[type]) return;

    const d = modData ? modData[type] : DATA[type][this.gen];
    if (d !== this.data[type]) this.data[type] = ({...d, ...this.data[type]}) as any;

    if (this.modid === CURRENT_GEN_ID) return;

    const parentDex = modData?.Scripts?.inherit
      ? this.mod(modData.Scripts.inherit)
      : this.forGen(modData ? this.gen : this.gen + 1 as T.GenerationNum);
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
      } else if (childDataType[entry]?.inherit) {
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
function getGen3Category(type: T.TypeName) {
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

export {
  ID,
  As,
  Weather,
  FieldCondition,
  SideCondition,
  GenerationNum,
  GenderName,
  StatID,
  StatsTable,
  BoostID,
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
  // BasicEffect,
  // Condition,
  // Ability,
  // Item,
  // Move,
  // Species,
  EventInfo,
  // Learnset,
  // Type,
  // Nature,
  GenID,
  // Dex,
} from '@pkmn/dex-types';
