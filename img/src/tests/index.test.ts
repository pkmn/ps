
import * as fs from 'fs';
import * as path from 'path';

import {Icons, Sprites} from '../index';

const PROTOCOL = 'https';
const DOMAIN = 'play.pokemonshowdown.com';
const URL = `${PROTOCOL}://${DOMAIN}`;

describe('Sprites', () => {
  it('#getPokemon', () => {
    let pokemon = Sprites.getPokemon('foobar', {gen: 4});
    expect(pokemon.url).toBe(`${URL}/sprites/gen5/0.png`);
    expect(pokemon.gen).toBe(5);
    expect(pokemon.w).toBe(96);
    expect(pokemon.h).toBe(96);
    expect(pokemon.pixelated).toBe(true);

    pokemon = Sprites.getPokemon('gengar', {gen: 'gen4dp'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen4dp/gengar.png`);
    expect(pokemon.gen).toBe(4);
    expect(pokemon.w).toBe(96);
    expect(pokemon.h).toBe(96);
    expect(pokemon.pixelated).toBe(true);

    pokemon = Sprites.getPokemon('Charizard', {side: 'p1', shiny: true, gender: 'F'});
    expect(pokemon.url).toBe(`${URL}/sprites/ani-back-shiny/charizard.gif`);
    expect(pokemon.gen).toBe(9);
    expect(pokemon.w).toBe(172);
    expect(pokemon.h).toBe(166);
    expect(pokemon.pixelated).toBe(false);

    pokemon = Sprites.getPokemon('butterfree', {gen: 6, side: 'p1', gender: 'F'});
    expect(pokemon.url).toBe(`${URL}/sprites/ani-back/butterfree-f.gif`);
    expect(pokemon.gen).toBe(6);
    expect(pokemon.w).toBe(103);
    expect(pokemon.h).toBe(103);
    expect(pokemon.pixelated).toBe(false);

    pokemon = Sprites.getPokemon('corviknight', {gen: 'gen5ani', protocol: 'http'});
    expect(pokemon.url).toBe(`http://${DOMAIN}/sprites/gen5ani/corviknight.gif`);
    pokemon = Sprites.getPokemon('corviknight', {gen: 'gen5ani', protocol: 'http'});
    expect(pokemon.url).toBe(`http://${DOMAIN}/sprites/gen5ani/corviknight.gif`);
    pokemon = Sprites.getPokemon('tyranitar', {gen: 'gen1rb'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen2/tyranitar.png`);
    pokemon = Sprites.getPokemon('greninja', {gen: 'gen2g'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen5/greninja.png`);
    pokemon = Sprites.getPokemon('snorlax', {gen: 'gen1rb', shiny: true});
    expect(pokemon.url).toBe(`${URL}/sprites/gen1rb/snorlax.png`);
    pokemon = Sprites.getPokemon('butterfree', {gen: 3, side: 'p1', gender: 'F'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen3-back/butterfree.png`);

    pokemon = Sprites.getPokemon('Froslass', {gen: 'gen4dp-2', shiny: true});
    expect(pokemon.url).toBe(`${URL}/sprites/gen4dp-2-shiny/froslass.png`);
    pokemon = Sprites.getPokemon('Chansey', {gen: 'gen1rb', side: 'p1'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen1-back/chansey.png`);
    pokemon = Sprites.getPokemon('Mew', {gen: 'gen1rg', side: 'p1'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen1-back/mew.png`);
    pokemon = Sprites.getPokemon('Mew', {gen: 'gen2g', shiny: true, side: 'p1'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen2-back-shiny/mew.png`);
    pokemon = Sprites.getPokemon('Suicune', {gen: 'gen2s', side: 'p1'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen2-back/suicune.png`);
    pokemon = Sprites.getPokemon('Metagross', {gen: 'gen3rs', shiny: true, side: 'p1'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen3-back-shiny/metagross.png`);
    pokemon = Sprites.getPokemon('Suicune', {gen: 'gen3frlg', side: 'p1'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen3-back/suicune.png`);
    pokemon = Sprites.getPokemon('Froslass', {gen: 'gen4dp', side: 'p1'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen4-back/froslass.png`);

    pokemon = Sprites.getPokemon('Squirtle', {gen: 'gen3frlg', shiny: true});
    expect(pokemon.url).toBe(`${URL}/sprites/gen3frlg-shiny/squirtle.png`);
    pokemon = Sprites.getPokemon('Deoxys-Attack', {gen: 'gen3frlg'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen3frlg/deoxys-attack.png`);
    pokemon = Sprites.getPokemon('Teddiursa', {gen: 'gen3frlg'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen3frlg/teddiursa.png`);
    pokemon = Sprites.getPokemon('Blaziken', {gen: 'gen3frlg', shiny: true});
    expect(pokemon.url).toBe(`${URL}/sprites/gen3-shiny/blaziken.png`);

    pokemon = Sprites.getPokemon('Unown-B', {gen: 3});
    expect(pokemon.url).toBe(`${URL}/sprites/gen3/unown-b.png`);
    pokemon = Sprites.getPokemon('Arceus-Bug', {gen: 'gen5ani', shiny: true});
    expect(pokemon.url).toBe(`${URL}/sprites/gen5ani-shiny/arceus-bug.gif`);
    pokemon = Sprites.getPokemon('Toxtricity-Low-Key-Gmax');
    expect(pokemon.url).toBe(`${URL}/sprites/ani/toxtricity-gmax.gif`);
    pokemon = Sprites.getPokemon('Flabébé', {gen: 'ani'});
    expect(pokemon.url).toBe(`${URL}/sprites/ani/flabebe.gif`);

    pokemon = Sprites.getPokemon('missi ngno', {gen: 'gen1rb'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen1rb/missingno.png`);
    pokemon = Sprites.getPokemon('MissingNo.', {gen: 'ani', shiny: true, side: 'p1'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen1-back/missingno.png`);

    pokemon = Sprites.getPokemon('Chesnaught', {gen: 'gen5ani'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen5ani/chesnaught.gif`);
    pokemon = Sprites.getPokemon('Chesnaught', {gen: 'gen5ani', shiny: true});
    expect(pokemon.url).toBe(`${URL}/sprites/gen5-shiny/chesnaught.png`);
    pokemon = Sprites.getPokemon('Pikachu-Original', {shiny: true});
    expect(pokemon.url).toBe(`${URL}/sprites/ani/pikachu-original.gif`);
    pokemon = Sprites.getPokemon('Rotom-Heat', {gen: 'gen4dp-2'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen4/rotom-heat.png`);

    pokemon = Sprites.getPokemon('Buizel', {shiny: true, side: 'p1', gender: 'F'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen5-back-shiny/buizel-f.png`);
    pokemon = Sprites.getPokemon('Buizel', {side: 'p1', gender: 'F'});
    expect(pokemon.url).toBe(`${URL}/sprites/ani-back/buizel-f.gif`);
    pokemon = Sprites.getPokemon('Snover', {shiny: true, side: 'p1', gender: 'F'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen5-back-shiny/snover-f.png`);
    pokemon = Sprites.getPokemon('Snover', {side: 'p1'});
    expect(pokemon.url).toBe(`${URL}/sprites/ani-back/snover.gif`);
    pokemon = Sprites.getPokemon('Unown-F', {shiny: true, side: 'p1'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen5-back-shiny/unown-f.png`);
    pokemon = Sprites.getPokemon('Unown-F', {side: 'p1'});
    expect(pokemon.url).toBe(`${URL}/sprites/ani-back/unown-f.gif`);
    pokemon = Sprites.getPokemon('Unown-P', {shiny: true, side: 'p1'});
    expect(pokemon.url).toBe(`${URL}/sprites/gen5-back-shiny/unown-p.png`);
    pokemon = Sprites.getPokemon('Unown-P', {shiny: true});
    expect(pokemon.url).toBe(`${URL}/sprites/ani-shiny/unown-p.gif`);
  });

  it('#getDexPokemon', () => {
    let pokemon = Sprites.getDexPokemon('foobar', {gen: 4});
    expect(pokemon.url).toBe(`${URL}/sprites/gen5/0.png`);
    expect(pokemon.gen).toBe(5);
    expect(pokemon.w).toBe(96);
    expect(pokemon.h).toBe(96);
    expect(pokemon.pixelated).toBe(true);

    pokemon = Sprites.getDexPokemon('Blissey', {gen: 4, shiny: true, protocol: 'http'});
    expect(pokemon.url).toBe(`http://${DOMAIN}/sprites/gen4-shiny/blissey.png`);
    expect(pokemon.gen).toBe(4);
    expect(pokemon.w).toBe(96);
    expect(pokemon.h).toBe(96);
    expect(pokemon.pixelated).toBe(true);

    pokemon = Sprites.getDexPokemon('RAIKOU', {gen: 'gen2g', domain: 'pkmn.cc'});
    expect(pokemon.url).toBe('https://pkmn.cc/sprites/gen2g/raikou.png');
    expect(pokemon.gen).toBe(2);
    expect(pokemon.w).toBe(96);
    expect(pokemon.h).toBe(96);
    expect(pokemon.pixelated).toBe(true);

    pokemon = Sprites.getDexPokemon('melmetal', {gen: 8});
    expect(pokemon.url).toBe(`${URL}/sprites/dex/melmetal.png`);
    expect(pokemon.gen).toBe(7);
    expect(pokemon.w).toBe(128);
    expect(pokemon.h).toBe(128);

    pokemon = Sprites.getDexPokemon('fidgit');
    expect(pokemon.url).toBe(`${URL}/sprites/dex/fidgit.png`);
    expect(pokemon.gen).toBe(6);
    expect(pokemon.w).toBe(120);
    expect(pokemon.h).toBe(120);

    pokemon = Sprites.getDexPokemon('MissingNo.');
    expect(pokemon.url).toBe(`${URL}/sprites/gen1/missingno.png`);

    pokemon = Sprites.getDexPokemon('vivillonsun');
    expect(pokemon.url).toBe(`${URL}/sprites/dex/vivillon-sun.png`);

    pokemon = Sprites.getDexPokemon('Centiskorch');
    expect(pokemon.url).toBe(`${URL}/sprites/gen5/centiskorch.png`);

    pokemon = Sprites.getDexPokemon('Delphox', {shiny: true});
    expect(pokemon.url).toBe(`${URL}/sprites/dex-shiny/delphox.png`);
  });

  it('#getSubstitute', () => {
    // TODO test innerWith/innerHeight
    let sub = Sprites.getSubstitute();
    expect(sub.gen).toBe(5);
    expect(sub.w).toBe(96);
    expect(sub.h).toBe(96);
    expect(sub.url).toBe(`${URL}/sprites/substitutes/gen5/substitute.png`);
    expect(sub.pixelated).toBe(true);

    sub = Sprites.getSubstitute({gen: 'gen5ani', side: 'p1', protocol: 'http'});
    expect(sub.url).toBe(`http://${DOMAIN}/sprites/substitutes/gen5-back/substitute.png`);

    sub = Sprites.getSubstitute({gen: 2, side: 'p2', domain: 'pkmn.cc'});
    expect(sub.url).toBe('https://pkmn.cc/sprites/substitutes/gen1/substitute.png');

    sub = Sprites.getSubstitute({gen: 3, side: 'p1'});
    expect(sub.url).toBe(`${URL}/sprites/substitutes/gen3-back/substitute.png`);

    sub = Sprites.getSubstitute({gen: 'gen4dp'});
    expect(sub.url).toBe(`${URL}/sprites/substitutes/gen4/substitute.png`);
  });

  it('#getAvatar', () => {
    expect(Sprites.getAvatar(277, {domain: 'pkmn.cc'}))
      .toBe('https://pkmn.cc/sprites/trainers/cheren-gen5bw2.png');
    expect(Sprites.getAvatar('#bw2elesa'))
      .toBe(`${URL}/sprites/trainers/elesa-gen5bw2.png`);
    expect(Sprites.getAvatar('breederf'))
      .toBe(`${URL}/sprites/trainers/pokemonbreederf.png`);
    expect(Sprites.getAvatar('#pre'))
      .toBe(`${URL}/sprites/trainers-custom/pre.png`);
    expect(Sprites.getAvatar(''))
      .toBe(`${URL}/sprites/trainers/unknown.png`);
    expect(Sprites.getAvatar('<pre>'))
      .toBe(`${URL}/sprites/trainers/&lt;pre&gt;.png`);
    expect(Sprites.getAvatar('1010', {protocol: 'http'}))
      .toBe(`http://${DOMAIN}/sprites/trainers-custom/1010.png`);
  });
});

describe('Icons', () => {
  it('#getPokemon', () => {
    let pokemon = Icons.getPokemon('foobar');
    expect(pokemon.url).toBe(`${URL}/sprites/pokemonicons-sheet.png`);
    expect(pokemon.left).toBe(-0);
    expect(pokemon.top).toBe(-0);

    pokemon = Icons.getPokemon('Charizard', {protocol: 'http'});
    expect(pokemon.url).toBe(`http://${DOMAIN}/sprites/pokemonicons-sheet.png`);
    expect(pokemon.left).toBe(-240);
    expect(pokemon.top).toBe(-0);

    pokemon = Icons.getPokemon('Lucario-Mega', {domain: 'pkmn.cc', gender: 'F'});
    expect(pokemon.url).toBe('https://pkmn.cc/sprites/pokemonicons-sheet.png');
    expect(pokemon.left).toBe(-360);
    expect(pokemon.top).toBe(-3390);

    pokemon = Icons.getPokemon('Pyroar', {gender: 'F'});
    expect(pokemon.left).toBe(-320);
    expect(pokemon.top).toBe(-2790);

    pokemon = Icons.getPokemon('Kingler', {side: 'p1'});
    expect(pokemon.left).toBe(-400);
    expect(pokemon.top).toBe(-3600);

    pokemon = Icons.getPokemon('Kingler', {side: 'p2', fainted: true});
    expect(pokemon.style).toEqual(
      'display:inline-block;width:40px;height:30px;image-rendering:pixelated;' +
      `background:transparent url(${URL}/sprites/pokemonicons-sheet.png) ` +
      'no-repeat scroll -120px -240px;opacity:0.3;filter:grayscale(100%) brightness(.5);'
    );
  });

  it('#getPokeball', () => {
    expect(Icons.getPokeball('foo')).toBeUndefined();

    let pokeball = Icons.getPokeball('pokeball')!;
    expect(pokeball.url).toBe(`${URL}/sprites/pokemonicons-pokeball-sheet.png`);
    expect(pokeball.left).toBe(0);
    expect(pokeball.top).toBe(4);

    pokeball = Icons.getPokeball('pokeball-statused')!;
    expect(pokeball.left).toBe(-40);
    expect(pokeball.top).toBe(4);

    pokeball = Icons.getPokeball('pokeball-fainted')!;
    expect(pokeball.style).toEqual(
      'display:inline-block;width:40px;height:30px;image-rendering:pixelated;' +
      `opacity:0.4;filter:contrast(0);background:transparent url(${URL}/sprites/` +
      'pokemonicons-pokeball-sheet.png) no-repeat scroll 80px 4px;'
    );

    pokeball = Icons.getPokeball('pokeball-none', {protocol: 'http', domain: 'pkmn.cc'})!;
    expect(pokeball.left).toBe(-80);
    expect(pokeball.top).toBe(4);
    expect(pokeball.url).toBe('http://pkmn.cc/sprites/pokemonicons-pokeball-sheet.png');
  });

  it('#getItem', () => {
    let item = Icons.getItem('foobar');
    expect(item.url).toBe(`${URL}/sprites/itemicons-sheet.png`);
    expect(item.left).toBe(-0);
    expect(item.top).toBe(-0);

    item = Icons.getItem('Choice Band');
    expect(item.url).toBe(`${URL}/sprites/itemicons-sheet.png`);
    expect(item.left).toBe(-96);
    expect(item.top).toBe(-96);

    item = Icons.getItem('focus Band', {protocol: 'http', domain: 'pkmn.cc'});
    expect(item.style).toEqual(
      'display:inline-block;width:24px;height:24px;image-rendering:pixelated;' +
      'background:transparent url(http://pkmn.cc/sprites/itemicons-sheet.png) ' +
      'no-repeat scroll -144px -216px;'
    );
  });

  it('#getType', () => {
    expect(Icons.getType('???').url).toBe(`${URL}/sprites/types/%3f%3f%3f.png`);
    expect(Icons.getType('BIRD', {protocol: 'http'}).url)
      .toBe(`http://${DOMAIN}/sprites/types/Bird.png`);
    expect(Icons.getType('water', {domain: 'pkmn.cc'}).url)
      .toBe('https://pkmn.cc/sprites/types/Water.png');
  });
});

describe('Bundle', () => {
  it('usage', () => {
    {
      const window = {} as {pkmn: {img: {Sprites: typeof Sprites; Icons: typeof Icons}}};
      // eslint-disable-next-line no-eval
      eval(fs.readFileSync(path.resolve(__dirname, '../../build/index.min.js'), 'utf8'));
      expect(window.pkmn.img.Sprites.getPokemon('Charizard').url)
        .toBe(`${URL}/sprites/ani/charizard.gif`);

      const icon = window.pkmn.img.Icons.getPokemon('Charizard', {protocol: 'http'});
      expect(icon.url).toBe(`http://${DOMAIN}/sprites/pokemonicons-sheet.png`);
      expect(icon.left).toBe(-240);
      expect(icon.top).toBe(-0);
    }
  });
});
