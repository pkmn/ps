import {
  GenerationNum,
  HPTypeName,
  ID,
  PokemonSet,
  StatID,
  StatsTable,
} from '@pkmn/types';

export interface DataTable<T> {
  get(name: string): Readonly<T> | undefined;
}

interface Nature {
  name: string;
  plus?: Exclude<StatID, 'hp'>;
  minus?: Exclude<StatID, 'hp'>;
}

export interface Data {
  forGen?(gen: GenerationNum): Data;

  readonly gen: GenerationNum;

  readonly abilities: DataTable<{name: string}>;
  readonly items: DataTable<{name: string}>;
  readonly moves: DataTable<{name: string}>;
  readonly natures: DataTable<Nature>;
  readonly species: DataTable<{
    name: string;
    baseSpecies: string;
    baseStats: StatsTable;
    gender?: string;
    battleOnly?: string | string[];
    abilities?: {0: string; 1?: string; H?: string; S?: string};
    types?: string[];
    forceTeraType?: string;
  }>;
}

export function toID(s: any) {
  if (typeof s !== 'string' && typeof s !== 'number') return '';
  return ('' + s).toLowerCase().replace(/[^a-z0-9]+/g, '') as ID;
}

const STAT_NAMES: Readonly<StatsTable<string>> = {
  hp: 'HP',
  atk: 'Atk',
  def: 'Def',
  spa: 'SpA',
  spd: 'SpD',
  spe: 'Spe',
};

const STATS = Object.keys(STAT_NAMES) as readonly StatID[];

const DECODE_STAT: Readonly<{[name: string]: StatID}> = {
  HP: 'hp',
  hp: 'hp',
  Attack: 'atk',
  Atk: 'atk',
  atk: 'atk',
  Defense: 'def',
  Def: 'def',
  def: 'def',
  'Special Attack': 'spa',
  SpA: 'spa',
  SAtk: 'spa',
  SpAtk: 'spa',
  spa: 'spa',
  Special: 'spa',
  spc: 'spa',
  Spc: 'spa',
  'Special Defense': 'spd',
  SpD: 'spd',
  SDef: 'spd',
  SpDef: 'spd',
  spd: 'spd',
  Speed: 'spe',
  Spe: 'spe',
  Spd: 'spe',
  spe: 'spe',
};

export type {PokemonSet} from '@pkmn/types';

