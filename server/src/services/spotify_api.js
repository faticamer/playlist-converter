const axios = require('axios')
require('dotenv').config()

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64')

function sliceArrayIntoSubarrays (array, subarrayLength) {
    const subarrays = []
    for(let i = 0; i < array.length; i += subarrayLength) {
        subarrays.push(array.slice(i, i + subarrayLength))
    }
    return subarrays
}

function extractTrackId (strings) {
    return strings.map(str => {
      // Split the string by ':' and get the last part
      const parts = str.split(':');
      return parts[parts.length - 1].replace('"', '');
    });
  }

function removeKeysFromObjects(objects, keys) {
    return objects.map(obj => {
        keys.forEach(key => delete obj[key])
        return obj
    })
}


// Sends request to Spotify in order to obtain the authentication token for the session
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

// Sends request to Spotify to create a new Playlist in user's library
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

// Retrieves all tracks from a given playlist in user's library
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

// Retrieve all playlists/albums from user's library
const getUsersLibrary = async (access_token, userId) => {
    try {
        const apiUrl = `https://api.spotify.com/v1/users/${userId}/playlists/`
        const response = await axios.get(apiUrl, {
            params : {
                limit : 50
            },
            headers : {
                'Authorization' : `Bearer ${access_token}`
            }
        })        
        return response
    } catch (error) {
        console.error(error)        
    }
}

// Pull track/s information from the playlist
const getTracksData = async (access_token, idArray) => {
    try {
        // API endpoint
        const apiUrl = `https://api.spotify.com/v1/tracks`        
        const keysToRemove = [
            'album',
            'available_markets',
            'disc_number',
            'explicit',
            'external_ids',
            'external_urls',
            'href',
            'id',
            'is_local',
            'popularity',
            'preview_url',
            'track_number',
            'type',
            'uri'
            ]

        // Helper variables for determining the number of calls
        var numberOfTracks = idArray.length
        var numberOfCalls = Math.ceil(numberOfTracks / 50)
        var responseList = []
        var counter = 0

        // For every 50 tracks - there should be 1 api call
        // Check https://developer.spotify.com/documentation/web-api/reference/get-several-tracks for more info        

        const trackIds = extractTrackId(idArray)
        const subarrays = sliceArrayIntoSubarrays(trackIds, 50)
          
        do {
            var mergedTracks = subarrays[counter].join(',')            
            const response = await axios.get(apiUrl, {
                headers : {
                    'Authorization' : `Bearer ${access_token}`
                },
                params : {
                    ids : mergedTracks
                }
            })
            counter++            
            if(response !== null) {
                const modifiedResponse = response.data.tracks
                const responseToSend = removeKeysFromObjects(modifiedResponse, keysToRemove) // keys removed, new array formed
                responseList.push(responseToSend)
            }
        } while (counter < numberOfCalls)

        const flattedResponseList = responseList.flat()

        // Response list will be an 2-dimensional array with json data within
        // create object and store the content of the response list in it, ten return the json object variable...
        const listJsonObject = JSON.parse(JSON.stringify(flattedResponseList))

        return listJsonObject
    } catch (error) {
        console.error(error)        
    }
}

// Search for particular track on Spotify using track_name and track_artist parameters
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

// I have no clue where's this used
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

// Add track URIs to the newly generated playlist on user's Spotify
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

module.exports = { getToken, createNewPlaylist, getPlaylistItems, getUsersLibrary, getTracksData, searchTrack, searchNoArtistTrack, addToPlaylist }