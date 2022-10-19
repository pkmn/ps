/* eslint-disable @typescript-eslint/no-parameter-properties */
import {PokemonSet, GenerationNum, ID} from '@pkmn/types';
import {_import, _unpack, Sets, Data} from './sets';

const CURRENT = 8;

export class Team<S extends Partial<PokemonSet> = PokemonSet | Partial<PokemonSet>> {
  constructor(
    readonly team: Readonly<S[]>,
    readonly data?: Data,
    readonly format?: string,
    readonly name?: string,
    readonly folder?: string
  ) {
    this.team = team;
    this.format = format;
    this.name = name;
    this.folder = folder;

    this.data = data;
    if (format && data && data.forGen) {
      if (format.slice(0, 3) === 'gen') {
        this.data = data.forGen(parseInt(format[3]) as GenerationNum);
      } else {
        this.format = `gen6${format}`;
        this.data = data.forGen(6);
      }
    }
  }

  get gen() {
    return this.data?.gen;
  }

  pack(): string {
    return Teams.packTeam(this);
  }

  static unpack(buf: string, data?: Data) {
    return Teams.unpackTeam(buf, data);
  }

  export(data?: Data): string {
    let buf = '';
    for (const s of this.team) {
      buf += Sets.exportSet(s, data || this.data);
    }
    return buf;
  }

  static import(buf: string, data?: Data) {
    return Teams.importTeam(buf, data);
  }

  toString(data?: Data) {
    return this.export(data);
  }

  static fromString(str: string, data?: Data) {
    return Teams.importTeam(str, data);
  }

  toJSON(): string {
    return JSON.stringify(this.team);
  }

  static fromJSON(json: string): Team<PokemonSet>|undefined {
    if (json.charAt(0) !== '[' || json.charAt(json.length - 1) !== ']') {
      return undefined;
    }
    // BUG: this is completely unvalidated...
    const team: PokemonSet[] = JSON.parse(json);
    return new Team<PokemonSet>(team);
  }

  static canonicalize(team: Partial<PokemonSet>[], data: Data) {
    let lead: Partial<PokemonSet> | undefined = undefined;
    const rest: Array<[ID, Partial<PokemonSet>]> = [];
    for (const s of team) {
      const set = Sets.canonicalize(s, data);
      if (lead) {
        rest.push([set.species as ID, set]);
      } else {
        lead = set;
      }
    }
    return [lead!, ...rest.sort((a, b) => a[0].localeCompare(b[0])).map(([, set]) => set)];
  }
}

export const Teams = new class {
  packTeam<S extends Partial<PokemonSet>>(team: Team<S>): string {
    let buf = '';
    for (const s of team.team) {
      if (buf) buf += ']';
      buf += Sets.packSet(s);
    }
    return buf;
  }

  unpackTeam(buf: string, data?: Data): Team<PokemonSet> | undefined {
    if (!buf) return undefined;
    if (buf.charAt(0) === '[' && buf.charAt(buf.length - 1) === ']') {
      return Team.fromJSON(buf);
    }

    const team: PokemonSet[] = [];
    let i = 0, j = 0;

    for (let k = 0; k < 24; k++) {
      const r = _unpack(buf, i, j, data);
      if (!r.set) return undefined;

      team.push(r.set);
      i = r.i;
      j = r.j;

      if (j < 0) break;
      i = j + 1;
    }

    return new Team<PokemonSet>(team, data);
  }

  importTeam(buf: string, data?: Data): Team|undefined {
    const teams = Teams.importTeams(buf, data, true);
    return teams.length ? teams[0] : undefined;
  }

  importTeams(buf: string, data?: Data, one?: boolean): Readonly<Team<Partial<PokemonSet>>[]> {
    const lines = buf.split('\n');
    if (lines.length === 1 || (lines.length === 2 && !lines[1])) {
      const team: Team<PokemonSet>|undefined = Teams.unpackTeam(lines[0], data);
      return team ? [team] : [];
    }

    const teams: Team<Partial<PokemonSet>>[] = [];

    let setLine = -1;
    let team: Partial<PokemonSet>[] = [];
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (line.substr(0, 3) === '===') {
        if (one && teams.length) return teams;
        team = [];
        line = line.substr(3, line.length - 6).trim();
        let format = `gen${data?.gen || CURRENT}`;
        const bracketIndex = line.indexOf(']');
        if (bracketIndex >= 0) {
          format = line.substr(1, bracketIndex - 1);
          line = line.substr(bracketIndex + 1).trim();
        }

        const slashIndex = line.lastIndexOf('/');
        let folder = '';
        if (slashIndex > 0) {
          folder = line.slice(0, slashIndex);
          line = line.slice(slashIndex + 1);
        }

        teams.push(new Team<Partial<PokemonSet>>(team, data, format, line, folder));
      } else if (line.includes('|')) {
        // packed format
        const t = unpackLine(line, data);
        if (t) teams.push(t);
      } else if (setLine !== i) {
        const r = _import(lines, i, data);
        if (r.set) team.push(r.set);
        if (r.line === i) {
          continue;
        }
        // Reread the line to find out if we can process what _import couldn't
        setLine = r.line;
        i = setLine - 1;
      }
    }

    // If we made it here we read in some sets but there was no '===' marker
    // in the file so we assume only one (unnamed) team.
    if (team.length && !teams.length) {
      teams.push(new Team<Partial<PokemonSet>>(team, data));
    }

    return teams;
  }

  exportTeams<S extends Partial<PokemonSet>>(teams: Readonly<Team<S>[]>, data?: Data): string {
    let buf = '';

    let i = 0;
    for (const team of teams) {
      buf += '=== ' + (team.format ? '[' + team.format.toString() + '] ' : '') +
          (team.folder ? '' + team.folder + '/' : '') +
          (team.name || 'Untitled ' + ++i) + ' ===\n\n';
      buf += team.export(data);
      buf += '\n';
    }
    return buf;
  }

  toString<S extends Partial<PokemonSet>>(teams: Readonly<Team<S>[]>, data?: Data): string {
    return Teams.exportTeams(teams, data);
  }

  fromString(str: string, data?: Data): Readonly<Team<Partial<PokemonSet>>[]> {
    return Teams.importTeams(str, data);
  }
};

function unpackLine(line: string, data?: Data): Team<PokemonSet> | undefined {
  const pipeIndex = line.indexOf('|');
  if (pipeIndex < 0) return undefined;

  let bracketIndex = line.indexOf(']');
  if (bracketIndex > pipeIndex) bracketIndex = -1;

  let slashIndex = line.lastIndexOf('/', pipeIndex);
  // line.slice(slashIndex + 1, pipeIndex) will be ''
  if (slashIndex < 0) slashIndex = bracketIndex;

  const format = bracketIndex > 0 ? line.slice(0, bracketIndex) : `gen${data?.gen || CURRENT}`;
  const team = Teams.unpackTeam(line.slice(pipeIndex + 1), data);
  return !team
    ? team
    : new Team<PokemonSet>(
      team.team,
      data,
      format,
      line.slice(slashIndex + 1, pipeIndex),
      line.slice(
        bracketIndex + 1, slashIndex > 0 ? slashIndex : bracketIndex + 1
      ),
    );
}
