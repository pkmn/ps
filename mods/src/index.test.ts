/* eslint-disable no-shadow */
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
      it('stadium', async () => {
        const dex = new ModdedDex(Dex.mod('stadium' as ID, await import('./stadium') as ModData));
        expect(dex.gen).toBe(1);
        expect(dex.getMove('highjumpkick').desc)
          .toEqual('If this attack misses the target, the user takes 1 HP of damage.');
      });

      it('vgc17', async () => {
        const dex = new ModdedDex(Dex.mod('vgc17' as ID, await import('./vgc17') as ModData));
        expect(dex.gen).toBe(7);
        expect(dex.getSpecies('naganadel').tier).toBe('Unreleased');
        expect(dex.getItem('kommoniumz').isNonstandard).toBe('Unobtainable');
        expect((await dex.getLearnset('swirlix')).learnset!['stickyweb']).toBeUndefined();
        expect(dex.getSpecies('incineroar').unreleasedHidden).toBe(true);
        expect((await dex.getLearnset('sandslashalola')).learnset!['iceshard']).toBeUndefined();
      });

      it('letsgo', async () => {
        const dex = new ModdedDex(Dex.mod('letsgo' as ID, await import('./letsgo') as ModData));
        expect(dex.gen).toBe(7);
        expect(dex.getSpecies('porygon').evos).toEqual([]);
        expect(dex.getSpecies('clefairy').prevo).toBe('');
        expect(dex.getSpecies('melmetal').isNonstandard).toBeNull();
        expect(dex.getMove('bouncybubble').isNonstandard).toBeNull();
        expect(dex.getMove('teleport').shortDesc).toBe('User switches out.');
        expect((await dex.getLearnset('sandslashalola')).learnset!['iceshard']).toEqual(['7L1']);
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
        expect(modded.getAbility('magicguard').foo).toBe(5);
      });
    });
  });
}
