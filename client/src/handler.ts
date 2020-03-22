import {Protocol, Args, KWArgs, PokemonSearchID} from '@pkmn/protocol';
import {ID, toID, BoostName, Effect} from '@pkmn/sim';
import {Battle} from './battle';
import {Pokemon} from './pokemon';

const BOOSTS: BoostName[] = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'];

export class Handler implements Protocol.Handler {
  readonly battle: Battle;
  readonly player: ID | null;

  constructor(battle: Battle, player = null) {
    this.battle = battle;
    this.player = player;
  }

  '|start|'() {
    this.battle.p1.active[0] = null;
    this.battle.p2.active[0] = null;
  }

  '|upkeep|'() {
    this.battle.field.updatePseudoWeatherLeft();
    this.battle.updateToxicTurns();
  }

  '|turn|'(args: Args['|turn|']) {
    this.battle.setTurn(args[1]);
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
    if (args[1].slice(0, 11) === "Time left: ") {
      const [time, totalTime, graceTime] = args[1].split(' | ');
      this.battle.kickingInactive = parseInt(time.slice(11)) || 'on-unknown';
      this.battle.totalTimeLeft = parseInt(totalTime);
      this.battle.graceTimeLeft = parseInt(graceTime || '') || 0;
      if (this.battle.totalTimeLeft === this.battle.kickingInactive) this.battle.totalTimeLeft = 0;
      return;
    } else if (args[1].slice(0, 9) === "You have ") {
      // this is ugly but parseInt is documented to work this way
      // so I'm going to be lazy and not chop off the rest of the
      // sentence
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
    if (args[3] === 'item') pokemon.item = '(exists)';
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
    const poke = this.battle.getSwitchedPokemon(args[1], args[2])!;
    const slot = poke.slot;
    poke.healthParse(args[3]);
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

  '|swap|'(args: Args['|swap|'], kwArgs: KWArgs['|swap|']) {
    this.battle.lastSwap = undefined;
    if (isNaN(Number(args[2]))) {
      const poke = this.battle.getPokemon(args[1])!;
      poke.side.swapWith(poke, this.battle.getPokemon(args[2])!);
    } else {
      const poke = this.battle.getPokemon(args[1])!;
      const targetIndex = parseInt(args[2]!);
      if (kwArgs.from) {
        const target = poke.side.active[targetIndex];
        if (target) this.battle.lastSwap = [poke.side.id, targetIndex, target.ident];
      }
      poke.side.swapTo(poke, targetIndex);
    }
  }

  '|move|'(args: Args['|move|'], kwArgs: KWArgs['|move|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const move = this.battle.dex.getMove(args[2]);
    if (this.battle.checkActive(poke)) return;
    const poke2 = this.battle.getPokemon(args[3]);
    poke.useMove(move, poke2, kwArgs.from);
  }

  '|cant|'(args: Args['|cant|']) {
    const pokemon = this.battle.getPokemon(args[1])!;
    const effect = this.battle.dex.getEffect(args[2]);
    const move = this.battle.dex.getMove(args[3]);
    pokemon.cantUseMove(effect, move);
  }

  '|gen|'(args: Args['|gen|']) {
    this.battle.gen = args[1];
    this.battle.dex = this.battle.dex.mod(`gen${this.battle.gen}`);
  }

  '|-damage|'(args: Args['|-damage|'], kwArgs: KWArgs['|-damage|']) {
    this.battle.lastDamagePercentage = undefined;
    const poke = this.battle.getPokemon(args[1])!;
    const damage = poke.healthParse(args[2], true);
    if (damage === null) return;

    if (kwArgs.from) {
      const effect = this.battle.dex.getEffect(kwArgs.from) as Effect;
      const ofpoke = this.battle.getPokemon(kwArgs.of);
      if (ofpoke) ofpoke.activateAbility(effect);
      if (effect.effectType === 'Item') {
        const itemPoke = ofpoke || poke;
        if (itemPoke.lastItem !== effect.id) {
          itemPoke.item = effect.id;
        }
      }
    } else {
      const range = Pokemon.getDamageRange(damage, poke.hpcolor);
      let damageinfo = '' + Pokemon.getFormattedRange(range, damage[1] === 100 ? 0 : 1, '\u2013');
      if (damage[1] !== 100) {
        let hover = '' + ((damage[0] < 0) ? '\u2212' : '') +
          Math.abs(damage[0]) + '/' + damage[1];
        if (damage[1] === 48) { // this is a hack
          hover += ' pixels';
        }
        // should be converted to <abbr> in html
        damageinfo = '||' + hover + '||' + damageinfo + '||';
      }
      this.battle.lastDamagePercentage = [args[1], args[2], damageinfo];
    }
  }

  '|-heal|'(args: Args['|-heal|'], kwArgs: KWArgs['|-heal|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const damage = poke.healthParse(args[2], true, true);
    if (damage === null) return;

    if (kwArgs.from) {
      const effect = this.battle.dex.getEffect(kwArgs.from) as Effect;
      poke.activateAbility(effect);
      if (effect.effectType === 'Item') poke.item = effect.id;
      if (effect.id !== 'lunardance' || effect.id !== 'healingwish') return;
      if (effect.id === 'lunardance') {
        for (const trackedMove of poke.moveTrack) {
          trackedMove[1] = 0;
        }
      }
      this.battle.lastMove = 'healing-wish';
      poke.side.wisher = null;
    }
  }

  '|-sethp|'(args: Args['|-sethp|']) {
    for (let k = 0; k < 2; k++) {
      const poke = this.battle.getPokemon(args[1 + 2 * k]);
      if (poke) void poke.healthParse(args[2 + 2 * k])!;
    }
  }

  '|-boost|'(args: Args['|-boost|'], kwArgs: KWArgs['|-boost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    let boost: BoostName | 'spc' = args[2];
    if (this.battle.gen === 1 && boost === 'spd') return;
    if (this.battle.gen === 1 && boost === 'spa') boost = 'spc';
    const amount = parseInt(args[3]);
    if (amount === 0) return;

    if (!poke.boosts[boost]) poke.boosts[boost] = 0;
    poke.boosts[boost]! += amount;

    if (!kwArgs.silent && kwArgs.from) {
      const effect = this.battle.dex.getEffect(kwArgs.from);
      const ofpoke = this.battle.getPokemon(kwArgs.of);
      if (!(effect.id === 'weakarmor' && boost === 'spe')) {
        if (ofpoke) {
          ofpoke.activateAbility(effect);
        } else if (poke) {
          poke.activateAbility(effect);
        }
      }
    }
  }

  '|-unboost|'(args: Args['|-unboost|'], kwArgs: KWArgs['|-unboost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    let boost: BoostName | 'spc' = args[2];
    if (this.battle.gen === 1 && boost === 'spd') return;
    if (this.battle.gen === 1 && boost === 'spa') boost = 'spc';
    const amount = parseInt(args[3]);
    if (amount === 0) return;

    if (!poke.boosts[boost]) poke.boosts[boost] = 0;
    poke.boosts[boost]! -= amount;

    if (!kwArgs.silent && kwArgs.from) {
      const effect = this.battle.dex.getEffect(kwArgs.from);
      const ofpoke = this.battle.getPokemon(kwArgs.of);
      if (ofpoke) {
        ofpoke.activateAbility(effect);
      } else if (poke) {
        poke.activateAbility(effect);
      }
    }
  }

  '|-setboost|'(args: Args['|-setboost|']) {
    this.battle.getPokemon(args[1])!.boosts[args[2]] = parseInt(args[3]);
  }

  '|-swapboost|'(args: Args['|-swapboost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const poke2 = this.battle.getPokemon(args[2])!;
    const boosts = args[3] ? args[3].split(', ') as BoostName[] : BOOSTS;
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
      const b = boost as BoostName;
      if (poke.boosts[b]! > 0) delete poke.boosts[b];
    }
  }

  '|-clearnegativeboost|'(args: Args['|-clearnegativeboost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    for (const boost in poke.boosts) {
      const b = boost as BoostName;
      if (poke.boosts[b]! < 0) delete poke.boosts[b];
    }
  }

  '|-copyboost|'(args: Args['|-copyboost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const frompoke = this.battle.getPokemon(args[2])!;
    const boosts: BoostName[] = args[3] ? args[3].split(', ') as BoostName[] : BOOSTS;
    for (const boost of boosts) {
      poke.boosts[boost] = frompoke.boosts[boost];
      if (!poke.boosts[boost]) delete poke.boosts[boost];
    }
    if (this.battle.gen >= 6) {
      const volatilesToCopy = ['focusenergy', 'laserfocus'];
      for (const volatile of volatilesToCopy) {
        if (frompoke.volatiles[volatile]) {
          poke.addVolatile(volatile as ID);
        } else {
          poke.removeVolatile(volatile as ID);
        }
      }
    }
  }

  '|-clearboost|'(args: Args['|-clearboost|']) {
    this.battle.getPokemon(args[1])!.boosts = {};
  }

  '|-invertboost|'(args: Args['|-invertboost|']) {
    const poke = this.battle.getPokemon(args[1])!;
    for (const boost in poke.boosts) {
      const b = boost as BoostName;
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
    const fromeffect = this.battle.dex.getEffect(kwArgs.from) as Effect;
    (this.battle.getPokemon(kwArgs.of) || poke).activateAbility(fromeffect);
  }

  '|-fail|'(args: Args['|-fail|'], kwArgs: KWArgs['|-fail|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const fromeffect = this.battle.dex.getEffect(kwArgs.from) as Effect;
    (this.battle.getPokemon(kwArgs.of) || poke).activateAbility(fromeffect);
  }

  '|-block|'(args: Args['|-block|'], kwArgs: KWArgs['|-block|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const effect = this.battle.dex.getEffect(args[2]) as Effect;
    (this.battle.getPokemon(kwArgs.of) || poke).activateAbility(effect);
    switch (effect.id) {
    case 'quickguard': return poke.addTurnstatus('quickguard' as ID);
    case 'wideguard': return poke.addTurnstatus('wideguard' as ID);
    case 'craftyshield': return poke.addTurnstatus('craftyshield' as ID);
    case 'protect': return poke.addTurnstatus('protect' as ID);
    case 'safetygoggles': return void (poke.item = 'safetygoggles' as ID);
    case 'protectivepads': return void (poke.item = 'protectivepads' as ID);
    }
  }

  '|-mustrecharge|'(args: Args['|-mustrecharge|']) {
    this.battle.getPokemon(args[1])!.addMovestatus('mustrecharge' as ID);
  }

  '|-status|'(args: Args['|-status|'], kwArgs: KWArgs['|-status|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const effect = this.battle.dex.getEffect(kwArgs.from) as Effect;
    const ofpoke = this.battle.getPokemon(kwArgs.of) || poke;

    poke.status = args[2];
    poke.removeVolatile('yawn' as ID);
    ofpoke.activateAbility(effect);

    if (effect.effectType === 'Item') ofpoke.item = effect.id;

    if (args[2] === 'tox') {
      poke.statusData.toxicTurns = (effect.name === 'Toxic Orb' ? -1 : 0);
    } else if (args[2] === 'slp' && effect.id === 'rest') {
      poke.statusData.sleepTurns = 0; // for Gen 2 use through Sleep Talk
    }
  }

  '|-curestatus|'(args: Args['|-curestatus|']) {
    const poke = this.battle.getPokemon(args[1]);
    // TODO: confusion its own case and default the rest?
    if (poke) {
      poke.status = '';
      switch (args[2]) {
      case 'brn': case 'par': case 'frz': break;
      case 'tox': case 'psn': return void (poke.statusData.toxicTurns = 0);
      case 'slp': return void (poke.statusData.sleepTurns = 0);
      default: return poke.removeVolatile('confusion' as ID);
      }
    }
  }

  '|-cureteam|'(args: Args['|-cureteam|']) {
    // For old gens when the whole team was always cured
    for (const target of this.battle.getPokemon(args[1])!.side.pokemon) {
      target.status = '';
    }
  }

  '|-item|'(args: Args['|-item|'], kwArgs: KWArgs['|-item|']): void {
    const poke = this.battle.getPokemon(args[1])!;
    const item = this.battle.dex.getItem(args[2]);
    const effect = this.battle.dex.getEffect(kwArgs.from) as Effect;
    const ofpoke = this.battle.getPokemon(kwArgs.of);

    poke.item = item.id;
    poke.itemEffect = '';

    poke.removeVolatile('airballoon' as ID);
    if (item.id === 'airballoon') poke.addVolatile('airballoon' as ID);

    if (effect.id) {
      switch (effect.id) {
      case 'pickup':
        poke.activateAbility('Pickup');
        // falls through
      case 'recycle': return void (poke.itemEffect = 'found');
      case 'frisk':
        ofpoke!.activateAbility('Frisk');
        if (poke && poke !== ofpoke) { // used for gen 6
          poke.itemEffect = 'frisked';
        }
        return;
      case 'magician':
      case 'pickpocket':
        poke.activateAbility(effect.name);
        // falls through
      case 'thief':
      case 'covet':
        // simulate the removal of the item from the ofpoke
        ofpoke!.item = '';
        ofpoke!.itemEffect = '';
        ofpoke!.lastItem = item.id;
        ofpoke!.lastItemEffect = 'stolen';
        ofpoke!.addVolatile('itemremoved' as ID);
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
    const item = this.battle.dex.getItem(args[2]);
    const effect = this.battle.dex.getEffect(kwArgs.from) as Effect;

    poke.item = '';
    poke.itemEffect = '';
    poke.lastItem = item.id;
    poke.lastItemEffect = '';

    poke.removeVolatile('airballoon' as ID);
    poke.addVolatile('itemremoved' as ID);

    if (kwArgs.eat) {
      poke.lastItemEffect = 'eaten';
      this.battle.lastMove = item.id;
    } else if (kwArgs.weaken) {
      poke.lastItemEffect = 'eaten';
      this.battle.lastMove = item.id;
    } else if (effect.id) {
      switch (effect.id) {
      case 'fling': return void (poke.lastItemEffect = 'flung');
      case 'knockoff': return void (poke.lastItemEffect = 'knocked off');
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
    const ability = this.battle.dex.getAbility(args[2]);
    const effect = this.battle.dex.getEffect(kwArgs.from) as Effect;
    const ofpoke = this.battle.getPokemon(kwArgs.of);
    poke.rememberAbility(ability.name, !!(effect.id && !kwArgs.fail));

    if (kwArgs.silent) return; // do nothing

    if (effect.id) {
      switch (effect.id) {
      case 'trace':
        poke.activateAbility('Trace');
        poke.activateAbility(ability.name, true);
        ofpoke!.rememberAbility(ability.name);
        break;
      case 'powerofalchemy':
      case 'receiver':
        poke.activateAbility(effect.name);
        poke.activateAbility(ability.name, true);
        ofpoke!.rememberAbility(ability.name);
        break;
      case 'roleplay':
        poke.activateAbility(ability.name, true);
        ofpoke!.rememberAbility(ability.name);
        break;
      case 'desolateland':
      case 'primordialsea':
      case 'deltastream':
        if (kwArgs.fail) poke.activateAbility(ability.name);
        break;
      default:
        poke.activateAbility(ability.name);
      }
    } else {
      poke.activateAbility(ability.name);
    }
  }

  '|-endability|'(args: Args['|-endability|']) {
    // deprecated; use |-start| for Gastro Acid
    // and the third arg of |-ability| for Entrainment et al
    const poke = this.battle.getPokemon(args[1])!;
    const ability = this.battle.dex.getAbility(args[2]);
    poke.ability = '(suppressed)';
    if (ability.id && !poke.baseAbility) poke.baseAbility = ability.id;
  }

  '|detailschange|'(args: Args['|detailschange|']) {
    const poke = this.battle.getPokemon(args[1])!;
    poke.removeVolatile('formechange' as ID);
    poke.removeVolatile('typeadd' as ID);
    poke.removeVolatile('typechange' as ID);

    let newSpecies: string = args[2];
    const commaIndex = newSpecies.indexOf(',');
    if (commaIndex !== -1) {
      const level = newSpecies.substr(commaIndex + 1).trim();
      if (level.charAt(0) === 'L') poke.level = parseInt(level.substr(1));
      newSpecies = args[2].substr(0, commaIndex);
    }
    const template = this.battle.dex.getTemplate(newSpecies);

    poke.species = newSpecies;
    poke.ability = poke.baseAbility = (template.abilities ? toID(template.abilities['0']) : '');

    poke.details = args[2];
    poke.searchid = args[1].substr(0, 2) + args[1].substr(3) + '|' + args[2] as PokemonSearchID;
  }

  '|-transform|'(args: Args['|-transform|'], kwArgs: KWArgs['|-transform|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const tpoke = this.battle.getPokemon(args[2])!;
    const effect = this.battle.dex.getEffect(kwArgs.from) as Effect;
    if (poke === tpoke) throw new Error("Transforming into self");

    if (!kwArgs.silent) poke.activateAbility(effect);

    poke.boosts = {...tpoke.boosts};
    poke.copyTypesFrom(tpoke);
    poke.ability = tpoke.ability;
    const species = (tpoke.volatiles.formechange ? tpoke.volatiles.formechange[1] : tpoke.species);
    const pokemon = tpoke;
    const shiny = tpoke.shiny;
    const gender = tpoke.gender;
    poke.addVolatile('transform' as ID, pokemon, shiny, gender);
    poke.addVolatile('formechange' as ID, species);
    for (const trackedMove of tpoke.moveTrack) {
      poke.rememberMove(trackedMove[0], 0);
    }
  }

  '|-formechange|'(args: Args['|-formechange|'], kwArgs: KWArgs['|-formechange|']) {
    const poke = this.battle.getPokemon(args[1])!;
    poke.removeVolatile('typeadd' as ID);
    poke.removeVolatile('typechange' as ID);
    if (this.battle.gen >= 7) poke.removeVolatile('autotomize' as ID);

    if (!kwArgs.silent) poke.activateAbility(this.battle.dex.getEffect(kwArgs.from));
    // the formechange volatile reminds us to revert the sprite change on switch-out
    poke.addVolatile('formechange' as ID, this.battle.dex.getTemplate(args[2]).species);
  }

  '|-mega|'(args: Args['|-mega|']) {
    if (args[3]) this.battle.getPokemon(args[1])!.item = this.battle.dex.getItem(args[3]).id;
  }

  '|-start|'(args: Args['|-start|'], kwArgs: KWArgs['|-start|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const effect = this.battle.dex.getEffect(args[2]) as Effect;
    const ofpoke = this.battle.getPokemon(kwArgs.of);
    const fromeffect = this.battle.dex.getEffect(kwArgs.from) as Effect;

    poke.activateAbility(effect);
    (ofpoke || poke).activateAbility(fromeffect);

    switch (effect.id) {
    case 'typechange':
      if (ofpoke && fromeffect.id === 'reflecttype') {
        poke.copyTypesFrom(ofpoke);
      } else {
        poke.removeVolatile('typeadd' as ID);
        poke.addVolatile('typechange' as ID, sanitizeName(args[3] || '???'));
      }
      break;
    case 'typeadd':
      poke.addVolatile('typeadd' as ID, sanitizeName(args[3]));
      break;
    case 'dynamax':
      poke.addVolatile('dynamax' as ID);
      break;
    case 'stockpile2':
      poke.removeVolatile('stockpile1' as ID);
      break;
    case 'stockpile3':
      poke.removeVolatile('stockpile2' as ID);
      break;
    case 'perish0':
      poke.removeVolatile('perish1' as ID);
      break;
    case 'perish1':
      poke.removeVolatile('perish2' as ID);
      break;
    case 'perish2':
      poke.removeVolatile('perish3' as ID);
      break;
    case 'autotomize':
      if (poke.volatiles.autotomize) {
        poke.volatiles.autotomize[1]++;
      } else {
        poke.addVolatile('autotomize' as ID, 1);
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
    const effect = this.battle.dex.getEffect(args[2]) as Effect;
    poke.removeVolatile(effect.id);

    if (kwArgs.silent) return; // do nothing

    switch (effect.id) {
    case 'illusion': return poke.rememberAbility('Illusion');
    case 'perishsong': return poke.removeVolatile('perish3' as ID); // for backwards compatibility
    case 'stockpile':
      poke.removeVolatile('stockpile1' as ID);
      poke.removeVolatile('stockpile2' as ID);
      poke.removeVolatile('stockpile3' as ID);
    }
  }

  '|-singleturn|'(args: Args['|-singleturn|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const effect = this.battle.dex.getEffect(args[2]) as Effect;
    poke.addTurnstatus(effect.id);
    if (effect.id === 'focuspunch' || effect.id === 'shelltrap') poke.rememberMove(effect.name, 0);
  }

  '|-singlemove|'(args: Args['|-singlemove|']) {
    this.battle.getPokemon(args[1])!.addMovestatus(this.battle.dex.getEffect(args[2]).id);
  }

  '|-activate|'(args: Args['|-activate|'], kwArgs: KWArgs['|-activate|']) {
    const poke = this.battle.getPokemon(args[1])!;
    const effect = this.battle.dex.getEffect(args[2]) as Effect;
    const target = this.battle.getPokemon(args[3]);
    poke.activateAbility(effect);

    switch (effect.id) {
    case 'grudge':
      poke.rememberMove(kwArgs.move!, Infinity);
      break;

      // move activations
    case 'brickbreak':
      target!.side.removeSideCondition('reflect' as ID);
      target!.side.removeSideCondition('lightscreen' as ID);
      break;
    case 'hyperspacefury':
    case 'hyperspacehole':
    case 'phantomforce':
    case 'shadowforce':
    case 'feint':
      poke.removeTurnstatus('protect' as ID);
      for (const curTarget of poke.side.pokemon) {
        curTarget.removeTurnstatus('wideguard' as ID);
        curTarget.removeTurnstatus('quickguard' as ID);
        curTarget.removeTurnstatus('craftyshield' as ID);
        curTarget.removeTurnstatus('matblock' as ID);
      }
      break;
    case 'spite':
      const move = this.battle.dex.getMove(kwArgs.move).name;
      const pp = Number(kwArgs.number);
      poke.rememberMove(move, isNaN(pp) ? 4 : pp);
      break;
    case 'gravity':
      poke.removeVolatile('magnetrise' as ID);
      poke.removeVolatile('telekinesis' as ID);
      break;
    case 'skillswap': case 'wanderingspirit':
      if (this.battle.gen <= 4) break;
      const pokeability = toID(kwArgs.ability) || target!.ability;
      const targetability = toID(kwArgs.ability2) || poke.ability;
      if (pokeability) {
        poke.ability = pokeability;
        if (!target!.baseAbility) target!.baseAbility = pokeability as ID;
      }
      if (targetability) {
        target!.ability = targetability;
        if (!poke.baseAbility) poke.baseAbility = targetability as ID;
      }
      if (poke.side !== target!.side) {
        poke.activateAbility(pokeability, true);
        target!.activateAbility(targetability, true);
      }
      break;

      // ability activations
    case 'forewarn':
      if (target) {
        target.rememberMove(kwArgs.move!, 0);
      } else {
        const foeActive = [];
        for (const maybeTarget of poke.side.foe.active) {
          if (maybeTarget && !maybeTarget.fainted) foeActive.push(maybeTarget);
        }
        if (foeActive.length === 1) foeActive[0].rememberMove(kwArgs.move!, 0);
      }
      break;
    case 'mummy':
      if (!kwArgs.ability) break; // if Mummy activated but failed, no ability will have been sent
      const ability = this.battle.dex.getAbility(kwArgs.ability);
      target!.activateAbility(ability.name);
      poke.activateAbility('Mummy');
      target!.activateAbility('Mummy', true);
      break;

      // item activations
    case 'leppaberry':
    case 'mysteryberry':
      poke.rememberMove(kwArgs.move!, effect.id === 'leppaberry' ? -10 : -5);
      break;
    case 'focusband':
      poke.item = 'focusband' as ID;
      break;
    }
  }

  '|-sidestart|'(args: Args['|-sidestart|']) {
    this.battle.getSide(args[1]).addSideCondition(this.battle.dex.getEffect(args[2]) as Effect);
  }

  '|-sideend|'(args: Args['|-sideend|']) {
    this.battle.getSide(args[1]).removeSideCondition(this.battle.dex.getEffect(args[2]).id);
  }

  '|-weather|'(args: Args['|-weather|'], kwArgs: KWArgs['|-weather|']) {
    this.battle.lastWeather = undefined;
    const effect = this.battle.dex.getEffect(args[1]) as Effect;
    const poke = this.battle.getPokemon(kwArgs.of) || undefined;
    const ability = this.battle.dex.getEffect(kwArgs.from) as Effect;
    if (!effect.id || effect.id === 'none') this.battle.lastWeather = this.battle.field.weather;
    this.battle.field.changeWeather(effect.id, poke, !!kwArgs.upkeep, ability);
  }

  '|-fieldstart|'(args: Args['|-fieldstart|'], kwArgs: KWArgs['|-fieldstart|']) {
    const effect = this.battle.dex.getEffect(args[1]) as Effect;
    const poke = this.battle.getPokemon(kwArgs.of);
    const fromeffect = this.battle.dex.getEffect(kwArgs.from) as Effect;
    if (poke) poke.activateAbility(fromeffect);
    let maxTimeLeft = 0;
    if (effect.id.endsWith('terrain')) {
      for (let i = this.battle.field.pseudoWeather.length - 1; i >= 0; i--) {
        const pwID = this.battle.field.pseudoWeather[i][0];
        if (pwID.endsWith('terrain')) {
          this.battle.field.pseudoWeather.splice(i, 1);
          continue;
        }
      }
      if (this.battle.gen > 6) maxTimeLeft = 8;
    }
    this.battle.field.addPseudoWeather(effect.id, 5, maxTimeLeft);
  }

  '|-fieldend|'(args: Args['|-fieldend|']) {
    this.battle.field.removePseudoWeather(this.battle.dex.getEffect(args[1]).id);
  }
}

function sanitizeName(name: any) {
  if (!name) return '';
  return ('' + name)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .slice(0, 50);
}
