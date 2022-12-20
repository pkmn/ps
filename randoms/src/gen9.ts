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
const randomSetsJSON = {"charizard":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flamethrower","Focus Blast","Hurricane","Will-O-Wisp"],"teraTypes":["Fire"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Flare Blitz","Swords Dance","Thunder Punch"],"teraTypes":["Fire","Ground"]}]},"pikachu":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Nuzzle","Play Rough","Surf","Volt Switch","Volt Tackle"],"teraTypes":["Water","Electric"]}]},"raichu":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Encore","Focus Blast","Grass Knot","Nasty Plot","Nuzzle","Surf","Thunderbolt","Volt Switch"],"teraTypes":["Water","Grass","Electric"]}]},"raichualola":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Nasty Plot","Psychic","Psyshock","Surf","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]}]},"wigglytuff":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Dazzling Gleam","Flamethrower","Light Screen","Protect","Reflect","Stealth Rock","Thunder Wave","Wish"],"teraTypes":["Fairy"]}]},"venomoth":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["Bug Buzz","Quiver Dance","Sleep Powder","Sludge Bomb","Substitute"],"teraTypes":["Bug"]}]},"dugtrio":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Memento","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"teraTypes":["Ground"]}]},"dugtrioalola":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Iron Head","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"teraTypes":["Ground"]}]},"persian":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Aerial Ace","Double-Edge","Fake Out","Foul Play","Gunk Shot","Switcheroo","U-turn"],"teraTypes":["Normal"]}]},"persianalola":{"level":88,"sets":[{"role":"Fast Bulky Setup","movepool":["Dark Pulse","Hypnosis","Nasty Plot","Power Gem","Thunderbolt"],"teraTypes":["Dark"]}]},"golduck":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Encore","Grass Knot","Hydro Pump","Ice Beam","Nasty Plot","Psyshock","Taunt"],"teraTypes":["Water"]}]},"annihilape":{"level":80,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Drain Punch","Rage Fist","Rest"],"teraTypes":["Ghost","Water"]},{"role":"Fast Attacker","movepool":["Bulk Up","Close Combat","Rage Fist","Stone Edge","U-turn"],"teraTypes":["Ghost"]}]},"arcanine":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Morning Sun","Wild Charge","Will-O-Wisp"],"teraTypes":["Fire","Normal"]},{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Morning Sun","Wild Charge"],"teraTypes":["Fire","Normal"]}]},"arcaninehisui":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Head Smash","Morning Sun","Wild Charge"],"teraTypes":["Rock"]}]},"slowbro":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Psyshock","Slack Off","Surf","Thunder Wave"],"teraTypes":["Water"]},{"role":"AV Pivot","movepool":["Body Press","Fire Blast","Future Sight","Ice Beam","Psychic","Surf"],"teraTypes":["Fighting"]}]},"slowbrogalar":{"level":84,"sets":[{"role":"AV Pivot","movepool":["Earthquake","Fire Blast","Future Sight","Psychic","Shell Side Arm"],"teraTypes":["Psychic"]},{"role":"Wallbreaker","movepool":["Fire Blast","Psyshock","Sludge Bomb","Trick","Trick Room"],"teraTypes":["Psychic","Poison"]}]},"muk":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Fire Punch","Gunk Shot","Haze","Ice Punch","Shadow Sneak","Toxic","Toxic Spikes"],"teraTypes":["Poison"]}]},"mukalola":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Curse","Fire Punch","Gunk Shot","Knock Off","Poison Jab","Shadow Sneak","Toxic"],"teraTypes":["Dark"]}]},"cloyster":{"level":80,"sets":[{"role":"Tera Blast user","movepool":["Icicle Spear","Rock Blast","Shell Smash","Tera Blast"],"teraTypes":["Fire","Ground"]},{"role":"Setup Sweeper","movepool":["Hydro Pump","Icicle Spear","Rock Blast","Shell Smash"],"teraTypes":["Ice"]}]},"gengar":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Focus Blast","Nasty Plot","Shadow Ball","Sludge Bomb","Trick"],"teraTypes":["Ghost"]},{"role":"Fast Attacker","movepool":["Encore","Focus Blast","Shadow Ball","Sludge Bomb","Toxic Spikes","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"hypno":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Encore","Focus Blast","Foul Play","Light Screen","Psychic","Reflect","Thunder Wave"],"teraTypes":["Dark"]}]},"electrode":{"level":88,"sets":[{"role":"Fast Support","movepool":["Explosion","Foul Play","Light Screen","Taunt","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]}]},"electrodehisui":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Chloroblast","Energy Ball","Taunt","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Grass"]},{"role":"Fast Support","movepool":["Giga Drain","Leech Seed","Substitute","Thunderbolt"],"teraTypes":["Grass"]}]},"scyther":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Aerial Ace","Close Combat","Pounce","Swords Dance","U-turn"],"teraTypes":["Fighting"]}]},"tauros":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Body Slam","Close Combat","Earthquake","Rock Slide","Zen Headbutt"],"teraTypes":["Normal"]},{"role":"Wallbreaker","movepool":["Close Combat","Double-Edge","Earthquake","Stone Edge"],"teraTypes":["Normal"]}]},"taurospaldea":{"level":84,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Raging Bull","Stone Edge","Substitute"],"teraTypes":["Fighting"]},{"role":"Wallbreaker","movepool":["Bulk Up","Close Combat","Earthquake","Iron Head","Stone Edge"],"teraTypes":["Fighting"]}]},"taurospaldeafire":{"level":84,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Raging Bull","Substitute"],"teraTypes":["Fire"]},{"role":"Wallbreaker","movepool":["Close Combat","Flare Blitz","Stone Edge","Wild Charge"],"teraTypes":["Fighting"]}]},"taurospaldeawater":{"level":84,"sets":[{"role":"Fast Bulky Setup","movepool":["Bulk Up","Close Combat","Liquidation","Substitute"],"teraTypes":["Water"]},{"role":"Wallbreaker","movepool":["Aqua Jet","Bulk Up","Close Combat","Liquidation","Stone Edge","Wave Crash"],"teraTypes":["Water"]}]},"gyarados":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Stone Edge","Waterfall"],"teraTypes":["Water"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Earthquake","Tera Blast","Waterfall"],"teraTypes":["Flying"]}]},"ditto":{"level":88,"sets":[{"role":"Fast Support","movepool":["Transform"],"teraTypes":["Flying","Dark","Fire","Bug","Water","Ice","Fighting","Electric","Psychic","Poison","Grass","Ghost","Ground","Rock","Fairy","Steel","Normal","Dragon"]}]},"vaporeon":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Ice Beam","Protect","Surf","Wish"],"teraTypes":["Ghost"]}]},"jolteon":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Hyper Voice","Shadow Ball","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]},{"role":"Tera Blast user","movepool":["Calm Mind","Thunderbolt","Tera Blast","Substitute"],"teraTypes":["Ice"]}]},"flareon":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Facade","Flare Blitz","Trailblaze","Quick Attack","Will-O-Wisp"],"teraTypes":["Normal"]}]},"articuno":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Freeze-Dry","Haze","Hurricane","Air Slash","Roost","Substitute","U-turn"],"teraTypes":["Flying"]}]},"articunogalar":{"level":86,"sets":[{"role":"Fast Bulky Setup","movepool":["Air Slash","Calm Mind","Freezing Glare","Hurricane","Recover"],"teraTypes":["Psychic"]}]},"zapdos":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Discharge","Heat Wave","Hurricane","Roost","U-turn"],"teraTypes":["Electric"]}]},"zapdosgalar":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Bulk Up","Close Combat","Stomping Tantrum","U-turn"],"teraTypes":["Fighting"]}]},"moltres":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Fire Blast","Roost","U-turn","Will-O-Wisp"],"teraTypes":["Fire"]}]},"moltresgalar":{"level":82,"sets":[{"role":"Fast Bulky Setup","movepool":["Agility","Fiery Wrath","Hurricane","Nasty Plot","Rest"],"teraTypes":["Dark"]}]},"dragonite":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Dragon Dance","Earthquake","Extreme Speed","Fire Punch","Outrage"],"teraTypes":["Normal"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Earthquake","Outrage","Tera Blast"],"teraTypes":["Flying"]}]},"mewtwo":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Aura Sphere","Fire Blast","Nasty Plot","Psystrike","Recover","Shadow Ball"],"teraTypes":["Psychic"]}]},"mew":{"level":80,"sets":[{"role":"Bulky Support","movepool":["Psychic","Spikes","Stealth Rock","Taunt","Thunder Wave","Toxic Spikes","Will-O-Wisp"],"teraTypes":["Steel","Fairy"]},{"role":"Fast Attacker","movepool":["Brave Bird","Close Combat","Dragon Dance","Flare Blitz","Psychic Fangs","Swords Dance","U-turn"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Aura Sphere","Dazzling Gleam","Earth Power","Fire Blast","Nasty Plot","Psyshock","Shadow Ball"],"teraTypes":["Psychic","Fighting","Fire","Ghost","Ground","Fairy"]}]},"typhlosion":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Eruption","Flamethrower","Focus Blast","Overheat"],"teraTypes":["Fire"]}]},"typhlosionhisui":{"level":86,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Flamethrower","Shadow Ball","Substitute","Will-O-Wisp"],"teraTypes":["Ghost"]},{"role":"Fast Attacker","movepool":["Eruption","Fire Blast","Focus Blast","Shadow Ball"],"teraTypes":["Fire"]}]},"ampharos":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Agility","Dazzling Gleam","Focus Blast","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]}]},"azumarill":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Aqua Jet","Belly Drum","Liquidation","Play Rough"],"teraTypes":["Water"]},{"role":"Bulky Attacker","movepool":["Aqua Jet","Ice Spinner","Liquidation","Play Rough","Superpower"],"teraTypes":["Water"]}]},"sudowoodo":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Head Smash","Spikes","Stealth Rock","Sucker Punch","Wood Hammer"],"teraTypes":["Rock"]}]},"jumpluff":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Acrobatics","Leech Seed","Strength Sap","Substitute"],"teraTypes":["Steel"]},{"role":"Fast Support","movepool":["Acrobatics","Encore","Sleep Powder","U-turn","Strength Sap"],"teraTypes":["Steel"]}]},"sunflora":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Earth Power","Solar Beam","Sunny Day"],"teraTypes":["Grass"]}]},"quagsire":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ice Beam","Liquidation","Recover","Spikes","Toxic"],"teraTypes":["Poison","Steel","Ground","Fairy"]}]},"clodsire":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Curse","Earthquake","Gunk Shot","Recover"],"teraTypes":["Ground"]},{"role":"Bulky Support","movepool":["Earthquake","Haze","Poison Jab","Recover","Spikes","Toxic","Toxic Spikes"],"teraTypes":["Ground","Flying","Steel"]}]},"espeon":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Morning Sun","Psychic","Shadow Ball","Trick"],"teraTypes":["Fairy","Psychic"]}]},"umbreon":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Dark Pulse","Protect","Wish"],"teraTypes":["Dark","Poison"]},{"role":"Bulky Support","movepool":["Foul Play","Protect","Wish","Yawn"],"teraTypes":["Poison"]}]},"slowking":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Chilly Reception","Psyshock","Slack Off","Surf","Thunder Wave"],"teraTypes":["Water"]},{"role":"Wallbreaker","movepool":["Fire Blast","Hydro Pump","Ice Beam","Psychic","Psyshock","Trick","Trick Room"],"teraTypes":["Water","Psychic"]}]},"slowkinggalar":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Chilly Reception","Fire Blast","Psyshock","Slack Off","Sludge Bomb","Thunder Wave","Toxic"],"teraTypes":["Poison","Dark"]},{"role":"AV Pivot","movepool":["Fire Blast","Future Sight","Ice Beam","Psyshock","Sludge Bomb"],"teraTypes":["Poison","Psychic"]}]},"girafarig":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Dazzling Gleam","Nasty Plot","Psychic","Psyshock","Shadow Ball","Thunderbolt"],"teraTypes":["Psychic","Fairy"]}]},"forretress":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Body Press","Iron Head","Rapid Spin","Spikes","Stealth Rock","Volt Switch"],"teraTypes":["Fighting"]}]},"dunsparce":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Coil","Body Slam","Earthquake","Roost"],"teraTypes":["Ground"]}]},"qwilfish":{"level":86,"sets":[{"role":"Fast Support","movepool":["Destiny Bond","Gunk Shot","Spikes","Taunt","Thunder Wave","Toxic Spikes","Waterfall"],"teraTypes":["Water"]}]},"qwilfishhisui":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Crunch","Destiny Bond","Gunk Shot","Spikes","Taunt","Thunder Wave","Toxic Spikes"],"teraTypes":["Poison","Flying"]}]},"overqwil":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Crunch","Gunk Shot","Liquidation","Swords Dance"],"teraTypes":["Water"]}]},"scizor":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Bullet Punch","Close Combat","Defog","Pounce"],"teraTypes":["Steel"]},{"role":"Setup Sweeper","movepool":["Bullet Punch","Close Combat","Swords Dance","U-turn"],"teraTypes":["Steel"]}]},"heracross":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Facade","Throat Chop","Swords Dance"],"teraTypes":["Normal"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Megahorn","Stone Edge","Throat Chop"],"teraTypes":["Rock","Bug","Fighting"]}]},"ursaring":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Crunch","Earthquake","Rest","Sleep Talk"],"teraTypes":["Ground","Normal"]}]},"delibird":{"level":100,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Drill Run","Ice Spinner","Ice Shard"],"teraTypes":["Ice","Flying"]},{"role":"Fast Support","movepool":["Freeze Dry","Memento","Rapid Spin","Spikes"],"teraTypes":["Ice","Ghost"]}]},"houndoom":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Fire Blast","Flamethrower","Nasty Plot","Sludge Bomb","Sucker Punch"],"teraTypes":["Dark","Fire"]}]},"donphan":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ice Spinner","Knock Off","Rapid Spin","Stealth Rock"],"teraTypes":["Dark","Ground"]},{"role":"Bulky Attacker","movepool":["Earthquake","Gunk Shot","Ice Shard","Ice Spinner","Knock Off","Rapid Spin","Stone Edge"],"teraTypes":["Ice"]}]},"blissey":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Seismic Toss","Soft Boiled","Stealth Rock","Thunder Wave"],"teraTypes":["Steel","Fairy","Ghost","Poison"]}]},"tyranitar":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Crunch","Dragon Dance","Earthquake","Fire Punch","Stone Edge"],"teraTypes":["Rock"]},{"role":"Bulky Support","movepool":["Crunch","Earthquake","Fire Blast","Ice Beam","Stealth Rock","Stone Edge","Taunt"],"teraTypes":["Rock"]}]},"pelipper":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Hurricane","Hydro Pump","Ice Beam","Knock Off","Roost","Surf","U-turn"],"teraTypes":["Water"]}]},"gardevoir":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Focus Blast","Healing Wish","Moonblast","Mystical Fire","Psychic","Psyshock","Trick"],"teraTypes":["Fairy","Fire","Fighting"]}]},"masquerain":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Bug Buzz","Hurricane","Hydro Pump","Quiver Dance"],"teraTypes":["Water"]},{"role":"Fast Support","movepool":["Bug Buzz","Hurricane","Hydro Pump","Ice Beam","Sticky Web","Stun Spore","U-turn"],"teraTypes":["Flying"]}]},"breloom":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Bullet Seed","Close Combat","Mach Punch","Rock Tomb","Spore","Swords Dance"],"teraTypes":["Fighting"]}]},"slaking":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Body Slam","Earthquake","Fire Punch","Giga Impact","Hammer Arm","Throat Chop"],"teraTypes":["Normal","Ground"]}]},"hariyama":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Bulk Up","Bullet Punch","Close Combat","Facade","Knock Off","Headlong Rush"],"teraTypes":["Normal"]},{"role":"AV Pivot","movepool":["Bullet Punch","Close Combat","Knock Off","Headlong Rush","Heavy Slam"],"teraTypes":["Steel"]}]},"sableye":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Encore","Foul Play","Knock Off","Recover","Taunt","Thunder Wave","Will-O-Wisp"],"teraTypes":["Steel"]}]},"medicham":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Bullet Punch","Close Combat","Ice Punch","Poison Jab","Zen Headbutt"],"teraTypes":["Fighting"]}]},"swalot":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Encore","Ice Beam","Pain Split","Protect","Sludge Bomb","Toxic","Toxic Spikes"],"teraTypes":["Dark"]},{"role":"Bulky Setup","movepool":["Earthquake","Gunk Shot","Seed Bomb","Swords Dance"],"teraTypes":["Poison","Ground"]}]},"camerupt":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Lava Plume","Stealth Rock","Yawn"],"teraTypes":["Water"]}]},"torkoal":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Lava Plume","Rapid Spin","Earthquake","Solar Beam","Stealth Rock","Yawn"],"teraTypes":["Dragon","Fire"]}]},"grumpig":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Dazzling Gleam","Earth Power","Focus Blast","Nasty Plot","Psychic","Psyshock","Shadow Ball","Trick"],"teraTypes":["Psychic","Fairy","Ground","Ghost","Fighting"]}]},"cacturne":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Focus Blast","Leaf Storm","Sucker Punch","Toxic Spikes"],"teraTypes":["Dark"]},{"role":"Setup Sweeper","movepool":["Drain Punch","Seed Bomb","Sucker Punch","Swords Dance"],"teraTypes":["Dark"]}]},"altaria":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Brave Bird","Defog","Earthquake","Haze","Roost","Will-O-Wisp"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Brave Bird","Dragon Dance","Earthquake","Roost"],"teraTypes":["Flying","Ground"]}]},"zangoose":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Facade","Night Slash","Quick Attack","Swords Dance"],"teraTypes":["Normal"]}]},"seviper":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flamethrower","Giga Drain","Gunk Shot","Sucker Punch","Switcheroo"],"teraTypes":["Ground","Fire","Poison","Grass"]}]},"whiscash":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Liquidation","Spikes","Stealth Rock","Stone Edge"],"teraTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Liquidation","Stone Edge"],"teraTypes":["Ground","Water"]}]},"banette":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Gunk Shot","Knock Off","Shadow Claw","Shadow Sneak","Swords Dance","Will-O-Wisp"],"teraTypes":["Poison","Dark"]}]},"tropius":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Air Slash","Leech Seed","Protect","Substitute"],"teraTypes":["Steel"]}]},"glalie":{"level":80,"sets":[{"role":"Fast Support","movepool":["Disable","Earthquake","Freeze-Dry","Protect","Substitute"],"teraTypes":["Poison","Steel"]}]},"luvdisc":{"level":100,"sets":[{"role":"Fast Support","movepool":["Charm","Protect","Surf","Wish"],"teraTypes":["Water"]}]},"salamence":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Dual Wingbeat","Earthquake","Roost","Outrage"],"teraTypes":["Flying"]}]},"kyogre":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Ice Beam","Origin Pulse","Thunder","Water Spout"],"teraTypes":["Water"]}]},"groudon":{"level":74,"sets":[{"role":"Bulky Support","movepool":["Lava Plume","Precipice Blades","Spikes","Stealth Rock","Stone Edge","Thunder Wave"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Fire Punch","Precipice Blades","Stone Edge","Swords Dance","Thunder Wave"],"teraTypes":["Ground"]}]},"rayquaza":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Dragon Ascent","Dragon Dance","Earthquake","Extreme Speed","Swords Dance","U-turn"],"teraTypes":["Flying","Normal"]}]},"staraptor":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Close Combat","Double Edge","Quick Attack","U-turn"],"teraTypes":["Fighting","Flying","Normal"]}]},"kricketune":{"level":90,"sets":[{"role":"Fast Support","movepool":["Brick Break","Bug Bite","Sticky Web","Taunt","Pounce"],"teraTypes":["Bug"]}]},"luxray":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Crunch","Facade","Play Rough","Trailblaze","Wild Charge"],"teraTypes":["Normal"]},{"role":"AV Pivot","movepool":["Crunch","Ice Fang","Play Rough","Trailblaze","Volt Switch","Wild Charge"],"teraTypes":["Electric"]}]},"vespiquen":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Air Slash","Roost","Spikes","Toxic","Toxic Spikes","U-turn"],"teraTypes":["Steel"]}]},"pachirisu":{"level":94,"sets":[{"role":"Fast Support","movepool":["Nuzzle","Super Fang","Thunderbolt","U-turn"],"teraTypes":["Flying"]}]},"floatzel":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Bulk Up","Crunch","Ice Spinner","Liquidation","Low Kick","Wave Crash"],"teraTypes":["Water"]}]},"gastrodon":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Clear Smog","Earthquake","Ice Beam","Recover","Stealth Rock","Surf"],"teraTypes":["Ground"]}]},"drifblim":{"level":86,"sets":[{"role":"Fast Support","movepool":["Air Slash","Defog","Shadow Ball","Strength Sap","Will-O-Wisp"],"teraTypes":["Ghost","Fairy"]},{"role":"Fast Bulky Setup","movepool":["Air Slash","Calm Mind","Shadow Ball","Strength Sap"],"teraTypes":["Ghost"]}]},"mismagius":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Dazzling Gleam","Energy Ball","Mystical Fire","Nasty Plot","Shadow Ball","Thunderbolt","Trick"],"teraTypes":["Ghost","Fire","Fairy"]}]},"honchkrow":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Heat Wave","Sucker Punch","U-turn"],"teraTypes":["Dark","Flying"]}]},"skuntank":{"level":88,"sets":[{"role":"Fast Support","movepool":["Crunch","Fire Blast","Gunk Shot","Sucker Punch","Taunt","Toxic Spikes"],"teraTypes":["Dark","Poison"]}]},"bronzong":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Hypnosis","Iron Head","Light Screen","Psychic","Reflect","Stealth Rock"],"teraTypes":["Steel"]}]},"spiritomb":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Pain Split","Shadow Sneak","Sucker Punch","Will-O-Wisp"],"teraTypes":["Dark"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dark Pulse","Rest","Sleep Talk"],"teraTypes":["Dark"]}]},"garchomp":{"level":80,"sets":[{"role":"Fast Support","movepool":["Draco Meteor","Earthquake","Fire Blast","Stealth Rock","Stone Edge"],"teraTypes":["Ground"]},{"role":"Fast Attacker","movepool":["Earthquake","Fire Fang","Outrage","Stone Edge","Swords Dance"],"teraTypes":["Ground"]}]},"lucario":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Meteor Mash","Stone Edge","Swords Dance"],"teraTypes":["Normal","Fighting","Steel"]},{"role":"Setup Sweeper","movepool":["Aura Sphere","Dark Pulse","Flash Cannon","Focus Blast","Nasty Plot","Vacuum Wave"],"teraTypes":["Fighting"]}]},"hippowdon":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Slack Off","Stealth Rock","Stone Edge","Whirlwind","Yawn"],"teraTypes":["Ground"]}]},"toxicroak":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Gunk Shot","Ice Punch","Sucker Punch","Swords Dance"],"teraTypes":["Dark","Fighting"]},{"role":"Setup Sweeper","movepool":["Dark Pulse","Focus Blast","Nasty Plot","Sludge Bomb","Vacuum Wave"],"teraTypes":["Dark","Fighting","Poison"]}]},"lumineon":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Dazzling Gleam","Encore","Hydro Pump","Ice Beam","U-turn"],"teraTypes":["Water"]}]},"abomasnow":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Aurora Veil","Blizzard","Earthquake","Ice Shard","Wood Hammer"],"teraTypes":["Ice"]}]},"weavile":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Ice Shard","Ice Spinner","Low Kick","Night Slash","Swords Dance"],"teraTypes":["Ice","Fighting"]}]},"sneasler":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Dire Claw","Gunk Shot","Night Slash","U-turn"],"teraTypes":["Dark","Fighting"]},{"role":"Setup Sweeper","movepool":["Acrobatics","Close Combat","Gunk Shot","Swords Dance"],"teraTypes":["Flying"]}]},"magnezone":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Flash Cannon","Mirror Coat","Steel Beam","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Steel"]},{"role":"Tera Blast user","movepool":["Flash Cannon","Tera Blast","Thunderbolt","Volt Switch"],"teraTypes":["Fire"]}]},"leafeon":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["Double Edge","Leaf Blade","Substitute","Swords Dance","Synthesis","X-Scissor"],"teraTypes":["Normal"]}]},"glaceon":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Freeze Dry","Protect","Wish"],"teraTypes":["Ice"]}]},"gallade":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Leaf Blade","Night Slash","Psycho Cut","Sacred Sword","Swords Dance"],"teraTypes":["Fighting","Grass","Dark"]}]},"froslass":{"level":86,"sets":[{"role":"Fast Support","movepool":["Destiny Bond","Ice Beam","Shadow Ball","Spikes","Taunt","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"rotom":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Nasty Plot","Shadow Ball","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"rotomwash":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Discharge","Hydro Pump","Nasty Plot","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Water"]}]},"rotomheat":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Nasty Plot","Overheat","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Fire"]}]},"rotomfrost":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Blizzard","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Ice"]}]},"rotomfan":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"teraTypes":["Flying"]}]},"rotommow":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Leaf Storm","Nasty Plot","Thunderbolt","Trick","Volt Switch","Will-O-Wisp"],"teraTypes":["Grass"]}]},"uxie":{"level":88,"sets":[{"role":"Fast Support","movepool":["Encore","Light Screen","Psychic","Reflect","Stealth Rock","Taunt","Thunder Wave","U-turn","Yawn"],"teraTypes":["Steel"]}]},"mesprit":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Dazzling Gleam","Energy Ball","Healing Wish","Ice Beam","Nasty Plot","Psychic","Thunderbolt","Trick","U-turn"],"teraTypes":["Psychic","Fairy","Ice","Electric"]}]},"azelf":{"level":82,"sets":[{"role":"Fast Support","movepool":["Explosion","Fire Blast","Psychic","Stealth Rock","Taunt","U-turn"],"teraTypes":["Psychic"]},{"role":"Fast Attacker","movepool":["Dazzling Gleam","Energy Ball","Fire Blast","Nasty Plot","Psychic","Psyshock","Trick","U-turn"],"teraTypes":["Psychic","Fairy","Fire"]}]},"dialga":{"level":76,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Flash Cannon","Stealth Rock","Thunder Wave","Thunderbolt","Trick"],"teraTypes":["Dragon","Steel","Fire"]}]},"dialgaorigin":{"level":76,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Flash Cannon","Stealth Rock","Thunder Wave","Thunderbolt"],"teraTypes":["Steel"]}]},"palkia":{"level":76,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend","Thunder Wave"],"teraTypes":["Dragon","Fire","Water"]}]},"palkiaorigin":{"level":76,"sets":[{"role":"Wallbreaker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend"],"teraTypes":["Dragon","Water"]}]},"heatran":{"level":80,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Flash Cannon","Lava Plume","Magma Storm","Protect","Stealth Rock"],"teraTypes":["Flying","Grass","Fire","Steel"]}]},"giratina":{"level":76,"sets":[{"role":"Bulky Support","movepool":["Dragon Tail","Rest","Shadow Ball","Sleep Talk","Will-O-Wisp"],"teraTypes":["Ghost"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dragon Pulse","Rest","Sleep Talk"],"teraTypes":["Dragon"]}]},"giratinaorigin":{"level":76,"sets":[{"role":"Bulky Support","movepool":["Defog","Draco Meteor","Dragon Tail","Earthquake","Outrage","Shadow Ball","Shadow Sneak","Will-O-Wisp"],"teraTypes":["Dragon","Ghost"]}]},"cresselia":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Moonlight","Thunderbolt","Psychic","Psyshock"],"teraTypes":["Fairy","Electric","Poison","Steel"]}]},"arceus":{"level":70,"sets":[{"role":"Setup Sweeper","movepool":["Extreme Speed","Earthquake","Recover","Swords Dance","Shadow Claw"],"teraTypes":["Normal"]}]},"arceusbug":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Earth Power","Judgment","Fire Blast","Recover"],"teraTypes":["Ground"]}]},"arceusdark":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Judgment","Fire Blast","Recover","Sludge Bomb"],"teraTypes":["Dark"]}]},"arceusdragon":{"level":70,"sets":[{"role":"Setup Sweeper","movepool":["Extreme Speed","Earthquake","Gunk Shot","Swords Dance","Outrage"],"teraTypes":["Dragon"]}]},"arceuselectric":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Judgment","Ice Beam","Recover"],"teraTypes":["Electric","Ice"]}]},"arceusfairy":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Fire Blast","Judgment","Recover"],"teraTypes":["Fairy"]}]},"arceusfighting":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Cosmic Power","Body Press","Recover","Stored Power"],"teraTypes":["Steel"]}]},"arceusfire":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Extreme Speed","Flare Blitz","Liquidation","Recover","Swords Dance"],"teraTypes":["Fire"]}]},"arceusflying":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Judgment","Fire Blast","Recover"],"teraTypes":["Flying","Ground"]}]},"arceusghost":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Judgment","Focus Blast","Recover"],"teraTypes":["Ghost"]}]},"arceusgrass":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Judgment","Earth Power","Fire Blast","Recover"],"teraTypes":["Grass"]}]},"arceusground":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Judgment","Ice Beam","Fire Blast","Recover"],"teraTypes":["Ground"]}]},"arceusice":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Judgment","Earth Power","Recover","Thunderbolt"],"teraTypes":["Electric","Ice"]}]},"arceuspoison":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Flare Blitz","Gunk Shot","Liquidation","Recover","Swords Dance"],"teraTypes":["Poison"]}]},"arceuspsychic":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Cosmic Power","Recover","Stored Power"],"teraTypes":["Steel"]}]},"arceusrock":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Judgment","Earth Power","Fire Blast","Ice Beam","Recover"],"teraTypes":["Ground","Rock"]}]},"arceussteel":{"level":70,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Judgment","Earth Power","Recover","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"arceuswater":{"level":70,"sets":[{"role":"Bulky Support","movepool":["Judgment","Recover","Taunt","Will-O-Wisp"],"teraTypes":["Steel"]}]},"samurott":{"level":88,"sets":[{"role":"AV Pivot","movepool":["Ice Beam","Grass Knot","Hydro Pump","Knock Off","Megahorn","Sacred Sword"],"teraTypes":["Water","Dark"]},{"role":"Fast Attacker","movepool":["Aqua Jet","Knock Off","Liquidation","Megahorn","Sacred Sword","Swords Dance"],"teraTypes":["Water","Dark"]}]},"samurotthisui":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Ceaseless Edge","Razor Shell","Sucker Punch","Swords Dance","X-Scissor"],"teraTypes":["Water","Dark"]}]},"lilligant":{"level":86,"sets":[{"role":"Tera Blast user","movepool":["Giga Drain","Pollen Puff","Quiver Dance","Sleep Powder","Tera Blast"],"teraTypes":["Fire"]},{"role":"Setup Sweeper","movepool":["Petal Dance","Pollen Puff","Quiver Dance","Sleep Powder"],"teraTypes":["Grass"]}]},"lilliganthisui":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Ice Spinner","Leaf Blade","Sleep Powder","Victory Dance"],"teraTypes":["Fighting"]},{"role":"Fast Support","movepool":["Close Combat","Defog","Ice Spinner","Leaf Blade","Sleep Powder"],"teraTypes":["Fighting"]}]},"basculin":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Crunch","Head Smash","Psychic Fangs","Wave Crash"],"teraTypes":["Water"]}]},"basculinbluestriped":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Crunch","Head Smash","Psychic Fangs","Wave Crash"],"teraTypes":["Water"]}]},"basculegion":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Agility","Aqua Jet","Last Respects","Psychic Fangs","Wave Crash"],"teraTypes":["Ghost"]}]},"basculegionf":{"level":76,"sets":[{"role":"Wallbreaker","movepool":["Agility","Hydro Pump","Ice Beam","Last Respects"],"teraTypes":["Ghost"]}]},"krookodile":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Bulk Up","Close Combat","Crunch","Earthquake","Stealth Rock","Stone Edge"],"teraTypes":["Fighting","Ground"]}]},"zoroark":{"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Flamethrower","Focus Blast","Nasty Plot","Sludge Bomb","Trick","U-turn"],"teraTypes":["Poison"]}]},"zoroarkhisui":{"sets":[{"role":"Fast Attacker","movepool":["Bitter Malice","Flamethrower","Focus Blast","Hyper Voice","Nasty Plot","Shadow Ball","Trick","U-turn"],"teraTypes":["Normal"]}]},"gothitelle":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Nasty Plot","Psychic","Shadow Ball","Thunderbolt","Trick"],"teraTypes":["Psychic","Ghost","Electric"]}]},"sawsbuck":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["Double-Edge","Headbutt","Horn Leech","Stomping Tantrum","Swords Dance"],"teraTypes":["Normal"]}]},"amoonguss":{"level":80,"sets":[{"role":"Bulky Support","movepool":["Giga Drain","Sludge Bomb","Spore","Toxic"],"teraTypes":["Steel"]}]},"alomomola":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Body Slam","Liquidation","Mirror Coat","Protect","Wish"],"teraTypes":["Steel"]}]},"eelektross":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Coil","Close Combat","Fire Punch","Liquidation","Wild Charge"],"teraTypes":["Electric"]},{"role":"AV Pivot","movepool":["Close Combat","Flamethrower","Giga Drain","Thunderbolt","U-turn"],"teraTypes":["Electric"]}]},"haxorus":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Dragon Dance","Earthquake","Outrage","Poison Jab","Swords Dance"],"teraTypes":["Fighting","Ground"]}]},"beartic":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Close Combat","Icicle Crash","Earthquake","Snowscape","Swords Dance"],"teraTypes":["Fighting","Ice","Ground"]}]},"cryogonal":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Freeze-Dry","Flash Cannon","Haze","Rapid Spin","Recover"],"teraTypes":["Steel"]}]},"braviary":{"level":86,"sets":[{"role":"Fast Bulky Setup","movepool":["Brave Bird","Bulk Up","Close Combat","Roost"],"teraTypes":["Flying","Fighting"]}]},"braviaryhisui":{"level":80,"sets":[{"role":"Fast Support","movepool":["Calm Mind","Defog","Heat Wave","Hurricane","Psychic"],"teraTypes":["Psychic","Flying"]},{"role":"Wallbreaker","movepool":["Calm Mind","Esper Wing","Heat Wave","Hurricane","U-turn"],"teraTypes":["Psychic","Flying"]}]},"hydreigon":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Draco Meteor","Fire Blast","Flash Cannon","Nasty Plot","U-turn"],"teraTypes":["Dark","Dragon","Fire","Steel"]}]},"volcarona":{"level":80,"sets":[{"role":"Fast Bulky Setup","movepool":["Bug Buzz","Fiery Dance","Fire Blast","Giga Drain","Morning Sun","Quiver Dance"],"teraTypes":["Fire"]}]},"tornadus":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Bleakwind Storm","Grass Knot","Focus Blast","Heat Wave","Nasty Plot","U-turn"],"teraTypes":["Flying","Fire"]}]},"tornadustherian":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Bleakwind Storm","Grass Knot","Focus Blast","Heat Wave","Nasty Plot","U-turn"],"teraTypes":["Flying","Fire"]}]},"thundurus":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Nasty Plot","Sludge Bomb","Taunt","Thunderbolt","Thunder Wave","U-turn"],"teraTypes":["Electric","Grass"]},{"role":"Tera Blast user","movepool":["Focus Blast","Nasty Plot","Tera Blast","Thunderbolt"],"teraTypes":["Flying"]}]},"thundurustherian":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Nasty Plot","Psychic","Sludge Bomb","Thunderbolt","Volt Switch"],"teraTypes":["Electric","Psychic","Poison"]},{"role":"Tera Blast user","movepool":["Focus Blast","Nasty Plot","Tera Blast","Thunderbolt"],"teraTypes":["Flying"]}]},"landorus":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Earth Power","Focus Blast","Nasty Plot","Psychic","Rock Slide","Sludge Bomb","Stealth Rock"],"teraTypes":["Ground","Psychic","Poison"]}]},"landorustherian":{"level":80,"sets":[{"role":"Fast Support","movepool":["Earthquake","Taunt","Stealth Rock","Stone Edge","U-turn"],"teraTypes":["Ground"]},{"role":"Tera Blast user","movepool":["Earthquake","Stone Edge","Swords Dance","Tera Blast"],"teraTypes":["Flying"]}]},"meloetta":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Focus Blast","Hyper Voice","Psyshock","U-turn"],"teraTypes":["Normal","Psychic","Fighting"]}]},"chesnaught":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Body Press","Leech Seed","Spikes","Spiky Shield","Synthesis","Wood Hammer"],"teraTypes":["Steel"]},{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Synthesis","Trailblaze"],"teraTypes":["Steel"]}]},"delphox":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Fire Blast","Grass Knot","Nasty Plot","Psyshock","Switcheroo"],"teraTypes":["Fire","Psychic"]}]},"greninja":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Grass Knot","Gunk Shot","Hydro Pump","Ice Beam","Toxic Spikes","U-turn"],"teraTypes":["Water","Dark","Poison"]}]},"talonflame":{"level":84,"sets":[{"role":"Fast Support","movepool":["Brave Bird","Defog","Overheat","Roost","Taunt","U-turn","Will-O-Wisp"],"teraTypes":["Water"]},{"role":"Tera Blast user","movepool":["Brave Bird","Flare Blitz","Swords Dance","Tera Blast"],"teraTypes":["Ground"]}]},"vivillon":{"level":86,"sets":[{"role":"Fast Bulky Setup","movepool":["Bug Buzz","Energy Ball","Hurricane","Quiver Dance","Sleep Powder","Substitute"],"teraTypes":["Flying"]},{"role":"Tera Blast user","movepool":["Hurricane","Quiver Dance","Sleep Powder","Substitute","Tera Blast"],"teraTypes":["Ground"]}]},"pyroar":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Fire Blast","Hyper Voice","Will-O-Wisp","Work Up"],"teraTypes":["Fire"]}]},"florges":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Protect","Wish"],"teraTypes":["Fairy"]}]},"gogoat":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Earthquake","Horn Leech","Milk Drink"],"teraTypes":["Ground"]}]},"dragalge":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Dragon Pulse","Focus Blast","Sludge Bomb","Thunderbolt","Toxic","Toxic Spikes"],"teraTypes":["Dragon","Poison"]}]},"clawitzer":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Aura Sphere","Dark Pulse","Dragon Pulse","Hydro Pump","U-turn"],"teraTypes":["Dark","Dragon","Fighting"]}]},"sylveon":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Hyper Voice","Protect","Wish"],"teraTypes":["Fairy"]},{"role":"Tera Blast user","movepool":["Calm Mind","Hyper Voice","Tera Blast","Trailblaze"],"teraTypes":["Ground"]}]},"hawlucha":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Brave Bird","Close Combat","Stone Edge","Swords Dance"],"teraTypes":["Fighting","Flying"]}]},"dedenne":{"level":88,"sets":[{"role":"Fast Support","movepool":["Dazzling Gleam","Nuzzle","Super Fang","Thunderbolt","U-turn"],"teraTypes":["Electric"]}]},"carbink":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Moonblast","Power Gem","Spikes","Stealth Rock"],"teraTypes":["Fighting"]},{"role":"Bulky Support","movepool":["Body Press","Light Screen","Moonblast","Reflect","Stealth Rock"],"teraTypes":["Fighting"]}]},"goodra":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Earthquake","Fire Blast","Power Whip","Sludge Bomb","Thunderbolt"],"teraTypes":["Dragon","Ground","Fire","Grass","Poison","Electric"]}]},"goodrahisui":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Dragon Tail","Earthquake","Fire Blast","Heavy Slam","Hydro Pump","Thunderbolt"],"teraTypes":["Dragon","Ground","Fire","Steel","Water","Electric"]},{"role":"Bulky Setup","movepool":["Body Press","Curse","Heavy Slam","Rest"],"teraTypes":["Fighting"]}]},"klefki":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Magnet Rise","Play Rough","Spikes","Thunder Wave"],"teraTypes":["Water"]}]},"avalugg":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Avalanche","Body Press","Curse","Rapid Spin","Recover"],"teraTypes":["Fighting"]}]},"avalugghisui":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Avalanche","Body Press","Curse","Recover","Stone Edge"],"teraTypes":["Poison","Flying"]}]},"noivern":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Draco Meteor","Flamethrower","Hurricane","Roost","U-turn"],"teraTypes":["Normal"]},{"role":"Fast Support","movepool":["Defog","Draco Meteor","Flamethrower","Hurricane","Roost","U-turn"],"teraTypes":["Fire"]}]},"diancie":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Diamond Storm","Earth Power","Moonblast","Stealth Rock"],"teraTypes":["Fighting"]}]},"hoopa":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Nasty Plot","Psyshock","Shadow Ball","Substitute","Trick"],"teraTypes":["Psychic","Ghost","Fighting"]}]},"hoopaunbound":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Drain Punch","Gunk Shot","Hyperspace Fury","Trick","Zen Headbutt"],"teraTypes":["Dark","Fighting","Poison"]},{"role":"Fast Attacker","movepool":["Dark Pulse","Focus Blast","Nasty Plot","Psyshock","Trick"],"teraTypes":["Dark","Fighting","Psychic"]},{"role":"AV Pivot","movepool":["Gunk Shot","Focus Blast","Hyperspace Fury","Psychic"],"teraTypes":["Dark","Fighting","Psychic","Poison"]}]},"volcanion":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Flame Charge","Flamethrower","Sludge Bomb","Steam Eruption"],"teraTypes":["Water"]}]},"decidueye":{"level":86,"sets":[{"role":"Fast Support","movepool":["Defog","Knock Off","Leaf Storm","Roost","Spirit Shackle","U-turn"],"teraTypes":["Dark","Ghost","Grass"]},{"role":"Setup Sweeper","movepool":["Leaf Blade","Shadow Sneak","Spirit Shackle","Swords Dance"],"teraTypes":["Ghost"]}]},"decidueyehisui":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Leaf Blade","Sucker Punch","Swords Dance","Synthesis","Triple Arrows","U-turn"],"teraTypes":["Fighting","Dark"]}]},"gumshoos":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Body Slam","Crunch","Earthquake","Psychic Fangs","U-turn"],"teraTypes":["Ground"]}]},"crabominable":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Drain Punch","Earthquake","Gunk Shot","Ice Hammer"],"teraTypes":["Fighting","Ground"]}]},"oricorio":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Hurricane","Quiver Dance","Revelation Dance","Roost","Substitute"],"teraTypes":["Ground"]},{"role":"Fast Support","movepool":["Defog","Hurricane","Revelation Dance","Roost","U-turn"],"teraTypes":["Ground"]}]},"oricoriopompom":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Hurricane","Quiver Dance","Revelation Dance","Roost","Substitute"],"teraTypes":["Electric","Ground"]},{"role":"Fast Support","movepool":["Defog","Hurricane","Revelation Dance","Roost","U-turn"],"teraTypes":["Electric"]}]},"oricoriopau":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Hurricane","Quiver Dance","Revelation Dance","Roost","Substitute"],"teraTypes":["Ground"]},{"role":"Fast Support","movepool":["Defog","Hurricane","Revelation Dance","Roost","U-turn"],"teraTypes":["Ground"]}]},"oricoriosensu":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Hurricane","Quiver Dance","Revelation Dance","Roost","Substitute"],"teraTypes":["Ghost","Fighting"]},{"role":"Fast Support","movepool":["Defog","Hurricane","Revelation Dance","Roost","U-turn"],"teraTypes":["Ghost"]}]},"lycanroc":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Accelerock","Close Combat","Crunch","Drill Run","Psychic Fangs","Stealth Rock","Stone Edge","Swords Dance","Taunt"],"teraTypes":["Fighting"]}]},"lycanrocmidnight":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Psychic Fangs","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"teraTypes":["Rock"]}]},"lycanrocdusk":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Accelerock","Close Combat","Crunch","Drill Run","Psychic Fangs","Stone Edge","Swords Dance"],"teraTypes":["Fighting"]}]},"toxapex":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Chilling Water","Haze","Recover","Toxic","Toxic Spikes"],"teraTypes":["Steel","Flying","Grass","Fairy"]}]},"mudsdale":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Earthquake","Heavy Slam","Stealth Rock","Stone Edge"],"teraTypes":["Fighting"]}]},"lurantis":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Leaf Storm","Pollen Puff","Synthesis"],"teraTypes":["Grass"]}]},"salazzle":{"level":82,"sets":[{"role":"Fast Support","movepool":["Flamethrower","Protect","Substitute","Toxic"],"teraTypes":["Water","Flying"]}]},"tsareena":{"level":84,"sets":[{"role":"Fast Support","movepool":["High Jump Kick","Play Rough","Power Whip","Rapid Spin","Synthesis","U-turn"],"teraTypes":["Fighting","Grass"]}]},"oranguru":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Focus Blast","Nasty Plot","Psychic","Psyshock","Thunderbolt"],"teraTypes":["Psychic","Electric","Fighting"]},{"role":"Wallbreaker","movepool":["Focus Blast","Hyper Voice","Psyshock","Thunderbolt","Trick","Trick Room"],"teraTypes":["Psychic","Electric","Fighting"]}]},"passimian":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Gunk Shot","Knock Off","Rock Slide","U-turn"],"teraTypes":["Dark"]}]},"palossand":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Hypnosis","Shadow Ball","Shore Up","Stealth Rock"],"teraTypes":["Water"]}]},"komala":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Earthquake","Gunk Shot","Ice Spinner","Play Rough","Rapid Spin","Sucker Punch","Superpower","U-turn","Wood Hammer"],"teraTypes":["Normal","Ground","Poison","Fairy","Fighting","Grass"]}]},"mimikyu":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["Drain Punch","Play Rough","Shadow Claw","Shadow Sneak","Swords Dance","Wood Hammer"],"teraTypes":["Fighting","Grass","Fairy","Ghost"]}]},"bruxish":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Crunch","Ice Fang","Psychic Fangs","Swords Dance","Wave Crash"],"teraTypes":["Dark","Psychic"]}]},"magearna":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Aura Sphere","Flash Cannon","Fleur Cannon","Ice Beam","Spikes","Volt Switch"],"teraTypes":["Fairy","Steel","Fighting","Psychic"]},{"role":"Bulky Setup","movepool":["Agility","Calm Mind","Flash Cannon","Fleur Cannon"],"teraTypes":["Steel"]}]},"rillaboom":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Acrobatics","Knock Off","Stomping Tantrum","Swords Dance","Wood Hammer"],"teraTypes":["Flying","Grass"]},{"role":"Fast Attacker","movepool":["Knock Off","Stomping Tantrum","U-turn","Wood Hammer"],"teraTypes":["Grass"]}]},"cinderace":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Court Change","Gunk Shot","High Jump Kick","Pyro Ball","Sucker Punch","U-turn"],"teraTypes":["Fire","Fighting","Poison"]}]},"inteleon":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Air Slash","Dark Pulse","Hydro Pump","Ice Beam","Surf","U-turn"],"teraTypes":["Water"]},{"role":"Tera Blast user","movepool":["Hydro Pump","Ice Beam","Tera Blast","U-turn"],"teraTypes":["Electric"]}]},"greedent":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Crunch","Earthquake","Fire Fang","Psychic Fangs","Swords Dance"],"teraTypes":["Ground","Psychic"]}]},"corviknight":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Brave Bird","Bulk Up","Roost"],"teraTypes":["Fighting"]},{"role":"Bulky Attacker","movepool":["Body Press","Brave Bird","Defog","Roost","U-turn"],"teraTypes":["Fighting"]}]},"drednaw":{"level":82,"sets":[{"role":"Setup Swepeer","movepool":["Crunch","Earthquake","Liquidation","Shell Smash","Stone Edge"],"teraTypes":["Water","Rock","Ground"]}]},"coalossal":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Overheat","Rapid Spin","Spikes","Stealth Rock","Stone Edge","Will-O-Wisp"],"teraTypes":["Water"]}]},"flapple":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Dragon Dance","Grav Apple","Outrage","Sucker Punch","U-turn"],"teraTypes":["Dragon","Grass"]}]},"appletun":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Apple Acid","Dragon Pulse","Leech Seed","Recover"],"teraTypes":["Dragon","Grass"]}]},"sandaconda":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Coil","Earthquake","Glare","Rest","Stone Edge"],"teraTypes":["Ground"]},{"role":"Bulky Support","movepool":["Earthquake","Glare","Rest","Stealth Rock","Stone Edge"],"teraTypes":["Ground"]}]},"barraskewda":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Crunch","Liquidation","Poison Jab","Psychic Fangs"],"teraTypes":["Fighting"]}]},"toxtricity":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Overdrive","Shift Gear","Sludge Bomb","Volt Switch"],"teraTypes":["Normal"]}]},"toxtricitylowkey":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Overdrive","Sludge Bomb","Toxic Spikes","Volt Switch"],"teraTypes":["Normal"]}]},"polteageist":{"level":82,"sets":[{"role":"Tera Blast user","movepool":["Giga Drain","Shadow Ball","Shell Smash","Stored Power","Strength Sap","Tera Blast"],"teraTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Giga Drain","Shadow Ball","Shell Smash","Stored Power","Strength Sap"],"teraTypes":["Psychic"]}]},"hatterene":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Mystical Fire","Psychic","Psyshock","Trick","Trick Room"],"teraTypes":["Psychic","Fairy","Fire"]}]},"grimmsnarl":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Light Screen","Parting Shot","Reflect","Spirit Break","Thunder Wave"],"teraTypes":["Fairy"]},{"role":"Fast Bulky Setup","movepool":["Bulk Up","Crunch","Rest","Spirit Break","Sucker Punch","Thunder Wave"],"teraTypes":["Dark"]},{"role":"Bulky Attacker","movepool":["Parting Shot","Spirit Break","Sucker Punch","Taunt","Thunder Wave"],"teraTypes":["Fairy"]}]},"perrserker":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Crunch","Iron Head","Stealth Rock","U-turn"],"teraTypes":["Steel","Fighting"]}]},"falinks":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Megahorn","No Retreat","Poison Jab","Rock Slide"],"teraTypes":["Fighting"]}]},"pincurchin":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Discharge","Spikes","Sucker Punch","Toxic Spikes"],"teraTypes":["Electric","Dark"]}]},"frosmoth":{"level":86,"sets":[{"role":"Tera Blast user","movepool":["Bug Buzz","Giga Drain","Hurricane","Ice Beam","Quiver Dance","Tera Blast"],"teraTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Bug Buzz","Giga Drain","Hurricane","Ice Beam","Quiver Dance"],"teraTypes":["Ice","Water"]}]},"stonjourner":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Heavy Slam","Rock Polish","Stealth Rock","Stone Edge"],"teraTypes":["Ground"]}]},"eiscue":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["Belly Drum","Ice Spinner","Iron Head","Liquidation","Substitute","Zen Headbutt"],"teraTypes":["Water"]},{"role":"Tera Blast user","movepool":["Belly Drum","Ice Spinner","Liquidation","Substitute","Tera Blast"],"teraTypes":["Ground"]}]},"indeedee":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Healing Wish","Hyper Voice","Psychic","Psyshock","Shadow Ball"],"teraTypes":["Psychic"]}]},"indeedeef":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Healing Wish","Hyper Voice","Psychic","Psyshock","Shadow Ball"],"teraTypes":["Psychic"]}]},"copperajah":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Iron Head","Play Rough","Rock Slide","Stealth Rock","Superpower"],"teraTypes":["Steel","Fairy"]}]},"dragapult":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Shadow Ball","Thunderbolt","U-turn"],"teraTypes":["Ghost","Dragon"]},{"role":"Tera Blast user","movepool":["Dragon Dance","Dragon Darts","Fire Blast","Tera Blast"],"teraTypes":["Ghost"]}]},"zacian":{"level":70,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Play Rough","Psychic Fangs","Swords Dance","Wild Charge"],"teraTypes":["Fighting"]}]},"zaciancrowned":{"level":68,"sets":[{"role":"Setup Sweeper","movepool":["Behemoth Blade","Close Combat","Play Rough","Swords Dance"],"teraTypes":["Fighting"]}]},"zamazenta":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Crunch","Iron Head","Psychic Fangs","Stone Edge","Wild Charge"],"teraTypes":["Fighting","Dark"]},{"role":"Bulky Setup","movepool":["Body Press","Crunch","Iron Defense","Iron Head","Rest","Stone Edge"],"teraTypes":["Fighting"]}]},"zamazentacrowned":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Behemoth Bash","Body Press","Crunch","Iron Defense","Psychic Fangs","Stone Edge"],"teraTypes":["Fighting"]}]},"eternatus":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Dynamax Cannon","Fire Blast","Recover","Sludge Bomb"],"teraTypes":["Dragon"]},{"role":"Bulky Support","movepool":["Dynamax Cannon","Flamethrower","Recover","Toxic","Toxic Spikes"],"teraTypes":["Dragon"]}]},"urshifu":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Poison Jab","Sucker Punch","Swords Dance","U-turn","Wicked Blow"],"teraTypes":["Dark"]}]},"urshifurapidstrike":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Ice Spinner","Surging Strikes","Swords Dance","U-turn"],"teraTypes":["Water"]}]},"zarude":{"level":86,"sets":[{"role":"Fast Bulky Setup","movepool":["Close Combat","Crunch","Power Whip","Swords Dance","Synthesis"],"teraTypes":["Dark","Grass","Fighting"]},{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Power Whip","U-turn"],"teraTypes":["Dark","Grass","Fighting"]}]},"regieleki":{"level":80,"sets":[{"role":"Fast Support","movepool":["Explosion","Rapid Spin","Volt Switch","Thunderbolt"],"teraTypes":["Electric"]},{"role":"Tera Blast user","movepool":["Rapid Spin","Tera Blast","Thunderbolt","Volt Switch"],"teraTypes":["Ice"]}]},"regidrago":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Dragon Dance","Earthquake","Fire Fang","Outrage"],"teraTypes":["Dragon"]},{"role":"Tera Blast user","movepool":["Dragon Claw","Dragon Dance","Earthquake","Tera Blast"],"teraTypes":["Steel"]}]},"glastrier":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Crunch","Heavy Slam","Icicle Crash","Stomping Tantrum","Swords Dance"],"teraTypes":["Fighting","Steel"]}]},"spectrier":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Nasty Plot","Psychic","Shadow Ball","Substitute","Will-O-Wisp"],"teraTypes":["Ghost","Psychic"]},{"role":"Tera Blast user","movepool":["Nasty Plot","Shadow Ball","Substitute","Tera Blast","Will-O-Wisp"],"teraTypes":["Fighting"]}]},"calyrex":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Encore","Energy Ball","Leech Seed","Psychic","Psyshock"],"teraTypes":["Steel"]}]},"calyrexice":{"level":74,"sets":[{"role":"Wallbreaker","movepool":["Agility","Close Combat","Glacial Lance","Stomping Tantrum","Trick Room","Zen Headbutt"],"teraTypes":["Fighting"]}]},"calyrexshadow":{"level":68,"sets":[{"role":"Fast Attacker","movepool":["Astral Barrage","Nasty Plot","Pollen Puff","Psyshock","Trick"],"teraTypes":["Ghost"]}]},"wyrdeer":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Earthquake","Megahorn","Psychic","Thunder Wave","Thunderbolt"],"teraTypes":["Ground"]}]},"kleavor":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Defog","Stone Axe","Swords Dance","U-turn","X-Scissor"],"teraTypes":["Bug","Rock","Fighting"]}]},"ursaluna":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Facade","Headlong Rush","Protect","Swords Dance"],"teraTypes":["Normal"]}]},"enamorus":{"level":82,"sets":[{"role":"Tera Blast user","movepool":["Play Rough","Superpower","Taunt","Tera Blast"],"teraTypes":["Flying"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Earth Power","Moonblast","Substitute"],"teraTypes":["Ground"]}]},"enamorustherian":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Healing Wish","Moonblast","Mystical Fire","Psychic","Superpower"],"teraTypes":["Fairy"]}]},"meowscarada":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Flower Trick","Knock Off","Thunder Punch","Toxic Spikes","U-turn"],"teraTypes":["Grass","Dark"]}]},"skeledirge":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Flame Charge","Torch Song","Shadow Ball","Slack Off"],"teraTypes":["Fire"]},{"role":"Bulky Support","movepool":["Hex","Torch Song","Slack Off","Will-O-Wisp"],"teraTypes":["Ghost","Water"]}]},"quaquaval":{"level":80,"sets":[{"role":"Fast Support","movepool":["Aqua Step","Close Combat","Ice Spinner","Rapid Spin","Roost","U-turn"],"teraTypes":["Water","Fighting"]},{"role":"Setup Sweeper","movepool":["Aqua Step","Close Combat","Ice Spinner","Roost","Swords Dance"],"teraTypes":["Water","Fighting"]}]},"oinkologne":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Body Slam","Stomping Tantrum","Stuff Cheeks"],"teraTypes":["Fighting"]}]},"oinkolognef":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Body Slam","Stomping Tantrum","Stuff Cheeks"],"teraTypes":["Fighting"]}]},"dudunsparce":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Glare","Headbutt","Roost"],"teraTypes":["Normal","Ghost","Ground"]},{"role":"Bulky Setup","movepool":["Boomburst","Calm Mind","Earth Power","Thunder","Roost"],"teraTypes":["Normal"]}]},"dudunsparcethreesegment":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Glare","Headbutt","Roost"],"teraTypes":["Normal","Ghost","Ground"]},{"role":"Bulky Setup","movepool":["Boomburst","Calm Mind","Earth Power","Thunder","Roost"],"teraTypes":["Normal"]}]},"spidops":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Memento","Spikes","Sticky Web","Toxic Spikes","U-turn"],"teraTypes":["Ghost"]}]},"lokix":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Axe Kick","First Impression","Leech Life","Sucker Punch"],"teraTypes":["Bug"]},{"role":"Fast Attacker","movepool":["Axe Kick","First Impression","Sucker Punch","U-turn"],"teraTypes":["Bug"]}]},"rabsca":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Psychic","Recover","Revival Blessing","Trick Room"],"teraTypes":["Steel"]}]},"houndstone":{"level":76,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Last Respects","Trick","Will-O-Wisp"],"teraTypes":["Ghost"]}]},"espathra":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Lumina Crash","Shadow Ball","U-turn"],"teraTypes":["Psychic","Fairy","Ghost"]},{"role":"Fast Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Protect","Roost","Stored Power","Substitute"],"teraTypes":["Psychic","Fairy"]},{"role":"Tera Blast user","movepool":["Dazzling Gleam","Lumina Crash","Shadow Ball","Tera Blast"],"teraTypes":["Fighting"]}]},"farigiraf":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Hyper Voice","Protect","Wish"],"teraTypes":["Dark"]}]},"wugtrio":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Liquidation","Memento","Stomping Tantrum","Sucker Punch","Throat Chop"],"teraTypes":["Water","Dark"]}]},"dondozo":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Curse","Liquidation","Rest","Sleep Talk"],"teraTypes":["Water"]}]},"veluza":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Aqua Cutter","Aqua Jet","Night Slash","Psycho Cut"],"teraTypes":["Water"]},{"role":"Setup Sweeper","movepool":["Aqua Cutter","Fillet Away","Night Slash","Psycho Cut"],"teraTypes":["Water","Psychic","Dark"]}]},"palafin":{"level":76,"sets":[{"role":"Wallbreaker","movepool":["Bulk Up","Close Combat","Flip Turn","Ice Punch","Jet Punch","Wave Crash"],"teraTypes":["Water","Fighting"]}]},"arboliva":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Dazzling Gleam","Earth Power","Energy Ball","Hyper Voice","Leech Seed","Strength Sap"],"teraTypes":["Grass","Fairy"]},{"role":"Bulky Support","movepool":["Giga Drain","Hyper Voice","Leech Seed","Substitute"],"teraTypes":["Water"]}]},"scovillain":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Flamethrower","Leech Seed","Protect","Substitute"],"teraTypes":["Fire"]}]},"bellibolt":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Muddy Water","Slack Off","Thunder Wave","Thunderbolt","Volt Switch"],"teraTypes":["Electric"]}]},"revavroom":{"level":82,"sets":[{"role":"Tera Blast user","movepool":["Gunk Shot","Iron Head","Shift Gear","Tera Blast"],"teraTypes":["Water","Ground"]},{"role":"Fast Support","movepool":["Gunk Shot","Parting Shot","Spin Out","Toxic","Toxic Spikes"],"teraTypes":["Water"]}]},"orthworm":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Coil","Iron Tail","Rest"],"teraTypes":["Steel","Fighting"]},{"role":"Bulky Support","movepool":["Body Press","Iron Head","Rest","Spikes","Stealth Rock","Shed Tail"],"teraTypes":["Steel"]}]},"maushold":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Bite","Encore","Population Bomb","Tidy Up"],"teraTypes":["Normal"]}]},"mausholdfour":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Bite","Encore","Population Bomb","Tidy Up"],"teraTypes":["Normal"]}]},"cetitan":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Icicle Crash","Liquidation","Snowscape"],"teraTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Belly Drum","Ice Shard","Icicle Crash","Earthquake"],"teraTypes":["Ice"]}]},"baxcalibur":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Ice Shard","Icicle Crash","Glaive Rush"],"teraTypes":["Ice"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Icicle Crash","Glaive Rush"],"teraTypes":["Dragon","Ground"]}]},"tatsugiri":{"level":82,"sets":[{"role":"Tera Blast user","movepool":["Dragon Pulse","Hydro Pump","Nasty Plot","Tera Blast"],"teraTypes":["Fire"]},{"role":"Fast Support","movepool":["Draco Meteor","Hydro Pump","Nasty Plot","Rapid Spin","Surf"],"teraTypes":["Water"]}]},"cyclizar":{"level":80,"sets":[{"role":"Fast Support","movepool":["Draco Meteor","Taunt","Rapid Spin","Shed Tail"],"teraTypes":["Dragon"]},{"role":"Fast Attacker","movepool":["Body Slam","Knock Off","Outrage","Shift Gear","Shed Tail"],"teraTypes":["Normal","Dark","Dragon"]}]},"pawmot":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Double Shock","Ice Punch","Revival Blessing","Volt Switch"],"teraTypes":["Electric"]},{"role":"Fast Support","movepool":["Close Combat","Ice Punch","Nuzzle","Revival Blessing","Thunder Punch"],"teraTypes":["Fighting"]}]},"kilowattrel":{"level":82,"sets":[{"role":"Fast Support","movepool":["Hurricane","Roost","Thunderbolt","Thunder Wave","U-turn"],"teraTypes":["Flying"]}]},"bombirdier":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Brave Bird","Hone Claws","Knock Off","Stone Edge","Sucker Punch","U-turn"],"teraTypes":["Rock"]}]},"squawkabilly":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Facade","Protect","Quick Attack","U-turn"],"teraTypes":["Normal"]}]},"squawkabillywhite":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Double-Edge","Foul Play","Parting Shot","Quick Attack"],"teraTypes":["Flying","Dark","Normal"]}]},"squawkabillyblue":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Facade","Protect","Quick Attack","U-turn"],"teraTypes":["Normal"]}]},"squawkabillyyellow":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Double-Edge","Foul Play","Parting Shot","Quick Attack"],"teraTypes":["Flying","Dark","Normal"]}]},"flamigo":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Brave Bird","Close Combat","Swords Dance","Throat Chop","U-turn"],"teraTypes":["Flying","Fighting"]}]},"klawf":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Crabhammer","High Horsepower","Knock Off","Stealth Rock","Stone Edge","Swords Dance"],"teraTypes":["Water","Ground","Dark","Rock"]}]},"garganacl":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Curse","Body Press","Recover","Stone Edge"],"teraTypes":["Fighting"]},{"role":"Bulky Support","movepool":["Avalanche","Body Press","Recover","Salt Cure","Stealth Rock","Stone Edge"],"teraTypes":["Ghost"]}]},"glimmora":{"level":80,"sets":[{"role":"Fast Support","movepool":["Earth Power","Energy Ball","Mortal Spin","Power Gem","Sludge Wave","Spikes","Stealth Rock","Toxic"],"teraTypes":["Water"]}]},"grafaiai":{"level":86,"sets":[{"role":"AV Pivot","movepool":["Gunk Shot","Knock Off","Super Fang","U-turn"],"teraTypes":["Dark"]},{"role":"Fast Support","movepool":["Encore","Knock Off","Protect","Substitute","Toxic"],"teraTypes":["Dark"]},{"role":"Wallbreaker","movepool":["Gunk Shot","Knock Off","Switcheroo","U-turn"],"teraTypes":["Poison","Dark"]}]},"dachsbun":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Body Press","Play Rough","Protect","Wish"],"teraTypes":["Steel"]}]},"mabosstiff":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Crunch","Fire Fang","Play Rough","Psychic Fangs","Wild Charge"],"teraTypes":["Dark","Fairy"]}]},"brambleghast":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Power Whip","Rapid Spin","Shadow Sneak","Spikes","Strength Sap"],"teraTypes":["Ghost"]},{"role":"Fast Support","movepool":["Leech Seed","Phantom Force","Power Whip","Substitute"],"teraTypes":["Ghost"]}]},"gholdengo":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Make It Rain","Nasty Plot","Recover","Shadow Ball","Trick"],"teraTypes":["Steel","Ghost"]},{"role":"Bulky Attacker","movepool":["Make It Rain","Recover","Shadow Ball","Thunder Wave"],"teraTypes":["Steel"]}]},"greattusk":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Close Combat","Earthquake","Ice Spinner","Rapid Spin"],"teraTypes":["Ground","Fighting"]},{"role":"Bulky Attacker","movepool":["Close Combat","Headlong Rush","Ice Spinner","Knock Off","Rapid Spin","Stealth Rock"],"teraTypes":["Ground","Dark"]}]},"brutebonnet":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Crunch","Seed Bomb","Spore","Sucker Punch"],"teraTypes":["Dark","Fighting"]}]},"sandyshocks":{"level":82,"sets":[{"role":"Fast Support","movepool":["Earth Power","Spikes","Stealth Rock","Thunderbolt","Thunder Wave","Volt Switch"],"teraTypes":["Electric","Ground"]}]},"screamtail":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Encore","Light Screen","Play Rough","Protect","Reflect","Stealth Rock","Thunder Wave","Wish"],"teraTypes":["Fairy","Steel"]}]},"fluttermane":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Moonblast","Mystical Fire","Psyshock","Shadow Ball","Thunderbolt"],"teraTypes":["Ghost","Fairy","Fire","Electric","Psychic"]}]},"slitherwing":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Close Combat","Earthquake","Flare Blitz","Leech Life","Wild Charge","Will-O-Wisp"],"teraTypes":["Fighting","Electric","Fire"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","First Impression","Flare Blitz","U-turn","Wild Charge"],"teraTypes":["Bug","Fighting","Electric"]}]},"roaringmoon":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Crunch","Dragon Dance","Earthquake","Outrage","Roost"],"teraTypes":["Dark","Dragon"]},{"role":"Bulky Attacker","movepool":["Crunch","Iron Head","Outrage","U-turn"],"teraTypes":["Dark","Dragon","Steel"]}]},"irontreads":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Heavy Slam","Knock Off","Rapid Spin","Stealth Rock","Stone Edge","Volt Switch"],"teraTypes":["Ground","Steel"]}]},"ironmoth":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Discharge","Energy Ball","Fiery Dance","Fire Blast","Sludge Wave","U-turn"],"teraTypes":["Fire","Grass"]},{"role":"Fast Support","movepool":["Energy Ball","Fiery Dance","Morning Sun","Sludge Wave","Toxic Spikes","U-turn"],"teraTypes":["Fire"]}]},"ironhands":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Drain Punch","Fake Out","Heavy Slam","Ice Punch","Thunder Punch","Volt Switch","Wild Charge"],"teraTypes":["Electric"]}]},"ironjugulis":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Earth Power","Fire Blast","Hurricane","Hydro Pump","U-turn"],"teraTypes":["Dark","Flying"]}]},"ironthorns":{"level":84,"sets":[{"role":"Fast Support","movepool":["Earthquake","Spikes","Stealth Rock","Stone Edge","Thunder Punch","Volt Switch"],"teraTypes":["Rock","Electric"]},{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Ice Punch","Stone Edge","Wild Charge"],"teraTypes":["Rock","Ground"]}]},"ironbundle":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Encore","Flip Turn","Freeze-Dry","Hydro Pump","Ice Beam","Substitute"],"teraTypes":["Water","Ice"]},{"role":"Tera Blast user","movepool":["Freeze-Dry","Tera Blast","Hydro Pump","Flip Turn"],"teraTypes":["Electric"]}]},"ironvaliant":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Spirit Break","Swords Dance"],"teraTypes":["Dark","Fighting"]},{"role":"Fast Attacker","movepool":["Aura Sphere","Calm Mind","Focus Blast","Moonblast","Psyshock","Shadow Ball"],"teraTypes":["Fighting","Fairy"]}]},"tinglu":{"level":80,"sets":[{"role":"Bulky Support","movepool":["Body Press","Earthquake","Ruination","Spikes","Stealth Rock","Throat Chop"],"teraTypes":["Ground"]}]},"chienpao":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Crunch","Ice Shard","Ice Spinner","Sucker Punch","Sacred Sword","Swords Dance"],"teraTypes":["Dark","Ice"]}]},"wochien":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Energy Ball","Leech Seed","Knock Off","Ruination","Stun Spore"],"teraTypes":["Poison"]}]},"chiyu":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Fire Blast","Nasty Plot","Psychic","Will-O-Wisp"],"teraTypes":["Dark","Fire"]},{"role":"Wallbreaker","movepool":["Dark Pulse","Flamethrower","Overheat","Psychic"],"teraTypes":["Dark","Fire"]}]},"koraidon":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Collision Course","Flare Blitz","Outrage","Swords Dance","U-turn"],"teraTypes":["Fire"]}]},"miraidon":{"level":70,"sets":[{"role":"Fast Bulky Setup","movepool":["Calm Mind","Dragon Pulse","Electro Drift","Substitute"],"teraTypes":["Electric"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Electro Drift","Overheat","Volt Switch"],"teraTypes":["Electric"]}]},"tinkaton":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Gigaton Hammer","Knock Off","Play Rough","Stealth Rock","Thunder Wave"],"teraTypes":["Steel"]}]},"armarouge":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["Armor Cannon","Aura Sphere","Energy Ball","Focus Blast","Psyshock"],"teraTypes":["Fire","Fighting","Psychic","Grass"]}]},"ceruledge":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Bitter Blade","Close Combat","Shadow Sneak","Swords Dance"],"teraTypes":["Fire","Fighting"]}]},"toedscruel":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Earth Power","Giga Drain","Knock Off","Rapid Spin","Spikes","Spore","Toxic","Toxic Spikes"],"teraTypes":["Ground","Water"]}]},"kingambit":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Iron Head","Kowtow Cleave","Stealth Rock","Sucker Punch","Swords Dance"],"teraTypes":["Dark"]}]}};
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
	'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'meditate', 'poweruppunch', 'swordsdance', 'tidyup',
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
	'shellsmash', 'shiftgear', 'swordsdance', 'tailglow', 'tidyup', 'trailblaze', 'workup',
];
// Moves that shouldn't be the only STAB moves:
const NoStab = [
	'accelerock', 'aquajet', 'beakblast', 'bounce', 'breakingswipe', 'chatter', 'chloroblast', 'clearsmog', 'dragontail', 'eruption',
	'explosion', 'fakeout', 'flamecharge', 'flipturn', 'iceshard', 'icywind', 'incinerate', 'machpunch', 'meteorbeam',
	'mortalspin', 'pluck', 'pursuit', 'quickattack', 'rapidspin', 'reversal', 'saltcure', 'selfdestruct', 'shadowsneak',
	'skydrop', 'snarl', 'steelbeam', 'suckerpunch', 'uturn', 'watershuriken', 'vacuumwave', 'voltswitch', 'waterspout',
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
];

