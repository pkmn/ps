'use strict';

const assert = require('assert').strict;

const ps = {
  BattleStreams: require('../../../vendor/pokemon-showdown/.sim-dist/battle-stream'),
  Dex: require('../../../vendor/pokemon-showdown/.sim-dist').Dex,
  RandomPlayerAI:
    require('../../../vendor/pokemon-showdown/.sim-dist/tools/random-player-ai').RandomPlayerAI,
};
const pkmn = require('@pkmn/sim');

const {Verifier} = require('@pkmn/protocol/verifier');
const {TeamGenerators} = require('@pkmn/randoms');

pkmn.Dex.setTeamGeneratorFactory(TeamGenerators);

const FORMATS = [
  'gen8randombattle', 'gen8randomdoublesbattle', 'gen8monotyperandombattle',
  'gen7randombattle', 'gen7randomdoublesbattle', 'gen6randombattle', 'gen5randombattle',
  'gen4randombattle', 'gen3randombattle', 'gen2randombattle', 'gen1randombattle',
];

class MultiRandomRunner {
  constructor(options) {
    this.options = Object.assign({}, options);

    this.totalGames = options.totalGames;

    this.prng = (options.prng && !Array.isArray(options.prng))
      ? options.prng : new pkmn.PRNG(options.prng);
    this.options.prng = this.prng;

    this.format = options.format;
    this.cycle = !!options.cycle;
    this.all = !!options.all;

    this.formatIndex = 0;
    this.numGames = 0;
  }

  async run() {
    let games = [];
    let format;
    let lastFormat = false;
    let failures = 0;
    while ((format = this.getNextFormat())) {
      if (this.all && lastFormat && format !== lastFormat) {
        games = [];
      }

      const seed = this.prng.seed;
      const game = new Runner(Object.assign({format}, this.options)).run().catch(err => {
        failures++;
        console.error(
          `Run \`node integration/test sim 1 --format=${format} --seed=${seed.join()}\` ` +
          `to debug (optionally with \`--output\` and/or \`--input\` for more info):\n`,
          err
        );
      });

      await game;
      games.push(game);
      lastFormat = format;
    }
    return failures;
  }

  getNextFormat() {
    if (this.formatIndex > FORMATS.length) return false;

    if (this.numGames++ < this.totalGames) {
      if (this.format) {
        return this.format;
      } else if (this.all) {
        return FORMATS[this.formatIndex];
      } else if (this.cycle) {
        const format = FORMATS[this.formatIndex];
        this.formatIndex = (this.formatIndex + 1) % FORMATS.length;
        return format;
      } else {
        return this.prng.sample(FORMATS);
      }
    } else if (this.all) {
      this.numGames = 1;
      this.formatIndex++;
      return FORMATS[this.formatIndex];
    }

    return false;
  }
}

class Runner {
  constructor(options) {
    this.format = options.format;

    this.prng = (options.prng && !Array.isArray(options.prng))
      ? options.prng : new pkmn.PRNG(options.prng);
    this.p1options = options.p1options;
    this.p2options = options.p2options;

    this.error = !!options.error;
    this.input = !!options.input;
    this.output = !!options.output;
  }

  run() {
    const psStream = new PSRawStream(this.input);
    const pkmnStream = new PkmnRawStream();

    const game = this.runGame(this.format, psStream, pkmnStream);
    return !this.error ? game : game.catch(err => {
      console.log(`${psStream.rawInputLog.join('\n')}\n\n${pkmnStream.rawInputLog.join('\n')}`);
      throw err;
    });
  }

  async runGame(format, psStream, pkmnStream) {
    const psStreams = ps.BattleStreams.getPlayerStreams(psStream);
    const pkmnStreams = pkmn.BattleStreams.getPlayerStreams(pkmnStream);

    const formatid =
      format.slice(0, 4) + format.includes('doubles') ? 'doublescustomgame' : 'customgame';
    const spec = {formatid, seed: this.prng.seed};

    const teamSeed1 = this.newSeed();
    const teamSeed2 = this.newSeed();

    const psTeam1 = ps.Dex.generateTeam(format, {seed: teamSeed1});
    const psTeam2 = ps.Dex.generateTeam(format, {seed: teamSeed2});

    const pkmnTeam1 = pkmn.Dex.generateTeam(format, {seed: teamSeed1});
    const pkmnTeam2 = pkmn.Dex.generateTeam(format, {seed: teamSeed2});

    assert.deepStrictEqual(pkmnTeam1, psTeam1);
    assert.deepStrictEqual(pkmnTeam2, psTeam2);

    const p1spec = {name: 'Bot 1', ...this.p1options, team: pkmn.Dex.packTeam(pkmnTeam1)};
    const p2spec = {name: 'Bot 2', ...this.p2options, team: pkmn.Dex.packTeam(pkmnTeam2)};

    const p1options = {seed: this.newSeed(), move: 0.7, mega: 0.6, ...this.p1options};
    const p2options = {seed: this.newSeed(), move: 0.7, mega: 0.6, ...this.p2options};

    const psBot1 = new ps.RandomPlayerAI(psStreams.p1, p1options).start();
    const psBot2 = new ps.RandomPlayerAI(psStreams.p2, p2options).start();
    const pkmnBot1 = new pkmn.RandomPlayerAI(pkmnStreams.p1, p1options).start();
    const pkmnBot2 = new pkmn.RandomPlayerAI(pkmnStreams.p2, p2options).start();

    const start = `>start ${JSON.stringify(spec)}\n` +
      `>player p1 ${JSON.stringify(p1spec)}\n` +
      `>player p2 ${JSON.stringify(p2spec)}`;

    const psStart = psStreams.omniscient.write(start);
    const pkmnStart = pkmnStreams.omniscient.write(start);
    const streams = new AsyncIterableStreams(psStreams.omniscient, pkmnStreams.omniscient);

    for await (const [psChunk, pkmnChunk] of streams) {
      if (this.output) console.log(psChunk);
      assert.deepStrictEqual(pkmn.State.normalizeLog(pkmnChunk), pkmn.State.normalizeLog(psChunk));

      for (const line of psChunk.split('\n')) {
        const v = Verifier.verifyLine(line);
        assert(!v, `Invalid protocol: '${line}'`);
      }
    }
    assert.deepStrictEqual(pkmnStream.rawInputLog, psStream.rawInputLog);

    return Promise.all([
      psStreams.omniscient.writeEnd(), pkmnStreams.omniscient.writeEnd(),
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

exports.MultiRandomRunner = MultiRandomRunner;
