import type {ModdedFormatData} from '@pkmn/sim';

export const Rulesets: {[k: string]: ModdedFormatData} = {
	standard: {
		effectType: 'ValidatorRule',
		name: 'Standard',
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'Species Clause', 'Cancel Mod'],
	},
};
