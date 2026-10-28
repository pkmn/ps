/* eslint-disable */

export const Formats = [
  {
    name: '[Gen 4] Platinum OU',
    desc: 'A time capsule metagame that reflects the state of [Gen 4] OU before the release of Pok&eacute;mon HeartGold and SoulSilver.',
    mod: 'gen4pt',
    searchShow: false,
    ruleset: [ 'Standard' ],
    banlist: [ 'AG', 'Uber', 'Soul Dew' ],
    unbanlist: [ 'Acupressure', "King's Rock", 'Razor Fang', 'Bright Powder', 'Lax Incense' ]
  },
  {
    name: '[Gen 4] VGC 2009',
    mod: 'gen4pt',
    gameType: 'doubles',
    bestOfDefault: true,
    searchShow: false,
    ruleset: [ 'Flat Rules', '! Adjust Level Down', 'Max Level = 50' ],
    banlist: [ 'Tyranitar', 'Rotom', 'Judgment', 'Soul Dew' ]
  }
];
