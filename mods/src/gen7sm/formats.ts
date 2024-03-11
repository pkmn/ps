/* eslint-disable */

export const Formats = [
  {
    name: '[Gen 7] VGC 2017',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3583926/">VGC 2017 Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3591794/">VGC 2017 Viability Rankings</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3590391/">VGC 2017 Sample Teams</a>'
    ],
    mod: 'gen7sm',
    gameType: 'doubles',
    searchShow: false,
    bestOfDefault: true,
    timer: {
      starting: 900,
      addPerTurn: 0,
      maxPerTurn: 55,
      maxFirstTurn: 90,
      grace: 90,
      timeoutAutoChoose: true,
      dcTimerBank: false
    },
    ruleset: [ 'Flat Rules', 'Old Alola Pokedex', '!! Adjust Level = 50', 'Min Source Gen = 7' ],
    banlist: [
      'Mega',
      'Custap Berry',
      'Enigma Berry',
      'Jaboca Berry',
      'Micle Berry',
      'Rowap Berry'
    ]
  }
];
