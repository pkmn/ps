import {Protocol, Args, KWArgs} from '@pkmn/protocol';
import {Battle} from './battle';

export class Handler implements Protocol.Handler {
  readonly battle: Battle;

  constructor(id: Protocol.RoomID) {
    this.battle = new Battle(id);
  }

  '|init|'(args: Args['|init|']) { }
  '|title|'(args: Args['|title|']) { }
  '|userlist|'(args: Args['|userlist|']) { }
  '||'(args: Args['||']) { }
  '|html|'(args: Args['|html|']) { }
  '|uhtml|'(args: Args['|uhtml|']) { }
  '|uhtmlchange|'(args: Args['|uhtmlchange|']) { }
  '|join|'(args: Args['|join|']) { }
  '|leave|'(args: Args['|leave|']) { }
  '|name|'(args: Args['|name|']) { }
  '|chat|'(args: Args['|chat|']) { }
  '|:|'(args: Args['|:|']) { }
  '|c:|'(args: Args['|c:|']) { }
  '|battle|'(args: Args['|battle|']) { }
  '|popup|'(args: Args['|popup|']) { }
  '|pm|'(args: Args['|pm|']) { }
  '|usercount|'(args: Args['|usercount|']) { }
  '|nametaken|'(args: Args['|nametaken|']) { }
  '|challstr|'(args: Args['|challstr|']) { }
  '|updateuser|'(args: Args['|updateuser|']) { }
  '|formats|'(args: Args['|formats|']) { }
  '|updatesearch|'(args: Args['|updatesearch|']) { }
  '|switchout|'(args: Args['|switchout|'], kwArgs: KWArgs['|switchout|']) { }
  '|updatechallenges|'(args: Args['|updatechallenges|']) { }
  '|queryresponse|'(args: Args['|queryresponse|']) { }
  '|unlink|'(args: Args['|unlink|']) { }
  '|raw|'(args: Args['|raw|']) { }
  '|warning|'(args: Args['|warning|']) { }
  '|error|'(args: Args['|error|']) { }
  '|bigerror|'(args: Args['|bigerror|']) { }
  '|chatmsg|'(args: Args['|chatmsg|']) { }
  '|chatmsg-raw|'(args: Args['|chatmsg-raw|']) { }
  '|controlshtml|'(args: Args['|controlshtml|']) { }
  '|fieldhtml|'(args: Args['|fieldhtml|']) { }
  '|debug|'(args: Args['|debug|']) { }
  '|tournament|create|'(args: Args['|tournament|create|']) { }
  '|tournament|update|'(args: Args['|tournament|update|']) { }
  '|tournament|updateEnd|'(args: Args['|tournament|updateEnd|']) { }
  '|tournament|error|'(args: Args['|tournament|error|']) { }
  '|tournament|forceend|'(args: Args['|tournament|forceend|']) { }
  '|tournament|join|'(args: Args['|tournament|join|']) { }
  '|tournament|leave|'(args: Args['|tournament|leave|']) { }
  '|tournament|replace|'(args: Args['|tournament|replace|']) { }
  '|tournament|start|'(args: Args['|tournament|start|']) { }
  '|tournament|disqualify|'(args: Args['|tournament|disqualify|']) { }
  '|tournament|battlestart|'(args: Args['|tournament|battlestart|']) { }
  '|tournament|battleend|'(args: Args['|tournament|battleend|']) { }
  '|tournament|end|'(args: Args['|tournament|end|']) { }
  '|tournament|autostart|'(args: Args['|tournament|autostart|']) { }
  '|tournament|autodq|'(args: Args['|tournament|autodq|']) { }
  '|player|'(args: Args['|player|']) { }
  '|teamsize|'(args: Args['|teamsize|']) { }
  '|gametype|'(args: Args['|gametype|']) { }
  '|gen|'(args: Args['|gen|']) { }
  '|tier|'(args: Args['|tier|']) { }
  '|rated|'(args: Args['|rated|']) { }
  '|seed|'(args: Args['|seed|']) { }
  '|rule|'(args: Args['|rule|']) { }
  '|teampreview|'(args: Args['|teampreview|']) { }
  '|clearpoke|'(args: Args['|clearpoke|']) { }
  '|poke|'(args: Args['|poke|']) { }
  '|start|'(args: Args['|start|']) { }
  '|done|'(args: Args['|done|']) { }
  '|request|'(args: Args['|request|']) { }
  '|inactive|'(args: Args['|inactive|']) { }
  '|inactiveoff|'(args: Args['|inactiveoff|']) { }
  '|upkeep|'(args: Args['|upkeep|']) { }
  '|turn|'(args: Args['|turn|']) { }
  '|win|'(args: Args['|win|']) { }
  '|tie|'(args: Args['|tie|']) { }
  '|move|'(args: Args['|move|'], kwArgs: KWArgs['|move|']) { }
  '|switch|'(args: Args['|switch|']) { }
  '|drag|'(args: Args['|drag|']) { }
  '|detailschange|'(args: Args['|detailschange|'], kwArgs: KWArgs['|detailschange|']) { }
  '|replace|'(args: Args['|replace|']) { }
  '|swap|'(args: Args['|swap|'], kwArgs: KWArgs['|swap|']) { }
  '|cant|'(args: Args['|cant|'], kwArgs: KWArgs['|cant|']) { }
  '|faint|'(args: Args['|faint|']) { }
  '|message|'(args: Args['|message|']) { }
  '|-formechange|'(args: Args['|-formechange|'], kwArgs: KWArgs['|-formechange|']) { }
  '|-fail|'(args: Args['|-fail|'], kwArgs: KWArgs['|-fail|']) { }
  '|-block|'(args: Args['|-block|'], kwArgs: KWArgs['|-block|']) { }
  '|-notarget|'(args: Args['|-notarget|']) { }
  '|-miss|'(args: Args['|-miss|'], kwArgs: KWArgs['|-miss|']) { }
  '|-damage|'(args: Args['|-damage|'], kwArgs: KWArgs['|-damage|']) { }
  '|-heal|'(args: Args['|-heal|'], kwArgs: KWArgs['|-heal|']) { }
  '|-sethp|'(args: Args['|-sethp|'], kwArgs: KWArgs['|-sethp|']) { }
  '|-status|'(args: Args['|-status|'], kwArgs: KWArgs['|-status|']) { }
  '|-curestatus|'(args: Args['|-curestatus|'], kwArgs: KWArgs['|-curestatus|']) { }
  '|-cureteam|'(args: Args['|-cureteam|'], kwArgs: KWArgs['|-cureteam|']) { }
  '|-boost|'(args: Args['|-boost|'], kwArgs: KWArgs['|-boost|']) { }
  '|-unboost|'(args: Args['|-unboost|'], kwArgs: KWArgs['|-unboost|']) { }
  '|-setboost|'(args: Args['|-setboost|'], kwArgs: KWArgs['|-setboost|']) { }
  '|-swapboost|'(args: Args['|-swapboost|'], kwArgs: KWArgs['|-swapboost|']) { }
  '|-invertboost|'(args: Args['|-invertboost|'], kwArgs: KWArgs['|-invertboost|']) { }
  '|-clearboost|'(args: Args['|-clearboost|'], kwArgs: KWArgs['|-clearboost|']) { }
  '|-clearallboost|'(args: Args['|-clearallboost|'], kwArgs: KWArgs['|-clearallboost|']) { }
  '|-clearpositiveboost|'(args: Args['|-clearpositiveboost|'], kwArgs: KWArgs['|-clearpositiveboost|']) { }
  '|-ohko|'(args: Args['|-ohko|']) { }
  '|-clearnegativeboost|'(args: Args['|-clearnegativeboost|'], kwArgs: KWArgs['|-clearnegativeboost|']) { }
  '|-copyboost|'(args: Args['|-copyboost|'], kwArgs: KWArgs['|-copyboost|']) { }
  '|-weather|'(args: Args['|-weather|'], kwArgs: KWArgs['|-weather|']) { }
  '|-fieldstart|'(args: Args['|-fieldstart|'], kwArgs: KWArgs['|-fieldstart|']) { }
  '|-fieldend|'(args: Args['|-fieldend|'], kwArgs: KWArgs['|-fieldend|']) { }
  '|-sidestart|'(args: Args['|-sidestart|']) { }
  '|-sideend|'(args: Args['|-sideend|'], kwArgs: KWArgs['|-sideend|']) { }
  '|-start|'(args: Args['|-start|'], kwArgs: KWArgs['|-start|']) { }
  '|-end|'(args: Args['|-end|'], kwArgs: KWArgs['|-end|']) { }
  '|-crit|'(args: Args['|-crit|'], kwArgs: KWArgs['|-crit|']) { }
  '|-supereffective|'(args: Args['|-supereffective|'], kwArgs: KWArgs['|-supereffective|']) { }
  '|-resisted|'(args: Args['|-resisted|'], kwArgs: KWArgs['|-resisted|']) { }
  '|-immune|'(args: Args['|-immune|'], kwArgs: KWArgs['|-immune|']) { }
  '|-item|'(args: Args['|-item|'], kwArgs: KWArgs['|-item|']) { }
  '|-enditem|'(args: Args['|-enditem|'], kwArgs: KWArgs['|-enditem|']) { }
  '|-ability|'(args: Args['|-ability|'], kwArgs: KWArgs['|-ability|']) { }
  '|-endability|'(args: Args['|-endability|'], kwArgs: KWArgs['|-endability|']) { }
  '|-transform|'(args: Args['|-transform|'], kwArgs: KWArgs['|-transform|']) { }
  '|-mega|'(args: Args['|-mega|']) { }
  '|-primal|'(args: Args['|-primal|']) { }
  '|-burst|'(args: Args['|-burst|']) { }
  '|-zpower|'(args: Args['|-zpower|']) { }
  '|-zbroken|'(args: Args['|-zbroken|']) { }
  '|-activate|'(args: Args['|-activate|'], kwArgs: KWArgs['|-activate|']) { }
  '|-fieldactivate|'(args: Args['|-fieldactivate|'], kwArgs: KWArgs['|-fieldactivate|']) { }
  '|-hint|'(args: Args['|-hint|']) { }
  '|-center|'(args: Args['|-center|']) { }
  '|-message|'(args: Args['|-message|']) { }
  '|-combine|'(args: Args['|-combine|']) { }
  '|-waiting|'(args: Args['|-waiting|']) { }
  '|-prepare|'(args: Args['|-prepare|']) { }
  '|-mustrecharge|'(args: Args['|-mustrecharge|']) { }
  '|-hitcount|'(args: Args['|-hitcount|']) { }
  '|-singlemove|'(args: Args['|-singlemove|'], kwArgs: KWArgs['|-singlemove|']) { }
  '|-singleturn|'(args: Args['|-singleturn|'], kwArgs: KWArgs['|-singleturn|']) { }
  '|-anim|'(args: Args['|-anim|']) { }
}