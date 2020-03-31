import {Data, GenerationNum} from './data/interface';

type Gender = 'M' | 'F' | 'N';
type SideID = 'p1' | 'p2';
type Protocol = 'https' | 'http';

const PROTOCOL = 'https';
const DOMAIN = 'play.pokemonshowdown.com';
const URL = (options?: {protocol?: Protocol, domain?: string}) => {
  const url =  `${options?.protocol ?? PROTOCOL}://${options?.domain ?? DOMAIN}`;
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

export type GraphicsGen = keyof typeof GENS;

const GENS = {
  'gen1rg': 1,
  'gen1rb': 1,
  'gen1': 1,
  'gen2g': 2,
  'gen2s': 2,
  'gen2': 2,
  // 'gen2ani': 2,
  'gen3rs': 3,
  'gen3': 3,
  // 'gen3ani': 3,
  'gen3frlg': 3,
  'gen4dp': 4,
  'gen4': 4,
  // 'gen4ani': 4,
  // 'gen4hgss': 4,
  // 'gen4hgssani': 4,
  'gen5': 5,
  'gen5ani': 5,
  'dex': 6,
  'ani': 6,
};

const SOURCES: {[name: string]: GraphicsGen | ''} = {
  // 'Default': '',
  'Green': 'gen1rg',
  'Red/Blue': 'gen1rb',
  'Yellow': 'gen1',
  'Gold': 'gen2g',
  'Silver': 'gen2s',
  'Crystal': 'gen2',
  // 'Crystal (Animated)': 'gen2ani',
  'Ruby/Sapphire': 'gen3rs',
  'FireRed/LeafGreen': 'gen3frlg',
  'Emerald': 'gen3',
  // 'Emerald (Animated)': 'gen3ani',
  'Diamond/Pearl': 'gen4dp',
  // 'Diamond/Pearl (Animated)': 'gen4dpani',
  'Platinum': 'gen4',
  // 'Platinum (Animated)': 'gen4ani':
  // 'HeartGold/SoulSilver': 'gen4hgss':
  // 'HeartGold/SoulSilver (Animated)': 'gen4hgssani':
  'Black/White': 'gen5',
  'Black/White (Animated)': 'gen5ani',
  // FIXME need static back/front etc
  // 'Modern': 'dex',
  'Modern (Animated)': 'ani',
};

export interface PokemonSprite {
  gen: GenerationNum;
  x: number;
  y: number;
  w: number;
  h: number;
  url: string;
  pixelated?: boolean;
}

export class Sprites {
  static SOURCES = SOURCES;
  static GENS = GENS;

  readonly data: Data;

  constructor(data: Data) {
    this.data = data;
  }

  // # fill in missing backsprites
  // RewriteRule ^sprites\/gen1rg-back(.*)?$ sprites/gen1-back$1 [L,QSA]
  // RewriteRule ^sprites\/gen1rb-back(.*)?$ sprites/gen1-back$1 [L,QSA]
  // RewriteRule ^sprites\/gen2g-back(.*)?$ sprites/gen2-back$1 [L,QSA]
  // RewriteRule ^sprites\/gen2s-back(.*)?$ sprites/gen2-back$1 [L,QSA]
  // RewriteRule ^sprites\/gen3rs-back(.*)?$ sprites/gen3-back$1 [L,QSA]
  // RewriteRule ^sprites\/gen3frlg-back(.*)?$ sprites/gen3-back$1 [L,QSA]
  // RewriteRule ^sprites\/gen4dp-back(.*)?$ sprites/gen4-back$1 [L,QSA]
  // RewriteRule ^sprites\/gen4dp-2-back(.*)?$ sprites/gen4-back$1 [L,QSA]

  // # FRLG only added new sprites for Kanto Pokemon
  // RewriteCond %{REQUEST_FILENAME} !-f
  // RewriteRule ^sprites\/gen3frlg(.*)?$ sprites/gen3$1 [L,QSA]

  getPokemon(
    name: string,
    options?: {
      gen?: GenerationNum;
      graphics?: GraphicsGen;
      side?: SideID,
      gender?: Gender,
      shiny?: boolean,
      protocol?: Protocol,
      domain?: string,
    }
  ) {
    const url = `${URL(options)}/sprites`;
    const data = this.data.getPokemon(name);
    if (!data) {
      // If we can't figure out the Pokemon in question we just return a question mark icon
      return {gen: 5, x: 10, y: 5, w: 96, h: 96, url: `${url}/gen5/0.png`, pixelated: true};
    }

    // If graphics have been set, convert it into a generation and use it, otherwise, rely on the
    // context generation (or fallback to gen 6).
    // NOTE: We're deliberately not checking `options?.graphics === undefined` here because `''`
    // is used for the 'default' which is to just rely on the context generation.
    // TODO handle no xydex exists!
    const max = options?.graphics // FIXME  what about if fallback is also dex?
      ? (options?.graphics === 'dex' && !data.dex ? 5 : Sprites.GENS[options?.graphics]) as GenerationNum
      : options?.gen || 6;
    // Regardless of the generation context, we can only go back to the first generation
    // the Pokemon existed in (or BW, because the Smogon sprite project guarantees BW sprites)
    const min = Math.min(data.gen, 5) as GenerationNum;

    const gen = Math.max(max, min) as GenerationNum;
    if (gen !== Sprites.GENS[graphics]) {
      const g = dex ? 'dex' : 'ani';
      graphics = (['gen1', 'gen2', 'gen3', 'gen4', 'gen5', g, g, g] as GraphicsGen[])[min - 1];
    }

    const fallback = options?.side || options?.graphics?.endsWith('ani') ? 'ani' : 'dex';

    // The 'dex' directory is currently only possible for:
    //
    //   - data which is marked as having 'dex' sprites
    //   - if we're not requesting 'p1' sprites (back facing)
    //   - if the requests graphics are animated
    //
    // TODO: add static 'dex' backl sprites?
    const dex = !data.dex && options?.side !== 'p1' && options?.graphics?.endsWith('ani');

        // FIXME handle default!!!
    // let graphics = options?.graphics ?? dex ? 'dex' : 'ani';


    const sprite: PokemonSprite = {gen, x: 0, y: 0, w: 96, h: 96, url};
    if (graphics === 'dex')


    let dir: string = graphics;
    let facing = 'f';
    if (options?.side === 'p1') {
      dir += '-back';
      facing = 'b';
    }
    if (options?.shiny && gen > 1) dir += '-shiny';

    const ani = !!options?.graphics?.endsWith('ani');

    if (data[facing + 'f' as 'bf' | 'ff'] && options?.gender === 'F') facing += 'f';









  }

  getAvatar(avatar: string, options?: {protocol?: Protocol, domain?: string}) {
    avatar = this.data.getAvatar(avatar) ?? avatar;
    const url = `${URL(options)}/sprites/trainers`
    return (avatar.charAt(0) === '#'
      ? `${url}-custom/${avatar.substring(1)}.png`
      : `${url}/${sanitizeName(avatar || 'unknown')}.png`);
  }
}

function sanitizeName(name: any) {
  if (!name) return '';
  return ('' + name)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .slice(0, 50);
}

export class Icons {
  readonly data: Data;

  constructor(data: Data) {
    this.data = data;
  }

  getPokemon(
    name: string,
    options?: {
      side?: SideID,
      gender?: Gender,
      fainted?: boolean,
      protocol?: Protocol,
      domain?: string,
    }
  ) {
    const num = 0; // TODO name gender left

    const top = -Math.floor(num / 12) * 30;
    const left = -(num % 12) * 40;
    const extra = options?.fainted? ';opacity:.3;filter:grayscale(100%) brightness(.5)' : '';

    const url = `${URL(options)}/sprites/pokemonicons-sheet.png`;
    const style =
      `background:transparent url(${url}) no-repeat scroll ${left}px ${top}px${extra}`;
    return {style, url, left, top, extra};
  }

  getPokeball(name: string, options?: {protocol?: Protocol, domain?: string}) {
    let left = 0;
    let top = 0;
    let extra = '';
    if (name === 'pokeball') {
      left = 0;
      top = 4;
    } else if (name === 'pokeball-statused') {
      left = -40;
      top = 4;
    } else if (name === 'pokeball-fainted') {
      left = 80;
      top = 4;
      extra = ';opacity:.4;filter:contrast(0)'
    } else if (name === 'pokeball-none') {
      left = -80;
      top = 4;
    } else {
      return undefined;
    }
    const url = `${URL(options)}/sprites/pokemonicons-pokeball-sheet.png`;
    const style =
      `background:transparent url(${url}) no-repeat scroll ${left}px ${top}px${extra}`;
    return {style, url, left, top, extra};
  }

  getItem(name: string, options?: {protocol?: Protocol, domain?: string}) {
    const num = this.data.getItem(name)?.spritenum ?? 0;
    const top = -Math.floor(num / 16) * 24;
    const left = -(num % 16) * 24;
    const url = `${URL(options)}/sprites/itemicons-sheet.png`;
    const style = `background:transparent url(${url}) no-repeat scroll ${left}px ${top}px`;
    return {style, url, top, left};
  }

  getType(name: string, options?: {protocol?: Protocol, domain?: string}) {
    const type = name === '???'
      ? '%3f%3f%3f'
      : `${name.charAt(0).toUpperCase()}${(name).substr(1).toLowerCase()}`;
    const url = `${URL(options)}/sprites/types/${type}.png`;
    return {url, type, w: 32, h: 14};
  }
}
