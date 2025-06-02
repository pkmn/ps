# `@pkmn/client`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/client.svg)](https://www.npmjs.com/package/@pkmn/client)

Package encapsulating a refactored and extended version of the generic parts of the official
[Pokémon Showdown](https://pokemonshowdown.com)'s client's engine.

The package has the following goals:

- track everything Pokémon Showdown's client already tracks
- provide a single place to track *all* known information about a battle
- integrate seamlessly with other [`@pkmn`](https://pkmn.cc/@pkmn/) projects

To that end, any [divergence](#changes) from the canonical Pokémon Showdown's client can be
explained as desirable to meet one of more of these requirements.

## Installation

```sh
$ npm install @pkmn/client
```

Note that either [`@pkmn/dex`](../dex) or [`@pkmn/sim`](../sim) must also be installed to provide
a `Dex` implementation for the [`@pkmn/data`](../data) library `@pkmn/client` depends on.

## Usage

`@pkmn/client` maintains a battle's state based on information contained in the [Pokémon Showdown
protocol](https://github.com/smogon/pokemon-showdown/blob/master/sim/SIM-PROTOCOL.md). A
[`Battle`](src/battle.ts) can be instantiated with a `Generations` instance and used to track the
state of a battle by `add`-ing protocol messages off the wire. The `Battle` can then be queried
to determine information about the sides / field / Pokemon involved and their current status. The
state information that can be obtained from the protocol goes beyond the information provided in
the `|request|` messages sent from the server and together both provide a more complete view of the
true state of the battle.

```ts
import {Battle} from '@pkmn/client';
import {Generations} from '@pkmn/data';
import {Dex} from '@pkmn/dex';

const battle = new Battle(new Generations(Dex));

for await (const chunk of stream) {
 // Alternatively: for (const {args, kwArgs} of Protocol.parse(chunk))
  for (const line of chunk.split('\n')) {
    battle.add(line);
  }
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

## Changes

`@pkmn/client` departs from Pokémon Showdown's client in the following ways:

- the package builds on top of [`@pkmn/protocol`](../protocol) to help improve type-safety and
  relies on a separate [`Handler`](src/handler.ts) which is used to build up the `Battle` state.
- numerous fields and their types have been renamed / rearranged / coalesced / tightened to better
  match the `@pkmn/sim` representations and the types required by other `@pkmn` projects.
- the package can **handle `|request|` messages** in addition to the regular output log protocol.
  Pokémon Showdown handles `|request|` messages separately and allows for the information from the
  request to be used to improve the accuracy of the state that has been built up from battle output
  with optional '`ServerPokemon`' parameters to various methods, `@pkmn/client` merges the request
  state with the state it has determined from the other protocol messages to ensure the `Battle`
  state always reflects the totality of information we have received from the server.
- `@pkmn/client` allows for the sets of either team to be provided when a `Battle` is instantiated
  so that the set information can be included with the tracked `Pokemon` instances (though note that
  the `TeamValidator` inside the simulator may make modifications to the set which may cause
  discrepancies).

## License

This package is distributed under the terms of the [MIT License](LICENSE). Substantial amounts of
the code have been derived from the portions of the [Pokémon Showdown
client](https://github.com/smogon/pokemon-showdown-client) which are distributed under the [MIT
License](https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6).
