# `@pkmn/data`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/data.svg)](https://www.npmjs.com/package/@pkmn/data)

> "what Pokémon Showdown's data layer will look like ~2 years from now"

A higher level data API wrapper compatible with [`@pkmn/sim`](../sim) and [`@pkmn/dex`](../dex).

## Installation

```sh
$ npm install @pkmn/data
```

Alternatively, as [detailed below](#browser), if you are using `@pkmn/data` in the browser and want
a convenient way to get started, simply depend on a transpiled and minified version via
[unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/@pkmn/dex"></script>
<script src="https://unpkg.com/@pkmn/data"></script>
```

*In this example, [`@pkmn/dex`](../dex) is included as well, because `@pkmn/data` requires a `Dex`
implementation to be useful.*

## Usage

This package can be used to wrap an implementation of the Pokémon Showdown
[`@pkmn/dex-types`](../dex/types) to provide an alternative data layer API. This package is not
generally useful without a runtime dependency - you must bring your own data layer. **You almost
certainly should be using `@pkmn/dex` instead of `@pkmn/sim` unless you know what you are doing**.

```ts
import * as dex from '@pkmn/dex';
import * as sim from '@pkmn/sim';
import {Dex} from '@pkmn/dex-types';
import {Generations} from '@pkmn/data';

// dex.Dex implements the @pkmn/dex-types's Dex directly, so this just works without complaints
const dexGens = new Generations(dex.Dex);

// All of the types from sim.Dex don't actually line up perfectly, but casting sidesteps that
const simGens = new Generations(sim.Dex as unknown as Dex);
```

### `Generations`

The `Generations` object provides an alternative, higher-level data API to `Dex` which irons out
a couple of Pokémon Showdown quirks. While this interface is far from the
[optimal design](#limitations), it aims to be slightly more ergonomic and intuitive to use than
`Dex`.

- data returned from a `Generation`s methods are constrained to the generation in question. Data
  which does not exist, only exists in later gens, or is illegal or non standard will not be
  returned which means you do not need filter data before using it. This allows you to [define the
  legality requirements for your data set up front](#existsfn) across all data types and then forget
  about it, as opposed to having to filter at each call site.
- `undefined` is returned from functions as opposed to an object with its `exists` field set to
  `false`. `undefined` fails loudly, can be checked statically by Typescript and allows for more
  efficient implementation under the hood.
- methods are moved to more intuitive locations than all existing on `Dex`
- `Types` is overhauled to hide Pokémon Showdown's enum-based type effectiveness handling.
- the 'sub-API' fields of `Generation` all have a `get` method and can be iterated over (save for
  `Generation#effects`). Post
  [pokemon-showdown@13189fdb](https://github.com/smogon/pokemon-showdown/commit/13189fdb)
  this is now supported by `Dex` as well, though `@pkmn/data` is more efficient as it uses iterators
  as opposed to instantiating the entire (unfiltered) lists to then be iterated over via `all()`.
- a stats API including calculation logic is provided via `Generation#stats` (as opposed to
  `Dex#stats` which just provides some lists of names).
- a usable `Learnsets` API which allows you to easily determine which moves a Pokémon can legally
  learn (though validating combinations of moves or other features requires `@pkmn/sim`'s
  `TeamValidator` - something as seemingly simple as determining Galar move legality cannot be
  generally solved without the full power of the `TeamValidator`).

**`Generations` handles existence at the field level slightly differently than at the object level**
\- references in fields which point to objects that do not exist in the generation will be updated
to remove those objects, but fields which should not be relevant at all to an earlier generation
are not pruned. For example, Chansey's `prevo` field in Gen 3 will not be `happiny`, but a move from
the same generation may still have its `zMove.basePower` field populated as it should never be
queried in Gen 3 anyway. This is mostly an artifact of how the Pokémon Showdown `Dex` `Generations`
is built on top of works - for efficiency reasons its only worthwhile to clean up the fields which
are actually relevant to the generation in question.

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

Please see the [unit tests](index.test.ts) for more comprehensive usage examples.

#### `ExistsFn`

Pokémon Showdown includes a lot of [nonstandard
information](https://github.com/smogon/pokemon-showdown/blob/master/sim/NONSTANDARD.md) in its data
files and expects developers to check the data returned by each API to ensure it is satisfactory for
your use case. Checking at every callsite is error prone and redundant - with `@pkmn/data`, the
filter function is configured up front on the `Generations` instance and is applied automatically on
every API.

By default, `Generations` uses an existence filter that ensures only data that exists in the latest
official release of a given Pokémon generation is returned. This is usually what you want, and as
such the most of the time you don't need to worry about existence at all. However, there are certain
circumstances where you might want to loosen the restrictions of the default existence function, eg.
to allow for Pokémon which have canonically existed but have not been included in the latest
release. This can be accomplished by passing an `ExistsFn` implementation as the second argument to
the `Generations` constructor:

```ts
// These species are unobtainable outside of their own generations, but @pkmn/dex doesn't contain
// the artificial 'natDexTier' field which allows Pokémon Showdown to track this so we hardcode it.
// If using @pkmn/sim instead, this list can be replaced with a `d.natDexTier !== 'Illegal'` check.
const NATDEX_UNOBTAINABLE_SPECIES = [
  'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay',
  'Pikachu-Libre', 'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter',
  'Eternatus-Eternamax',
];

const NATDEX_EXISTS = (d: Data, g: GenerationNum) => {
  // The "National Dex" rules only apply to gen 8+, but this ExistsFn gets called on all generations
  if (g < 8) return Generations.DEFAULT_EXISTS(d, g);
  // These checks remain unchanged from the default existence filter
  if (!d.exists) return false;
  if (d.kind === 'Ability' && d.id === 'noability') return false;
  // "National Dex" rules allows for data from the past, but not other forms of nonstandard-ness
  if ('isNonstandard' in d && d.isNonstandard && d.isNonstandard !== 'Past') return false;
  // Unlike the check in the default existence function we don't want to filter the 'Illegal' tier
  if ('tier' in d && d.tier === 'Unreleased') return false;
  // Filter out the unobtainable species
  if (d.kind === 'Species' && NATDEX_UNOBTAINABLE_SPECIES.includes(d.name)) return false;
  // Nonstandard items other than Z-Crystals and Pokémon-specific items should be filtered
  return !(d.kind === 'Item' && ['Past', 'Unobtainable'].includes(d.isNonstandard!) &&
    !d.zMove && !d.itemUser && !d.forcedForme);
};

const gens = new Generations(Dex, NATDEX_EXISTS);
```

The above example showcases an existence filter which includes data legal in Pokémon Showdown's
"National Dex" metagames. This is a particularly hairy existence filter due to how the [`'Standard
NatDex'` ruleset is
defined](https://github.com/smogon/pokemon-showdown/blob/master/data/rulesets.ts) and is subject to
change at the whims of the Pokémon Showdown developers. Alternative `ExistsFn` implementations can
be used to include Pokémon from [Smogon's Create-A-Pokémon Project](https://www.smogon.com/cap/),
unreleased data, Pokéstart Pokémon, etc. Note that as covered above, the `ExistsFn` only gets
applied at the object-level, **field-level existence still must be handled manually**.

#### Mods

`Generations` can be used with `Dex` objects that have been modified by the `Dex.mod` API, though it
first requires that the modded `Dex` be wrapped by the `ModdedDex` abstraction provided by
[`@pkmn/mods`](../mods):

```ts
import {Dex, ID, ModData} from '@pkmn/dex';
import {ModdexDex} from '@pkmn/mods';

const dex = Dex.mod('gen8bdsp' as ID, await import('@pkmn/mods/gen8bdsp') as ModData);
const gens = new Generations(new ModdedDex(dex));
```

Wrapping a modded `Dex` in `ModdedDex` is already the recommended practice to allow for better
typechecking, but in the case of `@pkmn/data` the wrapper is required as `Generations` calls
`Dex.forGen` under the hood which will default to an unmodded `Dex` (`ModdedDex` overrides
`Dex.forGen` to return the modded `Dex` for the generation that was modded).

### Browser

The recommended way of using `@pkmn/data` in a web browser is to **configure your bundler**
([Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/),
[Parcel](https://parceljs.org/), etc) to minimize it and package it with the rest of your
application. If you do not use a bundler, a convenience `index.min.js` is included in the package.
You simply need to depend on `./node_modules/@pkmn/data/build/index.min.js` in a `script` tag (which
is what the unpkg shortcut above is doing), after which **`pkmn.data` will be accessible as a
global.**

## Limitations

This package is heavily constrained by Pokémon Showdown's data layer - because it simply serves as a
wrapper to the `Dex` it cannot doing anything too ambitious or making suitable optimizations. As
such, this package does **not** attempt to provide the 'ideal' data layer for any and all Pokémon
projects - please see the [Pokémon Showdown Core design doc](https://pkmn.cc/ps-core-design) which
provides details on a design for the ambitious goal of providing a powerful, type-safe and well
thought out API that allows clients to only depend on the data they need.

## License

This package is distributed under the terms of the [MIT License](LICENSE). Substantial amounts of
the code have been derived from the portions of the [Pokémon Showdown
client](https://github.com/smogon/pokemon-showdown-client) which are distributed under the [MIT
License](https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6).
