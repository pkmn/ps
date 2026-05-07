/* eslint-disable */

export const Formats = [
  {
    name: '[Gen 1] Stadium OU',
    mod: 'gen1stadium',
    searchShow: false,
    ruleset: [ 'Standard', 'Team Preview' ],
    banlist: [
      'Uber',
      'Nidoking + Fury Attack + Thrash',
      'Exeggutor + Poison Powder + Stomp',
      'Exeggutor + Sleep Powder + Stomp',
      'Exeggutor + Stun Spore + Stomp',
      'Jolteon + Focus Energy + Thunder Shock',
      'Flareon + Focus Energy + Ember'
    ]
  },
  {
    name: '[Gen 1] Stadium Rentals',
    desc: 'Only Pok&eacute;mon sets that can be rented through the American Stadium Pok&eacute; Cup are legal.',
    mod: 'gen1stadium',
    searchShow: false,
    ruleset: [
      'Stadium Sleep Clause',
      'Freeze Clause Mod',
      'Species Clause',
      'Nickname Clause',
      'Team Preview',
      'Stadium Poke Cup Rentals'
    ],
    banlist: [ 'Uber' ]
  }
];
