import {Dex} from '@pkmn/dex';
import {Generations, ID} from '@pkmn/data';

import {Field, Battle, Pokemon} from '../index';

const gen = new Generations(Dex).get(8);

// NOTE: tested exhaustively in integration/src/test/client.js
describe('Field', () => {
  it('pseudoWeather', () => {
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

  it('#setWeather', () => {
    const field = new Field({gen} as unknown as Battle);

    field.setWeather('');
    expect(field.weather).toBeUndefined();

    field.setWeather('none' as ID);
    expect(field.weather).toBeUndefined();

    field.setWeather('sunnyday' as ID, {} as Pokemon);
    expect(field.weather).toBe('Sun');
    expect(field.weatherData).toEqual({id: 'sun', minDuration: 5, maxDuration: 8});

    field.setWeather('sunnyday' as ID, undefined, true);
    expect(field.weather).toBe('Sun');
    expect(field.weatherData).toEqual({id: 'sun', minDuration: 4, maxDuration: 7});

    field.setWeather('desolateland' as ID, {} as Pokemon);
    expect(field.weather).toBe('Harsh Sunshine');
    expect(field.weatherData).toEqual({id: 'harshsunshine', minDuration: 0, maxDuration: 0});

    field.setWeather('deltastream' as ID);
    expect(field.weather).toBe('Strong Winds');
    expect(field.weatherData).toEqual({id: 'strongwinds', minDuration: 0, maxDuration: 0});

    field.setWeather('raindance' as ID);
    expect(field.weather).toBe('Rain');
    expect(field.weatherData).toEqual({id: 'rain', minDuration: 5, maxDuration: 8});
  });

  it('#setTerrain', () => {
    const field = new Field({gen} as unknown as Battle);

    field.setTerrain('electricterrain' as ID);
    expect(field.terrain).toBe('Electric');
    expect(field.terrainData).toEqual({id: 'electric', minDuration: 5, maxDuration: 8});

    field.setTerrain('' as ID);
    expect(field.terrain).toBeUndefined();
    expect(field.terrainData).toEqual({id: '', minDuration: 0, maxDuration: 0});

    field.setTerrain('mistyterrain' as ID);
    expect(field.terrain).toBe('Misty');
    expect(field.terrainData).toEqual({id: 'misty', minDuration: 5, maxDuration: 8});
  });

  it('#reset', () => {
    const field = new Field({gen} as Battle);
    field.setWeather('raindance' as ID);
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
