# `@pkmn/img`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/img.svg)](https://www.npmjs.com/package/@pkmn/img)

Logic for displaying [Pokémon Showdown's sprite and icon resources](https://pkmn.github.io/ps/img).

## Installation

```sh
$ npm install @pkmn/img
```

Alternatively, as [detailed below](#browser), if you are using `@pkmn/img` in the browser and want a
convenient way to get started, simply depend on a transpiled and minified version via
[unpkg](https://unpkg.com/):

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
if (pixelated) sprite.style.imageRendering = 'pixelated';

const icon = document.createElement('span');
icon.style = Icons.getItem('Choice Band').style;
```

Alternatively, this library can be used with any implementation of the
[`data/interface`](src/data/interface.ts):

```ts
import {Icons, Sprites} from '@pkmn/img/adaptable';
import type {Data} from '@pkmn/img/data/interface';

class MyData implements Data {
  ...
}

const data = new MyData(...);

const MyIcons = new Icons(data);
const MySprites = new Sprites(data);
```

This option is primarily useful for either migration purposes, to modify the APIs to make data
loading **asynchronous**, or if you want to avoid duplicating data that already exists in your
application (though the only overlap is likely to be the `gen` and `num` fields which are quite
small).

```ts
import * as A from '@pkmn/img/adaptable';;
import type {Data} from '@pkmn/img/data/interface';

const data = import('./data');
let DATA: Data | null;

export const Sprites = new class {
  sprites!: A.Sprites;

  async get() {
    if (this.sprites) return this.sprites;
    if (DATA) return (this.sprites = new A.Sprites(DATA));
    return (this.sprites = new A.Sprites(DATA = (await data).Data));
  }
};

export const Icons = new class {
  icons!: A.Icons;

  async get() {
    if (this.icons) return this.icons;
    if (DATA) return (this.icons = new A.Icons(DATA));
    return (this.icons = new A.Icons(DATA = (await data).Data));
  }
};
```

All methods take `protocol` and `domain` arguments in their `options` to facilitate easily **hosting
your own sprites** (which you are strongly encouraged to do to avoid driving up Pokémon Showdown's
bandwidth costs). You should be able to easily copy the sprites from Pokémon Showdown via the
[`--mirror` option of
`wget`](https://www.gnu.org/software/wget/manual/html_node/Recursive-Retrieval-Options.html).

Importantly, **you should at minimum host the icon sheets** as Pokémon Showdown may change the
various offsets on a whim causing the wrong icons to be shown until you update the package.
Mirroring the icon sheets allows you to effectively pin the resource at the same version the
`@pkmn/img` package is able to display correctly.

### Browser

The recommended way of using `@pkmn/img` in a web browser is to **configure your bundler**
([Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/),
[Parcel](https://parceljs.org/), etc) to minimize it and package it with the rest of your
application. If you do not use a bundler, a convenience `index.min.js` is included in the
package (and used in the [`index.html`](index.html) example code). You simply need to depend on
`./node_modules/@pkmn/img/build/index.min.js` in a `script` tag (which is what the unpkg
shortcut above is doing), after which **`pkmn.img` will be accessible as a global.**

## Performance

The JSON data required to be able to know how to display the sprites and icons weighs in at
**~34.4KB after compression**. This could be further optimized by storing the data as Javascript
objects (which don't require quoted keys), but this only amounts to a ~1-2KB saving once compressed.
Furthermore, [Javascript runtimes **optimize JSON** parsing to be 2x
faster](https://github.com/GoogleChromeLabs/json-parse-benchmark) than Javascript object literals in
some cases, so the additional size overhead from JSON is likely not worth worrying about. Switching
to arrays instead of object fields may also save space and improve performance, but if the size of
the data is really a concern for your application you should be using the asynchronous or adaptable
entrypoints to the API.

## License

This package is distributed under the terms of the [MIT License](LICENSE). Substantial amounts of
the code and data have been derived from the portions of the [Pokémon Showdown
client](https://github.com/smogon/pokemon-showdown-client) which are distributed under the [MIT
License](https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6).
