# `@pkmn/view`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/view.svg)](https://www.npmjs.com/package/@pkmn/view)

A library for building [Pokémon Showdown](https://pokemonshowdown.com) client UIs.

## Installation

```sh
$ npm install @pkmn/view
```

## Usage

`@pkmn/view` provides a collection of view-related helpers and wrappers which build upon the
`@pkmn/client` and extend its functionality in ways which are relevant for building client UIs.

This package is expected to grow in scope, as several primitives have yet to be completed (eg.
`AnimatedBattle`). Currently, this package offers a [`LogFormatter`](#LogFormatter) for
pretty-printing the battle protocol and a [`ChoiceBuilder`](#ChoiceBuilder) helper to make it
easier for humans to construct responses.

#### `LogFormatter`

The `LogFormatter` pretty-prints Pokémon Showdown's battle protocol, either as marked up text with
`formatText` or as HTML with `formatHTML` (see the [UI integration
test](../integration/src/ui/index.ts) for an example of the latter). The formatter can format the
text from the perspective of either side.

```ts
import {Dex} from '@pkmn/dex';
import {Battle} from '@pkmn/client';
import {Protocol} from '@pkmn/protocol';
import {LogFormatter} from '@pkmn/view';

const battle = new Battle(Dex);
const formatter = new LogFormatter(0 /* perspective */, battle);

for (const {args, kwArgs} of Protocol.parse(chunk)) {
  // NOTE: must come *before* handler
  const formatted = formatter.formatText(args, kwArgs);
  if (formatted) process.stdout.write(formatted);
  battle.add(args, kwArgs);
}
```

If the `LogFormatter` is used by itself the output will be less detailed and accurated, as it
requires certain state about the battle that is more difficult to track to comphrensively display
the proper output for every scenario. Instead, the `LogFormatter` can be instantiated with a
'`Tracker`' which handles tracking the full state, though importantly, `LogFormatter` operates on
the pre-updated state and thus must be called **before** its `Tracker`.
[`@pkmn/client`](../client)'s [`Battle`](../client/src/battle.ts) is currently the only
implementation of a `Tracker`.

The [`format-battle`](format-battle) script productionizes the above example and is comparable to
the [`parse` test script](https://github.com/smogon/pokemon-showdown-client/blob/master/test/parse)
in [smogon/pokemon-showdown-client](https://github.com/smogon/pokemon-showdown-client), though
**will return subtly different results** because `format-battle` leverages the full `Battle` state (via the second parameter to the `LogFormatter`).

#### `ChoiceBuilder`

`ChoiceBuilder` provides a way to incrementally build up a player's response to a `|request|`
message. It provides features such as filling in `pass` choices where appropriate, guarding against
the wrong sorts of responses being issued for the various request types, and convenience helpers to
allow for flexibly specifying choices in a more human-friendly and intuitive way.

```ts
import {ChoiceBuilder} from '@pkmn/view';
import {Protocol} from '@pkmn/protocol';

const request = Protocol.parseRequest(str);
const builder = new ChoiceBuilder(request);
builder.addChoice('switch Gengar');
builder.addChoice('move 3');
const choice = builder.toString();
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
