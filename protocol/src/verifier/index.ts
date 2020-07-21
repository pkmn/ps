/* eslint-disable */ // FIXME
import {ID} from '@pkmn/types';

import {Protocol, Args, ArgType, KWArgs, KWArgType} from '../index';

export const Verifier = new class {
  handler: Handler;

  constructor() {
    this.handler = new Handler();
  }

  verify(data: string) {
    for (const parsed of Protocol.parse(data)) {
      const [roomid, {args, kwArgs}] = parsed;
      if (!this.verifyRoomID(roomid)) return parsed;
      const key = Protocol.key(args);
      if (!key || !this.handler[key]) return parsed;
      if (!((this.handler as any)[key](args, kwArgs))) return parsed;
    }
    return null;
  }

  verifyLine(line: string) {
    const parsed = Protocol.parseBattleLine(line);
    const {args, kwArgs} = parsed;
    const key = Protocol.key(args);
    if (!key || !this.handler[key]) return parsed;
    if (!((this.handler as any)[key](args, kwArgs))) return parsed;
    return null;
  }

  verifyRoomID(roomid: Protocol.RoomID) {
    return true;
  }

  verifyUserList(roomid: Protocol.UserList) {
    return false; // TODO
  }

  verifyUHTMLName(uhtmlname: Protocol.UHTMLName) {
    return true;
  }

  verifyUsername(roomid: Protocol.Username) {
    return false; // TODO
  }

  verifyID(id: ID) {
    return /[a-z0-9]+/.test(id);
  }

  verifyTimestamp(timestamp: Protocol.Timestamp) {
    return false; // TODO
  }
};

class Handler implements Protocol.Handler<boolean> {
  '|init|'(args: Args['|init|']) {
    if (args.length !== 2) return false;
    return (['chat', 'battle'].includes(args[1]));
  }

  '|title|'(args: Args['|title|']) {
    return args.length === 2;
  }

  '|userlist|'(args: Args['|userlist|']) {
    if (args.length !== 2) return false;
    return Verifier.verifyUserList(args[1]);
  }

  '||'(args: Args['||']) {
    return args.length === 2;
  }

  '|html|'(args: Args['|html|']) {
    return args.length === 2;
  }

  '|uhtml|'(args: Args['|uhtml|']) {
    if (args.length !== 3) return false;
    return Verifier.verifyUHTMLName(args[1]);
  }

  '|uhtmlchange|'(args: Args['|uhtmlchange|']) {
    if (args.length !== 3) return false;
    return Verifier.verifyUHTMLName(args[1]);
  }

  '|join|'(args: Args['|join|']) {
    if (args.length !== 3) return false;
    if (typeof args[2] !== 'boolean') return false;
    return Verifier.verifyUsername(args[1]);
  }

  '|leave|'(args: Args['|leave|']) {
    if (args.length !== 3) return false;
    if (typeof args[2] !== 'boolean') return false;
    return Verifier.verifyUsername(args[1]);
  }

  '|name|'(args: Args['|name|']) {
    if (args.length !== 4) return false;
    if (typeof args[3] !== 'boolean') return false;
    return Verifier.verifyUsername(args[1]) && Verifier.verifyID(args[2]) ;
  }

  '|chat|'(args: Args['|chat|']) {
    if (args.length !== 3) return false;
    return Verifier.verifyUsername(args[1]);
  }

  '|notify|'(args: Args['|notify|']) {
    return false;
  }

  '|:|'(args: Args['|:|']) {
    if (args.length !== 2) return false;
    return Verifier.verifyTimestamp(args[1]);
  }

  '|t:|'(args: Args['|t:|']) {
    if (args.length !== 2) return false;
    return Verifier.verifyTimestamp(args[1]);
  }

  '|c:|'(args: Args['|c:|']) {
    if (args.length !== 4) return false;
    return Verifier.verifyTimestamp(args[1]) && Verifier.verifyUsername(args[2]);
  }

  '|battle|'(args: Args['|battle|']) {
    if (args.length !== 4) return false;
    return Verifier.verifyRoomID(args[1]) &&
      Verifier.verifyUsername(args[2]) &&
      Verifier.verifyUsername(args[3]);
  }

