import { Protocol, PokemonDetails, PokemonHealth, Args, KWArgs } from '@pkmn/protocol';
import { As, ID, GenderName, StatusName, GameType, GenerationNum, BoostName } from '@pkmn/types';
import { Dex, toID} from 'ps';

import { Side } from './side';
import { Pokemon, Effect, ServerPokemon, WeatherState } from './pokemon';

type PseudoWeather = string & As<'PseudoWeather'>;

export class Battle implements Protocol.Handler {
  dex: Dex;
  // gen: GenerationNum; // TODO use dex.gen!

	p1: Side;
  p2: Side;
  sides: [Side, Side];

  pokemon: ServerPokemon[] | null;

	turn: number; // FIXME

	usesUpkeep = false;
	weather: Weather;
	pseudoWeather: WeatherState<PseudoWeather>[];
	weatherTimeLeft: number;
  weatherMinTimeLeft: number;

	lastMove: string;

	teamPreviewCount = 0;
	speciesClause: boolean;
	tier: string; // FIXME
	gameType: GameType;
	rated: string | boolean; // FIXME

  endLastTurnPending: boolean;

	/**
	 * true: timer on, state unknown
	 * false: timer off
	 * number: seconds left this turn
	 */
  kickingInactive: number | boolean;
  totalTimeLeft: number;
	graceTimeLeft: number;

	id: string; // FIXME
	roomid: Protocol.RoomID;

	constructor(id = '') {
		this.id = id;
		this.p1 = new Side(this, 0);
		this.p2 = new Side(this, 1);
		this.p1.foe = this.p2;
		this.p2.foe = this.p1;
		this.sides = [this.p1, this.p2];
		this.dex.gen = 8;
		this.reset();
  }

  reset() {
		// battle state
		this.turn = 0;

		this.weather = '' as ID;
		this.weatherTimeLeft = 0;
		this.weatherMinTimeLeft = 0;
		this.pseudoWeather = [];
		this.lastMove = '';

		for (const side of this.sides) {
			if (side) side.reset();
		}
	}

	removePseudoWeather(weather: string) {
		for (let i = 0; i < this.pseudoWeather.length; i++) {
			if (this.pseudoWeather[i][0] === weather) {
				this.pseudoWeather.splice(i, 1);
				return;
			}
		}
  }

	addPseudoWeather(weather: PseudoWeather, minTimeLeft: number, timeLeft: number) {
		this.pseudoWeather.push([weather, minTimeLeft, timeLeft]);
  }

	hasPseudoWeather(weather: PseudoWeather) {
		for (const [pseudoWeatherName] of this.pseudoWeather) {
			if (weather === pseudoWeatherName) {
				return true;
			}
		}
		return false;
	}

	destroy() {
		for (let i = 0; i < this.sides.length; i++) {
			if (this.sides[i]) this.sides[i].destroy();
			this.sides[i] = null!;
		}
		this.p1 = null!;
		this.p2 = null!;
	}

	setTurn(turnNum: string | number) {
		turnNum = parseInt(turnNum as string, 10);
		if (turnNum === this.turn + 1) {
			this.endLastTurnPending = true;
		}
		if (this.turn && !this.usesUpkeep) this.updatePseudoWeatherLeft(); // for compatibility with old replays
		this.turn = turnNum;

		if (this.p1.active[0]) this.p1.active[0]!.clearTurnstatuses();
		if (this.p1.active[1]) this.p1.active[1]!.clearTurnstatuses();
		if (this.p1.active[2]) this.p1.active[2]!.clearTurnstatuses();
		if (this.p2.active[0]) this.p2.active[0]!.clearTurnstatuses();
		if (this.p2.active[1]) this.p2.active[1]!.clearTurnstatuses();
		if (this.p2.active[2]) this.p2.active[2]!.clearTurnstatuses();
	}

	updateToxicTurns() {
		for (const side of this.sides) {
			for (const poke of side.active) {
				if (poke?.status === 'tox') poke.statusData.toxicTurns++;
			}
		}
  }

	changeWeather(weatherName: string, poke?: Pokemon, isUpkeep?: boolean, ability?: Effect) {
		let weather = toID(weatherName);
		if (!weather || weather === 'none') {
			weather = '' as ID;
		}
		if (isUpkeep) {
			if (this.weather && this.weatherTimeLeft) {
				this.weatherTimeLeft--;
				if (this.weatherMinTimeLeft !== 0) this.weatherMinTimeLeft--;
			}
			return;
		}
		if (weather) {
			let isExtremeWeather = (weather === 'deltastream' || weather === 'desolateland' || weather === 'primordialsea');
			if (poke) {
				if (ability) {
					this.activateAbility(poke, ability.name);
				}
				this.weatherTimeLeft = (this.dex.gen <= 5 || isExtremeWeather) ? 0 : 8;
				this.weatherMinTimeLeft = (this.dex.gen <= 5 || isExtremeWeather) ? 0 : 5;
			} else if (isExtremeWeather) {
				this.weatherTimeLeft = 0;
				this.weatherMinTimeLeft = 0;
			} else {
				this.weatherTimeLeft = (this.dex.gen <= 3 ? 5 : 8);
				this.weatherMinTimeLeft = (this.dex.gen <= 3 ? 0 : 5);
			}
		}
		this.weather = weather;
  }

	updatePseudoWeatherLeft() {
		for (const pWeather of this.pseudoWeather) {
			if (pWeather[1]) pWeather[1]--;
			if (pWeather[2]) pWeather[2]--;
		}
		for (const side of this.sides) {
			for (const id in side.sideConditions) {
				let cond = side.sideConditions[id];
				if (cond[2]) cond[2]--;
				if (cond[3]) cond[3]--;
			}
		}
  }

