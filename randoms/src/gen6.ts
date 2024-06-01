import {BattleFactorySpecies, RandomGen7Teams, ZeroAttackHPIVs} from './gen7';
import {MoveCounter, TeamData} from './gen8';
import {Utils} from './utils';
import {
	Ability,
	AnyObject,
	Format,
	ModdedDex,
	PRNG,
	PRNGSeed,
	PlayerOptions,
	RandomTeamsTypes,
	Species,
	StatID,
	toID,
} from '@pkmn/sim';

/* eslint-disable */
const randomSetsJSON = {"venusaur":{"level":83,"sets":[{"role":"Staller","movepool":["gigadrain","leechseed","sleeppowder","sludgebomb","substitute"]},{"role":"Bulky Attacker","movepool":["earthquake","energyball","knockoff","sleeppowder","sludgebomb","synthesis"]}]},"venusaurmega":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","gigadrain","knockoff","sleeppowder","sludgebomb","synthesis"]}]},"charizard":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["airslash","earthquake","fireblast","roost","willowisp"]}]},"charizardmegax":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["dragonclaw","dragondance","earthquake","flareblitz","roost"]}]},"charizardmegay":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["airslash","fireblast","roost","solarbeam"]},{"role":"Bulky Attacker","movepool":["dragonpulse","fireblast","roost","solarbeam"]}]},"blastoise":{"level":84,"sets":[{"role":"Bulky Support","movepool":["icebeam","rapidspin","roar","scald","toxic"]},{"role":"Staller","movepool":["haze","icebeam","protect","rapidspin","scald","toxic"]}]},"blastoisemega":{"level":82,"sets":[{"role":"Bulky Support","movepool":["aurasphere","darkpulse","icebeam","rapidspin","scald"]}]},"butterfree":{"level":92,"sets":[{"role":"Setup Sweeper","movepool":["bugbuzz","energyball","psychic","quiverdance","sleeppowder"]}]},"beedrill":{"level":91,"sets":[{"role":"Fast Support","movepool":["defog","knockoff","poisonjab","toxicspikes","uturn"]}]},"beedrillmega":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["drillrun","knockoff","poisonjab","protect","uturn"]}]},"pidgeot":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","defog","heatwave","return","roost","uturn"]}]},"pidgeotmega":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["defog","heatwave","hurricane","roost","uturn","workup"]}]},"raticate":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["crunch","facade","flamewheel","protect","suckerpunch","swordsdance","uturn"],"preferredTypes":["Dark"]}]},"fearow":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","drillpeck","drillrun","return","uturn"]}]},"arbok":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["aquatail","coil","earthquake","gunkshot","rest","suckerpunch"],"preferredTypes":["Ground"]}]},"pikachu":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["extremespeed","grassknot","hiddenpowerice","knockoff","surf","voltswitch","volttackle"]}]},"raichu":{"level":87,"sets":[{"role":"Fast Support","movepool":["encore","hiddenpowerice","knockoff","nastyplot","nuzzle","thunderbolt","voltswitch"],"preferredTypes":["Ice"]},{"role":"Fast Attacker","movepool":["focusblast","grassknot","nastyplot","surf","thunderbolt","voltswitch"]}]},"sandslash":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","knockoff","rapidspin","stealthrock","stoneedge","swordsdance","toxic"]}]},"nidoqueen":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["earthpower","fireblast","icebeam","sludgewave","stealthrock","toxicspikes"],"preferredTypes":["Ice"]}]},"nidoking":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["earthpower","fireblast","icebeam","sludgewave","substitute","superpower"],"preferredTypes":["Ice"]}]},"clefable":{"level":80,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","knockoff","moonblast","softboiled","stealthrock","thunderwave"]},{"role":"Bulky Setup","movepool":["calmmind","fireblast","moonblast","softboiled"]}]},"ninetales":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["fireblast","hiddenpowerrock","nastyplot","solarbeam"]},{"role":"Bulky Setup","movepool":["fireblast","nastyplot","solarbeam","substitute","willowisp"],"preferredTypes":["Grass"]}]},"wigglytuff":{"level":93,"sets":[{"role":"Bulky Support","movepool":["dazzlinggleam","fireblast","healbell","knockoff","protect","stealthrock","thunderwave","wish"]}]},"vileplume":{"level":88,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","gigadrain","hiddenpowerground","sleeppowder","sludgebomb","synthesis"]}]},"parasect":{"level":99,"sets":[{"role":"Bulky Attacker","movepool":["aromatherapy","knockoff","seedbomb","spore","stunspore","xscissor"],"preferredTypes":["Bug"]}]},"venomoth":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["bugbuzz","quiverdance","sleeppowder","sludgebomb","substitute"]}]},"dugtrio":{"level":86,"sets":[{"role":"Fast Support","movepool":["earthquake","memento","stealthrock","stoneedge","suckerpunch"]}]},"persian":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","fakeout","gunkshot","knockoff","return","seedbomb","taunt","uturn"],"preferredTypes":["Dark"]},{"role":"Setup Sweeper","movepool":["hiddenpowerfighting","hiddenpowerfire","hypervoice","nastyplot","shadowball","waterpulse"]}]},"golduck":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["calmmind","encore","focusblast","hydropump","icebeam","psyshock","scald"],"preferredTypes":["Ice"]}]},"primeape":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","gunkshot","honeclaws","stoneedge","uturn"]}]},"arcanine":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["closecombat","extremespeed","flareblitz","morningsun","roar","toxic","wildcharge","willowisp"]},{"role":"Fast Attacker","movepool":["closecombat","extremespeed","flareblitz","morningsun","wildcharge"],"preferredTypes":["Fighting"]}]},"poliwrath":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["focusblast","icepunch","raindance","waterfall"]},{"role":"Bulky Attacker","movepool":["circlethrow","rest","scald","sleeptalk"]}]},"alakazam":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["counter","focusblast","psychic","psyshock","shadowball"]},{"role":"Setup Sweeper","movepool":["calmmind","encore","focusblast","psychic","psyshock","shadowball","substitute"],"preferredTypes":["Fighting"]}]},"alakazammega":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","encore","focusblast","psychic","psyshock","shadowball","substitute"],"preferredTypes":["Fighting"]}]},"machamp":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["bulkup","bulletpunch","dynamicpunch","knockoff","stoneedge"],"preferredTypes":["Dark"]},{"role":"AV Pivot","movepool":["bulletpunch","dynamicpunch","knockoff","stoneedge"]}]},"victreebel":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerground","knockoff","powerwhip","sleeppowder","sludgebomb","suckerpunch"]},{"role":"Setup Sweeper","movepool":["powerwhip","sludgebomb","sunnyday","weatherball"]}]},"tentacruel":{"level":83,"sets":[{"role":"Bulky Support","movepool":["haze","knockoff","rapidspin","scald","sludgebomb","toxicspikes"]}]},"golem":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","stealthrock","stoneedge","suckerpunch","toxic"]},{"role":"Bulky Setup","movepool":["earthquake","explosion","rockpolish","stoneedge","suckerpunch"]}]},"rapidash":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["drillrun","flareblitz","morningsun","wildcharge","willowisp"]},{"role":"Wallbreaker","movepool":["drillrun","flareblitz","megahorn","morningsun","wildcharge"]}]},"slowbro":{"level":81,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","psyshock","scald","slackoff","thunderwave","toxic"]},{"role":"AV Pivot","movepool":["fireblast","futuresight","icebeam","psyshock","scald"]}]},"slowbromega":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","fireblast","psyshock","scald","slackoff"]}]},"farfetchd":{"level":100,"sets":[{"role":"Setup Sweeper","movepool":["bravebird","knockoff","leafblade","return","swordsdance"]}]},"dodrio":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["bravebird","doubleedge","knockoff","quickattack","return"]},{"role":"Fast Attacker","movepool":["bravebird","knockoff","return","roost"]}]},"dewgong":{"level":91,"sets":[{"role":"Staller","movepool":["icebeam","protect","surf","toxic"]},{"role":"Bulky Support","movepool":["encore","icebeam","surf","toxic"]}]},"muk":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["brickbreak","curse","gunkshot","haze","icepunch","poisonjab","shadowsneak"],"preferredTypes":["Fighting"]}]},"cloyster":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["hydropump","iciclespear","rockblast","shellsmash"]}]},"gengar":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["focusblast","painsplit","shadowball","sludgewave","substitute","trick","willowisp"]}]},"gengarmega":{"level":77,"sets":[{"role":"Fast Support","movepool":["disable","perishsong","protect","shadowball","substitute"]},{"role":"Fast Attacker","movepool":["destinybond","disable","focusblast","shadowball","sludgewave","taunt"]}]},"hypno":{"level":93,"sets":[{"role":"Bulky Support","movepool":["focusblast","foulplay","protect","psychic","thunderwave","toxic","wish"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"]}]},"kingler":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["agility","crabhammer","knockoff","rockslide","superpower","swordsdance","xscissor"]}]},"electrode":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["foulplay","hiddenpowerice","signalbeam","taunt","thunderbolt","voltswitch"],"preferredTypes":["Ice"]},{"role":"Fast Support","movepool":["hiddenpowerice","thunderbolt","thunderwave","toxic","voltswitch"]}]},"exeggutor":{"level":92,"sets":[{"role":"Bulky Support","movepool":["gigadrain","hiddenpowerfire","leechseed","psychic","sleeppowder","substitute"],"preferredTypes":["Psychic"]}]},"marowak":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","knockoff","stealthrock","stoneedge","swordsdance"],"preferredTypes":["Rock"]}]},"hitmonlee":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["highjumpkick","knockoff","machpunch","poisonjab","rapidspin","stoneedge"],"preferredTypes":["Dark"]},{"role":"Setup Sweeper","movepool":["bulkup","closecombat","knockoff","poisonjab","stoneedge"],"preferredTypes":["Dark"]}]},"hitmonchan":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["bulkup","drainpunch","icepunch","machpunch","rapidspin","stoneedge"]}]},"weezing":{"level":86,"sets":[{"role":"Bulky Support","movepool":["fireblast","painsplit","sludgebomb","toxicspikes","willowisp"]}]},"rhydon":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","megahorn","stealthrock","stoneedge","swordsdance","toxic"]}]},"chansey":{"level":86,"sets":[{"role":"Staller","movepool":["aromatherapy","seismictoss","softboiled","stealthrock","thunderwave","toxic","wish"]}]},"kangaskhan":{"level":85,"sets":[{"role":"Bulky Support","movepool":["doubleedge","drainpunch","earthquake","fakeout","return","suckerpunch"]},{"role":"AV Pivot","movepool":["drainpunch","earthquake","fakeout","return","suckerpunch"]}]},"kangaskhanmega":{"level":73,"sets":[{"role":"Fast Support","movepool":["bodyslam","crunch","fakeout","seismictoss","suckerpunch"]},{"role":"Setup Sweeper","movepool":["bodyslam","crunch","earthquake","poweruppunch","return","suckerpunch"],"preferredTypes":["Ground"]}]},"seaking":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["drillrun","icebeam","knockoff","megahorn","raindance","waterfall"],"preferredTypes":["Dark"]}]},"starmie":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["hydropump","icebeam","psyshock","recover","thunderbolt"]},{"role":"Bulky Support","movepool":["psyshock","rapidspin","recover","scald","thunderwave","toxic"]}]},"mrmime":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["dazzlinggleam","encore","focusblast","healingwish","nastyplot","psychic","psyshock","shadowball"],"preferredTypes":["Psychic"]}]},"scyther":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["aerialace","brickbreak","knockoff","pursuit","uturn"]},{"role":"Setup Sweeper","movepool":["aerialace","brickbreak","bugbite","knockoff","roost","swordsdance"]}]},"jynx":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["focusblast","icebeam","lovelykiss","psychic","psyshock","trick"]},{"role":"Setup Sweeper","movepool":["focusblast","icebeam","lovelykiss","nastyplot","psyshock"]}]},"pinsir":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","knockoff","stealthrock","stoneedge","swordsdance","xscissor"],"preferredTypes":["Ground"]}]},"pinsirmega":{"level":74,"sets":[{"role":"Bulky Setup","movepool":["closecombat","earthquake","quickattack","return","swordsdance"]}]},"tauros":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["bodyslam","earthquake","fireblast","rockslide","zenheadbutt"],"preferredTypes":["Ground"]},{"role":"Fast Attacker","movepool":["doubleedge","earthquake","stoneedge","zenheadbutt"]}]},"gyarados":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","stoneedge","substitute","waterfall"]}]},"gyaradosmega":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["crunch","dragondance","earthquake","substitute","waterfall"]}]},"lapras":{"level":87,"sets":[{"role":"Bulky Support","movepool":["freezedry","healbell","hydropump","icebeam","toxic"]},{"role":"Staller","movepool":["freezedry","hydropump","protect","toxic"]}]},"ditto":{"level":84,"sets":[{"role":"Fast Support","movepool":["transform"]}]},"vaporeon":{"level":83,"sets":[{"role":"Bulky Support","movepool":["healbell","icebeam","protect","scald","wish"]},{"role":"Staller","movepool":["protect","scald","toxic","wish"]}]},"jolteon":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","shadowball","thunderbolt","voltswitch"]},{"role":"Wallbreaker","movepool":["hiddenpowerice","signalbeam","thunderbolt","voltswitch"]}]},"flareon":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["facade","flamecharge","flareblitz","quickattack","superpower"]}]},"omastar":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","shellsmash"]}]},"kabutops":{"level":87,"sets":[{"role":"Fast Support","movepool":["aquajet","knockoff","rapidspin","stoneedge","swordsdance","waterfall"]}]},"aerodactyl":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthquake","roost","stealthrock","stoneedge","taunt","toxic"]},{"role":"Fast Support","movepool":["defog","doubleedge","earthquake","pursuit","roost","stealthrock","stoneedge"],"preferredTypes":["Ground"]}]},"aerodactylmega":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["aerialace","aquatail","earthquake","honeclaws","roost","stoneedge"],"preferredTypes":["Ground"]}]},"snorlax":{"level":82,"sets":[{"role":"Bulky Support","movepool":["bodyslam","crunch","curse","earthquake","rest","sleeptalk"]},{"role":"AV Pivot","movepool":["bodyslam","crunch","earthquake","pursuit"]}]},"articuno":{"level":84,"sets":[{"role":"Staller","movepool":["freezedry","roost","substitute","toxic"]},{"role":"Bulky Support","movepool":["freezedry","hurricane","roost","substitute","toxic"]}]},"zapdos":{"level":78,"sets":[{"role":"Bulky Support","movepool":["defog","discharge","heatwave","hiddenpowerice","roost","toxic","uturn"]}]},"moltres":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["defog","fireblast","hurricane","roost","toxic","uturn","willowisp"]}]},"dragonite":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","ironhead","outrage","roost"],"preferredTypes":["Ground"]}]},"mewtwo":{"level":70,"sets":[{"role":"Fast Attacker","movepool":["aurasphere","calmmind","fireblast","psystrike","recover","shadowball"]}]},"mewtwomegax":{"level":70,"sets":[{"role":"Setup Sweeper","movepool":["bulkup","drainpunch","stoneedge","taunt","zenheadbutt"]}]},"mewtwomegay":{"level":70,"sets":[{"role":"Setup Sweeper","movepool":["aurasphere","calmmind","fireblast","psystrike","recover","shadowball"]}]},"mew":{"level":80,"sets":[{"role":"Staller","movepool":["defog","knockoff","psychic","roost","stealthrock","taunt","uturn","willowisp"]},{"role":"Setup Sweeper","movepool":["aurasphere","earthpower","fireblast","nastyplot","psychic","psyshock","roost"]},{"role":"Bulky Setup","movepool":["aurasphere","earthpower","fireblast","nastyplot","psychic","psyshock","roost"]}]},"meganium":{"level":91,"sets":[{"role":"Staller","movepool":["aromatherapy","dragontail","earthquake","energyball","leechseed","synthesis","toxic"]}]},"typhlosion":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["eruption","fireblast","focusblast","hiddenpowergrass","hiddenpowerrock"]}]},"feraligatr":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["crunch","dragondance","earthquake","icepunch","waterfall"],"preferredTypes":["Ice"]},{"role":"Bulky Setup","movepool":["aquajet","crunch","icepunch","swordsdance","waterfall"]}]},"furret":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["aquatail","doubleedge","firepunch","knockoff","trick","uturn"],"preferredTypes":["Dark"]}]},"noctowl":{"level":94,"sets":[{"role":"Bulky Support","movepool":["airslash","defog","hypervoice","roost","toxic"],"preferredTypes":["Normal"]}]},"ledian":{"level":100,"sets":[{"role":"Staller","movepool":["encore","focusblast","knockoff","roost","toxic"],"preferredTypes":["Dark"]}]},"ariados":{"level":90,"sets":[{"role":"Bulky Support","movepool":["megahorn","poisonjab","stickyweb","suckerpunch","toxicspikes"]}]},"crobat":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","defog","roost","superfang","taunt","toxic","uturn"]}]},"lanturn":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["healbell","icebeam","scald","thunderbolt","toxic","voltswitch"]}]},"xatu":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["calmmind","heatwave","psychic","roost"]},{"role":"Bulky Support","movepool":["heatwave","psychic","roost","thunderwave","toxic","uturn"]}]},"ampharos":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["focusblast","healbell","hiddenpowerice","thunderbolt","toxic","voltswitch"]}]},"ampharosmega":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["agility","dragonpulse","focusblast","healbell","thunderbolt","voltswitch"]}]},"bellossom":{"level":93,"sets":[{"role":"Bulky Support","movepool":["gigadrain","hiddenpowerfire","hiddenpowerrock","moonblast","sleeppowder","synthesis","toxic"]}]},"azumarill":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["aquajet","bellydrum","knockoff","playrough","superpower","waterfall"]}]},"sudowoodo":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","stealthrock","stoneedge","suckerpunch","toxic","woodhammer"],"preferredTypes":["Grass"]}]},"politoed":{"level":85,"sets":[{"role":"Staller","movepool":["encore","icebeam","protect","scald","toxic"]},{"role":"Bulky Support","movepool":["encore","icebeam","rest","scald","toxic"]}]},"jumpluff":{"level":88,"sets":[{"role":"Staller","movepool":["acrobatics","leechseed","protect","substitute"]},{"role":"Bulky Attacker","movepool":["acrobatics","encore","sleeppowder","toxic","uturn"]}]},"sunflora":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["earthpower","hiddenpowerfire","hiddenpowerice","hiddenpowerrock","leafstorm","sludgebomb"]},{"role":"Setup Sweeper","movepool":["earthpower","hiddenpowerfire","solarbeam","sunnyday"]}]},"quagsire":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","icebeam","recover","scald","toxic"]}]},"espeon":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["calmmind","dazzlinggleam","morningsun","psychic","psyshock","shadowball","trick"]}]},"umbreon":{"level":83,"sets":[{"role":"Staller","movepool":["foulplay","protect","toxic","wish"]},{"role":"Bulky Support","movepool":["foulplay","healbell","moonlight","toxic"]}]},"murkrow":{"level":90,"sets":[{"role":"Staller","movepool":["bravebird","defog","foulplay","haze","roost","thunderwave"]}]},"slowking":{"level":85,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","nastyplot","psyshock","scald","slackoff","thunderwave","toxic"]},{"role":"AV Pivot","movepool":["dragontail","fireblast","futuresight","icebeam","psyshock","scald"]}]},"unown":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerpsychic"]}]},"wobbuffet":{"level":87,"sets":[{"role":"Bulky Support","movepool":["counter","destinybond","encore","mirrorcoat"]}]},"girafarig":{"level":92,"sets":[{"role":"Setup Sweeper","movepool":["dazzlinggleam","hypervoice","nastyplot","psychic","psyshock","substitute","thunderbolt"],"preferredTypes":["Psychic"]}]},"forretress":{"level":83,"sets":[{"role":"Bulky Support","movepool":["gyroball","rapidspin","spikes","stealthrock","toxic","voltswitch"]}]},"dunsparce":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","glare","headbutt","roost"]},{"role":"Bulky Setup","movepool":["bodyslam","coil","earthquake","roost"]}]},"gligar":{"level":82,"sets":[{"role":"Staller","movepool":["defog","earthquake","knockoff","roost","stealthrock","toxic","uturn"]}]},"steelix":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["earthquake","ironhead","roar","rockslide","stealthrock","toxic"],"preferredTypes":["Steel"]},{"role":"Staller","movepool":["earthquake","heavyslam","protect","toxic"]},{"role":"Bulky Support","movepool":["earthquake","heavyslam","roar","stealthrock","toxic"]}]},"steelixmega":{"level":81,"sets":[{"role":"Bulky Support","movepool":["dragontail","earthquake","heavyslam","stealthrock","toxic"]}]},"granbull":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","healbell","playrough","thunderwave","toxic"]}]},"qwilfish":{"level":84,"sets":[{"role":"Fast Support","movepool":["destinybond","spikes","taunt","thunderwave","toxicspikes","waterfall"]}]},"scizor":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["bugbite","bulletpunch","knockoff","roost","superpower","swordsdance"]},{"role":"Bulky Support","movepool":["bulletpunch","defog","knockoff","roost","superpower","uturn"]},{"role":"Fast Attacker","movepool":["bulletpunch","knockoff","pursuit","superpower","uturn"]}]},"scizormega":{"level":77,"sets":[{"role":"Bulky Setup","movepool":["bugbite","bulletpunch","knockoff","roost","superpower","swordsdance"]},{"role":"Bulky Support","movepool":["bulletpunch","defog","knockoff","roost","superpower","uturn"]}]},"shuckle":{"level":84,"sets":[{"role":"Bulky Support","movepool":["encore","knockoff","stealthrock","stickyweb","toxic"]}]},"heracross":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["closecombat","facade","knockoff","megahorn"]},{"role":"Fast Attacker","movepool":["closecombat","knockoff","megahorn","stoneedge"]}]},"heracrossmega":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["closecombat","pinmissile","rockblast","substitute","swordsdance"],"preferredTypes":["Rock"]}]},"ursaring":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["closecombat","crunch","facade","protect","swordsdance"]}]},"magcargo":{"level":96,"sets":[{"role":"Staller","movepool":["ancientpower","lavaplume","recover","stealthrock","toxic"]}]},"corsola":{"level":97,"sets":[{"role":"Bulky Support","movepool":["powergem","recover","scald","stealthrock","toxic"]}]},"octillery":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["energyball","fireblast","gunkshot","hydropump","icebeam","scald"]},{"role":"Bulky Attacker","movepool":["energyball","fireblast","gunkshot","icebeam","scald","thunderwave"]}]},"delibird":{"level":100,"sets":[{"role":"Fast Support","movepool":["destinybond","freezedry","rapidspin","spikes"]}]},"mantine":{"level":90,"sets":[{"role":"Bulky Support","movepool":["airslash","defog","haze","rest","scald","toxic"]},{"role":"Staller","movepool":["rest","scald","sleeptalk","toxic"]}]},"skarmory":{"level":79,"sets":[{"role":"Bulky Support","movepool":["bravebird","roost","spikes","stealthrock","whirlwind"]},{"role":"Staller","movepool":["bravebird","roost","spikes","stealthrock","toxic"]}]},"houndoom":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","fireblast","hiddenpowergrass","nastyplot","suckerpunch"]}]},"houndoommega":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["darkpulse","fireblast","hiddenpowergrass","nastyplot","taunt"]}]},"kingdra":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["dracometeor","hydropump","icebeam","raindance","waterfall"]}]},"donphan":{"level":83,"sets":[{"role":"Bulky Support","movepool":["earthquake","knockoff","rapidspin","stealthrock","stoneedge","toxic"]}]},"porygon2":{"level":82,"sets":[{"role":"Bulky Support","movepool":["discharge","icebeam","recover","toxic","triattack"]}]},"stantler":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","jumpkick","megahorn","suckerpunch","thunderwave"],"preferredTypes":["Ground"]}]},"smeargle":{"level":89,"sets":[{"role":"Fast Support","movepool":["destinybond","nuzzle","spore","stealthrock","stickyweb","whirlwind"]}]},"hitmontop":{"level":88,"sets":[{"role":"Bulky Support","movepool":["closecombat","earthquake","rapidspin","stoneedge","suckerpunch","toxic"]}]},"miltank":{"level":85,"sets":[{"role":"Bulky Support","movepool":["bodyslam","earthquake","healbell","milkdrink","stealthrock","toxic"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","earthquake","milkdrink"]}]},"blissey":{"level":84,"sets":[{"role":"Staller","movepool":["aromatherapy","seismictoss","softboiled","stealthrock","thunderwave","toxic"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"]}]},"raikou":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["aurasphere","hiddenpowerice","thunderbolt","voltswitch"]},{"role":"Bulky Setup","movepool":["aurasphere","calmmind","hiddenpowerice","substitute","thunderbolt"],"preferredTypes":["Ice"]}]},"entei":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["bulldoze","extremespeed","flareblitz","sacredfire"]},{"role":"Fast Attacker","movepool":["extremespeed","flareblitz","sacredfire","stoneedge"]}]},"suicune":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","rest","scald","sleeptalk"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","rest","scald","substitute"]},{"role":"Staller","movepool":["calmmind","protect","scald","substitute"]}]},"tyranitar":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["crunch","earthquake","fireblast","icebeam","pursuit","stealthrock","stoneedge"]},{"role":"Bulky Setup","movepool":["crunch","dragondance","earthquake","firepunch","icepunch","stoneedge"]}]},"tyranitarmega":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["crunch","dragondance","earthquake","firepunch","icepunch","stoneedge"]}]},"lugia":{"level":72,"sets":[{"role":"Staller","movepool":["aeroblast","earthquake","roost","substitute","toxic","whirlwind"]}]},"hooh":{"level":70,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","defog","earthquake","roost","sacredfire","substitute","toxic"]}]},"celebi":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["earthpower","gigadrain","hiddenpowerfire","leafstorm","nastyplot","psychic","uturn"],"preferredTypes":["Psychic"]},{"role":"Bulky Support","movepool":["leafstorm","psychic","recover","stealthrock","thunderwave","uturn"]},{"role":"Bulky Setup","movepool":["leafstorm","nastyplot","psychic","recover"]}]},"sceptile":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["earthquake","focusblast","gigadrain","hiddenpowerfire","hiddenpowerice","leafstorm","rockslide"]},{"role":"Staller","movepool":["gigadrain","hiddenpowerfire","hiddenpowerice","leechseed","substitute"]}]},"sceptilemega":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["dragonpulse","earthquake","focusblast","gigadrain","hiddenpowerfire","leafstorm","substitute"]},{"role":"Setup Sweeper","movepool":["earthquake","leafblade","outrage","swordsdance"]}]},"blaziken":{"level":76,"sets":[{"role":"Wallbreaker","movepool":["fireblast","highjumpkick","knockoff","protect","stoneedge"]},{"role":"Setup Sweeper","movepool":["flareblitz","highjumpkick","knockoff","stoneedge","swordsdance"]}]},"blazikenmega":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["flareblitz","highjumpkick","knockoff","protect","stoneedge","swordsdance"]}]},"swampert":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icebeam","roar","scald","stealthrock","toxic"]},{"role":"Staller","movepool":["earthquake","protect","scald","toxic"]}]},"swampertmega":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","icepunch","raindance","superpower","waterfall"]}]},"mightyena":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["crunch","irontail","playrough","suckerpunch","toxic"],"preferredTypes":["Fairy"]}]},"linoone":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["bellydrum","extremespeed","seedbomb","shadowclaw"]}]},"beautifly":{"level":97,"sets":[{"role":"Setup Sweeper","movepool":["aircutter","bugbuzz","hiddenpowerground","quiverdance"]}]},"dustox":{"level":94,"sets":[{"role":"Bulky Setup","movepool":["bugbuzz","hiddenpowerground","quiverdance","roost","sludgebomb"]},{"role":"Bulky Support","movepool":["bugbuzz","defog","roost","sludgebomb","toxic","uturn"]}]},"ludicolo":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["gigadrain","hydropump","icebeam","raindance"]},{"role":"Wallbreaker","movepool":["energyball","hydropump","icebeam","scald"]}]},"shiftry":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["defog","knockoff","leafstorm","lowkick","suckerpunch"]},{"role":"Setup Sweeper","movepool":["knockoff","leafblade","lowkick","suckerpunch","swordsdance"]}]},"swellow":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["bravebird","facade","protect","quickattack","uturn"]}]},"pelipper":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["defog","hurricane","knockoff","roost","scald","toxic","uturn"]},{"role":"Bulky Support","movepool":["defog","knockoff","roost","scald","toxic","uturn"]}]},"gardevoir":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["calmmind","focusblast","healingwish","moonblast","psychic","shadowball","thunderbolt","trick"]},{"role":"Setup Sweeper","movepool":["calmmind","focusblast","moonblast","psyshock","substitute","willowisp"]}]},"gardevoirmega":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","focusblast","hypervoice","psyshock","substitute","taunt","willowisp"]}]},"masquerain":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["airslash","bugbuzz","hydropump","quiverdance"]},{"role":"Fast Support","movepool":["airslash","bugbuzz","hydropump","icebeam","roost","stickyweb","stunspore","uturn"]}]},"breloom":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["bulletseed","machpunch","rocktomb","spore","swordsdance"]},{"role":"Setup Sweeper","movepool":["bulletseed","machpunch","rocktomb","swordsdance"]}]},"vigoroth":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["bodyslam","bulkup","earthquake","return","shadowclaw","slackoff"]}]},"slaking":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["earthquake","gigaimpact","nightslash","retaliate"]}]},"ninjask":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["aerialace","nightslash","swordsdance","uturn","xscissor"]}]},"shedinja":{"level":92,"sets":[{"role":"Setup Sweeper","movepool":["shadowclaw","shadowsneak","swordsdance","willowisp","xscissor"]}]},"exploud":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["boomburst","fireblast","focusblast","icebeam","surf"]}]},"hariyama":{"level":87,"sets":[{"role":"AV Pivot","movepool":["bulletpunch","closecombat","heavyslam","knockoff","stoneedge"],"preferredTypes":["Dark"]},{"role":"Wallbreaker","movepool":["bulkup","bulletpunch","closecombat","facade","knockoff"],"preferredTypes":["Dark"]}]},"delcatty":{"level":98,"sets":[{"role":"Fast Support","movepool":["doubleedge","fakeout","healbell","suckerpunch","thunderwave","toxic"]}]},"sableye":{"level":84,"sets":[{"role":"Bulky Support","movepool":["foulplay","knockoff","recover","taunt","willowisp"]}]},"sableyemega":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["calmmind","darkpulse","recover","willowisp"]}]},"mawile":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["ironhead","knockoff","playrough","stealthrock","suckerpunch","swordsdance"]}]},"mawilemega":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["ironhead","knockoff","playrough","suckerpunch","swordsdance"]}]},"aggron":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["aquatail","earthquake","headsmash","heavyslam","rockpolish","stealthrock"],"preferredTypes":["Ground"]}]},"aggronmega":{"level":80,"sets":[{"role":"Bulky Support","movepool":["earthquake","heavyslam","roar","stealthrock","stoneedge","thunderwave","toxic"]}]},"medicham":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["bulletpunch","highjumpkick","icepunch","poisonjab","zenheadbutt"]}]},"medichammega":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["fakeout","highjumpkick","icepunch","thunderpunch","zenheadbutt"]}]},"manectric":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["flamethrower","hiddenpowerice","overheat","thunderbolt","voltswitch"]}]},"manectricmega":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","overheat","thunderbolt","voltswitch"]}]},"plusle":{"level":93,"sets":[{"role":"Bulky Setup","movepool":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"preferredTypes":["Ice"]},{"role":"Setup Sweeper","movepool":["grassknot","hiddenpowerice","nastyplot","thunderbolt"]},{"role":"Bulky Attacker","movepool":["encore","hiddenpowerice","nuzzle","thunderbolt","toxic","voltswitch"]}]},"minun":{"level":93,"sets":[{"role":"Bulky Setup","movepool":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"preferredTypes":["Ice"]},{"role":"Setup Sweeper","movepool":["grassknot","hiddenpowerice","nastyplot","thunderbolt"]},{"role":"Bulky Attacker","movepool":["encore","hiddenpowerice","nuzzle","thunderbolt","toxic","voltswitch"]}]},"volbeat":{"level":90,"sets":[{"role":"Bulky Support","movepool":["encore","roost","thunderwave","uturn"]}]},"illumise":{"level":90,"sets":[{"role":"Bulky Support","movepool":["bugbuzz","encore","roost","thunderwave"]}]},"swalot":{"level":90,"sets":[{"role":"Bulky Support","movepool":["earthquake","encore","icebeam","painsplit","sludgebomb","toxic","yawn"]},{"role":"Staller","movepool":["earthquake","protect","sludgebomb","toxic"]}]},"sharpedo":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["crunch","destinybond","earthquake","icebeam","protect","waterfall"]}]},"sharpedomega":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["crunch","icefang","protect","waterfall"]}]},"wailord":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowergrass","hydropump","icebeam","waterspout"]}]},"camerupt":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","fireblast","rockpolish","stoneedge"]},{"role":"Bulky Support","movepool":["earthquake","lavaplume","roar","stealthrock","toxic"]}]},"cameruptmega":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["ancientpower","earthpower","fireblast","stealthrock","toxic","willowisp"]}]},"torkoal":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","lavaplume","rapidspin","stealthrock","yawn"]}]},"grumpig":{"level":93,"sets":[{"role":"Bulky Support","movepool":["focusblast","healbell","psychic","thunderwave","toxic","whirlwind"]}]},"spinda":{"level":97,"sets":[{"role":"Staller","movepool":["feintattack","rest","return","sleeptalk","suckerpunch","superpower"],"preferredTypes":["Fighting"]}]},"flygon":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["earthquake","outrage","stoneedge","uturn"]},{"role":"Bulky Support","movepool":["defog","dracometeor","earthquake","roost","uturn"]}]},"cacturne":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","focusblast","gigadrain","spikes","suckerpunch"]},{"role":"Setup Sweeper","movepool":["drainpunch","seedbomb","suckerpunch","swordsdance"]}]},"altaria":{"level":89,"sets":[{"role":"Bulky Setup","movepool":["dragondance","earthquake","outrage","roost"]},{"role":"Bulky Support","movepool":["dracometeor","earthquake","fireblast","healbell","roost","toxic"]}]},"altariamega":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","return","roost"]},{"role":"Bulky Support","movepool":["earthquake","fireblast","healbell","return","roost"]}]},"zangoose":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["closecombat","facade","knockoff","quickattack","swordsdance"],"preferredTypes":["Dark"]}]},"seviper":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["earthquake","flamethrower","gigadrain","glare","knockoff","sludgewave","suckerpunch","switcheroo"],"preferredTypes":["Ground"]}]},"lunatone":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["earthpower","icebeam","moonblast","moonlight","psychic","rockpolish"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["earthpower","moonlight","psychic","stealthrock","toxic"]}]},"solrock":{"level":90,"sets":[{"role":"Bulky Support","movepool":["earthquake","morningsun","stealthrock","stoneedge","willowisp"]}]},"whiscash":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","stoneedge","waterfall"]}]},"crawdaunt":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["aquajet","crabhammer","dragondance","knockoff","superpower"]},{"role":"Setup Sweeper","movepool":["aquajet","crabhammer","dragondance","knockoff","swordsdance"]}]},"claydol":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","icebeam","psychic","rapidspin","stealthrock","toxic"]}]},"cradily":{"level":89,"sets":[{"role":"Bulky Setup","movepool":["curse","recover","seedbomb","stoneedge","swordsdance"]},{"role":"Bulky Attacker","movepool":["gigadrain","recover","stealthrock","stoneedge","toxic"]}]},"armaldo":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","knockoff","rapidspin","stealthrock","stoneedge","toxic","xscissor"]},{"role":"Bulky Attacker","movepool":["aquajet","earthquake","knockoff","stoneedge","swordsdance","xscissor"]}]},"milotic":{"level":82,"sets":[{"role":"Staller","movepool":["dragontail","haze","icebeam","recover","scald","toxic"]}]},"castform":{"level":98,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","icebeam","return","scald","thunderbolt","thunderwave"]}]},"kecleon":{"level":89,"sets":[{"role":"Fast Support","movepool":["drainpunch","fakeout","knockoff","recover","shadowsneak","stealthrock","suckerpunch"],"preferredTypes":["Fighting"]},{"role":"Bulky Attacker","movepool":["drainpunch","knockoff","recover","stealthrock","thunderwave","toxic"]}]},"banette":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["gunkshot","knockoff","shadowclaw","shadowsneak","taunt","thunderwave","willowisp"]}]},"banettemega":{"level":87,"sets":[{"role":"Fast Support","movepool":["destinybond","knockoff","shadowclaw","taunt","willowisp"]}]},"tropius":{"level":93,"sets":[{"role":"Staller","movepool":["airslash","leechseed","protect","substitute"]}]},"chimecho":{"level":96,"sets":[{"role":"Staller","movepool":["healbell","knockoff","psychic","recover","toxic"]},{"role":"Bulky Setup","movepool":["calmmind","psychic","recover","signalbeam"]}]},"absol":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["knockoff","playrough","pursuit","suckerpunch","superpower","swordsdance"],"preferredTypes":["Fairy"]}]},"absolmega":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["fireblast","knockoff","playrough","protect","pursuit","suckerpunch","superpower"],"preferredTypes":["Fairy"]},{"role":"Setup Sweeper","movepool":["knockoff","playrough","suckerpunch","superpower","swordsdance"],"preferredTypes":["Fairy"]}]},"glalie":{"level":88,"sets":[{"role":"Fast Support","movepool":["earthquake","freezedry","spikes","superfang","taunt"]}]},"glaliemega":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["earthquake","explosion","freezedry","iceshard","return","spikes"],"preferredTypes":["Ground"]}]},"walrein":{"level":88,"sets":[{"role":"Bulky Support","movepool":["icebeam","roar","superfang","surf","toxic"]},{"role":"Staller","movepool":["icebeam","protect","surf","toxic"]}]},"huntail":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["icebeam","return","shellsmash","suckerpunch","waterfall"],"preferredTypes":["Ice"]}]},"gorebyss":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","shellsmash"]}]},"relicanth":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headsmash","stealthrock","toxic","waterfall"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","headsmash","rockpolish","waterfall"],"preferredTypes":["Ground"]}]},"luvdisc":{"level":100,"sets":[{"role":"Staller","movepool":["icebeam","protect","scald","substitute","toxic"]}]},"salamence":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","outrage","roost"]}]},"salamencemega":{"level":70,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","dragondance","earthquake","return","roost"]}]},"metagross":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["agility","earthquake","icepunch","meteormash","thunderpunch","zenheadbutt"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["bulletpunch","earthquake","explosion","icepunch","meteormash","stealthrock","thunderpunch","zenheadbutt"],"preferredTypes":["Ground"]}]},"metagrossmega":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["agility","earthquake","hammerarm","meteormash","zenheadbutt"],"preferredTypes":["Psychic"]}]},"regirock":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["curse","drainpunch","rest","stoneedge"]},{"role":"Bulky Support","movepool":["drainpunch","earthquake","stealthrock","stoneedge","thunderwave","toxic"]}]},"regice":{"level":87,"sets":[{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","thunderwave","toxic"]},{"role":"Bulky Attacker","movepool":["icebeam","rest","sleeptalk","thunderbolt"]},{"role":"Bulky Setup","movepool":["focusblast","icebeam","rockpolish","thunderbolt"]}]},"registeel":{"level":83,"sets":[{"role":"Bulky Setup","movepool":["curse","ironhead","rest","sleeptalk"]},{"role":"Bulky Support","movepool":["rest","seismictoss","sleeptalk","toxic"]},{"role":"Staller","movepool":["protect","seismictoss","stealthrock","thunderwave","toxic"]}]},"latias":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psyshock","roost"]}]},"latiasmega":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psyshock","roost"]}]},"latios":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psyshock","roost"]}]},"latiosmega":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psyshock","roost"]}]},"kyogre":{"level":68,"sets":[{"role":"Fast Attacker","movepool":["icebeam","originpulse","scald","thunder","waterspout"]}]},"kyogreprimal":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["calmmind","rest","scald","sleeptalk"]},{"role":"Setup Sweeper","movepool":["calmmind","icebeam","originpulse","thunder"]}]},"groudon":{"level":74,"sets":[{"role":"Bulky Support","movepool":["dragontail","lavaplume","precipiceblades","stealthrock","stoneedge","thunderwave"]},{"role":"Bulky Setup","movepool":["firepunch","precipiceblades","rockpolish","stoneedge","swordsdance"]}]},"groudonprimal":{"level":65,"sets":[{"role":"Bulky Support","movepool":["dragontail","lavaplume","precipiceblades","stealthrock","thunderwave"]},{"role":"Bulky Setup","movepool":["firepunch","precipiceblades","rockpolish","swordsdance"]}]},"rayquaza":{"level":72,"sets":[{"role":"Wallbreaker","movepool":["dracometeor","earthquake","extremespeed","outrage","vcreate"]},{"role":"Setup Sweeper","movepool":["dragondance","earthquake","extremespeed","outrage","vcreate"]},{"role":"Fast Attacker","movepool":["earthquake","extremespeed","outrage","swordsdance","vcreate"],"preferredTypes":["Normal"]}]},"rayquazamega":{"level":67,"sets":[{"role":"Fast Attacker","movepool":["dragonascent","dragondance","earthquake","extremespeed","vcreate"]}]},"jirachi":{"level":79,"sets":[{"role":"Bulky Support","movepool":["bodyslam","firepunch","healingwish","ironhead","protect","stealthrock","toxic","uturn","wish"]}]},"deoxys":{"level":75,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","icebeam","knockoff","psychoboost","stealthrock","superpower"],"preferredTypes":["Fighting"]}]},"deoxysattack":{"level":73,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","icebeam","knockoff","psychoboost","superpower"],"preferredTypes":["Fighting"]}]},"deoxysdefense":{"level":83,"sets":[{"role":"Bulky Support","movepool":["knockoff","recover","seismictoss","spikes","stealthrock","taunt","toxic"]}]},"deoxysspeed":{"level":81,"sets":[{"role":"Fast Support","movepool":["knockoff","psychoboost","spikes","stealthrock","superpower","taunt"]}]},"torterra":{"level":87,"sets":[{"role":"Bulky Support","movepool":["earthquake","stealthrock","stoneedge","synthesis","woodhammer"]},{"role":"Bulky Attacker","movepool":["earthquake","rockpolish","stoneedge","woodhammer"]}]},"infernape":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["closecombat","grassknot","machpunch","overheat","stealthrock"]},{"role":"Fast Support","movepool":["closecombat","flareblitz","machpunch","stoneedge","swordsdance","uturn"]}]},"empoleon":{"level":82,"sets":[{"role":"Staller","movepool":["defog","knockoff","protect","scald","stealthrock","toxic"]},{"role":"Bulky Support","movepool":["defog","icebeam","knockoff","roar","scald","toxic"]},{"role":"Bulky Attacker","movepool":["flashcannon","grassknot","hydropump","icebeam","knockoff","scald"]}]},"staraptor":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["bravebird","closecombat","doubleedge","quickattack","uturn"],"preferredTypes":["Fighting"]}]},"bibarel":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["curse","quickattack","return","waterfall"]}]},"kricketune":{"level":95,"sets":[{"role":"Fast Support","movepool":["bugbite","knockoff","stickyweb","taunt","toxic"]}]},"luxray":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["crunch","facade","superpower","wildcharge"]},{"role":"AV Pivot","movepool":["crunch","icefang","superpower","voltswitch","wildcharge"],"preferredTypes":["Fighting"]}]},"roserade":{"level":83,"sets":[{"role":"Fast Support","movepool":["gigadrain","hiddenpowerground","leafstorm","sleeppowder","sludgebomb","spikes","synthesis","toxicspikes"]}]},"rampardos":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","firepunch","rockpolish","rockslide","zenheadbutt"]},{"role":"Fast Attacker","movepool":["earthquake","firepunch","headsmash","rockslide"]}]},"bastiodon":{"level":90,"sets":[{"role":"Bulky Support","movepool":["metalburst","roar","rockblast","stealthrock","toxic"]},{"role":"Staller","movepool":["metalburst","protect","roar","rockblast","stealthrock","toxic"]}]},"wormadam":{"level":100,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerground","hiddenpowerrock","leafstorm","signalbeam","synthesis","toxic"]},{"role":"Staller","movepool":["gigadrain","protect","signalbeam","synthesis","toxic"]}]},"wormadamsandy":{"level":89,"sets":[{"role":"Staller","movepool":["earthquake","infestation","protect","stealthrock","toxic"]}]},"wormadamtrash":{"level":88,"sets":[{"role":"Staller","movepool":["flashcannon","infestation","protect","stealthrock","toxic"]}]},"mothim":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["airslash","bugbuzz","energyball","quiverdance"]}]},"vespiquen":{"level":99,"sets":[{"role":"Staller","movepool":["airslash","defog","roost","toxic","uturn"]}]},"pachirisu":{"level":94,"sets":[{"role":"Bulky Support","movepool":["nuzzle","superfang","thunderbolt","toxic","uturn"]}]},"floatzel":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["aquajet","bulkup","icepunch","lowkick","substitute","waterfall"],"preferredTypes":["Ice"]},{"role":"Fast Attacker","movepool":["aquajet","crunch","icepunch","lowkick","waterfall"],"preferredTypes":["Ice"]}]},"cherrim":{"level":96,"sets":[{"role":"Wallbreaker","movepool":["dazzlinggleam","energyball","healingwish","hiddenpowerfire","hiddenpowerground","hiddenpowerrock","morningsun"]},{"role":"Staller","movepool":["aromatherapy","energyball","hiddenpowerground","leechseed","morningsun","toxic"]}]},"gastrodon":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["clearsmog","earthquake","icebeam","recover","scald","toxic"]}]},"ambipom":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["fakeout","knockoff","lowkick","return","uturn"],"preferredTypes":["Dark"]}]},"drifblim":{"level":84,"sets":[{"role":"Fast Support","movepool":["acrobatics","defog","destinybond","shadowball","substitute","willowisp"]},{"role":"Bulky Support","movepool":["acrobatics","hex","substitute","willowisp"]}]},"lopunny":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["healingwish","highjumpkick","icepunch","return","switcheroo"]}]},"lopunnymega":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["encore","fakeout","highjumpkick","poweruppunch","return","substitute"]}]},"mismagius":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["dazzlinggleam","destinybond","painsplit","shadowball","taunt","willowisp"]},{"role":"Wallbreaker","movepool":["dazzlinggleam","nastyplot","shadowball","thunderbolt","trick"]}]},"honchkrow":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["bravebird","heatwave","pursuit","roost","suckerpunch","superpower"]}]},"purugly":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["fakeout","knockoff","return","uturn","wakeupslap"],"preferredTypes":["Dark"]}]},"skuntank":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["crunch","defog","fireblast","poisonjab","pursuit","suckerpunch","taunt"]}]},"bronzong":{"level":85,"sets":[{"role":"Bulky Support","movepool":["earthquake","ironhead","psychic","stealthrock","toxic"],"preferredTypes":["Ground"]},{"role":"Staller","movepool":["earthquake","ironhead","protect","psychic","toxic"],"preferredTypes":["Ground"]}]},"chatot":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["boomburst","chatter","heatwave","hiddenpowerground","uturn"]},{"role":"Setup Sweeper","movepool":["boomburst","chatter","heatwave","nastyplot","substitute"]}]},"spiritomb":{"level":89,"sets":[{"role":"Bulky Setup","movepool":["calmmind","darkpulse","rest","sleeptalk"]},{"role":"Bulky Attacker","movepool":["foulplay","painsplit","pursuit","suckerpunch","willowisp"]}]},"garchomp":{"level":75,"sets":[{"role":"Fast Support","movepool":["dragonclaw","earthquake","fireblast","outrage","stealthrock","stoneedge","toxic"]},{"role":"Fast Attacker","movepool":["earthquake","firefang","outrage","stoneedge","swordsdance"]}]},"garchompmega":{"level":77,"sets":[{"role":"Bulky Support","movepool":["dracometeor","earthquake","fireblast","stealthrock","stoneedge"]},{"role":"Setup Sweeper","movepool":["earthquake","firefang","outrage","stoneedge","swordsdance"]}]},"lucario":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["bulletpunch","closecombat","crunch","extremespeed","stoneedge","swordsdance"],"preferredTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["aurasphere","darkpulse","flashcannon","nastyplot","vacuumwave"]}]},"lucariomega":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["bulletpunch","closecombat","irontail","swordsdance"]},{"role":"Setup Sweeper","movepool":["aurasphere","flashcannon","nastyplot","vacuumwave"]}]},"hippowdon":{"level":81,"sets":[{"role":"Bulky Support","movepool":["earthquake","slackoff","stealthrock","stoneedge","toxic","whirlwind"]}]},"drapion":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["aquatail","earthquake","knockoff","poisonjab","pursuit","swordsdance"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["earthquake","knockoff","poisonjab","taunt","toxicspikes","whirlwind"]}]},"toxicroak":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["drainpunch","earthquake","gunkshot","knockoff","substitute","suckerpunch","swordsdance"]}]},"carnivine":{"level":97,"sets":[{"role":"Bulky Support","movepool":["knockoff","powerwhip","sleeppowder","synthesis","toxic"]}]},"lumineon":{"level":90,"sets":[{"role":"Bulky Support","movepool":["defog","icebeam","scald","toxic","uturn"]}]},"abomasnow":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","earthquake","gigadrain","iceshard","woodhammer"],"preferredTypes":["Ground"]}]},"abomasnowmega":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","earthquake","gigadrain","iceshard","woodhammer"],"preferredTypes":["Ground"]}]},"weavile":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["iceshard","iciclecrash","knockoff","lowkick","pursuit","swordsdance"]}]},"magnezone":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["flashcannon","hiddenpowerfire","hiddenpowerice","thunderbolt","voltswitch"]}]},"lickilicky":{"level":88,"sets":[{"role":"Bulky Support","movepool":["bodyslam","healbell","knockoff","protect","wish"]},{"role":"AV Pivot","movepool":["bodyslam","dragontail","earthquake","explosion","knockoff","powerwhip"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["bodyslam","earthquake","explosion","knockoff","powerwhip","return","swordsdance"],"preferredTypes":["Dark"]}]},"rhyperior":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["dragontail","earthquake","icepunch","megahorn","stoneedge"]},{"role":"Bulky Setup","movepool":["earthquake","icepunch","megahorn","rockpolish","stoneedge"]}]},"tangrowth":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","knockoff","leafstorm","leechseed","powerwhip","rockslide","sleeppowder","sludgebomb","synthesis"]},{"role":"AV Pivot","movepool":["earthquake","gigadrain","knockoff","powerwhip","rockslide","sludgebomb"]}]},"electivire":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["crosschop","earthquake","flamethrower","icepunch","voltswitch","wildcharge"],"preferredTypes":["Ice"]}]},"magmortar":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","fireblast","focusblast","hiddenpowergrass","hiddenpowerice","substitute","thunderbolt"],"preferredTypes":["Electric"]}]},"togekiss":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["airslash","aurasphere","nastyplot","roost","thunderwave"]},{"role":"Bulky Attacker","movepool":["airslash","defog","healbell","roost","thunderwave"]},{"role":"Fast Attacker","movepool":["airslash","aurasphere","dazzlinggleam","trick"]}]},"yanmega":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["airslash","bugbuzz","hiddenpowerground","protect"]},{"role":"Wallbreaker","movepool":["airslash","bugbuzz","gigadrain","uturn"]}]},"leafeon":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","knockoff","leafblade","swordsdance","synthesis","xscissor"],"preferredTypes":["Dark"]}]},"glaceon":{"level":89,"sets":[{"role":"Bulky Support","movepool":["healbell","hiddenpowerground","icebeam","protect","wish"]},{"role":"Staller","movepool":["icebeam","protect","toxic","wish"]}]},"gliscor":{"level":78,"sets":[{"role":"Staller","movepool":["earthquake","protect","substitute","toxic"]},{"role":"Bulky Support","movepool":["earthquake","knockoff","roost","stealthrock","taunt","toxic","uturn"]},{"role":"Setup Sweeper","movepool":["earthquake","facade","roost","swordsdance"]}]},"mamoswine":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["earthquake","iceshard","iciclecrash","knockoff","stealthrock"]}]},"porygonz":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["icebeam","nastyplot","shadowball","thunderbolt","triattack","trick"]}]},"gallade":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["closecombat","icepunch","knockoff","shadowsneak","swordsdance","zenheadbutt"],"preferredTypes":["Dark"]}]},"gallademega":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["closecombat","knockoff","swordsdance","zenheadbutt"]}]},"probopass":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","flashcannon","stealthrock","thunderwave","toxic","voltswitch"]}]},"dusknoir":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","haze","icepunch","painsplit","shadowsneak","toxic","willowisp"],"preferredTypes":["Ground"]},{"role":"Staller","movepool":["earthquake","protect","shadowsneak","toxic"]}]},"froslass":{"level":84,"sets":[{"role":"Fast Support","movepool":["destinybond","icebeam","shadowball","spikes","taunt","thunderwave"]}]},"rotom":{"level":86,"sets":[{"role":"Fast Support","movepool":["hiddenpowerice","painsplit","shadowball","thunderbolt","trick","voltswitch","willowisp"]}]},"rotomheat":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerice","overheat","painsplit","thunderbolt","voltswitch","willowisp"]}]},"rotomwash":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["hydropump","painsplit","thunderbolt","trick","voltswitch","willowisp"]}]},"rotomfrost":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","painsplit","thunderbolt","trick","voltswitch","willowisp"]}]},"rotomfan":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["airslash","painsplit","thunderbolt","voltswitch","willowisp"]}]},"rotommow":{"level":85,"sets":[{"role":"Fast Support","movepool":["hiddenpowerice","leafstorm","thunderbolt","trick","voltswitch","willowisp"]}]},"uxie":{"level":82,"sets":[{"role":"Bulky Support","movepool":["healbell","knockoff","psychic","stealthrock","thunderwave","toxic","uturn","yawn"]}]},"mesprit":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["calmmind","energyball","healingwish","hiddenpowerfire","icebeam","psychic","psyshock","signalbeam","thunderbolt","uturn"]},{"role":"Bulky Support","movepool":["knockoff","psychic","stealthrock","thunderwave","toxic","uturn"]}]},"azelf":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["dazzlinggleam","fireblast","nastyplot","psychic","psyshock","uturn"]},{"role":"Fast Support","movepool":["explosion","fireblast","knockoff","psychic","stealthrock","taunt","uturn"]}]},"dialga":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","dragontail","fireblast","flashcannon","stealthrock","thunderbolt","toxic"],"preferredTypes":["Fire"]}]},"palkia":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","fireblast","hydropump","spacialrend","thunderwave"],"preferredTypes":["Fire"]}]},"heatran":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","flashcannon","lavaplume","magmastorm","stealthrock","taunt","toxic"]},{"role":"Staller","movepool":["earthpower","magmastorm","protect","toxic"]}]},"regigigas":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["drainpunch","knockoff","return","substitute","thunderwave"],"preferredTypes":["Dark"]}]},"giratinaorigin":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","hex","shadowsneak","thunderwave","willowisp"]},{"role":"Fast Attacker","movepool":["defog","dracometeor","earthquake","outrage","shadowball","shadowsneak","willowisp"]}]},"giratina":{"level":74,"sets":[{"role":"Fast Support","movepool":["dragontail","rest","shadowball","sleeptalk","willowisp"]},{"role":"Bulky Setup","movepool":["calmmind","dragonpulse","rest","sleeptalk"]},{"role":"Bulky Support","movepool":["defog","dragontail","rest","shadowball","willowisp"]}]},"cresselia":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["calmmind","moonblast","moonlight","psyshock","substitute"]},{"role":"Bulky Support","movepool":["moonblast","moonlight","psychic","thunderwave","toxic"]}]},"phione":{"level":89,"sets":[{"role":"Bulky Support","movepool":["healbell","icebeam","knockoff","scald","toxic","uturn"]}]},"manaphy":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["energyball","icebeam","surf","tailglow"]}]},"darkrai":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["darkpulse","darkvoid","focusblast","nastyplot","sludgebomb","substitute"],"preferredTypes":["Poison"]}]},"shaymin":{"level":83,"sets":[{"role":"Fast Support","movepool":["airslash","earthpower","leechseed","rest","seedflare","substitute"],"preferredTypes":["Flying"]}]},"shayminsky":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["airslash","earthpower","hiddenpowerice","leechseed","seedflare","substitute"]}]},"arceus":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","shadowclaw","swordsdance"]}]},"arceusbug":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment"]}]},"arceusdark":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","defog","fireblast","judgment","recover","sludgebomb","toxic","willowisp"]}]},"arceusdragon":{"level":71,"sets":[{"role":"Bulky Support","movepool":["defog","earthquake","fireblast","judgment","recover","willowisp"]},{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","outrage","recover","swordsdance"],"preferredTypes":["Ground"]}]},"arceuselectric":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","icebeam","judgment","recover"]}]},"arceusfairy":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthquake","judgment","recover","toxic","willowisp"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover"]}]},"arceusfighting":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","icebeam","judgment","recover","shadowball"]}]},"arceusfire":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","energyball","judgment","recover"]}]},"arceusflying":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover"]},{"role":"Bulky Attacker","movepool":["defog","earthquake","judgment","recover","toxic","willowisp"]}]},"arceusghost":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","defog","focusblast","judgment","recover","toxic","willowisp"]},{"role":"Setup Sweeper","movepool":["brickbreak","extremespeed","shadowforce","swordsdance"]}]},"arceusgrass":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","fireblast","judgment","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment"]}]},"arceusground":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","stoneedge","swordsdance"],"preferredTypes":["Rock"]},{"role":"Bulky Attacker","movepool":["calmmind","icebeam","judgment","recover","toxic"]}]},"arceusice":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover","thunderbolt"]}]},"arceuspoison":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthquake","icebeam","recover","sludgebomb"],"preferredTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","recover","sludgebomb"],"preferredTypes":["Ground"]}]},"arceuspsychic":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthquake","fireblast","judgment","recover","toxic","willowisp"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"]}]},"arceusrock":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthquake","judgment","recover","toxic","willowisp"]},{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","stoneedge","swordsdance"],"preferredTypes":["Ground"]}]},"arceussteel":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthquake","judgment","recover","toxic","willowisp"]}]},"arceuswater":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","icebeam","judgment","recover","toxic","willowisp"]}]},"victini":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["boltstrike","uturn","vcreate","zenheadbutt"]},{"role":"AV Pivot","movepool":["boltstrike","energyball","focusblast","glaciate","psychic","uturn","vcreate"],"preferredTypes":["Electric"]}]},"serperior":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["dragonpulse","glare","hiddenpowerfire","leafstorm","leechseed","substitute"]}]},"emboar":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["flareblitz","headsmash","suckerpunch","superpower","wildcharge"]},{"role":"AV Pivot","movepool":["flareblitz","grassknot","suckerpunch","superpower","wildcharge"]}]},"samurott":{"level":86,"sets":[{"role":"AV Pivot","movepool":["aquajet","grassknot","hydropump","icebeam","knockoff","megahorn","scald","superpower"]},{"role":"Fast Attacker","movepool":["aquajet","knockoff","megahorn","superpower","swordsdance","waterfall"]}]},"watchog":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["hypnosis","knockoff","return","superfang"]},{"role":"Setup Sweeper","movepool":["hypnosis","knockoff","return","substitute","swordsdance"]}]},"stoutland":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["crunch","playrough","return","superpower","wildcharge"],"preferredTypes":["Fighting"]}]},"liepard":{"level":86,"sets":[{"role":"Fast Support","movepool":["copycat","encore","knockoff","substitute","thunderwave","uturn"]}]},"simisage":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["gunkshot","hiddenpowerice","knockoff","leafstorm","rockslide","superpower"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["focusblast","gigadrain","hiddenpowerice","nastyplot","substitute"]}]},"simisear":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["fireblast","focusblast","grassknot","hiddenpowerrock","nastyplot","substitute"]}]},"simipour":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["grassknot","hydropump","icebeam","nastyplot","substitute"],"preferredTypes":["Ice"]}]},"musharna":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["calmmind","moonlight","psyshock","shadowball","signalbeam"]},{"role":"Bulky Support","movepool":["healbell","moonlight","psychic","signalbeam","thunderwave","toxic"]}]},"unfezant":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["nightslash","pluck","return","roost","toxic","uturn"]}]},"zebstrika":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","overheat","thunderbolt","voltswitch","wildcharge"]}]},"gigalith":{"level":83,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","stealthrock","stoneedge","superpower"]}]},"swoobat":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["calmmind","heatwave","roost","storedpower"]},{"role":"Setup Sweeper","movepool":["airslash","calmmind","heatwave","roost","storedpower"]}]},"excadrill":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["earthquake","ironhead","rapidspin","rockslide","swordsdance"]}]},"audino":{"level":90,"sets":[{"role":"Bulky Support","movepool":["knockoff","protect","toxic","wish"]}]},"audinomega":{"level":90,"sets":[{"role":"Staller","movepool":["dazzlinggleam","protect","toxic","wish"]},{"role":"Bulky Support","movepool":["calmmind","dazzlinggleam","fireblast","protect","wish"]}]},"conkeldurr":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["drainpunch","facade","knockoff","machpunch"]},{"role":"Setup Sweeper","movepool":["bulkup","drainpunch","knockoff","machpunch"]}]},"seismitoad":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","hydropump","knockoff","raindance","sludgewave"]},{"role":"Bulky Support","movepool":["earthquake","knockoff","scald","stealthrock","toxic"]},{"role":"Staller","movepool":["earthquake","protect","scald","toxic"]}]},"throh":{"level":88,"sets":[{"role":"Bulky Support","movepool":["bulkup","circlethrow","knockoff","rest","sleeptalk"]}]},"sawk":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["bulkup","closecombat","earthquake","knockoff","poisonjab","stoneedge"],"preferredTypes":["Dark"]}]},"leavanny":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["knockoff","leafblade","swordsdance","xscissor"]},{"role":"Fast Support","movepool":["knockoff","leafblade","stickyweb","toxic","xscissor"]}]},"scolipede":{"level":80,"sets":[{"role":"Fast Support","movepool":["earthquake","megahorn","poisonjab","spikes","toxicspikes"]},{"role":"Setup Sweeper","movepool":["earthquake","megahorn","poisonjab","protect","swordsdance"]}]},"whimsicott":{"level":85,"sets":[{"role":"Fast Support","movepool":["encore","energyball","moonblast","stunspore","taunt","toxic","uturn"]},{"role":"Staller","movepool":["leechseed","moonblast","protect","substitute"]}]},"lilligant":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["gigadrain","hiddenpowerfire","hiddenpowerrock","petaldance","quiverdance","sleeppowder"]}]},"basculin":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["aquajet","crunch","superpower","waterfall","zenheadbutt"]}]},"krookodile":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["earthquake","knockoff","pursuit","stealthrock","stoneedge","superpower"]}]},"darmanitan":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["earthquake","flareblitz","rockslide","superpower","uturn"]}]},"maractus":{"level":95,"sets":[{"role":"Fast Support","movepool":["gigadrain","hiddenpowerfire","knockoff","spikes","suckerpunch","synthesis","toxic"]},{"role":"Staller","movepool":["gigadrain","hiddenpowerfire","hiddenpowerice","leechseed","spikyshield"]}]},"crustle":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","knockoff","shellsmash","stoneedge","xscissor"],"preferredTypes":["Ground"]}]},"scrafty":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","highjumpkick","ironhead","knockoff"]},{"role":"Bulky Setup","movepool":["bulkup","drainpunch","knockoff","rest"]}]},"sigilyph":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["airslash","calmmind","heatwave","psyshock","roost"]},{"role":"Wallbreaker","movepool":["airslash","energyball","heatwave","icebeam","psychic","psyshock"],"preferredTypes":["Psychic"]},{"role":"Staller","movepool":["cosmicpower","psychoshift","roost","storedpower"]}]},"cofagrigus":{"level":86,"sets":[{"role":"Bulky Support","movepool":["haze","painsplit","shadowball","toxicspikes","willowisp"]},{"role":"Bulky Setup","movepool":["hiddenpowerfighting","nastyplot","shadowball","trickroom"]}]},"carracosta":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["aquajet","earthquake","shellsmash","stoneedge","waterfall"]}]},"archeops":{"level":83,"sets":[{"role":"Fast Support","movepool":["acrobatics","defog","earthquake","roost","stoneedge","uturn"]},{"role":"Wallbreaker","movepool":["aquatail","earthquake","headsmash","knockoff","stealthrock","stoneedge","uturn"],"preferredTypes":["Ground"]}]},"garbodor":{"level":88,"sets":[{"role":"Bulky Support","movepool":["drainpunch","gunkshot","haze","painsplit","spikes","toxic","toxicspikes"]}]},"zoroark":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","flamethrower","focusblast","nastyplot","sludgebomb","trick","uturn"],"preferredTypes":["Poison"]}]},"cinccino":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["bulletseed","knockoff","rockblast","tailslap","uturn"]}]},"gothitelle":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","hiddenpowerfighting","psychic","shadowball","signalbeam","thunderbolt","trick"]}]},"reuniclus":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","focusblast","psychic","psyshock","recover","shadowball","trickroom"]},{"role":"Wallbreaker","movepool":["focusblast","psychic","psyshock","shadowball","trickroom"]}]},"swanna":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","defog","roost","scald","toxic"]}]},"vanilluxe":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["autotomize","explosion","flashcannon","freezedry","hiddenpowerground","icebeam","toxic"],"preferredTypes":["Ground"]},{"role":"AV Pivot","movepool":["explosion","flashcannon","freezedry","hiddenpowerground","icebeam"],"preferredTypes":["Ground"]}]},"sawsbuck":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["hornleech","jumpkick","return","substitute","swordsdance"],"preferredTypes":["Normal"]}]},"emolga":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["acrobatics","encore","knockoff","nuzzle","roost","thunderbolt","toxic","uturn"]}]},"escavalier":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["drillrun","ironhead","knockoff","megahorn","pursuit","swordsdance"]}]},"amoonguss":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["clearsmog","foulplay","gigadrain","hiddenpowerground","sludgebomb","spore"]},{"role":"Bulky Support","movepool":["gigadrain","sludgebomb","spore","synthesis"]}]},"jellicent":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["icebeam","recover","scald","shadowball","taunt"]},{"role":"Bulky Support","movepool":["hex","recover","scald","toxic","willowisp"]}]},"alomomola":{"level":85,"sets":[{"role":"Bulky Support","movepool":["knockoff","protect","scald","toxic","wish"]}]},"galvantula":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["bugbuzz","gigadrain","stickyweb","thunder","voltswitch"],"preferredTypes":["Bug"]}]},"ferrothorn":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["gyroball","leechseed","powerwhip","spikes","stealthrock"]},{"role":"Bulky Support","movepool":["knockoff","powerwhip","spikes","stealthrock","thunderwave","toxic"]}]},"klinklang":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["geargrind","return","shiftgear","substitute","wildcharge"]}]},"eelektross":{"level":85,"sets":[{"role":"AV Pivot","movepool":["flamethrower","gigadrain","hiddenpowerice","knockoff","superpower","thunderbolt","uturn"]}]},"beheeyem":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerfighting","nastyplot","psychic","psyshock","signalbeam","thunderbolt","trick","trickroom"]}]},"chandelure":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["energyball","fireblast","shadowball","trick"]},{"role":"Bulky Setup","movepool":["calmmind","fireblast","shadowball","substitute"]}]},"haxorus":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","outrage","poisonjab","taunt"],"preferredTypes":["Ground"]}]},"beartic":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["aquajet","iciclecrash","stoneedge","superpower","swordsdance"],"preferredTypes":["Fighting"]}]},"cryogonal":{"level":89,"sets":[{"role":"Bulky Support","movepool":["freezedry","haze","hiddenpowerground","rapidspin","recover","toxic"]}]},"accelgor":{"level":88,"sets":[{"role":"Fast Support","movepool":["bugbuzz","encore","focusblast","hiddenpowerground","hiddenpowerrock","spikes","uturn"]}]},"stunfisk":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["discharge","earthpower","rest","scald","sleeptalk","stealthrock","toxic"]},{"role":"AV Pivot","movepool":["discharge","earthpower","foulplay","scald","sludgebomb"]}]},"mienshao":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["highjumpkick","knockoff","poisonjab","stoneedge","swordsdance","uturn"],"preferredTypes":["Dark"]},{"role":"AV Pivot","movepool":["fakeout","highjumpkick","knockoff","uturn"]}]},"druddigon":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["firepunch","glare","gunkshot","outrage","suckerpunch"],"preferredTypes":["Poison"]},{"role":"Bulky Support","movepool":["dragontail","earthquake","glare","gunkshot","outrage","stealthrock","suckerpunch"]}]},"golurk":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["dynamicpunch","earthquake","icepunch","rockpolish","stealthrock","stoneedge"],"preferredTypes":["Fighting"]}]},"bisharp":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["ironhead","knockoff","pursuit","suckerpunch","swordsdance"]}]},"bouffalant":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headcharge","stoneedge","superpower","swordsdance"]}]},"braviary":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","bulkup","roost","superpower"]},{"role":"Fast Attacker","movepool":["bravebird","return","superpower","uturn"]}]},"mandibuzz":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","defog","foulplay","knockoff","roost","taunt","toxic","uturn"]},{"role":"Bulky Support","movepool":["defog","foulplay","roost","taunt","toxic","uturn"]}]},"heatmor":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["fireblast","gigadrain","knockoff","suckerpunch","superpower"]}]},"durant":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["honeclaws","ironhead","rockslide","superpower","xscissor"],"preferredTypes":["Fighting"]}]},"hydreigon":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","dracometeor","earthpower","fireblast","flashcannon","roost","uturn"]},{"role":"Bulky Attacker","movepool":["darkpulse","dracometeor","fireblast","roost","uturn"]},{"role":"AV Pivot","movepool":["darkpulse","dracometeor","flashcannon","superpower","uturn"],"preferredTypes":["Fighting"]}]},"volcarona":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["bugbuzz","fierydance","fireblast","gigadrain","hiddenpowerrock","quiverdance","roost"]}]},"cobalion":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["closecombat","ironhead","stealthrock","stoneedge","swordsdance"]}]},"terrakion":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","quickattack","stealthrock","stoneedge","swordsdance"],"preferredTypes":["Ground"]}]},"virizion":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["closecombat","leafblade","stoneedge","swordsdance"]}]},"tornadus":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["heatwave","hurricane","knockoff","superpower","taunt","uturn"]},{"role":"Setup Sweeper","movepool":["acrobatics","bulkup","knockoff","superpower","taunt"],"preferredTypes":["Fighting"]}]},"tornadustherian":{"level":79,"sets":[{"role":"Fast Support","movepool":["heatwave","hurricane","knockoff","superpower","taunt","uturn"]}]},"thundurus":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["focusblast","hiddenpowerflying","hiddenpowerice","nastyplot","substitute","thunderbolt"]},{"role":"Fast Attacker","movepool":["hiddenpowerflying","hiddenpowerice","knockoff","superpower","taunt","thunderbolt","thunderwave"]}]},"thundurustherian":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["focusblast","hiddenpowerflying","hiddenpowerice","nastyplot","thunderbolt","voltswitch"]}]},"reshiram":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["blueflare","dracometeor","roost","toxic"]}]},"zekrom":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["boltstrike","honeclaws","outrage","roost","substitute"]},{"role":"AV Pivot","movepool":["boltstrike","dracometeor","outrage","voltswitch"]}]},"landorus":{"level":76,"sets":[{"role":"Wallbreaker","movepool":["earthpower","focusblast","knockoff","psychic","rockpolish","rockslide","sludgewave","stealthrock"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","focusblast","psychic","rockpolish","sludgewave"],"preferredTypes":["Poison"]}]},"landorustherian":{"level":77,"sets":[{"role":"Bulky Support","movepool":["earthquake","knockoff","stealthrock","stoneedge","toxic","uturn"]},{"role":"Setup Sweeper","movepool":["earthquake","knockoff","rockpolish","stoneedge","superpower","swordsdance"],"preferredTypes":["Rock"]}]},"kyurem":{"level":79,"sets":[{"role":"Staller","movepool":["earthpower","icebeam","roost","substitute"]},{"role":"Bulky Support","movepool":["dracometeor","earthpower","icebeam","outrage","roost","substitute"]},{"role":"Bulky Attacker","movepool":["dracometeor","earthpower","focusblast","icebeam","outrage"]}]},"kyuremblack":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","fusionbolt","icebeam","outrage","roost","substitute"]}]},"kyuremwhite":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["dracometeor","earthpower","fusionflare","icebeam","roost"]}]},"keldeo":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerelectric","hiddenpowerflying","hydropump","icywind","scald","secretsword"]},{"role":"Bulky Setup","movepool":["calmmind","hydropump","scald","secretsword","substitute"]},{"role":"Fast Attacker","movepool":["focusblast","hydropump","scald","secretsword"]}]},"meloetta":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["calmmind","focusblast","hypervoice","psyshock","uturn"]},{"role":"Wallbreaker","movepool":["closecombat","knockoff","relicsong","return"]}]},"genesect":{"level":73,"sets":[{"role":"Setup Sweeper","movepool":["blazekick","ironhead","shiftgear","thunderbolt","xscissor"]},{"role":"Wallbreaker","movepool":["blazekick","extremespeed","ironhead","uturn"]},{"role":"Fast Attacker","movepool":["bugbuzz","flamethrower","flashcannon","icebeam","thunderbolt","uturn"],"preferredTypes":["Bug"]}]},"chesnaught":{"level":86,"sets":[{"role":"Bulky Support","movepool":["bulkup","drainpunch","spikes","synthesis","toxic","woodhammer"]},{"role":"Staller","movepool":["drainpunch","leechseed","spikyshield","woodhammer"]}]},"delphox":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["calmmind","dazzlinggleam","fireblast","grassknot","psyshock","switcheroo"]}]},"greninja":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["gunkshot","hydropump","icebeam","spikes","taunt","toxicspikes","uturn"]}]},"diggersby":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["agility","earthquake","knockoff","quickattack","return","swordsdance"],"preferredTypes":["Normal"]},{"role":"Fast Attacker","movepool":["earthquake","foulplay","quickattack","return","uturn"],"preferredTypes":["Normal"]}]},"talonflame":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","overheat","roost","uturn","willowisp"]},{"role":"Bulky Setup","movepool":["bravebird","flareblitz","roost","swordsdance"]}]},"vivillon":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["energyball","hurricane","quiverdance","sleeppowder"]},{"role":"Bulky Attacker","movepool":["bugbuzz","hurricane","quiverdance","sleeppowder"]}]},"pyroar":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","fireblast","hypervoice","solarbeam","sunnyday","willowisp"],"preferredTypes":["Normal"]}]},"floetteeternal":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerfire","hiddenpowerground","lightofruin","moonblast","psychic"]}]},"florges":{"level":84,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","moonblast","synthesis","toxic"]},{"role":"Staller","movepool":["moonblast","protect","toxic","wish"]},{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerground","moonblast","synthesis"]}]},"gogoat":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["bulkup","earthquake","hornleech","milkdrink","toxic"]}]},"pangoro":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["drainpunch","gunkshot","icepunch","knockoff","partingshot","superpower","swordsdance"],"preferredTypes":["Poison"]}]},"furfrou":{"level":85,"sets":[{"role":"Bulky Support","movepool":["darkpulse","rest","return","thunderwave","toxic","uturn"]},{"role":"Staller","movepool":["cottonguard","rest","return","substitute","toxic"]}]},"meowstic":{"level":86,"sets":[{"role":"Bulky Support","movepool":["healbell","lightscreen","psychic","reflect","signalbeam","thunderwave","toxic","yawn"]}]},"meowsticf":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["calmmind","darkpulse","psychic","psyshock","signalbeam","thunderbolt"]}]},"doublade":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["ironhead","sacredsword","shadowclaw","shadowsneak","swordsdance"]}]},"aegislash":{"level":79,"sets":[{"role":"Staller","movepool":["ironhead","kingsshield","shadowball","substitute","toxic"]},{"role":"Setup Sweeper","movepool":["ironhead","kingsshield","sacredsword","shadowclaw","shadowsneak","swordsdance"],"preferredTypes":["Steel"]}]},"aromatisse":{"level":90,"sets":[{"role":"Bulky Support","movepool":["calmmind","moonblast","protect","toxic","wish"]}]},"slurpuff":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["bellydrum","drainpunch","playrough","return"]}]},"malamar":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["knockoff","rest","sleeptalk","superpower"]},{"role":"Fast Attacker","movepool":["knockoff","psychocut","rest","superpower"]}]},"barbaracle":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","lowkick","razorshell","shellsmash","stoneedge"]}]},"dragalge":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","focusblast","sludgewave","toxicspikes"]},{"role":"Wallbreaker","movepool":["dracometeor","dragonpulse","focusblast","sludgewave"]}]},"clawitzer":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["aurasphere","darkpulse","icebeam","scald","uturn","waterpulse"]}]},"heliolisk":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","glare","hypervoice","surf","thunderbolt","voltswitch"],"preferredTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["hypervoice","raindance","surf","thunder"]}]},"tyrantrum":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["dragondance","earthquake","headsmash","outrage","stealthrock","superpower"],"preferredTypes":["Ground"]}]},"aurorus":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["ancientpower","blizzard","earthpower","freezedry","stealthrock"]},{"role":"Bulky Support","movepool":["earthpower","freezedry","haze","hypervoice","stealthrock","thunderwave"]}]},"sylveon":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","hiddenpowerground","hypervoice","protect","psyshock","wish"]},{"role":"Bulky Setup","movepool":["calmmind","hypervoice","protect","wish"]}]},"hawlucha":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["acrobatics","highjumpkick","skyattack","substitute","swordsdance"]}]},"dedenne":{"level":89,"sets":[{"role":"Bulky Support","movepool":["protect","recycle","thunderbolt","toxic"]},{"role":"Staller","movepool":["recycle","substitute","superfang","thunderbolt","toxic","uturn"]}]},"carbink":{"level":89,"sets":[{"role":"Bulky Support","movepool":["lightscreen","moonblast","powergem","reflect","stealthrock","toxic"]}]},"goodra":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","dragontail","earthquake","fireblast","powerwhip","sludgebomb","thunderbolt"]}]},"klefki":{"level":81,"sets":[{"role":"Bulky Support","movepool":["dazzlinggleam","foulplay","spikes","thunderwave"]},{"role":"Bulky Attacker","movepool":["magnetrise","playrough","spikes","thunderwave"]}]},"trevenant":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hornleech","rockslide","shadowclaw","trickroom","woodhammer"]},{"role":"Staller","movepool":["earthquake","hornleech","protect","toxic"]}]},"gourgeistsmall":{"level":87,"sets":[{"role":"Bulky Support","movepool":["seedbomb","shadowsneak","synthesis","willowisp"]}]},"gourgeistlarge":{"level":88,"sets":[{"role":"Bulky Support","movepool":["seedbomb","shadowsneak","synthesis","willowisp"]}]},"gourgeist":{"level":87,"sets":[{"role":"Bulky Support","movepool":["seedbomb","shadowsneak","synthesis","willowisp"]}]},"gourgeistsuper":{"level":88,"sets":[{"role":"Bulky Support","movepool":["seedbomb","shadowsneak","synthesis","willowisp"]}]},"avalugg":{"level":90,"sets":[{"role":"Bulky Support","movepool":["avalanche","curse","earthquake","rapidspin","recover"]}]},"noivern":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["boomburst","dracometeor","flamethrower","hurricane","roost","switcheroo","uturn"]}]},"xerneas":{"level":64,"sets":[{"role":"Setup Sweeper","movepool":["focusblast","geomancy","hiddenpowerfire","moonblast","psyshock","thunder"]}]},"yveltal":{"level":71,"sets":[{"role":"Bulky Support","movepool":["knockoff","oblivionwing","roost","suckerpunch","taunt","toxic","uturn"]}]},"zygarde":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","extremespeed","glare","outrage","substitute"]}]},"diancie":{"level":82,"sets":[{"role":"Bulky Support","movepool":["diamondstorm","earthpower","healbell","moonblast","stealthrock","toxic"]}]},"dianciemega":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["calmmind","diamondstorm","earthpower","moonblast","protect"],"preferredTypes":["Ground"]}]},"hoopa":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["focusblast","nastyplot","psychic","psyshock","shadowball","trick"]}]},"hoopaunbound":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["drainpunch","gunkshot","hyperspacefury","trick","zenheadbutt"],"preferredTypes":["Psychic"]},{"role":"Bulky Attacker","movepool":["drainpunch","gunkshot","hyperspacefury","psychic","trick"],"preferredTypes":["Psychic"]}]},"volcanion":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","fireblast","sludgebomb","steameruption","superpower","toxic"]}]}} as any;
/* eslint-enable */

