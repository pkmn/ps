# `@pkmn/ps`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)

> [Pokémon Showdown](https://pokemonshowdown.com), [modularized into packages](https://pkmn.cc/modular-ps).

This is the top level of [`@pkmn`](https://pkmn.cc/@pkmn/)'s Pokémon Showdown components:

- [`@pkmn/sim`](sim): an automatically generated extraction of just the simulator portion of
  [smogon/pokemon-showdown](https://github.com/smogon/pokemon-showdown)
- [`@pkmn/dex`](dex): a unification of
  [smogon/pokemon-showdown](https://github.com/smogon/pokemon-showdown)'s and
  [smogon/pokemon-showdown-client](https://github.com/smogon/pokemon-showdown-client)'s data layers
- [`@pkmn/data`](data): a higher level data API wrapper compatible with [`@pkmn/sim`](sim) and
  [`@pkmn/dex`](dex)
- [`@pkmn/sets`](sets): importing and exporting logic for Pokémon Showdown's set specification
- [`@pkmn/types`](types): TypeScript definitions for types common to Pokémon projects
- *[`@pkmn/protocol`](protocol)*: Parsing logic for Pokémon Showdown's
  [PROTOCOL](https://github.com/smogon/pokemon-showdown/blob/master/PROTOCOL.md) and
  [SIM-PROTOCOL](https://github.com/smogon/pokemon-showdown/blob/master/sim/SIM-PROTOCOL.md)
- *[`@pkmn/client`](client)*: a fork of
  [smogon/pokemon-showdown-client](https://github.com/smogon/pokemon-showdown-client)'s battle
  engine, build on top of [`@pkmn/protocol`](protocol)
- *[`@pkmn/img`](img)*: logic for displaying [Pokémon Showdown's sprite/icon
  resources](https://github.com/smogon/sprites)
- *[`@pkmn/view`](view)*: a library for building Pokémon Showdown client UIs
- *[`@pkmn/login`](login)*: logic for authenticating with Pokémon Showdown
- *[`@pkmn/randoms`](randoms)*: random team generation logic for Pokémon Showdown's Random Battle
  formats, for use with [`@pkmn/sim`](sim)

Everything in this repository is distributed under the terms of the [MIT License](LICENSE)). For
some packages, substantial amounts of the code have been either derived or generated from the
portions of Pokémon Showdown's [server](https://github.com/smogon/pokemon-showdown) and
[client](https://github.com/smogon/pokemon-showdown-client) codebases  which are also distributed
under the [MIT License](https://github.com/smogon/pokemon-showdown/blob/master/LICENSE).
