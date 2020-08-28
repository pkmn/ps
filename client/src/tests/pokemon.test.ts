import {DetailedPokemon, PokemonHealth} from '@pkmn/protocol';
import {Pokemon, Side} from '../index';

describe('Pokemon', () => {
  it('#healthParse', () => {
    const parse = (
      hpstring: string,
      options = {} as Partial<PokemonHealth>
    ) => {
      const pokemon = new Pokemon(null! as Side, {} as DetailedPokemon);
      const attrs: Array<keyof PokemonHealth> = ['hp', 'maxhp', 'hpcolor', 'status', 'fainted'];
      for (const attr of attrs) {
        if (options[attr]) (pokemon as any)[attr] = options[attr];
      }
      const result = pokemon.healthParse(hpstring);
      return {pokemon, result};
    };

    const health = (p: Partial<PokemonHealth> = {}) => {
      const ret: PokemonHealth = {
        hp: p.hp || 0,
        maxhp: p.maxhp || 0,
        hpcolor: p.hpcolor || 'g',
        status: p.status || '',
        fainted: !!p.fainted,
      };
      return ret;
    };
    expect(parse(null!).result).toBeNull();
    expect(parse('').result).toBeNull();

    let p = parse('0 fnt');
    expect(health(p.pokemon)).toEqual(health({hp: 0, maxhp: 100, fainted: true}));
    expect(p.result).toEqual([-100, 100, 100, 'g']);

    p = parse('0 fnt', health({fainted: true}));
    expect(health(p.pokemon)).toEqual(health({hp: 0, maxhp: 100, fainted: true}));
    expect(p.result).toEqual([-100, 100, 100, 'g']);

    p = parse('0 fnt', health({maxhp: 250}));
    expect(health(p.pokemon)).toEqual(health({hp: 0, maxhp: 250, fainted: true}));
    expect(p.result).toEqual([-1, 250, 1, 'g']);

    p = parse('0 fnt', health({hp: 200, maxhp: 250}));
    expect(health(p.pokemon)).toEqual(health({hp: 0, maxhp: 250, fainted: true}));
    expect(p.result).toEqual([-200, 250, 200, 'g']);

    p = parse('10/48y fnt');
    expect(health(p.pokemon)).toEqual(health({hp: 0, maxhp: 48, hpcolor: 'y', fainted: true}));
    expect(p.result).toEqual([-48, 48, 48, 'g']);

    p = parse('10/48y fnt', health({hp: 20, maxhp: 48, hpcolor: 'y'}));
    expect(health(p.pokemon)).toEqual(health({hp: 0, maxhp: 48, hpcolor: 'y', fainted: true}));
    expect(p.result).toEqual([-20, 48, 20, 'y']);

    p = parse('foo/bar');
    expect(health(p.pokemon)).toEqual(health());
    expect(p.result).toEqual([0, 0, 0, 'g']);

    p = parse('350/300 psn');
    expect(health(p.pokemon)).toEqual(health({hp: 300, maxhp: 300, status: 'psn'}));
    expect(p.result).toEqual([0, 300, 300, 'g']);
  });
});
