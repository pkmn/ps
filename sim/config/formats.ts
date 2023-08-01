export const Formats: FormatList = [
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
      'Sleep Clause Mod'
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
      'Sleep Clause Mod'
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
      'Sleep Clause Mod'
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
      'Sleep Clause Mod'
    ]
  },
  {
    name: '[Gen 9] OU',
    mod: 'gen9',
    ruleset: [ 'Standard' ],
    banlist: [
      'Uber',       'AG',
      'Arena Trap', 'Moody',
      'Sand Veil',  'Shadow Tag',
      'Snow Cloak', "King's Rock",
      'Baton Pass', 'Last Respects',
      'Shed Tail'
    ]
  },
  {
    name: '[Gen 9] Ubers',
    mod: 'gen9',
    ruleset: [ 'Standard' ],
    banlist: [ 'AG', 'Moody', "King's Rock", 'Baton Pass' ]
  },
  { name: '[Gen 9] UU', mod: 'gen9', ruleset: [ '[Gen 9] OU' ], banlist: [ 'OU', 'UUBL' ] },
  {
    name: '[Gen 9] RU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] UU' ],
    banlist: [ 'UU', 'RUBL', 'Light Clay' ]
  },
  { name: '[Gen 9] NU', mod: 'gen9', ruleset: [ '[Gen 9] RU' ], banlist: [ 'RU', 'NUBL' ] },
  { name: '[Gen 9] PU', mod: 'gen9', ruleset: [ '[Gen 9] NU' ], banlist: [ 'NU', 'PUBL' ] },
  {
    name: '[Gen 9] LC',
    mod: 'gen9',
    ruleset: [ 'Little Cup', 'Standard' ],
    banlist: [
      'Basculin-White-Striped', 'Diglett-Base',
      'Dunsparce',              'Flittle',
      'Gastly',                 'Girafarig',
      'Growlithe-Hisui',        'Meditite',
      'Misdreavus',             'Murkrow',
      'Qwilfish-Hisui',         'Rufflet',
      'Scyther',                'Sneasel',
      'Sneasel-Hisui',          'Stantler',
      'Moody',                  'Baton Pass',
      'Sticky Web',             'Tinkatink + Knock Off'
    ]
  },
  {
    name: '[Gen 9] Monotype',
    mod: 'gen9',
    ruleset: [ 'Standard', 'Evasion Abilities Clause', 'Same Type Clause', 'Terastal Clause' ],
    banlist: [
      'Annihilape',        'Arceus',
      'Calyrex-Ice',       'Calyrex-Shadow',
      'Chi-Yu',            'Dialga',
      'Dialga-Origin',     'Eternatus',
      'Giratina',          'Giratina-Origin',
      'Groudon',           'Iron Bundle',
      'Koraidon',          'Kyogre',
      'Magearna',          'Mewtwo',
      'Miraidon',          'Palafin',
      'Palkia',            'Palkia-Origin',
      'Rayquaza',          'Urshifu-Base',
      'Zacian',            'Zacian-Crowned',
      'Zamazenta-Crowned', 'Moody',
      'Shadow Tag',        'Booster Energy',
      'Damp Rock',         'Focus Band',
      "King's Rock",       'Quick Claw',
      'Acupressure',       'Baton Pass',
      'Last Respects'
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
      'Arceus',            'Calyrex-Ice',
      'Calyrex-Shadow',    'Chi-Yu',
      'Cinderace',         'Dialga',
      'Dialga-Origin',     'Dragonite',
      'Eternatus',         'Flutter Mane',
      'Gholdengo',         'Giratina',
      'Giratina-Origin',   'Groudon',
      'Hoopa-Unbound',     'Koraidon',
      'Kyogre',            'Magearna',
      'Meloetta',          'Mew',
      'Mewtwo',            'Mimikyu',
      'Miraidon',          'Palkia',
      'Palkia-Origin',     'Rayquaza',
      'Scream Tail',       'Zacian',
      'Zacian-Crowned',    'Zamazenta',
      'Zamazenta-Crowned', 'Moody',
      'Focus Band',        'Focus Sash',
      "King's Rock",       'Quick Claw',
      'Acupressure',       'Perish Song'
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
    name: '[Gen 9] ZU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] PU' ],
    banlist: [
      'PU',
      'Basculin-White-Striped',
      'Beartic',
      'Electrode',
      'Fraxure',
      'Frogadier',
      'Girafarig',
      'Grumpig',
      'Leafeon',
      'Qwilfish-Hisui',
      'Sneasel-Hisui',
      'Vigoroth'
    ]
  },
  {
    name: '[Gen 9] LC UU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] LC' ],
    banlist: [
      'Crabrawler',    'Diglett-Alola',
      'Drifloon',      'Foongus',
      'Glimmet',       'Gothita',
      'Grimer-Alola',  'Grookey',
      'Larvesta',      'Magnemite',
      'Mareanie',      'Meowth-Base',
      'Mudbray',       'Numel',
      'Nymble',        'Pawniard',
      'Quaxly',        'Shellder',
      'Shellos',       'Shroodle',
      'Stunky',        'Surskit',
      'Tinkatink',     'Toedscool',
      'Voltorb-Hisui', 'Wattrel',
      'Wingull',       'Zorua-Hisui'
    ]
  },
  {
    name: '[Gen 9] CAP',
    mod: 'gen9',
    ruleset: [ '[Gen 9] OU', '+CAP' ],
    banlist: [ 'Crucibellite' ]
  },
  {
    name: '[Gen 9] Free-For-All',
    mod: 'gen9',
    gameType: 'freeforall',
    ruleset: [ 'Standard', '!Evasion Items Clause' ],
    banlist: [
      'Annihilape',     'Arceus',          'Calyrex-Ice',
      'Calyrex-Shadow', 'Chi-Yu',          'Dialga',
      'Dialga-Origin',  'Eternatus',       'Flutter Mane',
      'Giratina',       'Giratina-Origin', 'Groudon',
      'Hoopa-Unbound',  'Iron Bundle',     'Koraidon',
      'Kyogre',         'Landorus-Base',   'Magearna',
      'Mewtwo',         'Miraidon',        'Palafin',
      'Palkia',         'Palkia-Origin',   'Rayquaza',
      'Spectrier',      'Ursaluna',        'Urshifu-Base',
      'Zacian',         'Zacian-Crowned',  'Moody',
      'Shadow Tag',     'Toxic Debris',    'Acupressure',
      'Aromatic Mist',  'Baton Pass',      'Court Change',
      'Final Gambit',   'Flatter',         'Follow Me',
      'Heal Pulse',     'Last Respects',   'Poison Fang',
      'Rage Powder',    'Spicy Extract',   'Swagger',
      'Toxic',          'Toxic Spikes'
    ]
  },
  {
    name: '[Gen 9] Battle Stadium Singles Regulation C',
    mod: 'gen9',
    ruleset: [
      'Flat Rules',
      '!! Adjust Level = 50',
      'Paldea Pokedex',
      'Min Source Gen = 9',
      'VGC Timer'
    ]
  },
  {
    name: '[Gen 9] Battle Stadium Singles Regulation D',
    mod: 'gen9',
    ruleset: [ 'Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer' ],
    banlist: [ 'Walking Wake', 'Iron Leaves' ]
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
    ruleset: [ 'PotD', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod' ]
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
    ruleset: [ '[Gen 9] Doubles OU' ],
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
      'Murkrow',
      'Qwilfish-Hisui',
      'Scyther',
      'Sneasel',
      'Sneasel-Hisui',
      'Tinkatink + Knock Off'
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
      'Arceus',          'Calyrex-Ice',
      'Calyrex-Shadow',  'Chi-Yu',
      'Dialga',          'Dialga-Origin',
      'Eternatus',       'Giratina',
      'Giratina-Origin', 'Groudon',
      'Iron Hands',      'Koraidon',
      'Kyogre',          'Magearna',
      'Mewtwo',          'Miraidon',
      'Palkia',          'Palkia-Origin',
      'Rayquaza',        'Tornadus',
      'Urshifu',         'Urshifu-Rapid-Strike',
      'Zacian',          'Zacian-Crowned',
      'Zamazenta',       'Zamazenta-Crowned',
      'Commander',       'Moody',
      'Focus Sash',      "King's Rock",
      'Ally Switch',     'Final Gambit',
      'Perish Song',     'Swagger'
    ]
  },
  {
    name: '[Gen 9] VGC 2023 Regulation C',
    mod: 'gen9',
    gameType: 'doubles',
    ruleset: [
      'Flat Rules',
      '!! Adjust Level = 50',
      'Paldea Pokedex',
      'Min Source Gen = 9',
      'VGC Timer',
      'Open Team Sheets'
    ]
  },
  {
    name: '[Gen 9] VGC 2023 Regulation D',
    mod: 'gen9',
    gameType: 'doubles',
    ruleset: [
      'Flat Rules',
      '!! Adjust Level = 50',
      'Min Source Gen = 9',
      'VGC Timer',
      'Open Team Sheets'
    ],
    banlist: [ 'Walking Wake', 'Iron Leaves' ]
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
    ruleset: [ '[Gen 9] National Dex' ],
    banlist: [ 'ND OU', 'ND UUBL', 'Battle Bond', 'Drizzle', 'Drought' ]
  },
  {
    name: '[Gen 9] National Dex RU',
    mod: 'gen9',
    ruleset: [ '[Gen 9] National Dex UU' ],
    banlist: [ 'ND UU', 'ND RUBL', 'Heat Rock', 'Light Clay' ]
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
      'Annihilape',         'Arceus',            'Blastoise-Mega',
      'Blaziken',           'Blaziken-Mega',     'Calyrex-Ice',
      'Calyrex-Shadow',     'Chi-Yu',            'Chien-Pao',
      'Darkrai',            'Deoxys-Base',       'Deoxys-Attack',
      'Dialga',             'Dracovish',         'Dragapult',
      'Espathra',           'Eternatus',         'Flutter Mane',
      'Genesect',           'Gengar-Mega',       'Giratina',
      'Giratina-Origin',    'Groudon',           'Ho-Oh',
      'Hoopa-Unbound',      'Iron Bundle',       'Kangaskhan-Mega',
      'Kartana',            'Kingambit',         'Koraidon',
      'Kyogre',             'Kyurem-Black',      'Kyurem-White',
      'Lucario-Mega',       'Lugia',             'Lunala',
      'Magearna',           'Marshadow',         'Mawile-Mega',
      'Medicham-Mega',      'Metagross-Mega',    'Mewtwo',
      'Miraidon',           'Naganadel',         'Necrozma-Dawn-Wings',
      'Necrozma-Dusk-Mane', 'Palafin',           'Palkia',
      'Pheromosa',          'Rayquaza',          'Reshiram',
      'Salamence-Mega',     'Shaymin-Sky',       'Solgaleo',
      'Spectrier',          'Urshifu-Base',      'Xerneas',
      'Yveltal',            'Zacian',            'Zacian-Crowned',
      'Zamazenta',          'Zamazenta-Crowned', 'Zekrom',
      'Zygarde-Base',       'Zygarde-Complete',  'Moody',
      'Shadow Tag',         'Power Construct',   'Booster Energy',
      'Damp Rock',          'Focus Band',        'Icy Rock',
      "King's Rock",        'Leppa Berry',       'Quick Claw',
      'Razor Fang',         'Smooth Rock',       'Terrain Extender',
      'Acupressure',        'Baton Pass',        'Last Respects'
    ]
  },
  { name: '[Gen 9] National Dex AG', mod: 'gen9', ruleset: [ 'Standard NatDex' ] },
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
      'Swagger'
    ]
  },
  {
    name: '[Gen 8] JolteMons Random Battle',
    mod: 'gen8joltemons',
    team: 'random',
    ruleset: [
      'Dynamax Clause',
      'Obtainable',
      'Species Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod',
      'Mega Data Mod',
      'Z-Move Clause'
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
      'Calyrex-Shadow',   'Groudon-Primal',   'Rayquaza-Mega',
      'Regigigas',        'Shedinja',         'Slaking',
      'Arena Trap',       'Comatose',         'Contrary',
      'Gorilla Tactics',  'Hadron Engine',    'Huge Power',
      'Illusion',         'Innards Out',      'Magnet Pull',
      'Moody',            'Neutralizing Gas', 'Orichalcum Pulse',
      'Parental Bond',    'Poison Heal',      'Pure Power',
      'Shadow Tag',       'Stakeout',         'Water Bubble',
      'Wonder Guard',     'Baton Pass',       'Belly Drum',
      'Ceaseless Edge',   'Dire Claw',        'Imprison',
      'Last Respects',    'Quiver Dance',     'Rage Fist',
      'Revival Blessing', 'Shed Tail',        'Substitute',
      'Shell Smash'
    ]
  },
  {
    name: '[Gen 9] Pre-Full Dex BH',
    mod: 'gen9',
    ruleset: [
      '-Nonexistent',
      'OHKO Clause',
      'Evasion Clause',
      'Species Clause',
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Moves Clause',
      'Endless Battle Clause',
      'Terastal Clause'
    ],
    banlist: [
      'Calyrex-Shadow',   'Slaking',
      'Zacian-Crowned',   'Arena Trap',
      'Comatose',         'Contrary',
      'Hadron Engine',    'Huge Power',
      'Illusion',         'Innards Out',
      'Magnet Pull',      'Moody',
      'Neutralizing Gas', 'Orichalcum Pulse',
      'Parental Bond',    'Poison Heal',
      'Pure Power',       'Shadow Tag',
      'Stakeout',         'Water Bubble',
      'Wonder Guard',     'Baton Pass',
      'Belly Drum',       'Ceaseless Edge',
      'Imprison',         'Last Respects',
      'Quiver Dance',     'Rage Fist',
      'Revival Blessing', 'Shed Tail',
      'Substitute',       'Shell Smash'
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
    name: '[Gen 9] Monotype Random Battle',
    mod: 'gen9',
    team: 'random',
    ruleset: [
      'Obtainable',
      'Same Type Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod'
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
      'Sleep Clause Mod'
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
      'Xerneas-Base'
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
      'Sleep Clause Mod'
    ]
  },
  {
    name: '[Gen 8] Random Doubles Battle',
    mod: 'gen8',
    gameType: 'doubles',
    team: 'random',
    ruleset: [ 'PotD', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod' ]
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
      'Sleep Clause Mod'
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
      'Sleep Clause Mod'
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
    name: '[Gen 8 BDSP] Random Battle',
    mod: 'gen8bdsp',
    team: 'random',
    ruleset: [ '[Gen 8] Random Battle', '!PotD' ]
  },
  {
    name: '[Gen 7] Random Battle',
    mod: 'gen7',
    team: 'random',
    ruleset: [ 'Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod' ]
  },
  {
    name: '[Gen 7] Random Doubles Battle',
    mod: 'gen7',
    gameType: 'doubles',
    team: 'random',
    ruleset: [ 'Obtainable', 'HP Percentage Mod', 'Cancel Mod' ]
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
    name: "[Gen 7 Let's Go] Random Battle",
    mod: 'gen7letsgo',
    team: 'random',
    ruleset: [ 'Obtainable', 'Allow AVs', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod' ]
  },
  {
    name: '[Gen 6] Random Battle',
    mod: 'gen6',
    team: 'random',
    ruleset: [ 'Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod' ]
  },
  {
    name: '[Gen 5] Random Battle',
    mod: 'gen5',
    team: 'random',
    ruleset: [ 'Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod' ]
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
    banlist: [ 'Wobbuffet + Leftovers' ]
  },
  {
    name: '[Gen 3] LC',
    mod: 'gen3',
    ruleset: [ 'Standard', 'Little Cup', 'Sleep Moves Clause' ],
    banlist: [
      'Chansey',
      'Meditite',
      'Omanyte',
      'Scyther',
      'Wynaut',
      'Zigzagoon',
      'Baton Pass',
      'Dragon Rage',
      'Sonic Boom'
    ]
  },
  {
    name: "[Gen 7 Let's Go] OU",
    mod: 'gen7letsgo',
    ruleset: [
      'Adjust Level = 50',
      'Obtainable',
      'Species Clause',
      'Nickname Clause',
      'OHKO Clause',
      'Evasion Moves Clause',
      'Team Preview',
      'HP Percentage Mod',
      'Cancel Mod',
      'Sleep Clause Mod'
    ],
    banlist: [ 'Uber' ]
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
      'Assist'
    ]
  },
  {
    name: '[Gen 4] OU',
    mod: 'gen4',
    ruleset: [ 'Standard', 'Freeze Clause Mod' ],
    banlist: [
      'AG',
      'Uber',
      'Arena Trap',
      'Sand Veil',
      'Swinub + Snow Cloak',
      'Piloswine + Snow Cloak',
      'Mamoswine + Snow Cloak',
      'Quick Claw',
      'Soul Dew',
      'Baton Pass',
      'Swagger'
    ]
  },
  {
    name: '[Gen 3] OU',
    mod: 'gen3',
    ruleset: [ 'Standard', 'One Boost Passer Clause', 'Freeze Clause Mod' ],
    banlist: [
      'Uber',
      'Sand Veil',
      'Soundproof',
      'Assist',
      'Baton Pass + Block',
      'Baton Pass + Mean Look',
      'Baton Pass + Spider Web',
      'Smeargle + Ingrain'
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
    ruleset: [ 'Standard' ],
    banlist: [ 'AG', 'Uber', 'Soul Dew', 'Dark Void', 'Sand Veil' ],
    unbanlist: [ 'Latios', 'Manaphy', 'Mew', 'Salamence', 'Wobbuffet', 'Wynaut' ]
  },
  {
    name: '[Gen 3] Doubles OU',
    mod: 'gen3',
    gameType: 'doubles',
    ruleset: [ 'Standard', '!Switch Priority Clause Mod' ],
    banlist: [ 'Uber', 'Soul Dew', 'Swagger' ],
    unbanlist: [ 'Latias', 'Wobbuffet', 'Wynaut' ]
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
      'Corsola-Galar', 'Cutiefly',
      'Drifloon',      'Gastly',
      'Gothita',       'Magby',
      'Rufflet',       'Scraggy',
      'Scyther',       'Sneasel',
      'Swirlix',       'Tangela',
      'Vullaby',       'Vulpix-Alola',
      'Woobat',        'Zigzagoon-Base',
      'Chlorophyll',   'Moody',
      'Baton Pass',    'Sticky Web'
    ]
  },
  {
    name: '[Gen 8] Monotype',
    mod: 'gen8',
    ruleset: [ 'Same Type Clause', 'Standard', 'Dynamax Clause' ],
    banlist: [
      'Blaziken',        'Calyrex-Ice',         'Calyrex-Shadow',
      'Dialga',          'Dracovish',           'Eternatus',
      'Genesect',        'Giratina',            'Giratina-Origin',
      'Groudon',         'Ho-Oh',               'Kartana',
      'Kyogre',          'Kyurem-Black',        'Kyurem-White',
      'Landorus-Base',   'Lugia',               'Lunala',
      'Magearna',        'Marshadow',           'Mewtwo',
      'Naganadel',       'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
      'Palkia',          'Pheromosa',           'Rayquaza',
      'Reshiram',        'Solgaleo',            'Urshifu-Base',
      'Xerneas',         'Yveltal',             'Zacian',
      'Zacian-Crowned',  'Zamazenta',           'Zamazenta-Crowned',
      'Zekrom',          'Zygarde-Base',        'Moody',
      'Power Construct', 'Shadow Tag',          'Damp Rock',
      'Focus Band',      "King's Rock",         'Quick Claw',
      'Smooth Rock',     'Terrain Extender',    'Acupressure',
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
    banlist: [
      'PU',              'Arctovish',
      'Aurorus',         'Basculin',
      'Centiskorch',     'Drampa',
      'Exeggutor-Alola', 'Gallade',
      'Glastrier',       'Haunter',
      'Magmortar',       'Magneton',
      'Malamar',         'Ninjask',
      'Omastar',         'Perrserker',
      'Rotom-Frost',     'Turtonator',
      'Vanilluxe',       'Vikavolt',
      'Silvally-Dragon', 'Silvally-Ground',
      'Sneasel',         'Damp Rock',
      'Grassy Seed'
    ]
  },
  {
    name: '[Gen 8] CAP',
    mod: 'gen8',
    ruleset: [ '[Gen 8] OU', '+CAP' ],
    banlist: [ 'Crucibellite' ]
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
    name: '[Gen 8] National Dex UU',
    mod: 'gen8',
    ruleset: [ '[Gen 8] National Dex' ],
    banlist: [ 'ND OU', 'ND UUBL', 'Drizzle', 'Drought', 'Light Clay', 'Slowbronite' ]
  },
  {
    name: '[Gen 8] Battle Stadium Singles',
    mod: 'gen8',
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
    name: '[Gen 8 BDSP] OU',
    mod: 'gen8bdsp',
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
    ruleset: [ 'Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 8', 'VGC Timer' ]
  },
  {
    name: '[Gen 8] VGC 2020',
    mod: 'gen8dlc1',
    gameType: 'doubles',
    ruleset: [ 'Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 8', 'VGC Timer' ]
  },
  {
    name: '[Gen 8 BDSP] Doubles OU',
    mod: 'gen8bdsp',
    gameType: 'doubles',
    ruleset: [ 'Standard Doubles' ],
    banlist: [ 'DUber', 'Dark Void' ]
  },
  {
    name: '[Gen 8 BDSP] Battle Festival Doubles',
    mod: 'gen8bdsp',
    gameType: 'doubles',
    ruleset: [ 'Flat Rules', 'Min Source Gen = 8' ]
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
    ruleset: [ 'Same Type Clause', 'Standard', 'Swagger Clause' ],
    banlist: [
      'Aegislash',     'Arceus',              'Blaziken',
      'Darkrai',       'Deoxys-Base',         'Deoxys-Attack',
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
      'Deoxys-Base',         'Deoxys-Attack',
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
  {
    name: '[Gen 7] ZU',
    mod: 'gen7',
    ruleset: [ '[Gen 7] PU' ],
    banlist: [
      'PU',             'Carracosta',
      'Crabominable',   'Exeggutor-Base',
      'Gorebyss',       'Jynx',
      'Raticate-Alola', 'Shiftry',
      'Throh',          'Turtonator',
      'Type: Null',     'Ursaring',
      'Victreebel'
    ]
  },
  { name: '[Gen 7] CAP', mod: 'gen7', ruleset: [ '[Gen 7] OU', '+CAP' ] },
  {
    name: '[Gen 7] Battle Spot Singles',
    mod: 'gen7',
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
    timer: {
      starting: 300,
      addPerTurn: 0,
      maxPerTurn: 55,
      maxFirstTurn: 90,
      grace: 90,
      timeoutAutoChoose: true,
      dcTimerBank: false
    },
    ruleset: [ 'Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 7' ],
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
    name: '[Gen 7] VGC 2017',
    mod: 'gen7sm',
    gameType: 'doubles',
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
  },
  {
    name: '[Gen 7] Battle Spot Doubles',
    mod: 'gen7',
    gameType: 'doubles',
    ruleset: [ 'Flat Rules', 'Min Source Gen = 6' ],
    banlist: [ 'Battle Bond' ]
  },
  {
    name: "[Gen 7 Let's Go] Doubles OU",
    mod: 'gen7letsgo',
    gameType: 'doubles',
    ruleset: [ 'Standard Doubles', 'Sleep Clause Mod' ],
    banlist: [ 'Mewtwo' ]
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
    ruleset: [ 'Standard', 'Swagger Clause', 'Same Type Clause' ],
    banlist: [
      'Aegislash',       'Altaria-Mega',  'Arceus',
      'Blaziken',        'Darkrai',       'Deoxys-Base',
      'Deoxys-Attack',   'Deoxys-Speed',  'Dialga',
      'Genesect',        'Gengar-Mega',   'Giratina',
      'Giratina-Origin', 'Greninja',      'Groudon',
      'Ho-Oh',           'Hoopa-Unbound', 'Kangaskhan-Mega',
      'Kyogre',          'Kyurem-White',  'Lucario-Mega',
      'Lugia',           'Mawile-Mega',   'Medicham-Mega',
      'Metagross-Mega',  'Mewtwo',        'Palkia',
      'Rayquaza',        'Reshiram',      'Sableye-Mega',
      'Salamence-Mega',  'Shaymin-Sky',   'Slowbro-Mega',
      'Talonflame',      'Xerneas',       'Yveltal',
      'Zekrom',          'Shadow Tag',    'Damp Rock',
      'Focus Band',      "King's Rock",   'Quick Claw',
      'Razor Fang',      'Smooth Rock',   'Soul Dew',
      'Baton Pass'
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
      'Arceus',           'Blaziken',
      'Charizard-Mega-Y', 'Darkrai',
      'Deoxys-Base',      'Deoxys-Attack',
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
      'Grass Whistle',    'Hypnosis',
      'Perish Song',      'Sing',
      'Sleep Powder',     'Yawn'
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
  {
    name: '[Gen 6] ZU',
    mod: 'gen6',
    ruleset: [ '[Gen 6] PU' ],
    banlist: [ 'PU', 'Fraxure', 'Purugly', 'Regigigas', 'Simisear' ]
  },
  {
    name: '[Gen 6] CAP',
    mod: 'gen6',
    ruleset: [ '[Gen 6] OU', '+CAP' ],
    banlist: [ 'Cawmodore' ]
  },
  {
    name: '[Gen 6] Battle Spot Singles',
    mod: 'gen6',
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
    ruleset: [ 'Flat Rules', 'Min Source Gen = 6', 'Limit Two Restricted' ],
    restricted: [ 'Restricted Legendary' ],
    banlist: [ 'Soul Dew' ]
  },
  {
    name: '[Gen 6] VGC 2015',
    mod: 'gen6',
    gameType: 'doubles',
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
    name: '[Gen 6] VGC 2014',
    mod: 'gen6xy',
    gameType: 'doubles',
    ruleset: [ 'Flat Rules', 'Kalos Pokedex', 'Min Source Gen = 6' ]
  },
  {
    name: '[Gen 6] Battle Spot Doubles',
    mod: 'gen6',
    gameType: 'doubles',
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
    name: '[Gen 5] PU',
    mod: 'gen5',
    ruleset: [ '[Gen 5] NU', 'Sleep Moves Clause' ],
    banlist: [ 'NU', 'PUBL', 'Damp Rock' ]
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
    banlist: [ 'Latios' ]
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
      'Uber',         'Cottonee',
      'Dragonite',    'Jirachi',
      'Kyurem-Black', 'Mew',
      'Togekiss',     'Whimsicott',
      'Victini',      'Focus Band',
      'Focus Sash',   'Quick Claw',
      'Soul Dew',     'Perish Song'
    ],
    unbanlist: [ 'Genesect', 'Landorus', 'Manaphy', 'Thundurus', 'Tornadus-Therian' ]
  },
  {
    name: '[Gen 5] ZU',
    mod: 'gen5',
    ruleset: [ '[Gen 5] PU' ],
    banlist: [
      'PU',         'Articuno',
      'Dragonair',  'Glalie',
      'Machoke',    'Marowak',
      'Omanyte',    'Regigigas',
      'Trubbish',   'Whirlipede',
      'Baton Pass'
    ],
    unbanlist: [ 'Damp Rock' ]
  },
  {
    name: '[Gen 5] CAP',
    mod: 'gen5',
    ruleset: [ '[Gen 5] OU', '+CAP' ],
    banlist: [ 'Aurumoth', 'Cawmodore' ]
  },
  {
    name: '[Gen 5] GBU Singles',
    mod: 'gen5',
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
    ruleset: [ 'Flat Rules' ],
    banlist: [ 'Chatot', 'Dark Void', 'Sky Drop', 'Soul Dew' ]
  },
  {
    name: '[Gen 5] VGC 2012',
    mod: 'gen5bw1',
    gameType: 'doubles',
    ruleset: [ 'Flat Rules' ],
    banlist: [ 'Dark Void', 'Sky Drop' ]
  },
  {
    name: '[Gen 5] VGC 2011',
    mod: 'gen5bw1',
    gameType: 'doubles',
    ruleset: [ 'Flat Rules', 'Old Unova Pokedex' ],
    banlist: [
      'Sky Drop',
      'Belue Berry',
      'Durin Berry',
      'Nomel Berry',
      'Rabuta Berry',
      'Spelon Berry',
      'Watmel Berry'
    ]
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
    ruleset: [ '[Gen 4] OU', '!Freeze Clause Mod' ],
    banlist: [ 'OU', 'UUBL' ],
    unbanlist: [ 'Arena Trap', 'Quick Claw', 'Swagger' ]
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
      '[Gen 4] OU',
      'Accuracy Moves Clause',
      'Sleep Moves Clause',
      'Team Preview',
      '!Freeze Clause Mod'
    ],
    banlist: [
      'Latias',        'Machamp',
      'Porygon-Z',     'Shaymin',
      'Snorlax',       'Togekiss',
      'Focus Sash',    'Destiny Bond',
      'Explosion',     'Perish Song',
      'Self-Destruct'
    ],
    unbanlist: [ 'Wobbuffet', 'Wynaut', 'Sand Veil', 'Swagger' ]
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
    ruleset: [ 'Flat Rules', 'Max Team Size = 4', 'Limit Two Restricted' ],
    restricted: [ 'Restricted Legendary' ],
    banlist: [ 'Soul Dew' ]
  },
  {
    name: '[Gen 4] VGC 2009',
    mod: 'gen4pt',
    gameType: 'doubles',
    ruleset: [ 'Flat Rules', '! Adjust Level Down', 'Max Level = 50', 'Max Team Size = 4' ],
    banlist: [ 'Tyranitar', 'Rotom', 'Judgment', 'Soul Dew' ]
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
    name: '[Gen 3] NU',
    mod: 'gen3',
    ruleset: [ 'Standard' ],
    banlist: [ 'Uber', 'OU', 'UUBL', 'UU', 'Smeargle + Ingrain' ]
  },
  {
    name: '[Gen 3] PU',
    mod: 'gen3',
    ruleset: [ 'Standard', 'Baton Pass Clause' ],
    banlist: [
      'Uber', 'OU',
      'UUBL', 'UU',
      'NUBL', 'NU',
      'PUBL'
    ]
  },
  {
    name: '[Gen 3] 1v1',
    mod: 'gen3',
    ruleset: [
      'Picked Team Size = 1',
      'Max Team Size = 3',
      '[Gen 3] OU',
      'Accuracy Moves Clause',
      'Sleep Moves Clause',
      'Team Preview',
      '!Freeze Clause Mod'
    ],
    banlist: [
      'Clefable',    'Slaking',
      'Snorlax',     'Suicune',
      'Zapdos',      'Destiny Bond',
      'Explosion',   'Ingrain',
      'Perish Song', 'Self-Destruct',
      'Focus Band',  "King's Rock",
      'Quick Claw'
    ],
    unbanlist: [ 'Mr. Mime', 'Wobbuffet', 'Wynaut', 'Sand Veil', 'Soundproof' ]
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
    banlist: [ 'UU', 'NUBL' ],
    unbanlist: [ 'Agility + Baton Pass' ]
  },
  {
    name: '[Gen 2] 1v1',
    mod: 'gen2',
    ruleset: [
      'Picked Team Size = 1',
      'Max Team Size = 3',
      '[Gen 2] OU',
      'Accuracy Moves Clause',
      'Sleep Moves Clause',
      'Team Preview'
    ],
    banlist: [
      'Alakazam',     'Clefable',
      'Snorlax',      'Zapdos',
      'Berserk Gene', 'Focus Band',
      "King's Rock",  'Quick Claw',
      'Attract',      'Destiny Bond',
      'Explosion',    'Perish Song',
      'Present',      'Self-Destruct',
      'Swagger'
    ]
  },
  {
    name: '[Gen 2] Nintendo Cup 2000',
    mod: 'gen2stadium2',
    ruleset: [
      'Picked Team Size = 3',
      'Min Level = 50',
      'Max Level = 55',
      'Max Total Level = 155',
      'Obtainable',
      'Stadium Sleep Clause',
      'Freeze Clause Mod',
      'Species Clause',
      'Item Clause',
      'Endless Battle Clause',
      'Cancel Mod',
      'Event Moves Clause',
      'Nickname Clause',
      'Team Preview',
      'Nintendo Cup 2000 Move Legality'
    ],
    banlist: [ 'Uber' ]
  },
  {
    name: '[Gen 2] Stadium OU',
    mod: 'gen2stadium2',
    ruleset: [ 'Standard' ],
    banlist: [ 'Uber' ]
  },
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
    ruleset: [ '[Gen 1] OU', 'APT Clause', 'Sleep Moves Clause' ],
    banlist: [ 'OU', 'UUBL' ]
  },
  {
    name: '[Gen 1] NU',
    mod: 'gen1',
    ruleset: [ '[Gen 1] UU', '!APT Clause', '!Sleep Moves Clause' ],
    banlist: [ 'UU', 'NUBL' ]
  },
  { name: '[Gen 1] PU', mod: 'gen1', ruleset: [ '[Gen 1] NU' ], banlist: [ 'NU', 'PUBL' ] },
  {
    name: '[Gen 1] 1v1',
    mod: 'gen1',
    ruleset: [
      'Picked Team Size = 1',
      'Max Team Size = 3',
      '[Gen 1] OU',
      'Accuracy Moves Clause',
      'Sleep Moves Clause',
      'Team Preview'
    ],
    banlist: [ 'Bind', 'Clamp', 'Explosion', 'Fire Spin', 'Self-Destruct', 'Wrap' ]
  },
  {
    name: '[Gen 1] Japanese OU',
    mod: 'gen1jpn',
    ruleset: [ 'Standard' ],
    banlist: [ 'Uber' ]
  },
  {
    name: '[Gen 1] Stadium OU',
    mod: 'gen1stadium',
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
    name: '[Gen 1] Tradebacks OU',
    mod: 'gen1',
    ruleset: [ '[Gen 1] OU', 'Allow Tradeback' ]
  },
  {
    name: '[Gen 1] Nintendo Cup 1997',
    mod: 'gen1jpn',
    ruleset: [
      'Picked Team Size = 3',
      'Min Level = 50',
      'Max Level = 55',
      'Max Total Level = 155',
      'Obtainable',
      'Team Preview',
      'Stadium Sleep Clause',
      'Species Clause',
      'Nickname Clause',
      'HP Percentage Mod',
      'Cancel Mod',
      'Nintendo Cup 1997 Move Legality'
    ],
    banlist: [ 'Uber' ]
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
