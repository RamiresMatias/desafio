
const Lote = require('../model/Lote.js');


module.exports = {

    async index(req, res) {
        const lote = await Lote.findAll();

        return res.json(lote);
    },

    async store(req, res) {
        const { num_lote, desc_lote } = req.body;

        const lote = await Lote.create({ num_lote, desc_lote });

        return res.json(lote)
    },
    async update(req, res) {
        const { num_lote, desc_lote } = req.body;

        const newLote = await Lote.update({ num_lote, desc_lote }, { where: { id: req.params.id } });

        return res.json(newLote)
    },
    async delete(req, res) {
        const lote = await Lote.destroy({ where: { id: req.params.id } });

        return res.json(lote);
    }
}