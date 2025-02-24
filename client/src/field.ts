import {ID, toID} from '@pkmn/data';

import {Battle} from './battle';
import {Pokemon} from './pokemon';

export type WeatherState<T = ID> = [T, number, number];

export type WeatherName =
  'Sand' | 'Sun' | 'Rain' | 'Hail' | 'Snow' |
  'Harsh Sunshine' | 'Heavy Rain' | 'Strong Winds';

const WEATHERS: {[id: string]: WeatherName} = {
  sandstorm: 'Sand',
  sunnyday: 'Sun',
  raindance: 'Rain',
  hail: 'Hail',
  snowscape: 'Snow',
  desolateland: 'Harsh Sunshine',
  primordialsea: 'Heavy Rain',
  deltastream: 'Strong Winds',
};

const EXTREME_WEATHER: WeatherName[] = ['Harsh Sunshine', 'Heavy Rain', 'Strong Winds'];

export type TerrainName =
  'Electric' | 'Grassy' | 'Psychic' | 'Misty';

const TERRAINS: {[id: string]: TerrainName} = {
  electricterrain: 'Electric',
  grassyterrain: 'Grassy',
  psychicterrain: 'Psychic',
  mistyterrain: 'Misty',
};

interface FieldConditionState {
  id: ID;
  minDuration: number;
  maxDuration: number;
  level?: number;
}

export class Field {
  readonly battle: Battle;

  weather?: WeatherName;
  weatherState!: FieldConditionState;
  terrain?: TerrainName;
  terrainState!: FieldConditionState;
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

  setTerrain(id?: ID, persist?: boolean) {
    if (id) {
      this.terrain = TERRAINS[id];
      this.terrainState = {
        id: toID(this.terrain),
        minDuration: 5 + (persist ? 2 : 0),
        maxDuration: this.battle.gen.num > 6 ? 8 : 0,
      };
    } else {
      this.terrain = undefined;
      this.terrainState = {id: '', minDuration: 0, maxDuration: 0};
    }
  }

  setWeather(id?: ID, poke?: Pokemon, isUpkeep?: boolean, ability?: {name: string}) {
    if (isUpkeep) {
      if (this.weather && this.weatherState.maxDuration) {
        this.weatherState.maxDuration--;
        if (this.weatherState.minDuration !== 0) this.weatherState.minDuration--;
      }
      return;
    }

    if (id) {
      this.weather = WEATHERS[id];
      this.weatherState.id = toID(this.weather);
      const isExtremeWeather = EXTREME_WEATHER.includes(this.weather);
      if (poke) {
        if (ability) poke.activateAbility(ability.name);
        this.weatherState.maxDuration = (this.battle.gen.num <= 5 || isExtremeWeather) ? 0 : 8;
        this.weatherState.minDuration = (this.battle.gen.num <= 5 || isExtremeWeather) ? 0 : 5;
      } else if (isExtremeWeather) {
        this.weatherState.maxDuration = 0;
        this.weatherState.minDuration = 0;
      } else {
        this.weatherState.maxDuration = this.battle.gen.num <= 3 ? 5 : 8;
        this.weatherState.minDuration = this.battle.gen.num <= 3 ? 0 : 5;
      }
    } else {
      this.weather = undefined;
      this.weatherState = {id: '', minDuration: 0, maxDuration: 0};
    }
  }

  reset() {
    this.weather = undefined;
    this.weatherState = {id: '', minDuration: 0, maxDuration: 0};
    this.terrain = undefined;
    this.terrainState = {id: '', minDuration: 0, maxDuration: 0};
    this.pseudoWeather = {};
  }

  destroy() {
    // @ts-ignore readonly
    this.battle = null!;
  }
}
