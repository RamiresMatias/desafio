'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lotexanimal',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          AllowNull: false,
          primaryKey: true,
        },
        fk_id_animal: {
          type: Sequelize.INTEGER,
          AllowNull: false,
          references: { model: 'animal', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        fk_id_lote: {
          type: Sequelize.INTEGER,
          AllowNull: false,
          references: { model: 'lote', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        dt_entrada: {
          type: Sequelize.DATE,
          AllowNull: false,
        },
        dt_saida: {
          type: Sequelize.DATE,
          AllowNull: false,
        },
        dt_ultima_movimentacao: {
          type: Sequelize.DATE,
          AllowNull: false,
        },
        ic_bezerro: {
          type: Sequelize.BOOLEAN,
          AllowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }

      });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lotexanimal');

  }
};
