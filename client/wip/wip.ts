import * as abilitiesJSON from './data/abilities.json';
import * as aliasesJSON from './data/aliases.json';
import * as formatsDataJSON from './data/formats-data.json';
import * as itemsJSON from './data/items.json';
import * as movesJSON from './data/moves.json';
import * as speciesJSON from './data/species.json';
import * as textJSON from './data/text.json';
import * as typesJSON from './data/types.json';

type DeepReadonly<T> = T extends primitive ? T : DeepReadonlyObject<T>;
type primitive = string | number | boolean | undefined | null | Function | ID;
type DeepReadonlyObject<T> = {
	readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export interface EffectData {
	effectType?: 'Item' | 'Move' | 'Ability';
	num: number;
	affectsFainted?: boolean;
	counterMax?: number;
	desc?: string;
	drain?: number[]; // [number, number]
	duration?: number;
	effect?: Partial<PureEffect>;
	infiltrates?: boolean;
	isNonstandard?: string | null;
	isUnreleased?: boolean | 'Past';
	isZ?: boolean | string;
	isMax?: boolean | string;
	noCopy?: boolean;
	recoil?: number[]; // [number, number]
	shortDesc?: string;
	status?: string;
	weather?: string;
}

export interface AbilityData extends EffectData {
	name: string;
	rating: number;
	isUnbreakable?: boolean;
	suppressWeather?: boolean;
}

export interface ItemData extends EffectData {
	name: string;
	gen: number;
	fling?: {[k: string]: any};
	forcedForme?: string;
	ignoreKlutz?: boolean;
	isBerry?: boolean;
	isChoice?: boolean;
	isGem?: boolean;
	isPokeball?: boolean;
	megaStone?: string;
	megaEvolves?: string;
	naturalGift?: {basePower: number, type: string};
	onDrive?: string;
	onMemory?: string;
	onPlate?: string;
	spritenum?: number;
	zMove?: string | true;
	zMoveFrom?: string;
	zMoveType?: string;
	itemUser?: string[];
	boosts?: {[boost in BoostStatName]?: number} | false;
}

export interface MoveData extends EffectData {
	name: string;
	accuracy: true | number;
	basePower: number;
	category: 'Physical' | 'Special' | 'Status';
	flags: { [k: string]: any };
	pp: number;
	priority: number;
	target: string;
	type: string;
	alwaysHit?: boolean;
	baseMoveType?: string;
	basePowerModifier?: number;
	boosts?: { [boost in BoostStatName]?: number } | false;
	breaksProtect?: boolean;
	contestType?: string;
	critModifier?: number;
	critRatio?: number;
	damage?: number | 'level' | false | null;
	defensiveCategory?: 'Physical' | 'Special' | 'Status';
	forceSwitch?: boolean;
	hasCustomRecoil?: boolean;
	heal?: number[] | null;
	ignoreAbility?: boolean;
	ignoreAccuracy?: boolean;
	ignoreDefensive?: boolean;
	ignoreEvasion?: boolean;
	ignoreImmunity?: boolean | { [k: string]: boolean };
	ignoreNegativeOffensive?: boolean;
	ignoreOffensive?: boolean;
	ignorePositiveDefensive?: boolean;
	ignorePositiveEvasion?: boolean;
	isSelfHit?: boolean;
	isFutureMove?: boolean;
	isViable?: boolean;
	isMax?: boolean | string;
	mindBlownRecoil?: boolean;
	multiaccuracy?: boolean;
	multihit?: number | number[];
	multihitType?: string;
	noDamageVariance?: boolean;
	noFaint?: boolean;
	noMetronome?: string[];
	nonGhostTarget?: string;
	noPPBoosts?: boolean;
	noSketch?: boolean;
	ohko?: boolean | string;
	pressureTarget?: string;
	pseudoWeather?: string;
	selfBoost?: { boosts?: { [boost in BoostStatName]?: number } };
	selfdestruct?: string | boolean;
	selfSwitch?: string | boolean;
	sideCondition?: string;
	sleepUsable?: boolean;
	slotCondition?: string;
	spreadModifier?: number;
	stallingMove?: boolean;
	stealsBoosts?: boolean;
	struggleRecoil?: boolean;
	terrain?: string;
	thawsTarget?: boolean;
	tracksTarget?: boolean;
	smartTarget?: boolean;
	useTargetOffensive?: boolean;
	useSourceDefensiveAsOffensive?: boolean;
	volatileStatus?: string;
	weather?: string;
	willCrit?: boolean;
	forceSTAB?: boolean;
	zMovePower?: number;
	zMoveEffect?: string;
	zMoveBoost?: { [boost in BoostStatName]?: number };
	gmaxPower?: number;
	baseMove?: string;
	isZPowered?: boolean;
	maxPowered?: boolean;
}

export type SpeciesAbility = {0: string, 1?: string, H?: string, S?: string};
export interface SpeciesData extends EffectData {
	abilities: SpeciesAbility;
	baseStats: {[stat in StatName]: number};
	canHatch?: boolean;
	color: string;
	eggGroups: string[];
	heightm: number;
	num: number;
	species: string;
	types: string[];
	weightkg: number;
	baseForme?: string;
	baseSpecies?: string;
	evoLevel?: number;
	evoMove?: string;
	evoCondition?: string;
	evoItem?: string;
	evos?: string[];
	evoType?: string;
	forme?: string;
	gender?: GenderName;
	genderRatio?: {[k in GenderName]?: number};
	maxHP?: number;
	otherForms?: string[];
	otherFormes?: string[];
	prevo?: string;
	inheritsFrom?: string | string[];
}

export interface TypeData {
	damageTaken: {[t in Exclude<TypeName, '???'>]: number} & {[key: string]: number};
	HPdvs?: {[stat in StatName]?: number};
	HPivs?: {[stat in StatName]?: number};
}

export interface Tiering {
	overrideTier: {[id: string]: string};
	zuBans?: {[id: string]: 1};
	nfeBans: {[id: string]: 1};
}

export interface Overrides {
	overrideStats: {[id: string]: {[stat in StatName]?: number}};
	overrideType: {[id: string]: string};
	overrideAbility: {[id: string]: string};
	overrideHiddenAbility: {[id: string]: string};
	removeSecondAbility: {[id: string]: true};
	overrideAcc: {[id: string]: true | number};
	overridePP: {[id: string]: number};
	overrideMoveDesc: {[id: string]: string};
	overrideMoveType: {[id: string]: TypeName};
	overrideItemDesc: {[id: string]: string};
	overrideAbilityDesc: {[id: string]: string};
}
export type PastGens = 'gen1' | 'gen2' | 'gen3' | 'gen4' | 'gen5' | 'gen6' | 'gen7';

const BattleAbilities = abilitiesJSON as DeepReadonly<{[id: string]: AbilityData}>;
const BattleAliases = aliasesJSON as DeepReadonly<{[id: string]: string}>;
const BattleItems = itemsJSON as DeepReadonly<{[id: string]: ItemData}>;
const BattleMovedex = movesJSON as DeepReadonly<{[id: string]: MoveData}>;
const BattlePokedex = speciesJSON as DeepReadonly<{[id: string]: SpeciesData}>;
const BattleText = textJSON as DeepReadonly<{[id: string]: {[templateName: string]: string}}>;
const BattleTypeChart = typesJSON as DeepReadonly<{[type in Exclude<TypeName, '???'>]: TypeData}>;
const BattleTeambuilderTable = formatsDataJSON as
	DeepReadonly<Tiering & {[mod: string]: Partial<Tiering>} & {[gen in PastGens]: Overrides}>;

if (typeof window === 'undefined') {
	(global as any).window = global; // Node
} else {
	window.exports = window; 	// browser (possibly NW.js!)
}

window.BattleAbilities = BattleAbilities;
window.BattleAliases = BattleAliases;
window.BattleItems = BattleItems;
window.BattleMovedex = BattleMovedex;
window.BattlePokedex = BattlePokedex;
window.BattleText = BattleText;
window.BattleTypeChart = BattleTypeChart;
window.BattleTeambuilderTable = BattleTeambuilderTable;

type JQuery<T> = any;
declare namespace JQuery {
	export type EventHandler<T, U> = any;
	export type Promise<T, U, V> = any;
}
type HTMLElement = any;
type AnyObject = {[k: string]: any};

declare var exports: any;
declare var window: AnyObject;
declare var document: any;
declare var soundManager: any;
declare var BattlePokemonSprites: any;
declare var BattlePokemonSpritesBW: any;
declare var Config: any;
declare function $(a: any): any;
declare var app: {user: AnyObject, rooms: AnyObject, ignore?: AnyObject};

type ScenePos = any;
type PokemonSprite = any;
const BattleStatusAnims = {};
class BattleSound {
	static setMute(_: any) { /* noop */}
}
export class BattleLog {
	static sanitizeHTML(s: any) {
		return s;
	}
	add(...a: any[]) { /* noop */ }
}
/**
 * Pokemon Showdown Dex Data
 *
 * A collection of data and definitions for src/battle-dex.ts.
 *
 * Larger data has their own files in data/, so this is just for small
 * miscellaneous data that doesn't need its own file.
 *
 * Licensing note: PS's client has complicated licensing:
 * - The client as a whole is AGPLv3
 * - The battle replay/animation engine (battle-*.ts) by itself is MIT
 *
 * @author Guangcong Luo <guangcongluo@gmail.com>
 * @license MIT
 */

/**
 * String that contains only lowercase alphanumeric characters.
 */
type ID = string & {__isID: true};

const BattleNatures: {[k in NatureName]: {plus?: StatName, minus?: StatName}} = {
	Adamant: {
		plus: 'atk',
		minus: 'spa',
	},
	Bashful: {},
	Bold: {
		plus: 'def',
		minus: 'atk',
	},
	Brave: {
		plus: 'atk',
		minus: 'spe',
	},
	Calm: {
		plus: 'spd',
		minus: 'atk',
	},
	Careful: {
		plus: 'spd',
		minus: 'spa',
	},
	Docile: {},
	Gentle: {
		plus: 'spd',
		minus: 'def',
	},
	Hardy: {},
	Hasty: {
		plus: 'spe',
		minus: 'def',
	},
	Impish: {
		plus: 'def',
		minus: 'spa',
	},
	Jolly: {
		plus: 'spe',
		minus: 'spa',
	},
	Lax: {
		plus: 'def',
		minus: 'spd',
	},
	Lonely: {
		plus: 'atk',
		minus: 'def',
	},
	Mild: {
		plus: 'spa',
		minus: 'def',
	},
	Modest: {
		plus: 'spa',
		minus: 'atk',
	},
	Naive: {
		plus: 'spe',
		minus: 'spd',
	},
	Naughty: {
		plus: 'atk',
		minus: 'spd',
	},
	Quiet: {
		plus: 'spa',
		minus: 'spe',
	},
	Quirky: {},
	Rash: {
		plus: 'spa',
		minus: 'spd',
	},
	Relaxed: {
		plus: 'def',
		minus: 'spe',
	},
	Sassy: {
		plus: 'spd',
		minus: 'spe',
	},
	Serious: {},
	Timid: {
		plus: 'spe',
		minus: 'atk',
	},
};
const BattleStatIDs = {
	HP: 'hp',
	hp: 'hp',
	Atk: 'atk',
	atk: 'atk',
	Def: 'def',
	def: 'def',
	SpA: 'spa',
	SAtk: 'spa',
	SpAtk: 'spa',
	spa: 'spa',
	spc: 'spa',
	Spc: 'spa',
	SpD: 'spd',
	SDef: 'spd',
	SpDef: 'spd',
	spd: 'spd',
	Spe: 'spe',
	Spd: 'spe',
	spe: 'spe',
};
const BattlePOStatNames = { // only used for interacting with PO
	hp: 'HP',
	atk: 'Atk',
	def: 'Def',
	spa: 'SAtk',
	spd: 'SDef',
	spe: 'Spd',
};
const BattleStatNames = { // proper style
	hp: 'HP',
	atk: 'Atk',
	def: 'Def',
	spa: 'SpA',
	spd: 'SpD',
	spe: 'Spe',
};
const BattleStats = {
	hp: 'HP',
	atk: 'Attack',
	def: 'Defense',
	spa: 'Sp. Atk',
	spd: 'Sp. Def',
	spe: 'Speed',
	accuracy: 'accuracy',
	evasion: 'evasiveness',
	spc: 'Special',
};

const BattleBaseSpeciesChart = [
	'pikachu',
	'pichu',
	'unown',
	'castform',
	'deoxys',
	'burmy',
	'wormadam',
	'cherrim',
	'shellos',
	'gastrodon',
	'rotom',
	'giratina',
	'shaymin',
	'arceus',
	'basculin',
	'darmanitan',
	'deerling',
	'sawsbuck',
	'tornadus',
	'thundurus',
	'landorus',
	'kyurem',
	'keldeo',
	'meloetta',
	'genesect',
	'vivillon',
	'flabebe',
	'floette',
	'florges',
	'furfrou',
	'aegislash',
	'pumpkaboo',
	'gourgeist',
	'meowstic',
	'hoopa',
	'zygarde',
	'lycanroc',
	'wishiwashi',
	'minior',
	'mimikyu',
	'greninja',
	'oricorio',
	'silvally',
	'necrozma',

	// alola totems
	'raticate',
	'marowak',
	'kommoo',

	// mega evolutions
	'charizard',
	'mewtwo',
	// others are hardcoded by ending with 'mega'
];

const BattlePokemonIconIndexes: {[id: string]: number} = {
	egg: 900 + 1,
	pikachubelle: 900 + 2,
	pikachulibre: 900 + 3,
	pikachuphd: 900 + 4,
	pikachupopstar: 900 + 5,
	pikachurockstar: 900 + 6,
	pikachucosplay: 900 + 7,
	// unown gap
	castformrainy: 900 + 35,
	castformsnowy: 900 + 36,
	castformsunny: 900 + 37,
	deoxysattack: 900 + 38,
	deoxysdefense: 900 + 39,
	deoxysspeed: 900 + 40,
	burmysandy: 900 + 41,
	burmytrash: 900 + 42,
	wormadamsandy: 900 + 43,
	wormadamtrash: 900 + 44,
	cherrimsunshine: 900 + 45,
	shelloseast: 900 + 46,
	gastrodoneast: 900 + 47,
	rotomfan: 900 + 48,
	rotomfrost: 900 + 49,
	rotomheat: 900 + 50,
	rotommow: 900 + 51,
	rotomwash: 900 + 52,
	giratinaorigin: 900 + 53,
	shayminsky: 900 + 54,
	unfezantf: 900 + 55,
	basculinbluestriped: 900 + 56,
	darmanitanzen: 900 + 57,
	deerlingautumn: 900 + 58,
	deerlingsummer: 900 + 59,
	deerlingwinter: 900 + 60,
	sawsbuckautumn: 900 + 61,
	sawsbucksummer: 900 + 62,
	sawsbuckwinter: 900 + 63,
	frillishf: 900 + 64,
	jellicentf: 900 + 65,
	tornadustherian: 900 + 66,
	thundurustherian: 900 + 67,
	landorustherian: 900 + 68,
	kyuremblack: 900 + 69,
	kyuremwhite: 900 + 70,
	keldeoresolute: 900 + 71,
	meloettapirouette: 900 + 72,
	vivillonarchipelago: 900 + 73,
	vivilloncontinental: 900 + 74,
	vivillonelegant: 900 + 75,
	vivillonfancy: 900 + 76,
	vivillongarden: 900 + 77,
	vivillonhighplains: 900 + 78,
	vivillonicysnow: 900 + 79,
	vivillonjungle: 900 + 80,
	vivillonmarine: 900 + 81,
	vivillonmodern: 900 + 82,
	vivillonmonsoon: 900 + 83,
	vivillonocean: 900 + 84,
	vivillonpokeball: 900 + 85,
	vivillonpolar: 900 + 86,
	vivillonriver: 900 + 87,
	vivillonsandstorm: 900 + 88,
	vivillonsavanna: 900 + 89,
	vivillonsun: 900 + 90,
	vivillontundra: 900 + 91,
	pyroarf: 900 + 92,
	flabebeblue: 900 + 93,
	flabebeorange: 900 + 94,
	flabebewhite: 900 + 95,
	flabebeyellow: 900 + 96,
	floetteblue: 900 + 97,
	floetteeternal: 900 + 98,
	floetteorange: 900 + 99,
	floettewhite: 900 + 100,
	floetteyellow: 900 + 101,
	florgesblue: 900 + 102,
	florgesorange: 900 + 103,
	florgeswhite: 900 + 104,
	florgesyellow: 900 + 105,
	furfroudandy: 900 + 106,
	furfroudebutante: 900 + 107,
	furfroudiamond: 900 + 108,
	furfrouheart: 900 + 109,
	furfroukabuki: 900 + 110,
	furfroulareine: 900 + 111,
	furfroumatron: 900 + 112,
	furfroupharaoh: 900 + 113,
	furfroustar: 900 + 114,
	meowsticf: 900 + 115,
	aegislashblade: 900 + 116,
	hoopaunbound: 900 + 118,
	rattataalola: 900 + 119,
	raticatealola: 900 + 120,
	raichualola: 900 + 121,
	sandshrewalola: 900 + 122,
	sandslashalola: 900 + 123,
	vulpixalola: 900 + 124,
	ninetalesalola: 900 + 125,
	diglettalola: 900 + 126,
	dugtrioalola: 900 + 127,
	meowthalola: 900 + 128,
	persianalola: 900 + 129,
	geodudealola: 900 + 130,
	graveleralola: 900 + 131,
	golemalola: 900 + 132,
	grimeralola: 900 + 133,
	mukalola: 900 + 134,
	exeggutoralola: 900 + 135,
	marowakalola: 900 + 136,
	greninjaash: 900 + 137,
	zygarde10: 900 + 138,
	zygardecomplete: 900 + 139,
	oricoriopompom: 900 + 140,
	oricoriopau: 900 + 141,
	oricoriosensu: 900 + 142,
	lycanrocmidnight: 900 + 143,
	wishiwashischool: 900 + 144,
	miniormeteor: 900 + 145,
	miniororange: 900 + 146,
	minioryellow: 900 + 147,
	miniorgreen: 900 + 148,
	miniorblue: 900 + 149,
	miniorviolet: 900 + 150,
	miniorindigo: 900 + 151,
	magearnaoriginal: 900 + 152,
	pikachuoriginal: 900 + 153,
	pikachuhoenn: 900 + 154,
	pikachusinnoh: 900 + 155,
	pikachuunova: 900 + 156,
	pikachukalos: 900 + 157,
	pikachualola: 900 + 158,
	pikachupartner: 900 + 159,
	lycanrocdusk: 900 + 160,
	necrozmaduskmane: 900 + 161,
	necrozmadawnwings: 900 + 162,
	necrozmaultra: 900 + 163,
	pikachustarter: 900 + 164,
	eeveestarter: 900 + 165,
	meowthgalar: 900 + 166,
	ponytagalar: 900 + 167,
	rapidashgalar: 900 + 168,
	farfetchdgalar: 900 + 169,
	weezinggalar: 900 + 170,
	mrmimegalar: 900 + 171,
	corsolagalar: 900 + 172,
	zigzagoongalar: 900 + 173,
	linoonegalar: 900 + 174,
	darumakagalar: 900 + 175,
	darmanitangalar: 900 + 176,
	darmanitangalarzen: 900 + 177,
	yamaskgalar: 900 + 178,
	stunfiskgalar: 900 + 179,
	cramorantgulping: 900 + 180,
	cramorantgorging: 900 + 181,
	toxtricitylowkey: 900 + 182,
	sinisteaantique: 854,
	polteageistantique: 855,
	alcremierubycream: 900 + 183,
	alcremiematchacream: 900 + 184,
	alcremiemintcream: 900 + 185,
	alcremielemoncream: 900 + 186,
	alcremiesaltedcream: 900 + 187,
	alcremierubyswirl: 900 + 188,
	alcremiecaramelswirl: 900 + 189,
	alcremierainbowswirl: 900 + 190,
	eiscuenoice: 900 + 191,
	indeedeef: 900 + 192,
	morpekohangry: 900 + 193,
	zaciancrowned: 900 + 194,
	zamazentacrowned: 900 + 195,
	slowpokegalar: 900 + 196,

	gumshoostotem: 735,
	raticatealolatotem: 900 + 120,
	marowakalolatotem: 900 + 136,
	araquanidtotem: 752,
	lurantistotem: 754,
	salazzletotem: 758,
	vikavolttotem: 738,
	togedemarutotem: 777,
	mimikyutotem: 778,
	mimikyubustedtotem: 778,
	ribombeetotem: 743,
	kommoototem: 784,

	venusaurmega: 1104 + 0,
	charizardmegax: 1104 + 1,
	charizardmegay: 1104 + 2,
	blastoisemega: 1104 + 3,
	beedrillmega: 1104 + 4,
	pidgeotmega: 1104 + 5,
	alakazammega: 1104 + 6,
	slowbromega: 1104 + 7,
	gengarmega: 1104 + 8,
	kangaskhanmega: 1104 + 9,
	pinsirmega: 1104 + 10,
	gyaradosmega: 1104 + 11,
	aerodactylmega: 1104 + 12,
	mewtwomegax: 1104 + 13,
	mewtwomegay: 1104 + 14,
	ampharosmega: 1104 + 15,
	steelixmega: 1104 + 16,
	scizormega: 1104 + 17,
	heracrossmega: 1104 + 18,
	houndoommega: 1104 + 19,
	tyranitarmega: 1104 + 20,
	sceptilemega: 1104 + 21,
	blazikenmega: 1104 + 22,
	swampertmega: 1104 + 23,
	gardevoirmega: 1104 + 24,
	sableyemega: 1104 + 25,
	mawilemega: 1104 + 26,
	aggronmega: 1104 + 27,
	medichammega: 1104 + 28,
	manectricmega: 1104 + 29,
	sharpedomega: 1104 + 30,
	cameruptmega: 1104 + 31,
	altariamega: 1104 + 32,
	banettemega: 1104 + 33,
	absolmega: 1104 + 34,
	glaliemega: 1104 + 35,
	salamencemega: 1104 + 36,
	metagrossmega: 1104 + 37,
	latiasmega: 1104 + 38,
	latiosmega: 1104 + 39,
	kyogreprimal: 1104 + 40,
	groudonprimal: 1104 + 41,
	rayquazamega: 1104 + 42,
	lopunnymega: 1104 + 43,
	garchompmega: 1104 + 44,
	lucariomega: 1104 + 45,
	abomasnowmega: 1104 + 46,
	gallademega: 1104 + 47,
	audinomega: 1104 + 48,
	dianciemega: 1104 + 49,
	charizardgmax: 1104 + 50,
	butterfreegmax: 1104 + 51,
	pikachugmax: 1104 + 52,
	meowthgmax: 1104 + 53,
	machampgmax: 1104 + 54,
	gengargmax: 1104 + 55,
	kinglergmax: 1104 + 56,
	laprasgmax: 1104 + 57,
	eeveegmax: 1104 + 58,
	snorlaxgmax: 1104 + 59,
	garbodorgmax: 1104 + 60,
	melmetalgmax: 1104 + 61,
	corviknightgmax: 1104 + 62,
	orbeetlegmax: 1104 + 63,
	drednawgmax: 1104 + 64,
	coalossalgmax: 1104 + 65,
	flapplegmax: 1104 + 66,
	appletungmax: 1104 + 67,
	sandacondagmax: 1104 + 68,
	toxtricitygmax: 1104 + 69,
	toxtricitylowkeygmax: 1104 + 69,
	centiskorchgmax: 1104 + 70,
	hatterenegmax: 1104 + 71,
	grimmsnarlgmax: 1104 + 72,
	alcremiegmax: 1104 + 73,
	copperajahgmax: 1104 + 74,
	duraludongmax: 1104 + 75,
	eternatuseternamax: 1104 + 76,

	syclant: 1296 + 0,
	revenankh: 1296 + 1,
	pyroak: 1296 + 2,
	fidgit: 1296 + 3,
	stratagem: 1296 + 4,
	arghonaut: 1296 + 5,
	kitsunoh: 1296 + 6,
	cyclohm: 1296 + 7,
	colossoil: 1296 + 8,
	krilowatt: 1296 + 9,
	voodoom: 1296 + 10,
	tomohawk: 1296 + 11,
	necturna: 1296 + 12,
	mollux: 1296 + 13,
	aurumoth: 1296 + 14,
	malaconda: 1296 + 15,
	cawmodore: 1296 + 16,
	volkraken: 1296 + 17,
	plasmanta: 1296 + 18,
	naviathan: 1296 + 19,
	crucibelle: 1296 + 20,
	crucibellemega: 1296 + 21,
	kerfluffle: 1296 + 22,
	pajantom: 1296 + 23,
	jumbao: 1296 + 24,
	caribolt: 1296 + 25,
	smokomodo: 1296 + 26,
	snaelstrom: 1296 + 27,
	equilibra: 1296 + 28,

	syclar: 1332 + 0,
	embirch: 1332 + 1,
	flarelm: 1332 + 2,
	breezi: 1332 + 3,
	scratchet: 1332 + 4,
	necturine: 1332 + 5,
	cupra: 1332 + 6,
	argalis: 1332 + 7,
	brattler: 1332 + 8,
	cawdet: 1332 + 9,
	volkritter: 1332 + 10,
	snugglow: 1332 + 11,
	floatoy: 1332 + 12,
	caimanoe: 1332 + 13,
	pluffle: 1332 + 14,
	rebble: 1332 + 15,
	tactite: 1332 + 16,
	privatyke: 1332 + 17,
	nohface: 1332 + 18,
	monohm: 1332 + 19,
	duohm: 1332 + 20,
	// protowatt: 1332 + 21,
	voodoll: 1332 + 22,
	mumbao: 1332 + 23,
	fawnifer: 1332 + 24,
	electrelk: 1332 + 25,
	smogecko: 1332 + 26,
	smoguana: 1332 + 27,
	swirlpool: 1332 + 28,
	coribalis: 1332 + 29,
	justyke: 1332 + 30,
};

const BattlePokemonIconIndexesLeft: {[id: string]: number} = {
	pikachubelle: 1188 + 0,
	pikachupopstar: 1188 + 1,
	clefairy: 1188 + 2,
	clefable: 1188 + 3,
	jigglypuff: 1188 + 4,
	wigglytuff: 1188 + 5,
	dugtrioalola: 1188 + 6,
	poliwhirl: 1188 + 7,
	poliwrath: 1188 + 8,
	mukalola: 1188 + 9,
	kingler: 1188 + 10,
	croconaw: 1188 + 11,
	cleffa: 1188 + 12,
	igglybuff: 1188 + 13,
	politoed: 1188 + 14,
	// unown gap
	sneasel: 1188 + 35,
	teddiursa: 1188 + 36,
	roselia: 1188 + 37,
	zangoose: 1188 + 38,
	seviper: 1188 + 39,
	castformsnowy: 1188 + 40,
	absolmega: 1188 + 41,
	absol: 1188 + 42,
	regirock: 1188 + 43,
	torterra: 1188 + 44,
	budew: 1188 + 45,
	roserade: 1188 + 46,
	magmortar: 1188 + 47,
	togekiss: 1188 + 48,
	rotomwash: 1188 + 49,
	shayminsky: 1188 + 50,
	emboar: 1188 + 51,
	pansear: 1188 + 52,
	simisear: 1188 + 53,
	drilbur: 1188 + 54,
	excadrill: 1188 + 55,
	sawk: 1188 + 56,
	lilligant: 1188 + 57,
	garbodor: 1188 + 58,
	solosis: 1188 + 59,
	vanilluxe: 1188 + 60,
	amoonguss: 1188 + 61,
	klink: 1188 + 62,
	klang: 1188 + 63,
	klinklang: 1188 + 64,
	litwick: 1188 + 65,
	golett: 1188 + 66,
	golurk: 1188 + 67,
	kyuremblack: 1188 + 68,
	kyuremwhite: 1188 + 69,
	kyurem: 1188 + 70,
	keldeoresolute: 1188 + 71,
	meloetta: 1188 + 72,
	greninja: 1188 + 73,
	greninjaash: 1188 + 74,
	furfroudebutante: 1188 + 75,
	barbaracle: 1188 + 76,
	clauncher: 1188 + 77,
	clawitzer: 1188 + 78,
	sylveon: 1188 + 79,
	klefki: 1188 + 80,
	zygarde: 1188 + 81,
	zygarde10: 1188 + 82,
	zygardecomplete: 1188 + 83,
	dartrix: 1188 + 84,
	steenee: 1188 + 85,
	tsareena: 1188 + 86,
	comfey: 1188 + 87,
	miniormeteor: 1188 + 88,
	minior: 1188 + 89,
	miniororange: 1188 + 90,
	minioryellow: 1188 + 91,
	miniorgreen: 1188 + 92,
	miniorblue: 1188 + 93,
	miniorviolet: 1188 + 94,
	miniorindigo: 1188 + 95,
	dhelmise: 1188 + 96,
	necrozma: 1188 + 97,
	marshadow: 1188 + 98,
	pikachuoriginal: 1188 + 99,
	pikachupartner: 1188 + 100,
	necrozmaduskmane: 1188 + 101,
	necrozmadawnwings: 1188 + 102,
	necrozmaultra: 1188 + 103,
	stakataka: 1188 + 104,
	blacephalon: 1188 + 105,
};

const BattleAvatarNumbers: {[k: string]: string} = {
	1: 'lucas',
	2: 'dawn',
	3: 'youngster-gen4',
	4: 'lass-gen4dp',
	5: 'camper',
	6: 'picnicker',
	7: 'bugcatcher',
	8: 'aromalady',
	9: 'twins-gen4dp',
	10: 'hiker-gen4',
	11: 'battlegirl-gen4',
	12: 'fisherman-gen4',
	13: 'cyclist-gen4',
	14: 'cyclistf-gen4',
	15: 'blackbelt-gen4dp',
	16: 'artist-gen4',
	17: 'pokemonbreeder-gen4',
	18: 'pokemonbreederf-gen4',
	19: 'cowgirl',
	20: 'jogger',
	21: 'pokefan-gen4',
	22: 'pokefanf-gen4',
	23: 'pokekid',
	24: 'youngcouple-gen4dp',
	25: 'acetrainer-gen4dp',
	26: 'acetrainerf-gen4dp',
	27: 'waitress-gen4',
	28: 'veteran-gen4',
	29: 'ninjaboy',
	30: 'dragontamer',
	31: 'birdkeeper-gen4dp',
	32: 'doubleteam',
	33: 'richboy-gen4',
	34: 'lady-gen4',
	35: 'gentleman-gen4dp',
	36: 'madame-gen4dp',
	37: 'beauty-gen4dp',
	38: 'collector',
	39: 'policeman-gen4',
	40: 'pokemonranger-gen4',
	41: 'pokemonrangerf-gen4',
	42: 'scientist-gen4dp',
	43: 'swimmer-gen4dp',
	44: 'swimmerf-gen4dp',
	45: 'tuber',
	46: 'tuberf',
	47: 'sailor',
	48: 'sisandbro',
	49: 'ruinmaniac',
	50: 'psychic-gen4',
	51: 'psychicf-gen4',
	52: 'gambler',
	53: 'guitarist-gen4',
	54: 'acetrainersnow',
	55: 'acetrainersnowf',
	56: 'skier',
	57: 'skierf-gen4dp',
	58: 'roughneck-gen4',
	59: 'clown',
	60: 'worker-gen4',
	61: 'schoolkid-gen4dp',
	62: 'schoolkidf-gen4',
	63: 'roark',
	64: 'barry',
	65: 'byron',
	66: 'aaron',
	67: 'bertha',
	68: 'flint',
	69: 'lucian',
	70: 'cynthia-gen4',
	71: 'bellepa',
	72: 'rancher',
	73: 'mars',
	74: 'galacticgrunt',
	75: 'gardenia',
	76: 'crasherwake',
	77: 'maylene',
	78: 'fantina',
	79: 'candice',
	80: 'volkner',
	81: 'parasollady-gen4',
	82: 'waiter-gen4dp',
	83: 'interviewers',
	84: 'cameraman',
	85: 'reporter',
	86: 'idol',
	87: 'cyrus',
	88: 'jupiter',
	89: 'saturn',
	90: 'galacticgruntf',
	91: 'argenta',
	92: 'palmer',
	93: 'thorton',
	94: 'buck',
	95: 'darach',
	96: 'marley',
	97: 'mira',
	98: 'cheryl',
	99: 'riley',
	100: 'dahlia',
	101: 'ethan',
	102: 'lyra',
	103: 'twins-gen4',
	104: 'lass-gen4',
	105: 'acetrainer-gen4',
	106: 'acetrainerf-gen4',
	107: 'juggler',
	108: 'sage',
	109: 'li',
	110: 'gentleman-gen4',
	111: 'teacher',
	112: 'beauty',
	113: 'birdkeeper',
	114: 'swimmer-gen4',
	115: 'swimmerf-gen4',
	116: 'kimonogirl',
	117: 'scientist-gen4',
	118: 'acetrainercouple',
	119: 'youngcouple',
	120: 'supernerd',
	121: 'medium',
	122: 'schoolkid-gen4',
	123: 'blackbelt-gen4',
	124: 'pokemaniac',
	125: 'firebreather',
	126: 'burglar',
	127: 'biker-gen4',
	128: 'skierf',
	129: 'boarder',
	130: 'rocketgrunt',
	131: 'rocketgruntf',
	132: 'archer',
	133: 'ariana',
	134: 'proton',
	135: 'petrel',
	136: 'eusine',
	137: 'lucas-gen4pt',
	138: 'dawn-gen4pt',
	139: 'madame-gen4',
	140: 'waiter-gen4',
	141: 'falkner',
	142: 'bugsy',
	143: 'whitney',
	144: 'morty',
	145: 'chuck',
	146: 'jasmine',
	147: 'pryce',
	148: 'clair',
	149: 'will',
	150: 'koga',
	151: 'bruno',
	152: 'karen',
	153: 'lance',
	154: 'brock',
	155: 'misty',
	156: 'ltsurge',
	157: 'erika',
	158: 'janine',
	159: 'sabrina',
	160: 'blaine',
	161: 'blue',
	162: 'red',
	163: 'red',
	164: 'silver',
	165: 'giovanni',
	166: 'unknownf',
	167: 'unknown',
	168: 'unknown',
	169: 'hilbert',
	170: 'hilda',
	171: 'youngster',
	172: 'lass',
	173: 'schoolkid',
	174: 'schoolkidf',
	175: 'smasher',
	176: 'linebacker',
	177: 'waiter',
	178: 'waitress',
	179: 'chili',
	180: 'cilan',
	181: 'cress',
	182: 'nurseryaide',
	183: 'preschoolerf',
	184: 'preschooler',
	185: 'twins',
	186: 'pokemonbreeder',
	187: 'pokemonbreederf',
	188: 'lenora',
	189: 'burgh',
	190: 'elesa',
	191: 'clay',
	192: 'skyla',
	193: 'pokemonranger',
	194: 'pokemonrangerf',
	195: 'worker',
	196: 'backpacker',
	197: 'backpackerf',
	198: 'fisherman',
	199: 'musician',
	200: 'dancer',
	201: 'harlequin',
	202: 'artist',
	203: 'baker',
	204: 'psychic',
	205: 'psychicf',
	206: 'cheren',
	207: 'bianca',
	208: 'plasmagrunt-gen5bw',
	209: 'n',
	210: 'richboy',
	211: 'lady',
	212: 'pilot',
	213: 'workerice',
	214: 'hoopster',
	215: 'scientistf',
	216: 'clerkf',
	217: 'acetrainerf',
	218: 'acetrainer',
	219: 'blackbelt',
	220: 'scientist',
	221: 'striker',
	222: 'brycen',
	223: 'iris',
	224: 'drayden',
	225: 'roughneck',
	226: 'janitor',
	227: 'pokefan',
	228: 'pokefanf',
	229: 'doctor',
	230: 'nurse',
	231: 'hooligans',
	232: 'battlegirl',
	233: 'parasollady',
	234: 'clerk',
	235: 'clerk-boss',
	236: 'backers',
	237: 'backersf',
	238: 'veteran',
	239: 'veteranf',
	240: 'biker',
	241: 'infielder',
	242: 'hiker',
	243: 'madame',
	244: 'gentleman',
	245: 'plasmagruntf-gen5bw',
	246: 'shauntal',
	247: 'marshal',
	248: 'grimsley',
	249: 'caitlin',
	250: 'ghetsis-gen5bw',
	251: 'depotagent',
	252: 'swimmer',
	253: 'swimmerf',
	254: 'policeman',
	255: 'maid',
	256: 'ingo',
	257: 'alder',
	258: 'cyclist',
	259: 'cyclistf',
	260: 'cynthia',
	261: 'emmet',
	262: 'hilbert-dueldisk',
	263: 'hilda-dueldisk',
	264: 'hugh',
	265: 'rosa',
	266: 'nate',
	267: 'colress',
	268: 'beauty-gen5bw2',
	269: 'ghetsis',
	270: 'plasmagrunt',
	271: 'plasmagruntf',
	272: 'iris-gen5bw2',
	273: 'brycenman',
	274: 'shadowtriad',
	275: 'rood',
	276: 'zinzolin',
	277: 'cheren-gen5bw2',
	278: 'marlon',
	279: 'roxie',
	280: 'roxanne',
	281: 'brawly',
	282: 'wattson',
	283: 'flannery',
	284: 'norman',
	285: 'winona',
	286: 'tate',
	287: 'liza',
	288: 'juan',
	289: 'guitarist',
	290: 'steven',
	291: 'wallace',
	292: 'bellelba',
	293: 'benga',
	294: 'ash',
	'#bw2elesa': 'elesa-gen5bw2',
	'#teamrocket': 'teamrocket',
	'#yellow': 'yellow',
	'#zinnia': 'zinnia',
	'#clemont': 'clemont',
	'#wally': 'wally',
	breeder: 'pokemonbreeder',
	breederf: 'pokemonbreederf',

	1001: '#1001',
	1002: '#1002',
	1003: '#1003',
	1005: '#1005',
	1010: '#1010',
};

type StatName = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';
type NatureName = 'Adamant' | 'Bashful' | 'Bold' | 'Brave' | 'Calm' | 'Careful' | 'Docile' | 'Gentle' |
	'Hardy' | 'Hasty' | 'Impish' | 'Jolly' | 'Lax' | 'Lonely' | 'Mild' | 'Modest' | 'Naive' | 'Naughty' |
	'Quiet' | 'Quirky' | 'Rash' | 'Relaxed' | 'Sassy' | 'Serious' | 'Timid';
type StatNameExceptHP = 'atk' | 'def' | 'spa' | 'spd' | 'spe';
type TypeName = 'Normal' | 'Fighting' | 'Flying' | 'Poison' | 'Ground' | 'Rock' | 'Bug' | 'Ghost' | 'Steel' |
	'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' | 'Ice' | 'Dragon' | 'Dark' | 'Fairy' | '???';
type StatusName = 'par' | 'psn' | 'frz' | 'slp' | 'brn';
type BoostStatName = 'atk' | 'def' | 'spa' | 'spd' | 'spe' | 'evasion' | 'accuracy' | 'spc';
type GenderName = 'M' | 'F' | 'N';

interface Effect {
	readonly id: ID;
	readonly name: string;
	readonly gen: number;
	readonly effectType: 'Item' | 'Move' | 'Ability' | 'Template' | 'PureEffect';
	/**
	 * Do we have data on this item/move/ability/template?
	 * WARNING: Always false if the relevant data files aren't loaded.
	 */
	readonly exists: boolean;
}

class PureEffect implements Effect {
	readonly effectType = 'PureEffect';
	readonly id: ID;
	readonly name: string;
	readonly gen: number;
	readonly exists: boolean;
	constructor(id: ID, name: string) {
		this.id = id;
		this.name = name;
		this.gen = 0;
		this.exists = false;
	}
}

class Item implements Effect {
	// effect
	readonly effectType = 'Item';
	readonly id: ID;
	readonly name: string;
	readonly gen: number;
	readonly exists: boolean;

	readonly num: number;
	readonly spritenum: number;
	readonly desc: string;
	readonly shortDesc: string;

	readonly megaStone: string;
	readonly megaEvolves: string;
	readonly zMove: string | true | null;
	readonly zMoveType: TypeName | '';
	readonly zMoveFrom: string;
	readonly zMoveUser: string[] | null;
	readonly onPlate: TypeName;
	readonly onMemory: TypeName;
	readonly onDrive: TypeName;
	readonly fling: any;
	readonly naturalGift: any;
	readonly isPokeball: boolean;

	constructor(id: ID, name: string, data: any) {
		if (!data || typeof data !== 'object') data = {};
		if (data.name) name = data.name;
		this.name = Dex.sanitizeName(name);
		this.id = id;
		this.gen = data.gen || 0;
		this.exists = ('exists' in data ? !!data.exists : true);

		this.num = data.num || 0;
		this.spritenum = data.spritenum || 0;
		this.desc = data.desc || data.shortDesc || '';
		this.shortDesc = data.shortDesc || this.desc;

		this.megaStone = data.megaStone || '';
		this.megaEvolves = data.megaEvolves || '';
		this.zMove = data.zMove || null;
		this.zMoveType = data.zMoveType || '';
		this.zMoveFrom = data.zMoveFrom || '';
		this.zMoveUser = data.zMoveUser || null;
		this.onPlate = data.onPlate || '';
		this.onMemory = data.onMemory || '';
		this.onDrive = data.onDrive || '';
		this.fling = data.fling || null;
		this.naturalGift = data.naturalGift || null;
		this.isPokeball = !!data.isPokeball;

		if (!this.gen) {
			if (this.num >= 577) {
				this.gen = 6;
			} else if (this.num >= 537) {
				this.gen = 5;
			} else if (this.num >= 377) {
				this.gen = 4;
			} else {
				this.gen = 3;
			}
		}
	}
}

interface MoveFlags {
	/** Ignores a target's substitute. */
	authentic?: 1 | 0;
	/** Power is multiplied by 1.5 when used by a Pokemon with the Strong Jaw Ability. */
	bite?: 1 | 0;
	/** Has no effect on Pokemon with the Bulletproof Ability. */
	bullet?: 1 | 0;
	/** The user is unable to make a move between turns. */
	charge?: 1 | 0;
	/** Makes contact. */
	contact?: 1 | 0;
	/** When used by a Pokemon, other Pokemon with the Dancer Ability can attempt to execute the same move. */
	dance?: 1 | 0;
	/** Thaws the user if executed successfully while the user is frozen. */
	defrost?: 1 | 0;
	/** Can target a Pokemon positioned anywhere in a Triple Battle. */
	distance?: 1 | 0;
	/** Prevented from being executed or selected during Gravity's effect. */
	gravity?: 1 | 0;
	/** Prevented from being executed or selected during Heal Block's effect. */
	heal?: 1 | 0;
	/** Can be copied by Mirror Move. */
	mirror?: 1 | 0;
	/** Unknown effect. */
	mystery?: 1 | 0;
	/** Prevented from being executed or selected in a Sky Battle. */
	nonsky?: 1 | 0;
	/** Has no effect on Grass-type Pokemon, Pokemon with the Overcoat Ability, and Pokemon holding Safety Goggles. */
	powder?: 1 | 0;
	/** Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield. */
	protect?: 1 | 0;
	/** Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher Ability. */
	pulse?: 1 | 0;
	/** Power is multiplied by 1.2 when used by a Pokemon with the Iron Fist Ability. */
	punch?: 1 | 0;
	/** If this move is successful, the user must recharge on the following turn and cannot make a move. */
	recharge?: 1 | 0;
	/** Bounced back to the original user by Magic Coat or the Magic Bounce Ability. */
	reflectable?: 1 | 0;
	/** Can be stolen from the original user and instead used by another Pokemon using Snatch. */
	snatch?: 1 | 0;
	/** Has no effect on Pokemon with the Soundproof Ability. */
	sound?: 1 | 0;
}

class Move implements Effect {
	// effect
	readonly effectType = 'Move';
	readonly id: ID;
	readonly name: string;
	readonly gen: number;
	readonly exists: boolean;

	readonly basePower: number;
	readonly accuracy: number | true;
	readonly pp: number;
	readonly type: TypeName;
	readonly category: 'Physical' | 'Special' | 'Status';
	readonly priority: number;
	readonly target:
		'normal' | 'any' | 'adjacentAlly' | 'adjacentFoe' | 'adjacentAllyOrSelf' | // single-target
		'self' | 'randomNormal' | // single-target, automatic
		'allAdjacent' | 'allAdjacentFoes' | // spread
		'allySide' | 'foeSide' | 'all'; // side and field
	readonly flags: Readonly<MoveFlags>;
	readonly critRatio: number;

	readonly desc: string;
	readonly shortDesc: string;
	readonly isViable: boolean;
	readonly isNonstandard: string | null;
	readonly isZ: ID;
	readonly zMovePower: number;
	readonly zMoveEffect: string;
	readonly zMoveBoost: {[stat in StatName]?: number} | null;
	readonly isMax: boolean | string;
	readonly gmaxPower: number;
	readonly ohko: true | 'Ice' | null;
	readonly recoil: number[] | null;
	readonly heal: number[] | null;
	readonly multihit: number[] | number | null;
	readonly hasCustomRecoil: boolean;
	readonly noPPBoosts: boolean;
	readonly secondaries: ReadonlyArray<any> | null;
	readonly num: number;

	constructor(id: ID, name: string, data: any) {
		if (!data || typeof data !== 'object') data = {};
		if (data.name) name = data.name;
		this.name = Dex.sanitizeName(name);
		this.id = id;
		this.gen = data.gen || 0;
		this.exists = ('exists' in data ? !!data.exists : true);

		this.basePower = data.basePower || 0;
		this.accuracy = data.accuracy || 0;
		this.pp = data.pp || 1;
		this.type = data.type || '???';
		this.category = data.category || 'Physical';
		this.priority = data.priority || 0;
		this.target = data.target || 'normal';
		this.flags = data.flags || {};
		this.critRatio = data.critRatio === 0 ? 0 : (data.critRatio || 1);

		// TODO: move to text.js
		this.desc = data.desc;
		this.shortDesc = data.shortDesc;
		this.isViable = !!data.isViable;
		this.isNonstandard = data.isNonstandard || null;
		this.isZ = data.isZ || '';
		this.zMovePower = data.zMovePower || 0;
		this.zMoveEffect = data.zMoveEffect || '';
		this.zMoveBoost = data.zMoveBoost || null;
		this.ohko = data.ohko || null;
		this.recoil = data.recoil || null;
		this.heal = data.heal || null;
		this.multihit = data.multihit || null;
		this.hasCustomRecoil = data.hasCustomRecoil || false;
		this.noPPBoosts = data.noPPBoosts || false;
		this.secondaries = data.secondaries || (data.secondary ? [data.secondary] : null);

		this.isMax = data.isMax || false;
		this.gmaxPower = data.gmaxPower || 0;
		if (this.category !== 'Status' && !this.gmaxPower) {
			if (!this.basePower) {
				this.gmaxPower = 100;
			} else if (['Fighting', 'Poison'].includes(this.type)) {
				if (this.basePower >= 150) {
					this.gmaxPower = 100;
				} else if (this.basePower >= 110) {
					this.gmaxPower = 95;
				} else if (this.basePower >= 75) {
					this.gmaxPower = 90;
				} else if (this.basePower >= 65) {
					this.gmaxPower = 85;
				} else if (this.basePower >= 55) {
					this.gmaxPower = 80;
				} else if (this.basePower >= 45) {
					this.gmaxPower = 75;
				} else  {
					this.gmaxPower = 70;
				}
			} else {
				if (this.basePower >= 150) {
					this.gmaxPower = 150;
				} else if (this.basePower >= 110) {
					this.gmaxPower = 140;
				} else if (this.basePower >= 75) {
					this.gmaxPower = 130;
				} else if (this.basePower >= 65) {
					this.gmaxPower = 120;
				} else if (this.basePower >= 55) {
					this.gmaxPower = 110;
				} else if (this.basePower >= 45) {
					this.gmaxPower = 100;
				} else  {
					this.gmaxPower = 90;
				}
			}
		}
		if (this.category !== 'Status' && !this.zMovePower) {
			let basePower = this.basePower;
			if (Array.isArray(this.multihit)) basePower *= 3;
			if (!basePower) {
				this.zMovePower = 100;
			} else if (basePower >= 140) {
				this.zMovePower = 200;
			} else if (basePower >= 130) {
				this.zMovePower = 195;
			} else if (basePower >= 120) {
				this.zMovePower = 190;
			} else if (basePower >= 110) {
				this.zMovePower = 185;
			} else if (basePower >= 100) {
				this.zMovePower = 180;
			} else if (basePower >= 90) {
				this.zMovePower = 175;
			} else if (basePower >= 80) {
				this.zMovePower = 160;
			} else if (basePower >= 70) {
				this.zMovePower = 140;
			} else if (basePower >= 60) {
				this.zMovePower = 120;
			} else  {
				this.zMovePower = 100;
			}
		}

		this.num = data.num || 0;
		if (!this.gen) {
			if (this.num >= 560) {
				this.gen = 6;
			} else if (this.num >= 468) {
				this.gen = 5;
			} else if (this.num >= 355) {
				this.gen = 4;
			} else if (this.num >= 252) {
				this.gen = 3;
			} else if (this.num >= 166) {
				this.gen = 2;
			} else if (this.num >= 1) {
				this.gen = 1;
			}
		}
	}
}

class Ability implements Effect {
	// effect
	readonly effectType = 'Ability';
	readonly id: ID;
	readonly name: string;
	readonly gen: number;
	readonly exists: boolean;

	readonly num: number;
	readonly shortDesc: string;
	readonly desc: string;

	constructor(id: ID, name: string, data: any) {
		if (!data || typeof data !== 'object') data = {};
		if (data.name) name = data.name;
		this.name = Dex.sanitizeName(name);
		this.id = id;
		this.gen = data.gen || 0;
		this.exists = ('exists' in data ? !!data.exists : true);
		this.num = data.num || 0;
		this.shortDesc = data.shortDesc || data.desc || '';
		this.desc = data.desc || data.shortDesc || '';
		if (!this.gen) {
			if (this.num >= 234) {
				this.gen = 8;
			} else if (this.num >= 192) {
				this.gen = 7;
			} else if (this.num >= 165) {
				this.gen = 6;
			} else if (this.num >= 124) {
				this.gen = 5;
			} else if (this.num >= 77) {
				this.gen = 4;
			} else if (this.num >= 1) {
				this.gen = 3;
			}
		}
	}
}

class Template implements Effect {
	// effect
	readonly effectType = 'Template';
	readonly id: ID;
	readonly name: string;
	readonly gen: number;
	readonly exists: boolean;

	// name
	readonly species: string;
	readonly speciesid: ID;
	readonly baseSpecies: string;
	readonly forme: string;
	readonly formeid: string;
	readonly spriteid: string;
	readonly baseForme: string;

	// basic data
	readonly num: number;
	readonly types: ReadonlyArray<TypeName>;
	readonly abilities: Readonly<{
		0: string, 1?: string, H?: string, S?: string,
	}>;
	readonly baseStats: Readonly<{
		hp: number, atk: number, def: number, spa: number, spd: number, spe: number,
	}>;
	readonly weightkg: number;

	// flavor data
	readonly heightm: number;
	readonly gender: GenderName;
	readonly color: string;
	readonly genderRatio: Readonly<{M: number, F: number}> | null;
	readonly eggGroups: ReadonlyArray<string>;

	// format data
	readonly otherFormes: ReadonlyArray<ID> | null;
	// TODO: rename to cosmeticForms
	readonly otherForms: ReadonlyArray<ID> | null;
	readonly evos: ReadonlyArray<ID> | null;
	readonly prevo: ID;
	readonly evoType: 'trade' | 'useItem' | 'levelMove' | 'levelExtra' | 'levelFriendship' | 'levelHold' | 'other' | '';
	readonly evoLevel: number;
	readonly evoMove: string;
	readonly evoItem: string;
	readonly evoCondition: string;
	readonly requiredItem: string;
	readonly tier: string;
	readonly isTotem: boolean;
	readonly isMega: boolean;
	readonly isGigantamax: boolean;
	readonly isPrimal: boolean;
	readonly battleOnly: string | string[] | null;
	readonly isNonstandard: string | null;
	readonly unreleasedHidden: boolean | 'Past';
	readonly inheritsFrom: string | null;

	constructor(id: ID, name: string, data: any) {
		if (!data || typeof data !== 'object') data = {};
		if (data.name || data.species) name = data.name || data.species;
		this.name = Dex.sanitizeName(name);
		this.id = id;
		this.gen = data.gen || 0;
		this.exists = ('exists' in data ? !!data.exists : true);
		this.species = this.name;
		this.speciesid = this.id;
		if (!data.abilities &&
			!['hooh', 'hakamoo', 'jangmoo', 'kommoo', 'porygonz'].includes(this.id)) {
			const dashIndex = name.indexOf('-');
			if (this.id === 'kommoototem') {
				data.baseSpecies = 'Kommo-o';
				data.forme = 'Totem';
			} else if (dashIndex > 0) {
				data.baseSpecies = name.slice(0, dashIndex);
				data.forme = name.slice(dashIndex + 1);
			}
		}
		if (!data.abilities) {
			// deprecated BattleBaseSpeciesChart
			for (const baseid of BattleBaseSpeciesChart) {
				if (this.id.length > baseid.length && this.id.slice(0, baseid.length) === baseid) {
					data.baseSpecies = baseid;
					data.forme = this.id.slice(baseid.length);
				}
			}
			if (this.id !== 'yanmega' && this.id.slice(-4) === 'mega') {
				data.baseSpecies = this.id.slice(0, -4);
				data.forme = this.id.slice(-4);
			} else if (this.id.slice(-6) === 'primal') {
				data.baseSpecies = this.id.slice(0, -6);
				data.forme = this.id.slice(-6);
			} else if (this.id.slice(-5) === 'alola') {
				data.baseSpecies = this.id.slice(0, -5);
				data.forme = this.id.slice(-5);
			}
		}
		this.baseSpecies = data.baseSpecies || name;
		this.forme = data.forme || '';
		const baseId = toID(this.baseSpecies);
		this.formeid = (baseId === this.id ? '' : '-' + toID(this.forme));
		this.spriteid = baseId + this.formeid;
		if (this.spriteid.slice(-5) === 'totem') this.spriteid = this.spriteid.slice(0, -5);
		if (this.spriteid.slice(-1) === '-') this.spriteid = this.spriteid.slice(0, -1);
		this.baseForme = data.baseForme || '';

		this.num = data.num || 0;
		this.types = data.types || ['???'];
		this.abilities = data.abilities || {0: "No Ability"};
		this.baseStats = data.baseStats || {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
		this.weightkg = data.weightkg || 0;

		this.heightm = data.heightm || 0;
		this.gender = data.gender || '';
		this.color = data.color || '';
		this.genderRatio = data.genderRatio || null;
		this.eggGroups = data.eggGroups || [];

		this.otherFormes = data.otherFormes || null;
		this.otherForms = data.otherForms || null;
		this.evos = data.evos || null;
		this.prevo = data.prevo || '';
		this.evoType = data.evoType || '';
		this.evoLevel = data.evoLevel || 0;
		this.evoMove = data.evoMove || '';
		this.evoItem = data.evoItem || '';
		this.evoCondition = data.evoCondition || '';
		this.requiredItem = data.requiredItem || '';
		this.tier = data.tier || '';

		this.isTotem = false;
		this.isMega = false;
		this.isGigantamax = !!(this.forme && this.forme.endsWith('Gmax'));
		this.isPrimal = false;
		this.battleOnly = data.battleOnly || (data.requiredAbility || !!this.isGigantamax ? this.baseSpecies : null);
		this.isNonstandard = data.isNonstandard || null;
		this.unreleasedHidden = data.unreleasedHidden || false;
		this.inheritsFrom = (Array.isArray(data.inheritsFrom) ? this.baseSpecies : data.inheritsFrom) || null;
		if (!this.gen) {
			if (this.num >= 810 || this.forme === 'Galar' || this.isGigantamax) {
				this.gen = 8;
			} else if (this.num >= 722 || this.formeid === '-alola' || this.formeid === '-starter') {
				this.gen = 7;
			} else if (this.forme && ['-mega', '-megax', '-megay'].includes(this.formeid)) {
				this.gen = 6;
				this.isMega = true;
				this.battleOnly = this.baseSpecies;
			} else if (this.formeid === '-primal') {
				this.gen = 6;
				this.isPrimal = true;
				this.battleOnly = this.baseSpecies;
			} else if (this.formeid === '-totem' || this.formeid === '-alolatotem') {
				this.gen = 7;
				this.isTotem = true;
			} else if (this.num >= 650) {
				this.gen = 6;
			} else if (this.num >= 494) {
				this.gen = 5;
			} else if (this.num >= 387) {
				this.gen = 4;
			} else if (this.num >= 252) {
				this.gen = 3;
			} else if (this.num >= 152) {
				this.gen = 2;
			} else if (this.num >= 1) {
				this.gen = 1;
			}
		}
	}
}

if (typeof require === 'function') {
	// in Node
	(global as any).BattleBaseSpeciesChart = BattleBaseSpeciesChart;
	(global as any).BattleStats = BattleStats;
	(global as any).BattleNatures = BattleNatures;
	(global as any).PureEffect = PureEffect;
	(global as any).Template = Template;
	(global as any).Ability = Ability;
	(global as any).Item = Item;
	(global as any).Move = Move;
}
/**
 * Pokemon Showdown Dex
 *
 * Roughly equivalent to sim/dex.js in a Pokemon Showdown server, but
 * designed for use in browsers rather than in Node.
 *
 * This is a generic utility library for Pokemon Showdown code: any
 * code shared between the replay viewer and the client usually ends up
 * here.
 *
 * Licensing note: PS's client has complicated licensing:
 * - The client as a whole is AGPLv3
 * - The battle replay/animation engine (battle-*.ts) by itself is MIT
 *
 * Compiled into battledata.js which includes all dependencies
 *
 * @author Guangcong Luo <guangcongluo@gmail.com>
 * @license MIT
 */

declare var require: any;
declare var global: any;

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function indexOf(searchElement, fromIndex) {
		for (let i = (fromIndex || 0); i < this.length; i++) {
			if (this[i] === searchElement) return i;
		}
		return -1;
	};
}
if (!Array.prototype.includes) {
	Array.prototype.includes = function includes(thing) {
		return this.indexOf(thing) !== -1;
	};
}
if (!Array.isArray) {
	Array.isArray = function isArray(thing): thing is any[] {
		return Object.prototype.toString.call(thing) === '[object Array]';
	};
}
if (!String.prototype.includes) {
	String.prototype.includes = function includes(thing) {
		return this.indexOf(thing) !== -1;
	};
}
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function startsWith(thing) {
		return this.slice(0, thing.length) === thing;
	};
}
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function endsWith(thing) {
		return this.slice(-thing.length) === thing;
	};
}
if (!String.prototype.trim) {
	String.prototype.trim = function trim() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}
