import {Utils} from './utils';
import {
	Ability,
	AnyObject,
	BasicEffect,
	Format,
	ID,
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
const randomSetsJSON = {"venusaur":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Giga Drain","Leech Seed","Sleep Powder","Sludge Bomb","Substitute"],"abilities":["Chlorophyll","Overgrow"],"teraTypes":["Steel","Water"]},{"role":"Bulky Attacker","movepool":["Earth Power","Energy Ball","Knock Off","Sleep Powder","Sludge Bomb","Synthesis","Toxic"],"abilities":["Chlorophyll","Overgrow"],"teraTypes":["Dark","Steel","Water"]}]},"charizard":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flamethrower","Focus Blast","Hurricane","Will-O-Wisp"],"abilities":["Blaze"],"teraTypes":["Dragon","Fire","Ground"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Flare Blitz","Outrage","Swords Dance"],"abilities":["Blaze"],"teraTypes":["Dragon","Ground"]}]},"blastoise":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Hydro Pump","Ice Beam","Shell Smash"],"abilities":["Torrent"],"teraTypes":["Ground","Steel","Water"]},{"role":"Tera Blast user","movepool":["Hydro Pump","Ice Beam","Shell Smash","Tera Blast"],"abilities":["Torrent"],"teraTypes":["Electric","Grass"]}]},"arbok":{"level":87,"sets":[{"role":"Fast Support","movepool":["Earthquake","Glare","Gunk Shot","Knock Off","Sucker Punch","Toxic Spikes"],"abilities":["Intimidate"],"teraTypes":["Dark","Ground"]},{"role":"Setup Sweeper","movepool":["Coil","Earthquake","Gunk Shot","Trailblaze"],"abilities":["Intimidate"],"teraTypes":["Grass","Ground"]},{"role":"Fast Bulky Setup","movepool":["Coil","Earthquake","Gunk Shot","Sucker Punch"],"abilities":["Intimidate"],"teraTypes":["Dark","Ground"]}]},"pikachu":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["Fake Out","Knock Off","Play Rough","Surf","Volt Switch","Volt Tackle"],"abilities":["Lightning Rod"],"teraTypes":["Water"]}]},"raichu":{"level":88,"sets":[{"role":"Fast Support","movepool":["Alluring Voice","Encore","Focus Blast","Grass Knot","Knock Off","Nasty Plot","Nuzzle","Surf","Thunderbolt","Volt Switch"],"abilities":["Lightning Rod"],"teraTypes":["Grass","Water"]},{"role":"Tera Blast user","movepool":["Encore","Focus Blast","Nasty Plot","Surf","Tera Blast","Thunderbolt"],"abilities":["Lightning Rod"],"teraTypes":["Ice"]}]},"raichualola":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Alluring Voice","Focus Blast","Grass Knot","Psychic","Psyshock","Surf","Thunderbolt","Volt Switch"],"abilities":["Surge Surfer"],"teraTypes":["Fairy","Fighting","Grass","Water"]},{"role":"Setup Sweeper","movepool":["Alluring Voice","Focus Blast","Grass Knot","Nasty Plot","Psyshock","Surf","Thunderbolt"],"abilities":["Surge Surfer"],"teraTypes":["Fairy","Fighting","Grass","Water"]}]},"sandslash":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Knock Off","Rapid Spin","Spikes","Stone Edge","Swords Dance"],"abilities":["Sand Rush"],"teraTypes":["Dragon","Steel","Water"]}]},"sandslashalola":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Iron Head","Knock Off","Rapid Spin","Spikes","Triple Axel"],"abilities":["Slush Rush"],"teraTypes":["Flying","Water"]},{"role":"Setup Sweeper","movepool":["Earthquake","Ice Shard","Knock Off","Rapid Spin","Swords Dance","Triple Axel"],"abilities":["Slush Rush"],"teraTypes":["Ground"]}]},"clefable":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Fire Blast","Knock Off","Moonblast","Moonlight","Stealth Rock","Thunder Wave"],"abilities":["Magic Guard","Unaware"],"teraTypes":["Poison","Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Moonblast","Moonlight"],"abilities":["Magic Guard","Unaware"],"teraTypes":["Fire","Steel"]}]},"ninetales":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["Fire Blast","Nasty Plot","Scorching Sands","Solar Beam"],"abilities":["Drought"],"teraTypes":["Fire","Grass"]}]},"ninetalesalola":{"level":78,"sets":[{"role":"Fast Support","movepool":["Aurora Veil","Blizzard","Encore","Moonblast","Nasty Plot"],"abilities":["Snow Warning"],"teraTypes":["Steel","Water"]},{"role":"Fast Attacker","movepool":["Aurora Veil","Blizzard","Freeze-Dry","Moonblast","Nasty Plot"],"abilities":["Snow Warning"],"teraTypes":["Steel","Water"]}]},"wigglytuff":{"level":96,"sets":[{"role":"Bulky Support","movepool":["Alluring Voice","Dazzling Gleam","Fire Blast","Knock Off","Protect","Thunder Wave","Wish"],"abilities":["Competitive"],"teraTypes":["Poison","Steel"]}]},"vileplume":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Giga Drain","Leech Seed","Sleep Powder","Sludge Bomb","Strength Sap"],"abilities":["Effect Spore"],"teraTypes":["Steel","Water"]}]},"venomoth":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["Bug Buzz","Quiver Dance","Sleep Powder","Sludge Wave"],"abilities":["Tinted Lens"],"teraTypes":["Bug","Poison","Steel","Water"]}]},"dugtrio":{"level":84,"sets":[{"role":"Fast Support","movepool":["Earthquake","Stone Edge","Sucker Punch","Swords Dance"],"abilities":["Arena Trap"],"teraTypes":["Dark","Fairy","Flying","Ghost","Ground"]},{"role":"Wallbreaker","movepool":["Earthquake","Stone Edge","Sucker Punch","Throat Chop"],"abilities":["Arena Trap"],"teraTypes":["Dark","Fairy","Flying","Ghost","Ground"]}]},"dugtrioalola":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Iron Head","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"abilities":["Sand Force","Tangling Hair"],"teraTypes":["Ground","Steel"]}]},"persian":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["Double-Edge","Gunk Shot","Knock Off","Switcheroo","U-turn"],"abilities":["Limber"],"teraTypes":["Normal","Poison"]},{"role":"Fast Attacker","movepool":["Double-Edge","Fake Out","Knock Off","U-turn"],"abilities":["Technician"],"teraTypes":["Normal"]}]},"persianalola":{"level":86,"sets":[{"role":"Fast Bulky Setup","movepool":["Dark Pulse","Hypnosis","Nasty Plot","Power Gem","Thunderbolt"],"abilities":["Fur Coat"],"teraTypes":["Dark","Electric"]},{"role":"Tera Blast user","movepool":["Dark Pulse","Nasty Plot","Tera Blast","Thunderbolt"],"abilities":["Fur Coat"],"teraTypes":["Fairy","Poison"]}]},"golduck":{"level":90,"sets":[{"role":"Fast Bulky Setup","movepool":["Encore","Grass Knot","Hydro Pump","Ice Beam","Nasty Plot"],"abilities":["Cloud Nine","Swift Swim"],"teraTypes":["Water"]},{"role":"Fast Attacker","movepool":["Flip Turn","Grass Knot","Hydro Pump","Ice Beam","Nasty Plot"],"abilities":["Cloud Nine","Swift Swim"],"teraTypes":["Grass","Water"]}]},"annihilape":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Gunk Shot","Rage Fist","Rest","Taunt"],"abilities":["Defiant"],"teraTypes":["Fairy","Ghost","Steel","Water"]}]},"arcanine":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Morning Sun","Roar","Will-O-Wisp"],"abilities":["Intimidate"],"teraTypes":["Fighting","Normal"]},{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Morning Sun","Wild Charge"],"abilities":["Intimidate"],"teraTypes":["Fighting","Normal"]}]},"arcaninehisui":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Head Smash","Wild Charge"],"abilities":["Rock Head"],"teraTypes":["Fire","Normal","Rock"]},{"role":"Bulky Attacker","movepool":["Extreme Speed","Flare Blitz","Head Smash","Morning Sun"],"abilities":["Rock Head"],"teraTypes":["Fire","Grass","Normal","Rock"]}]},"poliwrath":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Liquidation","Rain Dance"],"abilities":["Swift Swim"],"teraTypes":["Dark","Fighting","Water"]},{"role":"AV Pivot","movepool":["Circle Throw","Close Combat","Knock Off","Liquidation"],"abilities":["Water Absorb"],"teraTypes":["Dark","Fighting","Steel"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Ice Punch","Knock Off","Liquidation","Poison Jab"],"abilities":["Water Absorb"],"teraTypes":["Fighting","Steel","Water"]}]},"victreebel":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["Poison Jab","Power Whip","Sucker Punch","Swords Dance"],"abilities":["Chlorophyll"],"teraTypes":["Dark","Grass"]},{"role":"Wallbreaker","movepool":["Knock Off","Power Whip","Sleep Powder","Sludge Wave","Strength Sap","Sucker Punch"],"abilities":["Chlorophyll"],"teraTypes":["Grass","Steel"]},{"role":"Fast Attacker","movepool":["Power Whip","Sludge Wave","Sunny Day","Weather Ball"],"abilities":["Chlorophyll"],"teraTypes":["Fire"]}]},"tentacruel":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Flip Turn","Haze","Knock Off","Rapid Spin","Sludge Bomb","Surf","Toxic","Toxic Spikes"],"abilities":["Liquid Ooze"],"teraTypes":["Flying","Grass"]}]},"golem":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Explosion","Rock Polish","Stealth Rock","Stone Edge"],"abilities":["Sturdy"],"teraTypes":["Grass","Ground","Steel"]}]},"golemalola":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["Double-Edge","Earthquake","Rock Polish","Stone Edge"],"abilities":["Galvanize"],"teraTypes":["Flying","Grass"]},{"role":"Wallbreaker","movepool":["Double-Edge","Earthquake","Explosion","Stone Edge"],"abilities":["Galvanize"],"teraTypes":["Electric","Grass","Ground"]}]},"slowbro":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Psychic Noise","Psyshock","Scald","Slack Off","Thunder Wave"],"abilities":["Regenerator"],"teraTypes":["Fairy","Water"]},{"role":"AV Pivot","movepool":["Body Press","Fire Blast","Future Sight","Ice Beam","Psychic Noise","Scald"],"abilities":["Regenerator"],"teraTypes":["Fairy","Fighting"]},{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Scald","Slack Off"],"abilities":["Regenerator"],"teraTypes":["Fighting"]}]},"slowbrogalar":{"level":87,"sets":[{"role":"AV Pivot","movepool":["Earthquake","Fire Blast","Foul Play","Psychic","Shell Side Arm","Surf"],"abilities":["Regenerator"],"teraTypes":["Dark","Ground","Poison","Water"]},{"role":"Wallbreaker","movepool":["Fire Blast","Psychic","Shell Side Arm","Trick Room"],"abilities":["Regenerator"],"teraTypes":["Poison","Psychic"]},{"role":"Bulky Attacker","movepool":["Earthquake","Fire Blast","Psychic","Shell Side Arm","Slack Off","Thunder Wave"],"abilities":["Regenerator"],"teraTypes":["Dark","Ground","Poison"]}]},"dodrio":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["Brave Bird","Double-Edge","Drill Run","Knock Off","Swords Dance"],"abilities":["Early Bird"],"teraTypes":["Flying","Ground","Normal"]}]},"dewgong":{"level":94,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Flip Turn","Knock Off","Surf","Triple Axel"],"abilities":["Thick Fat"],"teraTypes":["Dragon","Grass","Ground","Poison","Steel"]},{"role":"Bulky Support","movepool":["Encore","Flip Turn","Hydro Pump","Ice Beam","Knock Off","Surf"],"abilities":["Thick Fat"],"teraTypes":["Dragon","Grass","Ground","Poison","Steel"]}]},"muk":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Drain Punch","Gunk Shot","Haze","Ice Punch","Knock Off","Poison Jab","Shadow Sneak","Toxic Spikes"],"abilities":["Poison Touch"],"teraTypes":["Dark"]},{"role":"AV Pivot","movepool":["Drain Punch","Gunk Shot","Ice Punch","Knock Off","Poison Jab","Shadow Sneak"],"abilities":["Poison Touch"],"teraTypes":["Dark"]}]},"mukalola":{"level":82,"sets":[{"role":"AV Pivot","movepool":["Drain Punch","Gunk Shot","Ice Punch","Knock Off","Poison Jab","Shadow Sneak"],"abilities":["Poison Touch"],"teraTypes":["Dark"]}]},"cloyster":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Drill Run","Icicle Spear","Rock Blast","Shell Smash"],"abilities":["Skill Link"],"teraTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Hydro Pump","Icicle Spear","Rock Blast","Shell Smash"],"abilities":["Skill Link"],"teraTypes":["Ice","Rock"]}]},"gengar":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Focus Blast","Nasty Plot","Shadow Ball","Sludge Wave","Trick"],"abilities":["Cursed Body"],"teraTypes":["Dark","Fighting","Ghost"]},{"role":"Fast Attacker","movepool":["Encore","Focus Blast","Shadow Ball","Sludge Wave","Toxic Spikes","Will-O-Wisp"],"abilities":["Cursed Body"],"teraTypes":["Dark","Fighting","Ghost"]}]},"hypno":{"level":95,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Psychic Noise","Thunder Wave","Toxic"],"abilities":["Insomnia"],"teraTypes":["Dark","Fairy","Steel"]},{"role":"Bulky Attacker","movepool":["Focus Blast","Protect","Psychic Noise","Toxic"],"abilities":["Insomnia"],"teraTypes":["Dark","Fighting","Steel"]}]},"electrode":{"level":92,"sets":[{"role":"Fast Support","movepool":["Explosion","Foul Play","Taunt","Thunder Wave","Thunderbolt","Volt Switch"],"abilities":["Aftermath","Soundproof","Static"],"teraTypes":["Dark","Electric"]},{"role":"Tera Blast user","movepool":["Taunt","Tera Blast","Thunderbolt","Volt Switch"],"abilities":["Aftermath","Soundproof","Static"],"teraTypes":["Ice"]}]},"electrodehisui":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Giga Drain","Leaf Storm","Taunt","Thunder Wave","Thunderbolt","Volt Switch"],"abilities":["Aftermath","Soundproof","Static"],"teraTypes":["Electric","Grass"]},{"role":"Fast Support","movepool":["Giga Drain","Leech Seed","Substitute","Thunderbolt"],"abilities":["Soundproof"],"teraTypes":["Poison"]}]},"exeggutor":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Leech Seed","Psychic","Psychic Noise","Sleep Powder","Sludge Bomb","Substitute"],"abilities":["Harvest"],"teraTypes":["Steel"]},{"role":"Bulky Attacker","movepool":["Leech Seed","Protect","Psychic Noise","Substitute"],"abilities":["Harvest"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Giga Drain","Psychic","Psyshock","Substitute"],"abilities":["Harvest"],"teraTypes":["Steel"]}]},"exeggutoralola":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["Draco Meteor","Flamethrower","Giga Drain","Leaf Storm"],"abilities":["Frisk"],"teraTypes":["Fire"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Dragon Tail","Flamethrower","Knock Off","Moonlight","Sleep Powder","Stun Spore","Wood Hammer"],"abilities":["Harvest"],"teraTypes":["Fire"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dragon Pulse","Flamethrower","Giga Drain"],"abilities":["Harvest"],"teraTypes":["Fire","Steel"]}]},"hitmonlee":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["High Jump Kick","Knock Off","Mach Punch","Poison Jab","Stone Edge"],"abilities":["Reckless"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Poison Jab","Stone Edge","Swords Dance"],"abilities":["Unburden"],"teraTypes":["Dark","Fighting","Poison"]}]},"hitmonchan":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Drain Punch","Ice Punch","Knock Off","Mach Punch","Rapid Spin","Swords Dance"],"abilities":["Inner Focus","Iron Fist"],"teraTypes":["Dark","Fighting"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Knock Off","Poison Jab","Rapid Spin"],"abilities":["Iron Fist"],"teraTypes":["Dark","Poison","Steel"]}]},"weezing":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Fire Blast","Gunk Shot","Pain Split","Sludge Bomb","Toxic Spikes","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Steel"]}]},"weezinggalar":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Defog","Fire Blast","Gunk Shot","Pain Split","Strange Steam","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Steel"]}]},"rhydon":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Megahorn","Stealth Rock","Stone Edge","Swords Dance"],"abilities":["Lightning Rod"],"teraTypes":["Dragon","Fairy","Flying","Grass","Water"]}]},"scyther":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Bug Bite","Close Combat","Dual Wingbeat","Swords Dance"],"abilities":["Technician"],"teraTypes":["Fighting"]},{"role":"Fast Support","movepool":["Close Combat","Defog","Dual Wingbeat","U-turn"],"abilities":["Technician"],"teraTypes":["Fighting"]}]},"tauros":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Body Slam","Close Combat","Earthquake","Throat Chop"],"abilities":["Sheer Force"],"teraTypes":["Fighting","Ground","Normal"]},{"role":"Wallbreaker","movepool":["Body Slam","Close Combat","Throat Chop","Zen Headbutt"],"abilities":["Sheer Force"],"teraTypes":["Fighting","Normal","Psychic"]}]},"taurospaldeacombat":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Bulk Up","Close Combat","Earthquake","Iron Head","Stone Edge","Throat Chop"],"abilities":["Intimidate"],"teraTypes":["Dark","Fighting","Steel"]}]},"taurospaldeablaze":{"level":81,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Raging Bull","Substitute"],"abilities":["Cud Chew"],"teraTypes":["Water"]},{"role":"Wallbreaker","movepool":["Close Combat","Flare Blitz","Stone Edge","Wild Charge"],"abilities":["Intimidate"],"teraTypes":["Fighting"]}]},"taurospaldeaaqua":{"level":81,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Liquidation","Substitute"],"abilities":["Cud Chew"],"teraTypes":["Steel","Water"]},{"role":"Wallbreaker","movepool":["Aqua Jet","Close Combat","Stone Edge","Wave Crash"],"abilities":["Intimidate"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Aqua Jet","Bulk Up","Close Combat","Liquidation"],"abilities":["Intimidate"],"teraTypes":["Water"]}]},"gyarados":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Stone Edge","Temper Flare","Waterfall"],"abilities":["Intimidate","Moxie"],"teraTypes":["Ground"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Earthquake","Tera Blast","Waterfall"],"abilities":["Intimidate","Moxie"],"teraTypes":["Flying"]}]},"lapras":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Freeze-Dry","Hydro Pump","Ice Beam","Sparkling Aria"],"abilities":["Water Absorb"],"teraTypes":["Ice","Water"]},{"role":"Bulky Attacker","movepool":["Freeze-Dry","Rest","Sleep Talk","Sparkling Aria"],"abilities":["Water Absorb"],"teraTypes":["Dragon","Ghost","Ground","Poison","Steel"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Icicle Spear","Waterfall"],"abilities":["Water Absorb"],"teraTypes":["Ground"]}]},"ditto":{"level":87,"sets":[{"role":"Fast Support","movepool":["Transform"],"abilities":["Imposter"],"teraTypes":["Bug","Dark","Dragon","Electric","Fairy","Fighting","Fire","Flying","Ghost","Grass","Ground","Ice","Normal","Poison","Psychic","Rock","Steel","Water"]}]},"vaporeon":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Flip Turn","Ice Beam","Protect","Scald","Wish"],"abilities":["Water Absorb"],"teraTypes":["Ghost","Ground","Poison"]},{"role":"Bulky Setup","movepool":["Calm Mind","Protect","Scald","Wish"],"abilities":["Water Absorb"],"teraTypes":["Ghost","Ground","Poison"]}]},"jolteon":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Alluring Voice","Calm Mind","Shadow Ball","Thunderbolt","Volt Switch"],"abilities":["Volt Absorb"],"teraTypes":["Electric","Fairy"]},{"role":"Tera Blast user","movepool":["Calm Mind","Substitute","Tera Blast","Thunderbolt"],"abilities":["Volt Absorb"],"teraTypes":["Ice"]}]},"flareon":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Facade","Flare Blitz","Quick Attack","Trailblaze","Will-O-Wisp"],"abilities":["Guts"],"teraTypes":["Normal"]}]},"snorlax":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Curse","Rest","Sleep Talk"],"abilities":["Thick Fat"],"teraTypes":["Fairy","Poison"]},{"role":"Bulky Setup","movepool":["Body Slam","Crunch","Curse","Earthquake","Rest"],"abilities":["Thick Fat"],"teraTypes":["Ground","Poison"]}]},"articuno":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Freeze-Dry","Haze","Roost","Substitute","U-turn"],"abilities":["Pressure"],"teraTypes":["Ground","Steel"]}]},"articunogalar":{"level":84,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Freezing Glare","Hurricane","Recover"],"abilities":["Competitive"],"teraTypes":["Steel"]}]},"zapdos":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Discharge","Heat Wave","Hurricane","Roost","Thunderbolt","U-turn"],"abilities":["Static"],"teraTypes":["Electric","Steel"]}]},"zapdosgalar":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Bulk Up","Close Combat","Knock Off","U-turn"],"abilities":["Defiant"],"teraTypes":["Dark","Fighting","Steel"]}]},"moltres":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Fire Blast","Roost","Scorching Sands","U-turn","Will-O-Wisp"],"abilities":["Flame Body"],"teraTypes":["Dragon","Ground","Steel"]}]},"moltresgalar":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["Agility","Fiery Wrath","Hurricane","Nasty Plot","Rest"],"abilities":["Berserk"],"teraTypes":["Dark","Steel"]}]},"dragonite":{"level":74,"sets":[{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Outrage","Roost"],"abilities":["Multiscale"],"teraTypes":["Ground","Steel"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Iron Head","Outrage"],"abilities":["Multiscale"],"teraTypes":["Steel"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Earthquake","Outrage","Tera Blast"],"abilities":["Multiscale"],"teraTypes":["Flying"]}]},"mewtwo":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Aura Sphere","Dark Pulse","Fire Blast","Nasty Plot","Psystrike","Recover"],"abilities":["Unnerve"],"teraTypes":["Dark","Fighting","Fire","Psychic"]}]},"mew":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Psychic","Psychic Noise","Stealth Rock","Toxic Spikes","U-turn","Will-O-Wisp"],"abilities":["Synchronize"],"teraTypes":["Dark","Fairy","Steel"]},{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Leech Life","Psychic Fangs","Swords Dance"],"abilities":["Synchronize"],"teraTypes":["Fighting"]},{"role":"Fast Bulky Setup","movepool":["Aura Sphere","Bug Buzz","Dark Pulse","Earth Power","Fire Blast","Hydro Pump","Nasty Plot","Psychic","Psyshock"],"abilities":["Synchronize"],"teraTypes":["Dark","Fighting","Fire","Ground","Psychic","Water"]}]},"meganium":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Dragon Tail","Encore","Energy Ball","Knock Off","Leech Seed","Synthesis"],"abilities":["Overgrow"],"teraTypes":["Poison","Steel","Water"]},{"role":"Setup Sweeper","movepool":["Earthquake","Knock Off","Petal Blizzard","Swords Dance"],"abilities":["Overgrow"],"teraTypes":["Ground","Steel","Water"]}]},"typhlosion":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Eruption","Fire Blast","Focus Blast","Scorching Sands"],"abilities":["Flash Fire"],"teraTypes":["Fire"]}]},"typhlosionhisui":{"level":83,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Fire Blast","Focus Blast","Shadow Ball","Substitute","Will-O-Wisp"],"abilities":["Blaze"],"teraTypes":["Fighting","Fire","Ghost"]},{"role":"Fast Attacker","movepool":["Eruption","Fire Blast","Focus Blast","Shadow Ball"],"abilities":["Blaze"],"teraTypes":["Fire"]}]},"feraligatr":{"level":79,"sets":[{"role":"Fast Bulky Setup","movepool":["Crunch","Dragon Dance","Ice Punch","Liquidation"],"abilities":["Sheer Force"],"teraTypes":["Dark","Dragon","Steel","Water"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Ice Punch","Liquidation","Trailblaze"],"abilities":["Sheer Force"],"teraTypes":["Grass","Water"]}]},"furret":{"level":94,"sets":[{"role":"Wallbreaker","movepool":["Double-Edge","Knock Off","Trick","U-turn"],"abilities":["Frisk"],"teraTypes":["Ghost","Normal"]},{"role":"Setup Sweeper","movepool":["Brick Break","Double-Edge","Knock Off","Tidy Up"],"abilities":["Frisk"],"teraTypes":["Ghost","Normal"]}]},"noctowl":{"level":95,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Defog","Hurricane","Hyper Voice","Nasty Plot","Roost"],"abilities":["Tinted Lens"],"teraTypes":["Ground","Normal","Steel"]}]},"ariados":{"level":95,"sets":[{"role":"Fast Support","movepool":["Knock Off","Megahorn","Poison Jab","Sticky Web","Sucker Punch","Toxic Spikes"],"abilities":["Insomnia","Swarm"],"teraTypes":["Ghost","Steel"]}]},"lanturn":{"level":89,"sets":[{"role":"Fast Support","movepool":["Scald","Thunder Wave","Thunderbolt","Volt Switch"],"abilities":["Volt Absorb"],"teraTypes":["Flying"]},{"role":"Bulky Attacker","movepool":["Ice Beam","Scald","Thunder Wave","Thunderbolt","Volt Switch"],"abilities":["Volt Absorb"],"teraTypes":["Flying","Water"]}]},"ampharos":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Agility","Dazzling Gleam","Focus Blast","Thunderbolt","Volt Switch"],"abilities":["Static"],"teraTypes":["Electric","Fairy"]},{"role":"AV Pivot","movepool":["Dazzling Gleam","Discharge","Focus Blast","Thunderbolt","Volt Switch"],"abilities":["Static"],"teraTypes":["Fairy"]}]},"bellossom":{"level":84,"sets":[{"role":"Fast Bulky Setup","movepool":["Giga Drain","Quiver Dance","Sleep Powder","Strength Sap"],"abilities":["Chlorophyll"],"teraTypes":["Poison","Steel","Water"]},{"role":"Bulky Setup","movepool":["Giga Drain","Moonblast","Quiver Dance","Sludge Bomb","Strength Sap"],"abilities":["Chlorophyll"],"teraTypes":["Fairy","Poison"]},{"role":"Tera Blast user","movepool":["Giga Drain","Quiver Dance","Strength Sap","Tera Blast"],"abilities":["Chlorophyll"],"teraTypes":["Fire","Rock"]}]},"azumarill":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Aqua Jet","Belly Drum","Ice Spinner","Knock Off","Liquidation","Play Rough","Superpower"],"abilities":["Huge Power"],"teraTypes":["Water"]}]},"sudowoodo":{"level":94,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Head Smash","Stealth Rock","Sucker Punch","Wood Hammer"],"abilities":["Rock Head"],"teraTypes":["Grass","Rock"]}]},"politoed":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Haze","Hydro Pump","Hypnosis","Ice Beam","Rest","Surf"],"abilities":["Drizzle"],"teraTypes":["Steel","Water"]},{"role":"Fast Attacker","movepool":["Focus Blast","Hydro Pump","Ice Beam","Weather Ball"],"abilities":["Drizzle"],"teraTypes":["Water"]}]},"jumpluff":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Acrobatics","Leech Seed","Strength Sap","Substitute"],"abilities":["Infiltrator"],"teraTypes":["Steel"]},{"role":"Fast Support","movepool":["Acrobatics","Encore","Sleep Powder","Strength Sap","U-turn"],"abilities":["Infiltrator"],"teraTypes":["Steel"]}]},"sunflora":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Earth Power","Leaf Storm","Sludge Bomb"],"abilities":["Chlorophyll"],"teraTypes":["Fairy","Grass","Ground","Poison"]},{"role":"Setup Sweeper","movepool":["Earth Power","Solar Beam","Sunny Day","Weather Ball"],"abilities":["Chlorophyll"],"teraTypes":["Fire"]}]},"quagsire":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ice Beam","Recover","Spikes","Toxic"],"abilities":["Unaware"],"teraTypes":["Fairy","Poison","Steel"]}]},"clodsire":{"level":81,"sets":[{"role":"Bulky Support","movepool":["Curse","Earthquake","Gunk Shot","Poison Jab","Recover","Stealth Rock","Toxic","Toxic Spikes"],"abilities":["Unaware","Water Absorb"],"teraTypes":["Flying","Steel"]}]},"espeon":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Alluring Voice","Calm Mind","Morning Sun","Psychic","Psyshock","Shadow Ball","Trick"],"abilities":["Magic Bounce"],"teraTypes":["Fairy","Psychic"]}]},"umbreon":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Protect","Toxic","Wish"],"abilities":["Synchronize"],"teraTypes":["Poison"]}]},"slowking":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Chilly Reception","Psychic Noise","Psyshock","Scald","Slack Off","Thunder Wave"],"abilities":["Regenerator"],"teraTypes":["Dragon","Fairy"]},{"role":"Fast Support","movepool":["Chilly Reception","Future Sight","Scald","Slack Off"],"abilities":["Regenerator"],"teraTypes":["Dragon","Fairy"]}]},"slowkinggalar":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Chilly Reception","Fire Blast","Psychic Noise","Psyshock","Slack Off","Sludge Bomb","Thunder Wave","Toxic Spikes"],"abilities":["Regenerator"],"teraTypes":["Dark","Poison"]},{"role":"AV Pivot","movepool":["Fire Blast","Future Sight","Psychic Noise","Sludge Bomb","Surf"],"abilities":["Regenerator"],"teraTypes":["Poison","Psychic","Water"]}]},"misdreavus":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Shadow Ball","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Fairy"]}]},"girafarig":{"level":89,"sets":[{"role":"Bulky Setup","movepool":["Dazzling Gleam","Nasty Plot","Psychic","Psyshock","Shadow Ball","Thunderbolt"],"abilities":["Sap Sipper"],"teraTypes":["Electric","Fairy","Psychic"]},{"role":"Fast Bulky Setup","movepool":["Hyper Voice","Nasty Plot","Psyshock","Thunderbolt"],"abilities":["Sap Sipper"],"teraTypes":["Electric","Normal"]}]},"forretress":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Iron Head","Rapid Spin","Stealth Rock","Toxic Spikes","Volt Switch"],"abilities":["Sturdy"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Body Press","Iron Head","Rapid Spin","Spikes","Stealth Rock"],"abilities":["Sturdy"],"teraTypes":["Fighting","Water"]}]},"dunsparce":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Coil","Earthquake","Roost"],"abilities":["Serene Grace"],"teraTypes":["Ghost","Ground"]}]},"granbull":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Encore","Play Rough","Thunder Wave"],"abilities":["Intimidate"],"teraTypes":["Ground"]},{"role":"Bulky Support","movepool":["Earthquake","Play Rough","Roar","Thunder Wave"],"abilities":["Intimidate"],"teraTypes":["Ground"]}]},"qwilfish":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Destiny Bond","Gunk Shot","Spikes","Taunt","Thunder Wave","Toxic Spikes","Waterfall"],"abilities":["Intimidate"],"teraTypes":["Dark","Grass"]},{"role":"Fast Support","movepool":["Flip Turn","Gunk Shot","Pain Split","Thunder Wave","Toxic","Toxic Spikes"],"abilities":["Intimidate"],"teraTypes":["Dark","Grass"]}]},"qwilfishhisui":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Crunch","Gunk Shot","Spikes","Taunt","Toxic Spikes"],"abilities":["Intimidate"],"teraTypes":["Flying","Poison"]}]},"overqwil":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Crunch","Gunk Shot","Liquidation","Swords Dance"],"abilities":["Intimidate"],"teraTypes":["Water"]}]},"scizor":{"level":79,"sets":[{"role":"Bulky Support","movepool":["Bullet Punch","Close Combat","Defog","Knock Off","U-turn"],"abilities":["Technician"],"teraTypes":["Dragon","Steel"]},{"role":"Setup Sweeper","movepool":["Bug Bite","Bullet Punch","Close Combat","Knock Off","Swords Dance"],"abilities":["Technician"],"teraTypes":["Steel"]},{"role":"Wallbreaker","movepool":["Bullet Punch","Close Combat","Knock Off","U-turn"],"abilities":["Technician"],"teraTypes":["Steel"]}]},"heracross":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Facade","Knock Off","Trailblaze"],"abilities":["Guts"],"teraTypes":["Normal"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Knock Off","Megahorn","Stone Edge"],"abilities":["Moxie"],"teraTypes":["Bug","Fighting","Rock"]}]},"ursaring":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Earthquake","Rest","Sleep Talk","Throat Chop"],"abilities":["Guts"],"teraTypes":["Ghost","Ground"]},{"role":"Setup Sweeper","movepool":["Close Combat","Crunch","Facade","Swords Dance","Throat Chop"],"abilities":["Quick Feet"],"teraTypes":["Normal"]}]},"magcargo":{"level":95,"sets":[{"role":"Setup Sweeper","movepool":["Earth Power","Fire Blast","Power Gem","Shell Smash"],"abilities":["Weak Armor"],"teraTypes":["Dragon","Grass"]},{"role":"Bulky Support","movepool":["Lava Plume","Power Gem","Recover","Stealth Rock","Yawn"],"abilities":["Flame Body"],"teraTypes":["Dragon","Grass"]}]},"delibird":{"level":100,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Drill Run","Ice Shard","Ice Spinner","Spikes"],"abilities":["Hustle"],"teraTypes":["Flying","Ground","Ice"]},{"role":"Fast Support","movepool":["Brave Bird","Freeze-Dry","Rapid Spin","Spikes"],"abilities":["Insomnia","Vital Spirit"],"teraTypes":["Ghost"]}]},"skarmory":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Brave Bird","Iron Defense","Roost"],"abilities":["Sturdy"],"teraTypes":["Fighting"]},{"role":"Bulky Attacker","movepool":["Body Press","Brave Bird","Roost","Spikes","Stealth Rock"],"abilities":["Sturdy"],"teraTypes":["Dragon","Fighting"]},{"role":"Bulky Support","movepool":["Brave Bird","Roost","Spikes","Stealth Rock","Whirlwind"],"abilities":["Sturdy"],"teraTypes":["Dragon"]}]},"houndoom":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Fire Blast","Nasty Plot","Sludge Bomb","Sucker Punch"],"abilities":["Flash Fire"],"teraTypes":["Dark","Fire","Poison"]}]},"kingdra":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Hurricane","Rain Dance","Wave Crash"],"abilities":["Swift Swim"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Outrage","Waterfall","Wave Crash"],"abilities":["Sniper","Swift Swim"],"teraTypes":["Water"]},{"role":"Fast Bulky Setup","movepool":["Dragon Dance","Iron Head","Outrage","Wave Crash"],"abilities":["Sniper","Swift Swim"],"teraTypes":["Steel"]}]},"donphan":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ice Shard","Ice Spinner","Knock Off","Rapid Spin","Stealth Rock"],"abilities":["Sturdy"],"teraTypes":["Ghost","Grass"]}]},"porygon2":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Discharge","Ice Beam","Recover","Tri Attack"],"abilities":["Download"],"teraTypes":["Electric","Ghost","Poison"]},{"role":"Tera Blast user","movepool":["Recover","Shadow Ball","Tera Blast","Thunder Wave"],"abilities":["Download"],"teraTypes":["Fairy","Fighting"]}]},"smeargle":{"level":95,"sets":[{"role":"Fast Support","movepool":["Ceaseless Edge","Spore","Stealth Rock","Sticky Web","Whirlwind"],"abilities":["Own Tempo"],"teraTypes":["Ghost"]},{"role":"Setup Sweeper","movepool":["Population Bomb","Power Trip","Shell Smash","Spore"],"abilities":["Technician"],"teraTypes":["Normal"]}]},"hitmontop":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Close Combat","Earthquake","Rapid Spin","Stone Edge","Sucker Punch"],"abilities":["Intimidate"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Bulk Up","Close Combat","Rapid Spin","Triple Axel"],"abilities":["Technician"],"teraTypes":["Ice"]}]},"chansey":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Heal Bell","Seismic Toss","Soft-Boiled","Stealth Rock","Thunder Wave"],"abilities":["Natural Cure"],"teraTypes":["Fairy","Ghost","Poison","Steel"]}]},"blissey":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Heal Bell","Seismic Toss","Soft-Boiled","Stealth Rock","Thunder Wave"],"abilities":["Natural Cure"],"teraTypes":["Fairy","Ghost","Poison","Steel"]}]},"raikou":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Scald","Substitute","Thunderbolt"],"abilities":["Pressure"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Calm Mind","Scald","Shadow Ball","Thunderbolt","Volt Switch"],"abilities":["Pressure"],"teraTypes":["Electric","Water"]},{"role":"Tera Blast user","movepool":["Calm Mind","Scald","Substitute","Tera Blast","Thunderbolt"],"abilities":["Pressure"],"teraTypes":["Ice"]}]},"entei":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["Extreme Speed","Flare Blitz","Sacred Fire","Stomping Tantrum"],"abilities":["Inner Focus"],"teraTypes":["Fire","Normal"]},{"role":"Fast Attacker","movepool":["Extreme Speed","Flare Blitz","Sacred Fire","Stone Edge"],"abilities":["Inner Focus"],"teraTypes":["Fire","Normal"]}]},"suicune":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Rest","Scald","Sleep Talk"],"abilities":["Pressure"],"teraTypes":["Dragon","Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Ice Beam","Scald","Substitute"],"abilities":["Pressure"],"teraTypes":["Dragon","Steel"]},{"role":"Fast Support","movepool":["Calm Mind","Protect","Scald","Substitute"],"abilities":["Pressure"],"teraTypes":["Steel"]}]},"tyranitar":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Ice Punch","Knock Off","Stone Edge"],"abilities":["Sand Stream"],"teraTypes":["Ghost","Rock"]},{"role":"Bulky Support","movepool":["Dragon Tail","Earthquake","Ice Beam","Knock Off","Stealth Rock","Stone Edge","Thunder Wave"],"abilities":["Sand Stream"],"teraTypes":["Ghost","Rock"]}]},"lugia":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Aeroblast","Calm Mind","Earth Power","Recover"],"abilities":["Multiscale"],"teraTypes":["Ground","Steel"]}]},"hooh":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Earthquake","Recover","Sacred Fire"],"abilities":["Regenerator"],"teraTypes":["Ground","Steel"]}]},"sceptile":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Focus Blast","Giga Drain","Leaf Storm","Rock Slide","Shed Tail"],"abilities":["Overgrow"],"teraTypes":["Grass","Ground","Steel"]},{"role":"Fast Support","movepool":["Focus Blast","Giga Drain","Leech Seed","Substitute"],"abilities":["Overgrow"],"teraTypes":["Steel"]},{"role":"Setup Sweeper","movepool":["Earthquake","Leaf Blade","Rock Slide","Swords Dance"],"abilities":["Overgrow"],"teraTypes":["Rock"]}]},"blaziken":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Flare Blitz","Knock Off","Protect","Stone Edge","Swords Dance"],"abilities":["Speed Boost"],"teraTypes":["Dark","Fighting"]}]},"swampert":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Flip Turn","Ice Beam","Knock Off","Roar","Stealth Rock","Yawn"],"abilities":["Damp","Torrent"],"teraTypes":["Poison","Steel"]}]},"mightyena":{"level":95,"sets":[{"role":"Bulky Attacker","movepool":["Crunch","Play Rough","Poison Fang","Sucker Punch","Taunt","Throat Chop"],"abilities":["Intimidate"],"teraTypes":["Fairy","Poison"]},{"role":"AV Pivot","movepool":["Crunch","Play Rough","Poison Fang","Sucker Punch","Super Fang","Throat Chop"],"abilities":["Intimidate"],"teraTypes":["Fairy","Poison"]}]},"ludicolo":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["Giga Drain","Hydro Pump","Ice Beam","Rain Dance"],"abilities":["Swift Swim"],"teraTypes":["Grass","Steel","Water"]},{"role":"Fast Attacker","movepool":["Giga Drain","Hydro Pump","Ice Beam","Leaf Storm"],"abilities":["Swift Swim"],"teraTypes":["Grass","Water"]}]},"shiftry":{"level":89,"sets":[{"role":"Fast Support","movepool":["Defog","Knock Off","Leaf Storm","Sucker Punch","Will-O-Wisp"],"abilities":["Wind Rider"],"teraTypes":["Dark","Poison"]},{"role":"Fast Bulky Setup","movepool":["Knock Off","Leaf Blade","Sucker Punch","Swords Dance"],"abilities":["Wind Rider"],"teraTypes":["Dark","Poison"]},{"role":"Setup Sweeper","movepool":["Knock Off","Leaf Blade","Low Kick","Tailwind"],"abilities":["Wind Rider"],"teraTypes":["Dark","Fighting"]}]},"pelipper":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Hurricane","Hydro Pump","Knock Off","Roost","Surf","U-turn"],"abilities":["Drizzle"],"teraTypes":["Ground","Water"]},{"role":"Wallbreaker","movepool":["Hurricane","Hydro Pump","U-turn","Weather Ball"],"abilities":["Drizzle"],"teraTypes":["Flying","Water"]}]},"gardevoir":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Focus Blast","Healing Wish","Moonblast","Mystical Fire","Psychic","Psyshock","Trick"],"abilities":["Trace"],"teraTypes":["Fairy","Fighting","Fire"]}]},"masquerain":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["Bug Buzz","Hurricane","Hydro Pump","Quiver Dance"],"abilities":["Intimidate"],"teraTypes":["Water"]},{"role":"Fast Support","movepool":["Bug Buzz","Hurricane","Hydro Pump","Sticky Web","Stun Spore","U-turn"],"abilities":["Intimidate"],"teraTypes":["Ground","Steel","Water"]}]},"breloom":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Bullet Seed","Mach Punch","Rock Tomb","Spore","Swords Dance"],"abilities":["Technician"],"teraTypes":["Fighting","Rock"]}]},"vigoroth":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Bulk Up","Knock Off","Slack Off"],"abilities":["Vital Spirit"],"teraTypes":["Ghost"]},{"role":"Bulky Attacker","movepool":["Body Slam","Bulk Up","Earthquake","Slack Off"],"abilities":["Vital Spirit"],"teraTypes":["Ground"]}]},"slaking":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Double-Edge","Earthquake","Giga Impact","Knock Off"],"abilities":["Truant"],"teraTypes":["Ghost","Ground","Normal"]}]},"hariyama":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Bullet Punch","Close Combat","Facade","Fake Out","Headlong Rush","Knock Off"],"abilities":["Guts"],"teraTypes":["Normal"]},{"role":"AV Pivot","movepool":["Bullet Punch","Close Combat","Headlong Rush","Heavy Slam","Knock Off","Stone Edge"],"abilities":["Thick Fat"],"teraTypes":["Steel"]}]},"sableye":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Recover","Thunder Wave","Will-O-Wisp"],"abilities":["Prankster"],"teraTypes":["Steel"]}]},"medicham":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Bullet Punch","Close Combat","Ice Punch","Poison Jab","Zen Headbutt"],"abilities":["Pure Power"],"teraTypes":["Fighting"]}]},"plusle":{"level":95,"sets":[{"role":"Setup Sweeper","movepool":["Alluring Voice","Encore","Grass Knot","Nasty Plot","Thunderbolt"],"abilities":["Lightning Rod"],"teraTypes":["Electric","Fairy","Grass"]}]},"minun":{"level":95,"sets":[{"role":"Setup Sweeper","movepool":["Alluring Voice","Encore","Grass Knot","Nasty Plot","Thunderbolt"],"abilities":["Volt Absorb"],"teraTypes":["Electric","Fairy","Grass"]}]},"volbeat":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Encore","Roost","Thunder Wave","U-turn"],"abilities":["Prankster"],"teraTypes":["Steel","Water"]},{"role":"Bulky Attacker","movepool":["Encore","Lunge","Roost","Thunder Wave"],"abilities":["Prankster"],"teraTypes":["Steel","Water"]}]},"illumise":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Bug Buzz","Encore","Roost","Thunder Wave"],"abilities":["Prankster"],"teraTypes":["Steel","Water"]}]},"swalot":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Clear Smog","Earthquake","Encore","Ice Beam","Knock Off","Pain Split","Sludge Bomb","Toxic Spikes"],"abilities":["Liquid Ooze"],"teraTypes":["Dark"]},{"role":"Bulky Support","movepool":["Earthquake","Protect","Sludge Bomb","Toxic"],"abilities":["Liquid Ooze"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Earthquake","Gunk Shot","Knock Off","Swords Dance"],"abilities":["Liquid Ooze"],"teraTypes":["Dark","Ground"]}]},"camerupt":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Overheat","Roar","Stealth Rock","Will-O-Wisp"],"abilities":["Solid Rock"],"teraTypes":["Grass","Water"]}]},"torkoal":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Lava Plume","Rapid Spin","Solar Beam","Stealth Rock","Yawn"],"abilities":["Drought"],"teraTypes":["Grass"]},{"role":"Bulky Support","movepool":["Lava Plume","Rapid Spin","Solar Beam","Stealth Rock","Yawn"],"abilities":["Drought"],"teraTypes":["Dragon","Grass"]}]},"grumpig":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["Dazzling Gleam","Earth Power","Nasty Plot","Psychic","Psyshock","Shadow Ball"],"abilities":["Thick Fat"],"teraTypes":["Fairy","Ghost","Ground","Psychic"]},{"role":"Bulky Attacker","movepool":["Earth Power","Focus Blast","Psychic","Psyshock","Shadow Ball","Trick"],"abilities":["Thick Fat"],"teraTypes":["Fighting","Ghost","Ground","Psychic"]}]},"flygon":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Dragon Dance","Earthquake","Outrage","Stone Edge","U-turn"],"abilities":["Levitate"],"teraTypes":["Ground","Rock","Steel"]}]},"cacturne":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["Focus Blast","Knock Off","Leaf Storm","Spikes","Sucker Punch","Toxic Spikes"],"abilities":["Water Absorb"],"teraTypes":["Dark","Grass","Poison"]},{"role":"Setup Sweeper","movepool":["Drain Punch","Knock Off","Seed Bomb","Sucker Punch","Swords Dance"],"abilities":["Water Absorb"],"teraTypes":["Dark","Poison"]}]},"altaria":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Defog","Earthquake","Haze","Roost","Will-O-Wisp"],"abilities":["Natural Cure"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Brave Bird","Dragon Dance","Earthquake","Roost"],"abilities":["Natural Cure"],"teraTypes":["Ground","Steel"]}]},"zangoose":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Facade","Knock Off","Quick Attack","Swords Dance"],"abilities":["Toxic Boost"],"teraTypes":["Normal"]}]},"seviper":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flamethrower","Giga Drain","Glare","Gunk Shot","Knock Off","Switcheroo"],"abilities":["Infiltrator"],"teraTypes":["Dark","Fire","Grass","Ground","Poison"]},{"role":"Setup Sweeper","movepool":["Earthquake","Gunk Shot","Swords Dance","Trailblaze"],"abilities":["Infiltrator"],"teraTypes":["Grass","Ground"]}]},"whiscash":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Hydro Pump","Ice Beam","Spikes","Stealth Rock"],"abilities":["Oblivious"],"teraTypes":["Poison","Steel"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Liquidation","Stone Edge"],"abilities":["Oblivious"],"teraTypes":["Ground","Steel"]}]},"crawdaunt":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Crabhammer","Dragon Dance","Knock Off"],"abilities":["Adaptability"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Aqua Jet","Crabhammer","Dragon Dance","Knock Off"],"abilities":["Adaptability"],"teraTypes":["Water"]}]},"milotic":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Dragon Tail","Flip Turn","Haze","Ice Beam","Recover","Scald"],"abilities":["Competitive"],"teraTypes":["Dragon","Steel"]}]},"banette":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["Gunk Shot","Poltergeist","Shadow Sneak","Swords Dance","Thunder Wave"],"abilities":["Cursed Body","Frisk"],"teraTypes":["Ghost","Poison"]}]},"tropius":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Air Slash","Leech Seed","Protect","Substitute"],"abilities":["Harvest"],"teraTypes":["Steel"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Dual Wingbeat","Earthquake","Leaf Blade","Synthesis"],"abilities":["Harvest"],"teraTypes":["Ground"]}]},"chimecho":{"level":94,"sets":[{"role":"Bulky Support","movepool":["Encore","Heal Bell","Knock Off","Psychic Noise","Recover","Thunder Wave"],"abilities":["Levitate"],"teraTypes":["Dark","Electric","Poison","Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Psychic","Psychic Noise","Psyshock","Recover"],"abilities":["Levitate"],"teraTypes":["Electric","Fairy","Poison","Steel"]},{"role":"Bulky Attacker","movepool":["Cosmic Power","Dazzling Gleam","Recover","Stored Power"],"abilities":["Levitate"],"teraTypes":["Steel"]}]},"glalie":{"level":96,"sets":[{"role":"Fast Support","movepool":["Disable","Earthquake","Freeze-Dry","Spikes","Taunt"],"abilities":["Inner Focus"],"teraTypes":["Ghost","Ground","Water"]}]},"luvdisc":{"level":100,"sets":[{"role":"Fast Support","movepool":["Endeavor","Substitute","Surf","Whirlpool"],"abilities":["Swift Swim"],"teraTypes":["Ghost","Ground"]}]},"salamence":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Dual Wingbeat","Earthquake","Outrage","Roost"],"abilities":["Intimidate","Moxie"],"teraTypes":["Dragon","Ground","Steel"]}]},"metagross":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["Agility","Earthquake","Heavy Slam","Knock Off","Psychic Fangs"],"abilities":["Clear Body"],"teraTypes":["Ground"]},{"role":"Bulky Support","movepool":["Bullet Punch","Earthquake","Heavy Slam","Knock Off","Psychic Fangs","Stealth Rock"],"abilities":["Clear Body"],"teraTypes":["Water"]}]},"regirock":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Iron Defense","Stealth Rock","Stone Edge","Thunder Wave"],"abilities":["Clear Body"],"teraTypes":["Fighting"]},{"role":"Bulky Setup","movepool":["Body Press","Curse","Iron Defense","Rest","Stone Edge"],"abilities":["Clear Body"],"teraTypes":["Fighting"]}]},"regice":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Ice Beam","Rest","Sleep Talk","Thunder Wave","Thunderbolt"],"abilities":["Clear Body"],"teraTypes":["Electric"]}]},"registeel":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Iron Head","Rest"],"abilities":["Clear Body"],"teraTypes":["Fighting"]},{"role":"Bulky Support","movepool":["Body Press","Iron Defense","Iron Head","Stealth Rock","Thunder Wave"],"abilities":["Clear Body"],"teraTypes":["Fighting"]}]},"latias":{"level":79,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Draco Meteor","Psyshock","Recover"],"abilities":["Levitate"],"teraTypes":["Steel"]}]},"latios":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Draco Meteor","Psyshock","Recover"],"abilities":["Levitate"],"teraTypes":["Steel"]},{"role":"Fast Attacker","movepool":["Aura Sphere","Calm Mind","Draco Meteor","Flip Turn","Luster Purge"],"abilities":["Levitate"],"teraTypes":["Dragon","Psychic","Steel"]}]},"kyogre":{"level":71,"sets":[{"role":"Fast Attacker","movepool":["Ice Beam","Origin Pulse","Thunder","Water Spout"],"abilities":["Drizzle"],"teraTypes":["Water"]},{"role":"Bulky Setup","movepool":["Calm Mind","Ice Beam","Origin Pulse","Thunder"],"abilities":["Drizzle"],"teraTypes":["Dragon","Electric","Steel"]}]},"groudon":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Heat Crash","Precipice Blades","Roar","Spikes","Stealth Rock","Stone Edge","Thunder Wave","Will-O-Wisp"],"abilities":["Drought"],"teraTypes":["Fire"]},{"role":"Bulky Setup","movepool":["Heat Crash","Precipice Blades","Stone Edge","Swords Dance","Thunder Wave"],"abilities":["Drought"],"teraTypes":["Fire"]}]},"rayquaza":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Ascent","Dragon Dance","Earthquake","Outrage"],"abilities":["Air Lock"],"teraTypes":["Flying","Steel"]},{"role":"Fast Attacker","movepool":["Dragon Ascent","Earthquake","Extreme Speed","Swords Dance","U-turn"],"abilities":["Air Lock"],"teraTypes":["Normal"]},{"role":"Fast Bulky Setup","movepool":["Dragon Ascent","Earthquake","Scale Shot","Swords Dance"],"abilities":["Air Lock"],"teraTypes":["Dragon","Flying","Steel"]}]},"jirachi":{"level":80,"sets":[{"role":"Fast Support","movepool":["Body Slam","Iron Head","Protect","Wish"],"abilities":["Serene Grace"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Body Slam","Drain Punch","Iron Head","Stealth Rock","U-turn"],"abilities":["Serene Grace"],"teraTypes":["Fighting","Water"]},{"role":"Bulky Support","movepool":["Healing Wish","Iron Head","Protect","Psychic","U-turn","Wish"],"abilities":["Serene Grace"],"teraTypes":["Water"]}]},"deoxys":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Extreme Speed","Knock Off","Psycho Boost","Superpower"],"abilities":["Pressure"],"teraTypes":["Fighting","Normal","Psychic"]},{"role":"Wallbreaker","movepool":["Ice Beam","Knock Off","Psycho Boost","Superpower"],"abilities":["Pressure"],"teraTypes":["Fighting","Psychic"]}]},"deoxysattack":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Extreme Speed","Knock Off","Psycho Boost","Superpower"],"abilities":["Pressure"],"teraTypes":["Fighting","Normal","Psychic"]},{"role":"Wallbreaker","movepool":["Ice Beam","Knock Off","Psycho Boost","Superpower"],"abilities":["Pressure"],"teraTypes":["Fighting","Psychic"]}]},"deoxysdefense":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Cosmic Power","Night Shade","Recover","Stored Power"],"abilities":["Pressure"],"teraTypes":["Steel"]},{"role":"Bulky Support","movepool":["Knock Off","Psychic Noise","Recover","Spikes","Stealth Rock","Teleport"],"abilities":["Pressure"],"teraTypes":["Dark","Fairy","Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dark Pulse","Focus Blast","Psychic","Psychic Noise","Psyshock","Recover"],"abilities":["Pressure"],"teraTypes":["Dark","Fighting","Steel"]}]},"deoxysspeed":{"level":82,"sets":[{"role":"Fast Support","movepool":["Knock Off","Psycho Boost","Spikes","Stealth Rock","Superpower","Taunt"],"abilities":["Pressure"],"teraTypes":["Dark","Fighting","Ghost","Steel"]},{"role":"Setup Sweeper","movepool":["Dark Pulse","Focus Blast","Nasty Plot","Psycho Boost"],"abilities":["Pressure"],"teraTypes":["Dark","Fighting","Psychic"]}]},"torterra":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["Bullet Seed","Headlong Rush","Rock Blast","Shell Smash"],"abilities":["Overgrow"],"teraTypes":["Grass","Ground","Rock","Water"]}]},"infernape":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Grass Knot","Gunk Shot","Knock Off","Mach Punch","Overheat","Stone Edge"],"abilities":["Blaze","Iron Fist"],"teraTypes":["Dark","Fighting","Fire"]},{"role":"Fast Support","movepool":["Close Combat","Flare Blitz","Gunk Shot","Knock Off","Mach Punch","Stone Edge","Swords Dance","U-turn"],"abilities":["Blaze","Iron Fist"],"teraTypes":["Dark","Fighting","Fire"]}]},"empoleon":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Flip Turn","Ice Beam","Knock Off","Roar","Roost","Stealth Rock","Surf","Yawn"],"abilities":["Competitive"],"teraTypes":["Flying","Grass"]}]},"staraptor":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Close Combat","Double-Edge","Quick Attack","U-turn"],"abilities":["Reckless"],"teraTypes":["Fighting","Flying"]}]},"kricketune":{"level":99,"sets":[{"role":"Fast Support","movepool":["Knock Off","Pounce","Sticky Web","Swords Dance","Taunt"],"abilities":["Technician"],"teraTypes":["Ghost"]}]},"luxray":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Facade","Play Rough","Supercell Slam","Throat Chop","Trailblaze"],"abilities":["Guts"],"teraTypes":["Normal"]},{"role":"AV Pivot","movepool":["Ice Fang","Play Rough","Throat Chop","Volt Switch","Wild Charge"],"abilities":["Intimidate"],"teraTypes":["Electric","Fairy"]}]},"rampardos":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Fire Punch","Head Smash","Rock Slide"],"abilities":["Sheer Force"],"teraTypes":["Ground","Rock"]},{"role":"Wallbreaker","movepool":["Earthquake","Fire Punch","Rock Slide","Zen Headbutt"],"abilities":["Sheer Force"],"teraTypes":["Psychic","Rock"]}]},"bastiodon":{"level":89,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Foul Play","Iron Defense","Rest"],"abilities":["Soundproof"],"teraTypes":["Fighting"]}]},"vespiquen":{"level":98,"sets":[{"role":"Bulky Support","movepool":["Air Slash","Hurricane","Roost","Spikes","Toxic","Toxic Spikes","U-turn"],"abilities":["Pressure"],"teraTypes":["Steel"]}]},"pachirisu":{"level":96,"sets":[{"role":"AV Pivot","movepool":["Nuzzle","Super Fang","Thunderbolt","U-turn"],"abilities":["Volt Absorb"],"teraTypes":["Flying"]},{"role":"Fast Support","movepool":["Discharge","Encore","Super Fang","U-turn"],"abilities":["Volt Absorb"],"teraTypes":["Flying"]}]},"floatzel":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["Crunch","Flip Turn","Ice Spinner","Wave Crash"],"abilities":["Water Veil"],"teraTypes":["Water"]},{"role":"Bulky Setup","movepool":["Bulk Up","Crunch","Ice Spinner","Wave Crash"],"abilities":["Water Veil"],"teraTypes":["Dark","Steel","Water"]}]},"gastrodon":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Clear Smog","Earthquake","Ice Beam","Recover","Stealth Rock","Surf"],"abilities":["Storm Drain"],"teraTypes":["Poison","Steel"]},{"role":"Bulky Support","movepool":["Earthquake","Recover","Sludge Bomb","Stealth Rock","Surf"],"abilities":["Storm Drain"],"teraTypes":["Poison"]}]},"ambipom":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Double-Edge","Knock Off","Low Kick","Triple Axel","U-turn"],"abilities":["Technician"],"teraTypes":["Ice"]},{"role":"Wallbreaker","movepool":["Double-Edge","Fake Out","Knock Off","Low Kick","U-turn"],"abilities":["Technician"],"teraTypes":["Normal"]}]},"drifblim":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Calm Mind","Defog","Shadow Ball","Strength Sap"],"abilities":["Aftermath","Unburden"],"teraTypes":["Fairy","Ghost"]}]},"mismagius":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Energy Ball","Mystical Fire","Shadow Ball","Thunderbolt","Trick"],"abilities":["Levitate"],"teraTypes":["Electric","Fairy","Fire","Ghost"]},{"role":"Setup Sweeper","movepool":["Dazzling Gleam","Mystical Fire","Nasty Plot","Shadow Ball","Substitute","Thunderbolt"],"abilities":["Levitate"],"teraTypes":["Electric","Fairy"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Shadow Ball","Substitute","Tera Blast"],"abilities":["Levitate"],"teraTypes":["Fighting"]}]},"honchkrow":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Heat Wave","Sucker Punch","U-turn"],"abilities":["Moxie"],"teraTypes":["Dark","Flying"]},{"role":"Wallbreaker","movepool":["Brave Bird","Heat Wave","Lash Out","Sucker Punch","Thunder Wave"],"abilities":["Moxie"],"teraTypes":["Dark","Flying"]}]},"skuntank":{"level":84,"sets":[{"role":"Fast Support","movepool":["Fire Blast","Gunk Shot","Knock Off","Sucker Punch","Taunt","Toxic Spikes"],"abilities":["Aftermath"],"teraTypes":["Dark","Poison"]}]},"bronzong":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Hypnosis","Iron Head","Psychic","Psychic Noise","Stealth Rock"],"abilities":["Levitate"],"teraTypes":["Electric","Water"]},{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Iron Head","Psychic Noise","Rest"],"abilities":["Levitate"],"teraTypes":["Fighting"]}]},"spiritomb":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Pain Split","Poltergeist","Shadow Sneak","Sucker Punch","Toxic","Will-O-Wisp"],"abilities":["Infiltrator"],"teraTypes":["Dark","Ghost"]}]},"garchomp":{"level":74,"sets":[{"role":"Fast Support","movepool":["Earthquake","Outrage","Spikes","Stealth Rock","Stone Edge"],"abilities":["Rough Skin"],"teraTypes":["Ground","Steel"]},{"role":"Setup Sweeper","movepool":["Earthquake","Fire Fang","Iron Head","Scale Shot","Stone Edge","Swords Dance"],"abilities":["Rough Skin"],"teraTypes":["Fire","Ground","Steel"]}]},"lucario":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Meteor Mash","Stone Edge","Swords Dance"],"abilities":["Justified"],"teraTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["Aura Sphere","Flash Cannon","Focus Blast","Nasty Plot","Vacuum Wave"],"abilities":["Inner Focus"],"teraTypes":["Fighting"]}]},"hippowdon":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Slack Off","Stealth Rock","Stone Edge","Whirlwind"],"abilities":["Sand Stream"],"teraTypes":["Dragon","Rock","Steel"]},{"role":"Bulky Setup","movepool":["Curse","Earthquake","Slack Off","Stone Edge"],"abilities":["Sand Stream"],"teraTypes":["Rock","Steel"]}]},"toxicroak":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Gunk Shot","Knock Off","Sucker Punch","Swords Dance"],"abilities":["Dry Skin"],"teraTypes":["Dark"]},{"role":"Setup Sweeper","movepool":["Close Combat","Earthquake","Gunk Shot","Sucker Punch","Swords Dance"],"abilities":["Dry Skin"],"teraTypes":["Dark","Fighting","Ground"]}]},"lumineon":{"level":93,"sets":[{"role":"Fast Support","movepool":["Alluring Voice","Encore","Hydro Pump","Ice Beam","U-turn"],"abilities":["Storm Drain"],"teraTypes":["Fairy","Water"]}]},"abomasnow":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Aurora Veil","Blizzard","Earthquake","Ice Shard","Wood Hammer"],"abilities":["Snow Warning"],"teraTypes":["Ice","Water"]}]},"weavile":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Ice Shard","Knock Off","Low Kick","Swords Dance","Triple Axel"],"abilities":["Pickpocket"],"teraTypes":["Dark","Fighting","Ice"]}]},"sneasler":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Dire Claw","Gunk Shot","Swords Dance","Throat Chop","U-turn"],"abilities":["Poison Touch"],"teraTypes":["Dark","Fighting"]},{"role":"Setup Sweeper","movepool":["Acrobatics","Close Combat","Gunk Shot","Swords Dance"],"abilities":["Unburden"],"teraTypes":["Flying"]}]},"magnezone":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Body Press","Flash Cannon","Thunderbolt","Volt Switch"],"abilities":["Magnet Pull"],"teraTypes":["Electric","Fighting","Flying","Water"]},{"role":"AV Pivot","movepool":["Discharge","Flash Cannon","Mirror Coat","Thunderbolt","Volt Switch"],"abilities":["Analytic","Magnet Pull"],"teraTypes":["Flying","Water"]},{"role":"Bulky Setup","movepool":["Body Press","Discharge","Flash Cannon","Iron Defense","Thunderbolt"],"abilities":["Magnet Pull"],"teraTypes":["Fighting"]}]},"rhyperior":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Earthquake","Ice Punch","Megahorn","Rock Polish","Stone Edge"],"abilities":["Solid Rock"],"teraTypes":["Bug","Ground","Rock"]},{"role":"Bulky Attacker","movepool":["Dragon Tail","Earthquake","Ice Punch","Megahorn","Stone Edge"],"abilities":["Solid Rock"],"teraTypes":["Bug","Dragon","Grass","Steel"]}]},"electivire":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flamethrower","Ice Punch","Knock Off","Supercell Slam","Volt Switch"],"abilities":["Motor Drive"],"teraTypes":["Dark","Electric","Ground"]},{"role":"Setup Sweeper","movepool":["Bulk Up","Earthquake","Ice Punch","Supercell Slam"],"abilities":["Motor Drive"],"teraTypes":["Flying","Ground"]}]},"magmortar":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Fire Blast","Focus Blast","Knock Off","Scorching Sands","Taunt","Thunderbolt"],"abilities":["Flame Body"],"teraTypes":["Electric","Fighting","Water"]},{"role":"Fast Attacker","movepool":["Earthquake","Fire Blast","Focus Blast","Knock Off","Thunderbolt","Will-O-Wisp"],"abilities":["Flame Body"],"teraTypes":["Electric","Fighting","Water"]}]},"yanmega":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Air Slash","Bug Buzz","Giga Drain","U-turn"],"abilities":["Tinted Lens"],"teraTypes":["Bug"]},{"role":"Fast Attacker","movepool":["Air Slash","Bug Buzz","Hypnosis","U-turn"],"abilities":["Tinted Lens"],"teraTypes":["Bug"]}]},"leafeon":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Double-Edge","Knock Off","Leaf Blade","Substitute","Swords Dance","Synthesis"],"abilities":["Chlorophyll"],"teraTypes":["Dark","Normal"]}]},"glaceon":{"level":94,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Freeze-Dry","Protect","Wish"],"abilities":["Ice Body"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Freeze-Dry","Mud Shot","Protect","Wish"],"abilities":["Ice Body"],"teraTypes":["Ground"]}]},"gliscor":{"level":76,"sets":[{"role":"Fast Support","movepool":["Earthquake","Protect","Substitute","Toxic"],"abilities":["Poison Heal"],"teraTypes":["Water"]},{"role":"Bulky Support","movepool":["Earthquake","Knock Off","Protect","Toxic","Toxic Spikes","U-turn"],"abilities":["Poison Heal"],"teraTypes":["Water"]}]},"mamoswine":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Ice Shard","Icicle Crash","Knock Off","Stealth Rock"],"abilities":["Thick Fat"],"teraTypes":["Ground","Ice"]}]},"porygonz":{"level":83,"sets":[{"role":"Tera Blast user","movepool":["Agility","Nasty Plot","Shadow Ball","Tera Blast"],"abilities":["Adaptability"],"teraTypes":["Fighting"]},{"role":"Fast Attacker","movepool":["Ice Beam","Nasty Plot","Shadow Ball","Thunderbolt","Tri Attack","Trick"],"abilities":["Adaptability","Download"],"teraTypes":["Electric","Ghost"]}]},"gallade":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["Leaf Blade","Night Slash","Psycho Cut","Sacred Sword","Swords Dance"],"abilities":["Sharpness"],"teraTypes":["Dark","Fighting","Grass"]},{"role":"Setup Sweeper","movepool":["Agility","Night Slash","Psycho Cut","Sacred Sword"],"abilities":["Sharpness"],"teraTypes":["Dark","Fighting"]}]},"probopass":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Flash Cannon","Iron Defense","Power Gem","Rest","Thunder Wave"],"abilities":["Magnet Pull"],"teraTypes":["Fighting"]}]},"dusknoir":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Leech Life","Pain Split","Poltergeist","Shadow Sneak","Trick"],"abilities":["Frisk"],"teraTypes":["Ghost","Ground"]},{"role":"Bulky Support","movepool":["Earthquake","Pain Split","Poltergeist","Shadow Sneak","Will-O-Wisp"],"abilities":["Frisk"],"teraTypes":["Dark","Fairy"]},{"role":"Bulky Attacker","movepool":["Focus Punch","Pain Split","Poltergeist","Substitute"],"abilities":["Frisk"],"teraTypes":["Fighting"]}]},"froslass":{"level":87,"sets":[{"role":"Fast Support","movepool":["Destiny Bond","Poltergeist","Spikes","Taunt","Triple Axel","Will-O-Wisp"],"abilities":["Cursed Body"],"teraTypes":["Ghost","Ice"]}]},"rotom":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Nasty Plot","Shadow Ball","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric","Ghost"]}]},"rotomwash":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Hydro Pump","Nasty Plot","Pain Split","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric","Water"]}]},"rotomheat":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Nasty Plot","Overheat","Pain Split","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric","Fire"]}]},"rotomfrost":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Blizzard","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric"]}]},"rotomfan":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric","Steel"]}]},"rotommow":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Leaf Storm","Nasty Plot","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric","Grass"]}]},"uxie":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Psychic Noise","Stealth Rock","Thunder Wave","U-turn","Yawn"],"abilities":["Levitate"],"teraTypes":["Dark","Electric","Steel"]}]},"mesprit":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Dazzling Gleam","Healing Wish","Ice Beam","Nasty Plot","Psychic","Shadow Ball","Thunderbolt","U-turn"],"abilities":["Levitate"],"teraTypes":["Electric","Fairy"]},{"role":"Bulky Support","movepool":["Encore","Knock Off","Psychic Noise","Stealth Rock","Thunder Wave","U-turn"],"abilities":["Levitate"],"teraTypes":["Dark","Electric","Steel"]},{"role":"Bulky Attacker","movepool":["Drain Punch","Ice Beam","Knock Off","Psychic Noise","Thunder Wave","Thunderbolt","U-turn"],"abilities":["Levitate"],"teraTypes":["Dark","Fighting"]}]},"azelf":{"level":82,"sets":[{"role":"Fast Support","movepool":["Encore","Explosion","Fire Blast","Knock Off","Psychic","Stealth Rock","Taunt","U-turn"],"abilities":["Levitate"],"teraTypes":["Dark","Fire"]},{"role":"Fast Attacker","movepool":["Dazzling Gleam","Fire Blast","Nasty Plot","Psychic","Psyshock","Thunderbolt","Trick","U-turn"],"abilities":["Levitate"],"teraTypes":["Electric","Fairy","Fire","Psychic"]}]},"dialga":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Heavy Slam","Stealth Rock","Thunder Wave"],"abilities":["Pressure"],"teraTypes":["Dragon","Flying","Steel"]},{"role":"AV Pivot","movepool":["Draco Meteor","Dragon Tail","Fire Blast","Heavy Slam"],"abilities":["Pressure"],"teraTypes":["Dragon","Flying","Steel"]}]},"dialgaorigin":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Flash Cannon","Heavy Slam","Stealth Rock","Thunder Wave"],"abilities":["Pressure"],"teraTypes":["Dragon","Flying","Steel"]},{"role":"Bulky Attacker","movepool":["Draco Meteor","Dragon Tail","Fire Blast","Flash Cannon","Heavy Slam","Stealth Rock"],"abilities":["Pressure"],"teraTypes":["Dragon","Flying","Steel"]}]},"palkia":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend"],"abilities":["Pressure"],"teraTypes":["Dragon","Fire","Water"]},{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend","Thunder Wave"],"abilities":["Pressure"],"teraTypes":["Dragon","Fire","Water"]}]},"palkiaorigin":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend","Thunder Wave"],"abilities":["Pressure"],"teraTypes":["Dragon","Fire","Water"]}]},"heatran":{"level":79,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Flash Cannon","Heavy Slam","Lava Plume","Magma Storm","Stealth Rock"],"abilities":["Flash Fire"],"teraTypes":["Flying","Grass","Steel"]}]},"regigigas":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Body Slam","Knock Off","Rest","Sleep Talk"],"abilities":["Slow Start"],"teraTypes":["Ghost"]},{"role":"Bulky Attacker","movepool":["Body Slam","Knock Off","Protect","Substitute"],"abilities":["Slow Start"],"teraTypes":["Ghost","Poison"]}]},"giratina":{"level":75,"sets":[{"role":"Fast Support","movepool":["Dragon Tail","Rest","Shadow Ball","Sleep Talk","Will-O-Wisp"],"abilities":["Pressure"],"teraTypes":["Fairy"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dragon Pulse","Rest","Sleep Talk"],"abilities":["Pressure"],"teraTypes":["Fairy"]},{"role":"Bulky Support","movepool":["Defog","Dragon Tail","Rest","Shadow Ball","Will-O-Wisp"],"abilities":["Pressure"],"teraTypes":["Fairy"]}]},"giratinaorigin":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Defog","Draco Meteor","Dragon Tail","Poltergeist","Shadow Sneak","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Dragon","Fairy","Ghost","Steel"]}]},"cresselia":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Moonlight","Psyshock","Thunderbolt"],"abilities":["Levitate"],"teraTypes":["Electric","Fairy","Poison","Steel"]}]},"phione":{"level":91,"sets":[{"role":"Bulky Setup","movepool":["Rest","Scald","Sleep Talk","Take Heart"],"abilities":["Hydration"],"teraTypes":["Dragon","Steel"]},{"role":"Bulky Attacker","movepool":["Grass Knot","Ice Beam","Scald","Take Heart"],"abilities":["Hydration"],"teraTypes":["Grass","Steel"]}]},"manaphy":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Energy Ball","Hydro Pump","Ice Beam","Surf","Tail Glow"],"abilities":["Hydration"],"teraTypes":["Grass","Water"]}]},"darkrai":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Focus Blast","Hypnosis","Nasty Plot","Sludge Bomb","Substitute"],"abilities":["Bad Dreams"],"teraTypes":["Poison"]}]},"shaymin":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Earth Power","Seed Flare","Synthesis"],"abilities":["Natural Cure"],"teraTypes":["Ground","Steel"]},{"role":"Bulky Support","movepool":["Air Slash","Leech Seed","Seed Flare","Substitute"],"abilities":["Natural Cure"],"teraTypes":["Steel"]}]},"shayminsky":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["Air Slash","Earth Power","Healing Wish","Seed Flare"],"abilities":["Serene Grace"],"teraTypes":["Flying","Grass"]},{"role":"Bulky Support","movepool":["Air Slash","Leech Seed","Seed Flare","Substitute"],"abilities":["Serene Grace"],"teraTypes":["Steel"]},{"role":"Bulky Attacker","movepool":["Air Slash","Earth Power","Seed Flare","Synthesis"],"abilities":["Serene Grace"],"teraTypes":["Steel","Water"]}]},"arceus":{"level":68,"sets":[{"role":"Fast Bulky Setup","movepool":["Earthquake","Extreme Speed","Recover","Shadow Claw","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Ghost"]},{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Recover","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Normal"]}]},"arceusbug":{"level":73,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Fire","Ground"]}]},"arceusdark":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Judgment","Recover","Sludge Bomb"],"abilities":["Multitype"],"teraTypes":["Fairy","Poison"]}]},"arceusdragon":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Heavy Slam","Outrage","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Fire"]},{"role":"Bulky Setup","movepool":["Dragon Dance","Flare Blitz","Heavy Slam","Outrage"],"abilities":["Multitype"],"teraTypes":["Fire","Steel"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Recover","Sludge Bomb"],"abilities":["Multitype"],"teraTypes":["Fire"]}]},"arceuselectric":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Ice Beam","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Electric","Ice"]}]},"arceusfairy":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Ground","Steel"]}]},"arceusfighting":{"level":70,"sets":[{"role":"Fast Bulky Setup","movepool":["Body Press","Cosmic Power","Recover","Stored Power"],"abilities":["Multitype"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Recover","Shadow Ball"],"abilities":["Multitype"],"teraTypes":["Steel"]}]},"arceusfire":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Flare Blitz","Recover","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Fire","Ground"]},{"role":"Fast Bulky Setup","movepool":["Dragon Dance","Earthquake","Flare Blitz","Recover"],"abilities":["Multitype"],"teraTypes":["Fire","Ground"]},{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Energy Ball","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Grass","Ground"]}]},"arceusflying":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Ground","Steel"]}]},"arceusghost":{"level":69,"sets":[{"role":"Bulky Support","movepool":["Focus Blast","Judgment","Recover","Will-O-Wisp"],"abilities":["Multitype"],"teraTypes":["Fighting","Normal"]},{"role":"Bulky Setup","movepool":["Calm Mind","Focus Blast","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Fighting","Ghost","Normal"]}]},"arceusgrass":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Earth Power","Ice Beam","Judgment"],"abilities":["Multitype"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Fire"]}]},"arceusground":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Ice Beam","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Dragon","Ground"]},{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Stone Edge","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Normal"]},{"role":"Fast Bulky Setup","movepool":["Dragon Dance","Earthquake","Recover","Stone Edge"],"abilities":["Multitype"],"teraTypes":["Ground","Steel"]}]},"arceusice":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover","Thunderbolt"],"abilities":["Multitype"],"teraTypes":["Electric","Ground"]}]},"arceuspoison":{"level":70,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Flare Blitz","Gunk Shot","Liquidation","Recover","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Ground"]},{"role":"Fast Bulky Setup","movepool":["Earthquake","Extreme Speed","Gunk Shot","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Ground","Normal"]}]},"arceuspsychic":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Cosmic Power","Recover","Stored Power"],"abilities":["Multitype"],"teraTypes":["Steel"]}]},"arceusrock":{"level":74,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Dragon","Ground"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Recover","Stone Edge","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Ground"]}]},"arceussteel":{"level":70,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Judgment","Recover","Will-O-Wisp"],"abilities":["Multitype"],"teraTypes":["Ghost"]},{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Ghost"]}]},"arceuswater":{"level":71,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Ice Beam","Judgment","Recover","Will-O-Wisp"],"abilities":["Multitype"],"teraTypes":["Steel"]}]},"serperior":{"level":79,"sets":[{"role":"Tera Blast user","movepool":["Glare","Leaf Storm","Leech Seed","Substitute","Synthesis","Tera Blast"],"abilities":["Contrary"],"teraTypes":["Fire","Rock"]},{"role":"Fast Attacker","movepool":["Dragon Pulse","Glare","Leaf Storm","Leech Seed","Substitute","Synthesis"],"abilities":["Contrary"],"teraTypes":["Dragon","Grass","Water"]}]},"emboar":{"level":84,"sets":[{"role":"AV Pivot","movepool":["Close Combat","Flare Blitz","Knock Off","Scald","Sucker Punch","Wild Charge"],"abilities":["Reckless"],"teraTypes":["Dark","Electric","Fire","Water"]},{"role":"Fast Attacker","movepool":["Close Combat","Flare Blitz","Head Smash","Knock Off","Wild Charge"],"abilities":["Reckless"],"teraTypes":["Fire"]},{"role":"Setup Sweeper","movepool":["Bulk Up","Drain Punch","Flare Blitz","Trailblaze"],"abilities":["Reckless"],"teraTypes":["Fighting","Grass"]}]},"samurott":{"level":88,"sets":[{"role":"AV Pivot","movepool":["Aqua Jet","Flip Turn","Grass Knot","Hydro Pump","Ice Beam","Knock Off","Megahorn","Sacred Sword"],"abilities":["Torrent"],"teraTypes":["Dark","Grass","Water"]},{"role":"Setup Sweeper","movepool":["Aqua Jet","Knock Off","Liquidation","Megahorn","Sacred Sword","Swords Dance"],"abilities":["Torrent"],"teraTypes":["Dark","Water"]}]},"samurotthisui":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Ceaseless Edge","Flip Turn","Razor Shell","Sacred Sword","Sucker Punch","Swords Dance"],"abilities":["Sharpness"],"teraTypes":["Dark","Poison","Water"]}]},"zebstrika":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["High Horsepower","Overheat","Supercell Slam","Volt Switch"],"abilities":["Sap Sipper"],"teraTypes":["Ground"]}]},"excadrill":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Earthquake","Iron Head","Rapid Spin","Swords Dance"],"abilities":["Mold Breaker","Sand Rush"],"teraTypes":["Grass","Ground","Water"]},{"role":"AV Pivot","movepool":["Earthquake","Iron Head","Rapid Spin","Rock Slide"],"abilities":["Mold Breaker","Sand Rush"],"teraTypes":["Grass","Water"]}]},"gurdurr":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Bulk Up","Defog","Drain Punch","Knock Off","Mach Punch"],"abilities":["Guts"],"teraTypes":["Steel"]}]},"conkeldurr":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Facade","Knock Off","Mach Punch"],"abilities":["Guts"],"teraTypes":["Normal"]}]},"leavanny":{"level":86,"sets":[{"role":"Fast Support","movepool":["Knock Off","Leaf Blade","Lunge","Sticky Web","Swords Dance"],"abilities":["Chlorophyll","Swarm"],"teraTypes":["Ghost","Rock"]}]},"whimsicott":{"level":85,"sets":[{"role":"Fast Support","movepool":["Encore","Giga Drain","Moonblast","Stun Spore","U-turn"],"abilities":["Prankster"],"teraTypes":["Poison","Steel"]},{"role":"Bulky Support","movepool":["Encore","Hurricane","Leech Seed","Moonblast","Substitute"],"abilities":["Prankster"],"teraTypes":["Steel"]}]},"lilligant":{"level":86,"sets":[{"role":"Tera Blast user","movepool":["Giga Drain","Quiver Dance","Sleep Powder","Tera Blast"],"abilities":["Chlorophyll"],"teraTypes":["Fire","Rock"]},{"role":"Setup Sweeper","movepool":["Alluring Voice","Petal Dance","Quiver Dance","Sleep Powder"],"abilities":["Own Tempo"],"teraTypes":["Fairy","Grass"]}]},"lilliganthisui":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Ice Spinner","Leaf Blade","Sleep Powder","Victory Dance"],"abilities":["Hustle"],"teraTypes":["Fighting","Steel"]}]},"basculin":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Double-Edge","Flip Turn","Wave Crash"],"abilities":["Adaptability"],"teraTypes":["Water"]}]},"basculegion":{"level":81,"sets":[{"role":"AV Pivot","movepool":["Aqua Jet","Flip Turn","Shadow Ball","Wave Crash"],"abilities":["Adaptability"],"teraTypes":["Water"]}]},"basculegionf":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["Flip Turn","Hydro Pump","Ice Beam","Shadow Ball"],"abilities":["Adaptability"],"teraTypes":["Water"]},{"role":"AV Pivot","movepool":["Flip Turn","Hydro Pump","Shadow Ball","Wave Crash"],"abilities":["Adaptability"],"teraTypes":["Water"]}]},"krookodile":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Bulk Up","Earthquake","Gunk Shot","Knock Off","Stealth Rock","Stone Edge"],"abilities":["Intimidate"],"teraTypes":["Ground","Poison"]}]},"scrafty":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Knock Off","Rest"],"abilities":["Shed Skin"],"teraTypes":["Poison"]},{"role":"Setup Sweeper","movepool":["Close Combat","Dragon Dance","Knock Off","Poison Jab"],"abilities":["Intimidate"],"teraTypes":["Poison"]}]},"zoroark":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["Dark Pulse","Flamethrower","Focus Blast","Nasty Plot","Psychic","Sludge Bomb","Trick","U-turn"],"abilities":["Illusion"],"teraTypes":["Poison"]}]},"zoroarkhisui":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Bitter Malice","Flamethrower","Focus Blast","Hyper Voice","Nasty Plot","Trick","U-turn"],"abilities":["Illusion"],"teraTypes":["Fighting","Normal"]}]},"cinccino":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Bullet Seed","Tail Slap","Tidy Up","Triple Axel","U-turn"],"abilities":["Technician"],"teraTypes":["Grass","Ice","Normal"]}]},"gothitelle":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Dark Pulse","Focus Blast","Psychic Noise","Thunderbolt"],"abilities":["Shadow Tag"],"teraTypes":["Dark","Electric","Fairy","Fighting","Flying","Ghost","Ground","Steel"]},{"role":"Fast Attacker","movepool":["Dark Pulse","Focus Blast","Psychic","Trick"],"abilities":["Shadow Tag"],"teraTypes":["Dark","Fairy","Fighting","Flying","Ghost","Ground","Psychic","Steel"]}]},"reuniclus":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Focus Blast","Psychic","Psyshock","Recover","Shadow Ball"],"abilities":["Magic Guard"],"teraTypes":["Fighting","Steel"]}]},"swanna":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Defog","Hydro Pump","Knock Off","Roost"],"abilities":["Hydration"],"teraTypes":["Ground"]}]},"sawsbuck":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Double-Edge","High Horsepower","Horn Leech","Swords Dance"],"abilities":["Sap Sipper"],"teraTypes":["Ground","Normal"]},{"role":"Fast Attacker","movepool":["Headbutt","High Horsepower","Horn Leech","Swords Dance"],"abilities":["Serene Grace"],"teraTypes":["Normal"]}]},"amoonguss":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Clear Smog","Giga Drain","Sludge Bomb","Spore","Toxic"],"abilities":["Regenerator"],"teraTypes":["Steel","Water"]},{"role":"Bulky Attacker","movepool":["Giga Drain","Sludge Bomb","Spore","Stomping Tantrum"],"abilities":["Regenerator"],"teraTypes":["Steel","Water"]}]},"alomomola":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Flip Turn","Protect","Scald","Wish"],"abilities":["Regenerator"],"teraTypes":["Steel"]},{"role":"Fast Support","movepool":["Flip Turn","Protect","Scald","Wish"],"abilities":["Regenerator"],"teraTypes":["Steel"]}]},"galvantula":{"level":82,"sets":[{"role":"Fast Support","movepool":["Bug Buzz","Giga Drain","Sticky Web","Thunder","Volt Switch"],"abilities":["Compound Eyes"],"teraTypes":["Electric"]}]},"eelektross":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Coil","Drain Punch","Fire Punch","Knock Off","Supercell Slam"],"abilities":["Levitate"],"teraTypes":["Fighting"]},{"role":"AV Pivot","movepool":["Close Combat","Discharge","Flamethrower","Giga Drain","Knock Off","U-turn"],"abilities":["Levitate"],"teraTypes":["Poison","Steel"]}]},"chandelure":{"level":83,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Energy Ball","Fire Blast","Pain Split","Shadow Ball","Substitute","Will-O-Wisp"],"abilities":["Flame Body","Flash Fire"],"teraTypes":["Fire","Ghost","Grass"]},{"role":"Fast Attacker","movepool":["Energy Ball","Fire Blast","Shadow Ball","Trick"],"abilities":["Flash Fire"],"teraTypes":["Fire","Ghost","Grass"]}]},"haxorus":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Dragon Dance","Earthquake","Iron Head","Outrage"],"abilities":["Mold Breaker"],"teraTypes":["Steel"]},{"role":"Fast Bulky Setup","movepool":["Close Combat","Earthquake","Iron Head","Scale Shot","Swords Dance"],"abilities":["Mold Breaker"],"teraTypes":["Steel"]}]},"beartic":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Close Combat","Earthquake","Icicle Crash","Snowscape","Swords Dance"],"abilities":["Slush Rush","Swift Swim"],"teraTypes":["Fighting","Ground"]}]},"cryogonal":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Flash Cannon","Freeze-Dry","Haze","Rapid Spin","Recover"],"abilities":["Levitate"],"teraTypes":["Poison","Steel"]},{"role":"Tera Blast user","movepool":["Ice Beam","Rapid Spin","Recover","Tera Blast"],"abilities":["Levitate"],"teraTypes":["Electric"]}]},"mienshao":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["High Jump Kick","Knock Off","Poison Jab","Stone Edge","U-turn"],"abilities":["Reckless"],"teraTypes":["Fighting"]},{"role":"AV Pivot","movepool":["Close Combat","Fake Out","Knock Off","U-turn"],"abilities":["Regenerator"],"teraTypes":["Dark","Steel"]},{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Poison Jab","Swords Dance","Triple Axel"],"abilities":["Regenerator"],"teraTypes":["Dark","Fighting","Poison"]}]},"golurk":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Dynamic Punch","Earthquake","Poltergeist","Stealth Rock","Stone Edge"],"abilities":["No Guard"],"teraTypes":["Fighting","Ghost","Ground"]}]},"braviary":{"level":85,"sets":[{"role":"Fast Bulky Setup","movepool":["Brave Bird","Bulk Up","Close Combat","Roost"],"abilities":["Defiant"],"teraTypes":["Fighting","Steel"]}]},"braviaryhisui":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["Agility","Heat Wave","Hurricane","Psychic"],"abilities":["Sheer Force"],"teraTypes":["Fairy","Fire","Psychic","Steel"]},{"role":"Wallbreaker","movepool":["Esper Wing","Hurricane","U-turn","Vacuum Wave"],"abilities":["Tinted Lens"],"teraTypes":["Fairy","Fighting","Psychic","Steel"]},{"role":"Bulky Attacker","movepool":["Calm Mind","Defog","Esper Wing","Hurricane","Roost"],"abilities":["Tinted Lens"],"teraTypes":["Fairy","Psychic","Steel"]}]},"mandibuzz":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Defog","Foul Play","Roost","Toxic","U-turn"],"abilities":["Overcoat"],"teraTypes":["Steel"]},{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Foul Play","Knock Off","Roost","Toxic"],"abilities":["Overcoat"],"teraTypes":["Steel"]}]},"hydreigon":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Draco Meteor","Fire Blast","Flash Cannon","Nasty Plot","U-turn"],"abilities":["Levitate"],"teraTypes":["Dark","Dragon","Fire","Steel"]}]},"volcarona":{"level":77,"sets":[{"role":"Fast Bulky Setup","movepool":["Bug Buzz","Fiery Dance","Fire Blast","Giga Drain","Morning Sun","Quiver Dance"],"abilities":["Flame Body","Swarm"],"teraTypes":["Fire","Grass","Steel"]},{"role":"Tera Blast user","movepool":["Bug Buzz","Fiery Dance","Fire Blast","Giga Drain","Quiver Dance","Tera Blast"],"abilities":["Flame Body","Swarm"],"teraTypes":["Ground","Water"]}]},"cobalion":{"level":80,"sets":[{"role":"Fast Bulky Setup","movepool":["Close Combat","Iron Head","Stone Edge","Swords Dance","Taunt"],"abilities":["Justified"],"teraTypes":["Fighting"]},{"role":"Bulky Setup","movepool":["Aura Sphere","Calm Mind","Flash Cannon","Vacuum Wave"],"abilities":["Justified"],"teraTypes":["Fighting","Ghost","Water"]},{"role":"Bulky Support","movepool":["Body Press","Iron Defense","Iron Head","Stealth Rock","Stone Edge","Thunder Wave","Volt Switch"],"abilities":["Justified"],"teraTypes":["Ghost","Water"]}]},"terrakion":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Earthquake","Stone Edge","Swords Dance"],"abilities":["Justified"],"teraTypes":["Fighting","Ground"]},{"role":"Wallbreaker","movepool":["Close Combat","Earthquake","Quick Attack","Stone Edge"],"abilities":["Justified"],"teraTypes":["Fighting","Ground"]}]},"virizion":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Leaf Blade","Stone Edge","Swords Dance"],"abilities":["Justified"],"teraTypes":["Rock"]}]},"tornadus":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Bleakwind Storm","Focus Blast","Grass Knot","Heat Wave","Nasty Plot","U-turn"],"abilities":["Defiant","Prankster"],"teraTypes":["Fighting","Fire","Flying"]}]},"tornadustherian":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Bleakwind Storm","Focus Blast","Grass Knot","Heat Wave","Nasty Plot","U-turn"],"abilities":["Regenerator"],"teraTypes":["Fighting","Fire","Flying"]},{"role":"AV Pivot","movepool":["Bleakwind Storm","Heat Wave","Knock Off","U-turn"],"abilities":["Regenerator"],"teraTypes":["Dark","Steel"]}]},"thundurus":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Knock Off","Nasty Plot","Sludge Wave","Taunt","Thunder Wave","Thunderbolt","U-turn"],"abilities":["Defiant","Prankster"],"teraTypes":["Electric","Grass","Steel"]},{"role":"Tera Blast user","movepool":["Focus Blast","Nasty Plot","Tera Blast","Thunderbolt"],"abilities":["Defiant"],"teraTypes":["Flying"]},{"role":"Wallbreaker","movepool":["Acrobatics","Focus Blast","Grass Knot","Knock Off","Taunt","Thunder Wave","Thunderbolt","U-turn"],"abilities":["Defiant","Prankster"],"teraTypes":["Electric","Flying","Grass","Steel"]}]},"thundurustherian":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Nasty Plot","Psychic","Sludge Wave","Thunderbolt","Volt Switch"],"abilities":["Volt Absorb"],"teraTypes":["Electric","Poison","Psychic"]},{"role":"Tera Blast user","movepool":["Focus Blast","Nasty Plot","Tera Blast","Thunderbolt"],"abilities":["Volt Absorb"],"teraTypes":["Flying"]}]},"reshiram":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Blue Flare","Draco Meteor","Dragon Tail","Earth Power","Will-O-Wisp"],"abilities":["Turboblaze"],"teraTypes":["Fire","Ground"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Flare Blitz","Outrage","Stone Edge"],"abilities":["Turboblaze"],"teraTypes":["Dragon","Fire"]}]},"zekrom":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["Bolt Strike","Dragon Dance","Outrage","Substitute"],"abilities":["Teravolt"],"teraTypes":["Electric","Steel"]}]},"landorus":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Earth Power","Focus Blast","Nasty Plot","Psychic","Rock Slide","Sludge Wave","Stealth Rock"],"abilities":["Sheer Force"],"teraTypes":["Ground","Poison","Psychic"]}]},"landorustherian":{"level":76,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Stealth Rock","Stone Edge","Taunt","U-turn"],"abilities":["Intimidate"],"teraTypes":["Ground","Water"]}]},"kyurem":{"level":77,"sets":[{"role":"Tera Blast user","movepool":["Dragon Dance","Icicle Spear","Scale Shot","Tera Blast"],"abilities":["Pressure"],"teraTypes":["Ground"]},{"role":"Wallbreaker","movepool":["Draco Meteor","Earth Power","Freeze-Dry","Ice Beam","Outrage"],"abilities":["Pressure"],"teraTypes":["Ground"]}]},"kyuremwhite":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Earth Power","Freeze-Dry","Fusion Flare"],"abilities":["Turboblaze"],"teraTypes":["Dragon","Fire"]},{"role":"Bulky Attacker","movepool":["Draco Meteor","Freeze-Dry","Fusion Flare","Ice Beam"],"abilities":["Turboblaze"],"teraTypes":["Dragon","Fire","Ice"]}]},"kyuremblack":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Fusion Bolt","Icicle Spear","Scale Shot"],"abilities":["Teravolt"],"teraTypes":["Electric"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Icicle Spear","Scale Shot","Tera Blast"],"abilities":["Teravolt"],"teraTypes":["Ground"]}]},"keldeoresolute":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Air Slash","Calm Mind","Flip Turn","Hydro Pump","Secret Sword","Vacuum Wave"],"abilities":["Justified"],"teraTypes":["Fighting","Water"]},{"role":"Bulky Setup","movepool":["Calm Mind","Hydro Pump","Secret Sword","Substitute","Surf"],"abilities":["Justified"],"teraTypes":["Steel"]}]},"meloetta":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Focus Blast","Hyper Voice","Psyshock","U-turn"],"abilities":["Serene Grace"],"teraTypes":["Fighting","Normal","Psychic"]},{"role":"Wallbreaker","movepool":["Close Combat","Knock Off","Relic Song","Triple Axel"],"abilities":["Serene Grace"],"teraTypes":["Dark","Fighting"]}]},"chesnaught":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Body Press","Knock Off","Spikes","Synthesis","Wood Hammer"],"abilities":["Bulletproof"],"teraTypes":["Steel","Water"]},{"role":"Fast Bulky Setup","movepool":["Body Press","Iron Defense","Synthesis","Trailblaze"],"abilities":["Bulletproof"],"teraTypes":["Steel"]}]},"delphox":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Fire Blast","Focus Blast","Grass Knot","Nasty Plot","Psyshock"],"abilities":["Blaze"],"teraTypes":["Fighting","Fire","Grass","Psychic"]}]},"greninja":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Grass Knot","Gunk Shot","Hydro Pump","Ice Beam","Toxic Spikes","U-turn"],"abilities":["Protean"],"teraTypes":["Dark","Poison","Water"]}]},"greninjabond":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Gunk Shot","Hydro Pump","Ice Beam"],"abilities":["Battle Bond"],"teraTypes":["Poison","Water"]}]},"talonflame":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Overheat","Roost","Taunt","U-turn","Will-O-Wisp"],"abilities":["Flame Body"],"teraTypes":["Dragon","Ground"]},{"role":"Tera Blast user","movepool":["Brave Bird","Flare Blitz","Swords Dance","Tera Blast"],"abilities":["Flame Body"],"teraTypes":["Ground"]}]},"vivillon":{"level":84,"sets":[{"role":"Fast Bulky Setup","movepool":["Bug Buzz","Hurricane","Quiver Dance","Sleep Powder"],"abilities":["Compound Eyes"],"teraTypes":["Flying"]},{"role":"Tera Blast user","movepool":["Hurricane","Quiver Dance","Sleep Powder","Tera Blast"],"abilities":["Compound Eyes"],"teraTypes":["Ground"]}]},"pyroar":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Fire Blast","Hyper Voice","Will-O-Wisp","Work Up"],"abilities":["Unnerve"],"teraTypes":["Fire"]}]},"florges":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Protect","Wish"],"abilities":["Flower Veil"],"teraTypes":["Steel"]},{"role":"Tera Blast user","movepool":["Calm Mind","Moonblast","Synthesis","Tera Blast"],"abilities":["Flower Veil"],"teraTypes":["Ground"]}]},"gogoat":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Earthquake","Horn Leech","Milk Drink","Rock Slide"],"abilities":["Sap Sipper"],"teraTypes":["Ground","Water"]}]},"meowstic":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Alluring Voice","Light Screen","Psychic Noise","Reflect","Thunder Wave","Yawn"],"abilities":["Prankster"],"teraTypes":["Fairy"]}]},"meowsticf":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["Alluring Voice","Dark Pulse","Nasty Plot","Psychic","Psyshock","Thunderbolt"],"abilities":["Competitive"],"teraTypes":["Dark","Electric","Fairy"]}]},"malamar":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Knock Off","Rest","Sleep Talk","Superpower"],"abilities":["Contrary"],"teraTypes":["Fighting","Poison","Steel"]},{"role":"Fast Bulky Setup","movepool":["Knock Off","Psycho Cut","Rest","Superpower"],"abilities":["Contrary"],"teraTypes":["Fighting","Poison","Steel"]}]},"dragalge":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Dragon Tail","Flip Turn","Focus Blast","Sludge Wave","Toxic","Toxic Spikes"],"abilities":["Adaptability"],"teraTypes":["Fighting"]}]},"clawitzer":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Aura Sphere","Dark Pulse","Dragon Pulse","U-turn","Water Pulse"],"abilities":["Mega Launcher"],"teraTypes":["Dark","Dragon","Fighting"]},{"role":"AV Pivot","movepool":["Aura Sphere","Dark Pulse","Dragon Pulse","U-turn","Water Pulse"],"abilities":["Mega Launcher"],"teraTypes":["Dragon"]}]},"sylveon":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Hyper Voice","Protect","Wish"],"abilities":["Pixilate"],"teraTypes":["Steel"]}]},"hawlucha":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Acrobatics","Brave Bird","Close Combat","Encore","Stone Edge","Swords Dance","Throat Chop"],"abilities":["Unburden"],"teraTypes":["Fighting","Flying"]}]},"dedenne":{"level":88,"sets":[{"role":"Fast Support","movepool":["Dazzling Gleam","Nuzzle","Super Fang","Thunderbolt","U-turn"],"abilities":["Cheek Pouch"],"teraTypes":["Electric","Flying"]}]},"carbink":{"level":90,"sets":[{"role":"Fast Bulky Setup","movepool":["Body Press","Iron Defense","Moonblast","Rest","Rock Polish"],"abilities":["Clear Body","Sturdy"],"teraTypes":["Fighting"]}]},"goodra":{"level":85,"sets":[{"role":"AV Pivot","movepool":["Draco Meteor","Earthquake","Fire Blast","Knock Off","Power Whip","Scald","Sludge Bomb"],"abilities":["Sap Sipper"],"teraTypes":["Fire","Grass","Ground","Poison","Water"]}]},"goodrahisui":{"level":82,"sets":[{"role":"AV Pivot","movepool":["Draco Meteor","Dragon Tail","Earthquake","Fire Blast","Heavy Slam","Hydro Pump","Knock Off","Thunderbolt"],"abilities":["Sap Sipper"],"teraTypes":["Dragon","Flying","Ground","Water"]}]},"klefki":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Magnet Rise","Play Rough","Spikes","Thunder Wave"],"abilities":["Prankster"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Dazzling Gleam","Foul Play","Spikes","Thunder Wave"],"abilities":["Prankster"],"teraTypes":["Flying","Water"]}]},"trevenant":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Drain Punch","Horn Leech","Poltergeist","Rest","Trick Room","Will-O-Wisp","Wood Hammer"],"abilities":["Natural Cure"],"teraTypes":["Fighting"]},{"role":"Bulky Support","movepool":["Drain Punch","Poltergeist","Protect","Toxic"],"abilities":["Harvest"],"teraTypes":["Dark","Fairy","Fighting","Steel"]}]},"avalugg":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Avalanche","Body Press","Curse","Rapid Spin","Recover"],"abilities":["Sturdy"],"teraTypes":["Fighting"]}]},"avalugghisui":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Avalanche","Body Press","Rapid Spin","Recover","Stone Edge"],"abilities":["Sturdy"],"teraTypes":["Flying","Ghost","Poison"]}]},"noivern":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Draco Meteor","Flamethrower","Hurricane","Roost","U-turn"],"abilities":["Infiltrator"],"teraTypes":["Normal"]},{"role":"Fast Support","movepool":["Defog","Draco Meteor","Flamethrower","Hurricane","Roost","U-turn"],"abilities":["Infiltrator"],"teraTypes":["Fire"]}]},"diancie":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Diamond Storm","Earth Power","Moonblast","Rock Polish","Stealth Rock"],"abilities":["Clear Body"],"teraTypes":["Fighting"]},{"role":"Bulky Setup","movepool":["Calm Mind","Diamond Storm","Draining Kiss","Earth Power"],"abilities":["Clear Body"],"teraTypes":["Fairy","Water"]}]},"hoopa":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Nasty Plot","Psychic","Psyshock","Shadow Ball","Trick"],"abilities":["Magician"],"teraTypes":["Fighting","Ghost","Psychic"]}]},"hoopaunbound":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Drain Punch","Gunk Shot","Hyperspace Fury","Trick","Zen Headbutt"],"abilities":["Magician"],"teraTypes":["Dark","Fighting","Poison"]},{"role":"Bulky Attacker","movepool":["Focus Blast","Gunk Shot","Hyperspace Fury","Psychic","Trick"],"abilities":["Magician"],"teraTypes":["Fighting","Poison"]}]},"volcanion":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Flame Charge","Flamethrower","Haze","Sludge Bomb","Steam Eruption"],"abilities":["Water Absorb"],"teraTypes":["Fire","Ground","Water"]}]},"decidueye":{"level":88,"sets":[{"role":"Fast Support","movepool":["Defog","Knock Off","Leaf Storm","Roost","Spirit Shackle","U-turn"],"abilities":["Overgrow"],"teraTypes":["Dark","Ghost","Grass"]},{"role":"Setup Sweeper","movepool":["Leaf Blade","Poltergeist","Shadow Sneak","Swords Dance"],"abilities":["Overgrow"],"teraTypes":["Ghost"]}]},"decidueyehisui":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Knock Off","Leaf Blade","Roost","Sucker Punch","Swords Dance","Triple Arrows","U-turn"],"abilities":["Scrappy"],"teraTypes":["Steel","Water"]}]},"incineroar":{"level":82,"sets":[{"role":"AV Pivot","movepool":["Close Combat","Fake Out","Knock Off","Overheat","U-turn"],"abilities":["Intimidate"],"teraTypes":["Fighting","Water"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Flare Blitz","Knock Off","Parting Shot","Will-O-Wisp"],"abilities":["Intimidate"],"teraTypes":["Fighting","Water"]},{"role":"Setup Sweeper","movepool":["Flare Blitz","Knock Off","Swords Dance","Trailblaze"],"abilities":["Intimidate"],"teraTypes":["Grass"]}]},"primarina":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["Flip Turn","Hydro Pump","Moonblast","Psychic"],"abilities":["Torrent"],"teraTypes":["Water"]},{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Moonblast","Psychic Noise"],"abilities":["Liquid Voice"],"teraTypes":["Fairy","Poison","Steel"]},{"role":"Bulky Attacker","movepool":["Calm Mind","Draining Kiss","Psychic","Sparkling Aria"],"abilities":["Torrent"],"teraTypes":["Fairy","Poison","Steel"]}]},"toucannon":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Beak Blast","Boomburst","Bullet Seed","Knock Off","Roost","U-turn"],"abilities":["Keen Eye","Skill Link"],"teraTypes":["Steel"]}]},"gumshoos":{"level":95,"sets":[{"role":"Wallbreaker","movepool":["Double-Edge","Earthquake","Knock Off","U-turn"],"abilities":["Stakeout"],"teraTypes":["Normal"]},{"role":"Fast Attacker","movepool":["Double-Edge","Earthquake","Knock Off","U-turn"],"abilities":["Adaptability","Stakeout"],"teraTypes":["Ground"]}]},"vikavolt":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Bug Buzz","Discharge","Energy Ball","Sticky Web","Thunderbolt","Volt Switch"],"abilities":["Levitate"],"teraTypes":["Electric"]}]},"crabominable":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Drain Punch","Earthquake","Gunk Shot","Ice Hammer","Knock Off"],"abilities":["Iron Fist"],"teraTypes":["Fighting","Ground"]},{"role":"AV Pivot","movepool":["Drain Punch","Earthquake","Ice Hammer","Knock Off"],"abilities":["Iron Fist"],"teraTypes":["Fighting","Ground","Water"]}]},"oricorio":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["Hurricane","Quiver Dance","Revelation Dance","Roost"],"abilities":["Dancer"],"teraTypes":["Ground"]}]},"oricoriopompom":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Hurricane","Quiver Dance","Revelation Dance","Roost"],"abilities":["Dancer"],"teraTypes":["Ground"]}]},"oricoriopau":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["Hurricane","Quiver Dance","Revelation Dance","Roost"],"abilities":["Dancer"],"teraTypes":["Fighting","Ground"]}]},"oricoriosensu":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["Hurricane","Quiver Dance","Revelation Dance","Roost"],"abilities":["Dancer"],"teraTypes":["Fighting","Ghost"]}]},"ribombee":{"level":82,"sets":[{"role":"Fast Support","movepool":["Bug Buzz","Moonblast","Sticky Web","Stun Spore","U-turn"],"abilities":["Shield Dust"],"teraTypes":["Ghost"]},{"role":"Tera Blast user","movepool":["Bug Buzz","Moonblast","Quiver Dance","Tera Blast"],"abilities":["Shield Dust"],"teraTypes":["Ground"]}]},"lycanroc":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Accelerock","Close Combat","Crunch","Psychic Fangs","Stealth Rock","Stone Edge","Swords Dance","Taunt"],"abilities":["Sand Rush"],"teraTypes":["Fighting"]}]},"lycanrocmidnight":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Knock Off","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"abilities":["No Guard"],"teraTypes":["Fighting"]}]},"lycanrocdusk":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Accelerock","Close Combat","Psychic Fangs","Stone Edge","Swords Dance","Throat Chop"],"abilities":["Tough Claws"],"teraTypes":["Fighting"]}]},"toxapex":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Haze","Liquidation","Recover","Toxic","Toxic Spikes"],"abilities":["Regenerator"],"teraTypes":["Fairy","Flying","Grass","Steel"]}]},"mudsdale":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Earthquake","Heavy Slam","Stealth Rock","Stone Edge"],"abilities":["Stamina"],"teraTypes":["Fighting"]}]},"araquanid":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Hydro Pump","Leech Life","Liquidation","Mirror Coat","Sticky Web"],"abilities":["Water Bubble"],"teraTypes":["Ground","Steel","Water"]}]},"lurantis":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Knock Off","Leaf Storm","Superpower","Synthesis"],"abilities":["Contrary"],"teraTypes":["Fighting"]},{"role":"AV Pivot","movepool":["Knock Off","Leaf Storm","Leech Life","Superpower"],"abilities":["Contrary"],"teraTypes":["Fighting","Steel","Water"]}]},"salazzle":{"level":83,"sets":[{"role":"Fast Support","movepool":["Flamethrower","Protect","Substitute","Toxic"],"abilities":["Corrosion"],"teraTypes":["Flying","Grass"]},{"role":"Tera Blast user","movepool":["Fire Blast","Nasty Plot","Sludge Wave","Tera Blast"],"abilities":["Corrosion"],"teraTypes":["Grass"]}]},"tsareena":{"level":87,"sets":[{"role":"Fast Support","movepool":["High Jump Kick","Knock Off","Power Whip","Rapid Spin","Synthesis","Triple Axel","U-turn"],"abilities":["Queenly Majesty"],"teraTypes":["Fighting","Steel"]}]},"comfey":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Giga Drain","Stored Power"],"abilities":["Triage"],"teraTypes":["Fairy","Poison","Steel"]},{"role":"Tera Blast user","movepool":["Calm Mind","Draining Kiss","Giga Drain","Synthesis","Tera Blast"],"abilities":["Triage"],"teraTypes":["Ground"]}]},"oranguru":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["Focus Blast","Nasty Plot","Psychic","Psyshock","Thunderbolt"],"abilities":["Inner Focus"],"teraTypes":["Electric","Fighting","Psychic"]},{"role":"Wallbreaker","movepool":["Focus Blast","Hyper Voice","Nasty Plot","Psyshock","Thunderbolt","Trick"],"abilities":["Inner Focus"],"teraTypes":["Electric","Fighting","Normal","Psychic"]}]},"passimian":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Gunk Shot","Knock Off","Rock Slide","U-turn"],"abilities":["Defiant"],"teraTypes":["Dark","Fighting","Poison"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Gunk Shot","Knock Off"],"abilities":["Defiant"],"teraTypes":["Dark","Poison","Steel"]}]},"palossand":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Shadow Ball","Shore Up","Sludge Bomb","Stealth Rock"],"abilities":["Water Compaction"],"teraTypes":["Poison","Water"]}]},"minior":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Acrobatics","Earthquake","Power Gem","Shell Smash"],"abilities":["Shields Down"],"teraTypes":["Flying","Ground","Steel","Water"]}]},"komala":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["Double-Edge","Earthquake","Knock Off","Superpower","U-turn","Wood Hammer"],"abilities":["Comatose"],"teraTypes":["Fighting","Grass","Ground"]},{"role":"Bulky Support","movepool":["Body Slam","Earthquake","Knock Off","Rapid Spin","U-turn"],"abilities":["Comatose"],"teraTypes":["Ghost"]}]},"mimikyu":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Drain Punch","Play Rough","Shadow Claw","Shadow Sneak","Swords Dance","Wood Hammer"],"abilities":["Disguise"],"teraTypes":["Fairy","Fighting","Ghost","Grass"]}]},"bruxish":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Crunch","Flip Turn","Ice Fang","Psychic Fangs","Swords Dance","Wave Crash"],"abilities":["Strong Jaw"],"teraTypes":["Dark","Psychic"]}]},"kommoo":{"level":78,"sets":[{"role":"Fast Bulky Setup","movepool":["Boomburst","Clanging Scales","Clangorous Soul","Close Combat","Iron Head"],"abilities":["Soundproof"],"teraTypes":["Normal","Steel"]},{"role":"Setup Sweeper","movepool":["Close Combat","Iron Head","Scale Shot","Swords Dance"],"abilities":["Soundproof"],"teraTypes":["Steel"]}]},"solgaleo":{"level":74,"sets":[{"role":"Bulky Setup","movepool":["Close Combat","Flame Charge","Knock Off","Psychic","Sunsteel Strike"],"abilities":["Full Metal Body"],"teraTypes":["Dark","Fighting"]},{"role":"Bulky Attacker","movepool":["Close Combat","Flare Blitz","Knock Off","Morning Sun","Psychic Fangs","Sunsteel Strike"],"abilities":["Full Metal Body"],"teraTypes":["Water"]}]},"lunala":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Moongeist Beam","Moonlight"],"abilities":["Shadow Shield"],"teraTypes":["Fairy"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Moongeist Beam","Moonlight","Psyshock"],"abilities":["Shadow Shield"],"teraTypes":["Dark","Fairy"]}]},"necrozma":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Knock Off","Photon Geyser","Swords Dance"],"abilities":["Prism Armor"],"teraTypes":["Dark","Ground","Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Heat Wave","Moonlight","Photon Geyser"],"abilities":["Prism Armor"],"teraTypes":["Fairy","Ground","Steel"]}]},"necrozmaduskmane":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Morning Sun","Sunsteel Strike"],"abilities":["Prism Armor"],"teraTypes":["Ground","Steel","Water"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Photon Geyser","Sunsteel Strike"],"abilities":["Prism Armor"],"teraTypes":["Ground","Steel","Water"]}]},"necrozmadawnwings":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moongeist Beam","Moonlight","Photon Geyser"],"abilities":["Prism Armor"],"teraTypes":["Dark","Fairy"]},{"role":"Setup Sweeper","movepool":["Brick Break","Dragon Dance","Moongeist Beam","Photon Geyser"],"abilities":["Prism Armor"],"teraTypes":["Fighting"]}]},"magearna":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["Aura Sphere","Flash Cannon","Fleur Cannon","Pain Split","Spikes","Thunder Wave","Volt Switch"],"abilities":["Soul-Heart"],"teraTypes":["Fairy","Fighting","Water"]},{"role":"Bulky Setup","movepool":["Calm Mind","Flash Cannon","Fleur Cannon","Shift Gear"],"abilities":["Soul-Heart"],"teraTypes":["Fairy","Flying","Steel","Water"]},{"role":"Tera Blast user","movepool":["Fleur Cannon","Iron Head","Shift Gear","Tera Blast"],"abilities":["Soul-Heart"],"teraTypes":["Ground"]}]},"rillaboom":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["Grassy Glide","Knock Off","Swords Dance","U-turn","Wood Hammer"],"abilities":["Grassy Surge"],"teraTypes":["Grass"]},{"role":"Fast Attacker","movepool":["Grassy Glide","High Horsepower","Swords Dance","U-turn","Wood Hammer"],"abilities":["Grassy Surge"],"teraTypes":["Grass"]}]},"cinderace":{"level":77,"sets":[{"role":"Wallbreaker","movepool":["Gunk Shot","High Jump Kick","Pyro Ball","U-turn"],"abilities":["Libero"],"teraTypes":["Fire"]},{"role":"Fast Support","movepool":["Court Change","High Jump Kick","Pyro Ball","Sucker Punch"],"abilities":["Libero"],"teraTypes":["Fighting","Fire"]},{"role":"Fast Attacker","movepool":["Court Change","Gunk Shot","High Jump Kick","Pyro Ball","U-turn"],"abilities":["Libero"],"teraTypes":["Fighting"]}]},"inteleon":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Hydro Pump","Ice Beam","U-turn"],"abilities":["Torrent"],"teraTypes":["Water"]},{"role":"Wallbreaker","movepool":["Hydro Pump","Ice Beam","Scald","U-turn"],"abilities":["Torrent"],"teraTypes":["Water"]}]},"greedent":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Double-Edge","Earthquake","Knock Off","Swords Dance"],"abilities":["Cheek Pouch"],"teraTypes":["Ghost","Ground"]}]},"corviknight":{"level":80,"sets":[{"role":"Bulky Support","movepool":["Body Press","Brave Bird","Defog","Roost","U-turn"],"abilities":["Mirror Armor","Pressure"],"teraTypes":["Dragon"]}]},"drednaw":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["Crunch","Liquidation","Shell Smash","Stone Edge"],"abilities":["Strong Jaw"],"teraTypes":["Dark"]},{"role":"Fast Bulky Setup","movepool":["Earthquake","Liquidation","Shell Smash","Stone Edge"],"abilities":["Shell Armor","Swift Swim"],"teraTypes":["Ground","Water"]}]},"coalossal":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Flamethrower","Overheat","Rapid Spin","Spikes","Stealth Rock","Stone Edge","Will-O-Wisp"],"abilities":["Flame Body"],"teraTypes":["Ghost","Grass","Water"]}]},"flapple":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Dragon Dance","Grav Apple","Outrage","Sucker Punch","U-turn"],"abilities":["Hustle"],"teraTypes":["Dragon","Grass"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Grav Apple","Outrage","Tera Blast"],"abilities":["Hustle"],"teraTypes":["Fire"]}]},"appletun":{"level":92,"sets":[{"role":"Bulky Support","movepool":["Apple Acid","Draco Meteor","Dragon Pulse","Leech Seed","Recover"],"abilities":["Thick Fat"],"teraTypes":["Steel"]}]},"sandaconda":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Coil","Earthquake","Glare","Rest","Stone Edge"],"abilities":["Shed Skin"],"teraTypes":["Dragon","Steel"]},{"role":"Bulky Attacker","movepool":["Earthquake","Glare","Rest","Stealth Rock","Stone Edge"],"abilities":["Shed Skin"],"teraTypes":["Dragon","Water"]},{"role":"Fast Bulky Setup","movepool":["Coil","Earthquake","Rock Blast","Scale Shot"],"abilities":["Shed Skin"],"teraTypes":["Dragon"]}]},"cramorant":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Defog","Roost","Surf"],"abilities":["Gulp Missile"],"teraTypes":["Ground"]}]},"barraskewda":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Flip Turn","Poison Jab","Psychic Fangs","Throat Chop","Waterfall"],"abilities":["Swift Swim"],"teraTypes":["Fighting","Water"]}]},"toxtricity":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Overdrive","Sludge Wave","Volt Switch"],"abilities":["Punk Rock"],"teraTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["Boomburst","Gunk Shot","Overdrive","Shift Gear"],"abilities":["Punk Rock"],"teraTypes":["Normal"]}]},"polteageist":{"level":79,"sets":[{"role":"Tera Blast user","movepool":["Shadow Ball","Shell Smash","Stored Power","Strength Sap","Tera Blast"],"abilities":["Cursed Body"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Giga Drain","Shadow Ball","Shell Smash","Stored Power","Strength Sap"],"abilities":["Cursed Body"],"teraTypes":["Psychic"]}]},"hatterene":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Mystical Fire","Psychic","Psyshock"],"abilities":["Magic Bounce"],"teraTypes":["Fairy","Steel"]},{"role":"AV Pivot","movepool":["Draining Kiss","Mystical Fire","Nuzzle","Psychic","Psychic Noise"],"abilities":["Magic Bounce"],"teraTypes":["Fairy","Steel"]}]},"grimmsnarl":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Light Screen","Parting Shot","Reflect","Spirit Break","Thunder Wave"],"abilities":["Prankster"],"teraTypes":["Poison","Steel"]},{"role":"Bulky Attacker","movepool":["Parting Shot","Spirit Break","Sucker Punch","Taunt","Thunder Wave"],"abilities":["Prankster"],"teraTypes":["Poison","Steel"]}]},"perrserker":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Iron Head","Knock Off","Stealth Rock","U-turn"],"abilities":["Steely Spirit","Tough Claws"],"teraTypes":["Fighting","Steel"]}]},"alcremie":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["Alluring Voice","Calm Mind","Psychic","Psyshock","Recover"],"abilities":["Aroma Veil"],"teraTypes":["Poison","Steel"]},{"role":"Tera Blast user","movepool":["Alluring Voice","Calm Mind","Recover","Tera Blast"],"abilities":["Aroma Veil"],"teraTypes":["Ground"]}]},"falinks":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Iron Head","Knock Off","No Retreat"],"abilities":["Defiant"],"teraTypes":["Dark","Steel"]}]},"pincurchin":{"level":100,"sets":[{"role":"Bulky Attacker","movepool":["Discharge","Recover","Scald","Spikes","Thunderbolt","Toxic Spikes"],"abilities":["Electric Surge"],"teraTypes":["Water"]},{"role":"Bulky Setup","movepool":["Curse","Liquidation","Recover","Zing Zap"],"abilities":["Electric Surge"],"teraTypes":["Grass","Water"]}]},"frosmoth":{"level":82,"sets":[{"role":"Tera Blast user","movepool":["Bug Buzz","Giga Drain","Ice Beam","Quiver Dance","Tera Blast"],"abilities":["Ice Scales"],"teraTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Bug Buzz","Giga Drain","Hurricane","Ice Beam","Quiver Dance"],"abilities":["Ice Scales"],"teraTypes":["Water"]}]},"stonjourner":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Heat Crash","Rock Polish","Stealth Rock","Stone Edge"],"abilities":["Power Spot"],"teraTypes":["Fire","Ground"]}]},"eiscue":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Belly Drum","Ice Spinner","Iron Head","Liquidation","Substitute","Zen Headbutt"],"abilities":["Ice Face"],"teraTypes":["Water"]},{"role":"Tera Blast user","movepool":["Belly Drum","Ice Spinner","Liquidation","Substitute","Tera Blast"],"abilities":["Ice Face"],"teraTypes":["Electric","Ground"]}]},"indeedee":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Expanding Force","Healing Wish","Hyper Voice","Shadow Ball"],"abilities":["Psychic Surge"],"teraTypes":["Psychic"]}]},"indeedeef":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Healing Wish","Hyper Voice","Psychic","Psyshock","Shadow Ball"],"abilities":["Psychic Surge"],"teraTypes":["Fairy","Psychic"]}]},"morpeko":{"level":88,"sets":[{"role":"Fast Support","movepool":["Aura Wheel","Parting Shot","Protect","Rapid Spin"],"abilities":["Hunger Switch"],"teraTypes":["Electric"]},{"role":"Bulky Attacker","movepool":["Aura Wheel","Knock Off","Protect","Rapid Spin"],"abilities":["Hunger Switch"],"teraTypes":["Electric"]}]},"copperajah":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Iron Head","Play Rough","Rock Slide","Stealth Rock","Superpower"],"abilities":["Sheer Force"],"teraTypes":["Fairy"]},{"role":"Bulky Attacker","movepool":["Earthquake","Heat Crash","Heavy Slam","Knock Off","Stone Edge","Supercell Slam","Superpower"],"abilities":["Heavy Metal"],"teraTypes":["Fire","Steel"]}]},"duraludon":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Draco Meteor","Flash Cannon","Iron Defense","Stealth Rock","Thunder Wave"],"abilities":["Light Metal"],"teraTypes":["Fighting"]}]},"dragapult":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Shadow Ball","Thunderbolt","U-turn"],"abilities":["Infiltrator"],"teraTypes":["Dragon","Fire","Ghost"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Dragon Darts","Fire Blast","Tera Blast"],"abilities":["Clear Body"],"teraTypes":["Ghost"]},{"role":"Fast Support","movepool":["Dragon Darts","Hex","U-turn","Will-O-Wisp"],"abilities":["Cursed Body","Infiltrator"],"teraTypes":["Dragon","Fairy"]}]},"zacian":{"level":69,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Play Rough","Psychic Fangs","Swords Dance","Wild Charge"],"abilities":["Intrepid Sword"],"teraTypes":["Fighting"]}]},"zaciancrowned":{"level":64,"sets":[{"role":"Setup Sweeper","movepool":["Behemoth Blade","Close Combat","Play Rough","Swords Dance"],"abilities":["Intrepid Sword"],"teraTypes":["Fighting"]}]},"zamazenta":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Crunch","Iron Head","Psychic Fangs","Stone Edge"],"abilities":["Dauntless Shield"],"teraTypes":["Dark","Fighting","Steel"]},{"role":"Bulky Setup","movepool":["Body Press","Crunch","Iron Defense","Iron Head","Rest","Stone Edge"],"abilities":["Dauntless Shield"],"teraTypes":["Fighting","Steel"]}]},"zamazentacrowned":{"level":68,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Crunch","Heavy Slam","Iron Defense","Stone Edge"],"abilities":["Dauntless Shield"],"teraTypes":["Fighting","Ghost"]}]},"eternatus":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["Dynamax Cannon","Fire Blast","Recover","Sludge Bomb"],"abilities":["Pressure"],"teraTypes":["Dragon","Fire"]},{"role":"Bulky Support","movepool":["Dynamax Cannon","Flamethrower","Recover","Toxic","Toxic Spikes"],"abilities":["Pressure"],"teraTypes":["Dragon","Water"]},{"role":"Setup Sweeper","movepool":["Dynamax Cannon","Fire Blast","Meteor Beam","Sludge Bomb"],"abilities":["Pressure"],"teraTypes":["Dragon","Fire","Poison"]}]},"urshifu":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Poison Jab","Sucker Punch","Swords Dance","U-turn","Wicked Blow"],"abilities":["Unseen Fist"],"teraTypes":["Dark","Fighting","Poison"]}]},"urshifurapidstrike":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Ice Spinner","Surging Strikes","Swords Dance","U-turn"],"abilities":["Unseen Fist"],"teraTypes":["Water"]}]},"zarude":{"level":78,"sets":[{"role":"Fast Bulky Setup","movepool":["Close Combat","Knock Off","Power Whip","Swords Dance","Synthesis"],"abilities":["Leaf Guard"],"teraTypes":["Dark","Fighting","Grass"]},{"role":"Fast Attacker","movepool":["Close Combat","Knock Off","Power Whip","U-turn"],"abilities":["Leaf Guard"],"teraTypes":["Dark","Fighting","Grass"]}]},"regieleki":{"level":79,"sets":[{"role":"Fast Support","movepool":["Explosion","Rapid Spin","Thunderbolt","Volt Switch"],"abilities":["Transistor"],"teraTypes":["Electric"]},{"role":"Tera Blast user","movepool":["Rapid Spin","Tera Blast","Thunderbolt","Volt Switch"],"abilities":["Transistor"],"teraTypes":["Ice"]}]},"regidrago":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Draco Meteor","Dragon Dance","Earthquake","Outrage"],"abilities":["Dragon's Maw"],"teraTypes":["Dragon"]},{"role":"Tera Blast user","movepool":["Dragon Claw","Dragon Dance","Earthquake","Tera Blast"],"abilities":["Dragon's Maw"],"teraTypes":["Steel"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Dragon Energy","Earthquake","Outrage"],"abilities":["Dragon's Maw"],"teraTypes":["Dragon"]}]},"glastrier":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Heavy Slam","High Horsepower","Icicle Crash","Swords Dance"],"abilities":["Chilling Neigh"],"teraTypes":["Fighting","Ground","Steel"]}]},"spectrier":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Draining Kiss","Nasty Plot","Shadow Ball","Substitute","Will-O-Wisp"],"abilities":["Grim Neigh"],"teraTypes":["Dark","Fairy"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Shadow Ball","Substitute","Tera Blast","Will-O-Wisp"],"abilities":["Grim Neigh"],"teraTypes":["Fighting"]}]},"calyrex":{"level":93,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Encore","Giga Drain","Leech Seed","Psychic","Psyshock"],"abilities":["Unnerve"],"teraTypes":["Steel"]},{"role":"Bulky Attacker","movepool":["Body Press","Encore","Giga Drain","Leech Seed","Psychic","Psyshock"],"abilities":["Unnerve"],"teraTypes":["Fighting","Steel"]}]},"calyrexice":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Agility","Close Combat","Glacial Lance","High Horsepower"],"abilities":["As One (Glastrier)"],"teraTypes":["Fighting","Ground"]},{"role":"Wallbreaker","movepool":["Close Combat","Glacial Lance","High Horsepower","Trick Room"],"abilities":["As One (Glastrier)"],"teraTypes":["Fighting","Ground"]}]},"calyrexshadow":{"level":64,"sets":[{"role":"Fast Attacker","movepool":["Astral Barrage","Nasty Plot","Pollen Puff","Psyshock","Trick"],"abilities":["As One (Spectrier)"],"teraTypes":["Dark","Ghost"]}]},"wyrdeer":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Earthquake","Megahorn","Psychic Noise","Thunder Wave","Thunderbolt"],"abilities":["Intimidate"],"teraTypes":["Ground"]}]},"kleavor":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Defog","Stone Axe","Swords Dance","U-turn","X-Scissor"],"abilities":["Sharpness"],"teraTypes":["Bug","Fighting","Rock"]}]},"ursaluna":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Crunch","Facade","Headlong Rush","Swords Dance","Throat Chop","Trailblaze"],"abilities":["Guts"],"teraTypes":["Normal"]}]},"ursalunabloodmoon":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Blood Moon","Calm Mind","Earth Power","Moonlight"],"abilities":["Mind's Eye"],"teraTypes":["Ghost","Normal","Poison"]},{"role":"Bulky Setup","movepool":["Blood Moon","Calm Mind","Moonlight","Vacuum Wave"],"abilities":["Mind's Eye"],"teraTypes":["Fighting","Ghost","Normal","Poison"]}]},"enamorus":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Play Rough","Substitute","Superpower","Taunt","Zen Headbutt"],"abilities":["Contrary"],"teraTypes":["Fighting"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Earth Power","Moonblast","Mystical Fire","Substitute"],"abilities":["Cute Charm"],"teraTypes":["Ground"]}]},"enamorustherian":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Moonblast","Mystical Fire","Psychic","Superpower"],"abilities":["Overcoat"],"teraTypes":["Fairy","Ground"]},{"role":"Bulky Setup","movepool":["Agility","Earth Power","Moonblast","Mystical Fire","Superpower"],"abilities":["Overcoat"],"teraTypes":["Ground"]}]},"meowscarada":{"level":78,"sets":[{"role":"Fast Support","movepool":["Flower Trick","Knock Off","Toxic Spikes","Triple Axel","U-turn"],"abilities":["Protean"],"teraTypes":["Dark","Grass"]}]},"skeledirge":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Flame Charge","Shadow Ball","Slack Off","Torch Song"],"abilities":["Unaware"],"teraTypes":["Fairy","Water"]},{"role":"Bulky Support","movepool":["Hex","Slack Off","Torch Song","Will-O-Wisp"],"abilities":["Unaware"],"teraTypes":["Fairy","Water"]}]},"quaquaval":{"level":79,"sets":[{"role":"Fast Support","movepool":["Aqua Step","Close Combat","Knock Off","Rapid Spin","Roost","Triple Axel","U-turn"],"abilities":["Moxie"],"teraTypes":["Fighting","Water"]},{"role":"Setup Sweeper","movepool":["Aqua Step","Close Combat","Knock Off","Roost","Swords Dance","Triple Axel"],"abilities":["Moxie"],"teraTypes":["Fighting","Water"]}]},"oinkologne":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Curse","Double-Edge","High Horsepower","Lash Out"],"abilities":["Thick Fat"],"teraTypes":["Ground"]}]},"oinkolognef":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Curse","Double-Edge","High Horsepower","Lash Out"],"abilities":["Thick Fat"],"teraTypes":["Ground"]}]},"spidops":{"level":96,"sets":[{"role":"Bulky Support","movepool":["Circle Throw","Knock Off","Spikes","Sticky Web","Toxic Spikes","U-turn"],"abilities":["Stakeout"],"teraTypes":["Ghost"]}]},"lokix":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["First Impression","Knock Off","Leech Life","Sucker Punch"],"abilities":["Tinted Lens"],"teraTypes":["Bug"]},{"role":"Fast Attacker","movepool":["First Impression","Knock Off","Sucker Punch","U-turn"],"abilities":["Tinted Lens"],"teraTypes":["Bug"]},{"role":"Setup Sweeper","movepool":["Knock Off","Leech Life","Sucker Punch","Swords Dance"],"abilities":["Tinted Lens"],"teraTypes":["Dark"]}]},"pawmot":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Double Shock","Knock Off","Nuzzle","Revival Blessing"],"abilities":["Volt Absorb"],"teraTypes":["Electric"]},{"role":"Wallbreaker","movepool":["Close Combat","Double Shock","Ice Punch","Revival Blessing"],"abilities":["Iron Fist"],"teraTypes":["Electric"]}]},"maushold":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Bite","Encore","Population Bomb","Tidy Up"],"abilities":["Technician"],"teraTypes":["Ghost","Normal"]}]},"dachsbun":{"level":92,"sets":[{"role":"Bulky Support","movepool":["Body Press","Play Rough","Protect","Stomping Tantrum","Wish"],"abilities":["Well-Baked Body"],"teraTypes":["Steel"]}]},"arboliva":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Energy Ball","Hyper Voice","Strength Sap"],"abilities":["Seed Sower"],"teraTypes":["Grass","Ground","Poison"]},{"role":"Bulky Support","movepool":["Hyper Voice","Leech Seed","Protect","Substitute"],"abilities":["Harvest"],"teraTypes":["Poison","Water"]}]},"squawkabilly":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Facade","Protect","Quick Attack","U-turn"],"abilities":["Guts"],"teraTypes":["Normal"]}]},"squawkabillywhite":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Double-Edge","Foul Play","Parting Shot","Quick Attack"],"abilities":["Hustle"],"teraTypes":["Flying","Normal"]}]},"squawkabillyblue":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Facade","Protect","Quick Attack","U-turn"],"abilities":["Guts"],"teraTypes":["Normal"]}]},"squawkabillyyellow":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Double-Edge","Foul Play","Parting Shot","Quick Attack"],"abilities":["Hustle"],"teraTypes":["Flying","Normal"]}]},"garganacl":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Protect","Recover","Salt Cure","Stealth Rock"],"abilities":["Purifying Salt"],"teraTypes":["Dragon","Ghost"]},{"role":"Bulky Support","movepool":["Body Press","Protect","Recover","Salt Cure","Stealth Rock"],"abilities":["Purifying Salt"],"teraTypes":["Dragon","Ghost"]},{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Recover","Salt Cure"],"abilities":["Purifying Salt"],"teraTypes":["Dragon","Ghost"]}]},"armarouge":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Armor Cannon","Aura Sphere","Energy Ball","Focus Blast","Psyshock"],"abilities":["Weak Armor"],"teraTypes":["Fighting","Fire","Grass","Psychic"]},{"role":"Setup Sweeper","movepool":["Armor Cannon","Energy Ball","Meteor Beam","Psyshock"],"abilities":["Weak Armor"],"teraTypes":["Fire","Grass"]}]},"ceruledge":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["Bitter Blade","Close Combat","Poltergeist","Shadow Sneak","Swords Dance"],"abilities":["Weak Armor"],"teraTypes":["Fighting","Fire","Ghost"]}]},"bellibolt":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Muddy Water","Slack Off","Thunderbolt","Toxic","Volt Switch"],"abilities":["Electromorphosis"],"teraTypes":["Electric","Water"]}]},"kilowattrel":{"level":83,"sets":[{"role":"Fast Support","movepool":["Hurricane","Roost","Thunder Wave","Thunderbolt","U-turn"],"abilities":["Volt Absorb"],"teraTypes":["Electric","Flying","Steel","Water"]}]},"mabosstiff":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Crunch","Play Rough","Psychic Fangs","Wild Charge"],"abilities":["Stakeout"],"teraTypes":["Dark","Fairy"]}]},"grafaiai":{"level":86,"sets":[{"role":"AV Pivot","movepool":["Gunk Shot","Knock Off","Super Fang","U-turn"],"abilities":["Poison Touch"],"teraTypes":["Dark"]},{"role":"Fast Support","movepool":["Encore","Gunk Shot","Knock Off","Parting Shot"],"abilities":["Prankster"],"teraTypes":["Dark"]},{"role":"Setup Sweeper","movepool":["Gunk Shot","Knock Off","Low Kick","Swords Dance"],"abilities":["Poison Touch"],"teraTypes":["Dark"]}]},"brambleghast":{"level":88,"sets":[{"role":"Fast Support","movepool":["Leech Seed","Poltergeist","Power Whip","Rapid Spin","Spikes","Strength Sap","Substitute"],"abilities":["Wind Rider"],"teraTypes":["Fairy","Steel","Water"]}]},"toedscruel":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Giga Drain","Knock Off","Leaf Storm","Rapid Spin","Spore","Toxic"],"abilities":["Mycelium Might"],"teraTypes":["Water"]}]},"klawf":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["Crabhammer","High Horsepower","Knock Off","Stealth Rock","Stone Edge"],"abilities":["Regenerator"],"teraTypes":["Dark","Ground","Rock","Water"]},{"role":"Setup Sweeper","movepool":["Crabhammer","High Horsepower","Knock Off","Stone Edge","Swords Dance"],"abilities":["Anger Shell"],"teraTypes":["Dark","Ground","Rock","Water"]}]},"scovillain":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["Flamethrower","Leech Seed","Protect","Substitute"],"abilities":["Chlorophyll"],"teraTypes":["Steel"]},{"role":"Fast Attacker","movepool":["Energy Ball","Flamethrower","Leaf Storm","Overheat"],"abilities":["Chlorophyll"],"teraTypes":["Fire","Grass"]},{"role":"Wallbreaker","movepool":["Energy Ball","Fire Blast","Stomping Tantrum","Sunny Day"],"abilities":["Chlorophyll"],"teraTypes":["Fire","Grass","Ground"]}]},"rabsca":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Bug Buzz","Earth Power","Psychic","Revival Blessing","Trick Room"],"abilities":["Synchronize"],"teraTypes":["Steel"]}]},"espathra":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Lumina Crash","Shadow Ball","U-turn"],"abilities":["Speed Boost"],"teraTypes":["Fairy","Psychic"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Protect","Roost","Stored Power","Substitute"],"abilities":["Speed Boost"],"teraTypes":["Fairy"]}]},"tinkaton":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Gigaton Hammer","Knock Off","Play Rough","Stealth Rock","Thunder Wave"],"abilities":["Mold Breaker"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Gigaton Hammer","Knock Off","Play Rough","Swords Dance"],"abilities":["Mold Breaker"],"teraTypes":["Steel"]}]},"wugtrio":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Liquidation","Stomping Tantrum","Throat Chop"],"abilities":["Gooey"],"teraTypes":["Dark","Ground","Water"]}]},"bombirdier":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Knock Off","Roost","Stone Edge","Sucker Punch","U-turn"],"abilities":["Rocky Payload"],"teraTypes":["Rock"]},{"role":"Bulky Support","movepool":["Brave Bird","Knock Off","Roost","Stealth Rock","Sucker Punch","U-turn"],"abilities":["Big Pecks"],"teraTypes":["Dark","Steel"]}]},"palafin":{"level":77,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Flip Turn","Jet Punch","Wave Crash"],"abilities":["Zero to Hero"],"teraTypes":["Fighting","Water"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Ice Punch","Jet Punch","Wave Crash"],"abilities":["Zero to Hero"],"teraTypes":["Dragon","Steel"]}]},"revavroom":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Gunk Shot","High Horsepower","Iron Head","Shift Gear"],"abilities":["Filter"],"teraTypes":["Ground"]}]},"cyclizar":{"level":83,"sets":[{"role":"Fast Support","movepool":["Draco Meteor","Knock Off","Rapid Spin","Shed Tail","Taunt"],"abilities":["Regenerator"],"teraTypes":["Dragon","Fairy","Ghost","Steel"]}]},"orthworm":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Coil","Iron Tail","Rest"],"abilities":["Earth Eater"],"teraTypes":["Electric","Fighting"]},{"role":"Bulky Attacker","movepool":["Body Press","Heavy Slam","Rest","Shed Tail","Spikes","Stealth Rock"],"abilities":["Earth Eater"],"teraTypes":["Electric","Fighting","Ghost","Poison"]}]},"glimmora":{"level":75,"sets":[{"role":"Fast Support","movepool":["Earth Power","Mortal Spin","Power Gem","Sludge Wave","Spikes","Stealth Rock"],"abilities":["Toxic Debris"],"teraTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Earth Power","Energy Ball","Meteor Beam","Sludge Wave"],"abilities":["Toxic Debris"],"teraTypes":["Grass"]}]},"houndstone":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Play Rough","Poltergeist","Roar","Shadow Sneak","Trick","Will-O-Wisp"],"abilities":["Fluffy"],"teraTypes":["Fighting"]},{"role":"Bulky Support","movepool":["Body Press","Poltergeist","Rest","Sleep Talk"],"abilities":["Fluffy"],"teraTypes":["Fighting"]},{"role":"AV Pivot","movepool":["Body Press","Play Rough","Poltergeist","Shadow Sneak"],"abilities":["Fluffy"],"teraTypes":["Fairy","Fighting"]}]},"flamigo":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Close Combat","Throat Chop","U-turn"],"abilities":["Scrappy"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Brave Bird","Close Combat","Roost","Swords Dance","Throat Chop"],"abilities":["Scrappy"],"teraTypes":["Fighting","Steel"]}]},"cetitan":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Ice Shard","Icicle Crash","Liquidation","Superpower"],"abilities":["Sheer Force"],"teraTypes":["Water"]},{"role":"Bulky Setup","movepool":["Belly Drum","Earthquake","Ice Shard","Ice Spinner"],"abilities":["Slush Rush","Thick Fat"],"teraTypes":["Ice"]}]},"veluza":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Aqua Cutter","Aqua Jet","Flip Turn","Night Slash","Psycho Cut"],"abilities":["Sharpness"],"teraTypes":["Dark","Water"]},{"role":"Setup Sweeper","movepool":["Aqua Cutter","Fillet Away","Night Slash","Psycho Cut"],"abilities":["Sharpness"],"teraTypes":["Dark","Psychic","Water"]}]},"dondozo":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Curse","Rest","Sleep Talk","Wave Crash"],"abilities":["Unaware"],"teraTypes":["Dragon","Fairy"]}]},"tatsugiri":{"level":87,"sets":[{"role":"Fast Support","movepool":["Draco Meteor","Hydro Pump","Nasty Plot","Rapid Spin","Surf"],"abilities":["Storm Drain"],"teraTypes":["Water"]}]},"farigiraf":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Body Slam","Protect","Psychic Noise","Wish"],"abilities":["Sap Sipper"],"teraTypes":["Fairy","Ground","Water"]},{"role":"Bulky Attacker","movepool":["Future Sight","Hyper Voice","Protect","Wish"],"abilities":["Sap Sipper"],"teraTypes":["Fairy","Ground","Water"]}]},"dudunsparce":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Glare","Headbutt","Roost"],"abilities":["Serene Grace"],"teraTypes":["Ghost","Ground"]},{"role":"Bulky Attacker","movepool":["Boomburst","Calm Mind","Earth Power","Roost"],"abilities":["Rattled"],"teraTypes":["Fairy","Ghost"]},{"role":"Bulky Setup","movepool":["Boomburst","Calm Mind","Roost","Shadow Ball"],"abilities":["Rattled"],"teraTypes":["Ghost"]}]},"kingambit":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["Iron Head","Kowtow Cleave","Sucker Punch","Swords Dance"],"abilities":["Supreme Overlord"],"teraTypes":["Dark","Flying"]}]},"greattusk":{"level":77,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Earthquake","Rapid Spin","Stone Edge"],"abilities":["Protosynthesis"],"teraTypes":["Ground","Steel"]},{"role":"Bulky Setup","movepool":["Bulk Up","Close Combat","Earthquake","Rapid Spin","Stone Edge"],"abilities":["Protosynthesis"],"teraTypes":["Ground","Steel"]},{"role":"Bulky Support","movepool":["Close Combat","Headlong Rush","Ice Spinner","Knock Off","Rapid Spin","Stealth Rock","Stone Edge"],"abilities":["Protosynthesis"],"teraTypes":["Ground","Steel"]}]},"brutebonnet":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Seed Bomb","Spore","Sucker Punch"],"abilities":["Protosynthesis"],"teraTypes":["Fighting","Poison"]},{"role":"Bulky Support","movepool":["Crunch","Seed Bomb","Spore","Sucker Punch"],"abilities":["Protosynthesis"],"teraTypes":["Dark","Poison"]},{"role":"Wallbreaker","movepool":["Close Combat","Crunch","Seed Bomb","Sucker Punch"],"abilities":["Protosynthesis"],"teraTypes":["Dark","Fighting","Poison"]}]},"sandyshocks":{"level":80,"sets":[{"role":"Fast Support","movepool":["Earth Power","Spikes","Stealth Rock","Thunder Wave","Thunderbolt","Volt Switch"],"abilities":["Protosynthesis"],"teraTypes":["Electric","Grass","Ground"]}]},"screamtail":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Encore","Play Rough","Protect","Thunder Wave","Wish"],"abilities":["Protosynthesis"],"teraTypes":["Poison","Steel"]},{"role":"Bulky Attacker","movepool":["Dazzling Gleam","Encore","Protect","Thunder Wave","Wish"],"abilities":["Protosynthesis"],"teraTypes":["Poison","Steel"]}]},"fluttermane":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Moonblast","Mystical Fire","Psyshock","Shadow Ball","Thunderbolt"],"abilities":["Protosynthesis"],"teraTypes":["Electric","Fairy","Fire","Ghost","Psychic"]}]},"slitherwing":{"level":81,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Earthquake","Flame Charge","Leech Life","Wild Charge"],"abilities":["Protosynthesis"],"teraTypes":["Electric","Fighting"]},{"role":"Fast Support","movepool":["Close Combat","Earthquake","First Impression","Flare Blitz","Morning Sun","U-turn","Wild Charge"],"abilities":["Protosynthesis"],"teraTypes":["Bug","Electric","Fighting","Fire"]}]},"roaringmoon":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Iron Head","Knock Off","Outrage","Roost"],"abilities":["Protosynthesis"],"teraTypes":["Dark","Dragon","Ground","Poison","Steel"]},{"role":"Fast Bulky Setup","movepool":["Acrobatics","Dragon Dance","Iron Head","Knock Off","Outrage"],"abilities":["Protosynthesis"],"teraTypes":["Flying","Steel"]},{"role":"Bulky Attacker","movepool":["Iron Head","Knock Off","Outrage","U-turn"],"abilities":["Protosynthesis"],"teraTypes":["Dark","Dragon","Steel"]}]},"walkingwake":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["Draco Meteor","Flamethrower","Flip Turn","Hydro Pump"],"abilities":["Protosynthesis"],"teraTypes":["Fire","Water"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Flamethrower","Hydro Steam","Sunny Day"],"abilities":["Protosynthesis"],"teraTypes":["Fire"]}]},"irontreads":{"level":77,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Iron Head","Knock Off","Rapid Spin","Stealth Rock","Volt Switch"],"abilities":["Quark Drive"],"teraTypes":["Ground","Steel"]}]},"ironmoth":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Energy Ball","Fiery Dance","Fire Blast","Morning Sun","Sludge Wave","Toxic Spikes","U-turn"],"abilities":["Quark Drive"],"teraTypes":["Fire","Grass"]}]},"ironhands":{"level":79,"sets":[{"role":"AV Pivot","movepool":["Close Combat","Drain Punch","Fake Out","Heavy Slam","Ice Punch","Thunder Punch","Volt Switch","Wild Charge"],"abilities":["Quark Drive"],"teraTypes":["Electric","Fighting"]},{"role":"Bulky Attacker","movepool":["Drain Punch","Ice Punch","Swords Dance","Thunder Punch","Wild Charge"],"abilities":["Quark Drive"],"teraTypes":["Fighting","Flying","Steel"]}]},"ironjugulis":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Earth Power","Fire Blast","Hurricane","Hydro Pump","U-turn"],"abilities":["Quark Drive"],"teraTypes":["Dark","Flying","Ground"]}]},"ironthorns":{"level":83,"sets":[{"role":"Fast Support","movepool":["Earthquake","Ice Punch","Spikes","Stealth Rock","Stone Edge","Volt Switch","Wild Charge"],"abilities":["Quark Drive"],"teraTypes":["Flying","Grass","Water"]},{"role":"Fast Bulky Setup","movepool":["Dragon Dance","Earthquake","Ice Punch","Stone Edge","Wild Charge"],"abilities":["Quark Drive"],"teraTypes":["Flying","Grass","Ground","Rock"]}]},"ironbundle":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Encore","Flip Turn","Freeze-Dry","Hydro Pump","Ice Beam","Substitute"],"abilities":["Quark Drive"],"teraTypes":["Ice","Water"]}]},"ironvaliant":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Spirit Break","Swords Dance"],"abilities":["Quark Drive"],"teraTypes":["Dark","Fighting"]},{"role":"Fast Attacker","movepool":["Calm Mind","Close Combat","Moonblast","Psychic"],"abilities":["Quark Drive"],"teraTypes":["Fairy","Fighting","Steel"]},{"role":"Wallbreaker","movepool":["Close Combat","Encore","Knock Off","Moonblast"],"abilities":["Quark Drive"],"teraTypes":["Dark","Fairy","Fighting","Steel"]}]},"ironleaves":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Leaf Blade","Megahorn","Psyblade","Swords Dance"],"abilities":["Quark Drive"],"teraTypes":["Fighting"]}]},"baxcalibur":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Glaive Rush","Ice Shard","Icicle Crash"],"abilities":["Thermal Exchange"],"teraTypes":["Dragon","Ground"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Glaive Rush","Icicle Crash"],"abilities":["Thermal Exchange"],"teraTypes":["Dragon","Ground"]},{"role":"Bulky Setup","movepool":["Earthquake","Icicle Spear","Scale Shot","Swords Dance"],"abilities":["Thermal Exchange"],"teraTypes":["Dragon","Ground"]}]},"gholdengo":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["Focus Blast","Make It Rain","Nasty Plot","Shadow Ball","Trick"],"abilities":["Good as Gold"],"teraTypes":["Fighting","Ghost","Steel"]},{"role":"Bulky Support","movepool":["Make It Rain","Nasty Plot","Recover","Shadow Ball","Thunder Wave"],"abilities":["Good as Gold"],"teraTypes":["Dark","Steel","Water"]}]},"tinglu":{"level":78,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Spikes","Stealth Rock","Throat Chop","Whirlwind"],"abilities":["Vessel of Ruin"],"teraTypes":["Ghost","Poison"]},{"role":"Bulky Attacker","movepool":["Earthquake","Heavy Slam","Payback","Ruination","Spikes","Stealth Rock"],"abilities":["Vessel of Ruin"],"teraTypes":["Ghost","Poison","Steel"]}]},"chienpao":{"level":72,"sets":[{"role":"Wallbreaker","movepool":["Crunch","Ice Shard","Icicle Crash","Sacred Sword","Throat Chop"],"abilities":["Sword of Ruin"],"teraTypes":["Dark","Fighting","Ice"]},{"role":"Setup Sweeper","movepool":["Ice Shard","Icicle Crash","Sacred Sword","Sucker Punch","Swords Dance","Throat Chop"],"abilities":["Sword of Ruin"],"teraTypes":["Dark","Fighting","Ice"]}]},"wochien":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Giga Drain","Knock Off","Leech Seed","Protect","Ruination","Stun Spore"],"abilities":["Tablets of Ruin"],"teraTypes":["Poison"]}]},"chiyu":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Fire Blast","Nasty Plot","Psychic","Will-O-Wisp"],"abilities":["Beads of Ruin"],"teraTypes":["Dark","Fire"]},{"role":"Fast Attacker","movepool":["Dark Pulse","Flamethrower","Overheat","Psychic"],"abilities":["Beads of Ruin"],"teraTypes":["Dark","Fire"]}]},"koraidon":{"level":64,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Flare Blitz","Outrage","U-turn"],"abilities":["Orichalcum Pulse"],"teraTypes":["Fire"]},{"role":"Setup Sweeper","movepool":["Collision Course","Flare Blitz","Scale Shot","Swords Dance"],"abilities":["Orichalcum Pulse"],"teraTypes":["Fire"]}]},"miraidon":{"level":65,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Draco Meteor","Electro Drift","Substitute"],"abilities":["Hadron Engine"],"teraTypes":["Electric"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Electro Drift","Overheat","Volt Switch"],"abilities":["Hadron Engine"],"teraTypes":["Electric"]}]},"dipplin":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Dragon Pulse","Dragon Tail","Giga Drain","Recover","Sucker Punch"],"abilities":["Sticky Hold"],"teraTypes":["Steel"]}]},"sinistcha":{"level":83,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Matcha Gotcha","Shadow Ball","Strength Sap"],"abilities":["Heatproof"],"teraTypes":["Steel"]}]},"okidogi":{"level":77,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Gunk Shot","Knock Off"],"abilities":["Toxic Chain"],"teraTypes":["Dark"]},{"role":"AV Pivot","movepool":["Drain Punch","Gunk Shot","High Horsepower","Knock Off","Psychic Fangs"],"abilities":["Toxic Chain"],"teraTypes":["Dark"]}]},"munkidori":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Nasty Plot","Psyshock","Sludge Wave","U-turn"],"abilities":["Toxic Chain"],"teraTypes":["Fighting","Poison"]},{"role":"AV Pivot","movepool":["Fake Out","Psychic Noise","Sludge Wave","U-turn"],"abilities":["Toxic Chain"],"teraTypes":["Dark"]}]},"fezandipiti":{"level":82,"sets":[{"role":"AV Pivot","movepool":["Beat Up","Gunk Shot","Heat Wave","Play Rough","U-turn"],"abilities":["Toxic Chain"],"teraTypes":["Dark","Steel","Water"]},{"role":"Bulky Attacker","movepool":["Beat Up","Gunk Shot","Play Rough","Roost","U-turn"],"abilities":["Toxic Chain"],"teraTypes":["Dark","Steel","Water"]},{"role":"Tera Blast user","movepool":["Gunk Shot","Play Rough","Swords Dance","Tera Blast"],"abilities":["Toxic Chain"],"teraTypes":["Ground"]}]},"ogerpon":{"level":80,"sets":[{"role":"Fast Support","movepool":["Encore","Ivy Cudgel","Knock Off","Spikes","Superpower","Synthesis","U-turn"],"abilities":["Defiant"],"teraTypes":["Grass"]},{"role":"Setup Sweeper","movepool":["Ivy Cudgel","Knock Off","Superpower","Swords Dance"],"abilities":["Defiant"],"teraTypes":["Grass"]}]},"ogerponwellspring":{"level":76,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Ivy Cudgel","Spikes","Synthesis","U-turn","Wood Hammer"],"abilities":["Water Absorb"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Knock Off","Play Rough","Power Whip","Swords Dance"],"abilities":["Water Absorb"],"teraTypes":["Water"]}]},"ogerponhearthflame":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Knock Off","Power Whip","Stomping Tantrum","Swords Dance"],"abilities":["Mold Breaker"],"teraTypes":["Fire"]}]},"ogerponcornerstone":{"level":76,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Ivy Cudgel","Power Whip","Spikes","Superpower","Synthesis"],"abilities":["Sturdy"],"teraTypes":["Rock"]},{"role":"Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Power Whip","Superpower","Swords Dance"],"abilities":["Sturdy"],"teraTypes":["Rock"]}]},"archaludon":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Earthquake","Iron Head","Outrage","Swords Dance"],"abilities":["Stamina"],"teraTypes":["Ground"]},{"role":"Bulky Attacker","movepool":["Body Press","Draco Meteor","Dragon Tail","Flash Cannon","Stealth Rock","Thunder Wave","Thunderbolt"],"abilities":["Stamina"],"teraTypes":["Fighting"]}]},"hydrapple":{"level":83,"sets":[{"role":"AV Pivot","movepool":["Dragon Tail","Earth Power","Fickle Beam","Giga Drain","Leaf Storm"],"abilities":["Regenerator"],"teraTypes":["Steel"]},{"role":"Fast Bulky Setup","movepool":["Earth Power","Fickle Beam","Giga Drain","Nasty Plot","Recover"],"abilities":["Regenerator"],"teraTypes":["Steel"]},{"role":"Wallbreaker","movepool":["Draco Meteor","Earth Power","Fickle Beam","Leaf Storm"],"abilities":["Regenerator"],"teraTypes":["Dragon","Steel"]}]},"gougingfire":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Heat Crash","Outrage"],"abilities":["Protosynthesis"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Dragon Dance","Heat Crash","Morning Sun","Outrage"],"abilities":["Protosynthesis"],"teraTypes":["Fairy"]}]},"ragingbolt":{"level":78,"sets":[{"role":"AV Pivot","movepool":["Discharge","Draco Meteor","Thunderbolt","Thunderclap","Volt Switch"],"abilities":["Protosynthesis"],"teraTypes":["Electric"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dragon Pulse","Thunderbolt","Thunderclap"],"abilities":["Protosynthesis"],"teraTypes":["Electric","Fairy"]}]},"ironboulder":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Mighty Cleave","Swords Dance","Zen Headbutt"],"abilities":["Quark Drive"],"teraTypes":["Fighting"]},{"role":"Fast Bulky Setup","movepool":["Close Combat","Mighty Cleave","Swords Dance","Zen Headbutt"],"abilities":["Quark Drive"],"teraTypes":["Fighting"]}]},"ironcrown":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Focus Blast","Psyshock","Tachyon Cutter"],"abilities":["Quark Drive"],"teraTypes":["Fighting","Steel"]},{"role":"Wallbreaker","movepool":["Focus Blast","Psyshock","Tachyon Cutter","Volt Switch"],"abilities":["Quark Drive"],"teraTypes":["Fighting","Steel"]}]},"terapagos":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Dark Pulse","Rapid Spin","Rest","Tera Starstorm"],"abilities":["Tera Shift"],"teraTypes":["Stellar"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Earth Power","Rapid Spin","Rest","Tera Starstorm"],"abilities":["Tera Shift"],"teraTypes":["Stellar"]}]},"pecharunt":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["Malignant Chain","Nasty Plot","Parting Shot","Recover","Shadow Ball"],"abilities":["Poison Puppeteer"],"teraTypes":["Dark"]}]}} as any;
/* eslint-enable */

/* eslint-disable */
const randomDoublesSetsJSON = {"venusaur":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Earth Power","Giga Drain","Knock Off","Leaf Storm","Protect","Sludge Bomb"],"abilities":["Chlorophyll","Overgrow"],"teraTypes":["Dark","Water"]}]},"charizard":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Heat Wave","Hurricane","Protect","Scorching Sands","Will-O-Wisp"],"abilities":["Blaze","Solar Power"],"teraTypes":["Dragon","Fire","Ground"]}]},"blastoise":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fake Out","Flip Turn","Icy Wind","Life Dew","Wave Crash","Yawn"],"abilities":["Torrent"],"teraTypes":["Dragon","Grass"]},{"role":"Doubles Setup Sweeper","movepool":["Dragon Pulse","Muddy Water","Protect","Shell Smash"],"abilities":["Torrent"],"teraTypes":["Dragon","Water"]}]},"arbok":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Coil","Gunk Shot","Knock Off","Protect","Stomping Tantrum"],"abilities":["Intimidate"],"teraTypes":["Dark","Ground"]},{"role":"Doubles Bulky Attacker","movepool":["Dragon Tail","Glare","Gunk Shot","Knock Off","Toxic Spikes"],"abilities":["Intimidate"],"teraTypes":["Dark"]}]},"pikachu":{"level":94,"sets":[{"role":"Doubles Support","movepool":["Encore","Fake Out","Grass Knot","Knock Off","Protect","Volt Tackle"],"abilities":["Lightning Rod"],"teraTypes":["Electric","Grass"]}]},"raichu":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Encore","Fake Out","Grass Knot","Knock Off","Nuzzle","Thunderbolt"],"abilities":["Lightning Rod"],"teraTypes":["Electric","Grass"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Tera Blast","Thunderbolt"],"abilities":["Lightning Rod"],"teraTypes":["Ice"]}]},"raichualola":{"level":89,"sets":[{"role":"Choice Item user","movepool":["Alluring Voice","Focus Blast","Grass Knot","Psychic","Psyshock","Thunderbolt","Volt Switch"],"abilities":["Surge Surfer"],"teraTypes":["Electric","Fairy","Fighting","Grass"]},{"role":"Doubles Setup Sweeper","movepool":["Nasty Plot","Protect","Psychic","Psyshock","Thunderbolt"],"abilities":["Surge Surfer"],"teraTypes":["Dark","Electric","Flying"]}]},"sandslash":{"level":92,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Gunk Shot","High Horsepower","Knock Off","Protect","Rapid Spin","Stone Edge","Swords Dance"],"abilities":["Sand Rush"],"teraTypes":["Poison","Rock"]},{"role":"Doubles Bulky Attacker","movepool":["High Horsepower","Knock Off","Rapid Spin","Rock Slide","Super Fang"],"abilities":["Sand Rush"],"teraTypes":["Grass","Water"]}]},"sandslashalola":{"level":90,"sets":[{"role":"Doubles Wallbreaker","movepool":["Drill Run","Ice Shard","Iron Head","Knock Off","Triple Axel"],"abilities":["Slush Rush"],"teraTypes":["Flying","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Drill Run","Ice Shard","Iron Head","Triple Axel"],"abilities":["Slush Rush"],"teraTypes":["Flying","Water"]}]},"clefairy":{"level":97,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Heal Pulse","Helping Hand","Life Dew","Moonblast"],"abilities":["Friend Guard"],"teraTypes":["Fire","Steel","Water"]}]},"clefable":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Heal Pulse","Icy Wind","Knock Off","Life Dew","Moonblast","Thunder Wave"],"abilities":["Magic Guard","Unaware"],"teraTypes":["Fire","Steel","Water"]},{"role":"Doubles Support","movepool":["Encore","Fire Blast","Follow Me","Heal Pulse","Helping Hand","Life Dew","Moonblast"],"abilities":["Unaware"],"teraTypes":["Fire","Steel","Water"]}]},"ninetales":{"level":80,"sets":[{"role":"Doubles Wallbreaker","movepool":["Flamethrower","Heat Wave","Overheat","Protect","Scorching Sands","Solar Beam"],"abilities":["Drought"],"teraTypes":["Fire","Grass"]}]},"ninetalesalola":{"level":75,"sets":[{"role":"Doubles Support","movepool":["Aurora Veil","Blizzard","Moonblast","Protect"],"abilities":["Snow Warning"],"teraTypes":["Ice","Steel","Water"]}]},"wigglytuff":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Dazzling Gleam","Disable","Encore","Fire Blast","Heal Pulse","Helping Hand","Icy Wind","Thunder Wave"],"abilities":["Competitive"],"teraTypes":["Fire","Steel"]}]},"vileplume":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Pollen Puff","Sludge Bomb","Strength Sap","Stun Spore"],"abilities":["Effect Spore"],"teraTypes":["Steel","Water"]}]},"venomoth":{"level":90,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bug Buzz","Protect","Quiver Dance","Sleep Powder","Sludge Bomb"],"abilities":["Tinted Lens"],"teraTypes":["Bug","Steel","Water"]}]},"dugtrio":{"level":90,"sets":[{"role":"Offensive Protect","movepool":["Helping Hand","Protect","Rock Slide","Stomping Tantrum","Sucker Punch"],"abilities":["Arena Trap"],"teraTypes":["Fire","Ghost","Ground"]}]},"dugtrioalola":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Iron Head","Protect","Rock Slide","Stomping Tantrum","Sucker Punch"],"abilities":["Sand Force","Tangling Hair"],"teraTypes":["Fire","Steel","Water"]}]},"persian":{"level":93,"sets":[{"role":"Doubles Support","movepool":["Double-Edge","Fake Out","Helping Hand","Icy Wind","Knock Off","Taunt","U-turn"],"abilities":["Technician"],"teraTypes":["Ghost","Normal"]}]},"persianalola":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Fake Out","Foul Play","Helping Hand","Icy Wind","Knock Off","Parting Shot","Snarl","Taunt","Thunder Wave"],"abilities":["Fur Coat"],"teraTypes":["Poison"]}]},"golduck":{"level":91,"sets":[{"role":"Doubles Fast Attacker","movepool":["Encore","Grass Knot","Hydro Pump","Ice Beam","Icy Wind","Protect","Psyshock"],"abilities":["Cloud Nine","Swift Swim"],"teraTypes":["Grass","Water"]},{"role":"Offensive Protect","movepool":["Grass Knot","Hydro Pump","Ice Beam","Protect","Psyshock"],"abilities":["Cloud Nine","Swift Swim"],"teraTypes":["Grass","Water"]}]},"annihilape":{"level":77,"sets":[{"role":"Bulky Protect","movepool":["Bulk Up","Drain Punch","Protect","Rage Fist"],"abilities":["Defiant"],"teraTypes":["Fire","Steel","Water"]},{"role":"Choice Item user","movepool":["Close Combat","Final Gambit","Rage Fist","U-turn"],"abilities":["Defiant"],"teraTypes":["Fighting"]}]},"arcanine":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Howl","Morning Sun","Snarl","Will-O-Wisp"],"abilities":["Intimidate"],"teraTypes":["Fighting","Normal","Steel","Water"]}]},"arcaninehisui":{"level":79,"sets":[{"role":"Choice Item user","movepool":["Extreme Speed","Flare Blitz","Rock Slide","Stone Edge"],"abilities":["Intimidate"],"teraTypes":["Normal","Rock"]},{"role":"Bulky Protect","movepool":["Flare Blitz","Morning Sun","Protect","Rock Slide","Will-O-Wisp"],"abilities":["Intimidate"],"teraTypes":["Fairy","Grass"]}]},"poliwrath":{"level":90,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Circle Throw","Close Combat","Coaching","Icy Wind","Knock Off","Liquidation"],"abilities":["Water Absorb"],"teraTypes":["Dragon","Fire","Ground","Steel"]}]},"victreebel":{"level":90,"sets":[{"role":"Offensive Protect","movepool":["Knock Off","Power Whip","Protect","Sludge Bomb","Sucker Punch"],"abilities":["Chlorophyll"],"teraTypes":["Dark","Grass"]}]},"tentacruel":{"level":85,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Acid Spray","Hydro Pump","Icy Wind","Knock Off","Muddy Water","Sludge Bomb","Toxic Spikes"],"abilities":["Clear Body"],"teraTypes":["Grass"]}]},"golem":{"level":87,"sets":[{"role":"Doubles Wallbreaker","movepool":["Fire Punch","High Horsepower","Rock Slide","Stone Edge"],"abilities":["Sturdy"],"teraTypes":["Grass"]}]},"golemalola":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Double-Edge","High Horsepower","Protect","Rock Slide","Thunder Wave"],"abilities":["Galvanize"],"teraTypes":["Grass","Ground"]},{"role":"Doubles Wallbreaker","movepool":["Double-Edge","Explosion","High Horsepower","Rock Slide"],"abilities":["Galvanize"],"teraTypes":["Grass","Ground"]}]},"slowbro":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Fire Blast","Heal Pulse","Helping Hand","Psyshock","Scald","Trick Room"],"abilities":["Regenerator"],"teraTypes":["Dark","Grass"]},{"role":"Doubles Wallbreaker","movepool":["Fire Blast","Hydro Pump","Ice Beam","Psyshock","Scald","Trick Room"],"abilities":["Regenerator"],"teraTypes":["Dark","Fire","Water"]}]},"slowbrogalar":{"level":86,"sets":[{"role":"Doubles Wallbreaker","movepool":["Fire Blast","Psychic","Shell Side Arm","Trick Room"],"abilities":["Regenerator"],"teraTypes":["Dark","Fire","Poison"]}]},"dodrio":{"level":85,"sets":[{"role":"Doubles Wallbreaker","movepool":["Brave Bird","Double-Edge","Drill Run","Knock Off","Quick Attack"],"abilities":["Early Bird"],"teraTypes":["Ground","Normal"]},{"role":"Offensive Protect","movepool":["Brave Bird","Drill Run","Protect","Quick Attack","Swords Dance"],"abilities":["Early Bird"],"teraTypes":["Ground"]}]},"dewgong":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Encore","Fake Out","Hydro Pump","Icy Wind"],"abilities":["Thick Fat"],"teraTypes":["Grass"]}]},"muk":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Drain Punch","Gunk Shot","Haze","Helping Hand","Ice Punch","Knock Off","Poison Gas","Poison Jab","Shadow Sneak"],"abilities":["Poison Touch"],"teraTypes":["Dark"]}]},"mukalola":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Drain Punch","Gunk Shot","Helping Hand","Ice Punch","Knock Off","Poison Jab","Protect","Snarl"],"abilities":["Poison Touch"],"teraTypes":["Flying"]}]},"cloyster":{"level":87,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Hydro Pump","Icicle Spear","Protect","Rock Blast","Shell Smash"],"abilities":["Skill Link"],"teraTypes":["Fire","Ice","Rock","Water"]}]},"gengar":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["Encore","Protect","Shadow Ball","Sludge Bomb"],"abilities":["Cursed Body"],"teraTypes":["Ghost"]},{"role":"Doubles Fast Attacker","movepool":["Focus Blast","Protect","Shadow Ball","Sludge Bomb","Trick"],"abilities":["Cursed Body"],"teraTypes":["Fighting","Ghost"]}]},"hypno":{"level":95,"sets":[{"role":"Doubles Support","movepool":["Encore","Helping Hand","Knock Off","Low Sweep","Poison Gas","Psychic"],"abilities":["Inner Focus"],"teraTypes":["Dark"]}]},"electrode":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Electroweb","Foul Play","Helping Hand","Taunt","Thunderbolt","Volt Switch"],"abilities":["Aftermath","Soundproof","Static"],"teraTypes":["Flying"]},{"role":"Tera Blast user","movepool":["Protect","Tera Blast","Thunderbolt","Volt Switch"],"abilities":["Aftermath","Soundproof","Static"],"teraTypes":["Ice"]}]},"electrodehisui":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Electroweb","Energy Ball","Leaf Storm","Taunt","Thunderbolt","Volt Switch"],"abilities":["Aftermath","Soundproof","Static"],"teraTypes":["Steel"]},{"role":"Offensive Protect","movepool":["Foul Play","Leaf Storm","Protect","Thunderbolt","Volt Switch"],"abilities":["Aftermath","Soundproof","Static"],"teraTypes":["Dark","Electric","Grass","Steel"]}]},"exeggutor":{"level":88,"sets":[{"role":"Doubles Wallbreaker","movepool":["Energy Ball","Leaf Storm","Protect","Psychic","Trick Room"],"abilities":["Harvest"],"teraTypes":["Fire","Poison","Steel"]}]},"exeggutoralola":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Flamethrower","Protect","Trick Room","Wood Hammer"],"abilities":["Harvest"],"teraTypes":["Fire"]}]},"hitmonlee":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Fake Out","Knock Off","Poison Jab","Protect"],"abilities":["Unburden"],"teraTypes":["Dark","Poison"]}]},"hitmonchan":{"level":90,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Coaching","Fake Out","Knock Off","Poison Jab"],"abilities":["Inner Focus"],"teraTypes":["Dark","Poison"]}]},"weezing":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Clear Smog","Fire Blast","Gunk Shot","Poison Gas","Protect","Taunt","Will-O-Wisp"],"abilities":["Levitate","Neutralizing Gas"],"teraTypes":["Dark"]}]},"weezinggalar":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fire Blast","Gunk Shot","Haze","Poison Gas","Protect","Strange Steam","Taunt","Will-O-Wisp"],"abilities":["Levitate","Neutralizing Gas"],"teraTypes":["Dark","Steel"]}]},"rhydon":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Helping Hand","High Horsepower","Protect","Rock Slide","Stealth Rock","Stone Edge"],"abilities":["Lightning Rod"],"teraTypes":["Flying","Grass","Water"]}]},"scyther":{"level":80,"sets":[{"role":"Bulky Protect","movepool":["Bug Bite","Dual Wingbeat","Protect","Tailwind"],"abilities":["Technician"],"teraTypes":["Flying","Steel"]}]},"electabuzz":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Electroweb","Follow Me","Knock Off","Protect","Thunderbolt"],"abilities":["Static"],"teraTypes":["Flying","Grass"]}]},"magmar":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Heat Wave","Knock Off","Protect","Will-O-Wisp"],"abilities":["Flame Body"],"teraTypes":["Grass"]}]},"tauros":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Double-Edge","High Horsepower","Lash Out","Stone Edge","Throat Chop"],"abilities":["Intimidate"],"teraTypes":["Fighting","Normal"]}]},"taurospaldeacombat":{"level":82,"sets":[{"role":"Bulky Protect","movepool":["Bulk Up","Protect","Raging Bull","Stone Edge"],"abilities":["Intimidate"],"teraTypes":["Steel"]},{"role":"Doubles Wallbreaker","movepool":["Close Combat","High Horsepower","Iron Head","Rock Slide","Stone Edge","Throat Chop"],"abilities":["Intimidate"],"teraTypes":["Dark","Fighting","Steel"]}]},"taurospaldeablaze":{"level":79,"sets":[{"role":"Bulky Protect","movepool":["Bulk Up","Close Combat","Protect","Raging Bull","Will-O-Wisp"],"abilities":["Intimidate"],"teraTypes":["Fighting","Fire","Water"]},{"role":"Doubles Wallbreaker","movepool":["Close Combat","Flare Blitz","Rock Slide","Stone Edge","Wild Charge"],"abilities":["Intimidate"],"teraTypes":["Fighting","Fire","Water"]}]},"taurospaldeaaqua":{"level":81,"sets":[{"role":"Bulky Protect","movepool":["Aqua Jet","Bulk Up","Close Combat","Liquidation","Protect"],"abilities":["Intimidate"],"teraTypes":["Fire","Steel","Water"]},{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Close Combat","Wave Crash","Wild Charge","Zen Headbutt"],"abilities":["Intimidate"],"teraTypes":["Fire","Steel","Water"]}]},"gyarados":{"level":81,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dragon Dance","Earthquake","Protect","Temper Flare","Waterfall"],"abilities":["Intimidate"],"teraTypes":["Ground"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Protect","Tera Blast","Waterfall"],"abilities":["Intimidate"],"teraTypes":["Flying"]},{"role":"Doubles Support","movepool":["Helping Hand","Icy Wind","Taunt","Thunder Wave","Waterfall"],"abilities":["Intimidate"],"teraTypes":["Ground","Water"]}]},"lapras":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Freeze-Dry","Icy Wind","Life Dew","Muddy Water","Protect"],"abilities":["Water Absorb"],"teraTypes":["Ground"]}]},"ditto":{"level":97,"sets":[{"role":"Choice Item user","movepool":["Transform"],"abilities":["Imposter"],"teraTypes":["Bug","Dark","Dragon","Electric","Fairy","Fighting","Fire","Flying","Ghost","Grass","Ground","Ice","Normal","Poison","Psychic","Rock","Steel","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Transform"],"abilities":["Imposter"],"teraTypes":["Bug","Dark","Dragon","Electric","Fairy","Fighting","Fire","Flying","Ghost","Grass","Ground","Ice","Normal","Poison","Psychic","Rock","Steel","Water"]}]},"vaporeon":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Icy Wind","Muddy Water","Protect","Scald","Wish","Yawn"],"abilities":["Water Absorb"],"teraTypes":["Dragon","Fire","Ground"]}]},"jolteon":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["Alluring Voice","Helping Hand","Protect","Thunder Wave","Thunderbolt"],"abilities":["Volt Absorb"],"teraTypes":["Fairy"]},{"role":"Tera Blast user","movepool":["Calm Mind","Protect","Tera Blast","Thunderbolt"],"abilities":["Volt Absorb"],"teraTypes":["Ice"]}]},"flareon":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Facade","Flare Blitz","Protect","Quick Attack"],"abilities":["Guts"],"teraTypes":["Normal"]}]},"snorlax":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Crunch","Double-Edge","Hammer Arm","Heat Crash","High Horsepower"],"abilities":["Thick Fat"],"teraTypes":["Fire","Ghost","Ground"]},{"role":"Doubles Bulky Attacker","movepool":["Body Slam","Encore","Helping Hand","High Horsepower","Icy Wind","Recycle","Yawn"],"abilities":["Gluttony"],"teraTypes":["Ghost","Ground"]},{"role":"Doubles Bulky Setup","movepool":["Body Slam","Crunch","Curse","High Horsepower","Protect","Recycle"],"abilities":["Gluttony"],"teraTypes":["Ground","Poison"]}]},"articuno":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Freeze-Dry","Ice Beam","Icy Wind","Protect","Roost","Tailwind"],"abilities":["Pressure"],"teraTypes":["Ground","Steel"]}]},"articunogalar":{"level":82,"sets":[{"role":"Doubles Fast Attacker","movepool":["Freezing Glare","Hurricane","Protect","Recover","Tailwind"],"abilities":["Competitive"],"teraTypes":["Flying","Ground","Steel"]}]},"zapdos":{"level":77,"sets":[{"role":"Doubles Support","movepool":["Hurricane","Protect","Roost","Tailwind","Thunderbolt"],"abilities":["Static"],"teraTypes":["Electric","Steel"]},{"role":"Doubles Fast Attacker","movepool":["Heat Wave","Hurricane","Protect","Tailwind","Thunderbolt"],"abilities":["Static"],"teraTypes":["Electric","Fire"]}]},"zapdosgalar":{"level":77,"sets":[{"role":"Doubles Fast Attacker","movepool":["Brave Bird","Close Combat","Knock Off","Protect","Tailwind","Thunderous Kick","U-turn"],"abilities":["Defiant"],"teraTypes":["Fighting"]}]},"moltres":{"level":79,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Fire Blast","Heat Wave","Protect","Scorching Sands","Tailwind"],"abilities":["Flame Body"],"teraTypes":["Fire","Ground"]}]},"moltresgalar":{"level":75,"sets":[{"role":"Doubles Bulky Setup","movepool":["Fiery Wrath","Hurricane","Nasty Plot","Protect","Tailwind"],"abilities":["Berserk"],"teraTypes":["Dark"]}]},"dragonite":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Dragon Claw","Extreme Speed","Fire Punch","Iron Head","Low Kick","Stomping Tantrum"],"abilities":["Inner Focus"],"teraTypes":["Normal"]},{"role":"Tera Blast user","movepool":["Draco Meteor","Fire Punch","Low Kick","Tailwind","Tera Blast"],"abilities":["Inner Focus"],"teraTypes":["Flying"]}]},"mewtwo":{"level":73,"sets":[{"role":"Doubles Fast Attacker","movepool":["Aura Sphere","Dark Pulse","Fire Blast","Protect","Psystrike"],"abilities":["Unnerve"],"teraTypes":["Dark","Fighting","Fire","Psychic"]},{"role":"Doubles Bulky Setup","movepool":["Aura Sphere","Nasty Plot","Psystrike","Recover"],"abilities":["Unnerve"],"teraTypes":["Fighting"]}]},"mew":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Coaching","Encore","Pollen Puff","Tailwind","Thunder Wave","Will-O-Wisp"],"abilities":["Synchronize"],"teraTypes":["Fairy","Steel"]},{"role":"Doubles Setup Sweeper","movepool":["Baton Pass","Fire Blast","Nasty Plot","Pollen Puff","Psychic"],"abilities":["Synchronize"],"teraTypes":["Fairy","Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Coaching","Imprison","Pollen Puff","Transform"],"abilities":["Synchronize"],"teraTypes":["Fairy","Steel"]}]},"meganium":{"level":91,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Encore","Energy Ball","Heal Pulse","Knock Off","Leech Seed"],"abilities":["Overgrow"],"teraTypes":["Poison","Steel","Water"]}]},"typhlosion":{"level":79,"sets":[{"role":"Choice Item user","movepool":["Eruption","Fire Blast","Heat Wave","Scorching Sands"],"abilities":["Flash Fire"],"teraTypes":["Fire"]}]},"typhlosionhisui":{"level":78,"sets":[{"role":"Choice Item user","movepool":["Eruption","Focus Blast","Heat Wave","Shadow Ball"],"abilities":["Blaze","Frisk"],"teraTypes":["Fire"]}]},"feraligatr":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Dragon Dance","Ice Punch","Liquidation","Protect"],"abilities":["Sheer Force"],"teraTypes":["Fire","Water"]},{"role":"Doubles Setup Sweeper","movepool":["Aqua Jet","Ice Punch","Liquidation","Swords Dance"],"abilities":["Sheer Force"],"teraTypes":["Dragon","Water"]}]},"furret":{"level":98,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Double-Edge","Knock Off","Protect","Tidy Up"],"abilities":["Frisk"],"teraTypes":["Normal"]},{"role":"Doubles Support","movepool":["Body Slam","Follow Me","Helping Hand","Knock Off","Protect","U-turn"],"abilities":["Frisk"],"teraTypes":["Ghost"]}]},"noctowl":{"level":91,"sets":[{"role":"Offensive Protect","movepool":["Hurricane","Hyper Voice","Protect","Tailwind"],"abilities":["Tinted Lens"],"teraTypes":["Flying"]}]},"ariados":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Megahorn","Protect","Rage Powder","Sticky Web"],"abilities":["Insomnia","Swarm"],"teraTypes":["Dark","Steel","Water"]}]},"lanturn":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Electroweb","Protect","Scald","Thunderbolt"],"abilities":["Volt Absorb"],"teraTypes":["Flying"]},{"role":"Doubles Bulky Attacker","movepool":["Electroweb","Ice Beam","Scald","Volt Switch"],"abilities":["Volt Absorb"],"teraTypes":["Flying"]}]},"ampharos":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Dragon Tail","Electroweb","Focus Blast","Helping Hand","Thunder Wave","Thunderbolt"],"abilities":["Static"],"teraTypes":["Flying"]}]},"bellossom":{"level":87,"sets":[{"role":"Doubles Bulky Setup","movepool":["Baton Pass","Giga Drain","Protect","Quiver Dance","Strength Sap"],"abilities":["Healer"],"teraTypes":["Poison","Water"]}]},"azumarill":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Ice Spinner","Knock Off","Liquidation","Play Rough","Superpower"],"abilities":["Huge Power"],"teraTypes":["Water"]}]},"sudowoodo":{"level":94,"sets":[{"role":"Doubles Wallbreaker","movepool":["Head Smash","High Horsepower","Protect","Sucker Punch","Wood Hammer"],"abilities":["Rock Head"],"teraTypes":["Grass"]}]},"politoed":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Hydro Pump","Ice Beam","Muddy Water","Weather Ball"],"abilities":["Drizzle"],"teraTypes":["Water"]},{"role":"Doubles Support","movepool":["Encore","Helping Hand","Hypnosis","Icy Wind","Muddy Water"],"abilities":["Drizzle"],"teraTypes":["Grass","Steel"]}]},"jumpluff":{"level":93,"sets":[{"role":"Doubles Support","movepool":["Acrobatics","Encore","Helping Hand","Pollen Puff","Rage Powder","Sleep Powder","Strength Sap","Tailwind"],"abilities":["Infiltrator"],"teraTypes":["Steel"]}]},"sunflora":{"level":100,"sets":[{"role":"Offensive Protect","movepool":["Dazzling Gleam","Earth Power","Leaf Storm","Protect","Sludge Bomb"],"abilities":["Chlorophyll"],"teraTypes":["Fairy","Ground","Poison"]}]},"quagsire":{"level":91,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Helping Hand","High Horsepower","Icy Wind","Liquidation","Recover","Yawn"],"abilities":["Unaware"],"teraTypes":["Fire","Poison","Steel"]}]},"clodsire":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Gunk Shot","Helping Hand","High Horsepower","Recover","Toxic Spikes"],"abilities":["Unaware","Water Absorb"],"teraTypes":["Flying","Ground","Steel"]}]},"espeon":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["Alluring Voice","Dazzling Gleam","Protect","Psychic","Shadow Ball"],"abilities":["Magic Bounce"],"teraTypes":["Fairy"]}]},"umbreon":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Foul Play","Helping Hand","Moonlight","Snarl","Thunder Wave"],"abilities":["Synchronize"],"teraTypes":["Poison"]}]},"murkrow":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Haze","Protect","Tailwind","Taunt"],"abilities":["Prankster"],"teraTypes":["Ghost","Steel"]}]},"slowking":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Fire Blast","Heal Pulse","Helping Hand","Psyshock","Scald","Trick Room"],"abilities":["Regenerator"],"teraTypes":["Dark","Grass","Steel"]},{"role":"Doubles Wallbreaker","movepool":["Fire Blast","Hydro Pump","Ice Beam","Psyshock","Scald","Trick Room"],"abilities":["Regenerator"],"teraTypes":["Fire","Water"]}]},"slowkinggalar":{"level":85,"sets":[{"role":"Doubles Wallbreaker","movepool":["Fire Blast","Protect","Psyshock","Sludge Bomb","Trick Room"],"abilities":["Regenerator"],"teraTypes":["Dark","Poison"]}]},"forretress":{"level":90,"sets":[{"role":"Choice Item user","movepool":["Body Press","Explosion","Iron Head","Lunge"],"abilities":["Sturdy"],"teraTypes":["Fighting","Fire"]},{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Iron Head","Rest","Thunder Wave"],"abilities":["Sturdy"],"teraTypes":["Fighting","Fire"]}]},"granbull":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Play Rough","Stomping Tantrum","Super Fang"],"abilities":["Intimidate"],"teraTypes":["Steel"]}]},"qwilfish":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Flip Turn","Gunk Shot","Icy Wind","Taunt","Thunder Wave","Toxic Spikes"],"abilities":["Intimidate"],"teraTypes":["Grass"]}]},"qwilfishhisui":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Crunch","Gunk Shot","Icy Wind","Throat Chop","Toxic Spikes"],"abilities":["Intimidate"],"teraTypes":["Flying"]}]},"overqwil":{"level":82,"sets":[{"role":"Doubles Fast Attacker","movepool":["Crunch","Gunk Shot","Liquidation","Protect","Swords Dance","Throat Chop"],"abilities":["Intimidate"],"teraTypes":["Dark","Flying","Poison","Water"]}]},"scizor":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Bullet Punch","Close Combat","Tailwind","U-turn"],"abilities":["Technician"],"teraTypes":["Fire","Water"]},{"role":"Doubles Bulky Setup","movepool":["Bug Bite","Bullet Punch","Close Combat","Protect","Swords Dance"],"abilities":["Technician"],"teraTypes":["Steel"]},{"role":"Choice Item user","movepool":["Bug Bite","Bullet Punch","Close Combat","Knock Off"],"abilities":["Technician"],"teraTypes":["Fighting","Steel","Water"]}]},"heracross":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Facade","Knock Off","Protect"],"abilities":["Guts"],"teraTypes":["Normal"]},{"role":"Choice Item user","movepool":["Close Combat","Knock Off","Megahorn","Rock Slide"],"abilities":["Moxie"],"teraTypes":["Bug","Fighting","Rock"]}]},"magcargo":{"level":93,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Heat Wave","Power Gem","Protect","Shell Smash"],"abilities":["Weak Armor"],"teraTypes":["Fairy","Fire","Grass"]}]},"delibird":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Fake Out","Helping Hand","Icy Wind","Tailwind"],"abilities":["Insomnia","Vital Spirit"],"teraTypes":["Ground","Steel"]},{"role":"Doubles Wallbreaker","movepool":["Brave Bird","Drill Run","Foul Play","Ice Shard","Ice Spinner"],"abilities":["Hustle"],"teraTypes":["Dark","Flying","Ground","Ice"]}]},"skarmory":{"level":85,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Brave Bird","Iron Defense","Protect","Roost","Tailwind"],"abilities":["Sturdy"],"teraTypes":["Fighting"]}]},"houndoom":{"level":86,"sets":[{"role":"Doubles Fast Attacker","movepool":["Dark Pulse","Heat Wave","Nasty Plot","Protect","Sucker Punch"],"abilities":["Flash Fire","Unnerve"],"teraTypes":["Dark","Fire","Ghost","Grass"]}]},"kingdra":{"level":85,"sets":[{"role":"Offensive Protect","movepool":["Draco Meteor","Muddy Water","Protect","Rain Dance"],"abilities":["Swift Swim"],"teraTypes":["Water"]},{"role":"Doubles Setup Sweeper","movepool":["Draco Meteor","Protect","Rain Dance","Wave Crash"],"abilities":["Swift Swim"],"teraTypes":["Water"]}]},"donphan":{"level":86,"sets":[{"role":"Doubles Support","movepool":["High Horsepower","Ice Shard","Knock Off","Rapid Spin","Stone Edge"],"abilities":["Sturdy"],"teraTypes":["Dragon","Water"]}]},"porygon2":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Ice Beam","Recover","Thunderbolt","Trick Room"],"abilities":["Download"],"teraTypes":["Electric","Ghost"]},{"role":"Doubles Bulky Attacker","movepool":["Icy Wind","Recover","Thunderbolt","Tri Attack"],"abilities":["Download"],"teraTypes":["Electric","Ghost"]},{"role":"Tera Blast user","movepool":["Recover","Shadow Ball","Tera Blast","Trick Room"],"abilities":["Download"],"teraTypes":["Fairy","Fighting"]}]},"smeargle":{"level":100,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Baton Pass","No Retreat","Population Bomb","Spiky Shield"],"abilities":["Technician"],"teraTypes":["Ghost"]},{"role":"Doubles Support","movepool":["Decorate","Fake Out","Follow Me","Tailwind"],"abilities":["Technician"],"teraTypes":["Ghost"]}]},"hitmontop":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Close Combat","Coaching","Fake Out","Helping Hand","Sucker Punch","Triple Axel","Wide Guard"],"abilities":["Intimidate"],"teraTypes":["Steel"]}]},"blissey":{"level":96,"sets":[{"role":"Doubles Support","movepool":["Heal Pulse","Helping Hand","Hyper Voice","Protect","Seismic Toss","Soft-Boiled","Thunder Wave"],"abilities":["Healer"],"teraTypes":["Fairy","Ghost","Poison"]}]},"raikou":{"level":81,"sets":[{"role":"Offensive Protect","movepool":["Calm Mind","Protect","Scald","Shadow Ball","Thunderbolt","Volt Switch"],"abilities":["Inner Focus"],"teraTypes":["Water"]},{"role":"Bulky Protect","movepool":["Electroweb","Protect","Scald","Snarl","Thunder Wave","Thunderbolt","Volt Switch"],"abilities":["Inner Focus"],"teraTypes":["Water"]}]},"entei":{"level":77,"sets":[{"role":"Choice Item user","movepool":["Extreme Speed","Flare Blitz","Sacred Fire","Stomping Tantrum"],"abilities":["Inner Focus"],"teraTypes":["Normal"]}]},"suicune":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Ice Beam","Protect","Scald","Snarl","Tailwind"],"abilities":["Inner Focus"],"teraTypes":["Dragon","Grass"]},{"role":"Bulky Protect","movepool":["Calm Mind","Ice Beam","Protect","Scald"],"abilities":["Inner Focus"],"teraTypes":["Dragon","Grass"]}]},"tyranitar":{"level":81,"sets":[{"role":"Doubles Bulky Setup","movepool":["Dragon Dance","High Horsepower","Knock Off","Protect","Rock Slide","Stone Edge"],"abilities":["Sand Stream"],"teraTypes":["Ghost","Rock","Steel"]},{"role":"Doubles Support","movepool":["Fire Blast","High Horsepower","Icy Wind","Knock Off","Protect","Rock Slide","Stone Edge","Thunder Wave"],"abilities":["Sand Stream"],"teraTypes":["Flying","Steel"]}]},"lugia":{"level":72,"sets":[{"role":"Bulky Protect","movepool":["Aeroblast","Calm Mind","Earth Power","Recover"],"abilities":["Multiscale"],"teraTypes":["Ground"]}]},"hooh":{"level":72,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Earth Power","Protect","Recover","Sacred Fire","Tailwind"],"abilities":["Regenerator"],"teraTypes":["Ground"]}]},"sceptile":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Focus Blast","Leaf Storm","Protect","Shed Tail"],"abilities":["Overgrow"],"teraTypes":["Steel","Water"]},{"role":"Offensive Protect","movepool":["Breaking Swipe","Focus Blast","Leaf Storm","Protect"],"abilities":["Unburden"],"teraTypes":["Steel","Water"]}]},"blaziken":{"level":79,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Knock Off","Overheat","Protect","Stone Edge"],"abilities":["Speed Boost"],"teraTypes":["Stellar"]},{"role":"Doubles Wallbreaker","movepool":["Close Combat","Heat Wave","Protect","Vacuum Wave"],"abilities":["Speed Boost"],"teraTypes":["Fighting"]}]},"swampert":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Flip Turn","High Horsepower","Ice Beam","Icy Wind","Knock Off","Muddy Water"],"abilities":["Torrent"],"teraTypes":["Fire","Steel"]}]},"mightyena":{"level":94,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Crunch","Howl","Play Rough","Sucker Punch","Throat Chop"],"abilities":["Intimidate"],"teraTypes":["Dark","Fairy"]}]},"ludicolo":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Energy Ball","Muddy Water","Protect","Rain Dance"],"abilities":["Swift Swim"],"teraTypes":["Water"]},{"role":"Doubles Support","movepool":["Fake Out","Hydro Pump","Ice Beam","Icy Wind","Leaf Storm"],"abilities":["Swift Swim"],"teraTypes":["Poison","Steel"]}]},"shiftry":{"level":84,"sets":[{"role":"Doubles Fast Attacker","movepool":["Fake Out","Knock Off","Leaf Blade","Tailwind"],"abilities":["Wind Rider"],"teraTypes":["Ghost"]},{"role":"Offensive Protect","movepool":["Knock Off","Leaf Blade","Protect","Tailwind"],"abilities":["Wind Rider"],"teraTypes":["Ghost"]}]},"pelipper":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Hurricane","Hydro Pump","Muddy Water","Protect","Tailwind","Wide Guard"],"abilities":["Drizzle"],"teraTypes":["Ground","Steel"]}]},"gardevoir":{"level":83,"sets":[{"role":"Choice Item user","movepool":["Dazzling Gleam","Moonblast","Mystical Fire","Psychic","Psyshock","Trick"],"abilities":["Trace"],"teraTypes":["Fairy","Fire","Steel"]}]},"masquerain":{"level":90,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Baton Pass","Bug Buzz","Hurricane","Hydro Pump","Quiver Dance"],"abilities":["Intimidate"],"teraTypes":["Water"]},{"role":"Doubles Support","movepool":["Bug Buzz","Hurricane","Protect","Tailwind"],"abilities":["Intimidate"],"teraTypes":["Ground"]}]},"breloom":{"level":84,"sets":[{"role":"Doubles Fast Attacker","movepool":["Bullet Seed","Close Combat","Mach Punch","Protect","Rock Tomb","Spore"],"abilities":["Technician"],"teraTypes":["Fighting"]}]},"vigoroth":{"level":91,"sets":[{"role":"Doubles Bulky Attacker","movepool":["After You","Double-Edge","Encore","Icy Wind","Knock Off","Slack Off","Thunder Wave"],"abilities":["Vital Spirit"],"teraTypes":["Ghost"]}]},"slaking":{"level":88,"sets":[{"role":"Doubles Wallbreaker","movepool":["Double-Edge","Giga Impact","High Horsepower","Knock Off"],"abilities":["Truant"],"teraTypes":["Ghost","Normal"]}]},"hariyama":{"level":85,"sets":[{"role":"Doubles Wallbreaker","movepool":["Bullet Punch","Close Combat","Facade","Fake Out","Headlong Rush","Knock Off"],"abilities":["Guts"],"teraTypes":["Normal"]},{"role":"Doubles Bulky Attacker","movepool":["Bullet Punch","Close Combat","Fake Out","Feint","Heavy Slam","Knock Off"],"abilities":["Thick Fat"],"teraTypes":["Steel"]}]},"sableye":{"level":93,"sets":[{"role":"Doubles Support","movepool":["Disable","Encore","Fake Out","Foul Play","Knock Off","Quash","Recover","Will-O-Wisp"],"abilities":["Prankster"],"teraTypes":["Steel"]}]},"medicham":{"level":86,"sets":[{"role":"Choice Item user","movepool":["Bullet Punch","Close Combat","Ice Punch","Poison Jab","Zen Headbutt"],"abilities":["Pure Power"],"teraTypes":["Fighting","Fire"]},{"role":"Doubles Fast Attacker","movepool":["Bullet Punch","Close Combat","Ice Punch","Protect","Zen Headbutt"],"abilities":["Pure Power"],"teraTypes":["Fighting","Fire"]}]},"plusle":{"level":92,"sets":[{"role":"Doubles Fast Attacker","movepool":["Alluring Voice","Nasty Plot","Protect","Thunderbolt"],"abilities":["Lightning Rod"],"teraTypes":["Flying"]},{"role":"Doubles Support","movepool":["Encore","Nuzzle","Super Fang","Thunderbolt"],"abilities":["Lightning Rod"],"teraTypes":["Flying"]}]},"minun":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Encore","Nuzzle","Super Fang","Thunderbolt"],"abilities":["Volt Absorb"],"teraTypes":["Flying"]}]},"volbeat":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Encore","Lunge","Tailwind","Thunder Wave"],"abilities":["Prankster"],"teraTypes":["Steel","Water"]}]},"illumise":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Bug Buzz","Encore","Tailwind","Thunder Wave"],"abilities":["Prankster"],"teraTypes":["Steel","Water"]}]},"swalot":{"level":90,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Encore","Gunk Shot","Helping Hand","Knock Off","Poison Gas","Thunder Wave","Toxic Spikes"],"abilities":["Gluttony"],"teraTypes":["Dark"]}]},"camerupt":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Earth Power","Heat Wave","Helping Hand","Protect","Stealth Rock"],"abilities":["Solid Rock"],"teraTypes":["Water"]}]},"torkoal":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Fire Blast","Heat Wave","Protect","Solar Beam","Will-O-Wisp"],"abilities":["Drought"],"teraTypes":["Dragon","Grass"]}]},"grumpig":{"level":91,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dazzling Gleam","Earth Power","Nasty Plot","Psychic","Psyshock"],"abilities":["Thick Fat"],"teraTypes":["Fairy","Ground"]}]},"flygon":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Breaking Swipe","Earth Power","Protect","Tailwind"],"abilities":["Levitate"],"teraTypes":["Steel"]}]},"cacturne":{"level":91,"sets":[{"role":"Offensive Protect","movepool":["Knock Off","Leaf Storm","Spiky Shield","Sucker Punch"],"abilities":["Water Absorb"],"teraTypes":["Dark","Poison"]}]},"altaria":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Draco Meteor","Fire Blast","Helping Hand","Roost","Tailwind","Will-O-Wisp"],"abilities":["Cloud Nine"],"teraTypes":["Steel"]},{"role":"Bulky Protect","movepool":["Brave Bird","Protect","Roost","Will-O-Wisp"],"abilities":["Cloud Nine"],"teraTypes":["Steel"]}]},"zangoose":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Facade","Knock Off","Protect","Quick Attack"],"abilities":["Toxic Boost"],"teraTypes":["Normal"]}]},"seviper":{"level":95,"sets":[{"role":"Offensive Protect","movepool":["Flamethrower","Glare","Gunk Shot","Knock Off","Protect"],"abilities":["Infiltrator"],"teraTypes":["Dark","Fire","Poison"]}]},"whiscash":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Helping Hand","High Horsepower","Icy Wind","Muddy Water","Protect"],"abilities":["Oblivious"],"teraTypes":["Fire","Steel"]}]},"crawdaunt":{"level":86,"sets":[{"role":"Choice Item user","movepool":["Aqua Jet","Close Combat","Crabhammer","Knock Off"],"abilities":["Adaptability"],"teraTypes":["Fighting"]},{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Crabhammer","Knock Off","Protect"],"abilities":["Adaptability"],"teraTypes":["Water"]}]},"milotic":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Dragon Tail","Icy Wind","Protect","Recover","Scald"],"abilities":["Competitive"],"teraTypes":["Dragon","Grass","Steel"]}]},"banette":{"level":94,"sets":[{"role":"Doubles Wallbreaker","movepool":["Gunk Shot","Poltergeist","Protect","Shadow Sneak"],"abilities":["Frisk"],"teraTypes":["Ghost","Poison"]}]},"tropius":{"level":94,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Hurricane","Leaf Storm","Protect","Tailwind","Wide Guard"],"abilities":["Harvest"],"teraTypes":["Steel"]}]},"chimecho":{"level":95,"sets":[{"role":"Doubles Support","movepool":["Encore","Heal Pulse","Helping Hand","Icy Wind","Protect","Psychic","Snarl","Thunder Wave"],"abilities":["Levitate"],"teraTypes":["Dark","Steel"]}]},"glalie":{"level":94,"sets":[{"role":"Doubles Support","movepool":["Disable","Foul Play","Freeze-Dry","Helping Hand","Icy Wind","Protect"],"abilities":["Inner Focus"],"teraTypes":["Poison","Steel"]}]},"luvdisc":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Charm","Endeavor","Hydro Pump","Icy Wind"],"abilities":["Swift Swim"],"teraTypes":["Dragon"]}]},"salamence":{"level":80,"sets":[{"role":"Doubles Fast Attacker","movepool":["Draco Meteor","Dual Wingbeat","Fire Blast","Protect","Tailwind"],"abilities":["Intimidate"],"teraTypes":["Dragon","Fire","Flying","Steel"]}]},"metagross":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Bullet Punch","Hammer Arm","Heavy Slam","Knock Off","Psychic Fangs","Stomping Tantrum"],"abilities":["Clear Body"],"teraTypes":["Dark","Steel","Water"]},{"role":"Doubles Bulky Setup","movepool":["Agility","Brick Break","Heavy Slam","Knock Off","Protect","Psychic Fangs"],"abilities":["Clear Body"],"teraTypes":["Dragon"]}]},"regirock":{"level":83,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Curse","Iron Defense","Rest","Rock Slide","Stone Edge"],"abilities":["Clear Body"],"teraTypes":["Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Body Press","Iron Defense","Rock Slide","Stone Edge","Thunder Wave"],"abilities":["Clear Body"],"teraTypes":["Fighting"]}]},"regice":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Blizzard","Icy Wind","Protect","Thunderbolt"],"abilities":["Clear Body"],"teraTypes":["Electric","Water"]}]},"registeel":{"level":78,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Iron Head","Thunder Wave"],"abilities":["Clear Body"],"teraTypes":["Fighting"]}]},"latias":{"level":80,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Mist Ball","Protect","Recover","Tailwind"],"abilities":["Levitate"],"teraTypes":["Steel"]},{"role":"Offensive Protect","movepool":["Aura Sphere","Calm Mind","Dragon Pulse","Mist Ball","Protect"],"abilities":["Levitate"],"teraTypes":["Steel"]}]},"latios":{"level":79,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Luster Purge","Protect","Tailwind"],"abilities":["Levitate"],"teraTypes":["Steel"]},{"role":"Doubles Wallbreaker","movepool":["Aura Sphere","Draco Meteor","Luster Purge","Protect","Trick"],"abilities":["Levitate"],"teraTypes":["Dragon","Steel"]}]},"kyogre":{"level":65,"sets":[{"role":"Choice Item user","movepool":["Ice Beam","Origin Pulse","Thunder","Water Spout"],"abilities":["Drizzle"],"teraTypes":["Water"]}]},"groudon":{"level":69,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Heat Crash","Precipice Blades","Protect","Stone Edge","Thunder Wave"],"abilities":["Drought"],"teraTypes":["Fire"]},{"role":"Doubles Bulky Setup","movepool":["Heat Crash","Precipice Blades","Protect","Stone Edge","Swords Dance"],"abilities":["Drought"],"teraTypes":["Fire"]}]},"rayquaza":{"level":75,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dragon Ascent","Dragon Dance","Earthquake","Extreme Speed","Swords Dance"],"abilities":["Air Lock"],"teraTypes":["Normal"]},{"role":"Offensive Protect","movepool":["Draco Meteor","Dragon Ascent","Earth Power","Fire Blast","Protect"],"abilities":["Air Lock"],"teraTypes":["Fire","Flying","Ground"]}]},"jirachi":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Iron Head","Life Dew","Protect","Thunder Wave","U-turn"],"abilities":["Serene Grace"],"teraTypes":["Dark","Water"]},{"role":"Choice Item user","movepool":["Iron Head","Psychic","Thunderbolt","Trick","U-turn"],"abilities":["Serene Grace"],"teraTypes":["Steel"]}]},"deoxys":{"level":79,"sets":[{"role":"Offensive Protect","movepool":["Extreme Speed","Knock Off","Protect","Psycho Boost","Superpower"],"abilities":["Pressure"],"teraTypes":["Ghost","Stellar"]}]},"deoxysattack":{"level":78,"sets":[{"role":"Offensive Protect","movepool":["Extreme Speed","Knock Off","Protect","Psycho Boost","Superpower"],"abilities":["Pressure"],"teraTypes":["Ghost","Stellar"]}]},"deoxysdefense":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Knock Off","Night Shade","Spikes","Thunder Wave"],"abilities":["Pressure"],"teraTypes":["Fairy","Steel"]}]},"deoxysspeed":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Psycho Boost","Superpower","Taunt"],"abilities":["Pressure"],"teraTypes":["Fighting","Ghost","Psychic"]},{"role":"Doubles Wallbreaker","movepool":["Psycho Boost","Superpower","Taunt","Thunder Wave"],"abilities":["Pressure"],"teraTypes":["Fighting","Psychic"]}]},"torterra":{"level":81,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Headlong Rush","Protect","Shell Smash","Wood Hammer"],"abilities":["Overgrow"],"teraTypes":["Fire","Ground"]}]},"infernape":{"level":82,"sets":[{"role":"Doubles Fast Attacker","movepool":["Close Combat","Fake Out","Knock Off","Overheat","Protect"],"abilities":["Blaze"],"teraTypes":["Dark","Fighting","Fire"]}]},"empoleon":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Flash Cannon","Hydro Pump","Ice Beam","Icy Wind","Protect","Yawn"],"abilities":["Competitive"],"teraTypes":["Flying","Grass"]},{"role":"Doubles Bulky Attacker","movepool":["Flash Cannon","Hydro Pump","Ice Beam","Icy Wind","Knock Off"],"abilities":["Competitive"],"teraTypes":["Flying","Grass"]}]},"staraptor":{"level":81,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Close Combat","Double-Edge","Protect","Quick Attack"],"abilities":["Intimidate"],"teraTypes":["Fighting","Flying"]},{"role":"Choice Item user","movepool":["Brave Bird","Close Combat","Double-Edge","Final Gambit"],"abilities":["Intimidate"],"teraTypes":["Fighting","Flying","Normal"]}]},"kricketune":{"level":100,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Bug Bite","Helping Hand","Knock Off","Sticky Web","Taunt"],"abilities":["Technician"],"teraTypes":["Bug","Steel"]}]},"luxray":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Crunch","Play Rough","Snarl","Throat Chop","Volt Switch","Wild Charge"],"abilities":["Intimidate"],"teraTypes":["Dark","Fairy","Flying"]}]},"rampardos":{"level":87,"sets":[{"role":"Choice Item user","movepool":["Fire Punch","Head Smash","Rock Slide","Stomping Tantrum"],"abilities":["Sheer Force"],"teraTypes":["Rock"]}]},"bastiodon":{"level":89,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Foul Play","Iron Defense","Rest","Wide Guard"],"abilities":["Sturdy"],"teraTypes":["Fighting","Flying"]}]},"vespiquen":{"level":100,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Helping Hand","Hurricane","Pollen Puff","Roost","Toxic Spikes"],"abilities":["Unnerve"],"teraTypes":["Steel"]}]},"pachirisu":{"level":94,"sets":[{"role":"Doubles Support","movepool":["Encore","Follow Me","Helping Hand","Nuzzle","Super Fang","Thunderbolt"],"abilities":["Volt Absorb"],"teraTypes":["Flying","Water"]}]},"floatzel":{"level":86,"sets":[{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Crunch","Ice Spinner","Protect","Wave Crash"],"abilities":["Water Veil"],"teraTypes":["Water"]}]},"gastrodon":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Clear Smog","Earth Power","Helping Hand","Icy Wind","Muddy Water","Recover"],"abilities":["Storm Drain"],"teraTypes":["Fire"]}]},"ambipom":{"level":87,"sets":[{"role":"Doubles Fast Attacker","movepool":["Double-Edge","Fake Out","Knock Off","Protect"],"abilities":["Technician"],"teraTypes":["Normal"]}]},"drifblim":{"level":85,"sets":[{"role":"Doubles Support","movepool":["Shadow Ball","Strength Sap","Tailwind","Will-O-Wisp"],"abilities":["Unburden"],"teraTypes":["Fairy","Ghost","Ground"]}]},"mismagius":{"level":88,"sets":[{"role":"Doubles Wallbreaker","movepool":["Dazzling Gleam","Mystical Fire","Protect","Shadow Ball","Taunt","Thunderbolt","Trick","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric","Fairy"]}]},"honchkrow":{"level":85,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Heat Wave","Protect","Sucker Punch","Tailwind"],"abilities":["Moxie"],"teraTypes":["Dark","Fire","Flying"]}]},"skuntank":{"level":85,"sets":[{"role":"Doubles Fast Attacker","movepool":["Fire Blast","Gunk Shot","Knock Off","Poison Gas","Protect","Sucker Punch","Taunt","Toxic Spikes"],"abilities":["Aftermath"],"teraTypes":["Dark","Flying"]}]},"bronzong":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Iron Defense","Iron Head","Trick Room"],"abilities":["Levitate"],"teraTypes":["Fighting"]},{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Psychic Noise","Trick Room"],"abilities":["Levitate"],"teraTypes":["Fighting"]}]},"spiritomb":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Foul Play","Helping Hand","Icy Wind","Shadow Sneak","Will-O-Wisp"],"abilities":["Infiltrator"],"teraTypes":["Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Foul Play","Snarl","Trick Room","Will-O-Wisp"],"abilities":["Infiltrator"],"teraTypes":["Steel"]}]},"garchomp":{"level":77,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Earthquake","Protect","Scale Shot","Swords Dance"],"abilities":["Rough Skin"],"teraTypes":["Dragon","Fire"]}]},"lucario":{"level":87,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Extreme Speed","Flash Cannon","Protect"],"abilities":["Inner Focus"],"teraTypes":["Normal"]},{"role":"Doubles Wallbreaker","movepool":["Close Combat","Extreme Speed","Meteor Mash","Rock Slide"],"abilities":["Inner Focus"],"teraTypes":["Normal"]}]},"hippowdon":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","High Horsepower","Slack Off","Stealth Rock","Stone Edge","Whirlwind"],"abilities":["Sand Stream"],"teraTypes":["Dragon","Rock","Steel","Water"]}]},"toxicroak":{"level":85,"sets":[{"role":"Doubles Fast Attacker","movepool":["Close Combat","Fake Out","Gunk Shot","Protect","Sucker Punch","Swords Dance"],"abilities":["Dry Skin"],"teraTypes":["Dark","Fighting","Poison"]}]},"lumineon":{"level":92,"sets":[{"role":"Doubles Support","movepool":["Encore","Helping Hand","Hydro Pump","Icy Wind","Tailwind","Tickle"],"abilities":["Storm Drain"],"teraTypes":["Fire","Ground"]}]},"abomasnow":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Aurora Veil","Blizzard","Ice Shard","Protect","Wood Hammer"],"abilities":["Snow Warning"],"teraTypes":["Ice","Water"]}]},"weavile":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Fake Out","Ice Shard","Knock Off","Low Kick","Protect","Triple Axel"],"abilities":["Pickpocket"],"teraTypes":["Dark","Fighting","Ghost","Ice"]}]},"sneasler":{"level":77,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Dire Claw","Fake Out","Gunk Shot","Switcheroo","U-turn"],"abilities":["Poison Touch"],"teraTypes":["Dark","Fighting","Poison"]}]},"magnezone":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Electroweb","Flash Cannon","Protect","Thunderbolt","Volt Switch"],"abilities":["Sturdy"],"teraTypes":["Flying"]}]},"rhyperior":{"level":82,"sets":[{"role":"Doubles Bulky Setup","movepool":["High Horsepower","Protect","Rock Polish","Rock Slide"],"abilities":["Solid Rock"],"teraTypes":["Dragon","Flying","Ghost","Ground"]},{"role":"Doubles Bulky Attacker","movepool":["Dragon Tail","Heat Crash","High Horsepower","Ice Punch","Megahorn","Protect","Rock Slide"],"abilities":["Solid Rock"],"teraTypes":["Dragon","Flying","Water"]}]},"electivire":{"level":85,"sets":[{"role":"Doubles Fast Attacker","movepool":["Cross Chop","Flamethrower","Ice Punch","Protect","Volt Switch","Wild Charge"],"abilities":["Motor Drive"],"teraTypes":["Flying"]},{"role":"Doubles Bulky Attacker","movepool":["Cross Chop","Flamethrower","Ice Punch","Knock Off","Volt Switch","Wild Charge"],"abilities":["Motor Drive"],"teraTypes":["Flying"]}]},"magmortar":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fire Blast","Heat Wave","Knock Off","Protect","Thunderbolt"],"abilities":["Flame Body"],"teraTypes":["Fire","Grass"]}]},"yanmega":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Air Slash","Bug Buzz","Giga Drain","U-turn"],"abilities":["Tinted Lens"],"teraTypes":["Bug"]},{"role":"Tera Blast user","movepool":["Air Slash","Bug Buzz","Protect","Tera Blast"],"abilities":["Speed Boost"],"teraTypes":["Ground"]}]},"leafeon":{"level":90,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Double-Edge","Knock Off","Leaf Blade","Protect","Swords Dance","Synthesis"],"abilities":["Chlorophyll"],"teraTypes":["Normal"]}]},"glaceon":{"level":87,"sets":[{"role":"Doubles Wallbreaker","movepool":["Blizzard","Freeze-Dry","Mud Shot","Protect"],"abilities":["Ice Body"],"teraTypes":["Ground"]},{"role":"Doubles Setup Sweeper","movepool":["Blizzard","Calm Mind","Freeze-Dry","Mud Shot"],"abilities":["Ice Body"],"teraTypes":["Ground"]}]},"gliscor":{"level":81,"sets":[{"role":"Bulky Protect","movepool":["Dual Wingbeat","High Horsepower","Knock Off","Protect","Tailwind","Toxic","Toxic Spikes"],"abilities":["Poison Heal"],"teraTypes":["Water"]},{"role":"Doubles Bulky Setup","movepool":["Earthquake","Facade","Protect","Swords Dance"],"abilities":["Poison Heal"],"teraTypes":["Normal"]}]},"mamoswine":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["High Horsepower","Ice Shard","Icicle Crash","Protect"],"abilities":["Thick Fat"],"teraTypes":["Ground","Ice","Water"]}]},"porygonz":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Shadow Ball","Swift","Tri Attack","Trick"],"abilities":["Adaptability"],"teraTypes":["Ghost"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Shadow Ball","Tera Blast"],"abilities":["Adaptability"],"teraTypes":["Fighting"]}]},"gallade":{"level":80,"sets":[{"role":"Doubles Wallbreaker","movepool":["Leaf Blade","Night Slash","Protect","Psycho Cut","Sacred Sword","Swords Dance"],"abilities":["Sharpness"],"teraTypes":["Dark","Fighting","Grass"]},{"role":"Choice Item user","movepool":["Night Slash","Psycho Cut","Sacred Sword","Trick"],"abilities":["Sharpness"],"teraTypes":["Dark","Fighting"]}]},"probopass":{"level":90,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Flash Cannon","Iron Defense","Rest","Thunder Wave"],"abilities":["Magnet Pull"],"teraTypes":["Fighting"]},{"role":"Doubles Setup Sweeper","movepool":["Body Press","Iron Defense","Power Gem","Rest","Thunder Wave"],"abilities":["Magnet Pull"],"teraTypes":["Fighting"]}]},"dusknoir":{"level":89,"sets":[{"role":"Doubles Wallbreaker","movepool":["Leech Life","Poltergeist","Shadow Sneak","Will-O-Wisp"],"abilities":["Frisk"],"teraTypes":["Dark"]},{"role":"Doubles Setup Sweeper","movepool":["Leech Life","Poltergeist","Protect","Trick Room"],"abilities":["Frisk"],"teraTypes":["Dark"]}]},"froslass":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Poltergeist","Protect","Spikes","Taunt","Triple Axel","Will-O-Wisp"],"abilities":["Cursed Body"],"teraTypes":["Ghost","Water"]}]},"rotom":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Nasty Plot","Protect","Shadow Ball","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric"]}]},"rotomwash":{"level":83,"sets":[{"role":"Bulky Protect","movepool":["Electroweb","Hydro Pump","Protect","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric"]}]},"rotomheat":{"level":84,"sets":[{"role":"Bulky Protect","movepool":["Electroweb","Overheat","Protect","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric","Steel"]}]},"rotomfrost":{"level":84,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Blizzard","Nasty Plot","Protect","Thunderbolt","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric","Ice"]}]},"rotomfan":{"level":85,"sets":[{"role":"Bulky Protect","movepool":["Air Slash","Electroweb","Protect","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric","Steel"]}]},"rotommow":{"level":85,"sets":[{"role":"Bulky Protect","movepool":["Electroweb","Leaf Storm","Protect","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Electric","Poison","Steel"]}]},"uxie":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Encore","Helping Hand","Knock Off","Mystical Power","Stealth Rock","Thunder Wave"],"abilities":["Levitate"],"teraTypes":["Dark","Poison","Steel"]}]},"mesprit":{"level":86,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dazzling Gleam","Nasty Plot","Protect","Psychic","Thunderbolt"],"abilities":["Levitate"],"teraTypes":["Electric","Fairy","Psychic"]},{"role":"Choice Item user","movepool":["Ice Beam","Psychic","Thunderbolt","U-turn"],"abilities":["Levitate"],"teraTypes":["Electric","Psychic"]}]},"azelf":{"level":83,"sets":[{"role":"Doubles Fast Attacker","movepool":["Dazzling Gleam","Energy Ball","Fire Blast","Nasty Plot","Psychic","Psyshock","U-turn"],"abilities":["Levitate"],"teraTypes":["Fairy","Fire"]},{"role":"Offensive Protect","movepool":["Dazzling Gleam","Fire Blast","Nasty Plot","Protect","Psychic","Psyshock","Thunderbolt"],"abilities":["Levitate"],"teraTypes":["Electric","Fairy","Fire"]}]},"dialga":{"level":74,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Heavy Slam","Protect","Thunder Wave"],"abilities":["Telepathy"],"teraTypes":["Dragon","Fire","Flying","Steel"]}]},"dialgaorigin":{"level":74,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Flash Cannon","Protect","Thunder Wave"],"abilities":["Telepathy"],"teraTypes":["Dragon","Fire","Flying"]}]},"palkia":{"level":74,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend"],"abilities":["Telepathy"],"teraTypes":["Dragon","Fire","Steel","Water"]},{"role":"Doubles Fast Attacker","movepool":["Fire Blast","Hydro Pump","Protect","Spacial Rend","Thunder Wave"],"abilities":["Telepathy"],"teraTypes":["Dragon","Fire","Steel","Water"]}]},"palkiaorigin":{"level":72,"sets":[{"role":"Doubles Fast Attacker","movepool":["Fire Blast","Hydro Pump","Protect","Spacial Rend","Thunder Wave"],"abilities":["Telepathy"],"teraTypes":["Dragon","Fire","Steel","Water"]}]},"heatran":{"level":78,"sets":[{"role":"Bulky Protect","movepool":["Earth Power","Magma Storm","Protect","Will-O-Wisp"],"abilities":["Flash Fire"],"teraTypes":["Fairy","Grass"]},{"role":"Tera Blast user","movepool":["Earth Power","Flash Cannon","Heat Wave","Protect","Tera Blast"],"abilities":["Flash Fire"],"teraTypes":["Grass"]},{"role":"Offensive Protect","movepool":["Earth Power","Flash Cannon","Heat Wave","Protect"],"abilities":["Flash Fire"],"teraTypes":["Fairy","Grass"]}]},"regigigas":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Body Slam","Knock Off","Protect","Substitute"],"abilities":["Slow Start"],"teraTypes":["Fairy","Ghost"]},{"role":"Doubles Bulky Attacker","movepool":["Double-Edge","Knock Off","Protect","Thunder Wave"],"abilities":["Slow Start"],"teraTypes":["Fairy"]}]},"giratina":{"level":76,"sets":[{"role":"Bulky Protect","movepool":["Aura Sphere","Calm Mind","Protect","Shadow Ball"],"abilities":["Telepathy"],"teraTypes":["Fairy","Fighting"]},{"role":"Doubles Support","movepool":["Breaking Swipe","Icy Wind","Rest","Shadow Ball","Thunder Wave","Will-O-Wisp"],"abilities":["Telepathy"],"teraTypes":["Fairy"]}]},"giratinaorigin":{"level":75,"sets":[{"role":"Doubles Fast Attacker","movepool":["Draco Meteor","Poltergeist","Shadow Force","Shadow Sneak","Will-O-Wisp"],"abilities":["Levitate"],"teraTypes":["Dragon","Fairy","Ghost","Poison","Steel"]}]},"cresselia":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Icy Wind","Lunar Blessing","Psychic","Thunder Wave"],"abilities":["Levitate"],"teraTypes":["Electric","Fire","Poison","Steel"]}]},"phione":{"level":90,"sets":[{"role":"Bulky Protect","movepool":["Ice Beam","Protect","Scald","Take Heart"],"abilities":["Hydration"],"teraTypes":["Dragon","Grass","Steel"]}]},"manaphy":{"level":78,"sets":[{"role":"Bulky Protect","movepool":["Ice Beam","Protect","Scald","Tail Glow"],"abilities":["Hydration"],"teraTypes":["Grass","Steel","Water"]},{"role":"Doubles Bulky Setup","movepool":["Energy Ball","Hydro Pump","Ice Beam","Protect","Scald","Tail Glow"],"abilities":["Hydration"],"teraTypes":["Grass"]}]},"darkrai":{"level":80,"sets":[{"role":"Offensive Protect","movepool":["Dark Pulse","Focus Blast","Protect","Sludge Bomb"],"abilities":["Bad Dreams"],"teraTypes":["Poison"]}]},"shaymin":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Earth Power","Protect","Seed Flare","Synthesis","Tailwind"],"abilities":["Natural Cure"],"teraTypes":["Grass","Ground","Steel"]}]},"shayminsky":{"level":77,"sets":[{"role":"Offensive Protect","movepool":["Air Slash","Earth Power","Protect","Seed Flare","Tailwind"],"abilities":["Serene Grace"],"teraTypes":["Flying","Steel","Water"]}]},"arceus":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Phantom Force","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Ghost","Normal"]}]},"arceusbug":{"level":73,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Stomping Tantrum","Swords Dance","X-Scissor"],"abilities":["Multitype"],"teraTypes":["Normal"]}]},"arceusdark":{"level":72,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Gunk Shot","Judgment","Recover","Tailwind"],"abilities":["Multitype"],"teraTypes":["Poison"]}]},"arceusdragon":{"level":73,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Calm Mind","Fire Blast","Judgment","Recover","Sludge Bomb"],"abilities":["Multitype"],"teraTypes":["Fire","Poison"]}]},"arceuselectric":{"level":70,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Ice Beam","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Electric","Ice"]}]},"arceusfairy":{"level":70,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Earth Power","Fire Blast","Recover"],"abilities":["Multitype"],"teraTypes":["Fairy","Fire","Ground"]},{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"abilities":["Multitype"],"teraTypes":["Steel"]}]},"arceusfighting":{"level":70,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Recover","Snarl"],"abilities":["Multitype"],"teraTypes":["Steel"]}]},"arceusfire":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Liquidation","Protect","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Fire","Normal","Water"]}]},"arceusflying":{"level":70,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Flying","Ground"]}]},"arceusghost":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Brick Break","Extreme Speed","Phantom Force","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Ghost","Normal"]},{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Focus Blast","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Fairy","Fighting"]}]},"arceusgrass":{"level":74,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"abilities":["Multitype"],"teraTypes":["Fire","Steel"]}]},"arceusground":{"level":72,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Fire Blast","Ice Beam","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Ground","Ice"]},{"role":"Doubles Setup Sweeper","movepool":["Earthquake","Extreme Speed","Stone Edge","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Normal"]}]},"arceusice":{"level":72,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover","Thunderbolt"],"abilities":["Multitype"],"teraTypes":["Electric","Ground"]}]},"arceuspoison":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Gunk Shot","Liquidation","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Fire","Normal","Poison"]}]},"arceuspsychic":{"level":72,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"abilities":["Multitype"],"teraTypes":["Steel"]}]},"arceusrock":{"level":73,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"abilities":["Multitype"],"teraTypes":["Ground"]}]},"arceussteel":{"level":73,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"abilities":["Multitype"],"teraTypes":["Ghost"]}]},"arceuswater":{"level":73,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"abilities":["Multitype"],"teraTypes":["Steel"]},{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Liquidation","Swords Dance"],"abilities":["Multitype"],"teraTypes":["Fire","Normal"]}]},"serperior":{"level":80,"sets":[{"role":"Offensive Protect","movepool":["Dragon Pulse","Glare","Knock Off","Leaf Storm","Protect"],"abilities":["Contrary"],"teraTypes":["Dragon","Grass"]},{"role":"Tera Blast user","movepool":["Glare","Leaf Storm","Protect","Tera Blast"],"abilities":["Contrary"],"teraTypes":["Fire","Rock"]}]},"emboar":{"level":85,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Flare Blitz","Head Smash","Knock Off","Wild Charge"],"abilities":["Reckless"],"teraTypes":["Dark","Electric","Rock"]}]},"samurott":{"level":89,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Aqua Jet","Flip Turn","Hydro Pump","Ice Beam","Knock Off","Megahorn","Sacred Sword"],"abilities":["Torrent"],"teraTypes":["Dark","Fire","Water"]},{"role":"Doubles Setup Sweeper","movepool":["Aqua Jet","Knock Off","Liquidation","Protect","Sacred Sword","Swords Dance"],"abilities":["Torrent"],"teraTypes":["Dark","Fire","Water"]}]},"samurotthisui":{"level":83,"sets":[{"role":"Offensive Protect","movepool":["Aqua Jet","Ceaseless Edge","Protect","Razor Shell","Sacred Sword","Sucker Punch"],"abilities":["Sharpness"],"teraTypes":["Dark","Fire","Water"]},{"role":"Choice Item user","movepool":["Ceaseless Edge","Flip Turn","Razor Shell","Sacred Sword","Sucker Punch"],"abilities":["Sharpness"],"teraTypes":["Dark","Fire","Water"]}]},"zebstrika":{"level":87,"sets":[{"role":"Offensive Protect","movepool":["High Horsepower","Overheat","Protect","Wild Charge"],"abilities":["Sap Sipper"],"teraTypes":["Ground"]},{"role":"Doubles Fast Attacker","movepool":["High Horsepower","Overheat","Protect","Thunderbolt"],"abilities":["Lightning Rod"],"teraTypes":["Flying","Water"]}]},"excadrill":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["High Horsepower","Iron Head","Rapid Spin","Rock Slide"],"abilities":["Mold Breaker","Sand Rush"],"teraTypes":["Flying","Water"]},{"role":"Doubles Setup Sweeper","movepool":["High Horsepower","Iron Head","Protect","Swords Dance"],"abilities":["Mold Breaker","Sand Rush"],"teraTypes":["Flying","Ground","Water"]}]},"conkeldurr":{"level":81,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Knock Off","Mach Punch","Protect"],"abilities":["Guts"],"teraTypes":["Dark","Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Drain Punch","Ice Punch","Knock Off","Mach Punch"],"abilities":["Iron Fist"],"teraTypes":["Dark","Fighting","Steel"]}]},"leavanny":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Knock Off","Leaf Blade","Pollen Puff","Sticky Web"],"abilities":["Chlorophyll","Swarm"],"teraTypes":["Rock","Water"]},{"role":"Offensive Protect","movepool":["Leaf Blade","Lunge","Protect","Sticky Web"],"abilities":["Chlorophyll","Swarm"],"teraTypes":["Rock","Water"]}]},"whimsicott":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Encore","Moonblast","Stun Spore","Tailwind"],"abilities":["Prankster"],"teraTypes":["Fire","Ghost","Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Encore","Moonblast","Tailwind","Taunt"],"abilities":["Prankster"],"teraTypes":["Fire","Ghost","Steel"]},{"role":"Doubles Bulky Setup","movepool":["Encore","Helping Hand","Moonblast","Tailwind"],"abilities":["Prankster"],"teraTypes":["Fire","Ghost","Steel"]}]},"lilligant":{"level":87,"sets":[{"role":"Tera Blast user","movepool":["Giga Drain","Protect","Quiver Dance","Tera Blast"],"abilities":["Chlorophyll"],"teraTypes":["Fire","Rock"]},{"role":"Doubles Setup Sweeper","movepool":["Alluring Voice","Energy Ball","Pollen Puff","Quiver Dance","Sleep Powder"],"abilities":["Chlorophyll"],"teraTypes":["Steel"]}]},"lilliganthisui":{"level":84,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Leaf Blade","Protect","Sleep Powder","Victory Dance"],"abilities":["Hustle"],"teraTypes":["Fighting","Steel"]}]},"basculin":{"level":87,"sets":[{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Flip Turn","Psychic Fangs","Wave Crash"],"abilities":["Adaptability"],"teraTypes":["Water"]},{"role":"Offensive Protect","movepool":["Aqua Jet","Flip Turn","Protect","Wave Crash"],"abilities":["Adaptability"],"teraTypes":["Water"]}]},"basculegion":{"level":70,"sets":[{"role":"Choice Item user","movepool":["Aqua Jet","Flip Turn","Last Respects","Wave Crash"],"abilities":["Adaptability"],"teraTypes":["Ghost"]}]},"basculegionf":{"level":72,"sets":[{"role":"Choice Item user","movepool":["Flip Turn","Last Respects","Muddy Water","Wave Crash"],"abilities":["Adaptability"],"teraTypes":["Ghost"]}]},"krookodile":{"level":80,"sets":[{"role":"Offensive Protect","movepool":["Gunk Shot","High Horsepower","Knock Off","Protect","Stone Edge","Taunt"],"abilities":["Intimidate"],"teraTypes":["Dark","Ground","Poison"]},{"role":"Choice Item user","movepool":["Gunk Shot","High Horsepower","Knock Off","Rock Slide"],"abilities":["Intimidate"],"teraTypes":["Dark","Ground","Poison"]}]},"scrafty":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Close Combat","Coaching","Fake Out","Knock Off","Poison Jab","Snarl"],"abilities":["Intimidate"],"teraTypes":["Poison"]}]},"zoroark":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Dark Pulse","Flamethrower","Focus Blast","Protect","Sludge Bomb"],"abilities":["Illusion"],"teraTypes":["Poison"]},{"role":"Offensive Protect","movepool":["Flamethrower","Focus Blast","Knock Off","Protect","Sludge Bomb"],"abilities":["Illusion"],"teraTypes":["Poison"]}]},"zoroarkhisui":{"level":80,"sets":[{"role":"Doubles Wallbreaker","movepool":["Bitter Malice","Flamethrower","Focus Blast","Hyper Voice","Nasty Plot","Protect"],"abilities":["Illusion"],"teraTypes":["Normal"]},{"role":"Tera Blast user","movepool":["Bitter Malice","Hyper Voice","Protect","Tera Blast"],"abilities":["Illusion"],"teraTypes":["Fairy"]}]},"cinccino":{"level":85,"sets":[{"role":"Offensive Protect","movepool":["Bullet Seed","Knock Off","Protect","Tail Slap","Triple Axel"],"abilities":["Technician"],"teraTypes":["Grass","Ice","Normal"]}]},"gothitelle":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Fake Out","Heal Pulse","Helping Hand","Protect","Psychic","Trick Room"],"abilities":["Shadow Tag"],"teraTypes":["Dark","Steel"]}]},"reuniclus":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Focus Blast","Protect","Psychic","Shadow Ball","Trick Room"],"abilities":["Magic Guard"],"teraTypes":["Fighting"]}]},"swanna":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Hydro Pump","Knock Off","Protect","Tailwind"],"abilities":["Hydration"],"teraTypes":["Ground"]},{"role":"Offensive Protect","movepool":["Brave Bird","Hydro Pump","Protect","Tailwind"],"abilities":["Hydration"],"teraTypes":["Ground"]}]},"sawsbuck":{"level":91,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Double-Edge","High Horsepower","Horn Leech","Protect","Swords Dance"],"abilities":["Sap Sipper"],"teraTypes":["Normal"]}]},"amoonguss":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Clear Smog","Pollen Puff","Protect","Rage Powder","Spore"],"abilities":["Regenerator"],"teraTypes":["Steel","Water"]},{"role":"Doubles Support","movepool":["Pollen Puff","Rage Powder","Sludge Bomb","Spore"],"abilities":["Regenerator"],"teraTypes":["Steel","Water"]}]},"alomomola":{"level":95,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Icy Wind","Scald","Wide Guard"],"abilities":["Regenerator"],"teraTypes":["Steel"]}]},"galvantula":{"level":85,"sets":[{"role":"Doubles Support","movepool":["Bug Buzz","Protect","Sticky Web","Thunder","Volt Switch"],"abilities":["Compound Eyes"],"teraTypes":["Electric"]}]},"eelektross":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Electroweb","Flamethrower","Giga Drain","Knock Off","Thunderbolt","U-turn"],"abilities":["Levitate"],"teraTypes":["Electric","Poison"]}]},"chandelure":{"level":81,"sets":[{"role":"Doubles Fast Attacker","movepool":["Energy Ball","Heat Wave","Protect","Shadow Ball","Trick"],"abilities":["Flash Fire"],"teraTypes":["Fire","Grass"]}]},"haxorus":{"level":84,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Iron Head","Protect","Scale Shot","Swords Dance"],"abilities":["Unnerve"],"teraTypes":["Dragon","Fighting","Steel"]},{"role":"Offensive Protect","movepool":["Close Combat","Dragon Claw","First Impression","Iron Head","Protect"],"abilities":["Unnerve"],"teraTypes":["Fighting","Steel"]}]},"beartic":{"level":91,"sets":[{"role":"Offensive Protect","movepool":["Aqua Jet","Close Combat","Icicle Crash","Protect"],"abilities":["Slush Rush","Swift Swim"],"teraTypes":["Fighting","Water"]}]},"cryogonal":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Flash Cannon","Freeze-Dry","Haze","Icy Wind","Rapid Spin","Recover"],"abilities":["Levitate"],"teraTypes":["Steel"]}]},"mienshao":{"level":85,"sets":[{"role":"Doubles Fast Attacker","movepool":["Close Combat","Fake Out","Knock Off","Triple Axel","U-turn"],"abilities":["Regenerator"],"teraTypes":["Dark"]},{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Fake Out","Knock Off","U-turn"],"abilities":["Regenerator"],"teraTypes":["Dark","Steel"]}]},"golurk":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Dynamic Punch","High Horsepower","Poltergeist","Protect"],"abilities":["No Guard"],"teraTypes":["Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Dynamic Punch","High Horsepower","Poltergeist","Stone Edge"],"abilities":["No Guard"],"teraTypes":["Dragon","Fairy","Fighting"]}]},"braviary":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Close Combat","Protect","Tailwind"],"abilities":["Defiant"],"teraTypes":["Fighting","Flying"]}]},"braviaryhisui":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Heat Wave","Hurricane","Psychic","Tailwind"],"abilities":["Sheer Force"],"teraTypes":["Fire","Psychic","Steel"]},{"role":"Bulky Protect","movepool":["Calm Mind","Esper Wing","Hurricane","Protect"],"abilities":["Tinted Lens"],"teraTypes":["Psychic","Steel"]}]},"mandibuzz":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Foul Play","Knock Off","Roost","Snarl","Tailwind","Taunt","Toxic","U-turn"],"abilities":["Overcoat"],"teraTypes":["Steel"]}]},"hydreigon":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Dark Pulse","Draco Meteor","Protect","Snarl","Tailwind"],"abilities":["Levitate"],"teraTypes":["Dragon","Poison"]},{"role":"Doubles Fast Attacker","movepool":["Dark Pulse","Draco Meteor","Heat Wave","Protect"],"abilities":["Levitate"],"teraTypes":["Fire"]}]},"volcarona":{"level":79,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bug Buzz","Heat Wave","Protect","Quiver Dance"],"abilities":["Flame Body","Swarm"],"teraTypes":["Fire","Ground","Water"]},{"role":"Doubles Support","movepool":["Heat Wave","Rage Powder","Struggle Bug","Tailwind"],"abilities":["Flame Body"],"teraTypes":["Steel","Water"]}]},"cobalion":{"level":79,"sets":[{"role":"Doubles Support","movepool":["Body Press","Coaching","Iron Head","Thunder Wave","Volt Switch"],"abilities":["Justified"],"teraTypes":["Flying","Water"]},{"role":"Bulky Protect","movepool":["Body Press","Iron Defense","Iron Head","Protect"],"abilities":["Justified"],"teraTypes":["Flying","Water"]}]},"terrakion":{"level":79,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","High Horsepower","Rock Slide","Stone Edge"],"abilities":["Justified"],"teraTypes":["Fighting","Ghost","Rock"]},{"role":"Offensive Protect","movepool":["Close Combat","High Horsepower","Protect","Rock Slide"],"abilities":["Justified"],"teraTypes":["Fighting","Ghost","Rock"]}]},"virizion":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Close Combat","Coaching","Leaf Storm","Protect","Stone Edge"],"abilities":["Justified"],"teraTypes":["Fire","Rock","Steel"]}]},"tornadus":{"level":77,"sets":[{"role":"Doubles Support","movepool":["Bleakwind Storm","Heat Wave","Knock Off","Protect","Tailwind","Taunt"],"abilities":["Prankster"],"teraTypes":["Steel"]}]},"tornadustherian":{"level":77,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bleakwind Storm","Grass Knot","Heat Wave","Nasty Plot","Protect"],"abilities":["Regenerator"],"teraTypes":["Fire","Flying"]},{"role":"Choice Item user","movepool":["Bleakwind Storm","Focus Blast","Grass Knot","Heat Wave","U-turn"],"abilities":["Regenerator"],"teraTypes":["Fire","Flying"]}]},"thundurus":{"level":79,"sets":[{"role":"Bulky Protect","movepool":["Grass Knot","Knock Off","Protect","Snarl","Taunt","Thunder Wave","Thunderbolt"],"abilities":["Prankster"],"teraTypes":["Steel"]},{"role":"Offensive Protect","movepool":["Acrobatics","Grass Knot","Knock Off","Protect","Snarl","Wildbolt Storm"],"abilities":["Defiant"],"teraTypes":["Electric","Flying","Steel"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Tera Blast","Wildbolt Storm"],"abilities":["Defiant"],"teraTypes":["Flying","Ice"]}]},"thundurustherian":{"level":78,"sets":[{"role":"Doubles Fast Attacker","movepool":["Grass Knot","Protect","Sludge Bomb","Volt Switch","Wildbolt Storm"],"abilities":["Volt Absorb"],"teraTypes":["Electric","Poison"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Tera Blast","Wildbolt Storm"],"abilities":["Volt Absorb"],"teraTypes":["Flying","Ice"]}]},"reshiram":{"level":72,"sets":[{"role":"Doubles Wallbreaker","movepool":["Blue Flare","Draco Meteor","Heat Wave","Protect","Tailwind"],"abilities":["Turboblaze"],"teraTypes":["Fire"]}]},"zekrom":{"level":73,"sets":[{"role":"Doubles Wallbreaker","movepool":["Bolt Strike","Dragon Claw","Dragon Dance","Protect"],"abilities":["Teravolt"],"teraTypes":["Dragon","Electric","Fire","Grass"]}]},"landorus":{"level":76,"sets":[{"role":"Doubles Wallbreaker","movepool":["Earth Power","Nasty Plot","Protect","Psychic","Rock Slide","Sandsear Storm","Sludge Bomb"],"abilities":["Sheer Force"],"teraTypes":["Ground","Poison","Psychic"]}]},"landorustherian":{"level":77,"sets":[{"role":"Doubles Support","movepool":["Protect","Rock Slide","Stomping Tantrum","Stone Edge","Taunt","U-turn"],"abilities":["Intimidate"],"teraTypes":["Steel","Water"]},{"role":"Tera Blast user","movepool":["Rock Slide","Stomping Tantrum","Stone Edge","Tera Blast","U-turn"],"abilities":["Intimidate"],"teraTypes":["Flying"]}]},"kyurem":{"level":77,"sets":[{"role":"Offensive Protect","movepool":["Earth Power","Icicle Spear","Protect","Scale Shot"],"abilities":["Pressure"],"teraTypes":["Fairy","Steel"]},{"role":"Doubles Fast Attacker","movepool":["Draco Meteor","Earth Power","Glaciate","Protect"],"abilities":["Pressure"],"teraTypes":["Fairy","Steel"]}]},"kyuremwhite":{"level":72,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Earth Power","Fusion Flare","Ice Beam","Protect"],"abilities":["Turboblaze"],"teraTypes":["Fire"]},{"role":"Doubles Fast Attacker","movepool":["Blizzard","Earth Power","Freeze-Dry","Fusion Flare","Protect"],"abilities":["Turboblaze"],"teraTypes":["Fire","Ground"]}]},"kyuremblack":{"level":75,"sets":[{"role":"Offensive Protect","movepool":["Dragon Dance","Fusion Bolt","Icicle Spear","Protect"],"abilities":["Teravolt"],"teraTypes":["Electric"]}]},"keldeoresolute":{"level":78,"sets":[{"role":"Doubles Wallbreaker","movepool":["Hydro Pump","Muddy Water","Secret Sword","Vacuum Wave"],"abilities":["Justified"],"teraTypes":["Fighting","Steel","Water"]},{"role":"Offensive Protect","movepool":["Hydro Pump","Muddy Water","Protect","Secret Sword","Vacuum Wave"],"abilities":["Justified"],"teraTypes":["Fighting","Steel","Water"]}]},"meloetta":{"level":80,"sets":[{"role":"Doubles Wallbreaker","movepool":["Calm Mind","Focus Blast","Hyper Voice","Protect","Psychic","U-turn"],"abilities":["Serene Grace"],"teraTypes":["Fighting","Normal","Psychic"]},{"role":"Tera Blast user","movepool":["Close Combat","Psychic","Relic Song","Tera Blast"],"abilities":["Serene Grace"],"teraTypes":["Normal"]}]},"chesnaught":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Body Press","Coaching","Knock Off","Leech Seed","Spiky Shield","Wood Hammer"],"abilities":["Bulletproof"],"teraTypes":["Fire","Rock","Steel","Water"]},{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Leech Seed","Spiky Shield"],"abilities":["Bulletproof"],"teraTypes":["Fire","Rock","Steel","Water"]}]},"delphox":{"level":83,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Fire Blast","Heat Wave","Nasty Plot","Protect","Psyshock"],"abilities":["Blaze"],"teraTypes":["Fire"]}]},"greninjabond":{"level":83,"sets":[{"role":"Offensive Protect","movepool":["Dark Pulse","Gunk Shot","Hydro Pump","Ice Beam","Protect","Taunt"],"abilities":["Battle Bond"],"teraTypes":["Dark","Poison","Water"]}]},"talonflame":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Brave Bird","Overheat","Protect","Tailwind","U-turn","Will-O-Wisp"],"abilities":["Gale Wings"],"teraTypes":["Flying","Ground"]}]},"vivillon":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Hurricane","Pollen Puff","Protect","Sleep Powder"],"abilities":["Compound Eyes"],"teraTypes":["Flying","Steel"]}]},"pyroar":{"level":83,"sets":[{"role":"Offensive Protect","movepool":["Fire Blast","Heat Wave","Hyper Voice","Protect","Taunt","Will-O-Wisp"],"abilities":["Unnerve"],"teraTypes":["Fire","Normal","Water"]},{"role":"Tera Blast user","movepool":["Fire Blast","Hyper Voice","Protect","Tera Blast"],"abilities":["Unnerve"],"teraTypes":["Grass"]}]},"florges":{"level":84,"sets":[{"role":"Bulky Protect","movepool":["Calm Mind","Dazzling Gleam","Moonblast","Protect","Synthesis"],"abilities":["Flower Veil"],"teraTypes":["Steel"]}]},"gogoat":{"level":89,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Double-Edge","High Horsepower","Horn Leech","Leaf Storm"],"abilities":["Sap Sipper"],"teraTypes":["Ground","Normal"]}]},"meowstic":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fake Out","Fake Tears","Helping Hand","Light Screen","Psychic","Reflect"],"abilities":["Prankster"],"teraTypes":["Dark","Steel"]},{"role":"Doubles Support","movepool":["Fake Out","Helping Hand","Psychic","Thunder Wave"],"abilities":["Prankster"],"teraTypes":["Dark","Steel"]}]},"meowsticf":{"level":88,"sets":[{"role":"Offensive Protect","movepool":["Alluring Voice","Dark Pulse","Protect","Psychic","Thunderbolt"],"abilities":["Competitive"],"teraTypes":["Dark","Electric","Fairy"]}]},"malamar":{"level":80,"sets":[{"role":"Bulky Protect","movepool":["Knock Off","Protect","Psycho Cut","Superpower","Trick Room"],"abilities":["Contrary"],"teraTypes":["Fighting"]}]},"dragalge":{"level":88,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Hydro Pump","Protect","Sludge Bomb"],"abilities":["Adaptability"],"teraTypes":["Water"]}]},"clawitzer":{"level":84,"sets":[{"role":"Choice Item user","movepool":["Aura Sphere","Dark Pulse","Dragon Pulse","Muddy Water","U-turn"],"abilities":["Mega Launcher"],"teraTypes":["Dark","Dragon","Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Aura Sphere","Dark Pulse","Heal Pulse","Muddy Water","Protect"],"abilities":["Mega Launcher"],"teraTypes":["Dark","Fighting"]}]},"sylveon":{"level":79,"sets":[{"role":"Bulky Protect","movepool":["Calm Mind","Hyper Voice","Protect","Substitute"],"abilities":["Pixilate"],"teraTypes":["Steel"]},{"role":"Tera Blast user","movepool":["Hyper Voice","Protect","Quick Attack","Tera Blast"],"abilities":["Pixilate"],"teraTypes":["Fire","Ground"]}]},"hawlucha":{"level":84,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Brave Bird","Close Combat","Protect","Swords Dance"],"abilities":["Unburden"],"teraTypes":["Fighting","Fire","Flying"]}]},"dedenne":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Dazzling Gleam","Helping Hand","Nuzzle","Super Fang","Thunderbolt"],"abilities":["Cheek Pouch"],"teraTypes":["Electric","Flying"]}]},"carbink":{"level":88,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Moonblast","Trick Room"],"abilities":["Clear Body"],"teraTypes":["Fighting"]}]},"goodra":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Breaking Swipe","Draco Meteor","Fire Blast","Power Whip","Protect","Scald","Sludge Bomb","Thunderbolt"],"abilities":["Sap Sipper"],"teraTypes":["Electric","Fire","Grass","Poison","Water"]}]},"goodrahisui":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Dragon Tail","Fire Blast","Heavy Slam","Hydro Pump","Thunderbolt"],"abilities":["Sap Sipper"],"teraTypes":["Electric","Fire","Water"]}]},"klefki":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Dazzling Gleam","Foul Play","Light Screen","Reflect","Spikes","Thunder Wave"],"abilities":["Prankster"],"teraTypes":["Flying","Water"]}]},"trevenant":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Poltergeist","Protect","Trick Room","Wood Hammer"],"abilities":["Harvest"],"teraTypes":["Dark","Water"]}]},"avalugg":{"level":91,"sets":[{"role":"Bulky Protect","movepool":["Avalanche","Body Press","Protect","Recover"],"abilities":["Sturdy"],"teraTypes":["Fighting","Poison","Water"]}]},"avalugghisui":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Body Press","Mountain Gale","Protect","Rock Slide"],"abilities":["Sturdy"],"teraTypes":["Fighting","Flying","Poison"]}]},"noivern":{"level":84,"sets":[{"role":"Doubles Fast Attacker","movepool":["Draco Meteor","Flamethrower","Hurricane","Protect","Tailwind"],"abilities":["Infiltrator"],"teraTypes":["Dragon","Fire","Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Flamethrower","Hurricane","Protect","Tailwind"],"abilities":["Infiltrator"],"teraTypes":["Dragon","Fire","Steel"]}]},"diancie":{"level":78,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Diamond Storm","Protect","Trick Room"],"abilities":["Clear Body"],"teraTypes":["Fighting"]},{"role":"Bulky Protect","movepool":["Diamond Storm","Moonblast","Protect","Trick Room"],"abilities":["Clear Body"],"teraTypes":["Grass","Steel"]}]},"hoopa":{"level":85,"sets":[{"role":"Doubles Fast Attacker","movepool":["Focus Blast","Hyperspace Hole","Protect","Shadow Ball","Trick"],"abilities":["Magician"],"teraTypes":["Dark","Fighting","Psychic"]}]},"hoopaunbound":{"level":80,"sets":[{"role":"Choice Item user","movepool":["Drain Punch","Gunk Shot","Hyperspace Fury","Trick","Zen Headbutt"],"abilities":["Magician"],"teraTypes":["Dark","Fighting","Poison"]},{"role":"Doubles Bulky Attacker","movepool":["Focus Blast","Gunk Shot","Hyperspace Fury","Protect","Psychic","Trick"],"abilities":["Magician"],"teraTypes":["Dark","Fighting","Poison"]}]},"volcanion":{"level":75,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Earth Power","Heat Wave","Protect","Sludge Bomb","Steam Eruption"],"abilities":["Water Absorb"],"teraTypes":["Ground"]}]},"decidueye":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Knock Off","Leaf Storm","Protect","Spirit Shackle","Tailwind"],"abilities":["Overgrow"],"teraTypes":["Dark","Ghost","Water"]}]},"decidueyehisui":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Knock Off","Leaf Blade","Protect","Tailwind","Triple Arrows"],"abilities":["Scrappy"],"teraTypes":["Dark","Fighting","Steel"]}]},"incineroar":{"level":78,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fake Out","Flare Blitz","Knock Off","Parting Shot"],"abilities":["Intimidate"],"teraTypes":["Water"]}]},"primarina":{"level":79,"sets":[{"role":"Doubles Wallbreaker","movepool":["Flip Turn","Hydro Pump","Hyper Voice","Moonblast"],"abilities":["Liquid Voice"],"teraTypes":["Water"]}]},"toucannon":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Brave Bird","Bullet Seed","Protect","Tailwind"],"abilities":["Skill Link"],"teraTypes":["Grass","Steel"]},{"role":"Bulky Protect","movepool":["Beak Blast","Bullet Seed","Knock Off","Protect"],"abilities":["Skill Link"],"teraTypes":["Grass","Steel"]}]},"gumshoos":{"level":93,"sets":[{"role":"Choice Item user","movepool":["Double-Edge","Knock Off","Stomping Tantrum","U-turn"],"abilities":["Adaptability"],"teraTypes":["Normal"]}]},"vikavolt":{"level":83,"sets":[{"role":"Bulky Protect","movepool":["Bug Buzz","Electroweb","Protect","Sticky Web","Thunderbolt"],"abilities":["Levitate"],"teraTypes":["Electric"]}]},"crabominable":{"level":89,"sets":[{"role":"Doubles Wallbreaker","movepool":["Drain Punch","Gunk Shot","Ice Hammer","Protect","Wide Guard"],"abilities":["Iron Fist"],"teraTypes":["Fire","Poison"]}]},"oricorio":{"level":84,"sets":[{"role":"Bulky Protect","movepool":["Hurricane","Protect","Quiver Dance","Revelation Dance","Tailwind"],"abilities":["Dancer"],"teraTypes":["Ground"]}]},"oricoriopompom":{"level":83,"sets":[{"role":"Bulky Protect","movepool":["Hurricane","Protect","Quiver Dance","Revelation Dance","Tailwind"],"abilities":["Dancer"],"teraTypes":["Ground"]}]},"oricoriopau":{"level":89,"sets":[{"role":"Bulky Protect","movepool":["Hurricane","Protect","Quiver Dance","Revelation Dance","Tailwind"],"abilities":["Dancer"],"teraTypes":["Fighting","Ground"]}]},"oricoriosensu":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Hurricane","Protect","Quiver Dance","Revelation Dance","Tailwind"],"abilities":["Dancer"],"teraTypes":["Fighting","Ground"]}]},"ribombee":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Moonblast","Pollen Puff","Protect","Tailwind"],"abilities":["Shield Dust"],"teraTypes":["Steel"]},{"role":"Tera Blast user","movepool":["Dazzling Gleam","Moonblast","Protect","Quiver Dance","Tera Blast"],"abilities":["Shield Dust"],"teraTypes":["Ground"]}]},"lycanroc":{"level":85,"sets":[{"role":"Offensive Protect","movepool":["Accelerock","Close Combat","Drill Run","Protect","Rock Slide","Swords Dance"],"abilities":["Sand Rush"],"teraTypes":["Fighting"]}]},"lycanrocmidnight":{"level":84,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Knock Off","Rock Slide","Stone Edge"],"abilities":["No Guard"],"teraTypes":["Fighting","Rock","Water"]}]},"lycanrocdusk":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Accelerock","Close Combat","Protect","Psychic Fangs","Rock Slide","Swords Dance"],"abilities":["Tough Claws"],"teraTypes":["Fighting"]}]},"toxapex":{"level":94,"sets":[{"role":"Bulky Protect","movepool":["Baneful Bunker","Infestation","Recover","Toxic"],"abilities":["Regenerator"],"teraTypes":["Grass","Steel"]}]},"mudsdale":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Heavy Slam","High Horsepower","Rest","Stone Edge"],"abilities":["Stamina"],"teraTypes":["Fighting"]}]},"araquanid":{"level":85,"sets":[{"role":"Doubles Bulky Setup","movepool":["Liquidation","Lunge","Protect","Sticky Web","Wide Guard"],"abilities":["Water Bubble"],"teraTypes":["Water"]},{"role":"Doubles Support","movepool":["Leech Life","Liquidation","Protect","Sticky Web","Wide Guard"],"abilities":["Water Bubble"],"teraTypes":["Water"]},{"role":"Doubles Bulky Attacker","movepool":["Hydro Pump","Liquidation","Protect","Sticky Web","Wide Guard"],"abilities":["Water Bubble"],"teraTypes":["Water"]}]},"lurantis":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Leaf Blade","Leaf Storm","Pollen Puff","Superpower"],"abilities":["Contrary"],"teraTypes":["Fighting"]},{"role":"Bulky Protect","movepool":["Knock Off","Leaf Blade","Pollen Puff","Protect","Superpower"],"abilities":["Contrary"],"teraTypes":["Fighting"]},{"role":"Tera Blast user","movepool":["Knock Off","Leaf Storm","Superpower","Tera Blast"],"abilities":["Contrary"],"teraTypes":["Stellar"]}]},"salazzle":{"level":86,"sets":[{"role":"Doubles Fast Attacker","movepool":["Encore","Fake Out","Fire Blast","Heat Wave","Incinerate","Poison Gas","Protect","Sludge Bomb"],"abilities":["Corrosion"],"teraTypes":["Fire","Flying","Water"]}]},"tsareena":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["High Jump Kick","Knock Off","Power Whip","Rapid Spin","Triple Axel"],"abilities":["Queenly Majesty"],"teraTypes":["Fighting","Fire"]}]},"comfey":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Draining Kiss","Floral Healing","Helping Hand","Tailwind"],"abilities":["Triage"],"teraTypes":["Fairy","Steel"]}]},"oranguru":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Hyper Voice","Instruct","Psyshock","Trick Room"],"abilities":["Telepathy"],"teraTypes":["Fairy"]}]},"passimian":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Gunk Shot","Knock Off","Rock Slide","U-turn"],"abilities":["Defiant"],"teraTypes":["Dark","Poison"]}]},"palossand":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Earth Power","Protect","Shadow Ball","Shore Up","Stealth Rock"],"abilities":["Water Compaction"],"teraTypes":["Grass","Water"]}]},"minior":{"level":82,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Acrobatics","Protect","Rock Slide","Shell Smash"],"abilities":["Shields Down"],"teraTypes":["Flying","Rock","Steel"]}]},"komala":{"level":92,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Double-Edge","Knock Off","Rapid Spin","Sucker Punch","Superpower","U-turn","Wood Hammer"],"abilities":["Comatose"],"teraTypes":["Fighting","Grass"]}]},"mimikyu":{"level":82,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Play Rough","Protect","Shadow Claw","Shadow Sneak","Swords Dance"],"abilities":["Disguise"],"teraTypes":["Ghost"]}]},"bruxish":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Crunch","Protect","Psychic Fangs","Wave Crash"],"abilities":["Strong Jaw"],"teraTypes":["Dark","Psychic"]},{"role":"Choice Item user","movepool":["Aqua Jet","Crunch","Flip Turn","Ice Fang","Psychic Fangs","Wave Crash"],"abilities":["Strong Jaw"],"teraTypes":["Dark"]}]},"solgaleo":{"level":74,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Flare Blitz","Knock Off","Psychic Fangs","Sunsteel Strike"],"abilities":["Full Metal Body"],"teraTypes":["Dark","Fighting","Fire"]},{"role":"Doubles Bulky Setup","movepool":["Close Combat","Flame Charge","Protect","Sunsteel Strike"],"abilities":["Full Metal Body"],"teraTypes":["Fighting","Fire"]}]},"lunala":{"level":72,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Moongeist Beam","Moonlight","Tailwind","Wide Guard","Will-O-Wisp"],"abilities":["Shadow Shield"],"teraTypes":["Dark"]},{"role":"Offensive Protect","movepool":["Meteor Beam","Moonblast","Moongeist Beam","Protect"],"abilities":["Shadow Shield"],"teraTypes":["Fairy"]},{"role":"Bulky Protect","movepool":["Calm Mind","Moonblast","Moongeist Beam","Protect"],"abilities":["Shadow Shield"],"teraTypes":["Fairy"]}]},"necrozma":{"level":80,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Brick Break","Dragon Dance","Knock Off","Photon Geyser"],"abilities":["Prism Armor"],"teraTypes":["Dark","Fighting"]},{"role":"Offensive Protect","movepool":["Earth Power","Meteor Beam","Photon Geyser","Protect"],"abilities":["Prism Armor"],"teraTypes":["Dark","Steel"]},{"role":"Bulky Protect","movepool":["Calm Mind","Earth Power","Photon Geyser","Protect"],"abilities":["Prism Armor"],"teraTypes":["Dark","Steel"]}]},"necrozmaduskmane":{"level":71,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dragon Dance","Earthquake","Photon Geyser","Protect","Sunsteel Strike"],"abilities":["Prism Armor"],"teraTypes":["Dark","Steel","Water"]},{"role":"Doubles Wallbreaker","movepool":["Earthquake","Photon Geyser","Protect","Sunsteel Strike","Trick Room"],"abilities":["Prism Armor"],"teraTypes":["Dark","Steel","Water"]}]},"necrozmadawnwings":{"level":74,"sets":[{"role":"Doubles Wallbreaker","movepool":["Moongeist Beam","Photon Geyser","Protect","Trick Room"],"abilities":["Prism Armor"],"teraTypes":["Dark"]},{"role":"Tera Blast user","movepool":["Moongeist Beam","Photon Geyser","Tera Blast","Trick Room"],"abilities":["Prism Armor"],"teraTypes":["Fairy","Fighting"]}]},"kommoo":{"level":79,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Clanging Scales","Clangorous Soul","Drain Punch","Iron Head"],"abilities":["Soundproof"],"teraTypes":["Steel"]},{"role":"Doubles Bulky Setup","movepool":["Clanging Scales","Clangorous Soul","Iron Head","Protect"],"abilities":["Soundproof"],"teraTypes":["Steel"]}]},"magearna":{"level":71,"sets":[{"role":"Doubles Wallbreaker","movepool":["Dazzling Gleam","Flash Cannon","Fleur Cannon","Protect","Trick Room"],"abilities":["Soul-Heart"],"teraTypes":["Fairy","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Aura Sphere","Dazzling Gleam","Flash Cannon","Fleur Cannon"],"abilities":["Soul-Heart"],"teraTypes":["Fairy","Fighting","Water"]}]},"rillaboom":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fake Out","Grassy Glide","High Horsepower","Wood Hammer"],"abilities":["Grassy Surge"],"teraTypes":["Fire","Grass","Steel"]},{"role":"Doubles Support","movepool":["Fake Out","Grassy Glide","U-turn","Wood Hammer"],"abilities":["Grassy Surge"],"teraTypes":["Fire","Grass","Steel"]}]},"cinderace":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Court Change","Gunk Shot","High Jump Kick","Protect","Pyro Ball","Sucker Punch","U-turn"],"abilities":["Blaze"],"teraTypes":["Fighting","Fire","Poison"]}]},"inteleon":{"level":78,"sets":[{"role":"Choice Item user","movepool":["Hydro Pump","Ice Beam","Muddy Water","Scald"],"abilities":["Torrent"],"teraTypes":["Water"]}]},"greedent":{"level":86,"sets":[{"role":"Doubles Bulky Setup","movepool":["Double-Edge","High Horsepower","Knock Off","Protect","Swords Dance"],"abilities":["Cheek Pouch"],"teraTypes":["Fairy","Ghost","Ground"]}]},"corviknight":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Brave Bird","Iron Head","Roost","Tailwind","U-turn"],"abilities":["Mirror Armor"],"teraTypes":["Dragon"]}]},"drednaw":{"level":83,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Crunch","Liquidation","Rock Slide","Shell Smash"],"abilities":["Strong Jaw"],"teraTypes":["Dark"]},{"role":"Doubles Bulky Setup","movepool":["Liquidation","Protect","Rock Slide","Shell Smash"],"abilities":["Shell Armor","Swift Swim"],"teraTypes":["Water"]}]},"coalossal":{"level":90,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fire Blast","Heat Wave","Incinerate","Protect","Rapid Spin","Stealth Rock","Stone Edge","Will-O-Wisp"],"abilities":["Flame Body"],"teraTypes":["Water"]}]},"flapple":{"level":94,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Dragon Dance","Dragon Rush","Grav Apple","Protect","Sucker Punch"],"abilities":["Ripen"],"teraTypes":["Fire","Grass","Steel"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Grav Apple","Protect","Tera Blast"],"abilities":["Hustle"],"teraTypes":["Dragon","Fire"]}]},"appletun":{"level":91,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Apple Acid","Dragon Pulse","Leech Seed","Protect"],"abilities":["Ripen","Thick Fat"],"teraTypes":["Steel"]}]},"sandaconda":{"level":87,"sets":[{"role":"Doubles Bulky Setup","movepool":["Coil","High Horsepower","Rest","Stone Edge"],"abilities":["Shed Skin"],"teraTypes":["Dragon","Steel"]},{"role":"Doubles Support","movepool":["Glare","High Horsepower","Rest","Stealth Rock","Stone Edge"],"abilities":["Shed Skin"],"teraTypes":["Dragon","Steel"]}]},"cramorant":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Brave Bird","Protect","Roost","Surf","Tailwind"],"abilities":["Gulp Missile"],"teraTypes":["Ground"]}]},"barraskewda":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Poison Jab","Protect","Psychic Fangs","Waterfall"],"abilities":["Propeller Tail"],"teraTypes":["Fighting"]}]},"toxtricity":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Overdrive","Sludge Bomb","Snarl","Volt Switch"],"abilities":["Punk Rock"],"teraTypes":["Dark","Electric","Flying"]},{"role":"Doubles Wallbreaker","movepool":["Overdrive","Psychic Noise","Sludge Bomb","Volt Switch"],"abilities":["Punk Rock"],"teraTypes":["Electric","Flying","Psychic"]}]},"toxtricitylowkey":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Overdrive","Sludge Bomb","Snarl","Volt Switch"],"abilities":["Punk Rock"],"teraTypes":["Dark","Electric","Flying"]},{"role":"Doubles Wallbreaker","movepool":["Overdrive","Psychic Noise","Sludge Bomb","Volt Switch"],"abilities":["Punk Rock"],"teraTypes":["Electric","Flying","Psychic"]}]},"polteageist":{"level":85,"sets":[{"role":"Tera Blast user","movepool":["Protect","Shadow Ball","Shell Smash","Tera Blast"],"abilities":["Cursed Body"],"teraTypes":["Fighting"]},{"role":"Doubles Setup Sweeper","movepool":["Baton Pass","Protect","Shadow Ball","Shell Smash"],"abilities":["Cursed Body"],"teraTypes":["Dark","Normal"]}]},"hatterene":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Dazzling Gleam","Mystical Fire","Protect","Psychic","Trick Room"],"abilities":["Magic Bounce"],"teraTypes":["Fairy","Fire","Psychic","Steel"]}]},"grimmsnarl":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fake Out","Light Screen","Parting Shot","Reflect","Spirit Break"],"abilities":["Prankster"],"teraTypes":["Steel"]},{"role":"Doubles Support","movepool":["Fake Out","Parting Shot","Spirit Break","Sucker Punch","Taunt","Thunder Wave"],"abilities":["Prankster"],"teraTypes":["Steel"]}]},"perrserker":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Fake Out","Helping Hand","Iron Head","Knock Off","U-turn"],"abilities":["Steely Spirit","Tough Claws"],"teraTypes":["Fighting","Steel"]},{"role":"Choice Item user","movepool":["Close Combat","Iron Head","Knock Off","U-turn"],"abilities":["Steely Spirit","Tough Claws"],"teraTypes":["Fighting","Steel"]}]},"alcremie":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Alluring Voice","Dazzling Gleam","Decorate","Encore","Protect"],"abilities":["Aroma Veil"],"teraTypes":["Steel"]}]},"falinks":{"level":87,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Iron Head","Knock Off","No Retreat","Protect","Rock Slide"],"abilities":["Defiant"],"teraTypes":["Dark","Steel"]}]},"pincurchin":{"level":97,"sets":[{"role":"Doubles Support","movepool":["Electroweb","Recover","Thunderbolt","Toxic Spikes"],"abilities":["Electric Surge"],"teraTypes":["Grass"]}]},"frosmoth":{"level":86,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bug Buzz","Ice Beam","Protect","Quiver Dance"],"abilities":["Ice Scales"],"teraTypes":["Ground","Water"]},{"role":"Tera Blast user","movepool":["Ice Beam","Protect","Quiver Dance","Tera Blast"],"abilities":["Ice Scales"],"teraTypes":["Ground"]}]},"stonjourner":{"level":88,"sets":[{"role":"Doubles Fast Attacker","movepool":["Heat Crash","High Horsepower","Protect","Rock Polish","Stone Edge"],"abilities":["Power Spot"],"teraTypes":["Fire","Rock"]},{"role":"Choice Item user","movepool":["Heat Crash","High Horsepower","Rock Slide","Stone Edge"],"abilities":["Power Spot"],"teraTypes":["Fire","Rock"]}]},"eiscue":{"level":89,"sets":[{"role":"Doubles Bulky Setup","movepool":["Belly Drum","Ice Spinner","Liquidation","Protect"],"abilities":["Ice Face"],"teraTypes":["Water"]}]},"indeedee":{"level":79,"sets":[{"role":"Offensive Protect","movepool":["Encore","Expanding Force","Hyper Voice","Protect","Shadow Ball"],"abilities":["Psychic Surge"],"teraTypes":["Fairy","Psychic"]},{"role":"Doubles Wallbreaker","movepool":["Expanding Force","Hyper Voice","Psyshock","Trick"],"abilities":["Psychic Surge"],"teraTypes":["Psychic"]},{"role":"Tera Blast user","movepool":["Encore","Expanding Force","Protect","Shadow Ball","Tera Blast","Trick"],"abilities":["Psychic Surge"],"teraTypes":["Fairy","Fighting"]}]},"indeedeef":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Heal Pulse","Helping Hand","Protect","Psychic"],"abilities":["Psychic Surge"],"teraTypes":["Fairy"]}]},"morpeko":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Aura Wheel","Electroweb","Fake Out","Knock Off","Protect"],"abilities":["Hunger Switch"],"teraTypes":["Electric"]},{"role":"Offensive Protect","movepool":["Aura Wheel","Knock Off","Parting Shot","Protect","Volt Switch"],"abilities":["Hunger Switch"],"teraTypes":["Electric"]}]},"copperajah":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["High Horsepower","Iron Head","Play Rough","Protect","Rock Slide"],"abilities":["Sheer Force"],"teraTypes":["Fairy","Rock"]},{"role":"Doubles Bulky Attacker","movepool":["Heat Crash","Heavy Slam","High Horsepower","Stone Edge"],"abilities":["Heavy Metal"],"teraTypes":["Fire"]}]},"duraludon":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Draco Meteor","Flash Cannon","Iron Defense"],"abilities":["Stalwart"],"teraTypes":["Fighting"]},{"role":"Doubles Bulky Setup","movepool":["Body Press","Flash Cannon","Iron Defense","Protect","Snarl","Thunder Wave"],"abilities":["Stalwart"],"teraTypes":["Fighting"]}]},"dragapult":{"level":79,"sets":[{"role":"Offensive Protect","movepool":["Draco Meteor","Dragon Darts","Fire Blast","Protect","Shadow Ball"],"abilities":["Clear Body"],"teraTypes":["Dragon"]},{"role":"Choice Item user","movepool":["Dragon Claw","Dragon Darts","Phantom Force","U-turn"],"abilities":["Clear Body"],"teraTypes":["Dragon"]}]},"zacian":{"level":70,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Play Rough","Protect","Psychic Fangs","Swords Dance"],"abilities":["Intrepid Sword"],"teraTypes":["Fighting"]}]},"zaciancrowned":{"level":66,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Behemoth Blade","Close Combat","Play Rough","Protect","Swords Dance"],"abilities":["Intrepid Sword"],"teraTypes":["Fairy","Fighting","Fire","Steel"]}]},"zamazenta":{"level":72,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Coaching","Crunch","Howl","Iron Head","Psychic Fangs","Stone Edge"],"abilities":["Dauntless Shield"],"teraTypes":["Dark","Fighting","Steel"]},{"role":"Bulky Protect","movepool":["Body Press","Crunch","Iron Defense","Protect"],"abilities":["Dauntless Shield"],"teraTypes":["Fighting","Fire","Steel"]}]},"zamazentacrowned":{"level":68,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Body Press","Coaching","Heavy Slam","Iron Defense","Protect","Snarl","Wide Guard"],"abilities":["Dauntless Shield"],"teraTypes":["Fighting","Fire","Steel"]}]},"eternatus":{"level":70,"sets":[{"role":"Doubles Bulky Setup","movepool":["Cosmic Power","Dynamax Cannon","Flamethrower","Recover"],"abilities":["Pressure"],"teraTypes":["Dragon","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Dynamax Cannon","Fire Blast","Recover","Sludge Bomb","Toxic Spikes"],"abilities":["Pressure"],"teraTypes":["Dragon","Water"]},{"role":"Offensive Protect","movepool":["Dynamax Cannon","Fire Blast","Meteor Beam","Protect"],"abilities":["Pressure"],"teraTypes":["Dragon","Water"]}]},"urshifu":{"level":75,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Poison Jab","Protect","Sucker Punch","Wicked Blow"],"abilities":["Unseen Fist"],"teraTypes":["Dark","Poison"]}]},"urshifurapidstrike":{"level":76,"sets":[{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Close Combat","Ice Spinner","Protect","Surging Strikes","U-turn"],"abilities":["Unseen Fist"],"teraTypes":["Water"]}]},"zarude":{"level":80,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Jungle Healing","Knock Off","Power Whip","Protect"],"abilities":["Leaf Guard"],"teraTypes":["Poison"]}]},"regieleki":{"level":79,"sets":[{"role":"Doubles Fast Attacker","movepool":["Electroweb","Protect","Thunderbolt","Volt Switch"],"abilities":["Transistor"],"teraTypes":["Electric"]},{"role":"Tera Blast user","movepool":["Electroweb","Protect","Tera Blast","Thunderbolt"],"abilities":["Transistor"],"teraTypes":["Ice"]}]},"regidrago":{"level":74,"sets":[{"role":"Choice Item user","movepool":["Draco Meteor","Dragon Claw","Dragon Energy","Earth Power"],"abilities":["Dragon's Maw"],"teraTypes":["Dragon"]}]},"glastrier":{"level":80,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Heavy Slam","High Horsepower","Icicle Crash","Protect"],"abilities":["Chilling Neigh"],"teraTypes":["Fighting","Ground","Steel"]}]},"spectrier":{"level":77,"sets":[{"role":"Offensive Protect","movepool":["Draining Kiss","Nasty Plot","Protect","Shadow Ball"],"abilities":["Grim Neigh"],"teraTypes":["Fairy"]},{"role":"Doubles Setup Sweeper","movepool":["Dark Pulse","Nasty Plot","Protect","Shadow Ball"],"abilities":["Grim Neigh"],"teraTypes":["Dark"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Shadow Ball","Tera Blast"],"abilities":["Grim Neigh"],"teraTypes":["Fighting"]}]},"calyrex":{"level":95,"sets":[{"role":"Doubles Support","movepool":["Encore","Giga Drain","Helping Hand","Leaf Storm","Leech Seed","Pollen Puff","Psychic"],"abilities":["Unnerve"],"teraTypes":["Steel"]}]},"calyrexice":{"level":65,"sets":[{"role":"Doubles Wallbreaker","movepool":["Glacial Lance","High Horsepower","Protect","Trick Room"],"abilities":["As One (Glastrier)"],"teraTypes":["Ground","Ice"]}]},"calyrexshadow":{"level":62,"sets":[{"role":"Offensive Protect","movepool":["Astral Barrage","Encore","Nasty Plot","Pollen Puff","Protect","Psyshock"],"abilities":["As One (Spectrier)"],"teraTypes":["Dark","Ghost"]}]},"wyrdeer":{"level":85,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Slam","Double-Edge","Earth Power","Protect","Psychic","Thunder Wave","Thunderbolt"],"abilities":["Intimidate"],"teraTypes":["Fairy"]},{"role":"Doubles Wallbreaker","movepool":["Double-Edge","Earth Power","Psychic","Trick Room"],"abilities":["Intimidate"],"teraTypes":["Fairy","Ground"]}]},"kleavor":{"level":79,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Protect","Stone Axe","Tailwind","U-turn","X-Scissor"],"abilities":["Sharpness"],"teraTypes":["Bug","Fighting","Rock","Steel"]}]},"ursaluna":{"level":77,"sets":[{"role":"Doubles Wallbreaker","movepool":["Crunch","Earthquake","Facade","Headlong Rush","Protect"],"abilities":["Guts"],"teraTypes":["Normal"]}]},"ursalunabloodmoon":{"level":78,"sets":[{"role":"Bulky Protect","movepool":["Blood Moon","Earth Power","Hyper Voice","Protect"],"abilities":["Mind's Eye"],"teraTypes":["Ghost","Normal","Poison","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Blood Moon","Earth Power","Hyper Voice","Vacuum Wave"],"abilities":["Mind's Eye"],"teraTypes":["Ghost","Normal","Poison","Water"]}]},"enamorus":{"level":79,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Play Rough","Protect","Superpower","Tailwind"],"abilities":["Contrary"],"teraTypes":["Fighting"]},{"role":"Offensive Protect","movepool":["Earth Power","Protect","Springtide Storm","Tailwind"],"abilities":["Contrary"],"teraTypes":["Ground"]},{"role":"Tera Blast user","movepool":["Protect","Springtide Storm","Superpower","Tera Blast"],"abilities":["Contrary"],"teraTypes":["Stellar"]}]},"enamorustherian":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Earth Power","Moonblast","Mystical Fire","Protect","Springtide Storm"],"abilities":["Overcoat"],"teraTypes":["Fairy","Ground"]}]},"meowscarada":{"level":80,"sets":[{"role":"Choice Item user","movepool":["Flower Trick","Knock Off","Sucker Punch","Triple Axel","U-turn"],"abilities":["Protean"],"teraTypes":["Dark","Grass"]},{"role":"Offensive Protect","movepool":["Flower Trick","Knock Off","Protect","Sucker Punch","Taunt"],"abilities":["Overgrow"],"teraTypes":["Poison"]}]},"skeledirge":{"level":80,"sets":[{"role":"Bulky Protect","movepool":["Protect","Shadow Ball","Slack Off","Torch Song"],"abilities":["Unaware"],"teraTypes":["Fairy","Water"]}]},"quaquaval":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Aqua Jet","Aqua Step","Close Combat","Knock Off","Protect","Triple Axel"],"abilities":["Moxie"],"teraTypes":["Fire","Steel","Water"]}]},"oinkologne":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Double-Edge","Helping Hand","Lash Out","Protect","Yawn"],"abilities":["Gluttony"],"teraTypes":["Ghost","Normal"]},{"role":"Doubles Wallbreaker","movepool":["Double-Edge","High Horsepower","Lash Out","Play Rough"],"abilities":["Thick Fat"],"teraTypes":["Fairy","Ground","Normal"]}]},"oinkolognef":{"level":92,"sets":[{"role":"Doubles Support","movepool":["Double-Edge","Helping Hand","Lash Out","Protect","Yawn"],"abilities":["Gluttony"],"teraTypes":["Ghost","Normal"]},{"role":"Doubles Wallbreaker","movepool":["Double-Edge","High Horsepower","Lash Out","Play Rough"],"abilities":["Thick Fat"],"teraTypes":["Fairy","Ground","Normal"]}]},"spidops":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Circle Throw","Knock Off","Lunge","Sticky Web","String Shot","U-turn"],"abilities":["Stakeout"],"teraTypes":["Water"]}]},"lokix":{"level":87,"sets":[{"role":"Offensive Protect","movepool":["First Impression","Protect","Sucker Punch","U-turn"],"abilities":["Tinted Lens"],"teraTypes":["Bug"]},{"role":"Doubles Fast Attacker","movepool":["First Impression","Leech Life","Protect","Sucker Punch"],"abilities":["Tinted Lens"],"teraTypes":["Bug"]}]},"pawmot":{"level":80,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Double Shock","Fake Out","Protect","Revival Blessing"],"abilities":["Volt Absorb"],"teraTypes":["Electric"]}]},"maushold":{"level":79,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Encore","Population Bomb","Protect","Tidy Up"],"abilities":["Technician"],"teraTypes":["Normal"]},{"role":"Doubles Support","movepool":["Encore","Follow Me","Population Bomb","Protect","Taunt","Thunder Wave","U-turn"],"abilities":["Technician"],"teraTypes":["Ghost","Normal"]}]},"dachsbun":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Body Press","Helping Hand","Howl","Play Rough","Snarl","Yawn"],"abilities":["Well-Baked Body"],"teraTypes":["Steel"]}]},"arboliva":{"level":88,"sets":[{"role":"Doubles Wallbreaker","movepool":["Earth Power","Energy Ball","Hyper Voice","Pollen Puff","Protect","Strength Sap"],"abilities":["Seed Sower"],"teraTypes":["Grass"]}]},"squawkabilly":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Double-Edge","Parting Shot","Protect","Quick Attack"],"abilities":["Intimidate"],"teraTypes":["Flying","Normal","Steel"]}]},"squawkabillywhite":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Double-Edge","Parting Shot","Protect","Quick Attack"],"abilities":["Intimidate"],"teraTypes":["Flying","Normal","Steel"]}]},"squawkabillyblue":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Double-Edge","Parting Shot","Protect","Quick Attack"],"abilities":["Intimidate"],"teraTypes":["Flying","Normal","Steel"]}]},"squawkabillyyellow":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Double-Edge","Parting Shot","Protect","Quick Attack"],"abilities":["Intimidate"],"teraTypes":["Flying","Normal","Steel"]}]},"garganacl":{"level":81,"sets":[{"role":"Bulky Protect","movepool":["Protect","Recover","Salt Cure","Stealth Rock","Wide Guard"],"abilities":["Purifying Salt"],"teraTypes":["Ghost"]}]},"armarouge":{"level":81,"sets":[{"role":"Doubles Wallbreaker","movepool":["Armor Cannon","Aura Sphere","Energy Ball","Heat Wave","Psyshock"],"abilities":["Flash Fire"],"teraTypes":["Fighting","Fire","Grass"]},{"role":"Offensive Protect","movepool":["Heat Wave","Protect","Psychic","Trick Room"],"abilities":["Flash Fire"],"teraTypes":["Dark","Grass"]},{"role":"Doubles Setup Sweeper","movepool":["Heat Wave","Meteor Beam","Protect","Psychic","Psyshock"],"abilities":["Weak Armor"],"teraTypes":["Dark","Grass"]}]},"ceruledge":{"level":80,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bitter Blade","Poltergeist","Protect","Shadow Sneak","Swords Dance"],"abilities":["Weak Armor"],"teraTypes":["Fire","Ghost","Grass"]}]},"bellibolt":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Electroweb","Muddy Water","Slack Off","Thunder Wave","Thunderbolt","Volt Switch"],"abilities":["Electromorphosis"],"teraTypes":["Water"]}]},"kilowattrel":{"level":80,"sets":[{"role":"Doubles Fast Attacker","movepool":["Hurricane","Protect","Tailwind","Thunderbolt"],"abilities":["Competitive"],"teraTypes":["Flying","Steel"]}]},"mabosstiff":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Crunch","Fire Fang","Play Rough","Psychic Fangs","Wild Charge"],"abilities":["Intimidate"],"teraTypes":["Fairy"]}]},"grafaiai":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Encore","Gunk Shot","Knock Off","Parting Shot","Protect","Taunt"],"abilities":["Prankster"],"teraTypes":["Dark"]},{"role":"Doubles Support","movepool":["Gunk Shot","Knock Off","Super Fang","U-turn"],"abilities":["Poison Touch"],"teraTypes":["Dark"]}]},"brambleghast":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Poltergeist","Power Whip","Protect","Shadow Sneak"],"abilities":["Wind Rider"],"teraTypes":["Fairy","Ghost","Grass","Steel","Water"]},{"role":"Doubles Support","movepool":["Disable","Poltergeist","Power Whip","Protect","Rapid Spin","Strength Sap"],"abilities":["Wind Rider"],"teraTypes":["Fairy","Steel","Water"]}]},"toedscruel":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Earth Power","Giga Drain","Knock Off","Rage Powder","Spore"],"abilities":["Mycelium Might"],"teraTypes":["Water"]}]},"klawf":{"level":91,"sets":[{"role":"Offensive Protect","movepool":["Crabhammer","High Horsepower","Knock Off","Protect","Rock Slide"],"abilities":["Regenerator"],"teraTypes":["Dark","Ground","Water"]},{"role":"Choice Item user","movepool":["Crabhammer","High Horsepower","Knock Off","Rock Slide"],"abilities":["Regenerator"],"teraTypes":["Dark","Ground","Water"]}]},"scovillain":{"level":89,"sets":[{"role":"Choice Item user","movepool":["Burning Jealousy","Energy Ball","Fire Blast","Leaf Storm"],"abilities":["Chlorophyll"],"teraTypes":["Fire","Grass","Steel"]},{"role":"Doubles Support","movepool":["Energy Ball","Fire Blast","Protect","Rage Powder","Will-O-Wisp"],"abilities":["Chlorophyll"],"teraTypes":["Fire","Grass","Steel"]}]},"rabsca":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Psychic","Revival Blessing","Struggle Bug","Trick Room"],"abilities":["Synchronize"],"teraTypes":["Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Bug Buzz","Psychic","Revival Blessing","Trick Room"],"abilities":["Synchronize"],"teraTypes":["Steel"]}]},"espathra":{"level":83,"sets":[{"role":"Offensive Protect","movepool":["Baton Pass","Dazzling Gleam","Lumina Crash","Protect","Shadow Ball"],"abilities":["Speed Boost"],"teraTypes":["Fairy"]}]},"tinkaton":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Encore","Fake Out","Gigaton Hammer","Knock Off","Play Rough","Stealth Rock","Thunder Wave"],"abilities":["Mold Breaker"],"teraTypes":["Steel","Water"]}]},"wugtrio":{"level":92,"sets":[{"role":"Choice Item user","movepool":["Aqua Jet","Liquidation","Stomping Tantrum","Throat Chop"],"abilities":["Gooey"],"teraTypes":["Dark","Ground"]}]},"bombirdier":{"level":84,"sets":[{"role":"Choice Item user","movepool":["Brave Bird","Knock Off","Rock Slide","Sucker Punch"],"abilities":["Rocky Payload"],"teraTypes":["Rock"]},{"role":"Offensive Protect","movepool":["Brave Bird","Knock Off","Protect","Rock Slide"],"abilities":["Rocky Payload"],"teraTypes":["Rock"]}]},"palafin":{"level":79,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Flip Turn","Jet Punch","Wave Crash"],"abilities":["Zero to Hero"],"teraTypes":["Fighting","Water"]},{"role":"Offensive Protect","movepool":["Flip Turn","Jet Punch","Protect","Wave Crash"],"abilities":["Zero to Hero"],"teraTypes":["Water"]}]},"revavroom":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["Gunk Shot","Iron Head","Parting Shot","Protect"],"abilities":["Filter"],"teraTypes":["Flying","Water"]},{"role":"Doubles Fast Attacker","movepool":["Gunk Shot","High Horsepower","Iron Head","Protect","Shift Gear"],"abilities":["Filter"],"teraTypes":["Ground"]}]},"cyclizar":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Breaking Swipe","Double-Edge","Knock Off","Shed Tail","Taunt"],"abilities":["Regenerator"],"teraTypes":["Dragon","Poison"]},{"role":"Doubles Fast Attacker","movepool":["Double-Edge","Draco Meteor","Knock Off","Shed Tail"],"abilities":["Regenerator"],"teraTypes":["Dragon","Fire","Normal","Poison"]}]},"orthworm":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Body Press","Heavy Slam","Iron Defense","Protect"],"abilities":["Earth Eater"],"teraTypes":["Electric","Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Body Press","Heavy Slam","Helping Hand","Protect","Shed Tail"],"abilities":["Earth Eater"],"teraTypes":["Electric","Poison"]}]},"glimmora":{"level":77,"sets":[{"role":"Bulky Protect","movepool":["Earth Power","Mortal Spin","Power Gem","Sludge Bomb","Spiky Shield","Stealth Rock"],"abilities":["Toxic Debris"],"teraTypes":["Grass","Water"]},{"role":"Offensive Protect","movepool":["Earth Power","Meteor Beam","Sludge Bomb","Spiky Shield"],"abilities":["Toxic Debris"],"teraTypes":["Ground"]}]},"houndstone":{"level":73,"sets":[{"role":"Choice Item user","movepool":["Body Press","Last Respects","Shadow Sneak","Trick"],"abilities":["Fluffy"],"teraTypes":["Ghost"]}]},"flamigo":{"level":84,"sets":[{"role":"Choice Item user","movepool":["Brave Bird","Close Combat","Throat Chop","U-turn"],"abilities":["Scrappy"],"teraTypes":["Fighting","Fire","Flying"]}]},"cetitan":{"level":83,"sets":[{"role":"Doubles Wallbreaker","movepool":["High Horsepower","Ice Shard","Icicle Crash","Liquidation","Protect"],"abilities":["Sheer Force"],"teraTypes":["Ground","Water"]}]},"veluza":{"level":88,"sets":[{"role":"Choice Item user","movepool":["Aqua Cutter","Aqua Jet","Night Slash","Psycho Cut"],"abilities":["Sharpness"],"teraTypes":["Dark","Psychic","Water"]}]},"dondozo":{"level":85,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Avalanche","Body Press","Heavy Slam","Wave Crash"],"abilities":["Unaware"],"teraTypes":["Dragon","Grass","Steel"]}]},"tatsugiri":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Icy Wind","Muddy Water","Rapid Spin"],"abilities":["Storm Drain"],"teraTypes":["Fire","Steel"]},{"role":"Doubles Setup Sweeper","movepool":["Draco Meteor","Muddy Water","Nasty Plot","Protect"],"abilities":["Storm Drain"],"teraTypes":["Dragon","Fire","Water"]},{"role":"Choice Item user","movepool":["Draco Meteor","Hydro Pump","Icy Wind","Muddy Water"],"abilities":["Storm Drain"],"teraTypes":["Dragon","Fire","Water"]}]},"farigiraf":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Hyper Voice","Nasty Plot","Protect","Psychic","Psyshock","Trick Room"],"abilities":["Armor Tail"],"teraTypes":["Fairy"]}]},"dudunsparce":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Earth Power","Glare","Hyper Drill","Protect","Tailwind"],"abilities":["Rattled"],"teraTypes":["Ghost","Ground","Normal"]},{"role":"Doubles Bulky Attacker","movepool":["Boomburst","Earth Power","Helping Hand","Protect","Tailwind"],"abilities":["Rattled"],"teraTypes":["Ghost","Ground","Normal"]}]},"kingambit":{"level":77,"sets":[{"role":"Doubles Bulky Setup","movepool":["Iron Head","Protect","Sucker Punch","Swords Dance"],"abilities":["Defiant"],"teraTypes":["Dark","Fire","Flying"]},{"role":"Bulky Protect","movepool":["Iron Head","Kowtow Cleave","Protect","Sucker Punch"],"abilities":["Defiant"],"teraTypes":["Dark","Fire","Flying"]},{"role":"Tera Blast user","movepool":["Iron Head","Kowtow Cleave","Sucker Punch","Tera Blast"],"abilities":["Defiant"],"teraTypes":["Fairy","Fire","Flying"]}]},"greattusk":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Headlong Rush","Ice Spinner","Knock Off","Protect","Rapid Spin","Rock Slide"],"abilities":["Protosynthesis"],"teraTypes":["Fire","Ground"]}]},"brutebonnet":{"level":80,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Crunch","Protect","Rage Powder","Seed Bomb","Spore","Sucker Punch"],"abilities":["Protosynthesis"],"teraTypes":["Dark","Poison"]}]},"sandyshocks":{"level":79,"sets":[{"role":"Doubles Fast Attacker","movepool":["Earth Power","Electroweb","Protect","Stealth Rock","Thunderbolt","Volt Switch"],"abilities":["Protosynthesis"],"teraTypes":["Electric","Grass","Ground"]},{"role":"Tera Blast user","movepool":["Earth Power","Protect","Tera Blast","Volt Switch"],"abilities":["Protosynthesis"],"teraTypes":["Flying","Ice"]}]},"screamtail":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Disable","Encore","Helping Hand","Howl","Play Rough","Stealth Rock","Thunder Wave"],"abilities":["Protosynthesis"],"teraTypes":["Steel"]}]},"fluttermane":{"level":73,"sets":[{"role":"Offensive Protect","movepool":["Dazzling Gleam","Moonblast","Protect","Shadow Ball"],"abilities":["Protosynthesis"],"teraTypes":["Fairy"]},{"role":"Choice Item user","movepool":["Dazzling Gleam","Moonblast","Mystical Fire","Shadow Ball"],"abilities":["Protosynthesis"],"teraTypes":["Fairy"]}]},"slitherwing":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","First Impression","Flare Blitz","U-turn","Wild Charge"],"abilities":["Protosynthesis"],"teraTypes":["Bug","Electric","Fighting","Fire"]}]},"roaringmoon":{"level":76,"sets":[{"role":"Doubles Fast Attacker","movepool":["Acrobatics","Breaking Swipe","Knock Off","Protect","Tailwind"],"abilities":["Protosynthesis"],"teraTypes":["Flying"]},{"role":"Doubles Setup Sweeper","movepool":["Dragon Claw","Dragon Dance","Knock Off","Protect"],"abilities":["Protosynthesis"],"teraTypes":["Dark","Fire"]}]},"irontreads":{"level":80,"sets":[{"role":"Doubles Bulky Attacker","movepool":["High Horsepower","Iron Head","Knock Off","Rapid Spin","Stealth Rock","Stone Edge"],"abilities":["Quark Drive"],"teraTypes":["Fire","Ground","Steel"]}]},"ironmoth":{"level":78,"sets":[{"role":"Offensive Protect","movepool":["Energy Ball","Fiery Dance","Heat Wave","Protect","Sludge Wave"],"abilities":["Quark Drive"],"teraTypes":["Fire","Grass"]},{"role":"Doubles Bulky Attacker","movepool":["Acid Spray","Energy Ball","Heat Wave","Protect"],"abilities":["Quark Drive"],"teraTypes":["Poison"]}]},"ironhands":{"level":77,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Drain Punch","Fake Out","Ice Punch","Volt Switch","Wild Charge"],"abilities":["Quark Drive"],"teraTypes":["Electric","Fire"]},{"role":"Bulky Protect","movepool":["Drain Punch","Protect","Swords Dance","Thunder Punch"],"abilities":["Quark Drive"],"teraTypes":["Fire"]}]},"ironjugulis":{"level":79,"sets":[{"role":"Doubles Fast Attacker","movepool":["Dark Pulse","Earth Power","Hurricane","Protect","Tailwind","Taunt"],"abilities":["Quark Drive"],"teraTypes":["Flying","Ground","Steel"]}]},"ironthorns":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Electroweb","High Horsepower","Protect","Rock Slide","Stealth Rock","Thunder Punch","Thunder Wave","Volt Switch"],"abilities":["Quark Drive"],"teraTypes":["Flying","Grass"]},{"role":"Doubles Setup Sweeper","movepool":["Dragon Dance","High Horsepower","Ice Punch","Protect","Rock Slide","Wild Charge"],"abilities":["Quark Drive"],"teraTypes":["Grass","Rock"]}]},"ironbundle":{"level":78,"sets":[{"role":"Doubles Fast Attacker","movepool":["Encore","Freeze-Dry","Hydro Pump","Icy Wind","Protect"],"abilities":["Quark Drive"],"teraTypes":["Dragon","Water"]}]},"ironvaliant":{"level":79,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Dazzling Gleam","Encore","Knock Off","Moonblast","Protect"],"abilities":["Quark Drive"],"teraTypes":["Dark","Fairy","Fighting"]}]},"baxcalibur":{"level":78,"sets":[{"role":"Choice Item user","movepool":["Glaive Rush","High Horsepower","Ice Shard","Icicle Crash"],"abilities":["Thermal Exchange"],"teraTypes":["Dragon","Ground"]},{"role":"Doubles Setup Sweeper","movepool":["Icicle Spear","Protect","Scale Shot","Swords Dance"],"abilities":["Thermal Exchange"],"teraTypes":["Dragon","Steel"]}]},"gholdengo":{"level":78,"sets":[{"role":"Choice Item user","movepool":["Dazzling Gleam","Focus Blast","Make It Rain","Shadow Ball","Thunderbolt","Trick"],"abilities":["Good as Gold"],"teraTypes":["Fairy","Steel"]},{"role":"Doubles Bulky Setup","movepool":["Make It Rain","Nasty Plot","Protect","Shadow Ball"],"abilities":["Good as Gold"],"teraTypes":["Steel","Water"]},{"role":"Offensive Protect","movepool":["Dazzling Gleam","Focus Blast","Make It Rain","Protect","Shadow Ball"],"abilities":["Good as Gold"],"teraTypes":["Fairy","Steel"]}]},"tinglu":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Protect","Ruination","Spikes","Stealth Rock","Stomping Tantrum","Throat Chop"],"abilities":["Vessel of Ruin"],"teraTypes":["Fairy","Water"]}]},"chienpao":{"level":75,"sets":[{"role":"Offensive Protect","movepool":["Icicle Crash","Lash Out","Protect","Sucker Punch","Throat Chop"],"abilities":["Sword of Ruin"],"teraTypes":["Dark","Ghost"]},{"role":"Doubles Wallbreaker","movepool":["Icicle Crash","Protect","Sacred Sword","Sucker Punch"],"abilities":["Sword of Ruin"],"teraTypes":["Fighting","Ghost"]}]},"wochien":{"level":85,"sets":[{"role":"Bulky Protect","movepool":["Knock Off","Leech Seed","Pollen Puff","Protect","Ruination"],"abilities":["Tablets of Ruin"],"teraTypes":["Poison"]}]},"chiyu":{"level":75,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dark Pulse","Heat Wave","Nasty Plot","Protect"],"abilities":["Beads of Ruin"],"teraTypes":["Dark","Fire","Water"]},{"role":"Choice Item user","movepool":["Dark Pulse","Heat Wave","Overheat","Snarl"],"abilities":["Beads of Ruin"],"teraTypes":["Fire","Water"]}]},"koraidon":{"level":66,"sets":[{"role":"Choice Item user","movepool":["Collision Course","Dragon Claw","Flare Blitz","U-turn"],"abilities":["Orichalcum Pulse"],"teraTypes":["Fire"]}]},"miraidon":{"level":65,"sets":[{"role":"Offensive Protect","movepool":["Draco Meteor","Dragon Pulse","Electro Drift","Overheat","Protect","Volt Switch"],"abilities":["Hadron Engine"],"teraTypes":["Electric"]},{"role":"Choice Item user","movepool":["Draco Meteor","Electro Drift","Overheat","Volt Switch"],"abilities":["Hadron Engine"],"teraTypes":["Electric"]}]},"walkingwake":{"level":77,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Flamethrower","Flip Turn","Hydro Pump","Protect"],"abilities":["Protosynthesis"],"teraTypes":["Fire"]}]},"ironleaves":{"level":81,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Leaf Blade","Protect","Swords Dance"],"abilities":["Quark Drive"],"teraTypes":["Fighting","Fire","Poison"]},{"role":"Offensive Protect","movepool":["Close Combat","Leaf Blade","Protect","Psyblade"],"abilities":["Quark Drive"],"teraTypes":["Fighting","Fire","Psychic"]},{"role":"Doubles Wallbreaker","movepool":["Close Combat","Leaf Blade","Psyblade","Wild Charge"],"abilities":["Quark Drive"],"teraTypes":["Fighting","Fire","Psychic"]}]},"dipplin":{"level":91,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Dragon Pulse","Pollen Puff","Recover","Syrup Bomb"],"abilities":["Sticky Hold"],"teraTypes":["Steel"]}]},"sinistcha":{"level":81,"sets":[{"role":"Doubles Support","movepool":["Matcha Gotcha","Rage Powder","Shadow Ball","Trick Room"],"abilities":["Hospitality"],"teraTypes":["Grass","Water"]},{"role":"Bulky Protect","movepool":["Calm Mind","Matcha Gotcha","Protect","Shadow Ball"],"abilities":["Hospitality"],"teraTypes":["Grass","Water"]}]},"okidogi":{"level":78,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Bulk Up","Drain Punch","Gunk Shot","Knock Off","Snarl"],"abilities":["Toxic Chain"],"teraTypes":["Dark"]}]},"munkidori":{"level":80,"sets":[{"role":"Doubles Fast Attacker","movepool":["Focus Blast","Protect","Psyshock","Sludge Bomb","U-turn"],"abilities":["Toxic Chain"],"teraTypes":["Fighting","Poison"]},{"role":"Doubles Support","movepool":["Fake Out","Focus Blast","Psyshock","Sludge Bomb","U-turn"],"abilities":["Toxic Chain"],"teraTypes":["Fighting","Poison"]}]},"fezandipiti":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Gunk Shot","Icy Wind","Play Rough","Roost"],"abilities":["Toxic Chain"],"teraTypes":["Dark","Steel","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Gunk Shot","Icy Wind","Play Rough","U-turn"],"abilities":["Toxic Chain"],"teraTypes":["Dark","Steel","Water"]}]},"ogerpon":{"level":78,"sets":[{"role":"Doubles Wallbreaker","movepool":["Ivy Cudgel","Knock Off","Spiky Shield","Superpower","U-turn"],"abilities":["Defiant"],"teraTypes":["Grass"]},{"role":"Doubles Support","movepool":["Follow Me","Horn Leech","Knock Off","Spiky Shield"],"abilities":["Defiant"],"teraTypes":["Grass"]}]},"ogerponwellspring":{"level":76,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Horn Leech","Ivy Cudgel","Spiky Shield"],"abilities":["Water Absorb"],"teraTypes":["Water"]},{"role":"Doubles Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Power Whip","Spiky Shield","Swords Dance"],"abilities":["Water Absorb"],"teraTypes":["Water"]}]},"ogerponhearthflame":{"level":74,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Horn Leech","Ivy Cudgel","Spiky Shield"],"abilities":["Mold Breaker"],"teraTypes":["Fire"]},{"role":"Doubles Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Power Whip","Spiky Shield","Swords Dance"],"abilities":["Mold Breaker"],"teraTypes":["Fire"]}]},"ogerponcornerstone":{"level":75,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Horn Leech","Ivy Cudgel","Spiky Shield"],"abilities":["Sturdy"],"teraTypes":["Rock"]},{"role":"Doubles Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Power Whip","Spiky Shield","Swords Dance"],"abilities":["Sturdy"],"teraTypes":["Rock"]}]},"archaludon":{"level":77,"sets":[{"role":"Offensive Protect","movepool":["Dragon Pulse","Electro Shot","Flash Cannon","Protect"],"abilities":["Stamina"],"teraTypes":["Fairy","Flying"]},{"role":"Doubles Bulky Attacker","movepool":["Body Press","Draco Meteor","Dragon Pulse","Flash Cannon","Snarl"],"abilities":["Stamina"],"teraTypes":["Fairy","Fighting","Flying"]},{"role":"Doubles Wallbreaker","movepool":["Aura Sphere","Draco Meteor","Flash Cannon","Thunderbolt"],"abilities":["Stamina"],"teraTypes":["Dragon","Electric","Fairy","Fighting","Flying"]}]},"hydrapple":{"level":85,"sets":[{"role":"Bulky Protect","movepool":["Fickle Beam","Giga Drain","Leaf Storm","Pollen Puff","Protect"],"abilities":["Regenerator"],"teraTypes":["Fire","Steel"]},{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Earth Power","Giga Drain","Leaf Storm"],"abilities":["Regenerator"],"teraTypes":["Fire","Grass","Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Earth Power","Fickle Beam","Giga Drain","Leaf Storm","Pollen Puff"],"abilities":["Regenerator"],"teraTypes":["Steel"]}]},"gougingfire":{"level":75,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Burning Bulwark","Dragon Claw","Dragon Dance","Heat Crash"],"abilities":["Protosynthesis"],"teraTypes":["Fire"]}]},"ragingbolt":{"level":77,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Protect","Thunderbolt","Thunderclap"],"abilities":["Protosynthesis"],"teraTypes":["Electric","Fairy","Grass"]},{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Electroweb","Snarl","Thunderbolt","Thunderclap"],"abilities":["Protosynthesis"],"teraTypes":["Electric","Fairy","Grass"]},{"role":"Bulky Protect","movepool":["Calm Mind","Dragon Pulse","Protect","Thunderclap"],"abilities":["Protosynthesis"],"teraTypes":["Electric","Fairy","Grass"]}]},"ironboulder":{"level":77,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Mighty Cleave","Protect","Swords Dance"],"abilities":["Quark Drive"],"teraTypes":["Fighting"]},{"role":"Offensive Protect","movepool":["Close Combat","Mighty Cleave","Protect","Zen Headbutt"],"abilities":["Quark Drive"],"teraTypes":["Fighting"]}]},"ironcrown":{"level":78,"sets":[{"role":"Offensive Protect","movepool":["Focus Blast","Protect","Psychic","Psyshock","Tachyon Cutter"],"abilities":["Quark Drive"],"teraTypes":["Fighting","Water"]},{"role":"Doubles Wallbreaker","movepool":["Focus Blast","Psychic","Psyshock","Tachyon Cutter","Volt Switch"],"abilities":["Quark Drive"],"teraTypes":["Fighting","Water"]},{"role":"Doubles Bulky Setup","movepool":["Agility","Focus Blast","Protect","Psychic","Psyshock","Tachyon Cutter"],"abilities":["Quark Drive"],"teraTypes":["Fighting","Psychic","Steel"]}]},"terapagos":{"level":73,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Earth Power","Protect","Tera Starstorm"],"abilities":["Tera Shift"],"teraTypes":["Stellar"]},{"role":"Doubles Wallbreaker","movepool":["Dark Pulse","Earth Power","Tera Starstorm","Tri Attack"],"abilities":["Tera Shift"],"teraTypes":["Stellar"]},{"role":"Doubles Setup Sweeper","movepool":["Dark Pulse","Meteor Beam","Protect","Tera Starstorm"],"abilities":["Tera Shift"],"teraTypes":["Stellar"]}]},"pecharunt":{"level":78,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Malignant Chain","Nasty Plot","Protect","Recover","Shadow Ball"],"abilities":["Poison Puppeteer"],"teraTypes":["Dark"]},{"role":"Doubles Bulky Attacker","movepool":["Malignant Chain","Parting Shot","Poison Gas","Protect","Shadow Ball"],"abilities":["Poison Puppeteer"],"teraTypes":["Dark"]}]}} as any;
/* eslint-enable */

export interface TeamData {
	typeCount: {[k: string]: number};
	typeComboCount: {[k: string]: number};
	baseFormes: {[k: string]: number};
	megaCount?: number;
	zCount?: number;
	wantsTeraCount?: number;
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
interface BSSFactorySet {
	species: string;
	weight: number;
	item: string[];
	ability: string;
	nature: string;
	moves: string[][];
	teraType: string[];
	gender?: string;
	wantsTera?: boolean;
	evs: number[];
	ivs?: number[];
}
export class MoveCounter extends Utils.Multiset<string> {
	damagingMoves: Set<Move>;

	constructor() {
		super();
		this.damagingMoves = new Set();
	}
}

type MoveEnforcementChecker = (
	movePool: string[], moves: Set<string>, abilities: string[], types: string[],
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
	'calmmind', 'chargebeam', 'geomancy', 'nastyplot', 'quiverdance', 'tailglow', 'takeheart', 'torchsong',
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
	'acidarmor', 'agility', 'autotomize', 'bellydrum', 'bulkup', 'calmmind', 'clangoroussoul', 'coil', 'cosmicpower', 'curse', 'dragondance',
	'flamecharge', 'growth', 'honeclaws', 'howl', 'irondefense', 'meditate', 'nastyplot', 'noretreat', 'poweruppunch', 'quiverdance',
	'rockpolish', 'shellsmash', 'shiftgear', 'swordsdance', 'tailglow', 'takeheart', 'tidyup', 'trailblaze', 'workup', 'victorydance',
];
const SPEED_CONTROL = [
	'electroweb', 'glare', 'icywind', 'lowsweep', 'quash', 'stringshot', 'tailwind', 'thunderwave', 'trickroom',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'accelerock', 'aquajet', 'bounce', 'breakingswipe', 'bulletpunch', 'chatter', 'chloroblast', 'circlethrow', 'clearsmog', 'covet',
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
	'Basculegion', 'Houndstone', 'Iron Bundle', 'Roaring Moon', 'Zacian', 'Zamazenta',
];

const DEFENSIVE_TERA_BLAST_USERS = [
	'alcremie', 'bellossom', 'comfey', 'fezandipiti', 'florges', 'raikou',
];

function sereneGraceBenefits(move: Move) {
	return move.secondary?.chance && move.secondary.chance > 20 && move.secondary.chance < 100;
}

export class RandomTeams {
	readonly dex: ModdedDex;
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

	/** Used by .getPools() */
	private poolsCacheKey: [string | undefined, number | undefined, RuleTable | undefined, boolean] | undefined;
	private cachedPool: number[] | undefined;
	private cachedSpeciesPool: Species[] | undefined;
	protected cachedStatusMoves: ID[];

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
				(!counter.get('Bug') && (types.includes('Electric') || types.includes('Psychic')))
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
					types.includes('Electric') || abilities.includes('Seed Sower')
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
				if ((isDoubles || species.id === 'bruxish') && movePool.includes('psychicfangs')) return true;
				if (species.id === 'hoopaunbound' && movePool.includes('psychic')) return true;
				if (['Dark', 'Steel', 'Water'].some(m => types.includes(m))) return false;
				return !counter.get('Psychic');
			},
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock') && species.baseStats.atk >= 80,
			Steel: (movePool, moves, abilities, types, counter, species, teamDetails, isLead, isDoubles) => (
				!counter.get('Steel') &&
				(isDoubles || species.baseStats.atk >= 90 || movePool.includes('gigatonhammer') || movePool.includes('makeitrain'))
			),
			Water: (movePool, moves, abilities, types, counter) => (!counter.get('Water') && !types.includes('Ground')),
		};
		this.poolsCacheKey = undefined;
		this.cachedPool = undefined;
		this.cachedSpeciesPool = undefined;
		this.cachedStatusMoves = this.dex.moves.all().filter(move => move.category === 'Status').map(move => move.id);
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
		if (this.format.ruleTable?.has('+pokemontag:cap')) return false;
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
		abilities: string[],
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
				if (move.flags['punch']) counter.add('ironfist');
				if (move.flags['sound']) counter.add('sound');
				if (move.priority > 0 || (moveid === 'grassyglide' && abilities.includes('Grassy Surge'))) {
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
		abilities: string[],
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
		const statusMoves = this.cachedStatusMoves;

		// Team-based move culls
		if (teamDetails.screens) {
			if (movePool.includes('auroraveil')) this.fastPop(movePool, movePool.indexOf('auroraveil'));
			if (movePool.length >= this.maxMoveCount + 2) {
				if (movePool.includes('reflect')) this.fastPop(movePool, movePool.indexOf('reflect'));
				if (movePool.includes('lightscreen')) this.fastPop(movePool, movePool.indexOf('lightscreen'));
			}
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
		if (teamDetails.statusCure) {
			if (movePool.includes('healbell')) this.fastPop(movePool, movePool.indexOf('healbell'));
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
			['yawn', 'roar'],

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
			['thunderbolt', 'discharge'],
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
			// Amoonguss, though this can work well as a general rule later
			['toxic', 'clearsmog'],
			// Chansey and Blissey
			['healbell', 'stealthrock'],
			// Azelf and Zoroarks
			['trick', 'uturn'],
			// Araquanid
			['mirrorcoat', 'hydropump'],
		];

		for (const pair of incompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

		if (!types.includes('Ice')) this.incompatibleMoves(moves, movePool, 'icebeam', 'icywind');

		if (!isDoubles) this.incompatibleMoves(moves, movePool, 'taunt', 'encore');

		if (!types.includes('Dark') && teraType !== 'Dark') this.incompatibleMoves(moves, movePool, 'knockoff', 'suckerpunch');

		if (!abilities.includes('Prankster')) this.incompatibleMoves(moves, movePool, 'thunderwave', 'yawn');

		// This space reserved for assorted hardcodes that otherwise make little sense out of context
		if (species.id === 'barraskewda') {
			this.incompatibleMoves(moves, movePool, ['psychicfangs', 'throatchop'], ['poisonjab', 'throatchop']);
		}
		if (species.id === 'cyclizar') this.incompatibleMoves(moves, movePool, 'taunt', 'knockoff');
		if (species.id === 'mesprit') this.incompatibleMoves(moves, movePool, 'healingwish', 'uturn');
		if (species.id === 'camerupt') this.incompatibleMoves(moves, movePool, 'roar', 'willowisp');
		if (species.id === 'coalossal') this.incompatibleMoves(moves, movePool, 'flamethrower', 'overheat');
		if (!isDoubles && species.id === 'jumpluff') this.incompatibleMoves(moves, movePool, 'encore', 'strengthsap');
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
		abilities: string[],
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
	getMoveType(move: Move, species: Species, abilities: string[], teraType: string): string {
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
			if (abilities.includes('Aerilate')) return 'Flying';
			if (abilities.includes('Galvanize')) return 'Electric';
			if (abilities.includes('Pixilate')) return 'Fairy';
			if (abilities.includes('Refrigerate')) return 'Ice';
		}
		return moveType;
	}

	// Generate random moveset for a given species, role, tera type.
	randomMoveset(
		types: string[],
		abilities: string[],
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
		if (movePool.includes('facade') && abilities.includes('Guts')) {
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

		// Enforce Aurora Veil if the team doesn't already have screens
		if (!teamDetails.screens && movePool.includes('auroraveil')) {
			counter = this.addMove('auroraveil', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}

		// Enforce Knock Off on pure Normal- and Fighting-types in singles
		if (!isDoubles && types.length === 1 && (types.includes('Normal') || types.includes('Fighting'))) {
			if (movePool.includes('knockoff')) {
				counter = this.addMove('knockoff', moves, types, abilities, teamDetails, species, isLead, isDoubles,
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
			const doublesEnforcedMoves = ['mortalspin', 'spore'];
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
			if (movePool.includes('tailwind') && (abilities.includes('Prankster') || abilities.includes('Gale Wings'))) {
				counter = this.addMove('tailwind', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
			// Enforce Thunder Wave on Prankster users as well
			if (movePool.includes('thunderwave') && abilities.includes('Prankster')) {
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
					types.includes(moveType) && (move.priority > 0 || (moveid === 'grassyglide' && abilities.includes('Grassy Surge'))) &&
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
				const currentAttackType = counter.damagingMoves.values().next().value!.type;
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
		abilities: string[],
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	): boolean {
		switch (ability) {
		// Abilities which are primarily useful for certain moves or with team support
		case 'Chlorophyll': case 'Solar Power':
			return !teamDetails.sun;
		case 'Defiant':
			return (species.id === 'thundurus' && !!counter.get('Status'));
		case 'Hydration': case 'Swift Swim':
			return !teamDetails.rain;
		case 'Iron Fist': case 'Skill Link':
			return !counter.get(toID(ability));
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Prankster':
			return !counter.get('Status');
		case 'Sand Force': case 'Sand Rush':
			return !teamDetails.sand;
		case 'Slush Rush':
			return !teamDetails.snow;
		case 'Swarm':
			return !counter.get('Bug');
		case 'Torrent':
			return (!counter.get('Water') && !moves.has('flipturn'));
		}

		return false;
	}


	getAbility(
		types: string[],
		moves: Set<string>,
		abilities: string[],
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		teraType: string,
		role: RandomTeamsTypes.Role,
	): string {
		// ffa abilities that differ from doubles
		if (this.format.gameType === 'freeforall') {
			if (species.id === 'bellossom') return 'Chlorophyll';
			if (species.id === 'sinistcha') return 'Heatproof';
			if (species.id === 'oranguru') return 'Inner Focus';
			if (species.id === 'duraludon') return 'Light Metal';
			if (species.id === 'clefairy') return 'Magic Guard';
			if (species.id === 'blissey') return 'Natural Cure';
			if (species.id === 'barraskewda') return 'Swift Swim';
		}

		if (abilities.length <= 1) return abilities[0];

		// Hard-code abilities here
		if (species.id === 'drifblim') return moves.has('defog') ? 'Aftermath' : 'Unburden';
		if (abilities.includes('Flash Fire') && this.dex.getEffectiveness('Fire', teraType) >= 1) return 'Flash Fire';
		if (species.id === 'hitmonchan' && counter.get('ironfist')) return 'Iron Fist';
		if ((species.id === 'thundurus' || species.id === 'tornadus') && !counter.get('Physical')) return 'Prankster';
		if (species.id === 'swampert' && (counter.get('Water') || moves.has('flipturn'))) return 'Torrent';
		if (species.id === 'toucannon' && counter.get('skilllink')) return 'Skill Link';
		if (abilities.includes('Slush Rush') && moves.has('snowscape')) return 'Slush Rush';
		if (species.id === 'golduck' && teamDetails.rain) return 'Swift Swim';

		const abilityAllowed: string[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilities) {
			if (!this.shouldCullAbility(
				ability, types, moves, abilities, counter, teamDetails, species, isLead, isDoubles, teraType, role
			)) {
				abilityAllowed.push(ability);
			}
		}

		// Pick a random allowed ability
		if (abilityAllowed.length >= 1) return this.sample(abilityAllowed);

		// If all abilities are rejected, prioritize weather abilities over non-weather abilities
		if (!abilityAllowed.length) {
			const weatherAbilities = abilities.filter(
				a => ['Chlorophyll', 'Hydration', 'Sand Force', 'Sand Rush', 'Slush Rush', 'Solar Power', 'Swift Swim'].includes(a)
			);
			if (weatherAbilities.length) return this.sample(weatherAbilities);
		}

		// Pick a random ability
		return this.sample(abilities);
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
		if (types.includes('Normal') && moves.has('doubleedge') && moves.has('fakeout')) return 'Silk Scarf';
		if (
			species.id === 'froslass' || moves.has('populationbomb') ||
			(ability === 'Hustle' && counter.get('setup') && !isDoubles && this.randomChance(1, 2))
		) return 'Wide Lens';
		if (species.id === 'smeargle' && !isDoubles) return 'Focus Sash';
		if (moves.has('clangoroussoul') || (species.id === 'toxtricity' && moves.has('shiftgear'))) return 'Throat Spray';
		if (
			(species.baseSpecies === 'Magearna' && role === 'Tera Blast user') ||
			species.id === 'necrozmaduskmane' || (species.id === 'calyrexice' && isDoubles)
		) return 'Weakness Policy';
		if (['dragonenergy', 'lastrespects', 'waterspout'].some(m => moves.has(m))) return 'Choice Scarf';
		if (
			!isDoubles && (ability === 'Imposter' || (species.id === 'magnezone' && role === 'Fast Attacker'))
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
		if (ability === 'Poison Heal' || ability === 'Quick Feet') return 'Toxic Orb';
		if (species.nfe) return 'Eviolite';
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

		if (species.id === 'ursalunabloodmoon' && moves.has('protect')) return 'Silk Scarf';
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
			moves.has('coil') || species.id === 'eternatus' || species.id === 'regigigas'
		) return 'Leftovers';
		if (species.id === 'sylveon') return 'Pixie Plate';
		if (ability === 'Intimidate' && this.dex.getEffectiveness('Rock', species) >= 1) return 'Heavy-Duty Boots';
		if (
			(offensiveRole || (role === 'Tera Blast user' && (species.baseStats.spe >= 80 || moves.has('trickroom')))) &&
			(!moves.has('fakeout') || species.id === 'ambipom') && !moves.has('incinerate') &&
			(!moves.has('uturn') || types.includes('Bug') || ability === 'Libero') &&
			((!moves.has('icywind') && !moves.has('electroweb')) || species.id === 'ironbundle')
		) {
			return (
				(ability === 'Quark Drive' || ability === 'Protosynthesis') && !isLead && species.id !== 'ironvaliant' &&
				['dracometeor', 'firstimpression', 'uturn', 'voltswitch'].every(m => !moves.has(m))
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
		if (
			moves.has('stickyweb') && isLead &&
			(species.baseStats.hp + species.baseStats.def + species.baseStats.spd) < 235
		) return 'Focus Sash';
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
			ability === 'Rough Skin' || (
				ability === 'Regenerator' && (role === 'Bulky Support' || role === 'Bulky Attacker') &&
				(species.baseStats.hp + species.baseStats.def) >= 180 && this.randomChance(1, 2)
			) || (
				ability !== 'Regenerator' && !counter.get('setup') && counter.get('recovery') &&
				this.dex.getEffectiveness('Fighting', species) < 1 &&
				(species.baseStats.hp + species.baseStats.def) > 200 && this.randomChance(1, 2)
			)
		) return 'Rocky Helmet';
		if (moves.has('outrage') && counter.get('setup')) return 'Lum Berry';
		if (moves.has('protect') && ability !== 'Speed Boost') return 'Leftovers';
		if (
			role === 'Fast Support' && isLead && !counter.get('recovery') && !counter.get('recoil') &&
			(counter.get('hazards') || counter.get('setup')) &&
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
		const sets = this[`random${isDoubles ? 'Doubles' : ''}Sets`][species.id]["sets"];
		const possibleSets: RandomTeamsTypes.RandomSetData[] = [];

		const ruleTable = this.dex.formats.getRuleTable(this.format);

		for (const set of sets) {
			// Prevent Fast Bulky Setup on lead Paradox Pokemon, since it generates Booster Energy.
			const abilities = set.abilities!;
			if (
				isLead && (abilities.includes('Protosynthesis') || abilities.includes('Quark Drive')) &&
				set.role === 'Fast Bulky Setup'
			) continue;
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
		const teraTypes = set.teraTypes!;
		let teraType = this.sampleIfArray(teraTypes);

		let ability = '';
		let item = undefined;

		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};

		const types = species.types;
		const abilities = set.abilities!;

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
		if (['axekick', 'highjumpkick', 'jumpkick', 'supercellslam'].some(m => moves.has(m))) srWeakness = 2;
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if ((moves.has('substitute') && ['Sitrus Berry', 'Salac Berry'].includes(item)) || species.id === 'minior') {
				// Two Substitutes should activate Sitrus Berry. Two switch-ins to Stealth Rock should activate Shields Down on Minior.
				if (hp % 4 === 0) break;
			} else if (
				(moves.has('bellydrum') || moves.has('filletaway') || moves.has('shedtail')) &&
				(item === 'Sitrus Berry' || ability === 'Gluttony')
			) {
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
				if (!isDoubles && item === 'Sitrus Berry' && hp % (4 / srWeakness) === 0) break;
			}
			evs.hp -= 4;
		}

		// Minimize confusion damage
		const noAttackStatMoves = [...moves].every(m => {
			const move = this.dex.moves.get(m);
			if (move.damageCallback || move.damage) return true;
			if (move.id === 'shellsidearm') return false;
			// Magearna and doubles Dragonite, though these can work well as a general rule
			if (
				move.id === 'terablast' && (species.id === 'porygon2' || species.id === 'thundurus' ||
				moves.has('shiftgear') || species.baseStats.atk > species.baseStats.spa)
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

				// Count Dry Skin/Fluffy as Fire weaknesses
				if (
					this.dex.getEffectiveness('Fire', species) === 0 &&
					Object.values(species.abilities).filter(a => ['Dry Skin', 'Fluffy'].includes(a)).length
				) {
					if (!typeWeaknesses['Fire']) typeWeaknesses['Fire'] = 0;
					if (typeWeaknesses['Fire'] >= 3 * limitFactor) continue;
				}

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
			// Count Dry Skin/Fluffy as Fire weaknesses
			if (['Dry Skin', 'Fluffy'].includes(set.ability) && this.dex.getEffectiveness('Fire', species) === 0) {
				typeWeaknesses['Fire']++;
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
			if (set.moves.includes('healbell')) teamDetails.statusCure = 1;
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
					set.teraType = this.sample(this.dex.types.names());
				}
			}
			team.push(set);
		}

		return team;
	}

	private getPools(requiredType?: string, minSourceGen?: number, ruleTable?: RuleTable, requireMoves = false) {
		// Memoize pool and speciesPool because, at least during tests, they are constructed with the same parameters
		// hundreds of times and are expensive to compute.
		const isNotCustom = !ruleTable;
		let pool: number[] = [];
		let speciesPool: Species[] = [];
		const ck = this.poolsCacheKey;
		if (ck && this.cachedPool && this.cachedSpeciesPool &&
			ck[0] === requiredType && ck[1] === minSourceGen && ck[2] === ruleTable && ck[3] === requireMoves) {
			speciesPool = this.cachedSpeciesPool.slice();
			pool = this.cachedPool.slice();
		} else if (isNotCustom) {
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
			this.poolsCacheKey = [requiredType, minSourceGen, ruleTable, requireMoves];
			this.cachedPool = pool.slice();
			this.cachedSpeciesPool = speciesPool.slice();
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
							const tagid = ruleid.slice(12) as ID;
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
			this.poolsCacheKey = [requiredType, minSourceGen, ruleTable, requireMoves];
			this.cachedPool = pool.slice();
			this.cachedSpeciesPool = speciesPool.slice();
		}
		return {pool, speciesPool};
	}

	randomNPokemon(n: number, requiredType?: string, minSourceGen?: number, ruleTable?: RuleTable, requireMoves = false) {
		// Picks `n` random pokemon--no repeats, even among formes
		// Also need to either normalize for formes or select formes at random
		// Unreleased are okay but no CAP
		if (requiredType && !this.dex.types.get(requiredType).exists) {
			throw new Error(`"${requiredType}" is not a valid type.`);
		}

		const {pool, speciesPool} = this.getPools(requiredType, minSourceGen, ruleTable, requireMoves);
		const isNotCustom = !ruleTable;

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
					set.teraType = this.sample(this.dex.types.names());
				}
			}
			team.push(set);
		}

		return team;
	}

	randomBSSFactorySets: AnyObject = {};

	randomBSSFactorySet(
		species: Species, teamData: RandomTeamsTypes.FactoryTeamDetails
	): RandomTeamsTypes.RandomFactorySet | null {
		const id = toID(species.name);
		const setList = this.randomBSSFactorySets[id].sets;

		const movesMax: {[k: string]: number} = {
			batonpass: 1,
			stealthrock: 1,
			toxicspikes: 1,
			trickroom: 1,
			auroraveil: 1,
		};
		const weatherAbilities = ['drizzle', 'drought', 'snowwarning', 'sandstream'];
		const terrainAbilities: {[k: string]: string} = {
			electricsurge: "electric",
			psychicsurge: "psychic",
			grassysurge: "grassy",
			seedsower: "grassy",
			mistysurge: "misty",
		};
		const terrainItemsRequire: {[k: string]: string} = {
			electricseed: "electric",
			psychicseed: "psychic",
			grassyseed: "grassy",
			mistyseed: "misty",
		};

		const maxWantsTera = 2;

		// Build a pool of eligible sets, given the team partners
		// Also keep track of sets with moves the team requires
		const effectivePool: {
			set: BSSFactorySet, moveVariants?: number[], itemVariants?: number, abilityVariants?: number,
		}[] = [];

		for (const curSet of setList) {
			let reject = false;

			// limit to 2 dedicated tera users per team
			if (curSet.wantsTera && teamData.wantsTeraCount && teamData.wantsTeraCount >= maxWantsTera) {
				continue;
			}

			// reject 2+ weather setters
			if (teamData.weather && weatherAbilities.includes(curSet.ability)) {
				continue;
			}

			if (terrainAbilities[curSet.ability]) {
				if (!teamData.terrain) teamData.terrain = [];
				teamData.terrain.push(terrainAbilities[curSet.ability]);
			}

			for (const item of curSet.item) {
				if (terrainItemsRequire[item] && !teamData.terrain?.includes(terrainItemsRequire[item])) {
					reject = true; // reject any sets with a seed item possible and no terrain setter to activate it
					break;
				}
			}

			const curSetMoveVariants = [];
			for (const move of curSet.moves) {
				const variantIndex = this.random(move.length);
				const moveId = toID(move[variantIndex]);
				if (movesMax[moveId] && teamData.has[moveId] >= movesMax[moveId]) {
					reject = true;
					break;
				}
				curSetMoveVariants.push(variantIndex);
			}
			if (reject) continue;
			const set = {set: curSet, moveVariants: curSetMoveVariants};
			effectivePool.push(set);
		}

		if (!effectivePool.length) {
			if (!teamData.forceResult) return null;
			for (const curSet of setList) {
				effectivePool.push({set: curSet});
			}
		}

		// Sets have individual weight, choose one with weighted random selection

		let setData = this.sample(effectivePool); // Init with unweighted random set as fallback

		const total = effectivePool.reduce((a, b) => a + b.set.weight, 0);
		const setRand = this.random(total);

		let cur = 0;
		for (const set of effectivePool) {
			cur += set.set.weight;
			if (cur > setRand) {
				setData = set; // Bingo!
				break;
			}
		}

		const moves = [];
		for (const [i, moveSlot] of setData.set.moves.entries()) {
			moves.push(setData.moveVariants ? moveSlot[setData.moveVariants[i]] : this.sample(moveSlot));
		}

		return {
			name: setData.set.species || species.baseSpecies,
			species: setData.set.species,
			teraType: (this.sampleIfArray(setData.set.teraType)),
			gender:	setData.set.gender || species.gender || (this.randomChance(1, 2) ? "M" : "F"),
			item: this.sampleIfArray(setData.set.item) || "",
			ability: this.sampleIfArray(setData.set.ability),
			shiny: this.randomChance(1, 1024),
			level: 50,
			happiness: 255,
			evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, ...setData.set.evs},
			ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...setData.set.ivs},
			nature: setData.set.nature || "Serious",
			moves,
			wantsTera: setData.set.wantsTera,
		};
	}


	randomBSSFactoryTeam(side: PlayerOptions, depth = 0): RandomTeamsTypes.RandomFactorySet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const forceResult = depth >= 4;

		const pokemon = [];

		const pokemonPool = Object.keys(this.randomBSSFactorySets);

		const teamData: TeamData = {
			typeCount: {},
			typeComboCount: {},
			baseFormes: {},
			has: {},
			wantsTeraCount: 0,
			forceResult: forceResult,
			weaknesses: {},
			resistances: {},
		};
		const weatherAbilitiesSet: {[k: string]: string} = {
			drizzle: "raindance",
			drought: "sunnyday",
			snowwarning: "hail",
			sandstream: "sandstorm",
		};
		const resistanceAbilities: {[k: string]: string[]} = {
			waterabsorb: ["Water"],
			flashfire: ["Fire"],
			lightningrod: ["Electric"],
			voltabsorb: ["Electric"],
			thickfat: ["Ice", "Fire"],
			levitate: ["Ground"],
		};
		const limitFactor = Math.ceil(this.maxTeamSize / 6);
		/**
		 * Weighted random shuffle
		 * Uses the fact that for two uniform variables x1 and x2, x1^(1/w1) is larger than x2^(1/w2)
		 * with probability equal to w1/(w1+w2), which is what we want. See e.g. here https://arxiv.org/pdf/1012.0256.pdf,
		 * original paper is behind a paywall.
		 */
		const shuffledSpecies = [];
		for (const speciesName of pokemonPool) {
			const sortObject = {
				speciesName,
				score: Math.pow(this.prng.next(), 1 / this.randomBSSFactorySets[speciesName].weight),
			};
			shuffledSpecies.push(sortObject);
		}
		shuffledSpecies.sort((a, b) => a.score - b.score);

		while (shuffledSpecies.length && pokemon.length < this.maxTeamSize) {
			// repeated popping from weighted shuffle is equivalent to repeated weighted sampling without replacement
			const species = this.dex.species.get(shuffledSpecies.pop()!.speciesName);
			if (!species.exists) continue;

			if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			// Limit to one of each species (Species Clause)
			if (teamData.baseFormes[species.baseSpecies]) continue;

			// Limit 2 of any type (most of the time)
			const types = species.types;
			let skip = false;
			if (!this.forceMonotype) {
				for (const type of types) {
					if (teamData.typeCount[type] >= 2 * limitFactor && this.randomChance(4, 5)) {
						skip = true;
						break;
					}
				}
			}
			if (skip) continue;

			const set = this.randomBSSFactorySet(species, teamData);
			if (!set) continue;

			// Limit 1 of any type combination
			let typeCombo = types.slice().sort().join();
			if (set.ability === "Drought" || set.ability === "Drizzle") {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}
			if (!this.forceMonotype && teamData.typeComboCount[typeCombo] >= limitFactor) continue;

			const itemData = this.dex.items.get(set.item);
			if (teamData.has[itemData.id]) continue; // Item Clause

			// Okay, the set passes, add it to our team
			pokemon.push(set);

			// Now that our Pokemon has passed all checks, we can update team data:
			for (const type of types) {
				if (type in teamData.typeCount) {
					teamData.typeCount[type]++;
				} else {
					teamData.typeCount[type] = 1;
				}
			}
			if (typeCombo in teamData.typeComboCount) {
				teamData.typeComboCount[typeCombo]++;
			} else {
				teamData.typeComboCount[typeCombo] = 1;
			}

			teamData.baseFormes[species.baseSpecies] = 1;

			teamData.has[itemData.id] = 1;

			if (set.wantsTera) {
				if (!teamData.wantsTeraCount) teamData.wantsTeraCount = 0;
				teamData.wantsTeraCount++;
			}

			const abilityState = this.dex.abilities.get(set.ability);
			if (abilityState.id in weatherAbilitiesSet) {
				teamData.weather = weatherAbilitiesSet[abilityState.id];
			}

			for (const move of set.moves) {
				const moveId = toID(move);
				if (moveId in teamData.has) {
					teamData.has[moveId]++;
				} else {
					teamData.has[moveId] = 1;
				}
			}

			for (const typeName of this.dex.types.names()) {
				// Cover any major weakness (3+) with at least one resistance
				if (teamData.resistances[typeName] >= 1) continue;
				if (resistanceAbilities[abilityState.id]?.includes(typeName) ||	!this.dex.getImmunity(typeName, types)) {
					// Heuristic: assume that Pokémon with these abilities don't have (too) negative typing.
					teamData.resistances[typeName] = (teamData.resistances[typeName] || 0) + 1;
					if (teamData.resistances[typeName] >= 1) teamData.weaknesses[typeName] = 0;
					continue;
				}
				const typeMod = this.dex.getEffectiveness(typeName, types);
				if (typeMod < 0) {
					teamData.resistances[typeName] = (teamData.resistances[typeName] || 0) + 1;
					if (teamData.resistances[typeName] >= 1) teamData.weaknesses[typeName] = 0;
				} else if (typeMod > 0) {
					teamData.weaknesses[typeName] = (teamData.weaknesses[typeName] || 0) + 1;
				}
			}
		}
		if (!teamData.forceResult && pokemon.length < this.maxTeamSize) return this.randomBSSFactoryTeam(side, ++depth);

		// Quality control we cannot afford for monotype
		if (!teamData.forceResult && !this.forceMonotype) {
			for (const type in teamData.weaknesses) {
				if (teamData.weaknesses[type] >= 3 * limitFactor) return this.randomBSSFactoryTeam(side, ++depth);
			}
		}

		return pokemon;
	}
}

export default RandomTeams;
