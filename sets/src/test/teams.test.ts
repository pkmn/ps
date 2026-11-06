import * as fs from 'fs';

import {Team, Teams} from '../teams';

import {CHAMPIONS, GEN} from './data';

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
    const team = Team.import(TEAM)!.team;

    const alakazam = team[0];
    const magnezone = team[0] = team[3];
    team[3] = alakazam;

    const canon = Team.canonicalize(team, GEN[9]);
    expect(canon.map(s => s.species)).toEqual([
      'alakazam', 'gliscor', 'magearna', 'magnezone', 'tangrowth', 'tornadustherian',
    ]);
    expect(alakazam.name).toBeUndefined();
    expect(alakazam.level).toBe(100);
    expect(alakazam.ivs!.atk).toBe(0);
    expect(alakazam.moves).toEqual(['focusblast', 'psychic', 'recover', 'shadowball']);
    expect(magnezone.ivs).toEqual({hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 31});
    expect(magnezone.hpType).toBe('Fire');

    const gen4Canon = Team.canonicalize(team, GEN[4]);
    expect(gen4Canon.map(s => s.species)).toEqual([
      'magnezone', 'alakazam', 'gliscor', 'magearna', 'tangrowth', 'tornadustherian',
    ]);

    const gen3Magnezone = Team.canonicalize([
      {
        species: 'Magnezone',
        ability: 'Magnet Pull',
        ivs: {hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 31},
        moves: ['Hidden Power Fire', 'Thunderbolt'],
      },
    ], GEN[6])[0];
    expect(gen3Magnezone.ivs).toEqual({hp: 31, atk: 30, def: 31, spa: 30, spd: 31, spe: 30});

    const gen1Alakazam = Team.canonicalize([
      {
        species: 'Alakazam',
        ivs: {hp: 31, atk: 1, def: 31, spa: 31, spd: 31, spe: 31},
        moves: ['Psychic'],
      },
    ], GEN[1])[0];
    expect(gen1Alakazam.ivs).toEqual({hp: 15, atk: 1, def: 31, spa: 31, spd: 31, spe: 31});
  });

  it('canonicalize (champions)', () => {
    const team = [
      {
        species: 'Tangrowth',
        item: 'Assault Vest',
        ability: 'Regenerator',
        evs: {hp: 32, atk: 0, def: 9, spa: 0, spd: 25, spe: 1},
        ivs: {hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 0},
        nature: 'Sassy',
        teraType: 'Steel',
        moves: ['Giga Drain', 'Knock Off', 'Power Whip', 'Earthquake'],
      },
      {
        species: 'Alakazam-Mega',
        item: 'Alakazite',
        ability: 'Magic Guard',
        evs: {hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32},
        nature: 'Timid',
        moves: ['Psychic', 'Focus Blast', 'Shadow Ball', 'Recover'],
      },
    ];

    const canon = Team.canonicalize(team, CHAMPIONS);
    expect(canon.map(s => s.species)).toEqual(['alakazam', 'tangrowth']);
    expect(canon[0].evs).toEqual({hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32});
    expect(canon[1].level).toBe(50);
    expect(canon[1].ivs).toEqual({hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31});
    // 1 Spe Stat Point on Base 50 Sassy (70*0.9=63 vs 71*0.9=63) is wasted and canonicalizes to 0,
    // while 9 Def and 25 SpD Stat Points are preserved without rounding to multiples of 4.
    expect(canon[1].evs).toEqual({hp: 32, atk: 0, def: 9, spa: 0, spd: 25, spe: 0});
    expect(canon[1].teraType).toBeUndefined();
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

    const c = Team.fromString(
      'gen9championsou]Team Name|Nickname|tangrowth||regenerator|||||||50|,,,,,Steel',
      CHAMPIONS
    )!;
    expect(c.data?.modid).toBe('champions');
    expect(c.toString()).not.toContain('Tera Type:');
  });
});

describe('Teams', () => {
  it('importTeams + exportTeams', () => {
    let imported = Teams.importTeams(TEAMS.replace(/\[ou\]/, ''), GEN[9]);
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
