import {MoveCounter, OldRandomBattleSpecies} from './gen8';
import {RandomGen6Teams} from './gen6';
import {Utils} from './utils';
import {
	Ability,
	Format,
	ModdedDex,
	Move,
	PRNG,
	PRNGSeed,
	RandomTeamsTypes,
	SparseStatsTable,
	Species,
	StatID,
	toID,
} from '@pkmn/sim';

/* eslint-disable */
const randomSetsJSON = {"venusaur":{"level":84,"sets":[{"role":"Staller","movepool":["gigadrain","leechseed","sleeppowder","sludgebomb","substitute"]},{"role":"Bulky Attacker","movepool":["earthquake","leafstorm","sleeppowder","sludgebomb","synthesis"]}]},"charizard":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["airslash","dragonpulse","fireblast","focusblast","hiddenpowergrass","roost"]},{"role":"Bulky Attacker","movepool":["airslash","earthquake","fireblast","roost","willowisp"]},{"role":"Setup Sweeper","movepool":["acrobatics","dragondance","earthquake","flareblitz","swordsdance"]}]},"blastoise":{"level":83,"sets":[{"role":"Spinner","movepool":["icebeam","rapidspin","roar","scald","toxic"]},{"role":"Staller","movepool":["haze","icebeam","protect","scald","toxic"]}]},"butterfree":{"level":93,"sets":[{"role":"Bulky Setup","movepool":["bugbuzz","hiddenpowerrock","psychic","quiverdance","sleeppowder","substitute"]}]},"beedrill":{"level":97,"sets":[{"role":"Fast Support","movepool":["drillrun","poisonjab","toxicspikes","uturn"]}]},"pidgeot":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","heatwave","return","roost","uturn","workup"]},{"role":"Wallbreaker","movepool":["bravebird","quickattack","return","uturn"]}]},"raticate":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["crunch","facade","flamewheel","protect","suckerpunch","swordsdance","uturn"],"preferredTypes":["Dark"]}]},"fearow":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","drillpeck","drillrun","pursuit","quickattack","return","uturn"],"preferredTypes":["Normal"]},{"role":"Fast Attacker","movepool":["doubleedge","drillpeck","drillrun","return","roost"]}]},"arbok":{"level":91,"sets":[{"role":"Setup Sweeper","movepool":["coil","earthquake","glare","gunkshot","suckerpunch"]},{"role":"Bulky Setup","movepool":["coil","earthquake","gunkshot","rest","suckerpunch"],"preferredTypes":["Ground"]}]},"pikachu":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["extremespeed","grassknot","hiddenpowerice","voltswitch","volttackle"]}]},"raichu":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["encore","focusblast","grassknot","hiddenpowerice","nastyplot","thunderbolt","voltswitch"]}]},"sandslash":{"level":87,"sets":[{"role":"Spinner","movepool":["earthquake","rapidspin","stealthrock","stoneedge","toxic"]},{"role":"Bulky Setup","movepool":["earthquake","stoneedge","swordsdance","xscissor"]}]},"nidoqueen":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["earthpower","fireblast","icebeam","sludgewave","stealthrock","toxicspikes"],"preferredTypes":["Ice"]}]},"nidoking":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["earthpower","fireblast","icebeam","sludgewave","substitute","superpower"],"preferredTypes":["Ice"]}]},"clefable":{"level":84,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","doubleedge","fireblast","softboiled","stealthrock","thunderwave"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","softboiled","thunderbolt"]}]},"ninetales":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["fireblast","hypnosis","nastyplot","solarbeam","willowisp"],"preferredTypes":["Grass"]},{"role":"Setup Sweeper","movepool":["fireblast","hiddenpowerrock","nastyplot","solarbeam","substitute"],"preferredTypes":["Grass"]}]},"wigglytuff":{"level":95,"sets":[{"role":"Bulky Support","movepool":["bodyslam","doubleedge","fireblast","healbell","protect","stealthrock","thunderwave","toxic","wish"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"]}]},"vileplume":{"level":88,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","gigadrain","hiddenpowerground","leechseed","sleeppowder","sludgebomb","synthesis"]}]},"parasect":{"level":97,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","leechseed","seedbomb","spore","stunspore","synthesis","xscissor"],"preferredTypes":["Bug"]},{"role":"Bulky Attacker","movepool":["aromatherapy","leechseed","seedbomb","spore","stunspore","xscissor"]},{"role":"Staller","movepool":["leechseed","protect","spore","xscissor"]}]},"venomoth":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["bugbuzz","quiverdance","roost","sleeppowder"]},{"role":"Setup Sweeper","movepool":["bugbuzz","quiverdance","sleeppowder","substitute"]}]},"dugtrio":{"level":82,"sets":[{"role":"Fast Support","movepool":["earthquake","memento","stealthrock","stoneedge","suckerpunch"]}]},"persian":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["bite","doubleedge","fakeout","hypnosis","return","seedbomb","taunt","uturn"],"preferredTypes":["Dark"]}]},"golduck":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["calmmind","encore","focusblast","hydropump","icebeam","psyshock","scald"],"preferredTypes":["Ice"]}]},"primeape":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","honeclaws","stoneedge","uturn"]}]},"arcanine":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["closecombat","extremespeed","flareblitz","morningsun","roar","toxic","wildcharge","willowisp"]},{"role":"Fast Attacker","movepool":["closecombat","extremespeed","flareblitz","morningsun","wildcharge"],"preferredTypes":["Fighting"]}]},"poliwrath":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["focusblast","hydropump","icepunch","raindance"]},{"role":"Bulky Attacker","movepool":["circlethrow","rest","scald","sleeptalk"]}]},"alakazam":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["counter","focusblast","psychic","psyshock","shadowball"]},{"role":"Setup Sweeper","movepool":["calmmind","encore","focusblast","psychic","psyshock","shadowball","substitute"],"preferredTypes":["Fighting"]}]},"machamp":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["bulkup","bulletpunch","dynamicpunch","payback","stoneedge"],"preferredTypes":["Rock"]}]},"victreebel":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerground","powerwhip","sleeppowder","sludgebomb","suckerpunch"]},{"role":"Setup Sweeper","movepool":["powerwhip","sludgebomb","sunnyday","weatherball"]}]},"tentacruel":{"level":80,"sets":[{"role":"Bulky Support","movepool":["haze","icebeam","rapidspin","scald","sludgebomb","toxicspikes"]}]},"golem":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","stealthrock","stoneedge","suckerpunch","toxic"]}]},"rapidash":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["drillrun","flareblitz","morningsun","wildcharge","willowisp"]},{"role":"Wallbreaker","movepool":["drillrun","flareblitz","megahorn","morningsun","wildcharge"]}]},"slowbro":{"level":83,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","psyshock","scald","slackoff","thunderwave","toxic"]},{"role":"Staller","movepool":["calmmind","psyshock","scald","slackoff"]},{"role":"Wallbreaker","movepool":["fireblast","icebeam","psyshock","surf","trick","trickroom"],"preferredTypes":["Psychic"]}]},"farfetchd":{"level":100,"sets":[{"role":"Setup Sweeper","movepool":["bravebird","leafblade","quickattack","return","swordsdance"]}]},"dodrio":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["bravebird","pursuit","quickattack","return","roost"]}]},"dewgong":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["encore","icebeam","rest","sleeptalk","surf","toxic"]},{"role":"Staller","movepool":["icebeam","protect","surf","toxic"]}]},"muk":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["brickbreak","curse","icepunch","poisonjab","rest","shadowsneak"],"preferredTypes":["Fighting"]}]},"cloyster":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["hydropump","iciclespear","rockblast","shellsmash"]}]},"gengar":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["focusblast","painsplit","shadowball","sludgewave","substitute","trick","willowisp"],"preferredTypes":["Fighting"]}]},"hypno":{"level":93,"sets":[{"role":"Bulky Support","movepool":["focusblast","foulplay","protect","psychic","thunderwave","toxic","wish"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"]}]},"kingler":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["bodyslam","crabhammer","rockslide","superpower","swordsdance","xscissor"]},{"role":"Bulky Setup","movepool":["agility","crabhammer","return","swordsdance"]}]},"electrode":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["foulplay","hiddenpowerice","signalbeam","taunt","thunderbolt","voltswitch"],"preferredTypes":["Ice"]},{"role":"Fast Support","movepool":["hiddenpowerice","thunderbolt","thunderwave","toxic","voltswitch"]}]},"exeggutor":{"level":88,"sets":[{"role":"Bulky Support","movepool":["gigadrain","hiddenpowerfire","leechseed","psychic","sleeppowder","substitute"],"preferredTypes":["Psychic"]}]},"marowak":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","firepunch","stealthrock","stoneedge","swordsdance"],"preferredTypes":["Rock"]}]},"hitmonlee":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","fakeout","rapidspin","stoneedge","suckerpunch"]},{"role":"Wallbreaker","movepool":["earthquake","highjumpkick","machpunch","stoneedge","suckerpunch"]}]},"hitmonchan":{"level":85,"sets":[{"role":"Spinner","movepool":["drainpunch","icepunch","machpunch","rapidspin","stoneedge"]},{"role":"Bulky Attacker","movepool":["bulkup","drainpunch","icepunch","machpunch","stoneedge"]}]},"weezing":{"level":88,"sets":[{"role":"Bulky Support","movepool":["fireblast","haze","painsplit","sludgebomb","willowisp"]}]},"rhydon":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","megahorn","stealthrock","stoneedge","swordsdance","toxic"]}]},"chansey":{"level":83,"sets":[{"role":"Staller","movepool":["aromatherapy","seismictoss","softboiled","stealthrock","thunderwave","toxic"]},{"role":"Bulky Support","movepool":["seismictoss","softboiled","toxic","wish"]}]},"kangaskhan":{"level":86,"sets":[{"role":"Bulky Support","movepool":["doubleedge","drainpunch","earthquake","fakeout","return","suckerpunch"]},{"role":"Bulky Attacker","movepool":["bodyslam","drainpunch","protect","return","wish"]}]},"seaking":{"level":92,"sets":[{"role":"Fast Attacker","movepool":["drillrun","icebeam","megahorn","raindance","return","waterfall"]}]},"starmie":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["hydropump","icebeam","psyshock","recover","thunderbolt"]},{"role":"Bulky Support","movepool":["icebeam","psyshock","rapidspin","recover","scald","thunderwave"]}]},"mrmime":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["encore","focusblast","nastyplot","psychic","shadowball","substitute"],"preferredTypes":["Fighting"]}]},"scyther":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["aerialace","brickbreak","bugbite","roost","swordsdance"]}]},"jynx":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["focusblast","icebeam","lovelykiss","psychic","psyshock","trick"]},{"role":"Setup Sweeper","movepool":["focusblast","icebeam","lovelykiss","nastyplot","psyshock","substitute"]}]},"pinsir":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["closecombat","earthquake","stealthrock","stoneedge","xscissor"],"preferredTypes":["Rock"]},{"role":"Fast Attacker","movepool":["closecombat","earthquake","quickattack","stoneedge","swordsdance","xscissor"],"preferredTypes":["Ground"]}]},"tauros":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["bodyslam","earthquake","fireblast","rockslide","zenheadbutt"],"preferredTypes":["Ground"]},{"role":"Fast Attacker","movepool":["doubleedge","earthquake","stoneedge","zenheadbutt"]}]},"gyarados":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","stoneedge","substitute","waterfall"]}]},"lapras":{"level":86,"sets":[{"role":"Bulky Support","movepool":["healbell","hydropump","icebeam","thunderbolt","toxic"]},{"role":"Staller","movepool":["hydropump","icebeam","protect","toxic"]}]},"ditto":{"level":86,"sets":[{"role":"Fast Support","movepool":["transform"]}]},"vaporeon":{"level":83,"sets":[{"role":"Bulky Support","movepool":["healbell","icebeam","protect","scald","wish"]},{"role":"Staller","movepool":["protect","scald","toxic","wish"]}]},"jolteon":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","signalbeam","thunderbolt","voltswitch"]}]},"flareon":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["facade","flamecharge","rest","sleeptalk"]},{"role":"Wallbreaker","movepool":["facade","flamecharge","protect","superpower"]}]},"omastar":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","shellsmash","surf"]}]},"kabutops":{"level":85,"sets":[{"role":"Spinner","movepool":["aquajet","rapidspin","stealthrock","stoneedge","superpower","waterfall"]},{"role":"Fast Attacker","movepool":["aquajet","stealthrock","stoneedge","superpower","swordsdance","waterfall"]}]},"aerodactyl":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","roost","stealthrock","stoneedge","taunt","toxic"]},{"role":"Fast Support","movepool":["aquatail","doubleedge","earthquake","pursuit","roost","stealthrock","stoneedge"],"preferredTypes":["Ground"]}]},"snorlax":{"level":80,"sets":[{"role":"Bulky Support","movepool":["bodyslam","crunch","earthquake","rest","sleeptalk"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","rest","sleeptalk"]},{"role":"Bulky Attacker","movepool":["bodyslam","curse","earthquake","rest"]}]},"articuno":{"level":83,"sets":[{"role":"Staller","movepool":["icebeam","roost","substitute","toxic"]},{"role":"Bulky Support","movepool":["hurricane","icebeam","roost","substitute","toxic"]}]},"zapdos":{"level":79,"sets":[{"role":"Bulky Support","movepool":["heatwave","hiddenpowerice","roost","substitute","thunderbolt","toxic","uturn"]}]},"moltres":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","hiddenpowergrass","hurricane","roost","substitute","toxic","uturn","willowisp"]}]},"dragonair":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","outrage","rest","waterfall"]},{"role":"Bulky Setup","movepool":["dragondance","outrage","rest","sleeptalk"]}]},"dragonite":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["dragondance","earthquake","extremespeed","firepunch","outrage"]},{"role":"Bulky Setup","movepool":["dragonclaw","dragondance","earthquake","firepunch","roost"]}]},"mewtwo":{"level":70,"sets":[{"role":"Fast Attacker","movepool":["aurasphere","calmmind","fireblast","psystrike","recover","shadowball"]}]},"mew":{"level":79,"sets":[{"role":"Bulky Support","movepool":["psychic","softboiled","stealthrock","taunt","uturn","willowisp"]},{"role":"Setup Sweeper","movepool":["aurasphere","earthpower","fireblast","nastyplot","psychic","psyshock","softboiled"]}]},"meganium":{"level":91,"sets":[{"role":"Staller","movepool":["aromatherapy","dragontail","earthquake","gigadrain","leechseed","synthesis","toxic"]}]},"typhlosion":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["eruption","fireblast","focusblast","hiddenpowergrass","hiddenpowerrock"]}]},"feraligatr":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","icepunch","superpower","waterfall"],"preferredTypes":["Ice"]},{"role":"Fast Attacker","movepool":["aquajet","earthquake","icepunch","superpower","swordsdance","waterfall"]}]},"furret":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["aquatail","doubleedge","firepunch","shadowclaw","trick","uturn"]}]},"noctowl":{"level":95,"sets":[{"role":"Bulky Support","movepool":["airslash","heatwave","hypervoice","roost","toxic","whirlwind"]}]},"ledian":{"level":100,"sets":[{"role":"Staller","movepool":["acrobatics","encore","focusblast","knockoff","roost","toxic"]}]},"ariados":{"level":96,"sets":[{"role":"Bulky Support","movepool":["poisonjab","suckerpunch","toxicspikes","xscissor"]}]},"crobat":{"level":82,"sets":[{"role":"Bulky Support","movepool":["bravebird","heatwave","hypnosis","roost","superfang","taunt","toxic","uturn"]}]},"lanturn":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["healbell","icebeam","scald","thunderbolt","thunderwave","toxic","voltswitch"]}]},"xatu":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["calmmind","heatwave","psychic","roost"]},{"role":"Bulky Support","movepool":["heatwave","psychic","roost","thunderwave","toxic","uturn"]}]},"ampharos":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["agility","focusblast","hiddenpowerice","thunderbolt","voltswitch"]},{"role":"Bulky Attacker","movepool":["focusblast","healbell","hiddenpowerice","thunderbolt","toxic","voltswitch"]}]},"bellossom":{"level":93,"sets":[{"role":"Bulky Support","movepool":["gigadrain","hiddenpowerfire","hiddenpowerrock","leafstorm","leechseed","sleeppowder","stunspore","synthesis"]}]},"azumarill":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["aquajet","doubleedge","icepunch","superpower","waterfall"]},{"role":"Bulky Setup","movepool":["aquajet","bellydrum","return","waterfall"]}]},"sudowoodo":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","stealthrock","stoneedge","suckerpunch","toxic","woodhammer"],"preferredTypes":["Grass"]}]},"politoed":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["encore","focusblast","hiddenpowergrass","hypnosis","icebeam","rest","scald"],"preferredTypes":["Ice"]},{"role":"Staller","movepool":["encore","icebeam","protect","scald","toxic"]}]},"jumpluff":{"level":87,"sets":[{"role":"Fast Support","movepool":["acrobatics","encore","sleeppowder","uturn"]},{"role":"Staller","movepool":["acrobatics","leechseed","sleeppowder","substitute"]}]},"sunflora":{"level":99,"sets":[{"role":"Wallbreaker","movepool":["earthpower","hiddenpowerfire","hiddenpowerice","hiddenpowerrock","leafstorm","sludgebomb"]},{"role":"Setup Sweeper","movepool":["earthpower","hiddenpowerfire","solarbeam","sunnyday"]}]},"quagsire":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icebeam","recover","scald","toxic"]}]},"espeon":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["calmmind","hiddenpowerfire","morningsun","psychic","psyshock","signalbeam","trick"]}]},"umbreon":{"level":84,"sets":[{"role":"Staller","movepool":["foulplay","protect","toxic","wish"]},{"role":"Bulky Support","movepool":["foulplay","healbell","moonlight","toxic"]}]},"murkrow":{"level":89,"sets":[{"role":"Bulky Support","movepool":["bravebird","foulplay","haze","roost","taunt","thunderwave"]}]},"slowking":{"level":84,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","psyshock","scald","slackoff","thunderwave","toxic"]},{"role":"Wallbreaker","movepool":["fireblast","icebeam","psyshock","surf","trick","trickroom"],"preferredTypes":["Psychic"]}]},"unown":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerpsychic"]}]},"wobbuffet":{"level":88,"sets":[{"role":"Bulky Support","movepool":["counter","destinybond","encore","mirrorcoat"]}]},"girafarig":{"level":91,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerfighting","hypervoice","psychic","psyshock","substitute","thunderbolt"]}]},"forretress":{"level":80,"sets":[{"role":"Bulky Support","movepool":["earthquake","rapidspin","spikes","stealthrock","toxic","voltswitch"]}]},"dunsparce":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","glare","headbutt","roost"]},{"role":"Bulky Setup","movepool":["bodyslam","coil","earthquake","roost"]}]},"gligar":{"level":83,"sets":[{"role":"Staller","movepool":["earthquake","roost","stealthrock","taunt","toxic","uturn"]}]},"steelix":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["earthquake","ironhead","roar","rockslide","stealthrock","toxic"],"preferredTypes":["Steel"]},{"role":"Staller","movepool":["earthquake","heavyslam","protect","toxic"]},{"role":"Bulky Support","movepool":["earthquake","heavyslam","roar","stealthrock","toxic"]}]},"granbull":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["closecombat","crunch","healbell","return","thunderwave"]}]},"qwilfish":{"level":84,"sets":[{"role":"Fast Support","movepool":["destinybond","spikes","taunt","thunderwave","toxicspikes","waterfall"]}]},"scizor":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["bugbite","bulletpunch","roost","superpower","swordsdance"]},{"role":"Fast Attacker","movepool":["bulletpunch","pursuit","superpower","uturn"]}]},"shuckle":{"level":90,"sets":[{"role":"Bulky Support","movepool":["encore","knockoff","stealthrock","toxic"]},{"role":"Staller","movepool":["encore","protect","stealthrock","toxic"]}]},"heracross":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["closecombat","facade","megahorn","nightslash"]},{"role":"Fast Attacker","movepool":["closecombat","earthquake","megahorn","nightslash","stoneedge"],"preferredTypes":["Rock"]}]},"ursaring":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["closecombat","crunch","facade","protect","swordsdance"]}]},"magcargo":{"level":95,"sets":[{"role":"Staller","movepool":["hiddenpowerrock","lavaplume","recover","stealthrock","toxic"]}]},"corsola":{"level":94,"sets":[{"role":"Bulky Support","movepool":["powergem","recover","scald","stealthrock","toxic"]}]},"octillery":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["energyball","fireblast","hydropump","icebeam","thunderwave"]}]},"delibird":{"level":100,"sets":[{"role":"Bulky Support","movepool":["icebeam","iceshard","rapidspin","seismictoss","toxic"]}]},"mantine":{"level":90,"sets":[{"role":"Bulky Support","movepool":["airslash","rest","scald","sleeptalk","toxic"]},{"role":"Setup Sweeper","movepool":["airslash","hydropump","icebeam","raindance"]}]},"skarmory":{"level":77,"sets":[{"role":"Bulky Support","movepool":["bravebird","roost","spikes","stealthrock","whirlwind"]},{"role":"Staller","movepool":["bravebird","roost","spikes","stealthrock","toxic"]}]},"houndoom":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","fireblast","hiddenpowergrass","nastyplot","suckerpunch"]}]},"kingdra":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["dragondance","outrage","rest","substitute","waterfall"]},{"role":"Setup Sweeper","movepool":["dracometeor","hydropump","icebeam","raindance","waterfall"]}]},"donphan":{"level":82,"sets":[{"role":"Spinner","movepool":["earthquake","iceshard","rapidspin","stealthrock","stoneedge","toxic"],"preferredTypes":["Rock"]},{"role":"Bulky Attacker","movepool":["earthquake","gunkshot","iceshard","stealthrock","stoneedge"],"preferredTypes":["Rock"]}]},"porygon2":{"level":82,"sets":[{"role":"Bulky Support","movepool":["discharge","icebeam","recover","toxic","triattack"]}]},"stantler":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","hypnosis","jumpkick","megahorn","suckerpunch","thunderwave"],"preferredTypes":["Ground"]}]},"smeargle":{"level":85,"sets":[{"role":"Fast Support","movepool":["memento","spikes","spore","stealthrock","whirlwind"]}]},"hitmontop":{"level":87,"sets":[{"role":"Bulky Support","movepool":["closecombat","earthquake","rapidspin","stoneedge","suckerpunch","toxic"]}]},"miltank":{"level":83,"sets":[{"role":"Bulky Support","movepool":["bodyslam","earthquake","healbell","milkdrink","stealthrock","toxic"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","earthquake","milkdrink"]}]},"blissey":{"level":84,"sets":[{"role":"Staller","movepool":["aromatherapy","seismictoss","softboiled","stealthrock","thunderwave","toxic"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"]}]},"raikou":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["aurasphere","hiddenpowerice","thunderbolt","voltswitch"]},{"role":"Bulky Setup","movepool":["aurasphere","calmmind","hiddenpowerice","substitute","thunderbolt"],"preferredTypes":["Ice"]}]},"entei":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["bulldoze","extremespeed","flareblitz","stoneedge"]},{"role":"Fast Attacker","movepool":["extremespeed","flareblitz","hiddenpowergrass","stoneedge"]}]},"suicune":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","rest","scald","sleeptalk"]},{"role":"Bulky Setup","movepool":["calmmind","hydropump","icebeam","rest","scald","substitute"]},{"role":"Staller","movepool":["calmmind","protect","scald","substitute"]}]},"tyranitar":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["crunch","earthquake","fireblast","icebeam","pursuit","stealthrock","stoneedge","superpower"]},{"role":"Bulky Setup","movepool":["crunch","dragondance","earthquake","firepunch","icepunch","stoneedge"]}]},"lugia":{"level":71,"sets":[{"role":"Staller","movepool":["aeroblast","earthquake","roost","substitute","toxic","whirlwind"]}]},"hooh":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","earthquake","roost","sacredfire","substitute","toxic"]}]},"celebi":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["earthpower","gigadrain","hiddenpowerfire","leafstorm","nastyplot","psychic","uturn"],"preferredTypes":["Psychic"]},{"role":"Bulky Support","movepool":["leafstorm","psychic","recover","stealthrock","thunderwave","uturn"]},{"role":"Bulky Setup","movepool":["leafstorm","nastyplot","psychic","recover"]}]},"sceptile":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["acrobatics","earthquake","leafblade","swordsdance"]},{"role":"Fast Attacker","movepool":["earthquake","focusblast","gigadrain","hiddenpowerfire","hiddenpowerice","leafstorm","rockslide"]},{"role":"Staller","movepool":["gigadrain","hiddenpowerfire","hiddenpowerice","leechseed","substitute"]}]},"blaziken":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["flareblitz","highjumpkick","protect","stoneedge","swordsdance"]},{"role":"Wallbreaker","movepool":["fireblast","highjumpkick","protect","stoneedge"]}]},"swampert":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icebeam","roar","scald","stealthrock","toxic"]},{"role":"Staller","movepool":["earthquake","protect","scald","toxic"]}]},"mightyena":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["crunch","doubleedge","firefang","suckerpunch","taunt"],"preferredTypes":["Fire"]}]},"linoone":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["bellydrum","extremespeed","seedbomb","shadowclaw"]}]},"beautifly":{"level":97,"sets":[{"role":"Setup Sweeper","movepool":["bugbuzz","hiddenpowerground","psychic","quiverdance"]}]},"dustox":{"level":93,"sets":[{"role":"Bulky Setup","movepool":["bugbuzz","hiddenpowerground","quiverdance","roost","sludgebomb"]}]},"ludicolo":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["gigadrain","hydropump","icebeam","raindance"]},{"role":"Wallbreaker","movepool":["gigadrain","hydropump","icebeam","scald"]}]},"shiftry":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","hiddenpowerfire","leafstorm","naturepower","suckerpunch"]},{"role":"Setup Sweeper","movepool":["naturepower","seedbomb","suckerpunch","swordsdance"]}]},"swellow":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["bravebird","facade","protect","quickattack","uturn"]}]},"pelipper":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["hurricane","roost","scald","toxic","uturn"]}]},"gardevoir":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["focusblast","healingwish","psychic","shadowball","thunderbolt","trick"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["calmmind","focusblast","psychic","psyshock","shadowball","substitute","willowisp"],"preferredTypes":["Fighting"]}]},"masquerain":{"level":92,"sets":[{"role":"Setup Sweeper","movepool":["airslash","bugbuzz","hydropump","quiverdance","roost"]}]},"breloom":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["bulletseed","machpunch","spore","stoneedge","swordsdance"]},{"role":"Bulky Attacker","movepool":["focuspunch","spore","stoneedge","substitute"]}]},"vigoroth":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["bodyslam","bulkup","earthquake","nightslash","return","slackoff"]}]},"slaking":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["earthquake","gigaimpact","nightslash","retaliate"]}]},"ninjask":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["aerialace","nightslash","swordsdance","uturn","xscissor"]},{"role":"Setup Sweeper","movepool":["aerialace","substitute","swordsdance","xscissor"]}]},"shedinja":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["shadowclaw","shadowsneak","swordsdance","willowisp","xscissor"]}]},"exploud":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["fireblast","focusblast","hypervoice","icebeam","surf"]},{"role":"Bulky Attacker","movepool":["doubleedge","earthquake","facade","lowkick"]},{"role":"Fast Attacker","movepool":["earthquake","fireblast","focusblast","return","surf","workup"]}]},"hariyama":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["bulletpunch","closecombat","facade","fakeout","stoneedge"]},{"role":"Bulky Attacker","movepool":["bulkup","bulletpunch","closecombat","earthquake","stoneedge"],"preferredTypes":["Rock"]}]},"delcatty":{"level":95,"sets":[{"role":"Fast Support","movepool":["doubleedge","fakeout","healbell","suckerpunch","thunderwave","toxic"]}]},"sableye":{"level":88,"sets":[{"role":"Staller","movepool":["foulplay","recover","taunt","willowisp"]},{"role":"Bulky Support","movepool":["recover","seismictoss","taunt","toxic","willowisp"]}]},"mawile":{"level":95,"sets":[{"role":"Bulky Attacker","movepool":["firefang","ironhead","stealthrock","suckerpunch","swordsdance","thunderpunch"],"preferredTypes":["Fire"]}]},"aggron":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["aquatail","earthquake","headsmash","heavyslam","rockpolish","stealthrock","thunderwave"],"preferredTypes":["Ground"]}]},"medicham":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["bulletpunch","highjumpkick","icepunch","trick","zenheadbutt"]}]},"manectric":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["flamethrower","hiddenpowerice","overheat","thunderbolt","voltswitch"]}]},"plusle":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"preferredTypes":["Ice"]}]},"minun":{"level":91,"sets":[{"role":"Bulky Setup","movepool":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"preferredTypes":["Ice"]}]},"volbeat":{"level":91,"sets":[{"role":"Bulky Support","movepool":["encore","roost","thunderwave","uturn"]}]},"illumise":{"level":90,"sets":[{"role":"Bulky Support","movepool":["bugbuzz","encore","roost","thunderwave"]}]},"swalot":{"level":92,"sets":[{"role":"Bulky Support","movepool":["earthquake","encore","icebeam","painsplit","sludgebomb","toxic","yawn"]},{"role":"Staller","movepool":["earthquake","protect","sludgebomb","toxic"]}]},"sharpedo":{"level":82,"sets":[{"role":"Staller","movepool":["crunch","earthquake","hydropump","icebeam","protect"]}]},"wailord":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowergrass","hydropump","icebeam","waterspout"]}]},"camerupt":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","lavaplume","roar","stealthrock","toxic"]}]},"torkoal":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","lavaplume","rapidspin","stealthrock","yawn"]}]},"grumpig":{"level":90,"sets":[{"role":"Bulky Support","movepool":["focusblast","healbell","psychic","thunderwave","toxic","whirlwind"]},{"role":"Wallbreaker","movepool":["calmmind","focusblast","psychic","psyshock","shadowball","trick"]}]},"spinda":{"level":98,"sets":[{"role":"Bulky Support","movepool":["feintattack","rapidspin","return","suckerpunch","superpower"],"preferredTypes":["Fighting"]}]},"flygon":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["earthquake","outrage","stoneedge","uturn"]},{"role":"Bulky Attacker","movepool":["dracometeor","earthquake","fireblast","roost","uturn"]}]},"cacturne":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","focusblast","gigadrain","spikes","suckerpunch"]},{"role":"Setup Sweeper","movepool":["drainpunch","seedbomb","suckerpunch","swordsdance"]}]},"altaria":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["dragondance","earthquake","outrage","roost"]},{"role":"Bulky Attacker","movepool":["dracometeor","earthquake","fireblast","haze","healbell","roost","toxic"]}]},"zangoose":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["closecombat","facade","nightslash","quickattack","swordsdance"],"preferredTypes":["Dark"]}]},"seviper":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["earthquake","flamethrower","gigadrain","sludgebomb","suckerpunch","switcheroo"],"preferredTypes":["Ground"]}]},"lunatone":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["earthpower","icebeam","moonlight","psychic","rockpolish"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["earthpower","hiddenpowerrock","moonlight","psychic","stealthrock","toxic"],"preferredTypes":["Psychic"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","moonlight","psychic"]}]},"solrock":{"level":90,"sets":[{"role":"Bulky Support","movepool":["earthquake","morningsun","stealthrock","stoneedge","willowisp"]}]},"whiscash":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","stoneedge","waterfall"]}]},"crawdaunt":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["crunch","dragondance","superpower","waterfall"]}]},"claydol":{"level":85,"sets":[{"role":"Bulky Support","movepool":["earthquake","icebeam","psychic","rapidspin","stealthrock","toxic"]}]},"cradily":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["curse","recover","seedbomb","stoneedge","swordsdance"]},{"role":"Bulky Attacker","movepool":["gigadrain","recover","stealthrock","stoneedge","toxic"]}]},"armaldo":{"level":87,"sets":[{"role":"Spinner","movepool":["earthquake","rapidspin","stealthrock","stoneedge","toxic","xscissor"]},{"role":"Bulky Attacker","movepool":["aquatail","earthquake","stealthrock","stoneedge","swordsdance","xscissor"]}]},"milotic":{"level":82,"sets":[{"role":"Staller","movepool":["dragontail","haze","icebeam","recover","scald","toxic"]}]},"castform":{"level":98,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","icebeam","return","scald","thunderbolt","thunderwave"]}]},"kecleon":{"level":93,"sets":[{"role":"Bulky Support","movepool":["foulplay","recover","stealthrock","thunderwave","toxic"]}]},"banette":{"level":94,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerfighting","shadowclaw","shadowsneak","thunderwave","willowisp"]}]},"dusclops":{"level":85,"sets":[{"role":"Bulky Support","movepool":["rest","seismictoss","sleeptalk","willowisp"]}]},"tropius":{"level":93,"sets":[{"role":"Staller","movepool":["airslash","leechseed","protect","substitute"]}]},"chimecho":{"level":94,"sets":[{"role":"Bulky Support","movepool":["healbell","hiddenpowerfighting","psychic","recover","thunderwave","toxic"]},{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerfighting","psychic","recover","signalbeam"]}]},"absol":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["fireblast","nightslash","psychocut","pursuit","suckerpunch","superpower"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["nightslash","suckerpunch","superpower","swordsdance"]}]},"glalie":{"level":91,"sets":[{"role":"Fast Support","movepool":["earthquake","icebeam","spikes","superfang","taunt"],"preferredTypes":["Ground"]}]},"walrein":{"level":88,"sets":[{"role":"Bulky Support","movepool":["encore","icebeam","roar","superfang","surf","toxic"]},{"role":"Staller","movepool":["icebeam","protect","surf","toxic"]}]},"huntail":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["icebeam","return","shellsmash","suckerpunch","waterfall"],"preferredTypes":["Ice"]}]},"gorebyss":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","shellsmash"]}]},"relicanth":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headsmash","stealthrock","toxic","waterfall","yawn"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","headsmash","rockpolish","waterfall"],"preferredTypes":["Ground"]}]},"luvdisc":{"level":100,"sets":[{"role":"Staller","movepool":["icebeam","protect","scald","substitute","toxic"]}]},"salamence":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","fireblast","outrage","roost"],"preferredTypes":["Ground"]}]},"metagross":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["agility","earthquake","meteormash","thunderpunch","zenheadbutt"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["bulletpunch","earthquake","explosion","icepunch","meteormash","stealthrock","thunderpunch","zenheadbutt"],"preferredTypes":["Ground"]}]},"regirock":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["curse","drainpunch","rest","stoneedge"]},{"role":"Bulky Support","movepool":["drainpunch","earthquake","stealthrock","stoneedge","thunderwave","toxic"]},{"role":"Staller","movepool":["drainpunch","earthquake","protect","rockslide","toxic"]}]},"regice":{"level":85,"sets":[{"role":"Staller","movepool":["icebeam","protect","thunderbolt","toxic"]},{"role":"Bulky Attacker","movepool":["icebeam","rest","sleeptalk","thunderbolt"]},{"role":"Setup Sweeper","movepool":["focusblast","icebeam","rockpolish","thunderbolt"]}]},"registeel":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["curse","ironhead","rest","sleeptalk"]},{"role":"Bulky Support","movepool":["rest","seismictoss","sleeptalk","toxic"]},{"role":"Staller","movepool":["protect","seismictoss","stealthrock","toxic"]}]},"latias":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psyshock","roost"]}]},"latios":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psyshock","roost"]}]},"kyogre":{"level":69,"sets":[{"role":"Fast Attacker","movepool":["icebeam","surf","thunder","waterspout"]},{"role":"Bulky Support","movepool":["calmmind","icebeam","rest","sleeptalk","surf","thunder"]}]},"groudon":{"level":74,"sets":[{"role":"Bulky Support","movepool":["dragontail","earthquake","lavaplume","stealthrock","stoneedge","thunderwave"]},{"role":"Bulky Setup","movepool":["earthquake","firepunch","rockpolish","stoneedge","swordsdance"]}]},"rayquaza":{"level":73,"sets":[{"role":"Wallbreaker","movepool":["dracometeor","earthquake","extremespeed","outrage","vcreate"]},{"role":"Setup Sweeper","movepool":["dragondance","earthquake","extremespeed","outrage","vcreate"]},{"role":"Fast Attacker","movepool":["earthquake","extremespeed","outrage","swordsdance","vcreate"],"preferredTypes":["Normal"]}]},"jirachi":{"level":77,"sets":[{"role":"Bulky Support","movepool":["bodyslam","firepunch","healingwish","ironhead","protect","stealthrock","toxic","uturn","wish"]}]},"deoxys":{"level":73,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","extremespeed","icebeam","psychoboost","stealthrock","superpower"],"preferredTypes":["Fighting"]}]},"deoxysattack":{"level":72,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","extremespeed","icebeam","psychoboost","superpower"],"preferredTypes":["Fighting"]}]},"deoxysdefense":{"level":82,"sets":[{"role":"Bulky Support","movepool":["recover","seismictoss","spikes","stealthrock","taunt","toxic"]}]},"deoxysspeed":{"level":76,"sets":[{"role":"Fast Support","movepool":["psychoboost","spikes","stealthrock","superpower","taunt"]}]},"torterra":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","stealthrock","stoneedge","synthesis","woodhammer"]},{"role":"Bulky Setup","movepool":["earthquake","rockpolish","stoneedge","woodhammer"]}]},"infernape":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["closecombat","grassknot","machpunch","overheat","stealthrock"]},{"role":"Fast Attacker","movepool":["closecombat","flareblitz","machpunch","stoneedge","swordsdance","uturn"]}]},"empoleon":{"level":81,"sets":[{"role":"Staller","movepool":["icebeam","protect","scald","stealthrock","toxic"]},{"role":"Bulky Support","movepool":["icebeam","roar","scald","stealthrock","toxic"]},{"role":"Setup Sweeper","movepool":["agility","grassknot","hydropump","icebeam"]}]},"staraptor":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["bravebird","closecombat","doubleedge","quickattack","uturn"],"preferredTypes":["Fighting"]}]},"bibarel":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["curse","quickattack","return","waterfall"]}]},"kricketune":{"level":100,"sets":[{"role":"Setup Sweeper","movepool":["aerialace","brickbreak","bugbite","nightslash","swordsdance"]}]},"luxray":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["crunch","facade","superpower","wildcharge"]},{"role":"Bulky Attacker","movepool":["crunch","icefang","superpower","voltswitch","wildcharge"],"preferredTypes":["Fighting"]}]},"roserade":{"level":82,"sets":[{"role":"Fast Support","movepool":["gigadrain","hiddenpowerground","leafstorm","sleeppowder","sludgebomb","spikes","synthesis","toxicspikes"]}]},"rampardos":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","firepunch","rockpolish","rockslide","zenheadbutt"]},{"role":"Fast Attacker","movepool":["earthquake","firepunch","headsmash","rockslide"]}]},"bastiodon":{"level":90,"sets":[{"role":"Bulky Support","movepool":["metalburst","roar","rockblast","stealthrock","toxic"]},{"role":"Staller","movepool":["metalburst","protect","roar","rockblast","stealthrock","toxic"]}]},"wormadam":{"level":100,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerground","hiddenpowerrock","leafstorm","signalbeam","synthesis","toxic"]},{"role":"Staller","movepool":["gigadrain","protect","signalbeam","synthesis","toxic"]}]},"wormadamsandy":{"level":92,"sets":[{"role":"Staller","movepool":["earthquake","protect","stealthrock","toxic"]}]},"wormadamtrash":{"level":89,"sets":[{"role":"Staller","movepool":["flashcannon","protect","stealthrock","toxic"]}]},"mothim":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["airslash","bugbuzz","hiddenpowerground","quiverdance","substitute"]}]},"vespiquen":{"level":98,"sets":[{"role":"Staller","movepool":["airslash","roost","toxic","uturn"]}]},"pachirisu":{"level":92,"sets":[{"role":"Bulky Support","movepool":["superfang","thunderbolt","thunderwave","toxic","uturn"]},{"role":"Staller","movepool":["protect","thunderbolt","toxic","uturn"]}]},"floatzel":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["aquajet","crunch","icepunch","lowkick","switcheroo","waterfall"],"preferredTypes":["Ice"]},{"role":"Setup Sweeper","movepool":["aquajet","bulkup","crunch","icepunch","lowkick","substitute","waterfall"],"preferredTypes":["Ice"]}]},"cherrim":{"level":95,"sets":[{"role":"Fast Attacker","movepool":["gigadrain","healingwish","hiddenpowerfire","hiddenpowerrock","morningsun","naturepower"]},{"role":"Staller","movepool":["aromatherapy","gigadrain","leechseed","morningsun","naturepower","toxic"]}]},"gastrodon":{"level":84,"sets":[{"role":"Bulky Support","movepool":["clearsmog","earthquake","icebeam","recover","scald","toxic"]}]},"ambipom":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["fakeout","lowkick","payback","pursuit","return","uturn"]}]},"drifblim":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["acrobatics","destinybond","disable","shadowball","substitute","willowisp"]}]},"lopunny":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["healingwish","icepunch","jumpkick","return","switcheroo"]}]},"mismagius":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["destinybond","hiddenpowerfighting","painsplit","shadowball","substitute","taunt","willowisp"]},{"role":"Wallbreaker","movepool":["hiddenpowerfighting","nastyplot","shadowball","thunderbolt","trick"]}]},"honchkrow":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["bravebird","heatwave","pursuit","roost","suckerpunch","superpower"]}]},"purugly":{"level":89,"sets":[{"role":"Fast Support","movepool":["fakeout","hypnosis","return","shadowclaw","uturn"]},{"role":"Setup Sweeper","movepool":["honeclaws","hypnosis","irontail","return"]}]},"skuntank":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["crunch","fireblast","poisonjab","pursuit","suckerpunch","taunt"]}]},"bronzong":{"level":80,"sets":[{"role":"Bulky Support","movepool":["earthquake","hypnosis","psychic","stealthrock","toxic"]},{"role":"Staller","movepool":["earthquake","protect","psychic","toxic"]}]},"chatot":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["chatter","heatwave","hiddenpowerground","hypervoice","nastyplot","uturn"]},{"role":"Setup Sweeper","movepool":["chatter","heatwave","hiddenpowerground","hypervoice","nastyplot","substitute"]}]},"spiritomb":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["calmmind","darkpulse","rest","sleeptalk"]},{"role":"Bulky Attacker","movepool":["foulplay","painsplit","pursuit","shadowsneak","suckerpunch","willowisp"]}]},"garchomp":{"level":75,"sets":[{"role":"Fast Support","movepool":["earthquake","fireblast","outrage","stealthrock","stoneedge"]},{"role":"Fast Attacker","movepool":["earthquake","firefang","outrage","stoneedge","swordsdance"]}]},"lucario":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["closecombat","crunch","extremespeed","icepunch","swordsdance"],"preferredTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["aurasphere","darkpulse","flashcannon","nastyplot","vacuumwave"]}]},"hippowdon":{"level":83,"sets":[{"role":"Bulky Support","movepool":["earthquake","slackoff","stealthrock","stoneedge","toxic","whirlwind"]}]},"drapion":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["aquatail","crunch","earthquake","poisonjab","pursuit","swordsdance"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["crunch","earthquake","poisonjab","taunt","toxicspikes","whirlwind"]}]},"toxicroak":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["drainpunch","icepunch","poisonjab","substitute","suckerpunch","swordsdance"]}]},"carnivine":{"level":97,"sets":[{"role":"Bulky Support","movepool":["knockoff","powerwhip","sleeppowder","synthesis"]}]},"lumineon":{"level":89,"sets":[{"role":"Bulky Support","movepool":["icebeam","scald","toxic","uturn"]},{"role":"Staller","movepool":["icebeam","protect","scald","toxic","uturn"]}]},"abomasnow":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","earthquake","iceshard","woodhammer"]}]},"weavile":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["icepunch","iceshard","lowkick","nightslash","pursuit","swordsdance"]}]},"magnezone":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["flashcannon","hiddenpowerfire","hiddenpowerice","thunderbolt","voltswitch"]}]},"lickilicky":{"level":87,"sets":[{"role":"Bulky Support","movepool":["bodyslam","healbell","protect","toxic","wish"]},{"role":"Bulky Setup","movepool":["bodyslam","earthquake","explosion","powerwhip","return","swordsdance"],"preferredTypes":["Ground"]}]},"rhyperior":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icepunch","megahorn","rockpolish","stoneedge","swordsdance"]}]},"tangrowth":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","hiddenpowerfire","leafstorm","leechseed","powerwhip","rockslide","sleeppowder","synthesis"]},{"role":"Bulky Support","movepool":["earthquake","hiddenpowerfire","leafstorm","powerwhip","rockslide","sleeppowder"]}]},"electivire":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["crosschop","earthquake","flamethrower","icepunch","voltswitch","wildcharge"],"preferredTypes":["Ice"]}]},"magmortar":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["earthquake","fireblast","focusblast","hiddenpowergrass","hiddenpowerice","substitute","thunderbolt"],"preferredTypes":["Electric"]}]},"togekiss":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["airslash","aurasphere","nastyplot","roost","thunderwave"]},{"role":"Bulky Attacker","movepool":["airslash","healbell","roost","thunderwave"]},{"role":"Fast Attacker","movepool":["airslash","aurasphere","fireblast","trick"]}]},"yanmega":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["airslash","bugbuzz","hiddenpowerground","protect"]},{"role":"Wallbreaker","movepool":["airslash","bugbuzz","hiddenpowerground","uturn"]}]},"leafeon":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","leafblade","swordsdance","synthesis","xscissor"],"preferredTypes":["Normal"]}]},"glaceon":{"level":90,"sets":[{"role":"Bulky Support","movepool":["healbell","hiddenpowerground","icebeam","protect","wish"]},{"role":"Staller","movepool":["icebeam","protect","toxic","wish"]}]},"gliscor":{"level":78,"sets":[{"role":"Staller","movepool":["earthquake","protect","substitute","toxic"]},{"role":"Bulky Support","movepool":["earthquake","facade","roost","stealthrock","stoneedge","taunt","toxic","uturn"]},{"role":"Setup Sweeper","movepool":["earthquake","facade","roost","swordsdance"]}]},"mamoswine":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["earthquake","iceshard","iciclecrash","stealthrock"]},{"role":"Fast Attacker","movepool":["earthquake","iceshard","iciclecrash","stoneedge","superpower"]}]},"porygonz":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","hiddenpowerfighting","icebeam","nastyplot","thunderbolt","triattack","trick"]}]},"gallade":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["closecombat","nightslash","shadowsneak","swordsdance","trick","zenheadbutt"]}]},"probopass":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","powergem","stealthrock","thunderwave","toxic","voltswitch"]}]},"dusknoir":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icepunch","painsplit","shadowsneak","trick","willowisp"],"preferredTypes":["Ground"]}]},"froslass":{"level":82,"sets":[{"role":"Fast Support","movepool":["destinybond","icebeam","shadowball","spikes","taunt","thunderwave"]}]},"rotom":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","painsplit","shadowball","thunderbolt","trick","voltswitch","willowisp"]}]},"rotomheat":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerice","overheat","painsplit","thunderbolt","thunderwave","trick","voltswitch","willowisp"]}]},"rotomwash":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["hydropump","painsplit","thunderbolt","thunderwave","trick","voltswitch","willowisp"]}]},"rotomfrost":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","painsplit","substitute","thunderbolt","trick","voltswitch","willowisp"]}]},"rotomfan":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["airslash","painsplit","substitute","thunderbolt","trick","voltswitch","willowisp"]}]},"rotommow":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerice","leafstorm","painsplit","thunderbolt","thunderwave","trick","voltswitch","willowisp"]}]},"uxie":{"level":82,"sets":[{"role":"Bulky Support","movepool":["healbell","psychic","stealthrock","thunderwave","uturn","yawn"]}]},"mesprit":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["calmmind","healingwish","hiddenpowerfire","icebeam","psychic","psyshock","signalbeam","thunderbolt","trick","uturn"]},{"role":"Bulky Support","movepool":["hiddenpowerfire","psychic","stealthrock","thunderwave","toxic","uturn"]}]},"azelf":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["fireblast","nastyplot","psychic","psyshock","signalbeam","thunderbolt","trick","uturn"],"preferredTypes":["Fire"]},{"role":"Fast Support","movepool":["explosion","fireblast","psychic","stealthrock","taunt","uturn"]}]},"dialga":{"level":70,"sets":[{"role":"Bulky Attacker","movepool":["aurasphere","dracometeor","dragontail","fireblast","stealthrock","thunderbolt","toxic"],"preferredTypes":["Fire"]}]},"palkia":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","fireblast","hydropump","spacialrend","thunderwave"],"preferredTypes":["Fire"]}]},"heatran":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["earthpower","eruption","fireblast","hiddenpowerice"]},{"role":"Bulky Attacker","movepool":["earthpower","fireblast","hiddenpowerice","lavaplume","roar","stealthrock","toxic"],"preferredTypes":["Ground"]},{"role":"Staller","movepool":["earthpower","magmastorm","protect","toxic"]}]},"regigigas":{"level":83,"sets":[{"role":"Staller","movepool":["earthquake","return","substitute","thunderwave"]}]},"giratina":{"level":72,"sets":[{"role":"Fast Support","movepool":["dragonpulse","dragontail","rest","sleeptalk","willowisp"]},{"role":"Bulky Setup","movepool":["calmmind","dragonpulse","rest","sleeptalk"]}]},"giratinaorigin":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["dracometeor","earthquake","hiddenpowerfire","outrage","shadowball","shadowsneak","willowisp"]}]},"cresselia":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerfighting","moonlight","psyshock","substitute"]},{"role":"Bulky Support","movepool":["hiddenpowerfighting","moonlight","psychic","thunderwave","toxic"]}]},"phione":{"level":89,"sets":[{"role":"Staller","movepool":["raindance","rest","scald","toxic"]},{"role":"Bulky Support","movepool":["healbell","icebeam","scald","toxic","uturn"]}]},"manaphy":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["energyball","icebeam","surf","tailglow"]}]},"darkrai":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["darkpulse","darkvoid","focusblast","nastyplot"]},{"role":"Bulky Setup","movepool":["darkpulse","darkvoid","nastyplot","substitute"]}]},"shaymin":{"level":82,"sets":[{"role":"Fast Support","movepool":["airslash","earthpower","leechseed","rest","seedflare","substitute"],"preferredTypes":["Flying"]}]},"shayminsky":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["airslash","earthpower","hiddenpowerice","leechseed","seedflare","substitute"]}]},"arceus":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","shadowclaw","swordsdance"],"preferredTypes":["Ground"]}]},"arceusbug":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment"]}]},"arceusdark":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","focusblast","judgment","recover","refresh"]}]},"arceusdragon":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","outrage","recover","swordsdance"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover","refresh"]}]},"arceuselectric":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","icebeam","judgment","recover"]}]},"arceusfighting":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","darkpulse","icebeam","judgment","recover"]}]},"arceusfire":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment","recover","thunderbolt"]}]},"arceusflying":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover","refresh"]}]},"arceusghost":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","focusblast","judgment","recover","willowisp"]}]},"arceusgrass":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","fireblast","judgment","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment"]}]},"arceusground":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","stoneedge","swordsdance"],"preferredTypes":["Rock"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","judgment","recover"]}]},"arceusice":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover","thunderbolt"]}]},"arceuspoison":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","earthpower","fireblast","recover","sludgebomb"]},{"role":"Bulky Attacker","movepool":["earthquake","fireblast","icebeam","recover","sludgebomb","stealthrock","willowisp"]}]},"arceuspsychic":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","darkpulse","focusblast","judgment"]}]},"arceusrock":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","stoneedge","swordsdance"],"preferredTypes":["Ground"]}]},"arceussteel":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","judgment","recover","toxic","willowisp"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover"]}]},"arceuswater":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","icebeam","judgment","recover","willowisp"]}]},"victini":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["boltstrike","uturn","vcreate","zenheadbutt"]},{"role":"Fast Attacker","movepool":["boltstrike","energyball","focusblast","psychic","trick","uturn","vcreate"],"preferredTypes":["Electric"]}]},"serperior":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["aromatherapy","dragonpulse","gigadrain","glare","hiddenpowerfire","leechseed","substitute"]},{"role":"Setup Sweeper","movepool":["calmmind","dragonpulse","gigadrain","hiddenpowerfire","substitute"]},{"role":"Wallbreaker","movepool":["aquatail","leafblade","return","swordsdance"]}]},"emboar":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","flareblitz","headsmash","superpower","wildcharge"]},{"role":"Wallbreaker","movepool":["earthquake","fireblast","grassknot","superpower","wildcharge"]}]},"samurott":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["aquajet","grassknot","hydropump","icebeam","megahorn","superpower"]},{"role":"Wallbreaker","movepool":["aquajet","megahorn","superpower","swordsdance","waterfall"]}]},"watchog":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["crunch","hypnosis","return","superfang"]},{"role":"Setup Sweeper","movepool":["crunch","hypnosis","lowkick","return","substitute","swordsdance"],"preferredTypes":["Dark"]}]},"stoutland":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["crunch","return","superpower","thunderwave","wildcharge"],"preferredTypes":["Fighting"]}]},"liepard":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["darkpulse","encore","hiddenpowerfighting","nastyplot","thunderwave"]}]},"simisage":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","leafstorm","rockslide","superpower"]},{"role":"Setup Sweeper","movepool":["focusblast","gigadrain","hiddenpowerrock","nastyplot","substitute"]}]},"simisear":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["fireblast","focusblast","grassknot","hiddenpowerrock","nastyplot","substitute"]}]},"simipour":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["focusblast","hiddenpowergrass","hydropump","icebeam","nastyplot","substitute"],"preferredTypes":["Ice"]}]},"musharna":{"level":86,"sets":[{"role":"Bulky Support","movepool":["healbell","hiddenpowerfighting","moonlight","psychic","signalbeam","thunderwave","toxic"]},{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerfighting","moonlight","psyshock","signalbeam"]}]},"unfezant":{"level":89,"sets":[{"role":"Bulky Support","movepool":["hypnosis","pluck","return","roost","toxic","uturn"]}]},"zebstrika":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","overheat","thunderbolt","voltswitch","wildcharge"]}]},"gigalith":{"level":86,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","stealthrock","stoneedge","superpower"]}]},"swoobat":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["calmmind","heatwave","roost","storedpower"]},{"role":"Setup Sweeper","movepool":["airslash","calmmind","heatwave","roost","storedpower"]}]},"excadrill":{"level":81,"sets":[{"role":"Spinner","movepool":["earthquake","ironhead","rapidspin","swordsdance"]},{"role":"Setup Sweeper","movepool":["earthquake","ironhead","rockslide","swordsdance"]}]},"audino":{"level":92,"sets":[{"role":"Bulky Support","movepool":["doubleedge","healbell","protect","toxic","wish"]}]},"conkeldurr":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["bulkup","drainpunch","icepunch","machpunch","thunderpunch"]}]},"seismitoad":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","hydropump","raindance","sludgewave"]},{"role":"Bulky Support","movepool":["earthquake","scald","sludgebomb","stealthrock","toxic"]},{"role":"Staller","movepool":["earthquake","protect","scald","toxic"]}]},"throh":{"level":88,"sets":[{"role":"Bulky Support","movepool":["bulkup","circlethrow","payback","rest","sleeptalk"]}]},"sawk":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["bulkup","closecombat","earthquake","icepunch","stoneedge"]}]},"leavanny":{"level":91,"sets":[{"role":"Setup Sweeper","movepool":["leafblade","return","swordsdance","xscissor"]}]},"scolipede":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["earthquake","megahorn","rockslide","spikes","swordsdance","toxicspikes"],"preferredTypes":["Ground"]}]},"whimsicott":{"level":87,"sets":[{"role":"Fast Support","movepool":["encore","gigadrain","stunspore","taunt","toxic","uturn"]},{"role":"Staller","movepool":["hurricane","leechseed","protect","substitute"]}]},"lilligant":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["gigadrain","hiddenpowerfire","hiddenpowerrock","petaldance","quiverdance","sleeppowder"]}]},"basculin":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["aquajet","crunch","superpower","waterfall","zenheadbutt"]}]},"krookodile":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["crunch","earthquake","pursuit","stealthrock","stoneedge","superpower"]}]},"darmanitan":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["earthquake","flareblitz","rockslide","superpower","uturn"]}]},"maractus":{"level":97,"sets":[{"role":"Fast Support","movepool":["gigadrain","hiddenpowerfire","spikes","suckerpunch","synthesis","toxic"]},{"role":"Staller","movepool":["gigadrain","hiddenpowerfire","hiddenpowerice","leechseed","protect"]}]},"crustle":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","shellsmash","stoneedge","xscissor"]}]},"scrafty":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["crunch","dragondance","highjumpkick","icepunch","zenheadbutt"]},{"role":"Bulky Setup","movepool":["bulkup","crunch","drainpunch","rest"]}]},"sigilyph":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["airslash","calmmind","heatwave","psyshock","roost"]},{"role":"Wallbreaker","movepool":["airslash","energyball","heatwave","icebeam","psychic","psyshock"],"preferredTypes":["Psychic"]},{"role":"Staller","movepool":["cosmicpower","psychoshift","roost","storedpower"]}]},"cofagrigus":{"level":86,"sets":[{"role":"Bulky Support","movepool":["haze","hiddenpowerfighting","painsplit","shadowball","willowisp"]},{"role":"Bulky Setup","movepool":["hiddenpowerfighting","nastyplot","shadowball","trickroom"]}]},"carracosta":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["aquajet","earthquake","icebeam","shellsmash","stoneedge","waterfall"]}]},"archeops":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["acrobatics","earthquake","roost","stealthrock","stoneedge","uturn"],"preferredTypes":["Ground"]}]},"garbodor":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["drainpunch","gunkshot","haze","painsplit","spikes","toxicspikes"]}]},"zoroark":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","flamethrower","focusblast","nastyplot","trick","uturn"]}]},"cinccino":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["bulletseed","rockblast","tailslap","uturn"]}]},"gothitelle":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","hiddenpowerfighting","psychic","signalbeam","thunderbolt","trick"]}]},"reuniclus":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","focusblast","psychic","psyshock","recover","signalbeam","trickroom"]},{"role":"Wallbreaker","movepool":["focusblast","psychic","psyshock","shadowball","trickroom"]}]},"swanna":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","icebeam","roost","scald","toxic"]},{"role":"Setup Sweeper","movepool":["hurricane","raindance","rest","surf"]}]},"vanilluxe":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["autotomize","explosion","flashcannon","hiddenpowerground","icebeam"],"preferredTypes":["Ground"]}]},"sawsbuck":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","hornleech","naturepower","return","substitute","swordsdance"],"preferredTypes":["Normal"]}]},"emolga":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["acrobatics","encore","roost","thunderbolt","toxic","uturn"]}]},"escavalier":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["ironhead","megahorn","pursuit","return","swordsdance"]}]},"amoonguss":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["clearsmog","foulplay","gigadrain","hiddenpowerground","sludgebomb","spore","stunspore","toxic"]},{"role":"Bulky Support","movepool":["gigadrain","sludgebomb","spore","synthesis"]}]},"jellicent":{"level":82,"sets":[{"role":"Bulky Support","movepool":["icebeam","recover","scald","shadowball","toxic","willowisp"]}]},"alomomola":{"level":86,"sets":[{"role":"Bulky Support","movepool":["protect","scald","toxic","wish"]}]},"galvantula":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["bugbuzz","gigadrain","hiddenpowerice","thunder","voltswitch"],"preferredTypes":["Bug"]}]},"ferrothorn":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["gyroball","leechseed","powerwhip","spikes","stealthrock"]},{"role":"Bulky Support","movepool":["powerwhip","spikes","stealthrock","thunderwave","toxic"]}]},"klinklang":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["geargrind","return","shiftgear","substitute","wildcharge"]}]},"eelektross":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["flamethrower","gigadrain","hiddenpowerice","superpower","thunderbolt","uturn"]},{"role":"Bulky Setup","movepool":["aquatail","coil","drainpunch","firepunch","wildcharge"],"preferredTypes":["Fighting"]}]},"beheeyem":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerfighting","psychic","signalbeam","thunderbolt","trick","trickroom"]}]},"chandelure":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["energyball","fireblast","hiddenpowerfighting","shadowball","trick"],"preferredTypes":["Grass"]},{"role":"Bulky Setup","movepool":["calmmind","fireblast","shadowball","substitute"]}]},"haxorus":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","outrage","superpower"]}]},"beartic":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["aquajet","iciclecrash","stoneedge","superpower","swordsdance"],"preferredTypes":["Fighting"]}]},"cryogonal":{"level":85,"sets":[{"role":"Bulky Support","movepool":["haze","hiddenpowerground","icebeam","rapidspin","recover","toxic"]}]},"accelgor":{"level":85,"sets":[{"role":"Fast Support","movepool":["bugbuzz","encore","focusblast","gigadrain","hiddenpowerground","hiddenpowerrock","spikes","yawn"]}]},"stunfisk":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["discharge","earthpower","rest","scald","sleeptalk","stealthrock","toxic"]}]},"mienshao":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["acrobatics","highjumpkick","stoneedge","substitute","swordsdance"],"preferredTypes":["Flying"]},{"role":"Fast Attacker","movepool":["fakeout","highjumpkick","stoneedge","uturn"]},{"role":"Wallbreaker","movepool":["drainpunch","highjumpkick","stoneedge","uturn"]}]},"druddigon":{"level":84,"sets":[{"role":"Bulky Support","movepool":["dragontail","earthquake","glare","outrage","stealthrock","suckerpunch","superpower"]}]},"golurk":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["dynamicpunch","earthquake","icepunch","rockpolish","stealthrock","stoneedge"],"preferredTypes":["Fighting"]}]},"bisharp":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["ironhead","nightslash","pursuit","suckerpunch"]},{"role":"Setup Sweeper","movepool":["ironhead","lowkick","nightslash","suckerpunch","swordsdance"],"preferredTypes":["Fighting"]}]},"bouffalant":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headcharge","stoneedge","superpower","swordsdance"]}]},"braviary":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","bulkup","roost","superpower"]},{"role":"Fast Attacker","movepool":["bravebird","return","superpower","uturn"]}]},"mandibuzz":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","foulplay","roost","taunt","toxic","whirlwind"]},{"role":"Staller","movepool":["foulplay","roost","taunt","toxic","whirlwind"]}]},"heatmor":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["fireblast","gigadrain","suckerpunch","superpower"]}]},"durant":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["honeclaws","ironhead","rockslide","superpower","xscissor"],"preferredTypes":["Fighting"]}]},"hydreigon":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","dracometeor","fireblast","focusblast","roost","uturn"]}]},"volcarona":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["bugbuzz","fierydance","fireblast","gigadrain","hiddenpowerrock","quiverdance","roost"]}]},"cobalion":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["closecombat","ironhead","stealthrock","stoneedge","taunt","thunderwave","toxic"],"preferredTypes":["Steel"]},{"role":"Bulky Setup","movepool":["closecombat","ironhead","stoneedge","swordsdance"]}]},"terrakion":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","quickattack","stealthrock","stoneedge","swordsdance"],"preferredTypes":["Ground"]}]},"virizion":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["closecombat","leafblade","stoneedge","swordsdance"]}]},"tornadus":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["acrobatics","bulkup","superpower","taunt"]},{"role":"Fast Attacker","movepool":["focusblast","heatwave","hurricane","uturn"]}]},"tornadustherian":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["focusblast","heatwave","hurricane","superpower","uturn"]}]},"thundurus":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["focusblast","hiddenpowerflying","hiddenpowerice","nastyplot","substitute","thunderbolt"]},{"role":"Fast Support","movepool":["focusblast","hiddenpowerflying","hiddenpowerice","taunt","thunderbolt","thunderwave"]}]},"thundurustherian":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["focusblast","hiddenpowerflying","hiddenpowerice","nastyplot","thunderbolt","voltswitch"]}]},"reshiram":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["blueflare","dracometeor","flamecharge","roost","toxic"]}]},"zekrom":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["boltstrike","dracometeor","outrage","roost","voltswitch"]},{"role":"Setup Sweeper","movepool":["boltstrike","honeclaws","outrage","roost","substitute"]}]},"landorus":{"level":76,"sets":[{"role":"Wallbreaker","movepool":["earthpower","focusblast","psychic","rockpolish","rockslide","sludgewave","stealthrock"],"preferredTypes":["Rock"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","focusblast","psychic","rockpolish","sludgewave"]}]},"landorustherian":{"level":78,"sets":[{"role":"Bulky Support","movepool":["earthquake","stealthrock","stoneedge","toxic","uturn"]},{"role":"Setup Sweeper","movepool":["earthquake","rockpolish","stoneedge","superpower","swordsdance"],"preferredTypes":["Rock"]}]},"kyurem":{"level":77,"sets":[{"role":"Staller","movepool":["earthpower","icebeam","roost","substitute"]},{"role":"Bulky Attacker","movepool":["dracometeor","earthpower","focusblast","icebeam","outrage","roost","substitute"]}]},"kyuremblack":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","fusionbolt","icebeam","outrage","roost","substitute"]}]},"kyuremwhite":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["dracometeor","earthpower","fusionflare","icebeam","roost"]}]},"keldeo":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["calmmind","hiddenpowerelectric","hiddenpowerflying","hydropump","icywind","scald","secretsword"]},{"role":"Bulky Setup","movepool":["calmmind","scald","secretsword","substitute"]}]},"meloetta":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["calmmind","focusblast","hypervoice","psyshock","uturn"]},{"role":"Wallbreaker","movepool":["closecombat","relicsong","return","shadowclaw"]}]},"genesect":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["blazekick","ironhead","shiftgear","thunderbolt","xscissor"]},{"role":"Wallbreaker","movepool":["blazekick","extremespeed","ironhead","uturn"]},{"role":"Fast Attacker","movepool":["bugbuzz","flamethrower","flashcannon","icebeam","thunderbolt","uturn"],"preferredTypes":["Bug"]}]}} as any;
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
				!counter.get('Bug') && (movePool.includes('megahorn') || abilities.has('Tinted Lens'))
			),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
			Dragon: (movePool, moves, abilities, types, counter) => !counter.get('Dragon'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting'),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Flying') && !['mantine', 'murkrow'].includes(species.id) &&
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
			Rock: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Rock') && (species.baseStats.atk >= 95 || abilities.has('Rock Head'))
			),
			Steel: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Steel') && ['aggron', 'metagross'].includes(species.id)
			),
			Water: (movePool, moves, abilities, types, counter) => !counter.get('Water'),
		};
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
		];

		for (const pair of incompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

		if (species.id === 'dugtrio') this.incompatibleMoves(moves, movePool, statusMoves, 'memento');

		const statusInflictingMoves = ['stunspore', 'thunderwave', 'toxic', 'willowisp', 'yawn'];
		if (!abilities.has('Prankster') && role !== 'Staller') {
			this.incompatibleMoves(moves, movePool, statusInflictingMoves, statusInflictingMoves);
		}

		if (abilities.has('Guts')) this.incompatibleMoves(moves, movePool, 'protect', 'swordsdance');
	}

	// Generate random moveset for a given species, role, preferred type.
	randomMoveset(
		types: string[],
		abilities: Set<string>,
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
		if (movePool.includes('facade') && abilities.has('Guts')) {
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
		if (movePool.includes('thunderwave') && abilities.has('Prankster')) {
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
			const enforcedMoves = ['protect', 'toxic', 'wish'];
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
				const currentAttackType = counter.damagingMoves.values().next().value.type;
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
		abilities: Set<string>,
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		preferredType: string,
		role: RandomTeamsTypes.Role
	): boolean {
		switch (ability) {
		case 'Flare Boost': case 'Gluttony': case 'Ice Body': case 'Infiltrator': case 'Moody': case 'Pickpocket':
		case 'Pressure': case 'Sand Veil': case 'Sniper': case 'Snow Cloak': case 'Steadfast': case 'Unburden':
			return true;
		case 'Chlorophyll':
			// Petal Dance is for Lilligant
			return (
				species.baseStats.spe > 100 || moves.has('petaldance') ||
				(!moves.has('sunnyday') && !teamDetails.sun)
			);
		case 'Compound Eyes': case 'No Guard':
			return !counter.get('inaccurate');
		case 'Contrary': case 'Skill Link':
			return !counter.get(toID(ability));
		case 'Defiant': case 'Justified':
			return !counter.get('Physical');
		case 'Guts':
			return (!moves.has('facade') && !moves.has('sleeptalk'));
		case 'Hustle':
			return (counter.get('Physical') < 2 || species.id === 'delibird');
		case 'Hydration': case 'Rain Dish': case 'Swift Swim':
			return (
				species.baseStats.spe > 100 || !moves.has('raindance') && !teamDetails.rain ||
				!moves.has('raindance') && ['Rock Head', 'Water Absorb'].some(abil => abilities.has(abil))
			);
		case 'Intimidate':
			// Slam part is for Tauros
			return (moves.has('bodyslam') || species.id === 'staraptor');
		case 'Iron Fist':
			return (!counter.get(toID(ability)) || species.id === 'golurk');
		case 'Lightning Rod':
			return (types.has('Ground') || ((!!teamDetails.rain || moves.has('raindance')) && species.id === 'seaking'));
		case 'Magic Guard': case 'Speed Boost':
			return (abilities.has('Tinted Lens') && role === 'Wallbreaker');
		case 'Mold Breaker':
			return (species.baseSpecies === 'Basculin' || species.id === 'rampardos');
		case 'Moxie':
			return (!counter.get('Physical') || moves.has('stealthrock'));
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Prankster':
			return (!counter.get('Status') || (species.id === 'tornadus' && moves.has('bulkup')));
		case 'Poison Heal':
			return (species.id === 'breloom' && role === 'Fast Attacker');
		case 'Shed Skin':
			return !moves.has('rest');
		case 'Synchronize':
			return (counter.get('Status') < 2 || !!counter.get('recoil'));
		case 'Regenerator':
			return ((species.id === 'mienshao' && role !== 'Fast Attacker') || species.id === 'reuniclus');
		case 'Reckless': case 'Rock Head':
			return !counter.get('recoil');
		case 'Sand Force': case 'Sand Rush':
			return !teamDetails.sand;
		case 'Serene Grace':
			return !counter.get('serenegrace');
		case 'Sheer Force':
			return (!counter.get('sheerforce') || moves.has('doubleedge') || abilities.has('Guts'));
		case 'Simple':
			return !counter.get('setup');
		case 'Solar Power':
			return (!counter.get('Special') || !teamDetails.sun);
		case 'Sticky Hold':
			return species.id !== 'accelgor';
		case 'Sturdy':
			return (!!counter.get('recoil') && !counter.get('recovery') || species.id === 'steelix' && !!counter.get('sheerforce'));
		case 'Swarm':
			return !counter.get('Bug') && !moves.has('uturn');
		case 'Technician':
			return (!counter.get('technician') || moves.has('tailslap'));
		case 'Tinted Lens':
			// Night Shade part is for Noctowl
			return (
				moves.has('nightshade') ||
				['illumise', 'sigilyph', 'yanmega'].some(m => species.id === (m)) && role !== 'Wallbreaker'
			);
		case 'Torrent':
			return !counter.get('Water');
		case 'Unaware':
			return ((role !== 'Bulky Attacker' && role !== 'Bulky Setup') || species.id === 'swoobat');
		case 'Water Absorb':
			return moves.has('raindance') || ['Drizzle', 'Unaware', 'Volt Absorb'].some(abil => abilities.has(abil));
		}

		return false;
	}


	getAbility(
		types: Set<string>,
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): string {
		const abilityData = Array.from(abilities).map(a => this.dex.abilities.get(a));
		Utils.sortBy(abilityData, abil => -abil.rating);

		if (abilityData.length <= 1) return abilityData[0].name;

		// Hard-code abilities here
		if (
			abilities.has('Guts') &&
			!abilities.has('Quick Feet') &&
			(moves.has('facade') || (moves.has('sleeptalk') && moves.has('rest')))
		) return 'Guts';
		if (species.id === 'starmie') return role === 'Wallbreaker' ? 'Analytic' : 'Natural Cure';
		if (species.id === 'beheeyem') return 'Analytic';
		if (species.id === 'ninetales') return 'Drought';
		if (species.id === 'gligar') return 'Immunity';
		if (species.id === 'arcanine') return 'Intimidate';
		if (species.id === 'altaria') return 'Natural Cure';
		if (species.id === 'mandibuzz') return 'Overcoat';
		// If Ambipom doesn't qualify for Technician, Skill Link is useless on it
		if (species.id === 'ambipom' && !counter.get('technician')) return 'Pickup';
		if (['spiritomb', 'vespiquen', 'weavile'].includes(species.id)) return 'Pressure';
		if (species.id === 'druddigon') return 'Rough Skin';
		if (species.id === 'stoutland') return 'Scrappy';
		if (species.id === 'octillery') return 'Sniper';
		if (species.id === 'stunfisk') return 'Static';
		if (species.id === 'zangoose') return 'Toxic Boost';
		if (species.id === 'porygon2' || species.id === 'gardevoir') return 'Trace';

		if (abilities.has('Harvest')) return 'Harvest';
		if (abilities.has('Shed Skin') && moves.has('rest') && !moves.has('sleeptalk')) return 'Shed Skin';
		if (abilities.has('Unburden') && ['acrobatics', 'closecombat'].some(m => moves.has(m))) return 'Unburden';

		let abilityAllowed: Ability[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilityData) {
			if (ability.rating >= 1 && !this.shouldCullAbility(
				ability.name, types, moves, abilities, counter, movePool, teamDetails, species, preferredType, role
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
		if (moves.has('shellsmash')) return 'White Herb';
		if (moves.has('psychoshift')) return 'Flame Orb';
		if (ability === 'Magic Guard' && role !== 'Bulky Support') {
			return moves.has('counter') ? 'Focus Sash' : 'Life Orb';
		}
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
			(!counter.get('recoil') || ability === 'Rock Head') &&
			(counter.get('hazards') || !(moves.has('uturn') || moves.has('voltswitch')))
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
		const abilities = new Set(Object.values(species.abilities));
		if (species.unreleasedHidden) abilities.delete(species.abilities.H);

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
		let srWeakness = srImmunity ? 0 : this.dex.getEffectiveness('Rock', species);
		// Crash damage move users want an odd HP to survive two misses
		if (['highjumpkick', 'jumpkick'].some(m => moves.has(m))) srWeakness = 2;
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
			} else {
				// Maximize number of Stealth Rock switch-ins
				if (srWeakness <= 0 || ability === 'Regenerator' || ['Black Sludge', 'Leftovers', 'Life Orb'].includes(item)) break;
				if (item !== 'Sitrus Berry' && hp % (4 / srWeakness) > 0) break;
				// Minimise number of Stealth Rock switch-ins to activate Sitrus Berry
				if (item === 'Sitrus Berry' && hp % (4 / srWeakness) === 0) break;
			}
			evs.hp -= 4;
		}

		// Minimize confusion damage
		if (!counter.get('Physical') && !moves.has('transform')) {
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

			// Increment level 100 counter
			if (set.level === 100) numMaxLevelPokemon++;

			// Team details
			if (set.ability === 'Snow Warning' || set.moves.includes('hail')) teamDetails.hail = 1;
			if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails.rain = 1;
			if (set.ability === 'Sand Stream') teamDetails.sand = 1;
			if (set.ability === 'Drought' || set.moves.includes('sunnyday')) teamDetails.sun = 1;
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
