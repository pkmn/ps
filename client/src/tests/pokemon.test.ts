import {DetailedPokemon, PokemonHealth} from '@pkmn/protocol';
import {Pokemon, Side} from '../index';

describe('Pokemon', () => {
  test('#healthParse', () => {
    const parse = (
      hpstring: string,
      options = {} as Partial<PokemonHealth> & {parsedamage?: boolean, heal?: boolean}) => {
        const pokemon = new Pokemon(null! as Side, {} as DetailedPokemon);
        for (const attr of ['hp', 'maxhp', 'hpcolor', 'status', 'fainted'] as (keyof PokemonHealth)[]) {
          if (options[attr]) (pokemon as any)[attr] = options[attr];
        }
        const result = pokemon.healthParse(hpstring, !!options.parsedamage, !!options.heal);
        return {pokemon, result};
    };

    const health = (p: Partial<PokemonHealth> = {}) => {
      const ret: PokemonHealth = {
        hp: p.hp || 0,
        maxhp: p.maxhp || 1000,
        hpcolor: p.hpcolor || 'g',
        status: p.status || '',
        fainted: !!p.fainted
      };
      return ret;
    };
    expect(parse(null!).result).toEqual(null);
    expect(parse('').result).toEqual(null);

    let p = parse('0 fnt');
    expect(health(p.pokemon)).toEqual(health({hp: 0, fainted: true}));
    // expect(p.result).toEqual([0, 100, 0, 0, 'g']);

    p = parse('0 fnt');
    expect(health(p.pokemon)).toEqual(health({hp: 0, fainted: true}));

    p = parse('0 fnt', health({maxhp: 250}));
    expect(health(p.pokemon)).toEqual(health({hp: 0, maxhp: 250, fainted: true}));

    p = parse('10/48y fnt');
    expect(health(p.pokemon)).toEqual(health({hp: 0, maxhp: 48, hpcolor: 'y', fainted: true}));

     p = parse('foo/bar');
    expect(health(p.pokemon)).toEqual(health());

    p = parse('350/300 psn');
    expect(health(p.pokemon)).toEqual(health({hp: 300, maxhp: 300, status: 'psn'}));

    p = parse('20 brn');
    expect(health(p.pokemon)).toEqual(health({hp: 200, status: 'brn'}));

    p = parse('20 brn', health({maxhp: 200}));
    expect(health(p.pokemon)).toEqual(health({hp: 40, maxhp: 200, status: 'brn'}));

    p = parse('200/300 psn');
    expect(health(p.pokemon)).toEqual(health({hp: 200, maxhp: 300, status: 'psn'}));

    p = parse('70/100 tox', {status: 'tox'});
    expect(health(p.pokemon)).toEqual(health({hp: 70, maxhp: 100, status: 'tox'}));

    p = parse('70/100 psn', health({status: 'tox'}));
    expect(health(p.pokemon)).toEqual(health({hp: 70, maxhp: 100, status: 'tox'}));

    p = parse('9/48 frz');
    expect(health(p.pokemon)).toEqual(health({hp: 9, maxhp: 48, status: 'frz'}));

    p = parse('9/48 foo');
    expect(health(p.pokemon)).toEqual(health({hp: 9, maxhp: 48}));

    p = parse('9/48y slp');
    expect(health(p.pokemon)).toEqual(health({hp: 9, maxhp: 48, hpcolor: 'y', status: 'slp'}));

    p = parse('24/48y brn');
    expect(health(p.pokemon)).toEqual(health({hp: 24, maxhp: 48, hpcolor: 'y', status: 'brn'}));

    p = parse('24/48g');
    expect(health(p.pokemon)).toEqual(health({hp: 24, maxhp: 48, hpcolor: 'g'}));
  });

});
