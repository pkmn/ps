import {
  StatusName,
  GenderName,
  HPColor,
  BoostsTable,
  TypeName,
  ID,
  toID,
  Move,
  MoveTarget,
  SpeciesName,
  StatsTable,
  NatureName,
  PokemonSet,
  DataKind,
  HPTypeName,
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
} from '@pkmn/protocol';

import {Side} from './side';

interface EffectState {
  id: ID;
  level?: number;
  apparentType?: string;
  type?: TypeName;
  speciesForme?: SpeciesName;
  pokemon?: Pokemon;
  shiny?: boolean;
  gender?: GenderName;
  duration?: 'turn' | 'move' | number;
}

interface EffectTable { [effectid: string]: EffectState }

type MoveSlot = {
  name: MoveName;
  id: ID;
  ppUsed: number;
  virtual?: boolean;
} | {
  name: MoveName;
  id: ID;
  ppUsed: number;
  pp: number;
  maxpp: number;
  target: MoveTarget;
  disabled?: boolean;
  virtual?: boolean;
};

export class Pokemon implements DetailedPokemon, PokemonHealth {
  readonly side: Side;
  readonly set?: PokemonSet;
  slot: number;

  details: PokemonDetails;
  name: string;
  private baseSpeciesForme: string;
  level: number;
  shiny: boolean;
  gender: GenderName;
  readonly originalIdent: PokemonIdent;
  searchid: PokemonSearchID;

  hp: number;
  maxhp: number;
  baseMaxhp: number;
  hpcolor: HPColor;
  status?: StatusName;
  fainted: boolean;

  newlySwitched: boolean;
  beingCalledBack: boolean;

  statusStage: number;
  statusData: { sleepTurns: number; toxicTurns: number };
  boosts: Partial<BoostsTable>;
  volatiles: EffectTable;

  baseAbility: ID;

  itemEffect: string;
  lastItem: ID;
  lastItemEffect: string;
  teamPreviewItem: boolean;

  moveSlots: MoveSlot[];
  maxMoves?: Array<{
    id: ID;
    target: MoveTarget;
    disabled?: boolean;
  }>;
  zMoves?: Array<{
    name: MoveName;
    id: ID;
    target: MoveTarget;
  } | null>;

  canDynamax?: boolean;
  canGigantamax?: boolean;
  canMegaEvo?: boolean;
  canUltraBurst?: boolean;
  trapped?: boolean;
  maybeTrapped?: boolean;
  maybeDisabled?: boolean;

  lastMove: ID;
  lastMoveTargetLoc?: number;
  moveThisTurn: ID | boolean;
  hurtThisTurn: boolean;

  readonly computed: {
    ability: ID;
    item: ID;
    stats?: StatsTable;
    nature?: NatureName;
    hpType?: HPTypeName;
  };

  constructor(side: Side, details: DetailedPokemon, set?: PokemonSet) {
    this.side = side;
    this.set = set;
    this.slot = 0;

    this.baseSpeciesForme = details.speciesForme;
    this.details = details.details;
    this.name = details.name;
    this.level = details.level;
    this.shiny = details.shiny;
    this.gender = details.gender || 'N';
    this.originalIdent = details.ident;
    this.searchid = details.searchid;

    this.hp = 0;
    this.maxhp = 0; // 1000
    this.baseMaxhp = this.maxhp;
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

    this.baseAbility = '';

    this.itemEffect = '';
    this.lastItem = '';
    this.lastItemEffect = '';
    this.teamPreviewItem = false;

    this.moveSlots = [];
    this.maxMoves = undefined;
    this.zMoves = undefined;

    this.canDynamax = undefined;
    this.canGigantamax = undefined;
    this.canMegaEvo = undefined;
    this.canUltraBurst = undefined;
    this.trapped = undefined;
    this.maybeTrapped = undefined;
    this.maybeDisabled = undefined;

    this.lastMove = '';
    this.lastMoveTargetLoc = undefined;
    this.moveThisTurn = '';
    this.hurtThisTurn = false;

    this.computed = {
      stats: undefined,
      ability: set?.ability ? toID(set.ability) : '',
      item: set?.item ? toID(set.item) : '',
      nature: set?.nature ? this.side.battle.gen.natures.get(set.nature)?.name : undefined,
      hpType: set?.hpType
        ? this.side.battle.gen.types.get(set.nature)?.name as HPTypeName
        : undefined,
    };
  }

