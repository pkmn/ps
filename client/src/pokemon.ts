import { ID, toID } from '@pkmn/sim';
import { StatusName, GenderName, HPColor, BoostsTable, TypeName } from '@pkmn/types';
import { PokemonDetails, PokemonHealth, Protocol as P } from '@pkmn/protocol';

import { Side } from './side';

export interface MoveSlot {
  id: ID;
  move: string;
  pp: number;
  maxpp: number;
  target?: string;
  disabled: boolean | string;
  disabledSource?: string;
  used: boolean;
  virtual?: boolean;
}

// [id, element?, ...misc]
type EffectState = any[] & { 0: ID };
// [name, minTimeLeft, maxTimeLeft]
type EffectTable = { [effectid: string]: EffectState };

export interface ServerPokemon extends P.Pokemon, PokemonDetails, PokemonHealth { }

const SLOTS = ['a', 'b', 'c', 'd', 'e', 'f'];

export class Pokemon implements PokemonDetails, PokemonHealth {
  // readonly set: PokemonSet;
  // readonly baseHpType: string;
  // readonly baseHpPower: number;

  // readonly baseMoveSlots: MoveSlot[];
  // moveSlots: MoveSlot[];

  // hpType: string;
  // hpPower: number;

  // speciesData: EffectState;

  // showCure?: boolean;

  // baseStoredStats: StatsTable;
  // storedStats: StatsExceptHPTable;

  // abilityData: EffectState;

  // itemData: EffectState;
  // usedItemThisTurn: boolean;
  // ateBerry: boolean;

  // trapped: boolean | "hidden";
  // maybeTrapped: boolean;
  // maybeDisabled: boolean;

  // illusion: Pokemon | null;
  // transformed: boolean;

  // baseMaxhp: number;
  // faintQueued: boolean;
  // subFainted: boolean | null;

  // types: string[];
  // addedType: string;
  // knownType: boolean;
  // apparentType: string;

  // switchFlag: ID | boolean;
  // forceSwitchFlag: boolean;
  // switchCopyFlag: boolean;
  // draggedIn: number | null;
  // newlySwitched: boolean;
  // beingCalledBack: boolean;

  // lastMoveTargetLoc?: number;
  // moveThisTurn: string | boolean;
  // moveLastTurnResult: boolean | null | undefined;
  // moveThisTurnResult: boolean | null | undefined;
  // hurtThisTurn: boolean;
  // lastDamage: number;
  // attackedBy: {source: Pokemon, damage: number, thisTurn: boolean, move?: ID}[];

  // isActive: boolean;
  // activeTurns: number;
  // truantTurn: boolean;
  // isStarted: boolean;
  // duringMove: boolean;

  // weighthg: number;
  // speed: number;
  // abilityOrder: number;

  // canMegaEvo: string | null | undefined;
  // canUltraBurst: string | null | undefined;
  // canDynamax: boolean;
  // readonly canGigantamax: string | null;

  // staleness?: 'internal' | 'external';
  // pendingStaleness?: 'internal' | 'external';
  // modifiedStats?: StatsExceptHPTable;
  // modifyStat?: (this: Pokemon, statName: StatNameExceptHP, modifier: number) => void;

  // m: PokemonModData;

  readonly side: Side;
  slot: number;

  details: P.PokemonDetails;
  name: string;
  species: string;
  level: number;
  shiny: boolean;
  gender: GenderName | '';
  readonly originalIdent: P.PokemonIdent;
  searchid: P.PokemonSearchID;

  hp: number;
  maxhp: number;
  hpcolor: HPColor;
  status: StatusName | 'tox' | '' | '???';
  fainted: boolean;

  statusStage: number;
  statusData: { sleepTurns: number, toxicTurns: number };
  boosts: Partial<BoostsTable>;
  volatiles: EffectTable;
  turnstatuses: EffectTable;
  movestatuses: EffectTable;

  ability: P.Ability | '';
  baseAbility: P.Ability | '';

