const express = require('express')
const passport = require('passport')
const router = express.Router()

const CLIENT_URL = 'http://localhost:5173/convert'

router.get('/spotify/login/failed', (req, res) => {
    res.status(401).json({
        success: 'false',
        message: 'Authentication Failed'
    })
})

router.get('/spotify/login/success', (req, res) => {
    if(req.user) {
        req.session.userDetails = {
            accessToken: req.user.accessToken,
            userId: req.user.profile.id,
            username: req.user.profile.displayName,
        }

        res.status(200).json({
            success: true,
            accessToken: req.user.accessToken,
            userId: req.user.profile.id,
            username: req.user.profile.displayName,
        })
    }
})

router.get('/spotify', passport.authenticate('spotify'));

router.get(
    '/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: 'http://localhost:5555/auth/spotify/login/failed' }),
    function (req, res) {
        res.redirect(CLIENT_URL)
    }
)

router.get('/spotify/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('http://localhost:5173');
    });
});


module.exports = { router }