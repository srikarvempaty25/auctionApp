const mysql = require('mysql2')
const {Sequelize, DataTypes} = require('sequelize')
const path = require("path")

const sequelize = new Sequelize('auctionDb', 'root', 'saksri@25', {
    host: 'localhost',
    dialect: 'mysql' 
})

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
        // Sync the database
        //return sequelize.sync({force:true});
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

module.exports = sequelize