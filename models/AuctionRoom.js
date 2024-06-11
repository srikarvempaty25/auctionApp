const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../util/database')

const Auction = sequelize.define('auctionrooms', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    startTime:{
        type: DataTypes.DATE
    },
    endTime:{
        type: DataTypes.DATE
    },
    status:{
        type: DataTypes.ENUM,
        values: ['ongoing', 'ended', 'startingSoon'], // Define the allowed values
        allowNull: false,
        defaultValue: 'ended'
    }
})

module.exports = Auction