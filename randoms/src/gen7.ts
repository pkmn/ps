import {MoveCounter, RandomGen8Teams, TeamData} from './gen8';
import {Utils} from './utils';
import {
	Ability,
	AnyObject,
	Format,
	ModdedDex,
	Move,
	PRNG,
	PRNGSeed,
	PlayerOptions,
	RandomTeamsTypes,
	SparseStatsTable,
	Species,
	StatID,
	StatsTable,
	toID,
} from '@pkmn/sim';

/* eslint-disable */
const randomSetsJSON = {"venusaur":{"level":83,"sets":[{"role":"Staller","movepool":["gigadrain","leechseed","sleeppowder","sludgebomb","substitute"]},{"role":"Bulky Attacker","movepool":["earthquake","energyball","knockoff","sleeppowder","sludgebomb","synthesis"]}]},"venusaurmega":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","gigadrain","knockoff","sleeppowder","sludgebomb","synthesis"]}]},"charizard":{"level":83,"sets":[{"role":"Z-Move user","movepool":["airslash","earthquake","fireblast","holdhands","roost"],"preferredTypes":["Normal"]},{"role":"Bulky Attacker","movepool":["airslash","earthquake","fireblast","roost","willowisp"]}]},"charizardmegax":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["dragonclaw","dragondance","earthquake","flareblitz","roost"]}]},"charizardmegay":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["airslash","fireblast","roost","solarbeam"]},{"role":"Bulky Attacker","movepool":["dragonpulse","fireblast","roost","solarbeam"]}]},"blastoise":{"level":86,"sets":[{"role":"Bulky Support","movepool":["icebeam","rapidspin","roar","scald","toxic"]},{"role":"Staller","movepool":["haze","icebeam","protect","rapidspin","scald","toxic"]}]},"blastoisemega":{"level":83,"sets":[{"role":"Bulky Support","movepool":["aurasphere","darkpulse","icebeam","rapidspin","scald"]}]},"butterfree":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["airslash","bugbuzz","energyball","quiverdance","sleeppowder"]},{"role":"Z-Move user","movepool":["airslash","bugbuzz","quiverdance","sleeppowder"],"preferredTypes":["Bug"]}]},"beedrill":{"level":92,"sets":[{"role":"Fast Support","movepool":["defog","knockoff","poisonjab","toxicspikes","uturn"]}]},"beedrillmega":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["drillrun","knockoff","poisonjab","swordsdance","xscissor"]},{"role":"Fast Attacker","movepool":["drillrun","knockoff","poisonjab","uturn"]}]},"pidgeot":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","defog","heatwave","return","roost","uturn"]}]},"pidgeotmega":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["defog","heatwave","hurricane","roost","uturn","workup"]}]},"raticate":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["crunch","facade","protect","stompingtantrum","suckerpunch","swordsdance","uturn"],"preferredTypes":["Dark"]}]},"raticatealola":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","knockoff","pursuit","return","suckerpunch","swordsdance"]}]},"fearow":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","drillpeck","drillrun","pursuit","return","uturn"],"preferredTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["drillpeck","drillrun","focusenergy","return"]}]},"arbok":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["aquatail","coil","earthquake","gunkshot","rest","suckerpunch"],"preferredTypes":["Ground"]}]},"pikachu":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["extremespeed","grassknot","hiddenpowerice","knockoff","surf","voltswitch","volttackle"]}]},"raichu":{"level":88,"sets":[{"role":"Fast Support","movepool":["encore","hiddenpowerice","knockoff","nastyplot","nuzzle","thunderbolt","voltswitch"],"preferredTypes":["Ice"]},{"role":"Fast Attacker","movepool":["focusblast","grassknot","nastyplot","surf","thunderbolt","voltswitch"]}]},"raichualola":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["focusblast","psyshock","surf","thunderbolt","voltswitch"],"preferredTypes":["Psychic"]},{"role":"Setup Sweeper","movepool":["focusblast","nastyplot","psyshock","surf","thunderbolt"],"preferredTypes":["Psychic"]},{"role":"Z-Move user","movepool":["focusblast","nastyplot","psyshock","surf","thunderbolt"],"preferredTypes":["Psychic"]}]},"sandslash":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","knockoff","rapidspin","stealthrock","stoneedge","swordsdance","toxic"]}]},"sandslashalola":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","iciclecrash","ironhead","knockoff","rapidspin","stealthrock","swordsdance"]}]},"nidoqueen":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["earthpower","fireblast","icebeam","sludgewave","stealthrock","toxicspikes"],"preferredTypes":["Ice"]}]},"nidoking":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["earthpower","fireblast","icebeam","sludgewave","substitute","superpower"],"preferredTypes":["Ice"]}]},"clefable":{"level":83,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","knockoff","moonblast","softboiled","stealthrock","thunderwave"]},{"role":"Bulky Setup","movepool":["calmmind","fireblast","moonblast","softboiled"]}]},"ninetales":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["fireblast","hiddenpowerrock","nastyplot","solarbeam"]},{"role":"Bulky Setup","movepool":["fireblast","nastyplot","solarbeam","substitute","willowisp"],"preferredTypes":["Grass"]}]},"ninetalesalola":{"level":80,"sets":[{"role":"Fast Support","movepool":["auroraveil","blizzard","freezedry","hiddenpowerground","moonblast","nastyplot"]}]},"wigglytuff":{"level":93,"sets":[{"role":"Bulky Support","movepool":["dazzlinggleam","fireblast","healbell","knockoff","protect","stealthrock","thunderwave","wish"]}]},"vileplume":{"level":87,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","gigadrain","hiddenpowerground","sleeppowder","sludgebomb","strengthsap"]}]},"parasect":{"level":97,"sets":[{"role":"Bulky Attacker","movepool":["aromatherapy","knockoff","leechlife","seedbomb","spore","stunspore","swordsdance"],"preferredTypes":["Bug"]}]},"venomoth":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["bugbuzz","quiverdance","sleeppowder","sludgebomb","substitute"]},{"role":"Z-Move user","movepool":["bugbuzz","quiverdance","roost","sleeppowder","sludgebomb"],"preferredTypes":["Bug"]}]},"dugtrio":{"level":83,"sets":[{"role":"Fast Support","movepool":["earthquake","memento","stealthrock","stoneedge","suckerpunch"]}]},"dugtrioalola":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["earthquake","ironhead","stealthrock","stoneedge","suckerpunch","toxic"]}]},"persian":{"level":92,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","fakeout","gunkshot","knockoff","return","seedbomb","taunt","uturn"],"preferredTypes":["Dark"]},{"role":"Setup Sweeper","movepool":["hiddenpowerfighting","hiddenpowerfire","hypervoice","nastyplot","shadowball","waterpulse"]}]},"persianalola":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["darkpulse","hiddenpowerfighting","hypnosis","nastyplot","powergem","thunderbolt"]},{"role":"Z-Move user","movepool":["darkpulse","hiddenpowerfighting","hypnosis","nastyplot","powergem","thunderbolt"],"preferredTypes":["Dark"]}]},"golduck":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["calmmind","encore","focusblast","hydropump","icebeam","psyshock","scald"],"preferredTypes":["Ice"]}]},"primeape":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","gunkshot","stoneedge","throatchop","uturn"]},{"role":"Setup Sweeper","movepool":["closecombat","earthquake","gunkshot","honeclaws","stoneedge","throatchop"],"preferredTypes":["Rock"]}]},"arcanine":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["closecombat","extremespeed","flareblitz","morningsun","roar","toxic","wildcharge","willowisp"]},{"role":"Fast Attacker","movepool":["closecombat","extremespeed","flareblitz","morningsun","wildcharge"],"preferredTypes":["Fighting"]}]},"poliwrath":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["focusblast","icepunch","raindance","waterfall"]},{"role":"Bulky Attacker","movepool":["circlethrow","rest","scald","sleeptalk"]}]},"alakazam":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["counter","focusblast","psychic","psyshock","shadowball"]},{"role":"Setup Sweeper","movepool":["calmmind","encore","focusblast","psychic","psyshock","shadowball","substitute"],"preferredTypes":["Fighting"]}]},"alakazammega":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","encore","focusblast","psychic","psyshock","shadowball","substitute"],"preferredTypes":["Fighting"]}]},"machamp":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["bulkup","bulletpunch","dynamicpunch","knockoff","stoneedge"],"preferredTypes":["Dark"]},{"role":"AV Pivot","movepool":["bulletpunch","dynamicpunch","knockoff","stoneedge"]},{"role":"Wallbreaker","movepool":["bulkup","bulletpunch","closecombat","facade","knockoff"],"preferredTypes":["Dark"]}]},"victreebel":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["poisonjab","powerwhip","suckerpunch","swordsdance"]},{"role":"Wallbreaker","movepool":["hiddenpowerground","knockoff","powerwhip","sleeppowder","sludgebomb","strengthsap","suckerpunch"]},{"role":"Fast Attacker","movepool":["powerwhip","sludgebomb","sunnyday","weatherball"]}]},"tentacruel":{"level":83,"sets":[{"role":"Bulky Support","movepool":["haze","knockoff","rapidspin","scald","sludgebomb","toxicspikes"]}]},"golem":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","stealthrock","stoneedge","suckerpunch","toxic"]},{"role":"Bulky Setup","movepool":["earthquake","explosion","rockpolish","stoneedge","suckerpunch"]}]},"golemalola":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","firepunch","stealthrock","stoneedge","wildcharge"]},{"role":"Wallbreaker","movepool":["autotomize","earthquake","explosion","return","stoneedge"],"preferredTypes":["Ground"]}]},"rapidash":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["flareblitz","highhorsepower","morningsun","wildcharge","willowisp"]},{"role":"Wallbreaker","movepool":["flareblitz","highhorsepower","megahorn","morningsun","wildcharge"]}]},"slowbro":{"level":84,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","psyshock","scald","slackoff","thunderwave","toxic"]},{"role":"AV Pivot","movepool":["fireblast","futuresight","icebeam","psyshock","scald"]}]},"slowbromega":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","fireblast","psyshock","scald","slackoff"]}]},"farfetchd":{"level":98,"sets":[{"role":"Setup Sweeper","movepool":["bravebird","knockoff","leafblade","return","swordsdance"]}]},"dodrio":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["bravebird","jumpkick","knockoff","quickattack","return","swordsdance"],"preferredTypes":["Fighting"]},{"role":"Z-Move user","movepool":["bravebird","jumpkick","knockoff","return","swordsdance"],"preferredTypes":["Flying"]}]},"dewgong":{"level":92,"sets":[{"role":"Staller","movepool":["icebeam","protect","surf","toxic"]},{"role":"Bulky Support","movepool":["encore","icebeam","surf","toxic"]}]},"muk":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["brickbreak","curse","gunkshot","haze","icepunch","poisonjab","shadowsneak"],"preferredTypes":["Fighting"]}]},"mukalola":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["curse","gunkshot","knockoff","recycle"]},{"role":"AV Pivot","movepool":["firepunch","gunkshot","icepunch","knockoff","poisonjab","pursuit","shadowsneak"]}]},"cloyster":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["hydropump","iciclespear","rockblast","shellsmash"]}]},"gengar":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["focusblast","painsplit","shadowball","sludgewave","substitute","trick","willowisp"]}]},"gengarmega":{"level":78,"sets":[{"role":"Fast Support","movepool":["disable","perishsong","protect","shadowball","substitute"]},{"role":"Fast Attacker","movepool":["destinybond","disable","focusblast","shadowball","sludgewave","taunt"]}]},"hypno":{"level":94,"sets":[{"role":"Bulky Support","movepool":["focusblast","foulplay","protect","psychic","thunderwave","toxic","wish"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"]}]},"kingler":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["agility","knockoff","liquidation","rockslide","superpower","swordsdance","xscissor"]}]},"electrode":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["foulplay","hiddenpowerice","signalbeam","taunt","thunderbolt","voltswitch"],"preferredTypes":["Ice"]},{"role":"Fast Support","movepool":["hiddenpowerice","lightscreen","reflect","thunderbolt","thunderwave","toxic","voltswitch"]}]},"exeggutor":{"level":90,"sets":[{"role":"Bulky Support","movepool":["gigadrain","hiddenpowerfire","leechseed","psychic","sleeppowder","substitute"],"preferredTypes":["Psychic"]}]},"exeggutoralola":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["dracometeor","flamethrower","gigadrain","leafstorm","trickroom"]},{"role":"Bulky Attacker","movepool":["dracometeor","flamethrower","gigadrain","leafstorm"]}]},"marowak":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","knockoff","stealthrock","stoneedge","swordsdance"],"preferredTypes":["Rock"]}]},"marowakalola":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["earthquake","flamecharge","flareblitz","shadowbone","stealthrock","stoneedge","swordsdance","willowisp"]}]},"hitmonlee":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["highjumpkick","knockoff","machpunch","poisonjab","rapidspin","stoneedge"],"preferredTypes":["Dark"]},{"role":"Setup Sweeper","movepool":["closecombat","curse","knockoff","poisonjab","stoneedge"],"preferredTypes":["Dark"]}]},"hitmonchan":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["bulkup","drainpunch","icepunch","machpunch","rapidspin","stoneedge","throatchop"]}]},"weezing":{"level":87,"sets":[{"role":"Bulky Support","movepool":["fireblast","painsplit","sludgebomb","toxicspikes","willowisp"]}]},"rhydon":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","megahorn","stealthrock","stoneedge","swordsdance","toxic"]}]},"chansey":{"level":86,"sets":[{"role":"Staller","movepool":["aromatherapy","seismictoss","softboiled","stealthrock","thunderwave","toxic"]},{"role":"Bulky Support","movepool":["seismictoss","softboiled","toxic","wish"]}]},"kangaskhan":{"level":88,"sets":[{"role":"Bulky Support","movepool":["doubleedge","drainpunch","earthquake","fakeout","return","suckerpunch"]},{"role":"AV Pivot","movepool":["drainpunch","earthquake","fakeout","return","suckerpunch"]}]},"kangaskhanmega":{"level":76,"sets":[{"role":"Fast Support","movepool":["bodyslam","crunch","fakeout","seismictoss","suckerpunch"]},{"role":"Setup Sweeper","movepool":["bodyslam","crunch","earthquake","poweruppunch","return","suckerpunch"],"preferredTypes":["Ground"]}]},"seaking":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["drillrun","icebeam","knockoff","megahorn","raindance","waterfall"],"preferredTypes":["Dark"]}]},"starmie":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["hydropump","icebeam","psyshock","recover","thunderbolt"]},{"role":"Bulky Support","movepool":["psyshock","rapidspin","recover","scald","thunderwave","toxic"]}]},"mrmime":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["dazzlinggleam","encore","focusblast","healingwish","nastyplot","psychic","psyshock","shadowball"],"preferredTypes":["Psychic"]}]},"scyther":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["aerialace","brickbreak","knockoff","pursuit","uturn"]},{"role":"Setup Sweeper","movepool":["aerialace","brickbreak","bugbite","knockoff","roost","swordsdance"]}]},"jynx":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["focusblast","icebeam","lovelykiss","psychic","psyshock","trick"]},{"role":"Setup Sweeper","movepool":["focusblast","icebeam","lovelykiss","nastyplot","psyshock"]}]},"pinsir":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","knockoff","stealthrock","stoneedge","swordsdance","xscissor"],"preferredTypes":["Ground"]}]},"pinsirmega":{"level":74,"sets":[{"role":"Bulky Setup","movepool":["closecombat","earthquake","quickattack","return","swordsdance"]}]},"tauros":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["bodyslam","earthquake","fireblast","rockslide","zenheadbutt"],"preferredTypes":["Ground"]},{"role":"Fast Attacker","movepool":["doubleedge","earthquake","stoneedge","zenheadbutt"]}]},"gyarados":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","stoneedge","substitute","waterfall"]},{"role":"Z-Move user","movepool":["bounce","dragondance","earthquake","waterfall"],"preferredTypes":["Flying"]}]},"gyaradosmega":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["crunch","dragondance","earthquake","substitute","waterfall"]}]},"lapras":{"level":87,"sets":[{"role":"Bulky Support","movepool":["freezedry","healbell","hydropump","icebeam","toxic"]},{"role":"Staller","movepool":["freezedry","hydropump","protect","toxic"]}]},"ditto":{"level":83,"sets":[{"role":"Fast Support","movepool":["transform"]}]},"vaporeon":{"level":86,"sets":[{"role":"Bulky Support","movepool":["healbell","icebeam","protect","scald","wish"]},{"role":"Staller","movepool":["protect","scald","toxic","wish"]}]},"jolteon":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","shadowball","thunderbolt","voltswitch"]},{"role":"Wallbreaker","movepool":["hiddenpowerice","signalbeam","thunderbolt","voltswitch"]}]},"flareon":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["facade","flamecharge","flareblitz","quickattack","superpower"]}]},"omastar":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","shellsmash"]}]},"kabutops":{"level":87,"sets":[{"role":"Fast Support","movepool":["aquajet","knockoff","liquidation","rapidspin","stoneedge","swordsdance"]},{"role":"Z-Move user","movepool":["aquajet","knockoff","liquidation","stoneedge","swordsdance"],"preferredTypes":["Rock"]}]},"aerodactyl":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthquake","roost","stealthrock","stoneedge","taunt","toxic"]},{"role":"Fast Support","movepool":["defog","doubleedge","earthquake","pursuit","roost","stealthrock","stoneedge"],"preferredTypes":["Ground"]}]},"aerodactylmega":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["aerialace","aquatail","earthquake","honeclaws","roost","stoneedge"],"preferredTypes":["Ground"]}]},"snorlax":{"level":84,"sets":[{"role":"Bulky Support","movepool":["bodyslam","crunch","curse","earthquake","rest","return","sleeptalk"]},{"role":"AV Pivot","movepool":["bodyslam","crunch","earthquake","pursuit","return"]},{"role":"Bulky Setup","movepool":["bodyslam","crunch","curse","earthquake","recycle","return"]}]},"articuno":{"level":87,"sets":[{"role":"Staller","movepool":["freezedry","roost","substitute","toxic"]},{"role":"Bulky Support","movepool":["freezedry","hurricane","roost","substitute","toxic"]}]},"zapdos":{"level":79,"sets":[{"role":"Bulky Support","movepool":["defog","discharge","heatwave","hiddenpowerice","roost","toxic","uturn"]}]},"moltres":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["defog","fireblast","hurricane","roost","toxic","uturn","willowisp"]}]},"dragonite":{"level":73,"sets":[{"role":"Z-Move user","movepool":["dragondance","earthquake","fly","outrage"],"preferredTypes":["Flying"]},{"role":"Setup Sweeper","movepool":["dragondance","earthquake","ironhead","outrage","roost"],"preferredTypes":["Ground"]}]},"mewtwo":{"level":72,"sets":[{"role":"Fast Attacker","movepool":["aurasphere","calmmind","fireblast","psystrike","recover","shadowball"]}]},"mewtwomegax":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["bulkup","drainpunch","stoneedge","taunt","zenheadbutt"]}]},"mewtwomegay":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["aurasphere","calmmind","fireblast","psystrike","recover","shadowball"]}]},"mew":{"level":81,"sets":[{"role":"Staller","movepool":["defog","knockoff","psychic","roost","stealthrock","taunt","uturn","willowisp"]},{"role":"Z-Move user","movepool":["aurasphere","earthpower","fireblast","nastyplot","psychic","roost"]}]},"meganium":{"level":91,"sets":[{"role":"Staller","movepool":["aromatherapy","dragontail","earthquake","gigadrain","leechseed","synthesis","toxic"]}]},"typhlosion":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["eruption","fireblast","focusblast","hiddenpowergrass","hiddenpowerrock"]}]},"feraligatr":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["crunch","dragondance","earthquake","icepunch","liquidation"],"preferredTypes":["Ice"]},{"role":"Bulky Setup","movepool":["aquajet","crunch","icepunch","liquidation","swordsdance"]}]},"furret":{"level":94,"sets":[{"role":"Wallbreaker","movepool":["aquatail","doubleedge","firepunch","knockoff","trick","uturn"],"preferredTypes":["Dark"]},{"role":"Bulky Setup","movepool":["coil","irontail","knockoff","return"]}]},"noctowl":{"level":93,"sets":[{"role":"Bulky Support","movepool":["defog","hurricane","hypervoice","roost","toxic","whirlwind"]}]},"ledian":{"level":100,"sets":[{"role":"Staller","movepool":["airslash","defog","encore","focusblast","knockoff","roost","toxic"]}]},"ariados":{"level":89,"sets":[{"role":"Bulky Support","movepool":["megahorn","poisonjab","stickyweb","suckerpunch","toxicspikes"]}]},"crobat":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","defog","roost","superfang","taunt","toxic","uturn"]}]},"lanturn":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["healbell","icebeam","scald","thunderbolt","toxic","voltswitch"]}]},"xatu":{"level":89,"sets":[{"role":"Bulky Setup","movepool":["calmmind","heatwave","psychic","roost"]},{"role":"Bulky Support","movepool":["heatwave","psychic","roost","thunderwave","toxic","uturn"]}]},"ampharos":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["focusblast","healbell","hiddenpowerice","thunderbolt","toxic","voltswitch"]}]},"ampharosmega":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["agility","dragonpulse","focusblast","healbell","thunderbolt","voltswitch"]}]},"bellossom":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["gigadrain","moonblast","quiverdance","strengthsap"]},{"role":"Bulky Support","movepool":["gigadrain","hiddenpowerfire","hiddenpowerrock","quiverdance","strengthsap"]},{"role":"Z-Move user","movepool":["gigadrain","quiverdance","sleeppowder","strengthsap"],"preferredTypes":["Grass"]}]},"azumarill":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["aquajet","bellydrum","knockoff","liquidation","playrough","superpower"]}]},"sudowoodo":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headsmash","stealthrock","suckerpunch","toxic","woodhammer"],"preferredTypes":["Grass"]}]},"politoed":{"level":86,"sets":[{"role":"Staller","movepool":["encore","icebeam","protect","scald","toxic"]},{"role":"Bulky Support","movepool":["encore","icebeam","rest","scald","toxic"]}]},"jumpluff":{"level":89,"sets":[{"role":"Staller","movepool":["acrobatics","leechseed","strengthsap","substitute"]},{"role":"Bulky Attacker","movepool":["acrobatics","encore","sleeppowder","strengthsap","toxic","uturn"]}]},"sunflora":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["earthpower","hiddenpowerfire","hiddenpowerice","hiddenpowerrock","leafstorm","sludgebomb"]},{"role":"Setup Sweeper","movepool":["earthpower","hiddenpowerfire","solarbeam","sunnyday"]}]},"quagsire":{"level":87,"sets":[{"role":"Bulky Support","movepool":["earthquake","icebeam","recover","scald","toxic"]}]},"espeon":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["calmmind","dazzlinggleam","morningsun","psychic","psyshock","shadowball","trick"]}]},"umbreon":{"level":84,"sets":[{"role":"Staller","movepool":["foulplay","protect","toxic","wish"]},{"role":"Bulky Support","movepool":["foulplay","healbell","moonlight","toxic"]}]},"slowking":{"level":88,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","nastyplot","psyshock","scald","slackoff","thunderwave","toxic"]},{"role":"AV Pivot","movepool":["dragontail","fireblast","futuresight","icebeam","psyshock","scald"]}]},"unown":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerpsychic"]}]},"wobbuffet":{"level":87,"sets":[{"role":"Bulky Support","movepool":["counter","destinybond","encore","mirrorcoat"]}]},"girafarig":{"level":94,"sets":[{"role":"Setup Sweeper","movepool":["dazzlinggleam","hypervoice","nastyplot","psychic","psyshock","substitute","thunderbolt"],"preferredTypes":["Psychic"]}]},"forretress":{"level":84,"sets":[{"role":"Bulky Support","movepool":["gyroball","rapidspin","spikes","stealthrock","toxic","voltswitch"]}]},"dunsparce":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","glare","headbutt","roost"]},{"role":"Bulky Setup","movepool":["bodyslam","coil","earthquake","roost"]}]},"gligar":{"level":83,"sets":[{"role":"Staller","movepool":["defog","earthquake","knockoff","roost","stealthrock","toxic","uturn"]}]},"steelix":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["earthquake","ironhead","roar","rockslide","stealthrock","toxic"],"preferredTypes":["Steel"]},{"role":"Staller","movepool":["earthquake","heavyslam","protect","toxic"]},{"role":"Bulky Support","movepool":["earthquake","heavyslam","roar","stealthrock","toxic"]}]},"steelixmega":{"level":82,"sets":[{"role":"Bulky Support","movepool":["dragontail","earthquake","heavyslam","stealthrock","toxic"]}]},"granbull":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","healbell","playrough","thunderwave","toxic"]}]},"qwilfish":{"level":88,"sets":[{"role":"Fast Support","movepool":["destinybond","spikes","taunt","thunderwave","toxicspikes","waterfall"]}]},"scizor":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["bugbite","bulletpunch","knockoff","roost","superpower","swordsdance"]},{"role":"Bulky Support","movepool":["bulletpunch","defog","knockoff","roost","superpower","uturn"]},{"role":"Fast Attacker","movepool":["bulletpunch","knockoff","pursuit","superpower","uturn"]}]},"scizormega":{"level":77,"sets":[{"role":"Bulky Setup","movepool":["bugbite","bulletpunch","knockoff","roost","superpower","swordsdance"]},{"role":"Bulky Support","movepool":["bulletpunch","defog","knockoff","roost","superpower","uturn"]}]},"shuckle":{"level":86,"sets":[{"role":"Bulky Support","movepool":["encore","knockoff","stealthrock","stickyweb","toxic"]}]},"heracross":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["closecombat","facade","knockoff","swordsdance"]},{"role":"Fast Attacker","movepool":["closecombat","knockoff","megahorn","stoneedge"]}]},"heracrossmega":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["closecombat","pinmissile","rockblast","substitute","swordsdance"],"preferredTypes":["Rock"]}]},"ursaring":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["closecombat","crunch","facade","protect","swordsdance"]}]},"magcargo":{"level":94,"sets":[{"role":"Staller","movepool":["ancientpower","lavaplume","recover","stealthrock","toxic"]},{"role":"Z-Move user","movepool":["ancientpower","earthpower","fireblast","shellsmash"],"preferredTypes":["Fire","Rock"]}]},"corsola":{"level":93,"sets":[{"role":"Bulky Support","movepool":["powergem","recover","scald","stealthrock","toxic"]}]},"octillery":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["energyball","fireblast","gunkshot","hydropump","icebeam","scald"]}]},"delibird":{"level":100,"sets":[{"role":"Fast Support","movepool":["destinybond","freezedry","rapidspin","spikes"]}]},"mantine":{"level":87,"sets":[{"role":"Bulky Support","movepool":["airslash","defog","haze","roost","scald","toxic"]}]},"skarmory":{"level":79,"sets":[{"role":"Bulky Support","movepool":["bravebird","roost","spikes","stealthrock","whirlwind"]},{"role":"Staller","movepool":["bravebird","roost","spikes","stealthrock","toxic"]}]},"houndoom":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","fireblast","hiddenpowergrass","nastyplot","suckerpunch"]}]},"houndoommega":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["darkpulse","fireblast","hiddenpowergrass","nastyplot","taunt"]}]},"kingdra":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["dracometeor","hydropump","icebeam","raindance","waterfall"]}]},"donphan":{"level":85,"sets":[{"role":"Bulky Support","movepool":["earthquake","knockoff","rapidspin","stealthrock","stoneedge","toxic"]},{"role":"Bulky Attacker","movepool":["earthquake","gunkshot","iceshard","knockoff","rapidspin","stoneedge"],"preferredTypes":["Dark"]}]},"porygon2":{"level":84,"sets":[{"role":"Bulky Support","movepool":["discharge","icebeam","recover","toxic","triattack"]}]},"stantler":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","jumpkick","megahorn","suckerpunch","throatchop","thunderwave"],"preferredTypes":["Ground"]}]},"smeargle":{"level":88,"sets":[{"role":"Fast Support","movepool":["destinybond","nuzzle","spore","stealthrock","stickyweb","whirlwind"]}]},"hitmontop":{"level":89,"sets":[{"role":"Bulky Support","movepool":["closecombat","earthquake","rapidspin","stoneedge","suckerpunch","toxic"]}]},"miltank":{"level":86,"sets":[{"role":"Bulky Support","movepool":["bodyslam","earthquake","healbell","milkdrink","stealthrock","toxic"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","earthquake","milkdrink"]}]},"blissey":{"level":84,"sets":[{"role":"Staller","movepool":["aromatherapy","seismictoss","softboiled","stealthrock","thunderwave","toxic"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"]}]},"raikou":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["aurasphere","hiddenpowerice","thunderbolt","voltswitch"]},{"role":"Bulky Setup","movepool":["aurasphere","calmmind","hiddenpowerice","substitute","thunderbolt"],"preferredTypes":["Ice"]}]},"entei":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","flareblitz","sacredfire","stompingtantrum"]},{"role":"Fast Attacker","movepool":["extremespeed","flareblitz","sacredfire","stoneedge"]}]},"suicune":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","rest","scald","sleeptalk"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","rest","scald","substitute"]},{"role":"Staller","movepool":["calmmind","protect","scald","substitute"]}]},"tyranitar":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["crunch","earthquake","fireblast","icebeam","pursuit","stealthrock","stoneedge"]},{"role":"Bulky Setup","movepool":["crunch","dragondance","earthquake","firepunch","icepunch","stoneedge"]}]},"tyranitarmega":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["crunch","dragondance","earthquake","firepunch","icepunch","stoneedge"]}]},"lugia":{"level":72,"sets":[{"role":"Staller","movepool":["aeroblast","earthquake","roost","substitute","toxic","whirlwind"]}]},"hooh":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","defog","earthquake","roost","sacredfire","substitute","toxic"]}]},"celebi":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["earthpower","gigadrain","hiddenpowerfire","leafstorm","nastyplot","psychic","uturn"],"preferredTypes":["Psychic"]},{"role":"Bulky Support","movepool":["leafstorm","psychic","recover","stealthrock","thunderwave","uturn"]},{"role":"Z-Move user","movepool":["leafstorm","nastyplot","psychic","recover"],"preferredTypes":["Grass"]}]},"sceptile":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["earthquake","focusblast","gigadrain","hiddenpowerfire","hiddenpowerice","leafstorm","rockslide"]},{"role":"Staller","movepool":["gigadrain","hiddenpowerfire","hiddenpowerice","leechseed","substitute"]}]},"sceptilemega":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["dragonpulse","earthquake","focusblast","gigadrain","hiddenpowerfire","leafstorm","substitute"]},{"role":"Setup Sweeper","movepool":["earthquake","leafblade","outrage","swordsdance"]}]},"blaziken":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["fireblast","highjumpkick","knockoff","protect","stoneedge"]},{"role":"Setup Sweeper","movepool":["flareblitz","highjumpkick","knockoff","stoneedge","swordsdance"]}]},"blazikenmega":{"level":74,"sets":[{"role":"Wallbreaker","movepool":["flareblitz","highjumpkick","knockoff","protect","stoneedge","swordsdance"]}]},"swampert":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icebeam","roar","scald","stealthrock","toxic"]},{"role":"Staller","movepool":["earthquake","protect","scald","toxic"]}]},"swampertmega":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","icepunch","raindance","superpower","waterfall"]}]},"mightyena":{"level":94,"sets":[{"role":"Wallbreaker","movepool":["crunch","irontail","playrough","suckerpunch","toxic"],"preferredTypes":["Fairy"]}]},"linoone":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["bellydrum","extremespeed","stompingtantrum","throatchop"]}]},"beautifly":{"level":99,"sets":[{"role":"Setup Sweeper","movepool":["aircutter","bugbuzz","hiddenpowerground","quiverdance"]}]},"dustox":{"level":94,"sets":[{"role":"Bulky Setup","movepool":["bugbuzz","hiddenpowerground","quiverdance","roost","sludgebomb"]},{"role":"Bulky Support","movepool":["bugbuzz","defog","roost","sludgebomb","toxic","uturn"]}]},"ludicolo":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["gigadrain","hydropump","icebeam","raindance"]},{"role":"Wallbreaker","movepool":["energyball","hydropump","icebeam","scald"]}]},"shiftry":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["defog","knockoff","leafstorm","lowkick","suckerpunch"]},{"role":"Setup Sweeper","movepool":["knockoff","leafblade","lowkick","suckerpunch","swordsdance"]}]},"swellow":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["bravebird","facade","protect","quickattack","uturn"]},{"role":"Wallbreaker","movepool":["boomburst","heatwave","hurricane","uturn"]}]},"pelipper":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["defog","hurricane","knockoff","roost","scald","uturn"]},{"role":"Wallbreaker","movepool":["hurricane","hydropump","scald","uturn"]}]},"gardevoir":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["calmmind","focusblast","healingwish","moonblast","psychic","shadowball","thunderbolt","trick"]},{"role":"Setup Sweeper","movepool":["calmmind","focusblast","moonblast","psyshock","substitute","willowisp"]}]},"gardevoirmega":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","focusblast","hypervoice","psyshock","substitute","taunt","willowisp"]}]},"masquerain":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["airslash","bugbuzz","hydropump","quiverdance"]},{"role":"Fast Support","movepool":["airslash","bugbuzz","hydropump","icebeam","roost","stickyweb","stunspore","uturn"]}]},"breloom":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["bulletseed","machpunch","rocktomb","spore","swordsdance"]},{"role":"Setup Sweeper","movepool":["bulletseed","machpunch","rocktomb","swordsdance"]}]},"vigoroth":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["bodyslam","bulkup","earthquake","return","shadowclaw","slackoff"]}]},"slaking":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["earthquake","gigaimpact","nightslash","retaliate"]}]},"ninjask":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["aerialace","leechlife","nightslash","swordsdance","uturn"]},{"role":"Z-Move user","movepool":["aerialace","dig","leechlife","swordsdance"],"preferredTypes":["Ground"]}]},"shedinja":{"level":92,"sets":[{"role":"Setup Sweeper","movepool":["shadowclaw","shadowsneak","swordsdance","willowisp","xscissor"]}]},"exploud":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["boomburst","fireblast","focusblast","icebeam","surf"]}]},"hariyama":{"level":87,"sets":[{"role":"AV Pivot","movepool":["bulletpunch","closecombat","heavyslam","knockoff","stoneedge"],"preferredTypes":["Dark"]},{"role":"Wallbreaker","movepool":["bulkup","bulletpunch","closecombat","facade","knockoff"],"preferredTypes":["Dark"]}]},"delcatty":{"level":97,"sets":[{"role":"Fast Support","movepool":["doubleedge","fakeout","healbell","shadowball","stompingtantrum","thunderwave","toxic"]}]},"sableye":{"level":91,"sets":[{"role":"Bulky Support","movepool":["foulplay","knockoff","recover","taunt","toxic","willowisp"]}]},"sableyemega":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["calmmind","darkpulse","recover","willowisp"]}]},"mawile":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["ironhead","knockoff","playrough","stealthrock","suckerpunch","swordsdance"]}]},"mawilemega":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["ironhead","knockoff","playrough","suckerpunch","swordsdance"]}]},"aggron":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["aquatail","earthquake","headsmash","heavyslam","rockpolish","stealthrock"],"preferredTypes":["Ground"]}]},"aggronmega":{"level":81,"sets":[{"role":"Bulky Support","movepool":["earthquake","heavyslam","roar","stealthrock","stoneedge","thunderwave","toxic"]}]},"medicham":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["bulletpunch","highjumpkick","icepunch","poisonjab","zenheadbutt"]}]},"medichammega":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["fakeout","highjumpkick","icepunch","thunderpunch","zenheadbutt"]}]},"manectric":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["flamethrower","hiddenpowerice","overheat","thunderbolt","voltswitch"]}]},"manectricmega":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","overheat","thunderbolt","voltswitch"]}]},"plusle":{"level":94,"sets":[{"role":"Bulky Setup","movepool":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"preferredTypes":["Ice"]}]},"minun":{"level":94,"sets":[{"role":"Bulky Setup","movepool":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"preferredTypes":["Ice"]}]},"volbeat":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["defog","encore","roost","thunderwave","uturn"]},{"role":"Staller","movepool":["defog","encore","lunge","roost","thunderwave"]}]},"illumise":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["bugbuzz","defog","encore","roost","thunderwave"]}]},"swalot":{"level":90,"sets":[{"role":"Bulky Support","movepool":["earthquake","encore","icebeam","painsplit","sludgebomb","toxic","yawn"]},{"role":"Staller","movepool":["earthquake","protect","sludgebomb","toxic"]}]},"sharpedo":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["crunch","destinybond","earthquake","icebeam","protect","waterfall"]}]},"sharpedomega":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["crunch","icefang","protect","psychicfangs","waterfall"]}]},"wailord":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowergrass","hydropump","icebeam","waterspout"]}]},"camerupt":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","fireblast","rockpolish","stoneedge"]},{"role":"Bulky Support","movepool":["earthquake","lavaplume","roar","stealthrock","toxic"]}]},"cameruptmega":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["ancientpower","earthpower","fireblast","stealthrock","toxic","willowisp"]}]},"torkoal":{"level":84,"sets":[{"role":"Bulky Support","movepool":["earthquake","lavaplume","rapidspin","solarbeam","stealthrock","yawn"]}]},"grumpig":{"level":92,"sets":[{"role":"Bulky Support","movepool":["focusblast","healbell","psychic","thunderwave","toxic","whirlwind"]}]},"spinda":{"level":99,"sets":[{"role":"Staller","movepool":["feintattack","rest","return","sleeptalk","suckerpunch","superpower"],"preferredTypes":["Fighting"]}]},"flygon":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["dragondance","earthquake","outrage","stoneedge","uturn"]},{"role":"Bulky Attacker","movepool":["defog","dragondance","earthquake","outrage","roost"]},{"role":"Z-Move user","movepool":["dragondance","earthquake","outrage","roost","stoneedge"],"preferredTypes":["Dragon"]}]},"cacturne":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","focusblast","gigadrain","spikes","suckerpunch"]},{"role":"Setup Sweeper","movepool":["drainpunch","seedbomb","suckerpunch","swordsdance"]}]},"altaria":{"level":88,"sets":[{"role":"Bulky Support","movepool":["defog","dracometeor","earthquake","fireblast","healbell","roost","toxic"]}]},"altariamega":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","return","roost"]},{"role":"Bulky Support","movepool":["defog","earthquake","fireblast","healbell","return","roost"]}]},"zangoose":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["closecombat","facade","knockoff","quickattack","swordsdance"],"preferredTypes":["Dark"]}]},"seviper":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["earthquake","flamethrower","gigadrain","glare","knockoff","sludgewave","suckerpunch","switcheroo"],"preferredTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["earthquake","poisonjab","suckerpunch","swordsdance"]}]},"lunatone":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["earthpower","icebeam","moonblast","moonlight","powergem","psychic","rockpolish"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["earthpower","moonlight","powergem","psychic","stealthrock","toxic"]}]},"solrock":{"level":90,"sets":[{"role":"Bulky Support","movepool":["earthquake","morningsun","stealthrock","stoneedge","willowisp"]}]},"whiscash":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","stoneedge","waterfall"]}]},"crawdaunt":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["aquajet","crabhammer","dragondance","knockoff","superpower"]},{"role":"Setup Sweeper","movepool":["aquajet","crabhammer","dragondance","knockoff","swordsdance"]}]},"claydol":{"level":89,"sets":[{"role":"Bulky Support","movepool":["earthquake","icebeam","psychic","rapidspin","stealthrock","toxic"]}]},"cradily":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["curse","recover","seedbomb","stoneedge","swordsdance"]},{"role":"Bulky Attacker","movepool":["gigadrain","recover","stealthrock","stoneedge","toxic"]}]},"armaldo":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","knockoff","rapidspin","stealthrock","stoneedge","toxic","xscissor"]},{"role":"Bulky Attacker","movepool":["aquajet","earthquake","knockoff","liquidation","stoneedge","swordsdance","xscissor"]}]},"milotic":{"level":84,"sets":[{"role":"Staller","movepool":["dragontail","haze","icebeam","recover","scald","toxic"]}]},"castform":{"level":99,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","icebeam","return","scald","thunderbolt","thunderwave"]}]},"kecleon":{"level":90,"sets":[{"role":"Fast Support","movepool":["drainpunch","fakeout","knockoff","recover","shadowsneak","stealthrock","suckerpunch"],"preferredTypes":["Fighting"]},{"role":"Bulky Attacker","movepool":["drainpunch","knockoff","recover","stealthrock","thunderwave","toxic"]}]},"banette":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["gunkshot","knockoff","shadowclaw","shadowsneak","taunt","thunderwave","willowisp"]}]},"banettemega":{"level":87,"sets":[{"role":"Fast Support","movepool":["destinybond","gunkshot","knockoff","shadowclaw","shadowsneak","taunt","willowisp"]}]},"tropius":{"level":92,"sets":[{"role":"Staller","movepool":["airslash","leechseed","protect","substitute"]}]},"chimecho":{"level":94,"sets":[{"role":"Staller","movepool":["defog","healbell","knockoff","psychic","recover","taunt","toxic"]},{"role":"Bulky Setup","movepool":["calmmind","psychic","recover","signalbeam"]}]},"absol":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["knockoff","playrough","pursuit","suckerpunch","superpower","swordsdance"],"preferredTypes":["Fairy"]}]},"absolmega":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["fireblast","knockoff","playrough","pursuit","suckerpunch","superpower"],"preferredTypes":["Fairy"]},{"role":"Setup Sweeper","movepool":["knockoff","playrough","suckerpunch","superpower","swordsdance"],"preferredTypes":["Fairy"]}]},"glalie":{"level":90,"sets":[{"role":"Fast Support","movepool":["earthquake","freezedry","spikes","superfang","taunt"]}]},"glaliemega":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["earthquake","explosion","freezedry","iceshard","return","spikes"],"preferredTypes":["Ground"]}]},"walrein":{"level":88,"sets":[{"role":"Bulky Support","movepool":["icebeam","roar","superfang","surf","toxic"]},{"role":"Staller","movepool":["icebeam","protect","surf","toxic"]}]},"huntail":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["icebeam","return","shellsmash","suckerpunch","waterfall"],"preferredTypes":["Ice"]}]},"gorebyss":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","shellsmash"]}]},"relicanth":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headsmash","stealthrock","toxic","waterfall"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","headsmash","rockpolish","waterfall"],"preferredTypes":["Ground"]}]},"luvdisc":{"level":100,"sets":[{"role":"Staller","movepool":["icebeam","protect","scald","substitute","toxic"]}]},"salamence":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","outrage","roost"]},{"role":"Z-Move user","movepool":["dragondance","earthquake","fly","outrage"],"preferredTypes":["Flying"]}]},"salamencemega":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","dragondance","earthquake","return","roost"]},{"role":"Bulky Attacker","movepool":["doubleedge","dracometeor","earthquake","fireblast","return","roost"]}]},"metagross":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["agility","earthquake","icepunch","meteormash","thunderpunch","zenheadbutt"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["bulletpunch","earthquake","explosion","icepunch","meteormash","stealthrock","thunderpunch","zenheadbutt"],"preferredTypes":["Ground"]}]},"metagrossmega":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["agility","earthquake","hammerarm","icepunch","meteormash","zenheadbutt"]}]},"regirock":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["curse","drainpunch","rest","stoneedge"]},{"role":"Bulky Support","movepool":["drainpunch","earthquake","stealthrock","stoneedge","thunderwave","toxic"]}]},"regice":{"level":87,"sets":[{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","thunderwave","toxic"]},{"role":"Bulky Attacker","movepool":["icebeam","rest","sleeptalk","thunderbolt"]},{"role":"Bulky Setup","movepool":["focusblast","icebeam","rockpolish","thunderbolt"]}]},"registeel":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["curse","ironhead","rest","sleeptalk"]},{"role":"Bulky Support","movepool":["rest","seismictoss","sleeptalk","toxic"]},{"role":"Staller","movepool":["protect","seismictoss","stealthrock","toxic"]}]},"latias":{"level":81,"sets":[{"role":"Fast Support","movepool":["calmmind","defog","dracometeor","healingwish","hiddenpowerfire","psyshock","roost","trick"]},{"role":"Z-Move user","movepool":["calmmind","dracometeor","psyshock","roost"],"preferredTypes":["Dragon"]}]},"latiasmega":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psyshock","roost"]}]},"latios":{"level":79,"sets":[{"role":"Fast Support","movepool":["calmmind","dracometeor","hiddenpowerfire","psyshock","roost","surf","thunderbolt","trick"]},{"role":"Z-Move user","movepool":["calmmind","dracometeor","psyshock","roost"],"preferredTypes":["Dragon"]}]},"latiosmega":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psyshock","roost"]}]},"kyogre":{"level":70,"sets":[{"role":"Fast Attacker","movepool":["icebeam","originpulse","scald","thunder","waterspout"]}]},"kyogreprimal":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["calmmind","rest","scald","sleeptalk"]},{"role":"Setup Sweeper","movepool":["calmmind","icebeam","originpulse","thunder"]}]},"groudon":{"level":75,"sets":[{"role":"Bulky Support","movepool":["dragontail","lavaplume","precipiceblades","stealthrock","stoneedge","thunderwave"]},{"role":"Bulky Setup","movepool":["firepunch","precipiceblades","rockpolish","stoneedge","swordsdance"]}]},"groudonprimal":{"level":66,"sets":[{"role":"Bulky Support","movepool":["dragontail","lavaplume","precipiceblades","stealthrock","thunderwave"]},{"role":"Bulky Setup","movepool":["firepunch","precipiceblades","rockpolish","swordsdance"]}]},"rayquaza":{"level":72,"sets":[{"role":"Z-Move user","movepool":["dragonascent","dragondance","earthquake","extremespeed","vcreate"],"preferredTypes":["Flying"]},{"role":"Setup Sweeper","movepool":["dragondance","earthquake","extremespeed","outrage","vcreate"]},{"role":"Bulky Setup","movepool":["earthquake","extremespeed","outrage","swordsdance","vcreate"],"preferredTypes":["Normal"]}]},"rayquazamega":{"level":67,"sets":[{"role":"Fast Attacker","movepool":["dragonascent","dragondance","earthquake","extremespeed","vcreate"]}]},"jirachi":{"level":77,"sets":[{"role":"Bulky Support","movepool":["bodyslam","firepunch","healingwish","ironhead","protect","stealthrock","toxic","uturn","wish"]},{"role":"Z-Move user","movepool":["drainpunch","happyhour","ironhead","psychic"],"preferredTypes":["Normal"]}]},"deoxys":{"level":76,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","firepunch","icebeam","knockoff","psychoboost","stealthrock","superpower"],"preferredTypes":["Fighting"]}]},"deoxysattack":{"level":75,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","firepunch","icebeam","knockoff","psychoboost","superpower"],"preferredTypes":["Fighting"]}]},"deoxysdefense":{"level":85,"sets":[{"role":"Bulky Support","movepool":["knockoff","recover","seismictoss","spikes","stealthrock","taunt","toxic"]}]},"deoxysspeed":{"level":82,"sets":[{"role":"Fast Support","movepool":["knockoff","psychoboost","spikes","stealthrock","superpower","taunt"]}]},"torterra":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","stealthrock","stoneedge","synthesis","woodhammer"]},{"role":"Bulky Attacker","movepool":["earthquake","rockpolish","stoneedge","woodhammer"]}]},"infernape":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["closecombat","grassknot","machpunch","overheat","stealthrock"]},{"role":"Z-Move user","movepool":["fireblast","focusblast","grassknot","nastyplot","vacuumwave"],"preferredTypes":["Fighting"]},{"role":"Fast Support","movepool":["closecombat","flareblitz","machpunch","stoneedge","swordsdance","uturn"]}]},"empoleon":{"level":83,"sets":[{"role":"Staller","movepool":["defog","knockoff","protect","scald","stealthrock","toxic"]},{"role":"Bulky Support","movepool":["defog","icebeam","knockoff","roar","scald","toxic"]},{"role":"Bulky Attacker","movepool":["flashcannon","grassknot","hydropump","icebeam","knockoff","scald"]}]},"staraptor":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["bravebird","closecombat","doubleedge","quickattack","uturn"],"preferredTypes":["Fighting"]}]},"bibarel":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["aquajet","liquidation","quickattack","return","swordsdance"]}]},"kricketune":{"level":94,"sets":[{"role":"Fast Support","movepool":["knockoff","leechlife","stickyweb","taunt","toxic"]}]},"luxray":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["crunch","facade","superpower","wildcharge"]},{"role":"AV Pivot","movepool":["crunch","icefang","superpower","voltswitch","wildcharge"],"preferredTypes":["Fighting"]}]},"roserade":{"level":84,"sets":[{"role":"Fast Support","movepool":["gigadrain","hiddenpowerground","leafstorm","sleeppowder","sludgebomb","spikes","synthesis","toxicspikes"]}]},"rampardos":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","firepunch","rockpolish","rockslide","zenheadbutt"]},{"role":"Fast Attacker","movepool":["earthquake","firepunch","headsmash","rockslide"]}]},"bastiodon":{"level":90,"sets":[{"role":"Bulky Support","movepool":["metalburst","roar","rockblast","stealthrock","toxic"]},{"role":"Staller","movepool":["metalburst","protect","roar","rockblast","stealthrock","toxic"]}]},"wormadam":{"level":99,"sets":[{"role":"Setup Sweeper","movepool":["bugbuzz","gigadrain","hiddenpowerground","hiddenpowerrock","leafstorm","quiverdance"]}]},"wormadamsandy":{"level":89,"sets":[{"role":"Staller","movepool":["earthquake","protect","stealthrock","toxic"]}]},"wormadamtrash":{"level":86,"sets":[{"role":"Staller","movepool":["flashcannon","protect","stealthrock","toxic"]}]},"mothim":{"level":95,"sets":[{"role":"Setup Sweeper","movepool":["airslash","bugbuzz","energyball","quiverdance"]},{"role":"Z-Move user","movepool":["airslash","bugbuzz","energyball","quiverdance"],"preferredTypes":["Bug"]}]},"vespiquen":{"level":98,"sets":[{"role":"Staller","movepool":["airslash","defog","roost","toxic","uturn"]}]},"pachirisu":{"level":94,"sets":[{"role":"Bulky Support","movepool":["nuzzle","superfang","thunderbolt","toxic","uturn"]}]},"floatzel":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["aquajet","bulkup","icepunch","liquidation","lowkick","substitute"],"preferredTypes":["Ice"]},{"role":"Fast Attacker","movepool":["aquajet","crunch","icepunch","liquidation","lowkick"],"preferredTypes":["Ice"]},{"role":"Z-Move user","movepool":["bulkup","icepunch","liquidation","lowkick"],"preferredTypes":["Fighting"]}]},"cherrim":{"level":99,"sets":[{"role":"Wallbreaker","movepool":["dazzlinggleam","energyball","healingwish","hiddenpowerfire","hiddenpowerground","hiddenpowerrock","morningsun"]},{"role":"Staller","movepool":["aromatherapy","energyball","hiddenpowerground","leechseed","morningsun","toxic"]}]},"gastrodon":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["clearsmog","earthquake","icebeam","recover","scald","toxic"]}]},"ambipom":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["fakeout","knockoff","lowkick","return","uturn"],"preferredTypes":["Dark"]}]},"drifblim":{"level":85,"sets":[{"role":"Fast Support","movepool":["acrobatics","defog","destinybond","shadowball","substitute","willowisp"]},{"role":"Bulky Support","movepool":["acrobatics","hex","substitute","willowisp"]}]},"lopunny":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["brutalswing","healingwish","highjumpkick","return","switcheroo"]},{"role":"Z-Move user","movepool":["brutalswing","highjumpkick","return","splash"],"preferredTypes":["Normal"]}]},"lopunnymega":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["encore","fakeout","highjumpkick","poweruppunch","return","substitute"]}]},"mismagius":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["dazzlinggleam","painsplit","shadowball","taunt","willowisp"]},{"role":"Wallbreaker","movepool":["dazzlinggleam","mysticalfire","nastyplot","shadowball","thunderbolt","trick"]}]},"honchkrow":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["bravebird","heatwave","pursuit","roost","suckerpunch","superpower"]}]},"purugly":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["fakeout","knockoff","return","stompingtantrum","uturn"],"preferredTypes":["Dark"]}]},"skuntank":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["crunch","defog","fireblast","poisonjab","pursuit","suckerpunch","taunt"]}]},"bronzong":{"level":86,"sets":[{"role":"Bulky Support","movepool":["earthquake","ironhead","psychic","stealthrock","toxic"]},{"role":"Staller","movepool":["earthquake","ironhead","protect","psychic","toxic"]}]},"chatot":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["boomburst","chatter","heatwave","hiddenpowerground","uturn"]},{"role":"Setup Sweeper","movepool":["boomburst","chatter","heatwave","nastyplot","substitute"]}]},"spiritomb":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["calmmind","darkpulse","rest","sleeptalk"]},{"role":"Bulky Attacker","movepool":["foulplay","painsplit","pursuit","suckerpunch","willowisp"]}]},"garchomp":{"level":75,"sets":[{"role":"Fast Support","movepool":["dragonclaw","earthquake","fireblast","outrage","stealthrock","stoneedge","toxic"]},{"role":"Setup Sweeper","movepool":["earthquake","firefang","outrage","stoneedge","swordsdance"]},{"role":"Z-Move user","movepool":["earthquake","firefang","outrage","stoneedge","swordsdance"],"preferredTypes":["Dragon"]}]},"garchompmega":{"level":77,"sets":[{"role":"Bulky Support","movepool":["dracometeor","earthquake","fireblast","stealthrock","stoneedge"]},{"role":"Setup Sweeper","movepool":["earthquake","firefang","outrage","stoneedge","swordsdance"]}]},"lucario":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["closecombat","crunch","extremespeed","meteormash","swordsdance"],"preferredTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["aurasphere","darkpulse","flashcannon","nastyplot","vacuumwave"]}]},"lucariomega":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["closecombat","extremespeed","meteormash","swordsdance"]},{"role":"Setup Sweeper","movepool":["aurasphere","flashcannon","nastyplot","vacuumwave"]}]},"hippowdon":{"level":82,"sets":[{"role":"Bulky Support","movepool":["earthquake","slackoff","stealthrock","stoneedge","toxic","whirlwind"]}]},"drapion":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["aquatail","earthquake","knockoff","poisonjab","pursuit","swordsdance"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["earthquake","knockoff","poisonjab","taunt","toxicspikes","whirlwind"]}]},"toxicroak":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["drainpunch","earthquake","gunkshot","knockoff","substitute","suckerpunch","swordsdance"]}]},"carnivine":{"level":98,"sets":[{"role":"Bulky Support","movepool":["defog","knockoff","powerwhip","sleeppowder","synthesis","toxic"]}]},"lumineon":{"level":90,"sets":[{"role":"Bulky Support","movepool":["defog","icebeam","scald","toxic","uturn"]}]},"abomasnow":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","earthquake","gigadrain","iceshard","woodhammer"],"preferredTypes":["Ground"]}]},"abomasnowmega":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","earthquake","gigadrain","iceshard","woodhammer"],"preferredTypes":["Ground"]}]},"weavile":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["iceshard","iciclecrash","knockoff","lowkick","pursuit","swordsdance"]}]},"magnezone":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["flashcannon","hiddenpowerfire","hiddenpowerice","thunderbolt","voltswitch"]}]},"lickilicky":{"level":89,"sets":[{"role":"Bulky Support","movepool":["bodyslam","healbell","knockoff","protect","wish"]},{"role":"AV Pivot","movepool":["bodyslam","dragontail","earthquake","explosion","knockoff","powerwhip"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["bodyslam","earthquake","explosion","knockoff","powerwhip","return","swordsdance"],"preferredTypes":["Dark"]}]},"rhyperior":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["dragontail","earthquake","icepunch","megahorn","stoneedge"]},{"role":"Bulky Setup","movepool":["earthquake","icepunch","megahorn","rockpolish","stoneedge"]}]},"tangrowth":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","knockoff","leafstorm","leechseed","powerwhip","rockslide","sleeppowder","sludgebomb","synthesis"]},{"role":"AV Pivot","movepool":["earthquake","gigadrain","knockoff","powerwhip","rockslide","sludgebomb"]}]},"electivire":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["crosschop","earthquake","flamethrower","icepunch","voltswitch","wildcharge"],"preferredTypes":["Ice"]}]},"magmortar":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","fireblast","focusblast","hiddenpowergrass","hiddenpowerice","substitute","thunderbolt"],"preferredTypes":["Electric"]}]},"togekiss":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["airslash","aurasphere","nastyplot","roost","thunderwave"]},{"role":"Bulky Attacker","movepool":["airslash","defog","healbell","roost","thunderwave"]},{"role":"Fast Attacker","movepool":["airslash","aurasphere","dazzlinggleam","trick"]}]},"yanmega":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["airslash","bugbuzz","hiddenpowerground","protect"]},{"role":"Wallbreaker","movepool":["airslash","bugbuzz","gigadrain","uturn"]}]},"leafeon":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["healbell","knockoff","leafblade","synthesis","toxic"]},{"role":"Setup Sweeper","movepool":["doubleedge","knockoff","leafblade","swordsdance","synthesis","xscissor"],"preferredTypes":["Dark"]}]},"glaceon":{"level":92,"sets":[{"role":"Bulky Support","movepool":["healbell","hiddenpowerground","icebeam","protect","wish"]},{"role":"Staller","movepool":["icebeam","protect","toxic","wish"]},{"role":"Z-Move user","movepool":["celebrate","hiddenpowerground","icebeam","storedpower"],"preferredTypes":["Normal"]}]},"gliscor":{"level":79,"sets":[{"role":"Staller","movepool":["earthquake","protect","substitute","toxic"]},{"role":"Bulky Support","movepool":["earthquake","knockoff","roost","stealthrock","taunt","toxic","uturn"]},{"role":"Setup Sweeper","movepool":["earthquake","facade","roost","swordsdance"]}]},"mamoswine":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["earthquake","iceshard","iciclecrash","knockoff","stealthrock"]}]},"porygonz":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["icebeam","nastyplot","shadowball","thunderbolt","triattack","trick"]},{"role":"Z-Move user","movepool":["conversion","icebeam","recover","shadowball","thunderbolt"],"preferredTypes":["Normal"]}]},"gallade":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["closecombat","icepunch","knockoff","shadowsneak","swordsdance","zenheadbutt"],"preferredTypes":["Dark"]}]},"gallademega":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["closecombat","knockoff","swordsdance","zenheadbutt"]}]},"probopass":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","flashcannon","stealthrock","thunderwave","toxic","voltswitch"]}]},"dusknoir":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","haze","icepunch","painsplit","shadowsneak","toxic","willowisp"],"preferredTypes":["Ground"]},{"role":"Staller","movepool":["earthquake","protect","shadowsneak","toxic"]}]},"froslass":{"level":86,"sets":[{"role":"Fast Support","movepool":["destinybond","icebeam","shadowball","spikes","taunt","thunderwave","willowisp"]}]},"rotom":{"level":88,"sets":[{"role":"Fast Support","movepool":["defog","hiddenpowerice","painsplit","shadowball","thunderbolt","trick","voltswitch","willowisp"]}]},"rotomheat":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerice","overheat","painsplit","thunderbolt","voltswitch","willowisp"]}]},"rotomwash":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["defog","hydropump","painsplit","thunderbolt","trick","voltswitch","willowisp"]}]},"rotomfrost":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","painsplit","thunderbolt","trick","voltswitch","willowisp"]},{"role":"Z-Move user","movepool":["blizzard","painsplit","thunderbolt","voltswitch","willowisp"],"preferredTypes":["Ice"]}]},"rotomfan":{"level":85,"sets":[{"role":"Bulky Support","movepool":["airslash","defog","painsplit","thunderbolt","voltswitch","willowisp"]}]},"rotommow":{"level":86,"sets":[{"role":"Fast Support","movepool":["defog","hiddenpowerice","leafstorm","thunderbolt","trick","voltswitch","willowisp"]}]},"uxie":{"level":83,"sets":[{"role":"Bulky Support","movepool":["healbell","knockoff","psychic","stealthrock","thunderwave","toxic","uturn","yawn"]}]},"mesprit":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["calmmind","energyball","healingwish","hiddenpowerfire","icebeam","psychic","psyshock","signalbeam","thunderbolt","uturn"]},{"role":"Bulky Support","movepool":["knockoff","psychic","stealthrock","thunderwave","toxic","uturn"]}]},"azelf":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["dazzlinggleam","fireblast","nastyplot","psychic","psyshock","uturn"]},{"role":"Fast Support","movepool":["explosion","fireblast","knockoff","psychic","stealthrock","taunt","uturn"]}]},"dialga":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","dragontail","fireblast","flashcannon","stealthrock","thunderbolt","toxic"],"preferredTypes":["Fire"]}]},"palkia":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","fireblast","hydropump","spacialrend","thunderwave"],"preferredTypes":["Fire"]}]},"heatran":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","flashcannon","lavaplume","magmastorm","stealthrock","taunt","toxic"]},{"role":"Staller","movepool":["earthpower","magmastorm","protect","toxic"]}]},"regigigas":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["drainpunch","knockoff","return","substitute","thunderwave"],"preferredTypes":["Dark"]}]},"giratinaorigin":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","hex","shadowsneak","thunderwave","willowisp"]},{"role":"Fast Attacker","movepool":["defog","dracometeor","earthquake","outrage","shadowball","shadowsneak","willowisp"]}]},"giratina":{"level":76,"sets":[{"role":"Fast Support","movepool":["dragontail","rest","shadowball","sleeptalk","willowisp"]},{"role":"Bulky Setup","movepool":["calmmind","dragonpulse","rest","sleeptalk"]},{"role":"Bulky Support","movepool":["defog","dragontail","rest","shadowball","willowisp"]}]},"cresselia":{"level":82,"sets":[{"role":"Bulky Setup","movepool":["calmmind","moonblast","moonlight","psyshock","substitute"]},{"role":"Bulky Support","movepool":["moonblast","moonlight","psychic","thunderwave","toxic"]}]},"phione":{"level":91,"sets":[{"role":"Bulky Support","movepool":["healbell","icebeam","knockoff","scald","toxic","uturn"]}]},"manaphy":{"level":77,"sets":[{"role":"Bulky Setup","movepool":["energyball","icebeam","surf","tailglow"]},{"role":"Z-Move user","movepool":["energyball","icebeam","surf","tailglow"],"preferredTypes":["Water"]}]},"darkrai":{"level":76,"sets":[{"role":"Z-Move user","movepool":["darkpulse","focusblast","hypnosis","nastyplot","sludgebomb"],"preferredTypes":["Dark"]},{"role":"Setup Sweeper","movepool":["darkpulse","focusblast","hypnosis","nastyplot","sludgebomb","substitute"],"preferredTypes":["Poison"]}]},"shaymin":{"level":84,"sets":[{"role":"Fast Support","movepool":["airslash","earthpower","leechseed","rest","seedflare","substitute"],"preferredTypes":["Flying"]}]},"shayminsky":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["airslash","earthpower","hiddenpowerice","leechseed","seedflare","substitute"]}]},"arceus":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","shadowclaw","swordsdance"]}]},"arceusbug":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment"]}]},"arceusdark":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","defog","fireblast","judgment","recover","sludgebomb","toxic","willowisp"]}]},"arceusdragon":{"level":72,"sets":[{"role":"Bulky Support","movepool":["defog","earthquake","fireblast","judgment","recover","willowisp"]},{"role":"Z-Move user","movepool":["earthquake","extremespeed","outrage","recover","swordsdance"],"preferredTypes":["Ground"]}]},"arceuselectric":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","icebeam","judgment","recover"]}]},"arceusfairy":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthquake","judgment","recover","toxic","willowisp"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover"]}]},"arceusfighting":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["calmmind","icebeam","judgment","recover","shadowball"]}]},"arceusfire":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment","recover","thunderbolt"]},{"role":"Z-Move user","movepool":["calmmind","earthpower","fireblast","icebeam","recover","thunderbolt"]}]},"arceusflying":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover"]},{"role":"Bulky Attacker","movepool":["defog","earthquake","judgment","recover","toxic","willowisp"]}]},"arceusghost":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","defog","focusblast","judgment","recover","toxic","willowisp"]},{"role":"Z-Move user","movepool":["brickbreak","extremespeed","shadowforce","swordsdance"]}]},"arceusgrass":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["calmmind","fireblast","judgment","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment"]}]},"arceusground":{"level":72,"sets":[{"role":"Z-Move user","movepool":["earthquake","extremespeed","recover","stoneedge","swordsdance"],"preferredTypes":["Rock"]},{"role":"Bulky Attacker","movepool":["calmmind","icebeam","judgment","recover","toxic"]}]},"arceusice":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover","thunderbolt"]}]},"arceuspoison":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthquake","fireblast","icebeam","recover","sludgebomb"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","fireblast","icebeam","recover","sludgebomb"]},{"role":"Z-Move user","movepool":["calmmind","earthpower","fireblast","icebeam","recover","sludgebomb"]}]},"arceuspsychic":{"level":72,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"]},{"role":"Bulky Attacker","movepool":["defog","earthquake","fireblast","judgment","recover","toxic","willowisp"]}]},"arceusrock":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthquake","judgment","recover","toxic","willowisp"]},{"role":"Z-Move user","movepool":["earthquake","extremespeed","recover","stoneedge","swordsdance"],"preferredTypes":["Ground"]}]},"arceussteel":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthquake","judgment","recover","toxic","willowisp"]},{"role":"Z-Move user","movepool":["earthquake","ironhead","recover","stoneedge","swordsdance"],"preferredTypes":["Ground"]}]},"arceuswater":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","icebeam","judgment","recover","toxic"]}]},"victini":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["boltstrike","uturn","vcreate","zenheadbutt"]},{"role":"AV Pivot","movepool":["boltstrike","energyball","focusblast","glaciate","psychic","uturn","vcreate"],"preferredTypes":["Electric"]},{"role":"Z-Move user","movepool":["blueflare","boltstrike","celebrate","storedpower"],"preferredTypes":["Normal"]}]},"serperior":{"level":80,"sets":[{"role":"Fast Support","movepool":["defog","dragonpulse","glare","hiddenpowerfire","leafstorm","leechseed","substitute"]}]},"emboar":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["flareblitz","headsmash","suckerpunch","superpower","wildcharge"]},{"role":"AV Pivot","movepool":["flareblitz","grassknot","suckerpunch","superpower","wildcharge"]}]},"samurott":{"level":87,"sets":[{"role":"AV Pivot","movepool":["aquajet","grassknot","hydropump","icebeam","knockoff","megahorn","sacredsword","scald"]},{"role":"Fast Attacker","movepool":["aquajet","knockoff","liquidation","megahorn","sacredsword","swordsdance"]}]},"watchog":{"level":94,"sets":[{"role":"Bulky Attacker","movepool":["hypnosis","knockoff","return","superfang"]},{"role":"Setup Sweeper","movepool":["hypnosis","knockoff","return","stompingtantrum","swordsdance"],"preferredTypes":["Dark"]}]},"stoutland":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["crunch","playrough","return","superpower","wildcharge"],"preferredTypes":["Fighting"]}]},"liepard":{"level":91,"sets":[{"role":"Fast Support","movepool":["copycat","encore","knockoff","substitute","thunderwave","uturn"]}]},"simisage":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["gunkshot","hiddenpowerice","knockoff","leafstorm","rockslide","superpower"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["focusblast","gigadrain","hiddenpowerice","nastyplot","substitute"]}]},"simisear":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["fireblast","focusblast","grassknot","hiddenpowerrock","nastyplot","substitute"]}]},"simipour":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["focusblast","hydropump","icebeam","nastyplot","substitute"],"preferredTypes":["Ice"]}]},"musharna":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["calmmind","moonlight","psyshock","shadowball","signalbeam"]},{"role":"Bulky Support","movepool":["healbell","moonlight","psychic","signalbeam","thunderwave","toxic"]}]},"unfezant":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["defog","nightslash","pluck","return","roost","toxic","uturn"]}]},"zebstrika":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerice","overheat","thunderbolt","voltswitch","wildcharge"]}]},"gigalith":{"level":83,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","stealthrock","stoneedge","superpower"]}]},"swoobat":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["calmmind","heatwave","roost","storedpower"]},{"role":"Setup Sweeper","movepool":["airslash","calmmind","heatwave","roost","storedpower"]}]},"excadrill":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["earthquake","ironhead","rapidspin","rockslide","swordsdance"]}]},"audino":{"level":92,"sets":[{"role":"Bulky Support","movepool":["knockoff","protect","toxic","wish"]}]},"audinomega":{"level":92,"sets":[{"role":"Staller","movepool":["dazzlinggleam","protect","toxic","wish"]},{"role":"Bulky Support","movepool":["calmmind","dazzlinggleam","fireblast","protect","wish"]}]},"gurdurr":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["bulkup","drainpunch","knockoff","machpunch"]}]},"conkeldurr":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["drainpunch","facade","knockoff","machpunch"]}]},"seismitoad":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","hydropump","knockoff","raindance","sludgewave"]},{"role":"Bulky Support","movepool":["earthquake","knockoff","scald","stealthrock","toxic"]},{"role":"Staller","movepool":["earthquake","protect","scald","toxic"]}]},"throh":{"level":89,"sets":[{"role":"Bulky Setup","movepool":["bulkup","facade","knockoff","stormthrow"]},{"role":"Bulky Support","movepool":["bulkup","circlethrow","knockoff","rest","sleeptalk"]}]},"sawk":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["bulkup","closecombat","earthquake","knockoff","poisonjab","stoneedge"],"preferredTypes":["Dark"]}]},"leavanny":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["knockoff","leafblade","swordsdance","xscissor"]},{"role":"Fast Support","movepool":["knockoff","leafblade","stickyweb","toxic","xscissor"]}]},"scolipede":{"level":81,"sets":[{"role":"Fast Support","movepool":["earthquake","megahorn","poisonjab","spikes","toxicspikes"]},{"role":"Setup Sweeper","movepool":["earthquake","megahorn","poisonjab","protect","swordsdance"]}]},"whimsicott":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","encore","energyball","moonblast","stunspore","taunt","toxic","uturn"]},{"role":"Staller","movepool":["leechseed","moonblast","protect","substitute"]}]},"lilligant":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["gigadrain","hiddenpowerfire","hiddenpowerrock","petaldance","quiverdance","sleeppowder"]}]},"basculin":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["aquajet","crunch","headsmash","liquidation","superpower"]}]},"krookodile":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["earthquake","knockoff","pursuit","stealthrock","stoneedge","superpower"]}]},"darmanitan":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["earthquake","flareblitz","rockslide","superpower","uturn"]}]},"maractus":{"level":97,"sets":[{"role":"Fast Support","movepool":["gigadrain","hiddenpowerfire","knockoff","spikes","suckerpunch","synthesis","toxic"]},{"role":"Staller","movepool":["gigadrain","hiddenpowerfire","hiddenpowerice","leechseed","spikyshield"]}]},"crustle":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","knockoff","shellsmash","stoneedge","xscissor"],"preferredTypes":["Ground"]}]},"scrafty":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","highjumpkick","ironhead","knockoff"]},{"role":"Bulky Setup","movepool":["bulkup","drainpunch","knockoff","rest"]}]},"sigilyph":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["airslash","calmmind","defog","heatwave","psyshock","roost"]},{"role":"Wallbreaker","movepool":["airslash","energyball","heatwave","icebeam","psychic","psyshock"],"preferredTypes":["Psychic"]}]},"cofagrigus":{"level":89,"sets":[{"role":"Bulky Support","movepool":["haze","painsplit","shadowball","toxicspikes","willowisp"]},{"role":"Bulky Setup","movepool":["hiddenpowerfighting","nastyplot","shadowball","trickroom"]}]},"carracosta":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["aquajet","earthquake","liquidation","shellsmash","stoneedge"]}]},"archeops":{"level":83,"sets":[{"role":"Fast Support","movepool":["acrobatics","defog","earthquake","roost","stoneedge","uturn"]},{"role":"Wallbreaker","movepool":["aquatail","earthquake","headsmash","knockoff","stealthrock","stoneedge","uturn"],"preferredTypes":["Ground"]}]},"garbodor":{"level":88,"sets":[{"role":"Bulky Support","movepool":["gunkshot","haze","painsplit","spikes","stompingtantrum","toxic","toxicspikes"]}]},"zoroark":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","flamethrower","focusblast","nastyplot","sludgebomb","trick","uturn"],"preferredTypes":["Poison"]}]},"cinccino":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["bulletseed","knockoff","rockblast","tailslap","uturn"]}]},"gothitelle":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","hiddenpowerfighting","psychic","shadowball","signalbeam","thunderbolt","trick"]}]},"reuniclus":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","focusblast","psychic","psyshock","recover","shadowball","trickroom"]},{"role":"Wallbreaker","movepool":["focusblast","psychic","psyshock","shadowball","trickroom"]}]},"swanna":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","defog","roost","scald","toxic"]},{"role":"Z-Move user","movepool":["hurricane","raindance","rest","scald"],"preferredTypes":["Water"]}]},"vanilluxe":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["autotomize","blizzard","explosion","flashcannon","freezedry","hiddenpowerground"],"preferredTypes":["Ground"]},{"role":"AV Pivot","movepool":["blizzard","explosion","flashcannon","freezedry","hiddenpowerground"],"preferredTypes":["Ground"]}]},"sawsbuck":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["headbutt","hornleech","jumpkick","return","substitute","swordsdance"],"preferredTypes":["Normal"]}]},"emolga":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["acrobatics","defog","encore","knockoff","roost","thunderbolt","toxic","uturn"]}]},"escavalier":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["drillrun","ironhead","knockoff","megahorn","pursuit","swordsdance"]}]},"amoonguss":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["clearsmog","foulplay","gigadrain","sludgebomb","spore","stompingtantrum"]},{"role":"Bulky Support","movepool":["gigadrain","sludgebomb","spore","synthesis"]}]},"jellicent":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["icebeam","recover","scald","shadowball","taunt"]},{"role":"Bulky Support","movepool":["hex","recover","scald","toxic","willowisp"]}]},"alomomola":{"level":87,"sets":[{"role":"Bulky Support","movepool":["knockoff","protect","scald","toxic","wish"]}]},"galvantula":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["bugbuzz","gigadrain","stickyweb","thunder","voltswitch"],"preferredTypes":["Bug"]}]},"ferrothorn":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["gyroball","leechseed","powerwhip","spikes","stealthrock"]},{"role":"Bulky Support","movepool":["knockoff","powerwhip","spikes","stealthrock","thunderwave","toxic"]}]},"klinklang":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["geargrind","return","shiftgear","substitute","wildcharge"]},{"role":"Z-Move user","movepool":["geargrind","return","shiftgear","substitute","wildcharge"],"preferredTypes":["Electric","Normal","Steel"]}]},"eelektross":{"level":88,"sets":[{"role":"AV Pivot","movepool":["flamethrower","gigadrain","hiddenpowerice","knockoff","superpower","thunderbolt","uturn"]}]},"beheeyem":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerfighting","nastyplot","psychic","psyshock","signalbeam","thunderbolt","trick","trickroom"]}]},"chandelure":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["energyball","fireblast","shadowball","trick"]},{"role":"Bulky Setup","movepool":["calmmind","fireblast","shadowball","substitute"]}]},"haxorus":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","outrage","poisonjab","taunt"],"preferredTypes":["Ground"]},{"role":"Z-Move user","movepool":["dragondance","earthquake","outrage","poisonjab"],"preferredTypes":["Dragon"]}]},"beartic":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["aquajet","iciclecrash","stoneedge","superpower","swordsdance"],"preferredTypes":["Fighting"]}]},"cryogonal":{"level":88,"sets":[{"role":"Bulky Support","movepool":["freezedry","haze","hiddenpowerground","rapidspin","recover","toxic"]}]},"accelgor":{"level":90,"sets":[{"role":"Fast Support","movepool":["bugbuzz","encore","focusblast","hiddenpowerground","hiddenpowerrock","spikes","toxicspikes","uturn"]}]},"stunfisk":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["discharge","earthpower","rest","scald","sleeptalk","stealthrock","toxic"]},{"role":"AV Pivot","movepool":["discharge","earthpower","foulplay","scald","sludgebomb"]}]},"mienshao":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["highjumpkick","knockoff","poisonjab","stoneedge","swordsdance","uturn"],"preferredTypes":["Dark"]},{"role":"AV Pivot","movepool":["fakeout","highjumpkick","knockoff","uturn"]}]},"druddigon":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["firepunch","glare","gunkshot","outrage","suckerpunch"],"preferredTypes":["Poison"]},{"role":"Bulky Support","movepool":["dragontail","earthquake","glare","gunkshot","outrage","stealthrock","suckerpunch"]}]},"golurk":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["dynamicpunch","earthquake","icepunch","rockpolish","stealthrock","stoneedge"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["earthquake","icepunch","rockpolish","shadowpunch"]}]},"bisharp":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["ironhead","knockoff","pursuit","suckerpunch","swordsdance"]}]},"bouffalant":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headcharge","stoneedge","superpower","swordsdance"]}]},"braviary":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","bulkup","roost","superpower"]},{"role":"Fast Attacker","movepool":["bravebird","return","superpower","uturn"]}]},"mandibuzz":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","defog","foulplay","knockoff","roost","taunt","toxic","uturn"]},{"role":"Bulky Support","movepool":["defog","foulplay","roost","taunt","toxic","uturn"]}]},"heatmor":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["fireblast","firelash","gigadrain","knockoff","suckerpunch","superpower"]}]},"durant":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["honeclaws","ironhead","rockslide","superpower","xscissor"],"preferredTypes":["Fighting"]}]},"hydreigon":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","dracometeor","earthpower","fireblast","flashcannon","roost","uturn"]},{"role":"Bulky Attacker","movepool":["darkpulse","defog","dracometeor","fireblast","roost","uturn"]},{"role":"AV Pivot","movepool":["darkpulse","dracometeor","flashcannon","superpower","uturn"],"preferredTypes":["Fighting"]}]},"volcarona":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["bugbuzz","fierydance","fireblast","gigadrain","hiddenpowerrock","quiverdance","roost"]},{"role":"Z-Move user","movepool":["bugbuzz","fireblast","gigadrain","quiverdance","roost"],"preferredTypes":["Bug","Fire"]}]},"cobalion":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["closecombat","ironhead","stealthrock","stoneedge","swordsdance"]},{"role":"Z-Move user","movepool":["closecombat","ironhead","stoneedge","swordsdance"],"preferredTypes":["Fighting","Steel"]}]},"terrakion":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","quickattack","stealthrock","stoneedge"],"preferredTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["closecombat","earthquake","stoneedge","swordsdance"]},{"role":"Z-Move user","movepool":["closecombat","earthquake","stoneedge","swordsdance"],"preferredTypes":["Fighting","Rock"]}]},"virizion":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["closecombat","leafblade","stoneedge","swordsdance"]},{"role":"Z-Move user","movepool":["calmmind","focusblast","gigadrain","hiddenpowerrock"],"preferredTypes":["Fighting"]}]},"tornadus":{"level":82,"sets":[{"role":"Fast Support","movepool":["defog","heatwave","hurricane","knockoff","superpower","taunt","uturn"]},{"role":"Setup Sweeper","movepool":["acrobatics","bulkup","knockoff","superpower","taunt"],"preferredTypes":["Fighting"]}]},"tornadustherian":{"level":80,"sets":[{"role":"Fast Support","movepool":["defog","heatwave","hurricane","knockoff","superpower","taunt","uturn"]}]},"thundurus":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["focusblast","hiddenpowerflying","hiddenpowerice","nastyplot","substitute","thunderbolt"]},{"role":"Fast Attacker","movepool":["focusblast","hiddenpowerflying","hiddenpowerice","knockoff","taunt","thunderbolt","thunderwave"]}]},"thundurustherian":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["focusblast","hiddenpowerflying","hiddenpowerice","nastyplot","thunderbolt","voltswitch"]}]},"reshiram":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["blueflare","defog","dracometeor","roost","toxic"]}]},"zekrom":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["boltstrike","honeclaws","outrage","roost","substitute"]},{"role":"AV Pivot","movepool":["boltstrike","dracometeor","outrage","voltswitch"]},{"role":"Z-Move user","movepool":["boltstrike","honeclaws","outrage","roost"],"preferredTypes":["Dragon"]}]},"landorus":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["earthpower","focusblast","knockoff","psychic","rockpolish","rockslide","sludgewave","stealthrock"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","focusblast","psychic","rockpolish","sludgewave"],"preferredTypes":["Poison"]}]},"landorustherian":{"level":76,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthquake","knockoff","stealthrock","stoneedge","toxic","uturn"]},{"role":"Setup Sweeper","movepool":["earthquake","knockoff","rockpolish","stoneedge","superpower","swordsdance"],"preferredTypes":["Rock"]},{"role":"Z-Move user","movepool":["earthquake","fly","rockpolish","stoneedge","swordsdance"],"preferredTypes":["Flying"]}]},"kyurem":{"level":81,"sets":[{"role":"Staller","movepool":["earthpower","icebeam","roost","substitute"]},{"role":"Bulky Support","movepool":["dracometeor","earthpower","icebeam","outrage","roost","substitute"]},{"role":"Bulky Attacker","movepool":["dracometeor","earthpower","focusblast","icebeam","outrage"]}]},"kyuremblack":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","fusionbolt","icebeam","outrage","roost","substitute"]},{"role":"Z-Move user","movepool":["freezeshock","fusionbolt","honeclaws","outrage","roost"],"preferredTypes":["Ice"]}]},"kyuremwhite":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["dracometeor","earthpower","fusionflare","icebeam","roost"]}]},"keldeo":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["calmmind","hiddenpowerelectric","hiddenpowerflying","hydropump","icywind","scald","secretsword"]},{"role":"Bulky Setup","movepool":["calmmind","hydropump","scald","secretsword","substitute"]}]},"meloetta":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["calmmind","focusblast","hypervoice","psyshock","uturn"]},{"role":"Wallbreaker","movepool":["closecombat","knockoff","relicsong","return"]}]},"genesect":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["blazekick","ironhead","shiftgear","thunderbolt","xscissor"]},{"role":"Wallbreaker","movepool":["blazekick","extremespeed","ironhead","uturn"]},{"role":"Fast Attacker","movepool":["bugbuzz","flamethrower","flashcannon","icebeam","thunderbolt","uturn"],"preferredTypes":["Bug"]}]},"chesnaught":{"level":88,"sets":[{"role":"Bulky Support","movepool":["drainpunch","leechseed","spikes","synthesis","woodhammer"]},{"role":"Staller","movepool":["drainpunch","leechseed","spikyshield","woodhammer"]}]},"delphox":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["calmmind","dazzlinggleam","fireblast","grassknot","psyshock","switcheroo"]}]},"greninja":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["gunkshot","hydropump","icebeam","spikes","taunt","toxicspikes","uturn"]}]},"greninjabond":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","hydropump","icebeam","uturn","watershuriken"]}]},"diggersby":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["agility","earthquake","knockoff","quickattack","return","swordsdance"],"preferredTypes":["Normal"]},{"role":"Fast Attacker","movepool":["earthquake","foulplay","quickattack","return","uturn"],"preferredTypes":["Normal"]}]},"talonflame":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","defog","overheat","roost","uturn","willowisp"]},{"role":"Z-Move user","movepool":["bravebird","flareblitz","roost","swordsdance"],"preferredTypes":["Flying"]}]},"vivillon":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["energyball","hurricane","quiverdance","sleeppowder"]},{"role":"Bulky Attacker","movepool":["bugbuzz","hurricane","quiverdance","sleeppowder"]}]},"pyroar":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","fireblast","hypervoice","solarbeam","sunnyday","willowisp"],"preferredTypes":["Normal"]},{"role":"Z-Move user","movepool":["darkpulse","fireblast","hypervoice","solarbeam","willowisp"],"preferredTypes":["Grass"]}]},"floetteeternal":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerfire","hiddenpowerground","lightofruin","moonblast","psychic"]}]},"florges":{"level":85,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","defog","moonblast","synthesis","toxic"]},{"role":"Staller","movepool":["moonblast","protect","toxic","wish"]},{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerground","moonblast","synthesis"]}]},"gogoat":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["bulkup","earthquake","hornleech","milkdrink","toxic"]}]},"pangoro":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["bulletpunch","drainpunch","gunkshot","icepunch","knockoff","partingshot","superpower","swordsdance"],"preferredTypes":["Poison"]}]},"furfrou":{"level":86,"sets":[{"role":"Bulky Support","movepool":["darkpulse","rest","return","thunderwave","toxic","uturn"]},{"role":"Staller","movepool":["cottonguard","rest","return","substitute","toxic"]}]},"meowstic":{"level":88,"sets":[{"role":"Bulky Support","movepool":["healbell","lightscreen","psychic","reflect","signalbeam","thunderwave","toxic","yawn"]}]},"meowsticf":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["calmmind","darkpulse","psychic","psyshock","signalbeam","thunderbolt"]}]},"doublade":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["ironhead","sacredsword","shadowclaw","shadowsneak","swordsdance"]}]},"aegislash":{"level":78,"sets":[{"role":"Staller","movepool":["ironhead","kingsshield","shadowball","substitute","toxic"]},{"role":"Setup Sweeper","movepool":["ironhead","kingsshield","sacredsword","shadowclaw","shadowsneak","swordsdance"],"preferredTypes":["Steel"]}]},"aromatisse":{"level":91,"sets":[{"role":"Bulky Support","movepool":["calmmind","moonblast","protect","toxic","wish"]}]},"slurpuff":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["bellydrum","drainpunch","playrough","return"]}]},"malamar":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["knockoff","rest","sleeptalk","superpower"]},{"role":"Z-Move user","movepool":["happyhour","knockoff","psychocut","superpower"],"preferredTypes":["Normal"]}]},"barbaracle":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","liquidation","lowkick","shellsmash","stoneedge"]}]},"dragalge":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","focusblast","sludgewave","toxicspikes"]},{"role":"Wallbreaker","movepool":["dracometeor","dragonpulse","focusblast","sludgewave"]}]},"clawitzer":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["aurasphere","darkpulse","icebeam","scald","uturn","waterpulse"]}]},"heliolisk":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","glare","hypervoice","surf","thunderbolt","voltswitch"],"preferredTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["hypervoice","raindance","surf","thunder"]}]},"tyrantrum":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["dragondance","earthquake","headsmash","outrage","stealthrock","superpower"],"preferredTypes":["Ground"]},{"role":"Z-Move user","movepool":["dragondance","earthquake","headsmash","outrage"],"preferredTypes":["Dragon","Rock"]}]},"aurorus":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["ancientpower","blizzard","earthpower","freezedry","stealthrock"]},{"role":"Bulky Support","movepool":["earthpower","freezedry","haze","hypervoice","stealthrock","thunderwave"]}]},"sylveon":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","hiddenpowerground","hypervoice","protect","psyshock","wish"]},{"role":"Bulky Setup","movepool":["calmmind","hypervoice","protect","wish"]}]},"hawlucha":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["acrobatics","highjumpkick","skyattack","substitute","swordsdance"]}]},"dedenne":{"level":90,"sets":[{"role":"Bulky Support","movepool":["protect","recycle","thunderbolt","toxic"]},{"role":"Staller","movepool":["recycle","substitute","superfang","thunderbolt","toxic","uturn"]}]},"carbink":{"level":90,"sets":[{"role":"Bulky Support","movepool":["lightscreen","moonblast","powergem","reflect","stealthrock","toxic"]}]},"goodra":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","dragontail","earthquake","fireblast","powerwhip","sludgebomb","thunderbolt"]}]},"klefki":{"level":85,"sets":[{"role":"Bulky Support","movepool":["dazzlinggleam","foulplay","spikes","thunderwave"]},{"role":"Bulky Attacker","movepool":["magnetrise","playrough","spikes","thunderwave"]}]},"trevenant":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hornleech","rockslide","shadowclaw","trickroom","woodhammer"]},{"role":"Staller","movepool":["earthquake","hornleech","protect","toxic"]}]},"gourgeistsmall":{"level":89,"sets":[{"role":"Bulky Support","movepool":["seedbomb","shadowsneak","synthesis","willowisp"]}]},"gourgeistlarge":{"level":89,"sets":[{"role":"Bulky Support","movepool":["seedbomb","shadowsneak","synthesis","willowisp"]}]},"gourgeist":{"level":89,"sets":[{"role":"Bulky Support","movepool":["seedbomb","shadowsneak","synthesis","willowisp"]}]},"gourgeistsuper":{"level":88,"sets":[{"role":"Bulky Support","movepool":["seedbomb","shadowsneak","synthesis","willowisp"]}]},"avalugg":{"level":89,"sets":[{"role":"Bulky Support","movepool":["avalanche","earthquake","rapidspin","recover","roar","toxic"]}]},"noivern":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["boomburst","dracometeor","flamethrower","hurricane","roost","switcheroo"]},{"role":"Fast Support","movepool":["defog","dracometeor","flamethrower","hurricane","roost","uturn"]}]},"xerneas":{"level":66,"sets":[{"role":"Setup Sweeper","movepool":["focusblast","geomancy","hiddenpowerfire","moonblast","psyshock","thunder"]}]},"yveltal":{"level":70,"sets":[{"role":"Bulky Support","movepool":["knockoff","oblivionwing","roost","suckerpunch","taunt","toxic","uturn"]}]},"zygarde":{"level":73,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","extremespeed","outrage","substitute","thousandarrows"]},{"role":"Bulky Setup","movepool":["coil","rest","sleeptalk","thousandarrows"]}]},"zygarde10":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["extremespeed","irontail","outrage","thousandarrows"]},{"role":"Setup Sweeper","movepool":["coil","extremespeed","irontail","outrage","thousandarrows"]},{"role":"Z-Move user","movepool":["coil","extremespeed","irontail","outrage","thousandarrows"],"preferredTypes":["Dragon"]}]},"diancie":{"level":82,"sets":[{"role":"Bulky Support","movepool":["diamondstorm","earthpower","healbell","moonblast","stealthrock","toxic"]}]},"dianciemega":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["calmmind","diamondstorm","earthpower","moonblast","stealthrock"]}]},"hoopa":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["focusblast","nastyplot","psyshock","shadowball","trick"]}]},"hoopaunbound":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["drainpunch","gunkshot","hyperspacefury","trick","zenheadbutt"],"preferredTypes":["Psychic"]},{"role":"Bulky Attacker","movepool":["drainpunch","gunkshot","hyperspacefury","psychic","trick"],"preferredTypes":["Psychic"]}]},"volcanion":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["defog","earthpower","fireblast","sludgebomb","steameruption","superpower","toxic"]}]},"decidueye":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["defog","leafstorm","roost","spiritshackle","uturn"]},{"role":"Z-Move user","movepool":["leafblade","shadowsneak","spiritshackle","swordsdance"]}]},"incineroar":{"level":83,"sets":[{"role":"AV Pivot","movepool":["darkestlariat","earthquake","fakeout","flareblitz","knockoff","overheat","uturn"]}]},"primarina":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["hydropump","moonblast","psychic","scald"]}]},"toucannon":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["beakblast","boomburst","brickbreak","bulletseed","roost"]},{"role":"Bulky Attacker","movepool":["bravebird","brickbreak","bulletseed","knockoff","rockblast","swordsdance","uturn"]}]},"gumshoos":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["crunch","earthquake","return","uturn"]}]},"vikavolt":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["agility","bugbuzz","energyball","thunderbolt","voltswitch"]},{"role":"Bulky Attacker","movepool":["bugbuzz","energyball","roost","thunderbolt","voltswitch"],"preferredTypes":["Bug"]}]},"crabominable":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["closecombat","drainpunch","earthquake","icehammer","stoneedge"]}]},"oricorio":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","defog","hurricane","revelationdance","roost","toxic"]}]},"oricoriopompom":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","defog","hurricane","revelationdance","roost","toxic"]}]},"oricoriopau":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","defog","hurricane","revelationdance","roost","toxic"]}]},"oricoriosensu":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","defog","hurricane","revelationdance","roost","toxic"]}]},"ribombee":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["bugbuzz","hiddenpowerground","moonblast","quiverdance","roost"]},{"role":"Fast Support","movepool":["aromatherapy","moonblast","roost","stickyweb","stunspore","uturn"]}]},"lycanroc":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["accelerock","drillrun","firefang","stoneedge","swordsdance"],"preferredTypes":["Ground"]},{"role":"Z-Move user","movepool":["accelerock","drillrun","firefang","stoneedge","swordsdance"],"preferredTypes":["Ground"]}]},"lycanrocmidnight":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["stealthrock","stompingtantrum","stoneedge","suckerpunch","swordsdance"]},{"role":"Z-Move user","movepool":["stompingtantrum","stoneedge","suckerpunch","swordsdance"]}]},"lycanrocdusk":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["accelerock","drillrun","firefang","return","stoneedge","swordsdance"],"preferredTypes":["Ground"]},{"role":"Z-Move user","movepool":["accelerock","drillrun","firefang","return","stoneedge","swordsdance"],"preferredTypes":["Ground"]}]},"wishiwashi":{"level":89,"sets":[{"role":"AV Pivot","movepool":["earthquake","hiddenpowergrass","hydropump","icebeam","scald","uturn"],"preferredTypes":["Ice"]},{"role":"Wallbreaker","movepool":["hiddenpowergrass","hydropump","icebeam","scald"]}]},"toxapex":{"level":80,"sets":[{"role":"Bulky Support","movepool":["haze","recover","scald","toxic","toxicspikes"]},{"role":"Staller","movepool":["banefulbunker","recover","scald","toxic"]}]},"mudsdale":{"level":84,"sets":[{"role":"Bulky Support","movepool":["closecombat","earthquake","heavyslam","rockslide","stealthrock"]}]},"araquanid":{"level":81,"sets":[{"role":"Bulky Support","movepool":["leechlife","liquidation","mirrorcoat","stickyweb","toxic"]}]},"lurantis":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["defog","hiddenpowerice","knockoff","leafstorm","superpower","synthesis"],"preferredTypes":["Fighting"]},{"role":"AV Pivot","movepool":["hiddenpowerice","hiddenpowerrock","knockoff","leafstorm","superpower"]}]},"shiinotic":{"level":91,"sets":[{"role":"Bulky Support","movepool":["gigadrain","hiddenpowerground","leechseed","moonblast","spore","strengthsap"]}]},"salazzle":{"level":84,"sets":[{"role":"Z-Move user","movepool":["dragonpulse","fireblast","hiddenpowergrass","nastyplot","sludgewave"],"preferredTypes":["Dragon","Fire"]},{"role":"Staller","movepool":["flamethrower","protect","substitute","toxic"]}]},"bewear":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["doubleedge","return","shadowclaw","superpower","swordsdance"]},{"role":"Fast Attacker","movepool":["doubleedge","drainpunch","shadowclaw","superpower"]},{"role":"Bulky Setup","movepool":["bulkup","doubleedge","drainpunch","return","shadowclaw"]}]},"tsareena":{"level":87,"sets":[{"role":"Fast Support","movepool":["highjumpkick","knockoff","powerwhip","rapidspin","synthesis","uturn"],"preferredTypes":["Fighting"]}]},"comfey":{"level":88,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","defog","drainingkiss","synthesis","toxic","uturn"]},{"role":"Bulky Setup","movepool":["calmmind","drainingkiss","gigadrain","hiddenpowerground"]},{"role":"Setup Sweeper","movepool":["calmmind","drainingkiss","gigadrain","hiddenpowerground"]}]},"oranguru":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["focusblast","nastyplot","naturepower","psychic","psyshock","thunderbolt","trick"]}]},"passimian":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","gunkshot","knockoff","rockslide","uturn"],"preferredTypes":["Dark"]},{"role":"Bulky Setup","movepool":["bulkup","drainpunch","gunkshot","knockoff"]}]},"golisopod":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["firstimpression","knockoff","leechlife","liquidation","spikes"]}]},"palossand":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","shadowball","shoreup","stealthrock","toxic"]}]},"pyukumuku":{"level":91,"sets":[{"role":"Bulky Support","movepool":["block","recover","soak","toxic"]}]},"typenull":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["rest","return","sleeptalk","swordsdance"]},{"role":"Bulky Support","movepool":["payback","rest","return","sleeptalk","uturn"]}]},"silvally":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["crunch","doubleedge","explosion","flamecharge","ironhead","return","swordsdance"],"preferredTypes":["Dark"]}]},"silvallybug":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","icebeam","thunderbolt","toxic","uturn"]}]},"silvallydark":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["flamecharge","ironhead","multiattack","swordsdance"]}]},"silvallydragon":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","dracometeor","flamethrower","ironhead","partingshot","toxic","uturn"]},{"role":"Setup Sweeper","movepool":["flamecharge","ironhead","outrage","swordsdance"]}]},"silvallyelectric":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","icebeam","multiattack","partingshot","toxic","uturn"],"preferredTypes":["Ice"]}]},"silvallyfairy":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","multiattack","partingshot","surf","toxic","uturn"]}]},"silvallyfighting":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","icebeam","multiattack","partingshot","shadowball","toxic","uturn"]},{"role":"Setup Sweeper","movepool":["crunch","flamecharge","ironhead","multiattack","rockslide","swordsdance"],"preferredTypes":["Dark"]}]},"silvallyfire":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","icebeam","multiattack","partingshot","surf","thunderbolt","toxic","uturn"]}]},"silvallyflying":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","ironhead","multiattack","partingshot","toxic","uturn"]}]},"silvallyghost":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","icebeam","multiattack","partingshot","toxic","uturn"]},{"role":"Setup Sweeper","movepool":["explosion","multiattack","swordsdance","xscissor"]}]},"silvallygrass":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","icebeam","multiattack","partingshot","toxic","uturn"]}]},"silvallyground":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","icebeam","multiattack","partingshot","toxic","uturn"]},{"role":"Setup Sweeper","movepool":["flamecharge","multiattack","rockslide","swordsdance"]}]},"silvallyice":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","multiattack","partingshot","thunderbolt","toxic","uturn"],"preferredTypes":["Electric"]}]},"silvallypoison":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","multiattack","partingshot","surf","toxic","uturn"]}]},"silvallypsychic":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","multiattack","partingshot","toxic","uturn"]}]},"silvallyrock":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","grasspledge","multiattack","partingshot","toxic","uturn"]}]},"silvallysteel":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","flamethrower","multiattack","partingshot","thunderbolt","toxic","uturn"]}]},"silvallywater":{"level":87,"sets":[{"role":"Fast Support","movepool":["defog","icebeam","multiattack","partingshot","thunderbolt","toxic","uturn"]}]},"minior":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["acrobatics","earthquake","powergem","shellsmash"]}]},"komala":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","knockoff","rapidspin","return","suckerpunch","superpower","uturn","woodhammer"],"preferredTypes":["Dark"]}]},"turtonator":{"level":88,"sets":[{"role":"AV Pivot","movepool":["dracometeor","dragontail","earthquake","explosion","fireblast"]},{"role":"Setup Sweeper","movepool":["dracometeor","dragonpulse","earthquake","fireblast","shellsmash"]}]},"togedemaru":{"level":86,"sets":[{"role":"Bulky Support","movepool":["ironhead","nuzzle","spikyshield","uturn","wish"]},{"role":"Fast Support","movepool":["ironhead","spikyshield","uturn","wish","zingzap"]},{"role":"AV Pivot","movepool":["ironhead","nuzzle","superfang","uturn","zingzap"],"preferredTypes":["Steel"]}]},"mimikyu":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["drainpunch","playrough","shadowclaw","shadowsneak","swordsdance"]},{"role":"Z-Move user","movepool":["drainpunch","playrough","shadowclaw","shadowsneak","swordsdance"]}]},"bruxish":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["aquajet","crunch","icefang","liquidation","psychicfangs","swordsdance"]}]},"drampa":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["dracometeor","fireblast","hypervoice","roost","thunderbolt"],"preferredTypes":["Fire"]},{"role":"Bulky Attacker","movepool":["defog","dracometeor","fireblast","glare","hypervoice","roost"]}]},"dhelmise":{"level":90,"sets":[{"role":"Fast Support","movepool":["anchorshot","earthquake","knockoff","powerwhip","rapidspin","synthesis"],"preferredTypes":["Steel"]}]},"kommoo":{"level":75,"sets":[{"role":"Z-Move user","movepool":["clangingscales","closecombat","dragondance","ironhead"],"preferredTypes":["Dragon"]},{"role":"Setup Sweeper","movepool":["closecombat","dragondance","ironhead","outrage"]}]},"tapukoko":{"level":77,"sets":[{"role":"Fast Support","movepool":["bravebird","dazzlinggleam","defog","naturesmadness","uturn","wildcharge"]},{"role":"Z-Move user","movepool":["calmmind","dazzlinggleam","grassknot","roost","thunderbolt"],"preferredTypes":["Electric"]}]},"tapulele":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["focusblast","moonblast","psychic","psyshock"]},{"role":"Setup Sweeper","movepool":["calmmind","focusblast","moonblast","psychic","psyshock"]}]},"tapubulu":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["bulkup","hornleech","megahorn","stoneedge","superpower","woodhammer"]}]},"tapufini":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["calmmind","hydropump","icebeam","moonblast","surf","taunt"]}]},"solgaleo":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","flareblitz","knockoff","morningsun","stoneedge","sunsteelstrike","zenheadbutt"]},{"role":"Fast Attacker","movepool":["earthquake","flareblitz","knockoff","stoneedge","sunsteelstrike","zenheadbutt"]},{"role":"Bulky Setup","movepool":["earthquake","flamecharge","knockoff","psychic","sunsteelstrike"]}]},"lunala":{"level":72,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","moonblast","moongeistbeam","psyshock","roost"]},{"role":"Z-Move user","movepool":["calmmind","moonblast","moongeistbeam","psyshock","roost"]}]},"nihilego":{"level":80,"sets":[{"role":"Fast Support","movepool":["grassknot","hiddenpowerfire","hiddenpowerground","powergem","sludgewave","stealthrock","thunderbolt","toxicspikes"]}]},"buzzwole":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["drainpunch","earthquake","ironhead","leechlife","stoneedge","superpower"]},{"role":"Bulky Attacker","movepool":["bulkup","drainpunch","leechlife","roost","stoneedge","toxic"]}]},"pheromosa":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["highjumpkick","icebeam","poisonjab","throatchop","uturn"]}]},"xurkitree":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["dazzlinggleam","energyball","hiddenpowerice","tailglow","thunderbolt","voltswitch"]},{"role":"Z-Move user","movepool":["dazzlinggleam","electricterrain","energyball","hiddenpowerice","thunderbolt"],"preferredTypes":["Electric"]}]},"celesteela":{"level":80,"sets":[{"role":"AV Pivot","movepool":["airslash","earthquake","fireblast","heavyslam"]},{"role":"Staller","movepool":["airslash","heavyslam","leechseed","protect"]},{"role":"Bulky Setup","movepool":["airslash","autotomize","earthquake","fireblast","heavyslam"]}]},"kartana":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["knockoff","leafblade","sacredsword","smartstrike","swordsdance"]},{"role":"Z-Move user","movepool":["knockoff","leafblade","sacredsword","smartstrike","swordsdance"],"preferredTypes":["Fighting","Grass","Steel"]}]},"guzzlord":{"level":87,"sets":[{"role":"AV Pivot","movepool":["dracometeor","earthquake","fireblast","heavyslam","knockoff"]}]},"necrozma":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","heatwave","moonlight","photongeyser","stealthrock"]},{"role":"Z-Move user","movepool":["calmmind","heatwave","moonlight","photongeyser"],"preferredTypes":["Psychic"]},{"role":"Fast Attacker","movepool":["earthquake","knockoff","photongeyser","swordsdance"]}]},"necrozmaduskmane":{"level":68,"sets":[{"role":"Bulky Setup","movepool":["autotomize","earthquake","knockoff","photongeyser","sunsteelstrike","swordsdance"],"preferredTypes":["Ground"]},{"role":"Z-Move user","movepool":["autotomize","earthquake","knockoff","photongeyser","sunsteelstrike","swordsdance"],"preferredTypes":["Psychic"]}]},"necrozmadawnwings":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["autotomize","calmmind","heatwave","moongeistbeam","photongeyser","signalbeam"]},{"role":"Z-Move user","movepool":["autotomize","calmmind","heatwave","moongeistbeam","photongeyser","signalbeam"]}]},"magearna":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","flashcannon","fleurcannon","shiftgear"]},{"role":"Bulky Support","movepool":["aurasphere","flashcannon","fleurcannon","healbell","painsplit","thunderwave","voltswitch"]},{"role":"Z-Move user","movepool":["aurasphere","fleurcannon","ironhead","shiftgear"],"preferredTypes":["Fairy","Steel"]}]},"marshadow":{"level":70,"sets":[{"role":"Fast Attacker","movepool":["bulkup","closecombat","rocktomb","shadowsneak","spectralthief"]},{"role":"Z-Move user","movepool":["bulkup","closecombat","rocktomb","shadowsneak","spectralthief"]}]},"naganadel":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["dracometeor","fireblast","sludgewave","uturn"]},{"role":"Setup Sweeper","movepool":["dracometeor","fireblast","nastyplot","sludgewave"]},{"role":"Z-Move user","movepool":["dracometeor","fireblast","nastyplot","sludgewave"],"preferredTypes":["Dragon"]}]},"stakataka":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["earthquake","gyroball","stoneedge","superpower","trickroom"]}]},"blacephalon":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["calmmind","fireblast","hiddenpowerice","psyshock","shadowball","trick"]},{"role":"Z-Move user","movepool":["calmmind","fireblast","hiddenpowerice","psyshock","shadowball"],"preferredTypes":["Fire","Ghost"]}]},"zeraora":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["bulkup","closecombat","knockoff","plasmafists"]},{"role":"AV Pivot","movepool":["closecombat","grassknot","hiddenpowerice","knockoff","plasmafists","voltswitch"],"preferredTypes":["Fighting"]}]}} as any;
/* eslint-enable */

