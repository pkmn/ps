import {ID, SideID} from '@pkmn/sim';
import {Protocol} from '@pkmn/protocol';

import {Battle} from './battle';
import {Pokemon} from './pokemon';

export class Side {
  readonly battle: Battle;
  readonly id: SideID;
  readonly n: number;

  // name: string;
  // avatar: string;
  // maxTeamSize: number;
  // foe: Side;
  // team: PokemonSet[];
  pokemon: Pokemon[];
  active: Pokemon[];

  // pokemonLeft: number;
  // faintedLastTurn: boolean;
  // faintedThisTurn: boolean;
  // zMoveUsed: boolean;

  // sideConditions: AnyObject;
  // slotConditions: AnyObject[];

  // activeRequest: AnyObject | null;
  // choice: Choice;

  // lastMove: Move | null;

  constructor(battle: Battle, n: number) {
    this.battle = battle;
    this.id = ['p1', 'p2', 'p3', 'p4'][n] as SideID;
    this.n = n;

    this.pokemon = [];
    this.active = [];
  }
}