if (!Object.assign) {
	Object.assign = function assign(thing: any, rest: any) {
		for (let i = 1; i < arguments.length; i++) {
			let source = arguments[i];
			for (let k in source) {
				thing[k] = source[k];
			}
		}
		return thing;
	};
}
if (!Object.values) {
	Object.values = function values(thing: any) {
		let out: any[] = [];
		for (let k in thing) {
			out.push(thing[k]);
		}
		return out;
	};
}
if (!Object.keys) {
	Object.keys = function keys(thing: any) {
		let out: any[] = [];
		for (let k in thing) {
			out.push(k);
		}
		return out;
	};
}
if (!Object.entries) {
	Object.entries = function entries(thing: any) {
		let out: any[] = [];
		for (let k in thing) {
			out.push([k, thing[k]]);
		}
		return out;
	};
}
if (!Object.create) {
	Object.create = function (proto: any) {
		function F() {}
		F.prototype = proto;
		return new (F as any)();
	};
}

if (typeof window === 'undefined') {
	// Node
	(global as any).window = global;
} else {
	// browser (possibly NW.js!)
	window.exports = window;
}

if (window.soundManager) {
	soundManager.setup({url: 'https://play.pokemonshowdown.com/swf/'});
	if (window.Replays) soundManager.onready(window.Replays.soundReady);
	soundManager.onready(() => {
		soundManager.createSound({
			id: 'notif',
			url: 'https://play.pokemonshowdown.com/audio/notification.wav',
		});
	});
}