export interface BattleFactorySpecies {
	flags: {megaOnly?: 1, zmoveOnly?: 1, limEevee?: 1};
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

export const ZeroAttackHPIVs: {[k: string]: SparseStatsTable} = {
	grass: {hp: 30, spa: 30},
	fire: {spa: 30, spe: 30},
	ice: {def: 30},
	ground: {spa: 30, spd: 30},
	fighting: {def: 30, spa: 30, spd: 30, spe: 30},
	electric: {def: 30, spe: 30},
	psychic: {spe: 30},
	flying: {spa: 30, spd: 30, spe: 30},
	rock: {def: 30, spd: 30, spe: 30},
};

// Moves that restore HP:
const RECOVERY_MOVES = [
	'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'recycle', 'roost', 'shoreup', 'slackoff', 'softboiled', 'strengthsap', 'synthesis',
];
// Moves that drop stats:
const CONTRARY_MOVES = [
	'closecombat', 'leafstorm', 'overheat', 'superpower', 'vcreate',
];
// Moves that boost Attack:
const PHYSICAL_SETUP = [
	'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'meditate', 'poweruppunch', 'screech', 'swordsdance',
];
// Moves which boost Special Attack:
const SPECIAL_SETUP = [
	'calmmind', 'chargebeam', 'geomancy', 'nastyplot', 'quiverdance', 'tailglow',
];
// Moves that boost Attack AND Special Attack:
const MIXED_SETUP = [
	'celebrate', 'growth', 'happyhour', 'holdhands', 'shellsmash', 'workup',
];
// Some moves that only boost Speed:
const SPEED_SETUP = [
	'agility', 'autotomize', 'flamecharge', 'rockpolish',
];
// Conglomerate for ease of access
const SETUP = [
	'acidarmor', 'agility', 'autotomize', 'bellydrum', 'bulkup', 'calmmind', 'celebrate', 'coil', 'conversion', 'curse', 'dragondance',
	'electricterrain', 'flamecharge', 'focusenergy', 'geomancy', 'growth', 'happyhour', 'holdhands', 'honeclaws', 'howl', 'irondefense', 'meditate',
	'nastyplot', 'poweruppunch', 'quiverdance', 'raindance', 'rockpolish', 'shellsmash', 'shiftgear', 'swordsdance', 'tailglow', 'workup',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'accelerock', 'aquajet', 'bulletpunch', 'clearsmog', 'dragontail', 'eruption', 'explosion',
	'fakeout', 'firstimpression', 'flamecharge', 'futuresight', 'iceshard', 'icywind', 'incinerate', 'machpunch', 'nuzzle',
	'pluck', 'poweruppunch', 'pursuit', 'quickattack', 'rapidspin', 'reversal', 'selfdestruct', 'shadowsneak', 'skyattack',
	'skydrop', 'snarl', 'suckerpunch', 'uturn', 'watershuriken', 'vacuumwave', 'voltswitch', 'waterspout',
];
// Hazard-setting moves
const HAZARDS = [
	'spikes', 'stealthrock', 'stickyweb', 'toxicspikes',
];
// Protect and its variants
const PROTECT_MOVES = [
	'banefulbunker', 'kingsshield', 'protect', 'spikyshield',
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
	'aegislash', 'banette', 'breloom', 'cacturne', 'doublade', 'dusknoir', 'golisopod', 'honchkrow', 'mimikyu', 'scizor', 'scizormega', 'shedinja',
];
function sereneGraceBenefits(move: Move) {
	return move.secondary?.chance && move.secondary.chance >= 20 && move.secondary.chance < 100;
}

export class RandomGen7Teams extends RandomGen8Teams {
	randomSets: {[species: string]: RandomTeamsTypes.RandomSpeciesData} = randomSetsJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);

