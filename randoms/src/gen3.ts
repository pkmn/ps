import {MoveCounter, OldRandomBattleSpecies} from './gen8';
import {RandomGen4Teams} from './gen4';
import {Utils} from './utils';
import {
	Ability,
	Format,
	ModdedDex,
	Move,
	PRNG,
	PRNGSeed,
	RandomTeamsTypes,
	Species,
	StatID,
} from '@pkmn/sim';

/* eslint-disable */
const randomSetsJSON = {"venusaur":{"level":82,"sets":[{"role":"Staller","movepool":["hiddenpowergrass","leechseed","sleeppowder","sludgebomb","substitute"]},{"role":"Setup Sweeper","movepool":["earthquake","hiddenpowerghost","sleeppowder","sludgebomb","swordsdance","synthesis"],"preferredTypes":["Ground"]}]},"charizard":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["dragondance","earthquake","fireblast","hiddenpowerflying","rockslide"],"preferredTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["bellydrum","earthquake","hiddenpowerflying","rockslide","substitute"],"preferredTypes":["Ground"]}]},"blastoise":{"level":83,"sets":[{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","surf","toxic"]},{"role":"Bulky Attacker","movepool":["icebeam","rapidspin","refresh","roar","surf","toxic"]},{"role":"Staller","movepool":["icebeam","protect","refresh","surf","toxic"]}]},"butterfree":{"level":95,"sets":[{"role":"Generalist","movepool":["hiddenpowerfire","morningsun","psychic","sleeppowder","stunspore","toxic"],"preferredTypes":["Psychic"]}]},"beedrill":{"level":91,"sets":[{"role":"Berry Sweeper","movepool":["brickbreak","endure","hiddenpowerbug","sludgebomb","swordsdance"],"preferredTypes":["Bug"]},{"role":"Fast Attacker","movepool":["brickbreak","doubleedge","hiddenpowerbug","sludgebomb","swordsdance"]}]},"pidgeot":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["aerialace","doubleedge","hiddenpowerground","quickattack","return","toxic"],"preferredTypes":["Ground"]},{"role":"Berry Sweeper","movepool":["aerialace","hiddenpowerground","return","substitute"]}]},"raticate":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","hiddenpowerground","quickattack","return","shadowball"]},{"role":"Fast Attacker","movepool":["doubleedge","facade","hiddenpowerground","return","shadowball"]},{"role":"Berry Sweeper","movepool":["return","reversal","shadowball","substitute"]}]},"fearow":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["batonpass","doubleedge","drillpeck","hiddenpowerground","quickattack","return"],"preferredTypes":["Ground"]}]},"arbok":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hiddenpowerghost","rest","rockslide","sleeptalk","sludgebomb"],"preferredTypes":["Ground"]}]},"pikachu":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["encore","hiddenpowerice","substitute","surf","thunderbolt"],"preferredTypes":["Ice","Water"]},{"role":"Wallbreaker","movepool":["hiddenpowerice","surf","thunderbolt","volttackle"]}]},"raichu":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["encore","hiddenpowerice","surf","thunderbolt","thunderwave","toxic"],"preferredTypes":["Ice"]},{"role":"Berry Sweeper","movepool":["hiddenpowerice","substitute","surf","thunderbolt"]}]},"sandslash":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","hiddenpowerbug","rapidspin","rockslide","swordsdance","toxic"],"preferredTypes":["Rock"]}]},"nidoqueen":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["earthquake","fireblast","icebeam","shadowball","sludgebomb","substitute","thunderbolt"]}]},"nidoking":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["earthquake","fireblast","icebeam","megahorn","shadowball","sludgebomb","substitute","thunderbolt"]}]},"clefable":{"level":84,"sets":[{"role":"Bulky Support","movepool":["fireblast","return","shadowball","softboiled","thunderwave","toxic"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","softboiled","thunderbolt"]}]},"ninetales":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["fireblast","flamethrower","hiddenpowergrass","hypnosis","substitute","toxic","willowisp"]}]},"wigglytuff":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["bodyslam","fireblast","protect","wish"]},{"role":"Bulky Support","movepool":["doubleedge","protect","thunderwave","toxic","wish"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"]}]},"vileplume":{"level":85,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","hiddenpowerfire","hiddenpowergrass","sleeppowder","sludgebomb","synthesis"]}]},"parasect":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["aromatherapy","gigadrain","hiddenpowerbug","return","spore","stunspore"],"preferredTypes":["Normal"]}]},"venomoth":{"level":88,"sets":[{"role":"Generalist","movepool":["batonpass","hiddenpowerfire","psychic","signalbeam","sleeppowder","sludgebomb","substitute"]},{"role":"Bulky Support","movepool":["hiddenpowerfire","psychic","signalbeam","sleeppowder","sludgebomb"]}]},"dugtrio":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hiddenpowerbug","rockslide","sludgebomb"]}]},"persian":{"level":88,"sets":[{"role":"Berry Sweeper","movepool":["hiddenpowerground","irontail","return","shadowball","substitute"]},{"role":"Fast Attacker","movepool":["hiddenpowerground","hypnosis","irontail","return","shadowball"]}]},"golduck":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerelectric","hiddenpowergrass","hydropump","hypnosis","icebeam","substitute","surf"],"preferredTypes":["Ice"]}]},"primeape":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["bulkup","crosschop","earthquake","hiddenpowerghost","rockslide"]},{"role":"Setup Sweeper","movepool":["bulkup","crosschop","hiddenpowerghost","rockslide","substitute"]}]},"arcanine":{"level":81,"sets":[{"role":"Bulky Support","movepool":["flamethrower","hiddenpowergrass","rest","sleeptalk","toxic"]},{"role":"Wallbreaker","movepool":["doubleedge","extremespeed","fireblast","hiddenpowerrock","irontail"],"preferredTypes":["Steel"]},{"role":"Staller","movepool":["flamethrower","hiddenpowergrass","hiddenpowerrock","protect","toxic"]}]},"poliwrath":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["brickbreak","bulkup","earthquake","hiddenpowerghost","hydropump","hypnosis","substitute"]},{"role":"Bulky Attacker","movepool":["brickbreak","hiddenpowerghost","hydropump","hypnosis","icebeam","rest","sleeptalk","toxic"]},{"role":"Generalist","movepool":["focuspunch","hydropump","icebeam","substitute","toxic"]}]},"alakazam":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","encore","firepunch","icepunch","psychic","recover","substitute","thunderpunch"],"preferredTypes":["Fire"]}]},"machamp":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["bulkup","crosschop","earthquake","hiddenpowerghost","rockslide"]},{"role":"Bulky Attacker","movepool":["crosschop","hiddenpowerghost","rest","rockslide","sleeptalk"]}]},"victreebel":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerfire","sludgebomb","solarbeam","sunnyday"]},{"role":"Bulky Attacker","movepool":["hiddenpowerground","magicalleaf","sleeppowder","sludgebomb","synthesis"],"preferredTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["hiddenpowerground","sleeppowder","sludgebomb","swordsdance","synthesis"]}]},"tentacruel":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["hydropump","icebeam","rapidspin","sludgebomb","surf","toxic"]}]},"golem":{"level":84,"sets":[{"role":"Staller","movepool":["earthquake","protect","rockslide","toxic"]},{"role":"Bulky Attacker","movepool":["doubleedge","earthquake","explosion","hiddenpowerbug","rockslide","toxic"]}]},"rapidash":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["fireblast","hiddenpowergrass","hiddenpowerrock","substitute","toxic"]}]},"slowbro":{"level":82,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","psychic","rest","sleeptalk","surf","thunderwave","toxic"]},{"role":"Setup Sweeper","movepool":["calmmind","psychic","rest","surf"]},{"role":"Bulky Setup","movepool":["calmmind","rest","sleeptalk","surf"]}]},"magneton":{"level":84,"sets":[{"role":"Staller","movepool":["hiddenpowerice","protect","thunderbolt","toxic"]},{"role":"Bulky Attacker","movepool":["hiddenpowerice","rest","sleeptalk","thunderbolt"]}]},"farfetchd":{"level":97,"sets":[{"role":"Setup Sweeper","movepool":["agility","batonpass","return","swordsdance"]}]},"dodrio":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["batonpass","doubleedge","drillpeck","hiddenpowerground","quickattack","return"],"preferredTypes":["Ground"]},{"role":"Berry Sweeper","movepool":["drillpeck","flail","hiddenpowerground","quickattack","substitute"]}]},"dewgong":{"level":88,"sets":[{"role":"Staller","movepool":["icebeam","protect","surf","toxic"]},{"role":"Bulky Attacker","movepool":["encore","icebeam","rest","sleeptalk","surf","toxic"]}]},"muk":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["brickbreak","explosion","fireblast","haze","hiddenpowerghost","rest","sludgebomb","toxic"]},{"role":"Setup Sweeper","movepool":["brickbreak","curse","hiddenpowerghost","rest","sludgebomb"]}]},"cloyster":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["explosion","icebeam","rapidspin","spikes","surf","toxic"]}]},"gengar":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["destinybond","explosion","firepunch","icepunch","substitute","thunderbolt","willowisp"],"preferredTypes":["Electric","Ice"]}]},"hypno":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["batonpass","calmmind","firepunch","protect","psychic","wish"]},{"role":"Bulky Support","movepool":["batonpass","firepunch","protect","psychic","wish"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"]}]},"kingler":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","hiddenpowerghost","hiddenpowerground","surf","swordsdance"]}]},"electrode":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["explosion","hiddenpowerice","substitute","thunderbolt","toxic"]}]},"exeggutor":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["gigadrain","hiddenpowerfire","psychic","sleeppowder","stunspore","synthesis"]},{"role":"Wallbreaker","movepool":["explosion","gigadrain","hiddenpowerfire","leechseed","psychic","sleeppowder","stunspore","substitute"]},{"role":"Setup Sweeper","movepool":["hiddenpowerfire","psychic","solarbeam","sunnyday"]}]},"marowak":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","earthquake","rockslide","swordsdance"]}]},"hitmonlee":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["bulkup","earthquake","hiddenpowerghost","highjumpkick","machpunch","rockslide"],"preferredTypes":["Ghost"]},{"role":"Berry Sweeper","movepool":["earthquake","hiddenpowerghost","reversal","rockslide","substitute"],"preferredTypes":["Ghost"]}]},"hitmonchan":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["bulkup","earthquake","hiddenpowerghost","machpunch","rapidspin","rockslide","skyuppercut","toxic"],"preferredTypes":["Ghost"]}]},"lickitung":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["bodyslam","flamethrower","protect","wish"]},{"role":"Bulky Support","movepool":["healbell","knockoff","protect","seismictoss","wish"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"]}]},"weezing":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["explosion","fireblast","haze","painsplit","sludgebomb","toxic","willowisp"]}]},"rhydon":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["earthquake","megahorn","rockslide","substitute","swordsdance"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","megahorn","rockslide"]}]},"tangela":{"level":92,"sets":[{"role":"Bulky Support","movepool":["hiddenpowergrass","leechseed","morningsun","sleeppowder","stunspore","toxic"]},{"role":"Setup Sweeper","movepool":["hiddenpowerfire","morningsun","sleeppowder","solarbeam","sunnyday"]}]},"kangaskhan":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","earthquake","rest","return","shadowball","toxic"],"preferredTypes":["Ground"]},{"role":"Bulky Attacker","movepool":["bodyslam","earthquake","protect","return","wish"]}]},"seaking":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowerelectric","hiddenpowergrass","hydropump","icebeam","megahorn","raindance"]}]},"starmie":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["hydropump","icebeam","psychic","recover","surf","thunderbolt"]}]},"mrmime":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","calmmind","encore","firepunch","hypnosis","psychic","substitute","thunderbolt"]}]},"scyther":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["aerialace","batonpass","hiddenpowerground","silverwind","swordsdance"],"preferredTypes":["Ground"]}]},"jynx":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerfire","icebeam","lovelykiss","psychic","substitute"]}]},"electabuzz":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["crosschop","firepunch","focuspunch","hiddenpowergrass","icepunch","substitute","thunderbolt"],"preferredTypes":["Ice"]},{"role":"Berry Sweeper","movepool":["firepunch","hiddenpowergrass","icepunch","substitute","thunderbolt"],"preferredTypes":["Ice"]}]},"magmar":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["crosschop","fireblast","flamethrower","focuspunch","hiddenpowergrass","hiddenpowerice","psychic","substitute","thunderpunch"],"preferredTypes":["Electric"]},{"role":"Berry Sweeper","movepool":["fireblast","flamethrower","hiddenpowergrass","hiddenpowerice","psychic","substitute","thunderpunch"],"preferredTypes":["Electric"]}]},"pinsir":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","hiddenpowerbug","rockslide","swordsdance"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","hiddenpowerbug","rockslide"]}]},"tauros":{"level":77,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","hiddenpowerghost","return"]}]},"gyarados":{"level":74,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","dragondance","earthquake","hiddenpowerflying","hydropump"],"preferredTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["doubleedge","dragondance","earthquake","hiddenpowerflying","substitute"],"preferredTypes":["Ground"]}]},"lapras":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["healbell","icebeam","rest","sleeptalk","surf","thunderbolt","toxic"]},{"role":"Fast Attacker","movepool":["healbell","icebeam","rest","sleeptalk","thunderbolt","toxic"]}]},"ditto":{"level":100,"sets":[{"role":"Generalist","movepool":["transform"]}]},"vaporeon":{"level":80,"sets":[{"role":"Bulky Support","movepool":["icebeam","protect","surf","toxic","wish"]}]},"jolteon":{"level":79,"sets":[{"role":"Staller","movepool":["hiddenpowerice","protect","thunderbolt","toxic"]},{"role":"Fast Attacker","movepool":["batonpass","hiddenpowerice","substitute","thunderbolt"]}]},"flareon":{"level":88,"sets":[{"role":"Bulky Support","movepool":["flamethrower","hiddenpowergrass","protect","toxic","wish"]},{"role":"Wallbreaker","movepool":["doubleedge","fireblast","hiddenpowergrass","hiddenpowerrock","irontail","shadowball","toxic"]}]},"omastar":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowergrass","hydropump","icebeam","spikes","surf"]},{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","raindance","surf"]}]},"kabutops":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["brickbreak","hiddenpowerflying","rockslide","surf","swordsdance"]}]},"aerodactyl":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","earthquake","hiddenpowerflying","rockslide"]},{"role":"Berry Sweeper","movepool":["earthquake","hiddenpowerflying","rockslide","substitute"]}]},"snorlax":{"level":73,"sets":[{"role":"Wallbreaker","movepool":["bodyslam","earthquake","return","selfdestruct","shadowball"]},{"role":"Bulky Support","movepool":["bodyslam","curse","rest","sleeptalk"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","earthquake","rest"]}]},"articuno":{"level":80,"sets":[{"role":"Staller","movepool":["healbell","hiddenpowerfire","icebeam","protect","toxic"]},{"role":"Bulky Attacker","movepool":["hiddenpowerfire","icebeam","rest","sleeptalk"]}]},"zapdos":{"level":76,"sets":[{"role":"Staller","movepool":["hiddenpowerice","protect","thunderbolt","toxic"]},{"role":"Fast Attacker","movepool":["batonpass","hiddenpowerice","substitute","thunderbolt","thunderwave","toxic"]},{"role":"Bulky Attacker","movepool":["hiddenpowerice","rest","sleeptalk","thunderbolt"]}]},"moltres":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","flamethrower","hiddenpowergrass","morningsun","substitute","toxic","willowisp"]}]},"dragonite":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","dragondance","earthquake","healbell","hiddenpowerflying","rest","substitute"],"preferredTypes":["Ground"]},{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","earthquake","fireblast","hiddenpowerflying"],"preferredTypes":["Ground"]}]},"mewtwo":{"level":66,"sets":[{"role":"Bulky Setup","movepool":["calmmind","flamethrower","psychic","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","flamethrower","icebeam","psychic","thunderbolt"],"preferredTypes":["Electric"]}]},"mew":{"level":73,"sets":[{"role":"Bulky Support","movepool":["explosion","flamethrower","psychic","softboiled","thunderwave","transform"]},{"role":"Bulky Setup","movepool":["calmmind","flamethrower","psychic","softboiled","thunderbolt"]},{"role":"Setup Sweeper","movepool":["brickbreak","earthquake","explosion","rockslide","softboiled","swordsdance"],"preferredTypes":["Ground","Rock"]}]},"meganium":{"level":84,"sets":[{"role":"Staller","movepool":["bodyslam","earthquake","hiddenpowergrass","leechseed","synthesis","toxic"]},{"role":"Bulky Setup","movepool":["bodyslam","earthquake","hiddenpowerrock","swordsdance","synthesis"],"preferredTypes":["Ground"]}]},"typhlosion":{"level":79,"sets":[{"role":"Berry Sweeper","movepool":["fireblast","flamethrower","hiddenpowerice","substitute","thunderpunch"]},{"role":"Fast Attacker","movepool":["earthquake","fireblast","flamethrower","focuspunch","hiddenpowerice","substitute","thunderpunch","toxic"],"preferredTypes":["Electric"]}]},"feraligatr":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hiddenpowerflying","hydropump","rockslide","swordsdance"]}]},"furret":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","quickattack","return","shadowball"]},{"role":"Fast Attacker","movepool":["brickbreak","doubleedge","return","shadowball","trick"]},{"role":"Berry Sweeper","movepool":["return","reversal","shadowball","substitute"]}]},"noctowl":{"level":92,"sets":[{"role":"Staller","movepool":["hiddenpowerfire","hypnosis","return","toxic","whirlwind"]}]},"ledian":{"level":100,"sets":[{"role":"Setup Sweeper","movepool":["agility","batonpass","silverwind","swordsdance"]},{"role":"Generalist","movepool":["batonpass","silverwind","substitute","swordsdance"]}]},"ariados":{"level":95,"sets":[{"role":"Setup Sweeper","movepool":["agility","batonpass","signalbeam","sludgebomb"]},{"role":"Bulky Support","movepool":["batonpass","signalbeam","sludgebomb","spiderweb","toxic"],"preferredTypes":["Bug"]},{"role":"Bulky Setup","movepool":["agility","batonpass","sludgebomb","spiderweb"]}]},"crobat":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["aerialace","haze","hiddenpowerground","shadowball","sludgebomb","toxic"],"preferredTypes":["Ground"]}]},"lanturn":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["icebeam","rest","sleeptalk","surf","thunderbolt","toxic"]}]},"togetic":{"level":92,"sets":[{"role":"Staller","movepool":["charm","encore","flamethrower","seismictoss","softboiled","thunderwave","toxic"]}]},"xatu":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","calmmind","gigadrain","hiddenpowerfire","psychic"],"preferredTypes":["Fire"]},{"role":"Bulky Attacker","movepool":["hiddenpowerfire","protect","psychic","wish"]},{"role":"Bulky Support","movepool":["protect","psychic","thunderwave","toxic","wish"]}]},"ampharos":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["firepunch","healbell","hiddenpowerice","thunderbolt","toxic"],"preferredTypes":["Ice"]}]},"bellossom":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerfire","leechseed","magicalleaf","moonlight","sleeppowder","stunspore"]}]},"azumarill":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","hiddenpowerghost","hydropump","return"]},{"role":"Bulky Support","movepool":["brickbreak","encore","hiddenpowerghost","hydropump","rest","return","sleeptalk"],"preferredTypes":["Normal"]}]},"sudowoodo":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["brickbreak","doubleedge","earthquake","explosion","rockslide","toxic"],"preferredTypes":["Ground"]}]},"politoed":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["encore","hiddenpowergrass","hypnosis","icebeam","rest","surf","toxic"],"preferredTypes":["Ice"]},{"role":"Staller","movepool":["encore","icebeam","protect","surf","toxic"]}]},"jumpluff":{"level":85,"sets":[{"role":"Generalist","movepool":["encore","hiddenpowerflying","sleeppowder","synthesis","toxic"]},{"role":"Staller","movepool":["hiddenpowerflying","leechseed","protect","substitute"]}]},"aipom":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["brickbreak","focuspunch","return","shadowball","substitute","thunderwave","toxic"],"preferredTypes":["Ghost"]},{"role":"Generalist","movepool":["batonpass","brickbreak","return","shadowball","substitute","thunderwave","toxic"]},{"role":"Wallbreaker","movepool":["batonpass","brickbreak","doubleedge","return","shadowball"]}]},"sunflora":{"level":95,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerfire","leechseed","razorleaf","synthesis","toxic"]}]},"yanma":{"level":90,"sets":[{"role":"Berry Sweeper","movepool":["hiddenpowerflying","hypnosis","reversal","shadowball","substitute"]},{"role":"Fast Attacker","movepool":["aerialace","doubleedge","hiddenpowerground","hypnosis","signalbeam","toxic"],"preferredTypes":["Ground"]}]},"quagsire":{"level":85,"sets":[{"role":"Staller","movepool":["earthquake","icebeam","protect","toxic"]},{"role":"Bulky Attacker","movepool":["earthquake","icebeam","rest","sleeptalk","surf","toxic"]}]},"espeon":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","calmmind","hiddenpowerfire","morningsun","psychic","substitute"]}]},"umbreon":{"level":85,"sets":[{"role":"Staller","movepool":["hiddenpowerfire","hiddenpowerground","protect","toxic","wish"]},{"role":"Bulky Support","movepool":["batonpass","protect","toxic","wish"]},{"role":"Generalist","movepool":["batonpass","meanlook","moonlight","toxic"]}]},"murkrow":{"level":90,"sets":[{"role":"Berry Sweeper","movepool":["drillpeck","hiddenpowerfighting","hiddenpowerground","shadowball","substitute"]},{"role":"Wallbreaker","movepool":["doubleedge","drillpeck","hiddenpowerfighting","hiddenpowerground","shadowball"]},{"role":"Bulky Attacker","movepool":["drillpeck","hiddenpowerfighting","hiddenpowerground","shadowball","thunderwave","toxic"]}]},"slowking":{"level":84,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","psychic","rest","sleeptalk","surf","thunderwave","toxic"]},{"role":"Setup Sweeper","movepool":["calmmind","psychic","rest","surf"]},{"role":"Bulky Setup","movepool":["calmmind","rest","sleeptalk","surf"]}]},"misdreavus":{"level":85,"sets":[{"role":"Bulky Support","movepool":["hiddenpowerice","painsplit","shadowball","thunderbolt","thunderwave","toxic"]},{"role":"Staller","movepool":["meanlook","perishsong","protect","shadowball"]},{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerice","substitute","thunderbolt"]}]},"unown":{"level":100,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerpsychic"]},{"role":"Wallbreaker","movepool":["hiddenpowerbug","hiddenpowerfighting"]}]},"wobbuffet":{"level":81,"sets":[{"role":"Bulky Support","movepool":["counter","destinybond","encore","mirrorcoat"]}]},"girafarig":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["batonpass","calmmind","crunch","protect","psychic","substitute","thunderbolt","wish"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","protect","psychic","return","shadowball","thunderbolt","thunderwave","toxic","wish"]}]},"forretress":{"level":81,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","hiddenpowerbug","hiddenpowersteel","rapidspin","spikes","toxic"]}]},"dunsparce":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["bodyslam","curse","earthquake","rest","shadowball"]},{"role":"Bulky Attacker","movepool":["earthquake","headbutt","shadowball","thunderwave"]}]},"gligar":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","hiddenpowerflying","quickattack","rockslide","substitute","swordsdance"]}]},"steelix":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["doubleedge","earthquake","explosion","hiddenpowerrock","irontail","rest","roar","toxic"]},{"role":"Bulky Support","movepool":["doubleedge","earthquake","hiddenpowerrock","rest","sleeptalk"]}]},"granbull":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","earthquake","rest","return","sleeptalk"]},{"role":"Wallbreaker","movepool":["bulkup","doubleedge","earthquake","overheat","shadowball"]},{"role":"Bulky Attacker","movepool":["earthquake","healbell","return","shadowball","thunderwave"],"preferredTypes":["Ground"]}]},"qwilfish":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["hydropump","selfdestruct","shadowball","sludgebomb","swordsdance"]},{"role":"Fast Attacker","movepool":["destinybond","hydropump","selfdestruct","sludgebomb","spikes"]}]},"scizor":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","hiddenpowerground","morningsun","silverwind","steelwing","swordsdance"]},{"role":"Generalist","movepool":["agility","batonpass","hiddenpowerground","silverwind","steelwing"]}]},"shuckle":{"level":98,"sets":[{"role":"Staller","movepool":["encore","rest","toxic","wrap"]}]},"heracross":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["brickbreak","earthquake","hiddenpowerghost","megahorn","rockslide"],"preferredTypes":["Rock"]},{"role":"Setup Sweeper","movepool":["brickbreak","megahorn","rockslide","swordsdance"]},{"role":"Berry Sweeper","movepool":["endure","megahorn","reversal","rockslide","substitute"]}]},"sneasel":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["brickbreak","hiddenpowerflying","shadowball","substitute","swordsdance"],"preferredTypes":["Fighting","Ghost"]},{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","hiddenpowerflying","shadowball","swordsdance"],"preferredTypes":["Fighting","Ghost"]}]},"ursaring":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["earthquake","focuspunch","hiddenpowerghost","return"]},{"role":"Fast Attacker","movepool":["earthquake","facade","hiddenpowerghost","return"]},{"role":"Setup Sweeper","movepool":["earthquake","hiddenpowerghost","return","swordsdance"]}]},"magcargo":{"level":95,"sets":[{"role":"Bulky Support","movepool":["fireblast","hiddenpowergrass","rest","sleeptalk","toxic"]}]},"piloswine":{"level":88,"sets":[{"role":"Staller","movepool":["earthquake","icebeam","protect","toxic"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","icebeam","rest","rockslide","sleeptalk"]}]},"corsola":{"level":95,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","icebeam","recover","surf","toxic"]}]},"octillery":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","hiddenpowerelectric","hiddenpowergrass","icebeam","surf","thunderwave"],"preferredTypes":["Ice"]}]},"delibird":{"level":95,"sets":[{"role":"Wallbreaker","movepool":["aerialace","doubleedge","focuspunch","hiddenpowerground","icebeam","quickattack"],"preferredTypes":["Ground"]}]},"mantine":{"level":85,"sets":[{"role":"Bulky Support","movepool":["hiddenpowergrass","icebeam","rest","sleeptalk","surf","toxic"]},{"role":"Staller","movepool":["haze","icebeam","protect","surf","toxic"]},{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","raindance","surf"]}]},"skarmory":{"level":80,"sets":[{"role":"Bulky Support","movepool":["drillpeck","protect","rest","spikes","toxic"]},{"role":"Generalist","movepool":["drillpeck","spikes","toxic","whirlwind"]},{"role":"Staller","movepool":["protect","spikes","toxic","whirlwind"]}]},"houndoom":{"level":81,"sets":[{"role":"Berry Sweeper","movepool":["crunch","fireblast","flamethrower","hiddenpowergrass","substitute"]},{"role":"Fast Attacker","movepool":["crunch","fireblast","flamethrower","hiddenpowergrass","pursuit","willowisp"]}]},"kingdra":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowerelectric","hiddenpowergrass","hydropump","icebeam","raindance","substitute","surf"],"preferredTypes":["Ice"]}]},"donphan":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","rapidspin","rest","rockslide","sleeptalk","toxic"]}]},"porygon2":{"level":81,"sets":[{"role":"Bulky Support","movepool":["icebeam","recover","return","thunderbolt","thunderwave","toxic"]}]},"stantler":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hypnosis","return","shadowball","thunderbolt","thunderwave"],"preferredTypes":["Ground"]}]},"smeargle":{"level":87,"sets":[{"role":"Generalist","movepool":["encore","explosion","spikes","spore"]}]},"hitmontop":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["bulkup","earthquake","hiddenpowerghost","highjumpkick","machpunch","rapidspin","rockslide","toxic"],"preferredTypes":["Ghost"]}]},"miltank":{"level":78,"sets":[{"role":"Bulky Setup","movepool":["bodyslam","curse","earthquake","milkdrink"]},{"role":"Bulky Support","movepool":["bodyslam","earthquake","healbell","milkdrink","toxic"]}]},"blissey":{"level":78,"sets":[{"role":"Staller","movepool":["aromatherapy","seismictoss","softboiled","thunderwave","toxic"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","softboiled","thunderbolt"]}]},"raikou":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","crunch","hiddenpowerice","substitute","thunderbolt"],"preferredTypes":["Ice"]},{"role":"Bulky Attacker","movepool":["hiddenpowerice","rest","sleeptalk","thunderbolt"]}]},"entei":{"level":80,"sets":[{"role":"Bulky Support","movepool":["flamethrower","rest","sleeptalk","toxic"]},{"role":"Staller","movepool":["flamethrower","protect","substitute","toxic"]},{"role":"Bulky Setup","movepool":["calmmind","flamethrower","hiddenpowergrass","hiddenpowerice","substitute"]}]},"suicune":{"level":75,"sets":[{"role":"Bulky Setup","movepool":["calmmind","rest","sleeptalk","surf"]},{"role":"Staller","movepool":["protect","roar","substitute","surf","toxic"]},{"role":"Bulky Attacker","movepool":["calmmind","icebeam","rest","substitute","surf","toxic"]}]},"tyranitar":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","fireblast","hiddenpowerflying","rockslide"],"preferredTypes":["Ground"]},{"role":"Bulky Attacker","movepool":["crunch","earthquake","fireblast","icebeam","pursuit","rockslide","thunderwave"]},{"role":"Wallbreaker","movepool":["earthquake","fireblast","hiddenpowerflying","rest","rockslide","sleeptalk"],"preferredTypes":["Ground"]}]},"lugia":{"level":70,"sets":[{"role":"Staller","movepool":["earthquake","psychic","recover","substitute","toxic"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","recover","thunderbolt"]}]},"hooh":{"level":70,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","recover","sacredfire","substitute","thunderbolt","toxic"]},{"role":"Bulky Setup","movepool":["calmmind","recover","sacredfire","thunderbolt"]}]},"celebi":{"level":75,"sets":[{"role":"Bulky Setup","movepool":["batonpass","calmmind","hiddenpowerfire","hiddenpowergrass","psychic","recover"]},{"role":"Bulky Support","movepool":["healbell","hiddenpowerfire","hiddenpowergrass","leechseed","psychic","recover","toxic"]}]},"sceptile":{"level":82,"sets":[{"role":"Staller","movepool":["hiddenpowerfire","hiddenpowerice","leafblade","leechseed","substitute"]},{"role":"Berry Sweeper","movepool":["hiddenpowerice","leafblade","substitute","thunderpunch"]},{"role":"Fast Attacker","movepool":["earthquake","hiddenpowerice","leafblade","thunderpunch","toxic"],"preferredTypes":["Ground"]}]},"blaziken":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["earthquake","fireblast","hiddenpowerice","rockslide","skyuppercut","thunderpunch"]},{"role":"Berry Sweeper","movepool":["endure","fireblast","reversal","swordsdance"]},{"role":"Wallbreaker","movepool":["earthquake","fireblast","rockslide","skyuppercut","swordsdance"]}]},"swampert":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","hydropump","protect","surf","toxic"]},{"role":"Bulky Support","movepool":["earthquake","hydropump","rest","sleeptalk","surf"]},{"role":"Staller","movepool":["earthquake","hydropump","icebeam","refresh","surf","toxic"]}]},"mightyena":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["crunch","doubleedge","healbell","hiddenpowerfighting","shadowball","toxic"],"preferredTypes":["Fighting"]}]},"linoone":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["bellydrum","extremespeed","hiddenpowerfighting","shadowball"]},{"role":"Bulky Setup","movepool":["bellydrum","hiddenpowerground","return","shadowball","substitute"]}]},"beautifly":{"level":100,"sets":[{"role":"Staller","movepool":["hiddenpowerflying","morningsun","stunspore","substitute","toxic"]}]},"dustox":{"level":94,"sets":[{"role":"Staller","movepool":["hiddenpowerground","moonlight","sludgebomb","toxic","whirlwind"]}]},"ludicolo":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","raindance","surf"]}]},"shiftry":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["brickbreak","explosion","shadowball","swordsdance"]},{"role":"Staller","movepool":["hiddenpowerdark","leechseed","substitute","toxic"]}]},"swellow":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["aerialace","doubleedge","hiddenpowerground","quickattack","return"]},{"role":"Fast Attacker","movepool":["aerialace","doubleedge","facade","hiddenpowerground","return"]}]},"pelipper":{"level":88,"sets":[{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","surf","toxic"]},{"role":"Staller","movepool":["icebeam","protect","surf","toxic"]}]},"gardevoir":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","firepunch","hypnosis","icepunch","psychic","substitute","thunderbolt"],"preferredTypes":["Fire"]}]},"masquerain":{"level":94,"sets":[{"role":"Fast Attacker","movepool":["hydropump","icebeam","stunspore","substitute","toxic"]}]},"breloom":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerghost","hiddenpowerrock","machpunch","skyuppercut","spore","substitute","swordsdance"]},{"role":"Generalist","movepool":["focuspunch","hiddenpowerghost","hiddenpowerrock","spore","substitute"]}]},"vigoroth":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["bodyslam","bulkup","earthquake","return","shadowball","slackoff"]}]},"slaking":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","focuspunch","return","shadowball"]},{"role":"Fast Attacker","movepool":["doubleedge","earthquake","hyperbeam","return","shadowball"]}]},"ninjask":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","hiddenpowerflying","substitute","swordsdance"]},{"role":"Bulky Setup","movepool":["batonpass","hiddenpowerflying","protect","swordsdance"]}]},"shedinja":{"level":95,"sets":[{"role":"Fast Attacker","movepool":["agility","batonpass","hiddenpowerfighting","hiddenpowerground","shadowball","silverwind","toxic"]}]},"exploud":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","overheat","return","shadowball"]},{"role":"Fast Attacker","movepool":["earthquake","flamethrower","icebeam","return","shadowball","substitute"],"preferredTypes":["Ground"]}]},"hariyama":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["bulkup","crosschop","earthquake","hiddenpowerghost","knockoff","rockslide"]},{"role":"Bulky Attacker","movepool":["crosschop","hiddenpowerghost","rest","rockslide","sleeptalk"]}]},"nosepass":{"level":96,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","rockslide","thunderwave","toxic"]}]},"delcatty":{"level":93,"sets":[{"role":"Bulky Support","movepool":["doubleedge","protect","thunderwave","toxic","wish"]},{"role":"Generalist","movepool":["batonpass","bodyslam","healbell","protect","wish"]}]},"sableye":{"level":90,"sets":[{"role":"Bulky Support","movepool":["knockoff","recover","seismictoss","toxic"]},{"role":"Bulky Attacker","movepool":["recover","seismictoss","shadowball","toxic"]}]},"mawile":{"level":94,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","brickbreak","hiddenpowersteel","rockslide","substitute","swordsdance"],"preferredTypes":["Fighting"]},{"role":"Bulky Support","movepool":["focuspunch","hiddenpowersteel","rockslide","substitute","toxic"]}]},"aggron":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","irontail","rockslide","thunderwave","toxic"],"preferredTypes":["Ground"]},{"role":"Generalist","movepool":["doubleedge","earthquake","focuspunch","irontail","rockslide","substitute"]}]},"medicham":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["brickbreak","bulkup","recover","rockslide","shadowball","substitute"],"preferredTypes":["Ghost"]}]},"manectric":{"level":82,"sets":[{"role":"Berry Sweeper","movepool":["crunch","hiddenpowerice","substitute","thunderbolt"]}]},"plusle":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["batonpass","encore","hiddenpowerice","substitute","thunderbolt","toxic"]},{"role":"Staller","movepool":["hiddenpowerice","protect","thunderbolt","toxic"]},{"role":"Bulky Support","movepool":["hiddenpowerice","protect","thunderbolt","toxic","wish"]}]},"minun":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["batonpass","encore","hiddenpowerice","substitute","thunderbolt","toxic"]},{"role":"Staller","movepool":["hiddenpowerice","protect","thunderbolt","toxic"]},{"role":"Bulky Support","movepool":["hiddenpowerice","protect","thunderbolt","toxic","wish"]}]},"volbeat":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","icepunch","tailglow","thunderbolt"]}]},"illumise":{"level":95,"sets":[{"role":"Bulky Support","movepool":["encore","moonlight","seismictoss","thunderwave","toxic"]},{"role":"Generalist","movepool":["batonpass","encore","seismictoss","substitute","thunderwave","toxic"]}]},"roselia":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["aromatherapy","hiddenpowerfire","magicalleaf","spikes","synthesis","toxic"]},{"role":"Bulky Support","movepool":["aromatherapy","hiddenpowergrass","spikes","synthesis","toxic"]}]},"swalot":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["encore","explosion","hiddenpowerground","icebeam","painsplit","shadowball","sludgebomb","toxic","yawn"]}]},"sharpedo":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","hiddenpowerflying","hydropump"]},{"role":"Berry Sweeper","movepool":["crunch","hiddenpowerelectric","hiddenpowergrass","hydropump","icebeam","substitute"]}]},"wailord":{"level":87,"sets":[{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","surf","toxic"]},{"role":"Bulky Attacker","movepool":["hiddenpowergrass","icebeam","selfdestruct","surf","toxic"],"preferredTypes":["Ice"]}]},"camerupt":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["earthquake","explosion","fireblast","rest","rockslide","sleeptalk","toxic"]}]},"torkoal":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["explosion","fireblast","flamethrower","hiddenpowergrass","rest","toxic","yawn"]}]},"grumpig":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","firepunch","psychic","substitute","thunderpunch"],"preferredTypes":["Fire"]}]},"spinda":{"level":95,"sets":[{"role":"Staller","movepool":["encore","protect","seismictoss","shadowball","substitute","toxic"]},{"role":"Bulky Attacker","movepool":["bodyslam","focuspunch","shadowball","substitute"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"]}]},"flygon":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["dragonclaw","earthquake","fireblast","hiddenpowerbug","rockslide"],"preferredTypes":["Bug","Rock"]},{"role":"Staller","movepool":["dragonclaw","earthquake","fireblast","protect","toxic"]},{"role":"Bulky Attacker","movepool":["dragonclaw","earthquake","fireblast","rockslide","substitute","toxic"]}]},"cacturne":{"level":92,"sets":[{"role":"Staller","movepool":["focuspunch","hiddenpowerdark","leechseed","substitute"]},{"role":"Generalist","movepool":["hiddenpowerdark","needlearm","spikes","thunderpunch"]}]},"altaria":{"level":85,"sets":[{"role":"Bulky Support","movepool":["dragonclaw","earthquake","flamethrower","haze","healbell","rest","toxic"]},{"role":"Setup Sweeper","movepool":["dragondance","earthquake","fireblast","healbell","hiddenpowerflying","rest"],"preferredTypes":["Ground"]}]},"zangoose":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["brickbreak","quickattack","return","shadowball","swordsdance"],"preferredTypes":["Ghost"]}]},"seviper":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["crunch","earthquake","flamethrower","hiddenpowergrass","sludgebomb"],"preferredTypes":["Ground"]}]},"lunatone":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","calmmind","hiddenpowerfire","hypnosis","icebeam","psychic"]},{"role":"Bulky Attacker","movepool":["explosion","hypnosis","icebeam","psychic","toxic"]}]},"solrock":{"level":85,"sets":[{"role":"Staller","movepool":["earthquake","protect","rockslide","toxic"]},{"role":"Wallbreaker","movepool":["earthquake","explosion","overheat","rockslide","shadowball"],"preferredTypes":["Ground"]}]},"whiscash":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icebeam","rest","sleeptalk","surf","toxic"]},{"role":"Staller","movepool":["earthquake","icebeam","protect","toxic"]}]},"crawdaunt":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["brickbreak","crunch","doubleedge","hiddenpowerelectric","hiddenpowergrass","icebeam","surf"]},{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","hiddenpowerflying","surf","swordsdance"],"preferredTypes":["Normal"]}]},"claydol":{"level":81,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","icebeam","psychic","rapidspin","toxic"]}]},"cradily":{"level":84,"sets":[{"role":"Bulky Support","movepool":["earthquake","hiddenpowergrass","recover","rockslide","toxic"],"preferredTypes":["Ground"]}]},"armaldo":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","hiddenpowerbug","rapidspin","rockslide","swordsdance"],"preferredTypes":["Ground"]}]},"milotic":{"level":78,"sets":[{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","surf","toxic"]},{"role":"Staller","movepool":["icebeam","recover","refresh","surf","toxic"]}]},"castform":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["flamethrower","icebeam","return","thunderbolt","thunderwave"]}]},"kecleon":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["brickbreak","return","shadowball","thunderwave","trick"]}]},"banette":{"level":88,"sets":[{"role":"Berry Sweeper","movepool":["destinybond","endure","hiddenpowerfighting","shadowball"]},{"role":"Wallbreaker","movepool":["doubleedge","hiddenpowerfighting","knockoff","shadowball","willowisp"],"preferredTypes":["Fighting"]}]},"dusclops":{"level":86,"sets":[{"role":"Bulky Support","movepool":["rest","seismictoss","sleeptalk","willowisp"]},{"role":"Bulky Attacker","movepool":["rest","seismictoss","shadowball","sleeptalk"]},{"role":"Generalist","movepool":["focuspunch","icebeam","painsplit","shadowball","substitute","willowisp"]}]},"tropius":{"level":94,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowerfire","solarbeam","sunnyday","synthesis"]},{"role":"Staller","movepool":["earthquake","hiddenpowerflying","leechseed","synthesis","toxic"]}]},"chimecho":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","healbell","hiddenpowerfire","psychic","toxic"]}]},"absol":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["batonpass","hiddenpowerfighting","quickattack","shadowball","swordsdance"]}]},"glalie":{"level":83,"sets":[{"role":"Generalist","movepool":["earthquake","explosion","icebeam","spikes","toxic"]}]},"walrein":{"level":81,"sets":[{"role":"Staller","movepool":["icebeam","protect","surf","toxic"]},{"role":"Bulky Attacker","movepool":["encore","icebeam","rest","sleeptalk","surf","toxic"]}]},"huntail":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","hiddenpowerelectric","hiddenpowergrass","hydropump","icebeam","raindance","surf"],"preferredTypes":["Ice"]}]},"gorebyss":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowerelectric","hiddenpowergrass","hydropump","icebeam","raindance","surf"]}]},"relicanth":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["doubleedge","earthquake","hiddenpowerflying","rest","rockslide","sleeptalk","toxic"],"preferredTypes":["Ground"]}]},"luvdisc":{"level":99,"sets":[{"role":"Staller","movepool":["icebeam","protect","substitute","surf","toxic"]}]},"salamence":{"level":73,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","fireblast","hiddenpowerflying","rockslide"],"preferredTypes":["Ground"]},{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","earthquake","fireblast","hiddenpowerflying","rockslide"],"preferredTypes":["Ground"]}]},"metagross":{"level":74,"sets":[{"role":"Wallbreaker","movepool":["agility","earthquake","explosion","meteormash","psychic","rockslide"],"preferredTypes":["Ground"]}]},"regirock":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["curse","earthquake","explosion","rest","rockslide","superpower"],"preferredTypes":["Ground"]},{"role":"Bulky Attacker","movepool":["earthquake","explosion","rest","rockslide","sleeptalk","thunderwave","toxic"]}]},"regice":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["explosion","icebeam","rest","sleeptalk","thunderbolt","thunderwave"]},{"role":"Staller","movepool":["icebeam","protect","thunderbolt","toxic"]}]},"registeel":{"level":78,"sets":[{"role":"Bulky Support","movepool":["rest","seismictoss","sleeptalk","toxic"]}]},"latias":{"level":67,"sets":[{"role":"Bulky Setup","movepool":["calmmind","dragonclaw","hiddenpowerfire","psychic","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","dragonclaw","recover","refresh"]}]},"latios":{"level":66,"sets":[{"role":"Bulky Setup","movepool":["calmmind","dragonclaw","hiddenpowerfire","psychic","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","dragonclaw","recover","refresh"]}]},"kyogre":{"level":67,"sets":[{"role":"Bulky Support","movepool":["calmmind","icebeam","rest","sleeptalk","surf","thunder"]}]},"groudon":{"level":70,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hiddenpowerbug","overheat","rockslide","substitute","swordsdance","thunderwave"],"preferredTypes":["Rock"]}]},"rayquaza":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","hiddenpowerflying","overheat","rockslide"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["earthquake","extremespeed","hiddenpowerflying","rockslide","swordsdance"],"preferredTypes":["Ground"]},{"role":"Wallbreaker","movepool":["earthquake","extremespeed","hiddenpowerflying","overheat","rockslide"],"preferredTypes":["Ground"]}]},"jirachi":{"level":74,"sets":[{"role":"Bulky Support","movepool":["bodyslam","firepunch","protect","psychic","toxic","wish"]},{"role":"Setup Sweeper","movepool":["calmmind","firepunch","icepunch","psychic","substitute","thunderbolt"],"preferredTypes":["Fire"]}]},"deoxys":{"level":74,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","firepunch","icebeam","psychoboost","shadowball","spikes","superpower"],"preferredTypes":["Fighting","Ghost"]}]},"deoxysattack":{"level":73,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","firepunch","icebeam","psychoboost","shadowball","superpower"],"preferredTypes":["Fighting","Ghost"]}]},"deoxysdefense":{"level":75,"sets":[{"role":"Bulky Support","movepool":["recover","seismictoss","spikes","toxic"]}]},"deoxysspeed":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","firepunch","icebeam","psychic","recover","substitute"],"preferredTypes":["Fire"]},{"role":"Bulky Support","movepool":["psychoboost","recover","spikes","superpower","toxic"]}]}} as any;
/* eslint-enable */

