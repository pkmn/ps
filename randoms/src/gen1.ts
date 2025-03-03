import {RandomGen2Teams} from './gen2';
import {Utils} from './utils';
import {
	ID,
	IDEntry,
	PokemonSet,
	RandomTeamsTypes,
	Species,
	StatID,
	StatsTable,
} from '@pkmn/sim';

/* eslint-disable */
const randomDataJSON = {"bulbasaur":{"level":89,"moves":["bodyslam","razorleaf","sleeppowder","swordsdance"]},"ivysaur":{"level":80,"moves":["bodyslam","razorleaf","sleeppowder","swordsdance"]},"venusaur":{"level":74,"moves":["bodyslam","razorleaf","sleeppowder"],"exclusiveMoves":["hyperbeam","swordsdance","swordsdance"]},"charmander":{"level":90,"moves":["counter","seismictoss","seismictoss","slash","slash"],"essentialMoves":["bodyslam","fireblast"],"comboMoves":["bodyslam","fireblast","submission","swordsdance"]},"charmeleon":{"level":81,"moves":["counter","seismictoss","seismictoss","slash","slash"],"essentialMoves":["bodyslam","fireblast"],"comboMoves":["bodyslam","fireblast","submission","swordsdance"]},"charizard":{"level":74,"moves":["bodyslam","earthquake","fireblast","slash"],"comboMoves":["earthquake","fireblast","hyperbeam","swordsdance"]},"squirtle":{"level":90,"moves":["bodyslam","counter"],"essentialMoves":["blizzard","seismictoss"],"exclusiveMoves":["hydropump","surf","surf"]},"wartortle":{"level":82,"moves":["counter","rest","seismictoss"],"essentialMoves":["blizzard","bodyslam"],"exclusiveMoves":["hydropump","surf","surf"]},"blastoise":{"level":75,"moves":["earthquake","rest"],"essentialMoves":["blizzard","bodyslam"],"exclusiveMoves":["hydropump","surf","surf"]},"butterfree":{"level":77,"moves":["psychic","sleeppowder","stunspore"],"exclusiveMoves":["doubleedge","hyperbeam","megadrain","substitute"]},"beedrill":{"level":81,"moves":["hyperbeam","swordsdance","twineedle"],"exclusiveMoves":["agility","agility","megadrain"]},"pidgey":{"level":93,"moves":["agility","agility","quickattack","quickattack","skyattack"],"essentialMoves":["doubleedge"],"exclusiveMoves":["mirrormove","sandattack","substitute"],"comboMoves":["agility","doubleedge","quickattack","skyattack"]},"pidgeotto":{"level":85,"moves":["agility","agility","quickattack","quickattack","skyattack"],"essentialMoves":["doubleedge"],"exclusiveMoves":["mirrormove","sandattack","substitute"],"comboMoves":["agility","doubleedge","quickattack","skyattack"]},"pidgeot":{"level":76,"moves":["agility","doubleedge","hyperbeam"],"exclusiveMoves":["mirrormove","reflect","sandattack","skyattack","skyattack","substitute","quickattack","quickattack","quickattack"]},"rattata":{"level":89,"moves":["blizzard","bodyslam","superfang"],"exclusiveMoves":["doubleedge","thunderbolt","thunderbolt","thunderbolt","quickattack","quickattack"]},"raticate":{"level":75,"moves":["blizzard","bodyslam","hyperbeam","superfang"]},"spearow":{"level":89,"moves":["agility","doubleedge","drillpeck"],"exclusiveMoves":["leer","mimic","mirrormove","substitute"]},"fearow":{"level":75,"moves":["agility","doubleedge","drillpeck","hyperbeam"]},"ekans":{"level":90,"moves":["bodyslam","earthquake","glare","rockslide"]},"arbok":{"level":78,"moves":["earthquake","glare","hyperbeam"],"exclusiveMoves":["bodyslam","rockslide","rockslide"]},"pikachu":{"level":87,"moves":["surf","thunderbolt","thunderwave"],"exclusiveMoves":["agility","bodyslam","seismictoss","seismictoss","thunder"]},"raichu":{"level":74,"moves":["surf","thunderbolt","thunderwave"],"exclusiveMoves":["agility","bodyslam","hyperbeam","hyperbeam","seismictoss","thunder"]},"sandshrew":{"level":88,"moves":["bodyslam","earthquake","rockslide","swordsdance"]},"sandslash":{"level":76,"moves":["bodyslam","earthquake","rockslide","swordsdance"]},"nidoranf":{"level":90,"moves":["blizzard","bodyslam","thunderbolt"],"exclusiveMoves":["doubleedge","doublekick"]},"nidorina":{"level":82,"moves":["blizzard","bodyslam","thunderbolt"],"exclusiveMoves":["bubblebeam","doubleedge","doublekick"]},"nidoqueen":{"level":74,"moves":["blizzard","earthquake","thunderbolt"],"exclusiveMoves":["bodyslam","bodyslam","substitute"]},"nidoranm":{"level":90,"moves":["blizzard","bodyslam","thunderbolt"],"exclusiveMoves":["doubleedge","doublekick"]},"nidorino":{"level":82,"moves":["blizzard","bodyslam","thunderbolt"],"exclusiveMoves":["bubblebeam","doubleedge","doublekick"]},"nidoking":{"level":74,"moves":["rockslide","thunderbolt","thunderbolt"],"essentialMoves":["blizzard","earthquake"],"exclusiveMoves":["bodyslam","bodyslam","substitute"]},"clefairy":{"level":88,"moves":["bodyslam","bodyslam","seismictoss","thunderbolt"],"essentialMoves":["blizzard","thunderwave"],"exclusiveMoves":["blizzard","blizzard","counter","psychic","sing","sing"]},"clefable":{"level":74,"moves":["bodyslam","bodyslam","thunderbolt","thunderwave","thunderwave"],"essentialMoves":["blizzard"],"exclusiveMoves":["blizzard","counter","hyperbeam","hyperbeam","psychic","sing","sing"]},"vulpix":{"level":88,"moves":["bodyslam","confuseray","fireblast"],"exclusiveMoves":["flamethrower","flamethrower","quickattack","reflect","substitute","substitute"]},"ninetales":{"level":74,"moves":["bodyslam","confuseray","fireblast"],"exclusiveMoves":["flamethrower","hyperbeam","reflect","substitute","substitute"]},"jigglypuff":{"level":89,"moves":["blizzard","bodyslam"],"essentialMoves":["thunderwave","seismictoss"],"exclusiveMoves":["counter","sing","thunderwave"]},"wigglytuff":{"level":76,"moves":["blizzard","bodyslam","thunderwave"],"exclusiveMoves":["counter","hyperbeam","sing"]},"zubat":{"level":100,"moves":["confuseray","doubleedge","megadrain"],"exclusiveMoves":["substitute","substitute","wingattack"]},"golbat":{"level":78,"moves":["confuseray","doubleedge","hyperbeam","megadrain"]},"oddish":{"level":90,"moves":["doubleedge","megadrain","sleeppowder"],"exclusiveMoves":["stunspore","stunspore","swordsdance"]},"gloom":{"level":82,"moves":["doubleedge","megadrain","sleeppowder"],"exclusiveMoves":["stunspore","stunspore","swordsdance"]},"vileplume":{"level":76,"moves":["bodyslam","megadrain","sleeppowder"],"exclusiveMoves":["stunspore","stunspore","swordsdance"]},"paras":{"level":90,"moves":["bodyslam","megadrain","spore"],"exclusiveMoves":["stunspore","stunspore","swordsdance"]},"parasect":{"level":77,"moves":["bodyslam","megadrain","spore"],"exclusiveMoves":["hyperbeam","slash","stunspore","stunspore","stunspore","swordsdance","swordsdance"]},"venonat":{"level":88,"moves":["psychic","sleeppowder","stunspore"],"exclusiveMoves":["doubleedge","megadrain"]},"venomoth":{"level":74,"moves":["psychic","sleeppowder","stunspore"],"exclusiveMoves":["doubleedge","megadrain"]},"diglett":{"level":86,"moves":["earthquake","rockslide","slash"],"exclusiveMoves":["bodyslam","substitute"]},"dugtrio":{"level":73,"moves":["earthquake","rockslide","slash"],"exclusiveMoves":["bodyslam","substitute"]},"meowth":{"level":85,"moves":["bodyslam","bubblebeam","slash","thunderbolt"]},"persian":{"level":73,"moves":["bodyslam","bubblebeam","slash"],"exclusiveMoves":["hyperbeam","thunderbolt"]},"psyduck":{"level":89,"moves":["amnesia","blizzard","surf"],"exclusiveMoves":["bodyslam","hydropump","rest","seismictoss","seismictoss"]},"golduck":{"level":75,"moves":["amnesia","blizzard","surf"],"exclusiveMoves":["bodyslam","hydropump","rest","rest","seismictoss"]},"mankey":{"level":89,"moves":["bodyslam","rockslide","submission"],"exclusiveMoves":["counter","lowkick","megakick"]},"primeape":{"level":76,"moves":["rockslide","rockslide","rockslide","thunderbolt"],"essentialMoves":["bodyslam","submission"],"exclusiveMoves":["counter","lowkick","hyperbeam","hyperbeam"]},"growlithe":{"level":89,"moves":["agility","bodyslam","fireblast"],"exclusiveMoves":["flamethrower","reflect"]},"arcanine":{"level":75,"moves":["bodyslam","fireblast","hyperbeam"],"exclusiveMoves":["agility","agility","flamethrower","flamethrower","reflect","rest"]},"poliwag":{"level":86,"moves":["amnesia","blizzard","hypnosis","surf"]},"poliwhirl":{"level":79,"moves":["amnesia","blizzard","hypnosis","surf"]},"poliwrath":{"level":74,"moves":["bodyslam","earthquake","hypnosis","submission"],"essentialMoves":["blizzard","surf"],"comboMoves":["amnesia","blizzard","hypnosis","surf"]},"abra":{"level":84,"moves":["psychic","seismictoss","thunderwave"],"exclusiveMoves":["counter","reflect","substitute"]},"kadabra":{"level":74,"moves":["psychic","recover","thunderwave"],"exclusiveMoves":["counter","reflect","reflect","seismictoss","seismictoss"]},"alakazam":{"level":68,"moves":["psychic","recover","thunderwave"],"exclusiveMoves":["counter","reflect","reflect","seismictoss","seismictoss"]},"machop":{"level":89,"moves":["bodyslam","earthquake","submission"],"exclusiveMoves":["counter","rockslide","rockslide"]},"machoke":{"level":81,"moves":["bodyslam","earthquake","submission"],"exclusiveMoves":["counter","rockslide","rockslide"]},"machamp":{"level":76,"moves":["bodyslam","earthquake","submission"],"exclusiveMoves":["counter","hyperbeam","hyperbeam","rockslide","rockslide"]},"bellsprout":{"level":88,"moves":["doubleedge","razorleaf","sleeppowder"],"exclusiveMoves":["stunspore","stunspore","swordsdance"]},"weepinbell":{"level":80,"moves":["doubleedge","razorleaf","sleeppowder"],"exclusiveMoves":["stunspore","stunspore","swordsdance"]},"victreebel":{"level":74,"moves":["bodyslam","razorleaf","sleeppowder"],"exclusiveMoves":["hyperbeam","stunspore","stunspore","stunspore","swordsdance","swordsdance"]},"tentacool":{"level":86,"moves":["blizzard","megadrain","surf"],"exclusiveMoves":["barrier","hydropump","hydropump"]},"tentacruel":{"level":73,"moves":["blizzard","hyperbeam","swordsdance"],"exclusiveMoves":["hydropump","surf","surf"]},"geodude":{"level":88,"moves":["bodyslam","earthquake","explosion","rockslide"]},"graveler":{"level":80,"moves":["bodyslam","earthquake","explosion","rockslide"]},"golem":{"level":71,"moves":["bodyslam","earthquake","explosion","rockslide"]},"ponyta":{"level":84,"moves":["agility","bodyslam","fireblast"],"exclusiveMoves":["reflect","reflect","reflect","stomp","substitute","substitute"]},"rapidash":{"level":75,"moves":["agility","bodyslam","fireblast","hyperbeam"]},"slowpoke":{"level":84,"moves":["blizzard","psychic","surf"],"essentialMoves":["amnesia","thunderwave"],"comboMoves":["amnesia","rest","surf","thunderwave"]},"slowbro":{"level":68,"moves":["blizzard","psychic","surf"],"essentialMoves":["amnesia","thunderwave"],"comboMoves":["amnesia","rest","surf","thunderwave"]},"magnemite":{"level":88,"moves":["thunder","thunderbolt","thunderwave"],"exclusiveMoves":["doubleedge","doubleedge","mimic","rest"]},"magneton":{"level":76,"moves":["thunder","thunderbolt","thunderwave"],"exclusiveMoves":["doubleedge","hyperbeam","hyperbeam","mimic","rest"]},"farfetchd":{"level":78,"moves":["agility","bodyslam","slash","swordsdance"]},"doduo":{"level":87,"moves":["agility","bodyslam","doubleedge","drillpeck"]},"dodrio":{"level":73,"moves":["agility","bodyslam","drillpeck","hyperbeam"]},"seel":{"level":88,"moves":["blizzard","bodyslam","rest","surf"]},"dewgong":{"level":74,"moves":["blizzard","bodyslam","surf"],"exclusiveMoves":["hyperbeam","rest","rest","rest"]},"grimer":{"level":90,"moves":["fireblast","fireblast","megadrain","sludge","sludge","sludge","thunderbolt"],"essentialMoves":["bodyslam","explosion"]},"muk":{"level":76,"moves":["fireblast","fireblast","hyperbeam","megadrain","megadrain","sludge","sludge","sludge","thunderbolt"],"essentialMoves":["bodyslam","explosion"]},"shellder":{"level":90,"moves":["blizzard","doubleedge","explosion","surf"]},"cloyster":{"level":70,"moves":["blizzard","explosion","surf"],"exclusiveMoves":["doubleedge","hyperbeam","hyperbeam"]},"gastly":{"level":83,"moves":["explosion","explosion","megadrain","nightshade","psychic","psychic"],"essentialMoves":["thunderbolt","hypnosis"]},"haunter":{"level":74,"moves":["explosion","explosion","megadrain","nightshade","psychic","psychic"],"essentialMoves":["thunderbolt","hypnosis"]},"gengar":{"level":68,"moves":["explosion","explosion","megadrain","nightshade","psychic","psychic"],"essentialMoves":["thunderbolt","hypnosis"]},"onix":{"level":80,"moves":["bodyslam","earthquake","explosion","rockslide"]},"drowzee":{"level":84,"moves":["hypnosis","psychic","thunderwave"],"exclusiveMoves":["counter","rest","seismictoss","seismictoss"]},"hypno":{"level":72,"moves":["hypnosis","psychic","thunderwave"],"exclusiveMoves":["counter","rest","rest","seismictoss","seismictoss"]},"krabby":{"level":89,"moves":["bodyslam","crabhammer","swordsdance"],"exclusiveMoves":["blizzard","blizzard","blizzard","stomp"]},"kingler":{"level":76,"moves":["bodyslam","crabhammer","hyperbeam","swordsdance"]},"voltorb":{"level":88,"moves":["explosion","thunderbolt","thunderwave"],"exclusiveMoves":["takedown","thunder"]},"electrode":{"level":76,"moves":["explosion","thunderbolt","thunderwave"],"exclusiveMoves":["hyperbeam","hyperbeam","takedown","thunder","thunder"]},"exeggcute":{"level":84,"moves":["explosion","psychic","sleeppowder","stunspore"]},"exeggutor":{"level":68,"moves":["explosion","psychic","sleeppowder"],"exclusiveMoves":["doubleedge","hyperbeam","megadrain","stunspore","stunspore","stunspore"]},"cubone":{"level":89,"moves":["blizzard","bodyslam","earthquake","seismictoss"]},"marowak":{"level":79,"moves":["blizzard","bodyslam","earthquake","seismictoss"]},"hitmonlee":{"level":78,"moves":["bodyslam","highjumpkick","seismictoss"],"exclusiveMoves":["counter","counter","meditate","megakick","rollingkick"]},"hitmonchan":{"level":80,"moves":["bodyslam","seismictoss","submission"],"exclusiveMoves":["agility","agility","counter","counter","megakick"]},"lickitung":{"level":78,"moves":["bodyslam","hyperbeam","swordsdance"],"exclusiveMoves":["blizzard","earthquake","earthquake","earthquake"]},"koffing":{"level":90,"moves":["explosion","fireblast","sludge","thunderbolt"]},"weezing":{"level":76,"moves":["explosion","fireblast","sludge","thunderbolt"]},"rhyhorn":{"level":84,"moves":["bodyslam","earthquake","rockslide","substitute"]},"rhydon":{"level":68,"moves":["bodyslam","earthquake","rockslide","substitute"]},"chansey":{"level":68,"moves":["icebeam","softboiled","thunderwave"],"exclusiveMoves":["counter","reflect","seismictoss","sing","thunderbolt","thunderbolt","thunderbolt"]},"tangela":{"level":74,"moves":["bodyslam","megadrain","sleeppowder"],"exclusiveMoves":["growth","stunspore","stunspore","stunspore","swordsdance","swordsdance"]},"kangaskhan":{"level":73,"moves":["bodyslam","earthquake","hyperbeam"],"exclusiveMoves":["counter","rockslide","rockslide","surf"]},"horsea":{"level":88,"moves":["agility","blizzard","surf"],"exclusiveMoves":["doubleedge","hydropump","smokescreen"]},"seadra":{"level":77,"moves":["agility","blizzard","surf"],"exclusiveMoves":["doubleedge","hydropump","hyperbeam","smokescreen"]},"goldeen":{"level":88,"moves":["agility","blizzard","doubleedge","surf"]},"seaking":{"level":78,"moves":["agility","doubleedge","hyperbeam"],"essentialMoves":["blizzard","surf"]},"staryu":{"level":84,"moves":["blizzard","thunderbolt","thunderwave"],"essentialMoves":["recover"],"exclusiveMoves":["hydropump","surf","surf"]},"starmie":{"level":68,"moves":["blizzard","psychic","thunderbolt","thunderwave","thunderwave"],"essentialMoves":["recover"],"exclusiveMoves":["hydropump","psychic","surf","surf"]},"mrmime":{"level":75,"moves":["psychic","seismictoss","thunderbolt","thunderwave"]},"scyther":{"level":75,"moves":["agility","hyperbeam","slash","swordsdance"]},"jynx":{"level":68,"moves":["blizzard","lovelykiss","psychic"],"exclusiveMoves":["bodyslam","counter","counter","seismictoss","substitute"]},"electabuzz":{"level":74,"moves":["psychic","thunderbolt","thunderwave"],"exclusiveMoves":["hyperbeam","seismictoss","seismictoss","seismictoss"]},"magmar":{"level":76,"moves":["bodyslam","confuseray","fireblast"],"exclusiveMoves":["hyperbeam","psychic","seismictoss"]},"pinsir":{"level":75,"moves":["bodyslam","bodyslam","slash"],"essentialMoves":["hyperbeam","swordsdance"],"exclusiveMoves":["seismictoss","submission","submission"]},"tauros":{"level":68,"moves":["bodyslam","earthquake","hyperbeam"],"exclusiveMoves":["blizzard","blizzard","blizzard","thunderbolt"]},"gyarados":{"level":74,"moves":["blizzard","bodyslam","bodyslam","hyperbeam","thunderbolt"],"exclusiveMoves":["hydropump","surf","surf"]},"lapras":{"level":69,"moves":["bodyslam","rest","sing","surf"],"essentialMoves":["blizzard","thunderbolt"]},"ditto":{"level":100,"moves":["transform"]},"eevee":{"level":88,"moves":["doubleedge","doubleedge","quickattack","quickattack","reflect"],"essentialMoves":["bodyslam"],"exclusiveMoves":["sandattack","tailwhip"]},"vaporeon":{"level":74,"moves":["blizzard","rest","surf"],"exclusiveMoves":["acidarmor","bodyslam","bodyslam","bodyslam","hydropump","mimic"]},"jolteon":{"level":69,"moves":["bodyslam","thunderbolt","thunderwave"],"exclusiveMoves":["agility","agility","doublekick","pinmissile","pinmissile"]},"flareon":{"level":76,"moves":["bodyslam","fireblast","hyperbeam","quickattack"]},"porygon":{"level":76,"moves":["blizzard","recover","thunderwave"],"exclusiveMoves":["doubleedge","psychic","thunderbolt","triattack"]},"omanyte":{"level":87,"moves":["blizzard","bodyslam","rest"],"exclusiveMoves":["hydropump","surf"]},"omastar":{"level":74,"moves":["bodyslam","rest","seismictoss"],"essentialMoves":["blizzard"],"exclusiveMoves":["hydropump","surf"]},"kabuto":{"level":88,"moves":["blizzard","bodyslam","slash"],"exclusiveMoves":["hydropump","surf","surf"]},"kabutops":{"level":75,"moves":["hyperbeam","surf","swordsdance"],"exclusiveMoves":["bodyslam","slash"]},"aerodactyl":{"level":75,"moves":["doubleedge","fireblast","hyperbeam"],"exclusiveMoves":["agility","skyattack","skyattack"]},"snorlax":{"level":69,"moves":["amnesia","blizzard","bodyslam"],"exclusiveMoves":["rest","selfdestruct"],"comboMoves":["bodyslam","earthquake","hyperbeam","selfdestruct"]},"articuno":{"level":70,"moves":["agility","blizzard","hyperbeam"],"exclusiveMoves":["icebeam","mimic","reflect"],"comboMoves":["blizzard","icebeam","reflect","rest"]},"zapdos":{"level":68,"moves":["agility","drillpeck","thunderbolt","thunderwave"]},"moltres":{"level":73,"moves":["agility","fireblast","hyperbeam"],"exclusiveMoves":["doubleedge","doubleedge","doubleedge","reflect"]},"dratini":{"level":89,"moves":["bodyslam","hyperbeam","thunderbolt","thunderbolt"],"essentialMoves":["blizzard","thunderwave"]},"dragonair":{"level":80,"moves":["bodyslam","hyperbeam","thunderbolt","thunderbolt"],"essentialMoves":["blizzard","thunderwave"]},"dragonite":{"level":74,"moves":["bodyslam","hyperbeam","thunderbolt","thunderwave","thunderwave"],"essentialMoves":["blizzard"]},"mewtwo":{"level":60,"moves":["amnesia","psychic","recover"],"exclusiveMoves":["blizzard","thunderbolt","thunderwave","thunderwave"]},"mew":{"level":64,"moves":["blizzard","blizzard","earthquake","explosion","explosion","thunderbolt"],"essentialMoves":["psychic","softboiled","thunderwave"]}} as any;
/* eslint-enable */

