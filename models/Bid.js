const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../util/database')

const Bid = sequelize.define('bids', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bidValue:{
        type:DataTypes.FLOAT,
        allowNull: false
    },
    bidTime:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW 
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
module.exports = Bid