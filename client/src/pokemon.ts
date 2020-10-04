import {
  StatusName,
  GenderName,
  HPColor,
  BoostsTable,
  TypeName,
  ID,
  toID,
  Move,
  Effect,
} from '@pkmn/data';
import {
  DetailedPokemon,
  EffectName,
  MoveName,
  PokemonDetails,
  PokemonHealth,
  PokemonHPStatus,
  PokemonIdent,
  PokemonSearchID,
  Protocol,
  Request,
} from '@pkmn/protocol';

import {Side} from './side';

type EffectState = any[] & { 0: ID };

// [name, minTimeLeft, maxTimeLeft]
interface EffectTable { [effectid: string]: EffectState }

export interface ServerPokemon extends Request.Pokemon, DetailedPokemon, PokemonHealth { }

export class Pokemon implements DetailedPokemon, PokemonHealth {
  readonly side: Side;
  slot: number;

  details: PokemonDetails;
  name: string;
  speciesForme: string;
  level: number;
  shiny: boolean;
  gender: GenderName;
  readonly originalIdent: PokemonIdent;
  searchid: PokemonSearchID;

  hp: number;
  maxhp: number;
  hpcolor: HPColor;
  status?: StatusName;
  fainted: boolean;

  newlySwitched: boolean;
  beingCalledBack: boolean;

  statusStage: number;
  statusData: { sleepTurns: number; toxicTurns: number };
  boosts: Partial<BoostsTable>;
  volatiles: EffectTable;
  turnstatuses: EffectTable;
  movestatuses: EffectTable;

  ability: ID;
  baseAbility: ID;

  item: ID;
  itemEffect: string;
  lastItem: ID;
  lastItemEffect: string;
  teamPreviewItem: boolean;

  moves: ID[];
  // [[moveName, ppUsed]]
  moveTrack: [string, number][] = [];

  lastMove: ID;
  lastMoveTargetLoc?: number;
  moveThisTurn: ID | boolean;
  hurtThisTurn: boolean;

  constructor(side: Side, details: DetailedPokemon) {
    this.side = side;
    this.slot = 0;

    this.speciesForme = details.speciesForme;
    this.details = details.details;
    this.name = details.name;
    this.level = details.level;
    this.shiny = details.shiny;
    this.gender = details.gender || 'N';
    this.originalIdent = details.ident;
    this.searchid = details.searchid;

    this.hp = 0;
    this.maxhp = 0; // 1000
    this.level = 100;
    this.hpcolor = 'g';
    this.status = undefined;
    this.fainted = false;

    this.newlySwitched = false;
    this.beingCalledBack = false;

    this.statusStage = 0;
    this.statusData = {sleepTurns: 0, toxicTurns: 0};
    this.boosts = {};
    this.volatiles = {};
    this.turnstatuses = {};
    this.movestatuses = {};

    this.ability = '';
    this.baseAbility = '';

    this.item = '';
    this.itemEffect = '';
    this.lastItem = '';
    this.lastItemEffect = '';
    this.teamPreviewItem = false;

    this.moves = [];
    this.moveTrack = [];

    this.lastMove = '';
    this.lastMoveTargetLoc = undefined;
    this.moveThisTurn = '';
    this.hurtThisTurn = false;
  }

  get ident() {
    return (
      this.originalIdent.substr(0, 2) +
      'abcdef'.charAt(this.slot) +
      this.originalIdent.substr(2)
    ) as PokemonIdent;
  }

  get position() {
    return this.slot;
  }

  get weighthg() {
    return this.getWeightHg();
  }

  get types() {
    return this.getTypes()[0];
  }

  get addedType() {
    return this.getTypes()[1] || undefined;
  }

  // get switching() {
  //   return this.newlySwitched ? 'in' : this.beingCalledBack ? 'out' : undefined;
  // }

  hasItem() {
    return this.name ? !!this.item : this.teamPreviewItem;
  }

  isActive() {
    return this.side.active.includes(this);
  }

  healthParse(hpstring: string) {
    return Pokemon.parseHealth(hpstring, this);
  }

