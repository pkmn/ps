export const Rulesets: {[k: string]: ModdedFormatData} = {
	standard: {
		effectType: 'ValidatorRule',
		name: 'Standard',
		ruleset: ['Obtainable', 'Desync Clause Mod', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Dig', 'Fly'],
	},
	scalemonsmod: {
		effectType: 'Rule',
		name: 'Scalemons Mod',
		desc: "Every Pok&eacute;mon's stats, barring HP, are scaled to give them a BST as close to 500 as possible",
		onBegin() {
			this.add('rule', 'Scalemons Mod: Every Pokemon\'s stats, barring HP, are scaled to come as close to a BST of 500 as possible');
		},
		onModifySpecies(species, target, source) {
			const newSpecies = this.dex.deepClone(species);
			const pst: number = newSpecies.bst - newSpecies.baseStats['hp'];
			const scale = 500 - newSpecies.baseStats['hp'];
			newSpecies.bst = newSpecies.baseStats['hp'];
			for (const stat in newSpecies.baseStats) {
				if (stat === 'hp' || stat === 'spd') continue;
				newSpecies.baseStats[stat] = this.clampIntRange(newSpecies.baseStats[stat] * scale / pst, 1, 255);
				newSpecies.bst += newSpecies.baseStats[stat];
			}
			newSpecies.baseStats['spd'] = newSpecies.baseStats['spa'];
			return newSpecies;
		},
	},
};
