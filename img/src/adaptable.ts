import {Data, GenerationNum} from './data/interface';

type GenderName = 'M' | 'F' | 'N';
type SideID = 'p1' | 'p2';
type Protocol = 'https' | 'http';
type Facing = 'front' | 'frontf' | 'back' | 'backf';

const PROTOCOL = 'https';
const DOMAIN = 'play.pokemonshowdown.com';
const URL = (options?: {protocol?: Protocol; domain?: string}) => {
  const url = `${options?.protocol ?? PROTOCOL}://${options?.domain ?? DOMAIN}`;
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
  'gen3rs': 3,
  'gen3frlg': 3,
  'gen3': 3,
  'gen3-2': 3,
  'gen4dp': 4,
  'gen4dp-2': 4,
  'gen4': 4,
  // 'gen4-2': 4,
  // 'gen4hgss': 4,
  // 'gen4hgss-2': 4,
  'gen5': 5,
  'gen5ani': 5,
  // 'noani': 6,
  'ani': 6,
};

export type AnimatedGraphicsGen = keyof typeof ANIMATED;
// TODO: gen2ani? gen3ani? etc
const ANIMATED = {
  'gen5ani': 'gen5' as GraphicsGen,
  'ani': 'dex' as GraphicsGen,
};

export type SecondFrameGraphicsGen = keyof typeof FRAME2;
const FRAME2 = {
    // 'gen2ani': 2,
  'gen3-2': 'gen3' as GraphicsGen,
  'gen4dp-2': 'gen4dp' as GraphicsGen,
  // 'gen4-2': 'gen4' as GraphicsGen,
  // 'gen4hgss-2': 'gen4hgss' as GraphicsGen,
};

const SOURCES: {[name: string]: GraphicsGen} = {
  'Green': 'gen1rg',
  'Red/Blue': 'gen1rb',
  'Yellow': 'gen1',
  'Gold': 'gen2g',
  'Silver': 'gen2s',
  'Crystal': 'gen2',
  // 'Crystal (2)': 'gen2-2',
  'Ruby/Sapphire': 'gen3rs',
  'FireRed/LeafGreen': 'gen3frlg',
  'Emerald': 'gen3',
  'Emerald (2)': 'gen3-2',
  'Diamond/Pearl': 'gen4dp',
  'Diamond/Pearl (2)': 'gen4dp-2',
  'Platinum': 'gen4',
  // 'Platinum (2)': 'gen4-2':
  // 'HeartGold/SoulSilver': 'gen4hgss':
  // 'HeartGold/SoulSilver (2)': 'gen4hgss-2':
  'Black/White': 'gen5',
  'Black/White (Animated)': 'gen5ani',
  // 'Modern': 'noani',
  'Modern (Animated)': 'ani',
};

export interface PokemonSprite {
  gen: GenerationNum;
  w: number;
  h: number;
  url: string;
  pixelated?: boolean;
}

// Several Pokemon were added in the middle of Gen 4 and thus are not present in gen4dp{,-2}
const NONDP = new Set([
  'giratinaorigin', 'rotomfan', 'rotomfrost', 'rotomheat', 'rotommow', 'rotomwash', 'shayminsky',
]);

export class Sprites {
  static SOURCES = SOURCES;
  static GENS = GENS;
  static ANIMATED = ANIMATED;
  static FRAME2 = FRAME2;

  readonly data: Data;

  constructor(data: Data) {
    this.data = data;
  }

