import {MoveCounter} from './gen9';
import {RandomGen5Teams} from './gen5';
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
const randomSetsJSON = {"venusaur":{"level":83,"sets":[{"role":"Staller","movepool":["leechseed","powerwhip","sleeppowder","sludgebomb","substitute"],"abilities":["Overgrow"]},{"role":"Bulky Attacker","movepool":["earthquake","leafstorm","sleeppowder","sludgebomb","synthesis"],"abilities":["Overgrow"]}]},"charizard":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["airslash","dragonpulse","fireblast","hiddenpowergrass","roost"],"abilities":["Blaze"]}]},"blastoise":{"level":85,"sets":[{"role":"Bulky Support","movepool":["icebeam","rapidspin","roar","surf","toxic"],"abilities":["Torrent"]},{"role":"Staller","movepool":["haze","icebeam","protect","rapidspin","surf","toxic"],"abilities":["Torrent"]},{"role":"Fast Support","movepool":["icebeam","rest","sleeptalk","surf","toxic"],"abilities":["Torrent"]}]},"butterfree":{"level":91,"sets":[{"role":"Bulky Support","movepool":["bugbuzz","sleeppowder","stunspore","uturn"],"abilities":["Compound Eyes"]}]},"beedrill":{"level":95,"sets":[{"role":"Fast Support","movepool":["brickbreak","poisonjab","toxicspikes","uturn"],"abilities":["Swarm"]},{"role":"Fast Attacker","movepool":["brickbreak","poisonjab","swordsdance","uturn","xscissor"],"abilities":["Swarm"]}]},"pidgeot":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["bravebird","heatwave","return","roost"],"abilities":["Tangled Feet"]},{"role":"Wallbreaker","movepool":["bravebird","doubleedge","pursuit","quickattack","return","roost","uturn"],"abilities":["Tangled Feet"]}]},"raticate":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["crunch","facade","protect","suckerpunch","swordsdance","uturn"],"abilities":["Guts"]}]},"fearow":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","drillpeck","quickattack","return","uturn"],"abilities":["Keen Eye"]},{"role":"Wallbreaker","movepool":["doubleedge","drillpeck","pursuit","return","uturn"],"abilities":["Keen Eye"]}]},"arbok":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["crunch","earthquake","glare","gunkshot","poisonjab","seedbomb","switcheroo"],"abilities":["Intimidate"],"preferredTypes":["Ground"]}]},"pikachu":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["fakeout","grassknot","hiddenpowerice","surf","thunderbolt","volttackle"],"abilities":["Static"],"preferredTypes":["Ice"]}]},"raichu":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["encore","focusblast","grassknot","hiddenpowerice","nastyplot","surf","thunderbolt"],"abilities":["Static"]}]},"sandslash":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","nightslash","rapidspin","stoneedge","toxic"],"abilities":["Sand Veil"],"preferredTypes":["Rock"]},{"role":"Bulky Setup","movepool":["earthquake","nightslash","stoneedge","substitute","swordsdance","xscissor"],"abilities":["Sand Veil"],"preferredTypes":["Rock"]}]},"nidoqueen":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","fireblast","icebeam","roar","sludgebomb","toxicspikes"],"abilities":["Poison Point"]}]},"nidoking":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["earthquake","fireblast","icebeam","megahorn","sludgebomb","suckerpunch","thunderbolt","toxicspikes"],"abilities":["Poison Point"]}]},"clefable":{"level":83,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","doubleedge","fireblast","icebeam","softboiled","thunderwave"],"abilities":["Magic Guard"]},{"role":"Setup Sweeper","movepool":["calmmind","icebeam","softboiled","thunderbolt"],"abilities":["Magic Guard"]}]},"ninetales":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["energyball","fireblast","hiddenpowerrock","hypnosis","nastyplot"],"abilities":["Flash Fire"],"preferredTypes":["Grass"]}]},"wigglytuff":{"level":98,"sets":[{"role":"Fast Support","movepool":["doubleedge","protect","thunderwave","toxic","wish"],"abilities":["Cute Charm"]},{"role":"Bulky Support","movepool":["bodyslam","fireblast","healbell","protect","wish"],"abilities":["Cute Charm"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Cute Charm"]}]},"vileplume":{"level":90,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","energyball","hiddenpowerground","sleeppowder","sludgebomb","synthesis"],"abilities":["Chlorophyll"]},{"role":"Setup Sweeper","movepool":["hiddenpowerfire","sludgebomb","solarbeam","sunnyday"],"abilities":["Chlorophyll"]}]},"parasect":{"level":100,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","seedbomb","spore","stunspore","synthesis","xscissor"],"abilities":["Dry Skin"]},{"role":"Bulky Attacker","movepool":["pursuit","seedbomb","spore","swordsdance","xscissor"],"abilities":["Dry Skin"]}]},"venomoth":{"level":82,"sets":[{"role":"Fast Support","movepool":["bugbuzz","roost","sleeppowder","toxicspikes","uturn"],"abilities":["Tinted Lens"]}]},"dugtrio":{"level":82,"sets":[{"role":"Fast Support","movepool":["earthquake","nightslash","stoneedge","suckerpunch"],"abilities":["Arena Trap"],"preferredTypes":["Rock"]}]},"persian":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["bite","doubleedge","fakeout","hypnosis","return","seedbomb","taunt","uturn"],"abilities":["Technician"],"preferredTypes":["Dark"]}]},"golduck":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["calmmind","encore","focusblast","hiddenpowergrass","hydropump","icebeam","psychic","surf"],"abilities":["Cloud Nine"],"preferredTypes":["Ice"]}]},"primeape":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["bulkup","closecombat","earthquake","encore","stoneedge","uturn"],"abilities":["Vital Spirit"],"preferredTypes":["Rock"]}]},"arcanine":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["extremespeed","flareblitz","hiddenpowergrass","morningsun","thunderfang","toxic","willowisp"],"abilities":["Intimidate"],"preferredTypes":["Normal"]},{"role":"Fast Attacker","movepool":["crunch","extremespeed","flareblitz","ironhead","morningsun","thunderfang"],"abilities":["Intimidate"],"preferredTypes":["Normal"]}]},"poliwrath":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["brickbreak","bulkup","icepunch","waterfall"],"abilities":["Water Absorb"]},{"role":"Fast Support","movepool":["encore","focuspunch","icepunch","substitute","waterfall"],"abilities":["Water Absorb"]},{"role":"Bulky Support","movepool":["bulkup","rest","sleeptalk","toxic","waterfall"],"abilities":["Water Absorb"]}]},"alakazam":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["calmmind","encore","focusblast","psychic","shadowball","substitute","trick"],"abilities":["Synchronize"],"preferredTypes":["Fighting"]}]},"machamp":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["bulletpunch","dynamicpunch","earthquake","payback","stoneedge","toxic"],"abilities":["No Guard"],"preferredTypes":["Dark"]}]},"victreebel":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerground","leafblade","leafstorm","sleeppowder","sludgebomb","suckerpunch"],"abilities":["Chlorophyll"]},{"role":"Setup Sweeper","movepool":["sludgebomb","solarbeam","sunnyday","weatherball"],"abilities":["Chlorophyll"]}]},"tentacruel":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["haze","hydropump","icebeam","rapidspin","sludgebomb","surf","toxicspikes"],"abilities":["Clear Body","Liquid Ooze"],"preferredTypes":["Poison"]}]},"golem":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","stoneedge","suckerpunch","toxic"],"abilities":["Rock Head"]},{"role":"Setup Sweeper","movepool":["earthquake","explosion","rockpolish","stoneedge"],"abilities":["Rock Head"]}]},"rapidash":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["flareblitz","megahorn","morningsun","toxic","willowisp"],"abilities":["Flash Fire"]}]},"slowbro":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","icebeam","psychic","slackoff","surf","thunderwave","toxic"],"abilities":["Own Tempo"],"preferredTypes":["Psychic"]},{"role":"Bulky Setup","movepool":["calmmind","psychic","slackoff","surf"],"abilities":["Own Tempo"]}]},"farfetchd":{"level":100,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","heatwave","leafblade","nightslash","quickattack","uturn"],"abilities":["Inner Focus"],"preferredTypes":["Grass"]},{"role":"Setup Sweeper","movepool":["leafblade","nightslash","return","swordsdance"],"abilities":["Inner Focus"]}]},"dodrio":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["bravebird","pursuit","quickattack","return","roost"],"abilities":["Early Bird"]}]},"dewgong":{"level":90,"sets":[{"role":"Staller","movepool":["icebeam","protect","surf","toxic"],"abilities":["Thick Fat"]},{"role":"Fast Attacker","movepool":["raindance","rest","surf","toxic"],"abilities":["Hydration"]},{"role":"Bulky Support","movepool":["encore","icebeam","raindance","rest","surf","toxic"],"abilities":["Hydration","Thick Fat"]}]},"muk":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["brickbreak","curse","explosion","gunkshot","icepunch","payback","poisonjab","rest","shadowsneak"],"abilities":["Sticky Hold"],"preferredTypes":["Fighting"]}]},"cloyster":{"level":86,"sets":[{"role":"Staller","movepool":["explosion","iceshard","rapidspin","rockblast","spikes","surf","toxicspikes"],"abilities":["Shell Armor","Skill Link"]},{"role":"Staller","movepool":["explosion","icebeam","iceshard","rapidspin","spikes","surf","toxicspikes"],"abilities":["Shell Armor"]}]},"gengar":{"level":77,"sets":[{"role":"Wallbreaker","movepool":["explosion","focusblast","painsplit","shadowball","sludgebomb","substitute","trick","willowisp"],"abilities":["Levitate"],"preferredTypes":["Fighting"]}]},"hypno":{"level":92,"sets":[{"role":"Bulky Support","movepool":["protect","psychic","thunderwave","toxic","wish"],"abilities":["Insomnia"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Insomnia"]},{"role":"Bulky Setup","movepool":["focusblast","nastyplot","psychic","shadowball"],"abilities":["Insomnia"]}]},"kingler":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["crabhammer","return","superpower","swordsdance","xscissor"],"abilities":["Hyper Cutter"]},{"role":"Bulky Setup","movepool":["agility","crabhammer","return","swordsdance"],"abilities":["Hyper Cutter"]}]},"electrode":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["explosion","hiddenpowerice","signalbeam","taunt","thunderbolt"],"abilities":["Static"],"preferredTypes":["Ice"]}]},"exeggutor":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["explosion","hiddenpowerfire","leafstorm","psychic","sleeppowder","synthesis"],"abilities":["Chlorophyll"],"preferredTypes":["Psychic"]}]},"marowak":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","firepunch","stoneedge","swordsdance"],"abilities":["Rock Head"],"preferredTypes":["Rock"]}]},"hitmonlee":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["bulkup","closecombat","earthquake","machpunch","stoneedge","suckerpunch"],"abilities":["Limber"],"preferredTypes":["Rock"]}]},"hitmonchan":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["bulkup","closecombat","icepunch","machpunch","stoneedge"],"abilities":["Iron Fist"]}]},"weezing":{"level":90,"sets":[{"role":"Bulky Support","movepool":["explosion","fireblast","haze","painsplit","sludgebomb","willowisp"],"abilities":["Levitate"]},{"role":"Bulky Attacker","movepool":["fireblast","rest","sleeptalk","sludgebomb"],"abilities":["Levitate"]}]},"kangaskhan":{"level":84,"sets":[{"role":"Bulky Support","movepool":["doubleedge","earthquake","fakeout","hammerarm","return","suckerpunch"],"abilities":["Scrappy"]},{"role":"Bulky Attacker","movepool":["bodyslam","earthquake","protect","return","wish"],"abilities":["Scrappy"]}]},"seaking":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["icebeam","megahorn","raindance","return","waterfall"],"abilities":["Swift Swim"]}]},"starmie":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["hydropump","icebeam","psychic","recover","thunderbolt"],"abilities":["Natural Cure"]}]},"mrmime":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["encore","focusblast","nastyplot","psychic","shadowball","substitute"],"abilities":["Filter"],"preferredTypes":["Fighting"]}]},"scyther":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["aerialace","brickbreak","bugbite","roost","swordsdance"],"abilities":["Technician"]},{"role":"Wallbreaker","movepool":["aerialace","brickbreak","pursuit","uturn"],"abilities":["Technician"]}]},"jynx":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["focusblast","icebeam","lovelykiss","psychic","trick"],"abilities":["Forewarn"]},{"role":"Setup Sweeper","movepool":["focusblast","icebeam","lovelykiss","nastyplot","psychic","substitute"],"abilities":["Forewarn"]}]},"pinsir":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","stoneedge","swordsdance","xscissor"],"abilities":["Mold Breaker"],"preferredTypes":["Rock"]}]},"tauros":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","earthquake","payback","pursuit","return","stoneedge"],"abilities":["Intimidate"]}]},"gyarados":{"level":75,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","stoneedge","substitute","waterfall"],"abilities":["Intimidate"]},{"role":"Bulky Setup","movepool":["dragondance","rest","sleeptalk","waterfall"],"abilities":["Intimidate"]}]},"lapras":{"level":83,"sets":[{"role":"Bulky Support","movepool":["healbell","hydropump","icebeam","thunderbolt","toxic"],"abilities":["Water Absorb"]},{"role":"Staller","movepool":["hydropump","icebeam","protect","toxic"],"abilities":["Water Absorb"]}]},"ditto":{"level":100,"sets":[{"role":"Fast Support","movepool":["transform"],"abilities":["Limber"]}]},"vaporeon":{"level":83,"sets":[{"role":"Bulky Support","movepool":["healbell","icebeam","protect","surf","wish"],"abilities":["Water Absorb"]},{"role":"Staller","movepool":["protect","surf","toxic","wish"],"abilities":["Water Absorb"]}]},"jolteon":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["hiddenpowerice","substitute","thunderbolt","toxic"],"abilities":["Volt Absorb"]},{"role":"Fast Attacker","movepool":["hiddenpowerice","shadowball","signalbeam","thunderbolt"],"abilities":["Volt Absorb"]}]},"flareon":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","hiddenpowergrass","lavaplume","protect","superpower","wish"],"abilities":["Flash Fire"]},{"role":"Staller","movepool":["fireblast","lavaplume","protect","toxic","wish"],"abilities":["Flash Fire"]}]},"omastar":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","raindance"],"abilities":["Swift Swim"]},{"role":"Bulky Attacker","movepool":["icebeam","spikes","surf","toxicspikes"],"abilities":["Shell Armor","Swift Swim"]}]},"kabutops":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["aquajet","stoneedge","superpower","swordsdance","waterfall"],"abilities":["Battle Armor","Swift Swim"]}]},"aerodactyl":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["aerialace","aquatail","earthquake","roost","stoneedge"],"abilities":["Pressure"],"preferredTypes":["Ground"]}]},"snorlax":{"level":77,"sets":[{"role":"Bulky Attacker","movepool":["bodyslam","crunch","earthquake","pursuit","return","selfdestruct"],"abilities":["Thick Fat"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["bodyslam","curse","rest","sleeptalk"],"abilities":["Thick Fat"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","earthquake","rest"],"abilities":["Thick Fat"]}]},"articuno":{"level":78,"sets":[{"role":"Staller","movepool":["healbell","icebeam","roost","substitute","toxic"],"abilities":["Pressure"]}]},"zapdos":{"level":75,"sets":[{"role":"Bulky Support","movepool":["heatwave","hiddenpowerice","roost","substitute","thunderbolt","toxic","uturn"],"abilities":["Pressure"]},{"role":"Fast Attacker","movepool":["heatwave","hiddenpowerice","roost","thunderbolt","uturn"],"abilities":["Pressure"]}]},"moltres":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["airslash","fireblast","hiddenpowergrass","roost","substitute","toxic","uturn"],"abilities":["Pressure"]}]},"dragonite":{"level":73,"sets":[{"role":"Wallbreaker","movepool":["earthquake","extremespeed","outrage","superpower"],"abilities":["Inner Focus"]},{"role":"Setup Sweeper","movepool":["dragondance","earthquake","firepunch","outrage","roost"],"abilities":["Inner Focus"],"preferredTypes":["Ground"]}]},"mewtwo":{"level":70,"sets":[{"role":"Setup Sweeper","movepool":["aurasphere","calmmind","fireblast","psychic","recover","signalbeam"],"abilities":["Pressure"]}]},"mew":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["aurasphere","fireblast","nastyplot","psychic","softboiled"],"abilities":["Synchronize"]},{"role":"Setup Sweeper","movepool":["earthquake","explosion","softboiled","swordsdance","zenheadbutt"],"abilities":["Synchronize"]}]},"meganium":{"level":91,"sets":[{"role":"Staller","movepool":["aromatherapy","earthquake","energyball","leechseed","synthesis","toxic"],"abilities":["Overgrow"]}]},"typhlosion":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["eruption","fireblast","focusblast","hiddenpowergrass","hiddenpowerrock"],"abilities":["Blaze"]}]},"feraligatr":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","icepunch","waterfall"],"abilities":["Torrent"]},{"role":"Fast Attacker","movepool":["aquajet","return","swordsdance","waterfall"],"abilities":["Torrent"]},{"role":"Bulky Attacker","movepool":["aquajet","earthquake","icepunch","superpower","waterfall"],"abilities":["Torrent"],"preferredTypes":["Ice"]}]},"furret":{"level":92,"sets":[{"role":"Wallbreaker","movepool":["aquatail","doubleedge","firepunch","shadowclaw","trick","uturn"],"abilities":["Keen Eye"]}]},"noctowl":{"level":94,"sets":[{"role":"Staller","movepool":["airslash","nightshade","roost","toxic","whirlwind"],"abilities":["Insomnia"]}]},"ledian":{"level":100,"sets":[{"role":"Staller","movepool":["encore","focusblast","hiddenpowerflying","knockoff","roost","toxic","uturn"],"abilities":["Early Bird"]}]},"ariados":{"level":100,"sets":[{"role":"Bulky Support","movepool":["bugbite","poisonjab","suckerpunch","toxicspikes"],"abilities":["Insomnia","Swarm"]}]},"crobat":{"level":78,"sets":[{"role":"Bulky Support","movepool":["bravebird","heatwave","roost","superfang","taunt","toxic","uturn"],"abilities":["Inner Focus"]}]},"lanturn":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["discharge","healbell","hydropump","icebeam","surf","thunderbolt","thunderwave","toxic"],"abilities":["Volt Absorb"]}]},"xatu":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["calmmind","grassknot","heatwave","hiddenpowerfighting","psychic","roost","trick","uturn"],"abilities":["Synchronize"],"preferredTypes":["Fire"]},{"role":"Bulky Support","movepool":["heatwave","hiddenpowerfighting","psychic","roost","thunderwave","toxic"],"abilities":["Synchronize"]}]},"ampharos":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["discharge","focusblast","healbell","hiddenpowerice","signalbeam","thunderbolt","toxic"],"abilities":["Static"]}]},"bellossom":{"level":94,"sets":[{"role":"Bulky Support","movepool":["energyball","hiddenpowerfire","hiddenpowerrock","leafstorm","leechseed","sleeppowder","stunspore","synthesis"],"abilities":["Chlorophyll"]}]},"azumarill":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["aquajet","doubleedge","icepunch","superpower","waterfall"],"abilities":["Huge Power"],"preferredTypes":["Ice"]},{"role":"Bulky Setup","movepool":["aquajet","bellydrum","return","waterfall"],"abilities":["Huge Power"]}]},"sudowoodo":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","stoneedge","suckerpunch","toxic","woodhammer"],"abilities":["Rock Head"]}]},"politoed":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["encore","focusblast","hiddenpowergrass","hydropump","icebeam","rest","surf","toxic"],"abilities":["Water Absorb"],"preferredTypes":["Ice"]},{"role":"Staller","movepool":["encore","icebeam","protect","surf","toxic"],"abilities":["Water Absorb"]}]},"jumpluff":{"level":88,"sets":[{"role":"Bulky Support","movepool":["encore","energyball","sleeppowder","toxic","uturn"],"abilities":["Chlorophyll","Leaf Guard"]},{"role":"Fast Support","movepool":["hiddenpowerflying","leechseed","protect","sleeppowder","substitute"],"abilities":["Chlorophyll","Leaf Guard"]}]},"sunflora":{"level":99,"sets":[{"role":"Wallbreaker","movepool":["earthpower","hiddenpowerfire","hiddenpowerice","hiddenpowerrock","leafstorm","sludgebomb"],"abilities":["Chlorophyll"]},{"role":"Setup Sweeper","movepool":["earthpower","hiddenpowerfire","solarbeam","sunnyday"],"abilities":["Chlorophyll"]}]},"quagsire":{"level":90,"sets":[{"role":"Bulky Support","movepool":["earthquake","icebeam","recover","toxic"],"abilities":["Water Absorb"]},{"role":"Bulky Attacker","movepool":["earthquake","recover","toxic","waterfall"],"abilities":["Water Absorb"]}]},"espeon":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["calmmind","hiddenpowerfighting","morningsun","psychic","signalbeam","trick"],"abilities":["Synchronize"]},{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerfighting","morningsun","psychic","substitute"],"abilities":["Synchronize"]}]},"umbreon":{"level":85,"sets":[{"role":"Bulky Support","movepool":["curse","healbell","moonlight","payback","toxic"],"abilities":["Synchronize"]},{"role":"Staller","movepool":["payback","protect","toxic","wish"],"abilities":["Synchronize"]}]},"slowking":{"level":87,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","psychic","slackoff","surf","thunderwave","toxic"],"abilities":["Own Tempo"],"preferredTypes":["Psychic"]},{"role":"Wallbreaker","movepool":["fireblast","icebeam","psychic","slackoff","surf","trick","trickroom"],"abilities":["Own Tempo"],"preferredTypes":["Psychic"]}]},"unown":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerfighting","hiddenpowerpsychic"],"abilities":["Levitate"]}]},"wobbuffet":{"level":87,"sets":[{"role":"Bulky Support","movepool":["counter","destinybond","encore","mirrorcoat"],"abilities":["Shadow Tag"]}]},"girafarig":{"level":92,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerfighting","psychic","substitute","thunderbolt"],"abilities":["Inner Focus"]}]},"forretress":{"level":79,"sets":[{"role":"Bulky Support","movepool":["explosion","payback","rapidspin","spikes","toxicspikes"],"abilities":["Sturdy"]}]},"dunsparce":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headbutt","roost","thunderwave"],"abilities":["Serene Grace"]},{"role":"Bulky Support","movepool":["bite","bodyslam","earthquake","roost"],"abilities":["Serene Grace"]}]},"steelix":{"level":84,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","ironhead","roar","stoneedge","toxic"],"abilities":["Rock Head"]},{"role":"Staller","movepool":["earthquake","ironhead","protect","toxic"],"abilities":["Rock Head"]}]},"granbull":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","healbell","return","thunderwave"],"abilities":["Intimidate"]},{"role":"Bulky Attacker","movepool":["closecombat","crunch","return","thunderwave"],"abilities":["Intimidate"]}]},"qwilfish":{"level":84,"sets":[{"role":"Fast Support","movepool":["destinybond","explosion","poisonjab","spikes","thunderwave","toxicspikes","waterfall"],"abilities":["Poison Point","Swift Swim"]}]},"scizor":{"level":76,"sets":[{"role":"Setup Sweeper","movepool":["bugbite","bulletpunch","roost","superpower","swordsdance"],"abilities":["Technician"]},{"role":"Fast Attacker","movepool":["bulletpunch","pursuit","superpower","uturn"],"abilities":["Technician"]}]},"shuckle":{"level":98,"sets":[{"role":"Bulky Support","movepool":["encore","knockoff","rest","toxic"],"abilities":["Gluttony"]}]},"heracross":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["closecombat","facade","megahorn","nightslash"],"abilities":["Guts"]},{"role":"Fast Attacker","movepool":["closecombat","earthquake","megahorn","nightslash","stoneedge","swordsdance"],"abilities":["Guts"],"preferredTypes":["Rock"]}]},"ursaring":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["closecombat","crunch","facade","protect"],"abilities":["Guts"]},{"role":"Setup Sweeper","movepool":["closecombat","crunch","facade","swordsdance"],"abilities":["Quick Feet"]}]},"magcargo":{"level":97,"sets":[{"role":"Staller","movepool":["earthpower","hiddenpowerrock","lavaplume","recover","toxic"],"abilities":["Flame Body"]}]},"corsola":{"level":98,"sets":[{"role":"Staller","movepool":["explosion","icebeam","powergem","recover","surf","toxic"],"abilities":["Natural Cure"]}]},"octillery":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["energyball","fireblast","icebeam","surf","thunderwave"],"abilities":["Sniper"]}]},"delibird":{"level":100,"sets":[{"role":"Staller","movepool":["counter","icebeam","iceshard","rapidspin","seismictoss","toxic"],"abilities":["Vital Spirit"]}]},"mantine":{"level":88,"sets":[{"role":"Bulky Support","movepool":["rest","sleeptalk","surf","toxic"],"abilities":["Water Absorb"]},{"role":"Staller","movepool":["hiddenpowerflying","protect","surf","toxic"],"abilities":["Water Absorb"]}]},"skarmory":{"level":75,"sets":[{"role":"Bulky Support","movepool":["bravebird","roost","spikes","whirlwind"],"abilities":["Keen Eye"]},{"role":"Staller","movepool":["bravebird","roost","spikes","toxic"],"abilities":["Keen Eye"]}]},"houndoom":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","fireblast","hiddenpowergrass","nastyplot","suckerpunch"],"abilities":["Flash Fire"]}]},"kingdra":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["dragondance","outrage","rest","substitute","waterfall"],"abilities":["Sniper","Swift Swim"]},{"role":"Setup Sweeper","movepool":["dracometeor","hydropump","icebeam","raindance","waterfall"],"abilities":["Swift Swim"]},{"role":"Bulky Support","movepool":["dragondance","outrage","rest","sleeptalk"],"abilities":["Sniper","Swift Swim"]}]},"donphan":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","iceshard","rapidspin","stoneedge","toxic"],"abilities":["Sturdy"]},{"role":"Staller","movepool":["earthquake","protect","stoneedge","toxic"],"abilities":["Sturdy"]}]},"porygon2":{"level":86,"sets":[{"role":"Bulky Support","movepool":["discharge","icebeam","recover","toxic","triattack"],"abilities":["Download","Trace"]}]},"stantler":{"level":87,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","hypnosis","megahorn","return","suckerpunch","thunderbolt","thunderwave"],"abilities":["Intimidate"],"preferredTypes":["Ground"]}]},"smeargle":{"level":85,"sets":[{"role":"Fast Support","movepool":["explosion","spikes","spore","toxicspikes","whirlwind"],"abilities":["Own Tempo"]}]},"hitmontop":{"level":85,"sets":[{"role":"Bulky Support","movepool":["closecombat","earthquake","rapidspin","stoneedge","suckerpunch","toxic"],"abilities":["Intimidate"]},{"role":"Bulky Setup","movepool":["bulkup","closecombat","earthquake","stoneedge","suckerpunch"],"abilities":["Intimidate"],"preferredTypes":["Rock"]}]},"miltank":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["bodyslam","curse","earthquake","healbell","milkdrink","toxic"],"abilities":["Thick Fat"]}]},"blissey":{"level":80,"sets":[{"role":"Staller","movepool":["aromatherapy","seismictoss","softboiled","thunderwave","toxic"],"abilities":["Natural Cure"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Natural Cure"]}]},"raikou":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["aurasphere","hiddenpowerice","shadowball","thunderbolt"],"abilities":["Pressure"]},{"role":"Bulky Setup","movepool":["aurasphere","calmmind","hiddenpowerice","substitute","thunderbolt"],"abilities":["Pressure"],"preferredTypes":["Ice"]}]},"entei":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","flareblitz","ironhead","stoneedge"],"abilities":["Pressure"]},{"role":"Fast Attacker","movepool":["extremespeed","flareblitz","hiddenpowergrass","stoneedge"],"abilities":["Pressure"]}]},"suicune":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","rest","sleeptalk","surf"],"abilities":["Pressure"]},{"role":"Bulky Setup","movepool":["calmmind","hydropump","icebeam","rest","substitute","surf"],"abilities":["Pressure"]}]},"tyranitar":{"level":75,"sets":[{"role":"Bulky Attacker","movepool":["crunch","earthquake","fireblast","pursuit","stoneedge","superpower","thunderwave","toxic"],"abilities":["Sand Stream"]},{"role":"Bulky Setup","movepool":["crunch","dragondance","earthquake","firepunch","icepunch","stoneedge"],"abilities":["Sand Stream"]}]},"lugia":{"level":70,"sets":[{"role":"Staller","movepool":["aeroblast","earthquake","roost","substitute","toxic","whirlwind"],"abilities":["Pressure"]},{"role":"Bulky Setup","movepool":["aeroblast","calmmind","earthpower","roost"],"abilities":["Pressure"]}]},"hooh":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","earthquake","roost","sacredfire","substitute","toxic"],"abilities":["Pressure"]}]},"celebi":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["earthpower","energyball","leafstorm","nastyplot","psychic","uturn"],"abilities":["Natural Cure"],"preferredTypes":["Psychic"]},{"role":"Setup Sweeper","movepool":["energyball","nastyplot","psychic","recover"],"abilities":["Natural Cure"]}]},"sceptile":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["earthquake","focusblast","hiddenpowerfire","hiddenpowerice","leafstorm","rockslide"],"abilities":["Overgrow"]},{"role":"Staller","movepool":["energyball","hiddenpowerfire","hiddenpowerice","leechseed","substitute"],"abilities":["Overgrow"]}]},"blaziken":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["agility","earthquake","fireblast","stoneedge","superpower","vacuumwave"],"abilities":["Blaze"]},{"role":"Fast Attacker","movepool":["earthquake","flareblitz","stoneedge","superpower","swordsdance"],"abilities":["Blaze"]}]},"swampert":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icebeam","toxic","waterfall"],"abilities":["Torrent"]},{"role":"Staller","movepool":["earthquake","protect","toxic","waterfall"],"abilities":["Torrent"]},{"role":"Fast Attacker","movepool":["earthquake","icepunch","stoneedge","waterfall"],"abilities":["Torrent"]}]},"mightyena":{"level":95,"sets":[{"role":"Bulky Support","movepool":["crunch","doubleedge","firefang","suckerpunch","superfang","taunt","toxic"],"abilities":["Intimidate"]}]},"linoone":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["bellydrum","extremespeed","seedbomb","shadowclaw"],"abilities":["Gluttony"]}]},"beautifly":{"level":100,"sets":[{"role":"Fast Attacker","movepool":["bugbuzz","hiddenpowerground","psychic","uturn"],"abilities":["Swarm"]}]},"dustox":{"level":100,"sets":[{"role":"Staller","movepool":["bugbuzz","hiddenpowerground","roost","toxic","uturn","whirlwind"],"abilities":["Shield Dust"]}]},"ludicolo":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["energyball","hydropump","icebeam","raindance"],"abilities":["Swift Swim"]},{"role":"Wallbreaker","movepool":["energyball","hydropump","icebeam","surf"],"abilities":["Swift Swim"]}]},"shiftry":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","explosion","hiddenpowerfire","leafstorm","lowkick","suckerpunch"],"abilities":["Chlorophyll","Early Bird"]},{"role":"Setup Sweeper","movepool":["lowkick","seedbomb","suckerpunch","swordsdance"],"abilities":["Chlorophyll","Early Bird"]}]},"swellow":{"level":78,"sets":[{"role":"Fast Attacker","movepool":["bravebird","facade","protect","uturn"],"abilities":["Guts"]},{"role":"Wallbreaker","movepool":["bravebird","facade","quickattack","uturn"],"abilities":["Guts"]}]},"pelipper":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["airslash","hiddenpowergrass","hydropump","icebeam","roost","surf","toxic","uturn"],"abilities":["Keen Eye"]}]},"gardevoir":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["focusblast","healingwish","psychic","shadowball","thunderbolt","trick"],"abilities":["Trace"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["calmmind","focusblast","psychic","shadowball","substitute","willowisp"],"abilities":["Trace"],"preferredTypes":["Fighting"]}]},"masquerain":{"level":95,"sets":[{"role":"Bulky Support","movepool":["airslash","bugbuzz","hydropump","roost","stunspore","toxic"],"abilities":["Intimidate"]}]},"breloom":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["facade","machpunch","seedbomb","spore","stoneedge","superpower","swordsdance"],"abilities":["Poison Heal"]},{"role":"Bulky Attacker","movepool":["focuspunch","spore","stoneedge","substitute"],"abilities":["Poison Heal"]}]},"vigoroth":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["bodyslam","earthquake","encore","nightslash","return","slackoff","suckerpunch"],"abilities":["Vital Spirit"]},{"role":"Bulky Setup","movepool":["bodyslam","bulkup","earthquake","nightslash","return","slackoff"],"abilities":["Vital Spirit"]},{"role":"Setup Sweeper","movepool":["bodyslam","bulkup","earthquake","nightslash","return","suckerpunch"],"abilities":["Vital Spirit"]}]},"slaking":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","earthquake","gigaimpact","nightslash","return"],"abilities":["Truant"]}]},"ninjask":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["aerialace","nightslash","swordsdance","uturn","xscissor"],"abilities":["Speed Boost"]},{"role":"Setup Sweeper","movepool":["aerialace","swordsdance","uturn","xscissor"],"abilities":["Speed Boost"]}]},"shedinja":{"level":96,"sets":[{"role":"Setup Sweeper","movepool":["shadowclaw","shadowsneak","swordsdance","willowisp","xscissor"],"abilities":["Wonder Guard"]}]},"exploud":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["crunch","earthquake","fireblast","icebeam","return","surf"],"abilities":["Soundproof"]}]},"hariyama":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["bulletpunch","closecombat","facade","fakeout","payback","stoneedge"],"abilities":["Guts"],"preferredTypes":["Dark"]},{"role":"Bulky Attacker","movepool":["bulkup","bulletpunch","closecombat","payback","stoneedge"],"abilities":["Thick Fat"]}]},"delcatty":{"level":100,"sets":[{"role":"Bulky Support","movepool":["doubleedge","protect","thunderwave","toxic","wish"],"abilities":["Cute Charm"]},{"role":"Fast Support","movepool":["doubleedge","fakeout","healbell","suckerpunch","thunderwave","toxic"],"abilities":["Cute Charm"]}]},"sableye":{"level":97,"sets":[{"role":"Bulky Attacker","movepool":["payback","recover","seismictoss","toxic","willowisp"],"abilities":["Keen Eye"]}]},"mawile":{"level":97,"sets":[{"role":"Bulky Setup","movepool":["brickbreak","ironhead","suckerpunch","swordsdance"],"abilities":["Intimidate"]},{"role":"Bulky Attacker","movepool":["focuspunch","ironhead","substitute","suckerpunch"],"abilities":["Intimidate"]}]},"aggron":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["aquatail","earthquake","headsmash","icepunch","rockpolish"],"abilities":["Rock Head"],"preferredTypes":["Ground"]}]},"medicham":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["bulletpunch","highjumpkick","icepunch","trick","zenheadbutt"],"abilities":["Pure Power"]}]},"manectric":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["flamethrower","hiddenpowerice","overheat","switcheroo","thunderbolt"],"abilities":["Static"]}]},"plusle":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"abilities":["Plus"],"preferredTypes":["Ice"]},{"role":"Setup Sweeper","movepool":["grassknot","hiddenpowerice","nastyplot","thunderbolt"],"abilities":["Plus"]}]},"minun":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["encore","hiddenpowerice","nastyplot","substitute","thunderbolt"],"abilities":["Minus"],"preferredTypes":["Ice"]},{"role":"Setup Sweeper","movepool":["grassknot","hiddenpowerice","nastyplot","thunderbolt"],"abilities":["Minus"]}]},"volbeat":{"level":97,"sets":[{"role":"Staller","movepool":["encore","roost","seismictoss","toxic","uturn"],"abilities":["Swarm"]}]},"illumise":{"level":91,"sets":[{"role":"Bulky Support","movepool":["bugbuzz","encore","roost","thunderwave","toxic","uturn"],"abilities":["Tinted Lens"]}]},"swalot":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","encore","explosion","icebeam","painsplit","sludgebomb","toxic","yawn"],"abilities":["Liquid Ooze"],"preferredTypes":["Ground"]},{"role":"Staller","movepool":["earthquake","protect","sludgebomb","toxic"],"abilities":["Liquid Ooze"]}]},"sharpedo":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["aquajet","crunch","earthquake","hydropump","icebeam"],"abilities":["Rough Skin"]},{"role":"Fast Attacker","movepool":["aquajet","crunch","earthquake","icebeam","waterfall"],"abilities":["Rough Skin"]}]},"wailord":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["hydropump","icebeam","selfdestruct","waterspout"],"abilities":["Water Veil"]},{"role":"Bulky Attacker","movepool":["icebeam","selfdestruct","surf","toxic"],"abilities":["Water Veil"]}]},"camerupt":{"level":90,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","lavaplume","toxic","yawn"],"abilities":["Solid Rock"]},{"role":"Setup Sweeper","movepool":["earthquake","explosion","fireblast","rockpolish"],"abilities":["Solid Rock"]}]},"torkoal":{"level":85,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","lavaplume","rapidspin","yawn"],"abilities":["White Smoke"]}]},"grumpig":{"level":88,"sets":[{"role":"Bulky Support","movepool":["focusblast","healbell","psychic","thunderwave","toxic"],"abilities":["Thick Fat"]},{"role":"Bulky Attacker","movepool":["calmmind","focusblast","psychic","shadowball","trick"],"abilities":["Thick Fat"]}]},"spinda":{"level":100,"sets":[{"role":"Staller","movepool":["encore","protect","seismictoss","shadowball","substitute","toxic"],"abilities":["Own Tempo"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"],"abilities":["Own Tempo"]},{"role":"Bulky Attacker","movepool":["doubleedge","fakeout","lowkick","shadowball","suckerpunch"],"abilities":["Own Tempo"],"preferredTypes":["Fighting"]}]},"flygon":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["earthquake","outrage","roost","stoneedge","uturn"],"abilities":["Levitate"]},{"role":"Bulky Attacker","movepool":["dracometeor","earthquake","fireblast","roost","uturn"],"abilities":["Levitate"]}]},"cacturne":{"level":91,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","encore","seedbomb","spikes","suckerpunch","superpower"],"abilities":["Sand Veil"]},{"role":"Setup Sweeper","movepool":["seedbomb","suckerpunch","superpower","swordsdance"],"abilities":["Sand Veil"]}]},"altaria":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["dragondance","earthquake","outrage","roost"],"abilities":["Natural Cure"]},{"role":"Bulky Attacker","movepool":["dracometeor","earthquake","fireblast","haze","healbell","roost","toxic"],"abilities":["Natural Cure"]}]},"zangoose":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["closecombat","nightslash","quickattack","return","swordsdance"],"abilities":["Immunity"],"preferredTypes":["Dark"]}]},"seviper":{"level":92,"sets":[{"role":"Fast Attacker","movepool":["aquatail","darkpulse","earthquake","flamethrower","sludgebomb","suckerpunch","switcheroo"],"abilities":["Shed Skin"],"preferredTypes":["Ground"]}]},"lunatone":{"level":92,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","psychic","signalbeam","substitute"],"abilities":["Levitate"]},{"role":"Bulky Support","movepool":["earthpower","explosion","psychic","toxic"],"abilities":["Levitate"]}]},"solrock":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["earthquake","explosion","rockpolish","stoneedge","zenheadbutt"],"abilities":["Levitate"],"preferredTypes":["Ground"]}]},"whiscash":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","stoneedge","waterfall"],"abilities":["Anticipation"]}]},"crawdaunt":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["crunch","dragondance","superpower","waterfall","xscissor"],"abilities":["Hyper Cutter"]}]},"claydol":{"level":84,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","icebeam","psychic","rapidspin","toxic"],"abilities":["Levitate"]}]},"cradily":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["curse","earthquake","recover","seedbomb","stoneedge","swordsdance","toxic"],"abilities":["Suction Cups"]}]},"armaldo":{"level":83,"sets":[{"role":"Bulky Support","movepool":["earthquake","rapidspin","stoneedge","toxic","xscissor"],"abilities":["Battle Armor"],"preferredTypes":["Ground"]},{"role":"Bulky Attacker","movepool":["aquatail","earthquake","rockpolish","stoneedge","swordsdance","xscissor"],"abilities":["Battle Armor"],"preferredTypes":["Ground"]}]},"milotic":{"level":81,"sets":[{"role":"Staller","movepool":["haze","icebeam","recover","surf","toxic"],"abilities":["Marvel Scale"]},{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","surf","toxic"],"abilities":["Marvel Scale"]}]},"castform":{"level":96,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","icebeam","return","thunderbolt","thunderwave"],"abilities":["Forecast"]}]},"kecleon":{"level":92,"sets":[{"role":"Bulky Support","movepool":["recover","seismictoss","shadowclaw","thunderwave","toxic"],"abilities":["Color Change"]}]},"banette":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerfighting","shadowclaw","shadowsneak","thunderwave","willowisp"],"abilities":["Insomnia"]}]},"tropius":{"level":95,"sets":[{"role":"Staller","movepool":["airslash","earthquake","leechseed","roost","toxic"],"abilities":["Chlorophyll"]},{"role":"Setup Sweeper","movepool":["aerialace","dragondance","earthquake","leafblade"],"abilities":["Chlorophyll"]}]},"chimecho":{"level":94,"sets":[{"role":"Bulky Support","movepool":["healbell","hiddenpowerfighting","psychic","recover","thunderwave","toxic"],"abilities":["Levitate"]},{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerfighting","psychic","recover","signalbeam"],"abilities":["Levitate"]}]},"absol":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["nightslash","psychocut","pursuit","suckerpunch","superpower"],"abilities":["Super Luck"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["nightslash","suckerpunch","superpower","swordsdance"],"abilities":["Super Luck"]}]},"glalie":{"level":86,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","icebeam","spikes","taunt"],"abilities":["Inner Focus"]}]},"walrein":{"level":84,"sets":[{"role":"Staller","movepool":["encore","icebeam","superfang","surf","toxic"],"abilities":["Thick Fat"]},{"role":"Bulky Attacker","movepool":["icebeam","protect","rest","sleeptalk","surf","toxic"],"abilities":["Thick Fat"]}]},"huntail":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","hiddenpowergrass","hydropump","icebeam","raindance","surf"],"abilities":["Swift Swim"],"preferredTypes":["Ice"]}]},"gorebyss":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","raindance","surf"],"abilities":["Swift Swim"]}]},"relicanth":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headsmash","toxic","waterfall"],"abilities":["Rock Head"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","headsmash","rockpolish","waterfall"],"abilities":["Rock Head"],"preferredTypes":["Ground"]}]},"luvdisc":{"level":100,"sets":[{"role":"Staller","movepool":["icebeam","protect","substitute","surf","toxic"],"abilities":["Swift Swim"]}]},"salamence":{"level":72,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","fireblast","outrage","roost"],"abilities":["Intimidate"],"preferredTypes":["Ground"]}]},"metagross":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["agility","earthquake","explosion","meteormash","zenheadbutt"],"abilities":["Clear Body"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["bulletpunch","earthquake","explosion","meteormash","toxic","zenheadbutt"],"abilities":["Clear Body"],"preferredTypes":["Ground"]}]},"regirock":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","stoneedge","thunderwave","toxic"],"abilities":["Clear Body"]},{"role":"Bulky Support","movepool":["curse","earthquake","rest","sleeptalk","stoneedge"],"abilities":["Clear Body"]},{"role":"Staller","movepool":["earthquake","protect","rockslide","toxic"],"abilities":["Clear Body"]}]},"regice":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["focusblast","icebeam","rest","sleeptalk","thunderbolt","thunderwave"],"abilities":["Clear Body"],"preferredTypes":["Electric"]},{"role":"Setup Sweeper","movepool":["explosion","focusblast","icebeam","rockpolish","thunderbolt"],"abilities":["Clear Body"],"preferredTypes":["Electric"]},{"role":"Staller","movepool":["icebeam","protect","thunderbolt","toxic"],"abilities":["Clear Body"]}]},"registeel":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["curse","ironhead","rest","sleeptalk"],"abilities":["Clear Body"]},{"role":"Bulky Support","movepool":["rest","seismictoss","sleeptalk","toxic"],"abilities":["Clear Body"]}]},"latias":{"level":70,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psychic","roost"],"abilities":["Levitate"]}]},"latios":{"level":70,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psychic","roost"],"abilities":["Levitate"]}]},"kyogre":{"level":67,"sets":[{"role":"Fast Attacker","movepool":["icebeam","surf","thunder","waterspout"],"abilities":["Drizzle"]},{"role":"Bulky Support","movepool":["calmmind","icebeam","rest","sleeptalk","surf","thunder"],"abilities":["Drizzle"]}]},"groudon":{"level":72,"sets":[{"role":"Bulky Support","movepool":["earthquake","lavaplume","overheat","stoneedge","thunderwave"],"abilities":["Drought"]},{"role":"Bulky Setup","movepool":["earthquake","firepunch","rockpolish","stoneedge","swordsdance"],"abilities":["Drought"]}]},"rayquaza":{"level":70,"sets":[{"role":"Wallbreaker","movepool":["dracometeor","earthquake","extremespeed","fireblast","outrage"],"abilities":["Air Lock"]},{"role":"Setup Sweeper","movepool":["dragondance","earthquake","extremespeed","outrage","overheat"],"abilities":["Air Lock"],"preferredTypes":["Ground"]},{"role":"Fast Attacker","movepool":["dragonclaw","earthquake","extremespeed","swordsdance"],"abilities":["Air Lock"]}]},"jirachi":{"level":74,"sets":[{"role":"Bulky Support","movepool":["bodyslam","firepunch","healingwish","ironhead","protect","toxic","uturn","wish"],"abilities":["Serene Grace"]},{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerfire","psychic","substitute","thunderbolt","wish"],"abilities":["Serene Grace"],"preferredTypes":["Electric"]}]},"deoxys":{"level":73,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","psychoboost","shadowball","superpower"],"abilities":["Pressure"]},{"role":"Fast Support","movepool":["icebeam","psychoboost","shadowball","superpower"],"abilities":["Pressure"]}]},"deoxysattack":{"level":71,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","psychoboost","shadowball","superpower"],"abilities":["Pressure"]},{"role":"Fast Support","movepool":["icebeam","psychoboost","shadowball","superpower"],"abilities":["Pressure"]}]},"deoxysdefense":{"level":80,"sets":[{"role":"Bulky Support","movepool":["recover","seismictoss","spikes","taunt","toxic"],"abilities":["Pressure"]}]},"deoxysspeed":{"level":80,"sets":[{"role":"Fast Support","movepool":["psychoboost","spikes","superpower","taunt"],"abilities":["Pressure"]}]},"torterra":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","stoneedge","synthesis","woodhammer"],"abilities":["Overgrow"]},{"role":"Bulky Setup","movepool":["earthquake","rockpolish","stoneedge","woodhammer"],"abilities":["Overgrow"]}]},"infernape":{"level":76,"sets":[{"role":"Wallbreaker","movepool":["closecombat","grassknot","machpunch","overheat","uturn"],"abilities":["Blaze"]},{"role":"Fast Attacker","movepool":["closecombat","flareblitz","machpunch","stoneedge","swordsdance","uturn"],"abilities":["Blaze"]}]},"empoleon":{"level":78,"sets":[{"role":"Staller","movepool":["icebeam","protect","surf","toxic"],"abilities":["Torrent"]},{"role":"Bulky Support","movepool":["icebeam","roar","surf","toxic"],"abilities":["Torrent"]},{"role":"Setup Sweeper","movepool":["agility","grassknot","hydropump","icebeam"],"abilities":["Torrent"]}]},"staraptor":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["bravebird","closecombat","doubleedge","pursuit","quickattack","return","uturn"],"abilities":["Intimidate"],"preferredTypes":["Fighting"]},{"role":"Bulky Attacker","movepool":["bravebird","closecombat","return","roost","uturn"],"abilities":["Intimidate"],"preferredTypes":["Fighting"]}]},"bibarel":{"level":92,"sets":[{"role":"Setup Sweeper","movepool":["curse","quickattack","return","waterfall"],"abilities":["Simple"]},{"role":"Bulky Setup","movepool":["curse","quickattack","return","waterfall"],"abilities":["Simple"]}]},"kricketune":{"level":100,"sets":[{"role":"Setup Sweeper","movepool":["brickbreak","nightslash","return","swordsdance","xscissor"],"abilities":["Swarm"]}]},"luxray":{"level":86,"sets":[{"role":"Staller","movepool":["crunch","icefang","superpower","thunderbolt","toxic"],"abilities":["Intimidate"],"preferredTypes":["Fighting"]},{"role":"Bulky Attacker","movepool":["protect","superpower","thunderbolt","toxic"],"abilities":["Intimidate"]}]},"roserade":{"level":81,"sets":[{"role":"Fast Support","movepool":["energyball","hiddenpowerground","leafstorm","sleeppowder","sludgebomb","spikes","synthesis","toxicspikes"],"abilities":["Natural Cure"]}]},"rampardos":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","firepunch","rockpolish","stoneedge","zenheadbutt"],"abilities":["Mold Breaker"],"preferredTypes":["Ground"]},{"role":"Fast Attacker","movepool":["earthquake","headsmash","stoneedge","superpower"],"abilities":["Mold Breaker"]}]},"bastiodon":{"level":96,"sets":[{"role":"Bulky Support","movepool":["earthquake","metalburst","roar","toxic"],"abilities":["Sturdy"]},{"role":"Staller","movepool":["earthquake","protect","roar","toxic"],"abilities":["Sturdy"]}]},"wormadam":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerground","hiddenpowerrock","leafstorm","psychic","signalbeam"],"abilities":["Anticipation"]}]},"wormadamsandy":{"level":100,"sets":[{"role":"Staller","movepool":["earthquake","rest","sleeptalk","toxic"],"abilities":["Anticipation"]}]},"wormadamtrash":{"level":95,"sets":[{"role":"Staller","movepool":["flashcannon","rest","sleeptalk","toxic"],"abilities":["Anticipation"]}]},"mothim":{"level":93,"sets":[{"role":"Fast Attacker","movepool":["airslash","bugbuzz","hiddenpowerfighting","hiddenpowerground","shadowball","uturn"],"abilities":["Swarm"],"preferredTypes":["Bug"]}]},"vespiquen":{"level":96,"sets":[{"role":"Staller","movepool":["hiddenpowerflying","roost","toxic","uturn"],"abilities":["Pressure"]}]},"pachirisu":{"level":97,"sets":[{"role":"Bulky Support","movepool":["discharge","superfang","thunderbolt","thunderwave","toxic","uturn"],"abilities":["Pickup","Run Away"]},{"role":"Staller","movepool":["protect","thunderbolt","toxic","uturn"],"abilities":["Pickup","Run Away"]}]},"floatzel":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["aquajet","crunch","icepunch","return","waterfall"],"abilities":["Swift Swim"],"preferredTypes":["Ice"]},{"role":"Setup Sweeper","movepool":["bulkup","icepunch","return","substitute","waterfall"],"abilities":["Swift Swim"]}]},"cherrim":{"level":95,"sets":[{"role":"Staller","movepool":["aromatherapy","energyball","hiddenpowerground","leechseed","synthesis","toxic"],"abilities":["Flower Gift"]},{"role":"Bulky Support","movepool":["energyball","hiddenpowerfire","hiddenpowerice","leechseed","substitute"],"abilities":["Flower Gift"]}]},"gastrodon":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","icebeam","recover","surf","toxic"],"abilities":["Sticky Hold"]}]},"ambipom":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["fakeout","lowkick","payback","pursuit","return","uturn"],"abilities":["Technician"]}]},"drifblim":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","hiddenpowerfighting","rest","shadowball","substitute","thunderbolt"],"abilities":["Unburden"]}]},"lopunny":{"level":88,"sets":[{"role":"Fast Support","movepool":["encore","return","skyuppercut","thunderwave","toxic"],"abilities":["Cute Charm"]},{"role":"Wallbreaker","movepool":["healingwish","icepunch","return","skyuppercut","switcheroo"],"abilities":["Cute Charm"]}]},"mismagius":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["destinybond","hiddenpowerfighting","painsplit","shadowball","substitute","taunt","willowisp"],"abilities":["Levitate"]},{"role":"Setup Sweeper","movepool":["hiddenpowerfighting","nastyplot","shadowball","substitute","thunderbolt"],"abilities":["Levitate"]},{"role":"Wallbreaker","movepool":["hiddenpowerfighting","shadowball","thunderbolt","trick"],"abilities":["Levitate"]}]},"honchkrow":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["bravebird","heatwave","pursuit","roost","suckerpunch","superpower"],"abilities":["Insomnia"]}]},"purugly":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["fakeout","irontail","return","shadowclaw","uturn"],"abilities":["Thick Fat"]}]},"skuntank":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["crunch","explosion","fireblast","poisonjab","pursuit","suckerpunch","taunt"],"abilities":["Aftermath"]}]},"bronzong":{"level":79,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","ironhead","payback","toxic"],"abilities":["Levitate"],"preferredTypes":["Ground"]},{"role":"Staller","movepool":["earthquake","protect","psychic","toxic"],"abilities":["Levitate"]}]},"chatot":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["chatter","encore","heatwave","hiddenpowergrass","hypervoice","nastyplot"],"abilities":["Tangled Feet"]},{"role":"Fast Attacker","movepool":["chatter","heatwave","hiddenpowergrass","hypervoice","uturn"],"abilities":["Tangled Feet"]}]},"spiritomb":{"level":85,"sets":[{"role":"Bulky Setup","movepool":["calmmind","darkpulse","rest","sleeptalk"],"abilities":["Pressure"]},{"role":"Bulky Attacker","movepool":["darkpulse","painsplit","pursuit","shadowsneak","suckerpunch","willowisp"],"abilities":["Pressure"]}]},"garchomp":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["earthquake","firefang","outrage","stoneedge","swordsdance"],"abilities":["Sand Veil"]},{"role":"Bulky Setup","movepool":["dragonclaw","earthquake","substitute","swordsdance"],"abilities":["Sand Veil"]}]},"lucario":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["closecombat","crunch","extremespeed","stoneedge","swordsdance"],"abilities":["Inner Focus"],"preferredTypes":["Normal"]}]},"hippowdon":{"level":79,"sets":[{"role":"Bulky Support","movepool":["earthquake","roar","slackoff","stoneedge","toxic"],"abilities":["Sand Stream"]}]},"drapion":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["aquatail","crunch","earthquake","poisonjab","pursuit","swordsdance"],"abilities":["Battle Armor"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["crunch","earthquake","poisonjab","taunt","toxicspikes","whirlwind"],"abilities":["Battle Armor"]}]},"toxicroak":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["crosschop","earthquake","icepunch","poisonjab","substitute","suckerpunch","swordsdance"],"abilities":["Dry Skin"]}]},"carnivine":{"level":97,"sets":[{"role":"Bulky Support","movepool":["knockoff","powerwhip","sleeppowder","synthesis"],"abilities":["Levitate"]},{"role":"Bulky Setup","movepool":["powerwhip","return","sleeppowder","swordsdance","synthesis"],"abilities":["Levitate"]}]},"lumineon":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerelectric","hiddenpowergrass","icebeam","raindance","surf","uturn"],"abilities":["Swift Swim"]}]},"abomasnow":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","earthquake","iceshard","woodhammer"],"abilities":["Snow Warning"]}]},"weavile":{"level":75,"sets":[{"role":"Fast Attacker","movepool":["icepunch","iceshard","lowkick","nightslash","pursuit","swordsdance"],"abilities":["Pressure"]}]},"magnezone":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["explosion","flashcannon","hiddenpowerfire","hiddenpowerground","hiddenpowerice","thunderbolt"],"abilities":["Magnet Pull"]},{"role":"Staller","movepool":["hiddenpowerice","protect","thunderbolt","toxic"],"abilities":["Magnet Pull"]}]},"lickilicky":{"level":86,"sets":[{"role":"Bulky Support","movepool":["bodyslam","healbell","protect","toxic","wish"],"abilities":["Own Tempo"]},{"role":"Bulky Setup","movepool":["bodyslam","earthquake","explosion","powerwhip","return","swordsdance"],"abilities":["Own Tempo"],"preferredTypes":["Ground"]}]},"rhyperior":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icepunch","megahorn","rockpolish","stoneedge"],"abilities":["Solid Rock"]}]},"tangrowth":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","hiddenpowerfire","leafstorm","morningsun","powerwhip","rockslide","sleeppowder"],"abilities":["Chlorophyll"]},{"role":"Bulky Setup","movepool":["earthquake","powerwhip","rockslide","swordsdance"],"abilities":["Chlorophyll"]}]},"electivire":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["crosschop","earthquake","flamethrower","hiddenpowergrass","icepunch","thunderbolt"],"abilities":["Motor Drive"],"preferredTypes":["Ice"]}]},"magmortar":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["earthquake","fireblast","focusblast","hiddenpowerice","taunt","thunderbolt"],"abilities":["Flame Body"],"preferredTypes":["Electric"]}]},"togekiss":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["airslash","aurasphere","nastyplot","roost","thunderwave"],"abilities":["Serene Grace"]},{"role":"Bulky Attacker","movepool":["airslash","healbell","roost","thunderwave"],"abilities":["Serene Grace"]},{"role":"Fast Attacker","movepool":["airslash","aurasphere","fireblast","trick"],"abilities":["Serene Grace"]}]},"yanmega":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["airslash","bugbuzz","hiddenpowerfire","hiddenpowerground","protect"],"abilities":["Speed Boost"]},{"role":"Wallbreaker","movepool":["airslash","bugbuzz","hiddenpowerfire","hiddenpowerground","uturn"],"abilities":["Tinted Lens"]}]},"leafeon":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","leafblade","substitute","swordsdance","synthesis","xscissor"],"abilities":["Leaf Guard"],"preferredTypes":["Normal"]}]},"glaceon":{"level":86,"sets":[{"role":"Bulky Support","movepool":["healbell","hiddenpowerground","icebeam","protect","wish"],"abilities":["Snow Cloak"]},{"role":"Staller","movepool":["icebeam","protect","toxic","wish"],"abilities":["Snow Cloak"]}]},"gliscor":{"level":80,"sets":[{"role":"Staller","movepool":["earthquake","roost","stoneedge","taunt","toxic","uturn"],"abilities":["Hyper Cutter"]},{"role":"Bulky Setup","movepool":["earthquake","roost","stoneedge","swordsdance"],"abilities":["Hyper Cutter"]}]},"mamoswine":{"level":78,"sets":[{"role":"Wallbreaker","movepool":["earthquake","iceshard","stoneedge","superpower","toxic"],"abilities":["Snow Cloak"]}]},"porygonz":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","hiddenpowerfighting","icebeam","nastyplot","thunderbolt","triattack","trick"],"abilities":["Adaptability","Download"]}]},"gallade":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["closecombat","nightslash","shadowsneak","swordsdance","trick","zenheadbutt"],"abilities":["Steadfast"]}]},"probopass":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","explosion","powergem","thunderwave","toxic"],"abilities":["Magnet Pull"]}]},"dusknoir":{"level":85,"sets":[{"role":"Bulky Support","movepool":["earthquake","icepunch","painsplit","shadowsneak","toxic","trick","willowisp"],"abilities":["Pressure"],"preferredTypes":["Ground"]},{"role":"Staller","movepool":["earthquake","protect","shadowsneak","toxic"],"abilities":["Pressure"]},{"role":"Bulky Attacker","movepool":["focuspunch","painsplit","shadowsneak","substitute"],"abilities":["Pressure"]}]},"froslass":{"level":80,"sets":[{"role":"Fast Support","movepool":["destinybond","icebeam","shadowball","spikes","taunt","thunderwave"],"abilities":["Snow Cloak"]}]},"rotom":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerfighting","hiddenpowerice","shadowball","thunderbolt","trick"],"abilities":["Levitate"]},{"role":"Bulky Attacker","movepool":["painsplit","shadowball","thunderbolt","thunderwave","willowisp"],"abilities":["Levitate"]}]},"rotomheat":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["overheat","painsplit","shadowball","thunderbolt","trick","willowisp"],"abilities":["Levitate"]},{"role":"Bulky Support","movepool":["rest","shadowball","sleeptalk","thunderbolt"],"abilities":["Levitate"]}]},"rotomwash":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["hydropump","painsplit","shadowball","thunderbolt","trick","willowisp"],"abilities":["Levitate"]},{"role":"Bulky Support","movepool":["rest","shadowball","sleeptalk","thunderbolt"],"abilities":["Levitate"]}]},"rotomfrost":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","painsplit","shadowball","thunderbolt","trick","willowisp"],"abilities":["Levitate"]},{"role":"Bulky Support","movepool":["rest","shadowball","sleeptalk","thunderbolt"],"abilities":["Levitate"]}]},"rotomfan":{"level":78,"sets":[{"role":"Bulky Attacker","movepool":["painsplit","shadowball","thunderbolt","willowisp"],"abilities":["Levitate"]},{"role":"Bulky Support","movepool":["rest","shadowball","sleeptalk","thunderbolt"],"abilities":["Levitate"]}]},"rotommow":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["leafstorm","painsplit","shadowball","thunderbolt","trick","willowisp"],"abilities":["Levitate"]},{"role":"Bulky Support","movepool":["rest","shadowball","sleeptalk","thunderbolt"],"abilities":["Levitate"]}]},"uxie":{"level":76,"sets":[{"role":"Bulky Support","movepool":["healbell","psychic","thunderwave","uturn","yawn"],"abilities":["Levitate"]}]},"mesprit":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["calmmind","healingwish","hiddenpowerfighting","icebeam","psychic","thunderbolt","trick","uturn"],"abilities":["Levitate"]},{"role":"Bulky Support","movepool":["hiddenpowerfighting","psychic","thunderwave","toxic","uturn"],"abilities":["Levitate"]}]},"azelf":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["fireblast","nastyplot","psychic","signalbeam","thunderbolt","trick","uturn"],"abilities":["Levitate"],"preferredTypes":["Fire"]},{"role":"Wallbreaker","movepool":["explosion","fireblast","psychic","uturn"],"abilities":["Levitate"]}]},"dialga":{"level":70,"sets":[{"role":"Bulky Attacker","movepool":["aurasphere","dracometeor","fireblast","thunderbolt","thunderwave","toxic"],"abilities":["Pressure"],"preferredTypes":["Fire"]},{"role":"Bulky Support","movepool":["bulkup","outrage","rest","sleeptalk"],"abilities":["Pressure"]}]},"palkia":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","fireblast","hydropump","spacialrend","thunderwave"],"abilities":["Pressure"],"preferredTypes":["Fire"]}]},"heatran":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["earthpower","eruption","explosion","fireblast"],"abilities":["Flash Fire"]},{"role":"Bulky Attacker","movepool":["earthpower","explosion","fireblast","lavaplume","toxic"],"abilities":["Flash Fire"]},{"role":"Staller","movepool":["earthpower","fireblast","lavaplume","protect","substitute","toxic"],"abilities":["Flash Fire"]}]},"regigigas":{"level":83,"sets":[{"role":"Staller","movepool":["earthquake","return","substitute","thunderwave"],"abilities":["Slow Start"]}]},"giratinaorigin":{"level":70,"sets":[{"role":"Fast Attacker","movepool":["dracometeor","earthquake","outrage","shadowball","shadowsneak","willowisp"],"abilities":["Levitate"]}]},"giratina":{"level":68,"sets":[{"role":"Bulky Setup","movepool":["calmmind","dragonpulse","rest","sleeptalk"],"abilities":["Pressure"]}]},"cresselia":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerfighting","moonlight","psychic","signalbeam"],"abilities":["Levitate"]},{"role":"Bulky Support","movepool":["hiddenpowerfighting","moonlight","psychic","thunderwave","toxic"],"abilities":["Levitate"]}]},"phione":{"level":91,"sets":[{"role":"Staller","movepool":["raindance","rest","surf","toxic"],"abilities":["Hydration"]},{"role":"Bulky Support","movepool":["healbell","icebeam","surf","toxic","uturn"],"abilities":["Hydration"]}]},"manaphy":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["energyball","icebeam","surf","tailglow"],"abilities":["Hydration"]}]},"darkrai":{"level":68,"sets":[{"role":"Setup Sweeper","movepool":["darkpulse","darkvoid","focusblast","nastyplot"],"abilities":["Bad Dreams"]},{"role":"Bulky Setup","movepool":["darkpulse","darkvoid","nastyplot","substitute"],"abilities":["Bad Dreams"]}]},"shaymin":{"level":79,"sets":[{"role":"Fast Support","movepool":["airslash","earthpower","leechseed","seedflare","substitute","synthesis"],"abilities":["Natural Cure"],"preferredTypes":["Flying"]}]},"shayminsky":{"level":68,"sets":[{"role":"Fast Attacker","movepool":["airslash","earthpower","hiddenpowerice","leechseed","seedflare","substitute"],"abilities":["Serene Grace"]}]},"arceus":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","shadowclaw","swordsdance"],"abilities":["Multitype"],"preferredTypes":["Ground"]}]},"arceusbug":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"],"abilities":["Multitype"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment"],"abilities":["Multitype"]}]},"arceusdark":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","focusblast","judgment","recover","refresh"],"abilities":["Multitype"]}]},"arceusdragon":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","outrage","recover","swordsdance"],"abilities":["Multitype"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover","refresh"],"abilities":["Multitype"]}]},"arceuselectric":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","icebeam","judgment","recover"],"abilities":["Multitype"]}]},"arceusfighting":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","darkpulse","icebeam","judgment","recover"],"abilities":["Multitype"]}]},"arceusfire":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment","recover","thunderbolt"],"abilities":["Multitype"]}]},"arceusflying":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover","refresh"],"abilities":["Multitype"]}]},"arceusghost":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","focusblast","judgment","recover","willowisp"],"abilities":["Multitype"]}]},"arceusgrass":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","fireblast","judgment","recover"],"abilities":["Multitype"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment"],"abilities":["Multitype"]}]},"arceusground":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","stoneedge","swordsdance"],"abilities":["Multitype"],"preferredTypes":["Rock"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","judgment","recover"],"abilities":["Multitype"]}]},"arceusice":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover","thunderbolt"],"abilities":["Multitype"]}]},"arceuspoison":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","earthpower","fireblast","recover","sludgebomb"],"abilities":["Multitype"],"preferredTypes":["Ground"]}]},"arceuspsychic":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","darkpulse","focusblast","judgment","recover"],"abilities":["Multitype"],"preferredTypes":["Fighting"]}]},"arceusrock":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","stoneedge","swordsdance"],"abilities":["Multitype"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"],"abilities":["Multitype"]}]},"arceussteel":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","judgment","recover","toxic","willowisp"],"abilities":["Multitype"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover"],"abilities":["Multitype"]}]},"arceuswater":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","icebeam","judgment","recover","willowisp"],"abilities":["Multitype"]}]}} as any;
/* eslint-enable */

