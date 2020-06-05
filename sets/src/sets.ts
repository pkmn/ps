import {
  GenerationNum,
  HPTypeName,
  ID,
  PokemonSet,
  StatName,
  StatsTable,
} from '@pkmn/types';

export interface Data {
  forGen?(gen: GenerationNum): Data;

  readonly gen: GenerationNum;
  getAbility(ability: string): Readonly<{name: string}> | undefined;
  getItem(item: string): Readonly<{name: string}> | undefined;
  getMove(move: string): Readonly<{name: string}> | undefined;
  getSpecies(species: string): Readonly<{
    name: string;
    baseSpecies?: string;
    abilities?: {0: string; 1?: string; H?: string; S?: string};
  }> | undefined;
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

const STATS = Object.keys(STAT_NAMES) as readonly StatName[];

const DECODE_STAT: Readonly<{[name: string]: StatName}> = {
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

export const Sets = new class {
  pack(s: PokemonSet) {
    return Sets.packSet(s);
  }

  packSet(s: PokemonSet) {
    let buf = '';
    // name
    buf += (s.name || s.species);

    // species
    const speciesName = s.species || s.name;
    const id = toID(speciesName);
    buf += '|' + (toID(s.name || s.species) === id ? '' : id);

    // item
    buf += '|' + toID(s.item);

    // ability
    buf += '|' + toID(s.ability);

    // moves
    let hasHP = false;
    buf += '|';
    if (s.moves) {
      for (let j = 0; j < s.moves.length; j++) {
        const moveid = toID(s.moves[j]);
        if (j && !moveid) continue;
        buf += (j ? ',' : '') + moveid;
        if (moveid.substr(0, 11) === 'hiddenpower' && moveid.length > 11) {
          hasHP = true;
        }
      }
    }

    // nature
    buf += '|' + (s.nature || '');

    // evs
    let evs = '|';
    if (s.evs) {
      evs = '|' + [
        (s.evs['hp'] || ''), (s.evs['atk'] || ''), (s.evs['def'] || ''),
        (s.evs['spa'] || ''), (s.evs['spd'] || ''), (s.evs['spe'] || ''),
      ].join();
    }
    if (evs === '|,,,,,') {
      buf += '|';
    } else {
      buf += evs;
    }

    // gender
    buf += '|';
    if (s.gender) buf += s.gender;

    const getIV = (stat: StatName) =>
      s.ivs[stat] === 31 || s.ivs[stat] === undefined ? '' : s.ivs[stat].toString();

    // ivs
    let ivs = '|';
    if (s.ivs) {
      ivs = '|' + [
        getIV('hp'), getIV('atk'), getIV('def'),
        getIV('spa'), getIV('spd'), getIV('spe'),
      ].join();
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

    if (s.pokeball || (s.hpType && !hasHP)) {
      buf += ',' + (s.hpType || '');
      buf += ',' + toID(s.pokeball);
    }

    return buf;
  }

  exportSet(s: PokemonSet, data?: Data) {
    let buf = '';
    let species = s.species || s.name;
    species = data?.getSpecies(species || name)?.name ?? species;
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
      const item = data?.getItem(s.item)?.name ?? s.item;
      buf += ' @ ' + item;
    }
    buf += '  \n';
    if (s.ability && (!data || data?.gen >= 3)) {
      const ability = data?.getAbility(s.ability)?.name ?? s.ability;
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
          move = data?.getMove(move)?.name ?? move;
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
    if (json.charAt(0) !== '{' || json.charAt(json.length - 1) !== '}') return undefined;
    // BUG: this is completely unvalidated...
    return JSON.parse(json) as PokemonSet;
  }

  toString(s: PokemonSet, data?: Data) {
    return Sets.exportSet(s, data);
  }

  fromString(str: string) {
    return Sets.importSet(str);
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
  s.species = buf.substring(i, j) || s.name;
  i = j + 1;

  // item
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  s.item = buf.substring(i, j);
  i = j + 1;

  // ability
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  let ability = buf.substring(i, j);
  if (ABILITY.includes(ability)) {
    if (data) {
      const species = data.getSpecies(s.species);
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
  s.moves = buf.substring(i, j).split(',', 24).filter(x => x);
  i = j + 1;

  // nature
  j = buf.indexOf('|', i);
  if (j < 0) return {i, j};
  s.nature = buf.substring(i, j);
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
    if (i < buf.length) misc = buf.substring(i).split(',', 3);
  } else {
    if (i !== j) misc = buf.substring(i, j).split(',', 3);
  }

  if (misc) {
    s.happiness = (misc[0] ? Number(misc[0]) : 255);
    s.hpType = misc[1];
    s.pokeball = misc[2] ? misc[2].trim() : misc[2];
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
        s.species = data?.getSpecies(sub)?.name ?? sub;
        line = line.substr(0, parenIndex);
        s.name = line;
      } else {
        s.species = data?.getSpecies(line)?.name ?? line;
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
          let stat: StatName;
          for (stat in hpIVs) {
            s.ivs[stat] = hpIVs[stat]!;
          }
        }
      }
      if (line === 'Frustration') {
        s.happiness = 0;
      }
      s.moves.push(line);
    }
  }

  return {set: s as PokemonSet, line: i + 1};
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

function getHiddenPowerIVs(hpType: HPTypeName, data?: Data) {
  const hp = HP[hpType];
  if (!hp) return undefined;
  return data?.gen === 2 ? DVsToIVs(hp.dvs) : hp.ivs;
}

function DVsToIVs(dvs: Readonly<Partial<StatsTable>>) {
  const ivs: Partial<StatsTable> = {};
  let dv: StatName;
  for (dv in dvs) {
    ivs[dv] = dvs[dv]! * 2;
  }
  return ivs;
}
