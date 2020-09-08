'use strict';

const sim = require('@pkmn/sim');
const client = require('@pkmn/client');

// smogon/pokemon-showdown-client expects to be run in a Browser window and like
// smogon/pokemon-showdown, tramples all over the global namespace. As such, both projects cannot
// be loaded together (eg. both assign `globals.Dex` to different objects which do not have
// compatible interfaces).
const PSC = '../../vendor/pokemon-showdown-client';

window = global;
{
  window.BattleTeambuilderTable = require(`${PSC}/data/teambuilder-tables.js`).BattleTeambuilderTable;
  window.BattleAbilities = require(`${PSC}/data/abilities.js`).BattleAbilities;
  window.BattleItems = require(`${PSC}/data/items.js`).BattleItems;
  window.BattleMovedex = require(`${PSC}/data/moves.js`).BattleMovedex;
  window.BattlePokdex = require(`${PSC}/data/pokedex.js`).BattlePokdex;
  window.BattleTypeChart = require(`${PSC}/data/typechart.js`).BattleTypeChart;

  require(`${PSC}/js/battle-dex-data.js`);
  require(`${PSC}js/battle-dex.js`);
  require(`${PSC}/js/battle-scene-stub.js`);
  global.BattleText = require(`${PSC}/data/text.js`).BattleText;
  require(`${PSC}/js/battle-text-parser.js`);
  require(`${PSC}/js/battle.js`);
}

class Runner {
  constructor(options) {
  }

  async run() {
  }

  /*
// TODO verify text output matches
function processBattle(streams) {
  return Promise.all([
    processStream(streams.p1, 0),
    processStream(streams.p2, 1),
    // TODO spectator, omniscient?
  ]);
}

async function processStream(stream, perspective) {
  let expected = '';
  const ps = {battle: new Battle(), parser: new BattleTextParser(perspective)};
  ps.battle.scene.log = {
    add: (args, kwArgs) => {
      expected += ps.parser.extractMessage(args, kwArgs);
    }
  };

  const battle = new client.Battle();
  const handler = new client.Handler(battle);
  const formatter = new client.LogFormatter(perspective, battle);
  const pkmn = {battle, handler, formatter};

  while ((chunk = await stream.read())) {
    let actual = '';
    for (const line of chunk.split('\n')) {
      const {args, kwArgs} = Protocol.parseBattleLine(line);
      actual += pkmn.formatter.formatText(args, kwArgs);
      const key = Protocol.key(args);
      if (key && pkmn.handler[key]) pkmn.handler[key](args, kwArgs);
      ps.battle.add(line);
    }
    ps.battle.fastForwardTo(-1);
    assert.equal(actual, expected);
    // TODO verify battle states

    actual = '';
    expected = '';
  }
}
*/
}

class ClientExhausiveRunner extends ExhaustiveRunner {
  constructor(o) {
    super({...o, run: new Runner(o).run()});
  }
}

exports.ExhaustiveRunner = ClientExhaustiveRunner;