const { Model, DataTypes } = require('sequelize')

class LotexAnimal extends Model {
    static init(sequelize) {
        super.init({
            fk_id_animal: DataTypes.INTEGER,
            fk_id_lote: DataTypes.INTEGER,
            dt_entrada: DataTypes.DATE,
            dt_saida: DataTypes.DATE,
            dt_ultima_movimentacao: DataTypes.DATE,
            ic_bezerro: DataTypes.BOOLEAN,
        }, { sequelize });
    }

}
module.exports = LotexAnimal;

