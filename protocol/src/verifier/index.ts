import {
  BoostID,
  FieldCondition,
  GameType,
  GenerationNum,
  ID,
  Player,
  SideCondition,
  StatusName,
  TypeName,
  Weather,
} from '@pkmn/types';

import {Args, KWArgs, PokemonIdent, Protocol, ignoreKwArgsSimple} from '../index';

interface Generation {
  num: GenerationNum;
  abilities: API;
  items: API;
  moves: API;
  species: API;
  types: API;
}

interface API {
  get(name: string): Record<string, unknown> | undefined;
}

const QUERYTYPES: Protocol.QueryType[] =
  ['userdetails', 'roomlist', 'rooms', 'laddertop', 'roominfo', 'savereplay', 'debug'];
const GAMETYPES: GameType[] =
  ['singles', 'doubles', 'triples', 'multi', 'freeforall', 'rotation'];
const PLAYERS: Player[] = ['p1', 'p2', 'p3', 'p4'];
const KWARGS: Protocol.BattleArgsWithKWArgType[] = ['from', 'of', 'still', 'silent'];
const STATUSES: StatusName[] = ['slp', 'psn', 'brn', 'frz', 'par', 'tox'];
const BOOSTS: BoostID[] = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'];
const REASONS: Protocol.Reason[] = [...STATUSES, 'partiallytrapped', 'flinch', 'nopp', 'recharge'];
const BOOL_KWARGS = new Set<Protocol.BattleArgsWithKWArgType>([
  'broken', 'consumed', 'damage', 'eat', 'fail', 'fatigue', 'forme', 'heavy', 'miss', 'msg',
  'notarget', 'ohko', 'silent', 'still', 'thaw', 'upkeep', 'weak', 'weaken', 'zeffect', 'already',
  'identify', 'interrupt', 'multiple', 'partiallytrapped', 'prepare', 'fromitem', 'persistent',
  'source', 'premajor',
]);
const ABILITY_KWARGS: Protocol.BattleArgsWithKWArgType[] = ['ability', 'ability2'];
const MOVE_KWARGS: Protocol.BattleArgsWithKWArgType[] = ['block'];
const ITEM_KWARGS: Protocol.BattleArgsWithKWArgType[] = ['item'];
const NAME_KWARGS: Protocol.BattleArgsWithKWArgType[] = ['name', 'wisher'];
const BARE_EFFECTS = ['Dynamax', 'Recoil'] as Protocol.EffectName[];
const POKE_ITEMS = ['item', 'mail', ''] as const;
const WEATHER = [
  'RainDance', 'Sandstorm', 'SunnyDay', 'Hail',
  'PrimordialSea', 'DesolateLand', 'DeltaStream', 'Snowscape',
];
const FIELD_CONDITIONS = ['Misty Terrain'];
const SIDE_CONDITIONS = [
  'Mist', 'Spikes', 'Light Screen', 'Reflect', 'Sticky Web', 'Stealth Rock', 'Toxic Spikes',
  'Safeguard', 'G-Max Volcalith', 'G-Max Wildfire', 'G-Max Cannonade', 'G-Max Steelsurge',
  'G-Max Vine Lash', 'Grass Pledge', 'Water Pledge', 'Fire Pledge', 'Aurora Veil',
];
const BINDING = ['bind', 'clamp', 'firespin', 'wrap'];
const STAT_DISPLAY_NAMES = ['Attack', 'Defense'];
const SSA = ['Shell Side Arm Physical', 'Shell Side Arm Special'];
const IVY_CUDGEL = ['Ivy Cudgel Water', 'Ivy Cudgel Fire', 'Ivy Cudgel Rock'];

function verifyRoomID(roomid: Protocol.RoomID) {
  return /^[-a-z0-9]+$/.test(roomid);
}

function verifyID(id: ID) {
  return /^[a-z0-9]+$/.test(id);
}

function verifyName(name: string) {
  return !!name && !verifyID(name as ID);
}

function verifyStatDisplayName(name: Protocol.StatDisplayName) {
  return STAT_DISPLAY_NAMES.includes(name);
}

function verifyWeather(name: Weather) {
  return WEATHER.includes(name);
}

function verifyFieldCondition(name: FieldCondition) {
  return FIELD_CONDITIONS.includes(name);
}

function verifySideCondition(name: SideCondition) {
  return SIDE_CONDITIONS.includes(name);
}

function verifyType(name: TypeName, gen?: Generation) {
  if (!gen) return verifyName(name);
  return verifyName(name) && !!gen.types.get(name);
}

function verifyTypes(types: Protocol.Types, gen?: Generation) {
  if (!gen) return verifyName(types);
  const [type1, type2] = types.split('/');
  return (type1 === '???' || verifyType(type1 as TypeName, gen)) &&
    (!type2 || verifyType(type2 as TypeName, gen));
}

function verifyAbilityName(name: Protocol.AbilityName, gen?: Generation) {
  return verifyName(name) && (!gen || name === 'As One' || !!gen.abilities.get(name));
}

function verifyItemName(name: Protocol.ItemName, gen?: Generation) {
  return verifyName(name) && (!gen || !!gen.items.get(name));
}

function verifyMoveName(name: Protocol.MoveName, gen?: Generation): boolean {
  return verifyName(name) && (!gen ||
    !!gen.moves.get(name) ||
    (name.startsWith('Z-') && verifyMoveName(name.slice(2) as Protocol.MoveName, gen)));
}

function verifyAnimationName(name: Protocol.AnimationName, gen?: Generation): boolean {
  return verifyName(name) && (!gen ||
    IVY_CUDGEL.includes(name) ||
    SSA.includes(name) ||
    name === 'Fickle Beam All Out' ||
    verifyMoveName(name as Protocol.MoveName, gen));
}

function verifySpeciesName(name: Protocol.SpeciesName, gen?: Generation) {
  return verifyName(name) && (!gen || !!gen.species.get(name));
}

function verifyEffectName(name: Protocol.EffectName, gen?: Generation) {
  if (name.includes(':')) {
    if (name.startsWith('ability:')) {
      return verifyAbilityName(name.slice(8).trim() as Protocol.AbilityName, gen);
    } else if (name.startsWith('item:')) {
      return verifyItemName(name.slice(5).trim() as Protocol.ItemName, gen);
    } else if (name.startsWith('move:')) {
      return verifyMoveName(name.slice(5).trim() as Protocol.MoveName, gen);
    } else if (name.startsWith('pokemon:')) {
      return verifySpeciesName(name.slice(8).trim() as Protocol.SpeciesName, gen);
    } else {
      return false;
    }
  }
  return verifyID(name as ID) || BARE_EFFECTS.includes(name);
}

function verifyMoveEffectName(name: Protocol.MoveEffectName, gen?: Generation) {
  return name.startsWith('move:') && verifyMoveName(name.slice(5).trim() as Protocol.MoveName, gen);
}

function verifyTimestamp(timestamp: Protocol.Timestamp) {
  return /^\d+$/.test(timestamp);
}

function verifyJSON(json: string) {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
}

function verifyNum(num: Protocol.Num) {
  return !isNaN(+num);
}

function verifyPokemonIdent(ident: Protocol.PokemonIdent) {
  return /^p[1234][abc]?: [^|]{1,25}$/.test(ident);
}

function verifyPokemonDetails(details: Protocol.PokemonDetails, gen?: Generation) {
  // TODO: exclude gender and shiny if Gen 1?
  const m = /^([^|]{1,25}?)(, L\d{0,3})?(, [MF])?(, shiny)?$/.exec(details);
  if (!m) return false;
  return !gen || !!gen.species.get(m[1]);
}

function verifyPokemonHPStatus(hpstatus: Protocol.PokemonHPStatus) {
  return hpstatus === '0 fnt' || /^\d+\/\d+( (par|brn|slp|frz|tox|psn))?$/.test(hpstatus);
}

function verifyPlayer(player: Player) {
  return PLAYERS.includes(player);
}

function verifySide(side: Protocol.Side) {
  return /^p[1234]: [^|]{1,25}$/.test(side);
}

function verifyStatusName(status: StatusName) {
  return STATUSES.includes(status);
}

function verifyBoostID(boost: BoostID) {
  return BOOSTS.includes(boost);
}

function verifyBoostIDs(boosts: Protocol.BoostIDs) {
  return boosts.split(', ').every(boost => verifyBoostID(boost as BoostID));
}

