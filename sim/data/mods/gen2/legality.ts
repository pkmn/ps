export const Legality: {[k: string]: ModdedLearnsetData} = {
  bulbasaur: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'growl', 'ancientpower' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  venusaur: {
    eventData: [
      {
        generation: 2,
        level: 40,
        shiny: true,
        moves: [ 'poisonpowder', 'sleeppowder', 'razorleaf', 'sweetscent' ]
      }
    ]
  },
  charmander: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'growl', 'crunch' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  charizard: {
    eventData: [
      {
        generation: 2,
        level: 40,
        shiny: true,
        moves: [ 'rage', 'scaryface', 'flamethrower', 'wingattack' ]
      }
    ]
  },
  squirtle: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'tailwhip', 'zapcannon' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  blastoise: {
    eventData: [
      {
        generation: 2,
        level: 40,
        shiny: true,
        moves: [ 'watergun', 'bite', 'rapidspin', 'protect' ]
      }
    ]
  },
  caterpie: { encounters: [ { generation: 1, level: 3 }, { generation: 2, level: 3 } ] },
  metapod: {
    encounters: [
      { generation: 1, level: 4 },
      { generation: 2, level: 4 },
      { generation: 3, level: 4 }
    ]
  },
  butterfree: { encounters: [ { generation: 2, level: 7 } ] },
  weedle: { encounters: [ { generation: 1, level: 3 }, { generation: 2, level: 3 } ] },
  kakuna: { encounters: [ { generation: 1, level: 4 }, { generation: 2, level: 4 } ] },
  beedrill: { encounters: [ { generation: 2, level: 7 } ] },
  pidgey: { encounters: [ { generation: 1, level: 2 }, { generation: 2, level: 2 } ] },
  pidgeotto: { encounters: [ { generation: 1, level: 9 }, { generation: 2, level: 7 } ] },
  rattata: { encounters: [ { generation: 1, level: 2 }, { generation: 2, level: 2 } ] },
  raticate: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 6 } ] },
  spearow: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'peck', 'growl', 'sonicboom' ] } ],
    encounters: [ { generation: 1, level: 3 }, { generation: 2, level: 2 } ]
  },
  fearow: {
    eventData: [
      {
        generation: 1,
        level: 20,
        moves: [ 'growl', 'leer', 'furyattack', 'payday' ],
        japan: true
      }
    ],
    encounters: [ { generation: 1, level: 19 }, { generation: 2, level: 7 } ]
  },
  arbok: { encounters: [ { generation: 2, level: 10 } ] },
  pichu: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'thundershock', 'charm', 'dizzypunch' ]
      },
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'thundershock', 'charm', 'petaldance' ]
      },
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'thundershock', 'charm', 'scaryface' ]
      },
      { generation: 2, level: 5, shiny: 1, moves: [ 'thundershock', 'charm', 'sing' ] }
    ]
  },
  pikachu: {
    eventData: [
      { generation: 1, level: 5, moves: [ 'surf' ] },
      { generation: 1, level: 5, moves: [ 'fly' ], japan: true },
      { generation: 1, level: 5, moves: [ 'thundershock', 'growl', 'surf' ] }
    ],
    encounters: [ { generation: 1, level: 3 }, { generation: 2, level: 4 } ]
  },
  sandshrew: { encounters: [ { generation: 1, level: 6 } ] },
  sandslash: { encounters: [ { generation: 2, level: 10 } ] },
  nidoranf: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'growl', 'tackle', 'lovelykiss' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'growl', 'tackle', 'moonlight' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'growl', 'tackle', 'sweetkiss' ] }
    ],
    encounters: [ { generation: 1, level: 2 } ]
  },
  nidoranm: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'leer', 'tackle', 'lovelykiss' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'leer', 'tackle', 'morningsun' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'leer', 'tackle', 'sweetkiss' ] }
    ],
    encounters: [ { generation: 1, level: 2 } ]
  },
  cleffa: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'pound', 'charm', 'encore', 'petaldance' ]
      },
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'pound', 'charm', 'encore', 'scaryface' ]
      },
      { generation: 2, level: 5, shiny: 1, moves: [ 'pound', 'charm', 'encore', 'swift' ] },
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'pound', 'charm', 'encore', 'dizzypunch' ]
      }
    ]
  },
  clefairy: { encounters: [ { generation: 1, level: 8 } ] },
  vulpix: { encounters: [ { generation: 1, level: 18 }, { generation: 1, level: 15 } ] },
  igglybuff: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'sing', 'charm', 'defensecurl', 'mimic' ]
      },
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'sing', 'charm', 'defensecurl', 'petaldance' ]
      },
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'sing', 'charm', 'defensecurl', 'scaryface' ]
      },
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'sing', 'charm', 'defensecurl', 'dizzypunch' ]
      }
    ]
  },
  jigglypuff: { encounters: [ { generation: 1, level: 3 }, { generation: 2, level: 3 } ] },
  wigglytuff: { encounters: [ { generation: 1, level: 22 }, { generation: 1, level: 3 } ] },
  zubat: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'leechlife', 'flail' ] } ],
    encounters: [ { generation: 1, level: 6 }, { generation: 2, level: 2 } ]
  },
  golbat: { encounters: [ { generation: 2, level: 13 } ] },
  oddish: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'absorb', 'leechseed' ] } ],
    encounters: [ { generation: 1, level: 12 } ]
  },
  gloom: { encounters: [ { generation: 2, level: 14 } ] },
  paras: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'synthesis' ] } ],
    encounters: [ { generation: 1, level: 8 } ]
  },
  parasect: { encounters: [ { generation: 1, level: 13 }, { generation: 2, level: 5 } ] },
  venonat: { encounters: [ { generation: 1, level: 13 } ] },
  venomoth: { encounters: [ { generation: 1, level: 30 }, { generation: 2, level: 10 } ] },
  diglett: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 2 } ] },
  dugtrio: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 5 } ] },
  meowth: { encounters: [ { generation: 1, level: 10 } ] },
  persian: { encounters: [ { generation: 2, level: 18 } ] },
  psyduck: {
    eventData: [
      { generation: 1, level: 15, moves: [ 'scratch', 'amnesia' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'tailwhip', 'petaldance' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'tailwhip', 'triattack' ] }
    ],
    encounters: [ { generation: 1, level: 15 } ]
  },
  golduck: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 10 } ] },
  mankey: { encounters: [ { generation: 1, level: 3 } ] },
  primeape: { encounters: [ { generation: 2, level: 15 } ] },
  growlithe: { encounters: [ { generation: 1, level: 15 } ] },
  poliwag: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'bubble', 'growth' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'bubble', 'lovelykiss' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'bubble', 'sweetkiss' ] }
    ],
    encounters: [ { generation: 1, level: 5 }, { generation: 2, level: 3 } ]
  },
  poliwhirl: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 10 } ] },
  abra: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'teleport', 'foresight' ] } ],
    encounters: [ { generation: 1, level: 6 } ]
  },
  kadabra: { encounters: [ { generation: 2, level: 15 } ] },
  machop: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'lowkick', 'leer', 'falseswipe' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'lowkick', 'leer', 'thrash' ] }
    ],
    encounters: [ { generation: 1, level: 15 } ]
  },
  machoke: { encounters: [ { generation: 2, level: 14 } ] },
  machamp: { encounters: [ { generation: 1, level: 16 }, { generation: 2, level: 5 } ] },
  bellsprout: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'vinewhip', 'lovelykiss' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'vinewhip', 'sweetkiss' ] }
    ],
    encounters: [ { generation: 1, level: 12 }, { generation: 2, level: 3 } ]
  },
  weepinbell: { encounters: [ { generation: 2, level: 12 } ] },
  tentacool: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'poisonsting', 'confuseray' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  tentacruel: { encounters: [ { generation: 1, level: 20 }, { generation: 2, level: 20 } ] },
  geodude: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'rapidspin' ] } ],
    encounters: [ { generation: 1, level: 7 }, { generation: 2, level: 2 } ]
  },
  graveler: { encounters: [ { generation: 2, level: 23 } ] },
  golem: { encounters: [ { generation: 1, level: 16 } ] },
  ponyta: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'growl', 'lowkick' ] } ],
    encounters: [ { generation: 1, level: 28 } ]
  },
  rapidash: {
    eventData: [
      {
        generation: 1,
        level: 40,
        moves: [ 'ember', 'firespin', 'stomp', 'payday' ],
        japan: true
      }
    ],
    encounters: [ { generation: 2, level: 14, gender: 'M' } ]
  },
  slowpoke: { encounters: [ { generation: 1, level: 15 } ] },
  slowbro: {
    encounters: [
      { generation: 1, level: 15 },
      { generation: 1, level: 23 },
      { generation: 2, level: 20 }
    ]
  },
  magnemite: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'agility' ] } ],
    encounters: [ { generation: 1, level: 16 } ]
  },
  magneton: { encounters: [ { generation: 2, level: 5 } ] },
  farfetchd: {
    eventData: [
      {
        generation: 2,
        level: 5,
        moves: [ 'batonpass', 'swordsdance', 'agility', 'slash' ]
      },
      { generation: 2, level: 5, shiny: 1, moves: [ 'peck', 'furycutter' ] }
    ],
    encounters: [ { generation: 1, level: 3 } ]
  },
  doduo: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'peck', 'growl', 'lowkick' ] } ],
    encounters: [ { generation: 1, level: 18 }, { generation: 2, level: 4 } ]
  },
  dodrio: {
    encounters: [
      { generation: 1, level: 29 },
      { generation: 2, level: 10, gender: 'F' },
      { generation: 2, level: 30 }
    ]
  },
  seel: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'headbutt', 'growl', 'flail' ] } ],
    encounters: [ { generation: 1, level: 22 } ]
  },
  dewgong: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 5 } ] },
  grimer: { encounters: [ { generation: 1, level: 23 } ] },
  muk: {
    encounters: [
      { generation: 1, level: 25 },
      { generation: 1, level: 15, japan: true },
      { generation: 2, level: 5 }
    ]
  },
  shellder: { encounters: [ { generation: 1, level: 10 } ] },
  gastly: { encounters: [ { generation: 1, level: 18 } ] },
  haunter: { encounters: [ { generation: 1, level: 20 }, { generation: 2, level: 15 } ] },
  onix: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'screech', 'sharpen' ] } ],
    encounters: [ { generation: 1, level: 13 } ]
  },
  drowzee: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'pound', 'hypnosis', 'amnesia' ] } ],
    encounters: [ { generation: 1, level: 9 } ]
  },
  hypno: { encounters: [ { generation: 2, level: 16 }, { generation: 4, level: 16 } ] },
  krabby: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'bubble', 'leer', 'metalclaw' ] } ],
    encounters: [ { generation: 1, level: 10 } ]
  },
  kingler: { encounters: [ { generation: 1, level: 15 } ] },
  voltorb: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'agility' ] } ],
    encounters: [ { generation: 1, level: 14 }, { generation: 1, level: 40 } ]
  },
  electrode: { encounters: [ { generation: 1, level: 3 }, { generation: 2, level: 23 } ] },
  exeggcute: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'barrage', 'hypnosis', 'sweetscent' ] }
    ],
    encounters: [ { generation: 1, level: 20 } ]
  },
  cubone: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'growl', 'tailwhip', 'furyattack' ] } ],
    encounters: [ { generation: 1, level: 16 } ]
  },
  marowak: { encounters: [ { generation: 1, level: 24 }, { generation: 2, level: 12 } ] },
  tyrogue: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'rage' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'dizzypunch' ] }
    ]
  },
  hitmonlee: {
    eventData: [ { generation: 1, level: 20, moves: [ 'doublekick', 'meditate' ] } ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  hitmonchan: {
    eventData: [ { generation: 1, level: 20, moves: [ 'cometpunch', 'agility' ] } ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  lickitung: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'lick', 'doubleslap' ] } ],
    encounters: [ { generation: 1, level: 15 } ]
  },
  koffing: { encounters: [ { generation: 1, level: 30 } ] },
  weezing: { encounters: [ { generation: 2, level: 16 } ] },
  rhyhorn: { encounters: [ { generation: 1, level: 20 } ] },
  rhydon: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 10 } ] },
  chansey: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'pound', 'sweetscent' ] } ],
    encounters: [ { generation: 1, level: 7 } ]
  },
  tangela: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'constrict', 'sleeppowder', 'synthesis' ]
      }
    ],
    encounters: [ { generation: 1, level: 13 } ]
  },
  kangaskhan: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'cometpunch', 'feintattack' ] } ],
    encounters: [ { generation: 1, level: 25 }, { generation: 1, level: 15, japan: true } ]
  },
  horsea: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'bubble', 'haze' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  seadra: { encounters: [ { generation: 1, level: 20 }, { generation: 2, level: 20 } ] },
  goldeen: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'peck', 'tailwhip', 'swordsdance' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  seaking: { encounters: [ { generation: 1, level: 23 }, { generation: 2, level: 10 } ] },
  staryu: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'harden', 'twister' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  starmie: { encounters: [ { generation: 1, level: 6 } ] },
  mrmime: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'barrier', 'mindreader' ] } ]
  },
  scyther: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'quickattack', 'leer', 'sonicboom' ] }
    ],
    encounters: [ { generation: 1, level: 15 }, { generation: 1, level: 25 } ]
  },
  smoochum: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'pound', 'lick', 'metronome' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'pound', 'lick', 'petaldance' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'pound', 'lick', 'dizzypunch' ] }
    ]
  },
  jynx: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 10 } ] },
  elekid: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'quickattack', 'leer', 'dizzypunch' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'quickattack', 'leer', 'pursuit' ] }
    ]
  },
  electabuzz: { encounters: [ { generation: 1, level: 33 }, { generation: 2, level: 15 } ] },
  magby: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'ember', 'feintattack' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'ember', 'dizzypunch' ] }
    ]
  },
  magmar: { encounters: [ { generation: 1, level: 34 }, { generation: 2, level: 14 } ] },
  pinsir: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'visegrip', 'rockthrow' ] } ],
    encounters: [ { generation: 1, level: 15 }, { generation: 1, level: 20 } ]
  },
  tauros: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'tailwhip', 'quickattack' ] }
    ],
    encounters: [ { generation: 1, level: 21 } ]
  },
  magikarp: {
    eventData: [
      { generation: 1, level: 15, moves: [ 'splash', 'dragonrage' ], japan: true },
      { generation: 2, level: 5, shiny: 1, moves: [ 'splash', 'bubble' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'splash', 'reversal' ] }
    ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  gyarados: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 15 } ] },
  lapras: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'watergun', 'growl', 'sing', 'bite' ] },
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'watergun', 'growl', 'sing', 'futuresight' ]
      }
    ],
    encounters: [ { generation: 1, level: 15 } ]
  },
  ditto: { encounters: [ { generation: 1, level: 12 }, { generation: 2, level: 10 } ] },
  eevee: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'tailwhip', 'growth' ] } ],
    encounters: [ { generation: 1, level: 25 } ]
  },
  porygon: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'conversion', 'barrier' ] } ],
    encounters: [ { generation: 1, level: 18 } ]
  },
  omanyte: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'constrict', 'withdraw', 'rockthrow' ]
      },
      { generation: 1, level: 20, moves: [ 'watergun', 'withdraw' ] }
    ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  kabuto: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'harden', 'rockthrow' ] },
      { generation: 1, level: 20, moves: [ 'scratch', 'harden' ] }
    ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  aerodactyl: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'wingattack', 'rockthrow' ] } ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  snorlax: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'lovelykiss' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'splash' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'sweetkiss' ] }
    ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  articuno: {
    eventData: [
      {
        generation: 2,
        level: 50,
        shiny: true,
        moves: [ 'mist', 'agility', 'mindreader', 'icebeam' ]
      }
    ],
    encounters: [ { generation: 1, level: 50 } ]
  },
  zapdos: {
    eventData: [
      {
        generation: 2,
        level: 50,
        shiny: true,
        moves: [ 'thunderwave', 'agility', 'detect', 'drillpeck' ]
      }
    ],
    encounters: [ { generation: 1, level: 50 } ]
  },
  moltres: {
    eventData: [
      {
        generation: 2,
        level: 50,
        shiny: true,
        moves: [ 'firespin', 'agility', 'endure', 'flamethrower' ]
      }
    ],
    encounters: [ { generation: 1, level: 50 } ]
  },
  dratini: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'wrap', 'leer', 'hydropump' ] },
      {
        generation: 2,
        level: 15,
        shiny: 1,
        moves: [ 'wrap', 'thunderwave', 'twister', 'extremespeed' ]
      }
    ],
    encounters: [ { generation: 1, level: 10 } ]
  },
  dragonair: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 10 } ] },
  mewtwo: {
    eventData: [
      {
        generation: 2,
        level: 70,
        shiny: true,
        moves: [ 'psychup', 'futuresight', 'mist', 'psychic' ]
      }
    ],
    encounters: [ { generation: 1, level: 70 } ]
  },
  mew: {
    eventData: [
      { generation: 1, level: 5, moves: [ 'pound' ] },
      { generation: 2, level: 5, moves: [ 'pound' ] }
    ],
    eventOnly: true
  },
  chikorita: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'growl', 'petaldance' ] } ]
  },
  meganium: {
    eventData: [
      {
        generation: 2,
        level: 40,
        shiny: true,
        moves: [ 'reflect', 'poisonpowder', 'synthesis', 'bodyslam' ]
      }
    ]
  },
  cyndaquil: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'leer', 'doubleedge' ] } ]
  },
  typhlosion: {
    eventData: [
      {
        generation: 2,
        level: 40,
        shiny: true,
        moves: [ 'smokescreen', 'ember', 'quickattack', 'flamewheel' ]
      }
    ]
  },
  totodile: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'leer', 'submission' ] } ]
  },
  feraligatr: {
    eventData: [
      {
        generation: 2,
        level: 40,
        shiny: true,
        moves: [ 'watergun', 'bite', 'scaryface', 'slash' ]
      }
    ]
  },
  sentret: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'tackle', 'defensecurl', 'dizzypunch' ]
      }
    ],
    encounters: [ { generation: 2, level: 2 } ]
  },
  furret: { encounters: [ { generation: 2, level: 6 } ] },
  hoothoot: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'growl', 'nightshade' ] } ],
    encounters: [ { generation: 2, level: 2 } ]
  },
  noctowl: { encounters: [ { generation: 2, level: 7 } ] },
  ledyba: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'barrier' ] } ],
    encounters: [ { generation: 2, level: 3 } ]
  },
  ledian: { encounters: [ { generation: 2, level: 7 } ] },
  spinarak: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'poisonsting', 'stringshot', 'growth' ]
      }
    ],
    encounters: [ { generation: 2, level: 3 } ]
  },
  ariados: { encounters: [ { generation: 2, level: 7 } ] },
  chinchou: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'bubble', 'thunderwave', 'supersonic', 'lightscreen' ]
      }
    ]
  },
  natu: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'peck', 'leer', 'safeguard' ] } ]
  },
  xatu: { encounters: [ { generation: 2, level: 15 } ] },
  marill: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'tackle', 'defensecurl', 'dizzypunch' ]
      },
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'tackle', 'defensecurl', 'hydropump' ]
      },
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'tackle', 'defensecurl', 'scaryface' ]
      }
    ]
  },
  sudowoodo: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'rockthrow', 'mimic', 'substitute' ] }
    ]
  },
  hoppip: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'splash', 'synthesis', 'tailwhip', 'agility' ]
      }
    ],
    encounters: [ { generation: 2, level: 3 } ]
  },
  aipom: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'tailwhip', 'mimic' ] } ]
  },
  sunkern: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'absorb', 'growth', 'splash' ] } ]
  },
  yanma: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'foresight', 'steelwing' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'foresight', 'sweetkiss' ] }
    ]
  },
  wooper: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'watergun', 'tailwhip', 'bellydrum' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'watergun', 'tailwhip', 'scaryface' ] }
    ],
    encounters: [ { generation: 2, level: 4 } ]
  },
  quagsire: { encounters: [ { generation: 2, level: 15 } ] },
  murkrow: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'peck', 'beatup' ] } ]
  },
  misdreavus: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'growl', 'hypnosis' ] } ]
  },
  unown: { encounters: [ { generation: 2, level: 5 } ] },
  wobbuffet: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'mirrorcoat', 'safeguard', 'destinybond', 'mimic' ]
      }
    ],
    encounters: [ { generation: 2, level: 5 } ]
  },
  pineco: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'protect', 'substitute' ] } ]
  },
  dunsparce: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'rage', 'defensecurl', 'furyattack' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'rage', 'defensecurl', 'horndrill' ] }
    ]
  },
  gligar: {
    eventData: [
      {
        generation: 2,
        level: 5,
        moves: [ 'earthquake', 'poisonsting', 'counter', 'wingattack' ]
      }
    ]
  },
  snubbull: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'tackle', 'scaryface', 'tailwhip', 'lovelykiss' ]
      }
    ]
  },
  granbull: { encounters: [ { generation: 2, level: 15 } ] },
  qwilfish: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'tackle', 'poisonsting', 'doubleedge' ]
      }
    ]
  },
  heracross: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'leer', 'seismictoss' ] } ]
  },
  sneasel: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'leer', 'moonlight' ] } ]
  },
  teddiursa: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'leer', 'sweetscent' ] } ],
    encounters: [ { generation: 2, level: 2 } ]
  },
  ursaring: { encounters: [ { generation: 2, level: 25 } ] },
  swinub: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'whirlwind' ] } ]
  },
  remoraid: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'watergun', 'amnesia' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'watergun', 'mist' ] }
    ]
  },
  delibird: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'present', 'payday' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'present', 'spikes' ] }
    ]
  },
  mantine: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'bubble', 'gust' ] } ]
  },
  skarmory: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'leer', 'peck', 'furycutter' ] } ]
  },
  phanpy: {
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'growl', 'absorb' ] },
      { generation: 2, level: 5, moves: [ 'tackle', 'growl', 'encore' ], japan: true }
    ],
    encounters: [ { generation: 2, level: 2 } ]
  },
  stantler: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'safeguard' ] } ]
  },
  miltank: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'growl', 'megakick' ] } ]
  },
  raikou: {
    eventData: [
      {
        generation: 2,
        level: 40,
        shiny: true,
        moves: [ 'leer', 'thundershock', 'roar', 'quickattack' ]
      }
    ],
    encounters: [ { generation: 2, level: 40 } ]
  },
  entei: {
    eventData: [
      {
        generation: 2,
        level: 40,
        shiny: true,
        moves: [ 'leer', 'ember', 'roar', 'firespin' ]
      }
    ],
    encounters: [ { generation: 2, level: 40 } ]
  },
  suicune: {
    eventData: [
      {
        generation: 2,
        level: 40,
        shiny: true,
        moves: [ 'leer', 'watergun', 'roar', 'gust' ]
      }
    ],
    encounters: [ { generation: 2, level: 40 } ]
  },
  larvitar: {
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'bite', 'leer', 'rage' ] } ]
  },
  lugia: {
    eventData: [
      {
        generation: 2,
        level: 40,
        shiny: true,
        moves: [ 'aeroblast', 'safeguard', 'gust', 'recover' ]
      }
    ],
    encounters: [ { generation: 2, level: 40 } ]
  },
  hooh: {
    eventData: [
      {
        generation: 2,
        level: 40,
        shiny: true,
        moves: [ 'sacredfire', 'safeguard', 'gust', 'recover' ]
      }
    ],
    encounters: [ { generation: 2, level: 40 } ]
  },
  celebi: {
    eventData: [
      {
        generation: 2,
        level: 5,
        shiny: 1,
        moves: [ 'leechseed', 'confusion', 'healbell', 'recover' ]
      }
    ],
    encounters: [ { generation: 2, level: 40 } ],
    eventOnly: true
  }
};
