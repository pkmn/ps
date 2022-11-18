# `@pkmn/sets`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/sets.svg)](https://www.npmjs.com/package/@pkmn/sets)

Parsing logic for [Pokémon Showdown](https://pokemonshowdown.com)'s sets export format.

## Installation

```sh
$ npm install @pkmn/sets
```

Alternatively, as [detailed below](#browser), if you are using `@pkmn/sets` in the browser and want
a convenient way to get started, simply depend on a transpiled and minified version via
[unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/@pkmn/sets"></script>
```

## Usage

This package can be used to parse sets and teams **without any dependencies**:

```ts
import {Sets} from '@pkmn/sets';

const set = Sets.importSet(
`Tangrowth @ Assault Vest
Ability: Regenerator
EVs: 248 HP / 8 Def / 252 SpD
Sassy Nature
IVs: 30 Atk / 30 Def
- Giga Drain
- Knock Off
- Hidden Power [Ice]
- Earthquake
`);
```

If you need to be able to unpack teams sent over the wire from old Pokémon Showdown server
implementations, need richer past generation support, or need the ability to convert sets written
with `ID`s (a core data type within Pokémon Showdown - strings containing just lower case
alphanumerics) into display names, a `Data` implementation must be provided as the optional second
parameter to the method you're using. The `Data` interface has been written such that it is
compatible with the `Dex` type from
[smogon/pokemon-showdown-client](https://github.com/smogon/pokemon-showdown-client),
[smogon/pokemon-showdown](https://github.com/smogon/pokemon-showdown), and from the
[`pkmn/dex`](../dex) package which can be used in a standalone fashion outside of Pokémon Showdown
codebase:

```ts
import {Dex} from '@pkmn/dex';
import {Sets} from '@pkmn/sets';

const set = Sets.unpack(
  'Tangrowth||AssaultVest|H|GigaDrain,KnockOff,PowerWhip' +
  ',Earthquake|Sassy|248,,8,,252,||,30,30,,,|||,Ice,',
  Dex.forGen(6)
);
```

### Browser

The recommended way of using `@pkmn/sets` in a web browser is to **configure your bundler**
([Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/),
[Parcel](https://parceljs.org/), etc) to minimize it and package it with the rest of your
application. If you do not use a bundler, a convenience `index.min.js` is included in the package.
You simply need to depend on `./node_modules/@pkmn/sets/build/index.min.js` in a `script` tag (which
is what the unpkg shortcut above is doing), after which **`pkmn.sets` will be accessible as a
global.**

## License

This package is distributed under the terms of the [MIT License](LICENSE).
