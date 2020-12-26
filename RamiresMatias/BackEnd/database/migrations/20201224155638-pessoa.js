'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pessoas',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          AllowNull: false,
        },
        nome: {
          type: Sequelize.STRING,
          AllowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          AllowNull: false,
        },
        sexo: {
          type: Sequelize.CHAR,
          AllowNull: false,
        },
        endereco: {
          type: Sequelize.STRING,
          AllowNull: false,
        },
        ativo: {
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
    return queryInterface.dropTable('pessoas');

  }
};
