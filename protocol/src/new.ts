import {
  As,
  BoostID,
  FieldCondition,
  GameType,
  GenderName,
  GenerationNum,
  HPColor,
  ID,
  MoveTarget,
  Player,
  SideCondition,
  SideID,
  StatsTable,
  StatusName,
  TypeName,
  Weather,
} from '@pkmn/types';

export namespace Protocol {
  export type PositionLetter = 'a' | 'b' | 'c';
  /**
   * A Pokémon ID is in the form `POSITION: NAME`.
   *
   *   - `POSITION` is the spot that the Pokémon is in: it consists of the `PLAYER` of the player
   *     (see `|player|`), followed by a position letter (`a` in singles).
   *
   * An inactive Pokémon will not have a position letter.
   *
   * In doubles and triples battles, `a` will refer to the leftmost Pokémon from its trainer's
   * perspective (so the leftmost on your team, and the rightmost on your opponent's team, so
   * `p1a` faces `p2c`, etc).
   *
   * So the layout looks like:
   *
   * Doubles, player 1's perspective:
   *
   *    p2b p2a
   *    p1a p1b
   *
   * Doubles, player 2's perspective:
   *
   *    p1b p1a
   *    p2a p2b
   *
   * In multi and free-for-all battles, players are grouped by parity. That is, `p1` and `p3` share
   * a side, as do `p2` and `p4`. The position letters still follow the same conventions as in
   * double battles, so the layout looks like:
   *
   * Multi, player 1's perspective
   *
   *    p4b p2a
   *    p1a p3b
   *
   *   - `NAME` is the nickname of the Pokémon (or the species name, if no nickname is given).
   *
   * For example: `p1a: Sparky` could be a Charizard named Sparky. `p1: Dragonite` could be an
   * inactive Dragonite being healed by Heal Bell.
   *
   * For most commands, you can just use the position information in the Pokémon ID to identify
   * the Pokémon. Only a few commands actually change the Pokémon in that position (`|switch|`
   * switching, `|replace|` illusion dropping, `|drag|` phazing, and `|detailschange|` permanent
   * forme changes), and these all specify `DETAILS` for you to perform updates with.
   */
  export type PokemonIdent = string & As<'PokemonIdent'>;
  /**
   * A comma-separated list of all information about a Pokemon visible on the battle screen:
   * species, level, gender, shininess. So it starts with `SPECIES`, adding `, L##` if it's not
   * level 100, `, M` if it's male, `, F` if it's female, `, shiny` if it's shiny.
   * In Gen 9, `, tera:TYPE` will be appended if the Pokemon has Terastallized.
   *
   * So, for instance, `Deoxys-Speed` is a level 100 non-shiny genderless Deoxys (Speed forme).
   * `Sawsbuck, L50, F, shiny` is a level 50 shiny female Sawsbuck (Spring form).
   *
   * In Team Preview, `DETAILS` will not include information not available in Team Preview (in
   * particular, level and shininess will be left off), and for Pokémon whose forme isn't revealed
   * in Team Preview, it will be given as `-*`. So, for instance, an Arceus in Team Preview would
   * have the details string `Arceus-*`, no matter what kind of Arceus it is.
   */
  export type PokemonDetails = string & As<'PokemonDetails'>;
  /** `` `${ident}|${details}` ``. Tracked for ease of searching. */
  export type PokemonSearchID = string & As<'PokemonSearchID'>;
  /**
   * The switched Pokémon has HP `HP`, and status `STATUS`. `HP` is specified as a fraction; if it
   * is your own Pokémon then it will be `CURRENT/MAX`, if not, it will be `/100` if HP Percentage
   * Mod is in effect and `/48` otherwise. `STATUS` can be left blank, or it can be `slp`, `par`
   * etc.
   *
   * If `HP` is 0, `STATUS` should be ignored. The current behavior is for `STATUS` to be `fnt`,
   * but this may change and should not be relied upon.
   */
  export type PokemonHPStatus = string & As<'PokemonHPStatus'>;

  /**
   * A user, the first character being their rank (users with no rank are represented by a space),
   * and the rest of the string being their username.
   */
  export type Username = string & As<'Username'>;
  /**
   * The player's avatar identifier (usually a number, but other values can be used for custom
   * avatars).
   */
  export type AvatarIdent = string & As<'AvatarIdent'>;
  export type Side = string & As<'Side'>;

  /**
   * The name of an 'effect' (move, ability, item, status, etc).
   *
   * Effects which are pokemon, moves, abilities or items are prefixed by `pokemon: `, ß`move: `,
   * `ability: ` and `item: ` respectively, whereas all other effects are unprefixed. For example,
   * `move: Spectral Thief` or `confusion`.
   */
  export type EffectName = string & As<'EffectName'> | MoveEffectName;
  /** The name of a move 'effect', prefixed with `move: `. */
  export type MoveEffectName = string & As<'MoveEffectName'>;
  /** The name of a Pokemon species (unprefixed). */
  export type SpeciesName = string & As<'SpeciesName'>;
  /** The name of an ability (unprefixed). */
  export type AbilityName = string & As<'AbilityName'>;
  /** The name of an item (unprefixed). */
  export type ItemName = string & As<'ItemName'>;
  /** The name of a move (unprefixed). */
  export type MoveName = string & As<'MoveName'>;
  /** The name of an animation (unprefixed). */
  export type AnimationName = (string & As<'AnimationName'>) | MoveName;

