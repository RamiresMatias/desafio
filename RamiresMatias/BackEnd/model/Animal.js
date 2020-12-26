const { Model, DataTypes } = require('sequelize')

class Animal extends Model {
    static init(sequelize) {
        super.init({
            fk_id_pessoa: DataTypes.INTEGER,
            nome: DataTypes.STRING,
            raca: DataTypes.STRING,
            id_fazenda: DataTypes.INTEGER,
            sexo: DataTypes.CHAR,
            peso: DataTypes.FLOAT,
            dt_nascimento: DataTypes.DATE,
        }, { sequelize });
    }


}
module.exports = Animal;