// Moves that restore HP:
const RECOVERY_MOVES = [
	'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'roost', 'slackoff', 'softboiled', 'synthesis',
];
// Moves that boost Attack:
const PHYSICAL_SETUP = [
	'bellydrum', 'bulkup', 'curse', 'dragondance', 'howl', 'meditate', 'screech', 'swordsdance',
];
// Conglomerate for ease of access
const SETUP = [
	'acidarmor', 'agility', 'bellydrum', 'bulkup', 'calmmind', 'curse', 'dragondance', 'growth', 'howl', 'irondefense',
	'meditate', 'nastyplot', 'raindance', 'rockpolish', 'sunnyday', 'swordsdance', 'tailglow',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'aquajet', 'bulletpunch', 'chatter', 'eruption', 'explosion', 'fakeout', 'focuspunch', 'futuresight', 'iceshard',
	'icywind', 'knockoff', 'machpunch', 'pluck', 'pursuit', 'quickattack', 'rapidspin', 'reversal', 'selfdestruct',
	'shadowsneak', 'skyattack', 'suckerpunch', 'uturn', 'vacuumwave', 'waterspout',
];
// Hazard-setting moves
const HAZARDS = [
	'spikes', 'stealthrock', 'toxicspikes',
];

// Moves that should be paired together when possible
const MOVE_PAIRS = [
	['lightscreen', 'reflect'],
	['sleeptalk', 'rest'],
	['protect', 'wish'],
	['leechseed', 'substitute'],
	['focuspunch', 'substitute'],
	['raindance', 'rest'],
];

