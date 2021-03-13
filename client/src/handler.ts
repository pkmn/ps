import {
  BoostName,
  Effect,
  ID,
  Item,
  MoveName,
  Specie,
  SpeciesName,
  StatusName,
  toID,
  TypeName,
} from '@pkmn/data';
import {Ability, Move} from '@pkmn/dex';
import {Protocol, Args, KWArgs, PokemonSearchID, PokemonIdent} from '@pkmn/protocol';

import {Battle, NULL, NA} from './battle';
import {Side} from './side';
import {LastItemEffect, Pokemon} from './pokemon';

const BOOSTS: BoostName[] = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'];
const CONSUMED: LastItemEffect[] = ['eaten', 'popped', 'consumed', 'held up'];

type Health = ReturnType<Pokemon['healthParse']>;
export interface Context {
  '|move|': {poke: Pokemon; move: Move | NA; poke2: Pokemon | null};
  '|cant|': {poke: Pokemon; effect: Effect | NA; move: Move | NA};
  '|switch|': {poke: Pokemon; health?: Health};
  '|drag|': {poke: Pokemon; health?: Health};
  '|replace|': {poke: Pokemon; health?: Health};
  '|faint|': {poke: Pokemon};
  '|swap|': {poke: Pokemon; poke2?: Pokemon; index?: number};
  '|-damage|': {poke: Pokemon; damage: Health; fromEffect?: Effect | NA; ofPoke?: Pokemon | null};
  '|-heal|': {poke: Pokemon; damage: Health; fromEffect?: Effect | NA};
  '|-sethp|': {poke1: Pokemon | null; health1?: Health; poke2: Pokemon | null; health2: Health};
  '|-boost|': {
    poke: Pokemon;
    boost: BoostName;
    amount: number;
    fromEffect?: Effect | NA;
    ofPoke?: Pokemon | null;
  };
  '|-unboost|': {
    poke: Pokemon;
    boost: BoostName;
    amount: number;
    fromEffect?: Effect | NA;
    ofPoke?: Pokemon | null;
  };
  '|-setboost|': {poke: Pokemon; boost: BoostName; amount: number};
  '|-swapboost|': {poke: Pokemon; poke2: Pokemon; boosts: BoostName[]};
  '|-clearpositiveboost|': {poke: Pokemon};
  '|-clearnegativeboost|': {poke: Pokemon};
  '|-copyboost|': {poke: Pokemon; poke2: Pokemon; boosts: BoostName[]};
  '|-clearboost|': {poke: Pokemon; fromEffect?: Effect | NA; ofPoke?: Pokemon | null};
  '|-invertboost|': {poke: Pokemon};
  '|-immune|': {poke: Pokemon; fromEffect: Effect | NA; ofPoke: Pokemon | null};
  '|-fail|': {poke: Pokemon; fromEffect: Effect | NA; ofPoke: Pokemon | null};
  '|-block|': {poke: Pokemon; effect: Effect | NA; ofPoke: Pokemon | null};
  '|-mustrecharge|': {poke: Pokemon};
  '|-status|': {poke: Pokemon; status: StatusName; fromEffect: Effect | NA; ofPoke: Pokemon | null};
  '|-curestatus|': {poke: Pokemon | null; status: StatusName};
  '|-cureteam|': {poke: Pokemon};
  '|-item|': {poke: Pokemon; item: Item | NA; fromEffect: Effect | NA; ofPoke: Pokemon | null};
  '|-enditem|': {poke: Pokemon; item: Item | NA; fromEffect: Effect | NA};
  '|-ability|': {
    poke: Pokemon;
    ability: Ability | NA;
    fromEffect: Effect | NA;
    ofPoke: Pokemon | null;
  };
  '|-endability|': {poke: Pokemon; ability: Ability | NA};
  '|detailschange|': {poke: Pokemon; species: Specie | NA};
  '|-transform|': {poke: Pokemon; poke2: Pokemon; fromEffect: Effect | NA};
  '|-formechange|': {poke: Pokemon; species: Specie | NA};
  '|-mega|': {poke: Pokemon; item?: Item | NA};
  '|-burst|': {poke: Pokemon; item?: Item | NA};
  '|-start|': {poke: Pokemon; effect: Effect | NA; fromEffect: Effect | NA; ofPoke: Pokemon | null};
  '|-end|': {poke: Pokemon; effect: Effect | NA};
  '|-singleturn|': {poke: Pokemon; effect: Effect | NA};
  '|-singlemove|': {poke: Pokemon; effect: Effect | NA};
  '|-activate|': {poke: Pokemon | null; effect: Effect | NA; poke2: Pokemon | null};
  '|-sidestart|': {side: Side; effect: Effect | NA};
  '|-sideend|': {side: Side; effect: Effect | NA};
  '|-weather|': {effect: Effect | NA; ability: Ability | NA; ofPoke: Pokemon | null};
  '|-fieldstart|': {effect: Effect | NA; fromEffect: Effect | NA; ofPoke: Pokemon | null};
  '|-fieldend|': {effect: Effect | NA};
  '|done|': {[k: string]: unknown};
  '|upkeep|': {[k: string]: unknown};
}

