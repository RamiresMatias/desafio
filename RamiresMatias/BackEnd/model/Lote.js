const { Model, DataTypes } = require('sequelize')

class Lote extends Model {
    static init(sequelize) {
        super.init({
            num_lote: DataTypes.INTEGER,
            desc_lote: DataTypes.STRING,

        }, { sequelize });
    }

}
module.exports = Lote;