  /** An arbitrary message to be displayed as is. */
  export type Message = string & As<'Message'>;
  /** A choice string previously received by the server. */
  export type Choice = string & As<'Choice'>;
  /** UNIX timestamp; (the number of seconds since 1970). */
  export type Timestamp = string & As<'Timestamp'>;

  /** The title of a notification, usually displayed as bold. */
  export type NotificationTitle = string & As<'NotificationTitle'>;
  /** Token used to determine whether a notification should highlight a user.  */
  export type HighlightToken = string & As<'HighlightToken'>;
  /** Group name matched by `|tempnotify|` and `|tempnotifyoff|` messages. */
  export type TempNotifyName = string & As<'TempNotifyName'>;

  /** HTML which should be sanitized before display. */
  export type HTML = string & As<'HTML'>;
  /** A name to allow for matching two different `|uhtml|` messages. */
  export type UHTMLName = string & As<'UHTMLName'>;
  /** CSS selector name used in `|selectorhtml|` messages. */
  export type SelectorName = string & As<'SelectorName'>;
  /** A string which should be parsed as JSON. */
  export type JSON = string & As<'JSON'>;

  /** The ID of a Room, may contains non-alphanumerics. */
  export type RoomID = string & As<'RoomID'>;
  /**
   * The title of the room. The title is _not_ guaranteed to resemble  the room ID; for instance,
   * room `battle-gen7uu-779767714` could have title `Alice vs. Bob`.
   */
  export type RoomTitle = string & As<'RoomTitle'>;
  /**
   * `USERLIST` is a comma-separated list of `USER`s, sent from chat rooms when they're joined.
   * Optionally, a `USER` can end in `@` followed by a user status message. A `STATUS` starting
   * in `!` indicates the user is away.
   */
  export type UserList = string & As<'UserList'>;

  /** A number encoded as a string. */
  export type Num = string & As<'Num'>;
  /**
   * A `|`-separated list of `FORMAT`s. `FORMAT` is a format name with one or more of these
   * suffixes: `,#` if the format uses random teams, `,,` if the format is only available for
   * searching, and `,` if the format is only available for challenging.
   *
   * Sections are separated by two vertical bars with the number of the column of that section
   * prefixed by `,` in it. After that follows the name of the section and another vertical bar.
   */
  export type FormatsList = string & As<'FormatsList'>;
  /**
   * Either `Elimination` or `Round Robin` and describes the type of bracket that will be used.
   * `Elimination` includes a prefix that denotes the number of times a player can lose before
   * being eliminated (`Single`, `Double`, etc.). `Round Robin` includes the prefix `Double` if
   * every matchup will battle twice.
   */
  export type Generator = string & As<'Generator'>;
  /**
   * An array of length 2 that denotes the number of Pokemon `USER1` had left and the number of
   * Pokemon `USER2` had left.
   */
  export type Score = string & As<'Score'>;
  /** The name of a metagame format. */
  export type FormatName = string & As<'FormatName'>;
  /** Rules affecting the battle, encoded as `RULE: DESCRIPTION`. */
  export type Rule = string & As<'Rule'>;
  /** Takes the form of a comma-separated list of `BoostID` abbreviations. */
  export type BoostIDs = string & As<'BoostIDs'>;
  export type Seed = string & As<'Seed'>;
  export type Slots = string & As<'Slots'>;
  export type Types = string & As<'Types'>;
  export type Nickname = string & As<'Nickname'>;
  export type StatDisplayName = string & As<'StatDisplayName'>;

  export type Reason = StatusName | 'partiallytrapped' | 'flinch' | 'nopp' | 'recharge';

  export type QueryType =
    'userdetails' | 'roomlist' | 'rooms' | 'laddertop' | 'roominfo' | 'savereplay' | 'debug';

  /** An unparsed JSON string containing `Challenges` information. */
  export type ChallengesJSON = string & As<'ChallengesJSON'>;
  /** An unparsed JSON string containing `SearchState` information. */
  export type SearchStateJSON = string & As<'SearchStateJSON'>;
  /** An unparsed JSON string containing `TournmanetUpdate` information. */
  export type TournamentUpdateJSON = string & As<'TournamentUpdateJSON'>;
  /** An unparsed JSON string containing `TournamentEnded` information. */
  export type TournamentEndedJSON = string & As<'TournamentEndedJSON'>;
  /** An unparsed JSON string containing `Request` information. */
  export type RequestJSON = string & As<'RequestJSON'>;
  /** An unparsed JSON string containing `CustomGroups` information. */
  export type CustomGroupsJSON = string & As<'CustomGroupsJSON'>;

