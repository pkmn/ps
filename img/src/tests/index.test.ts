import {Sprites, Icons} from '../index';

const PROTOCOL = 'https';
const DOMAIN = 'play.pokemonshowdown.com';
const URL = `${PROTOCOL}://${DOMAIN}`;

describe('Sprites', () => {
  test('#getPokemon', () => {
  });
  test('#getDexPokemon', () => {
  });
  test('#getSubstitute', () => {
    // TODO
  });
  test('#getAvatar', () => {
    // 277 - cheren-gen5bw2
    // #bw2elesa - elesa-gen5bw2
    // breederf -> pokemonbreederf
    // 1010 -> #1010 FIXME make sure this goes to custom?
    // TODO custom
  });
});

describe('Icons', () => {
  test('#getPokemon', () => {
    let pokemon = Icons.getPokemon('foobar'); // TODO
    pokemon = Icons.getPokemon('Charizard', {protocol: 'http'});
    pokemon = Icons.getPokemon('Lucario-Mega', {domain: 'pkmn', gender: 'F'});
    pokemon = Icons.getPokemon('Pyroar', {gender: 'F'});
    pokemon = Icons.getPokemon('Kingler', {side: 'p1'});
    pokemon = Icons.getPokemon('Kingler', {side: 'p2', fainted: true});
  });
  test('#getPokeball', () => {
    // TODO
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

    item = Icons.getItem('focus Band', {protocol: 'http', domain: 'pkmn.com'});
    expect(item.style).toEqual(
      'width:24px;height:24x;image-rendering:pixelated;' +
      'background:transparent url(http://pkmn.com/sprites/itemicons-sheet.png) ' +
      'no-repeat scroll -144px -216px')

  });
  test('#getType', () => {
    expect(Icons.getType('???').url).toEqual(`${URL}/sprites/types/%3f%3f%3f.png`);
    expect(Icons.getType('BIRD', {protocol: 'http'}).url)
      .toEqual(`http://${DOMAIN}/sprites/types/Bird.png`);
    expect(Icons.getType('water', {domain: 'pkmn.com'}).url)
      .toEqual(`https://pkmn.com/sprites/types/Water.png`);
  });
});