		this.noStab = NO_STAB;
		this.priorityPokemon = PRIORITY_POKEMON;

		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter) => (
				['megahorn', 'pinmissile'].some(m => movePool.includes(m)) ||
				!counter.get('Bug') && (abilities.has('Tinted Lens') || abilities.has('Adaptability'))
			),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
			Dragon: (movePool, moves, abilities, types, counter) => !counter.get('Dragon') && !abilities.has('Aerilate'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fairy: (movePool, moves, abilities, types, counter) => !counter.get('Fairy'),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting'),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Flying') && !['aerodactylmega', 'charizardmegay', 'mantine'].includes(species.id) &&
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
				!counter.get('Psychic') && (
					types.has('Fighting') || movePool.includes('psychicfangs') || movePool.includes('calmmind')
				)
			),
			Rock: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Rock') && (species.baseStats.atk >= 100 || abilities.has('Rock Head'))
			),
			Steel: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Steel') && species.baseStats.atk >= 100
			),
			Water: (movePool, moves, abilities, types, counter) => !counter.get('Water'),
		};
	}

	newQueryMoves(
		moves: Set<string> | null,
		species: Species,
		preferredType: string,
		abilities: Set<string> = new Set(),
	): MoveCounter {
		// This is primarily a helper function for random setbuilder functions.
		const counter = new MoveCounter();
		const types = species.types;
		if (!moves?.size) return counter;

		const categories = {Physical: 0, Special: 0, Status: 0};

		// Iterate through all moves we've chosen so far and keep track of what they do:
		for (const moveid of moves) {
			let move = this.dex.moves.get(moveid);
			// Nature Power calls Earthquake in Gen 5
			if (this.gen === 5 && moveid === 'naturepower') move = this.dex.moves.get('earthquake');
			if (this.gen > 5 && moveid === 'naturepower') move = this.dex.moves.get('triattack');

			const moveType = this.getMoveType(move, species, abilities, preferredType);
			if (move.damage || move.damageCallback) {
				// Moves that do a set amount of damage:
				counter.add('damage');
				counter.damagingMoves.add(move);
			} else {
				// Are Physical/Special/Status moves:
				categories[move.category]++;
			}
			// Moves that have a low base power:
			if (moveid === 'lowkick' || (move.basePower && move.basePower <= 60 && !['nuzzle', 'rapidspin'].includes(moveid))) {
				counter.add('technician');
			}
			// Moves that hit up to 5 times:
			if (move.multihit && Array.isArray(move.multihit) && move.multihit[1] === 5) counter.add('skilllink');
			if (move.recoil || move.hasCrashDamage) counter.add('recoil');
			if (move.drain) counter.add('drain');
			// Moves which have a base power:
			if (move.basePower || move.basePowerCallback) {
				if (!this.noStab.includes(moveid) || this.priorityPokemon.includes(species.id) && move.priority > 0) {
					counter.add(moveType);
					if (types.includes(moveType)) counter.add('stab');
					if (preferredType === moveType) counter.add('preferred');
					counter.damagingMoves.add(move);
				}
				if (move.flags['bite']) counter.add('strongjaw');
				if (move.flags['punch']) counter.add('ironfist');
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
		// Nature Power is Tri Attack this gen
		const statusMoves = this.dex.moves.all()
			.filter(move => move.category === 'Status' && move.id !== 'naturepower')
			.map(move => move.id);

		// General incompatibilities
		const incompatiblePairs = [
			// These moves don't mesh well with other aspects of the set
			[statusMoves, ['healingwish', 'memento', 'switcheroo', 'trick']],
			[PIVOT_MOVES, PIVOT_MOVES],
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
			[['scald', 'surf'], ['hydropump', 'originpulse', 'waterpulse']],
			['return', ['bodyslam', 'doubleedge', 'headbutt']],
			[['fierydance', 'firelash', 'lavaplume'], ['fireblast', 'magmastorm']],
			[['flamethrower', 'flareblitz'], ['fireblast', 'overheat']],
			['hornleech', 'woodhammer'],
			[['gigadrain', 'leafstorm'], ['leafstorm', 'petaldance', 'powerwhip']],
			['wildcharge', 'thunderbolt'],
			['gunkshot', 'poisonjab'],
			[['drainpunch', 'focusblast'], ['closecombat', 'highjumpkick', 'superpower']],
			['stoneedge', 'headsmash'],
			['dracometeor', 'dragonpulse'],
			['dragonclaw', 'outrage'],
			['knockoff', ['darkestlariat', 'darkpulse', 'foulplay']],

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

		// Z-Conversion Porygon-Z
		if (species.id === 'porygonz') {
			this.incompatibleMoves(moves, movePool, 'shadowball', 'recover');
		}
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
		movePool: string[],
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): MoveCounter {
		moves.add(move);
		this.fastPop(movePool, movePool.indexOf(move));
		const counter = this.newQueryMoves(moves, species, preferredType, abilities);
		this.cullMovePool(types, moves, abilities, counter, movePool, teamDetails, species, isLead,
			preferredType, role);
		return counter;
	}

	// Returns the type of a given move for STAB/coverage enforcement purposes
	getMoveType(move: Move, species: Species, abilities: Set<string>, preferredType: string): string {
		if (['judgment', 'multiattack', 'revelationdance'].includes(move.id)) return species.types[0];
		if (species.id === 'genesectdouse' && move.id === 'technoblast') return 'Water';

		const moveType = move.type;
		if (moveType === 'Normal') {
			if (abilities.has('Aerilate')) return 'Flying';
			if (abilities.has('Galvanize')) return 'Electric';
			if (abilities.has('Pixilate')) return 'Fairy';
			if (abilities.has('Refrigerate')) return 'Ice';
		}
		return moveType;
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
			const enforcedMoves = [...PROTECT_MOVES, 'toxic', 'wish'];
			for (const move of enforcedMoves) {
				if (movePool.includes(move)) {
					counter = this.addMove(move, moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
			}
		}

		// Enforce setup
		if (role.includes('Setup') || role === 'Z-Move user') {
			// Prioritise other setup moves over Flame Charge
			const setupMoves = movePool.filter(moveid => SETUP.includes(moveid) && moveid !== 'flamecharge');
			if (setupMoves.length) {
				const moveid = this.sample(setupMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			} else {
				if (movePool.includes('flamecharge')) {
					counter = this.addMove('flamecharge', moves, types, abilities, teamDetails, species, isLead,
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
		if (['Fast Attacker', 'Setup Sweeper', 'Bulky Attacker', 'Wallbreaker', 'Z-Move user'].includes(role)) {
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
		case 'Battle Bond': case 'Dazzling': case 'Flare Boost': case 'Gluttony': case 'Harvest': case 'Hyper Cutter':
		case 'Ice Body': case 'Innards Out': case 'Liquid Voice': case 'Magician': case 'Moody': case 'Pressure':
		case 'Sand Veil': case 'Sniper': case 'Snow Cloak': case 'Steadfast': case 'Weak Armor':
			return true;
		case 'Aerilate': case 'Galvanize': case 'Pixilate': case 'Refrigerate':
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
			// Shadow Punch bit is for Golurk
			return (!counter.get('inaccurate') || moves.has('shadowpunch'));
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
			// Dynamic Punch bit is for Golurk
			return (!counter.get(toID(ability)) || moves.has('dynamicpunch'));
		case 'Lightning Rod':
			return (
				types.has('Ground') || species.id === 'marowakalola' ||
				((!!teamDetails.rain || moves.has('raindance')) && species.id === 'seaking')
			);
		case 'Magic Guard': case 'Speed Boost':
			return (abilities.has('Tinted Lens') && role === 'Wallbreaker');
		case 'Mold Breaker':
			return (
				species.baseSpecies === 'Basculin' || species.id === 'pangoro' || species.id === 'pinsirmega' ||
				abilities.has('Sheer Force')
			);
		case 'Moxie':
			return (!counter.get('Physical') || moves.has('stealthrock') || (!!species.isMega && abilities.has('Intimidate')));
		case 'Oblivious': case 'Prankster':
			return (!counter.get('Status') || (species.id === 'tornadus' && moves.has('bulkup')));
		case 'Overcoat':
			return types.has('Grass');
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Power Construct':
			return species.forme === '10%';
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
			return (
				!counter.get('sheerforce') ||
				moves.has('doubleedge') || abilities.has('Guts') ||
				!!species.isMega
			);
		case 'Simple':
			return !counter.get('setup');
		case 'Slush Rush':
			return !teamDetails.hail;
		case 'Snow Warning':
			// Aurorus
			return moves.has('hypervoice');
		case 'Solar Power':
			return (!counter.get('Special') || !teamDetails.sun || !!species.isMega);
		case 'Sturdy':
			return (!!counter.get('recoil') && !counter.get('recovery') ||
				(species.id === 'steelix' && role === 'Wallbreaker'));
		case 'Swarm':
			return ((!counter.get('Bug') && !moves.has('uturn')) || !!species.isMega);
		case 'Technician':
			return (!counter.get('technician') || moves.has('tailslap') || !!species.isMega || species.id === 'persianalola');
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
		if (species.id === 'gurdurr' || (
			abilities.has('Guts') &&
			!abilities.has('Quick Feet') &&
			(moves.has('facade') || (moves.has('sleeptalk') && moves.has('rest')))
		)) return 'Guts';

		if (species.id === 'starmie') return role === 'Wallbreaker' ? 'Analytic' : 'Natural Cure';
		if (species.id === 'beheeyem') return 'Analytic';
		if (species.id === 'drampa' && moves.has('roost')) return 'Berserk';
		if (species.id === 'ninetales') return 'Drought';
		if (species.baseSpecies === 'Gourgeist') return 'Frisk';
		if (species.id === 'talonflame' && role === 'Z-Move user') return 'Gale Wings';
		if (species.id === 'golemalola' && moves.has('return')) return 'Galvanize';
		if (species.id === 'raticatealola') return 'Hustle';
		if (species.id === 'ninjask' || species.id === 'seviper') return 'Infiltrator';
		if (species.id === 'arcanine' || species.id === 'stantler') return 'Intimidate';
		if (species.id === 'lucariomega') return 'Justified';
		if (species.id === 'toucannon' && !counter.get('sheerforce') && !counter.get('skilllink')) return 'Keen Eye';
		if (species.id === 'persian' && !counter.get('technician')) return 'Limber';
		if (species.baseSpecies === 'Altaria') return 'Natural Cure';
		// If Ambipom doesn't qualify for Technician, Skill Link is useless on it
		if (species.id === 'ambipom' && !counter.get('technician')) return 'Pickup';
		if (species.id === 'muk') return 'Poison Touch';
		if (['dusknoir', 'raikou', 'suicune', 'vespiquen'].includes(species.id)) return 'Pressure';
		if (species.id === 'tsareena') return 'Queenly Majesty';
		if (species.id === 'druddigon' && role === 'Bulky Support') return 'Rough Skin';
		if (species.id === 'zebstrika') return moves.has('wildcharge') ? 'Sap Sipper' : 'Lightning Rod';
		if (species.id === 'stoutland' || species.id === 'pangoro' && !counter.get('ironfist')) return 'Scrappy';
		if (species.baseSpecies === 'Sawsbuck' && moves.has('headbutt')) return 'Serene Grace';
		if (species.id === 'octillery') return 'Sniper';
		if (species.id === 'kommoo' && role === 'Z-Move user') return 'Soundproof';
		if (species.id === 'stunfisk') return 'Static';
		if (species.id === 'breloom') return 'Technician';
		if (species.id === 'zangoose') return 'Toxic Boost';
		if (counter.get('setup') && (species.id === 'magcargo' || species.id === 'kabutops')) return 'Weak Armor';

		if (abilities.has('Gluttony') && (moves.has('recycle') || moves.has('bellydrum'))) return 'Gluttony';
		if (abilities.has('Harvest') && (role === 'Bulky Support' || role === 'Staller')) return 'Harvest';
		if (abilities.has('Moxie') && (moves.has('bounce') || moves.has('fly'))) return 'Moxie';
		if (abilities.has('Regenerator') && role === 'AV Pivot') return 'Regenerator';
		if (abilities.has('Shed Skin') && moves.has('rest') && !moves.has('sleeptalk')) return 'Shed Skin';
		if (abilities.has('Sniper') && moves.has('focusenergy')) return 'Sniper';
		if (abilities.has('Unburden') && ['acrobatics', 'bellydrum', 'closecombat'].some(m => moves.has(m))) return 'Unburden';

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
		// Z-Moves
		if (role === 'Z-Move user') {
			// Specific Z-Crystals
			if (species.baseSpecies === 'Arceus' && species.requiredItems) return species.requiredItems[1];
			if (species.name === 'Raichu-Alola') return 'Aloraichium Z';
			if (species.name === 'Decidueye') return 'Decidium Z';
			if (species.name === 'Kommo-o') return 'Kommonium Z';
			if (species.name === 'Lunala') return 'Lunalium Z';
			if (species.baseSpecies === 'Lycanroc') return 'Lycanium Z';
			if (species.name === 'Marshadow') return 'Marshadium Z';
			if (species.name === 'Mew') return 'Mewnium Z';
			if (species.name === 'Mimikyu') return 'Mimikium Z';
			if (species.name === 'Necrozma-Dusk-Mane' || species.name === 'Necrozma-Dawn-Wings') {
				if (moves.has('autotomize') && moves.has('sunsteelstrike')) return 'Solganium Z';
				if (moves.has('autotomize') && moves.has('moongeistbeam')) return 'Lunalium Z';
				return 'Ultranecrozium Z';
			}
			// General Z-Crystals
			if (preferredType === 'Normal') return 'Normalium Z';
			if (preferredType) return this.dex.species.get(`Arceus-${preferredType}`).requiredItems![1];
		}
		if (species.requiredItems) {
			if (species.baseSpecies === 'Arceus') return species.requiredItems[0];
			return this.sample(species.requiredItems);
		}
		if (role === 'AV Pivot') return 'Assault Vest';
		if (species.name === 'Farfetch\u2019d') return 'Stick';
		if (species.baseSpecies === 'Marowak') return 'Thick Club';
		if (species.name === 'Pikachu') return 'Light Ball';
		if (species.name === 'Shedinja' || species.name === 'Smeargle') return 'Focus Sash';
		if (species.name === 'Unfezant' || moves.has('focusenergy')) return 'Scope Lens';
		if (species.name === 'Unown') return 'Choice Specs';
		if (species.name === 'Wobbuffet') return 'Custap Berry';
		if (species.name === 'Shuckle') return 'Mental Herb';
		if (
			ability === 'Harvest' || ability === 'Cheek Pouch' || (ability === 'Emergency Exit' && !!counter.get('Status'))
		) return 'Sitrus Berry';
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
		if (moves.has('bellydrum') || moves.has('recycle')) {
			if (ability === 'Gluttony') {
				return `${this.sample(['Aguav', 'Figy', 'Iapapa', 'Mago', 'Wiki'])} Berry`;
			} else {
				return 'Sitrus Berry';
			}
		}
		if (moves.has('waterspout')) return 'Choice Scarf';
		if (moves.has('geomancy') || moves.has('skyattack')) return 'Power Herb';
		if (moves.has('shellsmash')) {
			return (ability === 'Solid Rock' && !!counter.get('priority')) ? 'Weakness Policy' : 'White Herb';
		}
		if ((ability === 'Guts' || moves.has('facade')) && !moves.has('sleeptalk')) {
			return (types.includes('Fire') || ability === 'Quick Feet' || ability === 'Toxic Boost') ? 'Toxic Orb' : 'Flame Orb';
		}
		if (ability === 'Magic Guard' && role !== 'Bulky Support') {
			return moves.has('counter') ? 'Focus Sash' : 'Life Orb';
		}
		if (species.id === 'rampardos' && role === 'Fast Attacker') return 'Choice Scarf';
		if (ability === 'Sheer Force' && counter.get('sheerforce')) return 'Life Orb';
		if (ability === 'Unburden') return moves.has('closecombat') ? 'White Herb' : 'Sitrus Berry';
		if (moves.has('acrobatics')) return '';
		if (moves.has('auroraveil') || moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
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
		if (species.id === 'latias' || species.id === 'latios') return 'Soul Dew';
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
			ability !== 'Levitate' && species.id !== 'golemalola'
		) {
			return 'Air Balloon';
		}
		if (
			(role === 'Fast Support' || moves.has('stickyweb')) && isLead && defensiveStatTotal < 255 &&
			!counter.get('recovery') && !moves.has('defog') && (!counter.get('recoil') || ability === 'Rock Head') &&
			ability !== 'Regenerator'
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
			(this.dex.getEffectiveness('Rock', species) < 2 || species.id === 'ninjask') &&
			ability !== 'Sturdy'
		) return 'Life Orb';
		return 'Leftovers';
	}

	getLevel(species: Species): number {
		// level set by rules
		if (this.adjustLevel) return this.adjustLevel;
		if (this.gen >= 2) {
			// Revamped generations use random-sets.json
			const sets = this.randomSets[species.id];
			if (sets.level) return sets.level;
		} else {
			// Other generations use random-data.json
			const data = this.randomData[species.id];
			if (data.level) return data.level;
		}
		// Gen 2 still uses tier-based levelling
		if (this.gen === 2) {
			const levelScale: {[k: string]: number} = {
				ZU: 81,
				ZUBL: 79,
				PU: 77,
				PUBL: 75,
				NU: 73,
				NUBL: 71,
				UU: 69,
				UUBL: 67,
				OU: 65,
				Uber: 61,
			};
			if (levelScale[species.tier]) return levelScale[species.tier];
		}
		// Default to 80
		return 80;
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
		// Check if the Pokemon has a Z-Move user set
		let canZMove = false;
		for (const set of sets) {
			if (!teamDetails.zMove && set.role === 'Z-Move user') canZMove = true;
		}
		for (const set of sets) {
			// Prevent multiple Z-Move users
			if (teamDetails.zMove && set.role === 'Z-Move user') continue;
			// Prevent Setup Sweeper and Bulky Setup if Z-Move user is available
			if (canZMove && ['Setup Sweeper', 'Bulky Setup'].includes(set.role)) continue;
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

		// Minimize confusion damage, including if Foul Play is its only physical attack
		if (
			(!counter.get('Physical') || (counter.get('Physical') <= 1 && moves.has('foulplay'))) &&
			!moves.has('copycat') && !moves.has('transform')
		) {
			evs.atk = 0;
			ivs.atk = 0;
		}

		if (ability === 'Beast Boost' && !counter.get('Special')) {
			evs.spa = 0;
			ivs.spa = 0;
		}

		// We use a special variable to track Hidden Power
		// so that we can check for all Hidden Powers at once
		let hasHiddenPower = false;
		for (const move of moves) {
			if (move.startsWith('hiddenpower')) hasHiddenPower = true;
		}

		// Fix IVs for non-Bottle Cap-able sets
		if (hasHiddenPower && level < 100) {
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
		let srWeakness = srImmunity ? 0 : this.dex.getEffectiveness('Rock', species);
		// Crash damage move users want an odd HP to survive two misses
		if (['highjumpkick', 'jumpkick'].some(m => moves.has(m))) srWeakness = 2;
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if (moves.has('substitute') && !['Black Sludge', 'Leftovers'].includes(item)) {
				if (item === 'Sitrus Berry' || ability === 'Power Construct') {
					// Two Substitutes should activate Sitrus Berry or Power Construct
					if (hp % 4 === 0) break;
				} else {
					// Should be able to use Substitute four times from full HP without fainting
					if (hp % 4 > 0) break;
				}
			} else if (moves.has('bellydrum') && (item === 'Sitrus Berry' || ability === 'Gluttony')) {
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
			ivs.spe = (hasHiddenPower && level < 100) ? ivs.spe - 30 : 0;
		}

		// shuffle moves to add more randomness to camomons
		const shuffledMoves = Array.from(moves);
		this.prng.shuffle(shuffledMoves);

		// Z-Conversion Porygon-Z should have Shadow Ball first if no Recover, otherwise Thunderbolt
		if (species.id === 'porygonz' && role === 'Z-Move user') {
			const firstMove = (moves.has('shadowball') ? 'shadowball' : 'thunderbolt');
			this.fastPop(shuffledMoves, shuffledMoves.indexOf(firstMove));
			shuffledMoves.unshift(firstMove);
		}
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
		let hasMega = false;

		const typeCount: {[k: string]: number} = {};
		const typeComboCount: {[k: string]: number} = {};
		const typeWeaknesses: {[k: string]: number} = {};
		const typeDoubleWeaknesses: {[k: string]: number} = {};
		const teamDetails: RandomTeamsTypes.TeamDetails = {};
		let numMaxLevelPokemon = 0;

		// We make at most two passes through the potential Pokemon pool when creating a team - if the first pass doesn't
		// result in a team of six Pokemon we perform a second iteration relaxing as many restrictions as possible.
		for (const restrict of [true, false]) {
			if (pokemon.length >= this.maxTeamSize) break;

			const pokemonList = Object.keys(this.randomSets);
			const [pokemonPool, baseSpeciesPool] = this.getPokemonPool(type, pokemon, isMonotype, pokemonList);
			while (baseSpeciesPool.length && pokemon.length < this.maxTeamSize) {
				const baseSpecies = this.sampleNoReplace(baseSpeciesPool);
				const currentSpeciesPool: Species[] = [];
				// Check if the base species has a mega forme available
				let canMega = false;
				for (const poke of pokemonPool[baseSpecies]) {
					const species = this.dex.species.get(poke);
					if (!hasMega && species.isMega) canMega = true;
				}
				for (const poke of pokemonPool[baseSpecies]) {
					const species = this.dex.species.get(poke);
					// Prevent multiple megas
					if (hasMega && species.isMega) continue;
					// Prevent base forme, if a mega is available
					if (canMega && !species.isMega) continue;
					currentSpeciesPool.push(species);
				}
				const species = this.sample(currentSpeciesPool);

				if (!species.exists) continue;

				// Limit to one of each species (Species Clause)
				if (baseFormes[species.baseSpecies]) continue;

				// Limit one Mega per team
				if (hasMega && species.isMega) continue;

				const types = species.types;
				const typeCombo = types.slice().sort().join();
				const weakToFreezeDry = (
					this.dex.getEffectiveness('Ice', species) > 0 ||
					(this.dex.getEffectiveness('Ice', species) > -2 && types.includes('Water'))
				);
				// Dynamically scale limits for different team sizes. The default and minimum value is 1.
				const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

				if (restrict) {
					if (!isMonotype && !this.forceMonotype) {
						// Limit two of any type
						let skip = false;
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
							if (this.dex.getEffectiveness(typeName, species) > 0) {
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
						if (!this.adjustLevel && (this.getLevel(species) === 100) && numMaxLevelPokemon >= limitFactor) {
							continue;
						}
					}

					// Limit three of any type combination in Monotype
					if (!this.forceMonotype && isMonotype && (typeComboCount[typeCombo] >= 3 * limitFactor)) continue;
				}

				const set = this.randomSet(
					species,
					teamDetails,
					pokemon.length === this.maxTeamSize - 1
				);

				const item = this.dex.items.get(set.item);

				// Limit one Z-Move per team
				if (item.zMove && teamDetails.zMove) continue;

				// Zoroark copies the last Pokemon and should not be generated in that slot
				if (set.ability === 'Illusion' && pokemon.length < 1) continue;

				// Okay, the set passes, add it to our team
				pokemon.unshift(set);

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
				if (item.megaStone || species.name === 'Rayquaza-Mega') hasMega = true;
				if (item.zMove) teamDetails.zMove = 1;
				if (set.ability === 'Snow Warning' || set.moves.includes('hail')) teamDetails.hail = 1;
				if (set.moves.includes('raindance') || set.ability === 'Drizzle' && !item.onPrimal) teamDetails.rain = 1;
				if (set.ability === 'Sand Stream') teamDetails.sand = 1;
				if (set.moves.includes('sunnyday') || set.ability === 'Drought' && !item.onPrimal) teamDetails.sun = 1;
				if (set.moves.includes('spikes')) teamDetails.spikes = (teamDetails.spikes || 0) + 1;
				if (set.moves.includes('stealthrock')) teamDetails.stealthRock = 1;
				if (set.moves.includes('stickyweb')) teamDetails.stickyWeb = 1;
				if (set.moves.includes('toxicspikes')) teamDetails.toxicSpikes = 1;
				if (set.moves.includes('defog')) teamDetails.defog = 1;
				if (set.moves.includes('rapidspin')) teamDetails.rapidSpin = 1;
				if (set.moves.includes('auroraveil') || (set.moves.includes('reflect') && set.moves.includes('lightscreen'))) {
					teamDetails.screens = 1;
				}
			}
		}
		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}

		return pokemon;
	}

	randomFactorySets: {[format: string]: {[species: string]: BattleFactorySpecies}} = {};

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
		const weatherAbilitiesRequire: {[k: string]: string} = {
			hydration: 'raindance', swiftswim: 'raindance',
			leafguard: 'sunnyday', solarpower: 'sunnyday', chlorophyll: 'sunnyday',
			sandforce: 'sandstorm', sandrush: 'sandstorm', sandveil: 'sandstorm',
			slushrush: 'hail', snowcloak: 'hail',
		};
		const weatherAbilities = ['drizzle', 'drought', 'snowwarning', 'sandstream'];

		// Build a pool of eligible sets, given the team partners
		// Also keep track of sets with moves the team requires
		let effectivePool: {set: AnyObject, moveVariants?: number[], item?: string, ability?: string}[] = [];
		const priorityPool = [];
		for (const curSet of setList) {
			if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			// reject disallowed items
			const allowedItems: string[] = [];
			for (const itemString of curSet.item) {
				const item = this.dex.items.get(itemString);
				if (teamData.megaCount && teamData.megaCount > 0 && item.megaStone) continue; // reject 2+ mega stones
				if (teamData.zCount && teamData.zCount > 0 && item.zMove) continue; // reject 2+ Z stones
				if (itemsMax[item.id] && teamData.has[item.id] >= itemsMax[item.id]) continue; // reject 2+ same choice item
				allowedItems.push(itemString);
			}
			if (allowedItems.length === 0) continue;
			const curSetItem = this.sample(allowedItems);

			// reject bad weather abilities
			const allowedAbilities: string[] = [];
			for (const abilityString of curSet.ability) {
				const ability = this.dex.abilities.get(abilityString);
				if (weatherAbilitiesRequire[ability.id] && teamData.weather !== weatherAbilitiesRequire[ability.id]) continue;
				if (teamData.weather && weatherAbilities.includes(ability.id)) continue; // reject 2+ weather setters
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

			const fullSetSpec = {set: curSet, moveVariants: curSetVariants, item: curSetItem, ability: curSetAbility};
			effectivePool.push(fullSetSpec);
			if (hasRequiredMove) priorityPool.push(fullSetSpec);
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
			evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, ...setData.set.evs},
			ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...setData.set.ivs},
			nature: nature || 'Serious',
			moves,
		};
	}

	randomFactoryTeam(side: PlayerOptions, depth = 0): RandomTeamsTypes.RandomFactorySet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const forceResult = (depth >= 12);
		const isMonotype = !!this.forceMonotype || this.dex.formats.getRuleTable(this.format).has('sametypeclause');

		// The teams generated depend on the tier choice in such a way that
		// no exploitable information is leaked from rolling the tier in getTeam(p1).
		if (!this.factoryTier) {
			this.factoryTier = isMonotype ? 'Mono' : this.sample(['Uber', 'OU', 'UU', 'RU', 'NU', 'PU', 'LC']);
		} else if (isMonotype && this.factoryTier !== 'Mono') {
			// I don't think this can ever happen?
			throw new Error(`Can't generate a Monotype Battle Factory set in a battle with factory tier ${this.factoryTier}`);
		}

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

		const typePool = this.dex.types.names();
		const type = this.sample(typePool);

		const teamData: TeamData = {
			typeCount: {}, typeComboCount: {}, baseFormes: {}, megaCount: 0, zCount: 0,
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

			const speciesFlags = this.randomFactorySets[this.factoryTier][species.id].flags;

			// Limit to one of each species (Species Clause)
			if (teamData.baseFormes[species.baseSpecies]) continue;

			// Limit the number of Megas to one
			if (!teamData.megaCount) teamData.megaCount = 0;
			if (teamData.megaCount >= 1 && speciesFlags.megaOnly) continue;

			const set = this.randomFactorySet(species, teamData, this.factoryTier);
			if (!set) continue;

			const itemData = this.dex.items.get(set.item);

			// Actually limit the number of Megas to one
			if (teamData.megaCount >= 1 && itemData.megaStone) continue;

			// Limit the number of Z moves to one
			if (teamData.zCount && teamData.zCount >= 1 && itemData.zMove) continue;

			let types = species.types;
			// Dynamically scale limits for different team sizes. The default and minimum value is 1.
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

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
			} else {
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

			if (itemData.megaStone) teamData.megaCount++;
			if (itemData.zMove) {
				if (!teamData.zCount) teamData.zCount = 0;
				teamData.zCount++;
			}
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
		// const flags = this.randomBSSFactorySets[tier][id].flags;
		const setList = this.randomBSSFactorySets[id].sets;

		const movesMax: {[k: string]: number} = {
			batonpass: 1,
			stealthrock: 1,
			spikes: 1,
			toxicspikes: 1,
			doubleedge: 1,
			trickroom: 1,
		};
		const requiredMoves: {[k: string]: number} = {};
		const weatherAbilitiesRequire: {[k: string]: string} = {
			swiftswim: 'raindance',
			sandrush: 'sandstorm', sandveil: 'sandstorm',
		};
		const weatherAbilities = ['drizzle', 'drought', 'snowwarning', 'sandstream'];

		// Build a pool of eligible sets, given the team partners
		// Also keep track of sets with moves the team requires
		let effectivePool: {set: AnyObject, moveVariants?: number[], itemVariants?: number, abilityVariants?: number}[] = [];
		const priorityPool = [];
		for (const curSet of setList) {
			if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			const item = this.dex.items.get(curSet.item);
			if (teamData.megaCount && teamData.megaCount > 1 && item.megaStone) continue; // reject 3+ mega stones
			if (teamData.zCount && teamData.zCount > 1 && item.zMove) continue; // reject 3+ Z stones
			if (teamData.has[item.id]) continue; // Item clause

			const ability = this.dex.abilities.get(curSet.ability);
			if (weatherAbilitiesRequire[ability.id] && teamData.weather !== weatherAbilitiesRequire[ability.id]) continue;
			if (teamData.weather && weatherAbilities.includes(ability.id)) continue; // reject 2+ weather setters

			if (curSet.species === 'Aron' && teamData.weather !== 'sandstorm') continue; // reject Aron without a Sand Stream user

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
			name: setData.set.nickname || setData.set.name || species.baseSpecies,
			species: setData.set.species,
			gender: setData.set.gender || species.gender || (this.randomChance(1, 2) ? 'M' : 'F'),
			item: this.sampleIfArray(setData.set.item) || '',
			ability: setData.set.ability || species.abilities['0'],
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
			typeCount: {}, typeComboCount: {}, baseFormes: {}, megaCount: 0, zCount: 0,
			eeveeLimCount: 0, has: {}, forceResult, weaknesses: {}, resistances: {},
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
			const species = this.dex.species.get(this.sampleNoReplace(pokemonPool));
			if (!species.exists) continue;

			const speciesFlags = this.randomBSSFactorySets[species.id].flags;
			if (!teamData.megaCount) teamData.megaCount = 0;

			// Limit to one of each species (Species Clause)
			if (teamData.baseFormes[species.baseSpecies]) continue;

			// Limit the number of Megas + Z-moves to 3
			if (teamData.megaCount + (teamData.zCount ? teamData.zCount : 0) >= 3 && speciesFlags.megaOnly) continue;

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

			// Restrict Eevee with certain Pokemon
			if (speciesFlags.limEevee) {
				if (!teamData.eeveeLimCount) teamData.eeveeLimCount = 0;
				teamData.eeveeLimCount++;
			}
			if (teamData.eeveeLimCount && teamData.eeveeLimCount >= 1 && speciesFlags.limEevee) continue;

			const set = this.randomBSSFactorySet(species, teamData);
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

			// Limit Mega and Z-move
			const itemData = this.dex.items.get(set.item);
			if (itemData.megaStone) teamData.megaCount++;
			if (itemData.zMove) {
				if (!teamData.zCount) teamData.zCount = 0;
				teamData.zCount++;
			}
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
}

export default RandomGen7Teams;