// @ts-ignore
window.nodewebkit = !!(typeof process !== 'undefined' && process.versions && process.versions['node-webkit']);

function getString(str: any) {
	if (typeof str === 'string' || typeof str === 'number') return '' + str;
	return '';
}

function toID(text: any) {
	if (text?.id) {
		text = text.id;
	} else if (text?.userid) {
		text = text.userid;
	}
	if (typeof text !== 'string' && typeof text !== 'number') return '' as ID;
	return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '') as ID;
}

function toUserid(text: any) {
	return toID(text);
}

/**
 * Like string.split(delimiter), but only recognizes the first `limit`
 * delimiters (default 1).
 *
 * `"1 2 3 4".split(" ", 2) => ["1", "2"]`
 *
 * `splitFirst("1 2 3 4", " ", 1) => ["1", "2 3 4"]`
 *
 * Returns an array of length exactly limit + 1.
 */
function splitFirst(str: string, delimiter: string, limit: number = 1) {
	let splitStr: string[] = [];
	while (splitStr.length < limit) {
		let delimiterIndex = str.indexOf(delimiter);
		if (delimiterIndex >= 0) {
			splitStr.push(str.slice(0, delimiterIndex));
			str = str.slice(delimiterIndex + delimiter.length);
		} else {
			splitStr.push(str);
			str = '';
		}
	}
	splitStr.push(str);
	return splitStr;
}

/**
 * Sanitize a room ID by removing anything that isn't alphanumeric or `-`.
 * Shouldn't actually do anything except against malicious input.
 */
function toRoomid(roomid: string) {
	return roomid.replace(/[^a-zA-Z0-9-]+/g, '').toLowerCase();
}

function toName(name: any) {
	if (typeof name !== 'string' && typeof name !== 'number') return '';
	name = ('' + name).replace(/[\|\s\[\]\,\u202e]+/g, ' ').trim();
	if (name.length > 18) name = name.substr(0, 18).trim();

	// remove zalgo
	name = name.replace(
		/[\u0300-\u036f\u0483-\u0489\u0610-\u0615\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06ED\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]{3,}/g,
		''
	);
	name = name.replace(/[\u239b-\u23b9]/g, '');

	return name;
}

interface SpriteData {
	w: number;
	h: number;
	y?: number;
	gen?: number;
	url?: string;
	rawHTML?: string;
	pixelated?: boolean;
	isBackSprite?: boolean;
	cryurl?: string;
	shiny?: boolean;
}

interface TeambuilderSpriteData {
	x: number;
	y: number;
	spriteDir: string;
	spriteid: string;
	shiny?: boolean;
}

const Dex = new class implements ModdedDex {
	readonly gen = 8;
	readonly modid = 'gen8' as ID;
	readonly cache = null!;

	readonly statNames: ReadonlyArray<StatName> = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
	readonly statNamesExceptHP: ReadonlyArray<StatNameExceptHP> = ['atk', 'def', 'spa', 'spd', 'spe'];

	pokeballs: string[] | null = null;

	resourcePrefix = (() => {
		let prefix = '';
		if (window.document?.location?.protocol !== 'http:') prefix = 'https:';
		return `${prefix}//play.pokemonshowdown.com/`;
	})();

	fxPrefix = (() => {
		if (window.document?.location?.protocol === 'file:') {
			if (window.Replays) return `https://play.pokemonshowdown.com/fx/`;
			return `fx/`;
		}
		return `//play.pokemonshowdown.com/fx/`;
	})();

	loadedSpriteData = {xy: 1, bw: 0};
	moddedDexes: {[mod: string]: ModdedDex} = {};

	mod(modid: ID): ModdedDex {
		if (modid === 'gen8') return this;
		if (!window.BattleTeambuilderTable) return this;
		if (modid in this.moddedDexes) {
			return this.moddedDexes[modid];
		}
		this.moddedDexes[modid] = new ModdedDex(modid);
		return this.moddedDexes[modid];
	}
	forGen(gen: number) {
		if (!gen) return this;
		return this.mod(`gen${gen}` as ID);
	}

	resolveAvatar(avatar: string): string {
		if (window.BattleAvatarNumbers && avatar in BattleAvatarNumbers) {
			avatar = BattleAvatarNumbers[avatar];
		}
		if (avatar.charAt(0) === '#') {
			return Dex.resourcePrefix + 'sprites/trainers-custom/' + toID(avatar.substr(1)) + '.png';
		}
		if (avatar.includes('.') && window.Config?.server?.registered) {
			// custom avatar served by the server
			let protocol = (Config.server.port === 443) ? 'https' : 'http';
			return protocol + '://' + Config.server.host + ':' + Config.server.port +
				'/avatars/' + encodeURIComponent(avatar).replace(/\%3F/g, '?');
		}
		return Dex.resourcePrefix + 'sprites/trainers/' + Dex.sanitizeName(avatar || 'unknown') + '.png';
	}

	/**
	 * This is used to sanitize strings from data files like `moves.js` and
	 * `teambuilder-tables.js`.
	 *
	 * This makes sure untrusted strings can't wreak havoc if someone forgets to
	 * escape it before putting it in HTML.
	 *
	 * None of these characters belong in these files, anyway. (They can be used
	 * in move descriptions, but those are served from `text.js`, which are
	 * definitely always treated as unsanitized.)
	 */
	sanitizeName(name: any) {
		if (!name) return '';
		return ('' + name)
			.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
			.slice(0, 50);
	}

	prefs(prop: string, value?: any, save?: boolean) {
		// @ts-ignore
		return window.Storage?.prefs?.(prop, value, save);
	}

	getShortName(name: string) {
		let shortName = name.replace(/[^A-Za-z0-9]+$/, '');
		if (shortName.indexOf('(') >= 0) {
			shortName += name.slice(shortName.length).replace(/[^\(\)]+/g, '').replace(/\(\)/g, '');
		}
		return shortName;
	}

	getEffect(name: string | null | undefined): PureEffect | Item | Ability | Move {
		name = (name || '').trim();
		if (name.substr(0, 5) === 'item:') {
			return Dex.getItem(name.substr(5).trim());
		} else if (name.substr(0, 8) === 'ability:') {
			return Dex.getAbility(name.substr(8).trim());
		} else if (name.substr(0, 5) === 'move:') {
			return Dex.getMove(name.substr(5).trim());
		}
		let id = toID(name);
		return new PureEffect(id, name);
	}

	getMove(nameOrMove: string | Move | null | undefined): Move {
		if (nameOrMove && typeof nameOrMove !== 'string') {
			// TODO: don't accept Moves here
			return nameOrMove;
		}
		let name = nameOrMove || '';
		let id = toID(nameOrMove);
		if (window.BattleAliases && id in BattleAliases) {
			name = BattleAliases[id];
			id = toID(name);
		}
		if (!window.BattleMovedex) window.BattleMovedex = {};
		let data = window.BattleMovedex[id];
		if (data && typeof data.exists === 'boolean') return data;

		if (!data && id.substr(0, 11) === 'hiddenpower' && id.length > 11) {
			let [, hpWithType, hpPower] = /([a-z]*)([0-9]*)/.exec(id)!;
			data = {
				...(window.BattleMovedex[hpWithType] || {}),
				basePower: Number(hpPower) || 60,
			};
		}
		if (!data && id.substr(0, 6) === 'return' && id.length > 6) {
			data = {
				...(window.BattleMovedex['return'] || {}),
				basePower: Number(id.slice(6)),
			};
		}
		if (!data && id.substr(0, 11) === 'frustration' && id.length > 11) {
			data = {
				...(window.BattleMovedex['frustration'] || {}),
				basePower: Number(id.slice(11)),
			};
		}

		if (!data) data = {exists: false};
		let move = new Move(id, name, data);
		window.BattleMovedex[id] = move;
		return move;
	}

	getGen3Category(type: string) {
		return [
			'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Psychic', 'Dark', 'Dragon',
		].includes(type) ? 'Special' : 'Physical';
	}

	getItem(nameOrItem: string | Item | null | undefined): Item {
		if (nameOrItem && typeof nameOrItem !== 'string') {
			// TODO: don't accept Items here
			return nameOrItem;
		}
		let name = nameOrItem || '';
		let id = toID(nameOrItem);
		if (window.BattleAliases && id in BattleAliases) {
			name = BattleAliases[id];
			id = toID(name);
		}
		if (!window.BattleItems) window.BattleItems = {};
		let data = window.BattleItems[id];
		if (data && typeof data.exists === 'boolean') return data;
		if (!data) data = {exists: false};
		let item = new Item(id, name, data);
		window.BattleItems[id] = item;
		return item;
	}

	getAbility(nameOrAbility: string | Ability | null | undefined): Ability {
		if (nameOrAbility && typeof nameOrAbility !== 'string') {
			// TODO: don't accept Abilities here
			return nameOrAbility;
		}
		let name = nameOrAbility || '';
		let id = toID(nameOrAbility);
		if (window.BattleAliases && id in BattleAliases) {
			name = BattleAliases[id];
			id = toID(name);
		}
		if (!window.BattleAbilities) window.BattleAbilities = {};
		let data = window.BattleAbilities[id];
		if (data && typeof data.exists === 'boolean') return data;
		if (!data) data = {exists: false};
		let ability = new Ability(id, name, data);
		window.BattleAbilities[id] = ability;
		return ability;
	}

	getTemplate(nameOrTemplate: string | Template | null | undefined): Template {
		if (nameOrTemplate && typeof nameOrTemplate !== 'string') {
			// TODO: don't accept Templates here
			return nameOrTemplate;
		}
		let name = nameOrTemplate || '';
		let id = toID(nameOrTemplate);
		let formid = id;
		if (!window.BattlePokedexAltForms) window.BattlePokedexAltForms = {};
		if (formid in window.BattlePokedexAltForms) return window.BattlePokedexAltForms[formid];
		if (window.BattleAliases && id in BattleAliases) {
			name = BattleAliases[id];
			id = toID(name);
		}
		if (!window.BattlePokedex) window.BattlePokedex = {};
		let data = window.BattlePokedex[id];

		let template: Template;
		if (data && typeof data.exists === 'boolean') {
			template = data;
		} else {
			if (!data) data = {exists: false};
			if (!data.tier && id.slice(-5) === 'totem') {
				data.tier = this.getTemplate(id.slice(0, -5)).tier;
			}
			if (!data.tier && data.baseSpecies && toID(data.baseSpecies) !== id) {
				data.tier = this.getTemplate(data.baseSpecies).tier;
			}
			template = new Template(id, name, data);
			window.BattlePokedex[id] = template;
		}

		if (formid === id || !template.otherForms || !template.otherForms.includes(formid)) {
			return template;
		}
		let forme = formid.slice(id.length);
		forme = forme[0].toUpperCase() + forme.slice(1);
		name = template.baseSpecies + (forme ? '-' + forme : '');

		template = window.BattlePokedexAltForms[formid] = new Template(formid, name, {
			...template,
			name,
			forme,
		});
		return template;
	}

	/** @deprecated */
	getTier(pokemon: string, genNum = 8, mod?: string): string {
		let template = this.getTemplate(pokemon);
		if (genNum < 8) template = this.forGen(genNum).getTemplate(pokemon);
		let table = window.BattleTeambuilderTable;
		if (!table) return template.tier;
		if (mod === 'doubles') {
			table = table[`gen${genNum}doubles`];
		} else if (genNum < 8) {
			table = table[`gen${genNum}`];
		} else if (mod && table[toID(mod)]) {
			table = table[toID(mod)];
		}

		if (!table.overrideTier) return template.tier;

		let id = template.id;
		if (id in table.overrideTier) {
			return table.overrideTier[id];
		}

		return template.tier;
	}

	getType(type: any): Effect {
		if (!type || typeof type === 'string') {
			let id = toID(type) as string;
			id = id.substr(0, 1).toUpperCase() + id.substr(1);
			type = (window.BattleTypeChart && window.BattleTypeChart[id]) || {};
			if (type.damageTaken) type.exists = true;
			if (!type.id) type.id = id;
			if (!type.name) type.name = id;
			if (!type.effectType) {
				type.effectType = 'Type';
			}
		}
		return type;
	}

	hasAbility(template: Template, ability: string) {
		for (const i in template.abilities) {
			// @ts-ignore
			if (ability === template.abilities[i]) return true;
		}
		return false;
	}

	loadSpriteData(gen: 'xy' | 'bw') {
		if (typeof document !== undefined) {
			if (this.loadedSpriteData[gen]) return;
			this.loadedSpriteData[gen] = 1;

			let path = $('script[src*="pokedex-mini.js"]').attr('src') || '';
			let qs = '?' + (path.split('?')[1] || '');
			path = (path.match(/.+?(?=data\/pokedex-mini\.js)/) || [])[0] || '';

			let el = document.createElement('script');
			el.src = path + 'data/pokedex-mini-bw.js' + qs;
			document.getElementsByTagName('body')[0].appendChild(el);
		} else {
			throw new Error('Unsupported operation');
		}
	}
	getSpriteData(pokemon: Pokemon | Template | string, siden: number, options: {
		gen?: number, shiny?: boolean, gender?: GenderName, afd?: boolean, noScale?: boolean, mod?: string,
	} = {gen: 6}) {
		const mechanicsGen = options.gen || 6;
		let isDynamax = false;
		if (pokemon instanceof Pokemon) {
			if (pokemon.volatiles.transform) {
				options.shiny = pokemon.volatiles.transform[2];
				options.gender = pokemon.volatiles.transform[3];
			} else {
				options.shiny = pokemon.shiny;
				options.gender = pokemon.gender;
			}
			if (pokemon.volatiles.dynamax) isDynamax = true;
			pokemon = pokemon.getSpecies();
		}
		const template = Dex.getTemplate(pokemon);
		let spriteData = {
			gen: mechanicsGen,
			w: 96,
			h: 96,
			y: 0,
			url: Dex.resourcePrefix + 'sprites/',
			pixelated: true,
			isBackSprite: false,
			cryurl: '',
			shiny: options.shiny,
		};
		let name = template.spriteid;
		let dir;
		let facing;
		if (siden) {
			dir = '';
			facing = 'front';
		} else {
			spriteData.isBackSprite = true;
			dir = '-back';
			facing = 'back';
		}

		// Decide which gen sprites to use.
		//
		// There are several different generations we care about here:
		//
		//   - mechanicsGen: the generation number of the mechanics and battle (options.gen)
		//   - graphicsGen: the generation number of sprite/field graphics the user has requested.
		//     This will default to mechanicsGen, but may be altered depending on user preferences.
		//   - spriteData.gen: the generation number of a the specific Pokemon sprite in question.
		//     This defaults to graphicsGen, but if the graphicsGen doesn't have a sprite for the Pokemon
		//     (eg. Darmanitan in graphicsGen 2) then we go up gens until it exists.
		//
		let graphicsGen = mechanicsGen;
		if (Dex.prefs('nopastgens')) graphicsGen = 6;
		if (Dex.prefs('bwgfx') && graphicsGen >= 6) graphicsGen = 5;
		spriteData.gen = Math.max(graphicsGen, Math.min(template.gen, 5));
		const baseDir = ['', 'gen1', 'gen2', 'gen3', 'gen4', 'gen5', '', '', ''][spriteData.gen];

		let animationData = null;
		let miscData = null;
		let speciesid = template.speciesid;
		if (template.isTotem) speciesid = toID(name);
		if (baseDir === '' && window.BattlePokemonSprites) {
			animationData = BattlePokemonSprites[speciesid];
		}
		if (baseDir === 'gen5' && window.BattlePokemonSpritesBW) {
			animationData = BattlePokemonSpritesBW[speciesid];
		}
		if (window.BattlePokemonSprites) miscData = BattlePokemonSprites[speciesid];
		if (!miscData && window.BattlePokemonSpritesBW) miscData = BattlePokemonSpritesBW[speciesid];
		if (!animationData) animationData = {};
		if (!miscData) miscData = {};

		if (miscData.num > 0) {
			let baseSpeciesid = toID(template.baseSpecies);
			spriteData.cryurl = 'audio/cries/' + baseSpeciesid;
			let formeid = template.formeid;
			if (template.isMega || formeid && (
				formeid === '-sky' ||
				formeid === '-therian' ||
				formeid === '-primal' ||
				formeid === '-eternal' ||
				baseSpeciesid === 'kyurem' ||
				baseSpeciesid === 'necrozma' ||
				formeid === '-super' ||
				formeid === '-unbound' ||
				formeid === '-midnight' ||
				formeid === '-school' ||
				baseSpeciesid === 'oricorio' ||
				baseSpeciesid === 'zygarde'
			)) {
				spriteData.cryurl += formeid;
			}
			spriteData.cryurl += (window.nodewebkit ? '.ogg' : '.mp3');
		}

		if (options.shiny && mechanicsGen > 1) dir += '-shiny';

		// April Fool's 2014
		if (window.Config && Config.server && Config.server.afd || options.afd) {
			dir = 'afd' + dir;
			spriteData.url += dir + '/' + name + '.png';
			return spriteData;
		}

		// Mod Cries
		if (options.mod) {
			spriteData.cryurl = `sprites/${options.mod}/audio/${toID(template.baseSpecies)}`;
			spriteData.cryurl += (window.nodewebkit ? '.ogg' : '.mp3');
		}

		if (animationData[facing + 'f'] && options.gender === 'F') facing += 'f';
		let allowAnim = !Dex.prefs('noanim') && !Dex.prefs('nogif');
		if (allowAnim && spriteData.gen >= 6) spriteData.pixelated = false;
		if (allowAnim && animationData[facing] && spriteData.gen >= 5) {
			if (facing.slice(-1) === 'f') name += '-f';
			dir = baseDir + 'ani' + dir;

			spriteData.w = animationData[facing].w;
			spriteData.h = animationData[facing].h;
			spriteData.url += dir + '/' + name + '.gif';
		} else {
			// There is no entry or enough data in pokedex-mini.js
			// Handle these in case-by-case basis; either using BW sprites or matching the played gen.
			dir = (baseDir || 'gen5') + dir;

			// Gender differences don't exist prior to Gen 4,
			// so there are no sprites for it
			if (spriteData.gen >= 4 && miscData['frontf'] && options.gender === 'F') {
				name += '-f';
			}

			spriteData.url += dir + '/' + name + '.png';
		}

		if (!options.noScale) {
			if (graphicsGen > 4) {
				// no scaling
			} else if (!spriteData.isBackSprite) {
				spriteData.w *= 2;
				spriteData.h *= 2;
				spriteData.y += -16;
			} else {
				// old gen backsprites are multiplied by 1.5x by the 3D engine
				spriteData.w *= 2 / 1.5;
				spriteData.h *= 2 / 1.5;
				spriteData.y += -11;
			}
			if (spriteData.gen <= 2) spriteData.y += 2;
		}
		if (isDynamax && !options.noScale) {
			spriteData.w *= 2;
			spriteData.h *= 2;
			spriteData.y += -22;
		} else if ((template.isTotem || isDynamax) && !options.noScale) {
			spriteData.w *= 1.5;
			spriteData.h *= 1.5;
			spriteData.y += -11;
		}

		return spriteData;
	}

	getPokemonIconNum(id: ID, isFemale?: boolean, facingLeft?: boolean) {
		let num = 0;
		if (window.BattlePokemonSprites?.[id]?.num) {
			num = BattlePokemonSprites[id].num;
		} else if (window.BattlePokedex?.[id]?.num) {
			num = BattlePokedex[id].num;
		}
		if (num < 0) num = 0;
		if (num > 890) num = 0;

		if (window.BattlePokemonIconIndexes?.[id]) {
			num = BattlePokemonIconIndexes[id];
		}

		if (isFemale) {
			if (['unfezant', 'frillish', 'jellicent', 'meowstic', 'pyroar'].includes(id)) {
				num = BattlePokemonIconIndexes[id + 'f'];
			}
		}
		if (facingLeft) {
			if (BattlePokemonIconIndexesLeft[id]) {
				num = BattlePokemonIconIndexesLeft[id];
			}
		}
		return num;
	}

	getPokemonIcon(pokemon: any, facingLeft?: boolean) {
		if (pokemon === 'pokeball') {
			return `background:transparent url(${Dex.resourcePrefix}sprites/pokemonicons-pokeball-sheet.png) no-repeat scroll -0px 4px`;
		} else if (pokemon === 'pokeball-statused') {
			return `background:transparent url(${Dex.resourcePrefix}sprites/pokemonicons-pokeball-sheet.png) no-repeat scroll -40px 4px`;
		} else if (pokemon === 'pokeball-fainted') {
			return `background:transparent url(${Dex.resourcePrefix}sprites/pokemonicons-pokeball-sheet.png) no-repeat scroll -80px 4px;opacity:.4;filter:contrast(0)`;
		} else if (pokemon === 'pokeball-none') {
			return `background:transparent url(${Dex.resourcePrefix}sprites/pokemonicons-pokeball-sheet.png) no-repeat scroll -80px 4px`;
		}

		let id = toID(pokemon);
		if (pokemon?.species) id = toID(pokemon.species);
		if (pokemon?.volatiles?.formechange && !pokemon.volatiles.transform) {
			id = toID(pokemon.volatiles.formechange[1]);
		}
		let num = this.getPokemonIconNum(id, pokemon?.gender === 'F', facingLeft);

		let top = Math.floor(num / 12) * 30;
		let left = (num % 12) * 40;
		let fainted = (pokemon?.fainted ? `;opacity:.3;filter:grayscale(100%) brightness(.5)` : ``);
		return `background:transparent url(${Dex.resourcePrefix}sprites/pokemonicons-sheet.png?g8) no-repeat scroll -${left}px -${top}px${fainted}`;
	}

	getTeambuilderSpriteData(pokemon: any, gen: number = 0): TeambuilderSpriteData {
		let id = toID(pokemon.species);
		let spriteid = pokemon.spriteid;
		let template = Dex.getTemplate(pokemon.species);
		if (pokemon.species && !spriteid) {
			spriteid = template.spriteid || toID(pokemon.species);
		}
		if (template.exists === false) return { spriteDir: 'sprites/gen5', spriteid: '0', x: 10, y: 5 };
		const spriteData: TeambuilderSpriteData = {
			spriteid,
			spriteDir: 'sprites/dex',
			x: -2,
			y: -3,
		};
		if (pokemon.shiny) spriteData.shiny = true;
		if (Dex.prefs('nopastgens')) gen = 6;
		let xydexExists = (!template.isNonstandard || template.isNonstandard === 'Past') || [
			"pikachustarter", "eeveestarter", "meltan", "melmetal", "fidgit", "stratagem", "tomohawk", "mollux", "crucibelle", "crucibellemega", "kerfluffle", "pajantom", "jumbao", "caribolt", "smokomodo", "snaelstrom", "equilibra", "scratchet", "pluffle", "smogecko", "pokestarufo", "pokestarufo2", "pokestarbrycenman", "pokestarmt", "pokestarmt2", "pokestargiant", "pokestarhumanoid", "pokestarmonster", "pokestarf00", "pokestarf002", "pokestarspirit",
		].includes(template.id);
		if (template.gen === 8) xydexExists = false;
		if ((!gen || gen >= 6) && xydexExists) {
			if (template.gen >= 7) {
				spriteData.x = -6;
				spriteData.y = -7;
			} else if (id.substr(0, 6) === 'arceus') {
				spriteData.x = -2;
				spriteData.y = 7;
			} else if (id === 'garchomp') {
				spriteData.x = -2;
				spriteData.y = 2;
			} else if (id === 'garchompmega') {
				spriteData.x = -2;
				spriteData.y = 0;
			}
			return spriteData;
		}
		spriteData.spriteDir = 'sprites/gen5';
		if (gen <= 1 && template.gen <= 1) spriteData.spriteDir = 'sprites/gen1';
		else if (gen <= 2 && template.gen <= 2) spriteData.spriteDir = 'sprites/gen2';
		else if (gen <= 3 && template.gen <= 3) spriteData.spriteDir = 'sprites/gen3';
		else if (gen <= 4 && template.gen <= 4) spriteData.spriteDir = 'sprites/gen4';
		spriteData.x = 10;
		spriteData.y = 5;
		return spriteData;
	}

	getTeambuilderSprite(pokemon: any, gen: number = 0) {
		if (!pokemon) return '';
		const data = this.getTeambuilderSpriteData(pokemon, gen);
		const shiny = (data.shiny ? '-shiny' : '');
		return 'background-image:url(' + Dex.resourcePrefix + data.spriteDir + shiny + '/' + data.spriteid + '.png);background-position:' + data.x + 'px ' + data.y + 'px;background-repeat:no-repeat';
	}

	getItemIcon(item: any) {
		let num = 0;
		if (typeof item === 'string' && exports.BattleItems) item = exports.BattleItems[toID(item)];
		if (item?.spritenum) num = item.spritenum;

		let top = Math.floor(num / 16) * 24;
		let left = (num % 16) * 24;
		return 'background:transparent url(' + Dex.resourcePrefix + 'sprites/itemicons-sheet.png?g8) no-repeat scroll -' + left + 'px -' + top + 'px';
	}

	getTypeIcon(type: string, b?: boolean) { // b is just for utilichart.js
		if (!type) return '';
		let sanitizedType = type.replace(/\?/g, '%3f');
		return '<img src="' + Dex.resourcePrefix + 'sprites/types/' + sanitizedType + '.png" alt="' + type + '" height="14" width="32"' + (b ? ' class="b"' : '') + ' />';
	}

	getPokeballs() {
		if (this.pokeballs) return this.pokeballs;
		this.pokeballs = [];
		if (!window.BattleItems) window.BattleItems = {};
		for (const data of Object.values(window.BattleItems) as AnyObject[]) {
			if (!data.isPokeball) continue;
			this.pokeballs.push(data.name);
		}
		return this.pokeballs;
	}
};