  '|popup|'(args: Args['|popup|']) {
    return false;
  }

  '|pm|'(args: Args['|pm|']) {
    return false;
  }

  '|usercount|'(args: Args['|usercount|']) {
    return false;
  }

  '|nametaken|'(args: Args['|nametaken|']) {
    return false;
  }

  '|challstr|'(args: Args['|challstr|']) {
    return false;
  }

  '|updateuser|'(args: Args['|updateuser|']) {
    return false;
  }

  '|formats|'(args: Args['|formats|']) {
    return false;
  }

  '|updatesearch|'(args: Args['|updatesearch|']) {
    return false;
  }

  '|switchout|'(args: Args['|switchout|'], kwArgs: KWArgs['|switchout|']) {
    return false;
  }

  '|message|'(args: Args['|message|']) {
    return false;
  }

  '|updatechallenges|'(args: Args['|updatechallenges|']) {
    return false;
  }

  '|queryresponse|'(args: Args['|queryresponse|']) {
    return false;
  }

  '|unlink|'(args: Args['|unlink|']) {
    return false;
  }

  '|raw|'(args: Args['|raw|']) {
    return false;
  }

  '|warning|'(args: Args['|warning|']) {
    return false;
  }

  '|error|'(args: Args['|error|']) {
    return false;
  }

  '|bigerror|'(args: Args['|bigerror|']) {
    return false;
  }

  '|chatmsg|'(args: Args['|chatmsg|']) {
    return false;
  }

  '|chatmsg-raw|'(args: Args['|chatmsg-raw|']) {
    return false;
  }

  '|controlshtml|'(args: Args['|controlshtml|']) {
    return false;
  }

  '|fieldhtml|'(args: Args['|fieldhtml|']) {
    return false;
  }

  '|debug|'(args: Args['|debug|']) {
    return false;
  }

  '|tournament|create|'(args: Args['|tournament|create|']) {
    return false;
  }

  '|tournament|update|'(args: Args['|tournament|update|']) {
    return false;
  }

  '|tournament|updateEnd|'(args: Args['|tournament|updateEnd|']) {
    return false;
  }

  '|tournament|error|'(args: Args['|tournament|error|']) {
    return false;
  }

  '|tournament|forceend|'(args: Args['|tournament|forceend|']) {
    return false;
  }

  '|tournament|join|'(args: Args['|tournament|join|']) {
    return false;
  }

  '|tournament|leave|'(args: Args['|tournament|leave|']) {
    return false;
  }

  '|tournament|replace|'(args: Args['|tournament|replace|']) {
    return false;
  }

  '|tournament|start|'(args: Args['|tournament|start|']) {
    return false;
  }

  '|tournament|disqualify|'(args: Args['|tournament|disqualify|']) {
    return false;
  }

  '|tournament|battlestart|'(args: Args['|tournament|battlestart|']) {
    return false;
  }

  '|tournament|battleend|'(args: Args['|tournament|battleend|']) {
    return false;
  }

  '|tournament|end|'(args: Args['|tournament|end|']) {
    return false;
  }

  '|tournament|scouting|'(args: Args['|tournament|scouting|']) {
    return false;
  }

  '|tournament|autostart|'(args: Args['|tournament|autostart|']) {
    return false;
  }

  '|tournament|autodq|'(args: Args['|tournament|autodq|']) {
    return false;
  }

  '|player|'(args: Args['|player|']) {
    return false;
  }

  '|teamsize|'(args: Args['|teamsize|']) {
    return false;
  }

  '|gametype|'(args: Args['|gametype|']) {
    return false;
  }

  '|gen|'(args: Args['|gen|']) {
    return false;
  }

  '|tier|'(args: Args['|tier|']) {
    return false;
  }

  '|rated|'(args: Args['|rated|']) {
    return false;
  }

  '|seed|'(args: Args['|seed|']) {
    return false;
  }

  '|rule|'(args: Args['|rule|']) {
    return false;
  }

  '|teampreview|'(args: Args['|teampreview|']) {
    return false;
  }

