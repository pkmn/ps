import * as I from './interface';

export type Effect = Ability | Item | Move;


export interface Dex {
  getAbility(name: string | Ability): Ability;


}

export interface Ability {

}

export const Generations: I.Generations = new (class {
  get(gen: I.GenerationNum) {
    return new Generation(sim.Dex.mod(`gen${gen}`));
  }
})();

// FIXME deal with forme name/id etc differences etc!

class Generation implements I.Generation {
  dex: Dex;

  abilities: Abilities;
  items: Items;
  moves: Moves;
  species: Species;
  types: Types;
  natures: Natures;

  constructor(dex: Dex) {
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
  private readonly dex: Dex;

  constructor(dex: Dex) {
    this.dex = dex;
  }

  get(id: string) {
    const ability = this.dex.getAbility(id);
    return exists(ability) ? new Ability(ability) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Abilities) {
      yield this.get(id as I.ID)!;
    }
  }
}

class Ability implements I.Ability {
  readonly kind: 'Ability';
  readonly id: I.ID;
  readonly name: I.AbilityName;

  constructor(ability: sim.Ability) {
    this.kind = 'Ability';
    this.id = ability.id as I.ID;
    this.name = ability.name as I.AbilityName;
  }
}

class Items implements I.Items {
  private readonly dex: sim.ModdedDex;

  constructor(dex: sim.ModdedDex) {
    this.dex = dex;
  }

  get(id: string) {
    const item = this.dex.getEffect(id) as unknown as sim.Item;
    return exists(item) ? new Item(item) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Items) {
      yield this.get(id as I.ID)!;
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

  constructor(item: sim.Item) {
    this.kind = 'Item';
    this.id = item.id as I.ID;
    this.name = item.name as I.ItemName;
    this.megaEvolves = item.megaEvolves as I.SpeciesName;
    this.isBerry = item.isBerry;
    this.naturalGift = item.naturalGift as {basePower: number, type: I.TypeName};
  }
}

class Moves implements I.Moves {
  private readonly dex: sim.ModdedDex;

  constructor(dex: sim.ModdedDex) {
    this.dex = dex;
  }

  get(id: string) {
    const move = this.dex.getMove(id) as unknown as sim.Move;
    return exists(move) ? new Move(move) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Movedex) {
      yield this.get(id as I.ID)!;
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

  constructor(move: sim.Move) {
    this.kind = 'Move';
    this.id = move.id as I.ID;
    this.name = move.name as I.MoveName;
    this.bp = move.basePower;
    this.type = move.type as I.TypeName;
    // TODO
  }
}

class Species implements I.Species {
  private readonly dex: sim.ModdedDex;

  constructor(dex: sim.ModdedDex) {
    this.dex = dex;
  }

  get(id: I.ID) {
    const species = this.dex.getSpecies(id);
    return exists(species) ? new Specie(species) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Pokedex) {
      yield this.get(id as I.ID)!;
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

  constructor(species: sim.Species) {
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
    // TODO formes
    const abilities = Object.values(species.abilities) as I.AbilityName[];
    if (abilities.length === 1) this.ab = abilities[0];
  }
}

export class Types implements I.Types {
  private readonly dex: sim.ModdedDex;

  constructor(dex: sim.ModdedDex) {
    this.dex = dex;
  }

  get(id: I.ID) {
    // toID('???') => '', as do many other things, but returning the '???' type seems appropriate :)
    return TYPES_BY_ID[this.gen][id];
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.TypeChart) {
      yield this.get(id as I.ID)!;
    }
  }
}

class Type implements I.Type {
  readonly kind: 'Type';
  readonly id: I.ID;
  readonly name: I.TypeName;
  readonly category: I.MoveCategory;
  readonly damageTaken: Readonly<{[type in I.TypeName]?: I.TypeEffectiveness}>;

  constructor(type: sim.TypeInfo) {
    this.kind = 'Type';
    this.id = type.id as I.ID;
    this.name = type.name as I.TypeName;
    this.category = damageTaken!.category;
    delete damageTaken!.category;
    this.damageTaken = damageTaken! as {[type in I.TypeName]?: I.TypeEffectiveness};
  }
}


export class Natures implements I.Natures {
  private readonly dex: sim.ModdedDex;

  constructor(dex: sim.ModdedDex) {
    this.dex = dex;
  }

  get(id: I.ID) {
    const nature = this.dex.getNature(id)
    return exists(nature) ? new Nature(nature) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Natures) {
      yield this.get(id as I.ID)!;
    }
  }
}

class Nature implements I.Nature {
  readonly kind: 'Nature';
  readonly id: I.ID;
  readonly name: I.NatureName;
  readonly plus: I.StatName;
  readonly minus: I.StatName;

  constructor(nature: sim.Nature) {
    this.kind = 'Nature';
    this.id = nature.id;
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

function exists(val?: sim.Ability | sim.Item | sim.Move | sim.Species | sim.Nature) {
  if (!val || (typeof val.exists === 'boolean' && !val.exists)) return false;
  if ('tier' in val && (val.tier === 'Unreleased' || val.tier === 'Illegal')) return false;
  return !(val.isNonstandard && val.isNonstandard !== 'CAP');
}
