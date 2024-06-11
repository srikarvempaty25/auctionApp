const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('user-login', { errorMessage: null, successMessage: null, isLoggedIn: req.session.isLoggedIn });
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                username: username,
                password: password
            }
        });

        if (user) {
            req.session.isLoggedIn = true
            req.session.user = user
            res.render('login-response', { errorMessage: null, successMessage: 'Login Successful!', isLoggedIn: req.session.isLoggedIn });
        } else {
            res.render('login-response', { errorMessage: 'Invalid username or password.', successMessage: null, isLoggedIn: req.session.isLoggedIn});
        }
    } catch (error) {
        console.error('Error finding user:', error);
        res.render('login-response', { errorMessage: 'Error finding user: ' + error.message });
    }
});

module.exports = router;