  '|clearpoke|'(args: Args['|clearpoke|']) {
    return false;
  }

  '|poke|'(args: Args['|poke|']) {
    return false;
  }

  '|start|'(args: Args['|start|']) {
    return false;
  }

  '|done|'(args: Args['|done|']) {
    return false;
  }

  '|request|'(args: Args['|request|']) {
    return false;
  }

  '|inactive|'(args: Args['|inactive|']) {
    return false;
  }

  '|inactiveoff|'(args: Args['|inactiveoff|']) {
    return false;
  }

  '|upkeep|'(args: Args['|upkeep|']) {
    return false;
  }

  '|turn|'(args: Args['|turn|']) {
    return false;
  }

  '|win|'(args: Args['|win|']) {
    return false;
  }

  '|tie|'(args: Args['|tie|']) {
    return false;
  }

  '|move|'(args: Args['|move|'], kwArgs: KWArgs['|move|']) {
    return false;
  }

  '|switch|'(args: Args['|switch|']) {
    return false;
  }

  '|drag|'(args: Args['|drag|']) {
    return false;
  }

  '|detailschange|'(args: Args['|detailschange|'], kwArgs: KWArgs['|detailschange|']) {
    return false;
  }

  '|replace|'(args: Args['|replace|']) {
    return false;
  }

  '|swap|'(args: Args['|swap|'], kwArgs: KWArgs['|swap|']) {
    return false;
  }

  '|cant|'(args: Args['|cant|'], kwArgs: KWArgs['|cant|']) {
    return false;
  }

  '|faint|'(args: Args['|faint|']) {
    return false;
  }

  '|-formechange|'(args: Args['|-formechange|'], kwArgs: KWArgs['|-formechange|']) {
    return false;
  }

  '|-fail|'(args: Args['|-fail|'], kwArgs: KWArgs['|-fail|']) {
    return false;
  }

  '|-block|'(args: Args['|-block|'], kwArgs: KWArgs['|-block|']) {
    return false;
  }

  '|-notarget|'(args: Args['|-notarget|']) {
    return false;
  }

  '|-miss|'(args: Args['|-miss|'], kwArgs: KWArgs['|-miss|']) {
    return false;
  }

  '|-damage|'(args: Args['|-damage|'], kwArgs: KWArgs['|-damage|']) {
    return false;
  }

  '|-heal|'(args: Args['|-heal|'], kwArgs: KWArgs['|-heal|']) {
    return false;
  }

  '|-sethp|'(args: Args['|-sethp|'], kwArgs: KWArgs['|-sethp|']) {
    return false;
  }

  '|-status|'(args: Args['|-status|'], kwArgs: KWArgs['|-status|']) {
    return false;
  }

  '|-curestatus|'(args: Args['|-curestatus|'], kwArgs: KWArgs['|-curestatus|']) {
    return false;
  }

  '|-cureteam|'(args: Args['|-cureteam|'], kwArgs: KWArgs['|-cureteam|']) {
    return false;
  }

  '|-boost|'(args: Args['|-boost|'], kwArgs: KWArgs['|-boost|']) {
    return false;
  }

  '|-unboost|'(args: Args['|-unboost|'], kwArgs: KWArgs['|-unboost|']) {
    return false;
  }

  '|-setboost|'(args: Args['|-setboost|'], kwArgs: KWArgs['|-setboost|']) {
    return false;
  }

  '|-swapboost|'(args: Args['|-swapboost|'], kwArgs: KWArgs['|-swapboost|']) {
    return false;
  }

  '|-invertboost|'(args: Args['|-invertboost|'], kwArgs: KWArgs['|-invertboost|']) {
    return false;
  }

  '|-clearboost|'(args: Args['|-clearboost|'], kwArgs: KWArgs['|-clearboost|']) {
    return false;
  }

  '|-clearallboost|'(args: Args['|-clearallboost|'], kwArgs: KWArgs['|-clearallboost|']) {
    return false;
  }

  '|-clearpositiveboost|'(args: Args['|-clearpositiveboost|'], kwArgs: KWArgs['|-clearpositiveboost|']) {
    return false;
  }

