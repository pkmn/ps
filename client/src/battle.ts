import { Dex, ModdedDex, ID, toID, Move, SideID } from '@pkmn/sim';
import { Protocol, Protocol as P, KWArgs, Message, PokemonHealth, PokemonIdent, PokemonSearchID } from '@pkmn/protocol';
import { As, Weather, GenerationNum, GameType } from '@pkmn/types';

import { Side, Effect } from './side';
import { Pokemon, ServerPokemon } from './pokemon';

export type WeatherState<T = Weather> = [T, number, number];
export type PseudoWeather = string & As<'PseudoWeather'>;

// interface FaintedPokemon {
//  target: Pokemon;
//  source: Pokemon | null;
//  effect: Effect | null;
// }

const SLOTS: { [slot: string]: number } = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 };

export class Battle {
  // readonly strictChoices: boolean;
  // readonly formatid: ps.ID;
  // readonly formatData: AnyObject;
  // readonly prngSeed: PRNGSeed;
  // rated: boolean | string;
  // reportExactHP: boolean;
  // reportPercentages: boolean;
  // supportCancel: boolean;

  // queue: BattleQueue;
  // readonly faintQueue: FaintedPokemon[];

  // readonly log: string[];
  // readonly inputLog: string[];
  // readonly messageLog: string[];
  // sentLogPos: number;
  // sentEnd: boolean;

  // requestState: RequestState;
  // turn: number;
  // midTurn: boolean;
  // started: boolean;
  // ended: boolean;
  // winner?: string;

  // effect: Effect;
  // effectData: AnyObject;

  // event: AnyObject;
  // events: AnyObject | null;
  // eventDepth: number;

  // activeMove: ActiveMove | null;
  // activePokemon: Pokemon | null;
  // activeTarget: Pokemon | null;

  // lastMove: Move | null;
  // lastMoveThisTurn: Move | null;
  // lastMoveLine: number;
  // lastDamage: number;
  // abilityOrder: number;

  // readonly hints: Set<string>;

  dex: ModdedDex;
  gen: GenerationNum;

  p1: Side;
  p2: Side;
  sides: [Side, Side];

  turn!: number;

  gameType: GameType;
  rated: boolean | Message;
  tier: string;
  teamPreviewCount: number
  speciesClause: boolean;

  kickingInactive: number | 'on-unknown' | 'off';
  totalTimeLeft: number;
  graceTimeLeft: number;

  weather!: ID;
  pseudoWeather!: WeatherState<PseudoWeather>[];
  weatherTimeLeft!: number;
  weatherMinTimeLeft!: number;

  lastMove!: ID | 'switch-in';

  constructor(provider = (b: Battle, n: number) => new Side(b, n)) {
    this.dex = Dex;
    this.gen = 8;

    this.p1 = provider(this, 0);
    this.p2 = provider(this, 1);
    this.p1.foe = this.p2;
    this.p2.foe = this.p1;
    this.sides = [this.p1, this.p2];

    this.gameType = 'singles';
    this.rated = false;
    this.tier = '';
    this.teamPreviewCount = 0;
    this.speciesClause = false;

    this.kickingInactive = 'off';
    this.totalTimeLeft = 0;
    this.graceTimeLeft = 0;

    this.reset();
  }

  reset() {
    this.turn = 0;
    this.weather = '' as ID;
    this.weatherTimeLeft = 0;
    this.weatherMinTimeLeft = 0;
    this.pseudoWeather = [];
    this.lastMove = '';
  }

  removePseudoWeather(weather: string) {
    for (let i = 0; i < this.pseudoWeather.length; i++) {
      if (this.pseudoWeather[i][0] === weather) {
        this.pseudoWeather.splice(i, 1);
        return;
      }
    }
  }

  addPseudoWeather(weather: PseudoWeather, minTimeLeft: number, timeLeft: number) {
    this.pseudoWeather.push([weather, minTimeLeft, timeLeft]);
  }

  hasPseudoWeather(weather: string) {
    for (const [pseudoWeatherName] of this.pseudoWeather) {
      if (weather === pseudoWeatherName) {
        return true;
      }
    }
    return false;
  }

  setTurn(turnNum: string | number) {
    turnNum = parseInt(turnNum as string, 10);
    this.turn = turnNum;

    if (this.p1.active[0]) this.p1.active[0]!.clearTurnstatuses();
    if (this.p1.active[1]) this.p1.active[1]!.clearTurnstatuses();
    if (this.p1.active[2]) this.p1.active[2]!.clearTurnstatuses();
    if (this.p2.active[0]) this.p2.active[0]!.clearTurnstatuses();
    if (this.p2.active[1]) this.p2.active[1]!.clearTurnstatuses();
    if (this.p2.active[2]) this.p2.active[2]!.clearTurnstatuses();
  }