interface HackmonsCupEntry {
	types: string[];
	baseStats: StatsTable;
}

interface Gen1RandomBattleSpecies {
	level?: number;
	moves?: ID[];
	essentialMoves?: ID[];
	exclusiveMoves?: ID[];
	comboMoves?: ID[];
}

export class RandomGen1Teams extends RandomGen2Teams {
	override randomData: { [species: IDEntry]: Gen1RandomBattleSpecies } = randomDataJSON;

	// Challenge Cup or CC teams are basically fully random teams.
	override randomCCTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const team = [];

		const randomN = this.randomNPokemon(this.maxTeamSize, this.forceMonotype);

		for (const pokemon of randomN) {
			const species = this.dex.species.get(pokemon);

			// Level balance: calculate directly from stats rather than using some silly lookup table.
			const mbstmin = 1307;
			const stats = species.baseStats;

			// Modified base stat total assumes 15 DVs, 255 EVs in every stat
			let mbst = (stats["hp"] * 2 + 30 + 63 + 100) + 10;
			mbst += (stats["atk"] * 2 + 30 + 63 + 100) + 5;
			mbst += (stats["def"] * 2 + 30 + 63 + 100) + 5;
			mbst += (stats["spa"] * 2 + 30 + 63 + 100) + 5;
			mbst += (stats["spd"] * 2 + 30 + 63 + 100) + 5;
			mbst += (stats["spe"] * 2 + 30 + 63 + 100) + 5;

			let level;
			if (this.adjustLevel) {
				level = this.adjustLevel;
			} else {
				level = Math.floor(100 * mbstmin / mbst); // Initial level guess will underestimate

				while (level < 100) {
					mbst = Math.floor((stats["hp"] * 2 + 30 + 63 + 100) * level / 100 + 10);
					// Since damage is roughly proportional to lvl
					mbst += Math.floor(((stats["atk"] * 2 + 30 + 63 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats["def"] * 2 + 30 + 63 + 100) * level / 100 + 5);
					mbst += Math.floor(((stats["spa"] * 2 + 30 + 63 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats["spd"] * 2 + 30 + 63 + 100) * level / 100 + 5);
					mbst += Math.floor((stats["spe"] * 2 + 30 + 63 + 100) * level / 100 + 5);

					if (mbst >= mbstmin) break;
					level++;
				}
			}

			// Random DVs.
			const ivs = {
				hp: 0,
				atk: this.random(16),
				def: this.random(16),
				spa: this.random(16),
				spd: 0,
				spe: this.random(16),
			};
			ivs["hp"] = (ivs["atk"] % 2) * 16 + (ivs["def"] % 2) * 8 + (ivs["spe"] % 2) * 4 + (ivs["spa"] % 2) * 2;
			ivs["atk"] *= 2;
			ivs["def"] *= 2;
			ivs["spa"] *= 2;
			ivs["spd"] = ivs["spa"];
			ivs["spe"] *= 2;

			// Maxed EVs.
			const evs = { hp: 255, atk: 255, def: 255, spa: 255, spd: 255, spe: 255 };

			// Four random unique moves from movepool. don't worry about "attacking" or "viable".
			// Since Gens 1 and 2 learnsets are shared, we need to weed out Gen 2 moves.
			const pool = [...this.dex.species.getMovePool(species.id)];

			team.push({
				name: species.baseSpecies,
				species: species.name,
				moves: this.multipleSamplesNoReplace(pool, 4),
				gender: false,
				ability: 'No Ability',
				evs,
				ivs,
				item: '',
				level,
				happiness: 0,
				shiny: false,
				nature: 'Serious',
			});
		}

		return team;
	}

	// Random team generation for Gen 1 Random Battles.
	override randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		// Get what we need ready.
		const seed = this.prng.getSeed();
		const ruleTable = this.dex.formats.getRuleTable(this.format);
		const pokemon: RandomTeamsTypes.RandomSet[] = [];

		// For Monotype
		const isMonotype = !!this.forceMonotype || ruleTable.has('sametypeclause');
		const typePool = this.dex.types.names();
		const type = this.forceMonotype || this.sample(typePool);

		/** Pokémon that are not wholly incompatible with the team, but still pretty bad */
		const rejectedButNotInvalidPool: string[] = [];

		// Now let's store what we are getting.
		const typeCount: { [k: string]: number } = {};
		const weaknessCount: { [k: string]: number } = { Electric: 0, Psychic: 0, Water: 0, Ice: 0, Ground: 0, Fire: 0 };
		let numMaxLevelPokemon = 0;

		const pokemonPool = Object.keys(this.getPokemonPool(type, pokemon, isMonotype, Object.keys(this.randomData))[0]);
		while (pokemonPool.length && pokemon.length < this.maxTeamSize) {
			const species = this.dex.species.get(this.sampleNoReplace(pokemonPool));
			if (!species.exists) continue;

			// Only one Ditto is allowed per battle in Generation 1,
			// as it can cause an endless battle if two Dittos are forced
			// to face each other.
			if (species.id === 'ditto' && this.battleHasDitto) continue;

			// Dynamically scale limits for different team sizes. The default and minimum value is 1.
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

			let skip = false;

			if (!isMonotype && !this.forceMonotype) {
				// Limit two of any type
				for (const typeName of species.types) {
					if (typeCount[typeName] >= 2 * limitFactor) {
						skip = true;
						break;
					}
				}

				if (skip) {
					rejectedButNotInvalidPool.push(species.id);
					continue;
				}
			}

			// We need a weakness count of spammable attacks to avoid being swept by those.
			// Spammable attacks are: Thunderbolt, Psychic, Surf, Blizzard, Earthquake, Fire Blast.
			const pokemonWeaknesses = [];
			for (const typeName in weaknessCount) {
				const increaseCount = this.dex.getImmunity(typeName, species) && this.dex.getEffectiveness(typeName, species) > 0;
				if (!increaseCount) continue;
				if (weaknessCount[typeName] >= 2 * limitFactor) {
					skip = true;
					break;
				}
				pokemonWeaknesses.push(typeName);
			}

			if (skip) {
				rejectedButNotInvalidPool.push(species.id);
				continue;
			}

			// Limit one level 100 Pokemon
			if (!this.adjustLevel && (this.getLevel(species) === 100) && numMaxLevelPokemon >= limitFactor) {
				rejectedButNotInvalidPool.push(species.id);
				continue;
			}

			// The set passes the limitations.
			pokemon.push(this.randomSet(species));

			// Now let's increase the counters.
			// Type counter.
			for (const typeName of species.types) {
				if (typeCount[typeName]) {
					typeCount[typeName]++;
				} else {
					typeCount[typeName] = 1;
				}
			}

			// Weakness counter.
			for (const weakness of pokemonWeaknesses) {
				weaknessCount[weakness]++;
			}

			// Increment level 100 counter
			if (this.getLevel(species) === 100) numMaxLevelPokemon++;

			// Ditto check
			if (species.id === 'ditto') this.battleHasDitto = true;
		}

		// if we don't have enough Pokémon, go back to rejects, which are already known to not be invalid.
		while (pokemon.length < this.maxTeamSize && rejectedButNotInvalidPool.length) {
			const species = this.sampleNoReplace(rejectedButNotInvalidPool);
			pokemon.push(this.randomSet(species));
		}

		if (pokemon.length < this.maxTeamSize && pokemon.length < 12 && !isMonotype) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}

