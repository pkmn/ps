'use strict';

const assert = require('assert').strict;

const sim = require('@pkmn/sim');
const client = require('@pkmn/client');
const view = require('@pkmn/view');

const {Generations} = require('@pkmn/data');
const {Protocol} = require('@pkmn/protocol');
const {Verifier} = require('@pkmn/protocol/verifier');
const {ExhaustiveRunner} = require('@pkmn/sim/tools');

// smogon/pokemon-showdown-client expects to be run in a Browser window and like
// smogon/pokemon-showdown, tramples all over the global namespace. As such, both projects cannot
// be loaded together (eg. both assign `globals.Dex` to different objects which do not have
// compatible interfaces).
const PSC = '../../../vendor/pokemon-showdown-client';

/* global Battle, BattleTextParser */
const window = global;
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

const STATS = {};

// PS does not call scene.log.add for certain message types (sigh) - this usually would not be too
// important because they don't show up in the log, but this can effect the curLineSection (log
// processing is unfortunately stateful) and result in different output.
const UNLOGGED = new Set(['upkeep']);

class Runner {
  constructor(options) {
    this.format = options.format;

    this.prng = (options.prng && !Array.isArray(options.prng))
      ? options.prng : new sim.PRNG(options.prng);
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

    const tee1 = new TeedStream(streams.p1);
    const tee2 = new TeedStream(streams.p2);

    const p1 = this.p1options.createAI(tee1, {
      seed: this.newSeed(), move: 0.7, mega: 0.6, ...this.p1options,
    }).start();
    const p2 = this.p2options.createAI(tee2, {
      seed: this.newSeed(), move: 0.7, mega: 0.6, ...this.p2options,
    }).start();

    const start = streams.omniscient.write(
      `>start ${JSON.stringify(spec)}\n` +
      `>player p1 ${JSON.stringify(p1spec)}\n` +
      `>player p2 ${JSON.stringify(p2spec)}`
    );

    const all = [
      [streams.omniscient, 'p1'], [streams.omniscient, 'p2'],
      [streams.spectator, 'p1'], [streams.spectator, 'p2'],
      [tee1.sink, 'p1'], [tee1.sink, 'p2'],
      [tee2.sink, 'p1'], [tee2.sink, 'p2'],
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
      },
    };

    const gens = new Generations(sim.Dex);
    const battle = new client.Battle(gens);
    const formatter = new view.LogFormatter(perspective, battle);
    const pkmn = {battle, formatter, log: ''};

    for await (const chunk of stream) {
      if (output) output.push(chunk);

      for (const line of chunk.split('\n')) {
        const v = Verifier.verifyLine(line);
        assert(!v, `Invalid protocol: '${line}'`);

        // FIXME: workaround for crash in smogon/pokemon-showdown-client's animateMove...
        ps.battle.seeking = Infinity;
        ps.battle.add(line);


        const {args, kwArgs} = Protocol.parseBattleLine(line);
        if (args[0] != 'request') console.log(line);
        // if (['-block'].includes(args[0])) console.log(line);
        // TODO track shape of args?
        STATS[this.format] = STATS[this.format] || {};
        STATS[this.format][args[0]] = STATS[this.format][args[0]] || {};
        for (const k in kwArgs) {
          STATS[this.format][args[0]][k] = 1;
        }

        if (!UNLOGGED.has(args[0])) pkmn.log += pkmn.formatter.formatText(args, kwArgs);
        battle.add(args, kwArgs);
      }
      battle.update();

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

class TeedStream extends sim.Streams.ObjectReadWriteStream {
  constructor(source) {
    super();
    this.source = source;
    this.sink = new sim.Streams.ObjectReadStream({
      read() {},
    });
  }

  async _read() {
    const data = await this.source.read();

    if (data) {
      this.push(data);
      this.sink.push(data);
    } else {
      this.pushEnd();
      this.sink.pushEnd();
    }
  }

  write(data) {
    this.source.write(data);
  }
}

class ClientExhaustiveRunner extends ExhaustiveRunner {
  constructor(options) {
    super({...options, runner: o => new Runner(o).run()});
  }
}

exports.STATS = STATS;
exports.ExhaustiveRunner = ClientExhaustiveRunner;
exports.UNLOGGED = UNLOGGED;