	useMove(pokemon: Pokemon, move: Move, target: Pokemon | null, kwArgs: KWArgs['move']) {
		let fromeffect = Dex.getEffect(kwArgs.from);
		this.activateAbility(pokemon, fromeffect);
		pokemon.clearMovestatuses();
		if (move.id === 'focuspunch') {
			pokemon.removeTurnstatus('focuspunch' as ID);
		}
		if (fromeffect.id === 'sleeptalk') {
			pokemon.rememberMove(move.name, 0);
		} else if (!fromeffect.id || fromeffect.id === 'pursuit') {
			let moveName = move.name;
			if (move.isZ) {
				pokemon.item = move.isZ;
				let item = Dex.getItem(move.isZ);
				if (item.zMoveFrom) moveName = item.zMoveFrom;
			} else if (move.name.slice(0, 2) === 'Z-') {
				moveName = moveName.slice(2);
				move = Dex.getMove(moveName);
				if (window.BattleItems) {
					for (let item in BattleItems) {
						if (BattleItems[item].zMoveType === move.type) pokemon.item = item;
					}
				}
			}
			let pp = 1;
			if (move.target === "all") {
				for (const active of pokemon.side.foe.active) {
					if (active && toID(active.ability) === 'pressure') {
						pp += 1;
					}
				}
			} else if (target && target.side !== pokemon.side && toID(target.ability) === 'pressure') {
				pp += 1;
			}
			pokemon.rememberMove(moveName, pp);
		}
		pokemon.lastMove = move.id;
		this.lastMove = move.id;
		if (move.id === 'wish' || move.id === 'healingwish') {
			pokemon.side.wisher = pokemon;
		}
	}

	cantUseMove(pokemon: Pokemon, effect: Effect, move: Move) {
		pokemon.clearMovestatuses();
		this.activateAbility(pokemon, effect);
		if (move.id) pokemon.rememberMove(move.name, 0);
		switch (effect.id) {
		case 'slp':
			pokemon.statusData.sleepTurns++;
			break;
		case 'focuspunch':
			pokemon.removeTurnstatus('focuspunch' as ID);
			break;
		case 'shelltrap':
			pokemon.removeTurnstatus('shelltrap' as ID);
			break;
		case 'flinch':
			pokemon.removeTurnstatus('focuspunch' as ID);
			break;
		}
	}

	activateAbility(pokemon: Pokemon | null, effectOrName: Effect | string, isNotBase?: boolean) {
		if (!pokemon || !effectOrName) return;
		if (typeof effectOrName !== 'string') {
			if (effectOrName.effectType !== 'Ability') return;
			effectOrName = effectOrName.name;
		}
		pokemon.rememberAbility(effectOrName, isNotBase);
	}