class ModdedDex {
	readonly gen: number;
	readonly modid: ID;
	readonly cache = {
		Moves: {} as any as {[k: string]: Move},
		Items: {} as any as {[k: string]: Item},
		Abilities: {} as any as {[k: string]: Ability},
		Templates: {} as any as {[k: string]: Template},
	};
	pokeballs: string[] | null = null;
	constructor(modid: ID) {
		this.modid = modid;
		let gen = parseInt(modid.slice(3), 10);
		if (!modid.startsWith('gen') || !gen) throw new Error("Unsupported modid");
		this.gen = gen;
	}
	getMove(name: string): Move {
		let id = toID(name);
		if (window.BattleAliases && id in BattleAliases) {
			name = BattleAliases[id];
			id = toID(name);
		}
		if (this.cache.Moves.hasOwnProperty(id)) return this.cache.Moves[id];

		let data = {...Dex.getMove(name)};

		const table = window.BattleTeambuilderTable[this.modid];
		if (id in table.overrideAcc) data.accuracy = table.overrideAcc[id];
		if (id in table.overrideBP) data.basePower = table.overrideBP[id];
		if (id in table.overridePP) data.pp = table.overridePP[id];
		if (id in table.overrideMoveType) data.type = table.overrideMoveType[id];
		for (let i = this.gen; i < 8; i++) {
			if (id in window.BattleTeambuilderTable['gen' + i].overrideMoveDesc) {
				data.shortDesc = window.BattleTeambuilderTable['gen' + i].overrideMoveDesc[id];
				break;
			}
		}
		if (this.gen <= 3 && data.category !== 'Status') {
			data.category = Dex.getGen3Category(data.type);
		}

		const move = new Move(id, name, data);
		this.cache.Moves[id] = move;
		return move;
	}
	getItem(name: string): Item {
		let id = toID(name);
		if (window.BattleAliases && id in BattleAliases) {
			name = BattleAliases[id];
			id = toID(name);
		}
		if (this.cache.Items.hasOwnProperty(id)) return this.cache.Items[id];

		let data = {...Dex.getItem(name)};

		for (let i = this.gen; i < 8; i++) {
			if (id in window.BattleTeambuilderTable['gen' + i].overrideItemDesc) {
				data.shortDesc = window.BattleTeambuilderTable['gen' + i].overrideItemDesc[id];
				break;
			}
		}

		const item = new Item(id, name, data);
		this.cache.Items[id] = item;
		return item;
	}
	getAbility(name: string): Ability {
		let id = toID(name);
		if (window.BattleAliases && id in BattleAliases) {
			name = BattleAliases[id];
			id = toID(name);
		}
		if (this.cache.Abilities.hasOwnProperty(id)) return this.cache.Abilities[id];

		let data = {...Dex.getAbility(name)};

		for (let i = this.gen; i < 8; i++) {
			if (id in window.BattleTeambuilderTable['gen' + i].overrideAbilityDesc) {
				data.shortDesc = window.BattleTeambuilderTable['gen' + i].overrideAbilityDesc[id];
				break;
			}
		}

		const ability = new Ability(id, name, data);
		this.cache.Abilities[id] = ability;
		return ability;
	}
	getTemplate(name: string): Template {
		let id = toID(name);
		if (window.BattleAliases && id in BattleAliases) {
			name = BattleAliases[id];
			id = toID(name);
		}
		if (this.cache.Templates.hasOwnProperty(id)) return this.cache.Templates[id];

		let data = {...Dex.getTemplate(name)};

		const table = window.BattleTeambuilderTable[this.modid];
		if (this.gen < 3) {
			data.abilities = {0: "None"};
		} else {
			let abilities = {...data.abilities};
			if (id in table.overrideAbility) {
				abilities['0'] = table.overrideAbility[id];
			}
			if (id in table.removeSecondAbility) {
				delete abilities['1'];
			}
			if (id in table.overrideHiddenAbility) {
				abilities['H'] = table.overrideHiddenAbility[id];
			}
			if (this.gen < 5) delete abilities['H'];
			if (this.gen < 7) delete abilities['S'];

			data.abilities = abilities;
		}
		if (id in table.overrideStats) {
			data.baseStats = {...data.baseStats, ...table.overrideStats[id]};
		}
		if (id in table.overrideType) data.types = table.overrideType[id].split('/');

		if (id in table.overrideTier) data.tier = table.overrideTier[id];
		if (!data.tier && id.slice(-5) === 'totem') {
			data.tier = this.getTemplate(id.slice(0, -5)).tier;
		}
		if (!data.tier && data.baseSpecies && toID(data.baseSpecies) !== id) {
			data.tier = this.getTemplate(data.baseSpecies).tier;
		}
		if (data.gen > this.gen) data.tier = 'Illegal';

		const template = new Template(id, name, data);
		this.cache.Templates[id] = template;
		return template;
	}

	getPokeballs() {
		if (this.pokeballs) return this.pokeballs;
		this.pokeballs = [];
		if (!window.BattleItems) window.BattleItems = {};
		for (const data of Object.values(window.BattleItems) as AnyObject[]) {
			if (data.gen && data.gen > this.gen) continue;
			if (!data.isPokeball) continue;
			this.pokeballs.push(data.name);
		}
		return this.pokeballs;
	}
}

if (typeof require === 'function') {
	// in Node
	(global as any).Dex = Dex;
	(global as any).toID = toID;
}
class BattleSceneStub {
	animating: boolean = false;
	acceleration: number = NaN;
	gen: number = NaN;
	activeCount: number = NaN;
	numericId: number = NaN;
	timeOffset: number = NaN;
	interruptionCount: number = NaN;
	messagebarOpen: boolean = false;
	log: BattleLog = {add: (args: Args, kwargs?: KWArgs) => {}} as any;

	abilityActivateAnim(pokemon: Pokemon, result: string): void { }
	addPokemonSprite(pokemon: Pokemon): PokemonSprite { return null!; }
	addSideCondition(siden: number, id: ID, instant?: boolean | undefined): void { }
	animationOff(): void { }
	animationOn(): void { }
	maybeCloseMessagebar(args: Args, kwArgs: KWArgs): boolean { return false; }
	closeMessagebar(): boolean { return false; }
	damageAnim(pokemon: Pokemon, damage: string | number): void { }
	destroy(): void { }
	finishAnimations(): JQuery.Promise<JQuery<HTMLElement>, any, any> | undefined { return void(0); }
	healAnim(pokemon: Pokemon, damage: string | number): void { }
	hideJoinButtons(): void { }
	incrementTurn(): void { }
	updateAcceleration(): void { }
	message(message: string, hiddenMessage?: string | undefined): void { }
	pause(): void { }
	preemptCatchup(): void { }
	removeSideCondition(siden: number, id: ID): void { }
	reset(): void { }
	resetBgm(): void { }
	updateBgm(): void { }
	resultAnim(
		pokemon: Pokemon, result: string, type: "bad" | "good" | "neutral" | "par" | "psn" | "frz" | "slp" | "brn"
	): void { }
	typeAnim(pokemon: Pokemon, types: string): void { }
	resume(): void { }
	runMoveAnim(moveid: ID, participants: Pokemon[]): void { }
	runOtherAnim(moveid: ID, participants: Pokemon[]): void { }
	runPrepareAnim(moveid: ID, attacker: Pokemon, defender: Pokemon): void { }
	runResidualAnim(moveid: ID, pokemon: Pokemon): void { }
	runStatusAnim(moveid: ID, participants: Pokemon[]): void { }
	startAnimations(): void { }
	teamPreview(): void { }
	teamPreviewEnd(): void { }
	updateGen(): void { }
	updateSidebar(side: Side): void { }
	updateSidebars(): void { }
	updateStatbars(): void { }
	updateWeather(instant?: boolean | undefined): void { }
	upkeepWeather(): void { }
	wait(time: number): void { }
	setFrameHTML(html: any): void { }
	setControlsHTML(html: any): void { }
	removeEffect(pokemon: Pokemon, id: ID, instant?: boolean) { }
	addEffect(pokemon: Pokemon, id: ID, instant?: boolean) { }
	animSummon(pokemon: Pokemon, slot: number, instant?: boolean) { }
	animUnsummon(pokemon: Pokemon, instant?: boolean) { }
	animDragIn(pokemon: Pokemon, slot: number) { }
	animDragOut(pokemon: Pokemon) { }
	updateStatbar(pokemon: Pokemon, updatePrevhp?: boolean, updateHp?: boolean) { }
	updateStatbarIfExists(pokemon: Pokemon, updatePrevhp?: boolean, updateHp?: boolean) { }
	animTransform(pokemon: Pokemon, isCustomAnim?: boolean, isPermanent?: boolean) { }
	clearEffects(pokemon: Pokemon) { }
	removeTransform(pokemon: Pokemon) { }
	animFaint(pokemon: Pokemon) { }
	animReset(pokemon: Pokemon) { }
	anim(pokemon: Pokemon, end: ScenePos, transition?: string) { }
	beforeMove(pokemon: Pokemon) { }
	afterMove(pokemon: Pokemon) { }
	updateSpritesForSide(side: Side) { }
}

if (typeof require === 'function') {
	// in Node
	(global as any).BattleSceneStub = BattleSceneStub;
}

class BattleScene extends BattleSceneStub {
	constructor(...a: any[]) {
		super();
	}
}
/**
 * Pokemon Showdown Battle
 *
 * This is the main file for handling battle animations
 *
 * Licensing note: PS's client has complicated licensing:
 * - The client as a whole is AGPLv3
 * - The battle replay/animation engine (battle-*.ts) by itself is MIT
 *
 * Layout:
 *
 * - Battle
 *   - Side
 *     - Pokemon
 *   - BattleScene
 *     - BattleLog
 *       - BattleTextParser
 *
 * When a Battle receives a message, it splits the message into tokens
 * and parses what happens, updating its own state, and then telling
 * BattleScene to do any relevant animations. The tokens then get
 * passed directly into BattleLog. If the message is an in-battle
 * message, it'll be extracted by BattleTextParser, which adds it to
 * both the battle log itself, as well as the messagebar.
 *
 * @author Guangcong Luo <guangcongluo@gmail.com>
 * @license MIT
 */

/** [id, element?, ...misc] */
type EffectState = any[] & {0: ID};
/** [name, minTimeLeft, maxTimeLeft] */
type WeatherState = [string, number, number];
type EffectTable = {[effectid: string]: EffectState};
type HPColor = 'r' | 'y' | 'g';

class Pokemon implements PokemonDetails, PokemonHealth {
	name = '';
	species = '';

	/**
	 * A string representing information extractable from textual
	 * messages: side, nickname.
	 *
	 * Will be the empty string between Team Preview and the first
	 * switch-in.
	 *
	 * Examples: `p1: Unown` or `p2: Sparky`
	 */
	ident = '';
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
	details = '';
	/**
	 * `` `${ident}|${details}` ``. Tracked for ease of searching.
	 *
	 * As with ident, blank before the first switch-in, and will only
	 * change during the first switch-in.
	 */
	searchid = '';

	side: Side;
	slot = 0;

	fainted = false;
	hp = 0;
	maxhp = 1000;
	level = 100;
	gender: GenderName = 'N';
	shiny = false;

	hpcolor: HPColor = 'g';
	moves: string[] = [];
	ability = '';
	baseAbility = '';
	item = '';
	itemEffect = '';
	prevItem = '';
	prevItemEffect = '';

	boosts: {[stat: string]: number} = {};
	status: StatusName | 'tox' | '' | '???' = '';
	statusStage = 0;
	volatiles: EffectTable = {};
	turnstatuses: EffectTable = {};
	movestatuses: EffectTable = {};
	lastMove = '';

	/** [[moveName, ppUsed]] */
	moveTrack: [string, number][] = [];
	statusData = {sleepTurns: 0, toxicTurns: 0};

	sprite: PokemonSprite;

	constructor(data: PokemonDetails, side: Side) {
		this.side = side;
		this.species = data.species;

		this.details = data.details;
		this.name = data.name;
		this.level = data.level;
		this.shiny = data.shiny;
		this.gender = data.gender || 'N';
		this.ident = data.ident;
		this.searchid = data.searchid;

		this.sprite = side.battle.scene.addPokemonSprite(this);
	}

	isActive() {
		return this.side.active.includes(this);
	}

	getHPColor(): HPColor {
		if (this.hpcolor) return this.hpcolor;
		let ratio = this.hp / this.maxhp;
		if (ratio > 0.5) return 'g';
		if (ratio > 0.2) return 'y';
		return 'r';
	}
	getHPColorClass() {
		switch (this.getHPColor()) {
		case 'y': return ' hpbar-yellow';
		case 'r': return ' hpbar-red';
		}
		return '';
	}
	static getPixelRange(pixels: number, color: HPColor | ''): [number, number] {
		let epsilon = 0.5 / 714;

		if (pixels === 0) return [0, 0];
		if (pixels === 1) return [0 + epsilon, 2 / 48 - epsilon];
		if (pixels === 9) {
			if (color === 'y') { // ratio is > 0.2
				return [0.2 + epsilon, 10 / 48 - epsilon];
			} else { // ratio is <= 0.2
				return [9 / 48, 0.2];
			}
		}
		if (pixels === 24) {
			if (color === 'g') { // ratio is > 0.5
				return [0.5 + epsilon, 25 / 48 - epsilon];
			} else { // ratio is exactly 0.5
				return [0.5, 0.5];
			}
		}
		if (pixels === 48) return [1, 1];

		return [pixels / 48, (pixels + 1) / 48 - epsilon];
	}
	static getFormattedRange(range: [number, number], precision: number, separator: string) {
		if (range[0] === range[1]) {
			let percentage = Math.abs(range[0] * 100);
			if (Math.floor(percentage) === percentage) {
				return percentage + '%';
			}
			return percentage.toFixed(precision) + '%';
		}
		let lower;
		let upper;
		if (precision === 0) {
			lower = Math.floor(range[0] * 100);
			upper = Math.ceil(range[1] * 100);
		} else {
			lower = (range[0] * 100).toFixed(precision);
			upper = (range[1] * 100).toFixed(precision);
		}
		return '' + lower + separator + upper + '%';
	}
	// Returns [min, max] damage dealt as a proportion of total HP from 0 to 1
	getDamageRange(damage: any): [number, number] {
		if (damage[1] !== 48) {
			let ratio = damage[0] / damage[1];
			return [ratio, ratio];
		} else if (damage.length === undefined) {
			// wrong pixel damage.
			// this case exists for backward compatibility only.
			return [damage[2] / 100, damage[2] / 100];
		}
		// pixel damage
		let oldrange = Pokemon.getPixelRange(damage[3], damage[4]);
		let newrange = Pokemon.getPixelRange(damage[3] + damage[0], this.hpcolor);
		if (damage[0] === 0) {
			// no change in displayed pixel width
			return [0, newrange[1] - newrange[0]];
		}
		if (oldrange[0] < newrange[0]) { // swap order
			let r = oldrange;
			oldrange = newrange;
			newrange = r;
		}
		return [oldrange[0] - newrange[1], oldrange[1] - newrange[0]];
	}
	healthParse(hpstring: string, parsedamage?: boolean, heal?: boolean):
		[number, number, number] | [number, number, number, number, HPColor] | null {
		// returns [delta, denominator, percent(, oldnum, oldcolor)] or null
		if (!hpstring || !hpstring.length) return null;
		let parenIndex = hpstring.lastIndexOf('(');
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
				let ret = this.healthParse(hpstring);
				if (ret && (ret[1] === 100)) {
					// support for old replays with nearest-100th damage and health
					return [damage, 100, damage];
				}
				// complicated expressions preserved for backward compatibility
				let percent = Math.round(Math.ceil(damage * 48 / 100) / 48 * 100);
				let pixels = Math.ceil(damage * 48 / 100);
				return [pixels, 48, percent];
			}
			if (hpstring.substr(hpstring.length - 1) !== ')') {
				return null;
			}
			hpstring = hpstring.substr(parenIndex + 1, hpstring.length - parenIndex - 2);
		}

		let oldhp = this.fainted ? 0 : (this.hp || 1);
		let oldmaxhp = this.maxhp;
		let oldwidth = this.hpWidth(100);
		let oldcolor = this.hpcolor;

		this.side.battle.parseHealth(hpstring, this);
		if (oldmaxhp === 0) { // max hp not known before parsing this message
			oldmaxhp = oldhp = this.maxhp;
		}

		let oldnum = oldhp ? (Math.floor(this.maxhp * oldhp / oldmaxhp) || 1) : 0;
		let delta = this.hp - oldnum;
		let deltawidth = this.hpWidth(100) - oldwidth;
		return [delta, this.maxhp, deltawidth, oldnum, oldcolor];
	}
	checkDetails(details?: string) {
		if (!details) return false;
		if (details === this.details) return true;
		if (this.searchid) return false;
		if (details.indexOf(', shiny') >= 0) {
			if (this.checkDetails(details.replace(', shiny', ''))) return true;
		}
		// the actual forme was hidden on Team Preview
		details = details.replace(/(-[A-Za-z0-9]+)?(, |$)/, '-*$2');
		return (details === this.details);
	}
	getIdent() {
		let slots = ['a', 'b', 'c', 'd', 'e', 'f'];
		return this.ident.substr(0, 2) + slots[this.slot] + this.ident.substr(2);
	}
	removeVolatile(volatile: ID) {
		this.side.battle.scene.removeEffect(this, volatile);
		if (!this.hasVolatile(volatile)) return;
		delete this.volatiles[volatile];
	}
	addVolatile(volatile: ID, ...args: any[]) {
		if (this.hasVolatile(volatile) && !args.length) return;
		this.volatiles[volatile] = [volatile, ...args] as EffectState;
		this.side.battle.scene.addEffect(this, volatile);
	}
	hasVolatile(volatile: ID) {
		return !!this.volatiles[volatile];
	}
	removeTurnstatus(volatile: ID) {
		this.side.battle.scene.removeEffect(this, volatile);
		if (!this.hasTurnstatus(volatile)) return;
		delete this.turnstatuses[volatile];
	}
	addTurnstatus(volatile: ID) {
		volatile = toID(volatile);
		this.side.battle.scene.addEffect(this, volatile);
		if (this.hasTurnstatus(volatile)) return;
		this.turnstatuses[volatile] = [volatile];
	}
	hasTurnstatus(volatile: ID) {
		return !!this.turnstatuses[volatile];
	}
	clearTurnstatuses() {
		for (let id in this.turnstatuses) {
			this.removeTurnstatus(id as ID);
		}
		this.turnstatuses = {};
		this.side.battle.scene.updateStatbar(this);
	}
	removeMovestatus(volatile: ID) {
		this.side.battle.scene.removeEffect(this, volatile);
		if (!this.hasMovestatus(volatile)) return;
		delete this.movestatuses[volatile];
	}
	addMovestatus(volatile: ID) {
		volatile = toID(volatile);
		if (this.hasMovestatus(volatile)) return;
		this.movestatuses[volatile] = [volatile];
		this.side.battle.scene.addEffect(this, volatile);
	}
	hasMovestatus(volatile: ID) {
		return !!this.movestatuses[volatile];
	}
	clearMovestatuses() {
		for (let id in this.movestatuses) {
			this.removeMovestatus(id as ID);
		}
		this.movestatuses = {};
	}
	clearVolatiles() {
		this.volatiles = {};
		this.clearTurnstatuses();
		this.clearMovestatuses();
		this.side.battle.scene.clearEffects(this);
	}
	rememberMove(moveName: string, pp = 1, recursionSource?: string) {
		if (recursionSource === this.ident) return;
		moveName = Dex.getMove(moveName).name;
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
		ability = Dex.getAbility(ability).name;
		this.ability = ability;
		if (!this.baseAbility && !isNotBase) {
			this.baseAbility = ability;
		}
	}
	getBoost(boostStat: BoostStatName) {
		let boostStatTable = {
			atk: 'Atk',
			def: 'Def',
			spa: 'SpA',
			spd: 'SpD',
			spe: 'Spe',
			accuracy: 'Accuracy',
			evasion: 'Evasion',
			spc: 'Spc',
		};
		if (!this.boosts[boostStat]) {
			return '1&times;&nbsp;' + boostStatTable[boostStat];
		}
		if (this.boosts[boostStat] > 6) this.boosts[boostStat] = 6;
		if (this.boosts[boostStat] < -6) this.boosts[boostStat] = -6;
		if (boostStat === 'accuracy' || boostStat === 'evasion') {
			if (this.boosts[boostStat] > 0) {
				let goodBoostTable = [
					'1&times;', '1.33&times;', '1.67&times;', '2&times;', '2.33&times;', '2.67&times;', '3&times;',
				];
				// let goodBoostTable = ['Normal', '+1', '+2', '+3', '+4', '+5', '+6'];
				return '' + goodBoostTable[this.boosts[boostStat]] + '&nbsp;' + boostStatTable[boostStat];
			}
			let badBoostTable = [
				'1&times;', '0.75&times;', '0.6&times;', '0.5&times;', '0.43&times;', '0.38&times;', '0.33&times;',
			];
			// let badBoostTable = ['Normal', '&minus;1', '&minus;2', '&minus;3', '&minus;4', '&minus;5', '&minus;6'];
			return '' + badBoostTable[-this.boosts[boostStat]] + '&nbsp;' + boostStatTable[boostStat];
		}
		if (this.boosts[boostStat] > 0) {
			let goodBoostTable = [
				'1&times;', '1.5&times;', '2&times;', '2.5&times;', '3&times;', '3.5&times;', '4&times;',
			];
			// let goodBoostTable = ['Normal', '+1', '+2', '+3', '+4', '+5', '+6'];
			return '' + goodBoostTable[this.boosts[boostStat]] + '&nbsp;' + boostStatTable[boostStat];
		}
		let badBoostTable = [
			'1&times;', '0.67&times;', '0.5&times;', '0.4&times;', '0.33&times;', '0.29&times;', '0.25&times;',
		];
		// let badBoostTable = ['Normal', '&minus;1', '&minus;2', '&minus;3', '&minus;4', '&minus;5', '&minus;6'];
		return '' + badBoostTable[-this.boosts[boostStat]] + '&nbsp;' + boostStatTable[boostStat];
	}
	getWeightKg(serverPokemon?: ServerPokemon) {
		let autotomizeFactor = this.volatiles.autotomize?.[1] * 100 || 0;
		return Math.max(this.getTemplate(serverPokemon).weightkg - autotomizeFactor, 0.1);
	}
	getBoostType(boostStat: BoostStatName) {
		if (!this.boosts[boostStat]) return 'neutral';
		if (this.boosts[boostStat] > 0) return 'good';
		return 'bad';
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
		let ability = toID(this.ability || serverPokemon?.ability);
		if (battle.hasPseudoWeather('Magic Room') || this.volatiles['embargo'] || ability === 'klutz') {
			item = '' as ID;
		}

		if (item === 'ironball') {
			return true;
		}
		if (ability === 'levitate') {
			return false;
		}
		if (this.volatiles['magnetrise'] || this.volatiles['telekinesis']) {
			return false;
		}
		if (item === 'airballoon') {
			return false;
		}
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
	// This function is used for two things:
	//   1) The percentage to display beside the HP bar.
	//   2) The width to draw an HP bar.
	//
	// This function is NOT used in the calculation of any other displayed
	// percentages or ranges, which have their own, more complex, formulae.
	hpWidth(maxWidth: number) {
		if (this.fainted || !this.hp) return 0;

		// special case for low health...
		if (this.hp === 1 && this.maxhp > 45) return 1;

		if (this.maxhp === 48) {
			// Draw the health bar to the middle of the range.
			// This affects the width of the visual health bar *only*; it
			// does not affect the ranges displayed in any way.
			let range = Pokemon.getPixelRange(this.hp, this.hpcolor);
			let ratio = (range[0] + range[1]) / 2;
			return Math.round(maxWidth * ratio) || 1;
		}
		let percentage = Math.ceil(100 * this.hp / this.maxhp);
		if ((percentage === 100) && (this.hp < this.maxhp)) {
			percentage = 99;
		}
		return percentage * maxWidth / 100;
	}
	static getHPText(pokemon: PokemonHealth, precision = 1) {
		if (pokemon.maxhp === 100) return pokemon.hp + '%';
		if (pokemon.maxhp !== 48) return (100 * pokemon.hp / pokemon.maxhp).toFixed(precision) + '%';
		let range = Pokemon.getPixelRange(pokemon.hp, pokemon.hpcolor);
		return Pokemon.getFormattedRange(range, precision, '–');
	}
	destroy() {
		if (this.sprite) this.sprite.destroy();
		this.sprite = null!;
		this.side = null!;
	}
}

type PokemonProvider = (s: Side, d: PokemonDetails) => Pokemon;

class Side {
	battle: Battle;
	name = '';
	id = '';
	n: number;
	foe: Side = null!;
	avatar: string = 'unknown';
	rating: string = '';
	totalPokemon = 6;
	x = 0;
	y = 0;
	z = 0;
	missedPokemon: Pokemon = null!;

	wisher: Pokemon | null = null;

	active = [null] as (Pokemon | null)[];
	lastPokemon = null as Pokemon | null;
	pokemon = [] as Pokemon[];

	/** [effectName, levels, minDuration, maxDuration] */
	sideConditions: {[id: string]: [string, number, number, number]} = {};

	pokemonProvider: PokemonProvider;

	constructor(battle: Battle, n: number, pokemonProvider?: PokemonProvider) {
		this.battle = battle;
		this.n = n;
		this.pokemonProvider = pokemonProvider === undefined
			? ((s: Side, d: PokemonDetails) => new Pokemon(d, s))
			: pokemonProvider;
		this.updateSprites();
	}

	rollTrainerSprites() {
		let sprites = ['lucas', 'dawn', 'ethan', 'lyra', 'hilbert', 'hilda'];
		this.avatar = sprites[Math.floor(Math.random() * sprites.length)];
	}

	behindx(offset: number) {
		return this.x + (!this.n ? -1 : 1) * offset;
	}
	behindy(offset: number) {
		return this.y + (!this.n ? 1 : -1) * offset;
	}
	leftof(offset: number) {
		return (!this.n ? -1 : 1) * offset;
	}
	behind(offset: number) {
		return this.z + (!this.n ? -1 : 1) * offset;
	}

	clearPokemon() {
		for (const pokemon of this.pokemon) pokemon.destroy();
		this.pokemon = [];
		for (let i = 0; i < this.active.length; i++) this.active[i] = null;
		this.lastPokemon = null;
	}
	reset() {
		this.clearPokemon();
		this.updateSprites();
		this.sideConditions = {};
	}
	updateSprites() {
		this.z = (this.n ? 200 : 0);
		this.battle.scene.updateSpritesForSide(this);
	}
	setAvatar(avatar: string) {
		this.avatar = avatar;
	}
	setName(name: string, avatar?: string) {
		if (name) this.name = name;
		this.id = toID(this.name);
		if (avatar) {
			this.setAvatar(avatar);
		} else {
			this.rollTrainerSprites();
			if (this.foe && this.avatar === this.foe.avatar) this.rollTrainerSprites();
		}
		if (this.battle.stagnateCallback) this.battle.stagnateCallback(this.battle);
	}
	addSideCondition(effect: Effect) {
		let condition = effect.id;
		if (this.sideConditions[condition]) {
			if (condition === 'spikes' || condition === 'toxicspikes') {
				this.sideConditions[condition][1]++;
			}
			this.battle.scene.addSideCondition(this.n, condition);
			return;
		}
		// Side conditions work as: [effectName, levels, minDuration, maxDuration]
		switch (condition) {
		case 'auroraveil':
			this.sideConditions[condition] = [effect.name, 1, 5, 8];
			break;
		case 'reflect':
			this.sideConditions[condition] = [effect.name, 1, 5, this.battle.gen >= 4 ? 8 : 0];
			break;
		case 'safeguard':
			this.sideConditions[condition] = [effect.name, 1, 5, 0];
			break;
		case 'lightscreen':
			this.sideConditions[condition] = [effect.name, 1, 5, this.battle.gen >= 4 ? 8 : 0];
			break;
		case 'mist':
			this.sideConditions[condition] = [effect.name, 1, 5, 0];
			break;
		case 'tailwind':
			this.sideConditions[condition] = [effect.name, 1, this.battle.gen >= 5 ? 4 : 3, 0];
			break;
		case 'luckychant':
			this.sideConditions[condition] = [effect.name, 1, 5, 0];
			break;
		case 'stealthrock':
			this.sideConditions[condition] = [effect.name, 1, 0, 0];
			break;
		case 'spikes':
			this.sideConditions[condition] = [effect.name, 1, 0, 0];
			break;
		case 'toxicspikes':
			this.sideConditions[condition] = [effect.name, 1, 0, 0];
			break;
		case 'stickyweb':
			this.sideConditions[condition] = [effect.name, 1, 0, 0];
			break;
		default:
			this.sideConditions[condition] = [effect.name, 1, 0, 0];
			break;
		}
		this.battle.scene.addSideCondition(this.n, condition);
	}
	removeSideCondition(condition: string) {
		const id = toID(condition);
		if (!this.sideConditions[id]) return;
		delete this.sideConditions[id];
		this.battle.scene.removeSideCondition(this.n, id);
	}
	addPokemon(name: string, ident: string, details: string, replaceSlot = -1) {
		const oldItem = replaceSlot >= 0 ? this.pokemon[replaceSlot].item : undefined;

		const data = this.battle.parseDetails(name, ident, details);
		const poke = this.pokemonProvider(this, data);
		if (oldItem) poke.item = oldItem;

		if (!poke.ability && poke.baseAbility) poke.ability = poke.baseAbility;
		poke.reset();

		if (replaceSlot >= 0) {
			this.pokemon[replaceSlot] = poke;
		} else {
			this.pokemon.push(poke);
		}
		if (this.pokemon.length > this.totalPokemon || this.battle.speciesClause) {
			// check for Illusion
			let existingTable: {[searchid: string]: number} = {};
			let toRemove = -1;
			for (let poke1i = 0; poke1i < this.pokemon.length; poke1i++) {
				let poke1 = this.pokemon[poke1i];
				if (!poke1.searchid) continue;
				if (poke1.searchid in existingTable) {
					let poke2i = existingTable[poke1.searchid];
					let poke2 = this.pokemon[poke2i];
					if (poke === poke1) {
						toRemove = poke2i;
					} else if (poke === poke2) {
						toRemove = poke1i;
					} else if (this.active.indexOf(poke1) >= 0) {
						toRemove = poke2i;
					} else if (this.active.indexOf(poke2) >= 0) {
						toRemove = poke1i;
					} else if (poke1.fainted && !poke2.fainted) {
						toRemove = poke2i;
					} else {
						toRemove = poke1i;
					}
					break;
				}
				existingTable[poke1.searchid] = poke1i;
			}
			if (toRemove >= 0) {
				if (this.pokemon[toRemove].fainted) {
					// A fainted Pokemon was actually a Zoroark
					let illusionFound = null;
					for (const curPoke of this.pokemon) {
						if (curPoke === poke) continue;
						if (curPoke.fainted) continue;
						if (this.active.indexOf(curPoke) >= 0) continue;
						if (curPoke.species === 'Zoroark' || curPoke.species === 'Zorua' || curPoke.ability === 'Illusion') {
							illusionFound = curPoke;
							break;
						}
					}
					if (!illusionFound) {
						// This is Hackmons; we'll just guess a random unfainted Pokemon.
						// This will keep the fainted Pokemon count correct, and will
						// eventually become correct as incorrect guesses are switched in
						// and reguessed.
						for (const curPoke of this.pokemon) {
							if (curPoke === poke) continue;
							if (curPoke.fainted) continue;
							if (this.active.indexOf(curPoke) >= 0) continue;
							illusionFound = curPoke;
							break;
						}
					}
					if (illusionFound) {
						illusionFound.fainted = true;
						illusionFound.hp = 0;
						illusionFound.status = '';
					}
				}
				this.pokemon.splice(toRemove, 1);
			}
		}
		this.battle.scene.updateSidebar(this);

		return poke;
	}

