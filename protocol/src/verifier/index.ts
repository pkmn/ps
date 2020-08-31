/* eslint-disable */ // FIXME
import {ID, Player} from '@pkmn/types';

import {Protocol, Args, KWArgs} from '../index';

const QUERYTYPES = ['userdetails', 'roomlist', 'rooms', 'laddertop', 'roominfo', 'savereplay'];
const GAMETYPES = ['singles', 'doubles', 'triples', 'multi', 'free-for-all', 'rotation'];
const PLAYERS = ['p1', 'p2', 'p3', 'p4'];

export const Verifier = new class {
  handler: Handler;

  constructor() {
    this.handler = new Handler();
  }

  verify(data: string) {
    for (const parsed of Protocol.parse(data)) {
      const [roomid, {args, kwArgs}] = parsed;
      if (!this.verifyRoomID(roomid)) return parsed;
      if (!this.dispatch(args, kwArgs)) return parsed;
    }
    return null;
  }

  verifyLine(line: string) {
    const parsed = Protocol.parseBattleLine(line);
    const {args, kwArgs} = parsed;
    return this.dispatch(args, kwArgs) ? null : parsed;
  }

  dispatch(args: Protocol.ArgType, kwArgs: Protocol.BattleArgsKWArgType) {
    const key = Protocol.key(args);
    if (!key || !this.handler[key]) return false;
    if (Object.keys(kwArgs).length && !(key in Protocol.ARGS_WITH_KWARGS))return false;
    if (!((this.handler as any)[key](args, kwArgs))) return false;
    return false;
  }

  verifyRoomID(roomid: Protocol.RoomID) {
    return /[-a-z0-9]+/.test(roomid);
  }

  verifyID(id: ID) {
    return /[a-z0-9]+/.test(id);
  }

  verifyName(s: string) {
    return !!s && !this.verifyID(s as ID);
  }

  verifyTimestamp(timestamp: Protocol.Timestamp) {
    return /\d+/.test(timestamp);
  }

  verifyJSON(json: string) {
    try {
      JSON.parse(json);
      return true;
    } catch {
      return false;
    }
  }

  verifyNum(num: Protocol.Num) {
    return !isNaN(+num);
  }

  verifyPokemonIdent(ident: Protocol.PokemonIdent) {
    return false; // FIXME
  }

  verifyPokemonDetails(details: Protocol.PokemonDetails) {
    return false; // FIXME
  }

  verifyPokemonHPStatus(details: Protocol.PokemonHPStatus) {
    return false; // FIXME
  }

  verifyPlayer(player: Player) {
    return PLAYERS.includes(player);
  }

  verifyScore(score: Protocol.Score) {
    return false; // FIXME
  }
};