  static parseHealth(
    hpstring: string,
    output: PokemonHealth = {hp: 0, maxhp: 0, hpcolor: ''}
  ): [delta: number, denominator: number, oldnum: number, oldcolor: HPColor | ''] | null {
    if (!hpstring || !hpstring.length) return null;

    let oldhp = output.fainted ? 0 : (output.hp || 1);
    let oldmaxhp = output.maxhp;
    const oldcolor = output.hpcolor;

    void Protocol.parseHealth(hpstring as PokemonHPStatus, output);
    // max hp not known before parsing this message
    if (oldmaxhp === 0) oldmaxhp = oldhp = output.maxhp;
    const oldnum = oldhp ? (Math.floor(output.maxhp * oldhp / oldmaxhp) || 1) : 0;
    const delta = output.hp - oldnum;
    return [delta, output.maxhp, oldnum, oldcolor];
  }

  checkDetails(details?: PokemonDetails) {
    if (!details) return false;
    if (details === this.details) return true;
    if (this.searchid) return false;
    if (details.includes(', shiny')) {
      if (this.checkDetails(details.replace(', shiny', '') as PokemonDetails)) {
        return true;
      }
    }
    // the actual forme was hidden on Team Preview
    details = details.replace(/(-[A-Za-z0-9]+)?(, |$)/, '-*$2') as PokemonDetails;
    return details === this.details;
  }

  hasTurnstatus(volatile: ID) {
    return !!this.turnstatuses[volatile];
  }

  addTurnstatus(volatile: ID) {
    volatile = toID(volatile);
    if (this.hasTurnstatus(volatile)) return;
    this.turnstatuses[volatile] = [volatile];
  }

  removeTurnstatus(volatile: ID) {
    if (!this.hasTurnstatus(volatile)) return;
    delete this.turnstatuses[volatile];
  }

  clearTurnstatuses() {
    for (const id in this.turnstatuses) {
      this.removeTurnstatus(id as ID);
    }
    this.turnstatuses = {};
  }

  hasMovestatus(volatile: ID) {
    return !!this.movestatuses[volatile];
  }

  addMovestatus(volatile: ID) {
    volatile = toID(volatile);
    if (this.hasMovestatus(volatile)) return;
    this.movestatuses[volatile] = [volatile];
  }

  removeMovestatus(volatile: ID) {
    if (!this.hasMovestatus(volatile)) return;
    delete this.movestatuses[volatile];
  }

  clearMovestatuses() {
    for (const id in this.movestatuses) {
      this.removeMovestatus(id as ID);
    }
    this.movestatuses = {};
  }

  hasVolatile(volatile: ID) {
    return !!this.volatiles[volatile];
  }

  addVolatile(volatile: ID, ...args: any[]) {
    if (this.hasVolatile(volatile) && !args.length) return;
    this.volatiles[volatile] = [volatile, ...args] as EffectState;
  }

  removeVolatile(volatile: ID) {
    if (!this.hasVolatile(volatile)) return;
    delete this.volatiles[volatile];
  }