   /**
   * A JSON object representing the current state of who the user is challenging and who is
   * challenging the user. You'll get this whenever challenges update (when you challenge someone,
   * when you receive a challenge, when you or someone you challenged accepts/rejects/cancels a
   * challenge).
   *
   *   - `challengesFrom` will be a `{userid: format}` table of received challenges.
   *   - `challengeTo` will be a challenge if you're challenging someone, or `null` if you haven't.
   *
   * If you are challenging someone, `challengeTo` will be in the format:
   *
   *   `{"to":"player1","format":"gen7randombattle"}`.
   *
   * To challenge someone, send:
   *
   *    /utm TEAM
   *    /challenge USERNAME, FORMAT
   *
   * To cancel a challenge you made to someone, send:
   *
   *    /cancelchallenge USERNAME
   *
   * To reject a challenge you received from someone, send:
   *
   *    /reject USERNAME
   *
   * To accept a challenge you received from someone, send:
   *
   *    /utm TEAM
   *    /accept USERNAME
   *
   * Teams are in packed format. `TEAM` can also be `null`, if the format doesn't require user-built
   * teams, such as Random Battle.
   *
   * Invalid teams will send a `|popup|` with validation errors, and the `/accept` or `/challenge`
   * command won't take effect.
   *
   * If the challenge is accepted, you will receive a room initialization message.
   */
   export interface Challenges {
    challengesFrom: {[userid in ID]: ID};
    challengeTo: null | {o: Username; format: ID};
  }

  /**
   * A JSON object representing the current state of what battles the user is currently searching
   * for. You'll get this whenever searches update (when you search, cancel a search, or you start
   * or end a battle).
   *
   *   - `searching` will be an array of format IDs you're currently searching for games in.
   *   - `games` will be a `{roomid: title}` table of games you're currently in. Note that this
   *     includes ALL games, so `|updatesearch|` will be sent when you start/end challenge battles,
   *     and even non-Pokémon games like Mafia.
   *
   * To search for a battle against a random opponent, send:
   *
   *    /utm TEAM
   *    /search FORMAT
   *
   * Teams are in packed format. `TEAM` can also be `null`, if the format doesn't require
   * user-built teams, such as Random Battle.
   *
   * To cancel searching, send:
   *
   *    /cancelsearch
   */
  export interface SearchState {
    searching: ID[];
    games: {[roomid in RoomID]: RoomTitle};
  }

  /** A JSON object that reflects the custom user groups configured on the server. */
  export type CustomGroups = CustomGroup[];
  export interface CustomGroup {
    symbol: string;
    name: string | null;
    type: 'leadership' | 'staff' | 'normal' | 'punishment';
  }

  /**
   * A JSON object representing the changes in the tournament since the last update you
   * received or the start of the tournament. These include:
   *
   *   - `format`: the tournament's custom name or the format being used
   *   - `teambuilderFormat`: the format being used; sent if a custom name was set
   *   - `isStarted`: whether or not the tournament has started
   *   - `isJoined`: whether or not you have joined the tournament
   *   - `generator`: the type of bracket being used by the tournament
   *   - `playerCap`: the player cap that was set or 0 if it was removed
   *   - `bracketData`: an object representing the current state of the bracket
   *   - `challenges`: a list of opponents that you can currently challenge
   *   - `challengeBys`: a list of opponents that can currently challenge you
   *   - `challenged`: the name of the opponent that has challenged you
   *   - `challenging`: the name of the opponent that you are challenging
   */
  export interface TournamentUpdate {
    format?: FormatName;
    teambuilderFormat?: FormatName;
    isStarted?: boolean;
    isJoined?: boolean;
    generator?: Generator;
    playerCap?: number;
    bracketData?: {[key: string]: any};
    challenges?: Username[];
    challengeBys?: Username[];
    challenged?: Username[];
    challenging?: Username[];
  }

  /**
   * A JSON object send when a tournament ends containing:
   *
   *   - `results`: the name(s) of the winner(s) of the tournament
   *   - `format`: the tournament's custom name or the format that was used
   *   - `generator`: the type of bracket that was used by the tournament
   *   - `bracketData`: an object representing the final state of the bracket
   */
  export interface TournamentEnded {
    results: Username[];
    format: FormatName;
    generator: Generator;
    bracketData: {[key: string]: any};
  }

  export type Request = MoveRequest | SwitchRequest | TeamRequest | WaitRequest;

  interface BaseRequest {
    rqid: number;
    side: Request.SideInfo;
    noCancel?: true;
  }

  export interface MoveRequest extends BaseRequest {
    active: (Request.ActivePokemon | null)[];
  }

  export interface SwitchRequest extends BaseRequest {
    forceSwitch: [true] & boolean[];
  }

  export interface TeamRequest extends BaseRequest {
    teamPreview: true;
    maxChosenTeamSize?: number;
  }

  export interface WaitRequest extends BaseRequest {
    wait: true;
  }

  export namespace Request {
    export interface SideInfo {
      name: Username;
      id: SideID;
      pokemon: Pokemon[];
    }

