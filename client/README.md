# `@pkmn/client`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/client.svg)](https://www.npmjs.com/package/@pkmn/client)

Package encapsulating a refactored version of the generic parts of the official
[Pokémon Showdown](https://pokemonshowdown.com)'s client's engine.

## Installation

```sh
$ npm install @pkmn/client
```

Note that either [`@pkmn/dex`](../dex) or [`@pkmn/sim`](../sim) must also be installed to provide
a `Dex` implementation.

## Usage

`@pkmn/client` manintains a battle's state based on information contained in the [Pokémon Showdown
protocol](https://github.com/smogon/pokemon-showdown/blob/master/sim/SIM-PROTOCOL.md). A
[`Battle`](src/battle.ts) can be instantiated with a `Dex` implementation and used to track the
state of a battle by `add`-ing protocol messages off the wire. The `Battle` can then be queried
to determine information about the sides / field / Pokemon involved and their current status. The
state information that can be obtained from the protocol goes beyond the information provided in
the `|request|` messages sent from the server and together both provide a more complete view of the
true state of the battle.

```ts
import {Battle} from '@pkmn/client';
import {Dex} from '@pkmn/dex';

const battle = new Battle(Dex);

for (const line of lines) {
  battle.add(line);

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
