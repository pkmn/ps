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
        expect(dex.moves.get('counter').ignoreImmunity).toBe(true);
      });

      it('gen2stadium2', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen1stadium' as ID, await import('./gen2stadium2') as ModData));
        expect(dex.gen).toBe(2);
      });

      it('gen4pt', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen4pt' as ID, await import('./gen4pt') as ModData));
        expect(dex.gen).toBe(4);
        expect(dex.species.get('Pichu-Spiky-Eared').isNonstandard).toBe('Future');
        expect((await dex.learnsets.get('hooh')).learnset!['bravebird']).toBeUndefined();
      });

      it('gen5bw1', async () => {
        const dex =
          new ModdedDex(Dex.mod('gen5bw1' as ID, await import('./gen5bw1') as ModData));
        expect(dex.gen).toBe(5);
        expect(dex.species.get('Kyurem-Black').isNonstandard).toBe('Future');
        expect(dex.species.get('beedrill').unreleasedHidden).toBe(true);
        expect(dex.items.get('Custap Berry').isNonstandard).toBe('Unobtainable');
        expect((await dex.learnsets.get('growlithe')).learnset!['outrage']).toBeUndefined();
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
      });

      it('gen7sm', async () => {
        const dex = new ModdedDex(Dex.mod('gen7sm' as ID, await import('./gen7sm') as ModData));
        expect(dex.gen).toBe(7);
        expect(dex.species.get('naganadel').isNonstandard).toBe('Future');
        expect(dex.items.get('kommoniumz').isNonstandard).toBe('Future');
        expect((await dex.learnsets.get('swirlix')).learnset!['stickyweb']).toBeUndefined();
        expect(dex.species.get('incineroar').unreleasedHidden).toBe(true);
        expect((await dex.learnsets.get('sandslashalola')).learnset!['iceshard']).toBeUndefined();
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

      it('gen8bsdp', async () => {
        const dex = new ModdedDex(Dex.mod('gen8bdsp' as ID, await import('./gen8bdsp') as ModData));
        expect(dex.gen).toBe(8);
        expect(dex.species.get('Greninja').tier).toBe('Illegal');
        expect(dex.species.get('Eevee').evos)
          .toEqual(['Vaporeon', 'Jolteon', 'Flareon', 'Espeon', 'Umbreon', 'Leafeon', 'Glaceon']);
        expect(dex.items.get('Grassy Seed').isNonstandard).toBe('Past');
        expect(!dex.items.get('spookyplate').isNonstandard).toBe(true);
        expect(!dex.moves.get('Hidden Power').isNonstandard).toBe(true);
        expect(dex.moves.get('flipturn').isNonstandard).toBe('Past');
        expect(dex.abilities.get('Quick Draw').isNonstandard).toBe('Past');
        expect((await dex.learnsets.get('Zapdos')).learnset!['heatwave']).toBeUndefined();
        expect((await dex.learnsets.get('Manaphy')).learnset!['watergun']).toEqual(['8L1', '8S0']);
        expect((await dex.forGen(8).learnsets.get('Weavile')).learnset!['knockoff'])
          .toBeUndefined();
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
