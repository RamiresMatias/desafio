'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('animal',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          AllowNull: false,
        },
        fk_id_pessoa: {
          type: Sequelize.INTEGER,
          AllowNull: false,
          references: { model: 'pessoas', key: 'id' },
          /* onUpdate, onDelete - Qualquer alteração feita no relacionamento, ele fará essas alterção em cascata com as demais tabelas que 
          estão sendo relacionadas*/
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        id_fazenda: {
          type: Sequelize.INTEGER,
          AllowNull: true,
        },
        raca: {
          type: Sequelize.STRING,
          AllowNull: false,
        },
        nome: {
          type: Sequelize.STRING,
          AllowNull: false,
        },
        sexo: {
          type: Sequelize.CHAR,
          AllowNull: false,
        },
        peso: {
          type: Sequelize.FLOAT,
          AllowNull: false,
        },
        dt_nascimento: {
          type: Sequelize.DATE,
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

      }
    );

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('animal');

  }
};
