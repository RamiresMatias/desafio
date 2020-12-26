const LotexAnimal = require('../model/LotexAnimal.js');


module.exports = {

    async index(req, res) {
        const lotexanimal = await LotexAnimal.findAll();

        return res.json(lotexanimal);
    },

    async store(req, res) {

        const { fk_id_animal, fk_id_lote, dt_entrada, dt_saida, dt_ultima_movimentacao, ic_bezerro } = req.body;

        const lotexanimal = await LotexAnimal.create({ fk_id_animal, fk_id_lote, dt_entrada, dt_saida, dt_ultima_movimentacao, ic_bezerro });

        return res.json(lotexanimal);
    },

    async update(req, res) {
        const { fk_id_animal, fk_id_lote, dt_entrada, dt_saida, dt_ultima_movimentacao, ic_bezerro } = req.body;

        const newLotexAnimal = await LotexAnimal.update({ fk_id_animal, fk_id_lote, dt_entrada, dt_saida, dt_ultima_movimentacao, ic_bezerro }, { where: { id: req.params.id } });

        return res.json(newLotexAnimal);
    },

    async delete(req, res) {
        const delLotexAnimal = await LotexAnimal.destroy({ where: { id: req.params.id } });

        return res.json(delLotexAnimal);
    }

}

