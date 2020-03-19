import { Protocol, PokemonDetails, PokemonHealth, } from '@pkmn/protocol';
import { As, ID, GenderName, HPColor, StatusName, Weather, BoostsTable, TypeName } from '@pkmn/types';
import { Dex, toID} from 'ps';

import { Side } from './side';

type SearchID = string & As<'SearchID'>;

/** [id, element?, ...misc] */
export type EffectState = any[] & {0: ID};
/** [name, minTimeLeft, maxTimeLeft] */
export type WeatherState<T = Weather> = [T, number, number];
export type EffectTable = {[effectid: string]: EffectState};

export interface Effect {
	readonly id: ID;
	readonly name: string;
	readonly gen: number;
	readonly effectType: 'Item' | 'Move' | 'Ability' | 'Species' | 'Pure';
	readonly exists: boolean;
}

export interface ServerPokemon extends Protocol.Pokemon, PokemonDetails, PokemonHealth {}

const SLOTS = ['a', 'b', 'c', 'd', 'e', 'f'];

export class Pokemon implements PokemonDetails, PokemonHealth {
	side: Side;

	name: string;
	species: string; // ID/Protocol.Species?
	/**
	 * A string representing information extractable from textual
	 * messages: side, nickname.
	 *
	 * Will be the empty string between Team Preview and the first
	 * switch-in.
	 *
	 * Examples: `p1: Unown` or `p2: Sparky`
	 */
	ident: Protocol.PokemonIdent;
	/**
	 * `` `${ident}|${details}` ``. Tracked for ease of searching.
	 *
	 * As with ident and details, will only change during the first
	 * switch-in.
	 */
	searchid: SearchID;

	level: number;
	gender: GenderName;
	shiny: boolean;

	/** [[moveName, ppUsed]] */
	moveTrack: Array<[string, number]>;
	moves: string[];

	slot: number;
	/**
	 * A string representing visible information not included in
	 * ident: species, level, gender, shininess. Level is left off
	 * if it's 100; gender is left off if it's genderless.
	 *
	 * Note: Can be partially filled out in Team Preview, because certain
	 * forme information and shininess isn't visible there. In those
	 * cases, details can change during the first switch-in, but will
	 * otherwise not change over the course of a game.
	 *
	 * Examples: `Mimikyu, L50, F`, `Steelix, M, shiny`
	 */
	details: Protocol.PokemonDetails;

	boosts: Partial<BoostsTable>;

	baseAbility: string; // ID/Protocol.Ability?
	ability: string; // ID/Protocol.Ability?

	maxhp: number;
	hp: number;
	hpcolor: HPColor;
	fainted: boolean;

	item: string; // ID/Protocol.Item
	itemEffect: string;
	prevItem: string; // ID/Protocol.Item
	prevItemEffect: string;

	status: StatusName | 'tox' | '' | '???';
	statusData: {sleepTurns: number, toxicTurns: number};
	statusStage: number;
	volatiles: EffectTable;
	turnstatuses: EffectTable;
	movestatuses: EffectTable;

	lastMove: string; // Protocol.Move

