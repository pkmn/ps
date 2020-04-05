import * as DataJSON from './data.json';
import * as I from './interface';

// These cryptic field names cut down bandwidth size - see
// getPokemon below for what the obfuscated names represent
export interface PokemonData {
  g: I.GenerationNum;
  n: number;
  i?: number;
  s?: number;
  if?: number;
  il?: number;
  nd?: boolean;
  ns?: boolean;
  m?: string[];
  f?: I.Dimensions;
  ff?: I.Dimensions;
  b?: I.Dimensions;
  bf?: I.Dimensions;
  bw?: {
    f?: I.Dimensions;
    ff?: I.Dimensions;
    b?: I.Dimensions;
    bf?: I.Dimensions;
  };
}

const DATA = DataJSON as {
  pokemon: {[spriteid: string]: PokemonData};
  items: {[id: string]: number};
  avatars: {[key: string]: string};
};

function toID(s: string) {
  return ('' + s).toLowerCase().replace(/[^a-z0-9]+/g, '') as I.ID;
}

export const Data = new class implements I.Data {
  getPokemon(name: string) {
    let id = toID(name);
    if (id === 'toxtricitylowkeygmax') id = 'toxtricitygmax' as I.ID;
    const data = DATA.pokemon[id];
    if (!data) return undefined;
    return {
      id,
      spriteid: data.s ? `${id.slice(0, data.s)}-${id.slice(data.s)}` : id,
      gen: data.g,
      num: data.n,
      icon: data.i,
      iconf: data.if,
      iconl: data.il,
      dex: data.g < 8 && !data.nd,
      nonshiny: data.ns,
      missing: data.m,
      front: data.f,
      frontf: data.ff,
      back: data.b,
      backf: data.bf,
      bw: {
        front: data.bw?.f,
        frontf: data.bw?.ff,
        back: data.bw?.b,
        backf: data.bw?.bf,
      }
    };
  }

  getItem(name: string) {
    const spritenum = DATA.items[toID(name)];
    return spritenum ? {spritenum} : undefined;
  }

  getAvatar(key: string) {
    return DATA.avatars[key];
  }
}