import {Sprites, Icons} from '../index';

const PROTOCOL = 'https';
const DOMAIN = 'play.pokemonshowdown.com';
const URL = `${PROTOCOL}://${DOMAIN}`;

describe('Sprites', () => {
  test('#getPokemon', () => {
    // TODO
  });

  test('#getDexPokemon', () => {
    // TODO
  });

  test('#getSubstitute', () => {
    // TODO
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
    expect(pokemon.extra).toBeUndefined();
    expect(pokemon.left).toEqual(-240);
    expect(pokemon.top).toEqual(-0);

    pokemon = Icons.getPokemon('Lucario-Mega', {domain: 'pkmn.cc', gender: 'F'});
    expect(pokemon.url).toEqual(`https://pkmn.cc/sprites/pokemonicons-sheet.png`);
    expect(pokemon.extra).toBeUndefined();
    expect(pokemon.left).toEqual(-360);
    expect(pokemon.top).toEqual(-2850);

    pokemon = Icons.getPokemon('Pyroar', {gender: 'F'});
    expect(pokemon.extra).toBeUndefined();
    expect(pokemon.left).toEqual(-320);
    expect(pokemon.top).toEqual(-2460);

    pokemon = Icons.getPokemon('Kingler', {side: 'p1'});
    expect(pokemon.extra).toBeUndefined();
    expect(pokemon.left).toEqual(-400);
    expect(pokemon.top).toEqual(-2970);

    pokemon = Icons.getPokemon('Kingler', {side: 'p2', fainted: true});
    expect(pokemon.extra).toEqual(';opacity:.3;filter:grayscale(100%) brightness(.5)');
    expect(pokemon.style).toEqual(
      'width:40px;height:30px;image-rendering:pixelated;' +
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
    expect(pokeball.extra).toBeUndefined();

    pokeball = Icons.getPokeball('pokeball-statused')!;
    expect(pokeball.left).toEqual(-40);
    expect(pokeball.top).toEqual(4);
    expect(pokeball.extra).toBeUndefined();

    pokeball = Icons.getPokeball('pokeball-fainted')!;
    expect(pokeball.extra).toEqual(';opacity:.4;filter:contrast(0)');
    expect(pokeball.style).toEqual(
      'width:40px;height:30px;image-rendering:pixelated;' +
      `background:transparent url(${URL}/sprites/pokemonicons-pokeball-sheet.png) ` +
      `no-repeat scroll 80px 4px;opacity:.4;filter:contrast(0)`
    );

    pokeball = Icons.getPokeball('pokeball-none', {protocol: 'http', domain: 'pkmn.cc'})!;
    expect(pokeball.left).toEqual(-80);
    expect(pokeball.top).toEqual(4);
    expect(pokeball.extra).toBeUndefined();
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
      'width:24px;height:24x;image-rendering:pixelated;' +
      'background:transparent url(http://pkmn.cc/sprites/itemicons-sheet.png) ' +
      'no-repeat scroll -144px -216px')

  });

  test('#getType', () => {
    expect(Icons.getType('???').url).toEqual(`${URL}/sprites/types/%3f%3f%3f.png`);
    expect(Icons.getType('BIRD', {protocol: 'http'}).url)
      .toEqual(`http://${DOMAIN}/sprites/types/Bird.png`);
    expect(Icons.getType('water', {domain: 'pkmn.cc'}).url)
      .toEqual(`https://pkmn.cc/sprites/types/Water.png`);
  });
});
