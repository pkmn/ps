/* eslint-disable */

export const Formats = [
  {
    name: '[Gen 8 BDSP] Random Battle',
    desc: 'Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable.',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3693955/">BDSP Random Battle Set Discussion</a>'
    ],
    mod: 'gen8bdsp',
    team: 'random',
    searchShow: false,
    ruleset: [ '[Gen 8] Random Battle', '!PotD' ]
  },
  {
    name: '[Gen 8 BDSP] OU',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3693629/">BDSP OU Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3693721/">BDSP OU Sample Teams</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3696088/">BDSP OU Viability Rankings</a>'
    ],
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
    threads: [ '&bullet; <a href="https://www.smogon.com/forums/threads/3694036/">BDSP Ubers</a>' ],
    mod: 'gen8bdsp',
    searchShow: false,
    ruleset: [ 'Standard' ],
    banlist: [ 'AG', 'Baton Pass' ]
  },
  {
    name: '[Gen 8 BDSP] Doubles OU',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3693891/">BDSP Doubles OU</a>'
    ],
    mod: 'gen8bdsp',
    gameType: 'doubles',
    searchShow: false,
    ruleset: [ 'Standard Doubles' ],
    banlist: [ 'DUber', 'Dark Void' ]
  },
  {
    name: '[Gen 8 BDSP] Battle Festival Doubles',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3694269/">Battle Festival Doubles</a>'
    ],
    mod: 'gen8bdsp',
    gameType: 'doubles',
    searchShow: false,
    ruleset: [ 'Flat Rules', 'Min Source Gen = 8' ]
  }
];
