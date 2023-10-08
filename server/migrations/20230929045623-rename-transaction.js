'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Rename the table from "Transaction" to "transactions"
    return queryInterface.renameTable('Transaction', 'transactions');
  },

  down: (queryInterface, Sequelize) => {
    // Rename the table back to "Transaction" if needed
    return queryInterface.renameTable('transactions', 'Transaction');
  },
};