import {Protocol, PokemonHealth, Args, KWArgs} from './index';

import * as fs from 'fs';
import * as path from 'path';

const REQUEST = {
  'active': [
    {
      'moves': [
        {
          'move': 'Light Screen',
          'id': 'lightscreen',
          'pp': 48,
          'maxpp': 48,
          'target': 'allySide',
          'disabled': false,
        },
        {
          'move': 'U-turn',
          'id': 'uturn',
          'pp': 32,
          'maxpp': 32,
          'target': 'normal',
          'disabled': false,
        },
        {
          'move': 'Knock Off',
          'id': 'knockoff',
          'pp': 32,
          'maxpp': 32,
          'target': 'normal',
          'disabled': false,
        },
        {
          'move': 'Roost',
          'id': 'roost',
          'pp': 16,
          'maxpp': 16,
          'target': 'self',
          'disabled': false,
        },
      ],
    },
  ],
  'side': {
    'name': 'Zarel',
    'id': 'p2',
    'pokemon': [
      {
        'ident': 'p2: Ledian',
        'details': 'Ledian, L83, M',
        'condition': '227/227',
        'active': true,
        'stats': {
          'atk': 106,
          'def': 131,
          'spa': 139,
          'spd': 230,
          'spe': 189,
        },
        'moves': [
          'lightscreen',
          'uturn',
          'knockoff',
          'roost',
        ],
        'baseAbility': 'swarm',
        'item': 'leftovers',
        'pokeball': 'pokeball',
        'ability': 'swarm',
      },
      {
        'ident': 'p2: Pyukumuku',
        'details': 'Pyukumuku, L83, F',
        'condition': '227/227',
        'active': false,
        'stats': {
          'atk': 104,
          'def': 263,
          'spa': 97,
          'spd': 263,
          'spe': 56,
        },
        'moves': [
          'recover',
          'counter',
          'lightscreen',
          'reflect',
        ],
        'baseAbility': 'innardsout',
        'item': 'lightclay',
        'pokeball': 'pokeball',
        'ability': 'innardsout',
      },
      {
        'ident': 'p2: Heatmor',
        'details': 'Heatmor, L83, F',
        'condition': '277/277',
        'active': false,
        'stats': {
          'atk': 209,
          'def': 157,
          'spa': 222,
          'spd': 157,
          'spe': 156,
        },
        'moves': [
          'fireblast',
          'suckerpunch',
          'gigadrain',
          'focusblast',
        ],
        'baseAbility': 'flashfire',
        'item': 'lifeorb',
        'pokeball': 'pokeball',
        'ability': 'flashfire',
      },
      {
        'ident': 'p2: Reuniclus',
        'details': 'Reuniclus, L78, M',
        'condition': '300/300',
        'active': false,
        'stats': {
          'atk': 106,
          'def': 162,
          'spa': 240,
          'spd': 178,
          'spe': 92,
        },
        'moves': [
          'shadowball',
          'recover',
          'calmmind',
          'psyshock',
        ],
        'baseAbility': 'magicguard',
        'item': 'lifeorb',
        'pokeball': 'pokeball',
        'ability': 'magicguard',
      },
      {
        'ident': 'p2: Minun',
        'details': 'Minun, L83, F',
        'condition': '235/235',
        'active': false,
        'stats': {
          'atk': 71,
          'def': 131,
          'spa': 172,
          'spd': 189,
          'spe': 205,
        },
        'moves': [
          'hiddenpowerice60',
          'nastyplot',
          'substitute',
          'thunderbolt',
        ],
        'baseAbility': 'voltabsorb',
        'item': 'leftovers',
        'pokeball': 'pokeball',
        'ability': 'voltabsorb',
      },
      {
        'ident': 'p2: Gligar',
        'details': 'Gligar, L79, M',
        'condition': '232/232',
        'active': false,
        'stats': {
          'atk': 164,
          'def': 211,
          'spa': 101,
          'spd': 148,
          'spe': 180,
        },
        'moves': [
          'toxic',
          'stealthrock',
          'roost',
          'earthquake',
        ],
        'baseAbility': 'hypercutter',
        'item': 'eviolite',
        'pokeball': 'pokeball',
        'ability': 'hypercutter',
      },
    ],
  },
  'rqid': 3,
};

