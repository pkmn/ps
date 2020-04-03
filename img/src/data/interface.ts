export type ID = '' | (string & { __isID: true });
export type GenerationNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Dimensions = {w: number, h: number};
export interface PokemonData {
  id: string;
  gen: number;
  num: number;
  dex?: boolean;
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