    export interface ActivePokemon {
      moves: Array<{
        name: 'Recharge';
        id: 'recharge';
      } | {
        name: 'Struggle';
        id: 'struggle';
        target: MoveTarget;
        disabled: false;
      } | {
        name: MoveName;
        id: ID;
      } | {
        name: MoveName;
        id: ID;
        pp: number;
        maxpp: number;
        target: MoveTarget;
        disabled: boolean;
      }>;
      maybeDisabled?: true;
      trapped?: true;
      maybeTrapped?: true;
      canMegaEvo?: true;
      canMegaEvoX?: true;
      canMegaEvoY?: true;
      canUltraBurst?: true;
      canZMove?: Array<{
        name: MoveName;
        target: MoveTarget;
      } | null>,
      canDynamax?: boolean,
      maxMoves?: {
        maxMoves: Array<{
          move: MoveName;
          target: MoveTarget;
          disabled?: boolean;
        }>;
        gigantamax?: MoveName;
      },
      canTerastallize?: TypeName,
    }

    export interface Pokemon {
      active?: boolean;
      details: PokemonDetails;
      ident: PokemonIdent;
      pokeball: ID;
      ability: ID;
      baseAbility: ID;
      condition: PokemonHPStatus;
      item: ID;
      moves: ID[];
      stats: Omit<StatsTable, 'hp'>;
      commanding?: boolean;
      reviving?: boolean;
      teraType?: TypeName;
    }
  }

  export interface RoomInitArgs {
    /**
     * `|init|ROOMTYPE`
     *
     * The first message received from a room when you join it. `ROOMTYPE` is one of:
     * `chat`, `battle`, or `html`.
     */
    '|init|': readonly ['init', 'chat' | 'battle' | 'html'];
    /**
     * `|title|TITLE`
     *
     * `TITLE` is the title of the room. The title is _not_ guaranteed to resemble
     * the room ID; for instance, room `battle-gen7uu-779767714` could have title `Alice vs. Bob`.
     */
    '|title|': readonly ['title', RoomTitle];
    /**
     * `|users|USERLIST`
     *
     * `USERLIST` is a comma-separated list of `USER`s, sent from chat rooms when they're joined.
     * Optionally, a `USER` can end in `@` followed by a user status message. A `STATUS` starting
     * in `!` indicates the user is away.
     */
    '|users|': readonly ['users', UserList];
  }

  export type RoomInitArgName = keyof RoomInitArgs;
  export type RoomInitArgType = RoomInitArgs[RoomInitArgName];

  export interface RoomMessageArgs {
    /**
     * `||MESSAGE` or `MESSAGE`
     *
     * We received a message `MESSAGE`, which should be displayed directly in the room's log.
     */
    '||': readonly ['', Message];
    /**
     * `|html|HTML`
     *
     * We received an HTML message, which should be sanitized and displayed directly in the
     * room's log.
     */
    '|html|': readonly ['html', HTML];
    /**
     * `|uhtml|NAME|HTML`
     *
     * We recieved an HTML message (NAME) that can change what it's displaying, this is used in
     * things like our Polls system, for example.
     */
    '|uhtml|': readonly ['uhtml', UHTMLName, HTML];
    /**
     * `|uhtmlchange|NAME|HTML`
     *
     * Changes the HTML display of the `|uhtml|` message named (NAME).
     */
    '|uhtmlchange|': readonly ['uhtmlchange', UHTMLName, HTML];
    /**
     * `|join|USER`
     *
     * `USER` joined the room. Optionally, `USER` may be appended with `@!` to indicate that the
     * user is away or busy.
     */
    '|join|': readonly ['join', Username];
    /**
     * `|j|USER`
     *
     * `USER` joined the room. Optionally, `USER` may be appended with `@!` to indicate that the
     * user is away or busy.
     */
    '|j|': readonly ['j', Username];
    /**
     * `|join|USER`
     *
     * `USER` silently joined the room. Optionally, `USER` may be appended with `@!` to indicate
     * that the user is away or busy.
     */
    '|J|': readonly ['J', Username];
    /**
     * `|leave|USER`
     *
     * `USER` left the room.
     */
    '|leave|': readonly ['leave', Username];
    /**
     * `|l|USER`
     *
     * `USER` left the room.
     */
    '|l|': readonly ['leave', Username];
    /**
     * `|L|USER`
     *
     * `USER` silently left the room.
     */
    '|L|': readonly ['leave', Username];
    /**
     * `|name|USER|OLDID`
     *
     * A user changed name to `USER`, and their previous userid was `OLDID`. Optionally, `USER` may
     * be appended with `@!` to indicate that the user is away or busy.
     */
    '|name|': readonly ['name', Username, ID];
    /**
     * `|n|USER|OLDID`
     *
     * A user changed name to `USER`, and their previous userid was `OLDID`. Optionally, `USER` may
     * be appended with `@!` to indicate that the user is away or busy.
     */
    '|n|': readonly ['name', Username, ID];
    /**
     * `|N|USER|OLDID`
     *
     * A user silently changed name to `USER`, and their previous userid was `OLDID`. Optionally,
     * `USER` may be appended with `@!` to indicate that the user is away or busy.
     */
    '|N|': readonly ['name', Username, ID];
    /**
     * `|chat|USER|MESSAGE`
     *
     * `USER` said `MESSAGE`. Note that `MESSAGE` can contain `|` characters.
     *
     * If `MESSAGE` starts with `/`, it is a special message. For instance, `/me TEXT` or
     * `/announce TEXT` or `/uhtml HTML`. A lot of these message types are abused to embed protocol
     * messages in PMs (for instance, `/uhtml` is a stopgap before the client is rewritten to
     * support `|uhtml|` etc in  PMs).
     *
     * If the server wants clients to actually render a message starting with `/`, it will send
     * message starting with `//` (exactly like how users need to send those messages).
     */
    '|chat|': readonly ['chat', Username, Message];
    /**
     * `|c|USER|MESSAGE`
     *
     * `USER` said `MESSAGE`. Note that `MESSAGE` can contain `|` characters.
     *
     * If `MESSAGE` starts with `/`, it is a special message. For instance, `/me TEXT` or
     * `/announce TEXT` or `/uhtml HTML`. A lot of these message types are abused to embed protocol
     * messages in PMs (for instance, `/uhtml` is a stopgap before the client is rewritten to
     * support `|uhtml|` etc in  PMs).
     *
     * If the server wants clients to actually render a message starting with `/`, it will send
     * message starting with `//` (exactly like how users need to send those messages).
     */
    '|c|': readonly ['chat', Username, Message];
    /**
     * `|notify|TITLE|MESSAGE`
     *
     * Send a notification with `TITLE` and `MESSAGE` (usually, `TITLE` will be bold, and `MESSAGE`
     * is optional).
     *
     * `|notify|TITLE|MESSAGE|HIGHLIGHTTOKEN`
     *
     * Send a notification as above, but only if the user would be notified by a chat message
     * containing `HIGHLIGHTTOKEN` (i.e. if `HIGHLIGHTTOKEN` contains words added to `/highlight`,
     * or their username by default).
     */
    '|notify|':
    | readonly ['notify', NotificationTitle, Message?]
    | readonly ['notify', NotificationTitle, Message, HighlightToken];
    /**
     * `|:|TIMESTAMP`
     *
     * `:` is the current time according to the server, so that times can be adjusted and reported
     * in the local time in the case of a discrepancy.
     *
     * The exact fate of this command is uncertain - it may or may not be replaced with a more
     * generalized way to transmit timestamps at some point.
     */
    '|:|': readonly [':', Timestamp];
    /**
     * `|c:|TIMESTAMP|USER|MESSAGE`
     *
     * `c:` is pretty much the same as `c`, but also comes with a UNIX timestamp; (the number of
     * seconds since 1970). This is used for accurate timestamps in chat logs.
     */
    '|c:|': ['c:', Timestamp, Username, Message];
    /**
     * `|battle|ROOMID|USER1|USER2` or `|b|ROOMID|USER1|USER2`
     *
     * A battle started between `USER1` and `USER2`, and the battle room has ID `ROOMID`.
     */
    '|battle|': readonly ['battle', RoomID, Username, Username];
  }