  get ability() {
    return this.computed.ability;
  }

  set ability(ability: ID) {
    this.computed.ability = ability;
  }

  get item() {
    return this.computed.item;
  }

  set item(item: ID) {
    this.computed.item = item;
  }

  get nature() {
    return this.computed.nature;
  }

  get ivs() {
    return this.set?.ivs;
  }

  get evs() {
    return this.set?.evs;
  }

  get happiness() {
    return this.set?.happiness;
  }

  get hpType() {
    return this.computed.hpType;
  }

  get stats() {
    return this.computed.stats;
  }

  set stats(stats: StatsTable | undefined) {
    this.computed.stats = stats;
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

  get species() {
    return this.side.battle.gen.species.get(this.speciesForme)!;
  }

  get baseSpecies() {
    return this.side.battle.gen.species.get(this.baseSpeciesForme)!;
  }

  get speciesForme() {
    return this.volatiles.formechange?.speciesForme || this.baseSpeciesForme;
  }

  set speciesForme(speciesForme: string) {
    this.baseSpeciesForme = speciesForme;
  }

  get weighthg() {
    const autotomizeFactor = (this.volatiles.autotomize?.level || 0) * 1000;
    return Math.max(1, this.species.weighthg - autotomizeFactor);
  }

  get types() {
    let types: [TypeName] | [TypeName, TypeName];
    if (this.volatiles.typechange) {
      types =
        this.volatiles.typechange.apparentType!.split('/') as [TypeName] | [TypeName, TypeName];
    } else {
      types = this.species.types;
    }
    if (this.hasVolatile('roost' as ID) && types.includes('Flying')) {
      types = types.filter(typeName => typeName !== 'Flying') as [TypeName] | [TypeName, TypeName];
      if (!types.length) types = ['Normal'];
    }
    return types;
  }

  get addedType() {
    return this.volatiles.typeadd?.type;
  }

  get switching() {
    return this.newlySwitched ? 'in' : this.beingCalledBack ? 'out' : undefined;
  }

  get moves() {
    return this.moveSlots.map(m => m.id);
  }

  hasItem() {
    return this.name ? !!this.item : this.teamPreviewItem;
  }

  isActive() {
    return this.side.active.includes(this);
  }

  healthParse(hpstring: string) {
    const oldmaxhp = this.maxhp;
    const health = Pokemon.parseHealth(hpstring, this);
    // baseMaxhp differs from maxhp after Dynamax, but a Pokemon will always be initialized
    // in its base form first before Dynamax and so the first maxhp value we see is the base
    if (oldmaxhp === 0) this.baseMaxhp = this.maxhp;
    return health;
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

  hasVolatile(volatile: ID) {
    return !!this.volatiles[volatile];
  }

  addVolatile(volatile: ID, args?: Omit<EffectState, 'id'>) {
    if (this.hasVolatile(volatile) && !args) return;
    this.volatiles[volatile] = {...args, id: volatile};
  }

  removeVolatile(volatile: ID) {
    if (!this.hasVolatile(volatile)) return;
    delete this.volatiles[volatile];
  }

  clearTurnstatuses() {
    for (const id in this.volatiles) {
      if (this.volatiles[id].duration === 'turn') delete this.volatiles[id];
    }
  }

  clearMovestatuses() {
    for (const id in this.volatiles) {
      if (this.volatiles[id].duration === 'move') delete this.volatiles[id];
    }
  }

  clearVolatiles() {
    this.volatiles = {};
  }

  clearVolatile() {
    this.ability = this.baseAbility;
    this.boosts = {};
    this.clearVolatiles();

    for (let i = 0; i < this.moveSlots.length; i++) {
      if (this.moveSlots[i].virtual) {
        this.moveSlots.splice(i, 1);
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
      delete this.volatiles['stockpile'];
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

  rememberMove(moveName: MoveName | ID, ppUsed = 1, recursionSource?: PokemonIdent) {
    if (recursionSource === this.originalIdent) return;
    const move = this.side.battle.get('moves', moveName);
    if (move.name === 'Struggle') return;
    let virtual = false;
    if (this.volatiles.transform) {
      // make sure there is no infinite recursion if both Pokemon are transformed into each other
      if (!recursionSource) recursionSource = this.originalIdent;
      this.volatiles.transform.pokemon!.rememberMove(move.name as MoveName, 0, recursionSource);
      virtual = true;
    }
    for (const entry of this.moveSlots) {
      if (move.name === entry.name && virtual === entry.virtual) {
        entry.ppUsed += ppUsed;
        if (entry.ppUsed < 0) entry.ppUsed = 0;
        return;
      }
    }
    this.moveSlots.push({id: move.id, name: move.name as MoveName, ppUsed, virtual});
  }

  useMove(
    move: {id: ID; name: string} & Partial<Move>,
    target: Pokemon | null,
    from?: EffectName | MoveName
  ) {
    const fromeffect = this.side.battle.get('effects', from);
    this.activateAbility(fromeffect);
    this.clearMovestatuses();
    if (move.id === 'focuspunch') this.removeVolatile('focuspunch' as ID);
    if (fromeffect?.id === 'sleeptalk') {
      this.rememberMove(move.name, 0);
    } else if (!fromeffect?.id || fromeffect.id === 'pursuit') {
      let moveName = move.name;
      if (move.isZ) {
        const isZ = move.isZ as ID;
        this.item = isZ;
        const item = this.side.battle.gen.items.get(isZ);
        if (item?.zMoveFrom) moveName = item.zMoveFrom;
      } else if (move.name.slice(0, 2) === 'Z-') {
        moveName = moveName.slice(2) as MoveName;
        move = this.side.battle.get('moves', moveName) as {id: ID; name: string} & Partial<Move>;
        // TODO: use a cached lookup table instead of looping...
        for (const item of this.side.battle.gen.items) {
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

  cantUseMove(
    effect: {id: ID; name: string; kind: DataKind },
    move?: {id: ID; name: string} & Partial<Move>
  ) {
    this.clearMovestatuses();
    this.activateAbility(effect);
    if (move?.id) this.rememberMove(move.name, 0);
    switch (effect.id) {
    case 'slp': {
      this.lastMove = '';
      return void this.statusData.sleepTurns++;
    }
    case 'frz': return void (this.lastMove = '');
    case 'focuspunch': return this.removeVolatile('focuspunch' as ID);
    case 'shelltrap': return this.removeVolatile('shelltrap' as ID);
    case 'flinch': return this.removeVolatile('focuspunch' as ID);
    }
  }

  activateAbility(effectOrName?: {kind: DataKind; name: string} | string, isNotBase?: boolean) {
    if (!effectOrName) return;
    if (typeof effectOrName !== 'string') {
      if (effectOrName.kind !== 'Ability') return;
      effectOrName = effectOrName.name;
    }
    this.rememberAbility(effectOrName, isNotBase);
  }

  rememberAbility(ability: string, isNotBase?: boolean) {
    this.ability = this.side.battle.get('abilities', ability).id;
    if (!this.baseAbility && !isNotBase) {
      this.baseAbility = this.ability;
    }
  }

  copyTypesFrom(pokemon: Pokemon) {
    this.addVolatile('typechange' as ID, {apparentType: pokemon.types.join('/')});
    if (pokemon.addedType) {
      this.addVolatile('typeadd' as ID, {type: pokemon.addedType});
    } else {
      this.removeVolatile('typeadd' as ID);
    }
  }

  isGrounded() {
    const battle = this.side.battle;
    if (battle.field.hasPseudoWeather('gravity' as ID)) {
      return true;
    } else if (this.volatiles['ingrain'] && battle.gen.num >= 4) {
      return true;
    } else if (this.volatiles['smackdown']) {
      return true;
    }

    let item = this.item;
    const ability = this.ability;
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
    return !(this.types.includes('Flying') || this.addedType === 'Flying');
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
    this.moveSlots = [];
    this.name = this.name || this.baseSpeciesForme;
  }

  destroy() {
    // @ts-ignore readonly
    this.side = null!;
  }
}
