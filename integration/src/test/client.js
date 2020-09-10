'use strict';

const assert = require('assert').strict;

const sim = require('@pkmn/sim');
const client = require('@pkmn/client');

const {ExhaustiveRunner} = require('@pkmn/sim/tools');

// smogon/pokemon-showdown-client expects to be run in a Browser window and like
// smogon/pokemon-showdown, tramples all over the global namespace. As such, both projects cannot
// be loaded together (eg. both assign `globals.Dex` to different objects which do not have
// compatible interfaces).
const PSC = '../../../vendor/pokemon-showdown-client';

var window = global;
{
  window.BattleTeambuilderTable = require(`${PSC}/data/teambuilder-tables.js`).BattleTeambuilderTable;
  window.BattleAbilities = require(`${PSC}/data/abilities.js`).BattleAbilities;
  window.BattleItems = require(`${PSC}/data/items.js`).BattleItems;
  window.BattleMovedex = require(`${PSC}/data/moves.js`).BattleMovedex;
  window.BattlePokdex = require(`${PSC}/data/pokedex.js`).BattlePokdex;
  window.BattleTypeChart = require(`${PSC}/data/typechart.js`).BattleTypeChart;

  require(`${PSC}/js/battle-dex-data.js`);
  require(`${PSC}/js/battle-dex.js`);
  require(`${PSC}/js/battle-scene-stub.js`);
  global.BattleText = require(`${PSC}/data/text.js`).BattleText;
  require(`${PSC}/js/battle-text-parser.js`);
  require(`${PSC}/js/battle.js`);
}

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

    this.input = !!options.input;
    this.output = !!options.output;
    this.error = !!options.error;
  }

  async run() {
    const stream = new RawStream(this.input);
    const game = this.runGame(this.format, stream);
    return this.error ? game : game.catch(err => {
      console.log(`\n${stream.rawInputLog.join('\n')}\n`);
      throw err;
    });
  }

  async runGame(format, stream) {
    const streams = sim.BattleStreams.getPlayerStreams(stream);

    const spec = {formatid: format, seed: this.prng.seed};
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
      `>player p2 ${JSON.stringify(p2spec)};`);

    const all = [];
    all.push(this.process(streams.omniscient, 0, this.output));
    all.push(this.process(streams.omniscient, 1));
    all.push(this.process(streams.spectator, 0));
    all.push(this.process(streams.spectator, 1));
    all.push(this.process( streams.p1, 0));
    all.push(this.process(streams.p2, 1));

    return Promise.all([...all, streams.omniscient.writeEnd(), p1, p2, start]);
  }

  async process(stream, perspective, output) {
    const ps = {battle: new Battle(), parser: new BattleTextParser(perspective), log: ''};
    ps.battle.scene.log = {
      add: (args, kwArgs) => {
        ps.log += ps.parser.extractMessage(args, kwArgs);
      }
    };

    const battle = new client.Battle();
    const handler = new client.Handler(battle);
    const formatter = new client.LogFormatter(perspective, battle);
    const pkmn = {battle, handler, formatter, log: ''};

    for await (const chunk of stream) {
      for (const line of chunk.split('\n')) {
        const {args, kwArgs} = Protocol.parseBattleLine(line);
        pkmn.log += pkmn.formatter.formatText(args, kwArgs);
        const key = Protocol.key(args);
        if (key && pkmn.handler[key]) pkmn.handler[key](args, kwArgs);
        ps.battle.add(line);
      }
      ps.battle.fastForwardTo(-1);
      assert.deepStrictEqual(ps.log, pkmn.log);
    }
    if (output) console.log(chunk);
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

class RawStream extends sim.BattleStreams.BattleStream {
  constructor(input) {
    super();
    this.input = !!input;
    this.rawInputLog = [];
  }

  _write(message) {
    if (this.input) console.log(message);
    this.rawInputLog.push(message);
    super._write(message);
  }
}

class ClientExhaustiveRunner extends ExhaustiveRunner {
  constructor(o) {
    super({...o, run: new Runner(o).run()});
  }
}

exports.ExhaustiveRunner = ClientExhaustiveRunner;