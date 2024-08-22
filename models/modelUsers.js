const { DataTypes } = require('sequelize');
const sequelize = require('../dbconfig/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},
 {
    tableName: 'users',
    timestamps: false
});

User.sync()
    .then(() => {
        console.log('The table for the User model was just (re)created!');
    })
    .catch((error) => {
        console.error('Unable to sync the User model with the database:', error);
    });




module.exports = User;
