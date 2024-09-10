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
    mod: 'gen7letsgo',
    searchShow: false,
    ruleset: [ 'Standard' ],
    banlist: [ 'Uber' ]
  },
  {
    name: "[Gen 7 Let's Go] Doubles OU",
    mod: 'gen7letsgo',
    gameType: 'doubles',
    searchShow: false,
    ruleset: [ 'Standard Doubles', 'Sleep Clause Mod' ],
    banlist: [ 'DUber' ]
  }
];
