import * as fs from 'fs';
import * as path from 'path';

import {calculate, Pokemon, Move} from '@smogon/calc/adaptable';
import * as I from '@smogon/calc/data/interface';

import {Generations as calc} from '@smogon/calc';
import {Dex} from '@pkmn/dex';
import {Generations} from '../index';
const pkmn = new Generations(Dex);

const gens = [1, 2, 3, 4, 5, 6, 7, 8] as I.GenerationNum[];

describe('Generations', () => {
  it('abilities', () => {
    for (const gen of gens) {
      const p = Array.from(pkmn.get(gen).abilities);
      const c = new Map<I.ID, I.Ability>();
      for (const ability of calc.get(gen).abilities) c.set(ability.id, ability);

      expect(p).toHaveLength(c.size);
      for (const ability of p) {
        expect(ability).toEqual(c.get(ability.id));
        c.delete(ability.id);
      }
      expect(c.size).toBe(0);
    }
  });

  it('items', () => {
    for (const gen of gens) {
      const p = Array.from(pkmn.get(gen).items);
      const c = new Map<I.ID, I.Item>();
      for (const item of calc.get(gen).items) c.set(item.id, item);

      expect(p).toHaveLength(c.size);
      for (const item of p) {
        expect(item).toEqual(c.get(item.id));
        c.delete(item.id);
      }
      expect(c.size).toBe(0);
    }
  });

  it.skip('moves', () => {
    for (const gen of gens) {
      const p = Array.from(pkmn.get(gen).moves);
      const c = new Map<I.ID, I.Move>();
      for (const move of calc.get(gen).moves) c.set(move.id, move);

      expect(p).toHaveLength(c.size);
      for (const move of p) {
        expect(move).toEqual(c.get(move.id));
        c.delete(move.id);
      }
      expect(c.size).toBe(0);
    }
  });

  it('species', () => {
    for (const gen of gens) {
      const p = Array.from(pkmn.get(gen).species);
      const c = new Map<I.ID, I.Specie>();
      for (const specie of calc.get(gen).species) c.set(specie.id, specie);

      expect(p).toHaveLength(c.size);
      for (const specie of p) {
        expect(specie).toEqual(c.get(specie.id));
        c.delete(specie.id);
      }
      expect(c.size).toBe(0);
    }
  });

  it('types', () => {
    for (const gen of gens) {
      const p = Array.from(pkmn.get(gen).types);
      const c = new Map<I.ID, I.Type>();
      for (const type of calc.get(gen).types) c.set(type.id, type);

      expect(p).toHaveLength(c.size);
      for (const type of p) {
        expect(type).toEqual(c.get(type.id));
        c.delete(type.id);
      }
      expect(c.size).toBe(0);
    }
  });

  it('natures', () => {
    for (const gen of gens) {
      const p = Array.from(pkmn.get(gen).natures);
      const c = new Map<I.ID, I.Nature>();
      for (const nature of calc.get(gen).natures) c.set(nature.id, nature);

      expect(p).toHaveLength(c.size);
      for (const nature of p) {
        expect(nature).toEqual(c.get(nature.id));
        c.delete(nature.id);
      }
      expect(c.size).toBe(0);
    }
  });
});

describe('Adaptable', () => {
  it('usage', () => {
    const gen = pkmn.get(5);
    const result = calculate(
      gen,
      new Pokemon(gen, 'Gengar', {
        item: 'Choice Specs' as I.ItemName,
        nature: 'Timid',
        evs: {spa: 252},
        boosts: {spa: 1},
      }),
      new Pokemon(gen, 'Chansey', {
        item: 'Eviolite' as I.ItemName,
        nature: 'Calm',
        evs: {hp: 252, spd: 252},
      }),
      new Move(gen, 'Focus Blast')
    );
    expect(result.damage[0]).toEqual(274);
    expect(result.damage[result.damage.length - 1]).toBe(324);
  });
});

describe('Bundle', () => {
  it('usage', () => {
    {
      const window = {} as { Dex: typeof Dex; CalcGenerations: typeof Generations };
      const dex = '../../node_modules/@pkmn/dex/build/production.min.js';

      // eslint-disable-next-line no-eval
      eval(fs.readFileSync(path.resolve(__dirname, dex), 'utf8'));
      // eslint-disable-next-line no-eval
      eval(fs.readFileSync(path.resolve(__dirname, '../../build/production.min.js'), 'utf8'));

      const g = new window.CalcGenerations(window.Dex);
      expect(g.get(1).moves.get('thunderbolt' as I.ID)).toBeDefined();
      expect(g.get(1).types.get('ghost' as I.ID)!.effectiveness['Psychic']).toEqual(0);
      // TODO add more
    }
  });
});