  item: P.Item | '';
  itemEffect = ''; // FIXME
  lastItem: P.Item | '';
  lastItemEffect = ''; // FIXME

  moves: P.Move[];
  // [[moveName, ppUsed]]
  moveTrack: [string, number][] = [];
  lastMove: P.Move | '';

  constructor(side: Side, details: PokemonDetails) {
     this.side = side
    this.slot = 0;

    this.species = details.species;
    this.details = details.details;
    this.name = details.name;
    this.level = details.level;
    this.shiny = details.shiny;
    this.gender = details.gender || 'N';
    this.originalIdent = details.ident;
    this.searchid = details.searchid;

    this.hp = 0;
    this.maxhp = 1000;
    this.level = 100;
    this.hpcolor = 'g';
    this.status = '';
    this.fainted = false;

    this.statusStage = 0;
    this.statusData = { sleepTurns: 0, toxicTurns: 0 };
    this.boosts = {};
    this.volatiles = {};
    this.turnstatuses = {};
    this.movestatuses = {};

    this.ability = '';
    this.baseAbility = '';

    this.item = '';
    this.lastItem = '';

    this.moves = [];
    this.moveTrack = [];
    this.lastMove = '';
  }

  get ident() {
    return (
      this.originalIdent.substr(0, 2) +
      SLOTS[this.slot] +
      this.originalIdent.substr(2)
    ) as P.PokemonIdent;
  }

  isActive() {
    return this.side.active.includes(this);
  }

  getHPColor(): HPColor {
    if (this.hpcolor) return this.hpcolor; // TODO ????
    const ratio = this.hp / this.maxhp;
    if (ratio > 0.5) return 'g';
    if (ratio > 0.2) return 'y';
    return 'r';
  }

  healthParse(hpstring: string, parsedamage?: boolean, heal?: boolean):
    [number, number, number] | [number, number, number, HPColor] | null {
    // returns [delta, denominator, percent(, oldnum, oldcolor)] or null
    if (!hpstring || !hpstring.length) return null;
    const parenIndex = hpstring.lastIndexOf('(');
    if (parenIndex >= 0) {
      // old style damage and health reporting
      if (parsedamage) {
        let damage = parseFloat(hpstring);
        // unusual check preseved for backward compatbility
        if (isNaN(damage)) damage = 50;
        if (heal) {
          this.hp += this.maxhp * damage / 100;
          if (this.hp > this.maxhp) this.hp = this.maxhp;
        } else {
          this.hp -= this.maxhp * damage / 100;
        }
        // parse the absolute health information
        const ret = this.healthParse(hpstring);
        if (ret && (ret[1] === 100)) {
          // support for old replays with nearest-100th damage and health
          return [damage, 100, damage];
        }
        // complicated expressions preserved for backward compatibility
        const percent = Math.round(Math.ceil(damage * 48 / 100) / 48 * 100);
        const pixels = Math.ceil(damage * 48 / 100);
        return [pixels, 48, percent];
      }
      if (hpstring.substr(hpstring.length - 1) !== ')') return null;
      hpstring = hpstring.substr(parenIndex + 1, hpstring.length - parenIndex - 2);
    }

    let oldhp = this.fainted ? 0 : (this.hp || 1);
    let oldmaxhp = this.maxhp;
    const oldcolor = this.hpcolor;

    this.side.battle.parseHealth(hpstring, this);
    // max hp not known before parsing this message
    if (oldmaxhp === 0) oldmaxhp = oldhp = this.maxhp;
    const oldnum = oldhp ? (Math.floor(this.maxhp * oldhp / oldmaxhp) || 1) : 0;
    const delta = this.hp - oldnum;
    return [delta, this.maxhp, oldnum, oldcolor];
  }

  checkDetails(details?: P.PokemonDetails) {
    if (!details) return false;
    if (details === this.details) return true;
    if (this.searchid) return false;
    if (details.indexOf(', shiny') >= 0) {
      if (this.checkDetails(details.replace(', shiny', '') as P.PokemonDetails)) {
        return true;
      }
    }
    // the actual forme was hidden on Team Preview
    details = details.replace(/(-[A-Za-z0-9]+)?(, |$)/, '-*$2') as P.PokemonDetails;
    return details === this.details;
  }

