import {BattleFactorySpecies, RandomGen7Teams} from './gen7';
import {MoveCounter, OldRandomBattleSpecies, TeamData} from './gen8';
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
	Species,
	StatID,
	toID,
} from '@pkmn/sim';

/* eslint-disable */
const randomDataJSON = {"venusaur":{"level":84,"moves":["gigadrain","leechseed","sleeppowder","sludgebomb","substitute"],"doublesMoves":["gigadrain","hiddenpowerfire","hiddenpowerice","powerwhip","protect","sleeppowder","sludgebomb"]},"venusaurmega":{"level":80,"moves":["earthquake","gigadrain","hiddenpowerfire","sleeppowder","sludgebomb","synthesis"],"doublesMoves":["gigadrain","hiddenpowerfire","hiddenpowerice","powerwhip","protect","sleeppowder","sludgebomb"]},"charizardmegax":{"level":80,"moves":["dragonclaw","dragondance","earthquake","flareblitz","roost","willowisp"],"doublesMoves":["dragonclaw","dragondance","earthquake","flareblitz","rockslide","roost","substitute"]},"charizard":{"level":86,"moves":["airslash","earthquake","fireblast","roost","willowisp"],"doublesMoves":["airslash","dragonpulse","fireblast","heatwave","overheat","protect","roost","tailwind"]},"charizardmegay":{"level":80,"moves":["airslash","dragonpulse","fireblast","focusblast","roost","solarbeam"],"doublesMoves":["airslash","fireblast","focusblast","heatwave","protect","roost","solarbeam"]},"blastoise":{"level":84,"moves":["dragontail","icebeam","rapidspin","roar","scald","toxic"],"doublesMoves":["fakeout","followme","hydropump","icebeam","icywind","muddywater","protect","scald","waterspout"]},"blastoisemega":{"level":82,"moves":["aurasphere","darkpulse","hydropump","icebeam","rapidspin","scald"],"doublesMoves":["aurasphere","darkpulse","fakeout","followme","hydropump","icebeam","icywind","muddywater","protect","scald"]},"butterfree":{"level":88,"moves":["bugbuzz","energyball","psychic","quiverdance","sleeppowder"],"doublesMoves":["bugbuzz","protect","psychic","quiverdance","shadowball","sleeppowder","substitute"]},"beedrill":{"level":88,"moves":["endeavor","knockoff","poisonjab","tailwind","toxicspikes","uturn"],"doublesMoves":["brickbreak","drillrun","knockoff","poisonjab","protect","stringshot","uturn","xscissor"]},"beedrillmega":{"level":82,"moves":["drillrun","knockoff","poisonjab","swordsdance","uturn","xscissor"],"doublesMoves":["drillrun","knockoff","poisonjab","protect","substitute","uturn","xscissor"]},"pidgeot":{"level":88,"moves":["bravebird","defog","heatwave","return","roost","uturn"],"doublesMoves":["bravebird","doubleedge","heatwave","protect","return","tailwind","uturn"]},"pidgeotmega":{"level":82,"moves":["defog","heatwave","hurricane","roost","uturn"],"doublesMoves":["heatwave","hurricane","protect","tailwind","uturn"]},"raticate":{"level":88,"moves":["facade","flamewheel","protect","suckerpunch","swordsdance","uturn"],"doublesMoves":["crunch","facade","flamewheel","protect","suckerpunch","uturn"]},"fearow":{"level":88,"moves":["doubleedge","drillpeck","drillrun","pursuit","return","uturn"],"doublesMoves":["doubleedge","drillpeck","drillrun","protect","quickattack","return","uturn"]},"arbok":{"level":88,"moves":["aquatail","coil","earthquake","gunkshot","rest","suckerpunch"],"doublesMoves":["aquatail","crunch","earthquake","gunkshot","protect","rest","rockslide","suckerpunch"]},"pikachu":{"level":90,"moves":["extremespeed","grassknot","hiddenpowerice","knockoff","voltswitch","volttackle"],"doublesMoves":["brickbreak","discharge","encore","extremespeed","fakeout","grassknot","hiddenpowerice","knockoff","protect","substitute","thunderbolt","voltswitch","volttackle"]},"raichu":{"level":88,"moves":["encore","focusblast","grassknot","hiddenpowerice","nastyplot","thunderbolt","voltswitch"],"doublesMoves":["encore","extremespeed","fakeout","focusblast","grassknot","hiddenpowerice","knockoff","protect","substitute","thunderbolt"]},"sandslash":{"level":86,"moves":["earthquake","knockoff","rapidspin","stealthrock","stoneedge","swordsdance","toxic"],"doublesMoves":["earthquake","knockoff","protect","rockslide","stoneedge","swordsdance","xscissor"]},"nidoqueen":{"level":82,"moves":["earthpower","fireblast","icebeam","sludgewave","stealthrock","toxicspikes"],"doublesMoves":["earthpower","fireblast","icebeam","protect","sludgebomb"]},"nidoking":{"level":82,"moves":["earthpower","fireblast","icebeam","sludgewave","substitute","superpower"],"doublesMoves":["earthpower","fireblast","focusblast","icebeam","protect","sludgebomb","thunderbolt"]},"clefable":{"level":80,"moves":["calmmind","fireblast","moonblast","softboiled","stealthrock","thunderwave"],"doublesMoves":["dazzlinggleam","fireblast","followme","lightscreen","moonblast","protect","reflect","safeguard","softboiled","thunderwave"]},"ninetales":{"level":84,"moves":["fireblast","hiddenpowerice","nastyplot","solarbeam","substitute","willowisp"],"doublesMoves":["fireblast","heatwave","protect","solarbeam","substitute","willowisp"]},"wigglytuff":{"level":88,"moves":["dazzlinggleam","fireblast","healbell","lightscreen","reflect","stealthrock"],"doublesMoves":["dazzlinggleam","fireblast","hypervoice","icebeam","knockoff","lightscreen","protect","reflect","thunderwave"]},"vileplume":{"level":86,"moves":["aromatherapy","gigadrain","hiddenpowerfire","sleeppowder","sludgebomb","synthesis"],"doublesMoves":["dazzlinggleam","gigadrain","hiddenpowerfire","moonblast","protect","sleeppowder","sludgebomb","stunspore"]},"parasect":{"level":88,"moves":["knockoff","leechseed","seedbomb","spore","substitute","xscissor"],"doublesMoves":["knockoff","leechseed","protect","ragepowder","seedbomb","spore","stunspore","wideguard","xscissor"]},"venomoth":{"level":84,"moves":["bugbuzz","quiverdance","sleeppowder","sludgebomb","substitute"],"doublesMoves":["bugbuzz","gigadrain","protect","psychic","quiverdance","ragepowder","roost","sleeppowder","sludgebomb","substitute"]},"dugtrio":{"level":82,"moves":["earthquake","reversal","stealthrock","stoneedge","substitute","suckerpunch"],"doublesMoves":["earthquake","protect","rockslide","stoneedge","suckerpunch"]},"persian":{"level":88,"moves":["fakeout","knockoff","return","taunt","uturn"],"doublesMoves":["fakeout","feint","hypnosis","knockoff","protect","return","taunt","uturn"]},"golduck":{"level":88,"moves":["calmmind","encore","hydropump","icebeam","psyshock","scald","substitute"],"doublesMoves":["encore","focusblast","hiddenpowergrass","hydropump","icebeam","icywind","protect","psychic","scald","surf"]},"primeape":{"level":86,"moves":["closecombat","earthquake","encore","gunkshot","icepunch","stoneedge","uturn"],"doublesMoves":["closecombat","earthquake","icepunch","poisonjab","protect","punishment","rockslide","stoneedge","taunt","uturn"]},"arcanine":{"level":82,"moves":["closecombat","extremespeed","flareblitz","morningsun","roar","toxic","wildcharge","willowisp"],"doublesMoves":["closecombat","extremespeed","flareblitz","protect","snarl","wildcharge","willowisp"]},"poliwrath":{"level":86,"moves":["circlethrow","focusblast","hydropump","icepunch","raindance","rest","scald","sleeptalk"],"doublesMoves":["bellydrum","brickbreak","earthquake","encore","icepunch","protect","rockslide","waterfall"]},"alakazammega":{"level":82,"moves":["calmmind","encore","focusblast","psychic","psyshock","shadowball","substitute"],"doublesMoves":["dazzlinggleam","encore","focusblast","protect","psychic","psyshock","shadowball","substitute"]},"alakazam":{"level":82,"moves":["focusblast","hiddenpowerfire","hiddenpowerice","psychic","psyshock","shadowball"],"doublesMoves":["dazzlinggleam","encore","focusblast","protect","psychic","psyshock","shadowball","substitute"]},"machamp":{"level":82,"moves":["bulletpunch","dynamicpunch","heavyslam","knockoff","stoneedge","substitute"],"doublesMoves":["bulletpunch","dynamicpunch","icepunch","knockoff","protect","rockslide","stoneedge","wideguard"]},"victreebel":{"level":88,"moves":["knockoff","powerwhip","sleeppowder","sludgebomb","solarbeam","suckerpunch","sunnyday","weatherball"],"doublesMoves":["growth","knockoff","powerwhip","protect","sleeppowder","sludgebomb","solarbeam","suckerpunch","sunnyday","weatherball"]},"tentacruel":{"level":82,"moves":["acidspray","knockoff","rapidspin","scald","sludgebomb","toxicspikes"],"doublesMoves":["acidspray","dazzlinggleam","gigadrain","icebeam","knockoff","muddywater","protect","scald","sludgebomb"]},"golem":{"level":88,"moves":["earthquake","explosion","stoneedge","stealthrock","suckerpunch","toxic"],"doublesMoves":["earthquake","firepunch","hammerarm","protect","rockslide","stoneedge","suckerpunch"]},"rapidash":{"level":88,"moves":["drillrun","flareblitz","morningsun","wildcharge","willowisp"],"doublesMoves":["drillrun","flamecharge","flareblitz","hypnosis","megahorn","protect","wildcharge","willowisp"]},"slowbro":{"level":80,"moves":["fireblast","icebeam","psyshock","scald","slackoff","thunderwave","toxic"],"doublesMoves":["fireblast","grassknot","icebeam","protect","psychic","psyshock","scald","slackoff","thunderwave","trickroom"]},"slowbromega":{"level":80,"moves":["calmmind","fireblast","icebeam","psyshock","scald","slackoff"],"doublesMoves":["fireblast","grassknot","icebeam","protect","psychic","psyshock","scald","slackoff","thunderwave","trickroom"]},"farfetchd":{"level":88,"moves":["bravebird","knockoff","leafblade","return","swordsdance"],"doublesMoves":["bravebird","leafblade","nightslash","protect","return","swordsdance"]},"dodrio":{"level":88,"moves":["bravebird","doubleedge","knockoff","quickattack","return","roost"],"doublesMoves":["bravebird","doubleedge","protect","quickattack","return"]},"dewgong":{"level":88,"moves":["encore","icebeam","protect","surf","toxic"],"doublesMoves":["encore","fakeout","icebeam","perishsong","protect","surf","toxic"]},"muk":{"level":88,"moves":["curse","firepunch","gunkshot","icepunch","memento","poisonjab","shadowsneak"],"doublesMoves":["brickbreak","firepunch","gunkshot","icepunch","poisonjab","protect","shadowsneak"]},"cloyster":{"level":82,"moves":["hydropump","iceshard","iciclespear","rapidspin","rockblast","shellsmash","spikes"],"doublesMoves":["hydropump","iciclespear","protect","razorshell","rockblast","shellsmash"]},"gengar":{"level":80,"moves":["disable","focusblast","shadowball","sludgewave","substitute","trick","willowisp"],"doublesMoves":["dazzlinggleam","disable","focusblast","hypnosis","protect","shadowball","sludgebomb","substitute","taunt","willowisp"]},"gengarmega":{"level":76,"moves":["destinybond","disable","focusblast","perishsong","protect","shadowball","sludgewave","taunt"],"doublesMoves":["dazzlinggleam","disable","focusblast","hypnosis","protect","shadowball","sludgebomb","substitute","taunt","willowisp"]},"hypno":{"level":88,"moves":["foulplay","protect","psychic","seismictoss","thunderwave","toxic","wish"],"doublesMoves":["dazzlinggleam","foulplay","hypnosis","protect","psychic","seismictoss","thunderwave","trickroom","wish"]},"kingler":{"level":88,"moves":["agility","crabhammer","knockoff","rockslide","superpower","swordsdance","xscissor"],"doublesMoves":["crabhammer","knockoff","protect","rockslide","substitute","superpower","wideguard","xscissor"]},"electrode":{"level":88,"moves":["foulplay","hiddenpowergrass","hiddenpowerice","signalbeam","taunt","thunderbolt","voltswitch"],"doublesMoves":["discharge","foulplay","hiddenpowerice","protect","taunt","thunderwave","voltswitch"]},"exeggutor":{"level":88,"moves":["gigadrain","hiddenpowerfire","leechseed","psychic","sleeppowder","substitute"],"doublesMoves":["gigadrain","hiddenpowerfire","leechseed","protect","psychic","psyshock","sleeppowder","substitute","trickroom"]},"marowak":{"level":88,"moves":["bonemerang","doubleedge","earthquake","knockoff","stealthrock","stoneedge","substitute"],"doublesMoves":["bonemerang","doubleedge","earthquake","firepunch","protect","rockslide","substitute","swordsdance"]},"hitmonlee":{"level":84,"moves":["fakeout","highjumpkick","knockoff","machpunch","poisonjab","rapidspin","stoneedge"],"doublesMoves":["blazekick","earthquake","fakeout","highjumpkick","knockoff","machpunch","protect","rockslide","wideguard"]},"hitmonchan":{"level":86,"moves":["bulkup","drainpunch","firepunch","icepunch","machpunch","rapidspin"],"doublesMoves":["drainpunch","earthquake","fakeout","firepunch","icepunch","machpunch","protect","rockslide","thunderpunch"]},"weezing":{"level":86,"moves":["fireblast","painsplit","sludgebomb","toxicspikes","willowisp"],"doublesMoves":["explosion","fireblast","painsplit","protect","sludgebomb","thunderbolt","toxic","willowisp"]},"rhydon":{"level":86,"moves":["earthquake","megahorn","stealthrock","stoneedge","toxic"]},"chansey":{"level":80,"moves":["healbell","seismictoss","softboiled","stealthrock","thunderwave","toxic","wish"],"doublesMoves":["aromatherapy","helpinghand","lightscreen","protect","seismictoss","softboiled","thunderwave","toxic","wish"]},"kangaskhan":{"level":86,"moves":["crunch","drainpunch","earthquake","fakeout","return","suckerpunch"],"doublesMoves":["crunch","doubleedge","drainpunch","earthquake","fakeout","protect","return","suckerpunch"]},"kangaskhanmega":{"level":76,"moves":["crunch","earthquake","fakeout","poweruppunch","return","seismictoss","suckerpunch"],"doublesMoves":["crunch","doubleedge","drainpunch","earthquake","fakeout","poweruppunch","protect","return","suckerpunch"]},"seaking":{"level":88,"moves":["drillrun","icebeam","knockoff","megahorn","raindance","waterfall"],"doublesMoves":["drillrun","icebeam","icywind","knockoff","megahorn","protect","surf","waterfall"]},"starmie":{"level":80,"moves":["hydropump","icebeam","psyshock","rapidspin","recover","scald","thunderbolt"],"doublesMoves":["hydropump","icebeam","protect","psychic","psyshock","recover","scald","surf","thunderbolt"]},"mrmime":{"level":88,"moves":["dazzlinggleam","encore","focusblast","healingwish","nastyplot","psyshock","shadowball"],"doublesMoves":["dazzlinggleam","encore","fakeout","hiddenpowerfighting","icywind","protect","teeterdance","thunderbolt","thunderwave","wideguard"]},"scyther":{"level":86,"moves":["aerialace","brickbreak","bugbite","knockoff","quickattack","roost","swordsdance","uturn"],"doublesMoves":["aerialace","brickbreak","bugbite","feint","knockoff","protect","quickattack","swordsdance","uturn"]},"jynx":{"level":86,"moves":["focusblast","icebeam","lovelykiss","nastyplot","psychic","psyshock","substitute","trick"],"doublesMoves":["hiddenpowerfighting","icebeam","lovelykiss","protect","psychic","psyshock","shadowball","substitute"]},"pinsir":{"level":86,"moves":["closecombat","earthquake","knockoff","stealthrock","stoneedge","xscissor"],"doublesMoves":["closecombat","earthquake","protect","rockslide","substitute","swordsdance","xscissor"]},"pinsirmega":{"level":80,"moves":["closecombat","earthquake","quickattack","return","swordsdance"],"doublesMoves":["closecombat","earthquake","feint","protect","quickattack","return","rockslide","substitute","swordsdance"]},"tauros":{"level":86,"moves":["bodyslam","doubleedge","earthquake","rockslide","zenheadbutt"],"doublesMoves":["doubleedge","earthquake","protect","return","rockslide","stoneedge","zenheadbutt"]},"gyarados":{"level":82,"moves":["bounce","dragondance","earthquake","stoneedge","substitute","waterfall"],"doublesMoves":["bounce","dragondance","earthquake","icefang","protect","stoneedge","substitute","taunt","thunderwave","waterfall"]},"gyaradosmega":{"level":82,"moves":["crunch","dragondance","earthquake","icefang","substitute","waterfall"],"doublesMoves":["bounce","dragondance","earthquake","icefang","protect","stoneedge","substitute","taunt","thunderwave","waterfall"]},"lapras":{"level":88,"moves":["freezedry","healbell","hydropump","icebeam","thunderbolt","toxic"],"doublesMoves":["healbell","hydropump","icebeam","iceshard","icywind","protect","substitute","surf","thunderbolt"]},"ditto":{"level":88,"moves":["transform"]},"vaporeon":{"level":82,"moves":["healbell","icebeam","protect","scald","toxic","wish"],"doublesMoves":["helpinghand","hydropump","icebeam","muddywater","protect","scald","toxic","wish"]},"jolteon":{"level":84,"moves":["hiddenpowerice","shadowball","signalbeam","thunderbolt","voltswitch"],"doublesMoves":["helpinghand","hiddenpowergrass","hiddenpowerice","protect","signalbeam","substitute","thunderbolt","voltswitch"]},"flareon":{"level":88,"moves":["facade","flamecharge","flareblitz","quickattack","superpower"],"doublesMoves":["facade","flamecharge","flareblitz","helpinghand","protect","superpower","wish"]},"omastar":{"level":86,"moves":["earthpower","hydropump","icebeam","shellsmash","spikes","stealthrock"],"doublesMoves":["earthpower","hiddenpowerelectric","hydropump","icebeam","muddywater","protect","shellsmash"]},"kabutops":{"level":86,"moves":["aquajet","knockoff","rapidspin","stoneedge","swordsdance","waterfall"],"doublesMoves":["aquajet","knockoff","protect","rockslide","stoneedge","superpower","swordsdance","waterfall"]},"aerodactyl":{"level":84,"moves":["defog","doubleedge","earthquake","pursuit","roost","stealthrock","stoneedge","taunt"],"doublesMoves":["aquatail","earthquake","icefang","protect","rockslide","skydrop","stoneedge","tailwind","taunt","wideguard"]},"aerodactylmega":{"level":82,"moves":["aerialace","aquatail","earthquake","firefang","honeclaws","roost","stoneedge"],"doublesMoves":["aerialace","earthquake","icefang","ironhead","protect","rockslide","skydrop","stoneedge","tailwind","taunt","wideguard"]},"snorlax":{"level":82,"moves":["bodyslam","crunch","curse","earthquake","firepunch","pursuit","rest","return","sleeptalk","whirlwind"],"doublesMoves":["bodyslam","crunch","curse","earthquake","firepunch","icepunch","protect","return","selfdestruct"]},"articuno":{"level":88,"moves":["freezedry","hurricane","icebeam","roost","substitute","toxic"],"doublesMoves":["freezedry","hurricane","protect","roost","substitute","tailwind"]},"zapdos":{"level":80,"moves":["defog","heatwave","hiddenpowerice","roost","thunderbolt","toxic","uturn"],"doublesMoves":["discharge","heatwave","hiddenpowergrass","hiddenpowerice","protect","tailwind","thunderbolt"]},"moltres":{"level":84,"moves":["fireblast","hiddenpowergrass","hurricane","roost","substitute","toxic","willowisp"],"doublesMoves":["airslash","fireblast","heatwave","hiddenpowergrass","hurricane","protect","roost","substitute","tailwind","uturn","willowisp"]},"dragonite":{"level":80,"moves":["dragondance","earthquake","extremespeed","firepunch","outrage","roost"],"doublesMoves":["dracometeor","dragonclaw","dragondance","earthquake","extremespeed","firepunch","protect","roost","skydrop","substitute","superpower"]},"mewtwo":{"level":76,"moves":["aurasphere","calmmind","fireblast","icebeam","psystrike","recover"],"doublesMoves":["aurasphere","calmmind","fireblast","icebeam","protect","psystrike","recover","substitute","taunt","thunderbolt","willowisp"]},"mewtwomegax":{"level":76,"moves":["bulkup","drainpunch","icebeam","stoneedge","taunt","zenheadbutt"]},"mewtwomegay":{"level":76,"moves":["aurasphere","calmmind","fireblast","icebeam","psystrike","recover","shadowball","taunt","willowisp"]},"mew":{"level":80,"moves":["aurasphere","defog","earthpower","icebeam","knockoff","nastyplot","psyshock","roost","stealthrock","taunt","willowisp"],"doublesMoves":["aurasphere","fakeout","fireblast","helpinghand","icebeam","nastyplot","protect","psyshock","roost","tailwind","taunt","thunderbolt","transform","willowisp"]},"meganium":{"level":88,"moves":["aromatherapy","dragontail","gigadrain","leechseed","lightscreen","reflect","synthesis","toxic"],"doublesMoves":["aromatherapy","dragontail","gigadrain","healpulse","leechseed","lightscreen","petalblizzard","protect","reflect","synthesis","toxic"]},"typhlosion":{"level":84,"moves":["eruption","extrasensory","fireblast","focusblast","hiddenpowergrass"],"doublesMoves":["eruption","extrasensory","fireblast","focusblast","heatwave","hiddenpowergrass","protect"]},"feraligatr":{"level":82,"moves":["aquajet","crunch","dragondance","earthquake","icepunch","swordsdance","waterfall"],"doublesMoves":["aquajet","crunch","dragondance","earthquake","icepunch","protect","swordsdance","waterfall"]},"furret":{"level":88,"moves":["aquatail","doubleedge","firepunch","knockoff","trick","uturn"],"doublesMoves":["doubleedge","firepunch","followme","helpinghand","icepunch","knockoff","protect","suckerpunch","superfang","uturn"]},"noctowl":{"level":88,"moves":["airslash","defog","nightshade","roost","toxic","whirlwind"],"doublesMoves":["airslash","heatwave","hypervoice","hypnosis","protect","roost","tailwind"]},"ledian":{"level":88,"moves":["knockoff","lightscreen","reflect","roost","toxic","uturn"],"doublesMoves":["bugbuzz","encore","knockoff","lightscreen","protect","reflect","tailwind","uturn"]},"ariados":{"level":88,"moves":["megahorn","poisonjab","stickyweb","suckerpunch","toxicspikes"],"doublesMoves":["megahorn","poisonjab","protect","ragepowder","stickyweb","stringshot"]},"crobat":{"level":82,"moves":["bravebird","defog","roost","superfang","taunt","toxic","uturn"],"doublesMoves":["bravebird","crosspoison","protect","superfang","tailwind","taunt","uturn"]},"lanturn":{"level":86,"moves":["healbell","hydropump","icebeam","scald","thunderbolt","thunderwave","toxic","voltswitch"],"doublesMoves":["discharge","hiddenpowergrass","hydropump","icebeam","protect","scald","surf","thunderbolt","thunderwave"]},"xatu":{"level":86,"moves":["calmmind","heatwave","psychic","roost","thunderwave","toxic","uturn"],"doublesMoves":["grassknot","heatwave","lightscreen","protect","psychic","reflect","roost","tailwind","thunderwave","uturn"]},"ampharos":{"level":88,"moves":["focusblast","healbell","hiddenpowerice","lightscreen","reflect","thunderbolt","toxic","voltswitch"],"doublesMoves":["discharge","dragonpulse","focusblast","hiddenpowergrass","hiddenpowerice","protect","thunderbolt"]},"ampharosmega":{"level":82,"moves":["agility","dragonpulse","focusblast","healbell","thunderbolt","voltswitch"],"doublesMoves":["discharge","dragonpulse","focusblast","hiddenpowergrass","hiddenpowerice","protect","thunderbolt"]},"bellossom":{"level":88,"moves":["gigadrain","hiddenpowerfire","sleeppowder","sunnyday","synthesis"],"doublesMoves":["dazzlinggleam","gigadrain","hiddenpowerfire","moonblast","protect","sleeppowder","sludgebomb","solarbeam","stunspore","sunnyday"]},"azumarill":{"level":80,"moves":["aquajet","bellydrum","knockoff","playrough","superpower","waterfall"],"doublesMoves":["aquajet","bellydrum","knockoff","playrough","protect","superpower","waterfall"]},"sudowoodo":{"level":88,"moves":["earthquake","stealthrock","stoneedge","suckerpunch","toxic","woodhammer"],"doublesMoves":["earthquake","explosion","helpinghand","protect","rockslide","stealthrock","stoneedge","suckerpunch","woodhammer"]},"politoed":{"level":84,"moves":["encore","icebeam","protect","rest","scald","toxic"],"doublesMoves":["encore","focusblast","helpinghand","hiddenpowergrass","hydropump","hypnosis","icebeam","icywind","protect","scald"]},"jumpluff":{"level":88,"moves":["acrobatics","encore","leechseed","seedbomb","sleeppowder","substitute","swordsdance","toxic","uturn"],"doublesMoves":["encore","gigadrain","helpinghand","leechseed","protect","ragepowder","sleeppowder","uturn"]},"sunflora":{"level":88,"moves":["earthpower","hiddenpowerfire","hiddenpowerice","leafstorm","sludgebomb"],"doublesMoves":["earthpower","encore","gigadrain","hiddenpowerfire","hiddenpowerice","protect","solarbeam","sunnyday"]},"quagsire":{"level":88,"moves":["earthquake","encore","icebeam","recover","scald","toxic"],"doublesMoves":["curse","earthquake","icepunch","icywind","protect","rockslide","scald","waterfall","yawn"]},"espeon":{"level":82,"moves":["calmmind","dazzlinggleam","morningsun","psychic","psyshock","shadowball","substitute"],"doublesMoves":["dazzlinggleam","helpinghand","hiddenpowerfighting","protect","psychic","psyshock","shadowball","substitute","wish"]},"umbreon":{"level":82,"moves":["foulplay","healbell","protect","toxic","wish"],"doublesMoves":["foulplay","healbell","helpinghand","moonlight","protect","snarl","wish"]},"slowking":{"level":84,"moves":["dragontail","fireblast","icebeam","nastyplot","psychic","psyshock","scald","slackoff","thunderwave","toxic","trickroom"],"doublesMoves":["fireblast","grassknot","icebeam","protect","psychic","psyshock","scald","slackoff","thunderwave","trickroom"]},"unown":{"level":100,"moves":["hiddenpowerpsychic"]},"wobbuffet":{"level":82,"moves":["counter","destinybond","encore","mirrorcoat"]},"girafarig":{"level":88,"moves":["hypervoice","nastyplot","psychic","psyshock","substitute","thunderbolt"],"doublesMoves":["agility","hypervoice","nastyplot","protect","psychic","psyshock","thunderbolt"]},"forretress":{"level":82,"moves":["gyroball","rapidspin","spikes","stealthrock","toxic","voltswitch"],"doublesMoves":["drillrun","gyroball","protect","rockslide","stealthrock","toxic","voltswitch"]},"dunsparce":{"level":88,"moves":["bite","bodyslam","coil","glare","headbutt","rockslide","roost"],"doublesMoves":["bite","bodyslam","coil","glare","headbutt","protect","rockslide"]},"gligar":{"level":82,"moves":["defog","earthquake","knockoff","roost","stealthrock","toxic","uturn"]},"steelix":{"level":86,"moves":["earthquake","ironhead","roar","rockslide","stealthrock","toxic"],"doublesMoves":["earthquake","explosion","ironhead","protect","rockslide","stealthrock"]},"steelixmega":{"level":84,"moves":["dragontail","earthquake","heavyslam","roar","stealthrock","toxic"],"doublesMoves":["earthquake","explosion","heavyslam","protect","rockslide","stealthrock"]},"granbull":{"level":84,"moves":["crunch","earthquake","healbell","playrough","thunderwave"],"doublesMoves":["crunch","earthquake","playrough","protect","rockslide","snarl","thunderwave"]},"qwilfish":{"level":84,"moves":["destinybond","painsplit","spikes","taunt","thunderwave","toxicspikes","waterfall"],"doublesMoves":["destinybond","poisonjab","protect","swordsdance","taunt","thunderwave","waterfall"]},"scizor":{"level":80,"moves":["bugbite","bulletpunch","defog","knockoff","pursuit","roost","superpower","swordsdance","uturn"],"doublesMoves":["bugbite","bulletpunch","feint","knockoff","protect","roost","superpower","swordsdance","uturn"]},"scizormega":{"level":80,"moves":["bugbite","bulletpunch","defog","knockoff","roost","superpower","swordsdance","uturn"],"doublesMoves":["bugbite","bulletpunch","feint","knockoff","protect","roost","superpower","swordsdance","uturn"]},"shuckle":{"level":84,"moves":["encore","knockoff","stealthrock","stickyweb","toxic"],"doublesMoves":["encore","guardsplit","helpinghand","knockoff","powersplit","stealthrock","stickyweb","toxic"]},"heracross":{"level":82,"moves":["closecombat","earthquake","knockoff","megahorn","stoneedge","swordsdance"],"doublesMoves":["closecombat","earthquake","knockoff","megahorn","protect","stoneedge","swordsdance"]},"heracrossmega":{"level":80,"moves":["closecombat","pinmissile","rockblast","substitute","swordsdance"],"doublesMoves":["bulletseed","closecombat","earthquake","knockoff","pinmissile","protect","rockblast","swordsdance"]},"ursaring":{"level":88,"moves":["closecombat","crunch","facade","protect","swordsdance"],"doublesMoves":["closecombat","crunch","earthquake","facade","protect","swordsdance"]},"magcargo":{"level":88,"moves":["ancientpower","earthpower","fireblast","hiddenpowergrass","lavaplume","recover","shellsmash","stealthrock","toxic"],"doublesMoves":["ancientpower","earthpower","fireblast","heatwave","hiddenpowergrass","protect","shellsmash","stealthrock","willowisp"]},"corsola":{"level":88,"moves":["powergem","recover","scald","stealthrock","toxic"],"doublesMoves":["earthpower","icebeam","icywind","powergem","protect","scald","stealthrock"]},"octillery":{"level":88,"moves":["energyball","fireblast","gunkshot","hydropump","icebeam","rockblast","scald"],"doublesMoves":["chargebeam","energyball","fireblast","hydropump","icebeam","protect","surf"]},"delibird":{"level":100,"moves":["destinybond","freezedry","icywind","rapidspin","spikes"],"doublesMoves":["aerialace","brickbreak","fakeout","icepunch","iceshard","protect"]},"mantine":{"level":86,"moves":["airslash","defog","rest","scald","sleeptalk","toxic"],"doublesMoves":["airslash","helpinghand","hydropump","icebeam","protect","raindance","scald","surf","tailwind","wideguard"]},"skarmory":{"level":80,"moves":["bravebird","defog","roost","spikes","stealthrock","whirlwind"],"doublesMoves":["bravebird","feint","ironhead","protect","skydrop","tailwind","taunt"]},"houndoom":{"level":84,"moves":["darkpulse","fireblast","hiddenpowergrass","nastyplot","suckerpunch"],"doublesMoves":["darkpulse","heatwave","hiddenpowerfighting","nastyplot","protect","suckerpunch"]},"houndoommega":{"level":84,"moves":["darkpulse","fireblast","hiddenpowergrass","nastyplot","taunt"],"doublesMoves":["darkpulse","heatwave","hiddenpowergrass","nastyplot","protect","taunt"]},"kingdra":{"level":84,"moves":["dracometeor","dragondance","hydropump","icebeam","outrage","raindance","waterfall"],"doublesMoves":["dracometeor","dragonpulse","focusenergy","hydropump","icebeam","muddywater","protect"]},"donphan":{"level":82,"moves":["earthquake","iceshard","knockoff","rapidspin","stealthrock","stoneedge"],"doublesMoves":["earthquake","iceshard","knockoff","protect","rockslide","stealthrock"]},"porygon2":{"level":82,"moves":["discharge","icebeam","recover","toxic","triattack"],"doublesMoves":["discharge","icebeam","protect","recover","shadowball","triattack"]},"stantler":{"level":88,"moves":["doubleedge","earthquake","jumpkick","megahorn","suckerpunch"],"doublesMoves":["earthquake","jumpkick","megahorn","protect","return","suckerpunch"]},"smeargle":{"level":88,"moves":["destinybond","spore","stealthrock","stickyweb","whirlwind"],"doublesMoves":["fakeout","followme","helpinghand","kingsshield","spore","tailwind","transform","wideguard"]},"hitmontop":{"level":84,"moves":["closecombat","rapidspin","stoneedge","suckerpunch","toxic"],"doublesMoves":["closecombat","fakeout","feint","helpinghand","machpunch","suckerpunch","wideguard"]},"miltank":{"level":86,"moves":["bodyslam","curse","earthquake","healbell","milkdrink","stealthrock","toxic"],"doublesMoves":["bodyslam","curse","earthquake","healbell","helpinghand","protect","thunderwave"]},"blissey":{"level":82,"moves":["healbell","seismictoss","softboiled","stealthrock","thunderwave","toxic"],"doublesMoves":["aromatherapy","flamethrower","helpinghand","icebeam","protect","seismictoss","softboiled","thunderwave","toxic","wish"]},"raikou":{"level":80,"moves":["aurasphere","calmmind","extrasensory","hiddenpowerice","substitute","thunderbolt","voltswitch"],"doublesMoves":["calmmind","extrasensory","hiddenpowerice","protect","snarl","substitute","thunderbolt"]},"entei":{"level":82,"moves":["bulldoze","extremespeed","flareblitz","sacredfire","stoneedge"],"doublesMoves":["bulldoze","extremespeed","flareblitz","ironhead","protect","sacredfire","stoneedge"]},"suicune":{"level":82,"moves":["calmmind","hiddenpowergrass","icebeam","rest","scald","sleeptalk"],"doublesMoves":["calmmind","hiddenpowergrass","hydropump","icebeam","protect","scald","snarl","tailwind"]},"tyranitar":{"level":80,"moves":["crunch","earthquake","fireblast","icebeam","pursuit","stealthrock","stoneedge"],"doublesMoves":["crunch","earthquake","firepunch","icepunch","protect","rockslide","stealthrock","stoneedge"]},"tyranitarmega":{"level":80,"moves":["crunch","dragondance","earthquake","icepunch","stoneedge"],"doublesMoves":["crunch","dragondance","earthquake","icepunch","protect","rockslide","stoneedge"]},"lugia":{"level":76,"moves":["aeroblast","earthquake","roost","substitute","toxic","whirlwind"],"doublesMoves":["aeroblast","calmmind","icebeam","protect","psychic","roost","skydrop","substitute","tailwind"]},"hooh":{"level":76,"moves":["bravebird","earthquake","roost","sacredfire","substitute","toxic"],"doublesMoves":["bravebird","earthquake","protect","roost","sacredfire","skydrop","substitute","tailwind","toxic"]},"celebi":{"level":82,"moves":["earthpower","gigadrain","hiddenpowerfire","leafstorm","nastyplot","psychic","recover","thunderwave","uturn"],"doublesMoves":["earthpower","gigadrain","hiddenpowerfire","leafstorm","leechseed","nastyplot","protect","psychic","recover","thunderwave","uturn"]},"sceptile":{"level":86,"moves":["focusblast","gigadrain","hiddenpowerfire","hiddenpowerice","leafstorm","leechseed","substitute"],"doublesMoves":["focusblast","gigadrain","hiddenpowerfire","hiddenpowerice","leafstorm","protect","substitute"]},"sceptilemega":{"level":82,"moves":["dragonpulse","earthquake","focusblast","gigadrain","hiddenpowerfire","leafblade","outrage","substitute","swordsdance"],"doublesMoves":["dragonpulse","focusblast","gigadrain","hiddenpowerfire","hiddenpowerice","leafstorm","protect","substitute"]},"blaziken":{"level":76,"moves":["fireblast","hiddenpowerice","highjumpkick","knockoff","protect"]},"blazikenmega":{"level":76,"moves":["flareblitz","highjumpkick","knockoff","protect","stoneedge","swordsdance"]},"swampert":{"level":82,"moves":["earthquake","icebeam","protect","roar","scald","stealthrock","toxic"],"doublesMoves":["earthquake","icebeam","icywind","muddywater","protect","rockslide","scald","stealthrock","waterfall","wideguard"]},"swampertmega":{"level":82,"moves":["earthquake","icepunch","raindance","superpower","waterfall"],"doublesMoves":["earthquake","icepunch","protect","raindance","superpower","waterfall"]},"mightyena":{"level":88,"moves":["crunch","firefang","irontail","playrough","suckerpunch"],"doublesMoves":["crunch","firefang","playrough","protect","suckerpunch","taunt"]},"linoone":{"level":88,"moves":["bellydrum","extremespeed","seedbomb","shadowclaw"],"doublesMoves":["bellydrum","extremespeed","protect","seedbomb","shadowclaw"]},"beautifly":{"level":88,"moves":["bugbuzz","energyball","hiddenpowerfighting","psychic","quiverdance"],"doublesMoves":["aircutter","bugbuzz","gigadrain","hiddenpowerrock","protect","quiverdance","stringshot","tailwind"]},"dustox":{"level":88,"moves":["bugbuzz","defog","quiverdance","roost","sludgebomb","uturn"],"doublesMoves":["bugbuzz","protect","quiverdance","shadowball","sludgebomb","stringshot","strugglebug","tailwind"]},"ludicolo":{"level":86,"moves":["focusblast","gigadrain","hydropump","icebeam","raindance","scald"],"doublesMoves":["fakeout","gigadrain","hydropump","icebeam","protect","raindance","surf"]},"shiftry":{"level":86,"moves":["defog","knockoff","leafblade","leafstorm","lowkick","suckerpunch","swordsdance"],"doublesMoves":["fakeout","knockoff","leafblade","leafstorm","lowkick","protect","suckerpunch","swordsdance"]},"swellow":{"level":86,"moves":["bravebird","facade","protect","quickattack","uturn"],"doublesMoves":["bravebird","facade","protect","quickattack","uturn"]},"pelipper":{"level":88,"moves":["defog","hurricane","knockoff","roost","scald","toxic","uturn"],"doublesMoves":["hurricane","knockoff","protect","scald","surf","tailwind","wideguard"]},"gardevoir":{"level":82,"moves":["calmmind","focusblast","moonblast","psychic","shadowball","substitute","thunderbolt","willowisp"],"doublesMoves":["dazzlinggleam","focusblast","helpinghand","moonblast","protect","psyshock","shadowball","taunt","thunderbolt","trickroom","willowisp"]},"gardevoirmega":{"level":80,"moves":["calmmind","focusblast","hypervoice","psyshock","substitute","taunt","willowisp"],"doublesMoves":["calmmind","focusblast","hypervoice","protect","psyshock","shadowball","thunderbolt"]},"masquerain":{"level":88,"moves":["airslash","bugbuzz","hydropump","quiverdance","stickyweb"],"doublesMoves":["airslash","bugbuzz","hydropump","protect","quiverdance","roost","strugglebug","tailwind"]},"breloom":{"level":80,"moves":["bulletseed","machpunch","rocktomb","spore","swordsdance"],"doublesMoves":["bulletseed","drainpunch","helpinghand","machpunch","protect","rocktomb","spore"]},"slaking":{"level":88,"moves":["earthquake","firepunch","gigaimpact","nightslash","pursuit","retaliate"],"doublesMoves":["doubleedge","earthquake","hammerarm","nightslash","retaliate","rockslide"]},"ninjask":{"level":88,"moves":["aerialace","nightslash","swordsdance","uturn","xscissor"],"doublesMoves":["aerialace","nightslash","protect","swordsdance","xscissor"]},"shedinja":{"level":88,"moves":["shadowclaw","shadowsneak","swordsdance","willowisp","xscissor"]},"exploud":{"level":84,"moves":["boomburst","fireblast","focusblast","icebeam","surf"],"doublesMoves":["boomburst","fireblast","focusblast","hypervoice","icebeam","protect","surf"]},"hariyama":{"level":86,"moves":["bulkup","bulletpunch","closecombat","icepunch","knockoff","stoneedge"],"doublesMoves":["bulletpunch","closecombat","fakeout","helpinghand","icepunch","knockoff","protect","stoneedge","wideguard"]},"delcatty":{"level":88,"moves":["doubleedge","fakeout","healbell","suckerpunch","thunderwave","wildcharge"],"doublesMoves":["doubleedge","fakeout","helpinghand","playrough","protect","suckerpunch","thunderwave","wildcharge"]},"sableye":{"level":84,"moves":["foulplay","knockoff","recover","taunt","toxic","willowisp"],"doublesMoves":["fakeout","foulplay","helpinghand","knockoff","protect","recover","snarl","taunt","willowisp"]},"sableyemega":{"level":76,"moves":["calmmind","darkpulse","recover","shadowball","willowisp"],"doublesMoves":["darkpulse","fakeout","knockoff","protect","shadowball","willowisp"]},"mawile":{"level":88,"moves":["ironhead","knockoff","playrough","stealthrock","suckerpunch","swordsdance"],"doublesMoves":["firefang","ironhead","knockoff","playrough","protect","substitute","suckerpunch","swordsdance"]},"mawilemega":{"level":76,"moves":["firefang","focuspunch","ironhead","knockoff","playrough","substitute","suckerpunch","swordsdance"],"doublesMoves":["firefang","ironhead","knockoff","playrough","protect","substitute","suckerpunch","swordsdance"]},"aggron":{"level":86,"moves":["aquatail","autotomize","earthquake","headsmash","heavyslam","stealthrock"],"doublesMoves":["aquatail","earthquake","headsmash","heavyslam","lowkick","protect","rockslide","stealthrock"]},"aggronmega":{"level":82,"moves":["earthquake","heavyslam","roar","stoneedge","stealthrock","thunderwave","toxic"],"doublesMoves":["aquatail","earthquake","heavyslam","lowkick","protect","rockslide"]},"medicham":{"level":84,"moves":["bulletpunch","drainpunch","highjumpkick","icepunch","zenheadbutt"],"doublesMoves":["bulletpunch","drainpunch","fakeout","highjumpkick","icepunch","protect","zenheadbutt"]},"medichammega":{"level":80,"moves":["fakeout","highjumpkick","icepunch","thunderpunch","zenheadbutt"],"doublesMoves":["bulletpunch","drainpunch","fakeout","highjumpkick","icepunch","protect","zenheadbutt"]},"manectric":{"level":86,"moves":["flamethrower","hiddenpowergrass","hiddenpowerice","overheat","thunderbolt","voltswitch"],"doublesMoves":["flamethrower","hiddenpowergrass","hiddenpowerice","overheat","protect","snarl","thunderbolt","voltswitch"]},"manectricmega":{"level":80,"moves":["hiddenpowergrass","hiddenpowerice","overheat","thunderbolt","voltswitch"],"doublesMoves":["flamethrower","hiddenpowergrass","hiddenpowerice","overheat","protect","snarl","thunderbolt","voltswitch"]},"plusle":{"level":88,"moves":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"doublesMoves":["encore","helpinghand","hiddenpowerice","nastyplot","protect","substitute","thunderbolt"]},"minun":{"level":88,"moves":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"doublesMoves":["encore","helpinghand","hiddenpowerice","nastyplot","protect","substitute","thunderbolt"]},"volbeat":{"level":88,"moves":["encore","roost","tailwind","thunderwave","uturn"],"doublesMoves":["encore","helpinghand","protect","stringshot","strugglebug","tailwind","thunderwave"]},"illumise":{"level":88,"moves":["bugbuzz","encore","roost","thunderwave","uturn","wish"],"doublesMoves":["bugbuzz","encore","helpinghand","protect","tailwind","thunderbolt","uturn"]},"swalot":{"level":88,"moves":["earthquake","encore","icebeam","painsplit","sludgebomb","toxic","yawn"],"doublesMoves":["earthquake","encore","gunkshot","icebeam","protect","sludgebomb","yawn"]},"sharpedo":{"level":84,"moves":["crunch","earthquake","icebeam","protect","waterfall"],"doublesMoves":["crunch","destinybond","earthquake","icebeam","protect","waterfall"]},"sharpedomega":{"level":82,"moves":["crunch","destinybond","icefang","protect","waterfall","zenheadbutt"]},"wailord":{"level":88,"moves":["hiddenpowerfire","hiddenpowergrass","hydropump","icebeam","waterspout"],"doublesMoves":["hiddenpowerfire","hiddenpowergrass","hydropump","icebeam","protect","waterspout"]},"camerupt":{"level":88,"moves":["earthpower","fireblast","hiddenpowergrass","lavaplume","roar","rockpolish","stealthrock","stoneedge"],"doublesMoves":["earthpower","eruption","fireblast","heatwave","hiddenpowergrass","protect","rockpolish"]},"cameruptmega":{"level":84,"moves":["ancientpower","earthpower","fireblast","stealthrock","toxic","willowisp"],"doublesMoves":["earthpower","eruption","fireblast","heatwave","protect","rockslide"]},"torkoal":{"level":88,"moves":["earthpower","lavaplume","rapidspin","stealthrock","yawn"],"doublesMoves":["earthpower","fireblast","heatwave","hiddenpowergrass","protect","shellsmash","willowisp"]},"grumpig":{"level":88,"moves":["focusblast","healbell","lightscreen","psychic","reflect","thunderwave","toxic","whirlwind"],"doublesMoves":["focusblast","lightscreen","protect","psychic","psyshock","reflect","taunt","thunderwave","trickroom"]},"spinda":{"level":100,"moves":["icepunch","rest","return","sleeptalk","suckerpunch","superpower"],"doublesMoves":["doubleedge","fakeout","protect","return","suckerpunch","superpower","trickroom"]},"flygon":{"level":84,"moves":["defog","earthquake","fireblast","outrage","roost","stoneedge","uturn"],"doublesMoves":["dragonclaw","earthquake","feint","fireblast","firepunch","protect","rockslide","tailwind","uturn"]},"cacturne":{"level":88,"moves":["darkpulse","drainpunch","focusblast","seedbomb","spikes","suckerpunch","swordsdance"],"doublesMoves":["drainpunch","seedbomb","spikyshield","substitute","suckerpunch","swordsdance"]},"altaria":{"level":88,"moves":["dracometeor","dragondance","earthquake","fireblast","outrage","roost","toxic"],"doublesMoves":["dracometeor","dragonclaw","dragondance","earthquake","fireblast","protect","tailwind"]},"altariamega":{"level":82,"moves":["dragondance","earthquake","fireblast","healbell","hypervoice","return","roost"],"doublesMoves":["doubleedge","dragonclaw","dragondance","earthquake","fireblast","protect","return"]},"zangoose":{"level":86,"moves":["closecombat","facade","knockoff","quickattack","swordsdance"],"doublesMoves":["closecombat","facade","knockoff","protect","quickattack"]},"seviper":{"level":88,"moves":["darkpulse","earthquake","flamethrower","gigadrain","poisonjab","sludgewave","suckerpunch","switcheroo"],"doublesMoves":["aquatail","earthquake","flamethrower","gigadrain","glare","poisonjab","protect","sludgebomb","suckerpunch"]},"lunatone":{"level":88,"moves":["ancientpower","calmmind","earthpower","icebeam","moonlight","psychic","rockpolish","stealthrock","toxic"],"doublesMoves":["ancientpower","calmmind","earthpower","helpinghand","icebeam","moonlight","protect","psychic","rockpolish","trickroom"]},"solrock":{"level":88,"moves":["explosion","earthquake","lightscreen","morningsun","reflect","rockslide","stealthrock","willowisp"],"doublesMoves":["helpinghand","protect","rockslide","stoneedge","trickroom","willowisp","zenheadbutt"]},"whiscash":{"level":88,"moves":["dragondance","earthquake","stoneedge","waterfall","zenheadbutt"],"doublesMoves":["dragondance","earthquake","protect","stoneedge","waterfall","zenheadbutt"]},"crawdaunt":{"level":82,"moves":["aquajet","crabhammer","dragondance","knockoff","superpower","swordsdance"],"doublesMoves":["aquajet","crabhammer","crunch","dragondance","knockoff","protect","superpower","swordsdance"]},"claydol":{"level":86,"moves":["earthquake","icebeam","psychic","rapidspin","stealthrock","toxic"],"doublesMoves":["earthpower","earthquake","icebeam","protect","psychic","trickroom"]},"cradily":{"level":86,"moves":["curse","gigadrain","recover","rockslide","seedbomb","stealthrock","toxic"],"doublesMoves":["curse","earthquake","protect","recover","rockslide","seedbomb","swordsdance"]},"armaldo":{"level":88,"moves":["earthquake","knockoff","rapidspin","stealthrock","stoneedge","toxic","xscissor"],"doublesMoves":["knockoff","protect","rockslide","stoneedge","stringshot","swordsdance","xscissor"]},"milotic":{"level":82,"moves":["dragontail","icebeam","recover","rest","scald","sleeptalk","toxic"],"doublesMoves":["dragontail","hiddenpowergrass","hydropump","hypnosis","icebeam","protect","recover","scald"]},"castformsunny":{"level":100,"moves":["icebeam","solarbeam","sunnyday","weatherball"]},"castformrainy":{"level":100,"moves":["hurricane","raindance","thunder","weatherball"]},"castformsnowy":{"level":100,"moves":["blizzard","fireblast","hail","thunderbolt"]},"kecleon":{"level":86,"moves":["drainpunch","fakeout","knockoff","recover","shadowsneak","stealthrock","suckerpunch"],"doublesMoves":["drainpunch","fakeout","knockoff","protect","recover","shadowsneak","suckerpunch","trickroom"]},"banette":{"level":88,"moves":["destinybond","knockoff","shadowclaw","shadowsneak","suckerpunch","taunt","willowisp"],"doublesMoves":["knockoff","protect","shadowclaw","shadowsneak","suckerpunch","willowisp"]},"banettemega":{"level":84,"moves":["destinybond","knockoff","shadowclaw","suckerpunch","taunt","willowisp"],"doublesMoves":["destinybond","knockoff","protect","shadowclaw","suckerpunch","taunt","willowisp"]},"tropius":{"level":88,"moves":["airslash","gigadrain","leechseed","protect","substitute","toxic"],"doublesMoves":["airslash","earthquake","gigadrain","hiddenpowerfire","leechseed","protect","roost","sunnyday","tailwind"]},"chimecho":{"level":88,"moves":["calmmind","healbell","healingwish","psychic","recover","shadowball","taunt","yawn"],"doublesMoves":["dazzlinggleam","helpinghand","protect","psychic","recover","shadowball","taunt","thunderwave","trickroom"]},"absol":{"level":84,"moves":["knockoff","playrough","pursuit","suckerpunch","superpower","swordsdance"],"doublesMoves":["fireblast","knockoff","playrough","protect","suckerpunch","superpower","swordsdance"]},"absolmega":{"level":82,"moves":["icebeam","knockoff","playrough","pursuit","suckerpunch","superpower","swordsdance"],"doublesMoves":["fireblast","knockoff","playrough","protect","suckerpunch","superpower","swordsdance"]},"glalie":{"level":88,"moves":["earthquake","explosion","icebeam","iceshard","spikes","superfang","taunt"],"doublesMoves":["earthquake","icebeam","iceshard","protect","taunt"]},"glaliemega":{"level":84,"moves":["earthquake","explosion","freezedry","iceshard","return","spikes"],"doublesMoves":["crunch","earthquake","explosion","freezedry","iceshard","protect","return"]},"walrein":{"level":88,"moves":["icebeam","protect","roar","superfang","surf","toxic"],"doublesMoves":["icebeam","icywind","protect","roar","superfang","surf"]},"huntail":{"level":88,"moves":["icebeam","shellsmash","suckerpunch","waterfall"],"doublesMoves":["icefang","protect","shellsmash","suckerpunch","waterfall"]},"gorebyss":{"level":88,"moves":["hiddenpowergrass","hydropump","icebeam","shellsmash"],"doublesMoves":["hiddenpowergrass","icebeam","protect","shellsmash","substitute","surf"]},"relicanth":{"level":88,"moves":["doubleedge","earthquake","headsmash","stealthrock","toxic","waterfall"],"doublesMoves":["doubleedge","earthquake","headsmash","protect","rockslide","waterfall"]},"luvdisc":{"level":100,"moves":["icebeam","protect","scald","sweetkiss","toxic"]},"salamence":{"level":82,"moves":["dracometeor","dragonclaw","dragondance","earthquake","fireblast","outrage","roost"],"doublesMoves":["dracometeor","dragonclaw","dragondance","earthquake","fireblast","hydropump","protect","rockslide","tailwind"]},"salamencemega":{"level":76,"moves":["doubleedge","dracometeor","dragondance","earthquake","fireblast","return","roost"],"doublesMoves":["doubleedge","dracometeor","dragonclaw","dragondance","earthquake","fireblast","protect","return"]},"metagross":{"level":82,"moves":["agility","bulletpunch","earthquake","explosion","icepunch","meteormash","stealthrock","thunderpunch","zenheadbutt"],"doublesMoves":["bulletpunch","earthquake","explosion","hammerarm","icepunch","meteormash","protect","thunderpunch","zenheadbutt"]},"metagrossmega":{"level":80,"moves":["agility","earthquake","hammerarm","icepunch","meteormash","zenheadbutt"],"doublesMoves":["earthquake","icepunch","meteormash","protect","thunderpunch","zenheadbutt"]},"regirock":{"level":86,"moves":["curse","drainpunch","earthquake","rest","stealthrock","stoneedge","thunderwave","toxic"],"doublesMoves":["curse","drainpunch","protect","rockslide","stealthrock","stoneedge","thunderwave"]},"regice":{"level":88,"moves":["focusblast","icebeam","rest","rockpolish","sleeptalk","thunderbolt","thunderwave"],"doublesMoves":["focusblast","icebeam","icywind","protect","rockpolish","thunderbolt","thunderwave"]},"registeel":{"level":84,"moves":["curse","ironhead","rest","sleeptalk","stealthrock","toxic"],"doublesMoves":["curse","ironhead","protect","rest","seismictoss","stealthrock","thunderwave"]},"latiasmega":{"level":80,"moves":["calmmind","dracometeor","hiddenpowerfire","psyshock","roost","surf"],"doublesMoves":["dragonpulse","healpulse","helpinghand","lightscreen","protect","psychic","reflect","tailwind"]},"latias":{"level":80,"moves":["defog","dracometeor","healingwish","hiddenpowerfire","psyshock","roost"],"doublesMoves":["dragonpulse","healpulse","helpinghand","lightscreen","protect","psychic","reflect","tailwind"]},"latiosmega":{"level":80,"moves":["calmmind","dracometeor","earthquake","hiddenpowerfire","psyshock","roost"],"doublesMoves":["dracometeor","dragonpulse","hiddenpowerfire","protect","psyshock","substitute","surf","tailwind","thunderbolt"]},"latios":{"level":80,"moves":["calmmind","dracometeor","hiddenpowerfire","psyshock","roost","trick"],"doublesMoves":["dracometeor","dragonpulse","hiddenpowerfire","protect","psyshock","substitute","surf","tailwind","thunderbolt","trick"]},"kyogre":{"level":76,"moves":["icebeam","originpulse","scald","thunder","waterspout"],"doublesMoves":["calmmind","icebeam","muddywater","originpulse","protect","rest","sleeptalk","thunder","waterspout"]},"kyogreprimal":{"level":76,"moves":["calmmind","icebeam","originpulse","rest","scald","sleeptalk","thunder"],"doublesMoves":["calmmind","icebeam","muddywater","originpulse","protect","rest","sleeptalk","thunder","waterspout"]},"groudon":{"level":76,"moves":["earthquake","firepunch","lavaplume","roar","stealthrock","stoneedge","thunderwave","toxic"],"doublesMoves":["dragonclaw","firepunch","precipiceblades","protect","rockpolish","rockslide","stoneedge","swordsdance"]},"groudonprimal":{"level":76,"moves":["dragontail","firepunch","lavaplume","precipiceblades","rockpolish","stealthrock","stoneedge","swordsdance"],"doublesMoves":["firepunch","lavaplume","overheat","precipiceblades","protect","rockpolish","rockslide","stoneedge","swordsdance"]},"rayquaza":{"level":76,"moves":["dracometeor","dragonascent","dragonclaw","dragondance","earthquake","extremespeed","outrage","vcreate"],"doublesMoves":["dracometeor","dragonclaw","dragondance","earthquake","extremespeed","protect","tailwind","vcreate"]},"rayquazamega":{"doublesMoves":["dragonascent","dragonclaw","dragondance","earthquake","extremespeed","protect","swordsdance","vcreate"]},"jirachi":{"level":80,"moves":["bodyslam","firepunch","icepunch","ironhead","stealthrock","substitute","toxic","uturn","wish"],"doublesMoves":["bodyslam","followme","helpinghand","icywind","ironhead","protect","thunderwave","trickroom","uturn","zenheadbutt"]},"deoxys":{"level":76,"moves":["extremespeed","firepunch","knockoff","psychoboost","spikes","stealthrock","superpower","taunt"],"doublesMoves":["extremespeed","firepunch","icebeam","knockoff","protect","psychoboost","psyshock","superpower","thunderbolt"]},"deoxysattack":{"level":76,"moves":["extremespeed","firepunch","icebeam","knockoff","psychoboost","stealthrock","superpower"],"doublesMoves":["extremespeed","firepunch","icebeam","knockoff","protect","psychoboost","superpower","thunderbolt"]},"deoxysdefense":{"level":76,"moves":["knockoff","recover","seismictoss","spikes","stealthrock","taunt","toxic"],"doublesMoves":["lightscreen","protect","recover","reflect","seismictoss","stealthrock","taunt","trickroom"]},"deoxysspeed":{"level":76,"moves":["knockoff","magiccoat","psychoboost","spikes","stealthrock","superpower","taunt"],"doublesMoves":["icebeam","knockoff","lightscreen","protect","psychoboost","reflect","superpower","taunt"]},"torterra":{"level":86,"moves":["earthquake","rockpolish","stealthrock","stoneedge","synthesis","woodhammer"],"doublesMoves":["earthquake","protect","rockpolish","rockslide","stoneedge","wideguard","woodhammer"]},"infernape":{"level":82,"moves":["closecombat","fireblast","flareblitz","grassknot","machpunch","stealthrock","stoneedge","uturn"],"doublesMoves":["closecombat","fakeout","feint","flareblitz","grassknot","heatwave","machpunch","protect","stoneedge","taunt","thunderpunch","uturn"]},"empoleon":{"level":82,"moves":["defog","flashcannon","grassknot","hydropump","icebeam","roar","scald","stealthrock","toxic"],"doublesMoves":["flashcannon","grassknot","hiddenpowerelectric","icebeam","icywind","protect","scald","surf"]},"staraptor":{"level":82,"moves":["bravebird","closecombat","doubleedge","quickattack","uturn"],"doublesMoves":["bravebird","closecombat","doubleedge","protect","quickattack","tailwind","uturn"]},"bibarel":{"level":88,"moves":["curse","quickattack","rest","return","stealthrock","waterfall"],"doublesMoves":["curse","protect","quickattack","rest","return","waterfall"]},"kricketune":{"level":88,"moves":["endeavor","knockoff","stickyweb","taunt","toxic","xscissor"],"doublesMoves":["bugbite","knockoff","protect","stickyweb","taunt"]},"luxray":{"level":88,"moves":["crunch","facade","icefang","superpower","voltswitch","wildcharge"],"doublesMoves":["crunch","facade","icefang","protect","superpower","voltswitch","wildcharge"]},"roserade":{"level":82,"moves":["gigadrain","hiddenpowerfire","leafstorm","sleeppowder","sludgebomb","spikes","synthesis","toxicspikes"],"doublesMoves":["gigadrain","hiddenpowerfire","leafstorm","protect","sleeppowder","sludgebomb"]},"rampardos":{"level":88,"moves":["crunch","earthquake","firepunch","headsmash","rockpolish","rockslide"],"doublesMoves":["crunch","earthquake","headsmash","protect","rockslide","stoneedge","zenheadbutt"]},"bastiodon":{"level":88,"moves":["metalburst","protect","roar","rockblast","stealthrock","toxic"],"doublesMoves":["guardsplit","metalburst","protect","stealthrock","stoneedge","wideguard"]},"wormadam":{"level":88,"moves":["gigadrain","hiddenpowerrock","protect","signalbeam","synthesis","toxic"],"doublesMoves":["gigadrain","hiddenpowerice","hiddenpowerrock","leafstorm","protect","signalbeam","stringshot"]},"wormadamsandy":{"level":88,"moves":["earthquake","protect","stealthrock","toxic"],"doublesMoves":["earthquake","protect","rockblast","stringshot","suckerpunch"]},"wormadamtrash":{"level":88,"moves":["flashcannon","protect","stealthrock","toxic"],"doublesMoves":["flashcannon","protect","stringshot","strugglebug"]},"mothim":{"level":88,"moves":["airslash","bugbuzz","energyball","quiverdance","uturn"],"doublesMoves":["airslash","bugbuzz","gigadrain","protect","quiverdance","roost"]},"vespiquen":{"level":88,"moves":["infestation","protect","roost","toxic","uturn"],"doublesMoves":["attackorder","healorder","protect","stringshot","strugglebug","tailwind"]},"pachirisu":{"level":88,"moves":["nuzzle","superfang","thunderbolt","toxic","uturn"],"doublesMoves":["followme","helpinghand","nuzzle","protect","superfang","thunderbolt","uturn"]},"floatzel":{"level":88,"moves":["aquajet","brickbreak","bulkup","icepunch","substitute","taunt","waterfall"],"doublesMoves":["aquajet","crunch","icepunch","protect","raindance","switcheroo","taunt","waterfall"]},"cherrim":{"level":88,"moves":["dazzlinggleam","energyball","healingwish","hiddenpowerfire","hiddenpowerice","synthesis"],"doublesMoves":["gigadrain","protect","solarbeam","sunnyday","weatherball"]},"cherrimsunshine":{"doublesMoves":["gigadrain","protect","solarbeam","sunnyday","weatherball"]},"gastrodon":{"level":86,"moves":["clearsmog","earthquake","icebeam","recover","scald","toxic"],"doublesMoves":["earthpower","icebeam","icywind","muddywater","protect","recover","scald"]},"ambipom":{"level":84,"moves":["fakeout","knockoff","lowkick","return","seedbomb","switcheroo","uturn"],"doublesMoves":["doublehit","fakeout","icepunch","knockoff","lowkick","protect","return","uturn"]},"drifblim":{"level":88,"moves":["acrobatics","destinybond","hex","shadowball","substitute","willowisp"],"doublesMoves":["destinybond","hiddenpowerfighting","hypnosis","protect","shadowball","substitute","thunderbolt","willowisp"]},"lopunny":{"level":88,"moves":["healingwish","highjumpkick","icepunch","return","switcheroo"],"doublesMoves":["encore","fakeout","firepunch","highjumpkick","icepunch","protect","return","switcheroo"]},"lopunnymega":{"level":80,"moves":["fakeout","highjumpkick","icepunch","return","substitute"],"doublesMoves":["encore","fakeout","highjumpkick","icepunch","protect","return"]},"mismagius":{"level":86,"moves":["dazzlinggleam","destinybond","nastyplot","painsplit","shadowball","substitute","taunt","thunderbolt","willowisp"],"doublesMoves":["dazzlinggleam","nastyplot","protect","shadowball","substitute","taunt","thunderbolt","willowisp"]},"honchkrow":{"level":84,"moves":["bravebird","heatwave","pursuit","roost","suckerpunch","superpower"],"doublesMoves":["bravebird","heatwave","protect","roost","substitute","suckerpunch","superpower"]},"purugly":{"level":88,"moves":["fakeout","knockoff","quickattack","return","suckerpunch","uturn"],"doublesMoves":["fakeout","knockoff","protect","quickattack","return","suckerpunch","uturn"]},"skuntank":{"level":86,"moves":["crunch","defog","fireblast","poisonjab","pursuit","suckerpunch","taunt"],"doublesMoves":["crunch","fireblast","playrough","poisonjab","protect","snarl","suckerpunch","taunt"]},"bronzong":{"level":84,"moves":["earthquake","explosion","ironhead","lightscreen","reflect","stealthrock","toxic"],"doublesMoves":["earthquake","explosion","gyroball","lightscreen","protect","reflect","trickroom"]},"chatot":{"level":88,"moves":["boomburst","chatter","heatwave","hiddenpowerground","nastyplot","substitute","uturn"],"doublesMoves":["boomburst","chatter","encore","heatwave","hypervoice","nastyplot","protect","substitute","uturn"]},"spiritomb":{"level":84,"moves":["calmmind","darkpulse","psychic","pursuit","rest","shadowsneak","sleeptalk","willowisp"],"doublesMoves":["darkpulse","foulplay","icywind","painsplit","protect","shadowsneak","snarl","willowisp"]},"garchomp":{"level":80,"moves":["dragonclaw","earthquake","fireblast","firefang","outrage","stealthrock","stoneedge","swordsdance"],"doublesMoves":["dragonclaw","earthquake","protect","rockslide","stoneedge","substitute","swordsdance"]},"garchompmega":{"level":80,"moves":["dracometeor","earthquake","fireblast","outrage","stoneedge","swordsdance"],"doublesMoves":["dragonclaw","earthquake","fireblast","protect","rockslide","stoneedge","substitute","swordsdance"]},"lucario":{"level":82,"moves":["aurasphere","closecombat","crunch","darkpulse","extremespeed","flashcannon","icepunch","nastyplot","swordsdance","vacuumwave"],"doublesMoves":["aurasphere","bulletpunch","closecombat","crunch","darkpulse","extremespeed","flashcannon","followme","icepunch","protect","vacuumwave"]},"lucariomega":{"level":76,"moves":["aurasphere","bulletpunch","closecombat","crunch","darkpulse","flashcannon","icepunch","nastyplot","swordsdance"],"doublesMoves":["aurasphere","bulletpunch","closecombat","crunch","darkpulse","extremespeed","flashcannon","followme","icepunch","protect","vacuumwave"]},"hippowdon":{"level":80,"moves":["earthquake","slackoff","stealthrock","stoneedge","toxic","whirlwind"],"doublesMoves":["earthquake","protect","rockslide","slackoff","stealthrock","stoneedge"]},"drapion":{"level":84,"moves":["earthquake","knockoff","poisonjab","pursuit","swordsdance","taunt","toxicspikes","whirlwind"],"doublesMoves":["aquatail","earthquake","knockoff","poisonjab","protect","snarl","swordsdance","taunt"]},"toxicroak":{"level":82,"moves":["drainpunch","gunkshot","icepunch","substitute","suckerpunch","swordsdance"],"doublesMoves":["drainpunch","fakeout","gunkshot","icepunch","knockoff","protect","substitute","suckerpunch","swordsdance"]},"carnivine":{"level":88,"moves":["knockoff","powerwhip","return","sleeppowder","substitute","swordsdance"],"doublesMoves":["knockoff","leechseed","powerwhip","protect","ragepowder","return","sleeppowder","substitute","swordsdance"]},"lumineon":{"level":88,"moves":["defog","icebeam","scald","toxic","uturn"],"doublesMoves":["icebeam","protect","raindance","surf","tailwind","toxic","uturn"]},"abomasnow":{"level":86,"moves":["blizzard","earthquake","focuspunch","gigadrain","iceshard","leechseed","substitute","woodhammer"],"doublesMoves":["blizzard","earthquake","focusblast","gigadrain","iceshard","protect","woodhammer"]},"abomasnowmega":{"level":84,"moves":["blizzard","earthquake","gigadrain","hiddenpowerfire","iceshard","woodhammer"],"doublesMoves":["blizzard","earthquake","focusblast","gigadrain","iceshard","protect","woodhammer"]},"weavile":{"level":80,"moves":["iceshard","iciclecrash","knockoff","lowkick","pursuit","swordsdance"],"doublesMoves":["fakeout","feint","iceshard","iciclecrash","knockoff","lowkick","protect","swordsdance","taunt"]},"magnezone":{"level":80,"moves":["flashcannon","hiddenpowerfire","substitute","thunderbolt","voltswitch"],"doublesMoves":["discharge","electroweb","flashcannon","hiddenpowerfire","hiddenpowerice","protect","substitute","thunderbolt","voltswitch"]},"lickilicky":{"level":88,"moves":["bodyslam","dragontail","earthquake","explosion","healbell","knockoff","powerwhip","protect","swordsdance","wish"],"doublesMoves":["bodyslam","dragontail","earthquake","explosion","healbell","knockoff","powerwhip","protect","rockslide","toxic","wish"]},"rhyperior":{"level":84,"moves":["dragontail","earthquake","icepunch","megahorn","rockpolish","stoneedge"],"doublesMoves":["earthquake","hammerarm","megahorn","protect","rockslide","stealthrock","stoneedge"]},"tangrowth":{"level":80,"moves":["earthquake","gigadrain","hiddenpowerfire","knockoff","leafstorm","rockslide","sleeppowder","synthesis"],"doublesMoves":["earthquake","focusblast","gigadrain","hiddenpowerice","knockoff","leechseed","powerwhip","protect","ragepowder","sleeppowder"]},"electivire":{"level":86,"moves":["crosschop","earthquake","flamethrower","icepunch","voltswitch","wildcharge"],"doublesMoves":["crosschop","earthquake","flamethrower","followme","icepunch","protect","substitute","wildcharge"]},"magmortar":{"level":86,"moves":["earthquake","fireblast","focusblast","hiddenpowergrass","hiddenpowerice","substitute","thunderbolt"],"doublesMoves":["fireblast","focusblast","followme","heatwave","hiddenpowergrass","hiddenpowerice","protect","taunt","thunderbolt","willowisp"]},"togekiss":{"level":82,"moves":["airslash","aurasphere","defog","healbell","nastyplot","roost","thunderwave"],"doublesMoves":["airslash","dazzlinggleam","followme","nastyplot","protect","roost","tailwind","thunderwave"]},"yanmega":{"level":84,"moves":["airslash","bugbuzz","gigadrain","protect","uturn"]},"leafeon":{"level":88,"moves":["healbell","knockoff","leafblade","swordsdance","synthesis","xscissor"],"doublesMoves":["helpinghand","knockoff","leafblade","protect","substitute","swordsdance","xscissor"]},"glaceon":{"level":88,"moves":["healbell","hiddenpowerground","icebeam","protect","shadowball","toxic","wish"],"doublesMoves":["healbell","helpinghand","hiddenpowerground","icebeam","protect","shadowball","wish"]},"gliscor":{"level":80,"moves":["earthquake","knockoff","protect","roost","stealthrock","taunt","toxic","uturn"],"doublesMoves":["earthquake","knockoff","protect","stoneedge","substitute","tailwind","taunt"]},"mamoswine":{"level":82,"moves":["earthquake","iceshard","iciclecrash","knockoff","stealthrock","superpower"],"doublesMoves":["earthquake","iceshard","iciclecrash","knockoff","protect","rockslide","superpower"]},"porygonz":{"level":82,"moves":["agility","darkpulse","icebeam","nastyplot","thunderbolt","triattack","trick"],"doublesMoves":["agility","darkpulse","hiddenpowerfighting","nastyplot","protect","triattack","trick"]},"gallade":{"level":84,"moves":["closecombat","icepunch","knockoff","shadowsneak","swordsdance","trick","zenheadbutt"],"doublesMoves":["closecombat","drainpunch","helpinghand","icepunch","knockoff","protect","shadowsneak","stoneedge","trick","trickroom","zenheadbutt"]},"gallademega":{"level":82,"moves":["closecombat","drainpunch","knockoff","substitute","swordsdance","zenheadbutt"],"doublesMoves":["closecombat","drainpunch","icepunch","knockoff","protect","stoneedge","swordsdance","zenheadbutt"]},"probopass":{"level":88,"moves":["earthpower","flashcannon","stealthrock","thunderwave","toxic","voltswitch"],"doublesMoves":["earthpower","helpinghand","powergem","protect","stealthrock","thunderwave","voltswitch","wideguard"]},"dusknoir":{"level":88,"moves":["earthquake","icepunch","painsplit","shadowsneak","substitute","willowisp"],"doublesMoves":["earthquake","helpinghand","icepunch","painsplit","protect","shadowsneak","trickroom","willowisp"]},"froslass":{"level":84,"moves":["destinybond","icebeam","shadowball","spikes","taunt","thunderwave"],"doublesMoves":["destinybond","icebeam","protect","shadowball","taunt","thunderwave"]},"rotom":{"level":86,"moves":["hiddenpowerice","painsplit","shadowball","substitute","thunderbolt","trick","voltswitch","willowisp"],"doublesMoves":["electroweb","hiddenpowerice","painsplit","protect","shadowball","substitute","thunderbolt","trick","voltswitch","willowisp"]},"rotomheat":{"level":82,"moves":["hiddenpowerice","overheat","painsplit","thunderbolt","voltswitch","willowisp"],"doublesMoves":["electroweb","hiddenpowerice","overheat","painsplit","protect","substitute","thunderbolt","voltswitch","willowisp"]},"rotomwash":{"level":80,"moves":["hydropump","painsplit","thunderbolt","trick","voltswitch","willowisp"],"doublesMoves":["electroweb","hiddenpowergrass","hiddenpowerice","hydropump","painsplit","protect","substitute","thunderbolt","trick","voltswitch","willowisp"]},"rotomfrost":{"level":88,"moves":["blizzard","painsplit","thunderbolt","trick","voltswitch","willowisp"],"doublesMoves":["blizzard","electroweb","painsplit","protect","substitute","thunderbolt","trick","voltswitch","willowisp"]},"rotomfan":{"level":88,"moves":["airslash","painsplit","thunderbolt","voltswitch","willowisp"],"doublesMoves":["airslash","discharge","electroweb","hiddenpowerice","painsplit","protect","substitute","thunderbolt","voltswitch","willowisp"]},"rotommow":{"level":84,"moves":["hiddenpowerfire","hiddenpowerice","leafstorm","thunderbolt","trick","voltswitch"],"doublesMoves":["electroweb","hiddenpowerfire","leafstorm","painsplit","protect","substitute","thunderbolt","trick","voltswitch","willowisp"]},"uxie":{"level":84,"moves":["healbell","knockoff","psychic","stealthrock","thunderwave","uturn","yawn"],"doublesMoves":["healbell","helpinghand","protect","psyshock","skillswap","stealthrock","thunderbolt","thunderwave","uturn","yawn"]},"mesprit":{"level":86,"moves":["calmmind","energyball","healingwish","hiddenpowerfire","icebeam","psychic","psyshock","signalbeam","stealthrock","uturn"],"doublesMoves":["calmmind","helpinghand","icebeam","knockoff","protect","psychic","substitute","thunderbolt","trick","uturn"]},"azelf":{"level":80,"moves":["dazzlinggleam","explosion","fireblast","knockoff","nastyplot","psyshock","stealthrock","taunt"],"doublesMoves":["dazzlinggleam","fireblast","icepunch","knockoff","nastyplot","protect","psychic","taunt","thunderbolt","uturn","zenheadbutt"]},"dialga":{"level":76,"moves":["dracometeor","fireblast","flashcannon","roar","stealthrock","thunderbolt","toxic"],"doublesMoves":["aurasphere","dracometeor","dragonpulse","earthpower","fireblast","flashcannon","protect","thunderbolt"]},"palkia":{"level":76,"moves":["dracometeor","dragontail","fireblast","hydropump","spacialrend","thunderwave"],"doublesMoves":["dracometeor","fireblast","hydropump","protect","spacialrend","surf","thunderbolt"]},"heatran":{"level":80,"moves":["earthpower","fireblast","flashcannon","lavaplume","protect","roar","stealthrock","toxic"],"doublesMoves":["earthpower","eruption","heatwave","protect","substitute","willowisp"]},"regigigas":{"level":88,"moves":["confuseray","drainpunch","knockoff","return","substitute","thunderwave"],"doublesMoves":["earthquake","icywind","knockoff","return","rockslide","substitute","thunderwave","wideguard"]},"giratinaorigin":{"level":76,"moves":["defog","dracometeor","dragontail","earthquake","shadowball","shadowsneak","toxic","willowisp"],"doublesMoves":["aurasphere","calmmind","dracometeor","dragonpulse","earthquake","hiddenpowerfire","protect","shadowball","shadowsneak","substitute","tailwind","willowisp"]},"giratina":{"level":76,"moves":["dragonpulse","dragontail","rest","roar","shadowball","sleeptalk","willowisp"],"doublesMoves":["calmmind","dragonpulse","dragontail","icywind","protect","shadowball","tailwind","willowisp"]},"cresselia":{"level":82,"moves":["calmmind","icebeam","moonblast","moonlight","psychic","psyshock","substitute","thunderwave","toxic"],"doublesMoves":["helpinghand","icebeam","icywind","lightscreen","moonblast","moonlight","protect","psyshock","reflect","skillswap","thunderwave","trickroom"]},"phione":{"level":88,"moves":["healbell","icebeam","knockoff","scald","toxic","uturn"],"doublesMoves":["helpinghand","icebeam","icywind","protect","raindance","rest","scald","uturn"]},"manaphy":{"level":80,"moves":["energyball","icebeam","surf","tailglow"],"doublesMoves":["energyball","helpinghand","icebeam","icywind","protect","scald","surf","tailglow"]},"darkrai":{"level":76,"moves":["darkpulse","darkvoid","focusblast","nastyplot","sludgebomb","substitute"],"doublesMoves":["darkpulse","focusblast","nastyplot","protect","snarl","substitute"]},"shaymin":{"level":84,"moves":["airslash","earthpower","leechseed","psychic","rest","seedflare","substitute"],"doublesMoves":["airslash","earthpower","hiddenpowerfire","leechseed","protect","rest","seedflare","substitute","tailwind"]},"shayminsky":{"level":76,"moves":["airslash","earthpower","hiddenpowerice","leechseed","seedflare","substitute"],"doublesMoves":["airslash","earthpower","hiddenpowerice","leechseed","protect","rest","seedflare","substitute","tailwind"]},"arceus":{"level":76,"moves":["earthquake","extremespeed","recover","shadowclaw","swordsdance"],"doublesMoves":["earthquake","extremespeed","protect","recover","shadowclaw","swordsdance"]},"arceusbug":{"level":76,"moves":["earthquake","ironhead","recover","stoneedge","swordsdance","xscissor"],"doublesMoves":["earthquake","ironhead","protect","recover","stoneedge","swordsdance","xscissor"]},"arceusdark":{"level":76,"moves":["calmmind","fireblast","judgment","recover","toxic"],"doublesMoves":["calmmind","focusblast","judgment","protect","recover","safeguard","snarl","willowisp"]},"arceusdragon":{"level":76,"moves":["defog","earthquake","extremespeed","fireblast","judgment","outrage","recover","swordsdance","willowisp"],"doublesMoves":["dragonclaw","earthquake","extremespeed","protect","recover","swordsdance"]},"arceuselectric":{"level":76,"moves":["calmmind","earthpower","icebeam","judgment","recover"],"doublesMoves":["calmmind","icebeam","judgment","protect","recover"]},"arceusfairy":{"level":76,"moves":["calmmind","defog","earthpower","judgment","recover","toxic","willowisp"],"doublesMoves":["calmmind","earthpower","judgment","protect","recover","thunderbolt","willowisp"]},"arceusfighting":{"level":76,"moves":["calmmind","icebeam","judgment","recover","shadowball","stoneedge"],"doublesMoves":["calmmind","icebeam","judgment","protect","recover","shadowball","willowisp"]},"arceusfire":{"level":76,"moves":["calmmind","fireblast","icebeam","recover","thunderbolt"],"doublesMoves":["calmmind","heatwave","judgment","protect","recover","thunderbolt","willowisp"]},"arceusflying":{"level":76,"moves":["calmmind","earthpower","fireblast","judgment","recover","toxic"],"doublesMoves":["calmmind","judgment","protect","recover","safeguard","substitute","tailwind"]},"arceusghost":{"level":76,"moves":["brickbreak","defog","extremespeed","judgment","recover","shadowclaw","shadowforce","swordsdance","toxic"],"doublesMoves":["brickbreak","calmmind","focusblast","judgment","protect","recover","shadowforce","swordsdance","willowisp"]},"arceusgrass":{"level":76,"moves":["calmmind","fireblast","icebeam","judgment","recover"],"doublesMoves":["calmmind","earthpower","icebeam","judgment","protect","recover","safeguard","thunderwave"]},"arceusground":{"level":76,"moves":["earthquake","icebeam","recover","stealthrock","stoneedge","swordsdance","toxic"],"doublesMoves":["calmmind","earthquake","icebeam","judgment","protect","recover","rockslide","stoneedge","swordsdance"]},"arceusice":{"level":76,"moves":["calmmind","fireblast","judgment","recover","thunderbolt"],"doublesMoves":["calmmind","focusblast","icywind","judgment","protect","recover","thunderbolt"]},"arceuspoison":{"level":76,"moves":["calmmind","defog","fireblast","icebeam","recover","sludgebomb"],"doublesMoves":["calmmind","earthpower","heatwave","judgment","protect","recover","sludgebomb","willowisp"]},"arceuspsychic":{"level":76,"moves":["calmmind","fireblast","icebeam","judgment","recover","toxic"],"doublesMoves":["calmmind","focusblast","judgment","protect","psyshock","recover","willowisp"]},"arceusrock":{"level":76,"moves":["earthquake","judgment","recover","stealthrock","stoneedge","swordsdance","willowisp"],"doublesMoves":["earthquake","protect","recover","rockslide","stoneedge","swordsdance"]},"arceussteel":{"level":76,"moves":["defog","earthquake","ironhead","judgment","recover","roar","stoneedge","swordsdance","willowisp"],"doublesMoves":["calmmind","judgment","protect","recover","willowisp"]},"arceuswater":{"level":76,"moves":["calmmind","defog","icebeam","judgment","recover","toxic"],"doublesMoves":["calmmind","fireblast","icebeam","icywind","judgment","protect","recover","surf"]},"victini":{"level":82,"moves":["blueflare","boltstrike","energyball","glaciate","uturn","vcreate","zenheadbutt"],"doublesMoves":["blueflare","boltstrike","focusblast","protect","psychic","uturn","vcreate"]},"serperior":{"level":80,"moves":["dragonpulse","glare","hiddenpowerfire","leafstorm","leechseed","substitute"],"doublesMoves":["dragonpulse","hiddenpowerfire","leafstorm","protect","substitute","taunt"]},"emboar":{"level":84,"moves":["fireblast","flareblitz","grassknot","headsmash","suckerpunch","superpower","wildcharge"],"doublesMoves":["flamecharge","flareblitz","headsmash","heatwave","protect","rockslide","superpower","wildcharge"]},"samurott":{"level":86,"moves":["aquajet","grassknot","hydropump","icebeam","megahorn","superpower","swordsdance","waterfall"],"doublesMoves":["aquajet","helpinghand","hiddenpowergrass","hydropump","icebeam","protect","scald","taunt"]},"watchog":{"level":88,"moves":["hypnosis","knockoff","return","substitute","superfang","swordsdance"],"doublesMoves":["hypnosis","knockoff","protect","return","substitute","superfang","swordsdance"]},"stoutland":{"level":88,"moves":["crunch","icefang","return","superpower","wildcharge"],"doublesMoves":["crunch","icefang","protect","return","superpower","wildcharge"]},"liepard":{"level":86,"moves":["copycat","encore","knockoff","playrough","substitute","thunderwave","uturn"],"doublesMoves":["encore","fakeout","knockoff","playrough","protect","substitute","suckerpunch","thunderwave","uturn"]},"simisage":{"level":88,"moves":["focusblast","gigadrain","hiddenpowerice","knockoff","leafstorm","nastyplot","substitute","superpower"],"doublesMoves":["focusblast","gigadrain","helpinghand","hiddenpowerfire","hiddenpowerice","leafstorm","nastyplot","protect","substitute","synthesis","taunt"]},"simisear":{"level":88,"moves":["fireblast","focusblast","grassknot","hiddenpowerrock","nastyplot","substitute"],"doublesMoves":["fireblast","focusblast","grassknot","heatwave","hiddenpowerground","nastyplot","protect","substitute","taunt"]},"simipour":{"level":88,"moves":["focusblast","hydropump","icebeam","nastyplot","substitute"],"doublesMoves":["helpinghand","hydropump","icebeam","nastyplot","protect","substitute","surf","taunt"]},"musharna":{"level":88,"moves":["calmmind","healbell","moonlight","psychic","psyshock","signalbeam","thunderwave"],"doublesMoves":["healbell","helpinghand","hiddenpowerfighting","moonlight","protect","psychic","psyshock","signalbeam","thunderwave","trickroom"]},"unfezant":{"level":88,"moves":["hypnosis","nightslash","pluck","return","roost","tailwind","uturn"],"doublesMoves":["nightslash","pluck","protect","return","roost","tailwind","taunt","uturn"]},"zebstrika":{"level":88,"moves":["hiddenpowergrass","hiddenpowerice","overheat","thunderbolt","voltswitch","wildcharge"],"doublesMoves":["hiddenpowergrass","overheat","protect","voltswitch","wildcharge"]},"gigalith":{"level":88,"moves":["earthquake","explosion","stealthrock","stoneedge","superpower"],"doublesMoves":["autotomize","earthquake","explosion","protect","rockslide","stealthrock","stoneedge","superpower","wideguard"]},"swoobat":{"level":88,"moves":["airslash","calmmind","heatwave","roost","storedpower"],"doublesMoves":["airslash","calmmind","gigadrain","heatwave","protect","psychic","tailwind"]},"excadrill":{"level":80,"moves":["earthquake","ironhead","rapidspin","rockslide","swordsdance"],"doublesMoves":["drillrun","earthquake","ironhead","protect","rockslide","substitute","swordsdance"]},"audinomega":{"level":86,"moves":["calmmind","dazzlinggleam","fireblast","healbell","protect","wish"],"doublesMoves":["dazzlinggleam","healbell","healpulse","helpinghand","hypervoice","protect","thunderwave","trickroom"]},"audino":{"level":88,"moves":["doubleedge","encore","healbell","knockoff","protect","toxic","wish"],"doublesMoves":["doubleedge","healbell","healpulse","helpinghand","lightscreen","protect","reflect","thunderwave","trickroom"]},"conkeldurr":{"level":82,"moves":["bulkup","drainpunch","facade","icepunch","knockoff","machpunch"],"doublesMoves":["drainpunch","icepunch","knockoff","machpunch","protect","wideguard"]},"seismitoad":{"level":84,"moves":["earthquake","hydropump","knockoff","raindance","scald","sludgebomb","stealthrock","toxic"],"doublesMoves":["earthquake","hiddenpowerelectric","hydropump","icywind","muddywater","protect","sludgebomb"]},"throh":{"level":88,"moves":["bulkup","circlethrow","icepunch","knockoff","rest","sleeptalk","stormthrow"],"doublesMoves":["circlethrow","helpinghand","icepunch","knockoff","protect","stormthrow","wideguard"]},"sawk":{"level":84,"moves":["bulkup","closecombat","earthquake","icepunch","knockoff","poisonjab"],"doublesMoves":["closecombat","icepunch","knockoff","protect","rockslide"]},"leavanny":{"level":88,"moves":["knockoff","leafblade","stickyweb","swordsdance","xscissor"],"doublesMoves":["leafblade","poisonjab","protect","stickyweb","swordsdance","xscissor"]},"scolipede":{"level":82,"moves":["earthquake","megahorn","poisonjab","protect","rockslide","spikes","swordsdance","toxicspikes"],"doublesMoves":["aquatail","megahorn","poisonjab","protect","rockslide","substitute","superpower","swordsdance"]},"whimsicott":{"level":82,"moves":["encore","energyball","leechseed","memento","moonblast","stunspore","tailwind","taunt","toxic","uturn"],"doublesMoves":["dazzlinggleam","encore","gigadrain","helpinghand","leechseed","moonblast","protect","stunspore","substitute","tailwind","taunt","uturn"]},"lilligant":{"level":86,"moves":["gigadrain","hiddenpowerfire","hiddenpowerrock","petaldance","quiverdance","sleeppowder"],"doublesMoves":["gigadrain","helpinghand","hiddenpowerfire","hiddenpowerice","hiddenpowerrock","petaldance","protect","quiverdance","sleeppowder"]},"basculin":{"level":88,"moves":["aquajet","crunch","superpower","waterfall","zenheadbutt"],"doublesMoves":["aquajet","crunch","doubleedge","protect","superpower","waterfall"]},"basculinbluestriped":{"level":88,"moves":["aquajet","crunch","superpower","waterfall","zenheadbutt"],"doublesMoves":["aquajet","crunch","doubleedge","protect","superpower","waterfall"]},"krookodile":{"level":82,"moves":["earthquake","knockoff","pursuit","stealthrock","stoneedge","superpower"],"doublesMoves":["earthquake","knockoff","protect","stoneedge","superpower"]},"darmanitan":{"level":82,"moves":["earthquake","flareblitz","rockslide","superpower","uturn"],"doublesMoves":["earthquake","firepunch","flareblitz","protect","rockslide","superpower","uturn"]},"maractus":{"level":88,"moves":["gigadrain","hiddenpowerfire","leechseed","spikes","spikyshield","suckerpunch","toxic"],"doublesMoves":["gigadrain","grassyterrain","helpinghand","hiddenpowerfire","leechseed","spikyshield","suckerpunch"]},"crustle":{"level":88,"moves":["earthquake","shellsmash","spikes","stealthrock","stoneedge","xscissor"],"doublesMoves":["earthquake","protect","rockslide","shellsmash","stoneedge","xscissor"]},"scrafty":{"level":84,"moves":["bulkup","dragondance","drainpunch","highjumpkick","icepunch","knockoff","rest"],"doublesMoves":["drainpunch","fakeout","icepunch","knockoff","protect","stoneedge"]},"sigilyph":{"level":84,"moves":["cosmicpower","psychoshift","roost","storedpower"],"doublesMoves":["airslash","energyball","heatwave","icebeam","protect","psyshock","shadowball","tailwind"]},"cofagrigus":{"level":84,"moves":["haze","hiddenpowerfighting","nastyplot","painsplit","shadowball","toxicspikes","trickroom","willowisp"],"doublesMoves":["hiddenpowerfighting","nastyplot","painsplit","protect","shadowball","trickroom","willowisp"]},"carracosta":{"level":88,"moves":["aquajet","earthquake","hydropump","shellsmash","stoneedge"],"doublesMoves":["aquajet","earthquake","protect","rockslide","shellsmash","stoneedge","waterfall","wideguard"]},"archeops":{"level":86,"moves":["acrobatics","aquatail","earthquake","endeavor","headsmash","stoneedge","uturn"],"doublesMoves":["acrobatics","earthquake","protect","rockslide","stoneedge","tailwind","taunt","uturn"]},"garbodor":{"level":86,"moves":["drainpunch","gunkshot","haze","painsplit","spikes","toxic","toxicspikes"],"doublesMoves":["drainpunch","explosion","gunkshot","painsplit","protect","rockblast","seedbomb"]},"zoroark":{"moves":["darkpulse","flamethrower","focusblast","nastyplot","sludgebomb","trick"],"doublesMoves":["darkpulse","flamethrower","focusblast","knockoff","nastyplot","protect","suckerpunch","uturn"]},"cinccino":{"level":84,"moves":["bulletseed","knockoff","rockblast","tailslap","uturn"],"doublesMoves":["aquatail","bulletseed","knockoff","protect","rockblast","tailslap","uturn"]},"gothitelle":{"level":82,"moves":["calmmind","hiddenpowerfighting","psychic","rest","sleeptalk","toxic"],"doublesMoves":["energyball","healpulse","hiddenpowerfighting","lightscreen","protect","psychic","psyshock","reflect","shadowball","taunt","thunderbolt","trickroom"]},"reuniclus":{"level":82,"moves":["calmmind","focusblast","psychic","psyshock","recover","shadowball","trickroom"],"doublesMoves":["energyball","focusblast","helpinghand","hiddenpowerfire","protect","psychic","psyshock","shadowball","trickroom"]},"swanna":{"level":88,"moves":["airslash","defog","hurricane","icebeam","raindance","roost","scald"],"doublesMoves":["airslash","hurricane","icebeam","protect","raindance","roost","scald","surf","tailwind"]},"vanilluxe":{"level":88,"moves":["autotomize","explosion","flashcannon","freezedry","hiddenpowerground","icebeam"],"doublesMoves":["autotomize","flashcannon","freezedry","hiddenpowerground","icebeam","protect","taunt"]},"sawsbuck":{"level":88,"moves":["hornleech","jumpkick","return","substitute","swordsdance"],"doublesMoves":["hornleech","jumpkick","protect","return","substitute","swordsdance","synthesis"]},"emolga":{"level":88,"moves":["acrobatics","encore","knockoff","roost","thunderbolt","toxic","uturn"],"doublesMoves":["airslash","encore","helpinghand","protect","roost","substitute","tailwind","thunderbolt"]},"escavalier":{"level":84,"moves":["drillrun","ironhead","knockoff","megahorn","pursuit","swordsdance"],"doublesMoves":["drillrun","ironhead","knockoff","megahorn","protect","swordsdance"]},"amoonguss":{"level":80,"moves":["foulplay","gigadrain","hiddenpowerfire","sludgebomb","spore","synthesis"],"doublesMoves":["gigadrain","hiddenpowerfire","protect","ragepowder","sludgebomb","spore","stunspore","synthesis"]},"jellicent":{"level":84,"moves":["icebeam","recover","scald","shadowball","taunt","toxic","willowisp"],"doublesMoves":["icebeam","icywind","protect","recover","scald","shadowball","trickroom","waterspout","willowisp"]},"alomomola":{"level":84,"moves":["knockoff","protect","scald","toxic","wish"],"doublesMoves":["helpinghand","icywind","knockoff","protect","scald","wideguard","wish"]},"galvantula":{"level":82,"moves":["bugbuzz","gigadrain","hiddenpowerice","stickyweb","thunder","voltswitch"],"doublesMoves":["bugbuzz","gigadrain","hiddenpowerice","protect","stickyweb","thunder","voltswitch"]},"ferrothorn":{"level":80,"moves":["gyroball","knockoff","leechseed","powerwhip","protect","spikes","stealthrock"],"doublesMoves":["gyroball","knockoff","leechseed","powerwhip","protect","stealthrock"]},"klinklang":{"level":86,"moves":["geargrind","return","shiftgear","substitute","wildcharge"],"doublesMoves":["geargrind","protect","return","shiftgear","wildcharge"]},"eelektross":{"level":84,"moves":["flamethrower","gigadrain","hiddenpowerice","knockoff","superpower","thunderbolt","uturn"],"doublesMoves":["flamethrower","gigadrain","knockoff","protect","thunderbolt","uturn","voltswitch"]},"beheeyem":{"level":88,"moves":["hiddenpowerfighting","nastyplot","psychic","psyshock","signalbeam","thunderbolt","trick","trickroom"],"doublesMoves":["hiddenpowerfighting","nastyplot","protect","psychic","recover","signalbeam","thunderbolt","trick","trickroom"]},"chandelure":{"level":82,"moves":["calmmind","energyball","fireblast","hiddenpowerground","painsplit","shadowball","substitute","trick"],"doublesMoves":["energyball","heatwave","hiddenpowerice","overheat","protect","shadowball","trick"]},"haxorus":{"level":82,"moves":["dragondance","earthquake","outrage","poisonjab","swordsdance"],"doublesMoves":["dragonclaw","dragondance","earthquake","poisonjab","protect","substitute","swordsdance"]},"beartic":{"level":88,"moves":["aquajet","iciclecrash","nightslash","stoneedge","superpower","swordsdance"],"doublesMoves":["aquajet","iciclecrash","nightslash","protect","stoneedge","superpower","swordsdance"]},"cryogonal":{"level":88,"moves":["freezedry","haze","hiddenpowerground","icebeam","rapidspin","recover","toxic"],"doublesMoves":["freezedry","hiddenpowerground","icebeam","icywind","protect","recover","reflect"]},"accelgor":{"level":84,"moves":["bugbuzz","encore","energyball","focusblast","hiddenpowerrock","spikes","yawn"],"doublesMoves":["bugbuzz","encore","focusblast","gigadrain","hiddenpowerrock","protect","sludgebomb","yawn"]},"stunfisk":{"level":88,"moves":["discharge","earthpower","foulplay","rest","sleeptalk","stealthrock","toxic"],"doublesMoves":["discharge","earthpower","electroweb","protect","scald","stealthrock"]},"mienshao":{"level":82,"moves":["fakeout","highjumpkick","knockoff","poisonjab","stoneedge","swordsdance","uturn"],"doublesMoves":["drainpunch","fakeout","feint","highjumpkick","knockoff","protect","stoneedge","swordsdance","uturn","wideguard"]},"druddigon":{"level":84,"moves":["dragontail","earthquake","firepunch","glare","gunkshot","outrage","stealthrock","suckerpunch","taunt"],"doublesMoves":["dragonclaw","earthquake","firepunch","glare","protect","suckerpunch","superpower","thunderpunch"]},"golurk":{"level":86,"moves":["dynamicpunch","earthquake","icepunch","rockpolish","shadowpunch","stealthrock","stoneedge"],"doublesMoves":["dynamicpunch","earthquake","icepunch","protect","rockpolish","shadowpunch","stoneedge"]},"bisharp":{"level":80,"moves":["ironhead","knockoff","lowkick","suckerpunch","swordsdance"],"doublesMoves":["brickbreak","ironhead","knockoff","protect","substitute","suckerpunch","swordsdance"]},"bouffalant":{"level":88,"moves":["earthquake","headcharge","megahorn","stoneedge","superpower","swordsdance"],"doublesMoves":["earthquake","headcharge","megahorn","protect","stoneedge","superpower","swordsdance"]},"braviary":{"level":84,"moves":["bravebird","bulkup","return","roost","substitute","superpower","uturn"],"doublesMoves":["bravebird","bulkup","protect","return","rockslide","roost","skydrop","superpower","tailwind","uturn"]},"mandibuzz":{"level":82,"moves":["bravebird","defog","foulplay","roost","taunt","toxic","uturn"],"doublesMoves":["bravebird","knockoff","protect","roost","snarl","tailwind","taunt","uturn"]},"heatmor":{"level":88,"moves":["fireblast","gigadrain","knockoff","suckerpunch","superpower"],"doublesMoves":["fireblast","focusblast","gigadrain","heatwave","protect","suckerpunch"]},"durant":{"level":84,"moves":["honeclaws","ironhead","rockslide","superpower","xscissor"],"doublesMoves":["honeclaws","ironhead","protect","rockslide","superpower","xscissor"]},"hydreigon":{"level":82,"moves":["darkpulse","dracometeor","fireblast","flashcannon","roost","superpower","uturn"],"doublesMoves":["darkpulse","dracometeor","dragonpulse","earthpower","fireblast","flashcannon","protect","roost","superpower","tailwind","uturn"]},"volcarona":{"level":82,"moves":["bugbuzz","fierydance","fireblast","gigadrain","hiddenpowerice","quiverdance","roost"],"doublesMoves":["bugbuzz","fierydance","fireblast","gigadrain","heatwave","hiddenpowerice","protect","quiverdance","ragepowder","roost","tailwind","willowisp"]},"cobalion":{"level":82,"moves":["closecombat","ironhead","stealthrock","stoneedge","substitute","swordsdance","taunt","voltswitch"],"doublesMoves":["closecombat","ironhead","protect","stoneedge","substitute","swordsdance","thunderwave"]},"terrakion":{"level":82,"moves":["closecombat","earthquake","quickattack","stoneedge","substitute","swordsdance"],"doublesMoves":["closecombat","earthquake","protect","rockslide","stoneedge","substitute"]},"virizion":{"level":84,"moves":["closecombat","leafblade","stoneedge","swordsdance"],"doublesMoves":["closecombat","leafblade","protect","stoneedge","swordsdance","synthesis","taunt"]},"tornadus":{"level":82,"moves":["acrobatics","bulkup","knockoff","rest","sleeptalk","superpower","tailwind"],"doublesMoves":["airslash","focusblast","heatwave","hurricane","protect","skydrop","substitute","superpower","tailwind","taunt","uturn"]},"tornadustherian":{"level":80,"moves":["heatwave","hurricane","knockoff","superpower","taunt","uturn"],"doublesMoves":["airslash","focusblast","heatwave","hurricane","protect","skydrop","tailwind","taunt","uturn"]},"thundurus":{"level":80,"moves":["focusblast","hiddenpowerflying","hiddenpowerice","knockoff","nastyplot","substitute","taunt","thunderbolt","thunderwave"],"doublesMoves":["focusblast","hiddenpowerflying","hiddenpowerice","knockoff","nastyplot","protect","substitute","taunt","thunderbolt","thunderwave"]},"thundurustherian":{"level":82,"moves":["focusblast","hiddenpowerflying","hiddenpowerice","nastyplot","thunderbolt","voltswitch"],"doublesMoves":["focusblast","hiddenpowerflying","hiddenpowerice","nastyplot","protect","thunderbolt","voltswitch"]},"reshiram":{"level":76,"moves":["blueflare","dracometeor","earthpower","roost","stoneedge","toxic"],"doublesMoves":["blueflare","dracometeor","dragonpulse","flamecharge","heatwave","protect","roost","tailwind"]},"zekrom":{"level":76,"moves":["boltstrike","dracometeor","dragonclaw","honeclaws","outrage","roost","substitute","voltswitch"],"doublesMoves":["boltstrike","dracometeor","dragonclaw","fusionbolt","honeclaws","protect","roost","substitute","tailwind","voltswitch"]},"landorus":{"level":76,"moves":["calmmind","earthpower","focusblast","knockoff","psychic","rockpolish","rockslide","sludgewave","stealthrock"],"doublesMoves":["earthpower","focusblast","hiddenpowerice","protect","psychic","rockslide","sludgebomb"]},"landorustherian":{"level":80,"moves":["earthquake","rockpolish","stealthrock","stoneedge","superpower","swordsdance","uturn"],"doublesMoves":["earthquake","knockoff","protect","rockslide","stoneedge","superpower","uturn"]},"kyurem":{"level":84,"moves":["dracometeor","earthpower","focusblast","icebeam","outrage","roost","substitute"],"doublesMoves":["dracometeor","dragonpulse","earthpower","focusblast","glaciate","icebeam","protect","roost","substitute"]},"kyuremblack":{"level":80,"moves":["dragonclaw","earthpower","fusionbolt","icebeam","outrage","roost","substitute"],"doublesMoves":["dragonclaw","earthpower","fusionbolt","honeclaws","icebeam","protect","roost","substitute"]},"kyuremwhite":{"level":76,"moves":["dracometeor","earthpower","focusblast","fusionflare","icebeam","roost","toxic"],"doublesMoves":["dracometeor","dragonpulse","earthpower","focusblast","fusionflare","icebeam","protect","roost"]},"keldeo":{"level":80,"moves":["calmmind","hiddenpowerelectric","hydropump","icywind","scald","secretsword","substitute"],"doublesMoves":["hiddenpowerelectric","hiddenpowerflying","hydropump","icywind","protect","secretsword","substitute","surf","taunt"]},"meloetta":{"level":84,"moves":["calmmind","focusblast","hypervoice","psyshock","shadowball","trick","uturn"],"doublesMoves":["calmmind","focusblast","hypervoice","protect","psyshock","shadowball","thunderbolt"]},"meloettapirouette":{"level":84,"moves":["closecombat","knockoff","relicsong","return"],"doublesMoves":["closecombat","knockoff","protect","relicsong","return"]},"genesect":{"level":76,"moves":["blazekick","extremespeed","flamethrower","icebeam","ironhead","shiftgear","technoblast","thunderbolt","uturn"],"doublesMoves":["blazekick","bugbuzz","extremespeed","flamethrower","icebeam","ironhead","protect","shiftgear","thunderbolt","uturn"]},"chesnaught":{"level":82,"moves":["drainpunch","leechseed","spikes","spikyshield","synthesis","woodhammer"],"doublesMoves":["hammerarm","leechseed","rockslide","spikyshield","stoneedge","synthesis","woodhammer"]},"delphox":{"level":84,"moves":["calmmind","fireblast","grassknot","psyshock","shadowball","switcheroo"],"doublesMoves":["calmmind","dazzlinggleam","fireblast","grassknot","heatwave","protect","psyshock","shadowball","switcheroo"]},"greninja":{"level":76,"moves":["gunkshot","hydropump","icebeam","spikes","taunt","toxicspikes","uturn"],"doublesMoves":["darkpulse","hydropump","icebeam","matblock","protect","surf","taunt","uturn"]},"diggersby":{"level":82,"moves":["agility","earthquake","knockoff","quickattack","return","swordsdance","uturn","wildcharge"],"doublesMoves":["earthquake","protect","quickattack","return","uturn","wildcharge"]},"talonflame":{"level":80,"moves":["bravebird","flareblitz","roost","swordsdance","tailwind","uturn","willowisp"],"doublesMoves":["bravebird","flareblitz","protect","roost","swordsdance","tailwind","taunt","uturn","willowisp"]},"vivillon":{"level":86,"moves":["energyball","hurricane","quiverdance","sleeppowder","substitute"],"doublesMoves":["bugbuzz","hurricane","protect","quiverdance","roost","sleeppowder"]},"pyroar":{"level":86,"moves":["darkpulse","fireblast","hypervoice","solarbeam","sunnyday","willowisp"],"doublesMoves":["fireblast","hypervoice","protect","solarbeam","sunnyday","willowisp"]},"floetteeternal":{"level":80,"moves":["hiddenpowerfire","hiddenpowerground","lightofruin","moonblast","psychic"],"doublesMoves":["aromatherapy","calmmind","dazzlinggleam","lightofruin","protect","psychic","wish"]},"florges":{"level":82,"moves":["aromatherapy","calmmind","moonblast","protect","synthesis","toxic","wish"],"doublesMoves":["aromatherapy","calmmind","dazzlinggleam","moonblast","protect","psychic","wish"]},"gogoat":{"level":88,"moves":["bulkup","earthquake","hornleech","leechseed","milkdrink","rockslide","substitute"],"doublesMoves":["brickbreak","bulkup","earthquake","hornleech","leechseed","milkdrink","protect","rockslide"]},"pangoro":{"level":84,"moves":["drainpunch","gunkshot","icepunch","knockoff","partingshot","superpower"],"doublesMoves":["circlethrow","crunch","earthquake","hammerarm","icepunch","partingshot","poisonjab","protect"]},"furfrou":{"level":88,"moves":["cottonguard","rest","return","substitute","suckerpunch","thunderwave","toxic","uturn"],"doublesMoves":["cottonguard","protect","return","snarl","suckerpunch","thunderwave","uturn","wildcharge"]},"meowstic":{"level":88,"moves":["healbell","lightscreen","psychic","reflect","thunderwave","toxic","yawn"],"doublesMoves":["fakeout","lightscreen","protect","psychic","reflect","safeguard","thunderwave"]},"meowsticf":{"level":88,"moves":["calmmind","energyball","psychic","psyshock","shadowball","thunderbolt"],"doublesMoves":["darkpulse","energyball","fakeout","helpinghand","protect","psyshock","signalbeam","thunderbolt"]},"doublade":{"level":82,"moves":["ironhead","sacredsword","shadowclaw","shadowsneak","swordsdance"],"doublesMoves":["ironhead","protect","rockslide","sacredsword","shadowclaw","shadowsneak","swordsdance"]},"aegislash":{"level":76,"moves":["flashcannon","hiddenpowerice","kingsshield","shadowball","shadowsneak"],"doublesMoves":["flashcannon","hiddenpowerice","kingsshield","shadowball","shadowsneak"]},"aegislashblade":{"level":76,"moves":["ironhead","sacredsword","shadowclaw","shadowsneak","swordsdance"],"doublesMoves":["ironhead","kingsshield","sacredsword","shadowclaw","shadowsneak","swordsdance"]},"aromatisse":{"level":84,"moves":["aromatherapy","moonblast","protect","toxic","wish"],"doublesMoves":["aromatherapy","healpulse","moonblast","protect","thunderbolt","trickroom","wish"]},"slurpuff":{"level":82,"moves":["bellydrum","drainpunch","playrough","return"],"doublesMoves":["bellydrum","dazzlinggleam","drainpunch","flamethrower","playrough","protect","psychic","return","surf"]},"malamar":{"level":86,"moves":["knockoff","psychocut","rest","sleeptalk","superpower"],"doublesMoves":["knockoff","protect","psychocut","rockslide","superpower","trickroom"]},"barbaracle":{"level":86,"moves":["crosschop","earthquake","razorshell","shellsmash","stealthrock","stoneedge"],"doublesMoves":["crosschop","earthquake","protect","razorshell","rockslide","shellsmash"]},"dragalge":{"level":84,"moves":["dracometeor","dragonpulse","focusblast","hiddenpowerfire","scald","sludgewave","toxicspikes"],"doublesMoves":["dracometeor","dragonpulse","focusblast","hiddenpowerfire","protect","scald","sludgebomb"]},"clawitzer":{"level":84,"moves":["aurasphere","darkpulse","icebeam","scald","uturn","waterpulse"],"doublesMoves":["aurasphere","darkpulse","helpinghand","icebeam","muddywater","protect","uturn","waterpulse"]},"heliolisk":{"level":82,"moves":["darkpulse","hiddenpowerice","hypervoice","raindance","surf","thunderbolt","voltswitch"],"doublesMoves":["darkpulse","hiddenpowerice","protect","raindance","surf","thunder","thunderbolt","voltswitch"]},"tyrantrum":{"level":84,"moves":["dragonclaw","dragondance","earthquake","headsmash","outrage","stealthrock","superpower"],"doublesMoves":["dragonclaw","dragondance","earthquake","firefang","headsmash","icefang","protect","rockslide"]},"aurorus":{"level":86,"moves":["ancientpower","blizzard","earthpower","freezedry","hypervoice","stealthrock","thunderwave"],"doublesMoves":["ancientpower","flashcannon","freezedry","hypervoice","icywind","protect","thunderwave"]},"sylveon":{"level":82,"moves":["calmmind","hiddenpowerfire","hypervoice","protect","psyshock","wish"],"doublesMoves":["calmmind","helpinghand","hiddenpowerground","hypervoice","protect","psyshock","shadowball","wish"]},"hawlucha":{"level":82,"moves":["acrobatics","highjumpkick","roost","stoneedge","substitute","swordsdance"],"doublesMoves":["encore","highjumpkick","protect","skydrop","stoneedge","swordsdance","uturn"]},"dedenne":{"level":88,"moves":["grassknot","hiddenpowerice","nuzzle","recycle","substitute","thunderbolt","toxic"],"doublesMoves":["grassknot","helpinghand","hiddenpowerice","nuzzle","protect","thunderbolt","uturn","voltswitch"]},"carbink":{"level":88,"moves":["explosion","lightscreen","moonblast","powergem","reflect","stealthrock"],"doublesMoves":["explosion","lightscreen","moonblast","powergem","protect","reflect","trickroom"]},"goodra":{"level":82,"moves":["dracometeor","dragontail","earthquake","fireblast","powerwhip","sludgebomb","thunderbolt"],"doublesMoves":["dracometeor","dragonpulse","fireblast","focusblast","icebeam","muddywater","protect","thunderbolt"]},"klefki":{"level":82,"moves":["foulplay","lightscreen","playrough","reflect","spikes","thunderwave","toxic"],"doublesMoves":["dazzlinggleam","flashcannon","lightscreen","playrough","protect","reflect","safeguard","substitute","thunderwave"]},"trevenant":{"level":88,"moves":["earthquake","hornleech","rest","rockslide","shadowclaw","trickroom","woodhammer"],"doublesMoves":["earthquake","hornleech","leechseed","protect","rockslide","shadowclaw","trickroom","willowisp","woodhammer"]},"gourgeistsmall":{"level":88,"moves":["leechseed","seedbomb","shadowsneak","substitute","synthesis","willowisp"],"doublesMoves":["explosion","leechseed","painsplit","phantomforce","protect","seedbomb","shadowsneak","willowisp"]},"gourgeistlarge":{"level":88,"moves":["leechseed","seedbomb","shadowsneak","substitute","synthesis","willowisp"],"doublesMoves":["explosion","leechseed","painsplit","phantomforce","protect","seedbomb","shadowsneak","trickroom","willowisp"]},"gourgeist":{"level":88,"moves":["leechseed","seedbomb","shadowsneak","substitute","synthesis","willowisp"],"doublesMoves":["explosion","leechseed","painsplit","phantomforce","protect","seedbomb","shadowsneak","willowisp"]},"gourgeistsuper":{"level":88,"moves":["leechseed","seedbomb","shadowsneak","substitute","synthesis","willowisp"],"doublesMoves":["explosion","leechseed","painsplit","phantomforce","protect","seedbomb","shadowsneak","trickroom","willowisp"]},"avalugg":{"level":88,"moves":["avalanche","earthquake","rapidspin","recover","roar","toxic"],"doublesMoves":["avalanche","earthquake","protect","recover"]},"noivern":{"level":84,"moves":["boomburst","dracometeor","flamethrower","hurricane","roost","switcheroo","taunt","uturn"],"doublesMoves":["airslash","boomburst","dracometeor","dragonpulse","flamethrower","focusblast","hurricane","protect","roost","switcheroo","tailwind","taunt","uturn"]},"xerneas":{"level":76,"moves":["focusblast","geomancy","hiddenpowerfire","moonblast","psyshock","thunderbolt"],"doublesMoves":["closecombat","dazzlinggleam","focusblast","geomancy","hiddenpowerfire","protect","psyshock","rockslide","thunder","thunderbolt"]},"yveltal":{"level":76,"moves":["darkpulse","foulplay","knockoff","oblivionwing","roost","suckerpunch","taunt","toxic","uturn"],"doublesMoves":["darkpulse","focusblast","hurricane","oblivionwing","protect","roost","skydrop","snarl","suckerpunch","taunt"]},"zygarde":{"level":82,"moves":["dragondance","earthquake","extremespeed","glare","outrage","stoneedge"],"doublesMoves":["coil","dragondance","extremespeed","glare","landswrath","protect","rockslide","stoneedge"]},"diancie":{"level":84,"moves":["diamondstorm","earthpower","hiddenpowerfire","lightscreen","moonblast","reflect","stealthrock"],"doublesMoves":["calmmind","dazzlinggleam","diamondstorm","lightscreen","moonblast","protect","psychic","reflect","safeguard","substitute"]},"dianciemega":{"level":80,"moves":["calmmind","diamondstorm","earthpower","hiddenpowerfire","moonblast","protect"],"doublesMoves":["calmmind","dazzlinggleam","diamondstorm","earthpower","hiddenpowerfire","moonblast","protect","psyshock"]},"hoopa":{"level":84,"moves":["focusblast","nastyplot","psyshock","shadowball","trick"],"doublesMoves":["focusblast","hyperspacehole","protect","psychic","shadowball","trickroom"]},"hoopaunbound":{"level":76,"moves":["darkpulse","drainpunch","focusblast","gunkshot","hyperspacefury","nastyplot","psychic","substitute","trick","zenheadbutt"],"doublesMoves":["darkpulse","drainpunch","focusblast","gunkshot","hyperspacefury","icepunch","protect","psychic","zenheadbutt"]},"volcanion":{"level":80,"moves":["earthpower","fireblast","hiddenpowerice","sludgewave","steameruption","substitute","superpower"],"doublesMoves":["earthquake","heatwave","protect","rockslide","sludgebomb","steameruption","substitute"]}} as any;
/* eslint-enable */

