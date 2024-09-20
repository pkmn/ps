import {MoveCounter} from './gen8';
import {RandomGen6Teams} from './gen6';
import {Utils} from './utils';
import {
	Ability,
	Format,
	ModdedDex,
	PRNG,
	PRNGSeed,
	RandomTeamsTypes,
	Species,
	StatID,
	toID,
} from '@pkmn/sim';

/* eslint-disable */
const randomSetsJSON = {"venusaur":{"level":84,"sets":[{"role":"Staller","movepool":["gigadrain","leechseed","sleeppowder","sludgebomb","substitute"],"abilities":["Chlorophyll","Overgrow"]},{"role":"Bulky Attacker","movepool":["earthquake","leafstorm","sleeppowder","sludgebomb","synthesis"],"abilities":["Chlorophyll","Overgrow"]}]},"charizard":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["airslash","dragonpulse","fireblast","focusblast","hiddenpowergrass","roost"],"abilities":["Blaze","Solar Power"]},{"role":"Bulky Attacker","movepool":["airslash","earthquake","fireblast","roost","willowisp"],"abilities":["Blaze","Solar Power"]},{"role":"Setup Sweeper","movepool":["acrobatics","dragondance","earthquake","flareblitz","swordsdance"],"abilities":["Blaze"]}]},"blastoise":{"level":83,"sets":[{"role":"Spinner","movepool":["icebeam","rapidspin","roar","scald","toxic"],"abilities":["Torrent"]},{"role":"Staller","movepool":["haze","icebeam","protect","scald","toxic"],"abilities":["Torrent"]}]},"butterfree":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["bugbuzz","quiverdance","sleeppowder","substitute"],"abilities":["Tinted Lens"]},{"role":"Bulky Setup","movepool":["bugbuzz","quiverdance","roost","sleeppowder"],"abilities":["Tinted Lens"]}]},"beedrill":{"level":97,"sets":[{"role":"Fast Support","movepool":["drillrun","poisonjab","toxicspikes","uturn"],"abilities":["Swarm"]}]},"pidgeot":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","heatwave","return","roost","uturn","workup"],"abilities":["Big Pecks"]},{"role":"Wallbreaker","movepool":["bravebird","quickattack","return","uturn"],"abilities":["Big Pecks"]}]},"raticate":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["crunch","facade","flamewheel","protect","suckerpunch","swordsdance","uturn"],"abilities":["Guts"],"preferredTypes":["Dark"]}]},"fearow":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","drillpeck","drillrun","return","uturn"],"abilities":["Sniper"]},{"role":"Fast Attacker","movepool":["doubleedge","drillpeck","drillrun","return","roost"],"abilities":["Sniper"]}]},"arbok":{"level":91,"sets":[{"role":"Setup Sweeper","movepool":["coil","earthquake","glare","gunkshot","suckerpunch"],"abilities":["Intimidate"]},{"role":"Bulky Attacker","movepool":["coil","earthquake","gunkshot","suckerpunch"],"abilities":["Intimidate"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["coil","earthquake","gunkshot","rest"],"abilities":["Shed Skin"],"preferredTypes":["Ground"]}]},"pikachu":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["extremespeed","grassknot","hiddenpowerice","voltswitch","volttackle"],"abilities":["Lightning Rod"]}]},"raichu":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["encore","focusblast","grassknot","hiddenpowerice","nastyplot","thunderbolt","voltswitch"],"abilities":["Lightning Rod"]}]},"sandslash":{"level":87,"sets":[{"role":"Spinner","movepool":["earthquake","rapidspin","stealthrock","stoneedge","toxic"],"abilities":["Sand Rush"]},{"role":"Bulky Setup","movepool":["earthquake","stoneedge","swordsdance","xscissor"],"abilities":["Sand Rush"]}]},"nidoqueen":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["earthpower","fireblast","icebeam","sludgewave","stealthrock","toxicspikes"],"abilities":["Sheer Force"],"preferredTypes":["Ice"]}]},"nidoking":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["earthpower","fireblast","icebeam","sludgewave","substitute","superpower"],"abilities":["Sheer Force"],"preferredTypes":["Ice"]}]},"clefable":{"level":85,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","doubleedge","fireblast","softboiled","stealthrock","thunderwave"],"abilities":["Magic Guard"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","softboiled","thunderbolt"],"abilities":["Magic Guard","Unaware"]}]},"ninetales":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["fireblast","hypnosis","nastyplot","solarbeam","willowisp"],"abilities":["Drought"],"preferredTypes":["Grass"]},{"role":"Setup Sweeper","movepool":["fireblast","hiddenpowerrock","nastyplot","solarbeam","substitute"],"abilities":["Drought"],"preferredTypes":["Grass"]}]},"wigglytuff":{"level":96,"sets":[{"role":"Fast Support","movepool":["doubleedge","protect","thunderwave","toxic","wish"],"abilities":["Frisk"]},{"role":"Bulky Support","movepool":["bodyslam","fireblast","healbell","protect","stealthrock","wish"],"abilities":["Frisk"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Frisk"]}]},"vileplume":{"level":88,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","gigadrain","hiddenpowerground","leechseed","sleeppowder","sludgebomb","synthesis"],"abilities":["Effect Spore"]}]},"parasect":{"level":98,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","leechseed","seedbomb","spore","stunspore","synthesis","xscissor"],"abilities":["Dry Skin"],"preferredTypes":["Bug"]},{"role":"Bulky Attacker","movepool":["aromatherapy","leechseed","seedbomb","spore","stunspore","xscissor"],"abilities":["Dry Skin"]},{"role":"Staller","movepool":["leechseed","protect","spore","xscissor"],"abilities":["Dry Skin"]}]},"venomoth":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["bugbuzz","quiverdance","roost","sleeppowder"],"abilities":["Tinted Lens"]},{"role":"Setup Sweeper","movepool":["bugbuzz","quiverdance","sleeppowder","substitute"],"abilities":["Tinted Lens"]}]},"dugtrio":{"level":82,"sets":[{"role":"Fast Support","movepool":["earthquake","memento","stealthrock","stoneedge","suckerpunch"],"abilities":["Arena Trap"]}]},"persian":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["bite","doubleedge","fakeout","hypnosis","return","seedbomb","taunt","uturn"],"abilities":["Technician"],"preferredTypes":["Dark"]}]},"golduck":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["calmmind","encore","focusblast","hydropump","icebeam","psyshock","scald"],"abilities":["Cloud Nine","Swift Swim"],"preferredTypes":["Ice"]}]},"primeape":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","honeclaws","stoneedge","uturn"],"abilities":["Defiant","Vital Spirit"]}]},"arcanine":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["closecombat","extremespeed","flareblitz","morningsun","roar","toxic","wildcharge","willowisp"],"abilities":["Intimidate"]},{"role":"Fast Attacker","movepool":["closecombat","extremespeed","flareblitz","morningsun","wildcharge"],"abilities":["Intimidate"],"preferredTypes":["Fighting"]}]},"poliwrath":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["focusblast","hydropump","icepunch","raindance"],"abilities":["Swift Swim"]},{"role":"Bulky Attacker","movepool":["circlethrow","rest","scald","sleeptalk"],"abilities":["Water Absorb"]}]},"alakazam":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["counter","focusblast","psychic","psyshock","shadowball"],"abilities":["Magic Guard"]},{"role":"Setup Sweeper","movepool":["calmmind","encore","focusblast","psychic","psyshock","shadowball","substitute"],"abilities":["Magic Guard"],"preferredTypes":["Fighting"]}]},"machamp":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["bulletpunch","dynamicpunch","earthquake","payback","stoneedge","toxic"],"abilities":["No Guard"],"preferredTypes":["Rock"]}]},"victreebel":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerground","powerwhip","sleeppowder","sludgebomb","suckerpunch"],"abilities":["Chlorophyll"]},{"role":"Setup Sweeper","movepool":["powerwhip","sludgebomb","sunnyday","weatherball"],"abilities":["Chlorophyll"]}]},"tentacruel":{"level":80,"sets":[{"role":"Bulky Support","movepool":["haze","icebeam","rapidspin","scald","sludgebomb","toxicspikes"],"abilities":["Clear Body","Liquid Ooze"]}]},"golem":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","stealthrock","stoneedge","suckerpunch","toxic"],"abilities":["Sturdy"]}]},"rapidash":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["drillrun","flareblitz","morningsun","wildcharge","willowisp"],"abilities":["Flame Body","Flash Fire"]},{"role":"Wallbreaker","movepool":["drillrun","flareblitz","megahorn","morningsun","wildcharge"],"abilities":["Flash Fire"]}]},"slowbro":{"level":83,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","psyshock","scald","slackoff","thunderwave","toxic"],"abilities":["Regenerator"]},{"role":"Staller","movepool":["calmmind","psyshock","scald","slackoff"],"abilities":["Regenerator"]},{"role":"Wallbreaker","movepool":["fireblast","icebeam","psyshock","surf","trick","trickroom"],"abilities":["Regenerator"],"preferredTypes":["Psychic"]}]},"farfetchd":{"level":100,"sets":[{"role":"Setup Sweeper","movepool":["bravebird","leafblade","quickattack","return","swordsdance"],"abilities":["Defiant"]}]},"dodrio":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["bravebird","pursuit","quickattack","return","roost"],"abilities":["Early Bird"]}]},"dewgong":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["encore","icebeam","rest","sleeptalk","surf","toxic"],"abilities":["Thick Fat"]},{"role":"Staller","movepool":["icebeam","protect","surf","toxic"],"abilities":["Thick Fat"]}]},"muk":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["brickbreak","curse","icepunch","poisonjab","rest","shadowsneak"],"abilities":["Poison Touch"],"preferredTypes":["Fighting"]}]},"cloyster":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["hydropump","iciclespear","rockblast","shellsmash"],"abilities":["Skill Link"]}]},"gengar":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["focusblast","painsplit","shadowball","sludgewave","substitute","trick","willowisp"],"abilities":["Levitate"],"preferredTypes":["Fighting"]}]},"hypno":{"level":94,"sets":[{"role":"Bulky Support","movepool":["focusblast","foulplay","protect","psychic","thunderwave","toxic","wish"],"abilities":["Insomnia"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Insomnia"]}]},"kingler":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["bodyslam","crabhammer","rockslide","superpower","swordsdance","xscissor"],"abilities":["Hyper Cutter","Sheer Force"]},{"role":"Bulky Setup","movepool":["agility","crabhammer","return","swordsdance"],"abilities":["Hyper Cutter"]}]},"electrode":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["foulplay","hiddenpowerice","signalbeam","taunt","thunderbolt","voltswitch"],"abilities":["Aftermath","Static"],"preferredTypes":["Ice"]},{"role":"Fast Support","movepool":["hiddenpowerice","thunderbolt","thunderwave","toxic","voltswitch"],"abilities":["Aftermath","Static"]}]},"exeggutor":{"level":88,"sets":[{"role":"Bulky Support","movepool":["gigadrain","hiddenpowerfire","leechseed","psychic","sleeppowder","substitute"],"abilities":["Harvest"],"preferredTypes":["Psychic"]}]},"marowak":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","firepunch","stealthrock","stoneedge","swordsdance"],"abilities":["Battle Armor","Rock Head"],"preferredTypes":["Rock"]}]},"hitmonlee":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","fakeout","rapidspin","stoneedge","suckerpunch"],"abilities":["Unburden"]},{"role":"Wallbreaker","movepool":["earthquake","highjumpkick","machpunch","stoneedge","suckerpunch"],"abilities":["Reckless"]}]},"hitmonchan":{"level":85,"sets":[{"role":"Spinner","movepool":["drainpunch","icepunch","machpunch","rapidspin","stoneedge"],"abilities":["Iron Fist"]},{"role":"Bulky Attacker","movepool":["bulkup","drainpunch","icepunch","machpunch","stoneedge"],"abilities":["Iron Fist"]}]},"weezing":{"level":88,"sets":[{"role":"Bulky Support","movepool":["fireblast","haze","painsplit","sludgebomb","willowisp"],"abilities":["Levitate"]}]},"rhydon":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","megahorn","stealthrock","stoneedge","swordsdance","toxic"],"abilities":["Lightning Rod"]}]},"chansey":{"level":83,"sets":[{"role":"Staller","movepool":["aromatherapy","seismictoss","softboiled","stealthrock","thunderwave","toxic","wish"],"abilities":["Natural Cure"]}]},"kangaskhan":{"level":86,"sets":[{"role":"Bulky Support","movepool":["doubleedge","drainpunch","earthquake","fakeout","return","suckerpunch"],"abilities":["Scrappy"]},{"role":"Bulky Attacker","movepool":["bodyslam","drainpunch","protect","return","wish"],"abilities":["Scrappy"]}]},"seaking":{"level":92,"sets":[{"role":"Fast Attacker","movepool":["drillrun","icebeam","megahorn","return","waterfall"],"abilities":["Lightning Rod"]},{"role":"Setup Sweeper","movepool":["drillrun","icebeam","megahorn","raindance","return","waterfall"],"abilities":["Swift Swim"]}]},"starmie":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["hydropump","icebeam","psyshock","recover","thunderbolt"],"abilities":["Analytic"]},{"role":"Bulky Support","movepool":["icebeam","psyshock","rapidspin","recover","scald","thunderwave"],"abilities":["Natural Cure"]}]},"mrmime":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["encore","focusblast","nastyplot","psychic","shadowball","substitute"],"abilities":["Filter"],"preferredTypes":["Fighting"]}]},"scyther":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["aerialace","brickbreak","bugbite","roost","swordsdance"],"abilities":["Technician"]}]},"jynx":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["focusblast","icebeam","lovelykiss","psychic","psyshock","trick"],"abilities":["Dry Skin"]},{"role":"Setup Sweeper","movepool":["focusblast","icebeam","lovelykiss","nastyplot","psyshock"],"abilities":["Dry Skin"]}]},"pinsir":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","stealthrock","stoneedge","swordsdance","xscissor"],"abilities":["Mold Breaker","Moxie"],"preferredTypes":["Rock"]}]},"tauros":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["bodyslam","earthquake","fireblast","rockslide","zenheadbutt"],"abilities":["Sheer Force"],"preferredTypes":["Ground"]},{"role":"Fast Attacker","movepool":["doubleedge","earthquake","stoneedge","zenheadbutt"],"abilities":["Intimidate"]}]},"gyarados":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","stoneedge","substitute","waterfall"],"abilities":["Intimidate","Moxie"]}]},"lapras":{"level":86,"sets":[{"role":"Bulky Support","movepool":["healbell","hydropump","icebeam","thunderbolt","toxic"],"abilities":["Water Absorb"]},{"role":"Staller","movepool":["hydropump","icebeam","protect","toxic"],"abilities":["Water Absorb"]}]},"ditto":{"level":86,"sets":[{"role":"Fast Support","movepool":["transform"],"abilities":["Imposter"]}]},"vaporeon":{"level":83,"sets":[{"role":"Bulky Support","movepool":["healbell","icebeam","protect","scald","wish"],"abilities":["Water Absorb"]},{"role":"Staller","movepool":["protect","scald","toxic","wish"],"abilities":["Water Absorb"]}]},"jolteon":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","signalbeam","thunderbolt","voltswitch"],"abilities":["Volt Absorb"]}]},"flareon":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["facade","flamecharge","rest","sleeptalk"],"abilities":["Guts"]},{"role":"Wallbreaker","movepool":["facade","flamecharge","protect","superpower"],"abilities":["Guts"]}]},"omastar":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","shellsmash","surf"],"abilities":["Shell Armor","Swift Swim"]}]},"kabutops":{"level":86,"sets":[{"role":"Spinner","movepool":["aquajet","rapidspin","stealthrock","stoneedge","superpower","waterfall"],"abilities":["Battle Armor","Swift Swim"]},{"role":"Fast Attacker","movepool":["aquajet","stealthrock","stoneedge","superpower","swordsdance","waterfall"],"abilities":["Battle Armor","Swift Swim"]}]},"aerodactyl":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","roost","stealthrock","stoneedge","taunt","toxic"],"abilities":["Unnerve"]},{"role":"Fast Support","movepool":["aerialace","aquatail","earthquake","pursuit","roost","stealthrock","stoneedge"],"abilities":["Unnerve"],"preferredTypes":["Ground"]}]},"snorlax":{"level":80,"sets":[{"role":"Bulky Support","movepool":["bodyslam","crunch","earthquake","rest","sleeptalk"],"abilities":["Thick Fat"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","rest","sleeptalk"],"abilities":["Thick Fat"]},{"role":"Bulky Attacker","movepool":["bodyslam","curse","earthquake","rest"],"abilities":["Thick Fat"]}]},"articuno":{"level":83,"sets":[{"role":"Staller","movepool":["icebeam","roost","substitute","toxic"],"abilities":["Pressure"]},{"role":"Bulky Support","movepool":["hurricane","icebeam","roost","substitute","toxic"],"abilities":["Pressure"]}]},"zapdos":{"level":79,"sets":[{"role":"Bulky Support","movepool":["heatwave","hiddenpowerice","roost","substitute","thunderbolt","toxic","uturn"],"abilities":["Pressure"]}]},"moltres":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","hiddenpowergrass","hurricane","roost","substitute","toxic","uturn","willowisp"],"abilities":["Pressure"]}]},"dragonair":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","outrage","rest","waterfall"],"abilities":["Shed Skin"]},{"role":"Bulky Setup","movepool":["dragondance","outrage","rest","sleeptalk"],"abilities":["Marvel Scale","Shed Skin"]}]},"dragonite":{"level":74,"sets":[{"role":"Wallbreaker","movepool":["earthquake","extremespeed","outrage","superpower"],"abilities":["Multiscale"]},{"role":"Setup Sweeper","movepool":["dragondance","earthquake","firepunch","outrage","roost"],"abilities":["Multiscale"],"preferredTypes":["Ground"]}]},"mewtwo":{"level":70,"sets":[{"role":"Fast Attacker","movepool":["aurasphere","calmmind","fireblast","psystrike","recover","shadowball"],"abilities":["Unnerve"]}]},"mew":{"level":79,"sets":[{"role":"Bulky Support","movepool":["psychic","softboiled","stealthrock","taunt","uturn","willowisp"],"abilities":["Synchronize"]},{"role":"Setup Sweeper","movepool":["aurasphere","earthpower","fireblast","nastyplot","psychic","psyshock","softboiled"],"abilities":["Synchronize"]}]},"meganium":{"level":91,"sets":[{"role":"Staller","movepool":["aromatherapy","dragontail","earthquake","gigadrain","leechseed","synthesis","toxic"],"abilities":["Overgrow"]}]},"typhlosion":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["eruption","fireblast","focusblast","hiddenpowergrass","hiddenpowerrock"],"abilities":["Blaze"]}]},"feraligatr":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","icepunch","superpower","waterfall"],"abilities":["Torrent"],"preferredTypes":["Ice"]},{"role":"Fast Attacker","movepool":["aquajet","earthquake","icepunch","superpower","swordsdance","waterfall"],"abilities":["Torrent"]}]},"furret":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["aquatail","doubleedge","firepunch","shadowclaw","trick","uturn"],"abilities":["Frisk"]}]},"noctowl":{"level":96,"sets":[{"role":"Bulky Support","movepool":["airslash","heatwave","hypervoice","roost","toxic","whirlwind"],"abilities":["Tinted Lens"],"preferredTypes":["Normal"]}]},"ledian":{"level":100,"sets":[{"role":"Staller","movepool":["acrobatics","encore","focusblast","knockoff","roost","toxic"],"abilities":["Early Bird"]}]},"ariados":{"level":97,"sets":[{"role":"Bulky Support","movepool":["poisonjab","suckerpunch","toxicspikes","xscissor"],"abilities":["Insomnia","Swarm"]}]},"crobat":{"level":82,"sets":[{"role":"Bulky Support","movepool":["bravebird","heatwave","hypnosis","roost","superfang","taunt","toxic","uturn"],"abilities":["Inner Focus"]}]},"lanturn":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["healbell","icebeam","scald","thunderbolt","thunderwave","toxic","voltswitch"],"abilities":["Volt Absorb"]}]},"xatu":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["calmmind","heatwave","psychic","roost"],"abilities":["Magic Bounce"]},{"role":"Bulky Support","movepool":["heatwave","psychic","roost","thunderwave","toxic","uturn"],"abilities":["Magic Bounce"]}]},"ampharos":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["agility","focusblast","hiddenpowerice","thunderbolt","voltswitch"],"abilities":["Static"]},{"role":"Bulky Attacker","movepool":["focusblast","healbell","hiddenpowerice","thunderbolt","toxic","voltswitch"],"abilities":["Static"]}]},"bellossom":{"level":94,"sets":[{"role":"Bulky Support","movepool":["gigadrain","hiddenpowerfire","hiddenpowerrock","leafstorm","leechseed","sleeppowder","stunspore","synthesis"],"abilities":["Chlorophyll"]}]},"azumarill":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["aquajet","doubleedge","icepunch","superpower","waterfall"],"abilities":["Huge Power"],"preferredTypes":["Ice"]},{"role":"Bulky Setup","movepool":["aquajet","bellydrum","return","waterfall"],"abilities":["Huge Power"]}]},"sudowoodo":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","stealthrock","stoneedge","suckerpunch","toxic","woodhammer"],"abilities":["Rock Head"],"preferredTypes":["Grass"]}]},"politoed":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["encore","focusblast","hiddenpowergrass","hypnosis","icebeam","rest","scald"],"abilities":["Drizzle"],"preferredTypes":["Ice"]},{"role":"Staller","movepool":["encore","icebeam","protect","scald","toxic"],"abilities":["Drizzle"]}]},"jumpluff":{"level":84,"sets":[{"role":"Fast Support","movepool":["acrobatics","encore","sleeppowder","uturn"],"abilities":["Chlorophyll"]},{"role":"Staller","movepool":["acrobatics","leechseed","sleeppowder","substitute"],"abilities":["Chlorophyll"]}]},"sunflora":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["earthpower","hiddenpowerfire","hiddenpowerice","hiddenpowerrock","leafstorm","sludgebomb"],"abilities":["Chlorophyll","Early Bird"]},{"role":"Setup Sweeper","movepool":["earthpower","hiddenpowerfire","solarbeam","sunnyday"],"abilities":["Chlorophyll"]}]},"quagsire":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icebeam","recover","scald","toxic"],"abilities":["Unaware"]}]},"espeon":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["calmmind","hiddenpowerfighting","morningsun","psychic","psyshock","signalbeam","trick"],"abilities":["Magic Bounce"]}]},"umbreon":{"level":84,"sets":[{"role":"Staller","movepool":["foulplay","protect","toxic","wish"],"abilities":["Synchronize"]},{"role":"Bulky Support","movepool":["foulplay","healbell","moonlight","toxic"],"abilities":["Synchronize"]}]},"murkrow":{"level":88,"sets":[{"role":"Bulky Support","movepool":["bravebird","foulplay","haze","roost","taunt","thunderwave"],"abilities":["Prankster"]}]},"slowking":{"level":84,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","psyshock","scald","slackoff","thunderwave","toxic"],"abilities":["Regenerator"]},{"role":"Wallbreaker","movepool":["fireblast","icebeam","psyshock","surf","trick","trickroom"],"abilities":["Regenerator"],"preferredTypes":["Psychic"]}]},"unown":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerpsychic"],"abilities":["Levitate"]}]},"wobbuffet":{"level":88,"sets":[{"role":"Bulky Support","movepool":["counter","destinybond","encore","mirrorcoat"],"abilities":["Shadow Tag"]}]},"girafarig":{"level":92,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerfighting","hypervoice","psychic","psyshock","substitute","thunderbolt"],"abilities":["Sap Sipper"]}]},"forretress":{"level":80,"sets":[{"role":"Bulky Support","movepool":["earthquake","rapidspin","spikes","stealthrock","toxic","voltswitch"],"abilities":["Sturdy"]}]},"dunsparce":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","glare","headbutt","roost"],"abilities":["Serene Grace"]},{"role":"Bulky Setup","movepool":["bodyslam","coil","earthquake","roost"],"abilities":["Serene Grace"]}]},"gligar":{"level":82,"sets":[{"role":"Staller","movepool":["earthquake","roost","stealthrock","taunt","toxic","uturn"],"abilities":["Immunity"]}]},"steelix":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["earthquake","ironhead","roar","rockslide","stealthrock","toxic"],"abilities":["Sheer Force"],"preferredTypes":["Steel"]},{"role":"Staller","movepool":["earthquake","heavyslam","protect","toxic"],"abilities":["Sturdy"]},{"role":"Bulky Support","movepool":["earthquake","heavyslam","roar","stealthrock","toxic"],"abilities":["Sturdy"]}]},"granbull":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["closecombat","crunch","healbell","return","thunderwave"],"abilities":["Intimidate"]}]},"qwilfish":{"level":84,"sets":[{"role":"Fast Support","movepool":["destinybond","spikes","taunt","thunderwave","toxicspikes","waterfall"],"abilities":["Intimidate"]}]},"scizor":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["bugbite","bulletpunch","roost","superpower","swordsdance"],"abilities":["Technician"]},{"role":"Fast Attacker","movepool":["bulletpunch","pursuit","superpower","uturn"],"abilities":["Technician"]}]},"shuckle":{"level":90,"sets":[{"role":"Bulky Support","movepool":["encore","knockoff","protect","stealthrock","toxic"],"abilities":["Sturdy"]}]},"heracross":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["closecombat","facade","megahorn","nightslash"],"abilities":["Guts"]},{"role":"Fast Attacker","movepool":["closecombat","earthquake","megahorn","nightslash","stoneedge"],"abilities":["Moxie"],"preferredTypes":["Rock"]}]},"ursaring":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["closecombat","crunch","facade","protect","swordsdance"],"abilities":["Guts","Quick Feet"]}]},"magcargo":{"level":95,"sets":[{"role":"Staller","movepool":["hiddenpowerrock","lavaplume","recover","stealthrock","toxic"],"abilities":["Flame Body"]}]},"corsola":{"level":96,"sets":[{"role":"Bulky Support","movepool":["powergem","recover","scald","stealthrock","toxic"],"abilities":["Regenerator"]}]},"octillery":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["energyball","fireblast","hydropump","icebeam","thunderwave"],"abilities":["Sniper"]}]},"delibird":{"level":100,"sets":[{"role":"Bulky Support","movepool":["icebeam","iceshard","rapidspin","seismictoss","toxic"],"abilities":["Insomnia","Vital Spirit"]}]},"mantine":{"level":90,"sets":[{"role":"Bulky Support","movepool":["airslash","rest","scald","sleeptalk","toxic"],"abilities":["Water Absorb"]},{"role":"Setup Sweeper","movepool":["airslash","hydropump","icebeam","raindance"],"abilities":["Swift Swim"]}]},"skarmory":{"level":77,"sets":[{"role":"Bulky Support","movepool":["bravebird","roost","spikes","stealthrock","whirlwind"],"abilities":["Sturdy"]},{"role":"Staller","movepool":["bravebird","roost","spikes","stealthrock","toxic"],"abilities":["Sturdy"]}]},"houndoom":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","fireblast","hiddenpowergrass","nastyplot","suckerpunch"],"abilities":["Flash Fire"]}]},"kingdra":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["dragondance","outrage","rest","substitute","waterfall"],"abilities":["Sniper","Swift Swim"]},{"role":"Setup Sweeper","movepool":["dracometeor","hydropump","icebeam","raindance","waterfall"],"abilities":["Swift Swim"]}]},"donphan":{"level":82,"sets":[{"role":"Spinner","movepool":["earthquake","iceshard","rapidspin","stealthrock","stoneedge","toxic"],"abilities":["Sturdy"],"preferredTypes":["Rock"]},{"role":"Bulky Attacker","movepool":["earthquake","gunkshot","iceshard","stealthrock","stoneedge"],"abilities":["Sturdy"],"preferredTypes":["Rock"]}]},"porygon2":{"level":82,"sets":[{"role":"Bulky Support","movepool":["discharge","icebeam","recover","toxic","triattack"],"abilities":["Download","Trace"]}]},"stantler":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","hypnosis","jumpkick","megahorn","suckerpunch","thunderwave"],"abilities":["Intimidate"],"preferredTypes":["Ground"]}]},"smeargle":{"level":85,"sets":[{"role":"Fast Support","movepool":["memento","spikes","spore","stealthrock","whirlwind"],"abilities":["Own Tempo"]}]},"hitmontop":{"level":88,"sets":[{"role":"Bulky Support","movepool":["closecombat","earthquake","rapidspin","stoneedge","suckerpunch","toxic"],"abilities":["Intimidate"]}]},"miltank":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["bodyslam","curse","earthquake","healbell","milkdrink","stealthrock","toxic"],"abilities":["Sap Sipper","Thick Fat"]}]},"blissey":{"level":84,"sets":[{"role":"Staller","movepool":["aromatherapy","seismictoss","softboiled","stealthrock","thunderwave","toxic"],"abilities":["Natural Cure"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Natural Cure"]}]},"raikou":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["aurasphere","hiddenpowerice","thunderbolt","voltswitch"],"abilities":["Pressure"]},{"role":"Bulky Setup","movepool":["aurasphere","calmmind","hiddenpowerice","substitute","thunderbolt"],"abilities":["Pressure"],"preferredTypes":["Ice"]}]},"entei":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["bulldoze","extremespeed","flareblitz","stoneedge"],"abilities":["Pressure"]},{"role":"Fast Attacker","movepool":["extremespeed","flareblitz","hiddenpowergrass","stoneedge"],"abilities":["Pressure"]}]},"suicune":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","rest","scald","sleeptalk"],"abilities":["Pressure"]},{"role":"Bulky Setup","movepool":["calmmind","hydropump","icebeam","rest","scald","substitute"],"abilities":["Pressure"]},{"role":"Staller","movepool":["calmmind","protect","scald","substitute"],"abilities":["Pressure"]}]},"tyranitar":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["crunch","earthquake","fireblast","icebeam","pursuit","stealthrock","stoneedge","superpower"],"abilities":["Sand Stream"]},{"role":"Bulky Setup","movepool":["crunch","dragondance","earthquake","firepunch","icepunch","stoneedge"],"abilities":["Sand Stream"]}]},"lugia":{"level":71,"sets":[{"role":"Staller","movepool":["aeroblast","earthquake","roost","substitute","toxic","whirlwind"],"abilities":["Multiscale"]}]},"hooh":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","earthquake","roost","sacredfire","substitute","toxic"],"abilities":["Regenerator"]}]},"celebi":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["earthpower","gigadrain","leafstorm","nastyplot","psychic","uturn"],"abilities":["Natural Cure"],"preferredTypes":["Psychic"]},{"role":"Bulky Support","movepool":["leafstorm","psychic","recover","stealthrock","thunderwave","uturn"],"abilities":["Natural Cure"]},{"role":"Bulky Setup","movepool":["leafstorm","nastyplot","psychic","recover"],"abilities":["Natural Cure"]}]},"sceptile":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["acrobatics","earthquake","leafblade","swordsdance"],"abilities":["Unburden"]},{"role":"Fast Attacker","movepool":["earthquake","focusblast","gigadrain","hiddenpowerfire","hiddenpowerice","leafstorm","rockslide"],"abilities":["Overgrow"]},{"role":"Staller","movepool":["gigadrain","hiddenpowerfire","hiddenpowerice","leechseed","substitute"],"abilities":["Overgrow"]}]},"blaziken":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["flareblitz","highjumpkick","protect","stoneedge","swordsdance"],"abilities":["Speed Boost"]},{"role":"Wallbreaker","movepool":["fireblast","highjumpkick","protect","stoneedge"],"abilities":["Speed Boost"]}]},"swampert":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icebeam","roar","scald","stealthrock","toxic"],"abilities":["Torrent"]},{"role":"Staller","movepool":["earthquake","protect","scald","toxic"],"abilities":["Torrent"]}]},"mightyena":{"level":95,"sets":[{"role":"Fast Attacker","movepool":["crunch","doubleedge","firefang","suckerpunch","taunt"],"abilities":["Intimidate"],"preferredTypes":["Fire"]}]},"linoone":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["bellydrum","extremespeed","seedbomb","shadowclaw"],"abilities":["Quick Feet"]}]},"beautifly":{"level":98,"sets":[{"role":"Setup Sweeper","movepool":["bugbuzz","hiddenpowerground","psychic","quiverdance"],"abilities":["Swarm"]}]},"dustox":{"level":93,"sets":[{"role":"Bulky Setup","movepool":["bugbuzz","hiddenpowerground","quiverdance","roost","sludgebomb"],"abilities":["Shield Dust"]}]},"ludicolo":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["gigadrain","hydropump","icebeam","raindance"],"abilities":["Swift Swim"]},{"role":"Wallbreaker","movepool":["gigadrain","hydropump","icebeam","scald"],"abilities":["Swift Swim"]}]},"shiftry":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","hiddenpowerfire","leafstorm","naturepower","suckerpunch"],"abilities":["Chlorophyll","Early Bird"]},{"role":"Setup Sweeper","movepool":["naturepower","seedbomb","suckerpunch","swordsdance"],"abilities":["Chlorophyll","Early Bird"]}]},"swellow":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["bravebird","facade","protect","uturn"],"abilities":["Guts"]},{"role":"Wallbreaker","movepool":["bravebird","facade","quickattack","uturn"],"abilities":["Guts"]}]},"pelipper":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["hurricane","roost","scald","toxic","uturn"],"abilities":["Rain Dish"]}]},"gardevoir":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["focusblast","healingwish","psychic","shadowball","thunderbolt","trick"],"abilities":["Trace"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["calmmind","focusblast","psychic","psyshock","shadowball","substitute","willowisp"],"abilities":["Trace"],"preferredTypes":["Fighting"]}]},"masquerain":{"level":92,"sets":[{"role":"Setup Sweeper","movepool":["airslash","bugbuzz","hydropump","quiverdance","roost"],"abilities":["Intimidate"]}]},"breloom":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["bulletseed","machpunch","spore","stoneedge","swordsdance"],"abilities":["Technician"]},{"role":"Bulky Attacker","movepool":["focuspunch","spore","stoneedge","substitute"],"abilities":["Poison Heal"]}]},"vigoroth":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["bodyslam","bulkup","earthquake","nightslash","return","slackoff"],"abilities":["Vital Spirit"]}]},"slaking":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["earthquake","gigaimpact","nightslash","retaliate"],"abilities":["Truant"]}]},"ninjask":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["aerialace","nightslash","swordsdance","uturn","xscissor"],"abilities":["Speed Boost"]},{"role":"Setup Sweeper","movepool":["aerialace","substitute","swordsdance","xscissor"],"abilities":["Speed Boost"]}]},"shedinja":{"level":92,"sets":[{"role":"Setup Sweeper","movepool":["shadowclaw","shadowsneak","swordsdance","willowisp","xscissor"],"abilities":["Wonder Guard"]}]},"exploud":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["fireblast","focusblast","hypervoice","icebeam","surf"],"abilities":["Scrappy"]},{"role":"Bulky Attacker","movepool":["doubleedge","earthquake","facade","lowkick"],"abilities":["Scrappy"]},{"role":"Fast Attacker","movepool":["earthquake","fireblast","focusblast","return","surf","workup"],"abilities":["Scrappy"]}]},"hariyama":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["bulletpunch","closecombat","facade","fakeout","stoneedge"],"abilities":["Guts"]},{"role":"Bulky Attacker","movepool":["bulkup","bulletpunch","closecombat","earthquake","stoneedge"],"abilities":["Thick Fat"],"preferredTypes":["Rock"]}]},"delcatty":{"level":96,"sets":[{"role":"Fast Support","movepool":["doubleedge","fakeout","healbell","suckerpunch","thunderwave","toxic"],"abilities":["Wonder Skin"]}]},"sableye":{"level":88,"sets":[{"role":"Staller","movepool":["foulplay","recover","taunt","willowisp"],"abilities":["Prankster"]},{"role":"Bulky Support","movepool":["recover","seismictoss","taunt","toxic","willowisp"],"abilities":["Prankster"]}]},"mawile":{"level":95,"sets":[{"role":"Bulky Setup","movepool":["firefang","ironhead","suckerpunch","swordsdance","thunderpunch"],"abilities":["Intimidate","Sheer Force"],"preferredTypes":["Fire"]},{"role":"Bulky Attacker","movepool":["fireblast","ironhead","stealthrock","suckerpunch","thunderpunch"],"abilities":["Intimidate","Sheer Force"],"preferredTypes":["Fire"]}]},"aggron":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["aquatail","earthquake","headsmash","heavyslam","rockpolish","stealthrock","thunderwave"],"abilities":["Rock Head"],"preferredTypes":["Ground"]}]},"medicham":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["bulletpunch","highjumpkick","icepunch","trick","zenheadbutt"],"abilities":["Pure Power"]}]},"manectric":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["flamethrower","hiddenpowerice","overheat","thunderbolt","voltswitch"],"abilities":["Lightning Rod"]}]},"plusle":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"abilities":["Plus"],"preferredTypes":["Ice"]},{"role":"Setup Sweeper","movepool":["grassknot","hiddenpowerice","nastyplot","thunderbolt"],"abilities":["Plus"]}]},"minun":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"abilities":["Minus"],"preferredTypes":["Ice"]},{"role":"Setup Sweeper","movepool":["grassknot","hiddenpowerice","nastyplot","thunderbolt"],"abilities":["Minus"]}]},"volbeat":{"level":91,"sets":[{"role":"Bulky Support","movepool":["encore","roost","thunderwave","uturn"],"abilities":["Prankster"]}]},"illumise":{"level":90,"sets":[{"role":"Bulky Support","movepool":["bugbuzz","encore","roost","thunderwave"],"abilities":["Prankster"]}]},"swalot":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","encore","icebeam","painsplit","sludgebomb","toxic","yawn"],"abilities":["Liquid Ooze"],"preferredTypes":["Ground"]},{"role":"Staller","movepool":["earthquake","protect","sludgebomb","toxic"],"abilities":["Liquid Ooze"]}]},"sharpedo":{"level":82,"sets":[{"role":"Staller","movepool":["crunch","earthquake","hydropump","icebeam","protect"],"abilities":["Speed Boost"]}]},"wailord":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowergrass","hydropump","icebeam","waterspout"],"abilities":["Water Veil"]}]},"camerupt":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","lavaplume","roar","stealthrock","toxic"],"abilities":["Solid Rock"]}]},"torkoal":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","lavaplume","rapidspin","stealthrock","yawn"],"abilities":["White Smoke"]}]},"grumpig":{"level":90,"sets":[{"role":"Bulky Support","movepool":["focusblast","healbell","psychic","thunderwave","toxic","whirlwind"],"abilities":["Thick Fat"]},{"role":"Wallbreaker","movepool":["calmmind","focusblast","psychic","psyshock","shadowball","trick"],"abilities":["Thick Fat"]}]},"spinda":{"level":98,"sets":[{"role":"Bulky Support","movepool":["feintattack","rapidspin","return","suckerpunch","superpower"],"abilities":["Contrary"],"preferredTypes":["Fighting"]}]},"flygon":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["earthquake","outrage","stoneedge","uturn"],"abilities":["Levitate"]},{"role":"Bulky Attacker","movepool":["dracometeor","earthquake","fireblast","roost","uturn"],"abilities":["Levitate"]}]},"cacturne":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","focusblast","gigadrain","spikes","suckerpunch"],"abilities":["Water Absorb"]},{"role":"Setup Sweeper","movepool":["drainpunch","seedbomb","suckerpunch","swordsdance"],"abilities":["Water Absorb"]}]},"altaria":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["dragondance","earthquake","outrage","roost"],"abilities":["Natural Cure"]},{"role":"Bulky Attacker","movepool":["dracometeor","earthquake","fireblast","haze","healbell","roost","toxic"],"abilities":["Natural Cure"]}]},"zangoose":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["closecombat","facade","nightslash","quickattack","swordsdance"],"abilities":["Toxic Boost"],"preferredTypes":["Dark"]}]},"seviper":{"level":92,"sets":[{"role":"Fast Attacker","movepool":["earthquake","flamethrower","gigadrain","sludgebomb","suckerpunch","switcheroo"],"abilities":["Shed Skin"],"preferredTypes":["Ground"]}]},"lunatone":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["earthpower","icebeam","moonlight","psychic","rockpolish"],"abilities":["Levitate"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["earthpower","hiddenpowerrock","moonlight","psychic","stealthrock","toxic"],"abilities":["Levitate"],"preferredTypes":["Psychic"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","moonlight","psychic"],"abilities":["Levitate"]}]},"solrock":{"level":90,"sets":[{"role":"Bulky Support","movepool":["earthquake","morningsun","stealthrock","stoneedge","willowisp"],"abilities":["Levitate"]}]},"whiscash":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","stoneedge","waterfall"],"abilities":["Anticipation","Hydration"]}]},"crawdaunt":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["crunch","dragondance","superpower","waterfall"],"abilities":["Adaptability"]}]},"claydol":{"level":85,"sets":[{"role":"Bulky Support","movepool":["earthquake","icebeam","psychic","rapidspin","stealthrock","toxic"],"abilities":["Levitate"]}]},"cradily":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["curse","earthquake","recover","seedbomb","stoneedge","swordsdance"],"abilities":["Storm Drain"]},{"role":"Bulky Attacker","movepool":["earthpower","gigadrain","recover","stealthrock","stoneedge","toxic"],"abilities":["Storm Drain"],"preferredTypes":["Grass"]}]},"armaldo":{"level":87,"sets":[{"role":"Spinner","movepool":["earthquake","rapidspin","stealthrock","stoneedge","toxic","xscissor"],"abilities":["Battle Armor","Swift Swim"]},{"role":"Bulky Attacker","movepool":["aquatail","earthquake","stealthrock","stoneedge","swordsdance","xscissor"],"abilities":["Battle Armor","Swift Swim"]}]},"milotic":{"level":82,"sets":[{"role":"Staller","movepool":["dragontail","haze","icebeam","recover","scald","toxic"],"abilities":["Marvel Scale"]}]},"castform":{"level":97,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","icebeam","return","scald","thunderbolt","thunderwave"],"abilities":["Forecast"]}]},"kecleon":{"level":93,"sets":[{"role":"Bulky Support","movepool":["foulplay","recover","stealthrock","thunderwave","toxic"],"abilities":["Color Change"]}]},"banette":{"level":94,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerfighting","shadowclaw","shadowsneak","thunderwave","willowisp"],"abilities":["Cursed Body","Frisk","Insomnia"]}]},"dusclops":{"level":85,"sets":[{"role":"Bulky Support","movepool":["rest","seismictoss","sleeptalk","willowisp"],"abilities":["Pressure"]}]},"tropius":{"level":94,"sets":[{"role":"Staller","movepool":["airslash","leechseed","protect","substitute"],"abilities":["Harvest"]}]},"chimecho":{"level":95,"sets":[{"role":"Bulky Support","movepool":["healbell","hiddenpowerfighting","psychic","recover","thunderwave","toxic"],"abilities":["Levitate"]},{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerfighting","psychic","psyshock","recover","signalbeam"],"abilities":["Levitate"]}]},"absol":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["nightslash","pursuit","suckerpunch","superpower","zenheadbutt"],"abilities":["Justified"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["nightslash","suckerpunch","superpower","swordsdance"],"abilities":["Justified"]}]},"glalie":{"level":91,"sets":[{"role":"Fast Support","movepool":["earthquake","icebeam","spikes","superfang","taunt"],"abilities":["Inner Focus"],"preferredTypes":["Ground"]}]},"walrein":{"level":88,"sets":[{"role":"Bulky Support","movepool":["encore","icebeam","roar","superfang","surf","toxic"],"abilities":["Thick Fat"]},{"role":"Staller","movepool":["icebeam","protect","surf","toxic"],"abilities":["Thick Fat"]}]},"huntail":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["icebeam","return","shellsmash","suckerpunch","waterfall"],"abilities":["Swift Swim","Water Veil"],"preferredTypes":["Ice"]}]},"gorebyss":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","shellsmash"],"abilities":["Swift Swim"]}]},"relicanth":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headsmash","stealthrock","toxic","waterfall","yawn"],"abilities":["Rock Head"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","headsmash","rockpolish","waterfall"],"abilities":["Rock Head"],"preferredTypes":["Ground"]}]},"luvdisc":{"level":100,"sets":[{"role":"Staller","movepool":["icebeam","protect","scald","substitute","toxic"],"abilities":["Swift Swim"]}]},"salamence":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","fireblast","outrage","roost"],"abilities":["Intimidate","Moxie"],"preferredTypes":["Ground"]}]},"metagross":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["agility","earthquake","meteormash","thunderpunch","zenheadbutt"],"abilities":["Clear Body"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["bulletpunch","earthquake","explosion","icepunch","meteormash","stealthrock","thunderpunch","zenheadbutt"],"abilities":["Clear Body"],"preferredTypes":["Ground"]}]},"regirock":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["curse","drainpunch","rest","stoneedge"],"abilities":["Clear Body"]},{"role":"Bulky Support","movepool":["drainpunch","earthquake","stealthrock","stoneedge","thunderwave","toxic"],"abilities":["Clear Body"]},{"role":"Staller","movepool":["drainpunch","earthquake","protect","rockslide","toxic"],"abilities":["Clear Body"]}]},"regice":{"level":85,"sets":[{"role":"Staller","movepool":["icebeam","protect","thunderbolt","toxic"],"abilities":["Clear Body"]},{"role":"Bulky Attacker","movepool":["focusblast","icebeam","rest","sleeptalk","thunderbolt","thunderwave"],"abilities":["Clear Body"],"preferredTypes":["Electric"]},{"role":"Setup Sweeper","movepool":["focusblast","icebeam","rockpolish","thunderbolt"],"abilities":["Clear Body"]}]},"registeel":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["curse","ironhead","rest","sleeptalk"],"abilities":["Clear Body"]},{"role":"Bulky Support","movepool":["rest","seismictoss","sleeptalk","toxic"],"abilities":["Clear Body"]},{"role":"Staller","movepool":["protect","seismictoss","stealthrock","thunderwave","toxic"],"abilities":["Clear Body"]}]},"latias":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psyshock","roost"],"abilities":["Levitate"]}]},"latios":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psyshock","roost"],"abilities":["Levitate"]}]},"kyogre":{"level":69,"sets":[{"role":"Fast Attacker","movepool":["icebeam","surf","thunder","waterspout"],"abilities":["Drizzle"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","rest","sleeptalk","surf","thunder"],"abilities":["Drizzle"]}]},"groudon":{"level":74,"sets":[{"role":"Bulky Support","movepool":["dragontail","earthquake","lavaplume","stealthrock","stoneedge","thunderwave"],"abilities":["Drought"]},{"role":"Bulky Setup","movepool":["earthquake","firepunch","rockpolish","stoneedge","swordsdance"],"abilities":["Drought"]}]},"rayquaza":{"level":73,"sets":[{"role":"Wallbreaker","movepool":["dracometeor","earthquake","extremespeed","outrage","vcreate"],"abilities":["Air Lock"]},{"role":"Setup Sweeper","movepool":["dragondance","earthquake","extremespeed","outrage","vcreate"],"abilities":["Air Lock"]},{"role":"Fast Attacker","movepool":["earthquake","extremespeed","outrage","swordsdance","vcreate"],"abilities":["Air Lock"],"preferredTypes":["Normal"]}]},"jirachi":{"level":77,"sets":[{"role":"Bulky Support","movepool":["bodyslam","firepunch","healingwish","ironhead","protect","stealthrock","toxic","uturn","wish"],"abilities":["Serene Grace"]}]},"deoxys":{"level":73,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","extremespeed","psychoboost","superpower"],"abilities":["Pressure"]},{"role":"Fast Support","movepool":["darkpulse","icebeam","psychoboost","superpower"],"abilities":["Pressure"]}]},"deoxysattack":{"level":72,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","extremespeed","psychoboost","superpower"],"abilities":["Pressure"]},{"role":"Fast Support","movepool":["darkpulse","icebeam","psychoboost","superpower"],"abilities":["Pressure"]}]},"deoxysdefense":{"level":82,"sets":[{"role":"Bulky Support","movepool":["recover","seismictoss","spikes","stealthrock","taunt","toxic"],"abilities":["Pressure"]}]},"deoxysspeed":{"level":77,"sets":[{"role":"Fast Support","movepool":["psychoboost","spikes","stealthrock","superpower","taunt"],"abilities":["Pressure"]}]},"torterra":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","stealthrock","stoneedge","synthesis","woodhammer"],"abilities":["Overgrow"]},{"role":"Bulky Setup","movepool":["earthquake","rockpolish","stoneedge","woodhammer"],"abilities":["Overgrow"]}]},"infernape":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["closecombat","grassknot","machpunch","overheat","stealthrock"],"abilities":["Blaze","Iron Fist"]},{"role":"Fast Attacker","movepool":["closecombat","flareblitz","machpunch","stoneedge","swordsdance","uturn"],"abilities":["Blaze","Iron Fist"]}]},"empoleon":{"level":80,"sets":[{"role":"Staller","movepool":["icebeam","protect","scald","stealthrock","toxic"],"abilities":["Torrent"]},{"role":"Bulky Support","movepool":["icebeam","roar","scald","stealthrock","toxic"],"abilities":["Torrent"]},{"role":"Setup Sweeper","movepool":["agility","grassknot","hydropump","icebeam"],"abilities":["Torrent"]}]},"staraptor":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["bravebird","closecombat","doubleedge","quickattack","uturn"],"abilities":["Reckless"],"preferredTypes":["Fighting"]}]},"bibarel":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["curse","quickattack","return","waterfall"],"abilities":["Simple"]}]},"kricketune":{"level":100,"sets":[{"role":"Setup Sweeper","movepool":["aerialace","brickbreak","bugbite","nightslash","swordsdance"],"abilities":["Technician"]}]},"luxray":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["crunch","facade","superpower","wildcharge"],"abilities":["Guts"]},{"role":"Bulky Attacker","movepool":["crunch","icefang","superpower","voltswitch","wildcharge"],"abilities":["Intimidate"],"preferredTypes":["Fighting"]}]},"roserade":{"level":83,"sets":[{"role":"Fast Support","movepool":["gigadrain","hiddenpowerground","leafstorm","sleeppowder","sludgebomb","spikes","synthesis","toxicspikes"],"abilities":["Natural Cure"]}]},"rampardos":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","firepunch","rockpolish","rockslide","zenheadbutt"],"abilities":["Sheer Force"]},{"role":"Fast Attacker","movepool":["earthquake","firepunch","headsmash","rockslide"],"abilities":["Sheer Force"]}]},"bastiodon":{"level":90,"sets":[{"role":"Bulky Support","movepool":["metalburst","roar","rockblast","stealthrock","toxic"],"abilities":["Sturdy"]},{"role":"Staller","movepool":["metalburst","protect","roar","rockblast","stealthrock","toxic"],"abilities":["Sturdy"]}]},"wormadam":{"level":100,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerground","hiddenpowerrock","leafstorm","signalbeam","synthesis","toxic"],"abilities":["Anticipation","Overcoat"]},{"role":"Staller","movepool":["gigadrain","protect","signalbeam","synthesis","toxic"],"abilities":["Anticipation","Overcoat"]}]},"wormadamsandy":{"level":92,"sets":[{"role":"Staller","movepool":["earthquake","protect","stealthrock","suckerpunch","toxic"],"abilities":["Anticipation"]}]},"wormadamtrash":{"level":89,"sets":[{"role":"Staller","movepool":["flashcannon","protect","stealthrock","suckerpunch","toxic"],"abilities":["Anticipation"]}]},"mothim":{"level":94,"sets":[{"role":"Setup Sweeper","movepool":["airslash","bugbuzz","hiddenpowerground","quiverdance","substitute"],"abilities":["Tinted Lens"]}]},"vespiquen":{"level":98,"sets":[{"role":"Staller","movepool":["acrobatics","roost","toxic","uturn"],"abilities":["Pressure"]}]},"pachirisu":{"level":93,"sets":[{"role":"Bulky Support","movepool":["superfang","thunderbolt","thunderwave","toxic","uturn"],"abilities":["Volt Absorb"]},{"role":"Staller","movepool":["protect","thunderbolt","toxic","uturn"],"abilities":["Volt Absorb"]}]},"floatzel":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["aquajet","crunch","icepunch","lowkick","switcheroo","waterfall"],"abilities":["Water Veil"],"preferredTypes":["Ice"]},{"role":"Setup Sweeper","movepool":["aquajet","bulkup","crunch","icepunch","lowkick","substitute","waterfall"],"abilities":["Water Veil"],"preferredTypes":["Ice"]}]},"cherrim":{"level":95,"sets":[{"role":"Fast Attacker","movepool":["gigadrain","healingwish","hiddenpowerfire","hiddenpowerrock","morningsun","naturepower"],"abilities":["Flower Gift"]},{"role":"Staller","movepool":["aromatherapy","gigadrain","leechseed","morningsun","naturepower","toxic"],"abilities":["Flower Gift"]}]},"gastrodon":{"level":84,"sets":[{"role":"Bulky Support","movepool":["clearsmog","earthquake","icebeam","recover","scald","toxic"],"abilities":["Storm Drain"]}]},"ambipom":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["fakeout","lowkick","payback","pursuit","return","uturn"],"abilities":["Technician"]}]},"drifblim":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["acrobatics","destinybond","disable","shadowball","substitute","willowisp"],"abilities":["Unburden"]}]},"lopunny":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["healingwish","icepunch","jumpkick","return","switcheroo"],"abilities":["Limber"]}]},"mismagius":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["destinybond","hiddenpowerfighting","painsplit","shadowball","substitute","taunt","willowisp"],"abilities":["Levitate"]},{"role":"Wallbreaker","movepool":["hiddenpowerfighting","nastyplot","shadowball","thunderbolt","trick"],"abilities":["Levitate"]}]},"honchkrow":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["bravebird","heatwave","pursuit","roost","suckerpunch","superpower"],"abilities":["Moxie"]}]},"purugly":{"level":89,"sets":[{"role":"Fast Support","movepool":["fakeout","hypnosis","return","shadowclaw","uturn"],"abilities":["Defiant","Thick Fat"]},{"role":"Setup Sweeper","movepool":["honeclaws","hypnosis","irontail","return"],"abilities":["Defiant","Thick Fat"]}]},"skuntank":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["crunch","fireblast","poisonjab","pursuit","suckerpunch","taunt"],"abilities":["Aftermath"]}]},"bronzong":{"level":80,"sets":[{"role":"Bulky Support","movepool":["earthquake","hypnosis","psychic","stealthrock","toxic"],"abilities":["Levitate"]},{"role":"Staller","movepool":["earthquake","protect","psychic","toxic"],"abilities":["Levitate"]}]},"chatot":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["chatter","heatwave","hiddenpowerground","hypervoice","nastyplot","uturn"],"abilities":["Tangled Feet"]},{"role":"Setup Sweeper","movepool":["chatter","heatwave","hiddenpowerground","hypervoice","nastyplot","substitute"],"abilities":["Tangled Feet"]}]},"spiritomb":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["calmmind","darkpulse","rest","sleeptalk"],"abilities":["Pressure"]},{"role":"Bulky Attacker","movepool":["foulplay","painsplit","pursuit","suckerpunch","willowisp"],"abilities":["Pressure"]}]},"garchomp":{"level":75,"sets":[{"role":"Fast Support","movepool":["earthquake","fireblast","outrage","stealthrock","stoneedge"],"abilities":["Rough Skin"]},{"role":"Fast Attacker","movepool":["earthquake","firefang","outrage","stoneedge","swordsdance"],"abilities":["Rough Skin"]}]},"lucario":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["closecombat","crunch","extremespeed","stoneedge","swordsdance"],"abilities":["Justified"],"preferredTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["aurasphere","flashcannon","nastyplot","vacuumwave"],"abilities":["Inner Focus"]}]},"hippowdon":{"level":82,"sets":[{"role":"Bulky Support","movepool":["earthquake","slackoff","stealthrock","stoneedge","toxic","whirlwind"],"abilities":["Sand Stream"]}]},"drapion":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["aquatail","crunch","earthquake","poisonjab","pursuit","swordsdance"],"abilities":["Battle Armor"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["crunch","earthquake","poisonjab","taunt","toxicspikes","whirlwind"],"abilities":["Battle Armor"]}]},"toxicroak":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["drainpunch","earthquake","icepunch","poisonjab","substitute","suckerpunch","swordsdance"],"abilities":["Dry Skin"]}]},"carnivine":{"level":98,"sets":[{"role":"Bulky Support","movepool":["knockoff","powerwhip","sleeppowder","synthesis"],"abilities":["Levitate"]}]},"lumineon":{"level":89,"sets":[{"role":"Bulky Support","movepool":["icebeam","scald","toxic","uturn"],"abilities":["Storm Drain"]},{"role":"Staller","movepool":["icebeam","protect","scald","toxic","uturn"],"abilities":["Storm Drain"]},{"role":"Bulky Attacker","movepool":["hiddenpowergrass","icebeam","scald","toxic"],"abilities":["Storm Drain"]}]},"abomasnow":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","earthquake","iceshard","woodhammer"],"abilities":["Snow Warning"]}]},"weavile":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["icepunch","iceshard","lowkick","nightslash","pursuit","swordsdance"],"abilities":["Pressure"]}]},"magnezone":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["flashcannon","hiddenpowerfire","hiddenpowerice","thunderbolt","voltswitch"],"abilities":["Magnet Pull"]}]},"lickilicky":{"level":87,"sets":[{"role":"Bulky Support","movepool":["bodyslam","healbell","protect","toxic","wish"],"abilities":["Cloud Nine"]},{"role":"Bulky Setup","movepool":["bodyslam","earthquake","explosion","powerwhip","return","swordsdance"],"abilities":["Cloud Nine"],"preferredTypes":["Ground"]}]},"rhyperior":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icepunch","megahorn","rockpolish","stoneedge","swordsdance"],"abilities":["Solid Rock"]}]},"tangrowth":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","hiddenpowerfire","leafstorm","leechseed","powerwhip","rockslide","sleeppowder","synthesis"],"abilities":["Regenerator"]},{"role":"Bulky Support","movepool":["earthquake","hiddenpowerfire","leafstorm","powerwhip","rockslide","sleeppowder"],"abilities":["Regenerator"]}]},"electivire":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["crosschop","earthquake","flamethrower","icepunch","voltswitch","wildcharge"],"abilities":["Motor Drive"],"preferredTypes":["Ice"]}]},"magmortar":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["earthquake","fireblast","focusblast","hiddenpowerice","taunt","thunderbolt"],"abilities":["Flame Body","Vital Spirit"],"preferredTypes":["Electric"]}]},"togekiss":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["airslash","aurasphere","nastyplot","roost","thunderwave"],"abilities":["Serene Grace"]},{"role":"Bulky Attacker","movepool":["airslash","healbell","roost","thunderwave"],"abilities":["Serene Grace"]},{"role":"Fast Attacker","movepool":["airslash","aurasphere","fireblast","trick"],"abilities":["Serene Grace"]}]},"yanmega":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["airslash","bugbuzz","hiddenpowerground","protect"],"abilities":["Speed Boost"]},{"role":"Wallbreaker","movepool":["airslash","bugbuzz","hiddenpowerground","uturn"],"abilities":["Tinted Lens"]}]},"leafeon":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","leafblade","swordsdance","synthesis","xscissor"],"abilities":["Chlorophyll"],"preferredTypes":["Normal"]}]},"glaceon":{"level":91,"sets":[{"role":"Bulky Support","movepool":["healbell","hiddenpowerground","icebeam","protect","wish"],"abilities":["Ice Body"]},{"role":"Staller","movepool":["icebeam","protect","toxic","wish"],"abilities":["Ice Body"]}]},"gliscor":{"level":78,"sets":[{"role":"Bulky Support","movepool":["earthquake","protect","substitute","toxic"],"abilities":["Poison Heal"]},{"role":"Staller","movepool":["earthquake","facade","roost","stealthrock","stoneedge","taunt","toxic","uturn"],"abilities":["Poison Heal"]},{"role":"Setup Sweeper","movepool":["earthquake","facade","roost","swordsdance"],"abilities":["Poison Heal"]}]},"mamoswine":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["earthquake","iceshard","iciclecrash","stealthrock"],"abilities":["Thick Fat"]},{"role":"Fast Attacker","movepool":["earthquake","iceshard","iciclecrash","stoneedge","superpower"],"abilities":["Thick Fat"]}]},"porygonz":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","hiddenpowerfighting","icebeam","nastyplot","thunderbolt","triattack","trick"],"abilities":["Adaptability","Download"]}]},"gallade":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["closecombat","nightslash","shadowsneak","swordsdance","trick","zenheadbutt"],"abilities":["Justified"]}]},"probopass":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","powergem","stealthrock","thunderwave","toxic","voltswitch"],"abilities":["Magnet Pull"]}]},"dusknoir":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icepunch","painsplit","shadowsneak","toxic","trick","willowisp"],"abilities":["Pressure"],"preferredTypes":["Ground"]},{"role":"Staller","movepool":["earthquake","protect","shadowsneak","toxic"],"abilities":["Pressure"]}]},"froslass":{"level":82,"sets":[{"role":"Fast Support","movepool":["destinybond","icebeam","shadowball","spikes","taunt","thunderwave"],"abilities":["Cursed Body"]}]},"rotom":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","painsplit","shadowball","thunderbolt","trick","voltswitch","willowisp"],"abilities":["Levitate"]}]},"rotomheat":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerice","overheat","painsplit","thunderbolt","thunderwave","trick","voltswitch","willowisp"],"abilities":["Levitate"]}]},"rotomwash":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["hydropump","painsplit","thunderbolt","thunderwave","trick","voltswitch","willowisp"],"abilities":["Levitate"]}]},"rotomfrost":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","painsplit","substitute","thunderbolt","trick","voltswitch","willowisp"],"abilities":["Levitate"]}]},"rotomfan":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["airslash","painsplit","substitute","thunderbolt","trick","voltswitch","willowisp"],"abilities":["Levitate"]}]},"rotommow":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerice","leafstorm","painsplit","thunderbolt","thunderwave","trick","voltswitch","willowisp"],"abilities":["Levitate"]}]},"uxie":{"level":79,"sets":[{"role":"Bulky Support","movepool":["healbell","psychic","stealthrock","thunderwave","uturn","yawn"],"abilities":["Levitate"]}]},"mesprit":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["calmmind","healingwish","hiddenpowerfighting","icebeam","psychic","psyshock","signalbeam","thunderbolt","trick","uturn"],"abilities":["Levitate"]},{"role":"Bulky Support","movepool":["hiddenpowerfighting","psychic","stealthrock","thunderwave","toxic","uturn"],"abilities":["Levitate"]}]},"azelf":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["fireblast","nastyplot","psychic","psyshock","signalbeam","thunderbolt","trick","uturn"],"abilities":["Levitate"],"preferredTypes":["Fire"]},{"role":"Fast Support","movepool":["explosion","fireblast","psychic","stealthrock","taunt","uturn"],"abilities":["Levitate"]}]},"dialga":{"level":70,"sets":[{"role":"Bulky Attacker","movepool":["aurasphere","dracometeor","dragontail","fireblast","stealthrock","thunderbolt","toxic"],"abilities":["Pressure"],"preferredTypes":["Fire"]}]},"palkia":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","fireblast","hydropump","spacialrend","thunderwave"],"abilities":["Pressure"],"preferredTypes":["Fire"]}]},"heatran":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["earthpower","eruption","fireblast","hiddenpowerice"],"abilities":["Flash Fire"]},{"role":"Bulky Attacker","movepool":["earthpower","fireblast","hiddenpowerice","lavaplume","roar","stealthrock","toxic"],"abilities":["Flash Fire"],"preferredTypes":["Ground"]},{"role":"Staller","movepool":["earthpower","magmastorm","protect","toxic"],"abilities":["Flash Fire"]}]},"regigigas":{"level":83,"sets":[{"role":"Staller","movepool":["earthquake","return","substitute","thunderwave"],"abilities":["Slow Start"]}]},"giratina":{"level":70,"sets":[{"role":"Fast Support","movepool":["dragonpulse","dragontail","rest","sleeptalk","willowisp"],"abilities":["Pressure"]},{"role":"Bulky Setup","movepool":["calmmind","dragonpulse","rest","sleeptalk"],"abilities":["Pressure"]}]},"giratinaorigin":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["dracometeor","earthquake","outrage","shadowball","shadowsneak","willowisp"],"abilities":["Levitate"]}]},"cresselia":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerfighting","moonlight","psyshock","signalbeam"],"abilities":["Levitate"]},{"role":"Bulky Support","movepool":["hiddenpowerfighting","moonlight","psychic","thunderwave","toxic"],"abilities":["Levitate"]}]},"phione":{"level":89,"sets":[{"role":"Staller","movepool":["raindance","rest","scald","toxic"],"abilities":["Hydration"]},{"role":"Bulky Support","movepool":["healbell","icebeam","scald","toxic","uturn"],"abilities":["Hydration"]}]},"manaphy":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["energyball","icebeam","surf","tailglow"],"abilities":["Hydration"]}]},"darkrai":{"level":70,"sets":[{"role":"Setup Sweeper","movepool":["darkpulse","darkvoid","focusblast","nastyplot"],"abilities":["Bad Dreams"]},{"role":"Bulky Setup","movepool":["darkpulse","darkvoid","nastyplot","substitute"],"abilities":["Bad Dreams"]}]},"shaymin":{"level":83,"sets":[{"role":"Fast Support","movepool":["airslash","earthpower","leechseed","seedflare","substitute","synthesis"],"abilities":["Natural Cure"],"preferredTypes":["Flying"]}]},"shayminsky":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["airslash","earthpower","hiddenpowerice","leechseed","seedflare","substitute"],"abilities":["Serene Grace"]}]},"arceus":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","shadowclaw","swordsdance"],"abilities":["Multitype"],"preferredTypes":["Ground"]}]},"arceusbug":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"],"abilities":["Multitype"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment"],"abilities":["Multitype"]}]},"arceusdark":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","focusblast","judgment","recover","refresh"],"abilities":["Multitype"]}]},"arceusdragon":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","outrage","recover","swordsdance"],"abilities":["Multitype"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover","refresh"],"abilities":["Multitype"]}]},"arceuselectric":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","icebeam","judgment","recover"],"abilities":["Multitype"]}]},"arceusfighting":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","darkpulse","icebeam","judgment","recover"],"abilities":["Multitype"]}]},"arceusfire":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment","recover","thunderbolt"],"abilities":["Multitype"]}]},"arceusflying":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover","refresh"],"abilities":["Multitype"]}]},"arceusghost":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","focusblast","judgment","recover","willowisp"],"abilities":["Multitype"]}]},"arceusgrass":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","fireblast","judgment","recover"],"abilities":["Multitype"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment"],"abilities":["Multitype"]}]},"arceusground":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","stoneedge","swordsdance"],"abilities":["Multitype"],"preferredTypes":["Rock"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","judgment","recover"],"abilities":["Multitype"]}]},"arceusice":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover","thunderbolt"],"abilities":["Multitype"]}]},"arceuspoison":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","earthpower","fireblast","recover","sludgebomb"],"abilities":["Multitype"],"preferredTypes":["Ground"]},{"role":"Bulky Attacker","movepool":["earthquake","fireblast","icebeam","recover","sludgebomb","stealthrock","willowisp"],"abilities":["Multitype"],"preferredTypes":["Ground"]}]},"arceuspsychic":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","darkpulse","focusblast","judgment","recover"],"abilities":["Multitype"],"preferredTypes":["Fighting"]}]},"arceusrock":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","stoneedge","swordsdance"],"abilities":["Multitype"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"],"abilities":["Multitype"]}]},"arceussteel":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","judgment","recover","toxic","willowisp"],"abilities":["Multitype"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover"],"abilities":["Multitype"]}]},"arceuswater":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","icebeam","judgment","recover","willowisp"],"abilities":["Multitype"]}]},"victini":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["boltstrike","uturn","vcreate","zenheadbutt"],"abilities":["Victory Star"]},{"role":"Fast Attacker","movepool":["boltstrike","energyball","focusblast","psychic","trick","uturn","vcreate"],"abilities":["Victory Star"],"preferredTypes":["Electric"]}]},"serperior":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["aromatherapy","dragonpulse","gigadrain","glare","hiddenpowerfire","leechseed","substitute"],"abilities":["Overgrow"]},{"role":"Setup Sweeper","movepool":["calmmind","dragonpulse","gigadrain","hiddenpowerfire","substitute"],"abilities":["Overgrow"]},{"role":"Wallbreaker","movepool":["aquatail","leafblade","return","swordsdance"],"abilities":["Overgrow"]}]},"emboar":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","flareblitz","headsmash","superpower","wildcharge"],"abilities":["Blaze"]},{"role":"Wallbreaker","movepool":["earthquake","fireblast","grassknot","superpower","wildcharge"],"abilities":["Blaze"]}]},"samurott":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["aquajet","grassknot","hydropump","icebeam","megahorn","superpower"],"abilities":["Torrent"]},{"role":"Wallbreaker","movepool":["aquajet","megahorn","superpower","swordsdance","waterfall"],"abilities":["Torrent"]}]},"watchog":{"level":95,"sets":[{"role":"Bulky Attacker","movepool":["crunch","hypnosis","return","superfang"],"abilities":["Analytic"]},{"role":"Setup Sweeper","movepool":["crunch","hypnosis","lowkick","return","substitute","swordsdance"],"abilities":["Analytic"],"preferredTypes":["Dark"]}]},"stoutland":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["crunch","return","superpower","thunderwave","wildcharge"],"abilities":["Scrappy"],"preferredTypes":["Fighting"]}]},"liepard":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["darkpulse","encore","hiddenpowerfighting","nastyplot","thunderwave"],"abilities":["Prankster"]}]},"simisage":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","leafstorm","rockslide","superpower"],"abilities":["Overgrow"]},{"role":"Setup Sweeper","movepool":["focusblast","gigadrain","hiddenpowerrock","nastyplot","substitute"],"abilities":["Overgrow"]}]},"simisear":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["fireblast","focusblast","grassknot","hiddenpowerrock","nastyplot","substitute"],"abilities":["Blaze"]}]},"simipour":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["grassknot","hydropump","icebeam","nastyplot","substitute"],"abilities":["Torrent"],"preferredTypes":["Ice"]}]},"musharna":{"level":86,"sets":[{"role":"Bulky Support","movepool":["healbell","hiddenpowerfighting","moonlight","psychic","signalbeam","thunderwave","toxic"],"abilities":["Synchronize"]},{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerfighting","moonlight","psyshock","signalbeam"],"abilities":["Synchronize"]}]},"unfezant":{"level":89,"sets":[{"role":"Bulky Support","movepool":["hypnosis","pluck","return","roost","toxic","uturn"],"abilities":["Super Luck"]}]},"zebstrika":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","overheat","voltswitch","wildcharge"],"abilities":["Sap Sipper"]},{"role":"Wallbreaker","movepool":["hiddenpowerice","overheat","thunderbolt","voltswitch"],"abilities":["Lightning Rod"]}]},"gigalith":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","stealthrock","stoneedge","superpower","toxic"],"abilities":["Sturdy"],"preferredTypes":["Ground"]}]},"swoobat":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["calmmind","heatwave","roost","storedpower"],"abilities":["Simple"]},{"role":"Setup Sweeper","movepool":["airslash","calmmind","heatwave","roost","storedpower"],"abilities":["Simple"]}]},"excadrill":{"level":81,"sets":[{"role":"Spinner","movepool":["earthquake","ironhead","rapidspin","swordsdance"],"abilities":["Mold Breaker","Sand Rush"]},{"role":"Setup Sweeper","movepool":["earthquake","ironhead","rockslide","swordsdance"],"abilities":["Mold Breaker","Sand Rush"]}]},"audino":{"level":93,"sets":[{"role":"Bulky Support","movepool":["doubleedge","healbell","protect","toxic","wish"],"abilities":["Regenerator"]}]},"conkeldurr":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["bulkup","drainpunch","icepunch","machpunch","thunderpunch"],"abilities":["Iron Fist"]}]},"seismitoad":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","hydropump","raindance","sludgewave"],"abilities":["Swift Swim"]},{"role":"Bulky Support","movepool":["earthquake","scald","sludgebomb","stealthrock","toxic"],"abilities":["Water Absorb"]},{"role":"Staller","movepool":["earthquake","protect","scald","toxic"],"abilities":["Water Absorb"]}]},"throh":{"level":89,"sets":[{"role":"Bulky Support","movepool":["bulkup","circlethrow","payback","rest","sleeptalk"],"abilities":["Guts"]}]},"sawk":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["bulkup","closecombat","earthquake","icepunch","stoneedge"],"abilities":["Mold Breaker","Sturdy"]}]},"leavanny":{"level":91,"sets":[{"role":"Setup Sweeper","movepool":["leafblade","return","swordsdance","xscissor"],"abilities":["Chlorophyll","Swarm"]}]},"scolipede":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["earthquake","megahorn","rockslide","spikes","swordsdance","toxicspikes"],"abilities":["Swarm"],"preferredTypes":["Ground"]}]},"whimsicott":{"level":88,"sets":[{"role":"Fast Support","movepool":["encore","gigadrain","stunspore","taunt","toxic","uturn"],"abilities":["Prankster"]},{"role":"Staller","movepool":["hurricane","leechseed","protect","substitute"],"abilities":["Prankster"]}]},"lilligant":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["gigadrain","hiddenpowerfire","hiddenpowerrock","quiverdance","sleeppowder"],"abilities":["Chlorophyll"]},{"role":"Fast Attacker","movepool":["hiddenpowerfire","hiddenpowerrock","petaldance","quiverdance","sleeppowder"],"abilities":["Own Tempo"]}]},"basculin":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["aquajet","crunch","superpower","waterfall","zenheadbutt"],"abilities":["Adaptability"]}]},"krookodile":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["crunch","earthquake","pursuit","stealthrock","stoneedge","superpower"],"abilities":["Intimidate"]}]},"darmanitan":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["earthquake","flareblitz","rockslide","superpower","uturn"],"abilities":["Sheer Force"]}]},"maractus":{"level":98,"sets":[{"role":"Fast Support","movepool":["gigadrain","hiddenpowerfire","spikes","synthesis","toxic"],"abilities":["Storm Drain","Water Absorb"]},{"role":"Staller","movepool":["gigadrain","hiddenpowerfire","hiddenpowerice","leechseed","protect"],"abilities":["Storm Drain","Water Absorb"]}]},"crustle":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","shellsmash","stoneedge","xscissor"],"abilities":["Sturdy"]}]},"scrafty":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["crunch","dragondance","highjumpkick","stoneedge","zenheadbutt"],"abilities":["Intimidate","Moxie"]},{"role":"Bulky Setup","movepool":["bulkup","crunch","drainpunch","rest"],"abilities":["Shed Skin"]}]},"sigilyph":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["airslash","calmmind","heatwave","psyshock","roost"],"abilities":["Magic Guard"]},{"role":"Wallbreaker","movepool":["airslash","energyball","heatwave","icebeam","psychic","psyshock"],"abilities":["Tinted Lens"],"preferredTypes":["Psychic"]},{"role":"Staller","movepool":["cosmicpower","psychoshift","roost","storedpower"],"abilities":["Magic Guard"]}]},"cofagrigus":{"level":87,"sets":[{"role":"Bulky Support","movepool":["haze","hiddenpowerfighting","painsplit","shadowball","willowisp"],"abilities":["Mummy"]},{"role":"Bulky Setup","movepool":["hiddenpowerfighting","nastyplot","shadowball","trickroom"],"abilities":["Mummy"]}]},"carracosta":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["aquajet","earthquake","icebeam","shellsmash","stoneedge","waterfall"],"abilities":["Solid Rock","Sturdy","Swift Swim"]}]},"archeops":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["acrobatics","earthquake","roost","stealthrock","stoneedge","uturn"],"abilities":["Defeatist"],"preferredTypes":["Ground"]}]},"garbodor":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["drainpunch","gunkshot","haze","painsplit","spikes","toxicspikes"],"abilities":["Aftermath"]}]},"zoroark":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","flamethrower","focusblast","nastyplot","trick","uturn"],"abilities":["Illusion"]}]},"cinccino":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["bulletseed","rockblast","tailslap","uturn"],"abilities":["Skill Link"]}]},"gothitelle":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","hiddenpowerfighting","psychic","signalbeam","thunderbolt","trick"],"abilities":["Shadow Tag"]}]},"reuniclus":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","focusblast","psychic","psyshock","recover","signalbeam","trickroom"],"abilities":["Magic Guard"]},{"role":"Wallbreaker","movepool":["focusblast","psychic","psyshock","shadowball","trickroom"],"abilities":["Magic Guard"]}]},"swanna":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","icebeam","roost","scald","toxic"],"abilities":["Hydration"]},{"role":"Setup Sweeper","movepool":["hurricane","raindance","rest","surf"],"abilities":["Hydration"]}]},"vanilluxe":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["autotomize","explosion","flashcannon","hiddenpowerground","icebeam"],"abilities":["Weak Armor"],"preferredTypes":["Ground"]}]},"sawsbuck":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","hornleech","naturepower","return","substitute","swordsdance"],"abilities":["Sap Sipper"],"preferredTypes":["Normal"]}]},"emolga":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["acrobatics","encore","roost","thunderbolt","toxic","uturn"],"abilities":["Motor Drive"]}]},"escavalier":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["ironhead","megahorn","pursuit","return","swordsdance"],"abilities":["Swarm"]}]},"amoonguss":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["clearsmog","foulplay","gigadrain","hiddenpowerground","sludgebomb","spore","stunspore","toxic"],"abilities":["Regenerator"]},{"role":"Bulky Support","movepool":["gigadrain","sludgebomb","spore","synthesis"],"abilities":["Regenerator"]}]},"jellicent":{"level":82,"sets":[{"role":"Bulky Support","movepool":["icebeam","recover","scald","shadowball","toxic","willowisp"],"abilities":["Water Absorb"]}]},"alomomola":{"level":85,"sets":[{"role":"Bulky Support","movepool":["protect","scald","toxic","wish"],"abilities":["Regenerator"]}]},"galvantula":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["bugbuzz","gigadrain","hiddenpowerice","thunder","voltswitch"],"abilities":["Compound Eyes"],"preferredTypes":["Bug"]}]},"ferrothorn":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["gyroball","leechseed","powerwhip","spikes","stealthrock"],"abilities":["Iron Barbs"]},{"role":"Bulky Support","movepool":["powerwhip","spikes","stealthrock","thunderwave","toxic"],"abilities":["Iron Barbs"]}]},"klinklang":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["geargrind","return","shiftgear","substitute","wildcharge"],"abilities":["Clear Body"]}]},"eelektross":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["flamethrower","gigadrain","hiddenpowerice","superpower","thunderbolt","uturn"],"abilities":["Levitate"]},{"role":"Bulky Setup","movepool":["aquatail","coil","drainpunch","firepunch","wildcharge"],"abilities":["Levitate"],"preferredTypes":["Fighting"]}]},"beheeyem":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerfighting","psychic","signalbeam","thunderbolt","trick","trickroom"],"abilities":["Analytic"]}]},"chandelure":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["energyball","fireblast","hiddenpowerfighting","shadowball","trick"],"abilities":["Flash Fire"],"preferredTypes":["Grass"]},{"role":"Bulky Setup","movepool":["calmmind","fireblast","shadowball","substitute"],"abilities":["Flame Body","Flash Fire"]}]},"haxorus":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","outrage","superpower"],"abilities":["Mold Breaker"]}]},"beartic":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["aquajet","iciclecrash","stoneedge","superpower","swordsdance"],"abilities":["Swift Swim"],"preferredTypes":["Fighting"]}]},"cryogonal":{"level":85,"sets":[{"role":"Bulky Support","movepool":["haze","hiddenpowerground","icebeam","rapidspin","recover","toxic"],"abilities":["Levitate"]}]},"accelgor":{"level":85,"sets":[{"role":"Fast Support","movepool":["bugbuzz","encore","focusblast","hiddenpowerground","hiddenpowerrock","spikes","uturn"],"abilities":["Hydration","Sticky Hold"]}]},"stunfisk":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["discharge","earthpower","rest","scald","sleeptalk","stealthrock","toxic"],"abilities":["Static"]}]},"mienshao":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["acrobatics","highjumpkick","stoneedge","substitute","swordsdance"],"abilities":["Reckless"],"preferredTypes":["Flying"]},{"role":"Fast Attacker","movepool":["fakeout","highjumpkick","stoneedge","uturn"],"abilities":["Regenerator"]},{"role":"Wallbreaker","movepool":["drainpunch","highjumpkick","stoneedge","uturn"],"abilities":["Reckless"]}]},"druddigon":{"level":84,"sets":[{"role":"Bulky Support","movepool":["dragontail","earthquake","glare","outrage","stealthrock","suckerpunch","superpower"],"abilities":["Rough Skin"]}]},"golurk":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["dynamicpunch","earthquake","icepunch","rockpolish","stealthrock","stoneedge"],"abilities":["No Guard"],"preferredTypes":["Fighting"]}]},"bisharp":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["ironhead","nightslash","pursuit","suckerpunch"],"abilities":["Defiant"]},{"role":"Setup Sweeper","movepool":["ironhead","lowkick","nightslash","suckerpunch","swordsdance"],"abilities":["Defiant"],"preferredTypes":["Fighting"]}]},"bouffalant":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headcharge","stoneedge","superpower","swordsdance"],"abilities":["Reckless","Sap Sipper"]}]},"braviary":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","bulkup","roost","superpower"],"abilities":["Defiant"]},{"role":"Fast Attacker","movepool":["bravebird","return","superpower","uturn"],"abilities":["Defiant"]}]},"mandibuzz":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","foulplay","roost","taunt","toxic","whirlwind"],"abilities":["Overcoat"]},{"role":"Staller","movepool":["foulplay","roost","taunt","toxic","whirlwind"],"abilities":["Overcoat"]}]},"heatmor":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["fireblast","gigadrain","suckerpunch","superpower"],"abilities":["Flash Fire"]}]},"durant":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["honeclaws","ironhead","rockslide","superpower","xscissor"],"abilities":["Hustle"],"preferredTypes":["Fighting"]}]},"hydreigon":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","dracometeor","fireblast","focusblast","roost","uturn"],"abilities":["Levitate"]}]},"volcarona":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["bugbuzz","fierydance","fireblast","gigadrain","hiddenpowerrock","quiverdance","roost"],"abilities":["Flame Body"]}]},"cobalion":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["closecombat","ironhead","stealthrock","stoneedge","taunt","thunderwave","toxic"],"abilities":["Justified"],"preferredTypes":["Steel"]},{"role":"Bulky Setup","movepool":["closecombat","ironhead","stoneedge","swordsdance"],"abilities":["Justified"]}]},"terrakion":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","quickattack","stealthrock","stoneedge","swordsdance"],"abilities":["Justified"],"preferredTypes":["Ground"]}]},"virizion":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["closecombat","leafblade","stoneedge","swordsdance"],"abilities":["Justified"]}]},"tornadus":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["acrobatics","bulkup","superpower","taunt"],"abilities":["Defiant"]},{"role":"Fast Attacker","movepool":["focusblast","heatwave","hurricane","uturn"],"abilities":["Defiant"]}]},"tornadustherian":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["focusblast","heatwave","hurricane","superpower","uturn"],"abilities":["Regenerator"]}]},"thundurus":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["focusblast","hiddenpowerflying","hiddenpowerice","nastyplot","substitute","thunderbolt"],"abilities":["Prankster"]},{"role":"Fast Support","movepool":["hiddenpowerflying","hiddenpowerice","superpower","taunt","thunderbolt","thunderwave"],"abilities":["Prankster"]}]},"thundurustherian":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["focusblast","hiddenpowerflying","hiddenpowerice","nastyplot","thunderbolt","voltswitch"],"abilities":["Volt Absorb"]}]},"reshiram":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["blueflare","dracometeor","flamecharge","roost","toxic"],"abilities":["Turboblaze"]}]},"zekrom":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["boltstrike","dracometeor","outrage","roost","voltswitch"],"abilities":["Teravolt"]},{"role":"Setup Sweeper","movepool":["boltstrike","honeclaws","outrage","roost","substitute"],"abilities":["Teravolt"]}]},"landorus":{"level":75,"sets":[{"role":"Wallbreaker","movepool":["earthpower","focusblast","psychic","rockpolish","rockslide","sludgewave","stealthrock"],"abilities":["Sheer Force"],"preferredTypes":["Rock"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","focusblast","psychic","rockpolish","sludgewave"],"abilities":["Sheer Force"]}]},"landorustherian":{"level":76,"sets":[{"role":"Bulky Support","movepool":["earthquake","stealthrock","stoneedge","toxic","uturn"],"abilities":["Intimidate"]},{"role":"Setup Sweeper","movepool":["earthquake","rockpolish","stoneedge","superpower","swordsdance"],"abilities":["Intimidate"],"preferredTypes":["Rock"]}]},"kyurem":{"level":77,"sets":[{"role":"Staller","movepool":["earthpower","icebeam","roost","substitute"],"abilities":["Pressure"]},{"role":"Bulky Attacker","movepool":["dracometeor","earthpower","focusblast","icebeam","outrage","roost","substitute"],"abilities":["Pressure"]}]},"kyuremblack":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","fusionbolt","icebeam","outrage","roost","substitute"],"abilities":["Teravolt"]}]},"kyuremwhite":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["dracometeor","earthpower","fusionflare","icebeam","roost"],"abilities":["Turboblaze"]}]},"keldeo":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerelectric","hiddenpowerflying","hiddenpowerice","hydropump","scald","secretsword"],"abilities":["Justified"]},{"role":"Bulky Setup","movepool":["calmmind","scald","secretsword","substitute"],"abilities":["Justified"]},{"role":"Fast Attacker","movepool":["focusblast","hydropump","scald","secretsword"],"abilities":["Justified"]}]},"meloetta":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["calmmind","focusblast","hypervoice","psyshock","uturn"],"abilities":["Serene Grace"]},{"role":"Wallbreaker","movepool":["closecombat","relicsong","return","shadowclaw"],"abilities":["Serene Grace"]}]},"genesect":{"level":73,"sets":[{"role":"Setup Sweeper","movepool":["blazekick","ironhead","shiftgear","thunderbolt","xscissor"],"abilities":["Download"]},{"role":"Wallbreaker","movepool":["blazekick","extremespeed","ironhead","uturn"],"abilities":["Download"]},{"role":"Fast Attacker","movepool":["bugbuzz","flamethrower","flashcannon","icebeam","thunderbolt","uturn"],"abilities":["Download"],"preferredTypes":["Bug"]}]}} as any;
/* eslint-enable */

