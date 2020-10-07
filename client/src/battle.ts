import {Generations, Generation, ID, SideID, GameType, HPColor, PokemonSet, toID} from '@pkmn/data';
import {
  FormatName,
  Message,
  PokemonDetails,
  PokemonHealth,
  PokemonHPStatus,
  PokemonIdent,
  PokemonSearchID,
  Protocol,
  SpeciesName,
} from '@pkmn/protocol';

import {Field} from './field';
import {Handler} from './handler';
import {Side} from './side';
import {Pokemon} from './pokemon';

const SLOTS: { [slot: string]: number } = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5};
const NULL = {name: '', id: '' as const, kind: 'Condition' as const};

export class Battle {
  readonly gens: Generations;

  gen: Generation;

  readonly field: Field;
  readonly p1: Side;
  readonly p2: Side;
  readonly sides: [Side, Side];

  turn!: number;

  gameType: GameType;
  rated: boolean | Message;
  tier: FormatName | '';
  teamPreviewCount: number;
  speciesClause: boolean;

  kickingInactive: number | 'on-unknown' | 'off';
  totalTimeLeft: number;
  graceTimeLeft: number;

  lastMove!: ID | 'switch-in' | 'healing-wish';

  request?: Protocol.Request;

  private readonly handler: Handler;

  constructor(
    gens: Generations,
    player: ID | null = null,
    sets?: PokemonSet[] | [PokemonSet[] | undefined, PokemonSet[] | undefined],
    field = (b: Battle) => new Field(b),
    side = (b: Battle, n: 0 | 1 | 2 | 3, s?: PokemonSet[]) => new Side(b, n, s)
  ) {
    this.gens = gens;
    this.gen = gens.get(8);

    this.field = field(this);
    this.p1 = side(this, 0, sets
      ? !sets[0] || Array.isArray(sets[0]) ? sets[0] : sets as PokemonSet[]
      : undefined);
    this.p2 = side(this, 1, sets && Array.isArray(sets[1]) ? sets[1] : undefined);
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

    this.request = undefined;

    this.handler = new Handler(this, player);

    this.reset();
  }

  add(line: string): void;
  add(args: Protocol.ArgType, kwArgs: Protocol.BattleArgsKWArgType): void;
  add(a: Protocol.ArgType | string, b: Protocol.BattleArgsKWArgType = {}) {
    const {args, kwArgs} =
      typeof a === 'string' ? Protocol.parseBattleLine(a) : {args: a, kwArgs: b};
    const key = Protocol.key(args);
    if (key && key in this.handler) (this.handler as any)[key](args, kwArgs);
  }

  // Null-object pattern for data retrieval - the server is the source of
  // truth and if the client is out of date it should degrade gracefully
  get(type: 'abilities' | 'items' | 'moves' | 'species' | 'effects', s?: string) {
    return !s ? NULL : (this.gen[type].get(s) || {name: s, id: toID(s), kind: 'Condition'});
  }

  setTurn(turnNum: string | number) {
    turnNum = parseInt(turnNum as string);
    this.turn = turnNum;

    for (const side of this.sides) {
      for (const pokemon of side.active) {
        if (!pokemon) continue;
        pokemon.clearTurnstatuses();
        pokemon.moveThisTurn = '';
        pokemon.hurtThisTurn = false;
        pokemon.newlySwitched = false;
      }
      for (const id in side.sideConditions) {
        if (side.sideConditions[id].remove) side.removeSideCondition(id as ID);
      }
    }
  }

  upkeep() {
    for (const id in this.field.pseudoWeather) {
      const pw = this.field.pseudoWeather[id];
      if (pw.minDuration) pw.minDuration--;
      if (pw.maxDuration) pw.maxDuration--;
    }

    if (this.field.terrain) {
      const td = this.field.terrainData;
      if (td.minDuration) td.minDuration--;
      if (td.maxDuration) td.maxDuration--;
    }

    for (const side of this.sides) {
      for (const id in side.sideConditions) {
        const sc = side.sideConditions[id];
        if (sc.minDuration) sc.minDuration--;
        if (sc.maxDuration) sc.maxDuration--;
      }
      for (const poke of side.active) {
        if (poke?.status === 'tox') poke.statusData.toxicTurns++;
      }
    }
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
    return {name, siden, slot, pokemonid};
  }

