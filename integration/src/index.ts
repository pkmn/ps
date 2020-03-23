import {Dex, TeamValidator, RandomPlayerAI, BattleStreams} from '@pkmn/sim';
import {Protocol} from '@pkmn/protocol';
import {Battle, Handler} from '@pkmn/client';
import {TextParser, BattlePostAdapter} from '@pkmn/view';

// @ts-ignore
import TeamA from './teams/a.txt';
// @ts-ignore
import TeamB from './teams/b.txt';

function getString(str: any) {
	if (typeof str === 'string' || typeof str === 'number') return '' + str;
	return '';
}

function escapeHTML(str: string, jsEscapeToo?: boolean) {
  str = getString(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (jsEscapeToo) str = str.replace(/\\/g, '\\\\').replace(/'/g, '\\\'');
  return str;
}

// TODO
// case 'turn':
//   const h2elem = document.createElement('h2');
//   h2elem.className = 'battle-history';
//   let turnMessage;
//   if (this.battleParser) {
//     turnMessage = this.battleParser.parseArgs(args, {}).trim();
//     if (!turnMessage.startsWith('==') || !turnMessage.endsWith('==')) {
//       throw new Error("Turn message must be a heading.");
//     }
//     turnMessage = turnMessage.slice(2, -2).trim();
//     this.battleParser.curLineSection = 'break';
//   } else {
//     turnMessage = `Turn ${args[1]}`;
//   }
//   h2elem.innerHTML = BattleLog.escapeHTML(turnMessage);
//   this.addSpacer();
//   this.addNode(h2elem);
//   break;

function parseLogMessage(message: string) {
  return message.split('\n').map(line => {
    line = escapeHTML(line);
    line = line.replace(/\*\*(.*)\*\*/, '<strong>$1</strong>');
    line = line.replace(/\|\|([^\|]*)\|\|([^\|]*)\|\|/, '<abbr title="$1">$2</abbr>');
    if (line.startsWith('  ')) line = '<small>' + line.trim() + '</small>';
    return line;
  }).join('<br />');
}

const $display = document.getElementById('display')!;
function display(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;
  $display.appendChild(div);
}

Dex.includeModData();
const FORMAT = 'gen7anythinggoes';
const dex = Dex.forFormat(FORMAT);
const validator = new TeamValidator(FORMAT);

const teamA = dex.importTeam(TeamA)!;
let invalid = validator.validateTeam(teamA);
if (invalid) throw new Error(`Team A is invalid: ${invalid}`);
const teamB = dex.importTeam(TeamB)!;
invalid = validator.validateTeam(teamB);
if (invalid) throw new Error(`Team B is invalid: ${invalid}`);

const spec = {formatid: FORMAT};
const p1spec = {name: 'Bot A', team: dex.packTeam(teamA)};
const p2spec = {name: 'Bot B', team: dex.packTeam(teamB)};

const streams = BattleStreams.getPlayerStreams(new BattleStreams.BattleStream());

const p1 = new RandomPlayerAI(streams.p1);
const p2 = new RandomPlayerAI(streams.p2);

const battle = new Battle();
const handler = new Handler(battle);
const parser = new TextParser(0, new BattlePostAdapter(battle));

void p1.start();
void p2.start();

void (async () => {
	let chunk;
	// tslint:disable-next-line no-conditional-assignment
	while ((chunk = await streams.p1.read())) {
    for (const line of chunk.split('\n')) {
      const {args, kwArgs} = Protocol.parseBattleLine(line);
      const key = Protocol.key(args);
      if (key && key in handler) (handler as any)[key](args, kwArgs);
      display(parseLogMessage(parser.parse(args, kwArgs)));
    }
	}
})();

void streams.omniscient.write(`>start ${JSON.stringify(spec)}
>player p1 ${JSON.stringify(p1spec)}
>player p2 ${JSON.stringify(p2spec)}`);
