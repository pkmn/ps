import {MoveCounter, OldRandomBattleSpecies} from './gen8';
import {RandomGen3Teams} from './gen3';
import {
	Format,
	ModdedDex,
	Move,
	PRNG,
	PRNGSeed,
	RandomTeamsTypes,
	Species,
} from '@pkmn/sim';

/* eslint-disable */
const randomDataJSON = {"venusaur":{"moves":["growth","hiddenpowerfire","hiddenpowerice","leechseed","razorleaf","sleeppowder","synthesis"]},"charizard":{"moves":["bellydrum","earthquake","fireblast","hyperbeam","rockslide"]},"blastoise":{"moves":["icebeam","rapidspin","rest","sleeptalk","surf","toxic","zapcannon"]},"butterfree":{"moves":["nightmare","psychic","sleeppowder","stunspore","substitute"]},"beedrill":{"moves":["agility","hiddenpowerground","sludgebomb","substitute","swordsdance"]},"pidgeot":{"moves":["curse","hiddenpowerground","reflect","rest","return","sleeptalk","toxic","whirlwind"]},"raticate":{"moves":["irontail","rest","return","sleeptalk","superfang"]},"fearow":{"moves":["doubleedge","drillpeck","hiddenpowerground","rest","sleeptalk","substitute"]},"arbok":{"moves":["curse","earthquake","glare","haze","rest","sludgebomb"]},"pikachu":{"moves":["encore","hiddenpowerice","substitute","surf","thunderbolt"]},"raichu":{"moves":["encore","hiddenpowerice","rest","sleeptalk","surf","thunder","thunderbolt"]},"sandslash":{"moves":["earthquake","hiddenpowerbug","rockslide","substitute","swordsdance"]},"nidoqueen":{"moves":["earthquake","fireblast","icebeam","lovelykiss","moonlight","thunder"]},"nidoking":{"moves":["earthquake","fireblast","icebeam","lovelykiss","morningsun","thunder"]},"clefable":{"moves":["bellydrum","encore","fireblast","moonlight","return","shadowball"]},"ninetales":{"moves":["fireblast","hiddenpowergrass","rest","sleeptalk","toxic"]},"wigglytuff":{"moves":["bodyslam","charm","curse","doubleedge","fireblast","rest","sleeptalk","thunderwave"]},"vileplume":{"moves":["hiddenpowergrass","moonlight","sleeppowder","sludgebomb","stunspore","swordsdance"]},"parasect":{"moves":["bodyslam","gigadrain","hiddenpowerbug","spore","swordsdance","synthesis"]},"venomoth":{"moves":["disable","gigadrain","psychic","sleeppowder","sludgebomb","stunspore"]},"dugtrio":{"moves":["earthquake","rockslide","sludgebomb","substitute","swagger"]},"persian":{"moves":["bodyslam","hypnosis","irontail","rest","return","thunder"]},"golduck":{"moves":["crosschop","hiddenpowerelectric","hydropump","hypnosis","icebeam","psychic","surf"]},"primeape":{"moves":["crosschop","doubleedge","hiddenpowerghost","meditate","rest","rockslide","substitute"]},"arcanine":{"moves":["bodyslam","crunch","extremespeed","fireblast","hiddenpowergrass","rest","sleeptalk"]},"poliwrath":{"moves":["bellydrum","bodyslam","earthquake","lovelykiss"]},"alakazam":{"moves":["encore","firepunch","icepunch","psychic","recover","thunderpunch","thunderwave"]},"machamp":{"moves":["bodyslam","crosschop","curse","earthquake","hiddenpowerghost","rest","rockslide","sleeptalk"]},"victreebel":{"moves":["hiddenpowerground","razorleaf","sleeppowder","sludgebomb","swordsdance","synthesis"]},"tentacruel":{"moves":["hydropump","sludgebomb","substitute","swordsdance"]},"golem":{"moves":["curse","earthquake","explosion","fireblast","rapidspin","rockslide"]},"rapidash":{"moves":["bodyslam","fireblast","hiddenpowergrass","hypnosis","sunnyday"]},"slowbro":{"moves":["flamethrower","icebeam","psychic","rest","sleeptalk","surf","thunderwave"]},"magneton":{"moves":["hiddenpowerice","rest","sleeptalk","thunderbolt"]},"farfetchd":{"moves":["agility","batonpass","return","swordsdance"]},"dodrio":{"moves":["doubleedge","drillpeck","hiddenpowerground","rest","substitute"]},"dewgong":{"moves":["encore","icebeam","rest","sleeptalk","surf","toxic"]},"muk":{"moves":["curse","explosion","fireblast","hiddenpowerground","sludgebomb"]},"cloyster":{"moves":["explosion","icebeam","spikes","surf","toxic"]},"gengar":{"moves":["destinybond","explosion","firepunch","hypnosis","icepunch","thunderbolt"]},"hypno":{"moves":["psychic","rest","seismictoss","sleeptalk","thunderwave","toxic"]},"kingler":{"moves":["hiddenpowerground","rest","return","surf","swordsdance"]},"electrode":{"moves":["explosion","hiddenpowerice","lightscreen","reflect","thunderbolt","thunderwave"]},"exeggutor":{"moves":["explosion","gigadrain","hiddenpowerfire","psychic","sleeppowder","stunspore","synthesis"]},"marowak":{"moves":["earthquake","hiddenpowerbug","rockslide","swordsdance"]},"hitmonlee":{"moves":["bodyslam","hiddenpowerghost","highjumpkick","meditate","rest"]},"hitmonchan":{"moves":["bodyslam","counter","curse","hiddenpowerghost","highjumpkick"]},"lickitung":{"moves":["bodyslam","earthquake","fireblast","rest","sleeptalk","swordsdance"]},"weezing":{"moves":["explosion","fireblast","hiddenpowerice","painsplit","sludgebomb","thunder"]},"rhydon":{"moves":["curse","earthquake","rest","roar","rockslide","sleeptalk"]},"tangela":{"moves":["gigadrain","growth","hiddenpowerice","sleeppowder","synthesis"]},"kangaskhan":{"moves":["bodyslam","curse","earthquake","rest","return","roar","sleeptalk"]},"seaking":{"moves":["agility","return","substitute","surf","swordsdance"]},"starmie":{"moves":["psychic","rapidspin","recover","surf","thunderbolt","thunderwave"]},"mrmime":{"moves":["encore","firepunch","hypnosis","icepunch","psychic","thief","thunderbolt","thunderwave"]},"scyther":{"moves":["batonpass","hiddenpowerbug","hiddenpowerground","swordsdance","wingattack"]},"jynx":{"moves":["icebeam","lovelykiss","nightmare","psychic","substitute","thief"]},"electabuzz":{"moves":["crosschop","icepunch","psychic","pursuit","thunder","thunderbolt"]},"magmar":{"moves":["crosschop","fireblast","hiddenpowerground","sunnyday","thief","thunderpunch"]},"pinsir":{"moves":["bodyslam","doubleedge","hiddenpowerbug","rest","submission","swordsdance"]},"tauros":{"moves":["curse","doubleedge","earthquake","rest","return","sleeptalk"]},"gyarados":{"moves":["bodyslam","doubleedge","hiddenpowerflying","hydropump","rest","sleeptalk","thunder"]},"lapras":{"moves":["icebeam","rest","sleeptalk","surf","thunderbolt","toxic"]},"ditto":{"level":83,"moves":["transform"]},"vaporeon":{"moves":["growth","hiddenpowerelectric","icebeam","rest","sleeptalk","surf"]},"jolteon":{"moves":["batonpass","growth","hiddenpowerice","substitute","thunderbolt","thunderwave"]},"flareon":{"moves":["batonpass","doubleedge","fireblast","growth","hiddenpowergrass"]},"omastar":{"moves":["hiddenpowerelectric","icebeam","rest","sleeptalk","surf"]},"kabutops":{"moves":["ancientpower","hiddenpowerground","return","submission","surf","swordsdance"]},"aerodactyl":{"moves":["ancientpower","curse","earthquake","hiddenpowerflying","rest","whirlwind"]},"snorlax":{"moves":["curse","doubleedge","earthquake","fireblast","lovelykiss","rest","return","sleeptalk"]},"articuno":{"moves":["hiddenpowerelectric","icebeam","rest","sleeptalk","toxic"]},"zapdos":{"moves":["hiddenpowerice","rest","sleeptalk","thunder"]},"moltres":{"moves":["fireblast","hiddenpowergrass","rest","sleeptalk","sunnyday"]},"dragonite":{"moves":["haze","hiddenpowerflying","icebeam","lightscreen","reflect","rest","thunder"]},"mewtwo":{"moves":["fireblast","icebeam","psychic","recover","thunderbolt","thunderwave"]},"mew":{"moves":["earthquake","explosion","rockslide","softboiled","swordsdance"]},"meganium":{"moves":["hiddenpowerfire","leechseed","lightscreen","razorleaf","reflect","synthesis"]},"typhlosion":{"moves":["earthquake","fireblast","rest","sleeptalk","thunderpunch"]},"feraligatr":{"moves":["crunch","earthquake","icebeam","rest","rockslide","sleeptalk","surf"]},"furret":{"moves":["curse","doubleedge","rest","shadowball","sleeptalk","surf"]},"noctowl":{"moves":["hypnosis","nightshade","reflect","thief","toxic","whirlwind"]},"ledian":{"moves":["agility","barrier","batonpass","lightscreen"]},"ariados":{"moves":["batonpass","curse","sludgebomb","spiderweb"]},"crobat":{"moves":["gigadrain","haze","hiddenpowerground","rest","whirlwind","wingattack"]},"lanturn":{"moves":["icebeam","raindance","rest","sleeptalk","surf","thunder"]},"togetic":{"moves":["curse","doubleedge","rest","sleeptalk"]},"xatu":{"moves":["drillpeck","haze","psychic","rest","sleeptalk","thief"]},"ampharos":{"moves":["firepunch","hiddenpowerice","lightscreen","reflect","rest","sleeptalk","thunderbolt","thunderwave"]},"bellossom":{"moves":["hiddenpowerfire","leechseed","moonlight","razorleaf","sleeppowder","stunspore"]},"azumarill":{"moves":["perishsong","rest","surf","whirlpool"]},"sudowoodo":{"moves":["curse","earthquake","rest","rockslide","selfdestruct","sleeptalk"]},"politoed":{"moves":["growth","hiddenpowerelectric","icebeam","lovelykiss","rest","sleeptalk","surf"]},"jumpluff":{"moves":["encore","gigadrain","hiddenpowerflying","leechseed","sleeppowder","stunspore"]},"aipom":{"moves":["agility","batonpass","curse","return","shadowball"]},"sunflora":{"moves":["growth","hiddenpowerfire","hiddenpowerice","razorleaf","synthesis"]},"yanma":{"moves":["gigadrain","hiddenpowerbug","hiddenpowerflying","return","screech","thief"]},"quagsire":{"moves":["bellydrum","earthquake","hiddenpowerrock","rest","sleeptalk","surf"]},"espeon":{"moves":["batonpass","bite","growth","hiddenpowerfire","morningsun","psychic","substitute"]},"umbreon":{"moves":["batonpass","growth","hiddenpowerdark","meanlook","moonlight"]},"murkrow":{"moves":["drillpeck","haze","hiddenpowerdark","hiddenpowerfire","pursuit","thief","toxic"]},"slowking":{"moves":["flamethrower","icebeam","psychic","rest","sleeptalk","surf","thunderwave"]},"misdreavus":{"moves":["meanlook","painsplit","perishsong","psychic","shadowball","thief","thunderbolt"]},"unown":{"level":87,"moves":["hiddenpowerpsychic"]},"wobbuffet":{"level":83,"moves":["counter","mimic","mirrorcoat","safeguard"]},"girafarig":{"moves":["crunch","curse","earthquake","psychic","rest","return","thunderbolt"]},"forretress":{"moves":["doubleedge","explosion","hiddenpowerbug","rapidspin","reflect","spikes","toxic"]},"dunsparce":{"moves":["curse","flamethrower","rest","return","sleeptalk","thunder","thunderbolt"]},"gligar":{"moves":["counter","earthquake","hiddenpowerflying","screech","thief"]},"steelix":{"moves":["curse","earthquake","explosion","irontail","rest","roar","sleeptalk","toxic"]},"granbull":{"moves":["curse","healbell","hiddenpowerground","lovelykiss","rest","return","sleeptalk"]},"qwilfish":{"moves":["curse","haze","hydropump","sludgebomb","spikes"]},"scizor":{"moves":["agility","batonpass","hiddenpowerbug","return","swordsdance"]},"shuckle":{"moves":["defensecurl","rest","rollout","toxic"]},"heracross":{"moves":["curse","earthquake","megahorn","rest","sleeptalk"]},"sneasel":{"moves":["icebeam","moonlight","return","screech","shadowball","thief"]},"ursaring":{"moves":["curse","earthquake","rest","return","roar","sleeptalk"]},"magcargo":{"moves":["curse","earthquake","fireblast","rest","rockslide","sleeptalk"]},"piloswine":{"moves":["ancientpower","curse","earthquake","icebeam","rest","sleeptalk"]},"corsola":{"moves":["curse","recover","rockslide","surf","toxic"]},"octillery":{"moves":["flamethrower","hiddenpowerelectric","icebeam","rest","sleeptalk","surf"]},"delibird":{"moves":["hiddenpowerflying","icebeam","rapidspin","spikes","thief"]},"mantine":{"moves":["haze","hiddenpowerelectric","icebeam","rest","sleeptalk","surf","toxic"]},"skarmory":{"moves":["curse","drillpeck","rest","sleeptalk","toxic"]},"houndoom":{"moves":["crunch","fireblast","pursuit","solarbeam","sunnyday"]},"kingdra":{"moves":["dragonbreath","hiddenpowerelectric","icebeam","rest","sleeptalk","surf"]},"donphan":{"moves":["ancientpower","curse","earthquake","hiddenpowerbug","rapidspin","rest","roar","sleeptalk"]},"porygon2":{"moves":["curse","doubleedge","icebeam","recover","return","thunderbolt","thunderwave"]},"stantler":{"moves":["curse","earthquake","rest","return","sleeptalk"]},"smeargle":{"moves":["agility","batonpass","spiderweb","spikes","spore","swordsdance"]},"hitmontop":{"moves":["curse","hiddenpowerghost","highjumpkick","rest","sleeptalk"]},"miltank":{"moves":["bodyslam","curse","earthquake","healbell","milkdrink"]},"blissey":{"moves":["flamethrower","healbell","icebeam","present","sing","softboiled","toxic"]},"raikou":{"moves":["crunch","hiddenpowerice","reflect","rest","roar","sleeptalk","thunder","thunderbolt"]},"entei":{"moves":["fireblast","hiddenpowerrock","return","solarbeam","sunnyday"]},"suicune":{"moves":["icebeam","rest","roar","sleeptalk","surf","toxic"]},"tyranitar":{"moves":["crunch","curse","earthquake","fireblast","pursuit","rest","roar","rockslide","surf"]},"lugia":{"moves":["aeroblast","curse","earthquake","icebeam","recover","whirlwind"]},"hooh":{"moves":["curse","earthquake","hiddenpowerflying","recover","sacredfire","thunder","thunderbolt"]},"celebi":{"moves":["hiddenpowergrass","healbell","leechseed","psychic","recover","toxic"]}} as any;
/* eslint-enable */