export const Sets = new class {
  pack(s: Partial<PokemonSet>) {
    return Sets.packSet(s);
  }

  packSet(s: Partial<PokemonSet>) {
    let buf = '';
    // name
    buf += s.name || s.species;

    // species
    const packed = packName(s.species);
    buf += '|' + (packName(s.name || s.species) === packed ? '' : packed);

    // item
    buf += '|' + packName(s.item);

    // ability
    buf += '|' + (packName(s.ability) || '-');

    // moves
    let hasHP = '';
    buf += '|';
    if (s.moves) {
      for (let j = 0; j < s.moves.length; j++) {
        const packedMove = packName(s.moves[j]);
        if (j && !packedMove) continue;
        buf += (j ? ',' : '') + packedMove;
        if (packedMove.substr(0, 11) === 'HiddenPower' && packedMove.length > 11) {
          hasHP = packedMove.slice(11);
        }
      }
    }

    // nature
    buf += '|' + (s.nature || '');

    // evs
    let evs = '|';
    if (s.evs) {
      evs = '|' +
        (s.evs['hp'] || '') + ',' +
        (s.evs['atk'] || '') + ',' +
        (s.evs['def'] || '') + ',' +
        (s.evs['spa'] || '') + ',' +
        (s.evs['spd'] || '') + ',' +
        (s.evs['spe'] || '');
    }
    if (evs === '|,,,,,') {
      buf += '|';
    } else {
      buf += evs;
    }

    // gender
    if (s.gender) {
      buf += '|' + s.gender;
    } else {
      buf += '|';
    }

    const getIV = (stat: StatID) =>
      !('ivs' in s) || s.ivs![stat] === 31 || s.ivs![stat] === undefined
        ? ''
        : s.ivs![stat].toString();

    // ivs
    let ivs = '|';
    if (s.ivs) {
      ivs = '|' +
        getIV('hp') + ',' +
        getIV('atk') + ',' +
        getIV('def') + ',' +
        getIV('spa') + ',' +
        getIV('spd') + ',' +
        getIV('spe');
    }
    if (ivs === '|,,,,,') {
      buf += '|';
    } else {
      buf += ivs;
    }

    // shiny
    if (s.shiny) {
      buf += '|S';
    } else {
      buf += '|';
    }

    // level
    if (s.level && s.level !== 100) {
      buf += '|' + s.level;
    } else {
      buf += '|';
    }

    // happiness
    if (s.happiness !== undefined && s.happiness !== 255) {
      buf += '|' + s.happiness;
    } else {
      buf += '|';
    }

    const dynamax = s.dynamaxLevel !== undefined && s.dynamaxLevel !== 10;
    if (s.pokeball || (s.hpType && !hasHP) || s.gigantamax || dynamax || s.teraType) {
      buf += ',' + (s.hpType || '');
      buf += ',' + packName(s.pokeball || '');
      buf += ',' + (s.gigantamax ? 'G' : '');
      buf += ',' + (dynamax ? s.dynamaxLevel : '');
      buf += ',' + (s.teraType || '');
    }

    return buf;
  }

  exportSet(s: Partial<PokemonSet>, data?: Data) {
    let buf = '';
    let species = s.species || s.name || '';
    species = data?.species.get(species)?.name || species;
    if (s.name && s.name !== species) {
      buf += '' + s.name + ' (' + species + ')';
    } else {
      buf += '' + species;
    }
    if (!data || data.gen >= 2) {
      if (s.gender === 'M') buf += ' (M)';
      if (s.gender === 'F') buf += ' (F)';
    }
    if (s.item) {
      const item = data?.items.get(s.item)?.name ?? s.item;
      buf += ' @ ' + item;
    }
    buf += '  \n';
    if (s.ability && (!data || data?.gen >= 3)) {
      const ability = data?.abilities.get(s.ability)?.name ?? s.ability;
      buf += 'Ability: ' + ability + '  \n';
    }
    if (s.level && s.level !== 100) {
      buf += 'Level: ' + s.level + '  \n';
    }
    if (s.shiny && (!data || data.gen >= 2)) {
      buf += 'Shiny: Yes  \n';
    }
    if (typeof s.happiness === 'number' && s.happiness !== 255 &&
        !isNaN(s.happiness) && (!data || data.gen >= 2)) {
      buf += 'Happiness: ' + s.happiness + '  \n';
    }
    if (s.pokeball) {
      buf += 'Pokeball: ' + s.pokeball + '  \n';
    }
    if (s.hpType) {
      buf += 'Hidden Power: ' + s.hpType + '  \n';
    }
    if (typeof s.dynamaxLevel === 'number' && s.dynamaxLevel !== 10 && !isNaN(s.dynamaxLevel)) {
      buf += 'Dynamax Level: ' + s.dynamaxLevel + '  \n';
    }
    if (s.gigantamax) {
      buf += 'Gigantamax: Yes  \n';
    }
    if (s.teraType) {
      const d = data?.species.get(species);
      buf += 'Tera Type: ' + (d?.forceTeraType || s.teraType || d?.types?.[0]) + '  \n';
    }
    let first = true;
    if (s.evs && (!data || data.gen >= 3)) {
      for (const stat of STATS) {
        if (!s.evs[stat]) continue;
        if (first) {
          buf += 'EVs: ';
          first = false;
        } else {
          buf += ' / ';
        }
        buf += '' + s.evs[stat] + ' ' + STAT_NAMES[stat];
      }
    }
    if (!first) {
      buf += '  \n';
    }
    if (s.nature && (!data || data.gen >= 3)) {
      buf += '' + s.nature + ' Nature' + '  \n';
    }
    first = true;
    if (s.ivs) {
      let defaultIVs = true;
      let hpType: HPTypeName|undefined = undefined;
      if (s.moves) {
        for (const move of s.moves) {
          hpType = getHiddenPowerType(move);
          if (hpType) {
            const hpIVs = getHiddenPowerIVs(hpType, data);
            // not a valid Hidden Power type
            if (!hpIVs) continue;

            for (const stat of STATS) {
              if ((s.ivs[stat] === undefined ? 31 : s.ivs[stat]) !== (hpIVs[stat] || 31)) {
                defaultIVs = false;
                break;
              }
            }
          }
        }
      }
      if (defaultIVs && !hpType) {
        for (const stat of STATS) {
          if (s.ivs[stat] !== 31 && s.ivs[stat] !== undefined) {
            defaultIVs = false;
            break;
          }
        }
      }
      if (!defaultIVs) {
        for (const stat of STATS) {
          if (typeof s.ivs[stat] === 'undefined' || isNaN(s.ivs[stat]) || s.ivs[stat] === 31) {
            continue;
          }
          if (first) {
            buf += 'IVs: ';
            first = false;
          } else {
            buf += ' / ';
          }
          buf += '' + s.ivs[stat] + ' ' + STAT_NAMES[stat];
        }
      }
    }
    if (!first) {
      buf += '  \n';
    }
    if (s.moves) {
      for (let move of s.moves) {
        if (move) {
          move = data?.moves.get(move)?.name ?? move;
          buf += '- ' + exportMove(move) + '  \n';
        }
      }
    }
    buf += '\n';

    return buf;
  }

  unpack(buf: string, data?: Data) {
    return Sets.unpackSet(buf, data);
  }

  unpackSet(buf: string, data?: Data) {
    return _unpack(buf, 0, 0, data).set;
  }

  importSet(buf: string, data?: Data) {
    return _import(buf.split('\n'), 0, data).set;
  }

  toJSON(s: PokemonSet) {
    return JSON.stringify(s);
  }

  fromJSON(json: string) {
    if (!json.startsWith('{') || !json.endsWith('}')) return undefined;
    // BUG: this is completely unvalidated...
    return JSON.parse(json) as PokemonSet;
  }

  toString(s: Partial<PokemonSet>, data?: Data) {
    return Sets.exportSet(s, data);
  }

  fromString(str: string) {
    return Sets.importSet(str);
  }

  // NOTE: to properly dedupe you still must compare computed stats
  canonicalize(s: Partial<PokemonSet>, data: Data) {
    const species = data.species.get(s.species!)!;
    s.species = toID(species.battleOnly ? species.baseSpecies : species.name);
    s.name = s.species;

    s.item = data.gen >= 2 && s.item ? toID(s.item) : undefined;
    s.ability =
      data.gen >= 3 ? toID(s.ability ? s.ability : species.abilities![0]) : undefined;
    s.gender = data.gen >= 2 && s.gender !== species.gender ? s.gender : undefined;
    s.level = s.level || 100;

    let maxed = true;
    if (!s.ivs) {
      s.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
    } else {
      for (const stat of STATS) {
        s.ivs[stat] = s.ivs[stat] ?? 31;
        if (data.gen < 3) s.ivs[stat] = toIV(toDV(s.ivs[stat]));
        if (s.ivs[stat] !== 31) maxed = false;
      }
    }

    const nature = data.gen < 3 ? data.natures.get(s.nature || 'serious') : undefined;
    s.nature = nature && toID(nature.name);

    let hpType = s.hpType as HPTypeName | undefined;
    let happiness = '';
    let swordsdance = false;
    const moves = [];
    for (const move of s.moves!) {
      let id = toID(move);
      if (id === 'return' || id === 'frustration') {
        happiness = id;
      } else if (id === 'swordsdance') {
        swordsdance = true;
      } else if (id.startsWith('hiddenpower')) {
        if (id === 'hiddenpower') {
          const type = s.hpType || getHiddenPower(data.gen, s.ivs).type;
          id = `${id}${type}` as ID;
        } else {
          hpType = (id.substr(11, 1).toUpperCase() + id.substr(12)) as HPTypeName;
        }
      }
      moves.push(id);
    }
    s.moves = moves.sort((a, b) => a.localeCompare(b));

    const base = data.species.get(s.species)!.baseStats;
    s.evs = s.evs || {} as any as StatsTable;
    for (const stat of STATS) {
      if (data.gen < 3) {
        s.evs[stat] = s.evs[stat] ?? 252;
      } else {
        if (!s.evs[stat]) {
          s.evs[stat] = 0;
        } else {
          const val = calc(data.gen, stat, base[stat], s.ivs[stat], s.evs[stat], s.level, nature);
          if (stat === 'hp') {
            s.evs[stat] = base[stat] === 1 ? 0
              : Math.max(0, (Math.ceil(((val - s.level - 10) * 100) / s.level) -
                2 * base[stat] - s.ivs[stat]) * 4);
          } else {
            const n = !nature ? 1 : nature.plus === stat ? 1.1 : nature.minus === stat ? 0.9 : 1;
            s.evs[stat] = Math.max(0, (Math.ceil(((Math.ceil(val / n) - 5) * 100) / s.level) -
              2 * base[stat] - s.ivs[stat]) * 4);
          }
        }
      }
    }

    if (data.gen === 2 && s.species === 'marowak' && s.item === 'thickclub' &&
      swordsdance && s.level === 100) {
      const iv = Math.floor(s.ivs.atk / 2) * 2;
      while (s.evs.atk > 0 && 2 * 80 + iv + Math.floor(s.evs.atk / 4) + 5 > 255) {
        s.evs.atk -= 4;
      }
    }

    const canBottle = data.gen >= 7 && s.level === 100;
    if (hpType && maxed) {
      const ivs = data.gen === 2 ? HP[hpType].dvs : HP[hpType].ivs;
      for (const stat of STATS) {
        if (data.gen === 2) {
          s.ivs[stat] = stat in ivs ? toIV(ivs[stat]!) : 31;
        } else if (!canBottle) {
          s.ivs[stat] = ivs[stat] ?? 31;
        }
      }
      if (data.gen === 2) s.ivs.hp = toIV(getHPDV(s.ivs));
    }

    s.hpType = hpType && canBottle ? hpType : undefined;

    if (happiness === 'return') {
      s.happiness = 255;
    } else if (happiness === 'frustration') {
      s.happiness = 0;
    } else {
      s.happiness = undefined;
    }

    s.shiny = data.gen >= 2 && s.shiny ? s.shiny : undefined;
    s.pokeball = undefined;
    s.dynamaxLevel = data.gen === 8 ? s.dynamaxLevel : undefined;
    s.gigantamax = data.gen === 8 && s.gigantamax ? s.gigantamax : undefined;
    s.teraType = data.gen === 9 ? s.teraType : undefined;

    return s;
  }
};