	switchIn(pokemon: Pokemon, slot?: number) {
		if (slot === undefined) slot = pokemon.slot;
		this.active[slot] = pokemon;
		pokemon.slot = slot;
		pokemon.clearVolatile();
		pokemon.lastMove = '';
		this.battle.lastMove = 'switch-in';
		if (['batonpass', 'zbatonpass'].includes(this.lastPokemon?.lastMove!)) {
			pokemon.copyVolatileFrom(this.lastPokemon!);
		}

		this.battle.scene.animSummon(pokemon, slot);

		if (this.battle.switchCallback) this.battle.switchCallback(this.battle, this);
	}
	dragIn(pokemon: Pokemon, slot = pokemon.slot) {
		let oldpokemon = this.active[slot];
		if (oldpokemon === pokemon) return;
		this.lastPokemon = oldpokemon;
		if (oldpokemon) {
			this.battle.scene.animDragOut(oldpokemon);
			oldpokemon.clearVolatile();
		}
		pokemon.clearVolatile();
		pokemon.lastMove = '';
		this.battle.lastMove = 'switch-in';
		this.active[slot] = pokemon;
		pokemon.slot = slot;

		this.battle.scene.animDragIn(pokemon, slot);

		if (this.battle.dragCallback) this.battle.dragCallback(this.battle, this);
	}
	replace(pokemon: Pokemon, slot = pokemon.slot) {
		let oldpokemon = this.active[slot];
		if (pokemon === oldpokemon) return;
		this.lastPokemon = oldpokemon;
		pokemon.clearVolatile();
		if (oldpokemon) {
			pokemon.lastMove = oldpokemon.lastMove;
			pokemon.hp = oldpokemon.hp;
			pokemon.maxhp = oldpokemon.maxhp;
			pokemon.hpcolor = oldpokemon.hpcolor;
			pokemon.status = oldpokemon.status;
			pokemon.copyVolatileFrom(oldpokemon, true);
			pokemon.statusData = {...oldpokemon.statusData};
			// we don't know anything about the illusioned pokemon except that it's not fainted
			// technically we also know its status but only at the end of the turn, not here
			oldpokemon.fainted = false;
			oldpokemon.hp = oldpokemon.maxhp;
			oldpokemon.status = '???';
		}
		this.active[slot] = pokemon;
		pokemon.slot = slot;

		if (oldpokemon) {
			this.battle.scene.animUnsummon(oldpokemon, true);
		}
		this.battle.scene.animSummon(pokemon, slot, true);
		// not sure if we want a different callback
		if (this.battle.dragCallback) this.battle.dragCallback(this.battle, this);
	}
	switchOut(pokemon: Pokemon, slot = pokemon.slot) {
		if (pokemon.lastMove !== 'batonpass' && pokemon.lastMove !== 'zbatonpass') {
			pokemon.clearVolatile();
		} else {
			pokemon.removeVolatile('transform' as ID);
			pokemon.removeVolatile('formechange' as ID);
		}
		if (pokemon.lastMove === 'uturn' || pokemon.lastMove === 'voltswitch') {
			this.battle.log(['switchout', pokemon.ident], {from: pokemon.lastMove});
		} else if (pokemon.lastMove !== 'batonpass' && pokemon.lastMove !== 'zbatonpass') {
			this.battle.log(['switchout', pokemon.ident]);
		}
		pokemon.statusData.toxicTurns = 0;
		if (this.battle.gen === 5) pokemon.statusData.sleepTurns = 0;
		this.lastPokemon = pokemon;
		this.active[slot] = null;

		this.battle.scene.animUnsummon(pokemon);
	}
	swapTo(pokemon: Pokemon, slot: number, kwArgs: KWArgs) {
		if (pokemon.slot === slot) return;
		let target = this.active[slot];

		let oslot = pokemon.slot;

		pokemon.slot = slot;
		if (target) target.slot = oslot;

		this.active[slot] = pokemon;
		this.active[oslot] = target;

		this.battle.scene.animUnsummon(pokemon, true);
		if (target) this.battle.scene.animUnsummon(target, true);

		this.battle.scene.animSummon(pokemon, slot, true);
		if (target) this.battle.scene.animSummon(target, oslot, true);
	}
	swapWith(pokemon: Pokemon, target: Pokemon, kwArgs: KWArgs) {
		// method provided for backwards compatibility only
		if (pokemon === target) return;

		let oslot = pokemon.slot;
		let nslot = target.slot;

		pokemon.slot = nslot;
		target.slot = oslot;
		this.active[nslot] = pokemon;
		this.active[oslot] = target;

		this.battle.scene.animUnsummon(pokemon, true);
		this.battle.scene.animUnsummon(target, true);

		this.battle.scene.animSummon(pokemon, nslot, true);
		this.battle.scene.animSummon(target, oslot, true);
	}
	faint(pokemon: Pokemon, slot = pokemon.slot) {
		pokemon.clearVolatile();
		this.lastPokemon = pokemon;
		this.active[slot] = null;

		pokemon.fainted = true;
		pokemon.hp = 0;

		this.battle.scene.animFaint(pokemon);
		if (this.battle.faintCallback) this.battle.faintCallback(this.battle, this);
	}
	destroy() {
		this.clearPokemon();
		this.battle = null!;
		this.foe = null!;
	}
}

enum Playback {
	/**
	 * Battle is at the end of the queue. `|start` is not in the queue.
	 * Battle is waiting for `.add()` or `.setQueue()` to add `|start` to
	 * the queue. Adding other queue entries will happen immediately,
	 * bringing the state back to Uninitialized.
	 */
	Uninitialized = 0,
	/**
	 * Battle is at `|start` and hasn't been started yet.
	 * Battle is paused, waiting for `.play()`.
	 */
	Ready = 1,
	/**
	 * `.play()` has been called. Battle should be animating
	 * normally.
	 */
	Playing = 2,
	/**
	 * `.pause()` has been called. Battle is waiting for `.play()`.
	 */
	Paused = 3,
	/**
	 * Battle is at the end of the queue. Battle is waiting for
	 * `.add()` for further battle progress.
	 */
	Finished = 4,
	/**
	 * Battle is fast forwarding through the queue, with animations off.
	 */
	Seeking = 5,
}

interface PokemonDetails {
	details: string;
	name: string;
	species: string;
	level: number;
	shiny: boolean;
	gender: GenderName | '';
	ident: string;
	searchid: string;
}
interface PokemonHealth {
	hp: number;
	maxhp: number;
	hpcolor: HPColor | '';
	status: StatusName | 'tox' | '' | '???';
	fainted?: boolean;
}
interface ServerPokemon extends PokemonDetails, PokemonHealth {
	ident: string;
	details: string;
	condition: string;
	active: boolean;
	/** unboosted stats */
	stats: {
		atk: number,
		def: number,
		spa: number,
		spd: number,
		spe: number,
	};
	/** currently an ID, will revise to name */
	moves: string[];
	/** currently an ID, will revise to name */
	baseAbility: string;
	/** currently an ID, will revise to name */
	ability?: string;
	/** currently an ID, will revise to name */
	item: string;
	/** currently an ID, will revise to name */
	pokeball: string;
}

type SceneProvider = (b: Battle) => BattleSceneStub;
type SideProvider = (b: Battle, n: number) => Side;

class Battle {
	scene: BattleSceneStub;

	sidesSwitched = false;

	// activity queue
	activityQueue = [] as string[];
	/** See battle.instantAdd */
	preemptActivityQueue = [] as string[];
	waitForAnimations: true | false | 'simult' = true;
	activityStep = 0;
	fastForward = 0;
	fastForwardWillScroll = false;

	resultWaiting = false;
	activeMoveIsSpread: string | null = null;

	// callback
	faintCallback: ((battle: Battle, side: Side) => void) | null = null;
	switchCallback: ((battle: Battle, side: Side) => void) | null = null;
	dragCallback: ((battle: Battle, side: Side) => void) | null = null;
	turnCallback: ((battle: Battle) => void) | null = null;
	startCallback: ((battle: Battle) => void) | null = null;
	stagnateCallback: ((battle: Battle) => void) | null = null;
	endCallback: ((battle: Battle) => void) | null = null;
	customCallback: ((battle: Battle, cmd: string, args: string[], kwArgs: KWArgs) => void) | null = null;
	errorCallback: ((battle: Battle) => void) | null = null;

	mute = false;
	messageFadeTime = 300;
	messageShownTime = 1;
	turnsSinceMoved = 0;

	turn = 0;
	/**
	 * Has playback gotten to Team Preview or `|start` yet?
	 * (Affects whether BGM is playing)
	 */
	started = false;
	/**
	 * Has playback gotten to the point where a player has won or tied?
	 * (Affects whether BGM is playing)
	 */
	ended = false;
	usesUpkeep = false;
	weather = '' as ID;
	pseudoWeather = [] as WeatherState[];
	weatherTimeLeft = 0;
	weatherMinTimeLeft = 0;
	mySide: Side = null!;
	yourSide: Side = null!;
	p1: Side = null!;
	p2: Side = null!;
	myPokemon: ServerPokemon[] | null = null;
	sides: [Side, Side] = [null!, null!];
	lastMove = '';

	gen = 7;
	dex: ModdedDex = Dex;
	teamPreviewCount = 0;
	speciesClause = false;
	tier = '';
	gameType: 'singles' | 'doubles' | 'triples' = 'singles';
	rated: string | boolean = false;
	isBlitz = false;
	endLastTurnPending = false;
	totalTimeLeft = 0;
	graceTimeLeft = 0;
	/**
	 * true: timer on, state unknown
	 * false: timer off
	 * number: seconds left this turn
	 */
	kickingInactive: number | boolean = false;

	// options
	id = '';
	roomid = '';
	hardcoreMode = false;
	ignoreNicks = Dex.prefs('ignorenicks');
	ignoreOpponent = false;
	ignoreSpects = false;
	debug = false;
	joinButtons = false;

	/**
	 * The actual pause state. Will only be true if playback is actually
	 * paused, not just waiting for the opponent to make a move.
	 */
	paused = true;
	playbackState = Playback.Uninitialized;

	// external
	resumeButton: JQuery.EventHandler<HTMLElement, null> | null = null;

	sideProvider: SideProvider;

	constructor(id?: string | SceneProvider, sceneProvider?: SceneProvider, sideProvider?: SideProvider) {
		if (typeof id !== 'string') {
			sceneProvider = id;
			id = '';
		}

		this.id = id;

		if (sceneProvider) {
			this.scene = sceneProvider(this);
		} else {
			this.scene = new BattleSceneStub();
		}

		this.sideProvider = sideProvider === undefined
			? ((b: Battle, n: number) => new Side(b, n))
			: sideProvider;

		this.init();
	}

	removePseudoWeather(weather: string) {
		for (let i = 0; i < this.pseudoWeather.length; i++) {
			if (this.pseudoWeather[i][0] === weather) {
				this.pseudoWeather.splice(i, 1);
				this.scene.updateWeather();
				return;
			}
		}
	}
	addPseudoWeather(weather: string, minTimeLeft: number, timeLeft: number) {
		this.pseudoWeather.push([weather, minTimeLeft, timeLeft]);
		this.scene.updateWeather();
	}
	hasPseudoWeather(weather: string) {
		for (const [pseudoWeatherName] of this.pseudoWeather) {
			if (weather === pseudoWeatherName) {
				return true;
			}
		}
		return false;
	}
	init() {
		this.mySide = this.sideProvider(this, 0);
		this.yourSide = this.sideProvider(this, 1);
		this.mySide.foe = this.yourSide;
		this.yourSide.foe = this.mySide;
		this.sides = [this.mySide, this.yourSide];
		this.p1 = this.mySide;
		this.p2 = this.yourSide;
		this.gen = 7;
		this.reset();
	}
	reset(dontResetSound?: boolean) {
		// battle state
		this.turn = 0;
		this.started = false;
		this.ended = false;
		this.weather = '' as ID;
		this.weatherTimeLeft = 0;
		this.weatherMinTimeLeft = 0;
		this.pseudoWeather = [];
		this.lastMove = '';

		// DOM state
		this.scene.reset();

		for (const side of this.sides) {
			if (side) side.reset();
		}

		// activity queue state
		this.activeMoveIsSpread = null;
		this.activityStep = 0;
		this.fastForwardOff();
		this.resultWaiting = false;
		this.paused = true;
		if (this.playbackState !== Playback.Seeking) {
			this.playbackState = Playback.Uninitialized;
			if (!dontResetSound) this.scene.resetBgm();
		}
		this.resetTurnsSinceMoved();
		this.nextActivity();
	}
	destroy() {
		this.scene.destroy();

		for (let i = 0; i < this.sides.length; i++) {
			if (this.sides[i]) this.sides[i].destroy();
			this.sides[i] = null!;
		}
		this.mySide = null!;
		this.yourSide = null!;
		this.p1 = null!;
		this.p2 = null!;
	}

	log(args: Args, kwArgs?: KWArgs, preempt?: boolean) {
		this.scene.log.add(args, kwArgs, preempt);
	}

	resetToCurrentTurn() {
		if (this.ended) {
			this.reset(true);
			this.fastForwardTo(-1);
		} else {
			let turn = this.turn;
			let paused = this.paused;
			this.reset(true);
			this.paused = paused;
			if (turn) this.fastForwardTo(turn);
			if (!paused) {
				this.play();
			} else {
				this.pause();
			}
		}
	}
	switchSides() {
		this.setSidesSwitched(!this.sidesSwitched);
		this.resetToCurrentTurn();
	}
	setSidesSwitched(sidesSwitched: boolean) {
		this.sidesSwitched = sidesSwitched;
		if (this.sidesSwitched) {
			this.mySide = this.p2;
			this.yourSide = this.p1;
		} else {
			this.mySide = this.p1;
			this.yourSide = this.p2;
		}
		this.sides[0] = this.mySide;
		this.sides[1] = this.yourSide;
		this.sides[0].n = 0;
		this.sides[1].n = 1;

		// nothing else should need updating - don't call this function after sending out pokemon
	}