function verifyKWArgs<T extends Protocol.BattleArgsWithKWArgName>(
  kwArgs: Protocol.BattleArgsKWArgs[T],
  keys: Array<Protocol.BattleArgsWithKWArgs[T]>,
  gen?: Generation
) {
  for (const k in kwArgs) {
    const key = k as unknown as Protocol.BattleArgsWithKWArgs[T];
    if (!keys.includes(key)) return false;
    if (!verifyKWArg(key, (kwArgs as Protocol.BattleArgsKWArgsTypes)[key], gen)) return false;
  }
  return true;
}

function verifyKWArg<T extends Protocol.BattleArgsWithKWArgName>(
  k: Protocol.BattleArgsWithKWArgs[T],
  v: Protocol.BattleArgsKWArgsTypes[Protocol.BattleArgsWithKWArgs[T]],
  gen?: Generation
) {
  if (v === undefined) return true;
  if (BOOL_KWARGS.has(k)) return v === true;
  if (NAME_KWARGS.includes(k)) return verifyName(v as string);
  if (ABILITY_KWARGS.includes(k)) {
    return v === '' || verifyAbilityName(v as Protocol.AbilityName, gen);
  }
  if (ITEM_KWARGS.includes(k)) return verifyItemName(v as Protocol.ItemName, gen);
  if (MOVE_KWARGS.includes(k)) return verifyMoveName(v as Protocol.MoveName, gen);
  if (k === 'of') return v === '' || verifyPokemonIdent(v as Protocol.PokemonIdent);
  if (k === 'spread') {
    return v === true || (v as Protocol.Slots).split(',').every(s => /^p[1234][abc]$/.test(s));
  }
  if (k === 'from') {
    return verifyEffectName(v as Protocol.EffectName, gen) ||
      verifyMoveName(v as Protocol.MoveName, gen) ||
      verifyAbilityName(v as Protocol.AbilityName, gen);
  }
  if (k === 'number') return verifyNum(v as Protocol.Num);
  if (k === 'move') return verifyMoveName(v as Protocol.MoveName, gen) || verifyID(v as ID);
  if (k === 'anim') return verifyAnimationName(v as Protocol.AnimationName, gen) || v === 'prepare';
  return false;
}

class Handler implements Required<Protocol.Handler<boolean>> {
  private readonly gen?: Generation;
  private readonly raw: boolean;

  constructor(gen?: Generation, raw?: boolean) {
    this.gen = gen;
    this.raw = !!raw;
  }

  '|init|'(args: Args['|init|']) {
    return args.length === 2 && (['chat', 'battle', 'html'].includes(args[1]));
  }

  '|title|'(args: Args['|title|']) {
    return args.length === 2 && !!args[1];
  }

  '|users|'(args: Args['|users|']) {
    return args.length === 2 && !!args[1];
  }

  '||'(args: Args['||']) {
    return args.length === 2 && !args[0];
  }

  '|html|'(args: Args['|html|']) {
    return args.length === 2 && !!args[1];
  }

  '|pagehtml|'(args: Args['|pagehtml|']) {
    return args.length === 2 && !!args[1];
  }

  '|uhtml|'(args: Args['|uhtml|']) {
    return args.length === 3 && !!args[1];
  }

  '|uhtmlchange|'(args: Args['|uhtmlchange|']) {
    return args.length === 3 && !!args[1];
  }

  '|join|'(args: Args['|join|']) {
    if (args.length !== 3) return false;
    if (typeof args[2] !== 'boolean') return false;
    return !!args[1];
  }

  '|leave|'(args: Args['|leave|']) {
    if (args.length !== 3) return false;
    if (typeof args[2] !== 'boolean') return false;
    return !!args[1];
  }

  '|name|'(args: Args['|name|']) {
    if (args.length !== 4) return false;
    if (typeof args[3] !== 'boolean') return false;
    return !!args[1] && verifyID(args[2]);
  }

  '|chat|'(args: Args['|chat|']) {
    return args.length === 3 && !!args[1];
  }

  '|notify|'(args: Args['|notify|']) {
    return args.length >= 2 && args.length <= 4 && (args as any).every((a: string) => !!a);
  }

  '|:|'(args: Args['|:|']) {
    return args.length === 2 && verifyTimestamp(args[1]);
  }

  '|t:|'(args: Args['|t:|']) {
    return args.length === 2 && verifyTimestamp(args[1]);
  }

  '|c:|'(args: Args['|c:|']) {
    return args.length === 4 && verifyTimestamp(args[1]) && !!args[2];
  }

  '|battle|'(args: Args['|battle|']) {
    return args.length === 4 && verifyRoomID(args[1]) && !!args[2] && !!args[3];
  }

  '|popup|'(args: Args['|popup|']) {
    return args.length === 2 && !!args[1];
  }

  '|pm|'(args: Args['|pm|']) {
    return args.length === 4 && args.every((a: string) => !!a);
  }

  '|usercount|'(args: Args['|usercount|']) {
    return args.length === 2 && verifyNum(args[1]);
  }

  '|nametaken|'(args: Args['|nametaken|']) {
    return args.length === 3 && !args[1] && !args[2];
  }

  '|challstr|'(args: Args['|challstr|']) {
    return args.length === 2 && !!args[1];
  }

  '|customgroups|'(args: Args['|customgroups|']) {
    return args.length === 2 && verifyJSON(args[1]);
  }

  '|updateuser|'(args: Args['|updateuser|']) {
    if (args.length < 5) return false;
    return !!args[1] && (args[2] === '0' || args[2] === '1') && !!args[3] && verifyJSON(args[4]);
  }

  '|formats|'(args: Args['|formats|']) {
    return args.length === 2 && !!args[1];
  }

  '|updatesearch|'(args: Args['|updatesearch|']) {
    return args.length === 2 && verifyJSON(args[1]);
  }

  '|message|'(args: Args['|message|']) {
    return args.length === 2 && !!args[1];
  }

  '|updatechallenges|'(args: Args['|updatechallenges|']) {
    return args.length === 2 && verifyJSON(args[1]);
  }

  '|queryresponse|'(args: Args['|queryresponse|']) {
    return args.length === 3 && QUERYTYPES.includes(args[1]) && verifyJSON(args[2]);
  }

  '|unlink|'(args: Args['|unlink|']) {
    if (args.length === 2) return !!args[1];
    if (args.length === 3) return args[1] === 'hide' && !!args[2];
    return false;
  }

  '|raw|'(args: Args['|raw|']) {
    return args.length === 2 && !!args[1];
  }

  '|warning|'(args: Args['|warning|']) {
    return args.length === 2 && !!args[1];
  }

  '|error|'(args: Args['|error|']) {
    return args.length === 2 && !!args[1];
  }

  '|bigerror|'(args: Args['|bigerror|']) {
    return args.length === 2 && !!args[1];
  }

  '|chatmsg|'(args: Args['|chatmsg|']) {
    return args.length === 2 && !!args[1];
  }

  '|chatmsg-raw|'(args: Args['|chatmsg-raw|']) {
    return args.length === 2 && !!args[1];
  }

  '|controlshtml|'(args: Args['|controlshtml|']) {
    return args.length === 2 && !!args[1];
  }

  '|fieldhtml|'(args: Args['|fieldhtml|']) {
    return args.length === 2 && !!args[1];
  }

  '|debug|'(args: Args['|debug|']) {
    return args.length === 2 && !!args[1];
  }

  '|deinit|'(args: Args['|deinit|']) {
    return args.length === 1;
  }

  '|selectorhtml|'(args: Args['|selectorhtml|']) {
    return args.length === 3 && !!args[1] && !!args[2];
  }

  '|refresh|'(args: Args['|refresh|']) {
    return args.length === 1;
  }

  '|tempnotify|'(args: Args['|tempnotify|']) {
    return args.length >= 3 && !!args[1] && !!args[2] &&
      (args.length === 3 ||
        (args.length >= 4 && !!args[3] &&
          (args.length === 4 || (args.length === 5 && !!args[4]))));
  }

  '|tempnotifyoff|'(args: Args['|tempnotifyoff|']) {
    return args.length === 2 && !!args[1];
  }

  '|noinit|'(args: Args['|noinit|']) {
    return args.length >= 3 && !!args[2] &&
      (((args[1] === 'joinfailed' || args[1] === 'namerequired' || args[1] === 'nonexistent') &&
          args.length === 3) ||
        (args[1] === 'rename' && args.length === 4 && verifyRoomID(args[2]) && !!args[3]));
  }

