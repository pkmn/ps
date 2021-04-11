import {
  AbilityName,
  Args,
  ArgType,
  EffectName,
  KWArgs,
  KWArgType,
  MoveName,
  Num,
  PokemonDetails,
  PokemonHPStatus,
  PokemonIdent,
  Protocol,
  SpeciesName,
  Username,
} from '@pkmn/protocol';
import {ID, StatID, GenerationNum, SideID, TypeName} from '@pkmn/types';
import {toID} from './common';
import * as TextJSON from './data/text.json';

const Text = TextJSON as {
  // NOTE: this is called 'default' in the Pokemon Showdown client, but loaders get tripped up by
  // the keyword 'default' and think the JSON file is actually an ES module with a default export.
  // '_' at least has the benefit of being even less likely to cause collisions...
  _: { [templateName: string]: string };
  [id: string]: { [templateName: string]: string };
} & {
  [s in (StatID | 'spc')]: { statName: string; statShortName: string }
};

/**
 * Tracks additional state required to display a battle in depth. If not provided the output will
 * be less detailed and accurate, though tracking all of this state is significantly more
 * involved. `@pkmn/client`'s `Battle` implements this, though note, the protocol messages need to
 * be fed into the `LogFormatter` **before** the `@pkmn/client`'s `Handler`.
 *
 * smogon/pokemon-showdown-client's `BattleTextParser` receives the protocol *after* the `Battle`
 * state has been updated, but PS mutates the protocol to encode to pre-updated state for the
 * logs.
 */
export interface Tracker {
  /** Pokemon at the provided slot for a side *before* any |swap| is applied */
  pokemonAt(side: SideID, slot: number): PokemonIdent | undefined;
  /** Percentage damage of applying the health to the ident (ie. before |-damage| is applied) */
  damagePercentage(ident: PokemonIdent, health: PokemonHPStatus): string | undefined;
  /** Weather (*before() |-weather| is applied) */
  currentWeather(): ID | undefined;
  /** The Pokémon corresponding to ident and details which was switched out from |switch| */
  getSwitchedOutPokemon(
    ident: PokemonIdent,
    details: PokemonDetails
  ): {
    ident: PokemonIdent;
    lastMove: ID;
    illusion?: {ident: PokemonIdent} | null;
  } | undefined;
  /** The list of types of the Pokémon ident references, *before* |singleturn| is applied */
  getPokemonTypeList(ident: PokemonIdent): readonly TypeName[] | undefined;
  /** The species forme of the the Pokémon referenced by ident  */
  getPokemonSpeciesForme(ident: PokemonIdent): SpeciesName | undefined;
}

const WEATHERS: {[id: string]: ID} = {
  sand: 'sandstorm' as ID,
  sun: 'sunnyday' as ID,
  rain: 'raindance' as ID,
  hail: 'hail' as ID,
  harshsunshine: 'desolateland' as ID,
  heavyrain: 'primordialsea' as ID,
  strongwinds: 'deltastream' as ID,
};

const NOOP = () => undefined;

const TEMPLATES = ['pokemon', 'opposingPokemon', 'team', 'opposingTeam', 'party', 'opposingParty'];
const THAWING = new Set([
  'flamewheel', 'flareblitz', 'fusionflare', 'sacredfire', 'scald', 'steameruption',
] as ID[]);

export class LogFormatter {
  perspective: SideID;

  p1: Username;
  p2: Username;
  p3: Username;
  p4: Username;
  gen: GenerationNum;

  turn: number;

  activeMoveIsSpread: boolean | undefined;
  curLineSection: 'break' | 'preMajor' | 'major' | 'postMajor';
  lowercaseRegExp: RegExp | null | undefined;

  private readonly handler: Handler;

  constructor(
    perspective: SideID = 'p1',
    tracker: Tracker = {
      pokemonAt: NOOP,
      damagePercentage: NOOP,
      currentWeather: NOOP,
      getSwitchedOutPokemon: NOOP,
      getPokemonTypeList: NOOP,
      getPokemonSpeciesForme: NOOP,
    }
  ) {
    this.perspective = perspective;

    this.p1 = 'Player 1' as Username;
    this.p2 = 'Player 2' as Username;
    this.p3 = 'Player 3' as Username;
    this.p4 = 'Player 4' as Username;
    this.gen = 8;
    this.turn = 0;

    this.activeMoveIsSpread = undefined;
    this.curLineSection = 'break';
    this.lowercaseRegExp = undefined;

    this.handler = new Handler(this, tracker);
  }

  fixLowercase(input: string) {
    if (this.lowercaseRegExp === undefined) {
      const prefixes = TEMPLATES.map(templateId => {
        const template = Text._[templateId];
        if (template.charAt(0) === template.charAt(0).toUpperCase()) return '';
        const bracketIndex = template.indexOf('[');
        return bracketIndex >= 0 ? template.slice(0, bracketIndex) : template;
      }).filter(prefix => prefix);
      if (prefixes.length) {
        // eslint-disable-next-line no-useless-escape
        const buf = '((?:^|\n)(?:  |  \\\(|\\\[)?)(' +
          prefixes.map(p => LogFormatter.escapeRegExp(p)).join('|') + ')';
        this.lowercaseRegExp = new RegExp(buf, 'g');
      } else {
        this.lowercaseRegExp = null;
      }
    }
    if (!this.lowercaseRegExp) return input;
    return input.replace(this.lowercaseRegExp, (_, p1, p2) => (
      p1 + p2.charAt(0).toUpperCase() + p2.slice(1)
    ));
  }

  static escapeRegExp(input: string) {
    return input.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
  }

  pokemonName(pokemon: PokemonIdent) {
    if (!pokemon) return '';
    if (!pokemon.startsWith('p')) return `???pokemon:${pokemon}???`;
    if (pokemon.charAt(3) === ':') return pokemon.slice(4).trim();
    else if (pokemon.charAt(2) === ':') return pokemon.slice(3).trim();
    return `???pokemon:${pokemon}???`;
  }