// Moves that restore HP:
const RECOVERY_MOVES = [
	'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'recycle', 'roost', 'slackoff', 'softboiled', 'synthesis',
];
// Moves that boost Attack:
const PHYSICAL_SETUP = [
	'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'meditate', 'poweruppunch', 'screech', 'swordsdance',
];
// Moves which boost Special Attack:
const SPECIAL_SETUP = [
	'calmmind', 'chargebeam', 'geomancy', 'nastyplot', 'quiverdance', 'tailglow',
];
// Some moves that only boost Speed:
const SPEED_SETUP = [
	'agility', 'autotomize', 'flamecharge', 'rockpolish',
];
// Conglomerate for ease of access
const SETUP = [
	'acidarmor', 'agility', 'autotomize', 'bellydrum', 'bulkup', 'calmmind', 'coil', 'curse', 'dragondance', 'flamecharge',
	'focusenergy', 'geomancy', 'growth', 'honeclaws', 'howl', 'irondefense', 'meditate', 'nastyplot', 'poweruppunch',
	'quiverdance', 'raindance', 'rockpolish', 'shellsmash', 'shiftgear', 'swordsdance', 'tailglow', 'workup',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'aquajet', 'bulletpunch', 'clearsmog', 'dragontail', 'eruption', 'explosion', 'fakeout', 'flamecharge',
	'futuresight', 'iceshard', 'icywind', 'incinerate', 'infestation', 'machpunch', 'nuzzle', 'pluck', 'poweruppunch',
	'pursuit', 'quickattack', 'rapidspin', 'reversal', 'selfdestruct', 'shadowsneak', 'skyattack', 'skydrop', 'snarl',
	'suckerpunch', 'uturn', 'watershuriken', 'vacuumwave', 'voltswitch', 'waterspout',
];
// Hazard-setting moves
const HAZARDS = [
	'spikes', 'stealthrock', 'stickyweb', 'toxicspikes',
];
// Protect and its variants
const PROTECT_MOVES = [
	'kingsshield', 'protect', 'spikyshield',
];
// Moves that switch the user out
const PIVOT_MOVES = [
	'partingshot', 'uturn', 'voltswitch',
];

