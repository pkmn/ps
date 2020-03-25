import {Abilities} from './abilities';
import {Generation} from './gen';
import {toID} from './id';
import {Items} from './items';
import {Moves} from './moves';
import {Species} from './species';
import {Stat, STAT_NAMES, Stats, StatsTable} from './stats';
import {Type, Types} from './types';

// clang-format off
export type PokemonSet = {
  name?: string;
  species: string;
  item?: string;
  ability?: string;
  moves: string[];
  nature?: string;
  evs: StatsTable;
  ivs: StatsTable;
  gender?: string;
  level?: number;
  shiny?: boolean;
  happiness?: number;
  pokeball?: string;
  hpType?: string;
};
// clang-format on

export class Sets {
  // istanbul ignore next: constructor
  protected constructor() {}

  static pack(s: PokemonSet, gen?: Generation): string {
    return Sets.packSet(s, gen);
  }

  static packSet(s: PokemonSet, gen?: Generation): string {
    let buf = '';
    // name
    buf += (s.name || s.species);

    // species
    let id = toID(s.species || s.name);
    buf += '|' + (toID(s.name || s.species) === id ? '' : id);

    // item
    buf += '|' + toID(s.item);

    // ability
    const species = Species.get(s.species || s.name, gen);
    id = toID(s.ability);
    if (species && species.abilities) {
      const abilities = species.abilities;
      if (id === toID(abilities['0'])) {
        buf += '|';
      } else if (id === toID(abilities['1'])) {
        buf += '|1';
      } else if (id === toID(abilities['H'])) {
        buf += '|H';
      } else {
        buf += '|' + id;
      }
    } else {
      buf += '|' + id;
    }

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
      evs = '|' + (s.evs['hp'] || '') + ',' + (s.evs['atk'] || '') + ',' +
          (s.evs['def'] || '') + ',' + (s.evs['spa'] || '') + ',' +
          (s.evs['spd'] || '') + ',' + (s.evs['spe'] || '');
    }
    if (evs === '|,,,,,') {
      buf += '|';
      // if (s.evs['hp'] === 0) buf += 0; // BUG: ???
    } else {
      buf += evs;
    }

    // gender
    if (s.gender && (!species || s.gender !== species.gender)) {
      buf += '|' + s.gender;
    } else {
      buf += '|';
    }

    const getIV = (set: PokemonSet, s: Stat): string => {
      return set.ivs[s] === 31 || set.ivs[s] === undefined ?
          '' :
          set.ivs[s].toString();
    };

