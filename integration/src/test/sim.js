'use strict';

const assert = require('assert').strict;

const ps = require('../../../vendor/pokemon-showdown/.sim-dist');
const pkmn = require('@pkmn/sim');

const {Verifier} = require('@pkmn/protocol/verifier');
const {ExhaustiveRunner} = require('@pkmn/sim/tools');

class Runner {
  constructor(options) {
    this.format = options.format;

    this.prng = (options.prng && !Array.isArray(options.prng)) ?
      options.prng : new pkmn.PRNG(options.prng);
    this.p1options = options.p1options;
    this.p2options = options.p2options;

    this.input = !!options.input;
    this.output = !!options.output;
    this.error = !!options.error;
  }

  async run() {
    const psStream = new RawStream('C', this.input);
    const pkmnStream = new RawStream('T', this.input);

    const game = this.runGame(this.format, psStream, pkmnStream);
    return this.error ? game : game.catch(err => {
      console.log(`\n${psStream.rawInputLog.join('\n')}\n${pkmnStream.rawInputLog.join('\n')}\n`);
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
      `>player p2 ${JSON.stringify(p2spec)};`;

    const psStart = psStreams.omniscient.write(start);
    const pkmnStart = pkmnStreams.omniscient.write(start);

    for await (const [psChunk, pkmnChunk] of Promise.all([
      psStreams.omniscient.read(), pkmnStreams.omniscient.read()
    ])) {
      assert.deepStrictEqual(psStream, pkmnChunk);
      assert.deepStrictEqual(pkmn.State.normalizeLog(psChunk), pkmn.State.normalizeLog(pkmnChunk));

      const v = Verifier.verify()
      assert(!v, `Invalid protocol: '${psChunk}'`);

      if (this.output) console.log(`[C] ${psChunk}\n[T] ${pkmnChunk}`);
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

class RawStream extends pkmn.BattleStreams.BattleStream {
  constructor(type, input) {
    super();
    this.type = type;
    this.input = !!input;
    this.rawInputLog = [];
  }

  _write(message) {
    if (this.input) console.log(`[${this.type}] ${message}`);
    this.rawInputLog.push(message);
    super._write(message);
  }
}

class SimExhausiveRunner extends ExhaustiveRunner {
  constructor(o) {
    super({...o, run: new Runner(o).run()});
  }
}

exports.ExhaustiveRunner = SimExhausiveRunner;
