import * as A from './adaptable';
import {Data} from './data';

export const Sprites = new A.Sprites(Data);
export const Icons = new A.Icons(Data);

export {
  type GraphicsGen,
  type AnimatedGraphicsGen,
  type SecondFrameGraphicsGen,
  type PokemonSprite,
} from './adaptable';
