import {MoveCounter, OldRandomBattleSpecies} from './gen8';
import {RandomGen5Teams} from './gen5';
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
const randomSetsJSON = {"venusaur":{"level":83,"sets":[{"role":"Staller","movepool":["leechseed","powerwhip","sleeppowder","sludgebomb","substitute"]},{"role":"Bulky Attacker","movepool":["earthquake","leafstorm","sleeppowder","sludgebomb","synthesis"]}]},"charizard":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["airslash","dragonpulse","fireblast","hiddenpowergrass","roost"]}]},"blastoise":{"level":85,"sets":[{"role":"Spinner","movepool":["icebeam","rapidspin","rest","roar","surf","toxic"]},{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","surf","toxic"]}]},"butterfree":{"level":95,"sets":[{"role":"Bulky Support","movepool":["bugbuzz","sleeppowder","stunspore","uturn"]}]},"beedrill":{"level":97,"sets":[{"role":"Fast Support","movepool":["brickbreak","poisonjab","toxicspikes","uturn"]},{"role":"Fast Attacker","movepool":["brickbreak","poisonjab","swordsdance","uturn","xscissor"]}]},"pidgeot":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["bravebird","heatwave","return","roost"]},{"role":"Wallbreaker","movepool":["bravebird","doubleedge","pursuit","quickattack","return","roost","uturn"]}]},"raticate":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["crunch","facade","protect","suckerpunch","swordsdance","uturn"]}]},"fearow":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","drillpeck","pursuit","quickattack","return","uturn"]}]},"arbok":{"level":92,"sets":[{"role":"Fast Attacker","movepool":["crunch","earthquake","glare","gunkshot","poisonjab","seedbomb","switcheroo"],"preferredTypes":["Ground"]}]},"pikachu":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["fakeout","grassknot","hiddenpowerice","surf","thunderbolt","volttackle"],"preferredTypes":["Ice"]}]},"raichu":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["encore","focusblast","grassknot","hiddenpowerice","nastyplot","surf","thunderbolt"]}]},"sandslash":{"level":90,"sets":[{"role":"Spinner","movepool":["earthquake","nightslash","rapidspin","stealthrock","stoneedge","toxic"]},{"role":"Bulky Setup","movepool":["earthquake","nightslash","stoneedge","substitute","swordsdance","xscissor"],"preferredTypes":["Rock"]}]},"nidoqueen":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","fireblast","icebeam","roar","stealthrock","toxicspikes"],"preferredTypes":["Ice"]}]},"nidoking":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["earthquake","fireblast","icebeam","megahorn","stealthrock","suckerpunch","thunderbolt"],"preferredTypes":["Ice"]}]},"clefable":{"level":84,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","doubleedge","fireblast","icebeam","softboiled","stealthrock","thunderwave"]},{"role":"Setup Sweeper","movepool":["calmmind","icebeam","softboiled","thunderbolt"]}]},"ninetales":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["energyball","fireblast","hiddenpowerrock","hypnosis","nastyplot"],"preferredTypes":["Grass"]}]},"wigglytuff":{"level":97,"sets":[{"role":"Bulky Support","movepool":["bodyslam","doubleedge","fireblast","healbell","protect","stealthrock","thunderwave","toxic","wish"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"]}]},"vileplume":{"level":88,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","energyball","hiddenpowerground","sleeppowder","sludgebomb","synthesis"]},{"role":"Setup Sweeper","movepool":["hiddenpowerfire","sludgebomb","solarbeam","sunnyday","synthesis"]}]},"parasect":{"level":97,"sets":[{"role":"Bulky Support","movepool":["aromatherapy","seedbomb","spore","stunspore","synthesis","xscissor"]},{"role":"Bulky Attacker","movepool":["pursuit","seedbomb","spore","swordsdance","xscissor"]}]},"venomoth":{"level":86,"sets":[{"role":"Fast Support","movepool":["bugbuzz","roost","sleeppowder","toxicspikes","uturn"]}]},"dugtrio":{"level":84,"sets":[{"role":"Fast Support","movepool":["earthquake","nightslash","stealthrock","stoneedge","suckerpunch"],"preferredTypes":["Rock"]}]},"persian":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["bite","doubleedge","fakeout","hypnosis","return","seedbomb","taunt","uturn"],"preferredTypes":["Dark"]}]},"golduck":{"level":87,"sets":[{"role":"Fast Attacker","movepool":["calmmind","encore","focusblast","hiddenpowergrass","hydropump","icebeam","psychic","surf"],"preferredTypes":["Ice"]}]},"primeape":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","encore","stoneedge","uturn"],"preferredTypes":["Rock"]}]},"arcanine":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["extremespeed","flareblitz","hiddenpowergrass","morningsun","roar","thunderfang","toxic","willowisp"],"preferredTypes":["Normal"]},{"role":"Fast Attacker","movepool":["crunch","extremespeed","flareblitz","ironhead","morningsun","thunderfang"],"preferredTypes":["Normal"]}]},"poliwrath":{"level":88,"sets":[{"role":"Bulky Setup","movepool":["brickbreak","bulkup","icepunch","waterfall"]},{"role":"Fast Support","movepool":["encore","focuspunch","icepunch","substitute","waterfall"]},{"role":"Bulky Support","movepool":["bulkup","rest","sleeptalk","toxic","waterfall"]}]},"alakazam":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["calmmind","encore","focusblast","psychic","shadowball","substitute","trick"],"preferredTypes":["Fighting"]}]},"machamp":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["bulkup","bulletpunch","dynamicpunch","payback","stoneedge"]}]},"victreebel":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerground","leafblade","leafstorm","sleeppowder","sludgebomb","suckerpunch"]},{"role":"Setup Sweeper","movepool":["sludgebomb","solarbeam","sunnyday","weatherball"]}]},"tentacruel":{"level":81,"sets":[{"role":"Bulky Support","movepool":["haze","hydropump","icebeam","rapidspin","sludgebomb","surf","toxicspikes"]}]},"golem":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","stealthrock","stoneedge","suckerpunch","toxic"]}]},"rapidash":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["flareblitz","hypnosis","megahorn","morningsun","willowisp"]}]},"slowbro":{"level":85,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","icebeam","psychic","slackoff","surf","thunderwave","toxic"],"preferredTypes":["Psychic"]},{"role":"Bulky Setup","movepool":["calmmind","psychic","slackoff","surf"]}]},"farfetchd":{"level":100,"sets":[{"role":"Fast Attacker","movepool":["heatwave","leafblade","nightslash","return","uturn"]},{"role":"Setup Sweeper","movepool":["batonpass","leafblade","nightslash","return","swordsdance"]}]},"dodrio":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["bravebird","pursuit","quickattack","return","roost"]}]},"dewgong":{"level":91,"sets":[{"role":"Staller","movepool":["icebeam","protect","surf","toxic"]},{"role":"Fast Attacker","movepool":["raindance","rest","surf","toxic"]},{"role":"Bulky Support","movepool":["encore","icebeam","raindance","rest","surf","toxic"]}]},"muk":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["brickbreak","curse","explosion","gunkshot","icepunch","payback","poisonjab","rest","shadowsneak"],"preferredTypes":["Fighting"]}]},"cloyster":{"level":88,"sets":[{"role":"Bulky Support","movepool":["explosion","iceshard","rapidspin","rockblast","spikes","surf","toxicspikes"]}]},"gengar":{"level":77,"sets":[{"role":"Wallbreaker","movepool":["explosion","focusblast","painsplit","shadowball","sludgebomb","substitute","trick","willowisp"],"preferredTypes":["Fighting"]}]},"hypno":{"level":91,"sets":[{"role":"Bulky Support","movepool":["protect","psychic","thunderwave","toxic","wish"]},{"role":"Staller","movepool":["protect","seismictoss","toxic","wish"]}]},"kingler":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["crabhammer","return","superpower","swordsdance","xscissor"]},{"role":"Bulky Setup","movepool":["agility","crabhammer","return","swordsdance"]}]},"electrode":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["explosion","hiddenpowerice","signalbeam","taunt","thunderbolt"],"preferredTypes":["Ice"]}]},"exeggutor":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["explosion","hiddenpowerfire","leafstorm","psychic","sleeppowder","synthesis"],"preferredTypes":["Psychic"]}]},"marowak":{"level":89,"sets":[{"role":"Wallbreaker","movepool":["doubleedge","earthquake","firepunch","stealthrock","stoneedge","swordsdance"],"preferredTypes":["Rock"]}]},"hitmonlee":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","machpunch","rapidspin","stoneedge","suckerpunch"],"preferredTypes":["Rock"]},{"role":"Setup Sweeper","movepool":["bulkup","closecombat","earthquake","machpunch","stoneedge","suckerpunch"],"preferredTypes":["Rock"]}]},"hitmonchan":{"level":87,"sets":[{"role":"Spinner","movepool":["closecombat","drainpunch","icepunch","machpunch","rapidspin","stoneedge"]},{"role":"Bulky Attacker","movepool":["bulkup","closecombat","drainpunch","icepunch","machpunch","stoneedge"]}]},"weezing":{"level":89,"sets":[{"role":"Bulky Support","movepool":["fireblast","haze","painsplit","sludgebomb","willowisp"]},{"role":"Bulky Attacker","movepool":["fireblast","rest","sleeptalk","sludgebomb"]}]},"kangaskhan":{"level":84,"sets":[{"role":"Bulky Support","movepool":["doubleedge","earthquake","fakeout","hammerarm","return","suckerpunch"]},{"role":"Bulky Attacker","movepool":["bodyslam","earthquake","protect","return","wish"]}]},"seaking":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["icebeam","megahorn","raindance","return","waterfall"]}]},"starmie":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["hydropump","icebeam","psychic","recover","thunderbolt"]},{"role":"Bulky Support","movepool":["icebeam","psychic","rapidspin","recover","surf","thunderwave"]}]},"mrmime":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","encore","focusblast","nastyplot","psychic","shadowball","substitute"],"preferredTypes":["Fighting"]}]},"scyther":{"level":82,"sets":[{"role":"Setup Sweeper","movepool":["aerialace","brickbreak","bugbite","roost","swordsdance"]},{"role":"Wallbreaker","movepool":["aerialace","brickbreak","pursuit","uturn"]}]},"jynx":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["focusblast","icebeam","lovelykiss","psychic","trick"]},{"role":"Setup Sweeper","movepool":["focusblast","icebeam","lovelykiss","nastyplot","psychic","substitute"]}]},"pinsir":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["closecombat","earthquake","stealthrock","stoneedge","swordsdance","xscissor"],"preferredTypes":["Rock"]}]},"tauros":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","earthquake","payback","pursuit","return","stoneedge"]}]},"gyarados":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","stoneedge","substitute","waterfall"]},{"role":"Bulky Setup","movepool":["dragondance","rest","sleeptalk","waterfall"]}]},"lapras":{"level":85,"sets":[{"role":"Bulky Support","movepool":["healbell","hydropump","icebeam","thunderbolt","toxic"]},{"role":"Staller","movepool":["hydropump","icebeam","protect","toxic"]}]},"ditto":{"level":100,"sets":[{"role":"Fast Support","movepool":["transform"]}]},"vaporeon":{"level":83,"sets":[{"role":"Bulky Support","movepool":["healbell","icebeam","protect","surf","wish"]},{"role":"Staller","movepool":["protect","surf","toxic","wish"]}]},"jolteon":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["batonpass","hiddenpowerice","substitute","thunderbolt","toxic"]},{"role":"Fast Attacker","movepool":["hiddenpowerice","shadowball","signalbeam","thunderbolt"]}]},"flareon":{"level":93,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","hiddenpowergrass","lavaplume","protect","superpower","wish"]},{"role":"Staller","movepool":["fireblast","lavaplume","protect","toxic","wish"]}]},"omastar":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","raindance"]},{"role":"Bulky Support","movepool":["earthpower","icebeam","spikes","stealthrock","surf","toxicspikes"],"preferredTypes":["Ice"]}]},"kabutops":{"level":84,"sets":[{"role":"Spinner","movepool":["aquajet","rapidspin","stealthrock","stoneedge","superpower","waterfall"]},{"role":"Fast Attacker","movepool":["aquajet","stealthrock","stoneedge","superpower","swordsdance","waterfall"]}]},"aerodactyl":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","roost","stealthrock","stoneedge","taunt","toxic"]},{"role":"Fast Support","movepool":["aquatail","doubleedge","earthquake","pursuit","roost","stealthrock","stoneedge"],"preferredTypes":["Ground"]}]},"snorlax":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["bodyslam","crunch","earthquake","pursuit","return","selfdestruct"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["bodyslam","curse","rest","sleeptalk"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","earthquake","rest"]}]},"articuno":{"level":82,"sets":[{"role":"Staller","movepool":["healbell","icebeam","roost","substitute","toxic"]}]},"zapdos":{"level":77,"sets":[{"role":"Bulky Support","movepool":["heatwave","hiddenpowerice","roost","substitute","thunderbolt","toxic","uturn"]},{"role":"Fast Attacker","movepool":["heatwave","hiddenpowerice","roost","thunderbolt","uturn"]}]},"moltres":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["airslash","fireblast","hiddenpowergrass","roost","substitute","toxic","uturn"]}]},"dragonite":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["dragondance","earthquake","extremespeed","firepunch","outrage"]},{"role":"Bulky Setup","movepool":["dragonclaw","dragondance","earthquake","firepunch","roost"]}]},"mewtwo":{"level":70,"sets":[{"role":"Setup Sweeper","movepool":["aurasphere","calmmind","fireblast","psychic","recover","shadowball"]}]},"mew":{"level":76,"sets":[{"role":"Bulky Support","movepool":["psychic","softboiled","stealthrock","taunt","uturn","willowisp"]},{"role":"Setup Sweeper","movepool":["aurasphere","batonpass","earthpower","fireblast","nastyplot","psychic","softboiled"]},{"role":"Bulky Setup","movepool":["batonpass","earthquake","explosion","suckerpunch","superpower","swordsdance","zenheadbutt"],"preferredTypes":["Ground"]}]},"meganium":{"level":91,"sets":[{"role":"Staller","movepool":["aromatherapy","earthquake","energyball","leechseed","synthesis","toxic"]}]},"typhlosion":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["eruption","fireblast","focusblast","hiddenpowergrass","hiddenpowerrock"]}]},"feraligatr":{"level":83,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","icepunch","return","waterfall"],"preferredTypes":["Ice"]},{"role":"Fast Attacker","movepool":["aquajet","earthquake","icepunch","return","swordsdance","waterfall"]}]},"furret":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["aquatail","doubleedge","firepunch","shadowclaw","trick","uturn"]}]},"noctowl":{"level":97,"sets":[{"role":"Staller","movepool":["airslash","nightshade","roost","toxic","whirlwind"]}]},"ledian":{"level":100,"sets":[{"role":"Staller","movepool":["encore","focusblast","hiddenpowerflying","knockoff","roost","toxic"]},{"role":"Fast Support","movepool":["agility","batonpass","encore","swordsdance"]}]},"ariados":{"level":98,"sets":[{"role":"Bulky Support","movepool":["bugbite","poisonjab","suckerpunch","toxicspikes"]}]},"crobat":{"level":82,"sets":[{"role":"Bulky Support","movepool":["bravebird","heatwave","roost","superfang","taunt","toxic","uturn"]}]},"lanturn":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["discharge","healbell","hydropump","icebeam","surf","thunderbolt","thunderwave","toxic"]}]},"xatu":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["calmmind","grassknot","heatwave","hiddenpowerfighting","psychic","roost","trick","uturn"],"preferredTypes":["Fire"]},{"role":"Bulky Support","movepool":["heatwave","hiddenpowerfighting","psychic","roost","thunderwave","toxic"]}]},"ampharos":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["discharge","focusblast","healbell","hiddenpowerice","signalbeam","thunderbolt","toxic"]}]},"bellossom":{"level":90,"sets":[{"role":"Bulky Support","movepool":["energyball","hiddenpowerfire","hiddenpowerrock","leafstorm","sleeppowder","stunspore","synthesis"]}]},"azumarill":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["aquajet","doubleedge","icepunch","superpower","waterfall"]},{"role":"Bulky Setup","movepool":["aquajet","bellydrum","return","waterfall"]}]},"sudowoodo":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","stealthrock","stoneedge","suckerpunch","toxic","woodhammer"]}]},"politoed":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["encore","focusblast","hiddenpowergrass","hydropump","icebeam","rest","surf","toxic"],"preferredTypes":["Ice"]},{"role":"Staller","movepool":["encore","icebeam","protect","surf","toxic"]}]},"jumpluff":{"level":91,"sets":[{"role":"Bulky Support","movepool":["encore","energyball","sleeppowder","stunspore","toxic","uturn"]},{"role":"Fast Support","movepool":["hiddenpowerflying","leechseed","protect","substitute","toxic"]}]},"sunflora":{"level":96,"sets":[{"role":"Wallbreaker","movepool":["earthpower","hiddenpowerfire","hiddenpowerice","hiddenpowerrock","leafstorm","sludgebomb"]}]},"quagsire":{"level":90,"sets":[{"role":"Bulky Support","movepool":["earthquake","encore","icebeam","recover","toxic","waterfall"]}]},"espeon":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["calmmind","hiddenpowerfire","morningsun","psychic","signalbeam","trick"]},{"role":"Setup Sweeper","movepool":["batonpass","calmmind","hiddenpowerfire","morningsun","psychic","substitute"]}]},"umbreon":{"level":85,"sets":[{"role":"Staller","movepool":["healbell","moonlight","payback","toxic"]},{"role":"Bulky Support","movepool":["curse","payback","protect","toxic","wish"]}]},"slowking":{"level":88,"sets":[{"role":"Bulky Support","movepool":["fireblast","icebeam","psychic","slackoff","surf","thunderwave","toxic"],"preferredTypes":["Psychic"]},{"role":"Wallbreaker","movepool":["fireblast","icebeam","psychic","slackoff","surf","trick","trickroom"],"preferredTypes":["Psychic"]}]},"unown":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerfighting","hiddenpowerpsychic"]}]},"wobbuffet":{"level":83,"sets":[{"role":"Bulky Support","movepool":["counter","destinybond","encore","mirrorcoat"]}]},"girafarig":{"level":92,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","calmmind","hiddenpowerfighting","psychic","substitute","thunderbolt"]}]},"forretress":{"level":79,"sets":[{"role":"Bulky Support","movepool":["explosion","payback","rapidspin","spikes","stealthrock","toxicspikes"]}]},"dunsparce":{"level":92,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headbutt","roost","thunderwave"]},{"role":"Bulky Support","movepool":["bite","bodyslam","earthquake","roost","stealthrock"],"preferredTypes":["Dark"]}]},"steelix":{"level":84,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","ironhead","roar","stealthrock","stoneedge","toxic"]}]},"granbull":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["closecombat","crunch","healbell","return","thunderwave"]}]},"qwilfish":{"level":85,"sets":[{"role":"Fast Support","movepool":["destinybond","explosion","spikes","thunderwave","toxicspikes","waterfall"]}]},"scizor":{"level":78,"sets":[{"role":"Setup Sweeper","movepool":["bugbite","bulletpunch","roost","superpower","swordsdance"]},{"role":"Fast Attacker","movepool":["bulletpunch","pursuit","superpower","uturn"]}]},"shuckle":{"level":93,"sets":[{"role":"Staller","movepool":["encore","knockoff","rest","stealthrock","toxic"]}]},"heracross":{"level":80,"sets":[{"role":"Wallbreaker","movepool":["closecombat","facade","megahorn","nightslash"]},{"role":"Fast Attacker","movepool":["closecombat","earthquake","megahorn","nightslash","stoneedge","swordsdance"]}]},"ursaring":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["closecombat","crunch","facade","protect","swordsdance"]}]},"magcargo":{"level":95,"sets":[{"role":"Staller","movepool":["hiddenpowerrock","lavaplume","recover","stealthrock","toxic"]}]},"corsola":{"level":96,"sets":[{"role":"Bulky Support","movepool":["explosion","powergem","recover","stealthrock","surf","toxic"]}]},"octillery":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["energyball","fireblast","icebeam","surf","thunderwave"]}]},"delibird":{"level":100,"sets":[{"role":"Bulky Support","movepool":["icebeam","iceshard","rapidspin","seismictoss","toxic"]}]},"mantine":{"level":90,"sets":[{"role":"Bulky Support","movepool":["hiddenpowerflying","rest","sleeptalk","surf","toxic"]}]},"skarmory":{"level":77,"sets":[{"role":"Bulky Support","movepool":["bravebird","roost","spikes","stealthrock","whirlwind"]},{"role":"Staller","movepool":["bravebird","roost","spikes","stealthrock","toxic"]}]},"houndoom":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","fireblast","hiddenpowergrass","nastyplot","suckerpunch"]}]},"kingdra":{"level":80,"sets":[{"role":"Bulky Setup","movepool":["dragondance","outrage","rest","substitute","waterfall"]},{"role":"Setup Sweeper","movepool":["dracometeor","hydropump","icebeam","raindance","waterfall"]},{"role":"Bulky Support","movepool":["dragondance","outrage","rest","sleeptalk"]}]},"donphan":{"level":84,"sets":[{"role":"Spinner","movepool":["earthquake","iceshard","rapidspin","stealthrock","stoneedge","toxic"],"preferredTypes":["Rock"]},{"role":"Bulky Attacker","movepool":["earthquake","gunkshot","iceshard","stealthrock","stoneedge"],"preferredTypes":["Rock"]}]},"porygon2":{"level":86,"sets":[{"role":"Bulky Support","movepool":["discharge","icebeam","recover","toxic","triattack"]}]},"stantler":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["earthquake","hypnosis","megahorn","return","suckerpunch","thunderbolt"],"preferredTypes":["Ground"]}]},"smeargle":{"level":86,"sets":[{"role":"Fast Support","movepool":["explosion","spikes","spore","stealthrock","whirlwind"]}]},"hitmontop":{"level":86,"sets":[{"role":"Bulky Support","movepool":["closecombat","earthquake","rapidspin","stoneedge","suckerpunch","toxic"]}]},"miltank":{"level":82,"sets":[{"role":"Bulky Support","movepool":["bodyslam","earthquake","healbell","milkdrink","stealthrock","toxic"]},{"role":"Bulky Setup","movepool":["bodyslam","curse","earthquake","milkdrink"]}]},"blissey":{"level":81,"sets":[{"role":"Staller","movepool":["aromatherapy","seismictoss","softboiled","stealthrock","thunderwave","toxic"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"]}]},"raikou":{"level":76,"sets":[{"role":"Fast Attacker","movepool":["aurasphere","hiddenpowerice","shadowball","thunderbolt"]},{"role":"Bulky Setup","movepool":["aurasphere","calmmind","hiddenpowerice","substitute","thunderbolt"],"preferredTypes":["Ice"]}]},"entei":{"level":81,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","flareblitz","ironhead","stoneedge"]},{"role":"Fast Attacker","movepool":["extremespeed","flareblitz","hiddenpowergrass","stoneedge"]}]},"suicune":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","rest","sleeptalk","surf"]},{"role":"Bulky Setup","movepool":["calmmind","hydropump","icebeam","rest","substitute","surf"]}]},"tyranitar":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["crunch","earthquake","fireblast","icebeam","pursuit","stealthrock","stoneedge","superpower"]},{"role":"Bulky Setup","movepool":["crunch","dragondance","earthquake","firepunch","icepunch","stoneedge"]}]},"lugia":{"level":73,"sets":[{"role":"Staller","movepool":["aeroblast","earthquake","roost","substitute","toxic","whirlwind"]},{"role":"Bulky Setup","movepool":["aeroblast","calmmind","earthpower","roost"]}]},"hooh":{"level":73,"sets":[{"role":"Bulky Attacker","movepool":["bravebird","earthquake","roost","sacredfire","substitute","toxic"]}]},"celebi":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["earthpower","energyball","hiddenpowerfire","leafstorm","nastyplot","psychic","uturn"],"preferredTypes":["Psychic"]},{"role":"Bulky Support","movepool":["leafstorm","psychic","recover","stealthrock","thunderwave","uturn"]},{"role":"Setup Sweeper","movepool":["batonpass","energyball","nastyplot","psychic","recover"]}]},"sceptile":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["earthquake","focusblast","hiddenpowerfire","hiddenpowerice","leafstorm","rockslide"]},{"role":"Staller","movepool":["energyball","hiddenpowerfire","hiddenpowerice","leechseed","substitute"]}]},"blaziken":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["agility","fireblast","stoneedge","superpower","thunderpunch","vacuumwave"]},{"role":"Wallbreaker","movepool":["flareblitz","stoneedge","superpower","swordsdance","thunderpunch"]}]},"swampert":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icebeam","roar","stealthrock","toxic","waterfall"]},{"role":"Staller","movepool":["earthquake","protect","toxic","waterfall"]},{"role":"Fast Attacker","movepool":["earthquake","icepunch","stoneedge","waterfall"]}]},"mightyena":{"level":93,"sets":[{"role":"Bulky Support","movepool":["crunch","doubleedge","firefang","suckerpunch","superfang","taunt","toxic"]}]},"linoone":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["bellydrum","extremespeed","seedbomb","shadowclaw"]}]},"beautifly":{"level":97,"sets":[{"role":"Fast Attacker","movepool":["bugbuzz","hiddenpowerground","psychic","uturn"]}]},"dustox":{"level":100,"sets":[{"role":"Staller","movepool":["bugbuzz","hiddenpowerground","roost","toxic","uturn","whirlwind"]}]},"ludicolo":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["energyball","hydropump","icebeam","raindance"]},{"role":"Wallbreaker","movepool":["energyball","hydropump","icebeam","surf"]}]},"shiftry":{"level":88,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","explosion","hiddenpowerfire","leafstorm","lowkick","suckerpunch"]},{"role":"Setup Sweeper","movepool":["lowkick","seedbomb","suckerpunch","swordsdance"]}]},"swellow":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["bravebird","facade","protect","quickattack","uturn"]}]},"pelipper":{"level":90,"sets":[{"role":"Bulky Attacker","movepool":["airslash","hiddenpowergrass","hydropump","icebeam","roost","surf","toxic","uturn"]}]},"gardevoir":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["focusblast","healingwish","psychic","shadowball","thunderbolt","trick"],"preferredTypes":["Fighting"]},{"role":"Setup Sweeper","movepool":["calmmind","focusblast","psychic","shadowball","substitute","willowisp"],"preferredTypes":["Fighting"]}]},"masquerain":{"level":97,"sets":[{"role":"Setup Sweeper","movepool":["agility","airslash","batonpass","bugbuzz","hydropump","roost"]},{"role":"Bulky Support","movepool":["airslash","bugbuzz","hydropump","roost","stunspore","toxic"]}]},"breloom":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["facade","machpunch","seedbomb","spore","stoneedge","superpower","swordsdance"]},{"role":"Bulky Attacker","movepool":["focuspunch","spore","stoneedge","substitute"]}]},"vigoroth":{"level":89,"sets":[{"role":"Bulky Attacker","movepool":["bodyslam","earthquake","encore","nightslash","return","slackoff","suckerpunch"]},{"role":"Bulky Setup","movepool":["bodyslam","bulkup","earthquake","nightslash","return","slackoff"]},{"role":"Setup Sweeper","movepool":["bodyslam","bulkup","earthquake","nightslash","return","suckerpunch"]}]},"slaking":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["doubleedge","earthquake","gigaimpact","nightslash","return"]}]},"ninjask":{"level":86,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","substitute","swordsdance","xscissor"]},{"role":"Bulky Setup","movepool":["batonpass","protect","swordsdance","xscissor"]}]},"shedinja":{"level":96,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","shadowclaw","shadowsneak","swordsdance","willowisp","xscissor"]}]},"exploud":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["crunch","earthquake","fireblast","icebeam","return","surf"]}]},"hariyama":{"level":84,"sets":[{"role":"Wallbreaker","movepool":["bulletpunch","closecombat","facade","fakeout","payback","stoneedge"],"preferredTypes":["Dark"]},{"role":"Bulky Attacker","movepool":["bulkup","bulletpunch","closecombat","payback","stoneedge"]}]},"delcatty":{"level":100,"sets":[{"role":"Bulky Support","movepool":["healbell","protect","return","thunderwave","wish"]},{"role":"Fast Support","movepool":["doubleedge","fakeout","healbell","suckerpunch","thunderwave","toxic"]}]},"sableye":{"level":99,"sets":[{"role":"Bulky Attacker","movepool":["payback","recover","seismictoss","toxic","willowisp"]}]},"mawile":{"level":97,"sets":[{"role":"Bulky Setup","movepool":["batonpass","ironhead","substitute","suckerpunch","swordsdance"]},{"role":"Bulky Attacker","movepool":["focuspunch","ironhead","substitute","suckerpunch"]}]},"aggron":{"level":86,"sets":[{"role":"Wallbreaker","movepool":["aquatail","earthquake","headsmash","icepunch","rockpolish","stealthrock"],"preferredTypes":["Ground"]}]},"medicham":{"level":86,"sets":[{"role":"Fast Attacker","movepool":["bulletpunch","highjumpkick","icepunch","trick","zenheadbutt"]}]},"manectric":{"level":83,"sets":[{"role":"Wallbreaker","movepool":["flamethrower","hiddenpowerice","overheat","switcheroo","thunderbolt"]}]},"plusle":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["batonpass","encore","hiddenpowerice","nastyplot","thunderbolt"]}]},"minun":{"level":90,"sets":[{"role":"Bulky Setup","movepool":["batonpass","encore","hiddenpowerice","nastyplot","thunderbolt"]}]},"volbeat":{"level":98,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","bugbuzz","substitute","tailglow"]},{"role":"Bulky Support","movepool":["batonpass","bugbuzz","encore","tailglow"]},{"role":"Bulky Setup","movepool":["batonpass","bugbuzz","roost","tailglow"]}]},"illumise":{"level":92,"sets":[{"role":"Bulky Support","movepool":["bugbuzz","encore","roost","thunderwave","toxic","uturn"]}]},"swalot":{"level":91,"sets":[{"role":"Bulky Support","movepool":["earthquake","encore","explosion","icebeam","painsplit","sludgebomb","toxic","yawn"]},{"role":"Staller","movepool":["earthquake","protect","sludgebomb","toxic"]}]},"sharpedo":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["aquajet","crunch","earthquake","hydropump","icebeam"]},{"role":"Fast Attacker","movepool":["aquajet","crunch","earthquake","icebeam","waterfall"]}]},"wailord":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowergrass","hydropump","icebeam","selfdestruct","surf","waterspout"],"preferredTypes":["Ice"]}]},"camerupt":{"level":89,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","lavaplume","stealthrock","toxic"]},{"role":"Setup Sweeper","movepool":["earthquake","explosion","fireblast","rockpolish","stoneedge"]}]},"torkoal":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","lavaplume","rapidspin","stealthrock","yawn"]}]},"grumpig":{"level":88,"sets":[{"role":"Bulky Support","movepool":["focusblast","healbell","psychic","thunderwave","toxic"]},{"role":"Bulky Attacker","movepool":["calmmind","focusblast","psychic","shadowball","trick"]}]},"spinda":{"level":100,"sets":[{"role":"Staller","movepool":["bodyslam","encore","shadowball","teeterdance","toxic"]},{"role":"Bulky Support","movepool":["protect","seismictoss","toxic","wish"]},{"role":"Bulky Attacker","movepool":["doubleedge","fakeout","lowkick","shadowball","suckerpunch"],"preferredTypes":["Fighting"]}]},"flygon":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["earthquake","fireblast","outrage","roost","stoneedge","uturn"]},{"role":"Bulky Attacker","movepool":["dracometeor","earthquake","fireblast","roost","uturn"]}]},"cacturne":{"level":90,"sets":[{"role":"Wallbreaker","movepool":["darkpulse","encore","lowkick","seedbomb","spikes","suckerpunch"]},{"role":"Setup Sweeper","movepool":["lowkick","seedbomb","suckerpunch","swordsdance"]},{"role":"Bulky Attacker","movepool":["focuspunch","seedbomb","substitute","suckerpunch"]}]},"altaria":{"level":87,"sets":[{"role":"Bulky Setup","movepool":["dragondance","earthquake","outrage","roost"]},{"role":"Bulky Attacker","movepool":["dracometeor","earthquake","fireblast","haze","healbell","roost","toxic"]}]},"zangoose":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["closecombat","nightslash","quickattack","return","swordsdance"],"preferredTypes":["Dark"]}]},"seviper":{"level":92,"sets":[{"role":"Fast Attacker","movepool":["aquatail","darkpulse","earthquake","flamethrower","sludgebomb","suckerpunch","switcheroo"],"preferredTypes":["Ground"]}]},"lunatone":{"level":93,"sets":[{"role":"Bulky Setup","movepool":["batonpass","calmmind","earthpower","psychic","shadowball","substitute"]},{"role":"Bulky Support","movepool":["earthpower","explosion","psychic","stealthrock","toxic"]}]},"solrock":{"level":90,"sets":[{"role":"Fast Attacker","movepool":["earthquake","explosion","rockpolish","stealthrock","stoneedge","zenheadbutt"],"preferredTypes":["Ground"]}]},"whiscash":{"level":87,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","stoneedge","waterfall"]}]},"crawdaunt":{"level":88,"sets":[{"role":"Fast Attacker","movepool":["crunch","dragondance","superpower","waterfall","xscissor"]}]},"claydol":{"level":84,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","icebeam","psychic","rapidspin","stealthrock","toxic"]}]},"cradily":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["recover","seedbomb","stealthrock","stoneedge","toxic"]},{"role":"Bulky Setup","movepool":["curse","recover","seedbomb","stoneedge","swordsdance"]}]},"armaldo":{"level":87,"sets":[{"role":"Spinner","movepool":["earthquake","rapidspin","stealthrock","stoneedge","toxic","xscissor"]},{"role":"Bulky Attacker","movepool":["aquatail","earthquake","rockpolish","stealthrock","stoneedge","swordsdance","xscissor"]}]},"milotic":{"level":81,"sets":[{"role":"Staller","movepool":["haze","icebeam","recover","surf","toxic"]},{"role":"Bulky Support","movepool":["icebeam","rest","sleeptalk","surf","toxic"]}]},"castform":{"level":98,"sets":[{"role":"Bulky Attacker","movepool":["fireblast","icebeam","return","thunderbolt","thunderwave"]}]},"kecleon":{"level":91,"sets":[{"role":"Bulky Support","movepool":["recover","return","stealthrock","thunderwave","toxic"]}]},"banette":{"level":93,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerfighting","shadowclaw","shadowsneak","thunderwave","willowisp"]}]},"tropius":{"level":95,"sets":[{"role":"Staller","movepool":["airslash","earthquake","leechseed","roost","toxic"]},{"role":"Setup Sweeper","movepool":["aerialace","dragondance","earthquake","leafblade","roost"],"preferredTypes":["Ground"]}]},"chimecho":{"level":93,"sets":[{"role":"Bulky Support","movepool":["healbell","hiddenpowerfighting","psychic","recover","thunderwave","toxic"]},{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerfighting","psychic","recover","signalbeam"]}]},"absol":{"level":85,"sets":[{"role":"Wallbreaker","movepool":["nightslash","psychocut","pursuit","suckerpunch","superpower","swordsdance"],"preferredTypes":["Fighting"]}]},"glalie":{"level":88,"sets":[{"role":"Fast Support","movepool":["earthquake","explosion","icebeam","spikes","taunt"]}]},"walrein":{"level":87,"sets":[{"role":"Bulky Support","movepool":["encore","icebeam","roar","superfang","surf","toxic"]},{"role":"Bulky Attacker","movepool":["icebeam","protect","rest","sleeptalk","surf","toxic"]}]},"huntail":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["doubleedge","hiddenpowergrass","hydropump","icebeam","raindance","surf"],"preferredTypes":["Ice"]},{"role":"Fast Attacker","movepool":["doubleedge","hiddenpowergrass","hydropump","icebeam","suckerpunch","surf"],"preferredTypes":["Ice"]}]},"gorebyss":{"level":88,"sets":[{"role":"Setup Sweeper","movepool":["hiddenpowergrass","hydropump","icebeam","raindance","surf"]}]},"relicanth":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","headsmash","stealthrock","toxic","waterfall"]},{"role":"Wallbreaker","movepool":["doubleedge","earthquake","headsmash","rockpolish","waterfall"],"preferredTypes":["Ground"]}]},"luvdisc":{"level":100,"sets":[{"role":"Staller","movepool":["icebeam","protect","substitute","surf","toxic"]}]},"salamence":{"level":74,"sets":[{"role":"Setup Sweeper","movepool":["dragondance","earthquake","fireblast","outrage","roost"],"preferredTypes":["Ground"]}]},"metagross":{"level":77,"sets":[{"role":"Setup Sweeper","movepool":["agility","earthquake","explosion","icepunch","meteormash","thunderpunch","zenheadbutt"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["bulletpunch","earthquake","explosion","icepunch","meteormash","stealthrock","thunderpunch","zenheadbutt"],"preferredTypes":["Ground"]}]},"regirock":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","explosion","rest","stealthrock","stoneedge","thunderwave","toxic"]},{"role":"Bulky Support","movepool":["curse","earthquake","rest","sleeptalk","stoneedge"]},{"role":"Staller","movepool":["earthquake","protect","rockslide","toxic"]}]},"regice":{"level":82,"sets":[{"role":"Bulky Attacker","movepool":["focusblast","icebeam","rest","sleeptalk","thunderbolt","thunderwave"],"preferredTypes":["Electric"]},{"role":"Setup Sweeper","movepool":["explosion","focusblast","icebeam","rockpolish","thunderbolt"],"preferredTypes":["Electric"]},{"role":"Staller","movepool":["icebeam","protect","thunderbolt","toxic"]}]},"registeel":{"level":81,"sets":[{"role":"Bulky Setup","movepool":["curse","ironhead","rest","sleeptalk"]},{"role":"Bulky Support","movepool":["rest","seismictoss","sleeptalk","toxic"]},{"role":"Staller","movepool":["protect","seismictoss","stealthrock","toxic"]}]},"latias":{"level":70,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psychic","roost"]}]},"latios":{"level":70,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","dracometeor","psychic","roost"]}]},"kyogre":{"level":68,"sets":[{"role":"Fast Attacker","movepool":["icebeam","surf","thunder","waterspout"]},{"role":"Bulky Support","movepool":["calmmind","icebeam","rest","sleeptalk","surf","thunder"]}]},"groudon":{"level":72,"sets":[{"role":"Bulky Support","movepool":["earthquake","lavaplume","roar","stealthrock","stoneedge","thunderwave"]},{"role":"Bulky Setup","movepool":["earthquake","firepunch","rockpolish","stoneedge","swordsdance"]}]},"rayquaza":{"level":73,"sets":[{"role":"Wallbreaker","movepool":["dracometeor","earthquake","extremespeed","fireblast","outrage"]},{"role":"Setup Sweeper","movepool":["dragondance","earthquake","extremespeed","outrage","overheat"],"preferredTypes":["Ground"]},{"role":"Fast Attacker","movepool":["dragonclaw","earthquake","extremespeed","swordsdance"]}]},"jirachi":{"level":75,"sets":[{"role":"Bulky Support","movepool":["bodyslam","firepunch","healingwish","ironhead","protect","stealthrock","toxic","uturn","wish"]},{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerfire","psychic","substitute","thunderbolt","wish"],"preferredTypes":["Electric"]}]},"deoxys":{"level":74,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","icebeam","psychoboost","shadowball","stealthrock","superpower"],"preferredTypes":["Fighting"]}]},"deoxysattack":{"level":73,"sets":[{"role":"Wallbreaker","movepool":["extremespeed","icebeam","psychoboost","shadowball","superpower"],"preferredTypes":["Fighting"]}]},"deoxysdefense":{"level":79,"sets":[{"role":"Bulky Support","movepool":["recover","seismictoss","spikes","stealthrock","taunt","toxic"]}]},"deoxysspeed":{"level":79,"sets":[{"role":"Fast Support","movepool":["psychoboost","spikes","stealthrock","superpower","taunt"]}]},"torterra":{"level":86,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","stealthrock","stoneedge","synthesis","woodhammer"]},{"role":"Bulky Setup","movepool":["earthquake","rockpolish","stoneedge","woodhammer"]}]},"infernape":{"level":77,"sets":[{"role":"Wallbreaker","movepool":["closecombat","grassknot","machpunch","overheat","stealthrock"]},{"role":"Fast Attacker","movepool":["closecombat","flareblitz","machpunch","stoneedge","swordsdance","uturn"]}]},"empoleon":{"level":79,"sets":[{"role":"Staller","movepool":["icebeam","protect","stealthrock","surf","toxic"]},{"role":"Bulky Support","movepool":["icebeam","roar","stealthrock","surf","toxic"]},{"role":"Setup Sweeper","movepool":["agility","grassknot","hydropump","icebeam"]}]},"staraptor":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["bravebird","closecombat","doubleedge","pursuit","quickattack","return","uturn"],"preferredTypes":["Fighting"]},{"role":"Bulky Attacker","movepool":["bravebird","closecombat","return","roost","uturn"],"preferredTypes":["Fighting"]}]},"bibarel":{"level":93,"sets":[{"role":"Setup Sweeper","movepool":["curse","quickattack","return","waterfall"]}]},"kricketune":{"level":100,"sets":[{"role":"Setup Sweeper","movepool":["brickbreak","nightslash","return","swordsdance","xscissor"]}]},"luxray":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["crunch","icefang","roar","superpower","thunderbolt","toxic"],"preferredTypes":["Fighting"]},{"role":"Staller","movepool":["protect","superpower","thunderbolt","toxic"]}]},"roserade":{"level":81,"sets":[{"role":"Fast Support","movepool":["energyball","hiddenpowerground","leafstorm","sleeppowder","sludgebomb","spikes","synthesis","toxicspikes"]}]},"rampardos":{"level":90,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","firepunch","rockpolish","stoneedge","zenheadbutt"],"preferredTypes":["Ground"]},{"role":"Fast Attacker","movepool":["earthquake","headsmash","stoneedge","superpower"]}]},"bastiodon":{"level":92,"sets":[{"role":"Bulky Support","movepool":["metalburst","roar","rockslide","stealthrock","toxic"]},{"role":"Staller","movepool":["metalburst","protect","roar","rockslide","stealthrock","toxic"]}]},"wormadam":{"level":100,"sets":[{"role":"Wallbreaker","movepool":["hiddenpowerground","hiddenpowerrock","leafstorm","psychic","signalbeam"]}]},"wormadamsandy":{"level":99,"sets":[{"role":"Staller","movepool":["earthquake","rest","sleeptalk","toxic"]}]},"wormadamtrash":{"level":86,"sets":[{"role":"Staller","movepool":["flashcannon","protect","stealthrock","toxic"]}]},"mothim":{"level":97,"sets":[{"role":"Fast Attacker","movepool":["airslash","bugbuzz","hiddenpowerfighting","hiddenpowerground","shadowball","uturn"],"preferredTypes":["Bug"]}]},"vespiquen":{"level":100,"sets":[{"role":"Staller","movepool":["hiddenpowerflying","roost","toxic","uturn"]}]},"pachirisu":{"level":96,"sets":[{"role":"Bulky Support","movepool":["discharge","superfang","thunderbolt","thunderwave","toxic","uturn"]},{"role":"Staller","movepool":["protect","thunderbolt","toxic","uturn"]}]},"floatzel":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["aquajet","crunch","icepunch","return","waterfall"],"preferredTypes":["Ice"]},{"role":"Setup Sweeper","movepool":["aquajet","bulkup","icepunch","return","substitute","waterfall"]}]},"cherrim":{"level":96,"sets":[{"role":"Staller","movepool":["aromatherapy","energyball","hiddenpowerground","leechseed","synthesis","toxic"]}]},"gastrodon":{"level":88,"sets":[{"role":"Bulky Support","movepool":["earthquake","icebeam","recover","surf","toxic"]}]},"ambipom":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["fakeout","lowkick","payback","pursuit","return","uturn"]}]},"drifblim":{"level":85,"sets":[{"role":"Setup Sweeper","movepool":["batonpass","calmmind","hiddenpowerfighting","rest","shadowball","substitute","thunderbolt"]}]},"lopunny":{"level":87,"sets":[{"role":"Fast Support","movepool":["batonpass","encore","return","substitute","thunderwave","toxic"]},{"role":"Wallbreaker","movepool":["healingwish","icepunch","return","skyuppercut","switcheroo"]}]},"mismagius":{"level":81,"sets":[{"role":"Bulky Attacker","movepool":["destinybond","hiddenpowerfighting","painsplit","shadowball","substitute","taunt","willowisp"]},{"role":"Wallbreaker","movepool":["hiddenpowerfighting","nastyplot","shadowball","thunderbolt","trick"]}]},"honchkrow":{"level":82,"sets":[{"role":"Wallbreaker","movepool":["bravebird","heatwave","pursuit","roost","suckerpunch","superpower"]}]},"purugly":{"level":89,"sets":[{"role":"Fast Attacker","movepool":["fakeout","return","shadowclaw","taunt","uturn"]}]},"skuntank":{"level":84,"sets":[{"role":"Bulky Attacker","movepool":["crunch","explosion","fireblast","poisonjab","pursuit","suckerpunch","taunt"]}]},"bronzong":{"level":80,"sets":[{"role":"Bulky Support","movepool":["earthquake","explosion","ironhead","payback","stealthrock","toxic"]},{"role":"Staller","movepool":["earthquake","protect","psychic","toxic"]}]},"chatot":{"level":92,"sets":[{"role":"Setup Sweeper","movepool":["chatter","encore","heatwave","hiddenpowergrass","hypervoice","nastyplot"]},{"role":"Fast Attacker","movepool":["chatter","heatwave","hiddenpowergrass","hypervoice","uturn"]}]},"spiritomb":{"level":86,"sets":[{"role":"Bulky Setup","movepool":["calmmind","darkpulse","rest","sleeptalk"]},{"role":"Bulky Attacker","movepool":["darkpulse","painsplit","pursuit","shadowsneak","suckerpunch","willowisp"]}]},"garchomp":{"level":74,"sets":[{"role":"Fast Support","movepool":["earthquake","fireblast","outrage","stealthrock","stoneedge"]},{"role":"Fast Attacker","movepool":["earthquake","firefang","outrage","stoneedge","swordsdance"]},{"role":"Bulky Setup","movepool":["dragonclaw","earthquake","substitute","swordsdance"]}]},"lucario":{"level":79,"sets":[{"role":"Fast Attacker","movepool":["closecombat","crunch","extremespeed","icepunch","swordsdance"],"preferredTypes":["Normal"]}]},"hippowdon":{"level":80,"sets":[{"role":"Bulky Support","movepool":["earthquake","roar","slackoff","stealthrock","stoneedge","toxic"]}]},"drapion":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["aquatail","crunch","earthquake","poisonjab","pursuit","swordsdance"],"preferredTypes":["Ground"]},{"role":"Bulky Support","movepool":["crunch","earthquake","poisonjab","taunt","toxicspikes","whirlwind"]}]},"toxicroak":{"level":84,"sets":[{"role":"Setup Sweeper","movepool":["crosschop","earthquake","icepunch","poisonjab","substitute","suckerpunch","swordsdance"]}]},"carnivine":{"level":96,"sets":[{"role":"Bulky Support","movepool":["knockoff","powerwhip","sleeppowder","synthesis"]},{"role":"Bulky Setup","movepool":["powerwhip","return","sleeppowder","swordsdance","synthesis"]}]},"lumineon":{"level":91,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerelectric","hiddenpowergrass","icebeam","raindance","surf","uturn"]}]},"abomasnow":{"level":83,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","earthquake","iceshard","woodhammer"]}]},"weavile":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["icepunch","iceshard","lowkick","nightslash","pursuit","swordsdance"]}]},"magnezone":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["explosion","flashcannon","hiddenpowerfire","hiddenpowerice","thunderbolt"]},{"role":"Staller","movepool":["hiddenpowerice","protect","thunderbolt","toxic"]}]},"lickilicky":{"level":88,"sets":[{"role":"Bulky Support","movepool":["bodyslam","healbell","protect","toxic","wish"]},{"role":"Bulky Setup","movepool":["bodyslam","earthquake","explosion","powerwhip","return","swordsdance"],"preferredTypes":["Ground"]}]},"rhyperior":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","icepunch","megahorn","rockpolish","stealthrock","stoneedge"]}]},"tangrowth":{"level":87,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","hiddenpowerfire","leafstorm","powerwhip","rockslide","sleeppowder","synthesis"]},{"role":"Bulky Setup","movepool":["earthquake","powerwhip","rockslide","swordsdance"]}]},"electivire":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["crosschop","earthquake","flamethrower","hiddenpowergrass","icepunch","thunderbolt"],"preferredTypes":["Ice"]}]},"magmortar":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["earthquake","fireblast","focusblast","hiddenpowergrass","hiddenpowerice","substitute","thunderbolt"],"preferredTypes":["Electric"]}]},"togekiss":{"level":79,"sets":[{"role":"Bulky Setup","movepool":["airslash","aurasphere","batonpass","nastyplot","roost","thunderwave"]},{"role":"Bulky Attacker","movepool":["airslash","healbell","roost","thunderwave"]},{"role":"Fast Attacker","movepool":["airslash","aurasphere","fireblast","trick"]}]},"yanmega":{"level":81,"sets":[{"role":"Fast Attacker","movepool":["airslash","bugbuzz","hiddenpowerfire","hiddenpowerground","protect"]},{"role":"Wallbreaker","movepool":["airslash","bugbuzz","hiddenpowerfire","hiddenpowerground","uturn"]}]},"leafeon":{"level":85,"sets":[{"role":"Bulky Support","movepool":["healbell","leafblade","synthesis","toxic"]},{"role":"Setup Sweeper","movepool":["batonpass","doubleedge","leafblade","substitute","swordsdance","synthesis","xscissor"],"preferredTypes":["Normal"]}]},"glaceon":{"level":88,"sets":[{"role":"Bulky Support","movepool":["healbell","hiddenpowerground","icebeam","protect","wish"]},{"role":"Staller","movepool":["icebeam","protect","toxic","wish"]}]},"gliscor":{"level":81,"sets":[{"role":"Bulky Support","movepool":["earthquake","roost","stealthrock","stoneedge","taunt","toxic","uturn"]},{"role":"Bulky Setup","movepool":["earthquake","roost","stoneedge","swordsdance"]}]},"mamoswine":{"level":79,"sets":[{"role":"Wallbreaker","movepool":["earthquake","iceshard","stealthrock","stoneedge","superpower"]}]},"porygonz":{"level":80,"sets":[{"role":"Fast Attacker","movepool":["darkpulse","hiddenpowerfighting","icebeam","nastyplot","thunderbolt","triattack","trick"]}]},"gallade":{"level":83,"sets":[{"role":"Fast Attacker","movepool":["closecombat","nightslash","shadowsneak","swordsdance","trick","zenheadbutt"]}]},"probopass":{"level":88,"sets":[{"role":"Bulky Attacker","movepool":["earthpower","explosion","powergem","stealthrock","thunderwave","toxic"]}]},"dusknoir":{"level":85,"sets":[{"role":"Bulky Support","movepool":["earthquake","icepunch","painsplit","shadowsneak","trick","willowisp"],"preferredTypes":["Ground"]},{"role":"Bulky Attacker","movepool":["focuspunch","painsplit","shadowsneak","substitute"]}]},"froslass":{"level":82,"sets":[{"role":"Fast Support","movepool":["destinybond","icebeam","shadowball","spikes","taunt","thunderwave"]}]},"rotom":{"level":84,"sets":[{"role":"Fast Attacker","movepool":["hiddenpowerfighting","hiddenpowerice","shadowball","thunderbolt","trick"]}]},"rotomheat":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["overheat","painsplit","shadowball","thunderbolt","trick","willowisp"],"preferredTypes":["Fire"]}]},"rotomwash":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["hydropump","painsplit","shadowball","thunderbolt","trick","willowisp"],"preferredTypes":["Water"]}]},"rotomfrost":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["blizzard","painsplit","shadowball","thunderbolt","trick","willowisp"],"preferredTypes":["Ice"]},{"role":"Bulky Support","movepool":["rest","shadowball","sleeptalk","thunderbolt"]}]},"rotomfan":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["painsplit","shadowball","thunderbolt","willowisp"]},{"role":"Bulky Support","movepool":["rest","shadowball","sleeptalk","thunderbolt"]}]},"rotommow":{"level":80,"sets":[{"role":"Bulky Attacker","movepool":["leafstorm","painsplit","shadowball","thunderbolt","trick","willowisp"],"preferredTypes":["Grass"]}]},"uxie":{"level":79,"sets":[{"role":"Bulky Support","movepool":["healbell","psychic","stealthrock","thunderwave","uturn","yawn"]}]},"mesprit":{"level":82,"sets":[{"role":"Fast Attacker","movepool":["calmmind","healingwish","hiddenpowerfire","icebeam","psychic","thunderbolt","trick","uturn"]},{"role":"Bulky Support","movepool":["hiddenpowerfire","psychic","stealthrock","thunderwave","toxic","uturn"]}]},"azelf":{"level":77,"sets":[{"role":"Fast Attacker","movepool":["fireblast","nastyplot","psychic","signalbeam","thunderbolt","trick","uturn"],"preferredTypes":["Fire"]},{"role":"Fast Support","movepool":["explosion","fireblast","psychic","stealthrock","taunt","uturn"]}]},"dialga":{"level":71,"sets":[{"role":"Bulky Attacker","movepool":["aurasphere","dracometeor","fireblast","roar","stealthrock","thunderbolt","toxic"],"preferredTypes":["Fire"]},{"role":"Bulky Support","movepool":["bulkup","outrage","rest","sleeptalk"]},{"role":"Bulky Setup","movepool":["bulkup","dragonclaw","earthquake","fireblast","rest"],"preferredTypes":["Ground"]}]},"palkia":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["dracometeor","fireblast","hydropump","spacialrend","thunderwave"],"preferredTypes":["Fire"]}]},"heatran":{"level":74,"sets":[{"role":"Fast Attacker","movepool":["earthpower","eruption","explosion","fireblast"]},{"role":"Bulky Attacker","movepool":["dragonpulse","earthpower","explosion","fireblast","hiddenpowergrass","lavaplume","roar","stealthrock","toxic"],"preferredTypes":["Ground"]},{"role":"Staller","movepool":["earthpower","fireblast","lavaplume","protect","substitute","toxic"]}]},"regigigas":{"level":82,"sets":[{"role":"Staller","movepool":["earthquake","return","substitute","thunderwave"]}]},"giratinaorigin":{"level":71,"sets":[{"role":"Fast Attacker","movepool":["dracometeor","earthquake","hiddenpowerfire","outrage","shadowball","shadowsneak","willowisp"]}]},"giratina":{"level":69,"sets":[{"role":"Fast Support","movepool":["dragonpulse","rest","roar","sleeptalk","willowisp"]},{"role":"Bulky Setup","movepool":["calmmind","dragonpulse","rest","sleeptalk"]}]},"cresselia":{"level":79,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","hiddenpowerfighting","psychic","substitute"]},{"role":"Bulky Setup","movepool":["calmmind","hiddenpowerfighting","moonlight","psychic"]},{"role":"Bulky Support","movepool":["hiddenpowerfighting","moonlight","psychic","thunderwave","toxic"]}]},"phione":{"level":90,"sets":[{"role":"Staller","movepool":["raindance","rest","surf","toxic"]},{"role":"Bulky Support","movepool":["healbell","icebeam","surf","toxic","uturn"]}]},"manaphy":{"level":76,"sets":[{"role":"Bulky Setup","movepool":["energyball","icebeam","surf","tailglow"]}]},"darkrai":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["darkpulse","darkvoid","focusblast","nastyplot"]},{"role":"Bulky Setup","movepool":["darkpulse","darkvoid","nastyplot","substitute"]}]},"shaymin":{"level":80,"sets":[{"role":"Fast Support","movepool":["airslash","earthpower","leechseed","rest","seedflare","substitute"],"preferredTypes":["Flying"]}]},"shayminsky":{"level":71,"sets":[{"role":"Fast Attacker","movepool":["airslash","earthpower","hiddenpowerice","leechseed","seedflare","substitute"]}]},"arceus":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","shadowclaw","swordsdance"],"preferredTypes":["Ground"]}]},"arceusbug":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment"]}]},"arceusdark":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","focusblast","judgment","recover","refresh"]}]},"arceusdragon":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","outrage","recover","swordsdance"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover","refresh"]}]},"arceuselectric":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","icebeam","judgment","recover"]}]},"arceusfighting":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","darkpulse","icebeam","judgment","recover"]}]},"arceusfire":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment","recover","thunderbolt"]}]},"arceusflying":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover","refresh"]}]},"arceusghost":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","focusblast","judgment","recover","willowisp"]}]},"arceusgrass":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","fireblast","judgment","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","earthpower","icebeam","judgment"]}]},"arceusground":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","stoneedge","swordsdance"],"preferredTypes":["Rock"]},{"role":"Bulky Setup","movepool":["calmmind","icebeam","judgment","recover"]}]},"arceusice":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover","thunderbolt"]}]},"arceuspoison":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["calmmind","earthpower","fireblast","recover","sludgebomb"]},{"role":"Bulky Attacker","movepool":["earthquake","fireblast","icebeam","recover","sludgebomb","stealthrock","willowisp"]}]},"arceuspsychic":{"level":69,"sets":[{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"]},{"role":"Setup Sweeper","movepool":["calmmind","darkpulse","focusblast","judgment"]}]},"arceusrock":{"level":69,"sets":[{"role":"Setup Sweeper","movepool":["earthquake","extremespeed","recover","stoneedge","swordsdance"],"preferredTypes":["Ground"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","fireblast","judgment","recover"]}]},"arceussteel":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["earthquake","judgment","recover","toxic","willowisp"]},{"role":"Bulky Setup","movepool":["calmmind","earthpower","judgment","recover"]}]},"arceuswater":{"level":69,"sets":[{"role":"Bulky Attacker","movepool":["calmmind","icebeam","judgment","recover","willowisp"]}]}} as any;
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
	randomSets: {[species: string]: RandomTeamsTypes.RandomSpeciesData} = randomSetsJSON;

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		super(dex, format, prng);
		this.noStab = NO_STAB;
		this.priorityPokemon = PRIORITY_POKEMON;

		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter) => (
				!counter.get('Bug') && (movePool.includes('megahorn') || abilities.has('Tinted Lens'))
			),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
			Dragon: (movePool, moves, abilities, types, counter) => !counter.get('Dragon'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting'),
			Fire: (movePool, moves, abilities, types, counter) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter, species) => (!counter.get('Flying') && species.id !== 'mantine'),
			Ghost: (movePool, moves, abilities, types, counter) => !counter.get('Ghost'),
			Grass: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Grass') &&
				(species.baseStats.atk >= 100 || movePool.includes('leafstorm') || movePool.includes('solarbeam'))
			),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => !counter.get('Ice'),
			Poison: (movePool, moves, abilities, types, counter) => (!counter.get('Poison') && types.has('Grass')),
			Psychic: (movePool, moves, abilities, types, counter) => (
				!counter.get('Psychic') && (types.has('Fighting') || movePool.includes('calmmind'))
			),
			Rock: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Rock') && (species.baseStats.atk >= 95 || abilities.has('Rock Head'))
			),
			Steel: (movePool, moves, abilities, types, counter, species) => (!counter.get('Steel') && species.id === 'metagross'),
			Water: (movePool, moves, abilities, types, counter) => !counter.get('Water'),
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
		if (teamDetails.screens && movePool.length >= this.maxMoveCount + 2) {
			if (movePool.includes('reflect')) this.fastPop(movePool, movePool.indexOf('reflect'));
			if (movePool.includes('lightscreen')) this.fastPop(movePool, movePool.indexOf('lightscreen'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.stealthRock) {
			if (movePool.includes('stealthrock')) this.fastPop(movePool, movePool.indexOf('stealthrock'));
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

		// Develop additional move lists
		const badWithSetup = ['healbell', 'pursuit', 'toxic'];
		const statusMoves = this.dex.moves.all()
			.filter(move => move.category === 'Status')
			.map(move => move.id);

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
			['lavaplume', 'fireblast'],
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

		// Enforce Seismic Toss, Spore, and Volt Tackle
		for (const moveid of ['seismictoss', 'spore', 'volttackle']) {
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

		// Enforce hazard removal on Bulky Support and Spinner if the team doesn't already have it
		if (['Bulky Support', 'Spinner'].includes(role) && !teamDetails.rapidSpin) {
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
		if (['Bulky Support', 'Bulky Attacker', 'Bulky Setup', 'Spinner', 'Staller'].includes(role)) {
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
		if (['Fast Attacker', 'Setup Sweeper', 'Bulky Attacker', 'Wallbreaker'].includes(role)) {
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
		case 'Hustle': case 'Ice Body': case 'Rain Dish': case 'Sand Veil': case 'Sniper': case 'Snow Cloak':
		case 'Solar Power': case 'Steadfast': case 'Sticky Hold': case 'Unaware':
			return true;
		case 'Chlorophyll':
			return !moves.has('sunnyday') && !teamDetails.sun;
		case 'Guts':
			return !moves.has('facade') && species.id !== 'heracross';
		case 'Hydration': case 'Swift Swim':
			return (
				!moves.has('raindance') && !teamDetails.rain ||
				!moves.has('raindance') && ['Rock Head', 'Water Absorb'].some(abil => abilities.has(abil))
			);
		case 'Reckless': case 'Rock Head':
			return !counter.get('recoil');
		case 'Shed Skin':
			return !moves.has('rest');
		case 'Skill Link':
			return !counter.get('skilllink');
		case 'Swarm':
			return !counter.get('Bug') && !moves.has('uturn');
		case 'Technician':
			return !counter.get('technician');
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
		if (species.id === 'jynx') return 'Forewarn';
		if (species.id === 'arcanine') return 'Intimidate';
		if (species.id === 'blissey') return 'Natural Cure';
		if (species.id === 'octillery') return 'Sniper';
		if (species.id === 'yanmega') return (role === 'Fast Attacker') ? 'Speed Boost' : 'Tinted Lens';
		if (species.id === 'absol') return 'Super Luck';
		if (species.id === 'lanturn') return 'Volt Absorb';

		if (abilities.has('Guts') && !abilities.has('Quick Feet') && moves.has('facade')) return 'Guts';
		if (abilities.has('Hydration') && moves.has('raindance') && moves.has('rest')) return 'Hydration';

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
		if (species.requiredItems) return this.sample(species.requiredItems);
		if (species.id === 'latias' || species.id === 'latios') return 'Soul Dew';
		if (species.id === 'marowak') return 'Thick Club';
		if (species.id === 'pikachu') return 'Light Ball';
		if (species.id === 'shedinja' || species.id === 'smeargle') return 'Focus Sash';
		if (species.id === 'unown') return 'Choice Specs';
		if (species.id === 'wobbuffet') return 'Custap Berry';
		if (species.id === 'ditto' || (species.id === 'rampardos' && role === 'Fast Attacker')) return 'Choice Scarf';
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

		if (types.includes('Normal') && moves.has('fakeout') && !!counter.get('Normal')) return 'Silk Scarf';
		if (species.id === 'palkia') return 'Lustrous Orb';
		if (species.id === 'farfetchd') return 'Stick';
		if (moves.has('outrage') && counter.get('setup') && !moves.has('sleeptalk')) return 'Lum Berry';
		if (['batonpass', 'protect', 'substitute'].some(m => moves.has(m))) return 'Leftovers';
		if (
			role === 'Fast Support' && isLead && defensiveStatTotal < 255 && !counter.get('recovery') &&
			(!counter.get('recoil') || ability === 'Rock Head') &&
			(counter.get('hazards') || !moves.has('uturn'))
		) return 'Focus Sash';

		// Default Items
		if (role === 'Fast Support') {
			return (
				counter.get('Physical') + counter.get('Special') >= 3 &&
				['rapidspin', 'uturn'].every(m => !moves.has(m)) &&
				this.dex.getEffectiveness('Rock', species) < 2
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
		if (!counter.get('Status') && expertBeltReqs && (moves.has('uturn') || role === 'Fast Attacker')) return 'Expert Belt';
		if (
			['Fast Attacker', 'Setup Sweeper', 'Wallbreaker'].some(m => role === m) &&
			this.dex.getEffectiveness('Rock', species) < 2 && !moves.has('rapidspin')
		) return 'Life Orb';
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
		const possibleSets = [];
		// Check if the Pokemon has a Spinner set
		let canSpinner = false;
		for (const set of sets) {
			if (!teamDetails.rapidSpin && set.role === 'Spinner') canSpinner = true;
		}
		for (const set of sets) {
			// Prevent Spinner if the team already has removal
			if (teamDetails.rapidSpin && set.role === 'Spinner') continue;
			// Enforce Spinner if the team does not have removal
			if (canSpinner && set.role !== 'Spinner') continue;
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
		const srImmunity = ability === 'Magic Guard';
		const srWeakness = srImmunity ? 0 : this.dex.getEffectiveness('Rock', species);
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if (moves.has('substitute') && item === 'Sitrus Berry') {
				// Two Substitutes should activate Sitrus Berry
				if (hp % 4 === 0) break;
			} else if (moves.has('bellydrum') && item === 'Sitrus Berry') {
				// Belly Drum should activate Sitrus Berry
				if (hp % 2 === 0) break;
			} else {
				// Maximize number of Stealth Rock switch-ins
				if (srWeakness <= 0 || ['Black Sludge', 'Leftovers', 'Life Orb'].includes(item)) break;
				if (item !== 'Sitrus Berry' && hp % (4 / srWeakness) > 0) break;
				// Minimise number of Stealth Rock switch-ins to activate Sitrus Berry
				if (item === 'Sitrus Berry' && hp % (4 / srWeakness) === 0) break;
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
}

export default RandomGen4Teams;