  removeVolatile(volatile: ID) {
    if (!this.hasVolatile(volatile)) return;
    delete this.volatiles[volatile];
  }

  addVolatile(volatile: ID, ...args: any[]) {
    if (this.hasVolatile(volatile) && !args.length) return;
    this.volatiles[volatile] = [volatile, ...args] as EffectState;
  }

  hasVolatile(volatile: ID) {
    return !!this.volatiles[volatile];
  }

  removeTurnstatus(volatile: ID) {
    if (!this.hasTurnstatus(volatile)) return;
    delete this.turnstatuses[volatile];
  }

  addTurnstatus(volatile: ID) {
    volatile = toID(volatile);
    if (this.hasTurnstatus(volatile)) return;
    this.turnstatuses[volatile] = [volatile];
  }

  hasTurnstatus(volatile: ID) {
    return !!this.turnstatuses[volatile];
  }

  clearTurnstatuses() {
    for (const id in this.turnstatuses) {
      this.removeTurnstatus(id as ID);
    }
    this.turnstatuses = {};
  }

  removeMovestatus(volatile: ID) {
    if (!this.hasMovestatus(volatile)) return;
    delete this.movestatuses[volatile];
  }

  addMovestatus(volatile: ID) {
    volatile = toID(volatile);
    if (this.hasMovestatus(volatile)) return;
    this.movestatuses[volatile] = [volatile];
  }

  hasMovestatus(volatile: ID) {
    return !!this.movestatuses[volatile];
  }

  clearMovestatuses() {
    for (const id in this.movestatuses) {
      this.removeMovestatus(id as ID);
    }
    this.movestatuses = {};
  }

  clearVolatiles() {
    this.volatiles = {};
    this.clearTurnstatuses();
    this.clearMovestatuses();
  }

  rememberMove(moveName: string, pp = 1, recursionSource?: P.PokemonIdent) {
    if (recursionSource === this.ident) return;
    moveName = this.side.battle.dex.getMove(moveName).name;
    if (moveName.charAt(0) === '*') return;
    if (moveName === 'Struggle') return;
    if (this.volatiles.transform) {
      // make sure there is no infinite recursion if both Pokemon are transformed into each other
      if (!recursionSource) recursionSource = this.ident;
      this.volatiles.transform[1].rememberMove(moveName, 0, recursionSource);
      moveName = '*' + moveName;
    }
    for (const entry of this.moveTrack) {
      if (moveName === entry[0]) {
        entry[1] += pp;
        if (entry[1] < 0) entry[1] = 0;
        return;
      }
    }
    this.moveTrack.push([moveName, pp]);
  }

  rememberAbility(ability: string, isNotBase?: boolean) {
    ability = this.side.battle.dex.getAbility(ability).name;
    this.ability = ability as P.Ability;
    if (!this.baseAbility && !isNotBase) {
      this.baseAbility = ability as P.Ability;
    }
  }

  getWeightKg(serverPokemon?: ServerPokemon) {
    const autotomizeFactor = this.volatiles.autotomize?.[1] * 100 || 0;
    return Math.max(this.getTemplate(serverPokemon).weightkg - autotomizeFactor, 0.1);
  }

  clearVolatile() {
    this.ability = this.baseAbility;
    this.boosts = {};
    this.clearVolatiles();
    for (let i = 0; i < this.moveTrack.length; i++) {
      if (this.moveTrack[i][0].charAt(0) === '*') {
        this.moveTrack.splice(i, 1);
        i--;
      }
    }
    // this.lastMove = '';
    this.statusStage = 0;
    this.statusData.toxicTurns = 0;
    if (this.side.battle.gen === 5) this.statusData.sleepTurns = 0;
  }

