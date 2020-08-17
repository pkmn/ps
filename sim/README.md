# `@pkmn/sim`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/sim.svg)](https://www.npmjs.com/package/@pkmn/sim)

An automatically generated extraction of just the simulator portion of
[smogon/pokemon-showdown](https://github.com/smogon/pokemon-showdown).

The package aims to meet the following requirements:

- stay as close to `sim/` from `smogon/pokemon-showdown` as possible
- be usable as a typed and verisoned module that exports a
  [`@pkmn/dex-types`](../dex/types)-compatible data layer
- be usable in the browser environment

To that end, any [divergence](#changes) from the canonical Pokémon Shwowdown `sim/` directory can be
explained as desirable to meet one of more of these requirements.

If you do not need typed and versioned module or do not require the ability to run a the full blown
simulator and/or validator code in the browser, **you will probably be better off vendoring the
`smogon/pokemon-showdown` in your project.**

If you simply want access to the Pokémon Showdown's data layer but do not care about any of the
logic required to implement the game mechanics and battle system, **please see
[`@pkmn/data`](../data) (or [`@pkmn/dex`](../dex)).**

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
  Let's Go, or pet mods). The `Dex#mod` method will `throw` if an unsupported mod is requested.
  A `Dex#modid` method has also been added which returns the current mod applied to the `Dex`.
- **random battles are not supported by the `@pkmn/sim` package**. All team generation logic and
  data has been removed from the package and are instead to be provided eventually by a
  [`@pkmn/randoms`](../randoms) package which will export a generator that can be configured using
  the `Dex#setTeamGenerator` method. Unless a team generator has been set `Dex#getTeamGenerator` and
  `Dex#generateTeam` will throw. *Currently these methods will all throw as `@pkmn/randoms` has yet
  to be implemented.*
- **all generations and all of their data is automatically loaded**. With Pokémon Showdown, data is
  loaded lazily, and often requires you run `includeX` methods to ensure you are getting consistent
  state. These functions still exist and can be called, but are now wholly unnecessary. Lazily
  loading older generations would still be desirable (and this package still lazily constructs the
  data objects), but lazy loading only works on web with asynchronous APIs which Pokémon Showdown
  does not support. `Dex#includeMods` is a no-op.
- **`Dex#packTeam` and `Dex#fastUnpackTeam` delegate to [`@pkmn/sets`](../sets)**. In Pokémon
  Showdown this logic is copied between the client and server, but in `@pkmn` has been extracted
  into a module.
- **the `isOriginal` optional constructor parameter to `Dex` has been removed**, as it was only
  intended for use internally for a legacy testing setup.
- **`dataDir`, `levenshtein`, `dataSearch`, `getAwakeningValues` and `stringifyTeam` have been
  removed**.
- in order to be [`@pkmn/dex-types`](../dex/types) compatible, the **asynchronous `getLearnset` API
  has been added** (though unlike like with [`@pkmn/dex`](../dex), the learnsets data is loaded at
  startup, not asynchronously), and **`Dex.data.Species`, `Dex.data.Moves` , `Dex.data.Types`
  'aliases' have been added** for what Pokémon Showdown calls `Pokedex`, `Movedex` and `TypeChart`
  respectively. However, it is important to **note that the types in `@pkmn/sim` do not match the
  stricter `@pkmn/dex-types`** directly, you must simply cast the `@pkmn/sim` `Dex` and trust that
  it will work.
- [**`Dex#getEffect` does not deliberately break the contract of `Ability` by prepending `'ability:
  '` its `id`
  field**](https://github.com/smogon/pokemon-showdown/commit/18dfc9ae30f77361429af1768cd88cef2c1c6600).

## Installation

```sh
$ npm install @pkmn/sim
```

## Usage

```ts
import {BattleStreams, RandomPlayerAI} from '@pkmn/sim';

const streams = BattleStreams.getPlayerStreams(new BattleStreams.BattleStream());
const spec = {formatid: 'gen7customgame'};
const p1spec = {
  name: 'Bot 1',
  team:
    'Under The Sea|politoed|leftovers|H|whirlpool,perishsong,rest,protect|Calm|248,,,8,252,|F|,0,,,,|S||]' +
    'Fade Away|swampertmega|swampertite||scald,earthquake,rest,sleeptalk|Sassy|248,,8,,252,|F||S||]' +
    'Shallow Waters|greninjaash|choicespecs||surf,darkpulse,watershuriken,icebeam|Timid|,,4,252,,252|||||]' +
    'Eternal Silence|skarmory|shedshell|1|roost,defog,spikes,counter|Impish|248,,252,,8,||,0,,,,|||]' +
    'Toxic Heart|mukalola|figyberry|1|knockoff,pursuit,recycle,poisonfang|Careful|248,,32,,228,|||S||]' +
    'Another Dream|clefable|leftovers|1|moonblast,softboiled,stealthrock,calmmind|Bold|252,,252,,4,|F|,0,,,,|S||',
};
const p2spec = {
  name: 'Bot 2',
  team:
    'Alakazam-Mega||alakazite|magicguard|barrier,calmmind,recover,psychic|Timid|244,,240,,,24|M|,0,,,,|S||]' +
    'Krookodile||choicescarf||knockoff,earthquake,pursuit,foulplay|Jolly|56,252,,,,200|||||]' +
    'Skarmory||rockyhelmet|1|spikes,defog,counter,roost|Impish|248,,248,,,12||,0,,,,|||]' +
    'Reuniclus||rockyhelmet|1|psychic,energyball,calmmind,recover|Bold|208,,252,,,48||,0,,,,|||]' +
    'Toxapex||wateriumz|H|scald,toxic,toxicspikes,recover|Calm|248,,40,80,140,||,0,,,,|||]' +
    'Chansey||eviolite||seismictoss,thunderwave,stealthrock,softboiled|Bold|248,,252,,8,|||||',
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

Please see [Pokémon Showdown's existing
documentation](https://github.com/smogon/pokemon-showdown/blob/master/sim/README.md), in particular
the [`PROTOCOL.md`](https://github.com/smogon/pokemon-showdown/blob/master/PROTOCOL.md) and
[`SIM-PROTOCOL.md`]( https://github.com/smogon/pokemon-showdown/blob/master/sim/SIM-PROTOCOL.md)
files ([`FORMES.md`](https://github.com/smogon/pokemon-showdown/blob/master/data/FORMES.md) and the
[long-open PR attempting to document the simulator's inner
workings](https://github.com/smogon/pokemon-showdown/pull/5439) are also helpful).


### Browser

The recommended way of using `@pkmn/sim` in a web browser is to **configure your bundler**
([Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/),
[Parcel](https://parceljs.org/), etc) to minimize it and package it with the rest of your
application.

## License

Substantial amounts of the code in this package have been either derived or generated from portions
of [Pokémon Showdown code](https://github.com/smogon/pokemon-showdown) which are distributed under
the [MIT License](LICENSE).
