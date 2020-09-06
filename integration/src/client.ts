import * as sim from '@pkmn/sim';
import * as client from '@pkmn/client';

// smogon/pokemon-showdown-client expects to be run in a Browser window and like
// smogon/pokemon-showdown, tramples all over the global namespace. As such, both projects cannot
// be loaded together (eg. both assign `globals.Dex` to different objects which do not have
// compatible interfaces).
const PSC = '../../vendor/pokemon-showdown-client';

(window as any) = global;
{
  (window as any).BattleTeambuilderTable = require(`${PSC}/data/teambuilder-tables.js`).BattleTeambuilderTable;
  (window as any).BattleAbilities = require(`${PSC}/data/abilities.js`).BattleAbilities;
  (window as any).BattleItems = require(`${PSC}/data/items.js`).BattleItems;
  (window as any).BattleMovedex = require(`${PSC}/data/moves.js`).BattleMovedex;
  (window as any).BattlePokdex = require(`${PSC}/data/pokedex.js`).BattlePokdex;
  (window as any).BattleTypeChart = require(`${PSC}/data/typechart.js`).BattleTypeChart;

  require(`${PSC}/js/battle-dex-data.js`);
  require(`${PSC}js/battle-dex.js`);
  require(`${PSC}/js/battle-scene-stub.js`);
  (global as any).BattleText = require(`${PSC}/data/text.js`).BattleText;
  require(`${PSC}/js/battle-text-parser.js`);
  require(`${PSC}/js/battle.js`);
}

// TODO verify text output matches
