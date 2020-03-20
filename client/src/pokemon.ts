import {ID} from '@pkmn/sim';
import {Protocol, PokemonDetails} from '@pkmn/protocol';

import {Side} from './side';

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

export class Pokemon {
  readonly side: Side;
  // readonly set: PokemonSet;
  // readonly name: string;
  // readonly fullname: string;
  // readonly id: string;
  // readonly species: string;
  // readonly speciesid: ps.ID;
  // readonly gender: GenderName;

  // readonly baseHpType: string;
  // readonly baseHpPower: number;

  // readonly baseMoveSlots: MoveSlot[];
  // moveSlots: MoveSlot[];

  // hpType: string;
  // hpPower: number;

  // position: number;
  details: PokemonDetails;

  // baseTemplate: Template;
  // template: Template;
  // speciesData: EffectState;

  // status: ID;
  // statusData: EffectState;
  // volatiles: {[id: string]: EffectState};
  // showCure?: boolean;

  // baseStoredStats: StatsTable;
  // storedStats: StatsExceptHPTable;
  // boosts: BoostsTable;

  // baseAbility: ID;
  // ability: ID;
  // abilityData: EffectState;

  // item: ID;
  // itemData: EffectState;
  // lastItem: ID;
  // usedItemThisTurn: boolean;
  // ateBerry: boolean;

  // trapped: boolean | "hidden";
  // maybeTrapped: boolean;
  // maybeDisabled: boolean;

  // illusion: Pokemon | null;
  // transformed: boolean;

  // maxhp: number;
  // baseMaxhp: number;
  // hp: number;
  // fainted: boolean;
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

  // lastMove: Move | null;
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

  constructor(side: Side, details: PokemonDetails, ) {
    this.side = side
    this.details = details;
  }
}