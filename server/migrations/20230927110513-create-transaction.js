'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transaction', {
      transaction_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      time: {
        type: Sequelize.DATE,
      },
      type: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      gross_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      gross_currency: {
        type: Sequelize.STRING,
      },
      net_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      net_currency: {
        type: Sequelize.STRING,
      },
      fee: {
        type: Sequelize.DECIMAL(10, 2),
      },
      bank_account: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transaction');
  },
};