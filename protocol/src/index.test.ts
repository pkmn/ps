import {Protocol, PokemonHealth, Args, KWArgs} from './index';

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

  test('#parseHealth', () => {
    const parse = (hpstring: string, output?: PokemonHealth) =>
      Protocol.parseHealth(hpstring as Protocol.PokemonHPStatus, output);
    const health = (h: Partial<PokemonHealth>) =>
      ({hp: 0, maxhp: 100, hpcolor: '', status: '', ...h} as PokemonHealth);
    expect(parse('0 fnt')).toEqual(health({hp: 0, fainted: true}));
    expect(parse('0 fnt', health({maxhp: 250}))).toEqual(health({hp: 0, maxhp: 250, fainted: true}));
    expect(parse('10/48y fnt')).toEqual(health({hp: 0, maxhp: 48, hpcolor: 'y', fainted: true}));
    expect(parse('foo/bar')).toEqual(null);
    expect(parse('350/300 psn')).toEqual(health({hp: 300, maxhp: 300, status: 'psn'}));
    expect(parse('20 brn')).toEqual(health({hp: 20, status: 'brn'}));
    expect(parse('20 brn', health({maxhp: 200}))).toEqual(health({hp: 40, maxhp: 200, status: 'brn'}));
    expect(parse('200/300 psn')).toEqual(health({hp: 200, maxhp: 300, status: 'psn'}));
    expect(parse('70/100 tox')).toEqual(health({hp: 70, status: 'tox'}));
    expect(parse('70/100 psn', health({status: 'tox'}))).toEqual(health({hp: 70, status: 'tox'}));
    expect(parse('9/48 frz')).toEqual(health({hp: 9, maxhp: 48, status: 'frz'}));
    expect(parse('9/48 foo')).toEqual(health({hp: 9, maxhp: 48}));
    expect(parse('9/48y slp')).toEqual(health({hp: 9, maxhp: 48, hpcolor: 'y', status: 'slp'}));
    expect(parse('24/48y brn')).toEqual(health({hp: 24, maxhp: 48, hpcolor: 'y', status: 'brn'}));
    expect(parse('24/48g')).toEqual(health({hp: 24, maxhp: 48, hpcolor: 'g'}));
  });

  // FIXME
  test('#readme', () => {
    class BoostHandler implements Protocol.Handler {
      '|-boost|'(args: Args['|-boost|'], kwArgs: KWArgs['|-boost|']) {
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
    for (const [roomid, data] of Protocol.parse(chunk)) {
      expect(roomid).toEqual('battle-1');
      if (data.args[0] === '-boost') {
        handler['|-boost|'](data.args as Args['|-boost|'], data.kwArgs as KWArgs['|-boost|']);
        count.called++;
      }
      count.looped++;
    }
    expect(count.called).toEqual(1);
    expect(count.looped).toEqual(2);
  });
});
