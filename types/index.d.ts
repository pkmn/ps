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

export type SideID = 'p1' | 'p2' | 'p3' | 'p4';
export type Player = SideID;

export type GameType =
	'singles' | 'doubles' | 'triples' | 'multi' | 'free-for-all' | 'rotation';

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