	runMinor(args: Protocol.BattleMinorArgType, kwArgs: KWArgs) {

		switch (args[0]) {
		case '-damage': {
			let poke = this.getPokemon(args[1])!;
			let damage = poke.healthParse(args[2], true);
			if (damage === null) break;

			if (kwArgs.from) {
				let effect = Dex.getEffect(kwArgs.from);
				let ofpoke = this.getPokemon(kwArgs.of);
				this.activateAbility(ofpoke, effect);
				if (effect.effectType === 'Item') {
					const itemPoke = ofpoke || poke;
					if (itemPoke.prevItem !== effect.name) {
						itemPoke.item = effect.name;
					}
				}
			}
			break;
		}
		case '-heal': {
			let poke = this.getPokemon(args[1])!;
			let damage = poke.healthParse(args[2], true, true);
			if (damage === null) break;

			if (kwArgs.from) {
				let effect = Dex.getEffect(kwArgs.from);
				this.activateAbility(poke, effect);
				if (effect.effectType === 'Item') {
					poke.item = effect.name;
				}
				switch (effect.id) {
				case 'lunardance':
					for (let trackedMove of poke.moveTrack) {
						trackedMove[1] = 0;
					}
					// falls through
				case 'healingwish':
					this.lastMove = 'healing-wish';
					poke.side.wisher = null;
					break;
				}
			}
			break;
		}
		case '-sethp': {
			for (let k = 0; k < 2; k++) {
				let cpoke = this.getPokemon(args[1 + 2 * k]);
				if (cpoke) cpoke.healthParse(args[2 + 2 * k])!;
			}
			break;
		}
		case '-boost': {
			let poke = this.getPokemon(args[1])!;
			let stat = args[2] as BoostName;
			if (this.dex.gen === 1 && stat === 'spd') break;
			if (this.dex.gen === 1 && stat === 'spa') stat = 'spc';
			let amount = parseInt(args[3], 10);
			if (amount === 0) break;
			if (!poke.boosts[stat]) {
				poke.boosts[stat] = 0;
			}
			poke.boosts[stat] += amount;

			if (!kwArgs.silent && kwArgs.from) {
				let effect = Dex.getEffect(kwArgs.from);
				let ofpoke = this.getPokemon(kwArgs.of);
				if (!(effect.id === 'weakarmor' && stat === 'spe')) {
					this.activateAbility(ofpoke || poke, effect);
				}
			}
			break;
		}
		case '-unboost': {
			let poke = this.getPokemon(args[1])!;
			let stat = args[2] as BoostName;
			if (this.dex.gen === 1 && stat === 'spd') break;
			if (this.dex.gen === 1 && stat === 'spa') stat = 'spc';
			let amount = parseInt(args[3], 10);
			if (amount === 0) break;

			if (!poke.boosts[stat]) poke.boosts[stat] = 0;
			poke.boosts[stat] -= amount;

			if (!kwArgs.silent && kwArgs.from) {
				let effect = Dex.getEffect(kwArgs.from);
				let ofpoke = this.getPokemon(kwArgs.of);
				this.activateAbility(ofpoke || poke, effect);
			}
			break;
		}
		case '-setboost': {
			let poke = this.getPokemon(args[1])!;
			let stat = args[2] as BoostName;
			let amount = parseInt(args[3], 10);
			poke.boosts[stat] = amount;
			break;
		}
		case '-swapboost': {
			let poke = this.getPokemon(args[1])!;
			let poke2 = this.getPokemon(args[2])!;
			let stats = args[3] ? args[3].split(', ') : ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'];
			for (const stat of stats) {
				let tmp = poke.boosts[stat];
				poke.boosts[stat] = poke2.boosts[stat];
				if (!poke.boosts[stat]) delete poke.boosts[stat];
				poke2.boosts[stat] = tmp;
				if (!poke2.boosts[stat]) delete poke2.boosts[stat];
			}
			break;
		}
		case '-clearpositiveboost': {
			let poke = this.getPokemon(args[1])!;
			let ofpoke = this.getPokemon(args[2]);
			let effect = Dex.getEffect(args[3]);
			for (const stat in poke.boosts) {
				if (poke.boosts[stat] > 0) delete poke.boosts[stat];
			}
			break;
		}
		case '-clearnegativeboost': {
			let poke = this.getPokemon(args[1])!;
			for (const stat in poke.boosts) {
				if (poke.boosts[stat] < 0) delete poke.boosts[stat];
			}
			break;
		}
		case '-copyboost': {
			let poke = this.getPokemon(args[1])!;
			let frompoke = this.getPokemon(args[2])!;
			let stats = args[3] ? args[3].split(', ') : ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'];
			for (const stat of stats) {
				poke.boosts[stat] = frompoke.boosts[stat];
				if (!poke.boosts[stat]) delete poke.boosts[stat];
			}
			if (this.dex.gen >= 6) {
				const volatilesToCopy = ['focusenergy', 'laserfocus'];
				for (const volatile of volatilesToCopy) {
					if (frompoke.volatiles[volatile]) {
						poke.addVolatile(volatile as ID);
					} else {
						poke.removeVolatile(volatile as ID);
					}
				}
			}
			break;
		}
		case '-clearboost': {
			let poke = this.getPokemon(args[1])!;
			poke.boosts = {};
			break;
		}
		case '-invertboost': {
			let poke = this.getPokemon(args[1])!;
			for (const stat in poke.boosts) {
				poke.boosts[stat] = -poke.boosts[stat];
			}
			break;
		}
		case '-clearallboost': {
			let timeOffset = this.scene.timeOffset;
			for (const side of this.sides) {
				for (const active of side.active) {
					if (active) {
						active.boosts = {};
					}
				}
			}
			break;
		}
		case '-immune': {
			let poke = this.getPokemon(args[1])!;
			let fromeffect = Dex.getEffect(kwArgs.from);
			this.activateAbility(this.getPokemon(kwArgs.of) || poke, fromeffect);
			break;
		}
		case '-fail': {
			let poke = this.getPokemon(args[1])!;
			let fromeffect = Dex.getEffect(kwArgs.from);
			let ofpoke = this.getPokemon(kwArgs.of);
			this.activateAbility(ofpoke || poke, fromeffect);
			break;
		}
		case '-block': {
			let poke = this.getPokemon(args[1])!;
			let ofpoke = this.getPokemon(kwArgs.of);
			let effect = Dex.getEffect(args[2]);
			this.activateAbility(ofpoke || poke, effect);
			switch (effect.id) {
			case 'quickguard':
				poke.addTurnstatus('quickguard' as ID);
				break;
			case 'wideguard':
				poke.addTurnstatus('wideguard' as ID);
				break;
			case 'craftyshield':
				poke.addTurnstatus('craftyshield' as ID);
				break;
			case 'protect':
				poke.addTurnstatus('protect' as ID);
				break;
			case 'safetygoggles':
				poke.item = 'Safety Goggles';
				break;
			case 'protectivepads':
				poke.item = 'Protective Pads';
				break;
			}
			break;
		}
		case '-mustrecharge': {
			const poke = this.getPokemon(args[1])!;
			poke.addMovestatus('mustrecharge' as ID);
			break;
		}
		case '-status': {
			let poke = this.getPokemon(args[1])!;
			let effect = Dex.getEffect(kwArgs.from);
			let ofpoke = this.getPokemon(kwArgs.of) || poke;
			poke.status = args[2] as StatusName;
			poke.removeVolatile('yawn' as ID);
			this.activateAbility(ofpoke || poke, effect);
			if (effect.effectType === 'Item') {
				ofpoke.item = effect.name;
			}

			switch (args[2]) {
			case 'tox':
				poke.statusData.toxicTurns = (effect.name === "Toxic Orb" ? -1 : 0);
				break;
			case 'slp':
				if (effect.id === 'rest') {
					poke.statusData.sleepTurns = 0; // for Gen 2 use through Sleep Talk
				}
				break;
			}
			break;
		}
		case '-curestatus': {
			let poke = this.getPokemon(args[1])!;
			if (poke) {
				poke.status = '';
				switch (args[2]) {
				case 'tox':
				case 'psn':
					poke.statusData.toxicTurns = 0;
					break;
				case 'slp':
					poke.statusData.sleepTurns = 0;
					break;
				default:
					poke.removeVolatile('confusion' as ID);
				}
			}
			break;
		}
		case '-cureteam': { // For old gens when the whole team was always cured
			let poke = this.getPokemon(args[1])!;
			for (const target of poke.side.pokemon) {
				target.status = '';
			}
			break;
		}
		case '-item': {
			let poke = this.getPokemon(args[1])!;
			let item = Dex.getItem(args[2]);
			let effect = Dex.getEffect(kwArgs.from);
			let ofpoke = this.getPokemon(kwArgs.of);
			poke.item = item.name;
			poke.itemEffect = '';
			poke.removeVolatile('airballoon' as ID);
			if (item.id === 'airballoon') poke.addVolatile('airballoon' as ID);

			if (effect.id) {
				switch (effect.id) {
				case 'pickup':
					this.activateAbility(poke, "Pickup");
					// falls through
				case 'recycle':
					poke.itemEffect = 'found';
					break;
				case 'frisk':
					this.activateAbility(ofpoke!, "Frisk");
					if (poke && poke !== ofpoke) { // used for gen 6
						poke.itemEffect = 'frisked';
					}
					break;
				case 'magician':
				case 'pickpocket':
					this.activateAbility(poke, effect.name);
					// falls through
				case 'thief':
				case 'covet':
					// simulate the removal of the item from the ofpoke
					ofpoke!.item = '';
					ofpoke!.itemEffect = '';
					ofpoke!.prevItem = item.name;
					ofpoke!.prevItemEffect = 'stolen';
					ofpoke!.addVolatile('itemremoved' as ID);
					poke.itemEffect = 'stolen';
					break;
				case 'harvest':
					poke.itemEffect = 'harvested';
					this.activateAbility(poke, "Harvest");
					break;
				case 'bestow':
					poke.itemEffect = 'bestowed';
					break;
				case 'switcheroo':
				case 'trick':
					poke.itemEffect = 'tricked';
					// falls through
				default:
					break;
				}
			}
			break;
		}
		case '-enditem': {
			let poke = this.getPokemon(args[1])!;
			let item = Dex.getItem(args[2]);
			let effect = Dex.getEffect(kwArgs.from);
			poke.item = '';
			poke.itemEffect = '';
			poke.prevItem = item.name;
			poke.prevItemEffect = '';
			poke.removeVolatile('airballoon' as ID);
			poke.addVolatile('itemremoved' as ID);
			if (kwArgs.eat) {
				poke.prevItemEffect = 'eaten';
				this.lastMove = item.id;
			} else if (kwArgs.weaken) {
				poke.prevItemEffect = 'eaten';
				this.lastMove = item.id;
			} else if (effect.id) {
				switch (effect.id) {
				case 'fling':
					poke.prevItemEffect = 'flung';
					break;
				case 'knockoff':
					poke.prevItemEffect = 'knocked off';
					break;
				case 'stealeat':
					poke.prevItemEffect = 'stolen';
					break;
				case 'gem':
					poke.prevItemEffect = 'consumed';
					break;
				case 'incinerate':
					poke.prevItemEffect = 'incinerated';
					break;
				}
			} else {
				switch (item.id) {
				case 'airballoon':
					poke.prevItemEffect = 'popped';
					poke.removeVolatile('airballoon' as ID);
					break;
				case 'focussash':
					poke.prevItemEffect = 'consumed';
					break;
				case 'focusband':
					break;
				case 'redcard':
					poke.prevItemEffect = 'held up';
					break;
				default:
					poke.prevItemEffect = 'consumed';
					break;
				}
			}
			break;
		}
		case '-ability': {
			let poke = this.getPokemon(args[1])!;
			let ability = Dex.getAbility(args[2]);
			let effect = Dex.getEffect(kwArgs.from);
			let ofpoke = this.getPokemon(kwArgs.of);
			poke.rememberAbility(ability.name, effect.id && !kwArgs.fail);

			if (kwArgs.silent) {
				// do nothing
			} else if (effect.id) {
				switch (effect.id) {
				case 'trace':
					this.activateAbility(poke, "Trace");
					this.activateAbility(poke, ability.name, true);
					ofpoke!.rememberAbility(ability.name);
					break;
				case 'powerofalchemy':
				case 'receiver':
					this.activateAbility(poke, effect.name);
					this.activateAbility(poke, ability.name, true);
					ofpoke!.rememberAbility(ability.name);
					break;
				case 'roleplay':
					this.activateAbility(poke, ability.name, true);
					ofpoke!.rememberAbility(ability.name);
					break;
				case 'desolateland':
				case 'primordialsea':
				case 'deltastream':
					if (kwArgs.fail) {
						this.activateAbility(poke, ability.name);
					}
					break;
				default:
					this.activateAbility(poke, ability.name);
					break;
				}
			} else {
				this.activateAbility(poke, ability.name);
			}
			break;
		}
		case '-endability': {
			// deprecated; use |-start| for Gastro Acid
			// and the third arg of |-ability| for Entrainment et al
			let poke = this.getPokemon(args[1])!;
			let ability = Dex.getAbility(args[2]);
			poke.ability = '(suppressed)';

			if (ability.id) {
				if (!poke.baseAbility) poke.baseAbility = ability.name;
			}
			break;
		}
		case '-transform': {
			let poke = this.getPokemon(args[1])!;
			let tpoke = this.getPokemon(args[2])!;
			let effect = Dex.getEffect(kwArgs.from);
			if (poke === tpoke) throw new Error("Transforming into self");

			if (!kwArgs.silent) {
				this.activateAbility(poke, effect);
			}

			poke.boosts = {...tpoke.boosts};
			poke.copyTypesFrom(tpoke);
			poke.ability = tpoke.ability;
			const species = (tpoke.volatiles.formechange ? tpoke.volatiles.formechange[1] : tpoke.species);
			const pokemon = tpoke;
			const shiny = tpoke.shiny;
			const gender = tpoke.gender;
			poke.addVolatile('transform' as ID, pokemon, shiny, gender);
			poke.addVolatile('formechange' as ID, species);
			for (const trackedMove of tpoke.moveTrack) {
				poke.rememberMove(trackedMove[0], 0);
			}
			break;
		}
		case '-formechange': {
			let poke = this.getPokemon(args[1])!;
			let template = Dex.getTemplate(args[2]);
			let fromeffect = Dex.getEffect(kwArgs.from);
			let isCustomAnim = false;
			poke.removeVolatile('typeadd' as ID);
			poke.removeVolatile('typechange' as ID);
			if (this.dex.gen >= 7) poke.removeVolatile('autotomize' as ID);

			if (!kwArgs.silent) {
				this.activateAbility(poke, fromeffect);
			}
			poke.addVolatile('formechange' as ID, template.species); // the formechange volatile reminds us to revert the sprite change on switch-out
			break;
		}
		case '-mega': {
			let poke = this.getPokemon(args[1])!;
			let item = Dex.getItem(args[3]);
			if (args[3]) poke.item = item.name;
			break;
		}
		case '-start': {
			let poke = this.getPokemon(args[1])!;
			let effect = Dex.getEffect(args[2]);
			let ofpoke = this.getPokemon(kwArgs.of);
			let fromeffect = Dex.getEffect(kwArgs.from);

			this.activateAbility(poke, effect);
			this.activateAbility(ofpoke || poke, fromeffect);
			switch (effect.id) {
			case 'typechange':
				if (ofpoke && fromeffect.id === 'reflecttype') {
					poke.copyTypesFrom(ofpoke);
				} else {
					const types = Dex.sanitizeName(args[3] || '???');
					poke.removeVolatile('typeadd' as ID);
					poke.addVolatile('typechange' as ID, types);
				}
				break;
			case 'typeadd':
				const type = Dex.sanitizeName(args[3]);
				poke.addVolatile('typeadd' as ID, type);
				break;
			case 'dynamax':
				poke.addVolatile('dynamax' as ID);
				break;
			case 'stockpile2':
				poke.removeVolatile('stockpile1' as ID);
				break;
			case 'stockpile3':
				poke.removeVolatile('stockpile2' as ID);
				break;
			case 'perish0':
				poke.removeVolatile('perish1' as ID);
				break;
			case 'perish1':
				poke.removeVolatile('perish2' as ID);
				break;
			case 'perish2':
				poke.removeVolatile('perish3' as ID);
				break;
			case 'autotomize':
				if (poke.volatiles.autotomize) {
					poke.volatiles.autotomize[1]++;
				} else {
					poke.addVolatile('autotomize' as ID, 1);
				}
				break;
			case 'smackdown':
				poke.removeVolatile('magnetrise' as ID);
				poke.removeVolatile('telekinesis' as ID);
				break;
			}
			poke.addVolatile(effect.id);
			break;
		}
		case '-end': {
			let poke = this.getPokemon(args[1])!;
			let effect = Dex.getEffect(args[2]);
			let fromeffect = Dex.getEffect(kwArgs.from);
			poke.removeVolatile(effect.id);

			if (kwArgs.silent) {
				// do nothing
			} else {
				switch (effect.id) {
				case 'illusion':
					poke.rememberAbility('Illusion');
					break;
				case 'perishsong': // for backwards compatibility
					poke.removeVolatile('perish3' as ID);
					break;
				case 'stockpile':
					poke.removeVolatile('stockpile1' as ID);
					poke.removeVolatile('stockpile2' as ID);
					poke.removeVolatile('stockpile3' as ID);
					break;
				}
			}
			break;
		}
		case '-singleturn': {
			let poke = this.getPokemon(args[1])!;
			let effect = Dex.getEffect(args[2]);
			poke.addTurnstatus(effect.id);

			if (effect.id === 'roost' && !poke.getTypeList().includes('Flying')) {
				break;
			}
			switch (effect.id) {
			case 'focuspunch':
				poke.rememberMove(effect.name, 0);
				break;
			case 'shelltrap':
				poke.rememberMove(effect.name, 0);
				break;
			}
			break;
		}
		case '-singlemove': {
			let poke = this.getPokemon(args[1])!;
			let effect = Dex.getEffect(args[2]);
			poke.addMovestatus(effect.id);
			break;
		}
		case '-activate': {
			let poke = this.getPokemon(args[1])!;
			let effect = Dex.getEffect(args[2]);
			let target = this.getPokemon(args[3]);
			this.activateAbility(poke, effect);
			switch (effect.id) {
			case 'grudge':
				poke.rememberMove(kwArgs.move, Infinity);
				break;
			// move activations
			case 'brickbreak':
				target!.side.removeSideCondition('Reflect');
				target!.side.removeSideCondition('LightScreen');
				break;
			case 'hyperspacefury':
			case 'hyperspacehole':
			case 'phantomforce':
			case 'shadowforce':
			case 'feint':
				poke.removeTurnstatus('protect' as ID);
				for (const curTarget of poke.side.pokemon) {
					curTarget.removeTurnstatus('wideguard' as ID);
					curTarget.removeTurnstatus('quickguard' as ID);
					curTarget.removeTurnstatus('craftyshield' as ID);
					curTarget.removeTurnstatus('matblock' as ID);
				}
				break;
			case 'spite':
				let move = Dex.getMove(kwArgs.move).name;
				let pp = Number(kwArgs.number);
				if (isNaN(pp)) pp = 4;
				poke.rememberMove(move, pp);
				break;
			case 'gravity':
				poke.removeVolatile('magnetrise' as ID);
				poke.removeVolatile('telekinesis' as ID);
				break;
			case 'skillswap': case 'wanderingspirit':
				if (this.dex.gen <= 4) break;
				let pokeability = Dex.sanitizeName(kwArgs.ability) || target!.ability;
				let targetability = Dex.sanitizeName(kwArgs.ability2) || poke.ability;
				if (pokeability) {
					poke.ability = pokeability;
					if (!target!.baseAbility) target!.baseAbility = pokeability;
				}
				if (targetability) {
					target!.ability = targetability;
					if (!poke.baseAbility) poke.baseAbility = targetability;
				}
				if (poke.side !== target!.side) {
					this.activateAbility(poke, pokeability, true);
					this.activateAbility(target, targetability, true);
				}
				break;

			// ability activations
			case 'forewarn':
				if (target) {
					target.rememberMove(kwArgs.move, 0);
				} else {
					let foeActive = [] as Pokemon[];
					for (const maybeTarget of poke.side.foe.active) {
						if (maybeTarget && !maybeTarget.fainted) foeActive.push(maybeTarget);
					}
					if (foeActive.length === 1) {
						foeActive[0].rememberMove(kwArgs.move, 0);
					}
				}
				break;
			case 'mummy':
				if (!kwArgs.ability) break; // if Mummy activated but failed, no ability will have been sent
				let ability = Dex.getAbility(kwArgs.ability);
				this.activateAbility(target, ability.name);
				this.activateAbility(poke, "Mummy");
				this.activateAbility(target, "Mummy", true);
				break;

			// item activations
			case 'leppaberry':
			case 'mysteryberry':
				poke.rememberMove(kwArgs.move, effect.id === 'leppaberry' ? -10 : -5);
				break;
			case 'focusband':
				poke.item = 'Focus Band';
				break;
			}
			break;
		}
		case '-sidestart': {
			let side = this.getSide(args[1]);
			let effect = Dex.getEffect(args[2]);
			side.addSideCondition(effect);
			break;
		}
		case '-sideend': {
			let side = this.getSide(args[1]);
			let effect = Dex.getEffect(args[2]);
			// let from = Dex.getEffect(kwArgs.from);
			// let ofpoke = this.getPokemon(kwArgs.of);
			side.removeSideCondition(effect.name);
			break;
		}
		case '-weather': {
			let effect = Dex.getEffect(args[1]);
			let poke = this.getPokemon(kwArgs.of) || undefined;
			let ability = Dex.getEffect(kwArgs.from);
			if (!effect.id || effect.id === 'none') {
				kwArgs.from = this.weather;
			}
			this.changeWeather(effect.name, poke, !!kwArgs.upkeep, ability);
			break;
		}
		case '-fieldstart': {
			let effect = Dex.getEffect(args[1]);
			let poke = this.getPokemon(kwArgs.of);
			let fromeffect = Dex.getEffect(kwArgs.from);
			this.activateAbility(poke, fromeffect);
			let maxTimeLeft = 0;
			if (effect.id.endsWith('terrain')) {
				for (let i = this.pseudoWeather.length - 1; i >= 0; i--) {
					let pwID = toID(this.pseudoWeather[i][0]);
					if (pwID.endsWith('terrain')) {
						this.pseudoWeather.splice(i, 1);
						continue;
					}
				}
				if (this.dex.gen > 6) maxTimeLeft = 8;
			}
			this.addPseudoWeather(effect.name, 5, maxTimeLeft);
			break;
		}
		case '-fieldend': {
			let effect = Dex.getEffect(args[1]);
			// let poke = this.getPokemon(kwArgs.of);
			this.removePseudoWeather(effect.name);
			break;
		}
		default: {
			throw new Error(`Unrecognized minor action: ${args[0]}`);
		}}
  }

