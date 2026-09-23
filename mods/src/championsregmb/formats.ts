/* eslint-disable */

export const Formats = [
  {
    name: '[Gen 9 Champions] BSS Reg M-B',
    mod: 'championsregmb',
    searchShow: false,
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', 'VGC Timer' ]
  },
  {
    name: '[Gen 9 Champions] VGC 2026 Reg M-B',
    mod: 'championsregmb',
    gameType: 'doubles',
    searchShow: false,
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', 'VGC Timer', 'Open Team Sheets' ]
  },
  {
    name: '[Gen 9 Champions] VGC 2026 Reg M-B (Bo3)',
    mod: 'championsregmb',
    gameType: 'doubles',
    searchShow: false,
    ruleset: [ 'Flat Rules', 'VGC Timer', 'Force Open Team Sheets', 'Best of = 3' ]
  },
  {
    name: '[Gen 9 Champions] 4v4 Doubles UU',
    desc: 'VGC rules, but only Pok&eacute;mon that get less than 4.52% usage on the [Gen 9 Champions] VGC 2026 Reg M-B ladder are legal, as well as a few other guidelines.',
    mod: 'championsregmb',
    gameType: 'doubles',
    searchShow: false,
    bestOfDefault: true,
    ruleset: [
      '[Gen 9 Champions] VGC 2026 Reg M-B',
      'Evasion Clause',
      'OHKO Clause',
      'Gravity Sleep Clause'
    ],
    banlist: [
      'Aegislash',        'Aerodactyl',
      'Archaludon',       'Basculegion-M',
      'Charizard-Mega-Y', 'Delphox-Mega',
      'Excadrill',        'Farigiraf',
      'Floette-Mega',     'Froslass-Mega',
      'Garchomp',         'Gardevoir-Mega',
      'Gengar-Mega',      'Incineroar',
      'Kingambit',        'Kommo-o',
      'Maushold',         'Meganium-Mega',
      'Milotic',          'Ninetales-Alola',
      'Pelipper',         'Rotom-Wash',
      'Scizor-Mega',      'Scovillain-Mega',
      'Sinistcha',        'Sneasler',
      'Talonflame',       'Tyranitar-Mega',
      'Venusaur',         'Whimsicott',
      'Focus Band',       "King's Rock",
      'Quick Claw'
    ]
  }
];