  '|-ohko|'(args: Args['|-ohko|']) {
    return false;
  }

  '|-clearnegativeboost|'(args: Args['|-clearnegativeboost|'], kwArgs: KWArgs['|-clearnegativeboost|']) {
    return false;
  }

  '|-copyboost|'(args: Args['|-copyboost|'], kwArgs: KWArgs['|-copyboost|']) {
    return false;
  }

  '|-weather|'(args: Args['|-weather|'], kwArgs: KWArgs['|-weather|']) {
    return false;
  }

  '|-fieldstart|'(args: Args['|-fieldstart|'], kwArgs: KWArgs['|-fieldstart|']) {
    return false;
  }

  '|-fieldend|'(args: Args['|-fieldend|'], kwArgs: KWArgs['|-fieldend|']) {
    return false;
  }

  '|-sidestart|'(args: Args['|-sidestart|']) {
    return false;
  }

  '|-sideend|'(args: Args['|-sideend|'], kwArgs: KWArgs['|-sideend|']) {
    return false;
  }

  '|-start|'(args: Args['|-start|'], kwArgs: KWArgs['|-start|']) {
    return false;
  }

  '|-end|'(args: Args['|-end|'], kwArgs: KWArgs['|-end|']) {
    return false;
  }

  '|-crit|'(args: Args['|-crit|'], kwArgs: KWArgs['|-crit|']) {
    return false;
  }

  '|-supereffective|'(args: Args['|-supereffective|'], kwArgs: KWArgs['|-supereffective|']) {
    return false;
  }

  '|-resisted|'(args: Args['|-resisted|'], kwArgs: KWArgs['|-resisted|']) {
    return false;
  }

  '|-immune|'(args: Args['|-immune|'], kwArgs: KWArgs['|-immune|']) {
    return false;
  }

  '|-item|'(args: Args['|-item|'], kwArgs: KWArgs['|-item|']) {
    return false;
  }

  '|-enditem|'(args: Args['|-enditem|'], kwArgs: KWArgs['|-enditem|']) {
    return false;
  }

  '|-ability|'(args: Args['|-ability|'], kwArgs: KWArgs['|-ability|']) {
    return false;
  }

  '|-endability|'(args: Args['|-endability|'], kwArgs: KWArgs['|-endability|']) {
    return false;
  }

  '|-transform|'(args: Args['|-transform|'], kwArgs: KWArgs['|-transform|']) {
    return false;
  }

  '|-mega|'(args: Args['|-mega|']) {
    return false;
  }

  '|-primal|'(args: Args['|-primal|']) {
    return false;
  }

  '|-burst|'(args: Args['|-burst|']) {
    return false;
  }

  '|-zpower|'(args: Args['|-zpower|']) {
    return false;
  }

  '|-zbroken|'(args: Args['|-zbroken|']) {
    return false;
  }

  '|-activate|'(args: Args['|-activate|'], kwArgs: KWArgs['|-activate|']) {
    return false;
  }

  '|-fieldactivate|'(args: Args['|-fieldactivate|'], kwArgs: KWArgs['|-fieldactivate|']) {
    return false;
  }

  '|-hint|'(args: Args['|-hint|']) {
    return false;
  }

  '|-center|'(args: Args['|-center|']) {
    return false;
  }

  '|-message|'(args: Args['|-message|']) {
    return false;
  }

  '|-combine|'(args: Args['|-combine|']) {
    return false;
  }

  '|-waiting|'(args: Args['|-waiting|']) {
    return false;
  }

  '|-prepare|'(args: Args['|-prepare|']) {
    return false;
  }

  '|-mustrecharge|'(args: Args['|-mustrecharge|']) {
    return false;
  }

  '|-hitcount|'(args: Args['|-hitcount|']) {
    return false;
  }

  '|-singlemove|'(args: Args['|-singlemove|'], kwArgs: KWArgs['|-singlemove|']) {
    return false;
  }

  '|-singleturn|'(args: Args['|-singleturn|'], kwArgs: KWArgs['|-singleturn|']) {
    return false;
  }

  '|-anim|'(args: Args['|-anim|']) {
    return false;
  }
}
