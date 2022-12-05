require('dotenv').config({ path: '../config/.env' });
require('../config/db');
const TreeModel = require('../models/tree.model');

const species = [
  ['Orme d’Amérique', 'biodiversite'],
  ['Hêtre à grandes feuilles', 'biodiversite'],
  ['Charme de Caroline', 'biodiversite'],
  ['Tilleul d’Amérique', 'biodiversite'],
  ['Sorbier d’Amérique', 'biodiversite'],
  ['Peuplier baumier', 'biodiversite'],
  ['Érable à sucre', 'biodiversite'],
  ['Chêne bicolore', 'biodiversite'],
  ['Orme liege', 'biodiversite'],
  ['Peuplier faux-tremble', 'biodiversite'],
  ['Hamamélis de virginie', 'biodiversite'],
  ['Frêne blanc', 'biodiversite'],
  ['Bouleau à papier', 'biodiversite'],
  ['Chêne blanc ', 'biodiversite'],
  ['Bouleau jaune ', 'biodiversite'],
  ['Sapin baumier', 'biodiversite'],
  ['Épinette noire', 'biodiversite'],
  ['Pruche du Canada ', 'biodiversite'],
  ['Mélèze laricin', 'biodiversite'],
  ['Genévrier de Virginie', 'biodiversite'],
  ['Thuya occidental ', 'biodiversite'],
  ['Pin blanc', 'biodiversite'],
  ['Pin gris ', 'biodiversite'],
  ['Pin rigide', 'biodiversite'],
  ['Pin rouge', 'biodiversite'],
  ['Épinette rouge ', 'biodiversite'],
  ['Épinette blanc', 'biodiversite'],
  ['Abricotier', 'fruitier'],
  ['Amandier', 'fruitier'],
  ['Amélanchier', 'fruitier'],
  ['Cerisier', 'fruitier'],
  ['Châtaignier', 'fruitier'],
  ['Cognassier', 'fruitier'],
  ['Cormier', 'fruitier'],
  ['Merisier', 'fruitier'],
  ['Mirabellier', 'fruitier'],
  ['Mûrier blanc', 'fruitier'],
  ['Mûrier noir', 'fruitier'],
  ['Néflier', 'fruitier'],
  ['Noisetier', 'fruitier'],
  ['Noyer commun', 'fruitier'],
  ['Pêcher', 'fruitier'],
  ['Pin pignon', 'fruitier'],
  ['Poirier', 'fruitier'],
  ['Pommier', 'fruitier'],
  ['Prunier', 'fruitier'],
  ['Arbousier', 'fruitier'],
  ['Argousier', 'fruitier'],
  ['Arganier', 'fruitier'],
  ['Avocatier', 'fruitier'],
  ['Bergamotier', 'fruitier'],
  ['Bibacier', 'fruitier'],
  ['Bigaradier', 'fruitier'],
  ['Caroubier', 'fruitier'],
  ['Cédratier', 'fruitier'],
  ['Clémentinier', 'fruitier'],
  ['Citronnier', 'fruitier'],
  ['Dattier', 'fruitier'],
  ['Feijoa ', 'fruitier'],
  ['Figuier', 'fruitier'],
  ['Figuier de Barbarie', 'fruitier'],
  ['Grenadier', 'fruitier'],
  ['Jujubier', 'fruitier'],
  ['Mandarinier', 'fruitier'],
  ['Marula', 'fruitier'],
  ['Néflier du Japon', 'fruitier'],
  ['Noyer du Queensland', 'fruitier'],
  ['Olivier', 'fruitier'],
  ['Oranger', 'fruitier'],
  ['Pamplemoussier', 'fruitier'],
  ['Pacanier', 'fruitier'],
  ['Plaqueminier', 'fruitier']
]



async function newTree(specie, categorie, price, age) {
  try {
    const tree = await TreeModel.create({ specie, categorie, price, age });
    console.log(tree);
    console.log("tree: " + tree._id);
  }
  catch (err) {
    console.log("error: " + err);
  }
}

for (let index = 0; index < 100; index++) {
  // abs to convert in positive numner 
  // num.toFixed for set a number of decimal  

  var randomSpecie = species[Math.floor(Math.random()*species.length)];
  var age =  Math.abs(Math.floor(Math.random() * (2 - 50) + 2 ));
  var price =Math.abs(Math.random() * (10 - 300) + 10).toFixed(2);

  newTree(randomSpecie[0], randomSpecie[1], price, age);
}