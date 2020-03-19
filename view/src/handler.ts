import {Protocol, ArgType, Args, KWArgs} from '@pkmn/protocol';
import {ID, StatName, GenerationNum} from '@pkmn/types';
import * as TextJSON from '../data/text.json';

const Text = TextJSON as {
  default: {[templateName: string]: string},
  [id: string]: {[templateName: string]: string},
} & {
  [s in StatName]: {statName: string, statShortName: string}
};

function toID(s: string): ID {
  return ('' + s).toLowerCase().replace(/[^a-z0-9]+/g, '') as ID;
}

const VALS = ['pokemon', 'opposingPokemon', 'team', 'opposingTeam', 'party', 'opposingParty']; // TODO rename
export class TextParser implements Protocol.Handler {
  #out: (s: string) => void;
  #perspective: 0 | 1;

  #p1: Protocol.Username;
  #p2: Protocol.Username;
  #gen: GenerationNum;

  #curLineSection: 'break' | 'preMajor' | 'major' | 'postMajor';
  #lowercaseRegExp: RegExp | null | undefined;

  constructor(out: (s: string) => void, perspective: 0 | 1 = 0) {
    this.#out = out;
    this.#perspective = perspective;

    this.#p1 = 'Player 1' as Protocol.Username;
    this.#p2 = 'Player 2' as Protocol.Username;
    this.#gen = 8;

    this.#curLineSection = 'break';
    this.#lowercaseRegExp = undefined;
  }

