import {
  As,
  FieldCondition,
  GameType,
  GenderName,
  GenerationNum,
  HPColor,
  ID,
  MoveTarget,
  Player,
  SideCondition,
  StatName,
  StatsTable,
  StatusName,
  Weather,
} from '@pkmn/types';

export {ID} from '@pkmn/types';

export namespace Protocol {
  export type PositionLetter = 'a' | 'b' | 'c';

  export type PokemonIdent = string & As<'PokemonIdent'>;
  export type PokemonDetails = string & As<'PokemonDetails'>;
  export type PokemonHealth = string & As<'PokemonHealth'>;
  export type PokemonCondition= string & As<'PokemonCondition'>;

  export type Username = string & As<'Username'>;
  export type Avatar = string & As<'Avatar'>;

  export type Effect = string & As<'Effect'>;
  export type Species = string & As<'Species'>;
  export type Ability = string & As<'Ability'>;
  export type Item = string & As<'Item'>;
  export type Move = string & As<'Move'>;

  export type Message = string & As<'Message'>;
  export type Timestamp = string & As<'Timestamp'>;

  export type HTML = string & As<'HTML'>;
  export type UHTMLName = string & As<'UHTMLName'>;
  export type JSON = string & As<'JSON'>;

  export type RoomType = string & As<'RoomType'>;
  export type RoomID = string & As<'RoomID'>;
  export type RoomTitle = string & As<'RoomTitle'>;
  export type UserList = string & As<'UserList'>;

  export type Num = string & As<'Num'>;
  export type FormatsList = string & As<'FormatsList'>;
  export type Generator = string & As<'Generator'>;
  export type Score = string & As<'Score'>;
  export type FormatName = string & As<'FormatName'>;
  export type Rule = string & As<'Rule'>;
  export type StatNames = string & As<'StatNames'>;
  export type Side = string & As<'Side'>;
  export type Seed = string & As<'Seed'>;
  export type Slots = string & As<'Slots'>;
  export type Types = string & As<'Types'>;

  export type Reason = StatusName | 'partiallytrapped' | 'flinch' | 'nopp' | 'recharge';

  export type QueryType =
    'userdetails' | 'roomlist' | 'rooms' | 'laddertop' | 'roominfo' | 'savereplay';

  export type ChallengesJSON = string & As<'ChallengesJSON'>;
  export type SearchStateJSON = string & As<'SearchStateJSON'>;
  export type RequestJSON = string & As<'RequestJSON'>;

  export interface Challenges {
    searching: ID[];
    games: { [roomid in RoomID]: RoomTitle};
  }

  export interface SearchState {
    challengesFrom: { [userid in ID]: ID };
    challengeTo: null | { o: Username; format: ID };
  }

  export interface Request {
    rqid: number;
    active: ActivePokemon[];
    side: {
      name: Username;
      id: Player;
      pokemon: Pokemon[];
    };
    forceSwitch?: [true] & boolean[];
    wait?: boolean;
  }

  export interface ActivePokemon {
    trapped?: boolean;
    maybeDisabled?: boolean;
    maybeTrapped?: boolean;
    canMegaEvo?: boolean;
    canUltraBoost?: boolean;
    canZMove?: null | Array<{
      move: Move;
      target: MoveTarget;
    }>;
    canDynamax?: boolean;
    maxMoves?: {
      maxMoves: Array<{
        move: ID;
        target: MoveTarget;
        disabled?: boolean;
      }>;
      gigantamax?: Species;
    };
    moves: Array<{
      move: Move;
      id: ID;
      pp: number;
      maxpp: number;
      target: MoveTarget;
      disabled: string | boolean;
    }>;
  }

  export interface Pokemon {
    active?: boolean;
    details: PokemonDetails;
    ident: PokemonIdent;
    pokeball: ID;
    ability: ID;
    baseAbility: ID;
    condition: PokemonCondition;
    item: ID;
    moves: ID[];
    stats: Omit<StatsTable, 'hp'>;
  }

  export interface RoomInitArgs {
    'init': ['init', RoomType];
    'title': ['title', RoomTitle];
    'userlist': ['userlist', UserList];
  }

  export type RoomInitArgName = keyof RoomInitArgs;
  export type RoomInitArgType = RoomInitArgs[RoomInitArgName];

  export interface RoomMessageArgs {
    '': ['', Message];
    'html': ['html', HTML];
    'uhtml': ['uhtml', UHTMLName, HTML];
    'uhtmlchange': ['uhtmlchange', UHTMLName, HTML];
    'join': ['join', Username, boolean]; // join, j, J
    'leave': ['leave', Username, boolean]; // leave, l, J
    'name': ['name', Username, ID, boolean]; // name, n
    'chat': ['chat', Username, Message]; // chat, c
    ':': [':', Timestamp];
    'c:': ['c:', Timestamp, Username, Message];
    'battle': ['battle', RoomID, Username, Username]; // battle, b
  }

  export type RoomMessageArgName = keyof RoomMessageArgs;
  export type RoomMessageArgType = RoomMessageArgs[RoomMessageArgName];

