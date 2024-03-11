/* eslint-disable */

export const Formats = [
  {
    name: '[Gen 9 DLC 1] OU',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3727806/">SV OU Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3712513/">SV OU Sample Teams</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3729909/">SV OU Viability Rankings</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [ 'Standard' ],
    banlist: [
      'Uber',          'AG',
      'Arena Trap',    'Moody',
      'Sand Veil',     'Shadow Tag',
      'Snow Cloak',    "King's Rock",
      'Razor Fang',    'Baton Pass',
      'Last Respects', 'Shed Tail'
    ]
  },
  {
    name: '[Gen 9 DLC 1] Ubers',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3727902/">Ubers Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3724082/">Ubers Viability Rankings</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [ 'Standard' ],
    banlist: [ 'AG', 'Moody', "King's Rock", 'Razor Fang', 'Baton Pass' ]
  },
  {
    name: '[Gen 9 DLC 1] UU',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3728797/">UU Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3729854/">UU Viability Rankings</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3720278/">UU Sample Teams</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [ '[Gen 9 DLC 1] OU' ],
    banlist: [ 'OU', 'UUBL' ]
  },
  {
    name: '[Gen 9 DLC 1] RU',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3725482/">RU Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3729823/">RU Viability Rankings</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3717072/">RU Sample Teams</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [ '[Gen 9 DLC 1] UU' ],
    banlist: [ 'UU', 'RUBL', 'Light Clay' ]
  },
  {
    name: '[Gen 9 DLC 1] NU',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3715408/">NU Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3729943/">NU Viability Rankings</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3730216/">NU Sample Teams</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [ '[Gen 9 DLC 1] RU' ],
    banlist: [ 'RU', 'NUBL' ]
  },
  {
    name: '[Gen 9 DLC 1] PU',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3729623/">PU Viability Rankings</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3719989/">PU Sample Teams</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [ '[Gen 9 DLC 1] NU' ],
    banlist: [ 'NU', 'PUBL', 'Damp Rock', 'Heat Rock' ]
  },
  {
    name: '[Gen 9 DLC 1] LC',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3710868/">Little Cup Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3712989/">Little Cup Sample Teams</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3712664/">Little Cup Viability Rankings</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [ 'Little Cup', 'Standard' ],
    banlist: [
      'Aipom',        'Basculin-White-Striped',
      'Cutiefly',     'Diglett-Base',
      'Dunsparce',    'Flittle',
      'Gastly',       'Girafarig',
      'Gligar',       'Growlithe-Hisui',
      'Meditite',     'Misdreavus',
      'Murkrow',      'Qwilfish-Hisui',
      'Rufflet',      'Scyther',
      'Sneasel',      'Sneasel-Hisui',
      'Stantler',     'Vulpix',
      'Vulpix-Alola', 'Yanma',
      'Moody',        'Baton Pass',
      'Sticky Web'
    ]
  },
  {
    name: '[Gen 9 DLC 1] Monotype',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3727849/">Monotype Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3727976/">Monotype Sample Teams</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3729937/">Monotype Viability Rankings</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [ 'Standard', 'Evasion Abilities Clause', 'Same Type Clause', 'Terastal Clause' ],
    banlist: [
      'Annihilape',     'Arceus',
      'Calyrex-Ice',    'Calyrex-Shadow',
      'Chi-Yu',         'Dialga',
      'Dialga-Origin',  'Eternatus',
      'Giratina',       'Giratina-Origin',
      'Groudon',        'Iron Bundle',
      'Koraidon',       'Kyogre',
      'Magearna',       'Mewtwo',
      'Miraidon',       'Palafin',
      'Palkia',         'Palkia-Origin',
      'Rayquaza',       'Shaymin-Sky',
      'Urshifu-Base',   'Zacian',
      'Zacian-Crowned', 'Zamazenta-Crowned',
      'Moody',          'Shadow Tag',
      'Booster Energy', 'Damp Rock',
      'Focus Band',     "King's Rock",
      'Razor Fang',     'Quick Claw',
      'Acupressure',    'Baton Pass',
      'Last Respects'
    ]
  },
  {
    name: '[Gen 9 DLC 1] Doubles OU',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3710876/">Doubles OU Sample Teams</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    gameType: 'doubles',
    ruleset: [ 'Standard Doubles' ],
    banlist: [ 'DUber', 'Shadow Tag' ]
  },
  {
    name: '[Gen 9 DLC 1] Doubles UU',
    threads: [ '&bullet; <a href="https://www.smogon.com/forums/threads/3712825/">Doubles UU</a>' ],
    mod: 'gen9dlc1',
    searchShow: false,
    gameType: 'doubles',
    ruleset: [ '[Gen 9 DLC 1] Doubles OU', 'Evasion Abilities Clause' ],
    banlist: [ 'DOU', 'DBL' ]
  },
  {
    name: '[Gen 9 DLC 1] Doubles LC',
    threads: [ '&bullet; <a href="https://www.smogon.com/forums/threads/3710957/">Doubles LC</a>' ],
    mod: 'gen9dlc1',
    gameType: 'doubles',
    searchShow: false,
    ruleset: [ 'Standard Doubles', 'Little Cup', 'Sleep Clause Mod' ],
    banlist: [
      'Basculin-White-Striped',
      'Dunsparce',
      'Gligar',
      'Murkrow',
      'Qwilfish-Hisui',
      'Scyther',
      'Sneasel',
      'Sneasel-Hisui',
      'Vulpix',
      'Vulpix-Alola',
      'Yanma'
    ]
  },
  {
    name: '[Gen 9 DLC 1] 1v1',
    desc: 'Bring three Pok&eacute;mon to Team Preview and choose one to battle.',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3710864/">1v1 Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3712375/">1v1 Viability Rankings</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [
      'Picked Team Size = 1',
      'Max Team Size = 3',
      'Standard',
      'Terastal Clause',
      'Sleep Moves Clause',
      'Accuracy Moves Clause',
      '!Sleep Clause Mod'
    ],
    banlist: [
      'Arceus',              'Calyrex-Ice',       'Calyrex-Shadow',
      'Chi-Yu',              'Cinderace',         'Dialga',
      'Dialga-Origin',       'Dragonite',         'Eternatus',
      'Flutter Mane',        'Gholdengo',         'Giratina',
      'Giratina-Origin',     'Groudon',           'Hoopa-Unbound',
      'Jirachi',             'Koraidon',          'Kyogre',
      'Magearna',            'Meloetta',          'Mew',
      'Mewtwo',              'Mimikyu',           'Miraidon',
      'Ogerpon-Cornerstone', 'Palkia',            'Palkia-Origin',
      'Rayquaza',            'Scream Tail',       'Shaymin-Sky',
      'Snorlax',             'Zacian',            'Zacian-Crowned',
      'Zamazenta',           'Zamazenta-Crowned', 'Moody',
      'Focus Band',          'Focus Sash',        "King's Rock",
      'Razor Fang',          'Quick Claw',        'Acupressure',
      'Perish Song'
    ]
  },
  {
    name: '[Gen 9 DLC 1] Anything Goes',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3722196/">AG Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3724219/">AG Viability Rankings</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3727176/">AG Sample Teams</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [
      'Min Source Gen = 9',
      'Obtainable',
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Endless Battle Clause'
    ]
  },
  {
    name: '[Gen 9 DLC 1] ZU',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3719022/">ZU Metagame Discussion</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [ '[Gen 9 DLC 1] PU' ],
    banlist: [ 'PU', 'ZUBL' ]
  },
  {
    name: '[Gen 9 DLC 1] National Dex',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3710848/">National Dex Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3714511/">National Dex Viability Rankings</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3714863/">National Dex Sample Teams</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [
      'Standard NatDex',
      'OHKO Clause',
      'Evasion Clause',
      'Species Clause',
      'Sleep Clause Mod'
    ],
    banlist: [
      'ND Uber',         'ND AG',
      'Arena Trap',      'Moody',
      'Power Construct', 'Shadow Tag',
      "King's Rock",     'Quick Claw',
      'Razor Fang',      'Assist',
      'Baton Pass',      'Last Respects',
      'Shed Tail'
    ]
  },
  {
    name: '[Gen 9 DLC 1] National Dex Monotype',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3710738/">National Dex Monotype Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3716842/">National Dex Monotype Sample Teams</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3715785/">National Dex Monotype Viability Rankings</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    ruleset: [
      'Standard NatDex',
      'Same Type Clause',
      'Terastal Clause',
      'Species Clause',
      'OHKO Clause',
      'Evasion Clause',
      'Sleep Clause Mod'
    ],
    banlist: [
      'Annihilape',          'Arceus',             'Baxcalibur',
      'Blastoise-Mega',      'Blaziken',           'Blaziken-Mega',
      'Calyrex-Ice',         'Calyrex-Shadow',     'Chi-Yu',
      'Chien-Pao',           'Darkrai',            'Deoxys-Base',
      'Deoxys-Attack',       'Dialga',             'Dracovish',
      'Dragapult',           'Espathra',           'Eternatus',
      'Flutter Mane',        'Genesect',           'Gengar-Mega',
      'Giratina',            'Giratina-Origin',    'Groudon',
      'Ho-Oh',               'Hoopa-Unbound',      'Iron Bundle',
      'Kangaskhan-Mega',     'Kartana',            'Kingambit',
      'Koraidon',            'Kyogre',             'Kyurem-Black',
      'Kyurem-White',        'Lucario-Mega',       'Lugia',
      'Lunala',              'Magearna',           'Marshadow',
      'Mawile-Mega',         'Medicham-Mega',      'Metagross-Mega',
      'Mewtwo',              'Miraidon',           'Naganadel',
      'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Ogerpon-Hearthflame',
      'Palafin',             'Palkia',             'Pheromosa',
      'Rayquaza',            'Reshiram',           'Salamence-Mega',
      'Shaymin-Sky',         'Solgaleo',           'Spectrier',
      'Urshifu-Base',        'Xerneas',            'Yveltal',
      'Zacian',              'Zacian-Crowned',     'Zamazenta',
      'Zamazenta-Crowned',   'Zekrom',             'Zygarde-Base',
      'Zygarde-Complete',    'Moody',              'Shadow Tag',
      'Power Construct',     'Booster Energy',     'Damp Rock',
      'Focus Band',          'Icy Rock',           "King's Rock",
      'Leppa Berry',         'Quick Claw',         'Razor Fang',
      'Smooth Rock',         'Terrain Extender',   'Acupressure',
      'Baton Pass',          'Last Respects'
    ]
  },
  {
    name: '[Gen 9 DLC 1] National Dex Doubles',
    threads: [
      '&bullet; <a href="https://www.smogon.com/forums/threads/3720802/">National Dex Doubles Metagame Discussion</a>',
      '&bullet; <a href="https://www.smogon.com/forums/threads/3726341/">National Dex Doubles Resources</a>'
    ],
    mod: 'gen9dlc1',
    searchShow: false,
    gameType: 'doubles',
    ruleset: [
      'Standard NatDex',
      'OHKO Clause',
      'Evasion Moves Clause',
      'Evasion Abilities Clause',
      'Species Clause',
      'Gravity Sleep Clause'
    ],
    banlist: [
      'Annihilape',          'Arceus',
      'Calyrex-Ice',         'Calyrex-Shadow',
      'Dialga',              'Dialga-Origin',
      'Eternatus',           'Genesect',
      'Gengar-Mega',         'Giratina',
      'Giratina-Origin',     'Groudon',
      'Ho-Oh',               'Koraidon',
      'Kyogre',              'Kyurem-White',
      'Lugia',               'Lunala',
      'Magearna',            'Melmetal',
      'Mewtwo',              'Miraidon',
      'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
      'Palkia',              'Palkia-Origin',
      'Rayquaza',            'Reshiram',
      'Shedinja',            'Solgaleo',
      'Urshifu-Base',        'Xerneas',
      'Yveltal',             'Zacian',
      'Zacian-Crowned',      'Zamazenta-Crowned',
      'Zekrom',              'Commander',
      'Power Construct',     'Assist',
      'Dark Void',           'Swagger'
    ]
  }
];