	//
	// activities
	//
	start() {
		this.log(['start']);
		this.resetTurnsSinceMoved();
		if (this.startCallback) this.startCallback(this);
	}
	winner(winner?: string) {
		this.log(['win', winner || '']);
		this.ended = true;
	}
	prematureEnd() {
		this.log(['message', 'This replay ends here.']);
		this.ended = true;
	}
	endLastTurn() {
		if (this.endLastTurnPending) {
			this.endLastTurnPending = false;
			this.scene.updateStatbars();
		}
	}
	setHardcoreMode(mode: boolean) {
		this.hardcoreMode = mode;
		this.scene.updateSidebars();
		this.scene.updateWeather(true);
	}
	setTurn(turnNum: string | number) {
		turnNum = parseInt(turnNum as string, 10);
		if (turnNum === this.turn + 1) {
			this.endLastTurnPending = true;
		}
		if (this.turn && !this.usesUpkeep) this.updatePseudoWeatherLeft(); // for compatibility with old replays
		this.turn = turnNum;

		if (this.mySide.active[0]) this.mySide.active[0]!.clearTurnstatuses();
		if (this.mySide.active[1]) this.mySide.active[1]!.clearTurnstatuses();
		if (this.mySide.active[2]) this.mySide.active[2]!.clearTurnstatuses();
		if (this.yourSide.active[0]) this.yourSide.active[0]!.clearTurnstatuses();
		if (this.yourSide.active[1]) this.yourSide.active[1]!.clearTurnstatuses();
		if (this.yourSide.active[2]) this.yourSide.active[2]!.clearTurnstatuses();

		if (!this.fastForward) this.turnsSinceMoved++;

		this.scene.incrementTurn();

		if (this.fastForward) {
			if (this.turnCallback) this.turnCallback(this);
			if (this.fastForward > -1 && turnNum >= this.fastForward) {
				this.fastForwardOff();
				if (this.endCallback) this.endCallback(this);
			}
			return;
		}

		if (this.turnCallback) this.turnCallback(this);
	}
	resetTurnsSinceMoved() {
		this.turnsSinceMoved = 0;
		this.scene.updateAcceleration();
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
			if (!this.fastForward) {
				this.scene.upkeepWeather();
			}
			return;
		}
		if (weather) {
			let isExtremeWeather = (weather === 'deltastream' || weather === 'desolateland' || weather === 'primordialsea');
			if (poke) {
				if (ability) {
					this.activateAbility(poke, ability.name);
				}
				this.weatherTimeLeft = (this.gen <= 5 || isExtremeWeather) ? 0 : 8;
				this.weatherMinTimeLeft = (this.gen <= 5 || isExtremeWeather) ? 0 : 5;
			} else if (isExtremeWeather) {
				this.weatherTimeLeft = 0;
				this.weatherMinTimeLeft = 0;
			} else {
				this.weatherTimeLeft = (this.gen <= 3 ? 5 : 8);
				this.weatherMinTimeLeft = (this.gen <= 3 ? 0 : 5);
			}
		}
		this.weather = weather;
		this.scene.updateWeather();
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
		this.scene.updateWeather();
	}
	useMove(pokemon: Pokemon, move: Move, target: Pokemon | null, kwArgs: KWArgs) {
		let fromeffect = Dex.getEffect(kwArgs.from);
		this.activateAbility(pokemon, fromeffect);
		pokemon.clearMovestatuses();
		if (move.id === 'focuspunch') {
			pokemon.removeTurnstatus('focuspunch' as ID);
		}
		this.scene.updateStatbar(pokemon);
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
	animateMove(pokemon: Pokemon, move: Move, target: Pokemon | null, kwArgs: KWArgs) {
		this.activeMoveIsSpread = kwArgs.spread;
		if (this.fastForward || kwArgs.still) return;

		if (!target) target = pokemon.side.foe.active[0];
		if (!target) target = pokemon.side.foe.missedPokemon;
		if (kwArgs.miss && target.side) {
			target = target.side.missedPokemon;
		}
		if (kwArgs.notarget) {
			return;
		}

		if (kwArgs.prepare || kwArgs.anim === 'prepare') {
			this.scene.runPrepareAnim(move.id, pokemon, target);
			return;
		}

		let usedMove = kwArgs.anim ? Dex.getMove(kwArgs.anim) : move;
		if (!kwArgs.spread) {
			this.scene.runMoveAnim(usedMove.id, [pokemon, target]);
			return;
		}

		let targets = [pokemon];
		if (kwArgs.spread === '.') {
			//  no target was hit by the attack
			targets.push(target.side.missedPokemon);
		} else {
			for (const hitTarget of kwArgs.spread.split(',')) {
				const curTarget = this.getPokemon(hitTarget + ': ?');
				if (!curTarget) {
					this.log(['error', `Invalid spread move target: "${hitTarget}"`]);
					continue;
				}
				targets.push(curTarget);
			}
		}

		this.scene.runMoveAnim(usedMove.id, targets);
	}
	cantUseMove(pokemon: Pokemon, effect: Effect, move: Move, kwArgs: KWArgs) {
		pokemon.clearMovestatuses();
		this.scene.updateStatbar(pokemon);
		if (effect.id in BattleStatusAnims) {
			this.scene.runStatusAnim(effect.id, [pokemon]);
		}
		this.activateAbility(pokemon, effect);
		if (move.id) pokemon.rememberMove(move.name, 0);
		switch (effect.id) {
		case 'par':
			this.scene.resultAnim(pokemon, 'Paralyzed', 'par');
			break;
		case 'frz':
			this.scene.resultAnim(pokemon, 'Frozen', 'frz');
			break;
		case 'slp':
			this.scene.resultAnim(pokemon, 'Asleep', 'slp');
			pokemon.statusData.sleepTurns++;
			break;
		case 'truant':
			this.scene.resultAnim(pokemon, 'Loafing around', 'neutral');
			break;
		case 'recharge':
			this.scene.runOtherAnim('selfstatus' as ID, [pokemon]);
			this.scene.resultAnim(pokemon, 'Must recharge', 'neutral');
			break;
		case 'focuspunch':
			this.scene.resultAnim(pokemon, 'Lost focus', 'neutral');
			pokemon.removeTurnstatus('focuspunch' as ID);
			break;
		case 'shelltrap':
			this.scene.resultAnim(pokemon, 'Trap failed', 'neutral');
			pokemon.removeTurnstatus('shelltrap' as ID);
			break;
		case 'flinch':
			this.scene.resultAnim(pokemon, 'Flinched', 'neutral');
			pokemon.removeTurnstatus('focuspunch' as ID);
			break;
		case 'attract':
			this.scene.resultAnim(pokemon, 'Immobilized', 'neutral');
			break;
		}
		this.scene.animReset(pokemon);
	}

	activateAbility(pokemon: Pokemon | null, effectOrName: Effect | string, isNotBase?: boolean) {
		if (!pokemon || !effectOrName) return;
		if (typeof effectOrName !== 'string') {
			if (effectOrName.effectType !== 'Ability') return;
			effectOrName = effectOrName.name;
		}
		this.scene.abilityActivateAnim(pokemon, effectOrName);
		pokemon.rememberAbility(effectOrName, isNotBase);
	}

	runMinor(args: Args, kwArgs: KWArgs, nextArgs?: Args, nextKwargs?: KWArgs) {
		if (nextArgs && nextKwargs) {
			if (args[2] === 'Sturdy' && args[0] === '-activate') {
				args[2] = 'ability: Sturdy';
			}
			if (['-crit', '-supereffective', '-resisted'].includes(args[0]) || args[2] === 'ability: Sturdy') {
				kwArgs.then = '.';
			}
			if (args[0] === '-damage' && !kwArgs.from && args[1] !== nextArgs[1] && (
				['-crit', '-supereffective', '-resisted'].includes(nextArgs[0]) ||
				(nextArgs[0] === '-damage' && !nextKwargs.from)
			)) {
				kwArgs.then = '.';
			}
			if (args[0] === '-damage' && nextArgs[0] === '-damage' && kwArgs.from && kwArgs.from === nextKwargs.from) {
				kwArgs.then = '.';
			}
			if (args[0] === '-ability' && (args[2] === 'Intimidate' || args[3] === 'boost')) {
				kwArgs.then = '.';
			}
			if (args[0] === '-unboost' && nextArgs[0] === '-unboost') {
				kwArgs.then = '.';
			}
			if (args[0] === '-boost' && nextArgs[0] === '-boost') {
				kwArgs.then = '.';
			}
			if (args[0] === '-damage' && kwArgs.from === 'Leech Seed' && nextArgs[0] === '-heal' && nextKwargs.silent) {
				kwArgs.then = '.';
			}
			if (args[0] === 'detailschange' && nextArgs[0] === '-mega') {
				if (this.scene.closeMessagebar()) {
					this.activityStep--;
					return;
				}
				kwArgs.simult = '.';
			}
		}
		if (kwArgs.then) this.waitForAnimations = false;
		if (kwArgs.simult) this.waitForAnimations = 'simult';

		switch (args[0]) {
		case '-damage': {
			let poke = this.getPokemon(args[1])!;
			let damage = poke.healthParse(args[2], true);
			if (damage === null) break;
			let range = poke.getDamageRange(damage);

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
				switch (effect.id) {
				case 'brn':
					this.scene.runStatusAnim('brn' as ID, [poke]);
					break;
				case 'psn':
					this.scene.runStatusAnim('psn' as ID, [poke]);
					break;
				case 'baddreams':
					this.scene.runStatusAnim('cursed' as ID, [poke]);
					break;
				case 'curse':
					this.scene.runStatusAnim('cursed' as ID, [poke]);
					break;
				case 'confusion':
					this.scene.runStatusAnim('confusedselfhit' as ID, [poke]);
					break;
				case 'leechseed':
					this.scene.runOtherAnim('leech' as ID, [ofpoke!, poke]);
					break;
				case 'bind':
				case 'wrap':
					this.scene.runOtherAnim('bound' as ID, [poke]);
					break;
				}
			} else {
				let damageinfo = '' + Pokemon.getFormattedRange(range, damage[1] === 100 ? 0 : 1, '\u2013');
				if (damage[1] !== 100) {
					let hover = '' + ((damage[0] < 0) ? '\u2212' : '') +
						Math.abs(damage[0]) + '/' + damage[1];
					if (damage[1] === 48) { // this is a hack
						hover += ' pixels';
					}
					// battle-log will convert this into <abbr>
					damageinfo = '||' + hover + '||' + damageinfo + '||';
				}
				args[3] = damageinfo;
			}
			this.scene.damageAnim(poke, Pokemon.getFormattedRange(range, 0, ' to '));
			this.log(args, kwArgs);
			break;
		}
		case '-heal': {
			let poke = this.getPokemon(args[1])!;
			let damage = poke.healthParse(args[2], true, true);
			if (damage === null) break;
			let range = poke.getDamageRange(damage);

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
					this.scene.runResidualAnim('healingwish' as ID, poke);
					poke.side.wisher = null;
					break;
				case 'wish':
					this.scene.runResidualAnim('wish' as ID, poke);
					break;
				}
			}
			this.scene.runOtherAnim('heal' as ID, [poke]);
			this.scene.healAnim(poke, Pokemon.getFormattedRange(range, 0, ' to '));
			this.log(args, kwArgs);
			break;
		}
		case '-sethp': {
			for (let k = 0; k < 2; k++) {
				let cpoke = this.getPokemon(args[1 + 2 * k]);
				if (cpoke) {
					let damage = cpoke.healthParse(args[2 + 2 * k])!;
					let range = cpoke.getDamageRange(damage);
					let formattedRange = Pokemon.getFormattedRange(range, 0, ' to ');
					let diff = damage[0];
					if (diff > 0) {
						this.scene.healAnim(cpoke, formattedRange);
					} else {
						this.scene.damageAnim(cpoke, formattedRange);
					}
				}
			}
			this.log(args, kwArgs);
			break;
		}
		case '-boost': {
			let poke = this.getPokemon(args[1])!;
			let stat = args[2] as BoostStatName;
			if (this.gen === 1 && stat === 'spd') break;
			if (this.gen === 1 && stat === 'spa') stat = 'spc';
			let amount = parseInt(args[3], 10);
			if (amount === 0) {
				this.scene.resultAnim(poke, 'Highest ' + BattleStats[stat], 'neutral');
				this.log(args, kwArgs);
				break;
			}
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
			this.scene.resultAnim(poke, poke.getBoost(stat), 'good');
			this.log(args, kwArgs);
			break;
		}
		case '-unboost': {
			let poke = this.getPokemon(args[1])!;
			let stat = args[2] as BoostStatName;
			if (this.gen === 1 && stat === 'spd') break;
			if (this.gen === 1 && stat === 'spa') stat = 'spc';
			let amount = parseInt(args[3], 10);
			if (amount === 0) {
				this.scene.resultAnim(poke, 'Lowest ' + BattleStats[stat], 'bad');
				this.log(args, kwArgs);
				break;
			}
			if (!poke.boosts[stat]) {
				poke.boosts[stat] = 0;
			}
			poke.boosts[stat] -= amount;

			if (!kwArgs.silent && kwArgs.from) {
				let effect = Dex.getEffect(kwArgs.from);
				let ofpoke = this.getPokemon(kwArgs.of);
				this.activateAbility(ofpoke || poke, effect);
			}
			this.scene.resultAnim(poke, poke.getBoost(stat), 'bad');
			this.log(args, kwArgs);
			break;
		}
		case '-setboost': {
			let poke = this.getPokemon(args[1])!;
			let stat = args[2] as BoostStatName;
			let amount = parseInt(args[3], 10);
			poke.boosts[stat] = amount;
			this.scene.resultAnim(poke, poke.getBoost(stat), (amount > 0 ? 'good' : 'bad'));
			this.log(args, kwArgs);
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
			this.scene.resultAnim(poke, 'Stats swapped', 'neutral');
			this.scene.resultAnim(poke2, 'Stats swapped', 'neutral');

			this.log(args, kwArgs);
			break;
		}
		case '-clearpositiveboost': {
			let poke = this.getPokemon(args[1])!;
			let ofpoke = this.getPokemon(args[2]);
			let effect = Dex.getEffect(args[3]);
			for (const stat in poke.boosts) {
				if (poke.boosts[stat] > 0) delete poke.boosts[stat];
			}
			this.scene.resultAnim(poke, 'Boosts lost', 'bad');

			if (effect.id) {
				switch (effect.id) {
				case 'spectralthief':
					// todo: update StealBoosts so it animates 1st on Spectral Thief
					this.scene.runOtherAnim('spectralthiefboost' as ID, [ofpoke!, poke]);
					break;
				}
			}
			this.log(args, kwArgs);
			break;
		}
		case '-clearnegativeboost': {
			let poke = this.getPokemon(args[1])!;
			for (const stat in poke.boosts) {
				if (poke.boosts[stat] < 0) delete poke.boosts[stat];
			}
			this.scene.resultAnim(poke, 'Restored', 'good');

			this.log(args, kwArgs);
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
			if (this.gen >= 6) {
				const volatilesToCopy = ['focusenergy', 'laserfocus'];
				for (const volatile of volatilesToCopy) {
					if (frompoke.volatiles[volatile]) {
						poke.addVolatile(volatile as ID);
					} else {
						poke.removeVolatile(volatile as ID);
					}
				}
			}
			this.scene.resultAnim(poke, 'Stats copied', 'neutral');

			this.log(args, kwArgs);
			break;
		}
		case '-clearboost': {
			let poke = this.getPokemon(args[1])!;
			poke.boosts = {};
			this.scene.resultAnim(poke, 'Stats reset', 'neutral');

			this.log(args, kwArgs);
			break;
		}
		case '-invertboost': {
			let poke = this.getPokemon(args[1])!;
			for (const stat in poke.boosts) {
				poke.boosts[stat] = -poke.boosts[stat];
			}
			this.scene.resultAnim(poke, 'Stats inverted', 'neutral');

			this.log(args, kwArgs);
			break;
		}
		case '-clearallboost': {
			let timeOffset = this.scene.timeOffset;
			for (const side of this.sides) {
				for (const active of side.active) {
					if (active) {
						active.boosts = {};
						this.scene.timeOffset = timeOffset;
						this.scene.resultAnim(active, 'Stats reset', 'neutral');
					}
				}
			}

			this.log(args, kwArgs);
			break;
		}
		case '-crit': {
			let poke = this.getPokemon(args[1]);
			if (poke) this.scene.resultAnim(poke, 'Critical hit', 'bad');
			if (this.activeMoveIsSpread) kwArgs.spread = '.';
			this.log(args, kwArgs);
			break;
		}
		case '-supereffective': {
			let poke = this.getPokemon(args[1]);
			if (poke) {
				this.scene.resultAnim(poke, 'Super-effective', 'bad');
				if (window.Config?.server?.afd) {
					this.scene.runOtherAnim('hitmark' as ID, [poke]);
				}
			}
			if (this.activeMoveIsSpread) kwArgs.spread = '.';
			this.log(args, kwArgs);
			break;
		}
		case '-resisted': {
			let poke = this.getPokemon(args[1]);
			if (poke) this.scene.resultAnim(poke, 'Resisted', 'neutral');
			if (this.activeMoveIsSpread) kwArgs.spread = '.';
			this.log(args, kwArgs);
			break;
		}
		case '-immune': {
			let poke = this.getPokemon(args[1])!;
			let fromeffect = Dex.getEffect(kwArgs.from);
			this.activateAbility(this.getPokemon(kwArgs.of) || poke, fromeffect);
			this.log(args, kwArgs);
			this.scene.resultAnim(poke, 'Immune', 'neutral');
			break;
		}
		case '-miss': {
			let target = this.getPokemon(args[2]);
			if (target) {
				this.scene.resultAnim(target, 'Missed', 'neutral');
			}
			this.log(args, kwArgs);
			break;
		}
		case '-fail': {
			let poke = this.getPokemon(args[1])!;
			let effect = Dex.getEffect(args[2]);
			let fromeffect = Dex.getEffect(kwArgs.from);
			let ofpoke = this.getPokemon(kwArgs.of);
			this.activateAbility(ofpoke || poke, fromeffect);
			switch (effect.id) {
			case 'brn':
				this.scene.resultAnim(poke, 'Already burned', 'neutral');
				break;
			case 'tox':
			case 'psn':
				this.scene.resultAnim(poke, 'Already poisoned', 'neutral');
				break;
			case 'slp':
				if (fromeffect.id === 'uproar') {
					this.scene.resultAnim(poke, 'Failed', 'neutral');
				} else {
					this.scene.resultAnim(poke, 'Already asleep', 'neutral');
				}
				break;
			case 'par':
				this.scene.resultAnim(poke, 'Already paralyzed', 'neutral');
				break;
			case 'frz':
				this.scene.resultAnim(poke, 'Already frozen', 'neutral');
				break;
			case 'unboost':
				this.scene.resultAnim(poke, 'Stat drop blocked', 'neutral');
				break;
			default:
				if (poke) {
					this.scene.resultAnim(poke, 'Failed', 'neutral');
				}
				break;
			}
			this.scene.animReset(poke);
			this.log(args, kwArgs);
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
				this.scene.resultAnim(poke, 'Quick Guard', 'good');
				break;
			case 'wideguard':
				poke.addTurnstatus('wideguard' as ID);
				this.scene.resultAnim(poke, 'Wide Guard', 'good');
				break;
			case 'craftyshield':
				poke.addTurnstatus('craftyshield' as ID);
				this.scene.resultAnim(poke, 'Crafty Shield', 'good');
				break;
			case 'protect':
				poke.addTurnstatus('protect' as ID);
				this.scene.resultAnim(poke, 'Protected', 'good');
				break;

			case 'safetygoggles':
				poke.item = 'Safety Goggles';
				break;
			case 'protectivepads':
				poke.item = 'Protective Pads';
				break;
			}
			this.log(args, kwArgs);
			break;
		}
		case '-center': case '-notarget': case '-ohko':
		case '-combine': case '-hitcount': case '-waiting': case '-zbroken': {
			this.log(args, kwArgs);
			break;
		}
		case '-zpower': {
			let poke = this.getPokemon(args[1])!;
			this.scene.runOtherAnim('zpower' as ID, [poke]);
			this.log(args, kwArgs);
			break;
		}
		case '-prepare': {
			let poke = this.getPokemon(args[1])!;
			let moveid = toID(args[2]);
			let target = this.getPokemon(args[3]) || poke.side.foe.active[0] || poke;
			this.scene.runPrepareAnim(moveid, poke, target);
			this.log(args, kwArgs);
			break;
		}
		case '-mustrecharge': {
			let poke = this.getPokemon(args[1])!;
			poke.addMovestatus('mustrecharge' as ID);
			this.scene.updateStatbar(poke);
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
			case 'brn':
				this.scene.resultAnim(poke, 'Burned', 'brn');
				this.scene.runStatusAnim('brn' as ID, [poke]);
				break;
			case 'tox':
				this.scene.resultAnim(poke, 'Toxic poison', 'psn');
				this.scene.runStatusAnim('psn' as ID, [poke]);
				poke.statusData.toxicTurns = (effect.name === "Toxic Orb" ? -1 : 0);
				break;
			case 'psn':
				this.scene.resultAnim(poke, 'Poisoned', 'psn');
				this.scene.runStatusAnim('psn' as ID, [poke]);
				break;
			case 'slp':
				this.scene.resultAnim(poke, 'Asleep', 'slp');
				if (effect.id === 'rest') {
					poke.statusData.sleepTurns = 0; // for Gen 2 use through Sleep Talk
				}
				break;
			case 'par':
				this.scene.resultAnim(poke, 'Paralyzed', 'par');
				this.scene.runStatusAnim('par' as ID, [poke]);
				break;
			case 'frz':
				this.scene.resultAnim(poke, 'Frozen', 'frz');
				this.scene.runStatusAnim('frz' as ID, [poke]);
				break;
			default:
				this.scene.updateStatbar(poke);
				break;
			}
			this.log(args, kwArgs);
			break;
		}
		case '-curestatus': {
			let poke = this.getPokemon(args[1])!;
			let effect = Dex.getEffect(kwArgs.from);

			if (effect.id) {
				switch (effect.id) {
				case 'flamewheel':
				case 'flareblitz':
				case 'fusionflare':
				case 'sacredfire':
				case 'scald':
				case 'steameruption':
					kwArgs.thaw = '.';
					break;
				}
			}
			if (poke) {
				poke.status = '';
				switch (args[2]) {
				case 'brn':
					this.scene.resultAnim(poke, 'Burn cured', 'good');
					break;
				case 'tox':
				case 'psn':
					poke.statusData.toxicTurns = 0;
					this.scene.resultAnim(poke, 'Poison cured', 'good');
					break;
				case 'slp':
					this.scene.resultAnim(poke, 'Woke up', 'good');
					poke.statusData.sleepTurns = 0;
					break;
				case 'par':
					this.scene.resultAnim(poke, 'Paralysis cured', 'good');
					break;
				case 'frz':
					this.scene.resultAnim(poke, 'Thawed', 'good');
					break;
				default:
					poke.removeVolatile('confusion' as ID);
					this.scene.resultAnim(poke, 'Cured', 'good');
				}
			}
			this.log(args, kwArgs);
			break;

		}
		case '-cureteam': { // For old gens when the whole team was always cured
			let poke = this.getPokemon(args[1])!;
			for (const target of poke.side.pokemon) {
				target.status = '';
				this.scene.updateStatbarIfExists(target);
			}

			this.scene.resultAnim(poke, 'Team Cured', 'good');
			this.log(args, kwArgs);
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
					this.scene.resultAnim(poke, item.name, 'neutral');
					break;
				case 'frisk':
					this.activateAbility(ofpoke!, "Frisk");
					if (poke && poke !== ofpoke) { // used for gen 6
						poke.itemEffect = 'frisked';
						this.scene.resultAnim(poke, item.name, 'neutral');
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
					this.scene.resultAnim(poke, item.name, 'neutral');
					this.scene.resultAnim(ofpoke!, 'Item Stolen', 'bad');
					break;
				case 'harvest':
					poke.itemEffect = 'harvested';
					this.activateAbility(poke, "Harvest");
					this.scene.resultAnim(poke, item.name, 'neutral');
					break;
				case 'bestow':
					poke.itemEffect = 'bestowed';
					this.scene.resultAnim(poke, item.name, 'neutral');
					break;
				case 'switcheroo':
				case 'trick':
					poke.itemEffect = 'tricked';
					// falls through
				default:
					break;
				}
			} else {
				switch (item.id) {
				case 'airballoon':
					this.scene.resultAnim(poke, 'Balloon', 'good');
					break;
				}
			}
			this.log(args, kwArgs);
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
				this.scene.runOtherAnim('consume' as ID, [poke]);
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
					this.scene.runOtherAnim('itemoff' as ID, [poke]);
					this.scene.resultAnim(poke, 'Item knocked off', 'neutral');
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
					this.scene.resultAnim(poke, 'Balloon popped', 'neutral');
					break;
				case 'focussash':
					poke.prevItemEffect = 'consumed';
					this.scene.resultAnim(poke, 'Sash', 'neutral');
					break;
				case 'focusband':
					this.scene.resultAnim(poke, 'Focus Band', 'neutral');
					break;
				case 'redcard':
					poke.prevItemEffect = 'held up';
					break;
				default:
					poke.prevItemEffect = 'consumed';
					break;
				}
			}
			this.log(args, kwArgs);
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
					this.scene.wait(500);
					this.activateAbility(poke, ability.name, true);
					ofpoke!.rememberAbility(ability.name);
					break;
				case 'powerofalchemy':
				case 'receiver':
					this.activateAbility(poke, effect.name);
					this.scene.wait(500);
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
			this.log(args, kwArgs);
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
			this.log(args, kwArgs);
			break;
		}
		case 'detailschange': {
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

			this.scene.animTransform(poke, true, true);
			this.log(args, kwArgs);
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
			this.scene.animTransform(poke);
			this.scene.resultAnim(poke, 'Transformed', 'good');
			this.log(['-transform', args[1], args[2], tpoke.species], kwArgs);
			break;
		}
		case '-formechange': {
			let poke = this.getPokemon(args[1])!;
			let template = Dex.getTemplate(args[2]);
			let fromeffect = Dex.getEffect(kwArgs.from);
			let isCustomAnim = false;
			poke.removeVolatile('typeadd' as ID);
			poke.removeVolatile('typechange' as ID);
			if (this.gen >= 7) poke.removeVolatile('autotomize' as ID);

			if (!kwArgs.silent) {
				this.activateAbility(poke, fromeffect);
			}
			poke.addVolatile('formechange' as ID, template.species); // the formechange volatile reminds us to revert the sprite change on switch-out
			this.scene.animTransform(poke, isCustomAnim);
			this.log(args, kwArgs);
			break;
		}
		case '-mega': {
			let poke = this.getPokemon(args[1])!;
			let item = Dex.getItem(args[3]);
			if (args[3]) {
				poke.item = item.name;
			}
			this.log(args, kwArgs);
			break;
		}
		case '-primal': case '-burst': {
			this.log(args, kwArgs);
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
					if (!kwArgs.silent) {
						this.scene.typeAnim(poke, types);
					}
				}
				this.scene.updateStatbar(poke);
				break;
			case 'typeadd':
				const type = Dex.sanitizeName(args[3]);
				poke.addVolatile('typeadd' as ID, type);
				if (kwArgs.silent) break;
				this.scene.typeAnim(poke, type);
				break;
			case 'dynamax':
				poke.addVolatile('dynamax' as ID);
				this.scene.animTransform(poke, true);
				break;
			case 'powertrick':
				this.scene.resultAnim(poke, 'Power Trick', 'neutral');
				break;
			case 'foresight':
			case 'miracleeye':
				this.scene.resultAnim(poke, 'Identified', 'bad');
				break;
			case 'telekinesis':
				this.scene.resultAnim(poke, 'Telekinesis', 'neutral');
				break;
			case 'confusion':
				if (!kwArgs.already) {
					this.scene.runStatusAnim('confused' as ID, [poke]);
					this.scene.resultAnim(poke, 'Confused', 'bad');
				}
				break;
			case 'leechseed':
				this.scene.updateStatbar(poke);
				break;
			case 'healblock':
				this.scene.resultAnim(poke, 'Heal Block', 'bad');
				break;
			case 'yawn':
				this.scene.resultAnim(poke, 'Drowsy', 'slp');
				break;
			case 'taunt':
				this.scene.resultAnim(poke, 'Taunted', 'bad');
				break;
			case 'imprison':
				this.scene.resultAnim(poke, 'Imprisoning', 'good');
				break;
			case 'disable':
				this.scene.resultAnim(poke, 'Disabled', 'bad');
				break;
			case 'embargo':
				this.scene.resultAnim(poke, 'Embargo', 'bad');
				break;
			case 'torment':
				this.scene.resultAnim(poke, 'Tormented', 'bad');
				break;
			case 'ingrain':
				this.scene.resultAnim(poke, 'Ingrained', 'good');
				break;
			case 'aquaring':
				this.scene.resultAnim(poke, 'Aqua Ring', 'good');
				break;
			case 'stockpile1':
				this.scene.resultAnim(poke, 'Stockpile', 'good');
				break;
			case 'stockpile2':
				poke.removeVolatile('stockpile1' as ID);
				this.scene.resultAnim(poke, 'Stockpile&times;2', 'good');
				break;
			case 'stockpile3':
				poke.removeVolatile('stockpile2' as ID);
				this.scene.resultAnim(poke, 'Stockpile&times;3', 'good');
				break;
			case 'perish0':
				poke.removeVolatile('perish1' as ID);
				break;
			case 'perish1':
				poke.removeVolatile('perish2' as ID);
				this.scene.resultAnim(poke, 'Perish next turn', 'bad');
				break;
			case 'perish2':
				poke.removeVolatile('perish3' as ID);
				this.scene.resultAnim(poke, 'Perish in 2', 'bad');
				break;
			case 'perish3':
				if (!kwArgs.silent) this.scene.resultAnim(poke, 'Perish in 3', 'bad');
				break;
			case 'encore':
				this.scene.resultAnim(poke, 'Encored', 'bad');
				break;
			case 'bide':
				this.scene.resultAnim(poke, 'Bide', 'good');
				break;
			case 'attract':
				this.scene.resultAnim(poke, 'Attracted', 'bad');
				break;
			case 'autotomize':
				this.scene.resultAnim(poke, 'Lightened', 'good');
				if (poke.volatiles.autotomize) {
					poke.volatiles.autotomize[1]++;
				} else {
					poke.addVolatile('autotomize' as ID, 1);
				}
				break;
			case 'focusenergy':
				this.scene.resultAnim(poke, '+Crit rate', 'good');
				break;
			case 'curse':
				this.scene.resultAnim(poke, 'Cursed', 'bad');
				break;
			case 'nightmare':
				this.scene.resultAnim(poke, 'Nightmare', 'bad');
				break;
			case 'magnetrise':
				this.scene.resultAnim(poke, 'Magnet Rise', 'good');
				break;
			case 'smackdown':
				this.scene.resultAnim(poke, 'Smacked Down', 'bad');
				poke.removeVolatile('magnetrise' as ID);
				poke.removeVolatile('telekinesis' as ID);
				if (poke.lastMove === 'fly' || poke.lastMove === 'bounce') this.scene.animReset(poke);
				break;
			case 'substitute':
				if (kwArgs.damage) {
					this.scene.resultAnim(poke, 'Damage', 'bad');
				} else if (kwArgs.block) {
					this.scene.resultAnim(poke, 'Blocked', 'neutral');
				}
				break;

			// Gen 1
			case 'lightscreen':
				this.scene.resultAnim(poke, 'Light Screen', 'good');
				break;
			case 'reflect':
				this.scene.resultAnim(poke, 'Reflect', 'good');
				break;
			}
			poke.addVolatile(effect.id);
			this.scene.updateStatbar(poke);
			this.log(args, kwArgs);
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
				case 'dynamax':
					this.scene.animTransform(poke);
					break;
				case 'powertrick':
					this.scene.resultAnim(poke, 'Power Trick', 'neutral');
					break;
				case 'telekinesis':
					this.scene.resultAnim(poke, 'Telekinesis&nbsp;ended', 'neutral');
					break;
				case 'skydrop':
					if (kwArgs.interrupt) {
						this.scene.anim(poke, {time: 100});
					}
					break;
				case 'confusion':
					this.scene.resultAnim(poke, 'Confusion&nbsp;ended', 'good');
					break;
				case 'leechseed':
					if (fromeffect.id === 'rapidspin') {
						this.scene.resultAnim(poke, 'De-seeded', 'good');
					}
					break;
				case 'healblock':
					this.scene.resultAnim(poke, 'Heal Block ended', 'good');
					break;
				case 'attract':
					this.scene.resultAnim(poke, 'Attract&nbsp;ended', 'good');
					break;
				case 'taunt':
					this.scene.resultAnim(poke, 'Taunt&nbsp;ended', 'good');
					break;
				case 'disable':
					this.scene.resultAnim(poke, 'Disable&nbsp;ended', 'good');
					break;
				case 'embargo':
					this.scene.resultAnim(poke, 'Embargo ended', 'good');
					break;
				case 'torment':
					this.scene.resultAnim(poke, 'Torment&nbsp;ended', 'good');
					break;
				case 'encore':
					this.scene.resultAnim(poke, 'Encore&nbsp;ended', 'good');
					break;
				case 'bide':
					this.scene.runOtherAnim('bideunleash' as ID, [poke]);
					break;
				case 'illusion':
					this.scene.resultAnim(poke, 'Illusion ended', 'bad');
					poke.rememberAbility('Illusion');
					break;
				case 'slowstart':
					this.scene.resultAnim(poke, 'Slow Start ended', 'good');
					break;
				case 'perishsong': // for backwards compatibility
					poke.removeVolatile('perish3' as ID);
					break;
				case 'substitute':
					this.scene.resultAnim(poke, 'Faded', 'bad');
					break;
				case 'stockpile':
					poke.removeVolatile('stockpile1' as ID);
					poke.removeVolatile('stockpile2' as ID);
					poke.removeVolatile('stockpile3' as ID);
					break;
				default:
					if (effect.effectType === 'Move') {
						if (effect.name === 'Doom Desire') {
							this.scene.runOtherAnim('doomdesirehit' as ID, [poke]);
						}
						if (effect.name === 'Future Sight') {
							this.scene.runOtherAnim('futuresighthit' as ID, [poke]);
						}
					}
				}
			}
			this.scene.updateStatbar(poke);
			this.log(args, kwArgs);
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
			case 'roost':
				this.scene.resultAnim(poke, 'Landed', 'neutral');
				break;
			case 'quickguard':
				this.scene.resultAnim(poke, 'Quick Guard', 'good');
				break;
			case 'wideguard':
				this.scene.resultAnim(poke, 'Wide Guard', 'good');
				break;
			case 'craftyshield':
				this.scene.resultAnim(poke, 'Crafty Shield', 'good');
				break;
			case 'matblock':
				this.scene.resultAnim(poke, 'Mat Block', 'good');
				break;
			case 'protect':
				this.scene.resultAnim(poke, 'Protected', 'good');
				break;
			case 'endure':
				this.scene.resultAnim(poke, 'Enduring', 'good');
				break;
			case 'helpinghand':
				this.scene.resultAnim(poke, 'Helping Hand', 'good');
				break;
			case 'focuspunch':
				this.scene.resultAnim(poke, 'Focusing', 'neutral');
				poke.rememberMove(effect.name, 0);
				break;
			case 'shelltrap':
				this.scene.resultAnim(poke, 'Trap set', 'neutral');
				poke.rememberMove(effect.name, 0);
				break;
			case 'beakblast':
				this.scene.runOtherAnim('bidecharge' as ID, [poke]);
				this.scene.resultAnim(poke, 'Beak Blast', 'neutral');
				break;
			}
			this.scene.updateStatbar(poke);
			this.log(args, kwArgs);
			break;
		}
		case '-singlemove': {
			let poke = this.getPokemon(args[1])!;
			let effect = Dex.getEffect(args[2]);
			poke.addMovestatus(effect.id);

			switch (effect.id) {
			case 'grudge':
				this.scene.resultAnim(poke, 'Grudge', 'neutral');
				break;
			case 'destinybond':
				this.scene.resultAnim(poke, 'Destiny Bond', 'neutral');
				break;
			}
			this.log(args, kwArgs);
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
			case 'substitute':
				if (kwArgs.damage) {
					this.scene.resultAnim(poke, 'Damage', 'bad');
				} else if (kwArgs.block) {
					this.scene.resultAnim(poke, 'Blocked', 'neutral');
				}
				break;
			case 'attract':
				this.scene.runStatusAnim('attracted' as ID, [poke]);
				break;
			case 'bide':
				this.scene.runOtherAnim('bidecharge' as ID, [poke]);
				break;

			// move activations
			case 'aromatherapy':
				this.scene.resultAnim(poke, 'Team Cured', 'good');
				break;
			case 'healbell':
				this.scene.resultAnim(poke, 'Team Cured', 'good');
				break;
			case 'brickbreak':
				target!.side.removeSideCondition('Reflect');
				target!.side.removeSideCondition('LightScreen');
				break;
			case 'hyperspacefury':
			case 'hyperspacehole':
			case 'phantomforce':
			case 'shadowforce':
			case 'feint':
				this.scene.resultAnim(poke, 'Protection broken', 'bad');
				poke.removeTurnstatus('protect' as ID);
				for (const curTarget of poke.side.pokemon) {
					curTarget.removeTurnstatus('wideguard' as ID);
					curTarget.removeTurnstatus('quickguard' as ID);
					curTarget.removeTurnstatus('craftyshield' as ID);
					curTarget.removeTurnstatus('matblock' as ID);
					this.scene.updateStatbar(curTarget);
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
				this.scene.anim(poke, {time: 100});
				break;
			case 'skillswap': case 'wanderingspirit':
				if (this.gen <= 4) break;
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
				this.scene.wait(700);
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
			default:
				if (kwArgs.broken) { // for custom moves that break protection
					this.scene.resultAnim(poke, 'Protection broken', 'bad');
				}
			}
			this.log(args, kwArgs);
			break;
		}
		case '-sidestart': {
			let side = this.getSide(args[1]);
			let effect = Dex.getEffect(args[2]);
			side.addSideCondition(effect);

			switch (effect.id) {
			case 'tailwind':
			case 'auroraveil':
			case 'reflect':
			case 'lightscreen':
			case 'safeguard':
			case 'mist':
				this.scene.updateWeather();
				break;
			}
			this.log(args, kwArgs);
			break;
		}
		case '-sideend': {
			let side = this.getSide(args[1]);
			let effect = Dex.getEffect(args[2]);
			// let from = Dex.getEffect(kwArgs.from);
			// let ofpoke = this.getPokemon(kwArgs.of);
			side.removeSideCondition(effect.name);
			this.log(args, kwArgs);
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
			this.log(args, kwArgs);
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
				if (this.gen > 6) maxTimeLeft = 8;
			}
			this.addPseudoWeather(effect.name, 5, maxTimeLeft);

			switch (effect.id) {
			case 'gravity':
				if (!this.fastForward) {
					for (const side of this.sides) {
						for (const active of side.active) {
							if (active) this.scene.runOtherAnim('gravity' as ID, [active]);
						}
					}
				}
				break;
			}
			this.log(args, kwArgs);
			break;
		}
		case '-fieldend': {
			let effect = Dex.getEffect(args[1]);
			// let poke = this.getPokemon(kwArgs.of);
			this.removePseudoWeather(effect.name);
			this.log(args, kwArgs);
			break;
		}
		case '-fieldactivate': {
			let effect = Dex.getEffect(args[1]);
			switch (effect.id) {
			case 'perishsong':
				this.scene.updateStatbars();
				break;
			}
			this.log(args, kwArgs);
			break;
		}
		case '-anim': {
			let poke = this.getPokemon(args[1])!;
			let move = Dex.getMove(args[2]);
			if (this.checkActive(poke)) return;
			let poke2 = this.getPokemon(args[3]);
			this.scene.beforeMove(poke);
			this.animateMove(poke, move, poke2, kwArgs);
			this.scene.afterMove(poke);
			break;
		}
		case '-hint': case '-message': {
			this.log(args, kwArgs);
			break;
		}
		default: {
			throw new Error(`Unrecognized minor action: ${args[0]}`);
			break;
		}}
	}
	/*
	parseSpriteData(name) {
		let siden = 0,
			foe = false;
		while (true) {
			if (name.substr(0, 6) === 'foeof-') {
				foe = true;
				name = name.substr(6);
			} else if (name.substr(0, 9) === 'switched-') name = name.substr(9);
			else if (name.substr(0, 9) === 'existing-') name = name.substr(9);
			else if (name.substr(0, 4) === 'foe-') {
				siden = this.p2.n;
				name = name.substr(4);
			} else if (name.substr(0, 5) === 'ally-') {
				siden = this.p1.n;
				name = name.substr(5);
			} else break;
		}
		if (name.substr(name.length - 1) === ')') {
			let parenIndex = name.lastIndexOf('(');
			if (parenIndex > 0) {
				let species = name.substr(parenIndex + 1);
				name = species.substr(0, species.length - 1);
			}
		}
		if (foe) siden = (siden ? 0 : 1);

		let data = Dex.getTemplate(name);
		return data.spriteData[siden];
	}
	*/
	/**
	 * @param name Leave blank for Team Preview
	 * @param pokemonid Leave blank for Team Preview
	 * @param details
	 * @param output
	 */
	parseDetails(name: string, pokemonid: string, details: string, output: PokemonDetails = {} as any) {
		const isTeamPreview = !name;
		output.details = details;
		output.name = name;
		output.species = name;
		output.level = 100;
		output.shiny = false;
		output.gender = '';
		output.ident = (!isTeamPreview ? pokemonid : '');
		output.searchid = (!isTeamPreview ? `${pokemonid}|${details}` : '');
		let splitDetails = details.split(', ');
		if (splitDetails[splitDetails.length - 1] === 'shiny') {
			output.shiny = true;
			splitDetails.pop();
		}
		if (splitDetails[splitDetails.length - 1] === 'M' || splitDetails[splitDetails.length - 1] === 'F') {
			output.gender = splitDetails[splitDetails.length - 1] as GenderName;
			splitDetails.pop();
		}
		if (splitDetails[1]) {
			output.level = parseInt(splitDetails[1].substr(1), 10) || 100;
		}
		if (splitDetails[0]) {
			output.species = splitDetails[0];
		}
		return output;
	}
	parseHealth(hpstring: string, output: PokemonHealth = {} as any) {
		let [hp, status] = hpstring.split(' ');

		// hp parse
		output.hpcolor = '';
		if (hp === '0' || hp === '0.0') {
			if (!output.maxhp) output.maxhp = 100;
			output.hp = 0;
		} else if (hp.indexOf('/') > 0) {
			let [curhp, maxhp] = hp.split('/');
			if (isNaN(parseFloat(curhp)) || isNaN(parseFloat(maxhp))) {
				return null;
			}
			output.hp = parseFloat(curhp);
			output.maxhp = parseFloat(maxhp);
			if (output.hp > output.maxhp) output.hp = output.maxhp;
			const colorchar = maxhp.slice(-1);
			if (colorchar === 'y' || colorchar === 'g') {
				output.hpcolor = colorchar;
			}
		} else if (!isNaN(parseFloat(hp))) {
			if (!output.maxhp) output.maxhp = 100;
			output.hp = output.maxhp * parseFloat(hp) / 100;
		}

		// status parse
		if (!status) {
			output.status = '';
		} else if (status === 'par' || status === 'brn' || status === 'slp' || status === 'frz' || status === 'tox') {
			output.status = status;
		} else if (status === 'psn' && output.status !== 'tox') {
			output.status = status;
		} else if (status === 'fnt') {
			output.hp = 0;
			output.fainted = true;
		}
		return output;
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
	getSwitchedPokemon(pokemonid: string, details: string) {
		if (pokemonid === '??') throw new Error(`pokemonid not passed`);
		const {name, siden, slot, pokemonid: parsedPokemonid} = this.parsePokemonId(pokemonid);
		pokemonid = parsedPokemonid;

		const searchid = `${pokemonid}|${details}`;
		const side = this.sides[siden];

		// search inactive revealed pokemon
		for (let i = 0; i < side.pokemon.length; i++) {
			let pokemon = side.pokemon[i];
			if (pokemon.fainted) continue;
			// already active, can't be switching in
			if (side.active.includes(pokemon)) continue;
			// just switched out, can't be switching in
			if (pokemon === side.lastPokemon && !side.active[slot]) continue;

			if (pokemon.searchid === searchid) {
				// exact match
				if (slot >= 0) pokemon.slot = slot;
				return pokemon;
			}
			if (!pokemon.searchid && pokemon.checkDetails(details)) {
				// switch-in matches Team Preview entry
				pokemon = side.addPokemon(name, pokemonid, details, i);
				if (slot >= 0) pokemon.slot = slot;
				return pokemon;
			}
		}

		// pokemon not found, create a new pokemon object for it
		const pokemon = side.addPokemon(name, pokemonid, details);
		if (slot >= 0) pokemon.slot = slot;
		return pokemon;
	}
	rememberTeamPreviewPokemon(sideid: string, details: string) {
		const {siden} = this.parsePokemonId(sideid);

		return this.sides[siden].addPokemon('', '', details);
	}
	findCorrespondingPokemon(serverPokemon: {ident: string, details: string}) {
		const {siden} = this.parsePokemonId(serverPokemon.ident);
		const searchid = `${serverPokemon.ident}|${serverPokemon.details}`;
		for (const pokemon of this.sides[siden].pokemon) {
			if (pokemon.searchid === searchid) {
				return pokemon;
			}
		}
		return null;
	}
	getPokemon(pokemonid: string | undefined) {
		if (!pokemonid || pokemonid === '??' || pokemonid === 'null') return null;
		const {siden, slot, pokemonid: parsedPokemonid} = this.parsePokemonId(pokemonid);
		pokemonid = parsedPokemonid;

		/** if true, don't match an active pokemon */
		const isInactive = (slot < 0);
		const side = this.sides[siden];

		// search player's pokemon
		if (!isInactive && side.active[slot]) return side.active[slot];
		for (const pokemon of side.pokemon) {
			if (isInactive && side.active.includes(pokemon)) continue;
			if (pokemon.ident === pokemonid) { // name matched, good enough
				if (slot >= 0) pokemon.slot = slot;
				return pokemon;
			}
		}

		return null;
	}
	getSide(sidename: string): Side {
		if (sidename === 'p1' || sidename.substr(0, 3) === 'p1:') return this.p1;
		if (sidename === 'p2' || sidename.substr(0, 3) === 'p2:') return this.p2;
		if (this.mySide.id === sidename) return this.mySide;
		if (this.yourSide.id === sidename) return this.yourSide;
		if (this.mySide.name === sidename) return this.mySide;
		if (this.yourSide.name === sidename) return this.yourSide;
		return {
			name: sidename,
			id: sidename.replace(/ /g, ''),
		} as any;
	}

	add(command: string, fastForward?: boolean) {
		if (command) this.activityQueue.push(command);

		if (this.playbackState === Playback.Uninitialized) {
			this.nextActivity();
		} else if (this.playbackState === Playback.Finished) {
			this.playbackState = this.paused ? Playback.Paused : Playback.Playing;
			if (this.paused) return;
			this.scene.updateBgm();
			if (fastForward) {
				this.fastForwardTo(-1);
			} else {
				this.nextActivity();
			}
		}
	}
	/**
	 * PS's preempt system is intended to show chat messages immediately,
	 * instead of waiting for the battle to get to the point where the
	 * message was said.
	 *
	 * In addition to being a nice quality-of-life feature, it's also
	 * important to make sure timer updates happen in real-time.
	 */
	instantAdd(command: string) {
		this.run(command, true);
		this.preemptActivityQueue.push(command);
		this.add(command);
	}
	runMajor(args: Args, kwArgs: KWArgs, preempt?: boolean) {
		switch (args[0]) {
		case 'start': {
			this.scene.teamPreviewEnd();
			this.mySide.active[0] = null;
			this.yourSide.active[0] = null;
			this.start();
			break;
		}
		case 'upkeep': {
			this.usesUpkeep = true;
			this.updatePseudoWeatherLeft();
			this.updateToxicTurns();
			break;
		}
		case 'turn': {
			this.setTurn(args[1]);
			this.log(args);
			break;
		}
		case 'tier': {
			this.tier = args[1];
			if (this.tier.slice(-13) === 'Random Battle') {
				this.speciesClause = true;
			}
			if (this.tier.slice(-8) === ' (Blitz)') {
				this.messageFadeTime = 40;
				this.isBlitz = true;
			}
			this.log(args);
			break;
		}
		case 'gametype': {
			this.gameType = args[1] as any;
			switch (args[1]) {
			default:
				this.mySide.active = [null];
				this.yourSide.active = [null];
				break;
			case 'doubles':
				this.mySide.active = [null, null];
				this.yourSide.active = [null, null];
				break;
			case 'triples':
			case 'rotation':
				this.mySide.active = [null, null, null];
				this.yourSide.active = [null, null, null];
				break;
			}
			this.scene.updateGen();
			break;
		}
		case 'rule': {
			let ruleName = args[1].split(': ')[0];
			if (ruleName === 'Species Clause') this.speciesClause = true;
			if (ruleName === 'Blitz') {
				this.messageFadeTime = 40;
				this.isBlitz = true;
			}
			this.log(args);
			break;
		}
		case 'rated': {
			this.rated = args[1] || true;
			this.scene.updateGen();
			this.log(args);
			break;
		}
		case 'inactive': {
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
			} else if (args[1].slice(-27) === ' 15 seconds left this turn.') {
				if (this.isBlitz) return;
			}
			this.log(args, undefined, preempt);
			break;
		}
		case 'inactiveoff': {
			this.kickingInactive = false;
			this.log(args, undefined, preempt);
			break;
		}
		case 'join': case 'j': case 'J': {
			if (this.roomid && window.app) {
				let room = app.rooms[this.roomid];
				let user = BattleTextParser.parseNameParts(args[1]);
				let userid = toUserid(user.name);
				if (!room.users[userid]) room.userCount.users++;
				room.users[userid] = user;
				room.userList.add(userid);
				room.userList.updateUserCount();
				room.userList.updateNoUsersOnline();
			}
			if (!this.ignoreSpects) {
				this.log(args, undefined, preempt);
			}
			break;
		}
		case 'leave': case 'l': case 'L': {
			if (this.roomid && window.app) {
				let room = app.rooms[this.roomid];
				let user = args[1];
				let userid = toUserid(user);
				if (room.users[userid]) room.userCount.users--;
				delete room.users[userid];
				room.userList.remove(userid);
				room.userList.updateUserCount();
				room.userList.updateNoUsersOnline();
			}
			if (!this.ignoreSpects) {
				this.log(args, undefined, preempt);
			}
			break;
		}
		case 'name': case 'n': case 'N': {
			if (this.roomid && window.app) {
				let room = app.rooms[this.roomid];
				let user = BattleTextParser.parseNameParts(args[1]);
				let oldid = args[2];
				if (toUserid(oldid) === app.user.get('userid')) {
					app.user.set({
						away: user.away,
						status: user.status,
					});
				}
				let userid = toUserid(user.name);
				room.users[userid] = user;
				room.userList.remove(oldid);
				room.userList.add(userid);
			}
			if (!this.ignoreSpects) {
				this.log(args, undefined, preempt);
			}
			break;
		}
		case 'player': {
			let side = this.getSide(args[1]);
			side.setName(args[2]);
			if (args[3]) side.setAvatar(args[3]);
			if (args[4]) side.rating = args[4];
			this.scene.updateSidebar(side);
			if (this.joinButtons) this.scene.hideJoinButtons();
			this.log(args);
			break;
		}
		case 'teamsize': {
			let side = this.getSide(args[1]);
			side.totalPokemon = parseInt(args[2], 10);
			this.scene.updateSidebar(side);
			break;
		}
		case 'win': case 'tie': {
			this.winner(args[0] === 'tie' ? undefined : args[1]);
			break;
		}
		case 'prematureend': {
			this.prematureEnd();
			break;
		}
		case 'clearpoke': {
			this.p1.clearPokemon();
			this.p2.clearPokemon();
			break;
		}
		case 'poke': {
			let pokemon = this.rememberTeamPreviewPokemon(args[1], args[2])!;
			if (args[3] === 'item') {
				pokemon.item = '(exists)';
			}
			break;
		}
		case 'teampreview': {
			this.teamPreviewCount = parseInt(args[1], 10);
			this.scene.teamPreview();
			break;
		}
		case 'switch': case 'drag': case 'replace': {
			this.endLastTurn();
			let poke = this.getSwitchedPokemon(args[1], args[2])!;
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
			this.log(args, kwArgs);
			break;
		}
		case 'faint': {
			let poke = this.getPokemon(args[1])!;
			poke.side.faint(poke);
			this.log(args, kwArgs);
			break;
		}
		case 'swap': {
			if (isNaN(Number(args[2]))) {
				const poke = this.getPokemon(args[1])!;
				poke.side.swapWith(poke, this.getPokemon(args[2])!, kwArgs);
			} else {
				const poke = this.getPokemon(args[1])!;
				const targetIndex = parseInt(args[2], 10);
				if (kwArgs.from) {
					const target = poke.side.active[targetIndex];
					if (target) args[2] = target.ident;
				}
				poke.side.swapTo(poke, targetIndex, kwArgs);
			}
			this.log(args, kwArgs);
			break;
		}
		case 'move': {
			this.endLastTurn();
			this.resetTurnsSinceMoved();
			let poke = this.getPokemon(args[1])!;
			let move = Dex.getMove(args[2]);
			if (this.checkActive(poke)) return;
			let poke2 = this.getPokemon(args[3]);
			this.scene.beforeMove(poke);
			this.useMove(poke, move, poke2, kwArgs);
			this.animateMove(poke, move, poke2, kwArgs);
			this.log(args, kwArgs);
			this.scene.afterMove(poke);
			break;
		}
		case 'cant': {
			this.endLastTurn();
			this.resetTurnsSinceMoved();
			let poke = this.getPokemon(args[1])!;
			let effect = Dex.getEffect(args[2]);
			let move = Dex.getMove(args[3]);
			this.cantUseMove(poke, effect, move, kwArgs);
			this.log(args, kwArgs);
			break;
		}
		case 'gen': {
			this.gen = parseInt(args[1], 10);
			this.dex = Dex.forGen(this.gen);
			this.scene.updateGen();
			this.log(args);
			break;
		}
		case 'callback': {
			if (this.customCallback) this.customCallback(this, args[1], args.slice(1), kwArgs);
			break;
		}
		case 'fieldhtml': {
			this.playbackState = Playback.Seeking; // force seeking to prevent controls etc
			this.scene.setFrameHTML(BattleLog.sanitizeHTML(args[1]));
			break;
		}
		case 'controlshtml': {
			this.scene.setControlsHTML(BattleLog.sanitizeHTML(args[1]));
			break;
		}
		default: {
			this.log(args, kwArgs, preempt);
			break;
		}}
	}

	run(str: string, preempt?: boolean) {
		if (!preempt && this.preemptActivityQueue.length && str === this.preemptActivityQueue[0]) {
			this.preemptActivityQueue.shift();
			this.scene.preemptCatchup();
			return;
		}
		if (!str) return;
		const {args, kwArgs} = BattleTextParser.parseBattleLine(str);

		if (this.scene.maybeCloseMessagebar(args, kwArgs)) {
			this.activityStep--;
			this.activeMoveIsSpread = null;
			return;
		}

		// parse the next line if it's a minor: runMinor needs it parsed to determine when to merge minors
		let nextArgs: Args = [''];
		let nextKwargs: KWArgs = {};
		const nextLine = this.activityQueue[this.activityStep + 1] || '';
		if (nextLine.slice(0, 2) === '|-') {
			({args: nextArgs, kwArgs: nextKwargs} = BattleTextParser.parseBattleLine(nextLine));
		}

		if (this.debug) {
			if (args[0].charAt(0) === '-' || args[0] === 'detailschange') {
				this.runMinor(args, kwArgs, nextArgs, nextKwargs);
			} else {
				this.runMajor(args, kwArgs, preempt);
			}
		} else {
			try {
				if (args[0].charAt(0) === '-' || args[0] === 'detailschange') {
					this.runMinor(args, kwArgs, nextArgs, nextKwargs);
				} else {
					this.runMajor(args, kwArgs, preempt);
				}
			} catch (err) {
				this.log(['majorerror', 'Error parsing: ' + str + ' (' + err + ')']);
				if (err.stack) {
					let stack = ('' + err.stack).split('\n');
					for (const line of stack) {
						if (/\brun\b/.test(line)) {
							break;
						}
						this.log(['error', line]);
					}
				}
				if (this.errorCallback) this.errorCallback(this);
			}
		}

		if (nextLine.startsWith('|start') || args[0] === 'teampreview') {
			this.started = true;
			if (this.playbackState === Playback.Uninitialized) {
				this.playbackState = Playback.Ready;
			}
			this.scene.updateBgm();
		}
	}
	checkActive(poke: Pokemon) {
		if (!poke.side.active[poke.slot]) {
			// SOMEONE jumped in in the middle of a replay. <_<
			poke.side.replace(poke);
		}
		return false;
	}

	pause() {
		this.paused = true;
		this.playbackState = Playback.Paused;
		this.scene.pause();
	}
	play() {
		this.paused = false;
		this.playbackState = Playback.Playing;
		this.scene.resume();
		this.nextActivity();
	}
	skipTurn() {
		this.fastForwardTo(this.turn + 1);
	}
	fastForwardTo(time: string | number) {
		if (this.fastForward) return;
		time = Math.floor(Number(time));
		if (isNaN(time)) return;
		if (this.ended && time >= this.turn + 1) return;

		if (time <= this.turn && time !== -1) {
			let paused = this.paused;
			this.reset(true);
			if (paused) this.pause();
			else this.paused = false;
			this.fastForwardWillScroll = true;
		}
		if (!time) {
			this.fastForwardOff();
			this.nextActivity();
			return;
		}
		this.scene.animationOff();
		this.playbackState = Playback.Seeking;
		this.fastForward = time;
		this.nextActivity();
	}
	fastForwardOff() {
		this.fastForward = 0;
		this.scene.animationOn();
		this.playbackState = this.paused ? Playback.Paused : Playback.Playing;
	}
	nextActivity() {
		if (this.playbackState === Playback.Ready || this.playbackState === Playback.Paused) {
			return;
		}

		this.scene.startAnimations();
		let animations = undefined;
		while (!animations) {
			this.waitForAnimations = true;
			if (this.activityStep >= this.activityQueue.length) {
				this.fastForwardOff();
				this.playbackState = Playback.Finished;
				if (this.ended) {
					this.scene.updateBgm();
				}
				if (this.endCallback) this.endCallback(this);
				return;
			}
			// @ts-ignore property modified in method
			if (this.playbackState === Playback.Ready || this.playbackState === Playback.Paused) {
				return;
			}
			this.run(this.activityQueue[this.activityStep]);
			this.activityStep++;
			if (this.waitForAnimations === true) {
				animations = this.scene.finishAnimations();
			} else if (this.waitForAnimations === 'simult') {
				this.scene.timeOffset = 0;
			}
		}

		// @ts-ignore property modified in method
		if (this.playbackState === Playback.Ready || this.playbackState === Playback.Paused) {
			return;
		}

		const interruptionCount = this.scene.interruptionCount;
		animations.done(() => {
			if (interruptionCount === this.scene.interruptionCount) {
				this.nextActivity();
			}
		});
	}

	setQueue(queue: string[]) {
		this.activityQueue = queue;
		this.reset();
	}

	setMute(mute: boolean) {
		BattleSound.setMute(mute);
	}
}

