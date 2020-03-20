import {ID} from '@pkmn/sim';
import {Protocol} from '@pkmn/protocol';

import {Side} from './side';

// interface FaintedPokemon {
//  target: Pokemon;
//  source: Pokemon | null;
//  effect: Effect | null;
// }

export class Battle  {
  // readonly debugMode: boolean;
  // readonly strictChoices: boolean;
  // readonly formatid: ps.ID;
  // readonly formatData: AnyObject;
  // readonly gameType: GameType;
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

  id: Protocol.RoomID;

  constructor(id: Protocol.RoomID) {
    this.id = id;
  }
}