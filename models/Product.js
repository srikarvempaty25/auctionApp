const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../util/database')

const Product = sequelize.define('products', {
    id :{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    startPrice:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    currentBid:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageUrl:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Product