  '|hidelines|'(args: Args['|hidelines|']) {
    return args.length >= 3 && verifyID(args[2]) &&
      (((args[1] === 'delete' || args[1] === 'hide') && args.length === 4 && verifyNum(args[3])) ||
        (args[1] === 'unlink' && args.length === 3));
  }

  '|expire|'(args: Args['|expire|']) {
    return args.length === 1 || (args.length === 2 && !!args[1]);
  }

  '|askreg|'(args: Args['|askreg|']) {
    return args.length === 2 && verifyID(args[1]);
  }

  '|tournament|create|'(args: Args['|tournament|create|']) {
    return args.length === 4 && !!args[2] && verifyNum(args[3] as Protocol.Num);
  }

  '|tournament|update|'(args: Args['|tournament|update|']) {
    return args.length === 3 && verifyJSON(args[2]);
  }

  '|tournament|updateEnd|'(args: Args['|tournament|updateEnd|']) {
    return args.length === 2;
  }

  '|tournament|error|'(args: Args['|tournament|error|']) {
    return args.length === 3 && !!args[2];
  }

  '|tournament|forceend|'(args: Args['|tournament|forceend|']) {
    return args.length === 2;
  }

  '|tournament|join|'(args: Args['|tournament|join|']) {
    return args.length === 3 && !!args[2];
  }

  '|tournament|leave|'(args: Args['|tournament|leave|']) {
    return args.length === 3 && !!args[2];
  }

  '|tournament|replace|'(args: Args['|tournament|replace|']) {
    return args.length === 4 && !!args[2] && !!args[3];
  }

  '|tournament|start|'(args: Args['|tournament|start|']) {
    return args.length === 3 && verifyNum(args[2]);
  }

  '|tournament|disqualify|'(args: Args['|tournament|disqualify|']) {
    return args.length === 3 && !!args[2];
  }

  '|tournament|battlestart|'(args: Args['|tournament|battlestart|']) {
    return args.length === 5 && !!args[2] && !!args[3] && verifyRoomID(args[4]);
  }

  '|tournament|battleend|'(args: Args['|tournament|battleend|']) {
    if (args.length !== 7) return false;
    if (!args[2] || !args[3]) return false;
    if (/^[0-6],[0-6]$/.test(args[5])) return false;
    if (args[6] === 'success') {
      return ['win', 'loss', 'draw'].includes(args[4]);
    } else if (args[6] === 'fail') {
      return args[4] === 'draw';
    } else {
      return false;
    }
  }

  '|tournament|end|'(args: Args['|tournament|end|']) {
    return args.length === 3 && verifyJSON(args[2]);
  }

  '|tournament|scouting|'(args: Args['|tournament|scouting|']) {
    return args.length === 3 && (args[2] === 'allow' || args[2] === 'disallow');
  }

  '|tournament|autostart|'(args: Args['|tournament|autostart|']) {
    return (args.length === 3 && args[2] === 'off') ||
      (args.length === 4 && args[2] === 'on' && verifyNum(args[3]));
  }

  '|tournament|autodq|'(args: Args['|tournament|autodq|']) {
    return (args.length === 3 && args[2] === 'off') ||
      (args.length === 4 && ['on', 'target'].includes(args[2]) && verifyNum(args[3]));
  }

  '|player|'(args: Args['|player|']) {
    if (args.length === 2) return verifyPlayer(args[1]);
    return args.length === 5 &&
      verifyPlayer(args[1]) &&
      !!args[2] &&
      (args[4] === '' || verifyNum(args[4]));
  }

  '|teamsize|'(args: Args['|teamsize|']) {
    return args.length === 3 && verifyPlayer(args[1]) && verifyNum(args[2]);
  }

  '|gametype|'(args: Args['|gametype|']) {
    return args.length === 2 && GAMETYPES.includes(args[1]);
  }

  '|gen|'(args: Args['|gen|']) {
    const gen = +args[1];
    return args.length === 2 && gen >= 1 && gen <= 9;
  }

  '|custom|'() {
    return true; // ignore
  }

  '|tier|'(args: Args['|tier|']) {
    return args.length === 2 && verifyName(args[1]);
  }

  '|rated|'(args: Args['|rated|']) {
    return args.length === 2 && !!args[1];
  }

  '|seed|'(args: Args['|seed|']) {
    return args.length === 2 && /^(\d|,)+$/.test(args[1]);
  }

  '|rule|'(args: Args['|rule|']) {
    return args.length === 2 && args[1].includes(':');
  }

  '|teampreview|'(args: Args['|teampreview|']) {
    if (this.gen && this.gen.num < 5) return false;
    return args.length === 1 || (args.length === 2 && verifyNum(args[1]));
  }

  '|updatepoke|'(args: Args['|updatepoke|']) {
    if (this.gen && this.gen.num < 8) return false;
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonDetails(args[2], this.gen);
  }

  '|clearpoke|'(args: Args['|clearpoke|']) {
    if (this.gen && this.gen.num < 5) return false;
    return args.length === 1;
  }

  '|poke|'(args: Args['|poke|']) {
    if (this.gen && this.gen.num < 5) return false;
    return args.length === 4 &&
      verifyPlayer(args[1]) &&
      verifyPokemonDetails(args[2], this.gen) &&
      POKE_ITEMS.includes(args[3]);
  }

  '|start|'(args: Args['|start|']) {
    return args.length === 1;
  }

  '|done|'(args: Args['|done|']) {
    return args.length === 1;
  }

  '|request|'(args: Args['|request|']) {
    return args.length === 2 && verifyJSON(args[1]);
  }

  '|sentchoice|'(args: Args['|sentchoice|']) {
    return args.length === 2 && !!args[1];
  }

  '|inactive|'(args: Args['|inactive|']) {
    return args.length === 2 && !!args[1];
  }

  '|inactiveoff|'(args: Args['|inactiveoff|']) {
    return args.length === 2 && !!args[1];
  }

  '|upkeep|'(args: Args['|upkeep|']) {
    return args.length === 1;
  }

  '|turn|'(args: Args['|turn|']) {
    return args.length === 2 && verifyNum(args[1]);
  }

  '|win|'(args: Args['|win|']) {
    return args.length === 2 && !!args[1];
  }

  '|tie|'(args: Args['|tie|']) {
    return args.length === 1;
  }

  // TODO
  '|move|'(args: Args['|move|'], kwArgs: KWArgs['|move|']) {
    if (!verifyPokemonIdent(args[1])) return false;
    if (!(args[2] === 'recharge' || verifyMoveName(args[2], this.gen) ||
      (this.gen && (this.gen.num === 1 || this.gen.num === 2) && BINDING.includes(args[2])))) {
      return false;
    }
    switch (this.gen?.num || 0) {
      case 1: case 2: {
        return args.length === 4 &&
          (args[3] === '' || (args[3] !== 'null' && verifyPokemonIdent(args[3]))) &&
          verifyKWArgs(kwArgs, ['miss', 'still', 'from'], this.gen) &&
          (!kwArgs.from || ((this.gen?.num === 1 && BINDING.includes(kwArgs.from)) ||
            verifyMoveName(kwArgs.from as Protocol.MoveName, this.gen)));
      }
      case 3: {
        return args.length === 4 &&
          (args[3] === '' || (args[3] === 'null'
            ? ['Helping Hand'].includes(args[2])
            : verifyPokemonIdent(args[3]))) &&
          verifyKWArgs(kwArgs, ['miss', 'still', 'from', 'notarget', 'spread'], this.gen) &&
          (!kwArgs.from || kwArgs.from === 'lockedmove' ||
            verifyMoveName(kwArgs.from as Protocol.MoveName, this.gen));
      }
      case 4: {
        const from = [
          'move: Metronome', 'move: Mirror Move', 'move: Sleep Talk', 'Snatch', 'move: Assist',
          'move: Copycat', 'Magic Coat', 'lockedmove', 'move: Me First', 'move: Nature Power',
          'Pursuit',
        ];
        return args.length === 4 &&
          (args[3] === '' || (args[3] === 'null'
            ? ['Helping Hand'].includes(args[2])
            : verifyPokemonIdent(args[3]))) &&
          verifyKWArgs(kwArgs, ['miss', 'still', 'from', 'notarget', 'spread'], this.gen) &&
          (!kwArgs.from || from.includes(kwArgs.from));
      }
      default: {
        const keys: Protocol.BattleArgsWithKWArgType[] =
          [...KWARGS, 'anim', 'miss', 'notarget', 'prepare', 'spread', 'zeffect'];
        if (!verifyKWArgs(kwArgs, keys, this.gen)) return false;
        return args.length === 3 || (args.length === 4 &&
          (args[3] === '' || args[3] === 'null' || verifyPokemonIdent(args[3])));
      }
    }
  }

