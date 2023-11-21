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
const randomSetsJSON = {"charizard":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flamethrower","Focus Blast","Hurricane","Will-O-Wisp"],"teraTypes":["Fire","Ground","Water"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Flare Blitz","Outrage","Swords Dance"],"teraTypes":["Dragon","Ground"]}]},"arbok":{"level":89,"sets":[{"role":"Fast Support","movepool":["Earthquake","Glare","Gunk Shot","Knock Off","Sucker Punch","Toxic Spikes"],"teraTypes":["Dark","Ground"]},{"role":"Setup Sweeper","movepool":["Coil","Earthquake","Gunk Shot","Sucker Punch","Trailblaze"],"teraTypes":["Ground"]}]},"pikachu":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["Fake Out","Knock Off","Play Rough","Surf","Volt Switch","Volt Tackle"],"teraTypes":["Water"]}]},"raichu":{"level":88,"sets":[{"role":"Fast Support","movepool":["Encore","Focus Blast","Grass Knot","Nasty Plot","Nuzzle","Surf","Thunderbolt","Volt Switch"],"teraTypes":["Grass","Water"]}]},"raichualola":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Nasty Plot","Psychic","Psyshock","Surf","Thunderbolt","Volt Switch"],"teraTypes":["Fighting","Grass","Water"]}]},"sandslash":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Knock Off","Rapid Spin","Spikes","Stone Edge","Swords Dance"],"teraTypes":["Dragon","Steel","Water"]}]},"sandslashalola":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ice Spinner","Iron Head","Knock Off","Rapid Spin","Spikes"],"teraTypes":["Flying","Water"]},{"role":"Setup Sweeper","movepool":["Earthquake","Ice Shard","Ice Spinner","Knock Off","Rapid Spin","Swords Dance"],"teraTypes":["Ground"]}]},"clefable":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Flamethrower","Knock Off","Moonblast","Moonlight","Stealth Rock","Thunder Wave"],"teraTypes":["Poison","Steel"]},{"role":"Setup Sweeper","movepool":["Calm Mind","Fire Blast","Moonblast","Moonlight"],"teraTypes":["Fire"]}]},"ninetales":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["Fire Blast","Nasty Plot","Psyshock","Solar Beam"],"teraTypes":["Fire","Grass"]}]},"ninetalesalola":{"level":80,"sets":[{"role":"Fast Support","movepool":["Aurora Veil","Blizzard","Encore","Moonblast"],"teraTypes":["Steel","Water"]},{"role":"Fast Bulky Setup","movepool":["Aurora Veil","Blizzard","Moonblast","Nasty Plot"],"teraTypes":["Steel","Water"]},{"role":"Tera Blast user","movepool":["Blizzard","Moonblast","Nasty Plot","Tera Blast"],"teraTypes":["Ground"]}]},"wigglytuff":{"level":96,"sets":[{"role":"Bulky Support","movepool":["Dazzling Gleam","Fire Blast","Light Screen","Protect","Reflect","Stealth Rock","Thunder Wave","Wish"],"teraTypes":["Poison","Steel"]}]},"venomoth":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["Bug Buzz","Quiver Dance","Sleep Powder","Sludge Bomb","Substitute"],"teraTypes":["Bug","Poison","Steel","Water"]}]},"dugtrio":{"level":84,"sets":[{"role":"Fast Support","movepool":["Earthquake","Memento","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fairy","Flying","Ghost","Ground"]}]},"dugtrioalola":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Iron Head","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"teraTypes":["Ground","Steel"]}]},"persian":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["Aerial Ace","Body Slam","Fake Out","Gunk Shot","Knock Off","Switcheroo","U-turn"],"teraTypes":["Flying","Normal","Poison"]}]},"persianalola":{"level":86,"sets":[{"role":"Fast Bulky Setup","movepool":["Dark Pulse","Hypnosis","Nasty Plot","Power Gem","Thunderbolt"],"teraTypes":["Dark","Electric"]}]},"golduck":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["Encore","Grass Knot","Hydro Pump","Ice Beam","Nasty Plot","Psyshock"],"teraTypes":["Water"]}]},"annihilape":{"level":76,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Drain Punch","Rage Fist","Rest"],"teraTypes":["Fairy","Ghost","Steel","Water"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Gunk Shot","Rage Fist","Stone Edge","Taunt"],"teraTypes":["Fairy","Ghost","Steel","Water"]}]},"arcanine":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Morning Sun","Roar","Wild Charge","Will-O-Wisp"],"teraTypes":["Fighting","Normal"]},{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Morning Sun","Wild Charge"],"teraTypes":["Fighting","Normal"]}]},"arcaninehisui":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Head Smash","Morning Sun","Wild Charge"],"teraTypes":["Rock"]}]},"poliwrath":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Liquidation","Rain Dance"],"teraTypes":["Dark","Fighting","Water"]},{"role":"AV Pivot","movepool":["Circle Throw","Close Combat","Knock Off","Liquidation"],"teraTypes":["Dark","Fighting","Steel"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Ice Punch","Knock Off","Liquidation","Poison Jab"],"teraTypes":["Fighting","Steel","Water"]}]},"victreebel":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["Poison Jab","Power Whip","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Grass"]},{"role":"Wallbreaker","movepool":["Knock Off","Power Whip","Sleep Powder","Sludge Bomb","Strength Sap","Sucker Punch"],"teraTypes":["Grass","Steel"]},{"role":"Fast Attacker","movepool":["Power Whip","Sludge Bomb","Sunny Day","Weather Ball"],"teraTypes":["Fire"]}]},"golem":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Earthquake","Explosion","Rock Polish","Stone Edge"],"teraTypes":["Grass","Ground","Steel"]},{"role":"Bulky Attacker","movepool":["Earthquake","Explosion","Stealth Rock","Stone Edge"],"teraTypes":["Grass"]}]},"golemalola":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Stealth Rock","Stone Edge","Volt Switch","Wild Charge"],"teraTypes":["Ground"]},{"role":"Wallbreaker","movepool":["Double-Edge","Earthquake","Explosion","Rock Polish","Stone Edge"],"teraTypes":["Ground"]}]},"slowbro":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Psyshock","Scald","Slack Off","Thunder Wave"],"teraTypes":["Fairy","Water"]},{"role":"AV Pivot","movepool":["Body Press","Fire Blast","Future Sight","Ice Beam","Psychic","Scald"],"teraTypes":["Fairy","Fighting"]}]},"slowbrogalar":{"level":87,"sets":[{"role":"AV Pivot","movepool":["Earthquake","Fire Blast","Foul Play","Psychic","Shell Side Arm","Surf"],"teraTypes":["Dark","Ground","Poison","Water"]},{"role":"Wallbreaker","movepool":["Fire Blast","Psyshock","Sludge Bomb","Trick","Trick Room"],"teraTypes":["Poison","Psychic"]},{"role":"Bulky Attacker","movepool":["Earthquake","Fire Blast","Psychic","Shell Side Arm","Slack Off","Thunder Wave"],"teraTypes":["Dark","Ground","Poison"]}]},"muk":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Drain Punch","Gunk Shot","Haze","Ice Punch","Knock Off","Shadow Sneak","Toxic","Toxic Spikes"],"teraTypes":["Dark"]},{"role":"AV Pivot","movepool":["Drain Punch","Gunk Shot","Ice Punch","Knock Off","Shadow Sneak"],"teraTypes":["Dark"]}]},"mukalola":{"level":82,"sets":[{"role":"AV Pivot","movepool":["Drain Punch","Gunk Shot","Ice Punch","Knock Off","Poison Jab","Shadow Sneak"],"teraTypes":["Dark"]}]},"cloyster":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Drill Run","Icicle Spear","Rock Blast","Shell Smash"],"teraTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Hydro Pump","Icicle Spear","Rock Blast","Shell Smash"],"teraTypes":["Ice","Rock"]}]},"gengar":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Focus Blast","Nasty Plot","Shadow Ball","Sludge Bomb","Trick"],"teraTypes":["Fighting","Ghost"]},{"role":"Fast Attacker","movepool":["Encore","Focus Blast","Shadow Ball","Sludge Bomb","Toxic Spikes","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"hypno":{"level":95,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Light Screen","Psychic","Reflect","Thunder Wave","Toxic"],"teraTypes":["Dark","Steel"]},{"role":"Bulky Attacker","movepool":["Focus Blast","Protect","Psychic","Toxic"],"teraTypes":["Dark","Fighting","Steel"]}]},"electrode":{"level":92,"sets":[{"role":"Fast Support","movepool":["Explosion","Foul Play","Taunt","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]},{"role":"Tera Blast user","movepool":["Taunt","Tera Blast","Thunderbolt","Volt Switch"],"teraTypes":["Ice"]}]},"electrodehisui":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Energy Ball","Leaf Storm","Taunt","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Grass"]},{"role":"Fast Support","movepool":["Giga Drain","Leech Seed","Substitute","Thunderbolt"],"teraTypes":["Poison"]}]},"weezing":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Fire Blast","Gunk Shot","Pain Split","Sludge Bomb","Toxic Spikes","Will-O-Wisp"],"teraTypes":["Steel"]}]},"weezinggalar":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Defog","Fire Blast","Gunk Shot","Pain Split","Strange Steam","Will-O-Wisp"],"teraTypes":["Steel"]}]},"scyther":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Bug Bite","Close Combat","Dual Wingbeat","Swords Dance"],"teraTypes":["Fighting"]},{"role":"Fast Support","movepool":["Close Combat","Defog","Dual Wingbeat","U-turn"],"teraTypes":["Fighting"]}]},"tauros":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Body Slam","Close Combat","Earthquake","Rock Slide","Zen Headbutt"],"teraTypes":["Fighting","Ground","Normal"]}]},"taurospaldeacombat":{"level":84,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Raging Bull","Stone Edge","Substitute"],"teraTypes":["Fighting","Steel"]},{"role":"Wallbreaker","movepool":["Bulk Up","Close Combat","Earthquake","Iron Head","Lash Out","Stone Edge"],"teraTypes":["Fighting"]}]},"taurospaldeablaze":{"level":81,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Raging Bull","Substitute"],"teraTypes":["Water"]},{"role":"Wallbreaker","movepool":["Close Combat","Flare Blitz","Stone Edge","Wild Charge"],"teraTypes":["Fighting"]}]},"taurospaldeaaqua":{"level":82,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Liquidation","Substitute"],"teraTypes":["Steel","Water"]},{"role":"Wallbreaker","movepool":["Aqua Jet","Bulk Up","Close Combat","Liquidation","Stone Edge","Wave Crash"],"teraTypes":["Water"]}]},"gyarados":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Stone Edge","Waterfall"],"teraTypes":["Ground"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Earthquake","Tera Blast","Waterfall"],"teraTypes":["Flying"]}]},"ditto":{"level":87,"sets":[{"role":"Fast Support","movepool":["Transform"],"teraTypes":["Bug","Dark","Dragon","Electric","Fairy","Fighting","Fire","Flying","Ghost","Grass","Ground","Ice","Normal","Poison","Psychic","Rock","Steel","Water"]}]},"vaporeon":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Flip Turn","Ice Beam","Protect","Scald","Wish"],"teraTypes":["Ghost","Ground"]},{"role":"Bulky Setup","movepool":["Calm Mind","Protect","Scald","Wish"],"teraTypes":["Ghost","Ground"]}]},"jolteon":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Hyper Voice","Shadow Ball","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Ghost"]},{"role":"Tera Blast user","movepool":["Calm Mind","Substitute","Tera Blast","Thunderbolt"],"teraTypes":["Ice"]}]},"flareon":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Facade","Flare Blitz","Quick Attack","Trailblaze","Will-O-Wisp"],"teraTypes":["Normal"]}]},"snorlax":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Curse","Rest","Sleep Talk"],"teraTypes":["Fairy","Poison"]},{"role":"Bulky Setup","movepool":["Body Slam","Crunch","Curse","Earthquake","Rest"],"teraTypes":["Ground","Poison"]}]},"articuno":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Freeze-Dry","Haze","Roost","Substitute","U-turn"],"teraTypes":["Ground","Steel"]}]},"articunogalar":{"level":83,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Freezing Glare","Hurricane","Recover"],"teraTypes":["Steel"]}]},"zapdos":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Discharge","Heat Wave","Hurricane","Roost","U-turn"],"teraTypes":["Electric","Steel"]}]},"zapdosgalar":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Bulk Up","Close Combat","Knock Off","U-turn"],"teraTypes":["Fighting"]}]},"moltres":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Fire Blast","Roost","U-turn","Will-O-Wisp"],"teraTypes":["Dragon","Ground"]}]},"moltresgalar":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Agility","Fiery Wrath","Hurricane","Nasty Plot","Rest"],"teraTypes":["Dark"]}]},"dragonite":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["Dragon Dance","Earthquake","Extreme Speed","Fire Punch","Outrage"],"teraTypes":["Normal"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Earthquake","Outrage","Tera Blast"],"teraTypes":["Flying"]}]},"mewtwo":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Aura Sphere","Dark Pulse","Fire Blast","Nasty Plot","Psystrike","Recover"],"teraTypes":["Dark","Fighting","Fire","Psychic"]}]},"mew":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Psychic","Stealth Rock","Taunt","Toxic Spikes","U-turn","Will-O-Wisp"],"teraTypes":["Fairy","Steel"]},{"role":"Setup Sweeper","movepool":["Brave Bird","Close Combat","Flare Blitz","Knock Off","Leech Life","Psychic Fangs","Swords Dance"],"teraTypes":["Fighting"]},{"role":"Fast Bulky Setup","movepool":["Aura Sphere","Dark Pulse","Dazzling Gleam","Earth Power","Fire Blast","Hydro Pump","Nasty Plot","Psyshock"],"teraTypes":["Dark","Fairy","Fighting","Fire","Ground","Psychic","Water"]}]},"typhlosion":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Eruption","Fire Blast","Focus Blast","Shadow Ball"],"teraTypes":["Fire"]}]},"typhlosionhisui":{"level":83,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Fire Blast","Focus Blast","Shadow Ball","Substitute","Will-O-Wisp"],"teraTypes":["Fighting","Fire","Ghost"]},{"role":"Fast Attacker","movepool":["Eruption","Fire Blast","Focus Blast","Shadow Ball"],"teraTypes":["Fire"]}]},"furret":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["Double-Edge","Knock Off","Trick","U-turn"],"teraTypes":["Ghost","Normal"]},{"role":"Setup Sweeper","movepool":["Brick Break","Double-Edge","Knock Off","Tidy Up"],"teraTypes":["Ghost","Normal"]}]},"noctowl":{"level":94,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Defog","Hurricane","Hyper Voice","Roost"],"teraTypes":["Ground","Normal","Steel"]}]},"ariados":{"level":91,"sets":[{"role":"Fast Support","movepool":["Knock Off","Megahorn","Poison Jab","Sticky Web","Sucker Punch","Toxic Spikes"],"teraTypes":["Ghost","Steel"]}]},"ampharos":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Agility","Dazzling Gleam","Focus Blast","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Fairy"]}]},"azumarill":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Aqua Jet","Ice Spinner","Knock Off","Liquidation","Play Rough","Superpower"],"teraTypes":["Water"]},{"role":"Bulky Setup","movepool":["Aqua Jet","Belly Drum","Liquidation","Play Rough"],"teraTypes":["Water"]}]},"sudowoodo":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Head Smash","Stealth Rock","Sucker Punch","Wood Hammer"],"teraTypes":["Grass","Rock"]}]},"politoed":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Haze","Hydro Pump","Hypnosis","Ice Beam","Rest","Surf"],"teraTypes":["Steel"]}]},"jumpluff":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Acrobatics","Leech Seed","Strength Sap","Substitute"],"teraTypes":["Steel"]},{"role":"Fast Support","movepool":["Acrobatics","Encore","Sleep Powder","Strength Sap","U-turn"],"teraTypes":["Steel"]}]},"sunflora":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Earth Power","Leaf Storm","Sludge Bomb"],"teraTypes":["Fairy","Grass","Ground","Poison"]}]},"quagsire":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ice Beam","Recover","Spikes","Toxic"],"teraTypes":["Fairy","Poison","Steel"]},{"role":"Bulky Attacker","movepool":["Earthquake","Liquidation","Recover","Spikes","Toxic"],"teraTypes":["Fairy","Poison","Steel"]}]},"clodsire":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["Curse","Earthquake","Gunk Shot","Recover"],"teraTypes":["Flying","Ground"]},{"role":"Bulky Support","movepool":["Earthquake","Poison Jab","Recover","Stealth Rock","Toxic","Toxic Spikes"],"teraTypes":["Flying","Ground","Steel"]}]},"espeon":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Morning Sun","Psychic","Shadow Ball","Trick"],"teraTypes":["Fairy","Psychic"]}]},"umbreon":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Protect","Toxic","Wish"],"teraTypes":["Poison"]}]},"slowking":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Chilly Reception","Psyshock","Scald","Slack Off","Thunder Wave"],"teraTypes":["Dragon","Fairy","Water"]},{"role":"Wallbreaker","movepool":["Fire Blast","Hydro Pump","Ice Beam","Psychic","Psyshock","Trick Room"],"teraTypes":["Psychic","Water"]}]},"slowkinggalar":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Chilly Reception","Fire Blast","Psyshock","Slack Off","Sludge Bomb","Thunder Wave"],"teraTypes":["Dark","Poison"]},{"role":"AV Pivot","movepool":["Fire Blast","Future Sight","Ice Beam","Psyshock","Sludge Bomb"],"teraTypes":["Poison","Psychic"]}]},"girafarig":{"level":89,"sets":[{"role":"Bulky Setup","movepool":["Dazzling Gleam","Nasty Plot","Psychic","Psyshock","Shadow Ball","Thunderbolt"],"teraTypes":["Electric","Fairy","Psychic"]}]},"forretress":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Iron Head","Rapid Spin","Stealth Rock","Toxic Spikes","Volt Switch"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Body Press","Iron Head","Rapid Spin","Spikes","Stealth Rock"],"teraTypes":["Fighting","Water"]}]},"dunsparce":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Coil","Earthquake","Roost"],"teraTypes":["Ground"]}]},"qwilfish":{"level":86,"sets":[{"role":"Fast Support","movepool":["Destiny Bond","Gunk Shot","Spikes","Taunt","Thunder Wave","Toxic Spikes","Waterfall"],"teraTypes":["Dark","Water"]}]},"qwilfishhisui":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Crunch","Gunk Shot","Spikes","Taunt","Toxic Spikes"],"teraTypes":["Flying","Poison"]}]},"overqwil":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Crunch","Gunk Shot","Liquidation","Swords Dance"],"teraTypes":["Water"]}]},"scizor":{"level":79,"sets":[{"role":"Bulky Support","movepool":["Bullet Punch","Close Combat","Defog","Knock Off","U-turn"],"teraTypes":["Dragon","Steel"]},{"role":"Setup Sweeper","movepool":["Bug Bite","Bullet Punch","Close Combat","Knock Off","Swords Dance"],"teraTypes":["Steel"]},{"role":"Wallbreaker","movepool":["Bullet Punch","Close Combat","Knock Off","U-turn"],"teraTypes":["Steel"]}]},"heracross":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Facade","Knock Off","Trailblaze"],"teraTypes":["Normal"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Knock Off","Megahorn","Stone Edge"],"teraTypes":["Bug","Fighting","Rock"]}]},"ursaring":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Crunch","Earthquake","Rest","Sleep Talk"],"teraTypes":["Ghost","Ground"]}]},"magcargo":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["Earth Power","Fire Blast","Power Gem","Shell Smash"],"teraTypes":["Dragon","Grass"]},{"role":"Bulky Support","movepool":["Lava Plume","Power Gem","Recover","Stealth Rock","Yawn"],"teraTypes":["Dragon","Grass"]}]},"delibird":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Drill Run","Foul Play","Ice Shard","Ice Spinner"],"teraTypes":["Dark","Flying","Ground","Ice"]},{"role":"Fast Support","movepool":["Brave Bird","Freeze-Dry","Rapid Spin","Spikes"],"teraTypes":["Ghost"]}]},"houndoom":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Fire Blast","Nasty Plot","Sludge Bomb","Sucker Punch"],"teraTypes":["Dark","Fire","Poison"]}]},"donphan":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ice Spinner","Knock Off","Rapid Spin","Stealth Rock"],"teraTypes":["Ghost","Grass"]},{"role":"Bulky Attacker","movepool":["Earthquake","Ice Shard","Ice Spinner","Knock Off","Rapid Spin","Stone Edge"],"teraTypes":["Dark","Ice"]}]},"chansey":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Heal Bell","Seismic Toss","Soft-Boiled","Stealth Rock","Thunder Wave"],"teraTypes":["Fairy","Ghost","Poison","Steel"]}]},"blissey":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Heal Bell","Seismic Toss","Soft-Boiled","Stealth Rock","Thunder Wave"],"teraTypes":["Fairy","Ghost","Poison","Steel"]}]},"tyranitar":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Fire Punch","Knock Off","Stone Edge"],"teraTypes":["Ghost","Rock"]},{"role":"Bulky Support","movepool":["Earthquake","Fire Blast","Ice Beam","Knock Off","Stealth Rock","Stone Edge","Thunder Wave"],"teraTypes":["Poison","Rock"]}]},"mightyena":{"level":95,"sets":[{"role":"Wallbreaker","movepool":["Crunch","Play Rough","Poison Fang","Sucker Punch","Taunt"],"teraTypes":["Fairy","Poison"]}]},"ludicolo":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["Giga Drain","Hydro Pump","Ice Beam","Rain Dance"],"teraTypes":["Grass","Steel","Water"]},{"role":"Fast Attacker","movepool":["Giga Drain","Hydro Pump","Ice Beam","Leaf Storm"],"teraTypes":["Grass","Water"]}]},"shiftry":{"level":88,"sets":[{"role":"Fast Support","movepool":["Defog","Knock Off","Leaf Storm","Sucker Punch","Will-O-Wisp"],"teraTypes":["Dark","Poison"]},{"role":"Wallbreaker","movepool":["Dark Pulse","Giga Drain","Heat Wave","Leaf Storm","Nasty Plot","Vacuum Wave"],"teraTypes":["Fire","Grass"]},{"role":"Setup Sweeper","movepool":["Knock Off","Leaf Blade","Low Kick","Tailwind"],"teraTypes":["Dark","Fighting"]}]},"pelipper":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Hurricane","Hydro Pump","Ice Beam","Knock Off","Roost","Surf","U-turn"],"teraTypes":["Ground","Water"]},{"role":"Wallbreaker","movepool":["Hurricane","Hydro Pump","Ice Beam","Surf","U-turn"],"teraTypes":["Flying","Water"]}]},"gardevoir":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Focus Blast","Healing Wish","Moonblast","Mystical Fire","Psychic","Psyshock","Trick"],"teraTypes":["Fairy","Fighting","Fire"]}]},"masquerain":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["Bug Buzz","Hurricane","Hydro Pump","Quiver Dance"],"teraTypes":["Water"]},{"role":"Fast Support","movepool":["Bug Buzz","Hurricane","Hydro Pump","Ice Beam","Sticky Web","Stun Spore","U-turn"],"teraTypes":["Ground","Steel"]}]},"breloom":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Bullet Seed","Mach Punch","Rock Tomb","Spore","Swords Dance"],"teraTypes":["Fighting","Rock"]}]},"vigoroth":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Bulk Up","Earthquake","Knock Off","Slack Off"],"teraTypes":["Ghost","Ground","Poison"]}]},"slaking":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Body Slam","Earthquake","Giga Impact","Knock Off"],"teraTypes":["Ghost","Ground","Normal"]}]},"hariyama":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Bulk Up","Bullet Punch","Close Combat","Facade","Headlong Rush","Knock Off"],"teraTypes":["Normal"]},{"role":"AV Pivot","movepool":["Bullet Punch","Close Combat","Headlong Rush","Heavy Slam","Knock Off"],"teraTypes":["Steel"]}]},"sableye":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Encore","Foul Play","Knock Off","Recover","Taunt","Thunder Wave","Will-O-Wisp"],"teraTypes":["Steel"]}]},"medicham":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Bullet Punch","Close Combat","Ice Punch","Poison Jab","Zen Headbutt"],"teraTypes":["Fighting"]}]},"volbeat":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Encore","Roost","Thunder Wave","U-turn"],"teraTypes":["Steel","Water"]},{"role":"Bulky Attacker","movepool":["Encore","Lunge","Roost","Thunder Wave"],"teraTypes":["Steel","Water"]}]},"illumise":{"level":92,"sets":[{"role":"Bulky Support","movepool":["Encore","Roost","Thunder Wave","U-turn"],"teraTypes":["Steel","Water"]},{"role":"Bulky Attacker","movepool":["Bug Buzz","Encore","Roost","Thunder Wave"],"teraTypes":["Steel","Water"]}]},"swalot":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Clear Smog","Earthquake","Encore","Ice Beam","Knock Off","Pain Split","Protect","Sludge Bomb","Toxic","Toxic Spikes"],"teraTypes":["Dark"]},{"role":"Bulky Setup","movepool":["Earthquake","Gunk Shot","Knock Off","Swords Dance"],"teraTypes":["Dark","Ground","Poison"]}]},"camerupt":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Lava Plume","Stealth Rock","Yawn"],"teraTypes":["Grass","Water"]}]},"torkoal":{"level":88,"sets":[{"role":"Fast Support","movepool":["Earthquake","Lava Plume","Rapid Spin","Solar Beam","Stealth Rock","Yawn"],"teraTypes":["Dragon","Grass"]}]},"grumpig":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["Dazzling Gleam","Earth Power","Nasty Plot","Psychic","Psyshock","Shadow Ball"],"teraTypes":["Fairy","Ghost","Ground","Psychic"]},{"role":"Bulky Attacker","movepool":["Earth Power","Focus Blast","Psychic","Psyshock","Shadow Ball","Trick"],"teraTypes":["Fighting","Ghost","Ground","Psychic"]}]},"cacturne":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["Focus Blast","Knock Off","Leaf Storm","Spikes","Sucker Punch","Toxic Spikes"],"teraTypes":["Dark","Grass","Poison"]},{"role":"Setup Sweeper","movepool":["Drain Punch","Seed Bomb","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fighting"]}]},"altaria":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Defog","Earthquake","Haze","Roost","Will-O-Wisp"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Brave Bird","Dragon Dance","Earthquake","Roost"],"teraTypes":["Ground","Steel"]}]},"zangoose":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Facade","Knock Off","Swords Dance"],"teraTypes":["Normal"]},{"role":"Wallbreaker","movepool":["Close Combat","Facade","Knock Off","Quick Attack"],"teraTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["Facade","Knock Off","Quick Attack","Swords Dance"],"teraTypes":["Normal"]}]},"seviper":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flamethrower","Giga Drain","Glare","Gunk Shot","Knock Off","Switcheroo"],"teraTypes":["Dark","Fire","Grass","Ground","Poison"]}]},"whiscash":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Hydro Pump","Ice Beam","Spikes","Stealth Rock"],"teraTypes":["Poison","Steel"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Liquidation","Stone Edge"],"teraTypes":["Ground","Steel"]}]},"crawdaunt":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Crabhammer","Dragon Dance","Knock Off"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Aqua Jet","Crabhammer","Knock Off","Swords Dance"],"teraTypes":["Water"]}]},"milotic":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Dragon Tail","Flip Turn","Haze","Ice Beam","Recover","Scald"],"teraTypes":["Dragon","Steel"]}]},"banette":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["Gunk Shot","Poltergeist","Shadow Sneak","Swords Dance","Thunder Wave","Will-O-Wisp"],"teraTypes":["Ghost","Poison"]}]},"tropius":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Air Slash","Leech Seed","Protect","Substitute"],"teraTypes":["Steel"]}]},"chimecho":{"level":94,"sets":[{"role":"Bulky Support","movepool":["Encore","Heal Bell","Knock Off","Psychic","Recover","Taunt","Thunder Wave"],"teraTypes":["Dark","Electric","Poison","Steel"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Psychic","Psyshock","Recover"],"teraTypes":["Electric","Fairy"]}]},"glalie":{"level":95,"sets":[{"role":"Fast Support","movepool":["Disable","Earthquake","Freeze-Dry","Spikes","Taunt"],"teraTypes":["Ground","Poison","Steel","Water"]}]},"luvdisc":{"level":100,"sets":[{"role":"Bulky Support","movepool":["Charm","Flip Turn","Ice Beam","Protect","Surf","Wish"],"teraTypes":["Dragon","Ghost"]}]},"salamence":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Dual Wingbeat","Earthquake","Outrage","Roost"],"teraTypes":["Dragon","Ground","Steel"]}]},"kyogre":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Ice Beam","Origin Pulse","Thunder","Water Spout"],"teraTypes":["Water"]}]},"groudon":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Heat Crash","Precipice Blades","Roar","Spikes","Stealth Rock","Stone Edge","Thunder Wave","Will-O-Wisp"],"teraTypes":["Fire"]},{"role":"Bulky Setup","movepool":["Heat Crash","Precipice Blades","Stone Edge","Swords Dance","Thunder Wave"],"teraTypes":["Fire"]}]},"rayquaza":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Ascent","Dragon Dance","Earthquake","Outrage"],"teraTypes":["Flying"]},{"role":"Fast Attacker","movepool":["Dragon Ascent","Earthquake","Extreme Speed","Swords Dance","U-turn"],"teraTypes":["Normal"]},{"role":"Fast Bulky Setup","movepool":["Dragon Ascent","Earthquake","Scale Shot","Swords Dance"],"teraTypes":["Dragon","Flying"]}]},"jirachi":{"level":79,"sets":[{"role":"Fast Support","movepool":["Body Slam","Future Sight","Iron Head","Protect","Wish"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Body Slam","Drain Punch","Energy Ball","Fire Punch","Iron Head","Psychic","Stealth Rock","U-turn"],"teraTypes":["Fighting","Water"]},{"role":"Bulky Support","movepool":["Fire Punch","Healing Wish","Iron Head","Protect","U-turn","Wish"],"teraTypes":["Water"]}]},"torterra":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Headlong Rush","Shell Smash","Stone Edge","Wood Hammer"],"teraTypes":["Ground","Rock","Water"]}]},"infernape":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Grass Knot","Gunk Shot","Knock Off","Mach Punch","Overheat","Stone Edge"],"teraTypes":["Dark","Fighting","Fire"]},{"role":"Fast Support","movepool":["Close Combat","Flare Blitz","Gunk Shot","Knock Off","Mach Punch","Stone Edge","Swords Dance","U-turn"],"teraTypes":["Dark","Fighting","Fire"]}]},"empoleon":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Flip Turn","Ice Beam","Knock Off","Roost","Stealth Rock","Surf","Yawn"],"teraTypes":["Flying","Grass"]}]},"staraptor":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Close Combat","Double-Edge","Quick Attack","U-turn"],"teraTypes":["Fighting","Flying"]}]},"kricketune":{"level":99,"sets":[{"role":"Fast Support","movepool":["Knock Off","Pounce","Sticky Web","Taunt"],"teraTypes":["Ghost"]}]},"luxray":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Crunch","Facade","Play Rough","Trailblaze","Wild Charge"],"teraTypes":["Normal"]},{"role":"AV Pivot","movepool":["Crunch","Ice Fang","Play Rough","Volt Switch","Wild Charge"],"teraTypes":["Electric","Fairy"]}]},"vespiquen":{"level":98,"sets":[{"role":"Bulky Support","movepool":["Air Slash","Hurricane","Roost","Spikes","Toxic","Toxic Spikes","U-turn"],"teraTypes":["Steel"]}]},"pachirisu":{"level":95,"sets":[{"role":"AV Pivot","movepool":["Nuzzle","Super Fang","Thunderbolt","U-turn"],"teraTypes":["Flying"]},{"role":"Fast Support","movepool":["Encore","Super Fang","Thunderbolt","U-turn"],"teraTypes":["Flying"]}]},"floatzel":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Crunch","Flip Turn","Ice Spinner","Low Kick","Wave Crash"],"teraTypes":["Water"]},{"role":"Bulky Setup","movepool":["Bulk Up","Crunch","Ice Spinner","Low Kick","Wave Crash"],"teraTypes":["Dark","Fighting","Ice","Steel","Water"]}]},"gastrodon":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Clear Smog","Earthquake","Ice Beam","Recover","Stealth Rock","Surf"],"teraTypes":["Poison","Steel"]}]},"ambipom":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Double Hit","Fake Out","Knock Off","Low Kick","Switcheroo","U-turn"],"teraTypes":["Normal"]}]},"drifblim":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Air Slash","Defog","Shadow Ball","Strength Sap","Will-O-Wisp"],"teraTypes":["Fairy","Ghost"]},{"role":"Fast Bulky Setup","movepool":["Air Slash","Calm Mind","Shadow Ball","Strength Sap"],"teraTypes":["Fairy","Ghost"]}]},"mismagius":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Energy Ball","Mystical Fire","Nasty Plot","Shadow Ball","Thunderbolt","Trick"],"teraTypes":["Electric","Fairy","Fire","Ghost"]}]},"honchkrow":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Heat Wave","Sucker Punch","U-turn"],"teraTypes":["Dark","Flying"]}]},"skuntank":{"level":85,"sets":[{"role":"Fast Support","movepool":["Fire Blast","Gunk Shot","Knock Off","Sucker Punch","Taunt","Toxic Spikes"],"teraTypes":["Dark","Poison"]}]},"bronzong":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Hypnosis","Iron Head","Light Screen","Psychic","Reflect","Stealth Rock"],"teraTypes":["Electric","Water"]}]},"spiritomb":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Foul Play","Pain Split","Poltergeist","Shadow Sneak","Sucker Punch","Will-O-Wisp"],"teraTypes":["Dark","Ghost"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dark Pulse","Rest","Sleep Talk"],"teraTypes":["Steel"]}]},"garchomp":{"level":74,"sets":[{"role":"Fast Support","movepool":["Earthquake","Fire Blast","Outrage","Spikes","Stealth Rock","Stone Edge"],"teraTypes":["Ground","Steel"]},{"role":"Setup Sweeper","movepool":["Earthquake","Fire Fang","Scale Shot","Stone Edge","Swords Dance"],"teraTypes":["Dragon","Ground"]}]},"lucario":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Meteor Mash","Stone Edge","Swords Dance"],"teraTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["Aura Sphere","Dark Pulse","Flash Cannon","Focus Blast","Nasty Plot","Vacuum Wave"],"teraTypes":["Fighting"]}]},"hippowdon":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Roar","Slack Off","Stealth Rock","Stone Edge"],"teraTypes":["Dragon","Rock","Steel"]}]},"toxicroak":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Gunk Shot","Ice Punch","Knock Off","Sucker Punch","Swords Dance"],"teraTypes":["Dark"]},{"role":"Setup Sweeper","movepool":["Close Combat","Gunk Shot","Ice Punch","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fighting"]}]},"lumineon":{"level":92,"sets":[{"role":"Fast Support","movepool":["Dazzling Gleam","Encore","Hydro Pump","Ice Beam","U-turn"],"teraTypes":["Fairy","Water"]}]},"abomasnow":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Aurora Veil","Blizzard","Earthquake","Ice Shard","Wood Hammer"],"teraTypes":["Ice","Water"]}]},"weavile":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Ice Shard","Ice Spinner","Knock Off","Low Kick","Swords Dance"],"teraTypes":["Dark","Fighting","Ice"]}]},"sneasler":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Dire Claw","Gunk Shot","Lash Out","U-turn"],"teraTypes":["Dark","Fighting"]},{"role":"Setup Sweeper","movepool":["Acrobatics","Close Combat","Gunk Shot","Swords Dance"],"teraTypes":["Flying"]}]},"magnezone":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Body Press","Flash Cannon","Mirror Coat","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Flying","Water"]}]},"yanmega":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["Air Slash","Bug Buzz","Giga Drain","U-turn"],"teraTypes":["Bug"]},{"role":"Tera Blast user","movepool":["Air Slash","Bug Buzz","Protect","Tera Blast"],"teraTypes":["Ground"]}]},"leafeon":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Double-Edge","Knock Off","Leaf Blade","Substitute","Swords Dance","Synthesis"],"teraTypes":["Dark","Normal"]}]},"glaceon":{"level":93,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Freeze-Dry","Protect","Wish","Yawn"],"teraTypes":["Water"]}]},"gliscor":{"level":77,"sets":[{"role":"Fast Support","movepool":["Earthquake","Protect","Substitute","Toxic"],"teraTypes":["Water"]},{"role":"Fast Bulky Setup","movepool":["Dual Wingbeat","Earthquake","Facade","Swords Dance"],"teraTypes":["Normal"]},{"role":"Bulky Support","movepool":["Earthquake","Knock Off","Protect","Spikes","Toxic Spikes","U-turn"],"teraTypes":["Water"]}]},"mamoswine":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Ice Shard","Icicle Crash","Knock Off","Stealth Rock"],"teraTypes":["Ground","Ice"]}]},"gallade":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Leaf Blade","Night Slash","Psycho Cut","Sacred Sword","Swords Dance"],"teraTypes":["Dark","Fighting","Grass"]},{"role":"Setup Sweeper","movepool":["Agility","Night Slash","Psycho Cut","Sacred Sword"],"teraTypes":["Dark","Fighting"]}]},"probopass":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Flash Cannon","Iron Defense","Power Gem","Rest"],"teraTypes":["Fighting"]},{"role":"Bulky Attacker","movepool":["Body Press","Flash Cannon","Power Gem","Stealth Rock","Thunder Wave","Volt Switch"],"teraTypes":["Fighting"]}]},"dusknoir":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Ice Punch","Leech Life","Pain Split","Poltergeist","Shadow Sneak","Trick"],"teraTypes":["Dark","Ghost","Ground"]},{"role":"Bulky Support","movepool":["Earthquake","Pain Split","Poltergeist","Shadow Sneak","Will-O-Wisp"],"teraTypes":["Dark","Fairy"]}]},"froslass":{"level":87,"sets":[{"role":"Fast Support","movepool":["Destiny Bond","Ice Beam","Poltergeist","Spikes","Taunt","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"rotom":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Nasty Plot","Shadow Ball","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Ghost"]}]},"rotomwash":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Hydro Pump","Nasty Plot","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Water"]}]},"rotomheat":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Nasty Plot","Overheat","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Fire"]}]},"rotomfrost":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Blizzard","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric"]}]},"rotomfan":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric"]}]},"rotommow":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Leaf Storm","Nasty Plot","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Grass"]}]},"uxie":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Light Screen","Psychic","Reflect","Stealth Rock","Thunder Wave","U-turn","Yawn"],"teraTypes":["Dark","Electric","Steel"]}]},"mesprit":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Dazzling Gleam","Energy Ball","Healing Wish","Ice Beam","Nasty Plot","Psychic","Thunderbolt","U-turn"],"teraTypes":["Electric","Fairy","Psychic"]},{"role":"Bulky Support","movepool":["Encore","Knock Off","Psychic","Stealth Rock","Thunder Wave","U-turn"],"teraTypes":["Dark","Electric","Steel"]},{"role":"Bulky Attacker","movepool":["Drain Punch","Ice Beam","Knock Off","Psychic","Thunder Wave","Thunderbolt","U-turn"],"teraTypes":["Dark","Fighting"]}]},"azelf":{"level":82,"sets":[{"role":"Fast Support","movepool":["Explosion","Fire Blast","Knock Off","Psychic","Stealth Rock","Taunt","U-turn"],"teraTypes":["Dark","Fire","Psychic"]},{"role":"Fast Attacker","movepool":["Dazzling Gleam","Fire Blast","Nasty Plot","Psychic","Psyshock","Thunderbolt","Trick","U-turn"],"teraTypes":["Electric","Fairy","Fire","Psychic"]}]},"dialga":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Heavy Slam","Stealth Rock","Thunder Wave","Thunderbolt"],"teraTypes":["Dragon","Fire","Steel"]}]},"dialgaorigin":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Flash Cannon","Stealth Rock","Thunder Wave"],"teraTypes":["Dragon","Fire","Steel"]}]},"palkia":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend"],"teraTypes":["Dragon","Water"]},{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend","Thunder Wave"],"teraTypes":["Dragon","Water"]}]},"palkiaorigin":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend","Thunder Wave"],"teraTypes":["Dragon","Water"]}]},"heatran":{"level":79,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Flash Cannon","Lava Plume","Magma Storm","Stealth Rock"],"teraTypes":["Flying","Grass","Steel"]}]},"giratina":{"level":74,"sets":[{"role":"Fast Support","movepool":["Dragon Tail","Rest","Shadow Ball","Sleep Talk","Will-O-Wisp"],"teraTypes":["Fairy","Ghost"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dragon Pulse","Rest","Sleep Talk"],"teraTypes":["Dragon","Fairy"]},{"role":"Bulky Support","movepool":["Defog","Dragon Tail","Rest","Shadow Ball","Will-O-Wisp"],"teraTypes":["Fairy","Ghost"]}]},"giratinaorigin":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["Defog","Draco Meteor","Dragon Tail","Earthquake","Poltergeist","Shadow Sneak","Will-O-Wisp"],"teraTypes":["Dragon","Ghost"]}]},"cresselia":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Moonlight","Psyshock","Thunderbolt"],"teraTypes":["Electric","Fairy","Poison","Steel"]}]},"phione":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["Rest","Scald","Sleep Talk","Take Heart"],"teraTypes":["Dragon","Steel"]},{"role":"Bulky Attacker","movepool":["Grass Knot","Ice Beam","Scald","Take Heart"],"teraTypes":["Grass","Steel"]}]},"manaphy":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Energy Ball","Hydro Pump","Ice Beam","Surf","Tail Glow"],"teraTypes":["Grass","Water"]}]},"darkrai":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Focus Blast","Hypnosis","Nasty Plot","Sludge Bomb","Substitute"],"teraTypes":["Poison"]}]},"shaymin":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Earth Power","Rest","Seed Flare"],"teraTypes":["Grass","Ground","Steel"]},{"role":"Bulky Support","movepool":["Air Slash","Leech Seed","Seed Flare","Substitute"],"teraTypes":["Steel"]}]},"shayminsky":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Dazzling Gleam","Earth Power","Seed Flare"],"teraTypes":["Flying","Grass"]},{"role":"Bulky Support","movepool":["Air Slash","Leech Seed","Seed Flare","Substitute"],"teraTypes":["Steel"]}]},"arceus":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Recover","Shadow Claw","Swords Dance"],"teraTypes":["Normal"]}]},"arceusbug":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Earth Power","Ice Beam","Judgment"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Recover"],"teraTypes":["Fire"]}]},"arceusdark":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Recover","Sludge Bomb"],"teraTypes":["Fire","Ghost","Poison"]}]},"arceusdragon":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Gunk Shot","Outrage","Swords Dance"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Sludge Bomb"],"teraTypes":["Fire"]}]},"arceuselectric":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Ice Beam","Judgment","Recover"],"teraTypes":["Electric","Ice"]}]},"arceusfairy":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"teraTypes":["Fire","Ground","Steel"]}]},"arceusfighting":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Cosmic Power","Recover","Stored Power"],"teraTypes":["Psychic","Steel"]}]},"arceusfire":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Flare Blitz","Liquidation","Recover","Swords Dance"],"teraTypes":["Fire","Ground","Water"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Earth Power","Ice Beam","Judgment","Recover","Thunderbolt"],"teraTypes":["Electric","Ground"]}]},"arceusflying":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover"],"teraTypes":["Ground","Steel"]}]},"arceusghost":{"level":70,"sets":[{"role":"Bulky Support","movepool":["Focus Blast","Judgment","Recover","Will-O-Wisp"],"teraTypes":["Fighting","Normal"]},{"role":"Bulky Setup","movepool":["Calm Mind","Focus Blast","Judgment","Recover"],"teraTypes":["Fighting","Ghost","Normal"]}]},"arceusgrass":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Earth Power","Ice Beam","Judgment"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Recover"],"teraTypes":["Fire"]}]},"arceusground":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Ice Beam","Judgment","Recover"],"teraTypes":["Dragon","Ground"]},{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Stone Edge","Swords Dance"],"teraTypes":["Normal"]}]},"arceusice":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover","Thunderbolt"],"teraTypes":["Electric","Ground"]}]},"arceuspoison":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Flare Blitz","Gunk Shot","Liquidation","Recover","Swords Dance"],"teraTypes":["Fire","Ground","Water"]}]},"arceuspsychic":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Cosmic Power","Recover","Stored Power"],"teraTypes":["Steel"]}]},"arceusrock":{"level":73,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"teraTypes":["Dragon","Ground"]}]},"arceussteel":{"level":69,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Earth Power","Judgment","Recover","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"arceuswater":{"level":71,"sets":[{"role":"Bulky Support","movepool":["Ice Beam","Judgment","Recover","Taunt","Will-O-Wisp"],"teraTypes":["Steel"]}]},"samurott":{"level":88,"sets":[{"role":"AV Pivot","movepool":["Aqua Jet","Flip Turn","Grass Knot","Hydro Pump","Ice Beam","Knock Off","Megahorn","Sacred Sword"],"teraTypes":["Dark","Water"]},{"role":"Setup Sweeper","movepool":["Aqua Jet","Knock Off","Liquidation","Megahorn","Sacred Sword","Swords Dance"],"teraTypes":["Dark","Water"]}]},"samurotthisui":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Ceaseless Edge","Flip Turn","Razor Shell","Sacred Sword","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Water"]}]},"gurdurr":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Bulk Up","Defog","Drain Punch","Knock Off","Mach Punch"],"teraTypes":["Steel"]}]},"conkeldurr":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Facade","Knock Off","Mach Punch"],"teraTypes":["Normal"]}]},"leavanny":{"level":88,"sets":[{"role":"Fast Support","movepool":["Knock Off","Leaf Blade","Lunge","Sticky Web","Swords Dance"],"teraTypes":["Ghost","Rock"]},{"role":"Setup Sweeper","movepool":["Knock Off","Leaf Blade","Lunge","Swords Dance"],"teraTypes":["Dark","Rock"]}]},"lilligant":{"level":86,"sets":[{"role":"Tera Blast user","movepool":["Giga Drain","Pollen Puff","Quiver Dance","Sleep Powder","Tera Blast"],"teraTypes":["Fire","Rock"]},{"role":"Setup Sweeper","movepool":["Petal Dance","Pollen Puff","Quiver Dance","Sleep Powder"],"teraTypes":["Grass"]}]},"lilliganthisui":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Ice Spinner","Leaf Blade","Sleep Powder","Victory Dance"],"teraTypes":["Fighting"]},{"role":"Fast Support","movepool":["Close Combat","Defog","Ice Spinner","Leaf Blade","Sleep Powder"],"teraTypes":["Fighting"]}]},"basculin":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Double-Edge","Flip Turn","Wave Crash"],"teraTypes":["Water"]}]},"basculinbluestriped":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Double-Edge","Flip Turn","Wave Crash"],"teraTypes":["Water"]}]},"basculegion":{"level":84,"sets":[{"role":"AV Pivot","movepool":["Aqua Jet","Flip Turn","Shadow Ball","Wave Crash"],"teraTypes":["Water"]}]},"basculegionf":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["Flip Turn","Hydro Pump","Ice Beam","Shadow Ball"],"teraTypes":["Water"]},{"role":"AV Pivot","movepool":["Flip Turn","Hydro Pump","Shadow Ball","Wave Crash"],"teraTypes":["Water"]}]},"krookodile":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["Bulk Up","Earthquake","Gunk Shot","Knock Off","Stealth Rock","Stone Edge"],"teraTypes":["Ground","Poison"]}]},"zoroark":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Flamethrower","Focus Blast","Nasty Plot","Psychic","Sludge Bomb","Trick","U-turn"],"teraTypes":["Poison"]}]},"zoroarkhisui":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["Bitter Malice","Flamethrower","Focus Blast","Hyper Voice","Nasty Plot","Shadow Ball","Trick","U-turn"],"teraTypes":["Fighting","Normal"]}]},"gothitelle":{"level":89,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Dark Pulse","Focus Blast","Psychic","Thunderbolt"],"teraTypes":["Dark","Electric","Fairy","Fighting","Flying","Ghost","Ground","Psychic","Steel"]},{"role":"Fast Attacker","movepool":["Dark Pulse","Focus Blast","Psychic","Trick"],"teraTypes":["Dark","Fairy","Fighting","Flying","Ghost","Ground","Psychic","Steel"]}]},"swanna":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Defog","Hydro Pump","Knock Off","Roost"],"teraTypes":["Ground"]}]},"sawsbuck":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Double-Edge","High Horsepower","Horn Leech","Swords Dance"],"teraTypes":["Ground","Normal"]},{"role":"Fast Attacker","movepool":["Headbutt","High Horsepower","Horn Leech","Swords Dance"],"teraTypes":["Normal"]}]},"amoonguss":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Clear Smog","Giga Drain","Sludge Bomb","Spore","Toxic"],"teraTypes":["Steel","Water"]}]},"alomomola":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Flip Turn","Protect","Scald","Wish"],"teraTypes":["Steel"]}]},"eelektross":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Coil","Drain Punch","Fire Punch","Knock Off","Liquidation","Wild Charge"],"teraTypes":["Fighting"]},{"role":"AV Pivot","movepool":["Acid Spray","Close Combat","Flamethrower","Giga Drain","Knock Off","Thunderbolt","U-turn"],"teraTypes":["Poison"]}]},"chandelure":{"level":82,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Energy Ball","Fire Blast","Shadow Ball","Substitute"],"teraTypes":["Fire","Ghost","Grass"]},{"role":"Fast Attacker","movepool":["Energy Ball","Fire Blast","Shadow Ball","Trick"],"teraTypes":["Fire","Ghost","Grass"]}]},"haxorus":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Dragon Dance","Earthquake","Iron Head","Outrage"],"teraTypes":["Fighting","Ground","Steel"]},{"role":"Fast Bulky Setup","movepool":["Close Combat","Earthquake","Iron Head","Scale Shot","Swords Dance"],"teraTypes":["Fighting","Ground","Steel"]}]},"beartic":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Close Combat","Earthquake","Icicle Crash","Snowscape","Swords Dance"],"teraTypes":["Fighting","Ground","Ice"]}]},"cryogonal":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Flash Cannon","Freeze-Dry","Haze","Rapid Spin","Recover"],"teraTypes":["Poison","Steel"]},{"role":"Tera Blast user","movepool":["Ice Beam","Rapid Spin","Recover","Tera Blast"],"teraTypes":["Electric"]}]},"mienshao":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["High Jump Kick","Knock Off","Poison Jab","Stone Edge","U-turn"],"teraTypes":["Dark"]},{"role":"AV Pivot","movepool":["Close Combat","Fake Out","Knock Off","U-turn"],"teraTypes":["Dark","Steel"]},{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Poison Jab","Stone Edge","Swords Dance"],"teraTypes":["Dark"]}]},"braviary":{"level":86,"sets":[{"role":"Fast Bulky Setup","movepool":["Brave Bird","Bulk Up","Close Combat","Roost"],"teraTypes":["Fighting","Flying"]}]},"braviaryhisui":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["Agility","Heat Wave","Hurricane","Psychic"],"teraTypes":["Fairy","Fire","Psychic","Steel"]},{"role":"Wallbreaker","movepool":["Calm Mind","Defog","Esper Wing","Heat Wave","Hurricane","U-turn"],"teraTypes":["Fairy","Psychic","Steel"]}]},"mandibuzz":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Defog","Foul Play","Roost","Toxic","U-turn"],"teraTypes":["Steel"]},{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Foul Play","Knock Off","Roost","Toxic"],"teraTypes":["Steel"]}]},"hydreigon":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Draco Meteor","Fire Blast","Flash Cannon","Nasty Plot","U-turn"],"teraTypes":["Dark","Dragon","Fire","Steel"]}]},"volcarona":{"level":77,"sets":[{"role":"Fast Bulky Setup","movepool":["Bug Buzz","Fiery Dance","Fire Blast","Giga Drain","Morning Sun","Quiver Dance"],"teraTypes":["Fire","Grass","Water"]},{"role":"Tera Blast user","movepool":["Bug Buzz","Fiery Dance","Fire Blast","Giga Drain","Quiver Dance","Tera Blast"],"teraTypes":["Ground","Water"]}]},"tornadus":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Bleakwind Storm","Focus Blast","Grass Knot","Heat Wave","Nasty Plot","U-turn"],"teraTypes":["Fire","Flying"]}]},"tornadustherian":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Bleakwind Storm","Focus Blast","Grass Knot","Heat Wave","Nasty Plot","U-turn"],"teraTypes":["Fire","Flying"]},{"role":"AV Pivot","movepool":["Bleakwind Storm","Heat Wave","Knock Off","U-turn"],"teraTypes":["Dark","Fire","Flying"]}]},"thundurus":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Knock Off","Nasty Plot","Sludge Bomb","Taunt","Thunder Wave","Thunderbolt","U-turn"],"teraTypes":["Electric","Grass"]},{"role":"Tera Blast user","movepool":["Focus Blast","Nasty Plot","Tera Blast","Thunderbolt"],"teraTypes":["Flying"]}]},"thundurustherian":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Nasty Plot","Psychic","Sludge Bomb","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Poison","Psychic"]},{"role":"Tera Blast user","movepool":["Focus Blast","Nasty Plot","Tera Blast","Thunderbolt"],"teraTypes":["Flying"]}]},"landorus":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Earth Power","Focus Blast","Nasty Plot","Psychic","Rock Slide","Sludge Bomb","Stealth Rock"],"teraTypes":["Ground","Poison","Psychic"]}]},"landorustherian":{"level":77,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Stealth Rock","Stone Edge","Taunt","U-turn"],"teraTypes":["Ground"]},{"role":"Tera Blast user","movepool":["Earthquake","Stone Edge","Swords Dance","Tera Blast"],"teraTypes":["Flying"]}]},"meloetta":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Focus Blast","Hyper Voice","Psyshock","U-turn"],"teraTypes":["Fighting","Normal","Psychic"]}]},"chesnaught":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Body Press","Knock Off","Leech Seed","Spikes","Synthesis","Wood Hammer"],"teraTypes":["Steel","Water"]},{"role":"Fast Bulky Setup","movepool":["Body Press","Iron Defense","Synthesis","Trailblaze"],"teraTypes":["Steel"]}]},"delphox":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Fire Blast","Focus Blast","Grass Knot","Nasty Plot","Psyshock"],"teraTypes":["Fighting","Fire","Grass","Psychic"]}]},"greninja":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Grass Knot","Gunk Shot","Hydro Pump","Ice Beam","Toxic Spikes","U-turn"],"teraTypes":["Dark","Poison","Water"]}]},"greninjabond":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Gunk Shot","Hydro Pump","Ice Beam"],"teraTypes":["Poison","Water"]}]},"talonflame":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Overheat","Roost","Taunt","U-turn","Will-O-Wisp"],"teraTypes":["Ground","Water"]},{"role":"Tera Blast user","movepool":["Brave Bird","Flare Blitz","Swords Dance","Tera Blast"],"teraTypes":["Ground"]}]},"vivillon":{"level":86,"sets":[{"role":"Fast Bulky Setup","movepool":["Bug Buzz","Energy Ball","Hurricane","Quiver Dance","Sleep Powder","Substitute"],"teraTypes":["Flying"]},{"role":"Tera Blast user","movepool":["Hurricane","Quiver Dance","Sleep Powder","Substitute","Tera Blast"],"teraTypes":["Ground"]}]},"pyroar":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Fire Blast","Hyper Voice","Will-O-Wisp","Work Up"],"teraTypes":["Fire"]}]},"florges":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Protect","Wish"],"teraTypes":["Steel"]},{"role":"Tera Blast user","movepool":["Calm Mind","Moonblast","Synthesis","Tera Blast"],"teraTypes":["Ground"]}]},"gogoat":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Earthquake","Horn Leech","Milk Drink"],"teraTypes":["Ground"]}]},"dragalge":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Flip Turn","Focus Blast","Hydro Pump","Sludge Bomb","Toxic","Toxic Spikes"],"teraTypes":["Water"]}]},"clawitzer":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Aura Sphere","Dark Pulse","Dragon Pulse","U-turn","Water Pulse"],"teraTypes":["Dark","Dragon","Fighting"]}]},"sylveon":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Hyper Voice","Protect","Wish"],"teraTypes":["Steel"]}]},"hawlucha":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Acrobatics","Brave Bird","Close Combat","Encore","Stone Edge","Swords Dance"],"teraTypes":["Fighting","Flying"]}]},"dedenne":{"level":88,"sets":[{"role":"Fast Support","movepool":["Dazzling Gleam","Nuzzle","Super Fang","Thunderbolt","U-turn"],"teraTypes":["Electric","Flying"]}]},"carbink":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Light Screen","Moonblast","Power Gem","Reflect","Spikes","Stealth Rock"],"teraTypes":["Fighting"]},{"role":"Fast Bulky Setup","movepool":["Body Press","Iron Defense","Moonblast","Rest","Rock Polish"],"teraTypes":["Fighting"]}]},"goodra":{"level":85,"sets":[{"role":"AV Pivot","movepool":["Draco Meteor","Earthquake","Fire Blast","Knock Off","Power Whip","Scald","Sludge Bomb","Thunderbolt"],"teraTypes":["Electric","Fire","Grass","Ground","Poison","Water"]}]},"goodrahisui":{"level":84,"sets":[{"role":"AV Pivot","movepool":["Draco Meteor","Dragon Tail","Earthquake","Fire Blast","Heavy Slam","Hydro Pump","Knock Off","Thunderbolt"],"teraTypes":["Electric","Fire","Ground","Water"]},{"role":"Bulky Setup","movepool":["Body Press","Curse","Heavy Slam","Rest"],"teraTypes":["Fighting"]}]},"klefki":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Magnet Rise","Play Rough","Spikes","Thunder Wave"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Dazzling Gleam","Foul Play","Spikes","Thunder Wave"],"teraTypes":["Flying","Water"]}]},"trevenant":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Drain Punch","Horn Leech","Poltergeist","Rest","Trick Room","Wood Hammer"],"teraTypes":["Fighting"]},{"role":"Bulky Support","movepool":["Drain Punch","Poltergeist","Protect","Toxic"],"teraTypes":["Dark","Fairy","Fighting","Steel"]}]},"avalugg":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Avalanche","Body Press","Curse","Rapid Spin","Recover"],"teraTypes":["Fighting"]}]},"avalugghisui":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Avalanche","Body Press","Rapid Spin","Recover","Stone Edge"],"teraTypes":["Flying","Ghost","Poison"]}]},"noivern":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Draco Meteor","Flamethrower","Hurricane","Roost","U-turn"],"teraTypes":["Normal"]},{"role":"Fast Support","movepool":["Defog","Draco Meteor","Flamethrower","Hurricane","Roost","U-turn"],"teraTypes":["Fire"]}]},"diancie":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Diamond Storm","Earth Power","Moonblast","Stealth Rock"],"teraTypes":["Fighting"]},{"role":"Bulky Setup","movepool":["Calm Mind","Diamond Storm","Draining Kiss","Earth Power"],"teraTypes":["Fairy","Water"]}]},"hoopa":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Nasty Plot","Psyshock","Shadow Ball","Trick"],"teraTypes":["Fighting","Ghost","Psychic"]}]},"hoopaunbound":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Drain Punch","Gunk Shot","Hyperspace Fury","Trick","Zen Headbutt"],"teraTypes":["Dark","Fighting","Poison"]},{"role":"Bulky Attacker","movepool":["Focus Blast","Gunk Shot","Hyperspace Fury","Psychic","Trick"],"teraTypes":["Fighting","Poison"]}]},"volcanion":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Flame Charge","Flamethrower","Haze","Sludge Bomb","Steam Eruption"],"teraTypes":["Fire","Ground","Water"]}]},"decidueye":{"level":88,"sets":[{"role":"Fast Support","movepool":["Defog","Knock Off","Leaf Storm","Roost","Spirit Shackle","U-turn"],"teraTypes":["Dark","Ghost","Grass"]},{"role":"Setup Sweeper","movepool":["Leaf Blade","Poltergeist","Shadow Sneak","Swords Dance"],"teraTypes":["Ghost"]}]},"decidueyehisui":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Knock Off","Leaf Blade","Roost","Sucker Punch","Swords Dance","Triple Arrows","U-turn"],"teraTypes":["Steel"]}]},"gumshoos":{"level":95,"sets":[{"role":"Wallbreaker","movepool":["Body Slam","Earthquake","Knock Off","U-turn"],"teraTypes":["Ground"]}]},"vikavolt":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["Agility","Bug Buzz","Energy Ball","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]},{"role":"Bulky Support","movepool":["Bug Buzz","Sticky Web","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]}]},"crabominable":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Drain Punch","Earthquake","Gunk Shot","Ice Hammer","Knock Off"],"teraTypes":["Fighting","Ground"]}]},"oricorio":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Hurricane","Quiver Dance","Revelation Dance","Roost"],"teraTypes":["Ground"]}]},"oricoriopompom":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Hurricane","Quiver Dance","Revelation Dance","Roost"],"teraTypes":["Ground"]}]},"oricoriopau":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Hurricane","Quiver Dance","Revelation Dance","Roost"],"teraTypes":["Fighting","Ground"]}]},"oricoriosensu":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Hurricane","Quiver Dance","Revelation Dance","Roost"],"teraTypes":["Fighting","Ghost"]}]},"ribombee":{"level":82,"sets":[{"role":"Fast Support","movepool":["Moonblast","Sticky Web","Stun Spore","U-turn"],"teraTypes":["Ghost"]},{"role":"Tera Blast user","movepool":["Bug Buzz","Moonblast","Quiver Dance","Tera Blast"],"teraTypes":["Ground"]}]},"lycanroc":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Accelerock","Close Combat","Crunch","Drill Run","Psychic Fangs","Stealth Rock","Stone Edge","Swords Dance","Taunt"],"teraTypes":["Fighting"]}]},"lycanrocmidnight":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Knock Off","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"teraTypes":["Fighting"]}]},"lycanrocdusk":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Accelerock","Close Combat","Crunch","Psychic Fangs","Stone Edge","Swords Dance"],"teraTypes":["Fighting"]}]},"toxapex":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Haze","Liquidation","Recover","Toxic","Toxic Spikes"],"teraTypes":["Fairy","Flying","Grass","Steel"]}]},"mudsdale":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Earthquake","Heavy Slam","Stealth Rock","Stone Edge"],"teraTypes":["Fighting"]}]},"lurantis":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Knock Off","Leaf Storm","Superpower","Synthesis"],"teraTypes":["Fighting"]},{"role":"AV Pivot","movepool":["Knock Off","Leaf Storm","Leech Life","Superpower"],"teraTypes":["Fighting"]}]},"salazzle":{"level":82,"sets":[{"role":"Fast Support","movepool":["Flamethrower","Protect","Substitute","Toxic"],"teraTypes":["Flying","Water"]}]},"tsareena":{"level":87,"sets":[{"role":"Fast Support","movepool":["High Jump Kick","Knock Off","Power Whip","Rapid Spin","Synthesis","U-turn"],"teraTypes":["Fighting","Steel"]}]},"oranguru":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["Focus Blast","Nasty Plot","Psychic","Psyshock","Thunderbolt"],"teraTypes":["Electric","Fighting","Psychic"]},{"role":"Wallbreaker","movepool":["Focus Blast","Hyper Voice","Nasty Plot","Psyshock","Thunderbolt","Trick"],"teraTypes":["Electric","Fighting","Psychic"]}]},"passimian":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Gunk Shot","Knock Off","Rock Slide","U-turn"],"teraTypes":["Dark"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Gunk Shot","Knock Off"],"teraTypes":["Dark","Poison","Steel"]}]},"palossand":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Hypnosis","Shadow Ball","Shore Up","Stealth Rock"],"teraTypes":["Water"]}]},"komala":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["Body Slam","Earthquake","Knock Off","Play Rough","Rapid Spin","Sucker Punch","Superpower","U-turn","Wood Hammer"],"teraTypes":["Dark","Fairy","Fighting","Grass","Ground"]}]},"mimikyu":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Drain Punch","Play Rough","Shadow Claw","Shadow Sneak","Swords Dance","Wood Hammer"],"teraTypes":["Fairy","Fighting","Ghost","Grass"]}]},"bruxish":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Crunch","Flip Turn","Ice Fang","Psychic Fangs","Swords Dance","Wave Crash"],"teraTypes":["Dark","Psychic"]}]},"kommoo":{"level":79,"sets":[{"role":"Fast Bulky Setup","movepool":["Boomburst","Clanging Scales","Clangorous Soul","Close Combat","Iron Head"],"teraTypes":["Normal","Steel"]},{"role":"Setup Sweeper","movepool":["Close Combat","Iron Head","Scale Shot","Swords Dance"],"teraTypes":["Steel"]}]},"magearna":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Aura Sphere","Flash Cannon","Fleur Cannon","Pain Split","Spikes","Volt Switch"],"teraTypes":["Fairy","Fighting","Water"]},{"role":"Bulky Setup","movepool":["Calm Mind","Flash Cannon","Fleur Cannon","Shift Gear"],"teraTypes":["Fairy","Flying","Steel","Water"]},{"role":"Tera Blast user","movepool":["Fleur Cannon","Iron Head","Shift Gear","Tera Blast","Thunderbolt"],"teraTypes":["Ground"]}]},"rillaboom":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Grassy Glide","High Horsepower","Knock Off","Swords Dance","U-turn","Wood Hammer"],"teraTypes":["Grass"]}]},"cinderace":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Court Change","Gunk Shot","High Jump Kick","Pyro Ball","Sucker Punch","U-turn"],"teraTypes":["Fighting","Fire","Poison"]}]},"inteleon":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Hydro Pump","Ice Beam","U-turn"],"teraTypes":["Water"]},{"role":"Wallbreaker","movepool":["Hydro Pump","Ice Beam","Scald","U-turn"],"teraTypes":["Water"]}]},"greedent":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Earthquake","Knock Off","Psychic Fangs","Swords Dance"],"teraTypes":["Ground","Psychic"]}]},"corviknight":{"level":80,"sets":[{"role":"Bulky Support","movepool":["Body Press","Brave Bird","Defog","Roost","U-turn"],"teraTypes":["Dragon"]}]},"drednaw":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Crunch","Earthquake","Liquidation","Shell Smash","Stone Edge"],"teraTypes":["Dark","Ground","Water"]}]},"coalossal":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Overheat","Rapid Spin","Spikes","Stealth Rock","Stone Edge","Will-O-Wisp"],"teraTypes":["Ghost","Grass","Water"]}]},"flapple":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Dragon Dance","Grav Apple","Outrage","Sucker Punch","U-turn"],"teraTypes":["Dragon","Grass"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Grav Apple","Outrage","Tera Blast"],"teraTypes":["Fire"]}]},"appletun":{"level":92,"sets":[{"role":"Bulky Support","movepool":["Apple Acid","Draco Meteor","Dragon Pulse","Leech Seed","Recover"],"teraTypes":["Grass","Steel"]}]},"sandaconda":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Coil","Earthquake","Glare","Rest","Stone Edge"],"teraTypes":["Dragon","Steel"]},{"role":"Bulky Support","movepool":["Earthquake","Glare","Rest","Stealth Rock","Stone Edge"],"teraTypes":["Dragon","Water"]},{"role":"Fast Bulky Setup","movepool":["Coil","Earthquake","Rock Blast","Scale Shot"],"teraTypes":["Dragon"]}]},"cramorant":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Defog","Roost","Surf"],"teraTypes":["Ground"]}]},"barraskewda":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Flip Turn","Poison Jab","Psychic Fangs","Waterfall"],"teraTypes":["Fighting"]}]},"toxtricity":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Overdrive","Sludge Bomb","Toxic Spikes","Volt Switch"],"teraTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["Boomburst","Gunk Shot","Overdrive","Shift Gear"],"teraTypes":["Normal"]}]},"polteageist":{"level":79,"sets":[{"role":"Tera Blast user","movepool":["Giga Drain","Shadow Ball","Shell Smash","Stored Power","Strength Sap","Tera Blast"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Giga Drain","Shadow Ball","Shell Smash","Stored Power","Strength Sap"],"teraTypes":["Psychic"]}]},"hatterene":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Mystical Fire","Psychic","Psyshock"],"teraTypes":["Fairy","Steel"]},{"role":"AV Pivot","movepool":["Draining Kiss","Mystical Fire","Nuzzle","Psychic"],"teraTypes":["Fairy","Steel"]}]},"grimmsnarl":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Light Screen","Parting Shot","Reflect","Spirit Break","Thunder Wave"],"teraTypes":["Fairy"]},{"role":"Fast Bulky Setup","movepool":["Bulk Up","Crunch","Rest","Spirit Break","Sucker Punch","Thunder Wave"],"teraTypes":["Dark"]},{"role":"Bulky Attacker","movepool":["Parting Shot","Spirit Break","Sucker Punch","Taunt","Thunder Wave"],"teraTypes":["Fairy"]}]},"perrserker":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Iron Head","Knock Off","Stealth Rock","U-turn"],"teraTypes":["Fighting","Steel"]}]},"falinks":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Iron Head","Knock Off","No Retreat"],"teraTypes":["Dark","Fighting","Ghost","Steel"]}]},"pincurchin":{"level":97,"sets":[{"role":"Bulky Attacker","movepool":["Discharge","Scald","Spikes","Sucker Punch","Toxic Spikes"],"teraTypes":["Ghost","Water"]}]},"frosmoth":{"level":83,"sets":[{"role":"Tera Blast user","movepool":["Bug Buzz","Giga Drain","Hurricane","Ice Beam","Quiver Dance","Tera Blast"],"teraTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Bug Buzz","Giga Drain","Hurricane","Ice Beam","Quiver Dance"],"teraTypes":["Water"]}]},"stonjourner":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Heat Crash","Rock Polish","Stealth Rock","Stone Edge"],"teraTypes":["Fire","Ground"]}]},"eiscue":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["Belly Drum","Ice Spinner","Iron Head","Liquidation","Substitute","Zen Headbutt"],"teraTypes":["Water"]},{"role":"Tera Blast user","movepool":["Belly Drum","Ice Spinner","Liquidation","Substitute","Tera Blast"],"teraTypes":["Ground"]}]},"indeedee":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Healing Wish","Hyper Voice","Psychic","Psyshock","Shadow Ball"],"teraTypes":["Fairy","Psychic"]}]},"indeedeef":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Healing Wish","Hyper Voice","Psychic","Psyshock","Shadow Ball"],"teraTypes":["Fairy","Psychic"]}]},"morpeko":{"level":86,"sets":[{"role":"Fast Support","movepool":["Aura Wheel","Parting Shot","Protect","Rapid Spin"],"teraTypes":["Dark","Electric"]},{"role":"Bulky Attacker","movepool":["Aura Wheel","Knock Off","Protect","Rapid Spin"],"teraTypes":["Electric"]}]},"copperajah":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Iron Head","Play Rough","Rock Slide","Stealth Rock","Superpower"],"teraTypes":["Fairy","Steel"]},{"role":"Bulky Attacker","movepool":["Earthquake","Heat Crash","Heavy Slam","Knock Off","Stone Edge","Superpower"],"teraTypes":["Fire","Steel"]}]},"dragapult":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Shadow Ball","Thunderbolt","U-turn"],"teraTypes":["Dragon","Fire","Ghost"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Dragon Darts","Fire Blast","Tera Blast"],"teraTypes":["Ghost"]}]},"zacian":{"level":69,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Play Rough","Psychic Fangs","Swords Dance","Wild Charge"],"teraTypes":["Fighting"]}]},"zaciancrowned":{"level":64,"sets":[{"role":"Setup Sweeper","movepool":["Behemoth Blade","Close Combat","Play Rough","Swords Dance"],"teraTypes":["Fighting"]}]},"zamazenta":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Crunch","Iron Head","Psychic Fangs","Stone Edge","Wild Charge"],"teraTypes":["Dark","Fighting"]},{"role":"Bulky Setup","movepool":["Body Press","Crunch","Iron Defense","Iron Head","Rest","Stone Edge"],"teraTypes":["Fighting"]}]},"zamazentacrowned":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Behemoth Bash","Body Press","Crunch","Iron Defense","Psychic Fangs","Stone Edge"],"teraTypes":["Fighting"]}]},"eternatus":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["Dynamax Cannon","Fire Blast","Recover","Sludge Bomb"],"teraTypes":["Dragon","Fire"]},{"role":"Bulky Support","movepool":["Dynamax Cannon","Flamethrower","Recover","Toxic","Toxic Spikes"],"teraTypes":["Dragon","Water"]}]},"urshifu":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Poison Jab","Sucker Punch","Swords Dance","U-turn","Wicked Blow"],"teraTypes":["Dark","Fighting"]}]},"urshifurapidstrike":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Ice Spinner","Surging Strikes","Swords Dance","U-turn"],"teraTypes":["Water"]}]},"zarude":{"level":78,"sets":[{"role":"Fast Bulky Setup","movepool":["Close Combat","Knock Off","Power Whip","Swords Dance","Synthesis"],"teraTypes":["Dark","Fighting","Grass"]},{"role":"Fast Attacker","movepool":["Close Combat","Knock Off","Power Whip","U-turn"],"teraTypes":["Dark","Fighting","Grass"]}]},"regieleki":{"level":78,"sets":[{"role":"Fast Support","movepool":["Explosion","Rapid Spin","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]},{"role":"Tera Blast user","movepool":["Rapid Spin","Tera Blast","Thunderbolt","Volt Switch"],"teraTypes":["Ice"]}]},"regidrago":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Dragon Dance","Earthquake","Fire Fang","Outrage"],"teraTypes":["Dragon"]},{"role":"Tera Blast user","movepool":["Dragon Claw","Dragon Dance","Earthquake","Tera Blast"],"teraTypes":["Steel"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Dragon Energy","Earthquake","Outrage"],"teraTypes":["Dragon"]}]},"glastrier":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Heavy Slam","High Horsepower","Icicle Crash","Swords Dance"],"teraTypes":["Fighting","Ground","Steel"]}]},"spectrier":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Draining Kiss","Nasty Plot","Shadow Ball","Substitute","Will-O-Wisp"],"teraTypes":["Dark","Fairy"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Shadow Ball","Substitute","Tera Blast","Will-O-Wisp"],"teraTypes":["Fighting"]}]},"calyrex":{"level":93,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Encore","Giga Drain","Leech Seed","Psychic","Psyshock"],"teraTypes":["Steel"]}]},"calyrexice":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Agility","Close Combat","Glacial Lance","High Horsepower"],"teraTypes":["Fighting","Ground"]},{"role":"Wallbreaker","movepool":["Close Combat","Glacial Lance","High Horsepower","Trick Room"],"teraTypes":["Fighting","Ground"]}]},"calyrexshadow":{"level":64,"sets":[{"role":"Fast Attacker","movepool":["Astral Barrage","Nasty Plot","Pollen Puff","Psyshock","Trick"],"teraTypes":["Dark","Ghost"]}]},"wyrdeer":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Earthquake","Megahorn","Psychic","Thunder Wave","Thunderbolt"],"teraTypes":["Ground"]}]},"kleavor":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Defog","Stone Axe","Swords Dance","U-turn","X-Scissor"],"teraTypes":["Bug","Fighting","Rock"]}]},"ursaluna":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Crunch","Facade","Headlong Rush","Swords Dance","Trailblaze"],"teraTypes":["Normal"]}]},"ursalunabloodmoon":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Blood Moon","Calm Mind","Earth Power","Moonlight"],"teraTypes":["Ghost","Normal","Poison"]}]},"enamorus":{"level":79,"sets":[{"role":"Tera Blast user","movepool":["Play Rough","Superpower","Taunt","Tera Blast"],"teraTypes":["Flying"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Earth Power","Moonblast","Substitute"],"teraTypes":["Ground"]}]},"enamorustherian":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Moonblast","Mystical Fire","Psychic","Superpower"],"teraTypes":["Fairy","Ground"]},{"role":"Bulky Setup","movepool":["Agility","Earth Power","Moonblast","Mystical Fire","Superpower"],"teraTypes":["Ground"]}]},"meowscarada":{"level":78,"sets":[{"role":"Fast Support","movepool":["Flower Trick","Knock Off","Play Rough","Toxic Spikes","U-turn"],"teraTypes":["Dark","Grass"]}]},"skeledirge":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Flame Charge","Shadow Ball","Slack Off","Torch Song"],"teraTypes":["Fire","Water"]},{"role":"Bulky Support","movepool":["Hex","Slack Off","Torch Song","Will-O-Wisp"],"teraTypes":["Ghost","Water"]}]},"quaquaval":{"level":79,"sets":[{"role":"Fast Support","movepool":["Aqua Step","Close Combat","Knock Off","Rapid Spin","Roost","U-turn"],"teraTypes":["Fighting","Water"]},{"role":"Setup Sweeper","movepool":["Aqua Step","Close Combat","Ice Spinner","Knock Off","Roost","Swords Dance"],"teraTypes":["Fighting","Water"]}]},"oinkologne":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Body Slam","Stuff Cheeks","Thief"],"teraTypes":["Fighting"]}]},"oinkolognef":{"level":93,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Body Slam","Stuff Cheeks","Thief"],"teraTypes":["Fighting"]}]},"spidops":{"level":96,"sets":[{"role":"Bulky Support","movepool":["Circle Throw","Knock Off","Spikes","Sticky Web","Toxic Spikes","U-turn"],"teraTypes":["Ghost"]}]},"lokix":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Axe Kick","First Impression","Leech Life","Sucker Punch"],"teraTypes":["Bug","Fighting"]},{"role":"Fast Attacker","movepool":["First Impression","Knock Off","Sucker Punch","U-turn"],"teraTypes":["Bug"]},{"role":"Setup Sweeper","movepool":["Knock Off","Leech Life","Sucker Punch","Swords Dance"],"teraTypes":["Dark"]}]},"pawmot":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Double Shock","Ice Punch","Revival Blessing","Volt Switch"],"teraTypes":["Electric"]},{"role":"Fast Support","movepool":["Close Combat","Ice Punch","Knock Off","Nuzzle","Revival Blessing","Thunder Punch"],"teraTypes":["Fighting"]}]},"maushold":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Bite","Encore","Population Bomb","Tidy Up"],"teraTypes":["Normal"]}]},"mausholdfour":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Bite","Encore","Population Bomb","Tidy Up"],"teraTypes":["Normal"]}]},"dachsbun":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Body Press","Play Rough","Protect","Wish"],"teraTypes":["Steel"]}]},"arboliva":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Dazzling Gleam","Earth Power","Energy Ball","Hyper Voice","Strength Sap"],"teraTypes":["Fairy","Grass","Ground"]},{"role":"Bulky Support","movepool":["Hyper Voice","Leech Seed","Protect","Substitute"],"teraTypes":["Water"]}]},"squawkabilly":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Facade","Protect","Quick Attack","U-turn"],"teraTypes":["Normal"]}]},"squawkabillywhite":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Double-Edge","Foul Play","Parting Shot","Quick Attack"],"teraTypes":["Dark","Flying","Normal"]}]},"squawkabillyblue":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Facade","Protect","Quick Attack","U-turn"],"teraTypes":["Normal"]}]},"squawkabillyyellow":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Double-Edge","Foul Play","Parting Shot","Quick Attack"],"teraTypes":["Dark","Flying","Normal"]}]},"garganacl":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Curse","Earthquake","Recover","Stone Edge"],"teraTypes":["Dragon","Fairy"]},{"role":"Bulky Attacker","movepool":["Earthquake","Protect","Recover","Salt Cure"],"teraTypes":["Dragon","Ghost"]},{"role":"Bulky Support","movepool":["Body Press","Iron Defense","Recover","Salt Cure","Stealth Rock"],"teraTypes":["Dragon","Ghost"]}]},"armarouge":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Armor Cannon","Aura Sphere","Energy Ball","Focus Blast","Psyshock"],"teraTypes":["Fighting","Fire","Grass","Psychic"]}]},"ceruledge":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["Bitter Blade","Close Combat","Poltergeist","Shadow Sneak","Swords Dance"],"teraTypes":["Fighting","Fire","Ghost"]}]},"bellibolt":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Muddy Water","Slack Off","Thunderbolt","Toxic","Volt Switch"],"teraTypes":["Electric","Water"]}]},"kilowattrel":{"level":83,"sets":[{"role":"Fast Support","movepool":["Hurricane","Roost","Thunder Wave","Thunderbolt","U-turn"],"teraTypes":["Electric","Flying"]}]},"mabosstiff":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Crunch","Fire Fang","Play Rough","Psychic Fangs","Wild Charge"],"teraTypes":["Dark","Fairy"]}]},"grafaiai":{"level":86,"sets":[{"role":"AV Pivot","movepool":["Gunk Shot","Knock Off","Super Fang","U-turn"],"teraTypes":["Dark"]},{"role":"Fast Support","movepool":["Encore","Gunk Shot","Knock Off","Parting Shot"],"teraTypes":["Dark"]}]},"brambleghast":{"level":88,"sets":[{"role":"Fast Support","movepool":["Poltergeist","Power Whip","Rapid Spin","Spikes","Strength Sap"],"teraTypes":["Fairy","Steel","Water"]},{"role":"Bulky Support","movepool":["Leech Seed","Poltergeist","Power Whip","Substitute"],"teraTypes":["Fairy","Steel","Water"]}]},"toedscruel":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Giga Drain","Knock Off","Leaf Storm","Rapid Spin","Spore","Toxic"],"teraTypes":["Water"]}]},"klawf":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["Crabhammer","High Horsepower","Knock Off","Stealth Rock","Stone Edge"],"teraTypes":["Dark","Ground","Rock","Water"]},{"role":"Setup Sweeper","movepool":["Crabhammer","High Horsepower","Knock Off","Stone Edge","Swords Dance"],"teraTypes":["Dark","Ground","Rock","Water"]}]},"scovillain":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["Flamethrower","Leech Seed","Protect","Substitute"],"teraTypes":["Steel","Water"]},{"role":"Fast Attacker","movepool":["Energy Ball","Flamethrower","Leaf Storm","Overheat"],"teraTypes":["Fire","Grass"]},{"role":"Wallbreaker","movepool":["Energy Ball","Fire Blast","Stomping Tantrum","Sunny Day"],"teraTypes":["Fire","Grass","Ground"]}]},"rabsca":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Bug Buzz","Earth Power","Psychic","Revival Blessing","Trick Room"],"teraTypes":["Steel"]}]},"espathra":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Lumina Crash","Shadow Ball","U-turn"],"teraTypes":["Fairy","Ghost","Psychic"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Protect","Roost","Stored Power","Substitute"],"teraTypes":["Fairy"]},{"role":"Tera Blast user","movepool":["Dazzling Gleam","Lumina Crash","Roost","Tera Blast"],"teraTypes":["Fighting","Fire"]}]},"tinkaton":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Gigaton Hammer","Knock Off","Play Rough","Stealth Rock","Thunder Wave"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Gigaton Hammer","Knock Off","Play Rough","Swords Dance"],"teraTypes":["Steel"]}]},"wugtrio":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Liquidation","Memento","Stomping Tantrum","Sucker Punch","Throat Chop"],"teraTypes":["Dark","Water"]}]},"bombirdier":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Hone Claws","Knock Off","Stone Edge","Sucker Punch","U-turn"],"teraTypes":["Rock"]}]},"palafin":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["Bulk Up","Close Combat","Flip Turn","Ice Punch","Jet Punch","Wave Crash"],"teraTypes":["Fighting","Water"]}]},"revavroom":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["Gunk Shot","High Horsepower","Iron Head","Shift Gear"],"teraTypes":["Ground"]}]},"cyclizar":{"level":83,"sets":[{"role":"Fast Support","movepool":["Draco Meteor","Knock Off","Rapid Spin","Shed Tail","Taunt"],"teraTypes":["Dragon","Ghost","Steel"]}]},"orthworm":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Coil","Iron Tail","Rest"],"teraTypes":["Electric","Fighting"]},{"role":"Bulky Support","movepool":["Body Press","Iron Head","Rest","Shed Tail","Spikes","Stealth Rock"],"teraTypes":["Electric","Poison"]}]},"glimmora":{"level":76,"sets":[{"role":"Fast Support","movepool":["Earth Power","Energy Ball","Mortal Spin","Power Gem","Sludge Wave","Spikes","Stealth Rock","Toxic"],"teraTypes":["Ground"]}]},"houndstone":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Poltergeist","Roar","Shadow Sneak","Trick","Will-O-Wisp"],"teraTypes":["Fighting"]},{"role":"Bulky Support","movepool":["Body Press","Poltergeist","Rest","Sleep Talk"],"teraTypes":["Fighting"]},{"role":"AV Pivot","movepool":["Body Press","Play Rough","Poltergeist","Shadow Sneak"],"teraTypes":["Fairy","Fighting"]}]},"flamigo":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Close Combat","Swords Dance","Throat Chop","U-turn"],"teraTypes":["Fighting"]}]},"cetitan":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Ice Shard","Icicle Crash","Liquidation","Play Rough"],"teraTypes":["Fairy","Water"]},{"role":"Bulky Setup","movepool":["Belly Drum","Earthquake","Ice Shard","Icicle Crash"],"teraTypes":["Ice"]}]},"veluza":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Aqua Cutter","Aqua Jet","Flip Turn","Night Slash","Psycho Cut"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Aqua Cutter","Fillet Away","Night Slash","Psycho Cut"],"teraTypes":["Dark","Psychic","Water"]}]},"dondozo":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Curse","Rest","Sleep Talk","Wave Crash"],"teraTypes":["Dragon","Fairy"]}]},"tatsugiri":{"level":86,"sets":[{"role":"Fast Support","movepool":["Draco Meteor","Hydro Pump","Nasty Plot","Rapid Spin","Surf"],"teraTypes":["Water"]}]},"farigiraf":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Hyper Voice","Protect","Wish"],"teraTypes":["Dark"]},{"role":"Bulky Attacker","movepool":["Future Sight","Hyper Voice","Protect","Wish"],"teraTypes":["Fairy","Ground","Water"]}]},"dudunsparce":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Glare","Headbutt","Roost"],"teraTypes":["Ghost","Ground"]},{"role":"Bulky Support","movepool":["Boomburst","Calm Mind","Earth Power","Roost","Shadow Ball"],"teraTypes":["Ghost"]}]},"dudunsparcethreesegment":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Glare","Headbutt","Roost"],"teraTypes":["Ghost","Ground"]},{"role":"Bulky Support","movepool":["Boomburst","Calm Mind","Earth Power","Roost","Shadow Ball"],"teraTypes":["Ghost"]}]},"kingambit":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["Iron Head","Kowtow Cleave","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Flying"]}]},"greattusk":{"level":77,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Close Combat","Earthquake","Ice Spinner","Rapid Spin"],"teraTypes":["Ground","Steel"]},{"role":"Bulky Support","movepool":["Close Combat","Headlong Rush","Ice Spinner","Knock Off","Rapid Spin","Stealth Rock"],"teraTypes":["Ground","Steel"]}]},"brutebonnet":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Crunch","Seed Bomb","Spore","Sucker Punch"],"teraTypes":["Dark","Fighting"]}]},"sandyshocks":{"level":80,"sets":[{"role":"Fast Support","movepool":["Earth Power","Spikes","Stealth Rock","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Grass","Ground"]}]},"screamtail":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Encore","Play Rough","Protect","Thunder Wave","Wish"],"teraTypes":["Poison","Steel"]}]},"fluttermane":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Moonblast","Mystical Fire","Psyshock","Shadow Ball","Thunderbolt"],"teraTypes":["Electric","Fairy","Fire","Ghost","Psychic"]}]},"slitherwing":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Close Combat","Earthquake","Flame Charge","Leech Life","Wild Charge"],"teraTypes":["Electric","Fighting"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","First Impression","Flare Blitz","U-turn","Wild Charge"],"teraTypes":["Bug","Electric","Fighting"]}]},"roaringmoon":{"level":73,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Iron Head","Knock Off","Outrage","Roost"],"teraTypes":["Dark","Dragon","Ground","Steel"]},{"role":"Bulky Attacker","movepool":["Iron Head","Knock Off","Outrage","U-turn"],"teraTypes":["Dark","Dragon","Steel"]}]},"walkingwake":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["Draco Meteor","Flamethrower","Flip Turn","Hydro Pump"],"teraTypes":["Fire","Water"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Flamethrower","Hydro Steam","Sunny Day"],"teraTypes":["Fire"]}]},"irontreads":{"level":77,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Iron Head","Knock Off","Rapid Spin","Stealth Rock","Volt Switch"],"teraTypes":["Ground","Steel"]}]},"ironmoth":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Discharge","Energy Ball","Fiery Dance","Fire Blast","Sludge Wave","U-turn"],"teraTypes":["Fire","Grass"]},{"role":"Fast Support","movepool":["Energy Ball","Fiery Dance","Morning Sun","Sludge Wave","Toxic Spikes","U-turn"],"teraTypes":["Fire","Grass"]}]},"ironhands":{"level":79,"sets":[{"role":"AV Pivot","movepool":["Close Combat","Drain Punch","Fake Out","Heavy Slam","Ice Punch","Thunder Punch","Volt Switch","Wild Charge"],"teraTypes":["Electric","Fighting"]},{"role":"Bulky Attacker","movepool":["Close Combat","Drain Punch","Ice Punch","Swords Dance","Thunder Punch","Wild Charge"],"teraTypes":["Fighting","Flying","Steel"]}]},"ironjugulis":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Earth Power","Fire Blast","Hurricane","Hydro Pump","U-turn"],"teraTypes":["Dark","Flying","Ground"]}]},"ironthorns":{"level":83,"sets":[{"role":"Fast Support","movepool":["Earthquake","Spikes","Stealth Rock","Stone Edge","Thunder Punch","Volt Switch"],"teraTypes":["Grass","Water"]},{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Ice Punch","Stone Edge","Wild Charge"],"teraTypes":["Grass","Ground","Rock"]}]},"ironbundle":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Encore","Flip Turn","Freeze-Dry","Hydro Pump","Ice Beam","Substitute"],"teraTypes":["Ice","Water"]}]},"ironvaliant":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Spirit Break","Swords Dance"],"teraTypes":["Dark","Fighting"]},{"role":"Fast Attacker","movepool":["Calm Mind","Close Combat","Moonblast","Psychic"],"teraTypes":["Fairy","Fighting"]}]},"ironleaves":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Leaf Blade","Psyblade","Swords Dance"],"teraTypes":["Fighting"]},{"role":"Wallbreaker","movepool":["Close Combat","Leaf Blade","Megahorn","Psyblade"],"teraTypes":["Fighting"]}]},"baxcalibur":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Glaive Rush","Ice Shard","Icicle Crash"],"teraTypes":["Dragon","Ground"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Glaive Rush","Icicle Crash"],"teraTypes":["Dragon","Ground"]},{"role":"Bulky Setup","movepool":["Earthquake","Icicle Spear","Scale Shot","Swords Dance"],"teraTypes":["Dragon","Ground"]}]},"gholdengo":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Make It Rain","Nasty Plot","Recover","Shadow Ball","Trick"],"teraTypes":["Ghost","Steel"]},{"role":"Bulky Attacker","movepool":["Make It Rain","Recover","Shadow Ball","Thunder Wave"],"teraTypes":["Dark","Steel","Water"]}]},"tinglu":{"level":78,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ruination","Spikes","Stealth Rock","Throat Chop","Whirlwind"],"teraTypes":["Ghost","Ground","Poison"]},{"role":"AV Pivot","movepool":["Body Press","Earthquake","Heavy Slam","Ruination","Stone Edge","Throat Chop"],"teraTypes":["Fighting","Ground","Poison","Steel"]}]},"chienpao":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Crunch","Ice Shard","Ice Spinner","Sacred Sword","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fighting","Ice"]}]},"wochien":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Giga Drain","Knock Off","Leech Seed","Protect","Ruination","Stun Spore"],"teraTypes":["Poison"]}]},"chiyu":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Fire Blast","Nasty Plot","Psychic","Will-O-Wisp"],"teraTypes":["Dark","Fire"]},{"role":"Fast Attacker","movepool":["Dark Pulse","Flamethrower","Overheat","Psychic"],"teraTypes":["Dark","Fire"]}]},"koraidon":{"level":65,"sets":[{"role":"Fast Attacker","movepool":["Collision Course","Flare Blitz","Outrage","U-turn"],"teraTypes":["Fire"]},{"role":"Setup Sweeper","movepool":["Collision Course","Flare Blitz","Scale Shot","Swords Dance"],"teraTypes":["Fire"]}]},"miraidon":{"level":65,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Draco Meteor","Electro Drift","Substitute"],"teraTypes":["Electric"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Electro Drift","Overheat","Volt Switch"],"teraTypes":["Electric"]}]},"dipplin":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Dragon Tail","Giga Drain","Recover","Sucker Punch"],"teraTypes":["Steel"]}]},"sinistcha":{"level":83,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Matcha Gotcha","Shadow Ball","Strength Sap"],"teraTypes":["Steel"]}]},"okidogi":{"level":77,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Gunk Shot","Knock Off"],"teraTypes":["Dark"]}]},"munkidori":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Nasty Plot","Psyshock","Sludge Wave","U-turn"],"teraTypes":["Fighting","Poison"]},{"role":"AV Pivot","movepool":["Fake Out","Psychic","Psyshock","Sludge Wave","U-turn"],"teraTypes":["Dark"]}]},"fezandipiti":{"level":81,"sets":[{"role":"AV Pivot","movepool":["Beat Up","Gunk Shot","Heat Wave","Play Rough","U-turn"],"teraTypes":["Dark","Steel","Water"]},{"role":"Bulky Attacker","movepool":["Beat Up","Double Kick","Gunk Shot","Play Rough","Roost","U-turn"],"teraTypes":["Dark","Steel","Water"]},{"role":"Tera Blast user","movepool":["Gunk Shot","Play Rough","Swords Dance","Tera Blast"],"teraTypes":["Ground"]}]},"ogerpon":{"level":80,"sets":[{"role":"Fast Support","movepool":["Ivy Cudgel","Knock Off","Spikes","Superpower","Synthesis","U-turn"],"teraTypes":["Grass"]},{"role":"Setup Sweeper","movepool":["Ivy Cudgel","Knock Off","Superpower","Swords Dance"],"teraTypes":["Grass"]}]},"ogerponwellspring":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Ivy Cudgel","Spikes","Synthesis","U-turn","Wood Hammer"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Knock Off","Play Rough","Power Whip","Swords Dance"],"teraTypes":["Water"]}]},"ogerponhearthflame":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Knock Off","Power Whip","Stomping Tantrum","Swords Dance"],"teraTypes":["Fire"]}]},"ogerponcornerstone":{"level":76,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Ivy Cudgel","Power Whip","Spikes","Superpower","Synthesis"],"teraTypes":["Rock"]},{"role":"Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Power Whip","Superpower","Swords Dance"],"teraTypes":["Rock"]}]}} as any;
/* eslint-enable */