  updateToxicTurns() {
    for (const side of this.sides) {
      for (const poke of side.active) {
        if (poke?.status === 'tox') poke.statusData.toxicTurns++;
      }
    }
  }

  changeWeather(weatherName: Weather, poke?: Pokemon, isUpkeep?: boolean, ability?: Effect) {
    let weather = toID(weatherName);
    if (!weather || weather === 'none') {
      weather = '' as ID;
    }
    if (isUpkeep) {
      if (this.weather && this.weatherTimeLeft) {
        this.weatherTimeLeft--;
        if (this.weatherMinTimeLeft !== 0) this.weatherMinTimeLeft--;
      }
      return;
    }
    if (weather) {
      const isExtremeWeather = ['deltastream', 'desolateland', 'primordialsea'].includes(weather);
      if (poke) {
        if (ability) this.activateAbility(poke, ability.name);
        this.weatherTimeLeft = (this.dex.gen <= 5 || isExtremeWeather) ? 0 : 8;
        this.weatherMinTimeLeft = (this.dex.gen <= 5 || isExtremeWeather) ? 0 : 5;
      } else if (isExtremeWeather) {
        this.weatherTimeLeft = 0;
        this.weatherMinTimeLeft = 0;
      } else {
        this.weatherTimeLeft = (this.dex.gen <= 3 ? 5 : 8);
        this.weatherMinTimeLeft = (this.dex.gen <= 3 ? 0 : 5);
      }
    }
    this.weather = weather;
  }

  updatePseudoWeatherLeft() {
    for (const pWeather of this.pseudoWeather) {
      if (pWeather[1]) pWeather[1]--;
      if (pWeather[2]) pWeather[2]--;
    }
    for (const side of this.sides) {
      for (const id in side.sideConditions) {
        const cond = side.sideConditions[id];
        if (cond[2]) cond[2]--;
        if (cond[3]) cond[3]--;
      }
    }
  }

  useMove(pokemon: Pokemon, move: Move, target: Pokemon | null, kwArgs: KWArgs['|move|']) {
    const fromeffect = Dex.getEffect(kwArgs.from);
    this.activateAbility(pokemon, fromeffect);
    pokemon.clearMovestatuses();
    if (move.id === 'focuspunch') {
      pokemon.removeTurnstatus('focuspunch' as ID);
    }
    if (fromeffect.id === 'sleeptalk') {
      pokemon.rememberMove(move.name, 0);
    } else if (!fromeffect.id || fromeffect.id === 'pursuit') {
      let moveName = move.name;
      if (move.isZ) {
        pokemon.item = move.isZ;
        let item = Dex.getItem(move.isZ);
        if (item.zMoveFrom) moveName = item.zMoveFrom;
      } else if (move.name.slice(0, 2) === 'Z-') {
        moveName = moveName.slice(2);
        move = Dex.getMove(moveName);
        if (window.BattleItems) {
          for (let item in BattleItems) {
            if (BattleItems[item].zMoveType === move.type) pokemon.item = item;
          }
        }
      }
      let pp = 1;
      if (move.target === "all") {
        for (const active of pokemon.side.foe.active) {
          if (active && toID(active.ability) === 'pressure') {
            pp += 1;
          }
        }
      } else if (target && target.side !== pokemon.side && toID(target.ability) === 'pressure') {
        pp += 1;
      }
      pokemon.rememberMove(moveName, pp);
    }
    pokemon.lastMove = move.id;
    this.lastMove = move.id;
    if (move.id === 'wish' || move.id === 'healingwish') {
      pokemon.side.wisher = pokemon;
    }
  }

  cantUseMove(pokemon: Pokemon, effect: Effect, move: Move) {
    pokemon.clearMovestatuses();
    this.activateAbility(pokemon, effect);
    if (move.id) pokemon.rememberMove(move.name, 0);
    switch (effect.id) {
      case 'slp': return void pokemon.statusData.sleepTurns++;
      case 'focuspunch': return pokemon.removeTurnstatus('focuspunch' as ID);
      case 'shelltrap': return pokemon.removeTurnstatus('shelltrap' as ID);
      case 'flinch': return pokemon.removeTurnstatus('focuspunch' as ID);
    }
  }

  activateAbility(pokemon: Pokemon | null, effectOrName: Effect | string, isNotBase?: boolean) {
    if (!pokemon || !effectOrName) return;
    if (typeof effectOrName !== 'string') {
      if (effectOrName.effectType !== 'Ability') return;
      effectOrName = effectOrName.name;
    }
    pokemon.rememberAbility(effectOrName, isNotBase);
  }

