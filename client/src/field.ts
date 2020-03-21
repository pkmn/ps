import {ID, toID} from '@pkmn/sim';
import {Protocol} from '@pkmn/protocol';
import {As, Weather} from '@pkmn/types';

import {Battle} from './battle';
import {Pokemon, Effect} from './pokemon';

export type WeatherState<T = Weather> = [T, number, number];
export type PseudoWeather = string & As<'PseudoWeather'>;

export class Field {
  //  weather: ID;
  //  weatherData: AnyObject;
  //  terrain: ID;
  //  terrainData: AnyObject;
  //  pseudoWeather: AnyObject;

  readonly battle: Battle;

  weather!: ID;
  pseudoWeather!: WeatherState<PseudoWeather>[];
  weatherTimeLeft!: number;
  weatherMinTimeLeft!: number;

  constructor(battle: Battle) {
    this.battle = battle;
  }

  reset() {
    this.weather = '' as ID;
    this.weatherTimeLeft = 0;
    this.weatherMinTimeLeft = 0;
    this.pseudoWeather = [];
  }

  removePseudoWeather(weather: string) {
    for (let i = 0; i < this.pseudoWeather.length; i++) {
      if (this.pseudoWeather[i][0] === weather) {
        this.pseudoWeather.splice(i, 1);
        return;
      }
    }
  }

  addPseudoWeather(weather: PseudoWeather, minTimeLeft: number, timeLeft: number) {
    this.pseudoWeather.push([weather, minTimeLeft, timeLeft]);
  }

  hasPseudoWeather(weather: string) {
    for (const [pseudoWeatherName] of this.pseudoWeather) {
      if (weather === pseudoWeatherName) {
        return true;
      }
    }
    return false;
  }

  changeWeather(weatherName: Weather, poke?: Pokemon, isUpkeep?: boolean, ability?: Effect) {
    let weather = toID(weatherName);
    if (!weather || weather === 'none') {
      weather = '' as ID;
    }
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

  destroy() {
    (this.battle) = null!;
  }
}
