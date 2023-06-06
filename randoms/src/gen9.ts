import {Utils} from './utils';
import {
	Ability,
	AnyObject,
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
const randomSetsJSON = {"charizard":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flamethrower","Focus Blast","Hurricane","Will-O-Wisp"],"teraTypes":["Fire","Ground","Water"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Flare Blitz","Swords Dance","Thunder Punch"],"teraTypes":["Fire","Ground"]}]},"pikachu":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["Fake Out","Play Rough","Surf","Volt Switch","Volt Tackle"],"teraTypes":["Water"]}]},"raichu":{"level":88,"sets":[{"role":"Fast Support","movepool":["Encore","Focus Blast","Grass Knot","Nasty Plot","Nuzzle","Surf","Thunderbolt","Volt Switch"],"teraTypes":["Water","Grass"]}]},"raichualola":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Nasty Plot","Psychic","Psyshock","Surf","Thunderbolt","Volt Switch"],"teraTypes":["Water","Grass","Fighting"]}]},"wigglytuff":{"level":95,"sets":[{"role":"Bulky Support","movepool":["Dazzling Gleam","Fire Blast","Light Screen","Protect","Reflect","Stealth Rock","Thunder Wave","Wish"],"teraTypes":["Steel"]}]},"venomoth":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["Bug Buzz","Quiver Dance","Sleep Powder","Sludge Bomb","Substitute"],"teraTypes":["Bug","Poison","Steel","Water"]}]},"dugtrio":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Memento","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"teraTypes":["Ground","Ghost","Fairy","Flying","Dark"]}]},"dugtrioalola":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Iron Head","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"teraTypes":["Ground","Steel"]}]},"persian":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["Aerial Ace","Bite","Body Slam","Fake Out","Foul Play","Gunk Shot","Switcheroo","U-turn"],"teraTypes":["Normal","Poison","Flying"]}]},"persianalola":{"level":87,"sets":[{"role":"Fast Bulky Setup","movepool":["Dark Pulse","Hypnosis","Nasty Plot","Power Gem","Thunderbolt"],"teraTypes":["Dark","Electric"]}]},"golduck":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["Encore","Grass Knot","Hydro Pump","Ice Beam","Nasty Plot","Psyshock"],"teraTypes":["Water"]}]},"annihilape":{"level":76,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Drain Punch","Rage Fist","Rest"],"teraTypes":["Ghost","Water","Fairy","Steel"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Gunk Shot","Rage Fist","Stone Edge","Taunt"],"teraTypes":["Ghost","Water","Fairy","Steel"]}]},"arcanine":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Morning Sun","Roar","Wild Charge","Will-O-Wisp"],"teraTypes":["Fighting","Normal"]},{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Morning Sun","Wild Charge"],"teraTypes":["Fighting","Normal"]}]},"arcaninehisui":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Head Smash","Morning Sun","Wild Charge"],"teraTypes":["Rock"]}]},"slowbro":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Psyshock","Slack Off","Surf","Thunder Wave"],"teraTypes":["Water","Fairy"]},{"role":"AV Pivot","movepool":["Body Press","Fire Blast","Future Sight","Ice Beam","Psychic","Surf"],"teraTypes":["Fighting","Water"]}]},"slowbrogalar":{"level":86,"sets":[{"role":"AV Pivot","movepool":["Earthquake","Fire Blast","Foul Play","Psychic","Shell Side Arm","Surf"],"teraTypes":["Ground","Water","Poison","Dark"]},{"role":"Wallbreaker","movepool":["Fire Blast","Psyshock","Sludge Bomb","Trick","Trick Room"],"teraTypes":["Psychic","Poison"]}]},"muk":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Drain Punch","Gunk Shot","Haze","Ice Punch","Shadow Sneak","Toxic","Toxic Spikes"],"teraTypes":["Dragon","Dark"]}]},"mukalola":{"level":83,"sets":[{"role":"AV Pivot","movepool":["Drain Punch","Gunk Shot","Ice Punch","Knock Off","Poison Jab"],"teraTypes":["Dark"]}]},"cloyster":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Drill Run","Icicle Spear","Rock Blast","Shell Smash"],"teraTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Hydro Pump","Icicle Spear","Rock Blast","Shell Smash"],"teraTypes":["Ice","Rock"]}]},"gengar":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Focus Blast","Nasty Plot","Shadow Ball","Sludge Bomb","Trick"],"teraTypes":["Ghost"]},{"role":"Fast Attacker","movepool":["Encore","Focus Blast","Shadow Ball","Sludge Bomb","Toxic Spikes","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"hypno":{"level":95,"sets":[{"role":"Bulky Support","movepool":["Encore","Focus Blast","Foul Play","Light Screen","Psychic","Reflect","Thunder Wave"],"teraTypes":["Dark","Steel"]}]},"electrode":{"level":92,"sets":[{"role":"Fast Support","movepool":["Explosion","Foul Play","Taunt","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]}]},"electrodehisui":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Energy Ball","Leaf Storm","Taunt","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Grass"]},{"role":"Fast Support","movepool":["Giga Drain","Leech Seed","Substitute","Thunderbolt"],"teraTypes":["Poison"]}]},"scyther":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["Aerial Ace","Close Combat","Pounce","Swords Dance"],"teraTypes":["Fighting"]},{"role":"Fast Support","movepool":["Aerial Ace","Close Combat","Defog","U-turn"],"teraTypes":["Fighting"]}]},"tauros":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Body Slam","Close Combat","Earthquake","Rock Slide","Zen Headbutt"],"teraTypes":["Normal","Fighting","Ground"]},{"role":"Wallbreaker","movepool":["Close Combat","Double-Edge","Earthquake","Stone Edge"],"teraTypes":["Normal","Fighting","Ground"]}]},"taurospaldeacombat":{"level":84,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Raging Bull","Stone Edge","Substitute"],"teraTypes":["Fighting","Steel"]},{"role":"Wallbreaker","movepool":["Bulk Up","Close Combat","Earthquake","Iron Head","Stone Edge"],"teraTypes":["Fighting"]}]},"taurospaldeablaze":{"level":82,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Raging Bull","Substitute"],"teraTypes":["Water"]},{"role":"Wallbreaker","movepool":["Close Combat","Flare Blitz","Stone Edge","Wild Charge"],"teraTypes":["Fighting"]}]},"taurospaldeaaqua":{"level":82,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Liquidation","Substitute"],"teraTypes":["Steel","Water"]},{"role":"Wallbreaker","movepool":["Aqua Jet","Bulk Up","Close Combat","Liquidation","Stone Edge","Wave Crash"],"teraTypes":["Water"]}]},"gyarados":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Stone Edge","Waterfall"],"teraTypes":["Ground"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Earthquake","Tera Blast","Waterfall"],"teraTypes":["Flying"]}]},"ditto":{"level":87,"sets":[{"role":"Fast Support","movepool":["Transform"],"teraTypes":["Flying","Dark","Fire","Bug","Water","Ice","Fighting","Electric","Psychic","Poison","Grass","Ghost","Ground","Rock","Fairy","Steel","Normal","Dragon"]}]},"vaporeon":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Ice Beam","Protect","Surf","Wish"],"teraTypes":["Ghost","Ground"]}]},"jolteon":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Hyper Voice","Shadow Ball","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Ghost"]},{"role":"Tera Blast user","movepool":["Calm Mind","Substitute","Tera Blast","Thunderbolt"],"teraTypes":["Ice"]}]},"flareon":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Facade","Flare Blitz","Quick Attack","Trailblaze","Will-O-Wisp"],"teraTypes":["Normal"]}]},"articuno":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Air Slash","Freeze-Dry","Haze","Hurricane","Roost","Substitute","U-turn"],"teraTypes":["Steel","Ground"]}]},"articunogalar":{"level":83,"sets":[{"role":"Fast Bulky Setup","movepool":["Air Slash","Calm Mind","Freezing Glare","Hurricane","Recover"],"teraTypes":["Psychic","Steel"]}]},"zapdos":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Heat Wave","Hurricane","Roost","Thunderbolt","U-turn"],"teraTypes":["Electric"]}]},"zapdosgalar":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Bulk Up","Close Combat","Stomping Tantrum","U-turn"],"teraTypes":["Fighting"]}]},"moltres":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Fire Blast","Roost","U-turn","Will-O-Wisp"],"teraTypes":["Fire","Ground"]}]},"moltresgalar":{"level":80,"sets":[{"role":"Fast Bulky Setup","movepool":["Agility","Fiery Wrath","Hurricane","Nasty Plot","Rest"],"teraTypes":["Dark"]}]},"dragonite":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["Dragon Dance","Earthquake","Extreme Speed","Fire Punch","Outrage"],"teraTypes":["Normal"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Earthquake","Outrage","Tera Blast"],"teraTypes":["Flying"]}]},"mewtwo":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Aura Sphere","Dark Pulse","Fire Blast","Nasty Plot","Psystrike","Recover"],"teraTypes":["Dark","Fighting","Fire","Psychic"]}]},"mew":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Encore","Psychic","Stealth Rock","Taunt","Toxic Spikes","U-turn","Will-O-Wisp"],"teraTypes":["Steel","Fairy"]},{"role":"Setup Sweeper","movepool":["Brave Bird","Close Combat","Flare Blitz","Leech Life","Psychic Fangs","Swords Dance"],"teraTypes":["Fighting"]},{"role":"Fast Bulky Setup","movepool":["Aura Sphere","Dark Pulse","Dazzling Gleam","Earth Power","Fire Blast","Hydro Pump","Nasty Plot","Psyshock"],"teraTypes":["Psychic","Fighting","Fire","Dark","Ground","Fairy","Water"]}]},"typhlosion":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Eruption","Fire Blast","Focus Blast","Shadow Ball"],"teraTypes":["Fire","Fighting"]}]},"typhlosionhisui":{"level":83,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Flamethrower","Shadow Ball","Substitute","Will-O-Wisp"],"teraTypes":["Ghost"]},{"role":"Fast Attacker","movepool":["Eruption","Fire Blast","Focus Blast","Shadow Ball"],"teraTypes":["Fire","Ghost"]}]},"ampharos":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Agility","Dazzling Gleam","Focus Blast","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Fairy"]}]},"azumarill":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Aqua Jet","Belly Drum","Liquidation","Play Rough"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Aqua Jet","Ice Spinner","Liquidation","Play Rough","Superpower"],"teraTypes":["Water"]}]},"sudowoodo":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Head Smash","Spikes","Stealth Rock","Sucker Punch","Wood Hammer"],"teraTypes":["Rock","Grass"]}]},"jumpluff":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Acrobatics","Leech Seed","Strength Sap","Substitute"],"teraTypes":["Steel"]},{"role":"Fast Support","movepool":["Acrobatics","Encore","Sleep Powder","Strength Sap","U-turn"],"teraTypes":["Steel"]}]},"sunflora":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Earth Power","Leaf Storm","Sludge Bomb"],"teraTypes":["Grass","Ground","Fairy","Poison"]}]},"quagsire":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ice Beam","Liquidation","Recover","Spikes","Toxic"],"teraTypes":["Poison","Steel","Fairy"]}]},"clodsire":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["Curse","Earthquake","Gunk Shot","Recover"],"teraTypes":["Ground","Flying"]},{"role":"Bulky Support","movepool":["Earthquake","Haze","Poison Jab","Recover","Stealth Rock","Toxic","Toxic Spikes"],"teraTypes":["Ground","Flying","Steel"]}]},"espeon":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Morning Sun","Psychic","Shadow Ball","Trick"],"teraTypes":["Fairy","Psychic"]}]},"umbreon":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Protect","Thunder Wave","Wish","Yawn"],"teraTypes":["Poison"]}]},"slowking":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Chilly Reception","Psyshock","Slack Off","Surf","Thunder Wave"],"teraTypes":["Water","Fairy","Dragon"]},{"role":"Wallbreaker","movepool":["Fire Blast","Hydro Pump","Ice Beam","Psychic","Psyshock","Trick Room"],"teraTypes":["Water","Psychic"]}]},"slowkinggalar":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Chilly Reception","Fire Blast","Psyshock","Slack Off","Sludge Bomb","Thunder Wave"],"teraTypes":["Poison","Dark"]},{"role":"AV Pivot","movepool":["Fire Blast","Future Sight","Ice Beam","Psyshock","Sludge Bomb"],"teraTypes":["Poison","Psychic"]}]},"girafarig":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Dazzling Gleam","Nasty Plot","Psychic","Psyshock","Shadow Ball","Thunderbolt"],"teraTypes":["Psychic","Fairy","Electric"]}]},"forretress":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Body Press","Iron Head","Rapid Spin","Spikes","Stealth Rock","Volt Switch"],"teraTypes":["Water"]}]},"dunsparce":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Coil","Earthquake","Roost"],"teraTypes":["Ground"]}]},"qwilfish":{"level":86,"sets":[{"role":"Fast Support","movepool":["Destiny Bond","Gunk Shot","Spikes","Taunt","Thunder Wave","Toxic Spikes","Waterfall"],"teraTypes":["Water","Dark"]}]},"qwilfishhisui":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Crunch","Gunk Shot","Spikes","Taunt","Toxic Spikes"],"teraTypes":["Poison","Flying"]}]},"overqwil":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Crunch","Gunk Shot","Liquidation","Swords Dance"],"teraTypes":["Water"]}]},"scizor":{"level":80,"sets":[{"role":"Bulky Support","movepool":["Bullet Punch","Close Combat","Defog","U-turn"],"teraTypes":["Dragon","Steel"]},{"role":"Fast Attacker","movepool":["Bullet Punch","Close Combat","Pounce","Swords Dance","U-turn"],"teraTypes":["Steel"]}]},"heracross":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Facade","Throat Chop","Trailblaze"],"teraTypes":["Normal"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Megahorn","Stone Edge","Throat Chop"],"teraTypes":["Rock","Bug","Fighting"]}]},"ursaring":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Crunch","Earthquake","Rest","Sleep Talk"],"teraTypes":["Ground","Ghost"]}]},"delibird":{"level":100,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Drill Run","Ice Shard","Ice Spinner"],"teraTypes":["Ice","Flying","Ground"]},{"role":"Fast Support","movepool":["Freeze-Dry","Memento","Rapid Spin","Spikes"],"teraTypes":["Ghost"]}]},"houndoom":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Fire Blast","Nasty Plot","Sludge Bomb","Sucker Punch"],"teraTypes":["Dark","Poison","Fire"]}]},"donphan":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ice Spinner","Knock Off","Rapid Spin","Stealth Rock"],"teraTypes":["Grass","Ghost"]},{"role":"Bulky Attacker","movepool":["Earthquake","Gunk Shot","Ice Shard","Ice Spinner","Knock Off","Rapid Spin","Stone Edge"],"teraTypes":["Ice","Poison","Dark"]}]},"blissey":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Heal Bell","Seismic Toss","Shadow Ball","Soft-Boiled","Thunder Wave"],"teraTypes":["Steel","Fairy","Ghost","Poison"]}]},"tyranitar":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Crunch","Dragon Dance","Earthquake","Fire Punch","Stone Edge"],"teraTypes":["Rock","Ghost"]},{"role":"Bulky Support","movepool":["Crunch","Earthquake","Fire Blast","Ice Beam","Stealth Rock","Stone Edge","Thunder Wave"],"teraTypes":["Rock","Poison"]}]},"pelipper":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Hurricane","Hydro Pump","Ice Beam","Knock Off","Roost","Surf","U-turn"],"teraTypes":["Water","Ground"]},{"role":"Wallbreaker","movepool":["Hurricane","Hydro Pump","Ice Beam","Surf","U-turn"],"teraTypes":["Water","Flying"]}]},"gardevoir":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Focus Blast","Healing Wish","Moonblast","Mystical Fire","Psychic","Psyshock","Trick"],"teraTypes":["Fairy","Fire","Fighting"]}]},"masquerain":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["Bug Buzz","Hurricane","Hydro Pump","Quiver Dance"],"teraTypes":["Water"]},{"role":"Fast Support","movepool":["Bug Buzz","Hurricane","Hydro Pump","Ice Beam","Sticky Web","Stun Spore","U-turn"],"teraTypes":["Ground","Steel"]}]},"breloom":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Bullet Seed","Mach Punch","Rock Tomb","Spore","Swords Dance"],"teraTypes":["Fighting","Rock"]}]},"vigoroth":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Bulk Up","Earthquake","Slack Off","Throat Chop"],"teraTypes":["Ghost","Ground"]}]},"slaking":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Body Slam","Earthquake","Giga Impact","Throat Chop"],"teraTypes":["Normal","Ground","Ghost"]}]},"hariyama":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Bulk Up","Bullet Punch","Close Combat","Facade","Headlong Rush","Knock Off"],"teraTypes":["Normal"]},{"role":"AV Pivot","movepool":["Bullet Punch","Close Combat","Headlong Rush","Heavy Slam","Knock Off"],"teraTypes":["Steel"]}]},"sableye":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Encore","Foul Play","Knock Off","Recover","Taunt","Thunder Wave","Will-O-Wisp"],"teraTypes":["Steel"]}]},"medicham":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Bullet Punch","Close Combat","Ice Punch","Poison Jab","Zen Headbutt"],"teraTypes":["Fighting"]}]},"swalot":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Encore","Ice Beam","Pain Split","Protect","Sludge Bomb","Toxic","Toxic Spikes"],"teraTypes":["Dark"]},{"role":"Bulky Setup","movepool":["Earthquake","Gunk Shot","Seed Bomb","Swords Dance"],"teraTypes":["Poison","Ground","Grass","Dark"]}]},"camerupt":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Lava Plume","Stealth Rock","Yawn"],"teraTypes":["Grass","Water"]}]},"torkoal":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Lava Plume","Rapid Spin","Solar Beam","Stealth Rock","Yawn"],"teraTypes":["Dragon","Grass"]}]},"grumpig":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["Dazzling Gleam","Earth Power","Nasty Plot","Psychic","Psyshock","Shadow Ball"],"teraTypes":["Psychic","Fairy","Ground","Ghost"]},{"role":"Bulky Attacker","movepool":["Earth Power","Focus Blast","Psychic","Psyshock","Shadow Ball","Trick"],"teraTypes":["Psychic","Ground","Ghost","Fighting"]}]},"cacturne":{"level":92,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Focus Blast","Leaf Storm","Sucker Punch","Toxic Spikes"],"teraTypes":["Dark","Poison","Grass"]},{"role":"Setup Sweeper","movepool":["Drain Punch","Seed Bomb","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fighting"]}]},"altaria":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Defog","Earthquake","Haze","Roost","Will-O-Wisp"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Brave Bird","Dragon Dance","Earthquake","Roost"],"teraTypes":["Flying","Ground"]}]},"zangoose":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Facade","Night Slash","Quick Attack","Swords Dance"],"teraTypes":["Normal"]}]},"seviper":{"level":92,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flamethrower","Giga Drain","Glare","Gunk Shot","Switcheroo"],"teraTypes":["Ground","Fire","Poison","Grass"]}]},"whiscash":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Hydro Pump","Ice Beam","Spikes","Stealth Rock"],"teraTypes":["Ground","Steel"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Liquidation","Stone Edge"],"teraTypes":["Ground","Water"]}]},"banette":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["Gunk Shot","Knock Off","Shadow Claw","Shadow Sneak","Swords Dance","Thunder Wave","Will-O-Wisp"],"teraTypes":["Poison","Dark"]}]},"tropius":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Air Slash","Leech Seed","Protect","Substitute"],"teraTypes":["Steel"]}]},"glalie":{"level":94,"sets":[{"role":"Fast Support","movepool":["Disable","Earthquake","Freeze-Dry","Spikes","Taunt"],"teraTypes":["Poison","Steel","Water","Ground"]}]},"luvdisc":{"level":100,"sets":[{"role":"Bulky Support","movepool":["Charm","Ice Beam","Protect","Surf","Wish"],"teraTypes":["Dragon","Ghost"]}]},"salamence":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Dual Wingbeat","Earthquake","Outrage","Roost"],"teraTypes":["Flying","Ground","Dragon"]}]},"kyogre":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Ice Beam","Origin Pulse","Thunder","Water Spout"],"teraTypes":["Water"]}]},"groudon":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["Lava Plume","Precipice Blades","Spikes","Stealth Rock","Stone Edge","Thunder Wave"],"teraTypes":["Fire","Dragon","Water","Ghost"]},{"role":"Bulky Setup","movepool":["Fire Punch","Precipice Blades","Stone Edge","Swords Dance","Thunder Wave"],"teraTypes":["Ground","Fire"]}]},"rayquaza":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Dragon Ascent","Dragon Dance","Earthquake","Extreme Speed","Swords Dance","U-turn"],"teraTypes":["Flying","Normal"]}]},"staraptor":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Close Combat","Double-Edge","Quick Attack","U-turn"],"teraTypes":["Fighting","Flying"]}]},"kricketune":{"level":97,"sets":[{"role":"Fast Support","movepool":["Brick Break","Pounce","Sticky Web","Taunt"],"teraTypes":["Ghost"]}]},"luxray":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Crunch","Facade","Play Rough","Trailblaze","Wild Charge"],"teraTypes":["Normal"]},{"role":"AV Pivot","movepool":["Crunch","Ice Fang","Play Rough","Volt Switch","Wild Charge"],"teraTypes":["Electric","Fairy"]}]},"vespiquen":{"level":98,"sets":[{"role":"Bulky Support","movepool":["Air Slash","Hurricane","Roost","Spikes","Toxic","Toxic Spikes","U-turn"],"teraTypes":["Steel"]}]},"pachirisu":{"level":95,"sets":[{"role":"AV Pivot","movepool":["Nuzzle","Super Fang","Thunderbolt","U-turn"],"teraTypes":["Flying"]}]},"floatzel":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Crunch","Ice Spinner","Low Kick","Wave Crash"],"teraTypes":["Water"]},{"role":"Tera Blast user","movepool":["Bulk Up","Ice Spinner","Liquidation","Tera Blast"],"teraTypes":["Electric","Grass"]}]},"gastrodon":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Clear Smog","Earthquake","Ice Beam","Recover","Stealth Rock","Surf"],"teraTypes":["Steel","Poison"]}]},"drifblim":{"level":86,"sets":[{"role":"Fast Support","movepool":["Air Slash","Defog","Shadow Ball","Strength Sap","Will-O-Wisp"],"teraTypes":["Ghost","Fairy"]},{"role":"Fast Bulky Setup","movepool":["Air Slash","Calm Mind","Shadow Ball","Strength Sap"],"teraTypes":["Ghost","Fairy"]}]},"mismagius":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Energy Ball","Mystical Fire","Nasty Plot","Shadow Ball","Thunderbolt","Trick"],"teraTypes":["Ghost","Fire","Fairy","Electric"]}]},"honchkrow":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Heat Wave","Sucker Punch","U-turn"],"teraTypes":["Dark","Flying"]}]},"skuntank":{"level":87,"sets":[{"role":"Fast Support","movepool":["Crunch","Fire Blast","Gunk Shot","Sucker Punch","Taunt","Toxic Spikes"],"teraTypes":["Dark","Poison"]}]},"bronzong":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Hypnosis","Iron Head","Light Screen","Psychic","Reflect","Stealth Rock"],"teraTypes":["Water","Electric"]}]},"spiritomb":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Pain Split","Shadow Sneak","Sucker Punch","Will-O-Wisp"],"teraTypes":["Dark"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dark Pulse","Rest","Sleep Talk"],"teraTypes":["Steel"]}]},"garchomp":{"level":76,"sets":[{"role":"Fast Support","movepool":["Draco Meteor","Earthquake","Fire Blast","Spikes","Stealth Rock","Stone Edge"],"teraTypes":["Ground","Steel"]},{"role":"Fast Attacker","movepool":["Earthquake","Fire Fang","Outrage","Stone Edge","Swords Dance"],"teraTypes":["Ground","Dragon"]}]},"lucario":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Meteor Mash","Stone Edge","Swords Dance"],"teraTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["Aura Sphere","Dark Pulse","Flash Cannon","Focus Blast","Nasty Plot","Vacuum Wave"],"teraTypes":["Fighting"]}]},"hippowdon":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Slack Off","Stealth Rock","Stone Edge","Whirlwind","Yawn"],"teraTypes":["Dragon","Rock","Steel"]}]},"toxicroak":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Gunk Shot","Ice Punch","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fighting"]}]},"lumineon":{"level":92,"sets":[{"role":"Fast Support","movepool":["Dazzling Gleam","Encore","Hydro Pump","Ice Beam","U-turn"],"teraTypes":["Water","Fairy"]}]},"abomasnow":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Aurora Veil","Blizzard","Earthquake","Ice Shard","Wood Hammer"],"teraTypes":["Ice","Water"]}]},"weavile":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Ice Shard","Ice Spinner","Low Kick","Night Slash","Swords Dance"],"teraTypes":["Ice","Fighting"]}]},"sneasler":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Dire Claw","Gunk Shot","Night Slash","U-turn"],"teraTypes":["Dark","Fighting"]},{"role":"Setup Sweeper","movepool":["Acrobatics","Close Combat","Gunk Shot","Swords Dance"],"teraTypes":["Flying"]}]},"magnezone":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Flash Cannon","Mirror Coat","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Water","Flying"]}]},"leafeon":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Double-Edge","Leaf Blade","Substitute","Swords Dance","Synthesis","X-Scissor"],"teraTypes":["Normal"]}]},"glaceon":{"level":93,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Freeze-Dry","Protect","Wish","Yawn"],"teraTypes":["Water"]}]},"gallade":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Leaf Blade","Night Slash","Psycho Cut","Sacred Sword","Swords Dance"],"teraTypes":["Fighting","Grass","Dark"]}]},"froslass":{"level":86,"sets":[{"role":"Fast Support","movepool":["Destiny Bond","Ice Beam","Shadow Ball","Spikes","Taunt","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"rotom":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Nasty Plot","Shadow Ball","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Ghost","Electric"]}]},"rotomwash":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Hydro Pump","Nasty Plot","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Water","Electric"]}]},"rotomheat":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Nasty Plot","Overheat","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Fire","Electric"]}]},"rotomfrost":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Blizzard","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric"]}]},"rotomfan":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Electric"]}]},"rotommow":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Leaf Storm","Nasty Plot","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Grass","Electric"]}]},"uxie":{"level":83,"sets":[{"role":"Fast Support","movepool":["Encore","Light Screen","Psychic","Reflect","Stealth Rock","Thunder Wave","U-turn","Yawn"],"teraTypes":["Steel","Electric"]}]},"mesprit":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Dazzling Gleam","Energy Ball","Healing Wish","Ice Beam","Nasty Plot","Psychic","Thunderbolt","U-turn"],"teraTypes":["Psychic","Fairy","Electric"]},{"role":"Bulky Support","movepool":["Encore","Psychic","Stealth Rock","Thunder Wave","Thunderbolt","U-turn"],"teraTypes":["Electric"]}]},"azelf":{"level":82,"sets":[{"role":"Fast Support","movepool":["Explosion","Fire Blast","Psychic","Stealth Rock","Taunt","U-turn"],"teraTypes":["Psychic","Fire"]},{"role":"Fast Attacker","movepool":["Dazzling Gleam","Fire Blast","Nasty Plot","Psychic","Psyshock","Thunderbolt","Trick","U-turn"],"teraTypes":["Psychic","Fairy","Fire","Electric"]}]},"dialga":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Flash Cannon","Stealth Rock","Thunder Wave","Thunderbolt"],"teraTypes":["Dragon","Steel","Fire"]}]},"dialgaorigin":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Flash Cannon","Stealth Rock","Thunder Wave"],"teraTypes":["Dragon","Steel","Fire"]}]},"palkia":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend"],"teraTypes":["Dragon","Water"]},{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend","Thunder Wave"],"teraTypes":["Dragon","Water"]}]},"palkiaorigin":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend","Thunder Wave"],"teraTypes":["Dragon","Water"]}]},"heatran":{"level":79,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Flash Cannon","Lava Plume","Magma Storm","Stealth Rock"],"teraTypes":["Flying","Grass","Steel"]}]},"giratina":{"level":75,"sets":[{"role":"Fast Support","movepool":["Dragon Tail","Rest","Shadow Ball","Sleep Talk","Will-O-Wisp"],"teraTypes":["Ghost","Fairy"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dragon Pulse","Rest","Sleep Talk"],"teraTypes":["Dragon","Fairy"]},{"role":"Bulky Support","movepool":["Defog","Dragon Tail","Rest","Shadow Ball","Will-O-Wisp"],"teraTypes":["Ghost","Fairy"]}]},"giratinaorigin":{"level":74,"sets":[{"role":"Bulky Support","movepool":["Defog","Draco Meteor","Dragon Tail","Earthquake","Outrage","Shadow Ball","Shadow Sneak","Will-O-Wisp"],"teraTypes":["Dragon","Ghost"]}]},"cresselia":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Moonlight","Psyshock","Thunderbolt"],"teraTypes":["Fairy","Electric","Poison","Steel"]}]},"arceus":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Recover","Shadow Claw","Swords Dance"],"teraTypes":["Normal"]}]},"arceusbug":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Earth Power","Ice Beam","Judgment"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Recover"],"teraTypes":["Fire"]}]},"arceusdark":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Recover","Sludge Bomb"],"teraTypes":["Ghost","Poison","Fire"]}]},"arceusdragon":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Gunk Shot","Outrage","Swords Dance"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Sludge Bomb"],"teraTypes":["Fire"]}]},"arceuselectric":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Ice Beam","Judgment","Recover"],"teraTypes":["Electric","Ice"]}]},"arceusfairy":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"teraTypes":["Steel","Ground","Fire"]}]},"arceusfighting":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Cosmic Power","Recover","Stored Power"],"teraTypes":["Steel","Psychic"]}]},"arceusfire":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Flare Blitz","Liquidation","Recover","Swords Dance"],"teraTypes":["Fire","Ground","Water"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Earth Power","Ice Beam","Judgment","Recover","Thunderbolt"],"teraTypes":["Ground","Electric"]}]},"arceusflying":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover"],"teraTypes":["Steel","Ground"]}]},"arceusghost":{"level":70,"sets":[{"role":"Bulky Support","movepool":["Focus Blast","Hex","Recover","Will-O-Wisp"],"teraTypes":["Fighting","Normal"]},{"role":"Bulky Setup","movepool":["Calm Mind","Focus Blast","Judgment","Recover"],"teraTypes":["Fighting","Normal","Ghost"]}]},"arceusgrass":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Earth Power","Ice Beam","Judgment"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Judgment","Recover"],"teraTypes":["Fire"]}]},"arceusground":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Ice Beam","Judgment","Recover"],"teraTypes":["Ground","Dragon"]},{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Stone Edge","Swords Dance"],"teraTypes":["Normal"]}]},"arceusice":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Recover","Thunderbolt"],"teraTypes":["Electric","Ground"]}]},"arceuspoison":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Flare Blitz","Gunk Shot","Liquidation","Recover","Swords Dance"],"teraTypes":["Ground","Fire","Water"]}]},"arceuspsychic":{"level":68,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Cosmic Power","Recover","Stored Power"],"teraTypes":["Steel"]}]},"arceusrock":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"teraTypes":["Ground","Dragon"]}]},"arceussteel":{"level":70,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Earth Power","Judgment","Recover","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"arceuswater":{"level":71,"sets":[{"role":"Bulky Support","movepool":["Ice Beam","Judgment","Recover","Taunt","Will-O-Wisp"],"teraTypes":["Steel"]}]},"samurott":{"level":88,"sets":[{"role":"AV Pivot","movepool":["Aqua Jet","Grass Knot","Hydro Pump","Ice Beam","Knock Off","Megahorn","Sacred Sword"],"teraTypes":["Water","Dark"]},{"role":"Setup Sweeper","movepool":["Aqua Jet","Knock Off","Liquidation","Megahorn","Sacred Sword","Swords Dance"],"teraTypes":["Water","Dark"]}]},"samurotthisui":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Ceaseless Edge","Razor Shell","Sucker Punch","Swords Dance","X-Scissor"],"teraTypes":["Water","Dark"]}]},"lilligant":{"level":86,"sets":[{"role":"Tera Blast user","movepool":["Giga Drain","Pollen Puff","Quiver Dance","Sleep Powder","Tera Blast"],"teraTypes":["Fire","Rock"]},{"role":"Setup Sweeper","movepool":["Petal Dance","Pollen Puff","Quiver Dance","Sleep Powder"],"teraTypes":["Grass"]}]},"lilliganthisui":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Ice Spinner","Leaf Blade","Sleep Powder","Victory Dance"],"teraTypes":["Fighting"]},{"role":"Fast Support","movepool":["Close Combat","Defog","Ice Spinner","Leaf Blade","Sleep Powder"],"teraTypes":["Fighting"]}]},"basculin":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Crunch","Head Smash","Psychic Fangs","Wave Crash"],"teraTypes":["Water"]}]},"basculinbluestriped":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Crunch","Head Smash","Psychic Fangs","Wave Crash"],"teraTypes":["Water"]}]},"basculegion":{"level":68,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Head Smash","Last Respects","Wave Crash"],"teraTypes":["Ghost"]}]},"basculegionf":{"level":70,"sets":[{"role":"Wallbreaker","movepool":["Hydro Pump","Ice Beam","Last Respects","Wave Crash"],"teraTypes":["Ghost"]}]},"krookodile":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Bulk Up","Crunch","Earthquake","Gunk Shot","Stealth Rock","Stone Edge"],"teraTypes":["Poison","Ground"]}]},"zoroark":{"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Flamethrower","Focus Blast","Nasty Plot","Psychic","Sludge Bomb","Trick","U-turn"],"teraTypes":["Poison"]}]},"zoroarkhisui":{"sets":[{"role":"Wallbreaker","movepool":["Bitter Malice","Flamethrower","Focus Blast","Hyper Voice","Nasty Plot","Shadow Ball","Trick","U-turn"],"teraTypes":["Normal","Fighting"]}]},"gothitelle":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Dark Pulse","Psychic","Thunderbolt","Trick"],"teraTypes":["Dark","Electric","Fairy","Flying","Ghost","Ground","Psychic","Steel"]}]},"sawsbuck":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Double-Edge","Headbutt","Horn Leech","Stomping Tantrum","Swords Dance"],"teraTypes":["Normal"]}]},"amoonguss":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Clear Smog","Giga Drain","Sludge Bomb","Spore","Toxic"],"teraTypes":["Steel","Water"]}]},"alomomola":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Body Slam","Liquidation","Mirror Coat","Protect","Wish"],"teraTypes":["Steel"]}]},"eelektross":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Coil","Drain Punch","Fire Punch","Liquidation","Wild Charge"],"teraTypes":["Fighting"]},{"role":"AV Pivot","movepool":["Acid Spray","Close Combat","Flamethrower","Giga Drain","Thunderbolt","U-turn"],"teraTypes":["Poison"]}]},"haxorus":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Dragon Dance","Earthquake","Iron Head","Outrage"],"teraTypes":["Fighting","Ground","Steel"]}]},"beartic":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Close Combat","Earthquake","Icicle Crash","Snowscape","Swords Dance"],"teraTypes":["Fighting","Ice","Ground"]}]},"cryogonal":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Flash Cannon","Freeze-Dry","Haze","Rapid Spin","Recover"],"teraTypes":["Steel"]}]},"braviary":{"level":86,"sets":[{"role":"Fast Bulky Setup","movepool":["Brave Bird","Bulk Up","Close Combat","Roost"],"teraTypes":["Flying","Fighting"]}]},"braviaryhisui":{"level":84,"sets":[{"role":"Fast Support","movepool":["Agility","Heat Wave","Hurricane","Psychic"],"teraTypes":["Psychic","Fairy","Steel","Fire"]},{"role":"Wallbreaker","movepool":["Calm Mind","Defog","Esper Wing","Heat Wave","Hurricane","U-turn"],"teraTypes":["Psychic","Fairy","Steel"]}]},"hydreigon":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Draco Meteor","Fire Blast","Flash Cannon","Nasty Plot","U-turn"],"teraTypes":["Dark","Dragon","Fire","Steel"]}]},"volcarona":{"level":77,"sets":[{"role":"Fast Bulky Setup","movepool":["Bug Buzz","Fiery Dance","Fire Blast","Giga Drain","Morning Sun","Quiver Dance"],"teraTypes":["Fire","Grass","Water"]},{"role":"Tera Blast user","movepool":["Bug Buzz","Fiery Dance","Fire Blast","Giga Drain","Quiver Dance","Tera Blast"],"teraTypes":["Ground","Water"]}]},"tornadus":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Bleakwind Storm","Focus Blast","Grass Knot","Heat Wave","Nasty Plot","U-turn"],"teraTypes":["Flying","Fire"]}]},"tornadustherian":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Bleakwind Storm","Focus Blast","Grass Knot","Heat Wave","Nasty Plot","U-turn"],"teraTypes":["Flying","Fire"]}]},"thundurus":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Nasty Plot","Sludge Bomb","Taunt","Thunder Wave","Thunderbolt","U-turn"],"teraTypes":["Electric","Grass"]},{"role":"Tera Blast user","movepool":["Focus Blast","Nasty Plot","Tera Blast","Thunderbolt"],"teraTypes":["Flying"]}]},"thundurustherian":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Nasty Plot","Psychic","Sludge Bomb","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Psychic","Poison"]},{"role":"Tera Blast user","movepool":["Focus Blast","Nasty Plot","Tera Blast","Thunderbolt"],"teraTypes":["Flying"]}]},"landorus":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Earth Power","Focus Blast","Nasty Plot","Psychic","Rock Slide","Sludge Bomb","Stealth Rock"],"teraTypes":["Ground","Psychic","Poison"]}]},"landorustherian":{"level":78,"sets":[{"role":"Fast Support","movepool":["Earthquake","Stealth Rock","Stone Edge","Taunt","U-turn"],"teraTypes":["Ground"]},{"role":"Tera Blast user","movepool":["Earthquake","Stone Edge","Swords Dance","Tera Blast"],"teraTypes":["Flying"]}]},"meloetta":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Focus Blast","Hyper Voice","Psyshock","U-turn"],"teraTypes":["Normal","Psychic","Fighting"]}]},"chesnaught":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Body Press","Leech Seed","Spikes","Spiky Shield","Synthesis","Wood Hammer"],"teraTypes":["Steel","Water"]},{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Synthesis","Trailblaze"],"teraTypes":["Steel"]}]},"delphox":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Fire Blast","Focus Blast","Grass Knot","Nasty Plot","Psyshock"],"teraTypes":["Fire","Psychic","Grass","Fighting"]}]},"greninja":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Grass Knot","Gunk Shot","Hydro Pump","Ice Beam","Toxic Spikes","U-turn"],"teraTypes":["Water","Dark","Poison"]}]},"talonflame":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Defog","Overheat","Roost","Taunt","U-turn","Will-O-Wisp"],"teraTypes":["Water","Ground"]},{"role":"Tera Blast user","movepool":["Brave Bird","Flare Blitz","Swords Dance","Tera Blast"],"teraTypes":["Ground"]}]},"vivillon":{"level":86,"sets":[{"role":"Fast Bulky Setup","movepool":["Bug Buzz","Energy Ball","Hurricane","Quiver Dance","Sleep Powder","Substitute"],"teraTypes":["Flying"]},{"role":"Tera Blast user","movepool":["Hurricane","Quiver Dance","Sleep Powder","Substitute","Tera Blast"],"teraTypes":["Ground"]}]},"pyroar":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Fire Blast","Hyper Voice","Will-O-Wisp","Work Up"],"teraTypes":["Fire"]}]},"florges":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Protect","Wish"],"teraTypes":["Steel"]},{"role":"Tera Blast user","movepool":["Calm Mind","Moonblast","Synthesis","Tera Blast"],"teraTypes":["Ground"]}]},"gogoat":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Earthquake","Horn Leech","Milk Drink"],"teraTypes":["Ground"]}]},"dragalge":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Focus Blast","Hydro Pump","Sludge Bomb","Toxic","Toxic Spikes"],"teraTypes":["Water","Fighting"]}]},"clawitzer":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Aura Sphere","Dark Pulse","Dragon Pulse","U-turn","Water Pulse"],"teraTypes":["Dark","Dragon","Fighting"]}]},"sylveon":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Hyper Voice","Protect","Wish"],"teraTypes":["Steel"]}]},"hawlucha":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["Acrobatics","Brave Bird","Close Combat","Stone Edge","Swords Dance"],"teraTypes":["Fighting","Flying"]}]},"dedenne":{"level":88,"sets":[{"role":"Fast Support","movepool":["Dazzling Gleam","Nuzzle","Super Fang","Thunderbolt","U-turn"],"teraTypes":["Electric"]}]},"carbink":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Moonblast","Power Gem","Spikes","Stealth Rock"],"teraTypes":["Fighting"]},{"role":"Bulky Support","movepool":["Body Press","Light Screen","Moonblast","Reflect","Stealth Rock"],"teraTypes":["Water","Steel"]}]},"goodra":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Earthquake","Fire Blast","Power Whip","Sludge Bomb","Thunderbolt"],"teraTypes":["Dragon","Ground","Fire","Grass","Poison","Electric"]}]},"goodrahisui":{"level":84,"sets":[{"role":"AV Pivot","movepool":["Draco Meteor","Dragon Tail","Earthquake","Fire Blast","Heavy Slam","Hydro Pump","Thunderbolt"],"teraTypes":["Dragon","Ground","Fire","Steel","Water","Electric"]},{"role":"Bulky Setup","movepool":["Body Press","Curse","Heavy Slam","Rest"],"teraTypes":["Fighting"]}]},"klefki":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Magnet Rise","Play Rough","Spikes","Thunder Wave"],"teraTypes":["Water"]}]},"avalugg":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Avalanche","Body Press","Curse","Rapid Spin","Recover"],"teraTypes":["Fighting"]}]},"avalugghisui":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Avalanche","Body Press","Rapid Spin","Recover","Stone Edge"],"teraTypes":["Poison","Flying"]}]},"noivern":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Draco Meteor","Flamethrower","Hurricane","Roost","U-turn"],"teraTypes":["Normal"]},{"role":"Fast Support","movepool":["Defog","Draco Meteor","Flamethrower","Hurricane","Roost","U-turn"],"teraTypes":["Fire"]}]},"diancie":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Diamond Storm","Earth Power","Moonblast","Stealth Rock"],"teraTypes":["Fighting"]}]},"hoopa":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Nasty Plot","Psyshock","Shadow Ball","Trick"],"teraTypes":["Psychic","Ghost","Fighting"]}]},"hoopaunbound":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Drain Punch","Gunk Shot","Hyperspace Fury","Trick","Zen Headbutt"],"teraTypes":["Dark","Fighting","Poison"]},{"role":"Bulky Attacker","movepool":["Focus Blast","Gunk Shot","Hyperspace Fury","Psychic","Trick"],"teraTypes":["Fighting","Poison"]}]},"volcanion":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Flame Charge","Flamethrower","Haze","Sludge Bomb","Steam Eruption"],"teraTypes":["Water","Fire","Ground"]}]},"decidueye":{"level":86,"sets":[{"role":"Fast Support","movepool":["Defog","Knock Off","Leaf Storm","Roost","Spirit Shackle","U-turn"],"teraTypes":["Dark","Ghost","Grass"]},{"role":"Setup Sweeper","movepool":["Leaf Blade","Shadow Sneak","Spirit Shackle","Swords Dance"],"teraTypes":["Ghost"]}]},"decidueyehisui":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Leaf Blade","Sucker Punch","Swords Dance","Synthesis","Triple Arrows","U-turn"],"teraTypes":["Steel"]}]},"gumshoos":{"level":94,"sets":[{"role":"Wallbreaker","movepool":["Body Slam","Crunch","Earthquake","Psychic Fangs","U-turn"],"teraTypes":["Ground"]}]},"crabominable":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Drain Punch","Earthquake","Gunk Shot","Ice Hammer"],"teraTypes":["Fighting","Ground"]}]},"oricorio":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Hurricane","Quiver Dance","Revelation Dance","Roost"],"teraTypes":["Ground"]}]},"oricoriopompom":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Hurricane","Quiver Dance","Revelation Dance","Roost"],"teraTypes":["Ground"]}]},"oricoriopau":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Hurricane","Quiver Dance","Revelation Dance","Roost"],"teraTypes":["Ground","Fighting"]}]},"oricoriosensu":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Hurricane","Quiver Dance","Revelation Dance","Roost"],"teraTypes":["Ghost","Fighting"]}]},"lycanroc":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Accelerock","Close Combat","Crunch","Drill Run","Psychic Fangs","Stealth Rock","Stone Edge","Swords Dance","Taunt"],"teraTypes":["Fighting"]}]},"lycanrocmidnight":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Psychic Fangs","Stealth Rock","Stone Edge","Swords Dance"],"teraTypes":["Rock","Fighting"]}]},"lycanrocdusk":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["Accelerock","Close Combat","Crunch","Psychic Fangs","Stone Edge","Swords Dance"],"teraTypes":["Fighting"]}]},"toxapex":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Haze","Liquidation","Recover","Toxic","Toxic Spikes"],"teraTypes":["Steel","Flying","Grass","Fairy"]}]},"mudsdale":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Earthquake","Heavy Slam","Stealth Rock","Stone Edge"],"teraTypes":["Fighting"]}]},"lurantis":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Leaf Storm","Pollen Puff","Synthesis"],"teraTypes":["Steel","Water"]}]},"salazzle":{"level":82,"sets":[{"role":"Fast Support","movepool":["Flamethrower","Protect","Substitute","Toxic"],"teraTypes":["Water","Flying"]}]},"tsareena":{"level":86,"sets":[{"role":"Fast Support","movepool":["High Jump Kick","Play Rough","Power Whip","Rapid Spin","Synthesis","U-turn"],"teraTypes":["Fighting","Steel"]}]},"oranguru":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["Focus Blast","Nasty Plot","Psychic","Psyshock","Thunderbolt"],"teraTypes":["Psychic","Electric","Fighting"]},{"role":"Wallbreaker","movepool":["Focus Blast","Hyper Voice","Psyshock","Thunderbolt","Trick","Trick Room"],"teraTypes":["Psychic","Electric","Fighting"]}]},"passimian":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Gunk Shot","Knock Off","Rock Slide","U-turn"],"teraTypes":["Dark"]}]},"palossand":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Hypnosis","Shadow Ball","Shore Up","Stealth Rock"],"teraTypes":["Water"]}]},"komala":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Earthquake","Gunk Shot","Play Rough","Rapid Spin","Sucker Punch","Superpower","U-turn","Wood Hammer"],"teraTypes":["Normal","Ground","Poison","Fairy","Fighting","Grass"]}]},"mimikyu":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Drain Punch","Play Rough","Shadow Claw","Shadow Sneak","Swords Dance","Wood Hammer"],"teraTypes":["Fighting","Grass","Fairy","Ghost"]}]},"bruxish":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Crunch","Ice Fang","Psychic Fangs","Swords Dance","Wave Crash"],"teraTypes":["Dark","Psychic"]}]},"magearna":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Aura Sphere","Flash Cannon","Fleur Cannon","Pain Split","Spikes","Volt Switch"],"teraTypes":["Fairy","Steel","Fighting","Water"]},{"role":"Bulky Setup","movepool":["Calm Mind","Flash Cannon","Fleur Cannon","Shift Gear"],"teraTypes":["Water","Steel","Fairy","Flying"]},{"role":"Tera Blast user","movepool":["Fleur Cannon","Iron Head","Shift Gear","Tera Blast","Thunderbolt"],"teraTypes":["Ground"]}]},"rillaboom":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Acrobatics","Knock Off","Stomping Tantrum","Swords Dance","Wood Hammer"],"teraTypes":["Flying","Grass"]},{"role":"Fast Attacker","movepool":["Knock Off","Stomping Tantrum","U-turn","Wood Hammer"],"teraTypes":["Grass"]}]},"cinderace":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Court Change","Gunk Shot","High Jump Kick","Pyro Ball","Sucker Punch","U-turn"],"teraTypes":["Fire","Fighting","Poison"]}]},"inteleon":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Hydro Pump","Ice Beam","Surf","U-turn"],"teraTypes":["Water"]},{"role":"Tera Blast user","movepool":["Hydro Pump","Ice Beam","Tera Blast","U-turn"],"teraTypes":["Electric","Grass"]}]},"greedent":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Crunch","Earthquake","Fire Fang","Psychic Fangs","Swords Dance"],"teraTypes":["Ground","Psychic"]}]},"corviknight":{"level":80,"sets":[{"role":"Bulky Support","movepool":["Body Press","Brave Bird","Defog","Roost","U-turn"],"teraTypes":["Dragon"]}]},"drednaw":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Crunch","Earthquake","Liquidation","Shell Smash","Stone Edge"],"teraTypes":["Water","Ground","Dark"]}]},"coalossal":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Overheat","Rapid Spin","Spikes","Stealth Rock","Stone Edge","Will-O-Wisp"],"teraTypes":["Water"]}]},"flapple":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Dragon Dance","Grav Apple","Outrage","Sucker Punch","U-turn"],"teraTypes":["Dragon","Grass"]}]},"appletun":{"level":92,"sets":[{"role":"Bulky Support","movepool":["Apple Acid","Draco Meteor","Dragon Pulse","Leech Seed","Recover"],"teraTypes":["Grass","Steel"]}]},"sandaconda":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Coil","Earthquake","Glare","Rest","Stone Edge"],"teraTypes":["Dragon","Steel"]},{"role":"Bulky Support","movepool":["Earthquake","Glare","Rest","Stealth Rock","Stone Edge"],"teraTypes":["Dragon","Water"]}]},"barraskewda":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Crunch","Liquidation","Poison Jab","Psychic Fangs"],"teraTypes":["Fighting"]}]},"toxtricity":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Overdrive","Shift Gear","Sludge Bomb","Toxic Spikes","Volt Switch"],"teraTypes":["Normal"]}]},"polteageist":{"level":79,"sets":[{"role":"Tera Blast user","movepool":["Giga Drain","Shadow Ball","Shell Smash","Stored Power","Strength Sap","Tera Blast"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Giga Drain","Shadow Ball","Shell Smash","Stored Power","Strength Sap"],"teraTypes":["Psychic"]}]},"hatterene":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Mystical Fire","Psychic","Psyshock","Trick","Trick Room"],"teraTypes":["Psychic","Fairy","Fire"]}]},"grimmsnarl":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Light Screen","Parting Shot","Reflect","Spirit Break","Thunder Wave"],"teraTypes":["Fairy"]},{"role":"Fast Bulky Setup","movepool":["Bulk Up","Crunch","Rest","Spirit Break","Sucker Punch","Thunder Wave"],"teraTypes":["Dark"]},{"role":"Bulky Attacker","movepool":["Parting Shot","Spirit Break","Sucker Punch","Taunt","Thunder Wave"],"teraTypes":["Fairy"]}]},"perrserker":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Crunch","Iron Head","Stealth Rock","U-turn"],"teraTypes":["Steel","Fighting"]}]},"falinks":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Megahorn","No Retreat","Poison Jab","Rock Slide"],"teraTypes":["Fighting","Ghost"]},{"role":"Tera Blast user","movepool":["Close Combat","No Retreat","Poison Jab","Tera Blast"],"teraTypes":["Ghost"]}]},"pincurchin":{"level":96,"sets":[{"role":"Bulky Attacker","movepool":["Discharge","Hydro Pump","Spikes","Sucker Punch","Toxic Spikes"],"teraTypes":["Ghost","Water"]}]},"frosmoth":{"level":83,"sets":[{"role":"Tera Blast user","movepool":["Bug Buzz","Giga Drain","Hurricane","Ice Beam","Quiver Dance","Tera Blast"],"teraTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Bug Buzz","Giga Drain","Hurricane","Ice Beam","Quiver Dance"],"teraTypes":["Water"]}]},"stonjourner":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Heavy Slam","Rock Polish","Stealth Rock","Stone Edge"],"teraTypes":["Ground","Steel"]}]},"eiscue":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["Belly Drum","Ice Spinner","Iron Head","Liquidation","Substitute","Zen Headbutt"],"teraTypes":["Water"]},{"role":"Tera Blast user","movepool":["Belly Drum","Ice Spinner","Liquidation","Substitute","Tera Blast"],"teraTypes":["Ground"]}]},"indeedee":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Healing Wish","Hyper Voice","Psychic","Psyshock","Shadow Ball"],"teraTypes":["Psychic"]}]},"indeedeef":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Healing Wish","Hyper Voice","Psychic","Psyshock","Shadow Ball"],"teraTypes":["Psychic"]}]},"copperajah":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Iron Head","Play Rough","Rock Slide","Stealth Rock","Superpower"],"teraTypes":["Steel","Fairy"]}]},"dragapult":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Shadow Ball","Thunderbolt","U-turn"],"teraTypes":["Dragon","Fire","Ghost"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Dragon Darts","Fire Blast","Tera Blast"],"teraTypes":["Ghost"]}]},"zacian":{"level":70,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Play Rough","Psychic Fangs","Swords Dance","Wild Charge"],"teraTypes":["Fighting"]}]},"zaciancrowned":{"level":65,"sets":[{"role":"Setup Sweeper","movepool":["Behemoth Blade","Close Combat","Play Rough","Swords Dance"],"teraTypes":["Fighting"]}]},"zamazenta":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Crunch","Iron Head","Psychic Fangs","Stone Edge","Wild Charge"],"teraTypes":["Fighting","Dark"]},{"role":"Bulky Setup","movepool":["Body Press","Crunch","Iron Defense","Iron Head","Rest","Stone Edge"],"teraTypes":["Fighting"]}]},"zamazentacrowned":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["Behemoth Bash","Body Press","Crunch","Iron Defense","Psychic Fangs","Stone Edge"],"teraTypes":["Fighting"]}]},"eternatus":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["Dynamax Cannon","Fire Blast","Recover","Sludge Bomb"],"teraTypes":["Dragon","Fire"]},{"role":"Bulky Support","movepool":["Dynamax Cannon","Flamethrower","Recover","Toxic","Toxic Spikes"],"teraTypes":["Dragon","Water"]}]},"urshifu":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Poison Jab","Sucker Punch","Swords Dance","U-turn","Wicked Blow"],"teraTypes":["Dark","Fighting"]}]},"urshifurapidstrike":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Ice Spinner","Surging Strikes","Swords Dance","U-turn"],"teraTypes":["Water"]}]},"zarude":{"level":79,"sets":[{"role":"Fast Bulky Setup","movepool":["Close Combat","Crunch","Power Whip","Swords Dance","Synthesis"],"teraTypes":["Dark","Grass","Fighting"]},{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Power Whip","U-turn"],"teraTypes":["Dark","Grass","Fighting"]}]},"regieleki":{"level":77,"sets":[{"role":"Fast Support","movepool":["Explosion","Rapid Spin","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]},{"role":"Tera Blast user","movepool":["Rapid Spin","Tera Blast","Thunderbolt","Volt Switch"],"teraTypes":["Ice"]}]},"regidrago":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Dragon Dance","Earthquake","Fire Fang","Outrage"],"teraTypes":["Dragon"]},{"role":"Tera Blast user","movepool":["Dragon Claw","Dragon Dance","Earthquake","Tera Blast"],"teraTypes":["Steel"]}]},"glastrier":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Heavy Slam","Icicle Crash","Stomping Tantrum","Swords Dance"],"teraTypes":["Fighting","Steel"]}]},"spectrier":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Nasty Plot","Shadow Ball","Substitute","Will-O-Wisp"],"teraTypes":["Ghost","Dark"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Shadow Ball","Substitute","Tera Blast","Will-O-Wisp"],"teraTypes":["Fighting"]}]},"calyrex":{"level":92,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Encore","Giga Drain","Leech Seed","Psyshock"],"teraTypes":["Steel"]}]},"calyrexice":{"level":72,"sets":[{"role":"Wallbreaker","movepool":["Agility","Close Combat","Glacial Lance","Stomping Tantrum","Trick Room","Zen Headbutt"],"teraTypes":["Fighting"]}]},"calyrexshadow":{"level":64,"sets":[{"role":"Fast Attacker","movepool":["Astral Barrage","Nasty Plot","Pollen Puff","Psyshock","Trick"],"teraTypes":["Ghost"]}]},"wyrdeer":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Earthquake","Megahorn","Psychic","Thunder Wave","Thunderbolt"],"teraTypes":["Ground"]}]},"kleavor":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Defog","Stone Axe","Swords Dance","U-turn","X-Scissor"],"teraTypes":["Bug","Rock","Fighting"]}]},"ursaluna":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Crunch","Facade","Headlong Rush","Swords Dance","Trailblaze"],"teraTypes":["Normal"]}]},"enamorus":{"level":80,"sets":[{"role":"Tera Blast user","movepool":["Play Rough","Superpower","Taunt","Tera Blast"],"teraTypes":["Flying"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Earth Power","Moonblast","Substitute"],"teraTypes":["Ground"]}]},"enamorustherian":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Moonblast","Mystical Fire","Psychic","Superpower"],"teraTypes":["Fairy","Ground"]},{"role":"Bulky Setup","movepool":["Agility","Earth Power","Moonblast","Mystical Fire","Superpower"],"teraTypes":["Ground"]}]},"meowscarada":{"level":79,"sets":[{"role":"Fast Support","movepool":["Flower Trick","Knock Off","Play Rough","Toxic Spikes","U-turn"],"teraTypes":["Grass","Dark"]}]},"skeledirge":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Flame Charge","Shadow Ball","Slack Off","Torch Song"],"teraTypes":["Fire","Water"]},{"role":"Bulky Support","movepool":["Hex","Slack Off","Torch Song","Will-O-Wisp"],"teraTypes":["Ghost","Water"]}]},"quaquaval":{"level":79,"sets":[{"role":"Fast Support","movepool":["Aqua Step","Close Combat","Ice Spinner","Rapid Spin","Roost","U-turn"],"teraTypes":["Water","Fighting"]},{"role":"Setup Sweeper","movepool":["Aqua Step","Close Combat","Ice Spinner","Roost","Swords Dance"],"teraTypes":["Water","Fighting"]}]},"oinkologne":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Body Slam","Stomping Tantrum","Stuff Cheeks"],"teraTypes":["Fighting"]}]},"oinkolognef":{"level":93,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Body Slam","Stomping Tantrum","Stuff Cheeks"],"teraTypes":["Fighting"]}]},"dudunsparce":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Glare","Headbutt","Roost"],"teraTypes":["Ghost","Ground"]},{"role":"Bulky Setup","movepool":["Boomburst","Calm Mind","Earth Power","Roost","Shadow Ball"],"teraTypes":["Ghost"]}]},"dudunsparcethreesegment":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Glare","Headbutt","Roost"],"teraTypes":["Ghost","Ground"]},{"role":"Bulky Setup","movepool":["Boomburst","Calm Mind","Earth Power","Roost","Shadow Ball"],"teraTypes":["Ghost"]}]},"spidops":{"level":95,"sets":[{"role":"Bulky Support","movepool":["Circle Throw","Spikes","Sticky Web","Toxic Spikes","U-turn"],"teraTypes":["Ghost"]}]},"lokix":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Axe Kick","First Impression","Leech Life","Sucker Punch"],"teraTypes":["Bug"]},{"role":"Fast Attacker","movepool":["Axe Kick","First Impression","Sucker Punch","U-turn"],"teraTypes":["Bug"]},{"role":"Setup Sweeper","movepool":["Leech Life","Sucker Punch","Swords Dance","Throat Chop"],"teraTypes":["Dark"]}]},"rabsca":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Bug Buzz","Earth Power","Psychic","Revival Blessing","Trick Room"],"teraTypes":["Steel"]}]},"houndstone":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Last Respects","Trick","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"espathra":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Lumina Crash","Shadow Ball","U-turn"],"teraTypes":["Psychic","Fairy","Ghost"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Protect","Roost","Stored Power","Substitute"],"teraTypes":["Fairy"]},{"role":"Tera Blast user","movepool":["Dazzling Gleam","Lumina Crash","Roost","Tera Blast"],"teraTypes":["Fire","Fighting"]}]},"farigiraf":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Hyper Voice","Protect","Wish"],"teraTypes":["Dark"]},{"role":"Bulky Attacker","movepool":["Future Sight","Hyper Voice","Protect","Wish"],"teraTypes":["Ground","Water","Fairy"]},{"role":"AV Pivot","movepool":["Dazzling Gleam","Earthquake","Foul Play","Future Sight","Hyper Voice","Psychic"],"teraTypes":["Dark"]}]},"wugtrio":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Liquidation","Memento","Stomping Tantrum","Sucker Punch","Throat Chop"],"teraTypes":["Water","Dark"]}]},"dondozo":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["Curse","Rest","Sleep Talk","Wave Crash"],"teraTypes":["Fairy","Ground","Dragon"]}]},"veluza":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Aqua Cutter","Aqua Jet","Night Slash","Psycho Cut"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Aqua Cutter","Fillet Away","Night Slash","Psycho Cut"],"teraTypes":["Water","Psychic","Dark"]}]},"palafin":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["Bulk Up","Close Combat","Flip Turn","Ice Punch","Jet Punch","Wave Crash"],"teraTypes":["Water","Fighting"]}]},"arboliva":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["Dazzling Gleam","Earth Power","Energy Ball","Hyper Voice","Strength Sap"],"teraTypes":["Grass","Fairy","Ground"]},{"role":"Bulky Support","movepool":["Hyper Voice","Leech Seed","Protect","Substitute"],"teraTypes":["Water"]}]},"scovillain":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["Flamethrower","Leech Seed","Protect","Substitute"],"teraTypes":["Steel","Water"]},{"role":"Fast Attacker","movepool":["Flamethrower","Giga Drain","Leaf Storm","Overheat"],"teraTypes":["Fire","Grass"]}]},"bellibolt":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Muddy Water","Slack Off","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Water"]}]},"revavroom":{"level":83,"sets":[{"role":"Tera Blast user","movepool":["Gunk Shot","Iron Head","Shift Gear","Tera Blast"],"teraTypes":["Water","Ground"]},{"role":"Bulky Attacker","movepool":["Gunk Shot","Haze","Parting Shot","Spin Out","Toxic","Toxic Spikes"],"teraTypes":["Water"]}]},"orthworm":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Coil","Iron Tail","Rest"],"teraTypes":["Fighting","Electric"]},{"role":"Bulky Support","movepool":["Body Press","Iron Head","Rest","Shed Tail","Spikes","Stealth Rock"],"teraTypes":["Electric","Poison"]}]},"maushold":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Bite","Encore","Population Bomb","Tidy Up"],"teraTypes":["Normal"]}]},"mausholdfour":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Bite","Encore","Population Bomb","Tidy Up"],"teraTypes":["Normal"]}]},"cetitan":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Ice Shard","Icicle Crash","Liquidation","Play Rough"],"teraTypes":["Water","Fairy"]},{"role":"Bulky Setup","movepool":["Belly Drum","Earthquake","Ice Shard","Icicle Crash"],"teraTypes":["Ice"]}]},"baxcalibur":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Glaive Rush","Ice Shard","Icicle Crash"],"teraTypes":["Dragon","Ground"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Glaive Rush","Icicle Crash"],"teraTypes":["Dragon","Ground"]}]},"tatsugiri":{"level":85,"sets":[{"role":"Fast Support","movepool":["Draco Meteor","Hydro Pump","Nasty Plot","Rapid Spin","Surf"],"teraTypes":["Water"]}]},"cyclizar":{"level":83,"sets":[{"role":"Fast Support","movepool":["Draco Meteor","Knock Off","Rapid Spin","Shed Tail","Taunt"],"teraTypes":["Dragon","Steel","Ghost"]}]},"pawmot":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Double Shock","Ice Punch","Revival Blessing","Volt Switch"],"teraTypes":["Electric"]},{"role":"Fast Support","movepool":["Close Combat","Ice Punch","Nuzzle","Revival Blessing","Thunder Punch"],"teraTypes":["Fighting"]}]},"kilowattrel":{"level":83,"sets":[{"role":"Fast Support","movepool":["Hurricane","Roost","Thunder Wave","Thunderbolt","U-turn"],"teraTypes":["Flying","Electric"]}]},"bombirdier":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Hone Claws","Knock Off","Stone Edge","Sucker Punch","U-turn"],"teraTypes":["Rock"]}]},"squawkabilly":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Facade","Protect","Quick Attack","U-turn"],"teraTypes":["Normal"]}]},"squawkabillywhite":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Double-Edge","Foul Play","Parting Shot","Quick Attack"],"teraTypes":["Flying","Dark","Normal"]}]},"squawkabillyblue":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Facade","Protect","Quick Attack","U-turn"],"teraTypes":["Normal"]}]},"squawkabillyyellow":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Double-Edge","Foul Play","Parting Shot","Quick Attack"],"teraTypes":["Flying","Dark","Normal"]}]},"flamigo":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Close Combat","Swords Dance","Throat Chop","U-turn"],"teraTypes":["Fighting"]}]},"klawf":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["Crabhammer","High Horsepower","Knock Off","Stealth Rock","Stone Edge"],"teraTypes":["Water","Ground","Dark","Rock"]},{"role":"Setup Sweeper","movepool":["Crabhammer","High Horsepower","Knock Off","Stone Edge","Swords Dance"],"teraTypes":["Water","Ground","Dark","Rock"]}]},"garganacl":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Curse","Recover","Stone Edge"],"teraTypes":["Fighting","Fairy","Dragon"]},{"role":"Bulky Attacker","movepool":["Earthquake","Protect","Recover","Salt Cure"],"teraTypes":["Ghost"]},{"role":"Bulky Support","movepool":["Body Press","Recover","Salt Cure","Stealth Rock","Stone Edge"],"teraTypes":["Ghost"]}]},"glimmora":{"level":77,"sets":[{"role":"Fast Support","movepool":["Earth Power","Energy Ball","Mortal Spin","Power Gem","Sludge Wave","Spikes","Stealth Rock","Toxic"],"teraTypes":["Ground"]}]},"grafaiai":{"level":85,"sets":[{"role":"AV Pivot","movepool":["Gunk Shot","Knock Off","Super Fang","U-turn"],"teraTypes":["Dark"]},{"role":"Bulky Support","movepool":["Encore","Knock Off","Protect","Substitute","Toxic"],"teraTypes":["Dark"]},{"role":"Fast Support","movepool":["Encore","Gunk Shot","Knock Off","Parting Shot"],"teraTypes":["Dark"]}]},"dachsbun":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Body Press","Play Rough","Protect","Wish"],"teraTypes":["Steel"]}]},"mabosstiff":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Crunch","Fire Fang","Play Rough","Psychic Fangs","Wild Charge"],"teraTypes":["Dark","Fairy"]}]},"brambleghast":{"level":88,"sets":[{"role":"Fast Support","movepool":["Power Whip","Rapid Spin","Shadow Sneak","Spikes","Strength Sap"],"teraTypes":["Steel","Water","Fairy"]},{"role":"Bulky Support","movepool":["Leech Seed","Phantom Force","Power Whip","Substitute"],"teraTypes":["Steel","Water","Fairy"]}]},"gholdengo":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Make It Rain","Nasty Plot","Recover","Shadow Ball","Trick"],"teraTypes":["Steel","Ghost"]},{"role":"Bulky Attacker","movepool":["Make It Rain","Recover","Shadow Ball","Thunder Wave"],"teraTypes":["Dark","Water","Steel"]}]},"greattusk":{"level":77,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Close Combat","Earthquake","Ice Spinner","Rapid Spin"],"teraTypes":["Ground","Fighting"]},{"role":"Bulky Attacker","movepool":["Close Combat","Headlong Rush","Ice Spinner","Knock Off","Rapid Spin","Stealth Rock"],"teraTypes":["Ground","Steel"]}]},"brutebonnet":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Crunch","Seed Bomb","Spore","Sucker Punch"],"teraTypes":["Dark","Fighting"]}]},"sandyshocks":{"level":80,"sets":[{"role":"Fast Support","movepool":["Earth Power","Spikes","Stealth Rock","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Grass","Ground"]},{"role":"Tera Blast user","movepool":["Earth Power","Tera Blast","Thunderbolt","Volt Switch"],"teraTypes":["Flying","Ice"]}]},"screamtail":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Encore","Play Rough","Protect","Thunder Wave","Wish"],"teraTypes":["Steel"]}]},"fluttermane":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Moonblast","Mystical Fire","Psyshock","Shadow Ball","Thunderbolt"],"teraTypes":["Ghost","Fairy","Fire","Electric","Psychic"]}]},"slitherwing":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Close Combat","Earthquake","Flame Charge","Leech Life","Wild Charge"],"teraTypes":["Fighting","Electric"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","First Impression","Flare Blitz","U-turn","Wild Charge"],"teraTypes":["Bug","Fighting","Electric"]}]},"roaringmoon":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["Crunch","Dragon Dance","Earthquake","Outrage","Roost"],"teraTypes":["Dark","Dragon","Ground"]},{"role":"Bulky Attacker","movepool":["Crunch","Iron Head","Outrage","U-turn"],"teraTypes":["Dark","Dragon","Steel"]}]},"walkingwake":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["Draco Meteor","Flamethrower","Hurricane","Hydro Pump"],"teraTypes":["Water","Fire"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Flamethrower","Hydro Steam","Sunny Day"],"teraTypes":["Fire"]}]},"irontreads":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Iron Head","Knock Off","Rapid Spin","Stealth Rock","Volt Switch"],"teraTypes":["Ground","Steel"]}]},"ironmoth":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Discharge","Energy Ball","Fiery Dance","Fire Blast","Sludge Wave","U-turn"],"teraTypes":["Fire","Grass"]},{"role":"Fast Support","movepool":["Energy Ball","Fiery Dance","Morning Sun","Sludge Wave","Toxic Spikes","U-turn"],"teraTypes":["Fire","Grass"]}]},"ironhands":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Drain Punch","Fake Out","Heavy Slam","Ice Punch","Thunder Punch","Volt Switch","Wild Charge"],"teraTypes":["Electric","Fighting"]}]},"ironjugulis":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Earth Power","Fire Blast","Hurricane","Hydro Pump","U-turn"],"teraTypes":["Dark","Flying","Ground"]}]},"ironthorns":{"level":84,"sets":[{"role":"Fast Support","movepool":["Earthquake","Spikes","Stealth Rock","Stone Edge","Thunder Punch","Volt Switch"],"teraTypes":["Grass","Water"]},{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Ice Punch","Stone Edge","Wild Charge"],"teraTypes":["Rock","Ground"]}]},"ironbundle":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Encore","Flip Turn","Freeze-Dry","Hydro Pump","Ice Beam","Substitute"],"teraTypes":["Water","Ice"]}]},"ironvaliant":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Spirit Break","Swords Dance"],"teraTypes":["Dark","Fighting"]},{"role":"Fast Attacker","movepool":["Calm Mind","Close Combat","Moonblast","Psychic"],"teraTypes":["Fighting","Fairy"]}]},"ironleaves":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Leaf Blade","Psyblade","Swords Dance"],"teraTypes":["Fighting"]},{"role":"Wallbreaker","movepool":["Close Combat","Leaf Blade","Megahorn","Psyblade"],"teraTypes":["Fighting"]}]},"tinglu":{"level":78,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ruination","Spikes","Stealth Rock","Throat Chop","Whirlwind"],"teraTypes":["Ground","Ghost","Poison"]},{"role":"Bulky Attacker","movepool":["Body Press","Earthquake","Heavy Slam","Ruination","Stone Edge","Throat Chop"],"teraTypes":["Ground","Fighting","Steel","Poison"]}]},"chienpao":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["Crunch","Ice Shard","Ice Spinner","Sacred Sword","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Ice","Fighting"]}]},"wochien":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Energy Ball","Knock Off","Leech Seed","Protect","Ruination","Stun Spore"],"teraTypes":["Poison"]}]},"chiyu":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Fire Blast","Nasty Plot","Psychic","Will-O-Wisp"],"teraTypes":["Dark","Fire"]},{"role":"Fast Attacker","movepool":["Dark Pulse","Flamethrower","Overheat","Psychic"],"teraTypes":["Dark","Fire"]}]},"koraidon":{"level":65,"sets":[{"role":"Fast Attacker","movepool":["Collision Course","Flare Blitz","Outrage","Swords Dance","U-turn"],"teraTypes":["Fire"]}]},"miraidon":{"level":66,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Draco Meteor","Electro Drift","Substitute"],"teraTypes":["Electric"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Electro Drift","Overheat","Volt Switch"],"teraTypes":["Electric"]}]},"tinkaton":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Encore","Gigaton Hammer","Knock Off","Play Rough","Stealth Rock","Thunder Wave"],"teraTypes":["Steel"]},{"role":"Setup Sweeper","movepool":["Gigaton Hammer","Knock Off","Play Rough","Swords Dance"],"teraTypes":["Steel"]}]},"armarouge":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Armor Cannon","Aura Sphere","Energy Ball","Focus Blast","Psyshock"],"teraTypes":["Fire","Fighting","Psychic","Grass"]}]},"ceruledge":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["Bitter Blade","Close Combat","Shadow Sneak","Swords Dance"],"teraTypes":["Fire","Fighting"]}]},"toedscruel":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Giga Drain","Knock Off","Leaf Storm","Rapid Spin","Spore","Toxic"],"teraTypes":["Water"]}]},"kingambit":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["Iron Head","Kowtow Cleave","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Flying"]}]}} as any;
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
	stabCounter: number;
	ironFist: number;

	constructor() {
		super();
		this.damagingMoves = new Set();
		this.stabCounter = 0;
		this.ironFist = 0;
	}

	get(key: string): number {
		return super.get(key) || 0;
	}
}

