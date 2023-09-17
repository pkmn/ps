'use strict';

const assert = require('../../assert');
const {Battle, Dex} = require('./../../../build/cjs/sim');

let battle;

describe('Modded Dex', function () {
	afterEach(function () {
		battle.destroy();
	});

	const dex = Dex.mod('testmod', {
		Formats: [
			{
				name: 'Test Format',
				effectType: "Format",
				mod: 'testmod',
			},
		],
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
			format: dex.formats.get('testformat'),
			debug: true,
		};

		battle = new Battle(battleOptions);

		assert.equal(battle.format.name, 'Test Format');
		assert(battle.format.exists);
	});

	it(`should load modded dex data from formatid`, function () {
		const battleOptions = {
			formatid: 'testformat',
			debug: true,
		};

		battle = new Battle(battleOptions, dex);

		assert.equal(battle.format.name, 'Test Format');
	});

	it(`should create battle with modded pokemon species`, function () {
		const battleOptions = {
			format: dex.formats.get('testformat'),
			debug: true,
		};

		battle = new Battle(battleOptions, dex);

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

		battle = new Battle(battleOptions, dex);

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
