import {Utils} from '../lib/utils';
import {Condition, DexConditions} from './dex-conditions';
import {DataMove, DexMoves} from './dex-moves';
import {Item, DexItems} from './dex-items';
import {Ability, DexAbilities} from './dex-abilities';
import {Species, DexSpecies, DexLearnsets} from './dex-species';
import {Format, DexFormats} from './dex-formats';
import {
	AbilityData,
	AbilityText,
	ActiveMove,
	AnyObject,
	EffectData,
	FormatData,
	ID,
	ItemData,
	ItemText,
	LearnsetData,
	ModdedBattleScriptsData,
	ModdedLearnsetData,
	Move,
	MoveData,
	MoveText,
	NatureData,
	SpeciesData,
	TypeData,
} from './exported-global-types';

import * as gen1 from '../data/mods/gen1';
import * as gen2 from '../data/mods/gen2';
import * as gen3 from '../data/mods/gen3';
import * as gen4 from '../data/mods/gen4';
import * as gen5 from '../data/mods/gen5';
import * as gen6 from '../data/mods/gen6';
import * as gen7 from '../data/mods/gen7';
import * as gen8 from '../data/mods/gen8';
import * as gen9 from '../data';

import * as formats9 from '../data/formats-data';

import * as learn2 from '../data/mods/gen2/learnsets';
import * as learn6 from '../data/mods/gen6/learnsets';
import * as learn9 from '../data/learnsets';

import * as legality2 from '../data/mods/gen2/legality';
import * as legality6 from '../data/mods/gen6/legality';
import * as legality9 from '../data/legality';

import {AbilitiesText} from '../data/text/abilities';
import {ItemsText} from '../data/text/items';
import {MovesText} from '../data/text/moves';
// import {PokedexText} from '../data/text/pokedex';
import {DefaultText} from '../data/text/default';

import * as Data from './dex-data';

const BASE_MOD = 'gen9' as ID;

function merge(learnsets: {Learnsets: ModdedLearnsetData}, legality: {Legality: ModdedLearnsetData}) {
	const merged: {Learnsets: ModdedLearnsetData} = {...learnsets};
	for (const id in legality.Legality) {
		// @ts-ignore
		merged.Learnsets[id] = {...merged.Learnsets[id], ...legality.Legality[id]};
	}
	return merged;
}

const dexData = {
	gen1, gen2: {...gen2, ...merge(learn2, legality2)}, gen3,
	gen4, gen5, gen6: {...gen6, ...merge(learn6, legality6)},
	gen7, gen8, gen9: {...gen9, ...formats9, ...merge(learn9, legality9)},
};

const dexes: {[mod: string]: ModdedDex} = Object.create(null);

type DataType =
	'Abilities' | 'Rulesets' | 'FormatsData' | 'Items' | 'Learnsets' | 'Moves' |
	'Natures' | 'Pokedex' | 'Scripts' | 'Conditions' | 'TypeChart';
const DATA_TYPES: (DataType | 'Aliases')[] = [
	'Abilities', 'Rulesets', 'FormatsData', 'Items', 'Learnsets', 'Moves',
	'Natures', 'Pokedex', 'Scripts', 'Conditions', 'TypeChart',
];

interface DexTable<T> {
	[key: string]: T;
}

interface DexTableData {
	Abilities: DexTable<AbilityData>;
	Conditions: DexTable<EffectData>;
	Rulesets: DexTable<FormatData>;
	FormatsData: DexTable<import('./dex-species').ModdedSpeciesFormatsData>;
	Items: DexTable<ItemData>;
	Learnsets: DexTable<LearnsetData>;
	Moves: DexTable<MoveData>;
	Natures: DexTable<NatureData>;
	Pokedex: DexTable<SpeciesData>;
	TypeChart: DexTable<TypeData>;

	Aliases: {[id: string]: string};
	Scripts: ModdedBattleScriptsData; // NB: Not a DexTable, but PS is dumb AF

	Species: DexTable<SpeciesData>;
	Types: DexTable<TypeData>;
}

const TEXT = {
	Abilities: AbilitiesText as DexTable<AbilityText>,
	Items: ItemsText as DexTable<ItemText>,
	Moves: MovesText as DexTable<MoveText>,
	// Pokedex: PokedexText as DexTable<PokedexText>,
	Default: DefaultText as DexTable<AnyObject>,
};

/* eslint-disable @typescript-eslint/array-type */
type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer U>
		? Array<DeepPartial<U>>
		: T[P] extends ReadonlyArray<infer V>
			? ReadonlyArray<DeepPartial<V>>
			: DeepPartial<T[P]>
};
/* eslint-enable @typescript-eslint/array-type */

export type ModData = DeepPartial<ModdedDex['data']>;

