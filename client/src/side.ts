import {ID, toID, SideID} from '@pkmn/sim';
import {Avatar, PokemonDetails, Username} from '@pkmn/protocol';
import {SideCondition} from '@pkmn/types';

import {Battle} from './battle';
import {Pokemon, Effect} from './pokemon';

export class Side {
  // maxTeamSize: number;
  // team: PokemonSet[];

  // pokemonLeft: number;
  // faintedLastTurn: boolean;
  // faintedThisTurn: boolean;
  // zMoveUsed: boolean;

  // activeRequest: AnyObject | null;
  // choice: Choice;

  // lastMove: Move | null;

  readonly battle: Battle;
  readonly n: number;
  id: SideID;

  name: Username | '';
  avatar: Avatar | 'unknown';
  foe!: Side;

  rating: string;
  totalPokemon: number;
  missedPokemon: Pokemon;

  active: Array<Pokemon | null>;
  lastPokemon: Pokemon | null;
  pokemon: Pokemon[];

  // [effectName, levels, minDuration, maxDuration]
  sideConditions: { [id: string]: [SideCondition, number, number, number] };

  wisher: Pokemon | null;

  private readonly provider: (s: Side, d: PokemonDetails) => Pokemon;

  constructor(
    battle: Battle,
    n: number,
    provider = (s: Side, d: PokemonDetails) => new Pokemon(s, d)
  ) {
    this.provider = provider;

    this.battle = battle;
    this.n = n;
    this.id = ['p1', 'p2', 'p3', 'p4'][n] as SideID;

    this.name = '';
    this.avatar = 'unknown';
    this.rating = '';
    this.totalPokemon = 6;
    this.missedPokemon = null!;

    this.active = [null];
    this.lastPokemon = null;
    this.pokemon = [];

    this.sideConditions = {};

    this.wisher = null;
  }

  clearPokemon() {
    for (const pokemon of this.pokemon) pokemon.destroy();
    this.pokemon = [];
    for (let i = 0; i < this.active.length; i++) this.active[i] = null;
    this.lastPokemon = null;
  }

  reset() {
    this.clearPokemon();
    this.sideConditions = {};
  }

  setAvatar(avatar: Avatar) {
    this.avatar = avatar;
  }

  setName(name: Username, avatar?: Avatar) {
    if (name) this.name = name;
    this.id = toID(this.name) as SideID;
    if (avatar) this.setAvatar(avatar);
  }

  addSideCondition(effect: Effect) {
    const id = effect.id;
    if (this.sideConditions[id]) {
      if (id === 'spikes' || id === 'toxicspikes') {
        this.sideConditions[id][1]++;
      }
      return;
    }

    // Side conditions work as: [effectName, levels, minDuration, maxDuration]
    const condition = effect.name as SideCondition;
    switch (id) {
    case 'tailwind':
      return (this.sideConditions[condition] = [condition, 1, this.battle.gen >= 5 ? 4 : 3, 0]);
    case 'reflect':
      return (this.sideConditions[condition] = [condition, 1, 5, this.battle.gen >= 4 ? 8 : 0]);
    case 'lightscreen':
      return (this.sideConditions[condition] = [condition, 1, 5, this.battle.gen >= 4 ? 8 : 0]);
    case 'auroraveil': return (this.sideConditions[condition] = [condition, 1, 5, 8]);
    case 'safeguard': return (this.sideConditions[condition] = [condition, 1, 5, 0]);
    case 'mist': return (this.sideConditions[condition] = [condition, 1, 5, 0]);
    case 'luckychant': return (this.sideConditions[condition] = [condition, 1, 5, 0]);
    case 'stealthrock': return (this.sideConditions[condition] = [condition, 1, 0, 0]);
    case 'spikes': return (this.sideConditions[condition] = [condition, 1, 0, 0]);
    case 'toxicspikes': return (this.sideConditions[condition] = [condition, 1, 0, 0]);
    case 'stickyweb': return (this.sideConditions[condition] = [condition, 1, 0, 0]);
    default: return (this.sideConditions[condition] = [condition, 1, 0, 0]);
    }
  }

  removeSideCondition(condition: string) {
    const id = toID(condition);
    if (!this.sideConditions[id]) return;
    delete this.sideConditions[id];
  }

  addPokemon(details: PokemonDetails, replaceSlot = -1) {
    const poke = this.provider(this, details);
    if (!poke.ability && poke.baseAbility) poke.ability = poke.baseAbility;
    poke.reset();

    if (replaceSlot >= 0) {
      this.pokemon[replaceSlot] = poke;
    } else {
      this.pokemon.push(poke);
    }
    if (this.pokemon.length > this.totalPokemon || this.battle.speciesClause) {
      // check for Illusion
      const existingTable: { [searchid: string]: number } = {};
      let toRemove = -1;
      for (let poke1i = 0; poke1i < this.pokemon.length; poke1i++) {
        const poke1 = this.pokemon[poke1i];
        if (!poke1.searchid) continue;
        if (poke1.searchid in existingTable) {
          const poke2i = existingTable[poke1.searchid];
          const poke2 = this.pokemon[poke2i];
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
        if (this.pokemon[toRemove].fainted) {
          // A fainted Pokemon was actually a Zoroark
          let illusionFound = null;
          for (const curPoke of this.pokemon) {
            if (curPoke === poke) continue;
            if (curPoke.fainted) continue;
            if (this.active.includes(curPoke)) continue;
            if (['Zoroark', 'Zorua'].includes(curPoke.species) || curPoke.ability === 'Illusion') {
              illusionFound = curPoke;
              break;
            }
          }
          if (!illusionFound) {
            // This is Hackmons; we'll just guess a random unfainted Pokemon.
            // This will keep the fainted Pokemon count correct, and will
            // eventually become correct as incorrect guesses are switched in
            // and reguessed.
            for (const curPoke of this.pokemon) {
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
            illusionFound.status = '';
          }
        }
        this.pokemon.splice(toRemove, 1);
      }
    }
    return poke;
  }

  switchIn(pokemon: Pokemon, slot?: number) {
    if (slot === undefined) slot = pokemon.slot;
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
    if (oldpokemon) oldpokemon.clearVolatile();

    pokemon.clearVolatile();
    pokemon.lastMove = '';
    this.battle.lastMove = 'switch-in';
    this.active[slot] = pokemon;
    pokemon.slot = slot;
  }

  replace(pokemon: Pokemon, slot = pokemon.slot) {
    const oldpokemon = this.active[slot];
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
      pokemon.statusData = {...oldpokemon.statusData};
      // we don't know anything about the illusioned pokemon except that it's not fainted
      // technically we also know its status but only at the end of the turn, not here
      oldpokemon.fainted = false;
      oldpokemon.hp = oldpokemon.maxhp;
      oldpokemon.status = '???';
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

    pokemon.statusData.toxicTurns = 0;
    if (this.battle.gen === 5) pokemon.statusData.sleepTurns = 0;
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
    this.active[slot] = null;

    pokemon.fainted = true;
    pokemon.hp = 0;
  }

  destroy() {
    this.clearPokemon();
    // @ts-ignore readonly
    this.battle = null!;
    this.foe = null!;
  }
}