  '|switch|'(args: Args['|switch|'], kwArgs: KWArgs['|switch|']) {
    const valid = args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonDetails(args[2], this.gen) &&
      verifyPokemonHPStatus(args[3]);

    if (!valid) return false;
    if (!this.gen) return verifyKWArgs(kwArgs, KWARGS, this.gen);
    if (this.gen.num === 1) return !Object.keys(kwArgs).length;

    const from = [
      'Baton Pass', 'U-turn', 'Volt Switch', 'Parting Shot',
      'Flip Turn', 'Teleport', 'Chilly Reception', 'Shed Tail',
    ];
    const to = [0, 0, 1, 1, 2, 3, 4, 4, 6, 8];

    if (!verifyKWArgs(kwArgs, ['from'], this.gen)) return false;
    return !kwArgs.from || from.slice(0, to[this.gen.num]).includes(kwArgs.from);
  }

  '|drag|'(args: Args['|drag|']) {
    if (this.gen && this.gen.num < 2) return false;
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonDetails(args[2], this.gen) &&
      verifyPokemonHPStatus(args[3]);
  }

  '|detailschange|'(args: Args['|detailschange|'], kwArgs: KWArgs['|detailschange|']) {
    if (this.gen && this.gen.num < 4) return false;
    return args.length === 3 &&
          verifyKWArgs(kwArgs, ['silent'], this.gen) &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonDetails(args[2], this.gen);
  }

  '|replace|'(args: Args['|replace|']) {
    if (this.gen && this.gen.num < 5) return false;
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonDetails(args[2], this.gen);
  }

  '|swap|'(args: Args['|swap|'], kwArgs: KWArgs['|swap|']) {
    if (this.gen && this.gen.num < 5) return false;
    return args.length === 3 &&
      verifyKWArgs(kwArgs, ['from'], this.gen) &&
      verifyPokemonIdent(args[1]) &&
      verifyNum(args[2] as Protocol.Num) &&
      kwArgs.from === 'move: Ally Switch';
  }

  // TODO
  '|cant|'(args: Args['|cant|'], kwArgs: KWArgs['|cant|']) {
    if (!verifyPokemonIdent(args[1])) return false;
    if (this.gen?.num === 1) {
      const reasons = ['Disable', 'flinch', 'slp', 'frz', 'par', 'partiallytrapped', 'recharge'];
      if (!reasons.includes(args[2]) || Object.keys(kwArgs).length) return false;
      return (args[2] === 'Disable'
        ? (args.length === 4 && verifyMoveName(args[3] as Protocol.MoveName, this.gen))
        : args.length === 3);
    }
    return (args.length === 3 || args.length === 4) &&
      (REASONS.includes(args[2] as Protocol.Reason) ||
        verifyEffectName(args[2] as Protocol.EffectName, this.gen) ||
        verifyAbilityName(args[2] as Protocol.AbilityName, this.gen) ||
        verifyMoveName(args[2] as Protocol.MoveName, this.gen)) &&
      (!args[3] ||
        verifyEffectName(args[3] as Protocol.EffectName, this.gen) ||
        verifyMoveName(args[3] as Protocol.MoveName, this.gen)) &&
      verifyKWArgs(kwArgs, KWARGS, this.gen);
  }

  '|faint|'(args: Args['|faint|']) {
    return args.length === 2 && verifyPokemonIdent(args[1]);
  }

  '|-formechange|'(args: Args['|-formechange|'], kwArgs: KWArgs['|-formechange|']) {
    if (this.gen && this.gen.num < 3) return false;
    const valid = verifyPokemonIdent(args[1]) && verifySpeciesName(args[2], this.gen) &&
      args.length === 3 || (args.length === 4 && args[3] === '');
    if (!valid) return false;

    switch (this.gen?.num || 0) {
      case 3: {
        return verifyKWArgs(kwArgs, ['msg', 'from'], this.gen) &&
          !!kwArgs.msg && kwArgs.from === 'ability: Forecast';
      }
      case 4: {
        return !Object.keys(kwArgs).length ||
          (verifyKWArgs(kwArgs, ['msg', 'from'], this.gen) &&
            !!kwArgs.msg && (kwArgs.from === 'ability: Forecast' ||
              kwArgs.from === 'ability: Flower Gift'));
      }
      default: return verifyKWArgs(kwArgs, [...KWARGS, 'msg'], this.gen);
    }
  }

  // TODO
  '|-fail|'(args: Args['|-fail|'], kwArgs: KWArgs['|-fail|']) {
    if (this.gen?.num === 1) {
      const valid = verifyPokemonIdent(args[1]) && verifyKWArgs(kwArgs, ['weak'], this.gen);
      if (!valid || args.length > 3) return false;
      if (args.length === 2) return true;
      const reasons = ['move: Substitute', 'par', 'psn', 'slp', 'tox'];
      if (!reasons.includes(args[2])) return false;
      return !kwArgs.weak || args[2] === 'move: Substitute';
    }
    const keys: Protocol.BattleArgsWithKWArgType[] =
      [...KWARGS, 'forme', 'heavy', 'msg', 'weak', 'fail', 'block'];
    if (!verifyKWArgs(kwArgs, keys, this.gen)) {
      return false;
    }
    if (args.length === 2) return verifyPokemonIdent(args[1]);
    if (args.length === 3) {
      return verifyPokemonIdent(args[1]) &&
        (verifyStatusName(args[2] as StatusName) ||
        verifyEffectName(args[2] as Protocol.EffectName, this.gen) ||
        verifyMoveName(args[2] as Protocol.MoveName, this.gen));
    }
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      args[2] === 'unboost' &&
      (verifyBoostID(args[3] as BoostID) ||
        verifyStatDisplayName(args[3] as Protocol.StatDisplayName));
  }

  // TODO FIXME
  '|-block|'(args: Args['|-block|'], kwArgs: KWArgs['|-block|']) {
    // NB: before upgrading only Aroma Veil (gen 6+), Flower Veil (gen 6+), and
    // Ability Shield (gen 9+) use |-block|
    if (this.gen?.num === 1) {
      return args.length === 4 &&
        verifyPokemonIdent(args[1]) &&
        !Object.keys(kwArgs).length &&
        args[2] === 'move: Mist' &&
        args[3] === '';
    }
    if (!verifyKWArgs(kwArgs, KWARGS, this.gen)) return false;
    if (!(verifyPokemonIdent(args[1]) &&
      (verifyEffectName(args[2] as Protocol.EffectName, this.gen) ||
        verifyMoveName(args[2] as Protocol.MoveName, this.gen)))) {
      return false;
    }
    if (args.length === 3) return true;
    if (args.length === 4) return args[3] === '' || verifyMoveName(args[3], this.gen);
    return args.length === 5 &&
      verifyPokemonIdent(args[1]) &&
      verifyEffectName(args[2], this.gen) &&
      verifyMoveName(args[3], this.gen) &&
      (args[4] === '' || verifyPokemonIdent(args[4]));
  }

  '|-notarget|'(args: Args['|-notarget|']) {
    if (this.gen && this.gen.num < 3) return false;
    if (args.length === 2 && verifyPokemonIdent(args[1])) return true;
    // This shouldn't be possible because you can't be missing a target in singles...
    return !this.gen && args.length === 1;
  }

  '|-miss|'(args: Args['|-miss|']) {
    if (!verifyPokemonIdent(args[1])) return false;
    if (args.length === 2) return !this.gen || this.gen.num <= 2;
    return this.gen?.num !== 1 && args.length === 3 && verifyPokemonIdent(args[2]);
  }

  // TODO
  '|-damage|'(args: Args['|-damage|'], kwArgs: KWArgs['|-damage|']) {
    const valid =
      args.length === 3 && verifyPokemonIdent(args[1]) && verifyPokemonHPStatus(args[2]);
    if (!valid) return false;
    if (this.gen?.num === 1) {
      if (!verifyKWArgs(kwArgs, ['from', 'of'], this.gen)) return false;
      return !kwArgs.from || (kwArgs.of
        ? ['brn', 'psn', 'Leech Seed', 'Recoil']
        : ['brn', 'psn', 'confusion']).includes(kwArgs.from);
    }
    return verifyKWArgs(kwArgs, [...KWARGS, 'partiallytrapped'], this.gen);
  }