// NOTE: tested exhaustively in integration/src/test/sim.js
describe('Protocol', () => {
  it('#key', () => {
    expect(Protocol.key(['init', 'chat'])).toBe('|init|');
    expect(Protocol.key(['tournament', 'updateEnd'])).toBe('|tournament|updateEnd|');
    expect(Protocol.key(['foo', 'bar'] as unknown as Protocol.ArgType)).toBeUndefined();
  });

  it('#parse', () => {
    class BoostHandler implements Protocol.Handler {
      '|-boost|'(args: Args['|-boost|'], kwArgs: KWArgs['|-boost|']) {
        const [, p, stat, n] = args;
        const pokemon = Protocol.parsePokemonIdent(p);
        const num = Number(n);

        let message = `${pokemon.player}'s ${pokemon.name}'s ${stat} stat was boosted by ${num}`;
        if (kwArgs.from) message += ` from ${Protocol.parseEffect(kwArgs.from).name}`;
        expect(message).toBe('p2\'s Diancie\'s atk stat was boosted by 2');
      }
    }
    const handler = new BoostHandler();
    const chunk = '>battle-1\n|-boost|p2b: Diancie|atk|2\n|-unboost|p2a: Salamence|def|1';
    const count = {called: 0, looped: 0};
    for (const {roomid, args, kwArgs} of Protocol.parse(chunk)) {
      expect(roomid).toBe('battle-1');
      if (args[0] === '-boost') {
        handler['|-boost|'](args, kwArgs as KWArgs['|-boost|']);
        count.called++;
      }
      count.looped++;
    }
    expect(count.called).toBe(1);
    expect(count.looped).toBe(2);
  });

  it('#parsePokemonIdent', () => {
    let parts = Protocol.parsePokemonIdent('p1a: Squirtle' as Protocol.PokemonIdent);
    expect(parts.player).toBe('p1');
    expect(parts.position).toBe('a');
    expect(parts.name).toBe('Squirtle');

    parts = Protocol.parsePokemonIdent('p2b: Bulbasaur' as Protocol.PokemonIdent);
    expect(parts.player).toBe('p2');
    expect(parts.position).toBe('b');
    expect(parts.name).toBe('Bulbasaur');

    parts = Protocol.parsePokemonIdent('p2: Charmander' as Protocol.PokemonIdent);
    expect(parts.player).toBe('p2');
    expect(parts.position).toBeNull();
    expect(parts.name).toBe('Charmander');
  });

  it('#parseDetails', () => {
    let details = Protocol.parseDetails(
      '',
      '' as Protocol.PokemonIdent,
      'Arceus-*' as Protocol.PokemonDetails
    );
    expect(details.name).toBe('');
    expect(details.speciesForme).toBe('Arceus-*');
    expect(details.level).toBe(100);
    expect(details.shiny).toBe(false);
    expect(details.gender).toBeUndefined();
    expect(details.ident).toBe('');
    expect(details.searchid).toBe('');

    details = Protocol.parseDetails(
      'Deoxys-Speed',
      'p1a: Deoxys-Speed' as Protocol.PokemonIdent,
      'Deoxys-Speed' as Protocol.PokemonDetails
    );
    expect(details.name).toBe('Deoxys-Speed');
    expect(details.speciesForme).toBe('Deoxys-Speed');
    expect(details.level).toBe(100);
    expect(details.shiny).toBe(false);
    expect(details.gender).toBeUndefined();
    expect(details.ident).toBe('p1a: Deoxys-Speed');
    expect(details.searchid).toBe('p1a: Deoxys-Speed|Deoxys-Speed');

    details = Protocol.parseDetails(
      'Sawsbuck',
      'p2b: Sawsbuck' as Protocol.PokemonIdent,
      'Sawsbuck, L50, F, shiny' as Protocol.PokemonDetails
    );
    expect(details.name).toBe('Sawsbuck');
    expect(details.speciesForme).toBe('Sawsbuck');
    expect(details.level).toBe(50);
    expect(details.shiny).toBe(true);
    expect(details.gender).toBe('F');
    expect(details.ident).toBe('p2b: Sawsbuck');
    expect(details.searchid).toBe('p2b: Sawsbuck|Sawsbuck, L50, F, shiny');
  });

  it('#parseHealth', () => {
    const parse = (hpstring: string, output?: PokemonHealth) =>
      Protocol.parseHealth(hpstring as Protocol.PokemonHPStatus, output);
    const health = (h: Partial<PokemonHealth>) =>
      ({hp: 0, maxhp: 100, hpcolor: '', ...h} as PokemonHealth);
    expect(parse('0 fnt')).toEqual(health({hp: 0, fainted: true}));
    expect(parse('0 fnt', health({maxhp: 250})))
      .toEqual(health({hp: 0, maxhp: 250, fainted: true}));
    expect(parse('10/48y fnt')).toEqual(health({hp: 0, maxhp: 48, hpcolor: 'y', fainted: true}));
    expect(parse('foo/bar')).toBeNull();
    expect(parse('350/300 psn')).toEqual(health({hp: 300, maxhp: 300, status: 'psn'}));
    expect(parse('20 brn')).toEqual(health({hp: 20, status: 'brn'}));
    expect(parse('20 brn', health({maxhp: 200})))
      .toEqual(health({hp: 40, maxhp: 200, status: 'brn'}));
    expect(parse('200/300 psn')).toEqual(health({hp: 200, maxhp: 300, status: 'psn'}));
    expect(parse('70/100 tox')).toEqual(health({hp: 70, status: 'tox'}));
    expect(parse('70/100 psn', health({status: 'tox'}))).toEqual(health({hp: 70, status: 'tox'}));
    expect(parse('9/48 frz')).toEqual(health({hp: 9, maxhp: 48, status: 'frz'}));
    expect(parse('9/48 foo')).toEqual(health({hp: 9, maxhp: 48}));
    expect(parse('9/48y slp')).toEqual(health({hp: 9, maxhp: 48, hpcolor: 'y', status: 'slp'}));
    expect(parse('24/48y brn')).toEqual(health({hp: 24, maxhp: 48, hpcolor: 'y', status: 'brn'}));
    expect(parse('24/48g')).toEqual(health({hp: 24, maxhp: 48, hpcolor: 'g'}));
  });

  it('#parseEffect', () => {
    let parts = Protocol.parseEffect();
    expect(parts.name).toBe('');
    expect(parts.type).toBeUndefined();

    parts = Protocol.parseEffect('Foo ');
    expect(parts.name).toBe('Foo');
    expect(parts.type).toBeUndefined();

    parts = Protocol.parseEffect('item: Leftovers', x => x.toUpperCase());
    expect(parts.name).toBe(' LEFTOVERS');
    expect(parts.type).toBe('item');

    parts = Protocol.parseEffect('move: Tackle');
    expect(parts.name).toBe('Tackle');
    expect(parts.type).toBe('move');

    parts = Protocol.parseEffect('foo: Bar');
    expect(parts.name).toBe('foo: Bar');
    expect(parts.type).toBeUndefined();

    parts = Protocol.parseEffect('ability: Magic Guard');
    expect(parts.name).toBe('Magic Guard');
    expect(parts.type).toBe('ability');
  });

  it('#parseRequest', () => {
    const request = Protocol.parseRequest(JSON.stringify(REQUEST) as Protocol.RequestJSON);
    expect(request.requestType).toBe('move');
    const moveRequest = request as Protocol.MoveRequest;
    expect(moveRequest.rqid).toBe(3);
    expect(moveRequest.side.pokemon[2].level).toBe(83);
    expect(moveRequest.active[0]!.moves[0].id).toBe('lightscreen');
    expect(moveRequest.noCancel).toBeUndefined();
  });

  it('#parseNameParts', () => {
    let parts = Protocol.parseNameParts('pre');
    expect(parts.group).toBe('');
    expect(parts.name).toBe('pre');
    expect(parts.away).toBe(false);
    expect(parts.status).toBe('');

    parts = Protocol.parseNameParts('+pre@!');
    expect(parts.group).toBe('+');
    expect(parts.name).toBe('pre');
    expect(parts.away).toBe(true);
    expect(parts.status).toBe('');

    parts = Protocol.parseNameParts('~pre@!Away');
    expect(parts.group).toBe('~');
    expect(parts.name).toBe('pre');
    expect(parts.away).toBe(true);
    expect(parts.status).toBe('Away');

    parts = Protocol.parseNameParts('!pre@Status');
    expect(parts.group).toBe('!');
    expect(parts.name).toBe('pre');
    expect(parts.away).toBe(false);
    expect(parts.status).toBe('Status');
  });
});

describe('Bundle', () => {
  it('usage', () => {
    {
      const window = {} as {Protocol: typeof Protocol};
      // eslint-disable-next-line no-eval
      eval(fs.readFileSync(path.resolve(__dirname, '../build/production.min.js'), 'utf8'));

      expect(window.Protocol.key(['init', 'chat'])).toBe('|init|');
      const parts = Protocol.parseEffect('move: Tackle');
      expect(parts.name).toBe('Tackle');
      expect(parts.type).toBe('move');
    }
  });
});
