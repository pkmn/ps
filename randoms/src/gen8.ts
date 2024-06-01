import {Utils} from './utils';
import {
	Ability,
	AnyObject,
	BasicEffect,
	Format,
	ID,
	Item,
	ModdedDex,
	Move,
	Nature,
	PRNG,
	PRNGSeed,
	PlayerOptions,
	PokemonSet,
	RandomTeamsTypes,
	RuleTable,
	Species,
	StatID,
	StatsTable,
	Tags,
	toID,
} from '@pkmn/sim';

/* eslint-disable */
const randomDataJSON = {"venusaur":{"level":82,"moves":["gigadrain","leechseed","sleeppowder","sludgebomb","substitute"]},"venusaurgmax":{"doublesLevel":80,"doublesMoves":["earthpower","energyball","leechseed","protect","sleeppowder","sludgebomb"]},"charizard":{"level":82,"moves":["airslash","earthquake","fireblast","focusblast","roost"],"doublesLevel":80,"doublesMoves":["airslash","heatwave","overheat","protect","scorchingsands","tailwind"],"noDynamaxMoves":["defog","earthquake","fireblast","hurricane","roost","toxic"]},"charizardgmax":{"doublesLevel":80,"doublesMoves":["airslash","fireblast","focusblast","heatwave","protect","tailwind"]},"blastoise":{"level":82,"moves":["earthquake","hydropump","icebeam","shellsmash"],"doublesLevel":80,"doublesMoves":["icebeam","muddywater","protect","shellsmash"]},"blastoisegmax":{"level":82,"moves":["icebeam","protect","rapidspin","scald","toxic"],"doublesLevel":80,"doublesMoves":["fakeout","flipturn","followme","icywind","lifedew","muddywater"]},"butterfree":{"level":87,"moves":["energyball","hurricane","quiverdance","sleeppowder"],"doublesLevel":88,"doublesMoves":["hurricane","pollenpuff","protect","ragepowder","sleeppowder","tailwind"]},"butterfreegmax":{"level":87,"moves":["airslash","bugbuzz","quiverdance","sleeppowder"],"doublesLevel":88,"doublesMoves":["hurricane","pollenpuff","protect","quiverdance","sleeppowder"]},"pikachu":{"level":92,"moves":["irontail","knockoff","surf","voltswitch","volttackle"],"doublesLevel":91,"doublesMoves":["fakeout","grassknot","knockoff","protect","volttackle"]},"pikachugmax":{"doublesLevel":90,"doublesMoves":["extremespeed","fakeout","knockoff","surf","volttackle"]},"raichu":{"level":87,"moves":["focusblast","grassknot","nastyplot","surf","thunderbolt","voltswitch"],"doublesLevel":88,"doublesMoves":["encore","fakeout","helpinghand","nuzzle","thunderbolt","voltswitch"],"noDynamaxMoves":["encore","focusblast","grassknot","nastyplot","surf","thunderbolt","voltswitch"]},"raichualola":{"level":84,"moves":["focusblast","grassknot","nastyplot","psyshock","thunderbolt","voltswitch"],"doublesLevel":86,"doublesMoves":["focusblast","nastyplot","psyshock","thunderbolt","voltswitch"]},"sandslash":{"level":87,"moves":["earthquake","knockoff","rapidspin","spikes","stealthrock","stoneedge","swordsdance","toxic"],"doublesLevel":89,"doublesMoves":["drillrun","knockoff","protect","stealthrock","stoneedge","swordsdance"]},"sandslashalola":{"level":87,"moves":["earthquake","ironhead","knockoff","rapidspin","swordsdance","tripleaxel"],"doublesLevel":90,"doublesMoves":["drillrun","ironhead","protect","swordsdance","tripleaxel"]},"nidoqueen":{"level":83,"moves":["earthpower","icebeam","sludgewave","stealthrock","toxicspikes"],"doublesLevel":84,"doublesMoves":["earthpower","icebeam","protect","sludgebomb","stealthrock"]},"nidoking":{"level":82,"moves":["earthpower","icebeam","sludgewave","substitute","superpower"],"doublesLevel":84,"doublesMoves":["earthpower","fireblast","icebeam","protect","sludgebomb","superpower"]},"clefairy":{"doublesLevel":95,"doublesMoves":["followme","helpinghand","moonblast","protect"]},"clefable":{"level":82,"moves":["calmmind","fireblast","moonblast","softboiled","stealthrock","thunderwave"],"doublesLevel":86,"doublesMoves":["fireblast","followme","healpulse","helpinghand","moonblast","protect","thunderwave"]},"ninetales":{"level":82,"moves":["fireblast","nastyplot","scorchingsands","solarbeam","willowisp"],"doublesLevel":84,"doublesMoves":["heatwave","nastyplot","protect","scorchingsands","solarbeam"]},"ninetalesalola":{"level":79,"moves":["auroraveil","blizzard","freezedry","moonblast","nastyplot"],"doublesLevel":81,"doublesMoves":["auroraveil","blizzard","encore","freezedry","moonblast"]},"wigglytuff":{"level":93,"moves":["dazzlinggleam","fireblast","healbell","lightscreen","reflect","stealthrock"],"doublesLevel":90,"doublesMoves":["dazzlinggleam","healpulse","helpinghand","hypervoice","thunderwave"]},"vileplume":{"level":84,"moves":["aromatherapy","gigadrain","sleeppowder","sludgebomb","strengthsap"],"doublesLevel":88,"doublesMoves":["aromatherapy","energyball","pollenpuff","sleeppowder","sludgebomb","strengthsap"]},"dugtrio":{"level":81,"moves":["earthquake","memento","stoneedge","suckerpunch"],"doublesLevel":88,"doublesMoves":["highhorsepower","memento","protect","rockslide","suckerpunch"]},"dugtrioalola":{"level":81,"moves":["earthquake","ironhead","stealthrock","stoneedge","suckerpunch"],"doublesLevel":88,"doublesMoves":["highhorsepower","ironhead","memento","protect","rockslide","suckerpunch"]},"persian":{"level":89,"moves":["doubleedge","fakeout","knockoff","playrough","uturn"],"doublesLevel":90,"doublesMoves":["doubleedge","fakeout","hypnosis","icywind","knockoff","taunt"]},"persianalola":{"level":81,"moves":["darkpulse","hypnosis","nastyplot","thunderbolt"],"doublesLevel":88,"doublesMoves":["fakeout","foulplay","icywind","partingshot","snarl","taunt"]},"golduck":{"level":85,"moves":["calmmind","focusblast","icebeam","psyshock","scald","substitute"],"doublesLevel":88,"doublesMoves":["calmmind","encore","icebeam","muddywater","protect"]},"arcanine":{"level":82,"moves":["closecombat","extremespeed","flareblitz","morningsun","toxic","wildcharge","willowisp"],"doublesLevel":84,"doublesMoves":["closecombat","extremespeed","flareblitz","morningsun","protect","snarl","willowisp"]},"poliwrath":{"level":86,"moves":["closecombat","darkestlariat","liquidation","raindance"],"doublesLevel":88,"doublesMoves":["closecombat","coaching","helpinghand","liquidation","protect"]},"alakazam":{"level":78,"moves":["counter","focusblast","nastyplot","psychic","shadowball"],"doublesLevel":80,"doublesMoves":["focusblast","nastyplot","protect","psychic","shadowball"]},"machamp":{"level":82,"moves":["bulletpunch","closecombat","dynamicpunch","facade","knockoff","stoneedge"],"doublesLevel":88,"doublesMoves":["bulletpunch","closecombat","facade","knockoff","protect"]},"tentacruel":{"level":84,"moves":["haze","knockoff","rapidspin","scald","sludgebomb","toxicspikes"],"doublesLevel":87,"doublesMoves":["acidspray","icywind","knockoff","muddywater","rapidspin","sludgebomb"]},"rapidash":{"level":84,"moves":["flareblitz","highhorsepower","morningsun","swordsdance","wildcharge","willowisp"],"doublesLevel":88,"doublesMoves":["flareblitz","highhorsepower","morningsun","protect","swordsdance","wildcharge"]},"rapidashgalar":{"level":83,"moves":["highhorsepower","morningsun","playrough","swordsdance","zenheadbutt"],"doublesLevel":88,"doublesMoves":["highhorsepower","playrough","protect","swordsdance","zenheadbutt"]},"slowbro":{"level":85,"moves":["futuresight","icebeam","scald","slackoff","teleport","thunderwave"],"doublesLevel":84,"doublesMoves":["calmmind","fireblast","icebeam","psychic","scald","slackoff","trickroom"]},"slowbrogalar":{"level":86,"moves":["flamethrower","psychic","shellsidearm","trick","trickroom"],"doublesLevel":85,"doublesMoves":["fireblast","healpulse","protect","psychic","shellsidearm","trickroom"]},"farfetchd":{"level":91,"moves":["bravebird","closecombat","knockoff","leafblade","swordsdance"],"doublesLevel":95,"doublesMoves":["bravebird","closecombat","leafblade","protect","quickattack","swordsdance"]},"cloyster":{"level":80,"moves":["hydropump","iciclespear","rockblast","shellsmash"],"doublesLevel":84,"doublesMoves":["hydropump","iciclespear","protect","rockblast","shellsmash"],"noDynamaxMoves":["hydropump","iciclespear","rockblast","shellsmash"]},"gengar":{"doublesLevel":86,"doublesMoves":["focusblast","nastyplot","protect","shadowball","sludgebomb","thunderbolt","trick","willowisp"]},"gengargmax":{"level":80,"moves":["focusblast","nastyplot","shadowball","sludgewave","trick"],"doublesLevel":86,"doublesMoves":["focusblast","nastyplot","protect","shadowball","sludgebomb","thunderbolt","willowisp"]},"kingler":{"level":83,"moves":["agility","liquidation","rockslide","superpower","swordsdance","xscissor"]},"kinglergmax":{"doublesLevel":86,"doublesMoves":["knockoff","liquidation","protect","superpower","xscissor"]},"exeggutor":{"level":86,"moves":["gigadrain","leechseed","psychic","sleeppowder","substitute"],"doublesLevel":88,"doublesMoves":["energyball","protect","psychic","sleeppowder","trickroom"]},"exeggutoralola":{"level":86,"moves":["dracometeor","flamethrower","gigadrain","leafstorm","trickroom"],"doublesLevel":88,"doublesMoves":["dragonpulse","energyball","flamethrower","protect","trickroom"]},"marowak":{"level":87,"moves":["doubleedge","earthquake","knockoff","stealthrock","stoneedge","swordsdance"],"doublesLevel":88,"doublesMoves":["bonemerang","knockoff","protect","stealthrock","stoneedge"]},"marowakalola":{"level":83,"moves":["earthquake","flamecharge","flareblitz","poltergeist","stealthrock","stoneedge"],"doublesLevel":83,"doublesMoves":["bonemerang","flamecharge","flareblitz","protect","shadowbone"]},"hitmonlee":{"level":83,"moves":["closecombat","curse","highjumpkick","knockoff","poisonjab","stoneedge"],"doublesLevel":86,"doublesMoves":["closecombat","fakeout","knockoff","poisonjab","protect","rockslide"]},"hitmonchan":{"level":86,"moves":["bulkup","drainpunch","icepunch","machpunch","rapidspin","throatchop"],"doublesLevel":88,"doublesMoves":["coaching","drainpunch","feint","firepunch","icepunch","machpunch"]},"weezing":{"level":86,"moves":["fireblast","painsplit","sludgebomb","toxicspikes","willowisp"],"doublesLevel":88,"doublesMoves":["fireblast","painsplit","sludgebomb","toxicspikes","willowisp"]},"weezinggalar":{"level":87,"moves":["defog","fireblast","painsplit","sludgebomb","strangesteam","toxicspikes","willowisp"],"doublesLevel":89,"doublesMoves":["clearsmog","defog","fireblast","painsplit","strangesteam","toxicspikes","willowisp"]},"rhydon":{"level":85,"moves":["earthquake","megahorn","stealthrock","stoneedge","toxic"]},"chansey":{"level":84,"moves":["aromatherapy","seismictoss","softboiled","stealthrock","toxic"]},"kangaskhan":{"level":85,"moves":["doubleedge","earthquake","fakeout","hammerarm","suckerpunch"],"doublesLevel":88,"doublesMoves":["doubleedge","drainpunch","fakeout","protect","rockslide","suckerpunch"]},"seaking":{"level":89,"moves":["drillrun","knockoff","megahorn","swordsdance","waterfall"],"doublesLevel":88,"doublesMoves":["drillrun","knockoff","megahorn","protect","scaleshot","swordsdance","waterfall"]},"starmie":{"level":84,"moves":["hydropump","icebeam","psyshock","rapidspin","recover","scald","thunderbolt"],"doublesLevel":84,"doublesMoves":["hydropump","icebeam","protect","psyshock","thunderbolt","trick"]},"mrmime":{"level":86,"moves":["dazzlinggleam","focusblast","healingwish","nastyplot","psychic"],"doublesLevel":88,"doublesMoves":["dazzlinggleam","fakeout","icywind","lightscreen","psychic","reflect"]},"mrmimegalar":{"level":85,"moves":["focusblast","freezedry","nastyplot","psychic","rapidspin"]},"scyther":{"level":81,"moves":["brickbreak","dualwingbeat","knockoff","roost","swordsdance","uturn"],"doublesLevel":84,"doublesMoves":["brickbreak","bugbite","dualwingbeat","uturn"]},"jynx":{"level":85,"moves":["focusblast","icebeam","lovelykiss","nastyplot","psyshock","trick"],"doublesLevel":86,"doublesMoves":["focusblast","icebeam","lovelykiss","nastyplot","psychic"]},"pinsir":{"level":84,"moves":["closecombat","earthquake","knockoff","stealthrock","stoneedge","xscissor"],"doublesLevel":88,"doublesMoves":["closecombat","feint","protect","rockslide","swordsdance","xscissor"]},"tauros":{"level":81,"moves":["bodyslam","closecombat","rockslide","throatchop","zenheadbutt"],"doublesLevel":84,"doublesMoves":["bodyslam","closecombat","lashout","protect","rockslide"]},"gyarados":{"level":75,"moves":["bounce","dragondance","earthquake","powerwhip","waterfall"],"doublesLevel":81,"doublesMoves":["bounce","dragondance","icefang","powerwhip","protect","waterfall"]},"laprasgmax":{"level":86,"moves":["freezedry","icebeam","protect","sparklingaria","thunderbolt","toxic"],"doublesLevel":84,"doublesMoves":["freezedry","helpinghand","hydropump","icywind","protect","thunderbolt"]},"ditto":{"level":76,"moves":["transform"],"doublesLevel":88,"doublesMoves":["transform"]},"vaporeon":{"level":85,"moves":["healbell","icebeam","protect","scald","toxic","wish"],"doublesLevel":88,"doublesMoves":["helpinghand","icywind","protect","scald","toxic","wish"]},"jolteon":{"level":82,"moves":["hypervoice","shadowball","thunderbolt","voltswitch"],"doublesLevel":86,"doublesMoves":["faketears","helpinghand","shadowball","thunderbolt","thunderwave"]},"flareon":{"level":86,"moves":["facade","flamecharge","flareblitz","quickattack","superpower"],"doublesLevel":88,"doublesMoves":["facade","flamecharge","flareblitz","protect","quickattack","superpower"]},"omastar":{"level":82,"moves":["earthpower","hydropump","icebeam","shellsmash","spikes","stealthrock"],"doublesLevel":86,"doublesMoves":["earthpower","icebeam","muddywater","shellsmash"]},"kabutops":{"level":83,"moves":["aquajet","knockoff","liquidation","rapidspin","stoneedge","swordsdance"],"doublesLevel":86,"doublesMoves":["aquajet","protect","stoneedge","superpower","swordsdance","waterfall"]},"aerodactyl":{"level":83,"moves":["aquatail","dualwingbeat","earthquake","honeclaws","stoneedge"],"doublesLevel":82,"doublesMoves":["aquatail","dragondance","dualwingbeat","earthquake","rockslide"]},"snorlax":{"level":83,"moves":["darkestlariat","doubleedge","earthquake","facade","heatcrash"]},"snorlaxgmax":{"level":83,"moves":["bodyslam","curse","darkestlariat","earthquake","rest"],"doublesLevel":84,"doublesMoves":["bodyslam","curse","darkestlariat","highhorsepower","recycle"]},"articuno":{"level":85,"moves":["defog","freezedry","healbell","roost","toxic"],"doublesLevel":86,"doublesMoves":["freezedry","healbell","hurricane","icebeam","roost"]},"articunogalar":{"level":81,"moves":["airslash","calmmind","freezingglare","recover"],"doublesLevel":81,"doublesMoves":["calmmind","freezingglare","hurricane","recover","tailwind"],"noDynamaxMoves":["calmmind","freezingglare","hurricane","recover"]},"zapdos":{"level":78,"moves":["defog","discharge","heatwave","hurricane","roost","uturn"],"doublesLevel":79,"doublesMoves":["heatwave","hurricane","roost","tailwind","thunderbolt","voltswitch"]},"zapdosgalar":{"level":75,"moves":["bravebird","bulkup","closecombat","throatchop","uturn"],"doublesLevel":76,"doublesMoves":["bravebird","bulkup","closecombat","throatchop","thunderouskick","uturn"]},"moltres":{"level":80,"moves":["airslash","defog","fireblast","roost","uturn"],"doublesLevel":81,"doublesMoves":["bravebird","fireblast","heatwave","protect","roost","tailwind"],"noDynamaxMoves":["defog","fireblast","hurricane","roost","uturn"]},"moltresgalar":{"level":74,"moves":["fierywrath","hurricane","nastyplot","rest"],"doublesLevel":75,"doublesMoves":["fierywrath","hurricane","nastyplot","protect"],"noDynamaxMoves":["agility","fierywrath","hurricane","nastyplot","rest"]},"dragonite":{"level":76,"moves":["dragondance","dualwingbeat","earthquake","extremespeed","outrage"],"doublesLevel":82,"doublesMoves":["dragonclaw","dragondance","dualwingbeat","extremespeed","firepunch"],"noDynamaxMoves":["dragondance","dualwingbeat","earthquake","outrage","roost"]},"mewtwo":{"level":71,"moves":["fireblast","nastyplot","psystrike","recover","shadowball"],"doublesLevel":74,"doublesMoves":["aurasphere","icebeam","nastyplot","psystrike","recover"]},"mew":{"level":78,"moves":["bravebird","closecombat","dragondance","flareblitz","psychicfangs","swordsdance"],"doublesLevel":80,"doublesMoves":["fakeout","pollenpuff","psychic","stealthrock","tailwind","toxicspikes","transform"],"noDynamaxMoves":["fireblast","nastyplot","psychic","roost","stealthrock","toxicspikes"]},"noctowl":{"level":88,"moves":["defog","heatwave","hurricane","nastyplot","roost"],"doublesLevel":84,"doublesMoves":["airslash","heatwave","hypervoice","nastyplot","roost","tailwind"],"noDynamaxMoves":["defog","heatwave","hurricane","nastyplot","roost"]},"crobat":{"level":82,"moves":["bravebird","defog","roost","superfang","taunt","toxic","uturn"],"doublesLevel":86,"doublesMoves":["bravebird","defog","roost","superfang","tailwind","taunt"]},"lanturn":{"level":86,"moves":["healbell","icebeam","scald","thunderbolt","toxic","voltswitch"],"doublesLevel":90,"doublesMoves":["healbell","icebeam","protect","scald","thunderbolt","thunderwave"]},"xatu":{"level":90,"moves":["heatwave","psychic","roost","teleport","thunderwave"],"doublesLevel":88,"doublesMoves":["airslash","heatwave","lightscreen","psychic","reflect","roost","tailwind"]},"bellossom":{"level":81,"moves":["gigadrain","moonblast","quiverdance","sleeppowder","strengthsap"],"doublesLevel":86,"doublesMoves":["energyball","moonblast","quiverdance","sleeppowder","strengthsap"]},"azumarill":{"level":83,"moves":["aquajet","knockoff","liquidation","playrough","superpower"],"doublesLevel":87,"doublesMoves":["aquajet","knockoff","liquidation","playrough","protect"]},"sudowoodo":{"level":89,"moves":["earthquake","headsmash","stealthrock","suckerpunch","woodhammer"],"doublesLevel":90,"doublesMoves":["bodypress","firepunch","headsmash","protect","suckerpunch","woodhammer"]},"politoed":{"level":86,"moves":["encore","icebeam","protect","rest","scald","toxic"],"doublesLevel":84,"doublesMoves":["haze","helpinghand","icywind","protect","scald"]},"quagsire":{"level":83,"moves":["earthquake","icebeam","recover","scald","toxic"],"doublesLevel":88,"doublesMoves":["highhorsepower","protect","recover","scald","yawn"]},"espeon":{"level":82,"moves":["calmmind","dazzlinggleam","morningsun","psychic","shadowball"],"doublesLevel":84,"doublesMoves":["calmmind","dazzlinggleam","morningsun","protect","psychic","shadowball"]},"umbreon":{"level":82,"moves":["foulplay","protect","toxic","wish"],"doublesLevel":88,"doublesMoves":["foulplay","helpinghand","moonlight","protect","snarl","toxic"]},"slowking":{"level":86,"moves":["fireblast","futuresight","psyshock","scald","slackoff","teleport","toxic","trick"],"doublesLevel":88,"doublesMoves":["fireblast","icebeam","nastyplot","psychic","scald","slackoff","trickroom"]},"slowkinggalar":{"level":84,"moves":["fireblast","futuresight","psyshock","slackoff","sludgebomb","trick"],"doublesLevel":86,"doublesMoves":["fireblast","protect","psychic","sludgebomb","trick","trickroom"]},"wobbuffet":{"level":97,"moves":["charm","counter","encore","mirrorcoat"],"doublesLevel":100,"doublesMoves":["charm","counter","encore","mirrorcoat"],"noDynamaxMoves":["counter","destinybond","encore","mirrorcoat"]},"dunsparce":{"level":91,"moves":["bodyslam","coil","earthquake","roost"],"doublesLevel":90,"doublesMoves":["glare","headbutt","protect","rockslide"]},"steelix":{"level":84,"moves":["dragondance","earthquake","headsmash","heavyslam","stealthrock","toxic"],"doublesLevel":88,"doublesMoves":["headsmash","heavyslam","highhorsepower","protect","rockpolish"],"noDynamaxMoves":["curse","earthquake","headsmash","heavyslam","stealthrock","toxic"]},"qwilfish":{"level":85,"moves":["destinybond","spikes","taunt","thunderwave","toxicspikes","waterfall"],"doublesLevel":88,"doublesMoves":["liquidation","poisonjab","protect","taunt","thunderwave","toxicspikes"]},"scizor":{"level":79,"moves":["bulletpunch","dualwingbeat","knockoff","roost","superpower","swordsdance","uturn"],"doublesLevel":80,"doublesMoves":["bugbite","bulletpunch","dualwingbeat","feint","protect","superpower","swordsdance","uturn"],"noDynamaxMoves":["bulletpunch","knockoff","roost","superpower","swordsdance","uturn"]},"shuckle":{"level":87,"moves":["encore","knockoff","stealthrock","stickyweb","toxic"],"doublesLevel":100,"doublesMoves":["acupressure","guardsplit","helpinghand","infestation","knockoff","stealthrock","stickyweb","toxic"]},"heracross":{"level":80,"moves":["closecombat","facade","knockoff","megahorn"],"doublesLevel":84,"doublesMoves":["closecombat","facade","knockoff","megahorn","protect","swordsdance"]},"corsola":{"level":96,"moves":["powergem","recover","scald","stealthrock","toxic"],"doublesLevel":95,"doublesMoves":["icywind","lifedew","recover","scald","toxic"]},"corsolagalar":{"level":84,"moves":["haze","nightshade","stealthrock","strengthsap","willowisp"]},"octillery":{"level":90,"moves":["energyball","fireblast","gunkshot","hydropump","icebeam","scald","thunderwave"],"doublesLevel":90,"doublesMoves":["fireblast","gunkshot","hydropump","icebeam","protect","thunderwave"]},"delibird":{"level":100,"moves":["freezedry","memento","rapidspin","spikes"],"doublesLevel":100,"doublesMoves":["bravebird","defog","fakeout","helpinghand","icepunch","memento","tailwind"]},"mantine":{"level":86,"moves":["defog","hurricane","icebeam","roost","scald","toxic"],"doublesLevel":88,"doublesMoves":["haze","helpinghand","hurricane","roost","scald","tailwind"]},"skarmory":{"level":82,"moves":["bodypress","bravebird","roost","spikes","stealthrock","whirlwind"],"doublesLevel":84,"doublesMoves":["bodypress","bravebird","irondefense","roost"]},"kingdra":{"level":83,"moves":["dracometeor","flipturn","hurricane","hydropump","raindance"],"doublesLevel":82,"doublesMoves":["dracometeor","hurricane","hydropump","icebeam","muddywater","raindance"],"noDynamaxMoves":["dracometeor","flipturn","hydropump","icebeam","raindance"]},"porygon2":{"level":82,"moves":["discharge","icebeam","recover","toxic","triattack"],"doublesLevel":83,"doublesMoves":["icebeam","recover","thunderbolt","toxic","triattack","trickroom"]},"hitmontop":{"level":86,"moves":["closecombat","earthquake","rapidspin","suckerpunch","toxic","tripleaxel"],"doublesLevel":88,"doublesMoves":["closecombat","coaching","fakeout","helpinghand","rapidspin","suckerpunch","tripleaxel"]},"miltank":{"level":83,"moves":["bodyslam","earthquake","healbell","milkdrink","stealthrock","toxic"],"doublesLevel":86,"doublesMoves":["bodypress","bodyslam","helpinghand","icywind","milkdrink","protect","rockslide"]},"blissey":{"level":83,"moves":["seismictoss","softboiled","stealthrock","teleport","toxic"],"doublesLevel":88,"doublesMoves":["allyswitch","healpulse","helpinghand","protect","seismictoss","softboiled","thunderwave","toxic"]},"raikou":{"level":79,"moves":["aurasphere","calmmind","scald","substitute","thunderbolt","voltswitch"],"doublesLevel":82,"doublesMoves":["aurasphere","calmmind","protect","scald","snarl","thunderbolt","voltswitch"]},"entei":{"level":77,"moves":["extremespeed","flareblitz","sacredfire","stompingtantrum","stoneedge"],"doublesLevel":79,"doublesMoves":["extremespeed","protect","sacredfire","snarl","stompingtantrum","stoneedge"]},"suicune":{"level":79,"moves":["airslash","calmmind","icebeam","rest","scald","sleeptalk"],"doublesLevel":82,"doublesMoves":["calmmind","icebeam","scald","snarl","tailwind"],"noDynamaxMoves":["calmmind","icebeam","rest","scald","sleeptalk"]},"tyranitar":{"level":78,"moves":["crunch","dragondance","earthquake","firepunch","stealthrock","stoneedge"],"doublesLevel":80,"doublesMoves":["dragondance","firepunch","highhorsepower","lashout","protect","rockslide","stoneedge"]},"lugia":{"level":72,"moves":["airslash","earthquake","roost","substitute","toxic"],"doublesLevel":72,"doublesMoves":["aeroblast","calmmind","psyshock","roost","toxic"]},"hooh":{"level":71,"moves":["bravebird","defog","earthquake","roost","sacredfire","toxic"],"doublesLevel":72,"doublesMoves":["bravebird","earthpower","protect","roost","sacredfire","tailwind"]},"celebi":{"level":82,"moves":["earthpower","gigadrain","leafstorm","nastyplot","psychic","recover","stealthrock","uturn"],"doublesLevel":84,"doublesMoves":["earthpower","energyball","nastyplot","protect","psychic","recover"]},"sceptile":{"level":86,"moves":["earthquake","focusblast","gigadrain","leafstorm","leechseed","rockslide","substitute"],"doublesLevel":88,"doublesMoves":["breakingswipe","energyball","focusblast","leafstorm"]},"blaziken":{"level":75,"moves":["closecombat","flareblitz","knockoff","stoneedge","swordsdance"],"doublesLevel":78,"doublesMoves":["closecombat","flareblitz","knockoff","protect","swordsdance"]},"swampert":{"level":80,"moves":["earthquake","flipturn","icebeam","protect","scald","stealthrock","toxic"],"doublesLevel":86,"doublesMoves":["highhorsepower","icywind","muddywater","protect","stealthrock","wideguard"]},"linoone":{"level":85,"moves":["bellydrum","extremespeed","stompingtantrum","throatchop"],"doublesLevel":90,"doublesMoves":["bellydrum","extremespeed","protect","throatchop"]},"ludicolo":{"level":86,"moves":["gigadrain","hydropump","icebeam","raindance","scald"],"doublesLevel":86,"doublesMoves":["energyball","fakeout","hydropump","icebeam","raindance"]},"shiftry":{"level":87,"moves":["darkpulse","defog","heatwave","leafstorm","nastyplot","suckerpunch"],"doublesLevel":88,"doublesMoves":["defog","fakeout","knockoff","leafblade","suckerpunch","tailwind"],"noDynamaxMoves":["defog","knockoff","leafblade","lowkick","rockslide","suckerpunch","swordsdance"]},"pelipper":{"level":86,"moves":["defog","hurricane","hydropump","roost","scald","uturn"],"doublesLevel":83,"doublesMoves":["hurricane","hydropump","protect","roost","tailwind","wideguard"]},"gardevoir":{"level":82,"moves":["calmmind","moonblast","mysticalfire","psyshock","substitute","trick","willowisp"],"doublesLevel":84,"doublesMoves":["calmmind","dazzlinggleam","moonblast","mysticalfire","protect","psyshock","trick"]},"ninjask":{"level":86,"moves":["acrobatics","leechlife","swordsdance","uturn"],"doublesLevel":88,"doublesMoves":["acrobatics","defog","leechlife","protect","swordsdance"]},"shedinja":{"level":91,"moves":["poltergeist","shadowsneak","swordsdance","willowisp","xscissor"],"doublesLevel":95,"doublesMoves":["poltergeist","protect","shadowsneak","swordsdance","willowisp","xscissor"]},"exploud":{"level":84,"moves":["boomburst","fireblast","focusblast","surf"],"doublesLevel":88,"doublesMoves":["boomburst","fireblast","focusblast","hypervoice","icywind","protect"]},"sableye":{"level":89,"moves":["knockoff","recover","taunt","toxic","willowisp"],"doublesLevel":88,"doublesMoves":["disable","encore","fakeout","foulplay","knockoff","quash","recover","willowisp"],"noDynamaxMoves":["encore","knockoff","recover","taunt","toxic","willowisp"]},"mawile":{"level":89,"moves":["ironhead","playrough","stealthrock","suckerpunch","swordsdance"],"doublesLevel":88,"doublesMoves":["firefang","ironhead","playrough","protect","suckerpunch","swordsdance"]},"aggron":{"level":86,"moves":["bodypress","earthquake","headsmash","heavyslam","rockpolish","stealthrock"],"doublesLevel":89,"doublesMoves":["aquatail","bodypress","headsmash","heavyslam","highhorsepower","rockpolish"]},"manectric":{"level":87,"moves":["flamethrower","overheat","switcheroo","thunderbolt","voltswitch"],"doublesLevel":88,"doublesMoves":["overheat","protect","snarl","thunderbolt","voltswitch"]},"sharpedo":{"level":81,"moves":["closecombat","crunch","hydropump","protect"],"doublesLevel":84,"doublesMoves":["closecombat","crunch","flipturn","icebeam","protect","waterfall"]},"wailord":{"level":91,"moves":["hydropump","hypervoice","icebeam","waterspout"],"doublesLevel":88,"doublesMoves":["hydropump","heavyslam","icebeam","waterspout"]},"torkoal":{"level":87,"moves":["earthquake","lavaplume","rapidspin","solarbeam","stealthrock"],"doublesLevel":84,"doublesMoves":["bodypress","earthpower","fireblast","heatwave","protect","solarbeam","willowisp"]},"flygon":{"level":80,"moves":["defog","dragondance","earthquake","firepunch","outrage","uturn"],"doublesLevel":86,"doublesMoves":["dragonclaw","dragondance","earthquake","firepunch","protect","rockslide","tailwind"]},"altaria":{"level":91,"moves":["defog","dracometeor","earthquake","fireblast","roost","toxic"],"doublesLevel":92,"doublesMoves":["defog","dracometeor","fireblast","roost","tailwind","toxic"]},"lunatone":{"level":88,"moves":["earthpower","moonblast","nastyplot","powergem","psychic","stealthrock"],"doublesLevel":88,"doublesMoves":["earthpower","icebeam","meteorbeam","protect","psychic","trickroom"]},"solrock":{"level":89,"moves":["earthquake","explosion","morningsun","rockslide","stealthrock","willowisp"],"doublesLevel":88,"doublesMoves":["flareblitz","helpinghand","rockslide","stoneedge","willowisp"]},"whiscash":{"level":88,"moves":["dragondance","earthquake","liquidation","stoneedge","zenheadbutt"],"doublesLevel":90,"doublesMoves":["dragondance","earthquake","liquidation","protect","stoneedge"]},"crawdaunt":{"level":85,"moves":["aquajet","closecombat","crabhammer","dragondance","knockoff"],"doublesLevel":86,"doublesMoves":["aquajet","closecombat","crabhammer","knockoff","protect","swordsdance"]},"claydol":{"level":87,"moves":["earthquake","icebeam","psychic","rapidspin","stealthrock","toxic"],"doublesLevel":88,"doublesMoves":["allyswitch","earthpower","icebeam","psychic","rapidspin"]},"cradily":{"level":85,"moves":["powerwhip","recover","stealthrock","stoneedge","swordsdance","toxic"],"doublesLevel":88,"doublesMoves":["powerwhip","protect","recover","stealthrock","stoneedge","stringshot"]},"armaldo":{"level":88,"moves":["earthquake","knockoff","liquidation","rapidspin","stealthrock","stoneedge","swordsdance"],"doublesLevel":88,"doublesMoves":["knockoff","liquidation","stoneedge","superpower","xscissor"],"noDynamaxMoves":["earthquake","knockoff","rapidspin","stealthrock","stoneedge","swordsdance"]},"milotic":{"level":82,"moves":["haze","icebeam","recover","scald","toxic"],"doublesLevel":80,"doublesMoves":["coil","hypnosis","muddywater","recover"]},"absol":{"level":84,"moves":["closecombat","knockoff","playrough","suckerpunch","swordsdance"],"doublesLevel":88,"doublesMoves":["closecombat","knockoff","protect","suckerpunch","swordsdance"]},"glalie":{"level":94,"moves":["earthquake","freezedry","spikes","superfang","taunt"],"doublesLevel":94,"doublesMoves":["disable","foulplay","freezedry","helpinghand","icywind","protect"]},"walrein":{"level":86,"moves":["icebeam","protect","surf","toxic"],"doublesLevel":86,"doublesMoves":["brine","icebeam","icywind","superfang"]},"relicanth":{"level":88,"moves":["bodypress","earthquake","headsmash","liquidation","stealthrock","yawn"],"doublesLevel":88,"doublesMoves":["bodypress","headsmash","liquidation","stealthrock","yawn"]},"salamence":{"level":74,"moves":["dragondance","dualwingbeat","earthquake","outrage","roost"],"doublesLevel":79,"doublesMoves":["dragonclaw","fireblast","hurricane","protect","tailwind"]},"metagross":{"level":78,"moves":["agility","bulletpunch","earthquake","explosion","meteormash","stealthrock","thunderpunch"],"doublesLevel":82,"doublesMoves":["agility","bulletpunch","icepunch","meteormash","stompingtantrum","trick","zenheadbutt"]},"regirock":{"level":86,"moves":["bodypress","curse","earthquake","explosion","rest","rockslide","stoneedge"],"doublesLevel":86,"doublesMoves":["bodypress","curse","rest","rockslide"]},"regice":{"level":85,"moves":["focusblast","icebeam","rest","rockpolish","sleeptalk","thunderbolt"],"doublesLevel":87,"doublesMoves":["focusblast","icebeam","icywind","rockpolish","thunderbolt"]},"registeel":{"level":83,"moves":["bodypress","curse","ironhead","protect","rest","sleeptalk","stealthrock","toxic"],"doublesLevel":86,"doublesMoves":["bodypress","curse","ironhead","rest","toxic"]},"latias":{"level":80,"moves":["calmmind","dracometeor","healingwish","mysticalfire","psychic","roost"],"doublesLevel":82,"doublesMoves":["calmmind","dracometeor","healpulse","mysticalfire","psyshock","roost","tailwind"]},"latios":{"level":77,"moves":["calmmind","dracometeor","mysticalfire","psyshock","roost","trick"],"doublesLevel":80,"doublesMoves":["dracometeor","mysticalfire","psychic","psyshock","roost","tailwind","trick"]},"kyogre":{"level":70,"moves":["calmmind","icebeam","originpulse","thunder","waterspout"],"doublesLevel":69,"doublesMoves":["icebeam","originpulse","thunder","waterspout"]},"groudon":{"level":71,"moves":["heatcrash","heavyslam","precipiceblades","stealthrock","stoneedge","swordsdance","thunderwave"],"doublesLevel":72,"doublesMoves":["heatcrash","precipiceblades","rockpolish","stoneedge","swordsdance"],"noDynamaxMoves":["heatcrash","precipiceblades","stealthrock","stoneedge","swordsdance","thunderwave"]},"rayquaza":{"level":73,"moves":["dracometeor","dragonascent","dragondance","earthquake","extremespeed","swordsdance","vcreate"],"doublesLevel":74,"doublesMoves":["dracometeor","dragonascent","dragonclaw","dragondance","earthpower","extremespeed","vcreate"],"noDynamaxMoves":["dracometeor","dragonascent","dragondance","earthquake","extremespeed","vcreate"]},"jirachi":{"level":79,"moves":["bodyslam","firepunch","ironhead","stealthrock","toxic","trick","uturn"],"doublesLevel":77,"doublesMoves":["firepunch","followme","ironhead","lifedew","protect","thunderwave"]},"luxray":{"level":86,"moves":["agility","crunch","facade","superpower","voltswitch","wildcharge"],"doublesLevel":84,"doublesMoves":["playrough","protect","superpower","voltswitch","wildcharge"]},"roserade":{"level":84,"moves":["leafstorm","sleeppowder","sludgebomb","spikes","synthesis","toxicspikes"],"doublesLevel":86,"doublesMoves":["energyball","leafstorm","protect","sleeppowder","sludgebomb"]},"vespiquen":{"level":97,"moves":["airslash","defog","roost","toxic","uturn"],"doublesLevel":98,"doublesMoves":["airslash","roost","tailwind","toxicspikes"]},"cherrim":{"level":94,"moves":["dazzlinggleam","energyball","healingwish","petaldance","pollenpuff"],"doublesLevel":92,"doublesMoves":["energyball","healingwish","helpinghand","pollenpuff"]},"cherrimsunshine":{"doublesLevel":92,"doublesMoves":["playrough","solarblade","sunnyday","weatherball"]},"gastrodon":{"level":85,"moves":["clearsmog","earthquake","icebeam","recover","scald","toxic"],"doublesLevel":80,"doublesMoves":["clearsmog","earthpower","icywind","recover","scald","yawn"]},"drifblim":{"level":84,"moves":["calmmind","shadowball","strengthsap","thunderbolt"],"doublesLevel":84,"doublesMoves":["calmmind","icywind","shadowball","strengthsap"]},"lopunny":{"level":93,"moves":["closecombat","facade","healingwish","switcheroo"],"doublesLevel":92,"doublesMoves":["closecombat","fakeout","switcheroo","uturn"]},"skuntank":{"level":84,"moves":["crunch","defog","fireblast","poisonjab","suckerpunch","taunt","toxic"],"doublesLevel":88,"doublesMoves":["crunch","defog","fireblast","poisonjab","suckerpunch","taunt"]},"bronzong":{"level":84,"moves":["earthquake","ironhead","protect","stealthrock","toxic"],"doublesLevel":88,"doublesMoves":["allyswitch","bodypress","ironhead","trickroom"]},"spiritomb":{"level":88,"moves":["foulplay","poltergeist","shadowsneak","suckerpunch","trick"],"doublesLevel":88,"doublesMoves":["foulplay","poltergeist","protect","snarl","suckerpunch","willowisp"]},"garchomp":{"level":74,"moves":["earthquake","fireblast","firefang","outrage","stealthrock","stoneedge","swordsdance"],"doublesLevel":80,"doublesMoves":["dragonclaw","earthquake","fireblast","protect","rockslide","swordsdance"]},"lucario":{"level":81,"moves":["closecombat","extremespeed","meteormash","stoneedge","swordsdance"],"doublesLevel":84,"doublesMoves":["closecombat","extremespeed","icepunch","meteormash","protect","swordsdance"]},"hippowdon":{"level":81,"moves":["earthquake","slackoff","stealthrock","stoneedge","toxic","whirlwind"],"doublesLevel":88,"doublesMoves":["highhorsepower","slackoff","stealthrock","whirlwind","yawn"]},"drapion":{"level":82,"moves":["aquatail","earthquake","knockoff","poisonjab","swordsdance","taunt","toxicspikes"],"doublesLevel":88,"doublesMoves":["knockoff","poisonjab","protect","swordsdance","taunt"]},"toxicroak":{"level":84,"moves":["drainpunch","gunkshot","icepunch","knockoff","substitute","suckerpunch","swordsdance"],"doublesLevel":86,"doublesMoves":["drainpunch","fakeout","gunkshot","protect","suckerpunch","swordsdance","taunt"]},"abomasnow":{"level":82,"moves":["auroraveil","blizzard","earthquake","iceshard","woodhammer"],"doublesLevel":88,"doublesMoves":["auroraveil","blizzard","iceshard","protect","woodhammer"]},"weavile":{"level":79,"moves":["iceshard","knockoff","lowkick","swordsdance","tripleaxel"],"doublesLevel":84,"doublesMoves":["fakeout","iceshard","knockoff","lowkick","tripleaxel"]},"magnezone":{"level":83,"moves":["bodypress","flashcannon","mirrorcoat","thunderbolt","voltswitch"],"doublesLevel":88,"doublesMoves":["bodypress","electroweb","flashcannon","protect","thunderbolt","voltswitch"]},"lickilicky":{"level":86,"moves":["bodyslam","earthquake","explosion","healbell","knockoff","protect","swordsdance","wish"],"doublesLevel":88,"doublesMoves":["bodyslam","explosion","helpinghand","icywind","knockoff"]},"rhyperior":{"level":81,"moves":["earthquake","firepunch","megahorn","rockpolish","stoneedge"],"doublesLevel":84,"doublesMoves":["highhorsepower","icepunch","megahorn","protect","rockslide","stoneedge"]},"tangrowth":{"level":84,"moves":["earthquake","gigadrain","knockoff","leechseed","sleeppowder","sludgebomb"],"doublesLevel":85,"doublesMoves":["focusblast","knockoff","powerwhip","ragepowder","sleeppowder"]},"electivire":{"level":81,"moves":["crosschop","earthquake","flamethrower","icepunch","voltswitch","wildcharge"],"doublesLevel":88,"doublesMoves":["crosschop","flamethrower","icepunch","stompingtantrum","wildcharge"]},"magmortar":{"level":87,"moves":["earthquake","fireblast","focusblast","psychic","taunt","thunderbolt"],"doublesLevel":88,"doublesMoves":["fireblast","focusblast","heatwave","protect","thunderbolt"]},"togekiss":{"level":80,"moves":["airslash","aurasphere","fireblast","nastyplot","roost","thunderwave","trick"],"doublesLevel":80,"doublesMoves":["airslash","dazzlinggleam","followme","helpinghand","protect","tailwind"]},"leafeon":{"level":87,"moves":["doubleedge","knockoff","leafblade","swordsdance","synthesis","xscissor"],"doublesLevel":86,"doublesMoves":["doubleedge","knockoff","leafblade","protect","swordsdance"]},"glaceon":{"level":89,"moves":["freezedry","protect","toxic","wish"],"doublesLevel":88,"doublesMoves":["blizzard","freezedry","helpinghand","protect","shadowball","wish"]},"mamoswine":{"level":80,"moves":["earthquake","iceshard","iciclecrash","knockoff","stealthrock","superpower"],"doublesLevel":83,"doublesMoves":["highhorsepower","iceshard","iciclecrash","protect","rockslide"]},"porygonz":{"level":80,"moves":["darkpulse","icebeam","nastyplot","thunderbolt","triattack","trick"],"doublesLevel":84,"doublesMoves":["darkpulse","icebeam","protect","thunderbolt","triattack","trick"],"noDynamaxMoves":["icebeam","nastyplot","shadowball","thunderbolt","triattack","trick"]},"gallade":{"level":82,"moves":["closecombat","knockoff","shadowsneak","swordsdance","trick","zenheadbutt"],"doublesLevel":86,"doublesMoves":["closecombat","feint","knockoff","protect","swordsdance","tripleaxel","zenheadbutt"]},"dusknoir":{"level":87,"moves":["earthquake","icepunch","painsplit","poltergeist","shadowsneak","trick","willowisp"],"doublesLevel":86,"doublesMoves":["earthquake","haze","icepunch","poltergeist","shadowsneak","trickroom","willowisp"]},"froslass":{"level":84,"moves":["destinybond","poltergeist","spikes","taunt","tripleaxel","willowisp"],"doublesLevel":88,"doublesMoves":["destinybond","icebeam","icywind","protect","shadowball","willowisp"]},"rotom":{"level":85,"moves":["nastyplot","shadowball","thunderbolt","voltswitch","willowisp"],"doublesLevel":88,"doublesMoves":["electroweb","protect","shadowball","thunderbolt","voltswitch","willowisp"]},"rotomheat":{"level":82,"moves":["defog","nastyplot","overheat","thunderbolt","voltswitch","willowisp"],"doublesLevel":84,"doublesMoves":["electroweb","overheat","protect","thunderbolt","voltswitch","willowisp"]},"rotomwash":{"level":82,"moves":["hydropump","thunderbolt","trick","voltswitch","willowisp"],"doublesLevel":84,"doublesMoves":["hydropump","protect","thunderbolt","thunderwave","voltswitch","willowisp"]},"rotomfrost":{"level":81,"moves":["blizzard","nastyplot","thunderbolt","voltswitch","willowisp"],"doublesLevel":86,"doublesMoves":["blizzard","nastyplot","protect","thunderbolt","willowisp"]},"rotomfan":{"level":84,"moves":["airslash","nastyplot","thunderbolt","voltswitch","willowisp"],"doublesLevel":84,"doublesMoves":["airslash","nastyplot","protect","thunderbolt"]},"rotommow":{"level":84,"moves":["leafstorm","nastyplot","thunderbolt","trick","voltswitch","willowisp"],"doublesLevel":88,"doublesMoves":["electroweb","leafstorm","protect","thunderbolt","voltswitch","willowisp"]},"uxie":{"level":82,"moves":["healbell","knockoff","psychic","stealthrock","uturn","yawn"],"doublesLevel":86,"doublesMoves":["helpinghand","knockoff","psychic","stealthrock","thunderwave","uturn","yawn"]},"mesprit":{"level":84,"moves":["energyball","healingwish","icebeam","nastyplot","psychic","stealthrock","thunderwave","uturn"],"doublesLevel":86,"doublesMoves":["dazzlinggleam","knockoff","nastyplot","psychic","thunderbolt","thunderwave"]},"azelf":{"level":81,"moves":["dazzlinggleam","fireblast","nastyplot","psychic","psyshock","stealthrock","taunt","uturn"],"doublesLevel":84,"doublesMoves":["energyball","fireblast","nastyplot","psychic","shadowball","uturn"]},"dialga":{"level":73,"moves":["dracometeor","fireblast","flashcannon","stealthrock","thunderbolt","toxic"],"doublesLevel":74,"doublesMoves":["dracometeor","earthpower","fireblast","flashcannon","protect","thunderbolt","thunderwave"]},"palkia":{"level":74,"moves":["dracometeor","fireblast","hydropump","spacialrend","thunderwave"],"doublesLevel":74,"doublesMoves":["fireblast","hydropump","protect","spacialrend","thunderbolt","thunderwave"]},"heatran":{"level":78,"moves":["earthpower","flashcannon","lavaplume","protect","stealthrock","taunt","toxic"],"doublesLevel":80,"doublesMoves":["earthpower","eruption","flashcannon","heatwave","protect"]},"regigigas":{"level":82,"moves":["bodyslam","protect","substitute","toxic"],"doublesLevel":86,"doublesMoves":["bodyslam","knockoff","protect","thunderwave"]},"giratinaorigin":{"level":74,"moves":["dualwingbeat","honeclaws","outrage","poltergeist","shadowsneak"],"doublesLevel":74,"doublesMoves":["dracometeor","protect","shadowball","shadowsneak","tailwind","willowisp"],"noDynamaxMoves":["defog","dracometeor","earthquake","poltergeist","shadowsneak","willowisp"]},"giratina":{"level":74,"moves":["hex","rest","sleeptalk","toxic","willowisp"],"doublesLevel":74,"doublesMoves":["calmmind","dragonpulse","rest","shadowball","willowisp"]},"cresselia":{"level":80,"moves":["calmmind","moonblast","moonlight","psyshock","thunderwave","toxic"],"doublesLevel":83,"doublesMoves":["helpinghand","icywind","moonblast","moonlight","psychic","thunderwave"]},"victini":{"level":77,"moves":["blueflare","boltstrike","energyball","glaciate","uturn","vcreate","zenheadbutt"],"doublesLevel":81,"doublesMoves":["boltstrike","glaciate","protect","uturn","vcreate","zenheadbutt"]},"stoutland":{"level":87,"moves":["crunch","facade","playrough","superpower","wildcharge"],"doublesLevel":90,"doublesMoves":["facade","helpinghand","superpower","thunderwave"]},"liepard":{"level":89,"moves":["copycat","encore","knockoff","playrough","thunderwave","uturn"],"doublesLevel":88,"doublesMoves":["copycat","encore","fakeout","foulplay","snarl","taunt","thunderwave"]},"musharna":{"level":86,"moves":["calmmind","moonblast","moonlight","psychic","thunderwave"],"doublesLevel":88,"doublesMoves":["helpinghand","hypnosis","moonblast","psychic","trickroom"]},"unfezant":{"level":84,"moves":["bravebird","defog","nightslash","roost","uturn"],"doublesLevel":86,"doublesMoves":["bravebird","nightslash","quickattack","tailwind","uturn"]},"gigalith":{"level":83,"moves":["earthquake","explosion","stealthrock","stoneedge","superpower"],"doublesLevel":88,"doublesMoves":["bodypress","explosion","protect","rockslide","stealthrock","stompingtantrum","stoneedge","wideguard"]},"swoobat":{"level":88,"moves":["airslash","calmmind","heatwave","roost","storedpower"],"doublesLevel":86,"doublesMoves":["airslash","calmmind","heatwave","psychic"]},"excadrill":{"level":77,"moves":["earthquake","ironhead","rapidspin","rockslide","swordsdance"],"doublesLevel":80,"doublesMoves":["highhorsepower","ironhead","protect","rapidspin","rockslide","swordsdance"]},"audino":{"level":92,"moves":["healbell","knockoff","protect","toxic","wish"],"doublesLevel":90,"doublesMoves":["bodyslam","healpulse","helpinghand","knockoff","protect","thunderwave"]},"gurdurr":{"level":83,"moves":["bulkup","defog","drainpunch","knockoff","machpunch"]},"conkeldurr":{"level":79,"moves":["closecombat","drainpunch","facade","knockoff","machpunch"],"doublesLevel":84,"doublesMoves":["closecombat","drainpunch","icepunch","knockoff","machpunch","protect"]},"seismitoad":{"level":83,"moves":["earthquake","liquidation","raindance","sludgebomb","stealthrock"],"doublesLevel":86,"doublesMoves":["earthpower","knockoff","muddywater","powerwhip","protect","raindance"]},"throh":{"level":86,"moves":["bulkup","circlethrow","icepunch","knockoff","rest","sleeptalk","stormthrow"],"doublesLevel":86,"doublesMoves":["facade","knockoff","protect","stormthrow","wideguard"]},"sawk":{"level":85,"moves":["bulkup","closecombat","knockoff","poisonjab","stoneedge"],"doublesLevel":86,"doublesMoves":["closecombat","helpinghand","knockoff","poisonjab","protect","rockslide"]},"scolipede":{"level":79,"moves":["earthquake","megahorn","poisonjab","protect","spikes","swordsdance","toxicspikes"],"doublesLevel":84,"doublesMoves":["megahorn","poisonjab","protect","rockslide","superpower","swordsdance"]},"whimsicott":{"level":84,"moves":["defog","energyball","leechseed","moonblast","stunspore","taunt","uturn"],"doublesLevel":82,"doublesMoves":["encore","energyball","helpinghand","moonblast","tailwind","taunt"],"noDynamaxMoves":["defog","encore","energyball","leechseed","moonblast","stunspore","taunt","uturn"]},"lilligant":{"level":84,"moves":["gigadrain","petaldance","pollenpuff","quiverdance","sleeppowder"],"doublesLevel":84,"doublesMoves":["energyball","pollenpuff","quiverdance","sleeppowder"]},"basculin":{"level":85,"moves":["aquajet","crunch","flipturn","liquidation","psychicfangs","superpower"],"doublesLevel":86,"doublesMoves":["flipturn","liquidation","muddywater","protect","superpower"]},"krookodile":{"level":78,"moves":["closecombat","earthquake","knockoff","stealthrock","stoneedge"],"doublesLevel":81,"doublesMoves":["closecombat","highhorsepower","knockoff","protect","rockslide","taunt"]},"darmanitan":{"level":79,"moves":["earthquake","flareblitz","rockslide","superpower","uturn"],"doublesLevel":82,"doublesMoves":["earthquake","flareblitz","protect","rockslide","superpower","uturn"]},"darmanitangalar":{"level":78,"moves":["earthquake","flareblitz","iciclecrash","superpower","uturn"],"doublesLevel":80,"doublesMoves":["flareblitz","iciclecrash","rockslide","superpower","uturn"]},"darmanitangalarzen":{"level":78,"moves":["bellydrum","earthquake","firepunch","iciclecrash","substitute"]},"maractus":{"level":96,"moves":["energyball","knockoff","leechseed","spikes","spikyshield","toxic"],"doublesLevel":96,"doublesMoves":["acupressure","helpinghand","leafstorm","leechseed","spikyshield"]},"crustle":{"level":83,"moves":["earthquake","shellsmash","spikes","stealthrock","stoneedge","xscissor"],"doublesLevel":84,"doublesMoves":["knockoff","protect","rockslide","shellsmash","xscissor"]},"scrafty":{"level":83,"moves":["closecombat","dragondance","icepunch","knockoff","poisonjab"],"doublesLevel":84,"doublesMoves":["closecombat","coaching","drainpunch","fakeout","icepunch","knockoff"]},"sigilyph":{"level":83,"moves":["airslash","defog","energyball","heatwave","psychic"],"doublesLevel":86,"doublesMoves":["airslash","heatwave","protect","psychic","tailwind"]},"cofagrigus":{"level":87,"moves":["bodypress","memento","shadowball","toxicspikes","willowisp"],"doublesLevel":88,"doublesMoves":["bodypress","irondefense","painsplit","shadowball","trickroom","willowisp"]},"carracosta":{"level":83,"moves":["aquajet","hydropump","shellsmash","stoneedge","superpower"],"doublesLevel":88,"doublesMoves":["aquajet","liquidation","shellsmash","stoneedge","superpower"]},"archeops":{"level":82,"moves":["dualwingbeat","earthquake","roost","stoneedge","uturn"],"doublesLevel":86,"doublesMoves":["aquatail","dualwingbeat","earthquake","protect","rockslide","uturn"]},"garbodorgmax":{"level":87,"moves":["explosion","gunkshot","painsplit","spikes","stompingtantrum","toxicspikes"],"doublesLevel":90,"doublesMoves":["drainpunch","explosion","gunkshot","protect","toxicspikes"]},"zoroark":{"level":84,"moves":["darkpulse","flamethrower","nastyplot","sludgebomb","trick"],"doublesLevel":84,"doublesMoves":["darkpulse","flamethrower","focusblast","nastyplot","protect","sludgebomb"]},"cinccino":{"level":84,"moves":["bulletseed","knockoff","rockblast","tailslap","uturn"],"doublesLevel":86,"doublesMoves":["bulletseed","knockoff","protect","rockblast","tailslap","tripleaxel","uturn"]},"gothitelle":{"level":87,"moves":["darkpulse","nastyplot","psychic","thunderbolt","trick"],"doublesLevel":83,"doublesMoves":["fakeout","healpulse","helpinghand","hypnosis","protect","psychic","trickroom"]},"reuniclus":{"level":84,"moves":["calmmind","focusblast","psychic","recover","shadowball","trickroom"],"doublesLevel":84,"doublesMoves":["focusblast","protect","psychic","shadowball","trickroom"]},"vanilluxe":{"level":82,"moves":["auroraveil","blizzard","explosion","flashcannon","freezedry"],"doublesLevel":82,"doublesMoves":["auroraveil","blizzard","explosion","freezedry","protect"]},"emolga":{"level":90,"moves":["airslash","defog","energyball","roost","thunderbolt","toxic","uturn"],"doublesLevel":88,"doublesMoves":["acrobatics","helpinghand","nuzzle","tailwind","taunt","voltswitch"]},"escavalier":{"level":84,"moves":["closecombat","drillrun","ironhead","knockoff","megahorn","swordsdance"],"doublesLevel":86,"doublesMoves":["closecombat","drillrun","ironhead","knockoff","megahorn","protect","swordsdance"]},"amoonguss":{"level":83,"moves":["gigadrain","sludgebomb","spore","synthesis","toxic"],"doublesLevel":81,"doublesMoves":["clearsmog","pollenpuff","protect","ragepowder","spore"]},"jellicent":{"level":85,"moves":["icebeam","recover","scald","shadowball","toxic","willowisp"],"doublesLevel":84,"doublesMoves":["scald","shadowball","strengthsap","trickroom","willowisp"]},"galvantula":{"level":81,"moves":["bugbuzz","gigadrain","stickyweb","thunder","voltswitch"],"doublesLevel":85,"doublesMoves":["bugbuzz","electroweb","energyball","protect","stickyweb","thunder"]},"ferrothorn":{"level":77,"moves":["gyroball","knockoff","leechseed","powerwhip","protect","spikes","stealthrock"],"doublesLevel":83,"doublesMoves":["bodypress","gyroball","leechseed","powerwhip","protect","toxic"]},"klinklang":{"level":84,"moves":["geargrind","shiftgear","substitute","wildcharge"],"doublesLevel":88,"doublesMoves":["geargrind","protect","shiftgear","wildcharge"]},"beheeyem":{"level":88,"moves":["darkpulse","psychic","thunderbolt","trick","trickroom"],"doublesLevel":88,"doublesMoves":["protect","psychic","shadowball","thunderbolt","trickroom"]},"chandelure":{"level":82,"moves":["calmmind","energyball","fireblast","shadowball","substitute","trick"],"doublesLevel":80,"doublesMoves":["calmmind","energyball","heatwave","overheat","protect","shadowball","trick"]},"haxorus":{"level":77,"moves":["closecombat","dragondance","earthquake","outrage","poisonjab"],"doublesLevel":84,"doublesMoves":["closecombat","dragonclaw","dragondance","poisonjab","protect"]},"beartic":{"level":86,"moves":["aquajet","iciclecrash","stoneedge","superpower","swordsdance"],"doublesLevel":86,"doublesMoves":["aquajet","iciclecrash","protect","superpower","swordsdance"]},"cryogonal":{"level":86,"moves":["freezedry","haze","rapidspin","recover","toxic"],"doublesLevel":88,"doublesMoves":["freezedry","haze","icebeam","icywind","rapidspin","recover","toxic"]},"accelgor":{"level":89,"moves":["bugbuzz","energyball","focusblast","sludgebomb","spikes","toxic","yawn"],"doublesLevel":88,"doublesMoves":["acidspray","bugbuzz","encore","energyball","focusblast"],"noDynamaxMoves":["bugbuzz","encore","energyball","focusblast","spikes","toxic"]},"stunfisk":{"level":83,"moves":["discharge","earthpower","foulplay","sludgebomb","stealthrock"],"doublesLevel":88,"doublesMoves":["earthpower","electroweb","foulplay","stealthrock","thunderbolt"]},"stunfiskgalar":{"level":84,"moves":["earthquake","painsplit","stealthrock","stoneedge","thunderwave"],"doublesLevel":88,"doublesMoves":["earthquake","stealthrock","stoneedge","thunderwave","yawn"]},"mienshao":{"level":81,"moves":["closecombat","fakeout","knockoff","poisonjab","stoneedge","swordsdance","uturn"],"doublesLevel":84,"doublesMoves":["closecombat","fakeout","knockoff","poisonjab","protect","uturn"]},"druddigon":{"level":84,"moves":["earthquake","glare","gunkshot","outrage","stealthrock","suckerpunch","superpower"],"doublesLevel":87,"doublesMoves":["dragonclaw","firepunch","glare","gunkshot","protect","suckerpunch"]},"golurk":{"level":82,"moves":["dynamicpunch","earthquake","poltergeist","rockpolish","stoneedge"],"doublesLevel":86,"doublesMoves":["dynamicpunch","highhorsepower","icepunch","poltergeist","protect"]},"bisharp":{"level":80,"moves":["ironhead","knockoff","stealthrock","suckerpunch","swordsdance"],"doublesLevel":84,"doublesMoves":["ironhead","knockoff","protect","suckerpunch","swordsdance"]},"bouffalant":{"level":84,"moves":["closecombat","earthquake","headcharge","megahorn","swordsdance"],"doublesLevel":86,"doublesMoves":["closecombat","headcharge","lashout","protect","wildcharge"]},"braviary":{"level":81,"moves":["bravebird","bulkup","closecombat","roost"],"doublesLevel":82,"doublesMoves":["bravebird","bulkup","closecombat","roost","tailwind"]},"mandibuzz":{"level":82,"moves":["bravebird","defog","foulplay","roost","toxic","uturn"],"doublesLevel":88,"doublesMoves":["foulplay","roost","snarl","tailwind","taunt"]},"heatmor":{"level":91,"moves":["firelash","gigadrain","knockoff","substitute","suckerpunch","superpower"],"doublesLevel":88,"doublesMoves":["firelash","gigadrain","incinerate","protect","suckerpunch","superpower"]},"durant":{"level":78,"moves":["firstimpression","honeclaws","ironhead","rockslide","superpower"],"doublesLevel":82,"doublesMoves":["firstimpression","ironhead","protect","stompingtantrum","superpower","xscissor"]},"hydreigon":{"level":79,"moves":["darkpulse","dracometeor","fireblast","flashcannon","nastyplot","roost","uturn"],"doublesLevel":84,"doublesMoves":["darkpulse","dracometeor","dragonpulse","earthpower","fireblast","nastyplot","protect","tailwind"]},"volcarona":{"level":74,"moves":["bugbuzz","fireblast","gigadrain","quiverdance","roost"],"doublesLevel":80,"doublesMoves":["bugbuzz","gigadrain","heatwave","protect","quiverdance"]},"cobalion":{"level":78,"moves":["closecombat","ironhead","stealthrock","stoneedge","swordsdance","voltswitch"],"doublesLevel":84,"doublesMoves":["closecombat","ironhead","protect","stoneedge","swordsdance","thunderwave"]},"terrakion":{"level":78,"moves":["closecombat","earthquake","quickattack","stoneedge","swordsdance"],"doublesLevel":80,"doublesMoves":["closecombat","protect","rockslide","swordsdance"]},"virizion":{"level":81,"moves":["closecombat","leafblade","stoneedge","swordsdance"],"doublesLevel":86,"doublesMoves":["closecombat","coaching","leafblade","protect","stoneedge","swordsdance"],"noDynamaxMoves":["closecombat","leafblade","stoneedge","swordsdance"]},"tornadus":{"level":79,"moves":["defog","grassknot","heatwave","hurricane","nastyplot"],"doublesLevel":80,"doublesMoves":["heatwave","hurricane","nastyplot","superpower","tailwind","taunt"]},"tornadustherian":{"level":78,"moves":["defog","hurricane","knockoff","superpower","uturn"],"doublesLevel":80,"doublesMoves":["heatwave","hurricane","knockoff","nastyplot","protect","uturn"]},"thundurus":{"level":81,"moves":["grassknot","knockoff","nastyplot","sludgewave","superpower","thunderbolt","thunderwave"],"doublesLevel":82,"doublesMoves":["grassknot","knockoff","nastyplot","protect","sludgebomb","thunderbolt","thunderwave"]},"thundurustherian":{"level":78,"moves":["focusblast","grassknot","nastyplot","psychic","thunderbolt","voltswitch"],"doublesLevel":82,"doublesMoves":["agility","focusblast","grassknot","nastyplot","sludgebomb","thunderbolt","voltswitch"]},"reshiram":{"level":73,"moves":["blueflare","defog","dracometeor","earthpower","roost","stoneedge","toxic"],"doublesLevel":72,"doublesMoves":["blueflare","dracometeor","earthpower","heatwave","roost","tailwind"]},"zekrom":{"level":69,"moves":["boltstrike","dragondance","outrage","roost"],"doublesLevel":72,"doublesMoves":["boltstrike","dragonclaw","dragondance","roost"]},"landorus":{"level":75,"moves":["earthpower","focusblast","knockoff","rockpolish","rockslide","sludgewave","stealthrock"],"doublesLevel":80,"doublesMoves":["calmmind","earthpower","focusblast","protect","psychic","sludgebomb"]},"landorustherian":{"level":72,"moves":["earthquake","fly","stealthrock","stoneedge","swordsdance","uturn"],"doublesLevel":76,"doublesMoves":["earthquake","fly","knockoff","stoneedge","swordsdance","uturn"],"noDynamaxMoves":["earthquake","knockoff","stealthrock","stoneedge","swordsdance","uturn"]},"kyurem":{"level":79,"moves":["dracometeor","earthpower","freezedry","icebeam","roost","substitute"],"doublesLevel":78,"doublesMoves":["dracometeor","earthpower","freezedry","glaciate","protect","roost"]},"kyuremblack":{"level":70,"moves":["dragondance","fusionbolt","iciclespear","outrage"],"doublesLevel":75,"doublesMoves":["dragonclaw","dragondance","fusionbolt","iciclespear","protect"]},"kyuremwhite":{"level":73,"moves":["dracometeor","earthpower","freezedry","fusionflare","icebeam","roost"],"doublesLevel":72,"doublesMoves":["dracometeor","dragonpulse","earthpower","freezedry","fusionflare","icebeam","protect","roost"]},"keldeoresolute":{"level":77,"moves":["airslash","calmmind","hydropump","icywind","scald","secretsword","substitute"],"doublesLevel":82,"doublesMoves":["airslash","calmmind","icywind","muddywater","protect","secretsword"]},"genesect":{"level":72,"moves":["blazekick","extremespeed","ironhead","leechlife","shiftgear","thunderbolt","uturn"],"doublesLevel":78,"doublesMoves":["blazekick","ironhead","leechlife","protect","shiftgear","thunderbolt","uturn"]},"genesectdouse":{"level":72,"moves":["bugbuzz","extremespeed","flamethrower","icebeam","ironhead","technoblast","thunderbolt","uturn"]},"diggersby":{"level":80,"moves":["bodyslam","earthquake","knockoff","quickattack","swordsdance","uturn"],"doublesLevel":86,"doublesMoves":["bodyslam","highhorsepower","knockoff","quickattack","swordsdance","uturn"]},"talonflame":{"level":81,"moves":["bravebird","defog","flareblitz","roost","swordsdance","uturn"],"doublesLevel":86,"doublesMoves":["bravebird","defog","incinerate","overheat","tailwind","uturn","willowisp"]},"pangoro":{"level":85,"moves":["closecombat","gunkshot","icepunch","knockoff","partingshot"],"doublesLevel":88,"doublesMoves":["closecombat","drainpunch","gunkshot","icepunch","knockoff","protect"]},"meowstic":{"level":84,"moves":["lightscreen","psychic","reflect","thunderwave","yawn"],"doublesLevel":84,"doublesMoves":["fakeout","lightscreen","psychic","reflect","thunderwave"]},"meowsticf":{"level":86,"moves":["darkpulse","energyball","nastyplot","psychic","thunderbolt"],"doublesLevel":88,"doublesMoves":["fakeout","nastyplot","psychic","shadowball","thunderbolt"]},"doublade":{"level":81,"moves":["closecombat","ironhead","shadowclaw","shadowsneak","swordsdance"]},"aegislash":{"level":80,"moves":["closecombat","flashcannon","kingsshield","shadowball","shadowsneak","substitute","toxic"],"doublesLevel":84,"doublesMoves":["flashcannon","kingsshield","shadowball","shadowsneak"]},"aegislashblade":{"level":80,"moves":["closecombat","ironhead","shadowclaw","shadowsneak","swordsdance"],"doublesLevel":84,"doublesMoves":["closecombat","ironhead","kingsshield","shadowclaw","shadowsneak","swordsdance"]},"aromatisse":{"level":89,"moves":["calmmind","moonblast","protect","toxic","wish"],"doublesLevel":86,"doublesMoves":["healpulse","moonblast","protect","trickroom","wish"]},"slurpuff":{"level":79,"moves":["bellydrum","drainpunch","facade","playrough"],"doublesLevel":86,"doublesMoves":["faketears","flamethrower","helpinghand","playrough","stickyweb"]},"malamar":{"level":80,"moves":["knockoff","psychocut","rest","sleeptalk","substitute","superpower"],"doublesLevel":84,"doublesMoves":["knockoff","psychocut","rest","superpower"]},"barbaracle":{"level":80,"moves":["crosschop","earthquake","liquidation","shellsmash","stoneedge"],"doublesLevel":84,"doublesMoves":["liquidation","protect","rockslide","shellsmash","superpower"]},"dragalge":{"level":87,"moves":["dracometeor","dragonpulse","flipturn","focusblast","sludgewave","toxicspikes"],"doublesLevel":86,"doublesMoves":["dracometeor","dragonpulse","focusblast","protect","sludgebomb"]},"clawitzer":{"level":85,"moves":["aurasphere","darkpulse","icebeam","scald","uturn","waterpulse"],"doublesLevel":84,"doublesMoves":["aurasphere","darkpulse","icebeam","muddywater","uturn"]},"heliolisk":{"level":81,"moves":["glare","grassknot","hypervoice","surf","thunderbolt","voltswitch"],"doublesLevel":88,"doublesMoves":["glare","grassknot","hypervoice","protect","thunderbolt","voltswitch"]},"tyrantrum":{"level":82,"moves":["closecombat","dragondance","earthquake","headsmash","outrage"],"doublesLevel":86,"doublesMoves":["closecombat","dragonclaw","dragondance","headsmash","highhorsepower"]},"aurorus":{"level":84,"moves":["ancientpower","blizzard","earthpower","freezedry","stealthrock","thunderwave"],"doublesLevel":88,"doublesMoves":["auroraveil","blizzard","earthpower","freezedry","protect","thunderwave"]},"sylveon":{"level":83,"moves":["calmmind","hypervoice","mysticalfire","protect","psyshock","shadowball","wish"],"doublesLevel":80,"doublesMoves":["calmmind","hypervoice","mysticalfire","protect","psyshock"]},"hawlucha":{"level":79,"moves":["bravebird","closecombat","roost","stoneedge","swordsdance","throatchop"],"doublesLevel":80,"doublesMoves":["bravebird","closecombat","protect","swordsdance"]},"dedenne":{"level":90,"moves":["protect","recycle","thunderbolt","toxic"],"doublesLevel":88,"doublesMoves":["eerieimpulse","helpinghand","nuzzle","recycle","superfang","thunderbolt"]},"carbink":{"level":86,"moves":["bodypress","lightscreen","moonblast","reflect","stealthrock"],"doublesLevel":90,"doublesMoves":["bodypress","irondefense","moonblast","stealthrock"]},"goodra":{"level":82,"moves":["dracometeor","earthquake","fireblast","powerwhip","sludgebomb","thunderbolt"],"doublesLevel":85,"doublesMoves":["breakingswipe","dracometeor","fireblast","muddywater","powerwhip","protect","sludgebomb","thunderbolt"]},"klefki":{"level":82,"moves":["magnetrise","playrough","spikes","thunderwave","toxic"],"doublesLevel":84,"doublesMoves":["dazzlinggleam","foulplay","spikes","thunderwave"]},"trevenant":{"level":87,"moves":["earthquake","hornleech","poltergeist","rockslide","trickroom","woodhammer"],"doublesLevel":88,"doublesMoves":["poltergeist","protect","trickroom","willowisp","woodhammer"]},"gourgeist":{"level":85,"moves":["poltergeist","powerwhip","shadowsneak","synthesis","willowisp"],"doublesLevel":88,"doublesMoves":["leechseed","poltergeist","powerwhip","substitute","willowisp"]},"gourgeistsmall":{"level":84,"moves":["leechseed","poltergeist","powerwhip","substitute","willowisp"],"doublesLevel":88,"doublesMoves":["leechseed","poltergeist","powerwhip","substitute","willowisp"]},"gourgeistlarge":{"level":84,"moves":["poltergeist","powerwhip","shadowsneak","synthesis","willowisp"],"doublesLevel":88,"doublesMoves":["poltergeist","powerwhip","protect","shadowsneak","trickroom"]},"gourgeistsuper":{"level":85,"moves":["poltergeist","powerwhip","rockslide","shadowsneak","trickroom"],"doublesLevel":88,"doublesMoves":["poltergeist","powerwhip","protect","shadowsneak","trickroom"]},"avalugg":{"level":86,"moves":["avalanche","bodypress","curse","rapidspin","recover"],"doublesLevel":88,"doublesMoves":["avalanche","bodypress","curse","highhorsepower","protect","recover"]},"noivern":{"level":82,"moves":["defog","dracometeor","flamethrower","hurricane","roost","switcheroo"],"doublesLevel":84,"doublesMoves":["boomburst","dracometeor","flamethrower","hurricane","protect","tailwind"]},"xerneas":{"level":67,"moves":["focusblast","geomancy","moonblast","psyshock","thunderbolt"],"doublesLevel":70,"doublesMoves":["dazzlinggleam","focusblast","geomancy","moonblast","thunderbolt"]},"yveltal":{"level":69,"moves":["defog","heatwave","knockoff","oblivionwing","roost","suckerpunch","taunt"],"doublesLevel":71,"doublesMoves":["darkpulse","heatwave","knockoff","oblivionwing","roost","suckerpunch","tailwind"]},"zygarde":{"level":69,"moves":["dragondance","outrage","substitute","thousandarrows"],"doublesLevel":72,"doublesMoves":["coil","dragondance","extremespeed","glare","irontail","thousandarrows"]},"zygarde10":{"level":81,"moves":["coil","extremespeed","irontail","outrage","thousandarrows"],"doublesLevel":77,"doublesMoves":["dragondance","extremespeed","irontail","protect","stoneedge","thousandarrows"]},"diancie":{"level":82,"moves":["bodypress","diamondstorm","earthpower","moonblast","stealthrock","toxic"],"doublesLevel":80,"doublesMoves":["bodypress","diamondstorm","earthpower","moonblast"]},"volcanion":{"level":78,"moves":["defog","earthpower","flamethrower","sludgebomb","steameruption"],"doublesLevel":80,"doublesMoves":["earthpower","heatwave","protect","sludgebomb","steameruption"]},"decidueye":{"level":86,"moves":["bravebird","leafblade","poltergeist","roost","shadowsneak","swordsdance"],"doublesLevel":88,"doublesMoves":["bravebird","leafblade","protect","shadowsneak","spiritshackle","swordsdance"],"noDynamaxMoves":["leafblade","roost","shadowsneak","spiritshackle","swordsdance","uturn"]},"incineroar":{"level":80,"moves":["earthquake","flareblitz","knockoff","partingshot","uturn","willowisp"],"doublesLevel":80,"doublesMoves":["fakeout","flareblitz","knockoff","partingshot","uturn"]},"primarina":{"level":81,"moves":["energyball","hydropump","moonblast","psychic","sparklingaria"],"doublesLevel":82,"doublesMoves":["dazzlinggleam","flipturn","hypervoice","moonblast","protect","psychic"]},"vikavolt":{"level":82,"moves":["bugbuzz","energyball","roost","stickyweb","thunderbolt","voltswitch"],"doublesLevel":86,"doublesMoves":["bugbuzz","energyball","protect","stickyweb","thunderbolt","voltswitch"]},"ribombee":{"level":81,"moves":["moonblast","psychic","stickyweb","stunspore","uturn"],"doublesLevel":84,"doublesMoves":["helpinghand","moonblast","pollenpuff","speedswap","stickyweb","tailwind"]},"lycanroc":{"level":79,"moves":["accelerock","closecombat","psychicfangs","stoneedge","swordsdance"],"doublesLevel":84,"doublesMoves":["accelerock","closecombat","drillrun","protect","rockslide","swordsdance"]},"lycanrocmidnight":{"level":83,"moves":["closecombat","irontail","stealthrock","stoneedge","suckerpunch","swordsdance"],"doublesLevel":88,"doublesMoves":["closecombat","irontail","protect","stoneedge","suckerpunch","swordsdance"]},"lycanrocdusk":{"level":79,"moves":["accelerock","closecombat","psychicfangs","stoneedge","swordsdance"],"doublesLevel":81,"doublesMoves":["accelerock","closecombat","drillrun","protect","rockslide","swordsdance"]},"wishiwashi":{"level":85,"moves":["earthquake","hydropump","icebeam","scald","uturn"],"doublesLevel":88,"doublesMoves":["earthquake","helpinghand","hydropump","icebeam","muddywater","protect"]},"toxapex":{"level":80,"moves":["banefulbunker","haze","recover","scald","toxic","toxicspikes"],"doublesLevel":90,"doublesMoves":["banefulbunker","haze","recover","scald","toxic","toxicspikes"]},"mudsdale":{"level":83,"moves":["bodypress","earthquake","heavyslam","rockslide","stealthrock"],"doublesLevel":86,"doublesMoves":["bodypress","heavyslam","highhorsepower","protect","rest","rocktomb"]},"araquanid":{"level":80,"moves":["leechlife","liquidation","mirrorcoat","stickyweb","toxic"],"doublesLevel":84,"doublesMoves":["leechlife","liquidation","lunge","protect","stickyweb","wideguard"]},"lurantis":{"level":87,"moves":["defog","knockoff","leafstorm","superpower","synthesis"],"doublesLevel":88,"doublesMoves":["defog","knockoff","leafstorm","protect","superpower"]},"shiinotic":{"level":89,"moves":["energyball","leechseed","moonblast","spore","strengthsap"],"doublesLevel":88,"doublesMoves":["energyball","moonblast","protect","spore","strengthsap"]},"salazzle":{"level":82,"moves":["flamethrower","protect","substitute","toxic"],"doublesLevel":88,"doublesMoves":["encore","fakeout","fireblast","nastyplot","protect","sludgebomb"]},"bewear":{"level":82,"moves":["closecombat","darkestlariat","doubleedge","icepunch","swordsdance"],"doublesLevel":88,"doublesMoves":["closecombat","darkestlariat","doubleedge","drainpunch","icepunch","protect","wideguard"]},"tsareena":{"level":85,"moves":["highjumpkick","knockoff","powerwhip","rapidspin","synthesis","tripleaxel","uturn"],"doublesLevel":88,"doublesMoves":["highjumpkick","knockoff","playrough","powerwhip","rapidspin","tripleaxel","uturn"]},"comfey":{"level":86,"moves":["calmmind","drainingkiss","gigadrain","storedpower","trick","uturn"],"doublesLevel":89,"doublesMoves":["drainingkiss","floralhealing","gigadrain","helpinghand","protect"]},"oranguru":{"level":89,"moves":["focusblast","nastyplot","psychic","thunderbolt","trickroom"],"doublesLevel":88,"doublesMoves":["allyswitch","focusblast","instruct","psychic","trickroom"]},"passimian":{"level":82,"moves":["closecombat","earthquake","gunkshot","knockoff","rockslide","uturn"],"doublesLevel":84,"doublesMoves":["closecombat","gunkshot","knockoff","rockslide","uturn"]},"golisopod":{"level":84,"moves":["firstimpression","knockoff","leechlife","liquidation","spikes"],"doublesLevel":88,"doublesMoves":["aquajet","firstimpression","knockoff","leechlife","liquidation","protect","wideguard"]},"palossand":{"level":87,"moves":["earthpower","scorchingsands","shadowball","shoreup","stealthrock","toxic"],"doublesLevel":88,"doublesMoves":["hypnosis","protect","scorchingsands","shadowball","shoreup","stealthrock"]},"pyukumuku":{"level":85,"moves":["counter","mirrorcoat","recover","toxic"],"doublesLevel":100,"doublesMoves":["helpinghand","lightscreen","memento","reflect"]},"typenull":{"level":86,"moves":["crushclaw","payback","rest","sleeptalk","swordsdance"]},"silvally":{"level":83,"moves":["crunch","explosion","flamecharge","flamethrower","multiattack","swordsdance","uturn"],"doublesLevel":88,"doublesMoves":["crunch","explosion","flamethrower","multiattack","protect","tailwind"]},"silvallybug":{"level":83,"moves":["flamethrower","multiattack","partingshot","psychicfangs","thunderbolt"],"doublesLevel":88,"doublesMoves":["flamethrower","multiattack","psychicfangs","tailwind","uturn"]},"silvallydark":{"level":83,"moves":["ironhead","multiattack","partingshot","psychicfangs","swordsdance"],"doublesLevel":86,"doublesMoves":["ironhead","multiattack","psychicfangs","swordsdance","tailwind"]},"silvallydragon":{"level":83,"moves":["flamecharge","ironhead","multiattack","partingshot","swordsdance"],"doublesLevel":88,"doublesMoves":["firefang","ironhead","multiattack","swordsdance","tailwind"]},"silvallyelectric":{"level":83,"moves":["flamethrower","icebeam","multiattack","partingshot","toxic"],"doublesLevel":88,"doublesMoves":["flamethrower","grasspledge","icebeam","multiattack","tailwind"]},"silvallyfairy":{"level":83,"moves":["flamecharge","multiattack","psychicfangs","swordsdance"],"doublesLevel":88,"doublesMoves":["flamethrower","multiattack","partingshot","tailwind"]},"silvallyfighting":{"level":83,"moves":["crunch","ironhead","multiattack","swordsdance","uturn"],"doublesLevel":88,"doublesMoves":["crunch","multiattack","rockslide","swordsdance","tailwind"]},"silvallyfire":{"level":83,"moves":["crunch","ironhead","multiattack","swordsdance"],"doublesLevel":88,"doublesMoves":["heatwave","icebeam","multiattack","tailwind","thunderbolt"]},"silvallyflying":{"level":83,"moves":["flamecharge","ironhead","multiattack","rockslide","swordsdance"],"doublesLevel":86,"doublesMoves":["firefang","ironhead","multiattack","swordsdance","tailwind"]},"silvallyghost":{"level":83,"moves":["flamecharge","multiattack","partingshot","swordsdance","xscissor"],"doublesLevel":88,"doublesMoves":["multiattack","swordsdance","tailwind","xscissor"]},"silvallygrass":{"level":83,"moves":["defog","flamethrower","icebeam","multiattack","partingshot"],"doublesLevel":88,"doublesMoves":["flamethrower","icebeam","multiattack","partingshot","tailwind"]},"silvallyground":{"level":83,"moves":["defog","flamethrower","icebeam","multiattack","partingshot","toxic"],"doublesLevel":89,"doublesMoves":["multiattack","rockslide","swordsdance","tailwind"]},"silvallyice":{"level":83,"moves":["flamecharge","multiattack","psychicfangs","swordsdance"],"doublesLevel":88,"doublesMoves":["flamethrower","multiattack","partingshot","tailwind","thunderbolt"]},"silvallypoison":{"level":83,"moves":["defog","flamethrower","grasspledge","multiattack","partingshot","toxic"],"doublesLevel":88,"doublesMoves":["flamethrower","grasspledge","multiattack","partingshot","snarl","tailwind"]},"silvallypsychic":{"level":83,"moves":["crunch","multiattack","swordsdance","uturn"],"doublesLevel":88,"doublesMoves":["flamethrower","multiattack","partingshot","tailwind","xscissor"]},"silvallyrock":{"level":83,"moves":["flamecharge","multiattack","partingshot","psychicfangs","swordsdance"],"doublesLevel":88,"doublesMoves":["flamethrower","multiattack","partingshot","psychicfangs","tailwind"]},"silvallysteel":{"level":83,"moves":["defog","flamethrower","multiattack","partingshot","thunderbolt","toxic"],"doublesLevel":87,"doublesMoves":["flamethrower","multiattack","partingshot","tailwind","thunderbolt"]},"silvallywater":{"level":83,"moves":["defog","icebeam","multiattack","partingshot","thunderbolt","toxic"],"doublesLevel":88,"doublesMoves":["icebeam","multiattack","partingshot","tailwind","thunderbolt"]},"turtonator":{"level":84,"moves":["bodypress","dracometeor","earthquake","fireblast","rapidspin","shellsmash","willowisp"],"doublesLevel":84,"doublesMoves":["dragonpulse","fireblast","protect","scorchingsands","shellsmash"]},"togedemaru":{"level":86,"moves":["ironhead","nuzzle","spikyshield","uturn","wish","zingzap"],"doublesLevel":88,"doublesMoves":["encore","fakeout","ironhead","nuzzle","spikyshield","zingzap"]},"mimikyu":{"level":76,"moves":["drainpunch","playrough","shadowclaw","shadowsneak","swordsdance"],"doublesLevel":84,"doublesMoves":["playrough","shadowclaw","shadowsneak","swordsdance"]},"drampa":{"level":86,"moves":["dracometeor","fireblast","glare","hypervoice","roost","thunderbolt"],"doublesLevel":88,"doublesMoves":["dracometeor","dragonpulse","heatwave","hypervoice"]},"dhelmise":{"level":87,"moves":["anchorshot","earthquake","poltergeist","powerwhip","rapidspin","swordsdance"],"doublesLevel":88,"doublesMoves":["anchorshot","knockoff","powerwhip","protect"]},"kommoo":{"level":80,"moves":["clangingscales","clangoroussoul","closecombat","poisonjab","stealthrock"],"doublesLevel":80,"doublesMoves":["bodypress","dracometeor","irondefense","protect"]},"tapukoko":{"level":76,"moves":["calmmind","dazzlinggleam","grassknot","substitute","thunderbolt","voltswitch"],"doublesLevel":80,"doublesMoves":["bravebird","dazzlinggleam","grassknot","taunt","thunderbolt","uturn"]},"tapulele":{"level":78,"moves":["calmmind","focusblast","moonblast","psychic","psyshock","shadowball"],"doublesLevel":80,"doublesMoves":["calmmind","dazzlinggleam","focusblast","moonblast","protect","psyshock"]},"tapubulu":{"level":82,"moves":["closecombat","hornleech","megahorn","stoneedge","swordsdance","woodhammer"],"doublesLevel":83,"doublesMoves":["closecombat","hornleech","protect","stoneedge","swordsdance","woodhammer"]},"tapufini":{"level":77,"moves":["calmmind","defog","moonblast","surf","taunt"],"doublesLevel":80,"doublesMoves":["haze","healpulse","moonblast","muddywater","naturesmadness","protect","taunt"]},"solgaleo":{"level":71,"moves":["closecombat","flamecharge","flareblitz","knockoff","psychicfangs","sunsteelstrike"],"doublesLevel":76,"doublesMoves":["closecombat","flareblitz","morningsun","protect","psychicfangs","stoneedge","sunsteelstrike"]},"lunala":{"level":72,"moves":["calmmind","moonblast","moongeistbeam","psyshock","roost"],"doublesLevel":74,"doublesMoves":["calmmind","moonblast","moongeistbeam","protect","psyshock","roost"]},"nihilego":{"level":78,"moves":["grassknot","powergem","sludgewave","stealthrock","thunderbolt","toxicspikes"],"doublesLevel":81,"doublesMoves":["grassknot","meteorbeam","protect","sludgebomb","thunderbolt"]},"buzzwole":{"level":75,"moves":["closecombat","darkestlariat","dualwingbeat","ironhead","leechlife","stoneedge"],"doublesLevel":80,"doublesMoves":["closecombat","darkestlariat","dualwingbeat","ironhead","leechlife","stoneedge"],"noDynamaxMoves":["bulkup","closecombat","darkestlariat","leechlife","poisonjab","roost","stoneedge"]},"pheromosa":{"level":74,"moves":["closecombat","icebeam","poisonjab","throatchop","uturn"],"doublesLevel":78,"doublesMoves":["closecombat","icebeam","poisonjab","protect","throatchop","uturn"]},"xurkitree":{"level":76,"moves":["dazzlinggleam","energyball","hypnosis","thunderbolt","voltswitch"],"doublesLevel":79,"doublesMoves":["dazzlinggleam","energyball","thunderbolt","voltswitch"]},"celesteela":{"level":76,"moves":["airslash","earthquake","fireblast","flashcannon","leechseed","protect"],"doublesLevel":78,"doublesMoves":["airslash","fireblast","flashcannon","leechseed","protect","wideguard"],"noDynamaxMoves":["airslash","earthquake","fireblast","heavyslam","leechseed","protect"]},"kartana":{"level":72,"moves":["knockoff","leafblade","sacredsword","smartstrike","swordsdance"],"doublesLevel":78,"doublesMoves":["knockoff","leafblade","sacredsword","smartstrike","swordsdance"]},"guzzlord":{"level":83,"moves":["darkpulse","dracometeor","fireblast","knockoff","sludgebomb"],"doublesLevel":88,"doublesMoves":["dracometeor","fireblast","knockoff","protect","sludgebomb"]},"necrozma":{"level":81,"moves":["calmmind","heatwave","moonlight","photongeyser","stealthrock"],"doublesLevel":80,"doublesMoves":["calmmind","earthpower","heatwave","moonlight","photongeyser","protect"]},"necrozmaduskmane":{"level":66,"moves":["dragondance","earthquake","morningsun","photongeyser","sunsteelstrike"],"doublesLevel":72,"doublesMoves":["dragondance","photongeyser","protect","sunsteelstrike"]},"necrozmadawnwings":{"level":75,"moves":["calmmind","heatwave","moongeistbeam","photongeyser","stealthrock"],"doublesLevel":72,"doublesMoves":["heatwave","moongeistbeam","photongeyser","protect","thunderwave"]},"magearna":{"level":74,"moves":["agility","calmmind","flashcannon","fleurcannon"],"doublesLevel":72,"doublesMoves":["agility","aurasphere","dazzlinggleam","flashcannon","fleurcannon","protect","trick"]},"marshadow":{"level":69,"moves":["bulkup","closecombat","icepunch","rocktomb","shadowsneak","spectralthief"],"doublesLevel":72,"doublesMoves":["closecombat","protect","rocktomb","shadowsneak","spectralthief"]},"naganadel":{"level":72,"moves":["airslash","dracometeor","fireblast","nastyplot","sludgewave"],"doublesLevel":76,"doublesMoves":["dracometeor","flamethrower","nastyplot","sludgebomb","uturn"],"noDynamaxMoves":["dracometeor","fireblast","nastyplot","sludgewave","uturn"]},"stakataka":{"level":79,"moves":["bodypress","earthquake","gyroball","stealthrock","stoneedge","trickroom"],"doublesLevel":82,"doublesMoves":["bodypress","gyroball","highhorsepower","rockslide","trickroom"]},"blacephalon":{"level":79,"moves":["calmmind","fireblast","psyshock","shadowball","trick"],"doublesLevel":80,"doublesMoves":["fireblast","protect","psyshock","shadowball","trick"]},"zeraora":{"level":76,"moves":["blazekick","bulkup","closecombat","grassknot","knockoff","plasmafists","playrough","voltswitch"],"doublesLevel":78,"doublesMoves":["closecombat","fakeout","grassknot","knockoff","plasmafists","snarl"]},"melmetal":{"level":74,"moves":["doubleironbash","earthquake","superpower","thunderpunch","thunderwave"],"doublesLevel":76,"doublesMoves":["acidarmor","bodypress","doubleironbash","protect","thunderpunch","thunderwave"]},"rillaboom":{"level":76,"moves":["grassyglide","highhorsepower","knockoff","uturn","woodhammer"],"doublesLevel":80,"doublesMoves":["fakeout","grassyglide","highhorsepower","protect","uturn","woodhammer"]},"rillaboomgmax":{"level":76,"moves":["acrobatics","grassyglide","highhorsepower","knockoff","swordsdance"]},"cinderace":{"level":74,"moves":["courtchange","gunkshot","highjumpkick","pyroball","uturn","zenheadbutt"],"doublesLevel":80,"doublesMoves":["courtchange","gunkshot","highjumpkick","protect","pyroball","suckerpunch","uturn"]},"cinderacegmax":{"level":74,"moves":["bulkup","highjumpkick","pyroball","suckerpunch"]},"inteleon":{"level":80,"moves":["airslash","darkpulse","hydropump","icebeam","scald","uturn"],"doublesLevel":84,"doublesMoves":["airslash","hydropump","icebeam","muddywater","uturn"]},"inteleongmax":{"level":80,"moves":["airslash","focusenergy","icebeam","surf"],"doublesLevel":84,"doublesMoves":["focusenergy","hydropump","icebeam","muddywater"]},"greedent":{"level":84,"moves":["bodyslam","earthquake","firefang","payback","swordsdance"],"doublesLevel":88,"doublesMoves":["bodyslam","gyroball","protect","stompingtantrum","swordsdance"]},"corviknight":{"level":78,"moves":["bodypress","bravebird","bulkup","defog","roost"],"doublesLevel":80,"doublesMoves":["bodypress","bravebird","bulkup","roost","tailwind"]},"orbeetle":{"level":86,"moves":["bodypress","bugbuzz","calmmind","psychic","recover","stickyweb","uturn"]},"orbeetlegmax":{"doublesLevel":88,"doublesMoves":["helpinghand","hypnosis","lightscreen","psychic","reflect","stickyweb","strugglebug"]},"thievul":{"level":89,"moves":["darkpulse","foulplay","grassknot","nastyplot","partingshot","psychic"],"doublesLevel":89,"doublesMoves":["faketears","foulplay","partingshot","snarl","taunt"]},"eldegoss":{"level":90,"moves":["energyball","leechseed","pollenpuff","rapidspin","sleeppowder"],"doublesLevel":90,"doublesMoves":["charm","energyball","helpinghand","pollenpuff","protect","sleeppowder"]},"dubwool":{"level":86,"moves":["bodypress","cottonguard","rest","sleeptalk"],"doublesLevel":90,"doublesMoves":["doubleedge","swordsdance","thunderwave","wildcharge","zenheadbutt"]},"drednaw":{"level":82,"moves":["liquidation","stealthrock","stoneedge","superpower","swordsdance"],"doublesLevel":84,"doublesMoves":["highhorsepower","liquidation","protect","rockslide","superpower","swordsdance"],"noDynamaxMoves":["liquidation","raindance","stealthrock","stoneedge","superpower"]},"boltund":{"level":85,"moves":["bulkup","crunch","firefang","playrough","psychicfangs","thunderfang","voltswitch"],"doublesLevel":86,"doublesMoves":["crunch","firefang","nuzzle","playrough","protect","psychicfangs","snarl","thunderfang"]},"coalossalgmax":{"level":88,"moves":["overheat","rapidspin","spikes","stealthrock","stoneedge","willowisp"],"doublesLevel":85,"doublesMoves":["fireblast","incinerate","protect","stealthrock","stoneedge","willowisp"]},"flapple":{"level":84,"moves":["dragondance","gravapple","outrage","suckerpunch","uturn"],"doublesLevel":89,"doublesMoves":["acrobatics","dragondance","dragonrush","gravapple","protect"]},"appletun":{"level":90,"moves":["appleacid","dragonpulse","leechseed","recover"],"doublesLevel":90,"doublesMoves":["appleacid","dragonpulse","leechseed","protect","recover"]},"appletungmax":{"level":90,"moves":["appleacid","dracometeor","leechseed","recover"]},"sandaconda":{"level":84,"moves":["coil","earthquake","glare","rest","stealthrock","stoneedge"]},"sandacondagmax":{"doublesLevel":86,"doublesMoves":["coil","glare","highhorsepower","protect","stoneedge"]},"cramorant":{"level":84,"moves":["bravebird","defog","roost","superpower","surf"],"doublesLevel":88,"doublesMoves":["bravebird","icebeam","protect","roost","surf","tailwind"]},"barraskewda":{"level":80,"moves":["closecombat","crunch","liquidation","poisonjab","psychicfangs"],"doublesLevel":84,"doublesMoves":["closecombat","drillrun","flipturn","liquidation","poisonjab"]},"toxtricity":{"level":82,"moves":["boomburst","overdrive","shiftgear","sludgewave","voltswitch"]},"toxtricitylowkey":{"level":82,"moves":["boomburst","overdrive","sludgewave","voltswitch"]},"toxtricitygmax":{"doublesLevel":84,"doublesMoves":["boomburst","overdrive","shiftgear","sludgebomb","snarl","voltswitch"]},"toxtricitylowkeygmax":{"doublesLevel":84,"doublesMoves":["boomburst","overdrive","sludgebomb","snarl","voltswitch"]},"centiskorch":{"level":86,"moves":["coil","firelash","knockoff","leechlife","powerwhip"],"doublesLevel":89,"doublesMoves":["coil","firelash","knockoff","leechlife","powerwhip","protect"]},"centiskorchgmax":{"doublesLevel":89,"doublesMoves":["coil","firelash","knockoff","leechlife","powerwhip","protect"]},"grapploct":{"level":87,"moves":["brutalswing","bulkup","drainpunch","icepunch","suckerpunch"],"doublesLevel":88,"doublesMoves":["closecombat","coaching","drainpunch","icepunch","octolock","protect"]},"polteageist":{"level":78,"moves":["gigadrain","shadowball","shellsmash","storedpower","strengthsap"],"doublesLevel":84,"doublesMoves":["gigadrain","protect","shadowball","shellsmash","storedpower"]},"hatterenegmax":{"level":86,"moves":["calmmind","dazzlinggleam","mysticalfire","psychic","psyshock","trickroom"],"doublesLevel":80,"doublesMoves":["dazzlinggleam","mysticalfire","protect","psychic","trickroom"]},"grimmsnarl":{"level":84,"moves":["lightscreen","reflect","spiritbreak","taunt","thunderwave"]},"grimmsnarlgmax":{"level":84,"moves":["bulkup","darkestlariat","playrough","rest","suckerpunch","trick"],"doublesLevel":84,"doublesMoves":["darkestlariat","fakeout","lightscreen","reflect","spiritbreak","taunt","thunderwave"]},"obstagoon":{"level":80,"moves":["bulkup","closecombat","facade","knockoff","partingshot"],"doublesLevel":86,"doublesMoves":["closecombat","facade","knockoff","obstruct","partingshot","taunt"]},"perrserker":{"level":87,"moves":["closecombat","crunch","fakeout","ironhead","uturn"],"doublesLevel":88,"doublesMoves":["closecombat","fakeout","ironhead","lashout","protect","uturn"]},"cursola":{"level":88,"moves":["earthpower","hydropump","icebeam","shadowball","stealthrock","strengthsap"],"doublesLevel":88,"doublesMoves":["earthpower","hydropump","icebeam","protect","shadowball","strengthsap"]},"sirfetchd":{"level":82,"moves":["bravebird","closecombat","firstimpression","knockoff","swordsdance"],"doublesLevel":85,"doublesMoves":["bravebird","closecombat","firstimpression","knockoff","poisonjab","protect","swordsdance"],"noDynamaxMoves":["bravebird","closecombat","firstimpression","knockoff","poisonjab","swordsdance"]},"mrrime":{"level":87,"moves":["focusblast","freezedry","psychic","rapidspin","slackoff","trick"],"doublesLevel":88,"doublesMoves":["fakeout","focusblast","freezedry","icywind","protect","psychic","rapidspin"]},"runerigus":{"level":84,"moves":["earthquake","haze","poltergeist","stealthrock","toxicspikes","willowisp"],"doublesLevel":88,"doublesMoves":["earthquake","poltergeist","protect","toxicspikes","trickroom","willowisp"]},"alcremiegmax":{"level":85,"moves":["calmmind","dazzlinggleam","mysticalfire","psychic","recover"],"doublesLevel":85,"doublesMoves":["dazzlinggleam","decorate","mysticalfire","protect","recover"]},"falinks":{"level":84,"moves":["closecombat","ironhead","noretreat","rockslide","throatchop"],"doublesLevel":86,"doublesMoves":["closecombat","noretreat","poisonjab","rockslide","throatchop"]},"pincurchin":{"level":89,"moves":["risingvoltage","scald","spikes","suckerpunch","toxicspikes"],"doublesLevel":90,"doublesMoves":["acupressure","protect","risingvoltage","scald","suckerpunch"]},"frosmoth":{"level":82,"moves":["bugbuzz","gigadrain","hurricane","icebeam","quiverdance"],"doublesLevel":88,"doublesMoves":["bugbuzz","gigadrain","hurricane","icebeam","protect","quiverdance","wideguard"]},"stonjourner":{"level":88,"moves":["earthquake","heatcrash","rockpolish","stealthrock","stoneedge"],"doublesLevel":88,"doublesMoves":["bodypress","heatcrash","heavyslam","protect","rockpolish","stoneedge"]},"eiscue":{"level":82,"moves":["bellydrum","iciclecrash","liquidation","substitute","zenheadbutt"],"doublesLevel":86,"doublesMoves":["bellydrum","iciclecrash","liquidation","protect"]},"indeedee":{"level":84,"moves":["calmmind","expandingforce","hypervoice","mysticalfire","trick"],"doublesLevel":80,"doublesMoves":["encore","expandingforce","hypervoice","mysticalfire","protect","trick"]},"indeedeef":{"level":85,"moves":["calmmind","expandingforce","healingwish","hypervoice","mysticalfire"],"doublesLevel":80,"doublesMoves":["expandingforce","followme","healpulse","helpinghand","protect"]},"morpeko":{"level":86,"moves":["aurawheel","foulplay","partingshot","protect","psychicfangs","rapidspin"],"doublesLevel":88,"doublesMoves":["aurawheel","fakeout","partingshot","protect","rapidspin","superfang"]},"copperajah":{"level":83,"moves":["earthquake","ironhead","playrough","rockslide","stealthrock"],"doublesLevel":88,"doublesMoves":["heatcrash","highhorsepower","ironhead","playrough","powerwhip","protect","stoneedge"]},"copperajahgmax":{"level":83,"moves":["earthquake","heatcrash","heavyslam","powerwhip","stoneedge"]},"dracozolt":{"level":77,"moves":["aerialace","boltbeak","earthquake","lowkick","outrage"],"doublesLevel":82,"doublesMoves":["aerialace","boltbeak","dragonclaw","highhorsepower","rockslide"],"noDynamaxMoves":["boltbeak","dragonclaw","earthquake","outrage"]},"arctozolt":{"level":87,"moves":["boltbeak","freezedry","iciclecrash","stompingtantrum","thunderwave"],"doublesLevel":88,"doublesMoves":["blizzard","boltbeak","iciclecrash","lowkick","protect"]},"dracovish":{"level":79,"moves":["crunch","fishiousrend","icefang","lowkick","psychicfangs"],"doublesLevel":78,"doublesMoves":["crunch","dragonrush","fishiousrend","icefang","psychicfangs"]},"arctovish":{"level":87,"moves":["bodyslam","fishiousrend","freezedry","iciclecrash","psychicfangs"],"doublesLevel":88,"doublesMoves":["blizzard","fishiousrend","iciclecrash","protect","superfang"]},"duraludon":{"level":83,"moves":["bodypress","dracometeor","flashcannon","stealthrock","thunderbolt"],"doublesLevel":87,"doublesMoves":["bodypress","dracometeor","dragonpulse","flashcannon","protect","snarl","thunderbolt"]},"dragapult":{"level":77,"moves":["dracometeor","fireblast","shadowball","thunderbolt","uturn"],"doublesLevel":80,"doublesMoves":["dragondarts","fireblast","protect","shadowball","thunderbolt","thunderwave"]},"zacian":{"level":66,"moves":["closecombat","crunch","playrough","psychicfangs","swordsdance"],"doublesLevel":72,"doublesMoves":["closecombat","crunch","playrough","protect","psychicfangs","swordsdance"]},"zaciancrowned":{"level":61,"moves":["behemothblade","closecombat","crunch","playrough","psychicfangs","swordsdance"],"doublesLevel":65,"doublesMoves":["behemothblade","closecombat","playrough","protect","psychicfangs","swordsdance"]},"zamazenta":{"level":71,"moves":["closecombat","crunch","psychicfangs","wildcharge"],"doublesLevel":74,"doublesMoves":["closecombat","crunch","playrough","protect","psychicfangs"]},"zamazentacrowned":{"level":71,"moves":["behemothbash","closecombat","crunch","howl","psychicfangs"],"doublesLevel":72,"doublesMoves":["behemothbash","closecombat","crunch","howl","protect"]},"eternatus":{"level":69,"moves":["dynamaxcannon","flamethrower","recover","sludgewave","toxic"],"doublesLevel":72,"doublesMoves":["cosmicpower","dynamaxcannon","flamethrower","recover"]},"urshifu":{"level":74,"moves":["closecombat","ironhead","suckerpunch","uturn","wickedblow"],"doublesLevel":76,"doublesMoves":["closecombat","ironhead","protect","suckerpunch","wickedblow"]},"urshifurapidstrike":{"level":76,"moves":["bulkup","drainpunch","substitute","surgingstrikes"],"doublesLevel":80,"doublesMoves":["aquajet","closecombat","icepunch","protect","surgingstrikes","uturn"]},"urshifugmax":{"level":74,"moves":["bulkup","drainpunch","substitute","wickedblow"]},"urshifurapidstrikegmax":{"level":76,"moves":["bulkup","closecombat","icepunch","surgingstrikes","uturn"]},"zarude":{"level":78,"moves":["bulkup","closecombat","darkestlariat","junglehealing","powerwhip","uturn"],"doublesLevel":80,"doublesMoves":["closecombat","darkestlariat","junglehealing","powerwhip","protect"]},"regieleki":{"level":77,"moves":["explosion","substitute","thunderbolt","voltswitch"],"doublesLevel":82,"doublesMoves":["electroweb","extremespeed","protect","thundercage","voltswitch"],"noDynamaxMoves":["explosion","rapidspin","thunderbolt","voltswitch"]},"regidrago":{"level":78,"moves":["dracometeor","dragondance","firefang","hammerarm","outrage"],"doublesLevel":78,"doublesMoves":["crunch","dragonclaw","dragonenergy","firefang"]},"glastrier":{"level":83,"moves":["closecombat","highhorsepower","iciclecrash","swordsdance"],"doublesLevel":82,"doublesMoves":["closecombat","highhorsepower","iciclecrash","protect"]},"spectrier":{"level":74,"moves":["darkpulse","nastyplot","shadowball","substitute"],"doublesLevel":78,"doublesMoves":["darkpulse","nastyplot","protect","shadowball"]},"calyrex":{"level":88,"moves":["calmmind","gigadrain","leechseed","psyshock","substitute"],"doublesLevel":94,"doublesMoves":["helpinghand","leafstorm","pollenpuff","protect"]},"calyrexice":{"level":71,"moves":["agility","closecombat","glaciallance","highhorsepower","trickroom"],"doublesLevel":72,"doublesMoves":["closecombat","glaciallance","highhorsepower","swordsdance","trickroom"]},"calyrexshadow":{"level":64,"moves":["astralbarrage","nastyplot","pollenpuff","psyshock","substitute","trick"],"doublesLevel":68,"doublesMoves":["astralbarrage","nastyplot","pollenpuff","protect","psyshock"]}} as any;
/* eslint-enable */