    // ivs
    let ivs = '|';
    if (s.ivs) {
      ivs = '|' + getIV(s, 'hp') + ',' + getIV(s, 'atk') + ',' +
          getIV(s, 'def') + ',' + getIV(s, 'spa') + ',' + getIV(s, 'spd') +
          ',' + getIV(s, 'spe');
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

  static exportSet(s: PokemonSet, fast?: boolean, gen?: Generation): string {
    let buf = '';
    let species = s.species || s.name;
    if (!fast) {
      const s = Species.get(species);
      species = (s && s.name) || species;
    }
    if (s.name && s.name !== species) {
      buf += '' + s.name + ' (' + species + ')';
    } else {
      buf += '' + species;
    }
    if (!gen || gen >= 2) {
      if (s.gender === 'M') buf += ' (M)';
      if (s.gender === 'F') buf += ' (F)';
    }
    if (s.item) {
      let item = s.item;
      if (!fast) {
        const i = Items.get(item);
        item = (i && i.name) || item;
      }
      buf += ' @ ' + item;
    }
    buf += '  \n';
    if (s.ability && (!gen || gen >= 3)) {
      let ability = s.ability;
      if (!fast) {
        const a = Abilities.get(ability);
        ability = (a && a.name) || ability;
      }
      buf += 'Ability: ' + ability + '  \n';
    }
    if (s.level && s.level !== 100) {
      buf += 'Level: ' + s.level + '  \n';
    }
    if (s.shiny && (!gen || gen >= 2)) {
      buf += 'Shiny: Yes  \n';
    }
    if (typeof s.happiness === 'number' && s.happiness !== 255 &&
        !isNaN(s.happiness) && (!gen || gen >= 2)) {
      buf += 'Happiness: ' + s.happiness + '  \n';
    }
    let first = true;
    if (s.evs && (!gen || gen >= 3)) {
      let stat: Stat;
      for (stat in STAT_NAMES) {
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
    if (s.nature && (!gen || gen >= 3)) {
      buf += '' + s.nature + ' Nature' +
          '  \n';
    }
    first = true;
    if (s.ivs) {
      let defaultIVs = true;
      let hpType: Type|undefined = undefined;
      for (const move of s.moves) {
        hpType = getHiddenPowerType(move);
        if (hpType) {
          const t = gen === 2 ? Types.hiddenPowerDVs(hpType) :
                                Types.hiddenPowerIVs(hpType);
          const hpIVs: Partial<StatsTable>|undefined =
              gen === 2 && t ? Stats.dstois(t) : t;

          if (!hpIVs) {
            // not a valid Hidden Power type
            continue;
          }

          let stat: Stat;
          for (stat in STAT_NAMES) {
            if ((s.ivs[stat] === undefined ? 31 : s.ivs[stat]) !==
                (hpIVs[stat] || 31)) {
              defaultIVs = false;
              break;
            }
          }
        }
      }
      if (defaultIVs && !hpType) {
        let stat: Stat;
        for (stat in STAT_NAMES) {
          if (s.ivs[stat] !== 31 && s.ivs[stat] !== undefined) {
            defaultIVs = false;
            break;
          }
        }
      }
      if (!defaultIVs) {
        let stat: Stat;
        for (stat in STAT_NAMES) {
          if (typeof s.ivs[stat] === 'undefined' || isNaN(s.ivs[stat]) ||
              s.ivs[stat] === 31) {
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
          if (!fast) {
            const m = Moves.get(move);
            move = (m && m.name) || move;
          }
          buf += '- ' + exportMove(move) + '  \n';
        }
      }
    }
    buf += '\n';

    return buf;
  }

  static unpack(buf: string, gen?: Generation): PokemonSet|undefined {
    return Sets.unpackSet(buf, gen);
  }

  static unpackSet(buf: string, gen?: Generation): PokemonSet|undefined {
    return _unpack(buf, 0, 0, gen).set;
  }

  static importSet(buf: string, gen?: Generation): PokemonSet|undefined {
    return _import(buf.split('\n'), 0, gen).set;
  }

  static toJSON(s: PokemonSet): string {
    return JSON.stringify(s);
  }

  static fromJSON(json: string): PokemonSet|undefined {
    if (json.charAt(0) !== '{' || json.charAt(json.length - 1) !== '}') {
      return undefined;
    }
    // BUG: this is completely unvalidated...
    return JSON.parse(json);
  }

  static toString(s: PokemonSet, fast?: boolean, gen?: Generation): string {
    return Sets.exportSet(s, fast, gen);
  }

  static fromString(str: string): PokemonSet|undefined {
    return Sets.importSet(str);
  }
}

export function _unpack(buf: string, i = 0, j = 0, gen?: Generation):
    {set?: PokemonSet, i: number, j: number} {
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
  const ability = buf.substring(i, j);
  const species = Species.get(s.species, gen);
  s.ability =
      (species && species.abilities && ability in {'': 1, 0: 1, 1: 1, H: 1} ?
           // @ts-ignore
           species.abilities[ability || '0'] :
           ability);
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
    s.ivs.hp = st[0] === '' ? 31 : Number(st[0]);
    s.ivs.atk = st[1] === '' ? 31 : Number(st[1]);
    s.ivs.def = st[2] === '' ? 31 : Number(st[2]);
    s.ivs.spa = st[3] === '' ? 31 : Number(st[3]);
    s.ivs.spd = st[4] === '' ? 31 : Number(st[4]);
    s.ivs.spe = st[5] === '' ? 31 : Number(st[5]);
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
  // tslint:disable-next-line:ban
  if (i !== j) s.level = parseInt(buf.substring(i, j), 10);
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

  return {set: fromPartial(s, gen), i, j};
}

export function _import(lines: string[], i = 0, gen?: Generation):
    {set?: PokemonSet, line: number} {
  let s: Partial<PokemonSet>|undefined = undefined;
  for (; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line === '' || line === '---' || line.substr(0, 3) === '===' ||
        line.includes('|')) {
      return {set: fromPartial(s, gen), line: i};
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
        const species = Species.get(sub);
        s.species = (species && species.name) || sub;
        line = line.substr(0, parenIndex);
        s.name = line;
      } else {
        const species = Species.get(line);
        s.species = (species && species.name) || line;
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
        const stat = Stats.get(evLine.substr(spaceIndex + 1));
        // tslint:disable-next-line:ban
        const val = parseInt(evLine.substr(0, spaceIndex), 10);
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
        const stat = Stats.get(ivLine.substr(spaceIndex + 1));
        // tslint:disable-next-line:ban
        let val = parseInt(ivLine.substr(0, spaceIndex), 10);
        if (!stat) continue;
        if (isNaN(val)) val = 31;
        s.ivs[stat] = val;
      }
    } else if (line.match(/^[A-Za-z]+ (N|n)ature/)) {
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
        const t = gen === 2 ? Types.hiddenPowerDVs(hpType) :
                              Types.hiddenPowerIVs(hpType);
        const hpIVs: Partial<StatsTable>|undefined =
            gen === 2 && t ? Stats.dstois(t) : t;
        if (!s.ivs && hpIVs) {
          s.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
          let stat: Stat;
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

  return {set: fromPartial(s, gen), line: i + 1};
}

function fromPartial(s?: Partial<PokemonSet>, gen?: Generation): PokemonSet|
    undefined {
  if (!s) return undefined;

  return {
    name: s.name,
    species: s.species || /* istanbul ignore next: N/A */ (s.name || ''),
    item: s.item,
    ability: s.ability,
    moves: s.moves || /* istanbul ignore next: types */[],
    nature: s.nature,
    evs: Stats.fillEVs(s.evs || {}, gen),
    ivs: Stats.fillIVs(s.ivs || {}),
    gender: s.gender,
    level: s.level,
    shiny: s.shiny,
    happiness: s.happiness,
    pokeball: s.pokeball,
    hpType: s.hpType
  };
}

function getHiddenPowerType(move: string): Type|undefined {
  if (move.substr(0, 14) === 'Hidden Power [') {
    return move.substr(14, move.length - 15) as Type;
  }
  if (move.substr(0, 13) === 'Hidden Power ') {
    return move.substr(13) as Type;
  }
  if (move.substr(0, 11) === 'hiddenpower') {
    return (move.substr(11, 1).toUpperCase() + move.substr(12)) as Type;
  }
  return undefined;
}

function exportMove(move: string): string {
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