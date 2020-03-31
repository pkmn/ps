const assert = require('assert').strict;

const psc = require('path').resolve('__dirname', '../../vendor/pokemon-showdown-client');

window = global;

window.BattleTeambuilderTable = require(`${psc}/data/teambuilder-tables.js`).BattleTeambuilderTable;
window.BattleAbilities = require(`${psc}/data/abilities.js`).BattleAbilities;
window.BattleItems = require(`${psc}/data/items.js`).BattleItems;
window.BattleMovedex = require(`${psc}/data/moves.js`).BattleMovedex;
window.BattlePokedex = require(`${psc}/data/pokedex.js`).BattlePokedex;
window.BattleTypeChart = require(`${psc}/data/typechart.js`).BattleTypeChart;

require(`${psc}/js/battle-dex-data.js`);
require(`${psc}/js/battle-dex.js`);
require(`${psc}/js/battle-scene-stub.js`);
global.BattleText = require(`${psc}/data/text.js`).BattleText;
require(`${psc}/js/battle-text-parser.js`);
require(`${psc}/js/battle.js`);

for (const id in BattlePokedex) {

}