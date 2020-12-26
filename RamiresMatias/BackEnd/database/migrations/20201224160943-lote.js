'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lote',
      {
        id: {
          type: Sequelize.INTEGER,
          AllowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        num_lote: {
          type: Sequelize.INTEGER,
          AllowNull: false,
        },
        desc_lote: {
          type: Sequelize.STRING,
          AllowNull: true,
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
    return queryInterface.dropTable('lote');

  }
};