const ABILITY = ['', '0', '1', 'H', 'S'];

export function _unpack(buf: string, i = 0, j = 0, data?: Data) {
  const s: Partial<PokemonSet> = {};
  // name
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  s.name = buf.substring(i, j);
  i = j + 1;

  // species
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  s.species = unpackName(buf.substring(i, j), data?.species) || s.name;
  i = j + 1;

  // item
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  s.item = unpackName(buf.substring(i, j), data?.items);
  i = j + 1;

  // ability
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  let ability = unpackName(buf.substring(i, j), data?.abilities);
  if (ability === '-') {
    ability = '';
  } else if (ABILITY.includes(ability)) {
    if (data) {
      const species = data.species.get(s.species);
      // Workaround for bug introduced by smogon/pokemon-showdown/817236b0
      if (species?.baseSpecies === 'Zygarde' && ability === 'H') {
        ability = 'Power Construct';
      } else if (species?.abilities) {
        ability = species.abilities[ability as '0' || '0'];
      }
    }
    if (ability !== '' && !ability) return {i, j};
  }
  s.ability = ability;
  i = j + 1;

  // moves
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  s.moves = buf.substring(i, j).split(',', 24).filter(x => x).map(m => unpackName(m, data?.moves));
  i = j + 1;

  // nature
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  s.nature = unpackName(buf.substring(i, j), data?.natures);
  i = j + 1;

  // evs
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  s.evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
  if (j !== i) {
    const evstr = buf.substring(i, j);
    if (evstr.length > 5) {
      const st = evstr.split(',');
      s.evs.hp = Number(st[0]) || s.evs.hp;
      s.evs.atk = Number(st[1]) || s.evs.atk;
      s.evs.def = Number(st[2]) || s.evs.def;
      s.evs.spa = Number(st[3]) || s.evs.spa;
      s.evs.spd = Number(st[4]) || s.evs.spd;
      s.evs.spe = Number(st[5]) || s.evs.spe;
    }
  }
  i = j + 1;

  // gender
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  if (i !== j) s.gender = buf.substring(i, j);
  i = j + 1;

  // ivs
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  s.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
  if (j !== i) {
    const st = buf.substring(i, j).split(',', 6);
    s.ivs.hp = st[0] === '' ? 31 : Number(st[0]) || 0;
    s.ivs.atk = st[1] === '' ? 31 : Number(st[1]) || 0;
    s.ivs.def = st[2] === '' ? 31 : Number(st[2]) || 0;
    s.ivs.spa = st[3] === '' ? 31 : Number(st[3]) || 0;
    s.ivs.spd = st[4] === '' ? 31 : Number(st[4]) || 0;
    s.ivs.spe = st[5] === '' ? 31 : Number(st[5]) || 0;
  }
  i = j + 1;

  // shiny
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  if (i !== j) s.shiny = true;
  i = j + 1;

  // level
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  if (i !== j) s.level = parseInt(buf.substring(i, j));
  i = j + 1;

  // happiness
  j = buf.indexOf(']', i);
  let misc;
  if (j < 0) {
    if (i < buf.length) misc = buf.substring(i).split(',', 6);
  } else {
    if (i !== j) misc = buf.substring(i, j).split(',', 6);
  }

  if (misc) {
    s.happiness = (misc[0] ? Number(misc[0]) : 255);
    s.hpType = misc[1] || '';
    s.pokeball = unpackName(misc[2] || '', data?.items);
    s.gigantamax = !!misc[3];
    s.dynamaxLevel = (misc[4] ? Number(misc[4]) : 10);
    s.teraType = misc[5] || '';
  }

  return {set: s as PokemonSet, i, j};
}