		return pokemon;
	}

	/**
	 * Random set generation for Gen 1 Random Battles.
	 */
	override randomSet(species: string | Species): RandomTeamsTypes.RandomSet {
		species = this.dex.species.get(species);
		if (!species.exists) species = this.dex.species.get('pikachu'); // Because Gen 1.

		const data = this.randomData[species.id];
		const movePool = data.moves?.slice() || [];
		const moves = new Set<string>();

		// Either add all moves or add none
		if (data.comboMoves && data.comboMoves.length <= this.maxMoveCount && this.randomChance(1, 2)) {
			for (const m of data.comboMoves) moves.add(m);
		}

		// Add one of the semi-mandatory moves
		// Often, these are used so that the Pokemon only gets one of the less useful moves
		// This is added before the essential moves so that combos containing three moves can roll an exclusive move
		if (moves.size < this.maxMoveCount && data.exclusiveMoves) {
			moves.add(this.sample(data.exclusiveMoves));
		}

		// Add the mandatory moves.
		if (moves.size < this.maxMoveCount && data.essentialMoves) {
			for (const moveid of data.essentialMoves) {
				moves.add(moveid);
				if (moves.size === this.maxMoveCount) break;
			}
		}

		while (moves.size < this.maxMoveCount && movePool.length) {
			// Choose next 4 moves from learnset/viable moves and add them to moves list:
			while (moves.size < this.maxMoveCount && movePool.length) {
				const moveid = this.sampleNoReplace(movePool);
				moves.add(moveid);
			}
		}

		const level = this.getLevel(species);

		const evs = { hp: 255, atk: 255, def: 255, spa: 255, spd: 255, spe: 255 };
		const ivs = { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30 };

		// Should be able to use Substitute four times from full HP without fainting
		if (moves.has('substitute')) {
			while (evs.hp > 3) {
				const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
				if (hp % 4 !== 0) break;
				evs.hp -= 4;
			}
		}

		// Minimize confusion damage
		const noAttackStatMoves = [...moves].every(m => {
			const move = this.dex.moves.get(m);
			if (move.damageCallback || move.damage) return true;
			return move.category !== 'Physical';
		});
		if (noAttackStatMoves && !moves.has('mimic') && !moves.has('transform')) {
			evs.atk = 0;
			// We don't want to lower the HP DV/IV
			ivs.atk = 2;
		}

		// shuffle moves to add more randomness to camomons
		const shuffledMoves = Array.from(moves);
		this.prng.shuffle(shuffledMoves);

		return {
			name: species.name,
			species: species.name,
			moves: shuffledMoves,
			ability: 'No Ability',
			evs,
			ivs,
			item: '',
			level,
			shiny: false,
			gender: false,
		};
	}

	override randomHCTeam(): PokemonSet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const team = [];

		const movePool = [...this.dex.moves.all()];
		const typesPool = ['Bird', ...this.dex.types.names()];

		const randomN = this.randomNPokemon(this.maxTeamSize);
		const hackmonsCup: { [k: string]: HackmonsCupEntry } = {};

		for (const forme of randomN) {
			// Choose forme
			const species = this.dex.species.get(forme);
			if (!hackmonsCup[species.id]) {
				hackmonsCup[species.id] = {
					types: [this.sample(typesPool), this.sample(typesPool)],
					baseStats: {
						hp: Utils.clampIntRange(this.random(256), 1),
						atk: Utils.clampIntRange(this.random(256), 1),
						def: Utils.clampIntRange(this.random(256), 1),
						spa: Utils.clampIntRange(this.random(256), 1),
						spd: 0,
						spe: Utils.clampIntRange(this.random(256), 1),
					},
				};
				if (this.forceMonotype && !hackmonsCup[species.id].types.includes(this.forceMonotype)) {
					hackmonsCup[species.id].types[1] = this.forceMonotype;
				}
				hackmonsCup[species.id].baseStats.spd = hackmonsCup[species.id].baseStats.spa;
			}
			if (hackmonsCup[species.id].types[0] === hackmonsCup[species.id].types[1]) {
				hackmonsCup[species.id].types.splice(1, 1);
			}

			// Random unique moves
			const moves = [];
			do {
				const move = this.sampleNoReplace(movePool);
				if (move.gen <= this.gen && !move.isNonstandard && !move.name.startsWith('Hidden Power ')) {
					moves.push(move.id);
				}
			} while (moves.length < this.maxMoveCount);

			// Random EVs
			const evs = {
				hp: this.random(256),
				atk: this.random(256),
				def: this.random(256),
				spa: this.random(256),
				spd: 0,
				spe: this.random(256),
			};
			evs['spd'] = evs['spa'];

			// Random DVs
			const ivs: StatsTable = {
				hp: 0,
				atk: this.random(16),
				def: this.random(16),
				spa: this.random(16),
				spd: 0,
				spe: this.random(16),
			};
			ivs["hp"] = (ivs["atk"] % 2) * 16 + (ivs["def"] % 2) * 8 + (ivs["spe"] % 2) * 4 + (ivs["spa"] % 2) * 2;
			for (const iv in ivs) {
				if (iv === 'hp' || iv === 'spd') continue;
				ivs[iv as keyof StatsTable] *= 2;
			}
			ivs['spd'] = ivs['spa'];

			// Level balance
			const mbstmin = 425;
			const baseStats = hackmonsCup[species.id].baseStats;
			const calcStat = (statName: StatID, lvl?: number) => {
				if (lvl) {
					return Math.floor(Math.floor(2 * baseStats[statName] + ivs[statName] + Math.floor(evs[statName] / 4)) * lvl / 100 + 5);
				}
				return Math.floor(2 * baseStats[statName] + ivs[statName] + Math.floor(evs[statName] / 4)) + 5;
			};
			let mbst = 0;
			for (const statName of Object.keys(baseStats)) {
				mbst += calcStat(statName as StatID);
				if (statName === 'hp') mbst += 5;
			}
			let level;
			if (this.adjustLevel) {
				level = this.adjustLevel;
			} else {
				level = Math.floor(100 * mbstmin / mbst);
				while (level < 100) {
					for (const statName of Object.keys(baseStats)) {
						mbst += calcStat(statName as StatID, level);
						if (statName === 'hp') mbst += 5;
					}
					if (mbst >= mbstmin) break;
					level++;
				}
				if (level > 100) level = 100;
			}

			team.push({
				name: species.baseSpecies,
				species: species.name,
				gender: species.gender,
				item: '',
				ability: 'No Ability',
				moves,
				evs,
				ivs,
				nature: '',
				level,
				shiny: false,
				// Hacky but the only way to communicate stats/level generation properly
				hc: hackmonsCup[species.id],
			});
		}

		return team;
	}
}

export default RandomGen1Teams;
