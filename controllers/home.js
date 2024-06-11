const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('home', {pageTitle: "Auction Site", pathRoute : '/', isLoggedIn: req.session.isLoggedIn})
})

module.exports = router