  export type RoomMessageArgName = keyof RoomMessageArgs;
  export type RoomMessageArgType = RoomMessageArgs[RoomMessageArgName];

  export type RoomArgs = RoomInitArgs & RoomMessageArgs;
  export type RoomArgName = RoomInitArgName | RoomMessageArgName;
  export type RoomArgsType = RoomArgs[RoomArgName];

  export interface GlobalArgs {
    /**
     * `|popup|MESSAGE`
     *
     * Show the user a popup containing `MESSAGE`. `||` denotes a newline in the popup.
     */
    '|popup|': readonly ['popup', Message];
    /**
     * `|pm|SENDER|RECEIVER|MESSAGE`
     *
     * A PM was sent from `SENDER` to `RECEIVER` containing the message `MESSAGE`.
     */
    '|pm|': readonly ['pm', Username, Username, Message];
    /**
     * `|usercount|USERCOUNT`
     *
     * `USERCOUNT` is the number of users on the server.
     */
    '|usercount|': readonly ['usercount', Num];
    /**
     * `|nametaken|USERNAME|MESSAGE`
     *
     * You tried to change your username to `USERNAME` but it failed for the reason described in
     * `MESSAGE`.
     */
    '|nametaken|': readonly ['nametaken', Username, Message];
    /**
     * `|challstr|CHALLSTR`
     *
     * You just connected to the server, and we're giving you some information you'll need to log
     * in.
     *
     * If you're already logged in and have session cookies, you can make an HTTP GET request to
     * `http://play.pokemonshowdown.com/action.php?act=upkeep&challstr=CHALLSTR`
     *
     * Otherwise, you'll need to make an HTTP POST request to
     * `http://play.pokemonshowdown.com/action.php` with the data
     * `act=login&name=USERNAME&pass=PASSWORD&challstr=CHALLSTR`
     *
     * `USERNAME` is your username and `PASSWORD` is your password, and `CHALLSTR` is the value you
     * got from `|challstr|`. Note that `CHALLSTR` contains `|` characters. (Also feel free to make
     * the request to `https://` if your client supports it.)
     *
     * Either way, the response will start with `]` and be followed by a JSON object which we'll
     * call `data`.
     *
     * Finish logging in (or renaming) by sending: `/trn USERNAME,0,ASSERTION` where `USERNAME` is
     * your desired username and `ASSERTION` is `data.assertion`.
     */
    '|challstr|': readonly ['challstr', string];
    /**
     * `|customgroups|JSON
     *
     * `JSON` is a JSON object that reflects the custom user groups configured on the server.
     */
    '|customgroups|': readonly ['customgroups', CustomGroupsJSON];
    /**
     * `|updateuser|USER|NAMED|AVATAR|SETTINGS`
     *
     * Your name, avatar or settings were successfully changed. Your rank and username are now
     * `USER`. Optionally, `USER` may be appended with `@!` to indicate that you are away or busy.
     * `NAMED` will be `0` if you are a guest or `1` otherwise. Your avatar is now `AVATAR`.
     * `SETTINGS` is a JSON object representing the current state of various user settings.
     */
    '|updateuser|': readonly ['updateuser', Username, '0' | '1', AvatarIdent, JSON];
    /**
     * `|formats|FORMATSLIST`
     *
     * This server supports the formats specified in `FORMATSLIST`. `FORMATSLIST` is a `|`-separated
     * list of `FORMAT`s. `FORMAT` is a format name with one or more of these suffixes: `,#` if the
     * format uses random teams, `,,` if the format is only available for searching, and `,` if the
     * format is only available for challenging.
     *
     * Sections are separated by two vertical bars with the number of the column of that section
     * prefixed by `,` in it. After that follows the name of the section and another vertical bar.
     */
    '|formats|': readonly ['formats', FormatsList];
    /**
     * `|updatesearch|JSON`
     *
     * `JSON` is a JSON object representing the current state of what battles the user is currently
     * searching for. You'll get this whenever searches update (when you search, cancel a search,
     * or you start or end a battle).
     */
    '|updatesearch|': readonly ['updatesearch', SearchStateJSON];
    /**
     * `|updatechallenges|JSON`
     *
     * `JSON` is a JSON object representing the current state of who the user is challenging and
     * who is challenging the user. You'll get this whenever challenges update (when you challenge
     * someone, when you receive a challenge, when you or someone you challenged
     * accepts/rejects/cancels a challenge).
     */
    '|updatechallenges|': readonly ['updatechallenges', ChallengesJSON];
    /**
     * `|queryresponse|QUERYTYPE|JSON`
     *
     * `JSON` is a JSON object representing containing the data that was requested with
     * `/query QUERYTYPE` or `/query QUERYTYPE DETAILS`.
     *
     * Possible queries include `/query roomlist` and `/query userdetails USERNAME`.
     */
    '|queryresponse|': readonly ['queryresponse', QueryType, JSON];
  }

