import {MoveCounter, RandomTeams, TeamData} from './gen9';
import {
	AnyObject,
	Format,
	ModdedDex,
	PRNG,
	PRNGSeed,
	PlayerOptions,
	RandomTeamsTypes,
	Species,
	StatsTable,
	toID,
} from '@pkmn/sim';

/* eslint-disable */
const randomSetsJSON = {"venusaur":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Giga Drain","Leech Seed","Sleep Powder","Sludge Bomb","Substitute"],"abilities":["Chlorophyll","Overgrow"]},{"role":"Bulky Attacker","movepool":["Earth Power","Energy Ball","Knock Off","Sleep Powder","Sludge Bomb","Synthesis"],"abilities":["Chlorophyll","Overgrow"]}]},"venusaurgmax":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Giga Drain","Leech Seed","Sleep Powder","Sludge Bomb","Substitute"],"abilities":["Chlorophyll","Overgrow"]},{"role":"Bulky Attacker","movepool":["Earth Power","Energy Ball","Knock Off","Sleep Powder","Sludge Bomb","Synthesis"],"abilities":["Chlorophyll","Overgrow"]}]},"charizard":{"level":83,"sets":[{"role":"Dynamax User","movepool":["Air Slash","Fire Blast","Focus Blast","Roost","Scorching Sands"],"abilities":["Solar Power"]},{"role":"Bulky Attacker","movepool":["Air Slash","Defog","Fire Blast","Roost","Will-O-Wisp"],"abilities":["Solar Power"]}]},"blastoise":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Hydro Pump","Ice Beam","Shell Smash"],"abilities":["Torrent"]}]},"blastoisegmax":{"level":81,"sets":[{"role":"Bulky Support","movepool":["Ice Beam","Protect","Rapid Spin","Scald","Toxic"],"abilities":["Torrent"]}]},"butterfreegmax":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Bug Buzz","Hurricane","Quiver Dance","Sleep Powder"],"abilities":["Compound Eyes"]},{"role":"Setup Sweeper","movepool":["Air Slash","Bug Buzz","Hurricane","Quiver Dance","Roost","Sleep Powder"],"abilities":["Tinted Lens"]}]},"pikachu":{"level":92,"sets":[{"role":"AV Pivot","movepool":["Extreme Speed","Knock Off","Play Rough","Surf","Volt Switch","Volt Tackle"],"abilities":["Lightning Rod"],"preferredTypes":["Water"]}]},"raichu":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Nasty Plot","Surf","Thunderbolt","Volt Switch"],"abilities":["Lightning Rod"],"preferredTypes":["Water"]}]},"raichualola":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Nasty Plot","Psyshock","Surf","Thunderbolt","Volt Switch"],"abilities":["Surge Surfer"]}]},"sandslash":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Knock Off","Rapid Spin","Spikes","Stealth Rock","Stone Edge","Swords Dance","Toxic"],"abilities":["Sand Rush"]}]},"sandslashalola":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Ice Shard","Knock Off","Rapid Spin","Swords Dance","Triple Axel"],"abilities":["Slush Rush"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["Earthquake","Knock Off","Rapid Spin","Spikes","Stealth Rock","Triple Axel"],"abilities":["Slush Rush"]}]},"nidoqueen":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Ice Beam","Sludge Wave","Stealth Rock","Toxic Spikes"],"abilities":["Sheer Force"],"preferredTypes":["Ice"]}]},"nidoking":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Earth Power","Fire Blast","Ice Beam","Sludge Wave","Substitute","Throat Chop"],"abilities":["Sheer Force"],"preferredTypes":["Ice"]}]},"clefable":{"level":81,"sets":[{"role":"Bulky Support","movepool":["Fire Blast","Knock Off","Moonblast","Soft-Boiled","Stealth Rock","Teleport","Thunder Wave"],"abilities":["Magic Guard","Unaware"]},{"role":"Bulky Setup","movepool":["Calm Mind","Fire Blast","Moonblast","Soft-Boiled"],"abilities":["Magic Guard","Unaware"]}]},"ninetales":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Fire Blast","Nasty Plot","Scorching Sands","Solar Beam","Will-O-Wisp"],"abilities":["Drought"],"preferredTypes":["Grass"]}]},"ninetalesalola":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["Aurora Veil","Blizzard","Moonblast","Nasty Plot"],"abilities":["Snow Warning"]},{"role":"Fast Support","movepool":["Aurora Veil","Blizzard","Freeze-Dry","Moonblast"],"abilities":["Snow Warning"]}]},"wigglytuff":{"level":95,"sets":[{"role":"Bulky Support","movepool":["Dazzling Gleam","Fire Blast","Heal Bell","Knock Off","Protect","Stealth Rock","Thunder Wave","Wish"],"abilities":["Competitive"]}]},"vileplume":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Aromatherapy","Giga Drain","Leech Seed","Sleep Powder","Sludge Bomb","Strength Sap"],"abilities":["Effect Spore"]}]},"dugtrio":{"level":81,"sets":[{"role":"Fast Support","movepool":["Earthquake","Hone Claws","Stealth Rock","Stone Edge","Sucker Punch"],"abilities":["Arena Trap"]},{"role":"Wallbreaker","movepool":["Double-Edge","Earthquake","Stone Edge","Sucker Punch"],"abilities":["Arena Trap"]}]},"dugtrioalola":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Iron Head","Stealth Rock","Stone Edge","Sucker Punch","Toxic"],"abilities":["Tangling Hair"]}]},"persian":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["Double-Edge","Knock Off","Switcheroo","U-turn"],"abilities":["Limber"]},{"role":"Fast Attacker","movepool":["Double-Edge","Fake Out","Knock Off","U-turn"],"abilities":["Technician"]}]},"persianalola":{"level":83,"sets":[{"role":"Bulky Setup","movepool":["Burning Jealousy","Dark Pulse","Hypnosis","Nasty Plot","Substitute","Thunderbolt"],"abilities":["Fur Coat"],"preferredTypes":["Electric"]}]},"golduck":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Encore","Focus Blast","Ice Beam","Scald","Substitute"],"abilities":["Swift Swim"],"preferredTypes":["Ice"]},{"role":"Wallbreaker","movepool":["Flip Turn","Hydro Pump","Ice Beam","Scald"],"abilities":["Swift Swim"]}]},"arcanine":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Extreme Speed","Flare Blitz","Morning Sun","Teleport","Toxic","Will-O-Wisp"],"abilities":["Intimidate"]}]},"poliwrath":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Darkest Lariat","Liquidation","Rain Dance"],"abilities":["Swift Swim"]},{"role":"Bulky Setup","movepool":["Bulk Up","Darkest Lariat","Drain Punch","Liquidation"],"abilities":["Swift Swim","Water Absorb"]}]},"alakazam":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Counter","Focus Blast","Psychic","Psyshock","Shadow Ball"],"abilities":["Magic Guard"]},{"role":"Setup Sweeper","movepool":["Focus Blast","Nasty Plot","Psychic","Psyshock","Shadow Ball"],"abilities":["Magic Guard"]}]},"machamp":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Bulk Up","Bullet Punch","Dynamic Punch","Knock Off","Stone Edge"],"abilities":["No Guard"]},{"role":"AV Pivot","movepool":["Bullet Punch","Dynamic Punch","Knock Off","Stone Edge"],"abilities":["No Guard"]},{"role":"Wallbreaker","movepool":["Bullet Punch","Close Combat","Facade","Knock Off"],"abilities":["Guts"]}]},"tentacruel":{"level":81,"sets":[{"role":"Bulky Support","movepool":["Haze","Knock Off","Rapid Spin","Scald","Sludge Bomb","Toxic Spikes"],"abilities":["Clear Body"]}]},"rapidash":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["Flare Blitz","High Horsepower","Morning Sun","Swords Dance","Wild Charge"],"abilities":["Flash Fire"]}]},"rapidashgalar":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["High Horsepower","Play Rough","Swords Dance","Zen Headbutt"],"abilities":["Pastel Veil"]},{"role":"Fast Attacker","movepool":["High Horsepower","Morning Sun","Play Rough","Swords Dance"],"abilities":["Pastel Veil"]}]},"slowbro":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Psyshock","Scald","Slack Off","Teleport","Thunder Wave","Toxic"],"abilities":["Regenerator"]},{"role":"Fast Support","movepool":["Future Sight","Scald","Slack Off","Teleport"],"abilities":["Regenerator"]},{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Scald","Slack Off"],"abilities":["Regenerator"]}]},"slowbrogalar":{"level":88,"sets":[{"role":"AV Pivot","movepool":["Earthquake","Fire Blast","Foul Play","Psychic","Scald","Shell Side Arm"],"abilities":["Regenerator"]},{"role":"Wallbreaker","movepool":["Fire Blast","Psychic","Shell Side Arm","Trick Room"],"abilities":["Regenerator"]},{"role":"Bulky Attacker","movepool":["Earthquake","Fire Blast","Psychic","Scald","Shell Side Arm","Slack Off","Thunder Wave"],"abilities":["Regenerator"]}]},"farfetchd":{"level":91,"sets":[{"role":"Dynamax User","movepool":["Brave Bird","Close Combat","Knock Off","Leaf Blade","Swords Dance"],"abilities":["Defiant"]}]},"cloyster":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["Hydro Pump","Icicle Spear","Rock Blast","Shell Smash"],"abilities":["Skill Link"]}]},"gengargmax":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Shadow Ball","Sludge Wave","Trick","Will-O-Wisp"],"abilities":["Cursed Body"]},{"role":"Setup Sweeper","movepool":["Focus Blast","Nasty Plot","Shadow Ball","Sludge Wave","Substitute","Will-O-Wisp"],"abilities":["Cursed Body"]}]},"kingler":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["Agility","Knock Off","Liquidation","Rock Slide","Superpower","X-Scissor"],"abilities":["Sheer Force"]}]},"exeggutor":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Giga Drain","Leech Seed","Psychic","Sludge Bomb","Substitute"],"abilities":["Harvest"],"preferredTypes":["Psychic"]},{"role":"Bulky Support","movepool":["Leech Seed","Protect","Psychic","Sleep Powder","Substitute"],"abilities":["Harvest"]}]},"exeggutoralola":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Flamethrower","Knock Off","Moonlight","Sleep Powder","Stun Spore","Wood Hammer"],"abilities":["Harvest"],"preferredTypes":["Fire"]},{"role":"Wallbreaker","movepool":["Draco Meteor","Flamethrower","Giga Drain","Leaf Storm"],"abilities":["Frisk"]}]},"marowak":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Double-Edge","Earthquake","Knock Off","Stealth Rock","Stone Edge","Swords Dance"],"abilities":["Battle Armor","Rock Head"],"preferredTypes":["Rock"]}]},"marowakalola":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Flame Charge","Flare Blitz","Poltergeist","Stealth Rock","Stone Edge","Will-O-Wisp"],"abilities":["Rock Head"]}]},"hitmonlee":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["High Jump Kick","Knock Off","Mach Punch","Poison Jab","Stone Edge"],"abilities":["Reckless"]},{"role":"Setup Sweeper","movepool":["Close Combat","Curse","Knock Off","Poison Jab","Stone Edge"],"abilities":["Unburden"]}]},"hitmonchan":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Ice Punch","Mach Punch","Throat Chop"],"abilities":["Iron Fist"]},{"role":"Bulky Support","movepool":["Bulk Up","Drain Punch","Rapid Spin","Throat Chop"],"abilities":["Iron Fist"]}]},"weezing":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Fire Blast","Pain Split","Sludge Bomb","Toxic Spikes","Will-O-Wisp"],"abilities":["Levitate"]}]},"weezinggalar":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Defog","Fire Blast","Pain Split","Sludge Bomb","Strange Steam","Will-O-Wisp"],"abilities":["Levitate"]}]},"rhydon":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Megahorn","Stealth Rock","Stone Edge","Swords Dance","Toxic"],"abilities":["Lightning Rod"]}]},"chansey":{"level":85,"sets":[{"role":"Staller","movepool":["Aromatherapy","Seismic Toss","Soft-Boiled","Stealth Rock","Thunder Wave","Toxic","Wish"],"abilities":["Natural Cure"]}]},"kangaskhan":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Double-Edge","Drain Punch","Earthquake","Fake Out","Sucker Punch"],"abilities":["Scrappy"]},{"role":"AV Pivot","movepool":["Double-Edge","Drain Punch","Earthquake","Fake Out","Sucker Punch"],"abilities":["Scrappy"]}]},"seaking":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["Drill Run","Knock Off","Megahorn","Swords Dance","Waterfall"],"abilities":["Swift Swim"]},{"role":"Wallbreaker","movepool":["Drill Run","Flip Turn","Knock Off","Megahorn","Waterfall"],"abilities":["Lightning Rod"]}]},"starmie":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Hydro Pump","Ice Beam","Psyshock","Recover","Thunderbolt"],"abilities":["Analytic"]},{"role":"Fast Support","movepool":["Psyshock","Rapid Spin","Recover","Scald"],"abilities":["Natural Cure"]},{"role":"Fast Support","movepool":["Rapid Spin","Recover","Scald","Toxic"],"abilities":["Natural Cure"]}]},"mrmime":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Dazzling Gleam","Focus Blast","Healing Wish","Mystical Fire","Psychic","Psyshock","Trick"],"abilities":["Filter"]},{"role":"Setup Sweeper","movepool":["Dazzling Gleam","Focus Blast","Mystical Fire","Nasty Plot","Psychic","Psyshock","Substitute"],"abilities":["Filter"]}]},"mrmimegalar":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Focus Blast","Freeze-Dry","Nasty Plot","Psychic","Rapid Spin"],"abilities":["Screen Cleaner"]}]},"scyther":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["Brick Break","Bug Bite","Dual Wingbeat","Knock Off","Roost","Swords Dance"],"abilities":["Technician"]},{"role":"Fast Support","movepool":["Defog","Dual Wingbeat","Roost","U-turn"],"abilities":["Technician"]}]},"jynx":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Ice Beam","Lovely Kiss","Nasty Plot","Psyshock","Trick"],"abilities":["Dry Skin"]},{"role":"Wallbreaker","movepool":["Focus Blast","Ice Beam","Lovely Kiss","Nasty Plot","Psyshock","Trick"],"abilities":["Dry Skin"]}]},"pinsir":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Knock Off","Stealth Rock","Stone Edge","Swords Dance","X-Scissor"],"abilities":["Moxie"]}]},"tauros":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Body Slam","Close Combat","Throat Chop","Zen Headbutt"],"abilities":["Sheer Force"]},{"role":"Fast Attacker","movepool":["Body Slam","Close Combat","Earthquake","Throat Chop"],"abilities":["Sheer Force"]}]},"gyarados":{"level":74,"sets":[{"role":"Dynamax User","movepool":["Bounce","Dragon Dance","Earthquake","Power Whip","Waterfall"],"abilities":["Moxie"]}]},"laprasgmax":{"level":84,"sets":[{"role":"Staller","movepool":["Freeze-Dry","Protect","Sparkling Aria","Toxic"],"abilities":["Water Absorb"]},{"role":"Bulky Attacker","movepool":["Freeze-Dry","Heal Bell","Sparkling Aria","Toxic"],"abilities":["Water Absorb"]}]},"ditto":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["Transform"],"abilities":["Imposter"]}]},"vaporeon":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Flip Turn","Protect","Scald","Toxic","Wish"],"abilities":["Water Absorb"]},{"role":"Bulky Support","movepool":["Heal Bell","Ice Beam","Protect","Scald","Wish"],"abilities":["Water Absorb"]}]},"jolteon":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Hyper Voice","Shadow Ball","Thunderbolt","Volt Switch"],"abilities":["Volt Absorb"]}]},"flareon":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Facade","Flame Charge","Flare Blitz","Quick Attack","Superpower"],"abilities":["Guts"],"preferredTypes":["Fighting"]}]},"omastar":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Ancient Power","Earth Power","Hydro Pump","Ice Beam","Shell Smash"],"abilities":["Swift Swim"],"preferredTypes":["Ice"]},{"role":"Bulky Setup","movepool":["Hydro Pump","Ice Beam","Meteor Beam","Shell Smash"],"abilities":["Swift Swim"]}]},"kabutops":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Aqua Jet","Knock Off","Liquidation","Stone Edge","Swords Dance"],"abilities":["Swift Swim"]},{"role":"Fast Support","movepool":["Aqua Jet","Flip Turn","Knock Off","Liquidation","Rapid Spin","Stone Edge","Swords Dance"],"abilities":["Swift Swim"]}]},"aerodactyl":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Aqua Tail","Dual Wingbeat","Earthquake","Hone Claws","Stone Edge"],"abilities":["Unnerve"],"preferredTypes":["Ground"]}]},"snorlax":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Curse","Rest","Sleep Talk"],"abilities":["Thick Fat"]},{"role":"Wallbreaker","movepool":["Darkest Lariat","Double-Edge","Earthquake","Facade"],"abilities":["Thick Fat"]},{"role":"Bulky Attacker","movepool":["Darkest Lariat","Double-Edge","Earthquake","Heat Crash"],"abilities":["Thick Fat"]}]},"snorlaxgmax":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Curse","Darkest Lariat","Rest"],"abilities":["Thick Fat"]},{"role":"Bulky Attacker","movepool":["Body Slam","Curse","Earthquake","Rest"],"abilities":["Thick Fat"]}]},"articuno":{"level":85,"sets":[{"role":"Staller","movepool":["Defog","Freeze-Dry","Roost","Substitute","Toxic","U-turn"],"abilities":["Pressure"]},{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Freeze-Dry","Roost","Substitute","Toxic","U-turn"],"abilities":["Pressure"]}]},"articunogalar":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Freezing Glare","Hurricane","Recover"],"abilities":["Competitive"]}]},"zapdos":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Discharge","Heat Wave","Hurricane","Roost","Toxic","U-turn"],"abilities":["Static"]}]},"zapdosgalar":{"level":73,"sets":[{"role":"Dynamax User","movepool":["Brave Bird","Bulk Up","Close Combat","Stomping Tantrum","Throat Chop"],"abilities":["Defiant"]},{"role":"Fast Attacker","movepool":["Brave Bird","Close Combat","Stomping Tantrum","Throat Chop","U-turn"],"abilities":["Defiant"]}]},"moltres":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Fire Blast","Roost","Scorching Sands","Toxic","U-turn","Will-O-Wisp"],"abilities":["Flame Body"]}]},"moltresgalar":{"level":73,"sets":[{"role":"Bulky Setup","movepool":["Fiery Wrath","Hurricane","Nasty Plot","Rest"],"abilities":["Berserk"]}]},"dragonite":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Dual Wingbeat","Earthquake","Outrage","Roost"],"abilities":["Multiscale"]}]},"mewtwo":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["Aura Sphere","Fire Blast","Nasty Plot","Psystrike","Recover"],"abilities":["Unnerve"]}]},"mew":{"level":79,"sets":[{"role":"Dynamax User","movepool":["Brave Bird","Close Combat","Psychic Fangs","Swords Dance"],"abilities":["Synchronize"]},{"role":"Setup Sweeper","movepool":["Close Combat","Dragon Dance","Knock Off","Leech Life","Psychic Fangs"],"abilities":["Synchronize"],"preferredTypes":["Fighting"]},{"role":"Staller","movepool":["Defog","Knock Off","Psychic","Roost","Spikes","Stealth Rock","Taunt","Toxic Spikes","U-turn","Will-O-Wisp"],"abilities":["Synchronize"]}]},"noctowl":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Hurricane","Hyper Voice","Nasty Plot","Roost"],"abilities":["Tinted Lens"]}]},"crobat":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Roost","Super Fang","Taunt","Toxic","U-turn"],"abilities":["Infiltrator"]}]},"lanturn":{"level":86,"sets":[{"role":"Fast Support","movepool":["Scald","Thunder Wave","Thunderbolt","Toxic","Volt Switch"],"abilities":["Volt Absorb"]},{"role":"Bulky Attacker","movepool":["Heal Bell","Ice Beam","Scald","Thunder Wave","Thunderbolt","Toxic"],"abilities":["Volt Absorb"]},{"role":"Bulky Support","movepool":["Heal Bell","Scald","Thunder Wave","Thunderbolt","Toxic","Volt Switch"],"abilities":["Volt Absorb"]}]},"xatu":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["Air Slash","Calm Mind","Heat Wave","Psychic","Roost"],"abilities":["Magic Bounce"]},{"role":"Bulky Support","movepool":["Heat Wave","Psychic","Roost","Teleport","Thunder Wave","Toxic"],"abilities":["Magic Bounce"]}]},"bellossom":{"level":83,"sets":[{"role":"Bulky Setup","movepool":["Giga Drain","Moonblast","Quiver Dance","Sleep Powder","Sludge Bomb","Strength Sap"],"abilities":["Chlorophyll"]}]},"azumarill":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Aqua Jet","Belly Drum","Knock Off","Liquidation","Play Rough","Superpower"],"abilities":["Huge Power"]}]},"sudowoodo":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Head Smash","Stealth Rock","Sucker Punch","Wood Hammer"],"abilities":["Rock Head"],"preferredTypes":["Grass"]}]},"politoed":{"level":87,"sets":[{"role":"Staller","movepool":["Encore","Ice Beam","Protect","Scald","Toxic"],"abilities":["Drizzle"]},{"role":"Bulky Support","movepool":["Encore","Ice Beam","Scald","Toxic"],"abilities":["Drizzle"]},{"role":"Fast Attacker","movepool":["Focus Blast","Hydro Pump","Ice Beam","Scald"],"abilities":["Drizzle"]}]},"quagsire":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Ice Beam","Recover","Scald","Toxic"],"abilities":["Unaware"]}]},"espeon":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Dazzling Gleam","Morning Sun","Psychic","Psyshock","Shadow Ball","Trick"],"abilities":["Magic Bounce"],"preferredTypes":["Fairy"]}]},"umbreon":{"level":81,"sets":[{"role":"Staller","movepool":["Foul Play","Protect","Toxic","Wish"],"abilities":["Synchronize"]}]},"slowking":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Psyshock","Scald","Slack Off","Teleport","Thunder Wave","Toxic"],"abilities":["Regenerator"]},{"role":"Fast Support","movepool":["Future Sight","Scald","Slack Off","Teleport"],"abilities":["Regenerator"]}]},"slowkinggalar":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Fire Blast","Psyshock","Scald","Slack Off","Sludge Bomb","Thunder Wave"],"abilities":["Regenerator"]},{"role":"AV Pivot","movepool":["Fire Blast","Psyshock","Scald","Sludge Bomb"],"abilities":["Regenerator"]}]},"wobbuffet":{"level":99,"sets":[{"role":"Bulky Support","movepool":["Counter","Destiny Bond","Encore","Mirror Coat"],"abilities":["Shadow Tag"]}]},"dunsparce":{"level":91,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Coil","Earthquake","Roost"],"abilities":["Serene Grace"]}]},"steelix":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Dragon Dance","Earthquake","Head Smash","Heavy Slam"],"abilities":["Rock Head"]},{"role":"Bulky Attacker","movepool":["Earthquake","Heavy Slam","Roar","Stealth Rock","Toxic"],"abilities":["Sturdy"]},{"role":"Bulky Setup","movepool":["Body Press","Heavy Slam","Iron Defense","Rest","Rock Polish"],"abilities":["Sturdy"]}]},"qwilfish":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Destiny Bond","Poison Jab","Spikes","Taunt","Thunder Wave","Toxic Spikes","Waterfall"],"abilities":["Intimidate"]}]},"scizor":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["Bug Bite","Bullet Punch","Dual Wingbeat","Knock Off","Roost","Superpower","Swords Dance"],"abilities":["Technician"]},{"role":"Wallbreaker","movepool":["Bullet Punch","Knock Off","Superpower","U-turn"],"abilities":["Technician"]},{"role":"Bulky Support","movepool":["Bullet Punch","Defog","Knock Off","Roost","Superpower","U-turn"],"abilities":["Technician"]}]},"shuckle":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Stealth Rock","Sticky Web","Toxic"],"abilities":["Sturdy"]}]},"heracross":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Facade","Knock Off","Megahorn"],"abilities":["Guts"]},{"role":"Setup Sweeper","movepool":["Close Combat","Facade","Knock Off","Swords Dance"],"abilities":["Guts"]},{"role":"Fast Attacker","movepool":["Close Combat","Knock Off","Megahorn","Stone Edge"],"abilities":["Moxie"]}]},"corsola":{"level":97,"sets":[{"role":"Bulky Support","movepool":["Power Gem","Recover","Scald","Stealth Rock","Toxic"],"abilities":["Regenerator"]}]},"corsolagalar":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Haze","Night Shade","Stealth Rock","Strength Sap","Will-O-Wisp"],"abilities":["Cursed Body"]}]},"octillery":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Energy Ball","Fire Blast","Gunk Shot","Hydro Pump","Ice Beam","Thunder Wave"],"abilities":["Sniper"],"preferredTypes":["Poison"]},{"role":"Bulky Attacker","movepool":["Energy Ball","Fire Blast","Gunk Shot","Ice Beam","Scald","Thunder Wave"],"abilities":["Sniper"],"preferredTypes":["Poison"]}]},"delibird":{"level":100,"sets":[{"role":"Fast Support","movepool":["Brave Bird","Freeze-Dry","Rapid Spin","Spikes"],"abilities":["Insomnia","Vital Spirit"]},{"role":"Dynamax User","movepool":["Brave Bird","Brick Break","Drill Run","Ice Punch","Ice Shard"],"abilities":["Hustle"]}]},"mantine":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Hurricane","Roost","Scald","Toxic"],"abilities":["Water Absorb"]}]},"skarmory":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Roost","Spikes","Stealth Rock","Whirlwind"],"abilities":["Sturdy"]},{"role":"Bulky Support","movepool":["Body Press","Brave Bird","Iron Defense","Roost","Spikes","Stealth Rock","Toxic"],"abilities":["Sturdy"]}]},"kingdra":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Draco Meteor","Flip Turn","Hurricane","Hydro Pump","Rain Dance"],"abilities":["Swift Swim"]},{"role":"Setup Sweeper","movepool":["Dragon Dance","Iron Head","Liquidation","Outrage"],"abilities":["Swift Swim"]}]},"porygon2":{"level":82,"sets":[{"role":"Bulky Support","movepool":["Discharge","Ice Beam","Recover","Toxic","Tri Attack"],"abilities":["Download","Trace"]},{"role":"Bulky Attacker","movepool":["Recover","Shadow Ball","Teleport","Tri Attack"],"abilities":["Download","Trace"]}]},"hitmontop":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Close Combat","Rapid Spin","Triple Axel"],"abilities":["Technician"]},{"role":"Bulky Support","movepool":["Close Combat","Earthquake","Rapid Spin","Stone Edge","Sucker Punch","Toxic"],"abilities":["Intimidate"]}]},"miltank":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Body Slam","Curse","Earthquake","Heal Bell","Milk Drink","Stealth Rock","Toxic"],"abilities":["Sap Sipper","Thick Fat"]}]},"blissey":{"level":85,"sets":[{"role":"Staller","movepool":["Aromatherapy","Seismic Toss","Soft-Boiled","Stealth Rock","Thunder Wave","Toxic"],"abilities":["Natural Cure"]},{"role":"Fast Support","movepool":["Seismic Toss","Soft-Boiled","Teleport","Toxic"],"abilities":["Natural Cure"]}]},"raikou":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Scald","Substitute","Thunderbolt"],"abilities":["Inner Focus"]},{"role":"Bulky Attacker","movepool":["Calm Mind","Scald","Shadow Ball","Thunderbolt","Volt Switch"],"abilities":["Inner Focus"]}]},"entei":{"level":77,"sets":[{"role":"Wallbreaker","movepool":["Extreme Speed","Flare Blitz","Sacred Fire","Stone Edge"],"abilities":["Inner Focus"]},{"role":"Fast Attacker","movepool":["Extreme Speed","Flare Blitz","Sacred Fire","Stomping Tantrum"],"abilities":["Inner Focus"]}]},"suicune":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Rest","Scald","Sleep Talk"],"abilities":["Pressure"]},{"role":"Setup Sweeper","movepool":["Calm Mind","Protect","Scald","Substitute"],"abilities":["Pressure"]},{"role":"Bulky Attacker","movepool":["Air Slash","Calm Mind","Ice Beam","Scald"],"abilities":["Pressure"]}]},"tyranitar":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Crunch","Dragon Dance","Earthquake","Fire Punch","Ice Punch","Stone Edge"],"abilities":["Sand Stream"]},{"role":"Bulky Attacker","movepool":["Crunch","Earthquake","Stealth Rock","Stone Edge","Thunder Wave","Toxic"],"abilities":["Sand Stream"]}]},"lugia":{"level":73,"sets":[{"role":"Staller","movepool":["Air Slash","Defog","Earthquake","Roost","Substitute","Toxic"],"abilities":["Multiscale"]}]},"hooh":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Earthquake","Roost","Sacred Fire","Toxic"],"abilities":["Regenerator"]}]},"celebi":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Earth Power","Giga Drain","Leaf Storm","Nasty Plot","Psychic","U-turn"],"abilities":["Natural Cure"]},{"role":"Bulky Support","movepool":["Leaf Storm","Psychic","Recover","Stealth Rock","Thunder Wave","U-turn"],"abilities":["Natural Cure"]},{"role":"Bulky Setup","movepool":["Leaf Storm","Nasty Plot","Psychic","Recover"],"abilities":["Natural Cure"]}]},"sceptile":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Focus Blast","Giga Drain","Leaf Storm","Rock Slide"],"abilities":["Overgrow"]},{"role":"Fast Support","movepool":["Focus Blast","Giga Drain","Leech Seed","Substitute"],"abilities":["Overgrow"]}]},"blaziken":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Flare Blitz","Knock Off","Protect","Stone Edge","Swords Dance"],"abilities":["Speed Boost"]}]},"swampert":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Flip Turn","Ice Beam","Scald","Stealth Rock","Toxic"],"abilities":["Torrent"]},{"role":"Staller","movepool":["Earthquake","Protect","Scald","Toxic"],"abilities":["Torrent"]}]},"linoone":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Belly Drum","Extreme Speed","Stomping Tantrum","Throat Chop"],"abilities":["Gluttony"]}]},"ludicolo":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["Giga Drain","Hydro Pump","Ice Beam","Rain Dance"],"abilities":["Swift Swim"]},{"role":"Wallbreaker","movepool":["Hydro Pump","Ice Beam","Leaf Storm","Scald"],"abilities":["Swift Swim"]}]},"shiftry":{"level":87,"sets":[{"role":"Dynamax User","movepool":["Dark Pulse","Heat Wave","Leaf Storm","Nasty Plot"],"abilities":["Chlorophyll"]},{"role":"Setup Sweeper","movepool":["Knock Off","Leaf Blade","Sucker Punch","Swords Dance"],"abilities":["Chlorophyll"]},{"role":"Fast Support","movepool":["Defog","Heat Wave","Knock Off","Leaf Storm","Sucker Punch"],"abilities":["Chlorophyll"]}]},"pelipper":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Hurricane","Knock Off","Roost","Scald","U-turn"],"abilities":["Drizzle"]},{"role":"Wallbreaker","movepool":["Hurricane","Hydro Pump","Scald","U-turn"],"abilities":["Drizzle"]}]},"gardevoir":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Healing Wish","Moonblast","Mystical Fire","Psyshock","Trick"],"abilities":["Trace"]},{"role":"Setup Sweeper","movepool":["Calm Mind","Focus Blast","Moonblast","Mystical Fire","Psyshock","Substitute"],"abilities":["Trace"]}]},"ninjask":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["Dual Wingbeat","Leech Life","Swords Dance","U-turn"],"abilities":["Infiltrator"]},{"role":"Setup Sweeper","movepool":["Dual Wingbeat","Leech Life","Substitute","Swords Dance"],"abilities":["Infiltrator"]}]},"shedinja":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["Poltergeist","Shadow Sneak","Swords Dance","Will-O-Wisp","X-Scissor"],"abilities":["Wonder Guard"]}]},"exploud":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Fire Blast","Focus Blast","Surf"],"abilities":["Scrappy"]}]},"sableye":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Recover","Taunt","Toxic","Will-O-Wisp"],"abilities":["Prankster"]}]},"mawile":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["Iron Head","Knock Off","Play Rough","Stealth Rock","Sucker Punch","Swords Dance"],"abilities":["Intimidate","Sheer Force"]}]},"aggron":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Earthquake","Head Smash","Heavy Slam","Stealth Rock"],"abilities":["Rock Head"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Body Press","Head Smash","Heavy Slam","Rock Polish"],"abilities":["Rock Head"]}]},"manectric":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Flamethrower","Overheat","Switcheroo","Thunderbolt","Volt Switch"],"abilities":["Lightning Rod"]}]},"sharpedo":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Hydro Pump","Protect"],"abilities":["Speed Boost"]},{"role":"Wallbreaker","movepool":["Close Combat","Crunch","Liquidation","Protect"],"abilities":["Speed Boost"]}]},"wailord":{"level":92,"sets":[{"role":"Fast Attacker","movepool":["Hydro Pump","Ice Beam","Scald","Water Spout"],"abilities":["Water Veil"]},{"role":"Staller","movepool":["Ice Beam","Protect","Scald","Toxic"],"abilities":["Water Veil"]}]},"torkoal":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Lava Plume","Rapid Spin","Solar Beam","Stealth Rock","Yawn"],"abilities":["Drought"],"preferredTypes":["Grass"]},{"role":"Wallbreaker","movepool":["Earthquake","Fire Blast","Lava Plume","Rapid Spin","Solar Beam","Stealth Rock","Yawn"],"abilities":["Drought"],"preferredTypes":["Grass"]}]},"flygon":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Dragon Dance","Earthquake","Outrage","Stone Edge","U-turn"],"abilities":["Levitate"]},{"role":"Bulky Attacker","movepool":["Defog","Dragon Dance","Earthquake","Outrage","Roost"],"abilities":["Levitate"]}]},"altaria":{"level":92,"sets":[{"role":"Bulky Support","movepool":["Defog","Draco Meteor","Earthquake","Fire Blast","Roost","Toxic"],"abilities":["Natural Cure"]},{"role":"Bulky Setup","movepool":["Dragon Dance","Dual Wingbeat","Earthquake","Roost"],"abilities":["Natural Cure"]}]},"lunatone":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Nasty Plot","Power Gem","Psychic","Stealth Rock"],"abilities":["Levitate"],"preferredTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["Earth Power","Meteor Beam","Moonlight","Psychic","Rock Polish"],"abilities":["Levitate"],"preferredTypes":["Ground"]}]},"solrock":{"level":91,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Morning Sun","Stealth Rock","Stone Edge","Will-O-Wisp"],"abilities":["Levitate"]}]},"whiscash":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Earthquake","Liquidation","Stone Edge"],"abilities":["Oblivious"]},{"role":"Staller","movepool":["Earthquake","Protect","Scald","Toxic"],"abilities":["Oblivious"]}]},"crawdaunt":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Crabhammer","Dragon Dance","Knock Off"],"abilities":["Adaptability"]}]},"claydol":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Ice Beam","Psychic","Rapid Spin","Stealth Rock","Toxic"],"abilities":["Levitate"]}]},"cradily":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Power Whip","Recover","Stone Edge","Swords Dance"],"abilities":["Storm Drain"]},{"role":"Bulky Support","movepool":["Earth Power","Giga Drain","Recover","Stealth Rock","Stone Edge","Toxic"],"abilities":["Storm Drain"]}]},"armaldo":{"level":89,"sets":[{"role":"Dynamax User","movepool":["Earthquake","Knock Off","Liquidation","Stone Edge","Swords Dance","X-Scissor"],"abilities":["Swift Swim"],"preferredTypes":["Water"]},{"role":"Bulky Support","movepool":["Earthquake","Knock Off","Rapid Spin","Stealth Rock","Stone Edge","Swords Dance","Toxic","X-Scissor"],"abilities":["Swift Swim"]}]},"milotic":{"level":81,"sets":[{"role":"Staller","movepool":["Haze","Ice Beam","Recover","Scald","Toxic"],"abilities":["Competitive","Marvel Scale"]}]},"absol":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Knock Off","Play Rough","Sucker Punch","Swords Dance"],"abilities":["Justified"],"preferredTypes":["Fairy"]}]},"glalie":{"level":95,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Freeze-Dry","Spikes","Super Fang","Taunt"],"abilities":["Inner Focus"]}]},"walrein":{"level":87,"sets":[{"role":"Staller","movepool":["Ice Beam","Protect","Surf","Toxic"],"abilities":["Thick Fat"]},{"role":"Bulky Attacker","movepool":["Ice Beam","Super Fang","Surf","Toxic"],"abilities":["Thick Fat"]}]},"relicanth":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Body Press","Earthquake","Head Smash","Liquidation","Rock Polish","Stealth Rock"],"abilities":["Rock Head"],"preferredTypes":["Fighting"]}]},"salamence":{"level":73,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Dual Wingbeat","Earthquake","Outrage"],"abilities":["Moxie"]}]},"metagross":{"level":78,"sets":[{"role":"Bulky Support","movepool":["Bullet Punch","Earthquake","Meteor Mash","Stealth Rock","Thunder Punch","Zen Headbutt"],"abilities":["Clear Body"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Agility","Earthquake","Meteor Mash","Thunder Punch","Zen Headbutt"],"abilities":["Clear Body"],"preferredTypes":["Ground"]}]},"regirock":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Iron Defense","Stealth Rock","Stone Edge","Thunder Wave","Toxic"],"abilities":["Clear Body"]},{"role":"Bulky Setup","movepool":["Body Press","Curse","Iron Defense","Rest","Stone Edge"],"abilities":["Clear Body"]},{"role":"Bulky Support","movepool":["Body Press","Iron Defense","Rock Polish","Stone Edge"],"abilities":["Clear Body"]}]},"regice":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Focus Blast","Ice Beam","Rest","Sleep Talk","Thunder Wave","Thunderbolt","Toxic"],"abilities":["Clear Body"],"preferredTypes":["Electric"]},{"role":"Bulky Setup","movepool":["Focus Blast","Ice Beam","Rock Polish","Thunderbolt"],"abilities":["Clear Body"]}]},"registeel":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Iron Defense","Iron Head","Stealth Rock","Thunder Wave","Toxic"],"abilities":["Clear Body"]},{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Iron Head","Rest","Rock Polish"],"abilities":["Clear Body"]}]},"latias":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Draco Meteor","Mystical Fire","Psyshock","Roost"],"abilities":["Levitate"]}]},"latios":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Calm Mind","Draco Meteor","Mystical Fire","Psyshock","Roost"],"abilities":["Levitate"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Mystical Fire","Psyshock","Roost","Trick"],"abilities":["Levitate"]}]},"kyogre":{"level":70,"sets":[{"role":"Bulky Attacker","movepool":["Ice Beam","Origin Pulse","Scald","Thunder","Water Spout"],"abilities":["Drizzle"]},{"role":"Bulky Setup","movepool":["Calm Mind","Ice Beam","Origin Pulse","Scald","Thunder"],"abilities":["Drizzle"]}]},"groudon":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["Heat Crash","Precipice Blades","Rock Polish","Swords Dance"],"abilities":["Drought"]},{"role":"Bulky Attacker","movepool":["Heat Crash","Precipice Blades","Stealth Rock","Stone Edge","Thunder Wave"],"abilities":["Drought"],"preferredTypes":["Fire"]}]},"rayquaza":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Ascent","Dragon Dance","Earthquake","V-create"],"abilities":["Air Lock"]},{"role":"Fast Attacker","movepool":["Dragon Ascent","Earthquake","Extreme Speed","Swords Dance","V-create"],"abilities":["Air Lock"]}]},"jirachi":{"level":78,"sets":[{"role":"Bulky Support","movepool":["Body Slam","Fire Punch","Healing Wish","Iron Head","Protect","Stealth Rock","Toxic","U-turn","Wish"],"abilities":["Serene Grace"]}]},"luxray":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["Agility","Crunch","Facade","Superpower","Wild Charge"],"abilities":["Guts"]}]},"roserade":{"level":83,"sets":[{"role":"Fast Support","movepool":["Giga Drain","Leaf Storm","Sleep Powder","Sludge Bomb","Spikes","Synthesis","Toxic Spikes"],"abilities":["Natural Cure"]}]},"vespiquen":{"level":98,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Defog","Roost","Toxic","Toxic Spikes","U-turn"],"abilities":["Pressure"]}]},"cherrim":{"level":94,"sets":[{"role":"Wallbreaker","movepool":["Dazzling Gleam","Energy Ball","Healing Wish","Morning Sun","Pollen Puff"],"abilities":["Flower Gift"]},{"role":"Staller","movepool":["Aromatherapy","Energy Ball","Leech Seed","Morning Sun","Toxic"],"abilities":["Flower Gift"]}]},"gastrodon":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Clear Smog","Earthquake","Ice Beam","Recover","Scald","Toxic"],"abilities":["Storm Drain"]}]},"drifblim":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["Air Cutter","Calm Mind","Shadow Ball","Strength Sap"],"abilities":["Unburden"]}]},"lopunny":{"level":96,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Healing Wish","Mega Kick","Triple Axel"],"abilities":["Limber"]},{"role":"Wallbreaker","movepool":["Close Combat","Mega Kick","Triple Axel","U-turn"],"abilities":["Limber"]}]},"skuntank":{"level":84,"sets":[{"role":"Fast Support","movepool":["Crunch","Defog","Fire Blast","Poison Jab","Sucker Punch","Taunt","Toxic"],"abilities":["Aftermath"]}]},"bronzong":{"level":84,"sets":[{"role":"Staller","movepool":["Earthquake","Iron Head","Protect","Psychic","Toxic"],"abilities":["Levitate"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["Earthquake","Iron Head","Psychic","Stealth Rock","Toxic"],"abilities":["Levitate"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Iron Head","Psychic","Rest","Rock Polish"],"abilities":["Levitate"]}]},"spiritomb":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Foul Play","Pain Split","Poltergeist","Shadow Sneak","Sucker Punch","Toxic","Trick","Will-O-Wisp"],"abilities":["Infiltrator"]}]},"garchomp":{"level":73,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Fire Fang","Outrage","Stone Edge","Swords Dance"],"abilities":["Rough Skin"]},{"role":"Setup Sweeper","movepool":["Earthquake","Outrage","Scale Shot","Swords Dance"],"abilities":["Rough Skin"]},{"role":"Fast Support","movepool":["Dragon Claw","Dragon Tail","Earthquake","Outrage","Stealth Rock","Toxic"],"abilities":["Rough Skin"]}]},"lucario":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Extreme Speed","Meteor Mash","Stone Edge","Swords Dance"],"abilities":["Justified"],"preferredTypes":["Normal"]}]},"hippowdon":{"level":81,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Slack Off","Stealth Rock","Stone Edge","Toxic","Whirlwind"],"abilities":["Sand Stream"]}]},"drapion":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Knock Off","Poison Jab","Swords Dance","Taunt","Toxic Spikes"],"abilities":["Sniper"]},{"role":"Fast Attacker","movepool":["Aqua Tail","Earthquake","Knock Off","Poison Jab","Swords Dance"],"abilities":["Sniper"],"preferredTypes":["Ground"]}]},"toxicroak":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["Drain Punch","Earthquake","Gunk Shot","Knock Off","Substitute","Sucker Punch","Swords Dance"],"abilities":["Dry Skin"]}]},"abomasnow":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Aurora Veil","Blizzard","Earthquake","Ice Shard","Wood Hammer"],"abilities":["Snow Warning"]}]},"weavile":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Ice Shard","Knock Off","Low Kick","Swords Dance","Triple Axel"],"abilities":["Pickpocket"]}]},"magnezone":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Body Press","Flash Cannon","Thunderbolt","Volt Switch"],"abilities":["Analytic","Magnet Pull"]},{"role":"Staller","movepool":["Flash Cannon","Protect","Thunderbolt","Toxic"],"abilities":["Analytic"]},{"role":"Bulky Setup","movepool":["Body Press","Discharge","Flash Cannon","Iron Defense","Thunderbolt"],"abilities":["Analytic","Magnet Pull"]}]},"lickilicky":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Body Slam","Knock Off","Protect","Wish"],"abilities":["Cloud Nine","Oblivious","Own Tempo"]},{"role":"AV Pivot","movepool":["Body Slam","Dragon Tail","Earthquake","Explosion","Knock Off","Power Whip"],"abilities":["Cloud Nine","Own Tempo"]},{"role":"Bulky Setup","movepool":["Body Slam","Earthquake","Explosion","Knock Off","Power Whip","Swords Dance"],"abilities":["Cloud Nine","Oblivious","Own Tempo"]}]},"rhyperior":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Earthquake","Ice Punch","Megahorn","Rock Polish","Stone Edge"],"abilities":["Solid Rock"]},{"role":"Bulky Attacker","movepool":["Dragon Tail","Earthquake","Ice Punch","Megahorn","Stone Edge"],"abilities":["Solid Rock"]}]},"tangrowth":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Giga Drain","Knock Off","Leaf Storm","Leech Seed","Rock Slide","Sleep Powder","Sludge Bomb"],"abilities":["Regenerator"]}]},"electivire":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Cross Chop","Earthquake","Flamethrower","Ice Punch","Volt Switch","Wild Charge"],"abilities":["Motor Drive"],"preferredTypes":["Ice"]}]},"magmortar":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Fire Blast","Focus Blast","Scorching Sands","Taunt","Thunderbolt"],"abilities":["Flame Body"],"preferredTypes":["Electric"]},{"role":"Fast Attacker","movepool":["Earthquake","Fire Blast","Focus Blast","Thunderbolt","Will-O-Wisp"],"abilities":["Flame Body"],"preferredTypes":["Electric"]}]},"togekiss":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Air Slash","Aura Sphere","Nasty Plot","Roost","Thunder Wave"],"abilities":["Serene Grace"]}]},"leafeon":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["Double-Edge","Knock Off","Leaf Blade","Substitute","Swords Dance","Synthesis"],"abilities":["Chlorophyll"],"preferredTypes":["Dark"]}]},"glaceon":{"level":90,"sets":[{"role":"Bulky Support","movepool":["Freeze-Dry","Protect","Toxic","Wish"],"abilities":["Ice Body"]}]},"mamoswine":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Ice Shard","Icicle Crash","Knock Off","Stealth Rock","Superpower"],"abilities":["Thick Fat"]}]},"porygonz":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Agility","Dark Pulse","Ice Beam","Nasty Plot","Thunderbolt","Tri Attack","Trick"],"abilities":["Adaptability","Download"],"preferredTypes":["Dark","Electric"]}]},"gallade":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Knock Off","Shadow Sneak","Swords Dance","Trick","Zen Headbutt"],"abilities":["Justified"]}]},"dusknoir":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["Brick Break","Pain Split","Poltergeist","Shadow Sneak","Trick"],"abilities":["Frisk","Pressure"]},{"role":"Bulky Attacker","movepool":["Brick Break","Haze","Pain Split","Poltergeist","Shadow Sneak","Will-O-Wisp"],"abilities":["Frisk","Pressure"]},{"role":"Bulky Support","movepool":["Focus Punch","Pain Split","Poltergeist","Shadow Sneak","Substitute"],"abilities":["Frisk","Pressure"]}]},"froslass":{"level":84,"sets":[{"role":"Fast Support","movepool":["Destiny Bond","Poltergeist","Spikes","Taunt","Triple Axel","Will-O-Wisp"],"abilities":["Cursed Body"]}]},"rotom":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Nasty Plot","Shadow Ball","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"]}]},"rotomheat":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Nasty Plot","Overheat","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"]}]},"rotomwash":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Hydro Pump","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"]}]},"rotomfrost":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Blizzard","Defog","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"]}]},"rotomfan":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Defog","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"]}]},"rotommow":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Leaf Storm","Nasty Plot","Thunderbolt","Volt Switch","Will-O-Wisp"],"abilities":["Levitate"]}]},"uxie":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Heal Bell","Knock Off","Psychic","Stealth Rock","Thunder Wave","Toxic","U-turn","Yawn"],"abilities":["Levitate"]}]},"mesprit":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Encore","Knock Off","Psychic","Stealth Rock","Thunder Wave","Toxic","U-turn"],"abilities":["Levitate"]},{"role":"Fast Attacker","movepool":["Dazzling Gleam","Ice Beam","Nasty Plot","Psychic","Shadow Ball","Thunderbolt","Trick","U-turn"],"abilities":["Levitate"]},{"role":"Bulky Attacker","movepool":["Drain Punch","Ice Beam","Knock Off","Psychic","Stealth Rock","Thunder Wave","Thunderbolt","Toxic","U-turn"],"abilities":["Levitate"],"preferredTypes":["Dark","Fighting"]}]},"azelf":{"level":81,"sets":[{"role":"Fast Support","movepool":["Encore","Explosion","Fire Blast","Knock Off","Psychic","Stealth Rock","Taunt","U-turn"],"abilities":["Levitate"]},{"role":"Fast Attacker","movepool":["Dazzling Gleam","Fire Blast","Nasty Plot","Psychic","Psyshock","U-turn"],"abilities":["Levitate"]}]},"dialga":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Dragon Tail","Fire Blast","Flash Cannon","Stealth Rock","Thunder Wave","Thunderbolt","Toxic"],"abilities":["Pressure"],"preferredTypes":["Fire"]}]},"palkia":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Hydro Pump","Spacial Rend","Thunder Wave"],"abilities":["Pressure"],"preferredTypes":["Fire"]}]},"heatran":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Flash Cannon","Lava Plume","Magma Storm","Stealth Rock","Toxic"],"abilities":["Flash Fire"]},{"role":"Staller","movepool":["Flash Cannon","Magma Storm","Protect","Toxic"],"abilities":["Flash Fire"]}]},"regigigas":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Body Slam","Knock Off","Rest","Sleep Talk"],"abilities":["Slow Start"]},{"role":"Bulky Attacker","movepool":["Body Slam","Knock Off","Protect","Substitute"],"abilities":["Slow Start"]}]},"giratinaorigin":{"level":71,"sets":[{"role":"Dynamax User","movepool":["Dual Wingbeat","Hone Claws","Outrage","Poltergeist"],"abilities":["Levitate"]},{"role":"Setup Sweeper","movepool":["Hone Claws","Outrage","Poltergeist","Shadow Sneak"],"abilities":["Levitate"]},{"role":"Fast Attacker","movepool":["Defog","Draco Meteor","Poltergeist","Shadow Sneak","Will-O-Wisp"],"abilities":["Levitate"]}]},"giratina":{"level":73,"sets":[{"role":"Bulky Support","movepool":["Defog","Dragon Tail","Shadow Ball","Toxic","Will-O-Wisp"],"abilities":["Pressure"]},{"role":"Bulky Attacker","movepool":["Hex","Rest","Sleep Talk","Toxic","Will-O-Wisp"],"abilities":["Pressure"]},{"role":"Bulky Setup","movepool":["Calm Mind","Dragon Pulse","Rest","Sleep Talk"],"abilities":["Pressure"]}]},"cresselia":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Moonlight","Psyshock"],"abilities":["Levitate"]},{"role":"Bulky Attacker","movepool":["Moonblast","Moonlight","Psychic","Thunder Wave","Toxic"],"abilities":["Levitate"]}]},"victini":{"level":76,"sets":[{"role":"Wallbreaker","movepool":["Bolt Strike","Energy Ball","Focus Blast","Glaciate","Psychic","U-turn","V-create"],"abilities":["Victory Star"],"preferredTypes":["Electric"]},{"role":"Fast Attacker","movepool":["Bolt Strike","U-turn","V-create","Zen Headbutt"],"abilities":["Victory Star"]}]},"stoutland":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Crunch","Facade","Superpower","Thunder Wave","Toxic"],"abilities":["Intimidate"]}]},"liepard":{"level":92,"sets":[{"role":"Fast Support","movepool":["Encore","Knock Off","Substitute","Thunder Wave","U-turn"],"abilities":["Prankster"]}]},"musharna":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Moonblast","Moonlight","Psychic","Thunder Wave","Toxic"],"abilities":["Synchronize"]},{"role":"Bulky Setup","movepool":["Calm Mind","Moonblast","Moonlight","Psyshock"],"abilities":["Synchronize"]}]},"unfezant":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Night Slash","Roost","Toxic","U-turn"],"abilities":["Super Luck"]}]},"gigalith":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Explosion","Stealth Rock","Stone Edge","Superpower","Toxic"],"abilities":["Sand Stream"],"preferredTypes":["Ground"]}]},"swoobat":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["Air Slash","Calm Mind","Heat Wave","Roost","Stored Power"],"abilities":["Simple"]},{"role":"Bulky Setup","movepool":["Calm Mind","Heat Wave","Roost","Stored Power"],"abilities":["Simple"]}]},"excadrill":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["Earthquake","Iron Head","Rapid Spin","Swords Dance"],"abilities":["Mold Breaker"]},{"role":"AV Pivot","movepool":["Earthquake","Iron Head","Rapid Spin","Rock Slide"],"abilities":["Mold Breaker"]},{"role":"Dynamax User","movepool":["Earthquake","Iron Head","Rock Slide","Swords Dance"],"abilities":["Sand Rush"]}]},"audino":{"level":92,"sets":[{"role":"Bulky Support","movepool":["Knock Off","Protect","Toxic","Wish"],"abilities":["Regenerator"]}]},"gurdurr":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Bulk Up","Defog","Drain Punch","Knock Off","Mach Punch"],"abilities":["Guts"]}]},"conkeldurr":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Facade","Knock Off","Mach Punch"],"abilities":["Guts"]}]},"seismitoad":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Hydro Pump","Rain Dance","Sludge Wave"],"abilities":["Swift Swim"]},{"role":"Bulky Attacker","movepool":["Earthquake","Knock Off","Scald","Stealth Rock","Toxic"],"abilities":["Water Absorb"]},{"role":"Staller","movepool":["Earthquake","Protect","Scald","Toxic"],"abilities":["Water Absorb"]}]},"throh":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Facade","Knock Off","Storm Throw"],"abilities":["Guts"]},{"role":"Wallbreaker","movepool":["Facade","Knock Off","Storm Throw","Superpower"],"abilities":["Guts"]},{"role":"Bulky Support","movepool":["Circle Throw","Knock Off","Rest","Sleep Talk"],"abilities":["Guts"]}]},"sawk":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Bulk Up","Close Combat","Earthquake","Knock Off","Poison Jab","Stone Edge"],"abilities":["Mold Breaker","Sturdy"]}]},"scolipede":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Megahorn","Poison Jab","Protect","Spikes","Swords Dance","Toxic Spikes"],"abilities":["Speed Boost"]}]},"whimsicott":{"level":84,"sets":[{"role":"Fast Support","movepool":["Defog","Encore","Moonblast","Stun Spore","U-turn"],"abilities":["Prankster"]},{"role":"Staller","movepool":["Encore","Leech Seed","Moonblast","Substitute"],"abilities":["Prankster"]}]},"lilligant":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Petal Dance","Pollen Puff","Quiver Dance","Sleep Powder"],"abilities":["Own Tempo"]}]},"basculin":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Flip Turn","Liquidation","Superpower"],"abilities":["Adaptability"]}]},"krookodile":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Earthquake","Knock Off","Stealth Rock","Stone Edge"],"abilities":["Intimidate"]}]},"darmanitan":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Flare Blitz","Rock Slide","Superpower","U-turn"],"abilities":["Sheer Force"]}]},"darmanitangalar":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Flare Blitz","Icicle Crash","Superpower","U-turn"],"abilities":["Gorilla Tactics"]}]},"maractus":{"level":96,"sets":[{"role":"Staller","movepool":["Giga Drain","Knock Off","Leech Seed","Spiky Shield"],"abilities":["Storm Drain","Water Absorb"]},{"role":"Bulky Support","movepool":["Giga Drain","Knock Off","Spikes","Synthesis","Toxic"],"abilities":["Storm Drain","Water Absorb"]}]},"crustle":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Earthquake","Shell Smash","Stone Edge","X-Scissor"],"abilities":["Sturdy"]}]},"scrafty":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Knock Off","Rest"],"abilities":["Shed Skin"]},{"role":"Bulky Attacker","movepool":["Dragon Dance","Drain Punch","Iron Head","Knock Off"],"abilities":["Intimidate","Moxie"]}]},"sigilyph":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Calm Mind","Defog","Heat Wave","Psyshock","Roost"],"abilities":["Magic Guard"]},{"role":"Wallbreaker","movepool":["Air Slash","Energy Ball","Heat Wave","Ice Beam","Psychic","Psyshock"],"abilities":["Tinted Lens"]}]},"cofagrigus":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Rest","Shadow Ball","Trick Room"],"abilities":["Mummy"]},{"role":"Bulky Attacker","movepool":["Body Press","Pain Split","Shadow Ball","Toxic Spikes","Will-O-Wisp"],"abilities":["Mummy"]}]},"carracosta":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Aqua Jet","Liquidation","Shell Smash","Stone Edge","Superpower"],"abilities":["Sturdy"]},{"role":"Dynamax User","movepool":["Liquidation","Shell Smash","Stone Edge","Superpower"],"abilities":["Swift Swim"]}]},"archeops":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Dual Wingbeat","Earthquake","Roost","Stone Edge"],"abilities":["Defeatist"]}]},"garbodorgmax":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Gunk Shot","Haze","Pain Split","Spikes","Stomping Tantrum","Toxic Spikes"],"abilities":["Aftermath"]}]},"zoroark":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["Dark Pulse","Flamethrower","Focus Blast","Sludge Bomb","Trick","U-turn"],"abilities":["Illusion"],"preferredTypes":["Poison"]},{"role":"Setup Sweeper","movepool":["Dark Pulse","Focus Blast","Nasty Plot","Sludge Bomb"],"abilities":["Illusion"],"preferredTypes":["Poison"]}]},"cinccino":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["Bullet Seed","Knock Off","Rock Blast","Tail Slap","Triple Axel","U-turn"],"abilities":["Skill Link"],"preferredTypes":["Grass"]}]},"gothitelle":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Dark Pulse","Psychic","Thunderbolt","Trick"],"abilities":["Shadow Tag"]}]},"reuniclus":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Focus Blast","Psychic","Psyshock","Recover"],"abilities":["Magic Guard"]}]},"vanilluxe":{"level":81,"sets":[{"role":"Fast Support","movepool":["Aurora Veil","Blizzard","Explosion","Flash Cannon","Freeze-Dry"],"abilities":["Snow Warning"]}]},"emolga":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["Air Slash","Defog","Knock Off","Roost","Thunderbolt","Toxic","U-turn"],"abilities":["Motor Drive"]}]},"escavalier":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Drill Run","Iron Head","Knock Off","Megahorn","Swords Dance"],"abilities":["Overcoat","Swarm"]}]},"amoonguss":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Giga Drain","Sludge Bomb","Spore","Synthesis"],"abilities":["Regenerator"]},{"role":"Bulky Support","movepool":["Giga Drain","Sludge Bomb","Spore","Toxic"],"abilities":["Regenerator"]}]},"jellicent":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Hex","Recover","Scald","Toxic","Will-O-Wisp"],"abilities":["Water Absorb"]},{"role":"Bulky Attacker","movepool":["Ice Beam","Recover","Scald","Shadow Ball","Taunt"],"abilities":["Water Absorb"]}]},"galvantula":{"level":80,"sets":[{"role":"Fast Support","movepool":["Bug Buzz","Energy Ball","Sticky Web","Thunder","Volt Switch"],"abilities":["Compound Eyes"]}]},"ferrothorn":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["Gyro Ball","Leech Seed","Power Whip","Spikes","Stealth Rock"],"abilities":["Iron Barbs"]},{"role":"Bulky Support","movepool":["Knock Off","Power Whip","Spikes","Stealth Rock","Thunder Wave","Toxic"],"abilities":["Iron Barbs"]}]},"klinklang":{"level":83,"sets":[{"role":"Bulky Setup","movepool":["Gear Grind","Shift Gear","Substitute","Wild Charge"],"abilities":["Clear Body"]}]},"beheeyem":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Dark Pulse","Psychic","Recover","Thunderbolt","Trick"],"abilities":["Analytic"]}]},"chandelure":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Energy Ball","Fire Blast","Shadow Ball","Trick"],"abilities":["Flash Fire"]},{"role":"Bulky Setup","movepool":["Calm Mind","Energy Ball","Fire Blast","Shadow Ball","Substitute","Will-O-Wisp"],"abilities":["Flame Body","Flash Fire"]}]},"haxorus":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Dragon Dance","Earthquake","Outrage","Poison Jab"],"abilities":["Mold Breaker"],"preferredTypes":["Poison"]}]},"beartic":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Aqua Jet","Icicle Crash","Stone Edge","Superpower","Swords Dance"],"abilities":["Slush Rush"],"preferredTypes":["Fighting"]}]},"cryogonal":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Freeze-Dry","Haze","Rapid Spin","Recover","Toxic"],"abilities":["Levitate"]}]},"accelgor":{"level":90,"sets":[{"role":"Fast Support","movepool":["Bug Buzz","Encore","Focus Blast","Sludge Bomb","Spikes","Toxic Spikes","U-turn"],"abilities":["Sticky Hold"]}]},"stunfisk":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Discharge","Earth Power","Scald","Stealth Rock","Toxic"],"abilities":["Static"]},{"role":"Bulky Support","movepool":["Discharge","Earth Power","Protect","Rest","Sleep Talk","Toxic"],"abilities":["Static"]}]},"stunfiskgalar":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Pain Split","Stealth Rock","Stone Edge","Thunder Wave"],"abilities":["Mimicry"]}]},"mienshao":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["High Jump Kick","Knock Off","Poison Jab","Stone Edge","U-turn"],"abilities":["Reckless"]},{"role":"AV Pivot","movepool":["Close Combat","Fake Out","Knock Off","U-turn"],"abilities":["Regenerator"]},{"role":"Setup Sweeper","movepool":["Close Combat","Knock Off","Poison Jab","Stone Edge","Swords Dance"],"abilities":["Regenerator"]}]},"druddigon":{"level":86,"sets":[{"role":"Bulky Support","movepool":["Earthquake","Glare","Gunk Shot","Outrage","Stealth Rock","Sucker Punch"],"abilities":["Rough Skin"]},{"role":"Wallbreaker","movepool":["Fire Punch","Glare","Gunk Shot","Outrage","Sucker Punch"],"abilities":["Sheer Force"]}]},"golurk":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["Dynamic Punch","Earthquake","Poltergeist","Rock Polish","Stealth Rock","Stone Edge"],"abilities":["No Guard"],"preferredTypes":["Fighting"]}]},"bisharp":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Iron Head","Knock Off","Stealth Rock","Sucker Punch","Swords Dance"],"abilities":["Defiant"]}]},"bouffalant":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Earthquake","Head Charge","Swords Dance","Throat Chop"],"abilities":["Reckless","Sap Sipper"],"preferredTypes":["Dark"]}]},"braviary":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Brave Bird","Bulk Up","Close Combat","Roost"],"abilities":["Defiant"]}]},"mandibuzz":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Foul Play","Roost","Toxic"],"abilities":["Overcoat"]},{"role":"Staller","movepool":["Defog","Foul Play","Roost","Taunt","Toxic"],"abilities":["Overcoat"]}]},"heatmor":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["Fire Lash","Giga Drain","Knock Off","Sucker Punch","Superpower"],"abilities":["Flash Fire"]}]},"durant":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Hone Claws","Iron Head","Rock Slide","Superpower","X-Scissor"],"abilities":["Hustle"],"preferredTypes":["Fighting"]}]},"hydreigon":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Dark Pulse","Draco Meteor","Fire Blast","Flash Cannon","U-turn"],"abilities":["Levitate"]},{"role":"Wallbreaker","movepool":["Dark Pulse","Defog","Draco Meteor","Fire Blast","Flash Cannon","Nasty Plot","Roost"],"abilities":["Levitate"]}]},"volcarona":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["Bug Buzz","Fire Blast","Giga Drain","Quiver Dance","Roost"],"abilities":["Flame Body","Swarm"]}]},"cobalion":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Close Combat","Iron Head","Stealth Rock","Stone Edge","Swords Dance"],"abilities":["Justified"]},{"role":"Bulky Support","movepool":["Close Combat","Iron Head","Stealth Rock","Swords Dance","Thunder Wave"],"abilities":["Justified"]}]},"terrakion":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Quick Attack","Stealth Rock","Stone Edge","Swords Dance"],"abilities":["Justified"],"preferredTypes":["Ground"]}]},"virizion":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Leaf Blade","Stone Edge","Swords Dance"],"abilities":["Justified"]}]},"tornadus":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Focus Blast","Grass Knot","Heat Wave","Hurricane","Nasty Plot","U-turn"],"abilities":["Defiant","Prankster"]},{"role":"Fast Support","movepool":["Defog","Hurricane","Knock Off","Superpower","Taunt","U-turn"],"abilities":["Defiant","Prankster"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Acrobatics","Bulk Up","Knock Off","Superpower","Taunt"],"abilities":["Defiant"],"preferredTypes":["Fighting"]}]},"tornadustherian":{"level":77,"sets":[{"role":"Wallbreaker","movepool":["Focus Blast","Grass Knot","Heat Wave","Hurricane","Nasty Plot","U-turn"],"abilities":["Regenerator"]},{"role":"Fast Support","movepool":["Defog","Hurricane","Knock Off","Superpower","U-turn"],"abilities":["Regenerator"]}]},"thundurus":{"level":80,"sets":[{"role":"Fast Support","movepool":["Defog","Grass Knot","Knock Off","Sludge Wave","Superpower","Thunder Wave","Thunderbolt","U-turn"],"abilities":["Defiant","Prankster"]},{"role":"Wallbreaker","movepool":["Focus Blast","Grass Knot","Nasty Plot","Sludge Wave","Thunderbolt","U-turn"],"abilities":["Defiant","Prankster"]}]},"thundurustherian":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Focus Blast","Grass Knot","Nasty Plot","Sludge Wave","Thunderbolt","Volt Switch"],"abilities":["Volt Absorb"]}]},"reshiram":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["Blue Flare","Defog","Draco Meteor","Roost","Toxic"],"abilities":["Turboblaze"]}]},"zekrom":{"level":68,"sets":[{"role":"Setup Sweeper","movepool":["Bolt Strike","Dragon Dance","Outrage","Roost"],"abilities":["Teravolt"]}]},"landorus":{"level":74,"sets":[{"role":"Wallbreaker","movepool":["Earth Power","Focus Blast","Knock Off","Rock Polish","Rock Slide","Sludge Wave","Stealth Rock"],"abilities":["Sheer Force"],"preferredTypes":["Rock"]},{"role":"Setup Sweeper","movepool":["Calm Mind","Earth Power","Focus Blast","Psychic","Rock Polish","Sludge Wave"],"abilities":["Sheer Force"],"preferredTypes":["Poison"]}]},"landorustherian":{"level":73,"sets":[{"role":"Dynamax User","movepool":["Earthquake","Fly","Stone Edge","Swords Dance"],"abilities":["Intimidate"]},{"role":"Bulky Attacker","movepool":["Defog","Earthquake","Knock Off","Stealth Rock","Stone Edge","Toxic","U-turn"],"abilities":["Intimidate"]}]},"kyurem":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Earth Power","Freeze-Dry","Roost"],"abilities":["Pressure"]},{"role":"Bulky Support","movepool":["Earth Power","Freeze-Dry","Roost","Substitute"],"abilities":["Pressure"]},{"role":"Wallbreaker","movepool":["Draco Meteor","Earth Power","Freeze-Dry","Ice Beam"],"abilities":["Pressure"]}]},"kyuremblack":{"level":70,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Fusion Bolt","Icicle Spear","Outrage"],"abilities":["Teravolt"]}]},"kyuremwhite":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Draco Meteor","Freeze-Dry","Fusion Flare","Ice Beam"],"abilities":["Turboblaze"]},{"role":"Bulky Attacker","movepool":["Draco Meteor","Freeze-Dry","Fusion Flare","Roost"],"abilities":["Turboblaze"]}]},"keldeoresolute":{"level":77,"sets":[{"role":"Bulky Setup","movepool":["Air Slash","Calm Mind","Scald","Secret Sword","Substitute"],"abilities":["Justified"]},{"role":"Setup Sweeper","movepool":["Air Slash","Calm Mind","Hydro Pump","Secret Sword"],"abilities":["Justified"]},{"role":"Fast Attacker","movepool":["Flip Turn","Hydro Pump","Scald","Secret Sword"],"abilities":["Justified"]}]},"genesect":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["Bug Buzz","Flamethrower","Flash Cannon","Ice Beam","Thunderbolt","U-turn"],"abilities":["Download"],"preferredTypes":["Bug"]},{"role":"Setup Sweeper","movepool":["Blaze Kick","Iron Head","Leech Life","Shift Gear"],"abilities":["Download"]},{"role":"Wallbreaker","movepool":["Blaze Kick","Extreme Speed","Iron Head","U-turn"],"abilities":["Download"]}]},"diggersby":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["Agility","Body Slam","Earthquake","Foul Play","Quick Attack","U-turn"],"abilities":["Huge Power"]},{"role":"Setup Sweeper","movepool":["Agility","Body Slam","Earthquake","Knock Off","Quick Attack","Swords Dance"],"abilities":["Huge Power"]}]},"talonflame":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Overheat","Roost","U-turn","Will-O-Wisp"],"abilities":["Flame Body"]},{"role":"Setup Sweeper","movepool":["Brave Bird","Flare Blitz","Roost","Swords Dance"],"abilities":["Gale Wings"]}]},"pangoro":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["Bullet Punch","Drain Punch","Gunk Shot","Knock Off"],"abilities":["Iron Fist"]},{"role":"Bulky Attacker","movepool":["Bullet Punch","Close Combat","Gunk Shot","Knock Off"],"abilities":["Scrappy"]},{"role":"Setup Sweeper","movepool":["Bullet Punch","Drain Punch","Knock Off","Swords Dance"],"abilities":["Iron Fist"]}]},"meowstic":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Light Screen","Psychic","Reflect","Thunder Wave","Toxic","Yawn"],"abilities":["Prankster"]}]},"meowsticf":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["Dark Pulse","Energy Ball","Nasty Plot","Psychic","Psyshock","Thunderbolt"],"abilities":["Competitive"],"preferredTypes":["Electric"]}]},"doublade":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Iron Head","Shadow Claw","Shadow Sneak","Swords Dance"],"abilities":["No Guard"]}]},"aegislash":{"level":79,"sets":[{"role":"Staller","movepool":["Iron Head","King's Shield","Shadow Ball","Substitute","Toxic"],"abilities":["Stance Change"]},{"role":"Setup Sweeper","movepool":["Close Combat","Iron Head","King's Shield","Shadow Claw","Shadow Sneak","Swords Dance"],"abilities":["Stance Change"],"preferredTypes":["Steel"]}]},"aromatisse":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Moonblast","Protect","Toxic","Wish"],"abilities":["Aroma Veil"]}]},"slurpuff":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Belly Drum","Drain Punch","Facade","Play Rough"],"abilities":["Unburden"]}]},"malamar":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["Knock Off","Rest","Sleep Talk","Superpower"],"abilities":["Contrary"]},{"role":"Bulky Attacker","movepool":["Knock Off","Psycho Cut","Rest","Superpower"],"abilities":["Contrary"]}]},"barbaracle":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Cross Chop","Earthquake","Liquidation","Shell Smash","Stone Edge"],"abilities":["Tough Claws"]}]},"dragalge":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["Draco Meteor","Dragon Tail","Flip Turn","Focus Blast","Sludge Wave","Toxic Spikes"],"abilities":["Adaptability"],"preferredTypes":["Fighting"]}]},"clawitzer":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["Aura Sphere","Dark Pulse","Ice Beam","Scald","U-turn"],"abilities":["Mega Launcher"]},{"role":"AV Pivot","movepool":["Aura Sphere","Dark Pulse","Ice Beam","Scald","U-turn"],"abilities":["Mega Launcher"]}]},"heliolisk":{"level":82,"sets":[{"role":"Fast Support","movepool":["Dark Pulse","Glare","Hyper Voice","Surf","Thunderbolt","Volt Switch"],"abilities":["Dry Skin"]}]},"tyrantrum":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Dragon Dance","Earthquake","Head Smash","Outrage"],"abilities":["Rock Head"]}]},"aurorus":{"level":85,"sets":[{"role":"Fast Support","movepool":["Aurora Veil","Blizzard","Earth Power","Stealth Rock","Thunder Wave"],"abilities":["Snow Warning"]},{"role":"Bulky Setup","movepool":["Blizzard","Earth Power","Freeze-Dry","Meteor Beam"],"abilities":["Snow Warning"]}]},"sylveon":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Calm Mind","Hyper Voice","Mystical Fire","Protect","Wish"],"abilities":["Pixilate"]}]},"hawlucha":{"level":79,"sets":[{"role":"Dynamax User","movepool":["Brave Bird","Close Combat","Roost","Stone Edge","Swords Dance","Throat Chop"],"abilities":["Unburden"]}]},"dedenne":{"level":91,"sets":[{"role":"Staller","movepool":["Recycle","Substitute","Super Fang","Thunderbolt","Toxic","U-turn"],"abilities":["Cheek Pouch"]},{"role":"Bulky Support","movepool":["Protect","Recycle","Thunderbolt","Toxic"],"abilities":["Cheek Pouch"]},{"role":"Bulky Attacker","movepool":["Dazzling Gleam","Recycle","Thunderbolt","Toxic"],"abilities":["Cheek Pouch"]}]},"carbink":{"level":89,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Iron Defense","Moonblast","Rest","Rock Polish"],"abilities":["Clear Body"]}]},"goodra":{"level":83,"sets":[{"role":"AV Pivot","movepool":["Draco Meteor","Earthquake","Fire Blast","Hydro Pump","Power Whip","Sludge Bomb"],"abilities":["Sap Sipper"]}]},"klefki":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Dazzling Gleam","Foul Play","Spikes","Thunder Wave"],"abilities":["Prankster"]},{"role":"Bulky Support","movepool":["Magnet Rise","Play Rough","Spikes","Thunder Wave"],"abilities":["Prankster"]}]},"trevenant":{"level":88,"sets":[{"role":"Staller","movepool":["Horn Leech","Poltergeist","Protect","Toxic"],"abilities":["Harvest"]},{"role":"Wallbreaker","movepool":["Drain Punch","Earthquake","Horn Leech","Poltergeist","Rock Slide","Trick Room","Wood Hammer"],"abilities":["Natural Cure"]}]},"gourgeist":{"level":84,"sets":[{"role":"Bulky Support","movepool":["Poltergeist","Power Whip","Shadow Sneak","Synthesis","Will-O-Wisp"],"abilities":["Frisk"]}]},"gourgeistsmall":{"level":83,"sets":[{"role":"Fast Support","movepool":["Leech Seed","Poltergeist","Power Whip","Substitute"],"abilities":["Frisk"]}]},"gourgeistlarge":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Poltergeist","Power Whip","Shadow Sneak","Synthesis","Will-O-Wisp"],"abilities":["Frisk"]}]},"gourgeistsuper":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Flame Charge","Poltergeist","Power Whip","Synthesis"],"abilities":["Frisk"]},{"role":"Wallbreaker","movepool":["Poltergeist","Power Whip","Shadow Sneak","Trick","Trick Room"],"abilities":["Frisk"]}]},"avalugg":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Avalanche","Body Press","Curse","Rapid Spin","Recover"],"abilities":["Sturdy"]}]},"noivern":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["Boomburst","Draco Meteor","Flamethrower","Hurricane","U-turn"],"abilities":["Infiltrator"]},{"role":"Fast Support","movepool":["Defog","Draco Meteor","Flamethrower","Hurricane","Roost"],"abilities":["Infiltrator"]}]},"xerneas":{"level":64,"sets":[{"role":"Setup Sweeper","movepool":["Focus Blast","Geomancy","Moonblast","Psyshock"],"abilities":["Fairy Aura"]}]},"yveltal":{"level":67,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Knock Off","Oblivion Wing","Roost","Toxic"],"abilities":["Dark Aura"]},{"role":"Bulky Support","movepool":["Knock Off","Oblivion Wing","Roost","Sucker Punch","Taunt","U-turn"],"abilities":["Dark Aura"]}]},"zygarde":{"level":70,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Extreme Speed","Outrage","Substitute","Thousand Arrows"],"abilities":["Power Construct"]},{"role":"Bulky Setup","movepool":["Coil","Rest","Sleep Talk","Thousand Arrows"],"abilities":["Power Construct"]}]},"zygarde10":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["Extreme Speed","Outrage","Superpower","Thousand Arrows"],"abilities":["Aura Break"]}]},"diancie":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Diamond Storm","Earth Power","Moonblast","Rock Polish","Stealth Rock","Toxic"],"abilities":["Clear Body"],"preferredTypes":["Fighting"]}]},"volcanion":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Earth Power","Flamethrower","Sludge Bomb","Steam Eruption","Toxic"],"abilities":["Water Absorb"]}]},"decidueye":{"level":86,"sets":[{"role":"Dynamax User","movepool":["Brave Bird","Leaf Blade","Poltergeist","Swords Dance"],"abilities":["Overgrow"]},{"role":"Fast Attacker","movepool":["Leaf Blade","Poltergeist","Shadow Sneak","Swords Dance","U-turn"],"abilities":["Overgrow"]},{"role":"Fast Support","movepool":["Defog","Leaf Storm","Poltergeist","Roost","U-turn"],"abilities":["Overgrow"]}]},"incineroar":{"level":80,"sets":[{"role":"AV Pivot","movepool":["Close Combat","Earthquake","Flare Blitz","Knock Off","U-turn"],"abilities":["Intimidate"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Flare Blitz","Knock Off","Parting Shot","Will-O-Wisp"],"abilities":["Intimidate"]}]},"primarina":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["Flip Turn","Hydro Pump","Moonblast","Scald"],"abilities":["Torrent"]},{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Moonblast","Scald"],"abilities":["Torrent"]}]},"vikavolt":{"level":81,"sets":[{"role":"Fast Support","movepool":["Bug Buzz","Energy Ball","Roost","Sticky Web","Thunderbolt","Volt Switch"],"abilities":["Levitate"]}]},"ribombee":{"level":80,"sets":[{"role":"Fast Support","movepool":["Moonblast","Roost","Sticky Web","Stun Spore","U-turn"],"abilities":["Shield Dust"]}]},"lycanroc":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Accelerock","Close Combat","Psychic Fangs","Stone Edge","Swords Dance"],"abilities":["Sand Rush"],"preferredTypes":["Fighting"]}]},"lycanrocmidnight":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Iron Tail","Play Rough","Stealth Rock","Stone Edge","Sucker Punch","Swords Dance"],"abilities":["No Guard"],"preferredTypes":["Fighting"]}]},"lycanrocdusk":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Accelerock","Close Combat","Psychic Fangs","Stone Edge","Swords Dance"],"abilities":["Tough Claws"],"preferredTypes":["Fighting"]}]},"wishiwashi":{"level":87,"sets":[{"role":"Bulky Support","movepool":["Ice Beam","Rest","Scald","Sleep Talk"],"abilities":["Schooling"]},{"role":"AV Pivot","movepool":["Earthquake","Ice Beam","Scald","U-turn"],"abilities":["Schooling"]},{"role":"Wallbreaker","movepool":["Hydro Pump","Ice Beam","Scald","U-turn"],"abilities":["Schooling"]}]},"toxapex":{"level":79,"sets":[{"role":"Staller","movepool":["Baneful Bunker","Recover","Scald","Toxic"],"abilities":["Regenerator"]},{"role":"Bulky Support","movepool":["Haze","Recover","Scald","Toxic","Toxic Spikes"],"abilities":["Regenerator"]}]},"mudsdale":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Earthquake","Heavy Slam","Rock Slide","Stealth Rock","Toxic"],"abilities":["Stamina"],"preferredTypes":["Rock"]}]},"araquanid":{"level":80,"sets":[{"role":"Bulky Support","movepool":["Leech Life","Liquidation","Mirror Coat","Sticky Web","Toxic"],"abilities":["Water Bubble"]}]},"lurantis":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["Defog","Knock Off","Leaf Storm","Superpower","Synthesis"],"abilities":["Contrary"],"preferredTypes":["Fighting"]}]},"shiinotic":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Giga Drain","Moonblast","Spore","Strength Sap"],"abilities":["Effect Spore"]}]},"salazzle":{"level":81,"sets":[{"role":"Staller","movepool":["Flamethrower","Protect","Substitute","Toxic"],"abilities":["Corrosion"]}]},"bewear":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Darkest Lariat","Double-Edge","Drain Punch"],"abilities":["Fluffy"]},{"role":"Bulky Attacker","movepool":["Close Combat","Darkest Lariat","Double-Edge","Swords Dance"],"abilities":["Fluffy"]},{"role":"Fast Attacker","movepool":["Close Combat","Darkest Lariat","Double-Edge","Drain Punch"],"abilities":["Fluffy"]}]},"tsareena":{"level":85,"sets":[{"role":"Fast Support","movepool":["High Jump Kick","Knock Off","Power Whip","Rapid Spin","Synthesis","Triple Axel","U-turn"],"abilities":["Queenly Majesty"]}]},"comfey":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Giga Drain","Stored Power"],"abilities":["Triage"]},{"role":"Setup Sweeper","movepool":["Calm Mind","Draining Kiss","Giga Drain","Stored Power"],"abilities":["Triage"]}]},"oranguru":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["Focus Blast","Nasty Plot","Nature Power","Psychic","Psyshock","Thunderbolt","Trick"],"abilities":["Inner Focus"]}]},"passimian":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Gunk Shot","Knock Off"],"abilities":["Defiant"]},{"role":"Fast Attacker","movepool":["Close Combat","Earthquake","Gunk Shot","Knock Off","Rock Slide","U-turn"],"abilities":["Defiant"]}]},"golisopod":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["First Impression","Knock Off","Leech Life","Liquidation","Spikes"],"abilities":["Emergency Exit"]}]},"palossand":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Shadow Ball","Shore Up","Stealth Rock","Toxic"],"abilities":["Water Compaction"]}]},"pyukumuku":{"level":85,"sets":[{"role":"Bulky Support","movepool":["Counter","Mirror Coat","Recover","Toxic"],"abilities":["Unaware"]}]},"typenull":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Crush Claw","Rest","Sleep Talk","Swords Dance"],"abilities":["Battle Armor"]},{"role":"Bulky Attacker","movepool":["Crush Claw","Payback","Rest","Swords Dance"],"abilities":["Battle Armor"]}]},"silvally":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Crunch","Explosion","Flame Charge","Multi-Attack","Swords Dance"],"abilities":["RKS System"]}]},"silvallybug":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Flame Charge","Multi-Attack","Rock Slide","Swords Dance"],"abilities":["RKS System"]}]},"silvallydark":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Flame Charge","Iron Head","Multi-Attack","Psychic Fangs","Swords Dance"],"abilities":["RKS System"],"preferredTypes":["Steel"]}]},"silvallydragon":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Flame Charge","Iron Head","Multi-Attack","Swords Dance"],"abilities":["RKS System"]},{"role":"Fast Support","movepool":["Defog","Flamethrower","Iron Head","Multi-Attack","Parting Shot","Thunder Wave"],"abilities":["RKS System"]}]},"silvallyelectric":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Defog","Ice Beam","Multi-Attack","Toxic","U-turn"],"abilities":["RKS System"],"preferredTypes":["Ice"]}]},"silvallyfairy":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Defog","Flamethrower","Multi-Attack","Parting Shot","Thunder Wave","Toxic"],"abilities":["RKS System"],"preferredTypes":["Fire"]},{"role":"Setup Sweeper","movepool":["Flame Charge","Multi-Attack","Psychic Fangs","Rock Slide","Swords Dance"],"abilities":["RKS System"],"preferredTypes":["Psychic"]}]},"silvallyfighting":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Crunch","Flame Charge","Iron Head","Multi-Attack","Rock Slide","Swords Dance"],"abilities":["RKS System"],"preferredTypes":["Dark"]},{"role":"Bulky Support","movepool":["Crunch","Defog","Flamethrower","Ice Beam","Multi-Attack","Thunder Wave","Toxic","U-turn"],"abilities":["RKS System"],"preferredTypes":["Dark"]}]},"silvallyfire":{"level":83,"sets":[{"role":"Fast Support","movepool":["Defog","Grass Pledge","Ice Beam","Multi-Attack","Parting Shot","Surf","Thunder Wave","Toxic"],"abilities":["RKS System"]}]},"silvallyflying":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Flame Charge","Iron Head","Multi-Attack","Swords Dance"],"abilities":["RKS System"]}]},"silvallyghost":{"level":83,"sets":[{"role":"Bulky Setup","movepool":["Explosion","Multi-Attack","Swords Dance","U-turn"],"abilities":["RKS System"]},{"role":"Setup Sweeper","movepool":["Explosion","Flame Charge","Multi-Attack","Swords Dance","X-Scissor"],"abilities":["RKS System"]}]},"silvallygrass":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Defog","Flamethrower","Ice Beam","Multi-Attack","Surf","Thunder Wave","Toxic","U-turn"],"abilities":["RKS System"]},{"role":"Setup Sweeper","movepool":["Flame Charge","Multi-Attack","Rock Slide","Swords Dance"],"abilities":["RKS System"]}]},"silvallyground":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Defog","Flamethrower","Ice Beam","Multi-Attack","Thunder Wave","Toxic","U-turn"],"abilities":["RKS System"],"preferredTypes":["Ice"]},{"role":"Setup Sweeper","movepool":["Flame Charge","Multi-Attack","Rock Slide","Swords Dance"],"abilities":["RKS System"]}]},"silvallyice":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Defog","Flamethrower","Multi-Attack","Parting Shot","Thunder Wave","Thunderbolt","Toxic"],"abilities":["RKS System"]},{"role":"Setup Sweeper","movepool":["Flame Charge","Multi-Attack","Rock Slide","Swords Dance"],"abilities":["RKS System"]}]},"silvallypoison":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Defog","Flamethrower","Multi-Attack","Parting Shot","Surf","Thunder Wave","Toxic"],"abilities":["RKS System"],"preferredTypes":["Fire"]}]},"silvallypsychic":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Flame Charge","Multi-Attack","Swords Dance","X-Scissor"],"abilities":["RKS System"]},{"role":"Bulky Support","movepool":["Defog","Flamethrower","Multi-Attack","Thunder Wave","Toxic","U-turn"],"abilities":["RKS System"]}]},"silvallyrock":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Flame Charge","Multi-Attack","Psychic Fangs","Swords Dance"],"abilities":["RKS System"]},{"role":"Bulky Support","movepool":["Defog","Flamethrower","Ice Beam","Multi-Attack","Parting Shot","Thunder Wave","Toxic"],"abilities":["RKS System"]}]},"silvallysteel":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Defog","Multi-Attack","Parting Shot","Thunder Wave","Toxic"],"abilities":["RKS System"]}]},"silvallywater":{"level":83,"sets":[{"role":"Bulky Support","movepool":["Defog","Ice Beam","Multi-Attack","Thunder Wave","Toxic","U-turn"],"abilities":["RKS System"]}]},"turtonator":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Draco Meteor","Dragon Pulse","Earthquake","Fire Blast","Shell Smash"],"abilities":["Shell Armor"]},{"role":"Bulky Support","movepool":["Body Press","Draco Meteor","Fire Blast","Rapid Spin","Will-O-Wisp"],"abilities":["Shell Armor"]},{"role":"Bulky Setup","movepool":["Body Press","Draco Meteor","Fire Blast","Iron Defense"],"abilities":["Shell Armor"]}]},"togedemaru":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["Iron Head","Nuzzle","Spiky Shield","U-turn","Wish"],"abilities":["Iron Barbs","Lightning Rod","Sturdy"]},{"role":"Bulky Support","movepool":["Iron Head","Spiky Shield","U-turn","Wish","Zing Zap"],"abilities":["Iron Barbs","Lightning Rod","Sturdy"]},{"role":"AV Pivot","movepool":["Iron Head","Nuzzle","Super Fang","U-turn","Zing Zap"],"abilities":["Iron Barbs","Lightning Rod","Sturdy"],"preferredTypes":["Steel"]}]},"mimikyu":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["Drain Punch","Play Rough","Shadow Claw","Shadow Sneak","Swords Dance"],"abilities":["Disguise"]}]},"drampa":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["Draco Meteor","Fire Blast","Hyper Voice","Thunderbolt"],"abilities":["Sap Sipper"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Hyper Voice","Roost"],"abilities":["Berserk"]},{"role":"Bulky Attacker","movepool":["Defog","Draco Meteor","Fire Blast","Glare","Hyper Voice","Roost"],"abilities":["Berserk"]}]},"dhelmise":{"level":87,"sets":[{"role":"Fast Support","movepool":["Anchor Shot","Poltergeist","Power Whip","Rapid Spin","Synthesis"],"abilities":["Steelworker"]}]},"kommoo":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["Clanging Scales","Clangorous Soul","Drain Punch","Iron Head"],"abilities":["Bulletproof","Overcoat","Soundproof"]}]},"tapukoko":{"level":77,"sets":[{"role":"Fast Support","movepool":["Dazzling Gleam","Defog","Roost","U-turn","Wild Charge"],"abilities":["Electric Surge"]},{"role":"Setup Sweeper","movepool":["Calm Mind","Dazzling Gleam","Grass Knot","Roost","Substitute","Thunderbolt"],"abilities":["Electric Surge"]}]},"tapulele":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Focus Blast","Psychic","Psyshock"],"abilities":["Psychic Surge"]},{"role":"Fast Attacker","movepool":["Focus Blast","Moonblast","Psychic","Psyshock"],"abilities":["Psychic Surge"]},{"role":"Setup Sweeper","movepool":["Calm Mind","Focus Blast","Moonblast","Psychic","Psyshock"],"abilities":["Psychic Surge"]}]},"tapubulu":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["Close Combat","High Horsepower","Horn Leech","Stone Edge","Swords Dance","Wood Hammer"],"abilities":["Grassy Surge"]},{"role":"Bulky Attacker","movepool":["Close Combat","High Horsepower","Horn Leech","Megahorn","Stone Edge","Wood Hammer"],"abilities":["Grassy Surge"]}]},"tapufini":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Hydro Pump","Moonblast","Surf","Taunt"],"abilities":["Misty Surge"]},{"role":"Bulky Attacker","movepool":["Calm Mind","Draining Kiss","Hydro Pump","Moonblast","Surf"],"abilities":["Misty Surge"]},{"role":"Bulky Support","movepool":["Defog","Hydro Pump","Knock Off","Moonblast","Nature's Madness","Surf","Taunt"],"abilities":["Misty Surge"]}]},"solgaleo":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["Close Combat","Earthquake","Flame Charge","Knock Off","Psychic Fangs","Sunsteel Strike"],"abilities":["Full Metal Body"],"preferredTypes":["Fighting"]},{"role":"Bulky Attacker","movepool":["Close Combat","Earthquake","Knock Off","Morning Sun","Psychic Fangs","Sunsteel Strike","Teleport","Toxic"],"abilities":["Full Metal Body"],"preferredTypes":["Ground"]}]},"lunala":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Moongeist Beam","Psyshock","Roost"],"abilities":["Shadow Shield"]},{"role":"Bulky Attacker","movepool":["Calm Mind","Moonblast","Moongeist Beam","Roost"],"abilities":["Shadow Shield"]}]},"nihilego":{"level":76,"sets":[{"role":"Bulky Attacker","movepool":["Grass Knot","Power Gem","Sludge Wave","Stealth Rock","Thunderbolt","Toxic Spikes"],"abilities":["Beast Boost"],"preferredTypes":["Rock"]},{"role":"Setup Sweeper","movepool":["Grass Knot","Meteor Beam","Sludge Wave","Thunderbolt"],"abilities":["Beast Boost"]}]},"buzzwole":{"level":74,"sets":[{"role":"Dynamax User","movepool":["Close Combat","Darkest Lariat","Dual Wingbeat","Earthquake","Leech Life","Stone Edge"],"abilities":["Beast Boost"]},{"role":"Bulky Attacker","movepool":["Bulk Up","Drain Punch","Dual Wingbeat","Leech Life","Roost","Stone Edge","Toxic"],"abilities":["Beast Boost"]}]},"pheromosa":{"level":73,"sets":[{"role":"AV Pivot","movepool":["Close Combat","Ice Beam","Poison Jab","Throat Chop","Triple Axel","U-turn"],"abilities":["Beast Boost"],"preferredTypes":["Dark"]}]},"xurkitree":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Dazzling Gleam","Energy Ball","Hypnosis","Thunderbolt"],"abilities":["Beast Boost"]},{"role":"Fast Attacker","movepool":["Dazzling Gleam","Energy Ball","Thunderbolt","Volt Switch"],"abilities":["Beast Boost"]}]},"celesteela":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["Air Slash","Autotomize","Earthquake","Flash Cannon"],"abilities":["Beast Boost"]},{"role":"Staller","movepool":["Air Slash","Heavy Slam","Leech Seed","Protect"],"abilities":["Beast Boost"]}]},"kartana":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["Knock Off","Leaf Blade","Sacred Sword","Smart Strike","Swords Dance"],"abilities":["Beast Boost"],"preferredTypes":["Fighting"]}]},"guzzlord":{"level":84,"sets":[{"role":"AV Pivot","movepool":["Draco Meteor","Earthquake","Fire Blast","Heavy Slam","Knock Off"],"abilities":["Beast Boost"],"preferredTypes":["Steel"]},{"role":"Bulky Attacker","movepool":["Draco Meteor","Earthquake","Fire Blast","Knock Off","Sludge Bomb"],"abilities":["Beast Boost"],"preferredTypes":["Poison"]}]},"necrozma":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Brick Break","Dragon Dance","Earthquake","Knock Off","Photon Geyser"],"abilities":["Prism Armor"],"preferredTypes":["Dark"]},{"role":"Bulky Setup","movepool":["Calm Mind","Earth Power","Heat Wave","Moonlight","Photon Geyser"],"abilities":["Prism Armor"]}]},"necrozmaduskmane":{"level":65,"sets":[{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Morning Sun","Sunsteel Strike"],"abilities":["Prism Armor"]},{"role":"Bulky Setup","movepool":["Dragon Dance","Earthquake","Photon Geyser","Sunsteel Strike"],"abilities":["Prism Armor"]}]},"necrozmadawnwings":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["Brick Break","Dragon Dance","Moongeist Beam","Photon Geyser"],"abilities":["Prism Armor"]},{"role":"Bulky Setup","movepool":["Calm Mind","Moongeist Beam","Moonlight","Photon Geyser"],"abilities":["Prism Armor"]}]},"magearna":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["Agility","Calm Mind","Flash Cannon","Fleur Cannon"],"abilities":["Soul-Heart"]}]},"marshadow":{"level":68,"sets":[{"role":"Wallbreaker","movepool":["Bulk Up","Close Combat","Rock Tomb","Shadow Sneak","Spectral Thief"],"abilities":["Technician"]}]},"naganadel":{"level":72,"sets":[{"role":"Dynamax User","movepool":["Air Slash","Draco Meteor","Fire Blast","Sludge Wave"],"abilities":["Beast Boost"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Nasty Plot","Sludge Wave","U-turn"],"abilities":["Beast Boost"]}]},"stakataka":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Body Press","Earthquake","Gyro Ball","Stone Edge","Trick Room"],"abilities":["Beast Boost"],"preferredTypes":["Fighting"]}]},"blacephalon":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Fire Blast","Psyshock","Shadow Ball","Trick"],"abilities":["Beast Boost"]},{"role":"Wallbreaker","movepool":["Calm Mind","Fire Blast","Psyshock","Shadow Ball","Trick"],"abilities":["Beast Boost"]}]},"zeraora":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["Bulk Up","Close Combat","Knock Off","Plasma Fists","Play Rough"],"abilities":["Volt Absorb"],"preferredTypes":["Fighting"]},{"role":"Wallbreaker","movepool":["Close Combat","Grass Knot","Knock Off","Plasma Fists","Play Rough","Volt Switch"],"abilities":["Volt Absorb"],"preferredTypes":["Fighting"]}]},"melmetal":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["Double Iron Bash","Earthquake","Thunder Punch","Thunder Wave"],"abilities":["Iron Fist"]},{"role":"Bulky Support","movepool":["Double Iron Bash","Earthquake","Superpower","Thunder Wave"],"abilities":["Iron Fist"]},{"role":"Bulky Setup","movepool":["Acid Armor","Body Press","Double Iron Bash","Rest","Thunder Wave"],"abilities":["Iron Fist"]}]},"rillaboomgmax":{"level":75,"sets":[{"role":"Wallbreaker","movepool":["Grassy Glide","High Horsepower","Swords Dance","U-turn","Wood Hammer"],"abilities":["Grassy Surge"]},{"role":"Fast Attacker","movepool":["Grassy Glide","Knock Off","Swords Dance","U-turn","Wood Hammer"],"abilities":["Grassy Surge"]}]},"cinderace":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["Court Change","Gunk Shot","High Jump Kick","Pyro Ball","Sucker Punch","U-turn"],"abilities":["Libero"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["Bulk Up","High Jump Kick","Pyro Ball","Sucker Punch"],"abilities":["Libero"]}]},"inteleon":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["Hydro Pump","Ice Beam","Scald","U-turn"],"abilities":["Torrent"]},{"role":"Fast Attacker","movepool":["Air Slash","Hydro Pump","Ice Beam","U-turn"],"abilities":["Torrent"]}]},"inteleongmax":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["Air Slash","Focus Energy","Ice Beam","Surf"],"abilities":["Sniper"]}]},"greedent":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["Body Slam","Earthquake","Payback","Swords Dance"],"abilities":["Cheek Pouch"]}]},"corviknight":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Brave Bird","Bulk Up","Defog","Roost"],"abilities":["Mirror Armor"]}]},"orbeetle":{"level":87,"sets":[{"role":"Fast Support","movepool":["Body Press","Bug Buzz","Psychic","Recover","Sticky Web","U-turn"],"abilities":["Frisk","Swarm"]},{"role":"Bulky Setup","movepool":["Bug Buzz","Calm Mind","Psychic","Recover"],"abilities":["Frisk","Swarm"]}]},"thievul":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["Burning Jealousy","Dark Pulse","Grass Knot","Nasty Plot","Psychic","U-turn"],"abilities":["Stakeout"],"preferredTypes":["Psychic"]}]},"eldegoss":{"level":90,"sets":[{"role":"Fast Support","movepool":["Energy Ball","Pollen Puff","Rapid Spin","Sleep Powder"],"abilities":["Regenerator"]},{"role":"Bulky Support","movepool":["Aromatherapy","Energy Ball","Leech Seed","Pollen Puff","Rapid Spin","Sleep Powder"],"abilities":["Regenerator"]}]},"dubwool":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Body Press","Cotton Guard","Rest","Sleep Talk"],"abilities":["Fluffy"]}]},"drednaw":{"level":83,"sets":[{"role":"Dynamax User","movepool":["Liquidation","Stone Edge","Superpower","Swords Dance"],"abilities":["Swift Swim"]}]},"boltund":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Bulk Up","Crunch","Fire Fang","Play Rough","Psychic Fangs","Thunder Fang","Volt Switch"],"abilities":["Strong Jaw"]}]},"coalossalgmax":{"level":89,"sets":[{"role":"Bulky Support","movepool":["Flamethrower","Overheat","Rapid Spin","Spikes","Stealth Rock","Stone Edge","Will-O-Wisp"],"abilities":["Flame Body"]}]},"flapple":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Dragon Dance","Grav Apple","Outrage","Sucker Punch","U-turn"],"abilities":["Hustle"]}]},"appletun":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["Apple Acid","Draco Meteor","Dragon Pulse","Leech Seed","Recover"],"abilities":["Thick Fat"]}]},"appletungmax":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["Apple Acid","Draco Meteor","Dragon Pulse","Leech Seed","Recover"],"abilities":["Thick Fat"]}]},"sandaconda":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["Coil","Earthquake","Glare","Rest","Stealth Rock","Stone Edge"],"abilities":["Shed Skin"]}]},"cramorant":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Brave Bird","Defog","Roost","Superpower","Surf"],"abilities":["Gulp Missile"]}]},"barraskewda":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Flip Turn","Liquidation"],"abilities":["Swift Swim"]}]},"toxtricity":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["Boomburst","Overdrive","Shift Gear","Sludge Wave","Volt Switch"],"abilities":["Punk Rock"]}]},"centiskorch":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["Coil","Fire Lash","Knock Off","Leech Life","Power Whip"],"abilities":["Flash Fire"],"preferredTypes":["Grass"]}]},"grapploct":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Ice Punch","Sucker Punch"],"abilities":["Limber"]},{"role":"Bulky Attacker","movepool":["Brutal Swing","Bulk Up","Drain Punch","Ice Punch"],"abilities":["Technician"]}]},"polteageist":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Giga Drain","Shadow Ball","Shell Smash","Stored Power","Strength Sap"],"abilities":["Cursed Body"],"preferredTypes":["Psychic"]}]},"hatterenegmax":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Draining Kiss","Mystical Fire","Psychic","Psyshock"],"abilities":["Magic Bounce"]},{"role":"AV Pivot","movepool":["Draining Kiss","Mystical Fire","Nuzzle","Psychic","Psyshock"],"abilities":["Magic Bounce"]}]},"grimmsnarlgmax":{"level":83,"sets":[{"role":"Fast Support","movepool":["Light Screen","Reflect","Spirit Break","Taunt","Thunder Wave"],"abilities":["Prankster"]},{"role":"Bulky Setup","movepool":["Bulk Up","Darkest Lariat","Play Rough","Rest","Sucker Punch","Thunder Wave"],"abilities":["Prankster"]}]},"obstagoon":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["Bulk Up","Close Combat","Facade","Knock Off","Parting Shot"],"abilities":["Guts"]}]},"perrserker":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["Close Combat","Iron Head","Seed Bomb","U-turn"],"abilities":["Steely Spirit"]},{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Iron Head","U-turn"],"abilities":["Tough Claws"]},{"role":"AV Pivot","movepool":["Close Combat","Fake Out","Iron Head","U-turn"],"abilities":["Tough Claws"]}]},"cursola":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["Earth Power","Hydro Pump","Ice Beam","Shadow Ball","Stealth Rock","Strength Sap"],"abilities":["Weak Armor"],"preferredTypes":["Water"]},{"role":"Bulky Setup","movepool":["Earth Power","Hydro Pump","Ice Beam","Meteor Beam","Shadow Ball","Strength Sap"],"abilities":["Weak Armor"]}]},"sirfetchd":{"level":83,"sets":[{"role":"Dynamax User","movepool":["Brave Bird","Close Combat","Knock Off","Swords Dance"],"abilities":["Scrappy"]}]},"mrrime":{"level":88,"sets":[{"role":"Bulky Support","movepool":["Focus Blast","Freeze-Dry","Psychic","Rapid Spin","Slack Off"],"abilities":["Screen Cleaner"]}]},"runerigus":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["Earthquake","Haze","Poltergeist","Stealth Rock","Toxic Spikes","Will-O-Wisp"],"abilities":["Wandering Spirit"]}]},"alcremiegmax":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["Calm Mind","Dazzling Gleam","Mystical Fire","Recover"],"abilities":["Aroma Veil"]}]},"falinks":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Close Combat","Iron Head","No Retreat","Rock Slide","Throat Chop"],"abilities":["Defiant"],"preferredTypes":["Dark"]}]},"pincurchin":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["Recover","Rising Voltage","Scald","Spikes","Toxic Spikes"],"abilities":["Electric Surge"]}]},"frosmoth":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["Bug Buzz","Giga Drain","Hurricane","Ice Beam","Quiver Dance"],"abilities":["Ice Scales"]}]},"stonjourner":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Earthquake","Heat Crash","Rock Polish","Stealth Rock","Stone Edge"],"abilities":["Power Spot"]}]},"eiscue":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["Belly Drum","Icicle Crash","Iron Head","Liquidation","Substitute","Zen Headbutt"],"abilities":["Ice Face"],"preferredTypes":["Water"]}]},"indeedee":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Expanding Force","Hyper Voice","Mystical Fire","Trick"],"abilities":["Psychic Surge"]},{"role":"Wallbreaker","movepool":["Calm Mind","Expanding Force","Hyper Voice","Mystical Fire","Trick"],"abilities":["Psychic Surge"]}]},"indeedeef":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["Calm Mind","Expanding Force","Healing Wish","Hyper Voice","Mystical Fire"],"abilities":["Psychic Surge"]},{"role":"Wallbreaker","movepool":["Calm Mind","Expanding Force","Healing Wish","Hyper Voice","Mystical Fire"],"abilities":["Psychic Surge"]}]},"morpeko":{"level":85,"sets":[{"role":"Fast Support","movepool":["Aura Wheel","Parting Shot","Protect","Rapid Spin"],"abilities":["Hunger Switch"]},{"role":"Bulky Attacker","movepool":["Aura Wheel","Foul Play","Protect","Rapid Spin"],"abilities":["Hunger Switch"]}]},"copperajah":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Iron Head","Play Rough","Rock Slide","Stealth Rock"],"abilities":["Sheer Force"]},{"role":"Bulky Attacker","movepool":["Earthquake","Heat Crash","Heavy Slam","Power Whip","Stone Edge","Superpower"],"abilities":["Heavy Metal"],"preferredTypes":["Ground"]}]},"copperajahgmax":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["Earthquake","Iron Head","Play Rough","Rock Slide","Stealth Rock"],"abilities":["Sheer Force"]},{"role":"Bulky Attacker","movepool":["Earthquake","Heat Crash","Heavy Slam","Power Whip","Stone Edge","Superpower"],"abilities":["Heavy Metal"],"preferredTypes":["Ground"]}]},"dracozolt":{"level":76,"sets":[{"role":"Dynamax User","movepool":["Aerial Ace","Bolt Beak","Low Kick","Outrage"],"abilities":["Hustle"]},{"role":"Fast Attacker","movepool":["Bolt Beak","Earthquake","Low Kick","Outrage"],"abilities":["Hustle"]}]},"arctozolt":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["Bolt Beak","Freeze-Dry","Icicle Crash","Stomping Tantrum"],"abilities":["Volt Absorb"]}]},"dracovish":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["Crunch","Fishious Rend","Low Kick","Outrage","Psychic Fangs"],"abilities":["Strong Jaw"]}]},"arctovish":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["Fishious Rend","Freeze-Dry","Icicle Crash","Stone Edge"],"abilities":["Water Absorb"]}]},"duraludon":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["Body Press","Draco Meteor","Flash Cannon","Iron Defense","Stealth Rock","Thunder Wave","Thunderbolt"],"abilities":["Light Metal"],"preferredTypes":["Steel"]}]},"dragapult":{"level":77,"sets":[{"role":"Fast Support","movepool":["Dragon Darts","Hex","U-turn","Will-O-Wisp"],"abilities":["Cursed Body","Infiltrator"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Fire Blast","Shadow Ball","U-turn"],"abilities":["Clear Body","Infiltrator"]},{"role":"Dynamax User","movepool":["Dragon Dance","Dragon Darts","Fire Blast","Phantom Force","Substitute","Will-O-Wisp"],"abilities":["Clear Body"]}]},"zacian":{"level":67,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Play Rough","Psychic Fangs","Swords Dance","Wild Charge"],"abilities":["Intrepid Sword"],"preferredTypes":["Fighting"]}]},"zaciancrowned":{"level":62,"sets":[{"role":"Fast Attacker","movepool":["Behemoth Blade","Close Combat","Play Rough","Psychic Fangs","Swords Dance"],"abilities":["Intrepid Sword"],"preferredTypes":["Fighting"]}]},"zamazenta":{"level":70,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Crunch","Iron Head","Psychic Fangs","Wild Charge"],"abilities":["Dauntless Shield"],"preferredTypes":["Dark"]}]},"zamazentacrowned":{"level":67,"sets":[{"role":"Setup Sweeper","movepool":["Behemoth Bash","Close Combat","Crunch","Howl","Psychic Fangs","Wild Charge"],"abilities":["Dauntless Shield"]}]},"eternatus":{"level":68,"sets":[{"role":"Bulky Attacker","movepool":["Dynamax Cannon","Flamethrower","Recover","Sludge Bomb"],"abilities":["Pressure"]},{"role":"Bulky Support","movepool":["Dynamax Cannon","Flamethrower","Recover","Toxic","Toxic Spikes"],"abilities":["Pressure"]}]},"urshifurapidstrike":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Ice Punch","Surging Strikes","U-turn"],"abilities":["Unseen Fist"]},{"role":"Bulky Setup","movepool":["Aqua Jet","Bulk Up","Drain Punch","Substitute","Surging Strikes"],"abilities":["Unseen Fist"]}]},"urshifugmax":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["Close Combat","Iron Head","Sucker Punch","U-turn","Wicked Blow"],"abilities":["Unseen Fist"]},{"role":"Bulky Setup","movepool":["Bulk Up","Drain Punch","Iron Head","Substitute","Sucker Punch","Wicked Blow"],"abilities":["Unseen Fist"]}]},"urshifurapidstrikegmax":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["Aqua Jet","Close Combat","Ice Punch","Surging Strikes","U-turn"],"abilities":["Unseen Fist"]},{"role":"Bulky Setup","movepool":["Aqua Jet","Bulk Up","Drain Punch","Substitute","Surging Strikes"],"abilities":["Unseen Fist"]}]},"zarude":{"level":77,"sets":[{"role":"Bulky Setup","movepool":["Bulk Up","Darkest Lariat","Jungle Healing","Power Whip"],"abilities":["Leaf Guard"]},{"role":"Fast Attacker","movepool":["Close Combat","Darkest Lariat","Power Whip","U-turn"],"abilities":["Leaf Guard"]}]},"regieleki":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["Explosion","Substitute","Thunderbolt","Volt Switch"],"abilities":["Transistor"]},{"role":"Fast Support","movepool":["Rapid Spin","Substitute","Thunderbolt","Volt Switch"],"abilities":["Transistor"]}]},"regidrago":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["Dragon Dance","Fire Fang","Hammer Arm","Outrage"],"abilities":["Dragon's Maw"]},{"role":"Fast Attacker","movepool":["Draco Meteor","Dragon Energy","Hammer Arm","Outrage"],"abilities":["Dragon's Maw"]}]},"glastrier":{"level":83,"sets":[{"role":"Bulky Setup","movepool":["Close Combat","High Horsepower","Icicle Crash","Swords Dance"],"abilities":["Chilling Neigh"]}]},"spectrier":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["Dark Pulse","Nasty Plot","Shadow Ball","Substitute","Will-O-Wisp"],"abilities":["Grim Neigh"]}]},"calyrex":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["Calm Mind","Encore","Giga Drain","Leech Seed","Psychic","Psyshock"],"abilities":["Unnerve"]}]},"calyrexice":{"level":70,"sets":[{"role":"Bulky Setup","movepool":["Agility","Close Combat","Glacial Lance","High Horsepower"],"abilities":["As One (Glastrier)"]},{"role":"Bulky Attacker","movepool":["Close Combat","Glacial Lance","High Horsepower","Trick Room"],"abilities":["As One (Glastrier)"]}]},"calyrexshadow":{"level":64,"sets":[{"role":"Wallbreaker","movepool":["Astral Barrage","Pollen Puff","Psyshock","Trick"],"abilities":["As One (Spectrier)"]},{"role":"Setup Sweeper","movepool":["Astral Barrage","Nasty Plot","Pollen Puff","Psyshock","Substitute"],"abilities":["As One (Spectrier)"]}]}} as any;
/* eslint-enable */