export interface TeamData {
	typeCount: {[k: string]: number};
	typeComboCount: {[k: string]: number};
	baseFormes: {[k: string]: number};
	megaCount?: number;
	zCount?: number;
	has: {[k: string]: number};
	forceResult: boolean;
	weaknesses: {[k: string]: number};
	resistances: {[k: string]: number};
	weather?: string;
	eeveeLimCount?: number;
	gigantamax?: boolean;
}
export interface BattleFactorySpecies {
	flags: {limEevee?: 1};
	sets: BattleFactorySet[];
}
export interface OldRandomBattleSpecies {
	level?: number;
	moves?: ID[];
	doublesLevel?: number;
	doublesMoves?: ID[];
	noDynamaxMoves?: ID[];
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
export class MoveCounter extends Utils.Multiset<string> {
	damagingMoves: Set<Move>;
	setupType: string;

	constructor() {
		super();
		this.damagingMoves = new Set();
		this.setupType = '';
	}

	get(key: string): number {
		return super.get(key) || 0;
	}
}

type MoveEnforcementChecker = (
	movePool: string[], moves: Set<string>, abilities: Set<string>, types: Set<string>,
	counter: MoveCounter, species: Species, teamDetails: RandomTeamsTypes.TeamDetails
) => boolean;

// Moves that restore HP:
const RECOVERY_MOVES = [
	'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'roost', 'shoreup', 'slackoff', 'softboiled', 'strengthsap', 'synthesis',
];
// Moves that drop stats:
const CONTRARY_MOVES = [
	'closecombat', 'leafstorm', 'overheat', 'superpower', 'vcreate',
];
// Moves that boost Attack:
const PHYSICAL_SETUP = [
	'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'meditate', 'poweruppunch', 'screech', 'swordsdance',
];
// Moves which boost Special Attack:
const SPECIAL_SETUP = [
	'calmmind', 'chargebeam', 'geomancy', 'nastyplot', 'quiverdance', 'tailglow',
];
// Moves that boost Attack AND Special Attack:
const MIXED_SETUP = [
	'clangoroussoul', 'growth', 'happyhour', 'holdhands', 'noretreat', 'shellsmash', 'workup',
];
// Some moves that only boost Speed:
const SPEED_SETUP = [
	'agility', 'autotomize', 'flamecharge', 'rockpolish',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'accelerock', 'aquajet', 'beakblast', 'bounce', 'breakingswipe', 'chatter', 'clearsmog', 'dragontail', 'eruption', 'explosion',
	'fakeout', 'firstimpression', 'flamecharge', 'flipturn', 'iceshard', 'icywind', 'incinerate', 'machpunch',
	'meteorbeam', 'pluck', 'pursuit', 'quickattack', 'reversal', 'selfdestruct', 'skydrop', 'snarl', 'suckerpunch', 'uturn', 'watershuriken',
	'vacuumwave', 'voltswitch', 'waterspout',
];
// Hazard-setting moves
const HAZARDS = [
	'spikes', 'stealthrock', 'stickyweb', 'toxicspikes',
];

function sereneGraceBenefits(move: Move) {
	return move.secondary?.chance && move.secondary.chance >= 20 && move.secondary.chance < 100;
}

export class RandomGen8Teams {
	dex: ModdedDex;
	gen: number;
	factoryTier: string;
	format: Format;
	prng: PRNG;
	noStab: string[];
	priorityPokemon: string[];
	readonly maxTeamSize: number;
	readonly adjustLevel: number | null;
	readonly maxMoveCount: number;
	readonly forceMonotype: string | undefined;

