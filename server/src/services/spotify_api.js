const axios = require('axios')
require('dotenv').config()

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64')

const getToken = async () => {
    try {
        const token_url = 'https://accounts.spotify.com/api/token'
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

        const response = await axios.post(token_url, params, {
            headers: {
                'Authorization': `Basic ${auth_token}`, 
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data.access_token
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

const getPlaylistItems = async (access_token, playlist_id) => {
    var limit = 50
    var offset = 0
    const list = []
    try {
        var apiUrl = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=${limit}&offset=${offset}`
        
        // Initialize response values
        var totalTracks = 0
        var offsetIncrements = 0
        var finalLimitAndOffset = 0
        let counter = 0
        do {
            if(counter === 0) {
                const response = await axios.get(apiUrl, {
                    headers : {
                        'Authorization' : `Bearer ${access_token}`
                    }
                })
                if (response !== null) {                            
                    totalTracks = response.data.total
                    offsetIncrements = Math.floor(totalTracks / 50)
                    finalLimitAndOffset = totalTracks - (offsetIncrements * 50)
                }
            } else {
                if(totalTracks < 50) {
                    var limit = totalTracks
                    var offset = 0
                    const response = await axios.get(apiUrl, {
                        headers : {
                            'Authorization' : `Bearer ${access_token}`
                        }
                    })
                    response.data.items.forEach(item => {
                        list.push(item.track.uri)
                    })
                } else {
                    // Last iteration, update both limit and offset
                    if(counter == offsetIncrements + 1) {
                        apiUrl = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=${finalLimitAndOffset}&offset=${finalLimitAndOffset}`
                    }
                    const response = await axios.get(apiUrl, {
                        headers : {
                            'Authorization' : `Bearer ${access_token}`
                        }
                    })
                    response.data.items.forEach(item => {
                        list.push(item.track.uri)
                    })
                    
                    // Update offset with each iteration
                    offset += 50
                }                
            }
            counter++
        } while (counter <= offsetIncrements + 1);

        const trackListJson = JSON.stringify(list)
        return trackListJson

    } catch (error) {
        console.error(error)
    }
}

const searchTrack = async (access_token, track_name, track_artist) => {
    try {        
        const apiUrl = `https://api.spotify.com/v1/search?q=remaster%2520track%3A${track_name}%2520artist%3A${track_artist}&type=track&limit=1&offset=0`
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

const searchNoArtistTrack = async (access_token, track_name) => {
    try {
        const apiUrl = `https://api.spotify.com/v1/search?q=remaster%2520track%3A${track_name}%2520artist%3A&type=track&limit=1&offset=0`;
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
            uris : uri         
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

module.exports = { getToken, createNewPlaylist, getPlaylistItems, searchTrack, searchNoArtistTrack, addToPlaylist }