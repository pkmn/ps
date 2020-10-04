import {ID, Effect} from '@pkmn/data';

import {Battle} from './battle';
import {Pokemon} from './pokemon';

export type WeatherState<T = ID> = [T, number, number];

export type WeatherName =
  'Sand' | 'Sun' | 'Rain' | 'Hail' |
  'Harsh Sunshine' | 'Heavy Rain' | 'Strong Winds';

const WEATHERS: {[id: string]: WeatherName} = {
  sandstorm: 'Sand',
  sunnyday: 'Sun',
  raindance: 'Rain',
  hail: 'Hail',
  desolateland: 'Harsh Sunshine',
  primordialsea: 'Heavy Rain',
  deltastream: 'Strong Winds',
};

export type TerrainName =
  'Electric' | 'Grassy' | 'Psychic' | 'Misty';

const TERRAINS: {[id: string]: TerrainName} = {
  electricterrain: 'Electric',
  grassyterrain: 'Grassy',
  psychicterrain: 'Psychic',
  mistyterrain: 'Misty',
};

// NOTE: id is not the ID of the WeatherName / TerrainName
interface FieldConditionState {
  id: ID;
  minDuration: number;
  maxDuration: number;
}

export class Field {
  readonly battle: Battle;

  weather?: WeatherName;
  weatherData!: FieldConditionState;
  terrain?: TerrainName;
  terrainData!: FieldConditionState;
  pseudoWeather!: {[id: string]: FieldConditionState};

  constructor(battle: Battle) {
    this.battle = battle;
    this.reset();
  }

  hasPseudoWeather(id: ID) {
    return !!this.pseudoWeather[id];
  }

  addPseudoWeather(id: ID, minDuration: number, maxDuration: number) {
    this.pseudoWeather[id] = {id, minDuration, maxDuration};
  }

  removePseudoWeather(id: ID) {
    delete this.pseudoWeather[id];
  }

  upkeep() {
    for (const id in this.pseudoWeather) {
      const pw = this.pseudoWeather[id];
      if (pw.minDuration) pw.minDuration--;
      if (pw.maxDuration) pw.maxDuration--;
    }

    if (this.terrain) {
      if (this.terrainData.minDuration) this.terrainData.minDuration--;
      if (this.terrainData.maxDuration) this.terrainData.maxDuration--;
    }

    for (const side of this.battle.sides) {
      for (const id in side.sideConditions) {
        const cond = side.sideConditions[id];
        if (cond.minDuration) cond.minDuration--;
        if (cond.maxDuration) cond.maxDuration--;
      }
    }
  }

  changeTerrain(id?: ID) {
    if (id) {
      this.terrain = TERRAINS[id];
      this.terrainData = {id, minDuration: 5, maxDuration: this.battle.gen.num > 6 ? 8 : 0};
    } else {
      this.terrain = undefined;
      this.terrainData = {id: '', minDuration: 0, maxDuration: 0};
    }
  }

  removeTerrain() {
    this.terrain = undefined;
    this.terrainData = {id: '', minDuration: 0, maxDuration: 0};
  }

  changeWeather(id: ID, poke?: Pokemon, isUpkeep?: boolean, ability?: Effect) {
    if (!id || id === 'none') id = '' as ID;
    if (isUpkeep) {
      if (this.weather && this.weatherData.maxDuration) {
        this.weatherData.maxDuration--;
        if (this.weatherData.minDuration !== 0) this.weatherData.minDuration--;
      }
      return;
    }
    if (id) {
      this.weatherData.id = id;
      const isExtremeWeather = ['deltastream', 'desolateland', 'primordialsea'].includes(id);
      if (poke) {
        if (ability) poke.activateAbility(ability.name);
        this.weatherData.maxDuration = (this.battle.gen.num <= 5 || isExtremeWeather) ? 0 : 8;
        this.weatherData.minDuration = (this.battle.gen.num <= 5 || isExtremeWeather) ? 0 : 5;
      } else if (isExtremeWeather) {
        this.weatherData.maxDuration = 0;
        this.weatherData.minDuration = 0;
      } else {
        this.weatherData.maxDuration = this.battle.gen.num <= 3 ? 5 : 8;
        this.weatherData.minDuration = this.battle.gen.num <= 3 ? 0 : 5;
      }
    }
    this.weather = WEATHERS[id];
  }

  reset() {
    this.weather = undefined;
    this.weatherData = {id: '', minDuration: 0, maxDuration: 0};
    this.terrain = undefined;
    this.terrainData = {id: '', minDuration: 0, maxDuration: 0};
    this.pseudoWeather = {};
  }

  destroy() {
    // @ts-ignore readonly
    this.battle = null!;
  }
}
