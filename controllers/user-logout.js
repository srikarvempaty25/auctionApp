const express = require("express");
const router = express.Router();

router.post('/user-logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).render('404', { errorMessage: 'Internal Server Error', isLoggedIn: req.session.isLoggedIn });
        }
        console.log("Session destroyed")
        res.redirect('/');
    });
});

module.exports = router;
