/* eslint-disable */

export const Formats = [
  {
    name: '[Gen 8 BDSP] Random Battle',
    desc: 'Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable.',
    mod: 'gen8bdsp',
    team: 'random',
    searchShow: false,
    ruleset: [ '[Gen 8] Random Battle', '!PotD' ]
  },
  {
    name: '[Gen 8 BDSP] OU',
    mod: 'gen8bdsp',
    searchShow: false,
    ruleset: [ 'Standard', 'Evasion Abilities Clause' ],
    banlist: [
      'Uber',
      'Arena Trap',
      'Drizzle',
      'Moody',
      'Shadow Tag',
      "King's Rock",
      'Razor Fang',
      'Baton Pass'
    ]
  },
  {
    name: '[Gen 8 BDSP] Ubers',
    mod: 'gen8bdsp',
    searchShow: false,
    ruleset: [ 'Standard' ],
    banlist: [ 'AG', 'Baton Pass' ]
  },
  {
    name: '[Gen 8 BDSP] Doubles OU',
    mod: 'gen8bdsp',
    gameType: 'doubles',
    searchShow: false,
    ruleset: [ 'Standard Doubles' ],
    banlist: [ 'DUber', 'Dark Void' ]
  },
  {
    name: '[Gen 8 BDSP] Battle Festival Doubles',
    mod: 'gen8bdsp',
    gameType: 'doubles',
    searchShow: false,
    ruleset: [ 'Flat Rules', 'Min Source Gen = 8' ]
  }
];