type MoveEnforcementChecker = (
	movePool: string[], moves: Set<string>, abilities: Set<string>, types: string[],
	counter: MoveCounter, species: Species, teamDetails: RandomTeamsTypes.TeamDetails,
	isLead: boolean, isDoubles: boolean, teraType: string, role: string,
) => boolean;

// Moves that restore HP:
const RecoveryMove = [
	'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'roost', 'shoreup', 'slackoff', 'softboiled', 'strengthsap', 'synthesis',
];
// Moves that drop stats:
const ContraryMoves = [
	'armorcannon', 'closecombat', 'leafstorm', 'makeitrain', 'overheat', 'spinout', 'superpower', 'vcreate',
];
// Moves that boost Attack:
const PhysicalSetup = [
	'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'meditate', 'poweruppunch', 'swordsdance', 'tidyup', 'victorydance',
];
// Moves which boost Special Attack:
const SpecialSetup = [
	'calmmind', 'chargebeam', 'geomancy', 'nastyplot', 'quiverdance', 'tailglow', 'torchsong',
];
// Moves that boost Attack AND Special Attack:
const MixedSetup = [
	'clangoroussoul', 'growth', 'happyhour', 'holdhands', 'noretreat', 'shellsmash', 'workup',
];
// Some moves that only boost Speed:
const SpeedSetup = [
	'agility', 'autotomize', 'rockpolish',
];
// Conglomerate for ease of access
const Setup = [
	'acidarmor', 'agility', 'autotomize', 'bellydrum', 'bulkup', 'calmmind', 'coil', 'curse', 'dragondance', 'flamecharge',
	'growth', 'honeclaws', 'howl', 'irondefense', 'meditate', 'nastyplot', 'noretreat', 'poweruppunch', 'quiverdance', 'rockpolish',
	'shellsmash', 'shiftgear', 'swordsdance', 'tailglow', 'tidyup', 'trailblaze', 'workup', 'victorydance',
];
// Moves that shouldn't be the only STAB moves:
const NoStab = [
	'accelerock', 'aquajet', 'beakblast', 'bounce', 'breakingswipe', 'chatter', 'chloroblast', 'clearsmog', 'dragontail', 'eruption',
	'explosion', 'fakeout', 'flamecharge', 'flipturn', 'iceshard', 'icywind', 'incinerate', 'machpunch', 'meteorbeam',
	'mortalspin', 'nuzzle', 'pluck', 'pursuit', 'quickattack', 'rapidspin', 'reversal', 'selfdestruct', 'shadowsneak',
	'skydrop', 'snarl', 'suckerpunch', 'uturn', 'watershuriken', 'vacuumwave', 'voltswitch', 'waterspout',
];
// Hazard-setting moves
const Hazards = [
	'spikes', 'stealthrock', 'stickyweb', 'toxicspikes',
];