	randomData: {[species: string]: OldRandomBattleSpecies} = randomDataJSON;

	/**
	 * Checkers for move enforcement based on a Pokémon's types or other factors
	 *
	 * returns true to reject one of its other moves to try to roll the forced move, false otherwise.
	 */
	moveEnforcementCheckers: {[k: string]: MoveEnforcementChecker};

	constructor(dex: ModdedDex, format: Format, prng: PRNG | PRNGSeed | null) {
		this.dex = dex;
		this.gen = this.dex.gen;
		this.noStab = NO_STAB;
		this.priorityPokemon = [];

		const ruleTable = this.dex.formats.getRuleTable(format);
		this.maxTeamSize = ruleTable.maxTeamSize;
		this.adjustLevel = ruleTable.adjustLevel;
		this.maxMoveCount = ruleTable.maxMoveCount;
		const forceMonotype = ruleTable.valueRules.get('forcemonotype');
		this.forceMonotype = forceMonotype && this.dex.types.get(forceMonotype).exists ?
			this.dex.types.get(forceMonotype).name : undefined;

		this.factoryTier = '';
		this.format = format;
		this.prng = prng && !Array.isArray(prng) ? prng : new PRNG(prng);

		this.moveEnforcementCheckers = {
			screens: (movePool, moves, abilities, types, counter, species, teamDetails) => {
				if (teamDetails.screens) return false;
				return (
					(moves.has('lightscreen') && movePool.includes('reflect')) ||
					(moves.has('reflect') && movePool.includes('lightscreen'))
				);
			},
			recovery: (movePool, moves, abilities, types, counter, species, teamDetails) => (
				!!counter.get('Status') &&
				!counter.setupType &&
				['morningsun', 'recover', 'roost', 'slackoff', 'softboiled'].some(moveid => movePool.includes(moveid)) &&
				['healingwish', 'switcheroo', 'trick', 'trickroom'].every(moveid => !moves.has(moveid))
			),
			misc: (movePool, moves, abilities, types, counter, species, teamDetails) => {
				if (movePool.includes('milkdrink') || movePool.includes('quiverdance')) return true;
				return movePool.includes('stickyweb') && !counter.setupType && !teamDetails.stickyWeb;
			},
			lead: (movePool, moves, abilities, types, counter) => (
				movePool.includes('stealthrock') &&
				!!counter.get('Status') &&
				!counter.setupType &&
				!counter.get('speedsetup') &&
				!moves.has('substitute')
			),
			leechseed: (movePool, moves) => (
				!moves.has('calmmind') &&
				['protect', 'substitute', 'spikyshield'].some(m => movePool.includes(m))
			),
			Bug: (movePool) => movePool.includes('megahorn'),
			Dark: (movePool, moves, abilities, types, counter) => {
				if (!counter.get('Dark')) return true;
				return moves.has('suckerpunch') && (movePool.includes('knockoff') || movePool.includes('wickedblow'));
			},
			Dragon: (movePool, moves, abilities, types, counter) => (
				!counter.get('Dragon') &&
				!moves.has('dragonascent') &&
				!moves.has('substitute') &&
				!(moves.has('rest') && moves.has('sleeptalk'))
			),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric') || movePool.includes('thunder'),
			Fairy: (movePool, moves, abilities, types, counter) => (
				!counter.get('Fairy') &&
				['dazzlinggleam', 'moonblast', 'fleurcannon', 'playrough', 'strangesteam'].some(moveid => movePool.includes(moveid))
			),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting') || !counter.get('stab'),
			Fire: (movePool, moves, abilities, types, counter, species) => {
				// Entei should never reject Extreme Speed even if Flare Blitz could be rolled instead
				const enteiException = moves.has('extremespeed') && species.id === 'entei';
				return !moves.has('bellydrum') && (!counter.get('Fire') || (!enteiException && movePool.includes('flareblitz')));
			},
			Flying: (movePool, moves, abilities, types, counter) => (
				!counter.get('Flying') && !types.has('Dragon') && [
					'airslash', 'bravebird', 'dualwingbeat', 'oblivionwing',
				].some(moveid => movePool.includes(moveid))
			),
			Ghost: (movePool, moves, abilities, types, counter) => {
				if (moves.has('nightshade')) return false;
				if (!counter.get('Ghost') && !types.has('Dark')) return true;
				if (movePool.includes('poltergeist')) return true;
				return movePool.includes('spectralthief') && !counter.get('Dark');
			},
			Grass: (movePool, moves, abilities, types, counter, species) => {
				if (movePool.includes('leafstorm') || movePool.includes('grassyglide')) return true;
				return !counter.get('Grass') && species.baseStats.atk >= 100;
			},
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => {
				if (!counter.get('Ice')) return true;
				if (movePool.includes('iciclecrash')) return true;
				return abilities.has('Snow Warning') && movePool.includes('blizzard');
			},
			Normal: (movePool, moves, abilities, types, counter) => (
				(abilities.has('Guts') && movePool.includes('facade')) || (abilities.has('Pixilate') && !counter.get('Normal'))
			),
			Poison: (movePool, moves, abilities, types, counter) => {
				if (counter.get('Poison')) return false;
				return types.has('Ground') || types.has('Psychic') || types.has('Grass') || !!counter.setupType || movePool.includes('gunkshot');
			},
			Psychic: (movePool, moves, abilities, types, counter) => {
				if (counter.get('Psychic')) return false;
				if (types.has('Ghost') || types.has('Steel')) return false;
				return abilities.has('Psychic Surge') || !!counter.setupType || movePool.includes('psychicfangs');
			},
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock') && species.baseStats.atk >= 80,
			Steel: (movePool, moves, abilities, types, counter, species) => {
				if (species.baseStats.atk < 95) return false;
				if (movePool.includes('meteormash')) return true;
				return !counter.get('Steel');
			},
			Water: (movePool, moves, abilities, types, counter, species) => {
				if (!counter.get('Water') && !moves.has('hypervoice')) return true;
				if (['hypervoice', 'liquidation', 'surgingstrikes'].some(m => movePool.includes(m))) return true;
				return abilities.has('Huge Power') && movePool.includes('aquajet');
			},
		};
	}

