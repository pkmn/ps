'use strict';

const assert = require('../../assert');
const Sim = require('./../../../build/cjs/sim');
const Dex = Sim.Dex;


let battle;

describe('Modded Dex', function () {
	afterEach(function () {
		battle.destroy();
	});

	const testmod = Dex.mod('testmod', {
		Rulesets: {
			testformat: {
				name: 'Test Format',
				effectType: "Format",
				mod: 'testmod',
			},
		},
		Species: {
			testpokemon: {
				name: 'Test-Pokemon',
			},
		},
		Scripts: {
			inherit: "gen9",
			gen: 9,
		},
	});

	it(`should load modded dex data`, function () {
		const battleOptions = {
			format: testmod.formats.get('testformat'),
			debug: true,
		};

		battle = new Sim.Battle(battleOptions);

		assert.equal(battle.format.name, 'Test Format');
	});

	it(`should load modded dex data from formatid`, function () {
		const battleOptions = {
			formatid: 'testformat',
			debug: true,
		};

		battle = new Sim.Battle(battleOptions);

		assert.equal(battle.format.name, 'Test Format');
	});

	it(`should create battle with modded pokemon species`, function () {
		const battleOptions = {
			format: testmod.formats.get('testformat'),
			debug: true,
		};

		battle = new Sim.Battle(battleOptions);

		battle.setPlayer('p1', {team: [
			{species: "TestPokemon", moves: ['tackle']},
		]});
		battle.setPlayer('p2', {team: [
			{species: "TestPokemon", moves: ['tackle']},
		]});

		assert.equal(battle.p1.active[0].species.name, 'Test-Pokemon');
		assert.equal(battle.p2.active[0].species.name, 'Test-Pokemon');
	});

	it(`should create battle with modded pokemon species from formatid`, function () {
		const battleOptions = {
			formatid: 'testformat',
			debug: true,
		};

		battle = new Sim.Battle(battleOptions);

		battle.setPlayer('p1', {team: [
			{species: "TestPokemon", moves: ['tackle']},
		]});
		battle.setPlayer('p2', {team: [
			{species: "TestPokemon", moves: ['tackle']},
		]});

		assert.equal(battle.p1.active[0].species.name, 'Test-Pokemon');
		assert.equal(battle.p2.active[0].species.name, 'Test-Pokemon');
	});
});