if (typeof require === 'function') {
	// in Node
	(global as any).Battle = Battle;
	(global as any).Pokemon = Pokemon;
}
/**
 * Text parser
 *
 * No dependencies
 * Optional dependency: BattleText
 *
 * @author Guangcong Luo <guangcongluo@gmail.com>
 * @license MIT
 */

type Args = [string, ...string[]];
type KWArgs = {[kw: string]: string};

class BattleTextParser {
	p1 = "Player 1";
	p2 = "Player 2";
	perspective: 0 | 1;
	gen = 7;
	curLineSection: 'break' | 'preMajor' | 'major' | 'postMajor' = 'break';
	lowercaseRegExp: RegExp | null | undefined = undefined;

	constructor(perspective: 0 | 1 = 0) {
		this.perspective = perspective;
	}

	static parseLine(line: string, noDefault: true): Args | null;
	static parseLine(line: string): Args;
	static parseLine(line: string, noDefault?: boolean): Args | null {
		if (!line.startsWith('|')) {
			return ['', line];
		}
		if (line === '|') {
			return ['done'];
		}
		const index = line.indexOf('|', 1);
		const cmd = line.slice(1, index);
		switch (cmd) {
		case 'chatmsg': case 'chatmsg-raw': case 'raw': case 'error': case 'html':
		case 'inactive': case 'inactiveoff': case 'warning':
		case 'fieldhtml': case 'controlshtml': case 'bigerror':
		case 'debug': case 'tier': case 'challstr': case 'popup': case '':
			return [cmd, line.slice(index + 1)];
		case 'c': case 'chat': case 'uhtml': case 'uhtmlchange':
			// three parts
			const index2a = line.indexOf('|', index + 1);
			return [cmd, line.slice(index + 1, index2a), line.slice(index2a + 1)];
		case 'c:': case 'pm':
			// four parts
			const index2b = line.indexOf('|', index + 1);
			const index3b = line.indexOf('|', index2b + 1);
			return [cmd, line.slice(index + 1, index2b), line.slice(index2b + 1, index3b), line.slice(index3b + 1)];
		}
		if (noDefault) return null;
		return line.slice(1).split('|') as [string, ...string[]];
	}

	static parseBattleLine(line: string): {args: Args, kwArgs: KWArgs} {
		let args = this.parseLine(line, true);
		if (args) return {args, kwArgs: {}};

		args = line.slice(1).split('|') as [string, ...string[]];
		const kwArgs: KWArgs = {};
		while (args.length > 1) {
			const lastArg = args[args.length - 1];
			if (lastArg.charAt(0) !== '[') break;
			const bracketPos = lastArg.indexOf(']');
			if (bracketPos <= 0) break;
			// default to '.' so it evaluates to boolean true
			kwArgs[lastArg.slice(1, bracketPos)] = lastArg.slice(bracketPos + 1).trim() || '.';
			args.pop();
		}
		return BattleTextParser.upgradeArgs({args, kwArgs});
	}

	static parseNameParts(text: string) {
		let group = '';
		// names can't start with a symbol
		if (!/[A-Za-z0-9]/.test(text.charAt(0))) {
			group = text.charAt(0);
			text = text.slice(1);
		}

		let name = text;
		const atIndex = text.indexOf('@');
		let status = '';
		let away = false;
		if (atIndex > 0) {
			name = text.slice(0, atIndex);
			status = text.slice(atIndex + 1);
			if (status.startsWith('!')) {
				away = true;
				status = status.slice(1);
			}
		}
		return {group, name, away, status};
	}

	static upgradeArgs({args, kwArgs}: {args: Args, kwArgs: KWArgs}): {args: Args, kwArgs: KWArgs} {
		switch (args[0]) {
		case '-activate': {
			if (kwArgs.item || kwArgs.move || kwArgs.number || kwArgs.ability) return {args, kwArgs};
			let [, pokemon, effect, arg3, arg4] = args;
			let target = kwArgs.of;
			const id = BattleTextParser.effectId(effect);

			if (kwArgs.block) return {args: ['-fail', pokemon], kwArgs};

			if (id === 'wonderguard') return {args: ['-immune', pokemon], kwArgs: {from: 'ability:Wonder Guard'}};

			if ([
				'ingrain', 'quickguard', 'wideguard', 'craftyshield', 'matblock', 'protect', 'mist', 'safeguard',
				'electricterrain', 'mistyterrain', 'psychicterrain', 'telepathy', 'stickyhold', 'suctioncups', 'aromaveil',
				'flowerveil', 'sweetveil', 'disguise', 'safetygoggles', 'protectivepads',
			].includes(id)) {
				if (target) {
					kwArgs.of = pokemon;
					return {args: ['-block', target, effect, arg3], kwArgs};
				}
				return {args: ['-block', pokemon, effect, arg3], kwArgs};
			}

			if ([
				'bind', 'wrap', 'clamp', 'whirlpool', 'firespin', 'magmastorm', 'sandtomb', 'infestation', 'charge', 'trapped',
			].includes(id)) {
				return {args: ['-start', pokemon, effect], kwArgs: {of: target}};
			}

			if (id === 'fairylock') {
				return {args: ['-fieldactivate', effect], kwArgs: {}};
			}

			if (id === 'symbiosis') {
				kwArgs.item = arg3;
			} else if (id === 'magnitude') {
				kwArgs.number = arg3;
			} else if (id === 'skillswap' || id === 'mummy' || id === 'wanderingspirit') {
				kwArgs.ability = arg3;
				kwArgs.ability2 = arg4;
			} else if (['spite', 'grudge', 'forewarn', 'sketch', 'leppaberry', 'mysteryberry'].includes(id)) {
				kwArgs.move = arg3;
				kwArgs.number = arg4;
			}
			args = ['-activate', pokemon, effect, target || ''];
			break;
		}

		case '-fail': {
			if (kwArgs.from === 'ability: Flower Veil') {
				return {args: ['-block', kwArgs.of, 'ability: Flower Veil'], kwArgs: {of: args[1]}};
			}
			break;
		}

		case '-start': {
			if (kwArgs.from === 'Protean' || kwArgs.from === 'Color Change') kwArgs.from = 'ability:' + kwArgs.from;
			break;
		}

		case 'move': {
			if (kwArgs.from === 'Magic Bounce') kwArgs.from = 'ability:Magic Bounce';
			break;
		}

		case 'cant': {
			let [, pokemon, effect, move] = args;
			if (['ability: Queenly Majesty', 'ability: Damp', 'ability: Dazzling'].includes(effect)) {
				args[0] = '-block';
				return {args: ['-block', pokemon, effect, move, kwArgs.of], kwArgs: {}};
			}
			break;
		}

		case '-nothing':
			// OLD: |-nothing
			// NEW: |-activate||move:Splash
			return {args: ['-activate', '', 'move:Splash'], kwArgs};
		}
		return {args, kwArgs};
	}

	extractMessage(buf: string) {
		let out = '';
		for (const line of buf.split('\n')) {
			const {args, kwArgs} = BattleTextParser.parseBattleLine(line);
			out += this.parseArgs(args, kwArgs) || '';
		}
		return out;
	}

	fixLowercase(input: string) {
		if (this.lowercaseRegExp === undefined) {
			const prefixes = ['pokemon', 'opposingPokemon', 'team', 'opposingTeam', 'party', 'opposingParty'].map(templateId => {
				const template = BattleText.default[templateId];
				if (template.charAt(0) === template.charAt(0).toUpperCase()) return '';
				const bracketIndex = template.indexOf('[');
				if (bracketIndex >= 0) return template.slice(0, bracketIndex);
				return template;
			}).filter(prefix => prefix);
			if (prefixes.length) {
				let buf = `((?:^|\n)(?:  |  \\\(|\\\[)?)(` +
					prefixes.map(BattleTextParser.escapeRegExp).join('|') +
					`)`;
				this.lowercaseRegExp = new RegExp(buf, 'g');
			} else {
				this.lowercaseRegExp = null;
			}
		}
		if (!this.lowercaseRegExp) return input;
		return input.replace(this.lowercaseRegExp, (match, p1, p2) => (
			p1 + p2.charAt(0).toUpperCase() + p2.slice(1)
		));
	}

	static escapeRegExp(input: string) {
		return input.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
	}

	pokemonName = (pokemon: string) => {
		if (!pokemon) return '';
		if (!pokemon.startsWith('p1') && !pokemon.startsWith('p2')) return `???pokemon:${pokemon}???`;
		if (pokemon.charAt(3) === ':') return pokemon.slice(4).trim();
		else if (pokemon.charAt(2) === ':') return pokemon.slice(3).trim();
		return `???pokemon:${pokemon}???`;
	};

	pokemon(pokemon: string) {
		if (!pokemon) return '';
		let side;
		switch (pokemon.slice(0, 2)) {
		case 'p1': side = 0; break;
		case 'p2': side = 1; break;
		default: return `???pokemon:${pokemon}???`;
		}
		const name = this.pokemonName(pokemon);
		const template = BattleText.default[side === this.perspective ? 'pokemon' : 'opposingPokemon'];
		return template.replace('[NICKNAME]', name);
	}

	pokemonFull(pokemon: string, details: string): [string, string] {
		const nickname = this.pokemonName(pokemon);

		const species = details.split(',')[0];
		if (nickname === species) return [pokemon.slice(0, 2), `**${species}**`];
		return [pokemon.slice(0, 2), `${nickname} (**${species}**)`];
	}

	trainer(side: string) {
		side = side.slice(0, 2);
		if (side === 'p1') return this.p1;
		if (side === 'p2') return this.p2;
		return `???side:${side}???`;
	}

	team(side: string) {
		side = side.slice(0, 2);
		if (side === (this.perspective === 0 ? 'p1' : 'p2')) {
			return BattleText.default.team;
		}
		return BattleText.default.opposingTeam;
	}

	own(side: string) {
		side = side.slice(0, 2);
		if (side === (this.perspective === 0 ? 'p1' : 'p2')) {
			return 'OWN';
		}
		return '';
	}

	party(side: string) {
		side = side.slice(0, 2);
		if (side === (this.perspective === 0 ? 'p1' : 'p2')) {
			return BattleText.default.party;
		}
		return BattleText.default.opposingParty;
	}

	static effectId(effect?: string) {
		if (!effect) return '';
		if (effect.startsWith('item:') || effect.startsWith('move:')) {
			effect = effect.slice(5);
		} else if (effect.startsWith('ability:')) {
			effect = effect.slice(8);
		}
		return toID(effect);
	}

	effect(effect?: string) {
		if (!effect) return '';
		if (effect.startsWith('item:') || effect.startsWith('move:')) {
			effect = effect.slice(5);
		} else if (effect.startsWith('ability:')) {
			effect = effect.slice(8);
		}
		return effect.trim();
	}

	template(type: string, ...namespaces: (string | undefined)[]) {
		for (const namespace of namespaces) {
			if (!namespace) continue;
			if (namespace === 'OWN') {
				return BattleText.default[type + 'Own'] + '\n';
			}
			if (namespace === 'NODEFAULT') {
				return '';
			}
			let id = BattleTextParser.effectId(namespace);
			if (BattleText[id] && type in BattleText[id]) {
				if (BattleText[id][type].charAt(1) === '.') type = BattleText[id][type].slice(2) as ID;
				if (BattleText[id][type].charAt(0) === '#') id = BattleText[id][type].slice(1) as ID;
				if (!BattleText[id][type]) return '';
				return BattleText[id][type] + '\n';
			}
		}
		if (!BattleText.default[type]) return '';
		return BattleText.default[type] + '\n';
	}

	maybeAbility(effect: string | undefined, holder: string) {
		if (!effect) return '';
		if (!effect.startsWith('ability:')) return '';
		return this.ability(effect.slice(8).trim(), holder);
	}