export class Handler implements Protocol.Handler {
  readonly battle: Battle;
  readonly player: ID | null;

  context?: Context[keyof Context];

  constructor(battle: Battle, player: ID | null = null) {
    this.battle = battle;
    this.player = player;
    this.context = {};
  }

  '|start|'() {
    const slots = this.battle.p1.active.length;
    for (let slot = 0; slot < slots; slot++) {
      this.battle.p1.active[slot] = null;
      this.battle.p2.active[slot] = null;
    }
  }

  '|upkeep|'() {
    this.battle.upkeep();
  }

  '|turn|'(args: Args['|turn|']) {
    this.battle.setTurn(args[1]);
  }

  '|request|'(args: Args['|request|']) {
    this.battle.request = Protocol.parseRequest(args[1]);
    this.battle.requestStatus = 'received';
  }

  '|tier|'(args: Args['|tier|']) {
    this.battle.tier = args[1];
    if (this.battle.tier.slice(-13) === 'Random Battle') {
      this.battle.speciesClause = true;
    }
  }

  '|gametype|'(args: Args['|gametype|']) {
    this.battle.gameType = args[1];
    switch (args[1]) {
    default:
      this.battle.p1.active = [null];
      this.battle.p2.active = [null];
      break;
    case 'doubles':
      this.battle.p1.active = [null, null];
      this.battle.p2.active = [null, null];
      break;
    case 'triples':
    case 'rotation':
      this.battle.p1.active = [null, null, null];
      this.battle.p2.active = [null, null, null];
      break;
    }
  }

  '|rule|'(args: Args['|rule|']) {
    const ruleName = args[1].split(': ')[0];
    if (ruleName === 'Species Clause') this.battle.speciesClause = true;
  }

  '|rated|'(args: Args['|rated|']) {
    this.battle.rated = args[1] || true;
  }

  '|inactive|'(args: Args['|inactive|']) {
    if (this.battle.kickingInactive === 'off') this.battle.kickingInactive = 'on-unknown';
    if (args[1].slice(0, 11) === 'Time left: ') {
      const [time, totalTime, graceTime] = args[1].split(' | ');
      this.battle.kickingInactive = parseInt(time.slice(11)) || 'on-unknown';
      this.battle.totalTimeLeft = parseInt(totalTime);
      this.battle.graceTimeLeft = parseInt(graceTime || '') || 0;
      if (this.battle.totalTimeLeft === this.battle.kickingInactive) this.battle.totalTimeLeft = 0;
      return;
    } else if (args[1].slice(0, 9) === 'You have ') {
      // this is ugly but parseInt is documented to work this way so I'm going to be lazy
      // and not chop off the rest of the sentence
      this.battle.kickingInactive = parseInt(args[1].slice(9)) || 'on-unknown';
      return;
    } else if (args[1].slice(-14) === ' seconds left.') {
      const hasIndex = args[1].indexOf(' has ');
      if (toID(args[1].slice(0, hasIndex)) === this.player) {
        this.battle.kickingInactive = parseInt(args[1].slice(hasIndex + 5)) || 'on-unknown';
      }
    }
  }

  '|inactiveoff|'() {
    this.battle.kickingInactive = 'off';
  }

  '|player|'(args: Args['|player|']) {
    const side = this.battle.getSide(args[1]);
    side.setName(args[2]!);
    if (args[3]) side.setAvatar(args[3]);
    if (args[4]) side.rating = args[4];
  }

  '|teamsize|'(args: Args['|teamsize|']) {
    this.battle.getSide(args[1]).totalPokemon = parseInt(args[2]);
  }

  '|clearpoke|'() {
    this.battle.p1.clearPokemon();
    this.battle.p2.clearPokemon();
  }

  '|poke|'(args: Args['|poke|']) {
    const pokemon = this.battle.rememberTeamPreviewPokemon(args[1], args[2])!;
    if (args[3] === 'item') pokemon.teamPreviewItem = true;
  }

  '|teampreview|'(args: Args['|teampreview|']) {
    this.battle.teamPreviewCount = args[1] ? parseInt(args[1]) : 6;
  }

  '|switch|'(args: Args['|switch|']) {
    this.switch(args);
  }

  '|drag|'(args: Args['|drag|']) {
    this.switch(args);
  }

  '|replace|'(args: Args['|replace|']) {
    this.switch(args);
  }

  switch(args: Args['|switch|' | '|drag|' | '|replace|']) {
    const c = this.context = {} as Context['|switch|' | '|drag|' | '|replace|'];
    c.poke = this.battle.getSwitchedPokemon(args[1], args[2])!;
    const slot = c.poke.slot;
    if (args[3]) c.health = c.poke.healthParse(args[3]);
    c.poke.removeVolatile('itemremoved' as ID);
    if (args[0] === 'switch') {
      if (c.poke.side.active[slot]) {
        c.poke.side.switchOut(c.poke.side.active[slot]!);
      }
      c.poke.side.switchIn(c.poke);
    } else if (args[0] === 'replace') {
      c.poke.side.replace(c.poke);
    } else {
      c.poke.side.dragIn(c.poke);
    }
  }