  export type GlobalArgName = keyof GlobalArgs;
  export type GlobalArgType = GlobalArgs[GlobalArgName];

  export interface MiscArgs {
    '|unlink|': readonly ['unlink', Username] | readonly ['unlink', 'hide', Username];
    '|raw|': readonly ['raw', HTML];
    '|warning|': readonly ['warning', Message];
    '|error|': readonly ['error', Message];
    '|bigerror|': readonly ['bigerror', Message];
    '|chatmsg|': readonly ['chatmsg', Message];
    '|chatmsg-raw|': readonly ['chatmsg-raw', HTML];
    '|controlshtml|': readonly ['controlshtml', HTML];
    '|fieldhtml|': readonly ['fieldhtml', HTML];
    '|debug|': readonly ['debug', Message];
    '|deinit|': readonly ['deinit'];
    '|pagehtml|': readonly ['pagehtml', HTML];
    '|selectorhtml|': readonly ['selectorhtml', SelectorName, HTML];
    '|refresh|': readonly ['refresh'];
    '|tempnotify|':
    | readonly ['tempnotify', TempNotifyName, Message]
    | readonly ['tempnotify', TempNotifyName, Message, Message]
    | readonly ['tempnotify', TempNotifyName, Message, Message, string];
    '|tempnotifyoff|': readonly ['tempnotifyoff', TempNotifyName];
    '|noinit|':
    | readonly ['noinit', 'joinfailed' | 'namerequired' | 'nonexistent', Message]
    | readonly ['noinit', 'rename', RoomID, RoomTitle];
    '|hidelines|':
    | readonly ['hidelines', 'delete' | 'hide', ID, Num]
    | readonly ['hidelines', 'unlink', ID];
    '|expire|': readonly ['expire'] | readonly ['expire', Message];
    '|askreg|': readonly ['askreg', ID];
  }

  export type MiscArgName = keyof MiscArgs;
  export type MiscArgType = MiscArgs[MiscArgName];


  /** TODO */

  /** FIXME */
  export namespace Upgraded {
    export type Request = MoveRequest | SwitchRequest | TeamRequest | WaitRequest;

    interface BaseRequest {
      rqid: number;
      side: Request.SideInfo;
      noCancel?: true;
    }

    export interface MoveRequest extends BaseRequest {
      requestType: 'move';
      active: (Request.ActivePokemon | null)[];
    }

    export interface SwitchRequest extends BaseRequest {
      requestType: 'switch';
      forceSwitch: [true] & boolean[];
    }

    export interface TeamRequest extends BaseRequest {
      requestType: 'team';
      maxTeamSize?: number;
    }

