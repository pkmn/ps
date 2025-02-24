'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Transform', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should copy the Pokemon\'s species', function () {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: "Ditto", ability: 'limber', moves: ['transform']}]});
		battle.setPlayer('p2', {team: [{species: "Hoopa-Unbound", ability: 'magician', moves: ['rest']}]});
		battle.makeChoices('move transform', 'move rest');
		assert.equal(battle.p1.active[0].species, battle.p2.active[0].species);
	});

	it('should copy all stats except HP', function () {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: "Ditto", ability: 'limber', moves: ['transform']}]});
		battle.setPlayer('p2', {team: [{species: "Mewtwo", ability: 'pressure', moves: ['rest']}]});
		battle.makeChoices('move transform', 'move rest');
		const p1poke = battle.p1.active[0];
		const p2poke = battle.p2.active[0];
		for (const stat in p1poke.stats) {
			assert.equal(p1poke.stats[stat], p2poke.stats[stat]);
		}
		assert.notEqual(p1poke.hp, p2poke.hp);
		assert.notEqual(p1poke.maxhp, p2poke.maxhp);
	});

	it('should copy all stat changes', function () {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: "Mew", ability: 'synchronize', item: 'laggingtail', moves: ['calmmind', 'agility', 'transform']}]});
		battle.setPlayer('p2', {team: [{species: "Scolipede", ability: 'swarm', moves: ['honeclaws', 'irondefense', 'doubleteam']}]});
		for (let i = 1; i <= 3; i++) {
			battle.makeChoices('move ' + i, 'move ' + i);
		}
		const p1poke = battle.p1.active[0];
		const p2poke = battle.p2.active[0];
		for (const stat in p1poke.boosts) {
			assert.equal(p1poke.boosts[stat], p2poke.boosts[stat]);
		}
	});

	it("should copy the target's focus energy status", function () {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: "Ditto", ability: 'limber', moves: ['transform']}]});
		battle.setPlayer('p2', {team: [{species: "Sawk", ability: 'sturdy', moves: ['focusenergy']}]});
		battle.makeChoices('move transform', 'move focusenergy');
		assert(battle.p1.active[0].volatiles['focusenergy']);
	});

	it('should copy the target\'s moves with 5 PP each', function () {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: "Ditto", ability: 'limber', moves: ['transform']}]});
		battle.setPlayer('p2', {team: [{species: "Mew", ability: 'synchronize', moves: ['rest', 'psychic', 'energyball', 'hyperbeam']}]});
		const p1poke = battle.p1.active[0];
		const p2poke = battle.p2.active[0];
		battle.makeChoices('move transform', 'move rest');
		assert.equal(p1poke.moves.length, p2poke.moves.length);
		for (let i = 0; i < p1poke.moves.length; i++) {
			let move = p1poke.moves[i];
			assert.equal(move, p2poke.moves[i]);
			move = battle.dex.moves.get(move);
			const movepp = p1poke.getMoveData(move);
			assert.equal(movepp.pp, 5);
		}
	});

	it(`should copy and activate the target's Ability`, function () {
		battle = common.createBattle([[
			{species: 'Ditto', ability: 'limber', moves: ['transform']},
		], [
			{species: 'Arcanine', ability: 'intimidate', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		assert.statStage(battle.p2.active[0], 'atk', -1);
	});

	it(`should copy, but not activate the target's Ability if it is the same as the user's pre-Transform`, function () {
		battle = common.createBattle([[
			{species: 'Ditto', ability: 'intimidate', moves: ['transform']},
		], [
			{species: 'Arcanine', ability: 'intimidate', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		assert.statStage(battle.p2.active[0], 'atk', -1);
	});

	it('should not copy speed boosts from Unburden', function () {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: "Ditto", ability: 'limber', moves: ['transform']}]});
		battle.setPlayer('p2', {team: [{species: "Hitmonlee", ability: 'unburden', item: 'normalgem', moves: ['feint']}]});
		battle.makeChoices('move transform', 'move feint');
		assert.notEqual(battle.p1.active[0].getStat('spe'), battle.p2.active[0].getStat('spe'));
	});

	it('should fail against Pokemon with a Substitute', function () {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: "Ditto", ability: 'limber', moves: ['transform']}]});
		battle.setPlayer('p2', {team: [{species: "Mewtwo", ability: 'pressure', moves: ['substitute']}]});
		battle.makeChoices('move transform', 'move substitute');
		assert.notEqual(battle.p1.active[0].species, battle.p2.active[0].species);
	});

	it(`should fail if either the user or target have Illusion active`, function () {
		battle = common.createBattle([[
			{species: 'Ditto', ability: 'limber', moves: ['transform']},
		], [
			{species: "Zoroark", ability: 'illusion', moves: ['transform']},
			{species: "Mewtwo", ability: 'pressure', moves: ['rest']},
		]]);
		battle.makeChoices();
		assert.species(battle.p1.active[0], 'Ditto');
		assert.species(battle.p2.active[0], 'Zoroark');
	});

	it('should fail against tranformed Pokemon', function () {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: "Ditto", ability: 'limber', moves: ['transform']}]});
		battle.setPlayer('p2', {team: [
			{species: "Magikarp", ability: 'rattled', moves: ['splash']},
			{species: "Mew", ability: 'synchronize', moves: ['transform']},
		]});
		battle.makeChoices('move transform', 'move splash');
		assert.equal(battle.p1.active[0].species, battle.p2.active[0].species);
		battle.makeChoices('move splash', 'switch 2');
		battle.makeChoices('move splash', 'move transform');
		assert.notEqual(battle.p1.active[0].species, battle.p2.active[0].species);
	});

	it(`should copy the target's real type, even if the target is an Arceus`, function () {
		battle = common.createBattle([
			[{species: "Ditto", ability: 'limber', item: 'flameplate', moves: ['transform']}],
			[{species: "Arceus-Steel", ability: 'multitype', item: 'ironplate', moves: ['rest']}],
		]);
		battle.makeChoices('move transform', 'move rest');
		assert.deepEqual(battle.p1.active[0].getTypes(), ["Steel"]);
	});

	it(`should ignore the effects of Roost`, function () {
		battle = common.createBattle([
			[{species: "Mew", ability: 'synchronize', moves: ['seismictoss', 'transform']}],
			[{species: "Talonflame", ability: 'flamebody', moves: ['roost']}],
		]);
		battle.makeChoices('move seismictoss', 'move roost');
		battle.makeChoices('move transform', 'move roost');
		assert.deepEqual(battle.p1.active[0].getTypes(), ["Fire", "Flying"]);
	});

	it(`should not announce that its ability was suppressed after Transforming`, function () {
		battle = common.createBattle([[
			{species: "Mew", ability: 'synchronize', moves: ['transform']},
		], [
			{species: 'roggenrola', ability: 'sturdy', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const log = battle.getDebugLog();
		const abilityAnnounceIndex = log.indexOf('|-endability|');
		assert.equal(abilityAnnounceIndex, -1, `It should not announce the user's ability was suppressed.`);
	});
});

describe('Transform [Gen 9]', function () {
	afterEach(function () {
		battle.destroy();
	});

	it("should copy the target's old types, not the Tera Type", function () {
		battle = common.gen(9).createBattle([[
			{species: "Ditto", ability: "limber", moves: ['transform'], teraType: "Fire"},
		], [
			{species: "Ampharos", ability: "static", moves: ['sleeptalk'], teraType: "Dragon"},
		]]);
		battle.makeChoices('auto', 'move sleeptalk terastallize');
		assert.equal(battle.p1.active[0].getTypes().join('/'), 'Electric');
		battle.makeChoices('move sleeptalk terastallize', 'auto');
		assert.equal(battle.p1.active[0].getTypes().join('/'), 'Fire');
	});

	it("should keep the user's Tera Type when Terastallized", function () {
		battle = common.gen(9).createBattle([[
			{species: "Ditto", ability: "limber", moves: ['transform'], teraType: "Fire"},
		], [
			{species: "Ampharos", ability: "static", moves: ['sleeptalk'], teraType: "Dragon"},
		]]);
		battle.makeChoices('move transform terastallize', 'move sleeptalk terastallize');
		assert.equal(battle.p1.active[0].getTypes().join('/'), 'Fire');
	});

	it("should fail against Ogerpon when the user is Terastallized", function () {
		battle = common.gen(9).createBattle([[
			{species: "Ditto", ability: "limber", moves: ['transform'], teraType: "Fire"},
		], [
			{species: "Ogerpon", ability: "defiant", moves: ['sleeptalk'], teraType: "Grass"},
		]]);
		battle.makeChoices('move transform terastallize', 'move sleeptalk');
		assert.false(battle.p1.active[0].transformed);
	});

	it("should fail against Ogerpon when Ogerpon is Terastallized", function () {
		battle = common.gen(9).createBattle([[
			{species: "Ditto", ability: "limber", moves: ['transform'], teraType: "Fire"},
		], [
			{species: "Ogerpon", ability: "defiant", moves: ['sleeptalk'], teraType: "Grass"},
		]]);
		battle.makeChoices('move transform', 'move sleeptalk terastallize');
		assert.false(battle.p1.active[0].transformed);
	});

	it("should prevent Pokemon transformed into Ogerpon from Terastallizing", function () {
		battle = common.gen(9).createBattle([[
			{species: "Ditto", ability: "limber", moves: ['transform'], teraType: "Fire"},
		], [
			{species: "Ogerpon", ability: "defiant", moves: ['sleeptalk'], teraType: "Grass"},
		]]);
		battle.makeChoices();
		assert.cantMove(() => battle.choose('p1', 'move sleeptalk terastallize'));
	});

	it("should not allow Pokemon transformed into Ogerpon to Terastallize later if they couldn't before transforming", function () {
		battle = common.gen(9).createBattle({formatid: 'gen9customgame@@@!teampreview,terastalclause'}, [[
			{species: "Ditto", ability: "limber", moves: ['transform'], teraType: "Fire"},
			{species: "Shedinja", ability: "wonderguard", moves: ['transform'], teraType: "Fire"},
		], [
			{species: "Ogerpon", ability: "defiant", moves: ['spikes'], teraType: "Grass"},
		]]);
		battle.makeChoices();
		battle.makeChoices('switch 2', 'default');
		battle.makeChoices();
		assert.false(battle.p1.active[0].transformed);
		assert.cantMove(() => battle.choose('p1', 'move transform terastallize'));
	});

	it(`should not work if the user is Tera Stellar`, function () {
		battle = common.gen(9).createBattle([[
			{species: 'Ditto', ability: 'limber', moves: ['transform'], teraType: 'Stellar'},
		], [
			{species: 'Wynaut', moves: ['sleeptalk']},
		]]);
		battle.makeChoices('move transform terastallize', 'auto');
		assert.false(battle.p1.active[0].transformed);
	});
});

describe('Transform [Gen 5]', function () {
	afterEach(function () {
		battle.destroy();
	});

	it("should not copy the target's focus energy status", function () {
		battle = common.gen(5).createBattle();
		battle.setPlayer('p1', {team: [{species: "Ditto", ability: 'limber', moves: ['transform']}]});
		battle.setPlayer('p2', {team: [{species: "Sawk", ability: 'sturdy', moves: ['focusenergy']}]});
		assert.constant(() => battle.p1.active[0].volatiles['focusenergy'], () => battle.makeChoices('move transform', 'move focusenergy'));
	});
});

describe('Transform [Gen 4]', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should revert Pokemon transformed into Giratina-Origin to Giratina-Alternate if not holding a Griseous Orb', function () {
		battle = common.gen(4).createBattle([
			[{species: "Ditto", ability: 'limber', moves: ['transform']}],
			[{species: "Giratina-Origin", ability: 'levitate', item: 'griseousorb', moves: ['rest']}],
		]);
		battle.makeChoices('move transform', 'move rest');
		assert.equal(battle.p1.active[0].species.name, 'Giratina');
	});

	it('should cause Pokemon transformed into Giratina-Alternate to become Giratina-Origin if holding a Griseous Orb', function () {
		battle = common.gen(4).createBattle([
			[{species: "Ditto", ability: 'limber', item: 'griseousorb', moves: ['transform']}],
			[{species: "Giratina", ability: 'pressure', moves: ['rest']}],
		]);
		battle.makeChoices('move transform', 'move rest');
		assert.equal(battle.p1.active[0].species.name, 'Giratina-Origin');
	});

	it('should cause Pokemon transformed into Arceus to become an Arceus forme corresponding to its held Plate', function () {
		battle = common.gen(4).createBattle([
			[{species: "Ditto", ability: 'limber', item: 'flameplate', moves: ['transform']}],
			[{species: "Arceus-Steel", ability: 'multitype', item: 'ironplate', moves: ['rest']}],
		]);
		battle.makeChoices('move transform', 'move rest');
		assert.equal(battle.p1.active[0].species.name, 'Arceus-Fire');
		assert.deepEqual(battle.p1.active[0].getTypes(), ["Fire"]);
	});

	it('should succeed against a Substitute', function () {
		battle = common.gen(4).createBattle([
			[{species: "Ditto", ability: 'limber', moves: ['transform']}],
			[{species: "Mewtwo", ability: 'pressure', moves: ['substitute']}],
		]);
		battle.makeChoices('move transform', 'move substitute');
		assert.equal(battle.p1.active[0].species, battle.p2.active[0].species);
	});
});

