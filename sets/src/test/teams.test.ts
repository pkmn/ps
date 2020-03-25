import {readFileSync} from 'fs';

import {Format} from '../format';
import {Team, Teams} from '../teams';

function readTeam(file: string) {
  return readFileSync(`${__dirname}/fixtures/${file}`).toString();
}

const TEAM: string = readTeam('team');
const TEAMS: string = readTeam('teams');

describe('Team', () => {
  test('importTeam + exportTeam', () => {
    const t = Team.fromString(TEAM)!;
    expect(t.tier).not.toBeDefined();
    expect(t.toString()).toEqual(TEAM);
    expect(Teams.exportTeams([t]))
        .toEqual('=== Untitled 1 ===\n\n' + TEAM + '\n');
  });

  test('pack + unpack', () => {
    const u = Team.import((Team.import(TEAM)!.pack()) + '\n')!;
    expect(u.export()).toEqual(TEAM);
  });

  test('bad format', () => {
    const t = new Team([], Format.fromString('uu'));
    expect(t.gen).toBe(6);
    expect(t.tier).toBe('UU');
  });

  test('toJSON + fromJSON', () => {
    const fj = Team.unpack(Team.import(TEAM)!.toJSON())!;
    expect(fj.export()).toEqual(TEAM);

    expect(Team.fromJSON('{"foo": "bar"}')).not.toBeDefined();
  });
});

describe('Teams', () => {
  test('importTeams + exportTeams', () => {
    let imported = Teams.fromString(TEAMS.replace(/\[ou\]/, ''))!;
    expect(imported[0].gen).toBe(7);

    imported = Teams.fromString(TEAMS)!;
    expect(imported.length).toBe(2);

    expect(imported[0].gen).toBe(6);
    expect(imported[0].tier).toBe('OU');
    expect(imported[0].name).toBe('Bulky Offense');
    expect(imported[0].folder).toBe('');

    expect(imported[1].gen).toBe(1);
    expect(imported[1].tier).toBe('OU');
    expect(imported[1].name).toBe('Cloyster');
    expect(imported[1].folder).toBe('RBY');

    expect(Teams.toString(imported))
        .toEqual(TEAMS.replace(/\[ou\]/, '[gen6ou]'));
    expect(Teams.importTeam('')).not.toBeDefined();

    expect(Teams.importTeam(TEAMS)).toEqual(imported[0]);
  });

  test('unpack', () => {
    expect(Teams.unpackTeam('')).not.toBeDefined();
    expect(Teams.unpackTeam('foo')).not.toBeDefined();
    expect(Teams.importTeams('|\n\n\n')).toEqual([]);
  });

  test('including packed', () => {
    const raw = readTeam('team');
    const teams = Teams.importTeams(readTeam('teams'));
    const team = Team.import(raw)!;
    let both = 'ou]RBY/Cloyster|' + (teams[1].pack()) + '\n' +
        Teams.exportTeams([teams[0]]) + '|' + team.pack();
    let imported = Teams.importTeams(both);
    expect(imported[0].gen).toBe(6);

    both = 'gen1ou]RBY/Cloyster|' + (teams[1].pack()) + '\n' +
        Teams.exportTeams([teams[0]]) + '|' + team.pack();
    imported = Teams.importTeams(both);
    expect(imported.length).toBe(3);

    expect(imported[0].team.length).toBe(6);
    expect(imported[1].team.length).toBe(6);
    expect(imported[2].team.length).toBe(6);

    expect(imported[0].gen).toBe(1);
    expect(imported[0].tier).toBe('OU');
    expect(imported[0].name).toBe('Cloyster');
    expect(imported[0].folder).toBe('RBY');

    expect(imported[2].export()).toBe(raw);

    const again = Teams.importTeams(team.pack());
    expect(again[0].export()).toBe(raw);
  });
});