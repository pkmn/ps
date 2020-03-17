import {Protocol, Args, KWArgs} from './index';

describe('Protocol', () => {
  test('#parseNameParts', () => {
    let parts = Protocol.parseNameParts('pre');
    expect(parts.group).toEqual('');
    expect(parts.name).toEqual('pre');
    expect(parts.away).toEqual(false);
    expect(parts.status).toEqual('');

    parts = Protocol.parseNameParts('+pre@!');
    expect(parts.group).toEqual('+');
    expect(parts.name).toEqual('pre');
    expect(parts.away).toEqual(true);
    expect(parts.status).toEqual('');

    parts = Protocol.parseNameParts('~pre@!Away');
    expect(parts.group).toEqual('~');
    expect(parts.name).toEqual('pre');
    expect(parts.away).toEqual(true);
    expect(parts.status).toEqual('Away');

    parts = Protocol.parseNameParts('!pre@Status');
    expect(parts.group).toEqual('!');
    expect(parts.name).toEqual('pre');
    expect(parts.away).toEqual(false);
    expect(parts.status).toEqual('Status');
  });

  // FIXME
  test('#readme', () => {
    class BoostHandler implements Protocol.Handler {
      '-boost'(args: Args['-boost'], kwArgs: KWArgs['-boost']) {
        const [, p, stat, n] = args;
        const pokemon = Protocol.parsePokemonIdent(p);
        const num = Number(n);

        let message = `${pokemon.player}'s ${pokemon.name}'s ${stat} stat was boosted by ${num}`;
        if (kwArgs.from) message += ` from ${Protocol.parseEffect(kwArgs.from).name}`;
        expect(message).toEqual("p2's  Diancie's atk stat was boosted by 2");
      }
    }
    const handler = new BoostHandler();
    const chunk = '>battle-1\n|-boost|p2b: Diancie|atk|2\n|-unboost|p2a: Salamence|def|1';
    const count = {called: 0, looped: 0};
    for (const [roomid, data] of Protocol.handle(chunk)) {
      expect(roomid).toEqual('battle-1');
      if (data.args[0] === '-boost') {
        handler['-boost'](data.args as Args['-boost'], data.kwArgs as KWArgs['-boost']);
        count.called++;
      }
      count.looped++;
    }
    expect(count.called).toEqual(1);
    expect(count.looped).toEqual(2);
  });
});
