import * as pkmn from '@pkmn/sets';
import {PokemonSet} from '@pkmn/sets';
import {PRNG, PRNGSeed} from './prng';
import {Format, PlayerOptions} from './exported-global-types';
import {Dex} from './dex';

interface TeamGenerator {
	prng: PRNG;
	getTeam(options?: PlayerOptions): pkmn.PokemonSet[];
	setSeed(prng?: PRNG | PRNGSeed): void;
}

interface TeamGeneratorFactory {
	getTeamGenerator(format: Format | string, seed: PRNG | PRNGSeed | null): TeamGenerator;
}

// eslint-disable-next-line no-var
var teamGeneratorFactory: TeamGeneratorFactory | undefined;

export const Teams = new class Teams {
	pack(team: pkmn.PokemonSet[] | null): string {
		return new pkmn.Team(team || []).pack();
	}

	unpack(buf: string): pkmn.PokemonSet[] | null {
		return pkmn.Teams.unpackTeam(buf)?.team as pkmn.PokemonSet[] || null;
	}

	export(team: pkmn.PokemonSet[], options?: {hideStats?: boolean}) {
		return new pkmn.Team(team).export();
	}

	exportSet(set: pkmn.PokemonSet) {
		return pkmn.Sets.exportSet(set);
	}

	import(buf: string): PokemonSet[] | null {
		return pkmn.Teams.importTeam(buf, Dex as any)?.team as PokemonSet[] || null;
	}

	// BUG: SSB3's Easter egg requires we return any here instead of TeamGenerator. *sigh* :(
	getGenerator(format: Format | string, seed: PRNG | PRNGSeed | null = null) {
		if (!teamGeneratorFactory) {
			throw new Error('getTeamGenerator maybe not be used unless a TeamGeneratorFactory has been set');
		}
		return teamGeneratorFactory.getTeamGenerator(format, seed);
	}

	setGeneratorFactory(factory: TeamGeneratorFactory) {
		teamGeneratorFactory = factory;
		return this;
	}

	generate(format: Format | string, options: PlayerOptions | null = null): pkmn.PokemonSet[] {
		return this.getGenerator(format, options?.seed).getTeam(options || undefined);
	}
};

export {PokemonSet} from '@pkmn/sets';

export default Teams;
