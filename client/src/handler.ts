import {
  BoostID, Effect, ID, Move, MoveName,
  Specie, SpeciesName, toID, TypeName,
} from '@pkmn/data';
import {Protocol, Args, KWArgs, PokemonSearchID, PokemonIdent} from '@pkmn/protocol';

import {Battle, NULL, NA} from './battle';
import {LastItemEffect} from './pokemon';

const BOOSTS: BoostID[] = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'];
const CONSUMED: LastItemEffect[] = ['eaten', 'popped', 'consumed', 'held up'];

export class Handler implements Protocol.Handler {
  readonly battle: Battle;
  readonly player: ID | null;

  constructor(battle: Battle, player: ID | null = null) {
    this.battle = battle;
    this.player = player;
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
    case 'multi':
    case 'freeforall':
      // @ts-ignore readonly
      if (!this.battle.p3) this.battle.p3 = this.battle.createSide(3);
      // @ts-ignore readonly
      if (!this.battle.p4) this.battle.p4 = this.battle.createSide(4);
      this.battle.p3.foe = this.battle.p2;
      this.battle.p4.foe = this.battle.p1;
      if (this.battle.gameType === 'multi') {
        this.battle.p1.ally = this.battle.p3;
        this.battle.p2.ally = this.battle.p4;
        this.battle.p3.ally = this.battle.p1;
        this.battle.p4.ally = this.battle.p2;
      }

      this.battle.sides.push(this.battle.p3, this.battle.p4);
      // intentionally sync p1/p3 and p2/p4's active arrays
      this.battle.p1.active = this.battle.p3.active = [null, null];
      this.battle.p2.active = this.battle.p4.active = [null, null];
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
    default:
      for (const side of this.battle.sides) side.active = [null];
      break;
    }
  }

  '|rule|'(args: Args['|rule|']) {
    const ruleName = args[1].split(': ')[0];
    if (ruleName === 'Species Clause') this.battle.speciesClause = true;
    this.battle.rules[ruleName] = 1;
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
    if (args[3] === 'item' || args[3] === 'mail') pokemon.teamPreviewItem = true; // TODO: mail
  }

  '|teampreview|'(args: Args['|teampreview|']) {
    this.battle.teamPreviewCount = args[1] ? parseInt(args[1]) : 6;
  }

  '|updatepoke|'(args: Args['|updatepoke|']) {
    const {name, siden, pokemonid} = this.battle.parsePokemonId(args[1]);
    const side = this.battle.sides[siden];
    for (let i = 0; i < side.team.length; i++) {
      const pokemon = side.team[i];
      if (pokemon.details !== args[2] && pokemon.checkDetails(args[2])) {
        side.addPokemon(Protocol.parseDetails(name, pokemonid as PokemonIdent, args[2]), i);
        break;
      }
    }
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
    const poke = this.battle.getSwitchedPokemon(args[1], args[2])!;
    const slot = poke.slot;
    if (args[3]) poke.healthParse(args[3]);
    poke.removeVolatile('itemremoved' as ID);
    if (args[0] === 'switch') {
      if (poke.side.active[slot]) {
        poke.side.switchOut(poke.side.active[slot]!);
      }
      poke.side.switchIn(poke);
    } else if (args[0] === 'replace') {
      poke.side.replace(poke);
    } else {
      poke.side.dragIn(poke);
    }
  }

  '|faint|'(args: Args['|faint|']) {
    const poke = this.battle.getPokemon(args[1])!;
    poke.side.faint(poke);
  }

  '|swap|'(args: Args['|swap|']) {
    if (isNaN(Number(args[2]))) {
      const poke = this.battle.getPokemon(args[1])!;
      const poke2 = this.battle.getPokemon(args[2] as PokemonIdent)!;
      poke.side.swapWith(poke, poke2);
    } else {
      const poke = this.battle.getPokemon(args[1])!;
      const index = parseInt(args[2]!);
      poke.side.swapTo(poke, index);
    }
  }

  '|move|'(args: Args['|move|'], kwArgs: KWArgs['|move|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const move = this.battle.get('moves', args[2]) as Partial<Move> & NA;
    const poke2 = this.battle.getPokemon(args[3]);
    this.battle.checkActive(poke);
    poke.useMove(move, poke2, kwArgs.from as Protocol.EffectName | MoveName);
  }

  '|cant|'(args: Args['|cant|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const effect = this.battle.get('conditions', args[2]) as Partial<Effect> & NA;
    const move = this.battle.get('moves', args[3]) as Partial<Move> & NA;
    poke.cantUseMove(effect, move);
  }

  '|gen|'(args: Args['|gen|']) {
    this.battle.gen = this.battle.gens.get(args[1]);
  }

  '|-damage|'(args: Args['|-damage|'], kwArgs: KWArgs['|-damage|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const damage = poke.healthParse(args[2]);
    if (damage === null) return;
    if (damage[0]) poke.hurtThisTurn = true;

    if (kwArgs.from) {
      const fromEffect = this.battle.get('conditions', kwArgs.from);
      const ofPoke = this.battle.getPokemon(kwArgs.of);
      if (ofPoke) ofPoke.activateAbility(fromEffect);
      if (fromEffect.kind === 'Item') {
        const itemPoke = ofPoke || poke;
        if (itemPoke.lastItem !== fromEffect.id &&
          !CONSUMED.includes(itemPoke.lastItemEffect as LastItemEffect)) {
          itemPoke.item = fromEffect.id;
        }
      }
    }
  }

  '|-heal|'(args: Args['|-heal|'], kwArgs: KWArgs['|-heal|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const damage = poke.healthParse(args[2]);
    if (damage === null) return;

    if (kwArgs.from) {
      const fromEffect = this.battle.get('conditions', kwArgs.from);
      poke.activateAbility(fromEffect);
      if (fromEffect.kind === 'Item' &&
        !CONSUMED.includes(poke.lastItemEffect as LastItemEffect) &&
        poke.lastItem !== fromEffect.id) {
        poke.item = fromEffect.id;
      }
      if (fromEffect.id !== 'lunardance' || fromEffect.id !== 'healingwish') return;
      if (fromEffect.id === 'lunardance') {
        for (const moveSlot of poke.moveSlots) {
          moveSlot.ppUsed = 0;
        }
      }
    }
    this.battle.lastMove = 'healing-wish';
    poke.side.wisher = null;
    poke.statusState.sleepTurns = 0;
    poke.statusState.toxicTurns = 0;
  }

  '|-sethp|'(args: Args['|-sethp|']) {
    for (let k = 0; k < 2; k++) {
      const poke = this.battle.getPokemon(args[1 + 2 * k] as PokemonIdent);
      if (poke) poke.healthParse(args[2 + 2 * k]);
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
    const poke = this.battle.getPokemon(args[1])!;
    const boost = args[2];
    if (this.battle.gen.num === 1 && boost === 'spd') return;
    // if (this.battle.gen.num === 1 && boost === 'spa') boost = 'spc';
    const amount = parseInt(args[3]);
    if (amount === 0) return;

    if (!poke.boosts[boost]) poke.boosts[boost] = 0;
    if (args[0] === '-boost') {
      poke.boosts[boost]! += amount;
    } else {
      poke.boosts[boost]! -= amount;
    }

    if (!kwArgs.silent && kwArgs.from) {
      const fromEffect = this.battle.get('conditions', kwArgs.from);
      const ofPoke = this.battle.getPokemon(kwArgs.of);
      (ofPoke || poke).activateAbility(fromEffect);
    }
  }

  '|-setboost|'(args: Args['|-setboost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const boost = args[2];
    poke.boosts[boost] = parseInt(args[3]);
  }

  '|-swapboost|'(args: Args['|-swapboost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const poke2 = this.battle.getPokemon(args[2])!;
    const boosts = args[3] ? args[3].split(', ') as BoostID[] : BOOSTS;
    for (const boost of boosts) {
      const tmp = poke.boosts[boost];
      poke.boosts[boost] = poke2.boosts[boost];
      if (!poke.boosts[boost]) delete poke.boosts[boost];
      poke2.boosts[boost] = tmp;
      if (!poke2.boosts[boost]) delete poke2.boosts[boost];
    }
  }

  '|-clearpositiveboost|'(args: Args['|-clearpositiveboost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    for (const boost in poke.boosts) {
      const b = boost as BoostID;
      if (poke.boosts[b]! > 0) delete poke.boosts[b];
    }
  }

  '|-clearnegativeboost|'(args: Args['|-clearnegativeboost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    for (const boost in poke.boosts) {
      const b = boost as BoostID;
      if (poke.boosts[b]! < 0) delete poke.boosts[b];
    }
  }

  '|-copyboost|'(args: Args['|-copyboost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const poke2 = this.battle.getPokemon(args[2])!;
    const boosts = args[3] ? args[3].split(', ') as BoostID[] : BOOSTS;
    for (const boost of boosts) {
      poke.boosts[boost] = poke2.boosts[boost];
      if (!poke.boosts[boost]) delete poke.boosts[boost];
    }
    if (this.battle.gen.num >= 6) {
      const volatilesToCopy = ['focusenergy', 'laserfocus'];
      for (const volatile of volatilesToCopy) {
        if (poke2.volatiles[volatile]) {
          poke.addVolatile(volatile as ID);
        } else {
          poke.removeVolatile(volatile as ID);
        }
      }
    }
  }

  '|-clearboost|'(args: Args['|-clearboost|'], kwArgs: KWArgs['|-clearboost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    poke.boosts = {};
    if (!kwArgs.silent && kwArgs.from) {
      const fromEffect = this.battle.get('conditions', kwArgs.from);
      const ofPoke = this.battle.getPokemon(kwArgs.of);
      (ofPoke || poke).activateAbility(fromEffect);
    }
  }

  '|-invertboost|'(args: Args['|-invertboost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    for (const boost in poke.boosts) {
      const b = boost as BoostID;
      poke.boosts[b] = -poke.boosts[b]!;
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
    const poke = this.battle.getPokemon(args[1])!;
    const fromEffect = this.battle.get('conditions', kwArgs.from);
    const ofPoke = this.battle.getPokemon(kwArgs.of);
    (ofPoke || poke).activateAbility(fromEffect);
  }

  '|-fail|'(args: Args['|-fail|'], kwArgs: KWArgs['|-fail|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const fromEffect = this.battle.get('conditions', kwArgs.from);
    const ofPoke = this.battle.getPokemon(kwArgs.of);
    (ofPoke || poke).activateAbility(fromEffect);
  }

  '|-block|'(args: Args['|-block|'], kwArgs: KWArgs['|-block|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const effect = this.battle.get('conditions', args[2]);
    const ofPoke = this.battle.getPokemon(kwArgs.of);
    (ofPoke || poke).activateAbility(effect);
    switch (effect?.id) {
    case 'quickguard': case 'wideguard': case 'craftyshield': case 'matblock':
      return void poke.side.addSideCondition(effect);
    case 'protect': return poke.addVolatile('protect' as ID, {duration: 'turn'});
    case 'safetygoggles': return void (poke.item = 'safetygoggles' as ID);
    case 'protectivepads': return void (poke.item = 'protectivepads' as ID);
    }
  }

  '|-mustrecharge|'(args: Args['|-mustrecharge|']) {
    const poke = this.battle.getPokemon(args[1])!;
    poke.addVolatile('mustrecharge' as ID, {duration: 'move'});
  }

  '|-status|'(args: Args['|-status|'], kwArgs: KWArgs['|-status|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const status = args[2];
    const fromEffect = this.battle.get('conditions', kwArgs.from);
    const ofpoke = this.battle.getPokemon(kwArgs.of) || poke;

    poke.status = status;
    poke.removeVolatile('yawn' as ID);
    ofpoke.activateAbility(fromEffect);

    if (fromEffect?.kind === 'Item') ofpoke.item = fromEffect.id;

    if (status === 'tox') {
      poke.statusState.toxicTurns = (fromEffect?.name === 'Toxic Orb' ? -1 : 0);
    } else if (status === 'slp' && fromEffect?.id === 'rest') {
      poke.statusState.sleepTurns = 0; // for Gen 2 use through Sleep Talk
    }
  }

  '|-curestatus|'(args: Args['|-curestatus|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const status = args[2];
    // TODO: confusion its own case and default the rest?
    if (poke) {
      poke.status = undefined;
      switch (status) {
      case 'brn': case 'par': case 'frz': break;
      case 'tox': case 'psn': return void (poke.statusState.toxicTurns = 0);
      case 'slp': return void (poke.statusState.sleepTurns = 0);
      default: return poke.removeVolatile('confusion' as ID);
      }
    }
  }

  '|-cureteam|'(args: Args['|-cureteam|']) {
    const poke = this.battle.getPokemon(args[1])!;
    // For old gens when the whole team was always cured
    for (const target of poke.side.team) {
      target.status = undefined;
    }
  }

  '|-item|'(args: Args['|-item|'], kwArgs: KWArgs['|-item|']): void {
    const poke = this.battle.getPokemon(args[1])!;
    const item = this.battle.get('items', args[2]);
    const fromEffect = this.battle.get('conditions', kwArgs.from);
    const ofPoke = this.battle.getPokemon(kwArgs.of);

    poke.item = item.id;
    poke.itemEffect = '';

    poke.removeVolatile('airballoon' as ID);
    if (item.id === 'airballoon') poke.addVolatile('airballoon' as ID);

    if (fromEffect?.id) {
      switch (fromEffect.id) {
      case 'pickup':
        poke.activateAbility('Pickup');
        // falls through
      case 'recycle': return void (poke.itemEffect = 'found');
      case 'frisk':
        ofPoke!.activateAbility('Frisk');
        if (poke && poke !== ofPoke) { // used for gen 6
          poke.itemEffect = 'frisked';
        }
        return;
      case 'magician':
      case 'pickpocket':
        poke.activateAbility(fromEffect.name);
        // falls through
      case 'thief':
      case 'covet':
        // simulate the removal of the item from the ofpoke
        ofPoke!.item = '';
        ofPoke!.itemEffect = '';
        ofPoke!.lastItem = item.id;
        ofPoke!.lastItemEffect = 'stolen';
        ofPoke!.addVolatile('itemremoved' as ID);
        return void (poke.itemEffect = 'stolen');
      case 'harvest':
        poke.itemEffect = 'harvested';
        return poke.activateAbility('Harvest');
      case 'bestow': return void (poke.itemEffect = 'bestowed');
      case 'switcheroo': case 'trick': return void (poke.itemEffect = 'tricked');
      }
    }
  }

  '|-enditem|'(args: Args['|-enditem|'], kwArgs: KWArgs['|-enditem|']): void {
    const poke = this.battle.getPokemon(args[1])!;
    const item = this.battle.get('items', args[2]);
    const fromEffect = this.battle.get('conditions', kwArgs.from);

    if (this.battle.gen.num > 4 || fromEffect.id !== 'knockoff') {
      poke.item = '';
      poke.itemEffect = '';
      poke.lastItem = item.id;
      poke.lastItemEffect = '';
    }

    poke.removeVolatile('airballoon' as ID);
    poke.addVolatile('itemremoved' as ID);

    if (kwArgs.eat) {
      poke.lastItemEffect = 'eaten';
      this.battle.lastMove = item.id;
    } else if (kwArgs.weaken) {
      poke.lastItemEffect = 'eaten';
      this.battle.lastMove = item.id;
    } else if (fromEffect.id) {
      switch (fromEffect.id) {
      case 'fling': return void (poke.lastItemEffect = 'flung');
      case 'knockoff': {
        if (this.battle.gen.num <= 4) {
          poke.itemEffect = 'knocked off';
        } else {
          poke.lastItemEffect = 'knocked off';
        }
        return;
      }
      case 'stealeat': return void (poke.lastItemEffect = 'stolen');
      case 'gem': return void (poke.lastItemEffect = 'consumed');
      case 'incinerate': return void (poke.lastItemEffect = 'incinerated');
      }
    } else {
      switch (item.id) {
      case 'airballoon':
        poke.lastItemEffect = 'popped';
        poke.removeVolatile('airballoon' as ID);
        return;
      case 'focussash': return void (poke.lastItemEffect = 'consumed');
      case 'redcard': return void (poke.lastItemEffect = 'held up');
      default: return void (poke.lastItemEffect = 'consumed');
      }
    }
  }

  '|-ability|'(args: Args['|-ability|'], kwArgs: KWArgs['|-ability|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const ability = this.battle.get('abilities', args[2]);
    const fromEffect = this.battle.get('conditions', kwArgs.from);
    const ofPoke = this.battle.getPokemon(kwArgs.of);

    poke.rememberAbility(ability.name, !!(fromEffect?.id && !kwArgs.fail));

    if (kwArgs.silent) return; // do nothing

    switch (fromEffect.id) {
    case 'trace':
      poke.activateAbility('Trace');
      poke.activateAbility(ability.name, true);
      ofPoke!.rememberAbility(ability.name);
      break;
    case 'powerofalchemy':
    case 'receiver':
      poke.activateAbility(fromEffect.name);
      poke.activateAbility(ability.name, true);
      ofPoke!.rememberAbility(ability.name);
      break;
    case 'roleplay':
      poke.activateAbility(ability.name, true);
      ofPoke!.rememberAbility(ability.name);
      break;
    case 'desolateland':
    case 'primordialsea':
    case 'deltastream':
      if (kwArgs.fail) poke.activateAbility(ability.name);
      break;
    default:
      poke.activateAbility(ability.name);
    }
  }

  '|-endability|'(args: Args['|-endability|']) {
    // deprecated; use |-start| for Gastro Acid
    // and the third arg of |-ability| for Entrainment et al
    const poke = this.battle.getPokemon(args[1])!;
    const ability = this.battle.get('abilities', args[2]);
    poke.ability = ''; // '(suppressed)';
    if (ability?.id && !poke.baseAbility) poke.baseAbility = ability.id;
  }

  '|detailschange|'(args: Args['|detailschange|']) {
    const poke = this.battle.getPokemon(args[1])!;
    poke.removeVolatile('formechange' as ID);
    poke.removeVolatile('typeadd' as ID);
    poke.removeVolatile('typechange' as ID);

    let newSpeciesForme: string = args[2];
    const commaIndex = newSpeciesForme.indexOf(',');
    if (commaIndex !== -1) {
      const level = newSpeciesForme.substr(commaIndex + 1).trim();
      if (level.charAt(0) === 'L') poke.level = parseInt(level.substr(1));
      newSpeciesForme = args[2].substr(0, commaIndex);
    }

    const species = this.battle.get('species', newSpeciesForme) as Partial<Specie>;
    if (poke.illusion?.details === args[2]) {
      poke.revealedDetails = poke.details;
      return;
    }

    poke.speciesForme = newSpeciesForme;
    poke.ability = poke.baseAbility = (species.abilities ? toID(species.abilities['0']) : '');

    poke.details = args[2];
    poke.searchid = args[1].substr(0, 2) + args[1].substr(3) + '|' + args[2] as PokemonSearchID;
  }

  '|-transform|'(args: Args['|-transform|'], kwArgs: KWArgs['|-transform|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const poke2 = this.battle.getPokemon(args[2])!;
    const fromEffect = this.battle.get('conditions', kwArgs.from);
    if (poke === poke2) throw new Error('Transforming into self');

    if (!kwArgs.silent) poke.activateAbility(fromEffect);

    poke.boosts = {...poke2.boosts};
    poke.copyTypesFrom(poke2);
    poke.ability = poke2.ability;
    const speciesForme = poke2.speciesForme as SpeciesName;
    const pokemon = poke2;
    const shiny = poke2.shiny;
    const gender = poke2.gender;
    const level = poke.level;
    poke.addVolatile('transform' as ID, {pokemon, shiny, gender, level});
    poke.addVolatile('formechange' as ID, {speciesForme});
    for (const moveSlot of poke2.moveSlots) {
      poke.rememberMove(moveSlot.name, 0);
    }
  }

  '|-formechange|'(args: Args['|-formechange|'], kwArgs: KWArgs['|-formechange|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const species = this.battle.get('species', args[2]);
    const speciesForme = species.name as SpeciesName;
    if (!speciesForme.endsWith('-Gmax') && !species.name.endsWith('-Gmax')) {
      poke.removeVolatile('typeadd' as ID);
      poke.removeVolatile('typechange' as ID);
      if (this.battle.gen.num >= 6) poke.removeVolatile('autotomize' as ID);
    }

    if (!kwArgs.silent && kwArgs.from) {
      poke.activateAbility(this.battle.get('conditions', kwArgs.from));
    }

    // the formechange volatile reminds us to revert the sprite change on switch-out
    poke.addVolatile('formechange' as ID, {speciesForme});
  }

  '|-mega|'(args: Args['|-mega|']) {
    return this.mega(args);
  }

  '|-burst|'(args: Args['|-burst|']) {
    return this.mega(args);
  }

  private mega(args: Args['|-mega|' | '|-burst|']) {
    const poke = this.battle.getPokemon(args[1])!;
    if (args[3]) {
      const item = this.battle.get('items', args[3]);
      poke.item = item.id;
    }
  }

  '|-start|'(args: Args['|-start|'], kwArgs: KWArgs['|-start|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const effect = this.battle.get('conditions', args[2]);
    const ofPoke = this.battle.getPokemon(kwArgs.of);
    const fromEffect = this.battle.get('conditions', kwArgs.from);

    poke.activateAbility(effect);
    (ofPoke || poke).activateAbility(fromEffect);

    if (effect.id.startsWith('stockpile')) {
      poke.addVolatile('stockpile' as ID, {level: +effect.id.charAt(effect.id.length - 1)});
      return;
    } else if (effect.id.startsWith('perish')) {
      poke.addVolatile('perishsong' as ID, {
        duration: +effect.id.charAt(effect.id.length - 1),
      });
      return;
    }

    switch (effect.id) {
    case 'typechange':
      if (ofPoke && fromEffect?.id === 'reflecttype') {
        poke.copyTypesFrom(ofPoke);
      } else {
        poke.removeVolatile('typeadd' as ID);
        poke.addVolatile('typechange' as ID, {apparentType: sanitizeName(args[3]) || '???'});
      }
      break;
    case 'typeadd':
      poke.addVolatile('typeadd' as ID, {type: sanitizeName(args[3]) as TypeName});
      break;
    case 'dynamax':
      poke.addVolatile('dynamax' as ID, args[3] ? {} : undefined);
      break;
    case 'autotomize':
      if (poke.volatiles.autotomize) {
        poke.volatiles.autotomize.level!++;
      } else {
        poke.addVolatile('autotomize' as ID, {level: 1});
      }
      break;
    case 'smackdown':
      poke.removeVolatile('magnetrise' as ID);
      poke.removeVolatile('telekinesis' as ID);
      break;
    }
    poke.addVolatile(effect.id);
  }

  '|-end|'(args: Args['|-end|'], kwArgs: KWArgs['|-end|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const effect = this.battle.get('conditions', args[2]);
    poke.removeVolatile(effect.id);

    if (kwArgs.silent) return; // do nothing
    if (effect.id === 'illusion') poke.rememberAbility('Illusion');
  }

  '|-singleturn|'(args: Args['|-singleturn|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const effect = this.battle.get('conditions', args[2]);
    if (effect.id === 'roost' && !poke.types.includes('Flying')) return;
    poke.addVolatile(effect.id, {duration: 'turn'});
    if (effect.id === 'focuspunch' || effect.id === 'shelltrap') {
      poke.rememberMove(effect.name as MoveName, 0);
    }
  }

  '|-singlemove|'(args: Args['|-singlemove|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const effect = this.battle.get('conditions', args[2]);
    poke.addVolatile(effect.id, {duration: 'move'});
  }

  '|-activate|'(args: Args['|-activate|'], kwArgs: KWArgs['|-activate|']) {
    const poke = this.battle.getPokemon(args[1]);
    const effect = this.battle.get('conditions', args[2]);
    const poke2 = this.battle.getPokemon(args[3] as PokemonIdent);
    if (poke) poke.activateAbility(effect);

    switch (effect.id) {
    case 'poltergeist':
      poke!.item = toID(kwArgs.item);
      poke!.itemEffect = 'disturbed';
      break;
    case 'grudge':
      poke!.rememberMove(kwArgs.move!, Infinity);
      break;

      // move activations
    case 'brickbreak':
      poke2!.side.removeSideCondition('reflect' as ID);
      poke2!.side.removeSideCondition('lightscreen' as ID);
      break;
    case 'hyperspacefury':
    case 'hyperspacehole':
    case 'phantomforce':
    case 'shadowforce':
    case 'feint':
      poke!.removeVolatile('protect' as ID);
      poke!.side.removeSideCondition('wideguard' as ID);
      poke!.side.removeSideCondition('quickguard' as ID);
      poke!.side.removeSideCondition('craftyshield' as ID);
      poke!.side.removeSideCondition('matblock' as ID);
      break;
    case 'eeriespell':
    case 'gmaxdepletion':
    case 'spite':
      const move = this.battle.get('moves', kwArgs.move).name as MoveName;
      const pp = Number(kwArgs.number);
      poke!.rememberMove(move, isNaN(pp) ? 4 : pp);
      break;
    case 'gravity':
      poke!.removeVolatile('magnetrise' as ID);
      poke!.removeVolatile('telekinesis' as ID);
      break;
    case 'skillswap': case 'wanderingspirit':
      if (this.battle.gen.num <= 4) break;
      const pokeability = toID(kwArgs.ability) || poke2!.ability;
      const targetability = toID(kwArgs.ability2) || poke!.ability;
      if (pokeability) {
        poke!.ability = pokeability;
        if (!poke2!.baseAbility) poke2!.baseAbility = pokeability as ID;
      }
      if (targetability) {
        poke2!.ability = targetability;
        if (!poke!.baseAbility) poke!.baseAbility = targetability as ID;
      }
      if (poke!.side !== poke2!.side) {
        poke!.activateAbility(pokeability, true);
        poke2!.activateAbility(targetability, true);
      }
      break;

      // ability activations
    case 'forewarn':
      if (poke2) {
        poke2.rememberMove(kwArgs.move!, 0);
      } else {
        const foeActive = [];
        for (const maybeTarget of poke!.side.foe.active) {
          if (maybeTarget && !maybeTarget.fainted) foeActive.push(maybeTarget);
        }
        if (foeActive.length === 1) foeActive[0].rememberMove(kwArgs.move!, 0);
      }
      break;
    case 'mummy':
      if (!kwArgs.ability) break; // if Mummy activated but failed, no ability will have been sent
      const ability = this.battle.get('abilities', kwArgs.ability);
      poke2!.activateAbility(ability.name);
      if (poke) poke.activateAbility('Mummy');
      poke2!.activateAbility('Mummy', true);
      break;

      // item activations
    case 'leppaberry':
    case 'mysteryberry':
      poke!.rememberMove(kwArgs.move!, effect.id === 'leppaberry' ? -10 : -5);
      break;
    case 'focusband':
      poke!.item = 'focusband' as ID;
      break;
    }
  }

  '|-sidestart|'(args: Args['|-sidestart|']) {
    const side = this.battle.getSide(args[1]);
    const effect = this.battle.get('conditions', args[2]);
    side.addSideCondition(effect);
  }

  '|-sideend|'(args: Args['|-sideend|']) {
    const side = this.battle.getSide(args[1]);
    const effect = this.battle.get('conditions', args[2]);
    side.removeSideCondition(effect.id);
  }

  '|-swapsideconditions|'() {
    this.battle.swapSideConditions();
  }

  '|-weather|'(args: Args['|-weather|'], kwArgs: KWArgs['|-weather|']) {
    const effect = args[1] === 'none' ? NULL : this.battle.get('conditions', args[1]);
    const ability = this.battle.get('conditions', kwArgs.from);
    const ofPoke = this.battle.getPokemon(kwArgs.of);
    this.battle.field.setWeather(effect.id, ofPoke || undefined, !!kwArgs.upkeep, ability);
  }

  '|-fieldstart|'(args: Args['|-fieldstart|'], kwArgs: KWArgs['|-fieldstart|']) {
    const effect = this.battle.get('conditions', args[1]);
    const fromEffect = this.battle.get('conditions', kwArgs.from);
    const ofPoke = this.battle.getPokemon(kwArgs.of);
    if (ofPoke && fromEffect) ofPoke.activateAbility(fromEffect);

    if (effect.id.endsWith('terrain')) {
      this.battle.field.setTerrain(effect.id);
    } else {
      this.battle.field.addPseudoWeather(effect.id, 5, 0);
    }
  }

  '|-fieldend|'(args: Args['|-fieldend|']) {
    const effect = this.battle.get('conditions', args[1]);
    if (effect.id.endsWith('terrain')) {
      this.battle.field.setTerrain('');
    } else {
      this.battle.field.removePseudoWeather(effect.id);
    }
  }
}

function sanitizeName(name: any) {
  if (!name) return '';
  return ('' + name)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .slice(0, 50);
}
