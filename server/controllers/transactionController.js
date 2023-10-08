const db = require('../models/index');

// Function to insert a record
async function createTransaction(transactionData) {
  try {
    // Create a new record in the Transaction table
    const newTransaction = await db.Transaction.create(transactionData);

    return newTransaction;
  } catch (error) {
    // Handle other errors
    console.error('Error inserting transaction:', error);
    throw error;
  }
}

// Get all transactions
async function getAllTransactions() {
  try {
    // Fetch all transactions from the Transaction table
    const transactions = await db.Transaction.findAll();

    return transactions;
  } catch (error) {
    // Handle errors
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

// Get a transaction by ID
async function getTransactionById(transactionId) {
  try {
    // Fetch a transaction by ID from the Transaction table
    const transaction = await db.Transaction.findByPk(transactionId);

    return transaction;
  } catch (error) {
    // Handle errors
    console.error('Error fetching transaction by ID:', error);
    throw error;
  }
}

// Update a transaction by ID
async function updateTransaction(transactionId, updatedData) {
  try {
    // Update a transaction by ID in the Transaction table
    const [updatedRows] = await db.Transaction.update(updatedData, {
      where: { transaction_id: transactionId },
    });

    return updatedRows;
  } catch (error) {
    // Handle errors
    console.error('Error updating transaction:', error);
    throw error;
  }
}

// Delete a transaction by ID
async function deleteTransaction(transactionId) {
  try {
    // Delete a transaction by ID from the Transaction table
    const deletedRows = await db.Transaction.destroy({
      where: { transaction_id: transactionId },
    });

    return deletedRows;
  } catch (error) {
    // Handle errors
    console.error('Error deleting transaction:', error);
    throw error;
  }
}

// Function to insert multiple records and filter out duplicate transactions
async function createTransactions(transactions) {
  const newTransactions = [];

  // Use for...of loop to iterate through transactions and await each one
  for (const transaction of transactions) {
    try {
      const result = await getTransactionById(transaction.transactionId);
      
      if (!result) {
        // Create the transaction if it's unique
        await createTransaction(transaction);
        newTransactions.push(transaction);
      }
    } catch (error) {
      console.error('Error creating transactions:', error);
      throw error;
    }
  }

  // Return the newTransactions array after all transactions are processed
  return newTransactions;
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  createTransactions,
};