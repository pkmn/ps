import {ID, GenerationNum, TypeName} from '@pkmn/types';
import * as I from '@smogon/calc/data/interface';
import * as D from './dex';

export function toID(s: string) {
  return ('' + s).toLowerCase().replace(/[^a-z0-9]+/g, '') as I.ID;
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

  get(name: string) {
    const ability = this.dex.getAbility(name);
    if (ability.isNonstandard === 'CAP' && this.dex.gen < 4) return undefined;
    return exists(ability, this.dex.gen) ? new Ability(ability) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Abilities) {
      const a = this.get(id);
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

  get(name: string) {
    if (this.dex.gen < 2) return undefined;
    let item = this.dex.getItem(name);
    // Enigma Berry is Unobtainable in Gen 3, but the damage calc supports Unobtainable data and
    // needs the naturalGift data which is only defined in Gen 4.
    if (this.dex.gen === 3 && item.id === 'enigmaberry') {
      item = this.dex.forGen(4).getItem('enigmaberry');
    }
    return exists(item, this.dex.gen) ? new Item(item, this.dex.gen) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Items) {
      const i = this.get(id);
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

  constructor(item: D.Item, gen: I.GenerationNum) {
    this.kind = 'Item';
    this.id = item.id as I.ID;
    this.name = item.name as I.ItemName;
    this.megaEvolves = item.megaEvolves as I.SpeciesName;
    this.isBerry = item.isBerry;
    const mod = gen === 2 ? -20 : gen === 5 ? 20 : 0; // FIXME: wtf?
    this.naturalGift = item.naturalGift && {
      basePower: item.naturalGift.basePower + mod,
      type: item.naturalGift.type as I.TypeName
    };
  }
}

class Moves implements I.Moves {
  private readonly dex: D.Dex;

  constructor(dex: D.Dex) {
    this.dex = dex;
  }

  get(name: string) {
    const move = this.dex.getMove(name);
    return exists(move, this.dex.gen) ? new Move(move, this.dex) : undefined;
  }

  *[Symbol.iterator]() {
    yield NoMove(this.dex);
    for (const id in this.dex.data.Moves) {
      const m = this.get(id);
      if (m) yield m;
    }
  }
}

// BUG: these don't actually *always* crit, but for the purposes of the calc they are considered to
const GEN1_ALWAYS_CRIT = ['crabhammer', 'razorleaf', 'slash'];

// Moves which caused typeless damage between Gen 2 and 4
const TYPELESS_DAMAGE = ['futuresight', 'doomdesire', 'struggle'];

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

  constructor(move: D.Move, dex: D.Dex) {
    this.kind = 'Move';
    this.id = move.id === 'hiddenpower' ? toID(move.name) : move.id as I.ID;
    this.name = move.name as I.MoveName;

    if (dex.gen === 3 && move.id === 'Explosion') console.log(move);
    this.bp = move.basePower;
    if (['return', 'frustration', 'pikapapow', 'veeveevolley'].includes(move.id)) {
      this.bp = 102;
    } else if (move.id === 'naturepower') {
      this.bp = 80; // FIXME terrain...
      if (dex.gen >= 4) this.category = 'Special';
      if (dex.gen >= 5) this.hasSecondaryEffect = true;
    }

    if (move.isZ) delete move.zMovePower; // FIXME: wtf PS

    this.type = move.type;
    if (dex.gen > 1 && dex.gen <= 4 && TYPELESS_DAMAGE.includes(move.id)) {
      this.type = '???';
    }

    if (move.recoil) {
      this.hasRecoil = Math.floor((move.recoil[0] / move.recoil[1]) * 100);
    } else if (move.hasCrashDamage) {
      this.hasRecoil = 'crash';
    } else if (move.mindBlownRecoil) {
      this.hasRecoil = true;
    } else if (move.struggleRecoil) {
      this.hasRecoil = 'Struggle';
    }

    const stat = move.category === 'Special' ? 'spa' : 'atk';
    if (move.self?.boosts && move.self.boosts[stat] && move.self.boosts[stat]! < 0) {
      this.dropsStats = Math.abs(move.self.boosts[stat]!);
    }

    if (move.multihit) {
      // FIXME: Triple Kick
      if (move.multihit === 2) {
        this.isTwoHit = true;
      } else {
        this.isMultiHit = true;
      }
    }

    if ( move.drain) {
      this.givesHealth = true;
      this.percentHealed = move.drain[0] / move.drain[1];
    }

    if (move.willCrit || dex.gen === 1 && GEN1_ALWAYS_CRIT.includes(move.id)) {
      this.alwaysCrit = true;
    }
    if (move.priority > 0) this.hasPriority = true;

    if (dex.gen >= 2) {
      if (move.breaksProtect) this.bypassesProtect = true;
      if (GEN1_ALWAYS_CRIT.includes(move.id)) this.alwaysCrit = false;
    }
    if (dex.gen >= 3) {
      if (move.flags.contact) this.makesContact = true;
      if (move.flags.sound) this.isSound = true;

      if (['allAdjacentFoes', 'adjacentFoe'].includes(move.target)) {
        this.isSpread = true;
      } else if (move.target === 'allAdjacent') {
        this.isSpread = move.target;
      }
    }
    if (dex.gen >= 4) {
      if (move.flags.punch) this.isPunch = true;
      if (move.flags.bite) this.isBite = true;

      if (move.category !== 'Status') this.category = move.category;
    }
    if (dex.gen >= 5) {
      if (move.ignoreDefensive) this.ignoresDefenseBoosts = true;
      if (move.defensiveCategory === 'Physical') this.dealsPhysicalDamage = true;

      if ('secondaries' in move && move.secondaries?.length) {
        this.hasSecondaryEffect = true;
      }
    }
    if (dex.gen >= 6) {
      if (move.flags.bullet) this.isBullet = true;
      if (move.flags.pulse) this.isPulse = true;
      if (move.id === 'facade') this.ignoresBurn = true;
    }
    if (dex.gen >= 7) {
      if (move.isZ) this.isZ = true;
      if (move.zMovePower) this.zp = move.zMovePower;
    }
    if (dex.gen >= 8) {
      if (move.isMax) this.isMax = true
      if (move.gmaxPower) this.maxPower = move.gmaxPower;
    }

    if (['lightthatburnsthesky', 'photongeyser'].includes(move.id)) {
      this.usesHighestAttackStat = true;
    }
  }
}

class Species implements I.Species {
  private readonly dex: D.Dex;

  constructor(dex: D.Dex) {
    this.dex = dex;
  }

  get(name: string) {
    const species = this.dex.getSpecies(name);
    if (this.dex.gen >= 6 && species.id === 'aegislashboth') return AegislashBoth(this.dex);
    return exists(species, this.dex.gen) ? new Specie(species, this.dex) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Species) {
      const s = this.get(id);
      if (s) {
        if (id ==='aegislash') yield AegislashBoth(this.dex);
        yield s;
      }
    }
  }
}

