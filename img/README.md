# @pkmn/img

[![npm version](https://img.shields.io/npm/v/@pkmn/img.svg)](https://www.npmjs.com/package/@pkmn/view)&nbsp;

Logic for displaying Pokémon Showdown's sprite/icon resources.

This package can be used to determine the information required to render sprites or icons
without any dependencies:

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
loading asynchronous (though see `@pkmn/img/async`), or if you want to avoid duplicating data that
already exists in your application (though the only overlap is likely to be the `gen` and `num`
fields which are quite small).

All methods take `protocol` and `domain` arguments in their `options` to facilitate easily hosting
your own sprites (which you are strongly encouraged to do to avoid driving up Pokémon Showdown's
bandwidth costs).

This package is distributed under the terms of the [MIT License][1].
Substantial amounts of the code have been derived from the portions of Guangcong
Luo's [Pokémon Showdown client][2] which are distributed under the [MIT License][3].

  [0]: https://pokemonshowdown.com
  [1]: https://github.com/pkmn/ps/blob/master/img/LICENSE
  [2]: https://github.com/smogon/pokemon-showdown-client
  [3]: https://github.com/smogon/pokemon-showdown-client/blob/master/src/battle.ts#L6
  [4]: https://github.com/pkmn/ps/blob/master/img/src/data/interface.ts
