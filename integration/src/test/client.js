'use strict';

const assert = require('assert').strict;

const sim = require('@pkmn/sim');
const client = require('@pkmn/client');
const view = require('@pkmn/view');

const {Protocol} = require('@pkmn/protocol');
const {ExhaustiveRunner} = require('@pkmn/sim/tools');

// smogon/pokemon-showdown-client expects to be run in a Browser window and like
// smogon/pokemon-showdown, tramples all over the global namespace. As such, both projects cannot
// be loaded together (eg. both assign `globals.Dex` to different objects which do not have
// compatible interfaces).
const PSC = '../../../vendor/pokemon-showdown-client';

var window = global;
{
  window.BattleStatusAnims = {};
  window.BattleTeambuilderTable =
    require(`${PSC}/data/teambuilder-tables.js`).BattleTeambuilderTable;
  window.BattleAbilities = require(`${PSC}/data/abilities.js`).BattleAbilities;
  window.BattleItems = require(`${PSC}/data/items.js`).BattleItems;
  window.BattleMovedex = require(`${PSC}/data/moves.js`).BattleMovedex;
  window.BattlePokedex = require(`${PSC}/data/pokedex.js`).BattlePokedex;
  window.BattleTypeChart = require(`${PSC}/data/typechart.js`).BattleTypeChart;

  require(`${PSC}/js/battle-dex-data.js`);
  require(`${PSC}/js/battle-dex.js`);
  require(`${PSC}/js/battle-scene-stub.js`);
  global.BattleText = require(`${PSC}/data/text.js`).BattleText;
  require(`${PSC}/js/battle-text-parser.js`);
  require(`${PSC}/js/battle.js`);
}

// PS does not call scene.log.add for certain message types (sigh) - this usually would not be too
// important because they don't show up in the log, but this can effect the curLineSection (log
// processing is unfortunately stateful) and result in different output.
const UNLOGGED = new Set(['upkeep']);

class Runner {
  DEFAULT_CYCLES = ExhaustiveRunner.DEFAULT_CYCLES;
  MAX_FAILURES = ExhaustiveRunner.MAX_FAILURES;
  FORMATS = ExhaustiveRunner.FORMATS;

  constructor(options) {
    this.format = options.format;

    this.prng = (options.prng && !Array.isArray(options.prng)) ?
      options.prng : new sim.PRNG(options.prng);
    this.p1options = options.p1options;
    this.p2options = options.p2options;

    this.error = !!options.error;
  }

  async run() {
    const output = [];
    const game = this.runGame(output);
    return !this.error ? game : game.catch(err => {
      console.log(`\n${output.join('\n')}\n`);
      throw err;
    });
  }

  async runGame(output) {
    const streams = sim.BattleStreams.getPlayerStreams(new sim.BattleStreams.BattleStream());

    const spec = {formatid: this.format, seed: this.prng.seed};
    const p1spec = {name: 'Bot 1', ...this.p1options};
    const p2spec = {name: 'Bot 2', ...this.p2options};

    const p1 = this.p1options.createAI(streams.p1, {
      seed: this.newSeed(), move: 0.7, mega: 0.6, ...this.p1options
    }).start();
    const p2 = this.p2options.createAI(streams.p2, {
      seed: this.newSeed(), move: 0.7, mega: 0.6, ...this.p2options
    }).start();

    const start = streams.omniscient.write(
      `>start ${JSON.stringify(spec)}\n` +
      `>player p1 ${JSON.stringify(p1spec)}\n` +
      `>player p2 ${JSON.stringify(p2spec)}`);

    const all = [
      [streams.omniscient, 0], [streams.omniscient, 1],
      [streams.spectator, 0], [streams.spectator, 1],
    ];
    const [stream, perspective] = this.prng.sample(all);
    await this.process(stream, perspective, output);

    return Promise.all([streams.p2.writeEnd(), p1, p2, start]);
  }

  async process(stream, perspective, output) {
    const ps = {battle: new Battle(), parser: new BattleTextParser(perspective), log: ''};
    ps.battle.scene.log = {
      add: (args, kwArgs) => {
        ps.log += ps.parser.parseArgs(args, kwArgs || {});
      }
    };

    const battle = new client.Battle(sim.Dex);
    const formatter = new view.LogFormatter(perspective, battle);
    const pkmn = {battle, formatter, log: ''};

    for await (const chunk of stream) {
      if (output) output.push(chunk);

      for (const line of chunk.split('\n')) {
        ps.battle.add(patch(line));
        ps.battle.fastForwardTo(-1);
        const {args, kwArgs} = Protocol.parseBattleLine(line);
        if (!UNLOGGED.has(args[0])) pkmn.log += pkmn.formatter.formatText(args, kwArgs);
        battle.add(args, kwArgs);
      }
      assert.deepStrictEqual(pkmn.log, ps.log);
      pkmn.log = '';
      ps.log = '';
    }
  }

  // Same as PRNG#generatedSeed, only deterministic.
  // NOTE: advances this.prng's seed by 4.
  newSeed() {
    return [
      Math.floor(this.prng.next() * 0x10000),
      Math.floor(this.prng.next() * 0x10000),
      Math.floor(this.prng.next() * 0x10000),
      Math.floor(this.prng.next() * 0x10000),
    ];
  }
}

function patch(line) {
  const {args} = Protocol.parseBattleLine(line);
  // FIXME: workaround for an interaction between Wandering Spirit and Protective Pads
  if (line.startsWith('|-activate|') && args[0] === '-ability' && args[2] === 'Wandering Spirit') {
    return '|' + args.join('|');
  }
  return line;
}

class ClientExhaustiveRunner extends ExhaustiveRunner {
  constructor(options) {
    super({...options, runner: o => new Runner(o).run()});
  }
}

exports.ExhaustiveRunner = ClientExhaustiveRunner;