import {Protocol} from '@pkmn/protocol';
import {ID} from '@pkmn/types';

import {toID} from './common';

type Choice = MoveChoice | SwitchChoice | ShiftChoice;

interface MoveChoice {
  choiceType: 'move';
  move: number; // 1-based
  targetLoc: number;
  mega: boolean;
  megax: boolean;
  megay: boolean;
  ultra: boolean;
  max: boolean;
  z: boolean;
  tera: boolean;
}

interface SwitchChoice {
  choiceType: 'switch' | 'team';
  targetPokemon: number; // 1-based
}

interface ShiftChoice {
  choiceType: 'shift';
}

export interface Data {
  getSpecies(species?: string): Readonly<{baseSpecies?: string}> | undefined;
}

export class ChoiceBuilder {
  request: Protocol.Request;
  choices: string[] = [];
  // Currently active partial move choice
  current: MoveChoice = {
    choiceType: 'move',
    move: 0,
    // NOTE: should always be 0 - not partial if `targetLoc` is known
    targetLoc: 0,
    mega: false,
    megax: false,
    megay: false,
    ultra: false,
    z: false,
    max: false,
    tera: false,
  };
  alreadySwitchingIn: number[] = [];
  alreadyMega = false;
  alreadyMax = false;
  alreadyZ = false;
  alreadyTera = false;
  serializedChoice: string | null = null;

  constructor(request: Protocol.Request) {
    this.request = request;
    this.fillPasses();
  }

  private fillPasses() {
    const r = this.request;
    switch (r.requestType) {
      case 'move':
        while (this.choices.length < r.active.length &&
					!r.active[this.choices.length] ||
					r.side?.pokemon[this.choices.length]?.commanding) {
          this.choices.push('pass');
        }
        break;
      case 'switch':
        while (this.choices.length < r.forceSwitch.length) {
          if (!r.forceSwitch[this.choices.length] || this.noMoreSwitchChoices()) {
            this.choices.push('pass');
          } else {
            break;
          }
        }
    }
  }

  isDone() {
    return !!this.serializedChoice || this.choices.length >= this.requestLength();
  }

  isEmpty() {
    if (this.serializedChoice) return false;
    for (const choice of this.choices) {
      if (choice !== 'pass') return false;
    }
    return !this.current.move;
  }

  previous(data?: Data) {
    const previous = new ChoiceBuilder(this.request);
    const choices = this.choices.slice();
    let partialChoice = '';

    if (!this.current.move && !this.serializedChoice) {
      while (choices[choices.length - 1] === 'pass') choices.pop();
      const lastChoiceString = choices.pop();
      if (lastChoiceString) {
        const lastChoice = this.parseChoice(lastChoiceString, data, choices.length);
        if (lastChoice?.choiceType === 'move' && lastChoice.targetLoc) {
          lastChoice.targetLoc = 0;
          partialChoice = this.stringChoice(lastChoice);
        }
      }
    }
    for (const choice of choices) {
      if (choice === 'pass') continue;
      const possibleError = previous.addChoice(choice, data);
      if (possibleError) throw new Error(possibleError);
    }
    if (partialChoice) {
      const possibleError = previous.addChoice(partialChoice, data);
      if (possibleError) throw new Error(possibleError);
    }
    return previous;
  }

  index() {
    return this.choices.length;
  }

  requestLength() {
    switch (this.request.requestType) {
      case 'move':
        return this.request.active.length;
      case 'switch':
        return this.request.forceSwitch.length;
      case 'team':
        if (this.request.maxTeamSize) return this.request.maxTeamSize;
        return 1;
      case 'wait':
        return 0;
    }
  }

  currentMoveRequest() {
    return this.request.requestType === 'move' ? this.request.active[this.index()] : undefined;
  }

  isReviving(index = this.index()) {
    if (this.request.requestType !== 'switch') return false;
    return !!this.request.side?.pokemon[index]?.reviving;
  }