	ability(name: string | undefined, holder: string) {
		if (!name) return '';
		return BattleText.default.abilityActivation.replace('[POKEMON]', this.pokemon(holder)).replace('[ABILITY]', this.effect(name)) + '\n';
	}

	stat(stat: string) {
		const entry = BattleText[stat || "stats"];
		if (!entry || !entry.statName) return `???stat:${stat}???`;
		return entry.statName;
	}

	lineSection(args: Args, kwArgs: KWArgs) {
		const cmd = args[0];
		switch (cmd) {
		case 'done' : case 'turn':
			return 'break';
		case 'move' : case 'cant': case 'switch': case 'drag': case 'upkeep': case 'start': case '-mega':
			return 'major';
		case 'switchout': case 'faint':
			return 'preMajor';
		case '-zpower':
			return 'postMajor';
		case '-damage': {
			const id = BattleTextParser.effectId(kwArgs.from);
			if (id === 'confusion') return 'major';
			return 'postMajor';
		}
		case '-curestatus': {
			const id = BattleTextParser.effectId(kwArgs.from);
			if (id === 'naturalcure') return 'preMajor';
			return 'postMajor';
		}
		case '-start': {
			const id = BattleTextParser.effectId(kwArgs.from);
			if (id === 'protean') return 'preMajor';
			return 'postMajor';
		}
		case '-activate': {
			const id = BattleTextParser.effectId(args[2]);
			if (id === 'confusion' || id === 'attract') return 'preMajor';
			return 'postMajor';
		}
		}
		return (cmd.charAt(0) === '-' ? 'postMajor' : '');
	}

	sectionBreak(args: Args, kwArgs: KWArgs) {
		const prevSection = this.curLineSection;
		const curSection = this.lineSection(args, kwArgs);
		if (!curSection) return false;
		this.curLineSection = curSection;
		switch (curSection) {
		case 'break':
			if (prevSection !== 'break') return true;
			return false;
		case 'preMajor':
		case 'major':
			if (prevSection === 'postMajor' || prevSection === 'major') return true;
			return false;
		case 'postMajor':
			return false;
		}
	}

	parseArgs(args: Args, kwArgs: KWArgs, noSectionBreak?: boolean) {
		let buf = !noSectionBreak && this.sectionBreak(args, kwArgs) ? '\n' : '';
		return buf + this.fixLowercase(this.parseArgsInner(args, kwArgs) || '');
	}

	parseArgsInner(args: Args, kwArgs: KWArgs) {
		let cmd = args[0];
		switch (cmd) {
		case 'player': {
			const [, side, name] = args;
			if (side === 'p1' && name) {
				this.p1 = name;
			} else if (side === 'p2' && name) {
				this.p2 = name;
			}
			return '';
		}

		case 'gen': {
			const [, num] = args;
			this.gen = parseInt(num, 10);
			return '';
		}

		case 'turn': {
			const [, num] = args;
			return this.template('turn').replace('[NUMBER]', num) + '\n';
		}

		case 'start': {
			return this.template('startBattle').replace('[TRAINER]', this.p1).replace('[TRAINER]', this.p2);
		}

		case 'win': case 'tie': {
			const [, name] = args;
			if (cmd === 'tie' || !name) {
				return this.template('tieBattle').replace('[TRAINER]', this.p1).replace('[TRAINER]', this.p2);
			}
			return this.template('winBattle').replace('[TRAINER]', name);
		}

		case 'switch': {
			const [, pokemon, details] = args;
			const [side, fullname] = this.pokemonFull(pokemon, details);
			const template = this.template('switchIn', this.own(side));
			return template.replace('[TRAINER]', this.trainer(side)).replace('[FULLNAME]', fullname);
		}

		case 'drag': {
			const [, pokemon, details] = args;
			const [side, fullname] = this.pokemonFull(pokemon, details);
			const template = this.template('drag');
			return template.replace('[TRAINER]', this.trainer(side)).replace('[FULLNAME]', fullname);
		}

		case 'detailschange': case '-transform': case '-formechange': {
			const [, pokemon, arg2, arg3] = args;
			let newSpecies = '';
			switch (cmd) {
			case 'detailschange': newSpecies = arg2.split(',')[0].trim(); break;
			case '-transform': newSpecies = arg3; break;
			case '-formechange': newSpecies = arg2; break;
			}
			let newSpeciesId = toID(newSpecies);
			let id = '';
			let templateName = 'transform';
			if (cmd !== '-transform') {
				switch (newSpeciesId) {
				case 'greninjaash': id = 'battlebond'; break;
				case 'mimikyubusted': id = 'disguise'; break;
				case 'zygardecomplete': id = 'powerconstruct'; break;
				case 'necrozmaultra': id = 'ultranecroziumz'; break;
				case 'darmanitanzen': id = 'zenmode'; break;
				case 'darmanitan': id = 'zenmode'; templateName = 'transformEnd'; break;
				case 'darmanitangalarzen': id = 'zenmode'; break;
				case 'darmanitangalar': id = 'zenmode'; templateName = 'transformEnd'; break;
				case 'aegislashblade': id = 'stancechange'; break;
				case 'aegislash': id = 'stancechange'; templateName = 'transformEnd'; break;
				case 'wishiwashischool': id = 'schooling'; break;
				case 'wishiwashi': id = 'schooling'; templateName = 'transformEnd'; break;
				case 'miniormeteor': id = 'shieldsdown'; break;
				case 'minior': id = 'shieldsdown'; templateName = 'transformEnd'; break;
				case 'eiscuenoice': id = 'iceface'; break;
				case 'eiscue': id = 'iceface'; templateName = 'transformEnd'; break;
				}
			} else if (newSpecies) {
				id = 'transform';
			}
			const template = this.template(templateName, id, kwArgs.msg ? '' : 'NODEFAULT');
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[SPECIES]', newSpecies);
		}

		case 'switchout': {
			const [, pokemon] = args;
			const side = pokemon.slice(0, 2);
			const template = this.template('switchOut', kwArgs.from, this.own(side));
			return template.replace('[TRAINER]', this.trainer(side)).replace('[NICKNAME]', this.pokemonName(pokemon)).replace('[POKEMON]', this.pokemon(pokemon));
		}

		case 'faint': {
			const [, pokemon] = args;
			const template = this.template('faint');
			return template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case 'swap': {
			const [, pokemon, target] = args;
			if (!target || !isNaN(Number(target))) {
				const template = this.template('swapCenter');
				return template.replace('[POKEMON]', this.pokemon(pokemon));
			}
			const template = this.template('swap');
			return template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[TARGET]', this.pokemon(target));
		}

		case 'move': {
			const [, pokemon, move] = args;
			let line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			if (kwArgs.zEffect) {
				line1 = this.template('zEffect').replace('[POKEMON]', this.pokemon(pokemon));
			}
			const template = this.template('move', kwArgs.from);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[MOVE]', move);
		}

		case 'cant': {
			let [, pokemon, effect, move] = args;
			const template = this.template('cant', effect, 'NODEFAULT') ||
				this.template(move ? 'cant' : 'cantNoMove');
			const line1 = this.maybeAbility(effect, kwArgs.of || pokemon);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[MOVE]', move);
		}

		case 'message': {
			let [, message] = args;
			return '' + message + '\n';
		}

		case '-start': {
			let [, pokemon, effect, arg3] = args;
			const line1 = this.maybeAbility(effect, pokemon) || this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			let id = BattleTextParser.effectId(effect);
			if (id === 'typechange') {
				const template = this.template('typeChange', kwArgs.from);
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[TYPE]', arg3).replace('[SOURCE]', this.pokemon(kwArgs.of));
			}
			if (id === 'typeadd') {
				const template = this.template('typeAdd', kwArgs.from);
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[TYPE]', arg3);
			}
			if (id.startsWith('stockpile')) {
				const num = id.slice(9);
				const template = this.template('start', 'stockpile');
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[NUMBER]', num);
			}
			if (id.startsWith('perish')) {
				const num = id.slice(6);
				const template = this.template('activate', 'perishsong');
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[NUMBER]', num);
			}
			let templateId = 'start';
			if (kwArgs.already) templateId = 'alreadyStarted';
			if (kwArgs.fatigue) templateId = 'startFromFatigue';
			if (kwArgs.zeffect) templateId = 'startFromZEffect';
			if (kwArgs.damage) templateId = 'activate';
			if (kwArgs.block) templateId = 'block';
			if (kwArgs.upkeep) templateId = 'upkeep';
			if (id === 'reflect' || id === 'lightscreen') templateId = 'startGen1';
			if (templateId === 'start' && kwArgs.from?.startsWith('item:')) {
				templateId += 'FromItem';
			}
			const template = this.template(templateId, effect);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[EFFECT]', this.effect(effect)).replace('[MOVE]', arg3).replace('[SOURCE]', this.pokemon(kwArgs.of)).replace('[ITEM]', this.effect(kwArgs.from));
		}

		case '-end': {
			let [, pokemon, effect] = args;
			const line1 = this.maybeAbility(effect, pokemon) || this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			let id = BattleTextParser.effectId(effect);
			if (id === 'doomdesire' || id === 'futuresight') {
				const template = this.template('activate', effect);
				return line1 + template.replace('[TARGET]', this.pokemon(pokemon));
			}
			let templateId = 'end';
			let template = '';
			if (kwArgs.from?.startsWith('item:')) {
				template = this.template('endFromItem', effect);
			}
			if (!template) template = this.template(templateId, effect);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[EFFECT]', this.effect(effect)).replace('[SOURCE]', this.pokemon(kwArgs.of));
		}

		case '-ability': {
			let [, pokemon, ability, oldAbility, arg4] = args;
			let line1 = '';
			if (oldAbility && (oldAbility.startsWith('p1') || oldAbility.startsWith('p2') || oldAbility === 'boost')) {
				arg4 = oldAbility;
				oldAbility = '';
			}
			if (oldAbility) line1 += this.ability(oldAbility, pokemon);
			line1 += this.ability(ability, pokemon);
			if (kwArgs.fail) {
				const template = this.template('block', kwArgs.from);
				return line1 + template;
			}
			if (kwArgs.from) {
				line1 = this.maybeAbility(kwArgs.from, pokemon) + line1;
				const template = this.template('changeAbility', kwArgs.from);
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[ABILITY]', this.effect(ability)).replace('[SOURCE]', this.pokemon(kwArgs.of));
			}
			const id = BattleTextParser.effectId(ability);
			if (id === 'unnerve') {
				const template = this.template('start', ability);
				return line1 + template.replace('[TEAM]', this.team(arg4));
			}
			let templateId = 'start';
			if (id === 'anticipation' || id === 'sturdy') templateId = 'activate';
			const template = this.template(templateId, ability, 'NODEFAULT');
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-endability': {
			let [, pokemon, ability] = args;
			if (ability) return this.ability(ability, pokemon);
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			const template = this.template('start', 'Gastro Acid');
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-item': {
			const [, pokemon, item] = args;
			const id = BattleTextParser.effectId(kwArgs.from);
			let target = '';
			if (['magician', 'pickpocket'].includes(id)) {
				[target, kwArgs.of] = [kwArgs.of, ''];
			}
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			if (['thief', 'covet', 'bestow', 'magician', 'pickpocket'].includes(id)) {
				const template = this.template('takeItem', kwArgs.from);
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[ITEM]', this.effect(item)).replace('[SOURCE]', this.pokemon(target || kwArgs.of));
			}
			if (id === 'frisk') {
				const hasTarget = kwArgs.of && pokemon && kwArgs.of !== pokemon;
				const template = this.template(hasTarget ? 'activate' : 'activateNoTarget', "Frisk");
				return line1 + template.replace('[POKEMON]', this.pokemon(kwArgs.of)).replace('[ITEM]', this.effect(item)).replace('[TARGET]', this.pokemon(pokemon));
			}
			if (kwArgs.from) {
				const template = this.template('addItem', kwArgs.from);
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[ITEM]', this.effect(item));
			}
			const template = this.template('start', item, 'NODEFAULT');
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-enditem': {
			let [, pokemon, item] = args;
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			if (kwArgs.eat) {
				const template = this.template('eatItem', kwArgs.from);
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[ITEM]', this.effect(item));
			}
			const id = BattleTextParser.effectId(kwArgs.from);
			if (id === 'gem') {
				const template = this.template('useGem', item);
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[ITEM]', this.effect(item)).replace('[MOVE]', kwArgs.move);
			}
			if (id === 'stealeat') {
				const template = this.template('removeItem', "Bug Bite");
				return line1 + template.replace('[SOURCE]', this.pokemon(kwArgs.of)).replace('[ITEM]', this.effect(item));
			}
			if (kwArgs.from) {
				const template = this.template('removeItem', kwArgs.from);
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[ITEM]', this.effect(item)).replace('[SOURCE]', this.pokemon(kwArgs.of));
			}
			if (kwArgs.weaken) {
				const template = this.template('activateWeaken');
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[ITEM]', this.effect(item));
			}
			let template = this.template('end', item, 'NODEFAULT');
			if (!template) template = this.template('activateItem').replace('[ITEM]', this.effect(item));
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[TARGET]', this.pokemon(kwArgs.of));
		}

		case '-status': {
			const [, pokemon, status] = args;
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			if (BattleTextParser.effectId(kwArgs.from) === 'rest') {
				const template = this.template('startFromRest', status);
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
			}
			const template = this.template('start', status);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-curestatus': {
			const [, pokemon, status] = args;
			if (BattleTextParser.effectId(kwArgs.from) === 'naturalcure') {
				const template = this.template('activate', kwArgs.from);
				return template.replace('[POKEMON]', this.pokemon(pokemon));
			}
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			if (kwArgs.from?.startsWith('item:')) {
				const template = this.template('endFromItem', status);
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[ITEM]', this.effect(kwArgs.from));
			}
			if (kwArgs.thaw) {
				const template = this.template('endFromMove', status);
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[MOVE]', this.effect(kwArgs.from));
			}
			let template = this.template('end', status, 'NODEFAULT');
			if (!template) template = this.template('end').replace('[EFFECT]', status);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-cureteam': {
			return this.template('activate', kwArgs.from);
		}

		case '-singleturn': case '-singlemove': {
			const [, pokemon, effect] = args;
			const line1 = this.maybeAbility(effect, kwArgs.of || pokemon) ||
				this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			let id = BattleTextParser.effectId(effect);
			if (id === 'instruct') {
				const template = this.template('activate', effect);
				return line1 + template.replace('[POKEMON]', this.pokemon(kwArgs.of)).replace('[TARGET]', this.pokemon(pokemon));
			}
			let template = this.template('start', effect, 'NODEFAULT');
			if (!template) template = this.template('start').replace('[EFFECT]', this.effect(effect));
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[SOURCE]', this.pokemon(kwArgs.of)).replace('[TEAM]', this.team(pokemon.slice(0, 2)));
		}

		case '-sidestart': {
			let [, side, effect] = args;
			let template = this.template('start', effect, 'NODEFAULT');
			if (!template) template = this.template('startTeamEffect').replace('[EFFECT]', this.effect(effect));
			return template.replace('[TEAM]', this.team(side)).replace('[PARTY]', this.party(side));
		}

		case '-sideend': {
			let [, side, effect] = args;
			let template = this.template('end', effect, 'NODEFAULT');
			if (!template) template = this.template('endTeamEffect').replace('[EFFECT]', this.effect(effect));
			return template.replace('[TEAM]', this.team(side)).replace('[PARTY]', this.party(side));
		}

		case '-weather': {
			const [, weather] = args;
			if (!weather || weather === 'none') {
				const template = this.template('end', kwArgs.from, 'NODEFAULT');
				if (!template) return this.template('endFieldEffect').replace('[EFFECT]', this.effect(weather));
				return template;
			}
			if (kwArgs.upkeep) {
				return this.template('upkeep', weather, 'NODEFAULT');
			}
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of);
			let template = this.template('start', weather, 'NODEFAULT');
			if (!template) template = this.template('startFieldEffect').replace('[EFFECT]', this.effect(weather));
			return line1 + template;
		}

		case '-fieldstart': case '-fieldactivate': {
			const [, effect] = args;
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of);
			let templateId = cmd.slice(6);
			if (BattleTextParser.effectId(effect) === 'perishsong') templateId = 'start';
			let template = this.template(templateId, effect, 'NODEFAULT');
			if (!template) template = this.template('startFieldEffect').replace('[EFFECT]', this.effect(effect));
			return line1 + template.replace('[POKEMON]', this.pokemon(kwArgs.of));
		}

		case '-fieldend': {
			let [, effect] = args;
			let template = this.template('end', effect, 'NODEFAULT');
			if (!template) template = this.template('endFieldEffect').replace('[EFFECT]', this.effect(effect));
			return template;
		}

		case '-sethp': {
			let effect = kwArgs.from;
			return this.template('activate', effect);
		}

		case '-message': {
			let [, message] = args;
			return '  ' + message + '\n';
		}

		case '-hint': {
			let [, message] = args;
			return '  (' + message + ')\n';
		}

		case '-activate': {
			let [, pokemon, effect, target] = args;
			let id = BattleTextParser.effectId(effect);
			if (id === 'celebrate') {
				return this.template('activate', 'celebrate').replace('[TRAINER]', this.trainer(pokemon.slice(0, 2)));
			}
			if (!target && ['hyperspacefury', 'hyperspacehole', 'phantomforce', 'shadowforce', 'feint'].includes(id)) {
				[pokemon, target] = [kwArgs.of, pokemon];
				if (!pokemon) pokemon = target;
			}
			if (!target) target = kwArgs.of || pokemon;

			let line1 = this.maybeAbility(effect, pokemon);

			if (id === 'lockon' || id === 'mindreader') {
				const template = this.template('start', effect);
				return line1 + template.replace('[POKEMON]', this.pokemon(kwArgs.of)).replace('[SOURCE]', this.pokemon(pokemon));
			}

			if (id === 'mummy') {
				line1 += this.ability(kwArgs.ability, target);
				line1 += this.ability('Mummy', target);
				const template = this.template('changeAbility', 'mummy');
				return line1 + template.replace('[TARGET]', this.pokemon(target));
			}

			let templateId = 'activate';
			if (id === 'forewarn' && pokemon === target) {
				templateId = 'activateNoTarget';
			}
			let template = this.template(templateId, effect, 'NODEFAULT');
			if (!template) {
				if (line1) return line1; // Abilities don't have a default template
				template = this.template('activate');
				return line1 + template.replace('[EFFECT]', this.effect(effect));
			}

			if (id === 'brickbreak') {
				template = template.replace('[TEAM]', this.team(target.slice(0, 2)));
			}
			if (kwArgs.ability) {
				line1 += this.ability(kwArgs.ability, pokemon);
			}
			if (kwArgs.ability2) {
				line1 += this.ability(kwArgs.ability2, target);
			}
			if (kwArgs.move || kwArgs.number || kwArgs.item) {
				template = template.replace('[MOVE]', kwArgs.move).replace('[NUMBER]', kwArgs.number).replace('[ITEM]', kwArgs.item);
			}
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[TARGET]', this.pokemon(target)).replace('[SOURCE]', this.pokemon(kwArgs.of));
		}

		case '-prepare': {
			const [, pokemon, effect, target] = args;
			const template = this.template('prepare', effect);
			return template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[TARGET]', this.pokemon(target));
		}

		case '-damage': {
			let [, pokemon, , percentage] = args;
			let template = this.template('damage', kwArgs.from, 'NODEFAULT');
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			const id = BattleTextParser.effectId(kwArgs.from);
			if (template) {
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
			}

			if (!kwArgs.from) {
				template = this.template(percentage ? 'damagePercentage' : 'damage');
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[PERCENTAGE]', percentage);
			}
			if (kwArgs.from.startsWith('item:')) {
				template = this.template(kwArgs.of ? 'damageFromPokemon' : 'damageFromItem');
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[ITEM]', this.effect(kwArgs.from)).replace('[SOURCE]', this.pokemon(kwArgs.of));
			}
			if (kwArgs.partiallytrapped || id === 'bind' || id === 'wrap') {
				template = this.template('damageFromPartialTrapping');
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[MOVE]', this.effect(kwArgs.from));
			}

			template = this.template('damage');
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-heal': {
			let [, pokemon] = args;
			let template = this.template('heal', kwArgs.from, 'NODEFAULT');
			const line1 = this.maybeAbility(kwArgs.from, pokemon);
			if (template) {
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[SOURCE]', this.pokemon(kwArgs.of)).replace('[NICKNAME]', kwArgs.wisher);
			}

			if (kwArgs.from && !kwArgs.from.startsWith('ability:')) {
				template = this.template('healFromEffect');
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[EFFECT]', this.effect(kwArgs.from));
			}

			template = this.template('heal');
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-boost': case '-unboost': {
			let [, pokemon, stat, num] = args;
			if (stat === 'spa' && this.gen === 1) stat = 'spc';
			const amount = parseInt(num, 10);
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			let templateId = cmd.slice(1);
			if (amount >= 3) templateId += '3';
			else if (amount >= 2) templateId += '2';
			else if (amount === 0) templateId += '0';
			if (amount && kwArgs.zeffect) {
				templateId += (kwArgs.multiple ? 'MultipleFromZEffect' : 'FromZEffect');
			} else if (amount && kwArgs.from?.startsWith('item:')) {
				const template = this.template(templateId + 'FromItem', kwArgs.from);
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[STAT]', this.stat(stat)).replace('[ITEM]', this.effect(kwArgs.from));
			}
			const template = this.template(templateId, kwArgs.from);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[STAT]', this.stat(stat));
		}

		case '-setboost': {
			const [, pokemon] = args;
			const effect = kwArgs.from;
			const line1 = this.maybeAbility(effect, kwArgs.of || pokemon);
			const template = this.template('boost', effect);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-swapboost': {
			const [, pokemon, target] = args;
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			const id = BattleTextParser.effectId(kwArgs.from);
			let templateId = 'swapBoost';
			if (id === 'guardswap') templateId = 'swapDefensiveBoost';
			if (id === 'powerswap') templateId = 'swapOffensiveBoost';
			const template = this.template(templateId, kwArgs.from);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[TARGET]', this.pokemon(target));
		}

		case '-copyboost': {
			const [, pokemon, target] = args;
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			const template = this.template('copyBoost', kwArgs.from);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[TARGET]', this.pokemon(target));
		}

		case '-clearboost': case '-clearpositiveboost': case '-clearnegativeboost': {
			const [, pokemon, source] = args;
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			let templateId = 'clearBoost';
			if (kwArgs.zeffect) templateId = 'clearBoostFromZEffect';
			const template = this.template(templateId, kwArgs.from);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[SOURCE]', this.pokemon(source));
		}

		case '-invertboost': {
			const [, pokemon] = args;
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			const template = this.template('invertBoost', kwArgs.from);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-clearallboost': {
			return this.template('clearAllBoost', kwArgs.from);
		}

		case '-crit': case '-supereffective': case '-resisted': {
			const [, pokemon] = args;
			let templateId = cmd.slice(1);
			if (templateId === 'supereffective') templateId = 'superEffective';
			if (kwArgs.spread) templateId += 'Spread';
			const template = this.template(templateId);
			return template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-block': {
			let [, pokemon, effect, move, attacker] = args;
			const line1 = this.maybeAbility(effect, kwArgs.of || pokemon);
			const template = this.template('block', effect);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[SOURCE]', this.pokemon(attacker || kwArgs.of)).replace('[MOVE]', move);
		}

		case '-fail': {
			let [, pokemon, effect, stat] = args;
			let id = BattleTextParser.effectId(effect);
			let blocker = BattleTextParser.effectId(kwArgs.from);
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			let templateId = 'block';
			if (['desolateland', 'primordialsea'].includes(blocker) &&
				!['sunnyday', 'raindance', 'sandstorm', 'hail'].includes(id)) {
				templateId = 'blockMove';
			} else if (blocker === 'uproar' && kwArgs.msg) {
				templateId = 'blockSelf';
			}
			let template = this.template(templateId, kwArgs.from);
			if (template) {
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
			}

			if (id === 'unboost') {
				template = this.template(stat ? 'failSingular' : 'fail', 'unboost');
				return line1 + template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[STAT]', stat);
			}

			templateId = 'fail';
			if (['brn', 'frz', 'par', 'psn', 'slp', 'substitute'].includes(id)) {
				templateId = 'alreadyStarted';
			}
			if (kwArgs.heavy) templateId = 'failTooHeavy';
			if (kwArgs.weak) templateId = 'fail';
			if (kwArgs.forme) templateId = 'failWrongForme';
			template = this.template(templateId, id);
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-immune': {
			const [, pokemon] = args;
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			let template = this.template('block', kwArgs.from);
			if (!template) {
				const templateId = kwArgs.ohko ? 'immuneOHKO' : 'immune';
				template = this.template(pokemon ? templateId : 'immuneNoPokemon', kwArgs.from);
			}
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-miss': {
			const [, source, pokemon] = args;
			const line1 = this.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
			if (!pokemon) {
				const template = this.template('missNoPokemon');
				return line1 + template.replace('[SOURCE]', this.pokemon(source));
			}
			const template = this.template('miss');
			return line1 + template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-center': case '-ohko': case '-combine': {
			return this.template(cmd.slice(1));
		}

		case '-notarget': {
			return this.template('noTarget');
		}

		case '-mega': case '-primal': {
			const [, pokemon, species, item] = args;
			let id = '';
			let templateId = cmd.slice(1);
			if (species === 'Rayquaza') {
				id = 'dragonascent';
				templateId = 'megaNoItem';
			}
			if (!id && cmd === '-mega' && this.gen < 7) templateId = 'megaGen6';
			if (!item && cmd === '-mega') templateId = 'megaNoItem';
			let template = this.template(templateId, id);
			const side = pokemon.slice(0, 2);
			const pokemonName = this.pokemon(pokemon);
			if (cmd === '-mega') {
				const template2 = this.template('transformMega');
				template += template2.replace('[POKEMON]', pokemonName).replace('[SPECIES]', species);
			}
			return template.replace('[POKEMON]', pokemonName).replace('[ITEM]', item).replace('[TRAINER]', this.trainer(side));
		}

		case '-zpower': {
			const [, pokemon] = args;
			const template = this.template('zPower');
			return template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-burst': {
			const [, pokemon] = args;
			const template = this.template('activate', "Ultranecrozium Z");
			return template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-zbroken': {
			const [, pokemon] = args;
			const template = this.template('zBroken');
			return template.replace('[POKEMON]', this.pokemon(pokemon));
		}

		case '-hitcount': {
			const [, , num] = args;
			if (num === '1') {
				return this.template('hitCountSingular');
			}
			return this.template('hitCount').replace('[NUMBER]', num);
		}

		case '-waiting': {
			const [, pokemon, target] = args;
			const template = this.template('activate', "Water Pledge");
			return template.replace('[POKEMON]', this.pokemon(pokemon)).replace('[TARGET]', this.pokemon(target));
		}

		case '-anim': {
			return '';
		}

		default: {
			return null;
		}
		}
	}
}

if (typeof require === 'function') {
	// in Node
	(global as any).BattleTextParser = BattleTextParser;
}

export type Learnset = {[move: string]: string};
export type Learnsets = {
	learnsets: {[id: string]: Learnset};
} & {
	[mod: string]: {learnsets: {[id: string]: Learnset}};
};
var LEARNSETS: Promise<DeepReadonly<Learnsets>> | null = null;
(Dex as any).getLearnsets = () => {
	if (LEARNSETS) return LEARNSETS;
	if (typeof window === "undefined") {
		LEARNSETS = Promise.resolve(require('./data/learnsets.json') as DeepReadonly<Learnsets>);
	} else {
		LEARNSETS = import('./data/learnsets.json') as unknown as Promise<DeepReadonly<Learnsets>>;
	}
	return LEARNSETS;
};
export {
 	Ability,
	Args,
	Battle,
	BattleAbilities as Abilities,
	BattleAliases as Aliases,
	BattleAvatarNumbers as AvatarNumbers,
	BattleBaseSpeciesChart as BaseSpeciesChart,
	BattleItems as Items,
	BattleMovedex as Moves,
	BattleNatures as Natures,
	BattlePokedex as Species,
	BattlePokemonIconIndexes as PokemonIconIndexes,
	BattlePokemonIconIndexesLeft as PokemonIconIndexesLeft,
	BattleSceneStub as BattleScene,
	BattleStatNames as StatNames,
	BattleStats as Stats,
	BattleTeambuilderTable as FormatsData,
	BattleTextParser as TextParser,
	BattleTypeChart as TypeChart,
	BoostStatName as BootName,
	Dex,
	Effect,
	EffectState,
	EffectTable,
	GenderName,
	getString,
	HPColor,
	ID,
	Item,
	KWArgs,
	ModdedDex,
	Move,
	NatureName,
	Playback,
	Pokemon,
	PokemonDetails,
	PokemonHealth,
	PureEffect,
	ServerPokemon,
	Side,
	splitFirst,
	SpriteData,
	StatName,
	StatNameExceptHP,
	StatusName,
	Template,
	toID,
	toName,
	toRoomid,
	toUserid,
	TypeName,
	WeatherState
};
