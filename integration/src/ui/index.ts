import {Dex, Teams as DTeams, TeamValidator, RandomPlayerAI, BattleStreams, PRNG} from '@pkmn/sim';
import {Protocol, Handler, ArgName, ArgType, BattleArgsKWArgType} from '@pkmn/protocol';
import {Teams, Data, PokemonSet} from '@pkmn/sets';
import {Battle, Side, Pokemon} from '@pkmn/client';
import {TeamGenerators} from '@pkmn/randoms';
import {Sprites, Icons, GraphicsGen} from '@pkmn/img';
import {LogFormatter} from '@pkmn/view';
import {Generations, GenerationNum} from '@pkmn/data';

import fs from 'fs';

const TEAM_A = fs.readFileSync(__dirname + '/teams/a.txt', 'utf-8');
const TEAM_B = fs.readFileSync(__dirname + '/teams/b.txt', 'utf-8');

const FIXED = window.location.href.includes('fixed');
const FORMATS = [
  'gen1randombattle', 'gen2randombattle', 'gen3randombattle', 'gen4randombattle',
  'gen5randombattle', 'gen6randombattle', 'gen7randombattle', 'gen8randombattle',
  'gen7randomdoublesbattle', 'gen8randomdoublesbattle', 'gen8monotyperandombattle',
];
const prng = new PRNG();
const FORMAT = FIXED ? 'gen7anythinggoes' : prng.sample(FORMATS);
const validator = new TeamValidator(FORMAT);

const dex = Dex.forFormat(FORMAT);
DTeams.setGeneratorFactory(TeamGenerators);
const gens = new Generations(Dex as any);

const importTeam = (t: string, name: 'A' | 'B') => {
  const team = Teams.importTeam(t, dex as Data)!.team as PokemonSet[];
  const invalid = validator.validateTeam(team);
  if (invalid) throw new Error(`Team ${name} is invalid:\n\n${invalid.join('\n')}`);
  return team;
};

const SPRITES: {[gen in GenerationNum]: GraphicsGen[]} = {
  1: ['gen1rg', 'gen1rb', 'gen1'],
  2: ['gen2g', 'gen2s', 'gen2'],
  3: ['gen3rs', 'gen3frlg', 'gen3', 'gen3-2'],
  4: ['gen4dp', 'gen4dp-2', 'gen4'],
  5: ['gen5', 'gen5ani'],
  6: ['ani'],
  7: ['ani'],
  8: ['ani'],
};
const GEN = +FORMAT.charAt(3) as GenerationNum;
const GRAPHICS = prng.sample(SPRITES[GEN]);

const spec = {formatid: FORMAT};
const p1spec =
  FIXED ? {name: 'Bot A', team: DTeams.pack(importTeam(TEAM_A, 'A'))} : {name: 'Bot A'};
const p2spec =
  FIXED ? {name: 'Bot B', team: DTeams.pack(importTeam(TEAM_B, 'B'))} : {name: 'Bot B'};

const streams = BattleStreams.getPlayerStreams(new BattleStreams.BattleStream());

const p1 = new RandomPlayerAI(streams.p1);
const p2 = new RandomPlayerAI(streams.p2);

void p1.start();
void p2.start();

const $display = document.getElementById('display')!;
const $tr = document.createElement('tr');
let $log = document.createElement('td');
let $p1 = document.createElement('td');
let $p2 = document.createElement('td');

$tr.appendChild($p1);
$tr.appendChild($log);
$tr.appendChild($p2);
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
  for (const pokemon of side.team) {
    if (i % 3 === 0) {
      $div = document.createElement('div');
      $pdiv.appendChild($div);
    }
    const $span = document.createElement('span');
    const icon = Icons.getPokemon(pokemon.speciesForme, {
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

const displayPokemon = ($td: HTMLTableCellElement, pokemon: Pokemon | null) => {
  const img = addPokemon(pokemon);
  if (img) $td.appendChild(img);
};

const addPokemon = (pokemon: Pokemon | null) => {
  if (pokemon) {
    const sprite = Sprites.getPokemon(pokemon.speciesForme, {
      gen: GRAPHICS,
      gender: pokemon.gender || undefined,
      shiny: pokemon.shiny,
    });
    const $img = document.createElement('img');
    $img.src = sprite.url;
    $img.width = sprite.w;
    $img.height = sprite.h;
    $img.dataset.name = pokemon.name;
    if (pokemon.fainted) {
      $img.style.opacity = '0.3';
      $img.style.filter = 'grayscale(100%) brightness(.5)';
    }
    return $img;
  }
  return undefined;
};

class PreHandler implements Handler<void> {
  constructor(private readonly battle: Battle) {
    this.battle = battle;
  }

  '|faint|'(args: Protocol.Args['|faint|']) {
    const poke = this.battle.getPokemon(args[1]);
    if (poke) {
      const $td = poke.side.n ? $p2 : $p1;
      for (const child in $td.children) {
        if (($td.children[child] as HTMLImageElement).dataset.name === poke.name) {
          const old = $td.children[child];
          $td.insertBefore(addPokemon(poke)!, old);
          $td.removeChild(old);
          break;
        }
      }
    }
  }
}

class PostHandler implements Handler<void> {
  constructor(private readonly battle: Battle) {
    this.battle = battle;
  }

  '|teampreview|'() {
    displayTeam($p1, this.battle.p1);
    displayTeam($p2, this.battle.p2);
  }

  '|turn|'() {
    const $tr = document.createElement('tr');

    $p1 = document.createElement('td');
    for (const active of this.battle.p1.active) {
      displayPokemon($p1, active);
    }
    $log = document.createElement('td');
    $p2 = document.createElement('td');
    for (const active of this.battle.p2.active) {
      displayPokemon($p2, active);
    }

    $tr.appendChild($p1);
    $tr.appendChild($log);
    $tr.appendChild($p2);

    $display.appendChild($tr);
  }
}

const battle = new Battle(gens);
const formatter = new LogFormatter('p1', battle);

const pre = new PreHandler(battle);
const post = new PostHandler(battle);

const add = <T>(h: Handler<T>, k: ArgName | undefined, a: ArgType, kw: BattleArgsKWArgType) => {
  if (k && k in h) (h as any)[k](a, kw);
};

void (async () => {
  for await (const chunk of streams.omniscient) {
    console.log(chunk);

    // TODO: why does Parcel not like Protocol.parse?
    for (const line of chunk.split('\n')) {
      const {args, kwArgs} = Protocol.parseBattleLine(line);
      const html = formatter.formatHTML(args, kwArgs);
      const key = Protocol.key(args);

      add(pre, key, args, kwArgs);
      battle.add(args, kwArgs);
      add(post, key, args, kwArgs);

      displayLog(html);
    }
    battle.update();
  }
})();

void streams.omniscient.write(`>start ${JSON.stringify(spec)}
>player p1 ${JSON.stringify(p1spec)}
>player p2 ${JSON.stringify(p2spec)}`);