	setSeed(prng?: PRNG | PRNGSeed) {
		this.prng = prng && !Array.isArray(prng) ? prng : new PRNG(prng);
	}

	getTeam(options?: PlayerOptions | null): PokemonSet[] {
		const generatorName = (
			typeof this.format.team === 'string' && this.format.team.startsWith('random')
		 ) ? this.format.team + 'Team' : '';
		// @ts-ignore
		return this[generatorName || 'randomTeam'](options);
	}

	randomChance(numerator: number, denominator: number) {
		return this.prng.randomChance(numerator, denominator);
	}

	sample<T>(items: readonly T[]): T {
		return this.prng.sample(items);
	}

	sampleIfArray<T>(item: T | T[]): T {
		if (Array.isArray(item)) {
			return this.sample(item);
		}
		return item;
	}

	random(m?: number, n?: number) {
		return this.prng.next(m, n);
	}

	/**
	 * Remove an element from an unsorted array significantly faster
	 * than .splice
	 */
	fastPop(list: any[], index: number) {
		// If an array doesn't need to be in order, replacing the
		// element at the given index with the removed element
		// is much, much faster than using list.splice(index, 1).
		const length = list.length;
		if (index < 0 || index >= list.length) {
			// sanity check
			throw new Error(`Index ${index} out of bounds for given array`);
		}

		const element = list[index];
		list[index] = list[length - 1];
		list.pop();
		return element;
	}

