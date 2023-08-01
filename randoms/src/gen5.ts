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
const randomDataJSON = {"venusaur":{"level":85,"moves":["hiddenpowerfire","hiddenpowerice","leechseed","naturepower","powerwhip","sleeppowder","sludgebomb","swordsdance","synthesis"]},"charizard":{"level":85,"moves":["airslash","dragonpulse","fireblast","focusblast","hiddenpowergrass","roost"]},"blastoise":{"level":83,"moves":["icebeam","protect","rapidspin","scald","toxic"]},"butterfree":{"level":92,"moves":["bugbuzz","hiddenpowerrock","psychic","quiverdance","sleeppowder","substitute"]},"beedrill":{"level":94,"moves":["drillrun","poisonjab","tailwind","toxicspikes","uturn"]},"pidgeot":{"level":90,"moves":["bravebird","heatwave","quickattack","return","roost","uturn","workup"]},"raticate":{"level":90,"moves":["crunch","facade","flamewheel","suckerpunch","swordsdance","uturn"]},"fearow":{"level":90,"moves":["doubleedge","drillpeck","drillrun","pursuit","quickattack","return","roost","uturn"]},"arbok":{"level":91,"moves":["aquatail","coil","earthquake","glare","gunkshot","rest","seedbomb","suckerpunch"]},"pikachu":{"level":90,"moves":["extremespeed","grassknot","hiddenpowerice","voltswitch","volttackle"]},"raichu":{"level":89,"moves":["encore","focusblast","grassknot","hiddenpowerice","nastyplot","thunderbolt","voltswitch"]},"sandslash":{"level":86,"moves":["earthquake","rapidspin","stealthrock","stoneedge","swordsdance","xscissor"]},"nidoqueen":{"level":82,"moves":["earthpower","fireblast","icebeam","sludgewave","stealthrock","toxicspikes"]},"nidoking":{"level":82,"moves":["earthpower","fireblast","icebeam","sludgewave","substitute","superpower"]},"clefable":{"level":84,"moves":["calmmind","doubleedge","icebeam","softboiled","stealthrock","thunderbolt","thunderwave"]},"ninetales":{"level":80,"moves":["fireblast","nastyplot","painsplit","solarbeam","substitute","willowisp"]},"wigglytuff":{"level":90,"moves":["doubleedge","fireblast","healbell","protect","stealthrock","toxic","wish"]},"vileplume":{"level":88,"moves":["aromatherapy","gigadrain","hiddenpowerfire","leechseed","sleeppowder","sludgebomb","synthesis"]},"parasect":{"level":92,"moves":["aromatherapy","leechseed","seedbomb","spore","stunspore","synthesis","xscissor"]},"venomoth":{"level":84,"moves":["bugbuzz","quiverdance","roost","sleeppowder"]},"dugtrio":{"level":82,"moves":["aerialace","earthquake","stealthrock","stoneedge"]},"persian":{"level":90,"moves":["bite","fakeout","return","switcheroo","taunt","uturn","waterpulse"]},"golduck":{"level":88,"moves":["calmmind","encore","focusblast","hydropump","icebeam","psyshock","scald"]},"primeape":{"level":86,"moves":["closecombat","honeclaws","icepunch","stoneedge","uturn"]},"arcanine":{"level":82,"moves":["closecombat","extremespeed","flareblitz","hiddenpowergrass","morningsun","wildcharge","willowisp"]},"poliwrath":{"level":85,"moves":["circlethrow","rest","scald","sleeptalk"]},"alakazam":{"level":80,"moves":["calmmind","encore","focusblast","psychic","psyshock","shadowball"]},"machamp":{"level":82,"moves":["bulkup","bulletpunch","dynamicpunch","icepunch","payback","stoneedge"]},"victreebel":{"level":89,"moves":["powerwhip","sleeppowder","sludgebomb","suckerpunch","sunnyday","weatherball"]},"tentacruel":{"level":80,"moves":["gigadrain","icebeam","protect","rapidspin","scald","toxic","toxicspikes"]},"golem":{"level":86,"moves":["earthquake","explosion","rockblast","stealthrock","suckerpunch","toxic"]},"rapidash":{"level":88,"moves":["drillrun","flareblitz","megahorn","morningsun","wildcharge","willowisp"]},"slowbro":{"level":82,"moves":["calmmind","icebeam","psyshock","scald","slackoff","thunderwave","toxic"]},"farfetchd":{"level":100,"moves":["bravebird","leafblade","quickattack","return","swordsdance"]},"dodrio":{"level":88,"moves":["bravebird","pursuit","quickattack","return","roost"]},"dewgong":{"level":91,"moves":["icebeam","protect","rest","sleeptalk","surf","toxic"]},"muk":{"level":90,"moves":["brickbreak","curse","firepunch","gunkshot","icepunch","poisonjab","rest","shadowsneak"]},"cloyster":{"level":80,"moves":["hydropump","iceshard","iciclespear","rapidspin","rockblast","shellsmash","spikes"]},"gengar":{"level":79,"moves":["focusblast","shadowball","sludgewave","substitute","trick","willowisp"]},"hypno":{"level":90,"moves":["foulplay","protect","psychic","thunderwave","toxic","wish"]},"kingler":{"level":90,"moves":["agility","crabhammer","return","superpower","swordsdance","xscissor"]},"electrode":{"level":87,"moves":["foulplay","hiddenpowergrass","hiddenpowerice","taunt","thunderbolt","voltswitch"]},"exeggutor":{"level":87,"moves":["gigadrain","hiddenpowerfire","leechseed","protect","psychic","sleeppowder","substitute"]},"marowak":{"level":89,"moves":["bonemerang","doubleedge","earthquake","firepunch","stealthrock","stoneedge"]},"hitmonlee":{"level":84,"moves":["closecombat","earthquake","fakeout","stoneedge","suckerpunch"]},"hitmonchan":{"level":85,"moves":["bulkup","closecombat","drainpunch","icepunch","machpunch","rapidspin","stoneedge"]},"weezing":{"level":88,"moves":["fireblast","haze","painsplit","sludgebomb","willowisp"]},"rhydon":{"level":84,"moves":["earthquake","megahorn","stealthrock","stoneedge","toxic"]},"chansey":{"level":82,"moves":["aromatherapy","seismictoss","softboiled","stealthrock","toxic"]},"kangaskhan":{"level":86,"moves":["doubleedge","earthquake","fakeout","focuspunch","return","substitute","suckerpunch"]},"seaking":{"level":91,"moves":["drillrun","icebeam","megahorn","return","waterfall"]},"starmie":{"level":80,"moves":["hydropump","icebeam","psyshock","rapidspin","recover","scald","thunderbolt","trick"]},"mrmime":{"level":90,"moves":["encore","focusblast","nastyplot","psychic","substitute","thunderbolt"]},"scyther":{"level":84,"moves":["aerialace","brickbreak","bugbite","quickattack","roost","swordsdance"]},"jynx":{"level":85,"moves":["focusblast","icebeam","lovelykiss","nastyplot","psyshock","substitute","trick"]},"pinsir":{"level":86,"moves":["closecombat","earthquake","quickattack","stealthrock","stoneedge","swordsdance","xscissor"]},"tauros":{"level":85,"moves":["doubleedge","earthquake","pursuit","retaliate","stoneedge"]},"gyarados":{"level":79,"moves":["dragondance","earthquake","icefang","stoneedge","waterfall"]},"lapras":{"level":86,"moves":["healbell","hydropump","icebeam","substitute","thunderbolt","toxic"]},"ditto":{"level":86,"moves":["transform"]},"vaporeon":{"level":82,"moves":["icebeam","protect","roar","scald","toxic","wish"]},"jolteon":{"level":80,"moves":["hiddenpowerice","signalbeam","thunderbolt","voltswitch"]},"flareon":{"level":90,"moves":["facade","flamecharge","rest","sleeptalk"]},"omastar":{"level":83,"moves":["hiddenpowergrass","icebeam","shellsmash","spikes","stealthrock","surf"]},"kabutops":{"level":85,"moves":["aquajet","rapidspin","stealthrock","stoneedge","superpower","swordsdance","waterfall"]},"aerodactyl":{"level":84,"moves":["aquatail","doubleedge","earthquake","roost","stealthrock","stoneedge","taunt"]},"snorlax":{"level":81,"moves":["bodyslam","crunch","curse","earthquake","firepunch","pursuit","rest"]},"articuno":{"level":85,"moves":["hurricane","icebeam","roost","substitute","toxic"]},"zapdos":{"level":80,"moves":["heatwave","hiddenpowerice","roost","substitute","thunderbolt","toxic","uturn"]},"moltres":{"level":84,"moves":["fireblast","hiddenpowergrass","hurricane","roost","substitute","toxic","uturn","willowisp"]},"dragonair":{"level":90,"moves":["dragondance","outrage","rest","sleeptalk","waterfall"]},"dragonite":{"level":76,"moves":["dragondance","earthquake","extremespeed","firepunch","outrage","roost"]},"mewtwo":{"level":71,"moves":["aurasphere","calmmind","fireblast","psystrike","recover","shadowball"]},"mew":{"level":80,"moves":["aurasphere","fireblast","nastyplot","psychic","softboiled","stealthrock","taunt","uturn","willowisp"]},"meganium":{"level":90,"moves":["aromatherapy","dragontail","gigadrain","leechseed","lightscreen","reflect","synthesis","toxic"]},"typhlosion":{"level":82,"moves":["eruption","fireblast","focusblast","hiddenpowergrass","hiddenpowerrock"]},"feraligatr":{"level":84,"moves":["aquajet","dragondance","earthquake","icepunch","superpower","swordsdance","waterfall"]},"furret":{"level":91,"moves":["aquatail","doubleedge","firepunch","shadowclaw","trick","uturn"]},"noctowl":{"level":93,"moves":["airslash","magiccoat","nightshade","roost","toxic","whirlwind"]},"ledian":{"level":98,"moves":["encore","lightscreen","reflect","roost","toxic","uturn"]},"ariados":{"level":94,"moves":["poisonjab","suckerpunch","toxicspikes","xscissor"]},"crobat":{"level":83,"moves":["bravebird","heatwave","roost","superfang","taunt","toxic","uturn"]},"lanturn":{"level":84,"moves":["healbell","icebeam","scald","thunderbolt","thunderwave","voltswitch"]},"xatu":{"level":83,"moves":["heatwave","psychic","roost","thunderwave","toxic","uturn"]},"ampharos":{"level":87,"moves":["agility","focusblast","healbell","hiddenpowergrass","hiddenpowerice","thunderbolt","toxic","voltswitch"]},"bellossom":{"level":92,"moves":["gigadrain","hiddenpowerfire","hiddenpowerrock","leafstorm","leechseed","sleeppowder","stunspore","synthesis"]},"azumarill":{"level":84,"moves":["aquajet","doubleedge","icepunch","superpower","waterfall"]},"sudowoodo":{"level":90,"moves":["earthquake","stealthrock","stoneedge","suckerpunch","toxic","woodhammer"]},"politoed":{"level":82,"moves":["encore","focusblast","hiddenpowergrass","hypnosis","icebeam","protect","scald","toxic"]},"jumpluff":{"level":88,"moves":["acrobatics","encore","energyball","leechseed","sleeppowder","uturn"]},"sunflora":{"level":95,"moves":["earthpower","encore","gigadrain","hiddenpowerrock","solarbeam","sunnyday"]},"quagsire":{"level":84,"moves":["earthquake","encore","recover","scald","toxic"]},"espeon":{"level":81,"moves":["calmmind","hiddenpowerfire","morningsun","psychic","psyshock","signalbeam"]},"umbreon":{"level":83,"moves":["foulplay","protect","toxic","wish"]},"murkrow":{"level":88,"moves":["foulplay","roost","taunt","thunderwave","toxic"]},"slowking":{"level":84,"moves":["calmmind","fireblast","grassknot","icebeam","psychic","slackoff","surf","trickroom"]},"unown":{"level":100,"moves":["hiddenpowerpsychic"]},"wobbuffet":{"level":86,"moves":["counter","destinybond","encore","mirrorcoat"]},"girafarig":{"level":90,"moves":["calmmind","hiddenpowerfire","hypervoice","psychic","psyshock","thunderbolt"]},"forretress":{"level":80,"moves":["gyroball","rapidspin","spikes","stealthrock","toxic","voltswitch"]},"dunsparce":{"level":91,"moves":["bite","bodyslam","coil","glare","headbutt","rockslide","roost"]},"gligar":{"level":82,"moves":["earthquake","roost","stealthrock","taunt","toxic","uturn"]},"steelix":{"level":84,"moves":["curse","earthquake","gyroball","roar","stealthrock","stoneedge","toxic"]},"granbull":{"level":90,"moves":["closecombat","crunch","healbell","return","thunderwave","toxic"]},"qwilfish":{"level":85,"moves":["destinybond","poisonjab","spikes","taunt","thunderwave","toxicspikes","waterfall"]},"scizor":{"level":80,"moves":["bugbite","bulletpunch","pursuit","roost","superpower","swordsdance","uturn"]},"shuckle":{"level":90,"moves":["encore","knockoff","protect","stealthrock","toxic"]},"heracross":{"level":81,"moves":["closecombat","earthquake","facade","megahorn","stoneedge"]},"ursaring":{"level":86,"moves":["closecombat","crunch","earthquake","facade","protect","swordsdance"]},"magcargo":{"level":91,"moves":["hiddenpowerrock","lavaplume","recover","stealthrock","toxic"]},"corsola":{"level":91,"moves":["powergem","recover","scald","stealthrock","toxic"]},"octillery":{"level":90,"moves":["energyball","fireblast","hydropump","icebeam","thunderwave"]},"delibird":{"level":100,"moves":["aerialace","icebeam","iceshard","rapidspin"]},"mantine":{"level":90,"moves":["airslash","hydropump","icebeam","raindance","rest","scald","sleeptalk"]},"skarmory":{"level":79,"moves":["bravebird","roost","spikes","stealthrock","whirlwind"]},"houndoom":{"level":82,"moves":["darkpulse","fireblast","hiddenpowergrass","nastyplot","suckerpunch"]},"kingdra":{"level":82,"moves":["dracometeor","dragondance","hiddenpowerelectric","hydropump","icebeam","outrage","raindance","waterfall"]},"donphan":{"level":82,"moves":["earthquake","headsmash","iceshard","rapidspin","seedbomb","stealthrock"]},"porygon2":{"level":82,"moves":["discharge","icebeam","recover","toxic","triattack"]},"stantler":{"level":90,"moves":["doubleedge","earthquake","jumpkick","megahorn","suckerpunch"]},"smeargle":{"level":84,"moves":["memento","spikes","spore","stealthrock","whirlwind"]},"hitmontop":{"level":85,"moves":["closecombat","machpunch","rapidspin","stoneedge","suckerpunch","toxic"]},"miltank":{"level":84,"moves":["bodyslam","earthquake","healbell","milkdrink","stealthrock","toxic"]},"blissey":{"level":82,"moves":["aromatherapy","seismictoss","softboiled","stealthrock","thunderwave","toxic"]},"raikou":{"level":79,"moves":["aurasphere","calmmind","hiddenpowerice","substitute","thunderbolt","voltswitch"]},"entei":{"level":83,"moves":["bulldoze","extremespeed","flareblitz","hiddenpowergrass","stoneedge"]},"suicune":{"level":82,"moves":["calmmind","hiddenpowerelectric","hydropump","icebeam","rest","roar","scald","sleeptalk"]},"tyranitar":{"level":80,"moves":["crunch","fireblast","pursuit","stealthrock","stoneedge","superpower"]},"lugia":{"level":74,"moves":["aeroblast","earthquake","roost","substitute","toxic","whirlwind"]},"hooh":{"level":74,"moves":["bravebird","earthquake","roost","sacredfire","substitute","toxic"]},"celebi":{"level":80,"moves":["earthpower","gigadrain","hiddenpowerice","leafstorm","nastyplot","psychic","recover","stealthrock","uturn"]},"sceptile":{"level":84,"moves":["acrobatics","earthquake","leafblade","substitute","swordsdance"]},"blaziken":{"level":76,"moves":["flareblitz","highjumpkick","protect","stoneedge","swordsdance"]},"swampert":{"level":82,"moves":["earthquake","icebeam","protect","roar","scald","stealthrock","toxic"]},"mightyena":{"level":91,"moves":["crunch","facade","firefang","howl","suckerpunch"]},"linoone":{"level":86,"moves":["bellydrum","extremespeed","seedbomb","shadowclaw"]},"beautifly":{"level":95,"moves":["bugbuzz","hiddenpowerground","psychic","quiverdance"]},"dustox":{"level":90,"moves":["bugbuzz","quiverdance","roost","sludgebomb"]},"ludicolo":{"level":86,"moves":["gigadrain","hydropump","icebeam","raindance","scald"]},"shiftry":{"level":88,"moves":["darkpulse","hiddenpowerfire","leafstorm","naturepower","seedbomb","suckerpunch","swordsdance"]},"swellow":{"level":86,"moves":["bravebird","facade","protect","quickattack","uturn"]},"pelipper":{"level":90,"moves":["hurricane","icebeam","roost","scald","tailwind","toxic","uturn"]},"gardevoir":{"level":86,"moves":["calmmind","focusblast","painsplit","psychic","substitute","thunderbolt","trick","willowisp"]},"masquerain":{"level":91,"moves":["airslash","bugbuzz","hydropump","quiverdance","roost"]},"breloom":{"level":80,"moves":["bulletseed","machpunch","spore","stoneedge","swordsdance"]},"vigoroth":{"level":87,"moves":["bulkup","earthquake","return","slackoff","taunt","toxic"]},"slaking":{"level":86,"moves":["earthquake","nightslash","pursuit","retaliate","return"]},"ninjask":{"level":87,"moves":["aerialace","substitute","swordsdance","xscissor"]},"shedinja":{"level":90,"moves":["shadowclaw","shadowsneak","swordsdance","willowisp","xscissor"]},"exploud":{"level":90,"moves":["fireblast","focusblast","hypervoice","lowkick","surf"]},"hariyama":{"level":84,"moves":["bulletpunch","closecombat","facade","fakeout","stoneedge"]},"delcatty":{"level":92,"moves":["doubleedge","fakeout","icebeam","suckerpunch","thunderwave"]},"sableye":{"level":85,"moves":["foulplay","recover","seismictoss","taunt","willowisp"]},"mawile":{"level":92,"moves":["firefang","ironhead","stealthrock","suckerpunch","swordsdance"]},"aggron":{"level":85,"moves":["aquatail","earthquake","headsmash","heavyslam","rockpolish","stealthrock","thunderwave"]},"medicham":{"level":84,"moves":["bulletpunch","highjumpkick","icepunch","thunderpunch","trick","zenheadbutt"]},"manectric":{"level":84,"moves":["flamethrower","hiddenpowerice","overheat","switcheroo","thunderbolt","voltswitch"]},"plusle":{"level":90,"moves":["grassknot","hiddenpowerice","nastyplot","thunderbolt","voltswitch"]},"minun":{"level":90,"moves":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"]},"volbeat":{"level":90,"moves":["bugbuzz","encore","roost","thunderwave","uturn"]},"illumise":{"level":90,"moves":["bugbuzz","encore","roost","thunderwave","wish"]},"swalot":{"level":92,"moves":["earthquake","encore","painsplit","protect","sludgebomb","toxic"]},"sharpedo":{"level":82,"moves":["crunch","earthquake","icebeam","protect","waterfall","zenheadbutt"]},"wailord":{"level":90,"moves":["hiddenpowergrass","hydropump","icebeam","surf","waterspout"]},"camerupt":{"level":87,"moves":["earthquake","hiddenpowergrass","lavaplume","roar","stealthrock"]},"torkoal":{"level":87,"moves":["earthquake","lavaplume","protect","rapidspin","stealthrock","toxic","yawn"]},"grumpig":{"level":90,"moves":["focusblast","healbell","psychic","shadowball","thunderwave","trick","whirlwind"]},"spinda":{"level":98,"moves":["return","suckerpunch","superpower","trickroom"]},"flygon":{"level":82,"moves":["earthquake","firepunch","outrage","roost","stoneedge","superpower","uturn"]},"cacturne":{"level":87,"moves":["drainpunch","seedbomb","spikes","substitute","suckerpunch","swordsdance"]},"altaria":{"level":87,"moves":["dracometeor","dragondance","earthquake","fireblast","healbell","outrage","roost"]},"zangoose":{"level":86,"moves":["closecombat","facade","nightslash","quickattack","swordsdance"]},"seviper":{"level":90,"moves":["earthquake","flamethrower","gigadrain","sludgebomb","suckerpunch","switcheroo"]},"lunatone":{"level":90,"moves":["earthpower","hiddenpowerrock","moonlight","psychic","stealthrock","toxic"]},"solrock":{"level":90,"moves":["explosion","lightscreen","morningsun","reflect","rockslide","stealthrock","willowisp"]},"whiscash":{"level":89,"moves":["dragondance","earthquake","icebeam","waterfall"]},"crawdaunt":{"level":85,"moves":["crunch","dragondance","superpower","waterfall"]},"claydol":{"level":83,"moves":["earthquake","icebeam","psychic","rapidspin","stealthrock","toxic"]},"cradily":{"level":87,"moves":["earthquake","recover","rockslide","seedbomb","stealthrock","swordsdance","toxic"]},"armaldo":{"level":87,"moves":["aquatail","earthquake","rapidspin","stealthrock","stoneedge","swordsdance","xscissor"]},"milotic":{"level":82,"moves":["dragontail","haze","icebeam","recover","scald","toxic"]},"castformsunny":{"level":99,"moves":["icebeam","solarbeam","sunnyday","weatherball"]},"castformrainy":{"level":99,"moves":["icebeam","raindance","thunder","weatherball"]},"kecleon":{"level":91,"moves":["foulplay","recover","stealthrock","thunderwave","toxic"]},"banette":{"level":92,"moves":["pursuit","shadowclaw","shadowsneak","trick","willowisp"]},"dusclops":{"level":84,"moves":["nightshade","rest","sleeptalk","willowisp"]},"tropius":{"level":90,"moves":["airslash","leechseed","protect","substitute","toxic"]},"chimecho":{"level":93,"moves":["calmmind","healingwish","psychic","recover","shadowball","toxic","yawn"]},"absol":{"level":85,"moves":["fireblast","nightslash","psychocut","pursuit","suckerpunch","superpower","swordsdance"]},"glalie":{"level":91,"moves":["earthquake","explosion","icebeam","spikes","taunt"]},"walrein":{"level":90,"moves":["encore","icebeam","protect","roar","surf","toxic"]},"huntail":{"level":86,"moves":["icebeam","return","shellsmash","waterfall"]},"gorebyss":{"level":82,"moves":["hiddenpowergrass","hydropump","icebeam","shellsmash"]},"relicanth":{"level":87,"moves":["doubleedge","earthquake","headsmash","stealthrock","waterfall"]},"luvdisc":{"level":100,"moves":["icebeam","protect","scald","sweetkiss","toxic"]},"salamence":{"level":79,"moves":["aquatail","brickbreak","dracometeor","dragondance","earthquake","fireblast","outrage","roost"]},"metagross":{"level":81,"moves":["agility","bulletpunch","earthquake","meteormash","pursuit","stealthrock","zenheadbutt"]},"regirock":{"level":86,"moves":["drainpunch","protect","rockslide","stealthrock","thunderwave","toxic"]},"regice":{"level":86,"moves":["focusblast","icebeam","rest","rockpolish","sleeptalk","thunderbolt"]},"registeel":{"level":82,"moves":["curse","ironhead","protect","rest","sleeptalk","stealthrock","toxic"]},"latias":{"level":72,"moves":["calmmind","dracometeor","psyshock","roost"]},"latios":{"level":72,"moves":["calmmind","dracometeor","psyshock","roost"]},"kyogre":{"level":72,"moves":["calmmind","icebeam","rest","sleeptalk","surf","thunder","waterspout"]},"groudon":{"level":76,"moves":["earthquake","firepunch","stealthrock","stoneedge","swordsdance","thunderwave"]},"rayquaza":{"level":75,"moves":["dracometeor","dragondance","earthquake","extremespeed","outrage","swordsdance","vcreate"]},"jirachi":{"level":79,"moves":["bodyslam","firepunch","icepunch","ironhead","substitute","uturn","wish"]},"deoxys":{"level":74,"moves":["extremespeed","hiddenpowerfire","icebeam","psychoboost","stealthrock","superpower"]},"deoxysattack":{"level":74,"moves":["extremespeed","hiddenpowerfire","icebeam","psychoboost","stealthrock","superpower"]},"deoxysdefense":{"level":81,"moves":["magiccoat","recover","seismictoss","spikes","taunt","toxic"]},"deoxysspeed":{"level":76,"moves":["icebeam","lightscreen","psychoboost","reflect","spikes","stealthrock","superpower","taunt"]},"torterra":{"level":88,"moves":["earthquake","rockpolish","stealthrock","stoneedge","synthesis","woodhammer"]},"infernape":{"level":81,"moves":["closecombat","flareblitz","hiddenpowerice","machpunch","overheat","swordsdance","thunderpunch","uturn"]},"empoleon":{"level":82,"moves":["agility","grassknot","hydropump","icebeam","protect","scald","stealthrock","toxic"]},"staraptor":{"level":81,"moves":["bravebird","closecombat","doubleedge","quickattack","roost","uturn"]},"bibarel":{"level":91,"moves":["curse","quickattack","rest","waterfall"]},"kricketune":{"level":98,"moves":["brickbreak","bugbite","nightslash","return","swordsdance"]},"luxray":{"level":90,"moves":["crunch","facade","icefang","superpower","voltswitch","wildcharge"]},"roserade":{"level":83,"moves":["gigadrain","hiddenpowerfire","leafstorm","sleeppowder","sludgebomb","spikes","synthesis","toxicspikes"]},"rampardos":{"level":89,"moves":["crunch","earthquake","firepunch","headsmash","rockpolish","superpower"]},"bastiodon":{"level":88,"moves":["metalburst","protect","roar","rockblast","stealthrock","toxic"]},"wormadam":{"level":96,"moves":["gigadrain","hiddenpowerrock","leafstorm","protect","signalbeam","toxic"]},"wormadamsandy":{"level":90,"moves":["earthquake","protect","rockblast","stealthrock","toxic"]},"wormadamtrash":{"level":90,"moves":["ironhead","protect","stealthrock","toxic"]},"mothim":{"level":92,"moves":["airslash","bugbuzz","hiddenpowerground","quiverdance","substitute"]},"vespiquen":{"level":95,"moves":["attackorder","protect","roost","substitute","toxic"]},"pachirisu":{"level":91,"moves":["protect","superfang","thunderwave","toxic","voltswitch"]},"floatzel":{"level":86,"moves":["aquajet","bulkup","crunch","icepunch","switcheroo","taunt","waterfall"]},"cherrim":{"level":91,"moves":["energyball","healingwish","hiddenpowerrock","hiddenpowerfire","naturepower"]},"gastrodon":{"level":82,"moves":["earthquake","icebeam","recover","scald","toxic"]},"ambipom":{"level":82,"moves":["fakeout","lowkick","pursuit","return","switcheroo","uturn"]},"drifblim":{"level":85,"moves":["acrobatics","destinybond","disable","shadowball","substitute","willowisp"]},"lopunny":{"level":90,"moves":["firepunch","healingwish","icepunch","jumpkick","return","switcheroo","thunderpunch"]},"mismagius":{"level":82,"moves":["hiddenpowerfighting","nastyplot","shadowball","substitute","taunt","thunderbolt","willowisp"]},"honchkrow":{"level":82,"moves":["bravebird","heatwave","pursuit","roost","substitute","suckerpunch","superpower"]},"purugly":{"level":89,"moves":["fakeout","hypnosis","return","suckerpunch","uturn"]},"skuntank":{"level":86,"moves":["crunch","fireblast","poisonjab","pursuit","suckerpunch","taunt"]},"bronzong":{"level":81,"moves":["earthquake","hypnosis","psychic","stealthrock","toxic"]},"chatot":{"level":90,"moves":["chatter","heatwave","hiddenpowerground","hypervoice","nastyplot","substitute","uturn"]},"spiritomb":{"level":85,"moves":["calmmind","darkpulse","foulplay","rest","shadowsneak","sleeptalk","willowisp"]},"garchomp":{"level":76,"moves":["aquatail","earthquake","fireblast","outrage","stealthrock","stoneedge","swordsdance"]},"lucario":{"level":81,"moves":["closecombat","crunch","extremespeed","icepunch","swordsdance"]},"hippowdon":{"level":82,"moves":["earthquake","slackoff","stealthrock","stoneedge","toxic","whirlwind"]},"drapion":{"level":84,"moves":["aquatail","crunch","earthquake","poisonjab","pursuit","swordsdance","taunt","toxicspikes"]},"toxicroak":{"level":80,"moves":["drainpunch","icepunch","poisonjab","substitute","suckerpunch","swordsdance"]},"carnivine":{"level":92,"moves":["leechseed","powerwhip","return","sleeppowder","substitute","swordsdance"]},"lumineon":{"level":89,"moves":["icebeam","protect","scald","toxic","uturn"]},"abomasnow":{"level":83,"moves":["blizzard","earthquake","hiddenpowerfire","iceshard","leechseed","woodhammer"]},"weavile":{"level":82,"moves":["icepunch","iceshard","lowkick","nightslash","pursuit","swordsdance"]},"magnezone":{"level":81,"moves":["flashcannon","hiddenpowerfire","thunderbolt","toxic","voltswitch"]},"lickilicky":{"level":86,"moves":["bodyslam","earthquake","healbell","powerwhip","protect","swordsdance","toxic","wish"]},"rhyperior":{"level":82,"moves":["earthquake","icepunch","megahorn","rockpolish","stoneedge"]},"tangrowth":{"level":85,"moves":["earthquake","hiddenpowerfire","leechseed","powerwhip","rockslide","sleeppowder","synthesis"]},"electivire":{"level":84,"moves":["crosschop","earthquake","flamethrower","icepunch","voltswitch","wildcharge"]},"magmortar":{"level":84,"moves":["fireblast","focusblast","hiddenpowergrass","substitute","thunderbolt"]},"togekiss":{"level":82,"moves":["airslash","aurasphere","nastyplot","roost","thunderwave"]},"yanmega":{"level":82,"moves":["airslash","bugbuzz","hiddenpowerground","protect","uturn"]},"leafeon":{"level":89,"moves":["leafblade","return","swordsdance","xscissor"]},"glaceon":{"level":90,"moves":["hiddenpowerground","icebeam","protect","shadowball","toxic","wish"]},"gliscor":{"level":80,"moves":["earthquake","facade","protect","roost","substitute","swordsdance","taunt","toxic"]},"mamoswine":{"level":79,"moves":["earthquake","iceshard","iciclecrash","stealthrock","superpower"]},"porygonz":{"level":82,"moves":["agility","darkpulse","hiddenpowerfighting","icebeam","nastyplot","thunderbolt","triattack","trick"]},"gallade":{"level":84,"moves":["closecombat","drainpunch","nightslash","substitute","swordsdance","trick","zenheadbutt"]},"probopass":{"level":86,"moves":["earthpower","powergem","stealthrock","toxic","voltswitch"]},"dusknoir":{"level":84,"moves":["earthquake","icepunch","painsplit","shadowsneak","trick","willowisp"]},"froslass":{"level":82,"moves":["destinybond","icebeam","shadowball","spikes","taunt","thunderwave"]},"rotom":{"level":84,"moves":["hiddenpowerice","painsplit","shadowball","substitute","thunderbolt","trick","voltswitch","willowisp"]},"rotomheat":{"level":82,"moves":["hiddenpowergrass","overheat","painsplit","thunderbolt","thunderwave","trick","voltswitch","willowisp"]},"rotomwash":{"level":81,"moves":["hiddenpowerice","hydropump","painsplit","thunderbolt","thunderwave","trick","voltswitch","willowisp"]},"rotomfrost":{"level":86,"moves":["blizzard","hiddenpowerfire","painsplit","substitute","thunderbolt","trick","voltswitch","willowisp"]},"rotomfan":{"level":86,"moves":["airslash","painsplit","substitute","thunderbolt","trick","voltswitch","willowisp"]},"rotommow":{"level":84,"moves":["hiddenpowerfire","leafstorm","painsplit","thunderbolt","thunderwave","trick","voltswitch","willowisp"]},"uxie":{"level":84,"moves":["healbell","lightscreen","memento","psychic","reflect","stealthrock","thunderwave","uturn","yawn"]},"mesprit":{"level":83,"moves":["calmmind","hiddenpowerfire","icebeam","psychic","stealthrock","thunderbolt","trick","uturn"]},"azelf":{"level":81,"moves":["energyball","fireblast","nastyplot","psychic","stealthrock","taunt","trick","uturn"]},"dialga":{"level":72,"moves":["aurasphere","dracometeor","dragontail","fireblast","stealthrock","thunderbolt"]},"palkia":{"level":74,"moves":["dracometeor","dragontail","fireblast","hydropump","spacialrend","surf","thunderbolt"]},"heatran":{"level":80,"moves":["earthpower","fireblast","flashcannon","hiddenpowerice","lavaplume","protect","roar","stealthrock","toxic"]},"regigigas":{"level":85,"moves":["confuseray","return","rockslide","substitute","thunderwave"]},"giratinaorigin":{"level":74,"moves":["dracometeor","earthquake","hiddenpowerfire","shadowsneak","willowisp"]},"giratina":{"level":73,"moves":["calmmind","dragonpulse","rest","sleeptalk","willowisp"]},"cresselia":{"level":82,"moves":["calmmind","hiddenpowerfighting","moonlight","psychic","thunderwave","toxic"]},"phione":{"level":90,"moves":["healbell","icebeam","scald","toxic","uturn"]},"manaphy":{"level":76,"moves":["energyball","icebeam","surf","tailglow"]},"darkrai":{"level":72,"moves":["darkpulse","darkvoid","focusblast","nastyplot","substitute"]},"shaymin":{"level":82,"moves":["earthpower","hiddenpowerfire","leechseed","psychic","rest","seedflare"]},"shayminsky":{"level":74,"moves":["airslash","earthpower","hiddenpowerfire","hiddenpowerice","leechseed","seedflare","substitute"]},"arceus":{"level":72,"moves":["earthquake","extremespeed","recover","shadowclaw","swordsdance"]},"arceusbug":{"level":72,"moves":["earthquake","recover","stoneedge","swordsdance","xscissor"]},"arceusdark":{"level":72,"moves":["calmmind","judgment","recover","refresh"]},"arceusdragon":{"level":72,"moves":["earthquake","extremespeed","outrage","recover","swordsdance"]},"arceuselectric":{"level":72,"moves":["calmmind","icebeam","judgment","recover"]},"arceusfighting":{"level":72,"moves":["calmmind","darkpulse","icebeam","judgment","recover"]},"arceusfire":{"level":72,"moves":["calmmind","fireblast","judgment","recover","thunderbolt"]},"arceusflying":{"level":72,"moves":["calmmind","earthpower","judgment","recover","substitute"]},"arceusghost":{"level":72,"moves":["calmmind","focusblast","judgment","recover","roar","willowisp"]},"arceusgrass":{"level":72,"moves":["calmmind","earthpower","icebeam","judgment","recover","thunderwave"]},"arceusground":{"level":72,"moves":["calmmind","icebeam","judgment","recover","willowisp"]},"arceusice":{"level":72,"moves":["calmmind","fireblast","icebeam","recover","thunderbolt"]},"arceuspoison":{"level":72,"moves":["flamethrower","icebeam","recover","sludgebomb","stealthrock","willowisp"]},"arceuspsychic":{"level":72,"moves":["calmmind","darkpulse","focusblast","judgment","recover"]},"arceusrock":{"level":72,"moves":["earthquake","recover","stoneedge","swordsdance"]},"arceussteel":{"level":72,"moves":["calmmind","judgment","recover","thunderbolt","willowisp"]},"arceuswater":{"level":72,"moves":["brickbreak","extremespeed","recover","swordsdance","waterfall"]},"victini":{"level":81,"moves":["blueflare","boltstrike","energyball","focusblast","glaciate","trick","uturn","vcreate"]},"serperior":{"level":85,"moves":["calmmind","dragonpulse","gigadrain","hiddenpowerfire","leechseed","substitute"]},"emboar":{"level":84,"moves":["earthquake","fireblast","flareblitz","grassknot","headsmash","superpower","wildcharge"]},"samurott":{"level":86,"moves":["aquajet","grassknot","icebeam","megahorn","superpower","swordsdance","waterfall"]},"watchog":{"level":90,"moves":["crunch","hypnosis","return","substitute","superfang","swordsdance"]},"stoutland":{"level":88,"moves":["crunch","return","superpower","thunderwave","wildcharge"]},"liepard":{"level":87,"moves":["darkpulse","encore","hiddenpowerfighting","nastyplot","thunderwave"]},"simisage":{"level":88,"moves":["focusblast","gigadrain","hiddenpowerrock","leechseed","nastyplot","substitute"]},"simisear":{"level":87,"moves":["fireblast","focusblast","grassknot","hiddenpowerrock","nastyplot","substitute"]},"simipour":{"level":86,"moves":["focusblast","hiddenpowergrass","hydropump","icebeam","nastyplot","substitute"]},"musharna":{"level":86,"moves":["calmmind","healbell","hiddenpowerground","moonlight","psychic","signalbeam","toxic","trickroom"]},"unfezant":{"level":89,"moves":["hypnosis","pluck","return","roost","tailwind","uturn"]},"zebstrika":{"level":88,"moves":["hiddenpowergrass","overheat","thunderbolt","voltswitch","wildcharge"]},"gigalith":{"level":86,"moves":["earthquake","explosion","rockblast","stealthrock","stoneedge","superpower"]},"swoobat":{"level":88,"moves":["airslash","calmmind","heatwave","roost","storedpower"]},"excadrill":{"level":80,"moves":["earthquake","ironhead","rapidspin","rockslide","swordsdance"]},"audino":{"level":90,"moves":["doubleedge","healbell","magiccoat","protect","toxic","wish"]},"conkeldurr":{"level":80,"moves":["bulkup","drainpunch","icepunch","machpunch","thunderpunch"]},"seismitoad":{"level":86,"moves":["earthquake","hydropump","raindance","sludgebomb","stealthrock","toxic"]},"throh":{"level":88,"moves":["bulkup","icepunch","payback","rest","sleeptalk","stormthrow"]},"sawk":{"level":85,"moves":["bulkup","closecombat","earthquake","icepunch","stoneedge"]},"leavanny":{"level":90,"moves":["leafblade","swordsdance","synthesis","xscissor"]},"scolipede":{"level":86,"moves":["aquatail","earthquake","megahorn","rockslide","spikes","swordsdance"]},"whimsicott":{"level":84,"moves":["encore","gigadrain","leechseed","stunspore","taunt","uturn"]},"lilligant":{"level":84,"moves":["gigadrain","hiddenpowerfire","hiddenpowerrock","petaldance","quiverdance","sleeppowder"]},"basculinbluestriped":{"level":86,"moves":["aquajet","crunch","superpower","waterfall","zenheadbutt"]},"basculin":{"level":86,"moves":["aquajet","crunch","superpower","waterfall","zenheadbutt"]},"krookodile":{"level":81,"moves":["crunch","earthquake","pursuit","stealthrock","stoneedge","superpower"]},"darmanitan":{"level":82,"moves":["earthquake","flareblitz","rockslide","superpower","uturn"]},"maractus":{"level":92,"moves":["gigadrain","hiddenpowerfire","leechseed","spikes","toxic"]},"crustle":{"level":84,"moves":["earthquake","rockblast","shellsmash","spikes","stealthrock","stoneedge","xscissor"]},"scrafty":{"level":81,"moves":["crunch","dragondance","highjumpkick","icepunch","zenheadbutt"]},"sigilyph":{"level":84,"moves":["cosmicpower","psychoshift","roost","storedpower"]},"cofagrigus":{"level":85,"moves":["haze","hiddenpowerfighting","nastyplot","painsplit","shadowball","trickroom","willowisp"]},"carracosta":{"level":86,"moves":["aquajet","earthquake","icebeam","shellsmash","stealthrock","stoneedge","waterfall"]},"archeops":{"level":82,"moves":["acrobatics","earthquake","headsmash","pluck","roost","stoneedge","uturn"]},"garbodor":{"level":87,"moves":["drainpunch","gunkshot","haze","painsplit","spikes","toxicspikes"]},"zoroark":{"moves":["darkpulse","flamethrower","focusblast","nastyplot","uturn"]},"cinccino":{"level":81,"moves":["bulletseed","rockblast","tailslap","uturn"]},"gothitelle":{"level":86,"moves":["calmmind","hiddenpowerfighting","psychic","rest","thunderbolt","trick"]},"reuniclus":{"level":81,"moves":["calmmind","focusblast","psychic","recover","shadowball","trickroom"]},"swanna":{"level":88,"moves":["hurricane","icebeam","raindance","roost","surf"]},"vanilluxe":{"level":90,"moves":["autotomize","explosion","flashcannon","hiddenpowerground","icebeam"]},"sawsbuck":{"level":86,"moves":["doubleedge","hornleech","megahorn","naturepower","return","substitute","swordsdance"]},"emolga":{"level":88,"moves":["acrobatics","encore","roost","thunderbolt","toxic","uturn"]},"escavalier":{"level":84,"moves":["ironhead","megahorn","pursuit","return","swordsdance"]},"amoonguss":{"level":85,"moves":["clearsmog","gigadrain","hiddenpowerfire","spore","stunspore","synthesis"]},"jellicent":{"level":81,"moves":["icebeam","recover","scald","shadowball","toxic","willowisp"]},"alomomola":{"level":86,"moves":["protect","scald","toxic","waterfall","wish"]},"galvantula":{"level":82,"moves":["bugbuzz","gigadrain","hiddenpowerice","thunder","voltswitch"]},"ferrothorn":{"level":78,"moves":["gyroball","leechseed","powerwhip","protect","spikes","stealthrock","toxic"]},"klinklang":{"level":84,"moves":["geargrind","return","shiftgear","substitute","wildcharge"]},"eelektross":{"level":86,"moves":["flamethrower","gigadrain","hiddenpowerice","superpower","thunderbolt","uturn"]},"beheeyem":{"level":88,"moves":["hiddenpowerfighting","psychic","thunderbolt","trick","trickroom"]},"chandelure":{"level":82,"moves":["calmmind","energyball","fireblast","hiddenpowerfighting","shadowball","substitute"]},"haxorus":{"level":78,"moves":["aquatail","dragondance","earthquake","outrage","superpower","swordsdance"]},"beartic":{"level":90,"moves":["aquajet","iciclecrash","stoneedge","superpower","swordsdance"]},"cryogonal":{"level":85,"moves":["hiddenpowerground","icebeam","rapidspin","recover","toxic"]},"accelgor":{"level":85,"moves":["bugbuzz","encore","focusblast","gigadrain","hiddenpowerrock","spikes","yawn"]},"stunfisk":{"level":88,"moves":["discharge","earthpower","foulplay","rest","scald","sleeptalk","stealthrock","toxic"]},"mienshao":{"level":81,"moves":["highjumpkick","stoneedge","substitute","swordsdance","uturn"]},"druddigon":{"level":84,"moves":["dragontail","earthquake","glare","outrage","stealthrock","suckerpunch","superpower"]},"golurk":{"level":85,"moves":["drainpunch","earthquake","icepunch","rockpolish","shadowpunch","stealthrock"]},"bisharp":{"level":83,"moves":["ironhead","lowkick","nightslash","suckerpunch","swordsdance"]},"bouffalant":{"level":85,"moves":["earthquake","headcharge","megahorn","stoneedge","swordsdance"]},"braviary":{"level":86,"moves":["bravebird","bulkup","return","roost","superpower","uturn"]},"mandibuzz":{"level":86,"moves":["bravebird","foulplay","roost","taunt","toxic","whirlwind"]},"heatmor":{"level":90,"moves":["fireblast","gigadrain","suckerpunch","superpower"]},"durant":{"level":81,"moves":["honeclaws","ironhead","rockslide","superpower","xscissor"]},"hydreigon":{"level":80,"moves":["darkpulse","dracometeor","flamethrower","focusblast","roost","uturn"]},"volcarona":{"level":78,"moves":["bugbuzz","fierydance","fireblast","gigadrain","hiddenpowerground","quiverdance","roost"]},"cobalion":{"level":79,"moves":["closecombat","hiddenpowerice","ironhead","stealthrock","stoneedge","swordsdance","taunt","thunderwave","voltswitch"]},"terrakion":{"level":78,"moves":["closecombat","earthquake","quickattack","stealthrock","stoneedge","swordsdance"]},"virizion":{"level":81,"moves":["closecombat","leafblade","stoneedge","swordsdance"]},"tornadus":{"level":81,"moves":["acrobatics","bulkup","focusblast","heatwave","hurricane","superpower","taunt","uturn"]},"tornadustherian":{"level":76,"moves":["focusblast","heatwave","hurricane","superpower","uturn"]},"thundurus":{"level":76,"moves":["focusblast","hiddenpowerice","nastyplot","thunderbolt","thunderwave","voltswitch"]},"thundurustherian":{"level":80,"moves":["agility","focusblast","grassknot","hiddenpowerice","nastyplot","thunderbolt"]},"reshiram":{"level":76,"moves":["blueflare","dracometeor","roost","stoneedge","tailwind"]},"zekrom":{"level":75,"moves":["boltstrike","dracometeor","focusblast","honeclaws","outrage","roost","substitute","voltswitch"]},"landorus":{"level":76,"moves":["earthpower","focusblast","psychic","rockpolish","rockslide","sludgewave"]},"landorustherian":{"level":80,"moves":["earthquake","rockpolish","stealthrock","stoneedge","superpower","swordsdance","uturn"]},"kyurem":{"level":78,"moves":["dracometeor","earthpower","focusblast","icebeam","outrage","roost","substitute"]},"kyuremblack":{"level":78,"moves":["dragonclaw","earthpower","fusionbolt","icebeam","roost","substitute"]},"kyuremwhite":{"level":74,"moves":["dracometeor","earthpower","focusblast","fusionflare","icebeam","roost","substitute"]},"keldeo":{"level":79,"moves":["calmmind","hiddenpowergrass","hydropump","icywind","scald","secretsword","substitute"]},"meloetta":{"level":81,"moves":["calmmind","focusblast","psychic","shadowball","uturn"]},"meloettapirouette":{"level":81,"moves":["closecombat","icepunch","relicsong","return","shadowclaw"]},"genesect":{"level":75,"moves":["bugbuzz","flamethrower","icebeam","ironhead","rockpolish","thunderbolt","uturn"]}} as any;
/* eslint-enable */

export class RandomGen5Teams extends RandomGen6Teams {
	randomData: {[species: string]: OldRandomBattleSpecies} = randomDataJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);
		this.moveEnforcementCheckers = {
			lead: (movePool, moves, abilities, types, counter) => (
				movePool.includes('stealthrock') &&
				!!counter.get('Status') &&
				!counter.setupType &&
				!counter.get('speedsetup') &&
				!moves.has('substitute')
			),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
			Dragon: (movePool, moves, abilities, types, counter) => !counter.get('Dragon'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric') || movePool.includes('thunder'),
			Fighting: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Fighting') &&
				(species.baseStats.atk >= 90 || abilities.has('Pure Power') || !!counter.setupType || !counter.get('Status'))
			),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter) => (
				!counter.get('Flying') && (types.has('Normal') || abilities.has('Serene Grace'))
			),
			Ghost: (movePool, moves, abilities, types, counter) => !types.has('Dark') && !counter.get('Ghost'),
			Grass: movePool => (['hornleech', 'seedflare', 'woodhammer'].some(m => movePool.includes(m))),
			Ground: (movePool, moves, abilities, types, counter) => (
				!counter.get('Ground') && !moves.has('rest') && !moves.has('sleeptalk')
			),
			Ice: (movePool, moves, abilities, types, counter) => !counter.get('Ice'),
			Normal: (movePool, moves, abilities, types, counter, species) => (
				movePool.includes('return') && species.baseStats.atk > 80
			),
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock') && species.baseStats.atk >= 80,
			Steel: (movePool, moves, abilities, types, counter) => !counter.get('Steel') && abilities.has('Technician'),
			Water: (movePool, moves, abilities, types, counter) => (
				!counter.get('Water') || (abilities.has('Adaptability') && movePool.includes('waterfall'))
			),
			Contrary: (movePool, moves, abilities, types, counter, species, teamDetails) => (
				!counter.get('contrary') && species.name !== 'Shuckle'
			),
			Guts: (movePool, moves, abilities, types) => types.has('Normal') && movePool.includes('facade'),
			'Slow Start': movePool => movePool.includes('substitute'),
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
		const hasRestTalk = moves.has('rest') && moves.has('sleeptalk');
		switch (move.id) {
		// Not very useful without their supporting moves
		case 'endeavor':
			return {cull: !isLead};
		case 'focuspunch':
			return {cull: !moves.has('substitute') || counter.damagingMoves.size < 2 || moves.has('swordsdance')};
		case 'lightscreen':
			if (movePool.length > 1) {
				const screen = movePool.indexOf('reflect');
				if (screen >= 0) this.fastPop(movePool, screen);
			}
			return {cull: !moves.has('reflect')};
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
			return {cull: !counter.setupType && !moves.has('cosmicpower')};
		case 'weatherball':
			return {cull: !moves.has('sunnyday')};

		// Set up once and only if we have the moves for it
		case 'bellydrum': case 'bulkup': case 'coil': case 'curse': case 'dragondance': case 'honeclaws': case 'swordsdance':
			return {cull: (counter.setupType !== 'Physical' || counter.get('physicalsetup') > 1 || (
				counter.get('Physical') + counter.get('physicalpool') < 2 &&
				!hasRestTalk
			)), isSetup: true};
		case 'calmmind': case 'nastyplot': case 'tailglow':
			return {cull: (counter.setupType !== 'Special' || counter.get('specialsetup') > 1 || (
				counter.get('Special') + counter.get('specialpool') < 2 &&
				!hasRestTalk
			)), isSetup: true};
		case 'growth': case 'shellsmash': case 'workup':
			const moveTotal = counter.damagingMoves.size + counter.get('physicalpool') + counter.get('specialpool');
			return {
				cull: (
					counter.setupType !== 'Mixed' ||
					counter.get('mixedsetup') > 1 ||
					moveTotal < 2 ||
					(move.id === 'growth' && !moves.has('sunnyday'))
				),
				isSetup: true,
			};
		case 'agility': case 'autotomize': case 'rockpolish':
			return {
				cull: (
					(counter.damagingMoves.size < 2 && !counter.setupType) ||
					hasRestTalk
				),
				isSetup: !counter.setupType,
			};

		// Bad after setup
		case 'bulletpunch':
			return {cull: !!counter.get('speedsetup')};
		case 'circlethrow': case 'dragontail':
			return {cull: moves.has('substitute') || (!!counter.setupType && !moves.has('rest') && !moves.has('sleeptalk'))};
		case 'fakeout': case 'healingwish':
			return {cull: !!counter.setupType || !!counter.get('recovery') || moves.has('substitute')};
		case 'haze': case 'magiccoat': case 'pursuit': case 'spikes':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('rest') || moves.has('trickroom')};
		case 'iceshard':
			return {cull: moves.has('shellsmash')};
		case 'leechseed': case 'roar': case 'whirlwind':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('dragontail')};
		case 'nightshade': case 'seismictoss': case 'superfang':
			return {cull: !!counter.setupType || counter.damagingMoves.size > 1};
		case 'protect':
			return {cull: (
				moves.has('rest') ||
				(counter.setupType && !abilities.has('Speed Boost') && !moves.has('wish')) ||
				moves.has('lightscreen') && moves.has('reflect')
			)};
		case 'rapidspin':
			return {cull: moves.has('shellsmash') || (!!counter.setupType && counter.get('Status') >= 2)};
		case 'stealthrock':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('rest') || !!teamDetails.stealthRock};
		case 'switcheroo': case 'trick':
			return {cull: (
				counter.get('Physical') + counter.get('Special') < 3 ||
				['fakeout', 'rapidspin', 'suckerpunch'].some(m => moves.has(m))
			)};
		case 'toxic':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('trickroom')};
		case 'toxicspikes':
			return {cull: !!counter.setupType || !!teamDetails.toxicSpikes};
		case 'trickroom':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				counter.damagingMoves.size < 2 ||
				moves.has('lightscreen') || moves.has('reflect')
			)};
		case 'uturn':
			// Infernape doesn't want mixed sets with U-turn
			const infernapeCase = species.id === 'infernape' && !!counter.get('Special');
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || infernapeCase};
		case 'voltswitch':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				['magnetrise', 'uturn'].some(m => moves.has(m))
			)};

		// Ineffective having both
		// Attacks:
		case 'bugbite':
			return {cull: moves.has('uturn')};
		case 'crunch':
			return {cull: !types.has('Dark') && moves.has('suckerpunch')};
		case 'dragonpulse': case 'spacialrend':
			return {cull: moves.has('dracometeor') || moves.has('outrage')};
		case 'thunderbolt':
			return {cull: moves.has('wildcharge')};
		case 'drainpunch': case 'focusblast':
			return {cull: moves.has('closecombat') || moves.has('lowkick')};
		case 'blueflare': case 'flareblitz': case 'fierydance': case 'flamethrower': case 'lavaplume':
			return {cull: ['fireblast', 'overheat', 'vcreate'].some(m => moves.has(m))};
		case 'bravebird': case 'pluck':
			return {cull: moves.has('acrobatics') || moves.has('hurricane')};
		case 'acrobatics':
			return {cull: !counter.setupType && moves.has('hurricane')};
		case 'hurricane':
			return {cull: !!counter.setupType && moves.has('acrobatics')};
		case 'gigadrain':
			return {cull: (!counter.setupType && moves.has('leafstorm')) ||
				['petaldance', 'powerwhip'].some(m => moves.has(m))};
		case 'solarbeam':
			return {cull: (!abilities.has('Drought') && !moves.has('sunnyday')) || moves.has('gigadrain')};
		case 'leafstorm':
			return {cull: !!counter.setupType && (moves.has('gigadrain') || moves.has('seedbomb'))};
		case 'seedbomb':
			return {cull: !counter.setupType && (moves.has('leafstorm'))};
		case 'bonemerang': case 'earthpower':
			return {cull: moves.has('earthquake')};
		case 'extremespeed': case 'headsmash':
			return {cull: moves.has('roost')};
		case 'facade':
			return {cull: moves.has('suckerpunch') && !types.has('Normal')};
		case 'hydropump':
			return {cull: moves.has('waterfall') && !!counter.setupType};
		case 'judgment':
			return {cull: counter.setupType !== 'Special' && counter.get('stab') > 1};
		case 'return':
			return {cull: moves.has('doubleedge')};
		case 'rockblast':
			return {cull: moves.has('stoneedge')};
		case 'poisonjab':
			return {cull: moves.has('gunkshot')};
		case 'psychic':
			return {cull: moves.has('psyshock')};
		case 'scald': case 'surf':
			return {cull: moves.has('hydropump') || moves.has('waterfall')};
		case 'shadowball':
			// mono-Psychic types with Calm Mind shouldn't have Shadow Ball as their only coverage
			// Chimecho is exempt since Shadow Ball is its only coverage move
			return {cull: types.has('Psychic') && types.size < 2 && counter.get('Special') < 3 &&
				moves.has('calmmind') && species.id !== 'chimecho'};
		case 'waterfall':
			return {cull: moves.has('hydropump') && !counter.setupType && !moves.has('raindance') && !teamDetails.rain};
		case 'waterspout':
			return {cull: !!counter.get('Status')};

		// Status:
		case 'encore': case 'icepunch': case 'raindance': case 'suckerpunch':
			return {cull: moves.has('thunderwave') || hasRestTalk};
		case 'glare': case 'headbutt':
			return {cull: moves.has('bodyslam')};
		case 'healbell':
			return {cull: !!counter.get('speedsetup') || moves.has('magiccoat')};
		case 'moonlight': case 'painsplit': case 'recover': case 'roost': case 'softboiled': case 'synthesis':
			// Prevent Roost + Protect on Gliscor
			const gliscorCase = species.id === 'gliscor' && moves.has('protect');
			return {cull: ['leechseed', 'rest', 'wish'].some(m => moves.has(m)) || gliscorCase};
		case 'substitute':
			return {cull: (
				(moves.has('doubleedge') && !abilities.has('rockhead')) ||
				['pursuit', 'rest', 'superpower', 'uturn', 'voltswitch'].some(m => moves.has(m)) ||
				// Sceptile wants Swords Dance
				(moves.has('acrobatics') && moves.has('earthquake')) ||
				movePool.includes('shiftgear')
			)};
		case 'thunderwave':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				hasRestTalk ||
				moves.has('discharge') || moves.has('trickroom')
			)};
		case 'willowisp':
			return {cull: moves.has('lavaplume') || moves.has('scald') && !types.has('Ghost')};
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
		case 'Anger Point': case 'Gluttony': case 'Moody': case 'Sand Veil': case 'Snow Cloak': case 'Steadfast':
			return true;
		case 'Analytic': case 'Download': case 'Hyper Cutter':
			return species.nfe;
		case 'Chlorophyll': case 'Solar Power':
			return (abilities.has('Harvest') || (!moves.has('sunnyday') && !teamDetails.sun));
		case 'Compound Eyes': case 'No Guard':
			return !counter.get('inaccurate');
		case 'Contrary': case 'Iron Fist': case 'Skill Link':
			return !counter.get(toID(ability));
		case 'Defiant': case 'Moxie':
			return !counter.get('Physical');
		case 'Flash Fire':
			return abilities.has('Drought');
		case 'Guts':
			return (species.id === 'heracross');
		case 'Hydration': case 'Rain Dish': case 'Swift Swim':
			return (!moves.has('raindance') && !teamDetails.rain);
		case 'Hustle':
			return counter.get('Physical') < 2;
		case 'Ice Body':
			return !teamDetails.hail;
		case 'Immunity':
			return abilities.has('Toxic Boost');
		case 'Intimidate':
			return moves.has('rest') || species.id === 'staraptor';
		case 'Lightning Rod':
			return species.types.includes('Ground');
		case 'Limber':
			return species.types.includes('Electric');
		case 'Mold Breaker':
			return (
				abilities.has('Adaptability') ||
				moves.has('rest') && moves.has('sleeptalk') ||
				(abilities.has('Sheer Force') && !!counter.get('sheerforce'))
			);
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Poison Heal':
			return (abilities.has('Technician') && !!counter.get('technician'));
		case 'Prankster':
			return !counter.get('Status');
		case 'Pressure': case 'Synchronize':
			return (counter.get('Status') < 2 || abilities.has('Trace'));
		case 'Reckless': case 'Rock Head':
			return (!counter.get('recoil') || abilities.has('Sap Sipper'));
		case 'Regenerator':
			return abilities.has('Magic Guard');
		case 'Sand Force': case 'Sand Rush':
			return !teamDetails.sand;
		case 'Serene Grace':
			return (!counter.get('serenegrace') || species.id === 'blissey');
		case 'Sheer Force':
			return (!counter.get('sheerforce') || abilities.has('Guts'));
		case 'Sturdy':
			return (!!counter.get('recoil') && !counter.get('recovery'));
		case 'Swarm':
			return !counter.get('Bug');
		case 'Technician':
			return (!counter.get('technician') || moves.has('tailslap'));
		case 'Tinted Lens':
			return (abilities.has('Insomnia') || abilities.has('Magic Guard') || moves.has('protect'));
		case 'Unaware':
			return (!!counter.setupType || abilities.has('Magic Guard'));
		case 'Unburden':
			return species.baseStats.spe > 100 && !moves.has('acrobatics');
		case 'Water Absorb':
			return (abilities.has('Drizzle') || abilities.has('Unaware') || abilities.has('Volt Absorb'));
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
	): string {
		const abilityData = Array.from(abilities).map(a => this.dex.abilities.get(a));
		Utils.sortBy(abilityData, abil => -abil.rating);

		if (abilityData.length <= 1) return abilityData[0].name;

		// Hard-code abilities here
		if (abilities.has('Guts') && moves.has('facade') && (!abilities.has('Quick Feet') || !counter.setupType)) return 'Guts';
		if (abilities.has('Prankster') && counter.get('Status') > 1) return 'Prankster';
		if (abilities.has('Quick Feet') && moves.has('facade')) return 'Quick Feet';
		if (abilities.has('Swift Swim') && moves.has('raindance')) return 'Swift Swim';
		if (species.name === 'Altaria') return 'Natural Cure';
		// Mandibuzz doesn't want Weak Armor
		if (species.name === 'Mandibuzz') return this.sample(['Big Pecks', 'Overcoat']);

		let abilityAllowed: Ability[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilityData) {
			if (ability.rating >= 1 && !this.shouldCullAbility(
				ability.name, types, moves, abilities, counter, movePool, teamDetails, species
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

		if (species.name === 'Marowak') return 'Thick Club';
		if (species.name === 'Farfetch\u2019d') return 'Stick';
		if (species.name === 'Latias' || species.name === 'Latios') return 'Soul Dew';
		if (species.name === 'Pikachu') return 'Light Ball';
		if (species.name === 'Shedinja' || species.name === 'Smeargle') return 'Focus Sash';
		if (species.name === 'Unown') return 'Choice Specs';
		if (species.name === 'Wobbuffet' && moves.has('destinybond') && this.randomChance(1, 2)) return 'Custap Berry';
		if (ability === 'Imposter') return 'Choice Scarf';
		if (moves.has('switcheroo') || moves.has('trick')) {
			if (species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && !counter.get('priority')) {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (species.nfe) return 'Eviolite';
		if (moves.has('shellsmash')) return 'White Herb';
		if (ability === 'Harvest' || moves.has('bellydrum')) return 'Sitrus Berry';
		if ((ability === 'Magic Guard' || ability === 'Sheer Force') && counter.damagingMoves.size > 1) return 'Life Orb';
		if (
			ability === 'Poison Heal' ||
			ability === 'Toxic Boost' ||
			(ability === 'Quick Feet' && moves.has('facade'))
		) {
			return 'Toxic Orb';
		}
		if (moves.has('psychoshift')) return 'Flame Orb';
		if (moves.has('rest') && !moves.has('sleeptalk') && ability !== 'Natural Cure' && ability !== 'Shed Skin') {
			return 'Chesto Berry';
		}
		if (ability === 'Guts' && moves.has('facade')) {
			return (types.has('Fire') || moves.has('uturn') || moves.has('voltswitch')) ? 'Toxic Orb' : 'Flame Orb';
		}
		if (moves.has('raindance')) return (ability === 'Forecast') ? 'Damp Rock' : 'Life Orb';
		if (moves.has('sunnyday')) return (ability === 'Forecast' || ability === 'Flower Gift') ? 'Heat Rock' : 'Life Orb';
		if (moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (moves.has('acrobatics')) return 'Flying Gem';
		if (ability === 'Unburden') return moves.has('fakeout') ? 'Normal Gem' : `${species.types[0]} Gem`;
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
	): string | undefined {
		if (
			ability === 'Speed Boost' &&
			!moves.has('substitute') &&
			counter.get('Physical') + counter.get('Special') > 2
		) {
			return 'Life Orb';
		}
		if (
			counter.get('Physical') >= 4 &&
			['dragontail', 'fakeout', 'flamecharge'].every(m => !moves.has(m)) &&
			!moves.has('suckerpunch') &&
			(!moves.has('rapidspin') || this.dex.getEffectiveness('Rock', species) < 1)
		) {
			return (
				(species.baseStats.atk >= 100 || abilities.has('Huge Power')) &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				!counter.get('priority') &&
				this.randomChance(2, 3)
			) ? 'Choice Scarf' : 'Choice Band';
		}
		if (counter.get('Special') >= 4 || (counter.get('Special') >= 3 && moves.has('uturn'))) {
			return (
				species.baseStats.spa >= 100 &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				!moves.has('uturn') &&
				(ability === 'Download' || this.randomChance(2, 3))
			) ? 'Choice Scarf' : 'Choice Specs';
		}

		if (counter.setupType && moves.has('outrage')) return 'Lum Berry';
		if (this.dex.getEffectiveness('Ground', species) >= 2 && ability !== 'Levitate') return 'Air Balloon';
		if (counter.get('Dark') >= 3) return 'Black Glasses';
		if (species.name === 'Palkia' && (moves.has('dracometeor') || moves.has('spacialrend'))) {
			return 'Lustrous Orb';
		}
		if (
			types.has('Poison') ||
			['bodyslam', 'dragontail', 'protect', 'scald', 'sleeptalk', 'substitute'].some(m => moves.has(m))
		) {
			return 'Leftovers';
		}
		if (counter.damagingMoves.size >= 4 && ability !== 'Sturdy') {
			return moves.has('uturn') ? 'Expert Belt' : 'Life Orb';
		}
		if (
			isLead &&
			counter.get('hazards') &&
			!counter.get('recovery') &&
			ability !== 'Regenerator' &&
			species.baseStats.hp + species.baseStats.def + species.baseStats.spd <= 275
		) {
			return ability === 'Sturdy' ? 'Custap Berry' : 'Focus Sash';
		}
		if (moves.has('voltswitch') && species.baseStats.spe <= 90) {
			return 'Leftovers';
		}
		if (
			counter.damagingMoves.size >= 3 &&
			species.baseStats.spe >= 40 &&
			species.baseStats.hp + species.baseStats.def + species.baseStats.spd <= 275 &&
			ability !== 'Sturdy' &&
			!moves.has('rapidspin') && !moves.has('uturn')
		) {
			return 'Life Orb';
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

		const movePool = (data.moves || Object.keys(this.dex.species.getLearnset(species.id)!)).slice();
		const rejectedPool = [];
		const moves = new Set<string>();
		let ability = '';

		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs: SparseStatsTable = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
		const types = new Set(species.types);
		const abilities = new Set(Object.values(species.abilities));
		if (species.unreleasedHidden) abilities.delete(species.abilities.H);

		let availableHP = 0;
		for (const setMoveid of movePool) {
			if (setMoveid.startsWith('hiddenpower')) availableHP++;
		}

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
					if (hasHiddenPower) {
						continue;
					}
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
					const stabs = counter.get(species.types[0]) + (counter.get(species.types[1]) || 0);
					if (!types.has(move.type) || stabs > 1 || counter.get(move.category) < 2) cull = true;
				}
				if (
					!isSetup &&
					counter.setupType &&
					counter.setupType !== 'Mixed' &&
					move.category !== counter.setupType &&
					counter.get(counter.setupType) < 2 &&
					(move.category !== 'Status' || !move.flags.heal) &&
					moveid !== 'sleeptalk' && (
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
					!cull &&
					!['judgment', 'lightscreen', 'quiverdance', 'reflect', 'sleeptalk'].includes(moveid) &&
					!isSetup && !move.weather && !move.damage && (move.category !== 'Status' || !move.flags.heal) && (
						move.category === 'Status' ||
						!types.has(move.type) ||
						move.basePower && move.basePower < 40 && !move.multihit
					) && (counter.get('physicalsetup') + counter.get('specialsetup') < 2 && (
						!counter.setupType ||
						counter.setupType === 'Mixed' ||
						(move.category !== counter.setupType && move.category !== 'Status') ||
						counter.get(counter.setupType) + counter.get('Status') > 3
					))
				) {
					if (
						(
							!counter.get('stab') &&
							!counter.get('damage') && (
								species.types.length > 1 ||
								(species.types[0] !== 'Normal' && species.types[0] !== 'Psychic') ||
								!moves.has('icebeam') ||
								species.baseStats.spa >= species.baseStats.spd
							)
						) || (
							!counter.get('recovery') &&
							!counter.setupType &&
							['healingwish', 'trick', 'trickroom'].every(m => !moves.has(m)) &&
							!abilities.has('Poison Heal') &&
							(counter.get('Status') || (species.nfe && !!counter.get('Status'))) &&
							(['recover', 'roost', 'slackoff', 'softboiled'].some(m => movePool.includes(m)))
						) || (
							(movePool.includes('moonlight') && types.size < 2 && !moves.has('trickroom')) ||
							movePool.includes('darkvoid') ||
							movePool.includes('milkdrink') ||
							movePool.includes('quiverdance') ||
							(species.requiredMove && movePool.includes(toID(species.requiredMove)))
						) || (
							isLead && runEnforcementChecker('lead')
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
				const isHP = moveid.startsWith('hiddenpower');
				if (
					cull &&
					(movePool.length - availableHP || availableHP && (isHP || !hasHiddenPower))
				) {
					if (
						move.category !== 'Status' && !move.damage && !move.flags.charge &&
						(!isHP || !availableHP)
					) rejectedPool.push(moveid);
					moves.delete(moveid);
					if (isHP) hasHiddenPower = false;
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
				if (move.startsWith('hiddenpower')) hpType = move.substr(11);
			}
			if (!hpType) throw new Error(`hasHiddenPower is true, but no Hidden Power move was found.`);
			const HPivs = this.dex.types.get(hpType).HPivs;
			let iv: StatID;
			for (iv in HPivs) {
				ivs[iv] = HPivs[iv];
			}
		}

		ability = this.getAbility(types, moves, abilities, counter, movePool, teamDetails, species);

		let item = this.getHighPriorityItem(ability, types, moves, counter, teamDetails, species, isLead);
		if (item === undefined) {
			item = this.getLowPriorityItem(ability, types, moves, abilities, counter, teamDetails, species, isLead);
		}
		if (item === undefined) item = 'Leftovers';
		if (item === 'Leftovers' && types.has('Poison')) {
			item = 'Black Sludge';
		}

		const level = this.adjustLevel || data.level || (species.nfe ? 90 : 80);

		// Prepare optimal HP
		const srWeakness = this.dex.getEffectiveness('Rock', species);
		while (evs.hp > 1) {
			const hp = Math.floor(
				Math.floor(
					2 * species.baseStats.hp + (ivs.hp || 31) + Math.floor(evs.hp / 4) + 100
				) * level / 100 + 10
			);
			if (moves.has('bellydrum') && item === 'Sitrus Berry') {
				// Belly Drum should activate Sitrus Berry
				if (hp % 2 === 0) break;
			} else {
				// Maximize number of Stealth Rock switch-ins
				if (srWeakness <= 0 || hp % (4 / srWeakness) > 0) break;
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
		const pokemon: RandomTeamsTypes.RandomSet[] = [];

		// For Monotype
		const isMonotype = !!this.forceMonotype || ruleTable.has('sametypeclause');
		const typePool = this.dex.types.names();
		const type = this.forceMonotype || this.sample(typePool);

		const baseFormes: {[k: string]: number} = {};
		const tierCount: {[k: string]: number} = {};
		const typeCount: {[k: string]: number} = {};
		const typeComboCount: {[k: string]: number} = {};
		const typeWeaknesses: {[k: string]: number} = {};
		const teamDetails: RandomTeamsTypes.TeamDetails = {};

		const pokemonPool = this.getPokemonPool(type, pokemon, isMonotype);

		while (pokemonPool.length && pokemon.length < this.maxTeamSize) {
			const species = this.dex.species.get(this.sampleNoReplace(pokemonPool));
			if (!species.exists || !this.randomData[species.id]?.moves) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[species.baseSpecies]) continue;

			// Adjust rate for species with multiple sets
			switch (species.baseSpecies) {
			case 'Arceus':
				if (this.randomChance(16, 17) && !isMonotype) continue;
				break;
			case 'Rotom':
				if (this.gen < 5 && this.randomChance(5, 6) && !isMonotype) continue;
				break;
			case 'Basculin': case 'Castform': case 'Meloetta':
				if (this.randomChance(1, 2) && this.gen === 5) continue;
				break;
			case 'Cherrim':
				if (this.randomChance(1, 2) && this.gen === 4) continue;
				break;
			}

			// Illusion shouldn't be in the last slot
			if (species.name === 'Zoroark' && pokemon.length > 4) continue;

			// Dynamically scale limits for different team sizes. The default and minimum value is 1.
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;
			const tier = species.tier;

			// Limit two Pokemon per tier
			if (this.gen === 5 && !isMonotype && !this.forceMonotype && tierCount[tier] >= 2 * limitFactor) continue;

			const set = this.randomSet(species, teamDetails, pokemon.length === 0);

			const types = species.types;
			let typeCombo = types.slice().sort().join();

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

				// Limit one of any type combination
				if (set.ability === 'Drought' || set.ability === 'Drizzle' || set.ability === 'Sand Stream') {
					// Drought, Drizzle and Sand Stream don't count towards the type combo limit
					typeCombo = set.ability;
					if (typeCombo in typeComboCount) continue;
				} else {
					if (typeComboCount[typeCombo] >= 1 * limitFactor) continue;
				}
			}

			// Okay, the set passes, add it to our team
			pokemon.push(set);

			if (pokemon.length === this.maxTeamSize) {
				// Set Zoroark's level to be the same as the last Pokemon
				const illusion = teamDetails.illusion;
				if (illusion) pokemon[illusion - 1].level = pokemon[this.maxTeamSize - 1].level;
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

			// Team details
			if (set.ability === 'Snow Warning' || set.moves.includes('hail')) teamDetails.hail = 1;
			if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails.rain = 1;
			if (set.ability === 'Sand Stream') teamDetails.sand = 1;
			if (set.moves.includes('stealthrock')) teamDetails.stealthRock = 1;
			if (set.moves.includes('toxicspikes')) teamDetails.toxicSpikes = 1;
			if (set.moves.includes('rapidspin')) teamDetails.rapidSpin = 1;

			// For setting Zoroark's level
			if (set.ability === 'Illusion') teamDetails.illusion = pokemon.length;
		}
		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}

		return pokemon;
	}
}

export default RandomGen5Teams;