  pokemon(pokemon: PokemonIdent | '') {
    if (!pokemon) return '';
    const side = pokemon.slice(0, 2);
    if (!['p1', 'p2', 'p3', 'p4'].includes(side)) return `???pokemon:${pokemon}???`;
    const name = this.pokemonName(pokemon);
    const isNear = side === this.perspective || side === LogFormatter.allyID(side as SideID);
    const template = Text._[isNear ? 'pokemon' : 'opposingPokemon'];
    return template.replace('[NICKNAME]', name);
  }

  pokemonFull(pokemon: PokemonIdent, details: PokemonDetails): [string, string] {
    const nickname = this.pokemonName(pokemon);

    const species = details.split(',')[0];
    if (nickname === species) return [pokemon.slice(0, 2), `**${species}**`];
    return [pokemon.slice(0, 2), `${nickname} (**${species}**)`];
  }

  trainer(side: string) {
    side = side.slice(0, 2);
    if (side === 'p1') return this.p1;
    if (side === 'p2') return this.p2;
    if (side === 'p3') return this.p3;
    if (side === 'p4') return this.p4;
    return `???side:${side}???`;
  }

  static allyID(sideid: SideID): SideID | '' {
    if (sideid === 'p1') return 'p3';
    if (sideid === 'p2') return 'p4';
    if (sideid === 'p3') return 'p1';
    if (sideid === 'p4') return 'p2';
    return '';
  }

  team(side: string, them = false) {
    side = side.slice(0, 2);
    const us = side === this.perspective || side === LogFormatter.allyID(side as SideID);
    return us !== them ? Text._.team : Text._.opposingTeam;
  }

  own(side: string) {
    return side.slice(0, 2) === this.perspective ? 'OWN' : '';
  }

  party(side: string) {
    side = side.slice(0, 2);
    if (side === this.perspective || side === LogFormatter.allyID(side as SideID)) {
      return Text._.party;
    }
    return Text._.opposingParty;
  }

  static effectId(effect?: string) {
    return Protocol.parseEffect(effect, toID).name as ID;
  }

  effect(effect?: string) {
    return Protocol.parseEffect(effect).name;
  }

  template(type: string, ...namespaces: (string | undefined)[]) {
    for (const namespace of namespaces) {
      if (!namespace) continue;
      if (namespace === 'OWN') return `${Text._[type + 'Own']}\n`;
      if (namespace === 'NODEFAULT') return '';
      let id = LogFormatter.effectId(namespace);
      if (Text[id] && type in Text[id]) {
        if (Text[id][type].charAt(1) === '.') type = Text[id][type].slice(2) as ID;
        if (Text[id][type].charAt(0) === '#') id = Text[id][type].slice(1) as ID;
        if (!Text[id][type]) return '';
        return `${Text[id][type]}\n`;
      }
    }
    if (!Text._[type]) return '';
    return `${Text._[type]}\n`;
  }

  maybeAbility(effect: string | undefined, holder: PokemonIdent | '') {
    if (!effect) return '';
    if (!effect.startsWith('ability:')) return '';
    return this.ability(effect.slice(8).trim(), holder);
  }

  ability(name: string | undefined, holder: PokemonIdent | '') {
    if (!name) return '';
    return (Text._.abilityActivation
      .replace('[POKEMON]', this.pokemon(holder))
      .replace('[ABILITY]', this.effect(name)) + '\n');
  }

  stat(stat: StatID | 'spc') {
    const entry = Text[stat || 'stats'];
    if (!entry || !entry.statName) return `???stat:${stat}???`;
    return entry.statName;
  }

  lineSection(args: ArgType | 'switchout', kwArgs: KWArgType) {
    const cmd = args[0];
    switch (cmd) {
    case 'done': case 'turn':
      return 'break';
    case 'move': case 'cant': case 'switch': case 'drag':
    case 'upkeep': case 'start': case '-mega': case '-candynamax':
      return 'major';
    case 'faint':
      return 'preMajor';
    // NOTE: switchout is a postMajor here compared to a preMajor upstream as lineSection gets
    // called by switch (major) first followed by switchout (postMajor), even though the actual
    // buffer gets the switchout before the switch. Effectively we're *attributing* switchout
    // with the major and switch with the postmajor which should have the same *result* as
    // switchout (premajor) and switch (major). Yes, this is ugly.
    case '-zpower': case 'switchout':
      return 'postMajor';
    case '-damage': {
      const id = LogFormatter.effectId((kwArgs as KWArgs['|-damage|']).from);
      return id === 'confusion' ? 'major' : 'postMajor';
    }
    case '-curestatus': {
      const id = LogFormatter.effectId((kwArgs as KWArgs['|-curestatus|']).from);
      return id === 'naturalcure' ? 'preMajor' : 'postMajor';
    }
    case '-start': {
      const id = LogFormatter.effectId((kwArgs as unknown as KWArgs['|-start|']).from);
      return id === 'protean' ? 'preMajor' : 'postMajor';
    }
    case '-activate': {
      const id = LogFormatter.effectId((args as Args['|-activate|'])[2]);
      return id === 'confusion' || id === 'attract' ? 'preMajor' : 'postMajor';
    }
    }
    return (cmd.charAt(0) === '-' ? 'postMajor' : '');
  }

  sectionBreak(args: ArgType | 'switchout', kwArgs = {} as KWArgType) {
    const prevSection = this.curLineSection;
    const curSection = this.lineSection(args, kwArgs);
    if (!curSection) return false;
    this.curLineSection = curSection;
    switch (curSection) {
    case 'break':
      return prevSection !== 'break';
    case 'preMajor':
    case 'major':
      return prevSection === 'postMajor' || prevSection === 'major';
    case 'postMajor':
      return false;
    }
  }

  formatText(args: ArgType, kwArgs?: KWArgType, noSectionBreak?: boolean) {
    const buf = !noSectionBreak && this.sectionBreak(args, kwArgs) ? '\n' : '';
    const key = Protocol.key(args);
    return buf + ((key && key in this.handler)
      ? this.fixLowercase((this.handler as any)[key](args, kwArgs))
      : '');
  }

