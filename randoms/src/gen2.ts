import {MoveCounter} from './gen8';
import {RandomGen3Teams} from './gen3';
import {
	Format,
	IDEntry,
	ModdedDex,
	PRNG,
	PRNGSeed,
	RandomTeamsTypes,
	Species,
	StatID,
} from '@pkmn/sim';

/* eslint-disable */
const randomSetsJSON = {"venusaur":{"sets":[{"role":"Setup Sweeper","movepool":["growth","hiddenpowerfire","hiddenpowerice","razorleaf","sleeppowder","synthesis"]}]},"charizard":{"sets":[{"role":"Setup Sweeper","movepool":["bellydrum","earthquake","fireblast","rockslide","swordsdance"]}]},"blastoise":{"sets":[{"role":"Generalist","movepool":["icebeam","rest","sleeptalk","surf"]},{"role":"Bulky Support","movepool":["icebeam","rapidspin","rest","roar","surf","toxic"]}]},"butterfree":{"level":85,"sets":[{"role":"Generalist","movepool":["nightmare","psychic","sleeppowder","substitute"]},{"role":"Fast Attacker","movepool":["psychic","reflect","sleeppowder","stunspore"]},{"role":"Bulky Attacker","movepool":["hiddenpowerbug","psychic","sleeppowder","stunspore"]}]},"beedrill":{"sets":[{"role":"Setup Sweeper","movepool":["agility","hiddenpowerground","sludgebomb","substitute","swordsdance"]}]},"pidgeot":{"sets":[{"role":"Bulky Setup","movepool":["curse","doubleedge","rest","sleeptalk"]},{"role":"Fast Attacker","movepool":["doubleedge","hiddenpowerground","hiddenpowerwater","rest","sleeptalk"]},{"role":"Thief user","movepool":["hiddenpowerground","hiddenpowerwater","return","thief","toxic"]}]},"raticate":{"sets":[{"role":"Generalist","movepool":["doubleedge","irontail","rest","return","sleeptalk","superfang"]}]},"fearow":{"level":71,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","drillpeck","hiddenpowerground","rest","sleeptalk"]}]},"arbok":{"sets":[{"role":"Generalist","movepool":["curse","earthquake","rest","sleeptalk","sludgebomb"]},{"role":"Fast Attacker","movepool":["curse","earthquake","glare","haze","sludgebomb"]},{"role":"Bulky Attacker","movepool":["curse","earthquake","glare","rockslide","sludgebomb"],"preferredTypes":["Ground"]}]},"pikachu":{"sets":[{"role":"Fast Attacker","movepool":["encore","hiddenpowerfire","hiddenpowerice","surf","thunderbolt"]},{"role":"Bulky Attacker","movepool":["hiddenpowerfire","hiddenpowerice","substitute","surf","thunderbolt"]},{"role":"Generalist","movepool":["hiddenpowerice","surf","thunder","thunderbolt"]}]},"raichu":{"sets":[{"role":"Generalist","movepool":["hiddenpowerice","rest","sleeptalk","surf","thunder"]}]},"sandslash":{"sets":[{"role":"Setup Sweeper","movepool":["earthquake","hiddenpowerbug","rockslide","substitute","swordsdance"],"preferredTypes":["Rock"]},{"role":"Generalist","movepool":["earthquake","rest","rockslide","sleeptalk"]}]},"nidoqueen":{"sets":[{"role":"Bulky Attacker","movepool":["earthquake","fireblast","icebeam","moonlight","thunder"],"preferredTypes":["Ice"]},{"role":"Fast Attacker","movepool":["earthquake","icebeam","lovelykiss","thunder"]}]},"nidoking":{"level":67,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","fireblast","icebeam","morningsun","thunder"],"preferredTypes":["Ice"]},{"role":"Fast Attacker","movepool":["earthquake","icebeam","lovelykiss","thunder"]}]},"clefable":{"sets":[{"role":"Bulky Setup","movepool":["bellydrum","bodyslam","hiddenpowerground","moonlight","return","thunderwave"]},{"role":"Bulky Support","movepool":["bodyslam","encore","fireblast","flamethrower","moonlight"]},{"role":"Setup Sweeper","movepool":["curse","moonlight","return","thunderwave"]}]},"ninetales":{"sets":[{"role":"Bulky Support","movepool":["fireblast","flamethrower","hiddenpowergrass","rest","sleeptalk","sunnyday"]}]},"wigglytuff":{"sets":[{"role":"Bulky Support","movepool":["curse","doubleedge","rest","sleeptalk","thunder"]}]},"vileplume":{"sets":[{"role":"Bulky Attacker","movepool":["moonlight","razorleaf","sleeppowder","sludgebomb","stunspore"]},{"role":"Setup Sweeper","movepool":["hiddenpowerground","moonlight","sleeppowder","sludgebomb","swordsdance"]},{"role":"Bulky Setup","movepool":["curse","moonlight","sludgebomb","stunspore"]}]},"parasect":{"sets":[{"role":"Setup Sweeper","movepool":["bodyslam","hiddenpowerground","return","spore","swordsdance"]},{"role":"Bulky Setup","movepool":["hiddenpowerbug","spore","swordsdance","synthesis"]}]},"venomoth":{"sets":[{"role":"Fast Attacker","movepool":["gigadrain","hiddenpowerfire","psychic","sleeppowder","sludgebomb","stunspore"],"preferredTypes":["Fire","Psychic"]},{"role":"Bulky Setup","movepool":["batonpass","curse","sleeppowder","sludgebomb"]},{"role":"Setup Sweeper","movepool":["batonpass","curse","sludgebomb","stunspore"]}]},"dugtrio":{"sets":[{"role":"Fast Attacker","movepool":["earthquake","rockslide","sludgebomb","substitute","thief"],"preferredTypes":["Rock"]}]},"persian":{"sets":[{"role":"Fast Attacker","movepool":["doubleedge","hypnosis","irontail","rest","sleeptalk","thief"]},{"role":"Generalist","movepool":["doubleedge","hypnosis","rest","sleeptalk","thief","thunder"],"preferredTypes":["Electric"]},{"role":"Setup Sweeper","movepool":["curse","doubleedge","rest","sleeptalk"]}]},"golduck":{"sets":[{"role":"Generalist","movepool":["crosschop","hiddenpowerelectric","hydropump","hypnosis","icebeam"]},{"role":"Bulky Attacker","movepool":["crosschop","hiddenpowerelectric","icebeam","rest","sleeptalk","surf"]}]},"primeape":{"sets":[{"role":"Setup Sweeper","movepool":["crosschop","hiddenpowerghost","meditate","rest","rockslide","substitute"]},{"role":"Bulky Setup","movepool":["crosschop","doubleedge","hiddenpowerghost","meditate","rockslide"]},{"role":"Generalist","movepool":["meditate","reversal","rockslide","substitute"]}]},"arcanine":{"sets":[{"role":"Bulky Attacker","movepool":["crunch","doubleedge","fireblast","flamethrower","hiddenpowergrass","rest","sleeptalk"]}]},"poliwhirl":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["bellydrum","earthquake","lovelykiss","return"]},{"role":"Generalist","movepool":["bellydrum","earthquake","hiddenpowerrock","lovelykiss"]}]},"poliwrath":{"sets":[{"role":"Bulky Support","movepool":["earthquake","growth","rest","sleeptalk","submission","surf"]},{"role":"Setup Sweeper","movepool":["bellydrum","earthquake","lovelykiss","return"]},{"role":"Generalist","movepool":["bellydrum","earthquake","hiddenpowerrock","lovelykiss"]}]},"alakazam":{"sets":[{"role":"Bulky Attacker","movepool":["encore","firepunch","hiddenpowerdark","psychic","recover","thunderwave"],"preferredTypes":["Fire"]}]},"machamp":{"sets":[{"role":"Generalist","movepool":["crosschop","curse","rest","rockslide","sleeptalk"]},{"role":"Setup Sweeper","movepool":["crosschop","curse","earthquake","hiddenpowerbug","rockslide"],"preferredTypes":["Rock"]}]},"victreebel":{"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowerground","sleeppowder","sludgebomb","swordsdance","synthesis"]}]},"tentacruel":{"sets":[{"role":"Setup Sweeper","movepool":["hydropump","sludgebomb","substitute","swordsdance"]}]},"golem":{"sets":[{"role":"Bulky Attacker","movepool":["curse","earthquake","explosion","rapidspin","roar","rockslide"]}]},"rapidash":{"sets":[{"role":"Generalist","movepool":["doubleedge","fireblast","hiddenpowergrass","hypnosis","sunnyday"]},{"role":"Bulky Support","movepool":["doubleedge","fireblast","flamethrower","rest","sleeptalk","sunnyday"]}]},"slowbro":{"sets":[{"role":"Generalist","movepool":["psychic","rest","sleeptalk","surf"]}]},"magneton":{"sets":[{"role":"Generalist","movepool":["hiddenpowerice","rest","sleeptalk","thunder"]}]},"farfetchd":{"sets":[{"role":"Generalist","movepool":["agility","batonpass","return","swordsdance"]}]},"dodrio":{"sets":[{"role":"Fast Attacker","movepool":["doubleedge","drillpeck","hiddenpowerground","rest","sleeptalk"]}]},"dewgong":{"sets":[{"role":"Bulky Attacker","movepool":["icebeam","rest","sleeptalk","surf"]},{"role":"Generalist","movepool":["encore","icebeam","protect","toxic"]}]},"muk":{"sets":[{"role":"Generalist","movepool":["curse","explosion","hiddenpowerground","sludgebomb"],"preferredTypes":["Ground"]}]},"cloyster":{"sets":[{"role":"Fast Attacker","movepool":["explosion","icebeam","rapidspin","spikes","surf","toxic"]},{"role":"Generalist","movepool":["explosion","rapidspin","spikes","surf","toxic"]},{"role":"Bulky Support","movepool":["explosion","icebeam","rapidspin","spikes","toxic"]}]},"gengar":{"sets":[{"role":"Generalist","movepool":["explosion","firepunch","hypnosis","icepunch","psychic","thunderbolt"],"preferredTypes":["Electric","Ice"]},{"role":"Fast Attacker","movepool":["destinybond","firepunch","hypnosis","icepunch","psychic","thunderbolt"],"preferredTypes":["Electric","Ice"]}]},"hypno":{"sets":[{"role":"Generalist","movepool":["psychic","rest","seismictoss","sleeptalk","thunderwave"]},{"role":"Setup Sweeper","movepool":["curse","doubleedge","rest","sleeptalk"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","psychic","rest","return"]}]},"kingler":{"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowerground","protect","rest","return","substitute","swordsdance"]},{"role":"Bulky Setup","movepool":["hiddenpowerground","protect","return","substitute","surf","swordsdance"],"preferredTypes":["Normal"]}]},"electrode":{"sets":[{"role":"Generalist","movepool":["explosion","hiddenpowerice","thunderbolt","thunderwave"]},{"role":"Fast Attacker","movepool":["explosion","hiddenpowerice","lightscreen","reflect","thunder","thunderbolt"]}]},"exeggutor":{"sets":[{"role":"Fast Attacker","movepool":["explosion","hiddenpowerfire","hiddenpowergrass","psychic","sleeppowder","stunspore","thief"]},{"role":"Generalist","movepool":["explosion","gigadrain","hiddenpowerfire","psychic"]}]},"marowak":{"sets":[{"role":"Setup Sweeper","movepool":["earthquake","hiddenpowerbug","rockslide","swordsdance"]}]},"hitmonlee":{"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowerghost","hiddenpowerrock","highjumpkick","meditate","rest","substitute"]},{"role":"Bulky Setup","movepool":["doubleedge","hiddenpowerghost","hiddenpowerrock","highjumpkick","meditate"]},{"role":"Generalist","movepool":["bodyslam","hiddenpowerrock","highjumpkick","rest","sleeptalk"]}]},"hitmonchan":{"sets":[{"role":"Setup Sweeper","movepool":["curse","hiddenpowerghost","hiddenpowerrock","highjumpkick","machpunch"]},{"role":"Bulky Setup","movepool":["curse","highjumpkick","rest","sleeptalk"]},{"role":"Generalist","movepool":["bodyslam","hiddenpowerrock","highjumpkick","rest","sleeptalk"]}]},"lickitung":{"sets":[{"role":"Setup Sweeper","movepool":["bodyslam","earthquake","protect","return","swordsdance"]},{"role":"Bulky Setup","movepool":["curse","doubleedge","rest","return","sleeptalk","swordsdance"]},{"role":"Bulky Attacker","movepool":["doubleedge","earthquake","rest","sleeptalk","surf","thunder"]}]},"weezing":{"sets":[{"role":"Fast Attacker","movepool":["explosion","fireblast","sludgebomb","thunder"]},{"role":"Generalist","movepool":["explosion","hiddenpowerwater","sludgebomb","thunder"]},{"role":"Bulky Attacker","movepool":["fireblast","haze","hiddenpowerwater","painsplit","sludgebomb","thunder"],"preferredTypes":["Electric"]}]},"rhydon":{"sets":[{"role":"Fast Attacker","movepool":["curse","earthquake","rest","roar","rockslide","sleeptalk"]},{"role":"Bulky Setup","movepool":["curse","rest","rockslide","sleeptalk"]}]},"tangela":{"sets":[{"role":"Setup Sweeper","movepool":["gigadrain","growth","hiddenpowerfire","hiddenpowerice","sleeppowder","synthesis"]}]},"kangaskhan":{"sets":[{"role":"Bulky Attacker","movepool":["doubleedge","earthquake","rest","sleeptalk"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","doubleedge","rest","return","sleeptalk"]},{"role":"Setup Sweeper","movepool":["bodyslam","curse","earthquake","return","roar"]}]},"seaking":{"sets":[{"role":"Bulky Setup","movepool":["agility","hydropump","return","substitute","swordsdance"],"preferredTypes":["Normal"]},{"role":"Setup Sweeper","movepool":["agility","hiddenpowerground","return","substitute","swordsdance"]}]},"starmie":{"sets":[{"role":"Bulky Attacker","movepool":["psychic","rapidspin","recover","surf","thunderbolt","thunderwave"],"preferredTypes":["Psychic"]},{"role":"Bulky Support","movepool":["icebeam","psychic","recover","surf","thunder"]}]},"mrmime":{"sets":[{"role":"Fast Attacker","movepool":["encore","firepunch","hypnosis","psychic","thief","thunder"]},{"role":"Generalist","movepool":["firepunch","psychic","rest","sleeptalk","thunder"]},{"role":"Bulky Attacker","movepool":["barrier","batonpass","psychic","thunder"]}]},"scyther":{"sets":[{"role":"Bulky Setup","movepool":["batonpass","doubleedge","hiddenpowerground","swordsdance"]}]},"jynx":{"sets":[{"role":"Generalist","movepool":["icebeam","lovelykiss","nightmare","psychic"]},{"role":"Thief user","movepool":["icebeam","lovelykiss","psychic","thief"]},{"role":"Bulky Attacker","movepool":["icebeam","lovelykiss","psychic","substitute"]}]},"electabuzz":{"sets":[{"role":"Fast Attacker","movepool":["crosschop","icepunch","pursuit","thief","thunder","thunderbolt"],"preferredTypes":["Fighting","Ice"]},{"role":"Bulky Attacker","movepool":["icepunch","rest","sleeptalk","thunder"]}]},"magmar":{"level":71,"sets":[{"role":"Setup Sweeper","movepool":["crosschop","fireblast","hiddenpowerground","sunnyday","thunderpunch"],"preferredTypes":["Electric"]},{"role":"Fast Attacker","movepool":["crosschop","fireblast","hiddenpowerground","thief","thunderpunch"],"preferredTypes":["Electric"]}]},"pinsir":{"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowerground","protect","rest","return","substitute","swordsdance"]}]},"tauros":{"sets":[{"role":"Generalist","movepool":["curse","doubleedge","earthquake","rest","return","sleeptalk"]}]},"gyarados":{"sets":[{"role":"Generalist","movepool":["doubleedge","hiddenpowerflying","hydropump","roar","thunder"],"preferredTypes":["Electric"]},{"role":"Bulky Attacker","movepool":["doubleedge","hiddenpowerflying","hydropump","rest","sleeptalk","surf"]},{"role":"Bulky Setup","movepool":["curse","hiddenpowerflying","rest","sleeptalk"]}]},"lapras":{"sets":[{"role":"Generalist","movepool":["icebeam","rest","sleeptalk","surf"]},{"role":"Fast Attacker","movepool":["rest","sleeptalk","surf","thunder"]},{"role":"Bulky Attacker","movepool":["icebeam","rest","sleeptalk","thunder"]}]},"ditto":{"level":90,"sets":[{"role":"Generalist","movepool":["transform"]}]},"vaporeon":{"sets":[{"role":"Generalist","movepool":["growth","rest","sleeptalk","surf"]}]},"jolteon":{"sets":[{"role":"Setup Sweeper","movepool":["batonpass","growth","hiddenpowerice","substitute","thunderbolt"]}]},"flareon":{"sets":[{"role":"Setup Sweeper","movepool":["batonpass","fireblast","growth","hiddenpowergrass"]},{"role":"Generalist","movepool":["doubleedge","fireblast","flamethrower","rest","sleeptalk"]}]},"omastar":{"sets":[{"role":"Bulky Support","movepool":["hiddenpowerelectric","icebeam","rest","sandstorm","sleeptalk","surf"]}]},"kabutops":{"level":71,"sets":[{"role":"Bulky Setup","movepool":["hiddenpowerground","hydropump","return","swordsdance"]},{"role":"Setup Sweeper","movepool":["ancientpower","hiddenpowerground","protect","rest","substitute","swordsdance"]}]},"aerodactyl":{"sets":[{"role":"Bulky Setup","movepool":["curse","earthquake","hiddenpowerrock","rest"]},{"role":"Setup Sweeper","movepool":["ancientpower","curse","earthquake","hiddenpowerflying"]},{"role":"Bulky Attacker","movepool":["curse","earthquake","hiddenpowerrock","whirlwind"]}]},"snorlax":{"level":63,"sets":[{"role":"Generalist","movepool":["curse","doubleedge","earthquake","rest","sleeptalk"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","doubleedge","earthquake","rest","return"]},{"role":"Bulky Attacker","movepool":["bodyslam","curse","earthquake","lovelykiss","return","selfdestruct"]}]},"articuno":{"sets":[{"role":"Generalist","movepool":["hiddenpowerelectric","icebeam","rest","sleeptalk","toxic"]}]},"zapdos":{"sets":[{"role":"Generalist","movepool":["hiddenpowerice","rest","sleeptalk","thunder"]}]},"moltres":{"sets":[{"role":"Generalist","movepool":["fireblast","flamethrower","hiddenpowergrass","rest","sleeptalk","sunnyday"]}]},"dragonite":{"sets":[{"role":"Generalist","movepool":["haze","hiddenpowerflying","rest","surf","thunder"]},{"role":"Bulky Attacker","movepool":["icebeam","rest","sleeptalk","thunder"]},{"role":"Fast Attacker","movepool":["dynamicpunch","hiddenpowerflying","icebeam","thunder"]}]},"mewtwo":{"level":59,"sets":[{"role":"Bulky Attacker","movepool":["flamethrower","icebeam","psychic","recover","thunder"]},{"role":"Bulky Setup","movepool":["barrier","flamethrower","psychic","recover","thunder"]}]},"mew":{"sets":[{"role":"Setup Sweeper","movepool":["earthquake","explosion","rockslide","swordsdance"]},{"role":"Bulky Setup","movepool":["earthquake","rockslide","softboiled","swordsdance"]}]},"meganium":{"sets":[{"role":"Bulky Setup","movepool":["bodyslam","earthquake","swordsdance","synthesis"]},{"role":"Setup Sweeper","movepool":["earthquake","hiddenpowerrock","swordsdance","synthesis"]}]},"typhlosion":{"sets":[{"role":"Generalist","movepool":["earthquake","fireblast","flamethrower","rest","sleeptalk","thunderpunch"]},{"role":"Setup Sweeper","movepool":["earthquake","fireblast","sunnyday","thunderpunch"]}]},"feraligatr":{"sets":[{"role":"Bulky Attacker","movepool":["earthquake","hiddenpowerelectric","icebeam","rest","sleeptalk","surf"]}]},"furret":{"level":73,"sets":[{"role":"Bulky Setup","movepool":["curse","doubleedge","rest","sleeptalk"]},{"role":"Bulky Attacker","movepool":["doubleedge","irontail","rest","sleeptalk","surf"]},{"role":"Setup Sweeper","movepool":["curse","irontail","quickattack","return"]}]},"noctowl":{"sets":[{"role":"Thief user","movepool":["hypnosis","return","thief","toxic","whirlwind"]},{"role":"Bulky Support","movepool":["curse","nightshade","rest","return","sleeptalk"]}]},"ledian":{"level":77,"sets":[{"role":"Generalist","movepool":["agility","barrier","batonpass","lightscreen"]}]},"ariados":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["agility","batonpass","growth","sludgebomb"]},{"role":"Setup Sweeper","movepool":["agility","batonpass","curse","sludgebomb"]}]},"crobat":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["haze","hiddenpowerground","rest","toxic","wingattack"]},{"role":"Generalist","movepool":["haze","protect","toxic","wingattack"]}]},"lanturn":{"sets":[{"role":"Generalist","movepool":["rest","sleeptalk","surf","thunder"]}]},"togetic":{"sets":[{"role":"Bulky Support","movepool":["curse","doubleedge","fireblast","rest","sleeptalk"]},{"role":"Setup Sweeper","movepool":["encore","fireblast","solarbeam","sunnyday","zapcannon"],"preferredTypes":["Fire","Grass"]}]},"xatu":{"sets":[{"role":"Bulky Attacker","movepool":["drillpeck","psychic","rest","sleeptalk"]},{"role":"Thief user","movepool":["confuseray","drillpeck","hiddenpowerfire","psychic","thief"]}]},"ampharos":{"sets":[{"role":"Generalist","movepool":["firepunch","hiddenpowerice","rest","sleeptalk","thunder"]}]},"bellossom":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerfire","hiddenpowerice","leechseed","moonlight","razorleaf","sleeppowder","stunspore"]},{"role":"Bulky Setup","movepool":["hiddenpowerground","moonlight","return","stunspore","swordsdance"],"preferredTypes":["Normal"]}]},"azumarill":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["perishsong","rest","surf","whirlpool"]},{"role":"Bulky Support","movepool":["icebeam","lightscreen","rest","sleeptalk","surf","toxic"]},{"role":"Bulky Setup","movepool":["curse","doubleedge","rest","sleeptalk"]}]},"sudowoodo":{"sets":[{"role":"Setup Sweeper","movepool":["curse","earthquake","rockslide","selfdestruct"]},{"role":"Bulky Setup","movepool":["curse","rest","rockslide","sleeptalk"]},{"role":"Thief user","movepool":["earthquake","rockslide","selfdestruct","thief"]}]},"politoed":{"sets":[{"role":"Generalist","movepool":["growth","rest","sleeptalk","surf"]}]},"jumpluff":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["encore","hiddenpowerflying","stunspore","synthesis"]},{"role":"Generalist","movepool":["encore","hiddenpowerflying","leechseed","stunspore"]},{"role":"Bulky Support","movepool":["encore","hiddenpowerflying","sleeppowder","stunspore"]}]},"aipom":{"level":77,"sets":[{"role":"Generalist","movepool":["agility","batonpass","curse","return"]},{"role":"Bulky Setup","movepool":["curse","rest","return","sleeptalk"]}]},"sunflora":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["growth","hiddenpowerfire","hiddenpowerice","razorleaf","synthesis"]}]},"yanma":{"sets":[{"role":"Fast Attacker","movepool":["gigadrain","hiddenpowerflying","return","thief"]},{"role":"Thief user","movepool":["gigadrain","hiddenpowerbug","thief","wingattack"]},{"role":"Setup Sweeper","movepool":["endure","hiddenpowerflying","return","reversal"]}]},"quagsire":{"sets":[{"role":"Generalist","movepool":["earthquake","rest","sleeptalk","surf"]},{"role":"Bulky Attacker","movepool":["earthquake","icebeam","rest","sleeptalk","sludgebomb"]}]},"espeon":{"sets":[{"role":"Setup Sweeper","movepool":["batonpass","growth","hiddenpowerfire","psychic","substitute"]},{"role":"Bulky Setup","movepool":["batonpass","growth","hiddenpowerfire","morningsun","psychic"]}]},"umbreon":{"sets":[{"role":"Bulky Setup","movepool":["batonpass","growth","hiddenpowerdark","moonlight"]}]},"murkrow":{"sets":[{"role":"Generalist","movepool":["drillpeck","hiddenpowerdark","pursuit","toxic"]},{"role":"Thief user","movepool":["drillpeck","haze","hiddenpowerdark","thief","toxic"],"preferredTypes":["Dark"]}]},"slowking":{"sets":[{"role":"Generalist","movepool":["psychic","rest","sleeptalk","surf"]}]},"misdreavus":{"level":67,"sets":[{"role":"Generalist","movepool":["meanlook","painsplit","perishsong","protect","thunder"]},{"role":"Thief user","movepool":["hypnosis","psychic","thief","thunder"]},{"role":"Bulky Attacker","movepool":["hypnosis","painsplit","psychic","shadowball","thief","thunder"],"preferredTypes":["Electric"]}]},"unown":{"level":100,"sets":[{"role":"Generalist","movepool":["hiddenpowerpsychic"]}]},"wobbuffet":{"level":95,"sets":[{"role":"Generalist","movepool":["counter","mimic","mirrorcoat","safeguard"]}]},"girafarig":{"level":71,"sets":[{"role":"Fast Attacker","movepool":["earthquake","psychic","rest","return","sleeptalk","thunder"]},{"role":"Setup Sweeper","movepool":["agility","amnesia","batonpass","psychic"]},{"role":"Bulky Setup","movepool":["agility","batonpass","psychic","thunder"]}]},"forretress":{"sets":[{"role":"Generalist","movepool":["explosion","hiddenpowerbug","hiddenpowersteel","rapidspin","reflect","spikes","toxic"]}]},"dunsparce":{"sets":[{"role":"Setup Sweeper","movepool":["curse","glare","hiddenpowerground","return"]},{"role":"Generalist","movepool":["curse","rest","return","sleeptalk","thunder"]}]},"gligar":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","hiddenpowerflying","rest","sleeptalk"]},{"role":"Thief user","movepool":["counter","earthquake","hiddenpowerflying","thief","toxic"]}]},"steelix":{"sets":[{"role":"Generalist","movepool":["curse","earthquake","irontail","rest","roar","sleeptalk"]},{"role":"Bulky Attacker","movepool":["curse","earthquake","irontail","rest"]},{"role":"Bulky Setup","movepool":["curse","earthquake","explosion","irontail","roar"]}]},"granbull":{"sets":[{"role":"Bulky Setup","movepool":["curse","rest","return","sleeptalk"]},{"role":"Bulky Support","movepool":["healbell","hiddenpowerground","rest","return","sleeptalk"]},{"role":"Setup Sweeper","movepool":["curse","hiddenpowerground","lovelykiss","return"]}]},"qwilfish":{"level":71,"sets":[{"role":"Generalist","movepool":["haze","hydropump","rest","sleeptalk","sludgebomb","spikes"]},{"role":"Bulky Setup","movepool":["curse","hiddenpowerground","hydropump","sludgebomb","spikes"]}]},"scizor":{"sets":[{"role":"Generalist","movepool":["agility","batonpass","hiddenpowerbug","hiddenpowersteel","swordsdance"]},{"role":"Setup Sweeper","movepool":["agility","hiddenpowerground","return","swordsdance"]},{"role":"Bulky Setup","movepool":["curse","hiddenpowerbug","hiddenpowersteel","rest","sleeptalk","swordsdance"]}]},"shuckle":{"sets":[{"role":"Bulky Setup","movepool":["defensecurl","rest","rollout","toxic"]}]},"heracross":{"sets":[{"role":"Generalist","movepool":["curse","earthquake","megahorn","rest","sleeptalk"]},{"role":"Setup Sweeper","movepool":["curse","earthquake","hiddenpowerrock","megahorn"]}]},"sneasel":{"sets":[{"role":"Generalist","movepool":["hiddenpowerground","moonlight","return","toxic"]},{"role":"Bulky Attacker","movepool":["dynamicpunch","icebeam","moonlight","return"]},{"role":"Thief user","movepool":["dynamicpunch","moonlight","return","thief"]}]},"ursaring":{"sets":[{"role":"Generalist","movepool":["curse","earthquake","rest","return","sleeptalk"]}]},"magcargo":{"sets":[{"role":"Bulky Attacker","movepool":["earthquake","fireblast","flamethrower","hiddenpowergrass","rest","rockslide","sleeptalk"]},{"role":"Bulky Setup","movepool":["curse","fireblast","flamethrower","rest","rockslide"]}]},"piloswine":{"sets":[{"role":"Generalist","movepool":["earthquake","icebeam","rest","sleeptalk"]}]},"corsola":{"sets":[{"role":"Bulky Attacker","movepool":["curse","icebeam","recover","rockslide","sandstorm","surf","toxic"]}]},"octillery":{"sets":[{"role":"Bulky Attacker","movepool":["flamethrower","hiddenpowerelectric","icebeam","rest","sleeptalk","surf"]}]},"delibird":{"level":81,"sets":[{"role":"Thief user","movepool":["hiddenpowerflying","icebeam","rapidspin","spikes","thief","toxic"]}]},"mantine":{"level":77,"sets":[{"role":"Generalist","movepool":["hiddenpowerelectric","icebeam","rest","sleeptalk","surf"]}]},"skarmory":{"sets":[{"role":"Generalist","movepool":["curse","drillpeck","rest","sleeptalk"]},{"role":"Bulky Setup","movepool":["curse","drillpeck","rest","toxic","whirlwind"]}]},"houndoom":{"sets":[{"role":"Setup Sweeper","movepool":["crunch","fireblast","pursuit","solarbeam","sunnyday"],"preferredTypes":["Grass"]},{"role":"Bulky Attacker","movepool":["crunch","fireblast","rest","sleeptalk"]},{"role":"Generalist","movepool":["counter","crunch","fireblast","pursuit"]}]},"kingdra":{"sets":[{"role":"Generalist","movepool":["dragonbreath","icebeam","rest","sleeptalk","surf"]}]},"donphan":{"sets":[{"role":"Generalist","movepool":["curse","earthquake","hiddenpowerrock","rest","sleeptalk"]},{"role":"Bulky Setup","movepool":["curse","earthquake","hiddenpowerrock","roar"]}]},"porygon2":{"sets":[{"role":"Bulky Setup","movepool":["curse","doubleedge","icebeam","recover","thunder","thunderwave"]}]},"stantler":{"level":71,"sets":[{"role":"Generalist","movepool":["curse","earthquake","rest","return","sleeptalk"]}]},"smeargle":{"sets":[{"role":"Generalist","movepool":["agility","batonpass","spikes","spore","swordsdance"]}]},"hitmontop":{"sets":[{"role":"Setup Sweeper","movepool":["curse","hiddenpowerghost","hiddenpowerrock","highjumpkick","machpunch"]},{"role":"Bulky Setup","movepool":["curse","highjumpkick","rest","sleeptalk"]},{"role":"Generalist","movepool":["hiddenpowerghost","hiddenpowerrock","highjumpkick","rest","sleeptalk"]}]},"miltank":{"sets":[{"role":"Bulky Setup","movepool":["bodyslam","curse","earthquake","healbell","milkdrink"]}]},"blissey":{"sets":[{"role":"Bulky Support","movepool":["counter","flamethrower","healbell","icebeam","lightscreen","present","softboiled","thunderwave","toxic"]},{"role":"Bulky Attacker","movepool":["healbell","present","softboiled","thunder"]}]},"raikou":{"sets":[{"role":"Generalist","movepool":["crunch","hiddenpowerice","rest","sleeptalk","thunder"]}]},"entei":{"sets":[{"role":"Setup Sweeper","movepool":["fireblast","hiddenpowerground","hiddenpowerrock","solarbeam","sunnyday"]},{"role":"Generalist","movepool":["fireblast","flamethrower","hiddenpowergrass","rest","return","sleeptalk"]}]},"suicune":{"sets":[{"role":"Generalist","movepool":["icebeam","rest","sleeptalk","surf","toxic"]},{"role":"Bulky Support","movepool":["icebeam","rest","roar","surf","toxic"]}]},"tyranitar":{"sets":[{"role":"Generalist","movepool":["crunch","earthquake","fireblast","icebeam","pursuit","rockslide","thunderbolt"]},{"role":"Bulky Support","movepool":["curse","earthquake","rest","rockslide","sleeptalk"]},{"role":"Bulky Setup","movepool":["curse","rest","roar","rockslide"]}]},"lugia":{"sets":[{"role":"Setup Sweeper","movepool":["aeroblast","curse","earthquake","recover"]},{"role":"Bulky Setup","movepool":["curse","hiddenpowerflying","recover","whirlwind"]},{"role":"Bulky Support","movepool":["psychic","recover","thunder","whirlwind"]}]},"hooh":{"sets":[{"role":"Setup Sweeper","movepool":["curse","earthquake","hiddenpowerflying","recover"]},{"role":"Bulky Attacker","movepool":["earthquake","recover","sacredfire","thunder"]}]},"celebi":{"sets":[{"role":"Bulky Support","movepool":["healbell","leechseed","psychic","recover","toxic"]},{"role":"Bulky Attacker","movepool":["healbell","hiddenpowergrass","psychic","recover"]},{"role":"Bulky Setup","movepool":["batonpass","curse","recover","return"]}]}} as any;
/* eslint-enable */