export const toID = Data.toID;

export class ModdedDex {
	readonly Data = Data;
	readonly Condition = Condition;
	readonly Ability = Ability;
	readonly Item = Item;
	readonly Move = DataMove;
	readonly Species = Species;
	readonly Format = Format;
	readonly ModdedDex = ModdedDex;

	readonly name = "[ModdedDex]";
	readonly isBase: boolean;
	readonly currentMod: string;

	readonly toID = Data.toID;

	readonly formats: DexFormats;
	readonly abilities: DexAbilities;
	readonly items: DexItems;
	readonly moves: DexMoves;
	readonly species: DexSpecies;
	readonly learnsets: DexLearnsets;
	readonly conditions: DexConditions;
	readonly natures: Data.DexNatures;
	readonly types: Data.DexTypes;
	readonly stats: Data.DexStats;

	gen = 0;
	parentMod = '';
	modsLoaded = false;

	dataCache: DexTableData | null;

	deepClone = Utils.deepClone;

	constructor(mod = 'base') {
		this.isBase = (mod === 'base');
		this.currentMod = mod;

		this.dataCache = null;

		this.formats = new DexFormats(this);
		this.abilities = new DexAbilities(this);
		this.items = new DexItems(this);
		this.moves = new DexMoves(this);
		this.species = new DexSpecies(this);
		this.learnsets = new DexLearnsets(this);
		this.conditions = new DexConditions(this);
		this.natures = new Data.DexNatures(this);
		this.types = new Data.DexTypes(this);
		this.stats = new Data.DexStats(this);
	}

	get modid() {
		return this.currentMod as ID;
	}

	get data(): DexTableData {
		return this.loadData();
	}

	get dexes(): {[mod: string]: ModdedDex} {
		return dexes;
	}

	mod(mod: string | undefined, modData?: DeepPartial<ModdedDex['data']>): ModdedDex {
		if (!mod) return dexes['base'];
		const modid = toID(mod);
		if (modData?.Types && !modData.TypeChart) modData.TypeChart = modData.Types;
		if (modData?.Species && !modData.Pokedex) modData.Pokedex = modData.Species;
		const dex = (modid in dexes) && !modData ? dexes[modid] : new ModdedDex(modid);
		dex.loadData(modData);
		return dex;
	}

	forGen(gen: number) {
		if (gen < 1 || gen > 9) throw new Error(`Unsupported gen ${gen}`);
		return this.mod(`gen${gen}`);
	}

	forFormat(format: Format | string): ModdedDex {
		const mod = this.formats.get(format).mod;
		return dexes[mod || BASE_MOD].includeData();
	}

	modData(dataType: DataType, id: string) {
		if (dataType === 'Scripts') throw new Error(`'${dataType}' cannot be indexed by '${id}'`);
		if (this.isBase) return this.data[dataType][id];
		if (this.data[dataType][id] !== dexes[this.parentMod].data[dataType][id]) return this.data[dataType][id];
		return (this.data[dataType][id] = Utils.deepClone(this.data[dataType][id]));
	}

	effectToString() {
		return this.name;
	}

	/**
	 * Sanitizes a username or Pokemon nickname
	 *
	 * Returns the passed name, sanitized for safe use as a name in the PS
	 * protocol.
	 *
	 * Such a string must uphold these guarantees:
	 * - must not contain any ASCII whitespace character other than a space
	 * - must not start or end with a space character
	 * - must not contain any of: | , [ ]
	 * - must not be the empty string
	 * - must not contain Unicode RTL control characters
	 *
	 * If no such string can be found, returns the empty string. Calling
	 * functions are expected to check for that condition and deal with it
	 * accordingly.
	 *
	 * getName also enforces that there are not multiple consecutive space
	 * characters in the name, although this is not strictly necessary for
	 * safety.
	 */
	getName(name: any): string {
		if (typeof name !== 'string' && typeof name !== 'number') return '';
		name = ('' + name).replace(/[|\s[\],\u202e]+/g, ' ').trim();
		if (name.length > 18) name = name.substr(0, 18).trim();

		// remove zalgo
		name = name.replace(
			/[\u0300-\u036f\u0483-\u0489\u0610-\u0615\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06ED\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]{3,}/g,
			''
		);
		name = name.replace(/[\u239b-\u23b9]/g, '');

		return name;
	}

	/**
	 * Returns false if the target is immune; true otherwise.
	 * Also checks immunity to some statuses.
	 */
	getImmunity(
		source: {type: string} | string,
		target: {getTypes: () => string[]} | {types: string[]} | string[] | string
	): boolean {
		const sourceType: string = typeof source !== 'string' ? source.type : source;
		// @ts-ignore
		const targetTyping: string[] | string = target.getTypes?.() || target.types || target;
		if (Array.isArray(targetTyping)) {
			for (const type of targetTyping) {
				if (!this.getImmunity(sourceType, type)) return false;
			}
			return true;
		}
		const typeData = this.types.get(targetTyping);
		if (typeData && typeData.damageTaken[sourceType] === 3) return false;
		return true;
	}