export class RandomGen2Teams extends RandomGen3Teams {
	randomData: {[species: string]: OldRandomBattleSpecies} = randomDataJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);
		this.moveEnforcementCheckers = {
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter) => !counter.get('Flying') && types.has('Ground'),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => !counter.get('Ice'),
			Normal: (movePool, moves, abilities, types, counter) => !counter.get('Normal') && counter.setupType === 'Physical',
			Psychic: (movePool, moves, abilities, types, counter) => !counter.get('Psychic') && types.has('Grass'),
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock') && species.baseStats.atk > 60,
			Water: (movePool, moves, abilities, types, counter) => !counter.get('Water'),
		};
	}

	shouldCullMove(
		move: Move,
		types: Set<string>,
		moves: Set<string>,
		abilities = {},
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
	): {cull: boolean, isSetup?: boolean} {
		const restTalk = moves.has('rest') && moves.has('sleeptalk');

		switch (move.id) {
		// Set up once and only if we have the moves for it
		case 'bellydrum': case 'curse': case 'meditate': case 'screech': case 'swordsdance':
			return {
				cull: (
					(counter.setupType !== 'Physical' || counter.get('physicalsetup') > 1) ||
					(!counter.get('Physical') || counter.damagingMoves.size < 2 && !moves.has('batonpass') && !moves.has('sleeptalk')) ||
					(move.id === 'bellydrum' && moves.has('sleeptalk'))
				),
				isSetup: true,
			};

		// Not very useful without their supporting moves
		case 'batonpass':
			return {cull: !counter.setupType && !counter.get('speedsetup') && !moves.has('meanlook') && !moves.has('spiderweb')};
		case 'meanlook': case 'spiderweb':
			return {cull: movePool.includes('perishsong') || movePool.includes('batonpass')};
		case 'nightmare':
			return {cull: !moves.has('lovelykiss') && !moves.has('sleeppowder')};
		case 'swagger':
			return {cull: !moves.has('substitute')};

		// Bad after setup
		case 'charm': case 'counter':
			return {cull: !!counter.setupType};
		case 'haze':
			return {cull: !!counter.setupType || restTalk};
		case 'reflect': case 'lightscreen':
			return {cull: !!counter.setupType || moves.has('rest')};

		// Ineffective to have both
		case 'doubleedge':
			return {cull: moves.has('bodyslam') || moves.has('return')};
		case 'explosion': case 'selfdestruct':
			return {cull: moves.has('softboiled') || restTalk};
		case 'extremespeed':
			return {cull: moves.has('bodyslam') || restTalk};
		case 'hyperbeam':
			return {cull: moves.has('rockslide')};
		case 'rapidspin':
			return {cull: !!teamDetails.rapidSpin || !!counter.setupType || moves.has('sleeptalk')};
		case 'return':
			return {cull: moves.has('bodyslam')};
		case 'surf':
			return {cull: moves.has('hydropump')};
		case 'thunder':
			return {cull: moves.has('thunderbolt')};
		case 'razorleaf':
			return {cull: moves.has('swordsdance') && movePool.includes('sludgebomb')};
		case 'icebeam':
			return {cull: moves.has('dragonbreath')};
		case 'destinybond':
			return {cull: moves.has('explosion')};
		case 'pursuit':
			return {cull: moves.has('crunch') && moves.has('solarbeam')};
		case 'thief':
			return {cull: moves.has('rest') || moves.has('substitute')};
		case 'irontail':
			return {cull: types.has('Ground') && movePool.includes('earthquake')};

		// Status and illegal move rejections
		case 'encore': case 'roar': case 'whirlwind':
			return {cull: restTalk};
		case 'lovelykiss':
			return {cull: ['healbell', 'moonlight', 'morningsun', 'sleeptalk'].some(m => moves.has(m))};
		case 'sleeptalk':
			return {cull: moves.has('curse') && counter.get('stab') >= 2};
		case 'softboiled':
			return {cull: movePool.includes('swordsdance')};
		case 'spikes':
			return {cull: !!teamDetails.spikes};
		case 'substitute':
			return {cull: moves.has('agility') || moves.has('rest')};
		case 'synthesis':
			return {cull: moves.has('explosion')};
		case 'thunderwave':
			return {cull: moves.has('thunder') || moves.has('toxic')};
		}

		return {cull: false};
	}

	getItem(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		counter: MoveCounter,
		species: Species,
	) {
		// First, the high-priority items
		if (species.name === 'Ditto') return 'Metal Powder';
		if (species.name === 'Farfetch\u2019d') return 'Stick';
		if (species.name === 'Marowak') return 'Thick Club';
		if (species.name === 'Pikachu') return 'Light Ball';
		if (species.name === 'Unown') return 'Twisted Spoon';
		if (moves.has('thief')) return '';

		// Medium priority
		if (moves.has('rest') && !moves.has('sleeptalk')) return 'Mint Berry';
		if (
			(moves.has('bellydrum') || moves.has('swordsdance')) &&
			species.baseStats.spe >= 60 && !types.has('Ground') &&
			!moves.has('sleeptalk') && !moves.has('substitute') &&
			this.randomChance(1, 2)
		) {
			return 'Miracle Berry';
		}

		// Default to Leftovers
		return 'Leftovers';
	}

	randomSet(species: string | Species, teamDetails: RandomTeamsTypes.TeamDetails = {}): RandomTeamsTypes.RandomSet {
		species = this.dex.species.get(species);

		const data = this.randomData[species.id];
		const movePool = (data.moves || Object.keys(this.dex.species.getLearnset(species.id)!)).slice();
		const rejectedPool: string[] = [];
		const moves = new Set<string>();

		let ivs = {hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30};
		let availableHP = 0;
		for (const setMoveid of movePool) {
			if (setMoveid.startsWith('hiddenpower')) availableHP++;
		}

		const types = new Set(species.types);

		let counter;
		// We use a special variable to track Hidden Power
		// so that we can check for all Hidden Powers at once
		let hasHiddenPower = false;

		do {
			// Choose next 4 moves from learnset/viable moves and add them to moves list:
			while (moves.size < this.maxMoveCount && movePool.length) {
				const moveid = this.sampleNoReplace(movePool);
				if (moveid.startsWith('hiddenpower')) {
					availableHP--;
					if (hasHiddenPower) continue;
					hasHiddenPower = true;
				}
				moves.add(moveid);
			}
			while (moves.size < this.maxMoveCount && rejectedPool.length) {
				const moveid = this.sampleNoReplace(rejectedPool);
				if (moveid.startsWith('hiddenpower')) {
					if (hasHiddenPower) continue;
					hasHiddenPower = true;
				}
				moves.add(moveid);
			}

			counter = this.queryMoves(moves, species.types, new Set(), movePool);

			// Iterate through the moves again, this time to cull them:
			for (const moveid of moves) {
				const move = this.dex.moves.get(moveid);
				let {cull, isSetup} = this.shouldCullMove(move, types, moves, {}, counter, movePool, teamDetails);

				// This move doesn't satisfy our setup requirements:
				if (counter.setupType === 'Physical' && move.category === 'Special' && !counter.get('Physical')) {
					cull = true;
				}


				// Reject Status, non-STAB, or low basepower moves
				const moveIsRejectable = (
					(move.category !== 'Status' || !move.flags.heal) &&
					// These moves cannot be rejected in favor of a forced move
					!['batonpass', 'sleeptalk', 'spikes', 'spore', 'sunnyday'].includes(move.id) &&
					(move.category === 'Status' || !types.has(move.type) || (move.basePower && move.basePower < 40))
				);

				if (!cull && !isSetup && moveIsRejectable && (counter.setupType || !move.stallingMove)) {
					// There may be more important moves that this Pokemon needs
					if (
						// Pokemon should usually have at least one STAB move
						(
							!counter.get('stab') &&
							!counter.get('damage') &&
							!types.has('Ghost') &&
							counter.get('physicalpool') + counter.get('specialpool') > 0
						) || (movePool.includes('megahorn') || (movePool.includes('softboiled') && moves.has('present'))) ||
						// Rest + Sleep Talk should be selected together
						((moves.has('rest') && movePool.includes('sleeptalk')) || (moves.has('sleeptalk') && movePool.includes('rest'))) ||
						// Sunny Day + Solar Beam should be selected together
						(moves.has('sunnyday') && movePool.includes('solarbeam') ||
						(moves.has('solarbeam') && movePool.includes('sunnyday'))) ||
						['milkdrink', 'recover', 'spikes', 'spore'].some(m => movePool.includes(m))
					) {
						cull = true;
					} else {
						// Pokemon should have moves that benefit their typing
						for (const type of types) {
							if (this.moveEnforcementCheckers[type]?.(movePool, moves, new Set(), types, counter, species, teamDetails)) cull = true;
						}
					}
				}

				// Remove rejected moves from the move list
				if (
					cull &&
					(movePool.length - availableHP || availableHP && (move.id === 'hiddenpower' || !hasHiddenPower))
				) {
					if (move.category !== 'Status' && !move.damage && (move.id !== 'hiddenpower' || !availableHP)) {
						rejectedPool.push(moveid);
					}
					moves.delete(moveid);
					if (moveid.startsWith('hiddenpower')) hasHiddenPower = false;
					break;
				}

				if (cull && rejectedPool.length) {
					moves.delete(moveid);
					if (moveid.startsWith('hiddenpower')) hasHiddenPower = false;
					break;
				}
			}
		} while (moves.size < this.maxMoveCount && (movePool.length || rejectedPool.length));

		// Adjust IVs for Hidden Power
		for (const setMoveid of moves) {
			if (!setMoveid.startsWith('hiddenpower')) continue;
			const hpType = setMoveid.substr(11, setMoveid.length);

			const hpIVs: {[k: string]: Partial<typeof ivs>} = {
				dragon: {def: 28},
				ice: {def: 26},
				psychic: {def: 24},
				electric: {atk: 28},
				grass: {atk: 28, def: 28},
				water: {atk: 28, def: 26},
				fire: {atk: 28, def: 24},
				steel: {atk: 26},
				ghost: {atk: 26, def: 28},
				bug: {atk: 26, def: 26},
				rock: {atk: 26, def: 24},
				ground: {atk: 24},
				poison: {atk: 24, def: 28},
				flying: {atk: 24, def: 26},
				fighting: {atk: 24, def: 24},
			};
			if (hpIVs[hpType]) {
				ivs = {...ivs, ...hpIVs[hpType]};
			}

			if (ivs.atk === 28 || ivs.atk === 24) ivs.hp = 14;
			if (ivs.def === 28 || ivs.def === 24) ivs.hp -= 8;
		}

		const levelScale: {[k: string]: number} = {
			NU: 73,
			NUBL: 71,
			UU: 69,
			UUBL: 67,
			OU: 65,
			Uber: 61,
		};

		const level = this.adjustLevel || data.level || levelScale[species.tier] || 80;

		return {
			name: species.name,
			species: species.name,
			moves: Array.from(moves),
			ability: 'No Ability',
			evs: {hp: 255, atk: 255, def: 255, spa: 255, spd: 255, spe: 255},
			ivs,
			item: this.getItem('None', types, moves, counter, species),
			level,
			// No shiny chance because Gen 2 shinies have bad IVs
			shiny: false,
			gender: species.gender ? species.gender : 'M',
		};
	}
}

export default RandomGen2Teams;
