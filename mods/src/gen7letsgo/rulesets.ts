import type {ModdedFormatDataTable} from '@pkmn/sim';

export const Rulesets: ModdedFormatDataTable = {
	standard: {
		inherit: true,
		ruleset: [
			'Standard AG',
			'LGPE Normal Rules', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Sleep Clause Mod',
		],
	},
	standarddoubles: {
		inherit: true,
		ruleset: [
			'Standard AG',
			'LGPE Normal Rules', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause',
		],
	},
};