// Custom Move placeholder
function NoMove(dex: D.Dex) {
  return new Move({
    id: 'nomove' as ID,
    name: '(No Move)',
    basePower: 0,
    type: 'Normal',
    category: 'Status',
    target: 'any',
    flags: {},
    gen: 1,
    priority: 0,
  }, dex);
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

  constructor(species: D.Species, dex: D.Dex) {
    this.kind = 'Species';
    this.id = (species.id === 'aegislash' ? 'aegislashshield' : species.id) as I.ID;
    this.name = (species.name === 'Aegislash' ? 'Aegislash-Shield' : species.name) as I.SpeciesName;
    this.t1 = species.types[0] as I.TypeName;
    if (species.types[1]) this.t2 = species.types[1] as I.TypeName;
    this.bs = {
      hp: species.baseStats.hp,
      at: species.baseStats.atk,
      df: species.baseStats.def,
      sa: species.baseStats.spa,
      sd: species.baseStats.spd,
      sp: species.baseStats.spe,
    };
    if (dex.gen === 1) {
      delete this.bs.sa;
      delete this.bs.sd;
      this.bs.sl = species.baseStats.spa;
    }
    this.w = species.weightkg;
    const canEvolve = !!species.evos?.some(s => exists(dex.getSpecies(s), dex.gen));
    if (canEvolve) this.canEvolve = canEvolve;
    if (species.gender === 'N' && dex.gen > 1) this.gender = species.gender;
    const formes = species.otherFormes?.filter(s => exists(dex.getSpecies(s), dex.gen));
    if (species.id.startsWith('aegislash')) {
      if (species.id === 'aegislashblade') {
        this.formes = ['Aegislash-Blade', 'Aegislash-Shield', 'Aegislash-Both'] as I.SpeciesName[];
      } else {
        this.isAlternateForme = true;
      }
    } else if (species.id === 'toxtricity') {
      this.formes = [
        'Toxtricity', 'Toxtricity-Gmax', 'Toxtricity-Low-Key', 'Toxtricity-Low-Key-Gmax'
      ] as I.SpeciesName[];
    } else if (species.id === 'toxtricitylowkey') {
      this.isAlternateForme = true;
    } else if (species.id === 'eternatus') {
      this.formes = ['Eternatus', 'Eternatus-Eternamax'] as I.SpeciesName[];
    } else if (formes && formes.length) {
      this.formes = [this.name, ...formes.map(s => dex.getSpecies(s).name as I.SpeciesName)].sort();
    } else if (species.baseSpecies !== this.name) {
      this.isAlternateForme = true;
    }
    const abilities = Object.values(species.abilities) as I.AbilityName[];
    if (dex.gen > 2) this.ab = abilities[0];
  }
}