describe('Transform [Gen 1]', function () {
	afterEach(function () {
		battle.destroy();
	});

	it("should not send |-endability|", function () {
		battle = common.gen(1).createBattle();
		battle.setPlayer('p1', {team: [{species: "Ditto", moves: ['transform']}]});
		battle.setPlayer('p2', {team: [{species: "Gengar", moves: ['lick']}]});
		battle.makeChoices('move transform', 'move lick');

		assert(battle.log.every(line => !line.startsWith('|-endability|')));
	});

	it(`should copy the target's boosted stats`, function () {
		battle = common.gen(1).createBattle({forceRandomChance: false}, [[ // disable crits
			{species: 'Ditto', moves: ['transform']},
		], [
			{species: 'Gengar', moves: ['amnesia', 'thunderbolt']},
			{species: 'Starmie', moves: ['recover']},
		]]);
		// Set all moves to perfect accuracy
		battle.onEvent('Accuracy', battle.format, true);

		battle.makeChoices();
		battle.makeChoices('move thunderbolt', 'switch 2');
		assert.fainted(battle.p2.active[0]);
	});

	it(`should copy the target's stats (except HP), even if different level`, function () {
		battle = common.gen(1).createBattle([[
			{species: 'Ditto', moves: ['transform'], level: 5},
		], [
			{species: 'Gengar', moves: ['splash']},
		]]);
		battle.makeChoices();
		const p1poke = battle.p1.active[0];
		const p2poke = battle.p2.active[0];
		for (const stat in p1poke.storedStats) {
			assert.equal(p1poke.storedStats[stat], p2poke.storedStats[stat]);
			assert.equal(p1poke.modifiedStats[stat], p2poke.modifiedStats[stat]);
		}
	});

	it(`should copy the target's status-modified stats`, function () {
		battle = common.gen(1).createBattle([[
			{species: 'Ditto', moves: ['transform', 'thunderwave']},
		], [
			{species: 'Gengar', moves: ['splash']},
		]]);
		battle.makeChoices('move thunderwave', 'move splash');
		battle.makeChoices('move transform', 'move splash');
		const p1poke = battle.p1.active[0];
		const p2poke = battle.p2.active[0];
		assert.equal(p1poke.storedStats['spe'], p2poke.storedStats['spe']);
		assert.equal(p1poke.modifiedStats['spe'], p2poke.modifiedStats['spe']);
	});

	it(`should not re-apply status stat modifier after transforming`, function () {
		battle = common.gen(1).createBattle([[
			{species: 'Ditto', moves: ['transform', 'splash']},
		], [
			{species: 'Gengar', moves: ['splash', 'thunderwave']},
		]]);
		battle.makeChoices('move splash', 'move thunderwave');
		do {
			battle.makeChoices('move transform', 'move splash');
		} while (!battle.p1.active[0].transformed);
		const p1poke = battle.p1.active[0];
		const p2poke = battle.p2.active[0];
		assert.equal(p1poke.storedStats['spe'], p2poke.storedStats['spe']);
		assert.equal(p1poke.modifiedStats['spe'], p2poke.modifiedStats['spe']);
	});
});