    export interface WaitRequest extends BaseRequest {
      requestType: 'wait';
    }

    export namespace Request {
      export interface SideInfo {
        name: Username;
        id: SideID;
        pokemon: Pokemon[];
      }

      export interface ActivePokemon {
        moves: Array<{
          name: 'Recharge';
          id: 'recharge';
        } | {
          name: MoveName;
          id: ID;
        } | {
          name: MoveName;
          id: ID;
          pp: number;
          maxpp: number;
          target: MoveTarget;
          disabled?: boolean;
        }>;
        maxMoves?: Array<{
          // name: MoveName;
          id: ID;
          target: MoveTarget;
          disabled?: boolean;
        }>;
        zMoves?: Array<{
          name: MoveName;
          id: ID;
          target: MoveTarget;
        } | null>;
        canDynamax?: boolean;
        canGigantamax?: boolean;
        canMegaEvo?: boolean;
        canUltraBurst?: boolean;
        canTerastallize?: string;
        trapped?: boolean;
        maybeTrapped?: boolean;
        maybeDisabled?: boolean;
      }

      export interface Pokemon extends DetailedPokemon, PokemonHealth {
        ident: PokemonIdent;
        details: PokemonDetails;
        condition: PokemonHPStatus;
        active: boolean;
        stats: Omit<StatsTable, 'hp'>;
        moves: ID[];
        baseAbility: ID;
        item: ID;
        pokeball: ID;
        ability?: ID;
        commanding?: boolean;
        reviving?: boolean;
        teraType?: TypeName;
        terastallized?: TypeName | '';
      }
    }

    export type RoomInitArgs = Protocol.RoomInitArgs;
    export type RoomInitArgName = Protocol.RoomInitArgName;
    export type RoomInitArgType = Protocol.RoomInitArgType;

    export type RoomMessageArgs = Omit<Protocol.RoomMessageArgs,
      '|join|' | '|j|' | '|J|' |
      '|leave|' | '|l|' | '|L|' |
      '|name|' | '|n|' | '|N|' |
      '|chat|' | '|c|'
    > & {
      /**
       * `|join|USER`, `|j|USER`, or `|J|USER`
       *
       * `USER` joined the room. Optionally, `USER` may be appended with `@!` to indicate that the
       * user is away or busy. The final boolean is true if the join was intended to be silent
       * (`J`).
       */
      '|join|': readonly ['join', Username, boolean];
      /**
       * `|leave|USER`, `|l|USER`, or `|L|USER`
       *
       * `USER` left the room. The final boolean is true if the leave was intended to be silent
       * (`L`).
       */
      '|leave|': readonly ['leave', Username, boolean];
      /**
       * `|name|USER|OLDID`, `|n|USER|OLDID`, or `|N|USER|OLDID`
       *
       * A user changed name to `USER`, and their previous userid was `OLDID`. Optionally, `USER`
       * may be appended with `@!` to indicate that the user is away or busy. The final boolean is
       * true if the name change was intended to be silent (`N`).
       */
      '|name|': readonly ['name', Username, ID, boolean];
      /**
       * `|chat|USER|MESSAGE` or `|c|USER|MESSAGE`
       *
       * `USER` said `MESSAGE`. Note that `MESSAGE` can contain `|` characters.
       *
       * If `MESSAGE` starts with `/`, it is a special message. For instance, `/me TEXT` or
       * `/announce TEXT` or `/uhtml HTML`. A lot of these message types are abused to embed
       * protocol messages in PMs (for instance, `/uhtml` is a stopgap before the client is
       * rewritten to support `|uhtml|` etc in  PMs).
       *
       * If the server wants clients to actually render a message starting with `/`, it will send
       * message starting with `//` (exactly like how users need to send those messages).
       */
      '|chat|': readonly ['chat', Username, Message];
    }
    export type RoomMessageArgName = keyof RoomMessageArgs;
    export type RoomMessageArgType = RoomMessageArgs[RoomMessageArgName];

    export type RoomArgs = RoomInitArgs & RoomMessageArgs;
    export type RoomArgName = RoomInitArgName | RoomMessageArgName;
    export type RoomArgsType = RoomArgs[RoomArgName];

    export type GlobalArgs = Protocol.GlobalArgs;
    export type GlobalArgName = Protocol.GlobalArgName;
    export type GlobalArgType = Protocol.GlobalArgType;

    export type MiscArgs = Protocol.MiscArgs;
    export type MiscArgName = Protocol.MiscArgName;
    export type MiscArgType = Protocol.MiscArgType;

  }

  export namespace Legacy {
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
  }
}

export type PositionLetter = Protocol.PositionLetter;

export type PokemonIdent = Protocol.PokemonIdent;
export type PokemonSearchID = Protocol.PokemonSearchID;
export type PokemonDetails = Protocol.PokemonDetails;
export type PokemonHPStatus = Protocol.PokemonHPStatus;

export type Username = Protocol.Username;
export type AvatarIdent = Protocol.AvatarIdent;