  formatHTML(args: ArgType, kwArgs?: KWArgType) {
    if (args[0] === 'turn') {
      const turnMessage = this.formatText(args, kwArgs).trim();
      if (!turnMessage.startsWith('==') || !turnMessage.endsWith('==')) {
        throw new Error('Turn message must be a heading.');
      }
      this.curLineSection = 'break';
      return `<h2>${LogFormatter.escapeHTML(turnMessage.slice(2, -2).trim())}</h2>`;
    } else {
      return this.formatText(args, kwArgs, true).split('\n').map(line => {
        line = LogFormatter.escapeHTML(line);
        line = line.replace(/\*\*(.*)\*\*/, '<strong>$1</strong>');
        line = line.replace(/\|\|([^|]*)\|\|([^|]*)\|\|/, '<abbr title="$1">$2</abbr>');
        if (line.startsWith('  ')) line = '<small>' + line.trim() + '</small>';
        return line;
      }).join('<br />');
    }
  }

  static escapeHTML(str: string, escapeJS?: boolean) {
    if (typeof str !== 'string') return '';
    str = str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    return escapeJS ? str.replace(/\\/g, '\\\\').replace(/'/g, '\\\'') : str;
  }
}

class Handler implements Protocol.Handler<string> {
  readonly parser: LogFormatter;
  readonly tracker: Tracker;

  constructor(parser: LogFormatter, tracker: Tracker) {
    this.parser = parser;
    this.tracker = tracker;
  }

  '|player|'(args: Args['|player|']) {
    const [, side, name] = args;
    if (side === 'p1' && name) {
      this.parser.p1 = name;
    } else if (side === 'p2' && name) {
      this.parser.p2 = name;
    } else if (side === 'p3' && name) {
      this.parser.p3 = name;
    } else if (side === 'p4' && name) {
      this.parser.p4 = name;
    }
    return '';
  }

  '|gen|'(args: Args['|gen|']) {
    const [, gen] = args;
    this.parser.gen = gen;
    return '';
  }

  '|turn|'(args: Args['|turn|']) {
    const [, num] = args;
    this.parser.turn = Number.parseInt(num);
    return this.parser.template('turn').replace('[NUMBER]', num) + '\n';
  }

  '|start|'() {
    return this.parser.template('startBattle')
      .replace('[TRAINER]', this.parser.p1)
      .replace('[TRAINER]', this.parser.p2);
  }

  '|win|'(args: Args['|win|']) {
    return this.win(args);
  }

  '|tie|'(args: Args['|tie|']) {
    return this.win(args);
  }

  private win(args: Args['|win|' | '|tie|']) {
    const [cmd, name] = args;
    if (cmd === 'tie' || !name) {
      return (this.parser.template('tieBattle')
        .replace('[TRAINER]', this.parser.p1)
        .replace('[TRAINER]', this.parser.p2));
    }
    return this.parser.template('winBattle').replace('[TRAINER]', name);
  }

  '|switch|'(args: Args['|switch|']) {
    const [, pokemon, details] = args;

    let buf = '';
    const switchedOut = this.tracker.getSwitchedOutPokemon(pokemon, details);
    if (switchedOut) {
      const ident = switchedOut.illusion?.ident || switchedOut.ident;
      if (switchedOut.lastMove === 'uturn' || switchedOut.lastMove === 'voltswitch') {
        buf = this.switchout(ident, switchedOut.lastMove);
      } else if (switchedOut.lastMove !== 'batonpass' && switchedOut.lastMove !== 'zbatonpass') {
        buf = this.switchout(ident, switchedOut.lastMove);
      }
    }

    const [side, fullname] = this.parser.pokemonFull(pokemon, details);
    const template = this.parser.template('switchIn', this.parser.own(side));
    return buf + template
      .replace('[TRAINER]', this.parser.trainer(side))
      .replace('[FULLNAME]', fullname);
  }

  switchout(pokemon: PokemonIdent, from?: ID | '') {
    const side = pokemon.slice(0, 2);
    const template = this.parser.template('switchOut', from, this.parser.own(side));
    return this.parser.sectionBreak('switchout') ? '\n' : '' + template
      .replace('[TRAINER]', this.parser.trainer(side))
      .replace('[NICKNAME]', this.parser.pokemonName(pokemon))
      .replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|drag|'(args: Args['|drag|']) {
    const [, pokemon, details] = args;
    const [side, fullname] = this.parser.pokemonFull(pokemon, details);
    const template = this.parser.template('drag');
    return template
      .replace('[TRAINER]', this.parser.trainer(side))
      .replace('[FULLNAME]', fullname);
  }

  '|detailschange|'(args: Args['|detailschange|'], kwArgs: KWArgs['|detailschange|']) {
    return this.formechange(args, kwArgs);
  }

  '|-transform|'(args: Args['|-transform|'], kwArgs: KWArgs['|-transform|']) {
    return this.formechange(args, kwArgs);
  }

  '|-formechange|'(args: Args['|-formechange|'], kwArgs: KWArgs['|-formechange|']) {
    return this.formechange(args, kwArgs);
  }

  private formechange(
    args: Args['|detailschange|' | '|-formechange|' | '|-transform|'],
    kwArgs: KWArgs['|detailschange|' | '|-formechange|' | '|-transform|']
  ) {
    const [cmd, pokemon, arg2] = args;
    let newSpecies = '' as SpeciesName;
    switch (cmd) {
    case 'detailschange': newSpecies = arg2.split(',')[0].trim() as SpeciesName; break;
    case '-formechange': newSpecies = arg2 as SpeciesName; break;
    case '-transform':
      newSpecies = this.tracker.getPokemonSpeciesForme(arg2 as PokemonIdent) || newSpecies;
      break;
    }
    const newSpeciesId = toID(newSpecies);
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
    const template = this.parser.template(templateName, id, kwArgs.msg ? '' : 'NODEFAULT');
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[SPECIES]', newSpecies));
  }