  copyVolatileFrom(pokemon: Pokemon, copyAll: 'batonpass' | 'illusion' = 'batonpass') {
    this.boosts = pokemon.boosts;
    this.volatiles = pokemon.volatiles;
    // this.lastMove = pokemon.lastMove; // I think
    if (copyAll === 'batonpass') {
      delete this.volatiles['airballoon'];
      delete this.volatiles['attract'];
      delete this.volatiles['autotomize'];
      delete this.volatiles['disable'];
      delete this.volatiles['encore'];
      delete this.volatiles['foresight'];
      delete this.volatiles['imprison'];
      delete this.volatiles['laserfocus'];
      delete this.volatiles['mimic'];
      delete this.volatiles['miracleeye'];
      delete this.volatiles['nightmare'];
      delete this.volatiles['smackdown'];
      delete this.volatiles['stockpile1'];
      delete this.volatiles['stockpile2'];
      delete this.volatiles['stockpile3'];
      delete this.volatiles['torment'];
      delete this.volatiles['typeadd'];
      delete this.volatiles['typechange'];
      delete this.volatiles['yawn'];
    }
    delete this.volatiles['transform'];
    delete this.volatiles['formechange'];

    pokemon.boosts = {};
    pokemon.volatiles = {};
    pokemon.statusStage = 0;
  }

  copyTypesFrom(pokemon: Pokemon) {
    const [types, addedType] = pokemon.getTypes();
    this.addVolatile('typechange' as ID, types.join('/'));
    if (addedType) {
      this.addVolatile('typeadd' as ID, addedType);
    } else {
      this.removeVolatile('typeadd' as ID);
    }
  }

  getTypes(serverPokemon?: ServerPokemon): [ReadonlyArray<TypeName>, TypeName | ''] {
    let types: ReadonlyArray<TypeName>;
    if (this.volatiles.typechange) {
      types = this.volatiles.typechange[1].split('/');
    } else {
      types = this.getTemplate(serverPokemon).types;
    }
    if (this.volatiles.roost && types.includes('Flying')) {
      types = types.filter(typeName => typeName !== 'Flying');
      if (!types.length) types = ['Normal'];
    }
    const addedType = (this.volatiles.typeadd ? this.volatiles.typeadd[1] : '');
    return [types, addedType];
  }

  isGrounded(serverPokemon?: ServerPokemon) {
    const battle = this.side.battle;
    if (battle.hasPseudoWeather('Gravity')) {
      return true;
    } else if (this.volatiles['ingrain'] && battle.gen >= 4) {
      return true;
    } else if (this.volatiles['smackdown']) {
      return true;
    }

    let item = toID(serverPokemon ? serverPokemon.item : this.item);
    const ability = toID(this.ability || serverPokemon?.ability);
    if (battle.hasPseudoWeather('Magic Room') || this.volatiles['embargo'] || ability === 'klutz') {
      item = '' as ID;
    }

    if (item === 'ironball') return true;
    if (ability === 'levitate') return false;
    if (this.volatiles['magnetrise'] || this.volatiles['telekinesis']) return false;
    if (item === 'airballoon') return false;
    return !this.getTypeList(serverPokemon).includes('Flying');
  }

  getTypeList(serverPokemon?: ServerPokemon) {
    const [types, addedType] = this.getTypes(serverPokemon);
    return addedType ? types.concat(addedType) : types;
  }

  getSpecies(serverPokemon?: ServerPokemon): string {
    return this.volatiles.formechange ? this.volatiles.formechange[1] :
      (serverPokemon ? serverPokemon.species : this.species);
  }

  getTemplate(serverPokemon?: ServerPokemon) {
    return this.dex.getTemplate(this.getSpecies(serverPokemon));
  }

  getBaseTemplate() {
    return this.dex.getTemplate(this.species);
  }

  reset() {
    this.clearVolatile();
    this.hp = this.maxhp;
    this.fainted = false;
    this.status = '';
    this.moveTrack = [];
    this.name = this.name || this.species;
  }
}