// Custom Aegislash forme
function AegislashBoth(dex: D.Dex) {
  const shield = dex.getSpecies('aegislash')!;
  const blade = dex.getSpecies('aegislashblade')!;
  const baseStats = {
    hp: shield.baseStats.hp,
    atk: blade.baseStats.atk,
    def: shield.baseStats.def,
    spa: blade.baseStats.spa,
    spd: shield.baseStats.spd,
    spe: shield.baseStats.spe,
  };
  return new Specie({
    ...shield,
    baseStats,
    id: 'aegislashboth' as I.ID,
    name: 'Aegislash-Both',
  }, dex);
}

const DAMAGE_TAKEN = [1, 2, 0.5, 0] as I.TypeEffectiveness[];
const SPECIAL = ['Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Psychic', 'Dark', 'Dragon'];

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
      effectiveness: {},
    } as I.Type;

    this.byID = {};
    for (const t1 in this.dex.data.Types) {
      const id = toID(t1) as I.ID;
      const name = t1 as Exclude<TypeName, '???'>;
      const category =
        name === 'Fairy' ? undefined : SPECIAL.includes(name) ? 'Special' : 'Physical';

      const effectiveness = {'???': 1} as {[type in I.TypeName]: I.TypeEffectiveness};
      for (const t2 in this.dex.data.Types) {
        const t = t2 as Exclude<TypeName, '???'>;
        effectiveness[t] = DAMAGE_TAKEN[this.dex.data.Types[t].damageTaken[name]!];
      }
      (unknown.effectiveness as any)[name] = 1;

      this.byID[id] = {kind: 'Type', id, name, effectiveness, category};
    }
    this.byID[unknown.id] = unknown;
  }

  get(name: string) {
    // toID('???') => '', as do many other things, but returning the '???' type seems appropriate :)
    return this.byID[toID(name)];
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

  get(name: string) {
    const nature = this.dex.getNature(name)
    return exists(nature, this.dex.gen) ? new Nature(nature) : undefined;
  }

  *[Symbol.iterator]() {
    for (const id in this.dex.data.Natures) {
      const n = this.get(id);
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

    switch (nature.id) {
      case 'hardy':
        this.plus = 'atk';
        this.minus = 'atk';
        break;
      case 'docile':
        this.plus = 'def';
        this.minus = 'def';
        break;
      case 'bashful':
        this.plus = 'spa';
        this.minus = 'spa';
        break;
      case 'quirky':
        this.plus = 'spd';
        this.minus = 'spd';
        break;
      case 'serious':
        this.plus = 'spe';
        this.minus = 'spe';
        break;
      default:
        this.plus = nature.plus!;
        this.minus = nature.minus!;
    }
  }
}

const NATDEX_BANNED = [
  'Pikachu-Cosplay',
  'Pikachu-Rock-Star',
  'Pikachu-Belle',
  'Pikachu-Pop-Star',
  'Pikachu-PhD',
  'Pikachu-Libre',
  'Pichu-Spiky-eared',
  'Floette-Eternal',
  'Magearna-Original',
];

function exists(val: D.Ability| D.Item | D.Move | D.Species | D.Nature, gen: GenerationNum) {
  if (!val.exists || val.id === 'noability') return false;
  if (gen === 7 && val.isNonstandard === 'LGPE') return true;
  if (gen === 8 && val.isNonstandard === 'Past' && !NATDEX_BANNED.includes(val.name)) return true;
  if (gen === 8 && ['eternatuseternamax', 'slowpoke'].includes(val.id)) return true; // sigh
  if (val.isNonstandard && !['CAP', 'Unobtainable'].includes(val.isNonstandard!)) return false;
  return !('tier' in val && ['Illegal', 'Unreleased'].includes(val.tier!));
}
