'use strict';

const {MultiRandomRunner} = require('./sim');

describe.skip('sim', () => {
  it('test', async () => {
    const opts = {totalGames: 100, prng: [1, 2, 3, 4]};
    expect(await (new MultiRandomRunner(opts).run())).toBe(0);
  });
});
