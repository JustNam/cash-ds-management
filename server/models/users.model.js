const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('users', {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return User;
};