// Moves that should be paired together when possible
const MOVE_PAIRS = [
	['lightscreen', 'reflect'],
	['sleeptalk', 'rest'],
	['protect', 'wish'],
	['spikyshield', 'wish'],
	['leechseed', 'substitute'],
	['perishsong', 'protect'],
	['solarbeam', 'sunnyday'],
];

/** Pokemon who always want priority STAB, and are fine with it as its only STAB move of that type */
const PRIORITY_POKEMON = [
	'aegislash', 'banette', 'breloom', 'cacturne', 'doublade', 'dusknoir', 'honchkrow', 'scizor', 'scizormega', 'shedinja',
];

export class RandomGen6Teams extends RandomGen7Teams {
	randomSets: {[species: string]: RandomTeamsTypes.RandomSpeciesData} = randomSetsJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);

		this.noStab = NO_STAB;
		this.priorityPokemon = PRIORITY_POKEMON;

		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter) => (
				['megahorn', 'pinmissile'].some(m => movePool.includes(m)) ||
				!counter.get('Bug') && abilities.has('Tinted Lens')
			),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
			Dragon: (movePool, moves, abilities, types, counter) => !counter.get('Dragon'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fairy: (movePool, moves, abilities, types, counter) => !counter.get('Fairy'),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting'),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Flying') && !['aerodactylmega', 'charizardmegay', 'mantine', 'murkrow'].includes(species.id) &&
				!movePool.includes('hiddenpowerflying')
			),
			Ghost: (movePool, moves, abilities, types, counter) => !counter.get('Ghost'),
			Grass: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Grass') && (species.baseStats.atk >= 100 || movePool.includes('leafstorm'))
			),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => (
				!counter.get('Ice') || (!moves.has('blizzard') && movePool.includes('freezedry')) ||
				abilities.has('Refrigerate') && (movePool.includes('return') || movePool.includes('hypervoice'))
			),
			Normal: movePool => movePool.includes('boomburst'),
			Poison: (movePool, moves, abilities, types, counter) => !counter.get('Poison'),
			Psychic: (movePool, moves, abilities, types, counter) => (
				!counter.get('Psychic') && (types.has('Fighting') || movePool.includes('calmmind'))
			),
			Rock: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Rock') && (species.baseStats.atk >= 95 || abilities.has('Rock Head'))
			),
			Steel: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Steel') && species.baseStats.atk >= 100
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

		// Develop additional move lists
		const badWithSetup = ['defog', 'dragontail', 'haze', 'healbell', 'nuzzle', 'pursuit', 'rapidspin', 'toxic'];
		const statusMoves = this.dex.moves.all()
			.filter(move => move.category === 'Status')
			.map(move => move.id);

		// General incompatibilities
		const incompatiblePairs = [
			// These moves don't mesh well with other aspects of the set
			[statusMoves, ['healingwish', 'memento', 'switcheroo', 'trick']],
			[SETUP, PIVOT_MOVES],
			[SETUP, HAZARDS],
			[SETUP, badWithSetup],
			[PHYSICAL_SETUP, PHYSICAL_SETUP],
			[SPEED_SETUP, 'quickattack'],
			['defog', HAZARDS],
			[['fakeout', 'uturn'], ['switcheroo', 'trick']],
			['substitute', PIVOT_MOVES],
			['leechseed', 'dragontail'],
			['rest', 'substitute'],
			[PHYSICAL_SETUP, 'dracometeor'],
			[SPECIAL_SETUP, 'knockoff'],

			// These attacks are redundant with each other
			['psychic', 'psyshock'],
			['scald', ['hydropump', 'originpulse', 'waterpulse']],
			['return', ['bodyslam', 'doubleedge']],
			[['fierydance', 'lavaplume'], ['fireblast', 'magmastorm']],
			[['flamethrower', 'flareblitz'], ['fireblast', 'overheat']],
			['hornleech', 'woodhammer'],
			[['gigadrain', 'leafstorm'], ['leafstorm', 'petaldance', 'powerwhip']],
			['wildcharge', 'thunderbolt'],
			['gunkshot', 'poisonjab'],
			[['drainpunch', 'focusblast'], ['closecombat', 'highjumpkick', 'superpower']],
			['stoneedge', 'headsmash'],
			['dracometeor', 'dragonpulse'],
			['dragonclaw', 'outrage'],
			['knockoff', ['darkpulse', 'foulplay']],

			// Status move incompatibilities
			['toxic', 'toxicspikes'],
			['taunt', 'disable'],
			['defog', ['leechseed', 'substitute']],

			// Assorted hardcodes go here:
			// Lunatone
			['moonlight', 'rockpolish'],
			// Smeargle
			['destinybond', 'whirlwind'],
			// Liepard
			['copycat', 'uturn'],
			// Seviper
			['switcheroo', 'suckerpunch'],
			// Jirachi
			['bodyslam', 'healingwish'],
		];

		for (const pair of incompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

		if (!types.includes('Dark') && preferredType !== 'Dark') {
			this.incompatibleMoves(moves, movePool, 'knockoff', ['pursuit', 'suckerpunch']);
		}

		const statusInflictingMoves = ['thunderwave', 'toxic', 'willowisp', 'yawn'];
		if (!abilities.has('Prankster') && role !== 'Staller') {
			this.incompatibleMoves(moves, movePool, statusInflictingMoves, statusInflictingMoves);
		}

		if (abilities.has('Guts')) this.incompatibleMoves(moves, movePool, 'protect', 'swordsdance');

		// Force Protect and U-turn on Beedrill-Mega
		if (species.id === 'beedrillmega') {
			this.incompatibleMoves(moves, movePool, 'drillrun', 'knockoff');
		}

		// Cull filler moves for otherwise fixed set Stealth Rock users
		if (!teamDetails.stealthRock) {
			if (species.id === 'registeel' && role === 'Staller') {
				if (movePool.includes('thunderwave')) this.fastPop(movePool, movePool.indexOf('thunderwave'));
				if (moves.size + movePool.length <= this.maxMoveCount) return;
			}
			if (species.baseSpecies === 'Wormadam' && role === 'Staller') {
				if (movePool.includes('infestation')) this.fastPop(movePool, movePool.indexOf('infestation'));
				if (moves.size + movePool.length <= this.maxMoveCount) return;
			}
		}
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

		// Enforce Blizzard, Seismic Toss, Spore, and Sticky Web
		for (const moveid of ['blizzard', 'seismictoss', 'spore', 'stickyweb']) {
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

		// Enforce Shadow Sneak on Kecleon
		if (movePool.includes('shadowsneak') && species.id === 'kecleon') {
			counter = this.addMove('shadowsneak', moves, types, abilities, teamDetails, species, isLead,
				movePool, preferredType, role);
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

		// Enforce STAB priority
		if (['Bulky Attacker', 'Bulky Setup', 'Wallbreaker'].includes(role) || this.priorityPokemon.includes(species.id)) {
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

		// Enforce setup
		if (role.includes('Setup')) {
			const setupMoves = movePool.filter(moveid => SETUP.includes(moveid));
			if (setupMoves.length) {
				const moveid = this.sample(setupMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
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
		case 'Flare Boost': case 'Gluttony': case 'Harvest': case 'Ice Body': case 'Magician':
		case 'Moody': case 'Pressure': case 'Sand Veil': case 'Sniper': case 'Snow Cloak': case 'Steadfast':
			return true;
		case 'Aerilate': case 'Pixilate': case 'Refrigerate':
			return ['doubleedge', 'hypervoice', 'return'].every(m => !moves.has(m));
		case 'Chlorophyll':
			// Petal Dance is for Lilligant
			return (
				species.baseStats.spe > 100 || moves.has('petaldance') ||
				(!moves.has('sunnyday') && !teamDetails.sun)
			);
		case 'Competitive':
			return !counter.get('Special');
		case 'Compound Eyes': case 'No Guard':
			return !counter.get('inaccurate');
		case 'Contrary': case 'Skill Link': case 'Strong Jaw':
			return !counter.get(toID(ability));
		case 'Defiant': case 'Justified':
			return !counter.get('Physical');
		case 'Guts':
			return (!moves.has('facade') && !moves.has('sleeptalk'));
		case 'Hustle':
			return counter.get('Physical') < 2;
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
			return (species.baseSpecies === 'Basculin' || species.id === 'pangoro' || abilities.has('Sheer Force'));
		case 'Moxie':
			return (!counter.get('Physical') || moves.has('stealthrock') || (!!species.isMega && abilities.has('Intimidate')));
		case 'Oblivious': case 'Prankster':
			return (!counter.get('Status') || (species.id === 'tornadus' && moves.has('bulkup')));
		case 'Overcoat':
			return types.has('Grass');
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Shed Skin':
			return !moves.has('rest');
		case 'Synchronize':
			return (counter.get('Status') < 2 || !!counter.get('recoil') || !!species.isMega);
		case 'Regenerator':
			return species.id === 'mienshao' || species.id === 'reuniclus';
		case 'Reckless': case 'Rock Head':
			return (!counter.get('recoil') || !!species.isMega);
		case 'Sand Force': case 'Sand Rush':
			return !teamDetails.sand;
		case 'Scrappy':
			return !types.has('Normal');
		case 'Serene Grace':
			return !counter.get('serenegrace');
		case 'Sheer Force':
			return (!counter.get('sheerforce') || moves.has('doubleedge') || abilities.has('Guts') || !!species.isMega);
		case 'Simple':
			return !counter.get('setup');
		case 'Snow Warning':
			// Aurorus
			return moves.has('hypervoice');
		case 'Solar Power':
			return (!counter.get('Special') || !teamDetails.sun || !!species.isMega);
		case 'Sturdy':
			return (!!counter.get('recoil') && !counter.get('recovery') || species.id === 'steelix' && !!counter.get('sheerforce'));
		case 'Swarm':
			return ((!counter.get('Bug') && !moves.has('uturn')) || !!species.isMega);
		case 'Technician':
			return (!counter.get('technician') || moves.has('tailslap') || !!species.isMega);
		case 'Tinted Lens':
			return (['illumise', 'sigilyph', 'yanmega'].some(m => species.id === (m)) && role !== 'Wallbreaker');
		case 'Torrent':
			return (!counter.get('Water') || !!species.isMega);
		case 'Unaware':
			return (role !== 'Bulky Support' && role !== 'Staller');
		case 'Unburden':
			return (!!species.isMega || !counter.get('setup') && !moves.has('acrobatics'));
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
		if (species.battleOnly && !species.requiredAbility) {
			abilities = new Set(Object.values(this.dex.species.get(species.battleOnly as string).abilities));
		}
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
		if (species.baseSpecies === 'Gourgeist') return 'Frisk';
		if (species.id === 'pinsirmega') return 'Hyper Cutter';
		if (species.id === 'ninjask' || species.id === 'seviper') return 'Infiltrator';
		if (species.id === 'gligar') return 'Immunity';
		if (species.id === 'arcanine' || species.id === 'stantler') return 'Intimidate';
		if (species.id === 'lucariomega') return 'Justified';
		if (species.id === 'persian' && !counter.get('technician')) return 'Limber';
		if (species.baseSpecies === 'Altaria') return 'Natural Cure';
		// If Ambipom doesn't qualify for Technician, Skill Link is useless on it
		if (species.id === 'ambipom' && !counter.get('technician')) return 'Pickup';
		if (species.id === 'muk') return 'Poison Touch';
		if (['dusknoir', 'vespiquen'].includes(species.id)) return 'Pressure';
		if (species.id === 'druddigon' && role === 'Bulky Support') return 'Rough Skin';
		if (species.id === 'zebstrika') return moves.has('wildcharge') ? 'Sap Sipper' : 'Lightning Rod';
		if (species.id === 'stoutland' || species.id === 'pangoro' && !counter.get('ironfist')) return 'Scrappy';
		if (species.id === 'octillery') return 'Sniper';
		if (species.id === 'stunfisk') return 'Static';
		if (species.id === 'breloom') return 'Technician';
		if (species.id === 'zangoose') return 'Toxic Boost';

		if (abilities.has('Harvest') && (role === 'Bulky Support' || role === 'Staller')) return 'Harvest';
		if (abilities.has('Regenerator') && role === 'AV Pivot') return 'Regenerator';
		if (abilities.has('Shed Skin') && moves.has('rest') && !moves.has('sleeptalk')) return 'Shed Skin';
		if (abilities.has('Sniper') && moves.has('focusenergy')) return 'Sniper';
		if (abilities.has('Unburden') && ['acrobatics', 'bellydrum'].some(m => moves.has(m))) return 'Unburden';

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
		if (role === 'AV Pivot') return 'Assault Vest';
		if (species.name === 'Farfetch\u2019d') return 'Stick';
		if (species.name === 'Latias' || species.name === 'Latios') return 'Soul Dew';
		if (species.name === 'Marowak') return 'Thick Club';
		if (species.name === 'Pikachu') return 'Light Ball';
		if (species.name === 'Shedinja' || species.name === 'Smeargle') return 'Focus Sash';
		if (species.name === 'Talonflame') return 'Sharp Beak';
		if (species.name === 'Unfezant' || moves.has('focusenergy')) return 'Scope Lens';
		if (species.name === 'Unown') return 'Choice Specs';
		if (species.name === 'Wobbuffet') return 'Custap Berry';
		if (species.name === 'Shuckle') return 'Mental Herb';
		if (ability === 'Harvest' || ability === 'Cheek Pouch') return 'Sitrus Berry';
		if (species.name === 'Ditto') return 'Choice Scarf';
		if (ability === 'Poison Heal') return 'Toxic Orb';
		if (ability === 'Speed Boost') return 'Life Orb';
		if (species.nfe) return (species.name === 'Scyther' && role === 'Fast Attacker') ? 'Choice Band' : 'Eviolite';
		if (['healingwish', 'memento', 'switcheroo', 'trick'].some(m => moves.has(m))) {
			if (species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && role !== 'Wallbreaker') {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (moves.has('bellydrum')) return 'Sitrus Berry';
		if (moves.has('waterspout')) return 'Choice Scarf';
		if (moves.has('geomancy') || moves.has('skyattack')) return 'Power Herb';
		if (moves.has('shellsmash')) {
			return (ability === 'Solid Rock' && !!counter.get('priority')) ? 'Weakness Policy' : 'White Herb';
		}
		if (moves.has('psychoshift')) return 'Flame Orb';
		if ((ability === 'Guts' || moves.has('facade')) && !moves.has('sleeptalk')) {
			return species.name === 'Conkeldurr' ? 'Flame Orb' : 'Toxic Orb';
		}
		if (ability === 'Magic Guard' && role !== 'Bulky Support') {
			return moves.has('counter') ? 'Focus Sash' : 'Life Orb';
		}
		if (species.id === 'rampardos' && role === 'Fast Attacker') return 'Choice Scarf';
		if (ability === 'Sheer Force' && counter.get('sheerforce')) return 'Life Orb';
		if (ability === 'Unburden') return (species.id === 'hitmonlee') ? 'White Herb' : 'Sitrus Berry';
		if (moves.has('acrobatics')) return '';
		if (moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (moves.has('rest') && !moves.has('sleeptalk') && !['Hydration', 'Natural Cure', 'Shed Skin'].includes(ability)) {
			return 'Chesto Berry';
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
			moves.has('pursuit') && moves.has('suckerpunch') && counter.get('Dark') && !this.priorityPokemon.includes(species.id)
		) return 'Black Glasses';
		if (counter.get('Special') === 4) {
			return (
				scarfReqs && species.baseStats.spa >= 90 && this.randomChance(1, 2)
			) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (counter.get('Special') === 3 && moves.has('uturn')) return 'Choice Specs';
		if (counter.get('Physical') === 4 && species.id !== 'jirachi' &&
			['dragontail', 'fakeout', 'flamecharge', 'nuzzle', 'rapidspin'].every(m => !moves.has(m))
		) {
			return (
				scarfReqs && (species.baseStats.atk >= 100 || ability === 'Pure Power' || ability === 'Huge Power') &&
				this.randomChance(1, 2)
			) ? 'Choice Scarf' : 'Choice Band';
		}

		if (ability === 'Sturdy' && moves.has('explosion') && !counter.get('speedsetup')) return 'Custap Berry';
		if (types.includes('Normal') && moves.has('fakeout') && !!counter.get('Normal')) return 'Silk Scarf';
		if (role === 'Bulky Setup' && !!counter.get('speedsetup') && !moves.has('swordsdance')) {
			return 'Weakness Policy';
		}
		if (species.id === 'palkia') return 'Lustrous Orb';
		if (species.id === 'archeops') return 'Expert Belt';
		if (!counter.get('Status') && (
			['Fast Support', 'Bulky Support', 'Bulky Attacker'].some(m => role === m) || moves.has('rapidspin')
		)) {
			return 'Assault Vest';
		}
		if (moves.has('outrage') && counter.get('setup')) return 'Lum Berry';
		if (
			(ability === 'Rough Skin') || (species.id !== 'hooh' &&
			ability === 'Regenerator' && species.baseStats.hp + species.baseStats.def >= 180 && this.randomChance(1, 2))
		) return 'Rocky Helmet';
		if (['kingsshield', 'protect', 'spikyshield', 'substitute'].some(m => moves.has(m))) return 'Leftovers';
		if (
			this.dex.getEffectiveness('Ground', species) >= 2 &&
			ability !== 'Levitate'
		) {
			return 'Air Balloon';
		}
		if (
			(role === 'Fast Support' || moves.has('stickyweb')) && isLead && defensiveStatTotal < 255 &&
			!counter.get('recovery') && (counter.get('hazards') || counter.get('setup')) &&
			(!counter.get('recoil') || ability === 'Rock Head')
		) return 'Focus Sash';

		// Default Items
		if (role === 'Fast Support') {
			return (
				counter.get('Physical') + counter.get('Special') >= 3 &&
				['nuzzle', 'rapidspin', 'uturn', 'voltswitch'].every(m => !moves.has(m)) &&
				this.dex.getEffectiveness('Rock', species) < 2
			) ? 'Life Orb' : 'Leftovers';
		}
		if (!counter.get('Status')) {
			return (
				(moves.has('uturn') || moves.has('voltswitch')) && !counter.get('Dragon') && !counter.get('Normal')
			) ? 'Expert Belt' : 'Life Orb';
		}
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
		for (const set of sets) possibleSets.push(set);
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

		// Minimize confusion damage, including if Foul Play is its only physical attack
		if (
			(!counter.get('Physical') || (counter.get('Physical') <= 1 && moves.has('foulplay'))) &&
			!moves.has('copycat') && !moves.has('transform')
		) {
			evs.atk = 0;
			ivs.atk = 0;
		}

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
			const HPivs = ivs.atk === 0 ? ZeroAttackHPIVs[hpType] : this.dex.types.get(hpType).HPivs;
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

		if (['gyroball', 'metalburst', 'trickroom'].some(m => moves.has(m))) {
			evs.spe = 0;
			ivs.spe = (hasHiddenPower && level < 100) ? ivs.spe - 30 : 0;
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

	randomFactorySets: {[format: string]: {[species: string]: BattleFactorySpecies}} = {};

	randomFactorySet(
		species: Species,
		teamData: RandomTeamsTypes.FactoryTeamDetails,
		tier: string
	): RandomTeamsTypes.RandomFactorySet | null {
		const id = toID(species.name);
		// const flags = this.randomFactorySets[tier][id].flags;
		const setList = this.randomFactorySets[tier][id].sets;

		const itemsMax: {[k: string]: number} = {choicespecs: 1, choiceband: 1, choicescarf: 1};
		const movesMax: {[k: string]: number} = {
			rapidspin: 1, batonpass: 1, stealthrock: 1, defog: 1, spikes: 1, toxicspikes: 1,
		};
		const requiredMoves: {[k: string]: string} = {stealthrock: 'hazardSet', rapidspin: 'hazardClear', defog: 'hazardClear'};
		const weatherAbilitiesRequire: {[k: string]: string} = {
			hydration: 'raindance', swiftswim: 'raindance',
			leafguard: 'sunnyday', solarpower: 'sunnyday', chlorophyll: 'sunnyday',
			sandforce: 'sandstorm', sandrush: 'sandstorm', sandveil: 'sandstorm',
			snowcloak: 'hail',
		};
		const weatherAbilities = ['drizzle', 'drought', 'snowwarning', 'sandstream'];

		// Build a pool of eligible sets, given the team partners
		// Also keep track of sets with moves the team requires
		let effectivePool: {set: AnyObject, moveVariants?: number[], itemVariants?: number, abilityVariants?: number}[] = [];
		const priorityPool = [];
		for (const curSet of setList) {
			if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			const itemData = this.dex.items.get(curSet.item);
			if (teamData.megaCount && teamData.megaCount > 0 && itemData.megaStone) continue; // reject 2+ mega stones
			if (itemsMax[itemData.id] && teamData.has[itemData.id] >= itemsMax[itemData.id]) continue;

			const abilityState = this.dex.abilities.get(curSet.ability);
			if (weatherAbilitiesRequire[abilityState.id] && teamData.weather !== weatherAbilitiesRequire[abilityState.id]) continue;
			if (teamData.weather && weatherAbilities.includes(abilityState.id)) continue; // reject 2+ weather setters

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

		return {
			name: setData.set.name || species.baseSpecies,
			species: setData.set.species,
			gender: setData.set.gender || species.gender || (this.randomChance(1, 2) ? 'M' : 'F'),
			item: setData.set.item || '',
			ability: setData.set.ability || species.abilities['0'],
			shiny: typeof setData.set.shiny === 'undefined' ? this.randomChance(1, 1024) : setData.set.shiny,
			level: this.adjustLevel || 100,
			happiness: typeof setData.set.happiness === 'undefined' ? 255 : setData.set.happiness,
			evs: setData.set.evs || {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84},
			ivs: setData.set.ivs || {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			nature: setData.set.nature || 'Serious',
			moves: moves,
		};
	}

	randomFactoryTeam(side: PlayerOptions, depth = 0): RandomTeamsTypes.RandomFactorySet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const forceResult = (depth >= 12);

		// The teams generated depend on the tier choice in such a way that
		// no exploitable information is leaked from rolling the tier in getTeam(p1).
		if (!this.factoryTier) this.factoryTier = this.sample(['Uber', 'OU', 'UU', 'RU', 'NU', 'PU']);
		const chosenTier = this.factoryTier;

		const pokemon = [];

		const pokemonPool = Object.keys(this.randomFactorySets[chosenTier]);

		const teamData: TeamData = {
			typeCount: {}, typeComboCount: {}, baseFormes: {}, megaCount: 0, has: {}, forceResult,
			weaknesses: {}, resistances: {},
		};
		const requiredMoveFamilies = ['hazardSet', 'hazardClear'];
		const requiredMoves: {[k: string]: string} = {stealthrock: 'hazardSet', rapidspin: 'hazardClear', defog: 'hazardClear'};
		const weatherAbilitiesSet: {[k: string]: string} = {
			drizzle: 'raindance', drought: 'sunnyday', snowwarning: 'hail', sandstream: 'sandstorm',
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

			const speciesFlags = this.randomFactorySets[chosenTier][species.id].flags;

			// Limit to one of each species (Species Clause)
			if (teamData.baseFormes[species.baseSpecies]) continue;

			// Limit the number of Megas to one
			if (!teamData.megaCount) teamData.megaCount = 0;
			if (teamData.megaCount >= 1 && speciesFlags.megaOnly) continue;

			// Dynamically scale limits for different team sizes. The default and minimum value is 1.
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

			// Limit 2 of any type
			const types = species.types;
			let skip = false;
			for (const type of types) {
				if (teamData.typeCount[type] >= 2 * limitFactor && this.randomChance(4, 5)) {
					skip = true;
					break;
				}
			}
			if (skip) continue;

			const set = this.randomFactorySet(species, teamData, chosenTier);
			if (!set) continue;

			// Limit 1 of any type combination
			let typeCombo = types.slice().sort().join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}
			if (teamData.typeComboCount[typeCombo] >= 1 * limitFactor) continue;

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
			teamData.typeComboCount[typeCombo] = (teamData.typeComboCount[typeCombo] + 1) || 1;

			teamData.baseFormes[species.baseSpecies] = 1;

			const itemData = this.dex.items.get(set.item);
			if (itemData.megaStone) teamData.megaCount++;
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
					// Heuristic: assume that Pokemon with these abilities don't have (too) negative typing.
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
			for (const type in teamData.weaknesses) {
				if (teamData.weaknesses[type] >= 3) return this.randomFactoryTeam(side, ++depth);
			}
		}

		return pokemon;
	}
}

export default RandomGen6Teams;
