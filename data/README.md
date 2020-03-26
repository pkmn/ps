# @pkmn/sets

[![npm version](https://img.shields.io/npm/v/@pkmn/data.svg)](https://www.npmjs.com/package/@pkmn/data)&nbsp;

A forked implementation of [smogon/pokemon-showdown-client][0]'s data layer, with minor differences:

- learnsets data is `async`
- `Dex` and `ModdedDex` behave more similarly to their server side counterparts
- there is an alternative entrypoint named `Generations` which provides difference semantics around
  existence and legality

This package is distributed under the terms of the [MIT License][1].
Substantial amounts of the code have been derived from the portions of Guangcong
Luo's [Pokémon Showdown client][0] which are distributed under the [MIT License][2].

  [0]: https://github.com/smogon/pokemon-showdown-client
  [1]: https://github.com/pkmn/ps/blob/master/data/LICENSE
  [2]: https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6
