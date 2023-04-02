import {Effect, ID} from '@pkmn/dex';
import {DetailedPokemon, Protocol} from '@pkmn/protocol';

import {Battle, Side} from '../index';

// NOTE: tested exhaustively in integration/src/test/client.js
describe('Side', () => {
  it('#setName', () => {
    const side = new Side({} as Battle, 0);
    side.setName('Foo' as Protocol.Username, '13' as Protocol.AvatarIdent);
    expect(side.name).toBe('Foo');
    expect(side.id).toBe('foo');
    expect(side.avatar).toBe('13');
  });

  it('#sideConditions', () => {
    const side = new Side({gen: {num: 8}} as Battle, 0);

    side.addSideCondition({id: 'spikes', name: 'Spikes'} as unknown as Effect, false);
    expect(side.sideConditions['spikes'])
      .toEqual({name: 'Spikes', level: 1, minDuration: 0, maxDuration: 0});
    side.addSideCondition({id: 'spikes', name: 'Spikes'} as unknown as Effect, false);
    expect(side.sideConditions['spikes'])
      .toEqual({name: 'Spikes', level: 2, minDuration: 0, maxDuration: 0});

    side.addSideCondition({id: 'tailwind', name: 'Tailwind'} as unknown as Effect, false);
    expect(side.sideConditions['tailwind'])
      .toEqual({name: 'Tailwind', level: 1, minDuration: 4, maxDuration: 0});

    side.addSideCondition({id: 'lightscreen', name: 'Light Screen'} as unknown as Effect, false);
    expect(side.sideConditions['lightscreen'])
      .toEqual({name: 'Light Screen', level: 1, minDuration: 5, maxDuration: 8});

    side.removeSideCondition('tailwind' as ID);
    expect(side.sideConditions['tailwind']).toBeUndefined();
  });

  it.todo('#addPokemon');

  it('#switchIn', () => {
    const side = new Side({gen: {num: 8}} as Battle, 0);
    let pokemon = side.addPokemon({} as DetailedPokemon);
    pokemon.slot = 2;
    pokemon.lastMove = 'tackle' as ID;
    pokemon.addVolatile('foo' as ID, {level: 1});

    side.switchIn(pokemon);

    expect(side.active[2]).toBe(pokemon);
    expect(pokemon.lastMove).toBe('');
    expect(side.battle.lastMove).toBe('switch-in');
    expect(pokemon.hasVolatile('foo' as ID)).toBe(false);

    side.lastPokemon = pokemon;
    pokemon.lastMove = 'batonpass' as ID;
    pokemon.addVolatile('bar' as ID, {level: 1});

    pokemon = side.addPokemon({} as DetailedPokemon);
    side.switchIn(pokemon, {id: 'batonpass' as ID}, 2);

    expect(side.active[2]).toBe(pokemon);
    expect(pokemon.lastMove).toBe('');
    expect(side.battle.lastMove).toBe('switch-in');
    expect(pokemon.hasVolatile('bar' as ID)).toBe(true);
  });

  it('#dragIn', () => {
    const side = new Side({gen: {num: 8}} as Battle, 0);
    const poke1 = side.addPokemon({} as DetailedPokemon);
    const poke2 = side.addPokemon({} as DetailedPokemon);

    expect(poke1.slot).toBe(0);
    expect(side.active[0]).toBeNull();

    poke1.statusStage = 1;
    side.dragIn(poke1);

    expect(poke1.slot).toBe(0);
    expect(poke1.statusStage).toBe(0);
    expect(side.active[0]).toBe(poke1);
    expect(side.lastPokemon).toBeNull();
    expect(side.battle.lastMove).toBe('switch-in');

    poke1.statusStage = 1;
    side.dragIn(poke1);

    expect(poke1.slot).toBe(0);
    expect(poke1.statusStage).toBe(1);
    expect(side.active[0]).toBe(poke1);
    expect(side.lastPokemon).toBeNull();
    expect(side.battle.lastMove).toBe('switch-in');

    poke1.statusStage = 1;
    poke2.statusStage = 2;
    side.dragIn(poke2);

    expect(poke1.slot).toBe(0);
    expect(poke1.statusStage).toBe(0);
    expect(poke2.slot).toBe(0);
    expect(poke2.statusStage).toBe(0);
    expect(side.active[0]).toBe(poke2);
    expect(side.lastPokemon).toBe(poke1);
    expect(side.battle.lastMove).toBe('switch-in');

    poke1.statusStage = 1;
    poke2.statusStage = 2;
    side.dragIn(poke1, 2);

    expect(poke1.slot).toBe(2);
    expect(poke1.statusStage).toBe(0);
    expect(poke2.slot).toBe(0);
    expect(poke2.statusStage).toBe(2);
    expect(side.active[0]).toBe(poke2);
    expect(side.active[1]).toBeUndefined();
    expect(side.active[2]).toBe(poke1);
    expect(side.lastPokemon).toBeUndefined();
    expect(side.battle.lastMove).toBe('switch-in');
  });

  it.todo('#replace');
  it.todo('#switchOut');

  it('#swapTo', () => {
    const side = new Side({gen: {num: 8}} as Battle, 0);
    const poke1 = side.addPokemon({} as DetailedPokemon);
    const poke2 = side.addPokemon({} as DetailedPokemon);

    poke1.slot = 0;
    poke2.slot = 1;
    side.active[0] = poke1;
    side.active[1] = poke2;

    expect(poke1.slot).toBe(0);
    expect(poke2.slot).toBe(1);
    expect(side.active[0]).toBe(poke1);
    expect(side.active[1]).toBe(poke2);

    side.swapTo(poke1, 0);

    expect(poke1.slot).toBe(0);
    expect(poke2.slot).toBe(1);
    expect(side.active[0]).toBe(poke1);
    expect(side.active[1]).toBe(poke2);

    side.swapTo(poke1, 1);

    expect(poke1.slot).toBe(1);
    expect(poke2.slot).toBe(0);
    expect(side.active[0]).toBe(poke2);
    expect(side.active[1]).toBe(poke1);

    side.swapTo(poke1, 2);

    expect(poke1.slot).toBe(2);
    expect(poke2.slot).toBe(0);
    expect(side.active[0]).toBe(poke2);
    expect(side.active[1]).toBeUndefined();
    expect(side.active[2]).toBe(poke1);
  });

  it('#swapWith', () => {
    const side = new Side({gen: {num: 8}} as Battle, 0);
    const poke1 = side.addPokemon({} as DetailedPokemon);
    const poke2 = side.addPokemon({} as DetailedPokemon);

    poke1.slot = 0;
    poke2.slot = 1;
    side.active[0] = poke1;
    side.active[1] = poke2;

    expect(poke1.slot).toBe(0);
    expect(poke2.slot).toBe(1);
    expect(side.active[0]).toBe(poke1);
    expect(side.active[1]).toBe(poke2);

    side.swapWith(poke1, poke1);

    expect(poke1.slot).toBe(0);
    expect(poke2.slot).toBe(1);
    expect(side.active[0]).toBe(poke1);
    expect(side.active[1]).toBe(poke2);

    side.swapWith(poke1, poke2);

    expect(poke1.slot).toBe(1);
    expect(poke2.slot).toBe(0);
    expect(side.active[0]).toBe(poke2);
    expect(side.active[1]).toBe(poke1);
  });

  it('#faint', () => {
    const side = new Side({gen: {num: 8}} as Battle, 0);
    const pokemon = side.addPokemon({details: '', searchid: ''} as DetailedPokemon);

    pokemon.addVolatile('baz' as ID);
    pokemon.hp = 100;
    side.active[0] = pokemon;

    side.faint(pokemon);

    expect(pokemon.hasVolatile('baz' as ID)).toBe(false);
    expect(side.lastPokemon).toBe(pokemon);
    expect(side.active).toEqual([null]);
    expect(pokemon.fainted).toBe(true);
    expect(pokemon.hp).toBe(0);
  });

  it('#reset', () => {
    const side = new Side({gen: {num: 8}} as Battle, 0);
    const pokemon = side.addPokemon({} as DetailedPokemon);

    expect(pokemon.side).toBe(side);
    side.active[0] = pokemon;
    side.lastPokemon = pokemon;
    side.addSideCondition({id: 'tailwind', name: 'Tail Wind'} as Effect, false);

    side.reset();

    expect(pokemon.side).toBeNull();
    expect(side.lastPokemon).toBeNull();
    expect(side.active).toEqual([null]);
    expect(side.team).toEqual([]);
    expect(side.sideConditions['tailwind']).toBeUndefined();
  });

  it('#destroy', () => {
    const side = new Side({gen: {num: 8}} as Battle, 0);
    const foe = new Side({gen: {num: 8}} as Battle, 1);
    const pokemon = side.addPokemon({} as DetailedPokemon);

    expect(pokemon.side).toBe(side);
    side.active[0] = pokemon;
    side.lastPokemon = pokemon;
    side.foe = foe;
    side.addSideCondition({id: 'stealthrock', name: 'Stealth Rock'} as Effect, false);

    side.destroy();

    expect(pokemon.side).toBeNull();
    expect(side.lastPokemon).toBeNull();
    expect(side.active).toEqual([null]);
    expect(side.team).toEqual([]);
    expect(side.sideConditions['stealthrock'])
      .toEqual({name: 'Stealth Rock', level: 1, minDuration: 0, maxDuration: 0}); // WTF?
    expect(side.battle).toBeNull();
    expect(side.foe).toBeNull();
  });
});
