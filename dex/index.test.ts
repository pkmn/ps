import {GenerationNum} from '@pkmn/types';
import {Dex} from './index';

describe('Dex', () => {

  describe('Species', () => {
    test('counts', () => {
      const counts = (gen: GenerationNum) => {
        const dex = Dex.forGen(gen);
        const count = { species: 0, formes: 0};
        for (const id in dex.data.Species) {
          const s = dex.getSpecies(id);
          if (s.exists || s.gen > dex.gen) continue;
          if (s.isNonstandard && ['Past', 'Unobtainable'].includes(s.isNonstandard)) continue;
          if (s.baseSpecies) {
            count.formes++;
          } else {
            count.species++;
          }
        }
        return count;
      }


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
      // Kyurem (2) + Meloetta (1) + Genesect (4)
      formes += 1 + 1 + 3 + 1 + 2 + 1 + 4;
      expect(counts(5)).toEqual({species: 649, formes});
      // Arceus (1) + Vivillon (2) + Meowstic (1) + Primal (2) +
      // Floette (1) + Aegislash (1) + Pumpkaboo (3) + Gourgeist (3) +
      // Hoopa (1) + Pikachu (6) + Mega (48)
      formes += 1 + 2 + 1 + 2 + 1 + 1 + 3 + 3 + 1 + 6 + 48;
      expect(counts(6)).toEqual({species: 721, formes});
      // Alola (18) + Totem (12) + Pikachu (8) + Eevee (1) +
      // Greninja (1) + Zygarde (2) + Oricorio (3) + Lycanroc (2) +
      // Wishiwashi (1) + Silvally (17) + Minior (1) + Mimikyu (1) +
      // Necrozma (3) + Magearna (1) - LGPE Starters/Melmetal (4)
      formes += 18 + 12 + 8 + 1 + 1 + 2 + 3 + 2 + 1 + 17 + 1 + 1 + 3 + 1 - 4;
      expect(counts(7)).toEqual({species: 809, formes});
      // FIXME gen 8
    });

    test('getSpecies', () => {
      expect(Dex.getSpecies('foo').exists).toBe(false);

      // normal
      expect(Dex.getSpecies('gengar').name).toBe('Gengar');
      expect(Dex.getSpecies('Gastrodon-East').name).toBe('Gastrodon');

      // nidoran
      expect(Dex.getSpecies('nidoran♀').name).toBe('Nidoran-F');
      expect(Dex.getSpecies('nidoran♂').name).toBe('Nidoran-M');

      // alias
      expect(Dex.getSpecies('cune').name).toBe('Suicune');
      expect(Dex.getSpecies('mence').name).toBe('Salamence');

      // mega
      expect(Dex.getSpecies('Mega Salamence').name).toBe('Salamence-Mega');
      expect(Dex.getSpecies('M-Alakazam').name).toBe('Alakazam-Mega');

      // primal
      expect(Dex.getSpecies('Primal Kyogre').name).toBe('Kyogre-Primal');
      expect(Dex.getSpecies('p groudon').name).toBe('Groudon-Primal');
    });

    test('getName', () => {;
      expect(Dex.getForme('Gastrodon-East')).toBe('Gastrodon-East');
      expect(Dex.getForme('sawsbuckwinter')).toBe('Sawsbuck-Winter');
      expect(Dex.getForme('Gengar')).toBe('Gengar');
    });

    test('fields', () => {
      expect(Dex.getSpecies('Clefable').types).toEqual(['Fairy']);
      expect(Dex.forGen(3).getSpecies('Clefable').types).toEqual(['Normal']);
      expect(Dex.getSpecies('Gengar').types[1]).toBe('Poison');
      expect(Dex.getSpecies('Pikachu').types[1]).not.toBeDefined();
      expect(Dex.getSpecies('Mew').baseStats)
          .toEqual({hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100});
      expect(Dex.forGen(1).getSpecies('Tauros').baseStats)
          .toEqual({hp: 75, atk: 100, def: 95, spa: 70, spd: 70, spe: 110});
      expect(Dex.forGen(6).getSpecies('Pelipper').baseStats.spa).toEqual(85);
      expect(Dex.getSpecies('Pelipper').baseStats.spa).toEqual(95);
      expect(Dex.forGen(6).getSpecies('Greninja').abilities)
          .toEqual({'0': 'Torrent', 'H': 'Protean'});
      expect(Dex.forGen(7).getSpecies('Greninja').abilities)
          .toEqual({'0': 'Torrent', 'H': 'Protean', 'S': 'Battle Bond'});
      expect(Dex.forGen(2).getSpecies('Snorlax').tier).toBe('OU');
      expect(Dex.forGen(5).getSpecies('Snorlax').tier).toBe('UU');
      expect(Dex.forGen(3).getSpecies('Chansey').prevo).not.toBeDefined();
      expect(Dex.forGen(4).getSpecies('Chansey').prevo).toBe('happiny');
      expect(Dex.forGen(2).getSpecies('Chansey').evos).toEqual(['blissey']);
      expect(Dex.getSpecies('Charizard-Mega-X').baseSpecies).toBe('Charizard');
      expect(Dex.getSpecies('Giratina-O').forme).toBe('Origin');
      expect(Dex.getSpecies('Giratina').baseForme).toBe('Altered');
      expect(Dex.getSpecies('Shaymin').otherFormes).toEqual(['shayminsky']);
      expect(Dex.getSpecies('Gastrodon-East').cosmeticFormes).toEqual([
        'gastrodoneast'
      ]);
      expect(Dex.getSpecies('Garchomp-Mega').isMega).toBe(true);
      expect(Dex.getSpecies('Yanmega').isMega).not.toBeDefined();
      expect(Dex.getSpecies('Kyogre-Primal').isPrimal).toBe(true);
    });

    test('cached', () => {
      const a = Dex.forGen(6).getSpecies('Gengar');
      const b = Dex.forGen(6).getSpecies('Gengar');
      const c = Dex.getSpecies('Gengar');

      expect(b).toBe(a);
      expect(c).not.toBe(a);
      expect(b.name).toBe('Gengar');
    });
  });












  it('#getAbility', () => {
    expect(Dex.getAbility('Sturdy').shortDesc) // eslint-disable-next-line
      .toEqual('If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.');
    expect(Dex.forGen(3).getAbility('s turdy').shortDesc)
      .toEqual('OHKO moves fail when used against this Pokemon.');
  });

  it('#getItem', () => {
    expect(Dex.getItem('Aerodactylite').megaEvolves).toEqual('Aerodactyl');
  });

  it('#getMove', () => {
    expect(Dex.getMove('Draco Meteor').basePower).toEqual(130);
    expect(Dex.forGen(4).getMove('DracoMeteor').basePower).toEqual(140);
    expect(Dex.getMove('Crunch').category).toEqual('Physical');
    expect(Dex.forGen(2).getMove('CRUNCH').category).toEqual('Special');
  });

  it('#getSpecies', () => {
    expect(Dex.getSpecies('Alakazam').baseStats.spd).toEqual(95);
    expect(Dex.forGen(3).getSpecies('Alakazam').baseStats.spd).toEqual(85);

    const dex = Dex.forGen(1);
    let count = 0;
    for (const id in dex.data.Species) {
      const s = dex.getSpecies(id);
      if (s.exists || s.gen > dex.gen) continue;
      if (s.isNonstandard && ['Past', 'Unobtainable'].includes(s.isNonstandard)) continue;
       count++;
    }
    expect(count).toBe(151);
  });

  it('#getType', () => {
    expect(Dex.getType('Fairy').exists).toBe(true);
    expect(Dex.forGen(1).getType('steel').exists).toBe(false);
    expect(Dex.forGen(1).getType('Psychic').damageTaken['Ghost']).toEqual(3);
    expect(Dex.getType('Psychic').damageTaken['Ghost']).toEqual(1);
    expect(Dex.getType('Fire').damageTaken['Water']).toEqual(1);
    expect(Dex.getType('Water').damageTaken['Fire']).toEqual(2);
    expect(Dex.getType('Ground').damageTaken['Electric']).toEqual(3);
  });
});
