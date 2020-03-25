import {_import, _unpack, Sets} from '../sets';

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
    test('blissey', () => {
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

    test('marowak (gen 2)', () => {
      const marowakIn = imported(`
        Marowak (M) @ Leftovers
        - Earthquake
        - Hidden Power [Bug]
        - Frustration
        - Swords Dance`);
      // NOTE: we differ slightly from PS as we don't specify IV: 30 HP
      const marowakOut = exported(`
        Marowak (M) @ Leftovers
        Happiness: 0
        IVs: 26 Atk / 26 Def
        - Earthquake
        - Hidden Power [Bug]
        - Frustration
        - Swords Dance`);

      expect(Sets.exportSet(Sets.importSet(marowakIn, 2)!, false, 2))
          .toEqual(marowakOut);
    });

    test('magnezone', () => {
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

    test('tauros (rby)', () => {
      const tauros = `
        Tauros
        - Blizzard
        - Body Slam
        - Earthquake
        - Hyper Beam`;

      expect(Sets.exportSet(Sets.importSet(imported(tauros))!))
          .toEqual(exported(tauros));
    });

    test('fake', () => {
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

    test('nothing', () => {
      expect(Sets.importSet('')).not.toBeDefined();
    });
  });

  describe('pack + unpack', () => {
    test('m-alakazam', () => {
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
      expect(Sets.exportSet(u)).toEqual(exported(malakazam));
    });

    test('tangrowth (packed in)', () => {
      const tangrowthIn = 'Tangrowth||assaultvest|H|gigadrain,knockoff' +
          ',powerwhip,earthquake|Sassy|248,,8,,252,||,30,30,,,|||,ice,';
      const tangrowthOut = exported(`
        Tangrowth @ Assault Vest
        Ability: Regenerator
        EVs: 248 HP / 8 Def / 252 SpD
        Sassy Nature
        IVs: 30 Atk / 30 Def
        - Giga Drain
        - Knock Off
        - Power Whip
        - Earthquake`);

      const u = Sets.unpack(tangrowthIn)!;
      expect(Sets.unpack(Sets.pack(u))!).toEqual(u);
      expect(Sets.exportSet(u)).toEqual(tangrowthOut);
    });

    test('magnezone', () => {
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
          _unpack((Sets.pack(Sets.importSet(magnezoneIn, 7)!)) + ']')!.set!;
      expect(Sets.exportSet(u, false, 7)).toEqual(magnezoneOut);
    });

    test('tauros', () => {
      const taurosIn = imported(`
        Tauros
        - Blizzard
        - Body Slam
        - Earthquake
        - Hyper Beam`);
      const taurosOut = exported(`
        Tauros
        Ability: Intimidate
        EVs: 252 HP / 252 Atk / 252 Def / 252 SpA / 252 SpD / 252 Spe
        - Blizzard
        - Body Slam
        - Earthquake
        - Hyper Beam`);

      const u = Sets.unpack(Sets.pack(Sets.importSet(taurosIn, 1)!))!;
      expect(Sets.exportSet(u)).toEqual(taurosOut);
    });

    test('blissey (after unpack)', () => {
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
        Blissey @ leftovers
        Ability: Natural Cure
        EVs: 148 HP / 252 Def / 108 SpD
        Bold Nature
        - wish
        - toxic
        - protect
        - seismictoss`);

      const u = Sets.unpack(Sets.pack(_import(blisseyIn.split('\n'))!.set!))!;
      expect(Sets.exportSet(u, true)).toEqual(blisseyOut);
    });

    test('fake', () => {
      const fakeIn = imported(`
        Fakey (Fake) @ Fake
        Ability: Fake
        - Fake Move 1
        - Fake Move 2
        - Fake Move 3
        - Fake Move 4`);
      const fakeOut = exported(`
        Fakey (fake) @ fake
        Ability: fake
        - fakemove1
        - fakemove2
        - fakemove3
        - fakemove4`);

      const u = Sets.unpack(Sets.pack(Sets.importSet(fakeIn)!))!;
      expect(Sets.exportSet(u)).toEqual(fakeOut);
    });

    test('partial', () => {
      let p = '';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += 'Tangrowth';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|assaultvest';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|H';
      expect(Sets.unpack(p)).not.toBeDefined();
      p += '|gigadrain,knockoff,powerwhip,earthquake';
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
      p += '|,ice,';
      expect(Sets.unpack(p)).toBeDefined();
    });

    test('bad types', () => {
      // @ts-ignore
      let suicune: PokemonSet = {name: 'Suicune', pokeball: 'Cherish Ball'};
      const u = Sets.unpack(Sets.pack(suicune))!;
      expect(Sets.exportSet(u, true)).toEqual(exported('Suicune'));
      expect(Sets.exportSet(suicune)).toEqual(exported('Suicune'));

      suicune = {
        name: 'Suicune',
        ivs: {hp: undefined},
        moves: ['Hidden Power Bug']
      };
      expect(Sets.exportSet(suicune))
          .toEqual(exported('Suicune\n- Hidden Power [Bug]'));

      suicune = {
        name: 'Suicune',
        moves: ['Hidden Power [Bug]', 'hiddenpowerdark']
      };
      expect(Sets.exportSet(suicune, true)).toEqual(exported(`Suicune
        - Hidden Power [Bug]
        - Hidden Power [Dark]`));
    });
  });

  test('weird import', () => {
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

  test('toJSON + fromJSON', () => {
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