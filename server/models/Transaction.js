const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transaction = sequelize.define('Transaction', {
    transactionId: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
  });

  return Transaction;
};