  export type RoomArgs = RoomInitArgs & RoomMessageArgs;
  export type RoomArgName = RoomInitArgName | RoomMessageArgName;
  export type RoomArgsType = RoomArgs[RoomArgName];

  export interface GlobalArgs {
    'popup': ['popup', Message];
    'pm': ['pm', Username, Username, Message];
    'usercount': ['usercount', Num];
    'nametaken': ['nametaken', Username, Message];
    'challstr': ['challstr', '4', string];
    'updateuser': ['updateuser', Username, '1' | '0', Avatar, JSON];
    'formats': ['formats', FormatsList];
    'updatesearch': ['updatesearch', SearchStateJSON];
    'updatechallenges': ['updatechallenges', ChallengesJSON];
    'queryresponse': ['queryresponse', QueryType, JSON];
  }

  export type GlobalArgName = keyof GlobalArgs;
  export type GlobalArgType = GlobalArgs[GlobalArgName];

  export interface MiscArgs {
    'unlink': ['unlink', Username] | ['unlink', 'hide', Username];
    'raw': ['raw', HTML];
    'warning': ['warning', Message];
    'error': ['error', Message];
    'bigerror': ['bigerror', Message];
    'chatmsg': ['chatmsg', Message];
    'chatmsg-raw': ['chatmsg-raw', HTML];
    'controlshtml': ['controlshtml', HTML];
    'fieldhtml': ['fieldhtml', HTML];
    'debug': ['debug', Message];
  }

  export interface TournamentArgs {
    'tournament|create': ['tournament', 'create', Generator, '0' | Num];
    'tournament|update': ['tournament', 'update', JSON];
    'tournament|updateEnd': ['tournament', 'updateEnd'];
    'tournament|error': ['tournament', 'error', Message];
    'tournament|forceend': ['tournament', 'forceend'];
    'tournament|join': ['tournament', 'join', Username];
    'tournament|leave': ['tournament', 'leave', Username];
    'tournament|replace': ['tournament', 'replace', Username, Username];
    'tournament|start': ['tournament', 'start', Num];
    'tournament|disqualify': ['tournament', 'disqualify', Username];
    'tournament|battlestart': ['tournament', 'battlestart', Username, Username, RoomID];
    'tournament|battleend':
    | ['tournament', 'battleend', Username, Username, 'win' | 'loss' | 'draw', Score, 'success']
    | ['tournament', 'battleend', Username, Username, 'draw', Score, 'fail'];
    'tournament|end': ['tournament', 'end', JSON];
    'tournament|autostart':
    | ['tournament', 'autostart', 'on', Num]
    | ['tournament', 'autostart', 'off'];
    'tournament|autodq':
    | ['tournament', 'autodq', 'on', Num]
    | ['tournament', 'autodq', 'off']
    | ['tournament', 'autodq', 'target', Num];
  }

  export type TournamentArgName = keyof TournamentArgs;
  export type TournamentArgType = TournamentArgs[TournamentArgName];

  export type MiscArgName = keyof MiscArgs;
  export type MiscArgType = MiscArgs[MiscArgName];

  export interface BattleInitArgs {
    'player': ['player', Player, Username, Avatar, Num?] | ['player', Player];
    'teamsize': ['teamsize', Player, Num];
    'gametype': ['gametype', GameType];
    'gen': ['gen', GenerationNum];
    'tier': ['tier', FormatName];
    'rated': ['rated'] | ['rated', Message];
    'seed': ['seed', Seed];
    'teampreview': ['teampreview'];
    'rule': ['rule', Rule];
    'clearpoke': ['clearpoke'];
    'poke': ['player', Player, PokemonIdent, 'item' | ''];
    'start': ['start'];
  }

  export type BattleInitArgName = keyof BattleInitArgs;
  export type BattleInitArgType = BattleInitArgs[BattleInitArgName];

  export interface BattleProgressArgs {
    'done': ['done']; // '|'
    'request': ['request', RequestJSON];
    'inactive': ['inactive', Message];
    'inactiveoff': ['inactiveoff', Message];
    'upkeep': ['upkeep'];
    'turn': ['turn', Num];
    'win': ['win', Username];
    'tie': ['tie'];
  }

  export type BattleProgressArgName = keyof BattleProgressArgs;
  export type BattleProgressArgType = BattleProgressArgs[BattleProgressArgName];

  export interface BattleMajorArgs {
    'move': ['move', PokemonIdent, Move, PokemonIdent] | ['move', PokemonIdent, Move];
    'switch': ['switch', PokemonIdent, PokemonDetails, PokemonHealth];
    'drag': ['drag', PokemonIdent, PokemonDetails, PokemonHealth];
    'detailschange': ['detailschange', PokemonIdent, PokemonDetails, PokemonHealth];
    'replace': ['replace', PokemonIdent, PokemonDetails, PokemonHealth];
    'swap': ['swap', PokemonIdent, Num];
    'cant': ['cant', PokemonIdent, Reason | Ability | Effect | Move, Effect | Move];
    'faint': ['faint', PokemonIdent];
    'switchout': ['switchout', PokemonIdent];
    'message': ['message', Message];
  }

