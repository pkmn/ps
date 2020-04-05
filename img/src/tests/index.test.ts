import {Sprites, Icons} from '../index';

const PROTOCOL = 'https';
const DOMAIN = 'play.pokemonshowdown.com';
const URL = `${PROTOCOL}://${DOMAIN}`;

describe('Sprites', () => {
  test('#getPokemon', () => {
    let pokemon = Sprites.getPokemon('foobar', {gen: 4});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen5/0.png`);
    expect(pokemon.gen).toBe(5);
    expect(pokemon.w).toBe(96);
    expect(pokemon.h).toBe(96);
    expect(pokemon.pixelated).toBe(true);

    pokemon = Sprites.getPokemon('gengar', {gen: 'gen4dp'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen4dp/gengar.png`);
    expect(pokemon.gen).toBe(4);
    expect(pokemon.w).toBe(96);
    expect(pokemon.h).toBe(96);
    expect(pokemon.pixelated).toBe(true);

    pokemon = Sprites.getPokemon('Charizard', {side: 'p1', shiny: true, gender: 'F'});
    expect(pokemon.url).toEqual(`${URL}/sprites/ani-back-shiny/charizard.gif`);
    expect(pokemon.gen).toBe(8);
    expect(pokemon.w).toBe(172);
    expect(pokemon.h).toBe(166);
    expect(pokemon.pixelated).toBe(false);

    pokemon = Sprites.getPokemon('butterfree', {gen: 6, side: 'p1', gender: 'F'});
    expect(pokemon.url).toEqual(`${URL}/sprites/ani-back/butterfree-f.gif`);
    expect(pokemon.gen).toBe(6);
    expect(pokemon.w).toBe(103);
    expect(pokemon.h).toBe(103);
    expect(pokemon.pixelated).toBe(false);

    pokemon = Sprites.getPokemon('corviknight', {gen: 'gen5ani', protocol: 'http'});
    expect(pokemon.url).toEqual(`http://${DOMAIN}/sprites/gen5ani/corviknight.gif`);
    pokemon = Sprites.getPokemon('corviknight', {gen: 'gen5ani', protocol: 'http'});
    expect(pokemon.url).toEqual(`http://${DOMAIN}/sprites/gen5ani/corviknight.gif`);
    pokemon = Sprites.getPokemon('tyranitar', {gen: 'gen1rb'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen2/tyranitar.png`);
    pokemon = Sprites.getPokemon('greninja', {gen: 'gen2g'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen5/greninja.png`);
    pokemon = Sprites.getPokemon('snorlax', {gen: 'gen1rb', shiny: true});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen1rb/snorlax.png`);
    pokemon = Sprites.getPokemon('butterfree', {gen: 3, side: 'p1', gender: 'F'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen3-back/butterfree.png`);

    pokemon = Sprites.getPokemon('Froslass', {gen: 'gen4dp-2', shiny: true});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen4dp-2-shiny/froslass.png`);
    pokemon = Sprites.getPokemon('Chansey', {gen: 'gen1rb', side: 'p1'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen1-back/chansey.png`);
    pokemon = Sprites.getPokemon('Mew', {gen: 'gen1rg', side: 'p1'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen1-back/mew.png`);
    pokemon = Sprites.getPokemon('Mew', {gen: 'gen2g', shiny: true, side: 'p1'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen2-back-shiny/mew.png`);
    pokemon = Sprites.getPokemon('Suicune', {gen: 'gen2s', side: 'p1'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen2-back/suicune.png`);
    pokemon = Sprites.getPokemon('Metagross', {gen: 'gen3rs', shiny: true, side: 'p1'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen3-back-shiny/metagross.png`);
    pokemon = Sprites.getPokemon('Suicune', {gen: 'gen3frlg', side: 'p1'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen3-back/suicune.png`);
    pokemon = Sprites.getPokemon('Froslass', {gen: 'gen4dp', side: 'p1'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen4-back/froslass.png`);

    pokemon = Sprites.getPokemon('Squirtle', {gen: 'gen3frlg', shiny: true});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen3frlg-shiny/squirtle.png`);
    pokemon = Sprites.getPokemon('Deoxys-Attack', {gen: 'gen3frlg'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen3frlg/deoxys-attack.png`);
    pokemon = Sprites.getPokemon('Teddiursa', {gen: 'gen3frlg'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen3frlg/teddiursa.png`);
    pokemon = Sprites.getPokemon('Blaziken', {gen: 'gen3frlg', shiny: true});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen3-shiny/blaziken.png`);

    pokemon = Sprites.getPokemon('Unown-B', {gen: 3});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen3/unown-b.png`);
    pokemon = Sprites.getPokemon('Arceus-Bug', {gen: 'gen5ani', shiny: true});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen5ani-shiny/arceus-bug.gif`);
    pokemon = Sprites.getPokemon('Toxtricity-Low-Key-Gmax');
    expect(pokemon.url).toEqual(`${URL}/sprites/ani/toxtricity-gmax.gif`);
    pokemon = Sprites.getPokemon('Flabébé', {gen: 'ani'});
    expect(pokemon.url).toEqual(`${URL}/sprites/ani/flabebe.gif`);

    pokemon = Sprites.getPokemon('Chesnaught', {gen: 'gen5ani'});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen5ani/chesnaught.gif`);
    pokemon = Sprites.getPokemon('Chesnaught', {gen: 'gen5ani', shiny: true});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen5-shiny/chesnaught.png`);
  });

  test('#getDexPokemon', () => {
    let pokemon = Sprites.getDexPokemon('foobar', {gen: 4});
    expect(pokemon.url).toEqual(`${URL}/sprites/gen5/0.png`);
    expect(pokemon.gen).toBe(5);
    expect(pokemon.w).toBe(96);
    expect(pokemon.h).toBe(96);
    expect(pokemon.pixelated).toBe(true);

    pokemon = Sprites.getDexPokemon('Blissey', {gen: 4, shiny: true, protocol: 'http'});
    expect(pokemon.url).toEqual(`http://${DOMAIN}/sprites/gen4-shiny/blissey.png`);
    expect(pokemon.gen).toBe(4);
    expect(pokemon.w).toBe(96);
    expect(pokemon.h).toBe(96);
    expect(pokemon.pixelated).toBe(true);

    pokemon = Sprites.getDexPokemon('RAIKOU', {gen: 'gen2g', domain: 'pkmn.cc'});
    expect(pokemon.url).toEqual(`https://pkmn.cc/sprites/gen2g/raikou.png`);
    expect(pokemon.gen).toBe(2);
    expect(pokemon.w).toBe(96);
    expect(pokemon.h).toBe(96);
    expect(pokemon.pixelated).toBe(true);

    pokemon = Sprites.getDexPokemon('melmetal', {gen: 8});
    expect(pokemon.url).toEqual(`${URL}/sprites/dex/melmetal.png`);
    expect(pokemon.gen).toBe(7);
    expect(pokemon.w).toBe(128);
    expect(pokemon.h).toBe(128);

    pokemon = Sprites.getDexPokemon('fidgit');
    expect(pokemon.url).toEqual(`${URL}/sprites/dex/fidgit.png`);
    expect(pokemon.gen).toBe(6);
    expect(pokemon.w).toBe(120);
    expect(pokemon.h).toBe(120);

    pokemon = Sprites.getDexPokemon('MissingNo.');
    expect(pokemon.url).toEqual(`${URL}/sprites/gen5/missingno.png`);

    pokemon = Sprites.getDexPokemon('vivillonsun');
    expect(pokemon.url).toEqual(`${URL}/sprites/dex/vivillon-sun.png`);

    pokemon = Sprites.getDexPokemon('Centiskorch');
    expect(pokemon.url).toEqual(`${URL}/sprites/gen5/centiskorch.png`);

    pokemon = Sprites.getDexPokemon('Delphox', {shiny: true});
    expect(pokemon.url).toEqual(`${URL}/sprites/dex-shiny/delphox.png`);
  });

  test('#getSubstitute', () => {
    // TODO test innerWith/innerHeight
    let sub = Sprites.getSubstitute();
    expect(sub.gen).toEqual(5);
    expect(sub.w).toEqual(96);
    expect(sub.h).toEqual(96);
    expect(sub.url).toEqual(`${URL}/sprites/substitutes/gen5/substitute.png`);
    expect(sub.pixelated).toBe(true);

    sub = Sprites.getSubstitute('gen5ani', {side: 'p1', protocol: 'http'});
    expect(sub.url).toEqual(`http://${DOMAIN}/sprites/substitutes/gen5-back/substitute.png`);

    sub = Sprites.getSubstitute(2, {side: 'p2', domain: 'pkmn.cc'});
    expect(sub.url).toEqual(`https://pkmn.cc/sprites/substitutes/gen1/substitute.png`);

    sub = Sprites.getSubstitute(3, {side: 'p1'});
    expect(sub.url).toEqual(`${URL}/sprites/substitutes/gen3-back/substitute.png`);

    sub = Sprites.getSubstitute('gen4dp');
    expect(sub.url).toEqual(`${URL}/sprites/substitutes/gen4/substitute.png`);
  });

  test('#getAvatar', () => {
    expect(Sprites.getAvatar(277, {domain: 'pkmn.cc'}))
      .toEqual('https://pkmn.cc/sprites/trainers/cheren-gen5bw2.png');
    expect(Sprites.getAvatar('#bw2elesa'))
      .toEqual(`${URL}/sprites/trainers/elesa-gen5bw2.png`);
    expect(Sprites.getAvatar('breederf'))
      .toEqual(`${URL}/sprites/trainers/pokemonbreederf.png`);
    expect(Sprites.getAvatar('#pre'))
      .toEqual(`${URL}/sprites/trainers-custom/pre.png`);
    expect(Sprites.getAvatar(''))
      .toEqual(`${URL}/sprites/trainers/unknown.png`);
      expect(Sprites.getAvatar('<pre>'))
      .toEqual(`${URL}/sprites/trainers/&lt;pre&gt;.png`);
    expect(Sprites.getAvatar('1010', {protocol: 'http'}))
      .toEqual(`http://${DOMAIN}/sprites/trainers-custom/1010.png`);
  });
});

