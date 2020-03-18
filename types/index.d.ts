// ID gets its own special brand for compatibility reasons
export type ID = '' | (string & { __isID: true });

export type As<T> = { __brand: T };

export type Weather = string & As<'Weather'>;
export type FieldCondition = string & As<'FieldCondition'>;
export type SideCondition = string & As<'SideCondition'>;

export type GenerationNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type GenderName = 'M' | 'F' | 'N';

export type StatName = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';
export type StatsTable<T = number> = { [stat in StatName]: T };

export type BoostName = Exclude<StatName, 'hp'> | 'accuracy' | 'evasion';
export type BoostsTable<T = number> = { [boost in BoostName]: T };

export type MoveCategory = 'Physical' | 'Special' | 'Status';
export type MoveTarget =
	'adjacentAlly' | 'adjacentAllyOrSelf' | 'adjacentFoe' | 'all' |
	'allAdjacent' | 'allAdjacentFoes' | 'allies' | 'allySide' | 'allyTeam' |
	'any' | 'foeSide' | 'normal' | 'randomNormal' | 'scripted' | 'self';

export type Nonstandard =
	'Past' | 'Future' | 'Unobtainable' | 'CAP' | 'LGPE' | 'Custom';

export type EvoType =
	'trade' | 'useItem' | 'levelMove' | 'levelExtra' |
	'levelFriendship' | 'levelHold' | 'other';

export type Player = 'p1' | 'p2' | 'p3' | 'p4';

export type GameType = 'singles' | 'doubles' | 'triples' | 'multi' | 'free-for-all';

export type HPColor = 'r' | 'y' | 'g';

export type StatusName = 'par' | 'psn' | 'frz' | 'slp' | 'brn';

export type NatureName =
	'Adamant' | 'Bashful' | 'Bold' | 'Brave' | 'Calm' |
	'Careful' | 'Docile' | 'Gentle' | 'Hardy' | 'Hasty' |
	'Impish' | 'Jolly' | 'Lax' | 'Lonely' | 'Mild' |
	'Modest' | 'Naive' | 'Naughty' | 'Quiet' | 'Quirky' |
	'Rash' | 'Relaxed' | 'Sassy' | 'Serious' | 'Timid';

export type TypeName =
	'Normal' | 'Fighting' | 'Flying' | 'Poison' | 'Ground' | 'Rock' | 'Bug' | 'Ghost' | 'Steel' |
	'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' | 'Ice' | 'Dragon' | 'Dark' | 'Fairy' | '???';

export interface PokemonSet<T = string> {
	name: string;
	species: T;
	item: T;
	ability: T;
	moves: T[];
	nature: T;
	gender: string;
	evs: StatsTable;
	ivs: StatsTable;
	level: number;
	shiny?: boolean;
	happiness?: number;
	pokeball?: T;
	hpType?: string;
}

export type MoveSource = string;

export interface EventInfo {
	generation: number;
	level?: number;
	shiny?: boolean | 1;
	gender?: GenderName;
	nature?: string;
	ivs?: SparseStatsTable;
	perfectIVs?: number;
	isHidden?: boolean;
	abilities?: string[];
	maxEggMoves?: number;
	moves?: string[];
	pokeball?: string;
	from?: string;
}

export interface SelfEffect {
	boosts?: Partial<BoostsTable>;
	chance?: number;
	pseudoWeather?: string;
	sideCondition?: string;
	slotCondition?: string;
	terrain?: string;
	volatileStatus?: string;
	weather?: string;
}

export interface SecondaryEffect {
	chance?: number;
	ability?: Ability;
	boosts?: Partial<BoostsTable>;
	dustproof?: boolean;
	kingsrock?: boolean;
	self?: SelfEffectData;
	status?: string;
	volatileStatus?: string;
}

