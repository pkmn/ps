import {Generations, Generation, ID, SideID, GameType, HPColor, PokemonSet, toID} from '@pkmn/data';
import {
  ArgType,
  BattleArgsKWArgType,
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
  requestStatus: 'inapplicable' | 'received' | 'applicable' | 'applied';

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
    this.requestStatus = 'inapplicable';

    this.handler = new Handler(this, player);

    this.reset();
  }

  add(line: string): void;
  add(args: ArgType, kwArgs: BattleArgsKWArgType): void;
  add(a: ArgType | string, b: BattleArgsKWArgType = {}) {
    const {args, kwArgs} =
      typeof a === 'string' ? Protocol.parseBattleLine(a) : {args: a, kwArgs: b};
    const key = Protocol.key(args);
    if (key && key in this.handler) (this.handler as any)[key](args, kwArgs);
  }

  update() {
    if (this.requestStatus === 'received') {
      this.requestStatus = 'applicable';
      return;
    }
    if (this.requestStatus !== 'applicable' || !this.request) return;
    const request = this.request;

    if (request.side) {
      const side = this.getSide(request.side.id);
      // // DEBUG
      // console.log('BEFORE',
      //   side.team.map(p => p.illusion ? `${p.illusion.searchid} (${p.searchid})` : p.searchid),
      //   side.active.map(p => p && (p.illusion ? `${p.illusion.searchid} (${p.searchid})` : p.searchid)));
      // console.log('REQUEST', request.side.pokemon.map(p => p.active ? `*${p.searchid}` : p.searchid));

      const team = side.team;
      side.team = [];
      const active = side.active;
      side.active = [];

      const searchids: {[searchid: string]: Pokemon} = {};
      const illusions: [Pokemon, PokemonSearchID][] = [];

      let slot = 0;
      for (const [i, p] of request.side.pokemon.entries()) {
        let poke: Pokemon | undefined = undefined;

        const searchid = `${this.parsePokemonId(p.ident).pokemonid}|${p.details}`;
        for (let j = 0; j < team.length; j++) {
          if ((team[j].searchid === searchid) ||
              (team[j].searchid && team[j].checkDetails(p.details))) {
            poke = team[j];
            break;
          }
        }

        const illusion = (p.active && !p.fainted && p.ability === 'illusion')
          ? this.findIllusion(request.side, p, i)
          : undefined;

        if (poke) {
          side.team.push(poke);
        } else {
          // If Illusion had already broken we would have found it in our initial search above
          if (illusion) {
            const illusionDetails = illusion.speciesForme +
              (p.level === 100 ? '' : ', L' + p.level) +
              (illusion.gender === 'N' ? '' : ', ' + illusion.gender) +
              (illusion.shiny ? ', shiny' : '');
            for (let j = 0; j < active.length; j++) {
              if (active[j]?.details === illusionDetails) {
                poke = active[j]!;
                break;
              }
            }
          }
          if (!poke) poke = side.addPokemon(p);
        }

        searchids[poke.searchid] = poke;
        if (illusion && poke.illusion !== null) illusions.push([poke, illusion.searchid]);

        if (p.active && request.requestType !== 'team') {
          if (p.fainted) {
            side.active.push(null);
          } else {
           side.active.push(poke);
           poke.slot = slot;
          }
          slot++;
        }

        poke.healthParse(p.condition);
        poke.stats = {hp: poke.baseMaxhp, ...p.stats};

        poke.ability = p.ability;
        poke.baseAbility = p.baseAbility;
        poke.item = p.item;

        // If we have a move request we handle setting full move slots for the active Pokemon below
        if (!(request.requestType === 'move' && p.active)) {
          for (const move of p.moves) {
            poke.rememberMove(move, 0);
          }
        }
      }

      for (const [poke, illusion] of illusions) {
        poke.illusion = searchids[illusion];
      }

      // DEBUG
      // console.log('AFTER',
      //   side.team.map(p => p.illusion ? `${p.illusion.searchid} (${p.searchid})` : p.searchid),
      //   side.active.map(p => p && (p.illusion ? `${p.illusion.searchid} (${p.searchid})` : p.searchid)));

      if (request.requestType === 'move') {
        for (const [slot, active] of request.active.entries()) {
          if (!active) continue;
          const poke = side.active[slot]!;
          const mpoke = poke.volatiles.transform?.pokemon || poke;
          mpoke.moveSlots = [];
          for (const move of active.moves) {
            if (move.id === 'struggle') continue;
            mpoke.moveSlots.push({ppUsed: move.maxpp - move.pp, ...move});
          }
          poke.maxMoves = active.maxMoves;
          poke.canDynamax = active.canDynamax;
          poke.canGigantamax = active.canGigantamax;
          poke.canMegaEvo = active.canMegaEvo;
          poke.canUltraBurst = active.canUltraBurst;
          poke.trapped = active.trapped;
          poke.maybeTrapped = active.maybeTrapped;
          poke.maybeDisabled = active.maybeDisabled;
        }
      }
    }


    this.requestStatus = 'applied';
  }

  findIllusion(
    side: Protocol.Request.SideInfo,
    pokemon: Protocol.Request.Pokemon,
    position: number
  ) {
    let i: number;
    for (i = side.pokemon.length - 1; i > position; i--) {
      if (!side.pokemon[i]) continue;
      if (!side.pokemon[i].fainted) break;
    }
    if (!side.pokemon[i]) return undefined;
    if (pokemon === side.pokemon[i]) return undefined;
    return side.pokemon[i];
  }

  // Null object pattern for data retrieval - the server is the source of
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

  getSwitchedPokemon(pokemonid: PokemonIdent | SideID, details: PokemonDetails, replace = false) {
    let [pokemon, parsed] = this.findSwitchedPokemon(pokemonid, details, replace);
    if (pokemon) return pokemon;

    // pokemon not found, create a new pokemon object for it
    const {siden, name, slot} = parsed;
    pokemon = this.sides[siden].addPokemon(
      Protocol.parseDetails(name, pokemonid as PokemonIdent, details)
    );
    if (slot >= 0) pokemon.slot = slot;
    return pokemon;
  }

  getSwitchedOutPokemon(pokemonid: PokemonIdent, details: PokemonDetails) {
    const poke = this.findSwitchedPokemon(pokemonid, details)[0];
    return poke ? poke.side.active[poke.slot] : undefined;
  }

  private findSwitchedPokemon(
    pokemonid: PokemonIdent | SideID, details: PokemonDetails, replace = false
  ): [Pokemon | undefined, ReturnType<Battle['parsePokemonId']>] {
    const parsed = this.parsePokemonId(pokemonid as PokemonIdent);
    const {name, siden, slot, pokemonid: parsedPokemonid} = parsed;
    pokemonid = parsedPokemonid;

    const searchid = `${pokemonid}|${details}` as PokemonSearchID;
    const side = this.sides[siden];

    // search inactive revealed pokemon
    const illusions = [];
    for (let i = 0; i < side.team.length; i++) {
      let pokemon = side.team[i];
      if (pokemon.fainted) continue;
      if (replace && pokemon.illusion && pokemon.searchid === searchid) {
        if (slot >= 0) pokemon.slot = slot;
        return [pokemon, parsed];
      }
      // already active, can't be switching in
      if (side.active.includes(pokemon)) continue;
      // just switched out, can't be switching in
      if (pokemon === side.lastPokemon && !side.active[slot]) continue;

      if (pokemon.searchid === searchid) {
        // exact match
        if (slot >= 0) pokemon.slot = slot;
        return [pokemon, parsed];
      }
      if (!pokemon.searchid && pokemon.checkDetails(details)) {
        // switch-in matches Team Preview entry
        pokemon = side.addPokemon(
          Protocol.parseDetails(name, pokemonid as PokemonIdent, details), i
        );
        if (slot >= 0) pokemon.slot = slot;
        return [pokemon, parsed];
      }

      if (pokemon.ability === 'illusion') {
        illusions.push(pokemon);
      }
    }

    if (!illusions.length) return [undefined, parsed];

    // If any Pokemon has Illusion, try to find the first eligible Pokemon an Illusion Pokemon
    // could be posing as. In the event that there are multiple potential matches this may return
    // the wrong Pokemon, but there's no way to disambiguate
    details = details.replace(/, L\d{0,3}/, '') as PokemonDetails;
    for (const illusion of illusions) {
      for (let i = side.team.length - 1; i >= 0; i--) {
        const pokemon = side.team[i];
        if (!pokemon.fainted && pokemon.details.replace(/, L\d{0,3}/, '') === details) {
          illusion.illusion = pokemon;
          if (slot >= 0) illusion.slot = slot;
          return [illusion, parsed];
        }
      }
    }

    return [undefined, parsed];
  }

  rememberTeamPreviewPokemon(sideid: SideID, details: PokemonDetails) {
    const {siden} = this.parsePokemonId(sideid);
    return this.sides[siden].addPokemon(Protocol.parseDetails('', '' as PokemonIdent, details));
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
    const poke = this.getSide(side).active[slot];
    return poke ? (poke.illusion?.ident || poke.originalIdent) : undefined;
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
