export type ID = '' | (string & { __isID: true });
export type GenerationNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export interface Dimensions {w: number; h: number}
export interface PokemonData {
  id: string;
  spriteid: string;
  gen: number;
  num: number;
  icon?: number;
  iconf?: number;
  iconl?: number;
  dex?: boolean;
  nonshiny?: boolean;
  missing?: string[];
  front?: Dimensions;
  frontf?: Dimensions;
  back?: Dimensions;
  backf?: Dimensions;
  bw?: {
    front?: Dimensions;
    frontf?: Dimensions;
    back?: Dimensions;
    backf?: Dimensions;
  };
}
export interface Data {
  getPokemon(name: string): PokemonData | undefined;
  getItem(name: string): {spritenum?: number} | undefined;
  getAvatar(name: string): string | undefined;
}
