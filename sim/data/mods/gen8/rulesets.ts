export const Rulesets: {[k: string]: ModdedFormatData} = {
	standard: {
		inherit: true,
		ruleset: [
			'Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Items Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
		],
	},
	standarddoubles: {
		inherit: true,
		ruleset: [
			'Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Gravity Sleep Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
		],
	},
	teampreview: {
		inherit: true,
		onTeamPreview() {
			this.add('clearpoke');
			for (const pokemon of this.getAllPokemon()) {
				const details = pokemon.details.replace(', shiny', '')
					.replace(/(Arceus|Greninja|Gourgeist|Pumpkaboo|Xerneas|Silvally|Urshifu|Dudunsparce)(-[a-zA-Z?-]+)?/g, '$1-*')
					.replace(/(Zacian|Zamazenta)(?!-Crowned)/g, '$1-*'); // Hacked-in Crowned formes will be revealed
				this.add('poke', pokemon.side.id, details, '');
			}
			this.makeRequest('teampreview');
		},
	},
};
