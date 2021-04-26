import {Dex} from '@pkmn/dex';
import {Generations, ID} from '@pkmn/data';
import {DetailedPokemon, PokemonIdent, Username} from '@pkmn/protocol';

import {Battle} from '../index';

const GENS = new Generations(Dex);

// NOTE: tested exhaustively in integration/src/test/client.js
describe('Battle', () => {
  it.todo('#setTurn');
  it.todo('#updateToxicTurns');

  it('#parsePokemonId', () => {
    const battle = new Battle(GENS);

    let p = battle.parsePokemonId('p1');
    expect(p.name).toEqual('');
    expect(p.siden).toEqual(0);
    expect(p.slot).toEqual(-1);
    expect(p.pokemonid).toEqual('p1');

    p = battle.parsePokemonId('p2');
    expect(p.name).toEqual('');
    expect(p.siden).toEqual(1);
    expect(p.slot).toEqual(-1);
    expect(p.pokemonid).toEqual('p2');

    p = battle.parsePokemonId('p1: Gengar' as PokemonIdent);
    expect(p.name).toEqual('Gengar');
    expect(p.siden).toEqual(0);
    expect(p.slot).toEqual(-1);
    expect(p.pokemonid).toEqual('p1: Gengar');

    p = battle.parsePokemonId('p2: Mew' as PokemonIdent);
    expect(p.name).toEqual('Mew');
    expect(p.siden).toEqual(1);
    expect(p.slot).toEqual(-1);
    expect(p.pokemonid).toEqual('p2: Mew');

    p = battle.parsePokemonId('p1c: Rapidash' as PokemonIdent);
    expect(p.name).toEqual('Rapidash');
    expect(p.siden).toEqual(0);
    expect(p.slot).toEqual(2);
    expect(p.pokemonid).toEqual('p1: Rapidash');

    p = battle.parsePokemonId('p2x: Arcanine' as PokemonIdent);
    expect(p.name).toEqual('p2x: Arcanine');
    expect(p.siden).toEqual(-1);
    expect(p.slot).toEqual(-1);
    expect(p.pokemonid).toEqual('p2x: Arcanine');

    p = battle.parsePokemonId('p3: Foo' as PokemonIdent);
    expect(p.name).toEqual('Foo');
    expect(p.siden).toEqual(2);
    expect(p.slot).toEqual(-1);
    expect(p.pokemonid).toEqual('p3: Foo');
  });

  it.todo('#getSwitchedPokemon');
  it.todo('#rememberTeamPreviewPokemon');
  it.todo('#findCorrespondingPokemon');

  it('#getSide', () => {
    const battle = new Battle(GENS);
    expect(battle.getSide('p1')).toBe(battle.p1);
    expect(battle.getSide('p2')).toBe(battle.p2);

    expect(battle.getSide('p1: Pikachu')).toBe(battle.p1);
    expect(battle.getSide('p2: Gengar')).toBe(battle.p2);

    battle.p1.setName('Foo' as Username);
    battle.p2.setName('Bar' as Username);

    expect(battle.getSide('Foo')).toBe(battle.p1);
    expect(battle.getSide('bar')).toBe(battle.p2);

    expect(battle.getSide('What The F')).toEqual({name: 'What The F', id: 'WhatTheF'}); // WTF?
  });

  it.todo('#getPokemon');
  it.todo('#checkActive');

  it('#pokemonAt', () => {
    const battle = new Battle(GENS);
    expect(battle.pokemonAt('p1', 0)).toBeUndefined();

    const pokemon = battle.p1.addPokemon({ident: 'p1: Gengar'} as DetailedPokemon);
    battle.p1.active[0] = pokemon;
    expect(battle.pokemonAt('p1', 0)).toBe('p1: Gengar');
    expect(battle.pokemonAt('p1', 2)).toBeUndefined();
  });

  it.todo('#damagePercentage');

  it('#currentWeather', () => {
    const battle = new Battle(GENS);
    battle.field.setWeather('raindance' as ID);
    expect(battle.currentWeather()).toBe('rain');
  });

  it('#reset', () => {
    const battle = new Battle(GENS);
    const field = battle.field;
    field.setWeather('raindance' as ID);
    battle.turn = 10;
    battle.lastMove = 'healing-wish';

    battle.reset();

    expect(battle.turn).toBe(0);
    expect(battle.field.weather).toBeUndefined();
    expect(battle.field.weatherState.id).toBe('');
    expect(battle.lastMove).toBe('');
  });

  it('#destroy', () => {
    const battle = new Battle(GENS);

    const field = battle.field;
    const p1 = battle.p1;
    const p2 = battle.p2;

    battle.destroy();

    expect(field.battle).toBeNull();
    expect(battle.field).toBeNull();
    expect(p1.battle).toBeNull();
    expect(p2.battle).toBeNull();
    expect(battle.sides).toEqual([null, null]);
    expect(battle.p1).toBeNull();
    expect(battle.p2).toBeNull();
  });
});