  '|faint|'(args: Args['|faint|']) {
    const c = this.context = {poke: this.battle.getPokemon(args[1])!} as Context['|faint|'];
    c.poke.side.faint(c.poke);
  }

  '|swap|'(args: Args['|swap|']) {
    const c = this.context = {} as Context['|swap|'];
    if (isNaN(Number(args[2]))) {
      c.poke = this.battle.getPokemon(args[1])!;
      c.poke2 = this.battle.getPokemon(args[2] as PokemonIdent)!;
      c.poke.side.swapWith(c.poke, c.poke2);
    } else {
      c.poke = this.battle.getPokemon(args[1])!;
      c.index = parseInt(args[2]!);
      c.poke.side.swapTo(c.poke, c.index);
    }
  }

  '|move|'(args: Args['|move|'], kwArgs: KWArgs['|move|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      move: this.battle.get('moves', args[2]),
      poke2: this.battle.getPokemon(args[3]),
    } as Context['|move|'];
    this.battle.checkActive(c.poke);
    c.poke.useMove(c.move as Partial<Move> & NA, c.poke2, kwArgs.from);
  }

  '|cant|'(args: Args['|cant|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      effect: this.battle.get('effects', args[2]),
      move: this.battle.get('moves', args[3]),
    } as Context['|cant|'];
    c.poke.cantUseMove(c.effect as Partial<Effect> & NA, c.move as Partial<Move> & NA);
  }

  '|gen|'(args: Args['|gen|']) {
    this.battle.gen = this.battle.gens.get(args[1]);
  }

  '|-damage|'(args: Args['|-damage|'], kwArgs: KWArgs['|-damage|']) {
    const c = this.context = {} as Context['|-damage|'];
    c.poke = this.battle.getPokemon(args[1])!;
    c.damage = c.poke.healthParse(args[2]);
    if (c.damage === null) return;
    if (c.damage[0]) c.poke.hurtThisTurn = true;

    if (kwArgs.from) {
      c.fromEffect = this.battle.get('effects', kwArgs.from);
      c.ofPoke = this.battle.getPokemon(kwArgs.of);
      if (c.ofPoke) c.ofPoke.activateAbility(c.fromEffect);
      if (c.fromEffect.kind === 'Item') {
        const itemPoke = c.ofPoke || c.poke;
        if (itemPoke.lastItem !== c.fromEffect.id &&
          !CONSUMED.includes(itemPoke.lastItemEffect as LastItemEffect)) {
          itemPoke.item = c.fromEffect.id;
        }
      }
    }
  }

  '|-heal|'(args: Args['|-heal|'], kwArgs: KWArgs['|-heal|']) {
    const c = this.context = {} as Context['|-heal|'];
    c.poke = this.battle.getPokemon(args[1])!;
    c.damage = c.poke.healthParse(args[2]);
    if (c.damage === null) return;

    if (kwArgs.from) {
      c.fromEffect = this.battle.get('effects', kwArgs.from);
      c.poke.activateAbility(c.fromEffect);
      if (c.fromEffect.kind === 'Item' &&
        !CONSUMED.includes(c.poke.lastItemEffect as LastItemEffect) &&
        c.poke.lastItem !== c.fromEffect.id) {
        c.poke.item = c.fromEffect.id;
      }
      if (c.fromEffect.id !== 'lunardance' || c.fromEffect.id !== 'healingwish') return;
      if (c.fromEffect.id === 'lunardance') {
        for (const moveSlot of c.poke.moveSlots) {
          moveSlot.ppUsed = 0;
        }
      }
    }
    this.battle.lastMove = 'healing-wish';
    c.poke.side.wisher = null;
  }

  '|-sethp|'(args: Args['|-sethp|']) {
    const c = this.context = {} as Context['|-sethp|'];
    for (let k = 0; k < 2; k++) {
      const poke = c[`poke${k + 1}` as 'poke1' | 'poke2'] =
        this.battle.getPokemon(args[1 + 2 * k] as PokemonIdent);
      if (poke) c[`health${k + 1}` as 'health1' | 'health2'] = poke.healthParse(args[2 + 2 * k]);
    }
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
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      boost: args[2],
    } as Context['|-boost|' | '|-unboost|'];
    if (this.battle.gen.num === 1 && c.boost === 'spd') return;
    // if (this.battle.gen.num === 1 && c.boost === 'spa') c.boost = 'spc';
    c.amount = parseInt(args[3]);
    if (c.amount === 0) return;

    if (!c.poke.boosts[c.boost]) c.poke.boosts[c.boost] = 0;
    if (args[0] === '-boost') {
      c.poke.boosts[c.boost]! += c.amount;
    } else {
      c.poke.boosts[c.boost]! -= c.amount;
    }