	getEffectiveness(
		source: {type: string} | string,
		target: {getTypes: () => string[]} | {types: string[]} | string[] | string
	): number {
		const sourceType: string = typeof source !== 'string' ? source.type : source;
		// @ts-ignore
		const targetTyping: string[] | string = target.getTypes?.() || target.types || target;
		let totalTypeMod = 0;
		if (Array.isArray(targetTyping)) {
			for (const type of targetTyping) {
				totalTypeMod += this.getEffectiveness(sourceType, type);
			}
			return totalTypeMod;
		}
		const typeData = this.types.get(targetTyping);
		if (!typeData) return 0;
		switch (typeData.damageTaken[sourceType]) {
		case 1: return 1; // super-effective
		case 2: return -1; // resist
		// in case of weird situations like Gravity, immunity is handled elsewhere
		default: return 0;
		}
	}

	getDescs(table: keyof typeof TEXT, id: ID, dataEntry: AnyObject) {
		if (dataEntry.shortDesc) {
			return {
				desc: dataEntry.desc,
				shortDesc: dataEntry.shortDesc,
			};
		}
		const entry = TEXT[table][id];
		if (!entry) return null;
		const descs = {
			desc: '',
			shortDesc: '',
		};
		for (let i = this.gen; i < dexes['base'].gen; i++) {
			const curDesc = entry[`gen${i}` as keyof typeof entry]?.desc;
			const curShortDesc = entry[`gen${i}` as keyof typeof entry]?.shortDesc;
			if (!descs.desc && curDesc) {
				descs.desc = curDesc;
			}
			if (!descs.shortDesc && curShortDesc) {
				descs.shortDesc = curShortDesc;
			}
			if (descs.desc && descs.shortDesc) break;
		}
		if (!descs.shortDesc) descs.shortDesc = entry.shortDesc || '';
		if (!descs.desc) descs.desc = entry.desc || descs.shortDesc;
		return descs;
	}

	/**
	 * Ensure we're working on a copy of a move (and make a copy if we aren't)
	 *
	 * Remember: "ensure" - by default, it won't make a copy of a copy:
	 *     moveCopy === Dex.getActiveMove(moveCopy)
	 *
	 * If you really want to, use:
	 *     moveCopyCopy = Dex.getActiveMove(moveCopy.id)
	 */
	getActiveMove(move: Move | string): ActiveMove {
		if (move && typeof (move as ActiveMove).hit === 'number') return move as ActiveMove;
		move = this.moves.get(move);
		const moveCopy: ActiveMove = Utils.deepClone(move);
		moveCopy.hit = 0;
		return moveCopy;
	}

