const axios = require('axios')
const qs = require('qs')
require('dotenv').config()

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64')

const getToken = async () => {
    try {
        // Make POST request to SPOTIFY API for access token, sending relevant information
        const token_url = 'https://accounts.spotify.com/api/token'
        const data = qs.stringify({'grant_type' : 'client_credentials'})

        const response = await axios.post(token_url, data, {
            headers : {
                'Authorization' : `Basic ${auth_token}`,
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        })
        return response.data.access_token
    } catch (error) {
        console.error(error)
    }
}

const getArtistsInfo = async () => {
    try {
        const access_token = await getToken()
        const response = await axios.get('https://api.spotify.com/v1/artists/5uK6fW2LmljRHZEmHKv9tA', {
            headers : {
                'Authorization' : `Bearer ${access_token}`
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const createNewPlaylist = async (access_token, userId) => {
    const apiUrl = `https://api.spotify.com/v1/users/${userId}/playlists`
    try {
        const response = await axios.post(apiUrl, {
            name: 'PLAYLISTIFY - Converted',
            description: 'Your new converted playlist!',
            public: true
        }, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        });
        return response
    } catch (error) {
        console.error('Error occurred when creating a playlist:', error.message);
    }
}

const searchTrack = async (access_token, track_name, track_artist) => {
    try {        
        const apiUrl = `https://api.spotify.com/v1/search?q=remaster%2520track%3A${track_name}%2520artist%3A${track_artist}&type=track&limit=1`
        const response = await axios.get(apiUrl, {
            headers : {
                'Authorization' : `Bearer ${access_token}`
            }
        })                     
        return response        
    } catch (error) {
        console.error(error)
    }    
}

const addToPlaylist = async (access_token, playlist_id, uri) => {
    try {
        const apiUrl = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
        const requestData = {
            uris : uri,            
        }
        const response = await axios.post(apiUrl, requestData, {
            headers : {
                'Authorization' : `Bearer ${access_token}`,
                'Content-Type' : 'application/json'
            },            
        })
        return response
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getToken, getArtistsInfo, createNewPlaylist, searchTrack, addToPlaylist }