/** Pokemon who always want priority STAB, and are fine with it as its only STAB move of that type */
const PRIORITY_POKEMON = [
	'cacturne', 'dusknoir', 'honchkrow', 'mamoswine', 'scizor', 'shedinja', 'shiftry',
];

export class RandomGen4Teams extends RandomGen5Teams {
	override randomSets: { [species: string]: RandomTeamsTypes.RandomSpeciesData } = randomSetsJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);
		this.noStab = NO_STAB;
		this.priorityPokemon = PRIORITY_POKEMON;

		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter) => (
				!counter.get('Bug') && movePool.includes('megahorn')
			),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
			Dragon: (movePool, moves, abilities, types, counter) => !counter.get('Dragon'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting'),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter, species) => !counter.get('Flying') && species.id !== 'aerodactyl',
			Ghost: (movePool, moves, abilities, types, counter) => !counter.get('Ghost'),
			Grass: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Grass') &&
				(species.baseStats.atk >= 100 || movePool.includes('leafstorm') || movePool.includes('solarbeam'))
			),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => !counter.get('Ice'),
			Poison: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Poison') && (['Ghost', 'Grass', 'Ground'].some(type => types.has(type)))
			),
			Psychic: (movePool, moves, abilities, types, counter) => (
				!counter.get('Psychic') && (types.has('Fighting') || movePool.includes('calmmind'))
			),
			Rock: (movePool, moves, abilities, types, counter, species) => (!counter.get('Rock') && species.baseStats.atk >= 80),
			Steel: (movePool, moves, abilities, types, counter, species) => (!counter.get('Steel') && species.id === 'metagross'),
			Water: (movePool, moves, abilities, types, counter) => !counter.get('Water'),
		};
		this.cachedStatusMoves = this.dex.moves.all()
			.filter(move => move.category === 'Status')
			.map(move => move.id);
	}

	override cullMovePool(
		types: Set<string>,
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
		if (teamDetails.screens && movePool.length >= this.maxMoveCount + 2) {
			if (movePool.includes('reflect')) this.fastPop(movePool, movePool.indexOf('reflect'));
			if (movePool.includes('lightscreen')) this.fastPop(movePool, movePool.indexOf('lightscreen'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.rapidSpin) {
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
		if (teamDetails.statusCure) {
			if (movePool.includes('aromatherapy')) this.fastPop(movePool, movePool.indexOf('aromatherapy'));
			if (movePool.includes('healbell')) this.fastPop(movePool, movePool.indexOf('healbell'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}

		// Develop additional move lists
		const badWithSetup = ['pursuit', 'toxic'];
		const statusMoves = this.cachedStatusMoves;

		// General incompatibilities
		const incompatiblePairs = [
			// These moves don't mesh well with other aspects of the set
			[statusMoves, ['healingwish', 'switcheroo', 'trick']],
			[SETUP, 'uturn'],
			[SETUP, HAZARDS],
			[SETUP, badWithSetup],
			[PHYSICAL_SETUP, PHYSICAL_SETUP],
			[['fakeout', 'uturn'], ['switcheroo', 'trick']],
			['substitute', 'uturn'],
			['rest', 'substitute'],
			['explosion', ['destinybond', 'painsplit', 'rest', 'trick']],

			// These attacks are redundant with each other
			['surf', 'hydropump'],
			[['bodyslam', 'return'], ['bodyslam', 'doubleedge']],
			[['energyball', 'leafstorm'], ['leafblade', 'leafstorm', 'powerwhip']],
			['lavaplume', ['fireblast', 'overheat']],
			['closecombat', 'drainpunch'],
			['discharge', 'thunderbolt'],
			['gunkshot', 'poisonjab'],
			['payback', 'pursuit'],
			['protect', 'swordsdance'],

			// Assorted hardcodes go here:
			// Manectric
			['flamethrower', 'overheat'],
			// Walrein
			['encore', 'roar'],
			// Smeargle
			['explosion', 'whirlwind'],
			// Seviper
			['switcheroo', 'suckerpunch'],
			// Jirachi
			['bodyslam', 'healingwish'],
			// Blaziken
			['agility', 'vacuumwave'],
		];

		for (const pair of incompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

		const statusInflictingMoves = ['hypnosis', 'stunspore', 'thunderwave', 'toxic', 'willowisp', 'yawn'];
		if (role !== 'Staller') {
			this.incompatibleMoves(moves, movePool, statusInflictingMoves, statusInflictingMoves);
		}
	}

	// Generate random moveset for a given species, role, preferred type.
	override randomMoveset(
		types: Set<string>,
		abilities: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		movePool: string[],
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): Set<string> {
		const moves = new Set<string>();
		let counter = this.queryMoves(moves, species, preferredType, abilities);
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
				movePool, moves, abilities, types, counter, species, teamDetails, isLead, false, preferredType, role
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
		if (movePool.includes('facade') && abilities.includes('Guts')) {
			counter = this.addMove('facade', moves, types, abilities, teamDetails, species, isLead,
				movePool, preferredType, role);
		}

		// Enforce Seismic Toss, Spore, and Volt Tackle
		for (const moveid of ['seismictoss', 'spore', 'volttackle']) {
			if (movePool.includes(moveid)) {
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce hazard removal on Bulky Support if the team doesn't already have it
		if (['Bulky Support'].includes(role) && !teamDetails.rapidSpin) {
			if (movePool.includes('rapidspin')) {
				counter = this.addMove('rapidspin', moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce STAB priority
		if (['Bulky Attacker', 'Bulky Setup'].includes(role) || this.priorityPokemon.includes(species.id)) {
			const priorityMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, preferredType);
				if (types.has(moveType) && move.priority > 0 && (move.basePower || move.basePowerCallback)) {
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
		if (!counter.get(preferredType)) {
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
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && types.has(moveType)) {
					stabMoves.push(moveid);
				}
			}
			if (stabMoves.length) {
				const moveid = this.sample(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			}
		}

		// Enforce one of Spikes or Toxic Spikes
		const hazardMoves = movePool.filter(moveid => ['spikes', 'toxicspikes'].includes(moveid));
		if (hazardMoves.length) {
			// Enforce Toxic Spikes if the team has Spikes already
			if (teamDetails.spikes && hazardMoves.includes('toxicspikes')) {
				counter = this.addMove('toxicspikes', moves, types, abilities, teamDetails, species, isLead,
					movePool, preferredType, role);
			} else {
				// Enforce one of the hazards
				const moveid = this.sample(hazardMoves);
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
		if (role.includes('Setup')) {
			const setupMoves = movePool.filter(moveid => SETUP.includes(moveid));
			if (setupMoves.length) {
				const moveid = this.sample(setupMoves);
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
		if (['Fast Attacker', 'Setup Sweeper', 'Bulky Attacker', 'Wallbreaker'].includes(role)) {
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
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
	): boolean {
		switch (ability) {
		case 'Chlorophyll': case 'Leaf Guard':
			return !teamDetails.sun;
		case 'Swift Swim':
			return !teamDetails.rain;
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Skill Link':
			return !counter.get('skilllink');
		}

		return false;
	}

	override getAbility(
		types: Set<string>,
		moves: Set<string>,
		abilities: string[],
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
	): string {
		if (abilities.length <= 1) return abilities[0];

		// Hard-code abilities here
		if (species.id === 'dewgong') return moves.has('raindance') ? 'Hydration' : 'Thick Fat';
		if (species.id === 'cloyster' && counter.get('skilllink')) return 'Skill Link';

		const abilityAllowed: string[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilities) {
			if (!this.shouldCullAbility(ability, types, moves, abilities, counter, teamDetails, species)) {
				abilityAllowed.push(ability);
			}
		}

		// Pick a random allowed ability
		if (abilityAllowed.length >= 1) return this.sample(abilityAllowed);

		// If all abilities are rejected, prioritize weather abilities over non-weather abilities
		if (!abilityAllowed.length) {
			const weatherAbilities = abilities.filter(a => ['Chlorophyll', 'Leaf Guard', 'Swift Swim'].includes(a));
			if (weatherAbilities.length) return this.sample(weatherAbilities);
		}

		// Pick a random ability
		return this.sample(abilities);
	}

	override getPriorityItem(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): string | undefined {
		if (species.requiredItems) return this.sample(species.requiredItems);
		if (species.id === 'latias' || species.id === 'latios') return 'Soul Dew';
		if (species.id === 'marowak') return 'Thick Club';
		if (species.id === 'pikachu') return 'Light Ball';
		if (species.id === 'shedinja' || species.id === 'smeargle') return 'Focus Sash';
		if (species.id === 'delibird' && moves.has('counter')) return 'Focus Sash';
		if (species.id === 'unown') return 'Choice Specs';
		if (species.id === 'wobbuffet') return 'Custap Berry';
		if (species.id === 'ditto') return this.sample(['Choice Scarf', 'Quick Powder', 'Sitrus Berry']);
		if (species.id === 'rampardos' && role === 'Fast Attacker') return 'Choice Scarf';
		if (species.id === 'honchkrow') return 'Life Orb';
		if (species.id === 'shuckle') return 'Leftovers';
		if (ability === 'Poison Heal' || moves.has('facade')) return 'Toxic Orb';
		if (ability === 'Speed Boost' && species.id === 'yanmega') return 'Life Orb';
		if (['healingwish', 'switcheroo', 'trick'].some(m => moves.has(m))) {
			if (
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && role !== 'Wallbreaker' && !counter.get('priority')
			) {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (moves.has('bellydrum')) return 'Sitrus Berry';
		if (moves.has('waterspout')) return 'Choice Scarf';
		if (ability === 'Magic Guard') return 'Life Orb';
		if (moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (moves.has('rest') && !moves.has('sleeptalk') && !['Natural Cure', 'Shed Skin'].includes(ability)) {
			return (moves.has('raindance') && ability === 'Hydration') ? 'Damp Rock' : 'Chesto Berry';
		}
		if (ability === 'Unburden') return 'Sitrus Berry';
		if (role === 'Staller') return 'Leftovers';
	}

	override getItem(
		ability: string,
		types: Set<string>,
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
			moves.has('pursuit') && moves.has('suckerpunch') && counter.get('Dark') &&
			(!this.priorityPokemon.includes(species.id) || counter.get('Dark') >= 2)
		) return 'Black Glasses';
		if (counter.get('Special') === 4) {
			return (
				scarfReqs && species.baseStats.spa >= 90 && this.randomChance(1, 2)
			) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (
			counter.get('Special') === 3 && role === 'Fast Attacker' && (moves.has('explosion') || moves.has('selfdestruct'))
		) return 'Choice Scarf';
		if (counter.get('Special') === 3 && moves.has('uturn')) return 'Choice Specs';
		if (counter.get('Physical') === 4 && species.id !== 'jirachi' &&
			['fakeout', 'rapidspin'].every(m => !moves.has(m))
		) {
			return (
				scarfReqs && (species.baseStats.atk >= 100 || ability === 'Pure Power' || ability === 'Huge Power') &&
				this.randomChance(1, 2)
			) ? 'Choice Scarf' : 'Choice Band';
		}

		if (types.has('Normal') && moves.has('fakeout') && !!counter.get('Normal')) return 'Silk Scarf';
		if (species.id === 'palkia') return 'Lustrous Orb';
		if (species.id === 'farfetchd') return 'Stick';
		if (moves.has('outrage') && counter.get('setup') && !moves.has('sleeptalk')) return 'Lum Berry';
		if (['protect', 'substitute'].some(m => moves.has(m))) return 'Leftovers';
		if (
			role === 'Fast Support' && isLead && defensiveStatTotal < 255 && !counter.get('recovery') &&
			(counter.get('hazards') || counter.get('setup')) && (!counter.get('recoil') || ability === 'Rock Head')
		) return 'Focus Sash';

		// Default Items
		if (role === 'Fast Support') {
			return (
				counter.get('Physical') + counter.get('Special') >= 3 &&
				['rapidspin', 'uturn'].every(m => !moves.has(m))
			) ? 'Life Orb' : 'Leftovers';
		}
		// noStab moves that should reject Expert Belt
		const noExpertBeltMoves = this.noStab.filter(
			moveid => ['Dragon', 'Normal', 'Poison'].includes(this.dex.moves.get(moveid).type)
		);
		const expertBeltReqs = (
			!counter.get('Dragon') && !counter.get('Normal') && !counter.get('Poison') &&
			noExpertBeltMoves.every(m => !moves.has(m))
		);
		if (!counter.get('Status') && expertBeltReqs && role === 'Fast Attacker') return 'Expert Belt';
		if (
			['Fast Attacker', 'Setup Sweeper', 'Wallbreaker'].some(m => role === m) && !moves.has('rapidspin')
		) return 'Life Orb';
		return 'Leftovers';
	}

	override randomSet(
		species: string | Species,
		teamDetails: RandomTeamsTypes.TeamDetails = {},
		isLead = false
	): RandomTeamsTypes.RandomSet {
		const ruleTable = this.dex.formats.getRuleTable(this.format);

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

		const evs = { hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85 };
		const ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };

		const types = new Set(species.types);
		const abilities = set.abilities!;

		// Get moves
		const moves = this.randomMoveset(types, abilities, teamDetails, species, isLead, movePool,
			preferredType, role);
		const counter = this.queryMoves(moves, species, preferredType, abilities);

		// Get ability
		ability = this.getAbility(new Set(types), moves, abilities, counter, teamDetails, species);

		// Get items
		item = this.getPriorityItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);
		if (item === undefined) {
			item = this.getItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);
		}

		// For Trick / Switcheroo
		if (item === 'Leftovers' && types.has('Poison')) {
			item = 'Black Sludge';
		}

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
			if (moves.has('substitute') && item === 'Sitrus Berry') {
				// Two Substitutes should activate Sitrus Berry
				if (hp % 4 === 0) break;
			} else if (moves.has('bellydrum') && item === 'Sitrus Berry') {
				// Belly Drum should activate Sitrus Berry
				if (hp % 2 === 0) break;
			} else {
				break;
			}
			evs.hp -= 4;
		}

		// Minimize confusion damage
		if (!counter.get('Physical') && !moves.has('transform') && !ruleTable.has('forceofthefallenmod')) {
			evs.atk = 0;
			ivs.atk = hasHiddenPower ? (ivs.atk || 31) - 28 : 0;
		}

		if (['gyroball', 'metalburst', 'trickroom'].some(m => moves.has(m))) {
			evs.spe = 0;
			ivs.spe = hasHiddenPower ? (ivs.spe || 31) - 28 : 0;
		}

		// shuffle moves to add more randomness to camomons
		const shuffledMoves = Array.from(moves);
		this.prng.shuffle(shuffledMoves);

		return {
			name: species.baseSpecies,
			species: forme,
			speciesId: species.id,
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

	/**
	 * Checks if the new species is compatible with the other mons currently on the team.
	 */
	override getPokemonCompatibility(
		species: Species,
		pokemon: RandomTeamsTypes.RandomSet[],
	): boolean {
		const incompatibilityList = [
			// These Pokemon are incompatible because the presence of one actively harms the other.
			// Prevent Dry Skin + sun setting ability
			[['parasect', 'toxicroak'], 'groudon'],
			// Prevent Shedinja + sand/hail setting ability
			['shedinja', ['tyranitar', 'hippowdon', 'abomasnow']],
		];

		for (const pair of incompatibilityList) {
			const monsArrayA = (Array.isArray(pair[0])) ? pair[0] : [pair[0]];
			const monsArrayB = (Array.isArray(pair[1])) ? pair[1] : [pair[1]];
			if (monsArrayB.includes(species.id)) {
				if (pokemon.some(m => monsArrayA.includes(m.speciesId!))) return false;
			}
			if (monsArrayA.includes(species.id)) {
				if (pokemon.some(m => monsArrayB.includes(m.speciesId!))) return false;
			}
		}

		return true;
	}
}

export default RandomGen4Teams;
