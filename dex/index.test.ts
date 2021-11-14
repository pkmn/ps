import {GenerationNum} from '@pkmn/dex-types';
import {Dex} from './index';

import * as fs from 'fs';
import * as path from 'path';

describe('Dex', () => {
  describe('Conditions', () => {
    it('#get', () => {
      expect(Dex.conditions.get('').exists).toBe(false);
      expect(Dex.conditions.get('foo').exists).toBe(false);

      expect(Dex.conditions.get('ability: Flash Fire').name).toBe('Flash Fire');
      expect(Dex.conditions.get('ability: Foo').exists).toBe(false);

      expect(Dex.conditions.get('item: Choice Band').name).toBe('Choice Band');
      expect(Dex.conditions.get('item: Foo').exists).toBe(false);

      expect(Dex.conditions.get('item: Metronome').name).toBe('Metronome');
      expect(Dex.conditions.get('item: Metronome').effectType).toBe('Item');

      // Falls back to Condition
      expect(Dex.conditions.get('Metronome').effectType).toBe('Condition');
    });
  });

  describe('Abilities', () => {
    it('#get', () => {
      expect(Dex.abilities.get('foo').exists).toBe(false);
      expect(Dex.abilities.get('Illuminate').effectType).toBe('Ability');
      expect(Dex.forGen(6).abilities.get('Beast Boost').isNonstandard).toBe('Future');
      expect(Dex.forGen(7).abilities.get('Beast Boost').isNonstandard).toBeNull();
      expect(Dex.abilities.get('Shield Dust'))
        .toEqual(Dex.forGen(4).abilities.get('Shield Dust'));
      expect(Dex.forGen(3).abilities.get('Lightning Rod'))
        .not.toEqual(Dex.forGen(4).abilities.get('Lightning Rod'));

      expect(Dex.abilities.get('pheal').name).toBe('Poison Heal');
      expect(Dex.abilities.get('stag').name).toBe('Shadow Tag');

      expect(Dex.abilities.get('Sturdy').shortDesc) // eslint-disable-next-line
        .toEqual('If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.');
      expect(Dex.forGen(3).abilities.get('s turdy').shortDesc)
        .toBe('OHKO moves fail when used against this Pokemon.');
    });

    it('counts', () => {
      const counts = (gen: GenerationNum) => {
        const dex = Dex.forGen(gen);
        let count = 0;
        for (const id in dex.data.Abilities) {
          const a = dex.abilities.get(id);
          if (!a.exists || a.isNonstandard || a.id === 'noability') continue;
          count++;
        }
        return count;
      };

      const COUNTS = [0, 0, 76, 47, 41, 27, 42, 34];
      let total = 0;
      for (let gen = 1; gen <= 8; gen++) {
        expect(counts(gen as GenerationNum)).toEqual(total += COUNTS[gen - 1]);
      }
    });

    it('cached', () => {
      const a = Dex.forGen(6).abilities.get('Mummy');
      const b = Dex.forGen(6).abilities.get('Mummy');
      const c = Dex.abilities.get('Mummy');

      expect(b).toBe(a);
      expect(c).not.toBe(a);
      expect(b.name).toBe('Mummy');
    });
  });

  describe('Items', () => {
    it('#get', () => {
      expect(Dex.items.get('Aerodactylite').megaEvolves).toBe('Aerodactyl');

      expect(Dex.forGen(3).items.get('Berry').isNonstandard).toBe('Past');
      expect(Dex.forGen(3).items.get('Gold Berry').isNonstandard).toBe('Past');
      expect(Dex.forGen(3).items.get('Pink Bow').isNonstandard).toBe('Past');
      expect(Dex.forGen(3).items.get('Polkadot Bow').isNonstandard).toBe('Past');

      expect(Dex.forGen(2).items.get('berry').name).toBe('Berry');
      expect(Dex.forGen(2).items.get('berry').isBerry).toBe(true);
      expect(Dex.forGen(2).items.get('goldberry').name).toBe('Gold Berry');
      expect(Dex.forGen(2).items.get('goldberry').isBerry).toBe(true);
      expect(Dex.forGen(2).items.get('Pink Bow').isNonstandard).toBeNull();
      expect(Dex.forGen(2).items.get('Polkadot Bow').isNonstandard).toBeNull();

      expect(Dex.items.get('foo').exists).toBe(false);

      expect(Dex.forGen(2).items.get('Thick Club')).toEqual(Dex.items.get('Thick Club'));
      expect(Dex.forGen(3).items.get('Sitrus Berry'))
        .not.toEqual(Dex.forGen(4).items.get('Sitrus Berry'));

      expect(Dex.forGen(3).items.get('Red Orb').isNonstandard).toBe('Future');
      expect(Dex.forGen(6).items.get('Red Orb').gen).toBe(6);
      expect(Dex.forGen(2).items.get('Old Amber').isNonstandard).toBe('Future');
      expect(Dex.forGen(5).items.get('Old Amber').gen).toBe(3);
    });

    it('fields', () => {
      expect(Dex.items.get('Sitrus Berry').effectType).toBe('Item');
      expect(Dex.forGen(4).items.get('Sitrus Berry').isBerry).toBe(true);
      expect(Dex.items.get('Heracronite').megaStone).toBe('Heracross-Mega');
      expect(Dex.items.get('Charizardite-X').megaEvolves).toBe('Charizard');
      expect(Dex.items.get('Pikanium Z').zMove).toBe('Catastropika');
      expect(Dex.items.get('Fairium Z').zMove).toBe(true);
      expect(Dex.items.get('Steelium Z').zMoveType).toBe('Steel');
      expect(Dex.items.get('Lunalium Z').itemUser).toEqual([
        'Lunala', 'Necrozma-Dawn-Wings',
      ]);
      expect(Dex.items.get('Meadow Plate').onPlate).toBe('Grass');
      expect(Dex.items.get('Electric Memory').onMemory).toBe('Electric');
      expect(Dex.items.get('Douse Drive').onDrive).toBe('Water');
      expect(Dex.forGen(6).items.get('Electric Gem').isGem).toBe(true);
      expect(Dex.items.get('Choice Specs').isChoice).toBe(true);
    });

    it('cached', () => {
      const a = Dex.forGen(6).items.get('Choice Band');
      const b = Dex.forGen(6).items.get('Choice Band');
      const c = Dex.items.get('Choice Band');

      expect(b).toBe(a);
      expect(c).not.toBe(a);
      expect(b.name).toBe('Choice Band');
    });
  });

  describe('Moves', () => {
    it('#get', () => {
      expect(Dex.moves.get('foo').exists).toBe(false);
      expect(Dex.forGen(1).moves.get('Thunderbolt').exists).toBe(true);
      expect(Dex.moves.get('Draco Meteor').basePower).toBe(130);
      expect(Dex.forGen(6).moves.get('eq')).toEqual(Dex.forGen(6).moves.get('Earthquake'));
      expect(Dex.forGen(4).moves.get('DracoMeteor').basePower).toBe(140);
      expect(Dex.moves.get('Crunch').category).toBe('Physical');
      expect(Dex.forGen(2).moves.get('CRUNCH').category).toBe('Special');
      expect(Dex.moves.get('Hidden Power [Bug]').name).toBe('Hidden Power Bug');
    });

    it('fields', () => {
      expect(Dex.moves.get('Tackle').effectType).toBe('Move');
      expect(Dex.forGen(1).moves.get('Surf').basePower).toBe(95);
      expect(Dex.moves.get('Surf').basePower).toBe(90);
      expect(Dex.forGen(4).moves.get('Curse').type).toBe('???');
      expect(Dex.forGen(5).moves.get('Curse').type).toBe('Ghost');
      // FIXME expect(Dex.forGen(1).moves.get('Struggle').pp).toBe(10);
      expect(Dex.forGen(2).moves.get('Struggle').pp).toBe(1);
      expect(Dex.forGen(3).moves.get('Bide').accuracy).toBe(100);
      expect(Dex.forGen(4).moves.get('Bide').accuracy).toBe(true);
      expect(Dex.forGen(3).moves.get('Psychic').category).toBe('Special');
      expect(Dex.moves.get('Rock Slide').target).toBe('allAdjacentFoes');
      expect(Dex.forGen(4).moves.get('Psychic').category).toBe('Special');
      expect(Dex.forGen(5).moves.get('Psychic').overrideOffensivePokemon).toBeUndefined();
      expect(Dex.forGen(5).moves.get('Foul Play').overrideOffensivePokemon).toBe('target');
      expect(Dex.forGen(1).moves.get('Surf').overrideOffensiveStat).toBeUndefined();
      expect(Dex.forGen(8).moves.get('Body Press').overrideOffensiveStat).toBe('def');
      expect(Dex.forGen(5).moves.get('Grass Knot').overrideDefensiveStat).toBeUndefined();
      expect(Dex.forGen(6).moves.get('Psyshock').overrideDefensiveStat).toBe('def');
      expect(Dex.moves.get('Rock Slide').target).toBe('allAdjacentFoes');
      expect(Dex.moves.get('Extreme Speed').priority).toBe(2);
      // FIXME expect(Dex.forGen(1).moves.get('Acid Armor').flags).toEqual({});
      expect(Dex.moves.get('Recover').flags.heal).toBe(1);
      expect(Dex.moves.get('Will-O-Wisp').status).toBe('brn');
      expect(Dex.moves.get('Stealth Rock').sideCondition).toBe('stealthrock');
      expect(Dex.moves.get('Confuse Ray').volatileStatus).toBe('confusion');
      expect(Dex.forGen(1).moves.get('Amnesia').boosts).toEqual({spa: 2, spd: 2});
      expect(Dex.forGen(2).moves.get('Amnesia').boosts).toEqual({spd: 2});
      expect(Dex.moves.get('Karate Chop').critRatio).toBe(2);
      expect(Dex.moves.get('Frost Breath').critRatio).toBe(1);
      expect(Dex.moves.get('Frost Breath').willCrit).toBe(true);
      expect(Dex.moves.get('Bloom Doom').isZ).toBe('grassiumz');
      expect(Dex.moves.get('Acid').isZ).toBeFalsy();
      expect(Dex.moves.get('Acid').zMove!.basePower).toBe(100);
      // FIXME expect(Dex.forGen(6).moves.get('Acid').zMove).toBeFalsy();
      expect(Dex.moves.get('Hypnosis').zMove!.boost).toEqual({spe: 1});
      expect(Dex.moves.get('Double Kick').multihit).toBe(2);
      expect(Dex.moves.get('Rock Blast').multihit).toEqual([2, 5]);
      expect(Dex.moves.get('Softboiled').heal).toEqual([1, 2]);
      expect(Dex.moves.get('Hi Jump Kick').hasCrashDamage).toBe(true);
      expect(Dex.moves.get('Struggle').struggleRecoil).toBe(true);
      expect(Dex.forGen(1).moves.get('Double Edge').recoil).toEqual([25, 100]);
      expect(Dex.moves.get('Double Edge').recoil).toEqual([33, 100]);
      expect(Dex.moves.get('Mind Blown').mindBlownRecoil).toBe(true);
      expect(Dex.moves.get('Feint').breaksProtect).toBe(true);
      expect(Dex.moves.get('Sacred Sword').ignoreDefensive).toBe(true);
      expect(Dex.moves.get('Fissure').ohko).toBe(true);

      // self
      expect(Dex.moves.get('Petal Dance').self!.volatileStatus).toBe('lockedmove');
      expect(Dex.moves.get('Overheat').self!.boosts).toEqual({spa: -2});

      // secondaries
      expect(Dex.moves.get('Thunder Fang').secondaries!).toHaveLength(2);
      expect(Dex.forGen(1).moves.get('Psychic').secondaries![0].chance).toBe(33);
      expect(Dex.forGen(2).moves.get('Psychic').secondaries![0].chance).toBe(10);
      expect(Dex.forGen(1).moves.get('Psychic').secondaries![0].boosts)
        .toEqual({spa: -1, spd: -1});
      expect(Dex.forGen(2).moves.get('Psychic').secondaries![0].boosts)
        .toEqual({spd: -1});
      expect(Dex.moves.get('Fire Blast').secondaries![0].status).toBe('brn');
      expect(Dex.moves.get('Hurricane').secondaries![0].volatileStatus)
        .toBe('confusion');
    });

    it('counts', () => {
      const counts = (gen: GenerationNum) => {
        const dex = Dex.forGen(gen);
        let count = 0;
        for (const id in dex.data.Moves) {
          const m = dex.moves.get(id);
          if (!m.exists || m.isNonstandard) continue;
          count++;
        }
        return count;
      };

      const COUNTS = [165, 86 + 16, 103, 113, 92, 59, 105 - 14];
      let total = 0;
      for (let gen = 1; gen <= 7; gen++) {
        expect(counts(gen as GenerationNum)).toEqual(total += COUNTS[gen - 1]);
      }
      expect(counts(8)).toBe(623 + 41 + 34 - /* GMax */ 33);
    });

    it('cached', () => {
      const a = Dex.forGen(6).moves.get('Earthquake');
      const b = Dex.forGen(6).moves.get('Earthquake');
      const c = Dex.moves.get('Earthquake');

      expect(b).toBe(a);
      expect(c).not.toBe(a);
      expect(b.name).toBe('Earthquake');
    });
  });

  describe('Species', () => {
    it('#get', () => {
      expect(Dex.species.get('foo').exists).toBe(false);
      // normal
      expect(Dex.species.get('gengar').name).toBe('Gengar');
      expect(Dex.species.get('Gastrodon-East').name).toBe('Gastrodon-East');
      expect(Dex.species.get('sawsbuckwinter').name).toBe('Sawsbuck-Winter');
      // nidoran
      expect(Dex.species.get('nidoran♀').name).toBe('Nidoran-F');
      expect(Dex.species.get('nidoran♂').name).toBe('Nidoran-M');
      // alias
      expect(Dex.species.get('cune').name).toBe('Suicune');
      expect(Dex.species.get('mence').name).toBe('Salamence');
      // mega
      expect(Dex.species.get('Mega Salamence').name).toBe('Salamence-Mega');
      expect(Dex.species.get('M-Alakazam').name).toBe('Alakazam-Mega');
      // primal
      expect(Dex.species.get('Primal Kyogre').name).toBe('Kyogre-Primal');
      expect(Dex.species.get('p groudon').name).toBe('Groudon-Primal');
      // Rockruff-Dusk
      expect(Dex.species.get('Rockruff-Dusk').exists).toBe(true);
      // FIXME expect(Dex.species.get('Rockruff-Dusk').name).toBe('Rockruff-Dusk');
    });
    it('counts', () => {
      const counts = (gen: GenerationNum) => {
        const dex = Dex.forGen(gen);
        const count = {species: 0, formes: 0};
        for (const id in dex.data.Species) {
          const s = dex.species.get(id);
          if (!s.exists || s.tier === 'Illegal' || s.isNonstandard) continue;
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
      // Silvally (17) + Rotom (5) + Basculin (1) + Meowstic (1) +
      // Aegislash (1) + Pumpkaboo (3) + Gourgeist (3) + Pikachu (7) + Galar (14) +
      // Alola (8) + Indeedee (1) + Morpeko (1) + Eiscue (1) + Zacian/Zamazenta (2) +
      // Toxtricity (1) + Cramorant (2) + Necrozma (2) + Mimikyu (2) + Wishiwashi (1) +
      // Keldeo (1) + Kyruem (2) + Darmanitan (2) + Cherrim (1)
      // {DLC1} Alola (4) + Galar (1) + Magearna (1) + Urshifu (1) +
      // Rockruff (1) + Lycanroc (2) + [Pikachu (1) + Zarude (1)]
      // {DLC2} Giratina (1) + *-Therian (3) + Genesect (4) + Zygarde (2) +
      // Birds (3) + Slowking (1) + Calyrex (2)
      // {GMax} 26 + 7
      formes = 17 + 5 + 1 + 1 + 1 + 3 + 3 + 7 + 14 + 8 +
        1 + 1 + 1 + 2 + 1 + 2 + 2 + 2 + 1 + 1 + 2 + 2 + 1 +
        (4 + 1 + 1 + 1 + 1 + 2 + (1 + 1)) + (1 + 3 + 4 + 2 + 3 + 1 + 2) - 1; // FIXME Rockruff
      expect(counts(8)).toEqual({species: 664, formes});
    });


    it('fields', () => {
      expect(Dex.species.get('Clefable').types).toEqual(['Fairy']);
      expect(Dex.forGen(3).species.get('Clefable').types).toEqual(['Normal']);
      expect(Dex.species.get('Gengar').types[1]).toBe('Poison');
      expect(Dex.species.get('Pikachu').types[1]).toBeUndefined();
      expect(Dex.species.get('Mew').baseStats)
        .toEqual({hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100});
      expect(Dex.forGen(1).species.get('Tauros').baseStats)
        .toEqual({hp: 75, atk: 100, def: 95, spa: 70, spd: 70, spe: 110});
      expect(Dex.forGen(6).species.get('Pelipper').baseStats.spa).toBe(85);
      expect(Dex.species.get('Pelipper').baseStats.spa).toBe(95);
      expect(Dex.forGen(6).species.get('Greninja').abilities)
        .toEqual({'0': 'Torrent', 'H': 'Protean'});
      expect(Dex.forGen(7).species.get('Greninja').abilities)
        .toEqual({'0': 'Torrent', 'H': 'Protean', 'S': 'Battle Bond'});
      expect(Dex.forGen(3).species.get('Clefable').abilities)
        .toEqual({'0': 'Cute Charm', '1': 'Magic Guard'});
      expect(Dex.forGen(8).species.get('Clefable').abilities)
        .toEqual({'0': 'Cute Charm', '1': 'Magic Guard', H: 'Unaware'});
      expect(Dex.forGen(5).species.get('Milotic').abilities).toEqual({'0': 'Marvel Scale'});
      expect(Dex.forGen(6).species.get('Milotic').abilities)
        .toEqual({'0': 'Marvel Scale', '1': 'Competitive', H: 'Cute Charm'});
      expect(Dex.forGen(2).species.get('Snorlax').tier).toBe('OU');
      expect(Dex.forGen(5).species.get('Snorlax').tier).toBe('UU');
      expect(
        Dex.forGen(3).species.get(
          Dex.forGen(3).species.get('Chansey').prevo!
        ).isNonstandard
      ).toBe('Future');
      expect(Dex.forGen(4).species.get('Chansey').prevo).toBe('Happiny');
      expect(Dex.forGen(2).species.get('Chansey').evos).toEqual(['Blissey']);
      expect(Dex.species.get('Charizard-Mega-X').baseSpecies).toBe('Charizard');
      expect(Dex.species.get('Giratina-O').forme).toBe('Origin');
      expect(Dex.species.get('Giratina').baseForme).toBe('Altered');
      expect(Dex.species.get('Shaymin').otherFormes).toEqual(['Shaymin-Sky']);
      expect(Dex.forGen(7).species.get('Charizard').otherFormes)
        .toEqual(['Charizard-Mega-X', 'Charizard-Mega-Y']);
      expect(Dex.species.get('Gastrodon').cosmeticFormes).toEqual(['Gastrodon-East']);
      expect(Dex.species.get('Garchomp-Mega').isMega).toBe(true);
      expect(Dex.species.get('Yanmega').isMega).toBeUndefined();
      expect(Dex.species.get('Kyogre-Primal').isPrimal).toBe(true);
    });

    it('cached', () => {
      const a = Dex.forGen(6).species.get('Gengar');
      const b = Dex.forGen(6).species.get('Gengar');
      const c = Dex.species.get('Gengar');

      expect(b).toBe(a);
      expect(c).not.toBe(a);
      expect(b.name).toBe('Gengar');
    });
  });

  describe('Learnsets', () => {
    it('#get', async () => {
      expect((await Dex.learnsets.get('foo')).exists).toBe(false);
      const learnset = await Dex.forGen(1).learnsets.get('mew');
      expect(learnset.effectType).toBe('Learnset');
      expect(learnset.exists).toBe(true);
      expect(learnset.eventOnly).toBe(true);
      expect(learnset.eventData).toContainEqual({generation: 1, level: 5, moves: ['pound']});
      expect(learnset.encounters).toBeUndefined();
      expect(learnset.learnset!.reflect).toEqual(['1M']);

      expect((await Dex.learnsets.get('bulbasaur')).learnset!.leafstorm)
        .toEqual(['8M', '7E', '6E', '5E', '4E']);
    });
  });

  describe('Natures', () => {
    it('#get', () => {
      const adamant = Dex.natures.get('adamant');
      expect(adamant.exists).toBe(true);
      expect(adamant.name).toBe('Adamant');
      expect(adamant.plus).toBe('atk');
      expect(adamant.minus).toBe('spa');

      const serious = Dex.forGen(4).natures.get('serious');
      expect(serious.exists).toBe(true);
      expect(serious.name).toBe('Serious');
      expect(serious.plus).toBeUndefined();
      expect(serious.minus).toBeUndefined();

      expect(Dex.natures.get('foo').exists).toBeFalsy();
    });

    it('count', () => {
      expect(Object.keys(Dex.data.Natures)).toHaveLength(25);
    });
  });

  describe('Types', () => {
    it('#get', () => {
      expect(Dex.types.get('Fairy').exists).toBe(true);
      expect(Dex.forGen(1).types.get('steel').isNonstandard).toBe('Future');
      expect(Dex.forGen(1).types.get('Psychic').damageTaken['Ghost']).toBe(3);
      expect(Dex.types.get('Psychic').damageTaken['Ghost']).toBe(1);
      expect(Dex.types.get('Fire').damageTaken['Water']).toBe(1);
      expect(Dex.types.get('Water').damageTaken['Fire']).toBe(2);
      expect(Dex.types.get('Ground').damageTaken['Electric']).toBe(3);
      expect(Dex.types.get('Ice').HPdvs).toEqual({'def': 13});
      expect(Dex.types.get('Flying').HPdvs).toEqual({'atk': 12, 'def': 13});
      expect(Dex.types.get('Dragon').HPivs).toEqual({'atk': 30});
      expect(Dex.types.get('Ground').HPivs).toEqual({'spa': 30, 'spd': 30});
    });

    it('#getImmunity', () => {
      expect(Dex.getImmunity('Electric', ['Ground'])).toBe(false);
      expect(Dex.getImmunity({type: 'Fire'}, 'Fire')).toBe(true);
      expect(Dex.getImmunity('Ground', ['Ghost', 'Flying'])).toBe(false);
      expect(Dex.getImmunity('Normal', {getTypes: () => ['Steel', 'Rock']})).toBe(true);
      expect(Dex.forGen(1).getImmunity('Ghost', 'Psychic')).toBe(false);
    });

    it('#getEffectiveness', () => {
      expect(Dex.getEffectiveness('Water', ['Fire'])).toBe(1);
      expect(Dex.getEffectiveness({type: 'Fire'}, 'Fire')).toBe(-1);
      expect(Dex.getEffectiveness('Dark', ['Ghost', 'Psychic'])).toBe(2);
      expect(Dex.getEffectiveness('Normal', {getTypes: () => ['Steel', 'Rock']})).toBe(-2);
      expect(Dex.getEffectiveness('BUug', 'Bug')).toBe(0);
    });

    it('#getHiddenPower', () => {
      const ivs = {hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
      for (let gen = 3; gen <= 7; gen++) {
        const dex = Dex.forGen(gen);
        for (const t in dex.data.Types) {
          const type = t.charAt(0).toUpperCase() + t.slice(1);
          if (type === 'Normal' || type === 'Fairy') continue;
          expect(dex.getHiddenPower({...ivs, ...dex.types.get(type).HPivs}))
            .toEqual({power: gen >= 6 ? 60 : 70, type});
        }
      }
      expect(Dex.forGen(2).getHiddenPower({hp: 31, atk: 31, def: 27, spe: 31, spa: 31, spd: 31}))
        .toEqual({power: 70, type: 'Ice'});
    });
  });
});

describe('Bundle', () => {
  it('usage', async () => {
    {
      const window = {} as { Dex: typeof Dex };
      // eslint-disable-next-line no-eval
      eval(fs.readFileSync(path.resolve(__dirname, './build/production.min.js'), 'utf8'));
      expect(window.Dex.forGen(2).species.get('kabigon').tier).toBe('OU');
      expect(Dex.forGen(1).moves.get('thunderbolt').exists).toBe(true);
      expect(window.Dex.forGen(1).types.get('Psychic').damageTaken['Ghost']).toBe(3);
      expect((await window.Dex.learnsets.get('bulbasaur')).learnset!.leafstorm)
        .toEqual(['8M', '7E', '6E', '5E', '4E']);
      expect(window.Dex.forGen(3).abilities.get('s turdy').shortDesc)
        .toBe('OHKO moves fail when used against this Pokemon.');
    }
  });
});