  fixLowercase(input: string) {
    if (this.#lowercaseRegExp === undefined) {
      const prefixes = VALS.map(templateId => {
        const template = Text.default[templateId];
        if (template.charAt(0) === template.charAt(0).toUpperCase()) return '';
        const bracketIndex = template.indexOf('[');
        return bracketIndex >= 0 ? template.slice(0, bracketIndex) : template;
      }).filter(prefix => prefix);
      if (prefixes.length) {
        const buf = `((?:^|\n)(?:  |  \\\(|\\\[)?)(` +
          prefixes.map(TextParser.escapeRegExp).join('|') +
          `)`;
        this.#lowercaseRegExp = new RegExp(buf, 'g');
      } else {
        this.#lowercaseRegExp = null;
      }
    }
    if (!this.#lowercaseRegExp) return input;
    return input.replace(this.#lowercaseRegExp, (_, p1, p2) => (
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
    const template = Text.default[side === this.#perspective ? 'pokemon' : 'opposingPokemon'];
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
    if (side === 'p1') return this.#p1;
    if (side === 'p2') return this.#p2;
    return `???side:${side}???`;
  }

  team(side: string) {
    side = side.slice(0, 2);
    if (side === (this.#perspective === 0 ? 'p1' : 'p2')) {
      return Text.default.team;
    }
    return Text.default.opposingTeam;
  }

  own(side: string) {
    side = side.slice(0, 2);
    if (side === (this.#perspective === 0 ? 'p1' : 'p2')) {
      return 'OWN';
    }
    return '';
  }

  party(side: string) {
    side = side.slice(0, 2);
    if (side === (this.#perspective === 0 ? 'p1' : 'p2')) {
      return Text.default.party;
    }
    return Text.default.opposingParty;
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
      if (namespace === 'OWN') return `${Text.default[type + 'Own']}\n`;
      if (namespace === 'NODEFAULT') return '';
      let id = TextParser.effectId(namespace);
      if (Text[id] && type in Text[id]) {
        if (Text[id][type].charAt(1) === '.') type = Text[id][type].slice(2) as ID;
        if (Text[id][type].charAt(0) === '#') id = Text[id][type].slice(1) as ID;
        if (!Text[id][type]) return '';
        return `${Text[id][type]}\n`;
      }
    }
    if (!Text.default[type]) return '';
    return `${Text.default[type]}\n`;
  }

  maybeAbility(effect: string | undefined, holder: string) {
    if (!effect) return '';
    if (!effect.startsWith('ability:')) return '';
    return this.ability(effect.slice(8).trim(), holder);
  }

  ability(name: string | undefined, holder: string) {
    if (!name) return '';
    return (Text.default.abilityActivation
      .replace('[POKEMON]', this.pokemon(holder))
      .replace('[ABILITY]', this.effect(name)) + '\n');
  }

  stat(stat: string) {
    const entry = Text[stat || 'stats'];
    if (!entry || !entry.statName) return `???stat:${stat}???`;
    return entry.statName;
  }

  lineSection(args: ArgType, kwArgs: KWArgs) {
    const cmd = args[0];
    switch (cmd) {
      case 'done': case 'turn':
        return 'break';
      case 'move': case 'cant': case 'switch': case 'drag': case 'upkeep': case 'start': case '-mega':
        return 'major';
      case 'faint': /* case 'switchout': */
        return 'preMajor';
      case '-zpower':
        return 'postMajor';
      case '-damage': {
        const id = TextParser.effectId((kwArgs as KWArgs['-damage']).from);
        return id === 'confusion' ? 'major' : 'postMajor';
      }
      case '-curestatus': {
        const id = TextParser.effectId((kwArgs as KWArgs['-curestatus']).from);
        return id === 'naturalcure' ? 'preMajor' : 'postMajor';
      }
      case '-start': {
        const id = TextParser.effectId((kwArgs as unknown as KWArgs['-start']).from);
        return id === 'protean' ? 'preMajor' : 'postMajor';
      }
      case '-activate': {
        const id = TextParser.effectId((args as Args['-activate'])[2]);
        return id === 'confusion' || id === 'attract' ? 'preMajor' : 'postMajor';
      }
    }
    return (cmd.charAt(0) === '-' ? 'postMajor' : '');
  }

  sectionBreak(args: ArgType, kwArgs = {} as KWArgs) {
    const prevSection = this.#curLineSection;
    const curSection = this.lineSection(args, kwArgs);
    if (!curSection) return false;
    this.#curLineSection = curSection;
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

  out(args: ArgType, s?: string, kwArgs?: KWArgs, noSectionBreak?: boolean) {
    const buf = !noSectionBreak && this.sectionBreak(args, kwArgs) ? '\n' : '';
    this.#out(buf + this.fixLowercase(s || ''));
  }

  'init'(args: Args['init']) { }
  'title'(args: Args['title']) { }
  'userlist'(args: Args['userlist']) { }
  ''(args: Args['']) { }
  'html'(args: Args['html']) { }
  'uhtml'(args: Args['uhtml']) { }
  'uhtmlchange'(args: Args['uhtmlchange']) { }
  'join'(args: Args['join']) { }
  'leave'(args: Args['leave']) { }
  'name'(args: Args['name']) { }
  'chat'(args: Args['chat']) { }
  ':'(args: Args[':']) { }
  'c:'(args: Args['c:']) { }
  'battle'(args: Args['battle']) { }
  'popup'(args: Args['popup']) { }
  'pm'(args: Args['pm']) { }
  'usercount'(args: Args['usercount']) { }
  'nametaken'(args: Args['nametaken']) { }
  'challstr'(args: Args['challstr']) { }
  'updateuser'(args: Args['updateuser']) { }
  'formats'(args: Args['formats']) { }
  'updatesearch'(args: Args['updatesearch']) { }
  'updatechallenges'(args: Args['updatechallenges']) { }
  'queryresponse'(args: Args['queryresponse']) { }
  'unlink'(args: Args['unlink']) { }
  'raw'(args: Args['raw']) { }
  'warning'(args: Args['warning']) { }
  'error'(args: Args['error']) { }
  'bigerror'(args: Args['bigerror']) { }
  'chatmsg'(args: Args['chatmsg']) { }
  'chatmsg-raw'(args: Args['chatmsg-raw']) { }
  'controlshtml'(args: Args['controlshtml']) { }
  'fieldhtml'(args: Args['fieldhtml']) { }
  'debug'(args: Args['debug']) { }
  'tournament|create'(args: Args['tournament|create']) { }
  'tournament|update'(args: Args['tournament|update']) { }
  'tournament|updateEnd'(args: Args['tournament|updateEnd']) { }
  'tournament|error'(args: Args['tournament|error']) { }
  'tournament|forceend'(args: Args['tournament|forceend']) { }
  'tournament|join'(args: Args['tournament|join']) { }
  'tournament|leave'(args: Args['tournament|leave']) { }
  'tournament|replace'(args: Args['tournament|replace']) { }
  'tournament|start'(args: Args['tournament|start']) { }
  'tournament|disqualify'(args: Args['tournament|disqualify']) { }
  'tournament|battlestart'(args: Args['tournament|battlestart']) { }
  'tournament|battleend'(args: Args['tournament|battleend']) { }
  'tournament|end'(args: Args['tournament|end']) { }
  'tournament|autostart'(args: Args['tournament|autostart']) { }
  'tournament|autodq'(args: Args['tournament|autodq']) { }
  'player'(args: Args['player']) { }
  'teamsize'(args: Args['teamsize']) { }
  'gametype'(args: Args['gametype']) { }
  'gen'(args: Args['gen']) { }
  'tier'(args: Args['tier']) { }
  'rated'(args: Args['rated']) { }
  'seed'(args: Args['seed']) { }
  'rule'(args: Args['rule']) { }
  'teampreview'(args: Args['teampreview']) { }
  'clearpoke'(args: Args['clearpoke']) { }
  'poke'(args: Args['poke']) { }
  'start'(args: Args['start']) { }
  'done'(args: Args['done']) { }
  'request'(args: Args['request']) { }
  'inactive'(args: Args['inactive']) { }
  'inactiveoff'(args: Args['inactiveoff']) { }
  'upkeep'(args: Args['upkeep']) { }
  'turn'(args: Args['turn']) { }
  'win'(args: Args['win']) { }
  'tie'(args: Args['tie']) { }
  'move'(args: Args['move'], kwArgs: KWArgs['move']) { }
  'switch'(args: Args['switch']) { }
  'drag'(args: Args['drag']) { }
  'detailschange'(args: Args['detailschange'], kwArgs: KWArgs['detailschange']) { }
  'replace'(args: Args['replace']) { }
  'swap'(args: Args['swap']) { }
  'cant'(args: Args['cant'], kwArgs: KWArgs['cant']) { }
  'faint'(args: Args['faint']) { }
  '-formechange'(args: Args['-formechange'], kwArgs: KWArgs['-formechange']) { }
  '-fail'(args: Args['-fail'], kwArgs: KWArgs['-fail']) { }
  '-block'(args: Args['-block'], kwArgs: KWArgs['-block']) { }
  '-notarget'(args: Args['-notarget']) { }
  '-miss'(args: Args['-miss']) { }
  '-damage'(args: Args['-damage'], kwArgs: KWArgs['-damage']) { }
  '-heal'(args: Args['-heal'], kwArgs: KWArgs['-heal']) { }
  '-sethp'(args: Args['-sethp'], kwArgs: KWArgs['-sethp']) { }
  '-status'(args: Args['-status'], kwArgs: KWArgs['-status']) { }
  '-curestatus'(args: Args['-curestatus'], kwArgs: KWArgs['-curestatus']) { }
  '-cureteam'(args: Args['-cureteam'], kwArgs: KWArgs['-cureteam']) { }
  '-boost'(args: Args['-boost'], kwArgs: KWArgs['-boost']) { }
  '-unboost'(args: Args['-unboost'], kwArgs: KWArgs['-unboost']) { }
  '-setboost'(args: Args['-setboost'], kwArgs: KWArgs['-setboost']) { }
  '-swapboost'(args: Args['-swapboost'], kwArgs: KWArgs['-swapboost']) { }
  '-invertboost'(args: Args['-invertboost'], kwArgs: KWArgs['-invertboost']) { }
  '-clearboost'(args: Args['-clearboost']) { }
  '-clearallboost'(args: Args['-clearallboost']) { }
  '-clearpositiveboost'(args: Args['-clearpositiveboost']) { }
  '-ohko'(args: Args['-ohko']) { }
  '-clearnegativeboost'(args: Args['-clearnegativeboost'], kwArgs: KWArgs['-clearnegativeboost']) { }
  '-copyboost'(args: Args['-copyboost']) { }
  '-weather'(args: Args['-weather'], kwArgs: KWArgs['-weather']) { }
  '-fieldstart'(args: Args['-fieldstart']) { }
  '-fieldend'(args: Args['-fieldend'], kwArgs: KWArgs['-fieldend']) { }
  '-sidestart'(args: Args['-sidestart']) { }
  '-sideend'(args: Args['-sideend'], kwArgs: KWArgs['-sideend']) { }
  '-start'(args: Args['-start'], kwArgs: KWArgs['-start']) { }
  '-end'(args: Args['-end'], kwArgs: KWArgs['-end']) { }
  '-crit'(args: Args['-crit'], kwArgs: KWArgs['-crit']) { }
  '-supereffective'(args: Args['-supereffective'], kwArgs: KWArgs['-supereffective']) { }
  '-resisted'(args: Args['-resisted'], kwArgs: KWArgs['-resisted']) { }
  '-immune'(args: Args['-immune'], kwArgs: KWArgs['-immune']) { }
  '-item'(args: Args['-item'], kwArgs: KWArgs['-item']) { }
  '-enditem'(args: Args['-enditem'], kwArgs: KWArgs['-enditem']) { }
  '-ability'(args: Args['-ability'], kwArgs: KWArgs['-ability']) { }
  '-endability'(args: Args['-endability'], kwArgs: KWArgs['-endability']) { }
  '-transform'(args: Args['-transform'], kwArgs: KWArgs['-transform']) { }
  '-mega'(args: Args['-mega']) { }
  '-primal'(args: Args['-primal']) { }
  '-burst'(args: Args['-burst']) { }
  '-zpower'(args: Args['-zpower']) { }
  '-zbroken'(args: Args['-zbroken']) { }
  '-activate'(args: Args['-activate'], kwArgs: KWArgs['-activate']) { }
  '-fieldactivate'(args: Args['-fieldactivate']) { }
  '-hint'(args: Args['-hint']) { }
  '-center'(args: Args['-center']) { }
  '-message'(args: Args['-message']) { }
  '-combine'(args: Args['-combine']) { }
  '-waiting'(args: Args['-waiting']) { }
  '-prepare'(args: Args['-prepare']) { }
  '-mustrecharge'(args: Args['-mustrecharge']) { }
  '-hitcount'(args: Args['-hitcount']) { }
  '-singlemove'(args: Args['-singlemove']) { }
  '-singleturn'(args: Args['-singleturn'], kwArgs: KWArgs['-singleturn']) { }
  '-anim'(args: Args['-anim']) { }
}