// Moves that should be paired together when possible
const MovePairs = [
	['lightscreen', 'reflect'],
	['sleeptalk', 'rest'],
	['protect', 'wish'],
	['leechseed', 'protect'],
];

/** Pokemon who always want priority STAB, and are fine with it as its only STAB move of that type */
const priorityPokemon = [
	'banette', 'breloom', 'brutebonnet', 'cacturne', 'giratinaorigin', 'lycanrocdusk', 'mimikyu', 'scizor',
];

/** Pokemon who should never be in the lead slot */
const noLeadPokemon = [
	'Basculegion', 'Houndstone', 'Rillaboom', 'Zacian', 'Zamazenta',
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
		this.noStab = NoStab;

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
			Bug: (movePool) => movePool.includes('megahorn'),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
			Dragon: (movePool, moves, abilities, types, counter) => (
				!counter.get('Dragon') &&
				!movePool.includes('dualwingbeat')
			),
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
				return abilities.has('Psychic Surge') || types.includes('Fire') || types.includes('Electric') || types.includes('Fighting');
			},
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock') && species.baseStats.atk >= 80,
			Steel: (movePool, moves, abilities, types, counter, species) => {
				if (species.baseStats.atk <= 95 && !movePool.includes('makeitrain')) return false;
				return !counter.get('Steel');
			},
			Water: (movePool, moves, abilities, types, counter, species) => {
				if (types.includes('Ground')) return false;
				return !counter.get('Water');
			},
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
				if (!this.noStab.includes(moveid) || priorityPokemon.includes(species.id) && move.priority > 0) {
					counter.add(moveType);
					if (types.includes(moveType)) counter.stabCounter++;
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
			if (RecoveryMove.includes(moveid)) counter.add('recovery');
			if (ContraryMoves.includes(moveid)) counter.add('contrary');
			if (PhysicalSetup.includes(moveid)) counter.add('physicalsetup');
			if (SpecialSetup.includes(moveid)) counter.add('specialsetup');
			if (MixedSetup.includes(moveid)) counter.add('mixedsetup');
			if (SpeedSetup.includes(moveid)) counter.add('speedsetup');
			if (Setup.includes(moveid)) counter.add('setup');
			if (Hazards.includes(moveid)) counter.add('hazards');
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
		role: string,
	): void {
		if (moves.size + movePool.length <= this.maxMoveCount) return;
		// If we have two unfilled moves and only one unpaired move, cull the unpaired move.
		if (moves.size === this.maxMoveCount - 2) {
			const unpairedMoves = [...movePool];
			for (const pair of MovePairs) {
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
			for (const pair of MovePairs) {
				if (movePool.includes(pair[0]) && movePool.includes(pair[1])) {
					this.fastPop(movePool, movePool.indexOf(pair[0]));
					this.fastPop(movePool, movePool.indexOf(pair[1]));
				}
			}
		}

		// Develop additional move lists
		const pivotingMoves = ['chillyreception', 'flipturn', 'partingshot', 'shedtail', 'teleport', 'uturn', 'voltswitch'];
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

		// These moves don't mesh well with other aspects of the set
		this.incompatibleMoves(moves, movePool, statusMoves, ['healingwish', 'switcheroo', 'trick']);
		this.incompatibleMoves(moves, movePool, Setup, pivotingMoves);
		this.incompatibleMoves(moves, movePool, Setup, Hazards);
		this.incompatibleMoves(moves, movePool, Setup, ['defog', 'nuzzle', 'toxic', 'waterspout', 'yawn', 'haze']);
		this.incompatibleMoves(moves, movePool, PhysicalSetup, PhysicalSetup);
		this.incompatibleMoves(moves, movePool, SpecialSetup, 'thunderwave');
		this.incompatibleMoves(moves, movePool, 'substitute', pivotingMoves);
		this.incompatibleMoves(moves, movePool, SpeedSetup, ['aquajet', 'rest', 'trickroom']);
		this.incompatibleMoves(moves, movePool, 'curse', 'rapidspin');
		this.incompatibleMoves(moves, movePool, 'dragondance', 'dracometeor');
		this.incompatibleMoves(moves, movePool, 'healingwish', 'uturn');


		// These attacks are redundant with each other
		this.incompatibleMoves(moves, movePool, 'psychic', 'psyshock');
		this.incompatibleMoves(moves, movePool, 'surf', 'hydropump');
		this.incompatibleMoves(moves, movePool, 'liquidation', 'wavecrash');
		this.incompatibleMoves(moves, movePool, ['airslash', 'bravebird', 'hurricane'], ['airslash', 'bravebird', 'hurricane']);
		this.incompatibleMoves(moves, movePool, ['knockoff', 'bite'], 'foulplay');
		this.incompatibleMoves(moves, movePool, 'doubleedge', 'headbutt');
		this.incompatibleMoves(moves, movePool, 'fireblast', ['fierydance', 'flamethrower']);
		this.incompatibleMoves(moves, movePool, 'lavaplume', 'magmastorm');
		this.incompatibleMoves(moves, movePool, 'thunderpunch', 'wildcharge');
		this.incompatibleMoves(moves, movePool, 'gunkshot', ['direclaw', 'poisonjab']);
		this.incompatibleMoves(moves, movePool, 'aurasphere', 'focusblast');
		this.incompatibleMoves(moves, movePool, 'closecombat', 'drainpunch');
		this.incompatibleMoves(moves, movePool, 'bugbite', 'pounce');
		this.incompatibleMoves(moves, movePool, 'bittermalice', 'shadowball');
		this.incompatibleMoves(moves, movePool, ['dragonpulse', 'spacialrend'], 'dracometeor');


		// These status moves are redundant with each other
		this.incompatibleMoves(moves, movePool, ['taunt', 'strengthsap'], 'encore');
		this.incompatibleMoves(moves, movePool, 'taunt', 'disable');
		this.incompatibleMoves(moves, movePool, 'toxic', 'willowisp');
		this.incompatibleMoves(moves, movePool, ['thunderwave', 'toxic', 'willowisp'], 'toxicspikes');
		this.incompatibleMoves(moves, movePool, 'thunderwave', 'yawn');

		// This space reserved for assorted hardcodes that otherwise make little sense out of context
		if (species.id === "dugtrio") {
			this.incompatibleMoves(moves, movePool, statusMoves, 'memento');
		}
		if (species.id === "cyclizar") {
			this.incompatibleMoves(moves, movePool, 'taunt', 'knockoff');
		}
		// Landorus
		this.incompatibleMoves(moves, movePool, 'nastyplot', 'rockslide');
		// Persian
		this.incompatibleMoves(moves, movePool, 'switcheroo', 'fakeout');
		// Beartic
		this.incompatibleMoves(moves, movePool, 'snowscape', 'swordsdance');
		// Cryogonal
		if (!teamDetails.defog && !teamDetails.rapidSpin && species.id === 'cryogonal') {
			if (movePool.includes('haze')) this.fastPop(movePool, movePool.indexOf('haze'));
		}
		// Magnezone
		this.incompatibleMoves(moves, movePool, 'bodypress', 'mirrorcoat');
		// Amoonguss, though this can work well as a general rule later
		this.incompatibleMoves(moves, movePool, 'toxic', 'clearsmog');
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
		role: string,
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
		role: string,
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

		if (role === "Tera Blast user") {
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

		// Enforce Seismic Toss
		if (movePool.includes('seismictoss')) {
			counter = this.addMove('seismictoss', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}

		// Enforce Toxic on Grafaiai
		if (movePool.includes('toxic') && species.id === 'grafaiai') {
			counter = this.addMove('toxic', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
		}

		// Enforce STAB priority
		if (role === 'Bulky Attacker' || role === 'Bulky Setup' || priorityPokemon.includes(species.id)) {
			const priorityMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, teraType);
				if (types.includes(moveType) && move.priority > 0 && (move.basePower || move.basePowerCallback)) {
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

		// If no STAB move was added in the previous step, add a STAB move
		if (!counter.stabCounter) {
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

		// Enforce Tera STAB
		if (!counter.get('stabtera') && role !== "Bulky Support" && species.baseSpecies !== 'Dudunsparce') {
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

		// Enforce recovery
		if (["Bulky Support", "Bulky Attacker", "Bulky Setup"].includes(role)) {
			const recoveryMoves = movePool.filter(moveid => RecoveryMove.includes(moveid));
			if (recoveryMoves.length) {
				const moveid = this.sample(recoveryMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce setup
		if (role.includes('Setup') || role === 'Tera Blast user') {
			// First, try to add a non-Speed setup move
			const nonSpeedSetupMoves = movePool.filter(moveid => Setup.includes(moveid) && !SpeedSetup.includes(moveid));
			if (nonSpeedSetupMoves.length) {
				const moveid = this.sample(nonSpeedSetupMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			} else {
				// No non-Speed setup moves, so add any (Speed) setup move
				const setupMoves = movePool.filter(moveid => Setup.includes(moveid));
				if (setupMoves.length) {
					const moveid = this.sample(setupMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
			}
		}

		// Enforce coverage move
		if (!['AV Pivot', 'Fast Support', 'Bulky Support'].includes(role)) {
			if (counter.damagingMoves.size <= 1) {
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

		// Enforce a move not on the noSTAB list
		if (!counter.damagingMoves.size) {
			// Choose an attacking move
			const attackingMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback)) attackingMoves.push(moveid);
			}
			if (attackingMoves.length) {
				const moveid = this.sample(attackingMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
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
			for (const pair of MovePairs) {
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
		role: string,
	): boolean {
		if ([
			'Armor Tail', 'Battle Bond', 'Early Bird', 'Flare Boost', 'Gluttony', 'Harvest', 'Hydration', 'Ice Body', 'Immunity',
			'Moody', 'Own Tempo', 'Pressure', 'Quick Feet', 'Rain Dish', 'Sand Veil', 'Snow Cloak', 'Steadfast', 'Steam Engine',
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
			return (species.id === 'kilowattrel');
		case 'Compound Eyes': case 'No Guard':
			return !counter.get('inaccurate');
		case 'Cursed Body':
			return abilities.has('Infiltrator');
		case 'Defiant':
			return (!counter.get('Physical') || (abilities.has('Prankster') && (moves.has('thunderwave') || moves.has('taunt'))));
		case 'Flash Fire':
			return (
				['Flame Body', 'Intimidate', 'Rock Head', 'Weak Armor'].some(m => abilities.has(m)) &&
				this.dex.getEffectiveness('Fire', species) < 0
			);
		case 'Guts':
			return (!moves.has('facade') && !moves.has('sleeptalk'));
		case 'Hustle':
			return (counter.get('Physical') < 2);
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
		case 'Mold Breaker':
			return (abilities.has('Sharpness') || abilities.has('Unburden'));
		case 'Moxie':
			return (!counter.get('Physical') || moves.has('stealthrock'));
		case 'Natural Cure':
			return species.id === 'pawmot';
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Prankster':
			return !counter.get('Status');
		case 'Reckless':
			return !counter.get('recoil');
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Sand Force': case 'Sand Rush':
			return !teamDetails.sand;
		case 'Sap Sipper':
			return species.id === 'wyrdeer';
		case 'Seed Sower':
			return role === 'Bulky Support';
		case 'Shed Skin':
			return species.id === 'seviper';
		case 'Sheer Force':
			const braviaryCase = (species.id === 'braviaryhisui' && role === 'Wallbreaker');
			const abilitiesCase = (abilities.has('Guts') || abilities.has('Sharpness'));
			return (!counter.get('sheerforce') || moves.has('bellydrum') || braviaryCase || abilitiesCase);
		case 'Slush Rush':
			return !teamDetails.snow;
		case 'Sniper':
			return abilities.has('Torrent');
		case 'Solar Power':
			return (!teamDetails.sun || !counter.get('Special'));
		case 'Sturdy':
			return !!counter.get('recoil');
		case 'Swarm':
			return (!counter.get('Bug') || !!counter.get('recovery'));
		case 'Sweet Veil':
			return types.includes('Grass');
		case 'Swift Swim':
			return (!moves.has('raindance') && !teamDetails.rain);
		case 'Synchronize':
			return (species.id !== 'umbreon' && species.id !== 'rabsca');
		case 'Technician':
			return (!counter.get('technician') || abilities.has('Punk Rock'));
		case 'Tinted Lens':
			return (species.id === 'braviaryhisui' && role === 'Fast Support');
		case 'Unburden':
			return (abilities.has('Prankster') || !counter.get('setup'));
		case 'Volt Absorb':
			if (abilities.has('Iron Fist') && counter.ironFist >= 2) return true;
			return (this.dex.getEffectiveness('Electric', species) < -1);
		case 'Water Absorb':
			return species.id === 'quagsire';
		case 'Weak Armor':
			return moves.has('shellsmash');
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
		role: string,
	): string {
		const abilityData = Array.from(abilities).map(a => this.dex.abilities.get(a));
		Utils.sortBy(abilityData, abil => -abil.rating);

		if (abilityData.length <= 1) return abilityData[0].name;

		// Hard-code abilities here
		if (species.id === 'arcaninehisui') return 'Rock Head';
		if (species.id === 'staraptor') return 'Reckless';
		if (species.id === 'scovillain') return 'Chlorophyll';
		if (species.id === 'vespiquen') return 'Pressure';
		if (species.id === 'enamorus' && moves.has('calmmind')) return 'Cute Charm';
		if (species.id === 'cetitan' && role === 'Wallbreaker') return 'Sheer Force';
		if (species.id === 'klawf' && role === 'Setup Sweeper') return 'Anger Shell';
		if (abilities.has('Cud Chew') && moves.has('substitute')) return 'Cud Chew';
		if (abilities.has('Guts') && (moves.has('facade') || moves.has('sleeptalk'))) return 'Guts';
		if (abilities.has('Harvest') && moves.has('substitute')) return 'Harvest';
		if (species.id === 'hypno') return 'Insomnia';
		if (abilities.has('Serene Grace') && moves.has('headbutt')) return 'Serene Grace';
		if (abilities.has('Technician') && counter.get('technician')) return 'Technician';
		if (abilities.has('Own Tempo') && moves.has('petaldance')) return 'Own Tempo';
		if (abilities.has('Slush Rush') && moves.has('snowscape')) return 'Slush Rush';
		if (abilities.has('Soundproof') && moves.has('substitute')) return 'Soundproof';

		let abilityAllowed: Ability[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilityData) {
			if (ability.rating >= 1 && !this.shouldCullAbility(
				ability.name, types, moves, abilities, counter, teamDetails, species, isLead, isDoubles, teraType, role
			)) {
				abilityAllowed.push(ability);
			}
		}

		// If all abilities are culled, re-allow all
		if (!abilityAllowed.length) abilityAllowed = abilityData;

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
		role: string,
	) {
		if (species.requiredItems) {
			// Z-Crystals aren't available in Gen 9, so require Plates
			if (species.baseSpecies === 'Arceus') {
				return species.requiredItems[0];
			}
			return this.sample(species.requiredItems);
		}
		if (role === 'AV Pivot') return 'Assault Vest';
		if (
			!isLead && role === 'Bulky Setup' &&
			(ability === 'Quark Drive' || ability === 'Protosynthesis')
		) {
			return 'Booster Energy';
		}
		if (species.id === 'pikachu') return 'Light Ball';
		if (species.id === 'regieleki') return 'Magnet';
		if (species.id === 'pincurchin') return 'Shuca Berry';
		if (species.id === 'lokix') {
			return (role === 'Fast Attacker') ? 'Silver Powder' : 'Life Orb';
		}
		if (species.id === 'toxtricity' && moves.has('shiftgear')) return 'Throat Spray';
		if (species.baseSpecies === 'Magearna' && role === 'Tera Blast user') return 'Weakness Policy';
		if (moves.has('lastrespects')) return 'Choice Scarf';
		if (ability === 'Imposter' || (species.id === 'magnezone' && moves.has('bodypress'))) return 'Choice Scarf';
		if (moves.has('bellydrum') && moves.has('substitute')) return 'Salac Berry';
		if (
			['Cheek Pouch', 'Cud Chew', 'Harvest'].some(m => ability === m) ||
			moves.has('bellydrum') || moves.has('filletaway')
		) {
			return 'Sitrus Berry';
		}
		if (['healingwish', 'switcheroo', 'trick'].some(m => moves.has(m))) {
			if (species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && role !== 'Wallbreaker') {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if ((ability === 'Guts' || moves.has('facade')) && !moves.has('sleeptalk')) {
			return (types.includes('Fire') || ability === 'Toxic Boost') ? 'Toxic Orb' : 'Flame Orb';
		}
		if (
			(ability === 'Magic Guard' && counter.damagingMoves.size > 1) ||
			(ability === 'Sheer Force' && counter.get('sheerforce'))
		) {
			return 'Life Orb';
		}
		if (ability === 'Anger Shell') return this.sample(['Rindo Berry', 'Passho Berry', 'Scope Lens', 'Sitrus Berry']);
		if (moves.has('shellsmash')) return 'White Herb';
		if (moves.has('populationbomb')) return 'Wide Lens';
		if (moves.has('courtchange')) return 'Heavy-Duty Boots';
		if (moves.has('stuffcheeks')) return this.randomChance(1, 2) ? 'Liechi Berry' : 'Salac Berry';
		if (ability === 'Unburden') return moves.has('closecombat') ? 'White Herb' : 'Sitrus Berry';
		if (moves.has('acrobatics')) return ability === 'Grassy Surge' ? 'Grassy Seed' : '';
		if (moves.has('auroraveil') || moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (
			moves.has('rest') && !moves.has('sleeptalk') &&
			ability !== 'Natural Cure' && ability !== 'Shed Skin'
		) {
			return 'Chesto Berry';
		}
		if (species.id === 'scyther') return (isLead && !moves.has('uturn')) ? 'Eviolite' : 'Heavy-Duty Boots';
		if (species.nfe) return 'Eviolite';
		if (this.dex.getEffectiveness('Rock', species) >= 2) return 'Heavy-Duty Boots';
	}

	/** Item generation specific to Random Doubles */
	// This will be changed and used later, once doubles is actually coming out.
	getDoublesItem(
		ability: string,
		types: string[],
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		teraType: string,
		role: string,
	) {
		const defensiveStatTotal = species.baseStats.hp + species.baseStats.def + species.baseStats.spd;

		if (
			(['dragonenergy', 'eruption', 'waterspout'].some(m => moves.has(m))) &&
			counter.damagingMoves.size >= 4
		) return 'Choice Scarf';
		if (moves.has('blizzard') && ability !== 'Snow Warning' && !teamDetails.snow) return 'Blunder Policy';
		if (this.dex.getEffectiveness('Rock', species) >= 2 && !types.includes('Flying')) return 'Heavy-Duty Boots';
		if (counter.get('Physical') >= 4 && ['fakeout', 'feint', 'rapidspin', 'suckerpunch'].every(m => !moves.has(m)) && (
			types.includes('Dragon') || types.includes('Fighting') || types.includes('Rock') ||
			moves.has('flipturn') || moves.has('uturn')
		)) {
			return (
				!counter.get('priority') && ability !== 'Speed Boost' &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 100 &&
				this.randomChance(1, 2)
			) ? 'Choice Scarf' : 'Choice Band';
		}
		if (
			(
				counter.get('Special') >= 4 &&
				(types.includes('Dragon') || types.includes('Fighting') || types.includes('Rock') || moves.has('voltswitch'))
			) || (
				(counter.get('Special') >= 3 && (moves.has('flipturn') || moves.has('uturn'))) &&
				!moves.has('acidspray') && !moves.has('electroweb')
			)
		) {
			return (
				species.baseStats.spe >= 60 && species.baseStats.spe <= 100 && this.randomChance(1, 2)
			) ? 'Choice Scarf' : 'Choice Specs';
		}
		// This one is intentionally below the Choice item checks.
		if ((defensiveStatTotal < 250 && ability === 'Regenerator') || species.name === 'Pheromosa') return 'Life Orb';
		if (counter.damagingMoves.size >= 4 && defensiveStatTotal >= 275) return 'Assault Vest';
		if (
			counter.damagingMoves.size >= 3 &&
			species.baseStats.spe >= 60 &&
			ability !== 'Multiscale' && ability !== 'Sturdy' &&
			[
				'acidspray', 'clearsmog', 'electroweb', 'fakeout', 'feint', 'icywind',
				'incinerate', 'naturesmadness', 'rapidspin', 'snarl', 'uturn',
			].every(m => !moves.has(m))
		) return (ability === 'Defeatist' || defensiveStatTotal >= 275) ? 'Sitrus Berry' : 'Life Orb';
	}

	getItem(
		ability: string,
		types: string[],
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		teraType: string,
		role: string,
	): string | undefined {
		if (
			(counter.get('Physical') >= 4 ||
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
		if (!counter.get('Status') && role !== 'Fast Attacker' && role !== 'Wallbreaker') return 'Assault Vest';
		if (counter.get('speedsetup') && this.dex.getEffectiveness('Ground', species) < 1) return 'Weakness Policy';
		if (species.id === 'urshifurapidstrike') return 'Punching Glove';
		if (species.id === 'palkia') return 'Lustrous Orb';
		if (moves.has('substitute') || ability === 'Moody') return 'Leftovers';
		if (moves.has('stickyweb') && isLead) return 'Focus Sash';
		if (
			((!teamDetails.defog && !teamDetails.rapidSpin) || (!counter.get('setup') && role !== 'Wallbreaker')) &&
			this.dex.getEffectiveness('Rock', species) >= 1
		) return 'Heavy-Duty Boots';
		if (
			(moves.has('chillyreception') || (
				role === 'Fast Support' &&
				['defog', 'partingshot', 'mortalspin', 'rapidspin', 'uturn', 'voltswitch'].some(m => moves.has(m)) &&
				!types.includes('Flying') && ability !== 'Levitate'
			))
		) return 'Heavy-Duty Boots';

		// Low Priority
		if (moves.has('outrage')) return 'Lum Berry';
		if (
			(species.id === 'garchomp' && role === 'Fast Support') || (
				ability === 'Regenerator' && (role === 'Bulky Support' || role === 'Bulky Attacker') &&
				(species.baseStats.hp + species.baseStats.def) >= 180 && this.randomChance(1, 2)
			)
		) return 'Rocky Helmet';
		if (
			role === 'Fast Support' && isLead &&
			!counter.get('recovery') && !counter.get('recoil') && !moves.has('protect') &&
			(species.baseStats.hp + species.baseStats.def + species.baseStats.spd) < 258
		) return 'Focus Sash';
		if (
			role !== 'Fast Attacker' && role !== 'Tera Blast user' && ability !== 'Levitate' &&
			this.dex.getEffectiveness('Ground', species) >= 2
		) return 'Air Balloon';
		if (['Bulky Attacker', 'Bulky Support', 'Bulky Setup'].some(m => role === (m))) return 'Leftovers';
		if (species.id === 'pawmot' && moves.has('nuzzle')) return 'Leppa Berry';
		if (role === 'Fast Support' || role === 'Fast Bulky Setup') {
			return (counter.get('Physical') + counter.get('Special') >= 3 && !moves.has('nuzzle')) ? 'Life Orb' : 'Leftovers';
		}
		if (
			role === 'Tera Blast user' && counter.get('recovery') &&
			counter.get('Physical') + counter.get('Special') < 3
		) return 'Leftovers';
		if (
			['flamecharge', 'rapidspin'].every(m => !moves.has(m)) &&
			['Fast Attacker', 'Setup Sweeper', 'Tera Blast user', 'Wallbreaker'].some(m => role === (m))
		) return 'Life Orb';
		if (isDoubles) return 'Sitrus Berry';
		return 'Leftovers';
	}

	getLevel(
		species: Species,
		isDoubles: boolean,
	): number {
		if (this.adjustLevel) return this.adjustLevel;
		// doubles levelling
		if (isDoubles && this.randomDoublesSets[species.id]["level"]) return this.randomDoublesSets[species.id]["level"];
		if (!isDoubles && this.randomSets[species.id]["level"]) return this.randomSets[species.id]["level"];
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
		species: string | Species,
		teamDetails: RandomTeamsTypes.TeamDetails = {},
		isLead = false,
		isDoubles = false
	): RandomTeamsTypes.RandomSet {
		species = this.dex.species.get(species);
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
		for (const set of sets) {
			if (teamDetails.teraBlast && set.role === "Tera Blast user") {
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

		if (this.format.gameType === 'multi' || this.format.gameType === 'freeforall') {
			// Random Multi Battle uses doubles move pools, but Ally Switch fails in multi battles
			// Random Free-For-All also uses doubles move pools, for now
			const allySwitch = movePool.indexOf('allyswitch');
			if (allySwitch > -1) {
				if (movePool.length > this.maxMoveCount) {
					this.fastPop(movePool, allySwitch);
				} else {
					// Ideally, we'll never get here, but better to have a move that usually does nothing than one that always does
					movePool[allySwitch] = 'sleeptalk';
				}
			}
		}
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
		if (item === undefined && isDoubles) {
			item = this.getDoublesItem(ability, types, moves, counter, teamDetails, species, teraType, role);
		}
		if (item === undefined) {
			item = this.getItem(ability, types, moves, counter, teamDetails, species, isLead, isDoubles, teraType, role);
		}

		// fallback
		if (item === undefined) item = isDoubles ? 'Sitrus Berry' : 'Leftovers';

		if (species.baseSpecies === 'Pikachu') {
			forme = 'Pikachu' + this.sample(['', '-Original', '-Hoenn', '-Sinnoh', '-Unova', '-Kalos', '-Alola', '-Partner', '-World']);
		}

		// Get level
		const level = this.getLevel(species, isDoubles);

		// Prepare optimal HP
		const srImmunity = ability === 'Magic Guard' || item === 'Heavy-Duty Boots';
		const srWeakness = srImmunity ? 0 : this.dex.getEffectiveness('Rock', species);
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
				if (srWeakness <= 0 || hp % (4 / srWeakness) > 0 || ['Leftovers', 'Life Orb'].includes(item)) break;
			}
			evs.hp -= 4;
		}

		// Minimize confusion damage
		const noAttackStatMoves = [...moves].every(m => {
			const move = this.dex.moves.get(m);
			if (move.damageCallback || move.damage) return true;
			if (move.id === 'shellsidearm') return false;
			// Magearna, though this can work well as a general rule
			if (move.id === 'terablast' && moves.has('shiftgear')) return false;
			return move.category !== 'Physical' || move.id === 'bodypress' || move.id === 'foulplay';
		});
		if (noAttackStatMoves && !moves.has('transform')) {
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
		isDoubles = false,
	) {
		const exclude = pokemonToExclude.map(p => toID(p.species));
		const pokemonPool = [];
		const baseSpeciesPool: string[] = [];
		if (isDoubles) {
			for (const pokemon of Object.keys(this.randomDoublesSets)) {
				let species = this.dex.species.get(pokemon);
				if (species.gen > this.gen || exclude.includes(species.id)) continue;
				if (isMonotype) {
					if (!species.types.includes(type)) continue;
					if (typeof species.battleOnly === 'string') {
						species = this.dex.species.get(species.battleOnly);
						if (!species.types.includes(type)) continue;
					}
				}
				pokemonPool.push(pokemon);
				if (!baseSpeciesPool.includes(species.baseSpecies)) baseSpeciesPool.push(species.baseSpecies);
			}
		} else {
			for (const pokemon of Object.keys(this.randomSets)) {
				let species = this.dex.species.get(pokemon);
				if (species.gen > this.gen || exclude.includes(species.id)) continue;
				if (isMonotype) {
					if (!species.types.includes(type)) continue;
					if (typeof species.battleOnly === 'string') {
						species = this.dex.species.get(species.battleOnly);
						if (!species.types.includes(type)) continue;
					}
				}
				pokemonPool.push(pokemon);
				if (!baseSpeciesPool.includes(species.baseSpecies)) baseSpeciesPool.push(species.baseSpecies);
			}
		}
		return [pokemonPool, baseSpeciesPool];
	}

	// TODO: Make types for this
	randomSets: AnyObject = randomSetsJSON;
	randomDoublesSets: AnyObject = randomSetsJSON; // Doubles sets are the same as singles for now

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
		const [pokemonPool, baseSpeciesPool] = this.getPokemonPool(type, pokemon, isMonotype, isDoubles);

		let generatedLead = false;
		while (baseSpeciesPool.length && pokemon.length < this.maxTeamSize) {
			const baseSpecies = this.sampleNoReplace(baseSpeciesPool);
			const currentSpeciesPool: Species[] = [];
			for (const poke of pokemonPool) {
				const species = this.dex.species.get(poke);
				if (species.baseSpecies === baseSpecies) currentSpeciesPool.push(species);
			}
			let species = this.sample(currentSpeciesPool);
			if (!species.exists) continue;
			// Illusion shouldn't be on the last slot
			if (species.baseSpecies === 'Zoroark' && pokemon.length >= (this.maxTeamSize - 1)) continue;

			// If Zoroark is in the team, ensure its level is balanced
			// Level range differs for each forme of Zoroark
			if (
				pokemon.some(pkmn => pkmn.species === 'Zoroark') &&
				pokemon.length >= (this.maxTeamSize - 1) &&
				(this.getLevel(species, isDoubles) < 76 || this.getLevel(species, isDoubles) > 94) &&
				!this.adjustLevel
			) {
				continue;
			}

			if (
				pokemon.some(pkmn => pkmn.species === 'Zoroark-Hisui') &&
				pokemon.length >= (this.maxTeamSize - 1) &&
				(this.getLevel(species, isDoubles) < 72 || this.getLevel(species, isDoubles) > 84) &&
				!this.adjustLevel
			) {
				continue;
			}

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

			// Limit one of any type combination, two in Monotype
			if (!this.forceMonotype && typeComboCount[typeCombo] >= (isMonotype ? 2 : 1) * limitFactor) continue;

			// The Pokemon of the Day
			if (potd?.exists && (pokemon.length === 1 || this.maxTeamSize === 1)) species = potd;

			let set: RandomTeamsTypes.RandomSet;

			if (!generatedLead) {
				if (noLeadPokemon.includes(species.baseSpecies)) {
					if (pokemon.length + 1 === this.maxTeamSize) continue;
					set = this.randomSet(species, teamDetails, false, isDoubles);
					pokemon.push(set);
				} else {
					set = this.randomSet(species, teamDetails, true, isDoubles);
					pokemon.unshift(set);
					generatedLead = true;
				}
			} else {
				set = this.randomSet(species, teamDetails, false, isDoubles);
				pokemon.push(set);
			}

			if (pokemon.length === this.maxTeamSize) {
				// Set Zoroark's level to be the same as the last Pokemon
				for (const poke of pokemon) {
					if (poke.ability === 'Illusion') poke.level = pokemon[this.maxTeamSize - 1].level;
				}

				// Don't bother tracking details for the last Pokemon
				break;
			}

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
			if (set.role === 'Tera Blast user') teamDetails.teraBlast = 1;
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
				while (learnsetSpecies.prevo) {
					learnsetSpecies = this.dex.species.get(learnsetSpecies.prevo);
					for (const moveid in learnset) {
						if (!pool.includes(moveid) &&
							learnset[moveid].some(source => source.startsWith(String(this.gen)) && !evoRegion)) {
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
