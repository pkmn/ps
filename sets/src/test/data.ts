
import {GenerationNum, StatsTable} from '@pkmn/types';
import {Data, toID} from '../sets';

const ABILITIES: {[id: string]: string} = {
  justifed: 'Justified',
  levitate: 'Levitate',
  magicguard: 'Magic Guard',
  magnetpull: 'Magnet Pull',
  naturalcure: 'Natural Cure',
  poisonheal: 'Poison Heal',
  regenerator: 'Regenerator',
  roughskin: 'Rough Skin',
  soulheart: 'Soul-Heart',
  sturdy: 'Sturdy',
  toughclaws: 'Tough Claws',
};

const ITEMS: {[id: string]: string} = {
  alakazite: 'Alakazite',
  assaultvest: 'Assault Vest',
  choicescarf: 'Choice Scarf',
  choicespecs: 'Choice Specs',
  fairiumz: 'Fairium Z',
  leftovers: 'Leftovers',
  metagrossite: 'Metagrossite',
  rockyhelmet: 'Rocky Helmet',
  thickclub: 'Thick Club',
  toxicorb: 'Toxic Orb',
};

const MOVES: {[id: string]: string} = {
  blizzard: 'Blizzard',
  bodyslam: 'Body Slam',
  bulletpunch: 'Bullet Punch',
  calmmind: 'Calm Mind',
  clamp: 'Clamp',
  defog: 'Defog',
  dracometeor: 'Draco Meteor',
  dragontail: 'Dragon Tail',
  earthquake: 'Earthquake',
  explosion: 'Explosion',
  flashcannon: 'Flash Cannon',
  fleurcannon: 'Fleur Cannon',
  focusblast: 'Focus Blast',
  frustration: 'Frustration',
  gigadrain: 'Giga Drain',
  heatwave: 'Heat Wave',
  hiddenpowerbug: 'Hidden Power Bug',
  hiddenpowerfire: 'Hidden Power Fire',
  hiddenpowerflying: 'Hidden Power Flying',
  hiddenpowergrass: 'Hidden Power Grass',
  hiddenpowerice: 'Hidden Power Ice',
  hurricane: 'Hurricane',
  hydropump: 'Hydro Pump',
  hyperbeam: 'Hyper Beam',
  icebeam: 'Ice Beam',
  knockoff: 'Knock Off',
  megadrain: 'Mega Drain',
  meteormash: 'Meteor Mash',
  powerwhip: 'Power Whip',
  protect: 'Protect',
  psychic: 'Psychic',
  recover: 'Recover',
  rest: 'Rest',
  roost: 'Roost',
  scald: 'Scald',
  seismictoss: 'Seismic Toss',
  selfdestruct: 'Self-Destruct',
  shadowball: 'Shadow Ball',
  shiftgear: 'Shift Gear',
  sing: 'Sing',
  sleeppowder: 'Sleep Powder',
  softboiled: 'Soft-Boiled',
  stealthrock: 'Stealth Rock',
  surf: 'Surf',
  swordsdance: 'Swords Dance',
  thunderbolt: 'Thunderbolt',
  thunderwave: 'Thunder Wave',
  toxic: 'Toxic',
  voltswitch: 'Volt Switch',
  wish: 'Wish',
  zenheadbutt: 'Zen Headbutt',
};

