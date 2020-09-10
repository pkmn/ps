'use strict';

const {ExhaustiveRunner} = require('./client');

describe('client', () => {
  it('test', async () => {
    const opts = {prng: [1, 2, 3, 4]};
    for (const format of ExhaustiveRunner.FORMATS) {
      opts.format = format;
      expect(await (new ExhaustiveRunner(opts).run())).toEqual(0);
    }
  });
});
