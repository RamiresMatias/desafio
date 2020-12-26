const Animal = require('../model/Animal.js');
const Pessoas = require('../model/Pessoas.js');

module.exports = {

    async index(req, res) {
        const animal = await Animal.findAll();

        return res.json(animal);
    },


    async store(req, res) {

        const { fk_id_pessoa, nome, raca, id_fazenda, sexo, peso, dt_nascimento } = req.body;

        const animal = await Animal.create({ fk_id_pessoa, nome, raca, id_fazenda, sexo, peso, dt_nascimento });

        return res.json(animal);
    },
    async update(req, res) {

        const { nome, raca, id_fazenda, fk_id_pessoa, sexo, peso, dt_nascimento } = req.body;

        const newAnimal = await Animal.update({ nome, raca, id_fazenda, fk_id_pessoa, sexo, peso, dt_nascimento }, { where: { id: req.params.id } });

        return res.json(newAnimal);

    },
    async delete(req, res) {
        const delAnimal = await Animal.destroy({ where: { id: req.params.id } });

        return res.json(delAnimal);
    }
}