export type EffectName = Protocol.EffectName;
export type SpeciesName = Protocol.SpeciesName;
export type AbilityName = Protocol.AbilityName;
export type ItemName = Protocol.ItemName;
export type MoveName = Protocol.MoveName;

export type Message = Protocol.Message;
export type Timestamp = Protocol.Timestamp;

export type NotificationTitle = Protocol.NotificationTitle;
export type HighlightToken = Protocol.HighlightToken;
export type TempNotifyName = Protocol.TempNotifyName;

export type HTML = Protocol.HTML;
export type UHTMLName = Protocol.UHTMLName;
export type SelectorName = Protocol.SelectorName;
export type JSON = Protocol.JSON;

export type RoomID = Protocol.RoomID;
export type RoomTitle = Protocol.RoomTitle;
export type UserList = Protocol.UserList;

export type Num = Protocol.Num;
export type FormatsList = Protocol.FormatsList;
export type Score = Protocol.Score;
export type Generator = Protocol.Generator;
export type FormatName = Protocol.FormatName;
export type Rule = Protocol.Rule;
export type BoostIDs = Protocol.BoostIDs;
export type Seed = Protocol.Seed;
export type Slots = Protocol.Slots;
export type Types = Protocol.Types;
export type Nickname = Protocol.Nickname;
export type StatDisplayName = Protocol.StatDisplayName;

export type Reason = Protocol.Reason;
export type QueryType = Protocol.QueryType;

export type ChallengesJSON = Protocol.ChallengesJSON;
export type SearchStateJSON = Protocol.SearchStateJSON;
export type TournamentUpdateJSON = Protocol.TournamentUpdateJSON;
export type TournamentEndedJSON = Protocol.TournamentEndedJSON;
export type RequestJSON = Protocol.RequestJSON;

export type Challenges = Protocol.Challenges;
export type SearchState = Protocol.SearchState;
export type TournamentUpdate = Protocol.TournamentUpdate;
export type TournamentEnded = Protocol.TournamentEnded;

export type Request = Protocol.Request;
export namespace Request {
  export type SideInfo = Protocol.Request.SideInfo;
  export type ActivePokemon = Protocol.Request.ActivePokemon;
  export type Pokemon = Protocol.Request.Pokemon;
}

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

export interface PokemonHealth {
  hp: number;
  maxhp: number;
  hpcolor: HPColor | '';
  status?: StatusName;
  fainted?: boolean;
}

export interface DetailedPokemon {
  details: PokemonDetails;
  name: string;
  speciesForme: string;
  level: number;
  shiny: boolean;
  gender?: GenderName;
  ident: PokemonIdent;
  terastallized?: TypeName | '';
  searchid: PokemonSearchID;
}

export const Protocol = new class {
  parseDetails(
    name: string,
    ident: Protocol.PokemonIdent,
    details = '' as Protocol.PokemonDetails,
    output = {} as DetailedPokemon
  ) {
    output.details = details;

    const isTeamPreview = !name;
    output.name = name;
    output.speciesForme = name;
    output.level = 100;
    output.shiny = false;
    output.gender = undefined;
    output.ident = !isTeamPreview ? ident : '' as Protocol.PokemonIdent;
    output.searchid = (!isTeamPreview ? `${ident}|${details}` : '') as Protocol.PokemonSearchID;

    const splitDetails = details.split(', ');
    if (splitDetails[splitDetails.length - 1].startsWith('tera:')) {
      output.terastallized = splitDetails[splitDetails.length - 1].slice(5) as TypeName;
      splitDetails.pop();
    }
    if (splitDetails[splitDetails.length - 1] === 'shiny') {
      output.shiny = true;
      splitDetails.pop();
    }
    const gender = splitDetails[splitDetails.length - 1];
    if (gender === 'M' || gender === 'F') {
      output.gender = gender;
      splitDetails.pop();
    }
    if (splitDetails[1]) output.level = parseInt(splitDetails[1].substr(1)) || 100;
    if (splitDetails[0]) output.speciesForme = splitDetails[0];
    return output;
  }

  parseHealth(hpstring: Protocol.PokemonHPStatus, output = {} as PokemonHealth) {
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
      output.status = undefined;
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

  parseRequest(json: Protocol.RequestJSON) {
    const raw: Protocol.Request = JSON.parse(json);
    const upgraded: Partial<Protocol.Upgraded.Request> = {};

    upgraded.rqid = raw.rqid;
    if (raw.noCancel) upgraded.noCancel = true;
    upgraded.side = { name: raw.side.name, id: raw.side.id, pokemon: []};
    for (const r of raw.side.pokemon) {
      const u = r as Protocol.Upgraded.Request.Pokemon;
      this.parseDetails(r.ident.substr(4), r.ident, r.details, u);
      this.parseHealth(r.condition, u);
      u.ability = r.ability || r.baseAbility;
      upgraded.side.pokemon.push(u);
    }

    if ('forceSwitch' in raw) {
      upgraded.requestType = 'switch';
    } else if ('teamPreview' in raw) {
      upgraded.requestType = 'team';
    } else if ('wait' in raw) {
      upgraded.requestType = 'wait';
      upgraded.noCancel = true;
    } else {
      upgraded.requestType = 'move';
    }


};