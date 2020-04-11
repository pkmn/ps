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
<script src="https://unpkg.com/@pkmn/dex"></script>
<script src="https://unpkg.com/@pkmn/data"></script>
```

*In this example, [`@pkmn/dex`][13] is included as well, because `@pkmn/data` requires a `Dex`
implementation to be useful.*

## Usage

FIXME all below

This package can be used as a data layer within Pokémon applications **without any runtime
dependencies** (this package only depends on `@pkmn/types` which consists of type definitions only
and is not required at runtime):

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
  [13]: https://github.com/pkmn/ps/blob/master/img/