describe('Icons', () => {
  test('#getPokemon', () => {
    let pokemon = Icons.getPokemon('foobar');
    expect(pokemon.url).toEqual(`${URL}/sprites/pokemonicons-sheet.png`);
    expect(pokemon.left).toEqual(-0);
    expect(pokemon.top).toEqual(-0);

    pokemon = Icons.getPokemon('Charizard', {protocol: 'http'});
    expect(pokemon.url).toEqual(`http://${DOMAIN}/sprites/pokemonicons-sheet.png`);
    expect(pokemon.extra).toEqual('');
    expect(pokemon.left).toEqual(-240);
    expect(pokemon.top).toEqual(-0);

    pokemon = Icons.getPokemon('Lucario-Mega', {domain: 'pkmn.cc', gender: 'F'});
    expect(pokemon.url).toEqual(`https://pkmn.cc/sprites/pokemonicons-sheet.png`);
    expect(pokemon.extra).toEqual('');
    expect(pokemon.left).toEqual(-360);
    expect(pokemon.top).toEqual(-2850);

    pokemon = Icons.getPokemon('Pyroar', {gender: 'F'});
    expect(pokemon.extra).toEqual('');
    expect(pokemon.left).toEqual(-320);
    expect(pokemon.top).toEqual(-2460);

    pokemon = Icons.getPokemon('Kingler', {side: 'p1'});
    expect(pokemon.extra).toEqual('');
    expect(pokemon.left).toEqual(-400);
    expect(pokemon.top).toEqual(-2970);

    pokemon = Icons.getPokemon('Kingler', {side: 'p2', fainted: true});
    expect(pokemon.extra).toEqual(';opacity:.3;filter:grayscale(100%) brightness(.5)');
    expect(pokemon.style).toEqual(
      'display:inline-block;width:40px;height:30px;image-rendering:pixelated;' +
      `background:transparent url(${URL}/sprites/pokemonicons-sheet.png) ` +
      'no-repeat scroll -120px -240px;opacity:.3;filter:grayscale(100%) brightness(.5)'
    );
  });

  test('#getPokeball', () => {
    expect(Icons.getPokeball('foo')).toBeUndefined();

    let pokeball = Icons.getPokeball('pokeball')!;
    expect(pokeball.url).toEqual(`${URL}/sprites/pokemonicons-pokeball-sheet.png`);
    expect(pokeball.left).toEqual(0);
    expect(pokeball.top).toEqual(4);
    expect(pokeball.extra).toEqual('');

    pokeball = Icons.getPokeball('pokeball-statused')!;
    expect(pokeball.left).toEqual(-40);
    expect(pokeball.top).toEqual(4);
    expect(pokeball.extra).toEqual('');

    pokeball = Icons.getPokeball('pokeball-fainted')!;
    expect(pokeball.extra).toEqual(';opacity:.4;filter:contrast(0)');
    expect(pokeball.style).toEqual(
      'display:inline-block;width:40px;height:30px;image-rendering:pixelated;' +
      `background:transparent url(${URL}/sprites/pokemonicons-pokeball-sheet.png) ` +
      `no-repeat scroll 80px 4px;opacity:.4;filter:contrast(0)`
    );

    pokeball = Icons.getPokeball('pokeball-none', {protocol: 'http', domain: 'pkmn.cc'})!;
    expect(pokeball.left).toEqual(-80);
    expect(pokeball.top).toEqual(4);
    expect(pokeball.extra).toEqual('');
    expect(pokeball.url).toEqual(`http://pkmn.cc/sprites/pokemonicons-pokeball-sheet.png`);
  });

  test('#getItem', () => {
    let item = Icons.getItem('foobar');
    expect(item.url).toEqual(`${URL}/sprites/itemicons-sheet.png`);
    expect(item.left).toEqual(-0);
    expect(item.top).toEqual(-0);

    item = Icons.getItem('Choice Band');
    expect(item.url).toEqual(`${URL}/sprites/itemicons-sheet.png`);
    expect(item.left).toEqual(-96);
    expect(item.top).toEqual(-96);

    item = Icons.getItem('focus Band', {protocol: 'http', domain: 'pkmn.cc'});
    expect(item.style).toEqual(
      'display:inline-block;width:24px;height:24x;image-rendering:pixelated;' +
      'background:transparent url(http://pkmn.cc/sprites/itemicons-sheet.png) ' +
      'no-repeat scroll -144px -216px');
  });

  test('#getType', () => {
    expect(Icons.getType('???').url).toEqual(`${URL}/sprites/types/%3f%3f%3f.png`);
    expect(Icons.getType('BIRD', {protocol: 'http'}).url)
      .toEqual(`http://${DOMAIN}/sprites/types/Bird.png`);
    expect(Icons.getType('water', {domain: 'pkmn.cc'}).url)
      .toEqual(`https://pkmn.cc/sprites/types/Water.png`);
  });
});