	constructor(data: any, side: Side) {
		// FIXME: make sure nothing is missing
		// Object.assign(this, Dex.getTemplate(data.species));
		// Object.assign(this, data);
		this.side = side;
		const species = Dex.get().getSpecies(data.species)!;

		this.species = species.name;
		this.name = data.name || '';

		this.ident = data.ident || '' as Protocol.PokemonIdent;
		this.searchid = data.searchid ||  '' as SearchID;

		this.level = data.level || 100;
		this.gender = data.gender || 'N';
		this.shiny = data.shiny || false;

		this.moveTrack = data.moveTrack || [];
		this.moves = data.moves || [];

		this.slot = data.slot || 0;
		this.details = data.details || '' as Protocol.PokemonDetails;

		this.boosts = data.boosts || {};

		this.baseAbility = data.baseAbility || '';
		this.ability = data.ability || '';

		this.maxhp = data.maxhp || 1000;
		this.hp = data.hp || 0;
		this.hpcolor  = data.hpcolor || 'g';
		this.fainted = data.fainted || false;

		this.item = data.item || '';
		this.itemEffect = data.itemEffect || '';
		this.prevItem = data.prevItem || ''
		this.prevItemEffect = data.prevItemEffect || '';

		this.status = data.status || '';
		this.statusData = {
			sleepTurns: data.statusData.sleepTurns || 0,
			toxicTurns: data.statusData.toxicTurns || 0
		};
		this.statusStage = data.statusStage || 0;
		this.volatiles = data.volatiles || {};
		this.turnstatuses = data.turnstatuses || {};
		this.movestatuses = data.movestatuses || {} ;

		this.lastMove = data.lastMove || '';
	}

	isActive() {
		return this.side.active.includes(this);
	}

	getHPColor(): HPColor {
		if (this.hpcolor) return this.hpcolor;
		const ratio = this.hp / this.maxhp;
		if (ratio > 0.5) return 'g';
		if (ratio > 0.2) return 'y';
		return 'r';
	}

	healthParse(hpstring: string, parsedamage?: boolean, heal?: boolean):
		[number, number, number] | [number, number, number, HPColor] | null {
		// returns [delta, denominator, percent(, oldnum, oldcolor)] or null
		if (!hpstring || !hpstring.length) return null;
		const parenIndex = hpstring.lastIndexOf('(');
		if (parenIndex >= 0) {
			// old style damage and health reporting
			if (parsedamage) {
				let damage = parseFloat(hpstring);
				// unusual check preseved for backward compatbility
				if (isNaN(damage)) damage = 50;
				if (heal) {
					this.hp += this.maxhp * damage / 100;
					if (this.hp > this.maxhp) this.hp = this.maxhp;
				} else {
					this.hp -= this.maxhp * damage / 100;
				}
				// parse the absolute health information
				const ret = this.healthParse(hpstring);
				if (ret && (ret[1] === 100)) {
					// support for old replays with nearest-100th damage and health
					return [damage, 100, damage];
				}
				// complicated expressions preserved for backward compatibility
				const percent = Math.round(Math.ceil(damage * 48 / 100) / 48 * 100);
				const pixels = Math.ceil(damage * 48 / 100);
				return [pixels, 48, percent];
			}
			if (hpstring.substr(hpstring.length - 1) !== ')') return null;
			hpstring = hpstring.substr(parenIndex + 1, hpstring.length - parenIndex - 2);
		}

		let oldhp = this.fainted ? 0 : (this.hp || 1);
		let oldmaxhp = this.maxhp;
		const oldcolor = this.hpcolor;

		this.side.battle.parseHealth(hpstring, this);
		// max hp not known before parsing this message
		if (oldmaxhp === 0) oldmaxhp = oldhp = this.maxhp;
		const oldnum = oldhp ? (Math.floor(this.maxhp * oldhp / oldmaxhp) || 1) : 0;
		const delta = this.hp - oldnum;
		return [delta, this.maxhp, oldnum, oldcolor];
	}

	checkDetails(details?: Protocol.PokemonDetails) {
		if (!details) return false;
		if (details === this.details) return true;
		if (this.searchid) return false;
		if (details.indexOf(', shiny') >= 0) {
			if (this.checkDetails(details.replace(', shiny', '') as Protocol.PokemonDetails)) {
				return true;
			}
		}
		// the actual forme was hidden on Team Preview
		details = details.replace(/(-[A-Za-z0-9]+)?(, |$)/, '-*$2') as Protocol.PokemonDetails;
		return details === this.details;
	}

	getIdent() {
		return (this.ident.substr(0, 2) + SLOTS[this.slot] + this.ident.substr(2)) as Protocol.PokemonIdent;
	}

