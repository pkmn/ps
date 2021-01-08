import {Team, Teams} from '@pkmn/sets';
import {Utils} from '../lib/utils';
import {Condition} from './dex-conditions';
import {DataMove} from './dex-moves';
import {Item} from './dex-items';
import {Ability} from './dex-abilities';
import {Species} from './dex-species';
import {Format, RuleTable, ComplexBan, ComplexTeamBan} from './dex-formats';
import {
	AbilityData,
	AbilityText,
	ActiveMove,
	AnyObject,
	DexTable,
	Effect,
	EffectData,
	FormatData,
	ID,
	ItemData,
	ItemText,
	LearnsetData,
	ModdedBattleScriptsData,
	Move,
	MoveData,
	MoveText,
	Nature,
	NatureData,
	PlayerOptions,
	PokemonSet,
	SpeciesData,
	TypeData,
	TypeInfo,
} from './exported-global-types';

import * as gen1 from '../data/mods/gen1';
import * as gen2 from '../data/mods/gen2';
import * as gen3 from '../data/mods/gen3';
import * as gen4 from '../data/mods/gen4';
import * as gen5 from '../data/mods/gen5';
import * as gen6 from '../data/mods/gen6';
import * as gen7 from '../data/mods/gen7';
import * as gen8 from '../data';

import {AbilitiesText} from '../data/text/abilities';
import {ItemsText} from '../data/text/items';
import {MovesText} from '../data/text/moves';
// import {PokedexText} from '../data/text/pokedex';
import {DefaultText} from '../data/text/default';

import * as Data from './dex-data';
import {PRNG, PRNGSeed} from './prng';

import {Formats} from '../config/formats';

const BASE_MOD = 'gen8' as ID;
const DEFAULT_MOD = BASE_MOD;

const dexData = {gen1, gen2, gen3, gen4, gen5, gen6, gen7, gen8};
const dexes: {[mod: string]: ModdedDex} = Object.create(null);

type DataType =
	'Abilities' | 'Formats' | 'FormatsData' | 'Items' | 'Learnsets' | 'Moves' |
	'Natures' | 'Pokedex' | 'Scripts' | 'Conditions' | 'TypeChart';
const DATA_TYPES: (DataType | 'Aliases')[] = [
	'Abilities', 'Formats', 'FormatsData', 'Items', 'Learnsets', 'Moves',
	'Natures', 'Pokedex', 'Scripts', 'Conditions', 'TypeChart',
];

const nullEffect: Condition = new Condition({name: '', exists: false});

interface DexTableData {
	Abilities: DexTable<AbilityData>;
	Conditions: DexTable<EffectData>;
	Formats: DexTable<FormatData>;
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

interface TeamGenerator {
	prng: PRNG;
	getTeam(options?: PlayerOptions): PokemonSet[];
	setSeed(prng?: PRNG | PRNGSeed): void;
}

interface TeamGeneratorFactory {
	getTeamGenerator(format: Format | string, seed: PRNG | PRNGSeed | null): TeamGenerator;
}

// eslint-disable-next-line no-var
var teamGeneratorFactory: TeamGeneratorFactory | undefined;

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

	readonly abilityCache = new Map<ID, Ability>();
	readonly effectCache = new Map<ID, Effect | Move>();
	readonly itemCache = new Map<ID, Item>();
	readonly learnsetCache = new Map<ID, LearnsetData>();
	readonly moveCache = new Map<ID, Move>();
	readonly speciesCache = new Map<ID, Species>();
	readonly natureCache = new Map<ID, Nature>();
	readonly typeCache = new Map<string, TypeInfo>();

	gen = 0;
	parentMod = '';
	modsLoaded = false;

	dataCache: DexTableData | null;
	formatsCache: DexTable<Format> | null;

	deepClone = Utils.deepClone;

	constructor(mod = 'base') {
		this.isBase = (mod === 'base');
		this.currentMod = mod;

		this.dataCache = null;
		this.formatsCache = null;
	}

	get modid() {
		return this.currentMod as ID;
	}

	get data(): DexTableData {
		return this.loadData();
	}

	get formats(): DexTable<Format> {
		this.includeFormats();
		return this.formatsCache!;
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
		if (!gen) return this;
		return this.mod(`gen${gen}`);
	}