  parsePokemonId(pokemonid: PokemonIdent | SideID) {
    let name: string = pokemonid;

    let siden = -1;
    let slot = -1; // if there is an explicit slot for this pokemon
    if (name.substr(0, 4) === 'p2: ' || name === 'p2') {
      siden = this.p2.n;
      name = name.substr(4);
    } else if (name.substr(0, 4) === 'p1: ' || name === 'p1') {
      siden = this.p1.n;
      name = name.substr(4);
    } else if (name.substr(0, 2) === 'p2' && name.substr(3, 2) === ': ') {
      slot = SLOTS[name.substr(2, 1)];
      siden = this.p2.n;
      name = name.substr(5);
      pokemonid = 'p2: ' + name as PokemonIdent;
    } else if (name.substr(0, 2) === 'p1' && name.substr(3, 2) === ': ') {
      slot = SLOTS[name.substr(2, 1)];
      siden = this.p1.n;
      name = name.substr(5);
      pokemonid = 'p1: ' + name as PokemonIdent;
    }
    return { name, siden, slot, pokemonid };
  }

  getSwitchedPokemon(pokemonid: string, details: P.PokemonDetails) {
    if (pokemonid === '??') throw new Error(`pokemonid not passed`);
    const {name, siden, slot, pokemonid: parsedPokemonid} =
      this.parsePokemonId(pokemonid as PokemonIdent);
    pokemonid = parsedPokemonid;

    const searchid = `${pokemonid}|${details}` as PokemonSearchID;
    const side = this.sides[siden];

    // search inactive revealed pokemon
    for (let i = 0; i < side.pokemon.length; i++) {
      let pokemon = side.pokemon[i];
      if (pokemon.fainted) continue;
      // already active, can't be switching in
      if (side.active.includes(pokemon)) continue;
      // just switched out, can't be switching in
      if (pokemon === side.lastPokemon && !side.active[slot]) continue;

      if (pokemon.searchid === searchid) {
        // exact match
        if (slot >= 0) pokemon.slot = slot;
        return pokemon;
      }
      if (!pokemon.searchid && pokemon.checkDetails(details)) {
        // switch-in matches Team Preview entry
        pokemon = side.addPokemon(
          Protocol.parseDetails(name, pokemonid as PokemonIdent, details), i);
        if (slot >= 0) pokemon.slot = slot;
        return pokemon;
      }
    }

    // pokemon not found, create a new pokemon object for it
    const pokemon = side.addPokemon(
      Protocol.parseDetails(name, pokemonid  as PokemonIdent, details));
    if (slot >= 0) pokemon.slot = slot;
    return pokemon;
  }

  rememberTeamPreviewPokemon(sideid: SideID, details: P.PokemonDetails) {
    const {siden} = this.parsePokemonId(sideid);
    return this.sides[siden].addPokemon(Protocol.parseDetails('', '' as PokemonIdent, details));
  }

  findCorrespondingPokemon(serverPokemon: {ident: PokemonIdent, details: P.PokemonDetails}) {
    const { siden } = this.parsePokemonId(serverPokemon.ident);
    const searchid = `${serverPokemon.ident}|${serverPokemon.details}` as PokemonSearchID;
    for (const pokemon of this.sides[siden].pokemon) {
      if (pokemon.searchid === searchid) {
        return pokemon;
      }
    }
    return null;
  }

