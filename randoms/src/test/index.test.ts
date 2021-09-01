import {Dex, PokemonSet, ID} from '@pkmn/sim';

import {TeamGenerators} from '../index';

const N = 1000;

function isValidSet(gen: number, set: PokemonSet) {
	const dex = Dex.mod(`gen${gen}` as ID);
	const species = dex.species.get(set.species || set.name);
	if (!species.exists || species.gen > gen) return false;
	if (set.item) {
		const item = dex.items.get(set.item);
		if (!item.exists || item.gen > gen) {
			return false;
		}
	}
	if (set.ability && set.ability !== 'None') {
		const ability = dex.abilities.get(set.ability);
		if (!ability.exists || ability.gen > gen) {
			return false;
		}
	} else if (gen >= 3) {
		return false;
	}
	return true;
}

describe('TeamGenerators', () => {
	for (const format of [
		'gen1randombattle',
		'gen2randombattle',
		'gen3randombattle',
		'gen4randombattle',
		'gen5randombattle',
		'gen6randombattle',
		'gen7randombattle',
		'gen8randombattle',
		'gen7randomdoublesbattle',
		'gen8randomdoublesbattle',
		'gen8monotyperandombattle',
	]) {
		// eslint-disable-next-line jest/expect-expect,jest/valid-title
		it(format, () => {
			const generator = TeamGenerators.getTeamGenerator(format, [1, 2, 3, 4]);
			const gen = +format.charAt(3);
			for (let i = 0; i < N; i++) {
				const seed = generator.prng.seed;
				try {
					const team = generator.getTeam();
					if (team.length < 6) throw new Error(`Team with less than 6 Pokemon: ${JSON.stringify(team)}`);

					let types;
					for (const set of team) {
						if (!isValidSet(gen, set)) throw new Error(`Invalid set: ${JSON.stringify(set)}`);
						const species = Dex.species.get(set.species || set.name);
						if (types && format.includes('monotype')) {
							if (!types.filter(t => species.types.includes(t)).length) {
								throw new Error(`Team is not monotype: ${JSON.stringify(team)}`);
							}
						} else {
							types = species.types;
						}
					}
				} catch (err: any) {
					err.message += ` (seed ${seed})`;
					throw err;
				}
			}
		});
	}
});
