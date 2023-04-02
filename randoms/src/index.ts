import {
	Dex,
	Format,
	ModdedDex,
	PRNG,
	PRNGSeed,
	PlayerOptions,
	PokemonSet,
} from '@pkmn/sim';

import {RandomGen1Teams} from './gen1';
import {RandomGen2Teams} from './gen2';
import {RandomGen3Teams} from './gen3';
import {RandomGen4Teams} from './gen4';
import {RandomGen5Teams} from './gen5';
import {RandomGen6Teams} from './gen6';
import {RandomGen7Teams} from './gen7';
import {RandomGen8Teams} from './gen8';
import {RandomTeams} from './gen9';

const GENERATORS: {[mod: string]: new(dex: ModdedDex, format: Format, seed: PRNG | PRNGSeed | null) => TeamGenerator} = {
	gen1: RandomGen1Teams,
	gen2: RandomGen2Teams,
	gen3: RandomGen3Teams,
	gen4: RandomGen4Teams,
	gen5: RandomGen5Teams,
	gen6: RandomGen6Teams,
	gen7: RandomGen7Teams,
	gen8: RandomGen8Teams,
	gen9: RandomTeams,
};

interface TeamGenerator {
	prng: PRNG;
	getTeam(options?: PlayerOptions): PokemonSet[];
	setSeed(prng?: PRNG | PRNGSeed): void;
}

export const TeamGenerators = new class {
	getTeamGenerator(format: Format | string, seed: PRNG | PRNGSeed | null = null) {
		format = Dex.formats.get(format);
		if (!format.exists) throw new Error(`Unknown format '${format.name}' - does not exist`);
		if (format.team !== 'random') throw new Error(`Unsupported format '${format.name}`);
		const Generator = format.mod && GENERATORS[format.mod];
		if (!Generator) throw new Error(`Unknown format '${format.name}' - cannot find generator`);
		return new Generator(Dex.mod(format.mod), format, seed);
	}
};