// Moves that restore HP:
const RECOVERY_MOVES = [
	'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'roost', 'slackoff', 'softboiled', 'synthesis',
];
// Moves that boost Attack:
const PHYSICAL_SETUP = [
	'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'meditate', 'screech', 'swordsdance',
];
// Some moves that only boost Speed:
const SPEED_SETUP = [
	'agility', 'autotomize', 'flamecharge', 'rockpolish',
];
// Conglomerate for ease of access
const SETUP = [
	'acidarmor', 'agility', 'autotomize', 'bellydrum', 'bulkup', 'calmmind', 'coil', 'curse', 'dragondance', 'flamecharge',
	'growth', 'honeclaws', 'howl', 'irondefense', 'meditate', 'nastyplot', 'quiverdance', 'raindance', 'rockpolish',
	'shellsmash', 'shiftgear', 'sunnyday', 'swordsdance', 'tailglow', 'workup',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'aquajet', 'bulletpunch', 'chatter', 'clearsmog', 'dragontail', 'eruption', 'explosion', 'fakeout', 'flamecharge',
	'futuresight', 'iceshard', 'icywind', 'incinerate', 'knockoff', 'machpunch', 'pluck', 'pursuit', 'quickattack',
	'rapidspin', 'reversal', 'selfdestruct', 'shadowsneak', 'skyattack', 'skydrop', 'snarl', 'suckerpunch',
	'uturn', 'vacuumwave', 'voltswitch', 'waterspout',
];
// Hazard-setting moves
const HAZARDS = [
	'spikes', 'stealthrock', 'toxicspikes',
];
// Moves that switch the user out
const PIVOT_MOVES = [
	'uturn', 'voltswitch',
];

