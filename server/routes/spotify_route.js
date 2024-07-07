const express = require('express');
const axios = require('axios');
const router = express.Router();
const spotifyAPI = require('../src/services/spotify_api');

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
// commit

// Middleware to obtain and set the authorization token in the request object
const getAccessTokenMiddleware = async (req, res, next) => {
    try {
      // Your logic to obtain the authorization token
      const authorizationToken = await spotifyAPI.getToken();
  
      // Set the token in the request object for later use in routes
      req.authorizationToken = authorizationToken
  
      // Call the next middleware or route handler
      next()
    } catch (error) {
      console.error('Error obtaining authorization token:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
};

// Middleware function to check for userDetails
const checkUserDetails = (req, res, next) => {
    const userDetails = req.session.userDetails;
    if (userDetails) {
        req.user = userDetails;
    }
    next();
};

router.use(getAccessTokenMiddleware);

router.use(checkUserDetails);

router.get('/user_details', function(req, res) {
    res.json(req.session.userDetails)
})

router.get('/refresh_token', async (req, res) => {
    const { refreshToken } = req.user;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        },
        data: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
    };
  
    try {
        const response = await axios.post(
            authOptions.url,
            authOptions.data,
            {
                headers : authOptions.headers
            } 
        );

        if (response.status === 200) {
            const { access_token } = response.data;

            // Update session user details
            const userDetails = req.user;
            userDetails.accessToken = access_token;
            req.user = userDetails

            res.sendStatus(200);
        } else {
            // Handle error/s
            console.error('Error refreshing token: ', response.statusText);
            res.status(response.status).json({ message: 'Failed to refresh token.' });
        }
    } catch (error) {
        console.error('Error during refresh token request: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/playlist/create', async (req, res) => {
    try {
        const { accessToken, userId } = req.user;
        const playlistName = req.query.name;

        const response = await spotifyAPI.createNewPlaylist(accessToken, userId, playlistName);
        res.json({ data : response.data });
    } catch (error) {
        console.error('Error while handling the create route: ', error.message);
    }
});

router.get('/playlist/convert', async (req, res) => {
    try {
        const { accessToken } = req.user;
        const playlistId = req.query.playlistId;
        const trackUri = req.query.uri;
        
        const response = await spotifyAPI.addToPlaylist(accessToken, playlistId, trackUri);
        res.json({ data : response.data });
    } catch (error) {
        console.error('Error while handling the convert route: ', error.message);
    }
});

router.get('/playlist/get-library', async (req, res) => {
    try {
        const { accessToken, userId } = req.user;

        const response = await spotifyAPI.getUsersLibrary(accessToken, userId);
        res.json({ data : response.data });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Internal Server Error'
        });
    }
});

// Uses Playlist ID to obtain all track URIs from the playlist
router.get('/playlist/get-items', async (req, res) => {
    try {
        const { accessToken } = req.user;
        const playlistId = req.query.playlistId;

        const response = await spotifyAPI.getPlaylistItems(accessToken, playlistId);
        res.json({ response });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Internal Server Error'
        });
    }
});

// Uses tracks URIs array to obtain specific information about each track
router.get('/playlist/get-tracksinfo', async (req, res) => {
    try {
        const { accessToken } = req.user;
        const tracksId = req.query.ids;

        const response = await spotifyAPI.getTracksData(accessToken, tracksId);
        res.json({ data : response });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Internal Server Error'
        })
    }
});

// Test route for getting track info
router.get('/playlist/get-tracksinfo/:id', async (req, res) => {
    try {
        const { accessToken } = req.user;
        const tracksId = req.params.id;

        const response = await spotifyAPI.getTracksData(accessToken, tracksId);
        res.json({ data : response.data });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Internal Server Error'
        });
    }
});

router.get('/playlist/get-items/:playlistId', async (req, res) => {
    try {
        const { accessToken } = req.user;
        const playlistId = req.params.playlistId;

        const response = await spotifyAPI.getPlaylistItems(accessToken, playlistId);
        res.json({ response });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Internal Server Error'
        });
    }
});

router.get('/search', async (req, res) => {
    try {
        const trackName = encodeURIComponent(req.query.track);
        const trackArtist = encodeURIComponent(req.query.artist);

        const response = await spotifyAPI.searchTrack(req.authorizationToken, trackName, trackArtist);
        res.json({ data : response.data });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
});

module.exports = { router }