  // TODO
  '|-heal|'(args: Args['|-heal|'], kwArgs: KWArgs['|-heal|']) {
    const valid =
      args.length === 3 && verifyPokemonIdent(args[1]) && verifyPokemonHPStatus(args[2]);
    if (!valid) return false;
    if (this.gen?.num === 1) {
      if (!verifyKWArgs(kwArgs, ['from', 'of', 'silent'], this.gen)) return false;
      if (!Object.keys(kwArgs).length) return true;
      return kwArgs.silent ? !(kwArgs.from || kwArgs.of) : (kwArgs.from === 'drain' && !!kwArgs.of);
    }
    return verifyKWArgs(kwArgs, [...KWARGS, 'wisher', 'zeffect'], this.gen);
  }

  '|-sethp|'(args: Args['|-sethp|'], kwArgs: KWArgs['|-sethp|']) {
    if (this.gen?.num === 1) return false;
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonHPStatus(args[2]) &&
      verifyKWArgs(kwArgs, ['from', 'silent'], this.gen) &&
      kwArgs.from === 'move: Pain Split';
  }

  // TODO
  '|-status|'(args: Args['|-status|'], kwArgs: KWArgs['|-status|']) {
    const valid = args.length === 3 && verifyPokemonIdent(args[1]) && verifyStatusName(args[2]);
    if (!valid) return false;

    switch (this.gen?.num || 0) {
      case 1: case 2: {
        if (!verifyKWArgs(kwArgs, ['from', 'silent'], this.gen)) return false;
        if (kwArgs.from) {
          return !kwArgs.silent && args[2] === 'slp' && kwArgs.from.startsWith('move: ');
        }
        return !kwArgs.silent || args[2] === 'psn';
      }
      case 3: {
        if (['frz', 'tox'].includes(args[2])) return !Object.keys(kwArgs).length;
        if (!verifyKWArgs(kwArgs, ['from', 'of'], this.gen)) return false;
        if (args[2] === 'slp') {
          return !kwArgs.of && (!kwArgs.from || kwArgs.from?.startsWith('move: '));
        }
        return !kwArgs.from || (kwArgs.from.startsWith('ability: ') && !!kwArgs.of);
      }
      case 4: {
        if (args[2] === 'frz') return !Object.keys(kwArgs).length;
        if (!verifyKWArgs(kwArgs, ['from', 'of'], this.gen)) return false;
        if (args[2] === 'slp') {
          return !kwArgs.of && (!kwArgs.from || kwArgs.from?.startsWith('move: '));
        }
        if (kwArgs.from?.startsWith('item: ')) {
          return ['brn', 'tox'].includes(args[2]) && !kwArgs.of;
        }
        return !kwArgs.from || (kwArgs.from.startsWith('ability: ') && !!kwArgs.of);
      }
      default: return verifyKWArgs(kwArgs, KWARGS, this.gen);
    }
  }

  // TODO
  '|-curestatus|'(args: Args['|-curestatus|'], kwArgs: KWArgs['|-curestatus|']) {
    const valid = args.length === 3 && verifyPokemonIdent(args[1]) && verifyStatusName(args[2]);
    if (!valid) return false;

    switch (this.gen?.num || 0) {
      case 1: {
        if (!verifyKWArgs(kwArgs, ['msg', 'silent'], this.gen)) return false;
        if (kwArgs.msg) return ['slp', 'frz'].includes(args[2]);
        return !!kwArgs.silent;
      }
      case 2: return verifyKWArgs(kwArgs, ['msg'], this.gen) && !!kwArgs.msg;
      case 3: case 4: {
        if (!verifyKWArgs(kwArgs, ['msg', 'silent', 'from'], this.gen)) return false;
        if (Object.keys(kwArgs).length > 1) return false;
        if (!kwArgs.from) return true;
        if (args[2] === 'frz') {
          if (kwArgs.silent) return false;
        } else {
          return kwArgs.from === 'ability: Natural Cure';
        }
        const from = ['move: Flame Wheel', 'move: Sacred Fire', 'ability: Natural Cure'];
        if (this.gen!.num === 4) from.push('move: Flare Blitz');
        return from.includes(kwArgs.from);
      }
      default: return verifyKWArgs(kwArgs, [...KWARGS, 'thaw', 'msg'], this.gen);
    }
  }

  '|-cureteam|'(args: Args['|-cureteam|'], kwArgs: KWArgs['|-cureteam|']) {
    if (this.gen && (this.gen.num < 2 || this.gen.num > 4)) return false;
    const valid = args.length === 2 &&
      verifyPokemonIdent(args[1]) &&
      verifyKWArgs(kwArgs, ['from'], this.gen);
    if (!valid) return false;
    if (!this.gen) return true;
    return kwArgs.from === (this.gen.num === 2 ? 'move: Heal Bell' : 'move: Aromatherapy');
  }

  // TODO gen 2/3/4
  '|-boost|'(args: Args['|-boost|'], kwArgs: KWArgs['|-boost|']) {
    const valid = args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyBoostID(args[2]) &&
      verifyNum(args[3]);
    if (!valid) return false;
    if (this.gen?.num === 1) {
      if (kwArgs.from === 'Rage' && args[2] === 'atk') return true;
      return !Object.keys(kwArgs).length;
    }
    return verifyKWArgs(kwArgs, [...KWARGS, 'multiple', 'zeffect'], this.gen);
  }

  // TODO gen 2/3/4
  '|-unboost|'(args: Args['|-unboost|'], kwArgs: KWArgs['|-unboost|']) {
    const valid = args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyBoostID(args[2]) &&
      verifyNum(args[3]);
    if (!valid) return false;
    if (this.gen?.num === 1) return !Object.keys(kwArgs).length;
    return verifyKWArgs(kwArgs, [...KWARGS, 'multiple', 'zeffect'], this.gen);
  }

  '|-setboost|'(args: Args['|-setboost|'], kwArgs: KWArgs['|-setboost|']) {
    if (this.gen && this.gen.num < 2) return false;
    const from =
      this.gen?.num === 2 ? ['move: Belly Drum'] : ['move: Belly Drum', 'ability: Anger Point'];
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      args[2] === 'atk' &&
      verifyNum(args[3]) &&
      verifyKWArgs(kwArgs, ['from'], this.gen) &&
      from.includes(kwArgs.from!);
  }

  '|-swapboost|'(args: Args['|-swapboost|'], kwArgs: KWArgs['|-swapboost|']) {
    if (!(verifyPokemonIdent(args[1]) && verifyPokemonIdent(args[2]))) return false;
    if (!verifyKWArgs(kwArgs, ['from'], this.gen)) return false;
    if (!this.gen) return args.length === 3 || (args.length === 4 && verifyBoostIDs(args[3]));
    if (this.gen.num < 4) return false;
    switch (kwArgs.from) {
      case 'move: Heart Swap': return args.length === 3;
      case 'move: Power Swap': return args.length === 4 && args[3] === 'atk, spa';
      case 'move: Guard Swap': return args.length === 4 && args[3] === 'def, spd';
      default: return false;
    }
  }

  '|-invertboost|'(args: Args['|-invertboost|'], kwArgs: KWArgs['|-invertboost|']) {
    if (this.gen && this.gen.num < 6) return false;
    return args.length === 2 &&
      verifyPokemonIdent(args[1]) &&
      verifyKWArgs(kwArgs, ['from'], this.gen) &&
      kwArgs.from === 'move: Topsy-Turvy';
  }

  '|-clearboost|'(args: Args['|-clearboost|'], kwArgs: KWArgs['|-clearboost|']) {
    if (!(args.length === 2 && verifyPokemonIdent(args[1]))) return false;
    if (!this.gen) return verifyKWArgs(kwArgs, [...KWARGS], this.gen);
    if (this.gen.num < 5) return false;
    if (this.gen.num < 8) return !Object.keys(kwArgs).length;
    return verifyKWArgs(kwArgs, ['from', 'of'], this.gen) &&
      !kwArgs.from || (kwArgs.from === 'ability: Curious Medicine' && !!kwArgs.of);
  }

  '|-clearallboost|'(args: Args['|-clearallboost|'], kwArgs: KWArgs['|-clearallboost|']) {
    if (args.length !== 1 || !verifyKWArgs(kwArgs, ['silent'], this.gen)) return false;
    if (!this.gen) return true;
    return this.gen.num === 1 ? kwArgs.silent === true : !Object.keys(kwArgs).length;
  }

  '|-clearpositiveboost|'(args: Args['|-clearpositiveboost|']) {
    if (this.gen && this.gen.num < 7) return false;
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonIdent(args[2]) &&
      args[3] === 'move: Spectral Thief';
  }

