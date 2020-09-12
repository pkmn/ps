import {Protocol} from '@pkmn/protocol';

import {LogFormatter} from '../log-formatter';

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
      `|-activate|p2a: Cool.|move: Skill Swap|Speed Boost|Cute Charm|[of] p1a: Speedy`)
    ).toEqual(
      `[The opposing Cool.'s Speed Boost]` +
      `[Speedy's Cute Charm]` +
      `  The opposing Cool. swapped Abilities with its target!`);
    expect(extractMessage(
      `|-activate|p2a: Cool.|move: Skill Swap|p1a: Speedy|`+
      `[ability]Speed Boost|[ability2]Cute Charm`)
    ).toEqual(
      `[The opposing Cool.'s Speed Boost]` +
      `[Speedy's Cute Charm]` +
      `  The opposing Cool. swapped Abilities with its target!`);

    expect(
      `|move|p2a: Palkia|Swagger|p1a: Shroomish` +
      `|-boost|p1a: Shroomish|atk|2` +
      `|-start|p1a: Shroomish|confusion` +
      `|-activate|p1a: Shroomish|confusion` +
      `|move|p1a: Shroomish|Power-Up Punch|p2a: Palkia`
    ).toEqual(
      `The opposing Palkia used **Swagger**!` +
      `  Shroomish's Attack rose sharply!` +
      `  Shroomish became confused!` +
      `` +
      `  Shroomish is confused!` +
      `Shroomish used **Power-Up Punch**!`);
  });

  it('formatHTML', () => {
    // TODO
  });

  it.todo('fixLowercase');
  it.todo('escapeRegExp');
  it.todo('pokemon');
  it.todo('pokemonFull');
  it.todo('escapeHTML');
})