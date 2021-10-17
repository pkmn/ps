import {Protocol} from '@pkmn/protocol';

import {ChoiceBuilder} from '../choices';

const RAW_REQUEST = JSON.stringify({
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
}) as Protocol.RequestJSON;

const REQUEST = Protocol.parseRequest(RAW_REQUEST) as Protocol.MoveRequest;

describe('ChoiceBuilder', () => {
  it('fillPasses', () => {
    expect(new ChoiceBuilder(
      {requestType: 'move', active: [null, null, {}]} as unknown as Protocol.Request
    ).choices).toEqual(['pass', 'pass']);
    expect(new ChoiceBuilder(
      {requestType: 'switch', forceSwitch: [null, {}, null]} as unknown as Protocol.Request
    ).choices).toEqual(['pass']);
  });

  it('requestLength', () => {
    expect(new ChoiceBuilder(
      {requestType: 'move', active: [{}, {}]} as Protocol.Request
    ).requestLength()).toBe(2);
    expect(new ChoiceBuilder(
      {requestType: 'switch', forceSwitch: [null]} as unknown as Protocol.Request
    ).requestLength()).toBe(1);
    expect(new ChoiceBuilder({requestType: 'team'} as Protocol.Request).requestLength()).toBe(1);
    expect(new ChoiceBuilder(
      {requestType: 'team', maxTeamSize: 6} as Protocol.Request
    ).requestLength()).toBe(6);
    expect(new ChoiceBuilder({requestType: 'wait'} as Protocol.Request).requestLength()).toBe(0);
  });

  it('index', () => {
    expect(new ChoiceBuilder(
      {requestType: 'move', active: [{}, null]} as Protocol.Request
    ).index()).toBe(0);
    expect(new ChoiceBuilder(
      {requestType: 'switch', forceSwitch: [null]} as unknown as Protocol.Request
    ).index()).toBe(1);
    expect(new ChoiceBuilder({requestType: 'team'} as Protocol.Request).index()).toBe(0);
    expect(new ChoiceBuilder({requestType: 'wait'} as Protocol.Request).index()).toBe(0);
  });

  it('isDone', () => {
    expect(new ChoiceBuilder(
      {requestType: 'move', active: [null, null]} as Protocol.Request
    ).isDone()).toBe(true);
    expect(new ChoiceBuilder(
      {requestType: 'switch', forceSwitch: [null]} as unknown as Protocol.Request
    ).isDone()).toBe(true);
    expect(new ChoiceBuilder({requestType: 'team'} as Protocol.Request).isDone()).toBe(false);
    expect(new ChoiceBuilder({requestType: 'wait'} as Protocol.Request).isDone()).toBe(true);
  });

  it('isEmpty', () => {
    expect(new ChoiceBuilder(
      {requestType: 'move', active: [null, null, {}]} as unknown as Protocol.Request
    ).isEmpty()).toBe(true);

    const b = new ChoiceBuilder(REQUEST);
    b.addChoice('move 1');
    expect(b.isEmpty()).toBe(false);
  });

  it('currentMoveRequest', () => {
    expect(new ChoiceBuilder({requestType: 'wait'} as Protocol.Request).currentMoveRequest())
      .toBeUndefined();
    expect(new ChoiceBuilder(REQUEST).currentMoveRequest()).toBe(REQUEST.active[0]);
  });

  it('addChoice', () => {
    let b = new ChoiceBuilder({requestType: 'wait'} as Protocol.Request);
    expect(b.addChoice('move 1')).toBe('It\'s not your turn to choose anything');

    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('shift')).toBeUndefined(); // BUG

    b = new ChoiceBuilder(
      {requestType: 'switch', forceSwitch: [null, {}, null]} as unknown as Protocol.Request
    );
    expect(b.addChoice('move 1')).toBe('You must switch in a Pokémon, not move');

    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('foobar')).toBe('Unrecognized choice \'foobar\'');

    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('pass')).toBe('The client handles passes for you automatically already');

    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('move 1 dynamax')).toBeUndefined(); // BUG

    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('move 1 2 3')).toBe('Move choice has multiple targets');

    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('move Hidden Power Bug')).toBeUndefined(); // BUG

    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('move kno ck Off')).toBeUndefined();

    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('team 1')).toBe('That Pokémon is already in battle!');

    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('team 6')).toBeUndefined(); // BUG

    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('switch Heatmor')).toBeUndefined();

    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('switch H E A T M O R')).toBeUndefined();

    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('switch foobar')).toBe('Couldn\'t find Pokémon \'foobar\' to switch to');

    REQUEST.side.pokemon[2].fainted = true;
    b = new ChoiceBuilder(REQUEST);
    expect(b.addChoice('switch 3')).toBe('Heatmor is fainted and cannot battle!');
  });

  it('toString', () => {
    let b = new ChoiceBuilder(REQUEST);
    b.addChoice('move Knock Off 2 dynamax');
    expect(b.toString()).toBe('move 3 +2');

    b = new ChoiceBuilder(REQUEST);
    b.addChoice('switch Gligar');
    expect(b.toString()).toBe('switch 6');

    b = new ChoiceBuilder({
      requestType: 'team',
      maxTeamSize: 6,
      side: {
        pokemon: [{}, {}, {}, {}, {}, {}],
      },
    } as Protocol.Request);
    b.addChoice('team 4');
    b.addChoice('team 2');
    expect(b.toString()).toBe('team 4, 2');
  });
});
