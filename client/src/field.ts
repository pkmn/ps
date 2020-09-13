import {ID, Effect} from '@pkmn/dex-types';

import {Battle} from './battle';
import {Pokemon} from './pokemon';

export type WeatherState<T = ID> = [T, number, number];

export class Field {
  //  weather: ID;
  //  weatherData: AnyObject;
  //  terrain: ID;
  //  terrainData: AnyObject;
  //  pseudoWeather: AnyObject;

  readonly battle: Battle;

  weather!: ID;
  pseudoWeather!: WeatherState[];
  weatherTimeLeft!: number;
  weatherMinTimeLeft!: number;

  constructor(battle: Battle) {
    this.battle = battle;
    this.reset();
  }

  hasPseudoWeather(weather: ID) {
    for (const [pseudoWeatherName] of this.pseudoWeather) {
      if (weather === pseudoWeatherName) {
        return true;
      }
    }
    return false;
  }

  addPseudoWeather(weather: ID, minTimeLeft: number, timeLeft: number) {
    this.pseudoWeather.push([weather, minTimeLeft, timeLeft]);
  }

  removePseudoWeather(weather: ID) {
    for (let i = 0; i < this.pseudoWeather.length; i++) {
      if (this.pseudoWeather[i][0] === weather) {
        this.pseudoWeather.splice(i, 1);
        return;
      }
    }
  }

  updatePseudoWeatherLeft() {
    for (const pWeather of this.pseudoWeather) {
      if (pWeather[1]) pWeather[1]--;
      if (pWeather[2]) pWeather[2]--;
    }
    for (const side of this.battle.sides) {
      for (const id in side.sideConditions) {
        const cond = side.sideConditions[id];
        if (cond[2]) cond[2]--;
        if (cond[3]) cond[3]--;
      }
    }
  }

  changeWeather(weather: ID, poke?: Pokemon, isUpkeep?: boolean, ability?: Effect) {
    if (!weather || weather === 'none') weather = '' as ID;
    if (isUpkeep) {
      if (this.weather && this.weatherTimeLeft) {
        this.weatherTimeLeft--;
        if (this.weatherMinTimeLeft !== 0) this.weatherMinTimeLeft--;
      }
      return;
    }
    if (weather) {
      const isExtremeWeather = ['deltastream', 'desolateland', 'primordialsea'].includes(weather);
      if (poke) {
        if (ability) poke.activateAbility(ability.name);
        this.weatherTimeLeft = (this.battle.dex.gen <= 5 || isExtremeWeather) ? 0 : 8;
        this.weatherMinTimeLeft = (this.battle.dex.gen <= 5 || isExtremeWeather) ? 0 : 5;
      } else if (isExtremeWeather) {
        this.weatherTimeLeft = 0;
        this.weatherMinTimeLeft = 0;
      } else {
        this.weatherTimeLeft = (this.battle.dex.gen <= 3 ? 5 : 8);
        this.weatherMinTimeLeft = (this.battle.dex.gen <= 3 ? 0 : 5);
      }
    }
    this.weather = weather;
  }

  reset() {
    this.weather = '' as ID;
    this.weatherMinTimeLeft = 0;
    this.weatherTimeLeft = 0;
    this.pseudoWeather = [];
  }

  destroy() {
    // @ts-ignore readonly
    this.battle = null!;
  }
}
