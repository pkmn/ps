import {PokemonSet, StatsTable} from '@pkmn/types';
import {_import, _unpack, Sets} from '../sets';
import {GEN} from './data';

function imported(s: string) {
  return s.split('\n').map(x => x.trim()).filter(x => x).join('\n');
}

function exported(s: string) {
  return s.split('\n')
    .map((x) => x.trim())
    .filter(x => x)
    .map(x => x + '  ')
    .join('\n') +
      '\n\n';
}

describe('Sets', () => {
  describe('importSet + exportSet', () => {
    it('blissey', () => {
      const blissey = `
        Blissey @ Leftovers
        Ability: Natural Cure
        EVs: 148 HP / 252 Def / 108 SpD
        Bold Nature
        - Wish
        - Toxic
        - Protect
        - Seismic Toss`;

      expect(Sets.toString(Sets.fromString(imported(blissey))!))
        .toEqual(exported(blissey));
    });

    it('marowak (gen 2)', () => {
      const marowakIn = imported(`
        Marowak (M) @ Thick Club
        - Earthquake
        - Hidden Power [Bug]
        - Frustration
        - Swords Dance`);
      // NOTE: we differ slightly from PS as we don't specify IV: 30 HP
      const marowakOut = exported(`
        Marowak (M) @ Thick Club
        Happiness: 0
        IVs: 26 Atk / 26 Def
        - Earthquake
        - Hidden Power [Bug]
        - Frustration
        - Swords Dance`);

      expect(Sets.exportSet(Sets.importSet(marowakIn, GEN[2])!, GEN[2]))
        .toEqual(marowakOut);
    });

    it('magnezone', () => {
      const magnezoneIn = imported(`
        Maggy (Magnezone) @ No Item
        Trait: Sturdy
        Level: 50
        Shiny: Yes
        Happiness: 0
        EVs: 85 HP / 85 Atk / 85 Def / 85 SpA / 85 SpD / 85 Spe
        Serious nature
        IVs: 1 HP / 29 Def / 28 SpA / 26 SpD / 26 Spe
        ~ Thunderbolt
        ~
        ~ Flash Cannon
        ~ Hidden Power [Flying]
        ~ Volt Switch`);
      const magnezoneOut = exported(`
        Maggy (Magnezone)
        Ability: Sturdy
        Level: 50
        Shiny: Yes
        Happiness: 0
        EVs: 85 HP / 85 Atk / 85 Def / 85 SpA / 85 SpD / 85 Spe
        Serious Nature
        IVs: 1 HP / 29 Def / 28 SpA / 26 SpD / 26 Spe
        - Thunderbolt
        - Flash Cannon
        - Hidden Power [Flying]
        - Volt Switch`);

      expect(Sets.exportSet(Sets.importSet(magnezoneIn)!))
        .toEqual(magnezoneOut);
    });

    it('tauros (rby)', () => {
      const tauros = `
        Tauros
        - Blizzard
        - Body Slam
        - Earthquake
        - Hyper Beam`;

      expect(Sets.exportSet(Sets.importSet(imported(tauros))!))
        .toEqual(exported(tauros));
    });

    it('fake', () => {
      const fake = `
        Fakey (Fake) @ Fake
        Ability: Fake
        - Fake Move 1
        - Fake Move 2
        - Fake Move 3
        - Hidden Power [Fake]`;

      expect(Sets.exportSet(Sets.importSet(imported(fake))!))
        .toEqual(exported(fake));
    });

    it('nothing', () => {
      expect(Sets.importSet('')).not.toBeDefined();
    });
  });

  describe('pack + unpack', () => {
    it('m-alakazam', () => {
      const malakazam = `
        Alakazam-Mega (F) @ Alakazite
        Ability: Magic Guard
        EVs: 252 SpA / 252 Spe
        Timid Nature
        IVs: 0 Atk
        - Psychic
        - Focus Blast
        - Shadow Ball
        - Recover`;

      const u = Sets.unpack(Sets.pack(Sets.importSet(imported(malakazam))!))!;
      expect(Sets.exportSet(u, GEN[7])).toEqual(exported(malakazam));
    });

    it('tangrowth (packed in)', () => {
      const tangrowthIn = 'Tangrowth||AssaultVest|H|GigaDrain,KnockOff' +
          ',PowerWhip,Earthquake|Sassy|248,,8,,252,||,30,30,,,|||,Ice,';
      const tangrowthOut = exported(`
        Tangrowth @ Assault Vest
        Ability: Regenerator
        Hidden Power: Ice
        EVs: 248 HP / 8 Def / 252 SpD
        Sassy Nature
        IVs: 30 Atk / 30 Def
        - Giga Drain
        - Knock Off
        - Power Whip
        - Earthquake`);

      const u = Sets.unpack(tangrowthIn, GEN[7])!;
      expect(Sets.unpack(Sets.pack(u), GEN[7])!).toEqual(u);
      expect(Sets.exportSet(u, GEN[7])).toEqual(tangrowthOut);
    });

    it('magnezone', () => {
      const magnezoneIn = imported(`
        Maggy (Magnezone) @ No Item
        Trait: Sturdy
        Level: 50
        Shiny: Yes
        Happiness: 0
        EVs: 85 HP / 85 Atk / 85 Def / 85 SpA / 85 SpD / 85 Spe
        Serious nature
        IVs: 1 HP / 29 Def / 28 SpA / 26 SpD / 26 Spe
        ~ Thunderbolt
        ~
        ~ Flash Cannon
        ~ Hidden Power [Flying]
        ~ Volt Switch`);
      const magnezoneOut = exported(`
        Maggy (Magnezone)
        Ability: Sturdy
        Level: 50
        Shiny: Yes
        Happiness: 0
        EVs: 85 HP / 85 Atk / 85 Def / 85 SpA / 85 SpD / 85 Spe
        Serious Nature
        IVs: 1 HP / 29 Def / 28 SpA / 26 SpD / 26 Spe
        - Thunderbolt
        - Flash Cannon
        - Hidden Power [Flying]
        - Volt Switch`);

      const u =
          _unpack((Sets.pack(Sets.importSet(magnezoneIn, GEN[7])!)) + ']')!.set!;
      expect(Sets.exportSet(u, GEN[7])).toEqual(magnezoneOut);
    });

    it('tauros', () => {
      const taurosIn = imported(`
        Tauros
        - Blizzard
        - Body Slam
        - Earthquake
        - Hyper Beam`);
      const taurosOut = exported(`
        Tauros
        - Blizzard
        - Body Slam
        - Earthquake
        - Hyper Beam`);

      const u = Sets.unpack(Sets.pack(Sets.importSet(taurosIn, GEN[1])!))!;
      expect(Sets.exportSet(u, GEN[1])).toEqual(taurosOut);
    });

    it('blissey (after unpack)', () => {
      const blisseyIn = imported(`
        Blissey @ Leftovers
        Ability: Natural Cure
        EVs: 148 HP / 252 Def / 108 SpD
        Bold Nature
        - Wish
        - Toxic
        - Protect
        - Seismic Toss`);
      const blisseyOut = exported(`
        Blissey @ Leftovers
        Ability: Natural Cure
        EVs: 148 HP / 252 Def / 108 SpD
        Bold Nature
        - Wish
        - Toxic
        - Protect
        - Seismic Toss`);

      const u = Sets.unpack(Sets.pack(_import(blisseyIn.split('\n'))!.set))!;
      expect(Sets.exportSet(u)).toEqual(blisseyOut);
    });

    it('fake', () => {
      const fakeIn = imported(`
        Fakey (Fake) @ Fake
        Ability: Fake
        - Fake Move 1
        - Fake Move 2
        - Fake Move 3
        - Fake Move 4`);
      const fakeOut = exported(`
        Fakey (Fake) @ Fake
        Ability: Fake
        - Fake Move 1
        - Fake Move 2
        - Fake Move 3
        - Fake Move 4`);

      const u = Sets.unpack(Sets.pack(Sets.importSet(fakeIn)!))!;
      expect(Sets.exportSet(u)).toEqual(fakeOut);
    });

    it('partial', () => {
      let p = '';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += 'Tangrowth';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|AssaultVest';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|Regenerator';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|GigaDrain,KnockOff,PowerWhip,Earthquake';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|Sassy';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|248';
      expect(Sets.unpack(p + '|')).not.toBeDefined();
      p += ',,8,,252,';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|,30,30,,,';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|,Ice,';
      expect(Sets.unpack(p)).toBeDefined();
    });

    it('bad types', () => {
      let suicune = {name: 'Suicune', pokeball: 'Cherish Ball'} as PokemonSet;
      const u = Sets.unpack(Sets.pack(suicune))!;
      expect(Sets.exportSet(u)).toEqual(exported(`Suicune
        Pokeball: Cherish Ball`));
      expect(Sets.exportSet(suicune)).toEqual(exported(`Suicune
        Pokeball: Cherish Ball`));

      suicune = {
        name: 'Suicune',
        ivs: {hp: undefined} as unknown as StatsTable,
        moves: ['Hidden Power Bug'],
      } as PokemonSet;
      expect(Sets.exportSet(suicune))
        .toEqual(exported('Suicune\n- Hidden Power [Bug]'));

      suicune = {
        name: 'Suicune',
        moves: ['Hidden Power [Bug]', 'hiddenpowerdark'],
      } as PokemonSet;
      expect(Sets.exportSet(suicune)).toEqual(exported(`Suicune
        - Hidden Power [Bug]
        - Hidden Power [Dark]`));
    });
  });

  it('weird import', () => {
    const weirdIn = imported(`
        @ Leftovers
        Ability: Illuminate
        /
        EVs: 0 Foo / N Atk / 9
        undefined Nature
        IVs: 0 Foo / N Atk / 9`);
    const weirdOut = exported(`
        @ Leftovers
        Ability: Illuminate`);

    expect(Sets.exportSet(Sets.importSet(weirdIn)!)).toEqual(weirdOut);
  });

  it('toJSON + fromJSON', () => {
    const malakazam = `
      Alakazam-Mega (F) @ Alakazite
      Ability: Magic Guard
      EVs: 252 SpA / 252 Spe
      Timid Nature
      IVs: 0 Atk
      - Psychic
      - Focus Blast
      - Shadow Ball
      - Recover`;

    const fj =
        Sets.fromJSON(Sets.toJSON(Sets.importSet(imported(malakazam))!))!;
    expect(Sets.exportSet(fj)).toEqual(exported(malakazam));

    expect(Sets.fromJSON('foo')).not.toBeDefined();
  });
});