  '|-ohko|'(args: Args['|-ohko|']) {
    return args.length === 1;
  }

  '|-candynamax|'(args: Args['|-candynamax|']) {
    if (this.gen && this.gen.num < 8) return false;
    return args.length === 2 && verifyPlayer(args[1]);
  }

  '|-terastallize|'(args: Args['|-terastallize|']) {
    if (this.gen && this.gen.num < 9) return false;
    return args.length === 3 && verifyPokemonIdent(args[1]) && verifyType(args[2]);
  }

  '|-clearnegativeboost|'(
    args: Args['|-clearnegativeboost|'], kwArgs: KWArgs['|-clearnegativeboost|']
  ) {
    if (this.gen && this.gen.num < 3) return false;
    return args.length === 2 &&
      verifyPokemonIdent(args[1]) &&
      verifyKWArgs(kwArgs, ['silent', 'zeffect'], this.gen) &&
      Object.keys(kwArgs).length === 1;
  }

  '|-copyboost|'(args: Args['|-copyboost|'], kwArgs: KWArgs['|-copyboost|']) {
    if (this.gen && this.gen.num < 2) return false;
    const from =
      this.gen?.num === 2 ? ['move: Psych Up'] : ['move: Psych Up', 'ability: Costar'];
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonIdent(args[2]) &&
      verifyKWArgs(kwArgs, ['from'], this.gen) &&
      from.includes(kwArgs.from!);
  }

  '|-weather|'(args: Args['|-weather|'], kwArgs: KWArgs['|-weather|']) {
    if (args.length !== 2) return false;
    if (args[1] === 'none') return !Object.keys(kwArgs).length;

    const weather = [0, 0, 3, 4, 4, 4, 7, 7, 7, 8];
    const to = [0, 0, 0, 3, 4, 4, 7, 7, 8, 9];
    const abilities = [
      'ability: Drizzle', 'ability: Sand Stream', 'ability: Drought', 'ability: Snow Warning',
      'ability: Primordial Sea', 'ability: Desolate Land', 'ability: Delta Stream',
      'ability: Sand Spit', 'ability: Orichalcum Pulse',
    ];

    switch (this.gen?.num || 0) {
      case 1: return false;
      case 2: {
        return WEATHER.slice(0, 3).includes(args[1]) && verifyKWArgs(kwArgs, ['upkeep'], this.gen);
      }
      case 3: case 4: case 5: case 6: case 7: case 8: case 9: {
        if (!WEATHER.slice(0, weather[this.gen!.num]).includes(args[1])) return false;
        if (this.gen!.num === 9 && args[1] === 'Hail') return false;
        if (!verifyKWArgs(kwArgs, ['upkeep', 'from', 'of'], this.gen)) return false;
        if (!Object.keys(kwArgs).length) return true;
        if (kwArgs.upkeep) return Object.keys(kwArgs).length === 1;
        return !!kwArgs.of && abilities.slice(0, to[this.gen!.num]).includes(kwArgs.from!);
      }
      default: {
        return verifyWeather(args[1]) && verifyKWArgs(kwArgs, [...KWARGS, 'upkeep'], this.gen);
      }
    }
  }

  // TODO DEBUG
  '|-fieldstart|'(args: Args['|-fieldstart|'], kwArgs: KWArgs['|-fieldstart|']) {
    if (this.gen && this.gen.num < 4) return false;
    return args.length === 2 &&
      (verifyMoveEffectName(args[1] as Protocol.MoveEffectName, this.gen) ||
        verifyFieldCondition(args[1] as FieldCondition)) &&
      verifyKWArgs(kwArgs, KWARGS, this.gen);
  }

  // TODO DEBUG
  '|-fieldend|'(args: Args['|-fieldend|'], kwArgs: KWArgs['|-fieldend|']) {
    if (this.gen && this.gen.num < 4) return false;
    return args.length === 2 &&
      (verifyMoveEffectName(args[1] as Protocol.MoveEffectName, this.gen) ||
        verifyFieldCondition(args[1] as FieldCondition)) &&
      verifyKWArgs(kwArgs, KWARGS, this.gen);
  }

  '|-sidestart|'(args: Args['|-sidestart|'], kwArgs: KWArgs['|-sidestart|']) {
    const valid = args.length === 3 && verifySide(args[1]) && (!this.gen || this.gen.num >= 8
      ? verifyKWArgs(kwArgs, ['silent'], this.gen)
      : !Object.keys(kwArgs).length);
    if (!valid) return false;

    const modern = [
      'Reflect', 'Safeguard', 'move: Light Screen', 'Spikes', 'Mist',
      'move: Lucky Chant', 'move: Stealth Rock', 'move: Tailwind', 'move: Toxic Spikes',
      'Grass Pledge', 'Fire Pledge', 'Water Pledge', 'move: Sticky Web', 'move: Aurora Veil',
    ];
    const classic = modern.slice(0, 9);
    classic[2] = 'Light Screen';
    const dexit = modern.slice(0);
    dexit.splice(5, 1); // Lucky Chant
    const gen8 = [...dexit,
      'G-Max Volcalith', 'G-Max Wildfire', 'G-Max Cannonade', 'G-Max Steelsurge', 'G-Max Vine Lash',
    ];

    switch (this.gen?.num || 0) {
      case 1: return false;
      case 2: return modern.slice(0, 4).includes(args[2]); // NB: modern
      case 3: return classic.slice(0, 5).includes(args[2]);
      case 4: return classic.includes(args[2]);
      case 5: return modern.slice(0, 12).includes(args[2]);
      case 6: return modern.slice(0, 13).includes(args[2]);
      case 7: return modern.includes(args[2]);
      case 8: return gen8.includes(args[2]);
      case 9: return dexit.includes(args[2]);
      default: {
        return (verifyMoveEffectName(args[2] as Protocol.MoveEffectName, this.gen) ||
            verifySideCondition(args[2] as SideCondition));
      }
    }
  }

  // TODO
  '|-sideend|'(args: Args['|-sideend|'], kwArgs: KWArgs['|-sideend|']) {
    if (this.gen && this.gen.num < 2) return false;
    return args.length === 3 &&
      verifySide(args[1]) &&
      (verifyMoveEffectName(args[2] as Protocol.MoveEffectName, this.gen) ||
        verifySideCondition(args[2] as SideCondition)) &&
      verifyKWArgs(kwArgs, KWARGS, this.gen);
  }

  '|-swapsideconditions|'(args: Args['|-swapsideconditions|']) {
    if (this.gen && this.gen.num < 8) return false;
    return args.length === 1;
  }

  // TODO
  '|-start|'(args: Args['|-start|'], kwArgs: KWArgs['|-start|']) {
    if (!verifyPokemonIdent(args[1]) || args.length > 4) return false;
    if (this.gen?.num === 1) {
      if (args.length === 3) {
        const reasons = [
          'Bide', 'Light Screen', 'Mist', 'Reflect', 'Substitute',
          'confusion', 'move: Focus Energy', 'move: Leech Seed',
        ];
        return reasons.includes(args[2]) &&
          (!Object.keys(kwArgs).length || (!!kwArgs.silent && args[2] === 'confusion'));
      } else if (args.length === 4) {
        if (args[2] === 'typechange') {
          return (verifyTypes(args[3] as Protocol.Types, this.gen) &&
            verifyKWArgs(kwArgs, ['from', 'of'], this.gen) &&
            kwArgs.from === 'move: Conversion');
        } else {
          return (['Disable', 'Mimic'].includes(args[2]) &&
            !Object.keys(kwArgs).length &&
            verifyMoveName(args[3] as Protocol.MoveName, this.gen));
        }
      }
    }
    const keys: Protocol.BattleArgsWithKWArgType[] =
      [...KWARGS, 'already', 'damage', 'block', 'fatigue', 'upkeep', 'zeffect'];
    if (!verifyKWArgs(kwArgs, keys, this.gen)) return false;
    if (args[2] === 'Dynamax') {
      return args.length === 3 || (args.length === 4 && (args[3] === 'Gmax' || args[3] === ''));
    }
    if (args[2] === 'typechange') {
      return args.length === 3 ||
        (args.length === 4 && verifyTypes(args[3] as Protocol.Types, this.gen));
    }
    if (args[2] === 'typeadd') {
      return args.length === 4 && verifyType(args[3] as TypeName, this.gen);
    }
    if (!(verifyEffectName(args[2] as Protocol.EffectName, this.gen) ||
      verifyMoveName(args[2] as Protocol.MoveName, this.gen))) {
      return false;
    }
    return args.length === 3 || verifyMoveName(args[3] as Protocol.MoveName, this.gen);
  }

