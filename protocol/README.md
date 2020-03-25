# @pkmn/protocol
[![npm version](https://img.shields.io/npm/v/@pkmn/protocol.svg)](https://www.npmjs.com/package/@pkmn/protocol)&nbsp;

Parsing logic for [Pokémon Showdown][0]'s [PROTOCOL][1] and [SIM-PROTOCOL][2].

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

This package is distributed under the terms of the [MIT License][3].
Substantial amounts of the code have been derived from the portions of Guangcong
Luo's [Pokémon Showdown client][5] which are distributed under the [MIT License][4].

  [0]: https://pokemonshowdown.com
  [1]: https://github.com/smogon/pokemon-showdown/blob/master/PROTOCOL.md
  [2]: https://github.com/smogon/pokemon-showdown/blob/master/sim/SIM-PROTOCOL.md
  [3]: https://github.com/pkmn/ps/blob/master/protocol/LICENSE
  [4]: https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6
  [5]: https://github.com/smogon/pokemon-showdown-client
