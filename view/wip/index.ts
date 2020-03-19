// tslint:disable: no-async-without-await
import { Protocol, Args, ArgType, KWArgs } from '@pkmn/protocol';
import { StatName, ID } from '@pkmn/types';
import * as UNTYPED from './text.json';

const TEXT = UNTYPED as {
  default: {[templateName: string]: string},
  [id: string]: {[templateName: string]: string},
} & {
  [s in StatName]: {statName: string, statShortName: string}
};

function toID(s: string): ID {
  return ('' + s).toLowerCase().replace(/[^a-z0-9]+/g, '') as ID;
}

class BattleLogConverter {
  p1 = "Player 1";
	p2 = "Player 2";
	perspective: 0 | 1;
	gen = 8;
	curLineSection: 'break' | 'preMajor' | 'major' | 'postMajor' = 'break';
  lowercaseRegExp: RegExp | null | undefined = undefined;
  out_: (s: string) => void;

	constructor(perspective: 0 | 1 = 0) {
		this.perspective = perspective;
  }

  fixLowercase(input: string) {
		if (this.lowercaseRegExp === undefined) {
			const prefixes = ['pokemon', 'opposingPokemon', 'team', 'opposingTeam', 'party', 'opposingParty'].map(templateId => {
				const template = TEXT.default[templateId];
				if (template.charAt(0) === template.charAt(0).toUpperCase()) return '';
				const bracketIndex = template.indexOf('[');
				if (bracketIndex >= 0) return template.slice(0, bracketIndex);
				return template;
			}).filter(prefix => prefix);
			if (prefixes.length) {
				const buf = `((?:^|\n)(?:  |  \\\(|\\\[)?)(` +
					prefixes.map(BattleLogConverter.escapeRegExp).join('|') +
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
		const template = TEXT.default[side === this.perspective ? 'pokemon' : 'opposingPokemon'];
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
			return TEXT.default.team;
		}
		return TEXT.default.opposingTeam;
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
			return TEXT.default.party;
		}
		return TEXT.default.opposingParty;
	}

	static effectId(effect?: string) {
    return Protocol.parseEffect(effect, toID).name;
  }

  effect(effect?: string) {
    return Protocol.parseEffect(effect).name;
  }

  template(type: string, ...namespaces: (string | undefined)[]) {
		for (const namespace of namespaces) {
			if (!namespace) continue;
			if (namespace === 'OWN') {
				return TEXT.default[type + 'Own'] + '\n';
			}
			if (namespace === 'NODEFAULT') {
				return '';
			}
			let id = BattleLogConverter.effectId(namespace);
			if (TEXT[id] && type in TEXT[id]) {
				if (TEXT[id][type].charAt(1) === '.') type = TEXT[id][type].slice(2) as ID;
				if (TEXT[id][type].charAt(0) === '#') id = TEXT[id][type].slice(1) as ID;
				if (!TEXT[id][type]) return '';
				return TEXT[id][type] + '\n';
			}
		}
		if (!TEXT.default[type]) return '';
		return TEXT.default[type] + '\n';
  }

	maybeAbility(effect: string | undefined, holder: string) {
		if (!effect) return '';
		if (!effect.startsWith('ability:')) return '';
		return this.ability(effect.slice(8).trim(), holder);
	}

	ability(name: string | undefined, holder: string) {
		if (!name) return '';
		return TEXT.default.abilityActivation.replace('[POKEMON]', this.pokemon(holder)).replace('[ABILITY]', this.effect(name)) + '\n';
	}

	stat(stat: string) {
		const entry = TEXT[stat || "stats"];
		if (!entry || !entry.statName) return `???stat:${stat}???`;
		return entry.statName;
  }

  lineSection(args: ArgType, kwArgs: KWArgs) {
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
			const id = BattleLogConverter.effectId((kwArgs as KWArgs['-damage']).from);
			if (id === 'confusion') return 'major';
			return 'postMajor';
		}
		case '-curestatus': {
			const id = BattleLogConverter.effectId((kwArgs as KWArgs['-curestatus']).from);
			if (id === 'naturalcure') return 'preMajor';
			return 'postMajor';
		}
		case '-start': {
			const id = BattleLogConverter.effectId((kwArgs as KWArgs['-start']).from);
			if (id === 'protean') return 'preMajor';
			return 'postMajor';
		}
		case '-activate': {
			const id = BattleLogConverter.effectId((args as Args['-activate'])[2]);
			if (id === 'confusion' || id === 'attract') return 'preMajor';
			return 'postMajor';
		}
		}
		return (cmd.charAt(0) === '-' ? 'postMajor' : '');
	}

  sectionBreak(args: ArgType, kwArgs = {} as KWArgs) {
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

  out(args: ArgType, s?: string, kwArgs?: KWArgs, noSectionBreak?: boolean) {
		const buf = !noSectionBreak && this.sectionBreak(args, kwArgs) ? '\n' : '';
		this.out_(buf + this.fixLowercase(s || ''));
  }

  async 'player'(args: Args['player']) {
    const [, side, name] = args;
    if (side === 'p1' && name) {
      this.p1 = name;
    } else if (side === 'p2' && name) {
      this.p2 = name;
    }
    this.out(args, '');
  }

  async 'gen'(args: Args['gen']) {
    const [, gen] = args;
    this.gen = gen;
    this.out(args, '');
  }

  async 'turn'(args: Args['turn']) {
    const [, num] = args;
    this.out(args, this.template('turn').replace('[NUMBER]', num) + '\n');
  }

}