export interface BattleFactorySpecies {
	flags: { limEevee?: 1 };
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

// Moves that restore HP:
const RECOVERY_MOVES = [
	'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'recycle', 'roost', 'shoreup', 'slackoff', 'softboiled', 'strengthsap', 'synthesis',
];
// Moves that boost Attack:
const PHYSICAL_SETUP = [
	'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'meditate', 'poweruppunch', 'swordsdance',
];
// Some moves that only boost Speed:
const SPEED_SETUP = [
	'agility', 'autotomize', 'flamecharge', 'rockpolish',
];
// Conglomerate for ease of access
const SETUP = [
	'acidarmor', 'agility', 'autotomize', 'bellydrum', 'bulkup', 'calmmind', 'clangoroussoul', 'coil', 'cosmicpower', 'curse', 'dragondance',
	'flamecharge', 'growth', 'honeclaws', 'howl', 'irondefense', 'meditate', 'meteorbeam', 'nastyplot', 'noretreat', 'poweruppunch', 'quiverdance',
	'raindance', 'rockpolish', 'shellsmash', 'shiftgear', 'swordsdance', 'tailglow', 'workup',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'acidspray', 'accelerock', 'aquajet', 'breakingswipe', 'bulletpunch', 'chatter', 'clearsmog', 'covet', 'dragontail',
	'doomdesire', 'electroweb', 'eruption', 'explosion', 'fakeout', 'feint', 'flamecharge', 'flipturn', 'futuresight',
	'grassyglide', 'iceshard', 'icywind', 'incinerate', 'infestation', 'machpunch', 'meteorbeam', 'nuzzle', 'pluck', 'pursuit',
	'quickattack', 'rapidspin', 'reversal', 'selfdestruct', 'shadowsneak', 'skydrop', 'snarl', 'strugglebug', 'suckerpunch',
	'uturn', 'vacuumwave', 'voltswitch', 'watershuriken', 'waterspout',
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
	'flipturn', 'partingshot', 'teleport', 'uturn', 'voltswitch',
];

// Moves that should be paired together when possible
const MOVE_PAIRS = [
	['lightscreen', 'reflect'],
	['sleeptalk', 'rest'],
	['protect', 'wish'],
	['leechseed', 'substitute'],
	['focuspunch', 'substitute'],
];

/** Pokemon who always want priority STAB, and are fine with it as its only STAB move of that type */
const PRIORITY_POKEMON = [
	'aegislash', 'doublade', 'golisopod', 'mimikyu', 'scizor',
];

export class RandomGen8Teams extends RandomTeams {
	override randomSets: { [species: string]: RandomTeamsTypes.RandomSpeciesData } = randomSetsJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);