  getPokemon(
    name: string,
    options?: {
      gen?: GraphicsGen | GenerationNum;
      side?: SideID;
      gender?: GenderName;
      shiny?: boolean;
      protocol?: Protocol;
      domain?: string;
    }
  ) {
    const url = `${URL(options)}/sprites`;
    const data = this.data.getPokemon(name);
    if (!data) {
      // If we can't figure out the Pokemon in question we just return a question mark icon
      return {gen: 5, w: 96, h: 96, url: `${url}/gen5/0.png`, pixelated: true};
    }

    const max = typeof options?.gen === 'string'
      ? Sprites.GENS[options.gen] as GenerationNum
      : options?.gen || 8;
    // Regardless of the generation context, we can only go back to the first generation
    // the Pokemon existed in (or BW, because the Smogon Sprite Project guarantees BW sprites).
    const min = Math.min(data.gen, 5) as GenerationNum;
    let gen = Math.max(max, min) as GenerationNum;

    let graphics: GraphicsGen;
    if (!options?.gen ||
      typeof options.gen === 'number' ||
      gen !== Sprites.GENS[options.gen]) {
      graphics = (gen <= 5 ? `gen${gen}` : 'ani') as GraphicsGen;
    } else {
      graphics = options.gen;
    }

    let dir: string = graphics;
    let facing: Facing = 'front';
    if (options?.side === 'p1') {
      dir += '-back';
      facing = 'back';
    }
    if (options?.shiny && gen > 1 && !data.nonshiny) dir += '-shiny';

    // Directory rewrites due to missing sprites
    const rewrite = (d: string, a: GraphicsGen, b: GraphicsGen) =>
      [Sprites.GENS[b], b, `${b}${d.slice(a.length)}`] as [GenerationNum, GraphicsGen, string];

    if (data.spriteid === 'missingno' && gen > 1) {
      [gen, graphics, dir] = rewrite(dir, graphics, 'gen1');
    } else if (dir.startsWith('gen4dp') && NONDP.has(data.id)) {
      [gen, graphics, dir] = rewrite(dir, graphics, 'gen4');
    } else if (facing === 'back' && graphics in Sprites.FRAME2) {
      const frame1 = Sprites.FRAME2[graphics as SecondFrameGraphicsGen];
      [gen, graphics, dir] = rewrite(dir, graphics, frame1);
      dir = `${frame1}${dir.slice(graphics.length)}`;
    } else if (dir.startsWith('gen1rg-back') || dir.startsWith('gen1rb-back')) {
      [gen, graphics, dir] = rewrite(dir, graphics, 'gen1');
    } else if (dir.startsWith('gen2g-back') || dir.startsWith('gen2s-back')) {
      [gen, graphics, dir] = rewrite(dir, graphics, 'gen2');
    } else if (dir.startsWith('gen3rs-back') || dir.startsWith('gen3frlg-back')) {
      [gen, graphics, dir] = rewrite(dir, graphics, 'gen3');
    } else if (dir.startsWith('gen4dp-back')) {
      [gen, graphics, dir] = rewrite(dir, graphics, 'gen4');
    } else if (dir.startsWith('gen3frlg')) {
      // FRLG added new sprites only for Kanto Pokemon, Deoxys and Teddiursa(?!)
      if (!((data.gen === 1 && data.num <= 151) ||
             data.id === 'teddiursa' ||
             data.id.startsWith('deoxys'))) {
        [gen, graphics, dir] = rewrite(dir, graphics, 'gen3');
      }
    } else if (dir === 'ani-back-shiny') {
      // FIXME: temporary weird missing sprite special cases that are hard to elegantly handle
      if (['unown-f', 'unown-p'].includes(data.spriteid) ||
          (options?.gender === 'F' && ['snover', 'buizel'].includes(data.spriteid))) {
        [gen, graphics, dir] = rewrite(dir, graphics, 'gen5');
      }
    }

    const facingf = facing + 'f' as 'frontf' | 'backf';
    if (graphics in Sprites.ANIMATED) {
      const d = graphics === 'gen5ani' ? (data.bw ?? {}) : data;
      if (d[facingf] && options?.gender === 'F') facing = `${facing}f` as Facing;

      if (d[facing] && !data.missing?.includes(dir)) {
        const w = d[facing]!.w ?? 96;
        const h = d[facing]!.h ?? 96;
        const file = facing.endsWith('f') ? `${data.spriteid}-f` : data.spriteid;

        return {gen, w, h, url: `${url}/${dir}/${file}.gif`, pixelated: gen <= 5};
      }

      [gen, graphics, dir] = rewrite(dir, graphics, 'gen5');
    } else if ((data[facingf] && options?.gender === 'F')) {
      facing = `${facing}f` as Facing;
    }

    // Visual gender differences didn't exist for sprites until Gen 4
    const file = (data.gen >= 4 && data[facing] && facing.endsWith('f'))
      ? `${data.spriteid}-f`
      : data.spriteid;

    return {gen, w: 96, h: 96, url: `${url}/${dir}/${file}.png`, pixelated: true};
  }

  getDexPokemon(
    name: string,
    options?: {
      gen?: GraphicsGen | 'dex' | GenerationNum;
      shiny?: boolean;
      protocol?: Protocol;
      domain?: string;
    }
  ) {
    let graphics = options?.gen ?? 'dex';
    if (graphics in Sprites.ANIMATED) graphics = Sprites.ANIMATED[graphics as AnimatedGraphicsGen];
    const data = this.data.getPokemon(name);
    if (!data ||
      !data.dex ||
      (graphics !== 'dex' && !(typeof graphics === 'number' && graphics >= 6))) {
      options = {...options};
      if (!options.gen || options.gen === 'dex') options.gen = 'gen5';
      return this.getPokemon(name, options as any);
    }

    const gen = Math.max(data.gen, 6);
    const shiny = options?.shiny ? '-shiny' : '';
    const size = data.gen >= 7 ? 128 : 120;
    const url = `${URL(options)}/sprites/dex${shiny}/${data.spriteid}.png`;

    return {gen, w: size, h: size, url, pixelated: false};
  }