	forFormat(format: Format | string): ModdedDex {
		const mod = this.getFormat(format).mod;
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
			// eslint-disable-next-line max-len
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
		const typeData = this.data.TypeChart[targetTyping];
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
		const typeData = this.data.TypeChart[targetTyping];
		if (!typeData) return 0;
		switch (typeData.damageTaken[sourceType]) {
		case 1: return 1; // super-effective
		case 2: return -1; // resist
		// in case of weird situations like Gravity, immunity is handled elsewhere
		default: return 0;
		}
	}

	getSpecies(name?: string | Species): Species {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		let id = toID(name);
		if (id === 'nidoran' && name.endsWith('♀')) {
			id = 'nidoranf' as ID;
		} else if (id === 'nidoran' && name.endsWith('♂')) {
			id = 'nidoranm' as ID;
		}
		let species: any = this.speciesCache.get(id);
		if (species) return species;
		if (this.data.Aliases.hasOwnProperty(id)) {
			if (this.data.FormatsData.hasOwnProperty(id)) {
				// special event ID, like Rockruff-Dusk
				const baseId = toID(this.data.Aliases[id]);
				species = new Species({name}, this.data.Pokedex[baseId], this.data.FormatsData[id], this.data.Learnsets[id]);
				species.name = id;
				species.species = id;
				species.speciesid = id;
				species.abilities = {0: species.abilities['S']};
			} else {
				species = this.getSpecies(this.data.Aliases[id]);
				if (species.cosmeticFormes) {
					for (const forme of species.cosmeticFormes) {
						if (toID(forme) === id) {
							species = new Species(species, {
								name: forme,
								id,
								forme: forme.slice(species.name.length + 1),
								baseForme: "",
								baseSpecies: species.name,
								otherFormes: null,
								cosmeticFormes: null,
							});
							break;
						}
					}
				}
			}
			if (species) {
				this.speciesCache.set(id, species);
			}
			return species;
		}
		if (!this.data.Pokedex.hasOwnProperty(id)) {
			let aliasTo = '';
			const formeNames: {[k: string]: string[]} = {
				alola: ['a', 'alola', 'alolan'],
				galar: ['g', 'galar', 'galarian'],
				gmax: ['gigantamax', 'gmax'],
				mega: ['m', 'mega'],
				primal: ['p', 'primal'],
			};
			for (const forme in formeNames) {
				let pokeName = '';
				for (const i of formeNames[forme]) {
					if (id.startsWith(i)) {
						pokeName = id.slice(i.length);
					} else if (id.endsWith(i)) {
						pokeName = id.slice(0, -i.length);
					}
				}
				if (this.data.Aliases.hasOwnProperty(pokeName)) pokeName = toID(this.data.Aliases[pokeName]);
				if (this.data.Pokedex[pokeName + forme]) {
					aliasTo = pokeName + forme;
					break;
				}
			}
			if (aliasTo) {
				species = this.getSpecies(aliasTo);
				if (species.exists) {
					this.speciesCache.set(id, species);
					return species;
				}
			}
		}
		if (id && this.data.Pokedex.hasOwnProperty(id)) {
			species = new Species({name}, this.data.Pokedex[id], this.data.FormatsData[id]);
			// Inherit any statuses from the base species (Arceus, Silvally).
			const baseSpeciesStatuses = this.data.Conditions[toID(species.baseSpecies)];
			if (baseSpeciesStatuses !== undefined) {
				let key: keyof EffectData;
				for (key in baseSpeciesStatuses) {
					if (!(key in species)) species[key] = baseSpeciesStatuses[key];
				}
			}
			if (!species.tier && !species.doublesTier && species.baseSpecies !== species.name) {
				if (species.baseSpecies === 'Mimikyu') {
					species.tier = this.data.FormatsData[toID(species.baseSpecies)].tier || 'Illegal';
					species.doublesTier = this.data.FormatsData[toID(species.baseSpecies)].doublesTier || 'Illegal';
				} else if (species.id.endsWith('totem')) {
					species.tier = this.data.FormatsData[species.id.slice(0, -5)].tier || 'Illegal';
					species.doublesTier = this.data.FormatsData[species.id.slice(0, -5)].doublesTier || 'Illegal';
				} else if (species.battleOnly) {
					species.tier = this.data.FormatsData[toID(species.battleOnly)].tier || 'Illegal';
					species.doublesTier = this.data.FormatsData[toID(species.battleOnly)].doublesTier || 'Illegal';
				} else {
					const baseFormatsData = this.data.FormatsData[toID(species.baseSpecies)];
					if (!baseFormatsData) {
						throw new Error(`${species.baseSpecies} has no formats-data entry`);
					}
					species.tier = baseFormatsData.tier || 'Illegal';
					species.doublesTier = baseFormatsData.doublesTier || 'Illegal';
				}
			}
			if (!species.tier) species.tier = 'Illegal';
			if (!species.doublesTier) species.doublesTier = species.tier;
			if (species.gen > this.gen) {
				species.tier = 'Illegal';
				species.doublesTier = 'Illegal';
				species.isNonstandard = 'Future';
			}
			if (this.currentMod === 'letsgo' && !species.isNonstandard) {
				const isLetsGo = (
					(species.num <= 151 || ['Meltan', 'Melmetal'].includes(species.name)) &&
					(!species.forme || ['Alola', 'Mega', 'Mega-X', 'Mega-Y', 'Starter'].includes(species.forme))
				);
				if (!isLetsGo) species.isNonstandard = 'Past';
			}
			species.nfe = species.evos.length && this.getSpecies(species.evos[0]).gen <= this.gen;
			species.canHatch = species.canHatch ||
				(!['Ditto', 'Undiscovered'].includes(species.eggGroups[0]) && !species.prevo && species.name !== 'Manaphy');
			if (this.gen === 1) species.bst -= species.baseStats.spd;
		} else {
			species = new Species({
				id, name, exists: false, tier: 'Illegal', doublesTier: 'Illegal', isNonstandard: 'Custom',
			});
		}
		species.kind = 'Species';
		if (species.exists) this.speciesCache.set(id, species);
		return species;
	}

