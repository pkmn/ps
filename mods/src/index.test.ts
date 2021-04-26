/* eslint-disable @typescript-eslint/no-shadow */
import {ModdedDex} from './index';
import {Dex as DexT, ID, ModData, Ability, AbilityData} from '@pkmn/dex-types';

import * as dex from '@pkmn/dex';
import * as sim from '@pkmn/sim';

const DATA = {
  'dex': dex.Dex as DexT,
  'sim': sim.Dex as unknown as DexT,
};

for (const [pkg, Dex] of Object.entries(DATA)) {
  describe(`ModdedDex (${pkg})`, () => {
    describe('mods', () => {
      it('gen1jpn', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen1stadium' as ID, await import('./gen1jpn') as ModData));
        expect(dex.gen).toBe(1);
        expect(dex.moves.get('swift').accuracy).toBe(100);
        expect(dex.moves.get('blizzard').secondary!.chance).toBe(30);
      });

      it('gen1stadium', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen1stadium' as ID, await import('./gen1stadium') as ModData));
        expect(dex.gen).toBe(1);
        expect(dex.moves.get('highjumpkick').desc)
          .toEqual('If this attack misses the target, the user takes 1 HP of damage.');
      });

      it('gen2stadium2', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen1stadium' as ID, await import('./gen2stadium2') as ModData));
        expect(dex.gen).toBe(2);
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
      });

      it('letsgo', async () => {
        const dex = new ModdedDex(Dex.mod('letsgo' as ID, await import('./letsgo') as ModData));
        expect(dex.gen).toBe(7);
        expect(dex.species.get('porygon').evos).toEqual([]);
        expect(dex.species.get('clefairy').prevo).toBe('');
        expect(dex.species.get('melmetal').isNonstandard).toBeNull();
        expect(dex.moves.get('bouncybubble').isNonstandard).toBeNull();
        expect(dex.moves.get('teleport').shortDesc).toBe('User switches out.');
        expect((await dex.learnsets.get('sandslashalola')).learnset!['iceshard']).toEqual(['7L1']);
      });

      it('vgc17', async () => {
        const dex = new ModdedDex(Dex.mod('vgc17' as ID, await import('./vgc17') as ModData));
        expect(dex.gen).toBe(7);
        expect(dex.species.get('naganadel').tier).toBe('Unreleased');
        expect(dex.items.get('kommoniumz').isNonstandard).toBe('Unobtainable');
        expect((await dex.learnsets.get('swirlix')).learnset!['stickyweb']).toBeUndefined();
        expect(dex.species.get('incineroar').unreleasedHidden).toBe(true);
        expect((await dex.learnsets.get('sandslashalola')).learnset!['iceshard']).toBeUndefined();
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