	parsePokemonId(pokemonid: string) {
		let name = pokemonid;

		let siden = -1;
		let slot = -1; // if there is an explicit slot for this pokemon
		let slotChart: {[k: string]: number} = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5};
		if (name.substr(0, 4) === 'p2: ' || name === 'p2') {
			siden = this.p2.n;
			name = name.substr(4);
		} else if (name.substr(0, 4) === 'p1: ' || name === 'p1') {
			siden = this.p1.n;
			name = name.substr(4);
		} else if (name.substr(0, 2) === 'p2' && name.substr(3, 2) === ': ') {
			slot = slotChart[name.substr(2, 1)];
			siden = this.p2.n;
			name = name.substr(5);
			pokemonid = 'p2: ' + name;
		} else if (name.substr(0, 2) === 'p1' && name.substr(3, 2) === ': ') {
			slot = slotChart[name.substr(2, 1)];
			siden = this.p1.n;
			name = name.substr(5);
			pokemonid = 'p1: ' + name;
		}
		return {name, siden, slot, pokemonid};
  }

	getPokemon(pokemonid: string, details?: string) {
		let isNew = false; // if true, don't match any pokemon that already exists (for Team Preview)
		let isSwitch = false; // if true, don't match an active, fainted, or immediately-previously switched-out pokemon
		let isInactive = false; // if true, don't match an active pokemon
		let createIfNotFound = false; // if true, create the pokemon if a match wasn't found

		if (pokemonid === undefined || pokemonid === '??') return null;
		if (pokemonid.substr(0, 5) === 'new: ') {
			pokemonid = pokemonid.substr(5);
			isNew = true;
			createIfNotFound = true; // obviously
		}
		if (pokemonid.substr(0, 10) === 'switchin: ') {
			pokemonid = pokemonid.substr(10);
			isSwitch = true;
			createIfNotFound = true;
		}
		let parseIdResult = this.parsePokemonId(pokemonid);
		let {name, siden, slot} = parseIdResult;
		pokemonid = parseIdResult.pokemonid;

		if (!details) {
			if (siden < 0) return null;
			if (this.sides[siden].active[slot]) return this.sides[siden].active[slot];
			if (slot >= 0) isInactive = true;
		}

		let searchid = '';
		if (details) searchid = pokemonid + '|' + details;

		// search p1's pokemon
		if (siden !== this.p2.n && !isNew) {
			const active = this.p1.active[slot];
			if (active?.searchid === searchid && !isSwitch) {
				active.slot = slot;
				return active;
			}
			for (let i = 0; i < this.p1.pokemon.length; i++) {
				let pokemon = this.p1.pokemon[i];
				if (pokemon.fainted && (isNew || isSwitch)) continue;
				if (isSwitch || isInactive) {
					if (this.p1.active.indexOf(pokemon) >= 0) continue;
				}
				if (isSwitch && pokemon === this.p1.lastPokemon && !this.p1.active[slot]) continue;
				if ((searchid && pokemon.searchid === searchid) || // exact match
					(!searchid && pokemon.ident === pokemonid)) { // name matched, good enough
					if (slot >= 0) pokemon.slot = slot;
					return pokemon;
				}
				if (!pokemon.searchid && pokemon.checkDetails(details)) { // switch-in matches Team Preview entry
					pokemon = this.p1.newPokemon(Protocol.parseDetails(name, pokemonid, details, {item: pokemon.item} as any), i);
					if (slot >= 0) pokemon.slot = slot;
					return pokemon;
				}
			}
		}

		// search p2's pokemon
		if (siden !== this.p1.n && !isNew) {
			const active = this.p2.active[slot];
			if (active?.searchid === searchid && !isSwitch) {
				if (slot >= 0) active.slot = slot;
				return active;
			}
			for (let i = 0; i < this.p2.pokemon.length; i++) {
				let pokemon = this.p2.pokemon[i];
				if (pokemon.fainted && (isNew || isSwitch)) continue;
				if (isSwitch || isInactive) {
					if (this.p2.active.indexOf(pokemon) >= 0) continue;
				}
				if (isSwitch && pokemon === this.p2.lastPokemon && !this.p2.active[slot]) continue;
				if ((searchid && pokemon.searchid === searchid) || // exact match
					(!searchid && pokemon.ident === pokemonid)) { // name matched, good enough
					if (slot >= 0) pokemon.slot = slot;
					return pokemon;
				}
				if (!pokemon.searchid && pokemon.checkDetails(details)) { // switch-in matches Team Preview entry
					pokemon = this.p2.newPokemon(this.parseDetails(name, pokemonid, details, {item: pokemon.item} as any), i);
					if (slot >= 0) pokemon.slot = slot;
					return pokemon;
				}
			}
		}

		if (!details || !createIfNotFound) return null;

		// pokemon not found, create a new pokemon object for it

		if (siden < 0) throw new Error("Invalid pokemonid passed to getPokemon");

		let species = name;
		let gender = '';
		let level = 100;
		let shiny = false;
		if (details) {
			let splitDetails = details.split(', ');
			if (splitDetails[splitDetails.length - 1] === 'shiny') {
				shiny = true;
				splitDetails.pop();
			}
			if (splitDetails[splitDetails.length - 1] === 'M' || splitDetails[splitDetails.length - 1] === 'F') {
				gender = splitDetails[splitDetails.length - 1];
				splitDetails.pop();
			}
			if (splitDetails[1]) {
				level = parseInt(splitDetails[1].substr(1), 10) || 100;
			}
			if (splitDetails[0]) {
				species = splitDetails[0];
			}
		}
		if (slot < 0) slot = 0;
		let pokemon = this.sides[siden].newPokemon({
			species,
			details,
			name,
			ident: (name ? pokemonid : ''),
			searchid: (name ? (pokemonid + '|' + details) : ''),
			level,
			gender,
			shiny,
			slot,
		}, isNew ? -2 : -1);
		return pokemon;
  }

	getSide(sidename: string): Side {
		if (sidename === 'p1' || sidename.substr(0, 3) === 'p1:') return this.p1;
		if (sidename === 'p2' || sidename.substr(0, 3) === 'p2:') return this.p2;
		if (this.p1.id === sidename) return this.p1;
		if (this.p2.id === sidename) return this.p2;
		if (this.p1.name === sidename) return this.p1;
		if (this.p2.name === sidename) return this.p2;
		return {
			name: sidename,
			id: sidename.replace(/ /g, ''),
		} as any;
  }

  'start'(args: Args['start']) {
    this.p1.active[0] = null;
    this.p2.active[0] = null;
  }

  'upkeep'(args: Args['upkeep']) {
    this.usesUpkeep = true;
    this.updatePseudoWeatherLeft();
    this.updateToxicTurns();
  }

  'turn'(args: Args['turn']) {
		this.setTurn(args[1]);
  }

  'tier'(args: Args['tier']) {
		this.tier = args[1];
    if (this.tier.slice(-13) === 'Random Battle') {
      this.speciesClause = true;
    }
  }

  'detailschange'(args: Args['detailschange']) {
    let poke = this.getPokemon(args[1])!;
    poke.removeVolatile('formechange' as ID);
    poke.removeVolatile('typeadd' as ID);
    poke.removeVolatile('typechange' as ID);

    let newSpecies = args[2];
    let commaIndex = newSpecies.indexOf(',');
    if (commaIndex !== -1) {
      let level = newSpecies.substr(commaIndex + 1).trim();
      if (level.charAt(0) === 'L') {
        poke.level = parseInt(level.substr(1), 10);
      }
      newSpecies = args[2].substr(0, commaIndex);
    }
    let template = this.dex.getTemplate(newSpecies);

    poke.species = newSpecies;
    poke.ability = poke.baseAbility = (template.abilities ? template.abilities['0'] : '');

    poke.details = args[2];
    poke.searchid = args[1].substr(0, 2) + args[1].substr(3) + '|' + args[2];
  }

  'gametype'(args: Args['gametype']) {
    this.gameType = args[1];
    switch (args[1]) {
    default:
      this.p1.active = [null];
      this.p2.active = [null];
      break;
    case 'doubles':
      this.p1.active = [null, null];
      this.p2.active = [null, null];
      break;
    case 'triples':
    // case 'rotation':
      this.p1.active = [null, null, null];
      this.p2.active = [null, null, null];
      break;
    }
  }

  'rule'(args: Args['rule']) {
		const ruleName = args[1].split(': ')[0];
		if (ruleName === 'Species Clause') this.speciesClause = true;
  }

  'rated'(args: Args['rated']) {
    this.rated = args[1] || true;
  }

  'inactive'(args: Args['inactive']) {
		if (!this.kickingInactive) this.kickingInactive = true;
			if (args[1].slice(0, 11) === "Time left: ") {
				let [time, totalTime, graceTime] = args[1].split(' | ');
				this.kickingInactive = parseInt(time.slice(11), 10) || true;
				this.totalTimeLeft = parseInt(totalTime, 10);
				this.graceTimeLeft = parseInt(graceTime || '', 10) || 0;
				if (this.totalTimeLeft === this.kickingInactive) this.totalTimeLeft = 0;
				return;
			} else if (args[1].slice(0, 9) === "You have ") {
				// this is ugly but parseInt is documented to work this way
				// so I'm going to be lazy and not chop off the rest of the
				// sentence
				this.kickingInactive = parseInt(args[1].slice(9), 10) || true;
				return;
			} else if (args[1].slice(-14) === ' seconds left.') {
				let hasIndex = args[1].indexOf(' has ');
				let userid = window.app?.user?.get('userid');
				if (toID(args[1].slice(0, hasIndex)) === userid) {
					this.kickingInactive = parseInt(args[1].slice(hasIndex + 5), 10) || true;
				}
			}
  }

  'inactiveoff'(_: Args['inactiveoff']) {
    this.kickingInactive = false;
  }

  'player'(args: Args['player']) {
		let side = this.getSide(args[1]);
			side.setName(args[2]);
			if (args[3]) side.setAvatar(args[3]);
			if (args[4]) side.rating = args[4];
  }

  'teamsize'(args: Args['teamsize']) {
    let side = this.getSide(args[1]);
    side.totalPokemon = parseInt(args[2], 10);
  }

  'clearpoke'(args: Args['clearpoke']) {
    this.p1.clearPokemon();
    this.p2.clearPokemon();
  }

  'poke'(args: Args['poke']) {
    let pokemon = this.getPokemon('new: ' + args[1], args[2])!;
    if (args[3] === 'item') {
      pokemon.item = '(exists)';
    }
  }

  'teampreview'(args: Args['teampreview']) {
    this.teamPreviewCount = parseInt(args[1], 10);
  }

  'switch'(args: Args['switch']) {
    this.doSwitch(args);
  }

  'drag'(args: Args['drag']) {
    this.doSwitch(args);
  }

  'replace'(args: Args['replace']) {
    this.doSwitch(args);
  }

  private doSwitch(args: Args['switch' | 'drag' | 'replace']) {
    let poke = this.getPokemon('switchin: ' + args[1], args[2])!;
    let slot = poke.slot;
    poke.healthParse(args[3]);
    poke.removeVolatile('itemremoved' as ID);
    if (args[0] === 'switch') {
      if (poke.side.active[slot]) {
        poke.side.switchOut(poke.side.active[slot]!);
      }
      poke.side.switchIn(poke);
    } else if (args[0] === 'replace') {
      poke.side.replace(poke);
    } else {
      poke.side.dragIn(poke);
    }
  }

  'faint'(args: Args['faint']) {
    const poke = this.getPokemon(args[1])!;
    poke.side.faint(poke);
  }

  'swap'(args: Args['swap'], kwArgs: KWArgs['swap']) {
    if (isNaN(Number(args[2]))) {
      const poke = this.getPokemon(args[1])!;
      poke.side.swapWith(poke, this.getPokemon(args[2])!);
    } else {
      const poke = this.getPokemon(args[1])!;
      const targetIndex = parseInt(args[2], 10);
      if (kwArgs.from) {
        const target = poke.side.active[targetIndex];
        if (target) args[2] = target.ident;
      }
      poke.side.swapTo(poke, targetIndex);
    }
  }

  'move'(args: Args['move'], kwArgs: KWArgs['move']) {
    const poke = this.getPokemon(args[1])!;
    const move = Dex.getMove(args[2]);
    if (this.checkActive(poke)) return;
    const poke2 = this.getPokemon(args[3]);
    this.useMove(poke, move, poke2, kwArgs);
  }

  'cant'(args: Args['cant']) {
    const poke = this.getPokemon(args[1])!;
    const effect = Dex.getEffect(args[2]);
    const move = Dex.getMove(args[3]);
    this.cantUseMove(poke, effect, move);
  }

  'gen'(args: Args['gen']) {
    this.dex = Dex.forGen(this.dex.gen);
  }

	checkActive(poke: Pokemon) {
		if (!poke.side.active[poke.slot]) {
			// SOMEONE jumped in in the middle of a replay. <_<
			poke.side.replace(poke);
		}
		return false;
	}
}