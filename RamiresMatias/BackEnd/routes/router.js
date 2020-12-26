const express = require('express');
const PessoaController = require('../Controllers/PessoaController.js');
const AnimalController = require('../Controllers/AnimalController.js');
const LoteController = require('../Controllers/LoteController.js');
const LotexAnimalController = require('../Controllers/LotexAnimalController.js');

const routes = express.Router();

routes.get('/', (req, res) => {

    res.send('API Rodando!!');
});

routes.post('/pessoa', PessoaController.store);
routes.get('/pessoa', PessoaController.index);
routes.patch('/pessoa/:id', PessoaController.update);
routes.delete('/pessoa/:id', PessoaController.delete);

routes.get('/animal', AnimalController.index);
routes.post('/animal', AnimalController.store)
routes.patch('/animal/:id', AnimalController.update);
routes.delete('/animal/:id', AnimalController.delete);

routes.get('/lote', LoteController.index);
routes.post('/lote', LoteController.store);
routes.patch('/lote/:id', LoteController.update);
routes.delete('/lote/:id', LoteController.delete);

routes.get('/lotexanimal', LotexAnimalController.index);
routes.post('/lotexanimal', LotexAnimalController.store);
routes.patch('/lotexanimal/:id', LotexAnimalController.update);
routes.delete('/lotexanimal/:id', LotexAnimalController.delete);


module.exports = routes;