/* eslint-disable */
const randomDoublesSetsJSON = {"charizard":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Heat Wave","Hurricane","Protect","Will-O-Wisp"],"teraTypes":["Fire","Ground"]}]},"arbok":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Coil","Gunk Shot","Knock Off","Protect","Stomping Tantrum"],"teraTypes":["Dark","Ground"]},{"role":"Doubles Bulky Attacker","movepool":["Dragon Tail","Glare","Gunk Shot","Knock Off","Toxic Spikes"],"teraTypes":["Dark"]}]},"pikachu":{"level":92,"sets":[{"role":"Doubles Support","movepool":["Encore","Fake Out","Grass Knot","Knock Off","Protect","Volt Tackle"],"teraTypes":["Electric","Grass"]}]},"raichu":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Encore","Fake Out","Grass Knot","Knock Off","Nuzzle","Thunderbolt"],"teraTypes":["Electric","Grass"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Tera Blast","Thunderbolt"],"teraTypes":["Ice"]}]},"raichualola":{"level":87,"sets":[{"role":"Choice Item user","movepool":["Focus Blast","Grass Knot","Psychic","Psyshock","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Fighting","Grass"]},{"role":"Doubles Setup Sweeper","movepool":["Nasty Plot","Protect","Psychic","Psyshock","Thunderbolt"],"teraTypes":["Dark","Electric","Flying"]}]},"sandslash":{"level":90,"sets":[{"role":"Doubles Setup Sweeper","movepool":["High Horsepower","Knock Off","Leech Life","Protect","Stone Edge","Swords Dance"],"teraTypes":["Bug","Dark","Rock"]},{"role":"Doubles Bulky Attacker","movepool":["High Horsepower","Knock Off","Rapid Spin","Rock Slide","Super Fang"],"teraTypes":["Grass","Water"]}]},"sandslashalola":{"level":89,"sets":[{"role":"Doubles Wallbreaker","movepool":["Drill Run","Ice Shard","Ice Spinner","Iron Head","Knock Off"],"teraTypes":["Flying","Water"]},{"role":"Doubles Setup Sweeper","movepool":["Ice Shard","Iron Head","Protect","Swords Dance"],"teraTypes":["Ice"]}]},"clefairy":{"level":96,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Heal Pulse","Helping Hand","Life Dew","Moonblast"],"teraTypes":["Fire","Steel","Water"]}]},"clefable":{"level":85,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Heal Pulse","Icy Wind","Knock Off","Life Dew","Moonblast","Thunder Wave"],"teraTypes":["Fire","Steel","Water"]},{"role":"Doubles Support","movepool":["Encore","Fire Blast","Follow Me","Heal Pulse","Helping Hand","Life Dew","Moonblast"],"teraTypes":["Fire","Steel","Water"]}]},"ninetales":{"level":83,"sets":[{"role":"Doubles Wallbreaker","movepool":["Flamethrower","Heat Wave","Overheat","Protect","Solar Beam"],"teraTypes":["Fire","Grass"]}]},"ninetalesalola":{"level":78,"sets":[{"role":"Doubles Support","movepool":["Aurora Veil","Blizzard","Moonblast","Protect"],"teraTypes":["Ice","Steel","Water"]}]},"wigglytuff":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Dazzling Gleam","Disable","Encore","Fire Blast","Heal Pulse","Helping Hand","Icy Wind","Thunder Wave"],"teraTypes":["Fire","Steel"]}]},"venomoth":{"level":88,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bug Buzz","Protect","Quiver Dance","Sleep Powder","Sludge Bomb"],"teraTypes":["Bug","Steel","Water"]}]},"dugtrio":{"level":87,"sets":[{"role":"Offensive Protect","movepool":["Helping Hand","Protect","Rock Slide","Stomping Tantrum","Sucker Punch"],"teraTypes":["Fire","Ghost","Ground"]}]},"dugtrioalola":{"level":88,"sets":[{"role":"Offensive Protect","movepool":["Iron Head","Protect","Rock Slide","Stomping Tantrum","Sucker Punch"],"teraTypes":["Fire","Steel","Water"]}]},"persian":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Covet","Fake Out","Feint","Foul Play","Helping Hand","Hypnosis","Icy Wind","Snarl","Taunt","U-turn"],"teraTypes":["Dark"]}]},"persianalola":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Fake Out","Foul Play","Helping Hand","Hypnosis","Knock Off","Parting Shot","Quash","Snarl","Taunt","Thunder Wave"],"teraTypes":["Poison"]}]},"golduck":{"level":89,"sets":[{"role":"Doubles Fast Attacker","movepool":["Encore","Grass Knot","Hydro Pump","Ice Beam","Icy Wind","Protect","Psyshock"],"teraTypes":["Grass","Water"]},{"role":"Offensive Protect","movepool":["Grass Knot","Hydro Pump","Ice Beam","Protect","Psyshock"],"teraTypes":["Grass","Water"]}]},"annihilape":{"level":78,"sets":[{"role":"Bulky Protect","movepool":["Bulk Up","Drain Punch","Protect","Rage Fist"],"teraTypes":["Fire","Steel","Water"]},{"role":"Choice Item user","movepool":["Close Combat","Final Gambit","Rage Fist","U-turn"],"teraTypes":["Fighting"]}]},"arcanine":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Howl","Morning Sun","Snarl","Will-O-Wisp"],"teraTypes":["Fighting","Normal","Steel","Water"]}]},"arcaninehisui":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Extreme Speed","Flare Blitz","Head Smash","Wild Charge"],"teraTypes":["Fire","Normal","Rock"]}]},"poliwrath":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Circle Throw","Close Combat","Icy Wind","Knock Off","Liquidation"],"teraTypes":["Dragon","Fire","Ground","Steel"]}]},"victreebel":{"level":90,"sets":[{"role":"Offensive Protect","movepool":["Knock Off","Power Whip","Protect","Sludge Bomb","Sucker Punch"],"teraTypes":["Dark","Grass"]}]},"golem":{"level":88,"sets":[{"role":"Doubles Wallbreaker","movepool":["Fire Punch","High Horsepower","Rock Slide","Stone Edge"],"teraTypes":["Fire","Grass"]}]},"golemalola":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Double-Edge","High Horsepower","Protect","Rock Slide","Thunder Wave"],"teraTypes":["Grass","Ground"]},{"role":"Doubles Wallbreaker","movepool":["Double-Edge","Explosion","High Horsepower","Rock Slide"],"teraTypes":["Grass","Ground"]}]},"slowbro":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Fire Blast","Heal Pulse","Helping Hand","Psyshock","Scald","Slack Off","Trick Room"],"teraTypes":["Dark","Grass"]},{"role":"Doubles Wallbreaker","movepool":["Fire Blast","Hydro Pump","Ice Beam","Psyshock","Scald","Trick Room"],"teraTypes":["Dark","Fire","Water"]}]},"slowbrogalar":{"level":85,"sets":[{"role":"Doubles Wallbreaker","movepool":["Fire Blast","Psychic","Shell Side Arm","Trick Room"],"teraTypes":["Dark","Fire","Poison"]}]},"muk":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Drain Punch","Gunk Shot","Haze","Helping Hand","Ice Punch","Knock Off","Poison Gas","Poison Jab","Shadow Sneak"],"teraTypes":["Dark"]}]},"mukalola":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Drain Punch","Gunk Shot","Helping Hand","Ice Punch","Knock Off","Poison Jab","Protect","Rock Tomb","Snarl"],"teraTypes":["Flying"]}]},"cloyster":{"level":85,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Hydro Pump","Icicle Spear","Protect","Rock Blast","Shell Smash"],"teraTypes":["Fire","Ice","Rock","Water"]}]},"gengar":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["Encore","Protect","Shadow Ball","Sludge Bomb"],"teraTypes":["Ghost"]},{"role":"Doubles Fast Attacker","movepool":["Focus Blast","Protect","Shadow Ball","Sludge Bomb","Trick"],"teraTypes":["Fighting","Ghost"]}]},"hypno":{"level":95,"sets":[{"role":"Doubles Support","movepool":["Encore","Helping Hand","Knock Off","Low Sweep","Poison Gas","Psychic"],"teraTypes":["Dark"]}]},"electrode":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Foul Play","Helping Hand","Light Screen","Taunt","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Flying"]},{"role":"Tera Blast user","movepool":["Protect","Tera Blast","Thunderbolt","Volt Switch"],"teraTypes":["Ice"]}]},"electrodehisui":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Energy Ball","Leaf Storm","Reflect","Taunt","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Steel"]},{"role":"Offensive Protect","movepool":["Foul Play","Leaf Storm","Protect","Thunderbolt","Volt Switch"],"teraTypes":["Dark","Electric","Grass","Steel"]}]},"weezing":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Clear Smog","Fire Blast","Gunk Shot","Poison Gas","Protect","Taunt","Will-O-Wisp"],"teraTypes":["Dark"]}]},"weezinggalar":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fire Blast","Gunk Shot","Haze","Poison Gas","Protect","Strange Steam","Taunt","Will-O-Wisp"],"teraTypes":["Dark","Steel"]}]},"scyther":{"level":82,"sets":[{"role":"Bulky Protect","movepool":["Bug Bite","Dual Wingbeat","Protect","Tailwind"],"teraTypes":["Flying","Steel"]}]},"tauros":{"level":83,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Double-Edge","High Horsepower","Lash Out","Stone Edge"],"teraTypes":["Fighting","Normal"]}]},"taurospaldeacombat":{"level":83,"sets":[{"role":"Bulky Protect","movepool":["Bulk Up","Protect","Raging Bull","Stone Edge"],"teraTypes":["Steel"]}]},"taurospaldeablaze":{"level":81,"sets":[{"role":"Bulky Protect","movepool":["Bulk Up","Close Combat","Protect","Raging Bull","Will-O-Wisp"],"teraTypes":["Fighting","Fire","Water"]},{"role":"Doubles Wallbreaker","movepool":["Close Combat","Flare Blitz","Rock Slide","Stone Edge","Wild Charge"],"teraTypes":["Fighting","Fire","Water"]}]},"taurospaldeaaqua":{"level":82,"sets":[{"role":"Bulky Protect","movepool":["Aqua Jet","Bulk Up","Close Combat","Liquidation","Protect"],"teraTypes":["Fire","Steel","Water"]},{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Close Combat","Wave Crash","Wild Charge","Zen Headbutt"],"teraTypes":["Fire","Steel","Water"]}]},"gyarados":{"level":82,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dragon Dance","Earthquake","Protect","Taunt","Waterfall"],"teraTypes":["Ground"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Protect","Tera Blast","Waterfall"],"teraTypes":["Flying"]},{"role":"Doubles Support","movepool":["Dragon Tail","Helping Hand","Icy Wind","Taunt","Thunder Wave","Waterfall"],"teraTypes":["Ground","Water"]}]},"ditto":{"level":91,"sets":[{"role":"Choice Item user","movepool":["Transform"],"teraTypes":["Bug","Dark","Dragon","Electric","Fairy","Fighting","Fire","Flying","Ghost","Grass","Ground","Ice","Normal","Poison","Psychic","Rock","Steel","Water"]}]},"vaporeon":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Icy Wind","Muddy Water","Protect","Scald","Wish","Yawn"],"teraTypes":["Dragon","Fire","Ground"]}]},"jolteon":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Fake Tears","Helping Hand","Protect","Shadow Ball","Thunder Wave","Thunderbolt"],"teraTypes":["Flying","Ghost"]},{"role":"Tera Blast user","movepool":["Calm Mind","Protect","Tera Blast","Thunderbolt"],"teraTypes":["Ice"]}]},"flareon":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Facade","Flare Blitz","Protect","Quick Attack"],"teraTypes":["Normal"]}]},"snorlax":{"level":83,"sets":[{"role":"Doubles Wallbreaker","movepool":["Crunch","Double-Edge","Hammer Arm","Heat Crash","High Horsepower"],"teraTypes":["Fire","Ghost","Ground"]},{"role":"Doubles Bulky Attacker","movepool":["Body Slam","Encore","Helping Hand","High Horsepower","Icy Wind","Recycle","Yawn"],"teraTypes":["Ghost","Ground"]},{"role":"Doubles Bulky Setup","movepool":["Body Slam","Crunch","Curse","High Horsepower","Protect","Recycle"],"teraTypes":["Ground","Poison"]}]},"articuno":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Freeze-Dry","Ice Beam","Protect","Roost","Tailwind"],"teraTypes":["Ground","Steel"]}]},"articunogalar":{"level":84,"sets":[{"role":"Doubles Fast Attacker","movepool":["Freezing Glare","Hurricane","Protect","Recover","Tailwind"],"teraTypes":["Flying","Ground","Steel"]}]},"zapdos":{"level":79,"sets":[{"role":"Doubles Support","movepool":["Hurricane","Protect","Roost","Tailwind","Thunderbolt"],"teraTypes":["Electric","Steel"]},{"role":"Doubles Fast Attacker","movepool":["Heat Wave","Hurricane","Protect","Tailwind","Thunderbolt"],"teraTypes":["Electric","Fire"]}]},"zapdosgalar":{"level":79,"sets":[{"role":"Doubles Fast Attacker","movepool":["Brave Bird","Close Combat","Knock Off","Protect","Tailwind","Thunderous Kick","U-turn"],"teraTypes":["Fighting"]}]},"moltres":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Fire Blast","Heat Wave","Protect","Roost","Tailwind"],"teraTypes":["Fire","Ground"]}]},"moltresgalar":{"level":76,"sets":[{"role":"Doubles Bulky Setup","movepool":["Fiery Wrath","Hurricane","Nasty Plot","Protect","Tailwind"],"teraTypes":["Dark"]}]},"dragonite":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Dragon Claw","Extreme Speed","Fire Punch","Iron Head","Low Kick","Scale Shot","Stomping Tantrum"],"teraTypes":["Normal"]},{"role":"Tera Blast user","movepool":["Draco Meteor","Fire Punch","Low Kick","Roost","Tailwind","Tera Blast"],"teraTypes":["Flying"]}]},"mewtwo":{"level":73,"sets":[{"role":"Doubles Fast Attacker","movepool":["Aura Sphere","Dark Pulse","Fire Blast","Nasty Plot","Protect","Psystrike","Recover"],"teraTypes":["Dark","Fighting","Fire","Psychic"]}]},"mew":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Encore","Helping Hand","Pollen Puff","Tailwind","Thunder Wave","Toxic Spikes","Will-O-Wisp"],"teraTypes":["Fairy","Steel"]},{"role":"Doubles Setup Sweeper","movepool":["Baton Pass","Fire Blast","Nasty Plot","Pollen Puff","Psychic"],"teraTypes":["Fairy","Steel"]}]},"typhlosion":{"level":81,"sets":[{"role":"Choice Item user","movepool":["Eruption","Fire Blast","Focus Blast","Heat Wave"],"teraTypes":["Fire"]}]},"typhlosionhisui":{"level":78,"sets":[{"role":"Choice Item user","movepool":["Eruption","Focus Blast","Heat Wave","Shadow Ball"],"teraTypes":["Fire"]}]},"furret":{"level":94,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Double-Edge","Knock Off","Protect","Tidy Up"],"teraTypes":["Normal"]},{"role":"Doubles Support","movepool":["Body Slam","Follow Me","Helping Hand","Knock Off","Protect","U-turn"],"teraTypes":["Ghost"]}]},"noctowl":{"level":91,"sets":[{"role":"Offensive Protect","movepool":["Hurricane","Hyper Voice","Protect","Tailwind"],"teraTypes":["Flying"]}]},"ariados":{"level":93,"sets":[{"role":"Doubles Support","movepool":["Megahorn","Protect","Rage Powder","Sticky Web"],"teraTypes":["Dark","Steel","Water"]}]},"ampharos":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Dragon Tail","Electroweb","Focus Blast","Helping Hand","Thunder Wave","Thunderbolt"],"teraTypes":["Flying"]}]},"azumarill":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Ice Spinner","Knock Off","Liquidation","Play Rough","Superpower"],"teraTypes":["Water"]}]},"sudowoodo":{"level":92,"sets":[{"role":"Doubles Wallbreaker","movepool":["Head Smash","High Horsepower","Protect","Sucker Punch","Wood Hammer"],"teraTypes":["Grass","Steel"]}]},"politoed":{"level":85,"sets":[{"role":"Choice Item user","movepool":["Hydro Pump","Ice Beam","Muddy Water","Weather Ball"],"teraTypes":["Water"]},{"role":"Doubles Support","movepool":["Encore","Helping Hand","Hypnosis","Icy Wind","Muddy Water"],"teraTypes":["Grass","Steel"]}]},"jumpluff":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Encore","Helping Hand","Pollen Puff","Rage Powder","Sleep Powder","Strength Sap","Tailwind"],"teraTypes":["Steel"]},{"role":"Bulky Protect","movepool":["Acrobatics","Protect","Sleep Powder","Tailwind"],"teraTypes":["Steel"]}]},"sunflora":{"level":100,"sets":[{"role":"Offensive Protect","movepool":["Dazzling Gleam","Earth Power","Leaf Storm","Protect","Sludge Bomb"],"teraTypes":["Fairy","Ground","Poison"]}]},"quagsire":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Helping Hand","High Horsepower","Liquidation","Stealth Rock","Yawn"],"teraTypes":["Fire","Poison","Steel"]}]},"clodsire":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Gunk Shot","Helping Hand","High Horsepower","Recover","Toxic Spikes"],"teraTypes":["Flying","Ground","Steel"]}]},"espeon":{"level":85,"sets":[{"role":"Offensive Protect","movepool":["Dazzling Gleam","Protect","Psychic","Shadow Ball"],"teraTypes":["Fairy"]}]},"umbreon":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Foul Play","Helping Hand","Moonlight","Snarl","Thunder Wave"],"teraTypes":["Poison"]}]},"murkrow":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Haze","Protect","Tailwind","Taunt"],"teraTypes":["Ghost","Steel"]}]},"slowking":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Chilly Reception","Fire Blast","Heal Pulse","Helping Hand","Psyshock","Scald","Slack Off","Trick Room"],"teraTypes":["Dark","Grass","Steel"]},{"role":"Doubles Wallbreaker","movepool":["Fire Blast","Hydro Pump","Ice Beam","Psyshock","Scald","Trick Room"],"teraTypes":["Fire","Water"]}]},"slowkinggalar":{"level":85,"sets":[{"role":"Doubles Wallbreaker","movepool":["Fire Blast","Protect","Psyshock","Sludge Bomb","Trick Room"],"teraTypes":["Dark","Poison"]}]},"forretress":{"level":89,"sets":[{"role":"Choice Item user","movepool":["Body Press","Explosion","Iron Head","Lunge"],"teraTypes":["Fighting","Fire"]}]},"qwilfish":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Flip Turn","Gunk Shot","Icy Wind","Taunt","Thunder Wave","Toxic Spikes"],"teraTypes":["Grass"]}]},"qwilfishhisui":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Crunch","Gunk Shot","Icy Wind","Toxic Spikes"],"teraTypes":["Flying"]}]},"overqwil":{"level":82,"sets":[{"role":"Doubles Fast Attacker","movepool":["Crunch","Gunk Shot","Liquidation","Protect","Swords Dance"],"teraTypes":["Dark","Flying","Poison","Water"]}]},"scizor":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Bullet Punch","Close Combat","Tailwind","U-turn"],"teraTypes":["Fire","Water"]},{"role":"Doubles Bulky Setup","movepool":["Bug Bite","Bullet Punch","Close Combat","Protect","Swords Dance"],"teraTypes":["Steel"]},{"role":"Choice Item user","movepool":["Bug Bite","Bullet Punch","Close Combat","Knock Off"],"teraTypes":["Fighting","Steel","Water"]}]},"heracross":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Facade","Knock Off","Protect"],"teraTypes":["Normal"]},{"role":"Choice Item user","movepool":["Close Combat","Knock Off","Megahorn","Rock Slide"],"teraTypes":["Bug","Fighting","Rock"]}]},"magcargo":{"level":91,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Heat Wave","Power Gem","Protect","Shell Smash"],"teraTypes":["Fairy","Fire","Grass"]}]},"delibird":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Fake Out","Helping Hand","Icy Wind","Tailwind"],"teraTypes":["Steel"]},{"role":"Doubles Wallbreaker","movepool":["Brave Bird","Drill Run","Foul Play","Ice Shard","Ice Spinner"],"teraTypes":["Dark","Flying","Ground","Ice"]}]},"houndoom":{"level":87,"sets":[{"role":"Doubles Fast Attacker","movepool":["Dark Pulse","Heat Wave","Nasty Plot","Protect","Sucker Punch"],"teraTypes":["Dark","Fire","Ghost","Water"]}]},"donphan":{"level":86,"sets":[{"role":"Doubles Support","movepool":["High Horsepower","Ice Shard","Knock Off","Rapid Spin","Stone Edge"],"teraTypes":["Dragon","Water"]}]},"blissey":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Heal Pulse","Helping Hand","Seismic Toss","Soft-Boiled","Thunder Wave"],"teraTypes":["Fairy","Ghost","Poison"]}]},"tyranitar":{"level":81,"sets":[{"role":"Doubles Bulky Setup","movepool":["Dragon Dance","High Horsepower","Knock Off","Protect","Rock Slide","Stone Edge"],"teraTypes":["Ghost","Rock","Steel"]},{"role":"Doubles Support","movepool":["Fire Blast","High Horsepower","Icy Wind","Knock Off","Protect","Rock Slide","Stone Edge"],"teraTypes":["Flying","Steel"]}]},"mightyena":{"level":93,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Crunch","Howl","Play Rough","Sucker Punch"],"teraTypes":["Dark","Fairy"]}]},"ludicolo":{"level":89,"sets":[{"role":"Offensive Protect","movepool":["Energy Ball","Hydro Pump","Protect","Rain Dance"],"teraTypes":["Water"]},{"role":"Doubles Support","movepool":["Fake Out","Hydro Pump","Ice Beam","Icy Wind","Leaf Storm"],"teraTypes":["Poison","Steel"]}]},"shiftry":{"level":84,"sets":[{"role":"Doubles Fast Attacker","movepool":["Fake Out","Knock Off","Leaf Blade","Tailwind"],"teraTypes":["Ghost"]},{"role":"Offensive Protect","movepool":["Knock Off","Leaf Blade","Protect","Tailwind"],"teraTypes":["Ghost"]}]},"pelipper":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Hurricane","Hydro Pump","Roost","Tailwind","Wide Guard"],"teraTypes":["Ground"]}]},"gardevoir":{"level":84,"sets":[{"role":"Choice Item user","movepool":["Dazzling Gleam","Moonblast","Mystical Fire","Psychic","Psyshock","Trick"],"teraTypes":["Fairy","Fire","Steel"]}]},"masquerain":{"level":88,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Baton Pass","Bug Buzz","Hurricane","Hydro Pump","Quiver Dance"],"teraTypes":["Water"]},{"role":"Doubles Support","movepool":["Bug Buzz","Hurricane","Sticky Web","Tailwind"],"teraTypes":["Ground"]}]},"breloom":{"level":82,"sets":[{"role":"Doubles Fast Attacker","movepool":["Bullet Seed","Close Combat","Mach Punch","Protect","Rock Tomb","Spore"],"teraTypes":["Fighting"]}]},"slaking":{"level":87,"sets":[{"role":"Doubles Wallbreaker","movepool":["Body Slam","Giga Impact","High Horsepower","Knock Off"],"teraTypes":["Ghost","Normal"]}]},"hariyama":{"level":86,"sets":[{"role":"Doubles Wallbreaker","movepool":["Bullet Punch","Close Combat","Facade","Fake Out","Headlong Rush","Knock Off"],"teraTypes":["Normal"]},{"role":"Doubles Bulky Attacker","movepool":["Bullet Punch","Close Combat","Fake Out","Feint","Heavy Slam","Knock Off"],"teraTypes":["Steel"]}]},"sableye":{"level":92,"sets":[{"role":"Doubles Support","movepool":["Disable","Encore","Fake Out","Foul Play","Knock Off","Quash","Recover","Will-O-Wisp"],"teraTypes":["Steel"]}]},"medicham":{"level":86,"sets":[{"role":"Choice Item user","movepool":["Bullet Punch","Close Combat","Ice Punch","Poison Jab","Zen Headbutt"],"teraTypes":["Fighting","Fire"]},{"role":"Doubles Fast Attacker","movepool":["Bullet Punch","Close Combat","Ice Punch","Protect","Zen Headbutt"],"teraTypes":["Fighting","Fire"]}]},"volbeat":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Encore","Lunge","Tailwind","Thunder Wave"],"teraTypes":["Steel","Water"]}]},"illumise":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Bug Buzz","Encore","Tailwind","Thunder Wave"],"teraTypes":["Steel","Water"]}]},"swalot":{"level":90,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Encore","Gunk Shot","Helping Hand","Knock Off","Poison Gas","Thunder Wave","Toxic Spikes"],"teraTypes":["Dark"]}]},"camerupt":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Earth Power","Heat Wave","Helping Hand","Protect","Stealth Rock"],"teraTypes":["Water"]}]},"torkoal":{"level":85,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Fire Blast","Heat Wave","Protect","Solar Beam","Will-O-Wisp"],"teraTypes":["Dragon","Grass"]}]},"grumpig":{"level":90,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dazzling Gleam","Earth Power","Nasty Plot","Psychic","Psyshock"],"teraTypes":["Fairy","Ground"]}]},"cacturne":{"level":91,"sets":[{"role":"Offensive Protect","movepool":["Knock Off","Leaf Storm","Spiky Shield","Sucker Punch"],"teraTypes":["Dark","Poison"]}]},"altaria":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Draco Meteor","Fire Blast","Helping Hand","Roost","Tailwind","Will-O-Wisp"],"teraTypes":["Steel"]},{"role":"Bulky Protect","movepool":["Brave Bird","Protect","Roost","Will-O-Wisp"],"teraTypes":["Steel"]}]},"zangoose":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Facade","Knock Off","Protect","Quick Attack"],"teraTypes":["Normal"]}]},"seviper":{"level":93,"sets":[{"role":"Offensive Protect","movepool":["Flamethrower","Glare","Gunk Shot","Knock Off","Protect"],"teraTypes":["Dark","Fire","Poison"]}]},"whiscash":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Helping Hand","High Horsepower","Icy Wind","Muddy Water","Stealth Rock"],"teraTypes":["Fire","Steel"]}]},"crawdaunt":{"level":85,"sets":[{"role":"Choice Item user","movepool":["Aqua Jet","Close Combat","Crabhammer","Knock Off"],"teraTypes":["Fighting"]},{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Crabhammer","Knock Off","Protect"],"teraTypes":["Water"]}]},"milotic":{"level":82,"sets":[{"role":"Bulky Protect","movepool":["Coil","Hypnosis","Recover","Scald"],"teraTypes":["Dragon","Grass","Steel"]},{"role":"Doubles Support","movepool":["Dragon Tail","Icy Wind","Protect","Recover","Scald"],"teraTypes":["Dragon","Grass","Steel"]}]},"banette":{"level":91,"sets":[{"role":"Doubles Wallbreaker","movepool":["Gunk Shot","Poltergeist","Protect","Shadow Sneak"],"teraTypes":["Ghost","Poison"]}]},"tropius":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Hurricane","Leaf Storm","Tailwind","Wide Guard"],"teraTypes":["Steel"]}]},"chimecho":{"level":94,"sets":[{"role":"Doubles Support","movepool":["Disable","Encore","Helping Hand","Icy Wind","Knock Off","Protect","Psychic","Snarl","Taunt"],"teraTypes":["Dark","Steel"]}]},"glalie":{"level":94,"sets":[{"role":"Doubles Support","movepool":["Disable","Foul Play","Freeze-Dry","Helping Hand","Icy Wind","Protect"],"teraTypes":["Poison","Steel"]}]},"luvdisc":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Charm","Flip Turn","Hydro Pump","Icy Wind"],"teraTypes":["Dragon"]}]},"salamence":{"level":80,"sets":[{"role":"Doubles Fast Attacker","movepool":["Draco Meteor","Dual Wingbeat","Fire Blast","Protect","Tailwind"],"teraTypes":["Dragon","Fire","Flying","Steel"]}]},"kyogre":{"level":65,"sets":[{"role":"Choice Item user","movepool":["Ice Beam","Origin Pulse","Thunder","Water Spout"],"teraTypes":["Water"]}]},"groudon":{"level":71,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Heat Crash","Precipice Blades","Protect","Stone Edge","Thunder Wave"],"teraTypes":["Fire"]},{"role":"Doubles Bulky Setup","movepool":["Heat Crash","Precipice Blades","Stone Edge","Swords Dance"],"teraTypes":["Fire"]}]},"rayquaza":{"level":75,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dragon Ascent","Dragon Dance","Earthquake","Extreme Speed","Swords Dance"],"teraTypes":["Normal"]},{"role":"Offensive Protect","movepool":["Draco Meteor","Dragon Ascent","Earth Power","Fire Blast","Protect"],"teraTypes":["Fire","Flying","Ground"]}]},"jirachi":{"level":79,"sets":[{"role":"Doubles Support","movepool":["Iron Head","Life Dew","Protect","Thunder Wave","U-turn"],"teraTypes":["Dark","Water"]},{"role":"Choice Item user","movepool":["Iron Head","Psychic","Thunderbolt","Trick","U-turn"],"teraTypes":["Steel"]}]},"torterra":{"level":81,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Headlong Rush","Protect","Shell Smash","Wood Hammer"],"teraTypes":["Fire","Ground"]}]},"infernape":{"level":83,"sets":[{"role":"Doubles Fast Attacker","movepool":["Close Combat","Fake Out","Knock Off","Overheat","Protect"],"teraTypes":["Dark","Fighting","Fire"]}]},"empoleon":{"level":81,"sets":[{"role":"Offensive Protect","movepool":["Flash Cannon","Hydro Pump","Ice Beam","Protect"],"teraTypes":["Flying","Grass"]},{"role":"Doubles Bulky Attacker","movepool":["Flash Cannon","Flip Turn","Hydro Pump","Ice Beam","Icy Wind","Knock Off"],"teraTypes":["Flying","Grass"]}]},"staraptor":{"level":80,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Close Combat","Double-Edge","Protect","Quick Attack"],"teraTypes":["Fighting","Flying"]},{"role":"Choice Item user","movepool":["Brave Bird","Close Combat","Double-Edge","Final Gambit"],"teraTypes":["Fighting","Flying","Normal"]}]},"kricketune":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Bug Bite","Helping Hand","Knock Off","Sticky Web","Taunt"],"teraTypes":["Bug","Steel"]}]},"luxray":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Crunch","Play Rough","Snarl","Volt Switch","Wild Charge"],"teraTypes":["Dark","Fairy","Flying"]}]},"vespiquen":{"level":99,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Hurricane","Pollen Puff","Roost","Toxic Spikes"],"teraTypes":["Steel"]}]},"pachirisu":{"level":94,"sets":[{"role":"Doubles Support","movepool":["Encore","Follow Me","Helping Hand","Nuzzle","Super Fang","Thunderbolt"],"teraTypes":["Flying","Water"]}]},"floatzel":{"level":86,"sets":[{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Crunch","Ice Spinner","Protect","Wave Crash"],"teraTypes":["Water"]}]},"gastrodon":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Clear Smog","Earth Power","Helping Hand","Icy Wind","Muddy Water","Recover"],"teraTypes":["Fire"]}]},"ambipom":{"level":87,"sets":[{"role":"Doubles Fast Attacker","movepool":["Double Hit","Fake Out","Knock Off","Protect"],"teraTypes":["Normal"]}]},"drifblim":{"level":86,"sets":[{"role":"Doubles Support","movepool":["Shadow Ball","Strength Sap","Tailwind","Will-O-Wisp"],"teraTypes":["Fairy","Ghost","Ground"]}]},"mismagius":{"level":86,"sets":[{"role":"Doubles Wallbreaker","movepool":["Dazzling Gleam","Mystical Fire","Protect","Shadow Ball","Taunt","Thunderbolt","Trick","Will-O-Wisp"],"teraTypes":["Electric","Fairy"]}]},"honchkrow":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Heat Wave","Protect","Sucker Punch","Tailwind"],"teraTypes":["Dark","Fire","Flying"]}]},"skuntank":{"level":87,"sets":[{"role":"Doubles Fast Attacker","movepool":["Fire Blast","Gunk Shot","Knock Off","Poison Gas","Protect","Sucker Punch","Taunt","Toxic Spikes"],"teraTypes":["Dark","Flying"]}]},"bronzong":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Body Press","Iron Defense","Iron Head","Trick Room"],"teraTypes":["Fighting"]}]},"spiritomb":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Foul Play","Helping Hand","Icy Wind","Shadow Sneak","Will-O-Wisp"],"teraTypes":["Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Foul Play","Snarl","Trick Room","Will-O-Wisp"],"teraTypes":["Steel"]}]},"garchomp":{"level":79,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Earthquake","Protect","Rock Slide","Scale Shot","Swords Dance"],"teraTypes":["Dragon","Fire"]}]},"lucario":{"level":85,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Extreme Speed","Meteor Mash","Protect"],"teraTypes":["Normal"]},{"role":"Doubles Setup Sweeper","movepool":["Aura Sphere","Flash Cannon","Nasty Plot","Protect","Vacuum Wave"],"teraTypes":["Fighting","Steel"]}]},"hippowdon":{"level":85,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","High Horsepower","Slack Off","Stealth Rock","Stone Edge","Whirlwind"],"teraTypes":["Rock","Steel"]}]},"toxicroak":{"level":85,"sets":[{"role":"Doubles Fast Attacker","movepool":["Close Combat","Fake Out","Gunk Shot","Protect","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fighting","Poison"]}]},"lumineon":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Encore","Helping Hand","Hydro Pump","Icy Wind","Tailwind","Tickle"],"teraTypes":["Fire","Ground"]}]},"abomasnow":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Aurora Veil","Blizzard","Ice Shard","Protect","Wood Hammer"],"teraTypes":["Ice","Water"]}]},"weavile":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Fake Out","Ice Shard","Ice Spinner","Knock Off","Low Kick","Protect"],"teraTypes":["Dark","Fighting","Ghost","Ice"]}]},"sneasler":{"level":79,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Dire Claw","Fake Out","Gunk Shot","Switcheroo","U-turn"],"teraTypes":["Dark","Fighting","Poison"]}]},"magnezone":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Electroweb","Flash Cannon","Protect","Thunderbolt","Volt Switch"],"teraTypes":["Flying"]}]},"yanmega":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Air Slash","Bug Buzz","Giga Drain","U-turn"],"teraTypes":["Bug"]},{"role":"Tera Blast user","movepool":["Air Slash","Bug Buzz","Protect","Tera Blast"],"teraTypes":["Ground"]}]},"leafeon":{"level":90,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Double-Edge","Knock Off","Leaf Blade","Protect","Swords Dance","Synthesis"],"teraTypes":["Normal"]}]},"glaceon":{"level":87,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Blizzard","Calm Mind","Freeze-Dry","Shadow Ball"],"teraTypes":["Ghost","Ice"]},{"role":"Tera Blast user","movepool":["Blizzard","Calm Mind","Freeze-Dry","Tera Blast"],"teraTypes":["Fire","Ground"]}]},"gliscor":{"level":82,"sets":[{"role":"Bulky Protect","movepool":["Dual Wingbeat","High Horsepower","Knock Off","Protect","Toxic","Toxic Spikes"],"teraTypes":["Water"]},{"role":"Doubles Bulky Setup","movepool":["Earthquake","Facade","Protect","Swords Dance"],"teraTypes":["Normal"]}]},"mamoswine":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["High Horsepower","Ice Shard","Icicle Crash","Protect"],"teraTypes":["Ground","Ice","Water"]}]},"gallade":{"level":83,"sets":[{"role":"Doubles Wallbreaker","movepool":["Leaf Blade","Night Slash","Protect","Psycho Cut","Sacred Sword","Swords Dance"],"teraTypes":["Dark","Fighting","Grass"]}]},"probopass":{"level":90,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Flash Cannon","Iron Defense","Rest","Thunder Wave"],"teraTypes":["Fighting"]}]},"dusknoir":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Leech Life","Poltergeist","Trick Room","Will-O-Wisp"],"teraTypes":["Dark"]}]},"froslass":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Destiny Bond","Ice Beam","Icy Wind","Poltergeist","Spikes","Taunt","Will-O-Wisp"],"teraTypes":["Ghost","Water"]}]},"rotom":{"level":88,"sets":[{"role":"Offensive Protect","movepool":["Nasty Plot","Protect","Shadow Ball","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric"]}]},"rotomwash":{"level":84,"sets":[{"role":"Bulky Protect","movepool":["Hydro Pump","Protect","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric"]}]},"rotomheat":{"level":84,"sets":[{"role":"Bulky Protect","movepool":["Overheat","Protect","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Steel"]}]},"rotomfrost":{"level":84,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Blizzard","Nasty Plot","Protect","Thunderbolt","Will-O-Wisp"],"teraTypes":["Electric","Ice"]}]},"rotomfan":{"level":84,"sets":[{"role":"Bulky Protect","movepool":["Air Slash","Protect","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Steel"]}]},"rotommow":{"level":85,"sets":[{"role":"Bulky Protect","movepool":["Leaf Storm","Protect","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric","Poison","Steel"]}]},"uxie":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Encore","Helping Hand","Knock Off","Mystical Power","Stealth Rock","Thunder Wave","U-turn"],"teraTypes":["Dark","Poison","Steel"]}]},"mesprit":{"level":86,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dazzling Gleam","Nasty Plot","Protect","Psychic","Thunderbolt"],"teraTypes":["Electric","Fairy","Psychic"]},{"role":"Choice Item user","movepool":["Ice Beam","Mystical Power","Psychic","Thunderbolt","U-turn"],"teraTypes":["Electric","Psychic"]}]},"azelf":{"level":82,"sets":[{"role":"Doubles Fast Attacker","movepool":["Dazzling Gleam","Energy Ball","Fire Blast","Nasty Plot","Psychic","Psyshock","U-turn"],"teraTypes":["Fairy","Fire"]},{"role":"Offensive Protect","movepool":["Dazzling Gleam","Fire Blast","Nasty Plot","Protect","Psychic","Psyshock","Thunderbolt"],"teraTypes":["Electric","Fairy","Fire"]}]},"dialga":{"level":74,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Heavy Slam","Protect","Thunder Wave"],"teraTypes":["Dragon","Fire","Flying","Steel"]}]},"dialgaorigin":{"level":74,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Flash Cannon","Protect","Thunder Wave"],"teraTypes":["Dragon","Fire","Flying"]}]},"palkia":{"level":74,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend"],"teraTypes":["Dragon","Fire","Steel","Water"]},{"role":"Doubles Fast Attacker","movepool":["Fire Blast","Hydro Pump","Protect","Spacial Rend","Thunder Wave"],"teraTypes":["Dragon","Fire","Steel","Water"]}]},"palkiaorigin":{"level":72,"sets":[{"role":"Doubles Fast Attacker","movepool":["Fire Blast","Hydro Pump","Protect","Spacial Rend","Thunder Wave"],"teraTypes":["Dragon","Fire","Steel","Water"]}]},"heatran":{"level":78,"sets":[{"role":"Bulky Protect","movepool":["Earth Power","Flash Cannon","Heat Wave","Protect"],"teraTypes":["Fire","Grass","Steel"]},{"role":"Tera Blast user","movepool":["Earth Power","Flash Cannon","Heat Wave","Protect","Tera Blast"],"teraTypes":["Grass"]}]},"giratina":{"level":76,"sets":[{"role":"Bulky Protect","movepool":["Aura Sphere","Calm Mind","Protect","Shadow Ball"],"teraTypes":["Fairy","Fighting"]},{"role":"Doubles Support","movepool":["Dragon Tail","Icy Wind","Rest","Shadow Ball","Will-O-Wisp"],"teraTypes":["Fairy"]}]},"giratinaorigin":{"level":76,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Aura Sphere","Draco Meteor","Poltergeist","Shadow Force","Will-O-Wisp"],"teraTypes":["Dragon","Fairy","Ghost","Poison"]}]},"cresselia":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Icy Wind","Lunar Blessing","Psychic","Thunder Wave"],"teraTypes":["Electric","Fire","Poison","Steel"]}]},"phione":{"level":90,"sets":[{"role":"Bulky Protect","movepool":["Ice Beam","Protect","Scald","Take Heart"],"teraTypes":["Dragon","Grass","Steel"]}]},"manaphy":{"level":78,"sets":[{"role":"Bulky Protect","movepool":["Ice Beam","Protect","Scald","Tail Glow"],"teraTypes":["Grass","Steel","Water"]},{"role":"Doubles Bulky Setup","movepool":["Energy Ball","Hydro Pump","Ice Beam","Protect","Scald","Tail Glow"],"teraTypes":["Grass"]}]},"darkrai":{"level":78,"sets":[{"role":"Offensive Protect","movepool":["Dark Pulse","Focus Blast","Protect","Sludge Bomb"],"teraTypes":["Poison"]}]},"shaymin":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Earth Power","Protect","Seed Flare","Synthesis","Tailwind"],"teraTypes":["Grass","Ground","Steel"]}]},"shayminsky":{"level":77,"sets":[{"role":"Offensive Protect","movepool":["Air Slash","Earth Power","Protect","Seed Flare","Tailwind"],"teraTypes":["Flying","Steel","Water"]}]},"arceus":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Phantom Force","Swords Dance"],"teraTypes":["Ghost","Normal"]}]},"arceusbug":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Stomping Tantrum","Swords Dance","X-Scissor"],"teraTypes":["Normal"]}]},"arceusdark":{"level":71,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Gunk Shot","Judgment","Recover","Tailwind"],"teraTypes":["Poison"]}]},"arceusdragon":{"level":73,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Aura Sphere","Calm Mind","Earth Power","Fire Blast","Judgment","Recover","Sludge Bomb"],"teraTypes":["Poison"]}]},"arceuselectric":{"level":70,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Ice Beam","Judgment","Recover"],"teraTypes":["Electric","Ice"]}]},"arceusfairy":{"level":72,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Earth Power","Fire Blast","Recover"],"teraTypes":["Fairy","Fire","Ground"]},{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"teraTypes":["Steel"]}]},"arceusfighting":{"level":72,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Recover","Snarl"],"teraTypes":["Steel"]}]},"arceusfire":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Liquidation","Protect","Swords Dance"],"teraTypes":["Fire","Normal","Water"]}]},"arceusflying":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"teraTypes":["Flying","Ground"]}]},"arceusghost":{"level":73,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Brick Break","Extreme Speed","Phantom Force","Swords Dance"],"teraTypes":["Ghost","Normal"]}]},"arceusgrass":{"level":74,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"teraTypes":["Fire","Steel"]}]},"arceusground":{"level":72,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Fire Blast","Ice Beam","Judgment","Recover"],"teraTypes":["Ground","Ice"]},{"role":"Doubles Setup Sweeper","movepool":["Earthquake","Extreme Speed","Stone Edge","Swords Dance"],"teraTypes":["Normal"]}]},"arceusice":{"level":72,"sets":[{"role":"Doubles Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover","Thunderbolt"],"teraTypes":["Electric","Ground"]}]},"arceuspoison":{"level":72,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Gunk Shot","Liquidation","Swords Dance"],"teraTypes":["Fire","Normal","Poison"]}]},"arceuspsychic":{"level":74,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"teraTypes":["Steel"]}]},"arceusrock":{"level":73,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"teraTypes":["Ground"]}]},"arceussteel":{"level":72,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"arceuswater":{"level":72,"sets":[{"role":"Doubles Support","movepool":["Icy Wind","Judgment","Recover","Snarl","Tailwind","Taunt","Will-O-Wisp"],"teraTypes":["Steel"]},{"role":"Doubles Setup Sweeper","movepool":["Extreme Speed","Flare Blitz","Liquidation","Swords Dance"],"teraTypes":["Fire","Normal"]}]},"samurott":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Aqua Jet","Flip Turn","Hydro Pump","Ice Beam","Knock Off","Megahorn","Sacred Sword"],"teraTypes":["Dark","Fire","Water"]},{"role":"Doubles Setup Sweeper","movepool":["Aqua Jet","Knock Off","Liquidation","Protect","Sacred Sword","Swords Dance"],"teraTypes":["Dark","Fire","Water"]}]},"samurotthisui":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["Aqua Jet","Ceaseless Edge","Protect","Razor Shell","Sacred Sword","Sucker Punch"],"teraTypes":["Dark","Fire","Water"]},{"role":"Choice Item user","movepool":["Ceaseless Edge","Flip Turn","Razor Shell","Sacred Sword","Sucker Punch"],"teraTypes":["Dark","Fire","Water"]}]},"conkeldurr":{"level":81,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Knock Off","Mach Punch","Protect"],"teraTypes":["Dark","Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Drain Punch","Knock Off","Mach Punch","Poison Jab"],"teraTypes":["Dark","Poison"]}]},"leavanny":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Knock Off","Leaf Blade","Pollen Puff","Sticky Web"],"teraTypes":["Rock","Water"]},{"role":"Offensive Protect","movepool":["Leaf Blade","Lunge","Protect","Sticky Web"],"teraTypes":["Rock","Water"]}]},"lilligant":{"level":86,"sets":[{"role":"Tera Blast user","movepool":["Giga Drain","Quiver Dance","Sleep Powder","Tera Blast"],"teraTypes":["Fire","Rock"]},{"role":"Doubles Setup Sweeper","movepool":["Energy Ball","Pollen Puff","Quiver Dance","Sleep Powder"],"teraTypes":["Steel"]}]},"lilliganthisui":{"level":83,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Leaf Blade","Sleep Powder","Victory Dance"],"teraTypes":["Fighting","Steel"]}]},"basculin":{"level":87,"sets":[{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Crunch","Protect","Psychic Fangs","Wave Crash"],"teraTypes":["Water"]}]},"basculinbluestriped":{"level":87,"sets":[{"role":"Doubles Wallbreaker","movepool":["Aqua Jet","Crunch","Protect","Psychic Fangs","Wave Crash"],"teraTypes":["Water"]}]},"basculegion":{"level":70,"sets":[{"role":"Choice Item user","movepool":["Aqua Jet","Flip Turn","Last Respects","Wave Crash"],"teraTypes":["Ghost"]}]},"basculegionf":{"level":72,"sets":[{"role":"Choice Item user","movepool":["Flip Turn","Hydro Pump","Last Respects","Wave Crash"],"teraTypes":["Ghost"]}]},"krookodile":{"level":81,"sets":[{"role":"Offensive Protect","movepool":["Gunk Shot","High Horsepower","Knock Off","Protect","Stone Edge","Taunt"],"teraTypes":["Dark","Ground","Poison"]},{"role":"Choice Item user","movepool":["Gunk Shot","High Horsepower","Knock Off","Rock Slide"],"teraTypes":["Dark","Ground","Poison"]}]},"zoroark":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Dark Pulse","Flamethrower","Focus Blast","Protect","Sludge Bomb"],"teraTypes":["Poison"]},{"role":"Offensive Protect","movepool":["Flamethrower","Focus Blast","Knock Off","Protect","Sludge Bomb"],"teraTypes":["Poison"]}]},"zoroarkhisui":{"level":79,"sets":[{"role":"Doubles Wallbreaker","movepool":["Bitter Malice","Flamethrower","Focus Blast","Hyper Voice","Nasty Plot","Protect"],"teraTypes":["Normal"]},{"role":"Tera Blast user","movepool":["Bitter Malice","Hyper Voice","Protect","Tera Blast"],"teraTypes":["Fairy"]}]},"gothitelle":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Fake Out","Heal Pulse","Helping Hand","Protect","Psychic","Trick Room"],"teraTypes":["Dark","Steel"]}]},"swanna":{"level":88,"sets":[{"role":"Doubles Support","movepool":["Brave Bird","Hydro Pump","Knock Off","Protect","Tailwind"],"teraTypes":["Ground"]},{"role":"Offensive Protect","movepool":["Brave Bird","Hydro Pump","Protect","Tailwind"],"teraTypes":["Ground"]}]},"sawsbuck":{"level":90,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Double-Edge","High Horsepower","Horn Leech","Protect","Swords Dance"],"teraTypes":["Normal"]}]},"amoonguss":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Clear Smog","Pollen Puff","Protect","Rage Powder","Spore"],"teraTypes":["Steel","Water"]}]},"alomomola":{"level":92,"sets":[{"role":"Doubles Support","movepool":["Helping Hand","Icy Wind","Scald","Wide Guard"],"teraTypes":["Steel"]}]},"eelektross":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Acid Spray","Close Combat","Flamethrower","Giga Drain","Knock Off","Thunderbolt","U-turn"],"teraTypes":["Poison"]}]},"chandelure":{"level":82,"sets":[{"role":"Doubles Fast Attacker","movepool":["Energy Ball","Heat Wave","Protect","Shadow Ball","Trick"],"teraTypes":["Fire","Grass"]}]},"haxorus":{"level":83,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Iron Head","Protect","Scale Shot","Swords Dance"],"teraTypes":["Dragon","Fighting","Steel"]},{"role":"Offensive Protect","movepool":["Close Combat","Dragon Claw","First Impression","Iron Head","Protect"],"teraTypes":["Fighting","Steel"]}]},"beartic":{"level":90,"sets":[{"role":"Offensive Protect","movepool":["Aqua Jet","Close Combat","Icicle Crash","Protect"],"teraTypes":["Fighting","Water"]}]},"cryogonal":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Flash Cannon","Freeze-Dry","Haze","Icy Wind","Rapid Spin","Recover"],"teraTypes":["Steel"]}]},"mienshao":{"level":85,"sets":[{"role":"Doubles Fast Attacker","movepool":["Close Combat","Fake Out","Knock Off","U-turn"],"teraTypes":["Dark"]},{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Fake Out","Knock Off","U-turn"],"teraTypes":["Dark","Steel"]}]},"braviary":{"level":83,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Close Combat","Protect","Tailwind"],"teraTypes":["Fighting","Flying"]}]},"braviaryhisui":{"level":83,"sets":[{"role":"Doubles Wallbreaker","movepool":["Heat Wave","Hurricane","Psychic","Tailwind"],"teraTypes":["Fire","Psychic","Steel"]},{"role":"Bulky Protect","movepool":["Calm Mind","Esper Wing","Hurricane","Protect"],"teraTypes":["Psychic","Steel"]}]},"mandibuzz":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Foul Play","Knock Off","Roost","Snarl","Tailwind","Taunt","Toxic","U-turn"],"teraTypes":["Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Defog","Foul Play","Knock Off","Taunt","Toxic"],"teraTypes":["Steel"]}]},"hydreigon":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Dark Pulse","Draco Meteor","Protect","Snarl","Tailwind"],"teraTypes":["Dragon","Poison"]},{"role":"Doubles Fast Attacker","movepool":["Dark Pulse","Draco Meteor","Heat Wave","Protect"],"teraTypes":["Fire"]}]},"volcarona":{"level":79,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bug Buzz","Heat Wave","Protect","Quiver Dance"],"teraTypes":["Fire","Ground","Water"]},{"role":"Doubles Support","movepool":["Heat Wave","Rage Powder","Struggle Bug","Tailwind"],"teraTypes":["Steel","Water"]}]},"tornadus":{"level":77,"sets":[{"role":"Doubles Support","movepool":["Bleakwind Storm","Heat Wave","Knock Off","Protect","Tailwind","Taunt"],"teraTypes":["Steel"]}]},"tornadustherian":{"level":78,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bleakwind Storm","Grass Knot","Heat Wave","Nasty Plot","Protect"],"teraTypes":["Fire","Flying"]},{"role":"Choice Item user","movepool":["Bleakwind Storm","Focus Blast","Grass Knot","Heat Wave","U-turn"],"teraTypes":["Fire","Flying"]}]},"thundurus":{"level":80,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Grass Knot","Nasty Plot","Protect","Wildbolt Storm"],"teraTypes":["Electric","Grass"]},{"role":"Bulky Protect","movepool":["Grass Knot","Knock Off","Protect","Snarl","Taunt","Thunder Wave","Thunderbolt"],"teraTypes":["Steel"]}]},"thundurustherian":{"level":79,"sets":[{"role":"Doubles Fast Attacker","movepool":["Grass Knot","Protect","Sludge Bomb","Volt Switch","Wildbolt Storm"],"teraTypes":["Electric","Poison"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Tera Blast","Wildbolt Storm"],"teraTypes":["Flying","Ice"]}]},"landorus":{"level":76,"sets":[{"role":"Doubles Wallbreaker","movepool":["Earth Power","Nasty Plot","Protect","Psychic","Sandsear Storm","Sludge Bomb"],"teraTypes":["Ground","Poison","Psychic"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Sandsear Storm","Tera Blast"],"teraTypes":["Flying","Ice"]}]},"landorustherian":{"level":78,"sets":[{"role":"Doubles Support","movepool":["Rock Slide","Stealth Rock","Stomping Tantrum","Taunt","U-turn"],"teraTypes":["Steel","Water"]},{"role":"Tera Blast user","movepool":["Earthquake","Protect","Swords Dance","Tera Blast"],"teraTypes":["Flying"]}]},"meloetta":{"level":81,"sets":[{"role":"Doubles Wallbreaker","movepool":["Calm Mind","Focus Blast","Hyper Voice","Protect","Psychic","U-turn"],"teraTypes":["Fighting","Normal","Psychic"]},{"role":"Tera Blast user","movepool":["Close Combat","Psychic","Relic Song","Tera Blast"],"teraTypes":["Normal"]}]},"chesnaught":{"level":85,"sets":[{"role":"Bulky Protect","movepool":["Body Press","Knock Off","Leech Seed","Spiky Shield","Wood Hammer"],"teraTypes":["Fire","Rock","Steel","Water"]},{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Synthesis","Wood Hammer"],"teraTypes":["Fire","Rock","Steel","Water"]}]},"delphox":{"level":84,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Fire Blast","Heat Wave","Nasty Plot","Protect","Psyshock"],"teraTypes":["Fire"]}]},"greninjabond":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Dark Pulse","Gunk Shot","Hydro Pump","Ice Beam","Protect","Taunt"],"teraTypes":["Dark","Poison","Water"]}]},"talonflame":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Brave Bird","Overheat","Protect","Tailwind","U-turn","Will-O-Wisp"],"teraTypes":["Flying","Ground"]}]},"vivillon":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Hurricane","Pollen Puff","Protect","Sleep Powder"],"teraTypes":["Flying","Steel"]}]},"pyroar":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["Fire Blast","Heat Wave","Hyper Voice","Protect","Taunt","Will-O-Wisp"],"teraTypes":["Fire","Normal","Water"]},{"role":"Tera Blast user","movepool":["Fire Blast","Hyper Voice","Protect","Tera Blast"],"teraTypes":["Grass"]}]},"florges":{"level":85,"sets":[{"role":"Bulky Protect","movepool":["Calm Mind","Dazzling Gleam","Moonblast","Protect","Synthesis"],"teraTypes":["Steel"]}]},"gogoat":{"level":89,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Double-Edge","High Horsepower","Horn Leech","Leaf Storm"],"teraTypes":["Ground","Normal"]}]},"dragalge":{"level":87,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Hydro Pump","Protect","Sludge Bomb"],"teraTypes":["Water"]}]},"clawitzer":{"level":84,"sets":[{"role":"Choice Item user","movepool":["Aura Sphere","Dark Pulse","Dragon Pulse","Muddy Water","U-turn"],"teraTypes":["Dark","Dragon","Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Aura Sphere","Dark Pulse","Heal Pulse","Muddy Water","Protect"],"teraTypes":["Dark","Fighting"]}]},"sylveon":{"level":79,"sets":[{"role":"Bulky Protect","movepool":["Calm Mind","Hyper Voice","Protect","Substitute"],"teraTypes":["Steel"]},{"role":"Tera Blast user","movepool":["Hyper Voice","Protect","Quick Attack","Tera Blast"],"teraTypes":["Fire","Ground"]}]},"hawlucha":{"level":84,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Brave Bird","Close Combat","Protect","Swords Dance"],"teraTypes":["Fighting","Fire","Flying"]}]},"dedenne":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Dazzling Gleam","Helping Hand","Nuzzle","Super Fang","Thunderbolt"],"teraTypes":["Electric","Flying"]}]},"carbink":{"level":90,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Press","Iron Defense","Moonblast","Stealth Rock"],"teraTypes":["Fighting"]}]},"goodra":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Power Whip","Protect","Scald","Sludge Bomb","Thunderbolt"],"teraTypes":["Electric","Fire","Grass","Poison","Water"]}]},"goodrahisui":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Dragon Tail","Fire Blast","Heavy Slam","Hydro Pump","Thunderbolt"],"teraTypes":["Electric","Fire","Water"]}]},"klefki":{"level":83,"sets":[{"role":"Doubles Support","movepool":["Dazzling Gleam","Foul Play","Light Screen","Reflect","Spikes","Thunder Wave"],"teraTypes":["Flying","Water"]}]},"trevenant":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Poltergeist","Protect","Trick Room","Wood Hammer"],"teraTypes":["Dark","Water"]}]},"avalugg":{"level":89,"sets":[{"role":"Bulky Protect","movepool":["Avalanche","Body Press","Protect","Recover"],"teraTypes":["Fighting","Poison","Water"]}]},"avalugghisui":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Body Press","Mountain Gale","Protect","Rock Slide"],"teraTypes":["Fighting","Flying","Poison"]}]},"noivern":{"level":84,"sets":[{"role":"Doubles Fast Attacker","movepool":["Boomburst","Draco Meteor","Flamethrower","Hurricane","Protect","Tailwind"],"teraTypes":["Normal"]},{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Flamethrower","Hurricane","Protect","Tailwind"],"teraTypes":["Dragon","Fire","Steel"]}]},"diancie":{"level":78,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Diamond Storm","Protect","Trick Room"],"teraTypes":["Fighting"]},{"role":"Bulky Protect","movepool":["Diamond Storm","Moonblast","Protect","Trick Room"],"teraTypes":["Grass","Steel"]}]},"hoopa":{"level":84,"sets":[{"role":"Doubles Fast Attacker","movepool":["Focus Blast","Hyperspace Hole","Protect","Shadow Ball","Trick"],"teraTypes":["Dark","Fighting","Psychic"]}]},"hoopaunbound":{"level":80,"sets":[{"role":"Choice Item user","movepool":["Drain Punch","Gunk Shot","Hyperspace Fury","Trick","Zen Headbutt"],"teraTypes":["Dark","Fighting","Poison"]},{"role":"Doubles Bulky Attacker","movepool":["Focus Blast","Gunk Shot","Hyperspace Fury","Protect","Psychic","Trick"],"teraTypes":["Dark","Fighting","Poison"]}]},"volcanion":{"level":76,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Earth Power","Heat Wave","Protect","Sludge Bomb","Steam Eruption"],"teraTypes":["Ground"]}]},"decidueye":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Knock Off","Leaf Storm","Protect","Spirit Shackle","Tailwind"],"teraTypes":["Dark","Ghost","Water"]}]},"decidueyehisui":{"level":86,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Knock Off","Leaf Blade","Protect","Tailwind","Triple Arrows"],"teraTypes":["Dark","Fighting","Steel"]}]},"gumshoos":{"level":92,"sets":[{"role":"Choice Item user","movepool":["Body Slam","Crunch","Fire Fang","Psychic Fangs","U-turn"],"teraTypes":["Psychic"]}]},"vikavolt":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Bug Buzz","Protect","Sticky Web","Thunderbolt"],"teraTypes":["Electric"]}]},"crabominable":{"level":88,"sets":[{"role":"Doubles Wallbreaker","movepool":["Drain Punch","Gunk Shot","Ice Hammer","Protect","Wide Guard"],"teraTypes":["Fire","Poison"]}]},"oricorio":{"level":84,"sets":[{"role":"Bulky Protect","movepool":["Hurricane","Protect","Quiver Dance","Revelation Dance","Tailwind"],"teraTypes":["Ground"]}]},"oricoriopompom":{"level":83,"sets":[{"role":"Bulky Protect","movepool":["Hurricane","Protect","Quiver Dance","Revelation Dance","Tailwind"],"teraTypes":["Ground"]}]},"oricoriopau":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Hurricane","Protect","Quiver Dance","Revelation Dance","Tailwind"],"teraTypes":["Fighting","Ground"]}]},"oricoriosensu":{"level":85,"sets":[{"role":"Bulky Protect","movepool":["Hurricane","Protect","Quiver Dance","Revelation Dance","Tailwind"],"teraTypes":["Fighting","Ground"]}]},"ribombee":{"level":85,"sets":[{"role":"Doubles Support","movepool":["Pollen Puff","Protect","Sticky Web","Tailwind","U-turn"],"teraTypes":["Dark"]},{"role":"Tera Blast user","movepool":["Dazzling Gleam","Moonblast","Protect","Quiver Dance","Tera Blast"],"teraTypes":["Ground"]}]},"lycanroc":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Accelerock","Close Combat","Drill Run","Protect","Rock Slide","Swords Dance"],"teraTypes":["Fighting"]}]},"lycanrocmidnight":{"level":86,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Knock Off","Rock Slide","Stone Edge"],"teraTypes":["Fighting","Rock","Water"]}]},"lycanrocdusk":{"level":84,"sets":[{"role":"Offensive Protect","movepool":["Accelerock","Close Combat","Protect","Psychic Fangs","Rock Slide","Swords Dance"],"teraTypes":["Fighting"]}]},"toxapex":{"level":95,"sets":[{"role":"Bulky Protect","movepool":["Acid Spray","Baneful Bunker","Recover","Toxic","Toxic Spikes"],"teraTypes":["Grass","Steel"]}]},"mudsdale":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Heavy Slam","High Horsepower","Rest","Stone Edge"],"teraTypes":["Fighting"]}]},"lurantis":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Leaf Blade","Leaf Storm","Pollen Puff","Superpower"],"teraTypes":["Fighting"]}]},"salazzle":{"level":86,"sets":[{"role":"Doubles Fast Attacker","movepool":["Encore","Fake Out","Fire Blast","Heat Wave","Incinerate","Poison Gas","Protect","Sludge Bomb"],"teraTypes":["Fire","Flying","Water"]}]},"tsareena":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["High Jump Kick","Knock Off","Play Rough","Power Whip","Rapid Spin","U-turn"],"teraTypes":["Fairy","Fighting"]}]},"oranguru":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Hyper Voice","Instruct","Psyshock","Trick Room"],"teraTypes":["Fairy"]}]},"passimian":{"level":84,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Gunk Shot","Knock Off","Rock Slide","U-turn"],"teraTypes":["Dark","Poison"]}]},"palossand":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Earth Power","Hypnosis","Protect","Shadow Ball","Shore Up","Stealth Rock"],"teraTypes":["Grass","Water"]}]},"komala":{"level":89,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Slam","Knock Off","Play Rough","Rapid Spin","Sucker Punch","Superpower","U-turn","Wood Hammer"],"teraTypes":["Fairy","Fighting","Grass"]}]},"mimikyu":{"level":83,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Drain Punch","Play Rough","Protect","Shadow Claw","Shadow Sneak","Swords Dance"],"teraTypes":["Fighting","Ghost"]}]},"bruxish":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Crunch","Protect","Psychic Fangs","Wave Crash"],"teraTypes":["Dark","Psychic"]},{"role":"Choice Item user","movepool":["Aqua Jet","Crunch","Flip Turn","Ice Fang","Psychic Fangs","Wave Crash"],"teraTypes":["Dark"]}]},"kommoo":{"level":79,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Clanging Scales","Clangorous Soul","Drain Punch","Iron Head"],"teraTypes":["Steel"]},{"role":"Doubles Bulky Setup","movepool":["Clanging Scales","Clangorous Soul","Iron Head","Protect"],"teraTypes":["Steel"]}]},"magearna":{"level":71,"sets":[{"role":"Doubles Wallbreaker","movepool":["Dazzling Gleam","Flash Cannon","Fleur Cannon","Protect","Trick Room"],"teraTypes":["Fairy","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Aura Sphere","Dazzling Gleam","Flash Cannon","Fleur Cannon"],"teraTypes":["Fairy","Fighting","Water"]}]},"rillaboom":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Grassy Glide","High Horsepower","Knock Off","U-turn","Wood Hammer"],"teraTypes":["Fire","Grass"]},{"role":"Doubles Support","movepool":["Fake Out","Grassy Glide","U-turn","Wood Hammer"],"teraTypes":["Fire","Grass","Steel"]}]},"cinderace":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Court Change","Gunk Shot","High Jump Kick","Protect","Pyro Ball","Sucker Punch","U-turn"],"teraTypes":["Fighting","Fire","Poison"]}]},"inteleon":{"level":83,"sets":[{"role":"Choice Item user","movepool":["Hydro Pump","Ice Beam","Scald","U-turn"],"teraTypes":["Water"]}]},"greedent":{"level":86,"sets":[{"role":"Doubles Bulky Setup","movepool":["Body Slam","High Horsepower","Knock Off","Protect","Swords Dance"],"teraTypes":["Fairy","Ghost","Ground"]}]},"corviknight":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Brave Bird","Defog","Iron Head","Roost","Tailwind","U-turn"],"teraTypes":["Dragon"]}]},"drednaw":{"level":83,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Crunch","Liquidation","Protect","Rock Slide","Shell Smash"],"teraTypes":["Dark","Water"]}]},"coalossal":{"level":89,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fire Blast","Heat Wave","Incinerate","Protect","Rapid Spin","Stealth Rock","Stone Edge","Will-O-Wisp"],"teraTypes":["Water"]}]},"flapple":{"level":92,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Dragon Dance","Dragon Rush","Grav Apple","Protect","Sucker Punch"],"teraTypes":["Fire","Grass","Steel"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Grav Apple","Protect","Tera Blast"],"teraTypes":["Dragon","Fire"]}]},"appletun":{"level":90,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Apple Acid","Dragon Pulse","Leech Seed","Protect"],"teraTypes":["Steel"]}]},"sandaconda":{"level":87,"sets":[{"role":"Doubles Bulky Setup","movepool":["Coil","High Horsepower","Rest","Stone Edge"],"teraTypes":["Dragon","Steel"]},{"role":"Doubles Support","movepool":["Glare","High Horsepower","Rest","Stealth Rock","Stone Edge"],"teraTypes":["Dragon","Steel"]}]},"cramorant":{"level":87,"sets":[{"role":"Bulky Protect","movepool":["Brave Bird","Protect","Roost","Surf","Tailwind"],"teraTypes":["Ground"]}]},"barraskewda":{"level":83,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Poison Jab","Protect","Psychic Fangs","Waterfall"],"teraTypes":["Fighting"]}]},"toxtricity":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Overdrive","Sludge Bomb","Snarl","Volt Switch"],"teraTypes":["Dark","Electric","Flying"]}]},"toxtricitylowkey":{"level":82,"sets":[{"role":"Choice Item user","movepool":["Overdrive","Sludge Bomb","Snarl","Volt Switch"],"teraTypes":["Dark","Electric","Flying"]}]},"polteageist":{"level":85,"sets":[{"role":"Tera Blast user","movepool":["Protect","Shadow Ball","Shell Smash","Tera Blast"],"teraTypes":["Fighting"]},{"role":"Doubles Setup Sweeper","movepool":["Baton Pass","Protect","Shadow Ball","Shell Smash"],"teraTypes":["Dark","Normal"]}]},"hatterene":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Dazzling Gleam","Mystical Fire","Protect","Psychic","Trick Room"],"teraTypes":["Fairy","Fire","Psychic","Steel"]}]},"grimmsnarl":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Fake Out","Light Screen","Parting Shot","Reflect","Spirit Break"],"teraTypes":["Steel"]},{"role":"Doubles Support","movepool":["Fake Out","Parting Shot","Spirit Break","Sucker Punch","Taunt","Thunder Wave"],"teraTypes":["Steel"]}]},"perrserker":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Fake Out","Helping Hand","Iron Head","Knock Off","U-turn"],"teraTypes":["Fighting","Steel"]},{"role":"Choice Item user","movepool":["Close Combat","Iron Head","Knock Off","U-turn"],"teraTypes":["Fighting","Steel"]}]},"falinks":{"level":86,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Iron Head","Knock Off","No Retreat"],"teraTypes":["Dark","Fighting","Steel"]}]},"pincurchin":{"level":99,"sets":[{"role":"Doubles Support","movepool":["Acupressure","Recover","Thunderbolt","Toxic Spikes"],"teraTypes":["Grass"]}]},"frosmoth":{"level":86,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bug Buzz","Ice Beam","Protect","Quiver Dance"],"teraTypes":["Ground","Water"]}]},"stonjourner":{"level":89,"sets":[{"role":"Doubles Fast Attacker","movepool":["Heat Crash","High Horsepower","Protect","Rock Polish","Stone Edge"],"teraTypes":["Fire","Rock"]}]},"eiscue":{"level":88,"sets":[{"role":"Doubles Bulky Setup","movepool":["Belly Drum","Ice Spinner","Liquidation","Protect"],"teraTypes":["Water"]}]},"indeedee":{"level":88,"sets":[{"role":"Doubles Fast Attacker","movepool":["Encore","Hyper Voice","Protect","Psychic","Psyshock","Shadow Ball","Trick"],"teraTypes":["Fairy","Psychic"]}]},"indeedeef":{"level":89,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Heal Pulse","Helping Hand","Protect","Psychic"],"teraTypes":["Fairy"]}]},"morpeko":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Aura Wheel","Fake Out","Knock Off","Protect"],"teraTypes":["Electric"]},{"role":"Offensive Protect","movepool":["Aura Wheel","Knock Off","Parting Shot","Protect","Volt Switch"],"teraTypes":["Electric"]}]},"copperajah":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["High Horsepower","Iron Head","Play Rough","Protect","Rock Slide"],"teraTypes":["Fairy","Rock"]},{"role":"Doubles Bulky Attacker","movepool":["Heat Crash","Heavy Slam","High Horsepower","Stone Edge"],"teraTypes":["Fire"]}]},"dragapult":{"level":79,"sets":[{"role":"Offensive Protect","movepool":["Draco Meteor","Dragon Darts","Fire Blast","Protect","Shadow Ball"],"teraTypes":["Dragon"]},{"role":"Choice Item user","movepool":["Dragon Claw","Dragon Darts","Phantom Force","U-turn"],"teraTypes":["Dragon"]}]},"zacian":{"level":70,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Close Combat","Play Rough","Protect","Psychic Fangs","Swords Dance"],"teraTypes":["Fighting"]}]},"zaciancrowned":{"level":66,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Behemoth Blade","Close Combat","Play Rough","Protect","Swords Dance"],"teraTypes":["Fairy","Fighting","Fire","Steel"]}]},"zamazenta":{"level":72,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Crunch","Howl","Iron Head","Psychic Fangs","Stone Edge"],"teraTypes":["Dark","Fighting","Steel"]},{"role":"Bulky Protect","movepool":["Body Press","Crunch","Iron Defense","Protect"],"teraTypes":["Fighting","Fire","Steel"]}]},"zamazentacrowned":{"level":70,"sets":[{"role":"Doubles Bulky Setup","movepool":["Behemoth Bash","Body Press","Crunch","Iron Defense","Protect","Stone Edge"],"teraTypes":["Fighting","Fire"]},{"role":"Doubles Setup Sweeper","movepool":["Behemoth Bash","Close Combat","Howl","Protect"],"teraTypes":["Fighting","Fire","Steel"]},{"role":"Doubles Bulky Attacker","movepool":["Body Press","Iron Defense","Protect","Snarl","Wide Guard"],"teraTypes":["Fighting","Fire"]}]},"eternatus":{"level":71,"sets":[{"role":"Doubles Bulky Setup","movepool":["Cosmic Power","Dynamax Cannon","Flamethrower","Recover"],"teraTypes":["Dragon","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Dynamax Cannon","Fire Blast","Recover","Sludge Bomb","Toxic Spikes"],"teraTypes":["Dragon","Water"]}]},"urshifu":{"level":77,"sets":[{"role":"Doubles Fast Attacker","movepool":["Close Combat","Protect","Sucker Punch","Swords Dance","Wicked Blow"],"teraTypes":["Dark","Poison"]}]},"urshifurapidstrike":{"level":79,"sets":[{"role":"Doubles Fast Attacker","movepool":["Aqua Jet","Close Combat","Protect","Surging Strikes","Swords Dance"],"teraTypes":["Fire","Steel","Water"]}]},"zarude":{"level":81,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Jungle Healing","Knock Off","Power Whip","Protect"],"teraTypes":["Poison"]}]},"regieleki":{"level":80,"sets":[{"role":"Doubles Fast Attacker","movepool":["Electroweb","Protect","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]},{"role":"Tera Blast user","movepool":["Electroweb","Protect","Tera Blast","Thunderbolt"],"teraTypes":["Ice"]}]},"regidrago":{"level":74,"sets":[{"role":"Choice Item user","movepool":["Draco Meteor","Dragon Claw","Dragon Energy","Earth Power"],"teraTypes":["Dragon"]}]},"glastrier":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Heavy Slam","High Horsepower","Icicle Crash","Protect"],"teraTypes":["Fighting","Ground","Steel"]}]},"spectrier":{"level":78,"sets":[{"role":"Offensive Protect","movepool":["Dark Pulse","Nasty Plot","Protect","Shadow Ball","Will-O-Wisp"],"teraTypes":["Dark"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Protect","Shadow Ball","Tera Blast"],"teraTypes":["Fighting"]}]},"calyrex":{"level":94,"sets":[{"role":"Doubles Support","movepool":["Encore","Helping Hand","Leaf Storm","Pollen Puff"],"teraTypes":["Steel"]}]},"calyrexice":{"level":67,"sets":[{"role":"Doubles Wallbreaker","movepool":["Glacial Lance","High Horsepower","Protect","Trick Room"],"teraTypes":["Ground","Ice"]}]},"calyrexshadow":{"level":63,"sets":[{"role":"Offensive Protect","movepool":["Astral Barrage","Nasty Plot","Pollen Puff","Protect","Psyshock"],"teraTypes":["Dark","Ghost"]}]},"wyrdeer":{"level":85,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Slam","Double-Edge","Earth Power","Protect","Psychic","Thunder Wave","Thunderbolt"],"teraTypes":["Fairy"]}]},"kleavor":{"level":79,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Protect","Stone Axe","U-turn","X-Scissor"],"teraTypes":["Bug","Fighting","Rock","Steel"]}]},"ursaluna":{"level":77,"sets":[{"role":"Doubles Wallbreaker","movepool":["Crunch","Earthquake","Facade","Headlong Rush","Protect"],"teraTypes":["Normal"]}]},"ursalunabloodmoon":{"level":78,"sets":[{"role":"Bulky Protect","movepool":["Blood Moon","Earth Power","Hyper Voice","Protect"],"teraTypes":["Ghost","Normal","Water"]}]},"enamorus":{"level":80,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Play Rough","Protect","Superpower","Tailwind"],"teraTypes":["Fighting"]},{"role":"Offensive Protect","movepool":["Earth Power","Protect","Springtide Storm","Tailwind"],"teraTypes":["Ground"]}]},"enamorustherian":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Earth Power","Moonblast","Mystical Fire","Protect","Springtide Storm"],"teraTypes":["Fairy","Ground"]}]},"meowscarada":{"level":81,"sets":[{"role":"Choice Item user","movepool":["Flower Trick","Knock Off","Play Rough","Sucker Punch","U-turn"],"teraTypes":["Dark","Fairy","Grass"]},{"role":"Offensive Protect","movepool":["Flower Trick","Knock Off","Pollen Puff","Protect","Sucker Punch","Taunt"],"teraTypes":["Poison"]}]},"skeledirge":{"level":80,"sets":[{"role":"Bulky Protect","movepool":["Protect","Shadow Ball","Slack Off","Torch Song"],"teraTypes":["Fairy","Water"]}]},"quaquaval":{"level":82,"sets":[{"role":"Offensive Protect","movepool":["Aqua Jet","Aqua Step","Close Combat","Ice Spinner","Knock Off","Protect"],"teraTypes":["Fire","Steel","Water"]}]},"oinkologne":{"level":91,"sets":[{"role":"Doubles Support","movepool":["Double-Edge","Helping Hand","Lash Out","Protect","Yawn"],"teraTypes":["Ghost","Normal"]},{"role":"Doubles Wallbreaker","movepool":["Double-Edge","High Horsepower","Lash Out","Play Rough"],"teraTypes":["Ghost","Normal"]}]},"oinkolognef":{"level":92,"sets":[{"role":"Doubles Support","movepool":["Double-Edge","Helping Hand","Lash Out","Protect","Yawn"],"teraTypes":["Fairy","Ground","Normal"]},{"role":"Doubles Wallbreaker","movepool":["Double-Edge","High Horsepower","Lash Out","Play Rough"],"teraTypes":["Fairy","Ground","Normal"]}]},"spidops":{"level":100,"sets":[{"role":"Doubles Support","movepool":["Bug Bite","Circle Throw","Knock Off","Sticky Web","String Shot","U-turn"],"teraTypes":["Water"]}]},"lokix":{"level":85,"sets":[{"role":"Offensive Protect","movepool":["First Impression","Protect","Sucker Punch","U-turn"],"teraTypes":["Bug"]},{"role":"Doubles Fast Attacker","movepool":["First Impression","Leech Life","Protect","Sucker Punch"],"teraTypes":["Bug"]}]},"pawmot":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","Double Shock","Fake Out","Protect","Revival Blessing"],"teraTypes":["Electric"]},{"role":"Doubles Support","movepool":["Close Combat","Encore","Fake Out","Knock Off","Nuzzle","Revival Blessing"],"teraTypes":["Fighting"]}]},"maushold":{"level":80,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Encore","Population Bomb","Protect","Tidy Up"],"teraTypes":["Normal"]},{"role":"Doubles Support","movepool":["Encore","Follow Me","Helping Hand","Population Bomb","Protect","Taunt","Thunder Wave","U-turn"],"teraTypes":["Ghost"]}]},"mausholdfour":{"level":80,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Encore","Population Bomb","Protect","Tidy Up"],"teraTypes":["Normal"]},{"role":"Doubles Support","movepool":["Encore","Follow Me","Helping Hand","Population Bomb","Protect","Taunt","Thunder Wave","U-turn"],"teraTypes":["Ghost"]}]},"dachsbun":{"level":90,"sets":[{"role":"Doubles Support","movepool":["Body Press","Helping Hand","Howl","Play Rough","Snarl","Yawn"],"teraTypes":["Steel"]}]},"arboliva":{"level":88,"sets":[{"role":"Doubles Wallbreaker","movepool":["Earth Power","Energy Ball","Hyper Voice","Pollen Puff","Protect","Strength Sap"],"teraTypes":["Grass"]}]},"squawkabilly":{"level":88,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Double-Edge","Parting Shot","Protect","Quick Attack"],"teraTypes":["Flying","Normal","Steel"]}]},"squawkabillywhite":{"level":88,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Double-Edge","Parting Shot","Protect","Quick Attack"],"teraTypes":["Flying","Normal","Steel"]}]},"squawkabillyblue":{"level":88,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Double-Edge","Parting Shot","Protect","Quick Attack"],"teraTypes":["Flying","Normal","Steel"]}]},"squawkabillyyellow":{"level":88,"sets":[{"role":"Offensive Protect","movepool":["Brave Bird","Double-Edge","Parting Shot","Protect","Quick Attack"],"teraTypes":["Flying","Normal","Steel"]}]},"garganacl":{"level":80,"sets":[{"role":"Doubles Bulky Setup","movepool":["Protect","Recover","Salt Cure","Wide Guard"],"teraTypes":["Ghost"]}]},"armarouge":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Armor Cannon","Aura Sphere","Energy Ball","Heat Wave","Psyshock"],"teraTypes":["Fighting","Fire","Grass"]},{"role":"Offensive Protect","movepool":["Heat Wave","Protect","Psychic","Trick Room"],"teraTypes":["Grass"]}]},"ceruledge":{"level":80,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Bitter Blade","Close Combat","Poltergeist","Protect","Shadow Sneak","Swords Dance"],"teraTypes":["Fighting","Fire","Ghost","Grass"]}]},"bellibolt":{"level":83,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Acid Spray","Muddy Water","Slack Off","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Water"]}]},"kilowattrel":{"level":82,"sets":[{"role":"Doubles Fast Attacker","movepool":["Hurricane","Protect","Tailwind","Thunderbolt"],"teraTypes":["Flying","Steel"]}]},"mabosstiff":{"level":85,"sets":[{"role":"Doubles Wallbreaker","movepool":["Crunch","Fire Fang","Play Rough","Psychic Fangs","Wild Charge"],"teraTypes":["Fairy"]}]},"grafaiai":{"level":88,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Encore","Gunk Shot","Knock Off","Parting Shot","Protect","Taunt"],"teraTypes":["Dark"]},{"role":"Doubles Support","movepool":["Gunk Shot","Knock Off","Super Fang","U-turn"],"teraTypes":["Dark"]}]},"brambleghast":{"level":86,"sets":[{"role":"Offensive Protect","movepool":["Poltergeist","Power Whip","Protect","Shadow Sneak"],"teraTypes":["Fairy","Ghost","Grass","Steel","Water"]},{"role":"Doubles Support","movepool":["Disable","Poltergeist","Power Whip","Protect","Rapid Spin","Strength Sap"],"teraTypes":["Fairy","Steel","Water"]}]},"toedscruel":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Earth Power","Giga Drain","Knock Off","Rage Powder","Spore"],"teraTypes":["Water"]}]},"klawf":{"level":91,"sets":[{"role":"Offensive Protect","movepool":["Crabhammer","High Horsepower","Knock Off","Protect","Rock Slide"],"teraTypes":["Dark","Ground","Water"]},{"role":"Choice Item user","movepool":["Crabhammer","High Horsepower","Knock Off","Rock Slide"],"teraTypes":["Dark","Ground","Water"]}]},"scovillain":{"level":89,"sets":[{"role":"Choice Item user","movepool":["Energy Ball","Fire Blast","Flamethrower","Leaf Storm"],"teraTypes":["Fire","Grass","Steel"]}]},"rabsca":{"level":87,"sets":[{"role":"Doubles Support","movepool":["Psychic","Revival Blessing","Struggle Bug","Trick Room"],"teraTypes":["Steel"]}]},"espathra":{"level":83,"sets":[{"role":"Offensive Protect","movepool":["Baton Pass","Dazzling Gleam","Lumina Crash","Protect","Shadow Ball"],"teraTypes":["Fairy"]}]},"tinkaton":{"level":82,"sets":[{"role":"Doubles Support","movepool":["Encore","Fake Out","Gigaton Hammer","Knock Off","Play Rough","Stealth Rock","Thunder Wave"],"teraTypes":["Steel","Water"]}]},"wugtrio":{"level":89,"sets":[{"role":"Choice Item user","movepool":["Aqua Jet","Liquidation","Memento","Stomping Tantrum","Throat Chop"],"teraTypes":["Dark","Ground"]}]},"bombirdier":{"level":84,"sets":[{"role":"Choice Item user","movepool":["Brave Bird","Knock Off","Rock Slide","Sucker Punch"],"teraTypes":["Rock"]},{"role":"Offensive Protect","movepool":["Brave Bird","Knock Off","Protect","Rock Slide"],"teraTypes":["Rock"]}]},"palafin":{"level":80,"sets":[{"role":"Choice Item user","movepool":["Close Combat","Flip Turn","Jet Punch","Wave Crash"],"teraTypes":["Fighting","Water"]}]},"revavroom":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Gunk Shot","Haze","Iron Head","Parting Shot","Poison Gas","Taunt"],"teraTypes":["Flying","Water"]},{"role":"Doubles Fast Attacker","movepool":["Gunk Shot","High Horsepower","Iron Head","Protect","Shift Gear"],"teraTypes":["Ground"]}]},"cyclizar":{"level":85,"sets":[{"role":"Doubles Support","movepool":["Breaking Swipe","Double-Edge","Knock Off","Shed Tail","Taunt"],"teraTypes":["Dragon","Poison"]},{"role":"Doubles Fast Attacker","movepool":["Double-Edge","Draco Meteor","Knock Off","Shed Tail"],"teraTypes":["Dragon","Fire","Normal","Poison"]}]},"orthworm":{"level":88,"sets":[{"role":"Bulky Protect","movepool":["Body Press","Iron Defense","Iron Head","Protect"],"teraTypes":["Electric","Fighting"]},{"role":"Doubles Bulky Attacker","movepool":["Body Press","Helping Hand","Iron Head","Protect","Shed Tail","Stealth Rock"],"teraTypes":["Electric","Poison"]}]},"glimmora":{"level":80,"sets":[{"role":"Bulky Protect","movepool":["Earth Power","Mortal Spin","Power Gem","Sludge Bomb","Spiky Shield","Stealth Rock"],"teraTypes":["Grass","Water"]}]},"houndstone":{"level":74,"sets":[{"role":"Choice Item user","movepool":["Body Press","Last Respects","Shadow Sneak","Trick"],"teraTypes":["Ghost"]}]},"flamigo":{"level":85,"sets":[{"role":"Choice Item user","movepool":["Brave Bird","Close Combat","Throat Chop","U-turn"],"teraTypes":["Fighting","Fire","Flying"]}]},"cetitan":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["High Horsepower","Ice Shard","Icicle Crash","Liquidation","Protect"],"teraTypes":["Ground","Water"]}]},"veluza":{"level":88,"sets":[{"role":"Choice Item user","movepool":["Aqua Cutter","Aqua Jet","Night Slash","Psycho Cut"],"teraTypes":["Dark","Psychic","Water"]}]},"dondozo":{"level":85,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Avalanche","Body Press","Heavy Slam","Wave Crash"],"teraTypes":["Dragon","Grass","Steel"]}]},"tatsugiri":{"level":84,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Draco Meteor","Icy Wind","Muddy Water","Rapid Spin"],"teraTypes":["Fire","Steel"]},{"role":"Doubles Setup Sweeper","movepool":["Draco Meteor","Muddy Water","Nasty Plot","Protect"],"teraTypes":["Dragon","Fire","Water"]},{"role":"Choice Item user","movepool":["Draco Meteor","Hydro Pump","Icy Wind","Muddy Water"],"teraTypes":["Dragon","Fire","Water"]}]},"farigiraf":{"level":84,"sets":[{"role":"Doubles Wallbreaker","movepool":["Hyper Voice","Nasty Plot","Protect","Psychic","Psyshock","Trick Room"],"teraTypes":["Fairy"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Psychic","Psyshock","Tera Blast","Trick Room"],"teraTypes":["Fairy"]}]},"dudunsparce":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Boomburst","Earth Power","Glare","Hyper Drill","Protect","Tailwind"],"teraTypes":["Ghost","Ground","Normal"]}]},"dudunsparcethreesegment":{"level":86,"sets":[{"role":"Bulky Protect","movepool":["Boomburst","Earth Power","Glare","Hyper Drill","Protect","Tailwind"],"teraTypes":["Ghost","Ground","Normal"]}]},"kingambit":{"level":78,"sets":[{"role":"Bulky Protect","movepool":["Iron Head","Kowtow Cleave","Protect","Sucker Punch"],"teraTypes":["Dark","Fire","Flying"]},{"role":"Tera Blast user","movepool":["Iron Head","Kowtow Cleave","Sucker Punch","Tera Blast"],"teraTypes":["Fairy","Fire","Flying"]}]},"greattusk":{"level":81,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Headlong Rush","Ice Spinner","Knock Off","Protect","Rapid Spin","Rock Slide"],"teraTypes":["Fire","Ground"]}]},"brutebonnet":{"level":79,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Crunch","Protect","Rage Powder","Seed Bomb","Spore","Sucker Punch"],"teraTypes":["Dark","Poison"]}]},"sandyshocks":{"level":81,"sets":[{"role":"Doubles Fast Attacker","movepool":["Earth Power","Protect","Stealth Rock","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Grass","Ground"]},{"role":"Tera Blast user","movepool":["Earth Power","Protect","Tera Blast","Volt Switch"],"teraTypes":["Flying","Ice"]}]},"screamtail":{"level":84,"sets":[{"role":"Doubles Support","movepool":["Disable","Encore","Helping Hand","Howl","Play Rough","Stealth Rock","Thunder Wave"],"teraTypes":["Steel"]}]},"fluttermane":{"level":74,"sets":[{"role":"Offensive Protect","movepool":["Dazzling Gleam","Moonblast","Protect","Shadow Ball"],"teraTypes":["Fairy"]},{"role":"Choice Item user","movepool":["Dazzling Gleam","Moonblast","Mystical Fire","Shadow Ball"],"teraTypes":["Fairy"]}]},"slitherwing":{"level":82,"sets":[{"role":"Doubles Wallbreaker","movepool":["Close Combat","First Impression","Flare Blitz","U-turn","Wild Charge"],"teraTypes":["Bug","Electric","Fighting","Fire"]}]},"roaringmoon":{"level":77,"sets":[{"role":"Doubles Fast Attacker","movepool":["Acrobatics","Breaking Swipe","Knock Off","Protect","Tailwind"],"teraTypes":["Flying"]},{"role":"Doubles Setup Sweeper","movepool":["Dragon Claw","Dragon Dance","Knock Off","Protect"],"teraTypes":["Dark","Fire"]}]},"irontreads":{"level":80,"sets":[{"role":"Doubles Bulky Attacker","movepool":["High Horsepower","Iron Head","Knock Off","Rapid Spin","Stealth Rock","Stone Edge"],"teraTypes":["Fire","Ground","Steel"]}]},"ironmoth":{"level":78,"sets":[{"role":"Offensive Protect","movepool":["Energy Ball","Fiery Dance","Heat Wave","Protect","Sludge Wave"],"teraTypes":["Fire","Grass"]},{"role":"Doubles Bulky Attacker","movepool":["Acid Spray","Energy Ball","Fire Blast","Heat Wave","Protect"],"teraTypes":["Poison"]}]},"ironhands":{"level":77,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Close Combat","Drain Punch","Fake Out","Ice Punch","Volt Switch","Wild Charge"],"teraTypes":["Electric","Fighting","Fire"]},{"role":"Bulky Protect","movepool":["Drain Punch","Protect","Swords Dance","Thunder Punch"],"teraTypes":["Fire"]}]},"ironjugulis":{"level":80,"sets":[{"role":"Doubles Fast Attacker","movepool":["Dark Pulse","Earth Power","Hurricane","Protect","Tailwind","Taunt"],"teraTypes":["Flying","Ground","Steel"]}]},"ironthorns":{"level":82,"sets":[{"role":"Doubles Bulky Attacker","movepool":["High Horsepower","Protect","Rock Slide","Stealth Rock","Thunder Punch","Thunder Wave","Volt Switch"],"teraTypes":["Flying","Grass"]},{"role":"Doubles Setup Sweeper","movepool":["Dragon Dance","High Horsepower","Ice Punch","Protect","Rock Slide","Wild Charge"],"teraTypes":["Grass","Rock"]}]},"ironbundle":{"level":78,"sets":[{"role":"Doubles Fast Attacker","movepool":["Encore","Freeze-Dry","Hydro Pump","Icy Wind","Protect"],"teraTypes":["Dragon","Water"]}]},"ironvaliant":{"level":80,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Dazzling Gleam","Knock Off","Moonblast","Protect","Taunt"],"teraTypes":["Dark","Fairy","Fighting"]}]},"baxcalibur":{"level":79,"sets":[{"role":"Choice Item user","movepool":["Glaive Rush","High Horsepower","Ice Shard","Icicle Crash"],"teraTypes":["Dragon","Ground"]},{"role":"Doubles Setup Sweeper","movepool":["Icicle Spear","Protect","Scale Shot","Swords Dance"],"teraTypes":["Dragon","Steel"]}]},"gholdengo":{"level":78,"sets":[{"role":"Choice Item user","movepool":["Dazzling Gleam","Focus Blast","Make It Rain","Psychic","Shadow Ball","Thunderbolt","Trick"],"teraTypes":["Fairy","Steel"]},{"role":"Doubles Bulky Setup","movepool":["Make It Rain","Nasty Plot","Protect","Shadow Ball"],"teraTypes":["Steel","Water"]}]},"tinglu":{"level":80,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Body Press","Protect","Ruination","Spikes","Stealth Rock","Stomping Tantrum","Throat Chop"],"teraTypes":["Fairy","Water"]}]},"chienpao":{"level":76,"sets":[{"role":"Offensive Protect","movepool":["Ice Spinner","Protect","Sacred Sword","Sucker Punch","Throat Chop"],"teraTypes":["Dark","Fighting","Ghost"]}]},"wochien":{"level":85,"sets":[{"role":"Bulky Protect","movepool":["Knock Off","Leech Seed","Pollen Puff","Protect","Ruination"],"teraTypes":["Poison"]}]},"chiyu":{"level":76,"sets":[{"role":"Doubles Setup Sweeper","movepool":["Dark Pulse","Heat Wave","Nasty Plot","Protect"],"teraTypes":["Dark","Fire","Water"]},{"role":"Choice Item user","movepool":["Dark Pulse","Heat Wave","Overheat","Snarl"],"teraTypes":["Fire","Water"]}]},"koraidon":{"level":67,"sets":[{"role":"Choice Item user","movepool":["Collision Course","Dragon Claw","Flare Blitz","U-turn"],"teraTypes":["Fire"]}]},"miraidon":{"level":66,"sets":[{"role":"Offensive Protect","movepool":["Draco Meteor","Dragon Pulse","Electro Drift","Overheat","Protect","Volt Switch"],"teraTypes":["Electric"]},{"role":"Choice Item user","movepool":["Draco Meteor","Electro Drift","Overheat","Volt Switch"],"teraTypes":["Electric"]}]},"walkingwake":{"level":78,"sets":[{"role":"Doubles Wallbreaker","movepool":["Draco Meteor","Flamethrower","Flip Turn","Hydro Pump","Protect"],"teraTypes":["Fire"]}]},"ironleaves":{"level":81,"sets":[{"role":"Offensive Protect","movepool":["Close Combat","Leaf Blade","Protect","Psyblade","Swords Dance"],"teraTypes":["Fighting","Fire","Psychic"]},{"role":"Doubles Wallbreaker","movepool":["Close Combat","Leaf Blade","Psyblade","Wild Charge"],"teraTypes":["Fighting","Fire","Poison"]}]},"dipplin":{"level":87,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Dragon Pulse","Pollen Puff","Recover","Syrup Bomb"],"teraTypes":["Steel"]}]},"sinistcha":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Matcha Gotcha","Rage Powder","Shadow Ball","Trick Room"],"teraTypes":["Grass","Water"]},{"role":"Bulky Protect","movepool":["Calm Mind","Matcha Gotcha","Protect","Shadow Ball"],"teraTypes":["Grass","Water"]}]},"okidogi":{"level":79,"sets":[{"role":"Doubles Bulky Attacker","movepool":["Bulk Up","Drain Punch","Gunk Shot","Knock Off","Snarl"],"teraTypes":["Dark"]}]},"munkidori":{"level":80,"sets":[{"role":"Doubles Fast Attacker","movepool":["Focus Blast","Protect","Psyshock","Sludge Bomb","U-turn"],"teraTypes":["Fighting","Poison"]},{"role":"Doubles Support","movepool":["Fake Out","Focus Blast","Psyshock","Sludge Bomb","U-turn"],"teraTypes":["Fighting","Poison"]}]},"fezandipiti":{"level":80,"sets":[{"role":"Doubles Support","movepool":["Gunk Shot","Icy Wind","Roost","Taunt"],"teraTypes":["Dark","Steel","Water"]},{"role":"Doubles Bulky Attacker","movepool":["Gunk Shot","Icy Wind","Play Rough","U-turn"],"teraTypes":["Dark","Steel","Water"]}]},"ogerpon":{"level":78,"sets":[{"role":"Doubles Wallbreaker","movepool":["Ivy Cudgel","Knock Off","Spiky Shield","Superpower","U-turn"],"teraTypes":["Grass"]},{"role":"Doubles Support","movepool":["Follow Me","Horn Leech","Knock Off","Spiky Shield"],"teraTypes":["Grass"]}]},"ogerponwellspring":{"level":76,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Horn Leech","Ivy Cudgel","Spiky Shield"],"teraTypes":["Water"]},{"role":"Doubles Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Power Whip","Spiky Shield","Swords Dance"],"teraTypes":["Water"]}]},"ogerponhearthflame":{"level":75,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Horn Leech","Ivy Cudgel","Spiky Shield"],"teraTypes":["Fire"]},{"role":"Doubles Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Power Whip","Spiky Shield","Swords Dance"],"teraTypes":["Fire"]}]},"ogerponcornerstone":{"level":76,"sets":[{"role":"Doubles Support","movepool":["Follow Me","Horn Leech","Ivy Cudgel","Spiky Shield"],"teraTypes":["Rock"]},{"role":"Doubles Setup Sweeper","movepool":["Horn Leech","Ivy Cudgel","Power Whip","Spiky Shield","Swords Dance"],"teraTypes":["Rock"]}]}} as any;
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
	'agility', 'autotomize', 'rockpolish', 'trailblaze',
];
// Conglomerate for ease of access
const SETUP = [
	'acidarmor', 'agility', 'autotomize', 'bellydrum', 'bulkup', 'calmmind', 'clangoroussoul', 'coil', 'curse', 'dragondance',
	'flamecharge', 'growth', 'honeclaws', 'howl', 'irondefense', 'meditate', 'nastyplot', 'noretreat', 'poweruppunch', 'quiverdance',
	'rockpolish', 'shellsmash', 'shiftgear', 'swordsdance', 'tailglow', 'tidyup', 'trailblaze', 'workup', 'victorydance',
];
const SPEED_CONTROL = [
	'electroweb', 'glare', 'icywind', 'lowsweep', 'quash', 'rocktomb', 'stringshot', 'tailwind', 'thunderwave', 'trickroom',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'accelerock', 'aquajet', 'beakblast', 'bounce', 'breakingswipe', 'bulletpunch', 'chatter', 'chloroblast', 'clearsmog', 'covet',
	'dragontail', 'electroweb', 'eruption', 'explosion', 'fakeout', 'feint', 'flamecharge', 'flipturn', 'grassyglide', 'iceshard', 'icywind',
	'incinerate', 'machpunch', 'meteorbeam', 'mortalspin', 'nuzzle', 'pluck', 'pursuit', 'quickattack', 'rapidspin', 'reversal', 'selfdestruct',
	'shadowsneak', 'skydrop', 'snarl', 'strugglebug', 'suckerpunch', 'uturn', 'watershuriken', 'vacuumwave', 'voltswitch', 'waterspout',
];
// Hazard-setting moves
const HAZARDS = [
	'spikes', 'stealthrock', 'stickyweb', 'toxicspikes',
];
// Protect and its variants
const PROTECT_MOVES = [
	'banefulbunker', 'protect', 'spikyshield',
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
];

