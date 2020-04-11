# @pkmn/data

[![npm version](https://img.shields.io/npm/v/@pkmn/data.svg)](https://www.npmjs.com/package/@pkmn/data)&nbsp;

A forked implementation of [smogon/pokemon-showdown-client][3]'s data layer with an alternative API.

## Installation

```sh
$ npm install @pkmn/data
```

Alternatively, as [detailed below](#browser), if you are using `@pkmn/data` in the browser and want
a convenient way to get started, simply depend on a transpiled and minified version via [unpkg][5]:

```html
<script src="https://unpkg.com/@pkmn/data"></script>
```

## Usage

This package can be used as a data layer within Pokémon applications **without any runtime
dependencies** (this package only depends on `@pkmn/types` which consists of type definitions only
and is not required at runtime):

### `Dex`

The `Dex` object is designed to map closely to the `Dex` in [`smogon/pokemon-showdown`][2] and
[`smogon/pokemon-showdown-client`][3]. However, because these interfaces diverge, some work was
done to help unify them as best as possible:

- every `Dex` is a `ModdedDex` and behaves similarly to how it does on the server (all methods can
  be called through a `ModdedDex` instance, there is no need to call some methods on `Dex` and
  others on `ModdedDex`).
- Pokémon Showdown's view-specific logic has been excluded from the data package (the standalone
  [`@pkmn/img`][0] package exists if you wish to deal with Pokémon Showdown's image resources).
- the `packSet`, `unpackSet`, `fastUnpackSet` logic was also removed - use the more comphrensive
  standalone [`@pkmn/sets`][12] package for these methods - the packages `Data` interface is
  purposefully designed to be compatible with `Dex`.
- only the **data** from Pokémon Showdown is included, none of the mechanics implementation logic.
- certain methods (like `Dex#includeModData()` exist for compatibility but are no-ops).

Some changes were made which should be relatively easy handle if migration from Pokémon Showdown
APIs:

- only mainstream generations are supported (ie. no non standard formats, no `LGPE`, etc).
- all of the data files are encoded in JSON instead of JS - this is encapsulated by the API but will
  result in slightly larger download size in exchange for [faster parsing][11].
- certain methods and fields have been renamed, including:
  - `getEffectByID` → `getPureEffectByID`
  - `dex.data.Pokedex` → `dex.data.Species`
  - `dex.data.Movedex` → `dex.data.Moves`

The most important breaking change is that **`getLearnsets` has been made `async`** and its API has
been changed to be more generally useful. In [an ideal api](#limitations) we wouldn't fetch data
we don't need during startup, but to maximize compatibility with Pokémon Showdown only the
`getLearnsets` method call from `Dex` has been made async. Compressed, all of the data files
amount to ~381KB, but **`data/learnsets.json` takes up ~148KB just on its own**. Only loading this
data on demand helps make the loading experience more reasonable given the constraints of this
package.

```ts
import {Dex} from '@pkmn/data';

TODO

```

### `Generations`

The `Generations` object provides an alternative, higher-level data API than `Dex` which irons out
a couple of Pokémon Showdown quirks. While this interface is far from the
[optimal design](#limitations), it aims to be slightly more ergonomic and intuitive to use than
`Dex`.

- data returned from a `Generation`s methods are constrained to the generation in question. Data
  which does not exist, only exists in later gens, or is illegal or non standard will not be
  returned.
- `undefined` is returned from functions as opposed to an object with its `exists` field set to
  `false`.
- `Dex#getForme` and `Dex#getOutOfBattleSpecies` renamed to `Species#getFormeName` and
  `Species#getOutOfBattleSpeciesName`, as they actually return a string display name.
- methods are moved to more intuitive locations than all existing on `Dex`
  (eg. `Species#hasAbility`).
- `Types` is overhauled to hide Pokémon Showdown's enum-based type effectiveness handling.
- the 'sub-API' fields of `Generation` all have a `get` method and can be iterated over (save for
  `Generation#effects`).
- a stats API including calculation logic is provided via `Generation#stats`.

```ts
import {Generations} from '@pkmn/data';

TODO

```

### Browser

The recommended way of using `@pkmn/data` in a web browser is to **configure your bundler**
([Webpack][6], [Rollup][7], [Parcel][8], etc) to minimize it and package it with the rest of your
application. If you do not use a bundler, a convenience `production.min.js` is included in the
package. You simply need to depend on `./node_modules/@pkmn/data/production.min.js` in a `script`
tag (which is what the unpkg shortcut above is doing), after which **`Dex` and
`Generations` will be accessible as globals.**

## Limitations

This package is heavily constrained by Pokémon Showdown's data layer - staying as close as possible
to the Pokémon Showdown client and server repositories' `Dex` APIs (whether or not they are
desirable) is  primary feature for compatibility purposes. However, this package's `Dex` interface
will break compatibility with Pokémon Showdown to:

- attempt to unify the `client` and `server` logic to provide a more consistent API
- provide an API that works for as broad a range of clients as possible while still maintaining the
 'spirit' of Pokémon Showdown's interface

As such, this package does **not** attempt to provide the 'ideal' data layer for any and all
Pokémon projects - please see [`@smogon/data`][4] for a project attempting to go after the more
ambitious goal of providing a powerful, type-safe and well thought out API that allows clients to
only depend on the data they need ([design doc][9]).

## License

This package is distributed under the terms of the [MIT License][1].
Substantial amounts of the code have been derived from the portions of Guangcong
Luo's [Pokémon Showdown client][3] which are distributed under the [MIT License][10].

  [0]: https://github.com/pkmn/ps/blob/master/img/
  [1]: https://github.com/pkmn/ps/blob/master/data/LICENSE
  [2]: https://github.com/smogon/pokemon-showdown
  [3]: https://github.com/smogon/pokemon-showdown-client
  [4]: https://github.com/smogon/data
  [5]: https://unpkg.com/
  [6]: https://webpack.js.org/
  [7]: https://rollupjs.org/
  [8]: https://parceljs.org/
  [9]: https://pkmn.cc/ps-core-design
  [10]: https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6
  [11]: https://github.com/GoogleChromeLabs/json-parse-benchmark
  [12]: https://github.com/pkmn/ps/blob/master/sets/
