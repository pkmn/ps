import {MoveCounter} from './gen8';
import {RandomGen4Teams} from './gen4';
import {
	Format,
	ModdedDex,
	PRNG,
	PRNGSeed,
	RandomTeamsTypes,
	Species,
	StatID,
} from '@pkmn/sim';

/* eslint-disable */
const randomSetsJSON = {"venusaur":{"level":81,"sets":[{"role":"Staller","movepool":["hiddenpowergrass","leechseed","sleeppowder","sludgebomb","substitute"],"abilities":["Overgrow"]},{"role":"Setup Sweeper","movepool":["earthquake","hiddenpowerghost","sleeppowder","sludgebomb","swordsdance","synthesis"],"abilities":["Overgrow"],"preferredTypes":["Ground"]}]},"charizard":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["dragondance","earthquake","fireblast","hiddenpowerflying","rockslide"],"abilities":["Blaze"],"preferredTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["bellydrum","earthquake","hiddenpowerflying","rockslide","substitute"],"abilities":["Blaze"],"preferredTypes":["Ground"]},{"role":"Berry Sweeper","movepool":["dragonclaw","fireblast","hiddenpowergrass","substitute"],"abilities":["Blaze"]}]},"blastoise":{"level":82,"sets":[{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","surf","toxic"],"abilities":["Torrent"]},{"role":"Bulky Attacker","movepool":["icebeam","rapidspin","refresh","roar","surf","toxic"],"abilities":["Torrent"]},{"role":"Staller","movepool":["icebeam","protect","refresh","surf","toxic"],"abilities":["Torrent"]}]},"butterfree":{"level":97,"sets":[{"role":"Generalist","movepool":["hiddenpowerfire","morningsun","psychic","sleeppowder","stunspore","toxic"],"abilities":["Compound Eyes"],"preferredTypes":["Psychic"]}]},"beedrill":{"level":93,"sets":[{"role":"Berry Sweeper","movepool":["brickbreak","endure","hiddenpowerbug","sludgebomb","swordsdance"],"abilities":["Swarm"],"preferredTypes":["Bug"]},{"role":"Fast Attacker","movepool":["brickbreak","doubleedge","hiddenpowerbug","sludgebomb","swordsdance"],"abilities":["Swarm"]}]},"pidgeot":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["aerialace","doubleedge","hiddenpowerground","quickattack","return","toxic"],"abilities":["Keen Eye"],"preferredTypes":["Ground"]},{"role":"Berry Sweeper","movepool":["aerialace","hiddenpowerground","return","substitute"],"abilities":["Keen Eye"]}]},"raticate":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","hiddenpowerground","quickattack","return","shadowball"],"abilities":["Guts"]},{"role":"Fast Attacker","movepool":["doubleedge","facade","hiddenpowerground","return","shadowball"],"abilities":["Guts"]},{"role":"Berry Sweeper","movepool":["return","reversal","shadowball","substitute"],"abilities":["Guts"]}]},"fearow":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","drillpeck","hiddenpowerground","quickattack","return"],"abilities":["Keen Eye"]}]},"arbok":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hiddenpowerghost","rest","rockslide","sleeptalk","sludgebomb"],"abilities":["Intimidate"],"preferredTypes":["Ground"]}]},"pikachu":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["encore","hiddenpowerice","substitute","surf","thunderbolt"],"abilities":["Static"],"preferredTypes":["Ice","Water"]},{"role":"Wallbreaker","movepool":["hiddenpowerice","surf","thunderbolt","volttackle"],"abilities":["Static"]}]},"raichu":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["encore","hiddenpowerice","surf","thunderbolt","thunderwave","toxic"],"abilities":["Static"],"preferredTypes":["Ice"]},{"role":"Berry Sweeper","movepool":["hiddenpowerice","substitute","surf","thunderbolt"],"abilities":["Static"]}]},"sandslash":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","hiddenpowerbug","rapidspin","rockslide","swordsdance","toxic"],"abilities":["Sand Veil"],"preferredTypes":["Rock"]}]},"nidoqueen":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["earthquake","fireblast","icebeam","shadowball","sludgebomb","substitute","thunderbolt"],"abilities":["Poison Point"]}]},"nidoking":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["earthquake","fireblast","icebeam","megahorn","shadowball","sludgebomb","substitute","thunderbolt"],"abilities":["Poison Point"]}]},"clefable":{"level":85,"sets":[{"role":"Bulky Support","movepool":["fireblast","return","shadowball","softboiled","thunderwave","toxic"],"abilities":["Cute Charm"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","softboiled","thunderbolt"],"abilities":["Cute Charm"]}]},"ninetales":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["fireblast","flamethrower","hiddenpowergrass","hypnosis","substitute","toxic","willowisp"],"abilities":["Flash Fire"]}]},"wigglytuff":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["bodyslam","fireblast","protect","wish"],"abilities":["Cute Charm"]},{"role":"Bulky Support","movepool":["doubleedge","protect","thunderwave","toxic","wish"],"abilities":["Cute Charm"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Cute Charm"]}]},"vileplume":{"level":85,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","hiddenpowerfire","hiddenpowergrass","sleeppowder","sludgebomb","synthesis"],"abilities":["Chlorophyll"]}]},"parasect":{"level":98,"sets":[{"role":"Bulky Attacker","movepool":["aromatherapy","gigadrain","hiddenpowerbug","return","spore","stunspore"],"abilities":["Effect Spore"],"preferredTypes":["Normal"]}]},"venomoth":{"level":87,"sets":[{"role":"Generalist","movepool":["batonpass","hiddenpowerfire","psychic","signalbeam","sleeppowder","sludgebomb","substitute"],"abilities":["Shield Dust"]},{"role":"Bulky Support","movepool":["hiddenpowerfire","psychic","signalbeam","sleeppowder","sludgebomb"],"abilities":["Shield Dust"]}]},"dugtrio":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hiddenpowerbug","rockslide","sludgebomb"],"abilities":["Arena Trap"]}]},"persian":{"level":87,"sets":[{"role":"Berry Sweeper","movepool":["hiddenpowerground","irontail","return","shadowball","substitute"],"abilities":["Limber"]},{"role":"Fast Attacker","movepool":["hiddenpowerground","hypnosis","irontail","return","shadowball"],"abilities":["Limber"]}]},"golduck":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerelectric","hiddenpowergrass","hydropump","hypnosis","icebeam","substitute","surf"],"abilities":["Cloud Nine"],"preferredTypes":["Ice"]}]},"primeape":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["bulkup","crosschop","earthquake","hiddenpowerghost","rockslide"],"abilities":["Vital Spirit"]},{"role":"Setup Sweeper","movepool":["bulkup","crosschop","hiddenpowerghost","rockslide","substitute"],"abilities":["Vital Spirit"]},{"role":"Berry Sweeper","movepool":["bulkup","hiddenpowerghost","reversal","substitute"],"abilities":["Vital Spirit"]}]},"arcanine":{"level":79,"sets":[{"role":"Bulky Support","movepool":["flamethrower","hiddenpowergrass","rest","sleeptalk","toxic"],"abilities":["Intimidate"]},{"role":"Wallbreaker","movepool":["doubleedge","extremespeed","fireblast","hiddenpowerrock","irontail"],"abilities":["Intimidate"],"preferredTypes":["Steel"]},{"role":"Staller","movepool":["flamethrower","hiddenpowergrass","hiddenpowerrock","protect","toxic"],"abilities":["Intimidate"]}]},"poliwrath":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["brickbreak","bulkup","earthquake","hiddenpowerghost","hydropump","hypnosis","substitute"],"abilities":["Water Absorb"]},{"role":"Bulky Attacker","movepool":["brickbreak","hiddenpowerghost","hydropump","hypnosis","icebeam","rest","sleeptalk","toxic"],"abilities":["Water Absorb"]},{"role":"Generalist","movepool":["focuspunch","hydropump","icebeam","substitute","toxic"],"abilities":["Water Absorb"]}]},"alakazam":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","encore","firepunch","icepunch","psychic","recover","substitute","thunderpunch"],"abilities":["Synchronize"],"preferredTypes":["Fire"]}]},"machamp":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["bulkup","crosschop","earthquake","hiddenpowerghost","rockslide"],"abilities":["Guts"]},{"role":"Bulky Attacker","movepool":["crosschop","hiddenpowerghost","rest","rockslide","sleeptalk"],"abilities":["Guts"]}]},"victreebel":{"level":85,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerfire","sludgebomb","solarbeam","sunnyday"],"abilities":["Chlorophyll"]},{"role":"Bulky Attacker","movepool":["hiddenpowerground","magicalleaf","sleeppowder","sludgebomb","synthesis"],"abilities":["Chlorophyll"],"preferredTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["hiddenpowerground","sleeppowder","sludgebomb","swordsdance","synthesis"],"abilities":["Chlorophyll"]}]},"tentacruel":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["hydropump","icebeam","rapidspin","sludgebomb","surf","toxic"],"abilities":["Clear Body","Liquid Ooze"]}]},"golem":{"level":84,"sets":[{"role":"Staller","movepool":["earthquake","protect","rockslide","toxic"],"abilities":["Rock Head"]},{"role":"Bulky Attacker","movepool":["doubleedge","earthquake","explosion","rockslide","toxic"],"abilities":["Rock Head"]}]},"rapidash":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["fireblast","hiddenpowergrass","hiddenpowerrock","substitute","toxic"],"abilities":["Flash Fire"]}]},"slowbro":{"level":82,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","psychic","rest","sleeptalk","surf","thunderwave","toxic"],"abilities":["Own Tempo"]},{"role":"Setup Sweeper","movepool":["calmmind","psychic","rest","surf"],"abilities":["Own Tempo"]},{"role":"Bulky Setup","movepool":["calmmind","rest","sleeptalk","surf"],"abilities":["Own Tempo"]}]},"magneton":{"level":85,"sets":[{"role":"Staller","movepool":["hiddenpowerice","protect","thunderbolt","toxic"],"abilities":["Magnet Pull"]},{"role":"Bulky Attacker","movepool":["hiddenpowerice","rest","sleeptalk","thunderbolt"],"abilities":["Magnet Pull"]}]},"farfetchd":{"level":99,"sets":[{"role":"Setup Sweeper","movepool":["agility","batonpass","return","swordsdance"],"abilities":["Inner Focus"]}]},"dodrio":{"level":77,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","drillpeck","hiddenpowerground","quickattack","return"],"abilities":["Early Bird"]},{"role":"Berry Sweeper","movepool":["drillpeck","flail","hiddenpowerground","quickattack","substitute"],"abilities":["Early Bird"]}]},"dewgong":{"level":87,"sets":[{"role":"Staller","movepool":["icebeam","protect","surf","toxic"],"abilities":["Thick Fat"]},{"role":"Bulky Attacker","movepool":["encore","icebeam","rest","sleeptalk","surf","toxic"],"abilities":["Thick Fat"]}]},"muk":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["explosion","fireblast","hiddenpowerground","rest","sludgebomb","toxic"],"abilities":["Sticky Hold"],"preferredTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["curse","hiddenpowerground","rest","sludgebomb"],"abilities":["Sticky Hold"]}]},"cloyster":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["explosion","icebeam","rapidspin","spikes","surf","toxic"],"abilities":["Shell Armor"]},{"role":"Bulky Support","movepool":["explosion","rapidspin","spikes","surf","toxic"],"abilities":["Shell Armor"]}]},"gengar":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["destinybond","explosion","firepunch","icepunch","substitute","thunderbolt","willowisp"],"abilities":["Levitate"],"preferredTypes":["Electric","Ice"]}]},"hypno":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["batonpass","calmmind","firepunch","psychic"],"abilities":["Insomnia"]},{"role":"Bulky Support","movepool":["firepunch","protect","psychic","toxic","wish"],"abilities":["Insomnia"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Insomnia"]}]},"kingler":{"level":91,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","hiddenpowerghost","hiddenpowerground","surf","swordsdance"],"abilities":["Hyper Cutter"]}]},"electrode":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["explosion","hiddenpowerice","substitute","thunderbolt","toxic"],"abilities":["Static"]}]},"exeggutor":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["gigadrain","hiddenpowerfire","psychic","sleeppowder","stunspore","synthesis"],"abilities":["Chlorophyll"]},{"role":"Wallbreaker","movepool":["explosion","gigadrain","hiddenpowerfire","leechseed","psychic","sleeppowder","stunspore","substitute"],"abilities":["Chlorophyll"]},{"role":"Setup Sweeper","movepool":["hiddenpowerfire","psychic","solarbeam","sunnyday"],"abilities":["Chlorophyll"]}]},"marowak":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","earthquake","rockslide","swordsdance"],"abilities":["Rock Head"]},{"role":"Generalist","movepool":["bonemerang","doubleedge","rockslide","swordsdance"],"abilities":["Rock Head"]}]},"hitmonlee":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["brickbreak","bulkup","earthquake","hiddenpowerghost","machpunch","rockslide"],"abilities":["Limber"],"preferredTypes":["Ghost"]},{"role":"Berry Sweeper","movepool":["earthquake","hiddenpowerghost","reversal","rockslide","substitute"],"abilities":["Limber"],"preferredTypes":["Ghost"]}]},"hitmonchan":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["bulkup","earthquake","hiddenpowerghost","machpunch","rapidspin","rockslide","skyuppercut","toxic"],"abilities":["Keen Eye"],"preferredTypes":["Ghost"]}]},"lickitung":{"level":94,"sets":[{"role":"Bulky Attacker","movepool":["bodyslam","earthquake","protect","wish"],"abilities":["Own Tempo"]},{"role":"Bulky Support","movepool":["healbell","knockoff","protect","seismictoss","wish"],"abilities":["Own Tempo"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Own Tempo"]}]},"weezing":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["explosion","fireblast","haze","painsplit","sludgebomb","toxic","willowisp"],"abilities":["Levitate"]}]},"rhydon":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["earthquake","megahorn","rockslide","substitute","swordsdance"],"abilities":["Rock Head"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","megahorn","rockslide"],"abilities":["Rock Head"]}]},"tangela":{"level":95,"sets":[{"role":"Bulky Support","movepool":["hiddenpowergrass","leechseed","morningsun","sleeppowder","stunspore","toxic"],"abilities":["Chlorophyll"]},{"role":"Setup Sweeper","movepool":["hiddenpowerfire","morningsun","sleeppowder","solarbeam","sunnyday"],"abilities":["Chlorophyll"]}]},"kangaskhan":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","earthquake","rest","return","shadowball","toxic"],"abilities":["Early Bird"],"preferredTypes":["Ground"]},{"role":"Bulky Attacker","movepool":["bodyslam","earthquake","protect","return","wish"],"abilities":["Early Bird"]}]},"seaking":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowerelectric","hiddenpowergrass","hydropump","icebeam","megahorn","raindance"],"abilities":["Swift Swim"]}]},"starmie":{"level":74,"sets":[{"role":"Bulky Attacker","movepool":["hydropump","icebeam","psychic","recover","surf","thunderbolt"],"abilities":["Natural Cure"]}]},"mrmime":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","calmmind","encore","firepunch","hypnosis","psychic","substitute","thunderbolt"],"abilities":["Soundproof"]}]},"scyther":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["aerialace","batonpass","hiddenpowerground","silverwind","swordsdance"],"abilities":["Swarm"],"preferredTypes":["Ground"]}]},"jynx":{"level":80,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerfire","icebeam","lovelykiss","psychic","substitute"],"abilities":["Oblivious"]}]},"electabuzz":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["crosschop","firepunch","focuspunch","hiddenpowergrass","icepunch","substitute","thunderbolt"],"abilities":["Static"],"preferredTypes":["Ice"]},{"role":"Berry Sweeper","movepool":["firepunch","hiddenpowergrass","icepunch","substitute","thunderbolt"],"abilities":["Static"],"preferredTypes":["Ice"]}]},"magmar":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["crosschop","fireblast","flamethrower","focuspunch","hiddenpowergrass","hiddenpowerice","substitute","thunderpunch","toxic"],"abilities":["Flame Body"],"preferredTypes":["Electric"]},{"role":"Berry Sweeper","movepool":["fireblast","flamethrower","hiddenpowergrass","hiddenpowerice","substitute","thunderpunch"],"abilities":["Flame Body"],"preferredTypes":["Electric"]}]},"pinsir":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","hiddenpowerbug","rockslide","swordsdance"],"abilities":["Hyper Cutter"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","hiddenpowerbug","rockslide"],"abilities":["Hyper Cutter"]}]},"tauros":{"level":76,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","hiddenpowerghost","return"],"abilities":["Intimidate"]}]},"gyarados":{"level":74,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","dragondance","earthquake","hiddenpowerflying","hydropump"],"abilities":["Intimidate"],"preferredTypes":["Ground"]},{"role":"Setup Sweeper","movepool":["doubleedge","dragondance","earthquake","hiddenpowerflying","substitute"],"abilities":["Intimidate"],"preferredTypes":["Ground"]}]},"lapras":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["healbell","icebeam","rest","sleeptalk","surf","thunderbolt","toxic"],"abilities":["Water Absorb"]},{"role":"Fast Attacker","movepool":["healbell","icebeam","rest","sleeptalk","thunderbolt","toxic"],"abilities":["Water Absorb"]}]},"ditto":{"level":100,"sets":[{"role":"Generalist","movepool":["transform"],"abilities":["Limber"]}]},"vaporeon":{"level":79,"sets":[{"role":"Bulky Support","movepool":["icebeam","protect","surf","toxic","wish"],"abilities":["Water Absorb"]}]},"jolteon":{"level":77,"sets":[{"role":"Staller","movepool":["hiddenpowerice","protect","thunderbolt","toxic"],"abilities":["Volt Absorb"]},{"role":"Fast Attacker","movepool":["batonpass","hiddenpowerice","substitute","thunderbolt"],"abilities":["Volt Absorb"]}]},"flareon":{"level":89,"sets":[{"role":"Bulky Support","movepool":["flamethrower","hiddenpowergrass","protect","toxic","wish"],"abilities":["Flash Fire"]},{"role":"Wallbreaker","movepool":["doubleedge","fireblast","hiddenpowergrass","hiddenpowerrock","irontail","shadowball","toxic"],"abilities":["Flash Fire"]}]},"omastar":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowergrass","hydropump","icebeam","spikes","surf"],"abilities":["Shell Armor","Swift Swim"]},{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","raindance","surf"],"abilities":["Swift Swim"]}]},"kabutops":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["brickbreak","hiddenpowerflying","rockslide","surf","swordsdance"],"abilities":["Battle Armor","Swift Swim"]}]},"aerodactyl":{"level":73,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","earthquake","hiddenpowerflying","rockslide"],"abilities":["Rock Head"]},{"role":"Berry Sweeper","movepool":["earthquake","hiddenpowerflying","rockslide","substitute"],"abilities":["Pressure"]}]},"snorlax":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["bodyslam","curse","earthquake","selfdestruct","shadowball"],"abilities":["Immunity"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["bodyslam","curse","rest","sleeptalk"],"abilities":["Thick Fat"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","earthquake","rest"],"abilities":["Immunity","Thick Fat"]}]},"articuno":{"level":80,"sets":[{"role":"Staller","movepool":["healbell","hiddenpowerfire","icebeam","protect","toxic"],"abilities":["Pressure"]},{"role":"Bulky Attacker","movepool":["hiddenpowerfire","icebeam","rest","sleeptalk"],"abilities":["Pressure"]}]},"zapdos":{"level":74,"sets":[{"role":"Staller","movepool":["hiddenpowerice","protect","thunderbolt","toxic"],"abilities":["Pressure"]},{"role":"Fast Attacker","movepool":["batonpass","hiddenpowerice","substitute","thunderbolt","thunderwave","toxic"],"abilities":["Pressure"]},{"role":"Bulky Attacker","movepool":["hiddenpowerice","rest","sleeptalk","thunderbolt"],"abilities":["Pressure"]}]},"moltres":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","flamethrower","hiddenpowergrass","morningsun","substitute","toxic","willowisp"],"abilities":["Pressure"]}]},"dragonite":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","dragondance","earthquake","healbell","hiddenpowerflying","rest","substitute"],"abilities":["Inner Focus"],"preferredTypes":["Ground"]},{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","earthquake","fireblast","hiddenpowerflying"],"abilities":["Inner Focus"],"preferredTypes":["Ground"]}]},"mewtwo":{"level":66,"sets":[{"role":"Bulky Setup","movepool":["calmmind","flamethrower","psychic","recover"],"abilities":["Pressure"]},{"role":"Setup Sweeper","movepool":["calmmind","flamethrower","icebeam","psychic","thunderbolt"],"abilities":["Pressure"],"preferredTypes":["Electric"]}]},"mew":{"level":72,"sets":[{"role":"Bulky Support","movepool":["explosion","flamethrower","psychic","softboiled","thunderwave","transform"],"abilities":["Synchronize"]},{"role":"Bulky Setup","movepool":["calmmind","flamethrower","psychic","softboiled","thunderbolt"],"abilities":["Synchronize"]},{"role":"Setup Sweeper","movepool":["earthquake","explosion","rockslide","softboiled","swordsdance"],"abilities":["Synchronize"],"preferredTypes":["Ground","Rock"]}]},"meganium":{"level":85,"sets":[{"role":"Staller","movepool":["bodyslam","earthquake","hiddenpowergrass","leechseed","synthesis","toxic"],"abilities":["Overgrow"]},{"role":"Bulky Setup","movepool":["bodyslam","earthquake","hiddenpowerrock","swordsdance","synthesis"],"abilities":["Overgrow"],"preferredTypes":["Ground"]}]},"typhlosion":{"level":79,"sets":[{"role":"Berry Sweeper","movepool":["fireblast","flamethrower","hiddenpowerice","substitute","thunderpunch"],"abilities":["Blaze"]},{"role":"Fast Attacker","movepool":["earthquake","fireblast","flamethrower","focuspunch","hiddenpowerice","substitute","thunderpunch","toxic"],"abilities":["Blaze"],"preferredTypes":["Electric"]}]},"feraligatr":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hiddenpowerflying","hydropump","rockslide","swordsdance"],"abilities":["Torrent"],"preferredTypes":["Ground"]}]},"furret":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","quickattack","return","shadowball"],"abilities":["Keen Eye"]},{"role":"Fast Attacker","movepool":["brickbreak","doubleedge","return","shadowball","trick"],"abilities":["Keen Eye"]},{"role":"Berry Sweeper","movepool":["return","reversal","shadowball","substitute"],"abilities":["Keen Eye"]}]},"noctowl":{"level":92,"sets":[{"role":"Staller","movepool":["hiddenpowerfire","hypnosis","return","toxic","whirlwind"],"abilities":["Insomnia"]}]},"ledian":{"level":100,"sets":[{"role":"Setup Sweeper","movepool":["agility","batonpass","silverwind","swordsdance"],"abilities":["Swarm"]},{"role":"Generalist","movepool":["batonpass","silverwind","substitute","swordsdance"],"abilities":["Swarm"]}]},"ariados":{"level":98,"sets":[{"role":"Setup Sweeper","movepool":["agility","batonpass","signalbeam","sludgebomb"],"abilities":["Insomnia","Swarm"]},{"role":"Bulky Support","movepool":["batonpass","signalbeam","sludgebomb","spiderweb","toxic"],"abilities":["Insomnia","Swarm"],"preferredTypes":["Bug"]},{"role":"Bulky Setup","movepool":["agility","batonpass","sludgebomb","spiderweb"],"abilities":["Insomnia"]}]},"crobat":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["aerialace","haze","hiddenpowerground","shadowball","sludgebomb","toxic"],"abilities":["Inner Focus"],"preferredTypes":["Ground"]}]},"lanturn":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["icebeam","rest","sleeptalk","surf","thunderbolt","toxic"],"abilities":["Volt Absorb"]}]},"togetic":{"level":97,"sets":[{"role":"Staller","movepool":["charm","encore","flamethrower","seismictoss","softboiled","thunderwave","toxic"],"abilities":["Serene Grace"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Serene Grace"]}]},"xatu":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerfire","psychic","rest"],"abilities":["Early Bird"]},{"role":"Bulky Attacker","movepool":["batonpass","calmmind","hiddenpowerfire","protect","psychic","wish"],"abilities":["Synchronize"]},{"role":"Bulky Support","movepool":["protect","psychic","thunderwave","toxic","wish"],"abilities":["Synchronize"]}]},"ampharos":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["firepunch","healbell","hiddenpowerice","thunderbolt","toxic"],"abilities":["Static"],"preferredTypes":["Ice"]}]},"bellossom":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerfire","leechseed","magicalleaf","moonlight","sleeppowder","stunspore"],"abilities":["Chlorophyll"]}]},"azumarill":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","hiddenpowerghost","hydropump","rest","return","sleeptalk"],"abilities":["Huge Power"],"preferredTypes":["Normal"]}]},"sudowoodo":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["doubleedge","earthquake","explosion","rockslide","toxic"],"abilities":["Rock Head"],"preferredTypes":["Ground"]},{"role":"Generalist","movepool":["explosion","focuspunch","rockslide","substitute","toxic"],"abilities":["Rock Head"]}]},"politoed":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowergrass","hypnosis","icebeam","rest","surf","toxic"],"abilities":["Water Absorb"],"preferredTypes":["Ice"]},{"role":"Staller","movepool":["icebeam","protect","surf","toxic"],"abilities":["Water Absorb"]},{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","surf","toxic"],"abilities":["Water Absorb"]}]},"jumpluff":{"level":87,"sets":[{"role":"Generalist","movepool":["encore","hiddenpowerflying","sleeppowder","synthesis","toxic"],"abilities":["Chlorophyll"]},{"role":"Staller","movepool":["hiddenpowerflying","leechseed","protect","substitute"],"abilities":["Chlorophyll"]}]},"aipom":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["brickbreak","focuspunch","return","shadowball","substitute","thunderwave","toxic"],"abilities":["Pickup","Run Away"],"preferredTypes":["Ghost"]},{"role":"Generalist","movepool":["batonpass","brickbreak","return","shadowball","substitute","thunderwave","toxic"],"abilities":["Pickup","Run Away"]},{"role":"Wallbreaker","movepool":["batonpass","brickbreak","doubleedge","return","shadowball"],"abilities":["Pickup","Run Away"]}]},"sunflora":{"level":99,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerfire","leechseed","razorleaf","synthesis","toxic"],"abilities":["Chlorophyll"]},{"role":"Fast Attacker","movepool":["hiddenpowerfire","solarbeam","sunnyday","synthesis"],"abilities":["Chlorophyll"]}]},"yanma":{"level":92,"sets":[{"role":"Berry Sweeper","movepool":["hiddenpowerflying","hypnosis","reversal","shadowball","substitute"],"abilities":["Compound Eyes","Speed Boost"]},{"role":"Fast Attacker","movepool":["aerialace","doubleedge","hiddenpowerground","hypnosis","signalbeam","toxic"],"abilities":["Compound Eyes","Speed Boost"],"preferredTypes":["Ground"]}]},"quagsire":{"level":85,"sets":[{"role":"Staller","movepool":["earthquake","icebeam","protect","toxic"],"abilities":["Water Absorb"]},{"role":"Bulky Attacker","movepool":["earthquake","icebeam","rest","sleeptalk","surf","toxic"],"abilities":["Water Absorb"]}]},"espeon":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","calmmind","hiddenpowerfire","morningsun","psychic","substitute"],"abilities":["Synchronize"]}]},"umbreon":{"level":87,"sets":[{"role":"Staller","movepool":["hiddenpowerfire","hiddenpowerground","protect","toxic","wish"],"abilities":["Synchronize"]},{"role":"Bulky Support","movepool":["batonpass","protect","toxic","wish"],"abilities":["Synchronize"]}]},"murkrow":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","drillpeck","hiddenpowerfighting","hiddenpowerground","shadowball"],"abilities":["Insomnia"]},{"role":"Bulky Attacker","movepool":["drillpeck","hiddenpowerground","pursuit","shadowball","thunderwave","toxic"],"abilities":["Insomnia"],"preferredTypes":["Ground"]}]},"slowking":{"level":83,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","psychic","rest","sleeptalk","surf","thunderwave","toxic"],"abilities":["Own Tempo"]},{"role":"Setup Sweeper","movepool":["calmmind","psychic","rest","surf"],"abilities":["Own Tempo"]},{"role":"Bulky Setup","movepool":["calmmind","rest","sleeptalk","surf"],"abilities":["Own Tempo"]}]},"misdreavus":{"level":85,"sets":[{"role":"Bulky Support","movepool":["hiddenpowerice","painsplit","shadowball","thunderbolt","thunderwave","toxic"],"abilities":["Levitate"]},{"role":"Staller","movepool":["meanlook","perishsong","protect","shadowball"],"abilities":["Levitate"]},{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerice","substitute","thunderbolt"],"abilities":["Levitate"]}]},"unown":{"level":100,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerpsychic"],"abilities":["Levitate"]},{"role":"Wallbreaker","movepool":["hiddenpowerbug","hiddenpowerfighting"],"abilities":["Levitate"]}]},"wobbuffet":{"level":82,"sets":[{"role":"Bulky Support","movepool":["counter","destinybond","encore","mirrorcoat"],"abilities":["Shadow Tag"]}]},"girafarig":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","calmmind","hiddenpowerfire","psychic","rest","substitute","thunderbolt"],"abilities":["Early Bird"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","protect","psychic","return","shadowball","thunderbolt","thunderwave","toxic","wish"],"abilities":["Early Bird"]}]},"forretress":{"level":81,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","hiddenpowerbug","hiddenpowersteel","rapidspin","spikes","toxic"],"abilities":["Sturdy"]}]},"dunsparce":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["bodyslam","curse","earthquake","rest","shadowball"],"abilities":["Serene Grace"]},{"role":"Bulky Attacker","movepool":["earthquake","headbutt","shadowball","thunderwave"],"abilities":["Serene Grace"]}]},"gligar":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","hiddenpowerflying","quickattack","rockslide","substitute","swordsdance"],"abilities":["Hyper Cutter"]}]},"steelix":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["doubleedge","earthquake","explosion","hiddenpowerrock","irontail","rest","roar","toxic"],"abilities":["Rock Head"]},{"role":"Staller","movepool":["doubleedge","earthquake","hiddenpowerrock","protect","toxic"],"abilities":["Rock Head"]}]},"granbull":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","earthquake","rest","return","sleeptalk"],"abilities":["Intimidate"]},{"role":"Wallbreaker","movepool":["bulkup","doubleedge","earthquake","overheat","shadowball"],"abilities":["Intimidate"]},{"role":"Bulky Attacker","movepool":["earthquake","healbell","return","shadowball","thunderwave"],"abilities":["Intimidate"],"preferredTypes":["Ground"]}]},"qwilfish":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["hydropump","selfdestruct","shadowball","sludgebomb","swordsdance"],"abilities":["Poison Point","Swift Swim"]},{"role":"Fast Attacker","movepool":["destinybond","hydropump","selfdestruct","sludgebomb","spikes"],"abilities":["Poison Point","Swift Swim"]}]},"scizor":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","hiddenpowerground","morningsun","silverwind","steelwing","swordsdance"],"abilities":["Swarm"]},{"role":"Generalist","movepool":["agility","batonpass","hiddenpowerground","silverwind","steelwing"],"abilities":["Swarm"]}]},"shuckle":{"level":98,"sets":[{"role":"Staller","movepool":["encore","rest","toxic","wrap"],"abilities":["Sturdy"]}]},"heracross":{"level":77,"sets":[{"role":"Wallbreaker","movepool":["brickbreak","earthquake","hiddenpowerghost","megahorn","rockslide"],"abilities":["Guts"],"preferredTypes":["Rock"]},{"role":"Setup Sweeper","movepool":["brickbreak","megahorn","rockslide","swordsdance"],"abilities":["Guts"]},{"role":"Berry Sweeper","movepool":["endure","megahorn","reversal","rockslide","substitute"],"abilities":["Swarm"]}]},"sneasel":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["brickbreak","hiddenpowerflying","shadowball","substitute","swordsdance"],"abilities":["Inner Focus"],"preferredTypes":["Fighting","Ghost"]},{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","hiddenpowerflying","shadowball","swordsdance"],"abilities":["Inner Focus"],"preferredTypes":["Fighting","Ghost"]}]},"ursaring":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["earthquake","focuspunch","hiddenpowerghost","return"],"abilities":["Guts"]},{"role":"Fast Attacker","movepool":["earthquake","facade","hiddenpowerghost","return"],"abilities":["Guts"]},{"role":"Setup Sweeper","movepool":["earthquake","hiddenpowerghost","return","swordsdance"],"abilities":["Guts"]}]},"magcargo":{"level":99,"sets":[{"role":"Bulky Support","movepool":["fireblast","flamethrower","hiddenpowergrass","rest","sleeptalk","toxic"],"abilities":["Flame Body"]},{"role":"Staller","movepool":["fireblast","flamethrower","hiddenpowergrass","protect","toxic"],"abilities":["Flame Body"]}]},"piloswine":{"level":87,"sets":[{"role":"Staller","movepool":["earthquake","icebeam","protect","toxic"],"abilities":["Oblivious"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","icebeam","rest","rockslide","sleeptalk"],"abilities":["Oblivious"]}]},"corsola":{"level":98,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","icebeam","recover","surf","toxic"],"abilities":["Natural Cure"]}]},"octillery":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","hiddenpowerelectric","hiddenpowergrass","icebeam","surf","thunderwave"],"abilities":["Suction Cups"],"preferredTypes":["Ice"]}]},"delibird":{"level":99,"sets":[{"role":"Wallbreaker","movepool":["aerialace","doubleedge","focuspunch","hiddenpowerground","icebeam","quickattack"],"abilities":["Hustle"],"preferredTypes":["Ground"]}]},"mantine":{"level":86,"sets":[{"role":"Bulky Support","movepool":["hiddenpowergrass","icebeam","rest","sleeptalk","surf","toxic"],"abilities":["Water Absorb"]},{"role":"Staller","movepool":["haze","icebeam","protect","surf","toxic"],"abilities":["Water Absorb"]},{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","raindance","surf"],"abilities":["Swift Swim"]}]},"skarmory":{"level":74,"sets":[{"role":"Bulky Support","movepool":["drillpeck","protect","spikes","toxic"],"abilities":["Keen Eye"]},{"role":"Generalist","movepool":["drillpeck","spikes","toxic","whirlwind"],"abilities":["Keen Eye"]},{"role":"Staller","movepool":["protect","spikes","toxic","whirlwind"],"abilities":["Keen Eye"]}]},"houndoom":{"level":79,"sets":[{"role":"Berry Sweeper","movepool":["crunch","fireblast","hiddenpowergrass","substitute"],"abilities":["Flash Fire"]},{"role":"Fast Attacker","movepool":["crunch","fireblast","hiddenpowergrass","pursuit","willowisp"],"abilities":["Flash Fire"]}]},"kingdra":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowerelectric","hiddenpowergrass","hydropump","icebeam","raindance","substitute","surf"],"abilities":["Swift Swim"],"preferredTypes":["Ice"]}]},"donphan":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","rapidspin","rest","rockslide","sleeptalk","toxic"],"abilities":["Sturdy"]}]},"porygon2":{"level":80,"sets":[{"role":"Bulky Support","movepool":["icebeam","recover","return","thunderbolt","thunderwave","toxic"],"abilities":["Trace"]}]},"stantler":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hypnosis","return","shadowball","thunderbolt","thunderwave"],"abilities":["Intimidate"],"preferredTypes":["Ground"]}]},"smeargle":{"level":89,"sets":[{"role":"Generalist","movepool":["encore","explosion","spikes","spore"],"abilities":["Own Tempo"]}]},"hitmontop":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["brickbreak","bulkup","earthquake","hiddenpowerghost","machpunch","rapidspin","rockslide","toxic"],"abilities":["Intimidate"],"preferredTypes":["Ghost"]}]},"miltank":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["bodyslam","curse","earthquake","healbell","milkdrink","toxic"],"abilities":["Thick Fat"]}]},"blissey":{"level":77,"sets":[{"role":"Staller","movepool":["aromatherapy","seismictoss","softboiled","thunderwave","toxic"],"abilities":["Natural Cure"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Natural Cure"]}]},"raikou":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","crunch","hiddenpowerice","substitute","thunderbolt"],"abilities":["Pressure"],"preferredTypes":["Ice"]},{"role":"Bulky Attacker","movepool":["hiddenpowerice","rest","sleeptalk","thunderbolt"],"abilities":["Pressure"]}]},"entei":{"level":79,"sets":[{"role":"Bulky Support","movepool":["flamethrower","rest","sleeptalk","toxic"],"abilities":["Pressure"]},{"role":"Staller","movepool":["flamethrower","protect","substitute","toxic"],"abilities":["Pressure"]},{"role":"Bulky Setup","movepool":["calmmind","flamethrower","hiddenpowergrass","substitute"],"abilities":["Pressure"]}]},"suicune":{"level":74,"sets":[{"role":"Bulky Setup","movepool":["calmmind","rest","sleeptalk","surf"],"abilities":["Pressure"]},{"role":"Bulky Attacker","movepool":["calmmind","icebeam","rest","substitute","surf"],"abilities":["Pressure"]}]},"tyranitar":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","fireblast","hiddenpowerflying","rockslide"],"abilities":["Sand Stream"],"preferredTypes":["Ground"]},{"role":"Bulky Attacker","movepool":["crunch","earthquake","fireblast","icebeam","pursuit","rockslide","thunderwave"],"abilities":["Sand Stream"]},{"role":"Wallbreaker","movepool":["earthquake","fireblast","hiddenpowerflying","rest","rockslide","sleeptalk"],"abilities":["Sand Stream"],"preferredTypes":["Ground"]}]},"lugia":{"level":70,"sets":[{"role":"Staller","movepool":["earthquake","psychic","recover","substitute","toxic"],"abilities":["Pressure"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","recover","thunderbolt"],"abilities":["Pressure"]}]},"hooh":{"level":70,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","recover","sacredfire","substitute","thunderbolt","toxic"],"abilities":["Pressure"]},{"role":"Bulky Setup","movepool":["calmmind","recover","sacredfire","thunderbolt"],"abilities":["Pressure"]}]},"celebi":{"level":74,"sets":[{"role":"Bulky Setup","movepool":["batonpass","calmmind","hiddenpowerfire","hiddenpowergrass","psychic","recover"],"abilities":["Natural Cure"]},{"role":"Staller","movepool":["healbell","hiddenpowerfire","hiddenpowergrass","leechseed","psychic","recover","toxic"],"abilities":["Natural Cure"]}]},"sceptile":{"level":82,"sets":[{"role":"Staller","movepool":["hiddenpowerfire","hiddenpowerice","leafblade","leechseed","substitute"],"abilities":["Overgrow"]},{"role":"Berry Sweeper","movepool":["hiddenpowerice","leafblade","substitute","thunderpunch"],"abilities":["Overgrow"]},{"role":"Fast Attacker","movepool":["earthquake","hiddenpowerice","leafblade","thunderpunch","toxic"],"abilities":["Overgrow"],"preferredTypes":["Ground"]}]},"blaziken":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["earthquake","fireblast","hiddenpowerice","rockslide","skyuppercut","thunderpunch"],"abilities":["Blaze"]},{"role":"Berry Sweeper","movepool":["endure","fireblast","reversal","swordsdance"],"abilities":["Blaze"]},{"role":"Wallbreaker","movepool":["earthquake","fireblast","rockslide","skyuppercut","swordsdance"],"abilities":["Blaze"]}]},"swampert":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","hydropump","protect","surf","toxic"],"abilities":["Torrent"]},{"role":"Bulky Support","movepool":["earthquake","hydropump","rest","sleeptalk","surf"],"abilities":["Torrent"]},{"role":"Staller","movepool":["earthquake","hydropump","icebeam","refresh","surf","toxic"],"abilities":["Torrent"]}]},"mightyena":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["crunch","doubleedge","healbell","hiddenpowerfighting","shadowball","toxic"],"abilities":["Intimidate"],"preferredTypes":["Fighting"]}]},"linoone":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["bellydrum","extremespeed","hiddenpowerground","shadowball"],"abilities":["Pickup"]},{"role":"Bulky Setup","movepool":["bellydrum","hiddenpowerground","return","shadowball","substitute"],"abilities":["Pickup"],"preferredTypes":["Ground"]}]},"beautifly":{"level":100,"sets":[{"role":"Staller","movepool":["hiddenpowerfire","morningsun","psychic","toxic"],"abilities":["Swarm"]}]},"dustox":{"level":96,"sets":[{"role":"Staller","movepool":["hiddenpowerground","moonlight","sludgebomb","toxic","whirlwind"],"abilities":["Shield Dust"]}]},"ludicolo":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","raindance","surf"],"abilities":["Swift Swim"]}]},"shiftry":{"level":91,"sets":[{"role":"Setup Sweeper","movepool":["brickbreak","explosion","shadowball","swordsdance"],"abilities":["Chlorophyll","Early Bird"]},{"role":"Staller","movepool":["hiddenpowerdark","leechseed","substitute","toxic"],"abilities":["Chlorophyll","Early Bird"]}]},"swellow":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["aerialace","doubleedge","hiddenpowerground","quickattack","return"],"abilities":["Guts"]},{"role":"Fast Attacker","movepool":["aerialace","doubleedge","facade","hiddenpowerground","return"],"abilities":["Guts"]}]},"pelipper":{"level":88,"sets":[{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","surf","toxic"],"abilities":["Keen Eye"]},{"role":"Staller","movepool":["icebeam","protect","surf","toxic"],"abilities":["Keen Eye"]}]},"gardevoir":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","firepunch","hypnosis","icepunch","psychic","substitute","thunderbolt"],"abilities":["Trace"],"preferredTypes":["Fire"]}]},"masquerain":{"level":96,"sets":[{"role":"Fast Attacker","movepool":["hydropump","icebeam","stunspore","substitute","toxic"],"abilities":["Intimidate"]}]},"breloom":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerghost","hiddenpowerrock","machpunch","skyuppercut","spore","substitute","swordsdance"],"abilities":["Effect Spore"]},{"role":"Generalist","movepool":["focuspunch","hiddenpowerghost","hiddenpowerrock","spore","substitute"],"abilities":["Effect Spore"]}]},"vigoroth":{"level":84,"sets":[{"role":"Bulky Setup","movepool":["bodyslam","bulkup","earthquake","return","shadowball","slackoff"],"abilities":["Vital Spirit"]}]},"slaking":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","earthquake","hyperbeam","return","shadowball"],"abilities":["Truant"]}]},"ninjask":{"level":79,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","hiddenpowerflying","substitute","swordsdance"],"abilities":["Speed Boost"]},{"role":"Bulky Setup","movepool":["batonpass","hiddenpowerflying","protect","swordsdance"],"abilities":["Speed Boost"]}]},"shedinja":{"level":100,"sets":[{"role":"Fast Attacker","movepool":["agility","batonpass","hiddenpowerfighting","shadowball","silverwind","toxic"],"abilities":["Wonder Guard"],"preferredTypes":["Fighting"]}]},"exploud":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","overheat","return","shadowball"],"abilities":["Soundproof"]},{"role":"Fast Attacker","movepool":["earthquake","flamethrower","icebeam","return","shadowball","substitute"],"abilities":["Soundproof"],"preferredTypes":["Ground"]}]},"hariyama":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["bulkup","crosschop","earthquake","hiddenpowerghost","knockoff","rockslide"],"abilities":["Guts","Thick Fat"]},{"role":"Bulky Attacker","movepool":["crosschop","hiddenpowerghost","rest","rockslide","sleeptalk"],"abilities":["Guts"]}]},"nosepass":{"level":100,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","rockslide","thunderwave","toxic"],"abilities":["Magnet Pull"]}]},"delcatty":{"level":96,"sets":[{"role":"Bulky Support","movepool":["doubleedge","protect","thunderwave","toxic","wish"],"abilities":["Cute Charm"]},{"role":"Generalist","movepool":["bodyslam","healbell","protect","wish"],"abilities":["Cute Charm"]},{"role":"Setup Sweeper","movepool":["batonpass","calmmind","icebeam","thunderbolt"],"abilities":["Cute Charm"]}]},"sableye":{"level":91,"sets":[{"role":"Bulky Support","movepool":["knockoff","recover","seismictoss","toxic"],"abilities":["Keen Eye"]},{"role":"Bulky Attacker","movepool":["recover","seismictoss","shadowball","toxic"],"abilities":["Keen Eye"]}]},"mawile":{"level":95,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","brickbreak","hiddenpowersteel","rockslide","substitute","swordsdance"],"abilities":["Intimidate"],"preferredTypes":["Fighting"]},{"role":"Bulky Support","movepool":["focuspunch","hiddenpowersteel","rockslide","substitute","toxic"],"abilities":["Intimidate"]}]},"aggron":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","irontail","rockslide","thunderwave","toxic"],"abilities":["Rock Head"],"preferredTypes":["Ground"]},{"role":"Generalist","movepool":["focuspunch","irontail","rockslide","substitute"],"abilities":["Rock Head"]}]},"medicham":{"level":81,"sets":[{"role":"Setup Sweeper","movepool":["brickbreak","bulkup","recover","rockslide","shadowball","substitute"],"abilities":["Pure Power"],"preferredTypes":["Ghost"]},{"role":"Berry Sweeper","movepool":["bulkup","reversal","shadowball","substitute"],"abilities":["Pure Power"]},{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","rockslide","shadowball"],"abilities":["Pure Power"]}]},"manectric":{"level":82,"sets":[{"role":"Berry Sweeper","movepool":["crunch","hiddenpowerice","substitute","thunderbolt"],"abilities":["Static"]}]},"plusle":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["batonpass","encore","hiddenpowerice","substitute","thunderbolt","toxic"],"abilities":["Plus"]},{"role":"Staller","movepool":["hiddenpowerice","protect","thunderbolt","toxic"],"abilities":["Plus"]},{"role":"Bulky Support","movepool":["hiddenpowerice","protect","thunderbolt","toxic","wish"],"abilities":["Plus"]}]},"minun":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["batonpass","encore","hiddenpowerice","substitute","thunderbolt","toxic"],"abilities":["Minus"]},{"role":"Staller","movepool":["hiddenpowerice","protect","thunderbolt","toxic"],"abilities":["Minus"]},{"role":"Bulky Support","movepool":["hiddenpowerice","protect","thunderbolt","toxic","wish"],"abilities":["Minus"]}]},"volbeat":{"level":94,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","icepunch","tailglow","thunderbolt"],"abilities":["Swarm"]}]},"illumise":{"level":92,"sets":[{"role":"Bulky Support","movepool":["encore","moonlight","seismictoss","thunderwave","toxic"],"abilities":["Oblivious"]},{"role":"Generalist","movepool":["batonpass","encore","seismictoss","substitute","thunderwave","toxic"],"abilities":["Oblivious"]}]},"roselia":{"level":97,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerfire","magicalleaf","spikes","synthesis"],"abilities":["Natural Cure"]},{"role":"Bulky Support","movepool":["aromatherapy","hiddenpowergrass","spikes","synthesis","toxic"],"abilities":["Natural Cure"]}]},"swalot":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["encore","explosion","hiddenpowerground","icebeam","painsplit","shadowball","sludgebomb","toxic","yawn"],"abilities":["Liquid Ooze"]}]},"sharpedo":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","hiddenpowerflying","hydropump"],"abilities":["Rough Skin"]},{"role":"Berry Sweeper","movepool":["crunch","hiddenpowerelectric","hiddenpowergrass","hydropump","icebeam","substitute"],"abilities":["Rough Skin"]}]},"wailord":{"level":87,"sets":[{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","surf","toxic"],"abilities":["Water Veil"]},{"role":"Bulky Attacker","movepool":["hiddenpowergrass","icebeam","selfdestruct","surf","toxic"],"abilities":["Water Veil"],"preferredTypes":["Ice"]}]},"camerupt":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["earthquake","explosion","fireblast","rest","rockslide","sleeptalk","toxic"],"abilities":["Magma Armor"]}]},"torkoal":{"level":91,"sets":[{"role":"Bulky Attacker","movepool":["explosion","fireblast","flamethrower","hiddenpowergrass","rest","toxic"],"abilities":["White Smoke"]}]},"grumpig":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","firepunch","psychic","substitute","thunderpunch"],"abilities":["Thick Fat"],"preferredTypes":["Fire"]}]},"spinda":{"level":100,"sets":[{"role":"Staller","movepool":["encore","protect","seismictoss","shadowball","substitute","toxic"],"abilities":["Own Tempo"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Own Tempo"]}]},"flygon":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hiddenpowerbug","quickattack","rockslide"],"abilities":["Levitate"]},{"role":"Staller","movepool":["dragonclaw","earthquake","fireblast","protect","toxic"],"abilities":["Levitate"]},{"role":"Bulky Attacker","movepool":["dragonclaw","earthquake","fireblast","rockslide","substitute","toxic"],"abilities":["Levitate"]}]},"cacturne":{"level":95,"sets":[{"role":"Staller","movepool":["focuspunch","hiddenpowerdark","leechseed","substitute"],"abilities":["Sand Veil"]},{"role":"Generalist","movepool":["hiddenpowerdark","needlearm","spikes","thunderpunch"],"abilities":["Sand Veil"]}]},"altaria":{"level":85,"sets":[{"role":"Bulky Support","movepool":["dragonclaw","earthquake","flamethrower","haze","healbell","rest","toxic"],"abilities":["Natural Cure"]},{"role":"Setup Sweeper","movepool":["dragondance","earthquake","fireblast","healbell","hiddenpowerflying","rest"],"abilities":["Natural Cure"],"preferredTypes":["Ground"]}]},"zangoose":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["brickbreak","quickattack","return","shadowball","swordsdance"],"abilities":["Immunity"],"preferredTypes":["Ghost"]}]},"seviper":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["crunch","earthquake","flamethrower","hiddenpowergrass","sludgebomb"],"abilities":["Shed Skin"],"preferredTypes":["Ground"]}]},"lunatone":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","calmmind","hiddenpowerfire","hypnosis","icebeam","psychic"],"abilities":["Levitate"]},{"role":"Bulky Attacker","movepool":["explosion","hiddenpowerfire","hypnosis","icebeam","psychic","toxic"],"abilities":["Levitate"]}]},"solrock":{"level":84,"sets":[{"role":"Staller","movepool":["earthquake","protect","rockslide","toxic"],"abilities":["Levitate"]},{"role":"Wallbreaker","movepool":["earthquake","explosion","overheat","rockslide","shadowball"],"abilities":["Levitate"],"preferredTypes":["Ground"]}]},"whiscash":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icebeam","rest","sleeptalk","surf","toxic"],"abilities":["Oblivious"]},{"role":"Staller","movepool":["earthquake","icebeam","protect","toxic"],"abilities":["Oblivious"]}]},"crawdaunt":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["brickbreak","crunch","doubleedge","hiddenpowerelectric","hiddenpowergrass","icebeam","surf"],"abilities":["Hyper Cutter"],"preferredTypes":["Normal"]},{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","hiddenpowerflying","hiddenpowerghost","surf","swordsdance"],"abilities":["Hyper Cutter"],"preferredTypes":["Normal"]}]},"claydol":{"level":81,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","icebeam","psychic","rapidspin","toxic"],"abilities":["Levitate"]}]},"cradily":{"level":84,"sets":[{"role":"Bulky Support","movepool":["earthquake","hiddenpowergrass","recover","rockslide","toxic"],"abilities":["Suction Cups"],"preferredTypes":["Ground"]}]},"armaldo":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","hiddenpowerbug","rapidspin","rockslide","swordsdance"],"abilities":["Battle Armor"],"preferredTypes":["Ground"]}]},"milotic":{"level":77,"sets":[{"role":"Staller","movepool":["icebeam","recover","refresh","surf","toxic"],"abilities":["Marvel Scale"]}]},"castform":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","icebeam","return","thunderbolt","thunderwave"],"abilities":["Forecast"]}]},"kecleon":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["brickbreak","return","shadowball","thunderwave","trick"],"abilities":["Color Change"]}]},"banette":{"level":88,"sets":[{"role":"Berry Sweeper","movepool":["destinybond","endure","hiddenpowerfighting","shadowball"],"abilities":["Insomnia"]},{"role":"Wallbreaker","movepool":["doubleedge","hiddenpowerfighting","knockoff","shadowball","willowisp"],"abilities":["Insomnia"],"preferredTypes":["Fighting"]}]},"dusclops":{"level":86,"sets":[{"role":"Bulky Support","movepool":["rest","seismictoss","sleeptalk","willowisp"],"abilities":["Pressure"]},{"role":"Bulky Attacker","movepool":["rest","seismictoss","shadowball","sleeptalk"],"abilities":["Pressure"]},{"role":"Generalist","movepool":["focuspunch","icebeam","painsplit","shadowball","substitute","willowisp"],"abilities":["Pressure"]}]},"tropius":{"level":95,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","hiddenpowerflying","swordsdance","synthesis"],"abilities":["Chlorophyll"]},{"role":"Staller","movepool":["earthquake","hiddenpowerflying","leechseed","synthesis","toxic"],"abilities":["Chlorophyll"]}]},"chimecho":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","healbell","hiddenpowerfire","psychic","toxic"],"abilities":["Levitate"]}]},"absol":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","doubleedge","hiddenpowerfighting","quickattack","shadowball","swordsdance"],"abilities":["Pressure"],"preferredTypes":["Fighting","Ghost"]},{"role":"Wallbreaker","movepool":["doubleedge","hiddenpowerfighting","quickattack","shadowball"],"abilities":["Pressure"]}]},"glalie":{"level":82,"sets":[{"role":"Generalist","movepool":["earthquake","explosion","icebeam","spikes","toxic"],"abilities":["Inner Focus"]}]},"walrein":{"level":80,"sets":[{"role":"Staller","movepool":["icebeam","protect","surf","toxic"],"abilities":["Thick Fat"]},{"role":"Bulky Attacker","movepool":["encore","icebeam","rest","sleeptalk","surf","toxic"],"abilities":["Thick Fat"]}]},"huntail":{"level":89,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","hiddenpowerelectric","hiddenpowergrass","hydropump","icebeam","raindance","surf"],"abilities":["Swift Swim"],"preferredTypes":["Ice"]}]},"gorebyss":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowerelectric","hiddenpowergrass","hydropump","icebeam","raindance","surf"],"abilities":["Swift Swim"]}]},"relicanth":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["doubleedge","earthquake","hiddenpowerflying","rest","rockslide","sleeptalk","toxic"],"abilities":["Rock Head","Swift Swim"],"preferredTypes":["Ground"]}]},"luvdisc":{"level":100,"sets":[{"role":"Staller","movepool":["icebeam","protect","substitute","surf","toxic"],"abilities":["Swift Swim"]}]},"salamence":{"level":73,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","fireblast","hiddenpowerflying","rockslide"],"abilities":["Intimidate"],"preferredTypes":["Ground"]},{"role":"Wallbreaker","movepool":["brickbreak","doubleedge","earthquake","fireblast","hiddenpowerflying","rockslide"],"abilities":["Intimidate"],"preferredTypes":["Ground"]}]},"metagross":{"level":72,"sets":[{"role":"Wallbreaker","movepool":["earthquake","explosion","meteormash","rockslide"],"abilities":["Clear Body"]},{"role":"Setup Sweeper","movepool":["agility","earthquake","explosion","meteormash","psychic","rockslide"],"abilities":["Clear Body"],"preferredTypes":["Ground"]}]},"regirock":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["curse","earthquake","explosion","rest","rockslide","superpower"],"abilities":["Clear Body"],"preferredTypes":["Ground"]},{"role":"Bulky Attacker","movepool":["earthquake","explosion","rest","rockslide","sleeptalk","thunderwave","toxic"],"abilities":["Clear Body"]}]},"regice":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["explosion","icebeam","rest","sleeptalk","thunderbolt","thunderwave"],"abilities":["Clear Body"]},{"role":"Staller","movepool":["icebeam","protect","thunderbolt","toxic"],"abilities":["Clear Body"]}]},"registeel":{"level":78,"sets":[{"role":"Bulky Support","movepool":["rest","seismictoss","sleeptalk","toxic"],"abilities":["Clear Body"]}]},"latias":{"level":67,"sets":[{"role":"Bulky Setup","movepool":["calmmind","dragonclaw","hiddenpowerfire","psychic","recover"],"abilities":["Levitate"]},{"role":"Setup Sweeper","movepool":["calmmind","dragonclaw","recover","refresh"],"abilities":["Levitate"]}]},"latios":{"level":67,"sets":[{"role":"Bulky Setup","movepool":["calmmind","dragonclaw","hiddenpowerfire","psychic","recover"],"abilities":["Levitate"]},{"role":"Setup Sweeper","movepool":["calmmind","dragonclaw","recover","refresh"],"abilities":["Levitate"]}]},"kyogre":{"level":67,"sets":[{"role":"Bulky Support","movepool":["calmmind","icebeam","rest","sleeptalk","surf","thunder"],"abilities":["Drizzle"]}]},"groudon":{"level":69,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hiddenpowerbug","overheat","rockslide","substitute","swordsdance","thunderwave"],"abilities":["Drought"],"preferredTypes":["Rock"]}]},"rayquaza":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","hiddenpowerflying","overheat","rockslide"],"abilities":["Air Lock"],"preferredTypes":["Ground"]},{"role":"Wallbreaker","movepool":["earthquake","extremespeed","hiddenpowerflying","overheat","rockslide"],"abilities":["Air Lock"],"preferredTypes":["Ground","Normal"]}]},"jirachi":{"level":73,"sets":[{"role":"Bulky Support","movepool":["bodyslam","firepunch","protect","psychic","toxic","wish"],"abilities":["Serene Grace"]},{"role":"Setup Sweeper","movepool":["calmmind","firepunch","icepunch","psychic","substitute","thunderbolt"],"abilities":["Serene Grace"],"preferredTypes":["Fire"]}]},"deoxys":{"level":71,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","firepunch","icebeam","psychoboost","shadowball","superpower"],"abilities":["Pressure"],"preferredTypes":["Fighting","Ghost"]}]},"deoxysattack":{"level":70,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","firepunch","icebeam","psychoboost","shadowball","superpower"],"abilities":["Pressure"],"preferredTypes":["Fighting","Ghost"]}]},"deoxysdefense":{"level":74,"sets":[{"role":"Bulky Support","movepool":["recover","seismictoss","spikes","toxic"],"abilities":["Pressure"]}]},"deoxysspeed":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","firepunch","icebeam","psychic","recover","substitute"],"abilities":["Pressure"],"preferredTypes":["Fire"]},{"role":"Bulky Support","movepool":["psychoboost","recover","spikes","superpower","toxic"],"abilities":["Pressure"]}]}} as any;
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

	override randomSets: { [species: string]: RandomTeamsTypes.RandomSpeciesData } = randomSetsJSON;

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

	override cullMovePool(
		types: string[],
		moves: Set<string>,
		abilities: string[],
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
		if (teamDetails.spikes && teamDetails.spikes >= 2) {
			if (movePool.includes('spikes')) this.fastPop(movePool, movePool.indexOf('spikes'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.statusCure) {
			if (movePool.includes('aromatherapy')) this.fastPop(movePool, movePool.indexOf('aromatherapy'));
			if (movePool.includes('healbell')) this.fastPop(movePool, movePool.indexOf('healbell'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}

		// Develop additional move lists
		const badWithSetup = ['knockoff', 'rapidspin', 'toxic'];
		const statusMoves = this.cachedStatusMoves;

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
	override randomMoveset(
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

		// Enforce Seismic Toss and Spore
		for (const moveid of ['seismictoss', 'spikes', 'spore']) {
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

	override shouldCullAbility(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		abilities: string[],
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		preferredType: string,
		role: RandomTeamsTypes.Role
	) {
		switch (ability) {
		case 'Chlorophyll':
			return !teamDetails.sun;
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Swift Swim':
			return !teamDetails.rain;
		}

		return false;
	}

	override getAbility(
		types: Set<string>,
		moves: Set<string>,
		abilities: string[],
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): string {
		if (abilities.length <= 1) return abilities[0];

		// Hard-code abilities here
		if (species.id === 'yanma') return counter.get('inaccurate') ? 'Compound Eyes' : 'Speed Boost';

		const abilityAllowed: string[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilities) {
			if (!this.shouldCullAbility(
				ability, types, moves, abilities, counter, movePool, teamDetails, species, preferredType, role
			)) {
				abilityAllowed.push(ability);
			}
		}

		// Pick a random allowed ability
		if (abilityAllowed.length >= 1) return this.sample(abilityAllowed);

		// If all abilities are rejected, prioritize weather abilities over non-weather abilities
		if (!abilityAllowed.length) {
			const weatherAbilities = abilities.filter(a => ['Chlorophyll', 'Swift Swim'].includes(a));
			if (weatherAbilities.length) return this.sample(weatherAbilities);
		}

		// Pick a random ability
		return this.sample(abilities);
	}

	override getItem(
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
		if (species.id === 'shuckle') return 'Leftovers';
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

		if (
			moves.has('dragondance') && ability !== 'Natural Cure' &&
			!moves.has('healbell') && !moves.has('substitute')
		) return 'Lum Berry';
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

	override randomSet(
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
		// In Gen 3, if a set has multiple preferred types, enforce all of them.
		const preferredType = preferredTypes ? preferredTypes.join() : '';

		let ability = '';
		let item = undefined;

		const evs = { hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85 };
		const ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };

		const types = species.types;
		const abilities = set.abilities!;

		// Get moves
		const moves = this.randomMoveset(types, abilities, teamDetails, species, isLead, movePool,
			preferredType, role);
		const counter = this.newQueryMoves(moves, species, preferredType, abilities);

		// Get ability
		ability = this.getAbility(new Set(types), moves, abilities, counter, movePool, teamDetails, species,
			preferredType, role);

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

	override randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const seed = this.prng.getSeed();
		const ruleTable = this.dex.formats.getRuleTable(this.format);
		const pokemon: RandomTeamsTypes.RandomSet[] = [];

		// For Monotype
		const isMonotype = !!this.forceMonotype || ruleTable.has('sametypeclause');
		const typePool = this.dex.types.names();
		const type = this.forceMonotype || this.sample(typePool);

		const baseFormes: { [k: string]: number } = {};
		const typeCount: { [k: string]: number } = {};
		const typeWeaknesses: { [k: string]: number } = {};
		const typeDoubleWeaknesses: { [k: string]: number } = {};
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

			// Prevent Shedinja from generating after Tyranitar
			if (species.name === 'Shedinja' && teamDetails.sand) continue;

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
						if (typeDoubleWeaknesses[typeName] >= limitFactor) {
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
				if (this.dex.getEffectiveness(typeName, species) > 1) {
					typeDoubleWeaknesses[typeName]++;
				}
			}

			// Increment level 100 counter
			if (set.level === 100) numMaxLevelPokemon++;

			// Update team details
			if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails.rain = 1;
			if (set.ability === 'Drought' || set.moves.includes('sunnyday')) teamDetails.sun = 1;
			if (set.ability === 'Sand Stream') teamDetails.sand = 1;
			if (set.moves.includes('aromatherapy') || set.moves.includes('healbell')) teamDetails.statusCure = 1;
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