// Moves that should be paired together when possible
const MOVE_PAIRS = [
	['lightscreen', 'reflect'],
	['sleeptalk', 'rest'],
	['protect', 'wish'],
	['leechseed', 'substitute'],
];

/** Pokemon who always want priority STAB, and are fine with it as its only STAB move of that type */
const PRIORITY_POKEMON = [
	'bisharp', 'breloom', 'cacturne', 'dusknoir', 'honchkrow', 'scizor', 'shedinja', 'shiftry',
];

export class RandomGen5Teams extends RandomGen6Teams {
	randomSets: {[species: string]: RandomTeamsTypes.RandomSpeciesData} = randomSetsJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);
		this.noStab = NO_STAB;
		this.priorityPokemon = PRIORITY_POKEMON;

		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter) => (
				!counter.get('Bug') && (movePool.includes('megahorn') || abilities.includes('Tinted Lens'))
			),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
			Dragon: (movePool, moves, abilities, types, counter) => !counter.get('Dragon'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting'),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Flying') && !['aerodactyl', 'mantine', 'murkrow'].includes(species.id) &&
				!movePool.includes('hiddenpowerflying')
			),
			Ghost: (movePool, moves, abilities, types, counter) => !counter.get('Ghost'),
			Grass: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Grass') && (species.baseStats.atk >= 100 || movePool.includes('leafstorm'))
			),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => !counter.get('Ice'),
			Poison: (movePool, moves, abilities, types, counter) => (
				!counter.get('Poison') && (types.has('Grass') || types.has('Ground'))
			),
			Psychic: (movePool, moves, abilities, types, counter) => (
				!counter.get('Psychic') && (types.has('Fighting') || movePool.includes('calmmind'))
			),
			Rock: (movePool, moves, abilities, types, counter, species) => (!counter.get('Rock') && species.baseStats.atk >= 80),
			Steel: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Steel') && ['aggron', 'metagross'].includes(species.id)
			),
			Water: (movePool, moves, abilities, types, counter) => !counter.get('Water'),
		};
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
		if (teamDetails.stealthRock) {
			if (movePool.includes('stealthrock')) this.fastPop(movePool, movePool.indexOf('stealthrock'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.rapidSpin) {
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

		// Develop additional move lists
		const badWithSetup = ['healbell', 'pursuit', 'toxic'];
		// Nature Power is Earthquake this gen
		const statusMoves = this.dex.moves.all()
			.filter(move => move.category === 'Status' && move.id !== 'naturepower')
			.map(move => move.id);

		// General incompatibilities
		const incompatiblePairs = [
			// These moves don't mesh well with other aspects of the set
			[statusMoves, ['healingwish', 'switcheroo', 'trick']],
			[SETUP, PIVOT_MOVES],
			[SETUP, HAZARDS],
			[SETUP, badWithSetup],
			[PHYSICAL_SETUP, PHYSICAL_SETUP],
			[['fakeout', 'uturn'], ['switcheroo', 'trick']],
			['substitute', PIVOT_MOVES],
			['rest', 'substitute'],

			// These attacks are redundant with each other
			['psychic', 'psyshock'],
			[['scald', 'surf'], 'hydropump'],
			[['bodyslam', 'return'], ['bodyslam', 'doubleedge']],
			[['gigadrain', 'leafstorm'], ['leafstorm', 'petaldance', 'powerwhip']],
			[['drainpunch', 'focusblast'], ['closecombat', 'highjumpkick', 'superpower']],
			['payback', 'pursuit'],

			// Assorted hardcodes go here:
			// Zebstrika
			['wildcharge', 'thunderbolt'],
			// Manectric
			['flamethrower', 'overheat'],
			// Meganium
			['leechseed', 'dragontail'],
			// Volcarona and Heatran
			[['fierydance', 'lavaplume'], 'fireblast'],
			// Walrein
			['encore', 'roar'],
			// Lunatone
			['moonlight', 'rockpolish'],
			// Smeargle
			['memento', 'whirlwind'],
			// Seviper
			['switcheroo', 'suckerpunch'],
			// Jirachi
			['bodyslam', 'healingwish'],
			// Shuckle
			['knockoff', 'protect'],
		];

		for (const pair of incompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

		if (species.id === 'dugtrio') this.incompatibleMoves(moves, movePool, statusMoves, 'memento');

		const statusInflictingMoves = ['stunspore', 'thunderwave', 'toxic', 'willowisp', 'yawn'];
		if (!abilities.includes('Prankster') && role !== 'Staller') {
			this.incompatibleMoves(moves, movePool, statusInflictingMoves, statusInflictingMoves);
		}

		if (abilities.includes('Guts')) this.incompatibleMoves(moves, movePool, 'protect', 'swordsdance');

		// Cull filler moves for otherwise fixed set Stealth Rock users
		if (!teamDetails.stealthRock) {
			if (species.id === 'registeel' && role === 'Staller') {
				if (movePool.includes('thunderwave')) this.fastPop(movePool, movePool.indexOf('thunderwave'));
				if (moves.size + movePool.length <= this.maxMoveCount) return;
			}
			if (species.baseSpecies === 'Wormadam' && role === 'Staller') {
				if (movePool.includes('suckerpunch')) this.fastPop(movePool, movePool.indexOf('suckerpunch'));
				if (moves.size + movePool.length <= this.maxMoveCount) return;
			}
		}
	}

	// Generate random moveset for a given species, role, preferred type.
	randomMoveset(
		types: string[],
		abilities: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		movePool: string[],
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): Set<string> {
		const moves = new Set<string>();
		let counter = this.newQueryMoves(moves, species, preferredType, abilities);
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
				movePool, moves, abilities, new Set(types), counter, species, teamDetails
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

		// Enforce Seismic Toss and Spore
		for (const moveid of ['seismictoss', 'spore']) {
			if (movePool.includes(moveid)) {
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce Thunder Wave on Prankster users
		if (movePool.includes('thunderwave') && abilities.includes('Prankster')) {
			counter = this.addMove('thunderwave', moves, types, abilities, teamDetails, species, isLead,
				movePool, preferredType, role);
		}

		// Enforce hazard removal on Bulky Support and Spinner if the team doesn't already have it
		if (['Bulky Support', 'Spinner'].includes(role) && !teamDetails.rapidSpin) {
			if (movePool.includes('rapidspin')) {
				counter = this.addMove('rapidspin', moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce STAB priority
		if (['Bulky Attacker', 'Bulky Setup'].includes(role) || this.priorityPokemon.includes(species.id)) {
			const priorityMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, preferredType);
				if (types.includes(moveType) && move.priority > 0 && (move.basePower || move.basePowerCallback)) {
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
		if (!counter.get('preferred')) {
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
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && types.includes(moveType)) {
					stabMoves.push(moveid);
				}
			}
			if (stabMoves.length) {
				const moveid = this.sample(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			} else {
				// If they have no regular STAB move, enforce U-turn on Bug types.
				if (movePool.includes('uturn') && types.includes('Bug')) {
					counter = this.addMove('uturn', moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
			}
		}

		// Enforce recovery
		if (['Bulky Support', 'Bulky Attacker', 'Bulky Setup', 'Spinner', 'Staller'].includes(role)) {
			const recoveryMoves = movePool.filter(moveid => RECOVERY_MOVES.includes(moveid));
			if (recoveryMoves.length) {
				const moveid = this.sample(recoveryMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce Staller moves
		if (role === 'Staller') {
			const enforcedMoves = ['protect', 'toxic'];
			for (const move of enforcedMoves) {
				if (movePool.includes(move)) {
					counter = this.addMove(move, moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
			}
		}

		// Enforce setup
		if (role.includes('Setup')) {
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

		// Enforce a move not on the noSTAB list
		if (!counter.damagingMoves.size && !(moves.has('uturn') && types.includes('Bug'))) {
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
		if (['Fast Attacker', 'Setup Sweeper', 'Bulky Attacker', 'Wallbreaker'].includes(role)) {
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

	shouldCullAbility(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		abilities: string[],
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		preferredType: string,
		role: RandomTeamsTypes.Role
	): boolean {
		switch (ability) {
		case 'Chlorophyll': case 'Solar Power':
			return !teamDetails.sun;
		case 'Hydration': case 'Swift Swim':
			return !teamDetails.rain;
		case 'Iron Fist': case 'Sheer Force':
			return !counter.get(toID(ability));
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Sand Force': case 'Sand Rush':
			return !teamDetails.sand;
		}

		return false;
	}


	getAbility(
		types: Set<string>,
		moves: Set<string>,
		abilities: string[],
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): string {
		if (abilities.length <= 1) return abilities[0];

		// Hard-code abilities here
		if (species.id === 'marowak' && counter.get('recoil')) return 'Rock Head';
		if (species.id === 'kingler' && counter.get('sheerforce')) return 'Sheer Force';
		if (species.id === 'golduck' && teamDetails.rain) return 'Swift Swim';

		const abilityAllowed: string[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilities) {
			if (!this.shouldCullAbility(
				ability, types, moves, abilities, counter, movePool, teamDetails, species, preferredType, role
			)) {
				abilityAllowed.push(ability);
			}
		}

		// Pick a random allowed ability
		if (abilityAllowed.length >= 1) return this.sample(abilityAllowed);

		// If all abilities are rejected, prioritize weather abilities over non-weather abilities
		if (!abilityAllowed.length) {
			const weatherAbilities = abilities.filter(
				a => ['Chlorophyll', 'Hydration', 'Sand Force', 'Sand Rush', 'Solar Power', 'Swift Swim'].includes(a)
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
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): string | undefined {
		if (species.requiredItems) return this.sample(species.requiredItems);
		if (species.id === 'farfetchd') return 'Stick';
		if (species.id === 'latias' || species.id === 'latios') return 'Soul Dew';
		if (species.id === 'marowak') return 'Thick Club';
		if (species.id === 'pikachu') return 'Light Ball';
		if (species.id === 'shedinja' || species.id === 'smeargle') return 'Focus Sash';
		if (species.id === 'unown') return 'Choice Specs';
		if (species.id === 'wobbuffet') return 'Custap Berry';
		if (ability === 'Harvest') return 'Sitrus Berry';
		if (species.id === 'ditto') return 'Choice Scarf';
		if (species.id === 'exploud' && role === 'Bulky Attacker') return 'Choice Band';
		if (ability === 'Poison Heal' || moves.has('facade')) return 'Toxic Orb';
		if (ability === 'Speed Boost' && species.id !== 'ninjask') return 'Life Orb';
		if (species.nfe) return 'Eviolite';
		if (['healingwish', 'memento', 'switcheroo', 'trick'].some(m => moves.has(m))) {
			if (
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && role !== 'Wallbreaker' && !counter.get('priority')
			) {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (moves.has('bellydrum')) return 'Sitrus Berry';
		if (moves.has('waterspout')) return 'Choice Scarf';
		if (moves.has('shellsmash')) return 'White Herb';
		if (moves.has('psychoshift')) return 'Flame Orb';
		if (ability === 'Magic Guard') return moves.has('counter') ? 'Focus Sash' : 'Life Orb';
		if (species.id === 'rampardos' && role === 'Fast Attacker') return 'Choice Scarf';
		if (ability === 'Sheer Force' && counter.get('sheerforce')) return 'Life Orb';
		if (moves.has('acrobatics')) return 'Flying Gem';
		if (species.id === 'hitmonlee' && ability === 'Unburden') return moves.has('fakeout') ? 'Normal Gem' : 'Fighting Gem';
		if (moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (moves.has('rest') && !moves.has('sleeptalk') && !['Natural Cure', 'Shed Skin'].includes(ability)) {
			return (moves.has('raindance') && ability === 'Hydration') ? 'Damp Rock' : 'Chesto Berry';
		}
		if (role === 'Staller') return 'Leftovers';
	}

	getItem(
		ability: string,
		types: string[],
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): string {
		const defensiveStatTotal = species.baseStats.hp + species.baseStats.def + species.baseStats.spd;

		const scarfReqs = (
			role !== 'Wallbreaker' &&
			species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
			!counter.get('priority') && !moves.has('pursuit')
		);

		if (
			moves.has('pursuit') && moves.has('suckerpunch') && counter.get('Dark') &&
			(!this.priorityPokemon.includes(species.id) || counter.get('Dark') >= 2)
		) return 'Black Glasses';
		if (counter.get('Special') === 4) {
			return (
				scarfReqs && species.baseStats.spa >= 90 && this.randomChance(1, 2)
			) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (counter.get('Special') === 3 && moves.has('uturn')) return 'Choice Specs';
		if (counter.get('Physical') === 4 && species.id !== 'jirachi' && species.id !== 'spinda' &&
			['dragontail', 'fakeout', 'rapidspin'].every(m => !moves.has(m))
		) {
			return (
				scarfReqs && (species.baseStats.atk >= 100 || ability === 'Pure Power' || ability === 'Huge Power') &&
				this.randomChance(1, 2)
			) ? 'Choice Scarf' : 'Choice Band';
		}

		if (ability === 'Sturdy' && moves.has('explosion')) return 'Custap Berry';
		if (types.includes('Normal') && moves.has('fakeout') && !!counter.get('Normal')) return 'Silk Scarf';
		if (species.id === 'palkia') return 'Lustrous Orb';
		if (moves.has('outrage') && counter.get('setup')) return 'Lum Berry';
		if (
			(ability === 'Rough Skin') || (species.id !== 'hooh' && role !== 'Wallbreaker' &&
			ability === 'Regenerator' && species.baseStats.hp + species.baseStats.def >= 180 && this.randomChance(1, 2))
		) return 'Rocky Helmet';
		if (['protect', 'substitute'].some(m => moves.has(m))) return 'Leftovers';
		if (
			this.dex.getEffectiveness('Ground', species) >= 2 &&
			ability !== 'Levitate'
		) {
			return 'Air Balloon';
		}
		if (
			role === 'Fast Support' && isLead && defensiveStatTotal < 255 && !counter.get('recovery') &&
			(counter.get('hazards') || counter.get('setup')) && (!counter.get('recoil') || ability === 'Rock Head')
		) return 'Focus Sash';

		// Default Items
		if (role === 'Fast Support') {
			return (
				counter.get('Physical') + counter.get('Special') >= 3 &&
				['rapidspin', 'uturn', 'voltswitch'].every(m => !moves.has(m)) &&
				this.dex.getEffectiveness('Rock', species) < 2
			) ? 'Life Orb' : 'Leftovers';
		}
		// noStab moves that should reject Expert Belt
		const noExpertBeltMoves = (
			this.noStab.filter(moveid => ['Dragon', 'Normal', 'Poison'].includes(this.dex.moves.get(moveid).type))
		);
		const expertBeltReqs = (
			!counter.get('Dragon') && !counter.get('Normal') && !counter.get('Poison') &&
			noExpertBeltMoves.every(m => !moves.has(m))
		);
		if (
			!counter.get('Status') && expertBeltReqs &&
			(moves.has('uturn') || moves.has('voltswitch') || role === 'Fast Attacker')
		) return 'Expert Belt';
		if (
			['Fast Attacker', 'Setup Sweeper', 'Wallbreaker'].some(m => role === m) &&
			this.dex.getEffectiveness('Rock', species) < 2 && ability !== 'Sturdy'
		) return 'Life Orb';
		return 'Leftovers';
	}

	randomSet(
		species: string | Species,
		teamDetails: RandomTeamsTypes.TeamDetails = {},
		isLead = false
	): RandomTeamsTypes.RandomSet {
		species = this.dex.species.get(species);
		const forme = this.getForme(species);
		const sets = this.randomSets[species.id]["sets"];
		const possibleSets = [];
		// Check if the Pokemon has a Spinner set
		let canSpinner = false;
		for (const set of sets) {
			if (!teamDetails.rapidSpin && set.role === 'Spinner') canSpinner = true;
		}
		for (const set of sets) {
			// Prevent Spinner if the team already has removal
			if (teamDetails.rapidSpin && set.role === 'Spinner') continue;
			// Enforce Spinner if the team does not have removal
			if (canSpinner && set.role !== 'Spinner') continue;
			possibleSets.push(set);
		}
		const set = this.sampleIfArray(possibleSets);
		const role = set.role;
		const movePool: string[] = Array.from(set.movepool);
		const preferredTypes = set.preferredTypes;
		const preferredType = this.sampleIfArray(preferredTypes) || '';

		let ability = '';
		let item = undefined;

		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};

		const types = species.types;
		const abilities = set.abilities!;

		// Get moves
		const moves = this.randomMoveset(types, abilities, teamDetails, species, isLead, movePool,
			preferredType, role);
		const counter = this.newQueryMoves(moves, species, preferredType, abilities);

		// Get ability
		ability = this.getAbility(new Set(types), moves, abilities, counter, movePool, teamDetails, species,
			preferredType, role);

		// Get items
		item = this.getPriorityItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);
		if (item === undefined) {
			item = this.getItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);
		}

		// For Trick / Switcheroo
		if (item === 'Leftovers' && types.includes('Poison')) {
			item = 'Black Sludge';
		}

		const level = this.getLevel(species);

		// We use a special variable to track Hidden Power
		// so that we can check for all Hidden Powers at once
		let hasHiddenPower = false;
		for (const move of moves) {
			if (move.startsWith('hiddenpower')) hasHiddenPower = true;
		}

		if (hasHiddenPower) {
			let hpType;
			for (const move of moves) {
				if (move.startsWith('hiddenpower')) hpType = move.substr(11);
			}
			if (!hpType) throw new Error(`hasHiddenPower is true, but no Hidden Power move was found.`);
			const HPivs = this.dex.types.get(hpType).HPivs;
			let iv: StatID;
			for (iv in HPivs) {
				ivs[iv] = HPivs[iv]!;
			}
		}

		// Prepare optimal HP
		const srImmunity = ability === 'Magic Guard';
		const srWeakness = srImmunity ? 0 : this.dex.getEffectiveness('Rock', species);
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if (moves.has('substitute') && !['Black Sludge', 'Leftovers'].includes(item)) {
				if (item === 'Sitrus Berry') {
					// Two Substitutes should activate Sitrus Berry
					if (hp % 4 === 0) break;
				} else {
					// Should be able to use Substitute four times from full HP without fainting
					if (hp % 4 > 0) break;
				}
			} else if (moves.has('bellydrum') && item === 'Sitrus Berry') {
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

		// Minimize confusion damage, including if Foul Play is its only physical attack
		if ((!counter.get('Physical') || (counter.get('Physical') <= 1 && moves.has('foulplay'))) && !moves.has('transform')) {
			evs.atk = 0;
			ivs.atk = hasHiddenPower ? (ivs.atk || 31) - 28 : 0;
		}

		if (['gyroball', 'metalburst', 'trickroom'].some(m => moves.has(m))) {
			evs.spe = 0;
			ivs.spe = hasHiddenPower ? (ivs.spe || 31) - 28 : 0;
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
			role,
		};
	}

	randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const seed = this.prng.seed;
		const ruleTable = this.dex.formats.getRuleTable(this.format);
		const pokemon: RandomTeamsTypes.RandomSet[] = [];

		// For Monotype
		const isMonotype = !!this.forceMonotype || ruleTable.has('sametypeclause');
		const typePool = this.dex.types.names();
		const type = this.forceMonotype || this.sample(typePool);

		const baseFormes: {[k: string]: number} = {};
		const typeCount: {[k: string]: number} = {};
		const typeWeaknesses: {[k: string]: number} = {};
		const typeDoubleWeaknesses: {[k: string]: number} = {};
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

			// Illusion shouldn't be in the last slot
			if (species.name === 'Zoroark' && pokemon.length >= (this.maxTeamSize - 1)) continue;

			// Dynamically scale limits for different team sizes. The default and minimum value is 1.
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

			const types = species.types;

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

				// Count Dry Skin as a Fire weakness
				if (this.dex.getEffectiveness('Fire', species) === 0 && Object.values(species.abilities).includes('Dry Skin')) {
					if (!typeWeaknesses['Fire']) typeWeaknesses['Fire'] = 0;
					if (typeWeaknesses['Fire'] >= 3 * limitFactor) continue;
				}

				// Limit one level 100 Pokemon
				if (!this.adjustLevel && (this.getLevel(species) === 100) && numMaxLevelPokemon >= limitFactor) {
					continue;
				}
			}

			const set = this.randomSet(species, teamDetails, pokemon.length === 0);

			// Okay, the set passes, add it to our team
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
			// Count Dry Skin as a Fire weakness
			if (set.ability === 'Dry Skin' && this.dex.getEffectiveness('Fire', species) === 0) typeWeaknesses['Fire']++;

			// Increment level 100 counter
			if (set.level === 100) numMaxLevelPokemon++;

			// Team details
			if (set.ability === 'Snow Warning' || set.moves.includes('hail')) teamDetails.hail = 1;
			if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails.rain = 1;
			if (set.ability === 'Sand Stream') teamDetails.sand = 1;
			if (set.ability === 'Drought' || set.moves.includes('sunnyday')) teamDetails.sun = 1;
			if (set.moves.includes('aromatherapy') || set.moves.includes('healbell')) teamDetails.statusCure = 1;
			if (set.moves.includes('spikes')) teamDetails.spikes = (teamDetails.spikes || 0) + 1;
			if (set.moves.includes('stealthrock')) teamDetails.stealthRock = 1;
			if (set.moves.includes('toxicspikes')) teamDetails.toxicSpikes = 1;
			if (set.moves.includes('rapidspin')) teamDetails.rapidSpin = 1;
			if (set.moves.includes('reflect') && set.moves.includes('lightscreen')) teamDetails.screens = 1;
		}
		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}

		return pokemon;
	}
}

export default RandomGen5Teams;
