import {
	Format,
	ModdedDex,
	Move,
	PRNG,
	PRNGSeed,
	RandomTeamsTypes,
	Species,
	StatID,
} from '@pkmn/sim';

import {RandomGen4Teams} from './gen4';
import {MoveCounter, OldRandomBattleSpecies} from './gen8';
import {Utils} from './utils';

/* eslint-disable */
const randomDataJSON = {"venusaur":{"level":82,"moves":["curse","earthquake","hiddenpowerrock","leechseed","sleeppowder","sludgebomb","swordsdance","synthesis"]},"charizard":{"level":80,"moves":["bellydrum","dragondance","earthquake","fireblast","hiddenpowerflying","substitute"]},"blastoise":{"level":84,"moves":["earthquake","icebeam","mirrorcoat","rest","roar","sleeptalk","surf","toxic"]},"butterfree":{"level":91,"moves":["gigadrain","hiddenpowerfire","morningsun","psychic","sleeppowder","stunspore","toxic"]},"beedrill":{"level":90,"moves":["brickbreak","doubleedge","endure","hiddenpowerbug","sludgebomb","swordsdance"]},"pidgeot":{"level":88,"moves":["aerialace","hiddenpowerground","quickattack","return","substitute","toxic"]},"raticate":{"level":88,"moves":["endeavor","hiddenpowerground","quickattack","return","reversal","shadowball","substitute"]},"fearow":{"level":84,"moves":["agility","batonpass","drillpeck","hiddenpowerground","quickattack","return","substitute"]},"arbok":{"level":90,"moves":["doubleedge","earthquake","hiddenpowerfire","rest","rockslide","sleeptalk","sludgebomb"]},"pikachu":{"level":88,"moves":["hiddenpowerice","substitute","surf","thunderbolt"]},"raichu":{"level":84,"moves":["encore","focuspunch","hiddenpowergrass","hiddenpowerice","substitute","surf","thunderbolt","thunderwave"]},"sandslash":{"level":84,"moves":["earthquake","hiddenpowerbug","rapidspin","rockslide","swordsdance","toxic"]},"nidoqueen":{"level":84,"moves":["earthquake","fireblast","icebeam","shadowball","sludgebomb","superpower"]},"nidoking":{"level":84,"moves":["earthquake","fireblast","icebeam","megahorn","sludgebomb","substitute","thunderbolt"]},"clefable":{"level":84,"moves":["calmmind","counter","icebeam","return","shadowball","softboiled","thunderbolt","thunderwave"]},"ninetales":{"level":83,"moves":["fireblast","flamethrower","hiddenpowergrass","hypnosis","substitute","toxic","willowisp"]},"wigglytuff":{"level":90,"moves":["fireblast","icebeam","protect","return","thunderbolt","toxic","wish"]},"vileplume":{"level":85,"moves":["aromatherapy","hiddenpowerfire","sleeppowder","sludgebomb","solarbeam","sunnyday","synthesis"]},"parasect":{"level":91,"moves":["aromatherapy","gigadrain","hiddenpowerbug","return","spore","stunspore","swordsdance"]},"venomoth":{"level":88,"moves":["batonpass","hiddenpowerground","signalbeam","sleeppowder","sludgebomb","substitute"]},"dugtrio":{"level":81,"moves":["aerialace","earthquake","hiddenpowerbug","rockslide","substitute"]},"persian":{"level":84,"moves":["fakeout","hiddenpowerground","hypnosis","irontail","return","shadowball","substitute"]},"golduck":{"level":83,"moves":["calmmind","hiddenpowergrass","hydropump","hypnosis","icebeam","substitute","surf"]},"primeape":{"level":85,"moves":["bulkup","crosschop","earthquake","hiddenpowerghost","rockslide","substitute"]},"arcanine":{"level":83,"moves":["extremespeed","fireblast","flamethrower","hiddenpowergrass","rest","sleeptalk","toxic"]},"poliwrath":{"level":84,"moves":["brickbreak","bulkup","hiddenpowerghost","hydropump","hypnosis","icebeam","substitute"]},"alakazam":{"level":81,"moves":["calmmind","encore","firepunch","icepunch","psychic","recover","substitute"]},"machamp":{"level":83,"moves":["bulkup","crosschop","earthquake","hiddenpowerghost","rest","rockslide","sleeptalk"]},"victreebel":{"level":84,"moves":["hiddenpowerfire","sleeppowder","sludgebomb","solarbeam","sunnyday"]},"tentacruel":{"level":83,"moves":["gigadrain","haze","hydropump","icebeam","rapidspin","surf","toxic"]},"golem":{"level":84,"moves":["doubleedge","earthquake","explosion","hiddenpowerbug","rockslide","toxic"]},"rapidash":{"level":84,"moves":["fireblast","hiddenpowergrass","hiddenpowerrock","substitute","toxic"]},"slowbro":{"level":82,"moves":["calmmind","fireblast","icebeam","psychic","rest","sleeptalk","surf","thunderwave"]},"magneton":{"level":81,"moves":["hiddenpowergrass","hiddenpowerice","rest","sleeptalk","thunderbolt","toxic"]},"farfetchd":{"level":91,"moves":["agility","batonpass","hiddenpowerflying","return","swordsdance"]},"dodrio":{"level":82,"moves":["drillpeck","flail","hiddenpowerground","quickattack","return","substitute"]},"dewgong":{"level":88,"moves":["encore","hiddenpowergrass","icebeam","rest","sleeptalk","surf","toxic"]},"muk":{"level":84,"moves":["brickbreak","curse","explosion","fireblast","hiddenpowerghost","rest","sludgebomb"]},"cloyster":{"level":80,"moves":["explosion","icebeam","rapidspin","spikes","surf","toxic"]},"gengar":{"level":79,"moves":["destinybond","explosion","firepunch","hypnosis","icepunch","substitute","thunderbolt","willowisp"]},"hypno":{"level":84,"moves":["batonpass","calmmind","firepunch","hypnosis","protect","psychic","toxic","wish"]},"kingler":{"level":90,"moves":["doubleedge","hiddenpowerghost","hiddenpowerground","surf","swordsdance"]},"electrode":{"level":84,"moves":["explosion","hiddenpowergrass","hiddenpowerice","substitute","thunderbolt","thunderwave","toxic"]},"exeggutor":{"level":82,"moves":["explosion","gigadrain","hiddenpowerfire","hiddenpowerice","leechseed","psychic","sleeppowder","solarbeam","sunnyday"]},"marowak":{"level":82,"moves":["bonemerang","doubleedge","earthquake","rockslide","swordsdance"]},"hitmonlee":{"level":85,"moves":["bulkup","earthquake","hiddenpowerghost","highjumpkick","machpunch","rockslide","substitute"]},"hitmonchan":{"level":88,"moves":["bulkup","earthquake","hiddenpowerghost","machpunch","rapidspin","skyuppercut","toxic"]},"lickitung":{"level":90,"moves":["counter","healbell","protect","return","seismictoss","toxic","wish"]},"weezing":{"level":82,"moves":["explosion","fireblast","haze","painsplit","sludgebomb","toxic","willowisp"]},"rhydon":{"level":83,"moves":["doubleedge","earthquake","megahorn","rockslide","substitute","swordsdance"]},"tangela":{"level":90,"moves":["hiddenpowergrass","leechseed","morningsun","sleeppowder","stunspore"]},"kangaskhan":{"level":84,"moves":["earthquake","fakeout","focuspunch","rest","return","shadowball","substitute","toxic"]},"seaking":{"level":90,"moves":["hiddenpowergrass","hydropump","icebeam","megahorn","raindance"]},"starmie":{"level":79,"moves":["hydropump","icebeam","psychic","recover","surf","thunderbolt"]},"mrmime":{"level":84,"moves":["barrier","batonpass","calmmind","encore","firepunch","hypnosis","psychic","substitute","thunderbolt"]},"scyther":{"level":84,"moves":["aerialace","batonpass","hiddenpowerground","hiddenpowerrock","quickattack","silverwind","swordsdance"]},"jynx":{"level":82,"moves":["calmmind","hiddenpowerfire","icebeam","lovelykiss","psychic","substitute"]},"electabuzz":{"level":84,"moves":["crosschop","firepunch","focuspunch","hiddenpowergrass","icepunch","substitute","thunderbolt"]},"magmar":{"level":84,"moves":["crosschop","fireblast","flamethrower","hiddenpowergrass","psychic","substitute","thunderpunch"]},"pinsir":{"level":83,"moves":["earthquake","hiddenpowerbug","return","rockslide","swordsdance"]},"tauros":{"level":79,"moves":["doubleedge","earthquake","hiddenpowerghost","hiddenpowerrock","return"]},"gyarados":{"level":79,"moves":["doubleedge","dragondance","earthquake","hiddenpowerflying","hydropump","taunt"]},"lapras":{"level":82,"moves":["healbell","icebeam","rest","sleeptalk","surf","thunderbolt","toxic"]},"ditto":{"level":100,"moves":["transform"]},"vaporeon":{"level":82,"moves":["icebeam","protect","surf","toxic","wish"]},"jolteon":{"level":80,"moves":["batonpass","hiddenpowerice","substitute","thunderbolt","toxic","wish"]},"flareon":{"level":88,"moves":["doubleedge","fireblast","hiddenpowergrass","protect","shadowball","toxic","wish"]},"omastar":{"level":84,"moves":["hiddenpowergrass","hydropump","icebeam","raindance","spikes","surf"]},"kabutops":{"level":84,"moves":["brickbreak","doubleedge","hiddenpowerground","rockslide","surf","swordsdance"]},"aerodactyl":{"level":79,"moves":["doubleedge","earthquake","hiddenpowerflying","rockslide","substitute"]},"snorlax":{"level":77,"moves":["bodyslam","curse","earthquake","rest","return","selfdestruct","shadowball","sleeptalk"]},"articuno":{"level":82,"moves":["healbell","hiddenpowerfire","icebeam","protect","rest","roar","sleeptalk","toxic"]},"zapdos":{"level":78,"moves":["agility","batonpass","hiddenpowerice","substitute","thunderbolt","thunderwave","toxic"]},"moltres":{"level":80,"moves":["fireblast","flamethrower","hiddenpowergrass","morningsun","substitute","toxic","willowisp"]},"dragonite":{"level":81,"moves":["doubleedge","dragondance","earthquake","flamethrower","healbell","hiddenpowerflying","icebeam","substitute"]},"mewtwo":{"level":73,"moves":["calmmind","flamethrower","icebeam","psychic","recover","substitute","thunderbolt"]},"mew":{"level":76,"moves":["calmmind","explosion","flamethrower","icebeam","psychic","softboiled","thunderbolt","thunderwave","transform"]},"meganium":{"level":84,"moves":["bodyslam","hiddenpowergrass","leechseed","synthesis","toxic"]},"typhlosion":{"level":82,"moves":["fireblast","flamethrower","focuspunch","hiddenpowergrass","hiddenpowerice","substitute","thunderpunch"]},"feraligatr":{"level":84,"moves":["earthquake","hiddenpowerflying","hydropump","rockslide","swordsdance"]},"furret":{"level":90,"moves":["doubleedge","quickattack","return","reversal","shadowball","substitute","trick"]},"noctowl":{"level":90,"moves":["hypnosis","psychic","reflect","toxic","whirlwind"]},"ledian":{"level":92,"moves":["agility","batonpass","lightscreen","reflect","silverwind","swordsdance","toxic"]},"ariados":{"level":90,"moves":["agility","batonpass","signalbeam","sludgebomb","spiderweb","toxic"]},"crobat":{"level":82,"moves":["aerialace","haze","hiddenpowerground","shadowball","sludgebomb","taunt","toxic"]},"lanturn":{"level":84,"moves":["confuseray","icebeam","rest","sleeptalk","surf","thunderbolt","thunderwave","toxic"]},"togetic":{"level":90,"moves":["charm","encore","flamethrower","seismictoss","softboiled","thunderwave","toxic"]},"xatu":{"level":84,"moves":["batonpass","calmmind","hiddenpowerfire","psychic","reflect","wish"]},"ampharos":{"level":84,"moves":["firepunch","healbell","hiddenpowergrass","hiddenpowerice","thunderbolt","toxic"]},"bellossom":{"level":88,"moves":["hiddenpowergrass","leechseed","moonlight","sleeppowder","sludgebomb","stunspore"]},"azumarill":{"level":85,"moves":["brickbreak","encore","hiddenpowerghost","hydropump","return"]},"sudowoodo":{"level":89,"moves":["brickbreak","doubleedge","earthquake","explosion","rockslide","toxic"]},"politoed":{"level":84,"moves":["hiddenpowergrass","hypnosis","icebeam","rest","surf","toxic"]},"jumpluff":{"level":83,"moves":["encore","hiddenpowerflying","leechseed","sleeppowder","substitute","toxic"]},"aipom":{"level":90,"moves":["batonpass","doubleedge","focuspunch","shadowball","substitute","thunderwave"]},"sunflora":{"level":91,"moves":["hiddenpowerfire","leechseed","razorleaf","synthesis","toxic"]},"yanma":{"level":90,"moves":["hiddenpowerflying","hypnosis","reversal","shadowball","substitute"]},"quagsire":{"level":84,"moves":["counter","curse","earthquake","hiddenpowerrock","icebeam","rest","surf","toxic"]},"espeon":{"level":81,"moves":["batonpass","calmmind","hiddenpowerfire","morningsun","psychic","reflect"]},"umbreon":{"level":82,"moves":["batonpass","hiddenpowerdark","protect","toxic","wish"]},"murkrow":{"level":89,"moves":["doubleedge","drillpeck","hiddenpowerfighting","hiddenpowerground","meanlook","perishsong","protect","shadowball","substitute"]},"slowking":{"level":84,"moves":["calmmind","flamethrower","icebeam","psychic","rest","sleeptalk","surf","thunderwave"]},"misdreavus":{"level":84,"moves":["calmmind","hiddenpowerice","meanlook","perishsong","protect","substitute","thunderbolt","toxic"]},"unown":{"level":100,"moves":["hiddenpowerpsychic"]},"wobbuffet":{"level":77,"moves":["counter","destinybond","encore","mirrorcoat"]},"girafarig":{"level":84,"moves":["agility","batonpass","calmmind","psychic","substitute","thunderbolt","thunderwave","wish"]},"forretress":{"level":80,"moves":["earthquake","explosion","hiddenpowerbug","rapidspin","spikes","toxic"]},"dunsparce":{"level":88,"moves":["bodyslam","curse","headbutt","rest","rockslide","shadowball","thunderwave"]},"gligar":{"level":84,"moves":["earthquake","hiddenpowerflying","irontail","quickattack","rockslide","substitute","swordsdance"]},"steelix":{"level":82,"moves":["doubleedge","earthquake","explosion","hiddenpowerrock","irontail","rest","roar","toxic"]},"granbull":{"level":84,"moves":["bulkup","earthquake","healbell","overheat","rest","return","shadowball","thunderwave"]},"qwilfish":{"level":84,"moves":["destinybond","hydropump","selfdestruct","shadowball","sludgebomb","spikes","swordsdance"]},"scizor":{"level":82,"moves":["agility","batonpass","hiddenpowerground","hiddenpowerrock","morningsun","silverwind","steelwing","swordsdance"]},"shuckle":{"level":91,"moves":["encore","rest","toxic","wrap"]},"heracross":{"level":80,"moves":["brickbreak","focuspunch","megahorn","rest","rockslide","sleeptalk","substitute","swordsdance"]},"sneasel":{"level":84,"moves":["brickbreak","doubleedge","hiddenpowerflying","shadowball","substitute","swordsdance"]},"ursaring":{"level":82,"moves":["earthquake","focuspunch","hiddenpowerghost","return","swordsdance"]},"magcargo":{"level":90,"moves":["fireblast","hiddenpowergrass","rest","sleeptalk","toxic","yawn"]},"piloswine":{"level":90,"moves":["doubleedge","earthquake","icebeam","protect","rockslide","toxic"]},"corsola":{"level":91,"moves":["calmmind","icebeam","recover","surf","toxic"]},"octillery":{"level":88,"moves":["fireblast","hiddenpowergrass","icebeam","rockblast","surf","thunderwave"]},"delibird":{"level":91,"moves":["aerialace","focuspunch","hiddenpowerground","icebeam","quickattack"]},"mantine":{"level":84,"moves":["haze","hiddenpowergrass","icebeam","raindance","rest","sleeptalk","surf","toxic"]},"skarmory":{"level":80,"moves":["drillpeck","hiddenpowerground","protect","rest","sleeptalk","spikes","toxic","whirlwind"]},"houndoom":{"level":82,"moves":["crunch","fireblast","flamethrower","hiddenpowergrass","pursuit","willowisp"]},"kingdra":{"level":82,"moves":["hiddenpowergrass","hydropump","icebeam","raindance","substitute","surf"]},"donphan":{"level":82,"moves":["earthquake","rapidspin","rest","rockslide","sleeptalk","toxic"]},"porygon2":{"level":82,"moves":["icebeam","recover","return","thunderbolt","thunderwave","toxic"]},"stantler":{"level":84,"moves":["earthquake","hypnosis","return","shadowball","thunderbolt"]},"smeargle":{"level":84,"moves":["encore","explosion","spikes","spore"]},"hitmontop":{"level":84,"moves":["bulkup","earthquake","hiddenpowerghost","highjumpkick","machpunch","rockslide","toxic"]},"miltank":{"level":81,"moves":["bodyslam","curse","earthquake","healbell","milkdrink","toxic"]},"blissey":{"level":80,"moves":["aromatherapy","calmmind","icebeam","seismictoss","softboiled","thunderbolt","thunderwave","toxic"]},"raikou":{"level":79,"moves":["calmmind","crunch","hiddenpowergrass","hiddenpowerice","rest","sleeptalk","substitute","thunderbolt"]},"entei":{"level":82,"moves":["bodyslam","calmmind","fireblast","flamethrower","hiddenpowergrass","hiddenpowerice","solarbeam","substitute","sunnyday"]},"suicune":{"level":77,"moves":["calmmind","icebeam","rest","sleeptalk","substitute","surf","toxic"]},"tyranitar":{"level":79,"moves":["dragondance","earthquake","fireblast","focuspunch","hiddenpowerbug","icebeam","pursuit","rockslide","substitute"]},"lugia":{"level":73,"moves":["aeroblast","calmmind","earthquake","icebeam","recover","substitute","thunderbolt","toxic"]},"hooh":{"level":74,"moves":["calmmind","earthquake","recover","sacredfire","substitute","thunderbolt","toxic"]},"celebi":{"level":79,"moves":["batonpass","calmmind","healbell","hiddenpowergrass","leechseed","psychic","recover"]},"sceptile":{"level":82,"moves":["focuspunch","hiddenpowerice","leafblade","leechseed","substitute","thunderpunch"]},"blaziken":{"level":82,"moves":["endure","fireblast","hiddenpowerice","reversal","rockslide","skyuppercut","swordsdance","thunderpunch"]},"swampert":{"level":80,"moves":["earthquake","hydropump","icebeam","protect","rest","rockslide","sleeptalk","surf","toxic"]},"mightyena":{"level":90,"moves":["crunch","doubleedge","healbell","hiddenpowerfighting","protect","shadowball","toxic"]},"linoone":{"level":84,"moves":["bellydrum","extremespeed","flail","hiddenpowerground","shadowball","substitute"]},"beautifly":{"level":91,"moves":["hiddenpowerbug","hiddenpowerflying","morningsun","stunspore","substitute","toxic"]},"dustox":{"level":91,"moves":["hiddenpowerground","lightscreen","moonlight","sludgebomb","toxic","whirlwind"]},"ludicolo":{"level":82,"moves":["hiddenpowergrass","icebeam","leechseed","raindance","substitute","surf"]},"shiftry":{"level":85,"moves":["brickbreak","explosion","shadowball","swordsdance"]},"swellow":{"level":82,"moves":["aerialace","doubleedge","hiddenpowerfighting","hiddenpowerground","quickattack","return"]},"pelipper":{"level":88,"moves":["icebeam","protect","rest","sleeptalk","surf","toxic"]},"gardevoir":{"level":82,"moves":["calmmind","firepunch","hypnosis","psychic","substitute","thunderbolt","willowisp"]},"masquerain":{"level":90,"moves":["hydropump","icebeam","stunspore","substitute","toxic"]},"breloom":{"level":81,"moves":["focuspunch","hiddenpowerghost","hiddenpowerrock","leechseed","machpunch","skyuppercut","spore","substitute","swordsdance"]},"vigoroth":{"level":87,"moves":["brickbreak","bulkup","earthquake","return","shadowball","slackoff"]},"slaking":{"level":81,"moves":["doubleedge","earthquake","focuspunch","return","shadowball"]},"ninjask":{"level":84,"moves":["aerialace","batonpass","hiddenpowerrock","protect","silverwind","substitute","swordsdance"]},"shedinja":{"level":90,"moves":["agility","batonpass","hiddenpowerground","shadowball","silverwind","toxic"]},"exploud":{"level":84,"moves":["earthquake","flamethrower","icebeam","overheat","return","shadowball","substitute"]},"hariyama":{"level":82,"moves":["bulkup","crosschop","fakeout","hiddenpowerghost","rest","rockslide","sleeptalk"]},"nosepass":{"level":91,"moves":["earthquake","explosion","rockslide","thunderwave","toxic"]},"delcatty":{"level":91,"moves":["batonpass","doubleedge","healbell","thunderwave","wish"]},"sableye":{"level":89,"moves":["knockoff","recover","seismictoss","shadowball","toxic"]},"mawile":{"level":91,"moves":["batonpass","brickbreak","focuspunch","hiddenpowersteel","rockslide","substitute","swordsdance","toxic"]},"aggron":{"level":84,"moves":["doubleedge","earthquake","focuspunch","irontail","rockslide","substitute","thunderwave","toxic"]},"medicham":{"level":82,"moves":["brickbreak","bulkup","recover","rockslide","shadowball","substitute"]},"manectric":{"level":84,"moves":["crunch","hiddenpowergrass","hiddenpowerice","substitute","thunderbolt","thunderwave"]},"plusle":{"level":88,"moves":["agility","batonpass","encore","hiddenpowergrass","substitute","thunderbolt","toxic"]},"minun":{"level":90,"moves":["batonpass","encore","hiddenpowerice","lightscreen","substitute","thunderbolt","wish"]},"volbeat":{"level":91,"moves":["batonpass","icepunch","tailglow","thunderbolt"]},"illumise":{"level":90,"moves":["batonpass","encore","icepunch","substitute","thunderwave","wish"]},"roselia":{"level":90,"moves":["aromatherapy","gigadrain","hiddenpowerfire","spikes","stunspore","synthesis"]},"swalot":{"level":90,"moves":["encore","explosion","hiddenpowerground","icebeam","sludgebomb","toxic","yawn"]},"sharpedo":{"level":84,"moves":["crunch","earthquake","endure","hiddenpowerflying","hydropump","icebeam","return"]},"wailord":{"level":88,"moves":["hiddenpowergrass","icebeam","rest","selfdestruct","sleeptalk","surf","toxic"]},"camerupt":{"level":84,"moves":["earthquake","explosion","fireblast","rest","rockslide","sleeptalk","toxic"]},"torkoal":{"level":88,"moves":["explosion","fireblast","flamethrower","hiddenpowergrass","rest","toxic","yawn"]},"grumpig":{"level":84,"moves":["calmmind","firepunch","icywind","psychic","substitute","taunt"]},"spinda":{"level":91,"moves":["bodyslam","encore","focuspunch","shadowball","substitute","teeterdance","toxic"]},"flygon":{"level":80,"moves":["dragonclaw","earthquake","fireblast","hiddenpowerbug","rockslide","substitute","toxic"]},"cacturne":{"level":89,"moves":["focuspunch","hiddenpowerdark","leechseed","needlearm","spikes","substitute","thunderpunch"]},"altaria":{"level":84,"moves":["dragonclaw","dragondance","earthquake","fireblast","flamethrower","haze","hiddenpowerflying","rest","toxic"]},"zangoose":{"level":82,"moves":["brickbreak","quickattack","return","shadowball","swordsdance"]},"seviper":{"level":90,"moves":["crunch","doubleedge","earthquake","flamethrower","hiddenpowergrass","sludgebomb"]},"lunatone":{"level":84,"moves":["batonpass","calmmind","explosion","hypnosis","icebeam","psychic"]},"solrock":{"level":84,"moves":["earthquake","explosion","overheat","reflect","rockslide","shadowball"]},"whiscash":{"level":87,"moves":["earthquake","hiddenpowerbug","icebeam","rest","rockslide","sleeptalk","spark","surf","toxic"]},"crawdaunt":{"level":88,"moves":["brickbreak","crunch","doubleedge","hiddenpowerghost","icebeam","surf"]},"claydol":{"level":80,"moves":["earthquake","explosion","icebeam","psychic","rapidspin","toxic"]},"cradily":{"level":84,"moves":["barrier","earthquake","hiddenpowergrass","mirrorcoat","recover","rockslide","toxic"]},"armaldo":{"level":82,"moves":["doubleedge","earthquake","hiddenpowerbug","rockslide","swordsdance"]},"milotic":{"level":79,"moves":["icebeam","mirrorcoat","recover","surf","toxic"]},"castform":{"level":90,"moves":["flamethrower","icebeam","substitute","thunderbolt","thunderwave"]},"kecleon":{"level":88,"moves":["brickbreak","return","shadowball","thunderwave","trick"]},"banette":{"level":84,"moves":["destinybond","endure","hiddenpowerfighting","knockoff","shadowball","willowisp"]},"dusclops":{"level":84,"moves":["focuspunch","icebeam","painsplit","rest","shadowball","sleeptalk","substitute","willowisp"]},"tropius":{"level":90,"moves":["hiddenpowerfire","solarbeam","sunnyday","synthesis"]},"chimecho":{"level":88,"moves":["calmmind","healbell","hiddenpowerfire","lightscreen","psychic","reflect","toxic","yawn"]},"absol":{"level":85,"moves":["batonpass","hiddenpowerfighting","quickattack","shadowball","swordsdance"]},"glalie":{"level":87,"moves":["earthquake","explosion","icebeam","spikes","toxic"]},"walrein":{"level":84,"moves":["encore","hiddenpowergrass","icebeam","rest","sleeptalk","surf","toxic"]},"huntail":{"level":88,"moves":["doubleedge","hiddenpowergrass","hydropump","icebeam","raindance","surf"]},"gorebyss":{"level":84,"moves":["hiddenpowerelectric","hiddenpowergrass","hydropump","icebeam","raindance","surf"]},"relicanth":{"level":88,"moves":["doubleedge","earthquake","hiddenpowerflying","rest","rockslide","sleeptalk","toxic"]},"luvdisc":{"level":92,"moves":["icebeam","protect","substitute","surf","sweetkiss","toxic"]},"salamence":{"level":78,"moves":["brickbreak","dragondance","earthquake","fireblast","hiddenpowerflying","rockslide"]},"metagross":{"level":79,"moves":["agility","earthquake","explosion","meteormash","psychic","rockslide"]},"regirock":{"level":82,"moves":["curse","earthquake","explosion","rest","rockslide","superpower","thunderwave"]},"regice":{"level":82,"moves":["explosion","icebeam","rest","sleeptalk","thunderbolt","thunderwave","toxic"]},"registeel":{"level":82,"moves":["rest","seismictoss","sleeptalk","toxic"]},"latias":{"level":76,"moves":["calmmind","dragonclaw","hiddenpowerfire","recover","refresh","toxic"]},"latios":{"level":75,"moves":["calmmind","dragonclaw","hiddenpowerfire","psychic","recover","thunderbolt"]},"kyogre":{"level":73,"moves":["calmmind","icebeam","rest","sleeptalk","surf","thunder"]},"groudon":{"level":73,"moves":["earthquake","hiddenpowerbug","overheat","rockslide","substitute","swordsdance","thunderwave"]},"rayquaza":{"level":74,"moves":["dragondance","earthquake","extremespeed","hiddenpowerflying","overheat","rockslide"]},"jirachi":{"level":77,"moves":["bodyslam","calmmind","firepunch","icepunch","protect","psychic","substitute","thunderbolt","wish"]},"deoxys":{"level":76,"moves":["extremespeed","firepunch","icebeam","psychoboost","shadowball","superpower"]},"deoxysattack":{"level":76,"moves":["extremespeed","firepunch","psychoboost","shadowball","superpower"]},"deoxysdefense":{"level":76,"moves":["nightshade","recover","spikes","taunt","toxic"]},"deoxysspeed":{"level":76,"moves":["calmmind","icebeam","psychic","recover","spikes","taunt","toxic"]}} as any;
/* eslint-enable */

