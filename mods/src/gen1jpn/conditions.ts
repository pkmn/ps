import type {ModdedConditionDataTable} from '@pkmn/sim';

export const Conditions: ModdedConditionDataTable = {
	invulnerability: {
		// Dig/Fly
		name: 'invulnerability',
		onInvulnerability(target, source, move) {
			if (target === source) return true;
			if ((move.id === 'swift' && target.volatiles['substitute']) || move.id === 'transform') return true;
			this.add('-message', 'The foe ' + target.name + ' can\'t be hit while invulnerable!');
			return false;
		},
	},
};
