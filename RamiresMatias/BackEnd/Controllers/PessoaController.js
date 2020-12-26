const Pessoas = require('../model/Pessoas.js');


module.exports = {

    async index(req, res) {
        const pessoas = await Pessoas.findAll();

        return res.json(pessoas);
    },

    /* Store para armazenar os dados da requisição que serão inseridos no banco */
    async store(req, res) {
        const { nome, email, endereco, sexo, ativo } = req.body;

        const pessoas = await Pessoas.create({ nome, email, endereco, sexo, ativo });

        return res.json(pessoas)
    },
    async update(req, res) {
        const { nome, email, endereco, sexo, ativo } = req.body;

        const newPessoa = await Pessoas.update({ nome, email, endereco, sexo, ativo }, { where: { id: req.params.id } });

        return res.json(newPessoa);
    },
    async delete(req, res) {
        const delPessoa = await Pessoas.destroy({ where: { id: req.params.id } });

        return res.json(delPessoa);
    }
}