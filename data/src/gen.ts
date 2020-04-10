import {
  EvoType,
  GenderName,
  GenerationNum,
  ID,
  Nonstandard,
  StatsTable,
} from '@pkmn/types';

import {toID, Dex, ModdedDex, Species as DexSpecies, SpeciesAbility} from './dex';

const GENERATIONS = Object.create(null) as {[num: number]: Generation};

export const Generations = new class {
  get(gen: GenerationNum) {
    if (GENERATIONS[gen]) return GENERATIONS[gen];
    return (GENERATIONS[gen] = new Generation(Dex.forGen(gen)));

  };
}

// FIXME exists check

export class Generation {
  readonly abilities: Abilities;
  readonly items: Items;
  readonly moves: Moves;
  readonly species: Species;
  readonly types: Types;
  readonly natures: Natures;
  readonly learnsets: Learnsets;
  readonly effects: Effects;

  private readonly dex: ModdedDex;

  constructor(dex: ModdedDex) {
    this.dex = dex;

    this.abilities = new Abilities(this.dex);
    this.items = new Items(this.dex);
    this.moves = new Moves(this.dex);
    this.species = new Species(this.dex);
    this.natures = new Natures(this.dex);
    this.types = new Types(this.dex);
    this.learnsets = new Learnsets(this.dex);
    this.effects = new Effects(this.dex);
  }

  get num() {
    return this.dex.gen;
  }
}

export class Abilities {
  private readonly dex: ModdedDex;
  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name: string) {
    const ability = this.dex.getAbility(name);
    return !ability.exists ? undefined : ability;
  }

  *[Symbol.iterator]() {
    for (const ability in this.dex.data.Abilities) {
      yield this.get(ability);
    }
  }
}

export class Items {
  private readonly dex: ModdedDex;
  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name: string) {
    const move = this.dex.getMove(name);
    return !move.exists ? undefined : move;
  }

  *[Symbol.iterator]() {
    for (const move in this.dex.data.Moves) {
      yield this.get(move);
    }
  }
}

export class Moves {
  private readonly dex: ModdedDex;
  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name: string) {
    const move = this.dex.getMove(name);
    return !move.exists ? undefined : move;
  }

  *[Symbol.iterator]() {
    for (const move in this.dex.data.Moves) {
      yield this.get(move);
    }
  }
}

export class Species {
  private readonly dex: ModdedDex;
  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  getFormeName(name: string) {
    return this.dex.getForme(name);
  }

  get(name: string) {
    const species = this.dex.getSpecies(name);
    return !species.exists ? undefined : species;
  }

  *[Symbol.iterator]() {
    for (const species in this.dex.data.Species) {
      yield this.get(species);
    }
  }
}

export class Specie implements DexSpecies {
  readonly fullname!: string;
  readonly exists!: boolean;
  readonly num!: number;
  readonly gen!: GenerationNum;
  readonly shortDesc!: string;
  readonly desc!: string;
  readonly isNonstandard!: Nonstandard | null;
  readonly duration?: number;
  readonly noCopy!: boolean;
  readonly affectsFainted!: boolean;
  readonly status?: ID;
  readonly weather?: ID;
  readonly sourceEffect!: string;

  readonly effectType!: 'Pokemon';
  readonly id!: ID;
  readonly name!: string;
  readonly baseSpecies!: string;
  readonly forme!: string;
  readonly baseForme!: string;
  readonly cosmeticFormes?: string[];
  readonly otherFormes?: string[];
  readonly spriteid!: string;
  readonly abilities!: SpeciesAbility;
  readonly types!: string[];
  readonly addedType?: string;
  readonly prevo!: ID;
  readonly evos!: ID[];
  readonly evoType?: EvoType;
  readonly evoMove?: string;
  readonly evoLevel?: number;
  readonly nfe!: boolean;
  readonly eggGroups!: string[];
  readonly gender!: GenderName;
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
  readonly requiredItem?: string;
  readonly requiredMove?: string;
  readonly requiredAbility?: string;
  readonly requiredItems?: string[];
  readonly inheritsFrom!: ID;
  readonly tier!: string;
  readonly doublesTier!: string;
  readonly randomBattleMoves?: readonly ID[];
  readonly randomDoubleBattleMoves?: readonly ID[];
  readonly exclusiveMoves?: readonly ID[];
  readonly comboMoves?: readonly ID[];
  readonly essentialMove?: ID;

  private readonly dex: ModdedDex;
  constructor(dex: ModdedDex, species: DexSpecies) {
    Object.assign(this, species);
    this.dex = dex;
  }

  hasAbility(ability: string) {
    return this.dex.hasAbility(this, ability);
  }

  getOutOfBattleSpecies() {
    return this.dex.getOutOfBattleSpecies(this);
  }
}

export class Effects {
  private readonly dex: ModdedDex;
  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name: string) {
    const effect = this.dex.getEffect(name);
    return !effect.exists ? undefined : effect;
  }
}

export class Natures {
  private readonly dex: ModdedDex;
  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name: string) {
    const nature = this.dex.getNature(name);
    return !nature.exists ? undefined : nature;
  }

  *[Symbol.iterator]() {
    for (const nature in this.dex.data.Natures) {
      yield this.get(nature);
    }
  }
}

// FIXME fix this type to not be retarded
// TODO getEffectiveness
// TODO getImmunity
export class Types {
  private readonly dex: ModdedDex;
  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  get(name: string) {
    const type = this.dex.getType(name);
    return !type.exists ? undefined : type;
  }

  *[Symbol.iterator]() {
    for (const type in this.dex.data.Types) {
      yield this.get(type);
    }
  }

  getHiddenPower(ivs: StatsTable) {
    return this.dex.getHiddenPower(ivs);
  }
}

export class Learnsets {
  private readonly dex: ModdedDex;
  constructor(dex: ModdedDex) {
    this.dex = dex;
  }

  async get(name: string) {
    const learnset = await this.dex.getLearnset(toID(name));
    return !learnset.exists ? undefined : learnset;
  }

  async *[Symbol.iterator]() {
    if (!this.dex.data.Learnsets) await this.dex.getLearnset('LOAD' as ID);
    for (const id in this.dex.data.Learnsets) {
      yield this.get(id);
    }
  }
}