  export type BattleMajorArgName = keyof BattleMajorArgs;
  export type BattleMajorArgType = BattleMajorArgs[BattleMajorArgName];

  export interface BattleMinorArgs {
    '-formechange': ['-formechange', PokemonIdent, PokemonDetails, PokemonHealth];
    '-fail': ['-fail', PokemonIdent, Move] | ['-fail', PokemonIdent];
    '-block': ['-block', PokemonIdent, Effect, Move, PokemonIdent?];
    '-notarget': ['-notarget', PokemonIdent] | ['-notarget'];
    '-miss': ['-miss', PokemonIdent, PokemonIdent] | ['-miss', PokemonIdent];
    '-damage': ['-damage', PokemonIdent, PokemonHealth];
    '-heal': ['-heal', PokemonIdent, PokemonHealth];
    '-sethp': ['-sethp', PokemonIdent, Num] | ['-sethp', PokemonIdent, Num, PokemonIdent, Num];
    '-status': ['-status', PokemonIdent, StatusName];
    '-curestatus': ['-curestatus', PokemonIdent, StatusName];
    '-cureteam': ['-cureteam', PokemonIdent];
    '-boost': ['-boost', PokemonIdent, StatName, Num];
    '-unboost': ['-unboost', PokemonIdent, StatName, Num];
    '-setboost': ['-setboost', PokemonIdent, StatName, Num];
    '-swapboost': ['-swapboost', PokemonIdent, PokemonIdent, StatNames];
    '-invertboost': ['-invertboost', PokemonIdent];
    '-clearboost': ['-clearboost', PokemonIdent];
    '-clearallboost': ['-clearallboost'];
    '-clearpositiveboost': ['-clearpositiveboost', PokemonIdent, PokemonIdent, Effect];
    '-clearnegativeboost': ['-clearnegativeboost', PokemonIdent];
    '-copyboost': ['-copyboost', PokemonIdent, PokemonIdent];
    '-weather': ['-weather', Weather | 'none'];
    '-fieldstart': ['-fieldstart', FieldCondition];
    '-fieldend': ['-fieldend', FieldCondition];
    '-sidestart': ['-sidestart', Side, SideCondition];
    '-sideend': ['-sideend', Side, SideCondition];
    '-start': ['-start', PokemonIdent, Effect] | ['-start', PokemonIdent, Effect, Types];
    '-end': ['-end', PokemonIdent, Effect];
    '-crit': ['-crit', PokemonIdent];
    '-supereffective': ['-supereffective', PokemonIdent];
    '-resisted': ['-resisted', PokemonIdent];
    '-immune': ['-immune', PokemonIdent];
    '-item': ['-item', PokemonIdent, Item];
    '-enditem': ['-enditem', PokemonIdent, Item];
    '-ability': ['-ability', PokemonIdent, Ability]
    | ['-ability', PokemonIdent, Ability, Ability, PokemonIdent];
    '-endability': ['-endability', PokemonIdent] | ['-endability', PokemonIdent, Ability];
    '-transform': ['-transform', PokemonIdent, Species];
    '-mega': ['-mega', PokemonIdent, Item];
    '-primal': ['-primal', PokemonIdent];
    '-burst': ['-burst', PokemonIdent, Species, Item];
    '-zpower': ['-zpower', PokemonIdent];
    '-zbroken': ['-zbroken', PokemonIdent];
    '-activate': [
      '-activate',
      PokemonIdent, Ability | Effect,
      (Item | Move | Num | PokemonIdent)?,
      (Ability | Num)?
    ] | ['-activate', PokemonIdent, Effect | PokemonIdent];
    '-fieldactivate': ['-fieldactivate', Effect];
    '-hint': ['-hint', Message];
    '-center': ['-center'];
    '-message': ['-message', Message];
    '-combine': ['-combine'];
    '-waiting': ['-waiting', PokemonIdent, PokemonIdent];
    '-prepare': ['-prepare', PokemonIdent, Move, PokemonIdent];
    '-mustrecharge': ['-mustrecharge', PokemonIdent];
    '-hitcount': ['-hitcount', PokemonIdent, Num];
    '-singlemove': ['-singlemove', PokemonIdent, Move];
    '-singleturn': ['-singleturn', PokemonIdent, Move];
    '-anim': ['-anim', PokemonIdent, Move, PokemonIdent];
    '-ohko': ['-ohko'];
  }

  export type BattleMinorArgName = keyof BattleMinorArgs;
  export type BattleMinorArgType = BattleMinorArgs[BattleMinorArgName];

  export type BattleArgs =
    BattleInitArgs &
    BattleProgressArgs &
    BattleMajorArgs &
    BattleMinorArgs;
  export type BattleArgName =
    | BattleInitArgName
    | BattleProgressArgName
    | BattleMajorArgName
    | BattleMinorArgName;
  export type BattleArgType = BattleArgs[BattleArgName];

