/* eslint-disable */

export const Formats = [
  {
    name: "[Gen 7 Let's Go] Random Battle",
    mod: 'gen7letsgo',
    team: 'random',
    searchShow: false,
    ruleset: [ 'Obtainable', 'Allow AVs', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod' ]
  },
  {
    name: "[Gen 7 Let's Go] OU",
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3667865/">LGPE OU Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3656868/">LGPE OU Viability Rankings</a>'
    ],
    mod: 'gen7letsgo',
    searchShow: false,
    ruleset: [
      'Adjust Level = 50',
      'Obtainable',
      'Species Clause',
      'Nickname Clause',
      'OHKO Clause',
      'Evasion Moves Clause',
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod'
    ],
    banlist: [ 'Uber' ]
  },
  {
    name: "[Gen 7 Let's Go] Doubles OU",
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3671748/#post-8685222">LGPE Doubles OU</a>'
    ],
    mod: 'gen7letsgo',
    gameType: 'doubles',
    searchShow: false,
    ruleset: [ 'Standard Doubles', 'Sleep Clause Mod' ],
    banlist: [ 'Mewtwo' ]
  }
];
