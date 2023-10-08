const { Sequelize } = require('sequelize');
const sequelizeConfig = require('./config/config.json')['development'];
const sequelize = new Sequelize(sequelizeConfig);

async function checkDatabaseConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    } finally {
      sequelize.close(); // Close the connection pool
    }
  }
  
  // Call the function to check the connection
  checkDatabaseConnection();