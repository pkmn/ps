import * as fs from 'fs';

import {PokemonSet} from '@pkmn/types';

import {Team, Teams} from '../teams';
import {GEN} from './data';

const readTeam = (file: string) => fs.readFileSync(`${__dirname}/fixtures/${file}`, 'utf8');
const TEAM: string = readTeam('team');
const TEAMS: string = readTeam('teams');

describe('Team', () => {
  it('importTeam + exportTeam', () => {
    const t = Team.import(TEAM)!;
    expect(t.export()).toEqual(TEAM);
    expect(Teams.exportTeams([t]))
      .toEqual('=== Untitled 1 ===\n\n' + TEAM + '\n');
  });

  it('pack + unpack', () => {
    const u = Team.unpack((Team.import(TEAM)!.pack()))!;
    expect(u.export(GEN[7])).toEqual(TEAM);
  });

  it('bad format', () => {
    const t = new Team([], GEN[9], 'uu');
    expect(t.gen).toBe(6);
  });

  it('toJSON + fromJSON', () => {
    const fj = Team.unpack(Team.import(TEAM)!.toJSON())!;
    expect(fj.export()).toEqual(TEAM);

    expect(Team.fromJSON('{"foo": "bar"}')).toBeUndefined();
  });

  it('canonicalize', () => {
    const team = Team.import(TEAM)!.team as Partial<PokemonSet>[];

    const alakazam = team[0];
    const magnezone = team[0] = team[3];
    team[3] = alakazam;

    const canon = Team.canonicalize(team, GEN[9]);
    expect(canon.map(s => s.name)).toEqual([
      'magnezone', 'alakazam', 'gliscor', 'magearna', 'tangrowth', 'tornadustherian',
    ]);
    expect(alakazam.name).toBe('alakazam');
    expect(alakazam.level).toBe(100);
    expect(alakazam.ivs!.atk).toBe(0);
    expect(alakazam.moves).toEqual(['focusblast', 'psychic', 'recover', 'shadowball']);
    expect(magnezone.ivs).toEqual({hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 31});
    expect(magnezone.hpType).toBe('Fire');
  });

  it('fromString', () => {
    const s = 'gen9vgc2023series2]Team Name|Nickname|amoonguss||effectspore|||||||50|';
    const t = Team.fromString(s)!;
    expect(t.format).toBe('gen9vgc2023series2');
    expect(t.name).toBe('Team Name');
    const amoonguss = t.team[0];
    expect(amoonguss.name).toBe('Nickname');
    expect(amoonguss.species).toBe('amoonguss');
    expect(amoonguss.ability).toBe('effectspore');
    expect(amoonguss.level).toBe(50);
  });
});

describe('Teams', () => {
  it('importTeams + exportTeams', () => {
    let imported = Teams.importTeams(TEAMS.replace(/\[ou\]/, ''), GEN[9])!;
    expect(imported[0].gen).toBe(9);

    imported = Teams.importTeams(TEAMS, GEN[9])!;
    expect(imported).toHaveLength(2);

    expect(imported[0].gen).toBe(6);
    expect(imported[0].name).toBe('Bulky Offense');
    expect(imported[0].folder).toBe('');

    expect(imported[1].gen).toBe(1);
    expect(imported[1].name).toBe('Cloyster');
    expect(imported[1].folder).toBe('RBY');

    expect(Teams.toString(imported))
      .toEqual(TEAMS.replace(/\[ou\]/, '[gen6ou]'));
    expect(Teams.importTeam('')).toBeUndefined();

    expect(Teams.importTeam(TEAMS, GEN[9])).toEqual(imported[0]);
  });

  it('unpack', () => {
    expect(Teams.unpackTeam('')).toBeUndefined();
    expect(Teams.unpackTeam('foo')).toBeUndefined();
    expect(Teams.importTeams('|\n\n\n')).toEqual([]);
  });


  it('including packed', () => {
    const teams = Teams.importTeams(TEAMS);
    const team = Team.import(TEAM)!;
    let both = 'ou]RBY/Cloyster|' + (teams[1].pack()) + '\n' +
        Teams.exportTeams([teams[0]]) + '|' + team.pack();
    let imported = Teams.importTeams(both, GEN[9]);
    expect(imported[0].gen).toBe(6);

    both = 'gen1ou]RBY/Cloyster|' + (teams[1].pack()) + '\n' +
        Teams.exportTeams([teams[0]]) + '|' + team.pack();
    imported = Teams.importTeams(both, GEN[9]);
    expect(imported).toHaveLength(3);

    expect(imported[0].team).toHaveLength(6);
    expect(imported[1].team).toHaveLength(6);
    expect(imported[2].team).toHaveLength(6);

    expect(imported[0].gen).toBe(1);
    expect(imported[0].name).toBe('Cloyster');
    expect(imported[0].folder).toBe('RBY');

    expect(imported[2].export(GEN[9])).toBe(TEAM);

    const again = Teams.importTeams(team.pack());
    expect(again[0].export(GEN[9])).toBe(TEAM);
  });
});
