// ID gets its own special brand for compatibility reasons
export type ID = (string & As<'ID'>) | (string & { __isID: true }) | '';

export type As<T> = { __brand: T };

export type Weather = string & As<'Weather'>;
export type FieldCondition = string & As<'FieldCondition'>;
export type SideCondition = string & As<'SideCondition'>;

export type GenerationNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type GenderName = 'M' | 'F' | 'N';

export type StatID = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';
export type StatsTable<T = number> = { [stat in StatID]: T };

export type BoostID = Exclude<StatID, 'hp'> | 'accuracy' | 'evasion';
export type BoostsTable<T = number> = { [boost in BoostID]: T };

export type MoveCategory = 'Physical' | 'Special' | 'Status';
export type MoveTarget =
  'adjacentAlly' | 'adjacentAllyOrSelf' | 'adjacentFoe' | 'all' |
  'allAdjacent' | 'allAdjacentFoes' | 'allies' | 'allySide' | 'allyTeam' |
  'any' | 'foeSide' | 'normal' | 'randomNormal' | 'scripted' | 'self';

export type Nonstandard =
  'Past' | 'Future' | 'Unobtainable' | 'CAP' | 'LGPE' | 'Custom' | 'Gigantamax';

export type EvoType =
  'trade' | 'useItem' | 'levelMove' | 'levelExtra' |
  'levelFriendship' | 'levelHold' | 'other';

export type EggGroup =
  'Monster' | 'Water 1' | 'Bug' | 'Flying' | 'Field' | 'Fairy' | 'Grass' | 'Human-Like' |
  'Water 3' | 'Mineral' | 'Amorphous' | 'Water 2' | 'Ditto' | 'Dragon' | 'Undiscovered';

export type SideID = 'p1' | 'p2' | 'p3' | 'p4';
export type Player = SideID;

export type GameType =
  'singles' | 'doubles' | 'triples' | 'multi' | 'freeforall' | 'rotation';

export type HPColor = 'g' | 'y' | 'r';

export type StatusName = 'slp' | 'psn' | 'brn' | 'frz' | 'par' | 'tox';

export type NatureName =
  'Adamant' | 'Bashful' | 'Bold' | 'Brave' | 'Calm' |
  'Careful' | 'Docile' | 'Gentle' | 'Hardy' | 'Hasty' |
  'Impish' | 'Jolly' | 'Lax' | 'Lonely' | 'Mild' |
  'Modest' | 'Naive' | 'Naughty' | 'Quiet' | 'Quirky' |
  'Rash' | 'Relaxed' | 'Sassy' | 'Serious' | 'Timid';

export type TypeName =
  'Normal' | 'Fighting' | 'Flying' | 'Poison' | 'Ground' | 'Rock' | 'Bug' | 'Ghost' | 'Steel' |
  'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' | 'Ice' | 'Dragon' | 'Dark' | 'Fairy' | '???' |
  'Stellar';

export type HPTypeName = Exclude<TypeName, 'Normal' | 'Fairy' | '???' | 'Stellar'>;

export namespace Tier {
  export type Singles =
    'AG' | 'Uber' | '(Uber)' | 'OU' | '(OU)' | 'UUBL' | 'UU' | 'RUBL' | 'RU' |
    'NUBL' | 'NU' | '(NU)' | 'PUBL' | 'PU' | '(PU)' | 'NFE' | 'LC';
  export type Doubles =
    'DUber' | '(DUber)' | 'DOU' | '(DOU)' | 'DBL' | 'DUU' | '(DUU)' | 'NFE' | 'LC';
  export type Other = 'Unreleased' | 'Illegal' | 'CAP' | 'CAP NFE' | 'CAP LC';
}

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
  dynamaxLevel?: number;
  gigantamax?: boolean;
  teraType?: string;
}
