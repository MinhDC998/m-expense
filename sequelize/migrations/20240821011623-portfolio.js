'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('portfolios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      member_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'members',
          },
          key: 'id',
        },
        allowNull: false, 
      },
      department_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'departments',
          },
          key: 'id',
        },
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true
      },
      content: {
        type: Sequelize.STRING,
        allowNull: true
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('portfolios');
  }
};
