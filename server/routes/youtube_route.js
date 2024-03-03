const express = require('express')
const router = express.Router()
const youtubeAPI = require('../src/services/youtube_api')

router.get('/playlists', async (req, res) => {
    try {
        const playlistId = req.query.playlistId
        const titles = await youtubeAPI.getAllTitles(playlistId)
        res.json ({ titles })
    } catch (error) {
        console.error('Error fetching YouTube playlist titles: ', error.message)
        res.status(500).json({error : 'Internal service error' })
    }
})

module.exports = { router }