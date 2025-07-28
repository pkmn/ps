'use strict';

const fs = require('fs');

const {Battle} = require('@pkmn/client');
const {Generations} = require('@pkmn/data');
const {Protocol} = require('@pkmn/protocol');
const {Dex} = require('@pkmn/sim');
const {LogFormatter} = require('@pkmn/view');

const {ExhaustiveRunner, UNLOGGED} = require('./client');

const SKIPPED = new Set([]);

describe('client', () => {
  it('test', async () => {
    const opts = {prng: [1, 2, 3, 4]};
    for (const format of ExhaustiveRunner.FORMATS) {
      opts.format = format;
      expect(await (new ExhaustiveRunner(opts).run())).toBe(0);
    }
  });

  it('fixtures', () => {
    for (const name of fs.readdirSync(`${__dirname}/fixtures/input`)) {
      if (SKIPPED.has(name)) continue;

      const input = fs.readFileSync(`${__dirname}/fixtures/input/${name}`, 'utf8');
      const expected = fs.readFileSync(`${__dirname}/fixtures/output/${name}`, 'utf8');
      const perspective = name.endsWith('p1.log') ? 'p1' : 'p2';

      const gens = new Generations(Dex);
      const battle = new Battle(gens);
      const formatter = new LogFormatter(perspective, battle);

      let actual = '';
      for (const line of input.split('\n')) {
        const {args, kwArgs} = Protocol.parseBattleLine(line);
        if (!UNLOGGED.has(args[0])) actual += formatter.formatText(args, kwArgs);
        battle.add(args, kwArgs);
      }
      try {
        expect(actual).toEqual(expected);
      } catch (e) {
        console.error(name);
        throw e;
      }
    }
  });
});
