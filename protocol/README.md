# `@pkmn/protocol`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/protocol.svg)](https://www.npmjs.com/package/@pkmn/protocol)

Parsing logic for [Pokémon Showdown](https://pokemonshowdown.com)'s
[PROTOCOL](https://github.com/smogon/pokemon-showdown/blob/master/PROTOCOL.md) and
[SIM-PROTOCOL](https://github.com/smogon/pokemon-showdown/blob/master/sim/SIM-PROTOCOL.md).

This package converts Pokémon Showdown's text protocols into typed object
respresentations for ease of use.

```ts
import { Protocol, Args, KWArgs } from '@pkmn/protocol';

class BoostHandler implements Protocol.Handler {
  '-boost'(args: Args['-boost'], kwArgs: KWArgs['-boost']) {
    const [, p, stat, n] = args;
    const pokemon = Prototol.parsePokemonIdent(p);
    const num = Number(n);

    let message = `${pokemon.player}'s ${pokemon.name}'s ${stat} stat was boosted by ${num}`;
    if (kwArgs.from) message += ` from ${Protocol.parseEffect(from).name}`;
    console.log(`${message}!`);
  }
}
```

This package is distributed under the terms of the [MIT License](LICENSE). Substantial amounts of
the code have been derived from the portions the [Pokémon Showdown
client](https://github.com/smogon/pokemon-showdown-client) which are distributed under the [MIT
License](https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6).