  // TODO
  '|-end|'(args: Args['|-end|'], kwArgs: KWArgs['|-end|']) {
    if (this.gen?.num === 1) {
      const valid = args.length === 3 &&
        verifyPokemonIdent(args[1]) &&
        verifyKWArgs(kwArgs, ['silent'], this.gen);
      if (!valid) return false;
      return (kwArgs.silent ? [
        'Disable', 'confusion', 'Mist', 'move: Focus Energy', 'move: Leech Seed',
        'Toxic counter', 'Light Screen', 'Reflect', 'move: Bide',
      ] : [
        'Disable', 'confusion', 'Bide', 'Substitute',
      ]).includes(args[2]);
    }
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      (verifyEffectName(args[2] as Protocol.EffectName, this.gen) ||
        verifyMoveName(args[2] as Protocol.MoveName, this.gen) ||
        verifyAbilityName(args[2] as Protocol.AbilityName, this.gen)) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'partiallytrapped', 'interrupt'], this.gen);
  }

  '|-crit|'(args: Args['|-crit|']) {
    return args.length === 2 && verifyPokemonIdent(args[1]);
  }

  '|-supereffective|'(args: Args['|-supereffective|']) {
    return args.length === 2 && verifyPokemonIdent(args[1]);
  }

  '|-resisted|'(args: Args['|-resisted|']) {
    return args.length === 2 && verifyPokemonIdent(args[1]);
  }

  // TODO DEBUG
  '|-immune|'(args: Args['|-immune|'], kwArgs: KWArgs['|-immune|']) {
    if (!verifyPokemonIdent(args[1])) return false;
    switch (this.gen?.num || 0) {
      case 1: return args.length === 2 && verifyKWArgs(kwArgs, ['ohko'], this.gen);
      case 2: return args.length === 2 && verifyKWArgs(kwArgs, ['ohko'], this.gen);
      case 3: case 4: {
        if (args.length === 3) {
          return args[2] === 'confusion' &&
            Object.keys(kwArgs).length === 1 &&
            kwArgs.from === 'ability: Own Tempo';
        }
        if (!(args.length === 2 && verifyKWArgs(kwArgs, ['from', 'ohko'], this.gen))) return false;
        if (Object.keys(kwArgs).length > 1) return false;
        return !kwArgs.from || (kwArgs.from.startsWith('ability: ') ||
          this.gen!.num === 4 && kwArgs.from === 'Oblivious');
      }
      default: {
        if (!verifyKWArgs(kwArgs, [...KWARGS, 'ohko'], this.gen)) return false;
        return args.length === 2 || (args.length === 3 && args[2] === 'confusion');
      }
    }
  }

  // TODO
  '|-item|'(args: Args['|-item|'], kwArgs: KWArgs['|-item|']) {
    if (this.gen && this.gen.num < 2) return false;
    return args.length === 3 &&
      (args[1] === '' || verifyPokemonIdent(args[1])) &&
      verifyItemName(args[2], this.gen) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'identify'], this.gen);
  }

  // TODO
  '|-enditem|'(args: Args['|-enditem|'], kwArgs: KWArgs['|-enditem|']) {
    if (this.gen && this.gen.num < 2) return false;
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyItemName(args[2], this.gen) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'eat', 'move', 'weaken'], this.gen);
  }

  // TODO
  '|-ability|'(args: Args['|-ability|'], kwArgs: KWArgs['|-ability|']) {
    if (this.gen && this.gen.num < 3) return false;
    if (!verifyKWArgs(kwArgs, [...KWARGS, 'move', 'weaken', 'fail'], this.gen)) return false;
    if (!(verifyPokemonIdent(args[1]) && verifyAbilityName(args[2], this.gen))) return false;
    if (args.length === 3) return true;
    if (args.length === 4) {
      return args[3] === 'boost' ||
        verifySide(args[3] as Protocol.Side) ||
        verifyPokemonIdent(args[3] as Protocol.PokemonIdent);
    }
    return args.length === 5 &&
      verifyAbilityName(args[3], this.gen) &&
      verifyPokemonIdent(args[4]);
  }

  // TODO
  '|-endability|'(args: Args['|-endability|'], kwArgs: KWArgs['|-endability|']) {
    if (this.gen && this.gen.num < 3) return false;
    if (!verifyKWArgs(kwArgs, KWARGS, this.gen)) return false;
    if (!verifyPokemonIdent(args[1])) return false;
    return args.length === 2 ||
      (args.length === 3 && (args[2] === 'none' || verifyAbilityName(args[2], this.gen)));
  }

  '|-transform|'(args: Args['|-transform|'], kwArgs: KWArgs['|-transform|']) {
    const valid = args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonIdent(args[2]);
    if (!valid) return false;
    if (this.gen && this.gen.num < 5) return !Object.keys(kwArgs).length;
    return verifyKWArgs(kwArgs, ['from'], this.gen) &&
      (!kwArgs.from || kwArgs.from === 'ability: Imposter');
  }

  '|-mega|'(args: Args['|-mega|']) {
    if (this.gen && (this.gen.num < 6 || this.gen.num > 7)) return false;
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifySpeciesName(args[2], this.gen) &&
      (args[3] === '' || verifyItemName(args[3], this.gen));
  }

  '|-primal|'(args: Args['|-primal|']) {
    if (this.gen && this.gen.num < 6) return false;
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      ['Blue Orb', 'Red Orb'].includes(args[2]);
  }

  '|-burst|'(args: Args['|-burst|']) {
    if (this.gen && this.gen.num < 7) return false;
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifySpeciesName(args[2], this.gen) &&
      verifyItemName(args[3], this.gen);
  }

  '|-zpower|'(args: Args['|-zpower|']) {
    if (this.gen && this.gen.num < 7) return false;
    return args.length === 2 && verifyPokemonIdent(args[1]);
  }

  '|-zbroken|'(args: Args['|-zbroken|']) {
    if (this.gen && this.gen.num < 7) return false;
    return args.length === 2 && verifyPokemonIdent(args[1]);
  }

  // TODO
  '|-activate|'(args: Args['|-activate|'], kwArgs: KWArgs['|-activate|']) {
    if (this.gen?.num === 1) {
      const valid = (args.length === 3 || (args.length === 4 && args[3] === '')) &&
        verifyKWArgs(kwArgs, ['damage'], this.gen);
      if (!valid) return false;
      if (args[1] === '') return args[2] === 'move: Splash';
      return verifyPokemonIdent(args[1]) && (kwArgs.damage
        ? args[2] === 'Substitute'
        : ['Bide', 'confusion', 'move: Haze', 'move: Mist', 'move: Struggle'].includes(args[2]));
    }
    const keys: Protocol.BattleArgsWithKWArgType[] = [
      ...KWARGS, 'ability', 'ability2', 'block', 'broken', 'damage',
      'item', 'move', 'number', 'consumed', 'name', 'fromitem', 'source',
    ];
    if (!verifyKWArgs(kwArgs, keys, this.gen)) return false;
    if (!(args[1] === '' || verifyPokemonIdent(args[1]))) return false;
    if (!(verifyEffectName(args[2] as Protocol.EffectName, this.gen) ||
      verifyAbilityName(args[2] as Protocol.AbilityName, this.gen) ||
      verifyMoveName(args[2] as Protocol.MoveName, this.gen))) {
      return false;
    }
    if (args.length === 3) return true;
    if (args.length === 4) {
      return args[3] === '' ||
        verifyAbilityName(args[3] as Protocol.AbilityName, this.gen) ||
        verifyItemName(args[3] as Protocol.ItemName, this.gen) ||
        verifyMoveName(args[3] as Protocol.MoveName, this.gen) ||
        verifyNum(args[3] as Protocol.Num) ||
        verifyPokemonIdent(args[3] as PokemonIdent);
    }
    return args.length === 5 &&
      (args[3] === '' || verifyAbilityName(args[3], this.gen)) &&
      (args[4] === '' || verifyAbilityName(args[4], this.gen));
  }

  '|-fieldactivate|'(args: Args['|-fieldactivate|']) {
    if (args.length !== 2) return false;
    if (!this.gen) return args[1] === 'Delta Stream' || verifyEffectName(args[1], this.gen);

    const effects = [
      'move: Pay Day', 'move: Perish Song', 'move: Fairy Lock',
      'move: Ion Deluge', 'Delta Stream', 'move: Teatime',
    ];
    const to = [0, 1, 2, 2, 2, 2, 5, 5, 6, 6];

    return effects.slice(this.gen.num >= 5 ? 1 : 0, to[this.gen.num]).includes(args[1]);
  }

  '|-hint|'(args: Args['|-hint|']) {
    return args.length === 2 && !!args[1];
  }

  '|-center|'(args: Args['|-center|']) {
    if (this.gen && this.gen.num < 5) return false;
    return args.length === 1;
  }

  '|-message|'(args: Args['|-message|']) {
    return args.length === 2 && !!args[1];
  }

  '|-combine|'(args: Args['|-combine|']) {
    if (this.gen && this.gen.num < 5) return false;
    return args.length === 1;
  }

  '|-waiting|'(args: Args['|-waiting|']) {
    if (this.gen && this.gen.num < 5) return false;
    return args.length === 3 && verifyPokemonIdent(args[1]) && verifyPokemonIdent(args[2]);
  }

  '|-prepare|'(args: Args['|-prepare|'], kwArgs: KWArgs['|-prepare|']) {
    if (!verifyKWArgs(kwArgs, ['premajor'], this.gen)) return false;
    if (!(verifyPokemonIdent(args[1]) && verifyMoveName(args[2], this.gen))) return false;
    if (this.gen && this.gen.num < 5) return args.length === 3;
    return (args[2] === 'Sky Drop'
      ? args.length === 4 && verifyPokemonIdent(args[3])
      : args.length === 3);
  }

  '|-mustrecharge|'(args: Args['|-mustrecharge|']) {
    return args.length === 2 && verifyPokemonIdent(args[1]);
  }

  '|-hitcount|'(args: Args['|-hitcount|']) {
    return args.length === 3 && verifyPokemonIdent(args[1]) && verifyNum(args[2]);
  }

  '|-singlemove|'(args: Args['|-singlemove|'], kwArgs: KWArgs['|-singlemove|']) {
    const valid = args.length === 3 && verifyPokemonIdent(args[1]);
    if (!valid) return false;
    switch (this.gen?.num || 0) {
      case 1: return false;
      case 2: case 3: case 4: case 5: case 6: case 7: {
        const reasons = ['Destiny Bond', 'Rage'];
        if (this.gen!.num >= 3) reasons.push('Grudge');
        return !Object.keys(kwArgs).length && reasons.includes(args[2]);
      }
      case 8: {
        const reasons = ['Destiny Bond', 'Grudge'];
        return !Object.keys(kwArgs).length && reasons.includes(args[2]);
      }
      case 9: {
        return (Object.keys(kwArgs).length
          ? args[2] === 'Glaive Rush' &&
            verifyKWArgs(kwArgs, ['silent'], this.gen) &&
            kwArgs.silent === true
          : args[2] === 'Destiny Bond' && !Object.keys(kwArgs).length);
      }
      default: {
        return verifyMoveName(args[2], this.gen) &&
          verifyKWArgs(kwArgs, ['silent'], this.gen);
      }
    }
  }

  // TODO DEBUG
  '|-singleturn|'(args: Args['|-singleturn|'], kwArgs: KWArgs['|-singleturn|']) {
    const valid = args.length === 3 && verifyPokemonIdent(args[1]);
    if (!valid) return false;
    switch (this.gen?.num || 0) {
      case 1: return false;
      case 2: case 3: case 4: {
        const reasons = ['Protect', 'move: Endure'];
        if (this.gen!.num >= 3) {
          reasons.push('Snatch', 'move: Focus Punch', 'move: Follow Me', 'Helping Hand');
        }
        if (this.gen!.num >= 4) reasons.push('move: Roost');
        if (!reasons.includes(args[2])) return false;
        if (this.gen!.num === 2 && Object.keys(kwArgs).length) return false;
        if (!verifyKWArgs(kwArgs, ['of'], this.gen)) return false;
        return !kwArgs.of || args[2] === 'Helping Hand';
      }
      default: {
        return (verifyMoveEffectName(args[2] as Protocol.MoveEffectName, this.gen) ||
            verifyMoveName(args[2] as Protocol.MoveName, this.gen)) &&
          verifyKWArgs(kwArgs, [...KWARGS, 'zeffect'], this.gen);
      }
    }
  }

  '|-anim|'(args: Args['|-anim|'], kwArgs: KWArgs['|-anim|']) {
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyAnimationName(args[2], this.gen) &&
      verifyPokemonIdent(args[3]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'spread', 'miss', 'notarget'], this.gen);
  }

  '|-nothing|'(args: string[]) {
    if (!this.raw) throw new Error('Encountered non-upgraded |-nothing arg');
    return args.length === 1;
  }
}