		this.noStab = NO_STAB;
		this.priorityPokemon = PRIORITY_POKEMON;

		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter) => (
				movePool.includes('megahorn') ||
				(!counter.get('Bug') && (types.has('Electric') || types.has('Psychic')))
			),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
			Dragon: (movePool, moves, abilities, types, counter) => !counter.get('Dragon'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fairy: (movePool, moves, abilities, types, counter) => !counter.get('Fairy'),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting'),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter, species) => !counter.get('Flying'),
			Ghost: (movePool, moves, abilities, types, counter) => !counter.get('Ghost'),
			Grass: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Grass') && (
					species.baseStats.atk >= 100 || movePool.includes('leafstorm') || types.has('Ghost')
				)
			),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => !counter.get('Ice'),
			Normal: (movePool, moves, abilities, types, counter) => (
				movePool.includes('hypervoice') || !counter.get('Normal') && types.has('Ground')
			),
			Poison: (movePool, moves, abilities, types, counter) => !counter.get('Poison'),
			Psychic: (movePool, moves, abilities, types, counter) => (
				!counter.get('Psychic') && (
					movePool.includes('calmmind') || ['Bug', 'Electric', 'Fairy', 'Fighting', 'Flying', 'Poison'].some(t => types.has(t))
				)
			),
			Rock: (movePool, moves, abilities, types, counter, species) => (!counter.get('Rock') && species.baseStats.atk >= 80),
			Steel: (movePool, moves, abilities, types, counter, species) => (!counter.get('Steel') && species.baseStats.atk >= 100),
			Water: (movePool, moves, abilities, types, counter) => !counter.get('Water'),
		};
		// Nature Power is Tri Attack this gen
		this.cachedStatusMoves = this.dex.moves.all()
			.filter(move => move.category === 'Status' && move.id !== 'naturepower')
			.map(move => move.id);
	}

	override cullMovePool(
		types: Set<string>,
		moves: Set<string>,
		abilities: string[],
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): void {
		// Pokemon cannot have multiple Hidden Powers in any circumstance
		let hasHiddenPower = false;
		for (const move of moves) {
			if (move.startsWith('hiddenpower')) hasHiddenPower = true;
		}
		if (hasHiddenPower) {
			let movePoolHasHiddenPower = true;
			while (movePoolHasHiddenPower) {
				movePoolHasHiddenPower = false;
				for (const moveid of movePool) {
					if (moveid.startsWith('hiddenpower')) {
						this.fastPop(movePool, movePool.indexOf(moveid));
						movePoolHasHiddenPower = true;
						break;
					}
				}
			}
		}

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
		if (teamDetails.statusCure) {
			if (movePool.includes('aromatherapy')) this.fastPop(movePool, movePool.indexOf('aromatherapy'));
			if (movePool.includes('healbell')) this.fastPop(movePool, movePool.indexOf('healbell'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}

		const statusMoves = this.cachedStatusMoves;
		const statusInflictingMoves = ["nuzzle", 'thunderwave', 'toxic', 'willowisp', 'yawn'];

		// General incompatibilities
		const incompatiblePairs = [
			// These moves don't mesh well with other aspects of the set
			[statusMoves, ['healingwish', 'switcheroo', 'trick']],
			[PIVOT_MOVES, PIVOT_MOVES],
			[SETUP, PIVOT_MOVES],
			[SETUP, HAZARDS],
			[SETUP, ['defog', 'haze', 'toxic']],
			[PHYSICAL_SETUP, PHYSICAL_SETUP],
			[SPEED_SETUP, 'quickattack'],
			['curse', ['irondefense', 'rapidspin']],
			['defog', HAZARDS],
			['uturn', 'trick'],
			['substitute', PIVOT_MOVES],

			// These attacks are redundant with each other
			['psychic', 'psyshock'],
			[['scald', 'surf'], ['hydropump', 'originpulse']],
			['lavaplume', 'magmastorm'],
			['flamethrower', ['fireblast', 'overheat']],
			['hornleech', 'woodhammer'],
			['gigadrain', 'leafstorm'],
			['airslash', 'hurricane'],
			['thunderbolt', 'discharge'],
			['dracometeor', 'dragonpulse'],
			['dragonclaw', 'outrage'],

			// Status move incompatibilities
			['taunt', 'encore'],
			[statusInflictingMoves, 'toxicspikes'],

			// Assorted hardcodes go here:
			// Jirachi
			['bodyslam', 'healingwish'],
			// Druddigon
			['glare', 'suckerpunch'],
			// Zapdos-Galar
			['stompingtantrum', 'throatchop'],
		];

		for (const pair of incompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

		if (!types.has('Dark') && preferredType !== 'Dark') {
			this.incompatibleMoves(moves, movePool, 'knockoff', 'suckerpunch');
		}

		if (role !== 'Staller') {
			this.incompatibleMoves(moves, movePool, statusInflictingMoves, statusInflictingMoves);
		}

		// This space reserved for assorted hardcodes that otherwise make little sense out of context:
		// To force Will-O-Wisp on Corsola-Galar
		if (species.id === 'corsolagalar') this.incompatibleMoves(moves, movePool, 'haze', 'stealthrock');
	}

	// Generate random moveset for a given species, role, preferred type.
	override randomMoveset(
		types: Set<string>,
		abilities: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		movePool: string[],
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): Set<string> {
		const moves = new Set<string>();
		let counter = this.queryMoves(moves, species, preferredType, abilities);
		this.cullMovePool(types, moves, abilities, counter, movePool, teamDetails, species, isLead,
			preferredType, role);

		// If there are only four moves, add all moves and return early
		if (movePool.length <= this.maxMoveCount) {
			// Still need to ensure that multiple Hidden Powers are not added (if maxMoveCount is increased)
			while (movePool.length) {
				const moveid = this.sample(movePool);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
			return moves;
		}

		const runEnforcementChecker = (checkerName: string) => {
			if (!this.moveEnforcementCheckers[checkerName]) return false;
			return this.moveEnforcementCheckers[checkerName](
				movePool, moves, abilities, types, counter, species, teamDetails, isLead, false, preferredType, role
			);
		};

		// Add required move (e.g. Relic Song for Meloetta-P)
		if (species.requiredMove) {
			const move = this.dex.moves.get(species.requiredMove).id;
			counter = this.addMove(move, moves, types, abilities, teamDetails, species, isLead,
				movePool, preferredType, role);
		}

		// Add other moves you really want to have, e.g. STAB, recovery, setup.

		// Enforce Facade if Guts is a possible ability
		if (movePool.includes('facade') && abilities.includes('Guts')) {
			counter = this.addMove('facade', moves, types, abilities, teamDetails, species, isLead,
				movePool, preferredType, role);
		}

		// Enforce Aurora Veil, Blizzard, Night Shade, Seismic Toss, Spore, and Sticky Web
		for (const moveid of ['auroraveil', 'blizzard', 'nightshade', 'seismictoss', 'spore', 'stickyweb']) {
			if (movePool.includes(moveid)) {
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce hazard removal on Bulky Support if the team doesn't already have it
		if (role === 'Bulky Support' && !teamDetails.defog && !teamDetails.rapidSpin) {
			if (movePool.includes('rapidspin')) {
				counter = this.addMove('rapidspin', moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
			if (movePool.includes('defog')) {
				counter = this.addMove('defog', moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce Knock Off on pure Normal- and Fighting-types
		if (types.size === 1 && (types.has('Normal') || types.has('Fighting'))) {
			if (movePool.includes('knockoff')) {
				counter = this.addMove('knockoff', moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce Body Press on sets with Acid Armor or Iron Defense
		if (movePool.includes('acidarmor') || movePool.includes('irondefense')) {
			if (movePool.includes('bodypress')) {
				counter = this.addMove('bodypress', moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce STAB priority
		if (['Bulky Attacker', 'Wallbreaker'].includes(role) || this.priorityPokemon.includes(species.id)) {
			const priorityMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, preferredType);
				if (types.has(moveType) && move.priority > 0 && (move.basePower || move.basePowerCallback)) {
					priorityMoves.push(moveid);
				}
			}
			if (priorityMoves.length) {
				const moveid = this.sample(priorityMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce STAB
		for (const type of types) {
			// Check if a STAB move of that type should be required
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, preferredType);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && type === moveType) {
					stabMoves.push(moveid);
				}
			}
			while (runEnforcementChecker(type)) {
				if (!stabMoves.length) break;
				const moveid = this.sampleNoReplace(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce Preferred Type
		if (!counter.get(preferredType)) {
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, preferredType);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && preferredType === moveType) {
					stabMoves.push(moveid);
				}
			}
			if (stabMoves.length) {
				const moveid = this.sample(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// If no STAB move was added, add a STAB move
		if (!counter.get('stab')) {
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, preferredType);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && types.has(moveType)) {
					stabMoves.push(moveid);
				}
			}
			if (stabMoves.length) {
				const moveid = this.sample(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce recovery
		if (['Bulky Support', 'Bulky Attacker', 'Bulky Setup', 'Staller'].includes(role)) {
			const recoveryMoves = movePool.filter(moveid => RECOVERY_MOVES.includes(moveid));
			if (recoveryMoves.length) {
				const moveid = this.sample(recoveryMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce Staller moves
		if (role === 'Staller') {
			const enforcedMoves = [...PROTECT_MOVES, 'toxic'];
			for (const move of enforcedMoves) {
				if (movePool.includes(move)) {
					counter = this.addMove(move, moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
			}
		}

		// Enforce pivoting moves on AV Pivot
		if (role === 'AV Pivot') {
			const pivotMoves = movePool.filter(moveid => ['uturn', 'voltswitch'].includes(moveid));
			if (pivotMoves.length) {
				const moveid = this.sample(pivotMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce setup
		if (role.includes('Setup') || role === 'Dynamax User') {
			// First, try to add a non-Speed setup move
			const nonSpeedSetupMoves = movePool.filter(moveid => SETUP.includes(moveid) && !SPEED_SETUP.includes(moveid));
			if (nonSpeedSetupMoves.length) {
				const moveid = this.sample(nonSpeedSetupMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			} else {
				// No non-Speed setup moves, so add any (Speed) setup move
				const setupMoves = movePool.filter(moveid => SETUP.includes(moveid));
				if (setupMoves.length) {
					const moveid = this.sample(setupMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
			}
		}

		// Enforce Fighting and Flying type attacks on Dynamax User
		if (role === 'Dynamax User') {
			if (!counter.get('Fighting')) {
				const fightingMoves = [];
				for (const moveid of movePool) {
					const move = this.dex.moves.get(moveid);
					const moveType = this.getMoveType(move, species, abilities, preferredType);
					if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && moveType === 'Fighting') {
						fightingMoves.push(moveid);
					}
				}
				if (fightingMoves.length) {
					const moveid = this.sample(fightingMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
			}
			if (!counter.get('Flying')) {
				const flyingMoves = [];
				for (const moveid of movePool) {
					const move = this.dex.moves.get(moveid);
					const moveType = this.getMoveType(move, species, abilities, preferredType);
					if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && moveType === 'Flying') {
						flyingMoves.push(moveid);
					}
				}
				if (flyingMoves.length) {
					const moveid = this.sample(flyingMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
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
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce coverage move
		if (['Fast Attacker', 'Setup Sweeper', 'Bulky Attacker', 'Wallbreaker', 'Dynamax User'].includes(role)) {
			if (counter.damagingMoves.size === 1) {
				// Find the type of the current attacking move
				const currentAttackType = counter.damagingMoves.values().next().value!.type;
				// Choose an attacking move that is of different type to the current single attack
				const coverageMoves = [];
				for (const moveid of movePool) {
					const move = this.dex.moves.get(moveid);
					const moveType = this.getMoveType(move, species, abilities, preferredType);
					if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback)) {
						if (currentAttackType !== moveType) coverageMoves.push(moveid);
					}
				}
				if (coverageMoves.length) {
					const moveid = this.sample(coverageMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
			}
		}

		// Choose remaining moves randomly from movepool and add them to moves list:
		while (moves.size < this.maxMoveCount && movePool.length) {
			const moveid = this.sample(movePool);
			counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
				movePool, preferredType, role);
			for (const pair of MOVE_PAIRS) {
				if (moveid === pair[0] && movePool.includes(pair[1])) {
					counter = this.addMove(pair[1], moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
				if (moveid === pair[1] && movePool.includes(pair[0])) {
					counter = this.addMove(pair[0], moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
			}
		}
		return moves;
	}

	override shouldCullAbility(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		abilities: string[],
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
	): boolean {
		switch (ability) {
		case 'Prankster':
			return !counter.get('Status');
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Swarm':
			return !counter.get('Bug');
		}

		return false;
	}

	override getAbility(
		types: Set<string>,
		moves: Set<string>,
		abilities: string[],
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
	): string {
		if (abilities.length <= 1) return abilities[0];

		// Hard-code abilities here
		if (species.baseSpecies === 'Venusaur') return counter.get('Grass') ? 'Overgrow' : 'Chlorophyll';
		if (['tornadus', 'thundurus'].includes(species.id) && (counter.get('Status') || !counter.get('Physical'))) {
			return 'Prankster';
		}
		if (species.id === 'marowak' && counter.get('recoil')) return 'Rock Head';
		if (species.id === 'clefable' && moves.has('teleport')) return 'Magic Guard';

		const abilityAllowed: string[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilities) {
			if (!this.shouldCullAbility(ability, types, moves, abilities, counter, teamDetails, species)) {
				abilityAllowed.push(ability);
			}
		}

		// Pick a random allowed ability
		if (abilityAllowed.length >= 1) return this.sample(abilityAllowed);

		// Pick a random ability
		return this.sample(abilities);
	}

	override getPriorityItem(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): string | undefined {
		if (species.requiredItems) return this.sample(species.requiredItems);
		if (species.id === 'pikachu') return 'Light Ball';
		if (species.id === 'pheromosa') return 'Life Orb';
		if (role === 'AV Pivot') return 'Assault Vest';
		if (species.id === 'regieleki') return 'Magnet';
		if (['farfetchd', 'sirfetchd'].includes(species.id)) return 'Leek';
		if (species.baseSpecies === 'Marowak') return 'Thick Club';
		if (species.id === 'unfezant' || moves.has('focusenergy')) return 'Scope Lens';
		if (species.id === 'wobbuffet') return 'Custap Berry';
		if (ability === 'Harvest' || ability === 'Cheek Pouch') return 'Sitrus Berry';
		if (species.id === 'ditto' || (species.id === 'magnezone' && role === 'Fast Attacker')) return 'Choice Scarf';
		if (species.id === 'froslass') return 'Wide Lens';
		if (ability === 'Speed Boost') return 'Life Orb';
		if (types.has('Normal') && counter.get('Normal') && moves.has('fakeout')) return 'Silk Scarf';
		if (moves.has('clangoroussoul') || (species.id === 'toxtricity' && moves.has('shiftgear'))) return 'Throat Spray';
		if (species.id === 'palkia' && counter.get('Status')) return 'Lustrous Orb';
		if (species.id === 'xurkitree' && moves.has('hypnosis')) return 'Blunder Policy';
		if (['healingwish', 'switcheroo', 'trick'].some(m => moves.has(m))) {
			if (species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && role !== 'Wallbreaker' && !counter.get('priority')) {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (['latias', 'latios'].includes(species.id)) return 'Soul Dew';
		if (moves.has('bellydrum')) {
			if (ability === 'Gluttony') {
				return `${this.sample(['Aguav', 'Figy', 'Iapapa', 'Mago', 'Wiki'])} Berry`;
			} else if (moves.has('substitute')) {
				return 'Salac Berry';
			} else {
				return 'Sitrus Berry';
			}
		}
		if (['boltbeak', 'dragonenergy', 'fishiousrend', 'waterspout'].some(m => moves.has(m))) {
			if (counter.get('Flying')) {
				return 'Choice Band';
			}
			return 'Choice Scarf';
		}
		if (moves.has('geomancy') || moves.has('meteorbeam')) return 'Power Herb';
		if (moves.has('shellsmash')) return (ability === 'Sturdy') ? 'Heavy-Duty Boots' : 'White Herb';
		if (ability === 'Guts' && moves.has('facade')) return types.has('Fire') ? 'Toxic Orb' : 'Flame Orb';
		if (ability === 'Magic Guard') return moves.has('counter') ? 'Focus Sash' : 'Life Orb';
		if (ability === 'Sheer Force' && counter.get('sheerforce')) return 'Life Orb';
		if (ability === 'Unburden') return moves.has('closecombat') ? 'White Herb' : 'Sitrus Berry';
		if (moves.has('acrobatics')) return '';
		if (moves.has('auroraveil') || moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (this.dex.getEffectiveness('Rock', species) >= 2 || ability === 'Multiscale') return 'Heavy-Duty Boots';
		if (species.nfe) return 'Eviolite';
		if (moves.has('rest') && !moves.has('sleeptalk') && !['Natural Cure', 'Shed Skin'].includes(ability)) {
			return 'Chesto Berry';
		}
		if (role === 'Staller' && PROTECT_MOVES.some(m => moves.has(m))) return 'Leftovers';
	}

	override getItem(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): string {
		const lifeOrbReqs = ['flamecharge', 'nuzzle', 'rapidspin'].every(m => !moves.has(m));
		const defensiveStatTotal = species.baseStats.hp + species.baseStats.def + species.baseStats.spd;

		if (
			species.id !== 'jirachi' && (counter.get('Physical') >= moves.size) &&
			['dragontail', 'fakeout', 'firstimpression', 'flamecharge', 'nuzzle', 'rapidspin'].every(m => !moves.has(m))
		) {
			const scarfReqs = (
				role !== 'Wallbreaker' && (role !== 'Dynamax User' || !counter.get('Flying')) &&
				(species.baseStats.atk >= 100 || ability === 'Huge Power' || ability === 'Pure Power') &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 109 && !counter.get('priority')
			);
			return (scarfReqs && this.randomChance(1, 2)) ? 'Choice Scarf' : 'Choice Band';
		}

		if (
			(counter.get('Special') >= moves.size) ||
			(counter.get('Special') >= moves.size - 1 && ['flipturn', 'uturn'].some(m => moves.has(m)))
		) {
			const scarfReqs = (
				role !== 'Wallbreaker' &&
				species.baseStats.spa >= 100 &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Tinted Lens' && !moves.has('uturn') && !counter.get('priority')
			);
			return (scarfReqs && this.randomChance(1, 2)) ? 'Choice Scarf' : 'Choice Specs';
		}

		if (role === 'Bulky Setup' && !!counter.get('speedsetup') && counter.get('Status') <= 1) {
			return 'Weakness Policy';
		}
		if (!counter.get('Status') && (
			['Fast Support', 'Bulky Support', 'Bulky Attacker'].some(m => role === m)
		)) {
			return 'Assault Vest';
		}
		if (moves.has('substitute')) return 'Leftovers';
		if (
			moves.has('stickyweb') && isLead &&
			(species.baseStats.hp + species.baseStats.def + species.baseStats.spd) <= 235
		) return 'Focus Sash';
		if (
			this.dex.getEffectiveness('Rock', species) >= 1 || species.id === 'sawk' && ability === 'Sturdy'
		) return 'Heavy-Duty Boots';
		if (
			(moves.has('teleport') || (
				role === 'Fast Support' &&
				[...PIVOT_MOVES, 'defog', 'rapidspin'].some(m => moves.has(m)) &&
				!types.has('Flying') && ability !== 'Levitate'
			))
		) return 'Heavy-Duty Boots';

		// Low Priority
		if (moves.has('dragondance') && role === 'Bulky Setup') return 'Weakness Policy';
		if (moves.has('outrage') && counter.get('setup')) return 'Lum Berry';
		if (
			(ability === 'Rough Skin') || (
				ability === 'Regenerator' && (role === 'Bulky Support' || role === 'Bulky Attacker') &&
				(species.baseStats.hp + species.baseStats.def) >= 180 && this.randomChance(1, 2)
			) || (
				ability !== 'Regenerator' && !counter.get('setup') && counter.get('recovery') &&
				this.dex.getEffectiveness('Fighting', species) < 1 &&
				(species.baseStats.hp + species.baseStats.def) > 200 && this.randomChance(1, 2)
			)
		) return 'Rocky Helmet';
		if (['kingsshield', 'protect', 'spikyshield'].some(m => moves.has(m))) return 'Leftovers';
		if (['Bulky Attacker', 'Bulky Support', 'Bulky Setup'].some(m => role === (m))) return 'Leftovers';
		if (
			role === 'Fast Support' && isLead && defensiveStatTotal < 255 &&
			!counter.get('recovery') && (counter.get('hazards') || counter.get('setup')) &&
			!counter.get('recoil')
		) return 'Focus Sash';

		// Default Items
		if (role === 'Fast Support') {
			return (
				counter.get('Physical') + counter.get('Special') > counter.get('Status') && lifeOrbReqs
			) ? 'Life Orb' : 'Leftovers';
		}
		if (
			lifeOrbReqs && ['Fast Attacker', 'Setup Sweeper', 'Wallbreaker', 'Dynamax User'].some(m => role === (m))
		) return 'Life Orb';
		return 'Leftovers';
	}

	override randomSet(
		species: string | Species,
		teamDetails: RandomTeamsTypes.TeamDetails = {},
		isLead = false
	): RandomTeamsTypes.RandomSet {
		const ruleTable = this.dex.formats.getRuleTable(this.format);

		species = this.dex.species.get(species);
		const forme = this.getForme(species);
		const gmax = species.name.endsWith('-Gmax');
		const sets = this.randomSets[species.id]["sets"];
		const possibleSets = [];

		for (const set of sets) {
			// Prevent multiple Dynamax users
			if (teamDetails.dynamaxUser && set.role === 'Dynamax User') continue;
			possibleSets.push(set);
		}

		const set = this.sampleIfArray(possibleSets);
		const role = set.role;
		const movePool: string[] = [];
		for (const movename of set.movepool) {
			movePool.push(this.dex.moves.get(movename).id);
		}
		const preferredTypes = set.preferredTypes;
		const preferredType = this.sampleIfArray(preferredTypes) || '';

		let ability = '';
		let item = undefined;

		const evs = { hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85 };
		const ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };

		const types = new Set(species.types);
		const baseAbilities = set.abilities!;
		// Use the mega's ability for moveset generation
		const abilities = (species.battleOnly && !species.requiredAbility) ? Object.values(species.abilities) : baseAbilities;

		// Get moves
		const moves = this.randomMoveset(types, abilities, teamDetails, species, isLead, movePool,
			preferredType, role);
		const counter = this.queryMoves(moves, species, preferredType, abilities);

		// Get ability
		ability = this.getAbility(types, moves, baseAbilities, counter, teamDetails, species);

		// Get items
		item = this.getPriorityItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);
		if (item === undefined) {
			item = this.getItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);
		}

		// For Trick / Switcheroo
		if (item === 'Leftovers' && types.has('Poison')) {
			item = 'Black Sludge';
		}

		const level = this.getLevel(species);

		// Minimize confusion damage
		const noAttackStatMoves = [...moves].every(m => {
			const move = this.dex.moves.get(m);
			if (move.damageCallback || move.damage) return true;
			if (move.id === 'shellsidearm') return false;
			// Foul Play counts as a Physical move for EVs/IVs consideration, due to Dynamax.
			return move.category !== 'Physical' || move.id === 'bodypress';
		});
		if (
			noAttackStatMoves && !moves.has('copycat') && !moves.has('transform') &&
			this.format.mod !== 'partnersincrime' && !ruleTable.has('forceofthefallenmod')
		) {
			evs.atk = 0;
			ivs.atk = 0;
		}

		if (ability === 'Beast Boost' && !counter.get('Special')) {
			evs.spa = 0;
			ivs.spa = 0;
		}

		// Prepare optimal HP
		const srImmunity = ability === 'Magic Guard' || item === 'Heavy-Duty Boots';
		const srWeakness = srImmunity ? 0 : this.dex.getEffectiveness('Rock', species);
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if (moves.has('substitute') && !['Black Sludge', 'Leftovers'].includes(item)) {
				if (item === 'Sitrus Berry' || item === 'Salac Berry' || ability === 'Power Construct') {
					// Two Substitutes should activate Sitrus Berry or Power Construct
					if (hp % 4 === 0) break;
				} else {
					// Should be able to use Substitute four times from full HP without fainting
					if (hp % 4 > 0) break;
				}
			} else if (moves.has('bellydrum') && (item === 'Sitrus Berry' || ability === 'Gluttony')) {
				// Belly Drum should activate Sitrus Berry
				if (hp % 2 === 0) break;
			} else if (['highjumpkick', 'jumpkick'].some(m => moves.has(m))) {
				// Crash damage move users want an odd HP to survive two misses
				if (hp % 2 > 0) break;
			} else {
				// Maximize number of Stealth Rock switch-ins
				if (srWeakness <= 0 || ability === 'Regenerator') break;
				if (srWeakness === 1 && ['Black Sludge', 'Leftovers', 'Life Orb'].includes(item)) break;
				if (item !== 'Sitrus Berry' && hp % (4 / srWeakness) > 0) break;
				// Minimise number of Stealth Rock switch-ins to activate Sitrus Berry
				if (item === 'Sitrus Berry' && hp % (4 / srWeakness) === 0) break;
			}
			evs.hp -= 4;
		}

		// Ensure Nihilego's Beast Boost gives it Special Attack boosts instead of Special Defense
		if (forme === 'Nihilego') {
			while (evs.spd > 1) {
				const spa = Math.floor(Math.floor(2 * species.baseStats.spa + ivs.spa + Math.floor(evs.spa / 4)) * level / 100 + 5);
				const spd = Math.floor(Math.floor(2 * species.baseStats.spd + ivs.spd + Math.floor(evs.spd / 4)) * level / 100 + 5);
				if (spa >= spd) break;
				evs.spd -= 4;
			}
		}

		if (['gyroball', 'metalburst', 'trickroom'].some(m => moves.has(m))) {
			evs.spe = 0;
			ivs.spe = 0;
		}

		// shuffle moves to add more randomness to camomons
		const shuffledMoves = Array.from(moves);
		this.prng.shuffle(shuffledMoves);

		return {
			name: species.baseSpecies,
			species: forme,
			speciesId: species.id,
			gender: species.gender || (this.random(2) ? 'F' : 'M'),
			shiny: this.randomChance(1, 1024),
			gigantamax: gmax,
			level,
			moves: shuffledMoves,
			ability,
			evs,
			ivs,
			item,
			role,
		};
	}

	/**
	 * Checks if the new species is compatible with the other mons currently on the team.
	 */
	override getPokemonCompatibility(
		species: Species,
		pokemon: RandomTeamsTypes.RandomSet[],
	): boolean {
		const webSetters = [
			'shuckle', 'galvantula', 'vikavolt', 'ribombee', 'araquanid', 'orbeetle',
		];
		const screenSetters = ['meowstic', 'grimmsnarlgmax', 'ninetalesalola', 'abomasnow', 'vanilluxe', 'aurorus'];
		const noDynamaxMons = ['zacian', 'zaciancrowned', 'zamazenta', 'zamazentacrowned', 'eternatus'];

		const sunSetters = ['ninetales', 'torkoal', 'groudon'];
		// const rainSetters = ['politoed', 'pelipper', 'kyogre'];
		const sandSetters = ['tyranitar', 'hippowdon', 'gigalith'];
		const hailSetters = ['ninetalesalola', 'abomasnow', 'vanilluxe', 'aurorus'];

		const incompatibilityList = [
			// These Pokemon with support roles are considered too similar to each other.
			['blissey', 'chansey'],

			// These combinations are prevented to avoid double webs or screens.
			[webSetters, webSetters],
			[screenSetters, screenSetters],

			// These Pokemon are incompatible because the presence of one actively harms the other.
			// Prevent Dry Skin + sun setting ability
			[['jynx', 'toxicroak', 'heliolisk'], sunSetters],
			// Prevent Shedinja + sand/hail setting ability
			['shedinja', [...sandSetters, ...hailSetters]],
			// Prevent Zoroark + Pokemon that can't dynamax
			['zoroark', noDynamaxMons],
		];

		for (const pair of incompatibilityList) {
			const monsArrayA = (Array.isArray(pair[0])) ? pair[0] : [pair[0]];
			const monsArrayB = (Array.isArray(pair[1])) ? pair[1] : [pair[1]];
			if (monsArrayB.includes(species.id)) {
				if (pokemon.some(m => monsArrayA.includes(m.speciesId!))) return false;
			}
			if (monsArrayA.includes(species.id)) {
				if (pokemon.some(m => monsArrayB.includes(m.speciesId!))) return false;
			}
		}

		return true;
	}

	override randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const seed = this.prng.getSeed();
		const ruleTable = this.dex.formats.getRuleTable(this.format);
		const pokemon: RandomTeamsTypes.RandomSet[] = [];

		// For Monotype
		const isMonotype = !!this.forceMonotype || ruleTable.has('sametypeclause');
		const typePool = this.dex.types.names().filter(name => name !== "Stellar");
		const type = this.forceMonotype || this.sample(typePool);

		const baseFormes: { [k: string]: number } = {};

		const typeCount: { [k: string]: number } = {};
		const typeComboCount: { [k: string]: number } = {};
		const typeWeaknesses: { [k: string]: number } = {};
		const typeDoubleWeaknesses: { [k: string]: number } = {};
		const teamDetails: RandomTeamsTypes.TeamDetails = {};
		let numMaxLevelPokemon = 0;

		const pokemonList = Object.keys(this.randomSets);
		const [pokemonPool, baseSpeciesPool] = this.getPokemonPool(type, pokemon, isMonotype, pokemonList);
		while (baseSpeciesPool.length && pokemon.length < this.maxTeamSize) {
			const baseSpecies = this.sampleNoReplace(baseSpeciesPool);
			const species = this.dex.species.get(this.sample(pokemonPool[baseSpecies]));
			if (!species.exists) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[species.baseSpecies]) continue;

			// Illusion shouldn't be on the last slot
			if (species.name === 'Zoroark' && pokemon.length >= (this.maxTeamSize - 1)) continue;

			// If the team already has a Dynamax User, don't generate another one
			if (
				teamDetails.dynamaxUser &&
				this.randomSets[species.id]["sets"].length === 1 && this.randomSets[species.id]["sets"][0]["role"] === 'Dynamax User'
			) continue;

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
						if (typeDoubleWeaknesses[typeName] >= limitFactor) {
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
				if (!this.adjustLevel && (this.getLevel(species) === 100) && numMaxLevelPokemon >= limitFactor) {
					continue;
				}

				// Check compatibility with team
				if (!this.getPokemonCompatibility(species, pokemon)) continue;
			}

			// Limit three of any type combination in Monotype
			if (!this.forceMonotype && isMonotype && (typeComboCount[typeCombo] >= 3 * limitFactor)) continue;

			const set = this.randomSet(species, teamDetails, pokemon.length === 0);
			pokemon.push(set);

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
			if (set.moves.includes('aromatherapy') || set.moves.includes('healbell')) teamDetails.statusCure = 1;
			if (set.moves.includes('spikes')) teamDetails.spikes = (teamDetails.spikes || 0) + 1;
			if (set.moves.includes('toxicspikes')) teamDetails.toxicSpikes = 1;
			if (set.moves.includes('stealthrock')) teamDetails.stealthRock = 1;
			if (set.moves.includes('stickyweb')) teamDetails.stickyWeb = 1;
			if (set.moves.includes('defog')) teamDetails.defog = 1;
			if (set.moves.includes('rapidspin')) teamDetails.rapidSpin = 1;
			if (set.moves.includes('auroraveil') || (set.moves.includes('reflect') && set.moves.includes('lightscreen'))) {
				teamDetails.screens = 1;
			}
			if (set.role === 'Dynamax User') teamDetails.dynamaxUser = 1;
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
				gender: species.gender || (this.random(2) ? 'F' : 'M'),
				item: this.sampleIfArray(setData.item) || '',
				ability: (this.sampleIfArray(setData.ability)),
				shiny: this.randomChance(1, 1024),
				level: this.adjustLevel || 100,
				evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, ...setData.evs },
				nature: setData.nature,
				ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...setData.ivs },
				moves: setData.moves.map((move: any) => this.sampleIfArray(move)),
			};
			if (this.adjustLevel) set.level = this.adjustLevel;
			pokemon.push(set);
		}
		return pokemon;
	}

	randomOldGenFactorySets: {
		[format: string]: { [species: string]: BattleFactorySpecies },
	} = {};

	override randomFactorySet(
		species: Species, teamData: RandomTeamsTypes.FactoryTeamDetails, tier: string
	): RandomTeamsTypes.RandomFactorySet | null {
		const id = toID(species.name);
		const setList = this.randomOldGenFactorySets[tier][id].sets;

		const itemsMax: { [k: string]: number } = {
			choicespecs: 1,
			choiceband: 1,
			choicescarf: 1,
		};
		const movesMax: { [k: string]: number } = {
			rapidspin: 1,
			batonpass: 1,
			stealthrock: 1,
			defog: 1,
			spikes: 1,
			toxicspikes: 1,
		};
		const requiredMoves: { [k: string]: string } = {
			stealthrock: 'hazardSet',
			rapidspin: 'hazardClear',
			defog: 'hazardClear',
		};
		const weatherAbilities = ['drizzle', 'drought', 'snowwarning', 'sandstream'];

		// Build a pool of eligible sets, given the team partners
		// Also keep track of sets with moves the team requires
		let effectivePool: { set: AnyObject, moveVariants?: number[], item?: string, ability?: string }[] = [];
		const priorityPool = [];
		for (const curSet of setList) {
			// if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			// reject disallowed items, specifically a second of any given choice item
			const allowedItems: string[] = [];
			for (const itemString of curSet.item) {
				const item = this.dex.items.get(itemString);
				if (itemsMax[item.id] && teamData.has[item.id] >= itemsMax[item.id]) continue;
				allowedItems.push(itemString);
			}
			if (allowedItems.length === 0) continue;
			const curSetItem = this.sample(allowedItems);

			// reject 2+ weather setters
			const allowedAbilities: string[] = [];
			for (const abilityString of curSet.ability) {
				const ability = this.dex.abilities.get(abilityString);
				if (teamData.weather && weatherAbilities.includes(ability.id)) continue;
				allowedAbilities.push(abilityString);
			}
			if (allowedAbilities.length === 0) continue;
			const curSetAbility = this.sample(allowedAbilities);

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

			const fullSetSpec = { set: curSet, moveVariants: curSetVariants, item: curSetItem, ability: curSetAbility };
			effectivePool.push(fullSetSpec);
			if (hasRequiredMove) priorityPool.push(fullSetSpec);
		}
		if (priorityPool.length) effectivePool = priorityPool;

		if (!effectivePool.length) {
			if (!teamData.forceResult) return null;
			for (const curSet of setList) {
				effectivePool.push({ set: curSet });
			}
		}

		const setData = this.sample(effectivePool);
		const moves = [];
		for (const [i, moveSlot] of setData.set.moves.entries()) {
			moves.push(setData.moveVariants ? moveSlot[setData.moveVariants[i]] : this.sample(moveSlot));
		}

		const item = setData.item || this.sampleIfArray(setData.set.item);
		const ability = setData.ability || this.sampleIfArray(setData.set.ability);
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
			evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, ...setData.set.evs },
			ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...setData.set.ivs },
			nature: nature || 'Serious',
			moves,
		};
	}

	override randomFactoryTeam(side: PlayerOptions, depth = 0): RandomTeamsTypes.RandomFactorySet[] {
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

		const tierValues: { [k: string]: number } = {
			Uber: 5,
			OU: 4, UUBL: 4,
			UU: 3, RUBL: 3,
			RU: 2, NUBL: 2,
			NU: 1, PUBL: 1,
			PU: 0,
		};

		const pokemon = [];
		const pokemonPool = Object.keys(this.randomOldGenFactorySets[this.factoryTier]);

		// const typePool = this.dex.types.names();
		// const type = this.sample(typePool);

		const teamData: TeamData = {
			typeCount: {}, typeComboCount: {}, baseFormes: {},
			has: {}, forceResult, weaknesses: {}, resistances: {},
		};
		const requiredMoveFamilies = ['hazardSet', 'hazardClear'];
		const requiredMoves: { [k: string]: string } = {
			stealthrock: 'hazardSet',
			rapidspin: 'hazardClear',
			defog: 'hazardClear',
		};
		const weatherAbilitiesSet: { [k: string]: string } = {
			drizzle: 'raindance',
			drought: 'sunnyday',
			snowwarning: 'hail',
			sandstream: 'sandstorm',
		};
		const resistanceAbilities: { [k: string]: string[] } = {
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

			// const speciesFlags = this.randomOldGenFactorySets[this.factoryTier][species.id].flags;

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
				if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
					typeCombo = set.ability;
				}
				if (teamData.typeComboCount[typeCombo] >= limitFactor) continue;
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

	override randomBSSFactorySets: AnyObject = {};

	override randomBSSFactorySet(
		species: Species, teamData: RandomTeamsTypes.FactoryTeamDetails
	): RandomTeamsTypes.RandomFactorySet | null {
		const id = toID(species.name);
		const setList = this.randomBSSFactorySets[id].sets;

		const movesMax: { [k: string]: number } = {
			batonpass: 1,
			stealthrock: 1,
			toxicspikes: 1,
			trickroom: 1,
			auroraveil: 1,
		};

		const requiredMoves: { [k: string]: number } = {};

		// Build a pool of eligible sets, given the team partners
		// Also keep track of sets with moves the team requires
		let effectivePool: { set: AnyObject, moveVariants?: number[], itemVariants?: number, abilityVariants?: number }[] = [];
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
			const set = { set: curSet, moveVariants: curSetMoveVariants };
			effectivePool.push(set);
			if (hasRequiredMove) priorityPool.push(set);
		}
		if (priorityPool.length) effectivePool = priorityPool;

		if (!effectivePool.length) {
			if (!teamData.forceResult) return null;
			for (const curSet of setList) {
				effectivePool.push({ set: curSet });
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
			evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, ...setData.set.evs },
			ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...setData.set.ivs },
			nature: setData.set.nature || 'Serious',
			moves,
		};
	}

	override randomBSSFactoryTeam(side: PlayerOptions, depth = 0): RandomTeamsTypes.RandomFactorySet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const forceResult = (depth >= 4);

		const pokemon = [];

		const pokemonPool = Object.keys(this.randomBSSFactorySets);

		const teamData: TeamData = {
			typeCount: {}, typeComboCount: {}, baseFormes: {}, has: {}, forceResult,
			weaknesses: {}, resistances: {},
		};
		const weatherAbilitiesSet: { [k: string]: string } = {
			drizzle: 'raindance',
			drought: 'sunnyday',
			snowwarning: 'hail',
			sandstream: 'sandstorm',
		};
		const resistanceAbilities: { [k: string]: string[] } = {
			waterabsorb: ['Water'],
			flashfire: ['Fire'],
			lightningrod: ['Electric'], voltabsorb: ['Electric'],
			thickfat: ['Ice', 'Fire'],
			levitate: ['Ground'],
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
				score: this.prng.random() ** (1 / this.randomBSSFactorySets[speciesName].usage),
			};
			shuffledSpecies.push(sortObject);
		}
		shuffledSpecies.sort((a, b) => a.score - b.score);

		while (shuffledSpecies.length && pokemon.length < this.maxTeamSize) {
			// repeated popping from weighted shuffle is equivalent to repeated weighted sampling without replacement
			const specie = shuffledSpecies.pop()!.speciesName;
			const species = this.dex.species.get(specie);
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
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
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

export default RandomGen8Teams;
