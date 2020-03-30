import * as DataJSON from './index.json';
import * as I from './interface';

type Dimensions = {w: number, h: number};
const DATA = DataJSON as {
  pokemon: {
    [id: string]: {
      num?: number;
      f?: Dimensions;
      ff?: Dimensions;
      b?: Dimensions;
      bf?: Dimensions;
      bw?: {
        f?: Dimensions;
        ff?: Dimensions;
        b?: Dimensions;
        bf?: Dimensions;
      };
    }
  };
  items: {[id: string]: number};
  avatars: {[key: string]: string};
};

function toID(s: string) {
  return ('' + s).toLowerCase().replace(/[^a-z0-9]+/g, '');
}

export const Data = new class implements I.Data {
  getItem(name: string) {
    const spritenum = DATA.items[toID(name)];
    return spritenum ? {spritenum} : undefined;
  }
}