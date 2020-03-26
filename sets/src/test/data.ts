
import {GenerationNum} from '@pkmn/types';
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

const SPECIES: {[id: string]: string} = {
  alakazammega: 'Alakazam-Mega',
  blissey: 'Blissey',
  chansey: 'Chansey',
  clefable: 'Clefable',
  cloyster: 'Cloyster',
  exeggutor: 'Exeggutor',
  garchomp: 'Garchomp',
  gliscor: 'Gliscor',
  keldeo: 'Keldeo',
  latios: 'Latios',
  magearna: 'Magearna',
  magnezone: 'Magnezone',
  marowak: 'Marowak',
  metagrossmega: 'Metagross-Mega',
  snorlax: 'Snorlax',
  tangrowth: 'Tangrowth',
  tauros: 'Tauros',
  tornadustherian: 'Tornadus-Therian',
};

export const GEN: {[n: number]: Data} = {};
for (let gen = 1; gen <= 8; gen++) {
  GEN[gen] = {
    gen: gen as GenerationNum,
    getAbility(name: string) {
      return {name: ABILITIES[toID(name)]};
    },
    getItem(name: string) {
      return {name: ITEMS[toID(name)]};
    },
    getMove(name: string) {
      return {name: MOVES[toID(name)]};
    },
    getSpecies(name: string) {
      const s: any = {name: SPECIES[toID(name)]};
      if (s.name === 'Tangrowth') {
        s.abilities = {0: 'Chlorophyll', 1: 'Leaf Guard', H: 'Regenerator'};
      }
      return s;
    },
    forGen(g: number) {
      return GEN[g];
    },
  };
}
