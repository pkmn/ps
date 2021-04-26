import {ID, toID, SideCondition, PokemonSet} from '@pkmn/data';
import {AvatarIdent, DetailedPokemon, Username} from '@pkmn/protocol';

import {Battle} from './battle';
import {Pokemon} from './pokemon';

export class Side {
  readonly battle: Battle;
  readonly n: number;
  readonly sets?: PokemonSet[];
  id: ID;

  name: Username | '';
  avatar: AvatarIdent | 'unknown';
  foe!: Side;
  ally?: Side;
  rating: string;

  active: Array<Pokemon | null>;
  focus: number;
  lastPokemon: Pokemon | null;
  team: Pokemon[];
  totalPokemon: number;

  sideConditions: {
    [id: string]: {
      name: SideCondition;
      level: number;
      minDuration: number;
      maxDuration: number;
      remove?: boolean;
    };
  };

  wisher: Pokemon | null;

  private readonly provider: (s: Side, d: DetailedPokemon, p?: PokemonSet) => Pokemon;

  constructor(
    battle: Battle,
    n: 0 | 1 | 2 | 3,
    sets?: PokemonSet[],
    provider = (s: Side, d: DetailedPokemon, p?: PokemonSet) => new Pokemon(s, d, p)
  ) {
    this.provider = provider;

    this.battle = battle;
    this.n = n;
    this.sets = sets;
    this.id = '';

    this.name = '';
    this.avatar = 'unknown';
    this.rating = '';
    this.totalPokemon = 6;

    this.active = [null];
    this.focus = 0;
    this.lastPokemon = null;
    this.team = [];

    this.sideConditions = {};

    this.wisher = null;
  }

  get pokemon() {
    return this.active[this.focus] || undefined;
  }

  setAvatar(avatar: AvatarIdent) {
    this.avatar = avatar;
  }

  setName(name: Username, avatar?: AvatarIdent) {
    if (name) this.name = name;
    this.id = toID(this.name);
    if (avatar) this.setAvatar(avatar);
  }

  addSideCondition(effect: {name: string; id: ID}) {
    const id = effect.id;
    if (this.sideConditions[id]) {
      if (id === 'spikes' || id === 'toxicspikes') {
        this.sideConditions[id].level++;
      }
      return;
    }

    const name = effect.name as SideCondition;
    switch (id) {
    case 'tailwind':
      return (this.sideConditions[id] =
          {name, level: 1, minDuration: this.battle.gen.num >= 5 ? 4 : 3, maxDuration: 0});
    case 'reflect': case 'lightscreen':
      return (this.sideConditions[id] =
        {name, level: 1, minDuration: 5, maxDuration: this.battle.gen.num >= 4 ? 8 : 0});
    case 'auroraveil':
      return (this.sideConditions[id] = {name, level: 1, minDuration: 5, maxDuration: 8});
    case 'safeguard': case 'mist': case 'luckychant':
      return (this.sideConditions[id] = {name, level: 1, minDuration: 5, maxDuration: 0});
    case 'quickguard': case 'wideguard': case 'craftyshield': case 'matblock':
      return (this.sideConditions[id] =
        {name, level: 1, minDuration: 1, maxDuration: 1, remove: true});
    case 'gmaxwildfire': case 'gmaxvolcalith': case 'gmaxvinelash': case 'gmaxcannonade':
    case 'grasspledge': case 'waterpledge': case 'firepledge':
      return (this.sideConditions[id] = {name, level: 1, minDuration: 4, maxDuration: 0});
    default:
      return (this.sideConditions[id] = {name, level: 1, minDuration: 0, maxDuration: 0});
    }
  }

  removeSideCondition(condition: ID) {
    if (!this.sideConditions[condition]) return;
    delete this.sideConditions[condition];
  }

  addPokemon(details: DetailedPokemon, replaceSlot = -1) {
    const oldItem = replaceSlot ? this.team[replaceSlot]?.item : undefined;
    const set = replaceSlot
      ? this.team[replaceSlot]?.set
      : this.sets?.find(s => (s.name || s.species) === details.name);
    const poke = this.provider(this, details, set);
    if (oldItem) poke.item = oldItem;

    if (!poke.ability && poke.baseAbility) poke.ability = poke.baseAbility;
    poke.reset();

    if (replaceSlot >= 0) {
      this.team[replaceSlot] = poke;
    } else {
      this.team.push(poke);
    }
    if (this.team.length > this.totalPokemon || this.battle.speciesClause) {
      // check for Illusion
      const existingTable: { [searchid: string]: number } = {};
      let toRemove = -1;
      for (let poke1i = 0; poke1i < this.team.length; poke1i++) {
        const poke1 = this.team[poke1i];
        if (!poke1.searchid) continue;
        if (poke1.searchid in existingTable) {
          const poke2i = existingTable[poke1.searchid];
          const poke2 = this.team[poke2i];
          if (poke === poke1) {
            toRemove = poke2i;
          } else if (poke === poke2) {
            toRemove = poke1i;
          } else if (this.active.includes(poke1)) {
            toRemove = poke2i;
          } else if (this.active.includes(poke2)) {
            toRemove = poke1i;
          } else if (poke1.fainted && !poke2.fainted) {
            toRemove = poke2i;
          } else {
            toRemove = poke1i;
          }
          break;
        }
        existingTable[poke1.searchid] = poke1i;
      }
      if (toRemove >= 0) {
        if (this.team[toRemove].fainted) {
          // A fainted Pokemon was actually a Zoroark
          let illusionFound = null;
          for (const curPoke of this.team) {
            if (curPoke === poke) continue;
            if (curPoke.fainted) continue;
            if (this.active.includes(curPoke)) continue;
            if (['Zoroark', 'Zorua'].includes(curPoke.speciesForme) ||
              curPoke.ability === 'Illusion') {
              illusionFound = curPoke;
              break;
            }
          }
          if (!illusionFound) {
            // This is Hackmons; we'll just guess a random unfainted Pokemon.
            // This will keep the fainted Pokemon count correct, and will
            // eventually become correct as incorrect guesses are switched in
            // and reguessed.
            for (const curPoke of this.team) {
              if (curPoke === poke) continue;
              if (curPoke.fainted) continue;
              if (this.active.includes(curPoke)) continue;
              illusionFound = curPoke;
              break;
            }
          }
          if (illusionFound) {
            illusionFound.fainted = true;
            illusionFound.hp = 0;
            illusionFound.status = undefined;
          }
        }
        this.team.splice(toRemove, 1);
      }
    }
    return poke;
  }

