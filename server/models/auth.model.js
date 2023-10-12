const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Token = sequelize.define('tokens', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false
        }
    );

    return Token;
};