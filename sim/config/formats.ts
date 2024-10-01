export const Formats: import('../sim/dex-formats').FormatList = [
  {
    name: '[Gen 9] Random Battle',
    mod: 'gen9',
    team: 'random',
    ruleset: [
      'PotD',
      'Obtainable',
      'Species Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 9] Unrated Random Battle',
    mod: 'gen9',
    team: 'random',
    ruleset: [
      'Obtainable',
      'Species Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 9] Free-For-All Random Battle',
    mod: 'gen9',
    team: 'random',
    gameType: 'freeforall',
    ruleset: [
      'Obtainable',
      'Species Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 9] Random Battle (Blitz)',
    mod: 'gen9',
    team: 'random',
    ruleset: [ '[Gen 9] Random Battle', 'Blitz' ]
  },
  {
    name: '[Gen 9] Multi Random Battle',
    mod: 'gen9',
    team: 'random',
    gameType: 'multi',
    ruleset: [
      'Max Team Size = 3',
      'Obtainable',
      'Species Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 9] OU',
    mod: 'gen9',
    ruleset: [ 'Standard', 'Sleep Moves Clause', '!Sleep Clause Mod' ],
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
    name: '[Gen 9] Ubers',
    mod: 'gen9',
    ruleset: [ 'Standard' ],
    banlist: [ 'AG', 'Moody', "King's Rock", 'Razor Fang', 'Baton Pass', 'Last Respects' ]
  },
  { name: '[Gen 9] UU', mod: 'gen9', ruleset: [ '[Gen 9] OU' ], banlist: [ 'OU', 'UUBL' ] },
  {
    name: '[Gen 9] RU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] UU' ],
    banlist: [ 'UU', 'RUBL', 'Light Clay' ]
  },
  {
    name: '[Gen 9] NU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] RU' ],
    banlist: [ 'RU', 'NUBL', 'Drought', 'Quick Claw' ]
  },
  {
    name: '[Gen 9] PU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] NU' ],
    banlist: [ 'NU', 'PUBL', 'Damp Rock' ]
  },
  {
    name: '[Gen 9] LC',
    mod: 'gen9',
    ruleset: [ 'Little Cup', 'Standard' ],
    banlist: [
      'Aipom',          'Basculin-White-Striped',
      'Cutiefly',       'Diglett-Base',
      'Dunsparce',      'Duraludon',
      'Flittle',        'Gastly',
      'Girafarig',      'Gligar',
      'Meditite',       'Misdreavus',
      'Murkrow',        'Porygon',
      'Qwilfish-Hisui', 'Rufflet',
      'Scraggy',        'Scyther',
      'Sneasel',        'Sneasel-Hisui',
      'Snivy',          'Stantler',
      'Voltorb-Hisui',  'Vulpix',
      'Vulpix-Alola',   'Yanma',
      'Moody',          'Baton Pass',
      'Sticky Web'
    ]
  },
  {
    name: '[Gen 9] Monotype',
    mod: 'gen9',
    ruleset: [ 'Standard', 'Evasion Abilities Clause', 'Same Type Clause', 'Terastal Clause' ],
    banlist: [
      'Annihilape',            'Arceus',         'Baxcalibur',
      'Calyrex-Ice',           'Calyrex-Shadow', 'Chi-Yu',
      'Chien-Pao',             'Blaziken',       'Deoxys-Normal',
      'Deoxys-Attack',         'Dialga',         'Dialga-Origin',
      'Espathra',              'Eternatus',      'Giratina',
      'Giratina-Origin',       'Groudon',        'Ho-Oh',
      'Iron Bundle',           'Kingambit',      'Koraidon',
      'Kyogre',                'Kyurem-Black',   'Kyurem-White',
      'Lugia',                 'Lunala',         'Magearna',
      'Mewtwo',                'Miraidon',       'Necrozma-Dawn-Wings',
      'Necrozma-Dusk-Mane',    'Palafin',        'Palkia',
      'Palkia-Origin',         'Rayquaza',       'Reshiram',
      'Shaymin-Sky',           'Solgaleo',       'Ursaluna-Bloodmoon',
      'Urshifu-Single-Strike', 'Zacian',         'Zacian-Crowned',
      'Zamazenta-Crowned',     'Zekrom',         'Moody',
      'Shadow Tag',            'Booster Energy', 'Damp Rock',
      'Focus Band',            "King's Rock",    'Quick Claw',
      'Razor Fang',            'Smooth Rock',    'Acupressure',
      'Baton Pass',            'Last Respects',  'Shed Tail'
    ]
  },
  {
    name: '[Gen 9] CAP',
    mod: 'gen9',
    ruleset: [ '[Gen 9] OU', '+CAP' ],
    banlist: [ 'Crucibellite' ]
  },
  {
    name: '[Gen 9] BSS Reg G',
    mod: 'gen9',
    bestOfDefault: true,
    ruleset: [
      'Flat Rules',
      '!! Adjust Level = 50',
      'Min Source Gen = 9',
      'VGC Timer',
      'Limit One Restricted'
    ],
    restricted: [ 'Restricted Legendary' ]
  },
  {
    name: '[Gen 9] BSS Reg H',
    mod: 'gen9',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer' ],
    banlist: [
      'Sub-Legendary',
      'Paradox',
      'Gouging Fire',
      'Iron Boulder',
      'Iron Crown',
      'Raging Bolt'
    ]
  },
  {
    name: '[Gen 9] Custom Game',
    mod: 'gen9',
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 9] Random Doubles Battle',
    mod: 'gen9',
    gameType: 'doubles',
    team: 'random',
    ruleset: [
      'PotD',
      'Obtainable',
      'Species Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Illusion Level Mod',
      'Sleep Clause Mod'
    ]
  },
  {
    name: '[Gen 9] Doubles OU',
    mod: 'gen9',
    gameType: 'doubles',
    ruleset: [ 'Standard Doubles' ],
    banlist: [ 'DUber', 'Shadow Tag' ]
  },
  {
    name: '[Gen 9] Doubles Ubers',
    mod: 'gen9',
    gameType: 'doubles',
    ruleset: [ 'Standard Doubles', '!Gravity Sleep Clause' ]
  },
  {
    name: '[Gen 9] Doubles UU',
    mod: 'gen9',
    gameType: 'doubles',
    ruleset: [ '[Gen 9] Doubles OU', 'Evasion Abilities Clause' ],
    banlist: [ 'DOU', 'DBL' ]
  },
  {
    name: '[Gen 9] Doubles LC',
    mod: 'gen9',
    gameType: 'doubles',
    ruleset: [ 'Standard Doubles', 'Little Cup', 'Sleep Clause Mod' ],
    banlist: [
      'Basculin-White-Striped',
      'Dunsparce',
      'Duraludon',
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
    name: '[Gen 9] VGC 2024 Reg G',
    mod: 'gen9',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [
      'Flat Rules',
      '!! Adjust Level = 50',
      'Min Source Gen = 9',
      'VGC Timer',
      'Open Team Sheets',
      'Limit One Restricted'
    ],
    restricted: [ 'Restricted Legendary' ]
  },
  {
    name: '[Gen 9] VGC 2024 Reg H',
    mod: 'gen9',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [
      'Flat Rules',
      '!! Adjust Level = 50',
      'Min Source Gen = 9',
      'VGC Timer',
      'Open Team Sheets'
    ],
    banlist: [
      'Sub-Legendary',
      'Paradox',
      'Gouging Fire',
      'Iron Boulder',
      'Iron Crown',
      'Raging Bolt'
    ]
  },
  {
    name: '[Gen 9] VGC 2024 Reg H (Bo3)',
    mod: 'gen9',
    gameType: 'doubles',
    ruleset: [
      'Flat Rules',
      '!! Adjust Level = 50',
      'Min Source Gen = 9',
      'VGC Timer',
      'Force Open Team Sheets',
      'Best of = 3'
    ],
    banlist: [
      'Sub-Legendary',
      'Paradox',
      'Gouging Fire',
      'Iron Boulder',
      'Iron Crown',
      'Raging Bolt'
    ]
  },
  {
    name: '[Gen 9] Doubles Custom Game',
    mod: 'gen9',
    gameType: 'doubles',
    battle: { trunc: Math.trunc },
    debug: true,
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 9] 1v1',
    mod: 'gen9',
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
      'Arceus',             'Archaludon',          'Calyrex-Ice',
      'Calyrex-Shadow',     'Chi-Yu',              'Cinderace',
      'Deoxys',             'Deoxys-Attack',       'Deoxys-Defense',
      'Deoxys-Speed',       'Dialga',              'Dialga-Origin',
      'Dragonite',          'Eternatus',           'Flutter Mane',
      'Gholdengo',          'Giratina',            'Giratina-Origin',
      'Gouging Fire',       'Groudon',             'Ho-Oh',
      'Jirachi',            'Koraidon',            'Kyogre',
      'Kyurem-Black',       'Kyurem-White',        'Lugia',
      'Lunala',             'Magearna',            'Meloetta',
      'Mew',                'Mewtwo',              'Mimikyu',
      'Miraidon',           'Necrozma',            'Necrozma-Dawn-Wings',
      'Necrozma-Dusk-Mane', 'Ogerpon-Cornerstone', 'Ogerpon-Hearthflame',
      'Palkia',             'Palkia-Origin',       'Rayquaza',
      'Reshiram',           'Scream Tail',         'Shaymin-Sky',
      'Snorlax',            'Solgaleo',            'Terapagos',
      'Zacian',             'Zacian-Crowned',      'Zamazenta',
      'Zamazenta-Crowned',  'Zekrom',              'Moody',
      'Focus Band',         'Focus Sash',          "King's Rock",
      'Razor Fang',         'Quick Claw',          'Acupressure',
      'Perish Song'
    ]
  },
  {
    name: '[Gen 9] 2v2 Doubles',
    mod: 'gen9',
    gameType: 'doubles',
    ruleset: [
      'Picked Team Size = 2',
      'Max Team Size = 4',
      'Standard Doubles',
      'Accuracy Moves Clause',
      'Terastal Clause',
      'Sleep Clause Mod',
      'Evasion Items Clause'
    ],
    banlist: [
      'Arceus',               'Calyrex-Ice',
      'Calyrex-Shadow',       'Chi-Yu',
      'Deoxys-Attack',        'Dialga',
      'Dialga-Origin',        'Eternatus',
      'Giratina',             'Giratina-Origin',
      'Groudon',              'Ho-Oh',
      'Koraidon',             'Kyogre',
      'Kyurem-White',         'Lugia',
      'Lunala',               'Magearna',
      'Mewtwo',               'Miraidon',
      'Necrozma-Dawn-Wings',  'Necrozma-Dusk-Mane',
      'Palkia',               'Palkia-Origin',
      'Rayquaza',             'Reshiram',
      'Solgaleo',             'Urshifu',
      'Urshifu-Rapid-Strike', 'Zacian',
      'Zacian-Crowned',       'Zamazenta',
      'Zamazenta-Crowned',    'Zekrom',
      'Commander',            'Moody',
      'Focus Sash',           "King's Rock",
      'Razor Fang',           'Ally Switch',
      'Final Gambit',         'Perish Song',
      'Swagger'
    ]
  },
  {
    name: '[Gen 9] Anything Goes',
    mod: 'gen9',
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
    name: '[Gen 9] Ubers UU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] Ubers' ],
    banlist: [
      'Arceus-Normal',       'Arceus-Fairy',
      'Arceus-Ground',       'Calyrex-Ice',
      'Clodsire',            'Deoxys-Attack',
      'Ditto',               'Eternatus',
      'Flutter Mane',        'Giratina-Origin',
      'Glimmora',            'Gliscor',
      'Grimmsnarl',          'Groudon',
      'Ho-Oh',               'Iron Bundle',
      'Iron Treads',         'Kingambit',
      'Koraidon',            'Kyogre',
      'Kyurem-Black',        'Lunala',
      'Miraidon',            'Necrozma-Dusk-Mane',
      'Rayquaza',            'Ribombee',
      'Skeledirge',          'Ting-Lu',
      'Zacian-Crowned',      'Arceus-Fire',
      'Arceus-Flying',       'Arceus-Ghost',
      'Arceus-Steel',        'Arceus-Water',
      'Necrozma-Dawn-Wings', 'Shaymin-Sky',
      'Zekrom'
    ]
  },
  {
    name: '[Gen 9] ZU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] PU' ],
    banlist: [ 'PU', 'ZUBL', 'Unburden' ]
  },
  {
    name: '[Gen 9] Free-For-All',
    mod: 'gen9',
    gameType: 'freeforall',
    ruleset: [ 'Standard', 'Sleep Moves Clause', '!Sleep Clause Mod', '!Evasion Items Clause' ],
    banlist: [
      'Annihilape',         'Arceus',               'Calyrex-Ice',
      'Calyrex-Shadow',     'Chi-Yu',               'Chien-Pao',
      'Darkrai',            'Deoxys-Normal',        'Deoxys-Attack',
      'Dialga',             'Dialga-Origin',        'Dondozo',
      'Eternatus',          'Flutter Mane',         'Giratina',
      'Giratina-Origin',    'Groudon',              'Ho-Oh',
      'Hoopa-Unbound',      'Iron Bundle',          'Koraidon',
      'Kyogre',             'Kyurem-White',         'Landorus-Incarnate',
      'Lugia',              'Lunala',               'Magearna',
      'Mewtwo',             'Miraidon',             'Necrozma-Dawn-Wings',
      'Necrozma-Dusk-Mane', 'Ogerpon-Hearthflame',  'Palkia',
      'Palkia-Origin',      'Rayquaza',             'Reshiram',
      'Shaymin-Sky',        'Solgaleo',             'Spectrier',
      'Terapagos',          'Ursaluna',             'Ursaluna-Bloodmoon',
      'Urshifu',            'Urshifu-Rapid-Strike', 'Zacian',
      'Zacian-Crowned',     'Zekrom',               'Moody',
      'Shadow Tag',         'Toxic Chain',          'Toxic Debris',
      'Acupressure',        'Aromatic Mist',        'Baton Pass',
      'Coaching',           'Court Change',         'Decorate',
      'Dragon Cheer',       'Final Gambit',         'Flatter',
      'Floral Healing',     'Follow Me',            'Heal Pulse',
      'Last Respects',      'Malignant Chain',      'Poison Fang',
      'Rage Powder',        'Spicy Extract',        'Swagger',
      'Toxic',              'Toxic Spikes'
    ]
  },
  {
    name: '[Gen 9] LC UU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] LC' ],
    banlist: [
      'Diglett-Alola',   'Drilbur',
      'Foongus',         'Glimmet',
      'Gothita',         'Grookey',
      'Growlithe-Hisui', 'Impidimp',
      'Koffing',         'Mareanie',
      'Mienfoo',         'Mudbray',
      'Pawniard',        'Shellder',
      'Stunky',          'Tentacool',
      'Timburr',         'Tinkatink',
      'Toedscool',       'Torchic',
      'Trapinch',        'Vullaby'
    ]
  },
  {
    name: '[Gen 9] Balanced Hackmons',
    mod: 'gen9',
    ruleset: [
      'OHKO Clause',
      'Evasion Clause',
      'Species Clause',
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Moves Clause',
      'Endless Battle Clause',
      'Hackmons Forme Legality',
      'Species Reveal Clause',
      'Terastal Clause'
    ],
    banlist: [
      'Calyrex-Shadow',   'Deoxys-Attack',    'Diancie-Mega',
      'Gengar-Mega',      'Groudon-Primal',   'Kartana',
      'Mewtwo-Mega-X',    'Mewtwo-Mega-Y',    'Rayquaza-Mega',
      'Regigigas',        'Shedinja',         'Slaking',
      'Arena Trap',       'Comatose',         'Contrary',
      'Gorilla Tactics',  'Hadron Engine',    'Huge Power',
      'Illusion',         'Innards Out',      'Libero',
      'Liquid Ooze',      'Magnet Pull',      'Moody',
      'Neutralizing Gas', 'Orichalcum Pulse', 'Parental Bond',
      'Poison Heal',      'Protean',          'Pure Power',
      'Shadow Tag',       'Stakeout',         'Water Bubble',
      'Wonder Guard',     'Baton Pass',       'Belly Drum',
      'Ceaseless Edge',   'Dire Claw',        'Electro Shot',
      'Fillet Away',      'Imprison',         'Last Respects',
      'Lumina Crash',     'Photon Geyser',    'Quiver Dance',
      'Rage Fist',        'Revival Blessing', 'Shed Tail',
      'Substitute',       'Shell Smash',      'Tail Glow'
    ]
  },
  {
    name: '[Gen 7] Pure Hackmons',
    mod: 'gen7',
    ruleset: [
      '-Nonexistent',
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Endless Battle Clause'
    ]
  },
  {
    name: '[Gen 9] Pure Hackmons',
    mod: 'gen9',
    ruleset: [
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Hackmons Forme Legality',
      'Species Reveal Clause',
      'Endless Battle Clause'
    ]
  },
  {
    name: '[Gen 9] Triples',
    mod: 'gen9',
    gameType: 'triples',
    ruleset: [ 'Standard Doubles', 'Evasion Abilities Clause' ],
    banlist: [
      'Annihilape',          'Arceus',
      'Calyrex-Ice',         'Calyrex-Shadow',
      'Darkrai',             'Dialga',
      'Dialga-Origin',       'Eternatus',
      'Flutter Mane',        'Giratina',
      'Giratina-Origin',     'Groudon',
      'Ho-Oh',               'Indeedee-M',
      'Indeedee-F',          'Koraidon',
      'Kyogre',              'Kyurem-Black',
      'Kyurem-White',        'Lugia',
      'Lunala',              'Magearna',
      'Mewtwo',              'Miraidon',
      'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
      'Palkia',              'Palkia-Origin',
      'Rayquaza',            'Reshiram',
      'Solgaleo',            'Terapagos',
      'Urshifu',             'Urshifu-Rapid-Strike',
      'Zacian',              'Zacian-Crowned',
      'Zamazenta',           'Zamazenta-Crowned',
      'Zekrom',              'Moody',
      'Shadow Tag',          'Bright Powder',
      "King's Rock",         'Razor Fang'
    ]
  },
  {
    name: '[Gen 6] Pure Hackmons',
    mod: 'gen6',
    ruleset: [
      '-Nonexistent',
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Endless Battle Clause',
      'EV limit = 510'
    ]
  },
  {
    name: '[Gen 9] National Dex',
    mod: 'gen9',
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
    name: '[Gen 8] National Dex',
    mod: 'gen8',
    ruleset: [
      'Standard NatDex',
      'OHKO Clause',
      'Evasion Clause',
      'Species Clause',
      'Dynamax Clause',
      'Sleep Clause Mod'
    ],
    banlist: [
      'ND Uber',
      'Arena Trap',
      'Moody',
      'Power Construct',
      'Shadow Tag',
      "King's Rock",
      'Razor Fang',
      'Quick Claw',
      'Baton Pass'
    ]
  },
  {
    name: '[Gen 9] National Dex Ubers',
    mod: 'gen9',
    ruleset: [
      'Standard NatDex',
      'OHKO Clause',
      'Evasion Moves Clause',
      'Evasion Items Clause',
      'Species Clause',
      'Sleep Clause Mod',
      'Mega Rayquaza Clause'
    ],
    banlist: [ 'ND AG', 'Assist', 'Baton Pass' ]
  },
  {
    name: '[Gen 9] National Dex UU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] National Dex', 'Terastal Clause' ],
    banlist: [ 'ND OU', 'ND UUBL', 'Drizzle', 'Drought', 'Light Clay' ]
  },
  {
    name: '[Gen 9] National Dex RU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] National Dex UU' ],
    banlist: [ 'ND UU', 'ND RUBL', 'Slowbro-Base + Slowbronite' ]
  },
  {
    name: '[Gen 9] National Dex LC',
    mod: 'gen9',
    ruleset: [
      'Standard NatDex',
      'Little Cup',
      'Species Clause',
      'OHKO Clause',
      'Evasion Clause',
      'Sleep Clause Mod'
    ],
    banlist: [
      'Aipom',         'Basculin-White-Striped',
      'Clamperl',      'Corsola-Galar',
      'Cutiefly',      'Drifloon',
      'Dunsparce',     'Duraludon',
      'Flittle',       'Girafarig',
      'Gligar',        'Meditite',
      'Misdreavus',    'Murkrow',
      'Porygon',       'Qwilfish-Hisui',
      'Rufflet',       'Scraggy',
      'Scyther',       'Sneasel',
      'Sneasel-Hisui', 'Stantler',
      'Swirlix',       'Tangela',
      'Vulpix-Alola',  'Woobat',
      'Yanma',         'Zigzagoon-Base',
      'Chlorophyll',   'Moody',
      'Eevium Z',      "King's Rock",
      'Quick Claw',    'Razor Fang',
      'Assist',        'Baton Pass',
      'Dragon Rage',   'Sonic Boom',
      'Sticky Web'
    ]
  },
  {
    name: '[Gen 9] National Dex Monotype',
    mod: 'gen9',
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
      'Annihilape',          'Arceus',              'Baxcalibur',
      'Blastoise-Mega',      'Blaziken',            'Blaziken-Mega',
      'Calyrex-Ice',         'Calyrex-Shadow',      'Chi-Yu',
      'Chien-Pao',           'Darkrai',             'Deoxys-Normal',
      'Deoxys-Attack',       'Dialga',              'Dracovish',
      'Dragapult',           'Espathra',            'Eternatus',
      'Flutter Mane',        'Genesect',            'Gengar-Mega',
      'Giratina',            'Giratina-Origin',     'Gouging Fire',
      'Groudon',             'Ho-Oh',               'Hoopa-Unbound',
      'Iron Bundle',         'Kangaskhan-Mega',     'Kartana',
      'Kingambit',           'Koraidon',            'Kyogre',
      'Kyurem-Black',        'Kyurem-White',        'Lucario-Mega',
      'Lugia',               'Lunala',              'Magearna',
      'Marshadow',           'Mawile-Mega',         'Medicham-Mega',
      'Metagross-Mega',      'Mewtwo',              'Miraidon',
      'Naganadel',           'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
      'Ogerpon-Hearthflame', 'Palafin',             'Palkia',
      'Pheromosa',           'Rayquaza',            'Reshiram',
      'Salamence-Mega',      'Shaymin-Sky',         'Solgaleo',
      'Spectrier',           'Ursaluna-Bloodmoon',  'Urshifu-Single-Strike',
      'Xerneas',             'Yveltal',             'Zacian',
      'Zacian-Crowned',      'Zamazenta',           'Zamazenta-Crowned',
      'Zekrom',              'Zygarde-50%',         'Zygarde-Complete',
      'Moody',               'Shadow Tag',          'Power Construct',
      'Booster Energy',      'Damp Rock',           'Focus Band',
      'Icy Rock',            "King's Rock",         'Leppa Berry',
      'Quick Claw',          'Razor Fang',          'Smooth Rock',
      'Terrain Extender',    'Acupressure',         'Baton Pass',
      'Last Respects',       'Shed Tail'
    ]
  },
  {
    name: '[Gen 9] National Dex Doubles',
    mod: 'gen9',
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
      'Annihilape',         'Arceus',               'Calyrex-Ice',
      'Calyrex-Shadow',     'Dialga',               'Dialga-Origin',
      'Eternatus',          'Genesect',             'Gengar-Mega',
      'Giratina',           'Giratina-Origin',      'Groudon',
      'Ho-Oh',              'Koraidon',             'Kyogre',
      'Kyurem-White',       'Lugia',                'Lunala',
      'Magearna',           'Melmetal',             'Metagross-Mega',
      'Mewtwo',             'Miraidon',             'Necrozma-Dawn-Wings',
      'Necrozma-Dusk-Mane', 'Necrozma-Ultra',       'Palkia',
      'Palkia-Origin',      'Rayquaza',             'Reshiram',
      'Shedinja',           'Solgaleo',             'Terapagos',
      'Urshifu',            'Urshifu-Rapid-Strike', 'Xerneas',
      'Yveltal',            'Zacian',               'Zacian-Crowned',
      'Zamazenta',          'Zamazenta-Crowned',    'Zekrom',
      'Zygarde-50%',        'Zygarde-Complete',     'Commander',
      'Power Construct',    'Eevium Z',             'Assist',
      'Coaching',           'Dark Void',            'Swagger'
    ]
  },
  {
    name: '[Gen 9] National Dex Doubles Ubers',
    mod: 'gen9',
    gameType: 'doubles',
    ruleset: [
      'Standard NatDex',
      'OHKO Clause',
      'Evasion Moves Clause',
      'Evasion Abilities Clause',
      'Species Clause'
    ],
    banlist: [ 'Shedinja', 'Assist' ]
  },
  {
    name: '[Gen 9] National Dex Ubers UU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] National Dex Ubers' ],
    banlist: [
      'Arceus-Normal',  'Arceus-Fairy',
      'Arceus-Ground',  'Arceus-Water',
      'Calyrex-Ice',    'Chien-Pao',
      'Deoxys-Attack',  'Eternatus',
      'Flutter Mane',   'Giratina-Origin',
      'Glimmora',       'Gliscor',
      'Grimmsnarl',     'Groudon',
      'Ho-Oh',          'Iron Bundle',
      'Iron Treads',    'Kingambit',
      'Koraidon',       'Kyogre',
      'Kyurem-Black',   'Landorus-Therian',
      'Miraidon',       'Necrozma-Dusk-Mane',
      'Rayquaza',       'Ribombee',
      'Skeledirge',     'Ting-Lu',
      'Zacian-Crowned', 'Arceus-Ghost',
      'Blaziken-Mega',  'Chi-Yu',
      'Shaymin-Sky',    'Zacian',
      'Zekrom',         'Power Construct',
      'Light Clay',     'Ultranecrozium Z',
      'Last Respects'
    ]
  },
  { name: '[Gen 9] National Dex AG', mod: 'gen9', ruleset: [ 'Standard NatDex' ] },
  {
    name: '[Gen 8] National Dex UU',
    mod: 'gen8',
    ruleset: [ '[Gen 8] National Dex' ],
    banlist: [ 'ND OU', 'ND UUBL', 'Drizzle', 'Drought', 'Light Clay', 'Slowbronite' ]
  },
  {
    name: '[Gen 8] National Dex Monotype',
    mod: 'gen8',
    ruleset: [
      'Standard NatDex',
      'Same Type Clause',
      'Species Clause',
      'OHKO Clause',
      'Evasion Moves Clause',
      'Evasion Items Clause',
      'Dynamax Clause',
      'Sleep Clause Mod'
    ],
    banlist: [
      'Arceus',                'Blastoise-Mega',  'Blaziken',
      'Blaziken-Mega',         'Calyrex-Ice',     'Calyrex-Shadow',
      'Darkrai',               'Deoxys-Normal',   'Deoxys-Attack',
      'Dialga',                'Dracovish',       'Dragapult',
      'Eternatus',             'Genesect',        'Gengar-Mega',
      'Giratina',              'Giratina-Origin', 'Greninja-Bond',
      'Greninja-Ash',          'Groudon',         'Ho-Oh',
      'Hoopa-Unbound',         'Kangaskhan-Mega', 'Kartana',
      'Kyogre',                'Kyurem-Black',    'Kyurem-White',
      'Lucario-Mega',          'Lugia',           'Lunala',
      'Magearna',              'Marshadow',       'Mawile-Mega',
      'Medicham-Mega',         'Metagross-Mega',  'Mewtwo',
      'Moltres-Galar',         'Naganadel',       'Necrozma-Dawn-Wings',
      'Necrozma-Dusk-Mane',    'Palkia',          'Pheromosa',
      'Rayquaza',              'Reshiram',        'Salamence-Mega',
      'Shaymin-Sky',           'Solgaleo',        'Spectrier',
      'Urshifu-Single-Strike', 'Xerneas',         'Yveltal',
      'Zacian',                'Zacian-Crowned',  'Zamazenta',
      'Zamazenta-Crowned',     'Zekrom',          'Zygarde-50%',
      'Zygarde-Complete',      'Battle Bond',     'Power Construct',
      'Moody',                 'Shadow Tag',      'Damp Rock',
      'Focus Band',            "King's Rock",     'Quick Claw',
      'Razor Fang',            'Smooth Rock',     'Terrain Extender',
      'Baton Pass'
    ]
  },
  {
    name: '[Gen 9] Monotype Random Battle',
    mod: 'gen9',
    team: 'random',
    ruleset: [
      'Obtainable',
      'Same Type Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 9] BSS Factory',
    mod: 'gen9',
    team: 'randomBSSFactory',
    ruleset: [ 'Flat Rules', 'VGC Timer' ]
  },
  {
    name: '[Gen 9] Baby Random Battle',
    mod: 'gen9',
    team: 'randomBaby',
    ruleset: [
      'Obtainable',
      'Species Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 9] Computer-Generated Teams',
    mod: 'gen9',
    team: 'computerGenerated',
    ruleset: [
      'Obtainable',
      'Species Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 9] Hackmons Cup',
    mod: 'gen9',
    team: 'randomHC',
    ruleset: [ 'HP Percentage Mod', 'Cancel Mod' ],
    banlist: [
      'CAP',                 'LGPE',
      'MissingNo.',          'Pikachu-Cosplay',
      'Pichu-Spiky-eared',   'Pokestar Smeargle',
      'Pokestar UFO',        'Pokestar UFO-2',
      'Pokestar Brycen-Man', 'Pokestar MT',
      'Pokestar MT2',        'Pokestar Transport',
      'Pokestar Giant',      'Pokestar Humanoid',
      'Pokestar Monster',    'Pokestar F-00',
      'Pokestar F-002',      'Pokestar Spirit',
      'Pokestar Black Door', 'Pokestar White Door',
      'Pokestar Black Belt', 'Pokestar UFO-PropU2',
      'Xerneas-Neutral'
    ],
    unbanlist: [ 'All Pokemon' ]
  },
  {
    name: '[Gen 9] Doubles Hackmons Cup',
    mod: 'gen9',
    team: 'randomHC',
    gameType: 'doubles',
    ruleset: [ '[Gen 9] Hackmons Cup' ]
  },
  {
    name: '[Gen 9] Challenge Cup 1v1',
    mod: 'gen9',
    team: 'randomCC',
    ruleset: [
      'Obtainable',
      'HP Percentage Mod',
      'Cancel Mod',
      'Team Preview',
      'Terastal Clause',
      'Picked Team Size = 1'
    ]
  },
  {
    name: '[Gen 9] Challenge Cup 2v2',
    mod: 'gen9',
    team: 'randomCC',
    gameType: 'doubles',
    ruleset: [
      'Obtainable',
      'HP Percentage Mod',
      'Cancel Mod',
      'Team Preview',
      'Picked Team Size = 2'
    ]
  },
  {
    name: '[Gen 9] Challenge Cup 6v6',
    mod: 'gen9',
    team: 'randomCC',
    ruleset: [ 'Obtainable', 'HP Percentage Mod', 'Cancel Mod' ]
  },
  {
    name: '[Gen 8] Random Battle',
    mod: 'gen8',
    team: 'random',
    ruleset: [
      'PotD',
      'Obtainable',
      'Species Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 8] Random Doubles Battle',
    mod: 'gen8',
    gameType: 'doubles',
    team: 'random',
    ruleset: [
      'PotD',
      'Obtainable',
      'Species Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 8] Free-For-All Random Battle',
    mod: 'gen8',
    team: 'random',
    gameType: 'freeforall',
    ruleset: [
      'Obtainable',
      'Species Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 8] Multi Random Battle',
    mod: 'gen8',
    team: 'random',
    gameType: 'multi',
    ruleset: [
      'Max Team Size = 3',
      'Obtainable',
      'Species Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 8] BSS Factory',
    mod: 'gen8',
    team: 'randomBSSFactory',
    ruleset: [ 'Flat Rules' ]
  },
  {
    name: '[Gen 8] Hackmons Cup',
    mod: 'gen8',
    team: 'randomHC',
    ruleset: [ 'HP Percentage Mod', 'Cancel Mod' ],
    banlist: [ 'Nonexistent' ]
  },
  {
    name: '[Gen 8] CAP 1v1',
    mod: 'gen8',
    team: 'randomCAP1v1',
    ruleset: [
      'Picked Team Size = 1',
      'Max Team Size = 3',
      'Species Clause',
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Dynamax Clause'
    ]
  },
  {
    name: '[Gen 7] Random Battle',
    mod: 'gen7',
    team: 'random',
    ruleset: [
      'Obtainable',
      'Sleep Clause Mod',
      'HP Percentage Mod',
      'Cancel Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 7] BSS Factory',
    mod: 'gen7',
    team: 'randomBSSFactory',
    ruleset: [ 'Flat Rules' ]
  },
  {
    name: '[Gen 7] Hackmons Cup',
    mod: 'gen7',
    team: 'randomHC',
    ruleset: [ 'HP Percentage Mod', 'Cancel Mod' ],
    banlist: [ 'Nonexistent' ]
  },
  {
    name: '[Gen 6] Random Battle',
    mod: 'gen6',
    team: 'random',
    ruleset: [
      'Obtainable',
      'Sleep Clause Mod',
      'HP Percentage Mod',
      'Cancel Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 5] Random Battle',
    mod: 'gen5',
    team: 'random',
    ruleset: [
      'Obtainable',
      'Sleep Clause Mod',
      'HP Percentage Mod',
      'Cancel Mod',
      'Illusion Level Mod'
    ]
  },
  {
    name: '[Gen 4] Random Battle',
    mod: 'gen4',
    team: 'random',
    ruleset: [ 'Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod' ]
  },
  { name: '[Gen 3] Random Battle', mod: 'gen3', team: 'random', ruleset: [ 'Standard' ] },
  { name: '[Gen 2] Random Battle', mod: 'gen2', team: 'random', ruleset: [ 'Standard' ] },
  { name: '[Gen 1] Random Battle', mod: 'gen1', team: 'random', ruleset: [ 'Standard' ] },
  {
    name: '[Gen 1] Challenge Cup',
    mod: 'gen1',
    team: 'randomCC',
    ruleset: [
      'Obtainable',
      'HP Percentage Mod',
      'Cancel Mod',
      'Desync Clause Mod',
      'Sleep Clause Mod',
      'Freeze Clause Mod'
    ]
  },
  {
    name: '[Gen 3] Ubers',
    mod: 'gen3',
    ruleset: [ 'Standard', 'Deoxys Camouflage Clause', 'One Baton Pass Clause' ],
    banlist: [ 'Wobbuffet + Leftovers', 'Wynaut + Leftovers', 'Baton Pass' ]
  },
  {
    name: '[Gen 5] PU',
    mod: 'gen5',
    ruleset: [ '[Gen 5] NU', 'Sleep Moves Clause' ],
    banlist: [ 'NU', 'PUBL', 'Damp Rock' ]
  },
  {
    name: '[Gen 4] ZU',
    mod: 'gen4',
    ruleset: [ '[Gen 4] PU' ],
    banlist: [
      'Ampharos',   'Armaldo',    'Bellossom', 'Dragonair',
      'Electabuzz', 'Gabite',     'Gastrodon', 'Glaceon',
      'Glalie',     'Golduck',    'Gorebyss',  'Hippopotas',
      'Kadabra',    'Kingler',    'Lapras',    'Machoke',
      'Magmar',     'Mantine',    'Marowak',   'Metang',
      'Misdreavus', 'Monferno',   'Mr. Mime',  'Muk',
      'Murkrow',    'Pinsir',     'Politoed',  'Purugly',
      'Quagsire',   'Raichu',     'Rampardos', 'Rapidash',
      'Regigigas',  'Relicanth',  'Rhydon',    'Scyther',
      'Sneasel',    'Snover',     'Solrock',   'Tangela',
      'Torkoal',    'Victreebel', 'Xatu',      'Walrein',
      'Zangoose',   'Damp Rock'
    ]
  },
  {
    name: '[Gen 8] OU',
    mod: 'gen8',
    ruleset: [ 'Standard', 'Dynamax Clause' ],
    banlist: [
      'Uber',
      'AG',
      'Arena Trap',
      'Moody',
      'Power Construct',
      'Sand Veil',
      'Shadow Tag',
      'Snow Cloak',
      "King's Rock",
      'Baton Pass'
    ]
  },
  {
    name: '[Gen 7] OU',
    mod: 'gen7',
    ruleset: [ 'Standard' ],
    banlist: [ 'Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass' ]
  },
  {
    name: '[Gen 6] OU',
    mod: 'gen6',
    ruleset: [ 'Standard', 'Swagger Clause' ],
    banlist: [ 'Uber', 'Arena Trap', 'Shadow Tag', 'Soul Dew', 'Baton Pass' ]
  },
  {
    name: '[Gen 5] OU',
    mod: 'gen5',
    ruleset: [
      'Standard',
      'Evasion Abilities Clause',
      'Sleep Moves Clause',
      'Swagger Clause',
      'Gems Clause',
      'Baton Pass Stat Clause'
    ],
    banlist: [
      'Uber',
      'Arena Trap',
      'Drizzle ++ Swift Swim',
      'Drought ++ Chlorophyll',
      'Sand Rush',
      'Shadow Tag',
      "King's Rock",
      'Razor Fang',
      'Soul Dew',
      'Acupressure',
      'Assist'
    ]
  },
  {
    name: '[Gen 4] OU',
    mod: 'gen4',
    ruleset: [
      'Standard',
      'Evasion Abilities Clause',
      'Baton Pass Stat Trap Clause',
      'Freeze Clause Mod'
    ],
    banlist: [ 'AG', 'Uber', 'Arena Trap', 'Quick Claw', 'Soul Dew', 'Swagger' ]
  },
  {
    name: '[Gen 3] OU',
    mod: 'gen3',
    ruleset: [ 'Standard', 'One Boost Passer Clause', 'Freeze Clause Mod' ],
    banlist: [
      'Uber',
      'Smeargle + Ingrain',
      'Sand Veil',
      'Soundproof',
      'Assist',
      'Baton Pass + Block',
      'Baton Pass + Mean Look',
      'Baton Pass + Spider Web',
      'Swagger'
    ]
  },
  {
    name: '[Gen 2] OU',
    mod: 'gen2',
    ruleset: [ 'Standard' ],
    banlist: [ 'Uber', 'Mean Look + Baton Pass', 'Spider Web + Baton Pass' ]
  },
  { name: '[Gen 1] OU', mod: 'gen1', ruleset: [ 'Standard' ], banlist: [ 'Uber' ] },
  {
    name: '[Gen 8] Doubles OU',
    mod: 'gen8',
    gameType: 'doubles',
    ruleset: [ 'Standard Doubles', 'Dynamax Clause', 'Swagger Clause' ],
    banlist: [ 'DUber', 'Power Construct', 'Shadow Tag' ]
  },
  {
    name: '[Gen 7] Doubles OU',
    mod: 'gen7',
    gameType: 'doubles',
    ruleset: [ 'Standard Doubles', 'Swagger Clause' ],
    banlist: [ 'DUber', 'Power Construct', 'Eevium Z', 'Dark Void' ]
  },
  {
    name: '[Gen 6] Doubles OU',
    mod: 'gen6',
    gameType: 'doubles',
    ruleset: [ 'Standard Doubles', 'Swagger Clause' ],
    banlist: [ 'DUber', 'Soul Dew', 'Dark Void' ]
  },
  {
    name: '[Gen 5] Doubles OU',
    mod: 'gen5',
    gameType: 'doubles',
    ruleset: [ 'Standard', 'Evasion Abilities Clause', 'Swagger Clause', 'Sleep Clause Mod' ],
    banlist: [ 'DUber', 'Soul Dew', 'Dark Void', 'Gravity' ]
  },
  {
    name: '[Gen 4] Doubles OU',
    mod: 'gen4',
    gameType: 'doubles',
    ruleset: [ 'Standard', 'Evasion Abilities Clause' ],
    banlist: [ 'AG', 'Uber', 'Soul Dew', 'Dark Void', 'Thunder Wave' ],
    unbanlist: [ 'Manaphy', 'Mew', 'Salamence', 'Wobbuffet', 'Wynaut' ]
  },
  {
    name: '[Gen 3] Doubles OU',
    mod: 'gen3',
    gameType: 'doubles',
    ruleset: [ 'Standard', '!Switch Priority Clause Mod' ],
    banlist: [ 'Uber', 'Quick Claw', 'Soul Dew', 'Explosion', 'Self-Destruct', 'Swagger' ],
    unbanlist: [ 'Wobbuffet', 'Wynaut' ]
  },
  {
    name: '[Gen 8] Ubers',
    mod: 'gen8',
    ruleset: [ 'Standard', 'Dynamax Clause' ],
    banlist: [ 'AG', 'Shadow Tag', 'Baton Pass' ]
  },
  {
    name: '[Gen 8] UU',
    mod: 'gen8',
    ruleset: [ '[Gen 8] OU' ],
    banlist: [ 'OU', 'UUBL', 'Light Clay' ]
  },
  { name: '[Gen 8] RU', mod: 'gen8', ruleset: [ '[Gen 8] UU' ], banlist: [ 'UU', 'RUBL' ] },
  {
    name: '[Gen 8] NU',
    mod: 'gen8',
    ruleset: [ '[Gen 8] RU' ],
    banlist: [ 'RU', 'NUBL', 'Drizzle', 'Drought', 'Slush Rush' ]
  },
  { name: '[Gen 8] PU', mod: 'gen8', ruleset: [ '[Gen 8] NU' ], banlist: [ 'NU', 'PUBL' ] },
  {
    name: '[Gen 8] LC',
    mod: 'gen8',
    ruleset: [ 'Little Cup', 'Standard', 'Dynamax Clause' ],
    banlist: [
      'Corsola-Galar',  'Cutiefly',
      'Drifloon',       'Gastly',
      'Gothita',        'Magby',
      'Rufflet',        'Scraggy',
      'Scyther',        'Sneasel',
      'Swirlix',        'Tangela',
      'Vulpix-Alola',   'Woobat',
      'Zigzagoon-Base', 'Chlorophyll',
      'Moody',          'Baton Pass',
      'Sticky Web'
    ]
  },
  {
    name: '[Gen 8] Monotype',
    mod: 'gen8',
    ruleset: [ 'Same Type Clause', 'Standard', 'Evasion Abilities Clause', 'Dynamax Clause' ],
    banlist: [
      'Blaziken',           'Calyrex-Ice',         'Calyrex-Shadow',
      'Dialga',             'Dracovish',           'Eternatus',
      'Genesect',           'Giratina',            'Giratina-Origin',
      'Groudon',            'Ho-Oh',               'Kartana',
      'Kyogre',             'Kyurem-Black',        'Kyurem-White',
      'Landorus-Incarnate', 'Lugia',               'Lunala',
      'Magearna',           'Marshadow',           'Mewtwo',
      'Naganadel',          'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
      'Palkia',             'Pheromosa',           'Rayquaza',
      'Reshiram',           'Solgaleo',            'Urshifu-Single-Strike',
      'Xerneas',            'Yveltal',             'Zacian',
      'Zacian-Crowned',     'Zamazenta',           'Zamazenta-Crowned',
      'Zekrom',             'Zygarde-50%',         'Moody',
      'Power Construct',    'Shadow Tag',          'Damp Rock',
      'Focus Band',         "King's Rock",         'Quick Claw',
      'Smooth Rock',        'Terrain Extender',    'Acupressure',
      'Baton Pass'
    ]
  },
  {
    name: '[Gen 8] 1v1',
    mod: 'gen8',
    ruleset: [
      'Picked Team Size = 1',
      'Max Team Size = 3',
      'Obtainable',
      'Species Clause',
      'Nickname Clause',
      'OHKO Clause',
      'Evasion Moves Clause',
      'Accuracy Moves Clause',
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Dynamax Clause',
      'Endless Battle Clause'
    ],
    banlist: [
      'Calyrex-Ice',         'Calyrex-Shadow',     'Cinderace',
      'Dialga',              'Dragonite',          'Eternatus',
      'Genesect',            'Giratina',           'Giratina-Origin',
      'Groudon',             'Ho-Oh',              'Jirachi',
      'Kyogre',              'Kyurem-Black',       'Kyurem-White',
      'Lugia',               'Lunala',             'Magearna',
      'Marshadow',           'Melmetal',           'Mew',
      'Mewtwo',              'Mimikyu',            'Necrozma',
      'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
      'Rayquaza',            'Reshiram',           'Sableye',
      'Snorlax',             'Solgaleo',           'Victini',
      'Xerneas',             'Yveltal',            'Zacian',
      'Zacian-Crowned',      'Zamazenta',          'Zamazenta-Crowned',
      'Zekrom',              'Moody',              'Power Construct',
      'Bright Powder',       'Focus Band',         'Focus Sash',
      'Lax Incense',         'Quick Claw',         'Acupressure',
      'Hypnosis',            'Perish Song',        'Sing'
    ]
  },
  {
    name: '[Gen 8] Anything Goes',
    mod: 'gen8',
    ruleset: [
      'Obtainable',
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Endless Battle Clause'
    ]
  },
  {
    name: '[Gen 8] ZU',
    mod: 'gen8',
    ruleset: [ '[Gen 8] PU' ],
    banlist: [ 'PU', 'ZUBL', 'Damp Rock', 'Grassy Seed' ]
  },
  {
    name: '[Gen 8] CAP',
    mod: 'gen8',
    ruleset: [ '[Gen 8] OU', '+CAP' ],
    banlist: [ 'Crucibellite' ]
  },
  {
    name: '[Gen 8] Battle Stadium Singles',
    mod: 'gen8',
    bestOfDefault: true,
    ruleset: [
      'Flat Rules',
      '!! Adjust Level = 50',
      'Min Source Gen = 8',
      'VGC Timer',
      'Limit Two Restricted'
    ],
    restricted: [ 'Restricted Legendary' ]
  },
  {
    name: '[Gen 8] Custom Game',
    mod: 'gen8',
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 8] Doubles Ubers',
    mod: 'gen8',
    gameType: 'doubles',
    ruleset: [ 'Standard Doubles', '!Gravity Sleep Clause' ],
    banlist: []
  },
  {
    name: '[Gen 8] Doubles UU',
    mod: 'gen8',
    gameType: 'doubles',
    ruleset: [ '[Gen 8] Doubles OU' ],
    banlist: [ 'DOU', 'DBL' ]
  },
  {
    name: '[Gen 8] VGC 2022',
    mod: 'gen8',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [
      'Flat Rules',
      '!! Adjust Level = 50',
      'Min Source Gen = 8',
      'VGC Timer',
      'Limit Two Restricted'
    ],
    restricted: [ 'Restricted Legendary' ]
  },
  {
    name: '[Gen 8] VGC 2021',
    mod: 'gen8',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 8', 'VGC Timer' ]
  },
  {
    name: '[Gen 8] Doubles Custom Game',
    mod: 'gen8',
    gameType: 'doubles',
    battle: { trunc: Math.trunc },
    debug: true,
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 7] Ubers',
    mod: 'gen7',
    ruleset: [ 'Standard', 'Mega Rayquaza Clause' ],
    banlist: [ 'Baton Pass' ]
  },
  {
    name: '[Gen 7] UU',
    mod: 'gen7',
    ruleset: [ '[Gen 7] OU' ],
    banlist: [ 'OU', 'UUBL', 'Drizzle', 'Drought', 'Kommonium Z', 'Mewnium Z' ]
  },
  {
    name: '[Gen 7] RU',
    mod: 'gen7',
    ruleset: [ '[Gen 7] UU' ],
    banlist: [ 'UU', 'RUBL', 'Mimikyu', 'Aurora Veil' ],
    unbanlist: [ 'Drought' ]
  },
  {
    name: '[Gen 7] NU',
    mod: 'gen7',
    ruleset: [ '[Gen 7] RU' ],
    banlist: [ 'RU', 'NUBL', 'Drought' ]
  },
  { name: '[Gen 7] PU', mod: 'gen7', ruleset: [ '[Gen 7] NU' ], banlist: [ 'NU', 'PUBL' ] },
  {
    name: '[Gen 7] LC',
    mod: 'gen7',
    ruleset: [ 'Little Cup', 'Standard', 'Swagger Clause' ],
    banlist: [
      'Aipom',       'Cutiefly',
      'Drifloon',    'Gligar',
      'Gothita',     'Meditite',
      'Misdreavus',  'Murkrow',
      'Porygon',     'Scyther',
      'Sneasel',     'Swirlix',
      'Tangela',     'Trapinch',
      'Vulpix-Base', 'Wingull',
      'Yanma',       'Eevium Z',
      'Baton Pass',  'Dragon Rage',
      'Sonic Boom',  'Sticky Web'
    ]
  },
  {
    name: '[Gen 7] Monotype',
    mod: 'gen7',
    ruleset: [ 'Same Type Clause', 'Standard', 'Evasion Abilities Clause', 'Swagger Clause' ],
    banlist: [
      'Aegislash',     'Arceus',              'Blaziken',
      'Darkrai',       'Deoxys-Normal',       'Deoxys-Attack',
      'Dialga',        'Genesect',            'Gengar-Mega',
      'Giratina',      'Giratina-Origin',     'Groudon',
      'Ho-Oh',         'Hoopa-Unbound',       'Kangaskhan-Mega',
      'Kartana',       'Kyogre',              'Kyurem-White',
      'Lucario-Mega',  'Lugia',               'Lunala',
      'Magearna',      'Marshadow',           'Mawile-Mega',
      'Medicham-Mega', 'Metagross-Mega',      'Mewtwo',
      'Naganadel',     'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
      'Palkia',        'Pheromosa',           'Rayquaza',
      'Reshiram',      'Salamence-Mega',      'Shaymin-Sky',
      'Solgaleo',      'Tapu Lele',           'Xerneas',
      'Yveltal',       'Zekrom',              'Zygarde',
      'Battle Bond',   'Shadow Tag',          'Damp Rock',
      'Focus Band',    "King's Rock",         'Quick Claw',
      'Razor Fang',    'Smooth Rock',         'Terrain Extender',
      'Baton Pass'
    ]
  },
  {
    name: '[Gen 7] 1v1',
    mod: 'gen7',
    ruleset: [
      'Picked Team Size = 1',
      'Max Team Size = 3',
      'Obtainable',
      'Species Clause',
      'Nickname Clause',
      'OHKO Clause',
      'Swagger Clause',
      'Evasion Moves Clause',
      'Accuracy Moves Clause',
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Endless Battle Clause'
    ],
    banlist: [
      'Arceus',              'Darkrai',
      'Deoxys-Normal',       'Deoxys-Attack',
      'Deoxys-Defense',      'Dialga',
      'Giratina',            'Giratina-Origin',
      'Groudon',             'Ho-Oh',
      'Kangaskhan-Mega',     'Kyogre',
      'Kyurem-Black',        'Kyurem-White',
      'Lugia',               'Lunala',
      'Marshadow',           'Mew',
      'Mewtwo',              'Mimikyu',
      'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
      'Palkia',              'Rayquaza',
      'Reshiram',            'Salamence-Mega',
      'Shaymin-Sky',         'Snorlax',
      'Solgaleo',            'Tapu Koko',
      'Xerneas',             'Yveltal',
      'Zekrom',              'Moody',
      'Focus Sash',          'Grass Whistle',
      'Hypnosis',            'Perish Song',
      'Sing',                'Detect + Fightinium Z'
    ]
  },
  {
    name: '[Gen 7] Anything Goes',
    mod: 'gen7',
    ruleset: [
      'Obtainable',
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Endless Battle Clause'
    ]
  },
  { name: '[Gen 7] ZU', mod: 'gen7', ruleset: [ '[Gen 7] PU' ], banlist: [ 'PU', 'ZUBL' ] },
  { name: '[Gen 7] CAP', mod: 'gen7', ruleset: [ '[Gen 7] OU', '+CAP' ] },
  {
    name: '[Gen 7] Battle Spot Singles',
    mod: 'gen7',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', 'Min Source Gen = 6' ],
    banlist: [ 'Battle Bond' ]
  },
  {
    name: '[Gen 7] Custom Game',
    mod: 'gen7',
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 7] Doubles UU',
    mod: 'gen7',
    gameType: 'doubles',
    ruleset: [ '[Gen 7] Doubles OU' ],
    banlist: [ 'DOU', 'DBL' ]
  },
  {
    name: '[Gen 7] VGC 2019',
    mod: 'gen7',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [
      'Flat Rules',
      '!! Adjust Level = 50',
      'Min Source Gen = 7',
      'VGC Timer',
      'Limit Two Restricted'
    ],
    restricted: [ 'Restricted Legendary' ],
    banlist: [ 'Unown', 'Battle Bond' ]
  },
  {
    name: '[Gen 7] VGC 2018',
    mod: 'gen7',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [
      'Flat Rules',
      '!! Adjust Level = 50',
      'Min Source Gen = 7',
      'VGC Timer',
      '!! Timer Starting = 300'
    ],
    banlist: [
      'Oranguru + Symbiosis',
      'Passimian + Defiant',
      'Unown',
      'Custap Berry',
      'Enigma Berry',
      'Jaboca Berry',
      'Micle Berry',
      'Rowap Berry',
      'Battle Bond'
    ]
  },
  {
    name: '[Gen 7] Battle Spot Doubles',
    mod: 'gen7',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', 'Min Source Gen = 6' ],
    banlist: [ 'Battle Bond' ]
  },
  {
    name: '[Gen 7] Doubles Custom Game',
    mod: 'gen7',
    gameType: 'doubles',
    battle: { trunc: Math.trunc },
    debug: true,
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 6] Ubers',
    mod: 'gen6',
    ruleset: [ 'Standard', 'Swagger Clause', 'Mega Rayquaza Clause' ]
  },
  {
    name: '[Gen 6] UU',
    mod: 'gen6',
    ruleset: [ '[Gen 6] OU' ],
    banlist: [ 'OU', 'UUBL', 'Drizzle', 'Drought' ]
  },
  { name: '[Gen 6] RU', mod: 'gen6', ruleset: [ '[Gen 6] UU' ], banlist: [ 'UU', 'RUBL' ] },
  { name: '[Gen 6] NU', mod: 'gen6', ruleset: [ '[Gen 6] RU' ], banlist: [ 'RU', 'NUBL' ] },
  {
    name: '[Gen 6] PU',
    mod: 'gen6',
    ruleset: [ '[Gen 6] NU' ],
    banlist: [ 'NU', 'PUBL', 'Chatter' ]
  },
  {
    name: '[Gen 6] LC',
    mod: 'gen6',
    ruleset: [ 'Standard', 'Little Cup' ],
    banlist: [
      'Drifloon',   'Gligar',
      'Meditite',   'Misdreavus',
      'Murkrow',    'Scyther',
      'Sneasel',    'Swirlix',
      'Tangela',    'Yanma',
      'Baton Pass', 'Dragon Rage',
      'Sonic Boom', 'Swagger'
    ]
  },
  {
    name: '[Gen 6] Monotype',
    mod: 'gen6',
    ruleset: [ 'Standard', 'Swagger Clause', 'Evasion Abilities Clause', 'Same Type Clause' ],
    banlist: [
      'Aegislash',       'Altaria-Mega',   'Arceus',
      'Blaziken',        'Darkrai',        'Deoxys-Normal',
      'Deoxys-Attack',   'Deoxys-Speed',   'Dialga',
      'Genesect',        'Gengar-Mega',    'Giratina',
      'Giratina-Origin', 'Greninja',       'Groudon',
      'Ho-Oh',           'Hoopa-Unbound',  'Kangaskhan-Mega',
      'Keldeo',          'Kyogre',         'Kyurem-White',
      'Lucario-Mega',    'Lugia',          'Mawile-Mega',
      'Medicham-Mega',   'Metagross-Mega', 'Mewtwo',
      'Palkia',          'Rayquaza',       'Reshiram',
      'Sableye-Mega',    'Salamence-Mega', 'Shaymin-Sky',
      'Slowbro-Mega',    'Talonflame',     'Xerneas',
      'Yveltal',         'Zekrom',         'Shadow Tag',
      'Damp Rock',       'Focus Band',     "King's Rock",
      'Quick Claw',      'Razor Fang',     'Smooth Rock',
      'Soul Dew',        'Baton Pass'
    ]
  },
  {
    name: '[Gen 6] 1v1',
    mod: 'gen6',
    ruleset: [
      'Max Team Size = 3',
      'Picked Team Size = 1',
      'Obtainable',
      'Nickname Clause',
      'Moody Clause',
      'OHKO Clause',
      'Evasion Moves Clause',
      'Accuracy Moves Clause',
      'Swagger Clause',
      'Endless Battle Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Team Preview'
    ],
    banlist: [
      'Arceus',           'Blaziken-Mega',
      'Charizard-Mega-X', 'Charizard-Mega-Y',
      'Deoxys-Normal',    'Deoxys-Attack',
      'Deoxys-Defense',   'Dialga',
      'Giratina',         'Giratina-Origin',
      'Groudon',          'Ho-Oh',
      'Kangaskhan-Mega',  'Kyogre',
      'Kyurem-White',     'Lugia',
      'Mewtwo',           'Palkia',
      'Rayquaza',         'Reshiram',
      'Salamence-Mega',   'Shaymin-Sky',
      'Snorlax',          'Xerneas',
      'Yveltal',          'Zekrom',
      'Focus Sash',       'Soul Dew',
      'Dark Void',        'Grass Whistle',
      'Hypnosis',         'Perish Song',
      'Sing',             'Sleep Powder',
      'Yawn'
    ]
  },
  {
    name: '[Gen 6] Anything Goes',
    mod: 'gen6',
    ruleset: [
      'Obtainable',
      'Team Preview',
      'Endless Battle Clause',
      'HP Percentage Mod',
      'Cancel Mod'
    ]
  },
  { name: '[Gen 6] ZU', mod: 'gen6', ruleset: [ '[Gen 6] PU' ], banlist: [ 'PU', 'ZUBL' ] },
  {
    name: '[Gen 6] CAP',
    mod: 'gen6',
    ruleset: [ '[Gen 6] OU', '+CAP' ],
    banlist: [ 'Cawmodore' ]
  },
  {
    name: '[Gen 6] Battle Spot Singles',
    mod: 'gen6',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', 'Min Source Gen = 6' ],
    banlist: [ 'Soul Dew' ]
  },
  {
    name: '[Gen 6] Custom Game',
    mod: 'gen6',
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 6] VGC 2016',
    mod: 'gen6',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', 'Min Source Gen = 6', 'Limit Two Restricted' ],
    restricted: [ 'Restricted Legendary' ],
    banlist: [ 'Soul Dew' ]
  },
  {
    name: '[Gen 6] VGC 2015',
    mod: 'gen6',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', 'Min Source Gen = 6' ],
    banlist: [
      'Soul Dew',
      'Articuno + Snow Cloak',
      'Zapdos + Static',
      'Moltres + Flame Body',
      'Dragonite + Barrier'
    ]
  },
  {
    name: '[Gen 6] Battle Spot Doubles',
    mod: 'gen6',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules', 'Min Source Gen = 6' ],
    banlist: [ 'Soul Dew' ]
  },
  {
    name: '[Gen 6] Doubles Custom Game',
    mod: 'gen6',
    gameType: 'doubles',
    battle: { trunc: Math.trunc },
    debug: true,
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 6] Battle Spot Triples',
    mod: 'gen6',
    gameType: 'triples',
    ruleset: [ 'Flat Rules', 'Min Source Gen = 6' ]
  },
  {
    name: '[Gen 6] Triples Custom Game',
    mod: 'gen6',
    gameType: 'triples',
    battle: { trunc: Math.trunc },
    debug: true,
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  { name: '[Gen 5] Ubers', mod: 'gen5', ruleset: [ 'Standard', 'Sleep Clause Mod' ] },
  {
    name: '[Gen 5] UU',
    mod: 'gen5',
    ruleset: [ 'Standard', 'Evasion Abilities Clause', 'Swagger Clause', 'Sleep Clause Mod' ],
    banlist: [
      'Uber',
      'OU',
      'UUBL',
      'Arena Trap',
      'Drought',
      'Sand Stream',
      'Snow Warning',
      'Prankster + Assist',
      'Prankster + Copycat',
      'Baton Pass'
    ]
  },
  {
    name: '[Gen 5] RU',
    mod: 'gen5',
    ruleset: [ '[Gen 5] UU', 'Baton Pass Clause', '!Sleep Clause Mod', 'Sleep Moves Clause' ],
    banlist: [ 'UU', 'RUBL', 'Shadow Tag', 'Shell Smash + Baton Pass' ],
    unbanlist: [ 'Prankster + Assist', 'Prankster + Copycat', 'Baton Pass' ]
  },
  {
    name: '[Gen 5] NU',
    mod: 'gen5',
    ruleset: [ '[Gen 5] RU', '!Sleep Moves Clause', 'Sleep Clause Mod' ],
    banlist: [ 'RU', 'NUBL', 'Assist', 'Copycat' ]
  },
  {
    name: '[Gen 5] LC',
    mod: 'gen5',
    ruleset: [ 'Standard', 'Little Cup', 'Sleep Moves Clause' ],
    banlist: [
      'Gligar',      'Meditite',
      'Misdreavus',  'Murkrow',
      'Scraggy',     'Scyther',
      'Sneasel',     'Tangela',
      'Vulpix',      'Yanma',
      'Sand Rush',   'Sand Veil',
      'Berry Juice', 'Soul Dew',
      'Baton Pass',  'Dragon Rage',
      'Sonic Boom',  'Swagger'
    ]
  },
  {
    name: '[Gen 5] Monotype',
    mod: 'gen5',
    ruleset: [ '[Gen 5] OU', 'Same Type Clause', '!Gems Clause' ],
    banlist: [ 'Latios' ],
    unbanlist: [ 'Cloyster' ]
  },
  {
    name: '[Gen 5] 1v1',
    mod: 'gen5',
    ruleset: [
      'Picked Team Size = 1',
      'Max Team Size = 3',
      'Standard',
      'Baton Pass Clause',
      'Swagger Clause',
      'Accuracy Moves Clause',
      'Sleep Moves Clause'
    ],
    banlist: [
      'Arceus',       'Blaziken',
      'Cottonee',     'Darkrai',
      'Deoxys',       'Dialga',
      'Dragonite',    'Giratina',
      'Groudon',      'Ho-Oh',
      'Jirachi',      'Kyogre',
      'Kyurem-Black', 'Kyurem-White',
      'Lugia',        'Mew',
      'Mewtwo',       'Palkia',
      'Rayquaza',     'Reshiram',
      'Shaymin-Sky',  'Thundurus-Incarnate',
      'Togekiss',     'Victini',
      'Whimsicott',   'Zekrom',
      'Focus Band',   'Focus Sash',
      'Quick Claw',   'Soul Dew',
      'Perish Song'
    ]
  },
  {
    name: '[Gen 5] ZU',
    mod: 'gen5',
    ruleset: [ '[Gen 5] PU' ],
    banlist: [
      'Audino',     'Banette',     'Beheeyem',   'Bronzor',
      'Dodrio',     'Duosion',     'Dwebble',    'Fraxure',
      'Gabite',     'Golduck',     'Huntail',    'Jumpluff',
      'Klang',      'Krokorok',    'Mantine',    'Maractus',
      'Mawile',     'Monferno',    'Murkrow',    'Natu',
      'Purugly',    'Rampardos',   'Rapidash',   'Relicanth',
      'Scraggy',    'Shiftry',     'Simisage',   'Sneasel',
      'Stoutland',  'Stunfisk',    'Swanna',     'Swoobat',
      'Tentacool',  'Torterra',    'Ursaring',   'Victreebel',
      'Vileplume',  'Volbeat',     'Zebstrika',  'Zweilous',
      'Articuno',   'Dragonair',   'Glalie',     'Machoke',
      'Marowak',    'Omanyte',     'Regigigas',  'Trubbish',
      'Whirlipede', "King's Rock", 'Quick Claw', 'Razor Fang',
      'Baton Pass'
    ],
    unbanlist: [ 'Damp Rock' ]
  },
  {
    name: '[Gen 5] CAP',
    mod: 'gen5',
    ruleset: [ '[Gen 5] OU', '+CAP' ],
    banlist: [ 'Cawmodore' ]
  },
  {
    name: '[Gen 5] GBU Singles',
    mod: 'gen5',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules' ],
    banlist: [ 'Dark Void', 'Sky Drop', 'Soul Dew' ]
  },
  {
    name: '[Gen 5] Custom Game',
    mod: 'gen5',
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 5] VGC 2013',
    mod: 'gen5',
    gameType: 'doubles',
    bestOfDefault: true,
    ruleset: [ 'Flat Rules' ],
    banlist: [ 'Chatot', 'Dark Void', 'Sky Drop', 'Soul Dew' ]
  },
  {
    name: '[Gen 5] Doubles Custom Game',
    mod: 'gen5',
    gameType: 'doubles',
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'Team Preview',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 5] Triples Custom Game',
    mod: 'gen5',
    gameType: 'triples',
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [ 'Team Preview', 'Cancel Mod' ]
  },
  { name: '[Gen 4] Ubers', mod: 'gen4', ruleset: [ 'Standard' ], banlist: [ 'AG' ] },
  {
    name: '[Gen 4] UU',
    mod: 'gen4',
    ruleset: [ '[Gen 4] OU', '!Baton Pass Stat Trap Clause', '!Freeze Clause Mod' ],
    banlist: [ 'OU', 'UUBL', 'Baton Pass' ],
    unbanlist: [ 'Arena Trap', 'Snow Cloak', 'Quick Claw', 'Swagger' ]
  },
  {
    name: '[Gen 4] NU',
    mod: 'gen4',
    ruleset: [ '[Gen 4] UU', 'Baton Pass Clause' ],
    banlist: [ 'UU', 'NUBL' ],
    unbanlist: [ 'Sand Veil', 'Baton Pass' ]
  },
  {
    name: '[Gen 4] PU',
    mod: 'gen4',
    ruleset: [ '[Gen 4] NU' ],
    banlist: [
      'Articuno',   'Cacturne',  'Charizard',
      'Cradily',    'Dodrio',    'Drifblim',
      'Dusclops',   'Electrode', 'Floatzel',
      'Gardevoir',  'Gligar',    'Golem',
      'Grumpig',    'Haunter',   'Hitmonchan',
      'Hypno',      'Jumpluff',  'Jynx',
      'Lickilicky', 'Linoone',   'Magmortar',
      'Magneton',   'Manectric', 'Medicham',
      'Meganium',   'Nidoqueen', 'Ninetales',
      'Piloswine',  'Poliwrath', 'Porygon2',
      'Regice',     'Regirock',  'Roselia',
      'Sandslash',  'Sharpedo',  'Shiftry',
      'Skuntank',   'Slowking',  'Tauros',
      'Typhlosion', 'Venomoth',  'Vileplume'
    ]
  },
  {
    name: '[Gen 4] LC',
    mod: 'gen4',
    ruleset: [ 'Standard', 'Little Cup', 'Sleep Moves Clause' ],
    banlist: [
      'Meditite',       'Misdreavus',
      'Murkrow',        'Scyther',
      'Sneasel',        'Tangela',
      'Yanma',          'Berry Juice',
      'Deep Sea Tooth', 'Dragon Rage',
      'Sonic Boom',     'Swagger'
    ]
  },
  {
    name: '[Gen 4] Anything Goes',
    mod: 'gen4',
    ruleset: [
      'Obtainable',
      'Arceus EV Limit',
      'Endless Battle Clause',
      'HP Percentage Mod',
      'Cancel Mod'
    ]
  },
  {
    name: '[Gen 4] 1v1',
    mod: 'gen4',
    ruleset: [
      'Picked Team Size = 1',
      'Max Team Size = 3',
      'Standard',
      'Accuracy Moves Clause',
      'Sleep Moves Clause',
      'Team Preview'
    ],
    banlist: [
      'Arceus',        'Clefable',      'Darkrai',
      'Deoxys-Attack', 'Deoxys-Normal', 'Deoxys-Defense',
      'Deoxys-Speed',  'Dialga',        'Garchomp',
      'Giratina',      'Groudon',       'Ho-Oh',
      'Jirachi',       'Kyogre',        'Latias',
      'Latios',        'Lugia',         'Machamp',
      'Manaphy',       'Mew',           'Mewtwo',
      'Palkia',        'Porygon-Z',     'Rayquaza',
      'Salamence',     'Shaymin',       'Shaymin-Sky',
      'Snorlax',       'Togekiss',      'Focus Band',
      'Focus Sash',    'Quick Claw',    'Soul Dew',
      'Destiny Bond',  'Explosion',     'Perish Song',
      'Self-Destruct'
    ]
  },
  { name: '[Gen 4] CAP', mod: 'gen4', ruleset: [ '[Gen 4] OU', '+CAP' ] },
  {
    name: '[Gen 4] Custom Game',
    mod: 'gen4',
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 4] VGC 2010',
    mod: 'gen4',
    gameType: 'doubles',
    ruleset: [ 'Flat Rules', 'Min Team Size = 4', 'Max Team Size = 4', 'Limit Two Restricted' ],
    restricted: [ 'Restricted Legendary' ],
    banlist: [ 'Soul Dew' ]
  },
  {
    name: '[Gen 4] Doubles Custom Game',
    mod: 'gen4',
    gameType: 'doubles',
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 3] UU',
    mod: 'gen3',
    ruleset: [ 'Standard' ],
    banlist: [ 'Uber', 'OU', 'UUBL', 'Smeargle + Ingrain', 'Arena Trap', 'Baton Pass', 'Swagger' ]
  },
  {
    name: '[Gen 3] RU',
    mod: 'gen3',
    ruleset: [ '[Gen 3] UU' ],
    banlist: [
      'Altaria',    'Ampharos',   'Arcanine',
      'Blastoise',  'Clefable',   'Cradily',
      'Electabuzz', 'Electrode',  'Fearow',
      'Feraligatr', 'Gligar',     'Golduck',
      'Golem',      'Gorebyss',   'Granbull',
      'Grumpig',    'Hitmonlee',  'Hitmontop',
      'Jumpluff',   'Kangaskhan', 'Lanturn',
      'Lunatone',   'Manectric',  'Misdreavus',
      'Muk',        'Nidoking',   'Nidoqueen',
      'Ninjask',    'Omastar',    'Pinsir',
      'Qwilfish',   'Sandslash',  'Scyther',
      'Slowking',   'Solrock',    'Tentacruel',
      'Vileplume',  'Walrein',    'Xatu'
    ]
  },
  {
    name: '[Gen 3] NU',
    mod: 'gen3',
    ruleset: [ 'Standard' ],
    banlist: [ 'Uber', 'OU', 'UUBL', 'UU', 'Smeargle + Ingrain' ]
  },
  {
    name: '[Gen 3] PU',
    mod: 'gen3',
    ruleset: [ 'Standard', 'Baton Pass Stat Clause' ],
    banlist: [
      'Uber', 'OU',
      'UUBL', 'UU',
      'NUBL', 'NU',
      'PUBL'
    ]
  },
  {
    name: '[Gen 3] LC',
    mod: 'gen3',
    ruleset: [ 'Standard', 'Little Cup', 'Sleep Moves Clause', 'Accuracy Moves Clause' ],
    banlist: [
      'Chansey',      'Meditite',
      'Omanyte',      'Porygon',
      'Scyther',      'Wynaut',
      'Zigzagoon',    'Deep Sea Tooth',
      'Baton Pass',   'Dragon Rage',
      'Sonic Boom',   'Swagger',
      'Thunder Wave'
    ]
  },
  {
    name: '[Gen 3] 1v1',
    mod: 'gen3',
    ruleset: [
      'Picked Team Size = 1',
      'Max Team Size = 3',
      'Standard',
      'Accuracy Moves Clause',
      'Sleep Moves Clause',
      'Team Preview'
    ],
    banlist: [
      'Clefable',      'Deoxys',
      'Deoxys-Attack', 'Deoxys-Defense',
      'Deoxys-Speed',  'Groudon',
      'Ho-Oh',         'Kyogre',
      'Latias',        'Latios',
      'Lugia',         'Mew',
      'Mewtwo',        'Rayquaza',
      'Slaking',       'Snorlax',
      'Suicune',       'Zapdos',
      'Destiny Bond',  'Explosion',
      'Perish Song',   'Self-Destruct',
      'Focus Band',    "King's Rock",
      'Quick Claw'
    ]
  },
  {
    name: '[Gen 3] ZU',
    mod: 'gen3',
    ruleset: [ 'Standard', 'Sleep Moves Clause', 'Baton Pass Stat Trap Clause', 'Swagger Clause' ],
    banlist: [
      'Uber',
      'OU',
      'UUBL',
      'UU',
      'NUBL',
      'NU',
      'PUBL',
      'PU',
      'ZUBL',
      'Baton Pass + Substitute'
    ]
  },
  {
    name: '[Gen 3] Custom Game',
    mod: 'gen3',
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'HP Percentage Mod',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  {
    name: '[Gen 3] Doubles Custom Game',
    mod: 'gen3',
    gameType: 'doubles',
    debug: true,
    ruleset: [
      'HP Percentage Mod',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  { name: '[Gen 2] Ubers', mod: 'gen2', ruleset: [ 'Standard' ] },
  {
    name: '[Gen 2] UU',
    mod: 'gen2',
    ruleset: [ '[Gen 2] OU' ],
    banlist: [ 'OU', 'UUBL', 'Agility + Baton Pass' ],
    unbanlist: [ 'Mean Look + Baton Pass', 'Spider Web + Baton Pass' ]
  },
  {
    name: '[Gen 2] NU',
    mod: 'gen2',
    ruleset: [ '[Gen 2] UU' ],
    banlist: [ 'UU', 'NUBL', 'Swagger' ],
    unbanlist: [ 'Agility + Baton Pass' ]
  },
  {
    name: '[Gen 2] PU',
    mod: 'gen2',
    ruleset: [ '[Gen 2] NU' ],
    banlist: [ 'NU', 'PUBL' ],
    unbanlist: [ 'Swagger' ]
  },
  {
    name: '[Gen 2] 1v1',
    mod: 'gen2',
    ruleset: [
      'Picked Team Size = 1',
      'Max Team Size = 3',
      'Standard',
      'Accuracy Moves Clause',
      'Sleep Moves Clause',
      'Team Preview'
    ],
    banlist: [
      'Alakazam',      'Celebi',
      'Clefable',      'Ho-Oh',
      'Lugia',         'Mew',
      'Mewtwo',        'Snorlax',
      'Zapdos',        'Berserk Gene',
      'Focus Band',    "King's Rock",
      'Quick Claw',    'Attract',
      'Destiny Bond',  'Explosion',
      'Perish Song',   'Present',
      'Self-Destruct', 'Swagger'
    ]
  },
  { name: '[Gen 2] ZU', mod: 'gen2', ruleset: [ '[Gen 2] PU' ], banlist: [ 'PU', 'ZUBL' ] },
  {
    name: '[Gen 2] Custom Game',
    mod: 'gen2',
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'HP Percentage Mod',
      'Cancel Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  },
  { name: '[Gen 1] Ubers', mod: 'gen1', ruleset: [ 'Standard' ] },
  {
    name: '[Gen 1] UU',
    mod: 'gen1',
    ruleset: [ '[Gen 1] OU', 'APT Clause' ],
    banlist: [ 'OU', 'UUBL' ]
  },
  {
    name: '[Gen 1] NU',
    mod: 'gen1',
    ruleset: [ '[Gen 1] UU', '!APT Clause' ],
    banlist: [ 'UU', 'NUBL' ]
  },
  { name: '[Gen 1] PU', mod: 'gen1', ruleset: [ '[Gen 1] NU' ], banlist: [ 'NU', 'PUBL' ] },
  {
    name: '[Gen 1] 1v1',
    mod: 'gen1',
    ruleset: [
      'Picked Team Size = 1',
      'Max Team Size = 3',
      'Standard',
      'Accuracy Moves Clause',
      'Sleep Moves Clause',
      'Team Preview'
    ],
    banlist: [ 'Mew', 'Mewtwo', 'Bind', 'Clamp', 'Explosion', 'Fire Spin', 'Self-Destruct', 'Wrap' ]
  },
  { name: '[Gen 1] ZU', mod: 'gen1', ruleset: [ '[Gen 1] PU' ], banlist: [ 'PU', 'ZUBL' ] },
  {
    name: '[Gen 1] Tradebacks OU',
    mod: 'gen1',
    ruleset: [ '[Gen 1] OU', 'Allow Tradeback' ]
  },
  {
    name: '[Gen 1] Custom Game',
    mod: 'gen1',
    debug: true,
    battle: { trunc: Math.trunc },
    ruleset: [
      'HP Percentage Mod',
      'Cancel Mod',
      'Desync Clause Mod',
      'Max Team Size = 24',
      'Max Move Count = 24',
      'Max Level = 9999',
      'Default Level = 100'
    ]
  }
];
