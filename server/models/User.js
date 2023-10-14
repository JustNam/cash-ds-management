"use strict";
const {
  Model,
  DataTypes
} = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user"
    },
    fullname: DataTypes.STRING,
    bank_accounts: DataTypes.TEXT
  }, {
    sequelize,
    modelName: "User",
  });
  return User;
};