  '|faint|'(args: Args['|faint|']) {
    const [, pokemon] = args;
    const template = this.parser.template('faint');
    return template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|swap|'(args: Args['|swap|'], kwArgs: KWArgs['|swap|']) {
    const [, pokemon, target] = args;
    if (target && !isNaN(Number(target)) && kwArgs.from) {
      const index = Number(target);
      const side = pokemon.slice(0, 2) as 'p1' | 'p2';
      const targetPokemon = this.tracker.pokemonAt(side, index);
      if (targetPokemon) {
        return (this.parser.template('swap')
          .replace('[POKEMON]', this.parser.pokemon(pokemon))
          .replace('[TARGET]', this.parser.pokemon(targetPokemon)));
      }
    }
    const template = this.parser.template('swapCenter');
    return template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|move|'(args: Args['|move|'], kwArgs: KWArgs['|move|']) {
    const [, pokemon, move] = args;
    this.parser.activeMoveIsSpread = !!kwArgs.spread;
    let line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    if (kwArgs.zeffect) {
      line1 = this.parser.template('zEffect').replace('[POKEMON]', this.parser.pokemon(pokemon));
    }
    const template = this.parser.template('move', kwArgs.from);
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[MOVE]', move));
  }

  '|cant|'(args: Args['|cant|'], kwArgs: KWArgs['|cant|']) {
    const [, pokemon, effect, move] = args;
    const template = this.parser.template('cant', effect, 'NODEFAULT') ||
      this.parser.template(move ? 'cant' : 'cantNoMove');
    const line1 = this.parser.maybeAbility(effect, kwArgs.of || pokemon);
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[MOVE]', move!));
  }

  '|-candynamax}'(args: Args['|-candynamax|']) {
    const [, side] = args;
    const own = this.parser.own(side);
    let template = '';
    if (this.parser.turn === 1) {
      if (own) template = this.parser.template('canDynamax', own);
    } else {
      template = this.parser.template('canDynamax', own);
    }
    return template.replace('[TRAINER]', this.parser.trainer(side));
  }

  '|message|'(args: Args['|message|']) {
    const [, message] = args;
    return '' + message + '\n';
  }

