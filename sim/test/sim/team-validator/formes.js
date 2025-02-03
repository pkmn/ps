'use strict';

const assert = require('../../assert');

let team;

describe('Team Validator', function () {
	it("should validate Necrozma formes correctly", function () {
		team = [
			{species: 'necrozmadawnwings', ability: 'prismarmor', shiny: true, moves: ['moongeistbeam', 'metalclaw'], evs: {hp: 1}},
		];
		assert.legalTeam(team, 'gen7anythinggoes');
	});

	it('should reject Ultra Necrozma where ambiguous', function () {
		team = [
			{species: 'necrozmaultra', ability: 'neuroforce', moves: ['confusion'], evs: {hp: 1}},
		];
		assert.false.legalTeam(team, 'gen7ubers');
	});

	it('should handle Deoxys formes in Gen 3', function () {
		team = [
			{species: 'deoxys', ability: 'pressure', moves: ['wrap'], evs: {hp: 1}},
			{species: 'deoxys', ability: 'pressure', moves: ['wrap'], evs: {hp: 1}},
		];
		assert.false.legalTeam(team, 'gen3ubers');
		assert.legalTeam(team, 'gen3ubers@@@!speciesclause');

		team = [
			{species: 'deoxysattack', ability: 'pressure', moves: ['wrap'], evs: {hp: 1}},
			{species: 'deoxysdefense', ability: 'pressure', moves: ['wrap'], evs: {hp: 1}},
		];
		assert.false.legalTeam(team, 'gen3ubers@@@!speciesclause');
		assert.legalTeam(team, 'gen3ubers@@@!speciesclause,+nonexistent');
	});

	it('should correctly validate USUM Rockruff', function () {
		team = [
			{species: 'rockruff', ability: 'owntempo', moves: ['happyhour'], evs: {hp: 1}},
		];
		assert.legalTeam(team, 'gen7anythinggoes');
		team = [
			{species: 'rockruff', level: 9, ability: 'owntempo', moves: ['happyhour'], evs: {hp: 1}},
		];
		assert.false.legalTeam(team, 'gen7anythinggoes');
		team = [
			{species: 'rockruff', level: 9, ability: 'owntempo', moves: ['tackle'], evs: {hp: 1}},
		];
		assert.legalTeam(team, 'gen7anythinggoes');
		team = [
			{species: 'rockruff', level: 9, ability: 'steadfast', moves: ['happyhour'], evs: {hp: 1}},
		];
		assert.false.legalTeam(team, 'gen7anythinggoes');

		team = [
			{species: 'lycanrocdusk', ability: 'toughclaws', moves: ['happyhour'], evs: {hp: 1}},
		];
		assert.legalTeam(team, 'gen7anythinggoes');
		team = [
			{species: 'lycanroc', ability: 'steadfast', moves: ['happyhour'], evs: {hp: 1}},
		];
		assert.false.legalTeam(team, 'gen7anythinggoes');
	});

	it('should reject Pokemon that cannot obtain moves in a particular forme', function () {
		team = [
			{species: 'toxtricity', ability: 'punkrock', moves: ['venomdrench, magneticflux'], evs: {hp: 1}},
			{species: 'toxtricity-low-key', ability: 'punkrock', moves: ['venoshock, shiftgear'], evs: {hp: 1}},
		];
		assert.false.legalTeam(team, 'gen8anythinggoes');

		team = [
			{species: 'rotom-wash', ability: 'levitate', moves: ['overheat'], evs: {hp: 1}},
		];
		assert.false.legalTeam(team, 'gen8anythinggoes');

		team = [
			{species: 'kyurem-black', ability: 'teravolt', moves: ['glaciate'], evs: {hp: 1}},
		];
		assert.false.legalTeam(team, 'gen8anythinggoes');

		// Scary Face is a TM in Gen 8, so use Gen 7 to test
		team = [
			{species: 'kyurem-white', ability: 'turboblaze', moves: ['scaryface'], evs: {hp: 1}},
		];
		assert.false.legalTeam(team, 'gen7anythinggoes');
	});
});
