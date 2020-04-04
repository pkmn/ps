import * as A from './adaptable';
import {Data} from './data/interface';

const data = import('./data');
let DATA: Data | null;

export const Sprites = new class {
  sprites!: A.Sprites;

  async get() {
    if (this.sprites) return this.sprites;
    if (DATA) return (this.sprites = new A.Sprites(DATA));
    return (this.sprites = new A.Sprites(DATA = (await data).Data));
  }
};

export const Icons = new class {
  icons!: A.Icons;

  async get() {
    if (this.icons) return this.icons;
    if (DATA) return (this.icons = new A.Icons(DATA));
    return (this.icons = new A.Icons(DATA = (await data).Data));
  }
};