function sereneGraceBenefits(move: Move) {
	return move.secondary?.chance && move.secondary.chance >= 20 && move.secondary.chance < 100;
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
			Grass: (movePool, moves, abilities, types, counter, species) => {
				if (movePool.includes('leafstorm')) return true;
				return !counter.get('Grass') &&
					(species.baseStats.atk >= 100 || types.includes('Electric') || abilities.has('Seed Sower'));
			},
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => !counter.get('Ice'),
			Normal: (movePool, moves, abilities, types, counter) => (movePool.includes('boomburst')),
			Poison: (movePool, moves, abilities, types, counter) => {
				if (types.includes('Ground')) return false;
				return !counter.get('Poison');
			},
			Psychic: (movePool, moves, abilities, types, counter) => {
				if (counter.get('Psychic')) return false;
				if (movePool.includes('calmmind') || movePool.includes('psychicfangs') || movePool.includes('psychocut')) return true;
				return abilities.has('Psychic Surge') || types.includes('Fire');
			},
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock') && species.baseStats.atk >= 80,
			Steel: (movePool, moves, abilities, types, counter, species) => {
				if (species.baseStats.atk < 95) return false;
				return !counter.get('Steel');
			},
			Water: (movePool, moves, abilities, types, counter, species) => {
				if (species.id === 'quagsire') return false;
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
		types: string[],
		teraType: string,
		abilities: Set<string> = new Set(),
	): MoveCounter {
		// This is primarily a helper function for random setbuilder functions.
		const counter = new MoveCounter();

		if (!moves?.size) return counter;

		const categories = {Physical: 0, Special: 0, Status: 0};

		// Iterate through all moves we've chosen so far and keep track of what they do:
		for (const moveid of moves) {
			const move = this.dex.moves.get(moveid);

			let moveType = move.type;
			if (['judgment', 'revelationdance'].includes(moveid)) moveType = types[0];
			if (moveType === 'Normal') {
				if (abilities.has('Aerilate')) moveType = 'Flying';
				if (abilities.has('Galvanize')) moveType = 'Electric';
				if (abilities.has('Pixilate')) moveType = 'Fairy';
				if (abilities.has('Refrigerate')) moveType = 'Ice';
			}
			if (moveid === 'terablast') moveType = teraType;
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
			// Moves which have a base power, but aren't super-weak:
			if (move.basePower > 30 || move.multihit || move.basePowerCallback) {
				if (!this.noStab.includes(moveid)) {
					counter.add(moveType);
					if (types.includes(moveType)) counter.stabCounter++;
					if (teraType === moveType) counter.add('stabtera');
				}
				if (move.flags['bite']) counter.add('strongjaw');
				if (move.flags['punch']) counter.ironFist++;
				if (move.flags['sound']) counter.add('sound');
				if (move.priority !== 0 || (moveid === 'grassyglide' && abilities.has('Grassy Surge'))) {
					counter.add('priority');
				}
				counter.damagingMoves.add(move);
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
		const magnezoneMoves = ['bodypress', 'mirrorcoat', 'steelbeam'];

		// Team-based move culls
		if (teamDetails.stealthRock) {
			if (movePool.includes('stealthrock')) this.fastPop(movePool, movePool.indexOf('stealthrock'));
		}
		if (moves.size + movePool.length <= this.maxMoveCount) return;
		if (teamDetails.defog || teamDetails.rapidSpin) {
			if (movePool.includes('defog')) this.fastPop(movePool, movePool.indexOf('defog'));
			if (movePool.includes('rapidspin')) this.fastPop(movePool, movePool.indexOf('rapidspin'));
		}
		if (teamDetails.stickyWeb) {
			if (movePool.includes('stickyweb')) this.fastPop(movePool, movePool.indexOf('stickyweb'));
		}

		// These moves don't mesh well with other aspects of the set
		if (species.id !== "spidops") {
			this.incompatibleMoves(moves, movePool, statusMoves, ['healingwish', 'memento', 'switcheroo', 'trick']);
		}
		if (species.id !== "scyther" && species.id !== "scizor") {
			this.incompatibleMoves(moves, movePool, Setup, pivotingMoves);
		}
		this.incompatibleMoves(moves, movePool, Setup, Hazards);
		this.incompatibleMoves(moves, movePool, Setup, ['defog', 'nuzzle', 'toxic', 'waterspout', 'yawn']);
		this.incompatibleMoves(moves, movePool, PhysicalSetup, PhysicalSetup);
		this.incompatibleMoves(moves, movePool, SpecialSetup, 'thunderwave');
		this.incompatibleMoves(moves, movePool, 'substitute', pivotingMoves);
		this.incompatibleMoves(moves, movePool, SpeedSetup, ['aquajet', 'rest', 'trickroom']);
		this.incompatibleMoves(moves, movePool, 'curse', 'rapidspin');
		this.incompatibleMoves(moves, movePool, 'dragondance', 'dracometeor');


		// These attacks are redundant with each other
		this.incompatibleMoves(moves, movePool, 'psychic', 'psyshock');
		this.incompatibleMoves(moves, movePool, 'surf', 'hydropump');
		this.incompatibleMoves(moves, movePool, 'wavecrash', 'liquidation');
		this.incompatibleMoves(moves, movePool, ['airslash', 'bravebird', 'hurricane'], ['airslash', 'bravebird', 'hurricane']);
		this.incompatibleMoves(moves, movePool, 'knockoff', 'foulplay');
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
		this.incompatibleMoves(moves, movePool, 'toxic', 'willowisp');
		this.incompatibleMoves(moves, movePool, ['thunderwave', 'toxic', 'willowisp'], 'toxicspikes');

		// This space reserved for assorted hardcodes that otherwise make little sense out of context
		// Landorus
		this.incompatibleMoves(moves, movePool, 'nastyplot', 'rockslide');
		// Persian and Seviper
		this.incompatibleMoves(moves, movePool, 'switcheroo', ['fakeout', 'suckerpunch']);
		// Beartic
		this.incompatibleMoves(moves, movePool, 'snowscape', 'swordsdance');
		// Cryogonal
		if (!teamDetails.defog && !teamDetails.rapidSpin && species.id === 'cryogonal') {
			this.fastPop(movePool, movePool.indexOf('haze'));
		}
		// Magnezone
		this.incompatibleMoves(moves, movePool, magnezoneMoves, magnezoneMoves);
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
		const counter = this.queryMoves(moves, species.types, teraType, abilities);
		this.cullMovePool(types, moves, abilities, counter, movePool, teamDetails, species, isLead, isDoubles, teraType, role);
		return counter;
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
		let counter = this.queryMoves(moves, species.types, teraType, abilities);
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

		// Add other moves you really want to have, e.g. STAB, recovery, setup, depending on role.

		// Enforce STAB
		for (const type of types) {
			// Check if a STAB move of that type should be required
			if (runEnforcementChecker(type)) {
				const stabMoves = [];
				for (const moveid of movePool) {
					const move = this.dex.moves.get(moveid);
					let moveType = move.type;
					if (['judgment', 'revelationdance'].includes(moveid)) moveType = types[0];
					if (moveType === 'Normal') {
						if (abilities.has('Aerilate')) moveType = 'Flying';
						if (abilities.has('Galvanize')) moveType = 'Electric';
						if (abilities.has('Pixilate')) moveType = 'Fairy';
						if (abilities.has('Refrigerate')) moveType = 'Ice';
					}
					if (moveid === 'terablast') moveType = teraType;
					if (!this.noStab.includes(moveid) && (move.basePower > 30 || move.multihit || move.basePowerCallback)) {
						if (type === moveType) {
							stabMoves.push(moveid);
						}
					}
				}
				if (stabMoves.length) {
					const moveid = this.sample(stabMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
			}
		}

		// If no STAB move was added in the previous step, add a STAB move
		if (!counter.stabCounter) {
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				let moveType = move.type;
				if (['judgment', 'revelationdance'].includes(moveid)) moveType = types[0];
				if (moveType === 'Normal') {
					if (abilities.has('Aerilate')) moveType = 'Flying';
					if (abilities.has('Galvanize')) moveType = 'Electric';
					if (abilities.has('Pixilate')) moveType = 'Fairy';
					if (abilities.has('Refrigerate')) moveType = 'Ice';
				}
				if (moveid === 'terablast') moveType = teraType;
				if (!this.noStab.includes(moveid) && (move.basePower > 30 || move.multihit || move.basePowerCallback)) {
					if (types.includes(moveType)) {
						stabMoves.push(moveid);
					}
				}
			}
			if (stabMoves.length) {
				const moveid = this.sample(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

		// Enforce Tera STAB
		if (!counter.get('stabtera') && role !== "Bulky Support") {
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				let moveType = move.type;
				if (['judgment', 'revelationdance'].includes(moveid)) moveType = types[0];
				if (!this.noStab.includes(moveid) && (move.basePower > 30 || move.multihit || move.basePowerCallback)) {
					if (teraType === moveType) {
						stabMoves.push(moveid);
					}
				}
			}
			if (stabMoves.length) {
				const moveid = this.sample(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, teraType, role);
			}
		}

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

		// Enforce Toxic on Grafaiai
		if (movePool.includes('toxic') && species.id === 'grafaiai') {
			counter = this.addMove('toxic', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, teraType, role);
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
				let currentAttackType: string;
				for (const moveid of moves) {
					const move = this.dex.moves.get(moveid);
					if (move.basePower > 30 || move.multihit || move.basePowerCallback) {
						let moveType = move.type;
						if (['judgment', 'revelationdance'].includes(moveid)) moveType = types[0];
						if (moveType === 'Normal') {
							if (abilities.has('Aerilate')) moveType = 'Flying';
							if (abilities.has('Galvanize')) moveType = 'Electric';
							if (abilities.has('Pixilate')) moveType = 'Fairy';
							if (abilities.has('Refrigerate')) moveType = 'Ice';
						}
						if (moveid === 'terablast') moveType = teraType;
						currentAttackType = move.type;
					}
				}
				// Choose an attacking move that is of different type to the current single attack
				const coverageMoves = [];
				for (const moveid of movePool) {
					const move = this.dex.moves.get(moveid);
					let moveType = move.type;
					if (['judgment', 'revelationdance'].includes(moveid)) moveType = types[0];
					if (moveType === 'Normal') {
						if (abilities.has('Aerilate')) moveType = 'Flying';
						if (abilities.has('Galvanize')) moveType = 'Electric';
						if (abilities.has('Pixilate')) moveType = 'Fairy';
						if (abilities.has('Refrigerate')) moveType = 'Ice';
					}
					if (!this.noStab.includes(moveid) && (move.basePower > 30 || move.multihit || move.basePowerCallback)) {
						if (currentAttackType! !== moveType) coverageMoves.push(moveid);
					}
				}
				if (coverageMoves.length) {
					const moveid = this.sample(coverageMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, teraType, role);
				}
			}
		}

		// Enforce STAB priority
		if (role === 'Bulky Attacker' || role === 'Bulky Setup') {
			const priorityMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				let moveType = move.type;
				if (moveType === 'Normal') {
					if (abilities.has('Aerilate')) moveType = 'Flying';
					if (abilities.has('Galvanize')) moveType = 'Electric';
					if (abilities.has('Pixilate')) moveType = 'Fairy';
					if (abilities.has('Refrigerate')) moveType = 'Ice';
				}
				if (types.includes(moveType) && move.priority > 0 && move.category !== 'Status') {
					priorityMoves.push(moveid);
				}
			}
			if (priorityMoves.length) {
				const moveid = this.sample(priorityMoves);
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
			'Battle Bond', 'Flare Boost', 'Gluttony', 'Hydration', 'Ice Body', 'Immunity',
			'Own Tempo', 'Quick Feet', 'Rain Dish', 'Snow Cloak', 'Steadfast', 'Steam Engine',
		].includes(ability)) return true;

		switch (ability) {
		// Abilities which are primarily useful for certain moves
		case 'Contrary': case 'Serene Grace': case 'Skill Link': case 'Strong Jaw':
			return !counter.get(toID(ability));
		case 'Chlorophyll':
			if (abilities.has('Harvest')) return true;
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
			return (species.id !== 'houndoom' && this.dex.getEffectiveness('Fire', species) < 0);
		case 'Guts':
			return (!moves.has('facade') && !moves.has('sleeptalk'));
		case 'Harvest':
			return (!moves.has('substitute'));
		case 'Hustle': case 'Inner Focus':
			return (counter.get('Physical') < 2);
		case 'Infiltrator':
			return (moves.has('rest') && moves.has('sleeptalk')) || (isDoubles && abilities.has('Clear Body'));
		case 'Insomnia':
			return (role === 'Wallbreaker');
		case 'Intimidate':
			if (abilities.has('Hustle')) return true;
			if (abilities.has('Sheer Force') && !!counter.get('sheerforce')) return true;
			return (abilities.has('Stakeout') || moves.has('substitute'));
		case 'Iron Fist':
			return !counter.ironFist;
		case 'Justified':
			return !counter.get('Physical');
		case 'Mold Breaker':
			return (abilities.has('Sharpness') || abilities.has('Unburden'));
		case 'Moxie':
			return (!counter.get('Physical') || moves.has('stealthrock'));
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Prankster':
			return !counter.get('Status');
		case 'Pressure':
			return (!!counter.get('setup') || counter.get('Status') < 2 || isDoubles);
		case 'Reckless':
			return !counter.get('recoil');
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Sand Force': case 'Sand Veil':
			return !teamDetails.sand;
		case 'Sand Rush':
			return !teamDetails.sand;
		case 'Sap Sipper':
			return species.id === 'wyrdeer';
		case 'Seed Sower':
			return role === 'Bulky Support';
		case 'Shed Skin':
			return species.id === 'seviper';
		case 'Sheer Force':
			if (species.id === 'braviaryhisui' && role === 'Wallbreaker') return true;
			return (!counter.get('sheerforce') || ['Guts', 'Sharpness', 'Slush Rush'].some(m => abilities.has(m)));
		case 'Slush Rush':
			return !teamDetails.snow;
		case 'Solar Power':
			return (!teamDetails.sun);
		case 'Stakeout':
			return (counter.damagingMoves.size < 1);
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
		if (species.id === 'enamorus' && moves.has('calmmind')) return 'Cute Charm';
		if (abilities.has('Corrosion') && moves.has('toxic') && this.randomChance(1, 2)) return 'Corrosion';
		if (abilities.has('Guts') && (moves.has('facade') || moves.has('sleeptalk'))) return 'Guts';
		if (abilities.has('Serene Grace') && moves.has('headbutt')) return 'Serene Grace';
		if (abilities.has('Technician') && counter.get('technician')) return 'Technician';
		if (abilities.has('Own Tempo') && moves.has('petaldance')) return 'Own Tempo';
		if (abilities.has('Slush Rush') && moves.has('snowscape')) return 'Slush Rush';

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
		if (moves.has('shellsmash')) return 'White Herb';
		if (moves.has('populationbomb')) return 'Wide Lens';
		if (moves.has('stuffcheeks')) return 'Salac Berry';
		if (ability === 'Unburden') return moves.has('closecombat') ? 'White Herb' : 'Sitrus Berry';
		if (moves.has('acrobatics')) return ability === 'Grassy Surge' ? 'Grassy Seed' : '';
		if (moves.has('auroraveil') || moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (
			moves.has('rest') && !moves.has('sleeptalk') &&
			ability !== 'Natural Cure' && ability !== 'Shed Skin'
		) {
			return 'Chesto Berry';
		}
		if (species.id === 'scyther') return isLead ? 'Eviolite' : 'Heavy-Duty Boots';
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
			counter.get('Physical') >= 4 &&
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
		if (counter.get('Physical') === 3 && moves.has('shedtail')) return 'Choice Scarf';
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
		if (counter.damagingMoves.size >= 4 && role !== 'Fast Attacker' && role !== 'Wallbreaker') return 'Assault Vest';
		if (counter.get('speedsetup') && this.dex.getEffectiveness('Ground', species) < 1) return 'Weakness Policy';
		if (species.id === 'urshifurapidstrike') return 'Punching Glove';
		if (species.id === 'lokix' && role === 'Wallbreaker') return 'Life Orb';
		if (species.id === 'toxtricity' && moves.has('shiftgear')) return 'Throat Spray';
		if (moves.has('substitute') || ability === 'Moody') return 'Leftovers';
		if (
			!teamDetails.defog && !teamDetails.rapidSpin &&
			this.dex.getEffectiveness('Rock', species) >= 1
		) return 'Heavy-Duty Boots';
		if (
			role === 'Fast Support' &&
			['defog', 'rapidspin', 'uturn', 'voltswitch'].some(m => moves.has(m)) &&
			!types.includes('Flying') && ability !== 'Levitate'
		) return 'Heavy-Duty Boots';

		// Low Priority
		if (moves.has('outrage')) return 'Lum Berry';
		if (
			(species.id === 'garchomp' && role === 'Fast Support') ||
			(ability === 'Regenerator' && types.includes('Water') && species.baseStats.def >= 110 && this.randomChance(1, 3))
		) return 'Rocky Helmet';
		if (
			role === 'Fast Support' && isLead &&
			!counter.get('recovery') && !counter.get('recoil') &&
			(species.baseStats.hp + species.baseStats.def + species.baseStats.spd) < 300
		) return 'Focus Sash';
		if (
			role !== 'Fast Attacker' && role !== 'Tera Blast user' &&
			this.dex.getEffectiveness('Ground', species) >= 2
		) return 'Air Balloon';
		if (['Bulky Attacker', 'Bulky Support', 'Bulky Setup'].some(m => role === (m))) return 'Leftovers';
		if (role === 'Fast Support' || role === 'Fast Bulky Setup') {
			return (counter.damagingMoves.size >= 3) ? 'Life Orb' : 'Leftovers';
		}
		if (
			['flamecharge', 'rapidspin', 'trailblaze'].every(m => !moves.has(m)) &&
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
		const counter = this.queryMoves(moves, species.types, teraType, abilities);

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

		// For Trick / Switcheroo
		if (item === 'Leftovers' && types.includes('Poison') && teraType === 'Poison') {
			item = 'Black Sludge';
		}
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
		return {
			name: species.baseSpecies,
			species: forme,
			gender: species.gender,
			shiny: this.randomChance(1, 1024),
			level,
			moves: Array.from(moves),
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
				const species = this.dex.species.get(pokemon);
				if (species.gen > this.gen || exclude.includes(species.id)) continue;
				if (isMonotype) {
					if (!species.types.includes(type)) continue;
				}
				pokemonPool.push(pokemon);
				if (!baseSpeciesPool.includes(species.baseSpecies)) baseSpeciesPool.push(species.baseSpecies);
			}
		} else {
			for (const pokemon of Object.keys(this.randomSets)) {
				const species = this.dex.species.get(pokemon);
				if (species.gen > this.gen || exclude.includes(species.id)) continue;
				if (isMonotype) {
					if (!species.types.includes(type)) continue;
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

		const tierCount: {[k: string]: number} = {};
		const typeCount: {[k: string]: number} = {};
		const typeComboCount: {[k: string]: number} = {};
		const typeWeaknesses: {[k: string]: number} = {};
		const teamDetails: RandomTeamsTypes.TeamDetails = {};
		const [pokemonPool, baseSpeciesPool] = this.getPokemonPool(type, pokemon, isMonotype, isDoubles);
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

			// If Zoroark is in the team, the sixth slot should not be a Pokemon with extremely low level
			if (
				pokemon.some(pkmn => pkmn.name === 'Zoroark') &&
				pokemon.length >= (this.maxTeamSize - 1) &&
				this.getLevel(species, isDoubles) < 72 &&
				!this.adjustLevel
			) {
				continue;
			}

			// Pokemon with Last Respects, Intrepid Sword, and Dauntless Shield shouldn't be leading
			if (['Basculegion', 'Houndstone', 'Zacian', 'Zamazenta'].includes(species.baseSpecies) && !pokemon.length) continue;

			const tier = species.tier;
			const types = species.types;
			const typeCombo = types.slice().sort().join();
			// Dynamically scale limits for different team sizes. The default and minimum value is 1.
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

			// Limit one Pokemon per tier, two for Monotype
			// Disable this for now, since it is still a new gen
			// Unless you want to have a lot of Ubers!
			// if (
			// 	(tierCount[tier] >= (this.forceMonotype || isMonotype ? 2 : 1) * limitFactor) &&
			// 	!this.randomChance(1, Math.pow(5, tierCount[tier]))
			// ) {
			// 	continue;
			// }

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

			const set = this.randomSet(species, teamDetails, pokemon.length === 0, isDoubles);

			// Okay, the set passes, add it to our team
			pokemon.push(set);
			if (pokemon.length === this.maxTeamSize) {
				// Set Zoroark's level to be the same as the last Pokemon
				const illusion = teamDetails.illusion;
				if (illusion) pokemon[illusion - 1].level = pokemon[this.maxTeamSize - 1].level;

				// Don't bother tracking details for the last Pokemon
				break;
			}

			// Now that our Pokemon has passed all checks, we can increment our counters
			baseFormes[species.baseSpecies] = 1;

			// Increment tier counter
			if (tierCount[tier]) {
				tierCount[tier]++;
			} else {
				tierCount[tier] = 1;
			}

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
			if (set.ability === 'Drought' || set.moves.includes('sunnyday')) teamDetails.sun = 1;
			if (set.ability === 'Sand Stream') teamDetails.sand = 1;
			if (set.ability === 'Snow Warning' || set.moves.includes('snowscape') || set.moves.includes('chillyreception')) {
				teamDetails.snow = 1;
			}
			if (set.moves.includes('spikes')) teamDetails.spikes = (teamDetails.spikes || 0) + 1;
			if (set.moves.includes('stealthrock')) teamDetails.stealthRock = 1;
			if (set.moves.includes('stickyweb')) teamDetails.stickyWeb = 1;
			if (set.moves.includes('toxicspikes')) teamDetails.toxicSpikes = 1;
			if (set.moves.includes('defog')) teamDetails.defog = 1;
			if (set.moves.includes('rapidspin')) teamDetails.rapidSpin = 1;
			if (set.moves.includes('mortalspin')) teamDetails.rapidSpin = 1;
			if (set.moves.includes('tidyup')) teamDetails.rapidSpin = 1;
			if (set.moves.includes('auroraveil') || (set.moves.includes('reflect') && set.moves.includes('lightscreen'))) {
				teamDetails.screens = 1;
			}
			if (set.role === 'Tera Blast user') teamDetails.teraBlast = 1;

			// For setting Zoroark's level
			if (set.ability === 'Illusion') teamDetails.illusion = pokemon.length;
		}
		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) { // large teams sometimes cannot be built
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}

		return pokemon;
	}

	randomCAP1v1Sets: AnyObject = {};

	randomCAP1v1Team() {
		this.enforceNoDirectCustomBanlistChanges();

		const pokemon = [];
		const pokemonPool = Object.keys(this.randomCAP1v1Sets);

		while (pokemonPool.length && pokemon.length < this.maxTeamSize) {
			const species = this.dex.species.get(this.sampleNoReplace(pokemonPool));
			if (!species.exists) throw new Error(`Invalid Pokemon "${species}" in ${this.format}`);
			if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			const setData: AnyObject = this.sample(this.randomCAP1v1Sets[species.name]);
			const set = {
				name: species.baseSpecies,
				species: species.name,
				gender: species.gender,
				item: this.sampleIfArray(setData.item) || '',
				ability: (this.sampleIfArray(setData.ability)),
				shiny: this.randomChance(1, 1024),
				level: this.adjustLevel || 100,
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, ...setData.evs},
				nature: setData.nature,
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...setData.ivs || {}},
				moves: setData.moves.map((move: any) => this.sampleIfArray(move)),
			};
			if (this.adjustLevel) set.level = this.adjustLevel;
			pokemon.push(set);
		}
		return pokemon;
	}

	randomFactorySets: {[format: string]: {[species: string]: BattleFactorySpecies}} =
		{};

	randomFactorySet(
		species: Species, teamData: RandomTeamsTypes.FactoryTeamDetails, tier: string
	): RandomTeamsTypes.RandomFactorySet | null {
		const id = toID(species.name);
		const setList = this.randomFactorySets[tier][id].sets;

		const itemsMax: {[k: string]: number} = {
			choicespecs: 1,
			choiceband: 1,
			choicescarf: 1,
		};
		const movesMax: {[k: string]: number} = {
			rapidspin: 1,
			batonpass: 1,
			stealthrock: 1,
			defog: 1,
			spikes: 1,
			toxicspikes: 1,
		};
		const requiredMoves: {[k: string]: string} = {
			stealthrock: 'hazardSet',
			rapidspin: 'hazardClear',
			defog: 'hazardClear',
		};
		const weatherAbilities = ['drizzle', 'drought', 'snowwarning', 'sandstream'];

		// Build a pool of eligible sets, given the team partners
		// Also keep track of sets with moves the team requires
		let effectivePool: {set: AnyObject, moveVariants?: number[]}[] = [];
		const priorityPool = [];
		for (const curSet of setList) {
			// if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			const item = this.dex.items.get(curSet.item);
			if (itemsMax[item.id] && teamData.has[item.id] >= itemsMax[item.id]) continue;

			const ability = this.dex.abilities.get(curSet.ability);
			if (teamData.weather && weatherAbilities.includes(ability.id)) continue; // reject 2+ weather setters

			let reject = false;
			let hasRequiredMove = false;
			const curSetVariants = [];
			for (const move of curSet.moves) {
				const variantIndex = this.random(move.length);
				const moveId = toID(move[variantIndex]);
				if (movesMax[moveId] && teamData.has[moveId] >= movesMax[moveId]) {
					reject = true;
					break;
				}
				if (requiredMoves[moveId] && !teamData.has[requiredMoves[moveId]]) {
					hasRequiredMove = true;
				}
				curSetVariants.push(variantIndex);
			}
			if (reject) continue;
			effectivePool.push({set: curSet, moveVariants: curSetVariants});
			if (hasRequiredMove) priorityPool.push({set: curSet, moveVariants: curSetVariants});
		}
		if (priorityPool.length) effectivePool = priorityPool;

		if (!effectivePool.length) {
			if (!teamData.forceResult) return null;
			for (const curSet of setList) {
				effectivePool.push({set: curSet});
			}
		}

		const setData = this.sample(effectivePool);
		const moves = [];
		for (const [i, moveSlot] of setData.set.moves.entries()) {
			moves.push(setData.moveVariants ? moveSlot[setData.moveVariants[i]] : this.sample(moveSlot));
		}


		const item = this.sampleIfArray(setData.set.item);
		const ability = this.sampleIfArray(setData.set.ability);
		const nature = this.sampleIfArray(setData.set.nature);
		const level = this.adjustLevel || setData.set.level || (tier === "LC" ? 5 : 100);

		return {
			name: setData.set.name || species.baseSpecies,
			species: setData.set.species,
			gender: setData.set.gender || species.gender || (this.randomChance(1, 2) ? 'M' : 'F'),
			item: item || '',
			ability: ability || species.abilities['0'],
			shiny: typeof setData.set.shiny === 'undefined' ? this.randomChance(1, 1024) : setData.set.shiny,
			level,
			happiness: typeof setData.set.happiness === 'undefined' ? 255 : setData.set.happiness,
			evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, ...setData.set.evs},
			ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...setData.set.ivs},
			nature: nature || 'Serious',
			moves,
		};
	}

	randomFactoryTeam(side: PlayerOptions, depth = 0): RandomTeamsTypes.RandomFactorySet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const forceResult = (depth >= 12);
		// Leaving Monotype code in comments in case it's used in the future
		// const isMonotype = !!this.forceMonotype || this.dex.formats.getRuleTable(this.format).has('sametypeclause');

		// The teams generated depend on the tier choice in such a way that
		// no exploitable information is leaked from rolling the tier in getTeam(p1).
		if (!this.factoryTier) {
		//	this.factoryTier = isMonotype ? 'Mono' : this.sample(['Uber', 'OU', 'UU', 'RU', 'NU', 'PU', 'LC']);
			this.factoryTier = this.sample(['Uber', 'OU', 'UU', 'RU', 'NU', 'PU', 'LC']);
		}
		/*
		} else if (isMonotype && this.factoryTier !== 'Mono') {
			// I don't think this can ever happen?
			throw new Error(`Can't generate a Monotype Battle Factory set in a battle with factory tier ${this.factoryTier}`);
		}
		*/

		const tierValues: {[k: string]: number} = {
			Uber: 5,
			OU: 4, UUBL: 4,
			UU: 3, RUBL: 3,
			RU: 2, NUBL: 2,
			NU: 1, PUBL: 1,
			PU: 0,
		};

		const pokemon = [];
		const pokemonPool = Object.keys(this.randomFactorySets[this.factoryTier]);

		// const typePool = this.dex.types.names();
		// const type = this.sample(typePool);

		const teamData: TeamData = {
			typeCount: {}, typeComboCount: {}, baseFormes: {},
			has: {}, forceResult: forceResult, weaknesses: {}, resistances: {},
		};
		const requiredMoveFamilies = ['hazardSet', 'hazardClear'];
		const requiredMoves: {[k: string]: string} = {
			stealthrock: 'hazardSet',
			rapidspin: 'hazardClear',
			defog: 'hazardClear',
		};
		const weatherAbilitiesSet: {[k: string]: string} = {
			drizzle: 'raindance',
			drought: 'sunnyday',
			snowwarning: 'hail',
			sandstream: 'sandstorm',
		};
		const resistanceAbilities: {[k: string]: string[]} = {
			dryskin: ['Water'], waterabsorb: ['Water'], stormdrain: ['Water'],
			flashfire: ['Fire'], heatproof: ['Fire'],
			lightningrod: ['Electric'], motordrive: ['Electric'], voltabsorb: ['Electric'],
			sapsipper: ['Grass'],
			thickfat: ['Ice', 'Fire'],
			levitate: ['Ground'],
		};

		while (pokemonPool.length && pokemon.length < this.maxTeamSize) {
			const species = this.dex.species.get(this.sampleNoReplace(pokemonPool));
			if (!species.exists) continue;

			// Lessen the need of deleting sets of Pokemon after tier shifts
			if (
				this.factoryTier in tierValues && species.tier in tierValues &&
				tierValues[species.tier] > tierValues[this.factoryTier]
			) continue;

			// const speciesFlags = this.randomFactorySets[this.factoryTier][species.id].flags;

			// Limit to one of each species (Species Clause)
			if (teamData.baseFormes[species.baseSpecies]) continue;

			const set = this.randomFactorySet(species, teamData, this.factoryTier);
			if (!set) continue;

			const itemData = this.dex.items.get(set.item);

			const types = species.types;
			// Dynamically scale limits for different team sizes. The default and minimum value is 1.
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;
			/*
			// Enforce Monotype
			if (isMonotype) {
				// Prevents Mega Evolutions from breaking the type limits
				if (itemData.megaStone) {
					const megaSpecies = this.dex.species.get(itemData.megaStone);
					if (types.length > megaSpecies.types.length) types = [species.types[0]];
					// Only check the second type because a Mega Evolution should always share the first type with its base forme.
					if (megaSpecies.types[1] && types[1] && megaSpecies.types[1] !== types[1]) {
						types = [megaSpecies.types[0]];
					}
				}
				if (!types.includes(type)) continue;
			} else
			*/
			{
				// If not Monotype, limit to two of each type
				let skip = false;
				for (const typeName of types) {
					if (teamData.typeCount[typeName] >= 2 * limitFactor && this.randomChance(4, 5)) {
						skip = true;
						break;
					}
				}
				if (skip) continue;

				// Limit 1 of any type combination
				let typeCombo = types.slice().sort().join();
				if (set.ability + '' === 'Drought' || set.ability + '' === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
					typeCombo = set.ability + '';
				}
				if (teamData.typeComboCount[typeCombo] >= 1 * limitFactor) continue;
			}

			// Okay, the set passes, add it to our team
			pokemon.push(set);
			const typeCombo = types.slice().sort().join();
			// Now that our Pokemon has passed all checks, we can update team data:
			for (const typeName of types) {
				if (typeName in teamData.typeCount) {
					teamData.typeCount[typeName]++;
				} else {
					teamData.typeCount[typeName] = 1;
				}
			}
			teamData.typeComboCount[typeCombo] = (teamData.typeComboCount[typeCombo] + 1) || 1;

			teamData.baseFormes[species.baseSpecies] = 1;

			if (itemData.id in teamData.has) {
				teamData.has[itemData.id]++;
			} else {
				teamData.has[itemData.id] = 1;
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
				if (moveId in requiredMoves) {
					teamData.has[requiredMoves[moveId]] = 1;
				}
			}

			for (const typeName of this.dex.types.names()) {
				// Cover any major weakness (3+) with at least one resistance
				if (teamData.resistances[typeName] >= 1) continue;
				if (resistanceAbilities[abilityState.id]?.includes(typeName) || !this.dex.getImmunity(typeName, types)) {
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
		if (pokemon.length < this.maxTeamSize) return this.randomFactoryTeam(side, ++depth);

		// Quality control
		if (!teamData.forceResult) {
			for (const requiredFamily of requiredMoveFamilies) {
				if (!teamData.has[requiredFamily]) return this.randomFactoryTeam(side, ++depth);
			}
			for (const typeName in teamData.weaknesses) {
				if (teamData.weaknesses[typeName] >= 3) return this.randomFactoryTeam(side, ++depth);
			}
		}

		return pokemon;
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

		const requiredMoves: {[k: string]: number} = {};

		// Build a pool of eligible sets, given the team partners
		// Also keep track of sets with moves the team requires
		let effectivePool: {set: AnyObject, moveVariants?: number[], itemVariants?: number, abilityVariants?: number}[] = [];
		const priorityPool = [];
		for (const curSet of setList) {
			let reject = false;
			let hasRequiredMove = false;
			const curSetMoveVariants = [];
			for (const move of curSet.moves) {
				const variantIndex = this.random(move.length);
				const moveId = toID(move[variantIndex]);
				if (movesMax[moveId] && teamData.has[moveId] >= movesMax[moveId]) {
					reject = true;
					break;
				}
				if (requiredMoves[moveId] && !teamData.has[requiredMoves[moveId]]) {
					hasRequiredMove = true;
				}
				curSetMoveVariants.push(variantIndex);
			}
			if (reject) continue;
			const set = {set: curSet, moveVariants: curSetMoveVariants};
			effectivePool.push(set);
			if (hasRequiredMove) priorityPool.push(set);
		}
		if (priorityPool.length) effectivePool = priorityPool;

		if (!effectivePool.length) {
			if (!teamData.forceResult) return null;
			for (const curSet of setList) {
				effectivePool.push({set: curSet});
			}
		}

		const setData = this.sample(effectivePool);
		const moves = [];
		for (const [i, moveSlot] of setData.set.moves.entries()) {
			moves.push(setData.moveVariants ? moveSlot[setData.moveVariants[i]] : this.sample(moveSlot));
		}

		const setDataAbility = this.sampleIfArray(setData.set.ability);
		return {
			name: setData.set.nickname || setData.set.name || species.baseSpecies,
			species: setData.set.species,
			gigantamax: setData.set.gigantamax,
			gender: setData.set.gender || species.gender || (this.randomChance(1, 2) ? 'M' : 'F'),
			item: this.sampleIfArray(setData.set.item) || '',
			ability: setDataAbility || species.abilities['0'],
			shiny: typeof setData.set.shiny === 'undefined' ? this.randomChance(1, 1024) : setData.set.shiny,
			level: setData.set.level || 50,
			happiness: typeof setData.set.happiness === 'undefined' ? 255 : setData.set.happiness,
			evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, ...setData.set.evs},
			ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...setData.set.ivs},
			nature: setData.set.nature || 'Serious',
			moves,
		};
	}

	randomBSSFactoryTeam(side: PlayerOptions, depth = 0): RandomTeamsTypes.RandomFactorySet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const forceResult = (depth >= 4);

		const pokemon = [];

		const pokemonPool = Object.keys(this.randomBSSFactorySets);

		const teamData: TeamData = {
			typeCount: {}, typeComboCount: {}, baseFormes: {}, has: {}, forceResult: forceResult,
			weaknesses: {}, resistances: {},
		};
		const requiredMoveFamilies: string[] = [];
		const requiredMoves: {[k: string]: string} = {};
		const weatherAbilitiesSet: {[k: string]: string} = {
			drizzle: 'raindance',
			drought: 'sunnyday',
			snowwarning: 'hail',
			sandstream: 'sandstorm',
		};
		const resistanceAbilities: {[k: string]: string[]} = {
			waterabsorb: ['Water'],
			flashfire: ['Fire'],
			lightningrod: ['Electric'], voltabsorb: ['Electric'],
			thickfat: ['Ice', 'Fire'],
			levitate: ['Ground'],
		};

		while (pokemonPool.length && pokemon.length < this.maxTeamSize) {
			// Weighted random sampling
			let maxUsage = 0;
			const sets: {[k: string]: number} = {};
			for (const specie of pokemonPool) {
				if (teamData.baseFormes[this.dex.species.get(specie).baseSpecies]) continue; // Species Clause
				const usage: number = this.randomBSSFactorySets[specie].usage;
				sets[specie] = usage + maxUsage;
				maxUsage += usage;
			}

			const usage = this.random(1, maxUsage);
			let last = 0;
			let specie;
			for (const key of Object.keys(sets)) {
				 if (usage > last && usage <= sets[key]) {
					 specie = key;
					 break;
				 }
				 last = sets[key];
			}

			const species = this.dex.species.get(specie);
			if (!species.exists) continue;
			if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			// Limit to one of each species (Species Clause)
			if (teamData.baseFormes[species.baseSpecies]) continue;

			// Limit 2 of any type (most of the time)
			const types = species.types;
			let skip = false;
			for (const type of types) {
				if (teamData.typeCount[type] > 1 && this.randomChance(4, 5)) {
					skip = true;
					break;
				}
			}
			if (skip) continue;

			const set = this.randomBSSFactorySet(species, teamData);
			if (!set) continue;

			// Limit 1 of any type combination
			let typeCombo = types.slice().sort().join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}
			if (typeCombo in teamData.typeComboCount) continue;

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
			teamData.typeComboCount[typeCombo] = 1;

			teamData.baseFormes[species.baseSpecies] = 1;

			teamData.has[itemData.id] = 1;

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
				if (moveId in requiredMoves) {
					teamData.has[requiredMoves[moveId]] = 1;
				}
			}

			for (const typeName of this.dex.types.names()) {
				// Cover any major weakness (3+) with at least one resistance
				if (teamData.resistances[typeName] >= 1) continue;
				if (resistanceAbilities[abilityState.id]?.includes(typeName) || !this.dex.getImmunity(typeName, types)) {
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
		if (pokemon.length < this.maxTeamSize) return this.randomBSSFactoryTeam(side, ++depth);

		// Quality control
		if (!teamData.forceResult) {
			for (const requiredFamily of requiredMoveFamilies) {
				if (!teamData.has[requiredFamily]) return this.randomBSSFactoryTeam(side, ++depth);
			}
			for (const type in teamData.weaknesses) {
				if (teamData.weaknesses[type] >= 3) return this.randomBSSFactoryTeam(side, ++depth);
			}
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
				if (formes.includes(species.id) || !learnset) {
					learnset = this.dex.species.getLearnset(this.dex.species.get(species.baseSpecies).id);
				}
				if (learnset) {
					pool = Object.keys(learnset).filter(
						moveid => learnset![moveid].find(learned => learned.startsWith(String(this.gen)))
					);
				}
				if (species.changesFrom) {
					learnset = this.dex.species.getLearnset(toID(species.changesFrom));
					const basePool = Object.keys(learnset!).filter(
						moveid => learnset![moveid].find(learned => learned.startsWith(String(this.gen)))
					);
					pool = [...new Set(pool.concat(basePool))];
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
