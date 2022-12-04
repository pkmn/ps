# `@pkmn/dex`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/dex.svg)](https://www.npmjs.com/package/@pkmn/dex)

A unification of [smogon/pokemon-showdown](https://github.com/smogon/pokemon-showdown)'s and
[smogon/pokemon-showdown-client](https://github.com/smogon/pokemon-showdown-client)'s data layers.

## Installation

```sh
$ npm install @pkmn/dex
```

Alternatively, as [detailed below](#browser), if you are using `@pkmn/dex` in the browser and want a
convenient way to get started, simply depend on a transpiled and minified version via
[unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/@pkmn/dex"></script>
```

Please note that `Learnset` data must be imported separately when using `unpkg`, as
[outlined below]((#browser)).

## Usage

This package can be used as a data layer within Pokémon applications **without any runtime
dependencies** (this package only depends on `@pkmn/types` and `@pkmn/dex-types` which both consist of
type definitions only and are not required at runtime):

### `Dex`

The `Dex` object is designed to map closely to the `Dex` in
[smogon/pokemon-showdown](https://github.com/smogon/pokemon-showdown) and
[smogon/pokemon-showdown-client](https://github.com/smogon/pokemon-showdown-client). However,
because these interfaces diverge, some work was done to help unify them as best as possible:

- every `Dex` is a `ModdedDex` and behaves similarly to how it does on the server (all methods can
  be called through a `ModdedDex` instance, there is no need to call some methods on `Dex` and
  others on `ModdedDex`).
- Pokémon Showdown's view-specific logic has been excluded from the data package (the standalone
  [`@pkmn/img`](../img) package exists if you wish to deal with Pokémon Showdown's image resources).
- the `packSet`, `unpackSet`, `fastUnpackSet` logic was also removed - use the more comphrensive
  standalone [`@pkmn/sets`](../sets) package for these methods - the package's `Data` interface is
  purposefully designed to be compatible with `Dex`.
- only the **data** from Pokémon Showdown is included, none of the mechanics implementation logic.
- certain methods (like `Dex#includeModData()` exist for compatibility but are no-ops).

Some changes were made which should be relatively easy handle if migrating from Pokémon Showdown
APIs:

- only mainstream generations are supported (ie. no non-standard formats, no `LGPE`, etc). Please see
  [`@pkmn/mods`](../mods) for information on how to modify the `Dex`.
- all of the data files are encoded in JSON instead of JS - this is encapsulated by the API but will
  result in slightly larger download size in exchange for [faster
  parsing](https://github.com/GoogleChromeLabs/json-parse-benchmark).
- certain methods and fields have been renamed, including:
  - `dex.data.Pokedex` → `dex.data.Species`
  - `dex.data.TypeChart` → `dex.data.Types`

The most important breaking change is that **`learnsets` have been made `async`** and its API has
been changed to be more generally useful. In [an ideal api](#limitations) we wouldn't fetch data
we don't need during startup, but to maximize compatibility with Pokémon Showdown only the
`getLearnsets` method call from `Dex` has been made async. Compressed, all of the data files without
learnsets to ~344KB, while **`data/learnsets.json` takes up ~475KB just on its own**. Only loading
this data on demand helps make the loading experience more reasonable given the constraints of this
package.

```ts
import {Dex} from '@pkmn/dex';

assert(Dex.forGen(1).types.get('Psychic').damageTaken['Ghost'] === 3);
assert(Dex.types.getEffectiveness('Dark', ['Ghost', 'Psychic']) === 2);
assert(Dex.forGen(5).species.get('Dragapult').isNonstandard === 'Future');
assert(Dex.forGen(3).species.get('Chansey').prevo === 'Happiny');
assert(Dex.forGen(1).species.all().filter(s => !s.isNonstandard).length === 151);
```

### `Generations`

The [`@pkmn/data`](../data) package wraps this data layer with `Generations` which  provides an
alternative, higher-level data API than `Dex` which irons out a couple of Pokémon Showdown quirks.

```ts
import {Dex} from '@pkmn/dex';
import {Generations} from '@pkmn/data';

const gens = new Generations(Dex);
assert(gens.get(1).types.get('Ghost').effectiveness['Psychic'] === 0);
assert(gens.get(9).types.totalEffectiveness('Dark', ['Ghost', 'Psychic']) === 4);
assert(gens.get(5).species.get('Dragapult') === undefined);
assert(gens.get(3).species.get('Chansey').prevo === undefined);
assert(Array.from(gens.get(1).species).length === 151);
assert(gens.get(6).stats.calc('atk', 100, 31, 252, 100, gen.natures.get('adamant')) === 328);
assert(await gens.get(4).learnsets.canLearn('Ursaring', 'Rock Climb'));
```

Note that Pokémon Showdown has been gradually improving its Dex API such that it appears more
similar to `@pkmn/data` post
[pokemon-showdown@13189fdb](https://github.com/smogon/pokemon-showdown/commit/13189fdb). There are
still several ergonomic advantages to using `@pkmn/data` as outlined in its documentation, though it
is entirely possible  Pokémon Showdown will continue to be inspired by `@pkmn/data`'s design and
eventually fully bridge the gap ("`@pkmn/data` - what Pokémon Showdown's data layer will look like
~2 years from now").

### Browser

The recommended way of using `@pkmn/dex` in a web browser is to **configure your bundler**
([Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/),
[Parcel](https://parceljs.org/), etc)  to minimize it and package it with the rest of your
application. If you do not use a bundler, a convenience `index.min.js` is included in the
package. You simply need to depend on `./node_modules/@pkmn/dex/build/index.min.js` in a
`script` tag (which is what the unpkg shortcut above is doing), after which **`pkmn.dex` will be
accessible as a global.**

`Dex#getLearnsets` does not play nicely in the browser because it is an asynchronous API. As such,
you must first depend on `./node_modules/@pkmn/dex/build/learnsets.min.js` which makes
**`pkmn.learnsets` accessible as a global** before calling `Dex#getLearnsets`. If you are using
`unpkg` this looks like:

```html
<script src="https://unpkg.com/@pkmn/dex/build/learnsets.min.js"></script>
<script src="https://unpkg.com/@pkmn/dex"></script>
```

Note that `unpkg.com/@pkmn/dex` is configured to point at
`unpkg.com/@pkmn/dex/build/index.min.js` already. The ordering of the `<script>` tags does not
matter as long as the `learnsets.min.js` script has loaded and populated the `pkmn.learnsets` global
before `Dex#getLearnsets` is called.

## Limitations

This package is heavily constrained by Pokémon Showdown's data layer - staying as close as possible
to the Pokémon Showdown's client's and server's repositories' `Dex` APIs (whether or not they are
desirable) is  primary feature for compatibility purposes. However, this package's `Dex` interface
will break compatibility with Pokémon Showdown to:

- attempt to unify the `client` and `server` logic to provide a more consistent API
- provide an API that works for as broad a range of clients as possible while still maintaining the
 'spirit' of Pokémon Showdown's interface

As such, this package does **not** attempt to provide the 'ideal' data layer for any and all Pokémon
projects - please see the [Pokémon Showdown Core design doc](https://pkmn.cc/ps-core-design) which
provides details on a design for the ambitious goal of providing a powerful, type-safe and well
thought out API that allows clients to only depend on the data they need.

## License

This package is distributed under the terms of the [MIT License](LICENSE). Substantial amounts of
the code have been derived from the portions of the [Pokémon Showdown
client](https://github.com/smogon/pokemon-showdown-client) which are distributed under the [MIT
License](https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6).
