const express = require('express')
const router = express.Router()
const spotifyAPI = require('../src/services/spotify_api')

// Middleware to obtain and set the authorization token in the request object
const getAccessTokenMiddleware = async (req, res, next) => {
    try {
      // Your logic to obtain the authorization token
      const authorizationToken = await spotifyAPI.getToken();
  
      // Set the token in the request object for later use in routes
      req.authorizationToken = authorizationToken;
  
      // Call the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error obtaining access token:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

router.use(getAccessTokenMiddleware)

router.get('/playlist/create', async (req, res) => {
    try {
        const userDetails = req.session.userDetails

        if(userDetails) {
            const { accessToken, userId, username } = userDetails
            const response = await spotifyAPI.createNewPlaylist(accessToken, userId)            
            res.json({ data : response.data });
        } else {
            res.status(401).json({
                success: false,
                message: 'User details could not be obtained'
            })
        }
    } catch (error) {
        console.error('Error while handling the create route: ', error.message);
    }
})

router.get('/playlist/convert', async (req, res) => {
    try {
        const userDetails = req.session.userDetails
        const playlistId = req.query.playlistId
        const trackUri = req.query.uri        
        
        if(userDetails) {
            const { accessToken, userId, username } = userDetails
            const response = await spotifyAPI.addToPlaylist(accessToken, playlistId, trackUri)
            // console.log(response);
            res.json({ data : response.data})
        }        
    } catch (error) {
        console.error('Error while handling the convert route: ', error.message)
    }
})

router.get('/search', async (req, res) => {
    try {
        const trackName = encodeURIComponent(req.query.track)
        const trackArtist = encodeURIComponent(req.query.artist)

        const response = await spotifyAPI.searchTrack(req.authorizationToken, trackName, trackArtist)        
        res.json({ data : response.data })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }
})

// This works (obtains necessary details from the session)
router.get('/some/route', (req, res) => {
    const userDetails = req.session.userDetails

    if(userDetails) {
        const { accessToken, userId, username } = userDetails
        res.status(200).json({
            success: true,
            accessToken,
            userId,
            username,
            message: 'User details obtained successfully'

        })
    } else {
        res.status(401).json({
            success: false,
            message: 'User details could not be obtained'
        })
    }
})

// After debugging the Authorization Token, this now works properly
// The issue was the missing await keyword as well
router.get('/artist', async (req, res) => {
    try {
        const details = await spotifyAPI.getArtistsInfo()
        res.send({ details })
    } catch (error) {
        console.error('Error while handling the artist route: ', error.message)
    }
})

module.exports = { router }