  noMoreSwitchChoices() {
    if (this.request.requestType !== 'switch' || !this.request.side) return false;
    const isReviving = this.isReviving();
    const firstChoice = isReviving ? 0 : this.requestLength();
    for (let i = firstChoice; i < this.request.side.pokemon.length; i++) {
      const pokemon = this.request.side.pokemon[i];
      if (!!pokemon.fainted === isReviving && !this.alreadySwitchingIn.includes(i + 1)) {
        return false;
      }
    }
    return true;
  }

  addChoice(choiceString: string, data?: Data) {
    if (this.request.requestType === 'wait') return 'It\'s not your turn to choose anything';
    if (this.isDone()) return 'You\'ve already chosen for this turn; cancel to change your choice';
    if (choiceString === 'auto' || choiceString === 'default') {
      const currentChoice = this.toString();
      this.serializedChoice = currentChoice ? `${currentChoice}, default` : 'default';
      return undefined;
    }
    let choice: Choice | undefined;
    try {
      choice = this.parseChoice(choiceString, data);
    } catch (err) {
      return (err as Error).message;
    }
    if (!choice) return 'The client handles passes for you automatically already';
    if (choice.choiceType === 'move') {
      if (!choice.targetLoc && this.requestLength() > 1) {
        const choosableTargets =
          ['normal', 'any', 'adjacentAlly', 'adjacentAllyOrSelf', 'adjacentFoe'];
        const move = this.getChosenMove(choice, this.index());
        if ('target' in move && choosableTargets.includes(move.target)) {
          this.current.move = choice.move;
          this.current.mega = choice.mega;
          this.current.megax = choice.megax;
          this.current.megay = choice.megay;
          this.current.ultra = choice.ultra;
          this.current.z = choice.z;
          this.current.max = choice.max;
          this.current.tera = choice.tera;
          return undefined;
        }
      }
      if (choice.mega || choice.megax || choice.megay) this.alreadyMega = true;
      if (choice.z) this.alreadyZ = true;
      if (choice.max) this.alreadyMax = true;
      if (choice.tera) this.alreadyTera = true;
      this.current.move = 0;
      this.current.mega = false;
      this.current.megax = false;
      this.current.megay = false;
      this.current.ultra = false;
      this.current.z = false;
      this.current.max = false;
      this.current.tera = false;
    } else if (choice.choiceType === 'switch' || choice.choiceType === 'team') {
      if (this.alreadySwitchingIn.includes(choice.targetPokemon)) {
        if (choice.choiceType === 'switch') {
          return 'You\'ve already chosen to switch that Pokémon in';
        }
        // remove choice instead
        for (let i = 0; i < this.alreadySwitchingIn.length; i++) {
          if (this.alreadySwitchingIn[i] === choice.targetPokemon) {
            this.alreadySwitchingIn.splice(i, 1);
            this.choices.splice(i, 1);
            return undefined;
          }
        }
        return 'Unexpected bug, please report this';
      }
      this.alreadySwitchingIn.push(choice.targetPokemon);
    } else if (choice.choiceType === 'shift') {
      if (this.index() === 1) {
        return 'Only Pokémon not already in the center can shift to the center';
      }
    }
    this.choices.push(this.stringChoice(choice));
    this.fillPasses();
    return undefined;
  }

  addChoices(choiceString: string, data?: Data) {
    let choiceStrings: string[];
    if (choiceString.startsWith('team ')) {
      let teamChoice = choiceString.slice(5).trim();
      const isBracketedTeam = teamChoice.startsWith('[') && teamChoice.endsWith(']');
      if (isBracketedTeam) teamChoice = teamChoice.slice(1, -1).trim();
      const teamChoices =
        isBracketedTeam ||
        teamChoice.includes(',') ||
        (this.request.side?.pokemon.length ?? 0) >= 10
          ? teamChoice.split(',')
          : (/^[0-9]+$/.test(teamChoice) ? teamChoice.split('') : [teamChoice]);
      choiceStrings =
        teamChoices.slice(0, this.requestLength()).map(choice => `team ${choice.trim()}`);
    } else {
      choiceStrings = choiceString.split(',').map(choice => choice.trim());
    }
    for (const choice of choiceStrings) {
      const possibleError = this.addChoice(choice, data);
      if (possibleError) return possibleError;
    }
    if (this.request.requestType === 'team' && choiceString.startsWith('team ')) {
      for (let i = 1; this.choices.length < this.requestLength(); i++) {
        if (this.alreadySwitchingIn.includes(i)) continue;
        const possibleError = this.addChoice(`team ${i}`, data);
        if (possibleError) return possibleError;
      }
    }
    return undefined;
  }

