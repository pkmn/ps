# `@pkmn/protocol`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/protocol.svg)](https://www.npmjs.com/package/@pkmn/protocol)

Parsing logic for [Pokémon Showdown](https://pokemonshowdown.com)'s
[PROTOCOL](https://github.com/smogon/pokemon-showdown/blob/master/PROTOCOL.md) and
[SIM-PROTOCOL](https://github.com/smogon/pokemon-showdown/blob/master/sim/SIM-PROTOCOL.md).

This package converts Pokémon Showdown's text protocols into typed object
respresentations for ease of use.

## Installation

```sh
$ npm install @pkmn/protocol
```

## Usage

#### `Handler`

`Protocol.parse` can be used to turn protocol messages into objects which can then be dispatched to
a `Protocol.Handler`. The `Args` and `KWArgs` can be parsed further using the various helper methods
available on the `Protocol` class. [`@pkmn/client`](../client)'s
[`Handler`](../client/src/handler.ts) exists as a detailed example of what a `Protocol.Handler`
implementation might look like.

```ts
import {Protocol, Args, KWArgs} from '@pkmn/protocol';

class BoostHandler implements Protocol.Handler {
  '|-boost|'(args: Args['|-boost|'], kwArgs: KWArgs['|-boost|']) {
    const [, p, stat, n] = args;
    const pokemon = Prototol.parsePokemonIdent(p);
    const num = Number(n);

    let message = `${pokemon.player}'s ${pokemon.name}'s ${stat} stat was boosted by ${num}`;
    if (kwArgs.from) message += ` from ${Protocol.parseEffect(from).name}`;
    console.log(`${message}!`);
  }
}
```

The [`generate-handler`](generate-handler) script can be used to reduce amount of boilerplate code
required to exhaustively implement the Pokémon Showdown protocol.

#### `Verifier`

`@pkmn/protocol` also provides protocol-verification logic, primarily useful for testing.
`Verifier.verify` can be used to verify a data chunk received from the Pokémon Showdown server
(`Verifier.verifyLine` can be used to verify individual lines). The `Verifier` only performs basic
strutural/shape verification (eg. the protocol is well-formed) as opposed to fine grained
domain-specific verification (ie. it will verify an `ID` is received, but does not verify that the
`ID` refers to a known object etc).

```ts
import {Verifier} from '@pkmn/protocol/verifier'

console.log(Verifier.verify(protocol));
```

The TypeScript compiler may require special configuration to be able to directly import a
subdirectory of the main `@pkmn/protocol` package - see the
[`tsconfig.json` documentation](https://www.typescriptlang.org/tsconfig) on
[`baseUrl`](https://www.typescriptlang.org/tsconfig#baseUrl) and
[`paths`](https://www.typescriptlang.org/tsconfig#paths).

```json
{
 "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@pkmn/protocol/*": ["node_modules/@pkmn/protocol/build/*"]
    }
  }
}
```

This package ships with a [`protocol-verifier`](protocol-verifier) script which can be used to
verify protocol lines read from standard input.

### Browser

The recommended way of using `@pkmn/protocol` in a web browser is to **configure your bundler**
([Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/),
[Parcel](https://parceljs.org/), etc) to minimize it and package it with the rest of your
application.

## License

This package is distributed under the terms of the [MIT License](LICENSE). Parts of the code have
been derived from the Pokémon Showdown [server](https://github.com/smogon/pokemon-showdown) and the
[MIT Licensed](https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6)
portions of the [client](https://github.com/smogon/pokemon-showdown-client).