	getHiddenPower(ivs: AnyObject) {
		const hpTypes = [
			'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
			'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark',
		];
		const tr = this.trunc;
		const stats = {hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
		if (this.gen <= 2) {
			// Gen 2 specific Hidden Power check. IVs are still treated 0-31 so we get them 0-15
			const atkDV = tr(ivs.atk / 2);
			const defDV = tr(ivs.def / 2);
			const speDV = tr(ivs.spe / 2);
			const spcDV = tr(ivs.spa / 2);
			return {
				type: hpTypes[4 * (atkDV % 4) + (defDV % 4)],
				power: tr(
					(5 * ((spcDV >> 3) + (2 * (speDV >> 3)) + (4 * (defDV >> 3)) + (8 * (atkDV >> 3))) + (spcDV % 4)) / 2 + 31
				),
			};
		} else {
			// Hidden Power check for Gen 3 onwards
			let hpTypeX = 0;
			let hpPowerX = 0;
			let i = 1;
			for (const s in stats) {
				hpTypeX += i * (ivs[s] % 2);
				hpPowerX += i * (tr(ivs[s] / 2) % 2);
				i *= 2;
			}
			return {
				type: hpTypes[tr(hpTypeX * 15 / 63)],
				// After Gen 6, Hidden Power is always 60 base power
				power: (this.gen && this.gen < 6) ? tr(hpPowerX * 40 / 63) + 30 : 60,
			};
		}
	}

	/**
	 * Truncate a number into an unsigned 32-bit integer, for
	 * compatibility with the cartridge games' math systems.
	 */
	trunc(num: number, bits = 0) {
		if (bits) return (num >>> 0) % (2 ** bits);
		return num >>> 0;
	}

	loadDataFile(mod: string, dataType: DataType | 'Aliases', modData?: DeepPartial<ModdedDex['data']>): AnyObject {
		if (modData) return modData[dataType] || {};
		return (dexData as any)[mod === 'base' ? BASE_MOD : mod][dataType] || {};
	}

	includeMods(): this {
		return this;
	}

	includeModData(): this {
		for (const mod in this.dexes) {
			dexes[mod].includeData();
		}
		return this;
	}

	includeData(): this {
		this.loadData();
		return this;
	}

	loadData(modData?: DeepPartial<ModdedDex['data']>): DexTableData {
		if (this.dataCache) return this.dataCache;
		const dataCache: {[k in keyof DexTableData]?: any} = {};

		const Scripts = this.loadDataFile(this.currentMod, 'Scripts', modData);
		this.parentMod = this.isBase ? '' : (Scripts.inherit || 'base');

		let parentDex;
		if (this.parentMod) {
			parentDex = dexes[this.parentMod];
			if (!parentDex || parentDex === this) {
				throw new Error(
					`Unable to load ${this.currentMod}. 'inherit' should specify a parent mod from which to inherit data, or must be not specified.`
				);
			}
		}

		if (!parentDex) {
			// Formats are inherited by mods and used by Rulesets
			this.includeFormats();
		}
		for (const dataType of DATA_TYPES.concat('Aliases')) {
			const BattleData = this.loadDataFile(this.currentMod, dataType, modData);
			if (BattleData !== dataCache[dataType]) dataCache[dataType] = Object.assign(BattleData, dataCache[dataType]);
			if (dataType === 'Rulesets' && !parentDex) {
				for (const format of this.formats.all()) {
					BattleData[format.id] = {...format, ruleTable: null};
				}
			}
		}
		if (parentDex) {
			for (const dataType of DATA_TYPES) {
				const parentTypedData: any = parentDex.data[dataType];
				const childTypedData = dataCache[dataType] || (dataCache[dataType] = {});
				for (const entryId in parentTypedData) {
					if (childTypedData[entryId] === null) {
						// null means don't inherit
						delete childTypedData[entryId];
					} else if (!(entryId in childTypedData)) {
						// If it doesn't exist it's inherited from the parent data
						if (dataType === 'Pokedex') {
							// Pokedex entries can be modified too many different ways
							// e.g. inheriting different formats-data/learnsets
							childTypedData[entryId] = Utils.deepClone((parentTypedData as DexTableData['Pokedex'])[entryId]);
						} else {
							childTypedData[entryId] = parentTypedData[entryId];
						}
					} else if (childTypedData[entryId]?.inherit) {
						// {inherit: true} can be used to modify only parts of the parent data,
						// instead of overwriting entirely
						delete childTypedData[entryId].inherit;

						// Merge parent into children entry, preserving existing childs' properties.
						// @ts-ignore
						for (const key in parentTypedData[entryId]) {
							if (key in childTypedData[entryId]) continue;
							// @ts-ignore
							childTypedData[entryId][key] = parentTypedData[entryId][key];
						}
					}
				}
			}
			dataCache['Aliases'] = parentDex.data['Aliases'];
		}

		// Flag the generation. Required for team validator.
		this.gen = dataCache.Scripts.gen;
		if (!this.gen) throw new Error(`Mod ${this.currentMod} needs a generation number in scripts.js`);

		dataCache.Types = dataCache.TypeChart;
		dataCache.Species = dataCache.Pokedex;

		this.dataCache = dataCache as DexTableData;

		// Execute initialization script.
		if (Scripts.init) Scripts.init.call(this);

		return this.dataCache;
	}

	includeFormats(): this {
		this.formats.load();
		return this;
	}
}

dexes['base'] = new ModdedDex();
dexes['gen1'] = new ModdedDex('gen1');
dexes['gen2'] = new ModdedDex('gen2');
dexes['gen3'] = new ModdedDex('gen3');
dexes['gen4'] = new ModdedDex('gen4');
dexes['gen5'] = new ModdedDex('gen5');
dexes['gen6'] = new ModdedDex('gen6');
dexes['gen7'] = new ModdedDex('gen7');
dexes['gen8'] = new ModdedDex('gen8');

// "gen9" is an alias for the current base data
dexes[BASE_MOD] = dexes['base'];
dexes['base'].includeModData();

export const Dex = dexes['base'];
export namespace Dex {
	export type Species = import('./dex-species').Species;
	export type Item = import('./dex-items').Item;
	export type Move = import('./dex-moves').Move;
	export type Ability = import('./dex-abilities').Ability;

	export type HitEffect = import('./dex-moves').HitEffect;
	export type SecondaryEffect = import('./dex-moves').SecondaryEffect;
	export type RuleTable = import('./dex-formats').RuleTable;
}
