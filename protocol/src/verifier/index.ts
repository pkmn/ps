import {BoostName, GameType, ID, Player, StatusName} from '@pkmn/types';

import {Protocol, Args, KWArgs, PokemonIdent} from '../index';

const QUERYTYPES: Protocol.QueryType[] =
  ['userdetails', 'roomlist', 'rooms', 'laddertop', 'roominfo', 'savereplay'];
const GAMETYPES: GameType[] =
  ['singles', 'doubles', 'triples', 'multi', 'free-for-all', 'rotation'];
const PLAYERS: Player[] = ['p1', 'p2', 'p3', 'p4'];
const KWARGS: Protocol.BattleArgsWithKWArgType[] = ['from', 'of', 'still', 'silent'];
const STATUSES: StatusName[] = ['slp', 'psn', 'brn', 'frz', 'par', 'tox'];
const BOOSTS: BoostName[] = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'];
const REASONS: Protocol.Reason[] = [...STATUSES, 'partiallytrapped', 'flinch', 'nopp', 'recharge'];
const BOOL_KWARGS = new Set<Protocol.BattleArgsWithKWArgType>([
  'broken', 'consumed', 'damage', 'eat', 'fail', 'fatigue', 'forme', 'heavy', 'miss', 'msg',
  'notarget', 'ohko', 'silent', 'still', 'thaw', 'upkeep', 'weak', 'weaken', 'zeffect', 'already',
  'identify', 'interrupt', 'multiple', 'partiallytrapped', 'prepare',
]);
const NAME_KWARGS = new Set<Protocol.BattleArgsWithKWArgType>([
  'ability', 'ability2', 'anim', 'block', 'item', 'name', 'wisher',
]);
const BARE_EFFECTS = ['Dynamax', 'Recoil'] as Protocol.EffectName[];

function verifyRoomID(roomid: Protocol.RoomID) {
  return /^[-a-z0-9]+$/.test(roomid);
}

function verifyID(id: ID) {
  return /^[a-z0-9]+$/.test(id);
}

function verifyName(name: string) {
  return !!name && !verifyID(name as ID);
}

function verifyEffectName(name: Protocol.EffectName) {
  if (name.includes(':')) {
    return (name.startsWith('ability:') ||
      name.startsWith('item:') ||
      name.startsWith('move:')) &&
      verifyName(name.slice(name.indexOf(':') + 2));
  }
  return verifyID(name as ID) || BARE_EFFECTS.includes(name);
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
  return /^p[1234][abc]?: [A-Z].*$/.test(ident);
}

function verifyPokemonDetails(details: Protocol.PokemonDetails) {
  return /^[A-Z].*?(, L\d{0,3})?(, [MF])?(, shiny)?$/.test(details);
}

function verifyPokemonHPStatus(hpstatus: Protocol.PokemonHPStatus) {
  return hpstatus === '0 fnt' || /^\d+\/\d+( (par|brn|slp|frz|tox|psn))?$/.test(hpstatus);
}

function verifyPlayer(player: Player) {
  return PLAYERS.includes(player);
}

function verifySide(side: Protocol.Side) {
  return /^p[1234]: .*$/.test(side);
}

function verifyStatusName(status: StatusName) {
  return STATUSES.includes(status);
}

function verifyBoostName(boost: BoostName) {
  return BOOSTS.includes(boost);
}

function verifyBoostNames(boosts: Protocol.BoostNames) {
  return boosts.split(', ').every(boost => verifyBoostName(boost as BoostName));
}

function verifyKWArgs<T extends Protocol.BattleArgsWithKWArgName>(
  kwArgs: Protocol.BattleArgsKWArgs[T], keys: Array<Protocol.BattleArgsWithKWArgs[T]>
) {
  for (const k in kwArgs) {
    const key = k as unknown as Protocol.BattleArgsWithKWArgs[T];
    if (!keys.includes(key)) return false;
    if (!verifyKWArg(key, (kwArgs as Protocol.BattleArgsKWArgsTypes)[key])) return false;
  }
  return true;
}