  export type BattleArgsKWArgsTypes = {
    'ability': Ability;
    'ability2': Ability;
    'anim': Move;
    'block': Move;
    'broken': true;
    'consumed': true;
    'damage': true;
    'eat': true;
    'fail': true,
    'fatigue': true;
    'forme': true;
    'from': Effect;
    'heavy': true;
    'item': Item;
    'miss': true;
    'move': Move;
    'msg': true;
    'notarget': true;
    'number': Num;
    'of': PokemonIdent;
    'ohko': true;
    'silent': true;
    'spread': Slots;
    'still': true;
    'thaw': true;
    'upkeep': true;
    'weak': true;
    'weaken': true;
    'wisher': true;
    'zeffect': true;
  } & {
    'already': true;
    'anim': 'prepare';
    'identify': true;
    'interrupt': true;
    'partiallytrapped': true;
    'prepare': true;
  };

  export type GeneralKWArgs = 'from' | 'of' | 'still' | 'silent';

  export interface BattleArgsWithKWArgs {
    'cant': GeneralKWArgs;
    'detailschange': GeneralKWArgs | 'msg';
    'move': GeneralKWArgs | 'anim' | 'miss' | 'notarget' | 'prepare' | 'spread' |  'zeffect';
    'switchout': GeneralKWArgs;
    '-activate': GeneralKWArgs | 'ability' | 'ability2' | 'block' | 'broken' | 'damage' | 'item' | 'move' | 'number' | 'consumed';
    '-ability': GeneralKWArgs | 'move' | 'weaken';
    '-block': GeneralKWArgs;
    '-boost': GeneralKWArgs | 'zeffect';
    '-clearnegativeboost': GeneralKWArgs | 'zeffect';
    '-crit': 'spread';
    '-curestatus': GeneralKWArgs| 'thaw' | 'msg';
    '-cureteam': GeneralKWArgs;
    '-damage': GeneralKWArgs | 'partiallytrapped';
    '-end': GeneralKWArgs | 'partiallytrapped' | 'interrupt';
    '-endability': GeneralKWArgs;
    '-enditem': GeneralKWArgs | 'eat' | 'move' |'weaken';
    '-fail': GeneralKWArgs | 'forme' | 'heavy' | 'msg' | 'weak' | 'fail';
    '-fieldend': GeneralKWArgs;
    '-formechange': GeneralKWArgs | 'msg';
    '-heal': GeneralKWArgs | 'wisher' |  'zeffect';
    '-immune': GeneralKWArgs | 'ohko';
    '-invertboost': GeneralKWArgs;
    '-item': GeneralKWArgs | 'identify';
    '-resisted': 'spread';
    '-setboost': GeneralKWArgs;
    '-sethp': GeneralKWArgs;
    '-sideend': GeneralKWArgs;
    '-singleturn': GeneralKWArgs | 'zeffect';
    '-start': GeneralKWArgs | 'already' | 'damage' | 'block' | 'fatigue' | 'upkeep' | 'zeffect';
    '-status': GeneralKWArgs;
    '-supereffective': 'spread';
    '-swapboost': GeneralKWArgs;
    '-transform': GeneralKWArgs | 'msg';
    '-unboost': GeneralKWArgs | 'zeffect';
    '-weather': GeneralKWArgs | 'upkeep';
  }

  export type BattleArgsWithKWArgName = keyof BattleArgsWithKWArgs;
  export type BattleArgsWithKWArgType = BattleArgsWithKWArgs[BattleArgsWithKWArgName];

  export type BattleArgKWArgs<T extends BattleArgName> =
    T extends BattleArgsWithKWArgName
      ? { [K in BattleArgsWithKWArgs[T]]?: BattleArgsKWArgsTypes[K] }
      : {};

  export type BattleArgsKWArgs = { [T in BattleArgName]: BattleArgKWArgs<T> };
  export type BattleArgsKWArgName = BattleArgName;
  export type BattleArgsKWArgType = BattleArgsKWArgs[Protocol.BattleArgsWithKWArgName];

  export type Args =
    RoomArgs &
    GlobalArgs &
    TournamentArgs &
    MiscArgs &
    BattleArgs;
  export type ArgName =
    | RoomArgName
    | GlobalArgName
    | TournamentArgName
    | MiscArgName
    | BattleArgName;

  export type ArgType = Args[ArgName];

  export type KWArgs = BattleArgsKWArgs;
  export type KWArgType = BattleArgsKWArgType;

  export type ArgsWithKWArgName = BattleArgsWithKWArgName;
  export type ArgsWithKWArgType = BattleArgsKWArgType;

  export type Handler<T = void | Promise<void>> = {
    [key in Exclude<ArgName, ArgsWithKWArgName>]?: (m: Args[key]) => T;
  } & {
    [key in ArgsWithKWArgName]?: (a: Args[key], k: KWArgs[key]) => T;
  };
}

export type PositionLetter = Protocol.PositionLetter;

export type PokemonIdent = Protocol.PokemonIdent;
// NOTE: PokemonDetails alias is defined as the parsed type
export type PokemonCondition = Protocol.PokemonCondition;
// NOTE: PokemonHealth alias is defined as the parsed type

export type Username = Protocol.Username;
export type Avatar = Protocol.Avatar;

export type Effect = Protocol.Effect;
export type Species = Protocol.Species;
export type Ability = Protocol.Ability;
export type Item = Protocol.Item;
export type Move = Protocol.Move;

