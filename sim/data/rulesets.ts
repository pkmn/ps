// Note: These are the rules that formats use

// The list of formats is stored in config/formats.js
export const Rulesets: {[k: string]: FormatData} = {

	// Rulesets
	///////////////////////////////////////////////////////////////////

	standard: {
		effectType: 'ValidatorRule',
		name: 'Standard',
		desc: "The standard ruleset for all offical Smogon singles tiers (Ubers, OU, etc.)",
		ruleset: [
			'Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Items Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
			'Min Source Gen = 9',
		],
	},
	flatrules: {
		effectType: 'ValidatorRule',
		name: 'Flat Rules',
		desc: "The in-game Flat Rules: Adjust Level Down 50, Species Clause, Item Clause, -Mythical, -Restricted Legendary, Bring 6 Pick 3-6 depending on game type.",
		ruleset: ['Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Adjust Level Down = 50', 'Picked Team Size = Auto', 'Cancel Mod'],
		banlist: ['Mythical', 'Restricted Legendary', 'Greninja-Bond'],
	},
	limittworestricted: {
		effectType: 'ValidatorRule',
		name: 'Limit Two Restricted',
		desc: "Limit two restricted Pokémon (flagged with * in the rules list)",
		onValidateTeam(team) {
			const restrictedSpecies = [];
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (this.ruleTable.isRestrictedSpecies(species)) restrictedSpecies.push(species.name);
			}
			if (restrictedSpecies.length > 2) {
				return [`You can only use up to two restricted Pok\u00E9mon (you have: ${restrictedSpecies.join(', ')})`];
			}
		},
	},
	limitonerestricted: {
		effectType: 'ValidatorRule',
		name: 'Limit One Restricted',
		desc: "Limit one restricted Pokémon (flagged with * in the rules list)",
		onValidateTeam(team) {
			const restrictedSpecies = [];
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (this.ruleTable.isRestrictedSpecies(species)) restrictedSpecies.push(species.name);
			}
			if (restrictedSpecies.length > 1) {
				return [`You can only use one restricted Pok\u00E9mon (you have: ${restrictedSpecies.join(', ')})`];
			}
		},
	},
	standarddoubles: {
		effectType: 'ValidatorRule',
		name: 'Standard Doubles',
		desc: "The standard ruleset for all official Smogon doubles tiers",
		ruleset: [
			'Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Gravity Sleep Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
			'Min Source Gen = 9',
		],
	},
	standardnatdex: {
		effectType: 'ValidatorRule',
		name: 'Standard NatDex',
		desc: "The standard ruleset for all National Dex tiers",
		ruleset: [
			'Obtainable', '+Unobtainable', '+Past', 'Sketch Post-Gen 7 Moves', 'Team Preview', 'Nickname Clause', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause',
		],
		unbanlist: ['Bleakwind Storm', 'Lunar Blessing', 'Mystical Power', 'Sandsear Storm', 'Wildbolt Storm'],
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			if (species.natDexTier === 'Illegal') {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			const requireObtainable = this.ruleTable.has('obtainable');
			if (requireObtainable) {
				if (species.natDexTier === "Unreleased") {
					const basePokemon = this.toID(species.baseSpecies);
					if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
						return;
					}
					return [`${set.name || set.species} does not exist in the National Dex.`];
				}
				for (const moveid of set.moves) {
					const move = this.dex.moves.get(moveid);
					if (move.isNonstandard === 'Unobtainable' && move.gen === this.dex.gen || move.id === 'lightofruin') {
						if (this.ruleTable.has(`+move:${move.id}`)) continue;
						const problem = `${set.name}'s move ${move.name} does not exist in the National Dex.`;
						if (this.ruleTable.has('omunobtainablemoves')) {
							const outOfBattleSpecies = this.getValidationSpecies(set)[0];
							if (!this.omCheckCanLearn(move, outOfBattleSpecies, this.allSources(outOfBattleSpecies), set, problem)) continue;
						}
						return [problem];
					}
				}
			}
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (!set.item) return;
			const item = this.dex.items.get(set.item);
			if (!item.isNonstandard) return;
			if (
				(item.isNonstandard === 'Past' || requireObtainable && item.isNonstandard === 'Unobtainable') &&
				!item.zMove && !item.itemUser && !item.forcedForme && !item.isBerry
			) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
		},
	},
	obtainable: {
		effectType: 'ValidatorRule',
		name: 'Obtainable',
		desc: "Makes sure the team is possible to obtain in-game.",
		ruleset: ['Obtainable Moves', 'Obtainable Abilities', 'Obtainable Formes', 'EV Limit = Auto', 'Obtainable Misc'],
		banlist: ['Unreleased', 'Unobtainable', 'Nonexistent'],
		// Mostly hardcoded in team-validator.ts
		onValidateTeam(team, format) {
			let kyuremCount = 0;
			let necrozmaDMCount = 0;
			let necrozmaDWCount = 0;
			let calyrexCount = 0;
			for (const set of team) {
				if (set.species === 'Kyurem-White' || set.species === 'Kyurem-Black') {
					if (kyuremCount > 0) {
						return [
							`You cannot have more than one Kyurem-Black/Kyurem-White.`,
							`(It's untradeable and you can only make one with the DNA Splicers.)`,
						];
					}
					kyuremCount++;
				}
				if (set.species === 'Necrozma-Dusk-Mane') {
					if (necrozmaDMCount > 0) {
						return [
							`You cannot have more than one Necrozma-Dusk-Mane`,
							`(It's untradeable and you can only make one with the N-Solarizer.)`,
						];
					}
					necrozmaDMCount++;
				}
				if (set.species === 'Necrozma-Dawn-Wings') {
					if (necrozmaDWCount > 0) {
						return [
							`You cannot have more than one Necrozma-Dawn-Wings`,
							`(It's untradeable and you can only make one with the N-Lunarizer.)`,
						];
					}
					necrozmaDWCount++;
				}
				if (set.species === 'Calyrex-Ice' || set.species === 'Calyrex-Shadow') {
					if (calyrexCount > 0) {
						return [
							`You cannot have more than one Calyrex-Ice/Calyrex-Shadow.`,
							`(It's untradeable and you can only make one with the Reins of Unity.)`,
						];
					}
					calyrexCount++;
				}
			}
			return [];
		},
	},
	obtainablemoves: {
		effectType: 'ValidatorRule',
		name: 'Obtainable Moves',
		desc: "Makes sure moves are learnable by the species.",
		// Hardcoded in team-validator.ts
	},
	obtainableabilities: {
		effectType: 'ValidatorRule',
		name: 'Obtainable Abilities',
		desc: "Makes sure abilities match the species.",
		// Hardcoded in team-validator.ts
	},
	obtainableformes: {
		effectType: 'ValidatorRule',
		name: 'Obtainable Formes',
		desc: "Makes sure in-battle formes only appear in-battle.",
		// Hardcoded in team-validator.ts
	},
	obtainablemisc: {
		effectType: 'ValidatorRule',
		name: 'Obtainable Misc',
		desc: "Validate all obtainability things that aren't moves/abilities (Hidden Power type, gender, IVs, events, duplicate moves).",
		// Mostly hardcoded in team-validator.ts
		onChangeSet(set) {
			const species = this.dex.species.get(set.species);

			if (species.gender) {
				if (set.gender !== species.gender) {
					set.gender = species.gender;
				}
			} else {
				if (set.gender !== 'M' && set.gender !== 'F') {
					set.gender = '';
				}
			}

			// limit one of each move
			// repealing this will not actually let you USE multiple moves, because of a cart bug:
			// https://twitter.com/DaWoblefet/status/1396217830006132737
			if (set.moves) {
				const hasMove: {[k: string]: true} = {};
				for (const moveId of set.moves) {
					const move = this.dex.moves.get(moveId);
					const moveid = move.id;
					if (hasMove[moveid]) return [`${species.baseSpecies} has multiple copies of ${move.name}.`];
					hasMove[moveid] = true;
				}
			}
		},
	},
	hoennpokedex: {
		effectType: 'ValidatorRule',
		name: 'Hoenn Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Hoenn region (OR/AS)",
		onValidateSet(set, format) {
			const hoennDex = [
				"Abra", "Absol", "Aggron", "Alakazam", "Altaria", "Anorith", "Armaldo", "Aron", "Azumarill", "Azurill", "Bagon", "Baltoy", "Banette", "Barboach", "Beautifly", "Beldum", "Bellossom", "Blaziken", "Breloom", "Budew", "Cacnea", "Cacturne", "Camerupt", "Carvanha", "Cascoon", "Castform", "Chimecho", "Chinchou", "Chingling", "Clamperl", "Claydol", "Combusken", "Corphish", "Corsola", "Cradily", "Crawdaunt", "Crobat", "Delcatty", "Dodrio", "Doduo", "Donphan", "Dusclops", "Dusknoir", "Duskull", "Dustox", "Electrike", "Electrode", "Exploud", "Feebas", "Flygon", "Froslass", "Gallade", "Gardevoir", "Geodude", "Girafarig", "Glalie", "Gloom", "Golbat", "Goldeen", "Golduck", "Golem", "Gorebyss", "Graveler", "Grimer", "Grovyle", "Grumpig", "Gulpin", "Gyarados", "Hariyama", "Heracross", "Horsea", "Huntail", "Igglybuff", "Illumise", "Jigglypuff", "Kadabra", "Kecleon", "Kingdra", "Kirlia", "Koffing", "Lairon", "Lanturn", "Latias", "Latios", "Lileep", "Linoone", "Lombre", "Lotad", "Loudred", "Ludicolo", "Lunatone", "Luvdisc", "Machamp", "Machoke", "Machop", "Magcargo", "Magikarp", "Magnemite", "Magneton", "Magnezone", "Makuhita", "Manectric", "Marill", "Marshtomp", "Masquerain", "Mawile", "Medicham", "Meditite", "Metagross", "Metang", "Mightyena", "Milotic", "Minun", "Mudkip", "Muk", "Natu", "Nincada", "Ninetales", "Ninjask", "Nosepass", "Numel", "Nuzleaf", "Oddish", "Pelipper", "Phanpy", "Pichu", "Pikachu", "Pinsir", "Plusle", "Poochyena", "Probopass", "Psyduck", "Raichu", "Ralts", "Regice", "Regirock", "Registeel", "Relicanth", "Rhydon", "Rhyhorn", "Rhyperior", "Roselia", "Roserade", "Sableye", "Salamence", "Sandshrew", "Sandslash", "Sceptile", "Seadra", "Seaking", "Sealeo", "Seedot", "Seviper", "Sharpedo", "Shedinja", "Shelgon", "Shiftry", "Shroomish", "Shuppet", "Silcoon", "Skarmory", "Skitty", "Slaking", "Slakoth", "Slugma", "Snorunt", "Solrock", "Spheal", "Spinda", "Spoink", "Starmie", "Staryu", "Surskit", "Swablu", "Swalot", "Swampert", "Swellow", "Taillow", "Tentacool", "Tentacruel", "Torchic", "Torkoal", "Trapinch", "Treecko", "Tropius", "Vibrava", "Vigoroth", "Vileplume", "Volbeat", "Voltorb", "Vulpix", "Wailmer", "Wailord", "Walrein", "Weezing", "Whiscash", "Whismur", "Wigglytuff", "Wingull", "Wobbuffet", "Wurmple", "Wynaut", "Xatu", "Zangoose", "Zigzagoon", "Zubat",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!hoennDex.includes(species.baseSpecies) && !this.ruleTable.has('+' + species.id)) {
				return [species.baseSpecies + " is not in the Hoenn Pokédex."];
			}
		},
	},
	sinnohpokedex: {
		effectType: 'ValidatorRule',
		name: 'Sinnoh Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Sinnoh region (Platinum)",
		onValidateSet(set, format) {
			const sinnohDex = [
				"Turtwig", "Grotle", "Torterra", "Chimchar", "Monferno", "Infernape", "Piplup", "Prinplup", "Empoleon", "Starly", "Staravia", "Staraptor", "Bidoof", "Bibarel", "Kricketot", "Kricketune", "Shinx", "Luxio", "Luxray", "Abra", "Kadabra", "Alakazam", "Magikarp", "Gyarados", "Budew", "Roselia", "Roserade", "Zubat", "Golbat", "Crobat", "Geodude", "Graveler", "Golem", "Onix", "Steelix", "Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Machop", "Machoke", "Machamp", "Psyduck", "Golduck", "Burmy", "Wormadam", "Mothim", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Combee", "Vespiquen", "Pachirisu", "Buizel", "Floatzel", "Cherubi", "Cherrim", "Shellos", "Gastrodon", "Heracross", "Aipom", "Ambipom", "Drifloon", "Drifblim", "Buneary", "Lopunny", "Gastly", "Haunter", "Gengar", "Misdreavus", "Mismagius", "Murkrow", "Honchkrow", "Glameow", "Purugly", "Goldeen", "Seaking", "Barboach", "Whiscash", "Chingling", "Chimecho", "Stunky", "Skuntank", "Meditite", "Medicham", "Bronzor", "Bronzong", "Ponyta", "Rapidash", "Bonsly", "Sudowoodo", "Mime Jr.", "Mr. Mime", "Happiny", "Chansey", "Blissey", "Cleffa", "Clefairy", "Clefable", "Chatot", "Pichu", "Pikachu", "Raichu", "Hoothoot", "Noctowl", "Spiritomb", "Gible", "Gabite", "Garchomp", "Munchlax", "Snorlax", "Unown", "Riolu", "Lucario", "Wooper", "Quagsire", "Wingull", "Pelipper", "Girafarig", "Hippopotas", "Hippowdon", "Azurill", "Marill", "Azumarill", "Skorupi", "Drapion", "Croagunk", "Toxicroak", "Carnivine", "Remoraid", "Octillery", "Finneon", "Lumineon", "Tentacool", "Tentacruel", "Feebas", "Milotic", "Mantyke", "Mantine", "Snover", "Abomasnow", "Sneasel", "Weavile", "Uxie", "Mesprit", "Azelf", "Dialga", "Palkia", "Manaphy", "Rotom", "Gligar", "Gliscor", "Nosepass", "Probopass", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Lickitung", "Lickilicky", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Swablu", "Altaria", "Togepi", "Togetic", "Togekiss", "Houndour", "Houndoom", "Magnemite", "Magneton", "Magnezone", "Tangela", "Tangrowth", "Yanma", "Yanmega", "Tropius", "Rhyhorn", "Rhydon", "Rhyperior", "Duskull", "Dusclops", "Dusknoir", "Porygon", "Porygon2", "Porygon-Z", "Scyther", "Scizor", "Elekid", "Electabuzz", "Electivire", "Magby", "Magmar", "Magmortar", "Swinub", "Piloswine", "Mamoswine", "Snorunt", "Glalie", "Froslass", "Absol", "Giratina",
			];
			const species = this.dex.species.get(set.species || set.name);
			if ((!sinnohDex.includes(species.baseSpecies) || species.gen > 4) && !this.ruleTable.has('+' + species.id)) {
				return [`${species.name} is not in the Sinnoh Pokédex.`];
			}
		},
	},
	oldunovapokedex: {
		effectType: 'ValidatorRule',
		name: 'Old Unova Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Unova region as of the original Black/White games",
		onValidateSet(set, format) {
			const species = this.dex.species.get(set.species || set.name);
			const isUnova = (species.num >= 494 && species.num <= 649) &&
				!['Black', 'White', 'Therian', 'Resolute'].includes(species.forme) && species.gen <= 5;
			if (!isUnova && !this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the Old Unova Pokédex.`];
			}
		},
	},
	newunovapokedex: {
		effectType: 'ValidatorRule',
		name: 'New Unova Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Unova region as of the Black 2/White 2 games",
		onValidateSet(set, format) {
			const unovaDex = [
				"Victini", "Snivy", "Servine", "Serperior", "Tepig", "Pignite", "Emboar", "Oshawott", "Dewott", "Samurott", "Patrat", "Watchog", "Purrloin", "Liepard", "Pidove", "Tranquill", "Unfezant", "Unfezant", "Sewaddle", "Swadloon", "Leavanny", "Sunkern", "Sunflora", "Lillipup", "Herdier", "Stoutland", "Mareep", "Flaaffy", "Ampharos", "Psyduck", "Golduck", "Azurill", "Marill", "Azumarill", "Riolu", "Lucario", "Dunsparce", "Audino", "Pansage", "Simisage", "Pansear", "Simisear", "Panpour", "Simipour", "Venipede", "Whirlipede", "Scolipede", "Koffing", "Weezing", "Magnemite", "Magneton", "Magnezone", "Growlithe", "Arcanine", "Magby", "Magmar", "Magmortar", "Elekid", "Electabuzz", "Electivire", "Rattata", "Raticate", "Zubat", "Golbat", "Crobat", "Grimer", "Muk", "Woobat", "Swoobat", "Roggenrola", "Boldore", "Gigalith", "Onix", "Steelix", "Timburr", "Gurdurr", "Conkeldurr", "Drilbur", "Excadrill", "Skitty", "Delcatty", "Buneary", "Lopunny", "Cottonee", "Whimsicott", "Petilil", "Lilligant", "Munna", "Musharna", "Cleffa", "Clefairy", "Clefable", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sandile", "Krokorok", "Krookodile", "Darumaka", "Darmanitan", "Basculin", "Basculin", "Trubbish", "Garbodor", "Minccino", "Cinccino", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Sandshrew", "Sandslash", "Dwebble", "Crustle", "Scraggy", "Scrafty", "Maractus", "Sigilyph", "Trapinch", "Vibrava", "Flygon", "Yamask", "Cofagrigus", "Tirtouga", "Carracosta", "Archen", "Archeops", "Klink", "Klang", "Klinklang", "Budew", "Roselia", "Roserade", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Combee", "Vespiquen", "Emolga", "Heracross", "Pinsir", "Blitzle", "Zebstrika", "Buizel", "Floatzel", "Zorua", "Zoroark", "Ducklett", "Swanna", "Karrablast", "Escavalier", "Shelmet", "Accelgor", "Deerling", "Sawsbuck", "Foongus", "Amoonguss", "Castform", "Nosepass", "Probopass", "Aron", "Lairon", "Aggron", "Baltoy", "Claydol", "Larvesta", "Volcarona", "Joltik", "Galvantula", "Ferroseed", "Ferrothorn", "Tynamo", "Eelektrik", "Eelektross", "Frillish", "Jellicent", "Alomomola", "Axew", "Fraxure", "Haxorus", "Zangoose", "Seviper", "Elgyem", "Beheeyem", "Litwick", "Lampent", "Chandelure", "Heatmor", "Durant", "Cubchoo", "Beartic", "Cryogonal", "Tornadus", "Thundurus", "Landorus", "Skorupi", "Drapion", "Skarmory", "Numel", "Camerupt", "Spoink", "Grumpig", "Drifloon", "Drifblim", "Shuppet", "Banette", "Wingull", "Pelipper", "Lunatone", "Solrock", "Absol", "Tangela", "Tangrowth", "Mienfoo", "Mienshao", "Gligar", "Gliscor", "Pawniard", "Bisharp", "Cobalion", "Terrakion", "Virizion", "Tympole", "Palpitoad", "Seismitoad", "Stunfisk", "Shuckle", "Mantyke", "Mantine", "Remoraid", "Octillery", "Corsola", "Staryu", "Starmie", "Wailmer", "Wailord", "Lapras", "Spheal", "Sealeo", "Walrein", "Swablu", "Altaria", "Vulpix", "Ninetales", "Bronzor", "Bronzong", "Sneasel", "Weavile", "Delibird", "Vanillite", "Vanillish", "Vanilluxe", "Swinub", "Piloswine", "Mamoswine", "Ditto", "Beldum", "Metang", "Metagross", "Seel", "Dewgong", "Throh", "Sawk", "Bouffalant", "Druddigon", "Golett", "Golurk", "Deino", "Zweilous", "Hydreigon", "Slakoth", "Vigoroth", "Slaking", "Corphish", "Crawdaunt", "Igglybuff", "Jigglypuff", "Wigglytuff", "Lickitung", "Lickilicky", "Yanma", "Yanmega", "Tropius", "Carnivine", "Croagunk", "Toxicroak", "Larvitar", "Pupitar", "Tyranitar", "Reshiram", "Zekrom", "Kyurem", "Keldeo", "Meloetta", "Genesect",
			];
			const species = this.dex.species.get(set.species || set.name);
			const isUnova = unovaDex.includes(species.baseSpecies) && species.gen <= 5;
			if (!isUnova && !this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the New Unova Pokédex.`];
			}
		},
	},
	kalospokedex: {
		effectType: 'ValidatorRule',
		name: 'Kalos Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Kalos region (XY)",
		onValidateSet(set, format) {
			const kalosDex = [
				"Chespin", "Quilladin", "Chesnaught", "Fennekin", "Braixen", "Delphox", "Froakie", "Frogadier", "Greninja", "Bunnelby", "Diggersby", "Zigzagoon", "Linoone", "Fletchling", "Fletchinder", "Talonflame", "Pidgey", "Pidgeotto", "Pidgeot", "Scatterbug", "Spewpa", "Vivillon", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pansage", "Simisage", "Pansear", "Simisear", "Panpour", "Simipour", "Pichu", "Pikachu", "Raichu", "Bidoof", "Bibarel", "Dunsparce", "Azurill", "Marill", "Azumarill", "Burmy", "Wormadam", "Mothim", "Surskit", "Masquerain", "Magikarp", "Gyarados", "Corphish", "Crawdaunt", "Goldeen", "Seaking", "Carvanha", "Sharpedo", "Litleo", "Pyroar", "Psyduck", "Golduck", "Farfetch\u2019d", "Riolu", "Lucario", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Flabe\u0301be\u0301", "Floette", "Florges", "Budew", "Roselia", "Roserade", "Ledyba", "Ledian", "Combee", "Vespiquen", "Skitty", "Delcatty", "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Skiddo", "Gogoat", "Pancham", "Pangoro", "Furfrou", "Doduo", "Dodrio", "Plusle", "Minun", "Gulpin", "Swalot", "Scraggy", "Scrafty", "Abra", "Kadabra", "Alakazam", "Oddish", "Gloom", "Vileplume", "Bellossom", "Sentret", "Furret", "Nincada", "Ninjask", "Shedinja", "Espurr", "Meowstic", "Kecleon", "Honedge", "Doublade", "Aegislash", "Venipede", "Whirlipede", "Scolipede", "Audino", "Smeargle", "Croagunk", "Toxicroak", "Ducklett", "Swanna", "Spritzee", "Aromatisse", "Swirlix", "Slurpuff", "Volbeat", "Illumise", "Hoppip", "Skiploom", "Jumpluff", "Munchlax", "Snorlax", "Whismur", "Loudred", "Exploud", "Meditite", "Medicham", "Zubat", "Golbat", "Crobat", "Axew", "Fraxure", "Haxorus", "Diancie", "Hoopa", "Volcanion",
				"Drifloon", "Drifblim", "Mienfoo", "Mienshao", "Zangoose", "Seviper", "Spoink", "Grumpig", "Absol", "Inkay", "Malamar", "Lunatone", "Solrock", "Bagon", "Shelgon", "Salamence", "Wingull", "Pelipper", "Taillow", "Swellow", "Binacle", "Barbaracle", "Dwebble", "Crustle", "Tentacool", "Tentacruel", "Wailmer", "Wailord", "Luvdisc", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Staryu", "Starmie", "Shellder", "Cloyster", "Qwilfish", "Horsea", "Seadra", "Kingdra", "Relicanth", "Sandile", "Krokorok", "Krookodile", "Helioptile", "Heliolisk", "Hippopotas", "Hippowdon", "Rhyhorn", "Rhydon", "Rhyperior", "Onix", "Steelix", "Woobat", "Swoobat", "Machop", "Machoke", "Machamp", "Cubone", "Marowak", "Kangaskhan", "Mawile", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Aerodactyl", "Ferroseed", "Ferrothorn", "Snubbull", "Granbull", "Electrike", "Manectric", "Houndour", "Houndoom", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Emolga", "Yanma", "Yanmega", "Hawlucha", "Sigilyph", "Golett", "Golurk", "Nosepass", "Probopass", "Makuhita", "Hariyama", "Throh", "Sawk", "Starly", "Staravia", "Staraptor", "Stunky", "Skuntank", "Nidoran-F", "Nidorina", "Nidoqueen", "Nidoran-M", "Nidorino", "Nidoking", "Dedenne", "Chingling", "Chimecho", "Mime Jr.", "Mr. Mime", "Solosis", "Duosion", "Reuniclus", "Wynaut", "Wobbuffet", "Roggenrola", "Boldore", "Gigalith", "Sableye", "Carbink", "Tauros", "Miltank", "Mareep", "Flaaffy", "Ampharos", "Pinsir", "Heracross", "Pachirisu", "Slowpoke", "Slowbro", "Slowking", "Exeggcute", "Exeggutor", "Chatot", "Mantyke", "Mantine", "Clamperl", "Huntail", "Gorebyss", "Remoraid", "Octillery", "Corsola", "Chinchou", "Lanturn", "Alomomola", "Lapras", "Articuno", "Zapdos", "Moltres",
				"Diglett", "Dugtrio", "Trapinch", "Vibrava", "Flygon", "Gible", "Gabite", "Garchomp", "Geodude", "Graveler", "Golem", "Slugma", "Magcargo", "Shuckle", "Skorupi", "Drapion", "Wooper", "Quagsire", "Goomy", "Sliggoo", "Goodra", "Karrablast", "Escavalier", "Shelmet", "Accelgor", "Bellsprout", "Weepinbell", "Victreebel", "Carnivine", "Gastly", "Haunter", "Gengar", "Poliwag", "Poliwhirl", "Poliwrath", "Politoed", "Ekans", "Arbok", "Stunfisk", "Barboach", "Whiscash", "Purrloin", "Liepard", "Poochyena", "Mightyena", "Patrat", "Watchog", "Pawniard", "Bisharp", "Klefki", "Murkrow", "Honchkrow", "Foongus", "Amoonguss", "Lotad", "Lombre", "Ludicolo", "Buizel", "Floatzel", "Basculin", "Phantump", "Trevenant", "Pumpkaboo", "Gourgeist", "Litwick", "Lampent", "Chandelure", "Rotom", "Magnemite", "Magneton", "Magnezone", "Voltorb", "Electrode", "Trubbish", "Garbodor", "Swinub", "Piloswine", "Mamoswine", "Bergmite", "Avalugg", "Cubchoo", "Beartic", "Smoochum", "Jynx", "Vanillite", "Vanillish", "Vanilluxe", "Snover", "Abomasnow", "Delibird", "Sneasel", "Weavile", "Timburr", "Gurdurr", "Conkeldurr", "Torkoal", "Sandshrew", "Sandslash", "Aron", "Lairon", "Aggron", "Larvitar", "Pupitar", "Tyranitar", "Heatmor", "Durant", "Spinarak", "Ariados", "Spearow", "Fearow", "Cryogonal", "Skarmory", "Noibat", "Noivern", "Gligar", "Gliscor", "Hoothoot", "Noctowl", "Igglybuff", "Jigglypuff", "Wigglytuff", "Shuppet", "Banette", "Zorua", "Zoroark", "Gothita", "Gothorita", "Gothitelle", "Bonsly", "Sudowoodo", "Spinda", "Teddiursa", "Ursaring", "Lickitung", "Lickilicky", "Scyther", "Scizor", "Ditto", "Swablu", "Altaria", "Druddigon", "Deino", "Zweilous", "Hydreigon", "Dratini", "Dragonair", "Dragonite", "Xerneas", "Yveltal", "Zygarde", "Mewtwo",
			];
			const species = this.dex.species.get(set.species || set.name);
			if ((!kalosDex.includes(species.baseSpecies) || species.gen > 6) && !this.ruleTable.has('+' + species.id)) {
				return [`${species.name} is not in the Kalos Pokédex.`];
			}
		},
	},
	oldalolapokedex: {
		effectType: 'ValidatorRule',
		name: 'Old Alola Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Alola region (SUMO)",
		banlist: ['Pikachu-Partner', 'Marowak-Alola-Totem', 'Ribombee-Totem', 'Araquanid-Totem', 'Lycanroc-Dusk', 'Necrozma-Dusk-Mane', 'Necrozma-Dawn-Wings'],
		onValidateSet(set, format) {
			const alolaDex = [
				"Rowlet", "Dartrix", "Decidueye", "Litten", "Torracat", "Incineroar", "Popplio", "Brionne", "Primarina", "Pikipek", "Trumbeak", "Toucannon", "Yungoos", "Gumshoos", "Rattata-Alola", "Raticate-Alola", "Caterpie", "Metapod", "Butterfree", "Ledyba", "Ledian", "Spinarak", "Ariados", "Pichu", "Pikachu", "Raichu-Alola", "Grubbin", "Charjabug", "Vikavolt", "Bonsly", "Sudowoodo", "Happiny", "Chansey", "Blissey", "Munchlax", "Snorlax", "Slowpoke", "Slowbro", "Slowking", "Wingull", "Pelipper", "Abra", "Kadabra", "Alakazam", "Meowth-Alola", "Persian-Alola", "Magnemite", "Magneton", "Magnezone", "Grimer-Alola", "Muk-Alola", "Growlithe", "Arcanine", "Drowzee", "Hypno", "Makuhita", "Hariyama", "Smeargle", "Crabrawler", "Crabominable", "Gastly", "Haunter", "Gengar", "Drifloon", "Drifblim", "Misdreavus", "Mismagius", "Zubat", "Golbat", "Crobat", "Diglett-Alola", "Dugtrio-Alola", "Spearow", "Fearow", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Mankey", "Primeape", "Delibird", "Oricorio", "Cutiefly", "Ribombee", "Petilil", "Lilligant", "Cottonee", "Whimsicott", "Psyduck", "Golduck", "Magikarp", "Gyarados", "Barboach", "Whiscash", "Machop", "Machoke", "Machamp", "Roggenrola", "Boldore", "Gigalith", "Carbink", "Sableye", "Rockruff", "Lycanroc", "Spinda", "Tentacool", "Tentacruel", "Finneon", "Lumineon", "Wishiwashi", "Luvdisc", "Corsola", "Mareanie", "Toxapex", "Shellder", "Cloyster", "Bagon", "Shelgon", "Salamence", "Lillipup", "Herdier", "Stoutland", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Mudbray", "Mudsdale", "Igglybuff", "Jigglypuff", "Wigglytuff", "Tauros", "Miltank", "Surskit", "Masquerain", "Dewpider", "Araquanid", "Fomantis", "Lurantis", "Morelull", "Shiinotic", "Paras", "Parasect", "Poliwag", "Poliwhirl", "Poliwrath", "Politoed", "Goldeen", "Seaking", "Feebas", "Milotic", "Alomomola", "Fletchling", "Fletchinder", "Talonflame", "Salandit", "Salazzle", "Cubone", "Marowak-Alola", "Kangaskhan", "Magby", "Magmar", "Magmortar", "Stufful", "Bewear", "Bounsweet", "Steenee", "Tsareena", "Comfey", "Pinsir", "Oranguru", "Passimian", "Goomy", "Sliggoo", "Goodra", "Castform", "Wimpod", "Golisopod", "Staryu", "Starmie", "Sandygast", "Palossand", "Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Archen", "Archeops", "Tirtouga", "Carracosta", "Phantump", "Trevenant", "Nosepass", "Probopass", "Pyukumuku", "Chinchou", "Lanturn", "Type: Null", "Silvally", "Zygarde", "Trubbish", "Garbodor", "Skarmory", "Ditto", "Cleffa", "Clefairy", "Clefable", "Minior", "Beldum", "Metang", "Metagross", "Porygon", "Porygon2", "Porygon-Z", "Pancham", "Pangoro", "Komala", "Torkoal", "Turtonator", "Togedemaru", "Elekid", "Electabuzz", "Electivire", "Geodude-Alola", "Graveler-Alola", "Golem-Alola", "Sandile", "Krokorok", "Krookodile", "Trapinch", "Vibrava", "Flygon", "Gible", "Gabite", "Garchomp", "Klefki", "Mimikyu", "Bruxish", "Drampa", "Absol", "Snorunt", "Glalie", "Froslass", "Sneasel", "Weavile", "Sandshrew-Alola", "Sandslash-Alola", "Vulpix-Alola", "Ninetales-Alola", "Vanillite", "Vanillish", "Vanilluxe", "Snubbull", "Granbull", "Shellos", "Gastrodon", "Relicanth", "Dhelmise", "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Lapras", "Exeggcute", "Exeggutor-Alola", "Jangmo-o", "Hakamo-o", "Kommo-o", "Emolga", "Scyther", "Scizor", "Murkrow", "Honchkrow", "Riolu", "Lucario", "Dratini", "Dragonair", "Dragonite", "Aerodactyl", "Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini", "Cosmog", "Cosmoem", "Solgaleo", "Lunala", "Nihilego", "Buzzwole", "Pheromosa", "Xurkitree", "Celesteela", "Kartana", "Guzzlord", "Necrozma", "Magearna", "Marshadow",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!alolaDex.includes(species.baseSpecies) && !alolaDex.includes(species.name) &&
				!this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the Old Alola Pokédex.`];
			}
		},
	},
	newalolapokedex: {
		effectType: 'ValidatorRule',
		name: 'New Alola Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Alola region (US/UM)",
		onValidateSet(set, format) {
			const alolaDex = [
				"Rowlet", "Dartrix", "Decidueye", "Litten", "Torracat", "Incineroar", "Popplio", "Brionne", "Primarina", "Pikipek", "Trumbeak", "Toucannon", "Yungoos", "Gumshoos", "Rattata-Alola", "Raticate-Alola", "Caterpie", "Metapod", "Butterfree", "Ledyba", "Ledian", "Spinarak", "Ariados", "Buneary", "Lopunny", "Inkay", "Malamar", "Zorua", "Zoroark", "Furfrou", "Pichu", "Pikachu", "Raichu-Alola", "Grubbin", "Charjabug", "Vikavolt", "Bonsly", "Sudowoodo", "Happiny", "Chansey", "Blissey", "Munchlax", "Snorlax", "Slowpoke", "Slowbro", "Slowking", "Wingull", "Pelipper", "Abra", "Kadabra", "Alakazam", "Meowth-Alola", "Persian-Alola", "Magnemite", "Magneton", "Magnezone", "Grimer-Alola", "Muk-Alola", "Mime Jr.", "Mr. Mime", "Ekans", "Arbok", "Dunsparce", "Growlithe", "Arcanine", "Drowzee", "Hypno", "Makuhita", "Hariyama", "Smeargle", "Crabrawler", "Crabominable", "Gastly", "Haunter", "Gengar", "Drifloon", "Drifblim", "Murkrow", "Honchkrow", "Zubat", "Golbat", "Crobat", "Noibat", "Noivern", "Diglett-Alola", "Dugtrio-Alola", "Spearow", "Fearow", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Mankey", "Primeape", "Delibird", "Hawlucha", "Oricorio", "Cutiefly", "Ribombee", "Flabe\u0301be\u0301", "Floette", "Florges", "Petilil", "Lilligant", "Cottonee", "Whimsicott", "Psyduck", "Golduck", "Smoochum", "Jynx", "Magikarp", "Gyarados", "Barboach", "Whiscash", "Seal", "Dewgong", "Machop", "Machoke", "Machamp", "Roggenrola", "Boldore", "Gigalith", "Carbink", "Sableye", "Mawile", "Rockruff", "Lycanroc", "Spinda", "Tentacool", "Tentacruel", "Finneon", "Lumineon", "Wishiwashi", "Luvdisc", "Corsola", "Mareanie", "Toxapex", "Shellder", "Cloyster", "Clamperl", "Huntail", "Gorebyss", "Remoraid", "Octillery", "Mantyke", "Mantine", "Bagon", "Shelgon", "Salamence", "Lillipup", "Herdier", "Stoutland", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Mareep", "Flaaffy", "Ampharos", "Mudbray", "Mudsdale", "Igglybuff", "Jigglypuff", "Wigglytuff", "Tauros", "Miltank", "Surskit", "Masquerain", "Dewpider", "Araquanid", "Fomantis", "Lurantis", "Morelull", "Shiinotic", "Paras", "Parasect", "Poliwag", "Poliwhirl", "Poliwrath", "Politoed", "Goldeen", "Seaking", "Basculin", "Feebas", "Milotic", "Alomomola", "Fletchling", "Fletchinder", "Talonflame", "Salandit", "Salazzle", "Cubone", "Marowak-Alola", "Kangaskhan", "Magby", "Magmar", "Magmortar", "Larvesta", "Volcarona", "Stufful", "Bewear", "Bounsweet", "Steenee", "Tsareena", "Comfey", "Pinsir", "Hoothoot", "Noctowl", "Kecleon", "Oranguru", "Passimian", "Goomy", "Sliggoo", "Goodra", "Castform", "Wimpod", "Golisopod", "Staryu", "Starmie", "Sandygast", "Palossand", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Lileep", "Cradily", "Anorith", "Armaldo", "Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Tirtouga", "Carracosta", "Archen", "Archeops", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Pupitar", "Larvitar", "Tyranitar", "Phantump", "Trevenant", "Natu", "Xatu", "Nosepass", "Probopass", "Pyukumuku", "Chinchou", "Lanturn", "Type: Null", "Silvally", "Poipole", "Naganadel", "Zygarde", "Trubbish", "Garbodor", "Minccino", "Cinccino", "Pineco", "Forretress", "Skarmory", "Ditto", "Cleffa", "Clefairy", "Clefable", "Elgyem", "Beheeyem", "Minior", "Beldum", "Metang", "Metagross", "Porygon", "Porygon2", "Porygon-Z", "Pancham", "Pangoro", "Komala", "Torkoal", "Turtonator", "Houndour", "Houndoom", "Dedenne", "Togedemaru", "Electrike", "Manectric", "Elekid", "Electabuzz", "Electivire", "Geodude-Alola", "Graveler-Alola", "Golem-Alola", "Sandile", "Krokorok", "Krookodile", "Trapinch", "Vibrava", "Flygon", "Gible", "Gabite", "Garchomp", "Baltoy", "Claydol", "Golett", "Golurk", "Klefki", "Mimikyu", "Shuppet", "Banette", "Frillish", "Jellicent", "Bruxish", "Drampa", "Absol", "Snorunt", "Glalie", "Froslass", "Sneasel", "Weavile", "Sandshrew-Alola", "Sandslash-Alola", "Vulpix-Alola", "Ninetales-Alola", "Vanillite", "Vanillish", "Vanilluxe", "Scraggy", "Scrafty", "Pawniard", "Bisharp", "Snubbull", "Granbull", "Shellos", "Gastrodon", "Relicanth", "Dhelmise", "Carvanha", "Sharpedo", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Wailmer", "Wailord", "Lapras", "Tropius", "Exeggcute", "Exeggutor-Alola", "Corphish", "Crawdaunt", "Mienfoo", "Mienshao", "Jangmo-o", "Hakamo-o", "Kommo-o", "Emolga", "Scyther", "Scizor", "Heracross", "Aipom", "Ampibom", "Litleo", "Pyroar", "Misdreavus", "Mismagius", "Druddigon", "Lickitung", "Lickilicky", "Riolu", "Lucario", "Dratini", "Dragonair", "Dragonite", "Aerodactyl", "Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini", "Cosmog", "Cosmoem", "Solgaleo", "Lunala", "Nihilego", "Stakataka", "Blacephalon", "Buzzwole", "Pheromosa", "Xurkitree", "Celesteela", "Kartana", "Guzzlord", "Necrozma", "Magearna", "Marshadow", "Zeraora",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!alolaDex.includes(species.baseSpecies) && !alolaDex.includes(species.name) &&
				!this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the New Alola Pokédex.`];
			}
		},
	},
	galarpokedex: {
		effectType: 'ValidatorRule',
		name: 'Galar Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Galar region (Sw/Sh)",
		banlist: ['Raichu-Alola', 'Weezing-Base'],
		onValidateSet(set, format) {
			const galarDex = [
				"Grookey", "Thwackey", "Rillaboom", "Scorbunny", "Raboot", "Cinderace", "Sobble", "Drizzile", "Inteleon", "Blipbug", "Dottler", "Orbeetle", "Caterpie", "Metapod", "Butterfree", "Grubbin", "Charjabug", "Vikavolt", "Hoothoot", "Noctowl", "Rookidee", "Corvisquire", "Corviknight", "Skwovet", "Greedent", "Pidove", "Tranquill", "Unfezant", "Nickit", "Thievul", "Zigzagoon", "Linoone", "Obstagoon", "Wooloo", "Dubwool", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Chewtle", "Drednaw", "Purrloin", "Liepard", "Yamper", "Boltund", "Bunnelby", "Diggersby", "Minccino", "Cinccino", "Bounsweet", "Steenee", "Tsareena", "Oddish", "Gloom", "Vileplume", "Bellossom", "Budew", "Roselia", "Roserade", "Wingull", "Pelipper", "Joltik", "Galvantula", "Electrike", "Manectric", "Vulpix", "Ninetales", "Growlithe", "Arcanine", "Vanillite", "Vanillish", "Vanilluxe", "Swinub", "Piloswine", "Mamoswine", "Delibird", "Snorunt", "Glalie", "Froslass", "Baltoy", "Claydol", "Mudbray", "Mudsdale", "Dwebble", "Crustle", "Golett", "Golurk", "Munna", "Musharna", "Natu", "Xatu", "Stufful", "Bewear", "Snover", "Abomasnow", "Krabby", "Kingler", "Wooper", "Quagsire", "Corphish", "Crawdaunt", "Nincada", "Ninjask", "Shedinja", "Tyrogue", "Hitmonlee", "Hitmonchan", "Hitmontop", "Pancham", "Pangoro", "Klink", "Klang", "Klinklang", "Combee", "Vespiquen", "Bronzor", "Bronzong", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Drifloon", "Drifblim", "Gossifleur", "Eldegoss", "Cherubi", "Cherrim", "Stunky", "Skuntank", "Tympole", "Palpitoad", "Seismitoad", "Duskull", "Dusclops", "Dusknoir", "Machop", "Machoke", "Machamp", "Gastly", "Haunter", "Gengar", "Magikarp", "Gyarados", "Goldeen", "Seaking", "Remoraid", "Octillery", "Shellder", "Cloyster", "Feebas", "Milotic", "Basculin", "Wishiwashi", "Pyukumuku", "Trubbish", "Garbodor", "Sizzlipede", "Centiskorch", "Rolycoly", "Carkol", "Coalossal", "Diglett", "Dugtrio", "Drilbur", "Excadrill", "Roggenrola", "Boldore", "Gigalith", "Timburr", "Gurdurr", "Conkeldurr", "Woobat", "Swoobat", "Noibat", "Noivern", "Onix", "Steelix", "Arrokuda", "Barraskewda", "Meowth", "Perrserker", "Persian", "Milcery", "Alcremie", "Cutiefly", "Ribombee", "Ferroseed", "Ferrothorn", "Pumpkaboo", "Gourgeist", "Pichu", "Pikachu", "Raichu", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Applin", "Flapple", "Appletun", "Espurr", "Meowstic", "Swirlix", "Slurpuff", "Spritzee", "Aromatisse", "Dewpider", "Araquanid", "Wynaut", "Wobbuffet", "Farfetch\u2019d", "Sirfetch\u2019d", "Chinchou", "Lanturn", "Croagunk", "Toxicroak", "Scraggy", "Scrafty", "Stunfisk", "Shuckle", "Barboach", "Whiscash", "Shellos", "Gastrodon", "Wimpod", "Golisopod", "Binacle", "Barbaracle", "Corsola", "Cursola", "Impidimp", "Morgrem", "Grimmsnarl", "Hatenna", "Hattrem", "Hatterene", "Salandit", "Salazzle", "Pawniard", "Bisharp", "Throh", "Sawk", "Koffing", "Weezing", "Bonsly", "Sudowoodo", "Cleffa", "Clefairy", "Clefable", "Togepi", "Togetic", "Togekiss", "Munchlax", "Snorlax", "Cottonee", "Whimsicott", "Rhyhorn", "Rhydon", "Rhyperior", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Karrablast", "Escavalier", "Shelmet", "Accelgor", "Elgyem", "Beheeyem", "Cubchoo", "Beartic", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Skorupi", "Drapion", "Litwick", "Lampent", "Chandelure", "Inkay", "Malamar", "Sneasel", "Weavile", "Sableye", "Mawile", "Maractus", "Sigilyph", "Riolu", "Lucario", "Torkoal", "Mimikyu", "Cufant", "Copperajah", "Qwilfish", "Frillish", "Jellicent", "Mareanie", "Toxapex", "Cramorant", "Toxel", "Toxtricity", "Toxtricity-Low-Key", "Silicobra", "Sandaconda", "Hippopotas", "Hippowdon", "Durant", "Heatmor", "Helioptile", "Heliolisk", "Hawlucha", "Trapinch", "Vibrava", "Flygon", "Axew", "Fraxure", "Haxorus", "Yamask", "Runerigus", "Cofagrigus", "Honedge", "Doublade", "Aegislash", "Ponyta", "Rapidash", "Sinistea", "Polteageist", "Indeedee", "Phantump", "Trevenant", "Morelull", "Shiinotic", "Oranguru", "Passimian", "Morpeko", "Falinks", "Drampa", "Turtonator", "Togedemaru", "Snom", "Frosmoth", "Clobbopus", "Grapploct", "Pincurchin", "Mantyke", "Mantine", "Wailmer", "Wailord", "Bergmite", "Avalugg", "Dhelmise", "Lapras", "Lunatone", "Solrock", "Mime Jr.", "Mr. Mime", "Mr. Rime", "Darumaka", "Darmanitan", "Stonjourner", "Eiscue", "Duraludon", "Rotom", "Ditto", "Dracozolt", "Arctozolt", "Dracovish", "Arctovish", "Charmander", "Charmeleon", "Charizard", "Type: Null", "Silvally", "Larvitar", "Pupitar", "Tyranitar", "Deino", "Zweilous", "Hydreigon", "Goomy", "Sliggoo", "Goodra", "Jangmo-o", "Hakamo-o", "Kommo-o", "Dreepy", "Drakloak", "Dragapult",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!galarDex.includes(species.baseSpecies) && !galarDex.includes(species.name) &&
				!this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the Galar Pokédex.`];
			}
		},
	},
	isleofarmorpokedex: {
		effectType: 'ValidatorRule',
		name: 'Isle of Armor Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Isle of Armor in the Galar Region (Sw/Sh DLC1)",
		onValidateSet(set, format) {
			const ioaDex = [
				"Slowpoke", "Slowbro", "Slowking", "Buneary", "Lopunny", "Happiny", "Chansey", "Blissey", "Skwovet", "Greedent", "Igglybuff", "Jigglypuff", "Wigglytuff", "Blipbug", "Dottler", "Fomantis", "Lurantis", "Applin", "Flapple", "Appletun", "Fletchling", "Fletchinder", "Talonflame", "Shinx", "Luxio", "Luxray", "Klefki", "Pawniard", "Bisharp", "Abra", "Kadabra", "Alakazam", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Krabby", "Kingler", "Tentacool", "Tentacruel", "Magikarp", "Gyarados", "Remoraid", "Octillery", "Mantyke", "Mantine", "Wingull", "Pelipper", "Skorupi", "Drapion", "Dunsparce", "Bouffalant", "Lickitung", "Lickilicky", "Chewtle", "Drednaw", "Wooper", "Quagsire", "Goomy", "Sliggoo", "Goodra", "Druddigon", "Shelmet", "Accelgor", "Karrablast", "Escavalier", "Bulbasaur", "Ivysaur", "Venusaur", "Squirtle", "Wartortle", "Blastoise", "Venipede", "Whirlipede", "Scolipede", "Foongus", "Amoonguss", "Comfey", "Tangela", "Tangrowth", "Croagunk", "Toxicroak", "Pichu", "Pikachu", "Raichu", "Zorua", "Zoroark", "Oranguru", "Passimian", "Corphish", "Crawdaunt", "Cramorant", "Goldeen", "Seaking", "Arrokuda", "Barraskewda", "Staryu", "Starmie", "Kubfu", "Urshifu", "Emolga", "Dedenne", "Morpeko", "Magnemite", "Magneton", "Magnezone", "Inkay", "Malamar", "Wishiwashi", "Carvanha", "Sharpedo", "Lillipup", "Herdier", "Stoutland", "Tauros", "Miltank", "Scyther", "Scizor", "Pinsir", "Heracross", "Dwebble", "Crustle", "Wimpod", "Golisopod", "Pincurchin", "Mareanie", "Toxapex", "Clobbopus", "Grapploct", "Shellder", "Cloyster", "Sandygast", "Palossand", "Drifloon", "Drifblim", "Barboach", "Whiscash", "Azurill", "Marill", "Azumarill", "Poliwag", "Poliwhirl", "Poliwrath", "Politoed", "Psyduck", "Golduck", "Whismur", "Loudred", "Exploud", "Woobat", "Swoobat", "Skarmory", "Roggenrola", "Boldore", "Gigalith", "Rockruff", "Lycanroc", "Salandit", "Salazzle", "Scraggy", "Scrafty", "Mienfoo", "Mienshao", "Jangmo-o", "Hakamo-o", "Kommo-o", "Sandshrew", "Sandslash", "Cubone", "Marowak", "Kangaskhan", "Torkoal", "Silicobra", "Sandaconda", "Sandile", "Krokorok", "Krookodile", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Rhyhorn", "Rhydon", "Rhyperior", "Larvesta", "Volcarona", "Chinchou", "Lanturn", "Wailmer", "Wailord", "Frillish", "Jellicent", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Horsea", "Seadra", "Kingdra", "Petilil", "Lilligant", "Combee", "Vespiquen", "Exeggcute", "Exeggutor", "Ditto", "Porygon", "Porygon2", "Porygon-Z",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!ioaDex.includes(species.baseSpecies) && !ioaDex.includes(species.name) &&
				!this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the Isle of Armor Pokédex.`];
			}
		},
	},
	crowntundrapokedex: {
		effectType: 'ValidatorRule',
		name: 'Crown Tundra Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Crown Tundra in the Galar Region (Sw/Sh DLC2)",
		onValidateSet(set, format) {
			const tundraDex = [
				"Nidoran-F", "Nidorina", "Nidoqueen", "Nidoran-M", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Zubat", "Golbat", "Ponyta", "Rapidash", "Mr. Mime", "Jynx", "Electabuzz", "Magmar", "Magikarp", "Gyarados", "Lapras", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Crobat", "Cleffa", "Espeon", "Umbreon", "Shuckle", "Sneasel", "Swinub", "Piloswine", "Delibird", "Smoochum", "Elekid", "Magby", "Larvitar", "Pupitar", "Tyranitar", "Zigzagoon", "Linoone", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Swablu", "Altaria", "Barboach", "Whiscash", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Absol", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Relicanth", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Bronzor", "Bronzong", "Spiritomb", "Gible", "Gabite", "Garchomp", "Munchlax", "Riolu", "Lucario", "Snover", "Abomasnow", "Weavile", "Electivire", "Magmortar", "Leafeon", "Glaceon", "Mamoswine", "Froslass", "Audino", "Timburr", "Gurdurr", "Conkeldurr", "Cottonee", "Whimsicott", "Basculin", "Darumaka", "Darmanitan", "Tirtouga", "Carracosta", "Archen", "Archeops", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Vanillite", "Vanillish", "Vanilluxe", "Karrablast", "Escavalier", "Joltik", "Galvantula", "Ferroseed", "Ferrothorn", "Litwick", "Lampent", "Chandelure", "Cubchoo", "Beartic", "Cryogonal", "Shelmet", "Accelgor", "Druddigon", "Golett", "Golurk", "Heatmor", "Durant", "Deino", "Zweilous", "Hydreigon", "Cobalion", "Terrakion", "Virizion", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Sylveon", "Carbink", "Phantump", "Trevenant", "Bergmite", "Avalugg", "Noibat", "Noivern", "Dewpider", "Araquanid", "Mimikyu", "Dhelmise", "Skwovet", "Greedent", "Rookidee", "Corvisquire", "Corviknight", "Gossifleur", "Eldegoss", "Wooloo", "Dubwool", "Yamper", "Boltund", "Rolycoly", "Carkol", "Coalossal", "Sizzlipede", "Centiskorch", "Sinistea", "Polteageist", "Hatenna", "Hattrem", "Hatterene", "Impidimp", "Morgrem", "Grimmsnarl", "Obstagoon", "Mr. Rime", "Pincurchin", "Snom", "Frosmoth", "Stonjourner", "Eiscue", "Indeedee", "Morpeko", "Cufant", "Copperajah", "Dreepy", "Drakloak", "Dragapult", "Regieleki", "Regidrago", "Glastrier", "Spectrier",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!tundraDex.includes(species.baseSpecies) && !tundraDex.includes(species.name)) {
				return [`${species.baseSpecies} is not in the Crown Tundra Pokédex.`];
			}
		},
	},
	galarexpansionpokedex: {
		effectType: 'ValidatorRule',
		name: 'Galar Expansion Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Galar region, Isle of Armor, or Crown Tundra (Sw/Sh + Expansion Pass)",
		onValidateSet(set, format) {
			const galarDex = [
				"Grookey", "Thwackey", "Rillaboom", "Scorbunny", "Raboot", "Cinderace", "Sobble", "Drizzile", "Inteleon", "Blipbug", "Dottler", "Orbeetle", "Caterpie", "Metapod", "Butterfree", "Grubbin", "Charjabug", "Vikavolt", "Hoothoot", "Noctowl", "Rookidee", "Corvisquire", "Corviknight", "Skwovet", "Greedent", "Pidove", "Tranquill", "Unfezant", "Nickit", "Thievul", "Zigzagoon", "Linoone", "Obstagoon", "Wooloo", "Dubwool", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Chewtle", "Drednaw", "Purrloin", "Liepard", "Yamper", "Boltund", "Bunnelby", "Diggersby", "Minccino", "Cinccino", "Bounsweet", "Steenee", "Tsareena", "Oddish", "Gloom", "Vileplume", "Bellossom", "Budew", "Roselia", "Roserade", "Wingull", "Pelipper", "Joltik", "Galvantula", "Electrike", "Manectric", "Vulpix", "Ninetales", "Growlithe", "Arcanine", "Vanillite", "Vanillish", "Vanilluxe", "Swinub", "Piloswine", "Mamoswine", "Delibird", "Snorunt", "Glalie", "Froslass", "Baltoy", "Claydol", "Mudbray", "Mudsdale", "Dwebble", "Crustle", "Golett", "Golurk", "Munna", "Musharna", "Natu", "Xatu", "Stufful", "Bewear", "Snover", "Abomasnow", "Krabby", "Kingler", "Wooper", "Quagsire", "Corphish", "Crawdaunt", "Nincada", "Ninjask", "Shedinja", "Tyrogue", "Hitmonlee", "Hitmonchan", "Hitmontop", "Pancham", "Pangoro", "Klink", "Klang", "Klinklang", "Combee", "Vespiquen", "Bronzor", "Bronzong", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Drifloon", "Drifblim", "Gossifleur", "Eldegoss", "Cherubi", "Cherrim", "Stunky", "Skuntank", "Tympole", "Palpitoad", "Seismitoad", "Duskull", "Dusclops", "Dusknoir", "Machop", "Machoke", "Machamp", "Gastly", "Haunter", "Gengar", "Magikarp", "Gyarados", "Goldeen", "Seaking", "Remoraid", "Octillery", "Shellder", "Cloyster", "Feebas", "Milotic", "Basculin", "Wishiwashi", "Pyukumuku", "Trubbish", "Garbodor", "Sizzlipede", "Centiskorch", "Rolycoly", "Carkol", "Coalossal", "Diglett", "Dugtrio", "Drilbur", "Excadrill", "Roggenrola", "Boldore", "Gigalith", "Timburr", "Gurdurr", "Conkeldurr", "Woobat", "Swoobat", "Noibat", "Noivern", "Onix", "Steelix", "Arrokuda", "Barraskewda", "Meowth", "Perrserker", "Persian", "Milcery", "Alcremie", "Cutiefly", "Ribombee", "Ferroseed", "Ferrothorn", "Pumpkaboo", "Gourgeist", "Pichu", "Pikachu", "Raichu", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Applin", "Flapple", "Appletun", "Espurr", "Meowstic", "Swirlix", "Slurpuff", "Spritzee", "Aromatisse", "Dewpider", "Araquanid", "Wynaut", "Wobbuffet", "Farfetch\u2019d", "Sirfetch\u2019d", "Chinchou", "Lanturn", "Croagunk", "Toxicroak", "Scraggy", "Scrafty", "Stunfisk", "Shuckle", "Barboach", "Whiscash", "Shellos", "Gastrodon", "Wimpod", "Golisopod", "Binacle", "Barbaracle", "Corsola", "Cursola", "Impidimp", "Morgrem", "Grimmsnarl", "Hatenna", "Hattrem", "Hatterene", "Salandit", "Salazzle", "Pawniard", "Bisharp", "Throh", "Sawk", "Koffing", "Weezing", "Bonsly", "Sudowoodo", "Cleffa", "Clefairy", "Clefable", "Togepi", "Togetic", "Togekiss", "Munchlax", "Snorlax", "Cottonee", "Whimsicott", "Rhyhorn", "Rhydon", "Rhyperior", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Karrablast", "Escavalier", "Shelmet", "Accelgor", "Elgyem", "Beheeyem", "Cubchoo", "Beartic", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Skorupi", "Drapion", "Litwick", "Lampent", "Chandelure", "Inkay", "Malamar", "Sneasel", "Weavile", "Sableye", "Mawile", "Maractus", "Sigilyph", "Riolu", "Lucario", "Torkoal", "Mimikyu", "Cufant", "Copperajah", "Qwilfish", "Frillish", "Jellicent", "Mareanie", "Toxapex", "Cramorant", "Toxel", "Toxtricity", "Toxtricity-Low-Key", "Silicobra", "Sandaconda", "Hippopotas", "Hippowdon", "Durant", "Heatmor", "Helioptile", "Heliolisk", "Hawlucha", "Trapinch", "Vibrava", "Flygon", "Axew", "Fraxure", "Haxorus", "Yamask", "Runerigus", "Cofagrigus", "Honedge", "Doublade", "Aegislash", "Ponyta", "Rapidash", "Sinistea", "Polteageist", "Indeedee", "Phantump", "Trevenant", "Morelull", "Shiinotic", "Oranguru", "Passimian", "Morpeko", "Falinks", "Drampa", "Turtonator", "Togedemaru", "Snom", "Frosmoth", "Clobbopus", "Grapploct", "Pincurchin", "Mantyke", "Mantine", "Wailmer", "Wailord", "Bergmite", "Avalugg", "Dhelmise", "Lapras", "Lunatone", "Solrock", "Mime Jr.", "Mr. Mime", "Mr. Rime", "Darumaka", "Darmanitan", "Stonjourner", "Eiscue", "Duraludon", "Rotom", "Ditto", "Dracozolt", "Arctozolt", "Dracovish", "Arctovish", "Charmander", "Charmeleon", "Charizard", "Type: Null", "Silvally", "Larvitar", "Pupitar", "Tyranitar", "Deino", "Zweilous", "Hydreigon", "Goomy", "Sliggoo", "Goodra", "Jangmo-o", "Hakamo-o", "Kommo-o", "Dreepy", "Drakloak", "Dragapult",
				"Slowpoke", "Slowbro", "Slowking", "Buneary", "Lopunny", "Happiny", "Chansey", "Blissey", "Skwovet", "Greedent", "Igglybuff", "Jigglypuff", "Wigglytuff", "Blipbug", "Dottler", "Fomantis", "Lurantis", "Applin", "Flapple", "Appletun", "Fletchling", "Fletchinder", "Talonflame", "Shinx", "Luxio", "Luxray", "Klefki", "Pawniard", "Bisharp", "Abra", "Kadabra", "Alakazam", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Krabby", "Kingler", "Tentacool", "Tentacruel", "Magikarp", "Gyarados", "Remoraid", "Octillery", "Mantyke", "Mantine", "Wingull", "Pelipper", "Skorupi", "Drapion", "Dunsparce", "Bouffalant", "Lickitung", "Lickilicky", "Chewtle", "Drednaw", "Wooper", "Quagsire", "Goomy", "Sliggoo", "Goodra", "Druddigon", "Shelmet", "Accelgor", "Karrablast", "Escavalier", "Bulbasaur", "Ivysaur", "Venusaur", "Squirtle", "Wartortle", "Blastoise", "Venipede", "Whirlipede", "Scolipede", "Foongus", "Amoonguss", "Comfey", "Tangela", "Tangrowth", "Croagunk", "Toxicroak", "Pichu", "Pikachu", "Raichu", "Zorua", "Zoroark", "Oranguru", "Passimian", "Corphish", "Crawdaunt", "Cramorant", "Goldeen", "Seaking", "Arrokuda", "Barraskewda", "Staryu", "Starmie", "Kubfu", "Urshifu", "Emolga", "Dedenne", "Morpeko", "Magnemite", "Magneton", "Magnezone", "Inkay", "Malamar", "Wishiwashi", "Carvanha", "Sharpedo", "Lillipup", "Herdier", "Stoutland", "Tauros", "Miltank", "Scyther", "Scizor", "Pinsir", "Heracross", "Dwebble", "Crustle", "Wimpod", "Golisopod", "Pincurchin", "Mareanie", "Toxapex", "Clobbopus", "Grapploct", "Shellder", "Cloyster", "Sandygast", "Palossand", "Drifloon", "Drifblim", "Barboach", "Whiscash", "Azurill", "Marill", "Azumarill", "Poliwag", "Poliwhirl", "Poliwrath", "Politoed", "Psyduck", "Golduck", "Whismur", "Loudred", "Exploud", "Woobat", "Swoobat", "Skarmory", "Roggenrola", "Boldore", "Gigalith", "Rockruff", "Lycanroc", "Salandit", "Salazzle", "Scraggy", "Scrafty", "Mienfoo", "Mienshao", "Jangmo-o", "Hakamo-o", "Kommo-o", "Sandshrew", "Sandslash", "Cubone", "Marowak", "Kangaskhan", "Torkoal", "Silicobra", "Sandaconda", "Sandile", "Krokorok", "Krookodile", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Rhyhorn", "Rhydon", "Rhyperior", "Larvesta", "Volcarona", "Chinchou", "Lanturn", "Wailmer", "Wailord", "Frillish", "Jellicent", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Horsea", "Seadra", "Kingdra", "Petilil", "Lilligant", "Combee", "Vespiquen", "Exeggcute", "Exeggutor", "Ditto", "Porygon", "Porygon2", "Porygon-Z",
				"Nidoran-F", "Nidorina", "Nidoqueen", "Nidoran-M", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Zubat", "Golbat", "Ponyta", "Rapidash", "Mr. Mime", "Jynx", "Electabuzz", "Magmar", "Magikarp", "Gyarados", "Lapras", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Crobat", "Cleffa", "Espeon", "Umbreon", "Shuckle", "Sneasel", "Swinub", "Piloswine", "Delibird", "Smoochum", "Elekid", "Magby", "Larvitar", "Pupitar", "Tyranitar", "Zigzagoon", "Linoone", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Swablu", "Altaria", "Barboach", "Whiscash", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Absol", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Relicanth", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Bronzor", "Bronzong", "Spiritomb", "Gible", "Gabite", "Garchomp", "Munchlax", "Riolu", "Lucario", "Snover", "Abomasnow", "Weavile", "Electivire", "Magmortar", "Leafeon", "Glaceon", "Mamoswine", "Froslass", "Audino", "Timburr", "Gurdurr", "Conkeldurr", "Cottonee", "Whimsicott", "Basculin", "Darumaka", "Darmanitan", "Tirtouga", "Carracosta", "Archen", "Archeops", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Vanillite", "Vanillish", "Vanilluxe", "Karrablast", "Escavalier", "Joltik", "Galvantula", "Ferroseed", "Ferrothorn", "Litwick", "Lampent", "Chandelure", "Cubchoo", "Beartic", "Cryogonal", "Shelmet", "Accelgor", "Druddigon", "Golett", "Golurk", "Heatmor", "Durant", "Deino", "Zweilous", "Hydreigon", "Cobalion", "Terrakion", "Virizion", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Sylveon", "Carbink", "Phantump", "Trevenant", "Bergmite", "Avalugg", "Noibat", "Noivern", "Dewpider", "Araquanid", "Mimikyu", "Dhelmise", "Skwovet", "Greedent", "Rookidee", "Corvisquire", "Corviknight", "Gossifleur", "Eldegoss", "Wooloo", "Dubwool", "Yamper", "Boltund", "Rolycoly", "Carkol", "Coalossal", "Sizzlipede", "Centiskorch", "Sinistea", "Polteageist", "Hatenna", "Hattrem", "Hatterene", "Impidimp", "Morgrem", "Grimmsnarl", "Obstagoon", "Mr. Rime", "Pincurchin", "Snom", "Frosmoth", "Stonjourner", "Eiscue", "Indeedee", "Morpeko", "Cufant", "Copperajah", "Dreepy", "Drakloak", "Dragapult", "Regieleki", "Regidrago", "Glastrier", "Spectrier",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!galarDex.includes(species.baseSpecies) && !galarDex.includes(species.name)) {
				return [`${species.baseSpecies} is not in the Galar, Isle of Armor, or Crown Tundra Pokédexes.`];
			}
		},
	},
	potd: {
		effectType: 'Rule',
		name: 'PotD',
		desc: "Forces the Pokemon of the Day onto every random team.",
		onBegin() {
			if (global.Config && global.Config.potd) {
				this.add('rule', "Pokemon of the Day: " + this.dex.species.get(Config.potd).name);
			}
		},
	},
	teampreview: {
		effectType: 'Rule',
		name: 'Team Preview',
		desc: "Allows each player to see the Pok&eacute;mon on their opponent's team before they choose their lead Pok&eacute;mon",
		onTeamPreview() {
			this.add('clearpoke');
			for (const pokemon of this.getAllPokemon()) {
				const details = pokemon.details.replace(', shiny', '')
					.replace(/(Greninja|Gourgeist|Pumpkaboo|Xerneas|Silvally|Urshifu|Dudunsparce)(-[a-zA-Z?-]+)?/g, '$1-*')
					.replace(/(Zacian|Zamazenta)(?!-Crowned)/g, '$1-*'); // Hacked-in Crowned formes will be revealed
				this.add('poke', pokemon.side.id, details, '');
			}
			this.makeRequest('teampreview');
		},
	},
	littlecup: {
		effectType: 'ValidatorRule',
		name: 'Little Cup',
		desc: "Only allows Pok&eacute;mon that can evolve and don't have any prior evolutions",
		ruleset: ['Max Level = 5'],
		banlist: ['Stantler'],
		onValidateSet(set) {
			const species = this.dex.species.get(set.species || set.name);
			if (species.prevo && this.dex.species.get(species.prevo).gen <= this.gen) {
				return [set.species + " isn't the first in its evolution family."];
			}
			if (!species.nfe) {
				return [set.species + " doesn't have an evolution family."];
			}
		},
	},
	vgctimer: {
		effectType: 'Rule',
		name: 'VGC Timer',
		desc: "VGC's timer: 90 second Team Preview, 7 minutes Your Time, 1 minute per turn",
		timer: {
			starting: 7 * 60, addPerTurn: 0, maxPerTurn: 55, maxFirstTurn: 90,
			grace: 90, timeoutAutoChoose: true, dcTimerBank: false,
		},
	},
	speciesclause: {
		effectType: 'ValidatorRule',
		name: 'Species Clause',
		desc: "Prevents teams from having more than one Pok&eacute;mon from the same species",
		onBegin() {
			this.add('rule', 'Species Clause: Limit one of each Pokémon');
		},
		onValidateTeam(team, format) {
			const speciesTable = new Set<number>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (speciesTable.has(species.num)) {
					return [`You are limited to one of each Pokémon by Species Clause.`, `(You have more than one ${species.baseSpecies})`];
				}
				speciesTable.add(species.num);
			}
		},
	},
	nicknameclause: {
		effectType: 'ValidatorRule',
		name: 'Nickname Clause',
		desc: "Prevents teams from having more than one Pok&eacute;mon with the same nickname",
		onValidateTeam(team, format) {
			const nameTable = new Set<string>();
			for (const set of team) {
				const name = set.name;
				if (name) {
					if (name === this.dex.species.get(set.species).baseSpecies) continue;
					if (nameTable.has(name)) {
						return [`Your Pokémon must have different nicknames.`, `(You have more than one ${name})`];
					}
					nameTable.add(name);
				}
			}
			// Illegality of impersonation of other species is
			// hardcoded in team-validator.js, so we are done.
		},
	},
	itemclause: {
		effectType: 'ValidatorRule',
		name: 'Item Clause',
		desc: "Prevents teams from having more than one Pok&eacute;mon with the same item",
		onBegin() {
			this.add('rule', 'Item Clause: Limit one of each item');
		},
		onValidateTeam(team) {
			const itemTable = new Set<string>();
			for (const set of team) {
				const item = this.toID(set.item);
				if (!item) continue;
				if (itemTable.has(item)) {
					return [
						`You are limited to one of each item by Item Clause.`,
						`(You have more than one ${this.dex.items.get(item).name})`,
					];
				}
				itemTable.add(item);
			}
		},
	},
	ohkoclause: {
		effectType: 'ValidatorRule',
		name: 'OHKO Clause',
		desc: "Bans all OHKO moves, such as Fissure",
		onBegin() {
			this.add('rule', 'OHKO Clause: OHKO moves are banned');
		},
		onValidateSet(set) {
			const problems: string[] = [];
			if (set.moves) {
				for (const moveId of set.moves) {
					const move = this.dex.moves.get(moveId);
					if (move.ohko) problems.push(move.name + ' is banned by OHKO Clause.');
				}
			}
			return problems;
		},
	},
	evasionclause: {
		effectType: 'ValidatorRule',
		name: 'Evasion Clause',
		desc: "Bans abilities, items, and moves that boost Evasion",
		ruleset: ['Evasion Abilities Clause', 'Evasion Items Clause', 'Evasion Moves Clause'],
		onBegin() {
			this.add('rule', 'Evasion Clause: Evasion abilities, items, and moves are banned');
		},
	},
	evasionabilitiesclause: {
		effectType: 'ValidatorRule',
		name: 'Evasion Abilities Clause',
		desc: "Bans abilities that boost Evasion under certain weather conditions",
		banlist: ['Sand Veil', 'Snow Cloak'],
		onBegin() {
			this.add('rule', 'Evasion Abilities Clause: Evasion abilities are banned');
		},
	},
	evasionitemsclause: {
		effectType: 'ValidatorRule',
		name: 'Evasion Items Clause',
		desc: "Bans moves that lower the accuracy of moves used against the user",
		banlist: ['Bright Powder', 'Lax Incense'],
		onBegin() {
			this.add('rule', 'Evasion Items Clause: Evasion items are banned');
		},
	},
	evasionmovesclause: {
		effectType: 'ValidatorRule',
		name: 'Evasion Moves Clause',
		desc: "Bans moves that consistently raise the user's evasion when used",
		banlist: ['Minimize', 'Double Team'],
		onBegin() {
			this.add('rule', 'Evasion Moves Clause: Evasion moves are banned');
		},
	},
	accuracymovesclause: {
		effectType: 'ValidatorRule',
		name: 'Accuracy Moves Clause',
		desc: "Bans moves that have a chance to lower the target's accuracy when used",
		banlist: [
			'Flash', 'Kinesis', 'Leaf Tornado', 'Mirror Shot', 'Mud Bomb', 'Mud-Slap', 'Muddy Water', 'Night Daze', 'Octazooka', 'Sand Attack', 'Smokescreen',
		],
		onBegin() {
			this.add('rule', 'Accuracy Moves Clause: Accuracy-lowering moves are banned');
		},
	},
	sleepmovesclause: {
		effectType: 'ValidatorRule',
		name: 'Sleep Moves Clause',
		desc: "Bans all moves that induce sleep, such as Hypnosis",
		banlist: ['Yawn'],
		onBegin() {
			this.add('rule', 'Sleep Clause: Sleep-inducing moves are banned');
		},
		onValidateSet(set) {
			const problems = [];
			if (set.moves) {
				for (const id of set.moves) {
					const move = this.dex.moves.get(id);
					if (move.status && move.status === 'slp') problems.push(move.name + ' is banned by Sleep Clause.');
				}
			}
			return problems;
		},
	},
	gravitysleepclause: {
		effectType: 'ValidatorRule',
		name: 'Gravity Sleep Clause',
		desc: "Bans sleep moves below 100% accuracy, in conjunction with Gravity or Gigantamax Orbeetle",
		banlist: [
			'Gravity ++ Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
		onValidateTeam(team) {
			let hasOrbeetle = false;
			let hasSleepMove = false;
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (species.name === "Orbeetle" && set.gigantamax) hasOrbeetle = true;
				if (!hasOrbeetle && species.name === "Orbeetle-Gmax") hasOrbeetle = true;
				for (const moveid of set.moves) {
					const move = this.dex.moves.get(moveid);
					if (move.status && move.status === 'slp' && (move.accuracy as number) < 100) hasSleepMove = true;
				}
			}
			if (hasOrbeetle && hasSleepMove) {
				return [`The combination of Gravity and Gigantamax Orbeetle on the same team is banned.`];
			}
		},
		onBegin() {
			this.add('rule', 'Gravity Sleep Clause: The combination of sleep-inducing moves with imperfect accuracy and Gravity or Gigantamax Orbeetle are banned');
		},
	},
	endlessbattleclause: {
		effectType: 'Rule',
		name: 'Endless Battle Clause',
		desc: "Prevents players from forcing a battle which their opponent cannot end except by forfeit",
		// implemented in sim/battle.js, see https://dex.pokemonshowdown.com/articles/battlerules#endlessbattleclause for the specification.
		onBegin() {
			this.add('rule', 'Endless Battle Clause: Forcing endless battles is banned');
		},
	},
	moodyclause: {
		effectType: 'ValidatorRule',
		name: 'Moody Clause',
		desc: "Bans the ability Moody",
		banlist: ['Moody'],
		onBegin() {
			this.add('rule', 'Moody Clause: Moody is banned');
		},
	},
	swaggerclause: {
		effectType: 'ValidatorRule',
		name: 'Swagger Clause',
		desc: "Bans the move Swagger",
		banlist: ['Swagger'],
		onBegin() {
			this.add('rule', 'Swagger Clause: Swagger is banned');
		},
	},
	batonpassclause: {
		effectType: 'ValidatorRule',
		name: 'Baton Pass Clause',
		desc: "Stops teams from having more than one Pok&eacute;mon with Baton Pass, and no Pok&eacute;mon may be capable of passing boosts to both Speed and another stat",
		banlist: ["Baton Pass > 1"],
		onBegin() {
			this.add('rule', 'Baton Pass Clause: Limit one Baton Passer, can\'t pass Spe and other stats simultaneously');
		},
		onValidateSet(set, format, setHas) {
			if (!('move:batonpass' in setHas)) return;

			const item = this.dex.items.get(set.item);
			const ability = this.toID(set.ability);
			let speedBoosted: boolean | string = false;
			let nonSpeedBoosted: boolean | string = false;

			for (const moveId of set.moves) {
				const move = this.dex.moves.get(moveId);
				if (move.id === 'flamecharge' || (move.boosts && move.boosts.spe && move.boosts.spe > 0)) {
					speedBoosted = true;
				}
				const nonSpeedBoostedMoves = [
					'acupressure', 'bellydrum', 'chargebeam', 'curse', 'diamondstorm', 'fellstinger', 'fierydance',
					'flowershield', 'poweruppunch', 'rage', 'rototiller', 'skullbash', 'stockpile',
				];
				if (nonSpeedBoostedMoves.includes(move.id) ||
					move.boosts && ((move.boosts.atk && move.boosts.atk > 0) || (move.boosts.def && move.boosts.def > 0) ||
					(move.boosts.spa && move.boosts.spa > 0) || (move.boosts.spd && move.boosts.spd > 0))) {
					nonSpeedBoosted = true;
				}
				if (item.zMove && move.type === item.zMoveType && move.zMove?.boost) {
					const boosts = move.zMove.boost;
					if (boosts.spe && boosts.spe > 0) {
						if (!speedBoosted) speedBoosted = move.name;
					}
					if (
						((boosts.atk && boosts.atk > 0) || (boosts.def && boosts.def > 0) ||
						(boosts.spa && boosts.spa > 0) || (boosts.spd && boosts.spd > 0))
					) {
						if (!nonSpeedBoosted || move.name === speedBoosted) nonSpeedBoosted = move.name;
					}
				}
			}

			const speedBoostedAbilities = ['motordrive', 'rattled', 'speedboost', 'steadfast', 'weakarmor'];
			const speedBoostedItems = ['blazikenite', 'eeviumz', 'kommoniumz', 'salacberry'];
			if (speedBoostedAbilities.includes(ability) || speedBoostedItems.includes(item.id)) {
				speedBoosted = true;
			}
			if (!speedBoosted) return;

			const nonSpeedBoostedAbilities = [
				'angerpoint', 'competitive', 'defiant', 'download', 'justified', 'lightningrod', 'moxie', 'sapsipper', 'stormdrain',
			];
			const nonSpeedBoostedItems = [
				'absorbbulb', 'apicotberry', 'cellbattery', 'eeviumz', 'ganlonberry', 'keeberry', 'kommoniumz', 'liechiberry',
				'luminousmoss', 'marangaberry', 'petayaberry', 'snowball', 'starfberry', 'weaknesspolicy',
			];
			if (nonSpeedBoostedAbilities.includes(ability) || nonSpeedBoostedItems.includes(item.id)) {
				nonSpeedBoosted = true;
			}
			if (!nonSpeedBoosted) return;

			// if both boost sources are Z-moves, and they're distinct
			if (speedBoosted !== nonSpeedBoosted && typeof speedBoosted === 'string' && typeof nonSpeedBoosted === 'string') return;

			return [
				`${set.name || set.species} can Baton Pass both Speed and a different stat, which is banned by Baton Pass Clause.`,
			];
		},
	},
	onebatonpassclause: {
		effectType: 'ValidatorRule',
		name: 'One Baton Pass Clause',
		desc: "Stops teams from having more than one Pok&eacute;mon with Baton Pass",
		banlist: ["Baton Pass > 1"],
		onBegin() {
			this.add('rule', 'One Baton Pass Clause: Limit one Baton Passer');
		},
	},
	oneboostpasserclause: {
		effectType: 'ValidatorRule',
		name: 'One Boost Passer Clause',
		desc: "Stops teams from having a Pok&eacute;mon with Baton Pass that has multiple ways to boost its stats, and no more than one Baton Passer may be able to boost its stats",
		onBegin() {
			this.add('rule', 'One Boost Passer Clause: Limit one Baton Passer that has a way to boost its stats');
		},
		onValidateTeam(team) {
			const boostingEffects = [
				'acidarmor', 'agility', 'amnesia', 'apicotberry', 'barrier', 'bellydrum', 'bulkup', 'calmmind', 'cosmicpower', 'curse',
				'defensecurl', 'dragondance', 'ganlonberry', 'growth', 'harden', 'howl', 'irondefense', 'liechiberry', 'meditate',
				'petayaberry', 'salacberry', 'sharpen', 'speedboost', 'starfberry', 'swordsdance', 'tailglow', 'withdraw',
			];
			let passers = 0;
			for (const set of team) {
				if (!set.moves.includes('Baton Pass')) continue;
				let passableBoosts = 0;
				const item = this.toID(set.item);
				const ability = this.toID(set.ability);
				for (const move of set.moves) {
					if (boostingEffects.includes(this.toID(move))) passableBoosts++;
				}
				if (boostingEffects.includes(item)) passableBoosts++;
				if (boostingEffects.includes(ability)) passableBoosts++;
				if (passableBoosts === 1) passers++;
				if (passableBoosts > 1) {
					return [
						`${set.name || set.species} has Baton Pass and multiple ways to boost its stats, which is banned by One Boost Passer Clause.`,
					];
				}
				if (passers > 1) {
					return [
						`Multiple Pokemon have Baton Pass and a way to boost their stats, which is banned by One Boost Passer Clause.`,
					];
				}
			}
		},
	},
	batonpassstatclause: {
		effectType: 'ValidatorRule',
		name: 'Baton Pass Stat Clause',
		desc: "Stops teams from having a Pok&eacute;mon with Baton Pass that has any way to boost its stats",
		onBegin() {
			this.add('rule', 'Baton Pass Stat Clause: No Baton Passer may have a way to boost its stats');
		},
		onValidateTeam(team) {
			const boostingEffects = [
				'absorbbulb', 'acidarmor', 'acupressure', 'agility', 'amnesia', 'ancientpower', 'angerpoint', 'apicotberry', 'autotomize',
				'barrier', 'bellydrum', 'bulkup', 'calmmind', 'cellbattery', 'chargebeam', 'coil', 'cosmicpower', 'cottonguard', 'curse',
				'defendorder', 'defiant', 'download', 'dragondance', 'fierydance', 'flamecharge', 'ganlonberry', 'growth', 'harden',
				'honeclaws', 'howl', 'irondefense', 'justified', 'liechiberry', 'lightningrod', 'meditate', 'metalclaw', 'meteormash',
				'motordrive', 'moxie', 'nastyplot', 'ominouswind', 'petayaberry', 'quiverdance', 'rage', 'rattled', 'rockpolish',
				'salacberry', 'sapsipper', 'sharpen', 'shellsmash', 'shiftgear', 'silverwind', 'skullbash', 'speedboost', 'starfberry',
				'steadfast', 'steelwing', 'stockpile', 'stormdrain', 'swordsdance', 'tailglow', 'weakarmor', 'withdraw', 'workup',
			];
			for (const set of team) {
				if (!set.moves.includes('Baton Pass')) continue;
				let passableBoosts = false;
				const item = this.toID(set.item);
				const ability = this.toID(set.ability);
				for (const move of set.moves) {
					if (boostingEffects.includes(this.toID(move))) passableBoosts = true;
				}
				if (boostingEffects.includes(item)) passableBoosts = true;
				if (boostingEffects.includes(ability)) passableBoosts = true;
				if (passableBoosts) {
					return [
						`${set.name || set.species} has Baton Pass and a way to boost its stats, which is banned by Baton Pass Stat Clause.`,
					];
				}
			}
		},
	},
	hppercentagemod: {
		effectType: 'Rule',
		name: 'HP Percentage Mod',
		desc: "Shows the HP of Pok&eacute;mon in percentages",
		onBegin() {
			this.add('rule', 'HP Percentage Mod: HP is shown in percentages');
			this.reportPercentages = true;
		},
	},
	exacthpmod: {
		effectType: 'Rule',
		name: 'Exact HP Mod',
		desc: "Shows the exact HP of all Pok&eacute;mon",
		onBegin() {
			this.add('rule', 'Exact HP Mod: Exact HP is shown');
			this.reportExactHP = true;
		},
	},
	cancelmod: {
		effectType: 'Rule',
		name: 'Cancel Mod',
		desc: "Allows players to change their own choices before their opponents make one",
		onBegin() {
			this.supportCancel = true;
		},
	},
	sleepclausemod: {
		effectType: 'Rule',
		name: 'Sleep Clause Mod',
		desc: "Prevents players from putting more than one of their opponent's Pok&eacute;mon to sleep at a time, and bans Mega Gengar from using Hypnosis",
		banlist: ['Hypnosis + Gengarite'],
		onBegin() {
			this.add('rule', 'Sleep Clause Mod: Limit one foe put to sleep');
		},
		onSetStatus(status, target, source) {
			if (source && source.isAlly(target)) {
				return;
			}
			if (status.id === 'slp') {
				for (const pokemon of target.side.pokemon) {
					if (pokemon.hp && pokemon.status === 'slp') {
						if (!pokemon.statusState.source || !pokemon.statusState.source.isAlly(pokemon)) {
							this.add('-message', 'Sleep Clause Mod activated.');
							return false;
						}
					}
				}
			}
		},
	},
	stadiumsleepclause: {
		effectType: 'Rule',
		name: 'Stadium Sleep Clause',
		desc: "Prevents players from putting one of their opponent's Pok\u00E9mon to sleep if any of the opponent's other Pok\u00E9mon are asleep (different from Sleep Clause Mod because putting your own Pok\u00E9mon to sleep is enough to prevent opponents from putting your others to sleep).",
		onBegin() {
			this.add('rule', 'Stadium Sleep Clause: Limit one foe put to sleep');
		},
		onSetStatus(status, target, source) {
			if (source && source.isAlly(target)) {
				return;
			}
			if (status.id === 'slp') {
				for (const pokemon of target.side.pokemon) {
					if (pokemon.hp && pokemon.status === 'slp') {
						this.add('-message', "Sleep Clause activated. (In Nintendo formats, Sleep Clause activates if any of the opponent's Pokemon are asleep, even if self-inflicted from Rest)");
						return false;
					}
				}
			}
		},
	},
	switchpriorityclausemod: {
		effectType: 'Rule',
		name: 'Switch Priority Clause Mod',
		desc: "Makes a faster Pokémon switch first when double-switching, unlike in Emerald link battles, where player 1's Pokémon would switch first",
		onBegin() {
			this.add('rule', 'Switch Priority Clause Mod: Faster Pokémon switch first');
		},
	},
	desyncclausemod: {
		effectType: 'Rule',
		name: 'Desync Clause Mod',
		desc: 'If a desync would happen, the move fails instead. This rule currently covers Bide, Counter, and Psywave.',
		onBegin() {
			this.add('rule', 'Desync Clause Mod: Desyncs changed to move failure.');
		},
		// Hardcoded in gen1/moves.ts
		// Can't be disabled (no precedent for how else to handle desyncs)
	},
	deoxyscamouflageclause: {
		effectType: 'Rule',
		name: 'Deoxys Camouflage Clause',
		desc: "Reveals the Deoxys forme when it is sent in battle.",
		// Hardcoded into effect, cannot be disabled.
		onBegin() {
			this.add('rule', 'Deoxys Camouflage Clause: Reveals the Deoxys forme when it is sent in battle.');
		},
	},
	freezeclausemod: {
		effectType: 'Rule',
		name: 'Freeze Clause Mod',
		desc: "Prevents players from freezing more than one of their opponent's Pok&eacute;mon at a time",
		onBegin() {
			this.add('rule', 'Freeze Clause Mod: Limit one foe frozen');
		},
		onSetStatus(status, target, source) {
			if (source && source.isAlly(target)) {
				return;
			}
			if (status.id === 'frz') {
				for (const pokemon of target.side.pokemon) {
					if (pokemon.status === 'frz') {
						this.add('-message', 'Freeze Clause activated.');
						return false;
					}
				}
			}
		},
	},
	sametypeclause: {
		effectType: 'ValidatorRule',
		name: 'Same Type Clause',
		desc: "Forces all Pok&eacute;mon on a team to share a type with each other",
		onBegin() {
			this.add('rule', 'Same Type Clause: Pokémon in a team must share a type');
		},
		onValidateTeam(team) {
			let typeTable: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.species.get(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (i === 0) {
					typeTable = species.types;
				} else {
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				const item = this.dex.items.get(set.item);
				if (item.megaStone && species.baseSpecies === item.megaEvolves) {
					species = this.dex.species.get(item.megaStone);
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
					species = this.dex.species.get("Necrozma-Ultra");
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				if (!typeTable.length) return [`Your team must share a type.`];
			}
			for (const set of team) {
				if (this.gen === 9 && set.teraType &&
						!typeTable.includes(set.teraType) && this.ruleTable.has(`enforcesameteratype`)) {
					return [`${set.species}'s Tera Type must match the team's type.`];
				}
			}
		},
	},
	megarayquazaclause: {
		effectType: 'Rule',
		name: 'Mega Rayquaza Clause',
		desc: "Prevents Rayquaza from mega evolving",
		onBegin() {
			this.add('rule', 'Mega Rayquaza Clause: You cannot mega evolve Rayquaza');
			for (const pokemon of this.getAllPokemon()) {
				if (pokemon.species.id === 'rayquaza') pokemon.canMegaEvo = null;
			}
		},
	},
	dynamaxclause: {
		effectType: 'Rule',
		name: 'Dynamax Clause',
		desc: "Prevents Pok&eacute;mon from Dynamaxing",
		onValidateSet(set) {
			if (set.gigantamax) {
				return [
					`Your set for ${set.species} is flagged as Gigantamax, but Gigantamaxing is disallowed`,
					`(If this was a mistake, disable Gigantamaxing on the set.)`,
				];
			}
		},
		onBegin() {
			for (const side of this.sides) {
				side.dynamaxUsed = true;
			}
			this.add('rule', 'Dynamax Clause: You cannot dynamax');
		},
	},
	terastalclause: {
		effectType: 'Rule',
		name: 'Terastal Clause',
		desc: "Prevents Pok&eacute;mon from Terastallizing",
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.canTerastallize = null;
			}
			this.add('rule', 'Terastal Clause: You cannot Terastallize');
		},
	},
	arceusevlimit: {
		effectType: 'ValidatorRule',
		name: 'Arceus EV Limit',
		desc: "Restricts Arceus to a maximum of 100 EVs in any one stat, and only multiples of 10",
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			if (species.num === 493 && set.evs) {
				let stat: StatID;
				for (stat in set.evs) {
					const ev = set.evs[stat];
					if (ev > 100) {
						return [
							"Arceus can't have more than 100 EVs in any stat, because Arceus is only obtainable from level 100 events.",
							"Level 100 Pokemon can only gain EVs from vitamins (Carbos etc), which are capped at 100 EVs.",
						];
					}
					if (!(
						ev % 10 === 0 ||
						(ev % 10 === 8 && ev % 4 === 0)
					)) {
						return [
							"Arceus can only have EVs that are multiples of 10, because Arceus is only obtainable from level 100 events.",
							"Level 100 Pokemon can only gain EVs from vitamins (Carbos etc), which boost in multiples of 10.",
						];
					}
				}
			}
		},
	},
	minsourcegen: {
		effectType: 'ValidatorRule',
		name: "Min Source Gen",
		desc: "Pokemon must be obtained from this generation or later.",
		hasValue: 'positive-integer',
		onValidateRule(value) {
			const minSourceGen = parseInt(value);
			if (minSourceGen > this.dex.gen) {
				// console.log(this.ruleTable);
				throw new Error(`Invalid generation ${minSourceGen}${this.ruleTable.blame('minsourcegen')} for a Gen ${this.dex.gen} format (${this.format.name})`);
			}
		},
	},
	allowtradeback: {
		effectType: 'ValidatorRule',
		name: 'Allow Tradeback',
		desc: "Allows Gen 1 pokemon to have moves from their Gen 2 learnsets",
		// Implemented in team-validator.js
	},
	allowavs: {
		effectType: 'ValidatorRule',
		name: 'Allow AVs',
		desc: "Tells formats with the 'gen7letsgo' mod to take Awakening Values into consideration when calculating stats",
		// implemented in TeamValidator#validateStats
	},
	gemsclause: {
		effectType: 'ValidatorRule',
		name: 'Gems Clause',
		desc: "Bans all Gems",
		onValidateSet(set) {
			if (!set.item) return;
			const item = this.dex.items.get(set.item);
			if (item.isGem) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${item.name} is banned due to Gems Clause.`];
			}
		},
	},
	'sketchpostgen7moves': {
		effectType: 'ValidatorRule',
		name: 'Sketch Post-Gen 7 Moves',
		desc: "Allows Pokémon who learn Sketch to learn any Gen 8+ move (normally, Sketch is not usable in Gen 8+).",
		// Implemented in sim/team-validator.ts
	},
	overflowstatmod: {
		effectType: 'Rule',
		name: 'Overflow Stat Mod',
		desc: "Caps stats at 654 after a positive nature, or 655 after a negative nature",
		// Implemented in sim/battle.ts
	},
	eventmovesclause: {
		effectType: 'ValidatorRule',
		name: 'Event Moves Clause',
		desc: "Bans moves only obtainable through events.",
		onBegin() {
			this.add('rule', 'Event Moves Clause: Event-only moves are banned');
		},
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			const learnsetData = {...(this.dex.data.Learnsets[species.id]?.learnset || {})};
			let prevo = species.prevo;
			while (prevo) {
				const prevoSpecies = this.dex.species.get(prevo);
				const prevoLsetData = this.dex.data.Learnsets[prevoSpecies.id]?.learnset || {};
				for (const moveid in prevoLsetData) {
					if (!(moveid in learnsetData)) {
						learnsetData[moveid] = prevoLsetData[moveid];
					} else {
						learnsetData[moveid].push(...prevoLsetData[moveid]);
					}
				}
				prevo = prevoSpecies.prevo;
			}
			const problems = [];
			if (set.moves?.length) {
				for (const move of set.moves) {
					if (learnsetData[this.toID(move)] && !learnsetData[this.toID(move)].filter(v => !v.includes('S')).length) {
						problems.push(`${species.name}'s move ${move} is obtainable only through events.`);
					}
				}
			}
			if (problems.length) problems.push(`(Event-only moves are banned.)`);
			return problems;
		},
	},
	pickedteamsize: {
		effectType: 'Rule',
		name: 'Picked Team Size',
		desc: "Team size (number of pokemon) that can be brought out of Team Preview",
		hasValue: 'positive-integer',
		// hardcoded in sim/side
		onValidateRule() {
			if (!(this.ruleTable.has('teampreview') || this.ruleTable.has('teamtypepreview'))) {
				throw new Error(`The "Picked Team Size" rule${this.ruleTable.blame('pickedteamsize')} requires Team Preview.`);
			}
		},
	},
	minteamsize: {
		effectType: 'ValidatorRule',
		name: "Min Team Size",
		desc: "Minimum team size (number of pokemon) that can be brought into Team Preview (or into the battle, in formats without Team Preview)",
		hasValue: 'positive-integer',
		// hardcoded in sim/team-validator
	},
	evlimit: {
		effectType: 'ValidatorRule',
		name: "EV Limit",
		desc: "Maximum total EVs on each pokemon.",
		hasValue: 'integer',
		// hardcoded in sim/team-validator
	},
	maxteamsize: {
		effectType: 'ValidatorRule',
		name: "Max Team Size",
		desc: "Maximum team size (number of pokemon) that can be brought into Team Preview (or into the battle, in formats without Team Preview)",
		hasValue: 'positive-integer',
		// hardcoded in sim/team-validator
	},
	maxmovecount: {
		effectType: 'ValidatorRule',
		name: "Max Move Count",
		desc: "Max number of moves allowed on a single pokemon (defaults to 4 in a normal game)",
		hasValue: 'positive-integer',
		// hardcoded in sim/team-validator
	},
	maxtotallevel: {
		effectType: 'Rule',
		name: 'Max Total Level',
		desc: "Teams are restricted to a total maximum Level limit and Pokemon are restricted to a set range of Levels",
		hasValue: 'positive-integer',
		onValidateTeam(team) {
			const pickedTeamSize = this.ruleTable.pickedTeamSize || team.length;
			const maxTotalLevel = this.ruleTable.maxTotalLevel;
			if (maxTotalLevel === null) throw new Error("No maxTotalLevel specified.");

			const teamLevels = [];
			for (const set of team) {
				teamLevels.push(set.level);
			}
			teamLevels.sort((a, b) => a - b);

			let totalLowestLevels = 0;
			for (let i = 0; i < pickedTeamSize; i++) {
				totalLowestLevels += teamLevels[i];
			}
			if (totalLowestLevels > maxTotalLevel) {
				const thePokemon = pickedTeamSize === team.length ?
					`all ${team.length} Pokémon` : `the ${pickedTeamSize} lowest-leveled Pokémon`;
				return [
					`The combined levels of ${thePokemon} of your team is ${totalLowestLevels}, above the format's total level limit of ${maxTotalLevel}${this.ruleTable.blame('maxtotallevel')}.`,
				];
			}

			let minTotalWithHighestLevel = teamLevels[teamLevels.length - 1];
			for (let i = 0; i < pickedTeamSize - 1; i++) {
				minTotalWithHighestLevel += teamLevels[i];
			}
			if (minTotalWithHighestLevel > maxTotalLevel) {
				return [
					`Your highest level Pokémon is unusable, because there's no way to create a team with it whose total level is less than the format's total level limit of ${maxTotalLevel}${this.ruleTable.blame('maxtotallevel')}.`,
				];
			}
		},
		onValidateRule(value) {
			const ruleTable = this.ruleTable;
			const maxTotalLevel = ruleTable.maxTotalLevel!;
			const maxTeamSize = ruleTable.pickedTeamSize || ruleTable.maxTeamSize;
			const maxTeamSizeBlame = ruleTable.pickedTeamSize ? ruleTable.blame('pickedteamsize') : ruleTable.blame('maxteamsize');
			if (maxTotalLevel >= ruleTable.maxLevel * maxTeamSize) {
				throw new Error(`A Max Total Level of ${maxTotalLevel}${ruleTable.blame('maxtotallevel')} is too high (and will have no effect) with ${maxTeamSize}${maxTeamSizeBlame} Pokémon at max level ${ruleTable.maxLevel}${ruleTable.blame('maxlevel')}`);
			}
			if (maxTotalLevel <= ruleTable.minLevel * maxTeamSize) {
				throw new Error(`A Max Total Level of ${maxTotalLevel}${ruleTable.blame('maxtotallevel')} is too low with ${maxTeamSize}${maxTeamSizeBlame} Pokémon at min level ${ruleTable.minLevel}${ruleTable.blame('minlevel')}`);
			}
		},
		// hardcoded in sim/side
	},
	minlevel: {
		effectType: 'ValidatorRule',
		name: 'Min Level',
		desc: "Minimum level of brought Pokémon",
		hasValue: 'positive-integer',
		// hardcoded in sim/team-validator
	},
	maxlevel: {
		effectType: 'ValidatorRule',
		name: 'Max Level',
		desc: "Maximum level of brought Pokémon (if you're using both this and Adjust Level, this will control what level moves you have access to)",
		hasValue: 'positive-integer',
		// hardcoded in sim/team-validator
	},
	defaultlevel: {
		effectType: 'ValidatorRule',
		name: 'Default Level',
		desc: "Default level of brought Pokémon (normally should be equal to Max Level, except Custom Games have a very high max level but still default to 100)",
		hasValue: 'positive-integer',
		// hardcoded in sim/team-validator
	},
	adjustlevel: {
		effectType: 'ValidatorRule',
		name: 'Adjust Level',
		desc: "All Pokémon will be set to exactly this level (but unlike Max Level and Min Level, it will still be able to learn moves from above this level) (when using this, Max Level is the level of the pokemon before it's level-adjusted down)",
		hasValue: 'positive-integer',
		mutuallyExclusiveWith: 'adjustleveldown',
		// hardcoded in sim/team-validator
	},
	adjustleveldown: {
		effectType: 'ValidatorRule',
		name: 'Adjust Level Down',
		desc: "Any Pokémon above this level will be set to this level (but unlike Max Level, it will still be able to learn moves from above this level)",
		hasValue: 'positive-integer',
		mutuallyExclusiveWith: 'adjustlevel',
		// hardcoded in sim/team-validator
	},
	stadiumitemsclause: {
		effectType: 'ValidatorRule',
		name: 'Stadium Items Clause',
		desc: "Bans items that are not usable in Pokemon Stadium 2.",
		banlist: ['Fast Ball', 'Friend Ball', 'Great Ball', 'Heavy Ball', 'Level Ball', 'Love Ball', 'Lure Ball', 'Master Ball', 'Moon Ball', 'Park Ball', 'Poke Ball', 'Safari Ball', 'Ultra Ball', 'Fire Stone', 'Leaf Stone', 'Moon Stone', 'Sun Stone', 'Thunder Stone', 'Upgrade', 'Water Stone', 'Mail'],
	},
	nintendocup2000movelegality: {
		effectType: 'ValidatorRule',
		name: "Nintendo Cup 2000 Move Legality",
		desc: "Prevents Pok\u00e9mon from having moves that would only be obtainable in Pok\u00e9mon Crystal.",
		// Implemented in mods/gen2/rulesets.ts
	},
	aptclause: {
		effectType: 'ValidatorRule',
		name: 'APT Clause',
		desc: "Bans the combination of Agility and partial trapping moves like Wrap.",
		banlist: ['Agility + Wrap', 'Agility + Fire Spin', 'Agility + Bind', 'Agility + Clamp'],
	},
	nintendocup1997movelegality: {
		effectType: 'ValidatorRule',
		name: "Nintendo Cup 1997 Move Legality",
		desc: "Bans move combinations on Pok\u00e9mon that weren't legal in Nintendo Cup 1997.",
		// Implemented in mods/gen1jpn/rulesets.ts
	},
	hackmonsformelegality: {
		effectType: 'ValidatorRule',
		name: "Hackmons Forme Legality",
		desc: `Enforces proper forme legality for hackmons-based metagames.`,
		unbanlist: ['All Pokemon'],
		banlist: ['CAP', 'LGPE', 'Future'],
		onChangeSet(set, format, setHas, teamHas) {
			let species = this.dex.species.get(set.species);
			if (
				(species.natDexTier === 'Illegal' || species.forme.includes('Totem')) &&
				!['Floette-Eternal', 'Greninja-Ash', 'Xerneas-Neutral'].includes(species.name) &&
				!this.ruleTable.has(`+pokemon:${species.id}`)
			) {
				return [`${species.name} is illegal.`];
			}
			const problemPokemon = this.dex.species.all().filter(s => (
				(s.name === 'Xerneas' || s.battleOnly || s.forme === 'Eternamax') &&
					!(s.isMega || s.isPrimal || ['Greninja-Ash', 'Necrozma-Ultra'].includes(s.name)) &&
					!(this.ruleTable.has(`+pokemon:${s.id}`) || this.ruleTable.has(`+basepokemon:${this.toID(s.baseSpecies)}`))
			));
			if (problemPokemon.includes(species)) {
				if (species.requiredItem && this.toID(set.item) !== this.toID(species.requiredItem)) {
					return [`${set.name ? `${set.name} (${species.name})` : species.name} is required to hold ${species.requiredItem}.`];
				}
				if (species.requiredMove && !set.moves.map(this.toID).includes(this.toID(species.requiredMove))) {
					return [`${set.name ? `${set.name} (${species.name})` : species.name} is required to have ${species.requiredMove}.`];
				}
				set.species = (species.id === 'xerneas' ? 'Xerneas-Neutral' :
					species.id === 'zygardecomplete' ? 'Zygarde' : species.battleOnly) as string;
				species = this.dex.species.get(set.species);
			}
			for (const moveid of set.moves) {
				const move = this.dex.moves.get(moveid);
				if (move.isNonstandard && move.isNonstandard !== 'Unobtainable' && !this.ruleTable.has(`+move:${move.id}`)) {
					return [`${move.name} is illegal.`];
				}
			}
			const item = this.dex.items.get(set.item);
			if (item.isNonstandard && item.isNonstandard !== 'Unobtainable' && !this.ruleTable.has(`+item:${item.id}`)) {
				return [`${item.name} is illegal.`];
			}
			if (species.baseSpecies === 'Xerneas' && this.toID(set.ability) !== 'fairyaura') {
				return [`${set.name ? `${set.name} (${species.name})` : species.name} is ability-locked into Fairy Aura.`];
			}
		},
	},
	speciesrevealclause: {
		effectType: 'Rule',
		name: 'Species Reveal Clause',
		desc: "Reveals a Pok&eacute;mon's true species in hackmons-based metagames.",
		// Hardcoded into effect, cannot be disabled, ties into team preview
		onBegin() {
			this.add('rule', 'Species Reveal Clause: Reveals a Pok\u00e9mon\'s true species in hackmons-based metagames.');
		},
	},
};