  switchIn(pokemon: Pokemon, slot = pokemon.slot) {
    this.active[slot] = pokemon;
    pokemon.slot = slot;
    pokemon.clearVolatile();
    pokemon.lastMove = '';
    this.battle.lastMove = 'switch-in';
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    if (['batonpass', 'zbatonpass'].includes(this.lastPokemon?.lastMove!)) {
      pokemon.copyVolatileFrom(this.lastPokemon!);
    }
  }

  dragIn(pokemon: Pokemon, slot = pokemon.slot) {
    const oldpokemon = this.active[slot];
    if (oldpokemon === pokemon) return;

    this.lastPokemon = oldpokemon;
    if (oldpokemon) {
      oldpokemon.clearVolatile();
      oldpokemon.illusion = undefined;
      oldpokemon.revealedDetails = undefined;
    }

    pokemon.clearVolatile();
    pokemon.lastMove = '';
    this.battle.lastMove = 'switch-in';
    this.active[slot] = pokemon;
    pokemon.slot = slot;
  }

  replace(pokemon: Pokemon, slot = pokemon.slot) {
    const oldpokemon = this.active[slot];
    if (oldpokemon) {
      pokemon.illusion = undefined;
      pokemon.revealedDetails = pokemon.details;
    }
    if (pokemon === oldpokemon) return;

    this.lastPokemon = oldpokemon;
    pokemon.clearVolatile();
    if (oldpokemon) {
      pokemon.lastMove = oldpokemon.lastMove;
      pokemon.hp = oldpokemon.hp;
      pokemon.maxhp = oldpokemon.maxhp;
      pokemon.hpcolor = oldpokemon.hpcolor;
      pokemon.status = oldpokemon.status;
      pokemon.copyVolatileFrom(oldpokemon, 'illusion');
      pokemon.statusState = {...oldpokemon.statusState};
      // we don't know anything about the illusioned pokemon except that it's not fainted
      // technically we also know its status but only at the end of the turn, not here
      oldpokemon.fainted = false;
      oldpokemon.hp = oldpokemon.maxhp;
      oldpokemon.status = undefined; // '???';
    }

    this.active[slot] = pokemon;
    pokemon.slot = slot;
  }

  switchOut(pokemon: Pokemon, slot = pokemon.slot) {
    if (pokemon.lastMove !== 'batonpass' && pokemon.lastMove !== 'zbatonpass') {
      pokemon.clearVolatile();
    } else {
      pokemon.removeVolatile('transform' as ID);
      pokemon.removeVolatile('formechange' as ID);
    }

    pokemon.illusion = undefined;
    pokemon.revealedDetails = undefined;
    pokemon.beingCalledBack = true;
    pokemon.statusState.toxicTurns = 0;
    if (this.battle.gen.num === 5) pokemon.statusState.sleepTurns = 0;
    this.lastPokemon = pokemon;
    this.active[slot] = null;
  }

  swapTo(pokemon: Pokemon, slot: number) {
    if (pokemon.slot === slot) return;
    const target = this.active[slot];

    const oslot = pokemon.slot;

    pokemon.slot = slot;
    if (target) target.slot = oslot;

    this.active[slot] = pokemon;
    this.active[oslot] = target;
  }

  swapWith(pokemon: Pokemon, target: Pokemon) {
    // method provided for backwards compatibility only
    if (pokemon === target) return;

    const oslot = pokemon.slot;
    const nslot = target.slot;

    pokemon.slot = nslot;
    target.slot = oslot;
    this.active[nslot] = pokemon;
    this.active[oslot] = target;
  }

  faint(pokemon: Pokemon, slot = pokemon.slot) {
    pokemon.clearVolatile();
    this.lastPokemon = pokemon;
    pokemon.illusion = undefined;
    pokemon.revealedDetails = undefined;
    this.active[slot] = null;

    pokemon.fainted = true;
    pokemon.hp = 0;
  }

  clearPokemon() {
    for (const pokemon of this.team) pokemon.destroy();
    this.team = [];
    for (let i = 0; i < this.active.length; i++) this.active[i] = null;
    this.lastPokemon = null;
  }

  reset() {
    this.clearPokemon();
    this.sideConditions = {};
  }

  destroy() {
    this.clearPokemon();
    // @ts-ignore readonly
    this.battle = null!;
    this.foe = null!;
  }
}
