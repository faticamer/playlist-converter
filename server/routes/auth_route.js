const express = require('express')
const passport = require('passport')
const router = express.Router()
require('../config/passport_setup_youtube')

const CLIENT_URL = 'http://localhost:5173/select-platform'
const BASE_URL = 'http://localhost:5173'

router.get('/spotify/login/failed', (req, res) => {
    res.status(401).json({
        success: 'false',
        message: 'Authentication Failed'
    })
})

router.get('/google/login/failed', (req, res) => {
    res.status(401).json({
        success: 'false',
        message: 'Authentication Failed'
    })
})

router.get('/spotify/login/success', (req, res) => {
    console.log(req.session)
    if(req.user) {
        req.session.userDetails = {
            accessToken: req.user.accessToken,
            refreshToken: req.user.refreshToken,
            expires_in: req.user.expires_in,
            userId: req.user.profile.id,
            username: req.user.profile.displayName,
            profileUrl: req.user.profile.profileUrl,
            profilePicture: req.user.profile._json.images[0].url
        }

        res.status(200).json({
            success: true,
            accessToken: req.user.accessToken,
            userId: req.user.profile.id,
            username: req.user.profile.displayName,
            profileUrl: req.user.profile.profileUrl,
            profilePicture: req.user.profile._json.images[0].url
        })
    }
})

router.get('/google/login/success', (req, res) => {
    if(req.user) {
        res.status(200).json({
            succes: true,
            accessToken: req.user[0].accessToken,
            userId: req.user[2].profile.id,
            username: req.user[2].profile.displayName,
            profilePicture: req.user[2].profile._json.picture
        })
    }
});

router.get('/spotify', passport.authenticate('spotify'));

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                      'https://www.googleapis.com/auth/userinfo.email'],
                                      accessType: 'offline', approvalPrompt: 'force' }));

router.get(
    '/spotify/callback',
    passport.authenticate('spotify', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/auth/spotify/login/failed'
    })
)

router.get(
    '/google/callback',
    passport.authenticate('google', { 
        successRedirect: CLIENT_URL,
        failureRedirect: '/auth/google/login/failed' 
    }),
)

router.get('/spotify/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect(BASE_URL);
    });
});

router.get('/google/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error during logout: ', err);
            return res.status(500).send('Internal Server Eror');
        }
        res.redirect(BASE_URL);
    })
})

module.exports = { router }