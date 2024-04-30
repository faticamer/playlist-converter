const express = require('express')
const router = express.Router()
const youtubeAPI = require('../src/services/youtube_api')

router.get('/playlist', async (req, res) => {
    try {
        const playlistId = req.query.playlistId
        const titles = await youtubeAPI.getAllTitles(playlistId)
        res.json ({ titles })
    } catch (error) {
        console.error('Error fetching YouTube playlist titles: ', error.message)
        res.status(500).json({error : 'Internal service error' })
    }
})

// DONT TRY TO ACCESS THIS ROUTE WITHOUT FRONTEND -> THROWS 404 STATUS CODE
router.get('/playlist/channels', async (req, res) => {
    try {
        const playlistId = req.query.playlistId
        const channels = await youtubeAPI.getChannelIds(playlistId)
        // res.render(channels)
        res.json({ data : channels })
    } catch (error) {
        console.error('Error fetching YouTube playlist channels: ', error.message)
        res.status(500).json({error : 'Internal service error' })
    }
})

module.exports = { router }