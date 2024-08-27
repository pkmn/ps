'use strict';

const assert = require('../assert');

describe('Rulesets', function () {
	it('all formats should have functional rulesets', function () {
		for (const format of Dex.formats.all()) {
			assert.doesNotThrow(() => Dex.formats.getRuleTable(format));
		}
	});

	it('should not contain unused rules', function () {
		const used = new Set([
			'Crown Tundra Pokedex', 'EV Limit', 'Exact HP Mod', 'Galar Expansion Pokedex',
			'Galar Pokedex', 'Hoenn Pokedex', 'Isle of Armor Pokedex', 'Limit One Restricted',
			'Min Team Size', 'New Alola Pokedex', 'New Unova Pokedex', 'Obtainable Abilities',
			'Obtainable Formes', 'Obtainable Misc', 'Obtainable Moves', 'Overflow Stat Mod',
			'Sinnoh Pokedex', 'Sketch Post-Gen 7 Moves', 'Stadium Items Clause', 'Adjust Level Down',
			'Allow AVs', 'Event Moves Clause', 'Item Clause', 'Kalos Pokedex', 'Max Total Level',
			'Min Level', 'NC 1997 Move Legality', 'NC 2000 Move Legality', 'Old Alola Pokedex',
			'Old Unova Pokedex', 'Stadium Sleep Clause', 'Best Of',
		]);

		for (const format of Dex.formats.formatsListCache) {
			for (const r of format.ruleset) {
				const rule = r.split(' = ')[0];
				if (rule.startsWith('[')) continue;
				used.add(rule.replace(/^\W+/, ''));
			}
		}

		const unused = new Set();
		for (let i = 1; i <= 9; i++) {
			const dex = Dex.forGen(i);
			for (const r in dex.data.Rulesets) {
				if (r === 'validatestats') continue;
				const rule = dex.data.Rulesets[r].name;
				if (rule.startsWith('[')) continue;
				if (!used.has(rule)) unused.add(rule);
			}
		}

		assert.deepEqual(unused, new Set());
	});
});
