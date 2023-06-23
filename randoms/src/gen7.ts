import {MoveCounter, OldRandomBattleSpecies, RandomGen8Teams, TeamData} from './gen8';
import {Utils} from './utils';
import {
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
const randomDataJSON = {"venusaur":{"level":84,"moves":["gigadrain","leechseed","sleeppowder","sludgebomb","substitute"],"doublesMoves":["gigadrain","hiddenpowerfire","hiddenpowerice","powerwhip","protect","sleeppowder","sludgebomb"]},"venusaurmega":{"level":82,"moves":["earthquake","gigadrain","hiddenpowerfire","sleeppowder","sludgebomb","synthesis"],"doublesMoves":["gigadrain","hiddenpowerfire","hiddenpowerice","powerwhip","protect","sleeppowder","sludgebomb"]},"charizard":{"level":86,"moves":["airslash","earthquake","fireblast","holdhands","roost"],"doublesMoves":["airslash","fireblast","focusblast","heatwave","holdhands","protect","roost"]},"charizardmegax":{"level":79,"moves":["dragonclaw","dragondance","earthquake","flareblitz","roost","willowisp"],"doublesMoves":["dragonclaw","dragondance","flareblitz","rockslide","roost","thunderpunch"]},"charizardmegay":{"level":79,"moves":["airslash","dragonpulse","fireblast","focusblast","roost","solarbeam"],"doublesMoves":["airslash","fireblast","focusblast","heatwave","protect","solarbeam"]},"blastoise":{"level":86,"moves":["dragontail","icebeam","rapidspin","roar","scald","toxic"],"doublesMoves":["fakeout","followme","icywind","muddywater","protect","rapidspin","scald"]},"blastoisemega":{"level":84,"moves":["aurasphere","darkpulse","icebeam","rapidspin","waterpulse"],"doublesMoves":["aurasphere","darkpulse","fakeout","icebeam","muddywater","protect","waterpulse"]},"butterfree":{"level":88,"moves":["airslash","bugbuzz","energyball","quiverdance","sleeppowder"],"doublesMoves":["airslash","bugbuzz","protect","quiverdance","sleeppowder"]},"beedrill":{"level":89,"moves":["endeavor","knockoff","poisonjab","tailwind","toxicspikes","uturn"],"doublesMoves":["knockoff","poisonjab","protect","tailwind","toxicspikes","uturn"]},"beedrillmega":{"level":81,"moves":["drillrun","knockoff","poisonjab","swordsdance","uturn","xscissor"],"doublesMoves":["drillrun","knockoff","poisonjab","protect","uturn","xscissor"]},"pidgeot":{"level":88,"moves":["bravebird","defog","heatwave","return","roost","uturn"],"doublesMoves":["bravebird","doubleedge","heatwave","protect","return","tailwind","uturn"]},"pidgeotmega":{"level":81,"moves":["defog","heatwave","hurricane","roost","uturn"],"doublesMoves":["heatwave","hurricane","protect","tailwind","uturn"]},"raticate":{"level":88,"moves":["facade","protect","stompingtantrum","suckerpunch","swordsdance","uturn"],"doublesMoves":["crunch","facade","protect","stompingtantrum","suckerpunch","uturn"]},"raticatealola":{"level":88,"moves":["doubleedge","knockoff","return","suckerpunch","swordsdance"],"doublesMoves":["doubleedge","knockoff","protect","suckerpunch","uturn"]},"fearow":{"level":88,"moves":["doubleedge","drillpeck","drillrun","pursuit","return","uturn"],"doublesMoves":["doubleedge","drillpeck","drillrun","protect","quickattack","return","uturn"]},"arbok":{"level":88,"moves":["aquatail","coil","earthquake","gunkshot","rest","suckerpunch"],"doublesMoves":["aquatail","coil","gunkshot","protect","stompingtantrum","suckerpunch"]},"pikachu":{"level":92,"moves":["extremespeed","grassknot","hiddenpowerice","knockoff","surf","voltswitch","volttackle"],"doublesMoves":["encore","fakeout","grassknot","hiddenpowerice","knockoff","protect","voltswitch","volttackle"]},"raichu":{"level":88,"moves":["encore","focusblast","grassknot","hiddenpowerice","nastyplot","thunderbolt","voltswitch"],"doublesMoves":["encore","fakeout","focusblast","grassknot","hiddenpowerice","protect","thunderbolt","voltswitch"]},"raichualola":{"level":87,"moves":["focusblast","nastyplot","psyshock","surf","thunderbolt","voltswitch"],"doublesMoves":["fakeout","grassknot","nastyplot","protect","psyshock","thunderbolt","voltswitch"]},"sandslash":{"level":89,"moves":["earthquake","knockoff","rapidspin","stealthrock","stoneedge","swordsdance","toxic"],"doublesMoves":["earthquake","knockoff","protect","stealthrock","stoneedge","swordsdance"]},"sandslashalola":{"level":90,"moves":["earthquake","iciclecrash","ironhead","knockoff","rapidspin","stealthrock","swordsdance"],"doublesMoves":["drillrun","iciclecrash","ironhead","protect","swordsdance"]},"nidoqueen":{"level":84,"moves":["earthpower","fireblast","icebeam","sludgewave","stealthrock","toxicspikes"],"doublesMoves":["earthpower","icebeam","protect","sludgebomb","stealthrock"]},"nidoking":{"level":82,"moves":["earthpower","fireblast","icebeam","sludgewave","substitute","superpower"],"doublesMoves":["earthpower","fireblast","icebeam","protect","sludgebomb"]},"clefable":{"level":81,"moves":["calmmind","fireblast","moonblast","softboiled","stealthrock","thunderwave"],"doublesMoves":["dazzlinggleam","fireblast","followme","helpinghand","moonblast","protect","softboiled","thunderwave"]},"ninetales":{"level":84,"moves":["fireblast","hiddenpowerice","nastyplot","solarbeam","substitute","willowisp"],"doublesMoves":["fireblast","heatwave","nastyplot","protect","solarbeam","willowisp"]},"ninetalesalola":{"level":82,"moves":["auroraveil","blizzard","freezedry","hiddenpowerfire","moonblast","nastyplot"],"doublesMoves":["auroraveil","blizzard","encore","freezedry","hiddenpowerfire","moonblast","protect"]},"wigglytuff":{"level":88,"moves":["dazzlinggleam","fireblast","healbell","lightscreen","reflect","stealthrock"],"doublesMoves":["dazzlinggleam","fireblast","hypervoice","protect","stealthrock","thunderwave"]},"vileplume":{"level":87,"moves":["aromatherapy","gigadrain","hiddenpowerfire","sleeppowder","sludgebomb","strengthsap"],"doublesMoves":["energyball","hiddenpowerfire","protect","sleeppowder","sludgebomb","strengthsap"]},"parasect":{"level":91,"moves":["knockoff","leechlife","leechseed","seedbomb","spore","substitute"],"doublesMoves":["knockoff","leechlife","leechseed","protect","ragepowder","seedbomb","spore","wideguard"]},"venomoth":{"level":84,"moves":["bugbuzz","quiverdance","sleeppowder","sludgebomb","substitute"],"doublesMoves":["bugbuzz","protect","quiverdance","ragepowder","sleeppowder","sludgebomb"]},"dugtrio":{"level":82,"moves":["earthquake","reversal","stealthrock","stoneedge","substitute","suckerpunch"],"doublesMoves":["earthquake","protect","rockslide","stoneedge","suckerpunch"]},"dugtrioalola":{"level":88,"moves":["earthquake","ironhead","stealthrock","stoneedge","substitute","suckerpunch","toxic"],"doublesMoves":["earthquake","ironhead","protect","rockslide","stoneedge","suckerpunch"]},"persian":{"level":88,"moves":["fakeout","knockoff","return","taunt","uturn"],"doublesMoves":["fakeout","hypnosis","knockoff","protect","return","taunt","uturn"]},"persianalola":{"level":87,"moves":["darkpulse","hypnosis","nastyplot","powergem","thunderbolt"],"doublesMoves":["fakeout","foulplay","hiddenpowerfighting","icywind","partingshot","protect","snarl"]},"golduck":{"level":88,"moves":["calmmind","encore","hydropump","icebeam","psyshock","scald","substitute"],"doublesMoves":["calmmind","encore","focusblast","hydropump","icebeam","protect","scald"]},"primeape":{"level":88,"moves":["closecombat","earthquake","gunkshot","icepunch","stoneedge","uturn"],"doublesMoves":["closecombat","icepunch","poisonjab","protect","rockslide","stompingtantrum","stoneedge","taunt","uturn"]},"arcanine":{"level":84,"moves":["closecombat","extremespeed","flareblitz","morningsun","roar","toxic","wildcharge","willowisp"],"doublesMoves":["closecombat","extremespeed","flareblitz","protect","snarl","wildcharge","willowisp"]},"poliwrath":{"level":88,"moves":["circlethrow","focusblast","hydropump","icepunch","raindance","rest","scald","sleeptalk"],"doublesMoves":["circlethrow","encore","icywind","protect","scald","superpower","toxic"]},"alakazam":{"level":82,"moves":["counter","focusblast","hiddenpowerfire","psychic","psyshock","shadowball"],"doublesMoves":["dazzlinggleam","encore","focusblast","protect","psychic","shadowball"]},"alakazammega":{"level":80,"moves":["calmmind","encore","focusblast","psychic","psyshock","shadowball","substitute"],"doublesMoves":["calmmind","encore","focusblast","protect","psychic","shadowball"]},"machamp":{"level":84,"moves":["bulletpunch","closecombat","dynamicpunch","facade","knockoff","stoneedge"],"doublesMoves":["bulletpunch","closecombat","facade","knockoff","protect","stoneedge","wideguard"]},"victreebel":{"level":89,"moves":["hiddenpowerfire","poisonjab","powerwhip","sleeppowder","sludgebomb","strengthsap","suckerpunch","swordsdance"],"doublesMoves":["growth","knockoff","powerwhip","protect","sleeppowder","sludgebomb","solarbeam","suckerpunch","sunnyday","weatherball"]},"tentacruel":{"level":82,"moves":["acidspray","knockoff","rapidspin","scald","sludgebomb","toxicspikes"],"doublesMoves":["acidspray","knockoff","muddywater","protect","rapidspin","scald","sludgebomb"]},"golem":{"level":87,"moves":["earthquake","explosion","stealthrock","stoneedge","suckerpunch","toxic"],"doublesMoves":["earthquake","protect","rockslide","stealthrock","stoneedge","suckerpunch"]},"golemalola":{"level":88,"moves":["earthquake","firepunch","stealthrock","stoneedge","wildcharge"],"doublesMoves":["doubleedge","protect","rockslide","stealthrock","stompingtantrum","stoneedge"]},"rapidash":{"level":88,"moves":["flareblitz","highhorsepower","morningsun","wildcharge","willowisp"],"doublesMoves":["flareblitz","highhorsepower","hypnosis","protect","wildcharge","willowisp"]},"slowbro":{"level":84,"moves":["fireblast","icebeam","psyshock","scald","slackoff","thunderwave","toxic"],"doublesMoves":["protect","psychic","psyshock","scald","slackoff","thunderwave","toxic"]},"slowbromega":{"level":84,"moves":["calmmind","fireblast","psyshock","scald","slackoff"],"doublesMoves":["fireblast","icebeam","protect","psychic","psyshock","scald","slackoff","trickroom"]},"farfetchd":{"level":94,"moves":["bravebird","knockoff","leafblade","return","swordsdance"],"doublesMoves":["bravebird","knockoff","leafblade","protect","return","swordsdance"]},"dodrio":{"level":86,"moves":["bravebird","jumpkick","knockoff","quickattack","return","swordsdance"],"doublesMoves":["bravebird","knockoff","protect","quickattack","return","swordsdance"]},"dewgong":{"level":89,"moves":["encore","icebeam","perishsong","protect","surf","toxic"],"doublesMoves":["encore","fakeout","helpinghand","icebeam","icywind","liquidation","protect","toxic"]},"muk":{"level":88,"moves":["curse","firepunch","gunkshot","icepunch","memento","poisonjab","shadowsneak"],"doublesMoves":["firepunch","gunkshot","icepunch","poisonjab","protect","shadowsneak"]},"mukalola":{"level":82,"moves":["curse","firepunch","gunkshot","icepunch","knockoff","poisonjab","pursuit","shadowsneak"],"doublesMoves":["gunkshot","knockoff","poisonjab","protect","shadowsneak","snarl","stoneedge"]},"cloyster":{"level":82,"moves":["hydropump","iciclespear","rapidspin","rockblast","shellsmash","spikes"],"doublesMoves":["hydropump","iciclespear","protect","rockblast","shellsmash"]},"gengar":{"level":82,"moves":["disable","focusblast","painsplit","shadowball","sludgewave","substitute","willowisp"],"doublesMoves":["focusblast","protect","shadowball","sludgebomb","taunt","willowisp"]},"gengarmega":{"level":77,"moves":["destinybond","disable","focusblast","perishsong","protect","shadowball","sludgewave","taunt"],"doublesMoves":["disable","focusblast","hypnosis","protect","shadowball","sludgebomb","willowisp"]},"hypno":{"level":90,"moves":["foulplay","protect","psychic","seismictoss","thunderwave","toxic","wish"],"doublesMoves":["hypnosis","protect","psychic","seismictoss","thunderwave"]},"kingler":{"level":88,"moves":["agility","knockoff","liquidation","rockslide","superpower","swordsdance","xscissor"],"doublesMoves":["agility","knockoff","liquidation","protect","rockslide","wideguard","xscissor"]},"electrode":{"level":88,"moves":["foulplay","hiddenpowergrass","hiddenpowerice","signalbeam","taunt","thunderbolt","voltswitch"],"doublesMoves":["foulplay","protect","taunt","thunderbolt","thunderwave","voltswitch"]},"exeggutor":{"level":88,"moves":["gigadrain","hiddenpowerfire","leechseed","psychic","sleeppowder","substitute"],"doublesMoves":["energyball","hiddenpowerfire","leechseed","protect","psychic","sleeppowder","substitute","trickroom"]},"exeggutoralola":{"level":88,"moves":["dracometeor","flamethrower","gigadrain","leafstorm","trickroom"],"doublesMoves":["dracometeor","dragonhammer","flamethrower","leafstorm","protect","trickroom","woodhammer"]},"marowak":{"level":88,"moves":["bonemerang","doubleedge","earthquake","knockoff","stealthrock","stoneedge","substitute"],"doublesMoves":["bonemerang","doubleedge","firepunch","protect","rockslide","stealthrock","swordsdance"]},"marowakalola":{"level":84,"moves":["bonemerang","flamecharge","flareblitz","shadowbone","stoneedge","substitute","willowisp"],"doublesMoves":["bonemerang","flareblitz","protect","shadowbone","stoneedge","willowisp"]},"hitmonlee":{"level":86,"moves":["highjumpkick","knockoff","machpunch","poisonjab","rapidspin","stoneedge"],"doublesMoves":["closecombat","fakeout","knockoff","machpunch","protect","rockslide"]},"hitmonchan":{"level":88,"moves":["bulkup","drainpunch","icepunch","machpunch","rapidspin","stoneedge"],"doublesMoves":["drainpunch","fakeout","firepunch","icepunch","machpunch","protect"]},"weezing":{"level":86,"moves":["fireblast","painsplit","sludgebomb","toxicspikes","willowisp"],"doublesMoves":["fireblast","painsplit","protect","sludgebomb","toxicspikes","willowisp"]},"rhydon":{"level":86,"moves":["earthquake","megahorn","stealthrock","stoneedge","toxic"]},"chansey":{"level":84,"moves":["healbell","seismictoss","softboiled","stealthrock","thunderwave","toxic","wish"],"doublesMoves":["helpinghand","protect","seismictoss","softboiled","thunderwave","toxic"]},"kangaskhan":{"level":88,"moves":["crunch","drainpunch","earthquake","fakeout","return","suckerpunch"],"doublesMoves":["crunch","doubleedge","drainpunch","earthquake","fakeout","protect","return","suckerpunch"]},"kangaskhanmega":{"level":76,"moves":["bodyslam","crunch","fakeout","seismictoss","suckerpunch"],"doublesMoves":["drainpunch","earthquake","fakeout","poweruppunch","protect","return","suckerpunch"]},"seaking":{"level":90,"moves":["drillrun","icebeam","knockoff","megahorn","raindance","waterfall"],"doublesMoves":["drillrun","icywind","knockoff","megahorn","protect","waterfall"]},"starmie":{"level":83,"moves":["hydropump","icebeam","psyshock","rapidspin","recover","scald","thunderbolt"],"doublesMoves":["hydropump","icebeam","protect","psychic","psyshock","scald","thunderbolt"]},"mrmime":{"level":88,"moves":["dazzlinggleam","encore","focusblast","healingwish","nastyplot","psyshock","shadowball"],"doublesMoves":["dazzlinggleam","encore","fakeout","followme","hiddenpowerfighting","icywind","protect","psychic","thunderbolt","thunderwave","wideguard"]},"scyther":{"level":87,"moves":["aerialace","brickbreak","bugbite","knockoff","roost","swordsdance","uturn"],"doublesMoves":["aerialace","brickbreak","bugbite","feint","knockoff","protect","swordsdance","uturn"]},"jynx":{"level":88,"moves":["focusblast","icebeam","lovelykiss","nastyplot","psychic","psyshock","substitute","trick"],"doublesMoves":["focusblast","icebeam","lovelykiss","nastyplot","protect","psychic","psyshock"]},"pinsir":{"level":87,"moves":["closecombat","earthquake","knockoff","stealthrock","stoneedge","xscissor"],"doublesMoves":["closecombat","feint","knockoff","protect","rockslide","xscissor"]},"pinsirmega":{"level":78,"moves":["closecombat","earthquake","quickattack","return","swordsdance"],"doublesMoves":["closecombat","feint","protect","quickattack","return","rockslide","swordsdance"]},"tauros":{"level":87,"moves":["bodyslam","doubleedge","earthquake","rockslide","zenheadbutt"],"doublesMoves":["doubleedge","protect","return","rockslide","stompingtantrum","stoneedge","zenheadbutt"]},"gyarados":{"level":78,"moves":["bounce","dragondance","earthquake","stoneedge","substitute","waterfall"],"doublesMoves":["bounce","dragondance","protect","stoneedge","thunderwave","waterfall"]},"gyaradosmega":{"level":78,"moves":["crunch","dragondance","earthquake","icefang","substitute","waterfall"],"doublesMoves":["crunch","dragondance","icefang","protect","taunt","thunderwave","waterfall"]},"lapras":{"level":88,"moves":["freezedry","healbell","hydropump","icebeam","protect","thunderbolt","toxic"],"doublesMoves":["freezedry","helpinghand","hydropump","iceshard","icywind","protect"]},"ditto":{"level":86,"moves":["transform"]},"vaporeon":{"level":86,"moves":["icebeam","protect","roar","scald","toxic","wish"],"doublesMoves":["helpinghand","icywind","muddywater","protect","scald","toxic"]},"jolteon":{"level":84,"moves":["hiddenpowerice","shadowball","signalbeam","thunderbolt","voltswitch"],"doublesMoves":["helpinghand","hiddenpowergrass","hiddenpowerice","protect","signalbeam","thunderbolt","voltswitch"]},"flareon":{"level":88,"moves":["facade","flamecharge","flareblitz","quickattack","superpower"],"doublesMoves":["facade","flamecharge","flareblitz","protect","superpower"]},"omastar":{"level":87,"moves":["earthpower","hydropump","icebeam","shellsmash","spikes","stealthrock"],"doublesMoves":["earthpower","hiddenpowerelectric","hydropump","icebeam","muddywater","protect","shellsmash"]},"kabutops":{"level":88,"moves":["aquajet","knockoff","liquidation","rapidspin","stoneedge","swordsdance"],"doublesMoves":["aquajet","knockoff","liquidation","protect","rockslide","stoneedge","swordsdance"]},"aerodactyl":{"level":86,"moves":["defog","doubleedge","earthquake","pursuit","roost","stealthrock","stoneedge","taunt"],"doublesMoves":["earthquake","protect","rockslide","skydrop","stoneedge","tailwind","wideguard"]},"aerodactylmega":{"level":81,"moves":["aerialace","aquatail","earthquake","firefang","honeclaws","roost","stoneedge"],"doublesMoves":["aquatail","protect","rockslide","skydrop","stoneedge","tailwind","wideguard"]},"snorlax":{"level":84,"moves":["bodyslam","crunch","curse","earthquake","firepunch","pursuit","rest","return","sleeptalk"],"doublesMoves":["bodyslam","crunch","curse","highhorsepower","protect","rest","return"]},"articuno":{"level":87,"moves":["freezedry","hurricane","roost","substitute","toxic"],"doublesMoves":["freezedry","hurricane","protect","roost","tailwind"]},"zapdos":{"level":80,"moves":["defog","discharge","heatwave","hiddenpowerice","roost","toxic","uturn"],"doublesMoves":["heatwave","hiddenpowergrass","hiddenpowerice","protect","roost","tailwind","thunderbolt"]},"moltres":{"level":82,"moves":["fireblast","hurricane","roost","substitute","toxic","willowisp"],"doublesMoves":["airslash","fireblast","heatwave","hurricane","protect","tailwind","uturn","willowisp"]},"dragonite":{"level":76,"moves":["dragondance","earthquake","extremespeed","firepunch","fly","outrage"],"doublesMoves":["dragonclaw","dragondance","extremespeed","firepunch","fly","protect","roost","superpower"]},"mewtwo":{"level":74,"moves":["aurasphere","calmmind","fireblast","icebeam","psystrike","recover"],"doublesMoves":["aurasphere","calmmind","fireblast","icebeam","protect","psystrike"]},"mewtwomegax":{"level":72,"moves":["bulkup","drainpunch","icebeam","stoneedge","taunt","zenheadbutt"],"doublesMoves":["bulkup","drainpunch","icebeam","stoneedge","taunt","zenheadbutt"]},"mewtwomegay":{"level":72,"moves":["aurasphere","calmmind","fireblast","icebeam","psystrike","recover","shadowball"],"doublesMoves":["aurasphere","calmmind","fireblast","icebeam","psystrike","taunt","willowisp"]},"mew":{"level":82,"moves":["aurasphere","defog","earthpower","icebeam","knockoff","nastyplot","psyshock","roost","stealthrock","taunt","willowisp"],"doublesMoves":["fakeout","fireblast","helpinghand","icebeam","protect","psyshock","roost","tailwind","taunt","transform","willowisp"]},"meganium":{"level":89,"moves":["aromatherapy","dragontail","gigadrain","leechseed","lightscreen","reflect","synthesis","toxic"],"doublesMoves":["dragontail","energyball","healpulse","leafstorm","leechseed","protect","toxic"]},"typhlosion":{"level":86,"moves":["eruption","extrasensory","fireblast","focusblast","hiddenpowergrass"],"doublesMoves":["eruption","extrasensory","focusblast","heatwave","hiddenpowergrass"]},"feraligatr":{"level":82,"moves":["aquajet","crunch","dragondance","earthquake","icepunch","liquidation","swordsdance"],"doublesMoves":["aquajet","crunch","dragondance","icepunch","liquidation","protect"]},"furret":{"level":90,"moves":["aquatail","doubleedge","firepunch","knockoff","trick","uturn"],"doublesMoves":["doubleedge","followme","helpinghand","knockoff","protect","superfang","uturn"]},"noctowl":{"level":91,"moves":["airslash","defog","heatwave","hurricane","hypervoice","roost","whirlwind"],"doublesMoves":["airslash","heatwave","hypervoice","hypnosis","protect","roost","tailwind"]},"ledian":{"level":92,"moves":["knockoff","lightscreen","reflect","roost","toxic","uturn"],"doublesMoves":["bugbuzz","encore","knockoff","lightscreen","protect","reflect","tailwind","uturn"]},"ariados":{"level":88,"moves":["megahorn","poisonjab","stickyweb","suckerpunch","toxicspikes"],"doublesMoves":["megahorn","poisonjab","protect","ragepowder","stickyweb","toxicthread"]},"crobat":{"level":82,"moves":["bravebird","defog","roost","superfang","taunt","toxic","uturn"],"doublesMoves":["bravebird","protect","superfang","tailwind","taunt","uturn"]},"lanturn":{"level":88,"moves":["healbell","hiddenpowergrass","hydropump","icebeam","scald","toxic","voltswitch"],"doublesMoves":["icebeam","protect","scald","thunderbolt","thunderwave","toxic"]},"xatu":{"level":88,"moves":["calmmind","heatwave","psychic","roost","thunderwave","toxic","uturn"],"doublesMoves":["heatwave","protect","psychic","roost","tailwind","thunderwave","uturn"]},"ampharos":{"level":88,"moves":["focusblast","healbell","hiddenpowerice","lightscreen","reflect","thunderbolt","toxic","voltswitch"],"doublesMoves":["focusblast","hiddenpowergrass","hiddenpowerice","protect","thunderbolt","thunderwave"]},"ampharosmega":{"level":84,"moves":["agility","dragonpulse","focusblast","healbell","thunderbolt","voltswitch"],"doublesMoves":["dragonpulse","focusblast","hiddenpowergrass","hiddenpowerice","protect","thunderbolt"]},"bellossom":{"level":87,"moves":["gigadrain","hiddenpowerground","moonblast","quiverdance","sleeppowder","strengthsap"],"doublesMoves":["energyball","moonblast","quiverdance","sleeppowder","strengthsap"]},"azumarill":{"level":80,"moves":["aquajet","bellydrum","knockoff","liquidation","playrough","superpower"],"doublesMoves":["aquajet","knockoff","liquidation","playrough","protect","superpower"]},"sudowoodo":{"level":88,"moves":["earthquake","headsmash","stealthrock","suckerpunch","toxic","woodhammer"],"doublesMoves":["headsmash","helpinghand","protect","stealthrock","stompingtantrum","suckerpunch","woodhammer"]},"politoed":{"level":85,"moves":["encore","icebeam","protect","rest","scald","toxic"],"doublesMoves":["encore","helpinghand","hypnosis","icywind","protect","scald"]},"jumpluff":{"level":88,"moves":["acrobatics","encore","leechseed","seedbomb","sleeppowder","strengthsap","substitute","swordsdance","toxic","uturn"],"doublesMoves":["encore","energyball","helpinghand","leechseed","protect","ragepowder","sleeppowder","strengthsap","uturn"]},"sunflora":{"level":91,"moves":["earthpower","hiddenpowerfire","hiddenpowerice","leafstorm","sludgebomb"],"doublesMoves":["earthpower","encore","energyball","helpinghand","hiddenpowerfire","protect","solarbeam","sunnyday"]},"quagsire":{"level":84,"moves":["earthquake","encore","icebeam","recover","scald","toxic"],"doublesMoves":["earthquake","icywind","protect","recover","scald","toxic"]},"espeon":{"level":84,"moves":["calmmind","dazzlinggleam","morningsun","psychic","psyshock","shadowball"],"doublesMoves":["calmmind","dazzlinggleam","helpinghand","protect","psychic","shadowball"]},"umbreon":{"level":84,"moves":["foulplay","protect","toxic","wish"],"doublesMoves":["foulplay","helpinghand","moonlight","protect","snarl"]},"slowking":{"level":86,"moves":["dragontail","fireblast","icebeam","nastyplot","psyshock","scald","slackoff","thunderwave","toxic","trickroom"],"doublesMoves":["fireblast","protect","psychic","psyshock","scald","trickroom"]},"unown":{"level":100,"moves":["hiddenpowerpsychic"]},"wobbuffet":{"level":83,"moves":["counter","destinybond","encore","mirrorcoat"],"doublesMoves":["charm","counter","encore","mirrorcoat"]},"girafarig":{"level":90,"moves":["hypervoice","nastyplot","psychic","psyshock","substitute","thunderbolt"],"doublesMoves":["hypervoice","nastyplot","protect","psychic","psyshock","thunderbolt"]},"forretress":{"level":84,"moves":["gyroball","rapidspin","spikes","stealthrock","toxic","voltswitch"],"doublesMoves":["gyroball","protect","stealthrock","toxic","voltswitch"]},"dunsparce":{"level":91,"moves":["bite","bodyslam","coil","earthquake","glare","headbutt","roost"],"doublesMoves":["bite","bodyslam","coil","glare","headbutt","protect","rockslide"]},"gligar":{"level":82,"moves":["defog","earthquake","knockoff","roost","stealthrock","toxic","uturn"]},"steelix":{"level":86,"moves":["earthquake","ironhead","roar","rockslide","stealthrock","toxic"],"doublesMoves":["earthquake","headsmash","heavyslam","protect","stealthrock","wideguard"]},"steelixmega":{"level":82,"moves":["dragontail","earthquake","heavyslam","roar","stealthrock","toxic"],"doublesMoves":["earthquake","heavyslam","protect","rockslide","stealthrock"]},"granbull":{"level":88,"moves":["crunch","earthquake","healbell","playrough","thunderwave"],"doublesMoves":["playrough","protect","snarl","stompingtantrum","thunderwave"]},"qwilfish":{"level":88,"moves":["destinybond","liquidation","painsplit","spikes","taunt","thunderwave","toxicspikes"],"doublesMoves":["destinybond","liquidation","poisonjab","protect","swordsdance","taunt","thunderwave"]},"scizor":{"level":82,"moves":["bugbite","bulletpunch","knockoff","pursuit","superpower","swordsdance","uturn"],"doublesMoves":["bugbite","bulletpunch","feint","knockoff","protect","superpower","swordsdance","uturn"]},"scizormega":{"level":79,"moves":["bugbite","bulletpunch","defog","knockoff","roost","superpower","swordsdance","uturn"],"doublesMoves":["bugbite","bulletpunch","feint","knockoff","protect","roost","superpower","swordsdance","uturn"]},"shuckle":{"level":88,"moves":["encore","knockoff","stealthrock","stickyweb","toxic"],"doublesMoves":["encore","guardsplit","helpinghand","knockoff","stealthrock","stickyweb","toxic"]},"heracross":{"level":84,"moves":["closecombat","facade","knockoff","megahorn","stoneedge","swordsdance"],"doublesMoves":["closecombat","facade","knockoff","megahorn","protect","swordsdance"]},"heracrossmega":{"level":83,"moves":["closecombat","pinmissile","rockblast","substitute","swordsdance"],"doublesMoves":["bulletseed","closecombat","knockoff","pinmissile","protect","rockblast","swordsdance"]},"ursaring":{"level":86,"moves":["closecombat","crunch","facade","protect","swordsdance"],"doublesMoves":["closecombat","crunch","facade","protect","swordsdance"]},"magcargo":{"level":90,"moves":["ancientpower","earthpower","fireblast","hiddenpowergrass","lavaplume","recover","shellsmash","stealthrock","toxic"],"doublesMoves":["earthpower","fireblast","heatwave","incinerate","protect","stealthrock","willowisp"]},"corsola":{"level":91,"moves":["powergem","recover","scald","stealthrock","toxic"],"doublesMoves":["icywind","powergem","protect","scald","stealthrock","toxic"]},"octillery":{"level":90,"moves":["energyball","fireblast","gunkshot","hydropump","icebeam","rockblast","scald"],"doublesMoves":["energyball","fireblast","hydropump","icebeam","protect"]},"delibird":{"level":100,"moves":["destinybond","freezedry","icywind","rapidspin","spikes"],"doublesMoves":["aerialace","brickbreak","fakeout","icepunch","iceshard","protect"]},"mantine":{"level":85,"moves":["airslash","defog","roost","scald","toxic"],"doublesMoves":["defog","helpinghand","protect","scald","tailwind","toxic","wideguard"]},"skarmory":{"level":80,"moves":["bravebird","roost","spikes","stealthrock","whirlwind"],"doublesMoves":["bravebird","feint","ironhead","protect","skydrop","stealthrock","tailwind","taunt"]},"houndoom":{"level":88,"moves":["darkpulse","fireblast","hiddenpowergrass","nastyplot","suckerpunch"],"doublesMoves":["darkpulse","heatwave","nastyplot","protect","suckerpunch"]},"houndoommega":{"level":83,"moves":["darkpulse","fireblast","hiddenpowergrass","nastyplot","taunt"],"doublesMoves":["darkpulse","heatwave","hiddenpowergrass","nastyplot","protect","taunt"]},"kingdra":{"level":86,"moves":["dracometeor","hydropump","icebeam","raindance","waterfall"],"doublesMoves":["dracometeor","dragonpulse","hydropump","icebeam","muddywater","protect","raindance"]},"donphan":{"level":84,"moves":["earthquake","iceshard","knockoff","rapidspin","stealthrock","stoneedge"],"doublesMoves":["earthquake","iceshard","knockoff","protect","rapidspin","rockslide","stealthrock"]},"porygon2":{"level":84,"moves":["discharge","icebeam","recover","toxic","triattack"],"doublesMoves":["allyswitch","icebeam","protect","recover","thunderbolt","thunderwave","triattack"]},"stantler":{"level":88,"moves":["doubleedge","earthquake","jumpkick","megahorn","suckerpunch"],"doublesMoves":["earthquake","jumpkick","megahorn","protect","return","suckerpunch"]},"smeargle":{"level":88,"moves":["destinybond","spore","stealthrock","stickyweb","whirlwind"],"doublesMoves":["fakeout","followme","helpinghand","kingsshield","spore","stickyweb","tailwind","transform","wideguard"]},"hitmontop":{"level":87,"moves":["closecombat","rapidspin","stoneedge","suckerpunch","toxic"],"doublesMoves":["closecombat","fakeout","feint","helpinghand","machpunch","rapidspin","suckerpunch","wideguard"]},"miltank":{"level":86,"moves":["bodyslam","curse","earthquake","healbell","milkdrink","stealthrock","toxic"],"doublesMoves":["bodyslam","curse","helpinghand","milkdrink","protect","stompingtantrum","thunderwave"]},"blissey":{"level":82,"moves":["healbell","seismictoss","softboiled","stealthrock","toxic"],"doublesMoves":["helpinghand","protect","seismictoss","softboiled","thunderwave","toxic"]},"raikou":{"level":83,"moves":["aurasphere","calmmind","hiddenpowerice","substitute","thunderbolt","voltswitch"],"doublesMoves":["calmmind","hiddenpowerice","protect","snarl","thunderbolt"]},"entei":{"level":82,"moves":["extremespeed","flareblitz","sacredfire","stompingtantrum","stoneedge"],"doublesMoves":["extremespeed","flareblitz","protect","sacredfire","stompingtantrum","stoneedge"]},"suicune":{"level":82,"moves":["calmmind","hiddenpowergrass","icebeam","rest","scald","sleeptalk"],"doublesMoves":["icebeam","scald","snarl","tailwind","toxic"]},"tyranitar":{"level":80,"moves":["crunch","earthquake","fireblast","icebeam","pursuit","stealthrock","stoneedge"],"doublesMoves":["crunch","fireblast","icebeam","protect","rockslide","stealthrock","stompingtantrum","stoneedge"]},"tyranitarmega":{"level":79,"moves":["crunch","dragondance","earthquake","icepunch","stoneedge"],"doublesMoves":["crunch","dragondance","earthquake","icepunch","protect","rockslide","stoneedge"]},"lugia":{"level":76,"moves":["aeroblast","earthquake","roost","substitute","toxic","whirlwind"],"doublesMoves":["aeroblast","protect","psychic","roost","skydrop","tailwind","toxic"]},"hooh":{"level":75,"moves":["bravebird","defog","earthquake","roost","sacredfire","substitute","toxic"],"doublesMoves":["bravebird","earthpower","protect","roost","sacredfire","skydrop","tailwind","toxic"]},"celebi":{"level":82,"moves":["earthpower","gigadrain","hiddenpowerfire","leafstorm","nastyplot","psychic","recover","thunderwave","uturn"],"doublesMoves":["earthpower","energyball","nastyplot","protect","psychic","recover","thunderwave","uturn"]},"sceptile":{"level":86,"moves":["focusblast","gigadrain","hiddenpowerfire","hiddenpowerice","leafstorm","leechseed","substitute"],"doublesMoves":["energyball","focusblast","hiddenpowerfire","hiddenpowerice","protect"]},"sceptilemega":{"level":84,"moves":["dragonpulse","earthquake","focusblast","gigadrain","hiddenpowerfire","leafblade","outrage","substitute","swordsdance"],"doublesMoves":["dragonpulse","energyball","focusblast","hiddenpowerfire","hiddenpowerice","leafstorm","protect"]},"blaziken":{"level":77,"moves":["fireblast","hiddenpowerice","highjumpkick","knockoff","protect"]},"blazikenmega":{"level":76,"moves":["flareblitz","highjumpkick","knockoff","protect","stoneedge","swordsdance"]},"swampert":{"level":82,"moves":["earthquake","icebeam","protect","roar","scald","stealthrock","toxic"],"doublesMoves":["earthquake","icywind","muddywater","protect","scald","stealthrock","wideguard"]},"swampertmega":{"level":80,"moves":["earthquake","icepunch","raindance","superpower","waterfall"],"doublesMoves":["earthquake","icepunch","protect","raindance","waterfall"]},"mightyena":{"level":89,"moves":["crunch","firefang","irontail","playrough","suckerpunch"],"doublesMoves":["crunch","firefang","playrough","protect","suckerpunch","taunt"]},"linoone":{"level":83,"moves":["bellydrum","extremespeed","shadowclaw","stompingtantrum"],"doublesMoves":["bellydrum","extremespeed","protect","shadowclaw","stompingtantrum"]},"beautifly":{"level":91,"moves":["bugbuzz","energyball","hiddenpowerfighting","psychic","quiverdance"],"doublesMoves":["aircutter","bugbuzz","protect","quiverdance","stringshot","tailwind"]},"dustox":{"level":89,"moves":["bugbuzz","defog","quiverdance","roost","sludgebomb","uturn"],"doublesMoves":["bugbuzz","protect","sludgebomb","stringshot","strugglebug","tailwind"]},"ludicolo":{"level":89,"moves":["focusblast","gigadrain","hydropump","icebeam","raindance","scald"],"doublesMoves":["fakeout","gigadrain","hydropump","icebeam","protect","raindance"]},"shiftry":{"level":88,"moves":["defog","knockoff","leafblade","leafstorm","lowkick","suckerpunch","swordsdance"],"doublesMoves":["fakeout","knockoff","leafblade","leafstorm","protect","suckerpunch","swordsdance"]},"swellow":{"level":84,"moves":["bravebird","facade","protect","quickattack","uturn"],"doublesMoves":["bravebird","facade","protect","quickattack","uturn"]},"pelipper":{"level":87,"moves":["defog","hurricane","hydropump","knockoff","roost","scald","uturn"],"doublesMoves":["hurricane","protect","scald","tailwind","uturn","wideguard"]},"gardevoir":{"level":84,"moves":["calmmind","focusblast","moonblast","psychic","shadowball","substitute","thunderbolt","willowisp"],"doublesMoves":["dazzlinggleam","focusblast","helpinghand","moonblast","protect","psyshock"]},"gardevoirmega":{"level":82,"moves":["calmmind","focusblast","hypervoice","psyshock","substitute","taunt","willowisp"],"doublesMoves":["calmmind","focusblast","hypervoice","protect","psyshock"]},"masquerain":{"level":87,"moves":["airslash","bugbuzz","hydropump","quiverdance","stickyweb"],"doublesMoves":["airslash","bugbuzz","hydropump","protect","quiverdance","stickyweb","strugglebug","tailwind"]},"breloom":{"level":83,"moves":["bulletseed","machpunch","rocktomb","spore","swordsdance"],"doublesMoves":["bulletseed","machpunch","protect","rocktomb","spore"]},"slaking":{"level":85,"moves":["earthquake","firepunch","gigaimpact","nightslash","pursuit","retaliate"],"doublesMoves":["doubleedge","earthquake","hammerarm","nightslash","retaliate","rockslide"]},"ninjask":{"level":88,"moves":["aerialace","dig","leechlife","nightslash","swordsdance","uturn"],"doublesMoves":["aerialace","dig","leechlife","protect","swordsdance"]},"shedinja":{"level":88,"moves":["shadowclaw","shadowsneak","swordsdance","willowisp","xscissor"],"doublesMoves":["allyswitch","protect","shadowsneak","swordsdance","willowisp","xscissor"]},"exploud":{"level":86,"moves":["boomburst","fireblast","focusblast","icebeam","surf"],"doublesMoves":["boomburst","fireblast","focusblast","hypervoice","icebeam","protect"]},"hariyama":{"level":86,"moves":["bulkup","bulletpunch","closecombat","icepunch","knockoff","stoneedge"],"doublesMoves":["bulletpunch","closecombat","facade","fakeout","helpinghand","knockoff","protect","wideguard"]},"delcatty":{"level":93,"moves":["doubleedge","fakeout","healbell","suckerpunch","thunderwave","wildcharge"],"doublesMoves":["doubleedge","fakeout","helpinghand","protect","suckerpunch","thunderwave"]},"sableye":{"level":90,"moves":["foulplay","recover","taunt","toxic","willowisp"],"doublesMoves":["fakeout","foulplay","helpinghand","protect","recover","snarl","taunt","willowisp"]},"sableyemega":{"level":85,"moves":["calmmind","darkpulse","recover","willowisp"],"doublesMoves":["fakeout","knockoff","protect","recover","shadowball","willowisp"]},"mawile":{"level":88,"moves":["ironhead","knockoff","playrough","stealthrock","suckerpunch","swordsdance"],"doublesMoves":["ironhead","knockoff","playrough","protect","suckerpunch","swordsdance"]},"mawilemega":{"level":80,"moves":["firefang","focuspunch","ironhead","knockoff","playrough","substitute","suckerpunch","swordsdance"],"doublesMoves":["ironhead","knockoff","playrough","protect","suckerpunch","swordsdance"]},"aggron":{"level":88,"moves":["aquatail","earthquake","headsmash","heavyslam","rockpolish","stealthrock"],"doublesMoves":["headsmash","heavyslam","protect","stealthrock","stompingtantrum"]},"aggronmega":{"level":82,"moves":["earthquake","heavyslam","roar","stealthrock","stoneedge","thunderwave","toxic"],"doublesMoves":["heavyslam","protect","rockslide","stealthrock","stompingtantrum","toxic"]},"medicham":{"level":86,"moves":["bulletpunch","drainpunch","highjumpkick","icepunch","zenheadbutt"],"doublesMoves":["bulletpunch","drainpunch","fakeout","highjumpkick","icepunch","protect","zenheadbutt"]},"medichammega":{"level":80,"moves":["fakeout","highjumpkick","icepunch","thunderpunch","zenheadbutt"],"doublesMoves":["bulletpunch","drainpunch","fakeout","highjumpkick","icepunch","protect","zenheadbutt"]},"manectric":{"level":88,"moves":["flamethrower","hiddenpowergrass","hiddenpowerice","overheat","thunderbolt","voltswitch"],"doublesMoves":["flamethrower","hiddenpowergrass","hiddenpowerice","protect","snarl","switcheroo","thunderbolt","voltswitch"]},"manectricmega":{"level":82,"moves":["hiddenpowergrass","hiddenpowerice","overheat","thunderbolt","voltswitch"],"doublesMoves":["flamethrower","hiddenpowergrass","hiddenpowerice","protect","snarl","thunderbolt","voltswitch"]},"plusle":{"level":90,"moves":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"doublesMoves":["encore","helpinghand","hiddenpowerice","nastyplot","protect","thunderbolt"]},"minun":{"level":90,"moves":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"doublesMoves":["encore","helpinghand","hiddenpowerice","nastyplot","protect","thunderbolt"]},"volbeat":{"level":89,"moves":["defog","encore","roost","tailwind","thunderwave","uturn"],"doublesMoves":["encore","helpinghand","protect","stringshot","strugglebug","tailwind","thunderwave","uturn"]},"illumise":{"level":91,"moves":["bugbuzz","defog","encore","roost","thunderwave","uturn","wish"],"doublesMoves":["bugbuzz","encore","helpinghand","protect","tailwind","thunderwave"]},"swalot":{"level":88,"moves":["earthquake","encore","icebeam","painsplit","sludgebomb","toxic","yawn"],"doublesMoves":["encore","icebeam","poisongas","protect","sludgebomb","yawn"]},"sharpedo":{"level":84,"moves":["crunch","earthquake","icebeam","protect","waterfall"],"doublesMoves":["crunch","icebeam","liquidation","protect","psychicfangs"]},"sharpedomega":{"level":82,"moves":["crunch","destinybond","icefang","protect","psychicfangs","waterfall"],"doublesMoves":["crunch","icefang","liquidation","protect","psychicfangs"]},"wailord":{"level":89,"moves":["hiddenpowerfire","hiddenpowergrass","hydropump","icebeam","waterspout"],"doublesMoves":["hiddenpowerfire","hiddenpowergrass","hydropump","icebeam","waterspout"]},"camerupt":{"level":88,"moves":["earthpower","fireblast","hiddenpowergrass","lavaplume","roar","rockpolish","stealthrock","stoneedge"],"doublesMoves":["earthpower","fireblast","heatwave","incinerate","protect","stealthrock"]},"cameruptmega":{"level":87,"moves":["ancientpower","earthpower","fireblast","stealthrock","toxic","willowisp"],"doublesMoves":["earthpower","fireblast","heatwave","protect","rockslide"]},"torkoal":{"level":84,"moves":["earthquake","lavaplume","rapidspin","solarbeam","stealthrock","yawn"],"doublesMoves":["earthpower","fireblast","heatwave","protect","solarbeam","willowisp"]},"grumpig":{"level":88,"moves":["focusblast","healbell","lightscreen","psychic","reflect","thunderwave","toxic","whirlwind"],"doublesMoves":["focusblast","lightscreen","protect","psychic","reflect","taunt","thunderwave"]},"spinda":{"level":100,"moves":["encore","return","suckerpunch","superpower"],"doublesMoves":["fakeout","protect","return","suckerpunch","superpower","trickroom"]},"flygon":{"level":83,"moves":["defog","dragondance","earthquake","firepunch","outrage","roost","uturn"],"doublesMoves":["dragonclaw","dragondance","earthquake","fireblast","protect","tailwind","uturn"]},"cacturne":{"level":88,"moves":["darkpulse","drainpunch","focusblast","gigadrain","seedbomb","spikes","suckerpunch","swordsdance"],"doublesMoves":["drainpunch","seedbomb","spikyshield","substitute","suckerpunch","swordsdance"]},"altaria":{"level":88,"moves":["defog","dracometeor","earthquake","fireblast","roost","toxic"],"doublesMoves":["dracometeor","dragonclaw","fireblast","protect","tailwind"]},"altariamega":{"level":82,"moves":["dragondance","earthquake","fireblast","healbell","return","roost"],"doublesMoves":["doubleedge","dragondance","earthquake","fireblast","protect","return"]},"zangoose":{"level":88,"moves":["closecombat","facade","knockoff","quickattack","swordsdance"],"doublesMoves":["closecombat","facade","knockoff","protect","quickattack"]},"seviper":{"level":90,"moves":["darkpulse","earthquake","flamethrower","gigadrain","poisonjab","sludgewave","suckerpunch","switcheroo","swordsdance"],"doublesMoves":["aquatail","earthquake","flamethrower","gigadrain","glare","poisonjab","protect","sludgebomb","suckerpunch"]},"lunatone":{"level":88,"moves":["earthpower","icebeam","moonblast","moonlight","powergem","psychic","rockpolish","stealthrock","toxic"],"doublesMoves":["earthpower","helpinghand","powergem","protect","psychic","trickroom"]},"solrock":{"level":88,"moves":["earthquake","morningsun","rockslide","stealthrock","willowisp"],"doublesMoves":["helpinghand","protect","rockslide","stealthrock","stoneedge","willowisp","zenheadbutt"]},"whiscash":{"level":88,"moves":["dragondance","earthquake","stoneedge","waterfall","zenheadbutt"],"doublesMoves":["dragondance","earthquake","protect","stoneedge","waterfall","zenheadbutt"]},"crawdaunt":{"level":82,"moves":["aquajet","crabhammer","dragondance","knockoff","superpower","swordsdance"],"doublesMoves":["aquajet","crabhammer","dragondance","knockoff","protect","superpower","swordsdance"]},"claydol":{"level":89,"moves":["earthquake","icebeam","psychic","rapidspin","stealthrock","toxic"],"doublesMoves":["allyswitch","earthpower","protect","rapidspin","stealthrock","toxic"]},"cradily":{"level":88,"moves":["curse","gigadrain","recover","rockslide","seedbomb","stealthrock","toxic"],"doublesMoves":["gigadrain","protect","recover","rockslide","stealthrock","stringshot","toxic"]},"armaldo":{"level":88,"moves":["earthquake","knockoff","rapidspin","stealthrock","stoneedge","toxic","xscissor"],"doublesMoves":["knockoff","protect","rockslide","stoneedge","stringshot","swordsdance","xscissor"]},"milotic":{"level":84,"moves":["dragontail","icebeam","recover","scald","toxic"],"doublesMoves":["hypnosis","icywind","protect","recover","scald"]},"castformsunny":{"level":100,"moves":["fireblast","icebeam","solarbeam","sunnyday"]},"castformrainy":{"level":100,"moves":["hurricane","hydropump","raindance","thunder"]},"castformsnowy":{"level":100,"moves":["blizzard","fireblast","hail","thunderbolt"]},"kecleon":{"level":88,"moves":["drainpunch","fakeout","knockoff","recover","shadowsneak","stealthrock","suckerpunch"],"doublesMoves":["drainpunch","fakeout","knockoff","protect","shadowsneak","trickroom"]},"banette":{"level":90,"moves":["destinybond","knockoff","shadowclaw","shadowsneak","suckerpunch","taunt","willowisp"],"doublesMoves":["knockoff","protect","shadowclaw","shadowsneak","willowisp"]},"banettemega":{"level":86,"moves":["destinybond","knockoff","shadowclaw","suckerpunch","taunt","willowisp"],"doublesMoves":["destinybond","knockoff","protect","shadowclaw","suckerpunch","taunt","willowisp"]},"tropius":{"level":89,"moves":["airslash","gigadrain","leechseed","protect","substitute","toxic"],"doublesMoves":["airslash","gigadrain","leechseed","protect","roost","tailwind"]},"chimecho":{"level":91,"moves":["calmmind","defog","healbell","healingwish","knockoff","psychic","recover","shadowball","taunt","toxic","yawn"],"doublesMoves":["helpinghand","protect","psychic","recover","taunt","thunderwave","trickroom"]},"absol":{"level":88,"moves":["knockoff","playrough","pursuit","suckerpunch","superpower","swordsdance"],"doublesMoves":["knockoff","playrough","protect","suckerpunch","superpower","swordsdance"]},"absolmega":{"level":83,"moves":["icebeam","knockoff","playrough","pursuit","suckerpunch","superpower","swordsdance"],"doublesMoves":["fireblast","knockoff","playrough","protect","suckerpunch","superpower","swordsdance"]},"glalie":{"level":88,"moves":["earthquake","explosion","icebeam","iceshard","spikes","superfang","taunt"],"doublesMoves":["earthquake","freezedry","icebeam","iceshard","protect","taunt"]},"glaliemega":{"level":85,"moves":["earthquake","explosion","freezedry","iceshard","return","spikes"],"doublesMoves":["earthquake","explosion","freezedry","iceshard","protect","return"]},"walrein":{"level":88,"moves":["icebeam","protect","roar","superfang","surf","toxic"],"doublesMoves":["brine","icywind","protect","superfang"]},"huntail":{"level":85,"moves":["icebeam","shellsmash","suckerpunch","waterfall"],"doublesMoves":["icebeam","protect","shellsmash","suckerpunch","waterfall"]},"gorebyss":{"level":85,"moves":["hiddenpowergrass","hydropump","icebeam","shellsmash"],"doublesMoves":["hiddenpowergrass","hydropump","icebeam","protect","shellsmash"]},"relicanth":{"level":88,"moves":["doubleedge","earthquake","headsmash","stealthrock","toxic","waterfall"],"doublesMoves":["doubleedge","earthquake","headsmash","protect","rockslide","waterfall"]},"luvdisc":{"level":100,"moves":["icebeam","protect","scald","sweetkiss","toxic"],"doublesMoves":["healpulse","icebeam","icywind","protect","scald","sweetkiss","toxic"]},"salamence":{"level":78,"moves":["dragondance","earthquake","fireblast","fly","outrage","roost"],"doublesMoves":["dracometeor","dragonclaw","dragondance","earthquake","fireblast","fly","protect","tailwind"]},"salamencemega":{"level":74,"moves":["doubleedge","dracometeor","dragondance","earthquake","fireblast","return","roost"],"doublesMoves":["doubleedge","dracometeor","dragonclaw","dragondance","earthquake","fireblast","protect","return"]},"metagross":{"level":82,"moves":["agility","bulletpunch","earthquake","explosion","icepunch","meteormash","stealthrock","thunderpunch","zenheadbutt"],"doublesMoves":["agility","bulletpunch","icepunch","meteormash","protect","stompingtantrum","thunderpunch","zenheadbutt"]},"metagrossmega":{"level":76,"moves":["agility","earthquake","hammerarm","icepunch","meteormash","zenheadbutt"],"doublesMoves":["icepunch","meteormash","protect","stompingtantrum","thunderpunch","zenheadbutt"]},"regirock":{"level":88,"moves":["curse","drainpunch","rest","rockslide","stealthrock","stoneedge","thunderwave","toxic"],"doublesMoves":["curse","drainpunch","protect","rest","rockslide","stealthrock","stoneedge","thunderwave"]},"regice":{"level":88,"moves":["focusblast","icebeam","rest","rockpolish","sleeptalk","thunderbolt","thunderwave"],"doublesMoves":["icebeam","icywind","protect","rockpolish","thunderbolt","thunderwave"]},"registeel":{"level":84,"moves":["curse","ironhead","rest","sleeptalk","stealthrock","toxic"],"doublesMoves":["curse","ironhead","protect","rest","seismictoss","stealthrock","thunderwave"]},"latias":{"level":82,"moves":["dracometeor","healingwish","hiddenpowerfire","psychic","trick"],"doublesMoves":["dracometeor","healpulse","helpinghand","protect","psyshock","tailwind"]},"latiasmega":{"level":80,"moves":["calmmind","defog","dracometeor","psyshock","roost","surf"],"doublesMoves":["dragonpulse","healpulse","helpinghand","protect","psychic","tailwind"]},"latios":{"level":82,"moves":["dracometeor","hiddenpowerfire","psyshock","surf","thunderbolt","trick"],"doublesMoves":["dracometeor","dragonpulse","hiddenpowerfire","protect","psyshock","tailwind","trick"]},"latiosmega":{"level":81,"moves":["calmmind","dracometeor","hiddenpowerfire","psyshock","roost"],"doublesMoves":["dracometeor","dragonpulse","hiddenpowerfire","protect","psyshock","tailwind"]},"kyogre":{"level":71,"moves":["icebeam","originpulse","scald","thunder","waterspout"],"doublesMoves":["calmmind","icebeam","originpulse","protect","thunder","waterspout"]},"kyogreprimal":{"level":74,"moves":["calmmind","icebeam","originpulse","rest","scald","sleeptalk","thunder"],"doublesMoves":["calmmind","icebeam","originpulse","protect","thunder"]},"groudon":{"level":76,"moves":["earthquake","firepunch","lavaplume","roar","stealthrock","stoneedge","thunderwave"],"doublesMoves":["firepunch","precipiceblades","protect","rockpolish","rockslide","stoneedge","swordsdance"]},"groudonprimal":{"level":70,"moves":["firepunch","lavaplume","precipiceblades","rockpolish","stealthrock","stoneedge","swordsdance"],"doublesMoves":["firepunch","precipiceblades","protect","rockpolish","rockslide","stoneedge","swordsdance"]},"rayquaza":{"level":74,"moves":["dracometeor","dragondance","earthquake","extremespeed","outrage","vcreate"],"doublesMoves":["dracometeor","dragonclaw","dragondance","earthquake","extremespeed","protect","tailwind","vcreate"]},"rayquazamega":{"level":67,"moves":["dragonascent","dragondance","earthquake","extremespeed","vcreate"],"doublesMoves":["dragonascent","dragonclaw","dragondance","earthquake","extremespeed","protect","swordsdance","vcreate"]},"jirachi":{"level":80,"moves":["bodyslam","firepunch","ironhead","stealthrock","substitute","toxic","uturn","wish"],"doublesMoves":["bodyslam","followme","helpinghand","icywind","ironhead","protect","thunderwave","uturn"]},"deoxys":{"level":76,"moves":["extremespeed","firepunch","icebeam","knockoff","psychoboost","stealthrock","superpower"],"doublesMoves":["extremespeed","firepunch","icebeam","knockoff","protect","psychoboost","superpower"]},"deoxysattack":{"level":76,"moves":["extremespeed","firepunch","icebeam","knockoff","psychoboost","superpower"],"doublesMoves":["extremespeed","firepunch","icebeam","knockoff","protect","psychoboost","superpower"]},"deoxysdefense":{"level":82,"moves":["knockoff","recover","seismictoss","spikes","stealthrock","taunt","toxic"],"doublesMoves":["lightscreen","protect","recover","reflect","seismictoss","stealthrock","taunt","trickroom"]},"deoxysspeed":{"level":80,"moves":["knockoff","magiccoat","psychoboost","spikes","stealthrock","superpower","taunt"],"doublesMoves":["knockoff","lightscreen","protect","psychoboost","reflect","superpower","taunt"]},"torterra":{"level":88,"moves":["earthquake","rockpolish","stealthrock","stoneedge","synthesis","woodhammer"],"doublesMoves":["earthquake","protect","rockpolish","rockslide","stoneedge","wideguard","woodhammer"]},"infernape":{"level":82,"moves":["closecombat","fireblast","flareblitz","focusblast","grassknot","nastyplot","stealthrock","stoneedge","swordsdance","uturn","vacuumwave"],"doublesMoves":["closecombat","fakeout","feint","flareblitz","grassknot","heatwave","protect","stoneedge","taunt","uturn"]},"empoleon":{"level":82,"moves":["defog","flashcannon","grassknot","hydropump","icebeam","roar","scald","stealthrock","toxic"],"doublesMoves":["defog","flashcannon","grassknot","icywind","protect","scald"]},"staraptor":{"level":82,"moves":["bravebird","closecombat","doubleedge","quickattack","uturn"],"doublesMoves":["bravebird","closecombat","doubleedge","protect","quickattack","tailwind","uturn"]},"bibarel":{"level":88,"moves":["aquajet","liquidation","quickattack","return","swordsdance"],"doublesMoves":["aquajet","liquidation","quickattack","return","swordsdance"]},"kricketune":{"level":88,"moves":["endeavor","knockoff","leechlife","stickyweb","taunt","toxic"],"doublesMoves":["knockoff","leechlife","protect","stickyweb","taunt"]},"luxray":{"level":88,"moves":["crunch","facade","icefang","superpower","voltswitch","wildcharge"],"doublesMoves":["crunch","helpinghand","icefang","protect","superpower","voltswitch","wildcharge"]},"roserade":{"level":84,"moves":["gigadrain","hiddenpowerfire","leafstorm","sleeppowder","sludgebomb","spikes","synthesis","toxicspikes"],"doublesMoves":["gigadrain","hiddenpowerfire","leafstorm","protect","sleeppowder","sludgebomb"]},"rampardos":{"level":88,"moves":["crunch","earthquake","firepunch","headsmash","rockpolish","rockslide"],"doublesMoves":["crunch","earthquake","headsmash","protect","rockslide","stoneedge","zenheadbutt"]},"bastiodon":{"level":88,"moves":["metalburst","protect","roar","rockblast","stealthrock","toxic"],"doublesMoves":["guardsplit","metalburst","protect","stealthrock","stoneedge","wideguard"]},"wormadam":{"level":92,"moves":["bugbuzz","gigadrain","hiddenpowerground","hiddenpowerrock","leafstorm","quiverdance"],"doublesMoves":["bugbuzz","gigadrain","leafstorm","protect","stringshot"]},"wormadamsandy":{"level":88,"moves":["earthquake","protect","stealthrock","toxic"],"doublesMoves":["earthquake","protect","rockblast","stringshot","suckerpunch"]},"wormadamtrash":{"level":88,"moves":["flashcannon","protect","stealthrock","toxic"],"doublesMoves":["bugbuzz","flashcannon","protect","stringshot","strugglebug","suckerpunch"]},"mothim":{"level":91,"moves":["airslash","bugbuzz","energyball","quiverdance","uturn"],"doublesMoves":["airslash","bugbuzz","energyball","protect","quiverdance"]},"vespiquen":{"level":90,"moves":["airslash","defog","roost","toxic","uturn"],"doublesMoves":["attackorder","healorder","protect","stringshot","strugglebug","tailwind"]},"pachirisu":{"level":89,"moves":["nuzzle","superfang","thunderbolt","toxic","uturn"],"doublesMoves":["followme","helpinghand","nuzzle","protect","superfang","thunderbolt","uturn"]},"floatzel":{"level":88,"moves":["aquajet","brickbreak","bulkup","icepunch","liquidation","substitute","taunt"],"doublesMoves":["aquajet","icepunch","liquidation","protect","switcheroo","taunt"]},"cherrim":{"level":92,"moves":["dazzlinggleam","energyball","healingwish","hiddenpowerfire","synthesis"]},"cherrimsunshine":{"level":92,"doublesMoves":["gigadrain","helpinghand","solarbeam","sunnyday","weatherball"]},"gastrodon":{"level":88,"moves":["earthquake","icebeam","recover","scald","toxic"],"doublesMoves":["earthpower","icywind","muddywater","protect","recover","scald"]},"ambipom":{"level":86,"moves":["fakeout","knockoff","lowkick","return","seedbomb","switcheroo","uturn"],"doublesMoves":["fakeout","icepunch","knockoff","lowkick","protect","return","uturn"]},"drifblim":{"level":87,"moves":["acrobatics","destinybond","hex","shadowball","substitute","willowisp"],"doublesMoves":["acrobatics","destinybond","hypnosis","protect","shadowball","thunderbolt","willowisp"]},"lopunny":{"level":88,"moves":["healingwish","highjumpkick","icepunch","return","switcheroo"],"doublesMoves":["encore","fakeout","firepunch","helpinghand","protect","return","switcheroo","thunderwave"]},"lopunnymega":{"level":79,"moves":["fakeout","highjumpkick","icepunch","return","substitute"],"doublesMoves":["encore","fakeout","highjumpkick","icepunch","protect","return"]},"mismagius":{"level":86,"moves":["dazzlinggleam","destinybond","nastyplot","painsplit","shadowball","substitute","taunt","thunderbolt","willowisp"],"doublesMoves":["dazzlinggleam","nastyplot","protect","shadowball","taunt","thunderbolt","willowisp"]},"honchkrow":{"level":84,"moves":["bravebird","heatwave","pursuit","roost","suckerpunch","superpower"],"doublesMoves":["bravebird","heatwave","protect","roost","suckerpunch","superpower"]},"purugly":{"level":88,"moves":["fakeout","knockoff","quickattack","return","suckerpunch","uturn"],"doublesMoves":["fakeout","knockoff","protect","quickattack","return","uturn"]},"skuntank":{"level":88,"moves":["crunch","defog","fireblast","poisonjab","pursuit","suckerpunch","taunt"],"doublesMoves":["crunch","fireblast","poisonjab","protect","snarl","suckerpunch","taunt"]},"bronzong":{"level":84,"moves":["earthquake","explosion","ironhead","lightscreen","reflect","stealthrock","toxic"],"doublesMoves":["earthquake","explosion","gyroball","lightscreen","protect","reflect","trickroom"]},"chatot":{"level":88,"moves":["boomburst","chatter","heatwave","hiddenpowerground","nastyplot","substitute","uturn"],"doublesMoves":["boomburst","chatter","encore","heatwave","hypervoice","nastyplot","protect","uturn"]},"spiritomb":{"level":90,"moves":["calmmind","darkpulse","psychic","pursuit","rest","shadowsneak","sleeptalk","willowisp"],"doublesMoves":["foulplay","icywind","protect","shadowsneak","snarl","willowisp"]},"garchomp":{"level":79,"moves":["dragonclaw","earthquake","fireblast","firefang","outrage","stealthrock","stoneedge","swordsdance"],"doublesMoves":["dragonclaw","earthquake","protect","rockslide","stoneedge","swordsdance"]},"garchompmega":{"level":80,"moves":["dracometeor","earthquake","fireblast","outrage","stoneedge","swordsdance"],"doublesMoves":["dragonclaw","earthquake","fireblast","protect","rockslide","stoneedge","swordsdance"]},"lucario":{"level":82,"moves":["aurasphere","closecombat","crunch","darkpulse","extremespeed","flashcannon","meteormash","nastyplot","swordsdance","vacuumwave"],"doublesMoves":["closecombat","darkpulse","extremespeed","icepunch","meteormash","protect"]},"lucariomega":{"level":76,"moves":["aurasphere","closecombat","extremespeed","flashcannon","icepunch","meteormash","nastyplot","swordsdance","vacuumwave"],"doublesMoves":["closecombat","darkpulse","extremespeed","icepunch","meteormash","protect","swordsdance"]},"hippowdon":{"level":82,"moves":["earthquake","slackoff","stealthrock","stoneedge","toxic","whirlwind"],"doublesMoves":["earthquake","protect","rockslide","slackoff","stealthrock","stoneedge","whirlwind"]},"drapion":{"level":84,"moves":["aquatail","earthquake","knockoff","poisonjab","pursuit","swordsdance","taunt","toxicspikes","whirlwind"],"doublesMoves":["aquatail","knockoff","poisonjab","protect","snarl","swordsdance","taunt"]},"toxicroak":{"level":84,"moves":["drainpunch","gunkshot","icepunch","substitute","suckerpunch","swordsdance"],"doublesMoves":["drainpunch","fakeout","gunkshot","icepunch","protect","suckerpunch","swordsdance"]},"carnivine":{"level":92,"moves":["defog","knockoff","powerwhip","return","sleeppowder","substitute","swordsdance"],"doublesMoves":["knockoff","powerwhip","protect","ragepowder","return","sleeppowder","swordsdance"]},"lumineon":{"level":88,"moves":["defog","icebeam","scald","toxic","uturn"],"doublesMoves":["defog","icebeam","protect","scald","tailwind","toxic","uturn"]},"abomasnow":{"level":88,"moves":["blizzard","earthquake","focuspunch","gigadrain","iceshard","leechseed","substitute","woodhammer"],"doublesMoves":["blizzard","earthquake","gigadrain","iceshard","protect","woodhammer"]},"abomasnowmega":{"level":86,"moves":["blizzard","earthquake","gigadrain","hiddenpowerfire","iceshard","woodhammer"],"doublesMoves":["blizzard","earthquake","gigadrain","iceshard","protect","woodhammer"]},"weavile":{"level":81,"moves":["iceshard","iciclecrash","knockoff","lowkick","pursuit","swordsdance"],"doublesMoves":["fakeout","iceshard","iciclecrash","knockoff","lowkick","protect","swordsdance"]},"magnezone":{"level":82,"moves":["flashcannon","hiddenpowerfire","substitute","thunderbolt","voltswitch"],"doublesMoves":["electroweb","flashcannon","hiddenpowerfire","protect","thunderbolt","voltswitch"]},"lickilicky":{"level":88,"moves":["bodyslam","dragontail","earthquake","explosion","healbell","knockoff","powerwhip","protect","swordsdance","wish"],"doublesMoves":["bodyslam","dragontail","explosion","knockoff","powerwhip","protect","stompingtantrum"]},"rhyperior":{"level":84,"moves":["dragontail","earthquake","icepunch","megahorn","rockpolish","stoneedge"],"doublesMoves":["earthquake","icepunch","megahorn","protect","rockslide","stealthrock","stoneedge"]},"tangrowth":{"level":86,"moves":["earthquake","gigadrain","hiddenpowerfire","knockoff","leafstorm","rockslide","sleeppowder","synthesis"],"doublesMoves":["earthquake","focusblast","gigadrain","hiddenpowerice","knockoff","leechseed","powerwhip","protect","ragepowder","sleeppowder"]},"electivire":{"level":86,"moves":["crosschop","earthquake","flamethrower","icepunch","voltswitch","wildcharge"],"doublesMoves":["crosschop","flamethrower","followme","icepunch","protect","stompingtantrum","wildcharge"]},"magmortar":{"level":87,"moves":["earthquake","fireblast","focusblast","hiddenpowergrass","hiddenpowerice","substitute","thunderbolt"],"doublesMoves":["fireblast","followme","heatwave","hiddenpowergrass","hiddenpowerice","protect","taunt","thunderbolt","willowisp"]},"togekiss":{"level":82,"moves":["airslash","aurasphere","defog","healbell","nastyplot","roost","thunderwave"],"doublesMoves":["airslash","dazzlinggleam","followme","nastyplot","protect","roost","tailwind","thunderwave"]},"yanmega":{"level":84,"moves":["airslash","bugbuzz","gigadrain","protect","uturn"]},"leafeon":{"level":88,"moves":["healbell","knockoff","leafblade","swordsdance","synthesis","xscissor"],"doublesMoves":["helpinghand","knockoff","leafblade","protect","swordsdance","xscissor"]},"glaceon":{"level":88,"moves":["healbell","hiddenpowerground","icebeam","protect","shadowball","toxic","wish"],"doublesMoves":["helpinghand","hiddenpowerground","icebeam","protect","toxic"]},"gliscor":{"level":80,"moves":["earthquake","knockoff","protect","roost","stealthrock","taunt","toxic","uturn"],"doublesMoves":["earthquake","facade","knockoff","protect","tailwind","taunt"]},"mamoswine":{"level":82,"moves":["earthquake","endeavor","iceshard","iciclecrash","knockoff","stealthrock","superpower"],"doublesMoves":["earthquake","iceshard","iciclecrash","knockoff","protect","rockslide","superpower"]},"porygonz":{"level":83,"moves":["icebeam","nastyplot","shadowball","thunderbolt","triattack","trick"],"doublesMoves":["darkpulse","icebeam","nastyplot","protect","thunderbolt","triattack","trick"]},"gallade":{"level":88,"moves":["bulkup","closecombat","drainpunch","icepunch","knockoff","shadowsneak","substitute","zenheadbutt"],"doublesMoves":["closecombat","helpinghand","icepunch","knockoff","protect","shadowsneak","trick","zenheadbutt"]},"gallademega":{"level":80,"moves":["closecombat","icepunch","knockoff","swordsdance","zenheadbutt"],"doublesMoves":["closecombat","drainpunch","icepunch","knockoff","protect","swordsdance","zenheadbutt"]},"probopass":{"level":88,"moves":["earthpower","flashcannon","stealthrock","thunderwave","toxic","voltswitch"],"doublesMoves":["flashcannon","helpinghand","powergem","protect","stealthrock","thunderwave","wideguard"]},"dusknoir":{"level":88,"moves":["earthquake","icepunch","painsplit","shadowsneak","substitute","willowisp"],"doublesMoves":["allyswitch","helpinghand","icepunch","painsplit","protect","shadowsneak","trickroom","willowisp"]},"froslass":{"level":83,"moves":["destinybond","icebeam","shadowball","spikes","taunt","thunderwave"],"doublesMoves":["destinybond","icebeam","protect","shadowball","taunt","thunderwave","willowisp"]},"rotom":{"level":87,"moves":["hiddenpowerice","painsplit","shadowball","substitute","thunderbolt","trick","voltswitch","willowisp"],"doublesMoves":["electroweb","hiddenpowerice","protect","shadowball","thunderbolt","trick","voltswitch","willowisp"]},"rotomheat":{"level":82,"moves":["hiddenpowerice","overheat","painsplit","thunderbolt","voltswitch","willowisp"],"doublesMoves":["electroweb","overheat","protect","thunderbolt","voltswitch","willowisp"]},"rotomwash":{"level":81,"moves":["defog","hydropump","painsplit","thunderbolt","trick","voltswitch","willowisp"],"doublesMoves":["electroweb","hydropump","protect","thunderbolt","trick","voltswitch","willowisp"]},"rotomfrost":{"level":88,"moves":["blizzard","painsplit","thunderbolt","trick","voltswitch","willowisp"],"doublesMoves":["blizzard","electroweb","protect","thunderbolt","trick","voltswitch","willowisp"]},"rotomfan":{"level":87,"moves":["airslash","defog","painsplit","thunderbolt","voltswitch","willowisp"],"doublesMoves":["airslash","electroweb","protect","thunderbolt","voltswitch","willowisp"]},"rotommow":{"level":84,"moves":["hiddenpowerfire","hiddenpowerice","leafstorm","thunderbolt","trick","voltswitch"],"doublesMoves":["electroweb","hiddenpowerfire","leafstorm","protect","thunderbolt","trick","voltswitch","willowisp"]},"uxie":{"level":84,"moves":["healbell","knockoff","psychic","stealthrock","thunderwave","uturn","yawn"],"doublesMoves":["helpinghand","knockoff","protect","psychic","stealthrock","thunderwave","uturn","yawn"]},"mesprit":{"level":86,"moves":["calmmind","energyball","healingwish","hiddenpowerfire","icebeam","psychic","psyshock","signalbeam","stealthrock","uturn"],"doublesMoves":["calmmind","helpinghand","icebeam","knockoff","protect","psychic","thunderbolt","trick","uturn"]},"azelf":{"level":83,"moves":["dazzlinggleam","explosion","fireblast","knockoff","nastyplot","psyshock","stealthrock","taunt"],"doublesMoves":["fireblast","knockoff","nastyplot","protect","psychic","taunt","thunderbolt","uturn"]},"dialga":{"level":76,"moves":["dracometeor","fireblast","flashcannon","roar","stealthrock","thunderbolt","toxic"],"doublesMoves":["dracometeor","dragonpulse","earthpower","fireblast","flashcannon","protect","thunderbolt"]},"palkia":{"level":76,"moves":["dracometeor","fireblast","hydropump","spacialrend","thunderwave"],"doublesMoves":["dracometeor","fireblast","hydropump","protect","spacialrend","thunderbolt"]},"heatran":{"level":80,"moves":["earthpower","flashcannon","lavaplume","magmastorm","protect","roar","stealthrock","toxic"],"doublesMoves":["earthpower","flashcannon","heatwave","protect","willowisp"]},"regigigas":{"level":88,"moves":["confuseray","drainpunch","knockoff","return","substitute","thunderwave"],"doublesMoves":["icywind","knockoff","return","substitute","thunderwave","wideguard"]},"giratinaorigin":{"level":76,"moves":["defog","dracometeor","earthquake","hex","shadowsneak","thunderwave","willowisp"],"doublesMoves":["dracometeor","dragonpulse","protect","shadowball","shadowsneak","tailwind","willowisp"]},"giratina":{"level":76,"moves":["calmmind","dragonpulse","rest","roar","shadowball","sleeptalk","willowisp"],"doublesMoves":["calmmind","dragonpulse","dragontail","protect","shadowball","tailwind","willowisp"]},"cresselia":{"level":83,"moves":["calmmind","icebeam","moonblast","moonlight","psychic","psyshock","substitute","thunderwave","toxic"],"doublesMoves":["allyswitch","helpinghand","icywind","moonblast","moonlight","protect","psyshock","thunderwave","trickroom"]},"phione":{"level":88,"moves":["healbell","icebeam","knockoff","scald","toxic","uturn"],"doublesMoves":["helpinghand","icywind","protect","scald","uturn"]},"manaphy":{"level":79,"moves":["energyball","icebeam","surf","tailglow"],"doublesMoves":["energyball","helpinghand","icebeam","protect","scald","surf","tailglow"]},"darkrai":{"level":76,"moves":["darkpulse","focusblast","hypnosis","nastyplot","sludgebomb","trick"],"doublesMoves":["darkpulse","focusblast","nastyplot","protect","sludgebomb","snarl"]},"shaymin":{"level":84,"moves":["airslash","earthpower","leechseed","psychic","rest","seedflare","substitute"],"doublesMoves":["airslash","earthpower","leechseed","protect","rest","seedflare","substitute","tailwind"]},"shayminsky":{"level":76,"moves":["airslash","earthpower","hiddenpowerice","leechseed","seedflare","substitute"],"doublesMoves":["airslash","earthpower","hiddenpowerice","protect","rest","seedflare","tailwind"]},"arceus":{"level":74,"moves":["earthquake","extremespeed","recover","shadowclaw","swordsdance"],"doublesMoves":["earthquake","extremespeed","protect","recover","shadowclaw","swordsdance"]},"arceusbug":{"level":74,"moves":["calmmind","earthpower","fireblast","judgment","recover"],"doublesMoves":["earthquake","ironhead","protect","recover","stoneedge","swordsdance","xscissor"]},"arceusdark":{"level":74,"moves":["calmmind","fireblast","judgment","recover","toxic"],"doublesMoves":["calmmind","focusblast","judgment","protect","recover","snarl","willowisp"]},"arceusdragon":{"level":74,"moves":["defog","earthquake","extremespeed","fireblast","judgment","outrage","recover","swordsdance","willowisp"],"doublesMoves":["dragonclaw","earthquake","extremespeed","protect","recover","swordsdance"]},"arceuselectric":{"level":74,"moves":["calmmind","earthpower","icebeam","judgment","recover"],"doublesMoves":["calmmind","icebeam","judgment","protect","recover"]},"arceusfairy":{"level":74,"moves":["calmmind","defog","earthpower","judgment","recover","toxic","willowisp"],"doublesMoves":["calmmind","defog","earthpower","judgment","protect","recover","thunderbolt","willowisp"]},"arceusfighting":{"level":74,"moves":["calmmind","icebeam","judgment","recover","roar","shadowball","stoneedge"],"doublesMoves":["calmmind","icebeam","judgment","protect","recover","shadowball","willowisp"]},"arceusfire":{"level":74,"moves":["calmmind","fireblast","icebeam","recover","roar","thunderbolt"],"doublesMoves":["calmmind","heatwave","judgment","protect","recover","thunderbolt","willowisp"]},"arceusflying":{"level":74,"moves":["calmmind","earthpower","fireblast","judgment","recover","toxic"],"doublesMoves":["calmmind","earthpower","judgment","protect","recover","tailwind"]},"arceusghost":{"level":74,"moves":["brickbreak","defog","extremespeed","judgment","recover","shadowclaw","shadowforce","swordsdance","toxic"],"doublesMoves":["brickbreak","calmmind","focusblast","judgment","protect","recover","shadowforce","swordsdance","willowisp"]},"arceusgrass":{"level":74,"moves":["calmmind","fireblast","icebeam","judgment","recover"],"doublesMoves":["calmmind","heatwave","icebeam","judgment","protect","recover","thunderwave"]},"arceusground":{"level":74,"moves":["earthquake","icebeam","recover","stealthrock","stoneedge","swordsdance","toxic"],"doublesMoves":["calmmind","earthquake","icebeam","judgment","protect","recover","rockslide","stoneedge","swordsdance"]},"arceusice":{"level":74,"moves":["calmmind","fireblast","judgment","recover","thunderbolt"],"doublesMoves":["calmmind","focusblast","icywind","judgment","protect","recover","thunderbolt"]},"arceuspoison":{"level":74,"moves":["calmmind","defog","fireblast","icebeam","recover","sludgebomb"],"doublesMoves":["calmmind","earthpower","heatwave","judgment","protect","recover","sludgebomb","willowisp"]},"arceuspsychic":{"level":74,"moves":["calmmind","fireblast","icebeam","judgment","recover","toxic"],"doublesMoves":["calmmind","focusblast","judgment","protect","psyshock","recover","willowisp"]},"arceusrock":{"level":74,"moves":["earthquake","judgment","recover","stealthrock","stoneedge","swordsdance","willowisp"],"doublesMoves":["earthquake","protect","recover","rockslide","stoneedge","swordsdance"]},"arceussteel":{"level":74,"moves":["defog","earthquake","ironhead","judgment","recover","roar","stoneedge","swordsdance","willowisp"],"doublesMoves":["calmmind","earthpower","judgment","protect","recover","willowisp"]},"arceuswater":{"level":74,"moves":["calmmind","defog","icebeam","judgment","recover","toxic"],"doublesMoves":["calmmind","fireblast","icebeam","icywind","judgment","protect","recover","surf"]},"victini":{"level":80,"moves":["blueflare","boltstrike","focusblast","grassknot","uturn","vcreate","zenheadbutt"],"doublesMoves":["blueflare","boltstrike","protect","psychic","uturn","vcreate"]},"serperior":{"level":80,"moves":["dragonpulse","glare","hiddenpowerfire","leafstorm","leechseed","substitute"],"doublesMoves":["dragonpulse","hiddenpowerfire","leafstorm","protect","taunt"]},"emboar":{"level":86,"moves":["fireblast","flareblitz","grassknot","headsmash","suckerpunch","superpower","wildcharge"],"doublesMoves":["flareblitz","headsmash","heatwave","protect","rockslide","superpower","wildcharge"]},"samurott":{"level":86,"moves":["aquajet","grassknot","hydropump","icebeam","liquidation","megahorn","sacredsword","swordsdance"],"doublesMoves":["aquajet","helpinghand","hiddenpowergrass","hydropump","icebeam","protect","scald","taunt"]},"watchog":{"level":91,"moves":["hypnosis","knockoff","return","substitute","superfang","swordsdance"],"doublesMoves":["hypnosis","knockoff","protect","return","superfang","swordsdance"]},"stoutland":{"level":88,"moves":["crunch","icefang","return","superpower","wildcharge"],"doublesMoves":["crunch","protect","return","superpower","wildcharge"]},"liepard":{"level":89,"moves":["copycat","encore","knockoff","playrough","substitute","thunderwave","uturn"],"doublesMoves":["encore","fakeout","knockoff","playrough","protect","suckerpunch","thunderwave","uturn"]},"simisage":{"level":88,"moves":["focusblast","gigadrain","hiddenpowerice","knockoff","leafstorm","nastyplot","substitute","superpower"],"doublesMoves":["focusblast","gigadrain","helpinghand","hiddenpowerfire","hiddenpowerice","leafstorm","nastyplot","spikyshield","taunt"]},"simisear":{"level":88,"moves":["fireblast","focusblast","grassknot","hiddenpowerrock","nastyplot","substitute"],"doublesMoves":["fireblast","focusblast","grassknot","heatwave","nastyplot","protect","taunt"]},"simipour":{"level":88,"moves":["focusblast","hydropump","icebeam","nastyplot","substitute"],"doublesMoves":["helpinghand","hydropump","icebeam","nastyplot","protect","taunt"]},"musharna":{"level":89,"moves":["calmmind","healbell","moonlight","psychic","psyshock","signalbeam","thunderwave"],"doublesMoves":["helpinghand","hypnosis","moonlight","protect","psychic","signalbeam","thunderwave","trickroom"]},"unfezant":{"level":88,"moves":["hypnosis","nightslash","pluck","return","roost","tailwind","uturn"],"doublesMoves":["nightslash","pluck","protect","return","roost","tailwind","taunt","uturn"]},"zebstrika":{"level":88,"moves":["hiddenpowergrass","overheat","thunderbolt","voltswitch","wildcharge"],"doublesMoves":["hiddenpowergrass","overheat","protect","voltswitch","wildcharge"]},"gigalith":{"level":84,"moves":["earthquake","explosion","stealthrock","stoneedge","superpower"],"doublesMoves":["protect","rockslide","stealthrock","stompingtantrum","stoneedge","superpower","wideguard"]},"swoobat":{"level":88,"moves":["airslash","calmmind","heatwave","roost","storedpower"],"doublesMoves":["airslash","calmmind","heatwave","protect","psychic","tailwind"]},"excadrill":{"level":80,"moves":["earthquake","ironhead","rapidspin","rockslide","swordsdance"],"doublesMoves":["drillrun","earthquake","ironhead","protect","rockslide","swordsdance"]},"audino":{"level":90,"moves":["doubleedge","encore","healbell","protect","toxic","wish"],"doublesMoves":["healpulse","helpinghand","hypervoice","protect","thunderwave","trickroom"]},"audinomega":{"level":92,"moves":["calmmind","dazzlinggleam","fireblast","healbell","protect","wish"],"doublesMoves":["dazzlinggleam","healpulse","helpinghand","hypervoice","protect","thunderwave","trickroom"]},"conkeldurr":{"level":82,"moves":["bulkup","drainpunch","facade","knockoff","machpunch"],"doublesMoves":["drainpunch","facade","knockoff","machpunch","protect"]},"seismitoad":{"level":86,"moves":["earthquake","hydropump","knockoff","raindance","scald","sludgewave","stealthrock","toxic"],"doublesMoves":["earthquake","hydropump","muddywater","protect","raindance","sludgebomb"]},"throh":{"level":88,"moves":["bulkup","circlethrow","icepunch","knockoff","rest","sleeptalk","stormthrow"],"doublesMoves":["circlethrow","helpinghand","icepunch","knockoff","protect","stormthrow"]},"sawk":{"level":87,"moves":["bulkup","closecombat","earthquake","icepunch","knockoff","poisonjab","stoneedge"],"doublesMoves":["closecombat","icepunch","knockoff","protect","rockslide"]},"leavanny":{"level":88,"moves":["knockoff","leafblade","stickyweb","swordsdance","xscissor"],"doublesMoves":["leafblade","protect","stickyweb","swordsdance","xscissor"]},"scolipede":{"level":82,"moves":["earthquake","megahorn","poisonjab","protect","spikes","swordsdance","toxicspikes"],"doublesMoves":["aquatail","megahorn","poisonjab","protect","rockslide","superpower","swordsdance"]},"whimsicott":{"level":86,"moves":["defog","encore","leechseed","memento","moonblast","stunspore","tailwind","taunt","toxic","uturn"],"doublesMoves":["dazzlinggleam","defog","encore","gigadrain","helpinghand","leechseed","moonblast","protect","stunspore","substitute","tailwind","taunt","uturn"]},"lilligant":{"level":87,"moves":["gigadrain","hiddenpowerfire","hiddenpowerrock","petaldance","quiverdance","sleeppowder"],"doublesMoves":["gigadrain","helpinghand","hiddenpowerfire","hiddenpowerice","hiddenpowerrock","petaldance","protect","quiverdance","sleeppowder"]},"basculin":{"level":87,"moves":["aquajet","crunch","headsmash","liquidation","superpower"],"doublesMoves":["aquajet","icebeam","liquidation","muddywater","protect","superpower"]},"basculinbluestriped":{"level":87,"moves":["aquajet","crunch","headsmash","liquidation","superpower"],"doublesMoves":["aquajet","icebeam","liquidation","muddywater","protect","superpower"]},"krookodile":{"level":82,"moves":["earthquake","knockoff","pursuit","stealthrock","stoneedge","superpower"],"doublesMoves":["earthquake","knockoff","protect","stoneedge","superpower"]},"darmanitan":{"level":84,"moves":["earthquake","flareblitz","rockslide","superpower","uturn"],"doublesMoves":["earthquake","flareblitz","protect","rockslide","superpower","uturn"]},"maractus":{"level":90,"moves":["gigadrain","hiddenpowerfire","leechseed","spikes","spikyshield","suckerpunch","toxic"],"doublesMoves":["energyball","helpinghand","hiddenpowerfire","leechseed","spikyshield","suckerpunch"]},"crustle":{"level":84,"moves":["earthquake","shellsmash","spikes","stealthrock","stoneedge","xscissor"],"doublesMoves":["earthquake","protect","rockslide","shellsmash","stoneedge","xscissor"]},"scrafty":{"level":86,"moves":["bulkup","dragondance","drainpunch","highjumpkick","icepunch","knockoff","rest"],"doublesMoves":["drainpunch","fakeout","icepunch","knockoff","protect","superfang"]},"sigilyph":{"level":86,"moves":["airslash","calmmind","heatwave","icebeam","psychic","psyshock","roost"],"doublesMoves":["airslash","calmmind","heatwave","protect","psyshock","tailwind"]},"cofagrigus":{"level":88,"moves":["haze","hiddenpowerfighting","nastyplot","painsplit","shadowball","toxicspikes","trickroom","willowisp"],"doublesMoves":["hiddenpowerfighting","nastyplot","protect","shadowball","trickroom","willowisp"]},"carracosta":{"level":88,"moves":["aquajet","earthquake","liquidation","shellsmash","stoneedge"],"doublesMoves":["aquajet","earthquake","liquidation","protect","rockslide","shellsmash","stoneedge","wideguard"]},"archeops":{"level":87,"moves":["acrobatics","aquatail","earthquake","endeavor","headsmash","stoneedge","uturn"],"doublesMoves":["acrobatics","earthpower","protect","rockslide","stoneedge","tailwind","taunt","uturn"]},"garbodor":{"level":87,"moves":["gunkshot","haze","painsplit","spikes","stompingtantrum","toxic","toxicspikes"],"doublesMoves":["drainpunch","gunkshot","painsplit","protect","toxicspikes"]},"zoroark":{"moves":["darkpulse","flamethrower","focusblast","nastyplot","sludgebomb","trick"],"doublesMoves":["darkpulse","flamethrower","focusblast","knockoff","nastyplot","protect","suckerpunch","uturn"]},"cinccino":{"level":87,"moves":["bulletseed","knockoff","rockblast","tailslap","uturn"],"doublesMoves":["bulletseed","knockoff","protect","rockblast","tailslap","uturn"]},"gothitelle":{"level":87,"moves":["hiddenpowerfighting","psychic","shadowball","signalbeam","thunderbolt","trick"],"doublesMoves":["charm","healpulse","protect","psychic","shadowball","taunt","thunderbolt","trickroom"]},"reuniclus":{"level":86,"moves":["calmmind","focusblast","psychic","psyshock","recover","shadowball","trickroom"],"doublesMoves":["focusblast","helpinghand","protect","psychic","shadowball","trickroom"]},"swanna":{"level":88,"moves":["bravebird","defog","hurricane","icebeam","raindance","roost","scald"],"doublesMoves":["bravebird","hurricane","icebeam","protect","scald","tailwind"]},"vanilluxe":{"level":86,"moves":["autotomize","blizzard","explosion","flashcannon","freezedry","hiddenpowerground"],"doublesMoves":["autotomize","blizzard","flashcannon","freezedry","hiddenpowerground","protect","taunt"]},"sawsbuck":{"level":88,"moves":["hornleech","jumpkick","return","substitute","swordsdance"],"doublesMoves":["hornleech","jumpkick","protect","return","swordsdance"]},"emolga":{"level":88,"moves":["acrobatics","encore","knockoff","roost","thunderbolt","toxic","uturn"],"doublesMoves":["airslash","encore","helpinghand","protect","roost","tailwind","thunderbolt"]},"escavalier":{"level":84,"moves":["drillrun","ironhead","knockoff","megahorn","pursuit","swordsdance"],"doublesMoves":["drillrun","ironhead","knockoff","megahorn","protect","swordsdance"]},"amoonguss":{"level":84,"moves":["clearsmog","foulplay","gigadrain","hiddenpowerfire","sludgebomb","spore","synthesis"],"doublesMoves":["gigadrain","hiddenpowerfire","protect","ragepowder","sludgebomb","spore","stunspore"]},"jellicent":{"level":88,"moves":["icebeam","recover","scald","shadowball","taunt","toxic","willowisp"],"doublesMoves":["icywind","protect","recover","scald","shadowball","trickroom","willowisp"]},"alomomola":{"level":84,"moves":["knockoff","protect","scald","toxic","wish"],"doublesMoves":["helpinghand","icywind","knockoff","protect","scald","wideguard"]},"galvantula":{"level":84,"moves":["bugbuzz","gigadrain","hiddenpowerice","stickyweb","thunder","voltswitch"],"doublesMoves":["bugbuzz","energyball","hiddenpowerice","protect","stickyweb","thunder","voltswitch"]},"ferrothorn":{"level":78,"moves":["gyroball","leechseed","powerwhip","protect","spikes","stealthrock"],"doublesMoves":["gyroball","knockoff","leechseed","powerwhip","protect","stealthrock"]},"klinklang":{"level":86,"moves":["geargrind","return","shiftgear","substitute","wildcharge"],"doublesMoves":["geargrind","protect","return","shiftgear","wildcharge"]},"eelektross":{"level":88,"moves":["flamethrower","gigadrain","hiddenpowerice","knockoff","superpower","thunderbolt","uturn"],"doublesMoves":["flamethrower","gigadrain","knockoff","protect","thunderbolt","uturn","voltswitch"]},"beheeyem":{"level":89,"moves":["hiddenpowerfighting","nastyplot","psychic","psyshock","signalbeam","thunderbolt","trick","trickroom"],"doublesMoves":["hiddenpowerfighting","protect","psychic","recover","signalbeam","thunderbolt","trick","trickroom"]},"chandelure":{"level":83,"moves":["calmmind","energyball","fireblast","hiddenpowerground","shadowball","substitute","trick"],"doublesMoves":["energyball","heatwave","overheat","protect","shadowball","trick"]},"haxorus":{"level":81,"moves":["dragondance","earthquake","outrage","poisonjab","swordsdance","taunt"],"doublesMoves":["dragonclaw","dragondance","earthquake","poisonjab","protect","swordsdance","taunt"]},"beartic":{"level":88,"moves":["aquajet","iciclecrash","nightslash","stoneedge","superpower","swordsdance"],"doublesMoves":["aquajet","iciclecrash","protect","stoneedge","superpower","swordsdance"]},"cryogonal":{"level":88,"moves":["freezedry","haze","hiddenpowerground","icebeam","rapidspin","recover","toxic"],"doublesMoves":["freezedry","hiddenpowerground","icebeam","icywind","protect","recover"]},"accelgor":{"level":87,"moves":["bugbuzz","encore","energyball","focusblast","hiddenpowerrock","spikes","toxicspikes","yawn"],"doublesMoves":["bugbuzz","encore","energyball","focusblast","hiddenpowerrock","protect","sludgebomb","yawn"]},"stunfisk":{"level":88,"moves":["discharge","earthpower","rest","scald","sleeptalk","stealthrock","toxic"],"doublesMoves":["discharge","earthpower","electroweb","protect","scald","stealthrock"]},"mienshao":{"level":84,"moves":["fakeout","highjumpkick","knockoff","poisonjab","stoneedge","swordsdance","uturn"],"doublesMoves":["drainpunch","fakeout","feint","highjumpkick","knockoff","protect","stoneedge","swordsdance","uturn"]},"druddigon":{"level":86,"moves":["dragontail","earthquake","firepunch","glare","gunkshot","outrage","stealthrock","suckerpunch"],"doublesMoves":["dragonclaw","earthquake","firepunch","glare","protect","suckerpunch","superpower","thunderpunch"]},"golurk":{"level":88,"moves":["dynamicpunch","earthquake","icepunch","rockpolish","shadowpunch","stealthrock"],"doublesMoves":["dynamicpunch","earthquake","icepunch","protect","rockpolish","shadowpunch","stoneedge"]},"bisharp":{"level":82,"moves":["ironhead","knockoff","suckerpunch","swordsdance"],"doublesMoves":["ironhead","knockoff","protect","suckerpunch","swordsdance"]},"bouffalant":{"level":88,"moves":["earthquake","headcharge","megahorn","stoneedge","superpower","swordsdance"],"doublesMoves":["headcharge","megahorn","protect","stompingtantrum","stoneedge","superpower","swordsdance"]},"braviary":{"level":86,"moves":["bravebird","bulkup","return","roost","substitute","superpower","uturn"],"doublesMoves":["bravebird","protect","return","skydrop","superpower","tailwind","uturn"]},"mandibuzz":{"level":84,"moves":["bravebird","defog","foulplay","roost","taunt","toxic","uturn"],"doublesMoves":["bravebird","knockoff","protect","roost","snarl","tailwind","taunt","uturn"]},"heatmor":{"level":88,"moves":["fireblast","focusblast","gigadrain","knockoff","suckerpunch"],"doublesMoves":["firelash","gigadrain","incinerate","protect","suckerpunch","superpower"]},"durant":{"level":83,"moves":["honeclaws","ironhead","rockslide","superpower","xscissor"],"doublesMoves":["honeclaws","ironhead","protect","rockslide","superpower","xscissor"]},"hydreigon":{"level":82,"moves":["darkpulse","dracometeor","earthpower","fireblast","flashcannon","roost","superpower","uturn"],"doublesMoves":["darkpulse","dracometeor","fireblast","flashcannon","protect","tailwind","uturn"]},"volcarona":{"level":78,"moves":["bugbuzz","fierydance","fireblast","gigadrain","hiddenpowerground","quiverdance","roost"],"doublesMoves":["bugbuzz","fierydance","gigadrain","heatwave","protect","quiverdance","tailwind"]},"cobalion":{"level":80,"moves":["closecombat","ironhead","stealthrock","stoneedge","swordsdance","voltswitch"],"doublesMoves":["closecombat","ironhead","protect","stoneedge","swordsdance","thunderwave"]},"terrakion":{"level":79,"moves":["closecombat","earthquake","quickattack","stealthrock","stoneedge","swordsdance"],"doublesMoves":["closecombat","protect","rockslide","stompingtantrum","stoneedge","taunt"]},"virizion":{"level":83,"moves":["closecombat","leafblade","stoneedge","swordsdance"],"doublesMoves":["closecombat","leafblade","protect","stoneedge","swordsdance","taunt"]},"tornadus":{"level":83,"moves":["defog","grassknot","heatwave","hurricane","superpower","tailwind","uturn"],"doublesMoves":["heatwave","hurricane","protect","skydrop","superpower","tailwind","taunt","uturn"]},"tornadustherian":{"level":80,"moves":["heatwave","hurricane","knockoff","superpower","taunt","uturn"],"doublesMoves":["heatwave","hurricane","protect","skydrop","tailwind","taunt","uturn"]},"thundurus":{"level":82,"moves":["focusblast","hiddenpowerflying","hiddenpowerice","knockoff","nastyplot","substitute","taunt","thunderbolt","thunderwave"],"doublesMoves":["focusblast","hiddenpowerflying","hiddenpowerice","knockoff","nastyplot","protect","taunt","thunderbolt","thunderwave"]},"thundurustherian":{"level":82,"moves":["focusblast","hiddenpowerflying","hiddenpowerice","nastyplot","thunderbolt","voltswitch"],"doublesMoves":["focusblast","hiddenpowerflying","hiddenpowerice","nastyplot","protect","thunderbolt","voltswitch"]},"reshiram":{"level":76,"moves":["blueflare","dracometeor","dragonpulse","flamecharge","roost","stoneedge","toxic"],"doublesMoves":["blueflare","dracometeor","dragonpulse","flamecharge","heatwave","protect","roost","tailwind"]},"zekrom":{"level":76,"moves":["boltstrike","dracometeor","dragonclaw","honeclaws","outrage","roost","substitute","voltswitch"],"doublesMoves":["boltstrike","dracometeor","dragonclaw","honeclaws","protect","roost","tailwind"]},"landorus":{"level":77,"moves":["calmmind","earthpower","focusblast","knockoff","psychic","rockpolish","rockslide","sludgewave","stealthrock"],"doublesMoves":["earthpower","focusblast","hiddenpowerice","protect","psychic","rockslide","sludgebomb"]},"landorustherian":{"level":79,"moves":["earthquake","fly","rockpolish","stealthrock","stoneedge","superpower","swordsdance","uturn"],"doublesMoves":["earthquake","fly","knockoff","protect","rockslide","stoneedge","superpower","swordsdance","uturn"]},"kyurem":{"level":82,"moves":["dracometeor","earthpower","focusblast","icebeam","outrage","roost","substitute"],"doublesMoves":["dracometeor","dragonpulse","earthpower","glaciate","icebeam","protect","roost"]},"kyuremblack":{"level":80,"moves":["dragonclaw","earthpower","fusionbolt","icebeam","outrage","roost","substitute"],"doublesMoves":["dragonclaw","earthpower","fusionbolt","icebeam","protect","roost"]},"kyuremwhite":{"level":77,"moves":["dracometeor","earthpower","focusblast","fusionflare","icebeam","roost","toxic"],"doublesMoves":["dracometeor","dragonpulse","earthpower","fusionflare","icebeam","protect","roost"]},"keldeo":{"level":80,"moves":["calmmind","hiddenpowerelectric","hiddenpowerflying","hydropump","icywind","scald","secretsword","substitute"],"doublesMoves":["calmmind","hiddenpowerelectric","hiddenpowerflying","hydropump","icywind","protect","secretsword","taunt"]},"meloetta":{"level":84,"moves":["calmmind","focusblast","hypervoice","psyshock","shadowball","trick","uturn"],"doublesMoves":["calmmind","focusblast","hypervoice","protect","psyshock","shadowball"]},"meloettapirouette":{"level":84,"moves":["closecombat","knockoff","relicsong","return"],"doublesMoves":["closecombat","knockoff","protect","relicsong","return"]},"genesect":{"level":76,"moves":["blazekick","extremespeed","flamethrower","icebeam","ironhead","shiftgear","technoblast","thunderbolt","uturn"],"doublesMoves":["bugbuzz","extremespeed","flamethrower","icebeam","ironhead","protect","technoblast","thunderbolt","uturn"]},"chesnaught":{"level":85,"moves":["drainpunch","leechseed","spikes","spikyshield","synthesis","woodhammer"],"doublesMoves":["hammerarm","leechseed","rockslide","spikyshield","stoneedge","woodhammer"]},"delphox":{"level":86,"moves":["calmmind","fireblast","grassknot","psyshock","shadowball","switcheroo"],"doublesMoves":["calmmind","fireblast","grassknot","heatwave","protect","psyshock","switcheroo"]},"greninja":{"level":80,"moves":["gunkshot","hydropump","icebeam","spikes","taunt","toxicspikes","uturn"],"doublesMoves":["darkpulse","gunkshot","hydropump","icebeam","matblock","protect","taunt","uturn"]},"greninjabond":{"level":80,"moves":["darkpulse","hydropump","icebeam","uturn","watershuriken"]},"diggersby":{"level":84,"moves":["agility","earthquake","knockoff","quickattack","return","swordsdance","uturn"],"doublesMoves":["earthquake","knockoff","protect","quickattack","return","uturn"]},"talonflame":{"level":84,"moves":["bravebird","flareblitz","overheat","roost","swordsdance","uturn","willowisp"],"doublesMoves":["bravebird","flareblitz","protect","roost","swordsdance","tailwind","taunt","uturn","willowisp"]},"vivillon":{"level":86,"moves":["energyball","hurricane","quiverdance","sleeppowder","substitute"],"doublesMoves":["bugbuzz","hurricane","protect","quiverdance","sleeppowder"]},"pyroar":{"level":88,"moves":["darkpulse","fireblast","hypervoice","solarbeam","sunnyday","willowisp"],"doublesMoves":["fireblast","hypervoice","protect","solarbeam","sunnyday","willowisp"]},"floetteeternal":{"level":80,"moves":["hiddenpowerfire","hiddenpowerground","lightofruin","moonblast","psychic"],"doublesMoves":["calmmind","dazzlinggleam","hiddenpowerfire","lightofruin","protect","psychic"]},"florges":{"level":84,"moves":["aromatherapy","defog","moonblast","protect","synthesis","toxic","wish"],"doublesMoves":["calmmind","dazzlinggleam","defog","helpinghand","moonblast","protect","psychic"]},"gogoat":{"level":89,"moves":["bulkup","earthquake","hornleech","leechseed","milkdrink","rockslide","substitute"],"doublesMoves":["brickbreak","bulkup","earthquake","hornleech","leechseed","milkdrink","protect","rockslide"]},"pangoro":{"level":86,"moves":["bulletpunch","drainpunch","icepunch","knockoff","superpower","swordsdance"],"doublesMoves":["gunkshot","hammerarm","icepunch","knockoff","partingshot","protect"]},"furfrou":{"level":87,"moves":["cottonguard","rest","return","substitute","suckerpunch","thunderwave","toxic","uturn"],"doublesMoves":["cottonguard","protect","return","snarl","thunderwave","uturn"]},"meowstic":{"level":88,"moves":["healbell","lightscreen","psychic","reflect","thunderwave","toxic","yawn"],"doublesMoves":["fakeout","lightscreen","protect","psychic","reflect","thunderwave"]},"meowsticf":{"level":88,"moves":["calmmind","energyball","psychic","psyshock","shadowball","thunderbolt"],"doublesMoves":["darkpulse","energyball","fakeout","helpinghand","nastyplot","protect","psychic","thunderbolt"]},"doublade":{"level":82,"moves":["ironhead","sacredsword","shadowclaw","shadowsneak","swordsdance"],"doublesMoves":["ironhead","protect","sacredsword","shadowclaw","shadowsneak","swordsdance"]},"aegislash":{"level":78,"moves":["flashcannon","hiddenpowerice","kingsshield","shadowball","shadowsneak","toxic"],"doublesMoves":["flashcannon","hiddenpowerice","kingsshield","shadowball","shadowsneak"]},"aegislashblade":{"level":78,"moves":["ironhead","sacredsword","shadowclaw","shadowsneak","swordsdance"],"doublesMoves":["ironhead","kingsshield","sacredsword","shadowclaw","shadowsneak","swordsdance"]},"aromatisse":{"level":90,"moves":["calmmind","moonblast","rest","sleeptalk","toxic"],"doublesMoves":["healpulse","moonblast","protect","thunderbolt","trickroom"]},"slurpuff":{"level":81,"moves":["bellydrum","drainpunch","playrough","return"],"doublesMoves":["bellydrum","drainpunch","playrough","protect","return"]},"malamar":{"level":82,"moves":["happyhour","knockoff","psychocut","rest","sleeptalk","superpower"],"doublesMoves":["knockoff","protect","psychocut","rockslide","superpower","trickroom"]},"barbaracle":{"level":84,"moves":["earthquake","liquidation","lowkick","shellsmash","stoneedge"],"doublesMoves":["crosschop","liquidation","protect","rockslide","shellsmash"]},"dragalge":{"level":85,"moves":["dracometeor","dragonpulse","focusblast","hiddenpowerfire","scald","sludgewave","toxicspikes"],"doublesMoves":["dracometeor","dragonpulse","focusblast","hiddenpowerfire","protect","scald","sludgebomb"]},"clawitzer":{"level":86,"moves":["aurasphere","darkpulse","icebeam","scald","uturn","waterpulse"],"doublesMoves":["aurasphere","darkpulse","helpinghand","icebeam","muddywater","protect","uturn","waterpulse"]},"heliolisk":{"level":86,"moves":["darkpulse","hiddenpowerice","hypervoice","raindance","surf","thunderbolt","voltswitch"],"doublesMoves":["darkpulse","grassknot","hypervoice","protect","thunderbolt","voltswitch"]},"tyrantrum":{"level":84,"moves":["dragonclaw","dragondance","earthquake","headsmash","outrage","stealthrock","superpower"],"doublesMoves":["dragonclaw","dragondance","earthquake","headsmash","protect","rockslide"]},"aurorus":{"level":88,"moves":["ancientpower","blizzard","earthpower","freezedry","hypervoice","stealthrock","thunderwave"],"doublesMoves":["ancientpower","earthpower","freezedry","hypervoice","icywind","protect","thunderwave"]},"sylveon":{"level":85,"moves":["calmmind","hiddenpowerfire","hypervoice","protect","psyshock","wish"],"doublesMoves":["helpinghand","hiddenpowerground","hypervoice","protect","psyshock","shadowball"]},"hawlucha":{"level":79,"moves":["acrobatics","highjumpkick","skyattack","substitute","swordsdance"],"doublesMoves":["acrobatics","encore","highjumpkick","protect","swordsdance"]},"dedenne":{"level":88,"moves":["protect","recycle","thunderbolt","toxic"],"doublesMoves":["eerieimpulse","helpinghand","nuzzle","recycle","superfang","thunderbolt"]},"carbink":{"level":88,"moves":["explosion","lightscreen","moonblast","powergem","reflect","stealthrock"],"doublesMoves":["explosion","lightscreen","moonblast","protect","reflect","stealthrock","trickroom"]},"goodra":{"level":84,"moves":["dracometeor","dragontail","earthquake","fireblast","powerwhip","sludgebomb","thunderbolt"],"doublesMoves":["dracometeor","dragonpulse","fireblast","muddywater","powerwhip","protect","thunderbolt"]},"klefki":{"level":82,"moves":["dazzlinggleam","foulplay","magnetrise","spikes","thunderwave","toxic"],"doublesMoves":["dazzlinggleam","foulplay","lightscreen","playrough","protect","reflect","thunderwave"]},"trevenant":{"level":88,"moves":["earthquake","hornleech","rockslide","shadowclaw","trickroom","woodhammer"],"doublesMoves":["hornleech","leechseed","protect","rockslide","shadowclaw","trickroom","willowisp","woodhammer"]},"gourgeistsmall":{"level":88,"moves":["leechseed","seedbomb","shadowsneak","substitute","synthesis","willowisp"],"doublesMoves":["leechseed","phantomforce","protect","seedbomb","shadowsneak","willowisp"]},"gourgeistlarge":{"level":88,"moves":["leechseed","seedbomb","shadowsneak","substitute","synthesis","willowisp"],"doublesMoves":["leechseed","phantomforce","protect","seedbomb","shadowsneak","trickroom","willowisp"]},"gourgeist":{"level":88,"moves":["leechseed","seedbomb","shadowsneak","substitute","synthesis","willowisp"],"doublesMoves":["leechseed","phantomforce","protect","seedbomb","shadowsneak","willowisp"]},"gourgeistsuper":{"level":88,"moves":["leechseed","seedbomb","shadowsneak","substitute","synthesis","willowisp"],"doublesMoves":["leechseed","phantomforce","protect","seedbomb","shadowsneak","trickroom","willowisp"]},"avalugg":{"level":88,"moves":["avalanche","earthquake","rapidspin","recover","roar","toxic"],"doublesMoves":["avalanche","earthquake","protect","recover"]},"noivern":{"level":84,"moves":["boomburst","dracometeor","flamethrower","hurricane","roost","switcheroo","taunt","uturn"],"doublesMoves":["dracometeor","flamethrower","hurricane","protect","switcheroo","tailwind","taunt","uturn"]},"xerneas":{"level":68,"moves":["focusblast","geomancy","hiddenpowerfire","moonblast","psyshock","thunderbolt"],"doublesMoves":["closecombat","dazzlinggleam","focusblast","geomancy","hiddenpowerfire","protect","psyshock","rockslide","thunderbolt"]},"yveltal":{"level":74,"moves":["darkpulse","focusblast","foulplay","knockoff","oblivionwing","roost","suckerpunch","taunt","toxic","uturn"],"doublesMoves":["darkpulse","heatwave","oblivionwing","protect","roost","skydrop","snarl","suckerpunch","taunt"]},"zygarde":{"level":72,"moves":["dragondance","extremespeed","outrage","substitute","thousandarrows"],"doublesMoves":["coil","dragondance","extremespeed","glare","protect","rockslide","stoneedge","thousandarrows"]},"zygarde10":{"level":84,"moves":["coil","extremespeed","irontail","outrage","thousandarrows"],"doublesMoves":["dragondance","extremespeed","irontail","protect","thousandarrows"]},"diancie":{"level":84,"moves":["diamondstorm","earthpower","lightscreen","moonblast","reflect","stealthrock"],"doublesMoves":["calmmind","dazzlinggleam","diamondstorm","earthpower","moonblast","protect"]},"dianciemega":{"level":77,"moves":["calmmind","diamondstorm","earthpower","hiddenpowerfire","moonblast"],"doublesMoves":["calmmind","dazzlinggleam","diamondstorm","earthpower","hiddenpowerfire","moonblast","protect","psyshock"]},"hoopa":{"level":85,"moves":["focusblast","nastyplot","psyshock","shadowball","trick"],"doublesMoves":["focusblast","hyperspacehole","protect","shadowball","trickroom"]},"hoopaunbound":{"level":82,"moves":["darkpulse","drainpunch","focusblast","gunkshot","hyperspacefury","icepunch","nastyplot","psychic","substitute","trick","zenheadbutt"],"doublesMoves":["darkpulse","drainpunch","focusblast","gunkshot","hyperspacefury","icepunch","protect","psychic","zenheadbutt"]},"volcanion":{"level":82,"moves":["defog","earthpower","fireblast","sludgebomb","steameruption","substitute","superpower"],"doublesMoves":["earthpower","heatwave","protect","sludgebomb","steameruption"]},"decidueye":{"level":86,"moves":["defog","leafblade","roost","shadowsneak","spiritshackle","swordsdance","uturn"],"doublesMoves":["bravebird","leafblade","protect","spiritshackle","suckerpunch"]},"incineroar":{"level":84,"moves":["darkestlariat","earthquake","fakeout","flareblitz","knockoff","uturn"],"doublesMoves":["fakeout","flareblitz","knockoff","snarl","taunt","uturn","willowisp"]},"primarina":{"level":82,"moves":["energyball","hiddenpowerfire","hydropump","moonblast","psychic","scald"],"doublesMoves":["hypervoice","icebeam","moonblast","protect","psychic"]},"toucannon":{"level":88,"moves":["beakblast","boomburst","brickbreak","bulletseed","roost"],"doublesMoves":["beakblast","bulletseed","protect","rockblast","tailwind"]},"gumshoos":{"level":89,"moves":["crunch","earthquake","firepunch","return","uturn"],"doublesMoves":["crunch","protect","return","superfang","uturn"]},"vikavolt":{"level":86,"moves":["agility","bugbuzz","energyball","hiddenpowerice","thunderbolt","voltswitch"],"doublesMoves":["bugbuzz","hiddenpowerice","protect","stringshot","thunderbolt","voltswitch"]},"crabominable":{"level":88,"moves":["closecombat","earthquake","icehammer","stoneedge"],"doublesMoves":["closecombat","earthquake","icehammer","protect","stoneedge","wideguard"]},"oricorio":{"level":88,"moves":["calmmind","hurricane","revelationdance","roost","toxic","uturn"],"doublesMoves":["airslash","hurricane","protect","revelationdance","tailwind"]},"oricoriopompom":{"level":88,"moves":["calmmind","hurricane","revelationdance","roost","toxic","uturn"],"doublesMoves":["airslash","hurricane","protect","revelationdance","tailwind"]},"oricoriopau":{"level":89,"moves":["calmmind","hurricane","revelationdance","roost","toxic","uturn"],"doublesMoves":["airslash","hurricane","protect","revelationdance","tailwind"]},"oricoriosensu":{"level":88,"moves":["calmmind","hurricane","revelationdance","roost","toxic","uturn"],"doublesMoves":["airslash","hurricane","protect","revelationdance","tailwind"]},"ribombee":{"level":84,"moves":["bugbuzz","hiddenpowerfire","moonblast","quiverdance","roost","stickyweb"],"doublesMoves":["moonblast","pollenpuff","protect","quiverdance","stickyweb"]},"lycanroc":{"level":86,"moves":["accelerock","drillrun","firefang","stoneedge","swordsdance"],"doublesMoves":["accelerock","crunch","firefang","protect","stoneedge","taunt"]},"lycanrocmidnight":{"level":86,"moves":["firepunch","stealthrock","stoneedge","suckerpunch","swordsdance"],"doublesMoves":["protect","stoneedge","suckerpunch","swordsdance","taunt"]},"lycanrocdusk":{"level":84,"moves":["accelerock","drillrun","firefang","return","stoneedge","swordsdance"],"doublesMoves":["accelerock","drillrun","firefang","protect","rockslide","stoneedge"]},"wishiwashischool":{"level":88,"moves":["earthquake","hiddenpowergrass","hydropump","icebeam","scald"],"doublesMoves":["earthquake","endeavor","helpinghand","hiddenpowergrass","hydropump","icebeam","protect"]},"toxapex":{"level":80,"moves":["banefulbunker","haze","recover","scald","toxicspikes"],"doublesMoves":["banefulbunker","haze","recover","scald","toxicspikes","wideguard"]},"mudsdale":{"level":85,"moves":["closecombat","earthquake","heavyslam","rockslide","stealthrock"],"doublesMoves":["closecombat","heavyslam","highhorsepower","protect","rockslide"]},"araquanid":{"level":83,"moves":["liquidation","lunge","mirrorcoat","stickyweb","toxic"],"doublesMoves":["liquidation","lunge","protect","stickyweb","wideguard"]},"lurantis":{"level":90,"moves":["defog","hiddenpowerice","knockoff","leafstorm","superpower","synthesis"],"doublesMoves":["hiddenpowerice","knockoff","leafstorm","protect","superpower"]},"shiinotic":{"level":88,"moves":["gigadrain","leechseed","moonblast","spore","strengthsap"],"doublesMoves":["gigadrain","leechseed","moonblast","protect","spore","strengthsap"]},"salazzle":{"level":84,"moves":["fireblast","hiddenpowergrass","nastyplot","sludgewave"],"doublesMoves":["encore","fakeout","flamethrower","hiddenpowergrass","hiddenpowerground","protect","sludgebomb","taunt"]},"bewear":{"level":85,"moves":["doubleedge","hammerarm","icepunch","return","shadowclaw","swordsdance"],"doublesMoves":["doubleedge","hammerarm","icepunch","protect","wideguard"]},"tsareena":{"level":86,"moves":["highjumpkick","knockoff","powerwhip","rapidspin","synthesis","uturn"],"doublesMoves":["feint","knockoff","playrough","powerwhip","protect","uturn"]},"comfey":{"level":86,"moves":["aromatherapy","defog","drainingkiss","synthesis","toxic","uturn"],"doublesMoves":["drainingkiss","floralhealing","taunt","toxic","uturn"]},"oranguru":{"level":88,"moves":["focusblast","nastyplot","psyshock","thunderbolt","trickroom"],"doublesMoves":["foulplay","instruct","protect","psychic","trickroom"]},"passimian":{"level":85,"moves":["closecombat","earthquake","gunkshot","knockoff","rockslide","uturn"],"doublesMoves":["closecombat","knockoff","protect","rockslide","taunt","uturn"]},"golisopod":{"level":84,"moves":["aquajet","firstimpression","knockoff","liquidation","spikes"],"doublesMoves":["aquajet","firstimpression","leechlife","liquidation","protect","wideguard"]},"palossand":{"level":88,"moves":["earthpower","shadowball","shoreup","stealthrock","toxic"],"doublesMoves":["earthpower","protect","shadowball","shoreup","stealthrock","toxic"]},"pyukumuku":{"level":88,"moves":["block","recover","soak","toxic"],"doublesMoves":["counter","helpinghand","lightscreen","memento","reflect"]},"typenull":{"level":86,"moves":["rest","return","sleeptalk","swordsdance","uturn"]},"silvally":{"level":87,"moves":["crunch","doubleedge","flamecharge","flamethrower","icebeam","ironhead","return","swordsdance","uturn"],"doublesMoves":["crunch","doubleedge","explosion","flamecharge","icebeam","partingshot","protect","swordsdance","uturn"]},"silvallybug":{"level":87,"moves":["defog","flamethrower","icebeam","thunderbolt","uturn"],"doublesMoves":["flamethrower","icebeam","protect","thunderbolt","thunderwave","uturn"]},"silvallydark":{"level":87,"moves":["flamecharge","ironhead","multiattack","swordsdance"],"doublesMoves":["icebeam","multiattack","partingshot","protect","snarl","thunderwave","uturn"]},"silvallydragon":{"level":87,"moves":["dracometeor","flamecharge","flamethrower","icebeam","ironhead","multiattack","swordsdance","uturn"],"doublesMoves":["flamethrower","icebeam","multiattack","partingshot","protect","thunderwave","uturn"]},"silvallyelectric":{"level":87,"moves":["defog","flamethrower","icebeam","multiattack","partingshot","toxic"],"doublesMoves":["icebeam","partingshot","protect","snarl","thunderbolt","thunderwave","uturn"]},"silvallyfairy":{"level":87,"moves":["defog","flamethrower","multiattack","partingshot","rockslide","thunderwave"],"doublesMoves":["flamethrower","icebeam","multiattack","partingshot","protect","thunderwave","uturn"]},"silvallyfighting":{"level":87,"moves":["flamecharge","ironhead","multiattack","shadowclaw","swordsdance"],"doublesMoves":["flamecharge","multiattack","protect","rockslide","swordsdance"]},"silvallyfire":{"level":87,"moves":["defog","icebeam","multiattack","thunderbolt","uturn"],"doublesMoves":["flamethrower","icebeam","protect","snarl","thunderbolt","thunderwave","uturn"]},"silvallyflying":{"level":87,"moves":["defog","flamethrower","ironhead","multiattack","partingshot","thunderwave"],"doublesMoves":["flamecharge","ironhead","multiattack","partingshot","protect","swordsdance","thunderwave","uturn"]},"silvallyghost":{"level":87,"moves":["defog","flamethrower","icebeam","multiattack","partingshot","toxic"],"doublesMoves":["icebeam","multiattack","partingshot","protect","uturn"]},"silvallygrass":{"level":87,"moves":["defog","flamethrower","icebeam","multiattack","partingshot","toxic"],"doublesMoves":["flamethrower","icebeam","multiattack","partingshot","protect","thunderwave","uturn"]},"silvallyground":{"level":87,"moves":["flamecharge","multiattack","rockslide","swordsdance"],"doublesMoves":["flamecharge","icebeam","multiattack","protect","rockslide","swordsdance","thunderbolt"]},"silvallyice":{"level":87,"moves":["defog","flamethrower","multiattack","thunderbolt","toxic","uturn"],"doublesMoves":["icebeam","partingshot","protect","thunderbolt","thunderwave","uturn"]},"silvallypoison":{"level":87,"moves":["defog","flamethrower","icebeam","multiattack","partingshot","toxic"],"doublesMoves":["flamethrower","icebeam","multiattack","partingshot","protect","thunderwave","uturn"]},"silvallypsychic":{"level":87,"moves":["defog","flamethrower","multiattack","partingshot","rockslide","thunderwave"],"doublesMoves":["flamethrower","multiattack","partingshot","protect","thunderwave","uturn"]},"silvallyrock":{"level":87,"moves":["defog","flamethrower","grasspledge","multiattack","partingshot","toxic"],"doublesMoves":["flamethrower","icebeam","partingshot","protect","rockslide","uturn"]},"silvallysteel":{"level":87,"moves":["crunch","defog","flamethrower","multiattack","thunderbolt"],"doublesMoves":["flamecharge","multiattack","partingshot","protect","rockslide","swordsdance","uturn"]},"silvallywater":{"level":87,"moves":["defog","icebeam","multiattack","partingshot","thunderbolt"],"doublesMoves":["flamethrower","icebeam","multiattack","partingshot","protect","thunderbolt","thunderwave","uturn"]},"minior":{"level":82,"moves":["acrobatics","earthquake","powergem","shellsmash"],"doublesMoves":["acrobatics","earthquake","powergem","protect","shellsmash"]},"komala":{"level":88,"moves":["earthquake","playrough","return","suckerpunch","uturn","woodhammer"],"doublesMoves":["playrough","protect","return","shadowclaw","suckerpunch","swordsdance","uturn","woodhammer"]},"turtonator":{"level":87,"moves":["dracometeor","dragonpulse","dragontail","earthquake","explosion","fireblast","shellsmash"],"doublesMoves":["dracometeor","dragonpulse","fireblast","protect","shellsmash"]},"togedemaru":{"level":86,"moves":["ironhead","nuzzle","spikyshield","uturn","wish","zingzap"],"doublesMoves":["encore","fakeout","ironhead","nuzzle","spikyshield","uturn","zingzap"]},"mimikyu":{"level":78,"moves":["playrough","shadowclaw","shadowsneak","swordsdance","taunt"],"doublesMoves":["playrough","protect","shadowclaw","shadowsneak","swordsdance","willowisp"]},"bruxish":{"level":86,"moves":["aquajet","crunch","icefang","liquidation","psychicfangs","swordsdance"],"doublesMoves":["aquajet","crunch","liquidation","protect","psychicfangs","swordsdance"]},"drampa":{"level":89,"moves":["defog","dracometeor","dragonpulse","fireblast","glare","hypervoice","roost","thunderbolt"],"doublesMoves":["dracometeor","dragonpulse","fireblast","glare","hypervoice","protect","roost"]},"dhelmise":{"level":88,"moves":["anchorshot","earthquake","knockoff","powerwhip","rapidspin","synthesis"],"doublesMoves":["anchorshot","knockoff","powerwhip","protect","rapidspin"]},"kommoo":{"level":77,"moves":["clangingscales","closecombat","dragondance","outrage","poisonjab"],"doublesMoves":["clangingscales","closecombat","dragondance","poisonjab"]},"tapukoko":{"level":78,"moves":["bravebird","dazzlinggleam","defog","naturesmadness","thunderbolt","uturn"],"doublesMoves":["dazzlinggleam","hiddenpowerice","naturesmadness","protect","skydrop","taunt","thunderbolt","uturn"]},"tapulele":{"level":80,"moves":["calmmind","focusblast","hiddenpowerfire","moonblast","psychic","psyshock"],"doublesMoves":["dazzlinggleam","focusblast","moonblast","protect","psychic","taunt"]},"tapubulu":{"level":81,"moves":["bulkup","hornleech","megahorn","stoneedge","superpower","woodhammer"],"doublesMoves":["hornleech","naturesmadness","protect","stoneedge","superpower","woodhammer"]},"tapufini":{"level":80,"moves":["calmmind","hydropump","icebeam","moonblast","scald","taunt"],"doublesMoves":["healpulse","moonblast","muddywater","naturesmadness","protect","swagger","taunt"]},"solgaleo":{"level":76,"moves":["earthquake","flareblitz","morningsun","stoneedge","sunsteelstrike","zenheadbutt"],"doublesMoves":["flareblitz","morningsun","protect","sunsteelstrike","wideguard","zenheadbutt"]},"lunala":{"level":74,"moves":["calmmind","focusblast","moonblast","moongeistbeam","psyshock","roost"],"doublesMoves":["moonblast","moongeistbeam","protect","psychic","roost","wideguard"]},"nihilego":{"level":81,"moves":["grassknot","powergem","sludgewave","stealthrock","thunderbolt","toxicspikes"],"doublesMoves":["grassknot","hiddenpowerice","powergem","protect","sludgebomb","thunderbolt"]},"buzzwole":{"level":80,"moves":["drainpunch","earthquake","leechlife","poisonjab","stoneedge","superpower"],"doublesMoves":["drainpunch","icepunch","leechlife","poisonjab","protect","superpower"]},"pheromosa":{"level":76,"moves":["highjumpkick","icebeam","poisonjab","throatchop","uturn"],"doublesMoves":["bugbuzz","highjumpkick","icebeam","poisonjab","protect","speedswap","uturn"]},"xurkitree":{"level":82,"moves":["dazzlinggleam","electricterrain","energyball","hiddenpowerice","thunderbolt","voltswitch"],"doublesMoves":["energyball","hiddenpowerice","hypnosis","protect","tailglow","thunderbolt"]},"celesteela":{"level":80,"moves":["airslash","autotomize","earthquake","fireblast","heavyslam","leechseed","protect"],"doublesMoves":["earthquake","fireblast","heavyslam","leechseed","protect","wideguard"]},"kartana":{"level":77,"moves":["knockoff","leafblade","sacredsword","smartstrike","swordsdance"],"doublesMoves":["knockoff","leafblade","protect","sacredsword","smartstrike","swordsdance"]},"guzzlord":{"level":88,"moves":["dracometeor","earthquake","fireblast","heavyslam","knockoff"],"doublesMoves":["dracometeor","fireblast","knockoff","protect","wideguard"]},"necrozma":{"level":83,"moves":["calmmind","heatwave","moonlight","photongeyser","stealthrock"],"doublesMoves":["calmmind","earthpower","heatwave","moonlight","photongeyser"]},"necrozmaduskmane":{"level":71,"moves":["autotomize","earthquake","knockoff","photongeyser","sunsteelstrike","swordsdance"],"doublesMoves":["earthquake","knockoff","photongeyser","rockslide","sunsteelstrike","swordsdance"]},"necrozmadawnwings":{"level":73,"moves":["calmmind","heatwave","moongeistbeam","photongeyser","powergem","trickroom"]},"magearna":{"level":79,"moves":["calmmind","flashcannon","fleurcannon","focusblast","ironhead","shiftgear","thunderbolt"],"doublesMoves":["aurasphere","dazzlinggleam","flashcannon","fleurcannon","protect","trickroom","voltswitch"]},"marshadow":{"level":71,"moves":["bulkup","closecombat","icepunch","rocktomb","shadowsneak","spectralthief"],"doublesMoves":["bulkup","closecombat","icepunch","protect","shadowsneak","spectralthief"]},"naganadel":{"level":76,"moves":["dracometeor","dragonpulse","fireblast","nastyplot","sludgewave","uturn"],"doublesMoves":["dracometeor","dragonpulse","fireblast","protect","sludgebomb","tailwind","uturn"]},"stakataka":{"level":84,"moves":["earthquake","gyroball","stealthrock","stoneedge","superpower","trickroom"],"doublesMoves":["earthquake","gyroball","rockslide","stealthrock","stoneedge","superpower","trickroom"]},"blacephalon":{"level":80,"moves":["calmmind","explosion","fireblast","hiddenpowerice","shadowball","trick"],"doublesMoves":["fireblast","heatwave","hiddenpowerice","protect","shadowball","willowisp"]},"zeraora":{"level":81,"moves":["closecombat","grassknot","hiddenpowerice","knockoff","plasmafists","voltswitch","workup"],"doublesMoves":["closecombat","fakeout","grassknot","hiddenpowerice","knockoff","plasmafists","protect","voltswitch"]}} as any;
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

const ZeroAttackHPIVs: {[k: string]: SparseStatsTable} = {
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

export class RandomGen7Teams extends RandomGen8Teams {
	randomData: {[species: string]: OldRandomBattleSpecies} = randomDataJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);

		this.noStab = [...this.noStab, 'voltswitch'];

		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter) => (
				['megahorn', 'pinmissile'].some(m => movePool.includes(m)) ||
				!counter.get('Bug') && (abilities.has('Tinted Lens') || abilities.has('Adaptability'))
			),
			Dark: (movePool, moves, abilities, types, counter, species) => (
				(!counter.get('Dark') && !abilities.has('Protean')) ||
				(moves.has('pursuit') && species.types.length > 1 && counter.get('Dark') === 1)
			),
			Dragon: (movePool, moves, abilities, types, counter) => (
				!counter.get('Dragon') &&
				!abilities.has('Aerilate') && !abilities.has('Pixilate') &&
				!moves.has('dragonascent') && !moves.has('fly') && !moves.has('rest') && !moves.has('sleeptalk')
			),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric') || movePool.includes('thunder'),
			Fairy: (movePool, moves, abilities, types, counter) => (
				(!counter.get('Fairy') && !types.has('Flying') && !abilities.has('Pixilate'))
			),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting') || !counter.get('stab'),
			Fire: (movePool, moves, abilities, types, counter) => (
				!counter.get('Fire') || ['eruption', 'quiverdance'].some(m => movePool.includes(m)) ||
				moves.has('flamecharge') && (movePool.includes('flareblitz') || movePool.includes('blueflare'))
			),
			Flying: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Flying') && (
					species.id === 'rotomfan' ||
					abilities.has('Gale Wings') ||
					abilities.has('Serene Grace') || (
						types.has('Normal') && (movePool.includes('beakblast') || movePool.includes('bravebird'))
					)
				)
			),
			Ghost: (movePool, moves, abilities, types, counter) => (
				(!counter.get('Ghost') || movePool.includes('spectralthief')) &&
				!types.has('Dark') &&
				!abilities.has('Steelworker')
			),
			Grass: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Grass') && (species.baseStats.atk >= 100 || movePool.includes('leafstorm'))
			),
			Ground: (movePool, moves, abilities, types, counter) => (
				!counter.get('Ground') && !moves.has('rest') && !moves.has('sleeptalk')
			),
			Ice: (movePool, moves, abilities, types, counter) => (
				!abilities.has('Refrigerate') && (
					!counter.get('Ice') ||
					movePool.includes('iciclecrash') ||
					(abilities.has('Snow Warning') && movePool.includes('blizzard'))
				)
			),
			Normal: movePool => movePool.includes('facade'),
			Poison: (movePool, moves, abilities, types, counter) => (
				!counter.get('Poison') &&
				(!!counter.setupType || abilities.has('Adaptability') || abilities.has('Sheer Force') || movePool.includes('gunkshot'))
			),
			Psychic: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Psychic') && (
					abilities.has('Psychic Surge') ||
					movePool.includes('psychicfangs') ||
					(!types.has('Steel') && !types.has('Flying') && !abilities.has('Pixilate') &&
						counter.get('stab') < species.types.length)
				)
			),
			Rock: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Rock') &&
				!types.has('Fairy') &&
				(counter.setupType === 'Physical' || species.baseStats.atk >= 105 || abilities.has('Rock Head'))
			),
			Steel: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Steel') && (species.baseStats.atk >= 100 || abilities.has('Steelworker'))
			),
			Water: (movePool, moves, abilities, types, counter, species) => (
				(!counter.get('Water') && !abilities.has('Protean')) ||
				!counter.get('stab') ||
				movePool.includes('crabhammer') ||
				(abilities.has('Huge Power') && movePool.includes('aquajet'))
			),
			Adaptability: (movePool, moves, abilities, types, counter, species) => (
				!counter.setupType &&
				species.types.length > 1 &&
				(!counter.get(species.types[0]) || !counter.get(species.types[1]))
			),
			Contrary: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('contrary') && species.name !== 'Shuckle'
			),
			'Slow Start': movePool => movePool.includes('substitute'),
			protect: movePool => movePool.includes('wish'),
			wish: (movePool, moves, abilities, types, counter, species) => (
				species.baseStats.hp < 110 && !abilities.has('Regenerator') && movePool.includes('protect')
			),
		};
	}

	shouldCullMove(
		move: Move,
		types: Set<string>,
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean
	): {cull: boolean, isSetup?: boolean} {
		const hasRestTalk = moves.has('rest') && moves.has('sleeptalk');
		switch (move.id) {
		// Not very useful without their supporting moves
		case 'clangingscales': case 'electricterrain': case 'happyhour': case 'holdhands':
			return {
				cull: !!teamDetails.zMove || hasRestTalk,
				isSetup: move.id === 'happyhour' || move.id === 'holdhands',
			};
		case 'cottonguard': case 'defendorder':
			return {cull: !counter.get('recovery') && !moves.has('rest')};
		case 'bounce': case 'dig': case 'fly':
			return {cull: !!teamDetails.zMove || counter.setupType !== 'Physical'};
		case 'focuspunch':
			return {cull: !moves.has('substitute') || counter.damagingMoves.size < 2};
		case 'icebeam':
			return {cull: abilities.has('Tinted Lens') && !!counter.get('Status')};
		case 'lightscreen':
			if (movePool.length > 1) {
				const screen = movePool.indexOf('reflect');
				if (screen >= 0) this.fastPop(movePool, screen);
			}
			return {cull: !moves.has('reflect')};
		case 'perishsong':
			return {cull: !moves.has('protect')};
		case 'reflect':
			if (movePool.length > 1) {
				const screen = movePool.indexOf('lightscreen');
				if (screen >= 0) this.fastPop(movePool, screen);
			}
			return {cull: !moves.has('calmmind') && !moves.has('lightscreen')};
		case 'rest':
			return {cull: movePool.includes('sleeptalk')};
		case 'sleeptalk':
			if (movePool.length > 1) {
				const rest = movePool.indexOf('rest');
				if (rest >= 0) this.fastPop(movePool, rest);
			}
			return {cull: !moves.has('rest')};
		case 'storedpower':
			return {cull: !counter.setupType};
		case 'switcheroo': case 'trick':
			return {cull: (
				counter.get('Physical') + counter.get('Special') < 3 ||
				['electroweb', 'snarl', 'suckerpunch'].some(m => moves.has(m))
			)};

		// Set up once and only if we have the moves for it
		case 'bellydrum': case 'bulkup': case 'coil': case 'curse': case 'dragondance': case 'honeclaws': case 'swordsdance':
			return {cull: (
				counter.setupType !== 'Physical' ||
				counter.get('physicalsetup') > 1 ||
				(counter.get('Physical') + counter.get('physicalpool') < 2 && !hasRestTalk) ||
				(move.id === 'bulkup' && hasRestTalk) ||
				(move.id === 'bellydrum' && !abilities.has('Unburden') && !counter.get('priority'))
			), isSetup: true};
		case 'calmmind': case 'geomancy': case 'nastyplot': case 'tailglow':
			if (types.has('Dark') && moves.has('darkpulse')) {
				counter.setupType = 'Special';
				return {cull: false, isSetup: true};
			}
			return {cull: (
				counter.setupType !== 'Special' ||
				counter.get('specialsetup') > 1 ||
				(counter.get('Special') + counter.get('specialpool') < 2 && !hasRestTalk)
			), isSetup: true};
		case 'growth': case 'shellsmash': case 'workup':
			return {cull: (
				counter.setupType !== 'Mixed' ||
				counter.get('mixedsetup') > 1 ||
				counter.damagingMoves.size + counter.get('physicalpool') + counter.get('specialpool') < 2 ||
				(move.id === 'growth' && !moves.has('sunnyday'))
			), isSetup: true};
		case 'agility': case 'autotomize': case 'rockpolish': case 'shiftgear':
			return {cull: counter.damagingMoves.size < 2 || hasRestTalk, isSetup: !counter.setupType};
		case 'flamecharge':
			return {cull: (
				moves.has('dracometeor') ||
				moves.has('overheat') ||
				(counter.damagingMoves.size < 3 && !counter.setupType)
			)};

		// Bad after setup
		case 'circlethrow': case 'dragontail':
			return {cull: (
				!!counter.get('speedsetup') ||
				(isDoubles && moves.has('superpower')) ||
				(!!counter.setupType && ((!moves.has('rest') && !moves.has('sleeptalk')) || moves.has('stormthrow'))) ||
				['encore', 'raindance', 'roar', 'trickroom', 'whirlwind'].some(m => moves.has(m)) ||
				(counter.get(move.type) > 1 && counter.get('Status') > 1) ||
				(abilities.has('Sheer Force') && !!counter.get('sheerforce'))
			)};
		case 'defog':
			return {cull: !!counter.setupType || moves.has('spikes') || moves.has('stealthrock') || !!teamDetails.defog};
		case 'fakeout': case 'tailwind':
			return {cull: !!counter.setupType || ['substitute', 'switcheroo', 'trick'].some(m => moves.has(m))};
		case 'foulplay':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				counter.get('Dark') > 2 ||
				moves.has('clearsmog') ||
				(!!counter.get('priority') && counter.damagingMoves.size - 1 === counter.get('priority')) ||
				hasRestTalk
			)};
		case 'haze': case 'spikes':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('trickroom')};
		case 'healbell': case 'technoblast':
			return {cull: !!counter.get('speedsetup')};
		case 'healingwish': case 'memento':
			return {cull: !!counter.setupType || !!counter.get('recovery') || moves.has('substitute')};
		case 'helpinghand': case 'superfang': case 'yawn':
			return {cull: !!counter.setupType};
		case 'icywind': case 'stringshot':
			return {cull: !!counter.get('speedsetup') || moves.has('trickroom')};
		case 'leechseed': case 'roar': case 'whirlwind':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				moves.has('dragontail') ||
				(isDoubles && (movePool.includes('protect') || movePool.includes('spikyshield')))
			)};
		case 'protect':
			const doublesCondition = (
				moves.has('fakeout') ||
				(moves.has('tailwind') && moves.has('roost')) ||
				movePool.includes('bellydrum') ||
				movePool.includes('shellsmash')
			);
			const singlesCondition = (
				(counter.setupType && !moves.has('wish')) ||
				(!['Guts', 'Harvest', 'Quick Feet', 'Speed Boost'].some(abil => abilities.has(abil)) &&
				!['leechseed', 'perishsong', 'toxic', 'wish'].some(m => moves.has(m)) &&
				species.id !== 'sharpedomega')
			);
			return {cull: (
				(isDoubles ? doublesCondition : singlesCondition) ||
				!!counter.get('speedsetup') ||
				moves.has('rest') || moves.has('roar') || moves.has('whirlwind') ||
				(moves.has('lightscreen') && moves.has('reflect'))
			)};
		case 'pursuit':
			return {cull: (
				!!counter.setupType ||
				counter.get('Status') > 1 ||
				counter.get('Dark') > 2 ||
				(moves.has('knockoff') && !types.has('Dark'))
			)};
		case 'rapidspin':
			return {cull: !!counter.setupType || !!teamDetails.rapidSpin};
		case 'reversal':
			return {cull: moves.has('substitute') && !!teamDetails.zMove};
		case 'seismictoss':
			return {cull: !abilities.has('Parental Bond') && (counter.damagingMoves.size > 1 || !!counter.setupType)};
		case 'stealthrock':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				['rest', 'substitute', 'trickroom'].some(m => moves.has(m)) ||
				!!teamDetails.stealthRock
			)};
		case 'stickyweb':
			return {cull: !!teamDetails.stickyWeb};
		case 'toxicspikes':
			return {cull: !!counter.setupType || !!teamDetails.toxicSpikes};
		case 'trickroom':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				counter.damagingMoves.size < 2 ||
				moves.has('lightscreen') ||
				moves.has('reflect')
			)};
		case 'uturn':
			return {cull: (
				(abilities.has('Speed Boost') && moves.has('protect')) ||
				(abilities.has('Protean') && counter.get('Status') > 2) ||
				!!counter.setupType ||
				!!counter.get('speedsetup')
			)};
		case 'voltswitch':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				movePool.includes('boltstrike') ||
				['electricterrain', 'raindance', 'uturn'].some(m => moves.has(m))
			)};
		case 'wish':
			return {cull: (
				species.baseStats.hp < 110 &&
				!abilities.has('Regenerator') &&
				!movePool.includes('protect') &&
				!['ironhead', 'protect', 'spikyshield', 'uturn'].some(m => moves.has(m))
			)};

		// Bit redundant to have both
		// Attacks:
		case 'bugbite': case 'bugbuzz': case 'infestation': case 'signalbeam':
			return {cull: moves.has('uturn') && !counter.setupType && !abilities.has('Tinted Lens')};
		case 'darkestlariat': case 'nightslash':
			return {cull: moves.has('knockoff') || moves.has('pursuit')};
		case 'darkpulse':
			return {cull: ['crunch', 'knockoff', 'hyperspacefury'].some(m => moves.has(m)) && counter.setupType !== 'Special'};
		case 'suckerpunch':
			return {cull: counter.damagingMoves.size < 2 || moves.has('glare') || !types.has('Dark') && counter.get('Dark') > 1};
		case 'dracometeor':
			return {cull: hasRestTalk};
		case 'dragonpulse': case 'spacialrend':
			return {cull: moves.has('dracometeor') || moves.has('outrage') || (moves.has('dragontail') && !counter.setupType)};
		case 'outrage':
			return {cull: (
				moves.has('dragonclaw') ||
				(moves.has('dracometeor') && counter.damagingMoves.size < 3) ||
				(moves.has('clangingscales') && !teamDetails.zMove)
			)};
		case 'thunderbolt':
			return {cull: ['discharge', 'wildcharge'].some(m => moves.has(m))};
		case 'moonblast':
			return {cull: isDoubles && moves.has('dazzlinggleam')};
		case 'aurasphere': case 'focusblast':
			return {cull: (
				hasRestTalk ||
				((moves.has('closecombat') || moves.has('superpower')) && counter.setupType !== 'Special')
			)};
		case 'drainpunch':
			return {cull: (
				(!moves.has('bulkup') && (moves.has('closecombat') || moves.has('highjumpkick'))) ||
				((moves.has('focusblast') || moves.has('superpower')) && counter.setupType !== 'Physical')
			)};
		case 'closecombat': case 'highjumpkick':
			return {cull: (
				(moves.has('bulkup') && moves.has('drainpunch')) ||
				(counter.setupType === 'Special' && ['aurasphere', 'focusblast'].some(m => moves.has(m) || movePool.includes(m)))
			)};
		case 'dynamicpunch': case 'vacuumwave':
			return {cull: (moves.has('closecombat') || moves.has('facade')) && counter.setupType !== 'Special'};
		case 'stormthrow':
			return {cull: moves.has('circlethrow') && hasRestTalk};
		case 'superpower':
			return {
				cull: (counter.get('Fighting') > 1 && !!counter.setupType) || (hasRestTalk && !abilities.has('Contrary')),
				isSetup: abilities.has('Contrary'),
			};
		case 'fierydance': case 'heatwave':
			return {cull: moves.has('fireblast') && (!!counter.get('Status') || isDoubles)};
		case 'firefang': case 'firepunch': case 'flamethrower':
			return {cull: (
				['blazekick', 'heatwave', 'overheat'].some(m => moves.has(m)) ||
				((moves.has('fireblast') || moves.has('lavaplume')) && counter.setupType !== 'Physical')
			)};
		case 'fireblast': case 'magmastorm':
			return {cull: (
				(moves.has('flareblitz') && counter.setupType !== 'Special') ||
				(moves.has('lavaplume') && !counter.setupType && !counter.get('speedsetup'))
			)};
		case 'lavaplume':
			return {cull: moves.has('firepunch') || moves.has('fireblast') && (!!counter.setupType || !!counter.get('speedsetup'))};
		case 'overheat':
			return {cull: ['fireblast', 'flareblitz', 'lavaplume'].some(m => moves.has(m))};
		case 'hurricane':
			return {cull: moves.has('bravebird') || moves.has('airslash') && !!counter.get('Status')};
		case 'hex':
			return {cull: !moves.has('thunderwave') && !moves.has('willowisp')};
		case 'shadowball':
			return {cull: moves.has('darkpulse') || (moves.has('hex') && moves.has('willowisp'))};
		case 'shadowclaw':
			return {cull: (
				moves.has('shadowforce') ||
				moves.has('shadowsneak') ||
				(moves.has('shadowball') && counter.setupType !== 'Physical')
			)};
		case 'shadowsneak':
			return {cull: (
				moves.has('trick') ||
				hasRestTalk ||
				(types.has('Ghost') && species.types.length > 1 && counter.get('stab') < 2)
			)};
		case 'gigadrain':
			return {cull: (
				moves.has('petaldance') ||
				moves.has('powerwhip') ||
				(!isDoubles && moves.has('seedbomb')) ||
				(moves.has('leafstorm') && counter.get('Special') < 4 && !counter.setupType && !moves.has('trickroom'))
			)};
		case 'leafblade': case 'woodhammer':
			return {cull: (
				(moves.has('gigadrain') && counter.setupType !== 'Physical') ||
				(moves.has('hornleech') && !!counter.setupType)
			)};
		case 'leafstorm':
			return {cull: (
				moves.has('trickroom') ||
				(isDoubles && moves.has('energyball')) ||
				(counter.get('Grass') > 1 && !!counter.setupType)
			)};
		case 'solarbeam':
			return {cull: (
				(!abilities.has('Drought') && !moves.has('sunnyday')) ||
				moves.has('gigadrain') ||
				moves.has('leafstorm')
			)};
		case 'bonemerang': case 'precipiceblades':
			return {cull: moves.has('earthquake')};
		case 'earthpower':
			return {cull: moves.has('earthquake') && counter.setupType !== 'Special'};
		case 'earthquake':
			return {cull: isDoubles && moves.has('highhorsepower') || moves.has('closecombat') && abilities.has('Aerilate')};
		case 'freezedry':
			return {cull: (
				moves.has('icebeam') || moves.has('icywind') || counter.get('stab') < species.types.length ||
				(moves.has('blizzard') && !!counter.setupType)
			)};
		case 'bodyslam': case 'return':
			return {cull: (
				moves.has('doubleedge') ||
				(moves.has('glare') && moves.has('headbutt')) ||
				(move.id === 'return' && moves.has('bodyslam'))
			)};
		case 'endeavor':
			return {cull: !isLead && !abilities.has('Defeatist')};
		case 'explosion':
			return {cull: (
				!!counter.setupType ||
				moves.has('wish') ||
				(abilities.has('Refrigerate') && (moves.has('freezedry') || movePool.includes('return')))
			)};
		case 'extremespeed': case 'skyattack':
			return {cull: moves.has('substitute') || counter.setupType !== 'Physical' && moves.has('vacuumwave')};
		case 'facade':
			return {cull: moves.has('bulkup') || hasRestTalk};
		case 'hiddenpower':
			return {cull: (
				moves.has('rest') ||
				(!counter.get('stab') && counter.damagingMoves.size < 2) ||
				// Force Moonblast on Special-setup Fairies
				(counter.setupType === 'Special' && types.has('Fairy') && movePool.includes('moonblast'))
			)};
		case 'hypervoice':
			return {cull: moves.has('blizzard')};
		case 'judgment':
			return {cull: counter.setupType !== 'Special' && counter.get('stab') > 1};
		case 'quickattack':
			return {cull: (
				!!counter.get('speedsetup') ||
				(types.has('Rock') && !!counter.get('Status')) ||
				moves.has('feint') ||
				(types.has('Normal') && !counter.get('stab'))
			)};
		case 'weatherball':
			return {cull: !moves.has('raindance') && !moves.has('sunnyday')};
		case 'poisonjab':
			return {cull: moves.has('gunkshot')};
		case 'acidspray': case 'sludgewave':
			return {cull: moves.has('poisonjab') || moves.has('sludgebomb')};
		case 'psychic':
			return {cull: moves.has('psyshock')};
		case 'psychocut': case 'zenheadbutt':
			return {cull: (
				((moves.has('psychic') || moves.has('psyshock')) && counter.setupType !== 'Physical') ||
				(abilities.has('Contrary') && !counter.setupType && !!counter.get('physicalpool'))
			)};
		case 'psyshock':
			const psychic = movePool.indexOf('psychic');
			if (psychic >= 0) this.fastPop(movePool, psychic);
			return {cull: false};
		case 'headsmash':
			return {cull: moves.has('stoneedge') || isDoubles && moves.has('rockslide')};
		case 'rockblast': case 'rockslide':
			return {cull: (moves.has('headsmash') || moves.has('stoneedge')) && !isDoubles};
		case 'stoneedge':
			return {cull: moves.has('rockslide') || (species.id === 'machamp' && !moves.has('dynamicpunch'))};
		case 'bulletpunch':
			return {cull: types.has('Steel') && counter.get('stab') < 2 && !abilities.has('Technician')};
		case 'flashcannon':
			return {cull: (moves.has('ironhead') || moves.has('meteormash')) && counter.setupType !== 'Special'};
		case 'hydropump':
			return {cull: (
				moves.has('liquidation') ||
				moves.has('waterfall') ||
				hasRestTalk || (
					moves.has('scald') &&
					((counter.get('Special') < 4 && !moves.has('uturn')) || (species.types.length > 1 && counter.get('stab') < 3))
				)
			)};
		case 'muddywater':
			return {cull: isDoubles && (moves.has('scald') || moves.has('hydropump'))};
		case 'originpulse': case 'surf':
			return {cull: moves.has('hydropump') || moves.has('scald')};
		case 'scald':
			return {cull: ['liquidation', 'waterfall', 'waterpulse'].some(m => moves.has(m))};

		// Status:
		case 'electroweb': case 'stunspore': case 'thunderwave':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				hasRestTalk ||
				['discharge', 'spore', 'toxic', 'trickroom', 'yawn'].some(m => moves.has(m))
			)};
		case 'glare': case 'headbutt':
			return {cull: moves.has('bodyslam') || !moves.has('glare')};
		case 'toxic':
			const otherStatus = ['hypnosis', 'sleeppowder', 'toxicspikes', 'willowisp', 'yawn'].some(m => moves.has(m));
			return {cull: otherStatus || !!counter.setupType || moves.has('flamecharge') || moves.has('raindance')};
		case 'raindance':
			return {cull: (
				counter.get('Physical') + counter.get('Special') < 2 ||
				hasRestTalk ||
				moves.has('rest') ||
				(!types.has('Water') && !counter.get('Water'))
			)};
		case 'sunnyday':
			const cull = (
				counter.get('Physical') + counter.get('Special') < 2 ||
				(!abilities.has('Chlorophyll') && !abilities.has('Flower Gift') && !moves.has('solarbeam')) ||
				hasRestTalk
			);

			if (cull && movePool.length > 1) {
				const solarbeam = movePool.indexOf('solarbeam');
				if (solarbeam >= 0) this.fastPop(movePool, solarbeam);
				if (movePool.length > 1) {
					const weatherball = movePool.indexOf('weatherball');
					if (weatherball >= 0) this.fastPop(movePool, weatherball);
				}
			}

			return {cull};
		case 'painsplit': case 'recover': case 'roost': case 'synthesis':
			return {cull: (
				moves.has('leechseed') || moves.has('rest') ||
				(moves.has('wish') && (moves.has('protect') || movePool.includes('protect')))
			)};
		case 'substitute':
			const moveBasedCull = ['copycat', 'dragondance', 'shiftgear'].some(m => movePool.includes(m));
			return {cull: (
				moves.has('dracometeor') ||
				(moves.has('leafstorm') && !abilities.has('Contrary')) ||
				['encore', 'pursuit', 'rest', 'taunt', 'uturn', 'voltswitch', 'whirlwind'].some(m => moves.has(m)) ||
				moveBasedCull
			)};
		case 'powersplit':
			return {cull: moves.has('guardsplit')};
		case 'wideguard':
			return {cull: moves.has('protect')};
		case 'bravebird':
			// Hurricane > Brave Bird in the rain
			return {cull: (moves.has('raindance') || abilities.has('Drizzle')) && movePool.includes('hurricane')};
		}
		return {cull: false};
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
		isDoubles: boolean
	): boolean {
		switch (ability) {
		case 'Battle Bond': case 'Dazzling': case 'Flare Boost': case 'Hyper Cutter':
		case 'Ice Body': case 'Innards Out': case 'Moody': case 'Steadfast': case 'Magician':
			return true;
		case 'Aerilate': case 'Galvanize': case 'Pixilate': case 'Refrigerate':
			return !counter.get('Normal');
		case 'Analytic': case 'Download':
			return species.nfe;
		case 'Battle Armor': case 'Sturdy':
			return (!!counter.get('recoil') && !counter.get('recovery'));
		case 'Chlorophyll': case 'Leaf Guard':
			return (
				species.baseStats.spe > 100 ||
				abilities.has('Harvest') ||
				(!moves.has('sunnyday') && !teamDetails.sun)
			);
		case 'Competitive':
			return (!counter.get('Special') || moves.has('sleeptalk') && moves.has('rest'));
		case 'Compound Eyes': case 'No Guard':
			return !counter.get('inaccurate');
		case 'Contrary': case 'Iron Fist': case 'Skill Link': case 'Strong Jaw':
			return !counter.get(toID(ability));
		case 'Defiant': case 'Justified': case 'Moxie':
			return !counter.get('Physical') || moves.has('dragontail');
		case 'Flash Fire':
			return abilities.has('Drought');
		case 'Gluttony':
			return !moves.has('bellydrum');
		case 'Harvest':
			return abilities.has('Frisk');
		case 'Hustle':
			return counter.get('Physical') < 2;
		case 'Hydration': case 'Rain Dish': case 'Swift Swim':
			return (
				species.baseStats.spe > 100 || !moves.has('raindance') && !teamDetails.rain ||
				!moves.has('raindance') && ['Rock Head', 'Water Absorb'].some(abil => abilities.has(abil))
			);
		case 'Slush Rush': case 'Snow Cloak':
			return !teamDetails.hail;
		case 'Immunity': case 'Snow Warning':
			return (moves.has('facade') || moves.has('hypervoice'));
		case 'Intimidate':
			return (moves.has('bodyslam') || moves.has('rest') || abilities.has('Reckless') && counter.get('recoil') > 1);
		case 'Lightning Rod':
			return (
				species.types.includes('Ground') ||
				(!!teamDetails.rain || moves.has('raindance')) && abilities.has('Swift Swim')
			);
		case 'Limber':
			return species.types.includes('Electric');
		case 'Liquid Voice':
			return !counter.get('sound');
		case 'Magic Guard': case 'Speed Boost':
			return (abilities.has('Tinted Lens') && (!counter.get('Status') || moves.has('uturn')));
		case 'Magnet Pull':
			return (!!counter.get('Normal') || !types.has('Electric') && !moves.has('earthpower'));
		case 'Mold Breaker':
			return (
				moves.has('acrobatics') || moves.has('sleeptalk') ||
				abilities.has('Adaptability') || abilities.has('Iron Fist') ||
				(abilities.has('Sheer Force') && !!counter.get('sheerforce'))
			);
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Poison Heal':
			return (abilities.has('Technician') && !!counter.get('technician'));
		case 'Power Construct':
			return species.forme === '10%';
		case 'Prankster':
			return !counter.get('Status');
		case 'Pressure': case 'Synchronize':
			return (counter.get('Status') < 2 || !!counter.get('recoil') || !!species.isMega);
		case 'Regenerator':
			return abilities.has('Magic Guard');
		case 'Quick Feet':
			return moves.has('bellydrum');
		case 'Reckless': case 'Rock Head':
			return (!counter.get('recoil') || !!species.isMega);
		case 'Sand Force': case 'Sand Rush': case 'Sand Veil':
			return !teamDetails.sand;
		case 'Scrappy':
			return !species.types.includes('Normal');
		case 'Serene Grace':
			return (!counter.get('serenegrace') || species.name === 'Blissey');
		case 'Sheer Force':
			return (!counter.get('sheerforce') || moves.has('doubleedge') || abilities.has('Guts') || !!species.isMega);
		case 'Simple':
			return (!counter.setupType && !moves.has('flamecharge'));
		case 'Solar Power':
			return (!counter.get('Special') || !teamDetails.sun || !!species.isMega);
		case 'Swarm':
			return (!counter.get('Bug') || !!species.isMega);
		case 'Sweet Veil':
			return types.has('Grass');
		case 'Technician':
			return (!counter.get('technician') || moves.has('tailslap') || !!species.isMega);
		case 'Tinted Lens':
			return (
				moves.has('protect') || !!counter.get('damage') ||
				(counter.get('Status') > 2 && !counter.setupType) ||
				abilities.has('Prankster') ||
				(abilities.has('Magic Guard') && !!counter.get('Status'))
			);
		case 'Torrent':
			return (!counter.get('Water') || !!species.isMega);
		case 'Unaware':
			return (!!counter.setupType || abilities.has('Magic Guard'));
		case 'Unburden':
			return (!!species.isMega || abilities.has('Prankster') || !counter.setupType && !moves.has('acrobatics'));
		case 'Water Absorb':
			return moves.has('raindance') || ['Drizzle', 'Unaware', 'Volt Absorb'].some(abil => abilities.has(abil));
		case 'Weak Armor':
			return counter.setupType !== 'Physical';
		}

		return false;
	}

	getHighPriorityItem(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean
	): string | undefined {
		if (species.requiredItems) {
			if (
				species.baseSpecies === 'Arceus' &&
				(moves.has('judgment') || !counter.get(species.types[0]) || teamDetails.zMove)
			) {
				// Judgment doesn't change type with Z-Crystals
				return species.requiredItems[0];
			}
			return this.sample(species.requiredItems);
		}

		// First, the extra high-priority items
		if (species.name === 'Dedenne') return moves.has('substitute') ? 'Petaya Berry' : 'Sitrus Berry';
		if (species.name === 'Deoxys-Attack') return (isLead && moves.has('stealthrock')) ? 'Focus Sash' : 'Life Orb';
		if (species.name === 'Farfetch\u2019d') return 'Stick';
		if (species.name === 'Genesect' && moves.has('technoblast')) return 'Douse Drive';
		if (species.baseSpecies === 'Marowak') return 'Thick Club';
		if (species.name === 'Pikachu') return 'Light Ball';
		if (species.name === 'Shedinja' || species.name === 'Smeargle') return 'Focus Sash';
		if (species.name === 'Unfezant' && counter.get('Physical') >= 2) return 'Scope Lens';
		if (species.name === 'Unown') return 'Choice Specs';
		if (species.name === 'Wobbuffet') return 'Custap Berry';
		if (ability === 'Harvest' || ability === 'Emergency Exit' && !!counter.get('Status')) return 'Sitrus Berry';
		if (ability === 'Imposter') return 'Choice Scarf';
		if (ability === 'Poison Heal') return 'Toxic Orb';
		if (species.nfe) return (ability === 'Technician' && counter.get('Physical') >= 4) ? 'Choice Band' : 'Eviolite';
		if (moves.has('switcheroo') || moves.has('trick')) {
			if (species.baseStats.spe >= 60 && species.baseStats.spe <= 108) {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (moves.has('bellydrum')) {
			if (ability === 'Gluttony') {
				return `${this.sample(['Aguav', 'Figy', 'Iapapa', 'Mago', 'Wiki'])} Berry`;
			} else if (species.baseStats.spe <= 50 && !teamDetails.zMove && this.randomChance(1, 2)) {
				return 'Normalium Z';
			} else {
				return 'Sitrus Berry';
			}
		}
		if (moves.has('copycat') && counter.get('Physical') >= 3) return 'Choice Band';
		if (moves.has('geomancy') || moves.has('skyattack')) return 'Power Herb';
		if (moves.has('shellsmash')) {
			return (ability === 'Solid Rock' && !!counter.get('priority')) ? 'Weakness Policy' : 'White Herb';
		}
		if ((ability === 'Guts' || moves.has('facade')) && !moves.has('sleeptalk')) {
			return (types.has('Fire') || ability === 'Quick Feet' || ability === 'Toxic Boost') ? 'Toxic Orb' : 'Flame Orb';
		}
		if (ability === 'Magic Guard' && counter.damagingMoves.size > 1) {
			return moves.has('counter') ? 'Focus Sash' : 'Life Orb';
		}
		if (ability === 'Sheer Force' && counter.get('sheerforce')) return 'Life Orb';
		if (ability === 'Unburden') return moves.has('fakeout') ? 'Normal Gem' : 'Sitrus Berry';
		if (moves.has('acrobatics')) return '';
		if (moves.has('electricterrain') || ability === 'Electric Surge' && moves.has('thunderbolt')) return 'Electrium Z';
		if (
			moves.has('happyhour') ||
			moves.has('holdhands') ||
			(moves.has('encore') && ability === 'Contrary')
		) return 'Normalium Z';
		if (moves.has('raindance')) {
			if (species.baseSpecies === 'Castform' && !teamDetails.zMove) {
				return 'Waterium Z';
			} else {
				return (ability === 'Forecast') ? 'Damp Rock' : 'Life Orb';
			}
		}
		if (moves.has('sunnyday')) {
			if ((species.baseSpecies === 'Castform' || species.baseSpecies === 'Cherrim') && !teamDetails.zMove) {
				return 'Firium Z';
			} else {
				return (ability === 'Forecast') ? 'Heat Rock' : 'Life Orb';
			}
		}

		if (moves.has('solarbeam') && ability !== 'Drought' && !moves.has('sunnyday') && !teamDetails.sun) {
			return !teamDetails.zMove ? 'Grassium Z' : 'Power Herb';
		}

		if (moves.has('auroraveil') || moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (
			moves.has('rest') && !moves.has('sleeptalk') &&
			ability !== 'Natural Cure' && ability !== 'Shed Skin' && ability !== 'Shadow Tag'
		) {
			return 'Chesto Berry';
		}

		// Z-Moves
		if (!teamDetails.zMove) {
			if (species.name === 'Decidueye' && moves.has('spiritshackle') && counter.setupType) {
				return 'Decidium Z';
			}
			if (species.name === 'Kommo-o') return moves.has('clangingscales') ? 'Kommonium Z' : 'Dragonium Z';
			if (species.baseSpecies === 'Lycanroc' && moves.has('stoneedge') && counter.setupType) {
				return 'Lycanium Z';
			}
			if (species.name === 'Marshadow' && moves.has('spectralthief') && counter.setupType) {
				return 'Marshadium Z';
			}
			if (species.name === 'Necrozma-Dusk-Mane' || species.name === 'Necrozma-Dawn-Wings') {
				if (moves.has('autotomize') && moves.has('sunsteelstrike')) {
					return 'Solganium Z';
				} else if (moves.has('trickroom') && moves.has('moongeistbeam')) {
					return 'Lunalium Z';
				} else {
					return 'Ultranecrozium Z';
				}
			}

			if (species.name === 'Mimikyu' && moves.has('playrough') && counter.setupType) return 'Mimikium Z';
			if (species.name === 'Raichu-Alola' && moves.has('thunderbolt') && counter.setupType) return 'Aloraichium Z';
			if (moves.has('bugbuzz') && counter.setupType && species.baseStats.spa > 100) return 'Buginium Z';
			if (
				(moves.has('darkpulse') && ability === 'Fur Coat' && counter.setupType) ||
				(moves.has('suckerpunch') && ability === 'Moxie' && counter.get('Dark') < 2)
			) {
				return 'Darkinium Z';
			}
			if (moves.has('outrage') && counter.setupType && !moves.has('fly')) return 'Dragonium Z';
			if (moves.has('fleurcannon') && !!counter.get('speedsetup')) return 'Fairium Z';
			if (
				(moves.has('focusblast') && types.has('Fighting') && counter.setupType) ||
				(moves.has('reversal') && moves.has('substitute'))
			) {
				return 'Fightinium Z';
			}
			if (
				moves.has('fly') ||
				(moves.has('hurricane') && species.baseStats.spa >= 125 && (!!counter.get('Status') || moves.has('superpower'))) ||
				((moves.has('bounce') || moves.has('bravebird')) && counter.setupType)
			) {
				return 'Flyinium Z';
			}
			if (moves.has('shadowball') && counter.setupType && ability === 'Beast Boost') return 'Ghostium Z';
			if (
				moves.has('sleeppowder') && types.has('Grass') &&
				counter.setupType && species.baseStats.spe <= 70
			) {
				return 'Grassium Z';
			}
			if (moves.has('magmastorm')) return 'Firium Z';
			if (moves.has('dig')) return 'Groundium Z';
			if (moves.has('photongeyser') && counter.setupType) return 'Psychium Z';
			if (moves.has('stoneedge') && types.has('Rock') && moves.has('swordsdance')) return 'Rockium Z';
			if (moves.has('hydropump') && ability === 'Battle Bond' && moves.has('uturn')) return 'Waterium Z';
			if ((moves.has('hail') || (moves.has('blizzard') && ability !== 'Snow Warning'))) return 'Icium Z';
		}
	}

	getMediumPriorityItem(
		ability: string,
		moves: Set<string>,
		counter: MoveCounter,
		species: Species,
		isDoubles: boolean,
		isLead: boolean
	): string | undefined {
		const defensiveStatTotal = species.baseStats.hp + species.baseStats.def + species.baseStats.spd;

		if (
			(ability === 'Speed Boost' || ability === 'Stance Change' || species.name === 'Pheromosa') &&
			counter.get('Physical') + counter.get('Special') > 2 &&
			!moves.has('uturn')
		) {
			return 'Life Orb';
		}

		if (isDoubles && moves.has('uturn') && counter.get('Physical') === 4 && !moves.has('fakeout')) {
			return (
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				!counter.get('priority') && this.randomChance(1, 2)
			) ? 'Choice Scarf' : 'Choice Band';
		}
		if (isDoubles && counter.get('Special') === 4 && (moves.has('waterspout') || moves.has('eruption'))) {
			return 'Choice Scarf';
		}

		if (
			!isDoubles &&
			counter.get('Physical') >= 4 &&
			['bodyslam', 'dragontail', 'fakeout', 'flamecharge', 'rapidspin', 'suckerpunch'].every(m => !moves.has(m))
		) {
			return (
				(species.baseStats.atk >= 100 || ability === 'Huge Power') &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				!counter.get('priority') &&
				this.randomChance(2, 3)
			) ? 'Choice Scarf' : 'Choice Band';
		}
		if (
			!isDoubles &&
			(counter.get('Special') >= 4 || (counter.get('Special') >= 3 && moves.has('uturn'))) &&
			!moves.has('acidspray') && !moves.has('clearsmog')
		) {
			return (
				species.baseStats.spa >= 100 &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Tinted Lens' &&
				!counter.get('Physical') && !counter.get('priority') &&
				this.randomChance(2, 3)
			) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (
			!isDoubles &&
			counter.get('Physical') >= 3 &&
			(moves.has('defog') || moves.has('healingwish')) &&
			!moves.has('foulplay') &&
			species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
			!counter.get('priority')
		) {
			return 'Choice Scarf';
		}
		if (!isDoubles && (
			ability === 'Drizzle' ||
			ability === 'Slow Start' ||
			species.name.includes('Rotom-') ||
			['aromatherapy', 'bite', 'clearsmog', 'curse', 'protect', 'sleeptalk'].some(m => moves.has(m)))
		) {
			return 'Leftovers';
		}
		if (['endeavor', 'flail', 'reversal'].some(m => moves.has(m)) && ability !== 'Sturdy') {
			return (ability === 'Defeatist') ? 'Expert Belt' : 'Focus Sash';
		}
		if (moves.has('outrage') && counter.setupType) return 'Lum Berry';
		if (
			isDoubles &&
			counter.damagingMoves.size >= 3 &&
			species.baseStats.spe >= 70 &&
			ability !== 'Multiscale' && ability !== 'Sturdy' && [
				'acidspray', 'electroweb', 'fakeout', 'feint', 'flamecharge', 'icywind',
				'incinerate', 'naturesmadness', 'rapidspin', 'snarl', 'suckerpunch', 'uturn',
			].every(m => !moves.has(m))
		) {
			return defensiveStatTotal >= 275 ? 'Sitrus Berry' : 'Life Orb';
		}

		if (moves.has('substitute')) return counter.damagingMoves.size > 2 && !!counter.get('drain') ? 'Life Orb' : 'Leftovers';
		if (
			!isDoubles &&
			this.dex.getEffectiveness('Ground', species) >= 2 &&
			ability !== 'Levitate' &&
			!moves.has('magnetrise')
		) {
			return 'Air Balloon';
		}
		if ((ability === 'Iron Barbs' || ability === 'Rough Skin') && this.randomChance(1, 2)) return 'Rocky Helmet';
		if (
			counter.get('Physical') + counter.get('Special') >= 4 &&
			species.baseStats.spd >= 50 && defensiveStatTotal >= 235
		) {
			return 'Assault Vest';
		}
		if (species.name === 'Palkia' && (moves.has('dracometeor') || moves.has('spacialrend')) && moves.has('hydropump')) {
			return 'Lustrous Orb';
		}
		if (species.types.includes('Normal') && moves.has('fakeout') && counter.get('Normal') >= 2) return 'Silk Scarf';
		if (counter.damagingMoves.size >= 4) {
			return (counter.get('Dragon') || moves.has('suckerpunch') || counter.get('Normal')) ? 'Life Orb' : 'Expert Belt';
		}
		if (counter.damagingMoves.size >= 3 && !!counter.get('speedsetup') && defensiveStatTotal >= 300) {
			return 'Weakness Policy';
		}
		if (
			!isDoubles && isLead &&
			!['Regenerator', 'Sturdy'].includes(ability) &&
			!counter.get('recoil') && !counter.get('recovery') &&
			defensiveStatTotal < 255
		) {
			return 'Focus Sash';
		}
	}

	getLowPriorityItem(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean
	): string | undefined {
		// This is the "REALLY can't think of a good item" cutoff
		if (moves.has('stickyweb') && ability === 'Sturdy') return 'Mental Herb';
		if (ability === 'Serene Grace' && moves.has('airslash') && species.baseStats.spe > 100) return 'Metronome';
		if (ability === 'Sturdy' && moves.has('explosion') && !counter.get('speedsetup')) return 'Custap Berry';
		if (ability === 'Super Luck') return 'Scope Lens';
		if (
			!isDoubles &&
			counter.damagingMoves.size >= 3 &&
			ability !== 'Sturdy' &&
			(species.baseStats.spe >= 90 || !moves.has('voltswitch')) &&
			['acidspray', 'dragontail', 'foulplay', 'rapidspin', 'superfang', 'uturn'].every(m => !moves.has(m)) && (
				counter.get('speedsetup') ||
				moves.has('trickroom') ||
				(species.baseStats.spe > 40 && species.baseStats.hp + species.baseStats.def + species.baseStats.spd < 275)
			)
		) {
			return 'Life Orb';
		}
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

		const data = this.randomData[species.id];

		const randMoves = isDoubles ?
			(data.doublesMoves || data.moves) :
			data.moves;
		const movePool = (randMoves || Object.keys(this.dex.species.getLearnset(species.id)!)).slice();
		if (this.format.gameType === 'multi') {
			// Random Multi Battle uses doubles move pools, but Ally Switch fails in multi battles
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
		const rejectedPool = [];
		const moves = new Set<string>();
		let ability = '';

		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};

		const types = new Set(species.types);
		const abilities = new Set<string>();
		for (const abilityName of Object.values(species.abilities)) {
			if (abilityName === species.abilities.S || (species.unreleasedHidden && abilityName === species.abilities.H)) continue;
			abilities.add(abilityName);
		}

		let availableHP = 0;
		for (const moveid of movePool) {
			if (moveid.startsWith('hiddenpower')) availableHP++;
		}

		// These moves can be used even if we aren't setting up to use them:
		const SetupException = ['closecombat', 'diamondstorm', 'extremespeed', 'superpower', 'clangingscales'];

		let counter: MoveCounter;
		// We use a special variable to track Hidden Power
		// so that we can check for all Hidden Powers at once
		let hasHiddenPower = false;

		do {
			// Choose next 4 moves from learnset/viable moves and add them to moves list:
			while (moves.size < this.maxMoveCount && movePool.length) {
				const moveid = this.sampleNoReplace(movePool);
				if (moveid.startsWith('hiddenpower')) {
					availableHP--;
					if (hasHiddenPower) continue;
					hasHiddenPower = true;
				}
				moves.add(moveid);
			}
			while (moves.size < this.maxMoveCount && rejectedPool.length) {
				const moveid = this.sampleNoReplace(rejectedPool);
				if (moveid.startsWith('hiddenpower')) {
					if (hasHiddenPower) continue;
					hasHiddenPower = true;
				}
				moves.add(moveid);
			}

			counter = this.queryMoves(moves, species.types, abilities, movePool);
			const runEnforcementChecker = (checkerName: string) => {
				if (!this.moveEnforcementCheckers[checkerName]) return false;
				return this.moveEnforcementCheckers[checkerName](
					movePool, moves, abilities, types, counter, species as Species, teamDetails
				);
			};

			// Iterate through the moves again, this time to cull them:
			for (const moveid of moves) {
				const move = this.dex.moves.get(moveid);

				let {cull, isSetup} = this.shouldCullMove(
					move, types, moves, abilities, counter, movePool, teamDetails,
					species, isLead, isDoubles
				);

				// This move doesn't satisfy our setup requirements:
				if (
					(move.category === 'Physical' && counter.setupType === 'Special') ||
					(move.category === 'Special' && counter.setupType === 'Physical')
				) {
					// Reject STABs last in case the setup type changes later on
					const stabs = counter.get(species.types[0]) + (counter.get(species.types[1]) || 0);
					if (
						!SetupException.includes(moveid) &&
						(!types.has(move.type) || stabs > 1 || counter.get(move.category) < 2)
					) cull = true;
				}
				// Hidden Power isn't good enough
				if (
					counter.setupType === 'Special' &&
					moveid === 'hiddenpower' &&
					species.types.length > 1 &&
					counter.get('Special') <= 2 &&
					!types.has(move.type) &&
					!counter.get('Physical') &&
					counter.get('specialpool')
				) {
					cull = true;
				}

				const singlesEnforcement = (
					!['judgment', 'lightscreen', 'quiverdance', 'reflect', 'sleeptalk', 'toxic'].includes(moveid) && (
						move.category !== 'Status' ||
						// should allow Meganium to cull a recovery move for the sake of STAB
						!(move.flags.heal && species.id !== 'meganium')
					)
				);
				// Pokemon should have moves that benefit their Type/Ability/Weather, as well as moves required by its forme
				if (
					!cull &&
					!move.damage &&
					!isSetup &&
					!move.weather &&
					!move.stallingMove &&
					(isDoubles || singlesEnforcement) && (
						!counter.setupType || counter.setupType === 'Mixed' ||
						(move.category !== counter.setupType && move.category !== 'Status') ||
						(counter.get(counter.setupType) + counter.get('Status') > 3 && !counter.get('hazards'))
					) && (
						move.category === 'Status' ||
						!types.has(move.type) ||
						(move.basePower && move.basePower < 40 && !move.multihit)
					)
				) {
					if (
						(!counter.get('stab') && !moves.has('nightshade') && !moves.has('seismictoss') && (
							species.types.length > 1 ||
							(species.types[0] !== 'Normal' && species.types[0] !== 'Psychic') ||
							!moves.has('icebeam') ||
							species.baseStats.spa >= species.baseStats.spd
						)) || (
							moves.has('suckerpunch') && !abilities.has('Contrary') &&
							counter.get('stab') < species.types.length && species.id !== 'honchkrow'
						) || (
							(['recover', 'roost', 'slackoff', 'softboiled'].some(m => movePool.includes(m))) &&
							counter.get('Status') &&
							!counter.setupType &&
							['healingwish', 'switcheroo', 'trick', 'trickroom'].every(m => !moves.has(m))
						) || (
							movePool.includes('milkdrink') ||
							movePool.includes('shoreup') ||
							(movePool.includes('moonlight') && types.size < 2) ||
							(movePool.includes('stickyweb') && !counter.setupType && !teamDetails.stickyWeb) ||
							(movePool.includes('quiverdance') && ['defog', 'uturn', 'stickyweb'].every(m => !moves.has(m)) &&
							counter.get('Special') < 4)
						) || (
							isLead &&
							movePool.includes('stealthrock') &&
							counter.get('Status') && !counter.setupType &&
							!counter.get('speedsetup') && !moves.has('substitute')
						) || (
							species.requiredMove && movePool.includes(toID(species.requiredMove))
						) || (
							!counter.get('Normal') &&
							(abilities.has('Aerilate') || abilities.has('Pixilate') || (abilities.has('Refrigerate') && !moves.has('blizzard')))
						)
					) {
						cull = true;
					} else {
						for (const type of types) {
							if (runEnforcementChecker(type)) {
								cull = true;
							}
						}
						for (const abil of abilities) {
							if (runEnforcementChecker(abil)) {
								cull = true;
							}
						}
						for (const m of moves) {
							if (runEnforcementChecker(m)) {
								cull = true;
							}
						}
					}
				}

				// Sleep Talk shouldn't be selected without Rest
				if (moveid === 'rest' && cull) {
					const sleeptalk = movePool.indexOf('sleeptalk');
					if (sleeptalk >= 0) {
						if (movePool.length < 2) {
							cull = false;
						} else {
							this.fastPop(movePool, sleeptalk);
						}
					}
				}

				// Remove rejected moves from the move list
				const moveIsHP = moveid.startsWith('hiddenpower');
				if (cull && (
					movePool.length - availableHP ||
					(availableHP && (moveIsHP || !hasHiddenPower))
				)) {
					if (
						move.category !== 'Status' &&
						!move.damage &&
						!move.flags.charge &&
						(!moveIsHP || !availableHP)
					) {
						rejectedPool.push(moveid);
					}
					if (moveIsHP) hasHiddenPower = false;
					moves.delete(moveid);
					break;
				}

				if (cull && rejectedPool.length) {
					if (moveIsHP) hasHiddenPower = false;
					moves.delete(moveid);
					break;
				}
			}
		} while (moves.size < this.maxMoveCount && (movePool.length || rejectedPool.length));

		// Moveset modifications
		if (species.id === 'celesteela' && moves.has('autotomize') && moves.has('heavyslam')) {
			moves.delete('heavyslam');
			moves.add('flashcannon');
		}
		if (moves.has('raindance') && moves.has('thunderbolt') && !isDoubles) {
			moves.delete('thunderbolt');
			moves.add('thunder');
		}
		if (moves.has('workup') && !counter.get('Special') && species.id === 'zeraora') {
			moves.delete('workup');
			moves.add('bulkup');
		}

		const battleOnly = species.battleOnly && !species.requiredAbility;
		const baseSpecies: Species = battleOnly ? this.dex.species.get(species.battleOnly as string) : species;

		const abilityData = Object.values(baseSpecies.abilities).map(a => this.dex.abilities.get(a));
		Utils.sortBy(abilityData, abil => -abil.rating);

		if (abilityData[1]) {
			// Sort abilities by rating with an element of randomness
			if (abilityData[2] && abilityData[1].rating <= abilityData[2].rating && this.randomChance(1, 2)) {
				[abilityData[1], abilityData[2]] = [abilityData[2], abilityData[1]];
			}
			if (abilityData[0].rating <= abilityData[1].rating && this.randomChance(1, 2)) {
				[abilityData[0], abilityData[1]] = [abilityData[1], abilityData[0]];
			} else if (abilityData[0].rating - 0.6 <= abilityData[1].rating && this.randomChance(2, 3)) {
				[abilityData[0], abilityData[1]] = [abilityData[1], abilityData[0]];
			}
			ability = abilityData[0].name;

			while (this.shouldCullAbility(
				ability, types, moves, abilities, counter, movePool, teamDetails, species, isDoubles
			)) {
				if (ability === abilityData[0].name && abilityData[1].rating >= 1) {
					ability = abilityData[1].name;
				} else if (ability === abilityData[1].name && abilityData[2] && abilityData[2].rating >= 1) {
					ability = abilityData[2].name;
				} else {
					// Default to the highest rated ability if all are rejected
					ability = abilityData[0].name;
					break;
				}
			}

			if (
				abilities.has('Guts') &&
				ability !== 'Quick Feet' &&
				(moves.has('facade') || (moves.has('protect') && !isDoubles) || (moves.has('sleeptalk') && moves.has('rest')))
			) {
				ability = 'Guts';
			} else if (abilities.has('Moxie') && (counter.get('Physical') > 3 || moves.has('bounce')) && !isDoubles) {
				ability = 'Moxie';
			} else if (isDoubles) {
				if (abilities.has('Intimidate') && !battleOnly) ability = 'Intimidate';
				if (abilities.has('Guts') && ability !== 'Intimidate') ability = 'Guts';
				if (abilities.has('Storm Drain')) ability = 'Storm Drain';
				if (abilities.has('Harvest')) ability = 'Harvest';
				if (abilities.has('Unburden') && ability !== 'Prankster' && !species.isMega) ability = 'Unburden';
			}
			if (species.name === 'Ambipom' && !counter.get('technician')) {
				// If it doesn't qualify for Technician, Skill Link is useless on it
				ability = 'Pickup';
			}
			if (species.name === 'Raticate-Alola') ability = 'Hustle';
			if (species.name === 'Altaria') ability = 'Natural Cure';
		} else {
			ability = abilityData[0].name;
		}

		if (species.name === 'Genesect' && moves.has('technoblast')) forme = 'Genesect-Douse';

		if (
			!moves.has('photongeyser') &&
			!teamDetails.zMove &&
			(species.name === 'Necrozma-Dusk-Mane' || species.name === 'Necrozma-Dawn-Wings')
		) {
			for (const moveid of moves) {
				const move = this.dex.moves.get(moveid);
				if (move.category === 'Status' || types.has(move.type)) continue;
				moves.delete(moveid);
				moves.add('photongeyser');
				break;
			}
		}

		let item = this.getHighPriorityItem(ability, types, moves, counter, teamDetails, species, isLead, isDoubles);
		if (item === undefined) item = this.getMediumPriorityItem(ability, moves, counter, species, isDoubles, isLead);
		if (item === undefined) {
			item = this.getLowPriorityItem(ability, types, moves, abilities, counter, teamDetails, species, isLead, isDoubles);
		}

		// fallback
		if (item === undefined) item = isDoubles ? 'Sitrus Berry' : 'Leftovers';
		// For Trick / Switcheroo
		if (item === 'Leftovers' && types.has('Poison')) {
			item = 'Black Sludge';
		}

		let level: number;
		if (this.adjustLevel) {
			level = this.adjustLevel;
		} else if (!isDoubles) {
			level = data.level || (species.nfe ? 90 : 80);
		} else {
			// We choose level based on BST. Min level is 70, max level is 99. 600+ BST is 70, less than 300 is 99. Calculate with those values.
			// Every 10.34 BST adds a level from 70 up to 99. Results are floored. Uses the Mega's stats if holding a Mega Stone
			const baseStats = species.baseStats;

			let bst = species.bst;
			// If Wishiwashi, use the school-forme's much higher stats
			if (species.baseSpecies === 'Wishiwashi') bst = this.dex.species.get('wishiwashischool').bst;
			// Adjust levels of mons based on abilities (Pure Power, Sheer Force, etc.) and also Eviolite
			// For the stat boosted, treat the Pokemon's base stat as if it were multiplied by the boost. (Actual effective base stats are higher.)
			const speciesAbility = (baseSpecies === species ? ability : species.abilities[0]);
			if (speciesAbility === 'Huge Power' || speciesAbility === 'Pure Power') {
				bst += baseStats.atk;
			} else if (speciesAbility === 'Parental Bond') {
				bst += 0.25 * (counter.get('Physical') > counter.get('Special') ? baseStats.atk : baseStats.spa);
			} else if (speciesAbility === 'Protean') {
				bst += 0.3 * (counter.get('Physical') > counter.get('Special') ? baseStats.atk : baseStats.spa);
			} else if (speciesAbility === 'Fur Coat') {
				bst += baseStats.def;
			} else if (speciesAbility === 'Slow Start') {
				bst -= baseStats.atk / 2 + baseStats.spe / 2;
			} else if (speciesAbility === 'Truant') {
				bst *= 2 / 3;
			}
			if (item === 'Eviolite') {
				bst += 0.5 * (baseStats.def + baseStats.spd);
			} else if (item === 'Light Ball') {
				bst += baseStats.atk + baseStats.spa;
			}
			level = 70 + Math.floor(((600 - Utils.clampIntRange(bst, 300, 600)) / 10.34));
		}

		// Prepare optimal HP
		const srWeakness = this.dex.getEffectiveness('Rock', species);
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if (moves.has('substitute') && moves.has('reversal')) {
				// Reversal users should be able to use four Substitutes
				if (hp % 4 > 0) break;
			} else if (moves.has('substitute') && (
				item === 'Petaya Berry' || item === 'Sitrus Berry' ||
				(ability === 'Power Construct' && item !== 'Leftovers')
			)) {
				// Three Substitutes should activate Petaya Berry for Dedenne
				// Two Substitutes should activate Sitrus Berry or Power Construct
				if (hp % 4 === 0) break;
			} else if (moves.has('bellydrum') && (item === 'Sitrus Berry' || ability === 'Gluttony')) {
				// Belly Drum should activate Sitrus Berry
				if (hp % 2 === 0) break;
			} else {
				// Maximize number of Stealth Rock switch-ins
				if (srWeakness <= 0 || hp % (4 / srWeakness) > 0) break;
			}
			evs.hp -= 4;
		}

		// Minimize confusion damage
		if (!counter.get('Physical') && !moves.has('copycat') && !moves.has('transform')) {
			evs.atk = 0;
			ivs.atk = 0;
		}

		// Ensure Nihilego's Beast Boost gives it Special Attack boosts instead of Special Defense
		if (forme === 'Nihilego') evs.spd -= 32;

		if (ability === 'Beast Boost' && counter.get('Special') < 1) {
			evs.spa = 0;
			ivs.spa = 0;
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

		if (['gyroball', 'metalburst', 'trickroom'].some(m => moves.has(m))) {
			evs.spe = 0;
			ivs.spe = (hasHiddenPower && level < 100) ? ivs.spe - 30 : 0;
		}

		return {
			name: species.baseSpecies,
			species: forme,
			gender: species.gender,
			shiny: this.randomChance(1, 1024),
			moves: Array.from(moves),
			ability,
			evs,
			ivs,
			item,
			level,
		};
	}

	randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const seed = this.prng.seed;
		const ruleTable = this.dex.formats.getRuleTable(this.format);
		const pokemon = [];

		// For Monotype
		const isMonotype = !!this.forceMonotype || ruleTable.has('sametypeclause');
		const typePool = this.dex.types.names();
		const type = this.forceMonotype || this.sample(typePool);

		const baseFormes: {[k: string]: number} = {};
		let hasMega = false;

		const tierCount: {[k: string]: number} = {};
		const typeCount: {[k: string]: number} = {};
		const typeComboCount: {[k: string]: number} = {};
		const typeWeaknesses: {[k: string]: number} = {};
		const teamDetails: RandomTeamsTypes.TeamDetails = {};

		// We make at most two passes through the potential Pokemon pool when creating a team - if the first pass doesn't
		// result in a team of six Pokemon we perform a second iteration relaxing as many restrictions as possible.
		for (const restrict of [true, false]) {
			if (pokemon.length >= this.maxTeamSize) break;
			const pokemonPool = this.getPokemonPool(type, pokemon, isMonotype);
			while (pokemonPool.length && pokemon.length < this.maxTeamSize) {
				const species = this.dex.species.get(this.sampleNoReplace(pokemonPool));

				// Check if the forme has moves for random battle
				if (this.format.gameType === 'singles') {
					if (!this.randomData[species.id]?.moves) continue;
				} else {
					if (!this.randomData[species.id]?.doublesMoves) continue;
				}
				if (!species.exists) continue;

				// Limit to one of each species (Species Clause)
				if (baseFormes[species.baseSpecies]) continue;

				// Limit one Mega per team
				if (hasMega && species.isMega) continue;

				// Adjust rate for species with multiple sets
				switch (species.baseSpecies) {
				case 'Arceus': case 'Silvally':
					if (this.randomChance(8, 9) && !isMonotype) continue;
					break;
				case 'Oricorio':
					if (this.randomChance(3, 4)) continue;
					break;
				case 'Castform': case 'Floette':
					if (this.randomChance(2, 3)) continue;
					break;
				case 'Aegislash': case 'Basculin': case 'Gourgeist': case 'Groudon': case 'Kyogre': case 'Meloetta':
					if (this.randomChance(1, 2)) continue;
					break;
				case 'Greninja':
					if (this.gen >= 7 && this.randomChance(1, 2)) continue;
					break;
				}
				if (species.otherFormes && !hasMega && (
					species.otherFormes.includes(species.name + '-Mega') ||
					species.otherFormes.includes(species.name + '-Mega-X')
				)) {
					continue;
				}

				const tier = species.tier;
				const types = species.types;
				const typeCombo = types.slice().sort().join();
				// Dynamically scale limits for different team sizes. The default and minimum value is 1.
				const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

				if (restrict && !species.isMega) {
					// Limit one Pokemon per tier, two for Monotype
					if (
						(tierCount[tier] >= (isMonotype || this.forceMonotype ? 2 : 1) * limitFactor) &&
						!this.randomChance(1, Math.pow(5, tierCount[tier]))
					) {
						continue;
					}

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
				}

				const set = this.randomSet(
					species,
					teamDetails,
					pokemon.length === this.maxTeamSize - 1,
					this.format.gameType !== 'singles'
				);

				const item = this.dex.items.get(set.item);

				// Limit one Z-Move per team
				if (item.zMove && teamDetails.zMove) continue;

				// Zoroark copies the last Pokemon
				if (set.ability === 'Illusion') {
					if (pokemon.length < 1) continue;
					set.level = pokemon[pokemon.length - 1].level;
				}

				// Okay, the set passes, add it to our team
				pokemon.unshift(set);

				// Don't bother tracking details for the last Pokemon
				if (pokemon.length === this.maxTeamSize) break;

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
		let effectivePool: {set: AnyObject, moveVariants?: number[]}[] = [];
		const priorityPool = [];
		for (const curSet of setList) {
			if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			const item = this.dex.items.get(curSet.item);
			if (teamData.megaCount && teamData.megaCount > 0 && item.megaStone) continue; // reject 2+ mega stones
			if (teamData.zCount && teamData.zCount > 0 && item.zMove) continue; // reject 2+ Z stones
			if (itemsMax[item.id] && teamData.has[item.id] >= itemsMax[item.id]) continue;

			const ability = this.dex.abilities.get(curSet.ability);
			if (weatherAbilitiesRequire[ability.id] && teamData.weather !== weatherAbilitiesRequire[ability.id]) continue;
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
