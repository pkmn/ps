/* eslint-disable @typescript-eslint/no-shadow */
import * as dex from '@pkmn/dex';
import {Ability, AbilityData, Dex as DexT, ID, ModData} from '@pkmn/dex-types';
import * as sim from '@pkmn/sim';

import {ModdedDex} from './index';

const DATA = {
  'dex': dex.Dex as DexT,
  'sim': sim.Dex as unknown as DexT,
};

for (const [pkg, Dex] of Object.entries(DATA)) {
  const expectFormat = (dex: ModdedDex, s: string) => {
    if (pkg === 'sim') expect((dex as unknown as typeof sim.Dex).formats.get(s)).toBeDefined();
  };

  describe(`ModdedDex (${pkg})`, () => {
    describe('mods', () => {
      it('gen1jpn', async () => {
        const data = await import('./gen1jpn') as ModData;
        const dex = new ModdedDex(Dex.mod('gen1stadium' as ID, data));
        expect(dex.gen).toBe(1);
        expect(dex.moves.get('swift').accuracy).toBe(100);
        expect(dex.moves.get('blizzard').secondary!.chance).toBe(30);
        expectFormat(dex, 'gen1japaneseou');
      });

      it('gen1stadium', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen1stadium' as ID, await import('./gen1stadium') as ModData));
        expect(dex.gen).toBe(1);
        expect(dex.moves.get('counter').ignoreImmunity).toBe(true);
        expectFormat(dex, 'gen1stadiumou');
      });

      it('gen2stadium2', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen1stadium' as ID, await import('./gen2stadium2') as ModData));
        expect(dex.gen).toBe(2);
        expectFormat(dex, 'gen2nc2000');
      });

      it('gen3rs', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen3rs' as ID, await import('./gen3rs') as ModData));
        expect(dex.gen).toBe(3);
        expect(dex.species.get('Jirachi').isNonstandard).toBe('Unobtainable');
        expect(dex.items.get('Salac Berry').isNonstandard).toBe('Unobtainable');
        expect((await dex.learnsets.get('seaking')).learnset!['megahorn']).toBeUndefined();
        expectFormat(dex, 'gen3adv200');
      });

      it('gen4pt', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen4pt' as ID, await import('./gen4pt') as ModData));
        expect(dex.gen).toBe(4);
        expect(dex.species.get('Pichu-Spiky-Eared').isNonstandard).toBe('Future');
        expect((await dex.learnsets.get('hooh')).learnset!['bravebird']).toBeUndefined();
        expectFormat(dex, 'gen4vgc2009');
      });

      it('gen5bw1', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen5bw1' as ID, await import('./gen5bw1') as ModData));
        expect(dex.gen).toBe(5);
        expect(dex.species.get('Kyurem-Black').isNonstandard).toBe('Future');
        expect(dex.species.get('beedrill').unreleasedHidden).toBe(true);
        expect(dex.items.get('Custap Berry').isNonstandard).toBe('Unobtainable');
        expect((await dex.learnsets.get('growlithe')).learnset!['outrage']).toBeUndefined();
        expectFormat(dex, 'gen5vgc2012');
      });

      it('gen6xy', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen6xy' as ID, await import('./gen6xy') as ModData));
        expect(dex.gen).toBe(6);
        expect(dex.species.get('Beedrill-Mega').isNonstandard).toBe('Future');
        expect(dex.species.get('articuno').unreleasedHidden).toBe(true);
        expect(dex.items.get('red orb').isNonstandard).toBe('Future');
        expect(dex.moves.get('Hyperspace Fury').isNonstandard).toBe('Future');
        expect((await dex.learnsets.get('groudon')).learnset!['precipiceblades']).toBeUndefined();
        expectFormat(dex, 'gen6vgc2014');
      });

      it('gen7sm', async () => {
        const dex = new ModdedDex(Dex.mod('gen7sm' as ID, await import('./gen7sm') as ModData));
        expect(dex.gen).toBe(7);
        expect(dex.species.get('naganadel').isNonstandard).toBe('Future');
        expect(dex.items.get('kommoniumz').isNonstandard).toBe('Future');
        expect((await dex.learnsets.get('swirlix')).learnset!['stickyweb']).toBeUndefined();
        expect(dex.species.get('incineroar').unreleasedHidden).toBe(true);
        expect((await dex.learnsets.get('sandslashalola')).learnset!['iceshard']).toBeUndefined();
        expectFormat(dex, 'gen7vgc2017');
      });

      it('gen7letsgo', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen7letsgo' as ID, await import('./gen7letsgo') as ModData));
        expect(dex.gen).toBe(7);
        expect(dex.species.get('porygon').evos).toEqual([]);
        expect(dex.species.get('clefairy').prevo).toBe('');
        expect(dex.species.get('melmetal').isNonstandard).toBeNull();
        expect(dex.moves.get('bouncybubble').isNonstandard).toBeNull();
        expect(dex.moves.get('teleport').shortDesc).toBe('User switches out.');
        expect((await dex.learnsets.get('sandslashalola')).learnset!['iceshard']).toEqual(['7L1']);
        expectFormat(dex, 'gen7letsgodoublesou');
      });

      it('gen8dlc1', async () => {
        const dex = new ModdedDex(Dex.mod('gen8dlc1' as ID, await import('./gen8dlc1') as ModData));
        expect(dex.gen).toBe(8);
        expect(dex.species.get('Nidoking').tier).toBe('Unreleased');
        expect(dex.species.get('Regidrago').tier).toBe('Unreleased');
        expect(dex.items.get('Custap Berry').isNonstandard).toBe('Unobtainable');
        expect(dex.species.get('dracozolt').unreleasedHidden).toBe(true);
        expect(dex.abilities.get('Curious Medicine').isNonstandard).toBe('Unobtainable');
        expect(dex.moves.get('Dragon Ascent').isNonstandard).toBe('Unobtainable');
        expectFormat(dex, 'gen8vgc2020');
      });

      it('gen9predlc', async () => {
        Dex.mod('gen9dlc1' as ID, await import('./gen9dlc1') as ModData);
        const dex =
          new ModdedDex(Dex.mod('gen9predlc' as ID, await import('./gen9predlc') as ModData));
        expect(dex.gen).toBe(9);
        expect(dex.species.get('Bulbasaur').tier).toBe('Illegal');
        expect(dex.items.get('Syrupy Apple').isNonstandard).toBe('Future');
        expect(dex.abilities.get('Hospitality').isNonstandard).toBe('Future');
        expect(dex.moves.get('Blood Moon').isNonstandard).toBe('Future');
        expect(dex.moves.get('Clanging Scales').isNonstandard).toBe('Past');
        expectFormat(dex, 'gen9vgc2023regd');
      });

      it('gen9dlc1', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen9dlc1' as ID, await import('./gen9dlc1') as ModData));
        expect(dex.gen).toBe(9);
        expect(dex.species.get('Gouging Fire').tier).toBe('Illegal');
        expect(dex.items.get('Dubious Disc').isNonstandard).toBe('Past');
        expect(dex.moves.get('Tachyon Cutter').isNonstandard).toBe('Future');
        expect(dex.moves.get('Sacred Fire').isNonstandard).toBe('Past');
        expectFormat(dex, 'gen9dlc1ou');
      });
    });

    describe('types', () => {
      it('custom', () => {
        const dex = Dex.mod('foo' as ID, {
          Abilities: {
            magicguard: {
              inherit: true,
              foo: 5,
            },
          },
        } as ModData);
        const modded = new ModdedDex<Ability & {foo?: number}, AbilityData & {foo?: number}>(dex);
        expect(modded.abilities.get('magicguard').foo).toBe(5);
      });
    });
  });
}