	removeVolatile(volatile: ID) {
		if (!this.hasVolatile(volatile)) return;
		delete this.volatiles[volatile];
	}

	addVolatile(volatile: ID, ...args: any[]) {
		if (this.hasVolatile(volatile) && !args.length) return;
		this.volatiles[volatile] = [volatile, ...args] as EffectState;
	}

	hasVolatile(volatile: ID) {
		return !!this.volatiles[volatile];
	}

	removeTurnstatus(volatile: ID) {
		if (!this.hasTurnstatus(volatile)) return;
		delete this.turnstatuses[volatile];
	}

	addTurnstatus(volatile: ID) {
		volatile = toID(volatile);
		if (this.hasTurnstatus(volatile)) return;
		this.turnstatuses[volatile] = [volatile];
	}

	hasTurnstatus(volatile: ID) {
		return !!this.turnstatuses[volatile];
	}

	clearTurnstatuses() {
		for (const id in this.turnstatuses) {
			this.removeTurnstatus(id as ID);
		}
		this.turnstatuses = {};
	}

	removeMovestatus(volatile: ID) {
		if (!this.hasMovestatus(volatile)) return;
		delete this.movestatuses[volatile];
	}

	addMovestatus(volatile: ID) {
		volatile = toID(volatile);
		if (this.hasMovestatus(volatile)) return;
		this.movestatuses[volatile] = [volatile];
	}

	hasMovestatus(volatile: ID) {
		return !!this.movestatuses[volatile];
	}

	clearMovestatuses() {
		for (const id in this.movestatuses) {
			this.removeMovestatus(id as ID);
		}
		this.movestatuses = {};
	}

	clearVolatiles() {
		this.volatiles = {};
		this.clearTurnstatuses();
		this.clearMovestatuses();
	}

	rememberMove(moveName: string, pp = 1, recursionSource?: string) {
		if (recursionSource === this.ident) return;
		moveName = Dex.get().getMove(moveName)!.name;
		if (moveName.charAt(0) === '*') return;
		if (moveName === 'Struggle') return;
		if (this.volatiles.transform) {
			// make sure there is no infinite recursion if both Pokemon are transformed into each other
			if (!recursionSource) recursionSource = this.ident;
			this.volatiles.transform[1].rememberMove(moveName, 0, recursionSource);
			moveName = '*' + moveName;
		}
		for (const entry of this.moveTrack) {
			if (moveName === entry[0]) {
				entry[1] += pp;
				if (entry[1] < 0) entry[1] = 0;
				return;
			}
		}
		this.moveTrack.push([moveName, pp]);
	}

	rememberAbility(ability: string, isNotBase?: boolean) {
		ability = Dex.get().getAbility(ability)!.name;
		this.ability = ability;
		if (!this.baseAbility && !isNotBase) {
			this.baseAbility = ability;
		}
	}

	getWeightKg(serverPokemon?: ServerPokemon) {
		const autotomizeFactor = this.volatiles.autotomize?.[1] * 100 || 0;
		return Math.max(this.getTemplate(serverPokemon).weightkg - autotomizeFactor, 0.1);
	}

	clearVolatile() {
		this.ability = this.baseAbility;
		this.boosts = {};
		this.clearVolatiles();
		for (let i = 0; i < this.moveTrack.length; i++) {
			if (this.moveTrack[i][0].charAt(0) === '*') {
				this.moveTrack.splice(i, 1);
				i--;
			}
		}
		// this.lastMove = '';
		this.statusStage = 0;
		this.statusData.toxicTurns = 0;
		if (this.side.battle.gen === 5) this.statusData.sleepTurns = 0;
	}

