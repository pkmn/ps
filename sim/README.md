# @pkmn/sim

[![npm version](https://img.shields.io/npm/v/@pkmn/sim.svg)](https://www.npmjs.com/package/@pkmn/sim)&nbsp;

An automatically generated extraction of just the simulator portion of [smogon/pokemon-showdown][0].

The package aims to meet the following requirements:

- stay as close to `sim/` from `smogon/pokemon-showdown` as possible
- be usable as a typed and verisoned module that exports a [`@pkmn/dex-types`][2]-compatible data
  layer
- be usable in the browser environment

To that end, any [divergence](#changes) from the canonical Pokémon Shwowdown `sim/` directory can be explained
as desirable to meet one of more of these requirements.

If you do not need typed and versioned module or do not require the ability to run a the full blown
simulator and/or validator code in the browser, **you will probably be better off vendoring the
`smogon/pokemon-showdown` in your project.**

If you simply want access to the Pokémon Showdown's data layer but do not care about any of the
logic required to implement the game mechanics and battle system, **please see [`@pkmn/data`][3] (or
[`@pkmn/dex`][4]).**

## Changes

Pokémon Showdown's `sim/` directory has been modified in the following ways:

- **`import` and `export` statements have been added** as needed to allow consumers to use this
  package with TypeScript without type errors. Internally, Pokémon Showdown uses global type
  definitions which are not accessible to third-party developers and the code will not type check
  when used externally without these additions. Pokémon Showdown's internal type setup is also
  fairly convoluted - because of global definitions there is quite a bit of merging going on and
  with explicit `import` and `export` statements the TypeScript compiler better able to detect type
  errors. `index.ts` files have been added to each of the generations in `data/`, and the files
  which exist at the top level of `data/` in `smogon/pokemon-showdown` have been moved to
  `data/gen8`.
- **only Gens 1 - 8 are supported, no other mods**. Generation 8 as the `base` mod is supported as
  with Pokémon Showdown, but after that only the canconical `genN` mods are supported (no Stadium,
  Let's Go, or pet mods). The `Dex#mod` method will `throw` if an unsupported mod is requested.
  A `Dex#modid` method has also been added which returns the current mod applied to the `Dex`.
- **random battles are not supported by the `@pkmn/sim` package**. All team generation logic and
  data has been removed from the package and are instead provided by [`@pkmn/randoms`][5] which can
  be used to generate a team (see example below) after being configured with the new
  `Dex#setTeamGenerator` method. Unless a team generator has been set `Dex#getTeamGenerator` and
  `Dex#generateTeam` will throw. ==TODO==
- **all generations and all of their data is automatically loaded**. With Pokémon Showdown, data is
  loaded lazily, and often requires you run `includeX` methods to ensure you are getting consistent
  state. These functions still exist and can be called, but are now wholly unnecessary. Lazily
  loading older generations would still be desirable (and this package still lazily constructs the
  data objects), but lazy loading only works on web with asynchronous APIs which Pokémon Showdown
  does not support. `Dex#includeMods` is a no-op.
- **`Dex#packTeam` and `Dex#fastUnpackTeam` delegate to [`@pkmn/sets`][6]**. ==TODO==
- **the `isOriginal` optional constructor parameter to `Dex` has been removed**, as it was only
  intended for use internally for a legacy testing setup.
- **`dataDir`, `levenshtein`, `dataSearch` and `getAwakeningValues` have been removed**.
- in order to be [`@pkmn/dex-types`][2] compatible, the **asynchronous `getLearnset` API has been
  added** (though unlike like with [`@pkmn/dex`][4], the learnsets data is loaded at startup, not
  asynchronously), and **`Dex.data.Species`, `Dex.data.Moves` , `Dex.data.Types` 'aliases' have been
  added** for what Pokémon Showdown calls `Pokedex`, `Movedex` and `TypeChart` respectively.
  However, it is important to **note that the types in `@pkmn/sim` do not match the stricter
  `@pkmn/dex-types`** directly, you must simply cast the `@pkmn/sim` `Dex` and trust that it will
  work.
- [**`Dex#getEffect` does not deliberately break the contract of `Ability` by appending
  `'ability: '` its `id` field**](https://github.com/smogon/pokemon-showdown/commit/18dfc9ae30f77361429af1768cd88cef2c1c6600).

## Installation

```sh
$ npm install @pkmn/sim
```

## Usage

```ts
import {Dex, BattleStream, getPlayerStreams, RandomPlayerAI} from '@pkmn/sim';
import {TeamGenerator} from '@pkmn/randoms';
import {RandomPlayerAI} from '../tools/random-player-ai';

Dex.setTeamGenerator(new TeamGenerator());

const streams = getPlayerStreams(new BattleStream());
const spec = {formatid: 'gen7customgame'};
const p1spec = {
  name: 'Bot 1',
  team: Dex.packTeam(Dex.generateTeam('gen7randombattle')),
};
const p2spec = {
  name: 'Bot 2',
  team: Dex.packTeam(Dex.generateTeam('gen7randombattle')),
};

const p1 = new RandomPlayerAI(streams.p1);
const p2 = new RandomPlayerAI(streams.p2);

void p1.start();
void p2.start();

void (async () => {
  let chunk;
  while ((chunk = await streams.omniscient.read())) {
    console.log(chunk);
  }
})();

void streams.omniscient.write(`>start ${JSON.stringify(spec)}
>player p1 ${JSON.stringify(p1spec)}
>player p2 ${JSON.stringify(p2spec)}`);
```

Please see [Pokémon Showdown's existing documentation][10], in particular the [`PROTOCOL.md`][11]
and [`SIM-PROTOCOL.md`][12] files ([`FORMES.md`][13] and the [long-open PR attempting to document
the simulator's inner workings][14] are also helpful).


### Browser

The recommended way of using `@pkmn/sim` in a web browser is to **configure your bundler**
([Webpack][7], [Rollup][8], [Parcel][9], etc) to minimize it and package it with the rest of your
application.

## License

Substantial amounts of the code in this package have been either derived or generated from portions
of Guangcong Luo's [Pokémon Showdown code][0] which is distributed under the [MIT License][1].

  [0]: https://github.com/smogon/pokemon-showdown
  [1]: https://github.com/smogon/pokemon-showdown/blob/master/LICENSE
  [2]: https://github.com/pkmn/ps/blob/master/dex/types/index.d.ts
  [3]: https://github.com/pkmn/ps/blob/master/data
  [4]: https://github.com/pkmn/ps/blob/master/dex
  [5]: https://github.com/pkmn/ps/blob/master/random
  [6]: https://github.com/pkmn/ps/blob/master/sets
  [7]: https://webpack.js.org/
  [8]: https://rollupjs.org/
  [9]: https://parceljs.org/
  [10]: https://github.com/smogon/pokemon-showdown/blob/master/sim/README.md
  [11]: https://github.com/smogon/pokemon-showdown/blob/master/PROTOCOL.md
  [12]: https://github.com/smogon/pokemon-showdown/blob/master/sim/SIM-PROTOCOL.md
  [13]: https://github.com/smogon/pokemon-showdown/blob/master/data/FORMES.md
  [14]: https://github.com/smogon/pokemon-showdown/pull/5439
