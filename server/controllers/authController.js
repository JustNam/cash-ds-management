const db = require('../models/index');

// Login check user
async function login(userdata) {
    try {
       return await db.Auth.findOne({
            where: {
                username: userdata.username,
                password: userdata.password
            }
        })
    } catch (error) {
      // Handle other errors
      console.error('Failed login:', error);
      throw error;
    }
  }

  module.exports = {
    login
  }