'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
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
      page_no: {
        type: Sequelize.STRING,
        allowNull: true
      },
      thread_no: {
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
    await queryInterface.dropTable('messages');
  }
};