// NOTE: baseStats here is incorrect as its always the modern gen stats, that's fine for tests
const SPECIES: {[id: string]: {name: string; baseStats: StatsTable}} = {
  alakazam: {
    name: 'Alakazam',
    baseStats: {hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120},
  },
  alakazammega: {
    name: 'Alakazam-Mega',
    baseStats: {hp: 55, atk: 50, def: 65, spa: 175, spd: 105, spe: 150},
  },
  blissey: {
    name: 'Blissey',
    baseStats: {hp: 255, atk: 10, def: 10, spa: 75, spd: 135, spe: 55},
  },
  chansey: {
    name: 'Chansey',
    baseStats: {hp: 250, atk: 5, def: 5, spa: 35, spd: 105, spe: 50},
  },
  clefable: {
    name: 'Clefable',
    baseStats: {hp: 95, atk: 70, def: 73, spa: 95, spd: 90, spe: 60},
  },
  cloyster: {
    name: 'Cloyster',
    baseStats: {hp: 50, atk: 95, def: 180, spa: 85, spd: 45, spe: 70},
  },
  exeggutor: {
    name: 'Exeggutor',
    baseStats: {hp: 95, atk: 95, def: 85, spa: 125, spd: 75, spe: 55},
  },
  garchomp: {
    name: 'Garchomp',
    baseStats: {hp: 108, atk: 130, def: 95, spa: 80, spd: 85, spe: 102},
  },
  gliscor: {
    name: 'Gliscor',
    baseStats: {hp: 75, atk: 95, def: 125, spa: 45, spd: 75, spe: 95},
  },
  keldeo: {
    name: 'Keldeo',
    baseStats: {hp: 91, atk: 72, def: 90, spa: 129, spd: 90, spe: 108},
  },
  latios: {
    name: 'Latios',
    baseStats: {hp: 80, atk: 90, def: 80, spa: 130, spd: 110, spe: 110},
  },
  magearna: {
    name: 'Magearna',
    baseStats: {hp: 80, atk: 95, def: 115, spa: 130, spd: 115, spe: 65},
  },
  magnezone: {
    name: 'Magnezone',
    baseStats: {hp: 70, atk: 70, def: 115, spa: 130, spd: 90, spe: 60},
  },
  marowak: {
    name: 'Marowak',
    baseStats: {hp: 60, atk: 80, def: 110, spa: 50, spd: 80, spe: 45},
  },
  metagross: {
    name: 'Metagross',
    baseStats: {hp: 80, atk: 135, def: 130, spa: 95, spd: 90, spe: 70},
  },
  metagrossmega: {
    name: 'Metagross-Mega',
    baseStats: {hp: 80, atk: 145, def: 150, spa: 105, spd: 110, spe: 110},
  },
  snorlax: {
    name: 'Snorlax',
    baseStats: {hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30},
  },
  tangrowth: {
    name: 'Tangrowth',
    baseStats: {hp: 100, atk: 100, def: 125, spa: 110, spd: 50, spe: 50},
  },
  tauros: {
    name: 'Tauros',
    baseStats: {hp: 75, atk: 100, def: 95, spa: 40, spd: 70, spe: 110},
  },
  tornadustherian: {
    name: 'Tornadus-Therian',
    baseStats: {hp: 79, atk: 100, def: 80, spa: 110, spd: 90, spe: 121},
  },
};

export const GEN: {[n: number]: Data} = {};
for (let gen = 1; gen <= 9; gen++) {
  GEN[gen] = {
    gen: gen as GenerationNum,
    abilities: {
      get(name: string) {
        return {name: ABILITIES[toID(name)]};
      },
    },
    items: {
      get(name: string) {
        return {name: ITEMS[toID(name)]};
      },
    },
    moves: {
      get(name: string) {
        return {name: MOVES[toID(name)]};
      },
    },
    species: {
      get(name: string) {
        const s = SPECIES[toID(name)];
        (s as any).baseSpecies = s.name;
        if (s.name === 'Tangrowth') {
          (s as any).abilities = {0: 'Chlorophyll', 1: 'Leaf Guard', H: 'Regenerator'};
        } else if (s.name.endsWith('Mega')) {
          (s as any).baseSpecies = (s as any).battleOnly = s.name.slice(0, s.name.length - 5);
        }
        return s as {name: string; baseSpecies: string; baseStats: StatsTable};
      },
    },
    natures: {
      get(name: string) {
        return {name};
      },
    },
    forGen(g: number) {
      return GEN[g];
    },
  };
}