/** Pokemon who always want priority STAB, and are fine with it as its only STAB move of that type */
const PRIORITY_POKEMON = [
	'breloom', 'brutebonnet', 'honchkrow', 'mimikyu', 'scizor',
];

/** Pokemon who should never be in the lead slot */
const NO_LEAD_POKEMON = [
	'Zacian', 'Zamazenta',
];
const DOUBLES_NO_LEAD_POKEMON = [
	'Basculegion', 'Houndstone', 'Roaring Moon', 'Zacian', 'Zamazenta',
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

		this.factoryTier = '';
		this.format = format;
		this.prng = prng && !Array.isArray(prng) ? prng : new PRNG(prng);

		this.moveEnforcementCheckers = {
			Bug: (movePool) => (movePool.includes('megahorn') || movePool.includes('xscissor')),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
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
			Ice: (movePool, moves, abilities, types, counter) => (movePool.includes('freezedry') || !counter.get('Ice')),
			Normal: (movePool, moves, types, counter) => (movePool.includes('boomburst') || movePool.includes('hypervoice')),
			Poison: (movePool, moves, abilities, types, counter) => {
				if (types.includes('Ground')) return false;
				return !counter.get('Poison');
			},
			Psychic: (movePool, moves, abilities, types, counter) => {
				if (counter.get('Psychic')) return false;
				if (movePool.includes('calmmind') || movePool.includes('psychicfangs')) return true;
				return abilities.has('Psychic Surge') || ['Electric', 'Fighting', 'Fire', 'Poison'].some(m => types.includes(m));
			},
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock') && species.baseStats.atk >= 80,
			Steel: (movePool, moves, abilities, types, counter, species, teamDetails, isLead, isDoubles) => (
				!counter.get('Steel') &&
				(isDoubles || species.baseStats.atk > 95 || movePool.includes('gigatonhammer') || movePool.includes('makeitrain'))
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
		if (teamDetails.toxicSpikes && teamDetails.toxicSpikes >= 2) {
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
				[['muddywater', 'hydropump'], 'scald'],
				['disable', 'encore'],
				['freezedry', 'icebeam'],
				['bodyslam', 'doubleedge'],
				['energyball', 'leafstorm'],
				['earthpower', 'sandsearstorm'],
				['boomburst', 'hyperdrill'],
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
			[SETUP, ['defog', 'nuzzle', 'toxic', 'waterspout', 'yawn', 'haze']],
			[PHYSICAL_SETUP, PHYSICAL_SETUP],
			[SPECIAL_SETUP, 'thunderwave'],
			['substitute', PIVOT_MOVES],
			[SPEED_SETUP, ['aquajet', 'rest', 'trickroom']],
			['curse', 'rapidspin'],
			['dragondance', 'dracometeor'],

			// These attacks are redundant with each other
			['psychic', 'psyshock'],
			['surf', 'hydropump'],
			['liquidation', 'wavecrash'],
			['aquajet', 'flipturn'],
			['gigadrain', 'leafstorm'],
			['powerwhip', 'hornleech'],
			[['airslash', 'bravebird', 'hurricane'], ['airslash', 'bravebird', 'hurricane']],
			['knockoff', 'foulplay'],
			['doubleedge', 'headbutt'],
			['fireblast', ['fierydance', 'flamethrower']],
			['lavaplume', 'magmastorm'],
			['thunderpunch', 'wildcharge'],
			['gunkshot', ['direclaw', 'poisonjab', 'sludgebomb']],
			['aurasphere', 'focusblast'],
			['closecombat', 'drainpunch'],
			['bugbite', 'pounce'],
			['bittermalice', 'shadowball'],
			[['dragonpulse', 'spacialrend'], 'dracometeor'],

			// These status moves are redundant with each other
			['taunt', 'disable'],
			['toxic', ['willowisp', 'thunderwave']],
			[['thunderwave', 'toxic', 'willowisp'], 'toxicspikes'],
			['thunderwave', 'yawn'],

			// This space reserved for assorted hardcodes that otherwise make little sense out of context
			// Landorus and Thundurus
			['nastyplot', ['rockslide', 'knockoff']],
			// Persian
			['switcheroo', 'fakeout'],
			// Beartic
			['snowscape', 'swordsdance'],
			// Magnezone
			['bodypress', 'mirrorcoat'],
			// Amoonguss, though this can work well as a general rule later
			['toxic', 'clearsmog'],
			// Chansey and Blissey
			['healbell', 'stealthrock'],
			// Azelf and Zoroarks
			['trick', 'uturn'],
		];

		for (const pair of incompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

		if (!types.includes('Ice')) this.incompatibleMoves(moves, movePool, 'icebeam', 'icywind');

		if (!isDoubles) this.incompatibleMoves(moves, movePool, ['taunt', 'strengthsap'], 'encore');

		if (!types.includes('Dark') && teraType !== 'Dark') this.incompatibleMoves(moves, movePool, 'knockoff', 'suckerpunch');

		// This space reserved for assorted hardcodes that otherwise make little sense out of context
		if (species.id === 'luvdisc') {
			this.incompatibleMoves(moves, movePool, ['charm', 'flipturn', 'icebeam'], ['charm', 'flipturn']);
		}
		if (species.id === "dugtrio") this.incompatibleMoves(moves, movePool, statusMoves, 'memento');
		if (species.id === "cyclizar") this.incompatibleMoves(moves, movePool, 'taunt', 'knockoff');
		if (species.baseSpecies === 'Dudunsparce') this.incompatibleMoves(moves, movePool, 'earthpower', 'shadowball');
		if (species.id === 'mesprit') this.incompatibleMoves(moves, movePool, 'healingwish', 'uturn');
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

		// Enforce Sticky Web
		if (movePool.includes('stickyweb')) {
			counter = this.addMove('stickyweb', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}

		// Enforce Revelation Dance
		if (movePool.includes('revelationdance')) {
			counter = this.addMove('revelationdance', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}

		// Enforce Revival Blessing
		if (movePool.includes('revivalblessing')) {
			counter = this.addMove('revivalblessing', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}

		// Enforce Salt Cure
		if (movePool.includes('saltcure')) {
			counter = this.addMove('saltcure', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
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

		// Enforce redirecting moves, or Fake Out if no redirecting move
		if (role === 'Doubles Support') {
			const redirectMoves = movePool.filter(moveid => ['followme', 'ragepowder'].includes(moveid));
			if (redirectMoves.length) {
				const moveid = this.sample(redirectMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			} else {
				if (movePool.includes('fakeout')) {
					counter = this.addMove('fakeout', moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
			}
		}

		// Enforce Protect
		if (role.includes('Protect') || species.id === 'gliscor') {
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
			'Marvel Scale', 'Misty Surge', 'Moody', 'Own Tempo', 'Pressure', 'Quick Feet', 'Rain Dish', 'Sand Veil', 'Sniper', 'Snow Cloak',
			'Steadfast', 'Steam Engine',
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
			return (species.id === 'kilowattrel' && !isDoubles);
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
			return (counter.get('Physical') < 2 || moves.has('fakeout') || moves.has('rapidspin'));
		case 'Infiltrator':
			return (isDoubles && abilities.has('Clear Body'));
		case 'Insomnia':
			return (role === 'Wallbreaker');
		case 'Intimidate':
			if (abilities.has('Hustle')) return true;
			if (abilities.has('Sheer Force') && !!counter.get('sheerforce')) return true;
			return (abilities.has('Stakeout'));
		case 'Iron Fist':
			return !counter.ironFist;
		case 'Justified':
			return !counter.get('Physical');
		case 'Libero': case 'Protean':
			return role === 'Offensive Protect' || (species.id === 'meowscarada' && role === 'Fast Attacker');
		case 'Mold Breaker':
			return (abilities.has('Sharpness') || abilities.has('Unburden'));
		case 'Moxie':
			return (!counter.get('Physical') || moves.has('stealthrock'));
		case 'Natural Cure':
			return species.id === 'pawmot';
		case 'Neutralizing Gas':
			return !isDoubles;
		case 'Overcoat': case 'Sweet Veil':
			return types.includes('Grass');
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Prankster':
			return !counter.get('Status');
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
		case 'Shed Skin':
			return species.id === 'seviper' || species.id === 'arbok';
		case 'Sheer Force':
			const braviaryCase = (species.id === 'braviaryhisui' && (role === 'Wallbreaker' || role === 'Bulky Protect'));
			const abilitiesCase = (abilities.has('Guts') || abilities.has('Sharpness'));
			return (!counter.get('sheerforce') || moves.has('bellydrum') || braviaryCase || abilitiesCase);
		case 'Slush Rush':
			return !teamDetails.snow;
		case 'Solar Power':
			return (!teamDetails.sun || !counter.get('Special'));
		case 'Speed Boost':
			return (species.id === 'yanmega' && !moves.has('protect'));
		case 'Sticky Hold':
			return (species.id === 'muk');
		case 'Sturdy':
			return !!counter.get('recoil');
		case 'Swarm':
			return (!counter.get('Bug') || !!counter.get('recovery'));
		case 'Swift Swim':
			return (abilities.has('Intimidate') || (!moves.has('raindance') && !teamDetails.rain));
		case 'Synchronize':
			return (species.id !== 'umbreon' && species.id !== 'rabsca');
		case 'Technician':
			return (!counter.get('technician') || abilities.has('Punk Rock') || abilities.has('Fur Coat'));
		case 'Tinted Lens':
			const hbraviaryCase = (species.id === 'braviaryhisui' && (role === 'Setup Sweeper' || role === 'Doubles Wallbreaker'));
			const yanmegaCase = (species.id === 'yanmega' && moves.has('protect'));
			return (yanmegaCase || hbraviaryCase || species.id === 'illumise');
		case 'Unaware':
			return (species.id === 'clefable' && role !== 'Bulky Support');
		case 'Unburden':
			return (abilities.has('Prankster') || !counter.get('setup'));
		case 'Volt Absorb':
			if (abilities.has('Iron Fist') && counter.ironFist >= 2) return true;
			return (this.dex.getEffectiveness('Electric', species) < -1);
		case 'Water Absorb':
			return (species.id === 'politoed' || species.id === 'quagsire' || moves.has('raindance'));
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
		if (species.id === 'arcaninehisui') return 'Rock Head';
		if (species.id === 'scovillain') return 'Chlorophyll';
		if (species.id === 'empoleon') return 'Competitive';
		if (species.id === 'chandelure') return 'Flash Fire';
		if (species.id === 'golemalola' && moves.has('doubleedge')) return 'Galvanize';
		if (abilities.has('Guts') && (moves.has('facade') || moves.has('sleeptalk') || species.id === 'gurdurr')) return 'Guts';
		if (species.id === 'copperajah' && moves.has('heavyslam')) return 'Heavy Metal';
		if (species.id === 'jumpluff') return 'Infiltrator';
		if (species.id === 'cetitan' && (role === 'Wallbreaker' || isDoubles)) return 'Sheer Force';
		if (species.id === 'ribombee') return 'Shield Dust';
		if (species.id === 'dipplin') return 'Sticky Hold';
		if (species.id === 'breloom') return 'Technician';
		if (species.id === 'shiftry' && moves.has('tailwind')) return 'Wind Rider';

		// singles
		if (!isDoubles) {
			if (species.id === 'hypno') return 'Insomnia';
			if (species.id === 'staraptor') return 'Reckless';
			if (species.id === 'vespiquen') return 'Pressure';
			if (species.id === 'enamorus' && moves.has('calmmind')) return 'Cute Charm';
			if (species.id === 'klawf' && role === 'Setup Sweeper') return 'Anger Shell';
			if (abilities.has('Cud Chew') && moves.has('substitute')) return 'Cud Chew';
			if (abilities.has('Harvest') && (moves.has('protect') || moves.has('substitute'))) return 'Harvest';
			if (abilities.has('Serene Grace') && moves.has('headbutt')) return 'Serene Grace';
			if (abilities.has('Own Tempo') && moves.has('petaldance')) return 'Own Tempo';
			if (abilities.has('Slush Rush') && moves.has('snowscape')) return 'Slush Rush';
			if (abilities.has('Soundproof') && (moves.has('substitute') || moves.has('clangoroussoul'))) return 'Soundproof';
		}

		// doubles, multi, and ffa
		if (isDoubles) {
			if (species.id === 'farigiraf') return 'Armor Tail';
			if (species.id === 'dragapult') return 'Clear Body';
			if (species.id === 'altaria') return 'Cloud Nine';
			if (species.id === 'armarouge') return 'Flash Fire';
			if (species.id === 'talonflame') return 'Gale Wings';
			if (
				['oinkologne', 'oinkolognef', 'snorlax', 'swalot'].includes(species.id) && role !== 'Doubles Wallbreaker'
			) return 'Gluttony';
			if (species.id === 'conkeldurr' && role === 'Doubles Wallbreaker') return 'Guts';
			if (species.id === 'tropius' || species.id === 'trevenant') return 'Harvest';
			if (species.id === 'dragonite' || species.id === 'lucario') return 'Inner Focus';
			if (species.id === 'ariados') return 'Insomnia';
			if (species.id === 'kommoo') return this.sample(['Overcoat', 'Soundproof']);
			if (species.id === 'barraskewda') return 'Propeller Tail';
			if (species.id === 'flapple' || (species.id === 'appletun' && this.randomChance(1, 2))) return 'Ripen';
			if (species.id === 'gumshoos') return 'Strong Jaw';
			if (species.id === 'magnezone') return 'Sturdy';
			if (species.id === 'clefable' && role === 'Doubles Support') return 'Unaware';
			if (species.id === 'drifblim') return 'Unburden';
			if (abilities.has('Intimidate')) return 'Intimidate';

			if (this.randomChance(1, 2) && species.id === 'kingambit') return 'Defiant';

			// just doubles and multi
			if (this.format.gameType !== 'freeforall') {
				if (species.id === 'florges') return 'Flower Veil';
				if (
					species.id === 'clefairy' ||
					(species.baseSpecies === 'Maushold' && role === 'Doubles Support')
				) return 'Friend Guard';
				if (species.id === 'blissey') return 'Healer';
				if (species.id === 'sinistcha') return 'Hospitality';
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
			if (
				!isLead && role === 'Bulky Setup' &&
				(ability === 'Quark Drive' || ability === 'Protosynthesis')
			) {
				return 'Booster Energy';
			}
			if (species.id === 'pincurchin') return 'Shuca Berry';
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
		if (moves.has('clangoroussoul') || (species.id === 'toxtricity' && moves.has('shiftgear'))) return 'Throat Spray';
		if (species.baseSpecies === 'Magearna' && role === 'Tera Blast user') return 'Weakness Policy';
		if (moves.has('lastrespects') || moves.has('dragonenergy')) return 'Choice Scarf';
		if (
			ability === 'Imposter' ||
			(species.id === 'magnezone' && moves.has('bodypress') && !isDoubles)
		) return 'Choice Scarf';
		if (moves.has('bellydrum') && moves.has('substitute')) return 'Salac Berry';
		if (
			['Cheek Pouch', 'Cud Chew', 'Harvest'].some(m => ability === m) ||
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
		if (species.id === 'scyther' && !isDoubles) return (isLead && !moves.has('uturn')) ? 'Eviolite' : 'Heavy-Duty Boots';
		if (species.nfe || species.id === 'dipplin') return 'Eviolite';
		if (ability === 'Poison Heal') return 'Toxic Orb';
		if ((ability === 'Guts' || moves.has('facade')) && !moves.has('sleeptalk')) {
			return (types.includes('Fire') || ability === 'Toxic Boost') ? 'Toxic Orb' : 'Flame Orb';
		}
		if (ability === 'Sheer Force' && counter.get('sheerforce')) return 'Life Orb';
		if (ability === 'Anger Shell') return this.sample(['Rindo Berry', 'Passho Berry', 'Scope Lens', 'Sitrus Berry']);
		if (moves.has('courtchange')) return 'Heavy-Duty Boots';
		if (moves.has('populationbomb')) return 'Wide Lens';
		if (moves.has('scaleshot') && role !== 'Choice Item user') return 'Loaded Dice';
		if (moves.has('stuffcheeks')) return this.randomChance(1, 2) ? 'Liechi Berry' : 'Salac Berry';
		if (ability === 'Unburden') return moves.has('closecombat') ? 'White Herb' : 'Sitrus Berry';
		if (moves.has('shellsmash') && ability !== 'Weak Armor') return 'White Herb';
		if (moves.has('acrobatics') && ability !== 'Protosynthesis') return ability === 'Grassy Surge' ? 'Grassy Seed' : '';
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

		if (species.id === 'ursalunabloodmoon') return 'Silk Scarf';
		if (moves.has('covet')) return 'Normal Gem';
		if (species.id === 'calyrexice') return 'Weakness Policy';
		if (moves.has('waterspout')) return 'Choice Scarf';
		if (role === 'Choice Item user') {
			if (scarfReqs || (counter.get('Physical') < 4 && counter.get('Special') < 3 && !moves.has('memento'))) {
				return 'Choice Scarf';
			}
			return (counter.get('Physical') >= 3) ? 'Choice Band' : 'Choice Specs';
		}
		if (moves.has('blizzard') && ability !== 'Snow Warning' && !teamDetails.snow) return 'Blunder Policy';
		if (counter.get('Physical') >= 4 &&
			['fakeout', 'feint', 'firstimpression', 'rapidspin', 'suckerpunch'].every(m => !moves.has(m)) &&
			(moves.has('flipturn') || moves.has('uturn') || role === 'Doubles Wallbreaker')
		) {
			return (scarfReqs) ? 'Choice Scarf' : 'Choice Band';
		}
		if (
			((counter.get('Special') >= 4 && (moves.has('voltswitch') || role === 'Doubles Wallbreaker')) || (
				counter.get('Special') >= 3 && (moves.has('uturn') || moves.has('flipturn'))
			)) && !moves.has('acidspray') && !moves.has('electroweb')
		) {
			return (scarfReqs) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (
			(role === 'Bulky Protect' && counter.get('setup')) || moves.has('substitute') ||
			species.id === 'eternatus' || species.id === 'toxapex'
		) return 'Leftovers';
		if (species.id === 'sylveon') return 'Pixie Plate';
		if (
			(offensiveRole || (role === 'Tera Blast user' && species.baseStats.spe >= 80 && !moves.has('trickroom'))) &&
			(!moves.has('fakeout') || species.id === 'ambipom') && !moves.has('incinerate') &&
			(!moves.has('uturn') || types.includes('Bug') || species.baseStats.atk >= 120 || ability === 'Libero') &&
			(!moves.has('icywind') || species.id === 'ironbundle')
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
		if (species.id === 'pawmot') return 'Leppa Berry';
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
			species.id !== 'jirachi' && (counter.get('Physical') >= 4 ||
			(counter.get('Physical') >= 3 && moves.has('memento'))) &&
			['fakeout', 'firstimpression', 'flamecharge', 'rapidspin', 'ruination', 'superfang'].every(m => !moves.has(m))
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
			(counter.get('Special') >= 3 && ['flipturn', 'partingshot', 'uturn'].some(m => moves.has(m)))
		) {
			const scarfReqs = (
				role !== 'Wallbreaker' &&
				species.baseStats.spa >= 100 &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Speed Boost' && ability !== 'Tinted Lens' && !counter.get('Physical')
			);
			return (scarfReqs && this.randomChance(1, 2)) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (
			!counter.get('Status') &&
			(moves.has('rapidspin') || !['Fast Attacker', 'Wallbreaker', 'Tera Blast user'].includes(role))
		) {
			return 'Assault Vest';
		}
		if (counter.get('speedsetup') && role === 'Bulky Setup') return 'Weakness Policy';
		if (species.id === 'golem') return 'Custap Berry';
		if (species.id === 'urshifurapidstrike') return 'Punching Glove';
		if (species.id === 'palkia') return 'Lustrous Orb';
		if (moves.has('substitute') || ability === 'Moody') return 'Leftovers';
		if (moves.has('stickyweb') && isLead) return 'Focus Sash';
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
			)
		) return 'Rocky Helmet';
		if (moves.has('outrage')) return 'Lum Berry';
		if (
			role === 'Fast Support' && isLead &&
			!counter.get('recovery') && !counter.get('recoil') && !moves.has('protect') &&
			(species.baseStats.hp + species.baseStats.def + species.baseStats.spd) < 258
		) return 'Focus Sash';
		if (
			!['Fast Attacker', 'Wallbreaker', 'Tera Blast user'].includes(role) && ability !== 'Levitate' &&
			this.dex.getEffectiveness('Ground', species) >= 2
		) return 'Air Balloon';
		if (['Bulky Attacker', 'Bulky Support', 'Bulky Setup'].some(m => role === (m))) return 'Leftovers';
		if (species.id === 'pawmot' && moves.has('nuzzle')) return 'Leppa Berry';
		if (
			['Fast Bulky Setup', 'Fast Attacker', 'Setup Sweeper', 'Wallbreaker'].some(m => role === m) &&
			types.includes('Dark') && moves.has('suckerpunch') && !PRIORITY_POKEMON.includes(species.id) &&
			counter.get('physicalsetup') && counter.get('Dark')
		) return 'Black Glasses';
		if (role === 'Fast Support' || role === 'Fast Bulky Setup') {
			return (counter.get('Physical') + counter.get('Special') >= 3 && !moves.has('nuzzle')) ? 'Life Orb' : 'Leftovers';
		}
		if (
			role === 'Tera Blast user' && species.baseSpecies === 'Florges'
		) return 'Leftovers';
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

	randomSet(
		s: string | Species,
		teamDetails: RandomTeamsTypes.TeamDetails = {},
		isLead = false,
		isDoubles = false
	): RandomTeamsTypes.RandomSet {
		const species = this.dex.species.get(s);
		let forme = species.name;

		if (typeof species.battleOnly === 'string') {
			// Only change the forme. The species has custom moves, and may have different typing and requirements.
			forme = species.battleOnly;
		}
		if (species.cosmeticFormes) {
			forme = this.sample([species.name].concat(species.cosmeticFormes));
		}
		const sets = (this as any)[`random${isDoubles ? 'Doubles' : ''}Sets`][species.id]["sets"];
		const possibleSets = [];

		const ruleTable = this.dex.formats.getRuleTable(this.format);

		for (const set of sets) {
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
		const teraType = this.sampleIfArray(teraTypes);

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

		if (species.baseSpecies === 'Pikachu') {
			forme = 'Pikachu' + this.sample(['', '-Original', '-Hoenn', '-Sinnoh', '-Unova', '-Kalos', '-Alola', '-Partner', '-World']);
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
			if (
				move.id === 'terablast' && (moves.has('shiftgear') || species.baseStats.atk > species.baseStats.spa)
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

		// shuffle moves to add more randomness to camomons
		const shuffledMoves = Array.from(moves);
		this.prng.shuffle(shuffledMoves);
		return {
			name: species.baseSpecies,
			species: forme,
			gender: species.gender,
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
	) {
		const exclude = pokemonToExclude.map(p => toID(p.species));
		const pokemonPool = [];
		const baseSpeciesPool = [];
		const baseSpeciesCount: {[k: string]: number} = {};
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
			pokemonPool.push(pokemon);
			baseSpeciesCount[species.baseSpecies] = (baseSpeciesCount[species.baseSpecies] || 0) + 1;
		}
		// Include base species 1x if 1-3 formes, 2x if 4-6 formes, 3x if 7+ formes
		for (const baseSpecies of Object.keys(baseSpeciesCount)) {
			for (let i = 0; i < Math.min(Math.ceil(baseSpeciesCount[baseSpecies] / 3), 3); i++) {
				baseSpeciesPool.push(baseSpecies);
				// Squawkabilly has 4 formes, but only 2 functionally different formes, so only include it 1x
				if (baseSpecies === 'Squawkabilly') break;
			}
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
		const typePool = this.dex.types.names();
		const type = this.forceMonotype || this.sample(typePool);

		// PotD stuff
		const usePotD = global.Config && Config.potd && ruleTable.has('potd');
		const potd = usePotD ? this.dex.species.get(Config.potd) : null;

		const baseFormes: {[k: string]: number} = {};

		const typeCount: {[k: string]: number} = {};
		const typeComboCount: {[k: string]: number} = {};
		const typeWeaknesses: {[k: string]: number} = {};
		const teamDetails: RandomTeamsTypes.TeamDetails = {};

		const pokemonList = isDoubles ? Object.keys(this.randomDoublesSets) : Object.keys(this.randomSets);
		const [pokemonPool, baseSpeciesPool] = this.getPokemonPool(type, pokemon, isMonotype, pokemonList);

		let leadsRemaining = this.format.gameType === 'doubles' ? 2 : 1;
		while (baseSpeciesPool.length && pokemon.length < this.maxTeamSize) {
			const baseSpecies = this.sampleNoReplace(baseSpeciesPool);
			const currentSpeciesPool: Species[] = [];
			for (const poke of pokemonPool) {
				const species = this.dex.species.get(poke);
				if (species.baseSpecies === baseSpecies) currentSpeciesPool.push(species);
			}
			let species = this.sample(currentSpeciesPool);
			if (!species.exists) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[species.baseSpecies]) continue;

			// Treat Ogerpon formes like the Tera Blast user role; reject if team has one already
			if (species.baseSpecies === 'Ogerpon' && teamDetails.teraBlast) continue;

			// Illusion shouldn't be on the last slot
			if (species.baseSpecies === 'Zoroark' && pokemon.length >= (this.maxTeamSize - 1)) continue;

			const types = species.types;
			const typeCombo = types.slice().sort().join();
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

				// Limit three weak to any type
				for (const typeName of this.dex.types.names()) {
					// it's weak to the type
					if (this.dex.getEffectiveness(typeName, species) > 0) {
						if (!typeWeaknesses[typeName]) typeWeaknesses[typeName] = 0;
						if (typeWeaknesses[typeName] >= 3 * limitFactor) {
							skip = true;
							break;
						}
					}
				}
				if (skip) continue;
			}

			// Limit one of any type combination, three in Monotype
			if (!this.forceMonotype && typeComboCount[typeCombo] >= (isMonotype ? 3 : 1) * limitFactor) continue;

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
			}

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
			if (set.moves.includes('toxicspikes') || set.ability === 'Toxic Debris') {
				teamDetails.toxicSpikes = (teamDetails.toxicSpikes || 0) + 1;
			}
			if (set.moves.includes('stealthrock') || set.moves.includes('stoneaxe')) teamDetails.stealthRock = 1;
			if (set.moves.includes('stickyweb')) teamDetails.stickyWeb = 1;
			if (set.moves.includes('defog')) teamDetails.defog = 1;
			if (set.moves.includes('rapidspin') || set.moves.includes('mortalspin')) teamDetails.rapidSpin = 1;
			if (set.moves.includes('auroraveil') || (set.moves.includes('reflect') && set.moves.includes('lightscreen'))) {
				teamDetails.screens = 1;
			}
			if (set.role === 'Tera Blast user' || species.baseSpecies === "Ogerpon") teamDetails.teraBlast = 1;
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
				pool = this.dex.moves
					.all()
					.filter(move => !(move.isNonstandard || move.isZ || move.isMax || move.realMove))
					.map(m => m.id);
			} else {
				const formes = ['gastrodoneast', 'pumpkaboosuper', 'zygarde10'];
				let learnset = this.dex.species.getLearnset(species.id);
				let learnsetSpecies = species;
				if (formes.includes(species.id) || !learnset) {
					learnsetSpecies = this.dex.species.get(species.baseSpecies);
					learnset = this.dex.species.getLearnset(learnsetSpecies.id);
				}
				if (learnset) {
					pool = Object.keys(learnset).filter(
						moveid => learnset![moveid].find(learned => learned.startsWith(String(this.gen)))
					);
				}
				if (learnset && learnsetSpecies === species && species.changesFrom) {
					learnset = this.dex.species.getLearnset(toID(species.changesFrom));
					for (const moveid in learnset) {
						if (!pool.includes(moveid) && learnset[moveid].some(source => source.startsWith(String(this.gen)))) {
							pool.push(moveid);
						}
					}
				}
				const evoRegion = learnsetSpecies.evoRegion && learnsetSpecies.gen !== this.gen;
				for (let i = 0; i < 2 && learnsetSpecies.prevo; i++) {
					learnsetSpecies = this.dex.species.get(learnsetSpecies.prevo);
					learnset = this.dex.species.getLearnset(learnsetSpecies.id);
					for (const moveid in learnset) {
						if (!pool.includes(moveid) && learnset[moveid].some(
							source => source.startsWith(String(this.gen)) && (!evoRegion || source.charAt(1) === 'E')
						)) {
							pool.push(moveid);
						}
					}
				}
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
				set.teraType = this.sample(this.dex.types.all()).name;
			}
			team.push(set);
		}

		return team;
	}

	randomNPokemon(n: number, requiredType?: string, minSourceGen?: number, ruleTable?: RuleTable, requireMoves = false) {
		// Picks `n` random pokemon--no repeats, even among formes
		// Also need to either normalize for formes or select formes at random
		// Unreleased are okay but no CAP
		const last = [0, 151, 251, 386, 493, 649, 721, 807, 898, 1010][this.gen];

		if (n <= 0 || n > last) throw new Error(`n must be a number between 1 and ${last} (got ${n})`);
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
					const hasMovesInCurrentGen = Object.values(this.dex.species.getLearnset(species.id) || {})
						.some(sources => sources.some(source => source.startsWith('9')));
					if (!hasMovesInCurrentGen) continue;
				}
				if (requiredType && !species.types.includes(requiredType)) continue;
				if (minSourceGen && species.gen < minSourceGen) continue;
				const num = species.num;
				if (num <= 0 || pool.includes(num)) continue;
				if (num > last) break;
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
				set.teraType = this.sample(this.dex.types.all()).name;
			}
			team.push(set);
		}

		return team;
	}
}

export default RandomTeams;