export type Message = Protocol.Message;
export type Timestamp = Protocol.Timestamp;

export type HTML = Protocol.HTML;
export type UHTMLName = Protocol.UHTMLName;
export type JSON = Protocol.JSON;

export type RoomType = Protocol.RoomType;
export type RoomID = Protocol.RoomID;
export type RoomTitle = Protocol.RoomTitle;
export type UserList = Protocol.UserList;

export type Num = Protocol.Num;
export type FormatsList = Protocol.FormatsList;
export type Generator = Protocol.Generator;
export type Score = Protocol.Score;
export type FormatName = Protocol.FormatName;
export type Rule = Protocol.Rule;
export type StatNames = Protocol.StatNames;
export type Side = Protocol.Side;
export type Seed = Protocol.Seed;
export type Slots = Protocol.Slots;

export type Reason = Protocol.Reason;
export type QueryType = Protocol.QueryType;

export type ChallengesJSON = Protocol.ChallengesJSON;
export type SearchStateJSON = Protocol.SearchStateJSON;
export type RequestJSON = Protocol.RequestJSON;

export type Challenges = Protocol.Challenges;
export type SearchState = Protocol.SearchState;

export type Request = Protocol.Request;
export type ActivePokemon = Protocol.ActivePokemon;
export type Pokemon = Protocol.Pokemon;

export type RoomInitArgs = Protocol.RoomInitArgs;
export type RoomInitArgName = Protocol.RoomInitArgName;
export type RoomInitArgType = Protocol.RoomInitArgType;

export type RoomMessageArgs = Protocol.RoomMessageArgs;
export type RoomMessageArgName = Protocol.RoomMessageArgName;
export type RoomMessageArgType = Protocol.RoomMessageArgType;

export type RoomArgs = Protocol.RoomArgs;
export type RoomArgName = Protocol.RoomArgName;
export type RoomArgsType = Protocol.RoomArgsType;

export type GlobalArgs = Protocol.GlobalArgs;
export type GlobalArgName = Protocol.GlobalArgName;
export type GlobalArgType = Protocol.GlobalArgType;

export type MiscArgs = Protocol.MiscArgs;
export type MiscArgName = Protocol.MiscArgName;
export type MiscArgType = Protocol.MiscArgType;

export type TournamentArgs = Protocol.TournamentArgs;
export type TournamentArgName = Protocol.TournamentArgName;
export type TournamentArgType = Protocol.TournamentArgType;

export type BattleInitArgs = Protocol.BattleInitArgs;
export type BattleInitArgName = Protocol.BattleInitArgName;
export type BattleInitArgType = Protocol.BattleInitArgType;

export type BattleProgressArgs = Protocol.BattleProgressArgs;
export type BattleProgressArgName = Protocol.BattleProgressArgName;
export type BattleProgressArgType = Protocol.BattleProgressArgType;

export type BattleMajorArgs = Protocol.BattleMajorArgs;
export type BattleMajorArgName = Protocol.BattleMajorArgName;
export type BattleMajorArgType = Protocol.BattleMajorArgType;

export type BattleMinorArgs = Protocol.BattleMinorArgs;
export type BattleMinorArgName = Protocol.BattleMinorArgName;
export type BattleMinorArgType = Protocol.BattleMinorArgType;

export type BattleArgs = Protocol.BattleArgs;
export type BattleArgName = Protocol.BattleArgName;
export type BattleArgType = Protocol.BattleArgType;

export type BattleArgsKWArgsTypes = Protocol.BattleArgsKWArgsTypes;
export type BattleArgsWithKWArgs = Protocol.BattleArgsWithKWArgs;

export type BattleArgsWithKWArgName = Protocol.BattleArgsWithKWArgName;
export type BattleArgsWithKWArgType = Protocol.BattleArgsWithKWArgType;

export type BattleArgKWArgs<T extends BattleArgName> = Protocol.BattleArgKWArgs<T>;

export type BattleArgsKWArgs = Protocol.BattleArgsKWArgs;
export type BattleArgsKWArgName = Protocol.BattleArgsKWArgName;
export type BattleArgsKWArgType = Protocol.BattleArgsKWArgType;

export type Args = Protocol.Args;
export type ArgName = Protocol.ArgName;
export type ArgType = Protocol.ArgType;

export type KWArgs = Protocol.KWArgs;
export type KWArgType = Protocol.KWArgType;
export type ArgsWithKWArgName = Protocol.ArgsWithKWArgName;
export type ArgsWithKWArgType = Protocol.ArgsWithKWArgType;

export type Handler<T> = Protocol.Handler<T>;

export interface PokemonHealth {
  hp: number;
  maxhp: number;
  hpcolor: HPColor | '';
  status: StatusName | 'tox' | '' | '???';
  fainted?: boolean;
}

export interface PokemonDetails {
  details: Protocol.PokemonDetails;
  name: string;
  species: string;
  level: number;
  shiny: boolean;
  gender: GenderName | '';
  ident: string;
  searchid: string;
}

function toID(s: string): ID {
  return ('' + s).toLowerCase().replace(/[^a-z0-9]+/g, '') as ID;
}