export class RandomGen3Teams extends RandomGen4Teams {
	battleHasDitto: boolean;
	battleHasWobbuffet: boolean;

	randomData: {[species: string]: OldRandomBattleSpecies} = randomDataJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);
		this.battleHasDitto = false;
		this.battleHasWobbuffet = false;
		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter, species) => (
				movePool.includes('megahorn') || (!species.types[1] && movePool.includes('hiddenpowerbug'))
			),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting'),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Normal: (movePool, moves, abilities, types, counter, species) => {
				if (species.id === 'blissey' && movePool.includes('softboiled')) return true;
				return !counter.get('Normal') && counter.setupType === 'Physical';
			},
			Psychic: (movePool, moves, abilities, types, counter, species) => (
				types.has('Psychic') &&
				(movePool.includes('psychic') || movePool.includes('psychoboost')) &&
				species.baseStats.spa >= 100
			),
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock') && species.baseStats.atk >= 100,
			Water: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Water') && counter.setupType !== 'Physical' && species.baseStats.spa >= 60
			),
			// If the Pokémon has this move, the other move will be forced
			protect: movePool => movePool.includes('wish'),
			sunnyday: movePool => movePool.includes('solarbeam'),
			sleeptalk: movePool => movePool.includes('rest'),
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
	): {cull: boolean, isSetup?: boolean} {
		const restTalk = moves.has('rest') && moves.has('sleeptalk');

		switch (move.id) {
		// Set up once and only if we have the moves for it
		case 'bulkup': case 'curse': case 'dragondance': case 'swordsdance':
			return {
				cull: (
					(counter.setupType !== 'Physical' || counter.get('physicalsetup') > 1) ||
					(counter.get('Physical') + counter.get('physicalpool') < 2 && !moves.has('batonpass') && !restTalk)
				),
				isSetup: true,
			};
		case 'calmmind':
			return {
				cull: (
					counter.setupType !== 'Special' ||
					(counter.get('Special') + counter.get('specialpool') < 2 && !moves.has('batonpass') &&
					!moves.has('refresh') && !restTalk)
				),
				isSetup: true,
			};
		case 'agility':
			return {
				cull: (counter.damagingMoves.size < 2 && !moves.has('batonpass')) || moves.has('substitute') || restTalk,
				isSetup: !counter.setupType,
			};

		// Not very useful without their supporting moves
		case 'amnesia': case 'sleeptalk':
			if (moves.has('roar') || moves.has('whirlwind')) return {cull: true};
			if (!moves.has('rest')) return {cull: true};
			if (movePool.length > 1) {
				const rest = movePool.indexOf('rest');
				if (rest >= 0) this.fastPop(movePool, rest);
			}
			break;
		case 'barrier':
			return {cull: !moves.has('calmmind') && !moves.has('batonpass') && !moves.has('mirrorcoat')};
		case 'batonpass':
			return {cull: (
				(!counter.setupType && !counter.get('speedsetup')) &&
				['meanlook', 'spiderweb', 'substitute', 'wish'].every(m => !moves.has(m))
			)};
		case 'endeavor': case 'flail': case 'reversal':
			return {cull: restTalk || (!moves.has('endure') && !moves.has('substitute'))};
		case 'endure':
			return {cull: movePool.includes('destinybond')};
		case 'extremespeed': case 'raindance': case 'sunnyday':
			return {cull: counter.damagingMoves.size < 2 || moves.has('rest')};
		case 'focuspunch':
			return {cull: (
				(counter.damagingMoves.size < 2 || moves.has('rest') || counter.setupType && !moves.has('spore')) ||
				(!moves.has('substitute') && (counter.get('Physical') < 4 || moves.has('fakeout'))) ||
				// Breloom likes to have coverage
				(species.id === 'breloom' && (moves.has('machpunch') || moves.has('skyuppercut')))
			)};
		case 'moonlight':
			return {cull: moves.has('wish') || moves.has('protect')};
		case 'perishsong':
			return {cull: !moves.has('meanlook') && !moves.has('spiderweb')};
		case 'protect':
			return {cull: !abilities.has('Speed Boost') && ['perishsong', 'toxic', 'wish'].every(m => !moves.has(m))};
		case 'refresh':
			return {cull: !counter.setupType};
		case 'rest':
			return {cull: (
				movePool.includes('sleeptalk') ||
				(!moves.has('sleeptalk') && (!!counter.get('recovery') || movePool.includes('curse')))
			)};
		case 'solarbeam':
			if (movePool.length > 1) {
				const sunnyday = movePool.indexOf('sunnyday');
				if (sunnyday >= 0) this.fastPop(movePool, sunnyday);
			}
			return {cull: !moves.has('sunnyday')};

		// Bad after setup
		case 'aromatherapy': case 'healbell':
			return {cull: moves.has('rest') || !!teamDetails.statusCure};
		case 'confuseray':
			return {cull: !!counter.setupType || restTalk};
		case 'counter': case 'mirrorcoat':
			return {cull: !!counter.setupType || ['rest', 'substitute', 'toxic'].some(m => moves.has(m))};
		case 'destinybond':
			return {cull: !!counter.setupType || moves.has('explosion') || moves.has('selfdestruct')};
		case 'doubleedge': case 'facade': case 'fakeout': case 'waterspout':
			return {cull: (
				(!types.has(move.type) && counter.get('Status') >= 1) ||
				(move.id === 'doubleedge' && moves.has('return'))
			)};
		case 'encore': case 'painsplit': case 'recover': case 'yawn':
			return {cull: restTalk};
		case 'explosion': case 'machpunch': case 'selfdestruct':
			// Snorlax doesn't want to roll selfdestruct as its only STAB move
			const snorlaxCase = species.id === 'snorlax' && !moves.has('return') && !moves.has('bodyslam');
			return {cull: snorlaxCase || moves.has('rest') || moves.has('substitute') || !!counter.get('recovery')};
		case 'haze':
			return {cull: !!counter.setupType || moves.has('raindance') || restTalk};
		case 'icywind': case 'pursuit': case 'superpower': case 'transform':
			return {cull: !!counter.setupType || moves.has('rest')};
		case 'leechseed':
			return {cull: !!counter.setupType || moves.has('explosion')};
		case 'stunspore':
			return {cull: moves.has('sunnyday') || moves.has('toxic')};
		case 'lightscreen':
			return {cull: !!counter.setupType || !!counter.get('speedsetup')};
		case 'meanlook': case 'spiderweb':
			return {cull: !!counter.get('speedsetup') || (!moves.has('batonpass') && !moves.has('perishsong'))};
		case 'morningsun':
			return {cull: counter.get('speedsetup') >= 1};
		case 'quickattack':
			return {cull: (
				!!counter.get('speedsetup') ||
				moves.has('substitute') ||
				(!types.has('Normal') && !!counter.get('Status'))
			)};
		case 'rapidspin':
			return {cull: !!counter.setupType || moves.has('rest') || !!teamDetails.rapidSpin};
		case 'reflect':
			return {cull: !!counter.setupType || !!counter.get('speedsetup')};
		case 'roar': case 'whirlwind':
			return {cull: moves.has('sleeptalk') || moves.has('rest')};
		case 'seismictoss':
			return {cull: !!counter.setupType || moves.has('thunderbolt')};
		case 'spikes':
			return {cull: !!counter.setupType || moves.has('substitute') || restTalk || !!teamDetails.spikes};
		case 'substitute':
			const restOrDD = moves.has('rest') || (moves.has('dragondance') && !moves.has('bellydrum'));
			// This cull condition otherwise causes mono-solarbeam Entei
			return {cull: restOrDD || (species.id !== 'entei' && !moves.has('batonpass') && movePool.includes('calmmind'))};
		case 'thunderwave':
			return {cull: !!counter.setupType || moves.has('bodyslam') ||
				moves.has('substitute') && movePool.includes('toxic') || restTalk};
		case 'toxic':
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				['endure', 'focuspunch', 'raindance', 'yawn', 'hypnosis'].some(m => moves.has(m))
			)};
		case 'trick':
			return {cull: counter.get('Status') > 1};
		case 'willowisp':
			return {cull: !!counter.setupType || moves.has('hypnosis') || moves.has('toxic')};

		// Bit redundant to have both
		case 'bodyslam':
			return {cull: moves.has('return') && !!counter.get('Status')};
		case 'headbutt':
			return {cull: !moves.has('bodyslam') && !moves.has('thunderwave')};
		case 'return':
			return {cull: (
				moves.has('endure') ||
				(moves.has('substitute') && moves.has('flail')) ||
				(moves.has('bodyslam') && !counter.get('Status'))
			)};
		case 'fireblast':
			return {cull: moves.has('flamethrower') && !!counter.get('Status')};
		case 'flamethrower':
			return {cull: moves.has('fireblast') && !counter.get('Status')};
		case 'overheat':
			return {cull: moves.has('flamethrower') || moves.has('substitute')};
		case 'hydropump':
			return {cull: moves.has('surf') && !!counter.get('Status')};
		case 'surf':
			return {cull: moves.has('hydropump') && !counter.get('Status')};
		case 'gigadrain':
			return {cull: moves.has('morningsun') || moves.has('toxic')};
		case 'hiddenpower':
			const stabCondition = types.has(move.type) && counter.get(move.type) > 1 && (
				(moves.has('substitute') && !counter.setupType && !moves.has('toxic')) ||
				// This otherwise causes STABless meganium
				(species.id !== 'meganium' && moves.has('toxic') && !moves.has('substitute')) ||
				restTalk
			);
			return {cull: stabCondition || (move.type === 'Grass' && moves.has('sunnyday') && moves.has('solarbeam'))};
		case 'brickbreak': case 'crosschop': case 'skyuppercut':
			return {cull: moves.has('substitute') && (moves.has('focuspunch') || movePool.includes('focuspunch'))};
		case 'earthquake':
			return {cull: moves.has('bonemerang')};
		}

		return {cull: false};
	}

	getItem(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		counter: MoveCounter,
		species: Species
	) {
		// First, the high-priority items
		if (species.name === 'Ditto') return this.sample(['Metal Powder', 'Quick Claw']);
		if (species.name === 'Farfetch\u2019d') return 'Stick';
		if (species.name === 'Marowak') return 'Thick Club';
		if (species.name === 'Pikachu') return 'Light Ball';
		if (species.name === 'Shedinja') return 'Lum Berry';
		if (species.name === 'Unown') return 'Twisted Spoon';

		if (moves.has('trick')) return 'Choice Band';
		if (moves.has('rest') && !moves.has('sleeptalk') && !['Early Bird', 'Natural Cure', 'Shed Skin'].includes(ability)) {
			return 'Chesto Berry';
		}

		// Medium priority items
		if (moves.has('dragondance') && ability !== 'Natural Cure') return 'Lum Berry';
		if ((moves.has('bellydrum') && counter.get('Physical') - counter.get('priority') > 1) || (
			((moves.has('swordsdance') && counter.get('Status') < 2) || (moves.has('bulkup') && moves.has('substitute'))) &&
			!counter.get('priority') &&
			species.baseStats.spe >= 60 && species.baseStats.spe <= 95
		)) {
			return 'Salac Berry';
		}
		if (moves.has('endure') || (
			moves.has('substitute') &&
			['bellydrum', 'endeavor', 'flail', 'reversal'].some(m => moves.has(m))
		)) {
			return (
				species.baseStats.spe <= 100 && ability !== 'Speed Boost' && !counter.get('speedsetup') && !moves.has('focuspunch')
			) ? 'Salac Berry' : 'Liechi Berry';
		}
		if (moves.has('substitute') && counter.get('Physical') >= 3 && species.baseStats.spe >= 120) return 'Liechi Berry';
		if ((moves.has('substitute') || moves.has('raindance')) && counter.get('Special') >= 3) return 'Petaya Berry';
		if (counter.get('Physical') >= 4 && !moves.has('fakeout')) return 'Choice Band';
		if (counter.get('Physical') >= 3 && !moves.has('rapidspin') && (
			['fireblast', 'icebeam', 'overheat'].some(m => moves.has(m)) ||
			Array.from(moves).some(m => {
				const moveData = this.dex.moves.get(m);
				return moveData.category === 'Special' && types.has(moveData.type);
			})
		)) {
			return 'Choice Band';
		}
		if (moves.has('psychoboost')) return 'White Herb';

		// Default to Leftovers
		return 'Leftovers';
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
		case 'Chlorophyll':
			return !moves.has('sunnyday') && !teamDetails['sun'];
		case 'Compound Eyes':
			return !counter.get('inaccurate');
		case 'Hustle':
			return counter.get('Physical') < 2;
		case 'Lightning Rod':
			return species.types.includes('Ground');
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Sand Veil':
			return !teamDetails['sand'];
		case 'Serene Grace':
			return species.id === 'blissey';
		case 'Soundproof': case 'Sturdy':
			// Electrode prefers Static, and Sturdy is bad.
			return true;
		case 'Swift Swim':
			return !moves.has('raindance') && !teamDetails['rain'];
		case 'Swarm':
			return !counter.get('Bug');
		case 'Torrent':
			return !counter.get('Water');
		case 'Water Absorb':
			return abilities.has('Swift Swim');
		}

		return false;
	}

	randomSet(species: string | Species, teamDetails: RandomTeamsTypes.TeamDetails = {}): RandomTeamsTypes.RandomSet {
		species = this.dex.species.get(species);
		let forme = species.name;

		const data = this.randomData[species.id];

		if (typeof species.battleOnly === 'string') forme = species.battleOnly;

		const movePool = (data.moves || Object.keys(this.dex.species.getLearnset(species.id)!)).slice();
		const rejectedPool = [];
		const moves = new Set<string>();
		let ability = '';
		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
		let availableHP = 0;
		for (const setMoveid of movePool) {
			if (setMoveid.startsWith('hiddenpower')) availableHP++;
		}

		const types = new Set(species.types);

		const abilities = new Set(Object.values(species.abilities));

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

				let {cull, isSetup} = this.shouldCullMove(move, types, moves, abilities, counter, movePool, teamDetails, species);

				// This move doesn't satisfy our setup requirements:
				if (
					(counter.setupType === 'Physical' && move.category === 'Special' && !types.has(move.type) && move.type !== 'Fire') ||
					(counter.setupType === 'Special' && move.category === 'Physical' && moveid !== 'superpower')
				) {
					cull = true;
				}
				const moveIsRejectable = (
					!move.weather &&
					(move.category !== 'Status' || !move.flags.heal) &&
					(counter.setupType || !move.stallingMove) &&
					// These moves cannot be rejected in favor of a forced move
					!['batonpass', 'sleeptalk', 'solarbeam', 'substitute', 'sunnyday'].includes(moveid) &&
					(move.category === 'Status' || !types.has(move.type) || (move.basePower && move.basePower < 40 && !move.multihit))
				);
				// Pokemon should usually have at least one STAB move
				const requiresStab = (
					!counter.get('stab') &&
					!moves.has('seismictoss') && !moves.has('nightshade') &&
					species.id !== 'castform' && species.id !== 'umbreon' &&
					// If a Flying-type has Psychic, it doesn't need STAB
					!(moves.has('psychic') && types.has('Flying')) &&
					!(types.has('Ghost') && species.baseStats.spa > species.baseStats.atk) &&
					!(
						// With Calm Mind, Lugia and pure Normal-types are fine without STAB
						counter.setupType === 'Special' && (
							species.id === 'lugia' ||
							(types.has('Normal') && species.types.length < 2)
						)
					) &&
					!(
						// With Swords Dance, Dark-types and pure Water-types are fine without STAB
						counter.setupType === 'Physical' &&
						((types.has('Water') && species.types.length < 2) || types.has('Dark'))
					) &&
					counter.get('physicalpool') + counter.get('specialpool') > 0
				);

				const runEnforcementChecker = (checkerName: string) => {
					if (!this.moveEnforcementCheckers[checkerName]) return false;
					return this.moveEnforcementCheckers[checkerName](
						movePool, moves, abilities, types, counter, species as Species, teamDetails
					);
				};

				if (!cull && !isSetup && moveIsRejectable) {
					// There may be more important moves that this Pokemon needs
					if (
						requiresStab ||
						(counter.setupType && counter.get(counter.setupType) < 2 && !moves.has('refresh')) ||
						(moves.has('substitute') && movePool.includes('morningsun')) ||
						['meteormash', 'spore', 'recover'].some(m => movePool.includes(m))
					) {
						cull = true;
					} else {
						// Pokemon should have moves that benefit their typing and their other moves
						for (const type of types) {
							if (runEnforcementChecker(type)) {
								cull = true;
							}
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
				const moveIsHP = moveid.startsWith('hiddenpower');
				if (
					cull &&
					(movePool.length - availableHP || availableHP && (moveIsHP || !hasHiddenPower))
				) {
					if (move.category !== 'Status' && !move.damage && (!moveIsHP || !availableHP)) {
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

		const abilityData = Array.from(abilities).map(a => this.dex.abilities.get(a)).filter(a => a.gen === 3);
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
				if (ability === ability0.name && ability1.rating > 1) {
					ability = ability1.name;
				} else {
					// Default to the highest rated ability if all are rejected
					ability = abilityData[0].name;
					break;
				}
			}
		} else {
			ability = abilityData[0].name;
		}

		const item = this.getItem(ability, types, moves, counter, species);
		const level = this.adjustLevel || data.level || (species.nfe ? 90 : 80);

		// Prepare optimal HP
		let hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
		if (moves.has('substitute') && ['endeavor', 'flail', 'reversal'].some(m => moves.has(m))) {
			// Endeavor/Flail/Reversal users should be able to use four Substitutes
			if (hp % 4 === 0) evs.hp -= 4;
		} else if (moves.has('substitute') && (item === 'Salac Berry' || item === 'Petaya Berry' || item === 'Liechi Berry')) {
			// Other pinch berry holders should have berries activate after three Substitutes
			while (hp % 4 > 0) {
				evs.hp -= 4;
				hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			}
		}

		// Minimize confusion damage
		if (!counter.get('Physical') && !moves.has('transform')) {
			evs.atk = 0;
			ivs.atk = hasHiddenPower ? ivs.atk - 28 : 0;
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

			// Limit to one Wobbuffet per battle (not just per team)
			if (species.name === 'Wobbuffet' && this.battleHasWobbuffet) continue;
			// Limit to one Ditto per battle in Gen 2
			if (this.dex.gen < 3 && species.name === 'Ditto' && this.battleHasDitto) continue;

			const tier = species.tier;
			const types = species.types;
			const typeCombo = types.slice().sort().join();

			if (!isMonotype && !this.forceMonotype) {
				// Dynamically scale limits for different team sizes. The default and minimum value is 1.
				const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

				// Limit two Pokemon per tier
				if (tierCount[tier] >= 2 * limitFactor) continue;

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
				if (!this.forceMonotype && typeComboCount[typeCombo] >= 1 * limitFactor) continue;
			}

			// Okay, the set passes, add it to our team
			const set = this.randomSet(species, teamDetails);
			pokemon.push(set);

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

			// Updateeam details
			if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails.rain = 1;
			if (set.ability === 'Sand Stream') teamDetails.sand = 1;
			if (set.moves.includes('spikes')) teamDetails.spikes = 1;
			if (set.moves.includes('rapidspin')) teamDetails.rapidSpin = 1;
			if (set.moves.includes('aromatherapy') || set.moves.includes('healbell')) teamDetails.statusCure = 1;

			// In Gen 3, Shadow Tag users can prevent each other from switching out, possibly causing and endless battle or at least causing a long stall war
			// To prevent this, we prevent more than one Wobbuffet in a single battle.
			if (set.ability === 'Shadow Tag') this.battleHasWobbuffet = true;
			if (species.id === 'ditto') this.battleHasDitto = true;
		}

		if (pokemon.length < this.maxTeamSize && !isMonotype && !this.forceMonotype && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}

		return pokemon;
	}
}

export default RandomGen3Teams;