	/**
	 * Remove a random element from an unsorted array and return it.
	 * Uses the battle's RNG if in a battle.
	 */
	sampleNoReplace(list: any[]) {
		const length = list.length;
		if (length === 0) return null;
		const index = this.random(length);
		return this.fastPop(list, index);
	}

	/**
	 * Removes n random elements from an unsorted array and returns them.
	 * If n is less than the array's length, randomly removes and returns all the elements
	 * in the array (so the returned array could have length < n).
	 */
	multipleSamplesNoReplace<T>(list: T[], n: number): T[] {
		const samples = [];
		while (samples.length < n && list.length) {
			samples.push(this.sampleNoReplace(list));
		}

		return samples;
	}

	/**
	 * Check if user has directly tried to ban/unban/restrict things in a custom battle.
	 * Doesn't count bans nested inside other formats/rules.
	 */
	private hasDirectCustomBanlistChanges() {
		if (!this.format.customRules) return false;
		for (const rule of this.format.customRules) {
			for (const banlistOperator of ['-', '+', '*']) {
				if (rule.startsWith(banlistOperator)) return true;
			}
		}
		return false;
	}

	/**
	 * Inform user when custom bans are unsupported in a team generator.
	 */
	protected enforceNoDirectCustomBanlistChanges() {
		if (this.hasDirectCustomBanlistChanges()) {
			throw new Error(`Custom bans are not currently supported in ${this.format.name}.`);
		}
	}

	/**
	 * Inform user when complex bans are unsupported in a team generator.
	 */
	protected enforceNoDirectComplexBans() {
		if (!this.format.customRules) return false;
		for (const rule of this.format.customRules) {
			if (rule.includes('+') && !rule.startsWith('+')) {
				throw new Error(`Complex bans are not currently supported in ${this.format.name}.`);
			}
		}
	}

	/**
	 * Validate set element pool size is sufficient to support size requirements after simple bans.
	 */
	private enforceCustomPoolSizeNoComplexBans(
		effectTypeName: string,
		basicEffectPool: BasicEffect[],
		requiredCount: number,
		requiredCountExplanation: string
	) {
		if (basicEffectPool.length >= requiredCount) return;
		throw new Error(`Legal ${effectTypeName} count is insufficient to support ${requiredCountExplanation} (${basicEffectPool.length} / ${requiredCount}).`);
	}

	unrejectableMovesInSingles(move: Move) {
		// These moves cannot be rejected in favor of a forced move in singles
		return (move.category !== 'Status' || !move.flags.heal) && ![
			'facade', 'leechseed', 'lightscreen', 'reflect', 'sleeptalk', 'spore', 'substitute', 'switcheroo',
			'teleport', 'toxic', 'trick',
		].includes(move.id);
	}

	unrejectableMovesInDoubles(move: Move) {
		// These moves cannot be rejected in favor of a forced move in doubles
		return move.id !== 'bodypress';
	}

	randomCCTeam(): RandomTeamsTypes.RandomSet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const dex = this.dex;
		const team = [];

		const natures = this.dex.natures.all();
		const items = this.dex.items.all();

		const randomN = this.randomNPokemon(this.maxTeamSize, this.forceMonotype, undefined, undefined, true);

