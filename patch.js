const tie = 'sim/battle-queue.ts:405:15';

function insertChoice(choices, midTurn = false) {
  if (Array.isArray(choices)) {
    for (const choice of choices) {
      this.insertChoice(choice);
    }
    return;
  }
  const choice = choices;

  if (choice.pokemon) {
    choice.pokemon.updateSpeed();
  }
  const actions = this.resolveAction(choice, midTurn);

  let firstIndex = null;
  let lastIndex = null;
  for (const [i, curAction] of this.list.entries()) {
    const compared = this.battle.comparePriority(actions[0], curAction);
    if (compared <= 0 && firstIndex === null) {
      firstIndex = i;
    }
    if (compared < 0) {
      lastIndex = i;
      break;
    }
  }

  if (firstIndex === null) {
    this.list.push(...actions);
  } else {
    if (lastIndex === null) lastIndex = this.list.length;
    // FIX: Use "host" ordering before gen 3
    const index = firstIndex === lastIndex
      ? firstIndex : (this.battle.gen > 3)
        ? this.battle.random(firstIndex, lastIndex + 1)
        : lastIndex;
    this.list.splice(index, 0, ...actions);
  }
}

function eachEvent(eventid, effect, relayVar) {
  const actives = this.getAllActive();
  if (!effect && this.effect) effect = this.effect;
  // FIX: Do not speed sort handlers before gen 3 = use "host" ordering
  if (this.gen >= 3) this.speedSort(actives, (a, b) => b.speed - a.speed);
  for (const pokemon of actives) {
    this.runEvent(eventid, pokemon, null, effect, relayVar);
  }
  if (eventid === 'Weather' && this.gen >= 7) {
    this.eachEvent('Update');
  }
}

function residualEvent(eventid, relayVar) {
  const callbackName = `on${eventid}`;
  let handlers = this.findBattleEventHandlers(callbackName, 'duration');
  handlers = handlers.concat(
    this.findFieldEventHandlers(this.field, `onField${eventid}`, 'duration')
  );
  for (const side of this.sides) {
    if (side.n < 2 || !side.allySide) {
      handlers = handlers.concat(this.findSideEventHandlers(side, `onSide${eventid}`, 'duration'));
    }
    for (const active of side.active) {
      if (!active) continue;
      handlers = handlers.concat(
        this.findPokemonEventHandlers(active, callbackName, 'duration')
      );
      handlers = handlers.concat(
        this.findSideEventHandlers(side, callbackName, undefined, active)
      );
      handlers = handlers.concat(
        this.findFieldEventHandlers(this.field, callbackName, undefined, active)
      );
    }
  }
  // FIX: Do not speed sort handlers before gen 3 = use "host" ordering
  if (this.gen >= 3) this.speedSort(handlers);
  while (handlers.length) {
    const handler = handlers[0];
    handlers.shift();
    const effect = handler.effect;
    if ((handler.effectHolder).fainted) continue;
    if (handler.end && handler.state && handler.state.duration) {
      handler.state.duration--;
      if (!handler.state.duration) {
        const endCallArgs = handler.endCallArgs || [handler.effectHolder, effect.id];
        handler.end.call(...endCallArgs);
        if (this.ended) return;
        continue;
      }
    }

    let handlerEventid = eventid;
    if ((handler.effectHolder).sideConditions) handlerEventid = `Side${eventid}`;
    if ((handler.effectHolder).pseudoWeather) handlerEventid = `Field${eventid}`;
    if (handler.callback) {
      this.singleEvent(
        handlerEventid, effect, handler.state, handler.effectHolder,
        null, null, relayVar, handler.callback
      );
    }

    this.faintMessages();
    if (this.ended) return;
  }
}

// NOTE: These "patches" are not all suitable for upstreaming - each of these patches works around a
// core issue with Pokémon Showdown, but attempts to do so in the easiest/most minimally intrustive
// way as opposed to the most *correct* way. eg. instead of assigning "priorities" to no-op
// handlers, the handlers in question should be removed entirely (which can be accomplished by
// disabling inheritance or setting them to `null`). Similarly, in many places order should be used
// instead, or multiple other conditions should be changed as opposed to the ones chosen here etc.
const patch = {
  generation: (gen) => {
    // Add priorities to mods to avoid speed ties - ordering is arbitrary
    (gen.dex.data).Rulesets['sleepclausemod'].onSetStatusPriority = -999;
    (gen.dex.data).Rulesets['freezeclausemod'].onSetStatusPriority = -998;

    const conditions = {
      // Add priority to avoid speed ties with Bide's onDisableMove handler
      1: {'disable': {onDisableMovePriority: 7}},
      2: {
        // Type-boosting items need an onBasePowerPriority... for their nop handler
        'item: Pink Bow': {onBasePowerPriority: 15},
        'item: Polkadot Bow': {onBasePowerPriority: 15},
        // Inherited from Gen 4, doesn't actually use onBasePowerPriority...
        'item: Light Ball': {onBasePowerPriority: -999},
        'attract': {
          // Confusion -> Attraction -> Disable -> Paralysis, but Paralysis has been given (2)?
          onBeforeMovePriority: 4,
          // Cure attraction before berries proc
          onUpdatePriority: 1,
        },
        // Arbitrarily make trapped higher priority than partiallytrapped
        'trapped': {onTrapPokemonPriority: 1},
        // Minimize damage increase happens after damage calc and item boosts
        'minimize': {onSourceModifyDamagePriority: -1},
        // Give Disable priority over Encore and Bide
        'disable': {onDisableMovePriority: 1, onBeforeMovePriority: 1},
        // Order doesn't matter for crit ratio since addition is commutative
        'focusenergy': {onModifyCritRatioPriority: 1},
        // Match onAfterMoveSelfPriority
        'residualdmg': {onAfterSwitchInSelfPriority: 100},
      },
    };

    for (const [name, fields] of Object.entries((conditions)[gen.num])) {
      const condition = gen.dex.conditions.get(name);
      for (const field in fields) {
        (condition)[field] = (fields)[field];
      }
    }

    return gen;
  },
  battle: (battle, prng = false) => {
    battle.queue.insertChoice = insertChoice.bind(battle.queue);
    battle.eachEvent = eachEvent.bind(battle);
    battle.residualEvent = residualEvent.bind(battle);
    if (prng) {
      const shuffle = battle.prng.shuffle.bind(battle.prng);
      battle.prng.shuffle = (items, start = 0, end = items.length) => {
        if (location() !== tie) throw new Error('Unexpected shuffle');
        shuffle(items, start, end);
      };
    }
    return battle;
  },
};

const METHOD = /^ {4}at ((?:\w|\.)+) \((.*\d)\)/;
const NON_TERMINAL = new Set([
  'FixedRNG.next', 'FixedRNG.randomChance', 'FixedRNG.sample', 'FixedRNG.shuffle',
  'Battle.random', 'Battle.randomChance', 'Battle.sample', 'location', 'Battle.speedSort',
  'Battle.runEvent',
]);

function location() {
  for (const line of new Error().stack.split('\n').slice(1)) {
    const match = METHOD.exec(line);
    if (!match) continue;
    if (!NON_TERMINAL.has(match[1])) {
      return match[2].replaceAll(path.sep, '/').replace(/.*@pkmn\/sim\//, '');
    }
  }
  throw new Error('Unknown location');
}

module.exports = {patch};