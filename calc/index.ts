import {ID, GenerationNum, TypeName} from '@pkmn/types';
import * as I from '@smogon/calc/data/interface';
import * as D from './dex';

function toID(s: string): ID {
  return ('' + s).toLowerCase().replace(/[^a-z0-9]+/g, '') as ID;
}

const GENERATIONS = Object.create(null) as {[num: number]: Generation};

export class Generations implements I.Generations {
  private readonly dex: D.Dex;

  constructor(dex: D.Dex) {
    this.dex = dex;
  }

  get(gen: I.GenerationNum) {
    if (GENERATIONS[gen]) return GENERATIONS[gen];
    return (GENERATIONS[gen] = new Generation(this.dex.forGen(gen)));
  };
}

class Generation implements I.Generation {
  dex: D.Dex;

  abilities: Abilities;
  items: Items;
  moves: Moves;
  species: Species;
  types: Types;
  natures: Natures;

  constructor(dex: D.Dex) {
    this.dex = dex;

    this.abilities = new Abilities(dex);
    this.items = new Items(dex);
    this.moves = new Moves(dex);
    this.species = new Species(dex);
    this.types = new Types(dex);
    this.natures = new Natures(dex);
  }

  get num() {
    return this.dex.gen as I.GenerationNum;
  }
}

class Abilities implements I.Abilities {
  private readonly dex: D.Dex;

  constructor(dex: D.Dex) {
    this.dex = dex;
  }

  get(id: I.ID) {
    const ability = this.dex.getAbility(id);
    return exists(ability, this.dex.gen) ? new Ability(ability) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Abilities) {
      const a = this.get(id as I.ID)!;
      if (a) yield a;
    }
  }
}

class Ability implements I.Ability {
  readonly kind: 'Ability';
  readonly id: I.ID;
  readonly name: I.AbilityName;

  constructor(ability: D.Ability) {
    this.kind = 'Ability';
    this.id = ability.id as I.ID;
    this.name = ability.name as I.AbilityName;
  }
}

class Items implements I.Items {
  private readonly dex: D.Dex;

  constructor(dex: D.Dex) {
    this.dex = dex;
  }

  get(id: I.ID) {
    const item = this.dex.getItem(id);
    return exists(item, this.dex.gen) ? new Item(item) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Items) {
      const i = this.get(id as I.ID)!;
      if (i) yield i;
    }
  }
}

class Item implements I.Item {
  readonly kind: 'Item';
  readonly id: I.ID;
  readonly name: I.ItemName;
  readonly megaEvolves?: I.SpeciesName;
  readonly isBerry?: boolean;
  readonly naturalGift?: Readonly<{basePower: number; type: I.TypeName}>;

  constructor(item: D.Item) {
    this.kind = 'Item';
    this.id = item.id as I.ID;
    this.name = item.name as I.ItemName;
    this.megaEvolves = item.megaEvolves as I.SpeciesName;
    this.isBerry = item.isBerry;
    this.naturalGift = item.naturalGift as {basePower: number, type: I.TypeName};
  }
}

class Moves implements I.Moves {
  private readonly dex: D.Dex;

  constructor(dex: D.Dex) {
    this.dex = dex;
  }

  get(id: I.ID) {
    const move = this.dex.getMove(id);
    return exists(move, this.dex.gen) ? new Move(move) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Moves) {
      const m = this.get(id as I.ID)!;
      if (m) yield m;
    }
  }
}

class Move implements I.Move {
  readonly kind: 'Move';
  readonly id: I.ID;
  readonly name: I.MoveName;
  readonly bp: number;
  readonly type: I.TypeName;
  readonly category?: I.MoveCategory;
  readonly hasSecondaryEffect?: boolean;
  readonly isSpread?: boolean | 'allAdjacent';
  readonly makesContact?: boolean;
  readonly hasRecoil?: I.MoveRecoil;
  readonly alwaysCrit?: boolean;
  readonly givesHealth?: boolean;
  readonly percentHealed?: number;
  readonly ignoresBurn?: boolean;
  readonly isPunch?: boolean;
  readonly isBite?: boolean;
  readonly isBullet?: boolean;
  readonly isSound?: boolean;
  readonly isPulse?: boolean;
  readonly hasPriority?: boolean;
  readonly dropsStats?: number;
  readonly ignoresDefenseBoosts?: boolean;
  readonly dealsPhysicalDamage?: boolean;
  readonly bypassesProtect?: boolean;
  readonly isZ?: boolean;
  readonly isMax?: boolean;
  readonly usesHighestAttackStat?: boolean;
  readonly zp?: number;
  readonly maxPower?: number;
  readonly isMultiHit?: boolean;
  readonly isTwoHit?: boolean;

  constructor(move: D.Move) {
    this.kind = 'Move';
    this.id = move.id as I.ID;
    this.name = move.name as I.MoveName;
    this.bp = move.basePower;
    this.type = move.type as I.TypeName;

    // TODO !!!!
  }
}

