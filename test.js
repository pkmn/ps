//const ps = {
  //Dex: require('./vendor/pokemon-showdown/.sim-dist').Dex,
//}
//const sim = require('./sim');
const dex = require('./dex');
/*const data = require('./data');*/


console.log(dex.Dex.forGen(1).species.all().filter(s => !s.isNonstandard).length);
//console.log('PS', ps.Dex.forGen(3).abilities.get('Intimidate'));
//console.log('@pkmn/sim', sim.Dex.forGen(2).abilities.get('Intimidate'));
//console.log('@pkmn/dex', dex.Dex.forGen(2).abilities.get('Intimidate'));
//console.log('@pkmn/data', new data.Generations(dex.Dex).get(3).species.get('Clefable').abilities);