  private parseChoice(
    choice: string,
    data?: Data,
    index = this.choices.length
  ): Choice | undefined {
    const request = this.request;
    if (request.requestType === 'wait') throw new Error('It\'s not your turn to choose anything');

    if (choice === 'shift') return {choiceType: 'shift'};

    if (choice.startsWith('move ')) {
      if (request.requestType !== 'move') {
        throw new Error('You must switch in a Pokémon, not move');
      }
      const moveRequest = request.active[index]!;
      choice = choice.slice(5);
      const current: MoveChoice = {
        choiceType: 'move',
        move: 0,
        targetLoc: 0,
        mega: false,
        megax: false,
        megay: false,
        ultra: false,
        z: false,
        max: false,
        tera: false,
      };
      while (true) {
        // If data ends with a number, treat it as a target location.
        // We need to special case 'Conversion 2' so it doesn't get
        // confused with 'Conversion' erroneously sent with the target
        // '2' (since Conversion targets 'self', targetLoc can't be 2).
        if (/\s(?:-|\+)?[1-3]$/.test(choice) && toID(choice) !== 'conversion2') {
          if (current.targetLoc) throw new Error('Move choice has multiple targets');
          current.targetLoc = parseInt(choice.slice(-2));
          choice = choice.slice(0, -2).trim();
        } else if (choice.endsWith(' mega')) {
          current.mega = true;
          choice = choice.slice(0, -5);
        } else if (choice.endsWith(' megax')) {
          current.megax = true;
          choice = choice.slice(0, -6);
        } else if (choice.endsWith(' megay')) {
          current.megay = true;
          choice = choice.slice(0, -6);
        } else if (choice.endsWith(' zmove')) {
          current.z = true;
          choice = choice.slice(0, -6);
        } else if (choice.endsWith(' ultra')) {
          current.ultra = true;
          choice = choice.slice(0, -6);
        } else if (choice.endsWith(' dynamax')) {
          current.max = true;
          choice = choice.slice(0, -8);
        } else if (choice.endsWith(' max')) {
          current.max = true;
          choice = choice.slice(0, -4);
        } else if (choice.endsWith(' terastallize')) {
          current.tera = true;
          choice = choice.slice(0, -13);
        } else if (choice.endsWith(' terastal')) {
          current.tera = true;
          choice = choice.slice(0, -9);
        } else {
          break;
        }
      }

      if (/^[0-9]+$/.test(choice)) {
        // Parse a one-based move index.
        current.move = parseInt(choice);
      } else {
        // Parse a move ID. Move names are also allowed, but may cause ambiguity.
        let moveid = toID(choice);
        if (moveid.startsWith('hiddenpower')) moveid = 'hiddenpower' as ID;

        for (let i = 0; i < moveRequest.moves.length; i++) {
          if (moveid === moveRequest.moves[i].id) {
            current.move = i + 1;
            break;
          }
        }
        if (!current.move && moveRequest.zMoves) {
          for (let i = 0; i < moveRequest.zMoves.length; i++) {
            if (!moveRequest.zMoves[i]) continue;
            if (moveid === moveRequest.zMoves[i]!.id) {
              current.move = i + 1;
              current.z = true;
              break;
            }
          }
        }
        if (!current.move && moveRequest.maxMoves) {
          for (let i = 0; i < moveRequest.maxMoves.length; i++) {
            if (moveid === moveRequest.maxMoves[i].id) {
              current.move = i + 1;
              current.max = true;
              break;
            }
          }
        }
      }
      if (current.max && !moveRequest.canDynamax) current.max = false;
      return current;
    }

    if (choice.startsWith('switch ') || choice.startsWith('team ')) {
      choice = choice.slice(choice.startsWith('team ') ? 5 : 7);
      const isTeamPreview = request.requestType === 'team';
      const current: SwitchChoice = {
        choiceType: isTeamPreview ? 'team' : 'switch',
        targetPokemon: 0,
      };
      if (choice === 'notMine') throw new Error('You cannot decide for your partner!');
      if (/^[0-9]+$/.test(choice)) {
        // Parse a one-based move index.
        current.targetPokemon = parseInt(choice);
      } else {
        // Parse a pokemon name
        const lowerChoice = choice.toLowerCase();
        const choiceid = toID(choice);
        let matchLevel = 0;
        let match = 0;
        for (let i = 0; i < request.side.pokemon.length; i++) {
          const p = request.side.pokemon[i];
          let curMatchLevel = 0;
          if (choice === p.name) {
            curMatchLevel = 10;
          } else if (lowerChoice === p.name.toLowerCase()) {
            curMatchLevel = 9;
          } else if (choiceid === toID(p.name)) {
            curMatchLevel = 8;
          } else if (choiceid === toID(p.speciesForme)) {
            curMatchLevel = 7;
          } else if (data && choiceid === toID(data.getSpecies(p.speciesForme)?.baseSpecies)) {
            curMatchLevel = 6;
          }
          if (curMatchLevel > matchLevel) {
            match = i + 1;
            matchLevel = curMatchLevel;
          }
        }
        if (!match) throw new Error(`Couldn't find Pokémon '${choice}' to switch to`);
        current.targetPokemon = match;
      }
      const target = request.side.pokemon[current.targetPokemon - 1];
      const isReviving = this.isReviving(index);
      if (!target) throw new Error(`Couldn't find Pokémon '${choice}' to switch to!`);
      if (!isTeamPreview && !isReviving && current.targetPokemon - 1 < this.requestLength()) {
        throw new Error('That Pokémon is already in battle!');
      }
      if (isReviving && target.fainted) return current;
      if (isReviving && !target.fainted) {
        throw new Error(`${target.name} still has energy to battle!`);
      }
      if (target.fainted) throw new Error(`${target.name} is fainted and cannot battle!`);
      return current;
    }

    if (choice === 'pass') return undefined;

    throw new Error(`Unrecognized choice '${choice}'`);
  }

