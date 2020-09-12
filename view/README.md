# `@pkmn/view`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/view.svg)](https://www.npmjs.com/package/@pkmn/view)

A library for building [Pokémon Showdown](https://pokemonshowdown.com) client UIs.

## Installation

```sh
$ npm install @pkmn/view
```

## Usage

`@pkmn/view` provides a collection of view-related helpers and wrappers which build upon the
`@pkmn/client` and extend its functionality in ways which are relevant for building client UIs.

This package is expected to grown in scope, as several primitives have yet to be completed (eg.
`AnimatedBattle`). Currently, this package offers a [`LogFormatter`](#LogFormatter) for
pretty-printing the battle protocol and a [`ChoiceBuilder`](#ChoiceBuilder) helper tp make it
easier for humans to construct responses.

#### `LogFormatter`

FIXME NOTE ABOUT ORDERING AND TRACKER

```ts
import {Battle, Handler} from '@pkmn/client';
import {Protocol} from '@pkmn/protocol';
import {LogFormatter} from '@pkmn/view';

const battle = new Battle();
const handler = new Handler(battle);
const formatter = new LogFormatter(0 /* perspective */, battle);

for (const line of lines) {
  const {args, kwArgs} = Protocol.parseBattleLine(line);
  // NOTE: must come *before* handler
  const formatted = formatter.formatText(args, kwArgs);
  if (formatted) process.stdout.write(formatted);
  const key = Protocol.key(args);
  if (key && handler[key]) handler[key](args, kwArgs);
}
```

Instead of pretty-printing as text, the `LogFormatter` can also `formatHTML`. See the [UI
integration test](../integration/src/ui/index.ts) as an example.

The [`format-battle`](format-battle) script productionizes the above example and is comparable to
the [`parse` test script](https://github.com/smogon/pokemon-showdown-client/blob/master/test/parse)
in [smogon/pokemon-showdown-client](https://github.com/smogon/pokemon-showdown-client), though
**will return subtly different results** because `format-battle` leverages the full `Battle` state (via the second parameter to the `LogFormatter`).

#### `ChoiceBuilder`

```ts
# choice
```

### Browser

The recommended way of using `@pkmn/view` in a web browser is to **configure your bundler**
([Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/),
[Parcel](https://parceljs.org/), etc) to minimize it and package it with the rest of your
application.

## License

This package is distributed under the terms of the [MIT License](LICENSE). Substantial amounts of
the code have been derived from the portions of the [Pokémon Showdown
client](https://github.com/smogon/pokemon-showdown-client) which are distributed under the [MIT
License](https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6).