function verifyKWArg<T extends Protocol.BattleArgsWithKWArgName>(
  k: Protocol.BattleArgsWithKWArgs[T],
  v: Protocol.BattleArgsKWArgsTypes[Protocol.BattleArgsWithKWArgs[T]]
) {
  if (v === undefined) return true;
  if (BOOL_KWARGS.has(k)) return v === true;
  if (NAME_KWARGS.has(k)) return verifyName(v as string) || (k.startsWith('ability') && v === '');
  if (k === 'of') return v === '' || verifyPokemonIdent(v as Protocol.PokemonIdent);
  if (k === 'spread') {
    return v === true || (v as Protocol.Slots).split(',').every(s => /^p[1234][abc]$/.test(s));
  }
  if (k === 'from') {
    return verifyEffectName(v as Protocol.EffectName) || verifyName(v as Protocol.MoveName);
  }
  if (k === 'number') return verifyNum(v as Protocol.Num);
  if (k === 'move') return verifyName(v as Protocol.MoveName) || verifyID(v as ID);
  if (k === 'anim') return v === 'prepare';
  return false;
}

class Handler implements Required<Protocol.Handler<boolean>> {
  '|init|'(args: Args['|init|']) {
    return args.length === 2 && (['chat', 'battle'].includes(args[1]));
  }

  '|title|'(args: Args['|title|']) {
    return args.length === 2 && !!args[1];
  }

  '|userlist|'(args: Args['|userlist|']) {
    return args.length === 2 && !!args[1];
  }

  '||'(args: Args['||']) {
    return args.length === 2 && !!args[1];
  }

  '|html|'(args: Args['|html|']) {
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
    return args.length === 3 && args[1] === '4' && !!args[2];
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
    return args.length === 2 && gen >= 1 && gen <= 8;
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
    return args.length === 1 || (args.length === 2 && verifyNum(args[1]));
  }

  '|clearpoke|'(args: Args['|clearpoke|']) {
    return args.length === 1;
  }

  '|poke|'(args: Args['|poke|']) {
    return args.length === 4 &&
      verifyPlayer(args[1]) &&
      verifyPokemonDetails(args[2]) &&
      (args[3] === 'item' || args[3] === '');
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

  '|move|'(args: Args['|move|'], kwArgs: KWArgs['|move|']) {
    const keys: Protocol.BattleArgsWithKWArgType[] =
      [...KWARGS, 'anim', 'miss', 'notarget', 'prepare', 'spread', 'zeffect'];
    if (!(verifyPokemonIdent(args[1]) && verifyKWArgs(kwArgs, keys))) return false;
    if (args.length === 3) return verifyName(args[2]);
    return args.length === 4 &&
      (args[2] === 'recharge' || verifyName(args[2])) &&
      (args[3] === '' || args[3] === 'null' || verifyPokemonIdent(args[3]));
  }

  '|switch|'(args: Args['|switch|'], kwArgs: KWArgs['|switch|']) {
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonDetails(args[2]) &&
      verifyPokemonHPStatus(args[3]) &&
      verifyKWArgs(kwArgs, KWARGS);
  }

  '|drag|'(args: Args['|drag|']) {
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonDetails(args[2]) &&
      verifyPokemonHPStatus(args[3]);
  }

  '|detailschange|'(args: Args['|detailschange|'], kwArgs: KWArgs['|detailschange|']) {
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonDetails(args[2]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'msg']);
  }

  '|replace|'(args: Args['|replace|']) {
    return args.length === 3 && verifyPokemonIdent(args[1]) && verifyPokemonDetails(args[2]);
  }

  '|swap|'(args: Args['|swap|'], kwArgs: KWArgs['|swap|']) {
    return args.length === 3 &&
      verifyKWArgs(kwArgs, KWARGS) &&
      verifyPokemonIdent(args[1]) &&
      (verifyNum(args[2] as Protocol.Num) || verifyPokemonIdent(args[2] as Protocol.PokemonIdent));
  }

