import {Utils} from './utils';
import {
	Ability,
	BasicEffect,
	Format,
	Item,
	ModdedDex,
	Move,
	Nature,
	PRNG,
	PRNGSeed,
	PlayerOptions,
	PokemonSet,
	RandomTeamsTypes,
	RuleTable,
	Species,
	StatID,
	StatsTable,
	Tags,
	toID,
} from '@pkmn/sim';

/* eslint-disable */
const randomSetsJSON = {"venusaur":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Giga Drain","Leech Seed","Sleep Powder","Sludge Bomb","Substitute"],"teraTypes":["Steel","Water"]},{"role":"Bulky Attacker","movepool":["Earth Power","Energy Ball","Knock Off","Sleep Powder","Sludge Bomb","Synthesis","Toxic"],"teraTypes":["Dark","Steel","Water"]}]},"charizard":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flamethrower","Focus Blast","Hurricane","Will-O-Wisp"],"teraTypes":["Dragon","Fire","Ground"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Flare Blitz","Outrage","Swords Dance"],"teraTypes":["Dragon","Ground"]}]},"blastoise":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Hydro Pump","Ice Beam","Shell Smash"],"teraTypes":["Ground","Steel","Water"]},{"role":"Tera Blast user","movepool":["Hydro Pump","Ice Beam","Shell Smash","Tera Blast"],"teraTypes":["Electric","Grass"]}]},"arbok":{"level":87,"sets":[{"role":"Fast Support","movepool":["Earthquake","Glare","Gunk Shot","Knock Off","Sucker Punch","Toxic Spikes"],"teraTypes":["Dark","Ground"]},{"role":"Setup Sweeper","movepool":["Coil","Earthquake","Gunk Shot","Sucker Punch","Trailblaze"],"teraTypes":["Ground"]}]},"pikachu":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["Fake Out","Knock Off","Play Rough","Surf","Volt Switch","Volt Tackle"],"teraTypes":["Water"]}]},"raichu":{"level":88,"sets":[{"role":"Fast Support","movepool":["Alluring Voice","Encore","Focus Blast","Grass Knot","Nasty Plot","Nuzzle","Surf","Thunderbolt","Volt Switch"],"teraTypes":["Grass","Water"]},{"role":"Tera Blast user","movepool":["Encore","Focus Blast","Nasty Plot","Surf","Tera Blast","Thunderbolt"],"teraTypes":["Ice"]}]},"raichualola":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Alluring Voice","Focus Blast","Grass Knot","Psychic","Psyshock","Surf","Thunderbolt","Volt Switch"],"teraTypes":["Fairy","Fighting","Grass","Water"]},{"role":"Setup Sweeper","movepool":["Alluring Voice","Focus Blast","Grass Knot","Nasty Plot","Psyshock","Surf","Thunderbolt"],"teraTypes":["Fairy","Fighting","Grass","Water"]}]},"sandslash":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Knock Off","Rapid Spin","Spikes","Stone Edge","Swords Dance"],"teraTypes":["Dragon","Steel","Water"]}]},"sandslashalola":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Iron Head","Knock Off","Rapid Spin","Spikes","Triple Axel"],"teraTypes":["Flying","Water"]},{"role":"Setup Sweeper","movepool":["Earthquake","Ice Shard","Knock Off","Rapid Spin","Swords Dance","Triple Axel"],"teraTypes":["Ground"]}]},"clefable":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Flamethrower","Knock Off","Moonblast","Moonlight","Stealth Rock","Thunder Wave"],"teraTypes":["Poison","Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Moonblast","Moonlight"],"teraTypes":["Fire","Steel"]}]},"ninetales":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["Fire Blast","Nasty Plot","Scorching Sands","Solar Beam"],"teraTypes":["Fire","Grass"]}]},"ninetalesalola":{"level":79,"sets":[{"role":"Fast Support","movepool":["Aurora Veil","Blizzard","Encore","Moonblast"],"teraTypes":["Steel","Water"]},{"role":"Fast Bulky Setup","movepool":["Aurora Veil","Blizzard","Moonblast","Nasty Plot"],"teraTypes":["Steel","Water"]},{"role":"Tera Blast user","movepool":["Blizzard","Moonblast","Nasty Plot","Tera Blast"],"teraTypes":["Ground"]}]},"wigglytuff":{"level":96,"sets":[{"role":"Bulky Support","movepool":["Alluring Voice","Dazzling Gleam","Fire Blast","Knock Off","Protect","Stealth Rock","Thunder Wave","Wish"],"teraTypes":["Poison","Steel"]}]},"vileplume":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Giga Drain","Leech Seed","Sleep Powder","Sludge Bomb","Strength Sap"],"teraTypes":["Steel","Water"]}]},"venomoth":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["Bug Buzz","Quiver Dance","Sleep Powder","Sludge Wave"],"teraTypes":["Bug","Poison","Steel","Water"]}]},"dugtrio":{"level":84,"sets":[{"role":"Fast Support","movepool":["Earthquake","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fairy","Flying","Ghost","Ground"]},{"role":"Wallbreaker","movepool":["Earthquake","Stone Edge","Sucker Punch","Throat Chop"],"teraTypes":["Dark","Fairy","Flying","Ghost","Ground"]}]},"dugtrioalola":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Iron Head","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"teraTypes":["Ground","Steel"]}]},"persian":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["Double-Edge","Gunk Shot","Knock Off","Switcheroo","U-turn"],"teraTypes":["Normal","Poison"]},{"role":"Fast Attacker","movepool":["Double-Edge","Fake Out","Knock Off","U-turn"],"teraTypes":["Normal"]}]},"persianalola":{"level":86,"sets":[{"role":"Fast Bulky Setup","movepool":["Dark Pulse","Hypnosis","Nasty Plot","Power Gem","Thunderbolt"],"teraTypes":["Dark","Electric"]},{"role":"Tera Blast user","movepool":["Dark Pulse","Nasty Plot","Tera Blast","Thunderbolt"],"teraTypes":["Fairy","Poison"]}]},"golduck":{"level":90,"sets":[{"role":"Fast Bulky Setup","movepool":["Encore","Grass Knot","Hydro Pump","Ice Beam","Nasty Plot","Psyshock"],"teraTypes":["Water"]},{"role":"Fast Attacker","movepool":["Flip Turn","Grass Knot","Hydro Pump","Ice Beam","Nasty Plot"],"teraTypes":["Grass","Water"]}]},"annihilape":{"level":76,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Drain Punch","Rage Fist","Rest"],"teraTypes":["Fairy","Ghost","Steel","Water"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Gunk Shot","Rage Fist","Stone Edge","Taunt"],"teraTypes":["Fairy","Ghost","Steel","Water"]}]},"arcanine":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Morning Sun","Roar","Wild Charge","Will-O-Wisp"],"teraTypes":["Fighting","Normal"]},{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Morning Sun","Wild Charge"],"teraTypes":["Fighting","Normal"]}]},"arcaninehisui":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Head Smash","Morning Sun","Wild Charge"],"teraTypes":["Rock"]}]},"poliwrath":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Liquidation","Rain Dance"],"teraTypes":["Dark","Fighting","Water"]},{"role":"AV Pivot","movepool":["Circle Throw","Close Combat","Knock Off","Liquidation"],"teraTypes":["Dark","Fighting","Steel"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Ice Punch","Knock Off","Liquidation","Poison Jab"],"teraTypes":["Fighting","Steel","Water"]}]},"victreebel":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["Poison Jab","Power Whip","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Grass"]},{"role":"Wallbreaker","movepool":["Knock Off","Power Whip","Sleep Powder","Sludge Wave","Strength Sap","Sucker Punch"],"teraTypes":["Grass","Steel"]},{"role":"Fast Attacker","movepool":["Power Whip","Sludge Wave","Sunny Day","Weather Ball"],"teraTypes":["Fire"]}]},"tentacruel":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Flip Turn","Haze","Knock Off","Rapid Spin","Sludge Bomb","Surf","Toxic","Toxic Spikes"],"teraTypes":["Flying","Grass"]}]},"golem":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Explosion","Rock Polish","Stealth Rock","Stone Edge"],"teraTypes":["Grass","Ground","Steel"]}]},"golemalola":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["Double-Edge","Earthquake","Rock Polish","Stone Edge"],"teraTypes":["Flying","Grass"]},{"role":"Wallbreaker","movepool":["Double-Edge","Earthquake","Explosion","Stone Edge"],"teraTypes":["Electric","Grass","Ground"]}]},"slowbro":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Psychic Noise","Psyshock","Scald","Slack Off","Thunder Wave"],"teraTypes":["Fairy","Water"]},{"role":"AV Pivot","movepool":["Body Press","Fire Blast","Future Sight","Ice Beam","Psychic Noise","Scald"],"teraTypes":["Fairy","Fighting"]}]},"slowbrogalar":{"level":87,"sets":[{"role":"AV Pivot","movepool":["Earthquake","Fire Blast","Foul Play","Psychic","Shell Side Arm","Surf"],"teraTypes":["Dark","Ground","Poison","Water"]},{"role":"Wallbreaker","movepool":["Fire Blast","Psychic","Shell Side Arm","Trick Room"],"teraTypes":["Poison","Psychic"]},{"role":"Bulky Attacker","movepool":["Earthquake","Fire Blast","Psychic","Shell Side Arm","Slack Off","Thunder Wave"],"teraTypes":["Dark","Ground","Poison"]}]},"dodrio":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["Brave Bird","Double-Edge","Drill Run","Knock Off","Swords Dance"],"teraTypes":["Flying","Ground","Normal"]}]},"dewgong":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Flip Turn","Knock Off","Surf","Triple Axel"],"teraTypes":["Dragon","Grass","Ground","Poison","Steel"]},{"role":"Bulky Support","movepool":["Encore","Flip Turn","Hydro Pump","Ice Beam","Knock Off","Surf"],"teraTypes":["Dragon","Grass","Ground","Poison","Steel"]}]},"muk":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Drain Punch","Gunk Shot","Haze","Ice Punch","Knock Off","Poison Jab","Shadow Sneak","Toxic","Toxic Spikes"],"teraTypes":["Dark"]},{"role":"AV Pivot","movepool":["Drain Punch","Gunk Shot","Ice Punch","Knock Off","Poison Jab","Shadow Sneak"],"teraTypes":["Dark"]}]},"mukalola":{"level":82,"sets":[{"role":"AV Pivot","movepool":["Drain Punch","Gunk Shot","Ice Punch","Knock Off","Poison Jab","Shadow Sneak"],"teraTypes":["Dark"]}]},"cloyster":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Drill Run","Icicle Spear","Rock Blast","Shell Smash"],"teraTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Hydro Pump","Icicle Spear","Rock Blast","Shell Smash"],"teraTypes":["Ice","Rock"]}]},"gengar":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Focus Blast","Nasty Plot","Shadow Ball","Sludge Wave","Trick"],"teraTypes":["Fighting","Ghost"]},{"role":"Fast Attacker","movepool":["Encore","Focus Blast","Shadow Ball","Sludge Wave","Toxic Spikes","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"hypno":{"level":95,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Psychic Noise","Thunder Wave","Toxic"],"teraTypes":["Dark","Steel"]},{"role":"Bulky Attacker","movepool":["Focus Blast","Protect","Psychic Noise","Toxic"],"teraTypes":["Dark","Fighting","Steel"]}]},"electrode":{"level":92,"sets":[{"role":"Fast Support","movepool":["Explosion","Foul Play","Taunt","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Dark","Electric"]},{"role":"Tera Blast user","movepool":["Taunt","Tera Blast","Thunderbolt","Volt Switch"],"teraTypes":["Ice"]}]},"electrodehisui":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Energy Ball","Leaf Storm","Taunt","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Grass"]},{"role":"Fast Support","movepool":["Giga Drain","Leech Seed","Substitute","Thunderbolt"],"teraTypes":["Poison"]}]},"exeggutor":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Leech Seed","Psychic","Psychic Noise","Sleep Powder","Sludge Bomb","Substitute"],"teraTypes":["Steel"]},{"role":"Bulky Attacker","movepool":["Leech Seed","Protect","Psychic Noise","Substitute"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Giga Drain","Psychic","Psyshock","Substitute"],"teraTypes":["Steel"]}]},"exeggutoralola":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["Draco Meteor","Flamethrower","Giga Drain","Leaf Storm"],"teraTypes":["Fire"]},{"role":"AV Pivot","movepool":["Draco Meteor","Flamethrower","Giga Drain","Knock Off"],"teraTypes":["Fire","Steel"]}]},"hitmonlee":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["High Jump Kick","Knock Off","Mach Punch","Poison Jab","Stone Edge"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Poison Jab","Stone Edge","Swords Dance"],"teraTypes":["Dark","Fighting","Poison"]}]},"hitmonchan":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Drain Punch","Ice Punch","Knock Off","Mach Punch","Rapid Spin","Swords Dance"],"teraTypes":["Dark","Fighting"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Knock Off","Poison Jab","Rapid Spin"],"teraTypes":["Dark","Poison","Steel"]}]},"weezing":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Fire Blast","Gunk Shot","Pain Split","Sludge Bomb","Toxic Spikes","Will-O-Wisp"],"teraTypes":["Steel"]}]},"weezinggalar":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Defog","Fire Blast","Gunk Shot","Pain Split","Strange Steam","Will-O-Wisp"],"teraTypes":["Steel"]}]},"rhydon":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Megahorn","Stealth Rock","Stone Edge","Swords Dance"],"teraTypes":["Dragon","Fairy","Flying","Grass","Water"]}]},"scyther":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Bug Bite","Close Combat","Dual Wingbeat","Swords Dance"],"teraTypes":["Fighting"]},{"role":"Fast Support","movepool":["Close Combat","Defog","Dual Wingbeat","U-turn"],"teraTypes":["Fighting"]}]},"tauros":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Body Slam","Close Combat","Earthquake","Throat Chop"],"teraTypes":["Fighting","Ground","Normal"]}]},"taurospaldeacombat":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["Bulk Up","Close Combat","Earthquake","Iron Head","Stone Edge","Throat Chop"],"teraTypes":["Dark","Fighting","Steel"]}]},"taurospaldeablaze":{"level":81,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Raging Bull","Substitute"],"teraTypes":["Water"]},{"role":"Wallbreaker","movepool":["Close Combat","Flare Blitz","Stone Edge","Wild Charge"],"teraTypes":["Fighting"]}]},"taurospaldeaaqua":{"level":81,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Liquidation","Substitute"],"teraTypes":["Steel","Water"]},{"role":"Wallbreaker","movepool":["Aqua Jet","Close Combat","Stone Edge","Wave Crash"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Aqua Jet","Bulk Up","Close Combat","Liquidation"],"teraTypes":["Water"]}]},"gyarados":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Stone Edge","Temper Flare","Waterfall"],"teraTypes":["Ground"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Earthquake","Tera Blast","Waterfall"],"teraTypes":["Flying"]}]},"lapras":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Freeze-Dry","Hydro Pump","Ice Beam","Sparkling Aria"],"teraTypes":["Ice","Water"]},{"role":"Bulky Attacker","movepool":["Freeze-Dry","Rest","Sleep Talk","Sparkling Aria"],"teraTypes":["Dragon","Ghost","Ground","Poison","Steel"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Freeze-Dry","Waterfall"],"teraTypes":["Ground"]}]},"ditto":{"level":87,"sets":[{"role":"Fast Support","movepool":["Transform"],"teraTypes":["Bug","Dark","Dragon","Electric","Fairy","Fighting","Fire","Flying","Ghost","Grass","Ground","Ice","Normal","Poison","Psychic","Rock","Steel","Water"]}]},"vaporeon":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Flip Turn","Ice Beam","Protect","Scald","Wish"],"teraTypes":["Ghost","Ground","Poison"]},{"role":"Bulky Setup","movepool":["Calm Mind","Protect","Scald","Wish"],"teraTypes":["Ghost","Ground","Poison"]}]},"jolteon":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Alluring Voice","Calm Mind","Shadow Ball","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Fairy"]},{"role":"Tera Blast user","movepool":["Calm Mind","Substitute","Tera Blast","Thunderbolt"],"teraTypes":["Ice"]}]},"flareon":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Facade","Flare Blitz","Quick Attack","Trailblaze","Will-O-Wisp"],"teraTypes":["Normal"]}]},"snorlax":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Curse","Rest","Sleep Talk"],"teraTypes":["Fairy","Poison"]},{"role":"Bulky Setup","movepool":["Body Slam","Crunch","Curse","Earthquake","Rest"],"teraTypes":["Ground","Poison"]}]},"articuno":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Freeze-Dry","Haze","Roost","Substitute","U-turn"],"teraTypes":["Ground","Steel"]}]},"articunogalar":{"level":83,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Freezing Glare","Hurricane","Recover"],"teraTypes":["Steel"]},{"role":"Fast Support","movepool":["Future Sight","Hurricane","Recover","U-turn"],"teraTypes":["Steel"]}]},"zapdos":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Discharge","Heat Wave","Hurricane","Roost","U-turn"],"teraTypes":["Electric","Steel"]}]},"zapdosgalar":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Bulk Up","Close Combat","Knock Off","U-turn"],"teraTypes":["Dark","Fighting"]}]},"moltres":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Fire Blast","Roost","Scorching Sands","U-turn","Will-O-Wisp"],"teraTypes":["Dragon","Ground","Steel"]}]},"moltresgalar":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["Agility","Fiery Wrath","Hurricane","Nasty Plot","Rest"],"teraTypes":["Dark","Steel"]}]},"dragonite":{"level":74,"sets":[{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Outrage","Roost"],"teraTypes":["Ground","Steel"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Iron Head","Outrage"],"teraTypes":["Steel"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Earthquake","Outrage","Tera Blast"],"teraTypes":["Flying"]}]},"mewtwo":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Aura Sphere","Dark Pulse","Fire Blast","Nasty Plot","Psystrike","Recover"],"teraTypes":["Dark","Fighting","Fire","Psychic"]}]},"mew":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Psychic","Stealth Rock","Taunt","Toxic Spikes","U-turn","Will-O-Wisp"],"teraTypes":["Dark","Fairy","Steel"]},{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Leech Life","Psychic Fangs","Swords Dance"],"teraTypes":["Fighting"]},{"role":"Fast Bulky Setup","movepool":["Aura Sphere","Bug Buzz","Dark Pulse","Earth Power","Fire Blast","Hydro Pump","Nasty Plot","Psychic","Psyshock"],"teraTypes":["Dark","Fighting","Fire","Ground","Psychic","Water"]}]},"meganium":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Dragon Tail","Encore","Energy Ball","Knock Off","Leech Seed","Synthesis"],"teraTypes":["Poison","Steel","Water"]},{"role":"Setup Sweeper","movepool":["Earthquake","Knock Off","Petal Blizzard","Swords Dance"],"teraTypes":["Ground","Steel","Water"]}]},"typhlosion":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Eruption","Fire Blast","Focus Blast","Scorching Sands"],"teraTypes":["Fire"]}]},"typhlosionhisui":{"level":83,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Fire Blast","Focus Blast","Shadow Ball","Substitute","Will-O-Wisp"],"teraTypes":["Fighting","Fire","Ghost"]},{"role":"Fast Attacker","movepool":["Eruption","Fire Blast","Focus Blast","Shadow Ball"],"teraTypes":["Fire"]}]},"feraligatr":{"level":80,"sets":[{"role":"Fast Bulky Setup","movepool":["Crunch","Dragon Dance","Ice Punch","Liquidation"],"teraTypes":["Dark","Dragon","Steel","Water"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Ice Punch","Liquidation","Trailblaze"],"teraTypes":["Grass","Water"]}]},"furret":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["Double-Edge","Knock Off","Trick","U-turn"],"teraTypes":["Ghost","Normal"]},{"role":"Setup Sweeper","movepool":["Brick Break","Double-Edge","Knock Off","Tidy Up"],"teraTypes":["Ghost","Normal"]}]},"noctowl":{"level":95,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Defog","Hurricane","Hyper Voice","Nasty Plot","Roost"],"teraTypes":["Ground","Normal","Steel"]}]},"ariados":{"level":94,"sets":[{"role":"Fast Support","movepool":["Knock Off","Megahorn","Poison Jab","Sticky Web","Sucker Punch","Toxic Spikes"],"teraTypes":["Ghost","Steel"]}]},"lanturn":{"level":89,"sets":[{"role":"Fast Support","movepool":["Scald","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Flying"]},{"role":"Bulky Attacker","movepool":["Ice Beam","Scald","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Flying","Water"]}]},"ampharos":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Agility","Dazzling Gleam","Focus Blast","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Fairy"]}]},"bellossom":{"level":84,"sets":[{"role":"Fast Bulky Setup","movepool":["Giga Drain","Quiver Dance","Sleep Powder","Strength Sap"],"teraTypes":["Poison","Steel","Water"]},{"role":"Bulky Setup","movepool":["Giga Drain","Moonblast","Quiver Dance","Sludge Bomb","Strength Sap"],"teraTypes":["Fairy","Poison"]},{"role":"Tera Blast user","movepool":["Giga Drain","Quiver Dance","Strength Sap","Tera Blast"],"teraTypes":["Fire","Rock"]}]},"azumarill":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Aqua Jet","Ice Spinner","Knock Off","Liquidation","Play Rough","Superpower"],"teraTypes":["Water"]},{"role":"Bulky Setup","movepool":["Aqua Jet","Belly Drum","Liquidation","Play Rough"],"teraTypes":["Water"]}]},"sudowoodo":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Head Smash","Stealth Rock","Sucker Punch","Wood Hammer"],"teraTypes":["Grass","Rock"]},{"role":"Setup Sweeper","movepool":["Earthquake","Head Smash","Rock Polish","Wood Hammer"],"teraTypes":["Grass","Rock"]}]},"politoed":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Haze","Hydro Pump","Hypnosis","Ice Beam","Rest","Surf"],"teraTypes":["Steel","Water"]}]},"jumpluff":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Acrobatics","Leech Seed","Strength Sap","Substitute"],"teraTypes":["Steel"]},{"role":"Fast Support","movepool":["Acrobatics","Encore","Sleep Powder","Strength Sap","U-turn"],"teraTypes":["Steel"]}]},"sunflora":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Earth Power","Leaf Storm","Sludge Bomb"],"teraTypes":["Fairy","Grass","Ground","Poison"]},{"role":"Setup Sweeper","movepool":["Earth Power","Solar Beam","Sunny Day","Weather Ball"],"teraTypes":["Fire"]}]},"quagsire":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ice Beam","Recover","Spikes","Toxic"],"teraTypes":["Fairy","Poison","Steel"]}]},"clodsire":{"level":81,"sets":[{"role":"Bulky Support","movepool":["Curse","Earthquake","Gunk Shot","Poison Jab","Recover","Stealth Rock","Toxic","Toxic Spikes"],"teraTypes":["Flying","Steel"]}]},"espeon":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Alluring Voice","Calm Mind","Morning Sun","Psychic","Psyshock","Shadow Ball","Trick"],"teraTypes":["Fairy","Psychic"]}]},"umbreon":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Protect","Toxic","Wish"],"teraTypes":["Poison"]}]},"slowking":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Chilly Reception","Psychic Noise","Psyshock","Scald","Slack Off","Thunder Wave"],"teraTypes":["Dragon","Fairy","Water"]},{"role":"Wallbreaker","movepool":["Fire Blast","Hydro Pump","Ice Beam","Psychic","Psyshock","Trick Room"],"teraTypes":["Psychic","Water"]},{"role":"Fast Support","movepool":["Chilly Reception","Future Sight","Scald","Slack Off"],"teraTypes":["Dragon","Fairy","Water"]}]},"slowkinggalar":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Chilly Reception","Fire Blast","Psychic Noise","Psyshock","Slack Off","Sludge Bomb","Thunder Wave"],"teraTypes":["Dark","Poison"]},{"role":"AV Pivot","movepool":["Fire Blast","Future Sight","Ice Beam","Psychic Noise","Sludge Bomb"],"teraTypes":["Poison","Psychic"]}]},"misdreavus":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Shadow Ball","Will-O-Wisp"],"teraTypes":["Fairy"]}]},"girafarig":{"level":89,"sets":[{"role":"Bulky Setup","movepool":["Dazzling Gleam","Nasty Plot","Psychic","Psyshock","Shadow Ball","Thunderbolt"],"teraTypes":["Electric","Fairy","Psychic"]},{"role":"Fast Bulky Setup","movepool":["Hyper Voice","Nasty Plot","Psyshock","Thunderbolt"],"teraTypes":["Electric","Normal"]}]},"forretress":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Iron Head","Rapid Spin","Stealth Rock","Toxic Spikes","Volt Switch"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Body Press","Iron Head","Rapid Spin","Spikes","Stealth Rock"],"teraTypes":["Fighting","Water"]}]},"dunsparce":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Coil","Earthquake","Roost"],"teraTypes":["Ghost","Ground"]}]},"granbull":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Encore","Play Rough","Thunder Wave"],"teraTypes":["Ground"]},{"role":"Bulky Support","movepool":["Earthquake","Play Rough","Roar","Thunder Wave"],"teraTypes":["Ground"]}]},"qwilfish":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Destiny Bond","Gunk Shot","Spikes","Taunt","Thunder Wave","Toxic Spikes","Waterfall"],"teraTypes":["Dark","Grass"]},{"role":"Fast Support","movepool":["Flip Turn","Gunk Shot","Pain Split","Thunder Wave","Toxic","Toxic Spikes"],"teraTypes":["Dark","Grass"]}]},"qwilfishhisui":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Crunch","Gunk Shot","Spikes","Taunt","Toxic Spikes"],"teraTypes":["Flying","Poison"]}]},"overqwil":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Crunch","Gunk Shot","Liquidation","Swords Dance"],"teraTypes":["Water"]}]},"scizor":{"level":79,"sets":[{"role":"Bulky Support","movepool":["Bullet Punch","Close Combat","Defog","Knock Off","U-turn"],"teraTypes":["Dragon","Steel"]},{"role":"Setup Sweeper","movepool":["Bug Bite","Bullet Punch","Close Combat","Knock Off","Swords Dance"],"teraTypes":["Steel"]},{"role":"Wallbreaker","movepool":["Bullet Punch","Close Combat","Knock Off","U-turn"],"teraTypes":["Steel"]}]},"heracross":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Facade","Knock Off","Trailblaze"],"teraTypes":["Normal"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Knock Off","Megahorn","Stone Edge"],"teraTypes":["Bug","Fighting","Rock"]}]},"ursaring":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Earthquake","Rest","Sleep Talk","Throat Chop"],"teraTypes":["Ghost","Ground"]}]},"magcargo":{"level":94,"sets":[{"role":"Setup Sweeper","movepool":["Earth Power","Fire Blast","Power Gem","Shell Smash"],"teraTypes":["Dragon","Grass"]},{"role":"Bulky Support","movepool":["Lava Plume","Power Gem","Recover","Stealth Rock","Yawn"],"teraTypes":["Dragon","Grass"]}]},"delibird":{"level":100,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Drill Run","Ice Shard","Ice Spinner","Spikes"],"teraTypes":["Flying","Ground","Ice"]},{"role":"Fast Support","movepool":["Brave Bird","Freeze-Dry","Rapid Spin","Spikes"],"teraTypes":["Ghost"]}]},"skarmory":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Brave Bird","Iron Defense","Roost"],"teraTypes":["Fighting"]},{"role":"Bulky Attacker","movepool":["Body Press","Brave Bird","Roost","Spikes","Stealth Rock"],"teraTypes":["Dragon","Fighting"]},{"role":"Bulky Support","movepool":["Brave Bird","Roost","Spikes","Stealth Rock","Whirlwind"],"teraTypes":["Dragon"]}]},"houndoom":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Fire Blast","Nasty Plot","Sludge Bomb","Sucker Punch"],"teraTypes":["Dark","Fire","Poison"]}]},"kingdra":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Hurricane","Rain Dance","Wave Crash"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Outrage","Waterfall","Wave Crash"],"teraTypes":["Dragon","Water"]},{"role":"Fast Bulky Setup","movepool":["Dragon Dance","Iron Head","Outrage","Wave Crash"],"teraTypes":["Dragon","Steel","Water"]}]},"donphan":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ice Shard","Ice Spinner","Knock Off","Rapid Spin","Stealth Rock"],"teraTypes":["Ghost","Grass"]}]},"porygon2":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Discharge","Ice Beam","Recover","Tri Attack"],"teraTypes":["Electric","Ghost","Poison"]},{"role":"Tera Blast user","movepool":["Recover","Shadow Ball","Tera Blast","Thunder Wave"],"teraTypes":["Fairy","Fighting"]}]},"smeargle":{"level":94,"sets":[{"role":"Fast Support","movepool":["Ceaseless Edge","Spore","Stealth Rock","Sticky Web","Whirlwind"],"teraTypes":["Ghost"]}]},"hitmontop":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Close Combat","Earthquake","Rapid Spin","Sucker Punch","Triple Axel"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Bulk Up","Close Combat","Rapid Spin","Triple Axel"],"teraTypes":["Ice"]}]},"chansey":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Heal Bell","Seismic Toss","Soft-Boiled","Stealth Rock","Thunder Wave"],"teraTypes":["Fairy","Ghost","Poison","Steel"]}]},"blissey":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Heal Bell","Seismic Toss","Soft-Boiled","Stealth Rock","Thunder Wave"],"teraTypes":["Fairy","Ghost","Poison","Steel"]}]},"raikou":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Scald","Substitute","Thunderbolt"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Calm Mind","Scald","Shadow Ball","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Water"]}]},"entei":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["Extreme Speed","Flare Blitz","Sacred Fire","Stomping Tantrum"],"teraTypes":["Fire","Normal"]},{"role":"Fast Attacker","movepool":["Extreme Speed","Flare Blitz","Sacred Fire","Stone Edge"],"teraTypes":["Fire","Normal"]}]},"suicune":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Rest","Scald","Sleep Talk"],"teraTypes":["Dragon","Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Ice Beam","Rest","Scald","Substitute"],"teraTypes":["Dragon","Steel"]},{"role":"Fast Support","movepool":["Calm Mind","Protect","Scald","Substitute"],"teraTypes":["Steel"]}]},"tyranitar":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Ice Punch","Knock Off","Stone Edge"],"teraTypes":["Ghost","Rock"]},{"role":"Bulky Support","movepool":["Earthquake","Fire Blast","Ice Beam","Knock Off","Stealth Rock","Stone Edge","Thunder Wave"],"teraTypes":["Ghost","Rock"]}]},"lugia":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Aeroblast","Calm Mind","Earth Power","Recover"],"teraTypes":["Ground","Steel"]}]},"hooh":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Earthquake","Recover","Sacred Fire"],"teraTypes":["Ground","Steel"]}]},"sceptile":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Focus Blast","Giga Drain","Leaf Storm","Rock Slide","Shed Tail"],"teraTypes":["Grass","Ground","Steel"]},{"role":"Fast Support","movepool":["Focus Blast","Giga Drain","Leech Seed","Substitute"],"teraTypes":["Steel"]},{"role":"Setup Sweeper","movepool":["Earthquake","Leaf Blade","Rock Slide","Swords Dance"],"teraTypes":["Rock"]}]},"blaziken":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Flare Blitz","Knock Off","Protect","Stone Edge","Swords Dance"],"teraTypes":["Dark","Fighting"]},{"role":"Fast Attacker","movepool":["Close Combat","Fire Blast","Knock Off","Protect"],"teraTypes":["Dark","Fighting","Fire"]}]},"swampert":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Flip Turn","Ice Beam","Knock Off","Roar","Stealth Rock"],"teraTypes":["Poison","Steel"]}]},"mightyena":{"level":95,"sets":[{"role":"Wallbreaker","movepool":["Crunch","Play Rough","Poison Fang","Sucker Punch","Taunt","Throat Chop"],"teraTypes":["Fairy","Poison"]},{"role":"AV Pivot","movepool":["Crunch","Play Rough","Poison Fang","Sucker Punch","Super Fang","Throat Chop"],"teraTypes":["Fairy","Poison"]}]},"ludicolo":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["Giga Drain","Hydro Pump","Ice Beam","Rain Dance"],"teraTypes":["Grass","Steel","Water"]},{"role":"Fast Attacker","movepool":["Giga Drain","Hydro Pump","Ice Beam","Leaf Storm"],"teraTypes":["Grass","Water"]}]},"shiftry":{"level":89,"sets":[{"role":"Fast Support","movepool":["Defog","Knock Off","Leaf Storm","Sucker Punch","Will-O-Wisp"],"teraTypes":["Dark","Poison"]},{"role":"Fast Bulky Setup","movepool":["Knock Off","Leaf Blade","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Poison"]},{"role":"Setup Sweeper","movepool":["Knock Off","Leaf Blade","Low Kick","Tailwind"],"teraTypes":["Dark","Fighting"]}]},"pelipper":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Hurricane","Hydro Pump","Knock Off","Roost","Surf","U-turn"],"teraTypes":["Ground","Water"]},{"role":"Wallbreaker","movepool":["Hurricane","Hydro Pump","Surf","U-turn"],"teraTypes":["Flying","Water"]}]},"gardevoir":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Focus Blast","Healing Wish","Moonblast","Mystical Fire","Psychic","Psyshock","Trick"],"teraTypes":["Fairy","Fighting","Fire"]}]},"masquerain":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["Bug Buzz","Hurricane","Hydro Pump","Quiver Dance"],"teraTypes":["Water"]},{"role":"Fast Support","movepool":["Bug Buzz","Hurricane","Hydro Pump","Sticky Web","Stun Spore","U-turn"],"teraTypes":["Ground","Steel","Water"]}]},"breloom":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Bullet Seed","Mach Punch","Rock Tomb","Spore","Swords Dance"],"teraTypes":["Fighting","Rock"]}]},"vigoroth":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Bulk Up","Knock Off","Slack Off"],"teraTypes":["Ghost"]},{"role":"Bulky Attacker","movepool":["Body Slam","Bulk Up","Earthquake","Slack Off"],"teraTypes":["Ground"]}]},"slaking":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Double-Edge","Earthquake","Giga Impact","Knock Off"],"teraTypes":["Ghost","Ground","Normal"]}]},"hariyama":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Bullet Punch","Close Combat","Facade","Headlong Rush","Knock Off"],"teraTypes":["Normal"]},{"role":"AV Pivot","movepool":["Bullet Punch","Close Combat","Headlong Rush","Heavy Slam","Knock Off","Stone Edge"],"teraTypes":["Steel"]}]},"sableye":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Recover","Taunt","Thunder Wave","Will-O-Wisp"],"teraTypes":["Steel"]}]},"medicham":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Bullet Punch","Close Combat","Ice Punch","Poison Jab","Zen Headbutt"],"teraTypes":["Fighting"]}]},"plusle":{"level":95,"sets":[{"role":"Setup Sweeper","movepool":["Alluring Voice","Encore","Grass Knot","Nasty Plot","Thunderbolt"],"teraTypes":["Electric","Fairy","Grass"]}]},"minun":{"level":95,"sets":[{"role":"Setup Sweeper","movepool":["Alluring Voice","Encore","Grass Knot","Nasty Plot","Thunderbolt"],"teraTypes":["Electric","Fairy","Grass"]}]},"volbeat":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Encore","Roost","Thunder Wave","U-turn"],"teraTypes":["Steel","Water"]},{"role":"Bulky Attacker","movepool":["Encore","Lunge","Roost","Thunder Wave"],"teraTypes":["Steel","Water"]}]},"illumise":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Bug Buzz","Encore","Roost","Thunder Wave"],"teraTypes":["Steel","Water"]}]},"swalot":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Clear Smog","Earthquake","Encore","Ice Beam","Knock Off","Pain Split","Sludge Bomb","Toxic Spikes"],"teraTypes":["Dark"]},{"role":"Bulky Support","movepool":["Earthquake","Protect","Sludge Bomb","Toxic"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Earthquake","Gunk Shot","Knock Off","Swords Dance"],"teraTypes":["Dark","Ground","Poison"]}]},"camerupt":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Overheat","Roar","Stealth Rock","Will-O-Wisp"],"teraTypes":["Grass","Water"]}]},"torkoal":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Lava Plume","Rapid Spin","Solar Beam","Stealth Rock","Yawn"],"teraTypes":["Grass"]},{"role":"Bulky Support","movepool":["Lava Plume","Rapid Spin","Solar Beam","Stealth Rock","Yawn"],"teraTypes":["Dragon","Grass"]}]},"grumpig":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["Dazzling Gleam","Earth Power","Nasty Plot","Psychic","Psyshock","Shadow Ball"],"teraTypes":["Fairy","Ghost","Ground","Psychic"]},{"role":"Bulky Attacker","movepool":["Earth Power","Focus Blast","Psychic","Psyshock","Shadow Ball","Trick"],"teraTypes":["Fighting","Ghost","Ground","Psychic"]}]},"flygon":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Dragon Dance","Earthquake","Outrage","Stone Edge","U-turn"],"teraTypes":["Ground","Rock","Steel"]}]},"cacturne":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["Focus Blast","Knock Off","Leaf Storm","Spikes","Sucker Punch","Toxic Spikes"],"teraTypes":["Dark","Grass","Poison"]},{"role":"Setup Sweeper","movepool":["Drain Punch","Knock Off","Seed Bomb","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fighting","Poison"]}]},"altaria":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Defog","Earthquake","Haze","Roost","Will-O-Wisp"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Brave Bird","Dragon Dance","Earthquake","Roost"],"teraTypes":["Ground","Steel"]}]},"zangoose":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Facade","Knock Off","Quick Attack","Swords Dance"],"teraTypes":["Normal"]}]},"seviper":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flamethrower","Giga Drain","Glare","Gunk Shot","Knock Off","Switcheroo"],"teraTypes":["Dark","Fire","Grass","Ground","Poison"]},{"role":"Setup Sweeper","movepool":["Earthquake","Gunk Shot","Swords Dance","Trailblaze"],"teraTypes":["Grass","Ground"]}]},"whiscash":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Hydro Pump","Ice Beam","Spikes","Stealth Rock"],"teraTypes":["Poison","Steel"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Liquidation","Stone Edge"],"teraTypes":["Ground","Steel"]}]},"crawdaunt":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Crabhammer","Dragon Dance","Knock Off"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Aqua Jet","Crabhammer","Dragon Dance","Knock Off","Swords Dance"],"teraTypes":["Water"]}]},"milotic":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Dragon Tail","Flip Turn","Haze","Ice Beam","Recover","Scald"],"teraTypes":["Dragon","Steel"]}]},"banette":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["Gunk Shot","Poltergeist","Shadow Sneak","Swords Dance","Thunder Wave"],"teraTypes":["Ghost","Poison"]}]},"tropius":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Air Slash","Leech Seed","Protect","Substitute"],"teraTypes":["Steel"]}]},"chimecho":{"level":94,"sets":[{"role":"Bulky Support","movepool":["Encore","Heal Bell","Knock Off","Psychic Noise","Recover","Thunder Wave"],"teraTypes":["Dark","Electric","Poison","Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Psychic","Psychic Noise","Psyshock","Recover"],"teraTypes":["Electric","Fairy","Poison","Steel"]}]},"glalie":{"level":96,"sets":[{"role":"Fast Support","movepool":["Disable","Earthquake","Freeze-Dry","Spikes","Taunt"],"teraTypes":["Ghost","Ground","Water"]}]},"luvdisc":{"level":100,"sets":[{"role":"Fast Support","movepool":["Endeavor","Substitute","Surf","Whirlpool"],"teraTypes":["Ghost"]}]},"salamence":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Dual Wingbeat","Earthquake","Outrage","Roost"],"teraTypes":["Dragon","Ground","Steel"]}]},"metagross":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["Agility","Earthquake","Heavy Slam","Knock Off","Psychic Fangs"],"teraTypes":["Ground"]},{"role":"Bulky Support","movepool":["Bullet Punch","Earthquake","Heavy Slam","Knock Off","Psychic Fangs","Stealth Rock"],"teraTypes":["Water"]}]},"regirock":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Iron Defense","Stealth Rock","Stone Edge","Thunder Wave"],"teraTypes":["Fighting"]},{"role":"Bulky Setup","movepool":["Body Press","Curse","Iron Defense","Rest","Stone Edge"],"teraTypes":["Fighting"]}]},"regice":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Ice Beam","Rest","Sleep Talk","Thunder Wave","Thunderbolt"],"teraTypes":["Electric"]}]},"registeel":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Curse","Iron Defense","Iron Head","Rest"],"teraTypes":["Fighting"]},{"role":"Bulky Support","movepool":["Body Press","Iron Defense","Iron Head","Stealth Rock","Thunder Wave"],"teraTypes":["Fighting"]}]},"latias":{"level":79,"sets":[{"role":"Fast Bulky Setup","movepool":["Aura Sphere","Calm Mind","Draco Meteor","Psyshock","Recover"],"teraTypes":["Steel"]}]},"latios":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Draco Meteor","Psyshock","Recover"],"teraTypes":["Steel"]},{"role":"Fast Attacker","movepool":["Aura Sphere","Calm Mind","Draco Meteor","Flip Turn","Luster Purge"],"teraTypes":["Dragon","Psychic","Steel"]}]},"kyogre":{"level":71,"sets":[{"role":"Fast Attacker","movepool":["Ice Beam","Origin Pulse","Thunder","Water Spout"],"teraTypes":["Water"]},{"role":"Bulky Setup","movepool":["Calm Mind","Ice Beam","Origin Pulse","Thunder"],"teraTypes":["Dragon","Electric","Steel"]}]},"groudon":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Heat Crash","Precipice Blades","Roar","Spikes","Stealth Rock","Stone Edge","Thunder Wave","Will-O-Wisp"],"teraTypes":["Fire"]},{"role":"Bulky Setup","movepool":["Heat Crash","Precipice Blades","Stone Edge","Swords Dance","Thunder Wave"],"teraTypes":["Fire"]}]},"rayquaza":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Ascent","Dragon Dance","Earthquake","Outrage"],"teraTypes":["Flying"]},{"role":"Fast Attacker","movepool":["Dragon Ascent","Earthquake","Extreme Speed","Swords Dance","U-turn"],"teraTypes":["Normal"]},{"role":"Fast Bulky Setup","movepool":["Dragon Ascent","Earthquake","Scale Shot","Swords Dance"],"teraTypes":["Dragon","Flying"]}]},"jirachi":{"level":80,"sets":[{"role":"Fast Support","movepool":["Body Slam","Iron Head","Protect","Wish"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Body Slam","Drain Punch","Iron Head","Stealth Rock","U-turn"],"teraTypes":["Fighting","Water"]},{"role":"Bulky Support","movepool":["Fire Punch","Healing Wish","Iron Head","Protect","U-turn","Wish"],"teraTypes":["Water"]}]},"deoxys":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Extreme Speed","Knock Off","Psycho Boost","Superpower"],"teraTypes":["Fighting","Normal","Psychic"]},{"role":"Wallbreaker","movepool":["Ice Beam","Knock Off","Psycho Boost","Superpower"],"teraTypes":["Fighting","Psychic"]}]},"deoxysattack":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Extreme Speed","Knock Off","Psycho Boost","Superpower"],"teraTypes":["Fighting","Normal","Psychic"]},{"role":"Wallbreaker","movepool":["Ice Beam","Knock Off","Psycho Boost","Superpower"],"teraTypes":["Fighting","Psychic"]}]},"deoxysdefense":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Cosmic Power","Night Shade","Recover","Spikes","Stealth Rock","Taunt"],"teraTypes":["Steel"]},{"role":"Bulky Support","movepool":["Knock Off","Psychic Noise","Recover","Spikes","Stealth Rock","Teleport"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dark Pulse","Focus Blast","Psychic","Psychic Noise","Psyshock","Recover"],"teraTypes":["Dark","Fighting","Steel"]}]},"deoxysspeed":{"level":82,"sets":[{"role":"Fast Support","movepool":["Knock Off","Psycho Boost","Spikes","Stealth Rock","Superpower","Taunt"],"teraTypes":["Dark","Fighting","Ghost","Steel"]},{"role":"Setup Sweeper","movepool":["Dark Pulse","Focus Blast","Nasty Plot","Psycho Boost"],"teraTypes":["Dark","Fighting","Psychic"]}]},"torterra":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["Bullet Seed","Headlong Rush","Rock Blast","Shell Smash"],"teraTypes":["Grass","Ground","Rock","Water"]}]},"infernape":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Grass Knot","Gunk Shot","Knock Off","Mach Punch","Overheat","Stone Edge"],"teraTypes":["Dark","Fighting","Fire"]},{"role":"Fast Support","movepool":["Close Combat","Flare Blitz","Gunk Shot","Knock Off","Mach Punch","Stone Edge","Swords Dance","U-turn"],"teraTypes":["Dark","Fighting","Fire"]}]},"empoleon":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Flip Turn","Ice Beam","Knock Off","Roost","Stealth Rock","Surf","Yawn"],"teraTypes":["Flying","Grass"]}]},"staraptor":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Close Combat","Double-Edge","Quick Attack","U-turn"],"teraTypes":["Fighting","Flying"]}]},"kricketune":{"level":99,"sets":[{"role":"Fast Support","movepool":["Knock Off","Pounce","Sticky Web","Swords Dance","Taunt"],"teraTypes":["Ghost"]}]},"luxray":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Facade","Play Rough","Supercell Slam","Throat Chop","Trailblaze"],"teraTypes":["Normal"]},{"role":"AV Pivot","movepool":["Ice Fang","Play Rough","Throat Chop","Volt Switch","Wild Charge"],"teraTypes":["Electric","Fairy"]}]},"rampardos":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Fire Punch","Head Smash","Rock Slide"],"teraTypes":["Ground","Rock"]},{"role":"Wallbreaker","movepool":["Earthquake","Fire Punch","Rock Slide","Zen Headbutt"],"teraTypes":["Psychic","Rock"]}]},"bastiodon":{"level":89,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Foul Play","Iron Defense","Rest"],"teraTypes":["Fighting"]}]},"vespiquen":{"level":98,"sets":[{"role":"Bulky Support","movepool":["Air Slash","Hurricane","Roost","Spikes","Toxic","Toxic Spikes","U-turn"],"teraTypes":["Steel"]}]},"pachirisu":{"level":96,"sets":[{"role":"AV Pivot","movepool":["Nuzzle","Super Fang","Thunderbolt","U-turn"],"teraTypes":["Flying"]},{"role":"Fast Support","movepool":["Encore","Super Fang","Thunderbolt","U-turn"],"teraTypes":["Flying"]}]},"floatzel":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["Crunch","Flip Turn","Ice Spinner","Low Kick","Wave Crash"],"teraTypes":["Water"]},{"role":"Bulky Setup","movepool":["Bulk Up","Crunch","Ice Spinner","Low Kick","Wave Crash"],"teraTypes":["Dark","Fighting","Ice","Steel","Water"]}]},"gastrodon":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Clear Smog","Earthquake","Ice Beam","Recover","Stealth Rock","Surf"],"teraTypes":["Poison","Steel"]},{"role":"Bulky Support","movepool":["Earthquake","Recover","Sludge Bomb","Stealth Rock","Surf"],"teraTypes":["Poison"]}]},"ambipom":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Double-Edge","Knock Off","Low Kick","Triple Axel","U-turn"],"teraTypes":["Ice","Normal"]},{"role":"Wallbreaker","movepool":["Double-Edge","Fake Out","Knock Off","Low Kick","U-turn"],"teraTypes":["Normal"]}]},"drifblim":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Calm Mind","Defog","Shadow Ball","Strength Sap"],"teraTypes":["Fairy","Ghost"]}]},"mismagius":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Energy Ball","Mystical Fire","Shadow Ball","Thunderbolt","Trick"],"teraTypes":["Electric","Fairy","Fire","Ghost"]},{"role":"Setup Sweeper","movepool":["Dazzling Gleam","Mystical Fire","Nasty Plot","Shadow Ball","Substitute","Thunderbolt"],"teraTypes":["Electric","Fairy"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Shadow Ball","Substitute","Tera Blast"],"teraTypes":["Fighting"]}]},"honchkrow":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Heat Wave","Sucker Punch","U-turn"],"teraTypes":["Dark","Flying"]},{"role":"Wallbreaker","movepool":["Brave Bird","Heat Wave","Lash Out","Sucker Punch","Thunder Wave"],"teraTypes":["Dark","Flying"]}]},"skuntank":{"level":84,"sets":[{"role":"Fast Support","movepool":["Fire Blast","Gunk Shot","Knock Off","Sucker Punch","Taunt","Toxic Spikes"],"teraTypes":["Dark","Poison"]}]},"bronzong":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Hypnosis","Iron Head","Psychic","Psychic Noise","Stealth Rock"],"teraTypes":["Electric","Water"]},{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Iron Head","Psychic Noise","Rest"],"teraTypes":["Fighting"]}]},"spiritomb":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Pain Split","Poltergeist","Shadow Sneak","Sucker Punch","Toxic","Will-O-Wisp"],"teraTypes":["Dark","Ghost"]}]},"garchomp":{"level":74,"sets":[{"role":"Fast Support","movepool":["Earthquake","Outrage","Spikes","Stealth Rock","Stone Edge"],"teraTypes":["Ground","Steel"]},{"role":"Setup Sweeper","movepool":["Earthquake","Fire Fang","Scale Shot","Stone Edge","Swords Dance"],"teraTypes":["Dragon","Fire","Ground"]}]},"lucario":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Meteor Mash","Stone Edge","Swords Dance"],"teraTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["Aura Sphere","Dark Pulse","Flash Cannon","Focus Blast","Nasty Plot","Vacuum Wave"],"teraTypes":["Fighting"]}]},"hippowdon":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Slack Off","Stealth Rock","Stone Edge","Whirlwind"],"teraTypes":["Dragon","Rock","Steel"]}]},"toxicroak":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Gunk Shot","Knock Off","Sucker Punch","Swords Dance"],"teraTypes":["Dark"]},{"role":"Setup Sweeper","movepool":["Close Combat","Earthquake","Gunk Shot","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fighting","Ground"]}]},"lumineon":{"level":93,"sets":[{"role":"Fast Support","movepool":["Alluring Voice","Encore","Hydro Pump","Ice Beam","U-turn"],"teraTypes":["Fairy","Water"]}]},"abomasnow":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Aurora Veil","Blizzard","Earthquake","Ice Shard","Wood Hammer"],"teraTypes":["Ice","Water"]}]},"weavile":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Ice Shard","Knock Off","Low Kick","Swords Dance","Triple Axel"],"teraTypes":["Dark","Fighting","Ice"]}]},"sneasler":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Dire Claw","Gunk Shot","Throat Chop","U-turn"],"teraTypes":["Dark","Fighting"]},{"role":"Setup Sweeper","movepool":["Acrobatics","Close Combat","Gunk Shot","Swords Dance"],"teraTypes":["Flying"]}]},"magnezone":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Body Press","Flash Cannon","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Fighting","Flying","Water"]},{"role":"AV Pivot","movepool":["Flash Cannon","Mirror Coat","Thunderbolt","Volt Switch"],"teraTypes":["Flying","Water"]},{"role":"Bulky Setup","movepool":["Body Press","Flash Cannon","Iron Defense","Thunderbolt"],"teraTypes":["Fighting"]}]},"rhyperior":{"level":83,"sets":[{"role":"Bulky Setup","movepool":["Earthquake","Ice Punch","Megahorn","Rock Polish","Stone Edge"],"teraTypes":["Bug","Ground","Rock"]},{"role":"Bulky Attacker","movepool":["Dragon Tail","Earthquake","Ice Punch","Megahorn","Stone Edge"],"teraTypes":["Bug","Dragon","Grass","Steel"]}]},"electivire":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flamethrower","Ice Punch","Knock Off","Supercell Slam","Volt Switch"],"teraTypes":["Dark","Electric","Ground"]},{"role":"Setup Sweeper","movepool":["Bulk Up","Earthquake","Ice Punch","Supercell Slam"],"teraTypes":["Ground"]}]},"magmortar":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Fire Blast","Focus Blast","Knock Off","Scorching Sands","Taunt","Thunderbolt"],"teraTypes":["Electric","Fighting","Water"]},{"role":"Fast Attacker","movepool":["Earthquake","Fire Blast","Focus Blast","Knock Off","Thunderbolt","Will-O-Wisp"],"teraTypes":["Electric","Fighting","Water"]}]},"yanmega":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Air Slash","Bug Buzz","Giga Drain","U-turn"],"teraTypes":["Bug"]},{"role":"Tera Blast user","movepool":["Air Slash","Bug Buzz","Protect","Tera Blast"],"teraTypes":["Ground"]}]},"leafeon":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Double-Edge","Knock Off","Leaf Blade","Substitute","Swords Dance","Synthesis"],"teraTypes":["Dark","Normal"]}]},"glaceon":{"level":94,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Freeze-Dry","Protect","Wish","Yawn"],"teraTypes":["Water"]}]},"gliscor":{"level":76,"sets":[{"role":"Fast Support","movepool":["Earthquake","Protect","Substitute","Toxic"],"teraTypes":["Water"]},{"role":"Bulky Support","movepool":["Earthquake","Knock Off","Protect","Stealth Rock","Toxic","Toxic Spikes","U-turn"],"teraTypes":["Water"]}]},"mamoswine":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Ice Shard","Icicle Crash","Knock Off","Stealth Rock"],"teraTypes":["Ground","Ice"]}]},"porygonz":{"level":83,"sets":[{"role":"Tera Blast user","movepool":["Agility","Nasty Plot","Shadow Ball","Tera Blast"],"teraTypes":["Fighting"]},{"role":"Fast Attacker","movepool":["Ice Beam","Nasty Plot","Shadow Ball","Thunderbolt","Tri Attack","Trick"],"teraTypes":["Electric","Ghost"]}]},"gallade":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Leaf Blade","Night Slash","Psycho Cut","Sacred Sword","Swords Dance"],"teraTypes":["Dark","Fighting","Grass"]},{"role":"Setup Sweeper","movepool":["Agility","Night Slash","Psycho Cut","Sacred Sword"],"teraTypes":["Dark","Fighting"]}]},"probopass":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Flash Cannon","Iron Defense","Power Gem","Rest","Thunder Wave"],"teraTypes":["Fighting"]},{"role":"Bulky Attacker","movepool":["Body Press","Flash Cannon","Power Gem","Stealth Rock","Thunder Wave","Volt Switch"],"teraTypes":["Fighting"]}]},"dusknoir":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Leech Life","Pain Split","Poltergeist","Shadow Sneak","Trick"],"teraTypes":["Ghost","Ground"]},{"role":"Bulky Support","movepool":["Earthquake","Pain Split","Poltergeist","Shadow Sneak","Will-O-Wisp"],"teraTypes":["Dark","Fairy"]}]},"froslass":{"level":87,"sets":[{"role":"Fast Support","movepool":["Destiny Bond","Poltergeist","Spikes","Taunt","Triple Axel","Will-O-Wisp"],"teraTypes":["Ghost","Ice"]}]},"rotom":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Nasty Plot","Shadow Ball","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Ghost"]}]},"rotomwash":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Hydro Pump","Nasty Plot","Pain Split","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Water"]}]},"rotomheat":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Nasty Plot","Overheat","Pain Split","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Fire"]}]},"rotomfrost":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Blizzard","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric"]}]},"rotomfan":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric"]}]},"rotommow":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Leaf Storm","Nasty Plot","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Grass"]}]},"uxie":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Psychic Noise","Stealth Rock","Thunder Wave","U-turn","Yawn"],"teraTypes":["Dark","Electric","Steel"]}]},"mesprit":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Dazzling Gleam","Healing Wish","Ice Beam","Nasty Plot","Psychic","Shadow Ball","Thunderbolt","U-turn"],"teraTypes":["Electric","Fairy"]},{"role":"Bulky Support","movepool":["Encore","Knock Off","Psychic Noise","Stealth Rock","Thunder Wave","U-turn"],"teraTypes":["Dark","Electric","Steel"]},{"role":"Bulky Attacker","movepool":["Drain Punch","Ice Beam","Knock Off","Psychic Noise","Thunder Wave","Thunderbolt","U-turn"],"teraTypes":["Dark","Fighting"]}]},"azelf":{"level":82,"sets":[{"role":"Fast Support","movepool":["Encore","Explosion","Fire Blast","Knock Off","Psychic","Stealth Rock","Taunt","U-turn"],"teraTypes":["Dark","Fire"]},{"role":"Fast Attacker","movepool":["Dazzling Gleam","Fire Blast","Nasty Plot","Psychic","Psyshock","Thunderbolt","Trick","U-turn"],"teraTypes":["Electric","Fairy","Fire","Psychic"]}]},"dialga":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Heavy Slam","Stealth Rock","Thunder Wave"],"teraTypes":["Dragon","Flying","Steel"]},{"role":"AV Pivot","movepool":["Draco Meteor","Dragon Tail","Fire Blast","Heavy Slam"],"teraTypes":["Dragon","Flying","Steel"]}]},"dialgaorigin":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Flash Cannon","Heavy Slam","Stealth Rock","Thunder Wave"],"teraTypes":["Dragon","Fire","Flying","Steel"]},{"role":"Bulky Attacker","movepool":["Draco Meteor","Dragon Tail","Fire Blast","Flash Cannon","Heavy Slam","Stealth Rock"],"teraTypes":["Dragon","Fire","Flying","Steel"]}]},"palkia":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend"],"teraTypes":["Dragon","Water"]},{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend","Thunder Wave"],"teraTypes":["Dragon","Water"]}]},"palkiaorigin":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend","Thunder Wave"],"teraTypes":["Dragon","Water"]}]},"heatran":{"level":79,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Flash Cannon","Heavy Slam","Lava Plume","Magma Storm","Stealth Rock"],"teraTypes":["Flying","Grass","Steel"]}]},"regigigas":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Body Slam","Double-Edge","Knock Off","Rest","Sleep Talk"],"teraTypes":["Ghost"]},{"role":"Bulky Attacker","movepool":["Body Slam","Knock Off","Protect","Substitute"],"teraTypes":["Ghost","Poison"]}]},"giratina":{"level":75,"sets":[{"role":"Fast Support","movepool":["Dragon Tail","Rest","Shadow Ball","Sleep Talk","Will-O-Wisp"],"teraTypes":["Fairy"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dragon Pulse","Rest","Sleep Talk"],"teraTypes":["Fairy"]},{"role":"Bulky Support","movepool":["Defog","Dragon Tail","Rest","Shadow Ball","Will-O-Wisp"],"teraTypes":["Fairy"]}]},"giratinaorigin":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Defog","Draco Meteor","Dragon Tail","Poltergeist","Shadow Sneak","Will-O-Wisp"],"teraTypes":["Dragon","Fairy","Ghost","Steel"]}]},"cresselia":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Moonlight","Psyshock","Thunderbolt"],"teraTypes":["Electric","Fairy","Poison","Steel"]}]},"phione":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["Rest","Scald","Sleep Talk","Take Heart"],"teraTypes":["Dragon","Steel"]},{"role":"Bulky Attacker","movepool":["Grass Knot","Ice Beam","Scald","Take Heart"],"teraTypes":["Grass","Steel"]}]},"manaphy":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Energy Ball","Hydro Pump","Ice Beam","Surf","Tail Glow"],"teraTypes":["Grass","Water"]}]},"darkrai":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Focus Blast","Hypnosis","Nasty Plot","Sludge Bomb","Substitute"],"teraTypes":["Poison"]}]},"shaymin":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Earth Power","Rest","Seed Flare"],"teraTypes":["Grass","Ground","Steel"]},{"role":"Bulky Support","movepool":["Air Slash","Leech Seed","Seed Flare","Substitute"],"teraTypes":["Steel"]}]},"shayminsky":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Dazzling Gleam","Earth Power","Seed Flare"],"teraTypes":["Flying","Grass"]},{"role":"Bulky Support","movepool":["Air Slash","Leech Seed","Seed Flare","Substitute"],"teraTypes":["Steel"]}]},"arceus":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Recover","Shadow Claw","Swords Dance"],"teraTypes":["Ghost","Normal"]}]},"arceusbug":{"level":73,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Earth Power","Ice Beam","Judgment"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Recover"],"teraTypes":["Fire"]}]},"arceusdark":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Judgment","Recover","Sludge Bomb"],"teraTypes":["Fairy","Poison"]}]},"arceusdragon":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Gunk Shot","Outrage","Swords Dance"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Gunk Shot","Outrage"],"teraTypes":["Ground","Poison"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Recover","Sludge Bomb"],"teraTypes":["Fire"]}]},"arceuselectric":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Ice Beam","Judgment","Recover"],"teraTypes":["Electric","Ice"]}]},"arceusfairy":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover"],"teraTypes":["Ground","Steel"]}]},"arceusfighting":{"level":69,"sets":[{"role":"Fast Bulky Setup","movepool":["Body Press","Cosmic Power","Recover","Stored Power"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Recover","Shadow Ball"],"teraTypes":["Steel"]}]},"arceusfire":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Flare Blitz","Recover","Swords Dance"],"teraTypes":["Fire","Ground"]},{"role":"Fast Bulky Setup","movepool":["Dragon Dance","Earthquake","Flare Blitz","Recover"],"teraTypes":["Fire","Ground"]},{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Energy Ball","Judgment","Recover"],"teraTypes":["Grass","Ground"]}]},"arceusflying":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover"],"teraTypes":["Ground","Steel"]}]},"arceusghost":{"level":70,"sets":[{"role":"Bulky Support","movepool":["Focus Blast","Judgment","Recover","Will-O-Wisp"],"teraTypes":["Fighting","Normal"]},{"role":"Bulky Setup","movepool":["Calm Mind","Focus Blast","Judgment","Recover"],"teraTypes":["Fighting","Ghost","Normal"]}]},"arceusgrass":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Earth Power","Ice Beam","Judgment"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Recover"],"teraTypes":["Fire"]}]},"arceusground":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Ice Beam","Judgment","Recover"],"teraTypes":["Dragon","Ground"]},{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Stone Edge","Swords Dance"],"teraTypes":["Normal"]},{"role":"Fast Bulky Setup","movepool":["Dragon Dance","Earthquake","Recover","Stone Edge"],"teraTypes":["Ground","Steel"]}]},"arceusice":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover","Thunderbolt"],"teraTypes":["Electric","Ground"]}]},"arceuspoison":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Flare Blitz","Gunk Shot","Liquidation","Recover","Swords Dance"],"teraTypes":["Ground"]},{"role":"Fast Bulky Setup","movepool":["Earthquake","Extreme Speed","Gunk Shot","Swords Dance"],"teraTypes":["Ground","Normal"]}]},"arceuspsychic":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Cosmic Power","Recover","Stored Power"],"teraTypes":["Steel"]}]},"arceusrock":{"level":73,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"teraTypes":["Dragon","Ground"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Recover","Stone Edge","Swords Dance"],"teraTypes":["Ground"]}]},"arceussteel":{"level":70,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Judgment","Recover","Will-O-Wisp"],"teraTypes":["Ghost"]},{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover"],"teraTypes":["Ghost"]}]},"arceuswater":{"level":71,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Ice Beam","Judgment","Recover","Will-O-Wisp"],"teraTypes":["Steel"]}]},"serperior":{"level":80,"sets":[{"role":"Tera Blast user","movepool":["Glare","Leaf Storm","Leech Seed","Substitute","Synthesis","Tera Blast"],"teraTypes":["Fire","Rock"]},{"role":"Fast Attacker","movepool":["Dragon Pulse","Glare","Leaf Storm","Leech Seed","Substitute","Synthesis"],"teraTypes":["Dragon","Grass","Water"]}]},"emboar":{"level":84,"sets":[{"role":"AV Pivot","movepool":["Close Combat","Flare Blitz","Knock Off","Scald","Wild Charge"],"teraTypes":["Dark","Electric","Fire","Water"]},{"role":"Fast Attacker","movepool":["Close Combat","Flare Blitz","Head Smash","Knock Off","Wild Charge"],"teraTypes":["Fire"]},{"role":"Setup Sweeper","movepool":["Bulk Up","Drain Punch","Flare Blitz","Trailblaze"],"teraTypes":["Fighting","Grass"]}]},"samurott":{"level":88,"sets":[{"role":"AV Pivot","movepool":["Aqua Jet","Flip Turn","Grass Knot","Hydro Pump","Ice Beam","Knock Off","Megahorn","Sacred Sword"],"teraTypes":["Dark","Grass","Water"]},{"role":"Setup Sweeper","movepool":["Aqua Jet","Knock Off","Liquidation","Megahorn","Sacred Sword","Swords Dance"],"teraTypes":["Dark","Water"]}]},"samurotthisui":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Ceaseless Edge","Razor Shell","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Poison","Water"]},{"role":"Wallbreaker","movepool":["Aqua Jet","Ceaseless Edge","Flip Turn","Razor Shell"],"teraTypes":["Dark","Poison","Water"]}]},"zebstrika":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["High Horsepower","Overheat","Supercell Slam","Volt Switch"],"teraTypes":["Ground"]}]},"excadrill":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Iron Head","Rapid Spin","Rock Slide","Swords Dance"],"teraTypes":["Grass","Ground","Water"]}]},"gurdurr":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Bulk Up","Defog","Drain Punch","Knock Off","Mach Punch"],"teraTypes":["Steel"]}]},"conkeldurr":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Facade","Knock Off","Mach Punch"],"teraTypes":["Normal"]}]},"leavanny":{"level":87,"sets":[{"role":"Fast Support","movepool":["Knock Off","Leaf Blade","Lunge","Sticky Web","Swords Dance"],"teraTypes":["Ghost","Rock"]},{"role":"Setup Sweeper","movepool":["Knock Off","Leaf Blade","Lunge","Swords Dance","Triple Axel"],"teraTypes":["Dark","Rock"]}]},"whimsicott":{"level":85,"sets":[{"role":"Fast Support","movepool":["Encore","Giga Drain","Moonblast","Stun Spore","Taunt","U-turn"],"teraTypes":["Poison","Steel"]},{"role":"Bulky Support","movepool":["Encore","Hurricane","Leech Seed","Moonblast","Substitute"],"teraTypes":["Steel"]}]},"lilligant":{"level":86,"sets":[{"role":"Tera Blast user","movepool":["Giga Drain","Pollen Puff","Quiver Dance","Sleep Powder","Tera Blast"],"teraTypes":["Fire","Rock"]},{"role":"Setup Sweeper","movepool":["Alluring Voice","Petal Dance","Quiver Dance","Sleep Powder"],"teraTypes":["Fairy","Grass"]}]},"lilliganthisui":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Ice Spinner","Leaf Blade","Sleep Powder","Victory Dance"],"teraTypes":["Fighting"]}]},"basculin":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Double-Edge","Flip Turn","Wave Crash"],"teraTypes":["Water"]}]},"basculegion":{"level":81,"sets":[{"role":"AV Pivot","movepool":["Aqua Jet","Flip Turn","Shadow Ball","Wave Crash"],"teraTypes":["Water"]}]},"basculegionf":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["Flip Turn","Hydro Pump","Ice Beam","Shadow Ball"],"teraTypes":["Water"]},{"role":"AV Pivot","movepool":["Flip Turn","Hydro Pump","Shadow Ball","Wave Crash"],"teraTypes":["Water"]}]},"krookodile":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Bulk Up","Earthquake","Gunk Shot","Knock Off","Stealth Rock","Stone Edge"],"teraTypes":["Ground","Poison"]}]},"scrafty":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Knock Off","Rest"],"teraTypes":["Poison"]},{"role":"Setup Sweeper","movepool":["Close Combat","Dragon Dance","Knock Off","Poison Jab"],"teraTypes":["Poison"]}]},"zoroark":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["Dark Pulse","Flamethrower","Focus Blast","Nasty Plot","Psychic","Sludge Bomb","Trick","U-turn"],"teraTypes":["Poison"]}]},"zoroarkhisui":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Bitter Malice","Flamethrower","Focus Blast","Hyper Voice","Nasty Plot","Trick","U-turn"],"teraTypes":["Fighting","Normal"]}]},"cinccino":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Bullet Seed","Tail Slap","Tidy Up","Triple Axel","U-turn"],"teraTypes":["Grass","Ice","Normal"]}]},"gothitelle":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Dark Pulse","Focus Blast","Psychic Noise","Thunderbolt"],"teraTypes":["Dark","Electric","Fairy","Fighting","Flying","Ghost","Ground","Psychic","Steel"]},{"role":"Fast Attacker","movepool":["Dark Pulse","Focus Blast","Psychic","Trick"],"teraTypes":["Dark","Fairy","Fighting","Flying","Ghost","Ground","Psychic","Steel"]}]},"reuniclus":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Focus Blast","Psychic","Psyshock","Recover","Shadow Ball"],"teraTypes":["Fighting","Steel"]}]},"swanna":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Defog","Hydro Pump","Knock Off","Roost"],"teraTypes":["Ground"]}]},"sawsbuck":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Double-Edge","High Horsepower","Horn Leech","Swords Dance"],"teraTypes":["Ground","Normal"]},{"role":"Fast Attacker","movepool":["Headbutt","High Horsepower","Horn Leech","Swords Dance"],"teraTypes":["Normal"]}]},"amoonguss":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Clear Smog","Giga Drain","Sludge Bomb","Spore","Toxic"],"teraTypes":["Steel","Water"]}]},"alomomola":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Flip Turn","Protect","Scald","Wish"],"teraTypes":["Steel"]},{"role":"Fast Support","movepool":["Flip Turn","Protect","Scald","Wish"],"teraTypes":["Steel"]}]},"galvantula":{"level":82,"sets":[{"role":"Fast Support","movepool":["Bug Buzz","Giga Drain","Sticky Web","Thunder","Volt Switch"],"teraTypes":["Electric"]}]},"eelektross":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Coil","Drain Punch","Fire Punch","Knock Off","Supercell Slam"],"teraTypes":["Fighting"]},{"role":"AV Pivot","movepool":["Close Combat","Discharge","Flamethrower","Giga Drain","Knock Off","U-turn"],"teraTypes":["Poison","Steel"]}]},"chandelure":{"level":83,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Energy Ball","Fire Blast","Pain Split","Shadow Ball","Substitute","Will-O-Wisp"],"teraTypes":["Fire","Ghost","Grass"]},{"role":"Fast Attacker","movepool":["Energy Ball","Fire Blast","Shadow Ball","Trick"],"teraTypes":["Fire","Ghost","Grass"]}]},"haxorus":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Dragon Dance","Earthquake","Iron Head","Outrage"],"teraTypes":["Steel"]},{"role":"Fast Bulky Setup","movepool":["Close Combat","Earthquake","Iron Head","Scale Shot","Swords Dance"],"teraTypes":["Steel"]}]},"beartic":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Close Combat","Earthquake","Icicle Crash","Snowscape","Swords Dance"],"teraTypes":["Fighting","Ground","Ice"]}]},"cryogonal":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Flash Cannon","Freeze-Dry","Haze","Rapid Spin","Recover"],"teraTypes":["Poison","Steel"]},{"role":"Tera Blast user","movepool":["Ice Beam","Rapid Spin","Recover","Tera Blast"],"teraTypes":["Electric"]}]},"mienshao":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["High Jump Kick","Knock Off","Poison Jab","Triple Axel","U-turn"],"teraTypes":["Fighting"]},{"role":"AV Pivot","movepool":["Close Combat","Fake Out","Knock Off","U-turn"],"teraTypes":["Dark","Steel"]},{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Poison Jab","Swords Dance","Triple Axel"],"teraTypes":["Dark","Fighting","Poison"]}]},"golurk":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Dynamic Punch","Earthquake","Poltergeist","Stealth Rock","Stone Edge"],"teraTypes":["Fighting","Ghost","Ground"]}]},"braviary":{"level":85,"sets":[{"role":"Fast Bulky Setup","movepool":["Brave Bird","Bulk Up","Close Combat","Roost"],"teraTypes":["Fighting","Steel"]}]},"braviaryhisui":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["Agility","Heat Wave","Hurricane","Psychic"],"teraTypes":["Fairy","Fire","Psychic","Steel"]},{"role":"Wallbreaker","movepool":["Calm Mind","Defog","Esper Wing","Heat Wave","Hurricane","U-turn"],"teraTypes":["Fairy","Psychic","Steel"]}]},"mandibuzz":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Defog","Foul Play","Roost","Toxic","U-turn"],"teraTypes":["Steel"]},{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Foul Play","Knock Off","Roost","Toxic"],"teraTypes":["Steel"]}]},"hydreigon":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Draco Meteor","Fire Blast","Flash Cannon","Nasty Plot","U-turn"],"teraTypes":["Dark","Dragon","Fire","Steel"]}]},"volcarona":{"level":77,"sets":[{"role":"Fast Bulky Setup","movepool":["Bug Buzz","Fiery Dance","Fire Blast","Giga Drain","Morning Sun","Quiver Dance"],"teraTypes":["Fire","Grass","Water"]},{"role":"Tera Blast user","movepool":["Bug Buzz","Fiery Dance","Fire Blast","Giga Drain","Quiver Dance","Tera Blast"],"teraTypes":["Ground","Water"]}]},"cobalion":{"level":80,"sets":[{"role":"Fast Bulky Setup","movepool":["Close Combat","Iron Head","Stone Edge","Swords Dance","Taunt"],"teraTypes":["Fighting"]},{"role":"Bulky Setup","movepool":["Aura Sphere","Calm Mind","Flash Cannon","Vacuum Wave"],"teraTypes":["Fighting","Ghost","Water"]},{"role":"Bulky Support","movepool":["Body Press","Iron Defense","Iron Head","Stealth Rock","Stone Edge","Thunder Wave","Volt Switch"],"teraTypes":["Ghost","Water"]}]},"terrakion":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Earthquake","Stone Edge","Swords Dance"],"teraTypes":["Fighting","Ground"]},{"role":"Wallbreaker","movepool":["Close Combat","Earthquake","Quick Attack","Stone Edge"],"teraTypes":["Fighting","Ground"]}]},"virizion":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Leaf Blade","Stone Edge","Swords Dance"],"teraTypes":["Rock"]}]},"tornadus":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Bleakwind Storm","Focus Blast","Grass Knot","Heat Wave","Nasty Plot","U-turn"],"teraTypes":["Fighting","Fire","Flying"]}]},"tornadustherian":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Bleakwind Storm","Focus Blast","Grass Knot","Heat Wave","Nasty Plot","U-turn"],"teraTypes":["Fighting","Fire","Flying"]},{"role":"AV Pivot","movepool":["Bleakwind Storm","Heat Wave","Knock Off","U-turn"],"teraTypes":["Dark","Fire","Flying"]}]},"thundurus":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Knock Off","Nasty Plot","Sludge Wave","Taunt","Thunder Wave","Thunderbolt","U-turn"],"teraTypes":["Electric","Grass"]},{"role":"Tera Blast user","movepool":["Focus Blast","Nasty Plot","Tera Blast","Thunderbolt"],"teraTypes":["Flying"]},{"role":"Wallbreaker","movepool":["Acrobatics","Focus Blast","Grass Knot","Knock Off","Taunt","Thunder Wave","Thunderbolt","U-turn"],"teraTypes":["Electric","Flying","Grass","Steel"]}]},"thundurustherian":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Nasty Plot","Psychic","Sludge Wave","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Poison","Psychic"]},{"role":"Tera Blast user","movepool":["Focus Blast","Nasty Plot","Tera Blast","Thunderbolt"],"teraTypes":["Flying"]}]},"reshiram":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Blue Flare","Draco Meteor","Dragon Tail","Earth Power","Will-O-Wisp"],"teraTypes":["Fire","Ground"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Flare Blitz","Outrage","Stone Edge"],"teraTypes":["Dragon","Fire"]}]},"zekrom":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["Bolt Strike","Dragon Dance","Outrage","Substitute"],"teraTypes":["Electric"]}]},"landorus":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Earth Power","Focus Blast","Nasty Plot","Psychic","Rock Slide","Sludge Wave","Stealth Rock"],"teraTypes":["Ground","Poison","Psychic"]}]},"landorustherian":{"level":76,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Stealth Rock","Stone Edge","Taunt","U-turn"],"teraTypes":["Ground","Water"]}]},"kyurem":{"level":77,"sets":[{"role":"Tera Blast user","movepool":["Dragon Dance","Icicle Spear","Scale Shot","Tera Blast"],"teraTypes":["Ground"]},{"role":"Wallbreaker","movepool":["Draco Meteor","Earth Power","Freeze-Dry","Ice Beam","Outrage"],"teraTypes":["Ground"]}]},"kyuremwhite":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Earth Power","Freeze-Dry","Fusion Flare"],"teraTypes":["Dragon","Fire"]},{"role":"Bulky Attacker","movepool":["Draco Meteor","Freeze-Dry","Fusion Flare","Ice Beam"],"teraTypes":["Dragon","Fire"]}]},"kyuremblack":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Fusion Bolt","Icicle Spear","Scale Shot"],"teraTypes":["Electric"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Icicle Spear","Scale Shot","Tera Blast"],"teraTypes":["Ground"]}]},"keldeoresolute":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Air Slash","Calm Mind","Flip Turn","Hydro Pump","Secret Sword","Vacuum Wave"],"teraTypes":["Fighting","Water"]},{"role":"Bulky Setup","movepool":["Calm Mind","Hydro Pump","Secret Sword","Substitute","Surf"],"teraTypes":["Steel"]}]},"meloetta":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Focus Blast","Hyper Voice","Psyshock","U-turn"],"teraTypes":["Fighting","Normal","Psychic"]},{"role":"Wallbreaker","movepool":["Close Combat","Knock Off","Relic Song","Triple Axel"],"teraTypes":["Dark","Fighting"]}]},"chesnaught":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Body Press","Knock Off","Spikes","Synthesis","Wood Hammer"],"teraTypes":["Steel","Water"]},{"role":"Fast Bulky Setup","movepool":["Body Press","Iron Defense","Synthesis","Trailblaze"],"teraTypes":["Steel"]}]},"delphox":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Fire Blast","Focus Blast","Grass Knot","Nasty Plot","Psyshock"],"teraTypes":["Fighting","Fire","Grass","Psychic"]}]},"greninja":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Grass Knot","Gunk Shot","Hydro Pump","Ice Beam","Toxic Spikes","U-turn"],"teraTypes":["Dark","Poison","Water"]}]},"greninjabond":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Gunk Shot","Hydro Pump","Ice Beam"],"teraTypes":["Poison","Water"]}]},"talonflame":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Overheat","Roost","Taunt","U-turn","Will-O-Wisp"],"teraTypes":["Dragon","Ground"]},{"role":"Tera Blast user","movepool":["Brave Bird","Flare Blitz","Swords Dance","Tera Blast"],"teraTypes":["Ground"]}]},"vivillon":{"level":85,"sets":[{"role":"Fast Bulky Setup","movepool":["Bug Buzz","Energy Ball","Hurricane","Quiver Dance","Sleep Powder"],"teraTypes":["Flying"]},{"role":"Tera Blast user","movepool":["Hurricane","Quiver Dance","Sleep Powder","Tera Blast"],"teraTypes":["Ground"]}]},"pyroar":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Fire Blast","Hyper Voice","Will-O-Wisp","Work Up"],"teraTypes":["Fire"]}]},"florges":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Protect","Wish"],"teraTypes":["Steel"]},{"role":"Tera Blast user","movepool":["Calm Mind","Moonblast","Synthesis","Tera Blast"],"teraTypes":["Ground"]}]},"gogoat":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Earthquake","Horn Leech","Milk Drink","Rock Slide"],"teraTypes":["Ground","Water"]}]},"meowstic":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Alluring Voice","Light Screen","Psychic Noise","Reflect","Thunder Wave","Yawn"],"teraTypes":["Fairy"]}]},"meowsticf":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["Alluring Voice","Dark Pulse","Nasty Plot","Psychic","Psyshock","Thunderbolt"],"teraTypes":["Dark","Electric","Fairy"]}]},"malamar":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Knock Off","Rest","Sleep Talk","Superpower"],"teraTypes":["Fighting","Poison","Steel"]},{"role":"Fast Bulky Setup","movepool":["Knock Off","Psycho Cut","Rest","Superpower"],"teraTypes":["Fighting","Poison","Steel"]}]},"dragalge":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Flip Turn","Focus Blast","Sludge Wave","Toxic","Toxic Spikes"],"teraTypes":["Fighting"]}]},"clawitzer":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Aura Sphere","Dark Pulse","Dragon Pulse","U-turn","Water Pulse"],"teraTypes":["Dark","Dragon","Fighting"]}]},"sylveon":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Hyper Voice","Protect","Wish"],"teraTypes":["Steel"]}]},"hawlucha":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Acrobatics","Brave Bird","Close Combat","Encore","Stone Edge","Swords Dance","Throat Chop"],"teraTypes":["Fighting","Flying"]}]},"dedenne":{"level":88,"sets":[{"role":"Fast Support","movepool":["Dazzling Gleam","Nuzzle","Super Fang","Thunderbolt","U-turn"],"teraTypes":["Electric","Flying"]}]},"carbink":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Moonblast","Power Gem","Spikes","Stealth Rock"],"teraTypes":["Fighting"]},{"role":"Fast Bulky Setup","movepool":["Body Press","Iron Defense","Moonblast","Rest","Rock Polish"],"teraTypes":["Fighting"]}]},"goodra":{"level":85,"sets":[{"role":"AV Pivot","movepool":["Draco Meteor","Earthquake","Fire Blast","Knock Off","Power Whip","Scald","Sludge Bomb","Thunderbolt"],"teraTypes":["Electric","Fire","Grass","Ground","Poison","Water"]}]},"goodrahisui":{"level":82,"sets":[{"role":"AV Pivot","movepool":["Draco Meteor","Dragon Tail","Earthquake","Fire Blast","Heavy Slam","Hydro Pump","Knock Off","Thunderbolt"],"teraTypes":["Dragon","Flying","Ground","Water"]}]},"klefki":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Magnet Rise","Play Rough","Spikes","Thunder Wave"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Dazzling Gleam","Foul Play","Spikes","Thunder Wave"],"teraTypes":["Flying","Water"]}]},"trevenant":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Drain Punch","Horn Leech","Poltergeist","Rest","Trick Room","Wood Hammer"],"teraTypes":["Fighting"]},{"role":"Bulky Support","movepool":["Drain Punch","Poltergeist","Protect","Toxic"],"teraTypes":["Dark","Fairy","Fighting","Steel"]}]},"avalugg":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Avalanche","Body Press","Curse","Rapid Spin","Recover"],"teraTypes":["Fighting"]}]},"avalugghisui":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Avalanche","Body Press","Rapid Spin","Recover","Stone Edge"],"teraTypes":["Flying","Ghost","Poison"]}]},"noivern":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Draco Meteor","Flamethrower","Hurricane","Roost","U-turn"],"teraTypes":["Normal"]},{"role":"Fast Support","movepool":["Defog","Draco Meteor","Flamethrower","Hurricane","Roost","U-turn"],"teraTypes":["Fire"]}]},"diancie":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Diamond Storm","Earth Power","Moonblast","Rock Polish","Stealth Rock"],"teraTypes":["Fighting"]},{"role":"Bulky Setup","movepool":["Calm Mind","Diamond Storm","Draining Kiss","Earth Power"],"teraTypes":["Fairy","Water"]}]},"hoopa":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Nasty Plot","Psychic","Psyshock","Shadow Ball","Trick"],"teraTypes":["Fighting","Ghost","Psychic"]}]},"hoopaunbound":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Drain Punch","Gunk Shot","Hyperspace Fury","Trick","Zen Headbutt"],"teraTypes":["Dark","Fighting","Poison"]},{"role":"Bulky Attacker","movepool":["Focus Blast","Gunk Shot","Hyperspace Fury","Psychic","Trick"],"teraTypes":["Fighting","Poison"]}]},"volcanion":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Flame Charge","Flamethrower","Haze","Sludge Bomb","Steam Eruption"],"teraTypes":["Fire","Ground","Water"]}]},"decidueye":{"level":88,"sets":[{"role":"Fast Support","movepool":["Defog","Knock Off","Leaf Storm","Roost","Spirit Shackle","U-turn"],"teraTypes":["Dark","Ghost","Grass"]},{"role":"Setup Sweeper","movepool":["Leaf Blade","Poltergeist","Shadow Sneak","Swords Dance"],"teraTypes":["Ghost"]}]},"decidueyehisui":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Knock Off","Leaf Blade","Roost","Sucker Punch","Swords Dance","Triple Arrows","U-turn"],"teraTypes":["Steel"]}]},"incineroar":{"level":84,"sets":[{"role":"AV Pivot","movepool":["Close Combat","Fake Out","Knock Off","Overheat","U-turn"],"teraTypes":["Fighting","Water"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Flare Blitz","Knock Off","Parting Shot","Will-O-Wisp"],"teraTypes":["Fighting","Water"]},{"role":"Setup Sweeper","movepool":["Flare Blitz","Knock Off","Swords Dance","Trailblaze"],"teraTypes":["Grass"]}]},"primarina":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["Flip Turn","Hydro Pump","Moonblast","Psychic"],"teraTypes":["Water"]},{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Moonblast","Sparkling Aria"],"teraTypes":["Fairy","Poison","Steel"]},{"role":"Bulky Attacker","movepool":["Calm Mind","Draining Kiss","Psychic","Sparkling Aria"],"teraTypes":["Fairy","Poison","Steel"]}]},"toucannon":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Beak Blast","Boomburst","Bullet Seed","Knock Off","Roost","U-turn"],"teraTypes":["Steel"]}]},"gumshoos":{"level":95,"sets":[{"role":"Wallbreaker","movepool":["Double-Edge","Earthquake","Knock Off","U-turn"],"teraTypes":["Ground","Normal"]}]},"vikavolt":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Bug Buzz","Energy Ball","Sticky Web","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]}]},"crabominable":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Drain Punch","Earthquake","Gunk Shot","Ice Hammer","Knock Off"],"teraTypes":["Fighting","Ground"]}]},"oricorio":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["Hurricane","Quiver Dance","Revelation Dance","Roost"],"teraTypes":["Ground"]}]},"oricoriopompom":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Hurricane","Quiver Dance","Revelation Dance","Roost"],"teraTypes":["Ground"]}]},"oricoriopau":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["Hurricane","Quiver Dance","Revelation Dance","Roost"],"teraTypes":["Fighting","Ground"]}]},"oricoriosensu":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["Hurricane","Quiver Dance","Revelation Dance","Roost"],"teraTypes":["Fighting","Ghost"]}]},"ribombee":{"level":82,"sets":[{"role":"Fast Support","movepool":["Bug Buzz","Moonblast","Sticky Web","Stun Spore","U-turn"],"teraTypes":["Ghost"]},{"role":"Tera Blast user","movepool":["Bug Buzz","Moonblast","Quiver Dance","Tera Blast"],"teraTypes":["Ground"]}]},"lycanroc":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Accelerock","Close Combat","Crunch","Psychic Fangs","Stealth Rock","Stone Edge","Swords Dance","Taunt"],"teraTypes":["Fighting"]}]},"lycanrocmidnight":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Knock Off","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"teraTypes":["Fighting"]}]},"lycanrocdusk":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Accelerock","Close Combat","Psychic Fangs","Stone Edge","Swords Dance","Throat Chop"],"teraTypes":["Fighting"]}]},"toxapex":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Haze","Liquidation","Recover","Toxic","Toxic Spikes"],"teraTypes":["Fairy","Flying","Grass","Steel"]}]},"mudsdale":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Earthquake","Heavy Slam","Stealth Rock","Stone Edge"],"teraTypes":["Fighting"]}]},"araquanid":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Hydro Pump","Leech Life","Liquidation","Mirror Coat","Sticky Web"],"teraTypes":["Ground","Steel","Water"]}]},"lurantis":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Knock Off","Leaf Storm","Superpower","Synthesis"],"teraTypes":["Fighting"]},{"role":"AV Pivot","movepool":["Knock Off","Leaf Storm","Leech Life","Superpower"],"teraTypes":["Fighting","Steel","Water"]}]},"salazzle":{"level":82,"sets":[{"role":"Fast Support","movepool":["Flamethrower","Protect","Substitute","Toxic"],"teraTypes":["Flying","Grass"]}]},"tsareena":{"level":87,"sets":[{"role":"Fast Support","movepool":["High Jump Kick","Knock Off","Power Whip","Rapid Spin","Synthesis","Triple Axel","U-turn"],"teraTypes":["Fighting","Steel"]}]},"comfey":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Giga Drain","Stored Power"],"teraTypes":["Fairy","Poison","Steel"]},{"role":"Tera Blast user","movepool":["Calm Mind","Draining Kiss","Giga Drain","Synthesis","Tera Blast"],"teraTypes":["Ground"]}]},"oranguru":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["Focus Blast","Nasty Plot","Psychic","Psyshock","Thunderbolt"],"teraTypes":["Electric","Fighting","Psychic"]},{"role":"Wallbreaker","movepool":["Focus Blast","Hyper Voice","Nasty Plot","Psyshock","Thunderbolt","Trick"],"teraTypes":["Electric","Fighting","Normal","Psychic"]}]},"passimian":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Gunk Shot","Knock Off","Rock Slide","U-turn"],"teraTypes":["Dark","Fighting","Poison"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Gunk Shot","Knock Off"],"teraTypes":["Dark","Poison","Steel"]}]},"palossand":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Shadow Ball","Shore Up","Sludge Bomb","Stealth Rock"],"teraTypes":["Poison","Water"]}]},"minior":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Acrobatics","Earthquake","Power Gem","Shell Smash"],"teraTypes":["Flying","Ground","Steel","Water"]}]},"komala":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["Double-Edge","Earthquake","Knock Off","Sucker Punch","Superpower","U-turn","Wood Hammer"],"teraTypes":["Dark","Fighting","Grass","Ground"]},{"role":"Bulky Support","movepool":["Body Slam","Earthquake","Knock Off","Rapid Spin","Sucker Punch","U-turn"],"teraTypes":["Dark","Ghost"]}]},"mimikyu":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Drain Punch","Play Rough","Shadow Claw","Shadow Sneak","Swords Dance","Wood Hammer"],"teraTypes":["Fairy","Fighting","Ghost","Grass"]}]},"bruxish":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Crunch","Flip Turn","Ice Fang","Psychic Fangs","Swords Dance","Wave Crash"],"teraTypes":["Dark","Psychic"]}]},"kommoo":{"level":78,"sets":[{"role":"Fast Bulky Setup","movepool":["Boomburst","Clanging Scales","Clangorous Soul","Close Combat","Iron Head"],"teraTypes":["Normal","Steel"]},{"role":"Setup Sweeper","movepool":["Close Combat","Iron Head","Scale Shot","Swords Dance"],"teraTypes":["Steel"]}]},"solgaleo":{"level":74,"sets":[{"role":"Bulky Setup","movepool":["Close Combat","Flame Charge","Knock Off","Psychic","Sunsteel Strike"],"teraTypes":["Dark","Fighting"]},{"role":"Bulky Attacker","movepool":["Close Combat","Flare Blitz","Knock Off","Morning Sun","Psychic Fangs","Sunsteel Strike"],"teraTypes":["Water"]}]},"lunala":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Moongeist Beam","Moonlight"],"teraTypes":["Fairy"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Moongeist Beam","Moonlight","Psyshock"],"teraTypes":["Dark","Fairy"]}]},"necrozma":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Knock Off","Photon Geyser","Swords Dance"],"teraTypes":["Dark","Ground","Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Heat Wave","Moonlight","Photon Geyser"],"teraTypes":["Fairy","Ground","Steel"]}]},"necrozmaduskmane":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Morning Sun","Sunsteel Strike"],"teraTypes":["Ground","Steel","Water"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Photon Geyser","Sunsteel Strike"],"teraTypes":["Ground","Steel","Water"]}]},"necrozmadawnwings":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moongeist Beam","Moonlight","Photon Geyser"],"teraTypes":["Dark","Fairy"]},{"role":"Setup Sweeper","movepool":["Brick Break","Dragon Dance","Moongeist Beam","Photon Geyser"],"teraTypes":["Fighting"]}]},"magearna":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["Aura Sphere","Flash Cannon","Fleur Cannon","Pain Split","Spikes","Thunder Wave","Volt Switch"],"teraTypes":["Fairy","Fighting","Water"]},{"role":"Bulky Setup","movepool":["Calm Mind","Flash Cannon","Fleur Cannon","Shift Gear"],"teraTypes":["Fairy","Flying","Steel","Water"]},{"role":"Tera Blast user","movepool":["Fleur Cannon","Iron Head","Shift Gear","Tera Blast"],"teraTypes":["Ground"]}]},"rillaboom":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["Grassy Glide","High Horsepower","Knock Off","Swords Dance","U-turn","Wood Hammer"],"teraTypes":["Grass"]}]},"cinderace":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Court Change","Gunk Shot","High Jump Kick","Pyro Ball","Sucker Punch","U-turn"],"teraTypes":["Fighting","Fire","Poison"]}]},"inteleon":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Hydro Pump","Ice Beam","U-turn"],"teraTypes":["Water"]},{"role":"Wallbreaker","movepool":["Hydro Pump","Ice Beam","Scald","U-turn"],"teraTypes":["Water"]}]},"greedent":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Double-Edge","Earthquake","Knock Off","Swords Dance"],"teraTypes":["Ghost","Ground"]}]},"corviknight":{"level":80,"sets":[{"role":"Bulky Support","movepool":["Body Press","Brave Bird","Defog","Roost","U-turn"],"teraTypes":["Dragon"]}]},"drednaw":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Crunch","Earthquake","Liquidation","Shell Smash","Stone Edge"],"teraTypes":["Dark","Ground","Water"]}]},"coalossal":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Flamethrower","Overheat","Rapid Spin","Spikes","Stealth Rock","Stone Edge","Will-O-Wisp"],"teraTypes":["Ghost","Grass","Water"]}]},"flapple":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Dragon Dance","Grav Apple","Outrage","Sucker Punch","U-turn"],"teraTypes":["Dragon","Grass"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Grav Apple","Outrage","Tera Blast"],"teraTypes":["Fire"]}]},"appletun":{"level":92,"sets":[{"role":"Bulky Support","movepool":["Apple Acid","Draco Meteor","Dragon Pulse","Leech Seed","Recover"],"teraTypes":["Steel"]}]},"sandaconda":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Coil","Earthquake","Glare","Rest","Stone Edge"],"teraTypes":["Dragon","Steel"]},{"role":"Bulky Attacker","movepool":["Earthquake","Glare","Rest","Stealth Rock","Stone Edge"],"teraTypes":["Dragon","Water"]},{"role":"Fast Bulky Setup","movepool":["Coil","Earthquake","Rock Blast","Scale Shot"],"teraTypes":["Dragon"]}]},"cramorant":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Defog","Roost","Surf"],"teraTypes":["Ground"]}]},"barraskewda":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Flip Turn","Poison Jab","Psychic Fangs","Throat Chop","Waterfall"],"teraTypes":["Fighting"]}]},"toxtricity":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Overdrive","Sludge Wave","Volt Switch"],"teraTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["Boomburst","Gunk Shot","Overdrive","Shift Gear"],"teraTypes":["Normal"]}]},"polteageist":{"level":79,"sets":[{"role":"Tera Blast user","movepool":["Giga Drain","Shadow Ball","Shell Smash","Stored Power","Strength Sap","Tera Blast"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Giga Drain","Shadow Ball","Shell Smash","Stored Power","Strength Sap"],"teraTypes":["Psychic"]}]},"hatterene":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Mystical Fire","Psychic","Psyshock"],"teraTypes":["Fairy","Steel"]},{"role":"AV Pivot","movepool":["Draining Kiss","Mystical Fire","Nuzzle","Psychic","Psychic Noise"],"teraTypes":["Fairy","Steel"]}]},"grimmsnarl":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Light Screen","Parting Shot","Reflect","Spirit Break","Thunder Wave"],"teraTypes":["Poison","Steel"]},{"role":"Bulky Attacker","movepool":["Parting Shot","Spirit Break","Sucker Punch","Taunt","Thunder Wave"],"teraTypes":["Poison","Steel"]}]},"perrserker":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Iron Head","Knock Off","Stealth Rock","U-turn"],"teraTypes":["Fighting","Steel"]}]},"alcremie":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["Alluring Voice","Calm Mind","Psychic","Psyshock","Recover"],"teraTypes":["Poison","Steel"]},{"role":"Tera Blast user","movepool":["Alluring Voice","Calm Mind","Recover","Tera Blast"],"teraTypes":["Ground"]}]},"falinks":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Iron Head","Knock Off","No Retreat"],"teraTypes":["Dark","Fighting","Ghost","Steel"]}]},"pincurchin":{"level":99,"sets":[{"role":"Bulky Attacker","movepool":["Discharge","Recover","Scald","Spikes","Toxic Spikes"],"teraTypes":["Water"]},{"role":"Bulky Setup","movepool":["Curse","Liquidation","Recover","Zing Zap"],"teraTypes":["Grass","Water"]}]},"frosmoth":{"level":82,"sets":[{"role":"Tera Blast user","movepool":["Bug Buzz","Giga Drain","Ice Beam","Quiver Dance","Tera Blast"],"teraTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Bug Buzz","Giga Drain","Hurricane","Ice Beam","Quiver Dance"],"teraTypes":["Water"]}]},"stonjourner":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Heat Crash","Rock Polish","Stealth Rock","Stone Edge"],"teraTypes":["Fire","Ground"]}]},"eiscue":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["Belly Drum","Ice Spinner","Iron Head","Liquidation","Substitute","Zen Headbutt"],"teraTypes":["Water"]},{"role":"Tera Blast user","movepool":["Belly Drum","Ice Spinner","Liquidation","Substitute","Tera Blast"],"teraTypes":["Electric","Ground"]}]},"indeedee":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Expanding Force","Healing Wish","Hyper Voice","Shadow Ball"],"teraTypes":["Psychic"]}]},"indeedeef":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Healing Wish","Hyper Voice","Psychic","Psyshock","Shadow Ball"],"teraTypes":["Fairy","Psychic"]}]},"morpeko":{"level":88,"sets":[{"role":"Fast Support","movepool":["Aura Wheel","Parting Shot","Protect","Rapid Spin"],"teraTypes":["Dark","Electric"]},{"role":"Bulky Attacker","movepool":["Aura Wheel","Knock Off","Protect","Rapid Spin"],"teraTypes":["Electric"]}]},"copperajah":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Iron Head","Play Rough","Rock Slide","Stealth Rock","Superpower"],"teraTypes":["Fairy"]},{"role":"Bulky Attacker","movepool":["Earthquake","Heat Crash","Heavy Slam","Knock Off","Stone Edge","Supercell Slam","Superpower"],"teraTypes":["Fire","Steel"]}]},"duraludon":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Draco Meteor","Flash Cannon","Iron Defense","Stealth Rock","Thunder Wave"],"teraTypes":["Fighting"]}]},"dragapult":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Shadow Ball","Thunderbolt","U-turn"],"teraTypes":["Dragon","Fire","Ghost"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Dragon Darts","Fire Blast","Tera Blast"],"teraTypes":["Ghost"]}]},"zacian":{"level":69,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Play Rough","Psychic Fangs","Swords Dance","Wild Charge"],"teraTypes":["Fighting"]}]},"zaciancrowned":{"level":64,"sets":[{"role":"Setup Sweeper","movepool":["Behemoth Blade","Close Combat","Play Rough","Swords Dance"],"teraTypes":["Fighting"]}]},"zamazenta":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Crunch","Iron Head","Psychic Fangs","Stone Edge"],"teraTypes":["Dark","Fighting","Steel"]},{"role":"Bulky Setup","movepool":["Body Press","Crunch","Iron Defense","Iron Head","Rest","Stone Edge"],"teraTypes":["Fighting","Steel"]}]},"zamazentacrowned":{"level":68,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Crunch","Heavy Slam","Iron Defense","Stone Edge"],"teraTypes":["Fighting"]}]},"eternatus":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["Dynamax Cannon","Fire Blast","Recover","Sludge Bomb"],"teraTypes":["Dragon","Fire"]},{"role":"Bulky Support","movepool":["Dynamax Cannon","Flamethrower","Recover","Toxic","Toxic Spikes"],"teraTypes":["Dragon","Water"]}]},"urshifu":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Poison Jab","Sucker Punch","Swords Dance","U-turn","Wicked Blow"],"teraTypes":["Dark","Fighting","Poison"]}]},"urshifurapidstrike":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Ice Spinner","Surging Strikes","Swords Dance","U-turn"],"teraTypes":["Water"]}]},"zarude":{"level":78,"sets":[{"role":"Fast Bulky Setup","movepool":["Close Combat","Knock Off","Power Whip","Swords Dance","Synthesis"],"teraTypes":["Dark","Fighting","Grass"]},{"role":"Fast Attacker","movepool":["Close Combat","Knock Off","Power Whip","U-turn"],"teraTypes":["Dark","Fighting","Grass"]}]},"regieleki":{"level":78,"sets":[{"role":"Fast Support","movepool":["Explosion","Rapid Spin","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]},{"role":"Tera Blast user","movepool":["Rapid Spin","Tera Blast","Thunderbolt","Volt Switch"],"teraTypes":["Ice"]}]},"regidrago":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Draco Meteor","Dragon Dance","Earthquake","Outrage"],"teraTypes":["Dragon"]},{"role":"Tera Blast user","movepool":["Dragon Claw","Dragon Dance","Earthquake","Tera Blast"],"teraTypes":["Steel"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Dragon Energy","Earthquake","Outrage"],"teraTypes":["Dragon"]}]},"glastrier":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Heavy Slam","High Horsepower","Icicle Crash","Swords Dance"],"teraTypes":["Fighting","Ground","Steel"]}]},"spectrier":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Draining Kiss","Nasty Plot","Shadow Ball","Substitute","Will-O-Wisp"],"teraTypes":["Dark","Fairy"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Shadow Ball","Substitute","Tera Blast","Will-O-Wisp"],"teraTypes":["Fighting"]}]},"calyrex":{"level":93,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Encore","Giga Drain","Leech Seed","Psychic","Psyshock"],"teraTypes":["Steel"]}]},"calyrexice":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Agility","Close Combat","Glacial Lance","High Horsepower"],"teraTypes":["Fighting","Ground"]},{"role":"Wallbreaker","movepool":["Close Combat","Glacial Lance","High Horsepower","Trick Room"],"teraTypes":["Fighting","Ground"]}]},"calyrexshadow":{"level":64,"sets":[{"role":"Fast Attacker","movepool":["Astral Barrage","Nasty Plot","Pollen Puff","Psyshock","Trick"],"teraTypes":["Dark","Ghost"]}]},"wyrdeer":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Earthquake","Megahorn","Psychic Noise","Thunder Wave","Thunderbolt"],"teraTypes":["Ground"]}]},"kleavor":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Defog","Stone Axe","Swords Dance","U-turn","X-Scissor"],"teraTypes":["Bug","Fighting","Rock"]}]},"ursaluna":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Crunch","Facade","Headlong Rush","Swords Dance","Throat Chop","Trailblaze"],"teraTypes":["Normal"]}]},"ursalunabloodmoon":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Blood Moon","Calm Mind","Earth Power","Moonlight"],"teraTypes":["Ghost","Normal","Poison"]},{"role":"Bulky Setup","movepool":["Blood Moon","Calm Mind","Moonlight","Vacuum Wave"],"teraTypes":["Fighting","Ghost","Normal","Poison"]}]},"enamorus":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Play Rough","Substitute","Superpower","Taunt","Zen Headbutt"],"teraTypes":["Fighting"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Earth Power","Moonblast","Mystical Fire","Substitute"],"teraTypes":["Ground"]}]},"enamorustherian":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Moonblast","Mystical Fire","Psychic","Superpower"],"teraTypes":["Fairy","Ground"]},{"role":"Bulky Setup","movepool":["Agility","Earth Power","Moonblast","Mystical Fire","Superpower"],"teraTypes":["Ground"]}]},"meowscarada":{"level":78,"sets":[{"role":"Fast Support","movepool":["Flower Trick","Knock Off","Toxic Spikes","Triple Axel","U-turn"],"teraTypes":["Dark","Grass"]}]},"skeledirge":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Flame Charge","Shadow Ball","Slack Off","Torch Song"],"teraTypes":["Fairy","Water"]},{"role":"Bulky Support","movepool":["Hex","Slack Off","Torch Song","Will-O-Wisp"],"teraTypes":["Fairy","Ghost","Water"]}]},"quaquaval":{"level":79,"sets":[{"role":"Fast Support","movepool":["Aqua Step","Close Combat","Knock Off","Rapid Spin","Roost","Triple Axel","U-turn"],"teraTypes":["Fighting","Water"]},{"role":"Setup Sweeper","movepool":["Aqua Step","Close Combat","Knock Off","Roost","Swords Dance","Triple Axel"],"teraTypes":["Fighting","Water"]}]},"oinkologne":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Curse","Double-Edge","High Horsepower","Lash Out"],"teraTypes":["Ground"]}]},"oinkolognef":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Curse","Double-Edge","High Horsepower","Lash Out"],"teraTypes":["Ground"]}]},"spidops":{"level":96,"sets":[{"role":"Bulky Support","movepool":["Circle Throw","Knock Off","Spikes","Sticky Web","Toxic Spikes","U-turn"],"teraTypes":["Ghost"]}]},"lokix":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["First Impression","Knock Off","Leech Life","Sucker Punch"],"teraTypes":["Bug"]},{"role":"Fast Attacker","movepool":["First Impression","Knock Off","Sucker Punch","U-turn"],"teraTypes":["Bug"]},{"role":"Setup Sweeper","movepool":["Knock Off","Leech Life","Sucker Punch","Swords Dance"],"teraTypes":["Dark"]}]},"pawmot":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Double Shock","Ice Punch","Knock Off","Nuzzle","Revival Blessing"],"teraTypes":["Electric"]}]},"maushold":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Bite","Encore","Population Bomb","Tidy Up"],"teraTypes":["Ghost","Normal"]}]},"dachsbun":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Body Press","Play Rough","Protect","Wish"],"teraTypes":["Steel"]}]},"arboliva":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Energy Ball","Hyper Voice","Strength Sap"],"teraTypes":["Grass","Ground","Poison"]},{"role":"Bulky Support","movepool":["Hyper Voice","Leech Seed","Protect","Substitute"],"teraTypes":["Poison","Water"]}]},"squawkabilly":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Facade","Protect","Quick Attack","U-turn"],"teraTypes":["Normal"]}]},"squawkabillywhite":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Double-Edge","Foul Play","Parting Shot","Quick Attack"],"teraTypes":["Dark","Flying","Normal"]}]},"squawkabillyblue":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Facade","Protect","Quick Attack","U-turn"],"teraTypes":["Normal"]}]},"squawkabillyyellow":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Double-Edge","Foul Play","Parting Shot","Quick Attack"],"teraTypes":["Dark","Flying","Normal"]}]},"garganacl":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Protect","Recover","Salt Cure","Stealth Rock"],"teraTypes":["Dragon","Ghost"]},{"role":"Bulky Support","movepool":["Body Press","Protect","Recover","Salt Cure","Stealth Rock"],"teraTypes":["Dragon","Ghost"]},{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Recover","Salt Cure"],"teraTypes":["Dragon","Ghost"]}]},"armarouge":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Armor Cannon","Aura Sphere","Energy Ball","Focus Blast","Psyshock"],"teraTypes":["Fighting","Fire","Grass","Psychic"]},{"role":"Setup Sweeper","movepool":["Armor Cannon","Energy Ball","Meteor Beam","Psyshock"],"teraTypes":["Fire","Grass"]}]},"ceruledge":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["Bitter Blade","Close Combat","Poltergeist","Shadow Sneak","Swords Dance"],"teraTypes":["Fighting","Fire","Ghost"]}]},"bellibolt":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Muddy Water","Slack Off","Thunderbolt","Toxic","Volt Switch"],"teraTypes":["Electric","Water"]}]},"kilowattrel":{"level":83,"sets":[{"role":"Fast Support","movepool":["Hurricane","Roost","Thunder Wave","Thunderbolt","U-turn"],"teraTypes":["Electric","Flying"]}]},"mabosstiff":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Crunch","Play Rough","Psychic Fangs","Retaliate","Wild Charge"],"teraTypes":["Dark","Fairy"]}]},"grafaiai":{"level":86,"sets":[{"role":"AV Pivot","movepool":["Gunk Shot","Knock Off","Super Fang","U-turn"],"teraTypes":["Dark"]},{"role":"Fast Support","movepool":["Encore","Gunk Shot","Knock Off","Parting Shot"],"teraTypes":["Dark"]},{"role":"Setup Sweeper","movepool":["Gunk Shot","Knock Off","Low Kick","Swords Dance"],"teraTypes":["Dark"]}]},"brambleghast":{"level":88,"sets":[{"role":"Fast Support","movepool":["Leech Seed","Poltergeist","Power Whip","Rapid Spin","Spikes","Strength Sap","Substitute"],"teraTypes":["Fairy","Steel","Water"]}]},"toedscruel":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Giga Drain","Knock Off","Leaf Storm","Rapid Spin","Spore","Toxic"],"teraTypes":["Water"]}]},"klawf":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["Crabhammer","High Horsepower","Knock Off","Stealth Rock","Stone Edge"],"teraTypes":["Dark","Ground","Rock","Water"]},{"role":"Setup Sweeper","movepool":["Crabhammer","High Horsepower","Knock Off","Stone Edge","Swords Dance"],"teraTypes":["Dark","Ground","Rock","Water"]}]},"scovillain":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["Flamethrower","Leech Seed","Protect","Substitute"],"teraTypes":["Steel"]},{"role":"Fast Attacker","movepool":["Energy Ball","Flamethrower","Leaf Storm","Overheat"],"teraTypes":["Fire","Grass"]},{"role":"Wallbreaker","movepool":["Energy Ball","Fire Blast","Stomping Tantrum","Sunny Day"],"teraTypes":["Fire","Grass","Ground"]}]},"rabsca":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Bug Buzz","Earth Power","Psychic","Revival Blessing","Trick Room"],"teraTypes":["Steel"]}]},"espathra":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Lumina Crash","Shadow Ball","U-turn"],"teraTypes":["Fairy","Ghost","Psychic"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Protect","Roost","Stored Power","Substitute"],"teraTypes":["Fairy"]}]},"tinkaton":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Gigaton Hammer","Knock Off","Play Rough","Stealth Rock","Thunder Wave"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Gigaton Hammer","Knock Off","Play Rough","Swords Dance"],"teraTypes":["Steel"]}]},"wugtrio":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Liquidation","Stomping Tantrum","Throat Chop"],"teraTypes":["Dark","Ground","Water"]}]},"bombirdier":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Knock Off","Roost","Stone Edge","Sucker Punch","U-turn"],"teraTypes":["Rock"]},{"role":"Bulky Support","movepool":["Brave Bird","Knock Off","Roost","Stealth Rock","Sucker Punch","U-turn"],"teraTypes":["Dark","Steel"]}]},"palafin":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["Bulk Up","Close Combat","Flip Turn","Ice Punch","Jet Punch","Wave Crash"],"teraTypes":["Fighting","Water"]}]},"revavroom":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Gunk Shot","High Horsepower","Iron Head","Shift Gear"],"teraTypes":["Ground"]}]},"cyclizar":{"level":83,"sets":[{"role":"Fast Support","movepool":["Draco Meteor","Knock Off","Rapid Spin","Shed Tail","Taunt"],"teraTypes":["Dragon","Fairy","Ghost","Steel"]}]},"orthworm":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Coil","Iron Tail","Rest"],"teraTypes":["Electric","Fighting"]},{"role":"Bulky Attacker","movepool":["Body Press","Heavy Slam","Rest","Shed Tail","Spikes","Stealth Rock"],"teraTypes":["Electric","Fighting","Ghost","Poison"]}]},"glimmora":{"level":76,"sets":[{"role":"Fast Support","movepool":["Earth Power","Mortal Spin","Power Gem","Sludge Wave","Spikes","Stealth Rock"],"teraTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Earth Power","Energy Ball","Meteor Beam","Sludge Wave"],"teraTypes":["Grass"]}]},"houndstone":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Poltergeist","Roar","Shadow Sneak","Trick","Will-O-Wisp"],"teraTypes":["Fighting"]},{"role":"Bulky Support","movepool":["Body Press","Poltergeist","Rest","Sleep Talk"],"teraTypes":["Fighting"]},{"role":"AV Pivot","movepool":["Body Press","Play Rough","Poltergeist","Shadow Sneak"],"teraTypes":["Fairy","Fighting"]}]},"flamigo":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Close Combat","Throat Chop","U-turn"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Brave Bird","Close Combat","Roost","Swords Dance","Throat Chop"],"teraTypes":["Fighting"]}]},"cetitan":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Ice Shard","Icicle Crash","Liquidation","Play Rough"],"teraTypes":["Fairy","Water"]},{"role":"Bulky Setup","movepool":["Belly Drum","Earthquake","Ice Shard","Ice Spinner"],"teraTypes":["Ice"]}]},"veluza":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Aqua Cutter","Aqua Jet","Flip Turn","Night Slash","Psycho Cut"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Aqua Cutter","Fillet Away","Night Slash","Psycho Cut"],"teraTypes":["Dark","Psychic","Water"]}]},"dondozo":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Curse","Rest","Sleep Talk","Wave Crash"],"teraTypes":["Dragon","Fairy"]}]},"tatsugiri":{"level":86,"sets":[{"role":"Fast Support","movepool":["Draco Meteor","Hydro Pump","Nasty Plot","Rapid Spin","Surf"],"teraTypes":["Water"]}]},"farigiraf":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Body Slam","Protect","Psychic Noise","Wish"],"teraTypes":["Fairy","Ground","Water"]},{"role":"Bulky Attacker","movepool":["Future Sight","Hyper Voice","Protect","Wish"],"teraTypes":["Fairy","Ground","Water"]}]},"dudunsparce":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Glare","Headbutt","Roost"],"teraTypes":["Ghost","Ground"]},{"role":"Bulky Attacker","movepool":["Boomburst","Calm Mind","Earth Power","Roost"],"teraTypes":["Fairy","Ghost"]},{"role":"Bulky Setup","movepool":["Boomburst","Calm Mind","Roost","Shadow Ball"],"teraTypes":["Ghost"]}]},"kingambit":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["Iron Head","Kowtow Cleave","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Flying"]}]},"greattusk":{"level":77,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Earthquake","Rapid Spin","Stone Edge"],"teraTypes":["Ground","Steel"]},{"role":"Bulky Setup","movepool":["Bulk Up","Close Combat","Earthquake","Rapid Spin","Stone Edge"],"teraTypes":["Ground","Steel"]},{"role":"Bulky Support","movepool":["Close Combat","Headlong Rush","Ice Spinner","Knock Off","Rapid Spin","Stealth Rock","Stone Edge"],"teraTypes":["Ground","Steel"]}]},"brutebonnet":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Crunch","Seed Bomb","Spore","Sucker Punch"],"teraTypes":["Dark","Fighting"]}]},"sandyshocks":{"level":80,"sets":[{"role":"Fast Support","movepool":["Earth Power","Spikes","Stealth Rock","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Grass","Ground"]}]},"screamtail":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Encore","Play Rough","Protect","Thunder Wave","Wish"],"teraTypes":["Poison","Steel"]},{"role":"Bulky Attacker","movepool":["Dazzling Gleam","Encore","Protect","Thunder Wave","Wish"],"teraTypes":["Poison","Steel"]}]},"fluttermane":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Moonblast","Mystical Fire","Psyshock","Shadow Ball","Thunderbolt"],"teraTypes":["Electric","Fairy","Fire","Ghost","Psychic"]}]},"slitherwing":{"level":81,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Earthquake","Flame Charge","Leech Life","Wild Charge"],"teraTypes":["Electric","Fighting"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","First Impression","Flare Blitz","U-turn","Wild Charge"],"teraTypes":["Bug","Electric","Fighting","Fire"]}]},"roaringmoon":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Iron Head","Knock Off","Outrage","Roost"],"teraTypes":["Dark","Dragon","Ground","Poison","Steel"]},{"role":"Fast Bulky Setup","movepool":["Acrobatics","Dragon Dance","Iron Head","Knock Off","Outrage"],"teraTypes":["Flying","Steel"]},{"role":"Bulky Attacker","movepool":["Iron Head","Knock Off","Outrage","U-turn"],"teraTypes":["Dark","Dragon","Steel"]}]},"walkingwake":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["Draco Meteor","Flamethrower","Flip Turn","Hydro Pump"],"teraTypes":["Fire","Water"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Flamethrower","Hydro Steam","Sunny Day"],"teraTypes":["Fire"]}]},"irontreads":{"level":77,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Iron Head","Knock Off","Rapid Spin","Stealth Rock","Volt Switch"],"teraTypes":["Ground","Steel"]}]},"ironmoth":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Energy Ball","Fiery Dance","Fire Blast","Sludge Wave","U-turn"],"teraTypes":["Fire","Grass"]},{"role":"Fast Support","movepool":["Energy Ball","Fiery Dance","Morning Sun","Sludge Wave","Toxic Spikes","U-turn"],"teraTypes":["Fire","Grass"]}]},"ironhands":{"level":79,"sets":[{"role":"AV Pivot","movepool":["Close Combat","Drain Punch","Fake Out","Heavy Slam","Ice Punch","Thunder Punch","Volt Switch","Wild Charge"],"teraTypes":["Electric","Fighting"]},{"role":"Bulky Attacker","movepool":["Drain Punch","Ice Punch","Swords Dance","Thunder Punch","Wild Charge"],"teraTypes":["Fighting","Flying","Steel"]}]},"ironjugulis":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Earth Power","Fire Blast","Hurricane","Hydro Pump","U-turn"],"teraTypes":["Dark","Flying","Ground"]}]},"ironthorns":{"level":83,"sets":[{"role":"Fast Support","movepool":["Earthquake","Spikes","Stealth Rock","Stone Edge","Thunder Punch","Volt Switch"],"teraTypes":["Grass","Water"]},{"role":"Fast Bulky Setup","movepool":["Dragon Dance","Earthquake","Ice Punch","Stone Edge","Wild Charge"],"teraTypes":["Grass","Ground","Rock"]}]},"ironbundle":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Encore","Flip Turn","Freeze-Dry","Hydro Pump","Ice Beam","Substitute"],"teraTypes":["Ice","Water"]}]},"ironvaliant":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Spirit Break","Swords Dance"],"teraTypes":["Dark","Fighting"]},{"role":"Fast Attacker","movepool":["Calm Mind","Close Combat","Moonblast","Psychic"],"teraTypes":["Fairy","Fighting","Steel"]}]},"ironleaves":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Leaf Blade","Megahorn","Psyblade","Swords Dance"],"teraTypes":["Fighting"]}]},"baxcalibur":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Glaive Rush","Ice Shard","Icicle Crash"],"teraTypes":["Dragon","Ground"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Glaive Rush","Icicle Crash"],"teraTypes":["Dragon","Ground"]},{"role":"Bulky Setup","movepool":["Earthquake","Icicle Spear","Scale Shot","Swords Dance"],"teraTypes":["Dragon","Ground"]}]},"gholdengo":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["Focus Blast","Make It Rain","Nasty Plot","Shadow Ball","Trick"],"teraTypes":["Fighting","Ghost","Steel"]},{"role":"Bulky Support","movepool":["Make It Rain","Nasty Plot","Recover","Shadow Ball","Thunder Wave"],"teraTypes":["Dark","Steel","Water"]}]},"tinglu":{"level":78,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Spikes","Stealth Rock","Throat Chop","Whirlwind"],"teraTypes":["Ghost","Ground","Poison"]},{"role":"Bulky Attacker","movepool":["Earthquake","Heavy Slam","Ruination","Spikes","Stealth Rock","Throat Chop"],"teraTypes":["Ghost","Poison","Steel"]}]},"chienpao":{"level":72,"sets":[{"role":"Wallbreaker","movepool":["Crunch","Ice Shard","Icicle Crash","Sacred Sword","Throat Chop"],"teraTypes":["Dark","Fighting","Ice"]},{"role":"Setup Sweeper","movepool":["Ice Shard","Icicle Crash","Sacred Sword","Sucker Punch","Swords Dance","Throat Chop"],"teraTypes":["Dark","Fighting","Ice"]}]},"wochien":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Giga Drain","Knock Off","Leech Seed","Protect","Ruination","Stun Spore"],"teraTypes":["Poison"]}]},"chiyu":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Fire Blast","Nasty Plot","Psychic","Will-O-Wisp"],"teraTypes":["Dark","Fire"]},{"role":"Fast Attacker","movepool":["Dark Pulse","Flamethrower","Overheat","Psychic"],"teraTypes":["Dark","Fire"]}]},"koraidon":{"level":64,"sets":[{"role":"Fast Attacker","movepool":["Collision Course","Flare Blitz","Outrage","U-turn"],"teraTypes":["Fire"]},{"role":"Setup Sweeper","movepool":["Collision Course","Flare Blitz","Scale Shot","Swords Dance"],"teraTypes":["Fire"]}]},"miraidon":{"level":65,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Draco Meteor","Electro Drift","Substitute"],"teraTypes":["Electric"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Electro Drift","Overheat","Volt Switch"],"teraTypes":["Electric"]}]},"dipplin":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Dragon Pulse","Dragon Tail","Giga Drain","Recover","Sucker Punch"],"teraTypes":["Steel"]}]},"sinistcha":{"level":83,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Matcha Gotcha","Shadow Ball","Strength Sap"],"teraTypes":["Steel"]}]},"okidogi":{"level":77,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Gunk Shot","Knock Off"],"teraTypes":["Dark"]}]},"munkidori":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Nasty Plot","Psyshock","Sludge Wave","U-turn"],"teraTypes":["Fighting","Poison"]},{"role":"AV Pivot","movepool":["Fake Out","Psychic Noise","Sludge Wave","U-turn"],"teraTypes":["Dark"]}]},"fezandipiti":{"level":82,"sets":[{"role":"AV Pivot","movepool":["Beat Up","Gunk Shot","Heat Wave","Play Rough","U-turn"],"teraTypes":["Dark","Steel","Water"]},{"role":"Bulky Attacker","movepool":["Beat Up","Gunk Shot","Play Rough","Roost","U-turn"],"teraTypes":["Dark","Steel","Water"]},{"role":"Tera Blast user","movepool":["Gunk Shot","Play Rough","Swords Dance","Tera Blast"],"teraTypes":["Ground"]}]},"ogerpon":{"level":80,"sets":[{"role":"Fast Support","movepool":["Ivy Cudgel","Knock Off","Spikes","Superpower","Synthesis","U-turn"],"teraTypes":["Grass"]},{"role":"Setup Sweeper","movepool":["Ivy Cudgel","Knock Off","Superpower","Swords Dance"],"teraTypes":["Grass"]}]},"ogerponwellspring":{"level":76,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Ivy Cudgel","Spikes","Synthesis","U-turn","Wood Hammer"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Knock Off","Play Rough","Power Whip","Swords Dance"],"teraTypes":["Water"]}]},"ogerponhearthflame":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Knock Off","Power Whip","Stomping Tantrum","Swords Dance"],"teraTypes":["Fire"]}]},"ogerponcornerstone":{"level":76,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Ivy Cudgel","Power Whip","Spikes","Superpower","Synthesis"],"teraTypes":["Rock"]},{"role":"Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Power Whip","Superpower","Swords Dance"],"teraTypes":["Rock"]}]},"archaludon":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Earthquake","Iron Head","Outrage","Swords Dance"],"teraTypes":["Ground"]},{"role":"Bulky Attacker","movepool":["Body Press","Draco Meteor","Dragon Tail","Flash Cannon","Stealth Rock","Thunder Wave","Thunderbolt"],"teraTypes":["Fighting"]},{"role":"Fast Attacker","movepool":["Aura Sphere","Draco Meteor","Flash Cannon","Thunderbolt"],"teraTypes":["Dragon","Electric","Fighting"]}]},"hydrapple":{"level":83,"sets":[{"role":"AV Pivot","movepool":["Dragon Tail","Earth Power","Fickle Beam","Leaf Storm"],"teraTypes":["Steel"]},{"role":"Fast Bulky Setup","movepool":["Earth Power","Fickle Beam","Giga Drain","Nasty Plot","Recover"],"teraTypes":["Steel"]},{"role":"Wallbreaker","movepool":["Draco Meteor","Earth Power","Fickle Beam","Leaf Storm"],"teraTypes":["Dragon"]}]},"gougingfire":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Heat Crash","Outrage"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Dragon Dance","Heat Crash","Morning Sun","Outrage"],"teraTypes":["Fairy"]}]},"ragingbolt":{"level":78,"sets":[{"role":"AV Pivot","movepool":["Draco Meteor","Thunderbolt","Thunderclap","Volt Switch"],"teraTypes":["Electric"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dragon Pulse","Thunderbolt","Thunderclap"],"teraTypes":["Electric","Fairy"]}]},"ironboulder":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Mighty Cleave","Swords Dance","Zen Headbutt"],"teraTypes":["Fighting"]},{"role":"Fast Bulky Setup","movepool":["Close Combat","Mighty Cleave","Swords Dance","Zen Headbutt"],"teraTypes":["Fighting"]}]},"ironcrown":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Focus Blast","Psyshock","Tachyon Cutter","Volt Switch"],"teraTypes":["Fighting","Steel"]}]},"terapagos":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Dark Pulse","Rapid Spin","Rest","Tera Starstorm"],"teraTypes":["Stellar"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Earth Power","Rapid Spin","Rest","Tera Starstorm"],"teraTypes":["Stellar"]}]},"pecharunt":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["Malignant Chain","Nasty Plot","Parting Shot","Recover","Shadow Ball"],"teraTypes":["Dark"]}]}} as any;
/* eslint-enable */

/* eslint-disable */
const randomDoublesSetsJSON = {"venusaur":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Earth Power","Giga Drain","Knock Off","Leaf Storm","Protect","Sludge Bomb"],"teraTypes":["Dark","Water"]}]},"charizard":{"level":83,"sets":[{"role":"Offensive Protect","movepool":["Heat Wave","Hurricane","Protect","Scorching Sands","Will-O-Wisp"],"teraTypes":["Dragon","Fire","Ground"]}]},"blastoise":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fake Out","Flip Turn","Icy Wind","Life Dew","Wave Crash","Yawn"],"teraTypes":["Dragon","Grass"]},{"role":"Doubles Setup Sweeper","movepool":["Dragon Pulse","Muddy Water","Protect","Shell Smash"],"teraTypes":["Dragon","Water"]}]},"arbok":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Coil","Gunk Shot","Knock Off","Protect","Stomping Tantrum"],"teraTypes":["Dark","Ground"]},{"role":"Doubles Bulky Attacker","movepool":["Dragon Tail","Glare","Gunk Shot","Knock Off","Toxic Spikes"],"teraTypes":["Dark"]}]},"pikachu":{"level":94,"sets":[{"role":"Doubles Support","movepool":["Encore","Fake Out","Grass Knot","Knock Off","Protect","Volt Tackle"],"teraTypes":["Electric","Grass"]}]},"raichu":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Encore","Fake Out","Grass Knot","Knock Off","Nuzzle","Thunderbolt"],"teraTypes":["Electric","Grass"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Tera Blast","Thunderbolt"],"teraTypes":["Ice"]}]},"raichualola":{"level":88,"sets":[{"role":"Choice Item user","movepool":["Alluring Voice","Focus Blast","Grass Knot","Psychic","Psyshock","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Fairy","Fighting","Grass"]},{"role":"Doubles Setup Sweeper","movepool":["Nasty Plot","Protect","Psychic","Psyshock","Thunderbolt"],"teraTypes":["Dark","Electric","Flying"]}]},"sandslash":{"level":92,"sets":[{"role":"Doubles Setup Sweeper","movepool":["High Horsepower","Knock Off","Leech Life","Protect","Stone Edge","Swords Dance"],"teraTypes":["Bug","Dark","Rock"]},{"role":"Doubles Bulky Attacker","movepool":["High Horsepower","Knock Off","Rapid Spin","Rock Slide","Super Fang"],"teraTypes":["Grass","Water"]}]},"sandslashalola":{"level":90,"sets":[{"role":"Doubles Wallbreaker","movepool":["Drill Run","Ice Shard","Iron Head","Knock Off","Triple Axel"],"teraTypes":["Flying","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Drill Run","Ice Shard","Iron Head","Triple Axel"],"teraTypes":["Flying","Water"]}]},"clefairy":{"level":96,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Heal Pulse","Helping Hand","Life Dew","Moonblast"],"teraTypes":["Fire","Steel","Water"]}]},"clefable":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Heal Pulse","Icy Wind","Knock Off","Life Dew","Moonblast","Thunder Wave"],"teraTypes":["Fire","Steel","Water"]},{"role":"Doubles Support","movepool":["Encore","Fire Blast","Follow Me","Heal Pulse","Helping Hand","Life Dew","Moonblast"],"teraTypes":["Fire","Steel","Water"]}]},"ninetales":{"level":81,"sets":[{"role":"Doubles Wallbreaker","movepool":["Flamethrower","Heat Wave","Overheat","Protect","Scorching Sands","Solar Beam"],"teraTypes":["Fire","Grass"]}]},"ninetalesalola":{"level":75,"sets":[{"role":"Doubles Support","movepool":["Aurora Veil","Blizzard","Moonblast","Protect"],"teraTypes":["Ice","Steel","Water"]}]},"wigglytuff":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Dazzling Gleam","Disable","Encore","Fire Blast","Heal Pulse","Helping Hand","Icy Wind","Thunder Wave"],"teraTypes":["Fire","Steel"]}]},"vileplume":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Pollen Puff","Sludge Bomb","Strength Sap","Stun Spore"],"teraTypes":["Steel","Water"]}]},"venomoth":{"level":89,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bug Buzz","Protect","Quiver Dance","Sleep Powder","Sludge Bomb"],"teraTypes":["Bug","Steel","Water"]}]},"dugtrio":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Helping Hand","Protect","Rock Slide","Stomping Tantrum","Sucker Punch"],"teraTypes":["Fire","Ghost","Ground"]}]},"dugtrioalola":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Iron Head","Protect","Rock Slide","Stomping Tantrum","Sucker Punch"],"teraTypes":["Fire","Steel","Water"]}]},"persian":{"level":93,"sets":[{"role":"Doubles Support","movepool":["Double-Edge","Fake Out","Helping Hand","Icy Wind","Knock Off","Taunt","U-turn"],"teraTypes":["Ghost","Normal"]}]},"persianalola":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Fake Out","Foul Play","Helping Hand","Icy Wind","Knock Off","Parting Shot","Snarl","Taunt","Thunder Wave"],"teraTypes":["Poison"]}]},"golduck":{"level":91,"sets":[{"role":"Doubles Fast Attacker","movepool":["Encore","Grass Knot","Hydro Pump","Ice Beam","Icy Wind","Protect","Psyshock"],"teraTypes":["Grass","Water"]},{"role":"Offensive Protect","movepool":["Grass Knot","Hydro Pump","Ice Beam","Protect","Psyshock"],"teraTypes":["Grass","Water"]}]},"annihilape":{"level":77,"sets":[{"role":"Bulky Protect","movepool":["Bulk Up","Drain Punch","Protect","Rage Fist"],"teraTypes":["Fire","Steel","Water"]},{"role":"Choice Item user","movepool":["Close Combat","Final Gambit","Rage Fist","U-turn"],"teraTypes":["Fighting"]}]},"arcanine":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Howl","Morning Sun","Snarl","Will-O-Wisp"],"teraTypes":["Fighting","Normal","Steel","Water"]}]},"arcaninehisui":{"level":79,"sets":[{"role":"Choice Item user","movepool":["Extreme Speed","Flare Blitz","Rock Slide","Stone Edge"],"teraTypes":["Normal","Rock"]},{"role":"Bulky Protect","movepool":["Flare Blitz","Morning Sun","Protect","Rock Slide","Will-O-Wisp"],"teraTypes":["Fairy","Grass"]}]},"poliwrath":{"level":90,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Circle Throw","Close Combat","Coaching","Icy Wind","Knock Off","Liquidation"],"teraTypes":["Dragon","Fire","Ground","Steel"]}]},"victreebel":{"level":90,"sets":[{"role":"Offensive Protect","movepool":["Knock Off","Power Whip","Protect","Sludge Bomb","Sucker Punch"],"teraTypes":["Dark","Grass"]}]},"tentacruel":{"level":85,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Acid Spray","Hydro Pump","Icy Wind","Knock Off","Muddy Water","Sludge Bomb","Toxic Spikes"],"teraTypes":["Grass"]}]},"golem":{"level":87,"sets":[{"role":"Doubles Wallbreaker","movepool":["Fire Punch","High Horsepower","Rock Slide","Stone Edge"],"teraTypes":["Grass"]}]},"golemalola":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Double-Edge","High Horsepower","Protect","Rock Slide","Thunder Wave"],"teraTypes":["Grass","Ground"]},{"role":"Doubles Wallbreaker","movepool":["Double-Edge","Explosion","High Horsepower","Rock Slide"],"teraTypes":["Grass","Ground"]}]},"slowbro":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Fire Blast","Heal Pulse","Helping Hand","Psyshock","Scald","Trick Room"],"teraTypes":["Dark","Grass"]},{"role":"Doubles Wallbreaker","movepool":["Fire Blast","Hydro Pump","Ice Beam","Psyshock","Scald","Trick Room"],"teraTypes":["Dark","Fire","Water"]}]},"slowbrogalar":{"level":86,"sets":[{"role":"Doubles Wallbreaker","movepool":["Fire Blast","Psychic","Shell Side Arm","Trick Room"],"teraTypes":["Dark","Fire","Poison"]}]},"dodrio":{"level":85,"sets":[{"role":"Doubles Wallbreaker","movepool":["Brave Bird","Double-Edge","Drill Run","Knock Off","Quick Attack"],"teraTypes":["Ground","Normal"]},{"role":"Offensive Protect","movepool":["Brave Bird","Drill Run","Protect","Quick Attack","Swords Dance"],"teraTypes":["Ground"]}]},"dewgong":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Encore","Fake Out","Hydro Pump","Icy Wind"],"teraTypes":["Grass"]}]},"muk":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Drain Punch","Gunk Shot","Haze","Helping Hand","Ice Punch","Knock Off","Poison Gas","Poison Jab","Shadow Sneak"],"teraTypes":["Dark"]}]},"mukalola":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Drain Punch","Gunk Shot","Helping Hand","Ice Punch","Knock Off","Poison Jab","Protect","Snarl"],"teraTypes":["Flying"]}]},"cloyster":{"level":87,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Hydro Pump","Icicle Spear","Protect","Rock Blast","Shell Smash"],"teraTypes":["Fire","Ice","Rock","Water"]}]},"gengar":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["Encore","Protect","Shadow Ball","Sludge Bomb"],"teraTypes":["Ghost"]},{"role":"Doubles Fast Attacker","movepool":["Focus Blast","Protect","Shadow Ball","Sludge Bomb","Trick"],"teraTypes":["Fighting","Ghost"]}]},"hypno":{"level":95,"sets":[{"role":"Doubles Support","movepool":["Encore","Helping Hand","Knock Off","Low Sweep","Poison Gas","Psychic"],"teraTypes":["Dark"]}]},"electrode":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Electroweb","Foul Play","Helping Hand","Taunt","Thunderbolt","Volt Switch"],"teraTypes":["Flying"]},{"role":"Tera Blast user","movepool":["Protect","Tera Blast","Thunderbolt","Volt Switch"],"teraTypes":["Ice"]}]},"electrodehisui":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Electroweb","Energy Ball","Leaf Storm","Taunt","Thunderbolt","Volt Switch"],"teraTypes":["Steel"]},{"role":"Offensive Protect","movepool":["Foul Play","Leaf Storm","Protect","Thunderbolt","Volt Switch"],"teraTypes":["Dark","Electric","Grass","Steel"]}]},"exeggutor":{"level":88,"sets":[{"role":"Doubles Wallbreaker","movepool":["Energy Ball","Leaf Storm","Protect","Psychic","Trick Room"],"teraTypes":["Fire","Poison","Steel"]}]},"exeggutoralola":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Flamethrower","Protect","Trick Room","Wood Hammer"],"teraTypes":["Fire"]}]},"hitmonlee":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Fake Out","Knock Off","Poison Jab","Protect"],"teraTypes":["Dark","Poison"]}]},"hitmonchan":{"level":89,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Coaching","Fake Out","Knock Off","Poison Jab"],"teraTypes":["Dark","Poison"]}]},"weezing":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Clear Smog","Fire Blast","Gunk Shot","Poison Gas","Protect","Taunt","Will-O-Wisp"],"teraTypes":["Dark"]}]},"weezinggalar":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fire Blast","Gunk Shot","Haze","Poison Gas","Protect","Strange Steam","Taunt","Will-O-Wisp"],"teraTypes":["Dark","Steel"]}]},"rhydon":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Helping Hand","High Horsepower","Protect","Rock Slide","Stealth Rock","Stone Edge"],"teraTypes":["Flying","Grass","Water"]}]},"scyther":{"level":81,"sets":[{"role":"Bulky Protect","movepool":["Bug Bite","Dual Wingbeat","Protect","Tailwind"],"teraTypes":["Flying","Steel"]}]},"electabuzz":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Electroweb","Follow Me","Knock Off","Protect","Thunderbolt"],"teraTypes":["Flying","Grass"]}]},"magmar":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Heat Wave","Knock Off","Protect","Will-O-Wisp"],"teraTypes":["Grass"]}]},"tauros":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Double-Edge","High Horsepower","Lash Out","Stone Edge","Throat Chop"],"teraTypes":["Fighting","Normal"]}]},"taurospaldeacombat":{"level":83,"sets":[{"role":"Bulky Protect","movepool":["Bulk Up","Protect","Raging Bull","Stone Edge"],"teraTypes":["Steel"]},{"role":"Doubles Wallbreaker","movepool":["Close Combat","High Horsepower","Iron Head","Rock Slide","Stone Edge","Throat Chop"],"teraTypes":["Dark","Fighting","Steel"]}]},"taurospaldeablaze":{"level":79,"sets":[{"role":"Bulky Protect","movepool":["Bulk Up","Close Combat","Protect","Raging Bull","Will-O-Wisp"],"teraTypes":["Fighting","Fire","Water"]},{"role":"Doubles Wallbreaker","movepool":["Close Combat","Flare Blitz","Rock Slide","Stone Edge","Wild Charge"],"teraTypes":["Fighting","Fire","Water"]}]},"taurospaldeaaqua":{"level":81,"sets":[{"role":"Bulky Protect","movepool":["Aqua Jet","Bulk Up","Close Combat","Liquidation","Protect"],"teraTypes":["Fire","Steel","Water"]},{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Close Combat","Wave Crash","Wild Charge","Zen Headbutt"],"teraTypes":["Fire","Steel","Water"]}]},"gyarados":{"level":81,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dragon Dance","Earthquake","Protect","Temper Flare","Waterfall"],"teraTypes":["Ground"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Protect","Tera Blast","Waterfall"],"teraTypes":["Flying"]},{"role":"Doubles Support","movepool":["Helping Hand","Icy Wind","Taunt","Thunder Wave","Waterfall"],"teraTypes":["Ground","Water"]}]},"lapras":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Freeze-Dry","Icy Wind","Life Dew","Muddy Water","Protect"],"teraTypes":["Ground"]}]},"ditto":{"level":96,"sets":[{"role":"Choice Item user","movepool":["Transform"],"teraTypes":["Bug","Dark","Dragon","Electric","Fairy","Fighting","Fire","Flying","Ghost","Grass","Ground","Ice","Normal","Poison","Psychic","Rock","Steel","Water"]}]},"vaporeon":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Icy Wind","Muddy Water","Protect","Scald","Wish","Yawn"],"teraTypes":["Dragon","Fire","Ground"]}]},"jolteon":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["Alluring Voice","Helping Hand","Protect","Thunder Wave","Thunderbolt"],"teraTypes":["Fairy"]},{"role":"Tera Blast user","movepool":["Calm Mind","Protect","Tera Blast","Thunderbolt"],"teraTypes":["Ice"]}]},"flareon":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Facade","Flare Blitz","Protect","Quick Attack"],"teraTypes":["Normal"]}]},"snorlax":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Crunch","Double-Edge","Hammer Arm","Heat Crash","High Horsepower"],"teraTypes":["Fire","Ghost","Ground"]},{"role":"Doubles Bulky Attacker","movepool":["Body Slam","Encore","Helping Hand","High Horsepower","Icy Wind","Recycle","Yawn"],"teraTypes":["Ghost","Ground"]},{"role":"Doubles Bulky Setup","movepool":["Body Slam","Crunch","Curse","High Horsepower","Protect","Recycle"],"teraTypes":["Ground","Poison"]}]},"articuno":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Freeze-Dry","Ice Beam","Icy Wind","Protect","Roost","Tailwind"],"teraTypes":["Ground","Steel"]}]},"articunogalar":{"level":83,"sets":[{"role":"Doubles Fast Attacker","movepool":["Freezing Glare","Hurricane","Protect","Recover","Tailwind"],"teraTypes":["Flying","Ground","Steel"]}]},"zapdos":{"level":77,"sets":[{"role":"Doubles Support","movepool":["Hurricane","Protect","Roost","Tailwind","Thunderbolt"],"teraTypes":["Electric","Steel"]},{"role":"Doubles Fast Attacker","movepool":["Heat Wave","Hurricane","Protect","Tailwind","Thunderbolt"],"teraTypes":["Electric","Fire"]}]},"zapdosgalar":{"level":78,"sets":[{"role":"Doubles Fast Attacker","movepool":["Brave Bird","Close Combat","Knock Off","Protect","Tailwind","Thunderous Kick","U-turn"],"teraTypes":["Fighting"]}]},"moltres":{"level":79,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Fire Blast","Heat Wave","Protect","Scorching Sands","Tailwind"],"teraTypes":["Fire","Ground"]}]},"moltresgalar":{"level":75,"sets":[{"role":"Doubles Bulky Setup","movepool":["Fiery Wrath","Hurricane","Nasty Plot","Protect","Tailwind"],"teraTypes":["Dark"]}]},"dragonite":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Dragon Claw","Extreme Speed","Fire Punch","Iron Head","Low Kick","Stomping Tantrum"],"teraTypes":["Normal"]},{"role":"Tera Blast user","movepool":["Draco Meteor","Fire Punch","Low Kick","Tailwind","Tera Blast"],"teraTypes":["Flying"]}]},"mewtwo":{"level":73,"sets":[{"role":"Doubles Fast Attacker","movepool":["Aura Sphere","Dark Pulse","Fire Blast","Protect","Psystrike"],"teraTypes":["Dark","Fighting","Fire","Psychic"]},{"role":"Doubles Bulky Setup","movepool":["Aura Sphere","Nasty Plot","Psystrike","Recover"],"teraTypes":["Fighting"]}]},"mew":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Coaching","Encore","Pollen Puff","Tailwind","Thunder Wave","Will-O-Wisp"],"teraTypes":["Fairy","Steel"]},{"role":"Doubles Setup Sweeper","movepool":["Baton Pass","Fire Blast","Nasty Plot","Pollen Puff","Psychic"],"teraTypes":["Fairy","Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Coaching","Imprison","Pollen Puff","Transform"],"teraTypes":["Fairy","Steel"]}]},"meganium":{"level":91,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Encore","Energy Ball","Heal Pulse","Knock Off","Leech Seed"],"teraTypes":["Poison","Steel","Water"]}]},"typhlosion":{"level":79,"sets":[{"role":"Choice Item user","movepool":["Eruption","Fire Blast","Heat Wave","Scorching Sands"],"teraTypes":["Fire"]}]},"typhlosionhisui":{"level":78,"sets":[{"role":"Choice Item user","movepool":["Eruption","Focus Blast","Heat Wave","Shadow Ball"],"teraTypes":["Fire"]}]},"feraligatr":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Dragon Dance","Ice Punch","Liquidation","Protect"],"teraTypes":["Fire","Water"]},{"role":"Doubles Setup Sweeper","movepool":["Aqua Jet","Ice Punch","Liquidation","Swords Dance"],"teraTypes":["Dragon","Water"]}]},"furret":{"level":98,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Double-Edge","Knock Off","Protect","Tidy Up"],"teraTypes":["Normal"]},{"role":"Doubles Support","movepool":["Body Slam","Follow Me","Helping Hand","Knock Off","Protect","U-turn"],"teraTypes":["Ghost"]}]},"noctowl":{"level":91,"sets":[{"role":"Offensive Protect","movepool":["Hurricane","Hyper Voice","Protect","Tailwind"],"teraTypes":["Flying"]}]},"ariados":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Megahorn","Protect","Rage Powder","Sticky Web"],"teraTypes":["Dark","Steel","Water"]}]},"lanturn":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Electroweb","Protect","Scald","Thunderbolt"],"teraTypes":["Flying"]},{"role":"Doubles Bulky Attacker","movepool":["Electroweb","Ice Beam","Scald","Volt Switch"],"teraTypes":["Flying"]}]},"ampharos":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Dragon Tail","Electroweb","Focus Blast","Helping Hand","Thunder Wave","Thunderbolt"],"teraTypes":["Flying"]}]},"bellossom":{"level":86,"sets":[{"role":"Doubles Bulky Setup","movepool":["Baton Pass","Giga Drain","Protect","Quiver Dance","Strength Sap"],"teraTypes":["Poison","Water"]}]},"azumarill":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Ice Spinner","Knock Off","Liquidation","Play Rough","Superpower"],"teraTypes":["Water"]}]},"sudowoodo":{"level":94,"sets":[{"role":"Doubles Wallbreaker","movepool":["Head Smash","High Horsepower","Protect","Sucker Punch","Wood Hammer"],"teraTypes":["Grass"]}]},"politoed":{"level":83,"sets":[{"role":"Choice Item user","movepool":["Hydro Pump","Ice Beam","Muddy Water","Weather Ball"],"teraTypes":["Water"]},{"role":"Doubles Support","movepool":["Encore","Helping Hand","Hypnosis","Icy Wind","Muddy Water"],"teraTypes":["Grass","Steel"]}]},"jumpluff":{"level":92,"sets":[{"role":"Doubles Support","movepool":["Acrobatics","Encore","Helping Hand","Pollen Puff","Rage Powder","Sleep Powder","Strength Sap","Tailwind"],"teraTypes":["Steel"]}]},"sunflora":{"level":100,"sets":[{"role":"Offensive Protect","movepool":["Dazzling Gleam","Earth Power","Leaf Storm","Protect","Sludge Bomb"],"teraTypes":["Fairy","Ground","Poison"]}]},"quagsire":{"level":90,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Helping Hand","High Horsepower","Icy Wind","Liquidation","Recover","Yawn"],"teraTypes":["Fire","Poison","Steel"]}]},"clodsire":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Gunk Shot","Helping Hand","High Horsepower","Recover","Toxic Spikes"],"teraTypes":["Flying","Ground","Steel"]}]},"espeon":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["Alluring Voice","Dazzling Gleam","Protect","Psychic","Shadow Ball"],"teraTypes":["Fairy"]}]},"umbreon":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Foul Play","Helping Hand","Moonlight","Snarl","Thunder Wave"],"teraTypes":["Poison"]}]},"murkrow":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Haze","Protect","Tailwind","Taunt"],"teraTypes":["Ghost","Steel"]}]},"slowking":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Fire Blast","Heal Pulse","Helping Hand","Psyshock","Scald","Trick Room"],"teraTypes":["Dark","Grass","Steel"]},{"role":"Doubles Wallbreaker","movepool":["Fire Blast","Hydro Pump","Ice Beam","Psyshock","Scald","Trick Room"],"teraTypes":["Fire","Water"]}]},"slowkinggalar":{"level":85,"sets":[{"role":"Doubles Wallbreaker","movepool":["Fire Blast","Protect","Psyshock","Sludge Bomb","Trick Room"],"teraTypes":["Dark","Poison"]}]},"forretress":{"level":90,"sets":[{"role":"Choice Item user","movepool":["Body Press","Explosion","Iron Head","Lunge"],"teraTypes":["Fighting","Fire"]}]},"granbull":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Play Rough","Stomping Tantrum","Super Fang"],"teraTypes":["Steel"]}]},"qwilfish":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Flip Turn","Gunk Shot","Icy Wind","Taunt","Thunder Wave","Toxic Spikes"],"teraTypes":["Grass"]}]},"qwilfishhisui":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Crunch","Gunk Shot","Icy Wind","Throat Chop","Toxic Spikes"],"teraTypes":["Flying"]}]},"overqwil":{"level":82,"sets":[{"role":"Doubles Fast Attacker","movepool":["Crunch","Gunk Shot","Liquidation","Protect","Swords Dance","Throat Chop"],"teraTypes":["Dark","Flying","Poison","Water"]}]},"scizor":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Bullet Punch","Close Combat","Tailwind","U-turn"],"teraTypes":["Fire","Water"]},{"role":"Doubles Bulky Setup","movepool":["Bug Bite","Bullet Punch","Close Combat","Protect","Swords Dance"],"teraTypes":["Steel"]},{"role":"Choice Item user","movepool":["Bug Bite","Bullet Punch","Close Combat","Knock Off"],"teraTypes":["Fighting","Steel","Water"]}]},"heracross":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Facade","Knock Off","Protect"],"teraTypes":["Normal"]},{"role":"Choice Item user","movepool":["Close Combat","Knock Off","Megahorn","Rock Slide"],"teraTypes":["Bug","Fighting","Rock"]}]},"magcargo":{"level":92,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Heat Wave","Power Gem","Protect","Shell Smash"],"teraTypes":["Fairy","Fire","Grass"]}]},"delibird":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Fake Out","Helping Hand","Icy Wind","Tailwind"],"teraTypes":["Ground","Steel"]},{"role":"Doubles Wallbreaker","movepool":["Brave Bird","Drill Run","Foul Play","Ice Shard","Ice Spinner"],"teraTypes":["Dark","Flying","Ground","Ice"]}]},"skarmory":{"level":85,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Brave Bird","Iron Defense","Protect","Roost","Tailwind"],"teraTypes":["Fighting"]}]},"houndoom":{"level":87,"sets":[{"role":"Doubles Fast Attacker","movepool":["Dark Pulse","Heat Wave","Nasty Plot","Protect","Sucker Punch"],"teraTypes":["Dark","Fire","Ghost","Grass"]}]},"kingdra":{"level":85,"sets":[{"role":"Offensive Protect","movepool":["Draco Meteor","Muddy Water","Protect","Rain Dance"],"teraTypes":["Water"]},{"role":"Doubles Setup Sweeper","movepool":["Draco Meteor","Protect","Rain Dance","Wave Crash"],"teraTypes":["Water"]}]},"donphan":{"level":86,"sets":[{"role":"Doubles Support","movepool":["High Horsepower","Ice Shard","Knock Off","Rapid Spin","Stone Edge"],"teraTypes":["Dragon","Water"]}]},"porygon2":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Ice Beam","Recover","Thunderbolt","Trick Room"],"teraTypes":["Electric","Ghost"]},{"role":"Doubles Bulky Attacker","movepool":["Icy Wind","Recover","Thunderbolt","Tri Attack"],"teraTypes":["Electric","Ghost"]},{"role":"Tera Blast user","movepool":["Recover","Shadow Ball","Tera Blast","Trick Room"],"teraTypes":["Fairy","Fighting"]}]},"smeargle":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Decorate","Fake Out","Follow Me","Pollen Puff","Tailwind"],"teraTypes":["Ghost"]},{"role":"Doubles Bulky Attacker","movepool":["Decorate","Fake Out","Follow Me","Tailwind"],"teraTypes":["Ghost"]}]},"hitmontop":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Close Combat","Coaching","Fake Out","Helping Hand","Sucker Punch","Triple Axel","Wide Guard"],"teraTypes":["Steel"]}]},"blissey":{"level":95,"sets":[{"role":"Doubles Support","movepool":["Heal Pulse","Helping Hand","Seismic Toss","Soft-Boiled","Thunder Wave"],"teraTypes":["Fairy","Ghost","Poison"]}]},"raikou":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Calm Mind","Protect","Scald","Shadow Ball","Thunderbolt","Volt Switch"],"teraTypes":["Water"]},{"role":"Bulky Protect","movepool":["Electroweb","Protect","Scald","Snarl","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Grass"]}]},"entei":{"level":77,"sets":[{"role":"Choice Item user","movepool":["Extreme Speed","Flare Blitz","Sacred Fire","Stomping Tantrum"],"teraTypes":["Normal"]}]},"suicune":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Ice Beam","Protect","Scald","Snarl","Tailwind"],"teraTypes":["Dragon","Grass"]},{"role":"Doubles Support","movepool":["Calm Mind","Ice Beam","Protect","Scald"],"teraTypes":["Dragon","Grass"]}]},"tyranitar":{"level":81,"sets":[{"role":"Doubles Bulky Setup","movepool":["Dragon Dance","High Horsepower","Knock Off","Protect","Rock Slide","Stone Edge"],"teraTypes":["Ghost","Rock","Steel"]},{"role":"Doubles Support","movepool":["Fire Blast","High Horsepower","Icy Wind","Knock Off","Protect","Rock Slide","Stone Edge","Thunder Wave"],"teraTypes":["Flying","Steel"]}]},"lugia":{"level":72,"sets":[{"role":"Bulky Protect","movepool":["Aeroblast","Calm Mind","Earth Power","Recover"],"teraTypes":["Ground"]}]},"hooh":{"level":72,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Earth Power","Protect","Recover","Sacred Fire","Tailwind"],"teraTypes":["Ground"]}]},"sceptile":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Focus Blast","Leaf Storm","Protect","Shed Tail"],"teraTypes":["Steel","Water"]},{"role":"Offensive Protect","movepool":["Breaking Swipe","Focus Blast","Leaf Storm","Protect"],"teraTypes":["Steel","Water"]}]},"blaziken":{"level":79,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Knock Off","Overheat","Protect","Stone Edge"],"teraTypes":["Stellar"]},{"role":"Doubles Wallbreaker","movepool":["Close Combat","Heat Wave","Protect","Vacuum Wave"],"teraTypes":["Fighting"]}]},"swampert":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Flip Turn","High Horsepower","Ice Beam","Icy Wind","Knock Off","Muddy Water"],"teraTypes":["Fire","Steel"]}]},"mightyena":{"level":93,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Crunch","Howl","Play Rough","Sucker Punch","Throat Chop"],"teraTypes":["Dark","Fairy"]}]},"ludicolo":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Energy Ball","Muddy Water","Protect","Rain Dance"],"teraTypes":["Water"]},{"role":"Doubles Support","movepool":["Fake Out","Hydro Pump","Ice Beam","Icy Wind","Leaf Storm"],"teraTypes":["Poison","Steel"]}]},"shiftry":{"level":84,"sets":[{"role":"Doubles Fast Attacker","movepool":["Fake Out","Knock Off","Leaf Blade","Tailwind"],"teraTypes":["Ghost"]},{"role":"Offensive Protect","movepool":["Knock Off","Leaf Blade","Protect","Tailwind"],"teraTypes":["Ghost"]}]},"pelipper":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Hurricane","Hydro Pump","Muddy Water","Tailwind","Wide Guard"],"teraTypes":["Ground","Steel"]}]},"gardevoir":{"level":84,"sets":[{"role":"Choice Item user","movepool":["Dazzling Gleam","Moonblast","Mystical Fire","Psychic","Psyshock","Trick"],"teraTypes":["Fairy","Fire","Steel"]}]},"masquerain":{"level":88,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Baton Pass","Bug Buzz","Hurricane","Hydro Pump","Quiver Dance"],"teraTypes":["Water"]},{"role":"Doubles Support","movepool":["Bug Buzz","Hurricane","Protect","Tailwind"],"teraTypes":["Ground"]}]},"breloom":{"level":84,"sets":[{"role":"Doubles Fast Attacker","movepool":["Bullet Seed","Close Combat","Mach Punch","Protect","Rock Tomb","Spore"],"teraTypes":["Fighting"]}]},"vigoroth":{"level":90,"sets":[{"role":"Doubles Bulky Attacker","movepool":["After You","Double-Edge","Encore","Icy Wind","Knock Off","Slack Off","Thunder Wave"],"teraTypes":["Ghost"]}]},"slaking":{"level":87,"sets":[{"role":"Doubles Wallbreaker","movepool":["Double-Edge","Giga Impact","High Horsepower","Knock Off"],"teraTypes":["Ghost","Normal"]}]},"hariyama":{"level":85,"sets":[{"role":"Doubles Wallbreaker","movepool":["Bullet Punch","Close Combat","Facade","Fake Out","Headlong Rush","Knock Off"],"teraTypes":["Normal"]},{"role":"Doubles Bulky Attacker","movepool":["Bullet Punch","Close Combat","Fake Out","Feint","Heavy Slam","Knock Off"],"teraTypes":["Steel"]}]},"sableye":{"level":93,"sets":[{"role":"Doubles Support","movepool":["Disable","Encore","Fake Out","Foul Play","Knock Off","Quash","Recover","Will-O-Wisp"],"teraTypes":["Steel"]}]},"medicham":{"level":86,"sets":[{"role":"Choice Item user","movepool":["Bullet Punch","Close Combat","Ice Punch","Poison Jab","Zen Headbutt"],"teraTypes":["Fighting","Fire"]},{"role":"Doubles Fast Attacker","movepool":["Bullet Punch","Close Combat","Ice Punch","Protect","Zen Headbutt"],"teraTypes":["Fighting","Fire"]}]},"plusle":{"level":92,"sets":[{"role":"Doubles Fast Attacker","movepool":["Alluring Voice","Nasty Plot","Protect","Thunderbolt"],"teraTypes":["Flying"]},{"role":"Doubles Support","movepool":["Encore","Nuzzle","Super Fang","Thunderbolt"],"teraTypes":["Flying"]}]},"minun":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Encore","Nuzzle","Super Fang","Thunderbolt"],"teraTypes":["Flying"]}]},"volbeat":{"level":85,"sets":[{"role":"Doubles Support","movepool":["Encore","Lunge","Tailwind","Thunder Wave"],"teraTypes":["Steel","Water"]}]},"illumise":{"level":85,"sets":[{"role":"Doubles Support","movepool":["Bug Buzz","Encore","Tailwind","Thunder Wave"],"teraTypes":["Steel","Water"]}]},"swalot":{"level":90,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Encore","Gunk Shot","Helping Hand","Knock Off","Poison Gas","Thunder Wave","Toxic Spikes"],"teraTypes":["Dark"]}]},"camerupt":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Earth Power","Heat Wave","Helping Hand","Protect","Stealth Rock"],"teraTypes":["Water"]}]},"torkoal":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Fire Blast","Heat Wave","Protect","Solar Beam","Will-O-Wisp"],"teraTypes":["Dragon","Grass"]}]},"grumpig":{"level":91,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dazzling Gleam","Earth Power","Nasty Plot","Psychic","Psyshock"],"teraTypes":["Fairy","Ground"]}]},"flygon":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Breaking Swipe","Earth Power","Protect","Tailwind"],"teraTypes":["Steel"]}]},"cacturne":{"level":91,"sets":[{"role":"Offensive Protect","movepool":["Knock Off","Leaf Storm","Spiky Shield","Sucker Punch"],"teraTypes":["Dark","Poison"]}]},"altaria":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Draco Meteor","Fire Blast","Helping Hand","Roost","Tailwind","Will-O-Wisp"],"teraTypes":["Steel"]},{"role":"Bulky Protect","movepool":["Brave Bird","Protect","Roost","Will-O-Wisp"],"teraTypes":["Steel"]}]},"zangoose":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Facade","Knock Off","Protect","Quick Attack"],"teraTypes":["Normal"]}]},"seviper":{"level":95,"sets":[{"role":"Offensive Protect","movepool":["Flamethrower","Glare","Gunk Shot","Knock Off","Protect"],"teraTypes":["Dark","Fire","Poison"]}]},"whiscash":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Helping Hand","High Horsepower","Icy Wind","Muddy Water","Protect"],"teraTypes":["Fire","Steel"]}]},"crawdaunt":{"level":85,"sets":[{"role":"Choice Item user","movepool":["Aqua Jet","Close Combat","Crabhammer","Knock Off"],"teraTypes":["Fighting"]},{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Crabhammer","Knock Off","Protect"],"teraTypes":["Water"]}]},"milotic":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Dragon Tail","Icy Wind","Protect","Recover","Scald"],"teraTypes":["Dragon","Grass","Steel"]}]},"banette":{"level":93,"sets":[{"role":"Doubles Wallbreaker","movepool":["Gunk Shot","Poltergeist","Protect","Shadow Sneak"],"teraTypes":["Ghost","Poison"]}]},"tropius":{"level":93,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Hurricane","Leaf Storm","Protect","Tailwind","Wide Guard"],"teraTypes":["Steel"]}]},"chimecho":{"level":95,"sets":[{"role":"Doubles Support","movepool":["Encore","Heal Pulse","Helping Hand","Icy Wind","Protect","Psychic","Snarl","Thunder Wave"],"teraTypes":["Dark","Steel"]}]},"glalie":{"level":94,"sets":[{"role":"Doubles Support","movepool":["Disable","Foul Play","Freeze-Dry","Helping Hand","Icy Wind","Protect"],"teraTypes":["Poison","Steel"]}]},"luvdisc":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Charm","Endeavor","Hydro Pump","Icy Wind"],"teraTypes":["Dragon"]}]},"salamence":{"level":80,"sets":[{"role":"Doubles Fast Attacker","movepool":["Draco Meteor","Dual Wingbeat","Fire Blast","Protect","Tailwind"],"teraTypes":["Dragon","Fire","Flying","Steel"]}]},"metagross":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Bullet Punch","Hammer Arm","Heavy Slam","Knock Off","Psychic Fangs","Stomping Tantrum"],"teraTypes":["Dark","Steel","Water"]},{"role":"Doubles Bulky Setup","movepool":["Agility","Brick Break","Heavy Slam","Knock Off","Protect","Psychic Fangs"],"teraTypes":["Dragon"]}]},"regirock":{"level":84,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Curse","Iron Defense","Rest","Rock Slide","Stone Edge"],"teraTypes":["Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Body Press","Iron Defense","Rock Slide","Stone Edge","Thunder Wave"],"teraTypes":["Fighting"]}]},"regice":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Blizzard","Icy Wind","Protect","Thunderbolt"],"teraTypes":["Electric","Water"]}]},"registeel":{"level":79,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Iron Head","Thunder Wave"],"teraTypes":["Fighting"]}]},"latias":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Mist Ball","Protect","Recover","Tailwind"],"teraTypes":["Steel"]},{"role":"Offensive Protect","movepool":["Aura Sphere","Calm Mind","Dragon Pulse","Mist Ball","Protect"],"teraTypes":["Steel"]}]},"latios":{"level":79,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Luster Purge","Protect","Tailwind"],"teraTypes":["Steel"]},{"role":"Doubles Wallbreaker","movepool":["Aura Sphere","Draco Meteor","Luster Purge","Protect","Trick"],"teraTypes":["Dragon","Steel"]}]},"kyogre":{"level":65,"sets":[{"role":"Choice Item user","movepool":["Ice Beam","Origin Pulse","Thunder","Water Spout"],"teraTypes":["Water"]}]},"groudon":{"level":69,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Heat Crash","Precipice Blades","Protect","Stone Edge","Thunder Wave"],"teraTypes":["Fire"]},{"role":"Doubles Bulky Setup","movepool":["Heat Crash","Precipice Blades","Protect","Stone Edge","Swords Dance"],"teraTypes":["Fire"]}]},"rayquaza":{"level":75,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dragon Ascent","Dragon Dance","Earthquake","Extreme Speed","Swords Dance"],"teraTypes":["Normal"]},{"role":"Offensive Protect","movepool":["Draco Meteor","Dragon Ascent","Earth Power","Fire Blast","Protect"],"teraTypes":["Fire","Flying","Ground"]}]},"jirachi":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Iron Head","Life Dew","Protect","Thunder Wave","U-turn"],"teraTypes":["Dark","Water"]},{"role":"Choice Item user","movepool":["Iron Head","Psychic","Thunderbolt","Trick","U-turn"],"teraTypes":["Steel"]}]},"deoxys":{"level":78,"sets":[{"role":"Offensive Protect","movepool":["Extreme Speed","Knock Off","Protect","Psycho Boost","Superpower"],"teraTypes":["Ghost","Stellar"]}]},"deoxysattack":{"level":77,"sets":[{"role":"Offensive Protect","movepool":["Extreme Speed","Knock Off","Protect","Psycho Boost","Superpower"],"teraTypes":["Ghost","Stellar"]}]},"deoxysdefense":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Knock Off","Night Shade","Spikes","Thunder Wave"],"teraTypes":["Fairy","Steel"]}]},"deoxysspeed":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Psycho Boost","Superpower","Taunt"],"teraTypes":["Fighting","Ghost","Psychic"]},{"role":"Doubles Wallbreaker","movepool":["Psycho Boost","Superpower","Taunt","Thunder Wave"],"teraTypes":["Fighting","Psychic"]}]},"torterra":{"level":81,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Headlong Rush","Protect","Shell Smash","Wood Hammer"],"teraTypes":["Fire","Ground"]}]},"infernape":{"level":83,"sets":[{"role":"Doubles Fast Attacker","movepool":["Close Combat","Fake Out","Knock Off","Overheat","Protect"],"teraTypes":["Dark","Fighting","Fire"]}]},"empoleon":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Flash Cannon","Hydro Pump","Ice Beam","Icy Wind","Protect","Yawn"],"teraTypes":["Flying","Grass"]},{"role":"Doubles Bulky Attacker","movepool":["Flash Cannon","Hydro Pump","Ice Beam","Icy Wind","Knock Off"],"teraTypes":["Flying","Grass"]}]},"staraptor":{"level":80,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Close Combat","Double-Edge","Protect","Quick Attack"],"teraTypes":["Fighting","Flying"]},{"role":"Choice Item user","movepool":["Brave Bird","Close Combat","Double-Edge","Final Gambit"],"teraTypes":["Fighting","Flying","Normal"]}]},"kricketune":{"level":100,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Bug Bite","Helping Hand","Knock Off","Sticky Web","Taunt"],"teraTypes":["Bug","Steel"]}]},"luxray":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Crunch","Play Rough","Snarl","Throat Chop","Volt Switch","Wild Charge"],"teraTypes":["Dark","Fairy","Flying"]}]},"rampardos":{"level":87,"sets":[{"role":"Choice Item user","movepool":["Fire Punch","Head Smash","Rock Slide","Stomping Tantrum"],"teraTypes":["Rock"]}]},"bastiodon":{"level":89,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Foul Play","Iron Defense","Rest","Wide Guard"],"teraTypes":["Fighting","Flying"]}]},"vespiquen":{"level":100,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Helping Hand","Hurricane","Pollen Puff","Roost","Toxic Spikes"],"teraTypes":["Steel"]}]},"pachirisu":{"level":94,"sets":[{"role":"Doubles Support","movepool":["Encore","Follow Me","Helping Hand","Nuzzle","Super Fang","Thunderbolt"],"teraTypes":["Flying","Water"]}]},"floatzel":{"level":86,"sets":[{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Crunch","Ice Spinner","Protect","Wave Crash"],"teraTypes":["Water"]}]},"gastrodon":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Clear Smog","Earth Power","Helping Hand","Icy Wind","Muddy Water","Recover"],"teraTypes":["Fire"]}]},"ambipom":{"level":87,"sets":[{"role":"Doubles Fast Attacker","movepool":["Double-Edge","Fake Out","Knock Off","Protect"],"teraTypes":["Normal"]}]},"drifblim":{"level":85,"sets":[{"role":"Doubles Support","movepool":["Shadow Ball","Strength Sap","Tailwind","Will-O-Wisp"],"teraTypes":["Fairy","Ghost","Ground"]}]},"mismagius":{"level":87,"sets":[{"role":"Doubles Wallbreaker","movepool":["Dazzling Gleam","Mystical Fire","Protect","Shadow Ball","Taunt","Thunderbolt","Trick","Will-O-Wisp"],"teraTypes":["Electric","Fairy"]}]},"honchkrow":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Heat Wave","Protect","Sucker Punch","Tailwind"],"teraTypes":["Dark","Fire","Flying"]}]},"skuntank":{"level":85,"sets":[{"role":"Doubles Fast Attacker","movepool":["Fire Blast","Gunk Shot","Knock Off","Poison Gas","Protect","Sucker Punch","Taunt","Toxic Spikes"],"teraTypes":["Dark","Flying"]}]},"bronzong":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Iron Defense","Iron Head","Trick Room"],"teraTypes":["Fighting"]},{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Psychic Noise","Trick Room"],"teraTypes":["Fighting"]}]},"spiritomb":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Foul Play","Helping Hand","Icy Wind","Shadow Sneak","Will-O-Wisp"],"teraTypes":["Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Foul Play","Snarl","Trick Room","Will-O-Wisp"],"teraTypes":["Steel"]}]},"garchomp":{"level":77,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Earthquake","Protect","Scale Shot","Swords Dance"],"teraTypes":["Dragon","Fire"]}]},"lucario":{"level":87,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Extreme Speed","Meteor Mash","Protect"],"teraTypes":["Normal"]},{"role":"Doubles Setup Sweeper","movepool":["Aura Sphere","Flash Cannon","Nasty Plot","Protect","Vacuum Wave"],"teraTypes":["Fighting","Steel"]}]},"hippowdon":{"level":85,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","High Horsepower","Slack Off","Stealth Rock","Stone Edge","Whirlwind"],"teraTypes":["Dragon","Rock","Steel","Water"]}]},"toxicroak":{"level":85,"sets":[{"role":"Doubles Fast Attacker","movepool":["Close Combat","Fake Out","Gunk Shot","Protect","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fighting","Poison"]}]},"lumineon":{"level":92,"sets":[{"role":"Doubles Support","movepool":["Encore","Helping Hand","Hydro Pump","Icy Wind","Tailwind","Tickle"],"teraTypes":["Fire","Ground"]}]},"abomasnow":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Aurora Veil","Blizzard","Ice Shard","Protect","Wood Hammer"],"teraTypes":["Ice","Water"]}]},"weavile":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Fake Out","Ice Shard","Knock Off","Low Kick","Protect","Triple Axel"],"teraTypes":["Dark","Fighting","Ghost","Ice"]}]},"sneasler":{"level":77,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Dire Claw","Fake Out","Gunk Shot","Switcheroo","U-turn"],"teraTypes":["Dark","Fighting","Poison"]}]},"magnezone":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Electroweb","Flash Cannon","Protect","Thunderbolt","Volt Switch"],"teraTypes":["Flying"]}]},"rhyperior":{"level":82,"sets":[{"role":"Doubles Bulky Setup","movepool":["High Horsepower","Protect","Rock Polish","Rock Slide"],"teraTypes":["Dragon","Flying","Ghost","Ground"]},{"role":"Doubles Bulky Attacker","movepool":["Dragon Tail","Heat Crash","High Horsepower","Ice Punch","Megahorn","Protect","Rock Slide"],"teraTypes":["Dragon","Flying","Water"]}]},"electivire":{"level":85,"sets":[{"role":"Doubles Fast Attacker","movepool":["Cross Chop","Flamethrower","Ice Punch","Protect","Volt Switch","Wild Charge"],"teraTypes":["Flying"]},{"role":"Doubles Bulky Attacker","movepool":["Cross Chop","Flamethrower","Ice Punch","Knock Off","Volt Switch","Wild Charge"],"teraTypes":["Flying"]}]},"magmortar":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fire Blast","Heat Wave","Knock Off","Protect","Thunderbolt"],"teraTypes":["Fire","Grass"]}]},"yanmega":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Air Slash","Bug Buzz","Giga Drain","U-turn"],"teraTypes":["Bug"]},{"role":"Tera Blast user","movepool":["Air Slash","Bug Buzz","Protect","Tera Blast"],"teraTypes":["Ground"]}]},"leafeon":{"level":90,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Double-Edge","Knock Off","Leaf Blade","Protect","Swords Dance","Synthesis"],"teraTypes":["Normal"]}]},"glaceon":{"level":87,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Blizzard","Calm Mind","Freeze-Dry","Shadow Ball"],"teraTypes":["Ghost","Ice"]},{"role":"Tera Blast user","movepool":["Blizzard","Calm Mind","Freeze-Dry","Tera Blast"],"teraTypes":["Fire","Ground"]}]},"gliscor":{"level":81,"sets":[{"role":"Bulky Protect","movepool":["Dual Wingbeat","High Horsepower","Knock Off","Protect","Tailwind","Toxic","Toxic Spikes"],"teraTypes":["Water"]},{"role":"Doubles Bulky Setup","movepool":["Earthquake","Facade","Protect","Swords Dance"],"teraTypes":["Normal"]}]},"mamoswine":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["High Horsepower","Ice Shard","Icicle Crash","Protect"],"teraTypes":["Ground","Ice","Water"]}]},"porygonz":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Shadow Ball","Swift","Tri Attack","Trick"],"teraTypes":["Ghost"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Shadow Ball","Tera Blast"],"teraTypes":["Fighting"]}]},"gallade":{"level":80,"sets":[{"role":"Doubles Wallbreaker","movepool":["Leaf Blade","Night Slash","Protect","Psycho Cut","Sacred Sword","Swords Dance"],"teraTypes":["Dark","Fighting","Grass"]},{"role":"Choice Item user","movepool":["Night Slash","Psycho Cut","Sacred Sword","Trick"],"teraTypes":["Dark","Fighting"]}]},"probopass":{"level":90,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Flash Cannon","Iron Defense","Rest","Thunder Wave"],"teraTypes":["Fighting"]},{"role":"Doubles Setup Sweeper","movepool":["Body Press","Iron Defense","Power Gem","Rest","Thunder Wave"],"teraTypes":["Fighting"]}]},"dusknoir":{"level":88,"sets":[{"role":"Doubles Wallbreaker","movepool":["Leech Life","Poltergeist","Shadow Sneak","Will-O-Wisp"],"teraTypes":["Dark"]},{"role":"Doubles Setup Sweeper","movepool":["Leech Life","Poltergeist","Protect","Trick Room"],"teraTypes":["Dark"]}]},"froslass":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Poltergeist","Protect","Spikes","Taunt","Triple Axel","Will-O-Wisp"],"teraTypes":["Ghost","Water"]}]},"rotom":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Nasty Plot","Protect","Shadow Ball","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric"]}]},"rotomwash":{"level":83,"sets":[{"role":"Bulky Protect","movepool":["Electroweb","Hydro Pump","Protect","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric"]}]},"rotomheat":{"level":83,"sets":[{"role":"Bulky Protect","movepool":["Electroweb","Overheat","Protect","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Steel"]}]},"rotomfrost":{"level":84,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Blizzard","Nasty Plot","Protect","Thunderbolt","Will-O-Wisp"],"teraTypes":["Electric","Ice"]}]},"rotomfan":{"level":84,"sets":[{"role":"Bulky Protect","movepool":["Air Slash","Electroweb","Protect","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Steel"]}]},"rotommow":{"level":85,"sets":[{"role":"Bulky Protect","movepool":["Electroweb","Leaf Storm","Protect","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Poison","Steel"]}]},"uxie":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Encore","Helping Hand","Knock Off","Mystical Power","Stealth Rock","Thunder Wave"],"teraTypes":["Dark","Poison","Steel"]}]},"mesprit":{"level":86,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dazzling Gleam","Nasty Plot","Protect","Psychic","Thunderbolt"],"teraTypes":["Electric","Fairy","Psychic"]},{"role":"Choice Item user","movepool":["Ice Beam","Psychic","Thunderbolt","U-turn"],"teraTypes":["Electric","Psychic"]}]},"azelf":{"level":83,"sets":[{"role":"Doubles Fast Attacker","movepool":["Dazzling Gleam","Energy Ball","Fire Blast","Nasty Plot","Psychic","Psyshock","U-turn"],"teraTypes":["Fairy","Fire"]},{"role":"Offensive Protect","movepool":["Dazzling Gleam","Fire Blast","Nasty Plot","Protect","Psychic","Psyshock","Thunderbolt"],"teraTypes":["Electric","Fairy","Fire"]}]},"dialga":{"level":74,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Heavy Slam","Protect","Thunder Wave"],"teraTypes":["Dragon","Fire","Flying","Steel"]}]},"dialgaorigin":{"level":74,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Flash Cannon","Protect","Thunder Wave"],"teraTypes":["Dragon","Fire","Flying"]}]},"palkia":{"level":74,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend"],"teraTypes":["Dragon","Fire","Steel","Water"]},{"role":"Doubles Fast Attacker","movepool":["Fire Blast","Hydro Pump","Protect","Spacial Rend","Thunder Wave"],"teraTypes":["Dragon","Fire","Steel","Water"]}]},"palkiaorigin":{"level":72,"sets":[{"role":"Doubles Fast Attacker","movepool":["Fire Blast","Hydro Pump","Protect","Spacial Rend","Thunder Wave"],"teraTypes":["Dragon","Fire","Steel","Water"]}]},"heatran":{"level":78,"sets":[{"role":"Bulky Protect","movepool":["Earth Power","Magma Storm","Protect","Will-O-Wisp"],"teraTypes":["Fairy","Grass"]},{"role":"Tera Blast user","movepool":["Earth Power","Flash Cannon","Heat Wave","Protect","Tera Blast"],"teraTypes":["Grass"]},{"role":"Offensive Protect","movepool":["Earth Power","Flash Cannon","Heat Wave","Protect"],"teraTypes":["Fairy","Grass"]}]},"regigigas":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Body Slam","Knock Off","Protect","Substitute"],"teraTypes":["Fairy","Ghost"]},{"role":"Doubles Bulky Attacker","movepool":["Double-Edge","Knock Off","Protect","Thunder Wave"],"teraTypes":["Fairy"]}]},"giratina":{"level":76,"sets":[{"role":"Bulky Protect","movepool":["Aura Sphere","Calm Mind","Protect","Shadow Ball"],"teraTypes":["Fairy","Fighting"]},{"role":"Doubles Support","movepool":["Breaking Swipe","Icy Wind","Rest","Shadow Ball","Thunder Wave","Will-O-Wisp"],"teraTypes":["Fairy"]}]},"giratinaorigin":{"level":76,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Aura Sphere","Draco Meteor","Poltergeist","Shadow Force","Will-O-Wisp"],"teraTypes":["Dragon","Fairy","Ghost","Poison"]}]},"cresselia":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Icy Wind","Lunar Blessing","Psychic","Thunder Wave"],"teraTypes":["Electric","Fire","Poison","Steel"]}]},"phione":{"level":90,"sets":[{"role":"Bulky Protect","movepool":["Ice Beam","Protect","Scald","Take Heart"],"teraTypes":["Dragon","Grass","Steel"]}]},"manaphy":{"level":78,"sets":[{"role":"Bulky Protect","movepool":["Ice Beam","Protect","Scald","Tail Glow"],"teraTypes":["Grass","Steel","Water"]},{"role":"Doubles Bulky Setup","movepool":["Energy Ball","Hydro Pump","Ice Beam","Protect","Scald","Tail Glow"],"teraTypes":["Grass"]}]},"darkrai":{"level":80,"sets":[{"role":"Offensive Protect","movepool":["Dark Pulse","Focus Blast","Protect","Sludge Bomb"],"teraTypes":["Poison"]}]},"shaymin":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Earth Power","Protect","Seed Flare","Synthesis","Tailwind"],"teraTypes":["Grass","Ground","Steel"]}]},"shayminsky":{"level":77,"sets":[{"role":"Offensive Protect","movepool":["Air Slash","Earth Power","Protect","Seed Flare","Tailwind"],"teraTypes":["Flying","Steel","Water"]}]},"arceus":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Phantom Force","Swords Dance"],"teraTypes":["Ghost","Normal"]}]},"arceusbug":{"level":73,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Stomping Tantrum","Swords Dance","X-Scissor"],"teraTypes":["Normal"]}]},"arceusdark":{"level":72,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Gunk Shot","Judgment","Recover","Tailwind"],"teraTypes":["Poison"]}]},"arceusdragon":{"level":73,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Calm Mind","Fire Blast","Judgment","Recover","Sludge Bomb"],"teraTypes":["Fire","Poison"]}]},"arceuselectric":{"level":70,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Ice Beam","Judgment","Recover"],"teraTypes":["Electric","Ice"]}]},"arceusfairy":{"level":72,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Earth Power","Fire Blast","Recover"],"teraTypes":["Fairy","Fire","Ground"]},{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"teraTypes":["Steel"]}]},"arceusfighting":{"level":72,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Recover","Snarl"],"teraTypes":["Steel"]}]},"arceusfire":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Liquidation","Protect","Swords Dance"],"teraTypes":["Fire","Normal","Water"]}]},"arceusflying":{"level":71,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"teraTypes":["Flying","Ground"]}]},"arceusghost":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Brick Break","Extreme Speed","Phantom Force","Swords Dance"],"teraTypes":["Ghost","Normal"]},{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Focus Blast","Judgment","Recover"],"teraTypes":["Fairy","Fighting"]}]},"arceusgrass":{"level":74,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"teraTypes":["Fire","Steel"]}]},"arceusground":{"level":72,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Fire Blast","Ice Beam","Judgment","Recover"],"teraTypes":["Ground","Ice"]},{"role":"Doubles Setup Sweeper","movepool":["Earthquake","Extreme Speed","Stone Edge","Swords Dance"],"teraTypes":["Normal"]}]},"arceusice":{"level":72,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover","Thunderbolt"],"teraTypes":["Electric","Ground"]}]},"arceuspoison":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Gunk Shot","Liquidation","Swords Dance"],"teraTypes":["Fire","Normal","Poison"]}]},"arceuspsychic":{"level":73,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"teraTypes":["Steel"]}]},"arceusrock":{"level":73,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"teraTypes":["Ground"]}]},"arceussteel":{"level":72,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"arceuswater":{"level":72,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"teraTypes":["Steel"]},{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Liquidation","Swords Dance"],"teraTypes":["Fire","Normal"]}]},"serperior":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Dragon Pulse","Glare","Knock Off","Leaf Storm","Protect"],"teraTypes":["Dragon","Grass"]},{"role":"Tera Blast user","movepool":["Glare","Leaf Storm","Protect","Tera Blast"],"teraTypes":["Fire","Rock"]}]},"emboar":{"level":86,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Flare Blitz","Head Smash","Knock Off","Wild Charge"],"teraTypes":["Dark","Electric","Rock"]}]},"samurott":{"level":89,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Aqua Jet","Flip Turn","Hydro Pump","Ice Beam","Knock Off","Megahorn","Sacred Sword"],"teraTypes":["Dark","Fire","Water"]},{"role":"Doubles Setup Sweeper","movepool":["Aqua Jet","Knock Off","Liquidation","Protect","Sacred Sword","Swords Dance"],"teraTypes":["Dark","Fire","Water"]}]},"samurotthisui":{"level":83,"sets":[{"role":"Offensive Protect","movepool":["Aqua Jet","Ceaseless Edge","Protect","Razor Shell","Sacred Sword","Sucker Punch"],"teraTypes":["Dark","Fire","Water"]},{"role":"Choice Item user","movepool":["Ceaseless Edge","Flip Turn","Razor Shell","Sacred Sword","Sucker Punch"],"teraTypes":["Dark","Fire","Water"]}]},"zebstrika":{"level":87,"sets":[{"role":"Offensive Protect","movepool":["High Horsepower","Overheat","Protect","Wild Charge"],"teraTypes":["Ground"]},{"role":"Doubles Fast Attacker","movepool":["High Horsepower","Overheat","Protect","Thunderbolt"],"teraTypes":["Flying","Water"]}]},"excadrill":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["High Horsepower","Iron Head","Rapid Spin","Rock Slide"],"teraTypes":["Flying","Water"]},{"role":"Doubles Setup Sweeper","movepool":["High Horsepower","Iron Head","Protect","Swords Dance"],"teraTypes":["Flying","Ground","Water"]}]},"conkeldurr":{"level":81,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Knock Off","Mach Punch","Protect"],"teraTypes":["Dark","Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Drain Punch","Ice Punch","Knock Off","Mach Punch"],"teraTypes":["Dark","Fighting","Steel"]}]},"leavanny":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Knock Off","Leaf Blade","Pollen Puff","Sticky Web"],"teraTypes":["Rock","Water"]},{"role":"Offensive Protect","movepool":["Leaf Blade","Lunge","Protect","Sticky Web"],"teraTypes":["Rock","Water"]}]},"whimsicott":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Encore","Moonblast","Stun Spore","Tailwind"],"teraTypes":["Fire","Ghost","Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Encore","Moonblast","Tailwind","Taunt"],"teraTypes":["Fire","Ghost","Steel"]},{"role":"Doubles Bulky Setup","movepool":["Encore","Helping Hand","Moonblast","Tailwind"],"teraTypes":["Fire","Ghost","Steel"]}]},"lilligant":{"level":87,"sets":[{"role":"Tera Blast user","movepool":["Giga Drain","Protect","Quiver Dance","Tera Blast"],"teraTypes":["Fire","Rock"]},{"role":"Doubles Setup Sweeper","movepool":["Alluring Voice","Energy Ball","Pollen Puff","Quiver Dance","Sleep Powder"],"teraTypes":["Steel"]}]},"lilliganthisui":{"level":84,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Leaf Blade","Protect","Sleep Powder","Victory Dance"],"teraTypes":["Fighting","Steel"]}]},"basculin":{"level":87,"sets":[{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Flip Turn","Psychic Fangs","Wave Crash"],"teraTypes":["Water"]},{"role":"Offensive Protect","movepool":["Aqua Jet","Flip Turn","Protect","Wave Crash"],"teraTypes":["Water"]}]},"basculegion":{"level":70,"sets":[{"role":"Choice Item user","movepool":["Aqua Jet","Flip Turn","Last Respects","Wave Crash"],"teraTypes":["Ghost"]}]},"basculegionf":{"level":72,"sets":[{"role":"Choice Item user","movepool":["Flip Turn","Last Respects","Muddy Water","Wave Crash"],"teraTypes":["Ghost"]}]},"krookodile":{"level":80,"sets":[{"role":"Offensive Protect","movepool":["Gunk Shot","High Horsepower","Knock Off","Protect","Stone Edge","Taunt"],"teraTypes":["Dark","Ground","Poison"]},{"role":"Choice Item user","movepool":["Gunk Shot","High Horsepower","Knock Off","Rock Slide"],"teraTypes":["Dark","Ground","Poison"]}]},"scrafty":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Close Combat","Coaching","Fake Out","Knock Off","Poison Jab","Snarl"],"teraTypes":["Poison"]}]},"zoroark":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Dark Pulse","Flamethrower","Focus Blast","Protect","Sludge Bomb"],"teraTypes":["Poison"]},{"role":"Offensive Protect","movepool":["Flamethrower","Focus Blast","Knock Off","Protect","Sludge Bomb"],"teraTypes":["Poison"]}]},"zoroarkhisui":{"level":80,"sets":[{"role":"Doubles Wallbreaker","movepool":["Bitter Malice","Flamethrower","Focus Blast","Hyper Voice","Nasty Plot","Protect"],"teraTypes":["Normal"]},{"role":"Tera Blast user","movepool":["Bitter Malice","Hyper Voice","Protect","Tera Blast"],"teraTypes":["Fairy"]}]},"cinccino":{"level":85,"sets":[{"role":"Offensive Protect","movepool":["Bullet Seed","Knock Off","Protect","Tail Slap","Triple Axel"],"teraTypes":["Grass","Ice","Normal"]}]},"gothitelle":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Fake Out","Heal Pulse","Helping Hand","Protect","Psychic","Trick Room"],"teraTypes":["Dark","Steel"]}]},"reuniclus":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Focus Blast","Protect","Psychic","Shadow Ball","Trick Room"],"teraTypes":["Fighting"]}]},"swanna":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Hydro Pump","Knock Off","Protect","Tailwind"],"teraTypes":["Ground"]},{"role":"Offensive Protect","movepool":["Brave Bird","Hydro Pump","Protect","Tailwind"],"teraTypes":["Ground"]}]},"sawsbuck":{"level":91,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Double-Edge","High Horsepower","Horn Leech","Protect","Swords Dance"],"teraTypes":["Normal"]}]},"amoonguss":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Clear Smog","Pollen Puff","Protect","Rage Powder","Spore"],"teraTypes":["Steel","Water"]},{"role":"Doubles Support","movepool":["Pollen Puff","Rage Powder","Sludge Bomb","Spore"],"teraTypes":["Steel","Water"]}]},"alomomola":{"level":95,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Icy Wind","Scald","Wide Guard"],"teraTypes":["Steel"]}]},"galvantula":{"level":85,"sets":[{"role":"Doubles Support","movepool":["Bug Buzz","Protect","Sticky Web","Thunder","Volt Switch"],"teraTypes":["Electric"]}]},"eelektross":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Electroweb","Flamethrower","Giga Drain","Knock Off","Thunderbolt","U-turn"],"teraTypes":["Electric","Poison"]}]},"chandelure":{"level":81,"sets":[{"role":"Doubles Fast Attacker","movepool":["Energy Ball","Heat Wave","Protect","Shadow Ball","Trick"],"teraTypes":["Fire","Grass"]}]},"haxorus":{"level":83,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Iron Head","Protect","Scale Shot","Swords Dance"],"teraTypes":["Dragon","Fighting","Steel"]},{"role":"Offensive Protect","movepool":["Close Combat","Dragon Claw","First Impression","Iron Head","Protect"],"teraTypes":["Fighting","Steel"]}]},"beartic":{"level":90,"sets":[{"role":"Offensive Protect","movepool":["Aqua Jet","Close Combat","Icicle Crash","Protect"],"teraTypes":["Fighting","Water"]}]},"cryogonal":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Flash Cannon","Freeze-Dry","Haze","Icy Wind","Rapid Spin","Recover"],"teraTypes":["Steel"]}]},"mienshao":{"level":85,"sets":[{"role":"Doubles Fast Attacker","movepool":["Close Combat","Fake Out","Knock Off","Triple Axel","U-turn"],"teraTypes":["Dark"]},{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Fake Out","Knock Off","U-turn"],"teraTypes":["Dark","Steel"]}]},"golurk":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Dynamic Punch","High Horsepower","Poltergeist","Protect"],"teraTypes":["Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Dynamic Punch","High Horsepower","Poltergeist","Stone Edge"],"teraTypes":["Dragon","Fairy","Fighting"]}]},"braviary":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Close Combat","Protect","Tailwind"],"teraTypes":["Fighting","Flying"]}]},"braviaryhisui":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Heat Wave","Hurricane","Psychic","Tailwind"],"teraTypes":["Fire","Psychic","Steel"]},{"role":"Bulky Protect","movepool":["Calm Mind","Esper Wing","Hurricane","Protect"],"teraTypes":["Psychic","Steel"]}]},"mandibuzz":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Foul Play","Knock Off","Roost","Snarl","Tailwind","Taunt","Toxic","U-turn"],"teraTypes":["Steel"]}]},"hydreigon":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Dark Pulse","Draco Meteor","Protect","Snarl","Tailwind"],"teraTypes":["Dragon","Poison"]},{"role":"Doubles Fast Attacker","movepool":["Dark Pulse","Draco Meteor","Heat Wave","Protect"],"teraTypes":["Fire"]}]},"volcarona":{"level":79,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bug Buzz","Heat Wave","Protect","Quiver Dance"],"teraTypes":["Fire","Ground","Water"]},{"role":"Doubles Support","movepool":["Heat Wave","Rage Powder","Struggle Bug","Tailwind"],"teraTypes":["Steel","Water"]}]},"cobalion":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Body Press","Coaching","Iron Head","Thunder Wave","Volt Switch"],"teraTypes":["Flying","Water"]},{"role":"Bulky Protect","movepool":["Body Press","Iron Defense","Iron Head","Protect"],"teraTypes":["Flying","Water"]}]},"terrakion":{"level":79,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","High Horsepower","Rock Slide","Stone Edge"],"teraTypes":["Fighting","Ghost","Rock"]},{"role":"Offensive Protect","movepool":["Close Combat","High Horsepower","Protect","Rock Slide"],"teraTypes":["Fighting","Ghost","Rock"]}]},"virizion":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Close Combat","Coaching","Leaf Storm","Protect","Stone Edge"],"teraTypes":["Fire","Rock","Steel"]}]},"tornadus":{"level":77,"sets":[{"role":"Doubles Support","movepool":["Bleakwind Storm","Heat Wave","Knock Off","Protect","Tailwind","Taunt"],"teraTypes":["Steel"]}]},"tornadustherian":{"level":78,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bleakwind Storm","Grass Knot","Heat Wave","Nasty Plot","Protect"],"teraTypes":["Fire","Flying"]},{"role":"Choice Item user","movepool":["Bleakwind Storm","Focus Blast","Grass Knot","Heat Wave","U-turn"],"teraTypes":["Fire","Flying"]}]},"thundurus":{"level":80,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Grass Knot","Nasty Plot","Protect","Wildbolt Storm"],"teraTypes":["Electric","Grass"]},{"role":"Bulky Protect","movepool":["Grass Knot","Knock Off","Protect","Snarl","Taunt","Thunder Wave","Thunderbolt"],"teraTypes":["Steel"]},{"role":"Offensive Protect","movepool":["Acrobatics","Grass Knot","Knock Off","Protect","Snarl","Wildbolt Storm"],"teraTypes":["Electric","Flying","Steel"]}]},"thundurustherian":{"level":79,"sets":[{"role":"Doubles Fast Attacker","movepool":["Grass Knot","Protect","Sludge Bomb","Volt Switch","Wildbolt Storm"],"teraTypes":["Electric","Poison"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Tera Blast","Wildbolt Storm"],"teraTypes":["Flying","Ice"]}]},"reshiram":{"level":73,"sets":[{"role":"Doubles Wallbreaker","movepool":["Blue Flare","Draco Meteor","Heat Wave","Protect","Tailwind"],"teraTypes":["Fire"]}]},"zekrom":{"level":73,"sets":[{"role":"Doubles Wallbreaker","movepool":["Bolt Strike","Dragon Claw","Dragon Dance","Protect"],"teraTypes":["Dragon","Electric","Fire","Grass"]}]},"landorus":{"level":76,"sets":[{"role":"Doubles Wallbreaker","movepool":["Earth Power","Nasty Plot","Protect","Psychic","Sandsear Storm","Sludge Bomb"],"teraTypes":["Ground","Poison","Psychic"]}]},"landorustherian":{"level":77,"sets":[{"role":"Doubles Support","movepool":["Rock Slide","Stealth Rock","Stomping Tantrum","Taunt","U-turn"],"teraTypes":["Steel","Water"]},{"role":"Tera Blast user","movepool":["Earthquake","Protect","Stone Edge","Tera Blast"],"teraTypes":["Flying"]}]},"kyurem":{"level":77,"sets":[{"role":"Offensive Protect","movepool":["Earth Power","Icicle Spear","Protect","Scale Shot"],"teraTypes":["Fairy","Steel"]},{"role":"Doubles Fast Attacker","movepool":["Draco Meteor","Earth Power","Glaciate","Protect"],"teraTypes":["Fairy","Steel"]}]},"kyuremwhite":{"level":72,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Earth Power","Fusion Flare","Ice Beam","Protect"],"teraTypes":["Fire"]},{"role":"Doubles Fast Attacker","movepool":["Blizzard","Earth Power","Freeze-Dry","Fusion Flare","Protect"],"teraTypes":["Fire","Ground"]}]},"kyuremblack":{"level":75,"sets":[{"role":"Offensive Protect","movepool":["Dragon Dance","Fusion Bolt","Icicle Spear","Protect"],"teraTypes":["Electric"]}]},"keldeoresolute":{"level":78,"sets":[{"role":"Doubles Wallbreaker","movepool":["Hydro Pump","Muddy Water","Secret Sword","Vacuum Wave"],"teraTypes":["Fighting","Steel","Water"]},{"role":"Offensive Protect","movepool":["Hydro Pump","Muddy Water","Protect","Secret Sword","Vacuum Wave"],"teraTypes":["Fighting","Steel","Water"]}]},"meloetta":{"level":80,"sets":[{"role":"Doubles Wallbreaker","movepool":["Calm Mind","Focus Blast","Hyper Voice","Protect","Psychic","U-turn"],"teraTypes":["Fighting","Normal","Psychic"]},{"role":"Tera Blast user","movepool":["Close Combat","Psychic","Relic Song","Tera Blast"],"teraTypes":["Normal"]}]},"chesnaught":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Body Press","Coaching","Knock Off","Leech Seed","Spiky Shield","Wood Hammer"],"teraTypes":["Fire","Rock","Steel","Water"]},{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Leech Seed","Spiky Shield"],"teraTypes":["Fire","Rock","Steel","Water"]}]},"delphox":{"level":83,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Fire Blast","Heat Wave","Nasty Plot","Protect","Psyshock"],"teraTypes":["Fire"]}]},"greninjabond":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Dark Pulse","Gunk Shot","Hydro Pump","Ice Beam","Protect","Taunt"],"teraTypes":["Dark","Poison","Water"]}]},"talonflame":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Brave Bird","Overheat","Protect","Tailwind","U-turn","Will-O-Wisp"],"teraTypes":["Flying","Ground"]}]},"vivillon":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Hurricane","Pollen Puff","Protect","Sleep Powder"],"teraTypes":["Flying","Steel"]}]},"pyroar":{"level":83,"sets":[{"role":"Offensive Protect","movepool":["Fire Blast","Heat Wave","Hyper Voice","Protect","Taunt","Will-O-Wisp"],"teraTypes":["Fire","Normal","Water"]},{"role":"Tera Blast user","movepool":["Fire Blast","Hyper Voice","Protect","Tera Blast"],"teraTypes":["Grass"]}]},"florges":{"level":84,"sets":[{"role":"Bulky Protect","movepool":["Calm Mind","Dazzling Gleam","Moonblast","Protect","Synthesis"],"teraTypes":["Steel"]}]},"gogoat":{"level":89,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Double-Edge","High Horsepower","Horn Leech","Leaf Storm"],"teraTypes":["Ground","Normal"]}]},"meowstic":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fake Out","Fake Tears","Helping Hand","Light Screen","Psychic","Reflect"],"teraTypes":["Dark","Steel"]},{"role":"Doubles Support","movepool":["Fake Out","Helping Hand","Psychic","Thunder Wave"],"teraTypes":["Dark","Steel"]}]},"meowsticf":{"level":88,"sets":[{"role":"Offensive Protect","movepool":["Alluring Voice","Dark Pulse","Protect","Psychic","Thunderbolt"],"teraTypes":["Dark","Electric","Fairy"]}]},"malamar":{"level":80,"sets":[{"role":"Bulky Protect","movepool":["Knock Off","Protect","Psycho Cut","Superpower","Trick Room"],"teraTypes":["Fighting"]}]},"dragalge":{"level":88,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Hydro Pump","Protect","Sludge Bomb"],"teraTypes":["Water"]}]},"clawitzer":{"level":84,"sets":[{"role":"Choice Item user","movepool":["Aura Sphere","Dark Pulse","Dragon Pulse","Muddy Water","U-turn"],"teraTypes":["Dark","Dragon","Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Aura Sphere","Dark Pulse","Heal Pulse","Muddy Water","Protect"],"teraTypes":["Dark","Fighting"]}]},"sylveon":{"level":79,"sets":[{"role":"Bulky Protect","movepool":["Calm Mind","Hyper Voice","Protect","Substitute"],"teraTypes":["Steel"]},{"role":"Tera Blast user","movepool":["Hyper Voice","Protect","Quick Attack","Tera Blast"],"teraTypes":["Fire","Ground"]}]},"hawlucha":{"level":84,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Brave Bird","Close Combat","Protect","Swords Dance"],"teraTypes":["Fighting","Fire","Flying"]}]},"dedenne":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Dazzling Gleam","Helping Hand","Nuzzle","Super Fang","Thunderbolt"],"teraTypes":["Electric","Flying"]}]},"carbink":{"level":89,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Moonblast","Trick Room"],"teraTypes":["Fighting"]}]},"goodra":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Breaking Swipe","Draco Meteor","Fire Blast","Power Whip","Protect","Scald","Sludge Bomb","Thunderbolt"],"teraTypes":["Electric","Fire","Grass","Poison","Water"]}]},"goodrahisui":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Dragon Tail","Fire Blast","Heavy Slam","Hydro Pump","Thunderbolt"],"teraTypes":["Electric","Fire","Water"]}]},"klefki":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Dazzling Gleam","Foul Play","Light Screen","Reflect","Spikes","Thunder Wave"],"teraTypes":["Flying","Water"]}]},"trevenant":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Poltergeist","Protect","Trick Room","Wood Hammer"],"teraTypes":["Dark","Water"]}]},"avalugg":{"level":90,"sets":[{"role":"Bulky Protect","movepool":["Avalanche","Body Press","Protect","Recover"],"teraTypes":["Fighting","Poison","Water"]}]},"avalugghisui":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Body Press","Mountain Gale","Protect","Rock Slide"],"teraTypes":["Fighting","Flying","Poison"]}]},"noivern":{"level":84,"sets":[{"role":"Doubles Fast Attacker","movepool":["Draco Meteor","Flamethrower","Hurricane","Protect","Tailwind"],"teraTypes":["Dragon","Fire","Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Flamethrower","Hurricane","Protect","Tailwind"],"teraTypes":["Dragon","Fire","Steel"]}]},"diancie":{"level":78,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Diamond Storm","Protect","Trick Room"],"teraTypes":["Fighting"]},{"role":"Bulky Protect","movepool":["Diamond Storm","Moonblast","Protect","Trick Room"],"teraTypes":["Grass","Steel"]}]},"hoopa":{"level":85,"sets":[{"role":"Doubles Fast Attacker","movepool":["Focus Blast","Hyperspace Hole","Protect","Shadow Ball","Trick"],"teraTypes":["Dark","Fighting","Psychic"]}]},"hoopaunbound":{"level":80,"sets":[{"role":"Choice Item user","movepool":["Drain Punch","Gunk Shot","Hyperspace Fury","Trick","Zen Headbutt"],"teraTypes":["Dark","Fighting","Poison"]},{"role":"Doubles Bulky Attacker","movepool":["Focus Blast","Gunk Shot","Hyperspace Fury","Protect","Psychic","Trick"],"teraTypes":["Dark","Fighting","Poison"]}]},"volcanion":{"level":74,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Earth Power","Heat Wave","Protect","Sludge Bomb","Steam Eruption"],"teraTypes":["Ground"]}]},"decidueye":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Knock Off","Leaf Storm","Protect","Spirit Shackle","Tailwind"],"teraTypes":["Dark","Ghost","Water"]}]},"decidueyehisui":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Knock Off","Leaf Blade","Protect","Tailwind","Triple Arrows"],"teraTypes":["Dark","Fighting","Steel"]}]},"incineroar":{"level":78,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fake Out","Flare Blitz","Knock Off","Parting Shot"],"teraTypes":["Water"]}]},"primarina":{"level":79,"sets":[{"role":"Doubles Wallbreaker","movepool":["Flip Turn","Hydro Pump","Hyper Voice","Moonblast"],"teraTypes":["Water"]}]},"toucannon":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Brave Bird","Bullet Seed","Protect","Tailwind"],"teraTypes":["Grass","Steel"]},{"role":"Bulky Protect","movepool":["Beak Blast","Bullet Seed","Knock Off","Protect"],"teraTypes":["Grass","Steel"]}]},"gumshoos":{"level":93,"sets":[{"role":"Choice Item user","movepool":["Double-Edge","Knock Off","Stomping Tantrum","U-turn"],"teraTypes":["Normal"]}]},"vikavolt":{"level":83,"sets":[{"role":"Bulky Protect","movepool":["Bug Buzz","Electroweb","Protect","Sticky Web","Thunderbolt"],"teraTypes":["Electric"]}]},"crabominable":{"level":89,"sets":[{"role":"Doubles Wallbreaker","movepool":["Drain Punch","Gunk Shot","Ice Hammer","Protect","Wide Guard"],"teraTypes":["Fire","Poison"]}]},"oricorio":{"level":84,"sets":[{"role":"Bulky Protect","movepool":["Hurricane","Protect","Quiver Dance","Revelation Dance","Tailwind"],"teraTypes":["Ground"]}]},"oricoriopompom":{"level":83,"sets":[{"role":"Bulky Protect","movepool":["Hurricane","Protect","Quiver Dance","Revelation Dance","Tailwind"],"teraTypes":["Ground"]}]},"oricoriopau":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Hurricane","Protect","Quiver Dance","Revelation Dance","Tailwind"],"teraTypes":["Fighting","Ground"]}]},"oricoriosensu":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Hurricane","Protect","Quiver Dance","Revelation Dance","Tailwind"],"teraTypes":["Fighting","Ground"]}]},"ribombee":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Moonblast","Pollen Puff","Protect","Tailwind"],"teraTypes":["Steel"]},{"role":"Tera Blast user","movepool":["Dazzling Gleam","Moonblast","Protect","Quiver Dance","Tera Blast"],"teraTypes":["Ground"]}]},"lycanroc":{"level":85,"sets":[{"role":"Offensive Protect","movepool":["Accelerock","Close Combat","Drill Run","Protect","Rock Slide","Swords Dance"],"teraTypes":["Fighting"]}]},"lycanrocmidnight":{"level":85,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Knock Off","Rock Slide","Stone Edge"],"teraTypes":["Fighting","Rock","Water"]}]},"lycanrocdusk":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Accelerock","Close Combat","Protect","Psychic Fangs","Rock Slide","Swords Dance"],"teraTypes":["Fighting"]}]},"toxapex":{"level":94,"sets":[{"role":"Bulky Protect","movepool":["Baneful Bunker","Infestation","Recover","Toxic"],"teraTypes":["Grass","Steel"]}]},"mudsdale":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Heavy Slam","High Horsepower","Rest","Stone Edge"],"teraTypes":["Fighting"]}]},"araquanid":{"level":85,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Liquidation","Lunge","Protect","Sticky Web","Wide Guard"],"teraTypes":["Water"]}]},"lurantis":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Leaf Blade","Leaf Storm","Pollen Puff","Superpower"],"teraTypes":["Fighting"]},{"role":"Bulky Protect","movepool":["Knock Off","Leaf Blade","Pollen Puff","Protect","Superpower"],"teraTypes":["Fighting"]},{"role":"Tera Blast user","movepool":["Knock Off","Leaf Storm","Superpower","Tera Blast"],"teraTypes":["Stellar"]}]},"salazzle":{"level":86,"sets":[{"role":"Doubles Fast Attacker","movepool":["Encore","Fake Out","Fire Blast","Heat Wave","Incinerate","Poison Gas","Protect","Sludge Bomb"],"teraTypes":["Fire","Flying","Water"]}]},"tsareena":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["High Jump Kick","Knock Off","Power Whip","Rapid Spin","Triple Axel"],"teraTypes":["Fighting","Fire"]}]},"comfey":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Draining Kiss","Floral Healing","Helping Hand","Tailwind"],"teraTypes":["Fairy","Steel"]}]},"oranguru":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Hyper Voice","Instruct","Psyshock","Trick Room"],"teraTypes":["Fairy"]}]},"passimian":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Gunk Shot","Knock Off","Rock Slide","U-turn"],"teraTypes":["Dark","Poison"]}]},"palossand":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Earth Power","Protect","Shadow Ball","Shore Up","Stealth Rock"],"teraTypes":["Grass","Water"]}]},"minior":{"level":82,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Acrobatics","Protect","Rock Slide","Shell Smash"],"teraTypes":["Flying","Rock","Steel"]}]},"komala":{"level":92,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Double-Edge","Knock Off","Rapid Spin","Sucker Punch","Superpower","U-turn","Wood Hammer"],"teraTypes":["Fighting","Grass"]}]},"mimikyu":{"level":82,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Play Rough","Protect","Shadow Claw","Shadow Sneak","Swords Dance"],"teraTypes":["Ghost"]}]},"bruxish":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Crunch","Protect","Psychic Fangs","Wave Crash"],"teraTypes":["Dark","Psychic"]},{"role":"Choice Item user","movepool":["Aqua Jet","Crunch","Flip Turn","Ice Fang","Psychic Fangs","Wave Crash"],"teraTypes":["Dark"]}]},"solgaleo":{"level":75,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Flare Blitz","Knock Off","Psychic Fangs","Sunsteel Strike"],"teraTypes":["Dark","Fighting","Fire"]},{"role":"Doubles Bulky Setup","movepool":["Close Combat","Flame Charge","Protect","Sunsteel Strike"],"teraTypes":["Fighting","Fire"]}]},"lunala":{"level":72,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Moongeist Beam","Moonlight","Tailwind","Wide Guard","Will-O-Wisp"],"teraTypes":["Dark"]},{"role":"Offensive Protect","movepool":["Meteor Beam","Moonblast","Moongeist Beam","Protect"],"teraTypes":["Fairy"]},{"role":"Bulky Protect","movepool":["Calm Mind","Moonblast","Moongeist Beam","Protect"],"teraTypes":["Fairy"]}]},"necrozma":{"level":80,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Brick Break","Dragon Dance","Knock Off","Photon Geyser"],"teraTypes":["Dark","Fighting"]},{"role":"Offensive Protect","movepool":["Earth Power","Meteor Beam","Photon Geyser","Protect"],"teraTypes":["Dark","Steel"]},{"role":"Bulky Protect","movepool":["Calm Mind","Earth Power","Photon Geyser","Protect"],"teraTypes":["Dark","Steel"]}]},"necrozmaduskmane":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dragon Dance","Earthquake","Photon Geyser","Protect","Sunsteel Strike"],"teraTypes":["Dark","Steel","Water"]},{"role":"Doubles Wallbreaker","movepool":["Earthquake","Photon Geyser","Protect","Sunsteel Strike","Trick Room"],"teraTypes":["Dark","Steel","Water"]}]},"necrozmadawnwings":{"level":73,"sets":[{"role":"Doubles Wallbreaker","movepool":["Moongeist Beam","Photon Geyser","Protect","Trick Room"],"teraTypes":["Dark"]},{"role":"Tera Blast user","movepool":["Moongeist Beam","Photon Geyser","Tera Blast","Trick Room"],"teraTypes":["Fairy","Fighting"]}]},"kommoo":{"level":79,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Clanging Scales","Clangorous Soul","Drain Punch","Iron Head"],"teraTypes":["Steel"]},{"role":"Doubles Bulky Setup","movepool":["Clanging Scales","Clangorous Soul","Iron Head","Protect"],"teraTypes":["Steel"]}]},"magearna":{"level":71,"sets":[{"role":"Doubles Wallbreaker","movepool":["Dazzling Gleam","Flash Cannon","Fleur Cannon","Protect","Trick Room"],"teraTypes":["Fairy","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Aura Sphere","Dazzling Gleam","Flash Cannon","Fleur Cannon"],"teraTypes":["Fairy","Fighting","Water"]}]},"rillaboom":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fake Out","Grassy Glide","High Horsepower","Wood Hammer"],"teraTypes":["Fire","Grass","Steel"]},{"role":"Doubles Support","movepool":["Fake Out","Grassy Glide","U-turn","Wood Hammer"],"teraTypes":["Fire","Grass","Steel"]}]},"cinderace":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Court Change","Gunk Shot","High Jump Kick","Protect","Pyro Ball","Sucker Punch","U-turn"],"teraTypes":["Fighting","Fire","Poison"]}]},"inteleon":{"level":81,"sets":[{"role":"Choice Item user","movepool":["Hydro Pump","Ice Beam","Muddy Water","Scald"],"teraTypes":["Water"]}]},"greedent":{"level":86,"sets":[{"role":"Doubles Bulky Setup","movepool":["Double-Edge","High Horsepower","Knock Off","Protect","Swords Dance"],"teraTypes":["Fairy","Ghost","Ground"]}]},"corviknight":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Brave Bird","Iron Head","Roost","Tailwind","U-turn"],"teraTypes":["Dragon"]}]},"drednaw":{"level":83,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Crunch","Liquidation","Protect","Rock Slide","Shell Smash"],"teraTypes":["Dark","Water"]}]},"coalossal":{"level":90,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fire Blast","Heat Wave","Incinerate","Protect","Rapid Spin","Stealth Rock","Stone Edge","Will-O-Wisp"],"teraTypes":["Water"]}]},"flapple":{"level":93,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Dragon Dance","Dragon Rush","Grav Apple","Protect","Sucker Punch"],"teraTypes":["Fire","Grass","Steel"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Grav Apple","Protect","Tera Blast"],"teraTypes":["Dragon","Fire"]}]},"appletun":{"level":91,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Apple Acid","Dragon Pulse","Leech Seed","Protect"],"teraTypes":["Steel"]}]},"sandaconda":{"level":87,"sets":[{"role":"Doubles Bulky Setup","movepool":["Coil","High Horsepower","Rest","Stone Edge"],"teraTypes":["Dragon","Steel"]},{"role":"Doubles Support","movepool":["Glare","High Horsepower","Rest","Stealth Rock","Stone Edge"],"teraTypes":["Dragon","Steel"]}]},"cramorant":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Brave Bird","Protect","Roost","Surf","Tailwind"],"teraTypes":["Ground"]}]},"barraskewda":{"level":83,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Poison Jab","Protect","Psychic Fangs","Waterfall"],"teraTypes":["Fighting"]}]},"toxtricity":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Overdrive","Sludge Bomb","Snarl","Volt Switch"],"teraTypes":["Dark","Electric","Flying"]},{"role":"Doubles Wallbreaker","movepool":["Overdrive","Psychic Noise","Sludge Bomb","Volt Switch"],"teraTypes":["Electric","Flying","Psychic"]}]},"toxtricitylowkey":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Overdrive","Sludge Bomb","Snarl","Volt Switch"],"teraTypes":["Dark","Electric","Flying"]},{"role":"Doubles Wallbreaker","movepool":["Overdrive","Psychic Noise","Sludge Bomb","Volt Switch"],"teraTypes":["Electric","Flying","Psychic"]}]},"polteageist":{"level":85,"sets":[{"role":"Tera Blast user","movepool":["Protect","Shadow Ball","Shell Smash","Tera Blast"],"teraTypes":["Fighting"]},{"role":"Doubles Setup Sweeper","movepool":["Baton Pass","Protect","Shadow Ball","Shell Smash"],"teraTypes":["Dark","Normal"]}]},"hatterene":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Dazzling Gleam","Mystical Fire","Protect","Psychic","Trick Room"],"teraTypes":["Fairy","Fire","Psychic","Steel"]}]},"grimmsnarl":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fake Out","Light Screen","Parting Shot","Reflect","Spirit Break"],"teraTypes":["Steel"]},{"role":"Doubles Support","movepool":["Fake Out","Parting Shot","Spirit Break","Sucker Punch","Taunt","Thunder Wave"],"teraTypes":["Steel"]}]},"perrserker":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Fake Out","Helping Hand","Iron Head","Knock Off","U-turn"],"teraTypes":["Fighting","Steel"]},{"role":"Choice Item user","movepool":["Close Combat","Iron Head","Knock Off","U-turn"],"teraTypes":["Fighting","Steel"]}]},"alcremie":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Alluring Voice","Dazzling Gleam","Decorate","Encore","Protect"],"teraTypes":["Steel"]}]},"falinks":{"level":86,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Iron Head","Knock Off","No Retreat"],"teraTypes":["Dark","Fighting","Steel"]}]},"pincurchin":{"level":97,"sets":[{"role":"Doubles Support","movepool":["Electroweb","Recover","Thunderbolt","Toxic Spikes"],"teraTypes":["Grass"]}]},"frosmoth":{"level":86,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bug Buzz","Ice Beam","Protect","Quiver Dance"],"teraTypes":["Ground","Water"]}]},"stonjourner":{"level":89,"sets":[{"role":"Doubles Fast Attacker","movepool":["Heat Crash","High Horsepower","Protect","Rock Polish","Stone Edge"],"teraTypes":["Fire","Rock"]},{"role":"Choice Item user","movepool":["Heat Crash","High Horsepower","Rock Slide","Stone Edge"],"teraTypes":["Fire","Rock"]}]},"eiscue":{"level":89,"sets":[{"role":"Doubles Bulky Setup","movepool":["Belly Drum","Ice Spinner","Liquidation","Protect"],"teraTypes":["Water"]}]},"indeedee":{"level":80,"sets":[{"role":"Offensive Protect","movepool":["Encore","Expanding Force","Hyper Voice","Protect","Shadow Ball"],"teraTypes":["Fairy","Psychic"]},{"role":"Doubles Wallbreaker","movepool":["Expanding Force","Hyper Voice","Psyshock","Trick"],"teraTypes":["Psychic"]},{"role":"Tera Blast user","movepool":["Encore","Expanding Force","Protect","Shadow Ball","Tera Blast","Trick"],"teraTypes":["Fairy","Fighting"]}]},"indeedeef":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Heal Pulse","Helping Hand","Protect","Psychic"],"teraTypes":["Fairy"]}]},"morpeko":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Aura Wheel","Electroweb","Fake Out","Knock Off","Protect"],"teraTypes":["Electric"]},{"role":"Offensive Protect","movepool":["Aura Wheel","Knock Off","Parting Shot","Protect","Volt Switch"],"teraTypes":["Electric"]}]},"copperajah":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["High Horsepower","Iron Head","Play Rough","Protect","Rock Slide"],"teraTypes":["Fairy","Rock"]},{"role":"Doubles Bulky Attacker","movepool":["Heat Crash","Heavy Slam","High Horsepower","Stone Edge"],"teraTypes":["Fire"]}]},"duraludon":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Draco Meteor","Flash Cannon","Iron Defense"],"teraTypes":["Fighting"]},{"role":"Doubles Bulky Setup","movepool":["Body Press","Flash Cannon","Iron Defense","Protect","Snarl","Thunder Wave"],"teraTypes":["Fighting"]}]},"dragapult":{"level":79,"sets":[{"role":"Offensive Protect","movepool":["Draco Meteor","Dragon Darts","Fire Blast","Protect","Shadow Ball"],"teraTypes":["Dragon"]},{"role":"Choice Item user","movepool":["Dragon Claw","Dragon Darts","Phantom Force","U-turn"],"teraTypes":["Dragon"]}]},"zacian":{"level":70,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Play Rough","Protect","Psychic Fangs","Swords Dance"],"teraTypes":["Fighting"]}]},"zaciancrowned":{"level":66,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Behemoth Blade","Close Combat","Play Rough","Protect","Swords Dance"],"teraTypes":["Fairy","Fighting","Fire","Steel"]}]},"zamazenta":{"level":72,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Coaching","Crunch","Howl","Iron Head","Psychic Fangs","Stone Edge"],"teraTypes":["Dark","Fighting","Steel"]},{"role":"Bulky Protect","movepool":["Body Press","Crunch","Iron Defense","Protect"],"teraTypes":["Fighting","Fire","Steel"]}]},"zamazentacrowned":{"level":68,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Body Press","Coaching","Heavy Slam","Iron Defense","Protect","Snarl","Wide Guard"],"teraTypes":["Fighting","Fire","Steel"]}]},"eternatus":{"level":70,"sets":[{"role":"Doubles Bulky Setup","movepool":["Cosmic Power","Dynamax Cannon","Flamethrower","Recover"],"teraTypes":["Dragon","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Dynamax Cannon","Fire Blast","Recover","Sludge Bomb","Toxic Spikes"],"teraTypes":["Dragon","Water"]},{"role":"Offensive Protect","movepool":["Dynamax Cannon","Fire Blast","Meteor Beam","Protect"],"teraTypes":["Dragon","Water"]}]},"urshifu":{"level":76,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Poison Jab","Protect","Sucker Punch","Wicked Blow"],"teraTypes":["Dark","Poison"]}]},"urshifurapidstrike":{"level":77,"sets":[{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Close Combat","Ice Spinner","Protect","Surging Strikes","U-turn"],"teraTypes":["Water"]}]},"zarude":{"level":80,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Jungle Healing","Knock Off","Power Whip","Protect"],"teraTypes":["Poison"]}]},"regieleki":{"level":79,"sets":[{"role":"Doubles Fast Attacker","movepool":["Electroweb","Protect","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]},{"role":"Tera Blast user","movepool":["Electroweb","Protect","Tera Blast","Thunderbolt"],"teraTypes":["Ice"]}]},"regidrago":{"level":74,"sets":[{"role":"Choice Item user","movepool":["Draco Meteor","Dragon Claw","Dragon Energy","Earth Power"],"teraTypes":["Dragon"]}]},"glastrier":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Heavy Slam","High Horsepower","Icicle Crash","Protect"],"teraTypes":["Fighting","Ground","Steel"]}]},"spectrier":{"level":78,"sets":[{"role":"Offensive Protect","movepool":["Draining Kiss","Nasty Plot","Protect","Shadow Ball"],"teraTypes":["Fairy"]},{"role":"Doubles Setup Sweeper","movepool":["Dark Pulse","Nasty Plot","Protect","Shadow Ball"],"teraTypes":["Dark"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Shadow Ball","Tera Blast"],"teraTypes":["Fighting"]}]},"calyrex":{"level":96,"sets":[{"role":"Doubles Support","movepool":["Encore","Giga Drain","Helping Hand","Leaf Storm","Leech Seed","Pollen Puff","Psychic"],"teraTypes":["Steel"]}]},"calyrexice":{"level":65,"sets":[{"role":"Doubles Wallbreaker","movepool":["Glacial Lance","High Horsepower","Protect","Trick Room"],"teraTypes":["Ground","Ice"]}]},"calyrexshadow":{"level":63,"sets":[{"role":"Offensive Protect","movepool":["Astral Barrage","Encore","Nasty Plot","Pollen Puff","Protect","Psyshock"],"teraTypes":["Dark","Ghost"]}]},"wyrdeer":{"level":85,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Slam","Double-Edge","Earth Power","Protect","Psychic","Thunder Wave","Thunderbolt"],"teraTypes":["Fairy"]},{"role":"Doubles Wallbreaker","movepool":["Double-Edge","Earth Power","Psychic","Trick Room"],"teraTypes":["Fairy","Ground"]}]},"kleavor":{"level":79,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Protect","Stone Axe","Tailwind","U-turn","X-Scissor"],"teraTypes":["Bug","Fighting","Rock","Steel"]}]},"ursaluna":{"level":77,"sets":[{"role":"Doubles Wallbreaker","movepool":["Crunch","Earthquake","Facade","Headlong Rush","Protect"],"teraTypes":["Normal"]}]},"ursalunabloodmoon":{"level":78,"sets":[{"role":"Bulky Protect","movepool":["Blood Moon","Earth Power","Hyper Voice","Protect"],"teraTypes":["Ghost","Normal","Water"]}]},"enamorus":{"level":79,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Play Rough","Protect","Superpower","Tailwind"],"teraTypes":["Fighting"]},{"role":"Offensive Protect","movepool":["Earth Power","Protect","Springtide Storm","Tailwind"],"teraTypes":["Ground"]},{"role":"Tera Blast user","movepool":["Protect","Springtide Storm","Superpower","Tera Blast"],"teraTypes":["Stellar"]}]},"enamorustherian":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Earth Power","Moonblast","Mystical Fire","Protect","Springtide Storm"],"teraTypes":["Fairy","Ground"]}]},"meowscarada":{"level":80,"sets":[{"role":"Choice Item user","movepool":["Flower Trick","Knock Off","Sucker Punch","Triple Axel","U-turn"],"teraTypes":["Dark","Grass"]},{"role":"Offensive Protect","movepool":["Flower Trick","Knock Off","Pollen Puff","Protect","Sucker Punch","Taunt"],"teraTypes":["Poison"]}]},"skeledirge":{"level":80,"sets":[{"role":"Bulky Protect","movepool":["Protect","Shadow Ball","Slack Off","Torch Song"],"teraTypes":["Fairy","Water"]}]},"quaquaval":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Aqua Jet","Aqua Step","Close Combat","Knock Off","Protect","Triple Axel"],"teraTypes":["Fire","Steel","Water"]}]},"oinkologne":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Double-Edge","Helping Hand","Lash Out","Protect","Yawn"],"teraTypes":["Ghost","Normal"]},{"role":"Doubles Wallbreaker","movepool":["Double-Edge","High Horsepower","Lash Out","Play Rough"],"teraTypes":["Fairy","Ground","Normal"]}]},"oinkolognef":{"level":92,"sets":[{"role":"Doubles Support","movepool":["Double-Edge","Helping Hand","Lash Out","Protect","Yawn"],"teraTypes":["Ghost","Normal"]},{"role":"Doubles Wallbreaker","movepool":["Double-Edge","High Horsepower","Lash Out","Play Rough"],"teraTypes":["Fairy","Ground","Normal"]}]},"spidops":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Circle Throw","Knock Off","Lunge","Sticky Web","String Shot","U-turn"],"teraTypes":["Water"]}]},"lokix":{"level":87,"sets":[{"role":"Offensive Protect","movepool":["First Impression","Protect","Sucker Punch","U-turn"],"teraTypes":["Bug"]},{"role":"Doubles Fast Attacker","movepool":["First Impression","Leech Life","Protect","Sucker Punch"],"teraTypes":["Bug"]}]},"pawmot":{"level":81,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Double Shock","Fake Out","Protect","Revival Blessing"],"teraTypes":["Electric"]}]},"maushold":{"level":80,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Encore","Population Bomb","Protect","Tidy Up"],"teraTypes":["Normal"]},{"role":"Doubles Support","movepool":["Encore","Follow Me","Population Bomb","Protect","Taunt","Thunder Wave","U-turn"],"teraTypes":["Ghost","Normal"]}]},"dachsbun":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Body Press","Helping Hand","Howl","Play Rough","Snarl","Yawn"],"teraTypes":["Steel"]}]},"arboliva":{"level":88,"sets":[{"role":"Doubles Wallbreaker","movepool":["Earth Power","Energy Ball","Hyper Voice","Pollen Puff","Protect","Strength Sap"],"teraTypes":["Grass"]}]},"squawkabilly":{"level":88,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Double-Edge","Parting Shot","Protect","Quick Attack"],"teraTypes":["Flying","Normal","Steel"]}]},"squawkabillywhite":{"level":88,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Double-Edge","Parting Shot","Protect","Quick Attack"],"teraTypes":["Flying","Normal","Steel"]}]},"squawkabillyblue":{"level":88,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Double-Edge","Parting Shot","Protect","Quick Attack"],"teraTypes":["Flying","Normal","Steel"]}]},"squawkabillyyellow":{"level":88,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Double-Edge","Parting Shot","Protect","Quick Attack"],"teraTypes":["Flying","Normal","Steel"]}]},"garganacl":{"level":81,"sets":[{"role":"Bulky Protect","movepool":["Protect","Recover","Salt Cure","Stealth Rock","Wide Guard"],"teraTypes":["Ghost"]}]},"armarouge":{"level":81,"sets":[{"role":"Doubles Wallbreaker","movepool":["Armor Cannon","Aura Sphere","Energy Ball","Heat Wave","Psyshock"],"teraTypes":["Fighting","Fire","Grass"]},{"role":"Offensive Protect","movepool":["Heat Wave","Protect","Psychic","Trick Room"],"teraTypes":["Dark","Grass"]},{"role":"Doubles Setup Sweeper","movepool":["Heat Wave","Meteor Beam","Protect","Psychic","Psyshock"],"teraTypes":["Dark","Grass"]}]},"ceruledge":{"level":80,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bitter Blade","Poltergeist","Protect","Shadow Sneak","Swords Dance"],"teraTypes":["Fire","Ghost","Grass"]}]},"bellibolt":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Electroweb","Muddy Water","Slack Off","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Water"]}]},"kilowattrel":{"level":80,"sets":[{"role":"Doubles Fast Attacker","movepool":["Hurricane","Protect","Tailwind","Thunderbolt"],"teraTypes":["Flying","Steel"]}]},"mabosstiff":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Crunch","Fire Fang","Play Rough","Psychic Fangs","Wild Charge"],"teraTypes":["Fairy"]}]},"grafaiai":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Encore","Gunk Shot","Knock Off","Parting Shot","Protect","Taunt"],"teraTypes":["Dark"]},{"role":"Doubles Support","movepool":["Gunk Shot","Knock Off","Super Fang","U-turn"],"teraTypes":["Dark"]}]},"brambleghast":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Poltergeist","Power Whip","Protect","Shadow Sneak"],"teraTypes":["Fairy","Ghost","Grass","Steel","Water"]},{"role":"Doubles Support","movepool":["Disable","Poltergeist","Power Whip","Protect","Rapid Spin","Strength Sap"],"teraTypes":["Fairy","Steel","Water"]}]},"toedscruel":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Earth Power","Giga Drain","Knock Off","Rage Powder","Spore"],"teraTypes":["Water"]}]},"klawf":{"level":91,"sets":[{"role":"Offensive Protect","movepool":["Crabhammer","High Horsepower","Knock Off","Protect","Rock Slide"],"teraTypes":["Dark","Ground","Water"]},{"role":"Choice Item user","movepool":["Crabhammer","High Horsepower","Knock Off","Rock Slide"],"teraTypes":["Dark","Ground","Water"]}]},"scovillain":{"level":89,"sets":[{"role":"Choice Item user","movepool":["Burning Jealousy","Energy Ball","Fire Blast","Leaf Storm"],"teraTypes":["Fire","Grass","Steel"]},{"role":"Doubles Support","movepool":["Energy Ball","Fire Blast","Protect","Rage Powder","Will-O-Wisp"],"teraTypes":["Fire","Grass","Steel"]}]},"rabsca":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Psychic","Revival Blessing","Struggle Bug","Trick Room"],"teraTypes":["Steel"]}]},"espathra":{"level":83,"sets":[{"role":"Offensive Protect","movepool":["Baton Pass","Dazzling Gleam","Lumina Crash","Protect","Shadow Ball"],"teraTypes":["Fairy"]}]},"tinkaton":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Encore","Fake Out","Gigaton Hammer","Knock Off","Play Rough","Stealth Rock","Thunder Wave"],"teraTypes":["Steel","Water"]}]},"wugtrio":{"level":92,"sets":[{"role":"Choice Item user","movepool":["Aqua Jet","Liquidation","Memento","Stomping Tantrum","Throat Chop"],"teraTypes":["Dark","Ground"]}]},"bombirdier":{"level":84,"sets":[{"role":"Choice Item user","movepool":["Brave Bird","Knock Off","Rock Slide","Sucker Punch"],"teraTypes":["Rock"]},{"role":"Offensive Protect","movepool":["Brave Bird","Knock Off","Protect","Rock Slide"],"teraTypes":["Rock"]}]},"palafin":{"level":79,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Flip Turn","Jet Punch","Wave Crash"],"teraTypes":["Fighting","Water"]},{"role":"Offensive Protect","movepool":["Flip Turn","Jet Punch","Protect","Wave Crash"],"teraTypes":["Water"]}]},"revavroom":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["Gunk Shot","Iron Head","Parting Shot","Protect"],"teraTypes":["Flying","Water"]},{"role":"Doubles Fast Attacker","movepool":["Gunk Shot","High Horsepower","Iron Head","Protect","Shift Gear"],"teraTypes":["Ground"]}]},"cyclizar":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Breaking Swipe","Double-Edge","Knock Off","Shed Tail","Taunt"],"teraTypes":["Dragon","Poison"]},{"role":"Doubles Fast Attacker","movepool":["Double-Edge","Draco Meteor","Knock Off","Shed Tail"],"teraTypes":["Dragon","Fire","Normal","Poison"]}]},"orthworm":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Body Press","Iron Defense","Iron Head","Protect"],"teraTypes":["Electric","Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Body Press","Helping Hand","Iron Head","Protect","Shed Tail","Stealth Rock"],"teraTypes":["Electric","Poison"]}]},"glimmora":{"level":77,"sets":[{"role":"Bulky Protect","movepool":["Earth Power","Mortal Spin","Power Gem","Sludge Bomb","Spiky Shield","Stealth Rock"],"teraTypes":["Grass","Water"]},{"role":"Offensive Protect","movepool":["Earth Power","Meteor Beam","Sludge Bomb","Spiky Shield"],"teraTypes":["Ground"]}]},"houndstone":{"level":74,"sets":[{"role":"Choice Item user","movepool":["Body Press","Last Respects","Shadow Sneak","Trick"],"teraTypes":["Ghost"]}]},"flamigo":{"level":84,"sets":[{"role":"Choice Item user","movepool":["Brave Bird","Close Combat","Throat Chop","U-turn"],"teraTypes":["Fighting","Fire","Flying"]}]},"cetitan":{"level":83,"sets":[{"role":"Doubles Wallbreaker","movepool":["High Horsepower","Ice Shard","Icicle Crash","Liquidation","Protect"],"teraTypes":["Ground","Water"]}]},"veluza":{"level":88,"sets":[{"role":"Choice Item user","movepool":["Aqua Cutter","Aqua Jet","Night Slash","Psycho Cut"],"teraTypes":["Dark","Psychic","Water"]}]},"dondozo":{"level":85,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Avalanche","Body Press","Heavy Slam","Wave Crash"],"teraTypes":["Dragon","Grass","Steel"]}]},"tatsugiri":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Icy Wind","Muddy Water","Rapid Spin"],"teraTypes":["Fire","Steel"]},{"role":"Doubles Setup Sweeper","movepool":["Draco Meteor","Muddy Water","Nasty Plot","Protect"],"teraTypes":["Dragon","Fire","Water"]},{"role":"Choice Item user","movepool":["Draco Meteor","Hydro Pump","Icy Wind","Muddy Water"],"teraTypes":["Dragon","Fire","Water"]}]},"farigiraf":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Hyper Voice","Nasty Plot","Protect","Psychic","Psyshock","Trick Room"],"teraTypes":["Fairy"]}]},"dudunsparce":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Earth Power","Glare","Hyper Drill","Protect","Tailwind"],"teraTypes":["Ghost","Ground","Normal"]},{"role":"Doubles Bulky Attacker","movepool":["Boomburst","Earth Power","Helping Hand","Protect","Tailwind"],"teraTypes":["Ghost","Ground","Normal"]}]},"kingambit":{"level":77,"sets":[{"role":"Doubles Bulky Setup","movepool":["Iron Head","Protect","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fire","Flying"]},{"role":"Bulky Protect","movepool":["Iron Head","Kowtow Cleave","Protect","Sucker Punch"],"teraTypes":["Dark","Fire","Flying"]},{"role":"Tera Blast user","movepool":["Iron Head","Kowtow Cleave","Sucker Punch","Tera Blast"],"teraTypes":["Fairy","Fire","Flying"]}]},"greattusk":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Headlong Rush","Ice Spinner","Knock Off","Protect","Rapid Spin","Rock Slide"],"teraTypes":["Fire","Ground"]}]},"brutebonnet":{"level":79,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Crunch","Protect","Rage Powder","Seed Bomb","Spore","Sucker Punch"],"teraTypes":["Dark","Poison"]}]},"sandyshocks":{"level":80,"sets":[{"role":"Doubles Fast Attacker","movepool":["Earth Power","Electroweb","Protect","Stealth Rock","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Grass","Ground"]},{"role":"Tera Blast user","movepool":["Earth Power","Protect","Tera Blast","Volt Switch"],"teraTypes":["Flying","Ice"]}]},"screamtail":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Disable","Encore","Helping Hand","Howl","Play Rough","Stealth Rock","Thunder Wave"],"teraTypes":["Steel"]}]},"fluttermane":{"level":73,"sets":[{"role":"Offensive Protect","movepool":["Dazzling Gleam","Moonblast","Protect","Shadow Ball"],"teraTypes":["Fairy"]},{"role":"Choice Item user","movepool":["Dazzling Gleam","Moonblast","Mystical Fire","Shadow Ball"],"teraTypes":["Fairy"]}]},"slitherwing":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","First Impression","Flare Blitz","U-turn","Wild Charge"],"teraTypes":["Bug","Electric","Fighting","Fire"]}]},"roaringmoon":{"level":76,"sets":[{"role":"Doubles Fast Attacker","movepool":["Acrobatics","Breaking Swipe","Knock Off","Protect","Tailwind"],"teraTypes":["Flying"]},{"role":"Doubles Setup Sweeper","movepool":["Dragon Claw","Dragon Dance","Knock Off","Protect"],"teraTypes":["Dark","Fire"]}]},"irontreads":{"level":80,"sets":[{"role":"Doubles Bulky Attacker","movepool":["High Horsepower","Iron Head","Knock Off","Rapid Spin","Stealth Rock","Stone Edge"],"teraTypes":["Fire","Ground","Steel"]}]},"ironmoth":{"level":78,"sets":[{"role":"Offensive Protect","movepool":["Energy Ball","Fiery Dance","Heat Wave","Protect","Sludge Wave"],"teraTypes":["Fire","Grass"]},{"role":"Doubles Bulky Attacker","movepool":["Acid Spray","Energy Ball","Heat Wave","Protect"],"teraTypes":["Poison"]}]},"ironhands":{"level":77,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Drain Punch","Fake Out","Ice Punch","Volt Switch","Wild Charge"],"teraTypes":["Electric","Fire"]},{"role":"Bulky Protect","movepool":["Drain Punch","Protect","Swords Dance","Thunder Punch"],"teraTypes":["Fire"]}]},"ironjugulis":{"level":79,"sets":[{"role":"Doubles Fast Attacker","movepool":["Dark Pulse","Earth Power","Hurricane","Protect","Tailwind","Taunt"],"teraTypes":["Flying","Ground","Steel"]}]},"ironthorns":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Electroweb","High Horsepower","Protect","Rock Slide","Stealth Rock","Thunder Punch","Thunder Wave","Volt Switch"],"teraTypes":["Flying","Grass"]},{"role":"Doubles Setup Sweeper","movepool":["Dragon Dance","High Horsepower","Ice Punch","Protect","Rock Slide","Wild Charge"],"teraTypes":["Grass","Rock"]}]},"ironbundle":{"level":78,"sets":[{"role":"Doubles Fast Attacker","movepool":["Encore","Freeze-Dry","Hydro Pump","Icy Wind","Protect"],"teraTypes":["Dragon","Water"]}]},"ironvaliant":{"level":79,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Dazzling Gleam","Encore","Knock Off","Moonblast","Protect"],"teraTypes":["Dark","Fairy","Fighting"]}]},"baxcalibur":{"level":78,"sets":[{"role":"Choice Item user","movepool":["Glaive Rush","High Horsepower","Ice Shard","Icicle Crash"],"teraTypes":["Dragon","Ground"]},{"role":"Doubles Setup Sweeper","movepool":["Icicle Spear","Protect","Scale Shot","Swords Dance"],"teraTypes":["Dragon","Steel"]}]},"gholdengo":{"level":78,"sets":[{"role":"Choice Item user","movepool":["Dazzling Gleam","Focus Blast","Make It Rain","Psychic","Shadow Ball","Thunderbolt","Trick"],"teraTypes":["Fairy","Steel"]},{"role":"Doubles Bulky Setup","movepool":["Make It Rain","Nasty Plot","Protect","Shadow Ball"],"teraTypes":["Steel","Water"]}]},"tinglu":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Protect","Ruination","Spikes","Stealth Rock","Stomping Tantrum","Throat Chop"],"teraTypes":["Fairy","Water"]}]},"chienpao":{"level":76,"sets":[{"role":"Offensive Protect","movepool":["Icicle Crash","Lash Out","Protect","Sucker Punch","Throat Chop"],"teraTypes":["Dark","Ghost"]},{"role":"Doubles Wallbreaker","movepool":["Icicle Crash","Protect","Sacred Sword","Sucker Punch"],"teraTypes":["Fighting","Ghost"]}]},"wochien":{"level":85,"sets":[{"role":"Bulky Protect","movepool":["Knock Off","Leech Seed","Pollen Puff","Protect","Ruination"],"teraTypes":["Poison"]}]},"chiyu":{"level":75,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dark Pulse","Heat Wave","Nasty Plot","Protect"],"teraTypes":["Dark","Fire","Water"]},{"role":"Choice Item user","movepool":["Dark Pulse","Heat Wave","Overheat","Snarl"],"teraTypes":["Fire","Water"]}]},"koraidon":{"level":67,"sets":[{"role":"Choice Item user","movepool":["Collision Course","Dragon Claw","Flare Blitz","U-turn"],"teraTypes":["Fire"]}]},"miraidon":{"level":65,"sets":[{"role":"Offensive Protect","movepool":["Draco Meteor","Dragon Pulse","Electro Drift","Overheat","Protect","Volt Switch"],"teraTypes":["Electric"]},{"role":"Choice Item user","movepool":["Draco Meteor","Electro Drift","Overheat","Volt Switch"],"teraTypes":["Electric"]}]},"walkingwake":{"level":77,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Flamethrower","Flip Turn","Hydro Pump","Protect"],"teraTypes":["Fire"]}]},"ironleaves":{"level":81,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Leaf Blade","Protect","Swords Dance"],"teraTypes":["Fighting","Fire","Poison"]},{"role":"Doubles Wallbreaker","movepool":["Close Combat","Leaf Blade","Psyblade","Wild Charge"],"teraTypes":["Fighting","Fire","Psychic"]}]},"dipplin":{"level":90,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Dragon Pulse","Pollen Puff","Recover","Syrup Bomb"],"teraTypes":["Steel"]}]},"sinistcha":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Matcha Gotcha","Rage Powder","Shadow Ball","Trick Room"],"teraTypes":["Grass","Water"]},{"role":"Bulky Protect","movepool":["Calm Mind","Matcha Gotcha","Protect","Shadow Ball"],"teraTypes":["Grass","Water"]}]},"okidogi":{"level":78,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Bulk Up","Drain Punch","Gunk Shot","Knock Off","Snarl"],"teraTypes":["Dark"]}]},"munkidori":{"level":80,"sets":[{"role":"Doubles Fast Attacker","movepool":["Focus Blast","Protect","Psyshock","Sludge Bomb","U-turn"],"teraTypes":["Fighting","Poison"]},{"role":"Doubles Support","movepool":["Fake Out","Focus Blast","Psyshock","Sludge Bomb","U-turn"],"teraTypes":["Fighting","Poison"]}]},"fezandipiti":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Gunk Shot","Icy Wind","Play Rough","Roost"],"teraTypes":["Dark","Steel","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Gunk Shot","Icy Wind","Play Rough","U-turn"],"teraTypes":["Dark","Steel","Water"]}]},"ogerpon":{"level":78,"sets":[{"role":"Doubles Wallbreaker","movepool":["Ivy Cudgel","Knock Off","Spiky Shield","Superpower","U-turn"],"teraTypes":["Grass"]},{"role":"Doubles Support","movepool":["Follow Me","Horn Leech","Knock Off","Spiky Shield"],"teraTypes":["Grass"]}]},"ogerponwellspring":{"level":76,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Horn Leech","Ivy Cudgel","Spiky Shield"],"teraTypes":["Water"]},{"role":"Doubles Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Power Whip","Spiky Shield","Swords Dance"],"teraTypes":["Water"]}]},"ogerponhearthflame":{"level":74,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Horn Leech","Ivy Cudgel","Spiky Shield"],"teraTypes":["Fire"]},{"role":"Doubles Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Power Whip","Spiky Shield","Swords Dance"],"teraTypes":["Fire"]}]},"ogerponcornerstone":{"level":75,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Horn Leech","Ivy Cudgel","Spiky Shield"],"teraTypes":["Rock"]},{"role":"Doubles Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Power Whip","Spiky Shield","Swords Dance"],"teraTypes":["Rock"]}]},"archaludon":{"level":77,"sets":[{"role":"Offensive Protect","movepool":["Dragon Pulse","Electro Shot","Flash Cannon","Protect"],"teraTypes":["Fairy","Flying"]},{"role":"Doubles Bulky Attacker","movepool":["Body Press","Draco Meteor","Dragon Pulse","Flash Cannon","Snarl"],"teraTypes":["Fairy","Fighting","Flying"]},{"role":"Doubles Wallbreaker","movepool":["Aura Sphere","Draco Meteor","Flash Cannon","Thunderbolt"],"teraTypes":["Dragon","Electric","Fairy","Fighting","Flying"]}]},"hydrapple":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Earth Power","Fickle Beam","Leaf Storm","Pollen Puff","Protect"],"teraTypes":["Steel"]}]},"gougingfire":{"level":75,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Burning Bulwark","Dragon Claw","Dragon Dance","Heat Crash"],"teraTypes":["Fire"]}]},"ragingbolt":{"level":78,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Protect","Thunderbolt","Thunderclap"],"teraTypes":["Electric","Fairy","Grass"]},{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Electroweb","Snarl","Thunderbolt","Thunderclap"],"teraTypes":["Electric","Fairy","Grass"]},{"role":"Bulky Protect","movepool":["Calm Mind","Dragon Pulse","Protect","Thunderclap"],"teraTypes":["Electric","Fairy","Grass"]}]},"ironboulder":{"level":78,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Mighty Cleave","Protect","Swords Dance","Zen Headbutt"],"teraTypes":["Fighting"]}]},"ironcrown":{"level":78,"sets":[{"role":"Offensive Protect","movepool":["Focus Blast","Protect","Psychic","Psyshock","Tachyon Cutter"],"teraTypes":["Fighting","Water"]},{"role":"Doubles Wallbreaker","movepool":["Focus Blast","Psychic","Psyshock","Tachyon Cutter","Volt Switch"],"teraTypes":["Fighting","Water"]},{"role":"Doubles Bulky Setup","movepool":["Agility","Focus Blast","Protect","Psychic","Psyshock","Tachyon Cutter"],"teraTypes":["Fighting","Psychic","Steel"]}]},"terapagos":{"level":73,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Earth Power","Protect","Tera Starstorm"],"teraTypes":["Stellar"]},{"role":"Doubles Wallbreaker","movepool":["Dark Pulse","Earth Power","Tera Starstorm","Tri Attack"],"teraTypes":["Stellar"]},{"role":"Doubles Setup Sweeper","movepool":["Dark Pulse","Meteor Beam","Protect","Tera Starstorm"],"teraTypes":["Stellar"]}]},"pecharunt":{"level":77,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Malignant Chain","Nasty Plot","Protect","Recover","Shadow Ball"],"teraTypes":["Dark"]},{"role":"Doubles Bulky Attacker","movepool":["Malignant Chain","Parting Shot","Poison Gas","Protect","Shadow Ball"],"teraTypes":["Dark"]}]}} as any;
/* eslint-enable */

export interface TeamData {
	typeCount: {[k: string]: number};
	typeComboCount: {[k: string]: number};
	baseFormes: {[k: string]: number};
	megaCount?: number;
	zCount?: number;
	has: {[k: string]: number};
	forceResult: boolean;
	weaknesses: {[k: string]: number};
	resistances: {[k: string]: number};
	weather?: string;
	eeveeLimCount?: number;
	gigantamax?: boolean;
}
export interface BattleFactorySpecies {
	flags: {limEevee?: 1};
	sets: BattleFactorySet[];
}
interface BattleFactorySet {
	species: string;
	item: string;
	ability: string;
	nature: string;
	moves: string[];
	evs?: Partial<StatsTable>;
	ivs?: Partial<StatsTable>;
}
export class MoveCounter extends Utils.Multiset<string> {
	damagingMoves: Set<Move>;
	ironFist: number;

	constructor() {
		super();
		this.damagingMoves = new Set();
		this.ironFist = 0;
	}

	get(key: string): number {
		return super.get(key) || 0;
	}
}

type MoveEnforcementChecker = (
	movePool: string[], moves: Set<string>, abilities: Set<string>, types: string[],
	counter: MoveCounter, species: Species, teamDetails: RandomTeamsTypes.TeamDetails,
	isLead: boolean, isDoubles: boolean, teraType: string, role: RandomTeamsTypes.Role,
) => boolean;

// Moves that restore HP:
const RECOVERY_MOVES = [
	'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'roost', 'shoreup', 'slackoff', 'softboiled', 'strengthsap', 'synthesis',
];
// Moves that drop stats:
const CONTRARY_MOVES = [
	'armorcannon', 'closecombat', 'leafstorm', 'makeitrain', 'overheat', 'spinout', 'superpower', 'vcreate',
];
// Moves that boost Attack:
const PHYSICAL_SETUP = [
	'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'meditate', 'poweruppunch', 'swordsdance', 'tidyup', 'victorydance',
];
// Moves which boost Special Attack:
const SPECIAL_SETUP = [
	'calmmind', 'chargebeam', 'geomancy', 'nastyplot', 'quiverdance', 'tailglow', 'torchsong',
];
// Moves that boost Attack AND Special Attack:
const MIXED_SETUP = [
	'clangoroussoul', 'growth', 'happyhour', 'holdhands', 'noretreat', 'shellsmash', 'workup',
];
// Some moves that only boost Speed:
const SPEED_SETUP = [
	'agility', 'autotomize', 'flamecharge', 'rockpolish', 'trailblaze',
];
// Conglomerate for ease of access
const SETUP = [
	'acidarmor', 'agility', 'autotomize', 'bellydrum', 'bulkup', 'calmmind', 'clangoroussoul', 'coil', 'cosmicpower', 'curse',
	'dragondance', 'flamecharge', 'growth', 'honeclaws', 'howl', 'irondefense', 'meditate', 'nastyplot', 'noretreat', 'poweruppunch',
	'quiverdance', 'rockpolish', 'shellsmash', 'shiftgear', 'swordsdance', 'tailglow', 'tidyup', 'trailblaze', 'workup', 'victorydance',
];
const SPEED_CONTROL = [
	'electroweb', 'glare', 'icywind', 'lowsweep', 'quash', 'stringshot', 'tailwind', 'thunderwave', 'trickroom',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'accelerock', 'aquajet', 'bounce', 'breakingswipe', 'bulletpunch', 'chatter', 'chloroblast', 'clearsmog', 'covet',
	'dragontail', 'doomdesire', 'electroweb', 'eruption', 'explosion', 'fakeout', 'feint', 'flamecharge', 'flipturn', 'futuresight',
	'grassyglide', 'iceshard', 'icywind', 'incinerate', 'infestation', 'machpunch', 'meteorbeam', 'mortalspin', 'nuzzle', 'pluck', 'pursuit',
	'quickattack', 'rapidspin', 'reversal', 'selfdestruct', 'shadowsneak', 'skydrop', 'snarl', 'strugglebug', 'suckerpunch', 'uturn',
	'vacuumwave', 'voltswitch', 'watershuriken', 'waterspout',
];
// Hazard-setting moves
const HAZARDS = [
	'spikes', 'stealthrock', 'stickyweb', 'toxicspikes',
];
// Protect and its variants
const PROTECT_MOVES = [
	'banefulbunker', 'burningbulwark', 'protect', 'silktrap', 'spikyshield',
];
// Moves that switch the user out
const PIVOT_MOVES = [
	'chillyreception', 'flipturn', 'partingshot', 'shedtail', 'teleport', 'uturn', 'voltswitch',
];

// Moves that should be paired together when possible
const MOVE_PAIRS = [
	['lightscreen', 'reflect'],
	['sleeptalk', 'rest'],
	['protect', 'wish'],
	['leechseed', 'protect'],
	['leechseed', 'substitute'],
];

/** Pokemon who always want priority STAB, and are fine with it as its only STAB move of that type */
const PRIORITY_POKEMON = [
	'breloom', 'brutebonnet', 'cacturne', 'honchkrow', 'mimikyu', 'ragingbolt', 'scizor',
];

/** Pokemon who should never be in the lead slot */
const NO_LEAD_POKEMON = [
	'Zacian', 'Zamazenta',
];
const DOUBLES_NO_LEAD_POKEMON = [
	'Basculegion', 'Houndstone', 'Roaring Moon', 'Zacian', 'Zamazenta',
];

const DEFENSIVE_TERA_BLAST_USERS = [
	'alcremie', 'bellossom', 'comfey', 'fezandipiti', 'florges',
];

function sereneGraceBenefits(move: Move) {
	return move.secondary?.chance && move.secondary.chance > 20 && move.secondary.chance < 100;
}

export class RandomTeams {
	dex: ModdedDex;
	gen: number;
	factoryTier: string;
	format: Format;
	prng: PRNG;
	noStab: string[];
	readonly maxTeamSize: number;
	readonly adjustLevel: number | null;
	readonly maxMoveCount: number;
	readonly forceMonotype: string | undefined;
	readonly forceTeraType: string | undefined;

	/**
	 * Checkers for move enforcement based on types or other factors
	 *
	 * returns true to try to force the move type, false otherwise.
	 */
	moveEnforcementCheckers: {[k: string]: MoveEnforcementChecker};

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		this.dex = dex;
		this.gen = this.dex.gen;
		this.noStab = NO_STAB;

		const ruleTable = this.dex.formats.getRuleTable(format);
		this.maxTeamSize = ruleTable.maxTeamSize;
		this.adjustLevel = ruleTable.adjustLevel;
		this.maxMoveCount = ruleTable.maxMoveCount;
		const forceMonotype = ruleTable.valueRules.get('forcemonotype');
		this.forceMonotype = forceMonotype && this.dex.types.get(forceMonotype).exists ?
			this.dex.types.get(forceMonotype).name : undefined;
		const forceTeraType = ruleTable.valueRules.get('forceteratype');
		this.forceTeraType = forceTeraType && this.dex.types.get(forceTeraType).exists ?
			this.dex.types.get(forceTeraType).name : undefined;

		this.factoryTier = '';
		this.format = format;
		this.prng = prng && !Array.isArray(prng) ? prng : new PRNG(prng);

		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter) => (
				movePool.includes('megahorn') || movePool.includes('xscissor') ||
				(!counter.get('Bug') && types.includes('Electric'))
			),
			Dark: (
				movePool, moves, abilities, types, counter, species, teamDetails, isLead, isDoubles, teraType, role
			) => {
				if (
					counter.get('Dark') < 2 && PRIORITY_POKEMON.includes(species.id) && role === 'Wallbreaker'
				) return true;
				return !counter.get('Dark');
			},
			Dragon: (movePool, moves, abilities, types, counter) => !counter.get('Dragon'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fairy: (movePool, moves, abilities, types, counter) => !counter.get('Fairy'),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting'),
			Fire: (movePool, moves, abilities, types, counter, species) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter) => !counter.get('Flying'),
			Ghost: (movePool, moves, abilities, types, counter) => !counter.get('Ghost'),
			Grass: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Grass') && (
					movePool.includes('leafstorm') || species.baseStats.atk >= 100 ||
					types.includes('Electric') || abilities.has('Seed Sower')
				)
			),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => (
				movePool.includes('freezedry') || movePool.includes('blizzard') || !counter.get('Ice')
			),
			Normal: (movePool, moves, types, counter) => (movePool.includes('boomburst') || movePool.includes('hypervoice')),
			Poison: (movePool, moves, abilities, types, counter) => {
				if (types.includes('Ground')) return false;
				return !counter.get('Poison');
			},
			Psychic: (movePool, moves, abilities, types, counter, species, teamDetails, isLead, isDoubles) => {
				if (counter.get('Psychic')) return false;
				if (movePool.includes('calmmind') || abilities.has('Strong Jaw')) return true;
				if (isDoubles && movePool.includes('psychicfangs')) return true;
				return abilities.has('Psychic Surge') || ['Electric', 'Fighting', 'Fire', 'Grass', 'Poison'].some(m => types.includes(m));
			},
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock') && species.baseStats.atk >= 80,
			Steel: (movePool, moves, abilities, types, counter, species, teamDetails, isLead, isDoubles) => (
				!counter.get('Steel') &&
				(isDoubles || species.baseStats.atk >= 90 || movePool.includes('gigatonhammer') || movePool.includes('makeitrain'))
			),
			Water: (movePool, moves, abilities, types, counter) => (!counter.get('Water') && !types.includes('Ground')),
		};
	}

	setSeed(prng?: PRNG | PRNGSeed) {
		this.prng = prng && !Array.isArray(prng) ? prng : new PRNG(prng);
	}

	getTeam(options?: PlayerOptions | null): PokemonSet[] {
		const generatorName = (
			typeof this.format.team === 'string' && this.format.team.startsWith('random')
		 ) ? this.format.team + 'Team' : '';
		// @ts-ignore
		return this[generatorName || 'randomTeam'](options);
	}

	randomChance(numerator: number, denominator: number) {
		return this.prng.randomChance(numerator, denominator);
	}

	sample<T>(items: readonly T[]): T {
		return this.prng.sample(items);
	}

	sampleIfArray<T>(item: T | T[]): T {
		if (Array.isArray(item)) {
			return this.sample(item);
		}
		return item;
	}

	random(m?: number, n?: number) {
		return this.prng.next(m, n);
	}

	/**
	 * Remove an element from an unsorted array significantly faster
	 * than .splice
	 */
	fastPop(list: any[], index: number) {
		// If an array doesn't need to be in order, replacing the
		// element at the given index with the removed element
		// is much, much faster than using list.splice(index, 1).
		const length = list.length;
		if (index < 0 || index >= list.length) {
			// sanity check
			throw new Error(`Index ${index} out of bounds for given array`);
		}

		const element = list[index];
		list[index] = list[length - 1];
		list.pop();
		return element;
	}

	/**
	 * Remove a random element from an unsorted array and return it.
	 * Uses the battle's RNG if in a battle.
	 */
	sampleNoReplace(list: any[]) {
		const length = list.length;
		if (length === 0) return null;
		const index = this.random(length);
		return this.fastPop(list, index);
	}

	/**
	 * Removes n random elements from an unsorted array and returns them.
	 * If n is less than the array's length, randomly removes and returns all the elements
	 * in the array (so the returned array could have length < n).
	 */
	multipleSamplesNoReplace<T>(list: T[], n: number): T[] {
		const samples = [];
		while (samples.length < n && list.length) {
			samples.push(this.sampleNoReplace(list));
		}

		return samples;
	}

	/**
	 * Check if user has directly tried to ban/unban/restrict things in a custom battle.
	 * Doesn't count bans nested inside other formats/rules.
	 */
	private hasDirectCustomBanlistChanges() {
		if (this.format.banlist.length || this.format.restricted.length || this.format.unbanlist.length) return true;
		if (!this.format.customRules) return false;
		for (const rule of this.format.customRules) {
			for (const banlistOperator of ['-', '+', '*']) {
				if (rule.startsWith(banlistOperator)) return true;
			}
		}
		return false;
	}

	/**
	 * Inform user when custom bans are unsupported in a team generator.
	 */
	protected enforceNoDirectCustomBanlistChanges() {
		if (this.hasDirectCustomBanlistChanges()) {
			throw new Error(`Custom bans are not currently supported in ${this.format.name}.`);
		}
	}

	/**
	 * Inform user when complex bans are unsupported in a team generator.
	 */
	protected enforceNoDirectComplexBans() {
		if (!this.format.customRules) return false;
		for (const rule of this.format.customRules) {
			if (rule.includes('+') && !rule.startsWith('+')) {
				throw new Error(`Complex bans are not currently supported in ${this.format.name}.`);
			}
		}
	}

	/**
	 * Validate set element pool size is sufficient to support size requirements after simple bans.
	 */
	private enforceCustomPoolSizeNoComplexBans(
		effectTypeName: string,
		basicEffectPool: BasicEffect[],
		requiredCount: number,
		requiredCountExplanation: string
	) {
		if (basicEffectPool.length >= requiredCount) return;
		throw new Error(`Legal ${effectTypeName} count is insufficient to support ${requiredCountExplanation} (${basicEffectPool.length} / ${requiredCount}).`);
	}

	queryMoves(
		moves: Set<string> | null,
		species: Species,
		teraType: string,
		abilities: Set<string> = new Set(),
	): MoveCounter {
		// This is primarily a helper function for random setbuilder functions.
		const counter = new MoveCounter();
		const types = species.types;
		if (!moves?.size) return counter;

		const categories = {Physical: 0, Special: 0, Status: 0};

		// Iterate through all moves we've chosen so far and keep track of what they do:
		for (const moveid of moves) {
			const move = this.dex.moves.get(moveid);

			const moveType = this.getMoveType(move, species, abilities, teraType);
			if (move.damage || move.damageCallback) {
				// Moves that do a set amount of damage:
				counter.add('damage');
				counter.damagingMoves.add(move);
			} else {
				// Are Physical/Special/Status moves:
				categories[move.category]++;
			}
			// Moves that have a low base power:
			if (moveid === 'lowkick' || (move.basePower && move.basePower <= 60 && moveid !== 'rapidspin')) {
				counter.add('technician');
			}
			// Moves that hit up to 5 times:
			if (move.multihit && Array.isArray(move.multihit) && move.multihit[1] === 5) counter.add('skilllink');
			if (move.recoil || move.hasCrashDamage) counter.add('recoil');
			if (move.drain) counter.add('drain');
			// Moves which have a base power:
			if (move.basePower || move.basePowerCallback) {
				if (!this.noStab.includes(moveid) || PRIORITY_POKEMON.includes(species.id) && move.priority > 0) {
					counter.add(moveType);
					if (types.includes(moveType)) counter.add('stab');
					if (teraType === moveType) counter.add('stabtera');
					counter.damagingMoves.add(move);
				}
				if (move.flags['bite']) counter.add('strongjaw');
				if (move.flags['punch']) counter.ironFist++;
				if (move.flags['sound']) counter.add('sound');
				if (move.priority > 0 || (moveid === 'grassyglide' && abilities.has('Grassy Surge'))) {
					counter.add('priority');
				}
			}
			// Moves with secondary effects:
			if (move.secondary || move.hasSheerForce) {
				counter.add('sheerforce');
				if (sereneGraceBenefits(move)) {
					counter.add('serenegrace');
				}
			}
			// Moves with low accuracy:
			if (move.accuracy && move.accuracy !== true && move.accuracy < 90) counter.add('inaccurate');

			// Moves that change stats:
			if (RECOVERY_MOVES.includes(moveid)) counter.add('recovery');
			if (CONTRARY_MOVES.includes(moveid)) counter.add('contrary');
			if (PHYSICAL_SETUP.includes(moveid)) counter.add('physicalsetup');
			if (SPECIAL_SETUP.includes(moveid)) counter.add('specialsetup');
			if (MIXED_SETUP.includes(moveid)) counter.add('mixedsetup');
			if (SPEED_SETUP.includes(moveid)) counter.add('speedsetup');
			if (SETUP.includes(moveid)) counter.add('setup');
			if (HAZARDS.includes(moveid)) counter.add('hazards');
		}

		counter.set('Physical', Math.floor(categories['Physical']));
		counter.set('Special', Math.floor(categories['Special']));
		counter.set('Status', categories['Status']);
		return counter;
	}

	cullMovePool(
		types: string[],
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	): void {
		if (moves.size + movePool.length <= this.maxMoveCount) return;
		// If we have two unfilled moves and only one unpaired move, cull the unpaired move.
		if (moves.size === this.maxMoveCount - 2) {
			const unpairedMoves = [...movePool];
			for (const pair of MOVE_PAIRS) {
				if (movePool.includes(pair[0]) && movePool.includes(pair[1])) {
					this.fastPop(unpairedMoves, unpairedMoves.indexOf(pair[0]));
					this.fastPop(unpairedMoves, unpairedMoves.indexOf(pair[1]));
				}
			}
			if (unpairedMoves.length === 1) {
				this.fastPop(movePool, movePool.indexOf(unpairedMoves[0]));
			}
		}

		// These moves are paired, and shouldn't appear if there is not room for them both.
		if (moves.size === this.maxMoveCount - 1) {
			for (const pair of MOVE_PAIRS) {
				if (movePool.includes(pair[0]) && movePool.includes(pair[1])) {
					this.fastPop(movePool, movePool.indexOf(pair[0]));
					this.fastPop(movePool, movePool.indexOf(pair[1]));
				}
			}
		}

		// Develop additional move lists
		const statusMoves = this.dex.moves.all()
			.filter(move => move.category === 'Status')
			.map(move => move.id);

		// Team-based move culls
		if (teamDetails.screens && movePool.length >= this.maxMoveCount + 2) {
			if (movePool.includes('reflect')) this.fastPop(movePool, movePool.indexOf('reflect'));
			if (movePool.includes('lightscreen')) this.fastPop(movePool, movePool.indexOf('lightscreen'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.stickyWeb) {
			if (movePool.includes('stickyweb')) this.fastPop(movePool, movePool.indexOf('stickyweb'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.stealthRock) {
			if (movePool.includes('stealthrock')) this.fastPop(movePool, movePool.indexOf('stealthrock'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.defog || teamDetails.rapidSpin) {
			if (movePool.includes('defog')) this.fastPop(movePool, movePool.indexOf('defog'));
			if (movePool.includes('rapidspin')) this.fastPop(movePool, movePool.indexOf('rapidspin'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.toxicSpikes) {
			if (movePool.includes('toxicspikes')) this.fastPop(movePool, movePool.indexOf('toxicspikes'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.spikes && teamDetails.spikes >= 2) {
			if (movePool.includes('spikes')) this.fastPop(movePool, movePool.indexOf('spikes'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}

		if (isDoubles) {
			const doublesIncompatiblePairs = [
				// In order of decreasing generalizability
				[SPEED_CONTROL, SPEED_CONTROL],
				[HAZARDS, HAZARDS],
				['rockslide', 'stoneedge'],
				[SETUP, ['fakeout', 'helpinghand']],
				[PROTECT_MOVES, 'wideguard'],
				[['fierydance', 'fireblast'], 'heatwave'],
				['dazzlinggleam', ['fleurcannon', 'moonblast']],
				['poisongas', ['toxicspikes', 'willowisp']],
				[RECOVERY_MOVES, 'healpulse'],
				['lifedew', 'healpulse'],
				['haze', 'icywind'],
				[['hydropump', 'muddywater'], ['muddywater', 'scald']],
				['disable', 'encore'],
				['freezedry', 'icebeam'],
				['energyball', 'leafstorm'],
				['wildcharge', 'thunderbolt'],
				['earthpower', 'sandsearstorm'],
				['coaching', ['helpinghand', 'howl']],
			];

			for (const pair of doublesIncompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

			if (role !== 'Offensive Protect') this.incompatibleMoves(moves, movePool, PROTECT_MOVES, ['flipturn', 'uturn']);
		}

		// General incompatibilities
		const incompatiblePairs = [
			// These moves don't mesh well with other aspects of the set
			[statusMoves, ['healingwish', 'switcheroo', 'trick']],
			[SETUP, PIVOT_MOVES],
			[SETUP, HAZARDS],
			[SETUP, ['defog', 'nuzzle', 'toxic', 'yawn', 'haze']],
			[PHYSICAL_SETUP, PHYSICAL_SETUP],
			[SPECIAL_SETUP, 'thunderwave'],
			['substitute', PIVOT_MOVES],
			[SPEED_SETUP, ['aquajet', 'rest', 'trickroom']],
			['curse', ['irondefense', 'rapidspin']],
			['dragondance', 'dracometeor'],

			// These attacks are redundant with each other
			[['psychic', 'psychicnoise'], ['psyshock', 'psychicnoise']],
			['surf', 'hydropump'],
			['liquidation', 'wavecrash'],
			['aquajet', 'flipturn'],
			['gigadrain', 'leafstorm'],
			['powerwhip', 'hornleech'],
			[['airslash', 'bravebird', 'hurricane'], ['airslash', 'bravebird', 'hurricane']],
			['knockoff', 'foulplay'],
			['throatchop', ['crunch', 'lashout']],
			['doubleedge', ['bodyslam', 'headbutt']],
			['fireblast', ['fierydance', 'flamethrower']],
			['lavaplume', 'magmastorm'],
			['thunderpunch', 'wildcharge'],
			['gunkshot', ['direclaw', 'poisonjab', 'sludgebomb']],
			['aurasphere', 'focusblast'],
			['closecombat', 'drainpunch'],
			['bugbite', 'pounce'],
			[['dragonpulse', 'spacialrend'], 'dracometeor'],
			['heavyslam', 'flashcannon'],
			['alluringvoice', 'dazzlinggleam'],

			// These status moves are redundant with each other
			['taunt', 'disable'],
			[['thunderwave', 'toxic'], ['thunderwave', 'willowisp']],
			[['thunderwave', 'toxic', 'willowisp'], 'toxicspikes'],

			// This space reserved for assorted hardcodes that otherwise make little sense out of context
			// Landorus and Thundurus
			['nastyplot', ['rockslide', 'knockoff']],
			// Persian
			['switcheroo', 'fakeout'],
			// Beartic
			['snowscape', 'swordsdance'],
			// Amoonguss, though this can work well as a general rule later
			['toxic', 'clearsmog'],
			// Chansey and Blissey
			['healbell', 'stealthrock'],
			// Azelf and Zoroarks
			['trick', 'uturn'],
			// Araquanid
			['mirrorcoat', 'hydropump'],
			// Brute Bonnet
			['bulletseed', 'seedbomb'],
		];

		for (const pair of incompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

		if (!types.includes('Ice')) this.incompatibleMoves(moves, movePool, 'icebeam', 'icywind');

		if (!isDoubles) this.incompatibleMoves(moves, movePool, ['taunt', 'strengthsap'], 'encore');

		if (!types.includes('Dark') && teraType !== 'Dark') this.incompatibleMoves(moves, movePool, 'knockoff', 'suckerpunch');

		if (!abilities.has('Prankster')) this.incompatibleMoves(moves, movePool, 'thunderwave', 'yawn');

		// This space reserved for assorted hardcodes that otherwise make little sense out of context
		if (species.id === 'cyclizar') this.incompatibleMoves(moves, movePool, 'taunt', 'knockoff');
		if (species.id === 'mesprit') this.incompatibleMoves(moves, movePool, 'healingwish', 'uturn');
		if (species.id === 'camerupt') this.incompatibleMoves(moves, movePool, 'roar', 'willowisp');
		if (species.id === 'coalossal') this.incompatibleMoves(moves, movePool, 'flamethrower', 'overheat');
	}

	// Checks for and removes incompatible moves, starting with the first move in movesA.
	incompatibleMoves(
		moves: Set<string>,
		movePool: string[],
		movesA: string | string[],
		movesB: string | string[],
	): void {
		const moveArrayA = (Array.isArray(movesA)) ? movesA : [movesA];
		const moveArrayB = (Array.isArray(movesB)) ? movesB : [movesB];
		if (moves.size + movePool.length <= this.maxMoveCount) return;
		for (const moveid1 of moves) {
			if (moveArrayB.includes(moveid1)) {
				for (const moveid2 of moveArrayA) {
					if (moveid1 !== moveid2 && movePool.includes(moveid2)) {
						this.fastPop(movePool, movePool.indexOf(moveid2));
						if (moves.size + movePool.length <= this.maxMoveCount) return;
					}
				}
			}
			if (moveArrayA.includes(moveid1)) {
				for (const moveid2 of moveArrayB) {
					if (moveid1 !== moveid2 && movePool.includes(moveid2)) {
						this.fastPop(movePool, movePool.indexOf(moveid2));
						if (moves.size + movePool.length <= this.maxMoveCount) return;
					}
				}
			}
		}
	}

	// Adds a move to the moveset, returns the MoveCounter
	addMove(
		move: string,
		moves: Set<string>,
		types: string[],
		abilities: Set<string>,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		movePool: string[],
		teraType: string,
		role: RandomTeamsTypes.Role,
	): MoveCounter {
		moves.add(move);
		this.fastPop(movePool, movePool.indexOf(move));
		const counter = this.queryMoves(moves, species, teraType, abilities);
		this.cullMovePool(types, moves, abilities, counter, movePool, teamDetails, species, isLead, isDoubles, teraType, role);
		return counter;
	}

	// Returns the type of a given move for STAB/coverage enforcement purposes
	getMoveType(move: Move, species: Species, abilities: Set<string>, teraType: string): string {
		if (move.id === 'terablast') return teraType;
		if (['judgment', 'revelationdance'].includes(move.id)) return species.types[0];

		if (move.name === "Raging Bull" && species.name.startsWith("Tauros-Paldea")) {
			if (species.name.endsWith("Combat")) return "Fighting";
			if (species.name.endsWith("Blaze")) return "Fire";
			if (species.name.endsWith("Aqua")) return "Water";
		}

		if (move.name === "Ivy Cudgel" && species.name.startsWith("Ogerpon")) {
			if (species.name.endsWith("Wellspring")) return "Water";
			if (species.name.endsWith("Hearthflame")) return "Fire";
			if (species.name.endsWith("Cornerstone")) return "Rock";
		}

		const moveType = move.type;
		if (moveType === 'Normal') {
			if (abilities.has('Aerilate')) return 'Flying';
			if (abilities.has('Galvanize')) return 'Electric';
			if (abilities.has('Pixilate')) return 'Fairy';
			if (abilities.has('Refrigerate')) return 'Ice';
		}
		return moveType;
	}

	// Generate random moveset for a given species, role, tera type.
	randomMoveset(
		types: string[],
		abilities: Set<string>,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		movePool: string[],
		teraType: string,
		role: RandomTeamsTypes.Role,
	): Set<string> {
		const moves = new Set<string>();
		let counter = this.queryMoves(moves, species, teraType, abilities);
		this.cullMovePool(types, moves, abilities, counter, movePool, teamDetails, species, isLead, isDoubles, teraType, role);

		// If there are only four moves, add all moves and return early
		if (movePool.length <= this.maxMoveCount) {
			for (const moveid of movePool) {
				moves.add(moveid);
			}
			return moves;
		}

		const runEnforcementChecker = (checkerName: string) => {
			if (!this.moveEnforcementCheckers[checkerName]) return false;
			return this.moveEnforcementCheckers[checkerName](
				movePool, moves, abilities, types, counter, species, teamDetails, isLead, isDoubles, teraType, role
			);
		};

		if (role === 'Tera Blast user') {
			counter = this.addMove('terablast', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}
		// Add required move (e.g. Relic Song for Meloetta-P)
		if (species.requiredMove) {
			const move = this.dex.moves.get(species.requiredMove).id;
			counter = this.addMove(move, moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}

		// Add other moves you really want to have, e.g. STAB, recovery, setup.

		// Enforce Facade if Guts is a possible ability
		if (movePool.includes('facade') && abilities.has('Guts')) {
			counter = this.addMove('facade', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}

		// Enforce Night Shade, Revelation Dance, Revival Blessing, and Sticky Web
		for (const moveid of ['nightshade', 'revelationdance', 'revivalblessing', 'stickyweb']) {
			if (movePool.includes(moveid)) {
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce Trick Room on Doubles Wallbreaker
		if (movePool.includes('trickroom') && role === 'Doubles Wallbreaker') {
			counter = this.addMove('trickroom', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}

		// Enforce hazard removal on Bulky Support if the team doesn't already have it
		if (role === 'Bulky Support' && !teamDetails.defog && !teamDetails.rapidSpin) {
			if (movePool.includes('rapidspin')) {
				counter = this.addMove('rapidspin', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
			if (movePool.includes('defog')) {
				counter = this.addMove('defog', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce Knock Off on pure Normal- and Fighting-types in singles
		if (!isDoubles && types.length === 1 && (types.includes('Normal') || types.includes('Fighting'))) {
			if (movePool.includes('knockoff')) {
				counter = this.addMove('knockoff', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce Flip Turn on pure Water-type Wallbreakers
		if (types.length === 1 && types.includes('Water') && role === 'Wallbreaker') {
			if (movePool.includes('flipturn')) {
				counter = this.addMove('flipturn', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce Spore on Smeargle
		if (species.id === 'smeargle') {
			if (movePool.includes('spore')) {
				counter = this.addMove('spore', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce moves in doubles
		if (isDoubles) {
			const doublesEnforcedMoves = ['auroraveil', 'mortalspin', 'spore'];
			for (const moveid of doublesEnforcedMoves) {
				if (movePool.includes(moveid)) {
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
			}
			// Enforce Fake Out on slow Pokemon
			if (movePool.includes('fakeout') && species.baseStats.spe <= 50) {
				counter = this.addMove('fakeout', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
			// Enforce Tailwind on Prankster and Gale Wings users
			if (movePool.includes('tailwind') && (abilities.has('Prankster') || abilities.has('Gale Wings'))) {
				counter = this.addMove('tailwind', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
			// Enforce Thunder Wave on Prankster users as well
			if (movePool.includes('thunderwave') && abilities.has('Prankster')) {
				counter = this.addMove('thunderwave', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce STAB priority
		if (
			['Bulky Attacker', 'Bulky Setup', 'Wallbreaker', 'Doubles Wallbreaker'].includes(role) ||
			PRIORITY_POKEMON.includes(species.id)
		) {
			const priorityMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, teraType);
				if (
					types.includes(moveType) && (move.priority > 0 || (moveid === 'grassyglide' && abilities.has('Grassy Surge'))) &&
					(move.basePower || move.basePowerCallback)
				) {
					priorityMoves.push(moveid);
				}
			}
			if (priorityMoves.length) {
				const moveid = this.sample(priorityMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce STAB
		for (const type of types) {
			// Check if a STAB move of that type should be required
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, teraType);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && type === moveType) {
					stabMoves.push(moveid);
				}
			}
			while (runEnforcementChecker(type)) {
				if (!stabMoves.length) break;
				const moveid = this.sampleNoReplace(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce Tera STAB
		if (!counter.get('stabtera') && !['Bulky Support', 'Doubles Support'].includes(role)) {
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, teraType);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && teraType === moveType) {
					stabMoves.push(moveid);
				}
			}
			if (stabMoves.length) {
				const moveid = this.sample(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// If no STAB move was added, add a STAB move
		if (!counter.get('stab')) {
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, teraType);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && types.includes(moveType)) {
					stabMoves.push(moveid);
				}
			}
			if (stabMoves.length) {
				const moveid = this.sample(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce recovery
		if (['Bulky Support', 'Bulky Attacker', 'Bulky Setup'].includes(role)) {
			const recoveryMoves = movePool.filter(moveid => RECOVERY_MOVES.includes(moveid));
			if (recoveryMoves.length) {
				const moveid = this.sample(recoveryMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce setup
		if (role.includes('Setup') || role === 'Tera Blast user') {
			// First, try to add a non-Speed setup move
			const nonSpeedSetupMoves = movePool.filter(moveid => SETUP.includes(moveid) && !SPEED_SETUP.includes(moveid));
			if (nonSpeedSetupMoves.length) {
				const moveid = this.sample(nonSpeedSetupMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			} else {
				// No non-Speed setup moves, so add any (Speed) setup move
				const setupMoves = movePool.filter(moveid => SETUP.includes(moveid));
				if (setupMoves.length) {
					const moveid = this.sample(setupMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
			}
		}

		// Enforce redirecting moves and Fake Out on Doubles Support
		if (role === 'Doubles Support') {
			for (const moveid of ['fakeout', 'followme', 'ragepowder']) {
				if (movePool.includes(moveid)) {
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
			}
		}

		// Enforce Protect
		if (role.includes('Protect')) {
			const protectMoves = movePool.filter(moveid => PROTECT_MOVES.includes(moveid));
			if (protectMoves.length) {
				const moveid = this.sample(protectMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce a move not on the noSTAB list
		if (!counter.damagingMoves.size) {
			// Choose an attacking move
			const attackingMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				if (!this.noStab.includes(moveid) && (move.category !== 'Status')) attackingMoves.push(moveid);
			}
			if (attackingMoves.length) {
				const moveid = this.sample(attackingMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce coverage move
		if (!['AV Pivot', 'Fast Support', 'Bulky Support', 'Bulky Protect', 'Doubles Support'].includes(role)) {
			if (counter.damagingMoves.size === 1) {
				// Find the type of the current attacking move
				const currentAttackType = counter.damagingMoves.values().next().value.type;
				// Choose an attacking move that is of different type to the current single attack
				const coverageMoves = [];
				for (const moveid of movePool) {
					const move = this.dex.moves.get(moveid);
					const moveType = this.getMoveType(move, species, abilities, teraType);
					if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback)) {
						if (currentAttackType !== moveType) coverageMoves.push(moveid);
					}
				}
				if (coverageMoves.length) {
					const moveid = this.sample(coverageMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
			}
		}

		// Add (moves.size < this.maxMoveCount) as a condition if moves is getting larger than 4 moves.
		// If you want moves to be favored but not required, add something like && this.randomChance(1, 2) to your condition.

		// Choose remaining moves randomly from movepool and add them to moves list:
		while (moves.size < this.maxMoveCount && movePool.length) {
			if (moves.size + movePool.length <= this.maxMoveCount) {
				for (const moveid of movePool) {
					moves.add(moveid);
				}
				break;
			}
			const moveid = this.sample(movePool);
			counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
			for (const pair of MOVE_PAIRS) {
				if (moveid === pair[0] && movePool.includes(pair[1])) {
					counter = this.addMove(pair[1], moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
				if (moveid === pair[1] && movePool.includes(pair[0])) {
					counter = this.addMove(pair[0], moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
			}
		}
		return moves;
	}

	shouldCullAbility(
		ability: string,
		types: string[],
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	): boolean {
		if ([
			'Armor Tail', 'Battle Bond', 'Early Bird', 'Flare Boost', 'Galvanize', 'Gluttony', 'Harvest', 'Hydration', 'Ice Body', 'Immunity',
			'Liquid Voice', 'Marvel Scale', 'Misty Surge', 'Moody', 'Pressure', 'Quick Feet', 'Rain Dish', 'Sand Veil', 'Shed Skin',
			'Sniper', 'Snow Cloak', 'Steadfast', 'Steam Engine', 'Sweet Veil',
		].includes(ability)) return true;

		switch (ability) {
		// Abilities which are primarily useful for certain moves
		case 'Contrary': case 'Serene Grace': case 'Skill Link': case 'Strong Jaw':
			return !counter.get(toID(ability));
		case 'Chlorophyll':
			return (!moves.has('sunnyday') && !teamDetails.sun && species.id !== 'lilligant');
		case 'Cloud Nine':
			return (species.id !== 'golduck');
		case 'Competitive':
			return species.id === 'kilowattrel';
		case 'Compound Eyes': case 'No Guard':
			return !counter.get('inaccurate');
		case 'Cursed Body':
			return abilities.has('Infiltrator');
		case 'Defiant':
			return (!counter.get('Physical') || (abilities.has('Prankster') && (moves.has('thunderwave') || moves.has('taunt'))));
		case 'Flame Body':
			return (species.id === 'magcargo' && moves.has('shellsmash'));
		case 'Flash Fire':
			return (
				['Drought', 'Flame Body', 'Intimidate', 'Rock Head', 'Weak Armor'].some(m => abilities.has(m)) &&
				this.dex.getEffectiveness('Fire', species) < 0
			);
		case 'Guts':
			return (!moves.has('facade') && !moves.has('sleeptalk'));
		case 'Hustle':
			// some of this is just for Delibird in singles/doubles
			return (!counter.get('Physical') || moves.has('fakeout') || moves.has('rapidspin'));
		case 'Insomnia':
			return (role === 'Wallbreaker');
		case 'Intimidate':
			if (abilities.has('Hustle')) return true;
			if (abilities.has('Sheer Force') && !!counter.get('sheerforce')) return true;
			return (abilities.has('Stakeout'));
		case 'Iron Fist':
			return !counter.ironFist || moves.has('dynamicpunch');
		case 'Justified':
			return !counter.get('Physical');
		case 'Libero': case 'Protean':
			return role === 'Offensive Protect' || (species.id === 'meowscarada' && role === 'Fast Attacker');
		case 'Lightning Rod':
			return species.id === 'rhyperior';
		case 'Mold Breaker':
			return (['Sharpness', 'Sheer Force', 'Unburden'].some(m => abilities.has(m)));
		case 'Moxie':
			// AV Pivot part is currently only for Mightyena)
			return (!counter.get('Physical') || moves.has('stealthrock') || role === 'AV Pivot');
		case 'Natural Cure':
			return species.id === 'pawmot';
		case 'Neutralizing Gas':
			return !isDoubles;
		case 'Overcoat':
			return types.includes('Grass');
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Own Tempo':
			return (!isDoubles || (counter.get('Special')) > 1);
		case 'Prankster':
			return (!counter.get('Status') || (species.id === 'grafaiai' && role === 'Setup Sweeper'));
		case 'Reckless':
			return !counter.get('recoil');
		case 'Regenerator':
			return (species.id === 'mienshao' && role === 'Wallbreaker');
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Sand Force': case 'Sand Rush':
			return !teamDetails.sand;
		case 'Sap Sipper':
			return species.id === 'wyrdeer';
		case 'Seed Sower':
			return role === 'Bulky Support';
		case 'Sheer Force':
			const braviaryCase = (species.id === 'braviaryhisui' && (role === 'Wallbreaker' || role === 'Bulky Protect'));
			const abilitiesCase = (abilities.has('Guts') || abilities.has('Sharpness'));
			const movesCase = (moves.has('bellydrum') || moves.has('flamecharge'));
			return (!counter.get('sheerforce') || braviaryCase || abilitiesCase || movesCase);
		case 'Slush Rush':
			return !teamDetails.snow;
		case 'Solar Power':
			return (!teamDetails.sun || !counter.get('Special'));
		case 'Speed Boost':
			return (species.id === 'yanmega' && !moves.has('protect'));
		case 'Sticky Hold':
			return (species.id === 'muk');
		case 'Sturdy':
			return (!!counter.get('recoil') && species.id !== 'skarmory');
		case 'Swarm':
			return (!counter.get('Bug') || !!counter.get('recovery'));
		case 'Swift Swim':
			return (
				abilities.has('Intimidate') || (!moves.has('raindance') && !teamDetails.rain) ||
				(species.id === 'drednaw' && moves.has('crunch'))
			);
		case 'Synchronize':
			return (species.id !== 'umbreon' && species.id !== 'rabsca');
		case 'Technician':
			return (!counter.get('technician') || abilities.has('Punk Rock') || abilities.has('Fur Coat'));
		case 'Tinted Lens':
			const hbraviaryCase = (species.id === 'braviaryhisui' && (role === 'Setup Sweeper' || role === 'Doubles Wallbreaker'));
			const yanmegaCase = (species.id === 'yanmega' && moves.has('protect'));
			return (yanmegaCase || hbraviaryCase || species.id === 'illumise');
		case 'Unburden':
			return (abilities.has('Prankster') || !counter.get('setup') || species.id === 'sceptile');
		case 'Vital Spirit':
			// Magmar and Electabuzz want their contact status abilities in Doubles
			return (species.nfe && isDoubles);
		case 'Volt Absorb':
			if (abilities.has('Iron Fist') && counter.ironFist >= 2) return true;
			return (this.dex.getEffectiveness('Electric', species) < -1);
		case 'Water Absorb':
			return (['lanturn', 'politoed', 'quagsire'].includes(species.id) || moves.has('raindance'));
		case 'Weak Armor':
			return (moves.has('shellsmash') && species.id !== 'magcargo');
		}

		return false;
	}


	getAbility(
		types: string[],
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	): string {
		const abilityData = Array.from(abilities).map(a => this.dex.abilities.get(a));
		Utils.sortBy(abilityData, abil => -abil.rating);

		if (abilityData.length <= 1) return abilityData[0].name;

		// Hard-code abilities here
		if (species.id === 'florges') return 'Flower Veil';
		if (species.id === 'bombirdier' && !counter.get('Rock')) return 'Big Pecks';
		if (species.id === 'scovillain') return 'Chlorophyll';
		if (species.id === 'empoleon') return 'Competitive';
		if (species.id === 'swampert' && !counter.get('Water') && !moves.has('flipturn')) return 'Damp';
		if (species.id === 'thundurus' && (role === 'Offensive Protect' || moves.has('terablast'))) return 'Defiant';
		if (species.id === 'dodrio') return 'Early Bird';
		if (species.id === 'chandelure') return 'Flash Fire';
		if (species.id === 'golemalola' && moves.has('doubleedge')) return 'Galvanize';
		if (abilities.has('Guts') && (moves.has('facade') || moves.has('sleeptalk') || species.id === 'gurdurr')) return 'Guts';
		if (species.id === 'copperajah' && moves.has('heavyslam')) return 'Heavy Metal';
		if (species.id === 'jumpluff') return 'Infiltrator';
		if (species.id === 'toucannon' && !counter.get('skilllink')) return 'Keen Eye';
		if (species.id === 'reuniclus') return 'Magic Guard';
		if (species.id === 'smeargle' && !counter.get('technician')) return 'Own Tempo';
		if (species.id === 'zebstrika') return moves.has('thunderbolt') ? 'Lightning Rod' : 'Sap Sipper';
		if (species.id === 'sandaconda' || (species.id === 'scrafty' && moves.has('rest'))) return 'Shed Skin';
		if (species.id === 'cetitan' && (role === 'Wallbreaker' || isDoubles)) return 'Sheer Force';
		if (species.id === 'charizard' && moves.has('sunnyday')) return 'Solar Power';
		if (species.id === 'dipplin') return 'Sticky Hold';
		if (species.id === 'breloom' || species.id === 'cinccino') return 'Technician';
		if (species.id === 'shiftry' && moves.has('tailwind')) return 'Wind Rider';

		// singles
		if (!isDoubles) {
			if (species.id === 'hypno') return 'Insomnia';
			if (species.id === 'hitmontop') return (role === 'Bulky Setup') ? 'Technician' : 'Intimidate';
			if (species.id === 'staraptor') return 'Reckless';
			if (species.id === 'arcaninehisui') return 'Rock Head';
			if (['raikou', 'suicune', 'vespiquen'].includes(species.id)) return 'Pressure';
			if (species.id === 'enamorus' && moves.has('calmmind')) return 'Cute Charm';
			if (species.id === 'klawf' && role === 'Setup Sweeper') return 'Anger Shell';
			if (abilities.has('Cud Chew') && moves.has('substitute')) return 'Cud Chew';
			if (abilities.has('Harvest') && (moves.has('protect') || moves.has('substitute'))) return 'Harvest';
			if (abilities.has('Serene Grace') && moves.has('headbutt')) return 'Serene Grace';
			if (abilities.has('Own Tempo') && moves.has('petaldance')) return 'Own Tempo';
			if (abilities.has('Slush Rush') && moves.has('snowscape')) return 'Slush Rush';
			if (abilities.has('Soundproof') && (moves.has('substitute') || counter.get('setup'))) return 'Soundproof';
		}

		// doubles, multi, and ffa
		if (isDoubles) {
			if (species.id === 'gumshoos' || species.id === 'porygonz') return 'Adaptability';
			if (species.id === 'farigiraf') return 'Armor Tail';
			if (['carbink', 'dragapult', 'regirock', 'tentacruel'].includes(species.id)) return 'Clear Body';
			if (species.id === 'altaria') return 'Cloud Nine';
			if (species.id === 'kilowattrel' || species.id === 'meowsticf') return 'Competitive';
			if (species.id === 'armarouge' && !moves.has('meteorbeam')) return 'Flash Fire';
			if (species.id === 'talonflame') return 'Gale Wings';
			if (
				['oinkologne', 'oinkolognef', 'snorlax', 'swalot'].includes(species.id) && role !== 'Doubles Wallbreaker'
			) return 'Gluttony';
			if (species.id === 'conkeldurr' && role === 'Doubles Wallbreaker') return 'Guts';
			if (species.id !== 'arboliva' && abilities.has('Harvest')) return 'Harvest';
			if (species.id === 'dragonite' || species.id === 'lucario') return 'Inner Focus';
			if (species.id === 'primarina') return 'Liquid Voice';
			if (species.id === 'kommoo') return 'Soundproof';
			if (
				(species.id === 'flapple' && role === 'Doubles Bulky Attacker') ||
				(species.id === 'appletun' && this.randomChance(1, 2))
			) return 'Ripen';
			if (species.id === 'magnezone') return 'Sturdy';
			if (species.id === 'clefable' && role === 'Doubles Support') return 'Unaware';
			if (['drifblim', 'hitmonlee', 'sceptile'].includes(species.id) && !moves.has('shedtail')) return 'Unburden';
			if (abilities.has('Intimidate')) return 'Intimidate';

			if (this.randomChance(1, 2) && species.id === 'kingambit') return 'Defiant';

			// just doubles and multi
			if (this.format.gameType !== 'freeforall') {
				if (species.id === 'clefairy') return 'Friend Guard';
				if (species.id === 'blissey') return 'Healer';
				if (species.id === 'sinistcha') return 'Hospitality';
				if (species.id === 'duraludon') return 'Stalwart';
				if (species.id === 'barraskewda') return 'Propeller Tail';
				if (species.id === 'oranguru' || abilities.has('Pressure') && abilities.has('Telepathy')) return 'Telepathy';

				if (this.randomChance(1, 2) && species.id === 'mukalola') return 'Power of Alchemy';
			}
		}

		let abilityAllowed: Ability[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilityData) {
			if (ability.rating >= 1 && !this.shouldCullAbility(
				ability.name, types, moves, abilities, counter, teamDetails, species, isLead, isDoubles, teraType, role
			)) {
				abilityAllowed.push(ability);
			}
		}

		// If all abilities are rejected, re-allow all abilities
		if (!abilityAllowed.length) {
			for (const ability of abilityData) {
				if (ability.rating > 0) abilityAllowed.push(ability);
			}
			if (!abilityAllowed.length) abilityAllowed = abilityData;
		}

		if (abilityAllowed.length === 1) return abilityAllowed[0].name;
		// Sort abilities by rating with an element of randomness
		// All three abilities can be chosen
		if (abilityAllowed[2] && abilityAllowed[0].rating - 0.5 <= abilityAllowed[2].rating) {
			if (abilityAllowed[1].rating <= abilityAllowed[2].rating) {
				if (this.randomChance(1, 2)) [abilityAllowed[1], abilityAllowed[2]] = [abilityAllowed[2], abilityAllowed[1]];
			} else {
				if (this.randomChance(1, 3)) [abilityAllowed[1], abilityAllowed[2]] = [abilityAllowed[2], abilityAllowed[1]];
			}
			if (abilityAllowed[0].rating <= abilityAllowed[1].rating) {
				if (this.randomChance(2, 3)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
			} else {
				if (this.randomChance(1, 2)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
			}
		} else {
			// Third ability cannot be chosen
			if (abilityAllowed[0].rating <= abilityAllowed[1].rating) {
				if (this.randomChance(1, 2)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
			} else if (abilityAllowed[0].rating - 0.5 <= abilityAllowed[1].rating) {
				if (this.randomChance(1, 3)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
			}
		}

		// After sorting, choose the first ability
		return abilityAllowed[0].name;
	}

	getPriorityItem(
		ability: string,
		types: string[],
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	) {
		if (!isDoubles) {
			if (role === 'Fast Bulky Setup' && (ability === 'Quark Drive' || ability === 'Protosynthesis')) {
				return 'Booster Energy';
			}
			if (species.id === 'lokix') {
				return (role === 'Fast Attacker') ? 'Silver Powder' : 'Life Orb';
			}
		}
		if (species.requiredItems) {
			// Z-Crystals aren't available in Gen 9, so require Plates
			if (species.baseSpecies === 'Arceus') {
				return species.requiredItems[0];
			}
			return this.sample(species.requiredItems);
		}
		if (role === 'AV Pivot') return 'Assault Vest';
		if (species.id === 'pikachu') return 'Light Ball';
		if (species.id === 'regieleki') return 'Magnet';
		if (species.id === 'smeargle') return 'Focus Sash';
		if (
			species.id === 'froslass' || moves.has('populationbomb') ||
			(ability === 'Hustle' && counter.get('setup') && !isDoubles && this.randomChance(1, 2))
		) return 'Wide Lens';
		if (moves.has('clangoroussoul') || (species.id === 'toxtricity' && moves.has('shiftgear'))) return 'Throat Spray';
		if (
			(species.baseSpecies === 'Magearna' && role === 'Tera Blast user') ||
			species.id === 'necrozmaduskmane' || (species.id === 'calyrexice' && isDoubles)
		) return 'Weakness Policy';
		if (['dragonenergy', 'lastrespects', 'waterspout'].some(m => moves.has(m))) return 'Choice Scarf';
		if (
			ability === 'Imposter' || (species.id === 'magnezone' && role === 'Fast Attacker')
		) return 'Choice Scarf';
		if (species.id === 'rampardos' && (role === 'Fast Attacker' || isDoubles)) return 'Choice Scarf';
		if (species.id === 'palkia' && counter.get('Special') < 4) return 'Lustrous Orb';
		if (
			moves.has('courtchange') ||
			!isDoubles && (species.id === 'luvdisc' || (species.id === 'terapagos' && !moves.has('rest')))
		) return 'Heavy-Duty Boots';
		if (moves.has('bellydrum') && moves.has('substitute')) return 'Salac Berry';
		if (
			['Cheek Pouch', 'Cud Chew', 'Harvest', 'Ripen'].some(m => ability === m) ||
			moves.has('bellydrum') || moves.has('filletaway')
		) {
			return 'Sitrus Berry';
		}
		if (['healingwish', 'switcheroo', 'trick'].some(m => moves.has(m))) {
			if (
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				role !== 'Wallbreaker' && role !== 'Doubles Wallbreaker' && !counter.get('priority')
			) {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (counter.get('Status') && (species.name === 'Latias' || species.name === 'Latios')) return 'Soul Dew';
		if (species.id === 'scyther' && !isDoubles) return (isLead && !moves.has('uturn')) ? 'Eviolite' : 'Heavy-Duty Boots';
		if (species.nfe) return 'Eviolite';
		if (ability === 'Poison Heal') return 'Toxic Orb';
		if ((ability === 'Guts' || moves.has('facade')) && !moves.has('sleeptalk')) {
			return (types.includes('Fire') || ability === 'Toxic Boost') ? 'Toxic Orb' : 'Flame Orb';
		}
		if (ability === 'Magic Guard' || (ability === 'Sheer Force' && counter.get('sheerforce'))) return 'Life Orb';
		if (ability === 'Anger Shell') return this.sample(['Rindo Berry', 'Passho Berry', 'Scope Lens', 'Sitrus Berry']);
		if (moves.has('dragondance') && isDoubles) return 'Clear Amulet';
		if (counter.get('skilllink') && ability !== 'Skill Link' && species.id !== 'breloom') return 'Loaded Dice';
		if (ability === 'Unburden') {
			return (moves.has('closecombat') || moves.has('leafstorm')) ? 'White Herb' : 'Sitrus Berry';
		}
		if (moves.has('shellsmash') && ability !== 'Weak Armor') return 'White Herb';
		if (moves.has('meteorbeam') || (moves.has('electroshot') && !teamDetails.rain)) return 'Power Herb';
		if (moves.has('acrobatics') && ability !== 'Protosynthesis') return '';
		if (moves.has('auroraveil') || moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (ability === 'Gluttony') return `${this.sample(['Aguav', 'Figy', 'Iapapa', 'Mago', 'Wiki'])} Berry`;
		if (
			moves.has('rest') && !moves.has('sleeptalk') &&
			ability !== 'Natural Cure' && ability !== 'Shed Skin'
		) {
			return 'Chesto Berry';
		}
		if (
			species.id !== 'yanmega' &&
			this.dex.getEffectiveness('Rock', species) >= 2 && (!types.includes('Flying') || !isDoubles)
		) return 'Heavy-Duty Boots';
	}

	/** Item generation specific to Random Doubles */
	getDoublesItem(
		ability: string,
		types: string[],
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	): string {
		const scarfReqs = (
			!counter.get('priority') && ability !== 'Speed Boost' && role !== 'Doubles Wallbreaker' &&
			species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
			this.randomChance(1, 2)
		);
		const offensiveRole = (
			['Doubles Fast Attacker', 'Doubles Wallbreaker', 'Doubles Setup Sweeper', 'Offensive Protect'].some(m => role === m)
		);

		if (species.id === 'ursalunabloodmoon' || (moves.has('doubleedge') && moves.has('fakeout'))) return 'Silk Scarf';
		if (
			moves.has('flipturn') && moves.has('protect') && (moves.has('aquajet') || (moves.has('jetpunch')))
		) return 'Mystic Water';
		if (counter.get('speedsetup') && role === 'Doubles Bulky Setup') return 'Weakness Policy';
		if (species.id === 'toxapex') return 'Binding Band';
		if (moves.has('blizzard') && ability !== 'Snow Warning' && !teamDetails.snow) return 'Blunder Policy';

		if (role === 'Choice Item user') {
			if (scarfReqs || (counter.get('Physical') < 4 && counter.get('Special') < 3 && !moves.has('memento'))) {
				return 'Choice Scarf';
			}
			return (counter.get('Physical') >= 3) ? 'Choice Band' : 'Choice Specs';
		}
		if (counter.get('Physical') >= 4 &&
			['fakeout', 'feint', 'firstimpression', 'rapidspin', 'suckerpunch'].every(m => !moves.has(m)) &&
			(moves.has('flipturn') || moves.has('uturn') || role === 'Doubles Wallbreaker')
		) {
			return (scarfReqs) ? 'Choice Scarf' : 'Choice Band';
		}
		if (
			((counter.get('Special') >= 4 && (moves.has('voltswitch') || role === 'Doubles Wallbreaker')) || (
				counter.get('Special') >= 3 && (moves.has('uturn') || moves.has('flipturn'))
			)) && !moves.has('electroweb')
		) {
			return (scarfReqs) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (
			(role === 'Bulky Protect' && counter.get('setup')) || moves.has('substitute') || moves.has('irondefense') ||
			species.id === 'eternatus' || species.id === 'regigigas'
		) return 'Leftovers';
		if (species.id === 'sylveon') return 'Pixie Plate';
		if (ability === 'Intimidate' && this.dex.getEffectiveness('Rock', species) >= 1) return 'Heavy-Duty Boots';
		if (
			(offensiveRole || (role === 'Tera Blast user' && (species.baseStats.spe >= 80 || moves.has('trickroom')))) &&
			(!moves.has('fakeout') || species.id === 'ambipom') && !moves.has('incinerate') &&
			(!moves.has('uturn') || types.includes('Bug') || species.baseStats.atk >= 120 || ability === 'Libero') &&
			((!moves.has('icywind') && !moves.has('electroweb')) || species.id === 'ironbundle')
		) {
			return (
				(ability === 'Quark Drive' || ability === 'Protosynthesis') &&
				['firstimpression', 'uturn', 'voltswitch'].every(m => !moves.has(m)) && species.id !== 'ironvaliant'
			) ? 'Booster Energy' : 'Life Orb';
		}
		if (isLead && (species.id === 'glimmora' ||
			(['Doubles Fast Attacker', 'Doubles Wallbreaker', 'Offensive Protect'].includes(role) &&
			species.baseStats.hp + species.baseStats.def + species.baseStats.spd <= 230))
		) return 'Focus Sash';
		if (
			['Doubles Fast Attacker', 'Doubles Wallbreaker', 'Offensive Protect'].includes(role) &&
			moves.has('fakeout') || moves.has('incinerate')
		) {
			return (this.dex.getEffectiveness('Rock', species) >= 1) ? 'Heavy-Duty Boots' : 'Clear Amulet';
		}
		if (!counter.get('Status')) return 'Assault Vest';
		return 'Sitrus Berry';
	}

	getItem(
		ability: string,
		types: string[],
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	): string {
		if (types.includes('Normal') && moves.has('fakeout')) return 'Silk Scarf';
		if (
			species.id !== 'jirachi' && (counter.get('Physical') >= 4) &&
			['dragontail', 'fakeout', 'firstimpression', 'flamecharge', 'rapidspin'].every(m => !moves.has(m))
		) {
			const scarfReqs = (
				role !== 'Wallbreaker' &&
				(species.baseStats.atk >= 100 || ability === 'Huge Power' || ability === 'Pure Power') &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Speed Boost' && !counter.get('priority') && !moves.has('aquastep')
			);
			return (scarfReqs && this.randomChance(1, 2)) ? 'Choice Scarf' : 'Choice Band';
		}
		if (
			(counter.get('Special') >= 4) ||
			(counter.get('Special') >= 3 && ['flipturn', 'uturn'].some(m => moves.has(m)))
		) {
			const scarfReqs = (
				role !== 'Wallbreaker' &&
				species.baseStats.spa >= 100 &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Speed Boost' && ability !== 'Tinted Lens' && !moves.has('uturn') && !counter.get('priority')
			);
			return (scarfReqs && this.randomChance(1, 2)) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (counter.get('speedsetup') && role === 'Bulky Setup') return 'Weakness Policy';
		if (
			!counter.get('Status') &&
			!['Fast Attacker', 'Wallbreaker', 'Tera Blast user'].includes(role)
		) {
			return 'Assault Vest';
		}
		if (species.id === 'golem') return (counter.get('speedsetup')) ? 'Weakness Policy' : 'Custap Berry';
		if (moves.has('substitute')) return 'Leftovers';
		if (moves.has('stickyweb') && species.id !== 'araquanid' && isLead) return 'Focus Sash';
		if (this.dex.getEffectiveness('Rock', species) >= 1) return 'Heavy-Duty Boots';
		if (
			(moves.has('chillyreception') || (
				role === 'Fast Support' &&
				[...PIVOT_MOVES, 'defog', 'mortalspin', 'rapidspin'].some(m => moves.has(m)) &&
				!types.includes('Flying') && ability !== 'Levitate'
			))
		) return 'Heavy-Duty Boots';

		// Low Priority
		if (
			(species.id === 'garchomp' && role === 'Fast Support') || (
				ability === 'Regenerator' && (role === 'Bulky Support' || role === 'Bulky Attacker') &&
				(species.baseStats.hp + species.baseStats.def) >= 180 && this.randomChance(1, 2)
			) || (
				ability !== 'Regenerator' && !counter.get('setup') && counter.get('recovery') &&
				this.dex.getEffectiveness('Fighting', species) < 1 &&
				(species.baseStats.hp + species.baseStats.def) > 200 && this.randomChance(1, 2)
			)
		) return 'Rocky Helmet';
		if (moves.has('outrage')) return 'Lum Berry';
		if (moves.has('protect') && ability !== 'Speed Boost') return 'Leftovers';
		if (
			role === 'Fast Support' && isLead &&
			!counter.get('recovery') && !counter.get('recoil') &&
			(species.baseStats.hp + species.baseStats.def + species.baseStats.spd) < 258
		) return 'Focus Sash';
		if (
			!counter.get('setup') && ability !== 'Levitate' && this.dex.getEffectiveness('Ground', species) >= 2
		) return 'Air Balloon';
		if (['Bulky Attacker', 'Bulky Support', 'Bulky Setup'].some(m => role === (m))) return 'Leftovers';
		if (species.id === 'pawmot' && moves.has('nuzzle')) return 'Leppa Berry';
		if (role === 'Fast Support' || role === 'Fast Bulky Setup') {
			return (counter.get('Physical') + counter.get('Special') >= 3 && !moves.has('nuzzle')) ? 'Life Orb' : 'Leftovers';
		}
		if (role === 'Tera Blast user' && DEFENSIVE_TERA_BLAST_USERS.includes(species.id)) return 'Leftovers';
		if (
			['flamecharge', 'rapidspin', 'trailblaze'].every(m => !moves.has(m)) &&
			['Fast Attacker', 'Setup Sweeper', 'Tera Blast user', 'Wallbreaker'].some(m => role === (m))
		) return 'Life Orb';
		return 'Leftovers';
	}

	getLevel(
		species: Species,
		isDoubles: boolean,
	): number {
		if (this.adjustLevel) return this.adjustLevel;
		// doubles levelling
		if (isDoubles && this.randomDoublesSets[species.id]["level"]) return this.randomDoublesSets[species.id]["level"]!;
		if (!isDoubles && this.randomSets[species.id]["level"]) return this.randomSets[species.id]["level"]!;
		// Default to tier-based levelling
		const tier = species.tier;
		const tierScale: Partial<Record<Species['tier'], number>> = {
			Uber: 76,
			OU: 80,
			UUBL: 81,
			UU: 82,
			RUBL: 83,
			RU: 84,
			NUBL: 85,
			NU: 86,
			PUBL: 87,
			PU: 88, "(PU)": 88, NFE: 88,
		};
		return tierScale[tier] || 80;
	}

	getForme(species: Species): string {
		if (typeof species.battleOnly === 'string') {
			// Only change the forme. The species has custom moves, and may have different typing and requirements.
			return species.battleOnly;
		}
		if (species.cosmeticFormes) return this.sample([species.name].concat(species.cosmeticFormes));

		// Consolidate mostly-cosmetic formes, at least for the purposes of Random Battles
		if (['Dudunsparce', 'Magearna', 'Maushold', 'Polteageist', 'Sinistcha', 'Zarude'].includes(species.baseSpecies)) {
			return this.sample([species.name].concat(species.otherFormes!));
		}
		if (species.baseSpecies === 'Basculin') return 'Basculin' + this.sample(['', '-Blue-Striped']);
		if (species.baseSpecies === 'Pikachu') {
			return 'Pikachu' + this.sample(
				['', '-Original', '-Hoenn', '-Sinnoh', '-Unova', '-Kalos', '-Alola', '-Partner', '-World']
			);
		}
		return species.name;
	}

	randomSet(
		s: string | Species,
		teamDetails: RandomTeamsTypes.TeamDetails = {},
		isLead = false,
		isDoubles = false
	): RandomTeamsTypes.RandomSet {
		const species = this.dex.species.get(s);
		const forme = this.getForme(species);
		const sets = (this as any)[`random${isDoubles ? 'Doubles' : ''}Sets`][species.id]["sets"];
		const possibleSets = [];

		const ruleTable = this.dex.formats.getRuleTable(this.format);

		for (const set of sets) {
			// Prevent Fast Bulky Setup on lead Paradox Pokemon, since it generates Booster Energy.
			const abilities = new Set(Object.values(species.abilities));
			if (isLead && (abilities.has('Protosynthesis') || abilities.has('Quark Drive')) && set.role === 'Fast Bulky Setup') {
				continue;
			}
			// Prevent Tera Blast user if the team already has one, or if Terastallizion is prevented.
			if ((teamDetails.teraBlast || ruleTable.has('terastalclause')) && set.role === 'Tera Blast user') {
				continue;
			}
			possibleSets.push(set);
		}
		const set = this.sampleIfArray(possibleSets);
		const role = set.role;
		const movePool: string[] = [];
		for (const movename of set.movepool) {
			movePool.push(this.dex.moves.get(movename).id);
		}
		const teraTypes = set.teraTypes;
		let teraType = this.sampleIfArray(teraTypes);

		let ability = '';
		let item = undefined;

		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};

		const types = species.types;
		const abilities = new Set(Object.values(species.abilities));
		if (species.unreleasedHidden) abilities.delete(species.abilities.H);

		// Get moves
		const moves = this.randomMoveset(types, abilities, teamDetails, species, isLead, isDoubles, movePool, teraType, role);
		const counter = this.queryMoves(moves, species, teraType, abilities);

		// Get ability
		ability = this.getAbility(types, moves, abilities, counter, teamDetails, species, isLead, isDoubles, teraType, role);

		// Get items
		// First, the priority items
		item = this.getPriorityItem(ability, types, moves, counter, teamDetails, species, isLead, isDoubles, teraType, role);
		if (item === undefined) {
			if (isDoubles) {
				item = this.getDoublesItem(ability, types, moves, counter, teamDetails, species, isLead, teraType, role);
			} else {
				item = this.getItem(ability, types, moves, counter, teamDetails, species, isLead, teraType, role);
			}
		}

		// Get level
		const level = this.getLevel(species, isDoubles);

		// Prepare optimal HP
		const srImmunity = ability === 'Magic Guard' || item === 'Heavy-Duty Boots';
		let srWeakness = srImmunity ? 0 : this.dex.getEffectiveness('Rock', species);
		// Crash damage move users want an odd HP to survive two misses
		if (['axekick', 'highjumpkick', 'jumpkick'].some(m => moves.has(m))) srWeakness = 2;
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if ((moves.has('substitute') && ['Sitrus Berry', 'Salac Berry'].includes(item))) {
				// Two Substitutes should activate Sitrus Berry
				if (hp % 4 === 0) break;
			} else if ((moves.has('bellydrum') || moves.has('filletaway')) && (item === 'Sitrus Berry' || ability === 'Gluttony')) {
				// Belly Drum should activate Sitrus Berry
				if (hp % 2 === 0) break;
			} else if (moves.has('substitute') && moves.has('endeavor')) {
				// Luvdisc should be able to Substitute down to very low HP
				if (hp % 4 > 0) break;
			} else {
				// Maximize number of Stealth Rock switch-ins
				if (srWeakness <= 0 || ability === 'Regenerator' || ['Leftovers', 'Life Orb'].includes(item)) break;
				if (item !== 'Sitrus Berry' && hp % (4 / srWeakness) > 0) break;
				// Minimise number of Stealth Rock switch-ins to activate Sitrus Berry
				if (item === 'Sitrus Berry' && hp % (4 / srWeakness) === 0) break;
			}
			evs.hp -= 4;
		}

		// Minimize confusion damage
		const noAttackStatMoves = [...moves].every(m => {
			const move = this.dex.moves.get(m);
			if (move.damageCallback || move.damage) return true;
			if (move.id === 'shellsidearm') return false;
			// Magearna and doubles Dragonite, though these can work well as a general rule
			if (move.id === 'terablast' && (
				species.id === 'porygon2' || moves.has('shiftgear') || species.baseStats.atk > species.baseStats.spa)
			) return false;
			return move.category !== 'Physical' || move.id === 'bodypress' || move.id === 'foulplay';
		});
		if (noAttackStatMoves && !moves.has('transform') && this.format.mod !== 'partnersincrime') {
			evs.atk = 0;
			ivs.atk = 0;
		}

		if (moves.has('gyroball') || moves.has('trickroom')) {
			evs.spe = 0;
			ivs.spe = 0;
		}

		// Enforce Tera Type after all set generation is done to prevent infinite generation
		if (this.forceTeraType) teraType = this.forceTeraType;

		// shuffle moves to add more randomness to camomons
		const shuffledMoves = Array.from(moves);
		this.prng.shuffle(shuffledMoves);
		return {
			name: species.baseSpecies,
			species: forme,
			gender: species.baseSpecies === 'Greninja' ? 'M' : species.gender,
			shiny: this.randomChance(1, 1024),
			level,
			moves: shuffledMoves,
			ability,
			evs,
			ivs,
			item,
			teraType,
			role,
		};
	}

	getPokemonPool(
		type: string,
		pokemonToExclude: RandomTeamsTypes.RandomSet[] = [],
		isMonotype = false,
		pokemonList: string[]
	): [{[k: string]: string[]}, string[]] {
		const exclude = pokemonToExclude.map(p => toID(p.species));
		const pokemonPool: {[k: string]: string[]} = {};
		const baseSpeciesPool = [];
		for (const pokemon of pokemonList) {
			let species = this.dex.species.get(pokemon);
			if (exclude.includes(species.id)) continue;
			if (isMonotype) {
				if (!species.types.includes(type)) continue;
				if (typeof species.battleOnly === 'string') {
					species = this.dex.species.get(species.battleOnly);
					if (!species.types.includes(type)) continue;
				}
			}

			if (species.baseSpecies in pokemonPool) {
				pokemonPool[species.baseSpecies].push(pokemon);
			} else {
				pokemonPool[species.baseSpecies] = [pokemon];
			}
		}
		// Include base species 1x if 1-3 formes, 2x if 4-6 formes, 3x if 7+ formes
		for (const baseSpecies of Object.keys(pokemonPool)) {
			// Squawkabilly has 4 formes, but only 2 functionally different formes, so only include it 1x
			const weight = (baseSpecies === 'Squawkabilly') ? 1 : Math.min(Math.ceil(pokemonPool[baseSpecies].length / 3), 3);
			for (let i = 0; i < weight; i++) baseSpeciesPool.push(baseSpecies);
		}
		return [pokemonPool, baseSpeciesPool];
	}

	randomSets: {[species: string]: RandomTeamsTypes.RandomSpeciesData} = randomSetsJSON;
	randomDoublesSets: {[species: string]: RandomTeamsTypes.RandomSpeciesData} = randomDoublesSetsJSON;

	randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const seed = this.prng.seed;
		const ruleTable = this.dex.formats.getRuleTable(this.format);
		const pokemon: RandomTeamsTypes.RandomSet[] = [];

		// For Monotype
		const isMonotype = !!this.forceMonotype || ruleTable.has('sametypeclause');
		const isDoubles = this.format.gameType !== 'singles';
		const typePool = this.dex.types.names().filter(name => name !== "Stellar");
		const type = this.forceMonotype || this.sample(typePool);

		// PotD stuff
		const usePotD = global.Config && Config.potd && ruleTable.has('potd');
		const potd = usePotD ? this.dex.species.get(Config.potd) : null;

		const baseFormes: {[k: string]: number} = {};

		const typeCount: {[k: string]: number} = {};
		const typeComboCount: {[k: string]: number} = {};
		const typeWeaknesses: {[k: string]: number} = {};
		const typeDoubleWeaknesses: {[k: string]: number} = {};
		const teamDetails: RandomTeamsTypes.TeamDetails = {};
		let numMaxLevelPokemon = 0;

		const pokemonList = isDoubles ? Object.keys(this.randomDoublesSets) : Object.keys(this.randomSets);
		const [pokemonPool, baseSpeciesPool] = this.getPokemonPool(type, pokemon, isMonotype, pokemonList);

		let leadsRemaining = this.format.gameType === 'doubles' ? 2 : 1;
		while (baseSpeciesPool.length && pokemon.length < this.maxTeamSize) {
			const baseSpecies = this.sampleNoReplace(baseSpeciesPool);
			let species = this.dex.species.get(this.sample(pokemonPool[baseSpecies]));
			if (!species.exists) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[species.baseSpecies]) continue;

			// Treat Ogerpon formes and Terapagos like the Tera Blast user role; reject if team has one already
			if ((species.baseSpecies === 'Ogerpon' || species.baseSpecies === 'Terapagos') && teamDetails.teraBlast) continue;

			// Illusion shouldn't be on the last slot
			if (species.baseSpecies === 'Zoroark' && pokemon.length >= (this.maxTeamSize - 1)) continue;

			const types = species.types;
			const typeCombo = types.slice().sort().join();
			const weakToFreezeDry = (
				this.dex.getEffectiveness('Ice', species) > 0 ||
				(this.dex.getEffectiveness('Ice', species) > -2 && types.includes('Water'))
			);
			// Dynamically scale limits for different team sizes. The default and minimum value is 1.
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

			if (!isMonotype && !this.forceMonotype) {
				let skip = false;

				// Limit two of any type
				for (const typeName of types) {
					if (typeCount[typeName] >= 2 * limitFactor) {
						skip = true;
						break;
					}
				}
				if (skip) continue;

				// Limit three weak to any type, and one double weak to any type
				for (const typeName of this.dex.types.names()) {
					// it's weak to the type
					if (this.dex.getEffectiveness(typeName, species) > 0) {
						if (!typeWeaknesses[typeName]) typeWeaknesses[typeName] = 0;
						if (typeWeaknesses[typeName] >= 3 * limitFactor) {
							skip = true;
							break;
						}
					}
					if (this.dex.getEffectiveness(typeName, species) > 1) {
						if (!typeDoubleWeaknesses[typeName]) typeDoubleWeaknesses[typeName] = 0;
						if (typeDoubleWeaknesses[typeName] >= 1 * limitFactor) {
							skip = true;
							break;
						}
					}
				}
				if (skip) continue;

				// Limit four weak to Freeze-Dry
				if (weakToFreezeDry) {
					if (!typeWeaknesses['Freeze-Dry']) typeWeaknesses['Freeze-Dry'] = 0;
					if (typeWeaknesses['Freeze-Dry'] >= 4 * limitFactor) continue;
				}

				// Limit one level 100 Pokemon
				if (!this.adjustLevel && (this.getLevel(species, isDoubles) === 100) && numMaxLevelPokemon >= limitFactor) {
					continue;
				}
			}

			// Limit three of any type combination in Monotype
			if (!this.forceMonotype && isMonotype && (typeComboCount[typeCombo] >= 3 * limitFactor)) continue;

			// The Pokemon of the Day
			if (potd?.exists && (pokemon.length === 1 || this.maxTeamSize === 1)) species = potd;

			let set: RandomTeamsTypes.RandomSet;

			if (leadsRemaining) {
				if (
					isDoubles && DOUBLES_NO_LEAD_POKEMON.includes(species.baseSpecies) ||
					!isDoubles && NO_LEAD_POKEMON.includes(species.baseSpecies)
				) {
					if (pokemon.length + leadsRemaining === this.maxTeamSize) continue;
					set = this.randomSet(species, teamDetails, false, isDoubles);
					pokemon.push(set);
				} else {
					set = this.randomSet(species, teamDetails, true, isDoubles);
					pokemon.unshift(set);
					leadsRemaining--;
				}
			} else {
				set = this.randomSet(species, teamDetails, false, isDoubles);
				pokemon.push(set);
			}

			// Don't bother tracking details for the last Pokemon
			if (pokemon.length === this.maxTeamSize) break;

			// Now that our Pokemon has passed all checks, we can increment our counters
			baseFormes[species.baseSpecies] = 1;

			// Increment type counters
			for (const typeName of types) {
				if (typeName in typeCount) {
					typeCount[typeName]++;
				} else {
					typeCount[typeName] = 1;
				}
			}
			if (typeCombo in typeComboCount) {
				typeComboCount[typeCombo]++;
			} else {
				typeComboCount[typeCombo] = 1;
			}

			// Increment weakness counter
			for (const typeName of this.dex.types.names()) {
				// it's weak to the type
				if (this.dex.getEffectiveness(typeName, species) > 0) {
					typeWeaknesses[typeName]++;
				}
				if (this.dex.getEffectiveness(typeName, species) > 1) {
					typeDoubleWeaknesses[typeName]++;
				}
			}
			if (weakToFreezeDry) typeWeaknesses['Freeze-Dry']++;

			// Increment level 100 counter
			if (set.level === 100) numMaxLevelPokemon++;

			// Track what the team has
			if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails.rain = 1;
			if (set.ability === 'Drought' || set.ability === 'Orichalcum Pulse' || set.moves.includes('sunnyday')) {
				teamDetails.sun = 1;
			}
			if (set.ability === 'Sand Stream') teamDetails.sand = 1;
			if (set.ability === 'Snow Warning' || set.moves.includes('snowscape') || set.moves.includes('chillyreception')) {
				teamDetails.snow = 1;
			}
			if (set.moves.includes('spikes') || set.moves.includes('ceaselessedge')) {
				teamDetails.spikes = (teamDetails.spikes || 0) + 1;
			}
			if (set.moves.includes('toxicspikes') || set.ability === 'Toxic Debris') teamDetails.toxicSpikes = 1;
			if (set.moves.includes('stealthrock') || set.moves.includes('stoneaxe')) teamDetails.stealthRock = 1;
			if (set.moves.includes('stickyweb')) teamDetails.stickyWeb = 1;
			if (set.moves.includes('defog')) teamDetails.defog = 1;
			if (set.moves.includes('rapidspin') || set.moves.includes('mortalspin')) teamDetails.rapidSpin = 1;
			if (set.moves.includes('auroraveil') || (set.moves.includes('reflect') && set.moves.includes('lightscreen'))) {
				teamDetails.screens = 1;
			}
			if (set.role === 'Tera Blast user' || species.baseSpecies === "Ogerpon" || species.baseSpecies === "Terapagos") {
				teamDetails.teraBlast = 1;
			}
		}
		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) { // large teams sometimes cannot be built
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}

		return pokemon;
	}

	randomCCTeam(): RandomTeamsTypes.RandomSet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const dex = this.dex;
		const team = [];

		const natures = this.dex.natures.all();
		const items = this.dex.items.all();

		const randomN = this.randomNPokemon(this.maxTeamSize, this.forceMonotype, undefined, undefined, true);

		for (let forme of randomN) {
			let species = dex.species.get(forme);
			if (species.isNonstandard) species = dex.species.get(species.baseSpecies);

			// Random legal item
			let item = '';
			let isIllegalItem;
			let isBadItem;
			if (this.gen >= 2) {
				do {
					item = this.sample(items).name;
					isIllegalItem = this.dex.items.get(item).gen > this.gen || this.dex.items.get(item).isNonstandard;
					isBadItem = item.startsWith("TR") || this.dex.items.get(item).isPokeball;
				} while (isIllegalItem || (isBadItem && this.randomChance(19, 20)));
			}

			// Make sure forme is legal
			if (species.battleOnly) {
				if (typeof species.battleOnly === 'string') {
					species = dex.species.get(species.battleOnly);
				} else {
					species = dex.species.get(this.sample(species.battleOnly));
				}
				forme = species.name;
			} else if (species.requiredItems && !species.requiredItems.some(req => toID(req) === item)) {
				if (!species.changesFrom) throw new Error(`${species.name} needs a changesFrom value`);
				species = dex.species.get(species.changesFrom);
				forme = species.name;
			}

			// Make sure that a base forme does not hold any forme-modifier items.
			let itemData = this.dex.items.get(item);
			if (itemData.forcedForme && forme === this.dex.species.get(itemData.forcedForme).baseSpecies) {
				do {
					itemData = this.sample(items);
					item = itemData.name;
				} while (
					itemData.gen > this.gen ||
					itemData.isNonstandard ||
					(itemData.forcedForme && forme === this.dex.species.get(itemData.forcedForme).baseSpecies)
				);
			}

			// Random legal ability
			const abilities = Object.values(species.abilities).filter(a => this.dex.abilities.get(a).gen <= this.gen);
			const ability: string = this.gen <= 2 ? 'No Ability' : this.sample(abilities);

			// Four random unique moves from the movepool
			let pool = ['struggle'];
			if (forme === 'Smeargle') {
				pool = this.dex.moves.all()
					.filter(move => !(move.isNonstandard || move.isZ || move.isMax || move.realMove))
					.map(m => m.id);
			} else {
				pool = [...this.dex.species.getMovePool(species.id)];
			}

			const moves = this.multipleSamplesNoReplace(pool, this.maxMoveCount);

			// Random EVs
			const evs: StatsTable = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			const s: StatID[] = ["hp", "atk", "def", "spa", "spd", "spe"];
			let evpool = 510;
			do {
				const x = this.sample(s);
				const y = this.random(Math.min(256 - evs[x], evpool + 1));
				evs[x] += y;
				evpool -= y;
			} while (evpool > 0);

			// Random IVs
			const ivs = {
				hp: this.random(32),
				atk: this.random(32),
				def: this.random(32),
				spa: this.random(32),
				spd: this.random(32),
				spe: this.random(32),
			};

			// Random nature
			const nature = this.sample(natures).name;

			// Level balance--calculate directly from stats rather than using some silly lookup table
			const mbstmin = 1307; // Sunkern has the lowest modified base stat total, and that total is 807

			let stats = species.baseStats;
			// If Wishiwashi, use the school-forme's much higher stats
			if (species.baseSpecies === 'Wishiwashi') stats = this.dex.species.get('wishiwashischool').baseStats;
			// If Terapagos, use Terastal-forme's stats
			if (species.baseSpecies === 'Terapagos') stats = this.dex.species.get('terapagosterastal').baseStats;

			// Modified base stat total assumes 31 IVs, 85 EVs in every stat
			let mbst = (stats["hp"] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats["atk"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["def"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spa"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spd"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spe"] * 2 + 31 + 21 + 100) + 5;

			let level;
			if (this.adjustLevel) {
				level = this.adjustLevel;
			} else {
				level = Math.floor(100 * mbstmin / mbst); // Initial level guess will underestimate

				while (level < 100) {
					mbst = Math.floor((stats["hp"] * 2 + 31 + 21 + 100) * level / 100 + 10);
					// Since damage is roughly proportional to level
					mbst += Math.floor(((stats["atk"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats["def"] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor(((stats["spa"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats["spd"] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor((stats["spe"] * 2 + 31 + 21 + 100) * level / 100 + 5);

					if (mbst >= mbstmin) break;
					level++;
				}
			}

			// Random happiness
			const happiness = this.random(256);

			// Random shininess
			const shiny = this.randomChance(1, 1024);

			const set: RandomTeamsTypes.RandomSet = {
				name: species.baseSpecies,
				species: species.name,
				gender: species.gender,
				item,
				ability,
				moves,
				evs,
				ivs,
				nature,
				level,
				happiness,
				shiny,
			};
			if (this.gen === 9) {
				// Tera type
				if (this.forceTeraType) {
					set.teraType = this.forceTeraType;
				} else {
					set.teraType = this.sample(this.dex.types.all()).name;
				}
			}
			team.push(set);
		}

		return team;
	}

	randomNPokemon(n: number, requiredType?: string, minSourceGen?: number, ruleTable?: RuleTable, requireMoves = false) {
		// Picks `n` random pokemon--no repeats, even among formes
		// Also need to either normalize for formes or select formes at random
		// Unreleased are okay but no CAP
		if (requiredType && !this.dex.types.get(requiredType).exists) {
			throw new Error(`"${requiredType}" is not a valid type.`);
		}

		const isNotCustom = !ruleTable;

		const pool: number[] = [];
		let speciesPool: Species[] = [];
		if (isNotCustom) {
			speciesPool = [...this.dex.species.all()];
			for (const species of speciesPool) {
				if (species.isNonstandard && species.isNonstandard !== 'Unobtainable') continue;
				if (requireMoves) {
					const hasMovesInCurrentGen = this.dex.species.getMovePool(species.id).size;
					if (!hasMovesInCurrentGen) continue;
				}
				if (requiredType && !species.types.includes(requiredType)) continue;
				if (minSourceGen && species.gen < minSourceGen) continue;
				const num = species.num;
				if (num <= 0 || pool.includes(num)) continue;
				pool.push(num);
			}
		} else {
			const EXISTENCE_TAG = ['past', 'future', 'lgpe', 'unobtainable', 'cap', 'custom', 'nonexistent'];
			const nonexistentBanReason = ruleTable.check('nonexistent');
			// Assume tierSpecies does not differ from species here (mega formes can be used without their stone, etc)
			for (const species of this.dex.species.all()) {
				if (requiredType && !species.types.includes(requiredType)) continue;

				let banReason = ruleTable.check('pokemon:' + species.id);
				if (banReason) continue;
				if (banReason !== '') {
					if (species.isMega && ruleTable.check('pokemontag:mega')) continue;

					banReason = ruleTable.check('basepokemon:' + toID(species.baseSpecies));
					if (banReason) continue;
					if (banReason !== '' || this.dex.species.get(species.baseSpecies).isNonstandard !== species.isNonstandard) {
						const nonexistentCheck = Tags.nonexistent.genericFilter!(species) && nonexistentBanReason;
						let tagWhitelisted = false;
						let tagBlacklisted = false;
						for (const ruleid of ruleTable.tagRules) {
							if (ruleid.startsWith('*')) continue;
							const tagid = ruleid.slice(12);
							const tag = Tags[tagid];
							if ((tag.speciesFilter || tag.genericFilter)!(species)) {
								const existenceTag = EXISTENCE_TAG.includes(tagid);
								if (ruleid.startsWith('+')) {
									if (!existenceTag && nonexistentCheck) continue;
									tagWhitelisted = true;
									break;
								}
								tagBlacklisted = true;
								break;
							}
						}
						if (tagBlacklisted) continue;
						if (!tagWhitelisted) {
							if (ruleTable.check('pokemontag:allpokemon')) continue;
						}
					}
				}
				speciesPool.push(species);
				const num = species.num;
				if (pool.includes(num)) continue;
				pool.push(num);
			}
		}

		const hasDexNumber: {[k: string]: number} = {};
		for (let i = 0; i < n; i++) {
			const num = this.sampleNoReplace(pool);
			hasDexNumber[num] = i;
		}

		const formes: string[][] = [];
		for (const species of speciesPool) {
			if (!(species.num in hasDexNumber)) continue;
			if (isNotCustom && (species.gen > this.gen ||
				(species.isNonstandard && species.isNonstandard !== 'Unobtainable'))) continue;
			if (requiredType && !species.types.includes(requiredType)) continue;
			if (!formes[hasDexNumber[species.num]]) formes[hasDexNumber[species.num]] = [];
			formes[hasDexNumber[species.num]].push(species.name);
		}

		if (formes.length < n) {
			throw new Error(`Legal Pokemon forme count insufficient to support Max Team Size: (${formes.length} / ${n}).`);
		}

		const nPokemon = [];
		for (let i = 0; i < n; i++) {
			if (!formes[i].length) {
				throw new Error(`Invalid pokemon gen ${this.gen}: ${JSON.stringify(formes)} numbers ${JSON.stringify(hasDexNumber)}`);
			}
			nPokemon.push(this.sample(formes[i]));
		}
		return nPokemon;
	}

	randomHCTeam(): PokemonSet[] {
		const hasCustomBans = this.hasDirectCustomBanlistChanges();
		const ruleTable = this.dex.formats.getRuleTable(this.format);
		const hasNonexistentBan = hasCustomBans && ruleTable.check('nonexistent');
		const hasNonexistentWhitelist = hasCustomBans && (hasNonexistentBan === '');

		if (hasCustomBans) {
			this.enforceNoDirectComplexBans();
		}

		// Item Pool
		const doItemsExist = this.gen > 1;
		let itemPool: Item[] = [];
		if (doItemsExist) {
			if (!hasCustomBans) {
				itemPool = [...this.dex.items.all()].filter(item => (item.gen <= this.gen && !item.isNonstandard));
			} else {
				const hasAllItemsBan = ruleTable.check('pokemontag:allitems');
				for (const item of this.dex.items.all()) {
					let banReason = ruleTable.check('item:' + item.id);
					if (banReason) continue;
					if (banReason !== '' && item.id) {
						if (hasAllItemsBan) continue;
						if (item.isNonstandard) {
							banReason = ruleTable.check('pokemontag:' + toID(item.isNonstandard));
							if (banReason) continue;
							if (banReason !== '' && item.isNonstandard !== 'Unobtainable') {
								if (hasNonexistentBan) continue;
								if (!hasNonexistentWhitelist) continue;
							}
						}
					}
					itemPool.push(item);
				}
				if (ruleTable.check('item:noitem')) {
					this.enforceCustomPoolSizeNoComplexBans('item', itemPool, this.maxTeamSize, 'Max Team Size');
				}
			}
		}

		// Ability Pool
		const doAbilitiesExist = (this.gen > 2) && (this.dex.currentMod !== 'gen7letsgo');
		let abilityPool: Ability[] = [];
		if (doAbilitiesExist) {
			if (!hasCustomBans) {
				abilityPool = [...this.dex.abilities.all()].filter(ability => (ability.gen <= this.gen && !ability.isNonstandard));
			} else {
				const hasAllAbilitiesBan = ruleTable.check('pokemontag:allabilities');
				for (const ability of this.dex.abilities.all()) {
					let banReason = ruleTable.check('ability:' + ability.id);
					if (banReason) continue;
					if (banReason !== '') {
						if (hasAllAbilitiesBan) continue;
						if (ability.isNonstandard) {
							banReason = ruleTable.check('pokemontag:' + toID(ability.isNonstandard));
							if (banReason) continue;
							if (banReason !== '') {
								if (hasNonexistentBan) continue;
								if (!hasNonexistentWhitelist) continue;
							}
						}
					}
					abilityPool.push(ability);
				}
				if (ruleTable.check('ability:noability')) {
					this.enforceCustomPoolSizeNoComplexBans('ability', abilityPool, this.maxTeamSize, 'Max Team Size');
				}
			}
		}

		// Move Pool
		const setMoveCount = ruleTable.maxMoveCount;
		let movePool: Move[] = [];
		if (!hasCustomBans) {
			movePool = [...this.dex.moves.all()].filter(move =>
				(move.gen <= this.gen && !move.isNonstandard));
		} else {
			const hasAllMovesBan = ruleTable.check('pokemontag:allmoves');
			for (const move of this.dex.moves.all()) {
				let banReason = ruleTable.check('move:' + move.id);
				if (banReason) continue;
				if (banReason !== '') {
					if (hasAllMovesBan) continue;
					if (move.isNonstandard) {
						banReason = ruleTable.check('pokemontag:' + toID(move.isNonstandard));
						if (banReason) continue;
						if (banReason !== '' && move.isNonstandard !== 'Unobtainable') {
							if (hasNonexistentBan) continue;
							if (!hasNonexistentWhitelist) continue;
						}
					}
				}
				movePool.push(move);
			}
			this.enforceCustomPoolSizeNoComplexBans('move', movePool, this.maxTeamSize * setMoveCount, 'Max Team Size * Max Move Count');
		}

		// Nature Pool
		const doNaturesExist = this.gen > 2;
		let naturePool: Nature[] = [];
		if (doNaturesExist) {
			if (!hasCustomBans) {
				naturePool = [...this.dex.natures.all()];
			} else {
				const hasAllNaturesBan = ruleTable.check('pokemontag:allnatures');
				for (const nature of this.dex.natures.all()) {
					let banReason = ruleTable.check('nature:' + nature.id);
					if (banReason) continue;
					if (banReason !== '' && nature.id) {
						if (hasAllNaturesBan) continue;
						if (nature.isNonstandard) {
							banReason = ruleTable.check('pokemontag:' + toID(nature.isNonstandard));
							if (banReason) continue;
							if (banReason !== '' && nature.isNonstandard !== 'Unobtainable') {
								if (hasNonexistentBan) continue;
								if (!hasNonexistentWhitelist) continue;
							}
						}
					}
					naturePool.push(nature);
				}
				// There is no 'nature:nonature' rule so do not constrain pool size
			}
		}

		const randomN = this.randomNPokemon(this.maxTeamSize, this.forceMonotype, undefined,
			hasCustomBans ? ruleTable : undefined);

		const team = [];
		for (const forme of randomN) {
			// Choose forme
			const species = this.dex.species.get(forme);

			// Random unique item
			let item = '';
			let itemData;
			let isBadItem;
			if (doItemsExist) {
				// We discard TRs and Balls with 95% probability because of their otherwise overwhelming presence
				do {
					itemData = this.sampleNoReplace(itemPool);
					item = itemData?.name;
					isBadItem = item.startsWith("TR") || itemData.isPokeball;
				} while (isBadItem && this.randomChance(19, 20) && itemPool.length > this.maxTeamSize);
			}

			// Random unique ability
			let ability = 'No Ability';
			let abilityData;
			if (doAbilitiesExist) {
				abilityData = this.sampleNoReplace(abilityPool);
				ability = abilityData?.name;
			}

			// Random unique moves
			const m = [];
			do {
				const move = this.sampleNoReplace(movePool);
				m.push(move.id);
			} while (m.length < setMoveCount);

			// Random EVs
			const evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			if (this.gen === 6) {
				let evpool = 510;
				do {
					const x = this.sample(this.dex.stats.ids());
					const y = this.random(Math.min(256 - evs[x], evpool + 1));
					evs[x] += y;
					evpool -= y;
				} while (evpool > 0);
			} else {
				for (const x of this.dex.stats.ids()) {
					evs[x] = this.random(256);
				}
			}

			// Random IVs
			const ivs: StatsTable = {
				hp: this.random(32),
				atk: this.random(32),
				def: this.random(32),
				spa: this.random(32),
				spd: this.random(32),
				spe: this.random(32),
			};

			// Random nature
			let nature = '';
			if (doNaturesExist && (naturePool.length > 0)) {
				nature = this.sample(naturePool).name;
			}

			// Level balance
			const mbstmin = 1307;
			const stats = species.baseStats;
			let mbst = (stats['hp'] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats['atk'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['def'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spa'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spd'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spe'] * 2 + 31 + 21 + 100) + 5;

			let level;
			if (this.adjustLevel) {
				level = this.adjustLevel;
			} else {
				level = Math.floor(100 * mbstmin / mbst);
				while (level < 100) {
					mbst = Math.floor((stats['hp'] * 2 + 31 + 21 + 100) * level / 100 + 10);
					mbst += Math.floor(((stats['atk'] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats['def'] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor(((stats['spa'] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats['spd'] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor((stats['spe'] * 2 + 31 + 21 + 100) * level / 100 + 5);
					if (mbst >= mbstmin) break;
					level++;
				}
			}

			// Random happiness
			const happiness = this.random(256);

			// Random shininess
			const shiny = this.randomChance(1, 1024);

			const set: PokemonSet = {
				name: species.baseSpecies,
				species: species.name,
				gender: species.gender,
				item,
				ability,
				moves: m,
				evs,
				ivs,
				nature,
				level,
				happiness,
				shiny,
			};
			if (this.gen === 9) {
				// Random Tera type
				if (this.forceTeraType) {
					set.teraType = this.forceTeraType;
				} else {
					set.teraType = this.sample(this.dex.types.all()).name;
				}
			}
			team.push(set);
		}

		return team;
	}
}

export default RandomTeams;