  private getChosenMove(choice: MoveChoice, pokemonIndex: number) {
    const request = this.request as Protocol.MoveRequest;
    const activePokemon = request.active[pokemonIndex]!;
    const moveIndex = choice.move - 1;
    if (choice.z) return activePokemon.zMoves![moveIndex]!;
    if (choice.max || (activePokemon.maxMoves && !activePokemon.canDynamax)) {
      return activePokemon.maxMoves![moveIndex];
    }
    return activePokemon.moves[moveIndex];
  }

  toString() {
    if (this.serializedChoice) return this.serializedChoice;
    let choices = this.choices;
    if (this.current.move) choices = choices.concat(this.stringChoice(this.current));
    return choices.join(', ').replace(/, team /g, ', ');
  }

  private stringChoice(choice?: Choice) {
    if (!choice) return 'pass';
    switch (choice.choiceType) {
      case 'move': {
        const target =
          choice.targetLoc ? ` ${choice.targetLoc > 0 ? '+' : ''}${choice.targetLoc}` : '';
        const boost = `${choice.max ? ' max' : ''}${
          choice.mega ? ' mega' : ''}${
          choice.megax ? ' megax' : ''}${
          choice.megay ? ' megay' : ''}${
          choice.ultra ? ' ultra' : ''}${
          choice.z ? ' zmove' : ''}${
          choice.tera ? ' terastallize' : ''}`;
        return `move ${choice.move}${boost}${target}`;
      }
      case 'switch':
      case 'team':
        return `${choice.choiceType} ${choice.targetPokemon}`;
      case 'shift':
        return 'shift';
    }
  }
}