class Handler implements Protocol.Handler<boolean> {
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
    return !!args[1] && Verifier.verifyID(args[2]) ;
  }

  '|chat|'(args: Args['|chat|']) {
    return args.length === 3 && !!args[1];
  }

  '|notify|'(args: Args['|notify|']) {
    return args.length >= 2 && args.length <= 4 && (args as any).every((a: string) => !!a);
  }

  '|:|'(args: Args['|:|']) {
    return args.length === 2 && Verifier.verifyTimestamp(args[1]);
  }

  '|t:|'(args: Args['|t:|']) {
    return args.length === 2 && Verifier.verifyTimestamp(args[1]);
  }

  '|c:|'(args: Args['|c:|']) {
    return args.length === 4 && Verifier.verifyTimestamp(args[1]) && !!args[2];
  }

  '|battle|'(args: Args['|battle|']) {
    return args.length === 4 && Verifier.verifyRoomID(args[1]) && !!args[2] && !!args[3];
  }

  '|popup|'(args: Args['|popup|']) {
    return args.length === 2 && !!args[1];
  }

  '|pm|'(args: Args['|pm|']) {
    return args.length === 4 && args.every((a: string) => !!a);;
  }

  '|usercount|'(args: Args['|usercount|']) {
    return args.length === 2 && Verifier.verifyNum(args[1]);
  }

  '|nametaken|'(args: Args['|nametaken|']) {
    return args.length === 3 && !args[1] && !args[2];
  }

  '|challstr|'(args: Args['|challstr|']) {
    return args.length === 3 && args[1] === '4' && !!args[2];
  }

  '|updateuser|'(args: Args['|updateuser|']) {
    if (args.length < 5) return false;
    return !!args[1] &&
      (args[2] === '0' || args[2] === '1') &&
      !!args[3] &&
      Verifier.verifyJSON(args[4]);
  }

  '|formats|'(args: Args['|formats|']) {
    return args.length === 2 && !!args[1];
  }

  '|updatesearch|'(args: Args['|updatesearch|']) {
    return args.length === 2 && Verifier.verifyJSON(args[1]);
  }

  '|switchout|'(args: Args['|switchout|'], kwArgs: KWArgs['|switchout|']) {
    return false; // FIXME
  }

  '|message|'(args: Args['|message|']) {
    return args.length === 2 && !!args[1];
  }

  '|updatechallenges|'(args: Args['|updatechallenges|']) {
    return args.length === 2 && Verifier.verifyJSON(args[1]);
  }

  '|queryresponse|'(args: Args['|queryresponse|']) {
    return args.length === 3 && QUERYTYPES.includes(args[1]) && Verifier.verifyJSON(args[2]);
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
    return args.length === 4 && !!args[2] && Verifier.verifyNum(args[3] as Protocol.Num);
  }

  '|tournament|update|'(args: Args['|tournament|update|']) {
    return args.length === 3 && Verifier.verifyJSON(args[2]);
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
    return args.length === 3 && Verifier.verifyNum(args[2]);
  }

  '|tournament|disqualify|'(args: Args['|tournament|disqualify|']) {
    return args.length === 3 && !!args[2];
  }

  '|tournament|battlestart|'(args: Args['|tournament|battlestart|']) {
    return args.length === 5 && !!args[2] && !!args[3] && Verifier.verifyRoomID(args[4]);
  }

  '|tournament|battleend|'(args: Args['|tournament|battleend|']) {
    if (args.length !== 7) return false;
    if (!args[2] || !args[3]) return false;
    if (!Verifier.verifyScore(args[5])) return false;
    if (args[6] === 'success') {
      return ['win', 'loss', 'draw'].includes(args[4]);
    } else if (args[6] === 'fail') {
      return args[4] === 'draw';
    } else {
      return false;
    }
  }

  '|tournament|end|'(args: Args['|tournament|end|']) {
    return args.length === 3 && Verifier.verifyJSON(args[2]);
  }

  '|tournament|scouting|'(args: Args['|tournament|scouting|']) {
    return args.length === 3 && (args[2] === 'allow' || args[2] === 'disallow');
  }

  '|tournament|autostart|'(args: Args['|tournament|autostart|']) {
    return (args.length === 3 && args[2] === 'off') ||
      (args.length === 4 && args[2] === 'on' && Verifier.verifyNum(args[3]));
  }

  '|tournament|autodq|'(args: Args['|tournament|autodq|']) {
    return (args.length === 3 && args[2] === 'off') ||
      (args.length === 4 && ['on', 'target'].includes(args[2]) && Verifier.verifyNum(args[3]));
  }

  '|player|'(args: Args['|player|']) {
    if (args.length === 2) return Verifier.verifyPlayer(args[1]);
    if (args.length === 4) return Verifier.verifyPlayer(args[1]) && !!args[2] && !!args[3];
    if (args.length !== 5) return false;
    return Verifier.verifyPlayer(args[1]) && !!args[2] && !!args[3] && Verifier.verifyNum(args[4]!);
  }

  '|teamsize|'(args: Args['|teamsize|']) {
    return args.length === 3 && Verifier.verifyPlayer(args[1]) && Verifier.verifyNum(args[2]);
  }

  '|gametype|'(args: Args['|gametype|']) {
    return args.length === 2 && GAMETYPES.includes(args[1]);
  }

  '|gen|'(args: Args['|gen|']) {
    const gen = +args[1];
    return args.length === 2 && gen >= 1 && gen <= 8;
  }

  '|tier|'(args: Args['|tier|']) {
    return args.length === 2 && Verifier.verifyName(args[1]);
  }

  '|rated|'(args: Args['|rated|']) {
    return args.length === 2 && !!args[1];
  }

  '|seed|'(args: Args['|seed|']) {
    return args.length === 2 && /(\d|,)+/.test(args[1]);
  }

  '|rule|'(args: Args['|rule|']) {
    return args.length === 2 && args[1].startsWith('RULE: ');
  }

  '|teampreview|'(args: Args['|teampreview|']) {
    return args.length === 1 || (args.length === 2 && Verifier.verifyNum(args[1]));
  }

  '|clearpoke|'(args: Args['|clearpoke|']) {
    return args.length === 1;
  }

  '|poke|'(args: Args['|poke|']) {
    return args.length === 4 &&
      Verifier.verifyPlayer(args[1]) &&
      Verifier.verifyPokemonDetails(args[2]) &&
      (args[3] === 'item' || args[3] === '');
  }

  '|start|'(args: Args['|start|']) {
    return args.length === 1;
  }

  '|done|'(args: Args['|done|']) {
    return args.length === 1;
  }

  '|request|'(args: Args['|request|']) {
    return args.length === 2 && Verifier.verifyJSON(args[1]);
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
    return args.length === 2 && Verifier.verifyNum(args[1]);
  }

  '|win|'(args: Args['|win|']) {
    return args.length === 2 && !!args[1];
  }

  '|tie|'(args: Args['|tie|']) {
    return args.length === 1;
  }

  '|move|'(args: Args['|move|'], kwArgs: KWArgs['|move|']) {
    return false; // FIXME
  }

  '|switch|'(args: Args['|switch|']) {
    return args.length === 4 &&
      Verifier.verifyPokemonIdent(args[1]) &&
      Verifier.verifyPokemonDetails(args[2]) &&
      Verifier.verifyPokemonHPStatus(args[3]);
  }

  '|drag|'(args: Args['|drag|']) {
    return args.length === 4 &&
      Verifier.verifyPokemonIdent(args[1]) &&
      Verifier.verifyPokemonDetails(args[2]) &&
      Verifier.verifyPokemonHPStatus(args[3]);
  }

  '|detailschange|'(args: Args['|detailschange|'], kwArgs: KWArgs['|detailschange|']) {
    return false; // FIXME
  }

  '|replace|'(args: Args['|replace|']) {
    return args.length === 4 &&
      Verifier.verifyPokemonIdent(args[1]) &&
      Verifier.verifyPokemonDetails(args[2]) &&
      Verifier.verifyPokemonHPStatus(args[3]);
  }

  '|swap|'(args: Args['|swap|'], kwArgs: KWArgs['|swap|']) {
    return false; // FIXME
  }

  '|cant|'(args: Args['|cant|'], kwArgs: KWArgs['|cant|']) {
    return false; // FIXME
  }

  '|faint|'(args: Args['|faint|']) {
    return args.length === 2 && Verifier.verifyPokemonIdent(args[1]);
  }

  '|-formechange|'(args: Args['|-formechange|'], kwArgs: KWArgs['|-formechange|']) {
    return false; // FIXME
  }

  '|-fail|'(args: Args['|-fail|'], kwArgs: KWArgs['|-fail|']) {
    return false; // FIXME
  }

  '|-block|'(args: Args['|-block|'], kwArgs: KWArgs['|-block|']) {
    return false; // FIXME
  }

  '|-notarget|'(args: Args['|-notarget|']) {
    return args.length === 1 || (args.length === 2 && Verifier.verifyPokemonIdent(args[1]));
  }

  '|-miss|'(args: Args['|-miss|'], kwArgs: KWArgs['|-miss|']) {
    return false; // FIXME
  }

  '|-damage|'(args: Args['|-damage|'], kwArgs: KWArgs['|-damage|']) {
    return false; // FIXME
  }

  '|-heal|'(args: Args['|-heal|'], kwArgs: KWArgs['|-heal|']) {
    return false; // FIXME
  }

  '|-sethp|'(args: Args['|-sethp|'], kwArgs: KWArgs['|-sethp|']) {
    return false; // FIXME
  }

  '|-status|'(args: Args['|-status|'], kwArgs: KWArgs['|-status|']) {
    return false; // FIXME
  }

  '|-curestatus|'(args: Args['|-curestatus|'], kwArgs: KWArgs['|-curestatus|']) {
    return false; // FIXME
  }

  '|-cureteam|'(args: Args['|-cureteam|'], kwArgs: KWArgs['|-cureteam|']) {
    return false; // FIXME
  }

  '|-boost|'(args: Args['|-boost|'], kwArgs: KWArgs['|-boost|']) {
    return false; // FIXME
  }

  '|-unboost|'(args: Args['|-unboost|'], kwArgs: KWArgs['|-unboost|']) {
    return false; // FIXME
  }

  '|-setboost|'(args: Args['|-setboost|'], kwArgs: KWArgs['|-setboost|']) {
    return false; // FIXME
  }

  '|-swapboost|'(args: Args['|-swapboost|'], kwArgs: KWArgs['|-swapboost|']) {
    return false; // FIXME
  }

  '|-invertboost|'(args: Args['|-invertboost|'], kwArgs: KWArgs['|-invertboost|']) {
    return false; // FIXME
  }

  '|-clearboost|'(args: Args['|-clearboost|'], kwArgs: KWArgs['|-clearboost|']) {
    return false; // FIXME
  }

  '|-clearallboost|'(args: Args['|-clearallboost|'], kwArgs: KWArgs['|-clearallboost|']) {
    return false; // FIXME
  }

  '|-clearpositiveboost|'(args: Args['|-clearpositiveboost|'], kwArgs: KWArgs['|-clearpositiveboost|']) {
    return false; // FIXME
  }

  '|-ohko|'(args: Args['|-ohko|']) {
    return args.length === 1;
  }

  '|-clearnegativeboost|'(args: Args['|-clearnegativeboost|'], kwArgs: KWArgs['|-clearnegativeboost|']) {
    return false; // FIXME
  }

  '|-copyboost|'(args: Args['|-copyboost|'], kwArgs: KWArgs['|-copyboost|']) {
    return false; // FIXME
  }

  '|-weather|'(args: Args['|-weather|'], kwArgs: KWArgs['|-weather|']) {
    return false; // FIXME
  }

  '|-fieldstart|'(args: Args['|-fieldstart|'], kwArgs: KWArgs['|-fieldstart|']) {
    return false; // FIXME
  }

  '|-fieldend|'(args: Args['|-fieldend|'], kwArgs: KWArgs['|-fieldend|']) {
    return false; // FIXME
  }

  '|-sidestart|'(args: Args['|-sidestart|']) {
    return args.length === 3 && Verifier.verifyPlayer(args[1]) && Verifier.verifyName(args[2]);
  }

  '|-sideend|'(args: Args['|-sideend|'], kwArgs: KWArgs['|-sideend|']) {
    return false; // FIXME
  }

  '|-start|'(args: Args['|-start|'], kwArgs: KWArgs['|-start|']) {
    return false; // FIXME
  }

  '|-end|'(args: Args['|-end|'], kwArgs: KWArgs['|-end|']) {
    return false; // FIXME
  }

  '|-crit|'(args: Args['|-crit|'], kwArgs: KWArgs['|-crit|']) {
    return false; // FIXME
  }

  '|-supereffective|'(args: Args['|-supereffective|'], kwArgs: KWArgs['|-supereffective|']) {
    return false; // FIXME
  }

  '|-resisted|'(args: Args['|-resisted|'], kwArgs: KWArgs['|-resisted|']) {
    return false; // FIXME
  }

  '|-immune|'(args: Args['|-immune|'], kwArgs: KWArgs['|-immune|']) {
    return false; // FIXME
  }

  '|-item|'(args: Args['|-item|'], kwArgs: KWArgs['|-item|']) {
    return false; // FIXME
  }

  '|-enditem|'(args: Args['|-enditem|'], kwArgs: KWArgs['|-enditem|']) {
    return false; // FIXME
  }

  '|-ability|'(args: Args['|-ability|'], kwArgs: KWArgs['|-ability|']) {
    return false; // FIXME
  }

  '|-endability|'(args: Args['|-endability|'], kwArgs: KWArgs['|-endability|']) {
    return false; // FIXME
  }

  '|-transform|'(args: Args['|-transform|'], kwArgs: KWArgs['|-transform|']) {
    return false; // FIXME
  }

  '|-mega|'(args: Args['|-mega|']) {
    return args.length === 4 &&
      Verifier.verifyPokemonIdent(args[1]) &&
      Verifier.verifyName(args[2]) &&
      Verifier.verifyName(args[3]);
  }

  '|-primal|'(args: Args['|-primal|']) {
    return args.length === 2 && Verifier.verifyPokemonIdent(args[1]);
  }

  '|-burst|'(args: Args['|-burst|']) {
    return args.length === 4 &&
      Verifier.verifyPokemonIdent(args[1]) &&
      Verifier.verifyName(args[2]) &&
      Verifier.verifyName(args[3]);
  }

  '|-zpower|'(args: Args['|-zpower|']) {
    return args.length === 2 && Verifier.verifyPokemonIdent(args[1]);
  }

  '|-zbroken|'(args: Args['|-zbroken|']) {
    return args.length === 2 && Verifier.verifyPokemonIdent(args[1]);
  }

  '|-activate|'(args: Args['|-activate|'], kwArgs: KWArgs['|-activate|']) {
    return false; // FIXME
  }

  '|-fieldactivate|'(args: Args['|-fieldactivate|'], kwArgs: KWArgs['|-fieldactivate|']) {
    return false; // FIXME
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
    return args.length === 3 &&
      Verifier.verifyPokemonIdent(args[1]) &&
      Verifier.verifyPokemonIdent(args[2]);
  }

  '|-prepare|'(args: Args['|-prepare|']) {
    return args.length === 4 &&
      Verifier.verifyPokemonIdent(args[1]) &&
      Verifier.verifyName(args[2]) &&
      Verifier.verifyPokemonIdent(args[3]);
  }

  '|-mustrecharge|'(args: Args['|-mustrecharge|']) {
    return args.length === 2 && Verifier.verifyPokemonIdent(args[1]);
  }

  '|-hitcount|'(args: Args['|-hitcount|']) {
    return args.length === 3 && Verifier.verifyPokemonIdent(args[1]) && Verifier.verifyNum(args[2]);
  }

  '|-singlemove|'(args: Args['|-singlemove|'], kwArgs: KWArgs['|-singlemove|']) {
    return false; // FIXME
  }

  '|-singleturn|'(args: Args['|-singleturn|'], kwArgs: KWArgs['|-singleturn|']) {
    return false; // FIXME
  }

  '|-anim|'(args: Args['|-anim|']) {
    return args.length === 4 &&
      Verifier.verifyPokemonIdent(args[1]) &&
      Verifier.verifyName(args[2]) &&
      Verifier.verifyPokemonIdent(args[3]);
  }
}