export const Protocol = new class {
  // NOTE: An object is used here to get TypeScript to perform exhaustiveness checking
  /* eslint-disable key-spacing */
  ARGS: {[k in Protocol.ArgName]: 1} = {
    'init':1, 'title':1, 'userlist':1, '':1, 'html':1, 'uhtml':1, 'uhtmlchange':1, 'join':1,
    'leave':1, 'name':1, 'chat':1, ':':1, 'c:':1, 'battle':1, 'popup':1, 'pm':1, 'usercount':1,
    'nametaken':1, 'challstr':1, 'updateuser':1, 'formats':1, 'updatesearch':1, 'switchout':1,
    'updatechallenges':1, 'queryresponse':1, 'unlink':1, 'raw':1, 'warning':1, 'error':1,
    'bigerror':1, 'chatmsg':1, 'chatmsg-raw':1, 'controlshtml':1, 'fieldhtml':1, 'debug':1,
    'tournament|create':1, 'tournament|update':1, 'tournament|updateEnd':1, 'tournament|error':1,
    'tournament|forceend':1, 'tournament|join':1, 'tournament|leave':1, 'tournament|replace':1,
    'tournament|start':1, 'tournament|disqualify':1, 'tournament|battlestart':1,
    'tournament|battleend':1, 'tournament|end':1, 'tournament|autostart':1, 'tournament|autodq':1,
    'player':1, 'teamsize':1, 'gametype':1, 'gen':1, 'tier':1, 'rated':1, 'seed':1, 'rule':1,
    'teampreview':1, 'clearpoke':1, 'poke':1, 'start':1, 'done':1, 'request':1, 'inactive':1,
    'inactiveoff':1, 'upkeep':1, 'turn':1, 'win':1, 'tie':1, 'move':1, 'switch':1, 'drag':1,
    'detailschange':1, 'replace':1, 'swap':1, 'cant':1, 'faint':1, '-formechange':1, '-fail':1,
    '-block':1, '-notarget':1, '-miss':1, '-damage':1, '-heal':1, '-sethp':1, '-status':1,
    '-curestatus':1, '-cureteam':1, '-boost':1, '-unboost':1, '-setboost':1, '-swapboost':1,
    '-invertboost':1, '-clearboost':1, '-clearallboost':1, '-clearpositiveboost':1, '-ohko':1,
    '-clearnegativeboost':1, '-copyboost':1, '-weather':1, '-fieldstart':1, '-fieldend':1,
    '-sidestart':1, '-sideend':1, '-start':1, '-end':1, '-crit':1, '-supereffective':1,
    '-resisted':1, '-immune':1, '-item':1, '-enditem':1, '-ability':1, '-endability':1,
    '-transform':1, '-mega':1, '-primal':1, '-burst':1, '-zpower':1, '-zbroken':1, '-activate':1,
    '-fieldactivate':1, '-hint':1, '-center':1, '-message':1, '-combine':1, '-waiting':1,
    '-prepare':1, '-mustrecharge':1, '-hitcount':1, '-singlemove':1, '-singleturn':1, '-anim':1,
    'message':1,
  };
  ARGS_WITH_KWARGS: {[k in Protocol.ArgsWithKWArgName]: 1} = {
    'move':1, 'detailschange':1,  'cant':1, '-formechange':1, '-fail':1, '-block':1, '-damage':1,
    '-heal':1, '-sethp':1, '-status':1, '-curestatus':1, '-cureteam':1, '-boost':1, '-unboost':1,
    '-setboost':1, '-swapboost':1, '-invertboost':1, '-clearnegativeboost':1, '-weather':1,
    '-fieldend':1, '-sideend':1, '-start':1, '-end':1, '-crit':1, '-supereffective':1,
    '-resisted':1, '-immune':1, '-item':1, '-enditem':1, '-ability':1, '-endability':1,
    '-transform':1,  '-activate':1, '-singleturn':1, 'switchout':1,
  };
  /* eslint-enable key-spacing */

  *handle(data: string) {
    const lines = data.split('\n');
    let roomid = '' as Protocol.RoomID;
    for (const [i, line] of lines.entries()) {
      if (i === 0 && line[0] === '>') {
        roomid = line.slice(1) as Protocol.RoomID;
        continue;
      } else if (line) {
        yield [roomid, this.parseBattleLine(line)] as [Protocol.RoomID, {
          args: Protocol.BattleArgType;
          kwArgs: Protocol.BattleArgsKWArgType;
        }];
      }
    }
  }

  parseLine(line: string, noDefault?: boolean): Protocol.ArgType | null {
    if (!line.startsWith('|')) return ['', line] as Protocol.RoomMessageArgs[''];
    if (line === '|') return ['done'];
    const index = line.indexOf('|', 1);
    const cmd = line.slice(1, index);
    switch (cmd) {
    case 'chatmsg': case 'chatmsg-raw': case 'raw': case 'error': case 'html':
    case 'inactive': case 'inactiveoff': case 'warning':
    case 'fieldhtml': case 'controlshtml': case 'bigerror':
    case 'debug': case 'tier': case 'challstr': case 'popup': case '':
      return upgradeArgs([cmd, line.slice(index + 1)]);
    case 'c': case 'chat': case 'uhtml': case 'uhtmlchange':
      // three parts
      const index2a = line.indexOf('|', index + 1);
      return upgradeArgs([cmd, line.slice(index + 1, index2a), line.slice(index2a + 1)]);
    case 'c:': case 'pm':
      // four parts
      const index2b = line.indexOf('|', index + 1);
      const index3b = line.indexOf('|', index2b + 1);
      return upgradeArgs([
        cmd,
        line.slice(index + 1, index2b),
        line.slice(index2b + 1, index3b),
        line.slice(index3b + 1),
      ]);
    }
    if (noDefault) return null;
    return upgradeArgs(line.slice(1).split('|') as [string, ...string[]]);
  }

  parseBattleLine(line: string) {
    let args = Protocol.parseLine(line, true) as [string, ...string[]];
    if (args) return {args: args as Protocol.ArgType, kwArgs: {}};

    args = line.slice(1).split('|') as [string, ...string[]];
    const kwArgs: { [kw: string]: string | true } = {};
    while (args.length > 1) {
      const lastArg = args[args.length - 1];
      if (lastArg.charAt(0) !== '[') break;
      const bracketPos = lastArg.indexOf(']');
      if (bracketPos <= 0) break;
      // default to '.' so it evaluates to boolean true
      kwArgs[lastArg.slice(1, bracketPos)] = lastArg.slice(bracketPos + 1).trim() || true;
      args.pop();
    }

    return upgradeBattleArgs({
      args: args as Protocol.BattleArgType, kwArgs,
    }) as {
      args: Protocol.BattleArgType;
      kwArgs: Protocol.BattleArgsKWArgType;
    };
  }

  parsePokemonIdent(pokemon: Protocol.PokemonIdent) {
    const index = pokemon.indexOf(':');
    const position = pokemon.slice(0, index);
    const name = pokemon.slice(index + 1);

    let player: Player;
    let letter: Protocol.PositionLetter | null;
    if (position.length < 3) {
      player = position as Player;
      letter = null;
    } else {
      player = position.slice(0, 2) as Player;
      letter = position.charAt(2) as Protocol.PositionLetter;
    }

    return {player, position: letter, name};
  }

  // TODO: make sense of this signature!
  parseDetails(
    name: string,
    ident: Protocol.PokemonIdent,
    details = '' as Protocol.PokemonDetails,
    output = {} as PokemonDetails
  ) {
    output.details = details;

    output.name = name;
    output.species = name;
    output.level = 100;
    output.shiny = false;
    output.gender = '';
    output.ident = name ? ident : '';
    output.searchid = name ? `${ident}|${details}` : '';

    const splitDetails = details.split(', ');
    if (splitDetails[splitDetails.length - 1] === 'shiny') {
      output.shiny = true;
      splitDetails.pop();
    }
    const gender = splitDetails[splitDetails.length - 1];
    if (gender === 'M' || gender === 'F') {
      output.gender = gender as GenderName;
      splitDetails.pop();
    }
    if (splitDetails[1]) output.level = parseInt(splitDetails[1].substr(1)) || 100;
    if (splitDetails[0]) output.species = splitDetails[0];
    return output;
  }

  parseHealth(hpstring: Protocol.PokemonHealth, output = {} as PokemonHealth) {
    const [hp, status] = hpstring.split(' ');

    // parse hp
    output.hpcolor = '';
    if (hp === '0' || hp === '0.0') {
      if (!output.maxhp) output.maxhp = 100;
      output.hp = 0;
    } else if (hp.indexOf('/') > 0) {
      const [curhp, maxhp] = hp.split('/');
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
      output.hp = (output.maxhp * parseFloat(hp)) / 100;
    }

    // parse status
    if (!status) {
      output.status = '';
    } else if (
      status === 'par' ||
      status === 'brn' ||
      status === 'slp' ||
      status === 'frz' ||
      status === 'tox'
    ) {
      output.status = status;
    } else if (status === 'psn' && output.status !== 'tox') {
      output.status = status;
    } else if (status === 'fnt') {
      output.hp = 0;
      output.fainted = true;
    }
    return output;
  }

  parseEffect(
    effect?: string, fn = (s: string) => s.trim()
  ): { name: string; type?: 'move' | 'item' | 'ability' } {
    if (!effect) return {name: fn('')};
    if (effect.startsWith('item:') || effect.startsWith('move:')) {
      return {name: fn(effect.slice(5)), type: effect.slice(0, 4) as 'move' | 'item'};
    } else if (effect.startsWith('ability:')) {
      return {name: fn(effect.slice(8)), type: 'ability'};
    }
    return {name: fn(effect)};
  }

  // parseCondition(condition: Protocol.PokemonCondition) {
  //   return null; // TODO
  // }

  parseRequest(json: Protocol.RequestJSON) {
    return JSON.parse(json) as Protocol.Request;
  }

  parseChallenges(json: Protocol.ChallengesJSON) {
    return JSON.parse(json) as Protocol.Challenges;
  }

  parseSearchState(json: Protocol.SearchStateJSON) {
    return JSON.parse(json) as Protocol.SearchState;
  }

  parseNameParts(text: string) {
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
};

function upgradeArgs<T extends Protocol.ArgType>(args: [string, ...string[]]): T {
  switch (args[0]) {
  case 'name': case 'n': case 'N': {
    const [cmd, user, oldid] = args;
    return ['name', user, oldid, cmd === 'N'] as T;
  }
  case 'chat': case 'c': {
    const [, user, message] = args;
    return ['chat', user, message] as T;
  }
  case 'join': case 'j': case 'J': {
    const [cmd, user] = args;
    return ['join', user, cmd === 'J'] as T;
  }
  case 'leave': case 'l': case 'L': {
    const [cmd, user] = args;
    return ['leave', user, cmd === 'L'] as T;
  }
  case 'battle': case 'b': {
    const [, roomid, user1, user2] = args;
    return ['battle', roomid, user1, user2] as T;
  }
  }
  return args as T;
}

const BLOCKABLE = new Set([
  'ingrain', 'quickguard', 'wideguard', 'craftyshield', 'matblock',
  'protect', 'mist', 'safeguard', 'electricterrain', 'mistyterrain',
  'psychicterrain', 'telepathy', 'stickyhold', 'suctioncups', 'aromaveil',
  'flowerveil', 'sweetveil', 'disguise', 'safetygoggles', 'protectivepads',
]);
const STARTABLE = new Set([
  'wrap', 'clamp', 'whirlpool', 'firespin', 'magmastorm',
  'sandtomb', 'infestation', 'charge', 'trapped', 'bind',
]);
const NUMBERABLE = new Set(['spite', 'grudge', 'forewarn', 'sketch', 'leppaberry', 'mysteryberry']);

function upgradeBattleArgs(
  {args, kwArgs}: { args: Protocol.BattleArgType; kwArgs: { [kw: string]: string | true } }
): { args: Protocol.BattleArgType; kwArgs: Protocol.BattleArgsKWArgType } {
  switch (args[0]) {
  case '-activate': {
    if (kwArgs.item || kwArgs.move || kwArgs.number || kwArgs.ability) return {args, kwArgs};
    const [, pokemon, e, arg3, arg4] = args;
    const effect = e as Protocol.Effect;

    const target = kwArgs.of as Protocol.PokemonIdent | undefined;
    const id = Protocol.parseEffect(effect, toID).name;

    if (kwArgs.block) return {args: ['-fail', pokemon], kwArgs};
    if (id === 'wonderguard') {
      return {
        args: ['-immune', pokemon],
        kwArgs: {from: 'ability:Wonder Guard'} as Protocol.BattleArgsKWArgType,
      };
    }
    if (BLOCKABLE.has(id)) {
      if (target) {
        kwArgs.of = pokemon;
        return {args: ['-block', target, effect, arg3 as Protocol.Move], kwArgs};
      }
      return {args: ['-block', pokemon, effect, arg3 as Protocol.Move], kwArgs};
    }

    if (STARTABLE.has(id)) {
      return {
        args: ['-start', pokemon, effect],
        kwArgs: {of: target as Protocol.PokemonIdent} as Protocol.BattleArgsKWArgType,
      };
    }
    if (id === 'fairylock') return {args: ['-fieldactivate', effect], kwArgs: {}};

    if (id === 'symbiosis') {
      kwArgs.item = arg3!;
    } else if (id === 'magnitude') {
      kwArgs.number = arg3!;
    } else if (id === 'skillswap' || id === 'mummy' || id === 'wanderingspirit') {
      kwArgs.ability = arg3!;
      kwArgs.ability2 = arg4!;
    } else if (NUMBERABLE.has(id)) {
      kwArgs.move = arg3!;
      kwArgs.number = arg4!;
    }
    return {args: ['-activate', pokemon, effect, (target || '') as Protocol.PokemonIdent], kwArgs};
  }
  case '-start': {
    if (kwArgs.from === 'Protean' || kwArgs.from === 'Color Change') {
      kwArgs.from = 'ability:' + kwArgs.from;
    }
    break;
  }
  case 'move': {
    if (kwArgs.from === 'Magic Bounce') kwArgs.from = 'ability:Magic Bounce';
    break;
  }
  case 'cant': {
    const [, pokemon, effect, move] = args;
    const abilities = ['ability: Queenly Majesty', 'ability: Damp', 'ability: Dazzling'];
    if (abilities.includes(effect as Protocol.Effect)) {
      return {
        args: [
          '-block',
          pokemon,
          effect as Protocol.Effect,
          move as Protocol.Move,
          kwArgs.of as Protocol.PokemonIdent,
        ],
        kwArgs: {},
      };
    }
    break;
  }
  case 'gen': {
    const [, num] = args;
    return {args: ['gen', Number(num) as GenerationNum], kwArgs: {}};
  }
  // @ts-ignore
  case '-nothing':
    // OLD: |-nothing
    // NEW: |-activate||move:Splash
    args = ['-activate', '' as Protocol.PokemonIdent, 'move:Splash' as Protocol.Effect];
  }

  return {args, kwArgs};
}
