import type {ModdedFormatDataTable} from '@pkmn/sim';

export const Rulesets: ModdedFormatDataTable = {
	standard: {
		effectType: 'ValidatorRule',
		name: 'Standard',
		ruleset: ['Obtainable', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Exact HP Mod', 'Cancel Mod'],
	},
};