export class Verifier {
  handler: Handler;
  raw?: Handler;

  static EXISTS = (d: {exists: boolean}) => d.exists;

  constructor(gen?: Generation, raw?: boolean) {
    this.handler = new Handler(gen);
    if (raw) this.raw = new Handler(gen, raw);
  }

  verify(data: string) {
    for (const {roomid, args, kwArgs} of Protocol.parse(data)) {
      if (!verifyRoomID(roomid)) return data;
      if (!this.dispatch(args, kwArgs, false)) return data;
    }
    // TODO
    // if (this.raw) {
    //   for (const {roomid, args, kwArgs} of parseRaw(data)) {
    //     if (!verifyRoomID(roomid as Protocol.RoomID)) return data;
    //     if (!this.dispatch(args as any, kwArgs as any, true)) return data;
    //   }
    // }
    return undefined;
  }

  verifyLine(line: string) {
    const parsed = Protocol.parseBattleLine(line);
    if (!this.dispatch(parsed.args, parsed.kwArgs, false)) return parsed;
    // TODO
    // if (this.raw) {
    //   const raw = parseRawBattleLine(line);
    //   if (!this.dispatch(raw.args as any, raw.kwArgs as any, true)) return raw;
    // }
    return undefined;
  }

  dispatch(args: Protocol.ArgType, kwArgs: Protocol.BattleArgsKWArgType, raw = false) {
    const handler = raw && this.raw ? this.raw : this.handler;
    const key = Protocol.key(args, raw);
    if (!key || !handler[key]) return false;
    if (Object.keys(kwArgs).length && !(key in Protocol.ARGS_WITH_KWARGS)) return false;
    return (handler as any)[key](args, kwArgs);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function *parseRaw(data: string) {
  const lines = data.split('\n');
  let roomid = '';
  for (const [i, line] of lines.entries()) {
    if (i === 0 && line[0] === '>') {
      roomid = line.slice(1);
      continue;
    } else if (line) {
      const {args, kwArgs} = parseRawBattleLine(line);
      yield {roomid, args, kwArgs};
    }
  }
}

function parseRawBattleLine(line: string) {
  let args = parseRawLine(line, true) as [string, ...string[]];
  if (args) return {args, kwArgs: {}};

  args = line.slice(1).split('|') as [string, ...string[]];
  const kwArgs: {[kw: string]: string | true} = {};
  while (args.length > 1) {
    const lastArg = args[args.length - 1];
    if (lastArg.charAt(0) !== '[') break;
    const bracketPos = lastArg.indexOf(']');
    if (bracketPos <= 0) break;
    // default to '.' so it evaluates to boolean true
    kwArgs[lastArg.slice(1, bracketPos)] = lastArg.slice(bracketPos + 1).trim() || true;
    args.pop();
  }

  return {args, kwArgs};
}

function parseRawLine(line: string, noDefault?: boolean): string[] | null {
  if (!line.startsWith('|')) return ['', line];
  if (line === '|') return ['done'];
  const index = line.indexOf('|', 1);
  const cmd = line.slice(1, index);
  if (ignoreKwArgsSimple.has(cmd)) return ([cmd, line.slice(index + 1)]);
  switch (cmd) {
    case 'c': case 'chat': case 'uhtml': case 'uhtmlchange': {
    // three parts
      const index2a = line.indexOf('|', index + 1);
      return [cmd, line.slice(index + 1, index2a), line.slice(index2a + 1)];
    }
    case 'c:': case 'pm': {
    // four parts
      const index2b = line.indexOf('|', index + 1);
      const index3b = line.indexOf('|', index2b + 1);
      return [
        cmd,
        line.slice(index + 1, index2b),
        line.slice(index2b + 1, index3b),
        line.slice(index3b + 1),
      ];
    }
  }
  if (noDefault) return null;
  return line.slice(1).split('|');
}