  getPokemon(pokemonid: string, details?: P.PokemonDetails) {
    let isNew = false; // if true, don't match any pokemon that already exists (for Team Preview)
    let isSwitch = false; // if true, don't match an active, fainted, or just switched-out Pokemon
    let isInactive = false; // if true, don't match an active Pokemon
    let createIfNotFound = false; // if true, create the pokemon if a match wasn't found

    if (pokemonid === undefined || pokemonid === '??') return null;
    if (pokemonid.substr(0, 5) === 'new: ') {
      pokemonid = pokemonid.substr(5);
      isNew = true;
      createIfNotFound = true; // obviously
    }
    if (pokemonid.substr(0, 10) === 'switchin: ') {
      pokemonid = pokemonid.substr(10);
      isSwitch = true;
      createIfNotFound = true;
    }
    let parseIdResult = this.parsePokemonId(pokemonid as PokemonIdent);
    let { name, siden, slot } = parseIdResult;
    pokemonid = parseIdResult.pokemonid;

    if (!details) {
      if (siden < 0) return null;
      if (this.sides[siden].active[slot]) return this.sides[siden].active[slot];
      if (slot >= 0) isInactive = true;
    }

    let searchid = '';
    if (details) searchid = pokemonid + '|' + details;

    // search p1's pokemon
    if (siden !== this.p2.n && !isNew) {
      const active = this.p1.active[slot];
      if (active?.searchid === searchid && !isSwitch) {
        active.slot = slot;
        return active;
      }
      for (let i = 0; i < this.p1.pokemon.length; i++) {
        let pokemon = this.p1.pokemon[i];
        if (pokemon.fainted && (isNew || isSwitch)) continue;
        if (isSwitch || isInactive) {
          if (this.p1.active.indexOf(pokemon) >= 0) continue;
        }
        if (isSwitch && pokemon === this.p1.lastPokemon && !this.p1.active[slot]) continue;
        if ((searchid && pokemon.searchid === searchid) || // exact match
          (!searchid && pokemon.ident === pokemonid)) { // name matched, good enough
          if (slot >= 0) pokemon.slot = slot;
          return pokemon;
        }
        // switch-in matches Team Preview entry
        if (!pokemon.searchid && pokemon.checkDetails(details)) {
          pokemon = this.p1.addPokemon(
            Protocol.parseDetails(
              name, pokemonid as PokemonIdent, details, { item: pokemon.item } as any),
            i);
          if (slot >= 0) pokemon.slot = slot;
          return pokemon;
        }
      }
    }

    // search p2's pokemon
    if (siden !== this.p1.n && !isNew) {
      const active = this.p2.active[slot];
      if (active?.searchid === searchid && !isSwitch) {
        if (slot >= 0) active.slot = slot;
        return active;
      }
      for (let i = 0; i < this.p2.pokemon.length; i++) {
        let pokemon = this.p2.pokemon[i];
        if (pokemon.fainted && (isNew || isSwitch)) continue;
        if (isSwitch || isInactive) {
          if (this.p2.active.indexOf(pokemon) >= 0) continue;
        }
        if (isSwitch && pokemon === this.p2.lastPokemon && !this.p2.active[slot]) continue;
        if ((searchid && pokemon.searchid === searchid) || // exact match
          (!searchid && pokemon.ident === pokemonid)) { // name matched, good enough
          if (slot >= 0) pokemon.slot = slot;
          return pokemon;
        }
        // switch-in matches Team Preview entry
        if (!pokemon.searchid && pokemon.checkDetails(details)) {
          pokemon = this.p2.addPokemon(
            Protocol.parseDetails(
              name, pokemonid as PokemonIdent, details, { item: pokemon.item } as any),
            i);
          if (slot >= 0) pokemon.slot = slot;
          return pokemon;
        }
      }
    }

    if (!details || !createIfNotFound) return null;

    // pokemon not found, create a new pokemon object for it
    if (siden < 0) throw new Error("Invalid pokemonid passed to getPokemon");

    let species = name;
    let gender = '';
    let level = 100;
    let shiny = false;
    if (details) {
      let splitDetails = details.split(', ');
      if (splitDetails[splitDetails.length - 1] === 'shiny') {
        shiny = true;
        splitDetails.pop();
      }
      if (splitDetails[splitDetails.length - 1] === 'M' || splitDetails[splitDetails.length - 1] === 'F') {
        gender = splitDetails[splitDetails.length - 1];
        splitDetails.pop();
      }
      if (splitDetails[1]) {
        level = parseInt(splitDetails[1].substr(1), 10) || 100;
      }
      if (splitDetails[0]) {
        species = splitDetails[0];
      }
    }
    if (slot < 0) slot = 0;
    let pokemon = this.sides[siden].addPokemon({
      species,
      details,
      name,
      ident: (name ? pokemonid : ''),
      searchid: (name ? (pokemonid + '|' + details) : ''),
      level,
      gender,
      shiny,
      slot,
    }, isNew ? -2 : -1);
    return pokemon;
  }

  getSide(sidename: string): Side {
    if (sidename === 'p1' || sidename.substr(0, 3) === 'p1:') return this.p1;
    if (sidename === 'p2' || sidename.substr(0, 3) === 'p2:') return this.p2;
    if (this.p1.id === sidename) return this.p1;
    if (this.p2.id === sidename) return this.p2;
    if (this.p1.name === sidename) return this.p1;
    if (this.p2.name === sidename) return this.p2;
    return {
      name: sidename,
      id: sidename.replace(/ /g, ''),
    } as any;
  }

  destroy() {
    for (let i = 0; i < this.sides.length; i++) {
      if (this.sides[i]) this.sides[i].destroy();
      this.sides[i] = null!;
    }
    this.p1 = null!;
    this.p2 = null!;
  }
}