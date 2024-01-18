export const Legality: {[k: string]: ModdedLearnsetData} = {
  bulbasaur: {
    learnset: {
      block: [ '5S3' ],
      celebrate: [ '6S5' ],
      falseswipe: [ '5S3' ],
      frenzyplant: [ '5S3' ],
      growl: [ '6S4', '6S5', '5S2', '3S1' ],
      growth: [ '3S0' ],
      leechseed: [ '6S4', '5S2', '3S1' ],
      poisonpowder: [ '6S4' ],
      solarbeam: [ '3S0' ],
      sweetscent: [ '3S0' ],
      synthesis: [ '3S0' ],
      tackle: [ '6S5', '5S2', '3S1' ],
      vinewhip: [ '6S4', '5S2', '3S1' ],
      weatherball: [ '5S3' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        moves: [ 'sweetscent', 'growth', 'solarbeam', 'synthesis' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'tackle', 'growl', 'leechseed', 'vinewhip' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'tackle', 'growl', 'leechseed', 'vinewhip' ]
      },
      {
        generation: 5,
        level: 1,
        shiny: 1,
        ivs: { def: 31 },
        moves: [ 'falseswipe', 'block', 'frenzyplant', 'weatherball' ],
        pokeball: 'pokeball'
      },
      {
        generation: 6,
        level: 5,
        moves: [ 'growl', 'leechseed', 'vinewhip', 'poisonpowder' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 5,
        isHidden: true,
        moves: [ 'tackle', 'growl', 'celebrate' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  venusaur: {
    learnset: {
      frenzyplant: [ '6S0' ],
      grasspledge: [ '6S0' ],
      solarbeam: [ '6S0' ],
      synthesis: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 100,
        isHidden: true,
        moves: [ 'solarbeam', 'frenzyplant', 'synthesis', 'grasspledge' ],
        pokeball: 'cherishball'
      }
    ]
  },
  charmander: {
    learnset: {
      acrobatics: [ '5S6' ],
      blastburn: [ '5S6' ],
      block: [ '5S6' ],
      celebrate: [ '6S8' ],
      dragonrage: [ '6S7' ],
      ember: [ '6S7', '5S4', '3S0' ],
      falseswipe: [ '5S6' ],
      growl: [ '6S7', '6S8', '5S4', '3S0' ],
      hiddenpower: [ '4S1', '4S2', '4S3', '4S5' ],
      howl: [ '4S1', '4S2', '4S3', '4S5' ],
      quickattack: [ '4S1', '4S2', '4S3', '4S5' ],
      return: [ '4S1', '4S2', '4S3', '4S5' ],
      scratch: [ '6S8', '5S4', '3S0' ],
      smokescreen: [ '6S7', '5S4' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'scratch', 'growl', 'ember' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 40,
        gender: 'M',
        nature: 'Mild',
        moves: [ 'return', 'hiddenpower', 'quickattack', 'howl' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 40,
        gender: 'M',
        nature: 'Naive',
        moves: [ 'return', 'hiddenpower', 'quickattack', 'howl' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 40,
        gender: 'M',
        nature: 'Naughty',
        moves: [ 'return', 'hiddenpower', 'quickattack', 'howl' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'scratch', 'growl', 'ember', 'smokescreen' ]
      },
      {
        generation: 4,
        level: 40,
        gender: 'M',
        nature: 'Hardy',
        moves: [ 'return', 'hiddenpower', 'quickattack', 'howl' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 1,
        shiny: 1,
        ivs: { spe: 31 },
        moves: [ 'falseswipe', 'block', 'blastburn', 'acrobatics' ],
        pokeball: 'pokeball'
      },
      {
        generation: 6,
        level: 5,
        moves: [ 'growl', 'ember', 'smokescreen', 'dragonrage' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 5,
        isHidden: true,
        moves: [ 'scratch', 'growl', 'celebrate' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  charizard: {
    learnset: {
      acrobatics: [ '9S11' ],
      airslash: [ '6S1', '6S2' ],
      bellydrum: [ '9S11' ],
      blastburn: [ '6S4' ],
      crunch: [ '9S11' ],
      dragonclaw: [ '7S6', '7S7', '6S2' ],
      dragondance: [ '7S9' ],
      dragonrage: [ '7S6', '7S7', '7S8', '6S2', '3S0' ],
      dragontail: [ '8S10' ],
      earthquake: [ '7S9' ],
      ember: [ '6S5' ],
      firefang: [ '6S1', '6S2' ],
      firepledge: [ '6S4' ],
      firespin: [ '6S5', '3S0' ],
      flameburst: [ '6S1', '6S5' ],
      flamethrower: [ '8S10', '7S8', '6S5' ],
      flareblitz: [ '9S11', '7S6', '7S7', '7S9', '6S4' ],
      fly: [ '7S6', '7S7', '7S9' ],
      focusblast: [ '6S3' ],
      holdhands: [ '6S3' ],
      inferno: [ '6S1' ],
      overheat: [ '6S3' ],
      scaryface: [ '6S4' ],
      seismictoss: [ '8S10', '7S8' ],
      slash: [ '8S10', '7S8', '3S0' ],
      solarbeam: [ '6S3' ],
      wingattack: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        moves: [ 'wingattack', 'slash', 'dragonrage', 'firespin' ],
        pokeball: 'pokeball'
      },
      {
        generation: 6,
        level: 36,
        gender: 'M',
        moves: [ 'firefang', 'flameburst', 'airslash', 'inferno' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 36,
        gender: 'M',
        moves: [ 'firefang', 'airslash', 'dragonclaw', 'dragonrage' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 36,
        shiny: true,
        gender: 'M',
        moves: [ 'overheat', 'solarbeam', 'focusblast', 'holdhands' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        isHidden: true,
        moves: [ 'flareblitz', 'blastburn', 'scaryface', 'firepledge' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 36,
        gender: 'M',
        nature: 'Serious',
        moves: [ 'flamethrower', 'ember', 'firespin', 'flameburst' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 40,
        nature: 'Jolly',
        moves: [ 'dragonclaw', 'dragonrage', 'fly', 'flareblitz' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 40,
        gender: 'M',
        nature: 'Jolly',
        moves: [ 'flareblitz', 'dragonclaw', 'fly', 'dragonrage' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 40,
        gender: 'M',
        nature: 'Adamant',
        moves: [ 'flamethrower', 'dragonrage', 'slash', 'seismictoss' ],
        pokeball: 'pokeball'
      },
      {
        generation: 7,
        level: 50,
        moves: [ 'dragondance', 'flareblitz', 'fly', 'earthquake' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 50,
        gender: 'M',
        nature: 'Adamant',
        moves: [ 'flamethrower', 'dragontail', 'slash', 'seismictoss' ],
        pokeball: 'pokeball'
      },
      {
        generation: 9,
        level: 50,
        nature: 'Adamant',
        ivs: { hp: 20, atk: 31, def: 20, spa: 20, spd: 20, spe: 31 },
        moves: [ 'crunch', 'flareblitz', 'acrobatics', 'bellydrum' ],
        pokeball: 'pokeball'
      }
    ]
  },
  squirtle: {
    learnset: {
      block: [ '5S2' ],
      bubble: [ '6S3', '5S1', '3S0' ],
      celebrate: [ '6S4' ],
      falseswipe: [ '5S2' ],
      followme: [ '5S2' ],
      hydrocannon: [ '5S2' ],
      tackle: [ '6S4', '5S1', '3S0' ],
      tailwhip: [ '6S3', '6S4', '5S1', '3S0' ],
      watergun: [ '6S3' ],
      withdraw: [ '6S3', '5S1', '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'tackle', 'tailwhip', 'bubble', 'withdraw' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'tackle', 'tailwhip', 'bubble', 'withdraw' ]
      },
      {
        generation: 5,
        level: 1,
        shiny: 1,
        ivs: { hp: 31 },
        moves: [ 'falseswipe', 'block', 'hydrocannon', 'followme' ],
        pokeball: 'pokeball'
      },
      {
        generation: 6,
        level: 5,
        moves: [ 'tailwhip', 'watergun', 'withdraw', 'bubble' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 5,
        isHidden: true,
        moves: [ 'tackle', 'tailwhip', 'celebrate' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  blastoise: {
    learnset: {
      hydrocannon: [ '6S1' ],
      hydropump: [ '6S1', '3S0' ],
      irondefense: [ '6S1' ],
      protect: [ '3S0' ],
      raindance: [ '3S0' ],
      skullbash: [ '3S0' ],
      waterpledge: [ '6S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        moves: [ 'protect', 'raindance', 'skullbash', 'hydropump' ],
        pokeball: 'pokeball'
      },
      {
        generation: 6,
        level: 100,
        isHidden: true,
        moves: [ 'hydropump', 'hydrocannon', 'irondefense', 'waterpledge' ],
        pokeball: 'cherishball'
      }
    ]
  },
  caterpie: {
    encounters: [
      { generation: 1, level: 3 },
      { generation: 2, level: 3 },
      { generation: 3, level: 3 }
    ]
  },
  metapod: {
    encounters: [
      { generation: 1, level: 4 },
      { generation: 2, level: 4 },
      { generation: 3, level: 4 },
      { generation: 4, level: 3 },
      { generation: 6, level: 4 },
      { generation: 7, level: 3 }
    ]
  },
  butterfree: {
    learnset: {
      aerialace: [ '3S0' ],
      morningsun: [ '3S0' ],
      psychic: [ '3S0' ],
      sleeppowder: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 30,
        moves: [ 'morningsun', 'psychic', 'sleeppowder', 'aerialace' ]
      }
    ],
    encounters: [
      { generation: 2, level: 7 },
      { generation: 4, level: 6 },
      { generation: 7, level: 9 }
    ]
  },
  weedle: {
    encounters: [
      { generation: 1, level: 3 },
      { generation: 2, level: 3 },
      { generation: 3, level: 3 }
    ]
  },
  kakuna: {
    encounters: [
      { generation: 1, level: 4 },
      { generation: 2, level: 4 },
      { generation: 3, level: 4 },
      { generation: 4, level: 3 },
      { generation: 6, level: 4 },
      { generation: 7, level: 3 }
    ]
  },
  beedrill: {
    learnset: {
      batonpass: [ '3S0' ],
      sludgebomb: [ '3S0' ],
      swordsdance: [ '3S0' ],
      twineedle: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 30,
        moves: [ 'batonpass', 'sludgebomb', 'twineedle', 'swordsdance' ]
      }
    ],
    encounters: [ { generation: 2, level: 7 }, { generation: 4, level: 6 } ]
  },
  pidgey: {
    encounters: [
      { generation: 1, level: 2 },
      { generation: 2, level: 2 },
      { generation: 3, level: 2 }
    ]
  },
  pidgeotto: {
    learnset: {
      featherdance: [ '3S0' ],
      refresh: [ '3S0' ],
      steelwing: [ '3S0' ],
      wingattack: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 30,
        abilities: [ 'keeneye' ],
        moves: [ 'refresh', 'wingattack', 'steelwing', 'featherdance' ]
      }
    ],
    encounters: [
      { generation: 1, level: 9 },
      { generation: 2, level: 7 },
      { generation: 3, level: 7 },
      { generation: 4, level: 7 }
    ]
  },
  pidgeot: {
    learnset: {
      mirrormove: [ '5S0' ],
      skyattack: [ '5S0' ],
      whirlwind: [ '5S0' ],
      wingattack: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 61,
        gender: 'M',
        nature: 'Naughty',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        abilities: [ 'keeneye' ],
        moves: [ 'whirlwind', 'wingattack', 'skyattack', 'mirrormove' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 7, level: 29 } ]
  },
  rattata: {
    encounters: [
      { generation: 1, level: 2 },
      { generation: 2, level: 2 },
      { generation: 3, level: 2 }
    ]
  },
  raticate: {
    learnset: {
      hyperfang: [ '3S0' ],
      refresh: [ '3S0' ],
      scaryface: [ '3S0' ],
      superfang: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 34,
        moves: [ 'refresh', 'superfang', 'scaryface', 'hyperfang' ]
      }
    ],
    encounters: [
      { generation: 1, level: 15 },
      { generation: 2, level: 6 },
      { generation: 4, level: 13 }
    ]
  },
  raticatealola: { encounters: [ { generation: 7, level: 17 } ] },
  raticatealolatotem: {
    learnset: { assurance: [ '7S0' ], bite: [ '7S0' ], hyperfang: [ '7S0' ], pursuit: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 20,
        perfectIVs: 3,
        moves: [ 'bite', 'pursuit', 'hyperfang', 'assurance' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  spearow: {
    learnset: { aerialace: [ '3S0' ], batonpass: [ '3S0' ], falseswipe: [ '3S0' ], leer: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 22,
        moves: [ 'batonpass', 'falseswipe', 'leer', 'aerialace' ]
      }
    ],
    encounters: [
      { generation: 1, level: 3 },
      { generation: 2, level: 2 },
      { generation: 3, level: 3 }
    ]
  },
  fearow: {
    encounters: [
      { generation: 1, level: 19 },
      { generation: 2, level: 7 },
      { generation: 4, level: 7 }
    ]
  },
  ekans: {
    learnset: {
      bite: [ '3S0' ],
      leer: [ '3S0', '3S1' ],
      poisonsting: [ '3S0', '3S1' ],
      wrap: [ '3S0', '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 14,
        gender: 'F',
        nature: 'Docile',
        ivs: { hp: 26, atk: 28, def: 6, spa: 14, spd: 30, spe: 11 },
        abilities: [ 'shedskin' ],
        moves: [ 'leer', 'wrap', 'poisonsting', 'bite' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'wrap', 'leer', 'poisonsting' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 1, level: 6 }, { generation: 2, level: 4 } ]
  },
  arbok: {
    learnset: { bite: [ '3S0' ], glare: [ '3S0' ], refresh: [ '3S0' ], sludgebomb: [ '3S0' ] },
    eventData: [ { generation: 3, level: 33, moves: [ 'refresh', 'sludgebomb', 'glare', 'bite' ] } ],
    encounters: [ { generation: 2, level: 10 }, { generation: 4, level: 10 } ]
  },
  pichu: {
    learnset: {
      charge: [ '9S6', '4S5' ],
      charm: [ '3S0', '3S1', '3S2', '3S3' ],
      endeavor: [ '4S5' ],
      endure: [ '9S6', '4S5' ],
      followme: [ '3S3' ],
      grassknot: [ '4S4' ],
      helpinghand: [ '9S6' ],
      return: [ '4S4' ],
      surf: [ '3S0' ],
      teeterdance: [ '3S2' ],
      thunderbolt: [ '4S4' ],
      thundershock: [ '3S0', '3S1', '3S2', '3S3' ],
      volttackle: [ '9S6', '4S4', '4S5' ],
      wish: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'thundershock', 'charm', 'surf' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      },
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'thundershock', 'charm', 'wish' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'thundershock', 'charm', 'teeterdance' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'thundershock', 'charm', 'followme' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      },
      {
        generation: 4,
        level: 1,
        moves: [ 'volttackle', 'thunderbolt', 'grassknot', 'return' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 30,
        shiny: true,
        gender: 'M',
        nature: 'Jolly',
        moves: [ 'charge', 'volttackle', 'endeavor', 'endure' ],
        pokeball: 'cherishball'
      },
      {
        generation: 9,
        level: 30,
        shiny: true,
        gender: 'M',
        nature: 'Jolly',
        moves: [ 'charge', 'volttackle', 'endure', 'helpinghand' ],
        pokeball: 'cherishball'
      }
    ]
  },
  pichuspikyeared: {
    learnset: {
      helpinghand: [ '4S0' ],
      painsplit: [ '4S0' ],
      swagger: [ '4S0' ],
      volttackle: [ '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 30,
        gender: 'F',
        nature: 'Naughty',
        moves: [ 'helpinghand', 'volttackle', 'swagger', 'painsplit' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  pikachu: {
    learnset: {
      agility: [ '6S41', '3S0', '3S8' ],
      bestow: [ '7S44', '6S42' ],
      brickbreak: [ '5S26' ],
      celebrate: [
        '9S55', '8S50',
        '8S51', '8S52',
        '7S43', '7S48',
        '6S31', '6S41'
      ],
      charm: [ '6S36' ],
      counter: [ '7S48' ],
      discharge: [ '7S47' ],
      doubleteam: [ '6S32', '4S13' ],
      electroball: [ '8S52', '6S32', '6S37', '5S23', '5S24', '5S30' ],
      encore: [ '8S52', '6S39', '5S23' ],
      endeavor: [ '6S39' ],
      extremespeed: [ '5S26' ],
      fakeout: [ '6S39' ],
      feint: [ '5S29' ],
      flash: [ '6S40', '4S13' ],
      fly: [
        '9S53', '7S49',
        '6S41', '5S24',
        '5S27', '3S2',
        '3S4',  '3S6'
      ],
      grassknot: [ '5S25', '5S26', '5S27', '4S13' ],
      growl: [
        '7S43', '7S46',
        '6S31', '3S1',
        '3S2',  '3S3',
        '3S4',  '3S5',
        '3S10'
      ],
      happyhour: [ '7S45', '7S46', '6S40' ],
      headbutt: [ '5S28' ],
      heartstamp: [ '6S34' ],
      holdhands: [
        '7S44', '7S45',
        '6S33', '6S34',
        '6S35', '6S40',
        '6S42'
      ],
      irontail: [ '9S54', '6S37', '5S24', '5S30', '4S21' ],
      lastresort: [ '4S18' ],
      lightscreen: [ '4S11', '3S0', '3S6', '3S7', '3S8' ],
      megakick: [ '6S32' ],
      nuzzle: [ '7S47', '6S36', '6S38' ],
      playnice: [
        '9S55', '8S50',
        '7S43', '7S44',
        '7S45', '6S31',
        '6S35', '6S36',
        '6S38', '6S40',
        '6S42'
      ],
      playrough: [ '9S54' ],
      present: [
        '9S55', '4S12',
        '4S15', '4S17',
        '4S18', '4S20',
        '4S22'
      ],
      protect: [ '5S27', '4S14', '4S16' ],
      quickattack: [
        '9S53', '8S50', '7S43',
        '7S46', '7S49', '6S31',
        '6S32', '6S33', '6S34',
        '6S37', '5S24', '5S25',
        '5S29', '5S30', '4S11',
        '4S12', '4S15', '4S17',
        '4S18', '4S20', '4S21',
        '4S22'
      ],
      refresh: [ '7S48' ],
      rest: [ '4S19' ],
      return: [ '7S44', '6S42' ],
      sing: [ '8S52', '5S23' ],
      slam: [ '7S47' ],
      sleeptalk: [ '4S19' ],
      snore: [ '4S19' ],
      substitute: [ '6S35' ],
      surf: [
        '9S54', '7S47', '7S49',
        '6S33', '6S41', '4S9',
        '4S11', '4S14', '4S16',
        '3S3',  '3S5',  '3S7'
      ],
      sweetkiss: [ '6S36' ],
      sweetscent: [ '7S48' ],
      swift: [ '8S51' ],
      tailwhip: [
        '9S53', '6S38', '5S28',
        '4S9',  '4S12', '4S15',
        '4S17', '4S20', '4S22',
        '3S1',  '3S2',  '3S3',
        '3S4',  '3S10'
      ],
      teeterdance: [ '7S45', '6S38', '5S23' ],
      thunder: [
        '9S54', '6S35',
        '5S25', '4S14',
        '4S16', '3S0',
        '3S6',  '3S7',
        '3S8'
      ],
      thunderbolt: [
        '9S55', '8S51', '7S49',
        '6S33', '6S34', '6S37',
        '5S26', '5S27', '5S30',
        '4S11', '4S13', '4S18',
        '4S21', '3S0',  '3S6',
        '3S7',  '3S8'
      ],
      thundershock: [
        '9S53', '8S50',
        '7S46', '5S28',
        '4S12', '4S15',
        '4S20', '4S22',
        '3S1',  '3S5',
        '3S10'
      ],
      thunderwave: [
        '5S28', '4S9',
        '4S17', '3S1',
        '3S2',  '3S3',
        '3S4',  '3S5',
        '3S10'
      ],
      voltswitch: [ '5S29' ],
      volttackle: [ '6S39', '5S25', '5S29', '4S9', '4S21' ],
      wish: [ '8S51' ],
      yawn: [ '4S19' ]
    },
    eventData: [
      {
        generation: 3,
        level: 50,
        moves: [ 'thunderbolt', 'agility', 'thunder', 'lightscreen' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        moves: [ 'thundershock', 'growl', 'tailwhip', 'thunderwave' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        moves: [ 'fly', 'tailwhip', 'growl', 'thunderwave' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        moves: [ 'surf', 'growl', 'tailwhip', 'thunderwave' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        moves: [ 'fly', 'growl', 'tailwhip', 'thunderwave' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        moves: [ 'thundershock', 'growl', 'thunderwave', 'surf' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'thunderbolt', 'thunder', 'lightscreen', 'fly' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'thunderbolt', 'thunder', 'lightscreen', 'surf' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'thunderbolt', 'thunder', 'lightscreen', 'agility' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 10,
        gender: 'F',
        nature: 'Hardy',
        moves: [ 'surf', 'volttackle', 'tailwhip', 'thunderwave' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'thundershock', 'growl', 'tailwhip', 'thunderwave' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Hardy',
        moves: [ 'surf', 'thunderbolt', 'lightscreen', 'quickattack' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 20,
        gender: 'F',
        nature: 'Bashful',
        moves: [ 'present', 'quickattack', 'thundershock', 'tailwhip' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 20,
        gender: 'M',
        nature: 'Jolly',
        moves: [ 'grassknot', 'thunderbolt', 'flash', 'doubleteam' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 40,
        gender: 'M',
        nature: 'Modest',
        moves: [ 'surf', 'thunder', 'protect' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 20,
        gender: 'F',
        nature: 'Bashful',
        moves: [ 'quickattack', 'thundershock', 'tailwhip', 'present' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 40,
        gender: 'M',
        nature: 'Mild',
        moves: [ 'surf', 'thunder', 'protect' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 20,
        gender: 'F',
        nature: 'Bashful',
        moves: [ 'present', 'quickattack', 'thunderwave', 'tailwhip' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 30,
        gender: 'M',
        nature: 'Naughty',
        moves: [ 'lastresort', 'present', 'thunderbolt', 'quickattack' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Relaxed',
        moves: [ 'rest', 'sleeptalk', 'yawn', 'snore' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 20,
        gender: 'M',
        nature: 'Docile',
        moves: [ 'present', 'quickattack', 'thundershock', 'tailwhip' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Naughty',
        moves: [ 'volttackle', 'irontail', 'quickattack', 'thunderbolt' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 20,
        gender: 'M',
        nature: 'Bashful',
        moves: [ 'present', 'quickattack', 'thundershock', 'tailwhip' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 30,
        gender: 'F',
        isHidden: true,
        moves: [ 'sing', 'teeterdance', 'encore', 'electroball' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        moves: [ 'fly', 'irontail', 'electroball', 'quickattack' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 100,
        shiny: 1,
        gender: 'F',
        moves: [ 'thunder', 'volttackle', 'grassknot', 'quickattack' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        shiny: 1,
        gender: 'F',
        moves: [ 'extremespeed', 'thunderbolt', 'grassknot', 'brickbreak' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        gender: 'F',
        nature: 'Timid',
        isHidden: true,
        moves: [ 'fly', 'thunderbolt', 'grassknot', 'protect' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'thundershock', 'tailwhip', 'thunderwave', 'headbutt' ]
      },
      {
        generation: 5,
        level: 100,
        gender: 'M',
        isHidden: true,
        moves: [ 'volttackle', 'quickattack', 'feint', 'voltswitch' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        gender: 'M',
        nature: 'Brave',
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroball' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'celebrate', 'growl', 'playnice', 'quickattack' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 22,
        moves: [ 'quickattack', 'electroball', 'doubleteam', 'megakick' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'thunderbolt', 'quickattack', 'surf', 'holdhands' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        gender: 'F',
        moves: [ 'thunderbolt', 'quickattack', 'heartstamp', 'holdhands' ],
        pokeball: 'healball'
      },
      {
        generation: 6,
        level: 36,
        shiny: true,
        isHidden: true,
        moves: [ 'thunder', 'substitute', 'playnice', 'holdhands' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        gender: 'F',
        moves: [ 'playnice', 'charm', 'nuzzle', 'sweetkiss' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        gender: 'M',
        nature: 'Naughty',
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroball' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        shiny: true,
        moves: [ 'teeterdance', 'playnice', 'tailwhip', 'nuzzle' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        perfectIVs: 2,
        isHidden: true,
        moves: [ 'fakeout', 'encore', 'volttackle', 'endeavor' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 99,
        moves: [ 'happyhour', 'playnice', 'holdhands', 'flash' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'fly', 'surf', 'agility', 'celebrate' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'bestow', 'holdhands', 'return', 'playnice' ],
        pokeball: 'healball'
      },
      {
        generation: 7,
        level: 10,
        nature: 'Jolly',
        moves: [ 'celebrate', 'growl', 'playnice', 'quickattack' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 10,
        moves: [ 'bestow', 'holdhands', 'return', 'playnice' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 10,
        moves: [ 'holdhands', 'playnice', 'teeterdance', 'happyhour' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 10,
        moves: [ 'growl', 'quickattack', 'thundershock', 'happyhour' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 40,
        shiny: 1,
        perfectIVs: 3,
        moves: [ 'nuzzle', 'discharge', 'slam', 'surf' ],
        pokeball: 'pokeball'
      },
      {
        generation: 7,
        level: 5,
        moves: [ 'celebrate', 'sweetscent', 'counter', 'refresh' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 10,
        moves: [ 'fly', 'surf', 'thunderbolt', 'quickattack' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 5,
        gender: 'M',
        nature: 'Serious',
        moves: [ 'celebrate', 'playnice', 'thundershock', 'quickattack' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 21,
        gender: 'M',
        nature: 'Brave',
        moves: [ 'thunderbolt', 'swift', 'wish', 'celebrate' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 25,
        isHidden: true,
        moves: [ 'sing', 'encore', 'celebrate', 'electroball' ],
        pokeball: 'cherishball'
      },
      {
        generation: 9,
        level: 5,
        moves: [ 'fly', 'tailwhip', 'thundershock', 'quickattack' ],
        pokeball: 'pokeball'
      },
      {
        generation: 9,
        level: 100,
        gender: 'M',
        nature: 'Quiet',
        perfectIVs: 6,
        isHidden: true,
        moves: [ 'thunder', 'surf', 'playrough', 'irontail' ],
        pokeball: 'pokeball'
      },
      {
        generation: 9,
        level: 25,
        gender: 'M',
        ivs: { hp: 25, atk: 25, def: 25, spa: 25, spd: 25, spe: 25 },
        moves: [ 'celebrate', 'playnice', 'present', 'thunderbolt' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [
      { generation: 1, level: 3 },
      { generation: 2, level: 4 },
      { generation: 3, level: 3 }
    ]
  },
  pikachucosplay: {
    learnset: {
      electroball: [ '6S0' ],
      quickattack: [ '6S0' ],
      thundershock: [ '6S0' ],
      thunderwave: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 20,
        perfectIVs: 3,
        moves: [ 'quickattack', 'electroball', 'thunderwave', 'thundershock' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  pikachurockstar: { eventOnly: true },
  pikachubelle: { eventOnly: true },
  pikachupopstar: { eventOnly: true },
  pikachuphd: { eventOnly: true },
  pikachulibre: { eventOnly: true },
  pikachuoriginal: {
    learnset: {
      agility: [ '7S0' ],
      electroweb: [ '8S1' ],
      irontail: [ '8S1' ],
      quickattack: [ '8S1', '7S0' ],
      thunder: [ '7S0' ],
      thunderbolt: [ '8S1', '7S0' ],
      volttackle: [ '8S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 1,
        nature: 'Hardy',
        moves: [ 'thunderbolt', 'quickattack', 'thunder', 'agility' ],
        pokeball: 'pokeball'
      },
      {
        generation: 8,
        level: 25,
        nature: 'Hardy',
        isHidden: true,
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroweb', 'volttackle' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  pikachuhoenn: {
    learnset: {
      electroweb: [ '8S1' ],
      irontail: [ '8S1', '7S0' ],
      quickattack: [ '8S1', '7S0' ],
      thunder: [ '7S0' ],
      thunderbolt: [ '8S1', '7S0' ],
      volttackle: [ '8S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 6,
        nature: 'Hardy',
        moves: [ 'thunderbolt', 'quickattack', 'thunder', 'irontail' ],
        pokeball: 'pokeball'
      },
      {
        generation: 8,
        level: 25,
        nature: 'Hardy',
        isHidden: true,
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroweb', 'volttackle' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  pikachusinnoh: {
    learnset: {
      electroweb: [ '8S1' ],
      irontail: [ '8S1', '7S0' ],
      quickattack: [ '8S1', '7S0' ],
      thunderbolt: [ '8S1', '7S0' ],
      volttackle: [ '8S1', '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 10,
        nature: 'Hardy',
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'volttackle' ],
        pokeball: 'pokeball'
      },
      {
        generation: 8,
        level: 25,
        nature: 'Hardy',
        isHidden: true,
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroweb', 'volttackle' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  pikachuunova: {
    learnset: {
      electroweb: [ '8S1' ],
      irontail: [ '8S1', '7S0' ],
      quickattack: [ '8S1', '7S0' ],
      thunderbolt: [ '8S1', '7S0' ],
      volttackle: [ '8S1', '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 14,
        nature: 'Hardy',
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'volttackle' ],
        pokeball: 'pokeball'
      },
      {
        generation: 8,
        level: 25,
        nature: 'Hardy',
        isHidden: true,
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroweb', 'volttackle' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  pikachukalos: {
    learnset: {
      electroball: [ '7S0' ],
      electroweb: [ '8S1' ],
      irontail: [ '8S1', '7S0' ],
      quickattack: [ '8S1', '7S0' ],
      thunderbolt: [ '8S1', '7S0' ],
      volttackle: [ '8S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 17,
        nature: 'Hardy',
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroball' ],
        pokeball: 'pokeball'
      },
      {
        generation: 8,
        level: 25,
        nature: 'Hardy',
        isHidden: true,
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroweb', 'volttackle' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  pikachualola: {
    learnset: {
      electroball: [ '7S0' ],
      electroweb: [ '8S1' ],
      irontail: [ '8S1', '7S0' ],
      quickattack: [ '8S1', '7S0' ],
      thunderbolt: [ '8S1', '7S0' ],
      volttackle: [ '8S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 20,
        nature: 'Hardy',
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroball' ],
        pokeball: 'pokeball'
      },
      {
        generation: 8,
        level: 25,
        nature: 'Hardy',
        isHidden: true,
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroweb', 'volttackle' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  pikachupartner: {
    learnset: {
      electroweb: [ '8S1' ],
      irontail: [ '8S1', '7S0' ],
      quickattack: [ '8S1', '7S0' ],
      thunder: [ '7S0' ],
      thunderbolt: [ '8S1', '7S0' ],
      volttackle: [ '8S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 21,
        shiny: 1,
        nature: 'Hardy',
        moves: [ 'thunderbolt', 'quickattack', 'thunder', 'irontail' ],
        pokeball: 'pokeball'
      },
      {
        generation: 8,
        level: 25,
        nature: 'Hardy',
        isHidden: true,
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroweb', 'volttackle' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  pikachustarter: {
    learnset: { growl: [ '7S0' ], tailwhip: [ '7S0' ], thundershock: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 5,
        perfectIVs: 6,
        moves: [ 'thundershock', 'tailwhip', 'growl' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  pikachuworld: {
    learnset: {
      electroweb: [ '8S1', '8S0' ],
      irontail: [ '8S1', '8S0' ],
      quickattack: [ '8S1', '8S0' ],
      thunderbolt: [ '8S1', '8S0' ],
      volttackle: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 25,
        nature: 'Hardy',
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroweb', 'volttackle' ],
        pokeball: 'pokeball'
      },
      {
        generation: 8,
        level: 80,
        nature: 'Hardy',
        ivs: { hp: 31, atk: 30, def: 30, spa: 31, spd: 30, spe: 31 },
        moves: [ 'thunderbolt', 'quickattack', 'irontail', 'electroweb' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  sandshrew: {
    learnset: {
      defensecurl: [ '3S0' ],
      poisonsting: [ '3S0' ],
      sandattack: [ '3S0' ],
      scratch: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 12,
        gender: 'M',
        nature: 'Docile',
        ivs: { hp: 4, atk: 23, def: 8, spa: 31, spd: 1, spe: 25 },
        moves: [ 'scratch', 'defensecurl', 'sandattack', 'poisonsting' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 1, level: 6 } ]
  },
  sandshrewalola: {
    learnset: { bide: [ '7S0' ], iceball: [ '7S0' ], powdersnow: [ '7S0' ], rapidspin: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 10,
        moves: [ 'rapidspin', 'iceball', 'powdersnow', 'bide' ],
        pokeball: 'cherishball'
      }
    ]
  },
  sandslash: { encounters: [ { generation: 2, level: 10 }, { generation: 4, level: 10 } ] },
  nidoranf: { encounters: [ { generation: 1, level: 2 } ] },
  nidorina: { encounters: [ { generation: 4, level: 15, pokeball: 'safariball' } ] },
  nidoqueen: {
    learnset: {
      bodyslam: [ '6S0' ],
      doublekick: [ '6S0' ],
      poisonsting: [ '6S0' ],
      tailwhip: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 41,
        perfectIVs: 2,
        abilities: [ 'poisonpoint' ],
        moves: [ 'tailwhip', 'doublekick', 'poisonsting', 'bodyslam' ],
        pokeball: 'cherishball'
      }
    ]
  },
  nidoranm: { encounters: [ { generation: 1, level: 2 } ] },
  nidorino: { encounters: [ { generation: 4, level: 15, pokeball: 'safariball' } ] },
  nidoking: {
    learnset: {
      aquatail: [ '7S0' ],
      earthquake: [ '7S0' ],
      poisonjab: [ '7S0' ],
      throatchop: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 68,
        abilities: [ 'poisonpoint' ],
        moves: [ 'earthquake', 'poisonjab', 'throatchop', 'aquatail' ],
        pokeball: 'cherishball'
      }
    ]
  },
  clefairy: {
    learnset: {
      followme: [ '8S0' ],
      helpinghand: [ '8S0' ],
      icywind: [ '8S0' ],
      metronome: [ '8S1' ],
      moonblast: [ '8S1' ],
      moonlight: [ '8S1' ],
      protect: [ '8S0' ],
      zenheadbutt: [ '8S1' ]
    },
    eventData: [
      {
        generation: 8,
        level: 50,
        gender: 'F',
        shiny: true,
        nature: 'Bold',
        isHidden: true,
        ivs: { hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 31 },
        moves: [ 'followme', 'icywind', 'helpinghand', 'protect' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 15,
        gender: 'M',
        nature: 'Modest',
        abilities: [ 'cutecharm' ],
        moves: [ 'metronome', 'moonblast', 'zenheadbutt', 'moonlight' ],
        pokeball: 'moonball'
      }
    ],
    encounters: [ { generation: 1, level: 8 } ]
  },
  vulpix: {
    learnset: {
      charm: [ '3S1' ],
      dig: [ '3S1' ],
      ember: [ '3S1' ],
      heatwave: [ '3S1' ],
      quickattack: [ '3S0' ],
      roar: [ '3S0' ],
      tailwhip: [ '3S0' ],
      willowisp: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 18,
        gender: 'F',
        nature: 'Quirky',
        ivs: { hp: 15, atk: 6, def: 3, spa: 25, spd: 13, spe: 22 },
        moves: [ 'tailwhip', 'roar', 'quickattack', 'willowisp' ],
        pokeball: 'pokeball'
      },
      { generation: 3, level: 18, moves: [ 'charm', 'heatwave', 'ember', 'dig' ] }
    ],
    encounters: [ { generation: 1, level: 18 } ]
  },
  vulpixalola: {
    learnset: {
      babydolleyes: [ '7S0' ],
      celebrate: [ '7S0' ],
      iceshard: [ '7S0' ],
      powdersnow: [ '7S1' ],
      tailwhip: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 10,
        moves: [ 'celebrate', 'tailwhip', 'babydolleyes', 'iceshard' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 10,
        gender: 'F',
        nature: 'Modest',
        moves: [ 'powdersnow' ],
        pokeball: 'cherishball'
      }
    ]
  },
  ninetales: {
    learnset: {
      heatwave: [ '5S0' ],
      psyshock: [ '5S0' ],
      solarbeam: [ '5S0' ],
      willowisp: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 50,
        gender: 'M',
        nature: 'Bold',
        ivs: { def: 31 },
        isHidden: true,
        moves: [ 'heatwave', 'solarbeam', 'psyshock', 'willowisp' ],
        pokeball: 'cherishball'
      }
    ]
  },
  igglybuff: {
    learnset: { charm: [ '3S0' ], defensecurl: [ '3S0' ], sing: [ '3S0' ], tickle: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        abilities: [ 'cutecharm' ],
        moves: [ 'sing', 'charm', 'defensecurl', 'tickle' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      }
    ]
  },
  jigglypuff: {
    encounters: [
      { generation: 1, level: 3 },
      { generation: 2, level: 3 },
      { generation: 3, level: 3 }
    ]
  },
  wigglytuff: { encounters: [ { generation: 1, level: 22 } ] },
  zubat: { encounters: [ { generation: 1, level: 6 }, { generation: 2, level: 2 } ] },
  golbat: {
    encounters: [
      { generation: 2, level: 13 },
      { generation: 3, level: 5 },
      { generation: 4, level: 10 },
      { generation: 6, level: 19, maxEggMoves: 1 },
      { generation: 7, level: 20 }
    ]
  },
  crobat: {
    learnset: {
      airslash: [ '7S1', '4S0' ],
      darkpulse: [ '7S1' ],
      heatwave: [ '4S0' ],
      sludgebomb: [ '7S1', '4S0' ],
      superfang: [ '4S0' ],
      toxic: [ '7S1' ]
    },
    eventData: [
      {
        generation: 4,
        level: 30,
        gender: 'M',
        nature: 'Timid',
        moves: [ 'heatwave', 'airslash', 'sludgebomb', 'superfang' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 64,
        gender: 'M',
        moves: [ 'airslash', 'toxic', 'darkpulse', 'sludgebomb' ],
        pokeball: 'cherishball'
      }
    ]
  },
  oddish: {
    learnset: {
      absorb: [ '3S1' ],
      acid: [ '3S0' ],
      leechseed: [ '3S1' ],
      poisonpowder: [ '3S0' ],
      sleeppowder: [ '3S0' ],
      stunspore: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 26,
        gender: 'M',
        nature: 'Quirky',
        ivs: { hp: 23, atk: 24, def: 20, spa: 21, spd: 9, spe: 16 },
        moves: [ 'poisonpowder', 'stunspore', 'sleeppowder', 'acid' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'absorb', 'leechseed' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 1, level: 12 } ]
  },
  gloom: {
    learnset: {
      acid: [ '3S0' ],
      moonlight: [ '3S0' ],
      petaldance: [ '3S0' ],
      sleeppowder: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 50,
        moves: [ 'sleeppowder', 'acid', 'moonlight', 'petaldance' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [
      { generation: 2, level: 14 },
      { generation: 4, level: 14 },
      { generation: 6, level: 18, maxEggMoves: 1 }
    ]
  },
  paras: {
    learnset: { falseswipe: [ '3S0' ], refresh: [ '3S0' ], slash: [ '3S0' ], spore: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 28,
        abilities: [ 'effectspore' ],
        moves: [ 'refresh', 'spore', 'slash', 'falseswipe' ]
      }
    ],
    encounters: [ { generation: 1, level: 8 } ]
  },
  parasect: { encounters: [ { generation: 1, level: 13 }, { generation: 2, level: 5 } ] },
  venonat: { encounters: [ { generation: 1, level: 13 } ] },
  venomoth: {
    learnset: {
      psychic: [ '3S0' ],
      refresh: [ '3S0' ],
      silverwind: [ '3S0' ],
      substitute: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 32,
        abilities: [ 'shielddust' ],
        moves: [ 'refresh', 'silverwind', 'substitute', 'psychic' ]
      }
    ],
    encounters: [
      { generation: 1, level: 30 },
      { generation: 2, level: 10 },
      { generation: 4, level: 8 },
      { generation: 6, level: 30 }
    ]
  },
  diglett: { encounters: [ { generation: 1, level: 15 }, { generation: 2, level: 2 } ] },
  diglettalola: {
    learnset: { astonish: [ '7S0' ], growl: [ '7S0' ], metalclaw: [ '7S0' ], mudslap: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 10,
        abilities: [ 'tanglinghair' ],
        moves: [ 'mudslap', 'astonish', 'growl', 'metalclaw' ],
        pokeball: 'cherishball'
      }
    ]
  },
  dugtrio: {
    learnset: { charm: [ '3S0' ], earthquake: [ '3S0' ], sandstorm: [ '3S0' ], triattack: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 40,
        moves: [ 'charm', 'earthquake', 'sandstorm', 'triattack' ]
      }
    ],
    encounters: [
      { generation: 1, level: 15 },
      { generation: 2, level: 5 },
      { generation: 4, level: 19 }
    ]
  },
  meowth: {
    learnset: {
      assist: [ '4S5' ],
      bite: [ '6S7', '4S4', '3S2', '3S3' ],
      fakeout: [ '6S7', '4S4', '4S5' ],
      furyswipes: [ '5S6', '4S4' ],
      growl: [ '3S0', '3S1', '3S2' ],
      happyhour: [ '6S7' ],
      nastyplot: [ '5S6' ],
      payday: [ '4S5', '3S3' ],
      petaldance: [ '3S0' ],
      scratch: [ '4S5', '3S0', '3S1', '3S2' ],
      screech: [ '6S7', '4S4' ],
      sing: [ '5S6', '3S3' ],
      slash: [ '3S3' ],
      snatch: [ '5S6' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'scratch', 'growl', 'petaldance' ],
        pokeball: 'pokeball'
      },
      { generation: 3, level: 5, moves: [ 'scratch', 'growl' ], pokeball: 'pokeball' },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'scratch', 'growl', 'bite' ],
        pokeball: 'pokeball'
      },
      { generation: 3, level: 22, moves: [ 'sing', 'slash', 'payday', 'bite' ] },
      {
        generation: 4,
        level: 21,
        gender: 'F',
        nature: 'Jolly',
        abilities: [ 'pickup' ],
        moves: [ 'bite', 'fakeout', 'furyswipes', 'screech' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 10,
        gender: 'M',
        nature: 'Jolly',
        abilities: [ 'pickup' ],
        moves: [ 'fakeout', 'payday', 'assist', 'scratch' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 15,
        gender: 'M',
        abilities: [ 'pickup' ],
        moves: [ 'furyswipes', 'sing', 'nastyplot', 'snatch' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 20,
        abilities: [ 'pickup' ],
        moves: [ 'happyhour', 'screech', 'bite', 'fakeout' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [
      { generation: 1, level: 10 },
      {
        generation: 3,
        level: 3,
        gender: 'M',
        nature: 'Naive',
        ivs: { hp: 4, atk: 5, def: 4, spa: 5, spd: 4, spe: 4 },
        abilities: [ 'pickup' ],
        pokeball: 'pokeball'
      }
    ]
  },
  meowthgalar: {
    learnset: { fakeout: [ '8S0' ], growl: [ '8S0' ], honeclaws: [ '8S0' ], payday: [ '8S0' ] },
    eventData: [
      {
        generation: 8,
        level: 15,
        isHidden: true,
        moves: [ 'fakeout', 'growl', 'honeclaws', 'payday' ],
        pokeball: 'cherishball'
      }
    ]
  },
  persian: { encounters: [ { generation: 2, level: 18 }, { generation: 4, level: 19 } ] },
  psyduck: {
    learnset: {
      confusion: [ '3S0' ],
      disable: [ '3S0' ],
      mudsport: [ '3S1' ],
      scratch: [ '3S1' ],
      screech: [ '3S0' ],
      tailwhip: [ '3S0', '3S1' ],
      watersport: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 27,
        gender: 'M',
        nature: 'Lax',
        ivs: { hp: 31, atk: 16, def: 12, spa: 29, spd: 31, spe: 14 },
        abilities: [ 'damp' ],
        moves: [ 'tailwhip', 'confusion', 'disable', 'screech' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'watersport', 'scratch', 'tailwhip', 'mudsport' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      }
    ],
    encounters: [ { generation: 1, level: 15 } ]
  },
  golduck: {
    learnset: {
      brickbreak: [ '3S0' ],
      charm: [ '3S0' ],
      encore: [ '7S1' ],
      hydropump: [ '7S1' ],
      protect: [ '7S1' ],
      psychup: [ '3S0' ],
      scald: [ '7S1' ],
      waterfall: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 33,
        moves: [ 'charm', 'waterfall', 'psychup', 'brickbreak' ]
      },
      {
        generation: 7,
        level: 50,
        gender: 'M',
        nature: 'Timid',
        ivs: { hp: 31, atk: 30, def: 31, spa: 31, spd: 31, spe: 31 },
        isHidden: true,
        moves: [ 'hydropump', 'scald', 'encore', 'protect' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [
      { generation: 1, level: 15 },
      { generation: 2, level: 10 },
      { generation: 3, level: 25, pokeball: 'safariball' },
      { generation: 4, level: 10 }
    ]
  },
  mankey: { encounters: [ { generation: 1, level: 3 }, { generation: 3, level: 2 } ] },
  primeape: {
    learnset: {
      crosschop: [ '3S0' ],
      focusenergy: [ '3S0' ],
      helpinghand: [ '3S0' ],
      reversal: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 34,
        abilities: [ 'vitalspirit' ],
        moves: [ 'helpinghand', 'crosschop', 'focusenergy', 'reversal' ]
      }
    ],
    encounters: [ { generation: 2, level: 15 }, { generation: 4, level: 15 } ]
  },
  growlithe: {
    learnset: {
      bite: [ '3S1', '3S2' ],
      charm: [ '3S2' ],
      ember: [ '3S1' ],
      flamethrower: [ '3S2' ],
      flamewheel: [ '3S0' ],
      leer: [ '3S0' ],
      odorsleuth: [ '3S0' ],
      roar: [ '3S1' ],
      takedown: [ '3S0', '3S2' ]
    },
    eventData: [
      {
        generation: 3,
        level: 32,
        gender: 'F',
        nature: 'Quiet',
        ivs: { hp: 11, atk: 24, def: 28, spa: 1, spd: 20, spe: 2 },
        abilities: [ 'intimidate' ],
        moves: [ 'leer', 'odorsleuth', 'takedown', 'flamewheel' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'bite', 'roar', 'ember' ],
        pokeball: 'pokeball'
      },
      { generation: 3, level: 28, moves: [ 'charm', 'flamethrower', 'bite', 'takedown' ] }
    ],
    encounters: [ { generation: 1, level: 15 } ]
  },
  growlithehisui: {
    learnset: { bite: [ '9S0' ], ember: [ '9S0' ], flamewheel: [ '9S0' ], howl: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 15,
        isHidden: true,
        nature: 'Jolly',
        ivs: { hp: 31, atk: 31, def: 20, spa: 20, spd: 20, spe: 31 },
        moves: [ 'flamewheel', 'bite', 'howl', 'ember' ],
        pokeball: 'pokeball'
      }
    ]
  },
  arcanine: {
    learnset: {
      crunch: [ '4S0' ],
      extremespeed: [ '9S2', '7S1', '4S0' ],
      flareblitz: [ '9S2', '7S1', '4S0' ],
      protect: [ '9S2', '7S1' ],
      thunderfang: [ '4S0' ],
      willowisp: [ '9S2', '7S1' ]
    },
    eventData: [
      {
        generation: 4,
        level: 50,
        abilities: [ 'intimidate' ],
        moves: [ 'flareblitz', 'thunderfang', 'crunch', 'extremespeed' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        abilities: [ 'intimidate' ],
        moves: [ 'flareblitz', 'extremespeed', 'willowisp', 'protect' ],
        pokeball: 'cherishball'
      },
      {
        generation: 9,
        level: 50,
        shiny: true,
        gender: 'F',
        nature: 'Adamant',
        abilities: [ 'intimidate' ],
        ivs: { hp: 31, atk: 31, def: 31, spa: 8, spd: 31, spe: 31 },
        moves: [ 'flareblitz', 'extremespeed', 'willowisp', 'protect' ],
        pokeball: 'cherishball'
      }
    ]
  },
  poliwag: {
    learnset: { bubble: [ '3S0' ], sweetkiss: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'bubble', 'sweetkiss' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 1, level: 5 }, { generation: 2, level: 3 } ]
  },
  poliwhirl: {
    encounters: [
      { generation: 1, level: 15 },
      { generation: 2, level: 10 },
      { generation: 3, level: 20 },
      { generation: 4, level: 10 },
      { generation: 7, level: 24 },
      {
        generation: 7,
        level: 22,
        gender: 'F',
        nature: 'Naughty',
        abilities: [ 'damp' ],
        pokeball: 'pokeball'
      }
    ]
  },
  poliwrath: {
    learnset: {
      brickbreak: [ '3S0' ],
      helpinghand: [ '3S0' ],
      hydropump: [ '3S0' ],
      raindance: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 42,
        moves: [ 'helpinghand', 'hydropump', 'raindance', 'brickbreak' ]
      }
    ]
  },
  politoed: {
    learnset: { icebeam: [ '5S0' ], perishsong: [ '5S0' ], protect: [ '5S0' ], scald: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 50,
        gender: 'M',
        nature: 'Calm',
        ivs: { hp: 31, atk: 13, def: 31, spa: 5, spd: 31, spe: 5 },
        isHidden: true,
        moves: [ 'scald', 'icebeam', 'perishsong', 'protect' ],
        pokeball: 'cherishball'
      }
    ]
  },
  abra: { encounters: [ { generation: 1, level: 6 } ] },
  kadabra: {
    encounters: [
      { generation: 2, level: 15 },
      { generation: 4, level: 15 },
      { generation: 7, level: 11, pokeball: 'pokeball' }
    ]
  },
  alakazam: {
    learnset: { calmmind: [ '3S0' ], futuresight: [ '3S0' ], psychic: [ '3S0' ], trick: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 70,
        moves: [ 'futuresight', 'calmmind', 'psychic', 'trick' ],
        pokeball: 'pokeball'
      }
    ]
  },
  machop: { encounters: [ { generation: 1, level: 15 } ] },
  machoke: {
    learnset: {
      foresight: [ '5S0' ],
      lowsweep: [ '5S0' ],
      revenge: [ '5S0' ],
      seismictoss: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 30,
        moves: [ 'lowsweep', 'foresight', 'seismictoss', 'revenge' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 2, level: 14 }, { generation: 4, level: 14 } ]
  },
  machamp: {
    learnset: {
      bulkup: [ '7S3' ],
      dig: [ '6S2' ],
      doubleedge: [ '7S3' ],
      dynamicpunch: [ '6S1', '6S2' ],
      focusenergy: [ '6S2' ],
      foresight: [ '3S0' ],
      knockoff: [ '6S1' ],
      quickguard: [ '7S3' ],
      revenge: [ '3S0' ],
      seismictoss: [ '6S2', '3S0' ],
      stoneedge: [ '6S1' ],
      strength: [ '7S3' ],
      vitalthrow: [ '3S0' ],
      wideguard: [ '6S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 38,
        gender: 'M',
        nature: 'Quiet',
        ivs: { hp: 9, atk: 23, def: 25, spa: 20, spd: 15, spe: 10 },
        abilities: [ 'guts' ],
        moves: [ 'seismictoss', 'foresight', 'revenge', 'vitalthrow' ],
        pokeball: 'pokeball'
      },
      {
        generation: 6,
        level: 50,
        shiny: true,
        gender: 'M',
        nature: 'Adamant',
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        abilities: [ 'noguard' ],
        moves: [ 'dynamicpunch', 'stoneedge', 'wideguard', 'knockoff' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 39,
        gender: 'M',
        nature: 'Hardy',
        abilities: [ 'noguard' ],
        moves: [ 'seismictoss', 'dynamicpunch', 'dig', 'focusenergy' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 34,
        gender: 'F',
        nature: 'Brave',
        ivs: { atk: 31 },
        abilities: [ 'guts' ],
        moves: [ 'strength', 'bulkup', 'quickguard', 'doubleedge' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 16 }, { generation: 2, level: 5 } ]
  },
  bellsprout: {
    learnset: { growth: [ '3S1' ], teeterdance: [ '3S0' ], vinewhip: [ '3S0', '3S1' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'vinewhip', 'teeterdance' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'vinewhip', 'growth' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 1, level: 12 }, { generation: 2, level: 3 } ]
  },
  weepinbell: {
    learnset: {
      magicalleaf: [ '3S0' ],
      morningsun: [ '3S0' ],
      sludgebomb: [ '3S0' ],
      sweetscent: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 32,
        moves: [ 'morningsun', 'magicalleaf', 'sludgebomb', 'sweetscent' ]
      }
    ],
    encounters: [ { generation: 2, level: 12 }, { generation: 4, level: 10 } ]
  },
  tentacool: { encounters: [ { generation: 1, level: 5 } ] },
  tentacruel: {
    encounters: [
      { generation: 1, level: 20 },
      { generation: 2, level: 20 },
      { generation: 3, level: 20 },
      { generation: 4, level: 15 },
      { generation: 6, level: 21, maxEggMoves: 1 }
    ]
  },
  geodude: { encounters: [ { generation: 1, level: 7 }, { generation: 2, level: 2 } ] },
  graveler: {
    encounters: [
      { generation: 2, level: 23 },
      { generation: 4, level: 16, pokeball: 'safariball' },
      { generation: 6, level: 24 }
    ]
  },
  ponyta: { encounters: [ { generation: 1, level: 28 } ] },
  ponytagalar: {
    learnset: { confusion: [ '8S0' ], fairywind: [ '8S0' ], growl: [ '8S0' ], tackle: [ '8S0' ] },
    eventData: [
      {
        generation: 8,
        level: 15,
        isHidden: true,
        moves: [ 'tackle', 'growl', 'confusion', 'fairywind' ],
        pokeball: 'cherishball'
      }
    ]
  },
  rapidash: {
    learnset: {
      batonpass: [ '3S0' ],
      flamethrower: [ '3S0' ],
      solarbeam: [ '3S0' ],
      sunnyday: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 40,
        moves: [ 'batonpass', 'solarbeam', 'sunnyday', 'flamethrower' ]
      }
    ],
    encounters: [ { generation: 2, level: 14, gender: 'M' }, { generation: 3, level: 37 } ]
  },
  slowpoke: {
    learnset: {
      confusion: [ '5S2', '3S0' ],
      curse: [ '3S1' ],
      disable: [ '5S2', '3S0' ],
      growl: [ '3S1' ],
      headbutt: [ '5S2', '3S0' ],
      tackle: [ '3S1' ],
      watergun: [ '3S0' ],
      waterpulse: [ '5S2' ],
      yawn: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 31,
        gender: 'F',
        nature: 'Naive',
        ivs: { hp: 17, atk: 11, def: 19, spa: 20, spd: 5, spe: 10 },
        abilities: [ 'oblivious' ],
        moves: [ 'watergun', 'confusion', 'disable', 'headbutt' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'curse', 'yawn', 'tackle', 'growl' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 30,
        moves: [ 'confusion', 'disable', 'headbutt', 'waterpulse' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 15 } ]
  },
  slowbro: {
    learnset: { irontail: [ '6S0' ], scald: [ '6S0' ], slackoff: [ '6S0' ], trickroom: [ '6S0' ] },
    eventData: [
      {
        generation: 6,
        level: 100,
        nature: 'Quiet',
        abilities: [ 'oblivious' ],
        moves: [ 'scald', 'trickroom', 'slackoff', 'irontail' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [
      { generation: 1, level: 15 },
      { generation: 1, level: 23 },
      { generation: 2, level: 20 },
      { generation: 3, level: 32 },
      { generation: 4, level: 15 },
      { generation: 5, level: 35 },
      { generation: 7, level: 15 }
    ]
  },
  magnemite: { encounters: [ { generation: 1, level: 16 } ] },
  magneton: {
    learnset: { doubleedge: [ '3S0' ], raindance: [ '3S0' ], refresh: [ '3S0' ], thunder: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 30,
        moves: [ 'refresh', 'doubleedge', 'raindance', 'thunder' ]
      }
    ],
    encounters: [
      { generation: 2, level: 5 },
      { generation: 3, level: 26 },
      { generation: 4, level: 17, pokeball: 'safariball' }
    ]
  },
  farfetchd: {
    learnset: {
      aerialace: [ '3S1' ],
      batonpass: [ '3S1' ],
      slash: [ '3S1' ],
      swordsdance: [ '3S1' ],
      wish: [ '3S0' ],
      yawn: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'yawn', 'wish' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 36,
        moves: [ 'batonpass', 'slash', 'swordsdance', 'aerialace' ]
      }
    ],
    encounters: [
      { generation: 1, level: 3 },
      {
        generation: 3,
        level: 3,
        gender: 'M',
        nature: 'Adamant',
        ivs: { hp: 20, atk: 25, def: 21, spa: 24, spd: 15, spe: 20 },
        abilities: [ 'keeneye' ],
        pokeball: 'pokeball'
      }
    ]
  },
  sirfetchd: {
    learnset: {
      brutalswing: [ '8S0' ],
      detect: [ '8S0' ],
      furycutter: [ '8S0' ],
      meteorassault: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 80,
        gender: 'M',
        nature: 'Brave',
        abilities: [ 'steadfast' ],
        ivs: { hp: 30, atk: 31, def: 31, spa: 30, spd: 30, spe: 31 },
        moves: [ 'meteorassault', 'brutalswing', 'furycutter', 'detect' ],
        pokeball: 'pokeball'
      }
    ]
  },
  doduo: { encounters: [ { generation: 1, level: 18 }, { generation: 2, level: 4 } ] },
  dodrio: {
    learnset: {
      agility: [ '3S0' ],
      batonpass: [ '3S0' ],
      drillpeck: [ '3S0' ],
      triattack: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 34,
        moves: [ 'batonpass', 'drillpeck', 'agility', 'triattack' ]
      }
    ],
    encounters: [
      { generation: 1, level: 29 },
      { generation: 2, level: 10, gender: 'F' },
      { generation: 2, level: 30 },
      { generation: 3, level: 29, pokeball: 'safariball' },
      {
        generation: 4,
        level: 15,
        gender: 'F',
        nature: 'Impish',
        ivs: { hp: 20, atk: 20, def: 20, spa: 15, spd: 15, spe: 15 },
        abilities: [ 'runaway' ],
        pokeball: 'pokeball'
      }
    ]
  },
  seel: {
    learnset: { helpinghand: [ '3S0' ], icebeam: [ '3S0' ], safeguard: [ '3S0' ], surf: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 23,
        abilities: [ 'thickfat' ],
        moves: [ 'helpinghand', 'surf', 'safeguard', 'icebeam' ]
      }
    ],
    encounters: [ { generation: 1, level: 22 } ]
  },
  dewgong: {
    encounters: [
      { generation: 1, level: 15 },
      { generation: 2, level: 5 },
      { generation: 3, level: 32 },
      { generation: 5, level: 30 },
      { generation: 6, level: 30, maxEggMoves: 1 }
    ]
  },
  grimer: {
    learnset: {
      helpinghand: [ '3S0' ],
      minimize: [ '3S0' ],
      shadowpunch: [ '3S0' ],
      sludgebomb: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 23,
        moves: [ 'helpinghand', 'sludgebomb', 'shadowpunch', 'minimize' ]
      }
    ],
    encounters: [ { generation: 1, level: 23 } ]
  },
  grimeralola: {
    learnset: { bite: [ '7S0' ], harden: [ '7S0' ], poisongas: [ '7S0' ], pound: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 10,
        abilities: [ 'poisontouch' ],
        moves: [ 'bite', 'harden', 'poisongas', 'pound' ],
        pokeball: 'cherishball'
      }
    ]
  },
  muk: {
    encounters: [
      { generation: 1, level: 25 },
      { generation: 2, level: 5 },
      { generation: 3, level: 32 },
      { generation: 4, level: 15 },
      { generation: 5, level: 5 },
      { generation: 5, level: 35, isHidden: true },
      { generation: 6, level: 30 }
    ]
  },
  shellder: {
    learnset: {
      aurorabeam: [ '3S0', '3S2' ],
      iciclespear: [ '3S0', '3S1' ],
      refresh: [ '3S2' ],
      supersonic: [ '3S0' ],
      surf: [ '3S2' ],
      tackle: [ '3S1' ],
      takedown: [ '3S2' ],
      withdraw: [ '3S0', '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 24,
        gender: 'F',
        nature: 'Brave',
        ivs: { hp: 5, atk: 19, def: 18, spa: 5, spd: 11, spe: 13 },
        abilities: [ 'shellarmor' ],
        moves: [ 'withdraw', 'iciclespear', 'supersonic', 'aurorabeam' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        abilities: [ 'shellarmor' ],
        moves: [ 'tackle', 'withdraw', 'iciclespear' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 29,
        abilities: [ 'shellarmor' ],
        moves: [ 'refresh', 'takedown', 'surf', 'aurorabeam' ]
      }
    ],
    encounters: [ { generation: 1, level: 10 } ]
  },
  cloyster: {
    learnset: {
      hiddenpower: [ '5S0' ],
      iciclespear: [ '5S0' ],
      razorshell: [ '5S0' ],
      rockblast: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 30,
        gender: 'M',
        nature: 'Naughty',
        abilities: [ 'skilllink' ],
        moves: [ 'iciclespear', 'rockblast', 'hiddenpower', 'razorshell' ],
        pokeball: 'pokeball'
      }
    ]
  },
  gastly: { encounters: [ { generation: 1, level: 18 } ] },
  haunter: {
    learnset: {
      confuseray: [ '5S0' ],
      payback: [ '5S0' ],
      shadowpunch: [ '5S0' ],
      suckerpunch: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 30,
        moves: [ 'confuseray', 'suckerpunch', 'shadowpunch', 'payback' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [
      { generation: 1, level: 20 },
      { generation: 2, level: 15 },
      { generation: 3, level: 20 },
      { generation: 4, level: 16 }
    ]
  },
  gengar: {
    learnset: {
      astonish: [ '6S4' ],
      confuseray: [ '6S1', '6S2', '6S4', '3S0' ],
      curse: [ '3S0' ],
      dazzlinggleam: [ '8S7' ],
      destinybond: [ '6S3' ],
      hyperbeam: [ '6S5', '6S6' ],
      hypnosis: [ '6S5', '6S6' ],
      meanlook: [ '6S5', '6S6' ],
      nightshade: [ '6S2', '3S0' ],
      psychic: [ '6S1', '6S5', '6S6' ],
      shadowball: [ '8S7', '6S3', '6S4' ],
      shadowpunch: [ '6S1', '6S2' ],
      sludgebomb: [ '8S7', '6S3' ],
      sludgewave: [ '6S4' ],
      spite: [ '3S0' ],
      suckerpunch: [ '6S1', '6S2' ],
      willowisp: [ '8S7', '6S3' ]
    },
    eventData: [
      {
        generation: 3,
        level: 23,
        gender: 'F',
        nature: 'Hardy',
        ivs: { hp: 19, atk: 14, def: 0, spa: 14, spd: 17, spe: 27 },
        moves: [ 'spite', 'curse', 'nightshade', 'confuseray' ],
        pokeball: 'pokeball'
      },
      {
        generation: 6,
        level: 25,
        nature: 'Timid',
        moves: [ 'psychic', 'confuseray', 'suckerpunch', 'shadowpunch' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 25,
        moves: [ 'nightshade', 'confuseray', 'suckerpunch', 'shadowpunch' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        moves: [ 'shadowball', 'sludgebomb', 'willowisp', 'destinybond' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 25,
        shiny: true,
        moves: [ 'shadowball', 'sludgewave', 'confuseray', 'astonish' ],
        pokeball: 'duskball'
      },
      {
        generation: 6,
        level: 50,
        shiny: true,
        gender: 'M',
        moves: [ 'meanlook', 'hypnosis', 'psychic', 'hyperbeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'meanlook', 'hypnosis', 'psychic', 'hyperbeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 80,
        gender: 'M',
        nature: 'Naughty',
        abilities: [ 'cursedbody' ],
        ivs: { hp: 30, atk: 30, def: 30, spa: 31, spd: 31, spe: 31 },
        moves: [ 'shadowball', 'sludgebomb', 'dazzlinggleam', 'willowisp' ],
        pokeball: 'pokeball'
      }
    ]
  },
  onix: { encounters: [ { generation: 1, level: 13 } ] },
  drowzee: {
    learnset: { bellydrum: [ '3S0' ], wish: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        abilities: [ 'insomnia' ],
        moves: [ 'bellydrum', 'wish' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 1, level: 9 } ]
  },
  hypno: {
    learnset: {
      batonpass: [ '3S0' ],
      meditate: [ '3S0' ],
      psychic: [ '3S0' ],
      shadowball: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 34,
        abilities: [ 'insomnia' ],
        moves: [ 'batonpass', 'psychic', 'meditate', 'shadowball' ]
      }
    ],
    encounters: [ { generation: 2, level: 16 }, { generation: 4, level: 16 } ]
  },
  krabby: { encounters: [ { generation: 1, level: 10 } ] },
  kingler: {
    encounters: [
      { generation: 1, level: 15 },
      { generation: 3, level: 25 },
      { generation: 4, level: 22 }
    ]
  },
  voltorb: {
    learnset: { mirrorcoat: [ '3S0' ], refresh: [ '3S0' ], spark: [ '3S0' ], swift: [ '3S0' ] },
    eventData: [ { generation: 3, level: 19, moves: [ 'refresh', 'mirrorcoat', 'spark', 'swift' ] } ],
    encounters: [ { generation: 1, level: 14 }, { generation: 1, level: 40 } ]
  },
  electrode: {
    encounters: [
      { generation: 1, level: 3 },
      { generation: 2, level: 23 },
      {
        generation: 3,
        level: 3,
        nature: 'Hasty',
        ivs: { hp: 19, atk: 16, def: 18, spa: 25, spd: 25, spe: 19 },
        abilities: [ 'static' ],
        pokeball: 'pokeball'
      },
      { generation: 4, level: 23 }
    ]
  },
  exeggcute: {
    learnset: { sweetscent: [ '3S0' ], wish: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'sweetscent', 'wish' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 1, level: 20 } ]
  },
  exeggutor: {
    learnset: {
      ancientpower: [ '3S0' ],
      hypnosis: [ '3S0' ],
      psychic: [ '3S0' ],
      refresh: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 46,
        moves: [ 'refresh', 'psychic', 'hypnosis', 'ancientpower' ]
      }
    ]
  },
  exeggutoralola: {
    learnset: {
      celebrate: [ '7S0' ],
      dracometeor: [ '7S0' ],
      leafstorm: [ '7S0' ],
      powerswap: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        gender: 'M',
        nature: 'Modest',
        isHidden: true,
        moves: [ 'powerswap', 'celebrate', 'leafstorm', 'dracometeor' ],
        pokeball: 'cherishball'
      }
    ]
  },
  cubone: { encounters: [ { generation: 1, level: 16 } ] },
  marowak: {
    learnset: {
      earthquake: [ '3S0' ],
      rockslide: [ '3S0' ],
      sing: [ '3S0' ],
      swordsdance: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 44,
        moves: [ 'sing', 'earthquake', 'swordsdance', 'rockslide' ]
      }
    ],
    encounters: [
      { generation: 1, level: 24 },
      { generation: 2, level: 12 },
      { generation: 4, level: 14 }
    ]
  },
  marowakalolatotem: {
    learnset: { bonemerang: [ '7S0' ], hex: [ '7S0' ], leer: [ '7S0' ], willowisp: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 25,
        perfectIVs: 3,
        moves: [ 'leer', 'hex', 'bonemerang', 'willowisp' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  hitmonlee: {
    learnset: {
      highjumpkick: [ '3S0' ],
      megakick: [ '3S0' ],
      mindreader: [ '3S0' ],
      refresh: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 38,
        abilities: [ 'limber' ],
        moves: [ 'refresh', 'highjumpkick', 'mindreader', 'megakick' ]
      }
    ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  hitmonchan: {
    learnset: {
      helpinghand: [ '3S0' ],
      megapunch: [ '3S0' ],
      mindreader: [ '3S0' ],
      skyuppercut: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 38,
        abilities: [ 'keeneye' ],
        moves: [ 'helpinghand', 'skyuppercut', 'mindreader', 'megapunch' ]
      }
    ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  hitmontop: {
    learnset: {
      closecombat: [ '5S0' ],
      fakeout: [ '5S0' ],
      helpinghand: [ '5S0' ],
      suckerpunch: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 55,
        gender: 'M',
        nature: 'Adamant',
        abilities: [ 'intimidate' ],
        moves: [ 'fakeout', 'closecombat', 'suckerpunch', 'helpinghand' ]
      }
    ]
  },
  lickitung: {
    learnset: {
      defensecurl: [ '3S1' ],
      doubleedge: [ '3S1' ],
      healbell: [ '3S0' ],
      helpinghand: [ '3S1' ],
      rollout: [ '3S1' ],
      wish: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'healbell', 'wish' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 38,
        moves: [ 'helpinghand', 'doubleedge', 'defensecurl', 'rollout' ]
      }
    ],
    encounters: [ { generation: 1, level: 15 } ]
  },
  koffing: { encounters: [ { generation: 1, level: 30 } ] },
  weezing: {
    encounters: [
      { generation: 2, level: 16 },
      { generation: 3, level: 32 },
      { generation: 4, level: 15, pokeball: 'safariball' }
    ]
  },
  rhyhorn: { encounters: [ { generation: 1, level: 20 } ] },
  rhydon: {
    learnset: {
      earthquake: [ '3S0' ],
      helpinghand: [ '3S0' ],
      megahorn: [ '3S0' ],
      scaryface: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 46,
        moves: [ 'helpinghand', 'megahorn', 'scaryface', 'earthquake' ]
      }
    ],
    encounters: [
      { generation: 1, level: 15 },
      { generation: 2, level: 10 },
      { generation: 4, level: 41 },
      { generation: 6, level: 30 }
    ]
  },
  chansey: {
    learnset: {
      charm: [ '8S3' ],
      growl: [ '3S1' ],
      pound: [ '3S1' ],
      present: [ '8S3' ],
      refresh: [ '3S1' ],
      skillswap: [ '3S2' ],
      softboiled: [ '8S3', '3S2' ],
      sweetkiss: [ '8S3', '3S2' ],
      sweetscent: [ '3S0' ],
      tailwhip: [ '3S1' ],
      thunderbolt: [ '3S2' ],
      wish: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'sweetscent', 'wish' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        moves: [ 'pound', 'growl', 'tailwhip', 'refresh' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 39,
        moves: [ 'sweetkiss', 'thunderbolt', 'softboiled', 'skillswap' ]
      },
      {
        generation: 8,
        level: 7,
        moves: [ 'present', 'sweetkiss', 'charm', 'softboiled' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 7 } ]
  },
  blissey: {
    learnset: { growl: [ '5S0' ], pound: [ '5S0' ], refresh: [ '5S0' ], tailwhip: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 10,
        isHidden: true,
        moves: [ 'pound', 'growl', 'tailwhip', 'refresh' ]
      }
    ]
  },
  tangela: {
    learnset: {
      ingrain: [ '3S0' ],
      morningsun: [ '3S0' ],
      solarbeam: [ '3S0' ],
      sunnyday: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 30,
        abilities: [ 'chlorophyll' ],
        moves: [ 'morningsun', 'solarbeam', 'sunnyday', 'ingrain' ]
      }
    ],
    encounters: [ { generation: 1, level: 13 } ]
  },
  tangrowth: {
    learnset: {
      ancientpower: [ '4S0' ],
      morningsun: [ '4S0' ],
      naturalgift: [ '4S0' ],
      sunnyday: [ '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Brave',
        moves: [ 'sunnyday', 'morningsun', 'ancientpower', 'naturalgift' ],
        pokeball: 'cherishball'
      }
    ]
  },
  kangaskhan: {
    learnset: {
      bite: [ '3S1' ],
      cometpunch: [ '3S1' ],
      dizzypunch: [ '3S2' ],
      earthquake: [ '6S3', '3S2' ],
      fakeout: [ '6S3' ],
      leer: [ '3S1' ],
      return: [ '6S3' ],
      sing: [ '3S2' ],
      suckerpunch: [ '6S3' ],
      tailwhip: [ '3S2' ],
      wish: [ '3S0' ],
      yawn: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        abilities: [ 'earlybird' ],
        moves: [ 'yawn', 'wish' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        abilities: [ 'earlybird' ],
        moves: [ 'cometpunch', 'leer', 'bite' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 35,
        abilities: [ 'earlybird' ],
        moves: [ 'sing', 'earthquake', 'tailwhip', 'dizzypunch' ]
      },
      {
        generation: 6,
        level: 50,
        abilities: [ 'scrappy' ],
        moves: [ 'fakeout', 'return', 'earthquake', 'suckerpunch' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 25 } ]
  },
  horsea: {
    learnset: { bubble: [ '5S0' ] },
    eventData: [ { generation: 5, level: 1, shiny: true, moves: [ 'bubble' ], pokeball: 'pokeball' } ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  seadra: {
    learnset: { agility: [ '3S0' ], leer: [ '3S0' ], twister: [ '3S0' ], watergun: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 45,
        abilities: [ 'poisonpoint' ],
        moves: [ 'leer', 'watergun', 'twister', 'agility' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [
      { generation: 1, level: 20 },
      { generation: 2, level: 20 },
      { generation: 3, level: 25 },
      { generation: 4, level: 15 }
    ]
  },
  kingdra: {
    learnset: {
      agility: [ '3S0' ],
      dracometeor: [ '5S1' ],
      dragonpulse: [ '5S1' ],
      leer: [ '3S0' ],
      muddywater: [ '5S1' ],
      protect: [ '5S1' ],
      twister: [ '3S0' ],
      watergun: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 50,
        abilities: [ 'swiftswim' ],
        moves: [ 'leer', 'watergun', 'twister', 'agility' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 50,
        gender: 'M',
        nature: 'Timid',
        ivs: { hp: 31, atk: 17, def: 8, spa: 31, spd: 11, spe: 31 },
        abilities: [ 'swiftswim' ],
        moves: [ 'dracometeor', 'muddywater', 'dragonpulse', 'protect' ],
        pokeball: 'cherishball'
      }
    ]
  },
  goldeen: { encounters: [ { generation: 1, level: 5 } ] },
  seaking: {
    encounters: [
      { generation: 1, level: 23 },
      { generation: 2, level: 10 },
      { generation: 3, level: 20 },
      { generation: 4, level: 10 },
      { generation: 6, level: 26, maxEggMoves: 1 },
      { generation: 7, level: 10 }
    ]
  },
  staryu: {
    learnset: {
      cosmicpower: [ '3S0' ],
      harden: [ '3S1' ],
      hydropump: [ '3S0' ],
      lightscreen: [ '3S0' ],
      minimize: [ '3S0' ],
      rapidspin: [ '3S1' ],
      recover: [ '3S1' ],
      watergun: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 50,
        moves: [ 'minimize', 'lightscreen', 'cosmicpower', 'hydropump' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 18,
        nature: 'Timid',
        ivs: { hp: 10, atk: 3, def: 22, spa: 24, spd: 3, spe: 18 },
        abilities: [ 'illuminate' ],
        moves: [ 'harden', 'watergun', 'rapidspin', 'recover' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  starmie: {
    learnset: { icebeam: [ '3S0' ], recover: [ '3S0' ], refresh: [ '3S0' ], waterfall: [ '3S0' ] },
    eventData: [
      { generation: 3, level: 41, moves: [ 'refresh', 'waterfall', 'icebeam', 'recover' ] }
    ]
  },
  mrmime: {
    learnset: { encore: [ '3S0' ], followme: [ '3S0' ], psychic: [ '3S0' ], thunderpunch: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 42,
        abilities: [ 'soundproof' ],
        moves: [ 'followme', 'psychic', 'encore', 'thunderpunch' ]
      }
    ],
    encounters: [ { generation: 1, level: 6 } ]
  },
  mrmimegalar: {
    learnset: { confusion: [ '8S0' ], copycat: [ '8S0' ], encore: [ '8S0' ], iceshard: [ '8S0' ] },
    eventData: [
      {
        generation: 8,
        level: 15,
        isHidden: true,
        moves: [ 'copycat', 'encore', 'iceshard', 'confusion' ],
        pokeball: 'cherishball'
      }
    ]
  },
  scyther: {
    learnset: {
      agility: [ '5S2' ],
      focusenergy: [ '3S0' ],
      furycutter: [ '5S2' ],
      leer: [ '3S0' ],
      morningsun: [ '3S1' ],
      quickattack: [ '3S0' ],
      razorwind: [ '3S1' ],
      silverwind: [ '3S1' ],
      slash: [ '5S2', '3S1' ],
      wingattack: [ '5S2' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        abilities: [ 'swarm' ],
        moves: [ 'quickattack', 'leer', 'focusenergy' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 40,
        abilities: [ 'swarm' ],
        moves: [ 'morningsun', 'razorwind', 'silverwind', 'slash' ]
      },
      {
        generation: 5,
        level: 30,
        moves: [ 'agility', 'wingattack', 'furycutter', 'slash' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 15 }, { generation: 1, level: 25 } ]
  },
  scizor: {
    learnset: {
      aerialace: [ '6S5' ],
      agility: [ '6S5', '6S6', '4S1' ],
      bugbite: [ '5S2' ],
      bulletpunch: [ '6S7', '5S2' ],
      doublehit: [ '6S4' ],
      falseswipe: [ '6S5', '6S6' ],
      focusenergy: [ '5S3' ],
      furycutter: [ '6S5', '6S6', '3S0' ],
      irondefense: [ '4S1' ],
      ironhead: [ '6S4' ],
      leer: [ '5S3' ],
      metalclaw: [ '6S6', '3S0' ],
      nightslash: [ '6S4' ],
      pursuit: [ '5S3' ],
      roost: [ '6S7', '5S2' ],
      slash: [ '3S0' ],
      steelwing: [ '5S3' ],
      swordsdance: [ '6S7', '5S2', '4S1', '3S0' ],
      uturn: [ '6S7' ],
      xscissor: [ '6S4', '4S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 50,
        gender: 'M',
        abilities: [ 'swarm' ],
        moves: [ 'furycutter', 'metalclaw', 'swordsdance', 'slash' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Adamant',
        abilities: [ 'swarm' ],
        moves: [ 'xscissor', 'swordsdance', 'irondefense', 'agility' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 100,
        gender: 'M',
        abilities: [ 'technician' ],
        moves: [ 'bulletpunch', 'bugbite', 'roost', 'swordsdance' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'leer', 'focusenergy', 'pursuit', 'steelwing' ]
      },
      {
        generation: 6,
        level: 50,
        gender: 'M',
        moves: [ 'xscissor', 'nightslash', 'doublehit', 'ironhead' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 25,
        nature: 'Adamant',
        abilities: [ 'technician' ],
        moves: [ 'aerialace', 'falseswipe', 'agility', 'furycutter' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 25,
        moves: [ 'metalclaw', 'falseswipe', 'agility', 'furycutter' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        abilities: [ 'technician' ],
        moves: [ 'bulletpunch', 'swordsdance', 'roost', 'uturn' ],
        pokeball: 'cherishball'
      }
    ]
  },
  jynx: {
    encounters: [
      { generation: 1, level: 15 },
      { generation: 2, level: 10 },
      {
        generation: 3,
        level: 20,
        nature: 'Mild',
        ivs: { hp: 18, atk: 17, def: 18, spa: 22, spd: 25, spe: 21 },
        abilities: [ 'oblivious' ],
        pokeball: 'pokeball'
      },
      { generation: 4, level: 22 },
      { generation: 7, level: 9 }
    ]
  },
  elekid: {
    learnset: {
      crosschop: [ '3S0' ],
      firepunch: [ '3S0' ],
      icepunch: [ '3S0' ],
      thunderpunch: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 20,
        moves: [ 'icepunch', 'firepunch', 'thunderpunch', 'crosschop' ],
        pokeball: 'pokeball'
      }
    ]
  },
  electabuzz: {
    learnset: {
      crosschop: [ '3S1' ],
      followme: [ '3S1' ],
      leer: [ '3S0' ],
      lightscreen: [ '6S4', '5S3', '4S2' ],
      lowkick: [ '6S4', '5S3', '4S2' ],
      quickattack: [ '3S0' ],
      shockwave: [ '6S4', '5S3', '4S2' ],
      swift: [ '5S3' ],
      thunderbolt: [ '3S1' ],
      thunderpunch: [ '6S4', '4S2', '3S0' ],
      thunderwave: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'quickattack', 'leer', 'thunderpunch' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 43,
        moves: [ 'followme', 'crosschop', 'thunderwave', 'thunderbolt' ]
      },
      {
        generation: 4,
        level: 30,
        gender: 'M',
        nature: 'Naughty',
        moves: [ 'lowkick', 'shockwave', 'lightscreen', 'thunderpunch' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 30,
        moves: [ 'lowkick', 'swift', 'shockwave', 'lightscreen' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 30,
        gender: 'M',
        isHidden: true,
        moves: [ 'lowkick', 'shockwave', 'lightscreen', 'thunderpunch' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [
      { generation: 1, level: 33 },
      { generation: 2, level: 15 },
      { generation: 4, level: 15 },
      { generation: 7, level: 25 }
    ]
  },
  electivire: {
    learnset: {
      crosschop: [ '4S0' ],
      discharge: [ '4S1' ],
      earthquake: [ '4S0' ],
      icepunch: [ '4S0' ],
      lightscreen: [ '4S1' ],
      thunderbolt: [ '4S1' ],
      thunderpunch: [ '4S0', '4S1' ]
    },
    eventData: [
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Adamant',
        moves: [ 'thunderpunch', 'icepunch', 'crosschop', 'earthquake' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Serious',
        moves: [ 'lightscreen', 'thunderpunch', 'discharge', 'thunderbolt' ],
        pokeball: 'cherishball'
      }
    ]
  },
  magmar: {
    learnset: {
      confuseray: [ '6S4', '5S3', '4S2' ],
      crosschop: [ '3S1' ],
      ember: [ '3S0' ],
      feintattack: [ '5S3' ],
      fireblast: [ '3S1' ],
      firepunch: [ '6S4', '4S2', '3S0' ],
      firespin: [ '6S4', '5S3', '4S2' ],
      followme: [ '3S1' ],
      leer: [ '3S0' ],
      smog: [ '3S0' ],
      smokescreen: [ '6S4', '5S3', '4S2' ],
      thunderpunch: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'leer', 'smog', 'firepunch', 'ember' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 36,
        moves: [ 'followme', 'fireblast', 'crosschop', 'thunderpunch' ]
      },
      {
        generation: 4,
        level: 30,
        gender: 'M',
        nature: 'Quiet',
        moves: [ 'smokescreen', 'firespin', 'confuseray', 'firepunch' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 30,
        moves: [ 'smokescreen', 'feintattack', 'firespin', 'confuseray' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 30,
        gender: 'M',
        isHidden: true,
        moves: [ 'smokescreen', 'firespin', 'confuseray', 'firepunch' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [
      { generation: 1, level: 34 },
      { generation: 2, level: 14 },
      { generation: 4, level: 14 },
      { generation: 7, level: 16 }
    ]
  },
  magmortar: {
    learnset: {
      confuseray: [ '4S1' ],
      firepunch: [ '4S1' ],
      flamethrower: [ '4S0', '4S1' ],
      hyperbeam: [ '4S0' ],
      lavaplume: [ '4S1' ],
      psychic: [ '4S0' ],
      solarbeam: [ '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 50,
        gender: 'F',
        nature: 'Modest',
        moves: [ 'flamethrower', 'psychic', 'hyperbeam', 'solarbeam' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Hardy',
        moves: [ 'confuseray', 'firepunch', 'lavaplume', 'flamethrower' ],
        pokeball: 'cherishball'
      }
    ]
  },
  pinsir: {
    learnset: {
      earthquake: [ '6S1', '6S2' ],
      falseswipe: [ '3S0' ],
      feint: [ '6S2' ],
      guillotine: [ '3S0' ],
      helpinghand: [ '3S0' ],
      quickattack: [ '6S2' ],
      return: [ '6S1' ],
      stoneedge: [ '6S1' ],
      submission: [ '3S0' ],
      swordsdance: [ '6S2' ],
      xscissor: [ '6S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 35,
        abilities: [ 'hypercutter' ],
        moves: [ 'helpinghand', 'guillotine', 'falseswipe', 'submission' ]
      },
      {
        generation: 6,
        level: 50,
        gender: 'F',
        nature: 'Adamant',
        moves: [ 'xscissor', 'earthquake', 'stoneedge', 'return' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        nature: 'Jolly',
        isHidden: true,
        moves: [ 'earthquake', 'swordsdance', 'feint', 'quickattack' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 15 }, { generation: 1, level: 20 } ]
  },
  tauros: {
    learnset: {
      bodyslam: [ '3S2' ],
      earthquake: [ '3S2' ],
      hornattack: [ '3S0', '3S1' ],
      pursuit: [ '3S0' ],
      rage: [ '3S0', '3S1' ],
      refresh: [ '3S2' ],
      scaryface: [ '3S0' ],
      tackle: [ '3S1' ],
      tailwhip: [ '3S1', '3S2' ]
    },
    eventData: [
      {
        generation: 3,
        level: 25,
        nature: 'Docile',
        ivs: { hp: 14, atk: 19, def: 12, spa: 17, spd: 5, spe: 26 },
        abilities: [ 'intimidate' ],
        moves: [ 'rage', 'hornattack', 'scaryface', 'pursuit' ],
        pokeball: 'safariball'
      },
      {
        generation: 3,
        level: 10,
        abilities: [ 'intimidate' ],
        moves: [ 'tackle', 'tailwhip', 'rage', 'hornattack' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 46,
        abilities: [ 'intimidate' ],
        moves: [ 'refresh', 'earthquake', 'tailwhip', 'bodyslam' ]
      }
    ],
    encounters: [ { generation: 1, level: 21 } ]
  },
  magikarp: {
    learnset: {
      bounce: [ '7S7', '5S5' ],
      celebrate: [ '6S6' ],
      flail: [ '5S5' ],
      happyhour: [ '6S6' ],
      hydropump: [ '5S5' ],
      splash: [
        '7S7', '6S6',
        '5S5', '4S0',
        '4S1', '4S2',
        '4S3', '4S4'
      ]
    },
    eventData: [
      {
        generation: 4,
        level: 5,
        gender: 'M',
        nature: 'Relaxed',
        moves: [ 'splash' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 6,
        gender: 'F',
        nature: 'Rash',
        moves: [ 'splash' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 7,
        gender: 'F',
        nature: 'Hardy',
        moves: [ 'splash' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 5,
        gender: 'F',
        nature: 'Lonely',
        moves: [ 'splash' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 4,
        gender: 'M',
        nature: 'Modest',
        moves: [ 'splash' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 99,
        shiny: true,
        gender: 'M',
        moves: [ 'flail', 'hydropump', 'bounce', 'splash' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 1,
        shiny: 1,
        moves: [ 'splash', 'celebrate', 'happyhour' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 19,
        shiny: true,
        moves: [ 'splash', 'bounce' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 5 } ]
  },
  gyarados: {
    learnset: {
      bite: [ '6S1' ],
      dragondance: [ '6S0' ],
      earthquake: [ '6S0' ],
      icefang: [ '6S0', '6S1' ],
      ironhead: [ '6S1' ],
      waterfall: [ '6S0', '6S1' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        moves: [ 'waterfall', 'earthquake', 'icefang', 'dragondance' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 20,
        shiny: true,
        moves: [ 'waterfall', 'bite', 'icefang', 'ironhead' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [
      { generation: 1, level: 15 },
      { generation: 2, level: 15 },
      { generation: 3, level: 5 },
      { generation: 4, level: 10 },
      { generation: 5, level: 1 },
      { generation: 7, level: 10 }
    ]
  },
  lapras: {
    learnset: {
      blizzard: [ '3S0' ],
      healbell: [ '3S0' ],
      hydropump: [ '3S0' ],
      raindance: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 44,
        moves: [ 'hydropump', 'raindance', 'blizzard', 'healbell' ]
      }
    ],
    encounters: [ { generation: 1, level: 15 } ]
  },
  ditto: {
    learnset: { transform: [ '7S0' ] },
    eventData: [ { generation: 7, level: 10, moves: [ 'transform' ], pokeball: 'cherishball' } ],
    encounters: [
      { generation: 1, level: 12 },
      { generation: 2, level: 10 },
      { generation: 3, level: 23 },
      { generation: 4, level: 10 },
      { generation: 5, level: 45 },
      { generation: 6, level: 30 },
      { generation: 7, level: 25 }
    ]
  },
  eevee: {
    learnset: {
      attract: [ '5S2', '4S0' ],
      babydolleyes: [ '7S5', '6S3', '6S4' ],
      bite: [ '4S0' ],
      celebrate: [ '8S6', '7S5', '6S3' ],
      covet: [ '8S6', '4S0' ],
      echoedvoice: [ '5S2' ],
      flail: [ '4S1' ],
      helpinghand: [ '8S6', '6S4', '4S0' ],
      irontail: [ '4S1' ],
      quickattack: [ '6S4', '4S1' ],
      return: [ '5S2' ],
      sandattack: [ '7S5', '6S3' ],
      sing: [ '5S2' ],
      swift: [ '6S3', '6S4' ],
      tackle: [ '8S6' ],
      trumpcard: [ '4S1' ]
    },
    eventData: [
      {
        generation: 4,
        level: 10,
        gender: 'F',
        nature: 'Lonely',
        abilities: [ 'adaptability' ],
        moves: [ 'covet', 'bite', 'helpinghand', 'attract' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        shiny: true,
        gender: 'M',
        nature: 'Hardy',
        abilities: [ 'adaptability' ],
        moves: [ 'irontail', 'trumpcard', 'flail', 'quickattack' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        gender: 'F',
        nature: 'Hardy',
        abilities: [ 'adaptability' ],
        moves: [ 'sing', 'return', 'echoedvoice', 'attract' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'celebrate', 'sandattack', 'babydolleyes', 'swift' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 15,
        shiny: true,
        isHidden: true,
        moves: [ 'swift', 'quickattack', 'babydolleyes', 'helpinghand' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 10,
        nature: 'Jolly',
        moves: [ 'celebrate', 'sandattack', 'babydolleyes' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 5,
        gender: 'M',
        nature: 'Docile',
        abilities: [ 'runaway' ],
        moves: [ 'celebrate', 'covet', 'helpinghand', 'tackle' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 25 } ]
  },
  eeveestarter: {
    learnset: { growl: [ '7S0' ], tackle: [ '7S0' ], tailwhip: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 5,
        perfectIVs: 6,
        moves: [ 'tackle', 'tailwhip', 'growl' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  vaporeon: {
    learnset: {
      celebrate: [ '6S1' ],
      helpinghand: [ '5S0' ],
      icebeam: [ '7S2' ],
      raindance: [ '7S2' ],
      rest: [ '7S2' ],
      sandattack: [ '6S1', '5S0' ],
      scald: [ '7S2' ],
      tackle: [ '5S0' ],
      tailwhip: [ '6S1', '5S0' ],
      watergun: [ '6S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'tailwhip', 'tackle', 'helpinghand', 'sandattack' ]
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'celebrate', 'tailwhip', 'sandattack', 'watergun' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        gender: 'F',
        isHidden: true,
        moves: [ 'scald', 'icebeam', 'raindance', 'rest' ],
        pokeball: 'cherishball'
      }
    ]
  },
  jolteon: {
    learnset: {
      celebrate: [ '6S1' ],
      helpinghand: [ '5S0' ],
      lightscreen: [ '7S2' ],
      sandattack: [ '6S1', '5S0' ],
      shadowball: [ '7S2' ],
      tackle: [ '5S0' ],
      tailwhip: [ '6S1', '5S0' ],
      thunderbolt: [ '7S2' ],
      thundershock: [ '6S1' ],
      voltswitch: [ '7S2' ]
    },
    eventData: [
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'tailwhip', 'tackle', 'helpinghand', 'sandattack' ]
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'celebrate', 'tailwhip', 'sandattack', 'thundershock' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        gender: 'F',
        moves: [ 'thunderbolt', 'shadowball', 'lightscreen', 'voltswitch' ],
        pokeball: 'cherishball'
      }
    ]
  },
  flareon: {
    learnset: {
      celebrate: [ '6S1' ],
      ember: [ '6S1' ],
      facade: [ '7S2' ],
      flareblitz: [ '7S2' ],
      helpinghand: [ '5S0' ],
      quickattack: [ '7S2' ],
      sandattack: [ '6S1', '5S0' ],
      tackle: [ '5S0' ],
      tailwhip: [ '6S1', '5S0' ],
      willowisp: [ '7S2' ]
    },
    eventData: [
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'tailwhip', 'tackle', 'helpinghand', 'sandattack' ]
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'celebrate', 'tailwhip', 'sandattack', 'ember' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        gender: 'F',
        isHidden: true,
        moves: [ 'flareblitz', 'facade', 'willowisp', 'quickattack' ],
        pokeball: 'cherishball'
      }
    ]
  },
  espeon: {
    learnset: {
      celebrate: [ '6S2' ],
      confusion: [ '6S2' ],
      dazzlinggleam: [ '7S3' ],
      helpinghand: [ '5S1' ],
      morningsun: [ '3S0' ],
      psybeam: [ '3S0' ],
      psychic: [ '7S3', '3S0' ],
      psychup: [ '3S0' ],
      reflect: [ '7S3' ],
      sandattack: [ '6S2', '5S1' ],
      shadowball: [ '7S3' ],
      tackle: [ '5S1' ],
      tailwhip: [ '6S2', '5S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        moves: [ 'psybeam', 'psychup', 'psychic', 'morningsun' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'tailwhip', 'tackle', 'helpinghand', 'sandattack' ]
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'celebrate', 'tailwhip', 'sandattack', 'confusion' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        gender: 'F',
        isHidden: true,
        moves: [ 'psychic', 'dazzlinggleam', 'shadowball', 'reflect' ],
        pokeball: 'cherishball'
      }
    ]
  },
  umbreon: {
    learnset: {
      celebrate: [ '6S2' ],
      feintattack: [ '3S0' ],
      helpinghand: [ '5S1' ],
      meanlook: [ '3S0' ],
      moonlight: [ '7S3', '3S0' ],
      protect: [ '7S3' ],
      pursuit: [ '6S2' ],
      sandattack: [ '6S2', '5S1' ],
      screech: [ '3S0' ],
      snarl: [ '7S3' ],
      tackle: [ '5S1' ],
      tailwhip: [ '6S2', '5S1' ],
      toxic: [ '7S3' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        moves: [ 'feintattack', 'meanlook', 'screech', 'moonlight' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'tailwhip', 'tackle', 'helpinghand', 'sandattack' ]
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'celebrate', 'tailwhip', 'sandattack', 'pursuit' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        gender: 'F',
        moves: [ 'snarl', 'toxic', 'protect', 'moonlight' ],
        pokeball: 'cherishball'
      }
    ]
  },
  leafeon: {
    learnset: {
      celebrate: [ '6S1' ],
      helpinghand: [ '5S0' ],
      leafblade: [ '7S2' ],
      razorleaf: [ '6S1' ],
      sandattack: [ '6S1', '5S0' ],
      sunnyday: [ '7S2' ],
      swordsdance: [ '7S2' ],
      synthesis: [ '7S2' ],
      tackle: [ '5S0' ],
      tailwhip: [ '6S1', '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'tailwhip', 'tackle', 'helpinghand', 'sandattack' ]
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'celebrate', 'tailwhip', 'sandattack', 'razorleaf' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        gender: 'F',
        isHidden: true,
        moves: [ 'leafblade', 'swordsdance', 'sunnyday', 'synthesis' ],
        pokeball: 'cherishball'
      }
    ]
  },
  glaceon: {
    learnset: {
      auroraveil: [ '7S2' ],
      blizzard: [ '7S2' ],
      celebrate: [ '6S1' ],
      hail: [ '7S2' ],
      helpinghand: [ '5S0' ],
      icywind: [ '6S1' ],
      sandattack: [ '6S1', '5S0' ],
      shadowball: [ '7S2' ],
      tackle: [ '5S0' ],
      tailwhip: [ '6S1', '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'tailwhip', 'tackle', 'helpinghand', 'sandattack' ]
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'celebrate', 'tailwhip', 'sandattack', 'icywind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        gender: 'F',
        moves: [ 'blizzard', 'shadowball', 'hail', 'auroraveil' ],
        pokeball: 'cherishball'
      }
    ]
  },
  porygon: {
    learnset: {
      conversion: [ '5S0' ],
      conversion2: [ '8S1' ],
      magnetrise: [ '8S1' ],
      psybeam: [ '8S1', '5S0' ],
      sharpen: [ '5S0' ],
      tackle: [ '5S0' ],
      thundershock: [ '8S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 10,
        isHidden: true,
        moves: [ 'tackle', 'conversion', 'sharpen', 'psybeam' ]
      },
      {
        generation: 8,
        level: 25,
        isHidden: true,
        moves: [ 'magnetrise', 'thundershock', 'psybeam', 'conversion2' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 1, level: 18 } ]
  },
  porygon2: {
    learnset: {
      icebeam: [ '8S0' ],
      recover: [ '8S0' ],
      thunderbolt: [ '8S0' ],
      trickroom: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 50,
        nature: 'Sassy',
        abilities: [ 'download' ],
        ivs: { hp: 31, atk: 0, spe: 0 },
        moves: [ 'recover', 'trickroom', 'icebeam', 'thunderbolt' ],
        pokeball: 'cherishball'
      }
    ]
  },
  omanyte: {
    learnset: { bite: [ '5S0' ], bubblebeam: [ '5S0' ], supersonic: [ '5S0' ], withdraw: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 15,
        gender: 'M',
        abilities: [ 'swiftswim' ],
        moves: [ 'bubblebeam', 'supersonic', 'withdraw', 'bite' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  kabuto: {
    learnset: { confuseray: [ '5S0' ], dig: [ '5S0' ], harden: [ '5S0' ], scratch: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 15,
        gender: 'M',
        abilities: [ 'battlearmor' ],
        moves: [ 'confuseray', 'dig', 'scratch', 'harden' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  aerodactyl: {
    learnset: {
      ancientpower: [ '7S1' ],
      celebrate: [ '7S1' ],
      firefang: [ '5S0' ],
      icefang: [ '5S0' ],
      rockpolish: [ '7S1' ],
      steelwing: [ '5S0' ],
      thunderfang: [ '5S0' ],
      wideguard: [ '7S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 15,
        gender: 'M',
        abilities: [ 'pressure' ],
        moves: [ 'steelwing', 'icefang', 'firefang', 'thunderfang' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        isHidden: true,
        moves: [ 'ancientpower', 'rockpolish', 'wideguard', 'celebrate' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  munchlax: {
    learnset: {
      curse: [ '4S1' ],
      defensecurl: [ '4S0' ],
      happyhour: [ '7S2' ],
      holdback: [ '7S2' ],
      lick: [ '9S3' ],
      metronome: [ '7S2', '4S0', '4S1' ],
      odorsleuth: [ '4S1' ],
      selfdestruct: [ '4S0' ],
      tackle: [ '9S3', '7S2', '4S0', '4S1' ]
    },
    eventData: [
      {
        generation: 4,
        level: 5,
        moves: [ 'metronome', 'tackle', 'defensecurl', 'selfdestruct' ]
      },
      {
        generation: 4,
        level: 5,
        gender: 'F',
        nature: 'Relaxed',
        abilities: [ 'thickfat' ],
        moves: [ 'metronome', 'odorsleuth', 'tackle', 'curse' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 5,
        abilities: [ 'thickfat' ],
        moves: [ 'tackle', 'metronome', 'holdback', 'happyhour' ],
        pokeball: 'cherishball'
      },
      {
        generation: 9,
        level: 1,
        shiny: true,
        gender: 'M',
        isHidden: true,
        nature: 'Impish',
        moves: [ 'lick', 'tackle' ],
        pokeball: 'pokeball'
      }
    ]
  },
  snorlax: {
    learnset: {
      block: [ '7S1' ],
      bodyslam: [ '7S1', '3S0' ],
      celebrate: [ '7S1' ],
      curse: [ '3S0' ],
      fissure: [ '3S0' ],
      refresh: [ '3S0' ],
      sunnyday: [ '7S1' ]
    },
    eventData: [
      { generation: 3, level: 43, moves: [ 'refresh', 'fissure', 'curse', 'bodyslam' ] },
      {
        generation: 7,
        level: 30,
        abilities: [ 'thickfat' ],
        moves: [ 'sunnyday', 'block', 'bodyslam', 'celebrate' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 1, level: 30 } ]
  },
  articuno: {
    learnset: {
      agility: [ '4S3', '4S4', '3S0', '3S1' ],
      ancientpower: [ '7S7' ],
      blizzard: [ '9S9' ],
      extrasensory: [ '3S2' ],
      freezedry: [ '8S8', '7S7', '6S6' ],
      hail: [ '7S7', '6S5', '6S6' ],
      haze: [ '9S9', '3S2' ],
      healbell: [ '3S2' ],
      hurricane: [ '9S9', '8S8' ],
      icebeam: [
        '8S8', '6S5',
        '6S6', '4S3',
        '4S4', '3S0',
        '3S1', '3S2'
      ],
      mindreader: [ '4S4', '3S0', '3S1' ],
      mist: [ '8S8', '4S4', '3S0' ],
      reflect: [ '7S7', '6S5', '6S6', '4S3', '3S1' ],
      roost: [ '4S3' ],
      sheercold: [ '9S9' ],
      tailwind: [ '6S5' ]
    },
    eventData: [
      {
        generation: 3,
        level: 50,
        shiny: 1,
        moves: [ 'mist', 'agility', 'mindreader', 'icebeam' ]
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'agility', 'mindreader', 'icebeam', 'reflect' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 50,
        moves: [ 'icebeam', 'healbell', 'extrasensory', 'haze' ]
      },
      {
        generation: 4,
        level: 60,
        shiny: 1,
        moves: [ 'agility', 'icebeam', 'reflect', 'roost' ]
      },
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'mist', 'agility', 'mindreader', 'icebeam' ]
      },
      { generation: 6, level: 70, moves: [ 'icebeam', 'reflect', 'hail', 'tailwind' ] },
      {
        generation: 6,
        level: 70,
        isHidden: true,
        moves: [ 'freezedry', 'icebeam', 'hail', 'reflect' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'ancientpower', 'freezedry', 'reflect', 'hail' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'icebeam', 'freezedry', 'hurricane', 'mist' ]
      },
      { generation: 9, level: 70, moves: [ 'sheercold', 'blizzard', 'hurricane', 'haze' ] }
    ],
    encounters: [ { generation: 1, level: 50 } ],
    eventOnly: true
  },
  articunogalar: {
    learnset: {
      freezingglare: [ '8S0', '8S1' ],
      hurricane: [ '8S0', '8S1' ],
      psychocut: [ '8S0', '8S1' ],
      psychoshift: [ '8S0', '8S1' ]
    },
    eventData: [
      {
        generation: 8,
        level: 70,
        moves: [ 'freezingglare', 'hurricane', 'psychocut', 'psychoshift' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: true,
        moves: [ 'freezingglare', 'hurricane', 'psychocut', 'psychoshift' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  zapdos: {
    learnset: {
      agility: [
        '8S8', '6S5',
        '6S6', '4S3',
        '4S4', '3S0',
        '3S1'
      ],
      ancientpower: [ '7S7' ],
      batonpass: [ '3S2' ],
      bravebird: [ '8S8' ],
      charge: [ '4S3', '3S1' ],
      detect: [ '9S9', '4S4', '3S0', '3S1' ],
      discharge: [ '7S7', '6S5', '6S6', '4S3' ],
      drillpeck: [ '8S8', '4S4', '3S0', '3S1' ],
      extrasensory: [ '3S2' ],
      lightscreen: [ '6S5' ],
      magneticflux: [ '9S9' ],
      metalsound: [ '3S2' ],
      pluck: [ '7S7' ],
      raindance: [ '7S7', '6S5', '6S6' ],
      roost: [ '4S3' ],
      thunder: [ '9S9', '8S8' ],
      thunderbolt: [ '3S2' ],
      thundershock: [ '6S6' ],
      thunderwave: [ '4S4', '3S0' ],
      zapcannon: [ '9S9' ]
    },
    eventData: [
      {
        generation: 3,
        level: 50,
        shiny: 1,
        moves: [ 'thunderwave', 'agility', 'detect', 'drillpeck' ]
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'agility', 'detect', 'drillpeck', 'charge' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 50,
        moves: [ 'thunderbolt', 'extrasensory', 'batonpass', 'metalsound' ]
      },
      {
        generation: 4,
        level: 60,
        shiny: 1,
        moves: [ 'charge', 'agility', 'discharge', 'roost' ]
      },
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'thunderwave', 'agility', 'detect', 'drillpeck' ]
      },
      {
        generation: 6,
        level: 70,
        moves: [ 'agility', 'discharge', 'raindance', 'lightscreen' ]
      },
      {
        generation: 6,
        level: 70,
        isHidden: true,
        moves: [ 'discharge', 'thundershock', 'raindance', 'agility' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'ancientpower', 'discharge', 'pluck', 'raindance' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'thunder', 'drillpeck', 'bravebird', 'agility' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'zapcannon', 'magneticflux', 'detect', 'thunder' ]
      }
    ],
    encounters: [ { generation: 1, level: 50 } ],
    eventOnly: true
  },
  zapdosgalar: {
    learnset: {
      drillpeck: [ '8S0', '8S1' ],
      focusenergy: [ '8S0', '8S1' ],
      reversal: [ '8S0', '8S1' ],
      thunderouskick: [ '8S0', '8S1' ]
    },
    eventData: [
      {
        generation: 8,
        level: 70,
        moves: [ 'thunderouskick', 'drillpeck', 'reversal', 'focusenergy' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: true,
        moves: [ 'thunderouskick', 'drillpeck', 'reversal', 'focusenergy' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  moltres: {
    learnset: {
      agility: [ '4S4', '3S0', '3S1' ],
      airslash: [ '7S7', '6S5', '4S3' ],
      ancientpower: [ '7S7' ],
      endure: [ '9S9', '4S4', '3S0', '3S1' ],
      extrasensory: [ '3S2' ],
      firespin: [ '8S8', '4S4', '3S0' ],
      flamethrower: [ '7S7', '4S3', '4S4', '3S0', '3S1', '3S2' ],
      heatwave: [ '8S8', '6S5', '6S6' ],
      hurricane: [ '9S9' ],
      leer: [ '8S8' ],
      morningsun: [ '3S2' ],
      overheat: [ '9S9' ],
      roost: [ '4S3' ],
      safeguard: [ '6S5', '6S6', '4S3', '3S1' ],
      skyattack: [ '9S9', '6S6' ],
      sunnyday: [ '7S7', '6S5', '6S6' ],
      willowisp: [ '3S2' ],
      wingattack: [ '8S8' ]
    },
    eventData: [
      {
        generation: 3,
        level: 50,
        shiny: 1,
        moves: [ 'firespin', 'agility', 'endure', 'flamethrower' ]
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'agility', 'endure', 'flamethrower', 'safeguard' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 50,
        moves: [ 'extrasensory', 'morningsun', 'willowisp', 'flamethrower' ]
      },
      {
        generation: 4,
        level: 60,
        shiny: 1,
        moves: [ 'flamethrower', 'safeguard', 'airslash', 'roost' ]
      },
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'firespin', 'agility', 'endure', 'flamethrower' ]
      },
      {
        generation: 6,
        level: 70,
        moves: [ 'safeguard', 'airslash', 'sunnyday', 'heatwave' ]
      },
      {
        generation: 6,
        level: 70,
        isHidden: true,
        moves: [ 'skyattack', 'heatwave', 'sunnyday', 'safeguard' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'ancientpower', 'flamethrower', 'airslash', 'sunnyday' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'heatwave', 'wingattack', 'leer', 'firespin' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'skyattack', 'overheat', 'endure', 'hurricane' ]
      }
    ],
    encounters: [ { generation: 1, level: 50 } ],
    eventOnly: true
  },
  moltresgalar: {
    learnset: {
      fierywrath: [ '8S0', '8S1' ],
      hurricane: [ '8S0', '8S1' ],
      nastyplot: [ '8S0', '8S1' ],
      suckerpunch: [ '8S0', '8S1' ]
    },
    eventData: [
      {
        generation: 8,
        level: 70,
        moves: [ 'fierywrath', 'hurricane', 'suckerpunch', 'nastyplot' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: true,
        moves: [ 'fierywrath', 'hurricane', 'suckerpunch', 'nastyplot' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  dratini: { encounters: [ { generation: 1, level: 10 } ] },
  dragonair: {
    encounters: [
      { generation: 1, level: 15 },
      { generation: 2, level: 10 },
      { generation: 3, level: 25, pokeball: 'safariball' },
      { generation: 4, level: 15 },
      { generation: 7, level: 10 }
    ]
  },
  dragonite: {
    learnset: {
      agility: [ '6S8', '3S0' ],
      barrier: [ '6S8' ],
      dracometeor: [ '8S9', '4S2' ],
      dragonclaw: [ '8S9' ],
      dragondance: [ '8S9', '6S7', '5S3', '4S2', '3S1' ],
      dragonrush: [ '5S4', '5S5' ],
      earthquake: [ '3S1' ],
      extremespeed: [ '6S7', '5S3', '5S5' ],
      fireblast: [ '5S6' ],
      firepunch: [ '5S3' ],
      healbell: [ '3S1' ],
      hurricane: [ '8S9', '6S7' ],
      hyperbeam: [ '6S8', '5S6', '3S1' ],
      outrage: [ '6S7', '5S3', '5S6', '4S2', '3S0' ],
      safeguard: [ '5S4', '5S5', '5S6', '3S0' ],
      slam: [ '6S8' ],
      thunderbolt: [ '4S2' ],
      thunderpunch: [ '5S4' ],
      wingattack: [ '5S4', '5S5', '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        moves: [ 'agility', 'safeguard', 'wingattack', 'outrage' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 55,
        moves: [ 'healbell', 'hyperbeam', 'dragondance', 'earthquake' ]
      },
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Mild',
        moves: [ 'dracometeor', 'thunderbolt', 'outrage', 'dragondance' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 100,
        gender: 'M',
        isHidden: true,
        moves: [ 'extremespeed', 'firepunch', 'dragondance', 'outrage' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 55,
        gender: 'M',
        isHidden: true,
        moves: [ 'dragonrush', 'safeguard', 'wingattack', 'thunderpunch' ]
      },
      {
        generation: 5,
        level: 55,
        gender: 'M',
        isHidden: true,
        moves: [ 'dragonrush', 'safeguard', 'wingattack', 'extremespeed' ]
      },
      {
        generation: 5,
        level: 50,
        gender: 'M',
        nature: 'Brave',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        moves: [ 'fireblast', 'safeguard', 'outrage', 'hyperbeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 55,
        gender: 'M',
        isHidden: true,
        moves: [ 'dragondance', 'outrage', 'hurricane', 'extremespeed' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 62,
        gender: 'M',
        ivs: { hp: 31, def: 31, spa: 31, spd: 31 },
        moves: [ 'agility', 'slam', 'barrier', 'hyperbeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 80,
        gender: 'F',
        nature: 'Jolly',
        abilities: [ 'innerfocus' ],
        ivs: { hp: 30, atk: 31, def: 30, spa: 30, spd: 31, spe: 31 },
        moves: [ 'dragonclaw', 'dracometeor', 'hurricane', 'dragondance' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 5, level: 50 }, { generation: 7, level: 10 } ]
  },
  mewtwo: {
    learnset: {
      amnesia: [ '4S1' ],
      aurasphere: [ '9S8', '6S4', '6S5', '5S2' ],
      barrier: [ '6S4' ],
      blizzard: [ '8S7' ],
      calmmind: [ '9S8' ],
      disable: [ '8S7' ],
      electroball: [ '5S2' ],
      guardswap: [ '4S1' ],
      healpulse: [ '5S3' ],
      hurricane: [ '5S3' ],
      icebeam: [ '9S8', '5S3' ],
      powerswap: [ '4S1' ],
      psychic: [ '8S7', '7S6', '6S4', '6S5', '3S0' ],
      psychocut: [ '7S6', '4S1' ],
      psystrike: [ '9S8', '6S5', '5S2', '5S3' ],
      recover: [ '8S7', '7S6', '6S4', '6S5', '3S0' ],
      safeguard: [ '3S0' ],
      shadowball: [ '5S2' ],
      swift: [ '7S6', '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        shiny: 1,
        moves: [ 'swift', 'recover', 'safeguard', 'psychic' ]
      },
      {
        generation: 4,
        level: 70,
        shiny: 1,
        moves: [ 'psychocut', 'amnesia', 'powerswap', 'guardswap' ]
      },
      {
        generation: 5,
        level: 70,
        moves: [ 'psystrike', 'shadowball', 'aurasphere', 'electroball' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 100,
        nature: 'Timid',
        ivs: { spa: 31, spe: 31 },
        isHidden: true,
        moves: [ 'psystrike', 'icebeam', 'healpulse', 'hurricane' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 70,
        moves: [ 'recover', 'psychic', 'barrier', 'aurasphere' ]
      },
      {
        generation: 6,
        level: 100,
        shiny: true,
        isHidden: true,
        moves: [ 'psystrike', 'psychic', 'recover', 'aurasphere' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'psychic', 'recover', 'swift', 'psychocut' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'psychic', 'disable', 'recover', 'blizzard' ]
      },
      {
        generation: 9,
        level: 100,
        nature: 'Modest',
        perfectIVs: 6,
        isHidden: true,
        moves: [ 'psystrike', 'aurasphere', 'icebeam', 'calmmind' ]
      }
    ],
    encounters: [ { generation: 1, level: 70 } ],
    eventOnly: true
  },
  mew: {
    learnset: {
      airslash: [ '9S26' ],
      amnesia: [ '4S17' ],
      ancientpower: [ '4S14' ],
      aurasphere: [
        '9S26', '4S14',
        '4S15', '4S16',
        '4S17', '4S18',
        '4S19'
      ],
      barrier: [ '7S24', '4S15' ],
      darkpulse: [ '9S26' ],
      dazzlinggleam: [ '9S26' ],
      dragonpulse: [ '9S26' ],
      earthpower: [ '9S26' ],
      energyball: [ '9S26' ],
      fakeout: [ '3S2', '3S3' ],
      feintattack: [ '3S4', '3S5' ],
      flamethrower: [ '9S26' ],
      flashcannon: [ '9S26' ],
      hypervoice: [ '9S26' ],
      hypnosis: [ '4S20', '3S6', '3S7' ],
      icebeam: [ '9S26' ],
      lifedew: [ '9S26' ],
      lightscreen: [ '9S26' ],
      megapunch: [ '4S16', '3S0' ],
      metronome: [
        '7S24', '4S14',
        '4S15', '4S16',
        '4S17', '4S18',
        '4S19', '3S0'
      ],
      nightshade: [ '3S8', '3S9' ],
      pollenpuff: [ '9S26' ],
      pound: [ '8S25', '7S23', '6S22', '4S21', '3S0', '3S1' ],
      powergem: [ '9S26' ],
      psychic: [ '7S24', '4S19' ],
      psyshock: [ '9S26' ],
      return: [ '4S20' ],
      roleplay: [ '3S10', '3S11' ],
      shadowball: [ '9S26' ],
      sludgebomb: [ '9S26' ],
      surf: [ '9S26' ],
      swift: [ '9S26' ],
      synthesis: [ '4S20' ],
      teleport: [
        '4S14', '4S15',
        '4S16', '4S17',
        '4S18', '4S19',
        '4S20'
      ],
      thunderbolt: [ '9S26' ],
      transform: [ '7S24', '4S18', '3S0', '3S1' ],
      zapcannon: [ '3S12', '3S13' ]
    },
    eventData: [
      {
        generation: 3,
        level: 30,
        shiny: 1,
        moves: [ 'pound', 'transform', 'megapunch', 'metronome' ]
      },
      { generation: 3, level: 10, moves: [ 'pound', 'transform' ], pokeball: 'pokeball' },
      { generation: 3, level: 30, shiny: 1, moves: [ 'fakeout' ] },
      { generation: 3, level: 10, moves: [ 'fakeout' ], pokeball: 'pokeball' },
      { generation: 3, level: 30, shiny: 1, moves: [ 'feintattack' ] },
      { generation: 3, level: 10, moves: [ 'feintattack' ], pokeball: 'pokeball' },
      { generation: 3, level: 30, shiny: 1, moves: [ 'hypnosis' ] },
      { generation: 3, level: 10, moves: [ 'hypnosis' ], pokeball: 'pokeball' },
      { generation: 3, level: 30, shiny: 1, moves: [ 'nightshade' ] },
      { generation: 3, level: 10, moves: [ 'nightshade' ], pokeball: 'pokeball' },
      { generation: 3, level: 30, shiny: 1, moves: [ 'roleplay' ] },
      { generation: 3, level: 10, moves: [ 'roleplay' ], pokeball: 'pokeball' },
      { generation: 3, level: 30, shiny: 1, moves: [ 'zapcannon' ] },
      { generation: 3, level: 10, moves: [ 'zapcannon' ], pokeball: 'pokeball' },
      {
        generation: 4,
        level: 50,
        moves: [ 'ancientpower', 'metronome', 'teleport', 'aurasphere' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'barrier', 'metronome', 'teleport', 'aurasphere' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'megapunch', 'metronome', 'teleport', 'aurasphere' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'amnesia', 'metronome', 'teleport', 'aurasphere' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'transform', 'metronome', 'teleport', 'aurasphere' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'psychic', 'metronome', 'teleport', 'aurasphere' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'synthesis', 'return', 'hypnosis', 'teleport' ],
        pokeball: 'cherishball'
      },
      { generation: 4, level: 5, moves: [ 'pound' ], pokeball: 'cherishball' },
      { generation: 6, level: 100, moves: [ 'pound' ], pokeball: 'cherishball' },
      { generation: 7, level: 5, perfectIVs: 5, moves: [ 'pound' ], pokeball: 'pokeball' },
      {
        generation: 7,
        level: 50,
        moves: [ 'psychic', 'barrier', 'metronome', 'transform' ],
        pokeball: 'cherishball'
      },
      { generation: 8, level: 1, moves: [ 'pound' ], pokeball: 'pokeball' },
      {
        generation: 9,
        level: 5,
        moves: [
          'pollenpuff',    'darkpulse',
          'dragonpulse',   'thunderbolt',
          'dazzlinggleam', 'aurasphere',
          'flamethrower',  'airslash',
          'shadowball',    'energyball',
          'earthpower',    'icebeam',
          'hypervoice',    'sludgebomb',
          'psyshock',      'powergem',
          'flashcannon',   'surf',
          'swift',         'lightscreen',
          'lifedew'
        ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  chikorita: {
    learnset: {
      ancientpower: [ '3S1' ],
      frenzyplant: [ '3S1' ],
      growl: [ '6S2', '3S0', '3S1' ],
      razorleaf: [ '3S0' ],
      tackle: [ '6S2', '3S0', '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'tackle', 'growl', 'razorleaf' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        moves: [ 'tackle', 'growl', 'ancientpower', 'frenzyplant' ],
        pokeball: 'pokeball'
      },
      { generation: 6, level: 5, moves: [ 'tackle', 'growl' ], pokeball: 'cherishball' }
    ]
  },
  meganium: {
    learnset: {
      bodyslam: [ '6S0' ],
      solarbeam: [ '6S0' ],
      sunnyday: [ '6S0' ],
      synthesis: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        isHidden: true,
        moves: [ 'solarbeam', 'sunnyday', 'synthesis', 'bodyslam' ],
        pokeball: 'pokeball'
      }
    ]
  },
  cyndaquil: {
    learnset: {
      blastburn: [ '3S1' ],
      leer: [ '6S2', '3S0', '3S1' ],
      reversal: [ '3S1' ],
      smokescreen: [ '3S0' ],
      tackle: [ '6S2', '3S0', '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'tackle', 'leer', 'smokescreen' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        moves: [ 'tackle', 'leer', 'reversal', 'blastburn' ],
        pokeball: 'pokeball'
      },
      { generation: 6, level: 5, moves: [ 'tackle', 'leer' ], pokeball: 'cherishball' }
    ]
  },
  typhlosion: {
    learnset: {
      flamecharge: [ '6S1' ],
      flamethrower: [ '3S0' ],
      flamewheel: [ '6S1', '3S0' ],
      overheat: [ '6S1' ],
      quickattack: [ '3S0' ],
      swift: [ '6S1', '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        moves: [ 'quickattack', 'flamewheel', 'swift', 'flamethrower' ],
        pokeball: 'pokeball'
      },
      {
        generation: 6,
        level: 50,
        isHidden: true,
        moves: [ 'overheat', 'flamewheel', 'flamecharge', 'swift' ],
        pokeball: 'pokeball'
      }
    ]
  },
  totodile: {
    learnset: {
      crunch: [ '3S1' ],
      hydrocannon: [ '3S1' ],
      leer: [ '6S2', '3S0', '3S1' ],
      rage: [ '3S0' ],
      scratch: [ '6S2', '3S0', '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'scratch', 'leer', 'rage' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        moves: [ 'scratch', 'leer', 'crunch', 'hydrocannon' ],
        pokeball: 'pokeball'
      },
      { generation: 6, level: 5, moves: [ 'scratch', 'leer' ], pokeball: 'cherishball' }
    ]
  },
  feraligatr: {
    learnset: { crunch: [ '6S0' ], icepunch: [ '6S0' ], screech: [ '6S0' ], waterfall: [ '6S0' ] },
    eventData: [
      {
        generation: 6,
        level: 50,
        isHidden: true,
        moves: [ 'icepunch', 'crunch', 'waterfall', 'screech' ],
        pokeball: 'pokeball'
      }
    ]
  },
  sentret: { encounters: [ { generation: 2, level: 2 } ] },
  furret: { encounters: [ { generation: 2, level: 6 }, { generation: 4, level: 6 } ] },
  hoothoot: {
    learnset: { foresight: [ '3S0' ], growl: [ '3S0' ], tackle: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'tackle', 'growl', 'foresight' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 2, level: 2 } ]
  },
  noctowl: {
    encounters: [
      { generation: 2, level: 7 },
      { generation: 4, level: 5 },
      { generation: 7, level: 19 }
    ]
  },
  ledyba: {
    learnset: { aerialace: [ '3S0' ], psybeam: [ '3S0' ], refresh: [ '3S0' ], supersonic: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        moves: [ 'refresh', 'psybeam', 'aerialace', 'supersonic' ]
      }
    ],
    encounters: [ { generation: 2, level: 3 } ]
  },
  ledian: { encounters: [ { generation: 2, level: 7 }, { generation: 4, level: 5 } ] },
  spinarak: {
    learnset: { dig: [ '3S0' ], nightshade: [ '3S0' ], refresh: [ '3S0' ], signalbeam: [ '3S0' ] },
    eventData: [
      { generation: 3, level: 14, moves: [ 'refresh', 'dig', 'signalbeam', 'nightshade' ] }
    ],
    encounters: [ { generation: 2, level: 3 } ]
  },
  ariados: {
    learnset: {
      crosspoison: [ '9S0' ],
      poisonjab: [ '9S0' ],
      stickyweb: [ '9S0' ],
      toxicthread: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 65,
        gender: 'M',
        nature: 'Hardy',
        abilities: [ 'swarm' ],
        ivs: { hp: 20, atk: 20, def: 20, spa: 20, spd: 20, spe: 20 },
        moves: [ 'toxicthread', 'stickyweb', 'crosspoison', 'poisonjab' ]
      }
    ],
    encounters: [
      { generation: 2, level: 7 },
      { generation: 4, level: 5 },
      { generation: 6, level: 19, maxEggMoves: 1 }
    ]
  },
  lanturn: {
    encounters: [
      { generation: 4, level: 20 },
      { generation: 6, level: 26, maxEggMoves: 1 },
      { generation: 7, level: 10 }
    ]
  },
  togepi: {
    learnset: {
      ancientpower: [ '3S1' ],
      charm: [ '3S0' ],
      followme: [ '3S1' ],
      helpinghand: [ '3S1' ],
      metronome: [ '3S0' ],
      sweetkiss: [ '3S0' ],
      triattack: [ '3S1' ],
      yawn: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 20,
        gender: 'F',
        abilities: [ 'serenegrace' ],
        moves: [ 'metronome', 'charm', 'sweetkiss', 'yawn' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 25,
        moves: [ 'triattack', 'followme', 'ancientpower', 'helpinghand' ]
      }
    ]
  },
  togekiss: {
    learnset: {
      airslash: [ '5S0' ],
      aurasphere: [ '5S0' ],
      extremespeed: [ '5S0' ],
      present: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'extremespeed', 'aurasphere', 'airslash', 'present' ]
      }
    ]
  },
  natu: {
    learnset: {
      aerialace: [ '3S0' ],
      batonpass: [ '3S0' ],
      futuresight: [ '3S0' ],
      nightshade: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 22,
        moves: [ 'batonpass', 'futuresight', 'nightshade', 'aerialace' ]
      }
    ]
  },
  xatu: {
    encounters: [
      { generation: 2, level: 15 },
      {
        generation: 4,
        level: 16,
        gender: 'M',
        nature: 'Modest',
        ivs: { hp: 15, atk: 20, def: 15, spa: 20, spd: 20, spe: 20 },
        abilities: [ 'synchronize' ],
        pokeball: 'pokeball'
      },
      { generation: 6, level: 24, maxEggMoves: 1 },
      { generation: 7, level: 21 }
    ]
  },
  mareep: {
    learnset: {
      bodyslam: [ '3S2' ],
      cottonspore: [ '3S0' ],
      growl: [ '3S1' ],
      healbell: [ '3S2' ],
      holdback: [ '6S3' ],
      tackle: [ '6S3', '3S1' ],
      thunder: [ '3S0' ],
      thundershock: [ '6S3', '3S0', '3S1', '3S2' ],
      thunderwave: [ '6S3', '3S0', '3S2' ]
    },
    eventData: [
      {
        generation: 3,
        level: 37,
        gender: 'F',
        moves: [ 'thunder', 'thundershock', 'thunderwave', 'cottonspore' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'tackle', 'growl', 'thundershock' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 17,
        moves: [ 'healbell', 'thundershock', 'thunderwave', 'bodyslam' ]
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'holdback', 'tackle', 'thunderwave', 'thundershock' ],
        pokeball: 'cherishball'
      }
    ]
  },
  flaaffy: { encounters: [ { generation: 7, level: 11, pokeball: 'pokeball' } ] },
  azumarill: {
    encounters: [ { generation: 5, level: 5 }, { generation: 6, level: 16, maxEggMoves: 1 } ]
  },
  hoppip: { encounters: [ { generation: 2, level: 3 } ] },
  skiploom: { encounters: [ { generation: 4, level: 12 } ] },
  jumpluff: {
    learnset: {
      bulletseed: [ '5S0' ],
      falseswipe: [ '5S0' ],
      leechseed: [ '5S0' ],
      sleeppowder: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 27,
        gender: 'M',
        isHidden: true,
        moves: [ 'falseswipe', 'sleeppowder', 'bulletseed', 'leechseed' ]
      }
    ]
  },
  aipom: {
    learnset: { sandattack: [ '3S0' ], scratch: [ '3S0' ], tailwhip: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'scratch', 'tailwhip', 'sandattack' ],
        pokeball: 'pokeball'
      }
    ]
  },
  sunkern: {
    learnset: { absorb: [ '3S0' ], growth: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        abilities: [ 'chlorophyll' ],
        moves: [ 'absorb', 'growth' ],
        pokeball: 'pokeball'
      }
    ]
  },
  wooper: { encounters: [ { generation: 2, level: 4 } ] },
  quagsire: { encounters: [ { generation: 2, level: 15 }, { generation: 4, level: 10 } ] },
  murkrow: {
    learnset: { astonish: [ '3S0' ], peck: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        abilities: [ 'insomnia' ],
        moves: [ 'peck', 'astonish' ],
        pokeball: 'pokeball'
      }
    ]
  },
  honchkrow: {
    learnset: {
      heatwave: [ '7S0' ],
      icywind: [ '7S0' ],
      nightslash: [ '7S0' ],
      skyattack: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 65,
        gender: 'M',
        abilities: [ 'superluck' ],
        moves: [ 'nightslash', 'skyattack', 'heatwave', 'icywind' ],
        pokeball: 'cherishball'
      }
    ]
  },
  misdreavus: {
    learnset: { growl: [ '3S0' ], psywave: [ '3S0' ], spite: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'growl', 'psywave', 'spite' ],
        pokeball: 'pokeball'
      }
    ]
  },
  unown: {
    encounters: [
      { generation: 2, level: 5 },
      { generation: 3, level: 25 },
      { generation: 4, level: 5 },
      { generation: 6, level: 32 }
    ]
  },
  wynaut: {
    learnset: { charm: [ '3S0' ], encore: [ '3S0' ], splash: [ '3S0' ], tickle: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'splash', 'charm', 'encore', 'tickle' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      }
    ]
  },
  wobbuffet: {
    learnset: {
      counter: [ '6S2', '6S3', '3S0', '3S1' ],
      destinybond: [ '3S0', '3S1' ],
      mirrorcoat: [ '6S3', '3S0', '3S1' ],
      safeguard: [ '3S0', '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        moves: [ 'counter', 'mirrorcoat', 'safeguard', 'destinybond' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'counter', 'mirrorcoat', 'safeguard', 'destinybond' ],
        pokeball: 'pokeball'
      },
      {
        generation: 6,
        level: 10,
        gender: 'M',
        moves: [ 'counter' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 15,
        gender: 'M',
        moves: [ 'counter', 'mirrorcoat' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 2, level: 5 }, { generation: 4, level: 3 } ]
  },
  pineco: {
    learnset: {
      counter: [ '3S1' ],
      pinmissile: [ '3S1' ],
      protect: [ '3S0' ],
      refresh: [ '3S1' ],
      selfdestruct: [ '3S0' ],
      spikes: [ '3S1' ],
      tackle: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'tackle', 'protect', 'selfdestruct' ],
        pokeball: 'pokeball'
      },
      { generation: 3, level: 20, moves: [ 'refresh', 'pinmissile', 'spikes', 'counter' ] }
    ]
  },
  forretress: { encounters: [ { generation: 6, level: 30 } ] },
  gligar: {
    learnset: { poisonsting: [ '3S0' ], sandattack: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'poisonsting', 'sandattack' ],
        pokeball: 'pokeball'
      }
    ]
  },
  snubbull: {
    learnset: { charm: [ '3S0' ], scaryface: [ '3S0' ], tackle: [ '3S0' ], tailwhip: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'tackle', 'scaryface', 'tailwhip', 'charm' ],
        pokeball: 'pokeball'
      }
    ]
  },
  granbull: { encounters: [ { generation: 2, level: 15 } ] },
  qwilfish: {
    learnset: { harden: [ '3S0' ], minimize: [ '3S0' ], poisonsting: [ '3S0' ], tackle: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'tackle', 'poisonsting', 'harden', 'minimize' ],
        pokeball: 'pokeball'
      }
    ]
  },
  shuckle: {
    learnset: {
      constrict: [ '3S0' ],
      encore: [ '3S1' ],
      sludgebomb: [ '3S1' ],
      substitute: [ '3S1' ],
      toxic: [ '3S1' ],
      withdraw: [ '3S0' ],
      wrap: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        abilities: [ 'sturdy' ],
        moves: [ 'constrict', 'withdraw', 'wrap' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 20,
        abilities: [ 'sturdy' ],
        moves: [ 'substitute', 'toxic', 'sludgebomb', 'encore' ],
        pokeball: 'pokeball'
      }
    ]
  },
  heracross: {
    learnset: {
      bulletseed: [ '6S0', '6S1' ],
      closecombat: [ '6S0' ],
      earthquake: [ '6S1' ],
      megahorn: [ '6S0' ],
      pinmissile: [ '6S0', '6S1' ],
      rockblast: [ '6S1' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        gender: 'F',
        nature: 'Adamant',
        moves: [ 'bulletseed', 'pinmissile', 'closecombat', 'megahorn' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        nature: 'Adamant',
        abilities: [ 'guts' ],
        moves: [ 'pinmissile', 'bulletseed', 'earthquake', 'rockblast' ],
        pokeball: 'cherishball'
      }
    ]
  },
  sneasel: {
    learnset: { leer: [ '3S0' ], quickattack: [ '3S0' ], scratch: [ '3S0' ], taunt: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'scratch', 'leer', 'taunt', 'quickattack' ],
        pokeball: 'pokeball'
      }
    ]
  },
  weavile: {
    learnset: {
      brickbreak: [ '6S1', '4S0' ],
      fakeout: [ '4S0' ],
      icepunch: [ '6S1' ],
      iceshard: [ '4S0' ],
      nightslash: [ '6S1', '4S0' ],
      xscissor: [ '6S1' ]
    },
    eventData: [
      {
        generation: 4,
        level: 30,
        gender: 'M',
        nature: 'Jolly',
        moves: [ 'fakeout', 'iceshard', 'nightslash', 'brickbreak' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 48,
        gender: 'M',
        perfectIVs: 2,
        moves: [ 'nightslash', 'icepunch', 'brickbreak', 'xscissor' ],
        pokeball: 'cherishball'
      }
    ]
  },
  teddiursa: {
    learnset: {
      leer: [ '3S0' ],
      lick: [ '3S0', '3S1' ],
      metalclaw: [ '3S1' ],
      refresh: [ '3S1' ],
      return: [ '3S1' ],
      scratch: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        abilities: [ 'pickup' ],
        moves: [ 'scratch', 'leer', 'lick' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 11,
        abilities: [ 'pickup' ],
        moves: [ 'refresh', 'metalclaw', 'lick', 'return' ]
      }
    ],
    encounters: [ { generation: 2, level: 2 } ]
  },
  ursaring: { encounters: [ { generation: 2, level: 25 } ] },
  ursalunabloodmoon: {
    learnset: { bloodmoon: [ '9S0' ], calmmind: [ '9S0' ], earthpower: [ '9S0' ], slash: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 70,
        nature: 'Hardy',
        perfectIVs: 3,
        moves: [ 'bloodmoon', 'earthpower', 'slash', 'calmmind' ]
      }
    ],
    eventOnly: true
  },
  magcargo: {
    learnset: {
      earthquake: [ '3S0' ],
      flamethrower: [ '3S0' ],
      heatwave: [ '3S0' ],
      refresh: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 38,
        moves: [ 'refresh', 'heatwave', 'earthquake', 'flamethrower' ]
      }
    ],
    encounters: [ { generation: 3, level: 25 }, { generation: 6, level: 30 } ]
  },
  swinub: {
    learnset: { ancientpower: [ '3S0' ], charm: [ '3S0' ], mist: [ '3S0' ], mudshot: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 22,
        abilities: [ 'oblivious' ],
        moves: [ 'charm', 'ancientpower', 'mist', 'mudshot' ]
      }
    ]
  },
  piloswine: { encounters: [ { generation: 6, level: 30 } ] },
  mamoswine: {
    learnset: {
      doublehit: [ '5S0' ],
      earthquake: [ '6S1' ],
      hail: [ '5S0' ],
      icefang: [ '5S0' ],
      iciclecrash: [ '6S1' ],
      iciclespear: [ '6S1' ],
      rockslide: [ '6S1' ],
      takedown: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 34,
        gender: 'M',
        isHidden: true,
        moves: [ 'hail', 'icefang', 'takedown', 'doublehit' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: true,
        gender: 'M',
        nature: 'Adamant',
        isHidden: true,
        moves: [ 'iciclespear', 'earthquake', 'iciclecrash', 'rockslide' ],
        pokeball: 'pokeball'
      }
    ]
  },
  corsola: {
    learnset: { mudsport: [ '3S0' ], powergem: [ '7S1' ], tackle: [ '7S1', '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'tackle', 'mudsport' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      },
      {
        generation: 7,
        level: 50,
        gender: 'F',
        nature: 'Serious',
        abilities: [ 'hustle' ],
        moves: [ 'tackle', 'powergem' ],
        pokeball: 'ultraball'
      }
    ]
  },
  corsolagalar: {
    learnset: { astonish: [ '8S0' ], disable: [ '8S0' ], spite: [ '8S0' ], tackle: [ '8S0' ] },
    eventData: [
      {
        generation: 8,
        level: 15,
        isHidden: true,
        moves: [ 'tackle', 'astonish', 'disable', 'spite' ],
        pokeball: 'cherishball'
      }
    ]
  },
  octillery: {
    learnset: {
      hyperbeam: [ '4S0' ],
      icebeam: [ '4S0' ],
      octazooka: [ '4S0' ],
      signalbeam: [ '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 50,
        gender: 'F',
        nature: 'Serious',
        abilities: [ 'suctioncups' ],
        moves: [ 'octazooka', 'icebeam', 'signalbeam', 'hyperbeam' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 4, level: 19 }, { generation: 7, level: 10 } ]
  },
  delibird: {
    learnset: { happyhour: [ '6S1' ], present: [ '6S1', '3S0' ] },
    eventData: [
      { generation: 3, level: 10, gender: 'M', moves: [ 'present' ], pokeball: 'pokeball' },
      {
        generation: 6,
        level: 10,
        abilities: [ 'vitalspirit' ],
        moves: [ 'present', 'happyhour' ],
        pokeball: 'cherishball'
      }
    ]
  },
  mantine: {
    learnset: { bubble: [ '3S0' ], supersonic: [ '3S0' ], tackle: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'tackle', 'bubble', 'supersonic' ],
        pokeball: 'pokeball'
      }
    ]
  },
  houndour: {
    learnset: {
      charm: [ '3S1' ],
      ember: [ '3S0', '3S1' ],
      feintattack: [ '3S1' ],
      howl: [ '3S0' ],
      leer: [ '3S0' ],
      roar: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'leer', 'ember', 'howl' ],
        pokeball: 'pokeball'
      },
      { generation: 3, level: 17, moves: [ 'charm', 'feintattack', 'ember', 'roar' ] }
    ]
  },
  houndoom: {
    learnset: {
      darkpulse: [ '6S0' ],
      flamethrower: [ '6S0' ],
      sludgebomb: [ '6S0' ],
      solarbeam: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        nature: 'Timid',
        abilities: [ 'flashfire' ],
        moves: [ 'flamethrower', 'darkpulse', 'solarbeam', 'sludgebomb' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 4, level: 20 } ]
  },
  phanpy: { encounters: [ { generation: 2, level: 2 } ] },
  donphan: { encounters: [ { generation: 6, level: 24, maxEggMoves: 1 } ] },
  stantler: {
    learnset: { leer: [ '3S0' ], tackle: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        abilities: [ 'intimidate' ],
        moves: [ 'tackle', 'leer' ],
        pokeball: 'pokeball'
      }
    ]
  },
  smeargle: {
    learnset: {
      falseswipe: [ '5S1' ],
      flamethrower: [ '6S2' ],
      furyswipes: [ '6S2' ],
      meanlook: [ '5S1' ],
      odorsleuth: [ '5S1' ],
      seismictoss: [ '6S2' ],
      sketch: [ '6S2', '3S0' ],
      spore: [ '5S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        abilities: [ 'owntempo' ],
        moves: [ 'sketch' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 50,
        gender: 'F',
        nature: 'Jolly',
        ivs: { atk: 31, spe: 31 },
        abilities: [ 'technician' ],
        moves: [ 'falseswipe', 'spore', 'odorsleuth', 'meanlook' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 40,
        gender: 'M',
        nature: 'Jolly',
        abilities: [ 'owntempo' ],
        moves: [ 'sketch', 'furyswipes', 'seismictoss', 'flamethrower' ],
        pokeball: 'cherishball'
      }
    ]
  },
  miltank: {
    learnset: { attract: [ '6S0' ], milkdrink: [ '6S0' ], rollout: [ '6S0' ], stomp: [ '6S0' ] },
    eventData: [
      {
        generation: 6,
        level: 20,
        perfectIVs: 3,
        abilities: [ 'scrappy' ],
        moves: [ 'rollout', 'attract', 'stomp', 'milkdrink' ],
        pokeball: 'cherishball'
      }
    ]
  },
  raikou: {
    learnset: {
      aurasphere: [ '4S3' ],
      calmmind: [ '7S7' ],
      crunch: [ '7S5', '7S6', '6S4', '3S1' ],
      discharge: [ '9S9', '7S5', '7S6' ],
      extrasensory: [ '9S9', '7S7' ],
      extremespeed: [ '8S8', '4S3' ],
      howl: [ '8S8' ],
      quickattack: [ '4S2', '3S0', '3S1' ],
      raindance: [ '9S9' ],
      reflect: [ '9S9', '7S5', '7S6', '6S4', '4S2', '3S1' ],
      roar: [ '4S2', '3S0' ],
      spark: [ '6S4', '4S2', '3S0', '3S1' ],
      thunderbolt: [ '8S8', '7S7' ],
      thunderfang: [ '7S5', '7S6', '6S4' ],
      thundershock: [ '3S0' ],
      voltswitch: [ '7S7' ],
      weatherball: [ '8S8', '4S3' ],
      zapcannon: [ '4S3' ]
    },
    eventData: [
      {
        generation: 3,
        level: 50,
        shiny: 1,
        moves: [ 'thundershock', 'roar', 'quickattack', 'spark' ]
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'quickattack', 'spark', 'reflect', 'crunch' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 40,
        shiny: 1,
        moves: [ 'roar', 'quickattack', 'spark', 'reflect' ]
      },
      {
        generation: 4,
        level: 30,
        shiny: true,
        nature: 'Rash',
        moves: [ 'zapcannon', 'aurasphere', 'extremespeed', 'weatherball' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'spark', 'reflect', 'crunch', 'thunderfang' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'reflect', 'crunch', 'thunderfang', 'discharge' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'reflect', 'crunch', 'thunderfang', 'discharge' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'thunderbolt', 'voltswitch', 'extrasensory', 'calmmind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'thunderbolt', 'howl', 'extremespeed', 'weatherball' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'raindance', 'reflect', 'discharge', 'extrasensory' ]
      }
    ],
    encounters: [ { generation: 2, level: 40 }, { generation: 3, level: 40 } ],
    eventOnly: true
  },
  entei: {
    learnset: {
      bite: [ '7S5', '7S6' ],
      crunch: [ '8S8' ],
      crushclaw: [ '4S3' ],
      ember: [ '3S0' ],
      extrasensory: [ '9S9' ],
      extremespeed: [ '8S8', '4S3' ],
      firefang: [ '6S4' ],
      firespin: [ '4S2', '3S0', '3S1' ],
      flamecharge: [ '7S7' ],
      flamethrower: [ '8S8', '6S4', '4S2', '3S1' ],
      flareblitz: [ '4S3' ],
      howl: [ '4S3' ],
      ironhead: [ '7S7' ],
      lavaplume: [ '9S9', '7S5', '7S6' ],
      roar: [ '4S2', '3S0' ],
      sacredfire: [ '7S7' ],
      scaryface: [ '8S8' ],
      stomp: [ '7S5', '7S6', '6S4', '4S2', '3S0', '3S1' ],
      stoneedge: [ '7S7' ],
      sunnyday: [ '9S9' ],
      swagger: [ '9S9', '7S5', '7S6', '6S4', '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 50,
        shiny: 1,
        moves: [ 'ember', 'roar', 'firespin', 'stomp' ]
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'firespin', 'stomp', 'flamethrower', 'swagger' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 40,
        shiny: 1,
        moves: [ 'roar', 'firespin', 'stomp', 'flamethrower' ]
      },
      {
        generation: 4,
        level: 30,
        shiny: true,
        nature: 'Adamant',
        moves: [ 'flareblitz', 'howl', 'extremespeed', 'crushclaw' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'stomp', 'flamethrower', 'swagger', 'firefang' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'stomp', 'bite', 'swagger', 'lavaplume' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'stomp', 'bite', 'swagger', 'lavaplume' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'sacredfire', 'stoneedge', 'ironhead', 'flamecharge' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'flamethrower', 'scaryface', 'extremespeed', 'crunch' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'sunnyday', 'swagger', 'lavaplume', 'extrasensory' ]
      }
    ],
    encounters: [ { generation: 2, level: 40 }, { generation: 3, level: 40 } ],
    eventOnly: true
  },
  suicune: {
    learnset: {
      airslash: [ '4S3' ],
      aquaring: [ '4S3' ],
      aurorabeam: [ '7S5', '6S4', '4S2', '3S0', '3S1' ],
      bubblebeam: [ '7S5', '3S0' ],
      calmmind: [ '8S6' ],
      extrasensory: [ '9S7', '8S6' ],
      extremespeed: [ '8S6', '4S3' ],
      gust: [ '4S2', '3S0', '3S1' ],
      icefang: [ '6S4' ],
      liquidation: [ '8S6' ],
      mirrorcoat: [ '9S7', '6S4', '3S1' ],
      mist: [ '7S5', '6S4', '4S2', '3S1' ],
      raindance: [ '9S7', '7S5', '4S2', '3S0' ],
      sheercold: [ '4S3' ],
      surf: [ '9S7' ]
    },
    eventData: [
      {
        generation: 3,
        level: 50,
        shiny: 1,
        moves: [ 'bubblebeam', 'raindance', 'gust', 'aurorabeam' ]
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'gust', 'aurorabeam', 'mist', 'mirrorcoat' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 40,
        shiny: 1,
        moves: [ 'raindance', 'gust', 'aurorabeam', 'mist' ]
      },
      {
        generation: 4,
        level: 30,
        shiny: true,
        nature: 'Relaxed',
        moves: [ 'sheercold', 'airslash', 'extremespeed', 'aquaring' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'aurorabeam', 'mist', 'mirrorcoat', 'icefang' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'bubblebeam', 'aurorabeam', 'mist', 'raindance' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'liquidation', 'extrasensory', 'extremespeed', 'calmmind' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'raindance', 'mirrorcoat', 'surf', 'extrasensory' ]
      }
    ],
    encounters: [ { generation: 2, level: 40 }, { generation: 3, level: 40 } ],
    eventOnly: true
  },
  larvitar: {
    learnset: {
      bite: [ '5S1', '3S0' ],
      dragondance: [ '3S0' ],
      leer: [ '5S1' ],
      outrage: [ '3S0' ],
      sandstorm: [ '5S1', '3S0' ],
      superpower: [ '5S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 20,
        moves: [ 'sandstorm', 'dragondance', 'bite', 'outrage' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 5,
        shiny: true,
        gender: 'M',
        moves: [ 'bite', 'leer', 'sandstorm', 'superpower' ],
        pokeball: 'cherishball'
      }
    ]
  },
  tyranitar: {
    learnset: {
      crunch: [
        '6S3', '6S4',
        '6S5', '6S6',
        '5S1', '5S2',
        '3S0'
      ],
      earthquake: [ '6S3', '6S4', '5S2', '3S0' ],
      fireblast: [ '5S1' ],
      icebeam: [ '5S1' ],
      icepunch: [ '6S3', '6S6' ],
      lowkick: [ '6S5', '6S6' ],
      payback: [ '5S2' ],
      protect: [ '6S5' ],
      rockslide: [ '6S4', '6S5', '6S6' ],
      scaryface: [ '3S0' ],
      seismictoss: [ '5S2' ],
      stoneedge: [ '6S3', '6S4', '5S1' ],
      thrash: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        moves: [ 'thrash', 'scaryface', 'crunch', 'earthquake' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 100,
        gender: 'M',
        moves: [ 'fireblast', 'icebeam', 'stoneedge', 'crunch' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 55,
        gender: 'M',
        isHidden: true,
        moves: [ 'payback', 'crunch', 'earthquake', 'seismictoss' ]
      },
      {
        generation: 6,
        level: 50,
        moves: [ 'stoneedge', 'crunch', 'earthquake', 'icepunch' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        nature: 'Jolly',
        moves: [ 'rockslide', 'earthquake', 'crunch', 'stoneedge' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 55,
        shiny: true,
        nature: 'Adamant',
        ivs: { hp: 31, atk: 31, def: 31, spa: 14, spd: 31, spe: 0 },
        moves: [ 'crunch', 'rockslide', 'lowkick', 'protect' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'rockslide', 'crunch', 'icepunch', 'lowkick' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 5, level: 50 } ]
  },
  lugia: {
    learnset: {
      aeroblast: [
        '9S12', '7S7',
        '7S8',  '7S9',
        '7S10', '6S5',
        '6S6',  '4S2',
        '4S3'
      ],
      ancientpower: [ '8S11', '7S7', '7S9', '4S3' ],
      defog: [ '7S8' ],
      dragonpulse: [ '8S11' ],
      dragonrush: [ '6S6' ],
      earthpower: [ '7S10' ],
      earthquake: [ '3S1' ],
      extrasensory: [ '9S12', '8S11', '7S7', '7S9', '4S2' ],
      featherdance: [ '3S1' ],
      hurricane: [ '7S8' ],
      hydropump: [ '6S5', '6S6', '4S2', '3S0', '3S1' ],
      icebeam: [ '6S6' ],
      psychic: [ '7S10' ],
      psychoboost: [ '3S1' ],
      punishment: [ '6S5', '4S3' ],
      raindance: [ '9S12', '6S5', '4S2', '3S0' ],
      recover: [ '9S12', '3S0' ],
      safeguard: [ '4S3' ],
      skillswap: [ '7S7', '7S9' ],
      swift: [ '3S0' ],
      tailwind: [ '7S8', '7S10' ],
      weatherball: [ '5S4' ],
      whirlpool: [ '8S11' ],
      whirlwind: [ '5S4' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        shiny: 1,
        moves: [ 'recover', 'hydropump', 'raindance', 'swift' ]
      },
      {
        generation: 3,
        level: 50,
        moves: [ 'psychoboost', 'earthquake', 'hydropump', 'featherdance' ]
      },
      {
        generation: 4,
        level: 45,
        shiny: 1,
        moves: [ 'extrasensory', 'raindance', 'hydropump', 'aeroblast' ]
      },
      {
        generation: 4,
        level: 70,
        shiny: 1,
        moves: [ 'aeroblast', 'punishment', 'ancientpower', 'safeguard' ]
      },
      {
        generation: 5,
        level: 5,
        isHidden: true,
        moves: [ 'whirlwind', 'weatherball' ],
        pokeball: 'dreamball'
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'raindance', 'hydropump', 'aeroblast', 'punishment' ]
      },
      {
        generation: 6,
        level: 50,
        nature: 'Timid',
        moves: [ 'aeroblast', 'hydropump', 'dragonrush', 'icebeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'skillswap', 'aeroblast', 'extrasensory', 'ancientpower' ]
      },
      {
        generation: 7,
        level: 100,
        isHidden: true,
        moves: [ 'aeroblast', 'hurricane', 'defog', 'tailwind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'skillswap', 'aeroblast', 'extrasensory', 'ancientpower' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'aeroblast', 'earthpower', 'psychic', 'tailwind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'dragonpulse', 'extrasensory', 'whirlpool', 'ancientpower' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'raindance', 'aeroblast', 'recover', 'extrasensory' ]
      }
    ],
    encounters: [ { generation: 2, level: 40 } ],
    eventOnly: true
  },
  hooh: {
    learnset: {
      ancientpower: [ '8S10', '7S7', '7S8', '4S2' ],
      bravebird: [ '7S6', '7S9', '6S5' ],
      burnup: [ '7S7', '7S8' ],
      celebrate: [ '6S5' ],
      earthquake: [ '7S9' ],
      extrasensory: [ '9S11', '8S10', '7S7', '7S8', '4S1' ],
      fireblast: [ '6S4', '4S1', '3S0' ],
      flareblitz: [ '8S10' ],
      punishment: [ '6S4', '4S2' ],
      recover: [ '9S11', '7S6', '6S5', '3S0' ],
      sacredfire: [
        '9S11', '7S6',
        '7S7',  '7S8',
        '7S9',  '6S4',
        '6S5',  '4S1',
        '4S2'
      ],
      safeguard: [ '7S6', '4S2' ],
      sunnyday: [ '9S11', '8S10', '6S4', '4S1', '3S0' ],
      swift: [ '3S0' ],
      tailwind: [ '7S9' ],
      weatherball: [ '5S3' ],
      whirlwind: [ '5S3' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        shiny: 1,
        moves: [ 'recover', 'fireblast', 'sunnyday', 'swift' ]
      },
      {
        generation: 4,
        level: 45,
        shiny: 1,
        moves: [ 'extrasensory', 'sunnyday', 'fireblast', 'sacredfire' ]
      },
      {
        generation: 4,
        level: 70,
        shiny: 1,
        moves: [ 'sacredfire', 'punishment', 'ancientpower', 'safeguard' ]
      },
      {
        generation: 5,
        level: 5,
        isHidden: true,
        moves: [ 'whirlwind', 'weatherball' ],
        pokeball: 'dreamball'
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'sunnyday', 'fireblast', 'sacredfire', 'punishment' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: true,
        moves: [ 'sacredfire', 'bravebird', 'recover', 'celebrate' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'sacredfire', 'bravebird', 'recover', 'safeguard' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'burnup', 'sacredfire', 'extrasensory', 'ancientpower' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'burnup', 'sacredfire', 'extrasensory', 'ancientpower' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'sacredfire', 'bravebird', 'earthquake', 'tailwind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'flareblitz', 'extrasensory', 'sunnyday', 'ancientpower' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'sunnyday', 'sacredfire', 'recover', 'extrasensory' ]
      }
    ],
    encounters: [ { generation: 2, level: 40 } ],
    eventOnly: true
  },
  celebi: {
    learnset: {
      ancientpower: [ '7S7', '3S1', '3S3' ],
      batonpass: [ '3S1' ],
      confusion: [ '6S6', '3S0' ],
      futuresight: [ '8S8', '7S7', '3S1', '3S3' ],
      healbell: [
        '8S8', '7S7',
        '6S5', '6S6',
        '3S0', '3S2',
        '3S3'
      ],
      healingwish: [ '4S4' ],
      holdback: [ '6S5' ],
      leafstorm: [ '4S4' ],
      leechseed: [ '3S2' ],
      lifedew: [ '8S8' ],
      magicalleaf: [ '8S8' ],
      nastyplot: [ '4S4' ],
      perishsong: [ '3S1' ],
      recover: [ '6S5', '6S6', '4S4', '3S0', '3S2' ],
      safeguard: [ '7S7', '6S5', '6S6', '3S0', '3S2', '3S3' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        moves: [ 'confusion', 'recover', 'healbell', 'safeguard' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'ancientpower', 'futuresight', 'batonpass', 'perishsong' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        moves: [ 'leechseed', 'recover', 'healbell', 'safeguard' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 30,
        moves: [ 'healbell', 'safeguard', 'ancientpower', 'futuresight' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'leafstorm', 'recover', 'nastyplot', 'healingwish' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        moves: [ 'recover', 'healbell', 'safeguard', 'holdback' ],
        pokeball: 'luxuryball'
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'confusion', 'recover', 'healbell', 'safeguard' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 30,
        moves: [ 'healbell', 'safeguard', 'ancientpower', 'futuresight' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 60,
        shiny: true,
        nature: 'Quirky',
        moves: [ 'magicalleaf', 'futuresight', 'lifedew', 'healbell' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 2, level: 30 } ],
    eventOnly: true
  },
  treecko: {
    learnset: { absorb: [ '5S1', '3S0' ], leer: [ '5S1', '3S0' ], pound: [ '5S1', '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'pound', 'leer', 'absorb' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'pound', 'leer', 'absorb' ]
      }
    ]
  },
  sceptile: {
    learnset: {
      dragonpulse: [ '5S0' ],
      focusblast: [ '5S0' ],
      leafstorm: [ '5S0' ],
      rockslide: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 50,
        shiny: 1,
        moves: [ 'leafstorm', 'dragonpulse', 'focusblast', 'rockslide' ],
        pokeball: 'cherishball'
      }
    ]
  },
  torchic: {
    learnset: {
      ember: [ '6S2', '5S1', '5S2', '3S0' ],
      focusenergy: [ '6S2', '5S1', '5S2', '3S0' ],
      growl: [ '6S2', '5S1', '5S2', '3S0' ],
      scratch: [ '6S2', '5S1', '5S2', '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'scratch', 'growl', 'focusenergy', 'ember' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'scratch', 'growl', 'focusenergy', 'ember' ]
      },
      {
        generation: 6,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'scratch', 'growl', 'focusenergy', 'ember' ],
        pokeball: 'cherishball'
      }
    ]
  },
  blaziken: {
    learnset: {
      blazekick: [ '3S0' ],
      flareblitz: [ '5S1' ],
      highjumpkick: [ '5S1' ],
      mirrormove: [ '3S0' ],
      skyuppercut: [ '3S0' ],
      slash: [ '3S0' ],
      stoneedge: [ '5S1' ],
      thunderpunch: [ '5S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        moves: [ 'blazekick', 'slash', 'mirrormove', 'skyuppercut' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 50,
        shiny: 1,
        moves: [ 'flareblitz', 'highjumpkick', 'thunderpunch', 'stoneedge' ],
        pokeball: 'cherishball'
      }
    ]
  },
  mudkip: {
    learnset: {
      growl: [ '5S1', '3S0' ],
      mudslap: [ '5S1', '3S0' ],
      tackle: [ '5S1', '3S0' ],
      watergun: [ '5S1', '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'tackle', 'growl', 'mudslap', 'watergun' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'tackle', 'growl', 'mudslap', 'watergun' ]
      }
    ]
  },
  swampert: {
    learnset: {
      earthquake: [ '5S0' ],
      hammerarm: [ '5S0' ],
      hydropump: [ '5S0' ],
      icebeam: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 50,
        shiny: 1,
        moves: [ 'earthquake', 'icebeam', 'hydropump', 'hammerarm' ],
        pokeball: 'cherishball'
      }
    ]
  },
  poochyena: {
    learnset: { dig: [ '3S0' ], healbell: [ '3S0' ], howl: [ '3S0' ], poisonfang: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        abilities: [ 'runaway' ],
        moves: [ 'healbell', 'dig', 'poisonfang', 'howl' ]
      }
    ],
    encounters: [ { generation: 3, level: 2 } ]
  },
  mightyena: {
    learnset: { crunch: [ '7S0' ], firefang: [ '7S0' ], icefang: [ '7S0' ], thunderfang: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 64,
        gender: 'M',
        abilities: [ 'intimidate' ],
        moves: [ 'crunch', 'firefang', 'icefang', 'thunderfang' ],
        pokeball: 'cherishball'
      }
    ]
  },
  zigzagoon: {
    learnset: {
      extremespeed: [ '3S1' ],
      growl: [ '3S0', '3S1' ],
      tackle: [ '3S0', '3S1' ],
      tailwhip: [ '3S0', '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: true,
        abilities: [ 'pickup' ],
        moves: [ 'tackle', 'growl', 'tailwhip' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: 1,
        abilities: [ 'pickup' ],
        moves: [ 'tackle', 'growl', 'tailwhip', 'extremespeed' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      }
    ],
    encounters: [ { generation: 3, level: 2 } ]
  },
  linoone: {
    learnset: {
      babydolleyes: [ '6S0' ],
      extremespeed: [ '6S0' ],
      helpinghand: [ '6S0' ],
      protect: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        moves: [ 'extremespeed', 'helpinghand', 'babydolleyes', 'protect' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 4, level: 3 }, { generation: 6, level: 17, maxEggMoves: 1 } ]
  },
  wurmple: { encounters: [ { generation: 3, level: 2 } ] },
  silcoon: {
    encounters: [
      { generation: 3, level: 5 },
      { generation: 4, level: 5 },
      { generation: 6, level: 2, maxEggMoves: 1 }
    ]
  },
  cascoon: {
    encounters: [
      { generation: 3, level: 5 },
      { generation: 4, level: 5 },
      { generation: 6, level: 2, maxEggMoves: 1 }
    ]
  },
  lotad: {
    learnset: { absorb: [ '3S0' ], astonish: [ '3S0' ], growl: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'astonish', 'growl', 'absorb' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 3, level: 3 } ]
  },
  lombre: { encounters: [ { generation: 6, level: 13, maxEggMoves: 1 } ] },
  ludicolo: {
    learnset: {
      fakeout: [ '5S0' ],
      gigadrain: [ '5S0', '5S1' ],
      hydropump: [ '5S0' ],
      icebeam: [ '5S0', '5S1' ],
      scald: [ '5S1' ],
      sunnyday: [ '5S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 50,
        shiny: 1,
        abilities: [ 'swiftswim' ],
        moves: [ 'fakeout', 'hydropump', 'icebeam', 'gigadrain' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 30,
        gender: 'M',
        nature: 'Calm',
        abilities: [ 'swiftswim' ],
        moves: [ 'scald', 'gigadrain', 'icebeam', 'sunnyday' ],
        pokeball: 'pokeball'
      }
    ]
  },
  seedot: {
    learnset: {
      bide: [ '3S0' ],
      bulletseed: [ '3S1' ],
      gigadrain: [ '3S1' ],
      growth: [ '3S0' ],
      harden: [ '3S0' ],
      refresh: [ '3S1' ],
      secretpower: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'bide', 'harden', 'growth' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 17,
        moves: [ 'refresh', 'gigadrain', 'bulletseed', 'secretpower' ]
      }
    ],
    encounters: [ { generation: 3, level: 3 } ]
  },
  nuzleaf: { encounters: [ { generation: 6, level: 13, maxEggMoves: 1 } ] },
  taillow: {
    learnset: { featherdance: [ '3S0' ], focusenergy: [ '3S0' ], growl: [ '3S0' ], peck: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'peck', 'growl', 'focusenergy', 'featherdance' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      }
    ],
    encounters: [ { generation: 3, level: 4 } ]
  },
  swellow: {
    learnset: { agility: [ '3S0' ], batonpass: [ '3S0' ], facade: [ '3S0' ], skyattack: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 43,
        moves: [ 'batonpass', 'skyattack', 'agility', 'facade' ]
      }
    ],
    encounters: [ { generation: 4, level: 20 } ]
  },
  wingull: { encounters: [ { generation: 3, level: 2 } ] },
  pelipper: {
    encounters: [ { generation: 4, level: 15 }, { generation: 6, level: 18, maxEggMoves: 1 } ]
  },
  ralts: {
    learnset: {
      charm: [ '3S1' ],
      confusion: [ '3S2' ],
      encore: [ '6S3' ],
      growl: [ '6S3', '3S0', '3S1' ],
      reflect: [ '3S2' ],
      shockwave: [ '3S2' ],
      sing: [ '3S2' ],
      wish: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'growl', 'wish' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'growl', 'charm' ],
        pokeball: 'pokeball'
      },
      { generation: 3, level: 20, moves: [ 'sing', 'shockwave', 'reflect', 'confusion' ] },
      {
        generation: 6,
        level: 1,
        isHidden: true,
        moves: [ 'growl', 'encore' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 3, level: 4 } ]
  },
  kirlia: { encounters: [ { generation: 4, level: 6 } ] },
  gardevoir: {
    learnset: {
      calmmind: [ '6S1' ],
      dazzlinggleam: [ '6S1' ],
      focusblast: [ '5S0' ],
      hypnosis: [ '5S0' ],
      moonblast: [ '6S1' ],
      psychic: [ '5S0' ],
      storedpower: [ '6S1' ],
      thunderbolt: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 50,
        shiny: 1,
        abilities: [ 'trace' ],
        moves: [ 'hypnosis', 'thunderbolt', 'focusblast', 'psychic' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        shiny: true,
        gender: 'F',
        abilities: [ 'synchronize' ],
        moves: [ 'dazzlinggleam', 'moonblast', 'storedpower', 'calmmind' ],
        pokeball: 'cherishball'
      }
    ]
  },
  surskit: {
    learnset: { bubble: [ '3S0', '3S1' ], mudsport: [ '3S0' ], quickattack: [ '3S1' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'bubble', 'mudsport' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'bubble', 'quickattack' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 3, level: 3 } ]
  },
  masquerain: { encounters: [ { generation: 6, level: 21, maxEggMoves: 1 } ] },
  shroomish: {
    learnset: {
      falseswipe: [ '3S0' ],
      megadrain: [ '3S0' ],
      refresh: [ '3S0' ],
      stunspore: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 15,
        abilities: [ 'effectspore' ],
        moves: [ 'refresh', 'falseswipe', 'megadrain', 'stunspore' ]
      }
    ]
  },
  slaking: {
    learnset: {
      aerialace: [ '4S0' ],
      gigaimpact: [ '4S0' ],
      return: [ '4S0' ],
      shadowclaw: [ '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Adamant',
        moves: [ 'gigaimpact', 'return', 'shadowclaw', 'aerialace' ],
        pokeball: 'cherishball'
      }
    ]
  },
  shedinja: {
    learnset: { confuseray: [ '3S0' ], grudge: [ '3S0' ], shadowball: [ '3S0' ], spite: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 50,
        moves: [ 'spite', 'confuseray', 'shadowball', 'grudge' ],
        pokeball: 'pokeball'
      }
    ]
  },
  whismur: {
    learnset: { pound: [ '3S0' ], teeterdance: [ '3S0' ], uproar: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'pound', 'uproar', 'teeterdance' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      }
    ]
  },
  loudred: { encounters: [ { generation: 6, level: 16, maxEggMoves: 1 } ] },
  exploud: {
    learnset: {
      hyperbeam: [ '3S1' ],
      hypervoice: [ '3S0' ],
      rest: [ '3S0' ],
      roar: [ '3S0', '3S1' ],
      screech: [ '3S1' ],
      sleeptalk: [ '3S0' ],
      stomp: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 100,
        moves: [ 'roar', 'rest', 'sleeptalk', 'hypervoice' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 50,
        moves: [ 'stomp', 'screech', 'hyperbeam', 'roar' ],
        pokeball: 'pokeball'
      }
    ]
  },
  makuhita: {
    learnset: {
      armthrust: [ '3S0' ],
      brickbreak: [ '3S0' ],
      refresh: [ '3S0' ],
      rocktomb: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 18,
        moves: [ 'refresh', 'brickbreak', 'armthrust', 'rocktomb' ]
      }
    ]
  },
  hariyama: { encounters: [ { generation: 6, level: 22 } ] },
  nosepass: {
    learnset: {
      helpinghand: [ '3S0' ],
      rockslide: [ '3S0' ],
      thunderbolt: [ '3S0' ],
      thunderwave: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 26,
        moves: [ 'helpinghand', 'thunderbolt', 'thunderwave', 'rockslide' ]
      }
    ]
  },
  skitty: {
    learnset: {
      attract: [ '3S2' ],
      growl: [ '3S0', '3S1', '3S2' ],
      payday: [ '3S0' ],
      rollout: [ '3S1' ],
      tackle: [ '3S0', '3S1', '3S2' ],
      tailwhip: [ '3S0', '3S1', '3S2' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        abilities: [ 'cutecharm' ],
        moves: [ 'tackle', 'growl', 'tailwhip', 'payday' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      },
      {
        generation: 3,
        level: 5,
        shiny: 1,
        abilities: [ 'cutecharm' ],
        moves: [ 'growl', 'tackle', 'tailwhip', 'rollout' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        abilities: [ 'cutecharm' ],
        moves: [ 'growl', 'tackle', 'tailwhip', 'attract' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [
      {
        generation: 3,
        level: 3,
        gender: 'F',
        ivs: { hp: 5, atk: 4, def: 4, spa: 5, spd: 4, spe: 4 },
        abilities: [ 'cutecharm' ],
        pokeball: 'pokeball'
      }
    ]
  },
  delcatty: {
    learnset: {
      attract: [ '3S0' ],
      secretpower: [ '3S0' ],
      shockwave: [ '3S0' ],
      sweetkiss: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 18,
        abilities: [ 'cutecharm' ],
        moves: [ 'sweetkiss', 'secretpower', 'attract', 'shockwave' ]
      }
    ]
  },
  sableye: {
    learnset: {
      calmmind: [ '6S3' ],
      feintattack: [ '3S1' ],
      foresight: [ '3S0' ],
      foulplay: [ '5S2' ],
      helpinghand: [ '3S1' ],
      leer: [ '3S0' ],
      nightshade: [ '3S0' ],
      octazooka: [ '5S2' ],
      recover: [ '6S3', '6S4', '3S1' ],
      scratch: [ '3S0' ],
      shadowball: [ '6S3', '3S1' ],
      shockwave: [ '6S4' ],
      taunt: [ '6S4' ],
      tickle: [ '5S2' ],
      trick: [ '5S2' ],
      willowisp: [ '6S3', '6S4' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        abilities: [ 'keeneye' ],
        moves: [ 'leer', 'scratch', 'foresight', 'nightshade' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 33,
        abilities: [ 'keeneye' ],
        moves: [ 'helpinghand', 'shadowball', 'feintattack', 'recover' ]
      },
      {
        generation: 5,
        level: 50,
        gender: 'M',
        isHidden: true,
        moves: [ 'foulplay', 'octazooka', 'tickle', 'trick' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        nature: 'Relaxed',
        ivs: { hp: 31, spa: 31 },
        isHidden: true,
        moves: [ 'calmmind', 'willowisp', 'recover', 'shadowball' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        nature: 'Bold',
        isHidden: true,
        moves: [ 'willowisp', 'recover', 'taunt', 'shockwave' ],
        pokeball: 'cherishball'
      }
    ]
  },
  mawile: {
    learnset: {
      astonish: [ '3S0' ],
      faketears: [ '3S0' ],
      falseswipe: [ '3S1' ],
      firefang: [ '6S2' ],
      irondefense: [ '3S1' ],
      ironhead: [ '6S2', '6S3' ],
      playrough: [ '6S2', '6S3' ],
      protect: [ '6S3' ],
      sing: [ '3S1' ],
      suckerpunch: [ '6S2', '6S3' ],
      visegrip: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'astonish', 'faketears' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 22,
        moves: [ 'sing', 'falseswipe', 'visegrip', 'irondefense' ]
      },
      {
        generation: 6,
        level: 50,
        abilities: [ 'intimidate' ],
        moves: [ 'ironhead', 'playrough', 'firefang', 'suckerpunch' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        abilities: [ 'intimidate' ],
        moves: [ 'suckerpunch', 'protect', 'playrough', 'ironhead' ],
        pokeball: 'cherishball'
      }
    ]
  },
  aggron: {
    learnset: {
      doubleedge: [ '3S0' ],
      earthquake: [ '6S2' ],
      headsmash: [ '6S2' ],
      ironhead: [ '6S2' ],
      irontail: [ '3S0', '3S1' ],
      metalsound: [ '3S0', '3S1' ],
      protect: [ '3S0', '3S1' ],
      rockslide: [ '6S2' ],
      takedown: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 100,
        moves: [ 'irontail', 'protect', 'metalsound', 'doubleedge' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 50,
        moves: [ 'takedown', 'irontail', 'protect', 'metalsound' ],
        pokeball: 'pokeball'
      },
      {
        generation: 6,
        level: 50,
        nature: 'Brave',
        abilities: [ 'rockhead' ],
        moves: [ 'ironhead', 'earthquake', 'headsmash', 'rockslide' ],
        pokeball: 'cherishball'
      }
    ]
  },
  meditite: {
    learnset: {
      bide: [ '3S0' ],
      confusion: [ '3S0', '3S1' ],
      detect: [ '3S1' ],
      dynamicpunch: [ '3S1' ],
      meditate: [ '3S0' ],
      shadowball: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'bide', 'meditate', 'confusion' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 20,
        moves: [ 'dynamicpunch', 'confusion', 'shadowball', 'detect' ],
        pokeball: 'pokeball'
      }
    ]
  },
  medicham: {
    encounters: [ { generation: 4, level: 35 }, { generation: 6, level: 34, maxEggMoves: 1 } ]
  },
  manectric: {
    learnset: {
      bite: [ '3S0' ],
      overheat: [ '6S1' ],
      protect: [ '6S1' ],
      raindance: [ '3S0' ],
      refresh: [ '3S0' ],
      thunder: [ '3S0' ],
      thunderbolt: [ '6S1' ],
      voltswitch: [ '6S1' ]
    },
    eventData: [
      { generation: 3, level: 44, moves: [ 'refresh', 'thunder', 'raindance', 'bite' ] },
      {
        generation: 6,
        level: 50,
        nature: 'Timid',
        abilities: [ 'lightningrod' ],
        moves: [ 'overheat', 'thunderbolt', 'voltswitch', 'protect' ],
        pokeball: 'cherishball'
      }
    ]
  },
  plusle: {
    learnset: {
      growl: [ '3S0', '3S1' ],
      quickattack: [ '3S1' ],
      thunderwave: [ '3S0', '3S1' ],
      watersport: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'growl', 'thunderwave', 'watersport' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'growl', 'thunderwave', 'quickattack' ],
        pokeball: 'pokeball'
      }
    ]
  },
  minun: {
    learnset: {
      growl: [ '3S0', '3S1' ],
      mudsport: [ '3S0' ],
      quickattack: [ '3S1' ],
      thunderwave: [ '3S0', '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'growl', 'thunderwave', 'mudsport' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'growl', 'thunderwave', 'quickattack' ],
        pokeball: 'pokeball'
      }
    ]
  },
  roselia: {
    learnset: {
      absorb: [ '3S0' ],
      grasswhistle: [ '3S1' ],
      growth: [ '3S0' ],
      leechseed: [ '3S1' ],
      magicalleaf: [ '3S1' ],
      poisonsting: [ '3S0' ],
      sweetkiss: [ '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'absorb', 'growth', 'poisonsting' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 22,
        moves: [ 'sweetkiss', 'magicalleaf', 'leechseed', 'grasswhistle' ]
      }
    ]
  },
  gulpin: {
    learnset: { shockwave: [ '3S0' ], sing: [ '3S0' ], sludge: [ '3S0' ], toxic: [ '3S0' ] },
    eventData: [ { generation: 3, level: 17, moves: [ 'sing', 'shockwave', 'sludge', 'toxic' ] } ]
  },
  carvanha: {
    learnset: {
      bite: [ '6S1', '3S0' ],
      hydropump: [ '6S1' ],
      leer: [ '6S1' ],
      refresh: [ '3S0' ],
      scaryface: [ '3S0' ],
      waterpulse: [ '3S0' ]
    },
    eventData: [
      { generation: 3, level: 15, moves: [ 'refresh', 'waterpulse', 'bite', 'scaryface' ] },
      {
        generation: 6,
        level: 1,
        isHidden: true,
        moves: [ 'leer', 'bite', 'hydropump' ],
        pokeball: 'pokeball'
      }
    ]
  },
  sharpedo: {
    learnset: {
      aquajet: [ '6S0' ],
      crunch: [ '6S0', '6S1' ],
      destinybond: [ '6S0' ],
      icefang: [ '6S0' ],
      poisonfang: [ '6S1' ],
      scaryface: [ '6S1' ],
      slash: [ '6S1' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        nature: 'Adamant',
        isHidden: true,
        moves: [ 'aquajet', 'crunch', 'icefang', 'destinybond' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 43,
        gender: 'M',
        perfectIVs: 2,
        moves: [ 'scaryface', 'slash', 'poisonfang', 'crunch' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 7, level: 10 } ]
  },
  wailord: {
    learnset: {
      amnesia: [ '3S0' ],
      hydropump: [ '3S0' ],
      mist: [ '3S1' ],
      rest: [ '3S0', '3S1' ],
      waterpulse: [ '3S1' ],
      waterspout: [ '3S0', '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 100,
        moves: [ 'rest', 'waterspout', 'amnesia', 'hydropump' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 50,
        moves: [ 'waterpulse', 'mist', 'rest', 'waterspout' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [
      { generation: 3, level: 25 },
      { generation: 4, level: 35 },
      { generation: 5, level: 30 },
      { generation: 7, level: 10 }
    ]
  },
  numel: {
    learnset: {
      charm: [ '3S0' ],
      dig: [ '3S0' ],
      ember: [ '3S0' ],
      growl: [ '6S1' ],
      ironhead: [ '6S1' ],
      tackle: [ '6S1' ],
      takedown: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 14,
        abilities: [ 'oblivious' ],
        moves: [ 'charm', 'takedown', 'dig', 'ember' ]
      },
      {
        generation: 6,
        level: 1,
        moves: [ 'growl', 'tackle', 'ironhead' ],
        pokeball: 'pokeball'
      }
    ]
  },
  camerupt: {
    learnset: { curse: [ '6S0' ], rockslide: [ '6S0' ], takedown: [ '6S0' ], yawn: [ '6S0' ] },
    eventData: [
      {
        generation: 6,
        level: 43,
        gender: 'M',
        perfectIVs: 2,
        abilities: [ 'solidrock' ],
        moves: [ 'curse', 'takedown', 'rockslide', 'yawn' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 6, level: 30 } ]
  },
  torkoal: {
    learnset: {
      bodypress: [ '8S0' ],
      burningjealousy: [ '8S0' ],
      protect: [ '8S0' ],
      yawn: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 50,
        gender: 'M',
        nature: 'Bold',
        abilities: [ 'drought' ],
        ivs: { hp: 31, atk: 12, def: 31, spa: 31, spd: 31, spe: 0 },
        moves: [ 'burningjealousy', 'bodypress', 'yawn', 'protect' ],
        pokeball: 'cherishball'
      }
    ]
  },
  spoink: {
    learnset: { splash: [ '3S0' ], uproar: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        abilities: [ 'owntempo' ],
        moves: [ 'splash', 'uproar' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      }
    ]
  },
  grumpig: { encounters: [ { generation: 6, level: 30 } ] },
  spinda: {
    learnset: { sing: [ '3S0' ], tackle: [ '3S0' ], uproar: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'tackle', 'uproar', 'sing' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      }
    ]
  },
  trapinch: {
    learnset: { bite: [ '5S0' ] },
    eventData: [ { generation: 5, level: 1, shiny: true, moves: [ 'bite' ], pokeball: 'pokeball' } ]
  },
  flygon: {
    learnset: {
      crunch: [ '3S0' ],
      dracometeor: [ '4S1' ],
      dragonbreath: [ '3S0' ],
      dragonclaw: [ '4S1' ],
      earthquake: [ '4S1' ],
      sandtomb: [ '3S0' ],
      screech: [ '3S0' ],
      uturn: [ '4S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 45,
        moves: [ 'sandtomb', 'crunch', 'dragonbreath', 'screech' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Naive',
        moves: [ 'dracometeor', 'uturn', 'earthquake', 'dragonclaw' ],
        pokeball: 'cherishball'
      }
    ]
  },
  cacnea: {
    learnset: { absorb: [ '3S0' ], encore: [ '3S0' ], leer: [ '3S0' ], poisonsting: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'poisonsting', 'leer', 'absorb', 'encore' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      }
    ]
  },
  cacturne: {
    learnset: { feintattack: [ '3S0' ], ingrain: [ '3S0' ], needlearm: [ '3S0' ], spikes: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 45,
        moves: [ 'ingrain', 'feintattack', 'spikes', 'needlearm' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 6, level: 30 } ]
  },
  swablu: {
    learnset: {
      falseswipe: [ '3S0' ],
      growl: [ '6S2', '5S1', '3S0' ],
      hypervoice: [ '6S2' ],
      peck: [ '6S2', '5S1', '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'peck', 'growl', 'falseswipe' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      },
      {
        generation: 5,
        level: 1,
        shiny: true,
        moves: [ 'peck', 'growl' ],
        pokeball: 'pokeball'
      },
      {
        generation: 6,
        level: 1,
        isHidden: true,
        moves: [ 'peck', 'growl', 'hypervoice' ],
        pokeball: 'pokeball'
      }
    ]
  },
  altaria: {
    learnset: {
      aerialace: [ '3S1' ],
      agility: [ '6S3' ],
      dragonbreath: [ '5S2', '3S0', '3S1' ],
      dragondance: [ '3S0' ],
      falseswipe: [ '5S2' ],
      fireblast: [ '6S3' ],
      healbell: [ '3S1' ],
      hypervoice: [ '6S3' ],
      naturalgift: [ '5S2' ],
      protect: [ '6S3' ],
      refresh: [ '3S0' ],
      solarbeam: [ '3S1' ],
      takedown: [ '5S2', '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 45,
        moves: [ 'takedown', 'dragonbreath', 'dragondance', 'refresh' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 36,
        moves: [ 'healbell', 'dragonbreath', 'solarbeam', 'aerialace' ]
      },
      {
        generation: 5,
        level: 35,
        gender: 'M',
        isHidden: true,
        moves: [ 'takedown', 'naturalgift', 'dragonbreath', 'falseswipe' ]
      },
      {
        generation: 6,
        level: 100,
        nature: 'Modest',
        isHidden: true,
        moves: [ 'hypervoice', 'fireblast', 'protect', 'agility' ],
        pokeball: 'cherishball'
      }
    ]
  },
  zangoose: {
    learnset: {
      brickbreak: [ '3S2' ],
      counter: [ '3S2' ],
      crushclaw: [ '3S2' ],
      furycutter: [ '3S0' ],
      leer: [ '3S0', '3S1' ],
      quickattack: [ '3S0', '3S1' ],
      refresh: [ '3S2' ],
      scratch: [ '3S1' ],
      swordsdance: [ '3S0', '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 18,
        moves: [ 'leer', 'quickattack', 'swordsdance', 'furycutter' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'scratch', 'leer', 'quickattack', 'swordsdance' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 28,
        moves: [ 'refresh', 'brickbreak', 'counter', 'crushclaw' ]
      }
    ]
  },
  seviper: {
    learnset: {
      bite: [ '3S0', '3S2' ],
      crunch: [ '3S1' ],
      glare: [ '3S1' ],
      lick: [ '3S0', '3S2' ],
      poisontail: [ '3S0', '3S1' ],
      screech: [ '3S1' ],
      wrap: [ '3S0', '3S2' ]
    },
    eventData: [
      {
        generation: 3,
        level: 18,
        moves: [ 'wrap', 'lick', 'bite', 'poisontail' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 30,
        moves: [ 'poisontail', 'screech', 'glare', 'crunch' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'wrap', 'lick', 'bite' ],
        pokeball: 'pokeball'
      }
    ]
  },
  lunatone: {
    learnset: {
      batonpass: [ '3S1' ],
      confusion: [ '3S0' ],
      cosmicpower: [ '7S2' ],
      harden: [ '3S0' ],
      hiddenpower: [ '7S2' ],
      moonblast: [ '7S2' ],
      powergem: [ '7S2' ],
      psychic: [ '3S1' ],
      raindance: [ '3S1' ],
      rocktomb: [ '3S1' ],
      tackle: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        moves: [ 'tackle', 'harden', 'confusion' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 25,
        moves: [ 'batonpass', 'psychic', 'raindance', 'rocktomb' ]
      },
      {
        generation: 7,
        level: 30,
        moves: [ 'cosmicpower', 'hiddenpower', 'moonblast', 'powergem' ],
        pokeball: 'cherishball'
      }
    ]
  },
  solrock: {
    learnset: {
      batonpass: [ '3S1' ],
      confusion: [ '3S0' ],
      cosmicpower: [ '7S2', '3S1' ],
      harden: [ '3S0' ],
      hiddenpower: [ '7S2' ],
      psychic: [ '3S1' ],
      solarbeam: [ '7S2' ],
      stoneedge: [ '7S2' ],
      sunnyday: [ '3S1' ],
      tackle: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 10,
        moves: [ 'tackle', 'harden', 'confusion' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 41,
        moves: [ 'batonpass', 'psychic', 'sunnyday', 'cosmicpower' ]
      },
      {
        generation: 7,
        level: 30,
        moves: [ 'cosmicpower', 'hiddenpower', 'solarbeam', 'stoneedge' ],
        pokeball: 'cherishball'
      }
    ]
  },
  whiscash: {
    learnset: {
      aquatail: [ '4S0' ],
      earthquake: [ '4S0' ],
      gigaimpact: [ '4S0' ],
      zenheadbutt: [ '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 51,
        gender: 'F',
        nature: 'Gentle',
        abilities: [ 'oblivious' ],
        moves: [ 'earthquake', 'aquatail', 'zenheadbutt', 'gigaimpact' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 4, level: 10 }, { generation: 7, level: 10 } ]
  },
  corphish: {
    learnset: { bubble: [ '3S0' ], watersport: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'bubble', 'watersport' ],
        pokeball: 'pokeball',
        emeraldEventEgg: true
      }
    ]
  },
  crawdaunt: {
    learnset: {
      crabhammer: [ '3S0', '3S1' ],
      guillotine: [ '3S0' ],
      knockoff: [ '3S1' ],
      swordsdance: [ '3S0', '3S1' ],
      taunt: [ '3S0', '3S1' ]
    },
    eventData: [
      {
        generation: 3,
        level: 100,
        moves: [ 'taunt', 'crabhammer', 'swordsdance', 'guillotine' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 50,
        moves: [ 'knockoff', 'taunt', 'crabhammer', 'swordsdance' ],
        pokeball: 'pokeball'
      }
    ],
    encounters: [ { generation: 7, level: 10 } ]
  },
  baltoy: {
    learnset: { mudslap: [ '3S0' ], psybeam: [ '3S0' ], refresh: [ '3S0' ], rocktomb: [ '3S0' ] },
    eventData: [
      { generation: 3, level: 17, moves: [ 'refresh', 'rocktomb', 'mudslap', 'psybeam' ] }
    ]
  },
  lileep: {
    learnset: { acid: [ '5S0' ], constrict: [ '5S0' ], recover: [ '5S0' ], rockslide: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 15,
        gender: 'M',
        moves: [ 'recover', 'rockslide', 'constrict', 'acid' ],
        pokeball: 'cherishball'
      }
    ]
  },
  anorith: {
    learnset: { crosspoison: [ '5S0' ], harden: [ '5S0' ], mudsport: [ '5S0' ], watergun: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 15,
        gender: 'M',
        moves: [ 'harden', 'mudsport', 'watergun', 'crosspoison' ],
        pokeball: 'cherishball'
      }
    ]
  },
  feebas: {
    learnset: { mirrorcoat: [ '4S0' ], splash: [ '4S0' ] },
    eventData: [
      {
        generation: 4,
        level: 5,
        gender: 'F',
        nature: 'Calm',
        moves: [ 'splash', 'mirrorcoat' ],
        pokeball: 'cherishball'
      }
    ]
  },
  milotic: {
    learnset: {
      hydropump: [ '5S3', '4S1', '4S2' ],
      icebeam: [ '5S3', '5S4', '4S1' ],
      icywind: [ '4S2' ],
      mirrorcoat: [ '5S3' ],
      raindance: [ '4S1', '4S2', '3S0' ],
      recover: [ '5S3', '5S4', '4S1', '4S2', '3S0' ],
      surf: [ '5S4' ],
      toxic: [ '5S4' ],
      twister: [ '3S0' ],
      waterpulse: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 35,
        moves: [ 'waterpulse', 'twister', 'recover', 'raindance' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        gender: 'F',
        nature: 'Bold',
        moves: [ 'recover', 'raindance', 'icebeam', 'hydropump' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        shiny: true,
        gender: 'M',
        nature: 'Timid',
        moves: [ 'raindance', 'recover', 'hydropump', 'icywind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        shiny: 1,
        moves: [ 'recover', 'hydropump', 'icebeam', 'mirrorcoat' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 58,
        gender: 'M',
        nature: 'Lax',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        moves: [ 'recover', 'surf', 'icebeam', 'toxic' ],
        pokeball: 'cherishball'
      }
    ]
  },
  shuppet: {
    learnset: {
      feintattack: [ '3S0' ],
      shadowball: [ '3S0' ],
      spite: [ '3S0' ],
      willowisp: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 45,
        abilities: [ 'insomnia' ],
        moves: [ 'spite', 'willowisp', 'feintattack', 'shadowball' ],
        pokeball: 'pokeball'
      }
    ]
  },
  banette: {
    learnset: {
      cottonguard: [ '5S1' ],
      curse: [ '3S0' ],
      feintattack: [ '5S1', '3S0' ],
      helpinghand: [ '3S0' ],
      hex: [ '5S1' ],
      shadowball: [ '5S1', '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 37,
        abilities: [ 'insomnia' ],
        moves: [ 'helpinghand', 'feintattack', 'shadowball', 'curse' ]
      },
      {
        generation: 5,
        level: 37,
        gender: 'F',
        isHidden: true,
        moves: [ 'feintattack', 'hex', 'shadowball', 'cottonguard' ]
      }
    ],
    encounters: [ { generation: 5, level: 32 } ]
  },
  duskull: {
    learnset: {
      astonish: [ '3S1' ],
      confuseray: [ '3S1' ],
      curse: [ '3S0' ],
      helpinghand: [ '3S1' ],
      meanlook: [ '3S0' ],
      pursuit: [ '3S0' ],
      shadowball: [ '3S1' ],
      willowisp: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 45,
        moves: [ 'pursuit', 'curse', 'willowisp', 'meanlook' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 19,
        moves: [ 'helpinghand', 'shadowball', 'astonish', 'confuseray' ]
      }
    ]
  },
  dusclops: { encounters: [ { generation: 4, level: 16 }, { generation: 6, level: 30 } ] },
  tropius: {
    learnset: {
      airslash: [ '4S0' ],
      solarbeam: [ '4S0' ],
      sunnyday: [ '4S0' ],
      synthesis: [ '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 53,
        gender: 'F',
        nature: 'Jolly',
        abilities: [ 'chlorophyll' ],
        moves: [ 'airslash', 'synthesis', 'sunnyday', 'solarbeam' ],
        pokeball: 'cherishball'
      }
    ]
  },
  chimecho: {
    learnset: { astonish: [ '3S0' ], growl: [ '3S0' ], wrap: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 10,
        gender: 'M',
        moves: [ 'wrap', 'growl', 'astonish' ],
        pokeball: 'pokeball'
      }
    ]
  },
  absol: {
    learnset: {
      bite: [ '3S2' ],
      doubleteam: [ '3S3' ],
      futuresight: [ '3S3' ],
      leer: [ '3S0', '3S1' ],
      perishsong: [ '3S3' ],
      razorwind: [ '3S2' ],
      scratch: [ '3S0', '3S1' ],
      slash: [ '3S3' ],
      spite: [ '3S1', '3S2' ],
      swordsdance: [ '3S2' ],
      wish: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        abilities: [ 'pressure' ],
        moves: [ 'scratch', 'leer', 'wish' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: 1,
        abilities: [ 'pressure' ],
        moves: [ 'scratch', 'leer', 'spite' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 35,
        abilities: [ 'pressure' ],
        moves: [ 'razorwind', 'bite', 'swordsdance', 'spite' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 70,
        abilities: [ 'pressure' ],
        moves: [ 'doubleteam', 'slash', 'futuresight', 'perishsong' ],
        pokeball: 'pokeball'
      }
    ]
  },
  snorunt: {
    learnset: { bite: [ '3S0' ], icywind: [ '3S0' ], sing: [ '3S0' ], waterpulse: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 20,
        abilities: [ 'innerfocus' ],
        moves: [ 'sing', 'waterpulse', 'bite', 'icywind' ]
      }
    ]
  },
  spheal: {
    learnset: { aurorabeam: [ '3S0' ], charm: [ '3S0' ], mudslap: [ '3S0' ], watergun: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 17,
        abilities: [ 'thickfat' ],
        moves: [ 'charm', 'aurorabeam', 'watergun', 'mudslap' ]
      }
    ]
  },
  sealeo: {
    encounters: [ { generation: 4, level: 25 }, { generation: 6, level: 28, maxEggMoves: 1 } ]
  },
  walrein: {
    learnset: { brine: [ '5S0' ], hail: [ '5S0' ], icebeam: [ '5S0' ], sheercold: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 50,
        abilities: [ 'thickfat' ],
        moves: [ 'icebeam', 'brine', 'hail', 'sheercold' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 5, level: 30 } ]
  },
  bagon: {
    learnset: {
      bite: [ '3S0', '3S1' ],
      irondefense: [ '3S1' ],
      rage: [ '6S3', '5S2', '3S0', '3S1' ],
      thrash: [ '6S3' ],
      wish: [ '3S0' ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'rage', 'bite', 'wish' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: 1,
        moves: [ 'rage', 'bite', 'irondefense' ],
        pokeball: 'pokeball'
      },
      { generation: 5, level: 1, shiny: true, moves: [ 'rage' ], pokeball: 'pokeball' },
      { generation: 6, level: 1, moves: [ 'rage', 'thrash' ], pokeball: 'pokeball' }
    ]
  },
  shelgon: { encounters: [ { generation: 7, level: 15 } ] },
  salamence: {
    learnset: {
      aerialace: [ '5S3', '3S1' ],
      dragonbreath: [ '3S0' ],
      dragonclaw: [ '5S3', '4S2', '3S1' ],
      dragondance: [ '5S3', '3S1' ],
      fireblast: [ '4S2' ],
      fly: [ '3S0' ],
      hydropump: [ '4S2' ],
      outrage: [ '5S3' ],
      protect: [ '3S0' ],
      refresh: [ '3S1' ],
      scaryface: [ '3S0' ],
      stoneedge: [ '4S2' ]
    },
    eventData: [
      {
        generation: 3,
        level: 50,
        moves: [ 'protect', 'dragonbreath', 'scaryface', 'fly' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 50,
        moves: [ 'refresh', 'dragonclaw', 'dragondance', 'aerialace' ]
      },
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Naughty',
        moves: [ 'hydropump', 'stoneedge', 'fireblast', 'dragonclaw' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        shiny: 1,
        moves: [ 'dragondance', 'dragonclaw', 'outrage', 'aerialace' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 7, level: 9 } ]
  },
  beldum: {
    learnset: {
      holdback: [ '6S0' ],
      irondefense: [ '6S0' ],
      ironhead: [ '6S0' ],
      zenheadbutt: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 5,
        shiny: true,
        moves: [ 'holdback', 'ironhead', 'zenheadbutt', 'irondefense' ],
        pokeball: 'cherishball'
      }
    ]
  },
  metang: {
    learnset: { confusion: [ '3S0' ], metalclaw: [ '3S0' ], refresh: [ '3S0' ], takedown: [ '3S0' ] },
    eventData: [
      {
        generation: 3,
        level: 30,
        moves: [ 'takedown', 'confusion', 'metalclaw', 'refresh' ],
        pokeball: 'pokeball'
      }
    ]
  },
  metagross: {
    learnset: {
      agility: [ '5S4' ],
      bulletpunch: [ '7S7', '5S1', '5S2', '4S0' ],
      doubleedge: [ '5S4', '5S5' ],
      earthquake: [ '5S1', '5S3', '5S6' ],
      hammerarm: [ '5S1', '5S2', '5S4', '5S5', '4S0' ],
      hyperbeam: [ '5S6' ],
      icepunch: [ '7S7', '5S2' ],
      irondefense: [ '5S4' ],
      ironhead: [ '7S7' ],
      meteormash: [ '5S1', '5S3', '5S5', '5S6', '4S0' ],
      protect: [ '5S3' ],
      psychic: [ '5S5', '5S6' ],
      stompingtantrum: [ '7S7' ],
      zenheadbutt: [ '5S2', '5S3', '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 62,
        nature: 'Brave',
        moves: [ 'bulletpunch', 'meteormash', 'hammerarm', 'zenheadbutt' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        shiny: 1,
        moves: [ 'meteormash', 'earthquake', 'bulletpunch', 'hammerarm' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 100,
        moves: [ 'bulletpunch', 'zenheadbutt', 'hammerarm', 'icepunch' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 45,
        shiny: true,
        moves: [ 'meteormash', 'zenheadbutt', 'earthquake', 'protect' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 45,
        isHidden: true,
        moves: [ 'irondefense', 'agility', 'hammerarm', 'doubleedge' ]
      },
      {
        generation: 5,
        level: 45,
        isHidden: true,
        moves: [ 'psychic', 'meteormash', 'hammerarm', 'doubleedge' ]
      },
      {
        generation: 5,
        level: 58,
        nature: 'Serious',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        moves: [ 'earthquake', 'hyperbeam', 'psychic', 'meteormash' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        nature: 'Jolly',
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        moves: [ 'ironhead', 'icepunch', 'bulletpunch', 'stompingtantrum' ],
        pokeball: 'cherishball'
      }
    ]
  },
  regirock: {
    learnset: {
      ancientpower: [ '6S4', '3S0', '3S1' ],
      bulldoze: [ '6S4' ],
      chargebeam: [ '5S3' ],
      curse: [ '8S7', '6S4', '4S2', '3S0', '3S1' ],
      explosion: [ '6S5' ],
      hammerarm: [ '8S7', '7S6', '6S5' ],
      hyperbeam: [ '3S1' ],
      icepunch: [ '6S5' ],
      irondefense: [ '6S4', '5S3' ],
      lockon: [ '7S6', '5S3' ],
      rockthrow: [ '4S2', '3S0' ],
      stomp: [ '4S2' ],
      stoneedge: [ '8S7', '7S6', '6S5' ],
      superpower: [ '8S7', '4S2', '3S0', '3S1' ],
      zapcannon: [ '7S6', '5S3' ]
    },
    eventData: [
      {
        generation: 3,
        level: 40,
        shiny: 1,
        moves: [ 'rockthrow', 'curse', 'superpower', 'ancientpower' ]
      },
      {
        generation: 3,
        level: 40,
        moves: [ 'curse', 'superpower', 'ancientpower', 'hyperbeam' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 30,
        shiny: 1,
        moves: [ 'stomp', 'rockthrow', 'curse', 'superpower' ]
      },
      {
        generation: 5,
        level: 65,
        shiny: 1,
        moves: [ 'irondefense', 'chargebeam', 'lockon', 'zapcannon' ]
      },
      {
        generation: 6,
        level: 40,
        shiny: 1,
        moves: [ 'bulldoze', 'curse', 'ancientpower', 'irondefense' ]
      },
      {
        generation: 6,
        level: 50,
        isHidden: true,
        moves: [ 'explosion', 'icepunch', 'stoneedge', 'hammerarm' ],
        pokeball: 'pokeball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'stoneedge', 'hammerarm', 'lockon', 'zapcannon' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'superpower', 'stoneedge', 'hammerarm', 'curse' ]
      }
    ],
    eventOnly: true
  },
  regice: {
    learnset: {
      amnesia: [ '8S7', '6S4', '6S5', '5S3' ],
      ancientpower: [ '6S4', '3S0', '3S1' ],
      bulldoze: [ '6S4' ],
      chargebeam: [ '5S3' ],
      curse: [ '6S4', '4S2', '3S0', '3S1' ],
      hail: [ '6S5' ],
      hammerarm: [ '7S6' ],
      hyperbeam: [ '3S1' ],
      icebeam: [ '8S7', '7S6', '6S5' ],
      icywind: [ '8S7', '4S2', '3S0' ],
      lockon: [ '7S6', '5S3' ],
      stomp: [ '4S2' ],
      superpower: [ '4S2', '3S0', '3S1' ],
      thunderbolt: [ '6S5' ],
      zapcannon: [ '8S7', '7S6', '5S3' ]
    },
    eventData: [
      {
        generation: 3,
        level: 40,
        shiny: 1,
        moves: [ 'icywind', 'curse', 'superpower', 'ancientpower' ]
      },
      {
        generation: 3,
        level: 40,
        moves: [ 'curse', 'superpower', 'ancientpower', 'hyperbeam' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 30,
        shiny: 1,
        moves: [ 'stomp', 'icywind', 'curse', 'superpower' ]
      },
      {
        generation: 5,
        level: 65,
        shiny: 1,
        moves: [ 'amnesia', 'chargebeam', 'lockon', 'zapcannon' ]
      },
      {
        generation: 6,
        level: 40,
        shiny: 1,
        moves: [ 'bulldoze', 'curse', 'ancientpower', 'amnesia' ]
      },
      {
        generation: 6,
        level: 50,
        isHidden: true,
        moves: [ 'thunderbolt', 'amnesia', 'icebeam', 'hail' ],
        pokeball: 'pokeball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'icebeam', 'hammerarm', 'lockon', 'zapcannon' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'icebeam', 'zapcannon', 'amnesia', 'icywind' ]
      }
    ],
    eventOnly: true
  },
  registeel: {
    learnset: {
      amnesia: [ '6S4', '5S3' ],
      ancientpower: [ '6S4', '3S0', '3S1' ],
      chargebeam: [ '8S7', '5S3' ],
      curse: [ '6S4', '4S2', '3S0', '3S1' ],
      flashcannon: [ '8S7', '7S6' ],
      gravity: [ '6S5' ],
      hammerarm: [ '7S6' ],
      heavyslam: [ '8S7' ],
      hyperbeam: [ '3S1' ],
      irondefense: [ '8S7', '6S4', '6S5' ],
      ironhead: [ '6S5' ],
      lockon: [ '7S6', '5S3' ],
      metalclaw: [ '4S2', '3S0' ],
      rockslide: [ '6S5' ],
      stomp: [ '4S2' ],
      superpower: [ '4S2', '3S0', '3S1' ],
      zapcannon: [ '7S6', '5S3' ]
    },
    eventData: [
      {
        generation: 3,
        level: 40,
        shiny: 1,
        moves: [ 'metalclaw', 'curse', 'superpower', 'ancientpower' ]
      },
      {
        generation: 3,
        level: 40,
        moves: [ 'curse', 'superpower', 'ancientpower', 'hyperbeam' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 30,
        shiny: 1,
        moves: [ 'stomp', 'metalclaw', 'curse', 'superpower' ]
      },
      {
        generation: 5,
        level: 65,
        shiny: 1,
        moves: [ 'amnesia', 'chargebeam', 'lockon', 'zapcannon' ]
      },
      {
        generation: 6,
        level: 40,
        shiny: 1,
        moves: [ 'curse', 'ancientpower', 'irondefense', 'amnesia' ]
      },
      {
        generation: 6,
        level: 50,
        isHidden: true,
        moves: [ 'ironhead', 'rockslide', 'gravity', 'irondefense' ],
        pokeball: 'pokeball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'flashcannon', 'hammerarm', 'lockon', 'zapcannon' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'heavyslam', 'flashcannon', 'irondefense', 'chargebeam' ]
      }
    ],
    eventOnly: true
  },
  latias: {
    learnset: {
      charm: [ '5S5', '3S1', '3S2' ],
      dive: [ '8S11' ],
      dracometeor: [ '7S9' ],
      dragonbreath: [ '8S10', '6S6', '4S3' ],
      dragonpulse: [ '8S11', '7S7', '7S8' ],
      guardsplit: [ '9S12' ],
      healingwish: [ '9S12' ],
      healpulse: [ '6S6', '5S5' ],
      mistball: [
        '8S11', '7S7',
        '7S8',  '7S9',
        '6S6',  '4S3',
        '4S4',  '3S0',
        '3S1',  '3S2'
      ],
      psychic: [ '9S12', '7S9', '5S5', '3S0', '3S1', '3S2' ],
      psychoshift: [ '7S7', '7S8', '6S6', '5S5' ],
      recover: [ '3S1', '3S2' ],
      reflecttype: [ '9S12', '8S10' ],
      refresh: [ '4S3', '4S4', '3S0' ],
      surf: [ '8S10' ],
      sweetkiss: [ '8S11' ],
      tailwind: [ '7S9' ],
      watersport: [ '4S3', '4S4', '3S0' ],
      wish: [ '7S7', '7S8' ],
      zenheadbutt: [ '8S10', '4S4' ]
    },
    eventData: [
      {
        generation: 3,
        level: 40,
        shiny: 1,
        moves: [ 'watersport', 'refresh', 'mistball', 'psychic' ]
      },
      {
        generation: 3,
        level: 50,
        shiny: 1,
        moves: [ 'mistball', 'psychic', 'recover', 'charm' ]
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'mistball', 'psychic', 'recover', 'charm' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 35,
        shiny: 1,
        moves: [ 'dragonbreath', 'watersport', 'refresh', 'mistball' ]
      },
      {
        generation: 4,
        level: 40,
        shiny: 1,
        moves: [ 'watersport', 'refresh', 'mistball', 'zenheadbutt' ]
      },
      {
        generation: 5,
        level: 68,
        shiny: 1,
        moves: [ 'psychoshift', 'charm', 'psychic', 'healpulse' ]
      },
      {
        generation: 6,
        level: 30,
        shiny: 1,
        moves: [ 'healpulse', 'dragonbreath', 'mistball', 'psychoshift' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'mistball', 'dragonpulse', 'psychoshift', 'wish' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'mistball', 'dragonpulse', 'psychoshift', 'wish' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'mistball', 'psychic', 'dracometeor', 'tailwind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'reflecttype', 'dragonbreath', 'zenheadbutt', 'surf' ]
      },
      {
        generation: 8,
        level: 70,
        nature: 'Bashful',
        moves: [ 'mistball', 'dragonpulse', 'dive', 'sweetkiss' ],
        pokeball: 'cherishball'
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'healingwish', 'guardsplit', 'psychic', 'reflecttype' ]
      }
    ],
    eventOnly: true
  },
  latios: {
    learnset: {
      aurasphere: [ '8S11' ],
      dracometeor: [ '7S10' ],
      dragonbreath: [ '9S12', '7S8', '7S9', '6S6', '4S3' ],
      dragondance: [ '8S11', '5S5', '3S1', '3S2' ],
      dragonpulse: [ '9S12', '8S11', '7S8', '7S9', '6S7' ],
      healpulse: [ '6S6', '6S7', '5S5' ],
      lusterpurge: [
        '9S12', '7S8', '7S9',
        '7S10', '6S6', '6S7',
        '4S3',  '4S4', '3S0',
        '3S1',  '3S2'
      ],
      protect: [ '4S3', '4S4', '3S0' ],
      psychic: [ '7S10', '6S7', '5S5', '3S0', '3S1', '3S2' ],
      psychoshift: [ '7S8', '7S9', '6S6', '5S5' ],
      recover: [ '3S1', '3S2' ],
      refresh: [ '4S3', '4S4', '3S0' ],
      tailwind: [ '7S10' ],
      zenheadbutt: [ '9S12', '8S11', '4S4' ]
    },
    eventData: [
      {
        generation: 3,
        level: 40,
        shiny: 1,
        moves: [ 'protect', 'refresh', 'lusterpurge', 'psychic' ]
      },
      {
        generation: 3,
        level: 50,
        shiny: 1,
        moves: [ 'lusterpurge', 'psychic', 'recover', 'dragondance' ]
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'lusterpurge', 'psychic', 'recover', 'dragondance' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 35,
        shiny: 1,
        moves: [ 'dragonbreath', 'protect', 'refresh', 'lusterpurge' ]
      },
      {
        generation: 4,
        level: 40,
        shiny: 1,
        moves: [ 'protect', 'refresh', 'lusterpurge', 'zenheadbutt' ]
      },
      {
        generation: 5,
        level: 68,
        shiny: 1,
        moves: [ 'psychoshift', 'dragondance', 'psychic', 'healpulse' ]
      },
      {
        generation: 6,
        level: 30,
        shiny: 1,
        moves: [ 'healpulse', 'dragonbreath', 'lusterpurge', 'psychoshift' ]
      },
      {
        generation: 6,
        level: 50,
        nature: 'Modest',
        moves: [ 'dragonpulse', 'lusterpurge', 'psychic', 'healpulse' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'lusterpurge', 'dragonpulse', 'psychoshift', 'dragonbreath' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'lusterpurge', 'dragonpulse', 'psychoshift', 'dragonbreath' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'lusterpurge', 'psychic', 'dracometeor', 'tailwind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'dragondance', 'dragonpulse', 'zenheadbutt', 'aurasphere' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'lusterpurge', 'dragonpulse', 'zenheadbutt', 'dragonbreath' ]
      }
    ],
    eventOnly: true
  },
  kyogre: {
    learnset: {
      ancientpower: [ '5S3', '4S2' ],
      aquaring: [ '9S12', '8S11', '6S5', '4S2' ],
      bodyslam: [ '8S11', '6S5', '3S0' ],
      calmmind: [ '7S7', '7S8', '7S9', '7S10', '3S0' ],
      doubleedge: [ '3S1' ],
      hydropump: [ '3S0', '3S1' ],
      icebeam: [
        '9S12', '7S7',  '7S8',
        '7S9',  '7S10', '6S5',
        '6S6',  '5S3',  '5S4',
        '4S2',  '3S0'
      ],
      muddywater: [ '9S12', '7S7', '7S8', '7S9' ],
      originpulse: [ '7S7', '7S8', '7S9', '7S10', '6S5' ],
      rest: [ '3S1' ],
      sheercold: [ '9S12', '6S6', '5S4', '3S1' ],
      surf: [ '8S11' ],
      thunder: [ '8S11', '6S6', '5S3', '5S4' ],
      waterspout: [ '7S10', '6S6', '5S3', '5S4', '4S2' ]
    },
    eventData: [
      {
        generation: 3,
        level: 45,
        shiny: 1,
        moves: [ 'bodyslam', 'calmmind', 'icebeam', 'hydropump' ]
      },
      {
        generation: 3,
        level: 70,
        shiny: 1,
        moves: [ 'hydropump', 'rest', 'sheercold', 'doubleedge' ]
      },
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'aquaring', 'icebeam', 'ancientpower', 'waterspout' ]
      },
      {
        generation: 5,
        level: 80,
        shiny: 1,
        moves: [ 'icebeam', 'ancientpower', 'waterspout', 'thunder' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 100,
        moves: [ 'waterspout', 'thunder', 'icebeam', 'sheercold' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 45,
        moves: [ 'bodyslam', 'aquaring', 'icebeam', 'originpulse' ]
      },
      {
        generation: 6,
        level: 100,
        nature: 'Timid',
        moves: [ 'waterspout', 'thunder', 'sheercold', 'icebeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'icebeam', 'originpulse', 'calmmind', 'muddywater' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: true,
        moves: [ 'icebeam', 'originpulse', 'calmmind', 'muddywater' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'icebeam', 'originpulse', 'calmmind', 'muddywater' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'originpulse', 'icebeam', 'waterspout', 'calmmind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'surf', 'bodyslam', 'aquaring', 'thunder' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'aquaring', 'sheercold', 'icebeam', 'muddywater' ]
      }
    ],
    eventOnly: true
  },
  groudon: {
    learnset: {
      ancientpower: [ '5S3', '4S2' ],
      bulkup: [ '7S7', '7S8', '7S9', '3S0' ],
      earthpower: [ '7S10', '5S4' ],
      earthquake: [
        '9S12', '8S11',
        '7S7',  '7S8',
        '7S9',  '6S5',
        '5S3',  '4S2',
        '3S0'
      ],
      eruption: [ '5S3', '5S4', '4S2' ],
      fireblast: [ '3S0', '3S1' ],
      firepunch: [ '7S10', '6S6' ],
      fissure: [ '9S12', '3S1' ],
      hammerarm: [ '9S12', '8S11', '6S6', '5S4' ],
      lavaplume: [ '8S11', '6S5' ],
      precipiceblades: [ '7S7', '7S8', '7S9', '7S10', '6S5' ],
      rest: [ '9S12', '6S5', '4S2', '3S1' ],
      rockslide: [ '6S6' ],
      scaryface: [ '8S11' ],
      slash: [ '3S0' ],
      solarbeam: [
        '7S7', '7S8',
        '7S9', '6S6',
        '5S3', '5S4',
        '3S1'
      ],
      swordsdance: [ '7S10' ]
    },
    eventData: [
      {
        generation: 3,
        level: 45,
        shiny: 1,
        moves: [ 'slash', 'bulkup', 'earthquake', 'fireblast' ]
      },
      {
        generation: 3,
        level: 70,
        shiny: 1,
        moves: [ 'fireblast', 'rest', 'fissure', 'solarbeam' ]
      },
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'rest', 'earthquake', 'ancientpower', 'eruption' ]
      },
      {
        generation: 5,
        level: 80,
        shiny: 1,
        moves: [ 'earthquake', 'ancientpower', 'eruption', 'solarbeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 100,
        moves: [ 'eruption', 'hammerarm', 'earthpower', 'solarbeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 45,
        moves: [ 'lavaplume', 'rest', 'earthquake', 'precipiceblades' ]
      },
      {
        generation: 6,
        level: 100,
        nature: 'Adamant',
        moves: [ 'firepunch', 'solarbeam', 'hammerarm', 'rockslide' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'earthquake', 'precipiceblades', 'bulkup', 'solarbeam' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: true,
        moves: [ 'earthquake', 'precipiceblades', 'bulkup', 'solarbeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'earthquake', 'precipiceblades', 'bulkup', 'solarbeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'precipiceblades', 'earthpower', 'firepunch', 'swordsdance' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'earthquake', 'scaryface', 'lavaplume', 'hammerarm' ]
      },
      { generation: 9, level: 70, moves: [ 'rest', 'fissure', 'hammerarm', 'earthquake' ] }
    ],
    eventOnly: true
  },
  rayquaza: {
    learnset: {
      airslash: [ '4S1' ],
      ancientpower: [ '5S2', '4S1' ],
      brutalswing: [ '8S9' ],
      celebrate: [ '6S7' ],
      dracometeor: [ '6S7' ],
      dragonascent: [ '8S9', '6S4', '6S6', '6S7' ],
      dragonclaw: [ '6S6' ],
      dragondance: [ '7S8', '6S4', '6S6', '5S2' ],
      dragonpulse: [ '9S10', '7S8', '6S4', '6S5', '5S2', '5S3' ],
      extremespeed: [
        '8S9', '7S8',
        '6S4', '6S5',
        '6S6', '5S3',
        '3S0'
      ],
      fly: [ '9S10', '6S7', '3S0' ],
      hyperbeam: [ '5S3' ],
      hypervoice: [ '9S10' ],
      outrage: [ '5S2', '4S1', '3S0' ],
      rest: [ '9S10', '7S8', '4S1', '3S0' ],
      thunder: [ '6S5' ],
      twister: [ '8S9', '6S5' ],
      vcreate: [ '5S3' ]
    },
    eventData: [
      {
        generation: 3,
        level: 70,
        shiny: 1,
        moves: [ 'fly', 'rest', 'extremespeed', 'outrage' ]
      },
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'rest', 'airslash', 'ancientpower', 'outrage' ]
      },
      {
        generation: 5,
        level: 70,
        shiny: true,
        moves: [ 'dragonpulse', 'ancientpower', 'outrage', 'dragondance' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 100,
        moves: [ 'extremespeed', 'hyperbeam', 'dragonpulse', 'vcreate' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 70,
        moves: [ 'extremespeed', 'dragonpulse', 'dragondance', 'dragonascent' ]
      },
      {
        generation: 6,
        level: 70,
        shiny: true,
        moves: [ 'dragonpulse', 'thunder', 'twister', 'extremespeed' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 70,
        shiny: true,
        moves: [ 'dragonascent', 'dragonclaw', 'extremespeed', 'dragondance' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        shiny: true,
        moves: [ 'dragonascent', 'dracometeor', 'fly', 'celebrate' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'rest', 'extremespeed', 'dragonpulse', 'dragondance' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'dragonascent', 'brutalswing', 'extremespeed', 'twister' ]
      },
      { generation: 9, level: 70, moves: [ 'fly', 'rest', 'hypervoice', 'dragonpulse' ] }
    ],
    eventOnly: true
  },
  jirachi: {
    learnset: {
      confusion: [
        '6S18', '6S20', '6S21',
        '4S11', '4S12', '3S0',
        '3S1',  '3S2',  '3S3',
        '3S4',  '3S5',  '3S6',
        '3S7',  '3S8',  '3S9'
      ],
      cosmicpower: [ '6S19', '5S15' ],
      dracometeor: [ '5S14', '4S12' ],
      followme: [ '5S14' ],
      happyhour: [ '6S20' ],
      healingwish: [ '7S22', '6S17', '5S13', '5S15', '5S16' ],
      heartstamp: [ '6S19' ],
      helpinghand: [ '6S18', '3S10' ],
      meteormash: [ '8S23', '5S13', '5S14', '5S15' ],
      moonblast: [ '6S17' ],
      playrough: [ '6S19' ],
      psychic: [ '8S23', '5S13', '3S10' ],
      refresh: [ '3S10' ],
      rest: [
        '8S23', '7S22', '6S21',
        '4S11', '4S12', '3S0',
        '3S1',  '3S2',  '3S3',
        '3S4',  '3S5',  '3S6',
        '3S7',  '3S8',  '3S9',
        '3S10'
      ],
      return: [ '6S18', '5S16' ],
      swift: [ '7S22', '6S17', '6S20', '5S13', '5S16' ],
      wish: [
        '8S23', '7S22', '6S17', '6S18',
        '6S19', '6S20', '6S21', '5S14',
        '5S15', '5S16', '4S11', '4S12',
        '3S0',  '3S1',  '3S2',  '3S3',
        '3S4',  '3S5',  '3S6',  '3S7',
        '3S8',  '3S9'
      ]
    },
    eventData: [
      {
        generation: 3,
        level: 5,
        moves: [ 'wish', 'confusion', 'rest' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: true,
        nature: 'Bashful',
        ivs: { hp: 24, atk: 3, def: 30, spa: 12, spd: 16, spe: 11 },
        moves: [ 'wish', 'confusion', 'rest' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: true,
        nature: 'Careful',
        ivs: { hp: 10, atk: 0, def: 10, spa: 10, spd: 26, spe: 12 },
        moves: [ 'wish', 'confusion', 'rest' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: true,
        nature: 'Docile',
        ivs: { hp: 19, atk: 7, def: 10, spa: 19, spd: 10, spe: 16 },
        moves: [ 'wish', 'confusion', 'rest' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: true,
        nature: 'Hasty',
        ivs: { hp: 3, atk: 12, def: 12, spa: 7, spd: 11, spe: 9 },
        moves: [ 'wish', 'confusion', 'rest' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: true,
        nature: 'Jolly',
        ivs: { hp: 11, atk: 8, def: 6, spa: 14, spd: 5, spe: 20 },
        moves: [ 'wish', 'confusion', 'rest' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: true,
        nature: 'Lonely',
        ivs: { hp: 31, atk: 23, def: 26, spa: 29, spd: 18, spe: 5 },
        moves: [ 'wish', 'confusion', 'rest' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: true,
        nature: 'Naughty',
        ivs: { hp: 21, atk: 31, def: 31, spa: 18, spd: 24, spe: 19 },
        moves: [ 'wish', 'confusion', 'rest' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: true,
        nature: 'Serious',
        ivs: { hp: 29, atk: 10, def: 31, spa: 25, spd: 23, spe: 21 },
        moves: [ 'wish', 'confusion', 'rest' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 5,
        shiny: true,
        nature: 'Timid',
        ivs: { hp: 15, atk: 28, def: 29, spa: 3, spd: 0, spe: 7 },
        moves: [ 'wish', 'confusion', 'rest' ],
        pokeball: 'pokeball'
      },
      {
        generation: 3,
        level: 30,
        moves: [ 'helpinghand', 'psychic', 'refresh', 'rest' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 5,
        moves: [ 'wish', 'confusion', 'rest' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 5,
        moves: [ 'wish', 'confusion', 'rest', 'dracometeor' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        moves: [ 'healingwish', 'psychic', 'swift', 'meteormash' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        moves: [ 'dracometeor', 'meteormash', 'wish', 'followme' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        moves: [ 'wish', 'healingwish', 'cosmicpower', 'meteormash' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        moves: [ 'wish', 'healingwish', 'swift', 'return' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        shiny: true,
        moves: [ 'wish', 'swift', 'healingwish', 'moonblast' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 15,
        shiny: true,
        moves: [ 'wish', 'confusion', 'helpinghand', 'return' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'heartstamp', 'playrough', 'wish', 'cosmicpower' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 25,
        shiny: true,
        moves: [ 'wish', 'confusion', 'swift', 'happyhour' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'wish', 'confusion', 'rest' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 15,
        moves: [ 'swift', 'wish', 'healingwish', 'rest' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        nature: 'Timid',
        moves: [ 'meteormash', 'psychic', 'rest', 'wish' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  deoxys: {
    learnset: {
      cosmicpower: [ '6S10', '3S3' ],
      counter: [ '4S6' ],
      darkpulse: [ '5S9' ],
      detect: [ '4S6' ],
      doubleteam: [ '4S5' ],
      extremespeed: [ '4S4', '4S5' ],
      hyperbeam: [ '6S10', '4S7', '3S3' ],
      irondefense: [ '4S4' ],
      knockoff: [ '3S1', '3S2' ],
      leer: [ '4S8' ],
      meteormash: [ '4S7' ],
      mirrorcoat: [ '4S6' ],
      nastyplot: [ '5S9' ],
      nightshade: [ '4S8' ],
      psychic: [ '3S0', '3S1', '3S2' ],
      psychoboost: [
        '6S10', '5S9',
        '4S4',  '4S5',
        '4S6',  '4S7',
        '4S8',  '3S3'
      ],
      pursuit: [ '3S0', '3S2' ],
      recover: [ '6S10', '5S9', '3S3' ],
      snatch: [ '3S1' ],
      spikes: [ '3S1' ],
      superpower: [ '4S7', '3S0' ],
      swift: [ '4S5', '3S2' ],
      taunt: [ '3S0' ],
      wrap: [ '4S8' ],
      zapcannon: [ '4S4' ]
    },
    eventData: [
      {
        generation: 3,
        level: 30,
        shiny: 1,
        moves: [ 'taunt', 'pursuit', 'psychic', 'superpower' ]
      },
      {
        generation: 3,
        level: 30,
        shiny: 1,
        moves: [ 'knockoff', 'spikes', 'psychic', 'snatch' ]
      },
      {
        generation: 3,
        level: 30,
        shiny: 1,
        moves: [ 'knockoff', 'pursuit', 'psychic', 'swift' ]
      },
      {
        generation: 3,
        level: 70,
        moves: [ 'cosmicpower', 'recover', 'psychoboost', 'hyperbeam' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'psychoboost', 'zapcannon', 'irondefense', 'extremespeed' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'psychoboost', 'swift', 'doubleteam', 'extremespeed' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'psychoboost', 'detect', 'counter', 'mirrorcoat' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'psychoboost', 'meteormash', 'superpower', 'hyperbeam' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'psychoboost', 'leer', 'wrap', 'nightshade' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 100,
        moves: [ 'nastyplot', 'darkpulse', 'recover', 'psychoboost' ],
        pokeball: 'duskball'
      },
      {
        generation: 6,
        level: 80,
        moves: [ 'cosmicpower', 'recover', 'psychoboost', 'hyperbeam' ]
      }
    ],
    eventOnly: true
  },
  deoxysattack: { eventOnly: true },
  deoxysdefense: { eventOnly: true },
  deoxysspeed: { eventOnly: true },
  turtwig: {
    learnset: {
      absorb: [ '5S0', '5S1' ],
      stockpile: [ '5S1' ],
      tackle: [ '9S2', '5S0', '5S1' ],
      withdraw: [ '5S0', '5S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'tackle', 'withdraw', 'absorb' ]
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'tackle', 'withdraw', 'absorb', 'stockpile' ]
      },
      { generation: 9, level: 1, moves: [ 'tackle' ], pokeball: 'pokeball' }
    ]
  },
  torterra: {
    learnset: {
      earthquake: [ '5S0' ],
      outrage: [ '5S0' ],
      stoneedge: [ '5S0' ],
      woodhammer: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 100,
        gender: 'M',
        moves: [ 'woodhammer', 'earthquake', 'outrage', 'stoneedge' ],
        pokeball: 'cherishball'
      }
    ]
  },
  chimchar: {
    learnset: {
      ember: [ '5S1', '5S3' ],
      fakeout: [ '5S3' ],
      flamethrower: [ '4S0', '4S2' ],
      grassknot: [ '4S0', '4S2' ],
      helpinghand: [ '4S0', '4S2' ],
      leer: [ '5S1', '5S3' ],
      scratch: [ '9S4', '5S1' ],
      taunt: [ '5S1', '5S3' ],
      thunderpunch: [ '4S0', '4S2' ]
    },
    eventData: [
      {
        generation: 4,
        level: 40,
        gender: 'M',
        nature: 'Mild',
        moves: [ 'flamethrower', 'thunderpunch', 'grassknot', 'helpinghand' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'scratch', 'leer', 'ember', 'taunt' ]
      },
      {
        generation: 4,
        level: 40,
        gender: 'M',
        nature: 'Hardy',
        moves: [ 'flamethrower', 'thunderpunch', 'grassknot', 'helpinghand' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'leer', 'ember', 'taunt', 'fakeout' ]
      },
      { generation: 9, level: 1, moves: [ 'scratch' ], pokeball: 'pokeball' }
    ]
  },
  infernape: {
    learnset: {
      closecombat: [ '6S1', '5S0' ],
      fireblast: [ '6S1', '5S0' ],
      firepunch: [ '6S1' ],
      focuspunch: [ '6S1' ],
      grassknot: [ '5S0' ],
      uturn: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 100,
        gender: 'M',
        moves: [ 'fireblast', 'closecombat', 'uturn', 'grassknot' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 88,
        isHidden: true,
        moves: [ 'fireblast', 'closecombat', 'firepunch', 'focuspunch' ],
        pokeball: 'cherishball'
      }
    ]
  },
  piplup: {
    learnset: {
      bubble: [ '5S0', '5S3' ],
      bubblebeam: [ '7S5' ],
      drillpeck: [ '7S5' ],
      featherdance: [ '5S1', '5S2', '5S3' ],
      growl: [ '6S4', '5S0', '5S3' ],
      hydropump: [ '7S5', '5S1' ],
      peck: [ '5S1', '5S2' ],
      pound: [ '9S6', '6S4', '5S0', '5S3' ],
      return: [ '6S4' ],
      round: [ '5S2' ],
      sing: [ '5S2' ],
      watersport: [ '5S1' ],
      whirlpool: [ '7S5' ]
    },
    eventData: [
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'pound', 'growl', 'bubble' ]
      },
      {
        generation: 5,
        level: 15,
        shiny: 1,
        moves: [ 'hydropump', 'featherdance', 'watersport', 'peck' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 15,
        gender: 'M',
        moves: [ 'sing', 'round', 'featherdance', 'peck' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'pound', 'growl', 'bubble', 'featherdance' ]
      },
      {
        generation: 6,
        level: 7,
        moves: [ 'pound', 'growl', 'return' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 30,
        gender: 'M',
        nature: 'Hardy',
        moves: [ 'hydropump', 'bubblebeam', 'whirlpool', 'drillpeck' ],
        pokeball: 'pokeball'
      },
      { generation: 9, level: 1, moves: [ 'pound' ], pokeball: 'pokeball' }
    ]
  },
  empoleon: {
    learnset: { aquajet: [ '5S0' ], grassknot: [ '5S0' ], hydropump: [ '5S0' ], icebeam: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 100,
        gender: 'M',
        moves: [ 'hydropump', 'icebeam', 'aquajet', 'grassknot' ],
        pokeball: 'cherishball'
      }
    ]
  },
  starly: {
    learnset: { growl: [ '4S0' ], tackle: [ '4S0' ] },
    eventData: [
      {
        generation: 4,
        level: 1,
        gender: 'M',
        nature: 'Mild',
        moves: [ 'tackle', 'growl' ],
        pokeball: 'pokeball'
      }
    ]
  },
  staravia: { encounters: [ { generation: 4, level: 4 } ] },
  bidoof: {
    learnset: { tackle: [ '4S0' ] },
    eventData: [
      {
        generation: 4,
        level: 1,
        gender: 'M',
        nature: 'Lonely',
        abilities: [ 'simple' ],
        moves: [ 'tackle' ],
        pokeball: 'pokeball'
      }
    ]
  },
  bibarel: { encounters: [ { generation: 4, level: 4 } ] },
  cranidos: {
    learnset: { crunch: [ '5S0' ], headbutt: [ '5S0' ], pursuit: [ '5S0' ], takedown: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 15,
        gender: 'M',
        moves: [ 'pursuit', 'takedown', 'crunch', 'headbutt' ],
        pokeball: 'cherishball'
      }
    ]
  },
  shieldon: {
    learnset: { bodyslam: [ '5S0' ], metalsound: [ '5S0' ], protect: [ '5S0' ], takedown: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 15,
        gender: 'M',
        moves: [ 'metalsound', 'takedown', 'bodyslam', 'protect' ],
        pokeball: 'cherishball'
      }
    ]
  },
  pachirisu: {
    learnset: { followme: [ '6S0' ], nuzzle: [ '6S0' ], protect: [ '6S0' ], superfang: [ '6S0' ] },
    eventData: [
      {
        generation: 6,
        level: 50,
        nature: 'Impish',
        ivs: { hp: 31, atk: 31, def: 31, spa: 14, spd: 31, spe: 31 },
        isHidden: true,
        moves: [ 'nuzzle', 'superfang', 'followme', 'protect' ],
        pokeball: 'cherishball'
      }
    ]
  },
  floatzel: { encounters: [ { generation: 4, level: 22 }, { generation: 5, level: 10 } ] },
  gastrodon: {
    learnset: { earthpower: [ '7S0' ], icebeam: [ '7S0' ], protect: [ '7S0' ], recover: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 50,
        gender: 'F',
        nature: 'Modest',
        abilities: [ 'stormdrain' ],
        ivs: { hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 31 },
        moves: [ 'earthpower', 'icebeam', 'recover', 'protect' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 4, level: 20 } ]
  },
  gastrodoneast: {
    learnset: {
      earthpower: [ '9S3', '9S2', '8S1', '8S0' ],
      icebeam: [ '9S2', '8S1', '8S0' ],
      icywind: [ '9S3' ],
      protect: [ '9S3', '9S2', '8S1', '8S0' ],
      surf: [ '8S0' ],
      yawn: [ '9S3', '9S2', '8S1' ]
    },
    eventData: [
      {
        generation: 8,
        level: 50,
        gender: 'F',
        nature: 'Quiet',
        abilities: [ 'stormdrain' ],
        ivs: { hp: 31, atk: 2, def: 31, spa: 31, spd: 31, spe: 0 },
        moves: [ 'protect', 'surf', 'icebeam', 'earthpower' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 50,
        gender: 'F',
        nature: 'Sassy',
        abilities: [ 'stormdrain' ],
        ivs: { hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 0 },
        moves: [ 'protect', 'yawn', 'icebeam', 'earthpower' ],
        pokeball: 'cherishball'
      },
      {
        generation: 9,
        level: 50,
        gender: 'M',
        nature: 'Bold',
        abilities: [ 'stormdrain' ],
        ivs: { hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 8 },
        moves: [ 'protect', 'yawn', 'icebeam', 'earthpower' ],
        pokeball: 'cherishball'
      },
      {
        generation: 9,
        level: 50,
        gender: 'F',
        nature: 'Calm',
        abilities: [ 'stormdrain' ],
        ivs: { hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 8 },
        moves: [ 'protect', 'yawn', 'icywind', 'earthpower' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 4, level: 20 } ]
  },
  drifblim: { encounters: [ { generation: 7, level: 11, pokeball: 'pokeball' } ] },
  purugly: { encounters: [ { generation: 6, level: 32, maxEggMoves: 1 } ] },
  skuntank: { encounters: [ { generation: 4, level: 29 } ] },
  bronzong: {
    learnset: {
      bodypress: [ '9S0' ],
      flashcannon: [ '9S1' ],
      gyroball: [ '9S1' ],
      hypnosis: [ '9S1' ],
      irondefense: [ '9S0' ],
      protect: [ '9S0' ],
      psychic: [ '9S1' ],
      trickroom: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 50,
        nature: 'Relaxed',
        ivs: { hp: 31, atk: 31, def: 31, spa: 22, spd: 31, spe: 0 },
        moves: [ 'bodypress', 'irondefense', 'protect', 'trickroom' ],
        pokeball: 'cherishball'
      },
      {
        generation: 9,
        level: 50,
        nature: 'Modest',
        moves: [ 'flashcannon', 'gyroball', 'psychic', 'hypnosis' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 6, level: 30 } ]
  },
  chatot: {
    learnset: { chatter: [ '4S0' ], furyattack: [ '4S0' ], mirrormove: [ '4S0' ], taunt: [ '4S0' ] },
    eventData: [
      {
        generation: 4,
        level: 25,
        gender: 'M',
        nature: 'Jolly',
        abilities: [ 'keeneye' ],
        moves: [ 'mirrormove', 'furyattack', 'chatter', 'taunt' ]
      }
    ]
  },
  spiritomb: {
    learnset: { darkpulse: [ '5S0' ], embargo: [ '5S0' ], psychic: [ '5S0' ], silverwind: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 61,
        gender: 'F',
        nature: 'Quiet',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        moves: [ 'darkpulse', 'psychic', 'silverwind', 'embargo' ],
        pokeball: 'cherishball'
      }
    ]
  },
  garchomp: {
    learnset: {
      brickbreak: [ '6S4' ],
      crunch: [ '6S2', '6S3', '5S1' ],
      dig: [ '6S2', '6S3', '5S1' ],
      dracometeor: [ '6S2' ],
      dragonclaw: [ '6S2', '6S3', '5S1' ],
      dragonrush: [ '6S4' ],
      earthquake: [ '6S4', '5S0' ],
      gigaimpact: [ '6S4' ],
      outrage: [ '5S0', '5S1' ],
      slash: [ '6S3' ],
      stoneedge: [ '5S0' ],
      swordsdance: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 100,
        gender: 'M',
        moves: [ 'outrage', 'earthquake', 'swordsdance', 'stoneedge' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 48,
        gender: 'M',
        isHidden: true,
        moves: [ 'dragonclaw', 'dig', 'crunch', 'outrage' ]
      },
      {
        generation: 6,
        level: 48,
        gender: 'M',
        moves: [ 'dracometeor', 'dragonclaw', 'dig', 'crunch' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        gender: 'M',
        moves: [ 'slash', 'dragonclaw', 'dig', 'crunch' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 66,
        gender: 'F',
        perfectIVs: 3,
        moves: [ 'dragonrush', 'earthquake', 'brickbreak', 'gigaimpact' ],
        pokeball: 'cherishball'
      }
    ]
  },
  riolu: {
    learnset: {
      aurasphere: [ '4S0' ],
      bulletpunch: [ '4S0' ],
      drainpunch: [ '4S0' ],
      shadowclaw: [ '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 30,
        gender: 'M',
        nature: 'Serious',
        abilities: [ 'steadfast' ],
        moves: [ 'aurasphere', 'shadowclaw', 'bulletpunch', 'drainpunch' ],
        pokeball: 'pokeball'
      }
    ]
  },
  lucario: {
    learnset: {
      aurasphere: [ '9S7', '8S6', '7S5', '6S4', '4S0' ],
      blazekick: [ '4S1' ],
      bonerush: [ '4S1' ],
      bulletpunch: [ '9S7', '8S6', '5S2', '5S3' ],
      closecombat: [ '6S4', '5S3' ],
      counter: [ '5S2' ],
      darkpulse: [ '4S0' ],
      detect: [ '5S2' ],
      dragonpulse: [ '7S5', '4S0' ],
      extremespeed: [ '7S5' ],
      flashcannon: [ '9S7', '6S4' ],
      forcepalm: [ '4S1' ],
      highjumpkick: [ '7S5' ],
      icepunch: [ '9S7' ],
      metalclaw: [ '5S2' ],
      quickattack: [ '6S4' ],
      reversal: [ '8S6' ],
      shadowclaw: [ '5S3' ],
      steelbeam: [ '8S6' ],
      stoneedge: [ '5S3' ],
      sunnyday: [ '4S1' ],
      waterpulse: [ '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Modest',
        abilities: [ 'steadfast' ],
        moves: [ 'aurasphere', 'darkpulse', 'dragonpulse', 'waterpulse' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 30,
        gender: 'M',
        nature: 'Adamant',
        abilities: [ 'innerfocus' ],
        moves: [ 'forcepalm', 'bonerush', 'sunnyday', 'blazekick' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'detect', 'metalclaw', 'counter', 'bulletpunch' ]
      },
      {
        generation: 5,
        level: 50,
        gender: 'M',
        nature: 'Naughty',
        ivs: { atk: 31 },
        isHidden: true,
        moves: [ 'bulletpunch', 'closecombat', 'stoneedge', 'shadowclaw' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        nature: 'Jolly',
        abilities: [ 'innerfocus' ],
        moves: [ 'closecombat', 'aurasphere', 'flashcannon', 'quickattack' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 40,
        gender: 'M',
        nature: 'Serious',
        abilities: [ 'steadfast' ],
        moves: [ 'aurasphere', 'highjumpkick', 'dragonpulse', 'extremespeed' ],
        pokeball: 'pokeball'
      },
      {
        generation: 8,
        level: 80,
        gender: 'M',
        nature: 'Serious',
        abilities: [ 'innerfocus' ],
        ivs: { hp: 31, atk: 30, def: 30, spa: 31, spd: 30, spe: 31 },
        moves: [ 'aurasphere', 'bulletpunch', 'reversal', 'steelbeam' ],
        pokeball: 'pokeball'
      },
      {
        generation: 9,
        level: 75,
        shiny: true,
        gender: 'M',
        nature: 'Naive',
        abilities: [ 'innerfocus' ],
        ivs: { hp: 31, atk: 31, def: 20, spa: 31, spd: 20, spe: 31 },
        moves: [ 'flashcannon', 'bulletpunch', 'aurasphere', 'icepunch' ],
        pokeball: 'cherishball'
      }
    ]
  },
  drapion: {
    encounters: [ { generation: 4, level: 22, pokeball: 'safariball' }, { generation: 6, level: 30 } ]
  },
  croagunk: {
    learnset: {
      astonish: [ '5S0' ],
      mudslap: [ '5S0', '5S1' ],
      poisonjab: [ '5S1' ],
      poisonsting: [ '5S0', '5S1' ],
      taunt: [ '5S0', '5S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'astonish', 'mudslap', 'poisonsting', 'taunt' ]
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'mudslap', 'poisonsting', 'taunt', 'poisonjab' ]
      }
    ]
  },
  toxicroak: {
    encounters: [ { generation: 4, level: 22, pokeball: 'safariball' }, { generation: 6, level: 30 } ]
  },
  lumineon: { encounters: [ { generation: 4, level: 20 } ] },
  abomasnow: { encounters: [ { generation: 4, level: 38 } ] },
  rotom: {
    learnset: {
      astonish: [ '6S1', '5S0' ],
      confide: [ '7S2' ],
      disarmingvoice: [ '7S2' ],
      shockwave: [ '6S1' ],
      thundershock: [ '5S0' ],
      thunderwave: [ '6S1' ],
      trick: [ '6S1', '5S0' ],
      uproar: [ '7S2', '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 10,
        nature: 'Naughty',
        moves: [ 'uproar', 'astonish', 'trick', 'thundershock' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        nature: 'Quirky',
        moves: [ 'shockwave', 'astonish', 'trick', 'thunderwave' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 10,
        moves: [ 'uproar', 'confide', 'disarmingvoice' ],
        pokeball: 'cherishball'
      }
    ]
  },
  uxie: {
    learnset: {
      amnesia: [ '7S4', '6S3', '5S2', '4S0', '4S1' ],
      confusion: [ '4S0' ],
      extrasensory: [ '7S4', '6S3', '5S2' ],
      flail: [ '5S2' ],
      futuresight: [ '8S5', '6S3', '5S2', '4S0', '4S1' ],
      magicroom: [ '8S5' ],
      psychic: [ '8S5' ],
      shadowball: [ '8S5' ],
      swift: [ '7S4', '4S1' ],
      yawn: [ '7S4', '6S3', '4S0', '4S1' ]
    },
    eventData: [
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'confusion', 'yawn', 'futuresight', 'amnesia' ]
      },
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'swift', 'yawn', 'futuresight', 'amnesia' ]
      },
      {
        generation: 5,
        level: 65,
        shiny: 1,
        moves: [ 'futuresight', 'amnesia', 'extrasensory', 'flail' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'yawn', 'futuresight', 'amnesia', 'extrasensory' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'extrasensory', 'yawn', 'amnesia', 'swift' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'psychic', 'futuresight', 'magicroom', 'shadowball' ]
      }
    ],
    eventOnly: true
  },
  mesprit: {
    learnset: {
      charm: [ '8S5', '7S4', '6S3', '5S2', '4S0', '4S1' ],
      confusion: [ '4S0' ],
      copycat: [ '5S2' ],
      drainingkiss: [ '8S5' ],
      extrasensory: [ '7S4', '6S3', '5S2' ],
      futuresight: [ '7S4', '6S3', '5S2', '4S0', '4S1' ],
      luckychant: [ '6S3', '4S0', '4S1' ],
      psychic: [ '8S5' ],
      swift: [ '7S4', '4S1' ],
      triattack: [ '8S5' ]
    },
    eventData: [
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'confusion', 'luckychant', 'futuresight', 'charm' ]
      },
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'swift', 'luckychant', 'futuresight', 'charm' ]
      },
      {
        generation: 5,
        level: 50,
        shiny: 1,
        moves: [ 'futuresight', 'charm', 'extrasensory', 'copycat' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'luckychant', 'futuresight', 'charm', 'extrasensory' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'extrasensory', 'charm', 'futuresight', 'swift' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'psychic', 'charm', 'drainingkiss', 'triattack' ]
      }
    ],
    eventOnly: true
  },
  azelf: {
    learnset: {
      confusion: [ '4S0' ],
      dazzlinggleam: [ '8S5' ],
      extrasensory: [ '7S4', '6S3', '5S2' ],
      facade: [ '8S5' ],
      futuresight: [ '6S3', '5S2', '4S0', '4S1' ],
      lastresort: [ '5S2' ],
      nastyplot: [ '8S5', '7S4', '6S3', '5S2', '4S0', '4S1' ],
      psychic: [ '8S5' ],
      swift: [ '7S4', '4S1' ],
      uproar: [ '7S4', '6S3', '4S0', '4S1' ]
    },
    eventData: [
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'confusion', 'uproar', 'futuresight', 'nastyplot' ]
      },
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'swift', 'uproar', 'futuresight', 'nastyplot' ]
      },
      {
        generation: 5,
        level: 50,
        shiny: 1,
        moves: [ 'futuresight', 'nastyplot', 'extrasensory', 'lastresort' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'uproar', 'futuresight', 'nastyplot', 'extrasensory' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'extrasensory', 'nastyplot', 'uproar', 'swift' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'psychic', 'dazzlinggleam', 'nastyplot', 'facade' ]
      }
    ],
    eventOnly: true
  },
  dialga: {
    learnset: {
      ancientpower: [ '8S11', '4S0' ],
      aurasphere: [ '7S7', '7S8', '7S9', '7S10', '6S5', '5S4' ],
      dracometeor: [ '9S13', '7S9', '7S10', '5S4' ],
      dragonbreath: [ '5S3', '4S2' ],
      dragonclaw: [ '8S11', '4S0' ],
      dragonpulse: [ '5S4' ],
      earthpower: [ '9S13', '4S1' ],
      fireblast: [ '9S13' ],
      flashcannon: [
        '8S12', '8S11',
        '7S7',  '7S8',
        '7S9',  '7S10',
        '6S5',  '6S6'
      ],
      healblock: [ '4S1' ],
      irontail: [ '7S7', '7S8', '6S5' ],
      metalburst: [ '8S12', '6S6' ],
      metalclaw: [ '4S0' ],
      overheat: [ '8S12', '6S6' ],
      roaroftime: [
        '8S12', '7S7',
        '7S8',  '7S9',
        '7S10', '6S5',
        '6S6',  '5S4',
        '4S0',  '4S1'
      ],
      scaryface: [ '5S3', '4S2' ],
      slash: [ '8S11', '4S1' ],
      steelbeam: [ '9S13' ]
    },
    eventData: [
      {
        generation: 4,
        level: 47,
        shiny: 1,
        moves: [ 'metalclaw', 'ancientpower', 'dragonclaw', 'roaroftime' ]
      },
      {
        generation: 4,
        level: 70,
        shiny: 1,
        moves: [ 'roaroftime', 'healblock', 'earthpower', 'slash' ]
      },
      { generation: 4, level: 1, shiny: 1, moves: [ 'dragonbreath', 'scaryface' ] },
      {
        generation: 5,
        level: 5,
        isHidden: true,
        moves: [ 'dragonbreath', 'scaryface' ],
        pokeball: 'dreamball'
      },
      {
        generation: 5,
        level: 100,
        shiny: true,
        moves: [ 'dragonpulse', 'dracometeor', 'aurasphere', 'roaroftime' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'aurasphere', 'irontail', 'roaroftime', 'flashcannon' ]
      },
      {
        generation: 6,
        level: 100,
        nature: 'Modest',
        isHidden: true,
        moves: [ 'metalburst', 'overheat', 'roaroftime', 'flashcannon' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'aurasphere', 'irontail', 'roaroftime', 'flashcannon' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'aurasphere', 'irontail', 'roaroftime', 'flashcannon' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'roaroftime', 'aurasphere', 'dracometeor', 'flashcannon' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        moves: [ 'flashcannon', 'dracometeor', 'roaroftime', 'aurasphere' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'slash', 'ancientpower', 'flashcannon', 'dragonclaw' ]
      },
      {
        generation: 8,
        level: 70,
        nature: 'Bold',
        isHidden: true,
        moves: [ 'roaroftime', 'flashcannon', 'metalburst', 'overheat' ],
        pokeball: 'cherishball'
      },
      {
        generation: 9,
        level: 75,
        nature: 'Quiet',
        isHidden: true,
        perfectIVs: 4,
        moves: [ 'dracometeor', 'earthpower', 'fireblast', 'steelbeam' ]
      }
    ],
    eventOnly: true
  },
  dialgaorigin: { eventOnly: true },
  palkia: {
    learnset: {
      ancientpower: [ '8S11', '4S0' ],
      aquatail: [ '7S7', '7S8' ],
      aurasphere: [
        '8S12', '7S7',
        '7S8',  '7S9',
        '7S10', '6S5',
        '6S6',  '5S4'
      ],
      dracometeor: [ '9S13', '7S9', '7S10', '5S4' ],
      dragonbreath: [ '5S3', '4S2' ],
      dragonclaw: [ '8S11', '4S0' ],
      earthpower: [ '8S12', '6S5', '6S6', '4S1' ],
      fireblast: [ '9S13' ],
      healblock: [ '4S1' ],
      hydropump: [
        '9S13', '8S12',
        '7S7',  '7S8',
        '7S9',  '7S10',
        '6S5',  '6S6',
        '5S4'
      ],
      scaryface: [ '5S3', '4S2' ],
      slash: [ '8S11', '4S1' ],
      spacialrend: [
        '8S12', '7S7',
        '7S8',  '7S9',
        '7S10', '6S5',
        '6S6',  '5S4',
        '4S0',  '4S1'
      ],
      surf: [ '8S11' ],
      thunder: [ '9S13' ],
      waterpulse: [ '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 47,
        shiny: 1,
        moves: [ 'waterpulse', 'ancientpower', 'dragonclaw', 'spacialrend' ]
      },
      {
        generation: 4,
        level: 70,
        shiny: 1,
        moves: [ 'spacialrend', 'healblock', 'earthpower', 'slash' ]
      },
      { generation: 4, level: 1, shiny: 1, moves: [ 'dragonbreath', 'scaryface' ] },
      {
        generation: 5,
        level: 5,
        isHidden: true,
        moves: [ 'dragonbreath', 'scaryface' ],
        pokeball: 'dreamball'
      },
      {
        generation: 5,
        level: 100,
        shiny: true,
        moves: [ 'hydropump', 'dracometeor', 'spacialrend', 'aurasphere' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'earthpower', 'aurasphere', 'spacialrend', 'hydropump' ]
      },
      {
        generation: 6,
        level: 100,
        nature: 'Timid',
        isHidden: true,
        moves: [ 'earthpower', 'aurasphere', 'spacialrend', 'hydropump' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'aurasphere', 'aquatail', 'spacialrend', 'hydropump' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'aurasphere', 'aquatail', 'spacialrend', 'hydropump' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'spacialrend', 'aurasphere', 'dracometeor', 'hydropump' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        moves: [ 'hydropump', 'dracometeor', 'spacialrend', 'aurasphere' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'slash', 'surf', 'ancientpower', 'dragonclaw' ]
      },
      {
        generation: 8,
        level: 70,
        nature: 'Hasty',
        isHidden: true,
        moves: [ 'spacialrend', 'hydropump', 'aurasphere', 'earthpower' ],
        pokeball: 'cherishball'
      },
      {
        generation: 9,
        level: 75,
        nature: 'Modest',
        isHidden: true,
        perfectIVs: 4,
        moves: [ 'dracometeor', 'thunder', 'fireblast', 'hydropump' ]
      }
    ],
    eventOnly: true
  },
  palkiaorigin: { eventOnly: true },
  heatran: {
    learnset: {
      ancientpower: [ '4S2' ],
      crunch: [ '8S8', '7S5', '7S6', '6S4', '4S1' ],
      earthpower: [ '7S7', '4S2' ],
      eruption: [ '4S2' ],
      firespin: [ '7S5', '7S6', '5S3', '4S0' ],
      flashcannon: [ '7S7' ],
      heatwave: [ '7S7' ],
      ironhead: [ '8S8', '5S3', '4S0' ],
      lavaplume: [
        '8S8', '7S5',
        '7S6', '6S4',
        '5S3', '4S0',
        '4S1'
      ],
      magmastorm: [ '7S7', '4S2' ],
      metalsound: [ '8S8', '6S4', '4S1' ],
      scaryface: [ '7S5', '7S6', '6S4', '5S3', '4S0', '4S1' ]
    },
    eventData: [
      {
        generation: 4,
        level: 70,
        shiny: 1,
        moves: [ 'scaryface', 'lavaplume', 'firespin', 'ironhead' ]
      },
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'metalsound', 'crunch', 'scaryface', 'lavaplume' ]
      },
      {
        generation: 4,
        level: 50,
        gender: 'M',
        nature: 'Quiet',
        moves: [ 'eruption', 'magmastorm', 'earthpower', 'ancientpower' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 68,
        shiny: 1,
        moves: [ 'scaryface', 'lavaplume', 'firespin', 'ironhead' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'metalsound', 'crunch', 'scaryface', 'lavaplume' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'crunch', 'scaryface', 'lavaplume', 'firespin' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'crunch', 'scaryface', 'lavaplume', 'firespin' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'magmastorm', 'heatwave', 'earthpower', 'flashcannon' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'metalsound', 'lavaplume', 'crunch', 'ironhead' ]
      }
    ],
    eventOnly: true
  },
  regigigas: {
    learnset: {
      confuseray: [ '7S5', '7S6', '4S0', '4S1' ],
      crushgrip: [ '8S8', '7S7', '4S2' ],
      dizzypunch: [ '7S5', '7S6', '4S1' ],
      drainpunch: [ '7S7' ],
      foresight: [ '6S4', '4S1' ],
      gigaimpact: [ '8S8' ],
      hammerarm: [ '8S8' ],
      heavyslam: [ '7S7' ],
      icywind: [ '4S2' ],
      ironhead: [ '4S2' ],
      knockoff: [ '4S1' ],
      payback: [ '5S3' ],
      revenge: [ '7S5', '7S6', '6S4', '5S3' ],
      rockslide: [ '4S2' ],
      stomp: [ '4S0' ],
      superpower: [ '4S0' ],
      wideguard: [ '6S4', '5S3' ],
      zenheadbutt: [
        '8S8', '7S5',
        '7S6', '7S7',
        '6S4', '5S3',
        '4S0'
      ]
    },
    eventData: [
      {
        generation: 4,
        level: 70,
        shiny: 1,
        moves: [ 'confuseray', 'stomp', 'superpower', 'zenheadbutt' ]
      },
      {
        generation: 4,
        level: 1,
        shiny: 1,
        moves: [ 'dizzypunch', 'knockoff', 'foresight', 'confuseray' ]
      },
      {
        generation: 4,
        level: 100,
        moves: [ 'ironhead', 'rockslide', 'icywind', 'crushgrip' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 68,
        shiny: 1,
        moves: [ 'revenge', 'wideguard', 'zenheadbutt', 'payback' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'foresight', 'revenge', 'wideguard', 'zenheadbutt' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'zenheadbutt', 'revenge', 'dizzypunch', 'confuseray' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'zenheadbutt', 'revenge', 'dizzypunch', 'confuseray' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'crushgrip', 'drainpunch', 'zenheadbutt', 'heavyslam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 100,
        shiny: 1,
        moves: [ 'gigaimpact', 'zenheadbutt', 'hammerarm', 'crushgrip' ]
      }
    ],
    eventOnly: true
  },
  giratina: {
    learnset: {
      ancientpower: [ '8S8', '4S1' ],
      aurasphere: [ '7S7', '6S5', '6S6', '5S4' ],
      dracometeor: [ '6S6' ],
      dragonbreath: [ '5S3', '4S2' ],
      dragonclaw: [ '8S8', '7S7', '5S4', '4S1' ],
      dragonpulse: [ '5S4' ],
      earthpower: [ '7S7', '4S0' ],
      healblock: [ '4S0' ],
      hex: [ '6S5' ],
      ironhead: [ '6S6' ],
      ominouswind: [ '4S1' ],
      scaryface: [ '8S8', '5S3', '4S2' ],
      shadowball: [ '8S8' ],
      shadowclaw: [ '6S5' ],
      shadowforce: [ '7S7', '6S5', '6S6', '5S4', '4S0', '4S1' ],
      slash: [ '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 70,
        shiny: 1,
        moves: [ 'shadowforce', 'healblock', 'earthpower', 'slash' ]
      },
      {
        generation: 4,
        level: 47,
        shiny: 1,
        moves: [ 'ominouswind', 'ancientpower', 'dragonclaw', 'shadowforce' ]
      },
      { generation: 4, level: 1, shiny: 1, moves: [ 'dragonbreath', 'scaryface' ] },
      {
        generation: 5,
        level: 5,
        isHidden: true,
        moves: [ 'dragonbreath', 'scaryface' ],
        pokeball: 'dreamball'
      },
      {
        generation: 5,
        level: 100,
        shiny: true,
        moves: [ 'dragonpulse', 'dragonclaw', 'aurasphere', 'shadowforce' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'aurasphere', 'shadowclaw', 'shadowforce', 'hex' ]
      },
      {
        generation: 6,
        level: 100,
        nature: 'Brave',
        isHidden: true,
        moves: [ 'aurasphere', 'dracometeor', 'shadowforce', 'ironhead' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'shadowforce', 'aurasphere', 'earthpower', 'dragonclaw' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'dragonclaw', 'scaryface', 'shadowball', 'ancientpower' ]
      }
    ],
    eventOnly: true
  },
  giratinaorigin: { eventOnly: true },
  cresselia: {
    learnset: {
      aurorabeam: [ '7S4', '6S3', '4S0' ],
      energyball: [ '5S2' ],
      futuresight: [ '7S4', '6S3', '5S1', '4S0' ],
      hiddenpower: [ '5S2' ],
      icebeam: [ '5S2' ],
      icywind: [ '8S5' ],
      mist: [ '6S3', '4S0' ],
      moonblast: [ '8S5' ],
      moonlight: [ '7S4', '5S1' ],
      psychocut: [ '8S5', '5S1' ],
      psyshock: [ '8S5', '5S2' ],
      slash: [ '7S4', '6S3', '5S1', '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'mist', 'aurorabeam', 'futuresight', 'slash' ]
      },
      {
        generation: 5,
        level: 68,
        shiny: 1,
        moves: [ 'futuresight', 'slash', 'moonlight', 'psychocut' ]
      },
      {
        generation: 5,
        level: 68,
        nature: 'Modest',
        moves: [ 'icebeam', 'psyshock', 'energyball', 'hiddenpower' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'mist', 'aurorabeam', 'futuresight', 'slash' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'aurorabeam', 'futuresight', 'slash', 'moonlight' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'icywind', 'moonblast', 'psychocut', 'psyshock' ]
      }
    ],
    eventOnly: true
  },
  phione: {
    learnset: { grassknot: [ '4S0' ], raindance: [ '4S0' ], rest: [ '4S0' ], surf: [ '4S0' ] },
    eventData: [
      {
        generation: 4,
        level: 50,
        moves: [ 'grassknot', 'raindance', 'rest', 'surf' ],
        pokeball: 'cherishball'
      }
    ]
  },
  manaphy: {
    learnset: {
      acidarmor: [ '4S2' ],
      aquaring: [ '7S6', '4S3' ],
      bubble: [ '6S4', '6S5', '4S0', '4S1' ],
      heartswap: [ '7S6', '6S4', '4S2', '4S3' ],
      tailglow: [ '7S6', '6S4', '6S5', '4S0', '4S1' ],
      waterpulse: [ '7S6', '4S2', '4S3' ],
      watersport: [ '6S4', '6S5', '4S0', '4S1', '4S3' ],
      whirlpool: [ '4S2' ]
    },
    eventData: [
      { generation: 4, level: 5, moves: [ 'tailglow', 'bubble', 'watersport' ] },
      {
        generation: 4,
        level: 1,
        shiny: 1,
        moves: [ 'tailglow', 'bubble', 'watersport' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'heartswap', 'waterpulse', 'whirlpool', 'acidarmor' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        nature: 'Impish',
        moves: [ 'aquaring', 'waterpulse', 'watersport', 'heartswap' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 1,
        moves: [ 'tailglow', 'bubble', 'watersport', 'heartswap' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'tailglow', 'bubble', 'watersport' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 15,
        moves: [ 'tailglow', 'waterpulse', 'aquaring', 'heartswap' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  darkrai: {
    learnset: {
      darkpulse: [ '9S8', '6S5', '4S2' ],
      darkvoid: [ '7S7', '6S5', '6S6', '5S4', '4S2' ],
      doubleteam: [ '4S2', '4S3' ],
      dreameater: [ '9S8', '6S5' ],
      feintattack: [ '7S7', '6S6', '5S4', '4S3' ],
      hypnosis: [ '9S8', '4S0', '4S1', '4S3' ],
      nightmare: [ '7S7', '6S6', '5S4', '4S0', '4S1', '4S3' ],
      ominouswind: [ '7S7', '6S6', '5S4' ],
      phantomforce: [ '6S5' ],
      pursuit: [ '4S0' ],
      quickattack: [ '4S0' ],
      roaroftime: [ '4S1' ],
      shadowball: [ '9S8', '4S2' ],
      spacialrend: [ '4S1' ]
    },
    eventData: [
      {
        generation: 4,
        level: 40,
        shiny: 1,
        moves: [ 'quickattack', 'hypnosis', 'pursuit', 'nightmare' ]
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'roaroftime', 'spacialrend', 'nightmare', 'hypnosis' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 50,
        moves: [ 'darkvoid', 'darkpulse', 'shadowball', 'doubleteam' ],
        pokeball: 'pokeball'
      },
      {
        generation: 4,
        level: 50,
        shiny: 1,
        moves: [ 'hypnosis', 'feintattack', 'nightmare', 'doubleteam' ]
      },
      {
        generation: 5,
        level: 50,
        moves: [ 'darkvoid', 'ominouswind', 'feintattack', 'nightmare' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        moves: [ 'darkvoid', 'darkpulse', 'phantomforce', 'dreameater' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'darkvoid', 'ominouswind', 'nightmare', 'feintattack' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        moves: [ 'darkvoid', 'feintattack', 'nightmare', 'ominouswind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 9,
        level: 50,
        moves: [ 'darkpulse', 'shadowball', 'hypnosis', 'dreameater' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  shaymin: {
    learnset: {
      airslash: [ '6S3' ],
      aromatherapy: [ '6S4', '4S0' ],
      celebrate: [ '7S5' ],
      energyball: [ '6S4', '4S0' ],
      growth: [ '7S5', '6S3', '4S1' ],
      leechseed: [ '5S2', '4S1' ],
      magicalleaf: [ '6S3', '4S1' ],
      return: [ '7S5' ],
      seedflare: [ '7S5', '6S3', '6S4', '5S2', '4S0' ],
      substitute: [ '6S4', '4S0' ],
      sweetscent: [ '5S2' ],
      synthesis: [ '5S2', '4S1' ]
    },
    eventData: [
      {
        generation: 4,
        level: 50,
        moves: [ 'seedflare', 'aromatherapy', 'substitute', 'energyball' ],
        pokeball: 'cherishball'
      },
      {
        generation: 4,
        level: 30,
        shiny: 1,
        moves: [ 'growth', 'magicalleaf', 'leechseed', 'synthesis' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 50,
        moves: [ 'seedflare', 'leechseed', 'synthesis', 'sweetscent' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 15,
        moves: [ 'growth', 'magicalleaf', 'seedflare', 'airslash' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'seedflare', 'aromatherapy', 'substitute', 'energyball' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 20,
        moves: [ 'return', 'growth', 'seedflare', 'celebrate' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  shayminsky: { eventOnly: true },
  arceus: {
    learnset: {
      blastburn: [ '6S2' ],
      earthpower: [ '6S2' ],
      extremespeed: [ '7S4' ],
      hydrocannon: [ '6S2' ],
      hyperbeam: [ '7S4', '6S3', '5S1' ],
      judgment: [ '7S4', '6S2', '6S3', '5S1', '4S0' ],
      perishsong: [ '6S3', '5S1' ],
      recover: [ '7S4', '6S3', '5S1' ],
      roaroftime: [ '4S0' ],
      shadowforce: [ '4S0' ],
      spacialrend: [ '4S0' ]
    },
    eventData: [
      {
        generation: 4,
        level: 100,
        moves: [ 'judgment', 'roaroftime', 'spacialrend', 'shadowforce' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 100,
        moves: [ 'recover', 'hyperbeam', 'perishsong', 'judgment' ]
      },
      {
        generation: 6,
        level: 100,
        shiny: 1,
        moves: [ 'judgment', 'blastburn', 'hydrocannon', 'earthpower' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'judgment', 'perishsong', 'hyperbeam', 'recover' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'judgment', 'extremespeed', 'recover', 'hyperbeam' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  arceusbug: { eventOnly: true },
  arceusdark: { eventOnly: true },
  arceusdragon: { eventOnly: true },
  arceuselectric: { eventOnly: true },
  arceusfairy: { eventOnly: true },
  arceusfighting: { eventOnly: true },
  arceusfire: { eventOnly: true },
  arceusflying: { eventOnly: true },
  arceusghost: { eventOnly: true },
  arceusgrass: { eventOnly: true },
  arceusground: { eventOnly: true },
  arceusice: { eventOnly: true },
  arceuspoison: { eventOnly: true },
  arceuspsychic: { eventOnly: true },
  arceusrock: { eventOnly: true },
  arceussteel: { eventOnly: true },
  arceuswater: { eventOnly: true },
  victini: {
    learnset: {
      blueflare: [ '5S2' ],
      boltstrike: [ '5S2' ],
      celebrate: [ '7S6' ],
      confusion: [ '6S3', '6S4', '5S0' ],
      endure: [ '6S4', '5S0' ],
      flamecharge: [ '8S7' ],
      fusionbolt: [ '5S1' ],
      fusionflare: [ '5S1' ],
      glaciate: [ '5S2' ],
      incinerate: [ '6S4', '5S0' ],
      quickattack: [ '6S3', '6S4', '6S5', '5S0' ],
      reversal: [ '7S6' ],
      searingshot: [ '6S3', '5S1' ],
      storedpower: [ '7S6' ],
      swagger: [ '6S5' ],
      vcreate: [ '8S7', '7S6', '6S3', '6S5', '5S1', '5S2' ],
      workup: [ '8S7' ],
      zenheadbutt: [ '8S7' ]
    },
    eventData: [
      {
        generation: 5,
        level: 15,
        moves: [ 'quickattack', 'incinerate', 'confusion', 'endure' ]
      },
      {
        generation: 5,
        level: 50,
        moves: [ 'vcreate', 'fusionflare', 'fusionbolt', 'searingshot' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 100,
        moves: [ 'vcreate', 'blueflare', 'boltstrike', 'glaciate' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 15,
        moves: [ 'confusion', 'quickattack', 'vcreate', 'searingshot' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'incinerate', 'quickattack', 'endure', 'confusion' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 15,
        moves: [ 'quickattack', 'swagger', 'vcreate' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 15,
        moves: [ 'vcreate', 'reversal', 'storedpower', 'celebrate' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 50,
        nature: 'Brave',
        perfectIVs: 6,
        moves: [ 'vcreate', 'zenheadbutt', 'workup', 'flamecharge' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  snivy: {
    learnset: {
      aromatherapy: [ '5S0' ],
      energyball: [ '5S0' ],
      growth: [ '5S0' ],
      synthesis: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 5,
        gender: 'M',
        nature: 'Hardy',
        moves: [ 'growth', 'synthesis', 'energyball', 'aromatherapy' ],
        pokeball: 'cherishball'
      }
    ]
  },
  serperior: {
    learnset: {
      gigadrain: [ '6S1', '5S0' ],
      holdback: [ '6S1' ],
      leafstorm: [ '6S1', '5S0' ],
      leechseed: [ '5S0' ],
      substitute: [ '5S0' ],
      wringout: [ '6S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 100,
        gender: 'M',
        moves: [ 'leafstorm', 'substitute', 'gigadrain', 'leechseed' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        isHidden: true,
        moves: [ 'leafstorm', 'holdback', 'wringout', 'gigadrain' ],
        pokeball: 'cherishball'
      }
    ]
  },
  emboar: {
    learnset: {
      flareblitz: [ '6S1', '5S0' ],
      hammerarm: [ '5S0' ],
      headsmash: [ '6S1', '5S0' ],
      holdback: [ '6S1' ],
      takedown: [ '6S1' ],
      wildcharge: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 100,
        gender: 'M',
        moves: [ 'flareblitz', 'hammerarm', 'wildcharge', 'headsmash' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        isHidden: true,
        moves: [ 'flareblitz', 'holdback', 'headsmash', 'takedown' ],
        pokeball: 'cherishball'
      }
    ]
  },
  samurott: {
    learnset: {
      confide: [ '6S1' ],
      holdback: [ '6S1' ],
      hydropump: [ '6S1', '5S0' ],
      icebeam: [ '5S0' ],
      megahorn: [ '5S0' ],
      razorshell: [ '6S1' ],
      superpower: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 100,
        gender: 'M',
        moves: [ 'hydropump', 'icebeam', 'megahorn', 'superpower' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        isHidden: true,
        moves: [ 'razorshell', 'holdback', 'confide', 'hydropump' ],
        pokeball: 'cherishball'
      }
    ]
  },
  herdier: { encounters: [ { generation: 5, level: 20, isHidden: true } ] },
  stoutland: { encounters: [ { generation: 5, level: 23 } ] },
  liepard: {
    learnset: { encore: [ '5S0' ], fakeout: [ '5S0' ], foulplay: [ '5S0' ], swagger: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 20,
        gender: 'F',
        nature: 'Jolly',
        isHidden: true,
        moves: [ 'fakeout', 'foulplay', 'encore', 'swagger' ]
      }
    ]
  },
  pansage: {
    learnset: {
      bite: [ '5S0' ],
      bulletseed: [ '5S0' ],
      dig: [ '5S0', '5S2' ],
      leafstorm: [ '5S1' ],
      leer: [ '5S1' ],
      lick: [ '5S1' ],
      rocktomb: [ '5S2' ],
      seedbomb: [ '5S2' ],
      solarbeam: [ '5S0', '5S2' ],
      vinewhip: [ '5S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 1,
        shiny: 1,
        gender: 'M',
        nature: 'Brave',
        ivs: { spa: 31 },
        moves: [ 'bulletseed', 'bite', 'solarbeam', 'dig' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'leer', 'lick', 'vinewhip', 'leafstorm' ]
      },
      {
        generation: 5,
        level: 30,
        gender: 'M',
        nature: 'Serious',
        moves: [ 'seedbomb', 'solarbeam', 'rocktomb', 'dig' ],
        pokeball: 'cherishball'
      }
    ]
  },
  pansear: {
    learnset: { heatwave: [ '5S0' ], incinerate: [ '5S0' ], leer: [ '5S0' ], lick: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'leer', 'lick', 'incinerate', 'heatwave' ]
      }
    ]
  },
  simisear: {
    learnset: {
      gigaimpact: [ '6S0' ],
      honeclaws: [ '6S0' ],
      poweruppunch: [ '6S0' ],
      workup: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 5,
        perfectIVs: 2,
        moves: [ 'workup', 'honeclaws', 'poweruppunch', 'gigaimpact' ],
        pokeball: 'cherishball'
      }
    ]
  },
  panpour: {
    learnset: { hydropump: [ '5S0' ], leer: [ '5S0' ], lick: [ '5S0' ], watergun: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 10,
        gender: 'M',
        isHidden: true,
        moves: [ 'leer', 'lick', 'watergun', 'hydropump' ]
      }
    ]
  },
  munna: {
    learnset: { dreameater: [ '7S0' ], hypnosis: [ '7S0' ], rest: [ '7S0' ], sleeptalk: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 39,
        nature: 'Mild',
        isHidden: true,
        moves: [ 'hypnosis', 'dreameater', 'rest', 'sleeptalk' ],
        pokeball: 'dreamball'
      }
    ]
  },
  musharna: {
    learnset: {
      defensecurl: [ '5S0' ],
      hypnosis: [ '5S0' ],
      luckychant: [ '5S0' ],
      psybeam: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 50,
        isHidden: true,
        moves: [ 'defensecurl', 'luckychant', 'psybeam', 'hypnosis' ]
      }
    ]
  },
  pidove: {
    learnset: { aircutter: [ '5S0' ], gust: [ '5S0' ], quickattack: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 1,
        shiny: 1,
        gender: 'F',
        nature: 'Hardy',
        ivs: { atk: 31 },
        abilities: [ 'superluck' ],
        moves: [ 'gust', 'quickattack', 'aircutter' ],
        pokeball: 'pokeball'
      }
    ]
  },
  unfezant: { encounters: [ { generation: 5, level: 22 } ] },
  boldore: { encounters: [ { generation: 5, level: 24 } ] },
  excadrill: { encounters: [ { generation: 6, level: 30 } ] },
  audino: {
    learnset: {
      doubleslap: [ '5S0' ],
      healpulse: [ '6S3', '5S0', '5S1', '5S2' ],
      helpinghand: [ '5S0', '5S1', '5S2' ],
      present: [ '5S1', '5S2' ],
      refresh: [ '5S0', '5S1', '5S2' ],
      simplebeam: [ '6S3' ],
      thunderbolt: [ '6S3' ],
      trickroom: [ '6S3' ]
    },
    eventData: [
      {
        generation: 5,
        level: 30,
        gender: 'F',
        nature: 'Calm',
        abilities: [ 'healer' ],
        moves: [ 'healpulse', 'helpinghand', 'refresh', 'doubleslap' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 30,
        gender: 'F',
        nature: 'Serious',
        abilities: [ 'healer' ],
        moves: [ 'healpulse', 'helpinghand', 'refresh', 'present' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 30,
        gender: 'F',
        nature: 'Jolly',
        abilities: [ 'healer' ],
        moves: [ 'healpulse', 'helpinghand', 'refresh', 'present' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        nature: 'Relaxed',
        abilities: [ 'regenerator' ],
        moves: [ 'trickroom', 'healpulse', 'simplebeam', 'thunderbolt' ],
        pokeball: 'cherishball'
      }
    ]
  },
  seismitoad: { encounters: [ { generation: 5, level: 15 } ] },
  swadloon: { encounters: [ { generation: 5, level: 19 } ] },
  leavanny: { encounters: [ { generation: 5, level: 20, isHidden: true } ] },
  whimsicott: {
    learnset: { beatup: [ '5S0' ], gigadrain: [ '5S0' ], helpinghand: [ '5S0' ], swagger: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 50,
        gender: 'F',
        nature: 'Timid',
        ivs: { spe: 31 },
        abilities: [ 'prankster' ],
        moves: [ 'swagger', 'gigadrain', 'beatup', 'helpinghand' ],
        pokeball: 'cherishball'
      }
    ]
  },
  darmanitan: {
    learnset: {
      bellydrum: [ '6S1', '5S0' ],
      flareblitz: [ '6S1', '5S0' ],
      hammerarm: [ '6S1', '5S0' ],
      thrash: [ '6S1', '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 35,
        isHidden: true,
        moves: [ 'thrash', 'bellydrum', 'flareblitz', 'hammerarm' ]
      },
      {
        generation: 6,
        level: 35,
        gender: 'M',
        nature: 'Calm',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        isHidden: true,
        moves: [ 'thrash', 'bellydrum', 'flareblitz', 'hammerarm' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 6, level: 32, maxEggMoves: 1 } ]
  },
  crustle: { encounters: [ { generation: 6, level: 33, maxEggMoves: 1 } ] },
  scraggy: {
    learnset: { headbutt: [ '5S0' ], highjumpkick: [ '5S0' ], leer: [ '5S0' ], lowkick: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 1,
        gender: 'M',
        nature: 'Adamant',
        abilities: [ 'moxie' ],
        moves: [ 'headbutt', 'leer', 'highjumpkick', 'lowkick' ],
        pokeball: 'cherishball'
      }
    ]
  },
  scrafty: {
    learnset: {
      drainpunch: [ '5S0' ],
      firepunch: [ '5S0' ],
      payback: [ '5S0' ],
      substitute: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 50,
        gender: 'M',
        nature: 'Brave',
        abilities: [ 'moxie' ],
        moves: [ 'firepunch', 'payback', 'drainpunch', 'substitute' ],
        pokeball: 'cherishball'
      }
    ]
  },
  cofagrigus: {
    learnset: {
      darkpulse: [ '7S0' ],
      powersplit: [ '7S0' ],
      shadowball: [ '7S0' ],
      willowisp: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 66,
        gender: 'M',
        moves: [ 'willowisp', 'shadowball', 'powersplit', 'darkpulse' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 6, level: 32, maxEggMoves: 1 } ]
  },
  tirtouga: {
    learnset: { aquajet: [ '5S0' ], bite: [ '5S0' ], bodyslam: [ '5S0' ], protect: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 15,
        gender: 'M',
        abilities: [ 'sturdy' ],
        moves: [ 'bite', 'protect', 'aquajet', 'bodyslam' ],
        pokeball: 'cherishball'
      }
    ]
  },
  archen: {
    learnset: {
      doubleteam: [ '5S0' ],
      headsmash: [ '5S0' ],
      scaryface: [ '5S0' ],
      wingattack: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 15,
        gender: 'M',
        moves: [ 'headsmash', 'wingattack', 'doubleteam', 'scaryface' ],
        pokeball: 'cherishball'
      }
    ]
  },
  garbodor: {
    encounters: [
      { generation: 5, level: 31 },
      { generation: 6, level: 30 },
      { generation: 7, level: 24 }
    ]
  },
  zoroark: {
    learnset: {
      agility: [ '5S0' ],
      darkpulse: [ '6S1' ],
      embargo: [ '5S0' ],
      flamethrower: [ '6S1' ],
      furyswipes: [ '6S2' ],
      nastyplot: [ '6S2' ],
      punishment: [ '6S2', '5S0' ],
      scaryface: [ '6S2' ],
      sludgebomb: [ '6S1' ],
      snarl: [ '5S0' ],
      suckerpunch: [ '6S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 50,
        gender: 'M',
        nature: 'Quirky',
        moves: [ 'agility', 'embargo', 'punishment', 'snarl' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        moves: [ 'sludgebomb', 'darkpulse', 'flamethrower', 'suckerpunch' ],
        pokeball: 'ultraball'
      },
      {
        generation: 6,
        level: 45,
        gender: 'M',
        nature: 'Naughty',
        moves: [ 'scaryface', 'furyswipes', 'nastyplot', 'punishment' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 5, level: 25 } ]
  },
  zoroarkhisui: {
    learnset: {
      bittermalice: [ '9S0' ],
      happyhour: [ '9S0' ],
      nastyplot: [ '9S0' ],
      terablast: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 50,
        perfectIVs: 3,
        moves: [ 'happyhour', 'bittermalice', 'nastyplot', 'terablast' ],
        pokeball: 'cherishball'
      }
    ]
  },
  gothorita: {
    learnset: {
      flatter: [ '5S0', '5S1' ],
      futuresight: [ '5S0', '5S1' ],
      imprison: [ '5S1' ],
      mirrorcoat: [ '5S0' ],
      psyshock: [ '5S0', '5S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 32,
        gender: 'M',
        isHidden: true,
        moves: [ 'psyshock', 'flatter', 'futuresight', 'mirrorcoat' ]
      },
      {
        generation: 5,
        level: 32,
        gender: 'M',
        isHidden: true,
        moves: [ 'psyshock', 'flatter', 'futuresight', 'imprison' ]
      }
    ],
    encounters: [ { generation: 5, level: 31 } ]
  },
  gothitelle: { encounters: [ { generation: 5, level: 34 } ] },
  duosion: { encounters: [ { generation: 5, level: 31 } ] },
  reuniclus: { encounters: [ { generation: 5, level: 34 } ] },
  swanna: { encounters: [ { generation: 6, level: 30 } ] },
  deerling: {
    learnset: {
      aromatherapy: [ '5S0' ],
      feintattack: [ '5S0' ],
      jumpkick: [ '5S0' ],
      takedown: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 30,
        gender: 'F',
        isHidden: true,
        moves: [ 'feintattack', 'takedown', 'jumpkick', 'aromatherapy' ]
      }
    ]
  },
  sawsbuck: { encounters: [ { generation: 6, level: 30 } ] },
  karrablast: {
    learnset: {
      bugbuzz: [ '5S0' ],
      falseswipe: [ '5S0' ],
      flail: [ '5S1' ],
      furyattack: [ '5S0' ],
      headbutt: [ '5S0' ],
      megahorn: [ '5S1' ],
      takedown: [ '5S1' ],
      xscissor: [ '5S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 30,
        moves: [ 'furyattack', 'headbutt', 'falseswipe', 'bugbuzz' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        moves: [ 'megahorn', 'takedown', 'xscissor', 'flail' ],
        pokeball: 'cherishball'
      }
    ]
  },
  amoonguss: {
    learnset: { clearsmog: [ '8S0' ], protect: [ '8S0' ], ragepowder: [ '8S0' ], spore: [ '8S0' ] },
    eventData: [
      {
        generation: 8,
        level: 50,
        shiny: true,
        gender: 'F',
        nature: 'Sassy',
        ivs: { hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 0 },
        isHidden: true,
        moves: [ 'clearsmog', 'spore', 'protect', 'ragepowder' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 5, level: 37 }, { generation: 5, level: 35, isHidden: true } ]
  },
  jellicent: {
    learnset: {
      brine: [ '5S0' ],
      ominouswind: [ '5S0' ],
      raindance: [ '5S0' ],
      waterpulse: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 40,
        isHidden: true,
        moves: [ 'waterpulse', 'ominouswind', 'brine', 'raindance' ]
      }
    ],
    encounters: [ { generation: 5, level: 5 } ]
  },
  galvantula: { encounters: [ { generation: 6, level: 30 } ] },
  klang: { encounters: [ { generation: 6, level: 30 } ] },
  lampent: { encounters: [ { generation: 6, level: 30 } ] },
  chandelure: {
    learnset: {
      energyball: [ '5S0' ],
      heatwave: [ '5S0' ],
      psychic: [ '5S0' ],
      shadowball: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 50,
        gender: 'F',
        nature: 'Modest',
        ivs: { spa: 31 },
        abilities: [ 'flashfire' ],
        moves: [ 'heatwave', 'shadowball', 'energyball', 'psychic' ],
        pokeball: 'cherishball'
      }
    ]
  },
  axew: {
    learnset: {
      dragonclaw: [ '5S1' ],
      dragonrage: [ '5S0', '5S1', '5S2' ],
      endure: [ '5S1' ],
      gigaimpact: [ '5S2' ],
      outrage: [ '5S2' ],
      return: [ '5S1' ],
      scratch: [ '5S0', '5S2' ]
    },
    eventData: [
      {
        generation: 5,
        level: 1,
        shiny: 1,
        gender: 'M',
        nature: 'Naive',
        ivs: { spe: 31 },
        abilities: [ 'moldbreaker' ],
        moves: [ 'scratch', 'dragonrage' ],
        pokeball: 'pokeball'
      },
      {
        generation: 5,
        level: 10,
        gender: 'F',
        abilities: [ 'moldbreaker' ],
        moves: [ 'dragonrage', 'return', 'endure', 'dragonclaw' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 30,
        gender: 'M',
        nature: 'Naive',
        abilities: [ 'rivalry' ],
        moves: [ 'dragonrage', 'scratch', 'outrage', 'gigaimpact' ],
        pokeball: 'cherishball'
      }
    ]
  },
  fraxure: { encounters: [ { generation: 6, level: 30 } ] },
  haxorus: {
    learnset: {
      dragondance: [ '5S0' ],
      dualchop: [ '5S0' ],
      earthquake: [ '5S0' ],
      xscissor: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 59,
        gender: 'F',
        nature: 'Naive',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        abilities: [ 'moldbreaker' ],
        moves: [ 'earthquake', 'dualchop', 'xscissor', 'dragondance' ],
        pokeball: 'cherishball'
      }
    ]
  },
  cubchoo: {
    learnset: { bide: [ '5S0' ], growl: [ '5S0' ], icywind: [ '5S0' ], powdersnow: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 15,
        moves: [ 'powdersnow', 'growl', 'bide', 'icywind' ],
        pokeball: 'cherishball'
      }
    ]
  },
  beartic: { encounters: [ { generation: 6, level: 30 } ] },
  shelmet: {
    learnset: {
      bodyslam: [ '5S1' ],
      bugbuzz: [ '5S1' ],
      encore: [ '5S1' ],
      gigadrain: [ '5S1' ],
      megadrain: [ '5S0' ],
      protect: [ '5S0' ],
      strugglebug: [ '5S0' ],
      yawn: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 30,
        moves: [ 'strugglebug', 'megadrain', 'yawn', 'protect' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        moves: [ 'encore', 'gigadrain', 'bodyslam', 'bugbuzz' ],
        pokeball: 'cherishball'
      }
    ]
  },
  mienshao: {
    learnset: { dualchop: [ '7S0' ], fakeout: [ '7S0' ], highjumpkick: [ '7S0' ], uturn: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 65,
        gender: 'M',
        abilities: [ 'innerfocus' ],
        moves: [ 'fakeout', 'dualchop', 'highjumpkick', 'uturn' ],
        pokeball: 'cherishball'
      }
    ]
  },
  druddigon: {
    learnset: { leer: [ '5S0' ], scratch: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 1,
        shiny: true,
        moves: [ 'leer', 'scratch' ],
        pokeball: 'pokeball'
      }
    ]
  },
  golurk: {
    learnset: {
      gyroball: [ '5S0' ],
      hammerarm: [ '5S0' ],
      hyperbeam: [ '5S0' ],
      shadowpunch: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 70,
        shiny: true,
        abilities: [ 'ironfist' ],
        moves: [ 'shadowpunch', 'hyperbeam', 'gyroball', 'hammerarm' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 6, level: 30 } ]
  },
  bisharp: { encounters: [ { generation: 7, level: 33 } ] },
  bouffalant: {
    learnset: {
      earthquake: [ '6S0' ],
      facade: [ '6S0' ],
      headcharge: [ '6S0' ],
      rockslide: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        nature: 'Adamant',
        ivs: { hp: 31, atk: 31 },
        isHidden: true,
        moves: [ 'headcharge', 'facade', 'earthquake', 'rockslide' ],
        pokeball: 'cherishball'
      }
    ]
  },
  braviary: {
    learnset: {
      aerialace: [ '5S0' ],
      honeclaws: [ '5S0' ],
      scaryface: [ '5S0' ],
      wingattack: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 25,
        gender: 'M',
        isHidden: true,
        moves: [ 'wingattack', 'honeclaws', 'scaryface', 'aerialace' ]
      }
    ],
    encounters: [ { generation: 6, level: 45 } ]
  },
  mandibuzz: {
    learnset: { feintattack: [ '5S0' ], flatter: [ '5S0' ], nastyplot: [ '5S0' ], pluck: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 25,
        gender: 'F',
        isHidden: true,
        moves: [ 'pluck', 'nastyplot', 'flatter', 'feintattack' ]
      }
    ]
  },
  deino: {
    learnset: { dragonrage: [ '5S0' ], tackle: [ '5S0' ] },
    eventData: [
      {
        generation: 5,
        level: 1,
        shiny: true,
        moves: [ 'tackle', 'dragonrage' ],
        pokeball: 'pokeball'
      }
    ]
  },
  zweilous: { encounters: [ { generation: 5, level: 49 } ] },
  hydreigon: {
    learnset: {
      crunch: [ '6S1' ],
      dragonbreath: [ '5S0' ],
      dragonrush: [ '6S1' ],
      flamethrower: [ '5S0' ],
      focusblast: [ '5S0' ],
      frustration: [ '6S1' ],
      hypervoice: [ '5S0' ],
      rockslide: [ '6S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 70,
        shiny: true,
        gender: 'M',
        moves: [ 'hypervoice', 'dragonbreath', 'flamethrower', 'focusblast' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 52,
        gender: 'M',
        perfectIVs: 2,
        moves: [ 'dragonrush', 'crunch', 'rockslide', 'frustration' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 6, level: 59 } ]
  },
  volcarona: {
    learnset: {
      bugbuzz: [ '5S1' ],
      firespin: [ '5S0' ],
      gust: [ '5S0' ],
      hyperbeam: [ '5S1' ],
      leechlife: [ '5S0' ],
      overheat: [ '5S1' ],
      quiverdance: [ '5S1' ],
      stringshot: [ '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 35,
        moves: [ 'stringshot', 'leechlife', 'gust', 'firespin' ]
      },
      {
        generation: 5,
        level: 77,
        gender: 'M',
        nature: 'Calm',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        moves: [ 'bugbuzz', 'overheat', 'hyperbeam', 'quiverdance' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 7, level: 41 } ]
  },
  cobalion: {
    learnset: {
      closecombat: [ '9S6', '8S5' ],
      helpinghand: [ '5S0', '5S1' ],
      ironhead: [ '9S6', '8S5', '7S4', '6S3', '5S0', '5S1' ],
      quickattack: [ '7S4' ],
      quickguard: [ '5S2' ],
      retaliate: [ '6S3', '5S0', '5S1' ],
      sacredsword: [
        '9S6', '8S5',
        '7S4', '6S3',
        '5S0', '5S1',
        '5S2'
      ],
      swordsdance: [ '9S6', '8S5', '7S4', '6S3', '5S2' ],
      workup: [ '5S2' ]
    },
    eventData: [
      {
        generation: 5,
        level: 42,
        shiny: 1,
        moves: [ 'helpinghand', 'retaliate', 'ironhead', 'sacredsword' ]
      },
      {
        generation: 5,
        level: 45,
        shiny: 1,
        moves: [ 'helpinghand', 'retaliate', 'ironhead', 'sacredsword' ]
      },
      {
        generation: 5,
        level: 65,
        shiny: 1,
        moves: [ 'sacredsword', 'swordsdance', 'quickguard', 'workup' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'retaliate', 'ironhead', 'sacredsword', 'swordsdance' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'sacredsword', 'swordsdance', 'quickattack', 'ironhead' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'sacredsword', 'swordsdance', 'ironhead', 'closecombat' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'closecombat', 'ironhead', 'swordsdance', 'sacredsword' ]
      }
    ],
    eventOnly: true
  },
  terrakion: {
    learnset: {
      closecombat: [ '9S6', '8S5' ],
      helpinghand: [ '5S0', '5S1' ],
      quickguard: [ '5S2' ],
      retaliate: [ '6S3', '5S0', '5S1' ],
      rockslide: [ '7S4', '6S3', '5S0', '5S1' ],
      sacredsword: [
        '9S6', '8S5',
        '7S4', '6S3',
        '5S0', '5S1',
        '5S2'
      ],
      stoneedge: [ '9S6', '8S5', '7S4' ],
      swordsdance: [ '9S6', '8S5', '7S4', '6S3', '5S2' ],
      workup: [ '5S2' ]
    },
    eventData: [
      {
        generation: 5,
        level: 42,
        shiny: 1,
        moves: [ 'helpinghand', 'retaliate', 'rockslide', 'sacredsword' ]
      },
      {
        generation: 5,
        level: 45,
        shiny: 1,
        moves: [ 'helpinghand', 'retaliate', 'rockslide', 'sacredsword' ]
      },
      {
        generation: 5,
        level: 65,
        shiny: 1,
        moves: [ 'sacredsword', 'swordsdance', 'quickguard', 'workup' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'retaliate', 'rockslide', 'sacredsword', 'swordsdance' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'sacredsword', 'swordsdance', 'rockslide', 'stoneedge' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'sacredsword', 'swordsdance', 'stoneedge', 'closecombat' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'closecombat', 'stoneedge', 'swordsdance', 'sacredsword' ]
      }
    ],
    eventOnly: true
  },
  virizion: {
    learnset: {
      closecombat: [ '9S6', '8S5' ],
      gigadrain: [ '7S4', '6S3', '5S0', '5S1' ],
      helpinghand: [ '5S0', '5S1' ],
      leafblade: [ '9S6', '8S5', '7S4' ],
      quickguard: [ '5S2' ],
      retaliate: [ '6S3', '5S0', '5S1' ],
      sacredsword: [
        '9S6', '8S5',
        '7S4', '6S3',
        '5S0', '5S1',
        '5S2'
      ],
      swordsdance: [ '9S6', '8S5', '7S4', '6S3', '5S2' ],
      workup: [ '5S2' ]
    },
    eventData: [
      {
        generation: 5,
        level: 42,
        shiny: 1,
        moves: [ 'helpinghand', 'retaliate', 'gigadrain', 'sacredsword' ]
      },
      {
        generation: 5,
        level: 45,
        shiny: 1,
        moves: [ 'helpinghand', 'retaliate', 'gigadrain', 'sacredsword' ]
      },
      {
        generation: 5,
        level: 65,
        shiny: 1,
        moves: [ 'sacredsword', 'swordsdance', 'quickguard', 'workup' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'retaliate', 'gigadrain', 'sacredsword', 'swordsdance' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'sacredsword', 'swordsdance', 'gigadrain', 'leafblade' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'sacredsword', 'swordsdance', 'leafblade', 'closecombat' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'closecombat', 'leafblade', 'swordsdance', 'sacredsword' ]
      }
    ],
    eventOnly: true
  },
  tornadus: {
    learnset: {
      agility: [ '8S7', '6S3', '5S0' ],
      aircutter: [ '5S0' ],
      airslash: [ '7S4', '7S5', '6S3', '5S2' ],
      astonish: [ '5S1' ],
      crunch: [ '7S4', '7S5', '6S3' ],
      extrasensory: [ '6S3', '5S0' ],
      grassknot: [ '7S6' ],
      gust: [ '5S1' ],
      hammerarm: [ '5S2' ],
      heatwave: [ '8S7', '7S6' ],
      hiddenpower: [ '5S2' ],
      hurricane: [ '8S7', '7S6', '5S2' ],
      icywind: [ '8S7' ],
      raindance: [ '7S4', '7S5' ],
      revenge: [ '5S0' ],
      tailwind: [ '7S4', '7S5', '7S6' ],
      uproar: [ '5S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 40,
        shiny: 1,
        moves: [ 'revenge', 'aircutter', 'extrasensory', 'agility' ]
      },
      {
        generation: 5,
        level: 5,
        isHidden: true,
        moves: [ 'uproar', 'astonish', 'gust' ],
        pokeball: 'dreamball'
      },
      {
        generation: 5,
        level: 70,
        moves: [ 'hurricane', 'hammerarm', 'airslash', 'hiddenpower' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'extrasensory', 'agility', 'airslash', 'crunch' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'airslash', 'crunch', 'tailwind', 'raindance' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'airslash', 'crunch', 'tailwind', 'raindance' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'hurricane', 'heatwave', 'grassknot', 'tailwind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'hurricane', 'agility', 'icywind', 'heatwave' ]
      }
    ],
    eventOnly: true
  },
  tornadustherian: { eventOnly: true },
  thundurus: {
    learnset: {
      agility: [ '6S3', '5S0' ],
      astonish: [ '5S1' ],
      charge: [ '7S4', '7S5' ],
      crunch: [ '7S4', '7S5', '6S3' ],
      discharge: [ '7S4', '7S5', '6S3' ],
      focusblast: [ '7S6', '5S2' ],
      grassknot: [ '7S6' ],
      hammerarm: [ '5S2' ],
      healblock: [ '6S3', '5S0' ],
      nastyplot: [ '7S4', '7S5', '7S6' ],
      raindance: [ '8S7' ],
      revenge: [ '5S0' ],
      shockwave: [ '5S0' ],
      sludgewave: [ '8S7' ],
      thunder: [ '8S7', '5S2' ],
      thunderbolt: [ '7S6' ],
      thundershock: [ '5S1' ],
      uproar: [ '5S1' ],
      weatherball: [ '8S7' ],
      wildcharge: [ '5S2' ]
    },
    eventData: [
      {
        generation: 5,
        level: 40,
        shiny: 1,
        moves: [ 'revenge', 'shockwave', 'healblock', 'agility' ]
      },
      {
        generation: 5,
        level: 5,
        isHidden: true,
        moves: [ 'uproar', 'astonish', 'thundershock' ],
        pokeball: 'dreamball'
      },
      {
        generation: 5,
        level: 70,
        moves: [ 'thunder', 'hammerarm', 'focusblast', 'wildcharge' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'healblock', 'agility', 'discharge', 'crunch' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'discharge', 'crunch', 'charge', 'nastyplot' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'discharge', 'crunch', 'charge', 'nastyplot' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'thunderbolt', 'focusblast', 'grassknot', 'nastyplot' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'thunder', 'raindance', 'weatherball', 'sludgewave' ]
      }
    ],
    eventOnly: true
  },
  thundurustherian: { eventOnly: true },
  reshiram: {
    learnset: {
      blueflare: [ '7S6', '5S2' ],
      dracometeor: [ '7S6', '5S2' ],
      dragonbreath: [ '6S3', '5S0' ],
      dragonclaw: [ '8S7' ],
      dragonpulse: [ '7S4', '7S5', '5S1' ],
      earthpower: [ '7S6' ],
      extrasensory: [ '8S7', '7S4', '7S5', '6S3', '5S0', '5S1' ],
      fireblast: [ '9S8' ],
      flamethrower: [ '9S8' ],
      fusionflare: [
        '9S8', '8S7',
        '7S4', '7S5',
        '7S6', '6S3',
        '5S0', '5S1',
        '5S2'
      ],
      hypervoice: [ '9S8' ],
      imprison: [ '5S1' ],
      mist: [ '5S2' ],
      nobleroar: [ '8S7' ],
      slash: [ '7S4', '7S5', '6S3', '5S0' ]
    },
    eventData: [
      {
        generation: 5,
        level: 50,
        moves: [ 'dragonbreath', 'slash', 'extrasensory', 'fusionflare' ]
      },
      {
        generation: 5,
        level: 70,
        moves: [ 'extrasensory', 'fusionflare', 'dragonpulse', 'imprison' ]
      },
      {
        generation: 5,
        level: 100,
        moves: [ 'blueflare', 'fusionflare', 'mist', 'dracometeor' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'dragonbreath', 'slash', 'extrasensory', 'fusionflare' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'slash', 'extrasensory', 'fusionflare', 'dragonpulse' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'slash', 'extrasensory', 'fusionflare', 'dragonpulse' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'fusionflare', 'blueflare', 'dracometeor', 'earthpower' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'nobleroar', 'extrasensory', 'fusionflare', 'dragonclaw' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'fireblast', 'hypervoice', 'fusionflare', 'flamethrower' ]
      }
    ],
    eventOnly: true
  },
  zekrom: {
    learnset: {
      boltstrike: [ '7S6', '5S2' ],
      dragonbreath: [ '6S3', '5S0' ],
      dragonclaw: [ '8S7', '7S4', '7S5', '5S1' ],
      fusionbolt: [
        '9S8', '8S7',
        '7S4', '7S5',
        '7S6', '6S3',
        '5S0', '5S1',
        '5S2'
      ],
      haze: [ '5S2' ],
      hypervoice: [ '9S8' ],
      imprison: [ '5S1' ],
      nobleroar: [ '8S7' ],
      outrage: [ '7S6', '5S2' ],
      slash: [ '8S7', '7S4', '7S5', '6S3', '5S0' ],
      stoneedge: [ '7S6' ],
      thunder: [ '9S8' ],
      thunderbolt: [ '9S8' ],
      zenheadbutt: [ '7S4', '7S5', '6S3', '5S0', '5S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 50,
        moves: [ 'dragonbreath', 'slash', 'zenheadbutt', 'fusionbolt' ]
      },
      {
        generation: 5,
        level: 70,
        moves: [ 'zenheadbutt', 'fusionbolt', 'dragonclaw', 'imprison' ]
      },
      {
        generation: 5,
        level: 100,
        moves: [ 'boltstrike', 'fusionbolt', 'haze', 'outrage' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'dragonbreath', 'slash', 'zenheadbutt', 'fusionbolt' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'slash', 'zenheadbutt', 'fusionbolt', 'dragonclaw' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'slash', 'zenheadbutt', 'fusionbolt', 'dragonclaw' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'fusionbolt', 'boltstrike', 'outrage', 'stoneedge' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'nobleroar', 'slash', 'fusionbolt', 'dragonclaw' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'thunder', 'hypervoice', 'fusionbolt', 'thunderbolt' ]
      }
    ],
    eventOnly: true
  },
  landorus: {
    learnset: {
      block: [ '5S1' ],
      bulldoze: [ '8S5' ],
      earthpower: [ '7S4', '6S2' ],
      earthquake: [ '7S4', '6S3', '5S0' ],
      extrasensory: [ '6S2' ],
      fissure: [ '5S0' ],
      focusblast: [ '8S5' ],
      knockoff: [ '6S3' ],
      mudshot: [ '5S1' ],
      rockslide: [ '8S5', '7S4', '6S2', '5S0' ],
      rocktomb: [ '6S3', '5S1' ],
      sandstorm: [ '7S4', '5S0' ],
      sandtomb: [ '8S5' ],
      swordsdance: [ '6S2' ],
      uturn: [ '6S3' ]
    },
    eventData: [
      {
        generation: 5,
        level: 70,
        shiny: 1,
        moves: [ 'rockslide', 'earthquake', 'sandstorm', 'fissure' ]
      },
      {
        generation: 5,
        level: 5,
        isHidden: true,
        moves: [ 'block', 'mudshot', 'rocktomb' ],
        pokeball: 'dreamball'
      },
      {
        generation: 6,
        level: 65,
        shiny: 1,
        moves: [ 'extrasensory', 'swordsdance', 'earthpower', 'rockslide' ]
      },
      {
        generation: 6,
        level: 50,
        nature: 'Adamant',
        ivs: { hp: 31, atk: 31, def: 31, spa: 1, spd: 31, spe: 24 },
        moves: [ 'earthquake', 'knockoff', 'uturn', 'rocktomb' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'earthpower', 'rockslide', 'earthquake', 'sandstorm' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'sandtomb', 'rockslide', 'bulldoze', 'focusblast' ]
      }
    ],
    eventOnly: true
  },
  landorustherian: { eventOnly: true },
  kyurem: {
    learnset: {
      blizzard: [ '9S6' ],
      dracometeor: [ '6S3' ],
      dragonbreath: [ '6S2' ],
      dragonpulse: [ '7S4', '5S0', '5S1' ],
      endeavor: [ '5S0' ],
      glaciate: [ '7S4', '6S2', '6S3', '5S0', '5S1' ],
      hypervoice: [ '9S6', '8S5' ],
      icebeam: [ '8S5' ],
      imprison: [ '9S6', '5S0', '5S1' ],
      ironhead: [ '6S3' ],
      scaryface: [ '9S6', '8S5', '7S4', '6S2', '6S3', '5S1' ],
      shadowball: [ '8S5' ],
      slash: [ '7S4', '6S2' ]
    },
    eventData: [
      {
        generation: 5,
        level: 75,
        shiny: 1,
        moves: [ 'glaciate', 'dragonpulse', 'imprison', 'endeavor' ]
      },
      {
        generation: 5,
        level: 70,
        shiny: 1,
        moves: [ 'scaryface', 'glaciate', 'dragonpulse', 'imprison' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'dragonbreath', 'slash', 'scaryface', 'glaciate' ]
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'glaciate', 'scaryface', 'dracometeor', 'ironhead' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'slash', 'scaryface', 'glaciate', 'dragonpulse' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'icebeam', 'hypervoice', 'shadowball', 'scaryface' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'imprison', 'blizzard', 'scaryface', 'hypervoice' ]
      }
    ],
    eventOnly: true
  },
  kyuremblack: {
    learnset: {
      blizzard: [ '9S6' ],
      dracometeor: [ '6S3' ],
      dragonbreath: [ '6S2' ],
      dragonpulse: [ '7S4', '5S0', '5S1' ],
      endeavor: [ '5S0' ],
      freezeshock: [ '7S4', '6S2', '6S3', '5S0', '5S1' ],
      fusionbolt: [ '9S6', '8S5', '7S4', '6S2', '6S3', '5S1' ],
      hypervoice: [ '9S6', '8S5' ],
      icebeam: [ '8S5' ],
      imprison: [ '9S6', '5S0', '5S1' ],
      ironhead: [ '6S3' ],
      shadowball: [ '8S5' ],
      slash: [ '7S4', '6S2' ]
    },
    eventData: [
      {
        generation: 5,
        level: 75,
        shiny: 1,
        moves: [ 'freezeshock', 'dragonpulse', 'imprison', 'endeavor' ]
      },
      {
        generation: 5,
        level: 70,
        shiny: 1,
        moves: [ 'fusionbolt', 'freezeshock', 'dragonpulse', 'imprison' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'dragonbreath', 'slash', 'fusionbolt', 'freezeshock' ]
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'freezeshock', 'fusionbolt', 'dracometeor', 'ironhead' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'slash', 'fusionbolt', 'freezeshock', 'dragonpulse' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'icebeam', 'hypervoice', 'shadowball', 'fusionbolt' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'imprison', 'blizzard', 'fusionbolt', 'hypervoice' ]
      }
    ],
    eventOnly: true
  },
  kyuremwhite: {
    learnset: {
      blizzard: [ '9S6' ],
      dracometeor: [ '6S3' ],
      dragonbreath: [ '6S2' ],
      dragonpulse: [ '7S4', '5S0', '5S1' ],
      endeavor: [ '5S0' ],
      fusionflare: [ '9S6', '8S5', '7S4', '6S2', '6S3', '5S1' ],
      hypervoice: [ '9S6', '8S5' ],
      icebeam: [ '8S5' ],
      iceburn: [ '7S4', '6S2', '6S3', '5S0', '5S1' ],
      imprison: [ '9S6', '5S0', '5S1' ],
      ironhead: [ '6S3' ],
      shadowball: [ '8S5' ],
      slash: [ '7S4', '6S2' ]
    },
    eventData: [
      {
        generation: 5,
        level: 75,
        shiny: 1,
        moves: [ 'iceburn', 'dragonpulse', 'imprison', 'endeavor' ]
      },
      {
        generation: 5,
        level: 70,
        shiny: 1,
        moves: [ 'fusionflare', 'iceburn', 'dragonpulse', 'imprison' ]
      },
      {
        generation: 6,
        level: 50,
        shiny: 1,
        moves: [ 'dragonbreath', 'slash', 'fusionflare', 'iceburn' ]
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'iceburn', 'fusionflare', 'dracometeor', 'ironhead' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'slash', 'fusionflare', 'iceburn', 'dragonpulse' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'icebeam', 'hypervoice', 'shadowball', 'fusionflare' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'imprison', 'blizzard', 'fusionflare', 'hypervoice' ]
      }
    ],
    eventOnly: true
  },
  keldeo: {
    learnset: {
      aquajet: [ '6S2', '6S3', '5S0', '5S1' ],
      bubblebeam: [ '6S3', '5S0' ],
      doublekick: [ '6S2', '6S3', '5S0' ],
      hydropump: [ '8S4', '6S2', '5S1' ],
      leer: [ '6S2', '6S3', '5S0' ],
      sacredsword: [ '8S4', '5S1' ],
      secretsword: [ '8S4' ],
      swordsdance: [ '8S4', '5S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 15,
        moves: [ 'aquajet', 'leer', 'doublekick', 'bubblebeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        moves: [ 'sacredsword', 'hydropump', 'aquajet', 'swordsdance' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 15,
        moves: [ 'aquajet', 'leer', 'doublekick', 'hydropump' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'aquajet', 'leer', 'doublekick', 'bubblebeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 65,
        moves: [ 'secretsword', 'sacredsword', 'swordsdance', 'hydropump' ]
      }
    ],
    eventOnly: true
  },
  keldeoresolute: { eventOnly: true },
  meloetta: {
    learnset: {
      celebrate: [ '7S3' ],
      closecombat: [ '7S2', '5S1' ],
      confusion: [ '5S0' ],
      hypervoice: [ '9S4' ],
      psychic: [ '9S4', '7S2', '5S1' ],
      quickattack: [ '5S0' ],
      relicsong: [ '9S4', '7S3' ],
      round: [ '7S3', '5S0', '5S1' ],
      sing: [ '9S4', '7S2', '7S3' ],
      teeterdance: [ '5S1' ]
    },
    eventData: [
      {
        generation: 5,
        level: 15,
        moves: [ 'quickattack', 'confusion', 'round' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 50,
        moves: [ 'round', 'teeterdance', 'psychic', 'closecombat' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 15,
        moves: [ 'sing', 'psychic', 'closecombat' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        moves: [ 'sing', 'celebrate', 'round', 'relicsong' ],
        pokeball: 'cherishball'
      },
      { generation: 9, level: 70, moves: [ 'relicsong', 'hypervoice', 'sing', 'psychic' ] }
    ],
    eventOnly: true
  },
  genesect: {
    learnset: {
      blazekick: [ '5S2' ],
      extremespeed: [ '5S2' ],
      fellstinger: [ '8S4' ],
      magnetbomb: [ '6S3', '5S0', '5S1' ],
      metalclaw: [ '8S4' ],
      shiftgear: [ '5S2' ],
      signalbeam: [ '6S3', '5S0', '5S1' ],
      solarbeam: [ '6S3', '5S0', '5S1' ],
      technoblast: [ '8S4', '6S3', '5S0', '5S1', '5S2' ],
      xscissor: [ '8S4' ]
    },
    eventData: [
      {
        generation: 5,
        level: 50,
        moves: [ 'technoblast', 'magnetbomb', 'solarbeam', 'signalbeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 15,
        moves: [ 'technoblast', 'magnetbomb', 'solarbeam', 'signalbeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 5,
        level: 100,
        shiny: true,
        nature: 'Hasty',
        ivs: { atk: 31, spe: 31 },
        moves: [ 'extremespeed', 'technoblast', 'blazekick', 'shiftgear' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'technoblast', 'magnetbomb', 'solarbeam', 'signalbeam' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 60,
        moves: [ 'technoblast', 'xscissor', 'metalclaw', 'fellstinger' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  genesectburn: { eventOnly: true },
  genesectchill: { eventOnly: true },
  genesectdouse: { eventOnly: true },
  genesectshock: { eventOnly: true },
  fennekin: {
    learnset: { flamethrower: [ '6S0' ], hiddenpower: [ '6S0' ], scratch: [ '6S0' ] },
    eventData: [
      {
        generation: 6,
        level: 15,
        gender: 'F',
        nature: 'Hardy',
        moves: [ 'scratch', 'flamethrower', 'hiddenpower' ],
        pokeball: 'cherishball'
      }
    ]
  },
  froakie: {
    learnset: { bubble: [ '6S0' ], growl: [ '6S0' ], pound: [ '6S0' ], return: [ '6S0' ] },
    eventData: [
      {
        generation: 6,
        level: 7,
        moves: [ 'pound', 'growl', 'bubble', 'return' ],
        pokeball: 'cherishball'
      }
    ]
  },
  greninja: {
    learnset: {
      gunkshot: [ '6S1' ],
      happyhour: [ '6S1' ],
      hydrocannon: [ '6S1' ],
      hydropump: [ '6S0' ],
      matblock: [ '6S1' ],
      shadowsneak: [ '6S0' ],
      substitute: [ '6S0' ],
      watershuriken: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 36,
        ivs: { spe: 31 },
        isHidden: true,
        moves: [ 'watershuriken', 'shadowsneak', 'hydropump', 'substitute' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 100,
        isHidden: true,
        moves: [ 'hydrocannon', 'gunkshot', 'matblock', 'happyhour' ],
        pokeball: 'cherishball'
      }
    ]
  },
  greninjabond: {
    learnset: {
      aerialace: [ '7S0' ],
      doubleteam: [ '7S0' ],
      nightslash: [ '7S0' ],
      watershuriken: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 36,
        ivs: { hp: 20, atk: 31, def: 20, spa: 31, spd: 20, spe: 31 },
        moves: [ 'watershuriken', 'aerialace', 'doubleteam', 'nightslash' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  fletchinder: { encounters: [ { generation: 7, level: 16 } ] },
  vivillonfancy: {
    learnset: {
      gust: [ '6S0' ],
      holdhands: [ '6S0' ],
      lightscreen: [ '6S0' ],
      strugglebug: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 12,
        moves: [ 'gust', 'lightscreen', 'strugglebug', 'holdhands' ],
        pokeball: 'cherishball'
      }
    ]
  },
  vivillonpokeball: {
    learnset: {
      gust: [ '6S0' ],
      lightscreen: [ '6S0' ],
      strugglebug: [ '6S0' ],
      stunspore: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 12,
        moves: [ 'stunspore', 'gust', 'lightscreen', 'strugglebug' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  pyroar: {
    learnset: { darkpulse: [ '6S0' ], fireblast: [ '6S0' ], hypervoice: [ '6S0' ] },
    eventData: [
      {
        generation: 6,
        level: 49,
        gender: 'M',
        perfectIVs: 2,
        abilities: [ 'unnerve' ],
        moves: [ 'hypervoice', 'fireblast', 'darkpulse' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 6, level: 30 } ]
  },
  gogoat: { encounters: [ { generation: 6, level: 30 } ] },
  pancham: {
    learnset: { armthrust: [ '6S0' ], darkpulse: [ '6S0' ], stoneedge: [ '6S0' ] },
    eventData: [
      {
        generation: 6,
        level: 30,
        gender: 'M',
        nature: 'Adamant',
        abilities: [ 'moldbreaker' ],
        moves: [ 'armthrust', 'stoneedge', 'darkpulse' ],
        pokeball: 'cherishball'
      }
    ]
  },
  pangoro: { encounters: [ { generation: 7, level: 24 } ] },
  aegislash: {
    learnset: {
      flashcannon: [ '6S0' ],
      kingsshield: [ '6S0' ],
      shadowball: [ '6S0' ],
      wideguard: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        gender: 'F',
        nature: 'Quiet',
        moves: [ 'wideguard', 'kingsshield', 'shadowball', 'flashcannon' ],
        pokeball: 'cherishball'
      }
    ]
  },
  aromatisse: {
    learnset: {
      disable: [ '6S0' ],
      healpulse: [ '6S0' ],
      moonblast: [ '6S0' ],
      trickroom: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        nature: 'Relaxed',
        isHidden: true,
        moves: [ 'trickroom', 'healpulse', 'disable', 'moonblast' ],
        pokeball: 'cherishball'
      }
    ]
  },
  inkay: {
    learnset: {
      foulplay: [ '6S0' ],
      happyhour: [ '6S0' ],
      hypnosis: [ '6S0' ],
      topsyturvy: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 10,
        moves: [ 'happyhour', 'foulplay', 'hypnosis', 'topsyturvy' ],
        pokeball: 'cherishball'
      }
    ]
  },
  malamar: {
    learnset: { facade: [ '6S0' ], knockoff: [ '6S0' ], rockslide: [ '6S0' ], superpower: [ '6S0' ] },
    eventData: [
      {
        generation: 6,
        level: 50,
        nature: 'Adamant',
        ivs: { hp: 31, atk: 31 },
        abilities: [ 'contrary' ],
        moves: [ 'superpower', 'knockoff', 'facade', 'rockslide' ],
        pokeball: 'cherishball'
      }
    ]
  },
  barbaracle: { encounters: [ { generation: 6, level: 30 } ] },
  dragalge: { encounters: [ { generation: 6, level: 35 } ] },
  clawitzer: { encounters: [ { generation: 6, level: 35 } ] },
  tyrunt: {
    learnset: { roar: [ '6S0' ], stomp: [ '6S0' ], tackle: [ '6S0' ], tailwhip: [ '6S0' ] },
    eventData: [
      {
        generation: 6,
        level: 10,
        isHidden: true,
        moves: [ 'tailwhip', 'tackle', 'roar', 'stomp' ],
        pokeball: 'cherishball'
      }
    ]
  },
  amaura: {
    learnset: {
      growl: [ '6S0' ],
      powdersnow: [ '6S0' ],
      rockthrow: [ '6S0' ],
      thunderwave: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 10,
        isHidden: true,
        moves: [ 'growl', 'powdersnow', 'thunderwave', 'rockthrow' ],
        pokeball: 'cherishball'
      }
    ]
  },
  sylveon: {
    learnset: {
      babydolleyes: [ '6S1' ],
      calmmind: [ '7S2' ],
      celebrate: [ '6S0' ],
      disarmingvoice: [ '6S1' ],
      drainingkiss: [ '7S2', '6S1' ],
      fairywind: [ '6S0' ],
      helpinghand: [ '6S0' ],
      hyperbeam: [ '7S2' ],
      psyshock: [ '7S2' ],
      quickattack: [ '6S1' ],
      sandattack: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 10,
        moves: [ 'celebrate', 'helpinghand', 'sandattack', 'fairywind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 10,
        gender: 'F',
        moves: [ 'disarmingvoice', 'babydolleyes', 'quickattack', 'drainingkiss' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        gender: 'F',
        isHidden: true,
        moves: [ 'hyperbeam', 'drainingkiss', 'psyshock', 'calmmind' ],
        pokeball: 'cherishball'
      }
    ]
  },
  goomy: {
    learnset: { bodyslam: [ '7S0' ], counter: [ '7S0' ], dragonpulse: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 1,
        shiny: 1,
        isHidden: true,
        moves: [ 'bodyslam', 'dragonpulse', 'counter' ],
        pokeball: 'cherishball'
      }
    ]
  },
  sliggoo: { encounters: [ { generation: 6, level: 30 } ] },
  pumpkaboosuper: {
    learnset: {
      astonish: [ '6S0' ],
      scaryface: [ '6S0' ],
      shadowsneak: [ '6S0' ],
      trickortreat: [ '6S0' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        moves: [ 'trickortreat', 'astonish', 'scaryface', 'shadowsneak' ],
        pokeball: 'cherishball'
      }
    ]
  },
  xerneas: {
    learnset: {
      aromatherapy: [ '6S1' ],
      dazzlinggleam: [ '8S5' ],
      focusblast: [ '7S4', '6S1' ],
      geomancy: [ '7S2', '7S3', '7S4', '6S0', '6S1' ],
      grassknot: [ '7S4' ],
      gravity: [ '6S0' ],
      hornleech: [ '8S5', '7S2', '7S3' ],
      ingrain: [ '8S5' ],
      megahorn: [ '6S0' ],
      moonblast: [ '8S5', '7S2', '7S3', '7S4', '6S0', '6S1' ],
      nightslash: [ '7S2', '7S3' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        moves: [ 'gravity', 'geomancy', 'moonblast', 'megahorn' ]
      },
      {
        generation: 6,
        level: 100,
        shiny: true,
        moves: [ 'geomancy', 'moonblast', 'aromatherapy', 'focusblast' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'geomancy', 'hornleech', 'nightslash', 'moonblast' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'geomancy', 'hornleech', 'nightslash', 'moonblast' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'geomancy', 'focusblast', 'grassknot', 'moonblast' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'ingrain', 'dazzlinggleam', 'moonblast', 'hornleech' ]
      }
    ],
    eventOnly: true
  },
  yveltal: {
    learnset: {
      darkpulse: [ '7S2', '7S3', '7S4', '6S0', '6S1' ],
      disable: [ '6S0' ],
      dragonrush: [ '8S5' ],
      foulplay: [ '6S1' ],
      heatwave: [ '7S4' ],
      oblivionwing: [ '8S5', '7S2', '7S3', '7S4', '6S0', '6S1' ],
      phantomforce: [ '7S2', '7S3' ],
      psychic: [ '7S2', '7S3' ],
      snarl: [ '6S0' ],
      suckerpunch: [ '8S5', '6S1' ],
      tailwind: [ '7S4' ],
      taunt: [ '8S5' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        moves: [ 'snarl', 'oblivionwing', 'disable', 'darkpulse' ]
      },
      {
        generation: 6,
        level: 100,
        shiny: true,
        moves: [ 'oblivionwing', 'suckerpunch', 'darkpulse', 'foulplay' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'oblivionwing', 'darkpulse', 'phantomforce', 'psychic' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'oblivionwing', 'darkpulse', 'phantomforce', 'psychic' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        moves: [ 'oblivionwing', 'darkpulse', 'heatwave', 'tailwind' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'taunt', 'oblivionwing', 'dragonrush', 'suckerpunch' ]
      }
    ],
    eventOnly: true
  },
  zygarde: {
    learnset: {
      bind: [ '8S9', '7S2', '7S3', '7S4' ],
      camouflage: [ '6S0' ],
      crunch: [ '6S0' ],
      dig: [ '7S2' ],
      dragonbreath: [ '7S5', '7S6' ],
      dragondance: [ '7S7', '7S8' ],
      dragonpulse: [ '8S9', '6S0' ],
      earthquake: [ '6S0' ],
      extremespeed: [ '7S7', '7S8', '6S1' ],
      glare: [ '7S5', '7S6', '6S1' ],
      haze: [ '7S3', '7S4' ],
      landswrath: [
        '8S9', '7S2',
        '7S3', '7S4',
        '7S5', '7S6',
        '6S1'
      ],
      outrage: [ '7S7', '7S8', '6S1' ],
      safeguard: [ '7S2', '7S5', '7S6' ],
      sandstorm: [ '7S3', '7S4' ],
      thousandarrows: [ '8S9', '7S7', '7S8' ]
    },
    eventData: [
      {
        generation: 6,
        level: 70,
        moves: [ 'crunch', 'earthquake', 'camouflage', 'dragonpulse' ]
      },
      {
        generation: 6,
        level: 100,
        moves: [ 'landswrath', 'extremespeed', 'glare', 'outrage' ],
        pokeball: 'cherishball'
      },
      { generation: 7, level: 30, moves: [ 'safeguard', 'dig', 'bind', 'landswrath' ] },
      { generation: 7, level: 50, moves: [ 'bind', 'landswrath', 'sandstorm', 'haze' ] },
      {
        generation: 7,
        level: 50,
        isHidden: true,
        moves: [ 'bind', 'landswrath', 'sandstorm', 'haze' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: true,
        moves: [ 'landswrath', 'glare', 'safeguard', 'dragonbreath' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: true,
        isHidden: true,
        moves: [ 'landswrath', 'glare', 'safeguard', 'dragonbreath' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        shiny: true,
        moves: [ 'thousandarrows', 'outrage', 'extremespeed', 'dragondance' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        shiny: true,
        isHidden: true,
        moves: [ 'thousandarrows', 'outrage', 'extremespeed', 'dragondance' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        isHidden: true,
        moves: [ 'thousandarrows', 'landswrath', 'dragonpulse', 'bind' ]
      }
    ],
    eventOnly: true
  },
  zygarde10: {
    learnset: {
      bind: [ '8S5', '7S0', '7S1', '7S2' ],
      dig: [ '7S0', '7S2' ],
      dragonbreath: [ '7S3' ],
      dragondance: [ '7S4' ],
      dragonpulse: [ '8S5' ],
      extremespeed: [ '7S4' ],
      glare: [ '7S3' ],
      haze: [ '7S1' ],
      landswrath: [ '8S5', '7S0', '7S1', '7S2', '7S3' ],
      outrage: [ '7S4' ],
      safeguard: [ '7S0', '7S2', '7S3' ],
      sandstorm: [ '7S1' ],
      thousandarrows: [ '8S5', '7S4' ]
    },
    eventData: [
      { generation: 7, level: 30, moves: [ 'safeguard', 'dig', 'bind', 'landswrath' ] },
      {
        generation: 7,
        level: 50,
        isHidden: true,
        moves: [ 'bind', 'landswrath', 'sandstorm', 'haze' ]
      },
      {
        generation: 7,
        level: 50,
        isHidden: true,
        moves: [ 'safeguard', 'dig', 'bind', 'landswrath' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: true,
        isHidden: true,
        moves: [ 'landswrath', 'glare', 'safeguard', 'dragonbreath' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 100,
        shiny: true,
        isHidden: true,
        moves: [ 'thousandarrows', 'outrage', 'extremespeed', 'dragondance' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        isHidden: true,
        moves: [ 'thousandarrows', 'landswrath', 'dragonpulse', 'bind' ]
      }
    ],
    eventOnly: true
  },
  diancie: {
    learnset: {
      diamondstorm: [ '6S0', '6S1' ],
      moonblast: [ '6S0', '6S1' ],
      reflect: [ '6S0', '6S1' ],
      return: [ '6S0', '6S1' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        moves: [ 'diamondstorm', 'reflect', 'return', 'moonblast' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 50,
        shiny: true,
        moves: [ 'diamondstorm', 'moonblast', 'reflect', 'return' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  hoopa: {
    learnset: {
      astonish: [ '6S0' ],
      hyperspacehole: [ '7S1', '6S0' ],
      nastyplot: [ '7S1', '6S0' ],
      psychic: [ '7S1', '6S0' ],
      shadowball: [ '7S1' ]
    },
    eventData: [
      {
        generation: 6,
        level: 50,
        moves: [ 'hyperspacehole', 'nastyplot', 'psychic', 'astonish' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 15,
        moves: [ 'shadowball', 'nastyplot', 'psychic', 'hyperspacehole' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  hoopaunbound: { eventOnly: true },
  volcanion: {
    learnset: {
      explosion: [ '6S1' ],
      flamethrower: [ '6S1' ],
      flareblitz: [ '8S2' ],
      haze: [ '8S2' ],
      hydropump: [ '6S0', '6S1' ],
      incinerate: [ '8S2' ],
      mist: [ '6S0' ],
      overheat: [ '6S0' ],
      steameruption: [ '8S2', '6S0', '6S1' ]
    },
    eventData: [
      {
        generation: 6,
        level: 70,
        moves: [ 'steameruption', 'overheat', 'hydropump', 'mist' ],
        pokeball: 'cherishball'
      },
      {
        generation: 6,
        level: 70,
        moves: [ 'steameruption', 'flamethrower', 'hydropump', 'explosion' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 60,
        moves: [ 'steameruption', 'flareblitz', 'incinerate', 'haze' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  decidueye: {
    learnset: {
      bravebird: [ '7S0' ],
      leafblade: [ '7S0' ],
      phantomforce: [ '7S0' ],
      shadowsneak: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        isHidden: true,
        moves: [ 'leafblade', 'phantomforce', 'shadowsneak', 'bravebird' ],
        pokeball: 'pokeball'
      }
    ]
  },
  incineroar: {
    learnset: {
      darkestlariat: [ '7S0' ],
      fakeout: [ '7S0' ],
      flareblitz: [ '7S0' ],
      uturn: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        isHidden: true,
        moves: [ 'fakeout', 'uturn', 'darkestlariat', 'flareblitz' ],
        pokeball: 'pokeball'
      }
    ]
  },
  primarina: {
    learnset: {
      hypervoice: [ '7S0' ],
      icywind: [ '7S0' ],
      moonblast: [ '7S0' ],
      perishsong: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        isHidden: true,
        moves: [ 'hypervoice', 'moonblast', 'icywind', 'perishsong' ],
        pokeball: 'pokeball'
      }
    ]
  },
  toucannon: { encounters: [ { generation: 7, level: 26 } ] },
  gumshoos: { encounters: [ { generation: 7, level: 17 } ] },
  gumshoostotem: {
    learnset: { bide: [ '7S0' ], bite: [ '7S0' ], odorsleuth: [ '7S0' ], sandattack: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 20,
        perfectIVs: 3,
        moves: [ 'sandattack', 'odorsleuth', 'bide', 'bite' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  vikavolttotem: {
    learnset: { acrobatics: [ '7S0' ], bugbuzz: [ '7S0' ], guillotine: [ '7S0' ], spark: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 35,
        perfectIVs: 3,
        moves: [ 'spark', 'acrobatics', 'guillotine', 'bugbuzz' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  ribombeetotem: {
    learnset: {
      aromatherapy: [ '7S0' ],
      bugbuzz: [ '7S0' ],
      dazzlinggleam: [ '7S0' ],
      quiverdance: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        perfectIVs: 3,
        moves: [ 'bugbuzz', 'dazzlinggleam', 'aromatherapy', 'quiverdance' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  rockruffdusk: {
    learnset: {
      bite: [ '7S1', '7S0' ],
      firefang: [ '7S0' ],
      happyhour: [ '7S1', '7S0' ],
      tackle: [ '7S1', '7S0' ],
      thunderfang: [ '7S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 10,
        moves: [ 'tackle', 'bite', 'firefang', 'happyhour' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 10,
        moves: [ 'tackle', 'bite', 'thunderfang', 'happyhour' ],
        pokeball: 'cherishball'
      }
    ]
  },
  lycanrocmidnight: {
    learnset: {
      firefang: [ '7S0' ],
      stoneedge: [ '7S0' ],
      suckerpunch: [ '7S0' ],
      swordsdance: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        isHidden: true,
        moves: [ 'stoneedge', 'firefang', 'suckerpunch', 'swordsdance' ],
        pokeball: 'cherishball'
      }
    ]
  },
  mareanie: {
    learnset: { stockpile: [ '7S0' ], swallow: [ '7S0' ], toxic: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 1,
        shiny: 1,
        isHidden: true,
        moves: [ 'toxic', 'stockpile', 'swallow' ],
        pokeball: 'cherishball'
      }
    ]
  },
  mudsdale: { encounters: [ { generation: 7, level: 29 } ] },
  araquanidtotem: {
    learnset: { bite: [ '7S0' ], bubblebeam: [ '7S0' ], bugbite: [ '7S0' ], spiderweb: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 25,
        perfectIVs: 3,
        moves: [ 'spiderweb', 'bugbite', 'bubblebeam', 'bite' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  lurantistotem: {
    learnset: { growth: [ '7S0' ], ingrain: [ '7S0' ], leafblade: [ '7S0' ], synthesis: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 30,
        perfectIVs: 3,
        moves: [ 'growth', 'ingrain', 'leafblade', 'synthesis' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  salazzle: {
    learnset: {
      fakeout: [ '7S0' ],
      flamethrower: [ '7S0' ],
      sludgebomb: [ '7S0' ],
      toxic: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        moves: [ 'fakeout', 'toxic', 'sludgebomb', 'flamethrower' ],
        pokeball: 'cherishball'
      }
    ],
    encounters: [ { generation: 7, level: 16 } ]
  },
  salazzletotem: {
    learnset: { doubleslap: [ '7S0' ], flameburst: [ '7S0' ], smog: [ '7S0' ], toxic: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 30,
        perfectIVs: 3,
        moves: [ 'smog', 'doubleslap', 'flameburst', 'toxic' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  bewear: {
    learnset: {
      babydolleyes: [ '7S0' ],
      bind: [ '7S0' ],
      brutalswing: [ '7S0' ],
      superpower: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        gender: 'F',
        isHidden: true,
        moves: [ 'babydolleyes', 'brutalswing', 'superpower', 'bind' ],
        pokeball: 'cherishball'
      }
    ]
  },
  steenee: {
    learnset: { doubleslap: [ '7S0' ], magicalleaf: [ '7S0' ], sweetscent: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 20,
        nature: 'Naive',
        abilities: [ 'leafguard' ],
        moves: [ 'magicalleaf', 'doubleslap', 'sweetscent' ],
        pokeball: 'cherishball'
      }
    ]
  },
  comfey: {
    learnset: {
      celebrate: [ '7S0' ],
      drainingkiss: [ '7S0' ],
      leechseed: [ '7S0' ],
      magicalleaf: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 10,
        nature: 'Jolly',
        moves: [ 'celebrate', 'leechseed', 'drainingkiss', 'magicalleaf' ],
        pokeball: 'cherishball'
      }
    ]
  },
  oranguru: {
    learnset: {
      allyswitch: [ '7S1' ],
      foulplay: [ '7S1' ],
      instruct: [ '7S0', '7S1' ],
      psychic: [ '7S0' ],
      psychicterrain: [ '7S0' ],
      trickroom: [ '7S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 1,
        shiny: 1,
        abilities: [ 'telepathy' ],
        moves: [ 'instruct', 'psychic', 'psychicterrain' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        isHidden: true,
        moves: [ 'instruct', 'foulplay', 'trickroom', 'allyswitch' ],
        pokeball: 'pokeball'
      }
    ]
  },
  passimian: {
    learnset: {
      bestow: [ '7S0' ],
      closecombat: [ '7S1' ],
      feint: [ '7S0' ],
      fling: [ '7S0' ],
      gunkshot: [ '7S1' ],
      knockoff: [ '7S1' ],
      uturn: [ '7S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 1,
        shiny: 1,
        moves: [ 'bestow', 'fling', 'feint' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        isHidden: true,
        moves: [ 'closecombat', 'uturn', 'knockoff', 'gunkshot' ],
        pokeball: 'pokeball'
      }
    ]
  },
  typenull: {
    learnset: {
      airslash: [ '7S1' ],
      crushclaw: [ '7S0' ],
      doublehit: [ '7S1' ],
      ironhead: [ '8S2', '7S1' ],
      metalsound: [ '7S1' ],
      scaryface: [ '7S0' ],
      takedown: [ '8S2', '7S0' ],
      triattack: [ '8S2' ],
      xscissor: [ '8S2', '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 40,
        shiny: 1,
        perfectIVs: 3,
        moves: [ 'crushclaw', 'scaryface', 'xscissor', 'takedown' ],
        pokeball: 'pokeball'
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        perfectIVs: 3,
        moves: [ 'metalsound', 'ironhead', 'doublehit', 'airslash' ],
        pokeball: 'pokeball'
      },
      {
        generation: 8,
        level: 50,
        shiny: 1,
        perfectIVs: 3,
        moves: [ 'triattack', 'xscissor', 'ironhead', 'takedown' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  silvally: {
    learnset: {
      multiattack: [ '7S0' ],
      partingshot: [ '7S0' ],
      punishment: [ '7S0' ],
      scaryface: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 100,
        shiny: true,
        moves: [ 'multiattack', 'partingshot', 'punishment', 'scaryface' ],
        pokeball: 'cherishball'
      }
    ]
  },
  turtonator: {
    learnset: {
      bodyslam: [ '7S0' ],
      dragontail: [ '7S1' ],
      flamethrower: [ '7S0', '7S1' ],
      shelltrap: [ '7S1' ],
      wideguard: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 1,
        shiny: 1,
        moves: [ 'flamethrower', 'bodyslam', 'wideguard' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 30,
        gender: 'M',
        nature: 'Brave',
        moves: [ 'flamethrower', 'shelltrap', 'dragontail' ],
        pokeball: 'cherishball'
      }
    ]
  },
  togedemarutotem: {
    learnset: { discharge: [ '7S0' ], magnetrise: [ '7S0' ], nuzzle: [ '7S0' ], zingzap: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 30,
        perfectIVs: 3,
        moves: [ 'nuzzle', 'magnetrise', 'discharge', 'zingzap' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  mimikyu: {
    learnset: {
      astonish: [ '7S0', '7S1' ],
      babydolleyes: [ '7S0' ],
      copycat: [ '7S0', '7S1' ],
      curse: [ '9S3' ],
      destinybond: [ '9S3', '7S2' ],
      mimic: [ '7S2' ],
      phantomforce: [ '9S3' ],
      playrough: [ '7S1' ],
      snatch: [ '7S2' ],
      splash: [ '7S0' ],
      substitute: [ '7S1' ],
      thunderbolt: [ '9S3' ],
      trick: [ '7S2' ]
    },
    eventData: [
      {
        generation: 7,
        level: 10,
        moves: [ 'copycat', 'babydolleyes', 'splash', 'astonish' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 10,
        shiny: true,
        moves: [ 'astonish', 'playrough', 'copycat', 'substitute' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 50,
        shiny: true,
        moves: [ 'mimic', 'snatch', 'trick', 'destinybond' ],
        pokeball: 'cherishball'
      },
      {
        generation: 9,
        level: 25,
        moves: [ 'thunderbolt', 'destinybond', 'phantomforce', 'curse' ],
        pokeball: 'cherishball'
      }
    ]
  },
  mimikyutotem: {
    learnset: { charm: [ '7S0' ], feintattack: [ '7S0' ], shadowclaw: [ '7S0' ], slash: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 40,
        perfectIVs: 3,
        moves: [ 'feintattack', 'charm', 'slash', 'shadowclaw' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  drampa: {
    learnset: { echoedvoice: [ '7S0' ], hurricane: [ '7S0' ], playnice: [ '7S0' ] },
    eventData: [
      {
        generation: 7,
        level: 1,
        shiny: 1,
        isHidden: true,
        moves: [ 'playnice', 'echoedvoice', 'hurricane' ],
        pokeball: 'cherishball'
      }
    ]
  },
  kommoo: { encounters: [ { generation: 7, level: 41 } ] },
  kommoototem: {
    learnset: {
      dragonclaw: [ '7S0' ],
      irondefense: [ '7S0' ],
      screech: [ '7S0' ],
      workup: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        perfectIVs: 3,
        moves: [ 'workup', 'screech', 'irondefense', 'dragonclaw' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  tapukoko: {
    learnset: {
      agility: [ '7S0', '7S1' ],
      bravebird: [ '8S3' ],
      dazzlinggleam: [ '7S2' ],
      discharge: [ '7S0', '7S1' ],
      electroball: [ '7S0', '7S1' ],
      naturesmadness: [ '7S0', '7S1', '7S2' ],
      quickattack: [ '8S3' ],
      taunt: [ '8S3' ],
      thunderbolt: [ '8S3', '7S2' ],
      voltswitch: [ '7S2' ]
    },
    eventData: [
      {
        generation: 7,
        level: 60,
        moves: [ 'naturesmadness', 'discharge', 'agility', 'electroball' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: true,
        nature: 'Timid',
        moves: [ 'naturesmadness', 'discharge', 'agility', 'electroball' ],
        pokeball: 'cherishball'
      },
      {
        generation: 7,
        level: 60,
        shiny: true,
        moves: [ 'thunderbolt', 'dazzlinggleam', 'voltswitch', 'naturesmadness' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'thunderbolt', 'quickattack', 'bravebird', 'taunt' ]
      }
    ],
    eventOnly: true
  },
  tapulele: {
    learnset: {
      charm: [ '8S2' ],
      extrasensory: [ '7S0', '7S1' ],
      flatter: [ '7S0', '7S1' ],
      magicroom: [ '8S2' ],
      moonblast: [ '7S0', '7S1' ],
      naturesmadness: [ '7S0', '7S1' ],
      playrough: [ '8S2' ],
      psychic: [ '8S2' ]
    },
    eventData: [
      {
        generation: 7,
        level: 60,
        moves: [ 'naturesmadness', 'extrasensory', 'flatter', 'moonblast' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: true,
        moves: [ 'naturesmadness', 'extrasensory', 'flatter', 'moonblast' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'psychic', 'playrough', 'magicroom', 'charm' ]
      }
    ],
    eventOnly: true
  },
  tapubulu: {
    learnset: {
      megahorn: [ '8S2', '7S0', '7S1' ],
      naturesmadness: [ '7S0', '7S1' ],
      scaryface: [ '8S2' ],
      skullbash: [ '7S0', '7S1' ],
      superpower: [ '8S2' ],
      woodhammer: [ '8S2' ],
      zenheadbutt: [ '7S0', '7S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 60,
        moves: [ 'naturesmadness', 'zenheadbutt', 'megahorn', 'skullbash' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: true,
        moves: [ 'naturesmadness', 'zenheadbutt', 'megahorn', 'skullbash' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'superpower', 'megahorn', 'woodhammer', 'scaryface' ]
      }
    ],
    eventOnly: true
  },
  tapufini: {
    learnset: {
      aquaring: [ '7S0', '7S1' ],
      brine: [ '8S2' ],
      hydropump: [ '7S0', '7S1' ],
      moonblast: [ '8S2' ],
      muddywater: [ '7S0', '7S1' ],
      naturesmadness: [ '7S0', '7S1' ],
      waterpulse: [ '8S2' ],
      whirlpool: [ '8S2' ]
    },
    eventData: [
      {
        generation: 7,
        level: 60,
        moves: [ 'naturesmadness', 'muddywater', 'aquaring', 'hydropump' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: true,
        moves: [ 'naturesmadness', 'muddywater', 'aquaring', 'hydropump' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'whirlpool', 'waterpulse', 'brine', 'moonblast' ]
      }
    ],
    eventOnly: true
  },
  cosmog: {
    learnset: { splash: [ '8S1', '7S0' ], teleport: [ '8S1' ] },
    eventData: [
      { generation: 7, level: 5, moves: [ 'splash' ] },
      { generation: 8, level: 5, moves: [ 'splash', 'teleport' ], pokeball: 'pokeball' }
    ],
    eventOnly: true
  },
  solgaleo: {
    learnset: {
      cosmicpower: [ '7S0', '7S1' ],
      crunch: [ '7S0', '7S1' ],
      firespin: [ '8S3' ],
      flareblitz: [ '9S4' ],
      irontail: [ '8S3' ],
      metalburst: [ '9S4' ],
      morningsun: [ '7S2' ],
      nobleroar: [ '8S3', '7S2' ],
      solarbeam: [ '9S4' ],
      sunsteelstrike: [ '7S0', '7S1', '7S2' ],
      wildcharge: [ '9S4' ],
      zenheadbutt: [ '8S3', '7S0', '7S1', '7S2' ]
    },
    eventData: [
      {
        generation: 7,
        level: 55,
        moves: [ 'sunsteelstrike', 'cosmicpower', 'crunch', 'zenheadbutt' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'sunsteelstrike', 'cosmicpower', 'crunch', 'zenheadbutt' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: true,
        moves: [ 'sunsteelstrike', 'zenheadbutt', 'nobleroar', 'morningsun' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'zenheadbutt', 'firespin', 'irontail', 'nobleroar' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'flareblitz', 'solarbeam', 'wildcharge', 'metalburst' ]
      }
    ]
  },
  lunala: {
    learnset: {
      cosmicpower: [ '7S0', '7S1' ],
      dreameater: [ '9S4' ],
      magiccoat: [ '8S3' ],
      moonblast: [ '9S4', '8S3', '7S2' ],
      moongeistbeam: [ '7S0', '7S1', '7S2' ],
      moonlight: [ '7S2' ],
      nightdaze: [ '7S0', '7S1' ],
      phantomforce: [ '9S4' ],
      psychic: [ '9S4' ],
      psyshock: [ '7S2' ],
      shadowball: [ '8S3', '7S0', '7S1' ],
      swift: [ '8S3' ]
    },
    eventData: [
      {
        generation: 7,
        level: 55,
        moves: [ 'moongeistbeam', 'cosmicpower', 'nightdaze', 'shadowball' ]
      },
      {
        generation: 7,
        level: 60,
        moves: [ 'moongeistbeam', 'cosmicpower', 'nightdaze', 'shadowball' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: true,
        moves: [ 'moongeistbeam', 'psyshock', 'moonblast', 'moonlight' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'shadowball', 'moonblast', 'magiccoat', 'swift' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'dreameater', 'phantomforce', 'moonblast', 'psychic' ]
      }
    ]
  },
  nihilego: {
    learnset: {
      acidspray: [ '8S2', '7S0', '7S1' ],
      brutalswing: [ '8S2' ],
      mirrorcoat: [ '7S0', '7S1' ],
      powergem: [ '7S0', '7S1' ],
      sludgewave: [ '8S2' ],
      stealthrock: [ '7S1' ],
      venomdrench: [ '7S0' ],
      wonderroom: [ '8S2' ]
    },
    eventData: [
      {
        generation: 7,
        level: 55,
        moves: [ 'powergem', 'mirrorcoat', 'acidspray', 'venomdrench' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'powergem', 'acidspray', 'stealthrock', 'mirrorcoat' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'wonderroom', 'sludgewave', 'brutalswing', 'acidspray' ]
      }
    ],
    eventOnly: true
  },
  buzzwole: {
    learnset: {
      counter: [ '7S0', '7S1' ],
      dynamicpunch: [ '8S2', '7S0', '7S1' ],
      hammerarm: [ '7S0', '7S1' ],
      leechlife: [ '8S2' ],
      lunge: [ '7S0', '7S1' ],
      poweruppunch: [ '8S2' ],
      taunt: [ '8S2' ]
    },
    eventData: [
      {
        generation: 7,
        level: 65,
        moves: [ 'counter', 'hammerarm', 'lunge', 'dynamicpunch' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'counter', 'hammerarm', 'lunge', 'dynamicpunch' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'poweruppunch', 'taunt', 'leechlife', 'dynamicpunch' ]
      }
    ],
    eventOnly: true
  },
  pheromosa: {
    learnset: {
      bugbuzz: [ '7S0', '7S1' ],
      highjumpkick: [ '8S2' ],
      lunge: [ '8S2', '7S0', '7S1' ],
      mefirst: [ '7S0', '7S1' ],
      swift: [ '8S2' ],
      throatchop: [ '8S2' ],
      triplekick: [ '7S0', '7S1' ]
    },
    eventData: [
      { generation: 7, level: 60, moves: [ 'triplekick', 'lunge', 'bugbuzz', 'mefirst' ] },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'triplekick', 'lunge', 'bugbuzz', 'mefirst' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'highjumpkick', 'swift', 'throatchop', 'lunge' ]
      }
    ],
    eventOnly: true
  },
  xurkitree: {
    learnset: {
      brutalswing: [ '8S2' ],
      discharge: [ '8S2', '7S0', '7S1' ],
      eerieimpulse: [ '8S2' ],
      electricterrain: [ '7S0', '7S1' ],
      hypnosis: [ '7S0', '7S1' ],
      powerwhip: [ '8S2', '7S0', '7S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 65,
        moves: [ 'hypnosis', 'discharge', 'electricterrain', 'powerwhip' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'hypnosis', 'discharge', 'electricterrain', 'powerwhip' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'powerwhip', 'discharge', 'eerieimpulse', 'brutalswing' ]
      }
    ],
    eventOnly: true
  },
  celesteela: {
    learnset: {
      autotomize: [ '7S0', '7S1' ],
      earthquake: [ '8S2' ],
      gyroball: [ '8S2' ],
      irondefense: [ '7S0', '7S1' ],
      leechseed: [ '8S2' ],
      seedbomb: [ '7S0', '7S1' ],
      skullbash: [ '7S0', '7S1' ],
      smackdown: [ '8S2' ]
    },
    eventData: [
      {
        generation: 7,
        level: 65,
        moves: [ 'autotomize', 'seedbomb', 'skullbash', 'irondefense' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'autotomize', 'seedbomb', 'skullbash', 'irondefense' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'leechseed', 'smackdown', 'gyroball', 'earthquake' ]
      }
    ],
    eventOnly: true
  },
  kartana: {
    learnset: {
      aircutter: [ '8S2' ],
      airslash: [ '7S0', '7S1' ],
      detect: [ '7S0', '7S1' ],
      leafblade: [ '8S2', '7S0', '7S1' ],
      swordsdance: [ '8S2' ],
      vacuumwave: [ '8S2' ],
      xscissor: [ '7S0', '7S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 60,
        moves: [ 'leafblade', 'xscissor', 'detect', 'airslash' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'leafblade', 'xscissor', 'detect', 'airslash' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'vacuumwave', 'aircutter', 'leafblade', 'swordsdance' ]
      }
    ],
    eventOnly: true
  },
  guzzlord: {
    learnset: {
      brutalswing: [ '8S2' ],
      dragonrush: [ '8S2' ],
      gastroacid: [ '7S0', '7S1' ],
      hammerarm: [ '7S1' ],
      heavyslam: [ '7S0', '7S1' ],
      megapunch: [ '8S2' ],
      stompingtantrum: [ '8S2' ],
      thrash: [ '7S0', '7S1' ],
      wringout: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 70,
        moves: [ 'thrash', 'gastroacid', 'heavyslam', 'wringout' ]
      },
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'hammerarm', 'thrash', 'gastroacid', 'heavyslam' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'dragonrush', 'stompingtantrum', 'brutalswing', 'megapunch' ]
      }
    ],
    eventOnly: true
  },
  necrozma: {
    learnset: {
      autotomize: [ '8S3' ],
      chargebeam: [ '8S3' ],
      irondefense: [ '9S4', '7S0', '7S1' ],
      lightscreen: [ '7S2' ],
      moonlight: [ '7S2' ],
      nightslash: [ '7S1' ],
      photongeyser: [ '7S1' ],
      powergem: [ '9S4', '8S3', '7S1' ],
      prismaticlaser: [ '7S0' ],
      psychocut: [ '8S3' ],
      rockblast: [ '9S4' ],
      stealthrock: [ '7S0' ],
      storedpower: [ '9S4' ],
      substitute: [ '7S2' ],
      wringout: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 75,
        moves: [ 'stealthrock', 'irondefense', 'wringout', 'prismaticlaser' ]
      },
      {
        generation: 7,
        level: 65,
        moves: [ 'photongeyser', 'irondefense', 'powergem', 'nightslash' ]
      },
      {
        generation: 7,
        level: 75,
        shiny: true,
        moves: [ 'lightscreen', 'substitute', 'moonlight' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'psychocut', 'chargebeam', 'powergem', 'autotomize' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'powergem', 'irondefense', 'rockblast', 'storedpower' ]
      }
    ],
    eventOnly: true
  },
  necrozmaduskmane: { eventOnly: true },
  necrozmadawnwings: { eventOnly: true },
  magearna: {
    learnset: {
      flashcannon: [ '7S0' ],
      fleurcannon: [ '7S0' ],
      helpinghand: [ '7S0' ],
      luckychant: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        moves: [ 'fleurcannon', 'flashcannon', 'luckychant', 'helpinghand' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  magearnaoriginal: {
    learnset: {
      defensecurl: [ '8S0' ],
      flashcannon: [ '8S0' ],
      fleurcannon: [ '8S0' ],
      rest: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 50,
        nature: 'Mild',
        ivs: { hp: 31, atk: 30, def: 30, spa: 31, spd: 31, spe: 0 },
        moves: [ 'fleurcannon', 'flashcannon', 'defensecurl', 'rest' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  marshadow: {
    learnset: {
      closecombat: [ '7S0' ],
      drainpunch: [ '8S1' ],
      forcepalm: [ '8S1', '7S0' ],
      shadowball: [ '7S0' ],
      shadowsneak: [ '8S1' ],
      spectralthief: [ '8S1', '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        moves: [ 'spectralthief', 'closecombat', 'forcepalm', 'shadowball' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 60,
        moves: [ 'spectralthief', 'drainpunch', 'forcepalm', 'shadowsneak' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  poipole: {
    learnset: {
      acid: [ '8S2' ],
      charm: [ '7S0' ],
      dragonpulse: [ '7S1' ],
      fellstinger: [ '8S2' ],
      furyattack: [ '8S2' ],
      helpinghand: [ '8S2' ],
      nastyplot: [ '7S0', '7S1' ],
      poisonjab: [ '7S0', '7S1' ],
      venomdrench: [ '7S0', '7S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 40,
        shiny: 1,
        perfectIVs: 3,
        moves: [ 'charm', 'venomdrench', 'nastyplot', 'poisonjab' ],
        pokeball: 'pokeball'
      },
      {
        generation: 7,
        level: 40,
        shiny: true,
        nature: 'Modest',
        perfectIVs: 3,
        moves: [ 'venomdrench', 'nastyplot', 'poisonjab', 'dragonpulse' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 20,
        moves: [ 'helpinghand', 'acid', 'furyattack', 'fellstinger' ],
        pokeball: 'beastball'
      }
    ],
    eventOnly: true
  },
  stakataka: {
    learnset: {
      autotomize: [ '8S1' ],
      brutalswing: [ '8S1' ],
      doubleedge: [ '8S1' ],
      irondefense: [ '7S0' ],
      ironhead: [ '7S0' ],
      rockblast: [ '7S0' ],
      rockslide: [ '8S1' ],
      wideguard: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'irondefense', 'ironhead', 'rockblast', 'wideguard' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'rockslide', 'doubleedge', 'brutalswing', 'autotomize' ]
      }
    ],
    eventOnly: true
  },
  blacephalon: {
    learnset: {
      fireblast: [ '8S1', '7S0' ],
      mindblown: [ '7S0' ],
      shadowball: [ '7S0' ],
      shadowclaw: [ '8S1' ],
      taunt: [ '8S1' ],
      trick: [ '7S0' ],
      zenheadbutt: [ '8S1' ]
    },
    eventData: [
      {
        generation: 7,
        level: 60,
        shiny: 1,
        moves: [ 'fireblast', 'shadowball', 'trick', 'mindblown' ]
      },
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'shadowclaw', 'taunt', 'fireblast', 'zenheadbutt' ]
      }
    ],
    eventOnly: true
  },
  zeraora: {
    learnset: {
      blazekick: [ '8S1' ],
      closecombat: [ '8S1', '7S0' ],
      outrage: [ '8S1' ],
      plasmafists: [ '8S1', '7S0' ],
      thunder: [ '7S0' ],
      thunderpunch: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        moves: [ 'plasmafists', 'thunderpunch', 'closecombat', 'thunder' ],
        pokeball: 'cherishball'
      },
      {
        generation: 8,
        level: 100,
        shiny: true,
        nature: 'Hasty',
        ivs: { hp: 31, atk: 31, def: 30, spa: 31, spd: 31, spe: 31 },
        moves: [ 'plasmafists', 'closecombat', 'blazekick', 'outrage' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  melmetal: {
    learnset: {
      doubleironbash: [ '8S0' ],
      dynamicpunch: [ '8S0' ],
      hyperbeam: [ '8S0' ],
      thunderpunch: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 100,
        nature: 'Brave',
        ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 0 },
        moves: [ 'doubleironbash', 'hyperbeam', 'dynamicpunch', 'thunderpunch' ],
        pokeball: 'cherishball'
      }
    ]
  },
  toxel: {
    learnset: { acid: [ '8S0' ], flail: [ '8S0' ], growl: [ '8S0' ], nuzzle: [ '8S0' ] },
    eventData: [
      {
        generation: 8,
        level: 1,
        isHidden: true,
        moves: [ 'nuzzle', 'growl', 'flail', 'acid' ],
        pokeball: 'luxuryball'
      }
    ]
  },
  toxtricity: {
    learnset: {
      boomburst: [ '8S0' ],
      overdrive: [ '8S0' ],
      risingvoltage: [ '8S0' ],
      sludgewave: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 50,
        shiny: true,
        nature: 'Rash',
        abilities: [ 'punkrock' ],
        moves: [ 'overdrive', 'sludgewave', 'boomburst', 'risingvoltage' ],
        pokeball: 'cherishball'
      }
    ]
  },
  sinisteaantique: {
    learnset: {
      aromatherapy: [ '8S0' ],
      celebrate: [ '8S0' ],
      memento: [ '8S0' ],
      metronome: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 50,
        isHidden: true,
        moves: [ 'memento', 'metronome', 'aromatherapy', 'celebrate' ],
        pokeball: 'cherishball'
      }
    ]
  },
  grimmsnarl: {
    learnset: {
      lightscreen: [ '9S0' ],
      reflect: [ '9S0' ],
      spiritbreak: [ '9S0' ],
      thunderwave: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 50,
        nature: 'Calm',
        shiny: true,
        abilities: [ 'prankster' ],
        ivs: { hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 31 },
        moves: [ 'thunderwave', 'spiritbreak', 'reflect', 'lightscreen' ],
        pokeball: 'cherishball'
      }
    ]
  },
  milcery: {
    learnset: {
      attract: [ '8S0' ],
      celebrate: [ '8S0' ],
      entrainment: [ '8S0' ],
      lastresort: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 5,
        nature: 'Hardy',
        isHidden: true,
        moves: [ 'celebrate', 'lastresort', 'entrainment', 'attract' ],
        pokeball: 'cherishball'
      }
    ]
  },
  indeedeef: {
    learnset: {
      hypervoice: [ '9S0' ],
      psychic: [ '9S0' ],
      shadowball: [ '9S0' ],
      trickroom: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 75,
        shiny: 1,
        perfectIVs: 4,
        moves: [ 'psychic', 'hypervoice', 'shadowball', 'trickroom' ]
      }
    ]
  },
  dracozolt: {
    learnset: { charge: [ '8S0' ], tackle: [ '8S0' ], thundershock: [ '8S0' ] },
    eventData: [
      {
        generation: 8,
        level: 10,
        shiny: 1,
        perfectIVs: 3,
        moves: [ 'tackle', 'thundershock', 'charge' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  arctozolt: {
    learnset: { charge: [ '8S0' ], powdersnow: [ '8S0' ], thundershock: [ '8S0' ] },
    eventData: [
      {
        generation: 8,
        level: 10,
        shiny: 1,
        perfectIVs: 3,
        moves: [ 'powdersnow', 'thundershock', 'charge' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  dracovish: {
    learnset: {
      dragonrush: [ '8S1' ],
      fishiousrend: [ '8S1' ],
      icefang: [ '8S1' ],
      protect: [ '8S0' ],
      tackle: [ '8S0' ],
      watergun: [ '8S1', '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 10,
        shiny: 1,
        perfectIVs: 3,
        moves: [ 'tackle', 'watergun', 'protect' ],
        pokeball: 'pokeball'
      },
      {
        generation: 8,
        level: 80,
        nature: 'Naive',
        abilities: [ 'strongjaw' ],
        ivs: { hp: 30, atk: 31, def: 31, spa: 30, spd: 30, spe: 31 },
        moves: [ 'fishiousrend', 'dragonrush', 'icefang', 'watergun' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  arctovish: {
    learnset: { powdersnow: [ '8S0' ], protect: [ '8S0' ], watergun: [ '8S0' ] },
    eventData: [
      {
        generation: 8,
        level: 10,
        shiny: 1,
        perfectIVs: 3,
        moves: [ 'powdersnow', 'watergun', 'protect' ],
        pokeball: 'pokeball'
      }
    ],
    eventOnly: true
  },
  dragapult: {
    learnset: {
      dragondarts: [ '9S0' ],
      phantomforce: [ '9S0' ],
      terablast: [ '9S0' ],
      uturn: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 50,
        gender: 'M',
        nature: 'Jolly',
        perfectIVs: 6,
        abilities: [ 'clearbody' ],
        moves: [ 'dragondarts', 'phantomforce', 'uturn', 'terablast' ],
        pokeball: 'cherishball'
      }
    ]
  },
  zacian: {
    learnset: {
      crunch: [ '8S0' ],
      ironhead: [ '8S0', '8S1' ],
      playrough: [ '8S1' ],
      sacredsword: [ '8S0', '8S1' ],
      swordsdance: [ '8S0', '8S1' ]
    },
    eventData: [
      {
        generation: 8,
        level: 70,
        perfectIVs: 3,
        moves: [ 'sacredsword', 'swordsdance', 'ironhead', 'crunch' ]
      },
      {
        generation: 8,
        level: 100,
        shiny: true,
        nature: 'Adamant',
        ivs: { hp: 31, atk: 31, def: 31, spa: 30, spd: 31, spe: 31 },
        moves: [ 'ironhead', 'playrough', 'swordsdance', 'sacredsword' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  zaciancrowned: { eventOnly: true },
  zamazenta: {
    learnset: {
      closecombat: [ '8S1' ],
      crunch: [ '8S0' ],
      irondefense: [ '8S0', '8S1' ],
      ironhead: [ '8S0', '8S1' ],
      slash: [ '8S0' ],
      wideguard: [ '8S1' ]
    },
    eventData: [
      {
        generation: 8,
        level: 70,
        perfectIVs: 3,
        moves: [ 'slash', 'crunch', 'ironhead', 'irondefense' ]
      },
      {
        generation: 8,
        level: 100,
        shiny: true,
        nature: 'Adamant',
        ivs: { hp: 31, atk: 31, def: 31, spa: 30, spd: 31, spe: 31 },
        moves: [ 'ironhead', 'closecombat', 'irondefense', 'wideguard' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  zamazentacrowned: { eventOnly: true },
  eternatus: {
    learnset: {
      crosspoison: [ '8S0' ],
      dragonpulse: [ '8S0' ],
      dynamaxcannon: [ '8S1', '8S0' ],
      eternabeam: [ '8S1' ],
      flamethrower: [ '8S1', '8S0' ],
      sludgebomb: [ '8S1' ]
    },
    eventData: [
      {
        generation: 8,
        level: 60,
        perfectIVs: 3,
        moves: [ 'crosspoison', 'dragonpulse', 'flamethrower', 'dynamaxcannon' ]
      },
      {
        generation: 8,
        level: 100,
        shiny: true,
        nature: 'Timid',
        perfectIVs: 6,
        moves: [ 'eternabeam', 'dynamaxcannon', 'sludgebomb', 'flamethrower' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  kubfu: {
    learnset: {
      brickbreak: [ '9S1' ],
      detect: [ '9S1' ],
      endure: [ '8S0' ],
      focusenergy: [ '8S0' ],
      headbutt: [ '9S1' ],
      leer: [ '8S0' ],
      rocksmash: [ '8S0' ],
      scaryface: [ '9S1' ]
    },
    eventData: [
      {
        generation: 8,
        level: 10,
        perfectIVs: 3,
        moves: [ 'rocksmash', 'leer', 'endure', 'focusenergy' ]
      },
      {
        generation: 9,
        level: 30,
        moves: [ 'detect', 'brickbreak', 'headbutt', 'scaryface' ]
      }
    ],
    eventOnly: true
  },
  zarude: {
    learnset: { closecombat: [ '8S0' ], powerwhip: [ '8S0' ], snarl: [ '8S0' ], swagger: [ '8S0' ] },
    eventData: [
      {
        generation: 8,
        level: 60,
        nature: 'Sassy',
        moves: [ 'closecombat', 'powerwhip', 'swagger', 'snarl' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  zarudedada: {
    learnset: {
      energyball: [ '8S0' ],
      hammerarm: [ '8S0' ],
      junglehealing: [ '8S0' ],
      powerwhip: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 70,
        nature: 'Adamant',
        moves: [ 'junglehealing', 'hammerarm', 'powerwhip', 'energyball' ],
        pokeball: 'cherishball'
      }
    ],
    eventOnly: true
  },
  regieleki: {
    learnset: { lockon: [ '8S0' ], thrash: [ '8S0' ], thundercage: [ '8S0' ], zapcannon: [ '8S0' ] },
    eventData: [
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'thundercage', 'thrash', 'lockon', 'zapcannon' ]
      }
    ],
    eventOnly: true
  },
  regidrago: {
    learnset: {
      dragonclaw: [ '8S0' ],
      dragonenergy: [ '8S0' ],
      hammerarm: [ '8S0' ],
      laserfocus: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 70,
        shiny: 1,
        moves: [ 'dragonenergy', 'dragonclaw', 'hammerarm', 'laserfocus' ]
      }
    ],
    eventOnly: true
  },
  glastrier: {
    learnset: {
      doubleedge: [ '9S1', '8S0' ],
      iciclecrash: [ '8S0' ],
      irondefense: [ '9S1' ],
      swordsdance: [ '8S0' ],
      taunt: [ '9S1', '8S0' ],
      thrash: [ '9S1' ]
    },
    eventData: [
      {
        generation: 8,
        level: 75,
        moves: [ 'taunt', 'doubleedge', 'swordsdance', 'iciclecrash' ]
      },
      {
        generation: 9,
        level: 70,
        moves: [ 'doubleedge', 'taunt', 'thrash', 'irondefense' ]
      }
    ],
    eventOnly: true
  },
  spectrier: {
    learnset: {
      agility: [ '9S1' ],
      disable: [ '9S1', '8S0' ],
      doubleedge: [ '9S1', '8S0' ],
      nastyplot: [ '8S0' ],
      thrash: [ '9S1', '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 75,
        moves: [ 'thrash', 'doubleedge', 'disable', 'nastyplot' ]
      },
      { generation: 9, level: 70, moves: [ 'doubleedge', 'disable', 'thrash', 'agility' ] }
    ],
    eventOnly: true
  },
  calyrex: {
    learnset: { gigadrain: [ '8S0' ], psychic: [ '8S0' ] },
    eventData: [ { generation: 8, level: 80, moves: [ 'psychic', 'gigadrain' ] } ],
    eventOnly: true
  },
  calyrexice: {
    learnset: {
      gigadrain: [ '8S0' ],
      glaciallance: [ '8S0' ],
      irondefense: [ '8S0' ],
      psychic: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 80,
        moves: [ 'glaciallance', 'psychic', 'irondefense', 'gigadrain' ]
      }
    ],
    eventOnly: true
  },
  calyrexshadow: {
    learnset: {
      agility: [ '8S0' ],
      astralbarrage: [ '8S0' ],
      gigadrain: [ '8S0' ],
      psychic: [ '8S0' ]
    },
    eventData: [
      {
        generation: 8,
        level: 80,
        moves: [ 'astralbarrage', 'psychic', 'agility', 'gigadrain' ]
      }
    ],
    eventOnly: true
  },
  lechonk: {
    learnset: { covet: [ '9S0' ], dig: [ '9S0' ], mudshot: [ '9S0' ], terablast: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 15,
        gender: 'M',
        isHidden: true,
        moves: [ 'terablast', 'mudshot', 'covet', 'dig' ],
        pokeball: 'cherishball'
      }
    ]
  },
  palafin: {
    learnset: { haze: [ '9S0' ], jetpunch: [ '9S0' ], protect: [ '9S0' ], wavecrash: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 50,
        gender: 'F',
        nature: 'Adamant',
        ivs: { hp: 31, atk: 31, def: 31, spa: 17, spd: 31, spe: 31 },
        moves: [ 'jetpunch', 'wavecrash', 'haze', 'protect' ],
        pokeball: 'cherishball'
      }
    ]
  },
  revavroom: {
    learnset: { ironhead: [ '9S0' ], poisonjab: [ '9S0' ], swagger: [ '9S0' ], terablast: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 50,
        gender: 'F',
        nature: 'Naughty',
        abilities: [ 'clearbody' ],
        ivs: { hp: 20, atk: 31, def: 20, spa: 20, spd: 20, spe: 20 },
        moves: [ 'ironhead', 'swagger', 'poisonjab', 'terablast' ],
        pokeball: 'healball'
      }
    ]
  },
  orthworm: {
    learnset: { headbutt: [ '9S0' ], irontail: [ '9S0' ], sandstorm: [ '9S0' ], wrap: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 29,
        gender: 'M',
        nature: 'Quirky',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        moves: [ 'irontail', 'headbutt', 'wrap', 'sandstorm' ]
      }
    ]
  },
  cetitan: {
    learnset: {
      amnesia: [ '9S0' ],
      bodyslam: [ '9S0' ],
      doubleedge: [ '9S0' ],
      icespinner: [ '9S0' ]
    },
    eventData: [ { generation: 9, moves: [ 'bodyslam', 'amnesia', 'icespinner', 'doubleedge' ] } ]
  },
  baxcalibur: {
    learnset: {
      glaiverush: [ '9S0' ],
      iceshard: [ '9S0' ],
      iciclespear: [ '9S0' ],
      scaleshot: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 54,
        moves: [ 'glaiverush', 'scaleshot', 'iciclespear', 'iceshard' ],
        pokeball: 'cherishball'
      }
    ]
  },
  tatsugiri: {
    learnset: { dragonpulse: [ '9S0' ], icywind: [ '9S0' ], muddywater: [ '9S0' ], taunt: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 57,
        gender: 'M',
        nature: 'Quiet',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        moves: [ 'muddywater', 'icywind', 'taunt', 'dragonpulse' ]
      }
    ]
  },
  tatsugiristretchy: {
    learnset: {
      celebrate: [ '9S0' ],
      dracometeor: [ '9S0' ],
      helpinghand: [ '9S0' ],
      muddywater: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 50,
        moves: [ 'dracometeor', 'muddywater', 'helpinghand', 'celebrate' ],
        pokeball: 'cherishball'
      }
    ]
  },
  pawmi: {
    learnset: {
      celebrate: [ '9S0' ],
      growl: [ '9S0' ],
      terablast: [ '9S0' ],
      thundershock: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 5,
        moves: [ 'thundershock', 'growl', 'terablast', 'celebrate' ],
        pokeball: 'cherishball'
      }
    ]
  },
  bombirdier: {
    learnset: { pluck: [ '9S0' ], rockthrow: [ '9S0' ], torment: [ '9S0' ], wingattack: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 20,
        gender: 'F',
        nature: 'Jolly',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        isHidden: true,
        moves: [ 'rockthrow', 'wingattack', 'pluck', 'torment' ]
      }
    ]
  },
  klawf: {
    learnset: { block: [ '9S0' ], rocksmash: [ '9S0' ], rocktomb: [ '9S0' ], visegrip: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 16,
        gender: 'F',
        nature: 'Gentle',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        abilities: [ 'angershell' ],
        moves: [ 'visegrip', 'rocksmash', 'block', 'rocktomb' ]
      }
    ]
  },
  garganacl: {
    learnset: { protect: [ '9S0' ], recover: [ '9S0' ], saltcure: [ '9S0' ], wideguard: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 50,
        gender: 'M',
        nature: 'Careful',
        ivs: { hp: 31, atk: 31, def: 31, spa: 22, spd: 31, spe: 31 },
        moves: [ 'saltcure', 'recover', 'wideguard', 'protect' ],
        pokeball: 'cherishball'
      }
    ]
  },
  fidough: {
    learnset: { charm: [ '9S0' ], lick: [ '9S0' ], playrough: [ '9S0' ], tailwhip: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 5,
        moves: [ 'playrough', 'charm', 'lick', 'tailwhip' ],
        pokeball: 'cherishball'
      }
    ]
  },
  gimmighoul: {
    learnset: {
      astonish: [ '9S2', '9S0' ],
      hex: [ '9S1' ],
      powergem: [ '9S1' ],
      shadowball: [ '9S1' ],
      tackle: [ '9S2', '9S0' ],
      takedown: [ '9S1' ]
    },
    eventData: [
      { generation: 9, level: 5, moves: [ 'astonish', 'tackle' ] },
      {
        generation: 9,
        level: 75,
        shiny: 1,
        perfectIVs: 4,
        moves: [ 'takedown', 'shadowball', 'hex', 'powergem' ]
      },
      {
        generation: 9,
        level: 5,
        nature: 'Timid',
        ivs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 31 },
        moves: [ 'astonish', 'tackle' ]
      }
    ],
    eventOnly: true
  },
  greattusk: {
    learnset: {
      brickbreak: [ '9S0' ],
      earthquake: [ '9S1' ],
      gigaimpact: [ '9S1' ],
      knockoff: [ '9S0', '9S1' ],
      rapidspin: [ '9S0' ],
      stompingtantrum: [ '9S0', '9S1' ]
    },
    eventData: [
      {
        generation: 9,
        level: 45,
        nature: 'Naughty',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        moves: [ 'rapidspin', 'brickbreak', 'knockoff', 'stompingtantrum' ]
      },
      {
        generation: 9,
        level: 57,
        shiny: 1,
        moves: [ 'stompingtantrum', 'knockoff', 'earthquake', 'gigaimpact' ]
      }
    ],
    eventOnly: true
  },
  brutebonnet: {
    learnset: { clearsmog: [ '9S0' ], gigadrain: [ '9S0' ], payback: [ '9S0' ], thrash: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 52,
        shiny: 1,
        moves: [ 'thrash', 'gigadrain', 'clearsmog', 'payback' ]
      }
    ],
    eventOnly: true
  },
  sandyshocks: {
    learnset: {
      heavyslam: [ '9S0' ],
      metalsound: [ '9S0' ],
      screech: [ '9S0' ],
      triattack: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 52,
        shiny: 1,
        moves: [ 'screech', 'heavyslam', 'metalsound', 'triattack' ]
      }
    ],
    eventOnly: true
  },
  screamtail: {
    learnset: { bodyslam: [ '9S0' ], hypervoice: [ '9S0' ], playrough: [ '9S0' ], rest: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 52,
        shiny: 1,
        moves: [ 'playrough', 'hypervoice', 'bodyslam', 'rest' ]
      }
    ],
    eventOnly: true
  },
  fluttermane: {
    learnset: {
      dazzlinggleam: [ '9S0' ],
      mysticalfire: [ '9S0' ],
      shadowball: [ '9S0' ],
      wish: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 52,
        shiny: 1,
        moves: [ 'shadowball', 'mysticalfire', 'wish', 'dazzlinggleam' ]
      }
    ],
    eventOnly: true
  },
  slitherwing: {
    learnset: { lowsweep: [ '9S0' ], lunge: [ '9S0' ], morningsun: [ '9S0' ], superpower: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 52,
        shiny: 1,
        moves: [ 'morningsun', 'lunge', 'superpower', 'lowsweep' ]
      }
    ],
    eventOnly: true
  },
  roaringmoon: {
    learnset: {
      dragonclaw: [ '9S0' ],
      dragondance: [ '9S1' ],
      dragonrush: [ '9S1' ],
      flamethrower: [ '9S0' ],
      fly: [ '9S1' ],
      nightslash: [ '9S1', '9S0' ],
      zenheadbutt: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 52,
        shiny: 1,
        moves: [ 'zenheadbutt', 'flamethrower', 'nightslash', 'dragonclaw' ]
      },
      {
        generation: 9,
        level: 75,
        perfectIVs: 3,
        moves: [ 'nightslash', 'dragondance', 'dragonrush', 'fly' ],
        pokeball: 'friendball'
      }
    ],
    eventOnly: true
  },
  irontreads: {
    learnset: {
      earthquake: [ '9S1' ],
      heavyslam: [ '9S1' ],
      ironhead: [ '9S0' ],
      knockoff: [ '9S0', '9S1' ],
      rapidspin: [ '9S0' ],
      stompingtantrum: [ '9S0', '9S1' ]
    },
    eventData: [
      {
        generation: 9,
        level: 45,
        nature: 'Naughty',
        ivs: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 },
        moves: [ 'rapidspin', 'ironhead', 'knockoff', 'stompingtantrum' ]
      },
      {
        generation: 9,
        level: 57,
        shiny: 1,
        moves: [ 'knockoff', 'earthquake', 'heavyslam', 'stompingtantrum' ]
      }
    ]
  },
  ironmoth: {
    learnset: { discharge: [ '9S0' ], lunge: [ '9S0' ], screech: [ '9S0' ], sludgewave: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 52,
        shiny: 1,
        moves: [ 'screech', 'discharge', 'sludgewave', 'lunge' ]
      }
    ],
    eventOnly: true
  },
  ironhands: {
    learnset: { charge: [ '9S0' ], forcepalm: [ '9S0' ], seismictoss: [ '9S0' ], slam: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 52,
        shiny: 1,
        moves: [ 'forcepalm', 'seismictoss', 'charge', 'slam' ]
      }
    ],
    eventOnly: true
  },
  ironjugulis: {
    learnset: { crunch: [ '9S0' ], dragonbreath: [ '9S0' ], hypervoice: [ '9S0' ], snarl: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 52,
        shiny: 1,
        moves: [ 'snarl', 'crunch', 'hypervoice', 'dragonbreath' ]
      }
    ],
    eventOnly: true
  },
  ironthorns: {
    learnset: { bite: [ '9S0' ], charge: [ '9S0' ], rockslide: [ '9S0' ], sandstorm: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 52,
        shiny: 1,
        moves: [ 'charge', 'rockslide', 'sandstorm', 'bite' ]
      }
    ],
    eventOnly: true
  },
  ironbundle: {
    learnset: {
      drillpeck: [ '9S0' ],
      flipturn: [ '9S0' ],
      freezedry: [ '9S0' ],
      helpinghand: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 52,
        shiny: 1,
        moves: [ 'drillpeck', 'helpinghand', 'freezedry', 'flipturn' ]
      }
    ],
    eventOnly: true
  },
  ironvaliant: {
    learnset: {
      closecombat: [ '9S1' ],
      dazzlinggleam: [ '9S0' ],
      knockoff: [ '9S1' ],
      leafblade: [ '9S1', '9S0' ],
      moonblast: [ '9S1' ],
      nightslash: [ '9S0' ],
      psychocut: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 52,
        shiny: 1,
        moves: [ 'psychocut', 'nightslash', 'leafblade', 'dazzlinggleam' ]
      },
      {
        generation: 9,
        level: 75,
        perfectIVs: 3,
        moves: [ 'leafblade', 'moonblast', 'closecombat', 'knockoff' ],
        pokeball: 'friendball'
      }
    ],
    eventOnly: true
  },
  tinglu: {
    learnset: {
      rockslide: [ '9S0' ],
      ruination: [ '9S0' ],
      stompingtantrum: [ '9S0' ],
      throatchop: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 60,
        moves: [ 'stompingtantrum', 'ruination', 'throatchop', 'rockslide' ]
      }
    ],
    eventOnly: true
  },
  chienpao: {
    learnset: {
      iciclecrash: [ '9S0' ],
      ruination: [ '9S0' ],
      sacredsword: [ '9S0' ],
      suckerpunch: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 60,
        moves: [ 'iciclecrash', 'ruination', 'suckerpunch', 'sacredsword' ]
      }
    ],
    eventOnly: true
  },
  wochien: {
    learnset: {
      foulplay: [ '9S0' ],
      gigadrain: [ '9S0' ],
      powerwhip: [ '9S0' ],
      ruination: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 60,
        moves: [ 'gigadrain', 'ruination', 'foulplay', 'powerwhip' ]
      }
    ],
    eventOnly: true
  },
  chiyu: {
    learnset: { bounce: [ '9S0' ], lavaplume: [ '9S0' ], ruination: [ '9S0' ], swagger: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 60,
        moves: [ 'lavaplume', 'ruination', 'bounce', 'swagger' ]
      }
    ],
    eventOnly: true
  },
  koraidon: {
    learnset: {
      bulkup: [ '9S1' ],
      collisioncourse: [ '9S0', '9S1' ],
      endure: [ '9S0' ],
      flamethrower: [ '9S0', '9S1' ],
      gigaimpact: [ '9S1' ],
      terablast: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 68,
        nature: 'Quirky',
        ivs: { hp: 31, atk: 31, def: 28, spa: 31, spd: 28, spe: 31 },
        moves: [ 'flamethrower', 'collisioncourse', 'endure', 'terablast' ],
        pokeball: 'pokeball'
      },
      {
        generation: 9,
        level: 72,
        nature: 'Adamant',
        ivs: { hp: 25, atk: 31, def: 25, spa: 31, spd: 25, spe: 31 },
        moves: [ 'gigaimpact', 'bulkup', 'collisioncourse', 'flamethrower' ]
      }
    ],
    eventOnly: true
  },
  miraidon: {
    learnset: {
      charge: [ '9S1' ],
      electrodrift: [ '9S0', '9S1' ],
      endure: [ '9S0' ],
      hyperbeam: [ '9S1' ],
      powergem: [ '9S0', '9S1' ],
      terablast: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 68,
        nature: 'Quirky',
        ivs: { hp: 31, atk: 31, def: 28, spa: 31, spd: 28, spe: 31 },
        moves: [ 'powergem', 'electrodrift', 'endure', 'terablast' ],
        pokeball: 'pokeball'
      },
      {
        generation: 9,
        level: 72,
        nature: 'Modest',
        ivs: { hp: 25, atk: 31, def: 25, spa: 31, spd: 25, spe: 31 },
        moves: [ 'hyperbeam', 'charge', 'electrodrift', 'powergem' ]
      }
    ],
    eventOnly: true
  },
  charcadet: {
    learnset: { astonish: [ '9S0' ], celebrate: [ '9S0' ], ember: [ '9S0' ], terablast: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 5,
        moves: [ 'ember', 'astonish', 'terablast', 'celebrate' ],
        pokeball: 'cherishball'
      }
    ]
  },
  walkingwake: {
    learnset: {
      dragonpulse: [ '9S0' ],
      flamethrower: [ '9S0' ],
      hydrosteam: [ '9S0' ],
      nobleroar: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 75,
        perfectIVs: 3,
        moves: [ 'hydrosteam', 'dragonpulse', 'nobleroar', 'flamethrower' ]
      }
    ],
    eventOnly: true
  },
  ironleaves: {
    learnset: {
      leafblade: [ '9S0' ],
      megahorn: [ '9S0' ],
      psyblade: [ '9S0' ],
      swordsdance: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 75,
        perfectIVs: 3,
        moves: [ 'psyblade', 'leafblade', 'megahorn', 'swordsdance' ]
      }
    ],
    eventOnly: true
  },
  okidogi: {
    learnset: {
      brutalswing: [ '9S0' ],
      crunch: [ '9S0' ],
      poisonjab: [ '9S0' ],
      superpower: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 70,
        moves: [ 'superpower', 'crunch', 'brutalswing', 'poisonjab' ]
      }
    ],
    eventOnly: true
  },
  munkidori: {
    learnset: {
      futuresight: [ '9S0' ],
      nastyplot: [ '9S0' ],
      psychic: [ '9S0' ],
      sludgewave: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 70,
        moves: [ 'futuresight', 'nastyplot', 'sludgewave', 'psychic' ]
      }
    ],
    eventOnly: true
  },
  fezandipiti: {
    learnset: { beatup: [ '9S0' ], flatter: [ '9S0' ], roost: [ '9S0' ], swagger: [ '9S0' ] },
    eventData: [ { generation: 9, level: 70, moves: [ 'roost', 'flatter', 'swagger', 'beatup' ] } ],
    eventOnly: true
  },
  ogerpon: {
    learnset: {
      grassyterrain: [ '9S1' ],
      growth: [ '9S0' ],
      ivycudgel: [ '9S1', '9S0' ],
      lowkick: [ '9S1' ],
      slam: [ '9S1', '9S0' ],
      vinewhip: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 20,
        nature: 'Lonely',
        ivs: { hp: 31, atk: 31, def: 20, spa: 20, spd: 20, spe: 31 },
        moves: [ 'ivycudgel', 'slam', 'growth', 'vinewhip' ]
      },
      {
        generation: 9,
        level: 70,
        nature: 'Lonely',
        ivs: { hp: 31, atk: 31, def: 20, spa: 20, spd: 20, spe: 31 },
        moves: [ 'ivycudgel', 'lowkick', 'slam', 'grassyterrain' ]
      }
    ],
    eventOnly: true
  },
  ogerponhearthflame: { eventOnly: true },
  ogerponwellspring: { eventOnly: true },
  ogerponcornerstone: { eventOnly: true },
  gougingfire: {
    learnset: {
      burningbulwark: [ '9S0' ],
      dragonrush: [ '9S0' ],
      fireblast: [ '9S0' ],
      lavaplume: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 75,
        ivs: { hp: 20, atk: 20, def: 20, spa: 20, spd: 20, spe: 20 },
        moves: [ 'lavaplume', 'fireblast', 'dragonrush', 'burningbulwark' ]
      }
    ],
    eventOnly: true
  },
  ragingbolt: {
    learnset: {
      dragonhammer: [ '9S0' ],
      dragonpulse: [ '9S0' ],
      risingvoltage: [ '9S0' ],
      thunderclap: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 75,
        ivs: { hp: 20, atk: 20, def: 20, spa: 20, spd: 20, spe: 20 },
        moves: [ 'dragonpulse', 'risingvoltage', 'dragonhammer', 'thunderclap' ]
      }
    ],
    eventOnly: true
  },
  ironboulder: {
    learnset: {
      megahorn: [ '9S0' ],
      mightycleave: [ '9S0' ],
      sacredsword: [ '9S0' ],
      swordsdance: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 75,
        ivs: { hp: 20, atk: 20, def: 20, spa: 20, spd: 20, spe: 20 },
        moves: [ 'megahorn', 'swordsdance', 'mightycleave', 'sacredsword' ]
      }
    ],
    eventOnly: true
  },
  ironcrown: {
    learnset: {
      futuresight: [ '9S0' ],
      sacredsword: [ '9S0' ],
      tachyoncutter: [ '9S0' ],
      voltswitch: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 75,
        ivs: { hp: 20, atk: 20, def: 20, spa: 20, spd: 20, spe: 20 },
        moves: [ 'voltswitch', 'futuresight', 'tachyoncutter', 'sacredsword' ]
      }
    ],
    eventOnly: true
  },
  terapagos: {
    learnset: {
      earthpower: [ '9S0' ],
      terastarstorm: [ '9S0' ],
      waterpulse: [ '9S0' ],
      zenheadbutt: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 85,
        gender: 'M',
        nature: 'Hardy',
        ivs: { hp: 31, atk: 15, def: 31, spa: 31, spd: 31, spe: 31 },
        moves: [ 'terastarstorm', 'zenheadbutt', 'earthpower', 'waterpulse' ]
      }
    ],
    eventOnly: true
  },
  pecharunt: {
    learnset: {
      malignantchain: [ '9S0' ],
      nastyplot: [ '9S0' ],
      shadowball: [ '9S0' ],
      toxic: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 88,
        nature: 'Timid',
        moves: [ 'nastyplot', 'toxic', 'malignantchain', 'shadowball' ]
      }
    ],
    eventOnly: true
  },
  krilowatt: {
    learnset: { heartswap: [ '9S0' ], icebeam: [ '9S0' ], surf: [ '9S0' ], thunderbolt: [ '9S0' ] },
    eventData: [
      {
        generation: 9,
        level: 50,
        moves: [ 'surf', 'thunderbolt', 'icebeam', 'heartswap' ],
        pokeball: 'pokeball'
      }
    ]
  },
  kerfluffle: {
    learnset: { celebrate: [ '6S0' ], fly: [ '6S0' ], holdhands: [ '6S0' ], metronome: [ '6S0' ] },
    eventData: [
      {
        generation: 6,
        level: 16,
        abilities: [ 'naturalcure' ],
        moves: [ 'celebrate', 'holdhands', 'fly', 'metronome' ],
        pokeball: 'cherishball'
      }
    ]
  },
  caribolt: {
    learnset: {
      celebrate: [ '7S0' ],
      hornleech: [ '7S0' ],
      metronome: [ '7S0' ],
      wildcharge: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        moves: [ 'celebrate', 'hornleech', 'wildcharge', 'metronome' ],
        pokeball: 'cherishball'
      }
    ]
  },
  smokomodo: {
    learnset: {
      camouflage: [ '7S0' ],
      celebrate: [ '7S0' ],
      eruption: [ '7S0' ],
      magnitude: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        moves: [ 'celebrate', 'eruption', 'magnitude', 'camouflage' ],
        pokeball: 'cherishball'
      }
    ]
  },
  snaelstrom: {
    learnset: {
      celebrate: [ '7S0' ],
      leechlife: [ '7S0' ],
      liquidation: [ '7S0' ],
      metronome: [ '7S0' ]
    },
    eventData: [
      {
        generation: 7,
        level: 50,
        moves: [ 'celebrate', 'liquidation', 'leechlife', 'metronome' ],
        pokeball: 'cherishball'
      }
    ]
  },
  equilibra: {
    learnset: {
      doomdesire: [ '9S0' ],
      earthpower: [ '9S0' ],
      flashcannon: [ '9S0' ],
      rapidspin: [ '9S0' ]
    },
    eventData: [
      {
        generation: 9,
        level: 50,
        moves: [ 'doomdesire', 'flashcannon', 'earthpower', 'rapidspin' ],
        pokeball: 'pokeball'
      }
    ]
  },
  chromera: {
    learnset: { belch: [ '8S0' ], calmmind: [ '8S0' ], darkpulse: [ '8S0' ], recover: [ '8S0' ] },
    eventData: [
      {
        generation: 8,
        level: 50,
        moves: [ 'recover', 'calmmind', 'darkpulse', 'belch' ],
        pokeball: 'cherishball'
      }
    ]
  },
  pokestarsmeargle: {
    eventData: [
      {
        generation: 5,
        level: 60,
        gender: 'M',
        abilities: [ 'owntempo' ],
        moves: [ 'mindreader', 'guillotine', 'tailwhip', 'gastroacid' ]
      },
      {
        generation: 5,
        level: 30,
        gender: 'M',
        abilities: [ 'owntempo' ],
        moves: [ 'outrage', 'magiccoat' ]
      },
      {
        generation: 5,
        level: 99,
        gender: 'M',
        abilities: [ 'owntempo' ],
        moves: [ 'nastyplot', 'sheercold', 'attract', 'shadowball' ]
      }
    ]
  },
  pokestarufo: {
    eventData: [
      {
        generation: 5,
        level: 38,
        moves: [ 'bubblebeam', 'counter', 'recover', 'signalbeam' ]
      }
    ]
  },
  pokestarufo2: {
    eventData: [
      {
        generation: 5,
        level: 47,
        moves: [ 'darkpulse', 'flamethrower', 'hyperbeam', 'icebeam' ]
      }
    ]
  },
  pokestarbrycenman: {
    eventData: [
      { generation: 5, level: 56, moves: [ 'icebeam', 'nightshade', 'psychic', 'uturn' ] }
    ]
  },
  pokestarmt: {
    eventData: [ { generation: 5, level: 63, moves: [ 'earthquake', 'ironhead', 'spark', 'surf' ] } ]
  },
  pokestarmt2: {
    eventData: [
      {
        generation: 5,
        level: 72,
        moves: [ 'dragonpulse', 'flamethrower', 'metalburst', 'thunderbolt' ]
      }
    ]
  },
  pokestartransport: {
    eventData: [
      { generation: 5, level: 20, moves: [ 'clearsmog', 'flameburst', 'discharge' ] },
      { generation: 5, level: 50, moves: [ 'iciclecrash', 'overheat', 'signalbeam' ] }
    ]
  },
  pokestargiant: {
    eventData: [ { generation: 5, level: 99, moves: [ 'crushgrip', 'focuspunch', 'growl', 'rage' ] } ]
  },
  pokestargiant2: {
    eventData: [
      {
        generation: 5,
        level: 99,
        moves: [ 'crushgrip', 'doubleslap', 'teeterdance', 'stomp' ]
      }
    ]
  },
  pokestarhumanoid: {
    eventData: [
      { generation: 5, level: 20, gender: 'M', moves: [ 'scratch', 'shadowclaw', 'acid' ] },
      {
        generation: 5,
        level: 30,
        gender: 'M',
        moves: [ 'darkpulse', 'shadowclaw', 'slash' ]
      },
      { generation: 5, level: 20, gender: 'F', moves: [ 'acid', 'nightslash' ] },
      { generation: 5, level: 20, gender: 'M', moves: [ 'acid', 'doubleedge' ] },
      { generation: 5, level: 20, gender: 'F', moves: [ 'acid', 'rockslide' ] },
      { generation: 5, level: 20, gender: 'M', moves: [ 'acid', 'thunderpunch' ] },
      { generation: 5, level: 20, gender: 'F', moves: [ 'acid', 'icepunch' ] },
      { generation: 5, level: 40, gender: 'F', moves: [ 'explosion', 'selfdestruct' ] },
      { generation: 5, level: 40, gender: 'F', moves: [ 'shadowclaw', 'scratch' ] },
      { generation: 5, level: 40, gender: 'M', moves: [ 'nightslash', 'scratch' ] },
      { generation: 5, level: 40, gender: 'M', moves: [ 'doubleedge', 'scratch' ] },
      { generation: 5, level: 40, gender: 'F', moves: [ 'rockslide', 'scratch' ] }
    ]
  },
  pokestarmonster: {
    eventData: [ { generation: 5, level: 50, moves: [ 'darkpulse', 'confusion' ] } ]
  },
  pokestarf00: {
    eventData: [
      { generation: 5, level: 10, moves: [ 'teeterdance', 'growl', 'flail', 'chatter' ] },
      {
        generation: 5,
        level: 58,
        moves: [ 'needlearm', 'headsmash', 'headbutt', 'defensecurl' ]
      },
      {
        generation: 5,
        level: 60,
        moves: [ 'hammerarm', 'perishsong', 'ironhead', 'thrash' ]
      }
    ]
  },
  pokestarf002: {
    eventData: [
      {
        generation: 5,
        level: 52,
        moves: [ 'flareblitz', 'ironhead', 'psychic', 'wildcharge' ]
      }
    ]
  },
  pokestarspirit: {
    eventData: [
      {
        generation: 5,
        level: 99,
        moves: [ 'crunch', 'dualchop', 'slackoff', 'swordsdance' ]
      }
    ]
  },
  pokestarblackdoor: {
    eventData: [
      { generation: 5, level: 53, moves: [ 'luckychant', 'amnesia', 'ingrain', 'rest' ] },
      {
        generation: 5,
        level: 70,
        moves: [ 'batonpass', 'counter', 'flamecharge', 'toxic' ]
      }
    ]
  },
  pokestarwhitedoor: {
    eventData: [
      { generation: 5, level: 7, moves: [ 'batonpass', 'inferno', 'mirrorcoat', 'toxic' ] }
    ]
  },
  pokestarblackbelt: {
    eventData: [
      { generation: 5, level: 30, moves: [ 'focuspunch', 'machpunch', 'taunt' ] },
      { generation: 5, level: 40, moves: [ 'machpunch', 'hammerarm', 'jumpkick' ] }
    ]
  },
  pokestargiantpropo2: {
    eventData: [
      {
        generation: 5,
        level: 99,
        moves: [ 'crushgrip', 'doubleslap', 'teeterdance', 'stomp' ]
      }
    ]
  },
  pokestarufopropu2: {
    eventData: [
      {
        generation: 5,
        level: 47,
        moves: [ 'darkpulse', 'flamethrower', 'hyperbeam', 'icebeam' ]
      }
    ]
  }
};
