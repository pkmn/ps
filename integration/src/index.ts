import {Dex, TeamValidator, RandomPlayerAI, BattleStreams} from '@pkmn/sim';
import {Protocol} from '@pkmn/protocol';
import {Battle, Handler} from '@pkmn/client';
import {LogFormatter, BattlePostAdapter} from '@pkmn/view';

// @ts-ignore
import TeamA from './teams/a.txt';
// @ts-ignore
import TeamB from './teams/b.txt';



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
const formatter = new LogFormatter(0, new BattlePostAdapter(battle));

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
      display(formatter.formatHTML(args, kwArgs));
    }
	}
})();

void streams.omniscient.write(`>start ${JSON.stringify(spec)}
>player p1 ${JSON.stringify(p1spec)}
>player p2 ${JSON.stringify(p2spec)}`);