  getOrAddPokemon(pokemonid: PokemonIdent | SideID, details: PokemonDetails, switched: boolean) {
    const {name, siden, slot, pokemonid: parsedPokemonid} =
      this.parsePokemonId(pokemonid as PokemonIdent);
    pokemonid = parsedPokemonid;

    const searchid = `${pokemonid}|${details}` as PokemonSearchID;
    const side = this.sides[siden];

    // search inactive revealed pokemon
    for (let i = 0; i < side.team.length; i++) {
      let pokemon = side.team[i];
      if (switched) {
        if (pokemon.fainted) continue;
        // already active, can't be switching in
        if (side.active.includes(pokemon)) continue;
        // just switched out, can't be switching in
        if (pokemon === side.lastPokemon && !side.active[slot]) continue;
      }
      if (pokemon.searchid === searchid) {
        // exact match
        if (slot >= 0) pokemon.slot = slot;
        return pokemon;
      }
      if (!pokemon.searchid && pokemon.checkDetails(details)) {
        // switch-in matches Team Preview entry
        pokemon = side.addPokemon(
          Protocol.parseDetails(name, pokemonid as PokemonIdent, details), i
        );
        if (slot >= 0) pokemon.slot = slot;
        return pokemon;
      }
    }

    // pokemon not found, create a new pokemon object for it
    const pokemon = side.addPokemon(
      Protocol.parseDetails(name, pokemonid as PokemonIdent, details)
    );
    if (slot >= 0) pokemon.slot = slot;
    return pokemon;
  }

  getSwitchedPokemon(pokemonid: PokemonIdent | SideID, details: PokemonDetails) {
    return this.getOrAddPokemon(pokemonid, details, true);
  }

  getSwitchedOutPokemon(pokemonid: PokemonIdent, details: PokemonDetails) {
    const poke = this.getSwitchedPokemon(pokemonid, details)!;
    return poke.side.active[poke.slot] || undefined;
  }

  rememberTeamPreviewPokemon(sideid: SideID, details: PokemonDetails) {
    const {siden} = this.parsePokemonId(sideid);
    return this.sides[siden].addPokemon(Protocol.parseDetails('', '' as PokemonIdent, details));
  }

  findCorrespondingPokemon(serverPokemon: {ident: PokemonIdent; details: PokemonDetails}) {
    const {siden} = this.parsePokemonId(serverPokemon.ident);
    const searchid = `${serverPokemon.ident}|${serverPokemon.details}` as PokemonSearchID;
    for (const pokemon of this.sides[siden].team) {
      if (pokemon.searchid === searchid) {
        return pokemon;
      }
    }
    return null;
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

  getPokemon(pokemonid?: '' | 'null' | PokemonIdent | SideID) {
    if (!pokemonid || pokemonid === '??' || pokemonid === 'null' || pokemonid === 'false') {
      return null;
    }
    const {siden, slot, pokemonid: parsedPokemonid} = this.parsePokemonId(pokemonid);
    pokemonid = parsedPokemonid;

    // if true, don't match an active pokemon
    const isInactive = (slot < 0);
    const side = this.sides[siden];

    // search player's pokemon
    if (!isInactive && side.active[slot]) return side.active[slot];

    for (const pokemon of side.team) {
      if (isInactive && side.active.includes(pokemon)) continue;
      if (pokemon.originalIdent === pokemonid) { // name matched, good enough
        if (slot >= 0) pokemon.slot = slot;
        return pokemon;
      }
    }

    return null;
  }

  checkActive(poke: Pokemon) {
    if (!poke.side.active[poke.slot]) {
      // SOMEONE jumped in in the middle of a replay. <_<
      poke.side.replace(poke);
    }
    return false;
  }

  pokemonAt(side: SideID, slot: number) {
    return this.getSide(side).active[slot]?.originalIdent || undefined;
  }

  damagePercentage(ident: PokemonIdent, hpstring: PokemonHPStatus) {
    const p = this.getPokemon(ident);
    if (!p) return undefined;

    const health: PokemonHealth = {
      hp: p.hp,
      maxhp: p.maxhp,
      hpcolor: p.hpcolor,
      status: p.status,
      fainted: p.fainted,
    };

    const damage = Pokemon.parseHealth(hpstring, health);
    if (!damage) return undefined;

    const range = Pokemon.getDamageRange(damage, health.hpcolor as HPColor);
    let percent = '' + Pokemon.getFormattedRange(range, damage[1] === 100 ? 0 : 1, '\u2013');
    if (damage[1] !== 100) {
      let hover = '' + ((damage[0] < 0) ? '\u2212' : '') + Math.abs(damage[0]) + '/' + damage[1];
      if (damage[1] === 48) hover += ' pixels'; // this is a hack
      percent = '||' + hover + '||' + percent + '||';
    }

    return percent;
  }

  getPokemonTypeList(ident: PokemonIdent) {
    const poke = this.getPokemon(ident)!;
    return poke.addedType ? poke.types.concat(poke.addedType) : poke.types;
  }

  getPokemonSpeciesForme(ident: PokemonIdent) {
    return this.getPokemon(ident)!.speciesForme as SpeciesName;
  }

  currentWeather() {
    return this.field.weatherData.id;
  }

  reset() {
    this.turn = 0;
    this.field.reset();
    this.lastMove = '';
  }

  destroy() {
    this.field.destroy();
    // @ts-ignore readonly
    this.field = null!;

    for (let i = 0; i < this.sides.length; i++) {
      if (this.sides[i]) this.sides[i].destroy();
      this.sides[i] = null!;
    }
    // @ts-ignore readonly
    this.p1 = null!;
    // @ts-ignore readonly
    this.p2 = null!;
  }
}
