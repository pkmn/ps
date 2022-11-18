import {RandomTeams} from './gen9';
import {Format, ModdedDex, PRNG, PRNGSeed} from '@pkmn/sim';

export class RandomGen8Teams extends RandomTeams {
	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);
	}
}

export default RandomGen8Teams;