// Moves that restore HP:
const RECOVERY_MOVES = [
	'milkdrink', 'moonlight', 'morningsun', 'recover', 'slackoff', 'softboiled', 'synthesis',
];
// Conglomerate for ease of access
const SETUP = [
	'acidarmor', 'agility', 'bellydrum', 'bulkup', 'calmmind', 'curse', 'dragondance', 'growth', 'howl', 'irondefense',
	'meditate', 'raindance', 'sunnyday', 'swordsdance', 'tailglow',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'eruption', 'explosion', 'fakeout', 'focuspunch', 'futuresight', 'icywind', 'knockoff', 'machpunch', 'pursuit',
	'quickattack', 'rapidspin', 'selfdestruct', 'skyattack', 'waterspout',
];

// Moves that should be paired together when possible
const MOVE_PAIRS = [
	['sleeptalk', 'rest'],
	['protect', 'wish'],
	['leechseed', 'substitute'],
	['focuspunch', 'substitute'],
	['batonpass', 'spiderweb'],
];

export class RandomGen3Teams extends RandomGen4Teams {
	battleHasDitto: boolean;
	battleHasWobbuffet: boolean;

	randomSets: {[species: string]: RandomTeamsTypes.RandomSpeciesData} = randomSetsJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);
		this.noStab = NO_STAB;
		this.battleHasDitto = false;
		this.battleHasWobbuffet = false;
		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Bug') && ['armaldo', 'heracross', 'parasect'].includes(species.id)
			),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting'),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter, species) => (!counter.get('Flying') && species.id !== 'crobat'),
			Ghost: (movePool, moves, abilities, types, counter) => !counter.get('Ghost'),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => !counter.get('Ice'),
			Normal: (movePool, moves, abilities, types, counter, species) => !counter.get('Normal'),
			Poison: (movePool, moves, abilities, types, counter) => !counter.get('Poison') && !counter.get('Bug'),
			Psychic: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Psychic') && species.baseStats.spa >= 100
			),
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock'),
			Steel: (movePool, moves, abilities, types, counter, species) => (!counter.get('Steel') && species.id !== 'forretress'),
			Water: (movePool, moves, abilities, types, counter, species) => !counter.get('Water'),
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
		if (teamDetails.rapidSpin) {
			if (movePool.includes('rapidspin')) this.fastPop(movePool, movePool.indexOf('rapidspin'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}

		// Develop additional move lists
		const badWithSetup = ['knockoff', 'rapidspin', 'toxic'];
		const statusMoves = this.dex.moves.all()
			.filter(move => move.category === 'Status')
			.map(move => move.id);

		// General incompatibilities
		const incompatiblePairs = [
			// These moves don't mesh well with other aspects of the set
			[statusMoves, 'trick'],
			[SETUP, badWithSetup],
			['rest', ['protect', 'substitute']],
			[['selfdestruct', 'explosion'], ['destinybond', 'painsplit', 'rest']],

			// These attacks are redundant with each other
			['surf', 'hydropump'],
			[['bodyslam', 'return'], ['bodyslam', 'doubleedge']],
			['fireblast', 'flamethrower'],

			// Assorted hardcodes go here:
			// Granbull
			['bulkup', 'overheat'],
			// Heracross
			['endure', 'substitute'],
		];

		for (const pair of incompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

		const statusInflictingMoves = ['stunspore', 'thunderwave', 'toxic', 'willowisp', 'yawn'];
		if (role !== 'Staller') {
			this.incompatibleMoves(moves, movePool, statusInflictingMoves, statusInflictingMoves);
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

		// Enforce Seismic Toss and Spore
		for (const moveid of ['seismictoss', 'spore']) {
			if (movePool.includes(moveid)) {
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce Substitute on non-Setup sets with Baton Pass
		if (!role.includes('Setup')) {
			if (movePool.includes('batonpass') && movePool.includes('substitute')) {
				counter = this.addMove('substitute', moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
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
			const enforcedMoves = ['protect', 'toxic', 'wish'];
			for (const move of enforcedMoves) {
				if (movePool.includes(move)) {
					counter = this.addMove(move, moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
			}
		}

		// Enforce setup
		if (role.includes('Setup') || role === 'Berry Sweeper') {
			const setupMoves = movePool.filter(moveid => SETUP.includes(moveid));
			if (setupMoves.length) {
				const moveid = this.sample(setupMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce Berry Sweeper moves
		if (role === 'Berry Sweeper') {
			// Enforce Flail/Reversal
			for (const move of ['flail', 'reversal']) {
				if (movePool.includes(move)) {
					counter = this.addMove(move, moves, types, abilities, teamDetails, species, isLead,
						movePool, preferredType, role);
				}
			}
			// Enforce one of Endure and Substitute, but not both
			const hpControlMoves = [];
			for (const moveid of movePool) {
				if (['endure', 'substitute'].includes(moveid)) hpControlMoves.push(moveid);
			}
			if (hpControlMoves.length) {
				const moveid = this.sample(hpControlMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce a move not on the noSTAB list
		if (!counter.damagingMoves.size) {
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
		if (['Fast Attacker', 'Setup Sweeper', 'Bulky Attacker', 'Wallbreaker', 'Berry Sweeper'].includes(role)) {
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
	) {
		switch (ability) {
		case 'Rain Dish': case 'Sand Veil': case 'Soundproof': case 'Sticky Hold':
			return true;
		case 'Chlorophyll':
			return !moves.has('sunnyday') && !teamDetails.sun;
		case 'Hustle':
			return !counter.get('Physical');
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Swarm':
			return !counter.get('Bug');
		case 'Swift Swim':
			return (
				// Relicanth always wants Swift Swim if it doesn't have Double-Edge
				!moves.has('raindance') && !teamDetails.rain && !(species.id === 'relicanth' && !counter.get('recoil')) ||
				!moves.has('raindance') && ['Rock Head', 'Water Absorb'].some(abil => abilities.has(abil))
			);
		case 'Thick Fat':
			return (species.id === 'snorlax' || (species.id === 'hariyama' && moves.has('sleeptalk')));
		case 'Water Absorb':
			return (species.id === 'mantine' && moves.has('raindance'));
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
		if (species.id === 'yanma' && counter.get('inaccurate')) return 'Compound Eyes';
		if (species.id === 'arcanine') return 'Intimidate';
		if (species.id === 'blissey') return 'Natural Cure';
		if (species.id === 'heracross' && role === 'Berry Sweeper') return 'Swarm';
		if (species.id === 'gardevoir') return 'Trace';

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
		if (abilityAllowed[0].rating <= abilityAllowed[1].rating) {
			if (this.randomChance(1, 2)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
		} else if (abilityAllowed[0].rating - 0.5 <= abilityAllowed[1].rating) {
			if (this.randomChance(1, 3)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
		}

		// After sorting, choose the first ability
		return abilityAllowed[0].name;
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
		if (species.id === 'farfetchd') return 'Stick';
		if (species.id === 'latias' || species.id === 'latios') return 'Soul Dew';
		if (species.id === 'linoone' && role === 'Setup Sweeper') return 'Silk Scarf';
		if (species.id === 'marowak') return 'Thick Club';
		if (species.id === 'pikachu') return 'Light Ball';
		if (species.id === 'shedinja') return 'Lum Berry';
		if (species.id === 'unown') return counter.get('Physical') ? 'Choice Band' : 'Twisted Spoon';

		if (moves.has('trick')) return 'Choice Band';
		if (
			moves.has('rest') && !moves.has('sleeptalk') &&
			// Altaria wants Chesto Berry on Dragon Dance + Rest
			(moves.has('dragondance') || !['Early Bird', 'Natural Cure', 'Shed Skin'].includes(ability))
		) return 'Chesto Berry';

		// Medium priority items
		if (counter.get('Physical') >= 4) return 'Choice Band';
		if (counter.get('Physical') >= 3 && (moves.has('batonpass') || (role === 'Wallbreaker' && counter.get('Special')))) {
			return 'Choice Band';
		}

		if (moves.has('dragondance') && ability !== 'Natural Cure' && !moves.has('healbell')) return 'Lum Berry';
		if (moves.has('bellydrum')) return moves.has('substitute') ? 'Salac Berry' : 'Lum Berry';

		if (moves.has('raindance') && counter.get('Special') >= 3) return 'Petaya Berry';

		if (role === 'Berry Sweeper') {
			if (moves.has('endure')) return 'Salac Berry';
			if (moves.has('flail') || moves.has('reversal')) return (species.baseStats.spe >= 90) ? 'Liechi Berry' : 'Salac Berry';
			if (moves.has('substitute') && counter.get('Physical') >= 3) return 'Liechi Berry';
			if (moves.has('substitute') && counter.get('Special') >= 3) return 'Petaya Berry';
		}

		const salacReqs = species.baseStats.spe >= 60 && species.baseStats.spe <= 100 && !counter.get('priority');

		if (moves.has('bulkup') && moves.has('substitute') && counter.get('Status') === 2 && salacReqs) return 'Salac Berry';

		if (moves.has('swordsdance') && moves.has('substitute') && counter.get('Status') === 2) {
			if (salacReqs) return 'Salac Berry';
			if (species.baseStats.spe > 100 && counter.get('Physical') >= 2) return 'Liechi Berry';
		}

		if (moves.has('swordsdance') && counter.get('Status') === 1) {
			if (salacReqs) return 'Salac Berry';
			if (species.baseStats.spe > 100) {
				return (counter.get('Physical') >= 3 && this.randomChance(1, 2)) ? 'Liechi Berry' : 'Lum Berry';
			}
		}

		if (species.id === 'deoxys' || species.id === 'deoxysattack') return 'White Herb';

		// Default to Leftovers
		return 'Leftovers';
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
		const sets = this.randomSets[species.id]["sets"];

		const set = this.sampleIfArray(sets);
		const role = set.role;
		const movePool: string[] = Array.from(set.movepool);
		const preferredTypes = set.preferredTypes;
		// In Gen 3, if a set has multiple preferred types, enforce all of them.
		const preferredType = preferredTypes ? preferredTypes.join() : '';

		let ability = '';
		let item = undefined;

		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};

		const types = species.types;
		const abilities = new Set(Object.values(species.abilities));

		// Get moves
		const moves = this.randomMoveset(types, abilities, teamDetails, species, isLead, movePool,
			preferredType, role);
		const counter = this.newQueryMoves(moves, species, preferredType, abilities);

		// Get ability
		ability = this.getAbility(new Set(types), moves, abilities, counter, movePool, teamDetails, species,
			preferredType, role);

		// Get items
		item = this.getItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);

		const level = this.adjustLevel || this.randomSets[species.id]["level"] || (species.nfe ? 90 : 80);

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
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if (moves.has('substitute') && ['flail', 'reversal'].some(m => moves.has(m))) {
				// Flail/Reversal users should be able to use four Substitutes
				if (hp % 4 > 0) break;
			} else if (moves.has('substitute') && (item === 'Salac Berry' || item === 'Petaya Berry' || item === 'Liechi Berry')) {
				// Other pinch berry holders should have berries activate after three Substitutes
				if (hp % 4 === 0) break;
			} else if (moves.has('bellydrum')) {
				// Belly Drum users should be able to use Belly Drum twice
				if (hp % 2 > 0) break;
			} else {
				break;
			}
			evs.hp -= 4;
		}

		// Minimize confusion damage
		if (!counter.get('Physical') && !moves.has('transform')) {
			evs.atk = 0;
			ivs.atk = hasHiddenPower ? (ivs.atk || 31) - 28 : 0;
		}

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
		const teamDetails: RandomTeamsTypes.TeamDetails = {};

		const pokemonList = (this.gen === 3) ? Object.keys(this.randomSets) : Object.keys(this.randomData);
		const [pokemonPool, baseSpeciesPool] = this.getPokemonPool(type, pokemon, isMonotype, pokemonList);
		while (baseSpeciesPool.length && pokemon.length < this.maxTeamSize) {
			const baseSpecies = this.sampleNoReplace(baseSpeciesPool);
			const currentSpeciesPool: Species[] = [];
			for (const poke of pokemonPool) {
				const species = this.dex.species.get(poke);
				if (species.baseSpecies === baseSpecies) currentSpeciesPool.push(species);
			}
			const species = this.sample(currentSpeciesPool);
			if (!species.exists) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[species.baseSpecies]) continue;

			// Limit to one Wobbuffet per battle (not just per team)
			if (species.name === 'Wobbuffet' && this.battleHasWobbuffet) continue;
			// Limit to one Ditto per battle in Gen 2
			if (this.dex.gen < 3 && species.name === 'Ditto' && this.battleHasDitto) continue;

			const types = species.types;

			if (!isMonotype && !this.forceMonotype) {
				// Dynamically scale limits for different team sizes. The default and minimum value is 1.
				const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

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

			// Okay, the set passes, add it to our team
			const set = this.randomSet(species, teamDetails);
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
			}

			// Update team details
			if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails.rain = 1;
			if (set.ability === 'Drought' || set.moves.includes('sunnyday')) teamDetails.sun = 1;
			if (set.ability === 'Sand Stream') teamDetails.sand = 1;
			if (set.moves.includes('spikes')) teamDetails.spikes = 1;
			if (set.moves.includes('rapidspin')) teamDetails.rapidSpin = 1;

			// In Gen 3, Shadow Tag users can prevent each other from switching out, possibly causing and endless battle or at least causing a long stall war
			// To prevent this, we prevent more than one Wobbuffet in a single battle.
			if (species.id === 'wobbuffet') this.battleHasWobbuffet = true;
			if (species.id === 'ditto') this.battleHasDitto = true;
		}

		if (pokemon.length < this.maxTeamSize && !isMonotype && !this.forceMonotype && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}

		return pokemon;
	}
}

export default RandomGen3Teams;
