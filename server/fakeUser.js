const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    'cashmanagementdb',
    'root',
    '',
    {
        host: '127.0.0.1',
        dialect: 'mysql'
    }
);
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const User = sequelize.define('users', {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manager_id: {
        type: DataTypes.INTEGER,
    }
});

const Token = sequelize.define('tokens', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const token_data = [{ username: "testmanager", password: "test123" }, { username: "testmember1", password: "test123" }, { username: "testmember2", password: "test123" }]

const user_data = [
    { name: "Manager" },
    { name: "Member1", manager_id: 1 },
    { name: "Member2", manager_id: 1 }
]

User.belongsTo(Token);

sequelize.sync({ force: true }).then(() => {
    Token.bulkCreate(token_data, { validate: true }).then(() => {
        User.bulkCreate(user_data, { validate: true }).then(() => {
            User.findAll({
                include: [{
                    model: Token
                }]
            }).then(result => {
                console.log(result)
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });
        }).catch((err) => { console.log(err); });
    }).catch((err) => { console.log(err); });
}).catch((error) => {
    console.error('Unable to create the table : ', error);
});