const NATURE_REGEX = /^[A-Za-z]+ (N|n)ature/;

export function _import(lines: string[], i = 0, data?: Data) {
  let s: Partial<PokemonSet> | undefined = undefined;
  for (; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line === '' || line === '---' || line.substr(0, 3) === '===' ||
        line.includes('|')) {
      return {set: s as PokemonSet, line: i};
    } else if (!s) {
      s = {name: '', species: '', gender: ''};
      const atIndex = line.lastIndexOf(' @ ');
      if (atIndex !== -1) {
        s.item = line.substr(atIndex + 3);
        if (toID(s.item) === 'noitem') s.item = '';
        line = line.substr(0, atIndex);
      }
      if (line.substr(line.length - 4) === ' (M)') {
        s.gender = 'M';
        line = line.substr(0, line.length - 4);
      }
      if (line.substr(line.length - 4) === ' (F)') {
        s.gender = 'F';
        line = line.substr(0, line.length - 4);
      }
      const parenIndex = line.lastIndexOf(' (');
      if (line.substr(line.length - 1) === ')' && parenIndex !== -1) {
        line = line.substr(0, line.length - 1);
        const sub = line.substr(parenIndex + 2);
        s.species = data?.species.get(sub)?.name ?? sub;
        line = line.substr(0, parenIndex);
        s.name = line;
      } else {
        s.species = data?.species.get(line)?.name ?? line;
        s.name = '';
      }
    } else if (line.substr(0, 7) === 'Trait: ') {
      line = line.substr(7);
      s.ability = line;
    } else if (line.substr(0, 9) === 'Ability: ') {
      line = line.substr(9);
      s.ability = line;
    } else if (line === 'Shiny: Yes') {
      s.shiny = true;
    } else if (line.substr(0, 7) === 'Level: ') {
      line = line.substr(7);
      s.level = +line;
    } else if (line.substr(0, 11) === 'Happiness: ') {
      line = line.substr(11);
      s.happiness = +line;
    } else if (line.substr(0, 10) === 'Pokeball: ') {
      line = line.substr(10);
      s.pokeball = line;
    } else if (line.substr(0, 14) === 'Hidden Power: ') {
      line = line.substr(14);
      s.hpType = line;
    } else if (line.substr(0, 11) === 'Tera Type: ') {
      line = line.substr(11);
      s.teraType = line;
    } else if (line.substr(0, 15) === 'Dynamax Level: ') {
      line = line.substr(15);
      s.dynamaxLevel = +line;
    } else if (line === 'Gigantamax: Yes') {
      s.gigantamax = true;
    } else if (line.substr(0, 5) === 'EVs: ') {
      line = line.substr(5);
      const evLines = line.split(' / ');
      s.evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
      for (const evLine of evLines) {
        const spaceIndex = evLine.indexOf(' ');
        if (spaceIndex === -1) continue;
        const stat = DECODE_STAT[evLine.substr(spaceIndex + 1)];
        const val = parseInt(evLine.substr(0, spaceIndex));
        if (!stat) continue;
        s.evs[stat] = val;
      }
    } else if (line.substr(0, 5) === 'IVs: ') {
      line = line.substr(5);
      const ivLines = line.split(' / ');
      s.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
      for (const ivLine of ivLines) {
        const spaceIndex = ivLine.indexOf(' ');
        if (spaceIndex === -1) continue;
        const stat = DECODE_STAT[ivLine.substr(spaceIndex + 1)];
        let val = parseInt(ivLine.substr(0, spaceIndex));
        if (!stat) continue;
        if (isNaN(val)) val = 31;
        s.ivs[stat] = val;
      }
    } else if (NATURE_REGEX.exec(line)) {
      let natureIndex = line.indexOf(' Nature');
      if (natureIndex === -1) natureIndex = line.indexOf(' nature');
      // if (natureIndex === -1) continue; // Can't happen or we wouldn't match
      line = line.substr(0, natureIndex);
      if (line !== 'undefined') s.nature = line;
    } else if (line.substr(0, 1) === '-' || line.substr(0, 1) === '~') {
      line = line.substr(1);
      if (line.substr(0, 1) === ' ') line = line.substr(1);
      if (!s.moves) s.moves = [];

      const hpType = getHiddenPowerType(line);
      if (hpType) {
        line = 'Hidden Power ' + hpType.toString();
        const hpIVs = getHiddenPowerIVs(hpType, data);
        if (!s.ivs && hpIVs) {
          s.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
          let stat: StatID;
          for (stat in hpIVs) {
            s.ivs[stat] = hpIVs[stat]!;
          }
        }
      }
      if (line === 'Frustration' && s.happiness === undefined) {
        s.happiness = 0;
      }
      s.moves.push(line);
    }
  }

  return {set: s!, line: i + 1};
}

