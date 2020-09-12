# `@pkmn/client`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/client.svg)](https://www.npmjs.com/package/@pkmn/client)

Package encapsulating a refactored version of the generic parts of the official
[Pokémon Showdown](https://pokemonshowdown.com)'s client's engine.

## Installation

```sh
$ npm install @pkmn/client
```

## Usage

TODO

```ts
import {Battle, Handler} from '@pkmn/client';
import {Protocol} from '@pkmn/protocol';

const battle = new Battle();
const handler = new Handler(battle);

for (const line of lines) {
  const {args, kwArgs} = Protocol.parseBattleLine(line);
  const key = Protocol.key(args);
  if (key && handler[key]) handler[key](args, kwArgs);

  ... // manipulate battle
}
```

The [UI integration test](../integration/src/ui/index.ts) serves as an example for how the
`@pkmn/client` library can be used to display the results of a battle visually. Note how it makes
use of multiple `Handler`'s **ordered carefully** to account for when the `Battle` state was
updated. [`@pkmn/view`](../view)'s [`LogFormatter`](../view/src/log-formatter.ts) is an example of
a `Handler` which depends on being run *before* the client's `Handler` (and has been designed to
work hand-in-hand with `Battle`).

### Browser

The recommended way of using `@pkmn/client` in a web browser is to **configure your bundler**
([Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/),
[Parcel](https://parceljs.org/), etc) to minimize it and package it with the rest of your
application.

## License

This package is distributed under the terms of the [MIT License](LICENSE). Substantial amounts of
the code have been derived from the portions of the [Pokémon Showdown
client](https://github.com/smogon/pokemon-showdown-client) which are distributed under the [MIT
License](https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6).
