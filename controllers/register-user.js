const express = require('express')

const User = require('../models/User')

const router = express.Router()

router.get('/', async(req, res) => {
    res.render('register-user', {pageTitle:"Register User", isLoggedIn: req.session.isLoggedIn})
})

router.post('/', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    try{
        await User.create({
            username: username,
            password: password,
            email: email
        })
    }catch(error){
        console.log(error)
    }

    res.render('registered-user', {pageTitle: "Registered user", isLoggedIn: req.session.isLoggedIn})

})

module.exports = router