export class RandomGen6Teams extends RandomGen7Teams {
	randomData: {[species: string]: OldRandomBattleSpecies} = randomDataJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);
		this.noStab = [...this.noStab, 'aquajet', 'fakeout', 'iceshard', 'machpunch', 'quickattack', 'vacuumwave'];

		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter) => (['megahorn', 'pinmissile'].some(m => movePool.includes(m)) ||
				!counter.get('Bug') && abilities.has('Tinted Lens')),
			Dark: (movePool, moves, abilities, types, counter, species) => (
				(!counter.get('Dark') && !abilities.has('Protean'))
			),
			Dragon: (movePool, moves, abilities, types, counter) => (
				!counter.get('Dragon') &&
				!abilities.has('Aerilate') &&
				!abilities.has('Pixilate') &&
				!moves.has('rest') &&
				!moves.has('sleeptalk')
			),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fairy: (movePool, moves, abilities, types, counter) => (
				!counter.get('Fairy') && !abilities.has('Pixilate') && (!!counter.setupType || !counter.get('Status'))
			),
			Fighting: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Fighting') && (
					species.baseStats.atk >= 110 ||
					abilities.has('Justified') || abilities.has('Unburden') ||
					!!counter.setupType || !counter.get('Status')
				)
			),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire') ||
				['eruption', 'quiverdance'].some(m => movePool.includes(m)),
			Flying: (movePool, moves, abilities, types, counter) => (
				!counter.get('Flying') && (
					abilities.has('Gale Wings') ||
					abilities.has('Serene Grace') ||
					(types.has('Normal') && movePool.includes('bravebird'))
				)
			),
			Ghost: (movePool, moves, abilities, types, counter) => !types.has('Dark') && !counter.get('Ghost'),
			Grass: (movePool, moves, abilities, types, counter) => (
				!counter.get('Grass') && !types.has('Fairy') && !types.has('Poison') && !types.has('Steel')
			),
			Ground: (movePool, moves, abilities, types, counter) => (
				!counter.get('Ground') && !moves.has('rest') && !moves.has('sleeptalk')
			),
			Ice: (movePool, moves, abilities, types, counter) => !counter.get('Ice') && !abilities.has('Refrigerate'),
			Normal: movePool => movePool.includes('facade'),
			Poison: (movePool, moves, abilities, types, counter) => (
				!counter.get('Poison') &&
				(!!counter.setupType || abilities.has('Adaptability') || abilities.has('Sheer Force') || movePool.includes('gunkshot'))
			),
			Psychic: (movePool, moves, abilities, types, counter, species) => (
				!!counter.get('Psychic') &&
				!types.has('Flying') &&
				!abilities.has('Pixilate') &&
				counter.get('stab') < species.types.length
			),
			Rock: (movePool, moves, abilities, types, counter) => (
				!counter.get('Rock') &&
				!types.has('Fairy') &&
				(abilities.has('Rock Head') || counter.setupType === 'Physical')
			),
			Steel: (movePool, moves, abilities, types, counter) => (
				!counter.get('Steel') && (abilities.has('Technician') || movePool.includes('meteormash'))
			),
			Water: (movePool, moves, abilities, types, counter) => (
				(!counter.get('Water') || !counter.get('stab')) &&
				!abilities.has('Protean')
			),
			Adaptability: (movePool, moves, abilities, types, counter, species) => (
				!counter.setupType &&
				species.types.length > 1 &&
				(!counter.get(species.types[0]) || !counter.get(species.types[1]))
			),
			Aerilate: (movePool, moves, abilities, types, counter) => !counter.get('Normal'),
			Pixilate: (movePool, moves, abilities, types, counter) => !counter.get('Normal'),
			Refrigerate: (movePool, moves, abilities, types, counter) => !moves.has('blizzard') && !counter.get('Normal'),
			Contrary: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('contrary') && species.name !== 'Shuckle'
			),
			'Bad Dreams': movePool => movePool.includes('darkvoid'),
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
	): {cull: boolean, isSetup?: boolean} {
		const restTalk = moves.has('rest') && moves.has('sleeptalk');

		if (move.priority > 0 && counter.get('speedsetup')) return {cull: true};

		switch (move.id) {
		// Not very useful without their supporting moves
		case 'cottonguard': case 'defendorder':
			return {cull: !counter.get('recovery') && !moves.has('rest')};
		case 'focuspunch':
			return {cull: !moves.has('substitute') || counter.damagingMoves.size < 2};
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
			return {cull: !moves.has('lightscreen')};
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
			return {cull: counter.get('Physical') + counter.get('Special') < 3 || !!counter.get('priority')};

		// Set up once and only if we have the moves for it
		case 'bellydrum': case 'bulkup': case 'coil': case 'curse': case 'dragondance': case 'honeclaws': case 'swordsdance':
			return {cull: (
				(move.id === 'bellydrum' && !abilities.has('Unburden') && !counter.get('priority')) ||
				(counter.get('Physical') + counter.get('physicalpool') < 2 && (!moves.has('rest') || !moves.has('sleeptalk'))) || (
					(counter.setupType !== 'Physical' || counter.get('physicalsetup') > 1) &&
					(!moves.has('growth') || moves.has('sunnyday'))
				)
			), isSetup: true};
		case 'calmmind': case 'geomancy': case 'nastyplot': case 'tailglow':
			if (types.has('Dark') && moves.has('darkpulse')) {
				counter.setupType = 'Special';
				return {cull: false, isSetup: true};
			}
			return {cull: (
				counter.setupType !== 'Special' ||
				counter.get('specialsetup') > 1 ||
				(counter.get('Special') + counter.get('specialpool') < 2 && (!moves.has('rest') || !moves.has('sleeptalk')))
			), isSetup: true};
		case 'quiverdance':
			return {cull: false, isSetup: true};
		case 'growth': case 'shellsmash': case 'workup':
			return {cull: (
				counter.setupType !== 'Mixed' ||
				counter.get('mixedsetup') > 1 ||
				counter.damagingMoves.size + counter.get('physicalpool') + counter.get('specialpool') < 2 ||
				(move.id === 'growth' && !moves.has('sunnyday'))
			), isSetup: true};
		case 'agility': case 'autotomize': case 'rockpolish': case 'shiftgear':
			return {cull: counter.damagingMoves.size < 2 || restTalk, isSetup: !counter.setupType};
		case 'flamecharge':
			return {cull: (
				moves.has('dracometeor') ||
				moves.has('overheat') ||
				(counter.damagingMoves.size < 3 && !counter.setupType)
			)};

		// Bad after setup
		case 'circlethrow': case 'dragontail':
			return {cull: (
				(!!counter.setupType && ((!moves.has('rest') && !moves.has('sleeptalk')) || moves.has('stormthrow'))) ||
				(!!counter.get('speedsetup') || ['encore', 'raindance', 'roar', 'trickroom', 'whirlwind'].some(m => moves.has(m))) ||
				(counter.get(move.type) > 1 && counter.get('Status') > 1) ||
				(abilities.has('Sheer Force') && !!counter.get('sheerforce'))
			)};
		case 'defog':
			return {cull: (
				!!counter.setupType ||
				moves.has('spikes') || moves.has('stealthrock') ||
				restTalk ||
				!!teamDetails.defog
			)};
		case 'fakeout': case 'tailwind':
			return {cull: !!counter.setupType || ['substitute', 'switcheroo', 'trick'].some(m => moves.has(m))};
		case 'foulplay':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				counter.get('Dark') > 2 ||
				moves.has('clearsmog') ||
				restTalk ||
				(!!counter.get('priority') && counter.damagingMoves.size - 1 === counter.get('priority'))
			)};
		case 'haze': case 'spikes':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('trickroom')};
		case 'healbell': case 'technoblast':
			return {cull: !!counter.get('speedsetup')};
		case 'healingwish': case 'memento':
			return {cull: !!counter.setupType || !!counter.get('recovery') || moves.has('substitute')};
		case 'iceshard':
			return {cull: moves.has('shellsmash')};
		case 'leechseed': case 'roar': case 'whirlwind':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('dragontail')};
		case 'nightshade': case 'seismictoss':
			return {cull: (
				(!abilities.has("Parental Bond") && (counter.damagingMoves.size > 1 || !!counter.setupType)) ||
				moves.has('poweruppunch')
			)};
		case 'protect':
			const screens = moves.has('lightscreen') && moves.has('reflect');
			return {cull: (
				moves.has('rest') || screens || (!!counter.setupType && !moves.has('wish')) ||
				(!['Guts', 'Harvest', 'Poison Heal', 'Quick Feet', 'Speed Boost'].some(abil => abilities.has(abil)) &&
				!['leechseed', 'perishsong', 'toxic', 'wish'].some(m => moves.has(m)) &&
				!['sharpedomega', 'dianciemega'].includes(species.id))
			)};
		case 'pursuit':
			return {cull: (
				moves.has('nightslash') ||
				!!counter.setupType ||
				counter.get('Status') > 1 ||
				counter.get('Dark') > 2 ||
				(moves.has('knockoff') && !types.has('Dark'))
			)};
		case 'rapidspin':
			return {cull: !!counter.setupType || !!teamDetails.rapidSpin};
		case 'superfang':
			return {cull: !!counter.setupType};
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
				moves.has('lightscreen') || moves.has('reflect') ||
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				counter.damagingMoves.size < 2
			)};
		case 'uturn':
			return {cull: (
				!!counter.setupType || !!counter.get('speedsetup') ||
				(abilities.has('Speed Boost') && moves.has('protect')) ||
				(abilities.has('Protean') && counter.get('Status') > 2)
			)};
		case 'voltswitch':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('raindance') || moves.has('uturn')};
		case 'wish':
			return {cull: (
				species.baseStats.hp < 110 &&
				!abilities.has('Regenerator') &&
				!movePool.includes('protect') &&
				!['ironhead', 'protect', 'spikyshield', 'uturn'].some(m => moves.has(m))
			)};

		// Bit redundant to have both
		// Attacks:
		case 'bugbite': case 'bugbuzz': case 'signalbeam':
			return {cull: moves.has('uturn') && !counter.setupType && !abilities.has('Tinted Lens')};
		case 'darkpulse':
			return {cull: ['crunch', 'knockoff', 'hyperspacefury'].some(m => moves.has(m)) && counter.setupType !== 'Special'};
		case 'suckerpunch':
			return {cull: (
				counter.damagingMoves.size < 2 ||
				(counter.get('Dark') > 1 && !types.has('Dark')) ||
				moves.has('glare') ||
				restTalk
			)};
		case 'dragonclaw':
			return {cull: moves.has('dragontail') || moves.has('outrage')};
		case 'dracometeor':
			return {cull: moves.has('swordsdance') || counter.setupType === 'Physical' && counter.get('Dragon') > 1};
		case 'dragonpulse': case 'spacialrend':
			return {cull: moves.has('dracometeor') || moves.has('outrage') || (moves.has('dragontail') && !counter.setupType)};
		case 'outrage':
			return {cull: moves.has('dracometeor') && counter.damagingMoves.size < 3};
		case 'thunderbolt':
			return {cull: moves.has('discharge') || (moves.has('voltswitch') && moves.has('wildcharge'))};
		case 'dazzlinggleam':
			return {cull: moves.has('playrough') && counter.setupType !== 'Special'};
		case 'aurasphere': case 'focusblast':
			return {cull: restTalk || ((moves.has('closecombat') || moves.has('superpower')) && counter.setupType !== 'Special')};
		case 'drainpunch':
			return {cull: (
				(!moves.has('bulkup') && (moves.has('closecombat') || moves.has('highjumpkick'))) ||
				((moves.has('focusblast') || moves.has('superpower')) && counter.setupType !== 'Physical')
			)};
		case 'closecombat': case 'highjumpkick':
			return {cull: (
				(moves.has('bulkup') && moves.has('drainpunch')) || (
					counter.setupType === 'Special' &&
					(moves.has('aurasphere') || moves.has('focusblast') || movePool.includes('aurasphere'))
				)
			)};
		case 'machpunch':
			return {cull: types.has('Fighting') && counter.get('stab') < species.types.length && !abilities.has('Technician')};
		case 'stormthrow':
			return {cull: moves.has('circlethrow') && restTalk};
		case 'superpower':
			const isSetup = abilities.has('Contrary');
			return {cull: (counter.get('Fighting') > 1 && !!counter.setupType) || (restTalk && !isSetup), isSetup};
		case 'vacuumwave':
			return {cull: (moves.has('closecombat') || moves.has('machpunch')) && counter.setupType !== 'Special'};
		case 'fierydance': case 'firefang': case 'flamethrower':
			return {cull: (
				(move.id === 'flamethrower' && moves.has('drainpunch') && counter.setupType !== 'Special') ||
				moves.has('blazekick') ||
				moves.has('overheat') ||
				((moves.has('fireblast') || moves.has('lavaplume')) && counter.setupType !== 'Physical')
			)};
		case 'fireblast':
			return {cull: (
				(moves.has('flareblitz') && counter.setupType !== 'Special') ||
				(moves.has('lavaplume') && !counter.setupType && !counter.get('speedsetup'))
			)};
		case 'lavaplume':
			return {cull: moves.has('firepunch') || moves.has('fireblast') && (!!counter.setupType || !!counter.get('speedsetup'))};
		case 'airslash': case 'hurricane':
			return {cull: (
				[(move.id === 'hurricane' ? 'airslash' : 'hurricane'), 'acrobatics', 'bravebird'].some(m => moves.has(m))
			)};
		case 'shadowball':
			return {cull: moves.has('darkpulse') || (moves.has('hex') && moves.has('willowisp'))};
		case 'shadowclaw':
			return {cull: (
				moves.has('shadowforce') ||
				moves.has('shadowsneak') ||
				(moves.has('shadowball') && counter.setupType !== 'Physical')
			)};
		case 'shadowsneak':
			return {cull: restTalk || (types.has('Ghost') && species.types.length > 1 && counter.get('stab') < 2)};
		case 'hex':
			return {cull: moves.has('shadowball') && !moves.has('willowisp')};
		case 'gigadrain': case 'powerwhip':
			return {cull: (
				moves.has('seedbomb') ||
				moves.has('petaldance') ||
				(moves.has('sunnyday') && moves.has('solarbeam')) ||
				(counter.get('Special') < 4 && !counter.setupType && moves.has('leafstorm'))
			)};
		case 'leafblade': case 'woodhammer':
			return {cull: (
				(moves.has('hornleech') && counter.get('Physical') < 4) ||
				(moves.has('gigadrain') && counter.setupType !== 'Physical')
			)};
		case 'leafstorm':
			return {cull: counter.get('Grass') > 1 && !!counter.setupType};
		case 'solarbeam':
			return {cull: (
				(!abilities.has('Drought') && !moves.has('sunnyday')) ||
				moves.has('gigadrain') ||
				moves.has('leafstorm')
			)};
		case 'bonemerang': case 'earthpower': case 'precipiceblades':
			return {cull: moves.has('earthquake')};
		case 'earthquake':
			return {cull: moves.has('closecombat') && abilities.has('Aerilate')};
		case 'freezedry':
			return {cull: moves.has('icebeam') || moves.has('icywind') || counter.get('stab') < species.types.length};
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
				(abilities.has('Refrigerate') && (moves.has('freezedry') || movePool.includes('return'))) ||
				moves.has('wish')
			)};
		case 'extremespeed':
			return {cull: counter.setupType !== 'Physical' && moves.has('vacuumwave')};
		case 'hiddenpower':
			return {cull: (
				moves.has('rest') ||
				(!counter.get('stab') && counter.damagingMoves.size < 2) ||
				// Force Moonblast on Special-setup Fairies
				(counter.setupType === 'Special' && types.has('Fairy') && movePool.includes('moonblast'))
			)};
		case 'hypervoice':
			return {cull: moves.has('blizzard') || moves.has('return')};
		case 'judgment':
			return {cull: counter.setupType !== 'Special' && counter.get('stab') > 1};
		case 'quickattack':
			return {cull: (
				(types.has('Normal') && (!counter.get('stab') || counter.get('Normal') > 2)) ||
				(types.has('Rock') && !!counter.get('Status'))
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
			return {cull: moves.has('stoneedge')};
		case 'rockblast': case 'rockslide':
			return {cull: moves.has('headsmash') || moves.has('stoneedge')};
		case 'bulletpunch':
			return {cull: moves.has('substitute')};
		case 'hydropump':
			return {cull: (
				moves.has('razorshell') ||
				moves.has('waterfall') ||
				(moves.has('scald') && (counter.get('Special') < 4 || species.types.length > 1 && counter.get('stab') < 3)) ||
				restTalk
			)};
		case 'originpulse': case 'surf':
			return {cull: moves.has('hydropump') || moves.has('scald')};
		case 'scald':
			return {cull: (
				moves.has('waterfall') ||
				moves.has('waterpulse') ||
				(species.id === 'quagsire' && movePool.includes('recover'))
			)};

		// Status:
		case 'glare': case 'headbutt':
			return {cull: moves.has('bodyslam') || !moves.has('glare')};
		case 'stunspore': case 'thunderwave':
			const otherStatus = ['discharge', 'spore', 'toxic', 'trickroom', 'yawn'].some(m => moves.has(m));
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || restTalk || otherStatus};
		case 'toxic':
			return {cull: (
				!!counter.setupType ||
				['hypnosis', 'sleeppowder', 'toxicspikes', 'willowisp', 'yawn', 'raindance', 'flamecharge'].some(m => moves.has(m))
			)};
		case 'raindance':
			return {cull: (
				counter.get('Physical') + counter.get('Special') < 2 ||
				(!types.has('Water') && !counter.get('Water')) ||
				restTalk
			)};
		case 'sunnyday':
			const cull = (
				counter.get('Physical') + counter.get('Special') < 2 ||
				(!abilities.has('Chlorophyll') && !abilities.has('Flower Gift') && !moves.has('solarbeam')) ||
				restTalk
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
		case 'milkdrink': case 'moonlight': case 'painsplit': case 'recover': case 'roost': case 'synthesis':
			return {cull: (
				['leechseed', 'rest'].some(m => moves.has(m)) ||
				(moves.has('wish') && (moves.has('protect') || movePool.includes('protect')))
			)};
		case 'safeguard':
			return {cull: moves.has('destinybond')};
		case 'substitute':
			const moveBasedCull = ['copycat', 'dragondance', 'shiftgear'].some(m => movePool.includes(m));
			return {cull: (
				['dracometeor', 'pursuit', 'rest', 'taunt', 'uturn', 'voltswitch', 'whirlwind'].some(m => moves.has(m)) ||
				(moves.has('leafstorm') && !abilities.has('Contrary')) || moveBasedCull
			)};
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
		species: Species
	): boolean {
		switch (ability) {
		case 'Flare Boost': case 'Gluttony': case 'Moody': case 'Snow Cloak': case 'Steadfast':
			return true;
		case 'Contrary': case 'Iron Fist': case 'Skill Link': case 'Strong Jaw':
			return !counter.get(toID(ability));
		case 'Aerilate': case 'Pixilate': case 'Refrigerate':
			return !counter.get('Normal');
		case 'Analytic': case 'Download': case 'Hyper Cutter':
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
			return (!counter.get('Special') || moves.has('rest') && moves.has('sleeptalk'));
		case 'Compound Eyes': case 'No Guard':
			return !counter.get('inaccurate');
		case 'Defiant': case 'Moxie':
			return (!counter.get('Physical') || moves.has('dragontail'));
		case 'Flash Fire':
			return abilities.has('Drought');
		case 'Harvest':
			return abilities.has('Frisk');
		case 'Hustle':
			return counter.get('Physical') < 2;
		case 'Hydration': case 'Rain Dish': case 'Swift Swim':
			return (
				species.baseStats.spe > 100 || !moves.has('raindance') && !teamDetails.rain ||
				!moves.has('raindance') && ['Rock Head', 'Water Absorb'].some(abil => abilities.has(abil))
			);
		case 'Ice Body':
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
		case 'Magnet Pull':
			return (!types.has('Electric') && !moves.has('earthpower'));
		case 'Mold Breaker':
			return (
				moves.has('acrobatics') ||
				abilities.has('Adaptability') ||
				(abilities.has('Sheer Force') && !!counter.get('sheerforce'))
			);
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Poison Heal':
			return (abilities.has('Technician') && !!counter.get('technician'));
		case 'Prankster':
			return !counter.get('Status');
		case 'Pressure': case 'Synchronize':
			return (counter.get('Status') < 2 || !!counter.get('recoil') || !!species.isMega);
		case 'Reckless': case 'Rock Head':
			return (!counter.get('recoil') || !!species.isMega);
		case 'Regenerator':
			return abilities.has('Magic Guard');
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
		case 'Speed Boost':
			return moves.has('uturn');
		case 'Swarm':
			return (!counter.get('Bug') || !!species.isMega);
		case 'Sweet Veil':
			return types.has('Grass');
		case 'Technician':
			return (!counter.get('technician') || moves.has('tailslap') || !!species.isMega);
		case 'Tinted Lens':
			return (
				moves.has('protect') ||
				abilities.has('Prankster') ||
				counter.get('damage') >= counter.damagingMoves.size ||
				(counter.get('Status') > 2 && !counter.setupType)
			);
		case 'Torrent':
			return (!counter.get('Water') || !!species.isMega);
		case 'Unaware':
			return (!!counter.setupType || species.id === 'clefable' && moves.has('stealthrock'));
		case 'Unburden':
			return (!!species.isMega || abilities.has('Prankster') || !counter.setupType && !moves.has('acrobatics'));
		case 'Water Absorb':
			return (moves.has('raindance') || ['Drizzle', 'Unaware', 'Volt Absorb'].some(a => abilities.has(a)));
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
		isLead: boolean
	): string | undefined {
		if (species.requiredItem) return species.requiredItem;
		if (species.requiredItems) return this.sample(species.requiredItems);

		// First, the extra high-priority items
		if (species.name === 'Marowak') return 'Thick Club';
		if (species.name === 'Dedenne') return 'Petaya Berry';
		if (species.name === 'Deoxys-Attack') return (isLead && moves.has('stealthrock')) ? 'Focus Sash' : 'Life Orb';
		if (species.name === 'Farfetch\u2019d') return 'Stick';
		if (species.name === 'Genesect' && moves.has('technoblast')) return 'Douse Drive';
		if (species.baseSpecies === 'Pikachu') return 'Light Ball';
		if (species.name === 'Shedinja' || species.name === 'Smeargle') return 'Focus Sash';
		if (species.name === 'Unfezant' && counter.get('Physical') >= 2) return 'Scope Lens';
		if (species.name === 'Unown') return 'Choice Specs';
		if (species.name === 'Wobbuffet') return 'Custap Berry';
		if (ability === 'Harvest') return 'Sitrus Berry';
		if (ability === 'Imposter') return 'Choice Scarf';
		if (moves.has('switcheroo') || moves.has('trick')) {
			if (ability === 'Klutz') {
				return 'Assault Vest';
			} else if (species.baseStats.spe >= 60 && species.baseStats.spe <= 108) {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (species.nfe) return (ability === 'Technician' && counter.get('Physical') >= 4) ? 'Choice Band' : 'Eviolite';
		if (moves.has('copycat') && counter.get('Physical') >= 3) return 'Choice Band';
		if (moves.has('bellydrum')) return 'Sitrus Berry';
		if (
			moves.has('geomancy') ||
			(moves.has('solarbeam') && ability !== 'Drought' && !moves.has('sunnyday') && !teamDetails.sun)
		) {
			return 'Power Herb';
		}
		if (moves.has('shellsmash')) {
			return (ability === 'Solid Rock' && !!counter.get('priority')) ? 'Weakness Policy' : 'White Herb';
		}
		if ((ability === 'Guts' || moves.has('facade')) && !moves.has('sleeptalk')) {
			return moves.has('drainpunch') ? 'Flame Orb' : 'Toxic Orb';
		}
		if (
			(ability === 'Magic Guard' && counter.damagingMoves.size > 1) ||
			(ability === 'Sheer Force' && !!counter.get('sheerforce'))
		) {
			return 'Life Orb';
		}
		if (moves.has('psychoshift')) return 'Flame Orb';
		if (ability === 'Poison Heal') return 'Toxic Orb';
		if (ability === 'Unburden') {
			if (moves.has('fakeout')) {
				return 'Normal Gem';
			} else if (['dracometeor', 'leafstorm', 'overheat'].some(m => moves.has(m))) {
				return 'White Herb';
			} else if (moves.has('substitute') || counter.setupType) {
				return 'Sitrus Berry';
			} else {
				return 'Red Card';
			}
		}
		if (moves.has('acrobatics')) return ''; // not undefined - we want "no item"
		if (moves.has('raindance')) return (ability === 'Forecast') ? 'Damp Rock' : 'Life Orb';
		if (moves.has('sunnyday')) return (ability === 'Forecast') ? 'Heat Rock' : 'Life Orb';
		if (moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (moves.has('rest') && !moves.has('sleeptalk') && ability !== 'Natural Cure' && ability !== 'Shed Skin') {
			return 'Chesto Berry';
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
		const scarfReqs = species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && !counter.get('priority');

		if (
			(ability === 'Speed Boost' || ability === 'Stance Change') &&
			counter.get('Physical') + counter.get('Special') > 2
		) {
			return 'Life Orb';
		}
		if (
			counter.get('Physical') >= 4 &&
			['bodyslam', 'dragontail', 'fakeout', 'flamecharge', 'rapidspin', 'suckerpunch'].every(m => !moves.has(m))
		) {
			return (
				(species.baseStats.atk >= 100 || ability === 'Huge Power') &&
				scarfReqs &&
				this.randomChance(2, 3)
			) ? 'Choice Scarf' : 'Choice Band';
		}
		if (
			counter.get('Special') >= 4 &&
			!moves.has('acidspray') && !moves.has('clearsmog') && !moves.has('fierydance')
		) {
			return (
				species.baseStats.spa >= 100 &&
				scarfReqs &&
				this.randomChance(2, 3)
			) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (
			counter.get('Physical') >= 3 &&
			moves.has('defog') &&
			scarfReqs &&
			!moves.has('foulplay')
		) {
			return 'Choice Scarf';
		}

		if (counter.get('Special') >= 3 && moves.has('uturn') && !moves.has('acidspray')) return 'Choice Specs';
		if (
			ability === 'Slow Start' ||
			['bite', 'clearsmog', 'curse', 'protect', 'sleeptalk'].some(m => moves.has(m)) ||
			species.name.includes('Rotom-')
		) {
			return 'Leftovers';
		}

		if (['endeavor', 'flail', 'reversal'].some(m => moves.has(m)) && ability !== 'Sturdy') {
			return (ability === 'Defeatist') ? 'Expert Belt' : 'Focus Sash';
		}
		if (moves.has('outrage') && counter.setupType) return 'Lum Berry';
		if (moves.has('substitute')) return counter.damagingMoves.size > 2 && !!counter.get('drain') ? 'Life Orb' : 'Leftovers';
		if (this.dex.getEffectiveness('Ground', species) >= 2 && ability !== 'Levitate' && !moves.has('magnetrise')) {
			return 'Air Balloon';
		}
		if ((ability === 'Iron Barbs' || ability === 'Rough Skin') && this.randomChance(1, 2)) return 'Rocky Helmet';
		if (
			counter.get('Physical') + counter.get('Special') >= 4 &&
			species.baseStats.spd >= 50 &&
			defensiveStatTotal >= 235
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
		if (counter.damagingMoves.size >= 3 && counter.get('speedsetup') && defensiveStatTotal >= 300) return 'Weakness Policy';
		if (
			isLead &&
			ability !== 'Regenerator' && ability !== 'Sturdy' &&
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
		isLead: boolean
	): string | undefined {
		const defensiveStatTotal = species.baseStats.hp + species.baseStats.def + species.baseStats.spd;

		if (ability === 'Gale Wings' && moves.has('bravebird')) return 'Sharp Beak';
		if (moves.has('stickyweb') && ability === 'Sturdy') return 'Mental Herb';
		if (ability === 'Serene Grace' && moves.has('airslash') && species.baseStats.spe > 100) return 'Metronome';
		if (ability === 'Sturdy' && moves.has('explosion') && !counter.get('speedsetup')) return 'Custap Berry';
		if (ability === 'Super Luck') return 'Scope Lens';
		if (
			counter.damagingMoves.size >= 3 && ability !== 'Sturdy' &&
			(species.baseStats.spe >= 90 || !moves.has('voltswitch')) &&
			['acidspray', 'dragontail', 'foulplay', 'rapidspin', 'superfang', 'uturn'].every(m => !moves.has(m))
		) {
			return (
				counter.get('speedsetup') ||
				moves.has('trickroom') ||
				(species.baseStats.spe > 40 && defensiveStatTotal <= 275)
			) ? 'Life Orb' : 'Leftovers';
		}
	}

	randomSet(
		species: string | Species,
		teamDetails: RandomTeamsTypes.TeamDetails = {},
		isLead = false
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

		const movePool = (data?.moves || Object.keys(this.dex.species.getLearnset(species.id)!)).slice();
		const rejectedPool = [];
		let ability = '';

		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};

		const types = new Set(species.types);
		let abilities = new Set(Object.values(species.abilities));
		if (species.unreleasedHidden) abilities.delete(species.abilities.H);
		let availableHP = 0;
		for (const setMoveid of movePool) {
			if (setMoveid.startsWith('hiddenpower')) availableHP++;
		}

		// These moves can be used even if we aren't setting up to use them:
		const SetupException = ['closecombat', 'diamondstorm', 'extremespeed', 'suckerpunch', 'superpower'];

		const moves = new Set<string>();
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

			// Iterate through the moves again, this time to cull them:
			for (const moveid of moves) {
				const move = this.dex.moves.get(moveid);

				let {cull, isSetup} = this.shouldCullMove(
					move, types, moves, abilities, counter, movePool,
					teamDetails, species, isLead
				);

				// This move doesn't satisfy our setup requirements:
				if (
					(move.category === 'Physical' && counter.setupType === 'Special') ||
					(move.category === 'Special' && counter.setupType === 'Physical')
				) {
					// Reject STABs last in case the setup type changes later on
					const stabs = counter.get(species.types[0]) + counter.get(species.types[1]);
					if (
						!SetupException.includes(moveid) &&
						(!types.has(move.type) || stabs > 1 || counter.get(move.category) < 2)
					) cull = true;
				}
				if (
					counter.setupType && !isSetup && counter.setupType !== 'Mixed' && move.category !== counter.setupType &&
					counter.get(counter.setupType) < 2 && (move.category !== 'Status' || !move.flags.heal) &&
					moveid !== 'sleeptalk' && !types.has('Dark') && !moves.has('darkpulse') && (
						move.category !== 'Status' || (
							counter.get(counter.setupType) + counter.get('Status') > 3 &&
							counter.get('physicalsetup') + counter.get('specialsetup') < 2
						)
					)
				) {
					// Mono-attacking with setup and RestTalk is allowed
					// Reject Status moves only if there is nothing else to reject
					cull = true;
				}

				if (
					counter.setupType === 'Special' &&
					moveid === 'hiddenpower' &&
					species.types.length > 1 &&
					counter.get('Special') <= 2 &&
					!types.has(move.type) &&
					!counter.get('Physical') &&
					counter.get('specialpool')
				) {
					// Hidden Power isn't good enough
					cull = true;
				}

				const runEnforcementChecker = (checkerName: string) => {
					if (!this.moveEnforcementCheckers[checkerName]) return false;
					return this.moveEnforcementCheckers[checkerName](
						movePool, moves, abilities, types, counter, species as Species, teamDetails
					);
				};

				// Pokemon should have moves that benefit their Type/Ability/Weather, as well as moves required by its forme
				if (
					!cull && !isSetup && !move.weather && !move.stallingMove && !move.damage &&
					(move.category !== 'Status' || !move.flags.heal) &&
					!['judgment', 'sleeptalk', 'toxic', 'lightscreen', 'reflect'].includes(moveid) &&
					(counter.get('physicalsetup') + counter.get('specialsetup') < 2 && (
						!counter.setupType || counter.setupType === 'Mixed' ||
						(move.category !== counter.setupType && move.category !== 'Status') ||
						counter.get(counter.setupType) + counter.get('Status') > 3
					)) && (
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
							species.baseStats.spa >= species.baseStats.spd)
						) ||
						(!counter.get('recovery') && !counter.setupType &&
						['healingwish', 'switcheroo', 'trick', 'trickroom'].every(m => !moves.has(m)) &&
						(['recover', 'roost', 'slackoff', 'softboiled'].some(m => movePool.includes(m))) &&
						counter.get('Status')
						) ||
						movePool.includes('milkdrink') ||
						(movePool.includes('moonlight') && types.size < 2) ||
						(movePool.includes('stickyweb') && !counter.setupType && !teamDetails.stickyWeb) ||
						(species.requiredMove && movePool.includes(toID(species.requiredMove))) ||
						(moves.has('suckerpunch') && counter.get('stab') < species.types.length) ||
						(movePool.includes('quiverdance') && ['defog', 'uturn', 'stickyweb'].every(m => !moves.has(m)) &&
							counter.get('Special') < 4)
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

				// Remove cull moves from the move list
				if (cull && (
					movePool.length - availableHP ||
					(availableHP && (moveid.startsWith('hiddenpower') || !hasHiddenPower))
				)) {
					if (
						move.category !== 'Status' &&
						!move.damage && !move.flags.charge &&
						(!moveid.startsWith('hiddenpower') || !availableHP)
					) rejectedPool.push(moveid);
					moves.delete(moveid);
					if (moveid.startsWith('hiddenpower')) hasHiddenPower = false;
					break;
				}

				if (cull && rejectedPool.length) {
					moves.delete(moveid);
					if (moveid.startsWith('hiddenpower')) hasHiddenPower = false;
					break;
				}
			}
		} while (moves.size < this.maxMoveCount && (movePool.length || rejectedPool.length));

		if (hasHiddenPower) {
			let hpType;
			for (const move of moves) {
				if (move.startsWith('hiddenpower')) {
					hpType = move.substr(11);
					break;
				}
			}
			if (!hpType) throw new Error(`hasHiddenPower is true, but no Hidden Power move was found.`);
			const HPivs = this.dex.types.get(hpType).HPivs;
			let iv: StatID;
			for (iv in HPivs) {
				ivs[iv] = HPivs[iv]!;
			}
		}

		// Moveset modifications
		if (moves.has('autotomize') && moves.has('heavyslam')) {
			moves.delete('autotomize');
			moves.add('rockpolish');
		}
		if (moves.has('raindance') && moves.has('thunderbolt')) {
			moves.delete('thunderbolt');
			moves.add('thunder');
		}

		if (species.battleOnly && !species.requiredAbility) {
			abilities = new Set(Object.values(this.dex.species.get(species.battleOnly as string).abilities));
		}
		const abilityData = [...abilities].map(a => this.dex.abilities.get(a));
		Utils.sortBy(abilityData, abil => -abil.rating);

		if (abilityData.length > 1) {
			// Sort abilities by rating with an element of randomness
			if (abilityData[2] && abilityData[1].rating <= abilityData[2].rating && this.randomChance(1, 2)) {
				[abilityData[1], abilityData[2]] = [abilityData[2], abilityData[1]];
			}
			if (abilityData[0].rating <= abilityData[1].rating && this.randomChance(1, 2)) {
				[abilityData[0], abilityData[1]] = [abilityData[1], abilityData[0]];
			} else if (abilityData[0].rating - 0.6 <= abilityData[1].rating && this.randomChance(2, 3)) {
				[abilityData[0], abilityData[1]] = [abilityData[1], abilityData[0]];
			}

			// Start with the first abiility and work our way through, culling as we go
			ability = abilityData[0].name;

			while (this.shouldCullAbility(ability, types, moves, abilities, counter, movePool, teamDetails, species)) {
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
				(moves.has('facade') || moves.has('protect') || (moves.has('rest') && moves.has('sleeptalk')))
			) {
				ability = 'Guts';
			} else if (abilities.has('Moxie') && counter.get('Physical') > 3) {
				ability = 'Moxie';
			}
			if (species.name === 'Ambipom' && !counter.get('technician')) {
				// If it doesn't qualify for Technician, Skill Link is useless on it
				ability = 'Pickup';
			} else if (species.name === 'Lopunny' && moves.has('switcheroo') && this.randomChance(2, 3)) {
				ability = 'Klutz';
			}
			if (species.name === 'Altaria') ability = 'Natural Cure';
		} else {
			ability = abilityData[0].name;
		}

		let item = this.getHighPriorityItem(ability, types, moves, counter, teamDetails, species, isLead);
		if (item === undefined) item = this.getMediumPriorityItem(ability, moves, counter, species, false, isLead);
		if (item === undefined) {
			item = this.getLowPriorityItem(ability, types, moves, abilities, counter, teamDetails, species, isLead);
		}
		if (item === undefined) item = 'Leftovers';

		// For Trick / Switcheroo
		if (item === 'Leftovers' && types.has('Poison')) {
			item = 'Black Sludge';
		}

		const level = this.adjustLevel || data.level || (species.nfe ? 90 : 80);

		// Prepare optimal HP
		const srWeakness = this.dex.getEffectiveness('Rock', species);
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if (moves.has('substitute') && moves.has('reversal')) {
				// Reversal users should be able to use four Substitutes
				if (hp % 4 > 0) break;
			} else if (moves.has('substitute') && (item === 'Petaya Berry' || item === 'Sitrus Berry')) {
				// Three Substitutes should activate Petaya Berry for Dedenne
				// Two Substitutes should activate Sitrus Berry
				if (hp % 4 === 0) break;
			} else if (moves.has('bellydrum') && item === 'Sitrus Berry') {
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
			ivs.atk = hasHiddenPower ? ivs.atk - 30 : 0;
		}

		if (['gyroball', 'metalburst', 'trickroom'].some(m => moves.has(m))) {
			evs.spe = 0;
			ivs.spe = hasHiddenPower ? ivs.spe - 30 : 0;
		}

		return {
			name: species.baseSpecies,
			species: forme,
			gender: species.gender,
			moves: Array.from(moves),
			ability: ability,
			evs: evs,
			ivs: ivs,
			item: item,
			level,
			shiny: this.randomChance(1, 1024),
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