	getLearnsetData(id: ID): LearnsetData {
		let learnsetData = this.learnsetCache.get(id);
		if (learnsetData) return learnsetData;
		if (!this.data.Learnsets.hasOwnProperty(id)) {
			learnsetData = new Data.Learnset({});
			learnsetData.exists = false;
		} else {
			learnsetData = new Data.Learnset(this.data.Learnsets[id]);
		}
		(learnsetData as any).kind = 'Learnset';
		if (learnsetData.exists) this.learnsetCache.set(id, learnsetData);
		return learnsetData;
	}

	async getLearnset(name?: string) {
		return Promise.resolve(this.getLearnsetData(toID(name)) as Data.Learnset);
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
			const curDesc = entry[`gen${i}`]?.desc;
			const curShortDesc = entry[`gen${i}`]?.shortDesc;
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

	getMove(name?: string | Move): Move {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		let id = toID(name);
		let move = this.moveCache.get(id);
		if (move) return move;
		if (this.data.Aliases.hasOwnProperty(id)) {
			move = this.getMove(this.data.Aliases[id]);
			if (move.exists) {
				this.moveCache.set(id, move);
			}
			return move;
		}
		if (id.substr(0, 11) === 'hiddenpower') {
			id = /([a-z]*)([0-9]*)/.exec(id)![1] as ID;
		}
		if (id && this.data.Moves.hasOwnProperty(id)) {
			const moveData = this.data.Moves[id];
			const moveTextData = this.getDescs('Moves', id, moveData);
			move = new DataMove({name}, moveData, moveTextData);
			if (move.gen > this.gen) {
				(move as any).isNonstandard = 'Future';
			}
		} else {
			move = new DataMove({id, name, exists: false});
		}
		if (move.exists) this.moveCache.set(id, move);
		return move;
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
		move = this.getMove(move);
		const moveCopy: ActiveMove = Utils.deepClone(move);
		moveCopy.hit = 0;
		return moveCopy;
	}

	/**
	 * While this function can technically return any kind of effect at
	 * all, that's not a feature TypeScript needs to know about.
	 */
	getEffect(name?: string | Effect | null): Condition {
		if (!name) return nullEffect;
		if (typeof name !== 'string') return name as Condition;

		const id = toID(name);
		let effect = this.effectCache.get(id);
		if (effect) return effect as Condition;

		if (name.startsWith('move:')) {
			effect = this.getMove(name.slice(5));
		} else if (name.startsWith('item:')) {
			effect = this.getItem(name.slice(5));
		} else if (name.startsWith('ability:')) {
			effect = this.getAbility(name.slice(8));
		}
		if (effect) {
			this.effectCache.set(id, effect);
			// @ts-ignore
			return effect;
		}
		return this.getEffectByID(id, effect);
	}

	getEffectByID(id: ID, effect?: Effect | Move): Condition {
		if (!id) return nullEffect;

		if (!effect) effect = this.effectCache.get(id);
		if (effect) return effect as Condition;

		let found;
		if (this.data.Formats.hasOwnProperty(id)) {
			effect = new Format({name: id}, this.data.Formats[id]);
		} else if (this.data.Conditions.hasOwnProperty(id)) {
			effect = new Condition({name: id, kind: 'Condition'}, this.data.Conditions[id]);
		} else if ((this.data.Moves.hasOwnProperty(id) && (found = this.data.Moves[id]).condition) ||
							 (this.data.Abilities.hasOwnProperty(id) &&
								(found = this.data.Abilities[id]).condition) ||
							 (this.data.Items.hasOwnProperty(id) && (found = this.data.Items[id]).condition)) {
			effect = new Condition({name: found.name || id, kind: 'Condition'}, found.condition);
		} else if (id === 'recoil') {
			effect = new Condition({id, name: 'Recoil', effectType: 'Recoil', kind: 'Condition'});
		} else if (id === 'drain') {
			effect = new Condition({id, name: 'Drain', effectType: 'Drain', kind: 'Condition'});
		} else {
			effect = new Condition({id, name: id, kind: 'Condition', exists: false});
		}

		this.effectCache.set(id, effect);
		return effect as Condition;
	}

	/**
	 * Returns a sanitized format ID if valid, or throws if invalid.
	 */
	validateFormat(name: string) {
		const [formatName, customRulesString] = name.split('@@@', 2);
		const format = this.getFormat(formatName);
		if (!format.exists) throw new Error(`Unrecognized format "${formatName}"`);
		if (!customRulesString) return format.id;
		const ruleTable = this.getRuleTable(format);
		const customRules = customRulesString.split(',').map(rule => {
			rule = rule.replace(/[\r\n|]*/g, '').trim();
			const ruleSpec = this.validateRule(rule);
			if (typeof ruleSpec === 'string' && ruleTable.has(ruleSpec)) return null;
			return rule;
		}).filter(Boolean);
		if (!customRules.length) throw new Error(`The format already has your custom rules`);
		const validatedFormatid = format.id + '@@@' + customRules.join(',');
		const moddedFormat = this.getFormat(validatedFormatid, true);
		this.getRuleTable(moddedFormat);
		return validatedFormatid;
	}

	getFormat(name?: string | Format, isTrusted = false): Format {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		let id = toID(name);
		if (this.data.Aliases.hasOwnProperty(id)) {
			name = this.data.Aliases[id];
			id = toID(name);
		}
		if (this.data.Formats.hasOwnProperty(DEFAULT_MOD + id)) {
			id = (DEFAULT_MOD + id) as ID;
		}
		let supplementaryAttributes: AnyObject | null = null;
		if (name.includes('@@@')) {
			if (!isTrusted) {
				try {
					name = this.validateFormat(name);
					isTrusted = true;
				} catch (e) {}
			}
			const [newName, customRulesString] = name.split('@@@', 2);
			name = newName;
			id = toID(name);
			if (isTrusted && customRulesString) {
				supplementaryAttributes = {
					customRules: customRulesString.split(','),
					searchShow: false,
				};
			}
		}
		let effect;
		if (this.data.Formats.hasOwnProperty(id)) {
			effect = new Format({name}, this.data.Formats[id], supplementaryAttributes);
		} else {
			effect = new Format({id, name, exists: false});
		}
		return effect;
	}

	getItem(name?: string | Item): Item {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		const id = toID(name);
		let item = this.itemCache.get(id);
		if (item) return item;
		if (this.data.Aliases.hasOwnProperty(id)) {
			item = this.getItem(this.data.Aliases[id]);
			if (item.exists) {
				this.itemCache.set(id, item);
			}
			return item;
		}
		if (id && !this.data.Items[id] && this.data.Items[id + 'berry']) {
			item = this.getItem(id + 'berry');
			this.itemCache.set(id, item);
			return item;
		}
		if (id && this.data.Items.hasOwnProperty(id)) {
			const itemData = this.data.Items[id];
			const itemTextData = this.getDescs('Items', id, itemData);
			item = new Item({name}, itemData, itemTextData);
			if (item.gen > this.gen) {
				(item as any).isNonstandard = 'Future';
			}
			// hack for allowing mega evolution in LGPE
			if (this.currentMod === 'letsgo' && !item.isNonstandard && !item.megaStone) {
				(item as any).isNonstandard = 'Past';
			}
		} else {
			item = new Item({id, name, exists: false});
		}
		(item as any).kind = 'Item';

		if (item.exists) this.itemCache.set(id, item);
		return item;
	}

	getAbility(name?: string | Ability): Ability {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		const id = toID(name);
		let ability = this.abilityCache.get(id);
		if (ability) return ability;
		if (this.data.Aliases.hasOwnProperty(id)) {
			ability = this.getAbility(this.data.Aliases[id]);
			if (ability.exists) {
				this.abilityCache.set(id, ability);
			}
			return ability;
		}
		if (id && this.data.Abilities.hasOwnProperty(id)) {
			const abilityData = this.data.Abilities[id];
			const abilityTextData = this.getDescs('Abilities', id, abilityData);
			ability = new Ability({name}, abilityData, abilityTextData);
			if (ability.gen > this.gen) {
				(ability as any).isNonstandard = 'Future';
			}
			if (this.currentMod === 'letsgo' && ability.id !== 'noability') {
				(ability as any).isNonstandard = 'Past';
			}
			if ((this.currentMod === 'letsgo' || this.gen <= 2) && ability.id === 'noability') {
				(ability as any).isNonstandard = null;
			}
		} else {
			ability = new Ability({id, name, exists: false});
		}
		(ability as any).kind = 'Ability';

		if (ability.exists) this.abilityCache.set(id, ability);
		return ability;
	}

	hasAbility(species: Species, ability: string) {
		for (const i in species.abilities) {
			if (ability === (species.abilities as any)[i]) return true;
		}
		return false;
	}

	getType(name?: string | TypeInfo): TypeInfo {
		if (name && typeof name !== 'string') return name;

		const id = toID(name);
		const typeName = id.charAt(0).toUpperCase() + id.substr(1);
		let type = this.typeCache.get(typeName);
		if (type) return type;
		if (typeName && this.data.TypeChart.hasOwnProperty(typeName)) {
			type = new Data.TypeInfo({id, name: typeName}, this.data.TypeChart[typeName]);
		} else {
			type = new Data.TypeInfo({id, name, exists: false, effectType: 'EffectType'});
		}
		(type as any).kind = 'Type';

		if (type.exists) this.typeCache.set(id, type);
		return type;
	}

	getNature(name: string | Nature): Nature {
		if (name && typeof name !== 'string') return name;

		name = (name || '').trim();
		const id = toID(name);
		let nature = this.natureCache.get(id);
		if (nature) return nature;
		if (this.data.Aliases.hasOwnProperty(id)) {
			nature = this.getNature(this.data.Aliases[id]);
			if (nature.exists) {
				this.natureCache.set(id, nature);
			}
			return nature;
		}
		if (id && this.data.Natures.hasOwnProperty(id)) {
			const natureData = this.data.Natures[id];
			nature = new Data.Nature(natureData);
			if (nature.gen > this.gen) nature.isNonstandard = 'Future';
		} else {
			nature = new Data.Nature({id, name, exists: false});
		}
		(nature as any).kind = 'Nature';

		if (nature.exists) this.natureCache.set(id, nature);
		return nature;
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

	getRuleTable(format: Format, depth = 1, repeals?: Map<string, number>): RuleTable {
		if (format.ruleTable && !repeals) return format.ruleTable;
		if (depth === 1 && dexes[format.mod || 'base'] !== this) {
			// throw new Error(`${format.mod} ${this.currentMod}`);
			return this.mod(format.mod).getRuleTable(format, depth + 1);
		}
		const ruleTable = new RuleTable();

		const ruleset = format.ruleset.slice();
		for (const ban of format.banlist) {
			ruleset.push('-' + ban);
		}
		for (const ban of format.restricted) {
			ruleset.push('*' + ban);
		}
		for (const ban of format.unbanlist) {
			ruleset.push('+' + ban);
		}
		if (format.customRules) {
			ruleset.push(...format.customRules);
		}
		if (format.checkCanLearn) {
			ruleTable.checkCanLearn = [format.checkCanLearn, format.name];
		}
		if (format.timer) {
			ruleTable.timer = [format.timer, format.name];
		}
		if (format.minSourceGen) {
			ruleTable.minSourceGen = [format.minSourceGen, format.name];
		}

		// apply rule repeals before other rules
		// repeals is a ruleid:depth map
		for (const rule of ruleset) {
			if (rule.startsWith('!')) {
				const ruleSpec = this.validateRule(rule, format) as string;
				if (!repeals) repeals = new Map();
				repeals.set(ruleSpec.slice(1), depth);
			}
		}

		for (const rule of ruleset) {
			const ruleSpec = this.validateRule(rule, format);

			if (typeof ruleSpec !== 'string') {
				if (ruleSpec[0] === 'complexTeamBan') {
					const complexTeamBan: ComplexTeamBan = ruleSpec.slice(1) as ComplexTeamBan;
					ruleTable.addComplexTeamBan(complexTeamBan[0], complexTeamBan[1], complexTeamBan[2], complexTeamBan[3]);
				} else if (ruleSpec[0] === 'complexBan') {
					const complexBan: ComplexBan = ruleSpec.slice(1) as ComplexBan;
					ruleTable.addComplexBan(complexBan[0], complexBan[1], complexBan[2], complexBan[3]);
				} else {
					throw new Error(`Unrecognized rule spec ${ruleSpec}`);
				}
				continue;
			}

			if (rule.startsWith('!')) {
				const repealDepth = repeals!.get(ruleSpec.slice(1));
				if (repealDepth === undefined) throw new Error(`Multiple "${rule}" rules in ${format.name}`);
				if (repealDepth === depth) {
					throw new Error(`Rule "${rule}" did nothing because "${rule.slice(1)}" is not in effect`);
				}
				if (repealDepth === -depth) repeals!.delete(ruleSpec.slice(1));
				continue;
			}

			if ("-*+".includes(ruleSpec.charAt(0))) {
				if (ruleTable.has(ruleSpec)) {
					throw new Error(`Rule "${rule}" was added by "${format.name}" but already exists in "${ruleTable.get(ruleSpec) || format.name}"`);
				}
				for (const prefix of "-*+") ruleTable.delete(prefix + ruleSpec.slice(1));
				ruleTable.set(ruleSpec, '');
				continue;
			}
			const subformat = this.getFormat(ruleSpec);
			if (repeals?.has(subformat.id)) {
				repeals.set(subformat.id, -Math.abs(repeals.get(subformat.id)!));
				continue;
			}
			if (ruleTable.has(subformat.id)) {
				throw new Error(`Rule "${rule}" was added by "${format.name}" but already exists in "${ruleTable.get(subformat.id) || format.name}"`);
			}
			ruleTable.set(subformat.id, '');
			if (!subformat.exists) continue;
			if (depth > 16) {
				throw new Error(`Excessive ruleTable recursion in ${format.name}: ${ruleSpec} of ${format.ruleset}`);
			}
			const subRuleTable = this.getRuleTable(subformat, depth + 1, repeals);
			for (const [k, v] of subRuleTable) {
				// don't check for "already exists" here; multiple inheritance is allowed
				if (!repeals?.has(k)) {
					ruleTable.set(k, v || subformat.name);
				}
			}
			for (const [subRule, source, limit, bans] of subRuleTable.complexBans) {
				ruleTable.addComplexBan(subRule, source || subformat.name, limit, bans);
			}
			for (const [subRule, source, limit, bans] of subRuleTable.complexTeamBans) {
				ruleTable.addComplexTeamBan(subRule, source || subformat.name, limit, bans);
			}
			if (subRuleTable.checkCanLearn) {
				if (ruleTable.checkCanLearn) {
					throw new Error(
						`"${format.name}" has conflicting move validation rules from ` +
						`"${ruleTable.checkCanLearn[1]}" and "${subRuleTable.checkCanLearn[1]}"`
					);
				}
				ruleTable.checkCanLearn = subRuleTable.checkCanLearn;
			}
			if (subRuleTable.timer) {
				if (ruleTable.timer) {
					throw new Error(
						`"${format.name}" has conflicting timer validation rules from "${ruleTable.timer[1]}" and "${subRuleTable.timer[1]}"`
					);
				}
				ruleTable.timer = subRuleTable.timer;
			}
			// minSourceGen is automatically ignored if higher than current gen
			// this helps the common situation where Standard has a minSourceGen in the
			// latest gen but not in any past gens
			if (subRuleTable.minSourceGen && subRuleTable.minSourceGen[0] <= this.gen) {
				if (ruleTable.minSourceGen) {
					throw new Error(
						`"${format.name}" has conflicting minSourceGen from "${ruleTable.minSourceGen[1]}" and "${subRuleTable.minSourceGen[1]}"`
					);
				}
				ruleTable.minSourceGen = subRuleTable.minSourceGen;
			}
		}

		format.ruleTable = ruleTable;
		return ruleTable;
	}

	validateRule(rule: string, format: Format | null = null) {
		if (rule !== rule.trim()) throw new Error(`Rule "${rule}" should be trimmed`);
		switch (rule.charAt(0)) {
		case '-':
		case '*':
		case '+':
			if (format?.team) throw new Error(`We don't currently support bans in generated teams`);
			if (rule.slice(1).includes('>') || rule.slice(1).includes('+')) {
				let buf = rule.slice(1);
				const gtIndex = buf.lastIndexOf('>');
				let limit = rule.startsWith('+') ? Infinity : 0;
				if (gtIndex >= 0 && /^[0-9]+$/.test(buf.slice(gtIndex + 1).trim())) {
					if (limit === 0) limit = parseInt(buf.slice(gtIndex + 1));
					buf = buf.slice(0, gtIndex);
				}
				let checkTeam = buf.includes('++');
				const banNames = buf.split(checkTeam ? '++' : '+').map(v => v.trim());
				if (banNames.length === 1 && limit > 0) checkTeam = true;
				const innerRule = banNames.join(checkTeam ? ' ++ ' : ' + ');
				const bans = banNames.map(v => this.validateBanRule(v));

				if (checkTeam) {
					return ['complexTeamBan', innerRule, '', limit, bans];
				}
				if (bans.length > 1 || limit > 0) {
					return ['complexBan', innerRule, '', limit, bans];
				}
				throw new Error(`Confusing rule ${rule}`);
			}
			return rule.charAt(0) + this.validateBanRule(rule.slice(1));
		default:
			const id = toID(rule);
			if (!this.data.Formats.hasOwnProperty(id)) {
				throw new Error(`Unrecognized rule "${rule}"`);
			}
			if (rule.startsWith('!')) return `!${id}`;
			return id;
		}
	}

	validateBanRule(rule: string) {
		let id = toID(rule);
		if (id === 'unreleased') return 'unreleased';
		if (id === 'nonexistent') return 'nonexistent';
		const matches = [];
		let matchTypes = ['pokemon', 'move', 'ability', 'item', 'nature', 'pokemontag'];
		for (const matchType of matchTypes) {
			if (rule.startsWith(`${matchType}:`)) {
				matchTypes = [matchType];
				id = id.slice(matchType.length) as ID;
				break;
			}
		}
		const ruleid = id;
		if (this.data.Aliases.hasOwnProperty(id)) id = toID(this.data.Aliases[id]);
		for (const matchType of matchTypes) {
			let table;
			switch (matchType) {
			case 'pokemon': table = this.data.Pokedex; break;
			case 'move': table = this.data.Moves; break;
			case 'item': table = this.data.Items; break;
			case 'ability': table = this.data.Abilities; break;
			case 'nature': table = this.data.Natures; break;
			case 'pokemontag':
				// valid pokemontags
				const validTags = [
					// singles tiers
					'uber', 'ou', 'uubl', 'uu', 'rubl', 'ru', 'nubl', 'nu', 'publ', 'pu', 'zu', 'nfe', 'lcuber', 'lc', 'cap', 'caplc', 'capnfe', 'ag',
					// doubles tiers
					'duber', 'dou', 'dbl', 'duu', 'dnu',
					// custom tags
					'mega',
					// illegal/nonstandard reasons
					'past', 'future', 'unobtainable', 'lgpe', 'custom',
					// all
					'allpokemon', 'allitems', 'allmoves', 'allabilities', 'allnatures',
				];
				if (validTags.includes(ruleid)) matches.push('pokemontag:' + ruleid);
				continue;
			default:
				throw new Error(`Unrecognized match type.`);
			}
			if (table.hasOwnProperty(id)) {
				if (matchType === 'pokemon') {
					const species: Species = table[id] as Species;
					if (species.otherFormes && ruleid !== species.id + toID(species.baseForme)) {
						matches.push('basepokemon:' + id);
						continue;
					}
				}
				matches.push(matchType + ':' + id);
			} else if (matchType === 'pokemon' && id.endsWith('base')) {
				id = id.slice(0, -4) as ID;
				if (table.hasOwnProperty(id)) {
					matches.push('pokemon:' + id);
				}
			}
		}
		if (matches.length > 1) {
			throw new Error(`More than one thing matches "${rule}"; please specify one of: ` + matches.join(', '));
		}
		if (matches.length < 1) {
			throw new Error(`Nothing matches "${rule}"`);
		}
		return matches[0];
	}

	shuffle<T>(arr: T[]): T[] {
		// In-place shuffle by Fisher-Yates algorithm
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	/** Forces num to be an integer (between min and max). */
	clampIntRange(num: any, min?: number, max?: number): number {
		if (typeof num !== 'number') num = 0;
		num = Math.floor(num);
		if (min !== undefined && num < min) num = min;
		if (max !== undefined && num > max) num = max;
		return num;
	}

	/**
	 * Truncate a number into an unsigned 32-bit integer, for
	 * compatibility with the cartridge games' math systems.
	 */
	trunc(num: number, bits = 0) {
		if (bits) return (num >>> 0) % (2 ** bits);
		return num >>> 0;
	}

	generateTeam(format: Format | string, options: PlayerOptions | null = null): PokemonSet[] {
		return this.getTeamGenerator(format, options?.seed).getTeam(options || undefined);
	}

	// BUG: SSB3's Easter egg requires we return any here instead of TeamGenerator. *sigh* :(
	getTeamGenerator(format: Format | string, seed: PRNG | PRNGSeed | null = null): any {
		if (!teamGeneratorFactory) {
			throw new Error('getTeamGenerator maybe not be used unless a TeamGeneratorFactory has been set');
		}
		return teamGeneratorFactory.getTeamGenerator(format, seed);
	}

	setTeamGeneratorFactory(factory: TeamGeneratorFactory): this {
		teamGeneratorFactory = factory;
		return this;
	}

	packTeam(team: PokemonSet[] | null): string {
		return new Team(team || []).pack();
	}

	fastUnpackTeam(buf: string): PokemonSet[] | null {
		return Teams.unpackTeam(buf)?.team as PokemonSet[] || null;
	}

	loadDataFile(mod: string, dataType: DataType | 'Aliases', modData?: DeepPartial<ModdedDex['data']>): AnyObject {
		if (modData) return modData[dataType] || {};
		return (dexData as any)[mod === 'base' ? 'gen8' : mod][dataType] || {};
	}

	includeMods(): ModdedDex {
		return this;
	}

	includeModData(): ModdedDex {
		for (const mod in this.dexes) {
			dexes[mod].includeData();
		}
		return this;
	}

	includeData(): ModdedDex {
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

		for (const dataType of DATA_TYPES.concat('Aliases')) {
			const BattleData = this.loadDataFile(this.currentMod, dataType, modData);
			if (BattleData !== dataCache[dataType]) dataCache[dataType] = Object.assign(BattleData, dataCache[dataType]);
			if (dataType === 'Formats' && !parentDex) Object.assign(BattleData, this.formats);
		}
		if (!parentDex) {
			// Formats are inherited by mods
			this.includeFormats();
		} else {
			for (const dataType of DATA_TYPES) {
				const parentTypedData = parentDex.data[dataType];
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
							childTypedData[entryId] = (parentTypedData as any)[entryId];
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

	includeFormats(): ModdedDex {
		if (!this.isBase) throw new Error(`This should only be run on the base mod`);
		if (this.formatsCache) return this;

		if (!this.formatsCache) this.formatsCache = {};

		if (!Array.isArray(Formats)) {
			throw new TypeError(`Exported property 'Formats' from "./config/formats.ts" must be an array`);
		}
		let section = '';
		let column = 1;
		for (const [i, f] of Formats.entries()) {
			const format = f as any; // (writeable) FormatData
			const id = toID(format.name);
			if (format.section) section = format.section;
			if (format.column) column = format.column;
			if (!format.name && format.section) continue;
			if (!id) {
				throw new RangeError(`Format #${i + 1} must have a name with alphanumeric characters, not '${format.name}'`);
			}
			if (!format.section) format.section = section;
			if (!format.column) format.column = column;
			if (this.formatsCache[id]) throw new Error(`Format #${i + 1} has a duplicate ID: '${id}'`);
			format.effectType = 'Format';
			format.baseRuleset = format.ruleset ? format.ruleset.slice() : [];
			if (format.challengeShow === undefined) format.challengeShow = true;
			if (format.searchShow === undefined) format.searchShow = true;
			if (format.tournamentShow === undefined) format.tournamentShow = true;
			if (format.mod === undefined) format.mod = 'gen8';
			if (!dexes[format.mod]) format.exists = false;
			this.formatsCache[id] = format as Format;
		}

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

// "gen8" is an alias for the current base data
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
