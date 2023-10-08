'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      transaction_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gross_amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      gross_currency: {
        type: DataTypes.STRING,
      },
      net_amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      net_currency: {
        type: DataTypes.STRING,
      },
      fee: {
        type: DataTypes.DECIMAL(10, 2),
      },
      bank_account: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
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