# @pkmn/img

[![npm version](https://img.shields.io/npm/v/@pkmn/img.svg)](https://www.npmjs.com/package/@pkmn/view)&nbsp;

Logic for displaying [Pokémon Showdown's sprite and icon resources](https://pkmn.github.io/ps/img).

## Installation

```sh
$ npm install @pkmn/img
```

Alternatively, as [detailed below](#browser), if you are using `@pkmn/img` in the browser and want
a convenient way to get started, simply depend on a transpiled and minified version via [unpkg][7]:

```html
<script src="https://unpkg.com/@pkmn/img"></script>
```

## Usage

This package can be used to determine the information required to render sprites or icons
**without any dependencies**:

```ts
import {Sprites, Icons} from '@pkmn/img';

// Shiny Charizard sprite from FireRed / LeafGreen
const {url, w, h, pixelated} = Sprites.getPokemon('charizard', {gen: 'gen3frlg', shiny: true});
const sprite = document.createElement('img');
sprite.src = url;
sprite.width = w;
sprite.height = h;
if (pixelated) img.style.imageRendering = 'pixelated';

const icon = document.createElement('span');
icon.style = Icons.getItem('Choice Band').style;
```

Alternatively, this library can be used with any implementation of the [`data/interface`][4]:

```ts
import {Icons, Sprites} from '@pkmn/img/adaptable';
import {Data} from '@pkmn/img/data/interface';

class MyData implements Data {
  ...
}

const data = new MyData(...);

const MyIcons = new Icons(data);
const MySprites = new Sprites(data);
```

This option is primarily useful for either migration purposes, to modify the APIs to make data
loading **asynchronous** (though see `@pkmn/img/async`), or if you want to avoid duplicating
data that already exists in your application (though the only overlap is likely to be the `gen`
and `num` fields which are quite small).

All methods take `protocol` and `domain` arguments in their `options` to facilitate easily
**hosting your own sprites** (which you are strongly encouraged to do to avoid driving up
Pokémon Showdown's bandwidth costs). You should be able to easily copy the sprites from
Pokémon Showdown via the [`--mirror` option of `wget`][11].

### Browser

The recommended way of using `@pkmn/img` in a web browser is to **configure your bundler**
([Webpack][8], [Rollup][9], [Parcel][10], etc) to minimize it and package it with the rest of your
application. If you do not use a bundler, a convenience `production.min.js` is included in the
package (and used in the [`index.html`][6] example code). You simply need to depend on
`./node_modules/@pkmn/img/production.min.js` in a `script` tag (which is what the unpkg shortcut
above is doing), after which **`PokemonSprites` and `PokemonIcons` will be accessible as globals.**

## Performance

The JSON data required to be able to know how to display the sprites and icons weighs in at
**~34.4KB after compression**. This could be further optimized by storing the data as Javascript
objects (which don't require quoted keys), but this only amounts to a ~1-2KB saving once compressed.
Furthermore, [Javascript runtimes **optimize JSON** parsing to be 2x faster][5] than Javascript
object literals in some cases, so the additional size overhead from JSON is likely not worth
worrying about. Switching to arrays instead of object fields may also save space and improve
performance, but if the size of the data is really a concern for your application you should be
using the asynchronous or adaptable entrypoints to the API.

## License

This package is distributed under the terms of the [MIT License][1].
Substantial amounts of the code and data have been derived from the portions of Guangcong
Luo's [Pokémon Showdown client][2] which are distributed under the [MIT License][3].

  [0]: https://pokemonshowdown.com
  [1]: https://github.com/pkmn/ps/blob/master/img/LICENSE
  [2]: https://github.com/smogon/pokemon-showdown-client
  [3]: https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6
  [4]: https://github.com/pkmn/ps/blob/master/img/src/data/interface.ts
  [5]: https://github.com/GoogleChromeLabs/json-parse-benchmark
  [6]: https://github.com/pkmn/ps/blob/master/img/index.html
  [7]: https://unpkg.com/
  [8]: https://webpack.js.org/
  [9]: https://rollupjs.org/
  [10]: https://parceljs.org/
  [11]: https://www.gnu.org/software/wget/manual/html_node/Recursive-Retrieval-Options.html
