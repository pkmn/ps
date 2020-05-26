import {GenerationNum, StatsTable, Dex as DexT, ItemName} from '@pkmn/dex-types';
import {Generations} from './index';

import {calculate, Pokemon, Move} from '@smogon/calc/adaptable';
import * as dex from '@pkmn/dex';
import * as sim from '@pkmn/sim';

import * as fs from 'fs';
import * as path from 'path';

const DATA = {
  'dex': dex.Dex as DexT,
  'sim': sim.Dex as unknown as DexT,
};

for (const [pkg, Dex] of Object.entries(DATA)) {
  describe(`Generations (${pkg})`, () => {
    const gens = new Generations(Dex);
    const Gen = (num: GenerationNum) => gens.get(num);

    // FIXME test exists override!

    describe('Abilities', () => {
      it('#get', () => {
        expect(Gen(7).abilities.get('foo')).toBeUndefined();
        expect(Gen(7).abilities.get('Illuminate')!.effectType).toBe('Ability');
        expect(Gen(6).abilities.get('Beast Boost')).toBeUndefined();
        expect(Gen(7).abilities.get('Beast Boost')!).toBeDefined();
        expect(Gen(7).abilities.get('Shield Dust'))
          .toEqual(Gen(4).abilities.get('Shield Dust'));
        expect(Gen(3).abilities.get('Lightning Rod'))
          .not.toEqual(Gen(4).abilities.get('Lightning Rod'));

        expect(Gen(7).abilities.get('ph')!.name).toBe('Poison Heal');
        expect(Gen(7).abilities.get('stag')!.name).toBe('Shadow Tag');

        expect(Gen(7).abilities.get('Sturdy')!.shortDesc) // eslint-disable-next-line
          .toEqual('If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.');
        expect(Gen(3).abilities.get('s turdy')!.shortDesc)
          .toEqual('OHKO moves fail when used against this Pokemon.');
      });

      test('counts', () => {
        const COUNTS = [0, 0, 76, 47, 41, 27, 42, 25];
        let total = 0;
        for (const gen of gens) {
          expect(Array.from(gen.abilities)).toHaveLength(total += COUNTS[gen.num - 1]);
        }
      });

      test('cached', () => {
        const a = Gen(6).abilities.get('Mummy');
        const b = Gen(6).abilities.get('Mummy');
        const c = Gen(7).abilities.get('Mummy');

        expect(b).toBe(a);
        expect(c).not.toBe(a);
        expect(b!.name).toBe('Mummy');
      });
    });

    describe('Items', () => {
      it('#get', () => {
        expect(Gen(7).items.get('Aerodactylite')!.megaEvolves).toEqual('Aerodactyl');

        expect(Gen(3).items.get('Berry')).toBeUndefined();
        expect(Gen(3).items.get('Gold Berry')).toBeUndefined();
        expect(Gen(3).items.get('Pink Bow')).toBeUndefined();
        expect(Gen(3).items.get('Polkadot Bow')).toBeUndefined();

        expect(Gen(2).items.get('berry')!.name).toBe('Berry');
        expect(Gen(2).items.get('berry')!.isBerry).toBe(true);
        expect(Gen(2).items.get('goldberry')!.name).toBe('Gold Berry');
        expect(Gen(2).items.get('goldberry')!.isBerry).toBe(true);
        expect(Gen(2).items.get('Pink Bow')).toBeDefined();
        expect(Gen(2).items.get('Polkadot Bow')).toBeDefined();

        expect(Gen(7).items.get('foo')).toBeUndefined();

        expect(Gen(2).items.get('Leftovers')).toEqual(Gen(7).items.get('Leftovers'));
        expect(Gen(3).items.get('Sitrus Berry'))
          .not.toEqual(Gen(4).items.get('Sitrus Berry'));

        expect(Gen(3).items.get('Red Orb')).toBeUndefined();
        expect(Gen(6).items.get('Red Orb')!.gen).toBe(6);
        expect(Gen(2).items.get('Old Amber')).toBeUndefined();
        expect(Gen(5).items.get('Old Amber')!.gen).toBe(3);
      });

      test('fields', () => {
        expect(Gen(7).items.get('Sitrus Berry')!.effectType).toBe('Item');
        expect(Gen(4).items.get('Sitrus Berry')!.isBerry).toBe(true);
        expect(Gen(7).items.get('Heracronite')!.megaStone).toBe('Heracross-Mega');
        expect(Gen(7).items.get('Charizardite-X')!.megaEvolves).toBe('Charizard');
        expect(Gen(7).items.get('Pikanium Z')!.zMove).toBe('Catastropika');
        expect(Gen(7).items.get('Fairium Z')!.zMove).toBe(true);
        expect(Gen(7).items.get('Steelium Z')!.zMoveType).toBe('Steel');
        expect(Gen(7).items.get('Lunalium Z')!.itemUser).toEqual([
          'Lunala', 'Necrozma-Dawn-Wings',
        ]);
        expect(Gen(7).items.get('Meadow Plate')!.onPlate).toBe('Grass');
        expect(Gen(7).items.get('Electric Memory')!.onMemory).toBe('Electric');
        expect(Gen(7).items.get('Douse Drive')!.onDrive).toBe('Water');
        expect(Gen(5).items.get('Electric Gem')!.isGem).toBe(true);
        expect(Gen(7).items.get('Choice Specs')!.isChoice).toBe(true);
      });

      test('cached', () => {
        const a = Gen(6).items.get('Choice Band');
        const b = Gen(6).items.get('Choice Band');
        const c = Gen(7).items.get('Choice Band');

        expect(b).toBe(a);
        expect(c).not.toBe(a);
        expect(b!.name).toBe('Choice Band');
      });
    });

    describe('Moves', () => {
      it('#get', () => {
        expect(Gen(7).moves.get('foo')).toBeUndefined();
        expect(Gen(1).moves.get('Thunderbolt')).toBeDefined();
        expect(Gen(7).moves.get('Draco Meteor')!.basePower).toEqual(130);
        expect(Gen(6).moves.get('eq')).toEqual(Gen(6).moves.get('Earthquake'));
        expect(Gen(4).moves.get('DracoMeteor')!.basePower).toEqual(140);
        expect(Gen(7).moves.get('Crunch')!.category).toEqual('Physical');
        expect(Gen(2).moves.get('CRUNCH')!.category).toEqual('Special');
        expect(Gen(7).moves.get('Hidden Power [Bug]')!.name).toEqual('Hidden Power Bug');
      });

      test('fields', () => {
        expect(Gen(7).moves.get('Tackle')!.effectType).toBe('Move');
        expect(Gen(1).moves.get('Surf')!.basePower).toBe(95);
        expect(Gen(7).moves.get('Surf')!.basePower).toBe(90);
        expect(Gen(4).moves.get('Curse')!.type).toBe('???');
        expect(Gen(5).moves.get('Curse')!.type).toBe('Ghost');
        // FIXME expect(Gen(1).moves.get('Struggle')!.pp).toBe(10);
        expect(Gen(2).moves.get('Struggle')!.pp).toBe(1);
        expect(Gen(3).moves.get('Bide')!.accuracy).toBe(100);
        expect(Gen(4).moves.get('Bide')!.accuracy).toBe(true);
        expect(Gen(3).moves.get('Psychic')!.category).toBe('Special');
        expect(Gen(7).moves.get('Rock Slide')!.target).toBe('allAdjacentFoes');
        expect(Gen(4).moves.get('Psychic')!.category).toBe('Special');
        expect(Gen(5).moves.get('Psychic')!.defensiveCategory).not.toBeDefined();
        expect(Gen(5).moves.get('Psyshock')!.defensiveCategory).toBe('Physical');
        expect(Gen(7).moves.get('Rock Slide')!.target).toBe('allAdjacentFoes');
        expect(Gen(7).moves.get('Extreme Speed')!.priority).toBe(2);
        // FIXME expect(Gen(1).moves.get('Acid Armor')!.flags).toEqual({});
        expect(Gen(7).moves.get('Recover')!.flags.heal).toBe(1);
        expect(Gen(7).moves.get('Will-O-Wisp')!.status).toBe('brn');
        expect(Gen(7).moves.get('Stealth Rock')!.sideCondition).toBe('stealthrock');
        expect(Gen(7).moves.get('Confuse Ray')!.volatileStatus).toBe('confusion');
        expect(Gen(1).moves.get('Amnesia')!.boosts).toEqual({spa: 2, spd: 2});
        expect(Gen(2).moves.get('Amnesia')!.boosts).toEqual({spd: 2});
        expect(Gen(7).moves.get('Karate Chop')!.critRatio).toBe(2);
        expect(Gen(7).moves.get('Frost Breath')!.critRatio).toBe(1);
        expect(Gen(7).moves.get('Frost Breath')!.willCrit).toBe(true);
        expect(Gen(7).moves.get('Bloom Doom')!.isZ).toBe('grassiumz');
        expect(Gen(7).moves.get('Acid')!.isZ).toBeFalsy();
        expect(Gen(7).moves.get('Acid')!.zMove!.basePower).toBe(100);
        // FIXME expect(Gen(6).moves.get('Acid').zMove)!.toBeFalsy();
        expect(Gen(7).moves.get('Hypnosis')!.zMove!.boost).toEqual({spe: 1});
        expect(Gen(7).moves.get('Double Kick')!.multihit).toBe(2);
        expect(Gen(7).moves.get('Rock Blast')!.multihit).toEqual([2, 5]);
        expect(Gen(7).moves.get('Softboiled')!.heal).toEqual([1, 2]);
        expect(Gen(7).moves.get('Hi Jump Kick')!.hasCrashDamage).toBe(true);
        expect(Gen(7).moves.get('Struggle')!.struggleRecoil).toBe(true);
        expect(Gen(1).moves.get('Double Edge')!.recoil).toEqual([25, 100]);
        expect(Gen(7).moves.get('Double Edge')!.recoil).toEqual([33, 100]);
        expect(Gen(7).moves.get('Mind Blown')!.mindBlownRecoil).toBe(true);
        expect(Gen(7).moves.get('Feint')!.breaksProtect).toBe(true);
        expect(Gen(7).moves.get('Sacred Sword')!.ignoreDefensive).toBe(true);
        expect(Gen(7).moves.get('Fissure')!.ohko).toBe(true);

        // self
        expect(Gen(7).moves.get('Petal Dance')!.self!.volatileStatus).toBe('lockedmove');
        expect(Gen(7).moves.get('Overheat')!.self!.boosts).toEqual({spa: -2});

        // secondaries
        expect(Gen(7).moves.get('Thunder Fang')!.secondaries!).toHaveLength(2);
        expect(Gen(1).moves.get('Psychic')!.secondaries![0].chance).toBe(33);
        expect(Gen(2).moves.get('Psychic')!.secondaries![0].chance).toBe(10);
        expect(Gen(1).moves.get('Psychic')!.secondaries![0].boosts).toEqual({spa: -1, spd: -1});
        expect(Gen(2).moves.get('Psychic')!.secondaries![0].boosts).toEqual({spd: -1});
        expect(Gen(7).moves.get('Fire Blast')!.secondaries![0].status).toBe('brn');
        expect(Gen(7).moves.get('Hurricane')!.secondaries![0].volatileStatus).toBe('confusion');
      });

      test('counts', () => {
        const COUNTS = [165, 86 + 16, 103, 113, 92, 59, 105 - 14];
        let total = 0;
        for (const gen of gens) {
          expect(Array.from(gen.moves))
            .toHaveLength(gen.num === 8 ? 624 : (total += COUNTS[gen.num - 1]));
        }
      });

      test('cached', () => {
        const a = Gen(6).moves.get('Earthquake');
        const b = Gen(6).moves.get('Earthquake');
        const c = Gen(7).moves.get('Earthquake');

        expect(b).toBe(a);
        expect(c).not.toBe(a);
        expect(b!.name).toBe('Earthquake');
      });
    });

    describe('Species', () => {
      test('#get', () => {
        const gen = Gen(7);
        expect(gen.species.get('foo')).toBeUndefined();
        // normal
        expect(gen.species.get('gengar')!.name).toBe('Gengar');
        expect(gen.species.get('Gastrodon-East')!.name).toBe('Gastrodon-East');
        expect(gen.species.get('sawsbuckwinter')!.name).toBe('Sawsbuck-Winter');

        // nidoran
        expect(gen.species.get('nidoran♀')!.name).toBe('Nidoran-F');
        expect(gen.species.get('nidoran♂')!.name).toBe('Nidoran-M');
        // alias
        expect(gen.species.get('cune')!.name).toBe('Suicune');
        expect(gen.species.get('mence')!.name).toBe('Salamence');
        // mega
        expect(gen.species.get('Mega Salamence')!.name).toBe('Salamence-Mega');
        expect(gen.species.get('M-Alakazam')!.name).toBe('Alakazam-Mega');
        // primal
        expect(gen.species.get('Primal Kyogre')!.name).toBe('Kyogre-Primal');
        expect(gen.species.get('p groudon')!.name).toBe('Groudon-Primal');
        // Rockruff-Dusk
        expect(gen.species.get('Rockruff-Dusk')).toBeDefined();
        // FIXME expect(Gen(7).species.get('Rockruff-Dusk')!.name).toBe('Rockruff-Dusk');
      });

      test('counts', () => {
        const counts = (num: GenerationNum) => {
          const gen = Gen(num);
          const ss = [];
          const count = {species: 0, formes: 0};
          for (const s of gen.species) {
            ss.push(s.name);
            if (s.name !== s.baseSpecies) {
              count.formes++;
            } else {
              count.species++;
            }
          }
          return count;
        };

        let formes = 0;
        expect(counts(1)).toEqual({species: 151, formes});
        expect(counts(2)).toEqual({species: 251, formes});
        // Deoxys (3) + Castform (3)
        formes += 3 + 3;
        expect(counts(3)).toEqual({species: 386, formes});
        // Wormadam (2) + Cherrim (1) + Arceus (16) + Pichu (1) +
        // Rotom (5) + Giratina (1) + Shaymin (1)
        formes += 2 + 1 + 16 + 1 + 5 + 1 + 1;
        expect(counts(4)).toEqual({species: 493, formes});
        // Basculin (1) + Darmanitan (1) + *-Therian (3) + Keldeo (1) +
        // Kyurem (2) + Meloetta (1) + Genesect (4) - Pichu (1)
        formes += 1 + 1 + 3 + 1 + 2 + 1 + 4 - 1;
        expect(counts(5)).toEqual({species: 649, formes});
        // Arceus (1) + Vivillon (2) + Meowstic (1) + Primal (2) +
        // Aegislash (1) + Pumpkaboo (3) + Gourgeist (3) + Hoopa (1) +
        // Pikachu (6) + Mega (48) [Floette (1)]
        formes += 1 + 2 + 1 + 2 + 1 + 3 + 3 + 1 + 6 + 48;
        expect(counts(6)).toEqual({species: 721, formes});
        // Alola (18) + Totem (12) + Pikachu (7) - Pikachu (6) + Greninja (1) + Zygarde (2) +
        // Oricorio (3) + Rockruff (1) + Lycanroc (2) + Wishiwashi (1) + Silvally (17) + Minior (1)
        // Mimikyu (1) + Necrozma (3) [Magearna (1) + LGPE Starters/Meltan/Melmetal (4)]
        formes += 18 + 12 + 7 - 6 + 1 + 2 + 3 + 1 + 2 + 1 + 17 + 1 + 1 + 3 - 1; // FIXME Rockruff
        expect(counts(7)).toEqual({species: 807, formes});
        // GMax (26) + Silvally (17) + Rotom (5) + Basculin (1) + Meowstic (1) +
        // Aegislash (1) + Pumpkaboo (3) + Gourgeist (3) + Pikachu (7) + Galar (14) +
        // Alola (8) + Indeedee (1) + Morpeko (1) + Eiscue (1) + Zacian/Zamazenta (2) +
        // Toxtricity (1) + Cramorant (2) + Necrozma (2) + Mimikyu (2) + Wishiwashi (1) +
        // Keldeo (1) + Kyruem (2) + Darmanitan (2) + Cherrim (1)
        formes = 26 + 17 + 5 + 1 + 1 + 1 + 3 + 3 + 7 + 14 + 8 +
          1 + 1 + 1 + 2 + 1 + 2 + 2 + 2 + 1 + 1 + 2 + 2 + 1;
        expect(counts(8)).toEqual({species: 435, formes});
      });

      test('formeNum', () => {
        for (const gen of gens) {
          for (const species of gen.species) {
            expect(species.formeNum).toBeGreaterThanOrEqual(0);
          }
        }
        expect(Gen(1).species.get('Pikachu')!.formeNum).toBe(0);
        expect(Gen(6).species.get('Pikachu-Libre')!.formeNum).toBe(5);
        expect(Gen(7).species.get('Pikachu-Kalos')!.formeNum).toBe(5);
        expect(Gen(6).species.get('Vivillon')!.formeNum).toBe(6);
        expect(Gen(6).species.get('Vivillon-Meadow')!.formeNum).toBe(6);
        expect(Gen(6).species.get('Vivillon-Icy-Snow')!.formeNum).toBe(0);
        expect(Gen(7).species.get('Minior-Meteor')!.formeNum).toBe(0);
        expect(Gen(7).species.get('Minior')!.formeNum).toBe(7);
        expect(Gen(7).species.get('Minior-Violet')!.formeNum).toBe(13);
      });

      test('fields', () => {
        expect(Gen(7).species.get('Clefable')!.types).toEqual(['Fairy']);
        expect(Gen(3).species.get('Clefable')!.types).toEqual(['Normal']);
        expect(Gen(7).species.get('Gengar')!.types[1]).toBe('Poison');
        expect(Gen(7).species.get('Pikachu')!.types[1]).not.toBeDefined();
        expect(Gen(7).species.get('Mew')!.baseStats)
          .toEqual({hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100});
        expect(Gen(1).species.get('Tauros')!.baseStats)
          .toEqual({hp: 75, atk: 100, def: 95, spa: 70, spd: 70, spe: 110});
        expect(Gen(6).species.get('Pelipper')!.baseStats.spa).toEqual(85);
        expect(Gen(7).species.get('Pelipper')!.baseStats.spa).toEqual(95);
        expect(Gen(6).species.get('Greninja')!.abilities).toEqual({'0': 'Torrent', 'H': 'Protean'});
        expect(Gen(7).species.get('Greninja')!.abilities)
          .toEqual({'0': 'Torrent', 'H': 'Protean', 'S': 'Battle Bond'});
        expect(Gen(2).species.get('Snorlax')!.tier).toBe('OU');
        expect(Gen(5).species.get('Snorlax')!.tier).toBe('UU');
        expect(Gen(3).species.get('Chansey')!.prevo).toBeUndefined();
        expect(Gen(4).species.get('Chansey')!.prevo).toBe('Happiny');
        expect(Gen(2).species.get('Chansey')!.evos).toEqual(['Blissey']);
        expect(Gen(7).species.get('Charizard-Mega-X')!.baseSpecies).toBe('Charizard');
        expect(Gen(7).species.get('Giratina-O')!.forme).toBe('Origin');
        expect(Gen(7).species.get('Giratina')!.baseForme).toBe('Altered');
        expect(Gen(7).species.get('Shaymin')!.otherFormes).toEqual(['Shaymin-Sky']);
        expect(Gen(7).species.get('Gastrodon')!.cosmeticFormes).toEqual(['Gastrodon-East']);
        expect(Gen(7).species.get('Garchomp-Mega')!.isMega).toBe(true);
        expect(Gen(7).species.get('Yanmega')!.isMega).not.toBeDefined();
        expect(Gen(7).species.get('Kyogre-Primal')!.isPrimal).toBe(true);
        expect(Gen(1).species.get('Charizard')!.otherFormes).toBeUndefined();
        expect(Gen(7).species.get('Charizard')!.otherFormes)
          .toEqual(['Charizard-Mega-X', 'Charizard-Mega-Y']);
        expect(Gen(3).species.get('Nosepass')!.evos).toBeUndefined();
        expect(Gen(4).species.get('Nosepass')!.evos).toEqual(['Probopass']);
        expect(Gen(3).species.get('Chansey')!.prevo).toBeUndefined();
        expect(Gen(4).species.get('Chansey')!.prevo).toEqual('Happiny');
      });

      test('#hasAbility', () => {
        expect(Gen(7).species.get('Gengar')!.hasAbility('Levitate')).toBe(false);
        expect(Gen(5).species.get('Gengar')!.hasAbility('Levitate')).toBe(true);
      });

      test('cached', () => {
        const a = Gen(6).species.get('Gengar');
        const b = Gen(6).species.get('Gengar');
        const c = Gen(7).species.get('Gengar');

        expect(b).toBe(a);
        expect(c).not.toBe(a);
        expect(b!.name).toBe('Gengar');
      });
    });

    describe('Effects', () => {
      test('#get', () => {
        const gen = Gen(8);
        expect(gen.effects.get('')).toBeUndefined();
        expect(gen.effects.get('foo')).toBeUndefined();
        expect(gen.effects.get('move: Thunderbolt')!.name).toBe('Thunderbolt');
        expect(gen.effects.get('move: Foo')).toBeUndefined();
        expect(gen.effects.get('ability: Flash Fire')!.name).toBe('Flash Fire');
        expect(gen.effects.get('ability: Foo')).toBeUndefined();
        expect(gen.effects.get('item: Choice Band')!.name).toBe('Choice Band');
        expect(gen.effects.get('item: Foo')).toBeUndefined();
        expect(gen.effects.get('item: Metronome')!.name).toBe('Metronome');
        expect(gen.effects.get('item: Metronome')!.effectType).toBe('Item');
        // Falls back to PureEffect
        expect(gen.effects.get('Metronome')!.effectType).toBe('Effect');
      });
    });

    describe('Learnsets', () => {
      test('#get', async () => {
        expect((await Gen(8).learnsets.get('foo'))).toBeUndefined();
        const learnset = (await Gen(1).learnsets.get('mew'))!;
        expect(learnset.effectType).toBe('Learnset');
        expect(learnset.eventOnly).toBe(true);
        expect(learnset.eventData).toContainEqual({generation: 1, level: 5, moves: ['pound']});
        expect(learnset.encounters).not.toBeDefined();
        expect(learnset.learnset!.reflect).toEqual(['1M']);

        expect((await Gen(8).learnsets.get('bulbasaur'))!.learnset!.leafstorm)
          .toEqual(['8M', '7E', '6E', '5E', '4E']);
      });
    });

    describe('Natures', () => {
      test('#get', () => {
        const adamant = Gen(8).natures.get('adamant')!;
        expect(adamant.name).toBe('Adamant');
        expect(adamant.plus).toBe('atk');
        expect(adamant.minus).toBe('spa');

        const serious = Gen(4).natures.get('serious')!;
        expect(serious.name).toBe('Serious');
        expect(serious.plus).not.toBeDefined();
        expect(serious.minus).not.toBeDefined();

        expect(Gen(8).natures.get('foo')).toBeUndefined();
      });

      test('count', () => {
        expect(Array.from(Gen(8).natures)).toHaveLength(25);
      });
    });

    describe('Types', () => {
      it('#get', () => {
        const gen = Gen(8);
        expect(gen.types.get('Fairy')).toBeDefined();
        expect(Gen(5).types.get('Fairy')).toBeUndefined();
        expect(Gen(1).types.get('steel')).toBeUndefined();
        expect(Gen(1).types.get('Ghost')!.effectiveness['Psychic']).toEqual(0);
        expect(gen.types.get('Ghost')!.effectiveness['Psychic']).toEqual(2);
        expect(gen.types.get('Water')!.effectiveness['Fire']).toEqual(2);
        expect(gen.types.get('Fire')!.effectiveness['Water']).toEqual(0.5);
        expect(gen.types.get('Electric')!.effectiveness['Ground']).toEqual(0);

        expect(gen.types.get('Ice')!.HPdvs).toEqual({'def': 13});
        expect(gen.types.get('Flying')!.HPdvs).toEqual({'atk': 12, 'def': 13});
        expect(gen.types.get('Dragon')!.HPivs).toEqual({'atk': 30});
        expect(gen.types.get('Ground')!.HPivs).toEqual({'spa': 30, 'spd': 30});
      });

      it('#canDamage', () => {
        const gen = Gen(8);
        expect(gen.types.canDamage('Electric', ['Ground'])).toBe(false);
        expect(gen.types.get('Electric')!.canDamage(['Ground'])).toBe(false);
        expect(gen.types.canDamage({type: 'Fire'}, 'Fire')).toBe(true);
        expect(gen.types.canDamage('Ground', ['Ghost', 'Flying'])).toBe(false);
        expect(gen.types.canDamage('Normal', {getTypes: () => ['Steel', 'Rock']})).toBe(true);
        expect(Gen(1).types.canDamage('Ghost', 'Psychic')).toBe(false);
      });

      it('#totalEffectiveness', () => {
        const gen = Gen(8);
        expect(gen.types.totalEffectiveness('Water', ['Fire'])).toBe(2);
        expect(gen.types.totalEffectiveness({type: 'Fire'}, 'Fire')).toBe(0.5);
        expect(gen.types.totalEffectiveness('Dark', ['Ghost', 'Psychic'])).toBe(4);
        expect(gen.types.get('Dark')!.totalEffectiveness(['Ghost', 'Psychic'])).toBe(4);
        expect(gen.types.totalEffectiveness('Normal', {getTypes: () => ['Steel', 'Rock']}))
          .toBe(0.25);
        expect(gen.types.totalEffectiveness('Bug', 'Bug')).toBe(1);
      });

      it('#getHiddenPower', () => {
        let ivs = {hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
        for (let num = 3; num <= 7; num++) {
          const gen = Gen(num as GenerationNum);
          for (const type of gen.types) {
            if (['Normal', 'Fairy', '???'].includes(type.name)) continue;
            expect(gen.types.getHiddenPower({...ivs, ...type.HPivs}))
              .toEqual({power: gen.num >= 6 ? 60 : 70, type: type.name});
          }
        }
        ivs = {hp: 31, atk: 31, def: 27, spe: 31, spa: 31, spd: 31};
        expect(Gen(2).types.getHiddenPower(ivs)).toEqual({power: 70, type: 'Ice'});
      });
    });

    describe('Stats', () => {
      test('calc', () => {
        const rby: StatsTable = {hp: 403, atk: 298, def: 298, spa: 298, spd: 298, spe: 298};
        const adv: StatsTable = {hp: 404, atk: 328, def: 299, spa: 269, spd: 299, spe: 299};

        for (const gen of gens) {
          for (const stat of gen.stats) {
            const s = gen.stats.calc(stat, 100, 31, 252, 100, gen.natures.get('adamant')!);
            if (gen.num < 3) {
              expect(s).toBe(rby[stat]);
            } else {
              expect(s).toBe(adv[stat]);
            }
          }
        }

        // Shedinja
        expect(Gen(5).stats.calc('hp', 1, 31, 252, 100, Gen(5).natures.get('jolly')!))
          .toBe(1);
        // no nature
        expect(Gen(8).stats.calc('atk', 100, 31, 252, 100)).toBe(299);
      });

      test('get', () => {
        const gen = Gen(8);
        expect(gen.stats.get('foo')).not.toBeDefined();
        expect(gen.stats.get('Atk')).toBe('atk');
        expect(gen.stats.get('Spc')).toBe('spa');
        expect(gen.stats.get('SpDef')).toBe('spd');
        expect(gen.stats.get('SAtk')).toBe('spa');
      });

      test('display', () => {
        const gen = Gen(8);
        expect(gen.stats.display('foo')).toBe('foo');
        expect(gen.stats.display('Atk')).toBe('Atk');
        expect(gen.stats.display('Spc')).toBe('SpA');
        expect(gen.stats.display('SpDef')).toBe('SpD');
        expect(Gen(8).stats.display('SAtk', true)).toBe('Special Attack');
        expect(Gen(1).stats.display('SAtk', true)).toBe('Special');
      });

      test('fill', () => {
        const gen = Gen(8);
        expect(gen.stats.fill({atk: 10, def: 12, spd: 15}, 31))
          .toEqual({hp: 31, atk: 10, def: 12, spe: 31, spa: 31, spd: 15});
        expect(gen.stats.fill({spa: 200, spe: 252}, 0))
          .toEqual({hp: 0, atk: 0, def: 0, spe: 252, spa: 200, spd: 0});
      });

      test('getHPDV', () => {
        const stats = Gen(8).stats;
        expect(stats.getHPDV({spa: stats.toIV(15), spe: stats.toIV(15)})).toBe(15);
        expect(
          stats.getHPDV({
            atk: stats.toIV(5),
            def: stats.toIV(15),
            spa: stats.toIV(13),
            spe: stats.toIV(13),
          })
        ).toBe(15);
        expect(stats.getHPDV({def: stats.toIV(3), spa: stats.toIV(11), spe: stats.toIV(10)}))
          .toBe(13);
      });

      test('iterate', () => {
        expect(Array.from(Gen(8).stats))
          .toStrictEqual(['hp', 'atk', 'def', 'spe', 'spa', 'spd']);
      });
    });
  });
}

describe('@smogon/calc', () => {
  it('usage', () => {
    const gen = new Generations(dex.Dex).get(5);
    const result = calculate(
      gen,
      new Pokemon(gen, 'Gengar', {
        item: 'Choice Specs' as ItemName,
        nature: 'Timid',
        evs: {spa: 252},
        boosts: {spa: 1},
      }),
      new Pokemon(gen, 'Chansey', {
        item: 'Eviolite' as ItemName,
        nature: 'Calm',
        evs: {hp: 252, spd: 252},
      }),
      new Move(gen, 'Focus Blast')
    );
    expect(result.range()).toEqual([274, 324]);
  });
});

describe('Bundle', () => {
  it('usage', async () => {
    {
      const window = {} as { Dex: DexT; Generations: typeof Generations };

      // Some gymnastics required to load the learnsets data... (the bundle is not for node)
      const build = path.resolve(__dirname, './node_modules/@pkmn/dex/build');
      const converted = fs.readFileSync(`${build}/production.min.js`, 'utf8')
        .replace('./data/learnsets.json', `${build}/data/learnsets.json`);

      // eslint-disable-next-line no-eval
      eval(converted);
      // eslint-disable-next-line no-eval
      eval(fs.readFileSync(path.resolve(__dirname, './build/production.min.js'), 'utf8'));

      const gens = new window.Generations(window.Dex);
      expect(gens.get(2).species.get('kabigon')!.tier).toBe('OU');
      expect(gens.get(1).moves.get('thunderbolt')).toBeDefined();
      expect(gens.get(1).types.get('Ghost')!.effectiveness['Psychic']).toEqual(0);
      expect((await gens.get(8).learnsets.get('bulbasaur'))!.learnset!.leafstorm)
        .toEqual(['8M', '7E', '6E', '5E', '4E']);
      expect(gens.get(3).abilities.get('s turdy')!.shortDesc)
        .toEqual('OHKO moves fail when used against this Pokemon.');
    }
  });
});