  '|-start|'(args: Args['|-start|'], kwArgs: KWArgs['|-start|']) {
    const [, pokemon, effect, arg3] = args;
    const line1 = this.parser.maybeAbility(effect, pokemon) ||
      this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    const id = LogFormatter.effectId(effect);
    if (id === 'typechange') {
      const template = this.parser.template('typeChange', kwArgs.from);
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[TYPE]', arg3!)
        .replace('[SOURCE]', this.parser.pokemon(kwArgs.of!)));
    }
    if (id === 'typeadd') {
      const template = this.parser.template('typeAdd', kwArgs.from);
      return line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[TYPE]', arg3!);
    }
    if (id.startsWith('stockpile')) {
      const num = id.slice(9);
      const template = this.parser.template('start', 'stockpile');
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[NUMBER]', num));
    }
    if (id.startsWith('perish')) {
      const num = id.slice(6);
      const template = this.parser.template('activate', 'perishsong');
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[NUMBER]', num));
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
    const template = this.parser.template(templateId, effect);
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[EFFECT]', this.parser.effect(effect))
      .replace('[MOVE]', arg3 as MoveName)
      .replace('[SOURCE]', this.parser.pokemon(kwArgs.of!))
      .replace('[ITEM]', this.parser.effect(kwArgs.from)));
  }

  '|-end|'(args: Args['|-end|'], kwArgs: KWArgs['|-end|']) {
    const [, pokemon, effect] = args;
    const line1 = this.parser.maybeAbility(effect, pokemon) ||
      this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    const id = LogFormatter.effectId(effect);
    if (id === 'doomdesire' || id === 'futuresight') {
      const template = this.parser.template('activate', effect);
      return line1 + template.replace('[TARGET]', this.parser.pokemon(pokemon));
    }
    const templateId = 'end';
    let template = '';
    if (kwArgs.from?.startsWith('item:')) {
      template = this.parser.template('endFromItem', effect);
    }
    if (!template) template = this.parser.template(templateId, effect);
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[EFFECT]', this.parser.effect(effect))
      .replace('[SOURCE]', this.parser.pokemon(kwArgs.of!)))
      .replace('[ITEM]', this.parser.effect(kwArgs.from));
  }

  '|-ability|'(args: Args['|-ability|'], kwArgs: KWArgs['|-ability|']) {
    let [, pokemon, ability, oldAbility] = args as [
      '-ability',
      PokemonIdent,
      AbilityName,
      AbilityName | PokemonIdent,
      PokemonIdent | 'boost' | undefined
    ];
    let line1 = '';
    if (oldAbility && (oldAbility.startsWith('p1') ||
      oldAbility.startsWith('p2') ||
      oldAbility === 'boost')) {
      oldAbility = '' as AbilityName;
    }
    if (oldAbility) line1 += this.parser.ability(oldAbility, pokemon);
    line1 += this.parser.ability(ability, pokemon);
    if (kwArgs.fail) {
      const template = this.parser.template('block', kwArgs.from);
      return line1 + template;
    }
    if (kwArgs.from) {
      line1 = this.parser.maybeAbility(kwArgs.from, pokemon) + line1;
      const template = this.parser.template('changeAbility', kwArgs.from);
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[ABILITY]', this.parser.effect(ability))
        .replace('[SOURCE]', this.parser.pokemon(kwArgs.of!)));
    }
    const id = LogFormatter.effectId(ability);
    if (id === 'unnerve') {
      const template = this.parser.template('start', ability);
      return line1 + template.replace('[TEAM]', this.parser.team(pokemon.slice(0, 2), true));
    }
    let templateId = 'start';
    if (id === 'anticipation' || id === 'sturdy') templateId = 'activate';
    const template = this.parser.template(templateId, ability, 'NODEFAULT');
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-endability|'(args: Args['|-endability|'], kwArgs: KWArgs['|-endability|']) {
    const [, pokemon, ability] = args;
    if (ability) return this.parser.ability(ability, pokemon);
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    const template = this.parser.template('start', 'Gastro Acid');
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-item|'(args: Args['|-item|'], kwArgs: KWArgs['|-item|']) {
    const [, pokemon, item] = args;
    const id = LogFormatter.effectId(kwArgs.from);
    let target = '' as PokemonIdent | '';
    let kwArgsOf = kwArgs.of;
    if (['magician', 'pickpocket'].includes(id)) {
      [target, kwArgsOf] = [kwArgs.of!, undefined];
    }
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgsOf || pokemon);
    if (['thief', 'covet', 'bestow', 'magician', 'pickpocket'].includes(id)) {
      const template = this.parser.template('takeItem', kwArgs.from);
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[ITEM]', this.parser.effect(item))
        .replace('[SOURCE]', this.parser.pokemon((target || kwArgsOf) as PokemonIdent)));
    }
    if (id === 'frisk') {
      const hasTarget = kwArgsOf && pokemon && kwArgsOf !== pokemon;
      const template = this.parser.template(hasTarget ? 'activate' : 'activateNoTarget', 'Frisk');
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(kwArgsOf!))
        .replace('[ITEM]', this.parser.effect(item))
        .replace('[TARGET]', this.parser.pokemon(pokemon)));
    }
    if (kwArgs.from) {
      const template = this.parser.template('addItem', kwArgs.from);
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[ITEM]', this.parser.effect(item)));
    }
    const template = this.parser.template('start', item, 'NODEFAULT');
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-enditem|'(args: Args['|-enditem|'], kwArgs: KWArgs['|-enditem|']) {
    const [, pokemon, item] = args;
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    if (kwArgs.eat) {
      const template = this.parser.template('eatItem', kwArgs.from);
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[ITEM]', this.parser.effect(item)));
    }
    const id = LogFormatter.effectId(kwArgs.from);
    if (id === 'gem') {
      const template = this.parser.template('useGem', item);
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[ITEM]', this.parser.effect(item))
        .replace('[MOVE]', kwArgs.move!));
    }
    if (id === 'stealeat') {
      const template = this.parser.template('removeItem', 'Bug Bite');
      return (line1 + template
        .replace('[SOURCE]', this.parser.pokemon(kwArgs.of!))
        .replace('[ITEM]', this.parser.effect(item)));
    }
    if (kwArgs.from) {
      const template = this.parser.template('removeItem', kwArgs.from);
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[ITEM]', this.parser.effect(item))
        .replace('[SOURCE]', this.parser.pokemon(kwArgs.of!)));
    }
    if (kwArgs.weaken) {
      const template = this.parser.template('activateWeaken');
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[ITEM]', this.parser.effect(item)));
    }
    let template = this.parser.template('end', item, 'NODEFAULT');
    if (!template) {
      template =
      this.parser.template('activateItem').replace('[ITEM]', this.parser.effect(item));
    }
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[TARGET]', this.parser.pokemon(kwArgs.of!)));
  }

  '|-status|'(args: Args['|-status|'], kwArgs: KWArgs['|-status|']) {
    const [, pokemon, status] = args;
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    if (LogFormatter.effectId(kwArgs.from) === 'rest') {
      const template = this.parser.template('startFromRest', status);
      return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
    }
    const template = this.parser.template('start', status);
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-curestatus|'(args: Args['|-curestatus|'], kwArgs: KWArgs['|-curestatus|']) {
    const [, pokemon, status] = args;
    if (LogFormatter.effectId(kwArgs.from) === 'naturalcure') {
      const template = this.parser.template('activate', kwArgs.from);
      return template.replace('[POKEMON]', this.parser.pokemon(pokemon));
    }
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    if (kwArgs.from?.startsWith('item:')) {
      const template = this.parser.template('endFromItem', status);
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[ITEM]', this.parser.effect(kwArgs.from)));
    }
    if (kwArgs.from?.startsWith('move') && THAWING.has(LogFormatter.effectId(kwArgs.from))) {
      const template = this.parser.template('endFromMove', status);
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[MOVE]', this.parser.effect(kwArgs.from)));
    }
    let template = this.parser.template('end', status, 'NODEFAULT');
    if (!template) template = this.parser.template('end').replace('[EFFECT]', status);
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-cureteam|'(args: Args['|-cureteam|'], kwArgs: KWArgs['|-cureteam|']) {
    return this.parser.template('activate', kwArgs.from);
  }

  '|-singleturn|'(args: Args['|-singleturn|'], kwArgs: KWArgs['|-singleturn|']) {
    return this.singleevent(args, kwArgs);
  }

  '|-singlemove|'(args: Args['|-singlemove|'], kwArgs: KWArgs['|-singlemove|']) {
    return this.singleevent(args, kwArgs);
  }

  private singleevent(
    args: Args['|-singleturn|' | '|-singlemove|'],
    kwArgs: KWArgs['|-singleturn|' | '|-singlemove|']
  ) {
    const [, pokemon, effect] = args;
    const line1 = this.parser.maybeAbility(effect, (kwArgs.of || pokemon)) ||
      this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    const id = LogFormatter.effectId(effect);
    if (id === 'roost' && !this.tracker.getPokemonTypeList(pokemon)?.includes('Flying')) return '';
    if (id === 'instruct') {
      const template = this.parser.template('activate', effect);
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(kwArgs.of!))
        .replace('[TARGET]', this.parser.pokemon(pokemon)));
    }
    let template = this.parser.template('start', effect, 'NODEFAULT');
    if (!template) {
      template =
      this.parser.template('start').replace('[EFFECT]', this.parser.effect(effect));
    }
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[SOURCE]', this.parser.pokemon(kwArgs.of!))
      .replace('[TEAM]', this.parser.team(pokemon.slice(0, 2))));
  }

  '|-sidestart|'(args: Args['|-sidestart|']) {
    const [, side, effect] = args;
    let template = this.parser.template('start', effect, 'NODEFAULT');
    if (!template) {
      template =
        this.parser.template('startTeamEffect').replace('[EFFECT]', this.parser.effect(effect));
    }
    return template
      .replace('[TEAM]', this.parser.team(side))
      .replace('[PARTY]', this.parser.party(side));
  }

  '|-sideend|'(args: Args['|-sideend|']) {
    const [, side, effect] = args;
    let template = this.parser.template('end', effect, 'NODEFAULT');
    if (!template) {
      template =
        this.parser.template('endTeamEffect').replace('[EFFECT]', this.parser.effect(effect));
    }
    return (template
      .replace('[TEAM]', this.parser.team(side))
      .replace('[PARTY]', this.parser.party(side)));
  }

  '|-weather|'(args: Args['|-weather|'], kwArgs: KWArgs['|-weather|']) {
    const [, weather] = args;
    let from: EffectName | MoveName | ID | undefined = kwArgs.from;
    if (!weather || weather === 'none') {
      from = WEATHERS[this.tracker.currentWeather()!];
      const template = this.parser.template('end', from, 'NODEFAULT');
      if (!template) {
        return (this.parser.template('endFieldEffect')
          .replace('[EFFECT]', this.parser.effect(weather)));
      }
      return template;
    }
    if (kwArgs.upkeep) {
      return this.parser.template('upkeep', weather, 'NODEFAULT');
    }
    const line1 = this.parser.maybeAbility(from, kwArgs.of!);
    let template = this.parser.template('start', weather, 'NODEFAULT');
    if (!template) {
      template =
        this.parser.template('startFieldEffect').replace('[EFFECT]', this.parser.effect(weather));
    }
    return line1 + template;
  }

  '|-fieldstart|'(args: Args['|-fieldstart|'], kwArgs: KWArgs['|-fieldstart|']) {
    return this.fieldbegin(args, kwArgs);
  }

  '|-fieldactivate|'(args: Args['|-fieldactivate|'], kwArgs: KWArgs['|-fieldactivate|']) {
    return this.fieldbegin(args, kwArgs);
  }

  private fieldbegin(
    args: Args['|-fieldstart|' | '|-fieldactivate|'],
    kwArgs: KWArgs['|-fieldstart|' | '|-fieldactivate|']
  ) {
    const [cmd, effect] = args;
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of!);
    let templateId = cmd.slice(6);
    if (LogFormatter.effectId(effect) === 'perishsong') templateId = 'start';
    let template = this.parser.template(templateId, effect, 'NODEFAULT');
    if (!template) {
      template =
        this.parser.template('startFieldEffect').replace('[EFFECT]', this.parser.effect(effect));
    }
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(kwArgs.of!));
  }

  '|-fieldend|'(args: Args['|-fieldend|']) {
    const [, effect] = args;
    let template = this.parser.template('end', effect, 'NODEFAULT');
    if (!template) {
      template =
        this.parser.template('endFieldEffect').replace('[EFFECT]', this.parser.effect(effect));
    }
    return template;
  }

  '|-sethp|'(_: Args['|-sethp|'], kwArgs: KWArgs['|-sethp|']) {
    return this.parser.template('activate', kwArgs.from);
  }

  '|-message|'(args: Args['|-message|']) {
    const [, message] = args;
    return `  ${message}\n`;
  }

  '|-hint|'(args: Args['|-hint|']) {
    const [, message] = args;
    return `  (${message})\n`;
  }

  '|-activate|'(args: Args['|-activate|'], kwArgs: KWArgs['|-activate|']) {
    let [, pokemon, effect, target] = args;
    const id = LogFormatter.effectId(effect);
    if (id === 'celebrate') {
      return (this.parser.template('activate', 'celebrate')
        .replace('[TRAINER]', this.parser.trainer(pokemon.slice(0, 2))));
    }
    const breaks = ['hyperspacefury', 'hyperspacehole', 'phantomforce', 'shadowforce', 'feint'];
    if (!target && breaks.includes(id)) {
      [pokemon, target] = [kwArgs.of!, pokemon];
      if (!pokemon) pokemon = target;
    }
    if (!target) target = kwArgs.of || pokemon;

    let line1 = this.parser.maybeAbility(effect, pokemon);

    if (id === 'lockon' || id === 'mindreader') {
      const template = this.parser.template('start', effect);
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(kwArgs.of!))
        .replace('[SOURCE]', this.parser.pokemon(pokemon)));
    }

    if (id === 'mummy') {
      const targetPokemon = target as PokemonIdent;
      line1 += this.parser.ability(kwArgs.ability, targetPokemon);
      line1 += this.parser.ability('Mummy', targetPokemon);
      const template = this.parser.template('changeAbility', 'mummy');
      return line1 + template.replace('[TARGET]', this.parser.pokemon(targetPokemon));
    }

    let templateId = 'activate';
    if (id === 'forewarn' && pokemon === target) {
      templateId = 'activateNoTarget';
    }
    let template = this.parser.template(templateId, effect, 'NODEFAULT');
    if (!template) {
      if (line1) return line1; // Abilities don't have a default template
      template = this.parser.template('activate');
      return line1 + template.replace('[EFFECT]', this.parser.effect(effect));
    }

    if (id === 'brickbreak') {
      template = template.replace('[TEAM]', this.parser.team(target.slice(0, 2)));
    }
    if (kwArgs.ability) {
      line1 += this.parser.ability(kwArgs.ability, pokemon);
    }
    if (kwArgs.ability2) {
      line1 += this.parser.ability(kwArgs.ability2, target as PokemonIdent);
    }
    if (kwArgs.move || kwArgs.number || kwArgs.item || kwArgs.name) {
      template = template
        .replace('[MOVE]', kwArgs.move!)
        .replace('[NUMBER]', kwArgs.number!)
        .replace('[ITEM]', kwArgs.item!)
        .replace('[NAME]', kwArgs.name!);
    }
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[TARGET]', this.parser.pokemon(target as PokemonIdent))
      .replace('[SOURCE]', this.parser.pokemon(kwArgs.of!)));
  }

  '|-prepare|'(args: Args['|-prepare|']) {
    const [, pokemon, effect, target] = args;
    const template = this.parser.template('prepare', effect);
    return (template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[TARGET]', this.parser.pokemon(target || '')));
  }

  '|-damage|'(args: Args['|-damage|'], kwArgs: KWArgs['|-damage|']) {
    const [, pokemon, health] = args;
    const percentage = kwArgs.from ? undefined : this.tracker.damagePercentage(pokemon, health);
    let template = this.parser.template('damage', kwArgs.from, 'NODEFAULT');
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    const id = LogFormatter.effectId(kwArgs.from);
    if (template) return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));

    if (!kwArgs.from) {
      template = this.parser.template(percentage ? 'damagePercentage' : 'damage');
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[PERCENTAGE]', percentage!));
    }
    if (kwArgs.from.startsWith('item:')) {
      template = this.parser.template(kwArgs.of ? 'damageFromPokemon' : 'damageFromItem');
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[ITEM]', this.parser.effect(kwArgs.from))
        .replace('[SOURCE]', this.parser.pokemon(kwArgs.of!)));
    }
    if (kwArgs.partiallytrapped || id === 'bind' || id === 'wrap') {
      template = this.parser.template('damageFromPartialTrapping');
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[MOVE]', this.parser.effect(kwArgs.from)));
    }

    template = this.parser.template('damage');
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-heal|'(args: Args['|-heal|'], kwArgs: KWArgs['|-heal|']) {
    const [, pokemon] = args;
    let template = this.parser.template('heal', kwArgs.from, 'NODEFAULT');
    const line1 = this.parser.maybeAbility(kwArgs.from, pokemon);
    if (template) {
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[SOURCE]', this.parser.pokemon(kwArgs.of!))
        .replace('[NICKNAME]', kwArgs.wisher!));
    }

    if (kwArgs.from && !kwArgs.from.startsWith('ability:')) {
      template = this.parser.template('healFromEffect');
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[EFFECT]', this.parser.effect(kwArgs.from)));
    }

    template = this.parser.template('heal');
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-boost|'(args: Args['|-boost|'], kwArgs: KWArgs['|-boost|']) {
    return this.boost(args, kwArgs);
  }

  '|-unboost|'(args: Args['|-unboost|'], kwArgs: KWArgs['|-unboost|']) {
    return this.boost(args, kwArgs);
  }

  private boost(
    args: Args['|-boost|' | '|-unboost|'],
    kwArgs: KWArgs['|-boost|' | '|-unboost|']
  ) {
    let [cmd, pokemon, stat, num] = args as [
      '-boost' | '-unboost', PokemonIdent, StatID | 'spc', Num
    ];
    if (stat === 'spd' && this.parser.gen === 1) return '';
    if (stat === 'spa' && this.parser.gen === 1) stat = 'spc';
    const amount = parseInt(num);
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    let templateId = cmd.slice(1);
    if (amount >= 3) templateId += '3';
    else if (amount >= 2) templateId += '2';
    else if (amount === 0) templateId += '0';
    if (amount && kwArgs.zeffect) {
      templateId += (kwArgs.multiple ? 'MultipleFromZEffect' : 'FromZEffect');
    } else if (amount && kwArgs.from?.startsWith('item:')) {
      const template = this.parser.template(templateId + 'FromItem', kwArgs.from);
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[STAT]', this.parser.stat(stat))
        .replace('[ITEM]', this.parser.effect(kwArgs.from)));
    }
    const template = this.parser.template(templateId, kwArgs.from);
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[STAT]', this.parser.stat(stat)));
  }

  '|-setboost|'(args: Args['|-setboost|'], kwArgs: KWArgs['|-setboost|']) {
    const [, pokemon] = args;
    const effect = kwArgs.from;
    const line1 = this.parser.maybeAbility(effect, kwArgs.of || pokemon);
    const template = this.parser.template('boost', effect);
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-swapboost|'(args: Args['|-swapboost|'], kwArgs: KWArgs['|-swapboost|']) {
    const [, pokemon, target] = args;
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    const id = LogFormatter.effectId(kwArgs.from);
    let templateId = 'swapBoost';
    if (id === 'guardswap') templateId = 'swapDefensiveBoost';
    if (id === 'powerswap') templateId = 'swapOffensiveBoost';
    const template = this.parser.template(templateId, kwArgs.from);
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[TARGET]', this.parser.pokemon(target)));
  }

  '|-copyboost|'(args: Args['|-copyboost|'], kwArgs: KWArgs['|-copyboost|']) {
    const [, pokemon, target] = args;
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    const template = this.parser.template('copyBoost', kwArgs.from);
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[TARGET]', this.parser.pokemon(target)));
  }

  '|-clearboost|'(args: Args['|-clearboost|'], kwArgs: KWArgs['|-clearboost|']) {
    return this.clearboost(args, kwArgs);
  }

  '|-clearpositiveboost|'(
    args: Args['|-clearpositiveboost|'],
    kwArgs: KWArgs['|-clearpositiveboost|']
  ) {
    return this.clearboost(args, kwArgs);
  }

  '|-clearnegativeboost|'(
    args: Args['|-clearnegativeboost|'],
    kwArgs: KWArgs['|-clearnegativeboost|']
  ) {
    return this.clearboost(args, kwArgs);
  }

  private clearboost(
    args: Args['|-clearboost|' | '|-clearpositiveboost|' | '|-clearnegativeboost|'],
    kwArgs: KWArgs['|-clearboost|' | '|-clearpositiveboost|' | '|-clearnegativeboost|']
  ) {
    const [, pokemon, source] = args;
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    let templateId = 'clearBoost';
    if ('zeffect' in kwArgs) templateId = 'clearBoostFromZEffect';
    const template = this.parser.template(templateId, kwArgs.from);
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[SOURCE]', this.parser.pokemon(source!)));
  }

  '|-invertboost|'(args: Args['|-invertboost|'], kwArgs: KWArgs['|-invertboost|']) {
    const [, pokemon] = args;
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    const template = this.parser.template('invertBoost', kwArgs.from);
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-clearallboost|'(args: Args['|-clearallboost|'], kwArgs: KWArgs['|-clearallboost|']) {
    return this.parser.template('clearAllBoost', kwArgs.from);
  }

  '|-crit|'(args: Args['|-crit|']) {
    return this.effectiveness(args);
  }

  '|-supereffective|'(args: Args['|-supereffective|']) {
    return this.effectiveness(args);
  }

  '|-resisted|'(args: Args['|-resisted|']) {
    return this.effectiveness(args);
  }

  private effectiveness(
    args: Args['|-crit|' | '|-supereffective|' | '|-resisted|']
  ) {
    const [cmd, pokemon] = args;
    let templateId = cmd.slice(1);
    if (templateId === 'supereffective') templateId = 'superEffective';
    if (this.parser.activeMoveIsSpread) templateId += 'Spread';
    const template = this.parser.template(templateId);
    return template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-block|'(args: Args['|-block|'], kwArgs: KWArgs['|-block|']) {
    const [, pokemon, effect, move, attacker] = args;
    const line1 = this.parser.maybeAbility(effect, kwArgs.of || pokemon);
    const template = this.parser.template('block', effect);
    return (line1 + template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[SOURCE]', this.parser.pokemon((attacker || kwArgs.of) as PokemonIdent))
      .replace('[MOVE]', move!));
  }

  '|-fail|'(args: Args['|-fail|'], kwArgs: KWArgs['|-fail|']) {
    const [, pokemon, effect, stat] = args;
    const id = LogFormatter.effectId(effect);
    const blocker = LogFormatter.effectId(kwArgs.from);
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    let templateId = 'block';
    if (['desolateland', 'primordialsea'].includes(blocker) &&
      !['sunnyday', 'raindance', 'sandstorm', 'hail'].includes(id)) {
      templateId = 'blockMove';
    } else if (blocker === 'uproar' && kwArgs.msg) {
      templateId = 'blockSelf';
    }
    let template = this.parser.template(templateId, kwArgs.from);
    if (template) {
      return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
    }

    if (id === 'unboost') {
      template = this.parser.template(stat ? 'failSingular' : 'fail', 'unboost');
      return (line1 + template
        .replace('[POKEMON]', this.parser.pokemon(pokemon))
        .replace('[STAT]', stat!));
    }

    templateId = 'fail';
    if (['brn', 'frz', 'par', 'psn', 'slp', 'substitute'].includes(id)) {
      templateId = 'alreadyStarted';
    }
    if (kwArgs.heavy) templateId = 'failTooHeavy';
    if (kwArgs.weak) templateId = 'fail';
    if (kwArgs.forme) templateId = 'failWrongForme';
    template = this.parser.template(templateId, id);
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-immune|'(args: Args['|-immune|'], kwArgs: KWArgs['|-immune|']) {
    const [, pokemon] = args;
    const line1 = this.parser.maybeAbility(kwArgs.from, kwArgs.of || pokemon);
    let template = this.parser.template('block', kwArgs.from);
    if (!template) {
      const templateId = kwArgs.ohko ? 'immuneOHKO' : 'immune';
      template = this.parser.template(pokemon ? templateId : 'immuneNoPokemon', kwArgs.from);
    }
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-miss|'(args: Args['|-miss|'], kwArgs: KWArgs['|-miss|']) {
    const [, source, pokemon] = args;
    const line1 = this.parser.maybeAbility(kwArgs.from, (kwArgs.of || pokemon) as PokemonIdent);
    if (!pokemon) {
      const template = this.parser.template('missNoPokemon');
      return line1 + template.replace('[SOURCE]', this.parser.pokemon(source));
    }
    const template = this.parser.template('miss');
    return line1 + template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-center|'() {
    return this.parser.template('center');
  }

  '|-ohko|'() {
    return this.parser.template('ohko');
  }

  '|-combine|'() {
    return this.parser.template('combine');
  }

  '|-notarget|'() {
    return this.parser.template('noTarget');
  }

  '|-mega|'(args: Args['|-mega|']) {
    return this.mega(args);
  }

  '|-primal|'(args: Args['|-primal|']) {
    return this.mega(args);
  }

  private mega(args: Args['|-mega|' | '|-primal|']) {
    const [cmd, pokemon, species, item] = args;
    let id = '';
    let templateId = cmd.slice(1);
    if (species === 'Rayquaza') {
      id = 'dragonascent';
      templateId = 'megaNoItem';
    }
    if (!id && cmd === '-mega' && this.parser.gen < 7) templateId = 'megaGen6';
    if (!item && cmd === '-mega') templateId = 'megaNoItem';
    let template = this.parser.template(templateId, id);
    const side = pokemon.slice(0, 2);
    const pokemonName = this.parser.pokemon(pokemon);
    if (cmd === '-mega') {
      const template2 = this.parser.template('transformMega');
      template += template2.replace('[POKEMON]', pokemonName).replace('[SPECIES]', species!);
    }
    return (template
      .replace('[POKEMON]', pokemonName)
      .replace('[ITEM]', item!)
      .replace('[TRAINER]', this.parser.trainer(side)));
  }

  '|-zpower|'(args: Args['|-zpower|']) {
    const [, pokemon] = args;
    const template = this.parser.template('zPower');
    return template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-burst|'(args: Args['|-burst|']) {
    const [, pokemon] = args;
    const template = this.parser.template('activate', 'Ultranecrozium Z');
    return template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-zbroken|'(args: Args['|-zbroken|']) {
    const [, pokemon] = args;
    const template = this.parser.template('zBroken');
    return template.replace('[POKEMON]', this.parser.pokemon(pokemon));
  }

  '|-hitcount|'(args: Args['|-hitcount|']) {
    const [, , num] = args;
    if (num === '1') {
      return this.parser.template('hitCountSingular');
    }
    return this.parser.template('hitCount').replace('[NUMBER]', num);
  }

  '|-waiting|'(args: Args['|-waiting|']) {
    const [, pokemon, target] = args;
    const template = this.parser.template('activate', 'Water Pledge');
    return (template
      .replace('[POKEMON]', this.parser.pokemon(pokemon))
      .replace('[TARGET]', this.parser.pokemon(target)));
  }

  '|-anim|'(args: Args['|-anim|'], kwArgs: KWArgs['|-anim|']) {
    this.parser.activeMoveIsSpread = !!kwArgs.spread;
    return '';
  }
}
