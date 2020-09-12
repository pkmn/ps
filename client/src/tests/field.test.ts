import {Dex, ID} from '@pkmn/sim';

import {Field, Battle, Pokemon} from '../index';

// NOTE: tested exhaustively in integration/src/test/client.js
describe('Field', () => {
  it('#pseudoWeather', () => {
    const field = new Field({sides: []} as unknown as Battle);
    expect(field.hasPseudoWeather('trickroom' as ID)).toBe(false);
    field.addPseudoWeather('trickroom' as ID, 3, 5);
    expect(field.hasPseudoWeather('trickroom' as ID)).toBe(true);
    field.addPseudoWeather('gravity' as ID, 1, 3);
    field.updatePseudoWeatherLeft();
    expect(field.pseudoWeather).toEqual([['trickroom', 2, 4], ['gravity', 0, 2]]);
    field.removePseudoWeather('gravity' as ID);
    expect(field.hasPseudoWeather('gravity' as ID)).toBe(false);
    expect(field.hasPseudoWeather('trickroom' as ID)).toBe(true);
  });

  it('#changeWeather', () => {
    const field = new Field({dex: Dex} as Battle);

    field.changeWeather('');
    expect(field.weather).toBe('');

    field.changeWeather('none' as ID);
    expect(field.weather).toBe('');

    field.changeWeather('sunnyday' as ID, {} as Pokemon);
    expect(field.weather).toBe('sunnyday');
    expect(field.weatherMinTimeLeft).toBe(5);
    expect(field.weatherTimeLeft).toBe(8);

    field.changeWeather('sunnyday' as ID, undefined, true);
    expect(field.weatherMinTimeLeft).toBe(4);
    expect(field.weatherTimeLeft).toBe(7);

    field.changeWeather('desolateland' as ID, {} as Pokemon);
    expect(field.weather).toBe('desolateland');
    expect(field.weatherMinTimeLeft).toBe(0);
    expect(field.weatherTimeLeft).toBe(0);

    field.changeWeather('deltastream' as ID);
    expect(field.weather).toBe('deltastream');
    expect(field.weatherMinTimeLeft).toBe(0);
    expect(field.weatherTimeLeft).toBe(0);

    field.changeWeather('raindance' as ID);
    expect(field.weather).toBe('raindance');
    expect(field.weatherMinTimeLeft).toBe(5);
    expect(field.weatherTimeLeft).toBe(8);
  });

  it('#reset', () => {
    const field = new Field({} as Battle);
    field.weather = 'raindance' as ID;
    field.weatherMinTimeLeft = 3;
    field.weatherTimeLeft = 5;
    field.addPseudoWeather('trickroom' as ID, 3, 5);

    field.reset();

    expect(field.weather).toBe('');
    expect(field.weatherMinTimeLeft).toBe(0);
    expect(field.weatherTimeLeft).toBe(0);
    expect(field.hasPseudoWeather('trickroom' as ID)).toBe(false);
  });

  it('#destroy', () => {
    const field = new Field({} as Battle);
    expect(field.battle).not.toBeNull();
    field.destroy();
    expect(field.battle).toBeNull();
  });
});