  clearVolatiles() {
    this.volatiles = {};
    this.clearTurnstatuses();
    this.clearMovestatuses();
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
    this.lastMove = '';
    this.moveThisTurn = '';
    this.hurtThisTurn = false;
    this.newlySwitched = true;
    this.beingCalledBack = false;

    this.statusStage = 0;
    this.statusData.toxicTurns = 0;
    if (this.side.battle.gen.num === 5) this.statusData.sleepTurns = 0;
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

  rememberMove(moveName: string, pp = 1, recursionSource?: PokemonIdent) {
    if (recursionSource === this.originalIdent) return;
    moveName = this.side.battle.gen.moves.get(moveName)!.name;
    if (moveName.charAt(0) === '*') return;
    if (moveName === 'Struggle') return;
    if (this.volatiles.transform) {
      // make sure there is no infinite recursion if both Pokemon are transformed into each other
      if (!recursionSource) recursionSource = this.originalIdent;
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

  useMove(move: Move, target: Pokemon | null, from?: EffectName | MoveName) {
    const gen = this.side.battle.gen;
    const fromeffect = from && gen.effects.get(from);
    if (fromeffect) this.activateAbility(fromeffect);
    this.clearMovestatuses();
    if (move.id === 'focuspunch') {
      this.removeTurnstatus('focuspunch' as ID);
    }
    if (fromeffect?.id === 'sleeptalk') {
      this.rememberMove(move.name, 0);
    } else if (!fromeffect?.id || fromeffect.id === 'pursuit') {
      let moveName = move.name;
      if (move.isZ) {
        const isZ = move.isZ as ID;
        this.item = isZ;
        const item = gen.items.get(isZ)!;
        if (item.zMoveFrom) moveName = item.zMoveFrom;
      } else if (move.name.slice(0, 2) === 'Z-') {
        moveName = moveName.slice(2) as MoveName;
        move = gen.moves.get(moveName)!;
        // TODO: use a cached lookup table instead of looping...
        for (const item of gen.items) {
          if (item.zMoveType === move.type) {
            this.item = item.id;
            break;
          }
        }
      }
      let pp = 1;
      if (move.target === 'all') {
        for (const active of this.side.foe.active) {
          if (active && toID(active.ability) === 'pressure') {
            pp += 1;
          }
        }
      } else if (target && target.side !== this.side && toID(target.ability) === 'pressure') {
        pp += 1;
      }
      this.rememberMove(moveName, pp);
    }
    this.lastMove = move.id;
    this.lastMoveTargetLoc = target
      ? target.side === this.side ? -(target.slot + 1) : target.slot + 1
      : 0;
    this.side.battle.lastMove = move.id;
    this.moveThisTurn = move.id;
    if (move.id === 'wish' || move.id === 'healingwish') {
      this.side.wisher = this;
    }
  }

  cantUseMove(effect: Effect, move?: Move) {
    this.clearMovestatuses();
    this.activateAbility(effect);
    if (move?.id) this.rememberMove(move.name, 0);
    switch (effect.id) {
    case 'slp': {
      this.lastMove = '';
      return void this.statusData.sleepTurns++;
    }
    case 'frz': return void (this.lastMove = '');
    case 'focuspunch': return this.removeTurnstatus('focuspunch' as ID);
    case 'shelltrap': return this.removeTurnstatus('shelltrap' as ID);
    case 'flinch': return this.removeTurnstatus('focuspunch' as ID);
    }
  }

  activateAbility(effectOrName?: Effect | string, isNotBase?: boolean) {
    if (!effectOrName) return;
    if (typeof effectOrName !== 'string') {
      if (effectOrName.effectType !== 'Ability') return;
      effectOrName = effectOrName.name;
    }
    this.rememberAbility(effectOrName, isNotBase);
  }

  rememberAbility(ability: string, isNotBase?: boolean) {
    this.ability = this.side.battle.gen.abilities.get(ability)!.id;
    if (!this.baseAbility && !isNotBase) {
      this.baseAbility = this.ability;
    }
  }

  getWeightHg(serverPokemon?: ServerPokemon) {
    const autotomizeFactor = this.volatiles.autotomize?.[1] * 1000 || 0;
    return Math.max(1, this.getSpecies(serverPokemon).weighthg - autotomizeFactor);
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

  getTypes(serverPokemon?: ServerPokemon): [[TypeName] | [TypeName, TypeName], TypeName | ''] {
    let types: [TypeName] | [TypeName, TypeName];
    if (this.volatiles.typechange) {
      types = this.volatiles.typechange[1].split('/');
    } else {
      types = this.getSpecies(serverPokemon).types;
    }
    if (this.hasTurnstatus('roost' as ID) && types.includes('Flying')) {
      types = types.filter(typeName => typeName !== 'Flying') as [TypeName] | [TypeName, TypeName];
      if (!types.length) types = ['Normal'];
    }
    const addedType = (this.volatiles.typeadd ? this.volatiles.typeadd[1] : '');
    return [types, addedType];
  }

  getTypeList(serverPokemon?: ServerPokemon) {
    const [types, addedType] = this.getTypes(serverPokemon);
    return addedType ? types.concat(addedType) : types;
  }

  isGrounded(serverPokemon?: ServerPokemon) {
    const battle = this.side.battle;
    if (battle.field.hasPseudoWeather('gravity' as ID)) {
      return true;
    } else if (this.volatiles['ingrain'] && battle.gen.num >= 4) {
      return true;
    } else if (this.volatiles['smackdown']) {
      return true;
    }

    let item = toID(serverPokemon ? serverPokemon.item : this.item);
    const ability = toID(this.ability || serverPokemon?.ability);
    if (battle.field.hasPseudoWeather('magicroom' as ID) ||
      this.volatiles['embargo'] ||
      ability === 'klutz'
    ) {
      item = '' as ID;
    }

    if (item === 'ironball') return true;
    if (ability === 'levitate') return false;
    if (this.volatiles['magnetrise'] || this.volatiles['telekinesis']) return false;
    if (item === 'airballoon') return false;
    return !this.getTypeList(serverPokemon).includes('Flying');
  }

  getSpeciesForme(serverPokemon?: ServerPokemon): string {
    return this.volatiles.formechange ? this.volatiles.formechange[1]
      : (serverPokemon ? serverPokemon.speciesForme : this.speciesForme);
  }

  getSpecies(serverPokemon?: ServerPokemon) {
    return this.side.battle.gen.species.get(this.getSpeciesForme(serverPokemon))!;
  }

  getBaseSpecies() {
    return this.side.battle.gen.species.get(this.speciesForme)!;
  }

  // Returns [min, max] damage dealt as a proportion of total HP from 0 to 1
  static getDamageRange(
    damage: [delta: number, denominator: number, oldnum: number, oldcolor: HPColor | ''],
    hpcolor: HPColor
  ): [number, number] {
    if (damage[1] !== 48) {
      const ratio = damage[0] / damage[1];
      return [ratio, ratio];
    }
    // pixel damage
    let oldrange = Pokemon.getPixelRange(damage[2], damage[3]);
    let newrange = Pokemon.getPixelRange(damage[2] + damage[0], hpcolor);
    if (damage[0] === 0) {
      // no change in displayed pixel width
      return [0, newrange[1] - newrange[0]];
    }
    if (oldrange[0] < newrange[0]) { // swap order
      const r = oldrange;
      oldrange = newrange;
      newrange = r;
    }
    return [oldrange[0] - newrange[1], oldrange[1] - newrange[0]];
  }

  static getPixelRange(pixels: number, color: HPColor | ''): [number, number] {
    const epsilon = 0.5 / 714;

    if (pixels === 0) return [0, 0];
    if (pixels === 1) return [0 + epsilon, 2 / 48 - epsilon];
    if (pixels === 9) {
      if (color === 'y') { // ratio is > 0.2
        return [0.2 + epsilon, 10 / 48 - epsilon];
      } else { // ratio is <= 0.2
        return [9 / 48, 0.2];
      }
    }
    if (pixels === 24) {
      if (color === 'g') { // ratio is > 0.5
        return [0.5 + epsilon, 25 / 48 - epsilon];
      } else { // ratio is exactly 0.5
        return [0.5, 0.5];
      }
    }
    if (pixels === 48) return [1, 1];

    return [pixels / 48, (pixels + 1) / 48 - epsilon];
  }

  static getFormattedRange(range: [number, number], precision: number, separator: string) {
    if (range[0] === range[1]) {
      const percentage = Math.abs(range[0] * 100);
      if (Math.floor(percentage) === percentage) {
        return percentage + '%';
      }
      return percentage.toFixed(precision) + '%';
    }
    let lower;
    let upper;
    if (precision === 0) {
      lower = Math.floor(range[0] * 100);
      upper = Math.ceil(range[1] * 100);
    } else {
      lower = (range[0] * 100).toFixed(precision);
      upper = (range[1] * 100).toFixed(precision);
    }
    return '' + lower + separator + upper + '%';
  }

  reset() {
    this.clearVolatile();
    this.hp = this.maxhp;
    this.fainted = false;
    this.status = undefined;
    this.moveTrack = [];
    this.name = this.name || this.speciesForme;
  }

  destroy() {
    // @ts-ignore readonly
    this.side = null!;
  }
}