  getSubstitute(
    gen: GraphicsGen | GenerationNum = 8,
    options?: {side: SideID; protocol?: Protocol; domain?: string}
  ) {
    const url = `${URL(options)}/sprites/substitutes`;
    let dir: string;
    const iw = 0; // TODO innerWidth
    const ih = 0; // TODO innerHeight

    if (typeof gen === 'string') gen = GENS[gen] as GenerationNum;
    if (gen < 3) {
      dir = 'gen1';
    } else if (gen < 4) {
      dir = 'gen3';
    } else if (gen < 5) {
      dir = 'gen4';
    } else {
      gen = 5;
      dir = 'gen5';
    }
    if (options?.side === 'p1') dir += '-back';
    return {gen, w: 96, h: 96, iw, ih, url: `${url}/${dir}/substitute.png`, pixelated: true};
  }

  getAvatar(avatar: number | string, options?: {protocol?: Protocol; domain?: string}) {
    avatar = `${avatar}`;
    avatar = this.data.getAvatar(avatar) ?? avatar;
    const url = `${URL(options)}/sprites/trainers`;
    return (avatar.charAt(0) === '#'
      ? `${url}-custom/${avatar.substring(1)}.png`
      : `${url}/${sanitizeName(avatar || 'unknown')}.png`);
  }
}

export class Icons {
  readonly data: Data;

  constructor(data: Data) {
    this.data = data;
  }

  getPokemon(
    name: string,
    options?: {
      side?: SideID;
      gender?: GenderName;
      fainted?: boolean;
      protocol?: Protocol;
      domain?: string;
    }
  ) {
    const data = this.data.getPokemon(name);

    let num = data?.num ?? 0;
    if (num < 0 || num > 890) num = 0;
    if (data?.icon) num = data.icon;
    if (options?.gender === 'F') num = data?.iconf ?? num;
    if (options?.side !== 'p2') num = data?.iconl ?? num;

    const top = -Math.floor(num / 12) * 30;
    const left = -(num % 12) * 40;
    const extra = options?.fainted ? ';opacity:.3;filter:grayscale(100%) brightness(.5)' : '';

    const url = `${URL(options)}/sprites/pokemonicons-sheet.png`;
    const base = 'display:inline-block;width:40px;height:30px;image-rendering:pixelated';
    const style =
      `${base};background:transparent url(${url}) no-repeat scroll ${left}px ${top}px${extra}`;
    return {style, url, left, top, extra};
  }

  getPokeball(name: string, options?: {protocol?: Protocol; domain?: string}) {
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
      extra = ';opacity:.4;filter:contrast(0)';
    } else if (name === 'pokeball-none') {
      left = -80;
      top = 4;
    } else {
      return undefined;
    }
    const url = `${URL(options)}/sprites/pokemonicons-pokeball-sheet.png`;
    const base = 'display:inline-block;width:40px;height:30px;image-rendering:pixelated';
    const style =
      `${base};background:transparent url(${url}) no-repeat scroll ${left}px ${top}px${extra}`;
    return {style, url, left, top, extra};
  }

  getItem(name: string, options?: {protocol?: Protocol; domain?: string}) {
    const num = this.data.getItem(name)?.spritenum ?? 0;
    const top = -Math.floor(num / 16) * 24;
    const left = -(num % 16) * 24;
    const url = `${URL(options)}/sprites/itemicons-sheet.png`;
    const base = 'display:inline-block;width:24px;height:24x;image-rendering:pixelated';
    const style = `${base};background:transparent url(${url}) no-repeat scroll ${left}px ${top}px`;
    return {style, url, top, left};
  }

  getType(name: string, options?: {protocol?: Protocol; domain?: string}) {
    const type = name === '???'
      ? '%3f%3f%3f'
      : `${name.charAt(0).toUpperCase()}${(name).substr(1).toLowerCase()}`;
    const url = `${URL(options)}/sprites/types/${type}.png`;
    return {url, type, w: 32, h: 14};
  }
}

function sanitizeName(name: any) {
  if (!name) return '';
  return ('' + name)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .slice(0, 50);
}