class Species implements I.Species {
  private readonly dex: D.Dex;

  constructor(dex: D.Dex) {
    this.dex = dex;
  }

  get(id: I.ID) {
    const species = this.dex.getSpecies(id);
    return exists(species, this.dex.gen) ? new Specie(species) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Species) {
      const s = this.get(id as I.ID)!;
      if (s) yield s;
    }
  }
}

class Specie implements I.Specie {
  readonly kind: 'Species';
  readonly id: I.ID;
  readonly name: I.SpeciesName;

  readonly t1: I.TypeName;
  readonly t2?: I.TypeName;
  readonly bs: {
    hp: number;
    at: number;
    df: number;
    sa: number;
    sd: number;
    sp: number;
    sl?: number;
  }; // baseStats
  readonly w: number;
  readonly canEvolve?: boolean;
  readonly gender?: I.GenderName;
  readonly formes?: I.SpeciesName[];
  readonly isAlternateForme?: boolean;
  readonly ab?: I.AbilityName;

  constructor(species: D.Species) {
    this.kind = 'Species';
    this.id = species.id as I.ID;
    this.name = species.name as I.SpeciesName;
    this.t1 = species.types[0] as I.TypeName;
    if (species.types[1]) this.t2 = species.types[1] as I.TypeName;
    this.bs = {
      hp: species.baseStats.hp,
      at: species.baseStats.atk,
      df: species.baseStats.def,
      sa: species.baseStats.spa,
      sd: species.baseStats.spd,
      sp: species.baseStats.spe,
      // PS has spa = spd = spc in gen 1
      sl: species.baseStats.spa,
    };
    this.w = species.weightkg;
    this.canEvolve = !!species.evos;
    if (species.gender) this.gender = species.gender;
    // FIXME deal with forme name/id etc differences etc!
    const abilities = Object.values(species.abilities) as I.AbilityName[];
    if (abilities.length === 1) this.ab = abilities[0];
  }
}

const DAMAGE_TAKEN = [0, 0.5, 1, 2] as I.TypeEffectiveness[];

export class Types implements I.Types {
  private readonly dex: D.Dex
  private readonly byID: {[id: string]: I.Type}

  constructor(dex: D.Dex) {
    this.dex = dex;

    const unknown = {
      kind: 'Type',
      id: '' as ID,
      name: '???',
      category: 'Physical',
      damageTaken: {'???': 1},
    } as I.Type;

    this.byID = {};
    for (const t in this.dex.data.Types) {
      const id = toID(t) as I.ID;
      const name = t as Exclude<TypeName, '???'>;
      const damageTaken = {} as {[type in I.TypeName]: I.TypeEffectiveness};
      const dt = this.dex.data.Types[name].damageTaken;
      for (const d in dt) {
        if (d in this.dex.data.Types) {
          damageTaken[d as Exclude<TypeName, '???'>] = DAMAGE_TAKEN[dt[d]];
        }
        damageTaken['???'] = 1;
      }
      (unknown.damageTaken as any)[name] = 1;
      this.byID[id] = {kind: 'Type', id, name, damageTaken};
    }
    this.byID[unknown.id] = unknown;
  }

  get(id: I.ID) {
    // toID('???') => '', as do many other things, but returning the '???' type seems appropriate :)
    return this.byID[id];
  }

  *[Symbol.iterator]() {
    for (const id in this.byID) {
      yield this.byID[id];
    }
  }
}

export class Natures implements I.Natures {
  private readonly dex: D.Dex;

  constructor(dex: D.Dex) {
    this.dex = dex;
  }

  get(id: I.ID) {
    const nature = this.dex.getNature(id)
    return exists(nature, this.dex.gen) ? new Nature(nature) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Natures) {
      const n = this.get(id as I.ID)!;
      if (n) yield n;
    }
  }
}

class Nature implements I.Nature {
  readonly kind: 'Nature';
  readonly id: I.ID;
  readonly name: I.NatureName;
  readonly plus: I.StatName;
  readonly minus: I.StatName;

  constructor(nature: D.Nature) {
    this.kind = 'Nature';
    this.id = nature.id as I.ID;
    this.name = nature.name as I.NatureName;
    if (nature.plus) {
      this.plus = nature.plus;
      this.minus = nature.minus!;
    } else {
      this.plus = 'spe';
      this.minus = 'spe';
    }
  }
}

function exists(val: D.Ability| D.Item | D.Move | D.Species | D.Nature, gen: GenerationNum) {
  if (typeof val.exists === 'boolean' && !val.exists) return false;
  if ('tier' in val && (val.tier === 'Unreleased' || val.tier === 'Illegal')) return false;
  return !(val.gen > gen || (val.isNonstandard && val.isNonstandard !== 'CAP'));
}
