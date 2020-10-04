import {Dex} from '@pkmn/dex';
import {Generations, ID} from '@pkmn/data';

import {Field, Battle, Pokemon} from '../index';

const gen = new Generations(Dex).get(8);

// NOTE: tested exhaustively in integration/src/test/client.js
describe('Field', () => {
  it('#pseudoWeather', () => {
    const field = new Field({sides: []} as unknown as Battle);
    expect(field.hasPseudoWeather('trickroom' as ID)).toBe(false);
    field.addPseudoWeather('trickroom' as ID, 3, 5);
    expect(field.hasPseudoWeather('trickroom' as ID)).toBe(true);
    field.addPseudoWeather('gravity' as ID, 1, 3);
    field.upkeep();
    expect(field.pseudoWeather).toEqual({
      trickroom: {id: 'trickroom', minDuration: 2, maxDuration: 4},
      gravity: {id: 'gravity', minDuration: 0, maxDuration: 2},
    });
    field.removePseudoWeather('gravity' as ID);
    expect(field.hasPseudoWeather('gravity' as ID)).toBe(false);
    expect(field.hasPseudoWeather('trickroom' as ID)).toBe(true);
  });

  it('#changeWeather', () => {
    const field = new Field({gen} as unknown as Battle);

    field.changeWeather('');
    expect(field.weather).toBeUndefined();

    field.changeWeather('none' as ID);
    expect(field.weather).toBeUndefined();

    field.changeWeather('sunnyday' as ID, {} as Pokemon);
    expect(field.weather).toBe('Sun');
    expect(field.weatherData).toEqual({id: 'sunnyday', minDuration: 5, maxDuration: 8});

    field.changeWeather('sunnyday' as ID, undefined, true);
    expect(field.weather).toBe('Sun');
    expect(field.weatherData).toEqual({id: 'sunnyday', minDuration: 4, maxDuration: 7});

    field.changeWeather('desolateland' as ID, {} as Pokemon);
    expect(field.weather).toBe('Harsh Sunshine');
    expect(field.weatherData).toEqual({id: 'desolateland', minDuration: 0, maxDuration: 0});

    field.changeWeather('deltastream' as ID);
    expect(field.weather).toBe('Strong Winds');
    expect(field.weatherData).toEqual({id: 'deltastream', minDuration: 0, maxDuration: 0});

    field.changeWeather('raindance' as ID);
    expect(field.weather).toBe('Rain');
    expect(field.weatherData).toEqual({id: 'raindance', minDuration: 5, maxDuration: 8});
  });

  it('#changeTerrain', () => {
    const field = new Field({gen} as unknown as Battle);

    field.changeTerrain('electricterrain' as ID);
    expect(field.terrain).toBe('Electric');
    expect(field.terrainData).toEqual({id: 'electricterrain', minDuration: 5, maxDuration: 8});

    field.changeTerrain('' as ID);
    expect(field.terrain).toBeUndefined();
    expect(field.terrainData).toEqual({id: '', minDuration: 0, maxDuration: 0});

    field.changeTerrain('mistyterrain' as ID);
    expect(field.terrain).toBe('Misty');
    expect(field.terrainData).toEqual({id: 'mistyterrain', minDuration: 5, maxDuration: 8});
  });

  it('#reset', () => {
    const field = new Field({gen} as Battle);
    field.changeWeather('raindance' as ID);
    field.weatherData.minDuration = 3;
    field.weatherData.maxDuration = 5;
    field.addPseudoWeather('trickroom' as ID, 3, 5);

    field.reset();

    expect(field.weather).toBeUndefined();
    expect(field.weatherData).toEqual({id: '', minDuration: 0, maxDuration: 0});
    expect(field.hasPseudoWeather('trickroom' as ID)).toBe(false);
  });

  it('#destroy', () => {
    const field = new Field({} as Battle);
    expect(field.battle).not.toBeNull();
    field.destroy();
    expect(field.battle).toBeNull();
  });
});
