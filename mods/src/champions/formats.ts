/* eslint-disable */

export const Formats = [
  {
    name: '[Gen 9 Champions] Random Battle',
    desc: 'Randomized teams of Pok&eacute;mon with sets that are generated to be competitively viable.',
    mod: 'champions',
    team: 'random',
    bestOfDefault: true,
    ruleset: [
      'Obtainable',
      'Species Clause',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Illusion Level Mod',
      'Level Clause Mod'
    ]
  },
  {
    name: '[Gen 9 Champions] OU',
    mod: 'champions',
    ruleset: [ 'Standard' ],
    banlist: [ 'AG', 'Uber', 'Moody', 'Quick Claw', 'Baton Pass', 'Last Respects', 'Shed Tail' ]
  },
  {
    name: '[Gen 9 Champions] UU',
    mod: 'champions',
    searchShow: false,
    ruleset: [ '[Gen 9 Champions] OU' ],
    banlist: [ 'OU', 'UUBL' ]
  },
  {
    name: '[Gen 9 Champions] BSS Reg M-B',
    mod: 'champions',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', 'VGC Timer' ]
  },
  {
    name: '[Gen 9 Champions] VGC 2026 Reg M-B',
    mod: 'champions',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', 'VGC Timer', 'Open Team Sheets' ]
  },
  {
    name: '[Gen 9 Champions] VGC 2026 Reg M-B (Bo3)',
    mod: 'champions',
    gameType: 'doubles',
    ruleset: [ 'Flat Rules', 'VGC Timer', 'Force Open Team Sheets', 'Best of = 3' ]
  },
  {
    name: '[Gen 9 Champions] Custom Game',
    mod: 'champions',
    searchShow: false,
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 50'
    ]
  },
  {
    name: '[Gen 9 Champions] Doubles Custom Game',
    mod: 'champions',
    gameType: 'doubles',
    searchShow: false,
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 50'
    ]
  }
];