function getHiddenPowerType(move: string) {
  if (move.substr(0, 14) === 'Hidden Power [') {
    return move.substr(14, move.length - 15) as HPTypeName;
  }
  if (move.substr(0, 13) === 'Hidden Power ') {
    return move.substr(13) as HPTypeName;
  }
  if (move.substr(0, 11) === 'hiddenpower') {
    return (move.substr(11, 1).toUpperCase() + move.substr(12)) as HPTypeName;
  }
  return undefined;
}

function exportMove(move: string) {
  if (move.substr(0, 14) === 'Hidden Power [') {
    return move;
  }
  if (move.substr(0, 13) === 'Hidden Power ') {
    return move.substr(0, 13) + '[' + move.substr(13) + ']';
  }
  if (move.substr(0, 11) === 'hiddenpower') {
    return 'Hidden Power ' +
        '[' + move.substr(11, 1).toUpperCase() + move.substr(12) + ']';
  }
  return move;
}

function packName(name: string | undefined | null) {
  if (!name) return '';
  return name.replace(/[^A-Za-z0-9]+/g, '');
}

function unpackName(
  name: string,
  data?: {get: (name: string) => {name: string; exists?: boolean} | undefined}
) {
  if (!name) return '';
  if (data) {
    const obj = data.get(name);
    if (obj?.exists) return obj.name;
  }
  return (name.replace(/([0-9]+)/g, ' $1 ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/[ ][ ]/g, ' ')
    .trim());
}

const HP: {[type in HPTypeName]: {ivs: Partial<StatsTable>; dvs: Partial<StatsTable>}} = {
  Bug: {ivs: {atk: 30, def: 30, spd: 30}, dvs: {atk: 13, def: 13}},
  Dark: {ivs: {}, dvs: {}},
  Dragon: {ivs: {atk: 30}, dvs: {def: 14}},
  Electric: {ivs: {spa: 30}, dvs: {atk: 14}},
  Fighting: {ivs: {def: 30, spa: 30, spd: 30, spe: 30}, dvs: {atk: 12, def: 12}},
  Fire: {ivs: {atk: 30, spa: 30, spe: 30}, dvs: {atk: 14, def: 12}},
  Flying: {ivs: {hp: 30, atk: 30, def: 30, spa: 30, spd: 30}, dvs: {atk: 12, def: 13}},
  Ghost: {ivs: {def: 30, spd: 30}, dvs: {atk: 13, def: 14}},
  Grass: {ivs: {atk: 30, spa: 30}, dvs: {atk: 14, def: 14}},
  Ground: {ivs: {spa: 30, spd: 30}, dvs: {atk: 12}},
  Ice: {ivs: {atk: 30, def: 30}, dvs: {def: 13}},
  Poison: {ivs: {def: 30, spa: 30, spd: 30}, dvs: {atk: 12, def: 14}},
  Psychic: {ivs: {atk: 30, spe: 30}, dvs: {def: 12}},
  Rock: {ivs: {def: 30, spd: 30, spe: 30}, dvs: {atk: 13, def: 12}},
  Steel: {ivs: {spd: 30}, dvs: {atk: 13}},
  Water: {ivs: {atk: 30, def: 30, spa: 30}, dvs: {atk: 14, def: 13}},
};

const HP_TYPES: HPTypeName[] = [
  'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
  'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark',
];

function getHiddenPower(gen: GenerationNum, ivs: StatsTable) {
  const tr = (num: number, bits = 0) => {
    if (bits) return (num >>> 0) % (2 ** bits);
    return num >>> 0;
  };
  const stats = {hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
  if (gen <= 2) {
    // Gen 2 specific Hidden Power check. IVs are still treated 0-31 so we get them 0-15
    const atkDV = tr(ivs.atk / 2);
    const defDV = tr(ivs.def / 2);
    const speDV = tr(ivs.spe / 2);
    const spcDV = tr(ivs.spa / 2);
    return {
      type: HP_TYPES[4 * (atkDV % 4) + (defDV % 4)],
      power: tr(
        (5 * ((spcDV >> 3) +
          (2 * (speDV >> 3)) +
          (4 * (defDV >> 3)) +
          (8 * (atkDV >> 3))) +
          (spcDV % 4)) / 2 + 31
      ),
    };
  } else {
    // Hidden Power check for Gen 3 onwards
    let hpTypeX = 0;
    let hpPowerX = 0;
    let i = 1;
    for (const s in stats) {
      hpTypeX += i * (ivs[s as StatID] % 2);
      hpPowerX += i * (tr(ivs[s as StatID] / 2) % 2);
      i *= 2;
    }
    return {
      type: HP_TYPES[tr(hpTypeX * 15 / 63)],
      // After Gen 6, Hidden Power is always 60 base power
      power: (gen < 6) ? tr(hpPowerX * 40 / 63) + 30 : 60,
    };
  }
}

function getHiddenPowerIVs(hpType: HPTypeName, data?: Data) {
  const hp = HP[hpType];
  if (!hp) return undefined;
  return data?.gen === 2 ? DVsToIVs(hp.dvs) : hp.ivs;
}

function DVsToIVs(dvs: Readonly<Partial<StatsTable>>) {
  const ivs: Partial<StatsTable> = {};
  let dv: StatID;
  for (dv in dvs) ivs[dv] = toIV(dvs[dv]!);
  return ivs;
}

function toDV(iv: number) {
  return Math.floor(iv / 2);
}

function toIV(dv: number) {
  return dv * 2 + 1;
}

function getHPDV(ivs: Partial<StatsTable>) {
  return (
    (toDV(ivs.atk === undefined ? 31 : ivs.atk) % 2) * 8 +
    (toDV(ivs.def === undefined ? 31 : ivs.def) % 2) * 4 +
    (toDV(ivs.spe === undefined ? 31 : ivs.spe) % 2) * 2 +
    (toDV(ivs.spa === undefined ? 31 : ivs.spa) % 2)
  );
}

const tr = (num: number, bits = 0) => bits ? (num >>> 0) % (2 ** bits) : num >>> 0;

function calc(
  gen: GenerationNum,
  stat: StatID,
  base: number,
  iv = 31,
  ev?: number,
  level = 100,
  nature?: Nature
) {
  if (ev === undefined) ev = gen < 3 ? 252 : 0;
  if (gen < 3) {
    iv = toDV(iv) * 2;
    nature = undefined;
  }
  if (stat === 'hp') {
    return base === 1 ? base : tr(tr(2 * base + iv + tr(ev / 4) + 100) * level / 100 + 10);
  } else {
    const val = tr(tr(2 * base + iv + tr(ev / 4)) * level / 100 + 5);
    if (nature !== undefined) {
      if (nature.plus === stat) return tr(tr(val * 110, 16) / 100);
      if (nature.minus === stat) return tr(tr(val * 90, 16) / 100);
    }
    return val;
  }
}