export interface EffectData {
	id: string;
	name: string;
	num: number;
	affectsFainted?: boolean;
	counterMax?: number;
	desc?: string;
	drain?: [number, number];
	duration?: number;
	effect?: Partial<PureEffectData>;
	effectType?: string;
	infiltrates?: boolean;
	isNonstandard?: Nonstandard | null;
	isUnreleased?: boolean | 'Past';
	isZ?: boolean | string;
	isMax?: boolean | string;
	noCopy?: boolean;
	recoil?: [number, number];
	secondary?: SecondaryEffectData | null;
	secondaries?: SecondaryEffectData[] | null;
	self?: SelfEffectData | null;
	shortDesc?: string;
	status?: string;
	weather?: string;
}

export interface ModdedEffectData extends Partial<EffectData> {
	inherit?: boolean;
}

export type EffectType =
	'Effect' | 'Pokemon' | 'Move' | 'Item' | 'Ability' | 'Format' |
	'Ruleset' | 'Weather' | 'Status' | 'Rule' | 'ValidatorRule';

export interface BasicEffect extends EffectData {
	id: ID;
	weather?: ID;
	status?: ID;
	effectType: EffectType;
	exists: boolean;
	fullname: string;
	gen: number;
	sourceEffect: string;
}

export interface PureEffectData extends EffectData, EffectData { }
export interface ModdedPureEffectData extends Partial<PureEffectData>, ModdedEffectData { }

export interface PureEffect extends Readonly<BasicEffect & PureEffectData> {
	readonly effectType: 'Status' | 'Effect' | 'Weather';
}

export interface AbilityData extends EffectData {
	rating: number;
	isUnbreakable?: boolean;
	suppressWeather?: boolean;
}
export interface ModdedAbilityData extends Partial<AbilityData>, ModdedEffectData { }
export interface Ability extends Readonly<BasicEffect & AbilityData> {
	readonly effectType: 'Ability';
}

export interface FlingData {
	basePower: number;
	status?: string;
	volatileStatus?: string;
}

export interface ItemData extends EffectData {
	gen: number;
	fling?: FlingData;
	forcedForme?: string;
	ignoreKlutz?: boolean;
	isBerry?: boolean;
	isChoice?: boolean;
	isGem?: boolean;
	isPokeball?: boolean;
	megaStone?: string;
	megaEvolves?: string;
	naturalGift?: { basePower: number, type: string };
	onDrive?: string;
	onMemory?: string;
	onPlate?: string;
	spritenum?: number;
	zMove?: string | true;
	zMoveFrom?: string;
	zMoveType?: string;
	itemUser?: string[];
	boosts?: Partial<BoostsTable> | false;
}
export interface ModdedItemData extends Partial<ItemData>, ModdedEffectData { }
export interface Item extends Readonly<BasicEffect & ItemData> {
	readonly effectType: 'Item';
}

export interface MoveData extends EffectData {
	accuracy: true | number;
	basePower: number;
	category: MoveCategory;
	flags: { [flag: string]: any };
	pp: number;
	priority: number;
	target: MoveTarget;
	type: string;
	alwaysHit?: boolean;
	baseMoveType?: string;
	basePowerModifier?: number;
	boosts?: Partial<BoostsTable> | false;
	breaksProtect?: boolean;
	contestType?: string;
	critModifier?: number;
	critRatio?: number;
	damage?: number | 'level' | false | null;
	defensiveCategory?: MoveCategory;
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
	selfBoost?: { boosts?: Partial<BoostsTable> };
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
	zMoveBoost?: Partial<BoostsTable>;
	gmaxPower?: number;
	baseMove?: string;
	isZPowered?: boolean;
	maxPowered?: boolean;
}
export interface ModdedMoveData extends Partial<MoveData>, ModdedEffectData { }
export interface Move extends Readonly<BasicEffect & MoveData> {
	readonly effectType: 'Move';
}

export interface TemplateAbility {
	0: string;
	1?: string;
	H?: string;
	S?: string;
}

