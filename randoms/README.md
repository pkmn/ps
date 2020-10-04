# `@pkmn/randoms`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/randoms.svg)](https://www.npmjs.com/package/@pkmn/randoms)

An automatically generated extraction of a subset of Pokémon Showdown's "Random Battle" generation
logic for use with [`@pkmn/sim`](../sim).

## Installation

```sh
$ npm install @pkmn/randoms
```

## Usage

To generate a random team, get a `TeamGenerator` for a supported format and call `getTeam`:

```ts
import {TeamGenerators} from '@pkmn/randoms';

const generator = TeamGenerators.getTeamGenerator('gen8randombattle');
const team = generator.getTeam();
```

`@pkmn/randoms` is commonly used with [`@pkmn/sim`](../sim) to set the `TeamGenerator` factory on
its `Dex` so that `Dex.generateTeam` will work:

```ts
import {Dex} from '@pkmn/sim';
import {TeamGenerators} from '@pkmn/randoms';

Dex.setTeamGeneratorFactory(TeamGenerators);
const team = Dex.generateTeam('gen1randombattle');
```

### Browser

The recommended way of using `@pkmn/randoms` in a web browser is to **configure your bundler**
([Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/),
[Parcel](https://parceljs.org/), etc) to minimize it and package it with the rest of your
application.

## License

Substantial amounts of the code in this package have been either derived or generated from portions
of [Pokémon Showdown code](https://github.com/smogon/pokemon-showdown) which are distributed under
the [MIT License](LICENSE).
