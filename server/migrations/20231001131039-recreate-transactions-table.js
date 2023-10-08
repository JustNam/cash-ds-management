'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      transactionId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      grossAmount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      grossCurrency: {
        type: DataTypes.STRING,
      },
      netAmount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      netCurrency: {
        type: DataTypes.STRING,
      },
      fee: {
        type: DataTypes.DECIMAL(10, 2),
      },
      bankAccount: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the 'transactions' table if needed
    await queryInterface.dropTable('transactions');
  },
};