// Moves that restore HP:
const RECOVERY_MOVES = [
	'milkdrink', 'moonlight', 'morningsun', 'painsplit', 'recover', 'softboiled', 'synthesis',
];
// Moves that boost Attack:
const PHYSICAL_SETUP = [
	'bellydrum', 'curse', 'meditate', 'swordsdance',
];
// Conglomerate for ease of access
const SETUP = [
	'agility', 'bellydrum', 'curse', 'growth', 'meditate', 'raindance', 'sunnyday', 'swordsdance',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'explosion', 'icywind', 'machpunch', 'pursuit', 'quickattack', 'rapidspin', 'selfdestruct', 'skyattack', 'thief',
];

// Moves that should be paired together when possible
const MOVE_PAIRS = [
	['sleeptalk', 'rest'],
	['meanlook', 'perishsong'],
];

export class RandomGen2Teams extends RandomGen3Teams {
	randomSets: {[species: IDEntry]: RandomTeamsTypes.RandomSpeciesData} = randomSetsJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);
		this.noStab = NO_STAB;
		this.moveEnforcementCheckers = {
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Flying') && ['gligar', 'murkrow', 'xatu'].includes(species.id)
			),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => !counter.get('Ice'),
			Normal: (movePool, moves, abilities, types, counter) => !counter.get('Normal'),
			Poison: (movePool, moves, abilities, types, counter) => !counter.get('Poison'),
			Psychic: (movePool, moves, abilities, types, counter, species) => !counter.get('Psychic') && species.id !== 'starmie',
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock') && species.id !== 'magcargo',
			Water: (movePool, moves, abilities, types, counter) => !counter.get('Water'),
		};
	}

	cullMovePool(
		types: string[],
		moves: Set<string>,
		abilities = {},
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
		if (teamDetails.spikes) {
			if (movePool.includes('spikes')) this.fastPop(movePool, movePool.indexOf('spikes'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.rapidSpin) {
			if (movePool.includes('rapidspin')) this.fastPop(movePool, movePool.indexOf('rapidspin'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.statusCure) {
			if (movePool.includes('healbell')) this.fastPop(movePool, movePool.indexOf('healbell'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}

		// General incompatibilities
		const incompatiblePairs = [
			// These moves don't mesh well with other aspects of the set
			[PHYSICAL_SETUP, PHYSICAL_SETUP],
			[SETUP, 'haze'],
			['bodyslam', 'thunderwave'],
			[['stunspore', 'thunderwave'], 'toxic'],

			// These attacks are redundant with each other
			['surf', 'hydropump'],
			[['bodyslam', 'return'], ['bodyslam', 'doubleedge']],
			['fireblast', 'flamethrower'],
			['thunder', 'thunderbolt'],
		];

		for (const pair of incompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

		if (!role.includes('Bulky')) this.incompatibleMoves(moves, movePool, ['rest', 'sleeptalk'], 'roar');
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
		const preferredTypes = preferredType ? preferredType.split(',') : [];
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

		// Enforce Destiny Bond, Explosion, Present, Spikes and Spore
		for (const moveid of ['destinybond', 'explosion', 'present', 'spikes', 'spore']) {
			if (movePool.includes(moveid)) {
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce Baton Pass on Smeargle
		if (movePool.includes('batonpass') && species.id === 'smeargle') {
			counter = this.addMove('batonpass', moves, types, abilities, teamDetails, species, isLead,
				movePool, preferredType, role);
		}

		// Enforce moves of all Preferred Types
		for (const type of preferredTypes) {
			if (!counter.get(type)) {
				const stabMoves = [];
				for (const moveid of movePool) {
					const move = this.dex.moves.get(moveid);
					const moveType = this.getMoveType(move, species, abilities, preferredType);
					if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && type === moveType) {
						stabMoves.push(moveid);
					}
				}
				if (stabMoves.length) {
					const moveid = this.sample(stabMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
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
			}
		}

		// Enforce recovery
		if (['Bulky Support', 'Bulky Attacker', 'Bulky Setup'].includes(role)) {
			const recoveryMoves = movePool.filter(moveid => RECOVERY_MOVES.includes(moveid));
			if (recoveryMoves.length) {
				const moveid = this.sample(recoveryMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
			// Rest/Sleep Talk count as recovery in Gen 2
			if (movePool.includes('rest')) {
				counter = this.addMove('rest', moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
			if (movePool.includes('sleeptalk')) {
				counter = this.addMove('sleeptalk', moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce setup
		if (role.includes('Setup')) {
			// First, try to add a non-Speed setup move
			const nonSpeedSetupMoves = movePool.filter(moveid => SETUP.includes(moveid) && moveid !== 'agility');
			if (nonSpeedSetupMoves.length) {
				const moveid = this.sample(nonSpeedSetupMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			} else {
				if (movePool.includes('agility')) {
					counter = this.addMove('agility', moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
			}
		}

		// Enforce Thief
		if (role === 'Thief user') {
			if (movePool.includes('thief')) {
				counter = this.addMove('thief', moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce a move not on the noSTAB list
		if (!counter.damagingMoves.size && !moves.has('present')) {
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
		if (['Fast Attacker', 'Setup Sweeper', 'Bulky Attacker'].includes(role)) {
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
		// First, the high-priority items
		if (species.id === 'ditto') return 'Metal Powder';
		if (species.id === 'marowak') return 'Thick Club';
		if (species.id === 'pikachu') return 'Light Ball';

		if (moves.has('thief')) return '';

		if (moves.has('flail')) return 'Pink Bow';
		if (moves.has('reversal')) return 'Black Belt';

		if (moves.has('rest') && !moves.has('sleeptalk') && !role.includes('Bulky')) return 'Mint Berry';

		if (moves.has('bellydrum') && !counter.get('recovery') && this.randomChance(1, 2)) return 'Miracle Berry';

		// Default to Leftovers
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

		const set = this.sampleIfArray(sets);
		const role = set.role;
		const movePool: string[] = Array.from(set.movepool);
		const preferredTypes = set.preferredTypes;
		// In Gen 2, if a set has multiple preferred types, enforce all of them.
		const preferredType = preferredTypes ? preferredTypes.join() : '';

		const ability = '';
		let item = undefined;

		const evs = {hp: 255, atk: 255, def: 255, spa: 255, spd: 255, spe: 255};
		const ivs = {hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30};

		const types = species.types;
		const abilities: string[] = [];

		// Get moves
		const moves = this.randomMoveset(types, abilities, teamDetails, species, isLead, movePool,
			preferredType, role);
		const counter = this.newQueryMoves(moves, species, preferredType, abilities);

		// Get items
		item = this.getItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);

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
			const hpIVs: {[k: string]: Partial<typeof ivs>} = {
				dragon: {def: 28},
				ice: {def: 26},
				psychic: {def: 24},
				electric: {atk: 28},
				grass: {atk: 28, def: 28},
				water: {atk: 28, def: 26},
				fire: {atk: 28, def: 24},
				steel: {atk: 26},
				ghost: {atk: 26, def: 28},
				bug: {atk: 26, def: 26},
				rock: {atk: 26, def: 24},
				ground: {atk: 24},
				poison: {atk: 24, def: 28},
				flying: {atk: 24, def: 26},
				fighting: {atk: 24, def: 24},
			};
			let iv: StatID;
			for (iv in hpIVs[hpType]) {
				ivs[iv] = hpIVs[hpType][iv]!;
			}
			if (ivs.atk === 28 || ivs.atk === 24) ivs.hp = 14;
			if (ivs.def === 28 || ivs.def === 24) ivs.hp -= 8;
		}

		// Prepare optimal HP
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if (moves.has('substitute') && item !== 'Leftovers') {
				// Should be able to use four Substitutes
				if (hp % 4 > 0) break;
			} else if (moves.has('bellydrum') && item !== 'Leftovers') {
				// Belly Drum users without Leftovers should reach exactly 50% HP
				if (hp % 2 === 0) break;
			} else {
				break;
			}
			evs.hp -= 4;
		}

		// shuffle moves to add more randomness to camomons
		const shuffledMoves = Array.from(moves);
		this.prng.shuffle(shuffledMoves);

		return {
			name: species.baseSpecies,
			species: forme,
			level,
			moves: shuffledMoves,
			ability: 'No Ability',
			evs,
			ivs,
			item,
			role,
			// No shiny chance because Gen 2 shinies have bad IVs
			shiny: false,
			gender: species.gender ? species.gender : 'M',
		};
	}
}

export default RandomGen2Teams;