		for (let forme of randomN) {
			let species = dex.species.get(forme);
			if (species.isNonstandard) species = dex.species.get(species.baseSpecies);

			// Random legal item
			let item = '';
			if (this.gen >= 2) {
				do {
					item = this.sample(items).name;
				} while (this.dex.items.get(item).gen > this.gen || this.dex.items.get(item).isNonstandard);
			}

			// Make sure forme is legal
			if (species.battleOnly) {
				if (typeof species.battleOnly === 'string') {
					species = dex.species.get(species.battleOnly);
				} else {
					species = dex.species.get(this.sample(species.battleOnly));
				}
				forme = species.name;
			} else if (species.requiredItems && !species.requiredItems.some(req => toID(req) === item)) {
				if (!species.changesFrom) throw new Error(`${species.name} needs a changesFrom value`);
				species = dex.species.get(species.changesFrom);
				forme = species.name;
			}

			// Make sure that a base forme does not hold any forme-modifier items.
			let itemData = this.dex.items.get(item);
			if (itemData.forcedForme && forme === this.dex.species.get(itemData.forcedForme).baseSpecies) {
				do {
					itemData = this.sample(items);
					item = itemData.name;
				} while (
					itemData.gen > this.gen ||
					itemData.isNonstandard ||
					(itemData.forcedForme && forme === this.dex.species.get(itemData.forcedForme).baseSpecies)
				);
			}

			// Random legal ability
			const abilities = Object.values(species.abilities).filter(a => this.dex.abilities.get(a).gen <= this.gen);
			const ability: string = this.gen <= 2 ? 'No Ability' : this.sample(abilities);

			// Four random unique moves from the movepool
			let pool = ['struggle'];
			if (forme === 'Smeargle') {
				pool = this.dex.moves.all()
					.filter(move => !(move.isNonstandard || move.isZ || move.isMax || move.realMove))
					.map(m => m.id);
			} else {
				pool = [...this.dex.species.getMovePool(species.id)];
			}

			const moves = this.multipleSamplesNoReplace(pool, this.maxMoveCount);

			// Random EVs
			const evs: StatsTable = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			const s: StatID[] = ["hp", "atk", "def", "spa", "spd", "spe"];
			let evpool = 510;
			do {
				const x = this.sample(s);
				const y = this.random(Math.min(256 - evs[x], evpool + 1));
				evs[x] += y;
				evpool -= y;
			} while (evpool > 0);

			// Random IVs
			const ivs = {
				hp: this.random(32),
				atk: this.random(32),
				def: this.random(32),
				spa: this.random(32),
				spd: this.random(32),
				spe: this.random(32),
			};

			// Random nature
			const nature = this.sample(natures).name;

			// Level balance--calculate directly from stats rather than using some silly lookup table
			const mbstmin = 1307; // Sunkern has the lowest modified base stat total, and that total is 807

			let stats = species.baseStats;
			// If Wishiwashi, use the school-forme's much higher stats
			if (species.baseSpecies === 'Wishiwashi') stats = this.dex.species.get('wishiwashischool').baseStats;

			// Modified base stat total assumes 31 IVs, 85 EVs in every stat
			let mbst = (stats["hp"] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats["atk"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["def"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spa"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spd"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spe"] * 2 + 31 + 21 + 100) + 5;

			let level;
			if (this.adjustLevel) {
				level = this.adjustLevel;
			} else {
				level = Math.floor(100 * mbstmin / mbst); // Initial level guess will underestimate

				while (level < 100) {
					mbst = Math.floor((stats["hp"] * 2 + 31 + 21 + 100) * level / 100 + 10);
					// Since damage is roughly proportional to level
					mbst += Math.floor(((stats["atk"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats["def"] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor(((stats["spa"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats["spd"] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor((stats["spe"] * 2 + 31 + 21 + 100) * level / 100 + 5);

					if (mbst >= mbstmin) break;
					level++;
				}
			}

			// Random happiness
			const happiness = this.random(256);

			// Random shininess
			const shiny = this.randomChance(1, 1024);

			const set: RandomTeamsTypes.RandomSet = {
				name: species.baseSpecies,
				species: species.name,
				gender: species.gender,
				item,
				ability,
				moves,
				evs,
				ivs,
				nature,
				level,
				happiness,
				shiny,
			};
			if (this.gen === 9) {
				// Tera type
				set.teraType = this.sample(this.dex.types.all()).name;
			}
			team.push(set);
		}

		return team;
	}

	randomNPokemon(n: number, requiredType?: string, minSourceGen?: number, ruleTable?: RuleTable, requireMoves = false) {
		// Picks `n` random pokemon--no repeats, even among formes
		// Also need to either normalize for formes or select formes at random
		// Unreleased are okay but no CAP
		if (requiredType && !this.dex.types.get(requiredType).exists) {
			throw new Error(`"${requiredType}" is not a valid type.`);
		}

		const isNotCustom = !ruleTable;

		const pool: number[] = [];
		let speciesPool: Species[] = [];
		if (isNotCustom) {
			speciesPool = [...this.dex.species.all()];
			for (const species of speciesPool) {
				if (species.isNonstandard && species.isNonstandard !== 'Unobtainable') continue;
				if (requireMoves) {
					const hasMovesInCurrentGen = this.dex.species.getMovePool(species.id).size;
					if (!hasMovesInCurrentGen) continue;
				}
				if (requiredType && !species.types.includes(requiredType)) continue;
				if (minSourceGen && species.gen < minSourceGen) continue;
				const num = species.num;
				if (num <= 0 || pool.includes(num)) continue;
				pool.push(num);
			}
		} else {
			const EXISTENCE_TAG = ['past', 'future', 'lgpe', 'unobtainable', 'cap', 'custom', 'nonexistent'];
			const nonexistentBanReason = ruleTable.check('nonexistent');
			// Assume tierSpecies does not differ from species here (mega formes can be used without their stone, etc)
			for (const species of this.dex.species.all()) {
				if (requiredType && !species.types.includes(requiredType)) continue;

				let banReason = ruleTable.check('pokemon:' + species.id);
				if (banReason) continue;
				if (banReason !== '') {
					if (species.isMega && ruleTable.check('pokemontag:mega')) continue;

					banReason = ruleTable.check('basepokemon:' + toID(species.baseSpecies));
					if (banReason) continue;
					if (banReason !== '' || this.dex.species.get(species.baseSpecies).isNonstandard !== species.isNonstandard) {
						const nonexistentCheck = Tags.nonexistent.genericFilter!(species) && nonexistentBanReason;
						let tagWhitelisted = false;
						let tagBlacklisted = false;
						for (const ruleid of ruleTable.tagRules) {
							if (ruleid.startsWith('*')) continue;
							const tagid = ruleid.slice(12);
							const tag = Tags[tagid];
							if ((tag.speciesFilter || tag.genericFilter)!(species)) {
								const existenceTag = EXISTENCE_TAG.includes(tagid);
								if (ruleid.startsWith('+')) {
									if (!existenceTag && nonexistentCheck) continue;
									tagWhitelisted = true;
									break;
								}
								tagBlacklisted = true;
								break;
							}
						}
						if (tagBlacklisted) continue;
						if (!tagWhitelisted) {
							if (ruleTable.check('pokemontag:allpokemon')) continue;
						}
					}
				}
				speciesPool.push(species);
				const num = species.num;
				if (pool.includes(num)) continue;
				pool.push(num);
			}
		}

		const hasDexNumber: {[k: string]: number} = {};
		for (let i = 0; i < n; i++) {
			const num = this.sampleNoReplace(pool);
			hasDexNumber[num] = i;
		}

		const formes: string[][] = [];
		for (const species of speciesPool) {
			if (!(species.num in hasDexNumber)) continue;
			if (isNotCustom && (species.gen > this.gen ||
				(species.isNonstandard && species.isNonstandard !== 'Unobtainable'))) continue;
			if (requiredType && !species.types.includes(requiredType)) continue;
			if (!formes[hasDexNumber[species.num]]) formes[hasDexNumber[species.num]] = [];
			formes[hasDexNumber[species.num]].push(species.name);
		}

		if (formes.length < n) {
			throw new Error(`Legal Pokemon forme count insufficient to support Max Team Size: (${formes.length} / ${n}).`);
		}

		const nPokemon = [];
		for (let i = 0; i < n; i++) {
			if (!formes[i].length) {
				throw new Error(`Invalid pokemon gen ${this.gen}: ${JSON.stringify(formes)} numbers ${JSON.stringify(hasDexNumber)}`);
			}
			nPokemon.push(this.sample(formes[i]));
		}
		return nPokemon;
	}

	randomHCTeam(): PokemonSet[] {
		const hasCustomBans = this.hasDirectCustomBanlistChanges();
		const ruleTable = this.dex.formats.getRuleTable(this.format);
		const hasNonexistentBan = hasCustomBans && ruleTable.check('nonexistent');
		const hasNonexistentWhitelist = hasCustomBans && (hasNonexistentBan === '');

		if (hasCustomBans) {
			this.enforceNoDirectComplexBans();
		}

		// Item Pool
		const doItemsExist = this.gen > 1;
		let itemPool: Item[] = [];
		if (doItemsExist) {
			if (!hasCustomBans) {
				itemPool = [...this.dex.items.all()].filter(item => (item.gen <= this.gen && !item.isNonstandard));
			} else {
				const hasAllItemsBan = ruleTable.check('pokemontag:allitems');
				for (const item of this.dex.items.all()) {
					let banReason = ruleTable.check('item:' + item.id);
					if (banReason) continue;
					if (banReason !== '' && item.id) {
						if (hasAllItemsBan) continue;
						if (item.isNonstandard) {
							banReason = ruleTable.check('pokemontag:' + toID(item.isNonstandard));
							if (banReason) continue;
							if (banReason !== '' && item.isNonstandard !== 'Unobtainable') {
								if (hasNonexistentBan) continue;
								if (!hasNonexistentWhitelist) continue;
							}
						}
					}
					itemPool.push(item);
				}
				if (ruleTable.check('item:noitem')) {
					this.enforceCustomPoolSizeNoComplexBans('item', itemPool, this.maxTeamSize, 'Max Team Size');
				}
			}
		}

		// Ability Pool
		const doAbilitiesExist = (this.gen > 2) && (this.dex.currentMod !== 'gen7letsgo');
		let abilityPool: Ability[] = [];
		if (doAbilitiesExist) {
			if (!hasCustomBans) {
				abilityPool = [...this.dex.abilities.all()].filter(ability => (ability.gen <= this.gen && !ability.isNonstandard));
			} else {
				const hasAllAbilitiesBan = ruleTable.check('pokemontag:allabilities');
				for (const ability of this.dex.abilities.all()) {
					let banReason = ruleTable.check('ability:' + ability.id);
					if (banReason) continue;
					if (banReason !== '') {
						if (hasAllAbilitiesBan) continue;
						if (ability.isNonstandard) {
							banReason = ruleTable.check('pokemontag:' + toID(ability.isNonstandard));
							if (banReason) continue;
							if (banReason !== '') {
								if (hasNonexistentBan) continue;
								if (!hasNonexistentWhitelist) continue;
							}
						}
					}
					abilityPool.push(ability);
				}
				if (ruleTable.check('ability:noability')) {
					this.enforceCustomPoolSizeNoComplexBans('ability', abilityPool, this.maxTeamSize, 'Max Team Size');
				}
			}
		}

		// Move Pool
		const setMoveCount = ruleTable.maxMoveCount;
		let movePool: Move[] = [];
		if (!hasCustomBans) {
			movePool = [...this.dex.moves.all()].filter(move =>
				(move.gen <= this.gen && !move.isNonstandard && !move.name.startsWith('Hidden Power ')));
		} else {
			const hasAllMovesBan = ruleTable.check('pokemontag:allmoves');
			for (const move of this.dex.moves.all()) {
				// Legality of specific HP types can't be altered in built formats anyway
				if (move.name.startsWith('Hidden Power ')) continue;
				let banReason = ruleTable.check('move:' + move.id);
				if (banReason) continue;
				if (banReason !== '') {
					if (hasAllMovesBan) continue;
					if (move.isNonstandard) {
						banReason = ruleTable.check('pokemontag:' + toID(move.isNonstandard));
						if (banReason) continue;
						if (banReason !== '' && move.isNonstandard !== 'Unobtainable') {
							if (hasNonexistentBan) continue;
							if (!hasNonexistentWhitelist) continue;
						}
					}
				}
				movePool.push(move);
			}
			this.enforceCustomPoolSizeNoComplexBans('move', movePool, this.maxTeamSize * setMoveCount, 'Max Team Size * Max Move Count');
		}

		// Nature Pool
		const doNaturesExist = this.gen > 2;
		let naturePool: Nature[] = [];
		if (doNaturesExist) {
			if (!hasCustomBans) {
				naturePool = [...this.dex.natures.all()];
			} else {
				const hasAllNaturesBan = ruleTable.check('pokemontag:allnatures');
				for (const nature of this.dex.natures.all()) {
					let banReason = ruleTable.check('nature:' + nature.id);
					if (banReason) continue;
					if (banReason !== '' && nature.id) {
						if (hasAllNaturesBan) continue;
						if (nature.isNonstandard) {
							banReason = ruleTable.check('pokemontag:' + toID(nature.isNonstandard));
							if (banReason) continue;
							if (banReason !== '' && nature.isNonstandard !== 'Unobtainable') {
								if (hasNonexistentBan) continue;
								if (!hasNonexistentWhitelist) continue;
							}
						}
					}
					naturePool.push(nature);
				}
				// There is no 'nature:nonature' rule so do not constrain pool size
			}
		}

		const randomN = this.randomNPokemon(this.maxTeamSize, this.forceMonotype, undefined,
			hasCustomBans ? ruleTable : undefined);

		const team = [];
		for (const forme of randomN) {
			// Choose forme
			const species = this.dex.species.get(forme);

			// Random unique item
			let item = '';
			let itemData;
			if (doItemsExist) {
				itemData = this.sampleNoReplace(itemPool);
				item = itemData?.name;
			}

			// Random unique ability
			let ability = 'No Ability';
			let abilityData;
			if (doAbilitiesExist) {
				abilityData = this.sampleNoReplace(abilityPool);
				ability = abilityData?.name;
			}

			// Random unique moves
			const m = [];
			do {
				const move = this.sampleNoReplace(movePool);
				m.push(move.id);
			} while (m.length < setMoveCount);

			// Random EVs
			const evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			if (this.gen === 6) {
				let evpool = 510;
				do {
					const x = this.sample(this.dex.stats.ids());
					const y = this.random(Math.min(256 - evs[x], evpool + 1));
					evs[x] += y;
					evpool -= y;
				} while (evpool > 0);
			} else {
				for (const x of this.dex.stats.ids()) {
					evs[x] = this.random(256);
				}
			}

			// Random IVs
			const ivs: StatsTable = {
				hp: this.random(32),
				atk: this.random(32),
				def: this.random(32),
				spa: this.random(32),
				spd: this.random(32),
				spe: this.random(32),
			};

			// Random nature
			let nature = '';
			if (doNaturesExist && (naturePool.length > 0)) {
				nature = this.sample(naturePool).name;
			}

			// Level balance
			const mbstmin = 1307;
			const stats = species.baseStats;
			let mbst = (stats['hp'] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats['atk'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['def'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spa'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spd'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spe'] * 2 + 31 + 21 + 100) + 5;

			let level;
			if (this.adjustLevel) {
				level = this.adjustLevel;
			} else {
				level = Math.floor(100 * mbstmin / mbst);
				while (level < 100) {
					mbst = Math.floor((stats['hp'] * 2 + 31 + 21 + 100) * level / 100 + 10);
					mbst += Math.floor(((stats['atk'] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats['def'] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor(((stats['spa'] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats['spd'] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor((stats['spe'] * 2 + 31 + 21 + 100) * level / 100 + 5);
					if (mbst >= mbstmin) break;
					level++;
				}
			}

			// Random happiness
			const happiness = this.random(256);

			// Random shininess
			const shiny = this.randomChance(1, 1024);

			const set: PokemonSet = {
				name: species.baseSpecies,
				species: species.name,
				gender: species.gender,
				item,
				ability,
				moves: m,
				evs,
				ivs,
				nature,
				level,
				happiness,
				shiny,
			};
			if (this.gen === 9) {
				// Random Tera type
				set.teraType = this.sample(this.dex.types.all()).name;
			}
			team.push(set);
		}

		return team;
	}

	queryMoves(
		moves: Set<string> | null,
		types: string[],
		abilities: Set<string> = new Set(),
		movePool: string[] = []
	): MoveCounter {
		// This is primarily a helper function for random setbuilder functions.
		const counter = new MoveCounter();

		if (!moves?.size) return counter;

		const categories = {Physical: 0, Special: 0, Status: 0};

		// Iterate through all moves we've chosen so far and keep track of what they do:
		for (const moveid of moves) {
			let move = this.dex.moves.get(moveid);
			if (move.id === 'naturepower') {
				if (this.gen === 5) move = this.dex.moves.get('earthquake');
			}

			let moveType = move.type;
			if (['judgment', 'multiattack', 'revelationdance'].includes(moveid)) moveType = types[0];
			if (move.damage || move.damageCallback) {
				// Moves that do a set amount of damage:
				counter.add('damage');
				counter.damagingMoves.add(move);
			} else {
				// Are Physical/Special/Status moves:
				categories[move.category]++;
			}
			// Moves that have a low base power:
			if (moveid === 'lowkick' || (move.basePower && move.basePower <= 60 && moveid !== 'rapidspin')) {
				counter.add('technician');
			}
			// Moves that hit up to 5 times:
			if (move.multihit && Array.isArray(move.multihit) && move.multihit[1] === 5) counter.add('skilllink');
			if (move.recoil || move.hasCrashDamage) counter.add('recoil');
			if (move.drain) counter.add('drain');
			// Moves which have a base power, but aren't super-weak like Rapid Spin:
			if (move.basePower > 30 || move.multihit || move.basePowerCallback || moveid === 'infestation') {
				counter.add(moveType);
				if (types.includes(moveType)) {
					// STAB:
					// Certain moves aren't acceptable as a Pokemon's only STAB attack
					if (!this.noStab.includes(moveid) && (!moveid.startsWith('hiddenpower') || types.length === 1)) {
						counter.add('stab');
						// Ties between Physical and Special setup should broken in favor of STABs
						categories[move.category] += 0.1;
					}
				} else if (
					// Less obvious forms of STAB
					(moveType === 'Normal' && (['Aerilate', 'Galvanize', 'Pixilate', 'Refrigerate'].some(abil => abilities.has(abil)))) ||
					(move.priority === 0 && (abilities.has('Libero') || abilities.has('Protean')) && !this.noStab.includes(moveid)) ||
					(moveType === 'Steel' && abilities.has('Steelworker'))
				) {
					counter.add('stab');
				}

				if (move.flags['bite']) counter.add('strongjaw');
				if (move.flags['punch']) counter.add('ironfist');
				if (move.flags['sound']) counter.add('sound');
				if (move.priority !== 0 || (moveid === 'grassyglide' && abilities.has('Grassy Surge'))) {
					counter.add('priority');
				}
				counter.damagingMoves.add(move);
			}
			// Moves with secondary effects:
			if (move.secondary) {
				counter.add('sheerforce');
				if (sereneGraceBenefits(move)) {
					counter.add('serenegrace');
				}
			}
			// Moves with low accuracy:
			if (move.accuracy && move.accuracy !== true && move.accuracy < 90) counter.add('inaccurate');

			// Moves that change stats:
			if (RECOVERY_MOVES.includes(moveid)) counter.add('recovery');
			if (CONTRARY_MOVES.includes(moveid)) counter.add('contrary');
			if (PHYSICAL_SETUP.includes(moveid)) {
				counter.add('physicalsetup');
				counter.setupType = 'Physical';
			} else if (SPECIAL_SETUP.includes(moveid)) {
				counter.add('specialsetup');
				counter.setupType = 'Special';
			}

			if (MIXED_SETUP.includes(moveid)) counter.add('mixedsetup');
			if (SPEED_SETUP.includes(moveid)) counter.add('speedsetup');
			if (HAZARDS.includes(moveid)) counter.add('hazards');
		}

		// Keep track of the available moves
		for (const moveid of movePool) {
			const move = this.dex.moves.get(moveid);
			if (move.damageCallback) continue;
			if (move.category === 'Physical') counter.add('physicalpool');
			if (move.category === 'Special') counter.add('specialpool');
		}

		// Choose a setup type:
		if (counter.get('mixedsetup')) {
			counter.setupType = 'Mixed';
		} else if (counter.get('physicalsetup') && counter.get('specialsetup')) {
			const pool = {
				Physical: categories['Physical'] + counter.get('physicalpool'),
				Special: categories['Special'] + counter.get('specialpool'),
			};
			if (pool.Physical === pool.Special) {
				if (categories['Physical'] > categories['Special']) counter.setupType = 'Physical';
				if (categories['Special'] > categories['Physical']) counter.setupType = 'Special';
			} else {
				counter.setupType = pool.Physical > pool.Special ? 'Physical' : 'Special';
			}
		} else if (counter.setupType === 'Physical') {
			if (
				(categories['Physical'] < 2 && (!counter.get('stab') || !counter.get('physicalpool'))) &&
				!(moves.has('rest') && moves.has('sleeptalk')) &&
				!moves.has('batonpass')
			) {
				counter.setupType = '';
			}
		} else if (counter.setupType === 'Special') {
			if (
				(categories['Special'] < 2 && (!counter.get('stab') || !counter.get('specialpool'))) &&
				!moves.has('quiverdance') &&
				!(moves.has('rest') && moves.has('sleeptalk')) &&
				!(moves.has('wish') && moves.has('protect')) &&
				!moves.has('batonpass')
			) {
				counter.setupType = '';
			}
		}

		counter.set('Physical', Math.floor(categories['Physical']));
		counter.set('Special', Math.floor(categories['Special']));
		counter.set('Status', categories['Status']);

		return counter;
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
		isDoubles: boolean,
		isNoDynamax: boolean,
	): {cull: boolean, isSetup?: boolean} {
		if (isDoubles && species.baseStats.def >= 140 && movePool.includes('bodypress')) {
			// In Doubles, Pokémon with Defense stats >= 140 should always have body press
			return {cull: true};
		}
		if (
			(species.id === 'doublade' && movePool.includes('swordsdance')) ||
			(species.id === 'entei' && movePool.includes('extremespeed')) ||
			(species.id === 'genesectdouse' && movePool.includes('technoblast')) ||
			(species.id === 'golisopod' && movePool.includes('leechlife') && movePool.includes('firstimpression'))
		) {
			// Entei should always have Extreme Speed, and Genesect-Douse should always have Techno Blast
			// Golisopod should always have one of its bug moves (Leech Life or First Impression)
			return {cull: true};
		}

		const hasRestTalk = moves.has('rest') && moves.has('sleeptalk');

		// Reject moves that need support
		switch (move.id) {
		case 'acrobatics': case 'junglehealing':
			// Special case to prevent lead Acrobatics Rillaboom
			return {cull: (species.id.startsWith('rillaboom') && isLead) || (!isDoubles && !counter.setupType)};
		case 'dualwingbeat': case 'fly':
			return {cull: !types.has(move.type) && !counter.setupType && !!counter.get('Status')};
		case 'healbell':
			return {cull: movePool.includes('protect') || movePool.includes('wish')};
		case 'fireblast':
			// Special case for Togekiss, which always wants Aura Sphere
			return {cull: abilities.has('Serene Grace') && (!moves.has('trick') || counter.get('Status') > 1)};
		case 'firepunch':
			// Special case for Darmanitan-Zen-Galar, which doesn't always want Fire Punch
			return {cull: movePool.includes('bellydrum') || (moves.has('earthquake') && movePool.includes('substitute'))};
		case 'flamecharge':
			return {cull: movePool.includes('swordsdance')};
		case 'hypervoice':
			// Special case for Heliolisk, which always wants Thunderbolt
			return {cull: types.has('Electric') && movePool.includes('thunderbolt')};
		case 'payback': case 'psychocut':
			// Special case for Type: Null and Malamar, which don't want these + RestTalk
			return {cull: !counter.get('Status') || hasRestTalk};
		case 'rest':
			const bulkySetup = !moves.has('sleeptalk') && ['bulkup', 'calmmind', 'coil', 'curse'].some(m => movePool.includes(m));
			// Registeel would otherwise get Curse sets without Rest, which are very bad generally
			return {cull: species.id !== 'registeel' && (movePool.includes('sleeptalk') || bulkySetup)};
		case 'sleeptalk':
			if (!moves.has('rest')) return {cull: true};
			if (movePool.length > 1 && !abilities.has('Contrary')) {
				const rest = movePool.indexOf('rest');
				if (rest >= 0) this.fastPop(movePool, rest);
			}
			break;
		case 'storedpower':
			return {cull: !counter.setupType};
		case 'switcheroo': case 'trick':
			return {cull: counter.get('Physical') + counter.get('Special') < 3 || moves.has('rapidspin')};
		case 'trickroom':
			const webs = !!teamDetails.stickyWeb;
			return {cull:
				isLead || webs || !!counter.get('speedsetup') ||
				counter.damagingMoves.size < 2 || movePool.includes('nastyplot'),
			};
		case 'zenheadbutt':
			// Special case for Victini, which should prefer Bolt Strike to Zen Headbutt
			return {cull: movePool.includes('boltstrike') || (species.id === 'eiscue' && moves.has('substitute'))};

		// Set up once and only if we have the moves for it
		case 'bellydrum': case 'bulkup': case 'coil': case 'curse': case 'dragondance': case 'honeclaws': case 'swordsdance':
			if (counter.setupType !== 'Physical') return {cull: true}; // if we're not setting up physically this is pointless
			if (counter.get('Physical') + counter.get('physicalpool') < 2 && !hasRestTalk) return {cull: true};

			// First Impression + setup is undesirable in Doubles
			if (isDoubles && moves.has('firstimpression')) return {cull: true};
			if (move.id === 'swordsdance' && moves.has('dragondance')) return {cull: true}; // Dragon Dance is judged as better

			return {cull: false, isSetup: true};
		case 'calmmind': case 'nastyplot':
			if (species.id === 'togekiss') return {cull: false};
			if (counter.setupType !== 'Special') return {cull: true};
			if (
				(counter.get('Special') + counter.get('specialpool')) < 2 &&
				!hasRestTalk &&
				!(moves.has('wish') && moves.has('protect'))
			) return {cull: true};
			if (moves.has('healpulse') || move.id === 'calmmind' && moves.has('trickroom')) return {cull: true};
			return {cull: false, isSetup: true};
		case 'quiverdance':
			return {cull: false, isSetup: true};
		case 'clangoroussoul': case 'shellsmash': case 'workup':
			if (counter.setupType !== 'Mixed') return {cull: true};
			if (counter.damagingMoves.size + counter.get('physicalpool') + counter.get('specialpool') < 2) return {cull: true};
			return {cull: false, isSetup: true};
		case 'agility': case 'autotomize': case 'rockpolish': case 'shiftgear':
			if (counter.damagingMoves.size < 2 || moves.has('rest')) return {cull: true};
			if (movePool.includes('calmmind') || movePool.includes('nastyplot')) return {cull: true};
			return {cull: false, isSetup: !counter.setupType};

		// Bad after setup
		case 'coaching': case 'counter': case 'reversal':
			// Counter: special case for Alakazam, which doesn't want Counter + Nasty Plot
			return {cull: !!counter.setupType};
		case 'bulletpunch': case 'extremespeed': case 'rockblast':
			return {cull: (
				!!counter.get('speedsetup') ||
				(!isDoubles && moves.has('dragondance')) ||
				counter.damagingMoves.size < 2
			)};
		case 'closecombat': case 'flashcannon': case 'pollenpuff':
			const substituteCullCondition = (
				(moves.has('substitute') && !types.has('Fighting')) ||
				(moves.has('toxic') && movePool.includes('substitute'))
			);
			const preferHJKOverCCCullCondition = (
				move.id === 'closecombat' &&
				!counter.setupType &&
				(moves.has('highjumpkick') || movePool.includes('highjumpkick'))
			);
			return {cull: substituteCullCondition || preferHJKOverCCCullCondition};
		case 'defog':
			return {cull: !!counter.setupType || moves.has('healbell') || moves.has('toxicspikes') || !!teamDetails.defog};
		case 'fakeout':
			return {cull: !!counter.setupType || ['protect', 'rapidspin', 'substitute', 'uturn'].some(m => moves.has(m))};
		case 'firstimpression': case 'glare': case 'icywind': case 'tailwind': case 'waterspout':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('rest')};
		case 'healingwish': case 'memento':
			return {cull: !!counter.setupType || !!counter.get('recovery') || moves.has('substitute') || moves.has('uturn')};
		case 'highjumpkick':
			// Special case for Hitmonlee to prevent non-Unburden Curse
			return {cull: moves.has('curse')};
		case 'partingshot':
			return {cull: !!counter.get('speedsetup') || moves.has('bulkup') || moves.has('uturn')};
		case 'protect':
			if (!isDoubles && ((counter.setupType && !moves.has('wish')) || moves.has('rest'))) return {cull: true};
			if (
				!isDoubles &&
				counter.get('Status') < 2 &&
				['Hunger Switch', 'Speed Boost'].every(m => !abilities.has(m))
			) return {cull: true};
			if (movePool.includes('leechseed') || (movePool.includes('toxic') && !moves.has('wish'))) return {cull: true};
			if (isDoubles && (
				['bellydrum', 'fakeout', 'shellsmash', 'spore'].some(m => movePool.includes(m)) ||
				moves.has('tailwind') || moves.has('waterspout') || counter.get('recovery')
			)) return {cull: true};
			return {cull: false};
		case 'rapidspin':
			const setup = ['curse', 'nastyplot', 'shellsmash'].some(m => moves.has(m));
			return {cull: !!teamDetails.rapidSpin || setup || (!!counter.setupType && counter.get('Fighting') >= 2)};
		case 'shadowsneak':
			const sneakIncompatible = ['substitute', 'trickroom', 'dualwingbeat', 'toxic'].some(m => moves.has(m));
			return {cull: hasRestTalk || sneakIncompatible || counter.setupType === 'Special'};
		case 'spikes':
			return {cull: !!counter.setupType || (!!teamDetails.spikes && teamDetails.spikes > 1)};
		case 'stealthrock':
			return {cull:
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				!!teamDetails.stealthRock ||
				['rest', 'substitute', 'trickroom', 'teleport'].some(m => moves.has(m)) ||
				(species.id === 'palossand' && movePool.includes('shoreup')),
			};
		case 'stickyweb':
			return {cull: counter.setupType === 'Special' || !!teamDetails.stickyWeb};
		case 'taunt':
			return {cull: moves.has('encore') || moves.has('nastyplot') || moves.has('swordsdance')};
		case 'thunderwave': case 'voltswitch':
			const cullInDoubles = isDoubles && (moves.has('electroweb') || moves.has('nuzzle'));
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				moves.has('shiftgear') ||
				moves.has('raindance') ||
				cullInDoubles
			)};
		case 'toxic':
			return {cull: !!counter.setupType || ['sludgewave', 'thunderwave', 'willowisp'].some(m => moves.has(m))};
		case 'toxicspikes':
			return {cull: !!counter.setupType || !!teamDetails.toxicSpikes};
		case 'uturn':
			const bugSwordsDanceCase = types.has('Bug') && counter.get('recovery') && moves.has('swordsdance');
			return {cull: (
				!!counter.get('speedsetup') ||
				(counter.setupType && !bugSwordsDanceCase) ||
				(isDoubles && moves.has('leechlife')) ||
				moves.has('shiftgear')
			)};

		/**
		 * Ineffective to have both moves together
		 *
		 * These are sorted in order of:
		 * Normal>Fire>Water>Electric>Grass>Ice>Fighting>Poison>Ground>Flying>Psychic>Bug>Rock>Ghost>Dragon>Dark>Fairy
		 * and then subsorted alphabetically.
		 * This type order is arbitrary and referenced from https://pokemondb.net/type.
		 */
		case 'explosion':
			// Rock Blast: Special case for Gigalith to prevent Stone Edge-less Choice Band sets
			const otherMoves = ['curse', 'stompingtantrum', 'rockblast', 'painsplit', 'wish'].some(m => moves.has(m));
			return {cull: !!counter.get('speedsetup') || !!counter.get('recovery') || otherMoves};
		case 'facade':
			// Special case for Snorlax
			return {cull: movePool.includes('doubleedge')};
		case 'quickattack':
			// Diggersby wants U-turn on Choiced sets
			const diggersbyCull = counter.get('Physical') > 3 && movePool.includes('uturn');
			return {cull: !!counter.get('speedsetup') || (types.has('Rock') && !!counter.get('Status')) || diggersbyCull};
		case 'blazekick':
			return {cull: species.id === 'genesect' && counter.get('Special') >= 1};
		case 'blueflare':
			return {cull: moves.has('vcreate')};
		case 'firefang': case 'flamethrower':
			// Fire Fang: Special case for Garchomp, which doesn't want Fire Fang w/o Swords Dance
			const otherFireMoves = ['heatwave', 'overheat'].some(m => moves.has(m));
			return {cull: (moves.has('fireblast') && counter.setupType !== 'Physical') || otherFireMoves};
		case 'flareblitz':
			// Special case for Solgaleo to prevent Flame Charge + Flare Blitz
			return {cull: species.id === 'solgaleo' && moves.has('flamecharge')};
		case 'overheat':
			return {cull: moves.has('flareblitz') || (isDoubles && moves.has('calmmind'))};
		case 'aquatail': case 'flipturn':
			return {cull: moves.has('aquajet') || !!counter.get('Status')};
		case 'hydropump':
			return {cull: moves.has('scald') && (
				(counter.get('Special') < 4 && !moves.has('uturn')) ||
				(species.types.length > 1 && counter.get('stab') < 3)
			)};
		case 'muddywater':
			return {cull: moves.has('liquidation')};
		case 'scald':
			// Special case for Clawitzer
			return {cull: moves.has('waterpulse')};
		case 'thunderbolt':
			// Special case for Goodra, which only wants one move to hit Water-types
			return {cull: moves.has('powerwhip')};
		case 'energyball':
			// Special case to prevent Shiinotic with four Grass moves and no Moonblast
			return {cull: species.id === 'shiinotic' && !moves.has('moonblast')};
		case 'gigadrain':
			// Celebi always wants Leaf Storm on its more pivoting-focused non-Nasty Plot sets
			const celebiPreferLeafStorm = species.id === 'celebi' && !counter.setupType && moves.has('uturn');
			return {cull: celebiPreferLeafStorm || (types.has('Poison') && !counter.get('Poison'))};
		case 'leafblade':
			// Special case for Virizion to prevent Leaf Blade on Assault Vest sets
			return {cull: (moves.has('leafstorm') || movePool.includes('leafstorm')) && counter.setupType !== 'Physical'};
		case 'leafstorm':
			const leafBladePossible = movePool.includes('leafblade') || moves.has('leafblade');
			return {cull:
				// Virizion should always prefer Leaf Blade to Leaf Storm on Physical sets
				(counter.setupType === 'Physical' && (species.id === 'virizion' || leafBladePossible)) ||
				(moves.has('gigadrain') && !!counter.get('Status')) ||
				(isDoubles && moves.has('energyball')),
			};
		case 'powerwhip':
			// Special case for Centiskorch, which doesn't want Assault Vest
			return {cull: moves.has('leechlife')};
		case 'woodhammer':
			return {cull: moves.has('hornleech') && counter.get('Physical') < 4};
		case 'freezedry':
			const betterIceMove = (
				(moves.has('blizzard') && !!counter.setupType) ||
				(moves.has('icebeam') && counter.get('Special') < 4)
			);
			const preferThunderWave = movePool.includes('thunderwave') && types.has('Electric');
			return {cull: betterIceMove || preferThunderWave || movePool.includes('bodyslam')};
		case 'bodypress':
			// Turtonator never wants Earthquake + Body Press, and wants EQ+Smash or Press+No Smash
			const turtonatorPressCull = species.id === 'turtonator' && moves.has('earthquake') && movePool.includes('shellsmash');
			const pressIncompatible = ['shellsmash', 'mirrorcoat', 'whirlwind'].some(m => moves.has(m));
			return {cull: turtonatorPressCull || pressIncompatible || counter.setupType === 'Special'};
		case 'circlethrow':
			// Part of a special case for Throh to pick one specific Fighting move depending on its set
			return {cull: moves.has('stormthrow') && !moves.has('rest')};
		case 'drainpunch':
			return {cull: moves.has('closecombat') || (!types.has('Fighting') && movePool.includes('swordsdance'))};
		case 'dynamicpunch': case 'thunderouskick':
			// Dynamic Punch: Special case for Machamp to better split Guts and No Guard sets
			return {cull: moves.has('closecombat') || moves.has('facade')};
		case 'focusblast':
			// Special cases for Blastoise and Regice; Blastoise wants Shell Smash, and Regice wants Thunderbolt
			return {cull: movePool.includes('shellsmash') || hasRestTalk};
		case 'hammerarm':
			// Special case for Kangaskhan, which always wants Sucker Punch
			return {cull: moves.has('fakeout')};
		case 'stormthrow':
			// Part of a special case for Throh to pick one specific Fighting move depending on its set
			return {cull: hasRestTalk};
		case 'superpower':
			return {
				cull: moves.has('hydropump') ||
					(counter.get('Physical') >= 4 && movePool.includes('uturn')) ||
					(moves.has('substitute') && !abilities.has('Contrary')),
				isSetup: abilities.has('Contrary'),
			};
		case 'poisonjab':
			return {cull: !types.has('Poison') && counter.get('Status') >= 2};
		case 'earthquake':
			const doublesCull = moves.has('earthpower') || moves.has('highhorsepower');
			// Turtonator wants Body Press when it doesn't have Shell Smash
			const turtQuakeCull = species.id === 'turtonator' && movePool.includes('bodypress') && movePool.includes('shellsmash');
			const subToxicPossible = moves.has('substitute') && movePool.includes('toxic');
			return {cull: turtQuakeCull || (isDoubles && doublesCull) || subToxicPossible || moves.has('bonemerang')};
		case 'scorchingsands':
			// Special cases for Ninetales and Palossand; prevents status redundancy
			return {cull: (
				moves.has('willowisp') ||
				moves.has('earthpower') ||
				(moves.has('toxic') && movePool.includes('earthpower'))
			)};
		case 'airslash':
			return {cull:
				(species.id === 'naganadel' && moves.has('nastyplot')) ||
				hasRestTalk ||
				(abilities.has('Simple') && !!counter.get('recovery')) ||
				counter.setupType === 'Physical',
			};
		case 'bravebird':
			// Special case for Mew, which only wants Brave Bird with Swords Dance
			return {cull: moves.has('dragondance')};
		case 'hurricane':
			return {cull: counter.setupType === 'Physical'};
		case 'futuresight':
			return {cull: moves.has('psyshock') || moves.has('trick') || movePool.includes('teleport')};
		case 'photongeyser':
			// Special case for Necrozma-DM, which always wants Dragon Dance
			return {cull: moves.has('morningsun')};
		case 'psychic':
			const alcremieCase = species.id === 'alcremiegmax' && counter.get('Status') < 2;
			return {cull: alcremieCase || (moves.has('psyshock') && (!!counter.setupType || isDoubles))};
		case 'psychicfangs':
			// Special case for Morpeko, which doesn't want 4 attacks Leftovers
			return {cull: moves.has('rapidspin')};
		case 'psyshock':
			// Special case for Sylveon which only wants Psyshock if it gets a Choice item
			const sylveonCase = abilities.has('Pixilate') && counter.get('Special') < 4;
			return {cull: moves.has('psychic') || (!counter.setupType && sylveonCase) || (isDoubles && moves.has('psychic'))};
		case 'bugbuzz':
			return {cull: moves.has('uturn') && !counter.setupType};
		case 'leechlife':
			return {cull:
				(isDoubles && moves.has('lunge')) ||
				(moves.has('uturn') && !counter.setupType) ||
				movePool.includes('spikes'),
			};
		case 'stoneedge':
			const gutsCullCondition = abilities.has('Guts') && (!moves.has('dynamicpunch') || moves.has('spikes'));
			const rockSlidePlusStatusPossible = counter.get('Status') && movePool.includes('rockslide');
			const otherRockMove = moves.has('rockblast') || moves.has('rockslide');
			const lucarioCull = species.id === 'lucario' && !!counter.setupType;
			return {cull: gutsCullCondition || (!isDoubles && rockSlidePlusStatusPossible) || otherRockMove || lucarioCull};
		case 'poltergeist':
			// Special case for Dhelmise in Doubles, which doesn't want both
			return {cull: moves.has('knockoff')};
		case 'shadowball':
			return {cull:
				(isDoubles && moves.has('phantomforce')) ||
				// Special case for Sylveon, which never wants Shadow Ball as its only coverage move
				(abilities.has('Pixilate') && (!!counter.setupType || counter.get('Status') > 1)) ||
				(!types.has('Ghost') && movePool.includes('focusblast')),
			};
		case 'shadowclaw':
			return {cull: types.has('Steel') && moves.has('shadowsneak') && counter.get('Physical') < 4};
		case 'dragonpulse': case 'spacialrend':
			return {cull: moves.has('dracometeor') && counter.get('Special') < 4};
		case 'darkpulse':
			const pulseIncompatible = ['foulplay', 'knockoff'].some(m => moves.has(m)) || (
				species.id === 'shiftry' && (moves.has('defog') || moves.has('suckerpunch'))
			);
			// Special clause to prevent bugged Shiftry sets with Sucker Punch + Nasty Plot
			const shiftryCase = movePool.includes('nastyplot') && !moves.has('defog');
			return {cull: pulseIncompatible && !shiftryCase && counter.setupType !== 'Special'};
		case 'suckerpunch':
			return {cull:
				// Shiftry in No Dynamax would otherwise get Choice Scarf Sucker Punch sometimes.
				(isNoDynamax && species.id === 'shiftry' && moves.has('defog')) ||
				moves.has('rest') ||
				counter.damagingMoves.size < 2 ||
				(counter.setupType === 'Special') ||
				(counter.get('Dark') > 1 && !types.has('Dark')),
			};
		case 'dazzlinggleam':
			return {cull: ['fleurcannon', 'moonblast', 'petaldance'].some(m => moves.has(m))};

		// Status:
		case 'bodyslam': case 'clearsmog':
			const toxicCullCondition = moves.has('toxic') && !types.has('Normal');
			return {cull: moves.has('sludgebomb') || moves.has('trick') || movePool.includes('recover') || toxicCullCondition};
		case 'haze':
			// Special case for Corsola-Galar, which always wants Will-O-Wisp
			return {cull: !teamDetails.stealthRock && (moves.has('stealthrock') || movePool.includes('stealthrock'))};
		case 'hypnosis':
			// Special case for Xurkitree to properly split Blunder Policy and Choice item sets
			return {cull: moves.has('voltswitch')};
		case 'willowisp': case 'yawn':
			// Swords Dance is a special case for Rapidash
			return {cull: moves.has('thunderwave') || moves.has('toxic') || moves.has('swordsdance')};
		case 'painsplit': case 'recover': case 'synthesis':
			return {cull: moves.has('rest') || moves.has('wish') || (move.id === 'synthesis' && moves.has('gigadrain'))};
		case 'roost':
			return {cull:
				moves.has('throatchop') ||
				// Hawlucha doesn't want Roost + 3 attacks
				(moves.has('stoneedge') && species.id === 'hawlucha') ||
				// Special cases for Salamence, Dynaless Dragonite, and Scizor to help prevent sets with poor coverage or no setup.
				(moves.has('dualwingbeat') && (moves.has('outrage') || species.id === 'scizor')),
			};
		case 'reflect': case 'lightscreen':
			return {cull: !!teamDetails.screens};
		case 'slackoff':
			// Special case to prevent Scaldless Slowking
			return {cull: species.id === 'slowking' && !moves.has('scald')};
		case 'substitute':
			const moveBasedCull = ['bulkup', 'nastyplot', 'painsplit', 'roost', 'swordsdance'].some(m => movePool.includes(m));
			// Smaller formes of Gourgeist in Doubles don't want Poltergeist as their only attack
			const doublesGourgeist = isDoubles && movePool.includes('powerwhip');
			// Calyrex wants Substitute + Leech Seed not Calm Mind + Leech Seed
			const calmMindCullCondition = !counter.get('recovery') && movePool.includes('calmmind') && species.id !== 'calyrex';
			// Eiscue wants to always have Liquidation and Belly Drum
			const eiscue = species.id === 'eiscue' && moves.has('zenheadbutt');
			return {cull: moves.has('rest') || moveBasedCull || doublesGourgeist || calmMindCullCondition || eiscue};
		case 'helpinghand':
			// Special case for Shuckle in Doubles, which doesn't want sets with no method to harm foes
			return {cull: moves.has('acupressure')};
		case 'wideguard':
			return {cull: moves.has('protect')};
		case 'grassknot':
			// Special case for Raichu and Heliolisk
			return {cull: moves.has('surf')};
		case 'icepunch':
			// Special case for Marshadow
			return {cull: moves.has('rocktomb')};
		case 'leechseed':
			// Special case for Calyrex to prevent Leech Seed + Calm Mind
			return {cull: !!counter.setupType};
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
		preferredType: string,
		role: RandomTeamsTypes.Role,
		isDoubles: boolean,
		isNoDynamax: boolean
	): boolean {
		if ([
			'Flare Boost', 'Hydration', 'Ice Body', 'Immunity', 'Innards Out', 'Insomnia', 'Misty Surge', 'Moody',
			'Perish Body', 'Quick Feet', 'Rain Dish', 'Snow Cloak', 'Steadfast', 'Steam Engine',
		].includes(ability)) return true;

		switch (ability) {
		// Abilities which are primarily useful for certain moves
		case 'Contrary': case 'Serene Grace': case 'Skill Link': case 'Strong Jaw':
			return !counter.get(toID(ability));
		case 'Analytic':
			return (moves.has('rapidspin') || species.nfe || isDoubles);
		case 'Blaze':
			return (isDoubles && abilities.has('Solar Power')) || (!isDoubles && !isNoDynamax && species.id === 'charizard');
		// case 'Bulletproof': case 'Overcoat':
		// 	return !!counter.setupType;
		case 'Chlorophyll':
			return (species.baseStats.spe > 100 || !counter.get('Fire') && !moves.has('sunnyday') && !teamDetails.sun);
		case 'Cloud Nine':
			return (!isNoDynamax || species.id !== 'golduck');
		case 'Competitive':
			return (counter.get('Special') < 2 || (moves.has('rest') && moves.has('sleeptalk')));
		case 'Compound Eyes': case 'No Guard':
			return !counter.get('inaccurate');
		case 'Cursed Body':
			return abilities.has('Infiltrator');
		case 'Defiant':
			return !counter.get('Physical');
		case 'Download':
			return (counter.damagingMoves.size < 3 || moves.has('trick'));
		case 'Early Bird':
			return (types.has('Grass') && isDoubles);
		case 'Flash Fire':
			return (this.dex.getEffectiveness('Fire', species) < -1 || abilities.has('Drought'));
		case 'Gluttony':
			return !moves.has('bellydrum');
		case 'Guts':
			return (!moves.has('facade') && !moves.has('sleeptalk') && !species.nfe);
		case 'Harvest':
			return (abilities.has('Frisk') && !isDoubles);
		case 'Hustle': case 'Inner Focus':
			return ((species.id !== 'glalie' && counter.get('Physical') < 2) || abilities.has('Iron Fist'));
		case 'Infiltrator':
			return (moves.has('rest') && moves.has('sleeptalk')) || (isDoubles && abilities.has('Clear Body'));
		case 'Intimidate':
			if (species.id === 'salamence' && moves.has('dragondance')) return true;
			return ['bodyslam', 'bounce', 'tripleaxel'].some(m => moves.has(m));
		case 'Iron Fist':
			return (counter.get('ironfist') < 2 || moves.has('dynamicpunch'));
		case 'Justified':
			return (isDoubles && abilities.has('Inner Focus'));
		case 'Lightning Rod':
			return (species.types.includes('Ground') || (!isNoDynamax && counter.setupType === 'Physical'));
		case 'Limber':
			return species.types.includes('Electric') || moves.has('facade');
		case 'Liquid Voice':
			return !moves.has('hypervoice');
		case 'Magic Guard':
			// For Sigilyph
			return (abilities.has('Tinted Lens') && !counter.get('Status') && !isDoubles);
		case 'Mold Breaker':
			return (
				abilities.has('Adaptability') || abilities.has('Scrappy') || (abilities.has('Unburden') && !!counter.setupType) ||
				(abilities.has('Sheer Force') && !!counter.get('sheerforce'))
			);
		case 'Moxie':
			return (counter.get('Physical') < 2 || moves.has('stealthrock') || moves.has('defog'));
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Own Tempo':
			return !moves.has('petaldance');
		case 'Power Construct':
			return (species.forme === '10%' && !isDoubles);
		case 'Prankster':
			return !counter.get('Status');
		case 'Pressure':
			return (!!counter.setupType || counter.get('Status') < 2 || isDoubles);
		case 'Refrigerate':
			return !counter.get('Normal');
		case 'Regenerator':
			// For Reuniclus
			return abilities.has('Magic Guard');
		case 'Reckless':
			return !counter.get('recoil') || moves.has('curse');
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Sand Force': case 'Sand Veil':
			return !teamDetails.sand;
		case 'Sand Rush':
			return (!teamDetails.sand && (isNoDynamax || !counter.setupType || !counter.get('Rock') || moves.has('rapidspin')));
		case 'Sap Sipper':
			// For Drampa, which wants Berserk with Roost
			return moves.has('roost');
		case 'Scrappy':
			return (moves.has('earthquake') && species.id === 'miltank');
		case 'Screen Cleaner':
			return !!teamDetails.screens;
		case 'Shed Skin':
			// For Scrafty
			return moves.has('dragondance');
		case 'Sheer Force':
			return (!counter.get('sheerforce') || abilities.has('Guts') || (species.id === 'druddigon' && !isDoubles));
		case 'Shell Armor':
			return (species.id === 'omastar' && (moves.has('spikes') || moves.has('stealthrock')));
		case 'Slush Rush':
			return (!teamDetails.hail && !abilities.has('Swift Swim'));
		case 'Sniper':
			// Inteleon wants Torrent unless it is Gmax
			return (species.name === 'Inteleon' || (counter.get('Water') > 1 && !moves.has('focusenergy')));
		case 'Solar Power':
			return (isNoDynamax && !teamDetails.sun);
		case 'Speed Boost':
			return (isNoDynamax && species.id === 'ninjask');
		case 'Steely Spirit':
			return (moves.has('fakeout') && !isDoubles);
		case 'Sturdy':
			return (moves.has('bulkup') || !!counter.get('recoil') || (!isNoDynamax && abilities.has('Solid Rock')));
		case 'Swarm':
			return (!counter.get('Bug') || !!counter.get('recovery'));
		case 'Sweet Veil':
			return types.has('Grass');
		case 'Swift Swim':
			if (isNoDynamax) {
				const neverWantsSwim = !moves.has('raindance') && [
					'Intimidate', 'Rock Head', 'Water Absorb',
				].some(m => abilities.has(m));
				const noSwimIfNoRain = !moves.has('raindance') && [
					'Cloud Nine', 'Lightning Rod', 'Intimidate', 'Rock Head', 'Sturdy', 'Water Absorb', 'Weak Armor',
				].some(m => abilities.has(m));
				return teamDetails.rain ? neverWantsSwim : noSwimIfNoRain;
			}
			return (!moves.has('raindance') && (
				['Intimidate', 'Rock Head', 'Slush Rush', 'Water Absorb'].some(abil => abilities.has(abil)) ||
				(abilities.has('Lightning Rod') && !counter.setupType)
			));
		case 'Synchronize':
			return counter.get('Status') < 3;
		case 'Technician':
			return (
				!counter.get('technician') ||
				moves.has('tailslap') ||
				abilities.has('Punk Rock') ||
				// For Doubles Alolan Persian
				movePool.includes('snarl')
			);
		case 'Tinted Lens':
			return (
				// For Sigilyph
				moves.has('defog') ||
				// For Butterfree
				(moves.has('hurricane') && abilities.has('Compound Eyes')) ||
				(counter.get('Status') > 2 && !counter.setupType)
			);
		case 'Torrent':
			// For Inteleon-Gmax and Primarina
			return (moves.has('focusenergy') || moves.has('hypervoice'));
		case 'Tough Claws':
			// For Perrserker
			return (types.has('Steel') && !moves.has('fakeout'));
		case 'Unaware':
			// For Swoobat and Clefable
			return (!!counter.setupType || moves.has('fireblast'));
		case 'Unburden':
			return (abilities.has('Prankster') || !counter.setupType && !isDoubles);
		case 'Volt Absorb':
			return (this.dex.getEffectiveness('Electric', species) < -1);
		case 'Water Absorb':
			return (
				moves.has('raindance') ||
				['Drizzle', 'Strong Jaw', 'Unaware', 'Volt Absorb'].some(abil => abilities.has(abil))
			);
		case 'Weak Armor':
			// The Speed less than 50 case is intended for Cursola, but could apply to any slow Pokémon.
			return (
				(!isNoDynamax && species.baseStats.spe > 50) ||
				species.id === 'skarmory' ||
				moves.has('shellsmash') || moves.has('rapidspin')
			);
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
		isDoubles: boolean,
		isNoDynamax: boolean
	): string {
		const abilityData = Array.from(abilities).map(a => this.dex.abilities.get(a));
		Utils.sortBy(abilityData, abil => -abil.rating);

		if (abilityData.length <= 1) return abilityData[0].name;

		// Hard-code abilities here

		// Lopunny, and other Facade users, don't want Limber, even if other abilities are poorly rated,
		// since paralysis would arguably be good for them.
		if (species.id === 'lopunny' && moves.has('facade')) return 'Cute Charm';
		if (species.id === 'copperajahgmax') return 'Heavy Metal';
		if (abilities.has('Guts') &&
			// for Ursaring in BDSP
			!abilities.has('Quick Feet') && (
			species.id === 'gurdurr' || species.id === 'throh' ||
			moves.has('facade') || (moves.has('rest') && moves.has('sleeptalk'))
		)) return 'Guts';
		if (abilities.has('Moxie') && (counter.get('Physical') > 3 || moves.has('bounce')) && !isDoubles) return 'Moxie';

		if (isDoubles) {
			if (abilities.has('Competitive') && !abilities.has('Shadow Tag') && !abilities.has('Strong Jaw')) return 'Competitive';
			if (abilities.has('Friend Guard')) return 'Friend Guard';
			if (abilities.has('Gluttony') && moves.has('recycle')) return 'Gluttony';
			if (abilities.has('Guts')) return 'Guts';
			if (abilities.has('Harvest')) return 'Harvest';
			if (abilities.has('Healer') && (
				abilities.has('Natural Cure') ||
				(abilities.has('Aroma Veil') && this.randomChance(1, 2))
			)) return 'Healer';
			if (abilities.has('Intimidate')) return 'Intimidate';
			if (species.id === 'lopunny') return 'Klutz';
			if (abilities.has('Magic Guard') && !abilities.has('Unaware')) return 'Magic Guard';
			if (abilities.has('Ripen')) return 'Ripen';
			if (abilities.has('Stalwart')) return 'Stalwart';
			if (abilities.has('Storm Drain')) return 'Storm Drain';
			if (abilities.has('Telepathy') && (abilities.has('Pressure') || abilities.has('Analytic'))) return 'Telepathy';
		}

		let abilityAllowed: Ability[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilityData) {
			if (ability.rating >= 1 && !this.shouldCullAbility(
				ability.name, types, moves, abilities, counter, movePool, teamDetails, species, '', '', isDoubles, isNoDynamax
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
		isLead: boolean,
		isDoubles: boolean
	) {
		// not undefined — we want "no item" not "go find a different item"
		if (moves.has('acrobatics') && ability !== 'Ripen') return ability === 'Grassy Surge' ? 'Grassy Seed' : '';
		if (moves.has('geomancy') || moves.has('meteorbeam')) return 'Power Herb';
		if (moves.has('shellsmash')) {
			if (ability === 'Sturdy' && !isLead && !isDoubles) return 'Heavy-Duty Boots';
			// Shell Smash + Solid Rock is intended for Carracosta, but I think
			// any Pokémon which can take a SE hit via Solid Rock deserves to have
			// its Shell Smash considered a good enough speed setup move for WP.
			if (ability === 'Solid Rock') return 'Weakness Policy';
			return 'White Herb';
		}
		// Techno Blast should always be Water-type
		if (moves.has('technoblast')) return 'Douse Drive';
		// Species-specific logic
		if (
			['Corsola', 'Garchomp', 'Tangrowth'].includes(species.name) &&
			counter.get('Status') &&
			!counter.setupType &&
			!isDoubles
		) return 'Rocky Helmet';

		if (species.name === 'Eternatus' && counter.get('Status') < 2) return 'Metronome';
		if (species.name === 'Farfetch\u2019d') return 'Leek';
		if (species.name === 'Froslass' && !isDoubles) return 'Wide Lens';
		if (species.name === 'Latios' && counter.get('Special') === 2 && !isDoubles) return 'Soul Dew';
		if (species.name === 'Lopunny') return isDoubles ? 'Iron Ball' : 'Toxic Orb';
		if (species.baseSpecies === 'Marowak') return 'Thick Club';
		if (species.baseSpecies === 'Pikachu') return 'Light Ball';
		if (species.name === 'Regieleki' && !isDoubles) return 'Magnet';
		if (species.name === 'Shedinja') {
			const noSash = !teamDetails.defog && !teamDetails.rapidSpin && !isDoubles;
			return noSash ? 'Heavy-Duty Boots' : 'Focus Sash';
		}
		if (species.name === 'Shuckle' && moves.has('stickyweb')) return 'Mental Herb';
		if (species.name === 'Unfezant' || moves.has('focusenergy')) return 'Scope Lens';
		if (species.name === 'Pincurchin') return 'Shuca Berry';
		if (species.name === 'Wobbuffet' && moves.has('destinybond')) return 'Custap Berry';
		if (species.name === 'Scyther' && counter.damagingMoves.size > 3) return 'Choice Band';
		if (species.name === 'Cinccino' && !moves.has('uturn')) return 'Life Orb';
		if (moves.has('bellydrum') && moves.has('substitute')) return 'Salac Berry';

		// Misc item generation logic
		const HDBBetterThanEviolite = (
			!isDoubles &&
			(!isLead || moves.has('uturn')) &&
			this.dex.getEffectiveness('Rock', species) >= 2
		);
		if (species.nfe) return HDBBetterThanEviolite ? 'Heavy-Duty Boots' : 'Eviolite';

		// Ability based logic and miscellaneous logic
		if (species.name === 'Wobbuffet' || ['Cheek Pouch', 'Harvest', 'Ripen'].includes(ability)) return 'Sitrus Berry';
		if (ability === 'Gluttony') return this.sample(['Aguav', 'Figy', 'Iapapa', 'Mago', 'Wiki']) + ' Berry';
		if (
			ability === 'Imposter' ||
			(ability === 'Magnet Pull' && moves.has('bodypress') && !isDoubles)
		) return 'Choice Scarf';
		if (
			ability === 'Guts' &&
			(counter.get('Physical') > 2 || isDoubles)
		) {
			return types.has('Fire') ? 'Toxic Orb' : 'Flame Orb';
		}
		if (ability === 'Magic Guard' && counter.damagingMoves.size > 1) {
			return moves.has('counter') ? 'Focus Sash' : 'Life Orb';
		}
		if (ability === 'Sheer Force' && counter.get('sheerforce')) return 'Life Orb';
		if (ability === 'Unburden') return (moves.has('closecombat') || moves.has('curse')) ? 'White Herb' : 'Sitrus Berry';

		if (moves.has('trick') || (moves.has('switcheroo') && !isDoubles) || ability === 'Gorilla Tactics') {
			if (species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && !counter.get('priority') && ability !== 'Triage') {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (moves.has('auroraveil') || moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (moves.has('rest') && !moves.has('sleeptalk') && ability !== 'Shed Skin') return 'Chesto Berry';
		if (moves.has('hypnosis') && ability === 'Beast Boost') return 'Blunder Policy';
		if (moves.has('bellydrum')) return 'Sitrus Berry';

		if (this.dex.getEffectiveness('Rock', species) >= 2 && !isDoubles) {
			return 'Heavy-Duty Boots';
		}
	}

	/** Item generation specific to Random Doubles */
	getDoublesItem(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
	): string | undefined {
		const defensiveStatTotal = species.baseStats.hp + species.baseStats.def + species.baseStats.spd;

		if (
			(['dragonenergy', 'eruption', 'waterspout'].some(m => moves.has(m))) &&
			counter.damagingMoves.size >= 4
		) return 'Choice Scarf';
		if (moves.has('blizzard') && ability !== 'Snow Warning' && !teamDetails.hail) return 'Blunder Policy';
		if (this.dex.getEffectiveness('Rock', species) >= 2 && !types.has('Flying')) return 'Heavy-Duty Boots';
		if (counter.get('Physical') >= 4 && ['fakeout', 'feint', 'rapidspin', 'suckerpunch'].every(m => !moves.has(m)) && (
			types.has('Dragon') || types.has('Fighting') || types.has('Rock') ||
			moves.has('flipturn') || moves.has('uturn')
		)) {
			return (
				!counter.get('priority') && !abilities.has('Speed Boost') &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 100 &&
				this.randomChance(1, 2)
			) ? 'Choice Scarf' : 'Choice Band';
		}
		if (
			(
				counter.get('Special') >= 4 &&
				(types.has('Dragon') || types.has('Fighting') || types.has('Rock') || moves.has('voltswitch'))
			) || (
				(counter.get('Special') >= 3 && (moves.has('flipturn') || moves.has('uturn'))) &&
				!moves.has('acidspray') && !moves.has('electroweb')
			)
		) {
			return (
				species.baseStats.spe >= 60 && species.baseStats.spe <= 100 && this.randomChance(1, 2)
			) ? 'Choice Scarf' : 'Choice Specs';
		}
		// This one is intentionally below the Choice item checks.
		if ((defensiveStatTotal < 250 && ability === 'Regenerator') || species.name === 'Pheromosa') return 'Life Orb';
		if (counter.damagingMoves.size >= 4 && defensiveStatTotal >= 275) return 'Assault Vest';
		if (
			counter.damagingMoves.size >= 3 &&
			species.baseStats.spe >= 60 &&
			ability !== 'Multiscale' && ability !== 'Sturdy' &&
			[
				'acidspray', 'clearsmog', 'electroweb', 'fakeout', 'feint', 'icywind',
				'incinerate', 'naturesmadness', 'rapidspin', 'snarl', 'uturn',
			].every(m => !moves.has(m))
		) return (ability === 'Defeatist' || defensiveStatTotal >= 275) ? 'Sitrus Berry' : 'Life Orb';
	}

	getMediumPriorityItem(
		ability: string,
		moves: Set<string>,
		counter: MoveCounter,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		isNoDynamax: boolean
	): string | undefined {
		const defensiveStatTotal = species.baseStats.hp + species.baseStats.def + species.baseStats.spd;

		// Choice items
		if (
			!isDoubles && counter.get('Physical') >= 4 && ability !== 'Serene Grace' &&
			['fakeout', 'flamecharge', 'rapidspin'].every(m => !moves.has(m))
		) {
			const scarfReqs = (
				(species.baseStats.atk >= 100 || ability === 'Huge Power') &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Speed Boost' && !counter.get('priority') &&
				(isNoDynamax || ['bounce', 'dualwingbeat'].every(m => !moves.has(m)))
			);
			return (scarfReqs && this.randomChance(2, 3)) ? 'Choice Scarf' : 'Choice Band';
		}
		if (!isDoubles && (
			(counter.get('Special') >= 4 && !moves.has('futuresight')) ||
			(counter.get('Special') >= 3 && ['flipturn', 'partingshot', 'uturn'].some(m => moves.has(m)))
		)) {
			const scarfReqs = (
				species.baseStats.spa >= 100 &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Tinted Lens' && !counter.get('Physical')
			);
			return (scarfReqs && this.randomChance(2, 3)) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (
			!isDoubles &&
			counter.get('Physical') >= 3 &&
			!moves.has('rapidspin') &&
			['copycat', 'memento', 'partingshot'].some(m => moves.has(m))
		) return 'Choice Band';
		if (
			!isDoubles &&
			((counter.get('Physical') >= 3 && moves.has('defog')) || (counter.get('Special') >= 3 && moves.has('healingwish'))) &&
			!counter.get('priority') && !moves.has('uturn')
		) return 'Choice Scarf';

		// Palkia sometimes wants Choice items instead
		if (species.name === 'Palkia') return 'Lustrous Orb';

		// Other items
		if (
			moves.has('raindance') || moves.has('sunnyday') ||
			(ability === 'Speed Boost' && !counter.get('hazards')) ||
			(ability === 'Stance Change' && counter.damagingMoves.size >= 3)
		) return 'Life Orb';
		if (
			!isDoubles &&
			this.dex.getEffectiveness('Rock', species) >= 1 && (
				['Defeatist', 'Emergency Exit', 'Multiscale'].includes(ability) ||
				['courtchange', 'defog', 'rapidspin'].some(m => moves.has(m))
			)
		) return 'Heavy-Duty Boots';
		if (species.name === 'Necrozma-Dusk-Mane' || (
			this.dex.getEffectiveness('Ground', species) < 2 &&
			counter.get('speedsetup') &&
			counter.damagingMoves.size >= 3 &&
			defensiveStatTotal >= 300
		)) return 'Weakness Policy';
		if (counter.damagingMoves.size >= 4 && defensiveStatTotal >= 235) return 'Assault Vest';
		if (
			['clearsmog', 'curse', 'haze', 'healbell', 'protect', 'sleeptalk', 'strangesteam'].some(m => moves.has(m)) &&
			!isDoubles
		) return 'Leftovers';
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
		isDoubles: boolean,
		isNoDynamax: boolean
	): string | undefined {
		const defensiveStatTotal = species.baseStats.hp + species.baseStats.def + species.baseStats.spd;

		if (
			isLead && !isDoubles &&
			!['Disguise', 'Sturdy'].includes(ability) && !moves.has('substitute') &&
			!counter.get('drain') && !counter.get('recoil') && !counter.get('recovery') &&
			((defensiveStatTotal <= 250 && counter.get('hazards')) || defensiveStatTotal <= 210)
		) return 'Focus Sash';
		if (
			moves.has('clangoroussoul') ||
			// We manually check for speed-boosting moves, rather than using `counter.get('speedsetup')`,
			// because we want to check for ANY speed boosting move.
			// In particular, Shift Gear + Boomburst Toxtricity should get Throat Spray.
			(moves.has('boomburst') && Array.from(moves).some(m => this.dex.moves.get(m).boosts?.spe))
		) return 'Throat Spray';

		const rockWeaknessCase = (
			this.dex.getEffectiveness('Rock', species) >= 1 &&
			(!teamDetails.defog || ability === 'Intimidate' || moves.has('uturn') || moves.has('voltswitch'))
		);
		const spinnerCase = (moves.has('rapidspin') && (ability === 'Regenerator' || !!counter.get('recovery')));
		if (!isDoubles && (rockWeaknessCase || spinnerCase)) return 'Heavy-Duty Boots';

		if (
			!isDoubles && this.dex.getEffectiveness('Ground', species) >= 2 && !types.has('Poison') &&
			ability !== 'Levitate' && !abilities.has('Iron Barbs')
		) return 'Air Balloon';
		if (
			!isDoubles &&
			counter.damagingMoves.size >= 3 &&
			!counter.get('damage') &&
			ability !== 'Sturdy' &&
			(species.baseStats.spe >= 90 || !moves.has('voltswitch')) &&
			['foulplay', 'rapidspin', 'substitute', 'uturn'].every(m => !moves.has(m)) && (
				counter.get('speedsetup') ||
				// No Dynamax Buzzwole doesn't want Life Orb with Bulk Up + 3 attacks
				(counter.get('drain') && (!isNoDynamax || species.id !== 'buzzwole' || moves.has('roost'))) ||
				moves.has('trickroom') || moves.has('psystrike') ||
				(species.baseStats.spe > 40 && defensiveStatTotal < 275)
			)
		) return 'Life Orb';
		if (
			!isDoubles &&
			counter.damagingMoves.size >= 4 &&
			!counter.get('Dragon') &&
			!counter.get('Normal')
		) {
			return 'Expert Belt';
		}
		if (
			!isDoubles &&
			!moves.has('substitute') &&
			(moves.has('dragondance') || moves.has('swordsdance')) &&
			(moves.has('outrage') || (
				['Bug', 'Fire', 'Ground', 'Normal', 'Poison'].every(type => !types.has(type)) &&
				!['Pastel Veil', 'Storm Drain'].includes(ability)
			))
		) return 'Lum Berry';
	}

	getLevel(
		species: Species,
		isDoubles: boolean,
		isNoDynamax: boolean,
	): number {
		const data = this.randomData[species.id];
		// level set by rules
		if (this.adjustLevel) return this.adjustLevel;
		// doubles levelling
		if (isDoubles && data.doublesLevel) return data.doublesLevel;
		// No Dmax levelling
		if (isNoDynamax) {
			const tier = species.name.endsWith('-Gmax') ? this.dex.species.get(species.changesFrom).tier : species.tier;
			const tierScale: Partial<Record<Species['tier'], number>> = {
				Uber: 76,
				OU: 80,
				UUBL: 81,
				UU: 82,
				RUBL: 83,
				RU: 84,
				NUBL: 85,
				NU: 86,
				PUBL: 87,
				PU: 88, "(PU)": 88, NFE: 88,
			};
			const customScale: {[k: string]: number} = {
				// These Pokemon are too strong and need a lower level
				zaciancrowned: 65, calyrexshadow: 68, xerneas: 70, necrozmaduskmane: 72, zacian: 72, kyogre: 73, eternatus: 73,
				zekrom: 74, marshadow: 75, urshifurapidstrike: 79, haxorus: 80, inteleon: 80,
				cresselia: 83, jolteon: 84, swoobat: 84, dugtrio: 84, slurpuff: 84, polteageist: 84,
				wobbuffet: 86, scrafty: 86,
				// These Pokemon are too weak and need a higher level
				delibird: 100, vespiquen: 96, pikachu: 92, shedinja: 92, solrock: 90, arctozolt: 88, reuniclus: 87,
				decidueye: 87, noivern: 85, magnezone: 82, slowking: 81,
			};
			return customScale[species.id] || tierScale[tier] || 80;
		}
		// BDSP tier levelling
		if (this.dex.currentMod === 'gen8bdsp') {
			const tierScale: Partial<Record<Species['tier'], number>> = {
				Uber: 76, Unreleased: 76,
				OU: 80,
				UUBL: 81,
				UU: 82,
				RUBL: 83,
				RU: 84,
				NUBL: 85,
				NU: 86,
				PUBL: 87,
				PU: 88, "(PU)": 88, NFE: 88,
			};
			const customScale: {[k: string]: number} = {
				delibird: 100, dugtrio: 76, glalie: 76, luvdisc: 100, spinda: 100, unown: 100,
			};

			return customScale[species.id] || tierScale[species.tier] || 80;
		}
		// Arbitrary levelling base on data files (typically winrate-influenced)
		if (data.level) return data.level;
		// Finally default to level 80
		return 80;
	}

	getForme(species: Species): string {
		if (typeof species.battleOnly === 'string') {
			// Only change the forme. The species has custom moves, and may have different typing and requirements.
			return species.battleOnly;
		}
		if (species.cosmeticFormes) return this.sample([species.name].concat(species.cosmeticFormes));
		if (species.name.endsWith('-Gmax')) return species.name.slice(0, -5);

		// Consolidate mostly-cosmetic formes, at least for the purposes of Random Battles
		if (['Magearna', 'Polteageist', 'Zarude'].includes(species.baseSpecies)) {
			return this.sample([species.name].concat(species.otherFormes!));
		}
		if (species.baseSpecies === 'Basculin') return 'Basculin' + this.sample(['', '-Blue-Striped']);
		if (species.baseSpecies === 'Keldeo' && this.gen <= 7) return 'Keldeo' + this.sample(['', '-Resolute']);
		if (species.baseSpecies === 'Pikachu' && this.dex.currentMod === 'gen8') {
			return 'Pikachu' + this.sample(
				['', '-Original', '-Hoenn', '-Sinnoh', '-Unova', '-Kalos', '-Alola', '-Partner', '-World']
			);
		}
		return species.name;
	}

	randomSet(
		species: string | Species,
		teamDetails: RandomTeamsTypes.TeamDetails = {},
		isLead = false,
		isDoubles = false,
		isNoDynamax = false
	): RandomTeamsTypes.RandomSet {
		species = this.dex.species.get(species);
		const forme = this.getForme(species);
		const gmax = species.name.endsWith('-Gmax');

		const data = this.randomData[species.id];

		const randMoves =
			(isDoubles && data.doublesMoves) ||
			(isNoDynamax && data.noDynamaxMoves) ||
			data.moves;
		const movePool: string[] = [...(randMoves || this.dex.species.getMovePool(species.id))];
		if (this.format.playerCount > 2) {
			// Random Multi Battle uses doubles move pools, but Ally Switch fails in multi battles
			// Random Free-For-All also uses doubles move pools, for now
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
		let ability = '';
		let item = undefined;

		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};

		const types = new Set(species.types);
		const abilities = new Set(Object.values(species.abilities));
		if (species.unreleasedHidden) abilities.delete(species.abilities.H);

		const moves = new Set<string>();
		let counter: MoveCounter;
		// This is just for BDSP Unown;
		// it can be removed from this file if BDSP gets its own random-teams file in the future.
		let hasHiddenPower = false;

		do {
			// Choose next 4 moves from learnset/viable moves and add them to moves list:
			const pool = (movePool.length ? movePool : rejectedPool);
			while (moves.size < this.maxMoveCount && pool.length) {
				const moveid = this.sampleNoReplace(pool);
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
					movePool, moves, abilities, types, counter, species, teamDetails
				);
			};

			// Iterate through the moves again, this time to cull them:
			for (const moveid of moves) {
				const move = this.dex.moves.get(moveid);
				let {cull, isSetup} = this.shouldCullMove(
					move, types, moves, abilities, counter,
					movePool, teamDetails, species, isLead, isDoubles, isNoDynamax
				);

				if (move.id !== 'photongeyser' && (
					(move.category === 'Physical' && counter.setupType === 'Special') ||
					(move.category === 'Special' && counter.setupType === 'Physical')
				)) {
					// Reject STABs last in case the setup type changes later on
					const stabs = counter.get(species.types[0]) + (species.types[1] ? counter.get(species.types[1]) : 0);
					if (!types.has(move.type) || stabs > 1 || counter.get(move.category) < 2) cull = true;
				}

				// Pokemon should have moves that benefit their types, stats, or ability
				const isLowBP = move.basePower && move.basePower < 50;

				// Genesect-Douse should never reject Techno Blast
				const moveIsRejectable = (
					!(species.id === 'genesectdouse' && move.id === 'technoblast') &&
					!(species.id === 'togekiss' && move.id === 'nastyplot') &&
					!(species.id === 'shuckle' && ['stealthrock', 'stickyweb'].includes(move.id)) && (
						move.category === 'Status' ||
						(!types.has(move.type) && move.id !== 'judgment') ||
						(isLowBP && !move.multihit && !abilities.has('Technician'))
					)
				);
				// Setup-supported moves should only be rejected under specific circumstances
				const notImportantSetup = (
					!counter.setupType ||
					counter.setupType === 'Mixed' ||
					(counter.get(counter.setupType) + counter.get('Status') > 3 && !counter.get('hazards')) ||
					(move.category !== counter.setupType && move.category !== 'Status')
				);

				if (moveIsRejectable && (
					!cull && !isSetup && !move.weather && !move.stallingMove && notImportantSetup && !move.damage &&
					(isDoubles ? this.unrejectableMovesInDoubles(move) : this.unrejectableMovesInSingles(move))
				)) {
					// There may be more important moves that this Pokemon needs
					if (
						// Pokemon should have at least one STAB move
						(!counter.get('stab') && counter.get('physicalpool') + counter.get('specialpool') > 0 && move.id !== 'stickyweb') ||
						// Swords Dance Mew should have Brave Bird
						(moves.has('swordsdance') && species.id === 'mew' && runEnforcementChecker('Flying')) ||
						// Dhelmise should have Anchor Shot
						(abilities.has('Steelworker') && runEnforcementChecker('Steel')) ||
						// Check for miscellaneous important moves
						(!isDoubles && runEnforcementChecker('recovery') && move.id !== 'stickyweb') ||
						runEnforcementChecker('screens') ||
						runEnforcementChecker('misc') ||
						((isLead || species.id === 'shuckle') && runEnforcementChecker('lead')) ||
						(moves.has('leechseed') && runEnforcementChecker('leechseed'))
					) {
						cull = true;
					// Pokemon should have moves that benefit their typing
					// Don't cull Sticky Web in type-based enforcement, and make sure Azumarill always has Aqua Jet
					} else if (move.id !== 'stickyweb' && !(species.id === 'azumarill' && move.id === 'aquajet')) {
						for (const type of types) {
							if (runEnforcementChecker(type)) {
								cull = true;
							}
						}
					}
				}

				// Sleep Talk shouldn't be selected without Rest
				if (move.id === 'rest' && cull) {
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
				if (cull && movePool.length) {
					if (moveid.startsWith('hiddenpower')) hasHiddenPower = false;
					if (move.category !== 'Status' && !move.damage) rejectedPool.push(moveid);
					moves.delete(moveid);
					break;
				}
				if (cull && rejectedPool.length) {
					if (moveid.startsWith('hiddenpower')) hasHiddenPower = false;
					moves.delete(moveid);
					break;
				}
			}
		} while (moves.size < this.maxMoveCount && (movePool.length || rejectedPool.length));

		// for BD/SP only
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

		ability = this.getAbility(types, moves, abilities, counter, movePool, teamDetails, species,
			'', '', isDoubles, isNoDynamax);

		if (species.requiredItems) {
			item = this.sample(species.requiredItems);
		// First, the extra high-priority items
		} else {
			item = this.getHighPriorityItem(ability, types, moves, counter, teamDetails, species, isLead, isDoubles);
			if (item === undefined && isDoubles) {
				item = this.getDoublesItem(ability, types, moves, abilities, counter, teamDetails, species);
			}
			if (item === undefined) {
				item = this.getMediumPriorityItem(ability, moves, counter, species, isLead, isDoubles, isNoDynamax);
			}
			if (item === undefined) {
				item = this.getLowPriorityItem(
					ability, types, moves, abilities, counter, teamDetails, species, isLead, isDoubles, isNoDynamax
				);
			}

			// fallback
			if (item === undefined) item = isDoubles ? 'Sitrus Berry' : 'Leftovers';
		}

		// For Trick / Switcheroo
		if (item === 'Leftovers' && types.has('Poison')) {
			item = 'Black Sludge';
		}

		const level: number = this.getLevel(species, isDoubles, isNoDynamax);

		// Prepare optimal HP
		const srImmunity = ability === 'Magic Guard' || item === 'Heavy-Duty Boots';
		const srWeakness = srImmunity ? 0 : this.dex.getEffectiveness('Rock', species);
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			const multipleOfFourNecessary = (moves.has('substitute') && !['Leftovers', 'Black Sludge'].includes(item) && (
				item === 'Sitrus Berry' ||
				item === 'Salac Berry' ||
				ability === 'Power Construct'
			));
			if (multipleOfFourNecessary) {
				// Two Substitutes should activate Sitrus Berry
				if (hp % 4 === 0) break;
			} else if (moves.has('bellydrum') && (item === 'Sitrus Berry' || ability === 'Gluttony')) {
				// Belly Drum should activate Sitrus Berry
				if (hp % 2 === 0) break;
			} else if (moves.has('substitute') && moves.has('reversal')) {
				// Reversal users should be able to use four Substitutes
				if (hp % 4 > 0) break;
			} else {
				// Maximize number of Stealth Rock switch-ins
				if (srWeakness <= 0 || hp % (4 / srWeakness) > 0) break;
			}
			evs.hp -= 4;
		}

		if (moves.has('shellsidearm') && item === 'Choice Specs') evs.atk -= 8;

		// Minimize confusion damage
		const noAttackStatMoves = [...moves].every(m => {
			const move = this.dex.moves.get(m);
			if (move.damageCallback || move.damage) return true;
			return move.category !== 'Physical' || move.id === 'bodypress';
		});
		if (noAttackStatMoves && !moves.has('transform') && (!moves.has('shellsidearm') || !counter.get('Status'))) {
			evs.atk = 0;
			ivs.atk = 0;
		}

		// Ensure Nihilego's Beast Boost gives it Special Attack boosts instead of Special Defense
		if (forme === 'Nihilego') evs.spd -= 32;

		if (moves.has('gyroball') || moves.has('trickroom')) {
			evs.spe = 0;
			ivs.spe = 0;
		}

		return {
			name: species.baseSpecies,
			species: forme,
			gender: species.gender,
			shiny: this.randomChance(1, 1024),
			gigantamax: gmax,
			level,
			moves: Array.from(moves),
			ability,
			evs,
			ivs,
			item,
		};
	}

	getPokemonPool(
		type: string,
		pokemonToExclude: RandomTeamsTypes.RandomSet[] = [],
		isMonotype = false,
		pokemonList: string[]
	): [{[k: string]: string[]}, string[]] {
		const exclude = pokemonToExclude.map(p => toID(p.species));
		const pokemonPool: {[k: string]: string[]} = {};
		const baseSpeciesPool = [];
		for (const pokemon of pokemonList) {
			let species = this.dex.species.get(pokemon);
			if (exclude.includes(species.id)) continue;
			if (isMonotype) {
				if (!species.types.includes(type)) continue;
				if (typeof species.battleOnly === 'string') {
					species = this.dex.species.get(species.battleOnly);
					if (!species.types.includes(type)) continue;
				}
			}

			if (species.baseSpecies in pokemonPool) {
				pokemonPool[species.baseSpecies].push(pokemon);
			} else {
				pokemonPool[species.baseSpecies] = [pokemon];
			}
		}
		// Include base species 1x if 1-3 formes, 2x if 4-6 formes, 3x if 7+ formes
		for (const baseSpecies of Object.keys(pokemonPool)) {
			// Squawkabilly has 4 formes, but only 2 functionally different formes, so only include it 1x
			const weight = (baseSpecies === 'Squawkabilly') ? 1 : Math.min(Math.ceil(pokemonPool[baseSpecies].length / 3), 3);
			for (let i = 0; i < weight; i++) baseSpeciesPool.push(baseSpecies);
		}
		return [pokemonPool, baseSpeciesPool];
	}

	randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const seed = this.prng.seed;
		const ruleTable = this.dex.formats.getRuleTable(this.format);
		const pokemon: RandomTeamsTypes.RandomSet[] = [];

		// For Monotype
		const isMonotype = !!this.forceMonotype || ruleTable.has('sametypeclause');
		const isDoubles = this.format.gameType !== 'singles';
		const typePool = this.dex.types.names();
		const type = this.forceMonotype || this.sample(typePool);

		// PotD stuff
		const usePotD = global.Config && Config.potd && ruleTable.has('potd');
		const potd = usePotD ? this.dex.species.get(Config.potd) : null;

		const baseFormes: {[k: string]: number} = {};

		const typeCount: {[k: string]: number} = {};
		const typeComboCount: {[k: string]: number} = {};
		const typeWeaknesses: {[k: string]: number} = {};
		const typeDoubleWeaknesses: {[k: string]: number} = {};
		const teamDetails: RandomTeamsTypes.TeamDetails = {};
		let numMaxLevelPokemon = 0;

		const pokemonList = [];
		for (const poke of Object.keys(this.randomData)) {
			if (isDoubles && this.randomData[poke]?.doublesMoves || !isDoubles && this.randomData[poke]?.moves) {
				pokemonList.push(poke);
			}
		}
		const [pokemonPool, baseSpeciesPool] = this.getPokemonPool(type, pokemon, isMonotype, pokemonList);
		while (baseSpeciesPool.length && pokemon.length < this.maxTeamSize) {
			const baseSpecies = this.sampleNoReplace(baseSpeciesPool);
			let species = this.dex.species.get(this.sample(pokemonPool[baseSpecies]));
			if (!species.exists) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[species.baseSpecies]) continue;

			// Illusion shouldn't be on the last slot
			if (species.name === 'Zoroark' && pokemon.length >= (this.maxTeamSize - 1)) continue;
			// The sixth slot should not be Zacian/Zamazenta/Eternatus if Zoroark is present,
			// as they make dynamax malfunction, regardless of level
			if (
				pokemon.some(pkmn => pkmn.name === 'Zoroark') &&
				pokemon.length >= (this.maxTeamSize - 1) &&
				['Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Eternatus'].includes(species.name)
			) {
				continue;
			}

			const types = species.types;
			const typeCombo = types.slice().sort().join();
			const weakToFreezeDry = (
				this.dex.getEffectiveness('Ice', species) > 0 ||
				(this.dex.getEffectiveness('Ice', species) > -2 && types.includes('Water'))
			);
			// Dynamically scale limits for different team sizes. The default and minimum value is 1.
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

			if (!isMonotype && !this.forceMonotype) {
				let skip = false;

				// Limit two of any type
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
						if (typeDoubleWeaknesses[typeName] >= 1 * limitFactor) {
							skip = true;
							break;
						}
					}
				}
				if (skip) continue;

				// Limit four weak to Freeze-Dry
				if (weakToFreezeDry) {
					if (!typeWeaknesses['Freeze-Dry']) typeWeaknesses['Freeze-Dry'] = 0;
					if (typeWeaknesses['Freeze-Dry'] >= 4 * limitFactor) continue;
				}

				// Limit one level 100 Pokemon
				if (
					!this.adjustLevel && numMaxLevelPokemon >= limitFactor &&
					(this.getLevel(species, isDoubles, this.dex.formats.getRuleTable(this.format).has('dynamaxclause')) === 100)
				) continue;
			}

			// Limit three of any type combination in Monotype
			if (!this.forceMonotype && isMonotype && (typeComboCount[typeCombo] >= 3 * limitFactor)) continue;

			// The Pokemon of the Day
			if (potd?.exists && (pokemon.length === 1 || this.maxTeamSize === 1)) species = potd;

			const set = this.randomSet(species, teamDetails, pokemon.length === 0,
				isDoubles, this.dex.formats.getRuleTable(this.format).has('dynamaxclause'));

			// Okay, the set passes, add it to our team
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
				if (this.dex.getEffectiveness(typeName, species) > 1) {
					typeDoubleWeaknesses[typeName]++;
				}
			}
			if (weakToFreezeDry) typeWeaknesses['Freeze-Dry']++;

			// Increment level 100 counter
			if (set.level === 100) numMaxLevelPokemon++;

			// Track what the team has
			if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails.rain = 1;
			if (set.ability === 'Drought' || set.moves.includes('sunnyday')) teamDetails.sun = 1;
			if (set.ability === 'Sand Stream') teamDetails.sand = 1;
			if (set.ability === 'Snow Warning') teamDetails.hail = 1;
			if (set.moves.includes('spikes')) teamDetails.spikes = (teamDetails.spikes || 0) + 1;
			if (set.moves.includes('stealthrock')) teamDetails.stealthRock = 1;
			if (set.moves.includes('stickyweb')) teamDetails.stickyWeb = 1;
			if (set.moves.includes('toxicspikes')) teamDetails.toxicSpikes = 1;
			if (set.moves.includes('defog')) teamDetails.defog = 1;
			if (set.moves.includes('rapidspin')) teamDetails.rapidSpin = 1;
			if (set.moves.includes('auroraveil') || (set.moves.includes('reflect') && set.moves.includes('lightscreen'))) {
				teamDetails.screens = 1;
			}
		}
		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) { // large teams sometimes cannot be built
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}

		return pokemon;
	}

	randomCAP1v1Sets: AnyObject = {};

	randomCAP1v1Team() {
		this.enforceNoDirectCustomBanlistChanges();

		const pokemon = [];
		const pokemonPool = Object.keys(this.randomCAP1v1Sets);

		while (pokemonPool.length && pokemon.length < this.maxTeamSize) {
			const species = this.dex.species.get(this.sampleNoReplace(pokemonPool));
			if (!species.exists) throw new Error(`Invalid Pokemon "${species}" in ${this.format}`);
			if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			const setData: AnyObject = this.sample(this.randomCAP1v1Sets[species.name]);
			const set = {
				name: species.baseSpecies,
				species: species.name,
				gender: species.gender,
				item: this.sampleIfArray(setData.item) || '',
				ability: (this.sampleIfArray(setData.ability)),
				shiny: this.randomChance(1, 1024),
				level: this.adjustLevel || 100,
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, ...setData.evs},
				nature: setData.nature,
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...setData.ivs || {}},
				moves: setData.moves.map((move: any) => this.sampleIfArray(move)),
			};
			if (this.adjustLevel) set.level = this.adjustLevel;
			pokemon.push(set);
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
		const weatherAbilities = ['drizzle', 'drought', 'snowwarning', 'sandstream'];

		// Build a pool of eligible sets, given the team partners
		// Also keep track of sets with moves the team requires
		let effectivePool: {set: AnyObject, moveVariants?: number[], item?: string, ability?: string}[] = [];
		const priorityPool = [];
		for (const curSet of setList) {
			// if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			// reject disallowed items, specifically a second of any given choice item
			const allowedItems: string[] = [];
			for (const itemString of curSet.item) {
				const item = this.dex.items.get(itemString);
				if (itemsMax[item.id] && teamData.has[item.id] >= itemsMax[item.id]) continue;
				allowedItems.push(itemString);
			}
			if (allowedItems.length === 0) continue;
			const curSetItem = this.sample(allowedItems);

			// reject 2+ weather setters
			const allowedAbilities: string[] = [];
			for (const abilityString of curSet.ability) {
				const ability = this.dex.abilities.get(abilityString);
				if (teamData.weather && weatherAbilities.includes(ability.id)) continue;
				allowedAbilities.push(abilityString);
			}
			if (allowedAbilities.length === 0) continue;
			const curSetAbility = this.sample(allowedAbilities);

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

			const fullSetSpec = {set: curSet, moveVariants: curSetVariants, item: curSetItem, ability: curSetAbility};
			effectivePool.push(fullSetSpec);
			if (hasRequiredMove) priorityPool.push(fullSetSpec);
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


		const item = setData.item || this.sampleIfArray(setData.set.item);
		const ability = setData.ability || this.sampleIfArray(setData.set.ability);
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
		// Leaving Monotype code in comments in case it's used in the future
		// const isMonotype = !!this.forceMonotype || this.dex.formats.getRuleTable(this.format).has('sametypeclause');

		// The teams generated depend on the tier choice in such a way that
		// no exploitable information is leaked from rolling the tier in getTeam(p1).
		if (!this.factoryTier) {
		//	this.factoryTier = isMonotype ? 'Mono' : this.sample(['Uber', 'OU', 'UU', 'RU', 'NU', 'PU', 'LC']);
			this.factoryTier = this.sample(['Uber', 'OU', 'UU', 'RU', 'NU', 'PU', 'LC']);
		}
		/*
		} else if (isMonotype && this.factoryTier !== 'Mono') {
			// I don't think this can ever happen?
			throw new Error(`Can't generate a Monotype Battle Factory set in a battle with factory tier ${this.factoryTier}`);
		}
		*/

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

		// const typePool = this.dex.types.names();
		// const type = this.sample(typePool);

		const teamData: TeamData = {
			typeCount: {}, typeComboCount: {}, baseFormes: {},
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

			// const speciesFlags = this.randomFactorySets[this.factoryTier][species.id].flags;

			// Limit to one of each species (Species Clause)
			if (teamData.baseFormes[species.baseSpecies]) continue;

			const set = this.randomFactorySet(species, teamData, this.factoryTier);
			if (!set) continue;

			const itemData = this.dex.items.get(set.item);

			const types = species.types;
			// Dynamically scale limits for different team sizes. The default and minimum value is 1.
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;
			/*
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
			} else
			*/
			{
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
		const setList = this.randomBSSFactorySets[id].sets;

		const movesMax: {[k: string]: number} = {
			batonpass: 1,
			stealthrock: 1,
			toxicspikes: 1,
			trickroom: 1,
			auroraveil: 1,
		};

		const requiredMoves: {[k: string]: number} = {};

		// Build a pool of eligible sets, given the team partners
		// Also keep track of sets with moves the team requires
		let effectivePool: {set: AnyObject, moveVariants?: number[], itemVariants?: number, abilityVariants?: number}[] = [];
		const priorityPool = [];
		for (const curSet of setList) {
			let reject = false;
			let hasRequiredMove = false;
			const curSetMoveVariants = [];
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
				curSetMoveVariants.push(variantIndex);
			}
			if (reject) continue;
			const set = {set: curSet, moveVariants: curSetMoveVariants};
			effectivePool.push(set);
			if (hasRequiredMove) priorityPool.push(set);
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

		const setDataAbility = this.sampleIfArray(setData.set.ability);
		return {
			name: setData.set.nickname || setData.set.name || species.baseSpecies,
			species: setData.set.species,
			gigantamax: setData.set.gigantamax,
			gender: setData.set.gender || species.gender || (this.randomChance(1, 2) ? 'M' : 'F'),
			item: this.sampleIfArray(setData.set.item) || '',
			ability: setDataAbility || species.abilities['0'],
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
			typeCount: {}, typeComboCount: {}, baseFormes: {}, has: {}, forceResult: forceResult,
			weaknesses: {}, resistances: {},
		};
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
		const limitFactor = Math.ceil(this.maxTeamSize / 6);
		/**
		 * Weighted random shuffle
		 * Uses the fact that for two uniform variables x1 and x2, x1^(1/w1) is larger than x2^(1/w2)
		 * with probability equal to w1/(w1+w2), which is what we want. See e.g. here https://arxiv.org/pdf/1012.0256.pdf,
		 * original paper is behind a paywall.
		 */
		const shuffledSpecies = [];
		for (const speciesName of pokemonPool) {
			const sortObject = {
				speciesName: speciesName,
				score: Math.pow(this.prng.next(), 1 / this.randomBSSFactorySets[speciesName].usage),
			};
			shuffledSpecies.push(sortObject);
		}
		shuffledSpecies.sort((a, b) => a.score - b.score);

		while (shuffledSpecies.length && pokemon.length < this.maxTeamSize) {
			// repeated popping from weighted shuffle is equivalent to repeated weighted sampling without replacement
			const specie = shuffledSpecies.pop()!.speciesName;
			const species = this.dex.species.get(specie);
			if (!species.exists) continue;

			if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			// Limit to one of each species (Species Clause)
			if (teamData.baseFormes[species.baseSpecies]) continue;

			// Limit 2 of any type (most of the time)
			const types = species.types;
			let skip = false;
			if (!this.forceMonotype) {
				for (const type of types) {
					if (teamData.typeCount[type] >= 2 * limitFactor && this.randomChance(4, 5)) {
						skip = true;
						break;
					}
				}
			}
			if (skip) continue;

			const set = this.randomBSSFactorySet(species, teamData);
			if (!set) continue;

			// Limit 1 of any type combination
			let typeCombo = types.slice().sort().join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}
			if (!this.forceMonotype && teamData.typeComboCount[typeCombo] >= limitFactor) continue;

			const itemData = this.dex.items.get(set.item);
			if (teamData.has[itemData.id]) continue; // Item Clause

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
			if (typeCombo in teamData.typeComboCount) {
				teamData.typeComboCount[typeCombo]++;
			} else {
				teamData.typeComboCount[typeCombo] = 1;
			}

			teamData.baseFormes[species.baseSpecies] = 1;

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
		if (!teamData.forceResult && pokemon.length < this.maxTeamSize) return this.randomBSSFactoryTeam(side, ++depth);

		// Quality control we cannot afford for monotype
		if (!teamData.forceResult && !this.forceMonotype) {
			for (const type in teamData.weaknesses) {
				if (teamData.weaknesses[type] >= 3 * limitFactor) return this.randomBSSFactoryTeam(side, ++depth);
			}
		}

		return pokemon;
	}
}

export default RandomGen8Teams;