    if (!kwArgs.silent && kwArgs.from) {
      c.fromEffect = this.battle.get('effects', kwArgs.from);
      c.ofPoke = this.battle.getPokemon(kwArgs.of);
      (c.ofPoke || c.poke).activateAbility(c.fromEffect);
    }
  }

  '|-setboost|'(args: Args['|-setboost|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      boost: args[2],
    } as Context['|-setboost|'];
    c.amount = c.poke.boosts[c.boost] = parseInt(args[3]);
  }

  '|-swapboost|'(args: Args['|-swapboost|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      poke2: this.battle.getPokemon(args[2])!,
      boosts: args[3] ? args[3].split(', ') as BoostName[] : BOOSTS,
    } as Context['|-swapboost|'];

    for (const boost of c.boosts) {
      const tmp = c.poke.boosts[boost];
      c.poke.boosts[boost] = c.poke2.boosts[boost];
      if (!c.poke.boosts[boost]) delete c.poke.boosts[boost];
      c.poke2.boosts[boost] = tmp;
      if (!c.poke2.boosts[boost]) delete c.poke2.boosts[boost];
    }
  }

  '|-clearpositiveboost|'(args: Args['|-clearpositiveboost|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
    } as Context['|-clearpositiveboost|'];
    for (const boost in c.poke.boosts) {
      const b = boost as BoostName;
      if (c.poke.boosts[b]! > 0) delete c.poke.boosts[b];
    }
  }

  '|-clearnegativeboost|'(args: Args['|-clearnegativeboost|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
    } as Context['|-clearnegativeboost|'];
    for (const boost in c.poke.boosts) {
      const b = boost as BoostName;
      if (c.poke.boosts[b]! < 0) delete c.poke.boosts[b];
    }
  }

  '|-copyboost|'(args: Args['|-copyboost|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      poke2: this.battle.getPokemon(args[2])!,
      boosts: args[3] ? args[3].split(', ') as BoostName[] : BOOSTS,
    } as Context['|-copyboost|'];

    for (const boost of c.boosts) {
      c.poke.boosts[boost] = c.poke2.boosts[boost];
      if (!c.poke.boosts[boost]) delete c.poke.boosts[boost];
    }
    if (this.battle.gen.num >= 6) {
      const volatilesToCopy = ['focusenergy', 'laserfocus'];
      for (const volatile of volatilesToCopy) {
        if (c.poke2.volatiles[volatile]) {
          c.poke.addVolatile(volatile as ID);
        } else {
          c.poke.removeVolatile(volatile as ID);
        }
      }
    }
  }

  '|-clearboost|'(args: Args['|-clearboost|'], kwArgs: KWArgs['|-clearboost|']) {
    const c = this.context = {poke: this.battle.getPokemon(args[1])!} as Context['|-clearboost|'];
    c.poke.boosts = {};
    if (!kwArgs.silent && kwArgs.from) {
      c.fromEffect = this.battle.get('effects', kwArgs.from);
      c.ofPoke = this.battle.getPokemon(kwArgs.of);
      (c.ofPoke || c.poke).activateAbility(c.fromEffect);
    }
  }

  '|-invertboost|'(args: Args['|-invertboost|']) {
    const c = this.context = {poke: this.battle.getPokemon(args[1])!} as Context['|-invertboost|'];
    for (const boost in c.poke.boosts) {
      const b = boost as BoostName;
      c.poke.boosts[b] = -c.poke.boosts[b]!;
    }
  }

  '|-clearallboost|'() {
    for (const side of this.battle.sides) {
      for (const active of side.active) {
        if (active) active.boosts = {};
      }
    }
  }

  '|-immune|'(args: Args['|-immune|'], kwArgs: KWArgs['|-immune|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      fromEffect: this.battle.get('effects', kwArgs.from),
      ofPoke: this.battle.getPokemon(kwArgs.of),
    } as Context['|-immune|'];
    (c.ofPoke || c.poke).activateAbility(c.fromEffect);
  }

  '|-fail|'(args: Args['|-fail|'], kwArgs: KWArgs['|-fail|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      fromEffect: this.battle.get('effects', kwArgs.from),
      ofPoke: this.battle.getPokemon(kwArgs.of),
    } as Context['|-fail|'];
    (c.ofPoke || c.poke).activateAbility(c.fromEffect);
  }

  '|-block|'(args: Args['|-block|'], kwArgs: KWArgs['|-block|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      effect: this.battle.get('effects', args[2]),
      ofPoke: this.battle.getPokemon(kwArgs.of),
    } as Context['|-block|'];
    (c.ofPoke || c.poke).activateAbility(c.effect);
    switch (c.effect?.id) {
    case 'quickguard': case 'wideguard': case 'craftyshield': case 'matblock':
      return void c.poke.side.addSideCondition(c.effect);
    case 'protect': return c.poke.addVolatile('protect' as ID, {duration: 'turn'});
    case 'safetygoggles': return void (c.poke.item = 'safetygoggles' as ID);
    case 'protectivepads': return void (c.poke.item = 'protectivepads' as ID);
    }
  }

  '|-mustrecharge|'(args: Args['|-mustrecharge|']) {
    const c = this.context = {poke: this.battle.getPokemon(args[1])!} as Context['|-mustrecharge|'];
    c.poke.addVolatile('mustrecharge' as ID, {duration: 'move'});
  }

  '|-status|'(args: Args['|-status|'], kwArgs: KWArgs['|-status|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      status: args[2],
      fromEffect: this.battle.get('effects', kwArgs.from),
      ofPoke: this.battle.getPokemon(kwArgs.of),
    } as Context['|-status|'];
    const ofpoke = (c.ofPoke || c.poke);

    c.poke.status = c.status;
    c.poke.removeVolatile('yawn' as ID);
    ofpoke.activateAbility(c.fromEffect);

    if (c.fromEffect?.kind === 'Item') ofpoke.item = c.fromEffect.id;

    if (c.status === 'tox') {
      c.poke.statusData.toxicTurns = (c.fromEffect?.name === 'Toxic Orb' ? -1 : 0);
    } else if (c.status === 'slp' && c.fromEffect?.id === 'rest') {
      c.poke.statusData.sleepTurns = 0; // for Gen 2 use through Sleep Talk
    }
  }

  '|-curestatus|'(args: Args['|-curestatus|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1]),
      status: args[2],
    } as Context['|-curestatus|'];
    // TODO: confusion its own case and default the rest?
    if (c.poke) {
      c.poke.status = undefined;
      switch (c.status) {
      case 'brn': case 'par': case 'frz': break;
      case 'tox': case 'psn': return void (c.poke.statusData.toxicTurns = 0);
      case 'slp': return void (c.poke.statusData.sleepTurns = 0);
      default: return c.poke.removeVolatile('confusion' as ID);
      }
    }
  }

  '|-cureteam|'(args: Args['|-cureteam|']) {
    const c = this.context = {poke: this.battle.getPokemon(args[1])!} as Context['|-cureteam|'];
    // For old gens when the whole team was always cured
    for (const target of c.poke.side.team) {
      target.status = undefined;
    }
  }

  '|-item|'(args: Args['|-item|'], kwArgs: KWArgs['|-item|']): void {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      item: this.battle.get('items', args[2]),
      fromEffect: this.battle.get('effects', kwArgs.from),
      ofPoke: this.battle.getPokemon(kwArgs.of),
    } as Context['|-item|'];

    c.poke.item = c.item.id;
    c.poke.itemEffect = '';

    c.poke.removeVolatile('airballoon' as ID);
    if (c.item.id === 'airballoon') c.poke.addVolatile('airballoon' as ID);

    if (c.fromEffect?.id) {
      switch (c.fromEffect.id) {
      case 'pickup':
        c.poke.activateAbility('Pickup');
        // falls through
      case 'recycle': return void (c.poke.itemEffect = 'found');
      case 'frisk':
        c.ofPoke!.activateAbility('Frisk');
        if (c.poke && c.poke !== c.ofPoke) { // used for gen 6
          c.poke.itemEffect = 'frisked';
        }
        return;
      case 'magician':
      case 'pickpocket':
        c.poke.activateAbility(c.fromEffect.name);
        // falls through
      case 'thief':
      case 'covet':
        // simulate the removal of the item from the ofpoke
        c.ofPoke!.item = '';
        c.ofPoke!.itemEffect = '';
        c.ofPoke!.lastItem = c.item.id;
        c.ofPoke!.lastItemEffect = 'stolen';
        c.ofPoke!.addVolatile('itemremoved' as ID);
        return void (c.poke.itemEffect = 'stolen');
      case 'harvest':
        c.poke.itemEffect = 'harvested';
        return c.poke.activateAbility('Harvest');
      case 'bestow': return void (c.poke.itemEffect = 'bestowed');
      case 'switcheroo': case 'trick': return void (c.poke.itemEffect = 'tricked');
      }
    }
  }

  '|-enditem|'(args: Args['|-enditem|'], kwArgs: KWArgs['|-enditem|']): void {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      item: this.battle.get('items', args[2]),
      fromEffect: this.battle.get('effects', kwArgs.from),
    } as Context['|-enditem|'];

    c.poke.item = '';
    c.poke.itemEffect = '';
    c.poke.lastItem = c.item.id;
    c.poke.lastItemEffect = '';

    c.poke.removeVolatile('airballoon' as ID);
    c.poke.addVolatile('itemremoved' as ID);

    if (kwArgs.eat) {
      c.poke.lastItemEffect = 'eaten';
      this.battle.lastMove = c.item.id;
    } else if (kwArgs.weaken) {
      c.poke.lastItemEffect = 'eaten';
      this.battle.lastMove = c.item.id;
    } else if (c.fromEffect.id) {
      switch (c.fromEffect.id) {
      case 'fling': return void (c.poke.lastItemEffect = 'flung');
      case 'knockoff': return void (c.poke.lastItemEffect = 'knocked off');
      case 'stealeat': return void (c.poke.lastItemEffect = 'stolen');
      case 'gem': return void (c.poke.lastItemEffect = 'consumed');
      case 'incinerate': return void (c.poke.lastItemEffect = 'incinerated');
      }
    } else {
      switch (c.item.id) {
      case 'airballoon':
        c.poke.lastItemEffect = 'popped';
        c.poke.removeVolatile('airballoon' as ID);
        return;
      case 'focussash': return void (c.poke.lastItemEffect = 'consumed');
      case 'redcard': return void (c.poke.lastItemEffect = 'held up');
      default: return void (c.poke.lastItemEffect = 'consumed');
      }
    }
  }

  '|-ability|'(args: Args['|-ability|'], kwArgs: KWArgs['|-ability|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      ability: this.battle.get('abilities', args[2]),
      fromEffect: this.battle.get('effects', kwArgs.from),
      ofPoke: this.battle.getPokemon(kwArgs.of),
    } as Context['|-ability|'];

    c.poke.rememberAbility(c.ability.name, !!(c.fromEffect?.id && !kwArgs.fail));

    if (kwArgs.silent) return; // do nothing

    switch (c.fromEffect.id) {
    case 'trace':
      c.poke.activateAbility('Trace');
      c.poke.activateAbility(c.ability.name, true);
      c.ofPoke!.rememberAbility(c.ability.name);
      break;
    case 'powerofalchemy':
    case 'receiver':
      c.poke.activateAbility(c.fromEffect.name);
      c.poke.activateAbility(c.ability.name, true);
      c.ofPoke!.rememberAbility(c.ability.name);
      break;
    case 'roleplay':
      c.poke.activateAbility(c.ability.name, true);
      c.ofPoke!.rememberAbility(c.ability.name);
      break;
    case 'desolateland':
    case 'primordialsea':
    case 'deltastream':
      if (kwArgs.fail) c.poke.activateAbility(c.ability.name);
      break;
    default:
      c.poke.activateAbility(c.ability.name);
    }
  }

  '|-endability|'(args: Args['|-endability|']) {
    // deprecated; use |-start| for Gastro Acid
    // and the third arg of |-ability| for Entrainment et al
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      ability: this.battle.get('abilities', args[2]),
    } as Context['|-endability|'];
    c.poke.ability = ''; // '(suppressed)';
    if (c.ability?.id && !c.poke.baseAbility) c.poke.baseAbility = c.ability.id;
  }

  '|detailschange|'(args: Args['|detailschange|']) {
    const c = this.context = {poke: this.battle.getPokemon(args[1])!} as Context['|detailschange|'];
    c.poke.removeVolatile('formechange' as ID);
    c.poke.removeVolatile('typeadd' as ID);
    c.poke.removeVolatile('typechange' as ID);

    let newSpeciesForme: string = args[2];
    const commaIndex = newSpeciesForme.indexOf(',');
    if (commaIndex !== -1) {
      const level = newSpeciesForme.substr(commaIndex + 1).trim();
      if (level.charAt(0) === 'L') c.poke.level = parseInt(level.substr(1));
      newSpeciesForme = args[2].substr(0, commaIndex);
    }
    c.species = this.battle.get('species', newSpeciesForme);
    const species = c.species as Partial<Specie>;

    if (c.poke.illusion?.details === args[2]) {
      c.poke.revealedDetails = c.poke.details;
      return;
    }

    c.poke.speciesForme = newSpeciesForme;
    c.poke.ability = c.poke.baseAbility = (species.abilities ? toID(species.abilities['0']) : '');

    c.poke.details = args[2];
    c.poke.searchid = args[1].substr(0, 2) + args[1].substr(3) + '|' + args[2] as PokemonSearchID;
  }

  '|-transform|'(args: Args['|-transform|'], kwArgs: KWArgs['|-transform|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      poke2: this.battle.getPokemon(args[2])!,
      fromEffect: this.battle.get('effects', kwArgs.from),
    } as Context['|-transform|'];

    if (c.poke === c.poke2) throw new Error('Transforming into self');

    if (!kwArgs.silent) c.poke.activateAbility(c.fromEffect);

    c.poke.boosts = {...c.poke2.boosts};
    c.poke.copyTypesFrom(c.poke2);
    c.poke.ability = c.poke2.ability;
    const speciesForme = c.poke2.speciesForme as SpeciesName;
    const pokemon = c.poke2;
    const shiny = c.poke2.shiny;
    const gender = c.poke2.gender;
    c.poke.addVolatile('transform' as ID, {pokemon, shiny, gender});
    c.poke.addVolatile('formechange' as ID, {speciesForme});
    for (const moveSlot of c.poke2.moveSlots) {
      c.poke.rememberMove(moveSlot.name, 0);
    }
  }

  '|-formechange|'(args: Args['|-formechange|'], kwArgs: KWArgs['|-formechange|']) {
    const c = this.context = {poke: this.battle.getPokemon(args[1])!} as Context['|-formechange|'];
    c.poke.removeVolatile('typeadd' as ID);
    c.poke.removeVolatile('typechange' as ID);
    if (this.battle.gen.num >= 7) c.poke.removeVolatile('autotomize' as ID);

    if (!kwArgs.silent && kwArgs.from) {
      c.poke.activateAbility(this.battle.get('effects', kwArgs.from));
    }
    // the formechange volatile reminds us to revert the sprite change on switch-out
    c.species = this.battle.get('species', args[2]);
    const speciesForme = c.species.name as SpeciesName;
    c.poke.addVolatile('formechange' as ID, {speciesForme});
  }

  '|-mega|'(args: Args['|-mega|']) {
    return this.mega(args);
  }

  '|-burst|'(args: Args['|-burst|']) {
    return this.mega(args);
  }

  private mega(args: Args['|-mega|' | '|-burst|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
    } as Context['|-mega|' | '|-burst|'];
    if (args[3]) {
      c.item = this.battle.get('items', args[3]);
      c.poke.item = c.item.id;
    }
  }

  '|-start|'(args: Args['|-start|'], kwArgs: KWArgs['|-start|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      effect: this.battle.get('effects', args[2]),
      ofPoke: this.battle.getPokemon(kwArgs.of),
      fromEffect: this.battle.get('effects', kwArgs.from),
    } as Context['|-start|'];

    c.poke.activateAbility(c.effect);
    (c.ofPoke || c.poke).activateAbility(c.fromEffect);

    if (c.effect.id.startsWith('stockpile')) {
      c.poke.addVolatile('stockpile' as ID, {level: +c.effect.id.charAt(c.effect.id.length - 1)});
      return;
    } else if (c.effect.id.startsWith('perish')) {
      c.poke.addVolatile('perishsong' as ID, {
        duration: +c.effect.id.charAt(c.effect.id.length - 1),
      });
      return;
    }

    switch (c.effect.id) {
    case 'typechange':
      if (c.ofPoke && c.fromEffect?.id === 'reflecttype') {
        c.poke.copyTypesFrom(c.ofPoke);
      } else {
        c.poke.removeVolatile('typeadd' as ID);
        c.poke.addVolatile('typechange' as ID, {apparentType: sanitizeName(args[3]) || '???'});
      }
      break;
    case 'typeadd':
      c.poke.addVolatile('typeadd' as ID, {type: sanitizeName(args[3]) as TypeName});
      break;
    case 'dynamax':
      c.poke.addVolatile('dynamax' as ID);
      break;
    case 'autotomize':
      if (c.poke.volatiles.autotomize) {
        c.poke.volatiles.autotomize.level!++;
      } else {
        c.poke.addVolatile('autotomize' as ID, {level: 1});
      }
      break;
    case 'smackdown':
      c.poke.removeVolatile('magnetrise' as ID);
      c.poke.removeVolatile('telekinesis' as ID);
      break;
    }
    c.poke.addVolatile(c.effect.id);
  }

  '|-end|'(args: Args['|-end|'], kwArgs: KWArgs['|-end|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      effect: this.battle.get('effects', args[2]),
    } as Context['|-end|'];
    c.poke.removeVolatile(c.effect.id);

    if (kwArgs.silent) return; // do nothing
    if (c.effect.id === 'illusion') c.poke.rememberAbility('Illusion');
  }

  '|-singleturn|'(args: Args['|-singleturn|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      effect: this.battle.get('effects', args[2]),
    } as Context['|-singleturn|'];
    c.poke.addVolatile(c.effect.id, {duration: 'turn'});
    if (c.effect.id === 'focuspunch' || c.effect.id === 'shelltrap') {
      c.poke.rememberMove(c.effect.name as MoveName, 0);
    }
  }

  '|-singlemove|'(args: Args['|-singlemove|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1])!,
      effect: this.battle.get('effects', args[2]),
    } as Context['|-singlemove|'];
    c.poke.addVolatile(c.effect.id, {duration: 'move'});
  }

  '|-activate|'(args: Args['|-activate|'], kwArgs: KWArgs['|-activate|']) {
    const c = this.context = {
      poke: this.battle.getPokemon(args[1]),
      effect: this.battle.get('effects', args[2]),
      poke2: this.battle.getPokemon(args[3] as PokemonIdent),
    } as Context['|-activate|'];

    if (c.poke) c.poke.activateAbility(c.effect);

    switch (c.effect.id) {
    case 'poltergeist':
      c.poke!.item = toID(kwArgs.item);
      c.poke!.itemEffect = 'disturbed';
      break;
    case 'grudge':
      c.poke!.rememberMove(kwArgs.move!, Infinity);
      break;

      // move activations
    case 'brickbreak':
      c.poke2!.side.removeSideCondition('reflect' as ID);
      c.poke2!.side.removeSideCondition('lightscreen' as ID);
      break;
    case 'hyperspacefury':
    case 'hyperspacehole':
    case 'phantomforce':
    case 'shadowforce':
    case 'feint':
      c.poke!.removeVolatile('protect' as ID);
      c.poke!.side.removeSideCondition('wideguard' as ID);
      c.poke!.side.removeSideCondition('quickguard' as ID);
      c.poke!.side.removeSideCondition('craftyshield' as ID);
      c.poke!.side.removeSideCondition('matblock' as ID);
      break;
    case 'eeriespell':
    case 'gmaxdepletion':
    case 'spite':
      const move = this.battle.get('moves', kwArgs.move).name as MoveName;
      const pp = Number(kwArgs.number);
      c.poke!.rememberMove(move, isNaN(pp) ? 4 : pp);
      break;
    case 'gravity':
      c.poke!.removeVolatile('magnetrise' as ID);
      c.poke!.removeVolatile('telekinesis' as ID);
      break;
    case 'skillswap': case 'wanderingspirit':
      if (this.battle.gen.num <= 4) break;
      const pokeability = toID(kwArgs.ability) || c.poke2!.ability;
      const targetability = toID(kwArgs.ability2) || c.poke!.ability;
      if (pokeability) {
        c.poke!.ability = pokeability;
        if (!c.poke2!.baseAbility) c.poke2!.baseAbility = pokeability as ID;
      }
      if (targetability) {
        c.poke2!.ability = targetability;
        if (!c.poke!.baseAbility) c.poke!.baseAbility = targetability as ID;
      }
      if (c.poke!.side !== c.poke2!.side) {
        c.poke!.activateAbility(pokeability, true);
        c.poke2!.activateAbility(targetability, true);
      }
      break;

      // ability activations
    case 'forewarn':
      if (c.poke2) {
        c.poke2.rememberMove(kwArgs.move!, 0);
      } else {
        const foeActive = [];
        for (const maybeTarget of c.poke!.side.foe.active) {
          if (maybeTarget && !maybeTarget.fainted) foeActive.push(maybeTarget);
        }
        if (foeActive.length === 1) foeActive[0].rememberMove(kwArgs.move!, 0);
      }
      break;
    case 'mummy':
      if (!kwArgs.ability) break; // if Mummy activated but failed, no ability will have been sent
      const ability = this.battle.get('abilities', kwArgs.ability);
      c.poke2!.activateAbility(ability.name);
      if (c.poke) c.poke.activateAbility('Mummy');
      c.poke2!.activateAbility('Mummy', true);
      break;

      // item activations
    case 'leppaberry':
    case 'mysteryberry':
      c.poke!.rememberMove(kwArgs.move!, c.effect.id === 'leppaberry' ? -10 : -5);
      break;
    case 'focusband':
      c.poke!.item = 'focusband' as ID;
      break;
    }
  }

  '|-sidestart|'(args: Args['|-sidestart|']) {
    const c = this.context = {
      side: this.battle.getSide(args[1]),
      effect: this.battle.get('effects', args[2]),
    } as Context['|-sidestart|'];
    c.side.addSideCondition(c.effect);
  }

  '|-sideend|'(args: Args['|-sideend|']) {
    const c = this.context = {
      side: this.battle.getSide(args[1]),
      effect: this.battle.get('effects', args[2]),
    } as Context['|-sideend|'];
    c.side.removeSideCondition(c.effect.id);
  }

  '|-weather|'(args: Args['|-weather|'], kwArgs: KWArgs['|-weather|']) {
    const c = this.context = {
      effect: args[1] === 'none' ? NULL : this.battle.get('effects', args[1]),
      ability: this.battle.get('effects', kwArgs.from),
      ofPoke: this.battle.getPokemon(kwArgs.of),
    } as Context['|-weather|'];

    this.battle.field.setWeather(c.effect.id, c.ofPoke || undefined, !!kwArgs.upkeep, c.ability);
  }

  '|-fieldstart|'(args: Args['|-fieldstart|'], kwArgs: KWArgs['|-fieldstart|']) {
    const c = this.context = {
      effect: this.battle.get('effects', args[1]),
      fromEffect: this.battle.get('effects', kwArgs.from),
      ofPoke: this.battle.getPokemon(kwArgs.of),
    } as Context['|-fieldstart|'];

    if (c.ofPoke && c.fromEffect) c.ofPoke.activateAbility(c.fromEffect);

    if (c.effect.id.endsWith('terrain')) {
      this.battle.field.setTerrain(c.effect.id);
    } else {
      this.battle.field.addPseudoWeather(c.effect.id, 5, 0);
    }
  }

  '|-fieldend|'(args: Args['|-fieldend|']) {
    const c = this.context = {
      effect: this.battle.get('effects', args[1]),
    } as Context['|-fieldend|'];
    if (c.effect.id.endsWith('terrain')) {
      this.battle.field.setTerrain('');
    } else {
      this.battle.field.removePseudoWeather(c.effect.id);
    }
  }
}

function sanitizeName(name: any) {
  if (!name) return '';
  return ('' + name)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .slice(0, 50);
}
