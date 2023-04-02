import {Effect, Generations, ID, SpeciesName} from '@pkmn/data';
import {Dex} from '@pkmn/dex';
import {
  DetailedPokemon,
  PokemonDetails,
  PokemonHealth,
  PokemonIdent,
  PokemonSearchID,
  Protocol,
} from '@pkmn/protocol';

import {Battle} from '../battle';
import {Pokemon, Side} from '../index';

const gens = new Generations(Dex);
const gen = gens.get(7);

// NOTE: tested exhaustively in integration/src/test/client.js
describe('Pokemon', () => {
  it('#ident', () => {
    const pokemon = new Pokemon(null! as Side, {ident: 'p1: Gengar'} as DetailedPokemon);
    expect(pokemon.ident).toBe('p1a: Gengar');
    pokemon.slot = 2;
    expect(pokemon.ident).toBe('p1c: Gengar');
  });

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
        status: p.status,
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

  it('#checkDetails', () => {
    const detailed =
      Protocol.parseDetails('', 'p1: Arceus' as PokemonIdent, 'Arceus-*, L50' as PokemonDetails);
    const pokemon = new Pokemon(null! as Side, detailed);

    expect(pokemon.checkDetails()).toBe(false);
    expect(pokemon.checkDetails('Arceus-*, L50' as PokemonDetails)).toBe(true);

    pokemon.searchid = 'p1: Arceus|Arceus-*, L50' as PokemonSearchID;
    expect(pokemon.checkDetails('Arceus-*, L50, shiny' as PokemonDetails)).toBe(false);

    pokemon.searchid = '' as PokemonSearchID;
    expect(pokemon.checkDetails('Arceus-*, L50, shiny' as PokemonDetails)).toBe(true);
    expect(pokemon.checkDetails('Arceus-Grass, L50, shiny' as PokemonDetails)).toBe(true);
    expect(pokemon.checkDetails('Arceus-Grass, L60, shiny' as PokemonDetails)).toBe(false);
  });

  it('#volatiles', () => {
    const pokemon = new Pokemon({battle: {gen: {num: 8}}} as Side, {} as DetailedPokemon);

    pokemon.addVolatile('foo' as ID, {duration: 'turn'});
    pokemon.addVolatile('bar' as ID, {duration: 'move'});
    pokemon.addVolatile('baz' as ID);
    pokemon.addVolatile('qux' as ID, {level: 2});

    expect(pokemon.hasVolatile('foo' as ID)).toBe(true);
    expect(pokemon.hasVolatile('bar' as ID)).toBe(true);
    expect(pokemon.hasVolatile('baz' as ID)).toBe(true);
    expect(pokemon.hasVolatile('qux' as ID)).toBe(true);

    pokemon.clearTurnstatuses();

    expect(pokemon.hasVolatile('foo' as ID)).toBe(false);
    expect(pokemon.hasVolatile('bar' as ID)).toBe(true);
    expect(pokemon.hasVolatile('baz' as ID)).toBe(true);
    expect(pokemon.hasVolatile('qux' as ID)).toBe(true);

    pokemon.addVolatile('foo' as ID, {duration: 'turn'});
    pokemon.clearMovestatuses();

    expect(pokemon.hasVolatile('foo' as ID)).toBe(true);
    expect(pokemon.hasVolatile('bar' as ID)).toBe(false);
    expect(pokemon.hasVolatile('baz' as ID)).toBe(true);
    expect(pokemon.hasVolatile('qux' as ID)).toBe(true);

    pokemon.addVolatile('bar' as ID, {duration: 'move'});
    pokemon.removeVolatile('baz' as ID);
    expect(pokemon.hasVolatile('baz' as ID)).toBe(false);
    expect(pokemon.hasVolatile('qux' as ID)).toBe(true);

    pokemon.ability = 'ability' as ID;
    pokemon.baseAbility = 'baseability' as ID;
    pokemon.statusStage = 2;
    pokemon.statusState.toxicTurns = 3;
    pokemon.statusState.sleepTurns = 4;

    pokemon.clearVolatile();

    expect(pokemon.hasVolatile('foo' as ID)).toBe(false);
    expect(pokemon.hasVolatile('bar' as ID)).toBe(false);
    expect(pokemon.hasVolatile('qux' as ID)).toBe(false);

    expect(pokemon.ability).toBe('baseability');
    expect(pokemon.statusStage).toBe(0);
    expect(pokemon.statusState.toxicTurns).toBe(0);
    expect(pokemon.statusState.sleepTurns).toBe(4);
  });

  it.todo('#rememberMove');
  it.todo('#useMove');
  it.todo('#cantUseMove');

  it('#abilities', () => {
    const pokemon =
      new Pokemon({battle: new Battle(gens)} as unknown as Side, {} as DetailedPokemon);
    pokemon.activateAbility({kind: 'Move', name: 'Tackle'} as Effect);
    expect(pokemon.ability).not.toBe('tackle');
    pokemon.activateAbility({kind: 'Ability', name: 'Pressure'} as Effect);
    expect(pokemon.ability).toBe('pressure');
    expect(pokemon.baseAbility).toBe('pressure');
    pokemon.activateAbility('Magic Guard', true);
    expect(pokemon.ability).toBe('magicguard');
    expect(pokemon.baseAbility).toBe('pressure');
  });

  it('#weighthg', () => {
    const pokemon = new Pokemon(
      {battle: {gen}} as unknown as Side,
      {speciesForme: 'Snorlax'} as DetailedPokemon
    );
    expect(pokemon.weighthg).toBe(4600);
    pokemon.addVolatile('autotomize' as ID, {level: 2});
    expect(pokemon.weighthg).toBe(2600);
    pokemon.addVolatile('autotomize' as ID, {level: 10});
    expect(pokemon.weighthg).toBe(1);
  });

  it('#types', () => {
    const pokemon = new Pokemon(
      {battle: {gen}} as unknown as Side,
      {speciesForme: 'Zapdos'} as DetailedPokemon
    );

    expect(pokemon.types).toEqual(['Electric', 'Flying']);
    expect(pokemon.addedType).toBeUndefined();
    pokemon.addVolatile('roost' as ID, {duration: 'turn'});
    expect(pokemon.types).toEqual(['Electric']);
    expect(pokemon.addedType).toBeUndefined();

    pokemon.speciesForme = 'Tornadus';

    pokemon.addVolatile('typeadd' as ID, {type: 'Grass'});
    expect(pokemon.types).toEqual(['Normal']);
    expect(pokemon.addedType).toBe('Grass');

    pokemon.addVolatile('typechange' as ID, {apparentType: 'Dragon/Fire'});
    expect(pokemon.types).toEqual(['Dragon', 'Fire']);
    expect(pokemon.addedType).toBe('Grass');

    const copy = new Pokemon(
      {battle: {gen}} as unknown as Side,
      {speciesForme: 'Gengar'} as DetailedPokemon
    );

    expect(copy.types).toEqual(['Ghost', 'Poison']);

    copy.copyTypesFrom(pokemon);
    expect(copy.types).toEqual(['Dragon', 'Fire']);
    expect(copy.addedType).toBe('Grass');
  });

  it.todo('#isGrounded');

  it('#species', () => {
    const pokemon = new Pokemon(
      {battle: {gen}} as unknown as Side,
      {speciesForme: 'Greninja'} as DetailedPokemon
    );

    expect(pokemon.baseSpecies.name).toBe('Greninja');
    expect(pokemon.species.name).toBe('Greninja');
    pokemon.speciesForme = 'Greninja-Ash';
    expect(pokemon.species.name).toBe('Greninja-Ash');

    pokemon.addVolatile('formechange' as ID, {speciesForme: 'Gengar' as SpeciesName});

    pokemon.speciesForme = 'Greninja';
    expect(pokemon.baseSpecies.name).toBe('Greninja');
    expect(pokemon.species.name).toBe('Gengar');
    pokemon.speciesForme = 'Greninja-Ash';
    expect(pokemon.species.name).toBe('Gengar');
  });

  it('#getDamageRange', () => {
    expect(Pokemon.getDamageRange([0, 300, 300, 'g'], 'g')).toEqual([0, 0]);
    expect(Pokemon.getDamageRange([-50, 300, 300, 'g'], 'g')).toEqual([-1 / 6, -1 / 6]);
    expect(Pokemon.getDamageRange([0, 48, 48, 'g'], 'g')).toEqual([0, 0]);
    const result = Pokemon.getDamageRange([-12, 48, 300, 'g'], 'g');
    expect(result[0]).toBeCloseTo(0.23);
    expect(result[1]).toBeCloseTo(0.27);
  });

  it('#getPixelRange', () => {
    const e = 0.5 / 714;
    expect(Pokemon.getPixelRange(0, '')).toEqual([0, 0]);
    expect(Pokemon.getPixelRange(1, 'r')).toEqual([e, 2 / 48 - e]);
    expect(Pokemon.getPixelRange(8, 'r')).toEqual([8 / 48, 9 / 48 - e]);
    expect(Pokemon.getPixelRange(9, 'r')).toEqual([9 / 48, 0.2]);
    expect(Pokemon.getPixelRange(9, 'y')).toEqual([0.2 + e, 10 / 48 - e]);
    expect(Pokemon.getPixelRange(15, 'y')).toEqual([15 / 48, 16 / 48 - e]);
    expect(Pokemon.getPixelRange(24, 'y')).toEqual([0.5, 0.5]);
    expect(Pokemon.getPixelRange(24, 'g')).toEqual([0.5 + e, 25 / 48 - e]);
    expect(Pokemon.getPixelRange(36, 'g')).toEqual([36 / 48, 37 / 48 - e]);
    expect(Pokemon.getPixelRange(47, 'g')).toEqual([47 / 48, 1 - e]);
    expect(Pokemon.getPixelRange(48, 'g')).toEqual([1, 1]);
  });

  it('#getFormattedRange', () => {
    expect(Pokemon.getFormattedRange([0, 0], 0, '-')).toBe('0%');
    expect(Pokemon.getFormattedRange([0.25, 0.50], 0, '_')).toBe('25_50%');
    expect(Pokemon.getFormattedRange([0.1, 0.1], 2, 'F')).toBe('10%');
    expect(Pokemon.getFormattedRange([0.123, 0.123], 2, 'F')).toBe('12.30%');
    expect(Pokemon.getFormattedRange([0.12, 0.123], 0, '-')).toBe('12-13%');
    expect(Pokemon.getFormattedRange([0.12, 0.123], 1, '-')).toBe('12.0-12.3%');
  });

  it('#reset', () => {
    const pokemon = new Pokemon({battle: {gen: {num: 8}}} as Side, {} as DetailedPokemon);
    pokemon.hp = 90;
    pokemon.maxhp = 105;
    pokemon.status = 'tox';
    pokemon.name = '';
    pokemon.statusStage = 5;
    pokemon.speciesForme = 'Gengar';

    pokemon.reset();

    expect(pokemon.hp).toBe(105);
    expect(pokemon.status).toBeUndefined();
    expect(pokemon.name).toBe('Gengar');
    expect(pokemon.statusStage).toBe(0);
  });

  it('#destroy', () => {
    const pokemon = new Pokemon({battle: {gen: {num: 8}}} as Side, {} as DetailedPokemon);
    expect(pokemon.side).not.toBeNull();
    pokemon.destroy();
    expect(pokemon.side).toBeNull();
  });
});
