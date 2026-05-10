/* eslint-disable */

export const Formats = [
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
    name: '[Gen 9 Champions] BSS Reg M-A',
    mod: 'champions',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', 'VGC Timer' ]
  },
  {
    name: '[Gen 9 Champions] VGC 2026 Reg M-A',
    mod: 'champions',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', 'VGC Timer', 'Open Team Sheets' ]
  },
  {
    name: '[Gen 9 Champions] VGC 2026 Reg M-A (Bo3)',
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
  }
];