  '|cant|'(args: Args['|cant|'], kwArgs: KWArgs['|cant|']) {
    return (args.length === 3 || args.length === 4) &&
      verifyPokemonIdent(args[1]) &&
      (REASONS.includes(args[2] as Protocol.Reason) ||
        verifyEffectName(args[2] as Protocol.EffectName) ||
        verifyName(args[2])) &&
      (!args[3] || verifyEffectName(args[3] as Protocol.EffectName) || verifyName(args[3])) &&
      verifyKWArgs(kwArgs, KWARGS);
  }

  '|faint|'(args: Args['|faint|']) {
    return args.length === 2 && verifyPokemonIdent(args[1]);
  }

  '|split|'(args: Args['|split|']) {
    return args.length === 2 && verifyPlayer(args[1]);
  }

  '|-formechange|'(args: Args['|-formechange|'], kwArgs: KWArgs['|-formechange|']) {
    if (!(verifyPokemonIdent(args[1]) &&
      verifyName(args[2]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'msg']))) {
      return false;
    }
    return args.length === 3 || (args.length === 4 && args[3] === '');
  }

  '|-fail|'(args: Args['|-fail|'], kwArgs: KWArgs['|-fail|']) {
    if (!verifyKWArgs(kwArgs, [...KWARGS, 'forme', 'heavy', 'msg', 'weak', 'fail', 'block'])) {
      return false;
    }
    if (args.length === 2) return verifyPokemonIdent(args[1]);
    if (args.length === 3) {
      return verifyPokemonIdent(args[1]) &&
        (verifyStatusName(args[2] as StatusName) ||
        verifyEffectName(args[2] as Protocol.EffectName) ||
        verifyName(args[2]));
    }
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      args[2] === 'unboost' &&
      (verifyBoostName(args[3] as BoostName) || verifyName(args[3]));
  }

  '|-block|'(args: Args['|-block|'], kwArgs: KWArgs['|-block|']) {
    if (!verifyKWArgs(kwArgs, KWARGS)) return false;
    if (!(verifyPokemonIdent(args[1]) && verifyName(args[2]))) return false;
    if (args.length === 3) return true;
    if (args.length === 4) return args[3] === '' || verifyName(args[3]);
    return args.length === 5 &&
      verifyPokemonIdent(args[1]) &&
      verifyEffectName(args[2]) &&
      verifyName(args[3]) &&
      (args[4] === '' || verifyPokemonIdent(args[4]));
  }

  '|-notarget|'(args: Args['|-notarget|']) {
    return args.length === 1 || (args.length === 2 && verifyPokemonIdent(args[1]));
  }

  '|-miss|'(args: Args['|-miss|'], kwArgs: KWArgs['|-miss|']) {
    if (!verifyKWArgs(kwArgs, KWARGS)) return false;
    if (args.length === 2) return verifyPokemonIdent(args[1]);
    return args.length === 3 && verifyPokemonIdent(args[1]) && verifyPokemonIdent(args[2]);
  }

  '|-damage|'(args: Args['|-damage|'], kwArgs: KWArgs['|-damage|']) {
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonHPStatus(args[2]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'partiallytrapped']);
  }

  '|-heal|'(args: Args['|-heal|'], kwArgs: KWArgs['|-heal|']) {
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonHPStatus(args[2]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'wisher', 'zeffect']);
  }

  '|-sethp|'(args: Args['|-sethp|'], kwArgs: KWArgs['|-sethp|']) {
    if (!verifyKWArgs(kwArgs, KWARGS)) return false;
    if (args.length === 3) return verifyPokemonIdent(args[1]) && verifyPokemonHPStatus(args[2]);
    return args.length === 5 &&
      verifyPokemonIdent(args[1]) &&
      verifyNum(args[2]) &&
      verifyPokemonIdent(args[3]) &&
      verifyNum(args[4]);
  }

  '|-status|'(args: Args['|-status|'], kwArgs: KWArgs['|-status|']) {
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyStatusName(args[2]) &&
      verifyKWArgs(kwArgs, KWARGS);
  }

  '|-curestatus|'(args: Args['|-curestatus|'], kwArgs: KWArgs['|-curestatus|']) {
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyStatusName(args[2]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'thaw', 'msg']);
  }

  '|-cureteam|'(args: Args['|-cureteam|'], kwArgs: KWArgs['|-cureteam|']) {
    return args.length === 2 && verifyPokemonIdent(args[1]) && verifyKWArgs(kwArgs, KWARGS);
  }

  '|-boost|'(args: Args['|-boost|'], kwArgs: KWArgs['|-boost|']) {
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyBoostName(args[2]) &&
      verifyNum(args[3]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'multiple', 'zeffect']);
  }

  '|-unboost|'(args: Args['|-unboost|'], kwArgs: KWArgs['|-unboost|']) {
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyBoostName(args[2]) &&
      verifyNum(args[3]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'multiple', 'zeffect']);
  }

  '|-setboost|'(args: Args['|-setboost|'], kwArgs: KWArgs['|-setboost|']) {
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyBoostName(args[2]) &&
      verifyNum(args[3]) &&
      verifyKWArgs(kwArgs, KWARGS);
  }

  '|-swapboost|'(args: Args['|-swapboost|'], kwArgs: KWArgs['|-swapboost|']) {
    if (!verifyKWArgs(kwArgs, KWARGS)) return false;
    if (!(verifyPokemonIdent(args[1]) && verifyPokemonIdent(args[2]))) return false;
    return args.length === 3 || (args.length === 4 && verifyBoostNames(args[3]));
  }

  '|-invertboost|'(args: Args['|-invertboost|'], kwArgs: KWArgs['|-invertboost|']) {
    return args.length === 2 && verifyPokemonIdent(args[1]) && verifyKWArgs(kwArgs, KWARGS);
  }

  '|-clearboost|'(args: Args['|-clearboost|'], kwArgs: KWArgs['|-clearboost|']) {
    return args.length === 2 &&
      verifyPokemonIdent(args[1]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'zeffect']);
  }

  '|-clearallboost|'(args: Args['|-clearallboost|'], kwArgs: KWArgs['|-clearallboost|']) {
    return args.length === 1 && verifyKWArgs(kwArgs, [...KWARGS, 'zeffect']);
  }

  '|-clearpositiveboost|'(
    args: Args['|-clearpositiveboost|'], kwArgs: KWArgs['|-clearpositiveboost|']
  ) {
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyPokemonIdent(args[2]) &&
      verifyEffectName(args[3]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'zeffect']);
  }

  '|-ohko|'(args: Args['|-ohko|']) {
    return args.length === 1;
  }

  '|-clearnegativeboost|'(
    args: Args['|-clearnegativeboost|'], kwArgs: KWArgs['|-clearnegativeboost|']
  ) {
    return args.length === 2 &&
      verifyPokemonIdent(args[1]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'zeffect']);
  }

  '|-copyboost|'(args: Args['|-copyboost|'], kwArgs: KWArgs['|-copyboost|']) {
    if (!(verifyPokemonIdent(args[1]) &&
      verifyPokemonIdent(args[2]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'zeffect']))) {
      return false;
    }
    return args.length === 3 || (args.length === 4) && verifyBoostNames(args[3]);
  }

  '|-weather|'(args: Args['|-weather|'], kwArgs: KWArgs['|-weather|']) {
    return args.length === 2 &&
      (args[1] === 'none' || verifyName(args[1])) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'upkeep']);
  }

  '|-fieldstart|'(args: Args['|-fieldstart|'], kwArgs: KWArgs['|-fieldstart|']) {
    return args.length === 2 && verifyName(args[1]) && verifyKWArgs(kwArgs, KWARGS);
  }

  '|-fieldend|'(args: Args['|-fieldend|'], kwArgs: KWArgs['|-fieldend|']) {
    return args.length === 2 && verifyName(args[1]) && verifyKWArgs(kwArgs, KWARGS);
  }

  '|-sidestart|'(args: Args['|-sidestart|'], kwArgs: KWArgs['|-sidestart|']) {
    return args.length === 3 &&
      verifySide(args[1]) &&
      verifyName(args[2]) &&
      verifyKWArgs(kwArgs, ['silent']);
  }

  '|-sideend|'(args: Args['|-sideend|'], kwArgs: KWArgs['|-sideend|']) {
    return args.length === 3 &&
      verifySide(args[1]) &&
      verifyName(args[2]) &&
      verifyKWArgs(kwArgs, KWARGS);
  }

  '|-start|'(args: Args['|-start|'], kwArgs: KWArgs['|-start|']) {
    const keys: Protocol.BattleArgsWithKWArgType[] =
      [...KWARGS, 'already', 'damage', 'block', 'fatigue', 'upkeep', 'zeffect'];
    if (!verifyKWArgs(kwArgs, keys)) return false;
    if (!verifyPokemonIdent(args[1])) return false;
    if (!(verifyEffectName(args[2] as Protocol.EffectName) || verifyName(args[2]))) return false;
    return args.length === 3 || (args.length === 4 && verifyName(args[3]));
  }

  '|-end|'(args: Args['|-end|'], kwArgs: KWArgs['|-end|']) {
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      (verifyEffectName(args[2] as Protocol.EffectName) || verifyName(args[2])) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'partiallytrapped', 'interrupt']);
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

  '|-immune|'(args: Args['|-immune|'], kwArgs: KWArgs['|-immune|']) {
    if (!(verifyPokemonIdent(args[1]) && verifyKWArgs(kwArgs, [...KWARGS, 'ohko']))) return false;
    return args.length === 2 || (args.length === 3 && args[2] === 'confusion');
  }

  '|-item|'(args: Args['|-item|'], kwArgs: KWArgs['|-item|']) {
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyName(args[2]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'identify']);
  }

  '|-enditem|'(args: Args['|-enditem|'], kwArgs: KWArgs['|-enditem|']) {
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyName(args[2]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'eat', 'move', 'weaken']);
  }

  '|-ability|'(args: Args['|-ability|'], kwArgs: KWArgs['|-ability|']) {
    if (!verifyKWArgs(kwArgs, [...KWARGS, 'move', 'weaken', 'fail'])) return false;
    if (!(verifyPokemonIdent(args[1]) && verifyName(args[2]))) return false;
    if (args.length === 3) return true;
    if (args.length === 4) {
      return args[3] === 'boost' ||
        verifySide(args[3] as Protocol.Side) ||
        verifyPokemonIdent(args[3] as Protocol.PokemonIdent);
    }
    return args.length === 5 && verifyName(args[3]) && verifyPokemonIdent(args[4]);
  }

  '|-endability|'(args: Args['|-endability|'], kwArgs: KWArgs['|-endability|']) {
    if (!verifyKWArgs(kwArgs, KWARGS)) return false;
    if (!verifyPokemonIdent(args[1])) return false;
    return args.length === 2 || (args.length === 3 && (args[2] === 'none' || verifyName(args[2])));
  }

  '|-transform|'(args: Args['|-transform|'], kwArgs: KWArgs['|-transform|']) {
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyName(args[2]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'msg']);
  }

  '|-mega|'(args: Args['|-mega|']) {
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyName(args[2]) &&
      (args[3] === '' || verifyName(args[3]));
  }

  '|-primal|'(args: Args['|-primal|']) {
    return args.length === 2 && verifyPokemonIdent(args[1]);
  }

  '|-burst|'(args: Args['|-burst|']) {
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyName(args[2]) &&
      verifyName(args[3]);
  }

  '|-zpower|'(args: Args['|-zpower|']) {
    return args.length === 2 && verifyPokemonIdent(args[1]);
  }

  '|-zbroken|'(args: Args['|-zbroken|']) {
    return args.length === 2 && verifyPokemonIdent(args[1]);
  }

  '|-activate|'(args: Args['|-activate|'], kwArgs: KWArgs['|-activate|']) {
    const keys: Protocol.BattleArgsWithKWArgType[] = [
      ...KWARGS, 'ability', 'ability2', 'block', 'broken',
      'damage', 'item', 'move', 'number', 'consumed', 'name',
    ];
    if (!verifyKWArgs(kwArgs, keys)) return false;
    if (!(args[1] === '' || verifyPokemonIdent(args[1]))) return false;
    if (!(verifyEffectName(args[2] as Protocol.EffectName) || verifyName(args[2]))) return false;

    if (args.length === 3) return true;
    if (args.length === 4) {
      return args[3] === '' ||
        verifyName(args[3]) ||
        verifyNum(args[3] as Protocol.Num) ||
        verifyPokemonIdent(args[3] as PokemonIdent);
    }
    return args.length === 5 &&
      (args[3] === '' || verifyName(args[3])) &&
      (args[4] === '' || verifyName(args[4]));
  }

  '|-fieldactivate|'(args: Args['|-fieldactivate|'], kwArgs: KWArgs['|-fieldactivate|']) {
    return args.length === 2 &&
      verifyEffectName(args[1]) &&
      verifyKWArgs(kwArgs, KWARGS);
  }

  '|-hint|'(args: Args['|-hint|']) {
    return args.length === 2 && !!args[1];
  }

  '|-center|'(args: Args['|-center|']) {
    return args.length === 1;
  }

  '|-message|'(args: Args['|-message|']) {
    return args.length === 2 && !!args[1];
  }

  '|-combine|'(args: Args['|-combine|']) {
    return args.length === 1;
  }

  '|-waiting|'(args: Args['|-waiting|']) {
    return args.length === 3 && verifyPokemonIdent(args[1]) && verifyPokemonIdent(args[2]);
  }

  '|-prepare|'(args: Args['|-prepare|']) {
    if (!(verifyPokemonIdent(args[1]) && verifyName(args[2]))) return false;
    return args.length === 3 || (args.length === 4 && verifyPokemonIdent(args[3]));
  }

  '|-mustrecharge|'(args: Args['|-mustrecharge|']) {
    return args.length === 2 && verifyPokemonIdent(args[1]);
  }

  '|-hitcount|'(args: Args['|-hitcount|']) {
    return args.length === 3 && verifyPokemonIdent(args[1]) && verifyNum(args[2]);
  }

  '|-singlemove|'(args: Args['|-singlemove|'], kwArgs: KWArgs['|-singlemove|']) {
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyName(args[2]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'zeffect']);
  }

  '|-singleturn|'(args: Args['|-singleturn|'], kwArgs: KWArgs['|-singleturn|']) {
    return args.length === 3 &&
      verifyPokemonIdent(args[1]) &&
      verifyName(args[2]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'zeffect']);
  }

  '|-anim|'(args: Args['|-anim|'], kwArgs: KWArgs['|-anim|']) {
    return args.length === 4 &&
      verifyPokemonIdent(args[1]) &&
      verifyName(args[2]) &&
      verifyPokemonIdent(args[3]) &&
      verifyKWArgs(kwArgs, [...KWARGS, 'spread', 'miss']);
  }
}

export const Verifier = new class {
  handler: Handler;

  constructor() {
    this.handler = new Handler();
  }

  verify(data: string) {
    for (const {roomid, args, kwArgs} of Protocol.parse(data)) {
      if (!verifyRoomID(roomid)) return data;
      if (!this.dispatch(args, kwArgs)) return data;
    }
    return undefined;
  }

  verifyLine(line: string) {
    const parsed = Protocol.parseBattleLine(line);
    const {args, kwArgs} = parsed;
    return this.dispatch(args, kwArgs) ? undefined : parsed;
  }

  dispatch(args: Protocol.ArgType, kwArgs: Protocol.BattleArgsKWArgType) {
    const key = Protocol.key(args);
    if (!key || !this.handler[key]) return false;
    if (Object.keys(kwArgs).length && !(key in Protocol.ARGS_WITH_KWARGS)) return false;
    if (!((this.handler as any)[key](args, kwArgs))) return false;
    return true;
  }
};
