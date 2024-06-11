const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../util/database')

const User = sequelize.define('users', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }

})
module.exports = User