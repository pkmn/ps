'use strict';

const assert = require('assert').strict;

const ps = {BattleStreams: require('../../../vendor/pokemon-showdown/.sim-dist/battle-stream')};
const pkmn = require('@pkmn/sim');

const {Verifier} = require('@pkmn/protocol/verifier');
const {ExhaustiveRunner} = require('@pkmn/sim/tools');

class Runner {
  DEFAULT_CYCLES = ExhaustiveRunner.DEFAULT_CYCLES;
  MAX_FAILURES = ExhaustiveRunner.MAX_FAILURES;
  FORMATS = ExhaustiveRunner.FORMATS;

  constructor(options) {
    this.format = options.format;

    this.prng = (options.prng && !Array.isArray(options.prng)) ?
      options.prng : new pkmn.PRNG(options.prng);
    this.p1options = options.p1options;
    this.p2options = options.p2options;

    this.error = !!options.error;
  }

  run() {
    const psStream = new PSRawStream();
    const pkmnStream = new PkmnRawStream();

    const game = this.runGame(this.format, psStream, pkmnStream);
    return /*FIXME !*/this.error ? game : game.catch(err => {
      console.log(`${psStream.rawInputLog.join('\n')}\n\n${pkmnStream.rawInputLog.join('\n')}`);
      throw err;
    });
  }

  async runGame(format, psStream, pkmnStream) {
    const psStreams = ps.BattleStreams.getPlayerStreams(psStream);
    const pkmnStreams = pkmn.BattleStreams.getPlayerStreams(pkmnStream);

    const spec = {formatid: format, seed: this.prng.seed};
    const p1spec = {name: 'Bot 1', ...this.p1options};
    const p2spec = {name: 'Bot 2', ...this.p2options};
    const p1options = {seed: this.newSeed(), move: 0.7, mega: 0.6, ...this.p1options};
    const p2options = {seed: this.newSeed(), move: 0.7, mega: 0.6, ...this.p2options};

    const psBot1 = this.p1options.createAI(psStreams.p1, p1options).start();
    const psBot2 = this.p2options.createAI(psStreams.p2, p2options).start();
    const pkmnBot1 = this.p1options.createAI(pkmnStreams.p1, p1options).start();
    const pkmnBot2 = this.p2options.createAI(pkmnStreams.p2, p2options).start();

    const start = `>start ${JSON.stringify(spec)}\n` +
      `>player p1 ${JSON.stringify(p1spec)}\n` +
      `>player p2 ${JSON.stringify(p2spec)}`;

    const psStart = psStreams.omniscient.write(start);
    const pkmnStart = pkmnStreams.omniscient.write(start);
    const streams = new AsyncIterableStreams(psStreams.omniscient, pkmnStreams.omniscient);

    for await (const [psChunk, pkmnChunk] of streams) {
      assert.deepStrictEqual(pkmn.State.normalizeLog(pkmnChunk), pkmn.State.normalizeLog(psChunk));

      for (const line of psChunk.split('\n')) {
        const v = Verifier.verifyLine(line);
        assert(!v, `Invalid protocol: '${line}'`);
      }
    }
    assert.deepStrictEqual(pkmnStream.rawInputLog, psStream.rawInputLog);

    return Promise.all([
      psStream.omniscient.writeEnd(), pkmnStreams.omniscient.writeEnd(),
      psBot1, psBot2, pkmnBot1, pkmnBot2, psStart, pkmnStart,
    ]);
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

class PSRawStream extends ps.BattleStreams.BattleStream {
  constructor() {
    super();
    this.rawInputLog = [];
  }

  _write(message) {
    this.rawInputLog.push(message);
    super._write(message);
  }
}

class PkmnRawStream extends pkmn.BattleStreams.BattleStream {
  constructor() {
    super();
    this.rawInputLog = [];
  }

  _write(message) {
    this.rawInputLog.push(message);
    super._write(message);
  }
}

class AsyncIterableStreams {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  [Symbol.asyncIterator]() { return this; }
  async next() {
    const ab = await Promise.all([this.a.next(), this.b.next()]);
    return {value: [ab[0].value, ab[1].value], done: ab[0].done || ab[1].done};
  }
}

class SimExhaustiveRunner extends ExhaustiveRunner {
  constructor(options) {
    super({...options, runner: o => new Runner(o).run()});
  }
}

exports.ExhaustiveRunner = SimExhaustiveRunner;