	/**
	 * copyAll = false means Baton Pass,
	 * copyAll = true means Illusion breaking
	 */
	copyVolatileFrom(pokemon: Pokemon, copyAll?: boolean) {
		this.boosts = pokemon.boosts;
		this.volatiles = pokemon.volatiles;
		// this.lastMove = pokemon.lastMove; // I think
		if (!copyAll) {
			delete this.volatiles['airballoon'];
			delete this.volatiles['attract'];
			delete this.volatiles['autotomize'];
			delete this.volatiles['disable'];
			delete this.volatiles['encore'];
			delete this.volatiles['foresight'];
			delete this.volatiles['imprison'];
			delete this.volatiles['laserfocus'];
			delete this.volatiles['mimic'];
			delete this.volatiles['miracleeye'];
			delete this.volatiles['nightmare'];
			delete this.volatiles['smackdown'];
			delete this.volatiles['stockpile1'];
			delete this.volatiles['stockpile2'];
			delete this.volatiles['stockpile3'];
			delete this.volatiles['torment'];
			delete this.volatiles['typeadd'];
			delete this.volatiles['typechange'];
			delete this.volatiles['yawn'];
		}
		delete this.volatiles['transform'];
		delete this.volatiles['formechange'];

		pokemon.boosts = {};
		pokemon.volatiles = {};
		pokemon.side.battle.scene.removeTransform(pokemon);
		pokemon.statusStage = 0;
	}

	copyTypesFrom(pokemon: Pokemon) {
		const [types, addedType] = pokemon.getTypes();
		this.addVolatile('typechange' as ID, types.join('/'));
		if (addedType) {
			this.addVolatile('typeadd' as ID, addedType);
		} else {
			this.removeVolatile('typeadd' as ID);
		}
	}

	getTypes(serverPokemon?: ServerPokemon): [ReadonlyArray<TypeName>, TypeName | ''] {
		let types: ReadonlyArray<TypeName>;
		if (this.volatiles.typechange) {
			types = this.volatiles.typechange[1].split('/');
		} else {
			types = this.getTemplate(serverPokemon).types;
		}
		if (this.volatiles.roost && types.includes('Flying')) {
			types = types.filter(typeName => typeName !== 'Flying');
			if (!types.length) types = ['Normal'];
		}
		const addedType = (this.volatiles.typeadd ? this.volatiles.typeadd[1] : '');
		return [types, addedType];
	}

	isGrounded(serverPokemon?: ServerPokemon) {
		const battle = this.side.battle;
		if (battle.hasPseudoWeather('Gravity')) {
			return true;
		} else if (this.volatiles['ingrain'] && battle.gen >= 4) {
			return true;
		} else if (this.volatiles['smackdown']) {
			return true;
		}

		let item = toID(serverPokemon ? serverPokemon.item : this.item);
		const ability = toID(this.ability || serverPokemon?.ability);
		if (battle.hasPseudoWeather('Magic Room') || this.volatiles['embargo'] || ability === 'klutz') {
			item = '' as ID;
		}

		if (item === 'ironball') return true;
		if (ability === 'levitate') return false;
		if (this.volatiles['magnetrise'] || this.volatiles['telekinesis']) return false;
		if (item === 'airballoon') return false;
		return !this.getTypeList(serverPokemon).includes('Flying');
	}

	getTypeList(serverPokemon?: ServerPokemon) {
		const [types, addedType] = this.getTypes(serverPokemon);
		return addedType ? types.concat(addedType) : types;
	}

	getSpecies(serverPokemon?: ServerPokemon): string {
		return this.volatiles.formechange ? this.volatiles.formechange[1] :
			(serverPokemon ? serverPokemon.species : this.species);
	}

	getTemplate(serverPokemon?: ServerPokemon) {
		return this.side.battle.dex.getTemplate(this.getSpecies(serverPokemon));
	}

	getBaseTemplate() {
		return this.side.battle.dex.getTemplate(this.species);
	}

	reset() {
		this.clearVolatile();
		this.hp = this.maxhp;
		this.fainted = false;
		this.status = '';
		this.moveTrack = [];
		this.name = this.name || this.species;
	}

	destroy() {
		this.side = null!;
	}
}