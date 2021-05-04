# `@pkmn/sim`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/sim.svg)](https://www.npmjs.com/package/@pkmn/sim)

An automatically generated extraction of just the simulator portion of
[smogon/pokemon-showdown](https://github.com/smogon/pokemon-showdown).

The package aims to meet the following requirements:

- stay as close to `sim/` from `smogon/pokemon-showdown` as possible
- be usable as a typed and verisoned module that exports a
  [`@pkmn/dex-types`](../dex/types)-compatible data layer
- be usable in the browser environment

To that end, any [divergence](#changes) from the canonical Pokémon Showdown `sim/` directory can be
explained as desirable to meet one of more of these requirements.

If you do not need typed and versioned module or do not require the ability to run a the full blown
simulator and/or validator code in the browser, **you will probably be better off vendoring the
`smogon/pokemon-showdown` in your project.**

If you simply want access to the Pokémon Showdown's data layer but do not care about any of the
logic required to implement the game mechanics and battle system, **please see
[`@pkmn/data`](../data) (or [`@pkmn/dex`](../dex)).**

## Installation

```sh
$ npm install @pkmn/sim
```

## Usage

```ts
import {Dex, BattleStreams, RandomPlayerAI, Teams} from '@pkmn/sim';
import {TeamGenerators} from '@pkmn/randoms';

Teams.setGeneratorFactory(TeamGenerators);

const streams = BattleStreams.getPlayerStreams(new BattleStreams.BattleStream());
const spec = {formatid: 'gen7customgame'};

const p1spec = {name: 'Bot 1', team: Teams.pack(Teams.generate('gen7randombattle'))};
const p1spec = {name: 'Bot 2', team: Teans.pack(Teams.generate('gen7randombattle'))};

const p1 = new RandomPlayerAI(streams.p1);
const p2 = new RandomPlayerAI(streams.p2);

void p1.start();
void p2.start();

void (async () => {
  for await (const chunk of streams.omniscient) {
    console.log(chunk);
  }
})();

void streams.omniscient.write(`>start ${JSON.stringify(spec)}
>player p1 ${JSON.stringify(p1spec)}
>player p2 ${JSON.stringify(p2spec)}`);
```

Please see [Pokémon Showdown's existing
documentation](https://github.com/smogon/pokemon-showdown/blob/master/sim/README.md), in particular
the [`PROTOCOL.md`](https://github.com/smogon/pokemon-showdown/blob/master/PROTOCOL.md) and
[`SIM-PROTOCOL.md`]( https://github.com/smogon/pokemon-showdown/blob/master/sim/SIM-PROTOCOL.md)
files ([`FORMES.md`](https://github.com/smogon/pokemon-showdown/blob/master/data/FORMES.md),
[`TEAMS.md`](https://github.com/smogon/pokemon-showdown/blob/master/sim/TEAMS.md),
[`NONSTANDARD.md`](https://github.com/smogon/pokemon-showdown/blob/master/sim/NONSTANDARD.md), and
the [long-open PR attempting to document the simulator's inner
workings](https://github.com/smogon/pokemon-showdown/pull/5439) are also helpful).

### Browser

The recommended way of using `@pkmn/sim` in a web browser is to **configure your bundler**
([Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/),
[Parcel](https://parceljs.org/), etc) to minimize it and package it with the rest of your
application.

## Changes

Pokémon Showdown's `sim/` directory has been modified in the following ways:

- **`import` and `export` statements have been added** as needed to allow consumers to use this
  package with TypeScript without type errors. Internally, Pokémon Showdown uses global type
  definitions which are not accessible to third-party developers and the code will not type check
  when used externally without these additions. Pokémon Showdown's internal type setup is also
  fairly convoluted - because of global definitions there is quite a bit of merging going on and
  with explicit `import` and `export` statements the TypeScript compiler better able to detect type
  errors. `index.ts` files have been added to each of the generations in `data/`.
- **only Gens 1 - 8 are supported, no other mods**. Generation 8 as the `base` mod is supported as
  with Pokémon Showdown, but after that only the canconical `genN` mods are supported (no Stadium,
  Let's Go, or pet mods). However, the [`@pkmn/mods`](../mods) package provides the information
  required for additional formats, and support for Other Metagames can be acheived with the modified
  `Dex#mod` method. The `Dex#mod` method will `throw` if an unsupported mod is requested.  A
  `Dex#modid` method has also been added which returns the current mod applied to the `Dex`.
- **random battles are not supported by the `@pkmn/sim` package**. All team generation logic and
  data has been removed from the package and are instead to be provided by the
  [`@pkmn/randoms`](../randoms) package which exports a generator factory that can be configured
  using the `Teams#setGeneratorFactory` method. Unless a team generator factory has been set
  `Teams#getGenerator` and `Teams#generate` will throw.
- **all generations and all of their data are automatically loaded**. With Pokémon Showdown, data is
  loaded lazily, and often requires you run `includeX` methods to ensure you are getting consistent
  state. These functions still exist and can be called, but are now wholly unnecessary. Lazily
  loading older generations would still be desirable (and this package still lazily constructs the
  data objects), but lazy loading only works on web with asynchronous APIs which Pokémon Showdown
  does not support. `Dex#includeMods` is a no-op.
- **`Teams` methods delegate to [`@pkmn/sets`](../sets)**. In Pokémon Showdown this logic is copied
  between the client and server, but in `@pkmn` has been extracted into a module.
- **`dataDir` and `dataSearch`  have been removed**.
- in order to be [`@pkmn/dex-types`](../dex/types) compatible, the **asynchronous `learnsets` API
  has been added** (though unlike like with [`@pkmn/dex`](../dex), the learnsets data is loaded at
  startup, not asynchronously), and **`Dex.data.Species` and `Dex.data.Types` 'aliases' have been
  added** for what Pokémon Showdown calls `Pokedex` and `TypeChart` respectively. However, it is
  important to **note that the types in `@pkmn/sim` do not match the stricter `@pkmn/dex-types`**
  directly, you must simply cast the `@pkmn/sim` `Dex` and trust that it will work.

## License

Substantial amounts of the code in this package have been either derived or generated from portions
of [Pokémon Showdown code](https://github.com/smogon/pokemon-showdown) which are distributed under
the [MIT License](LICENSE).
