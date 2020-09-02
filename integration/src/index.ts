// TODO: include @pkmn/randoms and support multiple generations (and sprites)
import {Dex, TeamValidator, RandomPlayerAI, BattleStreams} from '@pkmn/sim';
import {Protocol} from '@pkmn/protocol';
import {Teams, Data, PokemonSet} from '@pkmn/sets';
import {Battle, Side, Handler} from '@pkmn/client';
import {Sprites, Icons} from '@pkmn/img';
import {LogFormatter} from '@pkmn/view';

// @ts-ignore
import TEAM_A from './teams/a.txt';
// @ts-ignore
import TEAM_B from './teams/b.txt';

const FORMAT = 'gen7anythinggoes';
const dex = Dex.forFormat(FORMAT);
const validator = new TeamValidator(FORMAT);

const importTeam = (t: string, name: 'A' | 'B') => {
  const team = Teams.importTeam(t, dex as Data)!.team as PokemonSet[];
  const invalid = validator.validateTeam(team);
  if (invalid) throw new Error(`Team ${name} is invalid:\n\n${invalid.join('\n')}`);
  return team;
};

const spec = {formatid: FORMAT};
const p1spec = {name: 'Bot A', team: dex.packTeam(importTeam(TEAM_A, 'A'))};
const p2spec = {name: 'Bot B', team: dex.packTeam(importTeam(TEAM_B, 'B'))};

const streams = BattleStreams.getPlayerStreams(new BattleStreams.BattleStream());

const p1 = new RandomPlayerAI(streams.p1);
const p2 = new RandomPlayerAI(streams.p2);

const battle = new Battle();
const handler = new Handler(battle);
const formatter = new LogFormatter(0, battle);

void p1.start();
void p2.start();

const $display = document.getElementById('display')!;
const $tr = document.createElement('tr');
let $log = document.createElement('td');
let $teamPreview: {p1: HTMLTableCellElement; p2: HTMLTableCellElement} | undefined = {
  p1: document.createElement('td'),
  p2: document.createElement('td'),
};

$tr.appendChild($teamPreview.p1);
$tr.appendChild($log);
$tr.appendChild($teamPreview.p2);
$display.appendChild($tr);

const displayLog = (html: string) => {
  if (!html) return;
  const $div = document.createElement('div');
  $div.innerHTML = html;
  $log.appendChild($div);
};

const displayTeam = ($td: HTMLTableCellElement, side: Side) => {
  const $pdiv = document.createElement('div');
  let $div!: HTMLElement;
  let i = 0;
  for (const pokemon of side.pokemon) {
    if (i % 3 === 0) {
      $div = document.createElement('div');
      $pdiv.appendChild($div);
    }
    const $span = document.createElement('span');
    const icon = Icons.getPokemon(pokemon.getSpeciesForme(), {
      side: `p${side.n + 1}` as 'p1' | 'p2',
      gender: pokemon.gender || undefined,
      fainted: pokemon.fainted,
    });
    $span.style.display = icon.css.display;
    $span.style.width = icon.css.width;
    $span.style.height = icon.css.height;
    $span.style.imageRendering = icon.css.imageRendering;
    $span.style.background = icon.css.background;
    $span.style.opacity = icon.css.opacity;
    $span.style.filter = icon.css.filter;

    $div.appendChild($span);
    i++;
  }
  $td.appendChild($pdiv);
};

const displayPokemon = ($td: HTMLTableCellElement, side: Side) => {
  const active = side.active[0];
  if (active) {
    const sprite = Sprites.getPokemon(active.getSpeciesForme(), {
      gender: active.gender || undefined,
      shiny: active.shiny,
    });
    const $img = document.createElement('img');
    $img.src = sprite.url;
    $img.width = sprite.w;
    $img.height = sprite.h;
    if (active.fainted) {
      $img.style.opacity = '0.3';
      $img.style.filter = 'grayscale(100%) brightness(.5)';
    }
    $td.appendChild($img);
  }
};

let turn = 0;
void (async () => {
  for await (const chunk of streams.omniscient) {
    for (const line of chunk.split('\n')) {
      console.log(line);

      const {args, kwArgs} = Protocol.parseBattleLine(line);
      const html = formatter.formatHTML(args, kwArgs);
      const key = Protocol.key(args);
      if (key && key in handler) (handler as any)[key](args, kwArgs);

      if (battle.teamPreviewCount && $teamPreview) {
        displayTeam($teamPreview.p1, battle.p1);
        displayTeam($teamPreview.p2, battle.p2);
        $teamPreview = undefined;
      }

      if (battle.turn !== turn) {
        const $tr = document.createElement('tr');

        const $p1 = document.createElement('td');
        displayPokemon($p1, battle.p1);
        $log = document.createElement('td');
        const $p2 = document.createElement('td');
        displayPokemon($p2, battle.p2);

        $tr.appendChild($p1);
        $tr.appendChild($log);
        $tr.appendChild($p2);

        $display.appendChild($tr);
        turn = battle.turn;
      }
      displayLog(html);
    }
  }
})();

void streams.omniscient.write(`>start ${JSON.stringify(spec)}
>player p1 ${JSON.stringify(p1spec)}
>player p2 ${JSON.stringify(p2spec)}`);
