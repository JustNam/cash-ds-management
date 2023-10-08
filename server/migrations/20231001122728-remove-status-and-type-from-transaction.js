'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: (queryInterface, Sequelize) => {
    // Remove the "status" column and the "type" column
    return Promise.all([
      queryInterface.removeColumn('transactions', 'status'),
      queryInterface.removeColumn('transactions', 'type'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    // You can add code here to recreate the columns if needed.
    // This is the reverse of the "up" migration.
    // Note: You may need to define the data types and constraints.
  },
};