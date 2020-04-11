import {Dex} from './index';

describe('Dex', () => {
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
      if (!s.exists || s.gen > dex.gen) continue;
      if (s.isNonstandard && !['Past', 'Unobtainable'].includes(s.isNonstandard)) continue;
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
