/* eslint-disable */

export const Formats = [
  {
    name: '[Gen 7] VGC 2017',
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
