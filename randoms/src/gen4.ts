import {MoveCounter, OldRandomBattleSpecies} from './gen8';
import {RandomGen5Teams} from './gen5';
import {Utils} from './utils';
import {
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
const randomDataJSON = {"venusaur":{"level":84,"moves":["earthquake","hiddenpowerice","leafstorm","leechseed","powerwhip","sleeppowder","sludgebomb","swordsdance","synthesis"]},"charizard":{"level":84,"moves":["airslash","dragonpulse","fireblast","flamethrower","hiddenpowergrass","roost"]},"blastoise":{"level":84,"moves":["icebeam","rapidspin","rest","roar","sleeptalk","surf","toxic"]},"butterfree":{"level":91,"moves":["bugbuzz","safeguard","sleeppowder","stunspore","uturn"]},"beedrill":{"level":93,"moves":["brickbreak","poisonjab","swordsdance","toxicspikes","uturn","xscissor"]},"pidgeot":{"level":88,"moves":["bravebird","doubleedge","heatwave","pursuit","quickattack","uturn"]},"raticate":{"level":87,"moves":["crunch","facade","protect","suckerpunch","swordsdance","uturn"]},"fearow":{"level":87,"moves":["doubleedge","drillpeck","pursuit","quickattack","return","uturn"]},"arbok":{"level":91,"moves":["aquatail","crunch","earthquake","glare","gunkshot","poisonjab","seedbomb","switcheroo"]},"pikachu":{"level":89,"moves":["grassknot","hiddenpowerice","substitute","surf","thunderbolt","volttackle"]},"raichu":{"level":87,"moves":["encore","focusblast","focuspunch","grassknot","hiddenpowerice","nastyplot","substitute","thunderbolt"]},"sandslash":{"level":89,"moves":["earthquake","nightslash","rapidspin","stealthrock","stoneedge","substitute","swordsdance"]},"nidoqueen":{"level":86,"moves":["earthquake","fireblast","icebeam","roar","stealthrock","toxicspikes"]},"nidoking":{"level":84,"moves":["earthquake","fireblast","icebeam","megahorn","stealthrock","suckerpunch","thunderbolt"]},"clefable":{"level":83,"moves":["calmmind","doubleedge","fireblast","icebeam","softboiled","stealthrock","thunderbolt"]},"ninetales":{"level":84,"moves":["energyball","fireblast","flamethrower","hiddenpowerrock","hypnosis","nastyplot"]},"wigglytuff":{"level":90,"moves":["bodyslam","doubleedge","fireblast","healbell","protect","seismictoss","stealthrock","thunderwave","toxic","wish"]},"vileplume":{"level":88,"moves":["energyball","hiddenpowerfire","moonlight","sleeppowder","sludgebomb","solarbeam","sunnyday"]},"parasect":{"level":94,"moves":["seedbomb","spore","stunspore","synthesis","xscissor"]},"venomoth":{"level":87,"moves":["bugbuzz","psychic","roost","sleeppowder","stunspore","substitute","toxicspikes","uturn"]},"dugtrio":{"level":84,"moves":["earthquake","nightslash","stealthrock","stoneedge","substitute","suckerpunch"]},"persian":{"level":88,"moves":["bite","fakeout","hypnosis","nastyplot","return","swift","taunt","uturn","waterpulse"]},"golduck":{"level":88,"moves":["calmmind","encore","hiddenpowergrass","hydropump","icebeam","psychic","surf"]},"primeape":{"level":84,"moves":["closecombat","encore","icepunch","punishment","stoneedge","uturn"]},"arcanine":{"level":83,"moves":["extremespeed","flareblitz","hiddenpowergrass","morningsun","thunderfang","toxic","willowisp"]},"poliwrath":{"level":88,"moves":["brickbreak","bulkup","encore","focuspunch","icepunch","rest","sleeptalk","substitute","toxic","waterfall"]},"alakazam":{"level":83,"moves":["encore","focusblast","hiddenpowerfire","psychic","shadowball","signalbeam","substitute","trick"]},"machamp":{"level":80,"moves":["bulkup","bulletpunch","dynamicpunch","icepunch","payback","stoneedge","substitute"]},"victreebel":{"level":88,"moves":["leafblade","leafstorm","sleeppowder","sludgebomb","solarbeam","suckerpunch","sunnyday","weatherball"]},"tentacruel":{"level":82,"moves":["hydropump","icebeam","rapidspin","sludgebomb","surf","toxicspikes"]},"golem":{"level":88,"moves":["earthquake","explosion","hammerarm","stealthrock","stoneedge","suckerpunch"]},"rapidash":{"level":86,"moves":["flareblitz","hypnosis","megahorn","morningsun","willowisp"]},"slowbro":{"level":84,"moves":["calmmind","psychic","rest","slackoff","sleeptalk","surf","thunderwave","toxic","trickroom"]},"farfetchd":{"level":100,"moves":["heatwave","leafblade","nightslash","return","swordsdance","uturn"]},"dodrio":{"level":88,"moves":["bravebird","doubleedge","pursuit","quickattack","return","roost"]},"dewgong":{"level":89,"moves":["encore","icebeam","raindance","rest","surf","toxic"]},"muk":{"level":88,"moves":["brickbreak","curse","explosion","gunkshot","icepunch","payback","poisonjab","rest","shadowsneak","sleeptalk"]},"cloyster":{"level":85,"moves":["explosion","iceshard","rapidspin","rockblast","spikes","surf","toxicspikes"]},"gengar":{"level":79,"moves":["focusblast","hiddenpowerfire","hypnosis","painsplit","shadowball","sludgebomb","substitute","thunderbolt","trick"]},"hypno":{"level":90,"moves":["protect","seismictoss","thunderwave","toxic","wish"]},"kingler":{"level":88,"moves":["agility","crabhammer","return","superpower","swordsdance","xscissor"]},"electrode":{"level":88,"moves":["explosion","hiddenpowerice","signalbeam","taunt","thunderbolt"]},"exeggutor":{"level":86,"moves":["explosion","hiddenpowerfire","leafstorm","psychic","sleeppowder","solarbeam","sunnyday","synthesis"]},"marowak":{"level":88,"moves":["doubleedge","earthquake","firepunch","substitute","swordsdance","thunderpunch"]},"hitmonlee":{"level":84,"moves":["closecombat","earthquake","machpunch","stoneedge","substitute","suckerpunch"]},"hitmonchan":{"level":87,"moves":["bulkup","closecombat","drainpunch","icepunch","machpunch","rapidspin","stoneedge"]},"weezing":{"level":86,"moves":["fireblast","painsplit","rest","sleeptalk","sludgebomb","thunderbolt","willowisp"]},"kangaskhan":{"level":84,"moves":["doubleedge","earthquake","fakeout","focuspunch","hammerarm","return","substitute","suckerpunch"]},"seaking":{"level":89,"moves":["icebeam","megahorn","raindance","return","waterfall"]},"starmie":{"level":80,"moves":["hydropump","icebeam","psychic","rapidspin","recover","surf","thunderbolt"]},"mrmime":{"level":88,"moves":["batonpass","encore","focusblast","nastyplot","psychic","shadowball","substitute","taunt","thunderbolt"]},"scyther":{"level":84,"moves":["aerialace","brickbreak","bugbite","pursuit","quickattack","roost","swordsdance","uturn"]},"jynx":{"level":84,"moves":["focusblast","icebeam","lovelykiss","nastyplot","psychic","substitute"]},"pinsir":{"level":86,"moves":["closecombat","earthquake","quickattack","stealthrock","stoneedge","swordsdance","xscissor"]},"tauros":{"level":81,"moves":["doubleedge","earthquake","payback","pursuit","return","stoneedge"]},"gyarados":{"level":80,"moves":["bounce","dragondance","earthquake","icefang","rest","sleeptalk","stoneedge","waterfall"]},"lapras":{"level":87,"moves":["healbell","hydropump","icebeam","surf","thunderbolt","toxic"]},"ditto":{"level":100,"moves":["transform"]},"vaporeon":{"level":82,"moves":["icebeam","protect","roar","surf","toxic","wish"]},"jolteon":{"level":82,"moves":["batonpass","hiddenpowergrass","hiddenpowerice","substitute","thunderbolt","yawn"]},"flareon":{"level":92,"moves":["fireblast","hiddenpowergrass","lavaplume","protect","superpower","toxic","wish"]},"omastar":{"level":84,"moves":["earthpower","hiddenpowergrass","hydropump","icebeam","raindance","spikes","stealthrock","surf"]},"kabutops":{"level":84,"moves":["aquajet","rapidspin","stealthrock","stoneedge","superpower","swordsdance","waterfall"]},"aerodactyl":{"level":80,"moves":["earthquake","rockslide","roost","stealthrock","stoneedge","taunt"]},"snorlax":{"level":81,"moves":["bodyslam","crunch","curse","earthquake","firepunch","pursuit","rest","return","selfdestruct","sleeptalk","whirlwind"]},"articuno":{"level":84,"moves":["healbell","icebeam","roar","roost","substitute","toxic"]},"zapdos":{"level":79,"moves":["heatwave","hiddenpowergrass","hiddenpowerice","roost","substitute","thunderbolt","toxic","uturn"]},"moltres":{"level":83,"moves":["airslash","fireblast","flamethrower","hiddenpowergrass","roost","substitute","toxic","uturn"]},"dragonite":{"level":79,"moves":["dracometeor","dragonclaw","dragondance","earthquake","extremespeed","fireblast","firepunch","outrage","roost","superpower"]},"mewtwo":{"level":72,"moves":["aurasphere","calmmind","fireblast","icebeam","psychic","recover","selfdestruct","substitute","taunt","willowisp"]},"mew":{"level":76,"moves":["aurasphere","batonpass","explosion","flamethrower","nastyplot","psychic","softboiled","stealthrock","taunt","uturn","willowisp"]},"meganium":{"level":89,"moves":["aromatherapy","energyball","leechseed","lightscreen","reflect","synthesis","toxic"]},"typhlosion":{"level":84,"moves":["eruption","fireblast","focusblast","hiddenpowergrass","hiddenpowerrock"]},"feraligatr":{"level":84,"moves":["aquajet","dragondance","earthquake","icepunch","lowkick","return","swordsdance","waterfall"]},"furret":{"level":91,"moves":["aquatail","brickbreak","doubleedge","firepunch","return","shadowclaw","suckerpunch","trick","uturn"]},"noctowl":{"level":94,"moves":["nightshade","reflect","roost","toxic","whirlwind"]},"ledian":{"level":97,"moves":["encore","knockoff","lightscreen","reflect","roost","toxic","uturn"]},"ariados":{"level":93,"moves":["bugbite","poisonjab","shadowsneak","suckerpunch","toxicspikes"]},"crobat":{"level":82,"moves":["bravebird","heatwave","nastyplot","roost","sludgebomb","superfang","taunt","uturn"]},"lanturn":{"level":84,"moves":["confuseray","discharge","healbell","icebeam","surf","thunderwave","toxic"]},"xatu":{"level":88,"moves":["calmmind","grassknot","heatwave","hiddenpowerfighting","psychic","roost","trick","uturn","wish"]},"ampharos":{"level":88,"moves":["discharge","focusblast","healbell","hiddenpowerice","lightscreen","reflect","signalbeam","thunderbolt"]},"bellossom":{"level":89,"moves":["hiddenpowerfire","leafstorm","moonlight","sleeppowder","sludgebomb","solarbeam","sunnyday"]},"azumarill":{"level":84,"moves":["aquajet","doubleedge","icepunch","return","superpower","waterfall"]},"sudowoodo":{"level":90,"moves":["earthquake","explosion","stealthrock","stoneedge","suckerpunch","toxic","woodhammer"]},"politoed":{"level":88,"moves":["encore","focusblast","hiddenpowergrass","hydropump","icebeam","protect","surf","toxic"]},"jumpluff":{"level":88,"moves":["bounce","encore","grassknot","leechseed","sleeppowder","stunspore","substitute","toxic","uturn"]},"sunflora":{"level":94,"moves":["earthpower","hiddenpowerice","leafstorm","sludgebomb","synthesis"]},"quagsire":{"level":89,"moves":["earthquake","encore","icepunch","recover","toxic","waterfall","yawn"]},"espeon":{"level":83,"moves":["batonpass","calmmind","hiddenpowerfire","morningsun","psychic","shadowball","substitute"]},"umbreon":{"level":83,"moves":["curse","healbell","moonlight","payback","protect","toxic","wish"]},"slowking":{"level":88,"moves":["icebeam","nastyplot","psychic","slackoff","surf","thunderwave","toxic","trickroom"]},"unown":{"level":100,"moves":["hiddenpowerpsychic"]},"wobbuffet":{"level":80,"moves":["counter","destinybond","encore","mirrorcoat"]},"girafarig":{"level":91,"moves":["batonpass","calmmind","hiddenpowerfighting","psychic","thunderbolt"]},"forretress":{"level":80,"moves":["earthquake","explosion","gyroball","rapidspin","spikes","stealthrock","toxicspikes"]},"dunsparce":{"level":91,"moves":["bite","bodyslam","earthquake","headbutt","rockslide","roost","thunderwave"]},"steelix":{"level":84,"moves":["earthquake","explosion","gyroball","roar","stealthrock","stoneedge","toxic"]},"granbull":{"level":88,"moves":["bodyslam","closecombat","crunch","earthquake","firepunch","healbell","return","thunderwave","toxic"]},"qwilfish":{"level":84,"moves":["destinybond","explosion","poisonjab","spikes","thunderwave","toxicspikes","waterfall"]},"scizor":{"level":79,"moves":["bugbite","bulletpunch","pursuit","roost","superpower","swordsdance","uturn"]},"shuckle":{"level":90,"moves":["encore","knockoff","rest","stealthrock","toxic"]},"heracross":{"level":81,"moves":["closecombat","megahorn","nightslash","stoneedge","substitute","swordsdance"]},"ursaring":{"level":84,"moves":["closecombat","crunch","earthquake","facade","protect","swordsdance"]},"magcargo":{"level":91,"moves":["fireblast","hiddenpowerrock","lavaplume","recover","stealthrock","toxic","willowisp"]},"corsola":{"level":92,"moves":["explosion","recover","stealthrock","surf","toxic"]},"octillery":{"level":88,"moves":["energyball","fireblast","icebeam","surf","thunderwave"]},"delibird":{"level":100,"moves":["aerialace","brickbreak","icepunch","iceshard","rapidspin","seedbomb"]},"mantine":{"level":88,"moves":["rest","sleeptalk","surf","toxic"]},"skarmory":{"level":80,"moves":["bravebird","roost","spikes","stealthrock","whirlwind"]},"houndoom":{"level":84,"moves":["darkpulse","fireblast","hiddenpowergrass","nastyplot","suckerpunch"]},"kingdra":{"level":80,"moves":["dracometeor","dragondance","hydropump","icebeam","outrage","rest","sleeptalk","substitute","waterfall"]},"donphan":{"level":84,"moves":["assurance","earthquake","iceshard","rapidspin","seedbomb","stealthrock","stoneedge"]},"porygon2":{"level":86,"moves":["discharge","icebeam","recover","toxic","triattack"]},"stantler":{"level":88,"moves":["earthquake","energyball","hypnosis","megahorn","return","suckerpunch"]},"smeargle":{"level":85,"moves":["counter","spikes","spore","stealthrock","uturn"]},"hitmontop":{"level":85,"moves":["bulkup","closecombat","machpunch","rapidspin","stoneedge","suckerpunch","toxic"]},"miltank":{"level":83,"moves":["bodyslam","curse","earthquake","healbell","milkdrink","stealthrock"]},"blissey":{"level":80,"moves":["aromatherapy","flamethrower","icebeam","protect","seismictoss","softboiled","stealthrock","thunderwave","toxic","wish"]},"raikou":{"level":77,"moves":["aurasphere","calmmind","hiddenpowerice","shadowball","thunderbolt"]},"entei":{"level":83,"moves":["extremespeed","flareblitz","hiddenpowergrass","ironhead","stoneedge"]},"suicune":{"level":80,"moves":["calmmind","hiddenpowerelectric","icebeam","rest","roar","sleeptalk","surf"]},"tyranitar":{"level":79,"moves":["crunch","dragondance","earthquake","fireblast","firepunch","icebeam","icepunch","pursuit","stealthrock","stoneedge","superpower"]},"lugia":{"level":74,"moves":["aeroblast","calmmind","earthpower","icebeam","roost","substitute","toxic","whirlwind"]},"hooh":{"level":74,"moves":["bravebird","earthquake","punishment","roost","sacredfire","substitute"]},"celebi":{"level":80,"moves":["batonpass","earthpower","energyball","hiddenpowerfire","leafstorm","leechseed","nastyplot","psychic","recover","stealthrock","substitute","thunderwave","uturn"]},"sceptile":{"level":84,"moves":["earthquake","energyball","focusblast","hiddenpowerfire","hiddenpowerice","leafstorm","leechseed","substitute"]},"blaziken":{"level":84,"moves":["agility","fireblast","flareblitz","stoneedge","superpower","thunderpunch","vacuumwave"]},"swampert":{"level":80,"moves":["earthquake","icebeam","icepunch","roar","stealthrock","stoneedge","waterfall"]},"mightyena":{"level":90,"moves":["crunch","firefang","suckerpunch","superfang","taunt","toxic"]},"linoone":{"level":85,"moves":["bellydrum","extremespeed","seedbomb","shadowclaw"]},"beautifly":{"level":92,"moves":["bugbuzz","hiddenpowerground","psychic","uturn"]},"dustox":{"level":96,"moves":["bugbuzz","protect","roost","toxic","whirlwind"]},"ludicolo":{"level":84,"moves":["energyball","icebeam","leechseed","raindance","substitute","surf"]},"shiftry":{"level":88,"moves":["darkpulse","explosion","hiddenpowerfire","leafstorm","lowkick","seedbomb","solarbeam","suckerpunch","sunnyday","swordsdance"]},"swellow":{"level":83,"moves":["bravebird","facade","protect","quickattack","uturn"]},"pelipper":{"level":90,"moves":["airslash","hiddenpowergrass","hydropump","roost","surf","toxic","uturn"]},"gardevoir":{"level":87,"moves":["calmmind","focusblast","psychic","shadowball","taunt","thunderbolt","willowisp"]},"masquerain":{"level":93,"moves":["agility","airslash","batonpass","bugbuzz","hydropump","roost"]},"breloom":{"level":80,"moves":["facade","focuspunch","leechseed","machpunch","seedbomb","spore","stoneedge","substitute","swordsdance"]},"vigoroth":{"level":88,"moves":["bulkup","earthquake","encore","lowkick","nightslash","return","slackoff","substitute","suckerpunch"]},"slaking":{"level":85,"moves":["doubleedge","earthquake","firepunch","icepunch","nightslash","pursuit","return"]},"ninjask":{"level":83,"moves":["batonpass","protect","substitute","swordsdance","xscissor"]},"shedinja":{"level":90,"moves":["batonpass","shadowsneak","swordsdance","willowisp","xscissor"]},"exploud":{"level":89,"moves":["crunch","earthquake","fireblast","icebeam","return","surf"]},"hariyama":{"level":84,"moves":["bulletpunch","closecombat","facade","fakeout","focuspunch","icepunch","payback","stoneedge","substitute"]},"delcatty":{"level":97,"moves":["healbell","protect","return","thunderwave","wish"]},"sableye":{"level":95,"moves":["recover","seismictoss","taunt","toxic","willowisp"]},"mawile":{"level":95,"moves":["batonpass","focuspunch","ironhead","substitute","suckerpunch","swordsdance"]},"aggron":{"level":86,"moves":["aquatail","earthquake","headsmash","icepunch","lowkick","rockpolish"]},"medicham":{"level":86,"moves":["bulletpunch","fakeout","highjumpkick","icepunch","psychocut","thunderpunch","trick"]},"manectric":{"level":87,"moves":["flamethrower","hiddenpowergrass","overheat","switcheroo","thunderbolt"]},"plusle":{"level":88,"moves":["batonpass","encore","hiddenpowerice","nastyplot","thunderbolt"]},"minun":{"level":88,"moves":["batonpass","encore","hiddenpowerice","nastyplot","thunderbolt"]},"volbeat":{"level":94,"moves":["batonpass","bugbuzz","encore","substitute","tailglow"]},"illumise":{"level":91,"moves":["bugbuzz","encore","hiddenpowerground","hiddenpowerice","thunderbolt","uturn","wish"]},"swalot":{"level":89,"moves":["earthquake","encore","explosion","icebeam","sludgebomb","toxic","yawn"]},"sharpedo":{"level":87,"moves":["aquajet","crunch","earthquake","hiddenpowergrass","hydropump","icebeam","waterfall"]},"wailord":{"level":88,"moves":["hiddenpowergrass","hydropump","icebeam","selfdestruct","surf","waterspout"]},"camerupt":{"level":88,"moves":["earthpower","earthquake","explosion","fireblast","lavaplume","rockpolish","stealthrock","stoneedge"]},"torkoal":{"level":88,"moves":["earthquake","explosion","lavaplume","rapidspin","stealthrock","toxic","yawn"]},"grumpig":{"level":88,"moves":["calmmind","focusblast","healbell","psychic","shadowball","thunderwave","toxic"]},"spinda":{"level":100,"moves":["bodyslam","encore","shadowball","teeterdance","toxic"]},"flygon":{"level":80,"moves":["dragonclaw","earthquake","fireblast","firepunch","outrage","roost","stoneedge","uturn"]},"cacturne":{"level":89,"moves":["encore","focuspunch","lowkick","seedbomb","spikes","substitute","suckerpunch","swordsdance"]},"altaria":{"level":86,"moves":["dragonclaw","dragondance","earthquake","fireblast","healbell","outrage","roost"]},"zangoose":{"level":86,"moves":["closecombat","quickattack","return","shadowclaw","swordsdance"]},"seviper":{"level":89,"moves":["aquatail","darkpulse","earthquake","flamethrower","sludgebomb","suckerpunch","switcheroo"]},"lunatone":{"level":91,"moves":["batonpass","calmmind","earthpower","psychic","shadowball","substitute"]},"solrock":{"level":89,"moves":["earthquake","explosion","rockpolish","stealthrock","stoneedge","zenheadbutt"]},"whiscash":{"level":88,"moves":["dragondance","earthquake","stoneedge","waterfall"]},"crawdaunt":{"level":88,"moves":["crunch","dragondance","superpower","waterfall","xscissor"]},"claydol":{"level":84,"moves":["earthquake","explosion","icebeam","psychic","rapidspin","stealthrock"]},"cradily":{"level":88,"moves":["curse","earthquake","recover","rest","rockslide","seedbomb","sleeptalk","stealthrock","toxic"]},"armaldo":{"level":87,"moves":["earthquake","rapidspin","rockpolish","stealthrock","stoneedge","swordsdance","toxic","xscissor"]},"milotic":{"level":83,"moves":["haze","icebeam","recover","rest","sleeptalk","surf","toxic"]},"castform":{"level":100,"moves":["energyball","fireblast","icebeam","shadowball","thunderbolt"]},"kecleon":{"level":91,"moves":["aquatail","recover","return","stealthrock","thunderwave","toxic"]},"banette":{"level":90,"moves":["destinybond","hiddenpowerfighting","shadowclaw","shadowsneak","taunt","thunderwave","willowisp"]},"tropius":{"level":93,"moves":["aerialace","curse","dragondance","earthquake","leafblade","leafstorm","leechseed","roost","swordsdance","toxic","whirlwind"]},"chimecho":{"level":92,"moves":["calmmind","hiddenpowerfire","psychic","recover","signalbeam","thunderwave","yawn"]},"absol":{"level":84,"moves":["nightslash","psychocut","pursuit","suckerpunch","superpower","swordsdance"]},"glalie":{"level":88,"moves":["earthquake","explosion","icebeam","spikes","taunt"]},"walrein":{"level":88,"moves":["encore","icebeam","protect","rest","roar","sleeptalk","surf","toxic"]},"huntail":{"level":89,"moves":["doubleedge","hiddenpowergrass","hydropump","icebeam","raindance","suckerpunch","surf"]},"gorebyss":{"level":88,"moves":["hiddenpowergrass","hydropump","icebeam","raindance","surf"]},"relicanth":{"level":88,"moves":["doubleedge","earthquake","headsmash","rockpolish","stealthrock","waterfall"]},"luvdisc":{"level":98,"moves":["icebeam","protect","surf","sweetkiss","toxic"]},"salamence":{"level":76,"moves":["dracometeor","dragondance","earthquake","fireblast","outrage","roost"]},"metagross":{"level":79,"moves":["agility","bulletpunch","earthquake","explosion","meteormash","stealthrock","zenheadbutt"]},"regirock":{"level":84,"moves":["earthquake","explosion","rest","rockslide","sleeptalk","stealthrock","thunderwave"]},"regice":{"level":83,"moves":["focusblast","icebeam","rest","sleeptalk","thunderbolt","thunderwave"]},"registeel":{"level":82,"moves":["curse","ironhead","rest","sleeptalk","stealthrock","thunderwave","toxic"]},"latias":{"level":71,"moves":["calmmind","dracometeor","psychic","roost"]},"latios":{"level":71,"moves":["calmmind","dracometeor","psychic","roost"]},"kyogre":{"level":70,"moves":["calmmind","icebeam","rest","sleeptalk","surf","thunder","waterspout"]},"groudon":{"level":74,"moves":["earthquake","firepunch","rockpolish","stealthrock","stoneedge","swordsdance","toxic"]},"rayquaza":{"level":74,"moves":["dragonclaw","dragondance","earthquake","extremespeed","outrage","overheat","swordsdance"]},"jirachi":{"level":76,"moves":["bodyslam","calmmind","firepunch","flashcannon","icepunch","ironhead","psychic","stealthrock","substitute","thunderbolt","uturn","wish"]},"deoxys":{"level":76,"moves":["extremespeed","icebeam","psychoboost","spikes","stealthrock","superpower"]},"deoxysattack":{"level":75,"moves":["extremespeed","hiddenpowerfire","icebeam","psychoboost","shadowball","stealthrock","superpower"]},"deoxysdefense":{"level":77,"moves":["recover","seismictoss","spikes","stealthrock","taunt","toxic"]},"deoxysspeed":{"level":78,"moves":["lightscreen","psychoboost","reflect","spikes","stealthrock","superpower","taunt"]},"torterra":{"level":86,"moves":["earthquake","leechseed","roar","rockpolish","stealthrock","stoneedge","synthesis","woodhammer"]},"infernape":{"level":79,"moves":["closecombat","flareblitz","grassknot","hiddenpowerice","machpunch","stealthrock","stoneedge","swordsdance","uturn"]},"empoleon":{"level":80,"moves":["agility","grassknot","hiddenpowerelectric","hydropump","icebeam","roar","stealthrock","surf"]},"staraptor":{"level":82,"moves":["bravebird","closecombat","doubleedge","pursuit","quickattack","return","roost","substitute","uturn"]},"bibarel":{"level":93,"moves":["curse","quickattack","rest","waterfall"]},"kricketune":{"level":97,"moves":["brickbreak","nightslash","return","swordsdance","xscissor"]},"luxray":{"level":88,"moves":["crunch","icefang","protect","roar","superpower","thunderbolt","toxic"]},"roserade":{"level":80,"moves":["energyball","hiddenpowerfire","hiddenpowerice","leafstorm","rest","sleeppowder","sludgebomb","spikes","toxicspikes"]},"rampardos":{"level":89,"moves":["earthquake","firepunch","icebeam","rockpolish","stoneedge","zenheadbutt"]},"bastiodon":{"level":89,"moves":["earthquake","metalburst","protect","roar","rockslide","stealthrock","toxic"]},"wormadam":{"level":95,"moves":["hiddenpowerice","hiddenpowerrock","leafstorm","psychic","signalbeam"]},"wormadamsandy":{"level":94,"moves":["earthquake","rest","sleeptalk","toxic"]},"wormadamtrash":{"level":88,"moves":["gyroball","protect","stealthrock","toxic"]},"mothim":{"level":89,"moves":["airslash","bugbuzz","hiddenpowerfighting","hiddenpowerground","shadowball","uturn"]},"vespiquen":{"level":95,"moves":["attackorder","defendorder","protect","roost","substitute","toxic"]},"pachirisu":{"level":94,"moves":["discharge","lightscreen","superfang","toxic","uturn"]},"floatzel":{"level":87,"moves":["aquajet","batonpass","bulkup","crunch","icepunch","return","taunt","waterfall"]},"cherrim":{"level":93,"moves":["aromatherapy","energyball","hiddenpowerfire","hiddenpowerground","synthesis","toxic"]},"cherrimsunshine":{"level":93,"moves":["hiddenpowerice","solarbeam","sunnyday","weatherball"]},"gastrodon":{"level":88,"moves":["earthpower","icebeam","recover","surf","toxic"]},"ambipom":{"level":84,"moves":["fakeout","lowkick","payback","pursuit","return","uturn"]},"drifblim":{"level":86,"moves":["calmmind","hiddenpowerfighting","rest","shadowball","substitute","thunderbolt"]},"lopunny":{"level":88,"moves":["batonpass","encore","healingwish","return","substitute","thunderwave","toxic"]},"mismagius":{"level":82,"moves":["hiddenpowerfighting","nastyplot","painsplit","shadowball","substitute","taunt","thunderbolt","trick","willowisp"]},"honchkrow":{"level":82,"moves":["bravebird","heatwave","pursuit","suckerpunch","superpower"]},"purugly":{"level":88,"moves":["fakeout","return","shadowclaw","suckerpunch","taunt","uturn"]},"skuntank":{"level":86,"moves":["crunch","explosion","fireblast","poisonjab","pursuit","suckerpunch","taunt"]},"bronzong":{"level":80,"moves":["earthquake","explosion","gyroball","lightscreen","payback","reflect","stealthrock","toxic"]},"chatot":{"level":90,"moves":["encore","heatwave","hiddenpowergrass","hypervoice","nastyplot","uturn"]},"spiritomb":{"level":86,"moves":["calmmind","darkpulse","hiddenpowerfighting","rest","sleeptalk","willowisp"]},"garchomp":{"level":75,"moves":["dragonclaw","earthquake","fireblast","outrage","stealthrock","stoneedge","substitute","swordsdance"]},"lucario":{"level":80,"moves":["agility","closecombat","crunch","extremespeed","icepunch","stoneedge","swordsdance"]},"hippowdon":{"level":80,"moves":["earthquake","icefang","roar","slackoff","stealthrock","stoneedge","toxic"]},"drapion":{"level":84,"moves":["aquatail","crunch","earthquake","poisonjab","pursuit","swordsdance","taunt","toxicspikes","whirlwind"]},"toxicroak":{"level":84,"moves":["crosschop","focuspunch","icepunch","substitute","suckerpunch","swordsdance"]},"carnivine":{"level":93,"moves":["powerwhip","return","sleeppowder","substitute","swordsdance","synthesis"]},"lumineon":{"level":90,"moves":["hiddenpowerelectric","hiddenpowergrass","icebeam","raindance","surf","uturn"]},"abomasnow":{"level":83,"moves":["blizzard","earthquake","energyball","hiddenpowerfire","iceshard","leechseed","substitute","woodhammer"]},"weavile":{"level":79,"moves":["icepunch","iceshard","lowkick","nightslash","pursuit","swordsdance"]},"magnezone":{"level":80,"moves":["explosion","flashcannon","hiddenpowergrass","hiddenpowerice","magnetrise","substitute","thunderbolt"]},"lickilicky":{"level":88,"moves":["aquatail","bodyslam","earthquake","explosion","healbell","protect","return","wish"]},"rhyperior":{"level":84,"moves":["earthquake","icepunch","megahorn","rockpolish","stealthrock","stoneedge"]},"tangrowth":{"level":85,"moves":["earthquake","hiddenpowerfire","hiddenpowerice","leafstorm","powerwhip","rockslide","sleeppowder","stunspore","swordsdance","synthesis"]},"electivire":{"level":82,"moves":["crosschop","earthquake","flamethrower","hiddenpowergrass","icepunch","thunderbolt"]},"magmortar":{"level":85,"moves":["fireblast","focusblast","hiddenpowergrass","hiddenpowerice","substitute","thunderbolt"]},"togekiss":{"level":80,"moves":["airslash","aurasphere","fireblast","healbell","nastyplot","roost","thunderwave"]},"yanmega":{"level":82,"moves":["airslash","bugbuzz","hiddenpowerfire","hiddenpowerground","protect","uturn"]},"leafeon":{"level":85,"moves":["batonpass","doubleedge","healbell","leafblade","substitute","swordsdance","synthesis","yawn"]},"glaceon":{"level":88,"moves":["hiddenpowerfire","hiddenpowerground","icebeam","protect","shadowball","toxic","wish"]},"gliscor":{"level":80,"moves":["earthquake","roost","stealthrock","stoneedge","swordsdance","taunt","toxic","uturn"]},"mamoswine":{"level":80,"moves":["earthquake","endeavor","iceshard","stealthrock","stoneedge","superpower"]},"porygonz":{"level":81,"moves":["agility","darkpulse","hiddenpowerfighting","icebeam","nastyplot","thunderbolt","triattack","trick"]},"gallade":{"level":82,"moves":["closecombat","icepunch","nightslash","psychocut","shadowsneak","stoneedge","swordsdance","trick"]},"probopass":{"level":88,"moves":["earthpower","powergem","stealthrock","thunderwave","toxic"]},"dusknoir":{"level":83,"moves":["earthquake","focuspunch","icebeam","painsplit","shadowsneak","substitute","willowisp"]},"froslass":{"level":82,"moves":["destinybond","icebeam","shadowball","spikes","taunt"]},"rotomheat":{"level":79,"moves":["lightscreen","overheat","painsplit","reflect","shadowball","thunderbolt","trick","willowisp"]},"rotomwash":{"level":80,"moves":["hydropump","lightscreen","reflect","rest","shadowball","sleeptalk","thunderbolt","trick","willowisp"]},"rotomfrost":{"level":80,"moves":["blizzard","lightscreen","reflect","rest","shadowball","sleeptalk","thunderbolt","trick","willowisp"]},"rotomfan":{"level":79,"moves":["lightscreen","painsplit","reflect","rest","shadowball","sleeptalk","thunderbolt","willowisp"]},"rotommow":{"level":80,"moves":["leafstorm","lightscreen","painsplit","reflect","shadowball","thunderbolt","trick","willowisp"]},"rotom":{"level":84,"moves":["hiddenpowerfighting","hiddenpowerfire","shadowball","thunderbolt","trick"]},"uxie":{"level":81,"moves":["lightscreen","psychic","reflect","stealthrock","thunderwave","uturn","yawn"]},"mesprit":{"level":83,"moves":["calmmind","hiddenpowerfire","icebeam","psychic","stealthrock","substitute","thunderbolt","thunderwave","uturn"]},"azelf":{"level":78,"moves":["explosion","fireblast","flamethrower","hiddenpowerfighting","nastyplot","psychic","stealthrock","thunderbolt","uturn"]},"dialga":{"level":72,"moves":["aurasphere","bulkup","dracometeor","dragonclaw","earthquake","fireblast","outrage","rest","sleeptalk","stealthrock","thunderbolt","toxic"]},"palkia":{"level":71,"moves":["aurasphere","dracometeor","fireblast","hydropump","spacialrend","surf","thunderbolt"]},"heatran":{"level":78,"moves":["dragonpulse","earthpower","explosion","fireblast","hiddenpowergrass","lavaplume","protect","roar","stealthrock","substitute","toxic"]},"regigigas":{"level":85,"moves":["confuseray","earthquake","firepunch","return","substitute","thunderwave","toxic"]},"giratinaorigin":{"level":73,"moves":["aurasphere","calmmind","dracometeor","dragonpulse","outrage","shadowball","shadowsneak","substitute","willowisp"]},"giratina":{"level":72,"moves":["calmmind","dragonpulse","rest","roar","shadowball","sleeptalk","willowisp"]},"cresselia":{"level":80,"moves":["calmmind","hiddenpowerfire","icebeam","lightscreen","moonlight","psychic","reflect","substitute","thunderwave","toxic"]},"phione":{"level":90,"moves":["icebeam","raindance","rest","surf","toxic"]},"manaphy":{"level":76,"moves":["energyball","icebeam","surf","tailglow"]},"darkrai":{"level":71,"moves":["darkpulse","darkvoid","focusblast","nastyplot","substitute"]},"shaymin":{"level":80,"moves":["earthpower","hiddenpowerfire","hiddenpowerice","leechseed","rest","seedflare","substitute"]},"shayminsky":{"level":74,"moves":["airslash","earthpower","hiddenpowerfire","hiddenpowerice","leechseed","seedflare","substitute"]},"arceus":{"level":70,"moves":["earthquake","extremespeed","recover","shadowclaw","swordsdance"]},"arceusbug":{"level":70,"moves":["calmmind","earthpower","icebeam","judgment","recover"]},"arceusdark":{"level":70,"moves":["calmmind","focusblast","judgment","recover","refresh"]},"arceusdragon":{"level":70,"moves":["calmmind","flamethrower","judgment","recover","refresh","willowisp"]},"arceuselectric":{"level":70,"moves":["calmmind","earthpower","icebeam","judgment","recover"]},"arceusfighting":{"level":70,"moves":["calmmind","darkpulse","icebeam","judgment","recover"]},"arceusfire":{"level":70,"moves":["calmmind","earthpower","judgment","recover","thunderbolt"]},"arceusflying":{"level":70,"moves":["calmmind","earthpower","judgment","recover","refresh"]},"arceusghost":{"level":70,"moves":["calmmind","focusblast","judgment","recover","willowisp"]},"arceusgrass":{"level":70,"moves":["calmmind","earthpower","icebeam","judgment","recover","thunderwave"]},"arceusground":{"level":70,"moves":["calmmind","icebeam","judgment","recover","thunderbolt"]},"arceusice":{"level":70,"moves":["calmmind","earthpower","flamethrower","judgment","recover","thunderbolt"]},"arceuspoison":{"level":70,"moves":["calmmind","earthpower","judgment","recover","willowisp"]},"arceuspsychic":{"level":70,"moves":["calmmind","focusblast","judgment","recover","shadowball"]},"arceusrock":{"level":70,"moves":["calmmind","earthpower","judgment","recover","refresh","willowisp"]},"arceussteel":{"level":70,"moves":["calmmind","earthpower","judgment","recover","willowisp"]},"arceuswater":{"level":70,"moves":["calmmind","icebeam","judgment","recover","refresh","thunderbolt","willowisp"]}} as any;
/* eslint-enable */


// These moves can be used even if we aren't setting up to use them:
const SetupException = ['dracometeor', 'overheat'];

// Give recovery moves priority over certain other defensive status moves
const recoveryMoves = [
	'healorder', 'milkdrink', 'moonlight', 'morningsun', 'painsplit', 'recover', 'rest', 'roost',
	'slackoff', 'softboiled', 'synthesis', 'wish',
];
const defensiveStatusMoves = ['aromatherapy', 'haze', 'healbell', 'roar', 'whirlwind', 'willowisp', 'yawn'];
export class RandomGen4Teams extends RandomGen5Teams {
	randomData: {[species: string]: OldRandomBattleSpecies} = randomDataJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);
		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter) => (
				(movePool.includes('bugbuzz') || movePool.includes('megahorn'))
			),
			Dark: (movePool, moves, abilities, types, counter) => (
				!counter.get('damage') &&
				(!counter.get('Dark') || (counter.get('Dark') < 2 && moves.has('pursuit') && movePool.includes('suckerpunch')))),
			Dragon: (movePool, moves, abilities, types, counter) => !counter.get('Dragon'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fighting: (movePool, moves, abilities, types, counter) => (
				!counter.get('Fighting') &&
				(!!counter.setupType || !counter.get('Status') || movePool.includes('closecombat') || movePool.includes('highjumpkick'))
			),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter) => !counter.get('Flying') && (
				(counter.setupType !== 'Special' && movePool.includes('bravebird')) ||
				(abilities.has('Serene Grace') && movePool.includes('airslash'))
			),
			Grass: (movePool, moves, abilities, types, counter) => (
				!counter.get('Grass') &&
				['leafblade', 'leafstorm', 'seedflare', 'woodhammer'].some(m => movePool.includes(m))
			),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => (
				!counter.get('Ice') && (!types.has('Water') || !counter.get('Water'))
			),
			Rock: (movePool, moves, abilities, types, counter) => (
				!counter.get('Rock') && (movePool.includes('headsmash') || movePool.includes('stoneedge'))
			),
			Steel: (movePool, moves, abilities, types, counter) => !counter.get('Steel') && movePool.includes('meteormash'),
			Water: (movePool, moves, abilities, types, counter) => (
				!counter.get('Water') && (moves.has('raindance') || !types.has('Ice') || !counter.get('Ice'))
			),
			Adaptability: (movePool, moves, abilities, types, counter, species) => (
				!counter.setupType &&
				species.types.length > 1 &&
				(!counter.get(species.types[0]) || !counter.get(species.types[1]))
			),
			Guts: (movePool, moves, abilities, types) => types.has('Normal') && movePool.includes('facade'),
			'Slow Start': movePool => movePool.includes('substitute'),
			protect: movePool => movePool.includes('wish'),
			wish: movePool => movePool.includes('protect'),
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

		switch (move.id) {
		// Not very useful without their supporting moves
		case 'batonpass':
			return {cull: !counter.setupType && !counter.get('speedsetup') && !moves.has('substitute')};
		case 'eruption': case 'waterspout':
			return {cull: counter.get('Physical') + counter.get('Special') < 4};
		case 'focuspunch':
			return {cull: !moves.has('substitute') || counter.damagingMoves.size < 2 || moves.has('hammerarm')};
		case 'lightscreen':
			if (movePool.length > 1) {
				const screen = movePool.indexOf('reflect');
				if (screen >= 0) {
					this.fastPop(movePool, screen);
					return {cull: true};
				}
			}
			return {cull: false};
		case 'raindance':
			return {cull: abilities.has('Hydration') ? !moves.has('rest') : counter.get('Physical') + counter.get('Special') < 2};
		case 'reflect':
			if (movePool.length > 1) {
				const screen = movePool.indexOf('lightscreen');
				if (screen >= 0) {
					this.fastPop(movePool, screen);
					return {cull: true};
				}
			}
			return {cull: false};
		case 'refresh':
			return {cull: !(moves.has('calmmind') && (moves.has('recover') || moves.has('roost')))};
		case 'rest':
			return {cull: movePool.includes('sleeptalk') || (abilities.has('Hydration') && !moves.has('raindance')) ||
				moves.has('reflect') && moves.has('lightscreen')};
		case 'sleeptalk':
			if (movePool.length > 1) {
				const rest = movePool.indexOf('rest');
				if (rest >= 0) this.fastPop(movePool, rest);
			}
			return {cull: !moves.has('rest')};
		case 'sunnyday':
			return {cull: !moves.has('solarbeam')};
		case 'weatherball':
			return {cull: !moves.has('raindance') && !moves.has('sunnyday')};

		// Set up once and only if we have the moves for it
		case 'bellydrum': case 'bulkup': case 'curse': case 'dragondance': case 'swordsdance':
			const notEnoughPhysicalMoves = (
				counter.get('Physical') + counter.get('physicalpool') < 2 &&
				!moves.has('batonpass') &&
				(!moves.has('rest') || !moves.has('sleeptalk'))
			);
			const badPhysicalMoveset = counter.setupType !== 'Physical' || counter.get('physicalsetup') > 1;
			return {cull: moves.has('sunnyday') || notEnoughPhysicalMoves || badPhysicalMoveset, isSetup: true};
		case 'calmmind': case 'nastyplot': case 'tailglow':
			const notEnoughSpecialMoves = (
				counter.get('Special') + counter.get('specialpool') < 2 &&
				!moves.has('batonpass') &&
				(!moves.has('rest') || !moves.has('sleeptalk'))
			);
			const badSpecialMoveset = counter.setupType !== 'Special' || counter.get('specialsetup') > 1;
			return {cull: notEnoughSpecialMoves || badSpecialMoveset, isSetup: true};
		case 'agility': case 'rockpolish':
			return {cull: restTalk || (counter.damagingMoves.size < 2 && !moves.has('batonpass')), isSetup: !counter.setupType};

		// Bad after setup
		case 'destinybond':
			return {cull: !!counter.setupType || moves.has('explosion')};
		case 'explosion': case 'selfdestruct':
			return {cull: (
				counter.setupType === 'Special' ||
				Array.from(moves).some(id => recoveryMoves.includes(id) || defensiveStatusMoves.includes(id)) ||
				['batonpass', 'protect', 'substitute'].some(m => moves.has(m))
			)};
		case 'foresight': case 'roar': case 'whirlwind':
			return {cull: !!counter.setupType && !abilities.has('Speed Boost')};
		case 'healingwish': case 'lunardance':
			return {cull: !!counter.setupType || moves.has('rest') || moves.has('substitute')};
		case 'protect':
			return {cull: (
				['rest', 'softboiled'].some(m => moves.has(m)) ||
				!['Guts', 'Quick Feet', 'Speed Boost'].some(abil => abilities.has(abil)) &&
				!['toxic', 'wish'].some(m => moves.has(m))
			)};
		case 'wish':
			return {cull: (
				!['batonpass', 'ironhead', 'moonlight', 'protect', 'softboiled', 'uturn'].some(m => moves.has(m)) &&
				!movePool.includes('protect')
			)};
		case 'moonlight':
			return {cull: (moves.has('wish') && (moves.has('protect') || movePool.includes('protect')))};
		case 'rapidspin':
			return {cull: !!teamDetails.rapidSpin || (!!counter.setupType && counter.get('Physical') + counter.get('Special') < 2)};
		case 'fakeout':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('substitute')};
		case 'spikes':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('substitute')};
		case 'stealthrock':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				moves.has('rest') || moves.has('substitute') ||
				!!teamDetails.stealthRock
			)};
		case 'switcheroo': case 'trick':
			return {cull: (
				counter.get('Physical') + counter.get('Special') < 3 ||
				!!counter.setupType ||
				['fakeout', 'lightscreen', 'reflect', 'suckerpunch', 'trickroom'].some(m => moves.has(m))
			)};
		case 'toxic': case 'toxicspikes':
			return {cull: (
				!!counter.setupType || !!counter.get('speedsetup') || !!teamDetails.toxicSpikes || moves.has('willowisp')
			)};
		case 'trickroom':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				counter.damagingMoves.size < 2 ||
				moves.has('lightscreen') || moves.has('reflect') ||
				restTalk
			)};
		case 'uturn':
			return {cull: (
				(abilities.has('Speed Boost') && moves.has('protect')) ||
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				moves.has('batonpass') || moves.has('substitute')
			)};

		// Bit redundant to have both
		// Attacks:
		case 'bodyslam': case 'slash':
			return {cull: moves.has('facade') || moves.has('return')};
		case 'bugbite':
			return {cull: moves.has('uturn')};
		case 'doubleedge':
			return {cull: ['bodyslam', 'facade', 'return'].some(m => moves.has(m))};
		case 'endeavor':
			return {cull: !isLead};
		case 'facade':
			return {cull: moves.has('substitute')};
		case 'headbutt':
			return {cull: !moves.has('bodyslam') && !moves.has('thunderwave')};
		case 'swift':
			return {cull: counter.setupType !== 'Special'};
		case 'quickattack':
			return {cull: moves.has('thunderwave')};
		case 'firepunch': case 'flamethrower':
			return {cull: moves.has('fireblast') || moves.has('overheat') && !counter.setupType};
		case 'flareblitz':
			return {cull: moves.has('superpower') && !!counter.get('speedsetup')};
		case 'lavaplume': case 'fireblast':
			if (move.id === 'fireblast' && moves.has('lavaplume') && !counter.get('speedsetup')) return {cull: true};
			if (move.id === 'lavaplume' && moves.has('fireblast') && counter.get('speedsetup')) return {cull: true};
			if (moves.has('flareblitz') && counter.setupType !== 'Special' &&
				(!moves.has('superpower') || !counter.get('speedsetup'))) return {cull: true};
			break;
		case 'overheat':
			return {cull: counter.setupType === 'Special' || ['batonpass', 'fireblast', 'flareblitz'].some(m => moves.has(m))};
		case 'aquajet':
			return {cull: moves.has('dragondance') || (moves.has('waterfall') && counter.get('Physical') < 3)};
		case 'hydropump':
			return {cull: moves.has('surf')};
		case 'waterfall':
			return {cull: (
				moves.has('aquatail') ||
				(counter.setupType !== 'Physical' && (moves.has('hydropump') || moves.has('surf')))
			)};
		case 'chargebeam':
			return {cull: moves.has('thunderbolt') && counter.get('Special') < 3};
		case 'discharge':
			return {cull: moves.has('thunderbolt')};
		case 'energyball':
			return {cull: (
				moves.has('woodhammer') ||
				(moves.has('sunnyday') && moves.has('solarbeam')) ||
				(moves.has('leafstorm') && counter.get('Physical') + counter.get('Special') < 4)
			)};
		case 'grassknot': case 'leafblade': case 'seedbomb':
			return {cull: moves.has('woodhammer') || (moves.has('sunnyday') && moves.has('solarbeam'))};
		case 'leafstorm':
			return {cull: (
				!!counter.setupType ||
				moves.has('batonpass') ||
				moves.has('powerwhip') ||
				moves.has('leafblade') ||
				(moves.has('sunnyday') && moves.has('solarbeam'))
			)};
		case 'solarbeam':
			return {cull: counter.setupType === 'Physical' || !moves.has('sunnyday')};
		case 'icepunch':
			return {cull: !counter.setupType && moves.has('icebeam')};
		case 'aurasphere': case 'drainpunch': case 'focusblast':
			return {cull: moves.has('closecombat') && counter.setupType !== 'Special'};
		case 'brickbreak': case 'closecombat': case 'crosschop': case 'lowkick':
			return {cull: moves.has('substitute') && moves.has('focuspunch')};
		case 'machpunch':
			return {cull: (counter.damagingMoves.size <= counter.get('Fighting'))};
		case 'seismictoss':
			return {cull: moves.has('nightshade') || counter.get('Physical') + counter.get('Special') >= 1};
		case 'superpower':
			return {cull: moves.has('dragondance') || !!counter.get('speedsetup') && !types.has('Fighting')};
		case 'gunkshot':
			return {cull: moves.has('poisonjab')};
		case 'earthpower':
			return {cull: moves.has('earthquake')};
		case 'airslash':
			return {cull: !counter.setupType && moves.has('bravebird')};
		case 'zenheadbutt':
			return {cull: moves.has('psychocut')};
		case 'rockblast': case 'rockslide':
			return {cull: moves.has('stoneedge')};
		case 'shadowclaw': case 'shadowsneak':
			return {cull: moves.has('suckerpunch') && !types.has('Ghost')};
		case 'dracometeor':
			return {cull: moves.has('calmmind') || restTalk || (!!counter.setupType && counter.get('stab') < 2)};
		case 'dragonclaw':
			return {cull: moves.has('outrage')};
		case 'dragonpulse':
			return {cull: moves.has('dracometeor') || moves.has('outrage')};
		case 'crunch': case 'nightslash':
			return {cull: moves.has('suckerpunch') && !types.has('Dark')};
		case 'pursuit':
			return {cull: !!counter.setupType || moves.has('payback')};
		case 'flashcannon':
			return {cull: (moves.has('ironhead') || movePool.includes('ironhead')) && counter.setupType !== 'Special'};

		// Status:
		case 'encore':
			return {cull: ['roar', 'taunt', 'whirlwind'].some(m => moves.has(m)) || restTalk};
		case 'haze': case 'taunt':
			return {cull: restTalk};
		case 'healbell':
			// Ampharos doesn't want both
			return {cull: moves.has('reflect') && moves.has('lightscreen')};
		case 'leechseed': case 'painsplit':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('rest')};
		case 'recover': case 'slackoff':
			return {cull: restTalk};
		case 'stunspore':
			return {cull: (
				!!counter.setupType ||
				moves.has('toxic') ||
				movePool.includes('sleeppowder') ||
				movePool.includes('spore')
			)};
		case 'substitute':
			return {cull: ['lightscreen', 'pursuit', 'rapidspin', 'reflect', 'rest', 'taunt'].some(m => moves.has(m))};
		case 'thunderwave':
			return {cull: (
				!!counter.setupType ||
				moves.has('toxic') ||
				moves.has('trickroom') ||
				(moves.has('bodyslam') && abilities.has('Serene Grace'))
			)};
		case 'yawn':
			return {cull: moves.has('thunderwave') || moves.has('toxic')};
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
	) {
		switch (ability) {
		case 'Anger Point': case 'Ice Body': case 'Steadfast': case 'Unaware':
			return true;
		case 'Blaze':
			return !counter.get('Fire');
		case 'Chlorophyll':
			return !moves.has('sunnyday') && !teamDetails.sun;
		case 'Compound Eyes': case 'No Guard':
			return !counter.get('inaccurate');
		case 'Early Bird':
			return !moves.has('rest');
		case 'Gluttony':
			return !moves.has('bellydrum');
		case 'Hustle':
			return counter.get('Physical') < 2;
		case 'Mold Breaker':
			return !moves.has('earthquake');
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Reckless': case 'Rock Head':
			return !counter.get('recoil');
		case 'Sand Veil':
			return !teamDetails.sand;
		case 'Serene Grace':
			return !counter.get('serenegrace') || species.id === 'blissey';
		case 'Simple':
			return !counter.setupType && !moves.has('cosmicpower');
		case 'Skill Link':
			return !counter.get('skilllink');
		case 'Snow Cloak':
			return !teamDetails.hail;
		case 'Solar Power':
			return !counter.get('Special') || !moves.has('sunnyday') && !teamDetails.sun;
		case 'Speed Boost':
			return moves.has('uturn');
		case 'Swift Swim':
			return !moves.has('raindance') && !teamDetails.rain;
		case 'Swarm':
			return !counter.get('Bug');
		case 'Synchronize':
			return counter.get('Status') < 2;
		case 'Technician':
			return !counter.get('technician') || moves.has('toxic');
		case 'Thick Fat':
			return (moves.has('facade') || moves.has('fakeout')) && abilities.has('Guts');
		case 'Tinted Lens':
			return moves.has('protect');
		case 'Torrent':
			return !counter.get('Water');
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
	): string | undefined {
		if (species.requiredItem) return species.requiredItem;
		if (species.requiredItems) return this.sample(species.requiredItems);
		if (species.name === 'Ditto') return this.sample(['Salac Berry', 'Sitrus Berry']);
		if (species.name === 'Farfetch\u2019d' && counter.get('Physical') < 4) return 'Stick';
		if (species.name === 'Latias' || species.name === 'Latios') return 'Soul Dew';
		if (species.name === 'Marowak') return 'Thick Club';
		if (species.name === 'Pikachu') return 'Light Ball';
		if (species.name === 'Shedinja' || species.name === 'Smeargle') return 'Focus Sash';
		if (species.name === 'Unown') return 'Choice Specs';
		if (species.name === 'Wobbuffet') {
			return moves.has('destinybond') ? 'Custap Berry' : this.sample(['Leftovers', 'Sitrus Berry']);
		}

		if (moves.has('switcheroo') || moves.has('trick')) {
			if (
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				!counter.get('priority') &&
				this.randomChance(2, 3)
			) {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (moves.has('bellydrum')) return 'Sitrus Berry';
		if (ability === 'Magic Guard' || ability === 'Speed Boost' && counter.get('Status') < 2) return 'Life Orb';
		if (ability === 'Poison Heal' || ability === 'Toxic Boost') return 'Toxic Orb';

		if (moves.has('rest') && !moves.has('sleeptalk') && ability !== 'Natural Cure' && ability !== 'Shed Skin') {
			return (moves.has('raindance') && ability === 'Hydration') ? 'Damp Rock' : 'Chesto Berry';
		}
		if (moves.has('raindance') && ability === 'Swift Swim' && counter.get('Status') < 2) return 'Life Orb';
		if (moves.has('sunnyday')) return (ability === 'Chlorophyll' && counter.get('Status') < 2) ? 'Life Orb' : 'Heat Rock';
		if (moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if ((ability === 'Guts' || ability === 'Quick Feet') && moves.has('facade')) return 'Toxic Orb';
		if (ability === 'Unburden') return 'Sitrus Berry';
		if (species.baseStats.hp + species.baseStats.def + species.baseStats.spd <= 150) {
			return isLead ? 'Focus Sash' : 'Life Orb';
		}
		if (moves.has('endeavor')) return 'Focus Sash';
	}

	getMediumPriorityItem(
		ability: string,
		moves: Set<string>,
		counter: MoveCounter,
		species: Species,
		isDoubles: boolean,
		isLead: boolean
	): string | undefined {
		if (
			ability === 'Slow Start' ||
			['curse', 'leechseed', 'protect', 'roar', 'sleeptalk', 'whirlwind'].some(m => moves.has(m)) ||
			(ability === 'Serene Grace' && ['bodyslam', 'headbutt', 'ironhead'].some(m => moves.has(m)))
		) {
			return 'Leftovers';
		}

		if (counter.get('Physical') >= 4 && !moves.has('fakeout') && !moves.has('rapidspin') && !moves.has('suckerpunch')) {
			return (
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				!counter.get('priority') && !moves.has('bodyslam') && this.randomChance(2, 3)
			) ? 'Choice Scarf' : 'Choice Band';
		}

		if (
			(counter.get('Special') >= 4 || (
				counter.get('Special') >= 3 &&
				['batonpass', 'uturn', 'waterspout', 'selfdestruct'].some(m => moves.has(m))
			)) &&
			!moves.has('chargebeam')
		) {
			return (
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Speed Boost' && !counter.get('priority') && this.randomChance(2, 3)
			) ? 'Choice Scarf' : 'Choice Specs';
		}

		if (moves.has('outrage') && counter.setupType) return 'Lum Berry';
		if (moves.has('substitute')) {
			return (counter.damagingMoves.size < 2 ||
				!counter.get('drain') &&
				(counter.damagingMoves.size < 3 || species.baseStats.hp >= 60 || species.baseStats.def + species.baseStats.spd >= 180)
			) ? 'Leftovers' : 'Life Orb';
		}
		if (ability === 'Guts') return 'Toxic Orb';
		if (
			isLead &&
			!counter.get('recoil') &&
			!Array.from(moves).some(id => !!recoveryMoves.includes(id)) &&
			species.baseStats.hp + species.baseStats.def + species.baseStats.spd < 225
		) {
			return 'Focus Sash';
		}
		if (counter.get('Dark') >= 3) return 'Black Glasses';
		if (counter.damagingMoves.size >= 4) {
			return (
				counter.get('Normal') || counter.get('Dragon') > 1 || moves.has('chargebeam') || moves.has('suckerpunch')
			) ? 'Life Orb' : 'Expert Belt';
		}
		if (counter.damagingMoves.size >= 3 && !moves.has('superfang') && !moves.has('metalburst')) {
			const totalBulk = species.baseStats.hp + species.baseStats.def + species.baseStats.spd;
			return (
				counter.get('speedsetup') || counter.get('priority') ||
				moves.has('dragondance') || moves.has('trickroom') ||
				totalBulk < 235 ||
				(species.baseStats.spe >= 70 && (totalBulk < 260 || (!!counter.get('recovery') && totalBulk < 285)))
			) ? 'Life Orb' : 'Leftovers';
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
	) {
		if (types.has('Poison')) return 'Black Sludge';
		if (this.dex.getEffectiveness('Rock', species) >= 1 || moves.has('roar')) return 'Leftovers';
		if (counter.get('Status') <= 1 && ['metalburst', 'rapidspin', 'superfang'].every(m => !moves.has(m))) return 'Life Orb';
		return 'Leftovers';
	}

	randomSet(
		species: string | Species,
		teamDetails: RandomTeamsTypes.TeamDetails = {},
		isLead = false
	): RandomTeamsTypes.RandomSet {
		species = this.dex.species.get(species);
		let forme = species.name;

		if (typeof species.battleOnly === 'string') forme = species.battleOnly;

		if (species.cosmeticFormes) {
			forme = this.sample([species.name].concat(species.cosmeticFormes));
		}

		const data = this.randomData[species.id];
		const movePool = (data.moves || Object.keys(this.dex.species.getLearnset(species.id)!)).slice();
		const rejectedPool: string[] = [];
		const moves = new Set<string>();
		let ability = '';
		let item: string | undefined;
		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs: SparseStatsTable = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};

		const types = new Set(species.types);

		const abilities = new Set(Object.values(species.abilities));

		let availableHP = 0;
		for (const setMoveid of movePool) {
			if (setMoveid.startsWith('hiddenpower')) availableHP++;
		}

		let counter: MoveCounter;
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
			if (types.has('Dark') && moves.has('suckerpunch') && species.types.length === 1) {
				counter.add('stab');
			}

			// Iterate through the moves again, this time to cull them:
			for (const moveid of moves) {
				const move = this.dex.moves.get(moveid);

				let {cull, isSetup} = this.shouldCullMove(
					move, types, moves, abilities, counter,
					movePool, teamDetails, species, isLead
				);

				// Increased/decreased priority moves are unneeded with moves that boost only speed
				if (move.priority !== 0 && !!counter.get('speedsetup')) cull = true;

				// This move doesn't satisfy our setup requirements:
				if (
					(move.category === 'Physical' && counter.setupType === 'Special') ||
					(move.category === 'Special' && counter.setupType === 'Physical')
				) {
					// Reject STABs last in case the setup type changes later on
					if (
						!SetupException.includes(moveid) &&
						(!types.has(move.type) || counter.get('stab') > 1 || counter.get(move.category) < 2)
					) {
						cull = true;
					}
				}
				if (
					counter.setupType && !isSetup && move.category !== counter.setupType &&
					counter.get(counter.setupType) < 2 && !moves.has('batonpass')
				) {
					// Mono-attacking with setup and RestTalk or recovery + status healing is allowed
					if (
						moveid !== 'rest' && moveid !== 'sleeptalk' &&
						!(recoveryMoves.includes(moveid) && (moves.has('healbell') || moves.has('refresh'))) &&
						!((moveid === 'healbell' || moveid === 'refresh') && Array.from(moves).some(id => recoveryMoves.includes(id))) && (
							// Reject Status moves only if there is nothing else to reject
							move.category !== 'Status' || (
								counter.get(counter.setupType) + counter.get('Status') > 3 &&
								counter.get('physicalsetup') + counter.get('specialsetup') < 2
							)
						)
					) {
						cull = true;
					}
				}
				if (
					moveid === 'hiddenpower' &&
					counter.setupType === 'Special' &&
					species.types.length > 1 &&
					counter.get('Special') <= 2 &&
					!types.has(move.type) &&
					!counter.get('Physical') &&
					counter.get('specialpool') &&
					(!(types.has('Ghost') && move.type === 'Fighting' || types.has('Electric') && move.type === 'Ice'))
				) {
					// Hidden Power isn't good enough
					cull = true;
				}

				// Reject defensive status moves if a reliable recovery move is available but not selected.
				// Toxic is only defensive if used with another status move other than Protect (Toxic + 3 attacks and Toxic + Protect are ok).
				if (
					!Array.from(moves).some(id => recoveryMoves.includes(id)) &&
					movePool.some(id => recoveryMoves.includes(id)) && (
						defensiveStatusMoves.includes(moveid) ||
						(moveid === 'toxic' && ((counter.get('Status') > 1 && !moves.has('protect')) || counter.get('Status') > 2))
					)
				) {
					cull = true;
				}

				const runEnforcementChecker = (checkerName: string) => {
					if (!this.moveEnforcementCheckers[checkerName]) return false;
					return this.moveEnforcementCheckers[checkerName](
						movePool, moves, abilities, types, counter, species as Species, teamDetails
					);
				};

				const moveIsRejectable = (
					!move.weather &&
					!move.damage &&
					(move.category !== 'Status' || !move.flags.heal) &&
					(move.category === 'Status' || !types.has(move.type) || (move.basePower && move.basePower < 40 && !move.multihit)) &&
					// These moves cannot be rejected in favor of a forced move
					!['judgment', 'lightscreen', 'reflect', 'sleeptalk'].includes(moveid) &&
					// Setup-supported moves should only be rejected under specific circumstances
					(counter.get('physicalsetup') + counter.get('specialsetup') < 2 && (
						!counter.setupType || counter.setupType === 'Mixed' ||
						(move.category !== counter.setupType && move.category !== 'Status') ||
						counter.get(counter.setupType) + counter.get('Status') > 3
					))
				);

				if (!cull && !isSetup && moveIsRejectable) {
					// There may be more important moves that this Pokemon needs
					const canRollForcedMoves = (
						// These moves should always be rolled
						movePool.includes('spore') || (!Array.from(moves).some(id => recoveryMoves.includes(id)) && (
							movePool.includes('softboiled') && !moves.has('explosion') ||
							(species.baseSpecies === 'Arceus' && movePool.includes('recover'))
						))
					);
					// Pokemon should usually have at least one STAB move
					const requiresStab = (
						!counter.get('stab') && !counter.get('damage') && (
							species.types.length > 1 ||
							(species.types[0] !== 'Normal' && species.types[0] !== 'Psychic') ||
							!moves.has('icebeam') ||
							species.baseStats.spa >= species.baseStats.spd
						)
					);
					if (
						canRollForcedMoves ||
						requiresStab ||
						(species.requiredMove && movePool.includes(toID(species.requiredMove))) ||
						(counter.get('defensesetup') && !counter.get('recovery') && !moves.has('rest'))
					) {
						cull = true;
					} else {
						// Pokemon should have moves that benefit their typing or ability
						for (const type of types) {
							if (runEnforcementChecker(type)) cull = true;
						}
						for (const abil of abilities) {
							if (runEnforcementChecker(abil)) cull = true;
						}
						for (const m of moves) {
							if (runEnforcementChecker(m)) cull = true;
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
				if (cull && (
					movePool.length - availableHP || availableHP && (moveid.startsWith('hiddenpower') || !hasHiddenPower)
				)) {
					if (move.category !== 'Status' && (!moveid.startsWith('hiddenpower') || !availableHP)) rejectedPool.push(moveid);
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

		const abilityData = Array.from(abilities).map(a => this.dex.abilities.get(a));
		Utils.sortBy(abilityData, abil => -abil.rating);

		let ability0 = abilityData[0];
		let ability1 = abilityData[1];
		if (abilityData[1]) {
			if (ability0.rating <= ability1.rating && this.randomChance(1, 2)) {
				[ability0, ability1] = [ability1, ability0];
			} else if (ability0.rating - 0.6 <= ability1.rating && this.randomChance(2, 3)) {
				[ability0, ability1] = [ability1, ability0];
			}
			ability = ability0.name;

			while (this.shouldCullAbility(ability, types, moves, abilities, counter, movePool, teamDetails, species)) {
				if (ability === ability0.name && ability1.rating >= 1) {
					ability = ability1.name;
				} else {
					// Default to the highest rated ability if all are rejected
					ability = abilityData[0].name;
					break;
				}
			}

			if (abilities.has('Hydration') && moves.has('raindance') && moves.has('rest')) {
				ability = 'Hydration';
			} else if (abilities.has('Swift Swim') && moves.has('raindance')) {
				ability = 'Swift Swim';
			} else if (abilities.has('Technician') && moves.has('machpunch') && types.has('Fighting') && counter.get('stab') < 2) {
				ability = 'Technician';
			}
		} else {
			ability = ability0.name;
		}

		item = this.getHighPriorityItem(ability, types, moves, counter, teamDetails, species, isLead);
		if (item === undefined) item = this.getMediumPriorityItem(ability, moves, counter, species, false, isLead);
		if (item === undefined) {
			item = this.getLowPriorityItem(ability, types, moves, abilities, counter, teamDetails, species);
		}

		// For Trick / Switcheroo
		if (item === 'Leftovers' && types.has('Poison')) {
			item = 'Black Sludge';
		}

		const level = this.adjustLevel || data.level || (species.nfe ? 90 : 80);

		// Prepare optimal HP
		let hp = Math.floor(
			Math.floor(
				2 * species.baseStats.hp + (ivs.hp || 31) + Math.floor(evs.hp / 4) + 100
			) * level / 100 + 10
		);
		if (moves.has('substitute') && item === 'Sitrus Berry') {
			// Two Substitutes should activate Sitrus Berry
			while (hp % 4 > 0) {
				evs.hp -= 4;
				hp = Math.floor(
					Math.floor(
						2 * species.baseStats.hp + (ivs.hp || 31) + Math.floor(evs.hp / 4) + 100
					) * level / 100 + 10
				);
			}
		} else if (moves.has('bellydrum') && item === 'Sitrus Berry') {
			// Belly Drum should activate Sitrus Berry
			if (hp % 2 > 0) evs.hp -= 4;
		} else {
			// Maximize number of Stealth Rock switch-ins
			const srWeakness = this.dex.getEffectiveness('Rock', species);
			if (srWeakness > 0 && hp % (4 / srWeakness) === 0) evs.hp -= 4;
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
}

export default RandomGen4Teams;
