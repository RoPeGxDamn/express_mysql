const { DataTypes } = require("sequelize")
const sequelize = require("../db")

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registerDate: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    lastLoginDate: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    status: {
        type: DataTypes.ENUM('Blocked', 'Active'),
        defaultValue: 'Active'
    }
}, {
    timestamps: false
})

module.exports = User;

