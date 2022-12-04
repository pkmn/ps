export const Legality: {[k: string]: ModdedLearnsetData} = {
  bulbasaur: {
    learnset: { ancientpower: [ '2S0' ], growl: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'growl', 'ancientpower' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  venusaur: {
    learnset: {
      poisonpowder: [ '2S0' ],
      razorleaf: [ '2S0' ],
      sleeppowder: [ '2S0' ],
      sweetscent: [ '2S0' ]
    },
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
    learnset: { crunch: [ '2S0' ], growl: [ '2S0' ], scratch: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'growl', 'crunch' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  charizard: {
    learnset: {
      flamethrower: [ '2S0' ],
      rage: [ '2S0' ],
      scaryface: [ '2S0' ],
      wingattack: [ '2S0' ]
    },
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
    learnset: { tackle: [ '2S0' ], tailwhip: [ '2S0' ], zapcannon: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'tailwhip', 'zapcannon' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  blastoise: {
    learnset: { bite: [ '2S0' ], protect: [ '2S0' ], rapidspin: [ '2S0' ], watergun: [ '2S0' ] },
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
    learnset: { growl: [ '2S0' ], peck: [ '2S0' ], sonicboom: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'peck', 'growl', 'sonicboom' ] } ],
    encounters: [ { generation: 1, level: 3 }, { generation: 2, level: 2 } ]
  },
  fearow: {
    learnset: { furyattack: [ '1S0' ], growl: [ '1S0' ], leer: [ '1S0' ], payday: [ '1S0' ] },
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
    learnset: {
      charm: [ '2S3', '2S2', '2S1', '2S0' ],
      dizzypunch: [ '2S0' ],
      petaldance: [ '2S1' ],
      scaryface: [ '2S2' ],
      sing: [ '2S3' ],
      thundershock: [ '2S3', '2S2', '2S1', '2S0' ]
    },
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
    learnset: { fly: [ '1S1' ], growl: [ '1S2' ], surf: [ '1S2', '1S0' ], thundershock: [ '1S2' ] },
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
    learnset: {
      growl: [ '2S2', '2S1', '2S0' ],
      lovelykiss: [ '2S0' ],
      moonlight: [ '2S1' ],
      sweetkiss: [ '2S2' ],
      tackle: [ '2S2', '2S1', '2S0' ]
    },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'growl', 'tackle', 'lovelykiss' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'growl', 'tackle', 'moonlight' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'growl', 'tackle', 'sweetkiss' ] }
    ],
    encounters: [ { generation: 1, level: 2 } ]
  },
  nidoranm: {
    learnset: {
      leer: [ '2S2', '2S1', '2S0' ],
      lovelykiss: [ '2S0' ],
      morningsun: [ '2S1' ],
      sweetkiss: [ '2S2' ],
      tackle: [ '2S2', '2S1', '2S0' ]
    },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'leer', 'tackle', 'lovelykiss' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'leer', 'tackle', 'morningsun' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'leer', 'tackle', 'sweetkiss' ] }
    ],
    encounters: [ { generation: 1, level: 2 } ]
  },
  cleffa: {
    learnset: {
      charm: [ '2S3', '2S2', '2S1', '2S0' ],
      dizzypunch: [ '2S3' ],
      encore: [ '2S3', '2S2', '2S1', '2S0' ],
      petaldance: [ '2S0' ],
      pound: [ '2S3', '2S2', '2S1', '2S0' ],
      scaryface: [ '2S1' ],
      swift: [ '2S2' ]
    },
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
    learnset: {
      charm: [ '2S3', '2S2', '2S1', '2S0' ],
      defensecurl: [ '2S3', '2S2', '2S1', '2S0' ],
      dizzypunch: [ '2S3' ],
      mimic: [ '2S0' ],
      petaldance: [ '2S1' ],
      scaryface: [ '2S2' ],
      sing: [ '2S3', '2S2', '2S1', '2S0' ]
    },
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
    learnset: { flail: [ '2S0' ], leechlife: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'leechlife', 'flail' ] } ],
    encounters: [ { generation: 1, level: 6 }, { generation: 2, level: 2 } ]
  },
  golbat: { encounters: [ { generation: 2, level: 13 } ] },
  oddish: {
    learnset: { absorb: [ '2S0' ], leechseed: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'absorb', 'leechseed' ] } ],
    encounters: [ { generation: 1, level: 12 } ]
  },
  gloom: { encounters: [ { generation: 2, level: 14 } ] },
  paras: {
    learnset: { scratch: [ '2S0' ], synthesis: [ '2S0' ] },
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
    learnset: {
      amnesia: [ '1S0' ],
      petaldance: [ '2S1' ],
      scratch: [ '2S2', '2S1', '1S0' ],
      tailwhip: [ '2S2', '2S1' ],
      triattack: [ '2S2' ]
    },
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
    learnset: {
      bubble: [ '2S2', '2S1', '2S0' ],
      growth: [ '2S0' ],
      lovelykiss: [ '2S1' ],
      sweetkiss: [ '2S2' ]
    },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'bubble', 'growth' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'bubble', 'lovelykiss' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'bubble', 'sweetkiss' ] }
    ],
    encounters: [ { generation: 1, level: 5 }, { generation: 2, level: 3 } ]
  },
  poliwhirl: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 10 } ] },
  abra: {
    learnset: { foresight: [ '2S0' ], teleport: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'teleport', 'foresight' ] } ],
    encounters: [ { generation: 1, level: 6 } ]
  },
  kadabra: { encounters: [ { generation: 2, level: 15 } ] },
  machop: {
    learnset: {
      falseswipe: [ '2S0' ],
      leer: [ '2S1', '2S0' ],
      lowkick: [ '2S1', '2S0' ],
      thrash: [ '2S1' ]
    },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'lowkick', 'leer', 'falseswipe' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'lowkick', 'leer', 'thrash' ] }
    ],
    encounters: [ { generation: 1, level: 15 } ]
  },
  machoke: { encounters: [ { generation: 2, level: 14 } ] },
  machamp: { encounters: [ { generation: 1, level: 16 }, { generation: 2, level: 5 } ] },
  bellsprout: {
    learnset: { lovelykiss: [ '2S0' ], sweetkiss: [ '2S1' ], vinewhip: [ '2S1', '2S0' ] },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'vinewhip', 'lovelykiss' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'vinewhip', 'sweetkiss' ] }
    ],
    encounters: [ { generation: 1, level: 12 }, { generation: 2, level: 3 } ]
  },
  weepinbell: { encounters: [ { generation: 2, level: 12 } ] },
  tentacool: {
    learnset: { confuseray: [ '2S0' ], poisonsting: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'poisonsting', 'confuseray' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  tentacruel: { encounters: [ { generation: 1, level: 20 }, { generation: 2, level: 20 } ] },
  geodude: {
    learnset: { rapidspin: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'rapidspin' ] } ],
    encounters: [ { generation: 1, level: 7 }, { generation: 2, level: 2 } ]
  },
  graveler: { encounters: [ { generation: 2, level: 23 } ] },
  golem: { encounters: [ { generation: 1, level: 16 } ] },
  ponyta: {
    learnset: { growl: [ '2S0' ], lowkick: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'growl', 'lowkick' ] } ],
    encounters: [ { generation: 1, level: 28 } ]
  },
  rapidash: {
    learnset: { ember: [ '1S0' ], firespin: [ '1S0' ], payday: [ '1S0' ], stomp: [ '1S0' ] },
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
    learnset: { agility: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'agility' ] } ],
    encounters: [ { generation: 1, level: 16 } ]
  },
  magneton: { encounters: [ { generation: 2, level: 5 } ] },
  farfetchd: {
    learnset: {
      agility: [ '2S0' ],
      batonpass: [ '2S0' ],
      furycutter: [ '2S1' ],
      peck: [ '2S1' ],
      slash: [ '2S0' ],
      swordsdance: [ '2S0' ]
    },
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
    learnset: { growl: [ '2S0' ], lowkick: [ '2S0' ], peck: [ '2S0' ] },
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
    learnset: { flail: [ '2S0' ], growl: [ '2S0' ], headbutt: [ '2S0' ] },
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
    learnset: { screech: [ '2S0' ], sharpen: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'screech', 'sharpen' ] } ],
    encounters: [ { generation: 1, level: 13 } ]
  },
  drowzee: {
    learnset: { amnesia: [ '2S0' ], hypnosis: [ '2S0' ], pound: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'pound', 'hypnosis', 'amnesia' ] } ],
    encounters: [ { generation: 1, level: 9 } ]
  },
  hypno: { encounters: [ { generation: 2, level: 16 }, { generation: 4, level: 16 } ] },
  krabby: {
    learnset: { bubble: [ '2S0' ], leer: [ '2S0' ], metalclaw: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'bubble', 'leer', 'metalclaw' ] } ],
    encounters: [ { generation: 1, level: 10 } ]
  },
  kingler: { encounters: [ { generation: 1, level: 15 } ] },
  voltorb: {
    learnset: { agility: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'agility' ] } ],
    encounters: [ { generation: 1, level: 14 }, { generation: 1, level: 40 } ]
  },
  electrode: { encounters: [ { generation: 1, level: 3 }, { generation: 2, level: 23 } ] },
  exeggcute: {
    learnset: { barrage: [ '2S0' ], hypnosis: [ '2S0' ], sweetscent: [ '2S0' ] },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'barrage', 'hypnosis', 'sweetscent' ] }
    ],
    encounters: [ { generation: 1, level: 20 } ]
  },
  cubone: {
    learnset: { furyattack: [ '2S0' ], growl: [ '2S0' ], tailwhip: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'growl', 'tailwhip', 'furyattack' ] } ],
    encounters: [ { generation: 1, level: 16 } ]
  },
  marowak: { encounters: [ { generation: 1, level: 24 }, { generation: 2, level: 12 } ] },
  tyrogue: {
    learnset: { dizzypunch: [ '2S1' ], rage: [ '2S0' ], tackle: [ '2S1', '2S0' ] },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'rage' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'dizzypunch' ] }
    ]
  },
  hitmonlee: {
    learnset: { doublekick: [ '1S0' ], meditate: [ '1S0' ] },
    eventData: [ { generation: 1, level: 20, moves: [ 'doublekick', 'meditate' ] } ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  hitmonchan: {
    learnset: { agility: [ '1S0' ], cometpunch: [ '1S0' ] },
    eventData: [ { generation: 1, level: 20, moves: [ 'cometpunch', 'agility' ] } ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  lickitung: {
    learnset: { doubleslap: [ '2S0' ], lick: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'lick', 'doubleslap' ] } ],
    encounters: [ { generation: 1, level: 15 } ]
  },
  koffing: { encounters: [ { generation: 1, level: 30 } ] },
  weezing: { encounters: [ { generation: 2, level: 16 } ] },
  rhyhorn: { encounters: [ { generation: 1, level: 20 } ] },
  rhydon: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 10 } ] },
  chansey: {
    learnset: { pound: [ '2S0' ], sweetscent: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'pound', 'sweetscent' ] } ],
    encounters: [ { generation: 1, level: 7 } ]
  },
  tangela: {
    learnset: { constrict: [ '2S0' ], sleeppowder: [ '2S0' ], synthesis: [ '2S0' ] },
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
    learnset: { cometpunch: [ '2S0' ], feintattack: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'cometpunch', 'feintattack' ] } ],
    encounters: [ { generation: 1, level: 25 }, { generation: 1, level: 15, japan: true } ]
  },
  horsea: {
    learnset: { bubble: [ '2S0' ], haze: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'bubble', 'haze' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  seadra: { encounters: [ { generation: 1, level: 20 }, { generation: 2, level: 20 } ] },
  goldeen: {
    learnset: { peck: [ '2S0' ], swordsdance: [ '2S0' ], tailwhip: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'peck', 'tailwhip', 'swordsdance' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  seaking: { encounters: [ { generation: 1, level: 23 }, { generation: 2, level: 10 } ] },
  staryu: {
    learnset: { harden: [ '2S0' ], tackle: [ '2S0' ], twister: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'harden', 'twister' ] } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  starmie: { encounters: [ { generation: 1, level: 6 } ] },
  mrmime: {
    learnset: { barrier: [ '2S0' ], mindreader: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'barrier', 'mindreader' ] } ]
  },
  scyther: {
    learnset: { leer: [ '2S0' ], quickattack: [ '2S0' ], sonicboom: [ '2S0' ] },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'quickattack', 'leer', 'sonicboom' ] }
    ],
    encounters: [ { generation: 1, level: 15 }, { generation: 1, level: 25 } ]
  },
  smoochum: {
    learnset: {
      dizzypunch: [ '2S2' ],
      lick: [ '2S2', '2S1', '2S0' ],
      metronome: [ '2S0' ],
      petaldance: [ '2S1' ],
      pound: [ '2S2', '2S1', '2S0' ]
    },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'pound', 'lick', 'metronome' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'pound', 'lick', 'petaldance' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'pound', 'lick', 'dizzypunch' ] }
    ]
  },
  jynx: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 10 } ] },
  elekid: {
    learnset: {
      dizzypunch: [ '2S0' ],
      leer: [ '2S1', '2S0' ],
      pursuit: [ '2S1' ],
      quickattack: [ '2S1', '2S0' ]
    },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'quickattack', 'leer', 'dizzypunch' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'quickattack', 'leer', 'pursuit' ] }
    ]
  },
  electabuzz: { encounters: [ { generation: 1, level: 33 }, { generation: 2, level: 15 } ] },
  magby: {
    learnset: { dizzypunch: [ '2S1' ], ember: [ '2S1', '2S0' ], feintattack: [ '2S0' ] },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'ember', 'feintattack' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'ember', 'dizzypunch' ] }
    ]
  },
  magmar: { encounters: [ { generation: 1, level: 34 }, { generation: 2, level: 14 } ] },
  pinsir: {
    learnset: { rockthrow: [ '2S0' ], visegrip: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'visegrip', 'rockthrow' ] } ],
    encounters: [ { generation: 1, level: 15 }, { generation: 1, level: 20 } ]
  },
  tauros: {
    learnset: { quickattack: [ '2S0' ], tackle: [ '2S0' ], tailwhip: [ '2S0' ] },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'tailwhip', 'quickattack' ] }
    ],
    encounters: [ { generation: 1, level: 21 } ]
  },
  magikarp: {
    learnset: {
      bubble: [ '2S1' ],
      dragonrage: [ '1S0' ],
      reversal: [ '2S2' ],
      splash: [ '2S2', '2S1', '1S0' ]
    },
    eventData: [
      { generation: 1, level: 15, moves: [ 'splash', 'dragonrage' ], japan: true },
      { generation: 2, level: 5, shiny: 1, moves: [ 'splash', 'bubble' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'splash', 'reversal' ] }
    ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  gyarados: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 15 } ] },
  lapras: {
    learnset: {
      bite: [ '2S0' ],
      futuresight: [ '2S1' ],
      growl: [ '2S1', '2S0' ],
      sing: [ '2S1', '2S0' ],
      watergun: [ '2S1', '2S0' ]
    },
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
    learnset: { growth: [ '2S0' ], tackle: [ '2S0' ], tailwhip: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'tailwhip', 'growth' ] } ],
    encounters: [ { generation: 1, level: 25 } ]
  },
  porygon: {
    learnset: { barrier: [ '2S0' ], conversion: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'conversion', 'barrier' ] } ],
    encounters: [ { generation: 1, level: 18 } ]
  },
  omanyte: {
    learnset: {
      constrict: [ '2S0' ],
      rockthrow: [ '2S0' ],
      watergun: [ '1S1' ],
      withdraw: [ '2S0', '1S1' ]
    },
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
    learnset: { harden: [ '2S0', '1S1' ], rockthrow: [ '2S0' ], scratch: [ '2S0', '1S1' ] },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'harden', 'rockthrow' ] },
      { generation: 1, level: 20, moves: [ 'scratch', 'harden' ] }
    ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  aerodactyl: {
    learnset: { rockthrow: [ '2S0' ], wingattack: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'wingattack', 'rockthrow' ] } ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  snorlax: {
    learnset: {
      lovelykiss: [ '2S0' ],
      splash: [ '2S1' ],
      sweetkiss: [ '2S2' ],
      tackle: [ '2S2', '2S1', '2S0' ]
    },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'lovelykiss' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'splash' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'sweetkiss' ] }
    ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  articuno: {
    learnset: { agility: [ '2S0' ], icebeam: [ '2S0' ], mindreader: [ '2S0' ], mist: [ '2S0' ] },
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
    learnset: { agility: [ '2S0' ], detect: [ '2S0' ], drillpeck: [ '2S0' ], thunderwave: [ '2S0' ] },
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
    learnset: { agility: [ '2S0' ], endure: [ '2S0' ], firespin: [ '2S0' ], flamethrower: [ '2S0' ] },
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
    learnset: {
      extremespeed: [ '2S1' ],
      hydropump: [ '2S0' ],
      leer: [ '2S0' ],
      thunderwave: [ '2S1' ],
      twister: [ '2S1' ],
      wrap: [ '2S1', '2S0' ]
    },
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
    learnset: { futuresight: [ '2S0' ], mist: [ '2S0' ], psychic: [ '2S0' ], psychup: [ '2S0' ] },
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
    learnset: { pound: [ '2S1', '1S0' ] },
    eventData: [
      { generation: 1, level: 5, moves: [ 'pound' ] },
      { generation: 2, level: 5, moves: [ 'pound' ] }
    ],
    eventOnly: true
  },
  chikorita: {
    learnset: { growl: [ '2S0' ], petaldance: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'growl', 'petaldance' ] } ]
  },
  meganium: {
    learnset: {
      bodyslam: [ '2S0' ],
      poisonpowder: [ '2S0' ],
      reflect: [ '2S0' ],
      synthesis: [ '2S0' ]
    },
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
    learnset: { doubleedge: [ '2S0' ], leer: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'leer', 'doubleedge' ] } ]
  },
  typhlosion: {
    learnset: {
      ember: [ '2S0' ],
      flamewheel: [ '2S0' ],
      quickattack: [ '2S0' ],
      smokescreen: [ '2S0' ]
    },
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
    learnset: { leer: [ '2S0' ], scratch: [ '2S0' ], submission: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'leer', 'submission' ] } ]
  },
  feraligatr: {
    learnset: { bite: [ '2S0' ], scaryface: [ '2S0' ], slash: [ '2S0' ], watergun: [ '2S0' ] },
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
    learnset: { defensecurl: [ '2S0' ], dizzypunch: [ '2S0' ], tackle: [ '2S0' ] },
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
    learnset: { growl: [ '2S0' ], nightshade: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'growl', 'nightshade' ] } ],
    encounters: [ { generation: 2, level: 2 } ]
  },
  noctowl: { encounters: [ { generation: 2, level: 7 } ] },
  ledyba: {
    learnset: { barrier: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'barrier' ] } ],
    encounters: [ { generation: 2, level: 3 } ]
  },
  ledian: { encounters: [ { generation: 2, level: 7 } ] },
  spinarak: {
    learnset: { growth: [ '2S0' ], poisonsting: [ '2S0' ], stringshot: [ '2S0' ] },
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
    learnset: {
      bubble: [ '2S0' ],
      lightscreen: [ '2S0' ],
      supersonic: [ '2S0' ],
      thunderwave: [ '2S0' ]
    },
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
    learnset: { leer: [ '2S0' ], peck: [ '2S0' ], safeguard: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'peck', 'leer', 'safeguard' ] } ]
  },
  xatu: { encounters: [ { generation: 2, level: 15 } ] },
  marill: {
    learnset: {
      defensecurl: [ '2S2', '2S1', '2S0' ],
      dizzypunch: [ '2S0' ],
      hydropump: [ '2S1' ],
      scaryface: [ '2S2' ],
      tackle: [ '2S2', '2S1', '2S0' ]
    },
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
    learnset: { mimic: [ '2S0' ], rockthrow: [ '2S0' ], substitute: [ '2S0' ] },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'rockthrow', 'mimic', 'substitute' ] }
    ]
  },
  hoppip: {
    learnset: { agility: [ '2S0' ], splash: [ '2S0' ], synthesis: [ '2S0' ], tailwhip: [ '2S0' ] },
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
    learnset: { mimic: [ '2S0' ], scratch: [ '2S0' ], tailwhip: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'tailwhip', 'mimic' ] } ]
  },
  sunkern: {
    learnset: { absorb: [ '2S0' ], growth: [ '2S0' ], splash: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'absorb', 'growth', 'splash' ] } ]
  },
  yanma: {
    learnset: {
      foresight: [ '2S1', '2S0' ],
      steelwing: [ '2S0' ],
      sweetkiss: [ '2S1' ],
      tackle: [ '2S1', '2S0' ]
    },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'foresight', 'steelwing' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'foresight', 'sweetkiss' ] }
    ]
  },
  wooper: {
    learnset: {
      bellydrum: [ '2S0' ],
      scaryface: [ '2S1' ],
      tailwhip: [ '2S1', '2S0' ],
      watergun: [ '2S1', '2S0' ]
    },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'watergun', 'tailwhip', 'bellydrum' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'watergun', 'tailwhip', 'scaryface' ] }
    ],
    encounters: [ { generation: 2, level: 4 } ]
  },
  quagsire: { encounters: [ { generation: 2, level: 15 } ] },
  murkrow: {
    learnset: { beatup: [ '2S0' ], peck: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'peck', 'beatup' ] } ]
  },
  misdreavus: {
    learnset: { growl: [ '2S0' ], hypnosis: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'growl', 'hypnosis' ] } ]
  },
  unown: { encounters: [ { generation: 2, level: 5 } ] },
  wobbuffet: {
    learnset: {
      destinybond: [ '2S0' ],
      mimic: [ '2S0' ],
      mirrorcoat: [ '2S0' ],
      safeguard: [ '2S0' ]
    },
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
    learnset: { protect: [ '2S0' ], substitute: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'protect', 'substitute' ] } ]
  },
  dunsparce: {
    learnset: {
      defensecurl: [ '2S1', '2S0' ],
      furyattack: [ '2S0' ],
      horndrill: [ '2S1' ],
      rage: [ '2S1', '2S0' ]
    },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'rage', 'defensecurl', 'furyattack' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'rage', 'defensecurl', 'horndrill' ] }
    ]
  },
  gligar: {
    learnset: {
      counter: [ '2S0' ],
      earthquake: [ '2S0' ],
      poisonsting: [ '2S0' ],
      wingattack: [ '2S0' ]
    },
    eventData: [
      {
        generation: 2,
        level: 5,
        moves: [ 'earthquake', 'poisonsting', 'counter', 'wingattack' ]
      }
    ]
  },
  snubbull: {
    learnset: { lovelykiss: [ '2S0' ], scaryface: [ '2S0' ], tackle: [ '2S0' ], tailwhip: [ '2S0' ] },
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
    learnset: { doubleedge: [ '2S0' ], poisonsting: [ '2S0' ], tackle: [ '2S0' ] },
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
    learnset: { leer: [ '2S0' ], seismictoss: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'leer', 'seismictoss' ] } ]
  },
  sneasel: {
    learnset: { leer: [ '2S0' ], moonlight: [ '2S0' ], scratch: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'leer', 'moonlight' ] } ]
  },
  teddiursa: {
    learnset: { leer: [ '2S0' ], scratch: [ '2S0' ], sweetscent: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'scratch', 'leer', 'sweetscent' ] } ],
    encounters: [ { generation: 2, level: 2 } ]
  },
  ursaring: { encounters: [ { generation: 2, level: 25 } ] },
  swinub: {
    learnset: { tackle: [ '2S0' ], whirlwind: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'whirlwind' ] } ]
  },
  remoraid: {
    learnset: { amnesia: [ '2S0' ], mist: [ '2S1' ], watergun: [ '2S1', '2S0' ] },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'watergun', 'amnesia' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'watergun', 'mist' ] }
    ]
  },
  delibird: {
    learnset: { payday: [ '2S0' ], present: [ '2S1', '2S0' ], spikes: [ '2S1' ] },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'present', 'payday' ] },
      { generation: 2, level: 5, shiny: 1, moves: [ 'present', 'spikes' ] }
    ]
  },
  mantine: {
    learnset: { bubble: [ '2S0' ], gust: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'bubble', 'gust' ] } ]
  },
  skarmory: {
    learnset: { furycutter: [ '2S0' ], leer: [ '2S0' ], peck: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'leer', 'peck', 'furycutter' ] } ]
  },
  phanpy: {
    learnset: {
      absorb: [ '2S0' ],
      encore: [ '2S1' ],
      growl: [ '2S1', '2S0' ],
      tackle: [ '2S1', '2S0' ]
    },
    eventData: [
      { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'growl', 'absorb' ] },
      { generation: 2, level: 5, moves: [ 'tackle', 'growl', 'encore' ], japan: true }
    ],
    encounters: [ { generation: 2, level: 2 } ]
  },
  stantler: {
    learnset: { safeguard: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'safeguard' ] } ]
  },
  miltank: {
    learnset: { growl: [ '2S0' ], megakick: [ '2S0' ], tackle: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'tackle', 'growl', 'megakick' ] } ]
  },
  raikou: {
    learnset: { leer: [ '2S0' ], quickattack: [ '2S0' ], roar: [ '2S0' ], thundershock: [ '2S0' ] },
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
    learnset: { ember: [ '2S0' ], firespin: [ '2S0' ], leer: [ '2S0' ], roar: [ '2S0' ] },
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
    learnset: { gust: [ '2S0' ], leer: [ '2S0' ], roar: [ '2S0' ], watergun: [ '2S0' ] },
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
    learnset: { bite: [ '2S0' ], leer: [ '2S0' ], rage: [ '2S0' ] },
    eventData: [ { generation: 2, level: 5, shiny: 1, moves: [ 'bite', 'leer', 'rage' ] } ]
  },
  lugia: {
    learnset: { aeroblast: [ '2S0' ], gust: [ '2S0' ], recover: [ '2S0' ], safeguard: [ '2S0' ] },
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
    learnset: { gust: [ '2S0' ], recover: [ '2S0' ], sacredfire: [ '2S0' ], safeguard: [ '2S0' ] },
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
    learnset: { confusion: [ '2S0' ], healbell: [ '2S0' ], leechseed: [ '2S0' ], recover: [ '2S0' ] },
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
