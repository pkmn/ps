import {Data} from './data/interface';

type Gender = 'M' | 'F' | 'N';
type Protocol = 'https' | 'http';

const PROTOCOL = 'https';
const DOMAIN = 'play.pokemonshowdown.com';
const URL = (options?: {protocol?: Protocol, domain?: string}) => {
  const url =  `${options?.protocol ?? PROTOCOL}://${options?.domain ?? DOMAIN}`;
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

export class Sprites {
  readonly data: Data;

  constructor(data: Data) {
    this.data = data;
  }

}

export class Icons {
  readonly data: Data;

  constructor(data: Data) {
    this.data = data;
  }

  getPokemon(
    pokemon: string,
    options?: {
      protocol?: Protocol,
      domain?: string,
      fainted?: boolean,
      gender?: Gender;
      left?: boolean
    }
  ) {

  }

  getPokeball(pokeball: string, options?: {protocol?: Protocol, domain?: string}) {
    let left = 0;
    let right = 0;
    let extra = '';
    if (pokeball === 'pokeball') {
      left = 0;
      right = 4;
    } else if (pokeball === 'pokeball-statused') {
      left = -40;
      right = 4;
    } else if (pokeball === 'pokeball-fainted') {
      left = 80;
      right = 4;
      extra = ';opacity:.4; filter:contrast(0)'
    } else if (pokeball === 'pokeball-none') {
      left = -80;
      right = 4;
    } else {
      return undefined;
    }
    const url = `${URL(options)}/sprites/pokemonicons-pokeball-sheet.png`;
    const style =
      `background:transparent url(${url}) no-repeat scroll ${left}px ${right}px${extra}`;
    return {style, url, left, right, extra};
  }

  getItem(item: string, options?: {protocol?: Protocol, domain?: string}) {
    const num = this.data.getItem(item)?.spritenum ?? 0;
    const top = -Math.floor(num / 16) * 24;
    const left = -(num % 16) * 24;
    const url = `${URL(options)}/sprites/itemicons-sheet.png`;
    const style = `background:transparent url(${url}) no-repeat scroll ${left}px ${top}px`;
    return {style, url, top, left};
  }

  getType(type: string, options?: {protocol?: Protocol, domain?: string}) {
    type = type === '???' ? '%3f%3f%3f' : `${type.charAt(0).toUpperCase()}${(type).substr(1).toLowerCase()}`;
    const url = `${URL(options)}/sprites/types/${type}.png`;
    return {url, type, w: 32, h: 14};
  }
}