export interface TemplateData {
	abilities: TemplateAbility;
	baseStats: StatsTable;
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
	evoType?: EvoType;
	forme?: string;
	gender?: GenderName;
	genderRatio?: { [k: string]: number };
	maxHP?: number;
	otherForms?: string[];
	otherFormes?: string[];
	prevo?: string;
	inheritsFrom?: string;
}
export interface ModdedTemplateData extends Partial<TemplateData> {
	inherit?: true;
}
export interface TemplateFormatsData {
	battleOnly?: boolean;
	comboMoves?: readonly string[];
	doublesTier?: string;
	encounters?: EventInfo[];
	eventOnly?: boolean;
	eventPokemon?: EventInfo[];
	gen?: number;
	isGigantamax?: string;
	isNonstandard?: Nonstandard | null;
	isUnreleased?: boolean | 'Past';
	maleOnlyHidden?: boolean;
	tier?: string;
	unreleasedHidden?: boolean | 'Past';
}
export interface ModdedTemplateFormatsData extends Partial<TemplateFormatsData> {
	inherit?: true;
}

export interface Template extends Readonly<BasicEffect & TemplateData & TemplateFormatsData> { }

export interface GameTimerSettings {
	dcTimer: boolean;
	dcTimerBank: boolean;
	starting: number;
	grace: number;
	addPerTurn: number;
	maxPerTurn: number;
	maxFirstTurn: number;
	timeoutAutoChoose: boolean;
	accelerate: boolean;
}

export interface FormatsData extends EventMethods {
	name: string;
	banlist?: string[];
	battle?: ModdedBattleScriptsData;
	pokemon?: ModdedBattlePokemon;
	cannotMega?: string[];
	debug?: boolean;
	defaultLevel?: number;
	desc?: string;
	effectType?: string;
	forcedLevel?: number;
	gameType?: GameType;
	maxForcedLevel?: number;
	maxLevel?: number;
	mod?: string;
	onBasePowerPriority?: number;
	onModifyMovePriority?: number;
	onModifyTypePriority?: number;
	onSwitchInPriority?: number;
	rated?: boolean;
	minSourceGen?: number;
	restricted?: string[];
	ruleset?: string[];
	team?: string;
	teamLength?: { validate?: [number, number], battle?: number };
	threads?: string[];
	timer?: Partial<GameTimerSettings>;
	unbanlist?: string[];
}

export interface ModdedFormatsData extends Partial<FormatsData> {
	inherit?: boolean;
}

export interface Format extends Readonly<BasicEffect & FormatsData & {
	effectType: 'Format' | 'Ruleset' | 'Rule' | 'ValidatorRule';
	baseRuleset: string[];
	banlist: string[];
	customRules: string[] | null;
	defaultLevel: number;
	maxLevel: number;
	noLog: boolean;
	ruleset: string[];
	unbanlist: string[];
}> { }

export type ZMoveOptions = ({ move: string, target: MoveTarget } | null)[];
export interface DynamaxOptions {
	maxMoves: ({ move: string, target: MoveTarget, disabled?: boolean })[];
	gigantamax?: string;
}

export interface BattleScriptsData {
	gen: number;
	zMoveTable?: { [k: string]: string };
	maxMoveTable?: { [k: string]: string };
}
export interface ModdedBattleSide {
	lastMove?: Move | null;
}
export interface ModdedBattlePokemon {
	inherit?: boolean;
}
export interface ModdedBattleScriptsData extends Partial<BattleScriptsData> {
	inherit?: string;
	lastDamage?: number;
	pokemon?: ModdedBattlePokemon;
	side?: ModdedBattleSide;
}

export interface TypeData {
	damageTaken: { [attackingTypeNameOrEffectid: string]: number };
	HPdvs?: Partial<StatsTable>;
	HPivs?: Partial<StatsTable>;
}
export interface ModdedTypeData extends Partial<TypeData> {
	inherit?: boolean;
}
export interface TypeInfo extends Readonly<TypeData & {
	effectType: 'Type' | 'EffectType';
	exists: boolean;
	gen: number;
	HPdvs: Partial<StatsTable>;
	HPivs: Partial<StatsTable>;
	id: ID;
	name: string;
}> { }

export type PRNGSeed = [number, number, number, number];

export interface PlayerOptions {
	name?: string;
	avatar?: string;
	rating?: number;
	team?: PokemonSet[] | string | null;
	seed?: PRNGSeed;
}