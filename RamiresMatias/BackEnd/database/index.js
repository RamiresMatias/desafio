const Sequelize = require('sequelize'); //Classe de sequelize
const dbConfig = require('../config/database.js'); //Conexões do banco

const Pessoas = require('../model/Pessoas.js'); // Importa o model de pessoa
const Animal = require('../model/Animal.js');
const Lote = require('../model/Lote.js');
const LotexAnimal = require('../model/LotexAnimal.js');

const connection = new Sequelize(dbConfig); //Inicia a conexão com banco em uma variável

Pessoas.init(connection);
Animal.init(connection);
Lote.init(connection);
LotexAnimal.init(connection);



module.exports = connection;