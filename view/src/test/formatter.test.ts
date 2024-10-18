import {PokemonDetails, PokemonIdent, Protocol} from '@pkmn/protocol';
import {SideID} from '@pkmn/types';

import {LogFormatter} from '../formatter';

// NOTE: tested exhaustively in integration/src/test/client.js
describe('LogFormatter', () => {
  it('formatText', () => {
    const formatter = new LogFormatter();
    const extractMessage = (buf: string) => {
      let out = '';
      for (const line of buf.split('\n')) {
        const {args, kwArgs} = Protocol.parseBattleLine(line);
        out += formatter.formatText(args, kwArgs);
      }
      return out;
    };

    expect(extractMessage(
      '|-activate|p2a: Cool.|move: Skill Swap|Speed Boost|Cute Charm|[of] p1a: Speedy'
    )).toEqual(
      '[The opposing Cool.\'s Speed Boost]\n' +
      '[Speedy\'s Cute Charm]\n' +
      '  The opposing Cool. swapped Abilities with its target!\n'
    );
    expect(extractMessage(
      '|-activate|p2a: Cool.|move: Skill Swap|p1a: Speedy|' +
      '[ability]Speed Boost|[ability2]Cute Charm'
    )).toEqual(
      '[The opposing Cool.\'s Speed Boost]\n' +
      '[Speedy\'s Cute Charm]\n' +
      '  The opposing Cool. swapped Abilities with its target!\n'
    );

    expect(extractMessage(
      '|move|p2a: Palkia|Swagger|p1a: Shroomish\n' +
      '|-boost|p1a: Shroomish|atk|2\n' +
      '|-start|p1a: Shroomish|confusion\n' +
      '|-activate|p1a: Shroomish|confusion\n' +
      '|move|p1a: Shroomish|Power-Up Punch|p2a: Palkia\n'
    )).toEqual(
      '\n' +
      'The opposing Palkia used **Swagger**!\n' +
      '  Shroomish\'s Attack rose sharply!\n' +
      '  Shroomish became confused!\n' +
      '\n' +
      '  Shroomish is confused!\n' +
      'Shroomish used **Power-Up Punch**!\n'
    );
  });

  it('formatHTML', () => {
    const formatter = new LogFormatter();
    const extractHTMLMessage = (buf: string) => {
      let out = '';
      for (const line of buf.split('\n')) {
        const {args, kwArgs} = Protocol.parseBattleLine(line);
        out += formatter.formatHTML(args, kwArgs);
      }
      return out;
    };

    expect(extractHTMLMessage(
      '|turn|23\n' +
      '|\n' +
      '|t:|1599943988\n' +
      '|switch|p1a: Toxicroak|Toxicroak, L86, F|230/283\n' +
      '|-activate|p2a: Salamence|confusion\n' +
      '|move|p2a: Salamence|Earthquake|p1a: Toxicroak\n' +
      '|-supereffective|p1a: Toxicroak\n' +
      '|-damage|p1a: Toxicroak|0 fnt\n' +
      '|faint|p1a: Toxicroak\n' +
      '|-ability|p2a: Salamence|Moxie|boost\n' +
      '|-boost|p2a: Salamence|atk|1\n' +
      '|\n' +
      '|upkeep\n'
    )).toEqual(
      '<h2>Turn 23</h2>' +
      'Go! <strong>Toxicroak</strong>!<br />' +
      '<small>The opposing Salamence is confused!</small><br />' +
      'The opposing Salamence used <strong>Earthquake</strong>!<br />' +
      '<small>It\'s super effective!</small><br />' +
      '<small>(Toxicroak was hurt!)</small><br />' +
      'Toxicroak fainted!<br />[The opposing Salamence\'s Moxie]<br />' +
      '<small>The opposing Salamence\'s Attack rose!</small><br />'
    );
  });

  it.todo('fixLowercase');

  it('pokemon', () => {
    const pokemon = (i: string, p: SideID = 'p1') =>
      new LogFormatter(p).pokemon(i as PokemonIdent);

    expect(pokemon('')).toBe('');
    expect(pokemon('p5: Bar')).toBe('???pokemon:p5: Bar???');
    expect(pokemon('p1: Foo')).toBe('Foo');
    expect(pokemon('p1: Foo', 'p2')).toBe('the opposing Foo');
    expect(pokemon('p2a: Foo', 'p2')).toBe('Foo');
  });

  it('pokemonFull', () => {
    const pokemonFull = (i: string, d: string, p: SideID = 'p1') =>
      new LogFormatter(p).pokemonFull(i as PokemonIdent, d as PokemonDetails);

    expect(pokemonFull('p5: Bar', 'Gengar')).toEqual(['p5', 'Bar (**Gengar**)']);
    expect(pokemonFull('p1: Clefable', 'Clefable, L50')).toEqual(['p1', '**Clefable**']);
    expect(pokemonFull('p1: Foo', 'Mew, shiny', 'p2')).toEqual(['p1', 'Foo (**Mew**)']);
    expect(pokemonFull('p2a: Blissey', 'Blissey', 'p2')).toEqual(['p2', '**Blissey**']);
  });

  it('escapeRegExp', () => {
    expect(LogFormatter.escapeRegExp('^([a-z]+|b)?.*c{0,3}&'))
      .toBe('\\^\\(\\[a-z\\]\\+\\|b\\)\\?\\.\\*c\\{0,3\\}&');
  });

  /* eslint-disable @stylistic/quotes */
  it('escapeHTML', () => {
    expect(LogFormatter.escapeHTML(`<html>"a & b"'\\n'</html>`))
      .toBe(`&lt;html&gt;&quot;a &amp; b&quot;'\\n'&lt;/html&gt;`);
    expect(LogFormatter.escapeHTML(`<html>"a & b"'\\n'</html>`, true))
      .toBe(`&lt;html&gt;&quot;a &amp; b&quot;\\'\\\\n\\'&lt;/html&gt;`);
  });
});
