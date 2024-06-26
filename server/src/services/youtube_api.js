const axios = require('axios')
require('dotenv').config()

const yt_api_key = process.env.YOUTUBE_API_KEY
const base_url = 'https://www.googleapis.com/youtube/v3/playlistItems'

// Since this API call can retrieve up to 50 items in total, we will call the function recursively
// until there are no more page tokens
const getAllTitles = async (playlistId, pageToken = '') => {
    const params = new URLSearchParams([
        ['part', 'snippet'],
        ['maxResults', 50],
        ['playlistId', playlistId],
        ['key', yt_api_key],
        ['pageToken', pageToken]
    ])
    const fullUrl = `${base_url}?${params.toString()}`

    try {
        const response = await axios.get(fullUrl)
        const titles = response.data.items.map(item => (item.snippet && item.snippet.title) || 'No title')

        if(response.data.nextPageToken) {
            // If there is a nextPageToken, fetch it recursively
            const nextTitles = await getAllTitles(playlistId, response.data.nextPageToken)
            return titles.concat(nextTitles)
        } else {            
            return titles
        }
    } catch (error) {
        console.error('Error fetching data from API', error.message) 
        throw error       
    }
}

const getTitleJsons = async (playlistId, pageToken = '') => {
    const params = new URLSearchParams([
        ['part', 'snippet'],
        ['maxResults', 50],
        ['playlistId', playlistId],
        ['key', yt_api_key],
        ['pageToken', pageToken]
    ])
    const fullUrl = `${base_url}?${params.toString()}`

    try {
        const response = await axios.get(fullUrl)
        const titles = response.data.items

        if(response.data.nextPageToken) {
            // If there is a nextPageToken, fetch it recursively
            const nextTitles = await getTitleJsons(playlistId, response.data.nextPageToken)
            return titles.concat(nextTitles)
        } else {            
            return titles
        }
    } catch (error) {
        console.error('Error fetching data from API', error.message) 
        throw error       
    }
}

const getChannelIds = async (playlistId) => {
    // We already have titles, we will just store them here and extract the rest of the details
    // from the array
    // Perhaps I will need to modify the function 'getAllTitles' since it only stores title (I believe)
    const jsons = await getTitleJsons(playlistId)    

    return jsons
}

module.exports = { getAllTitles, getChannelIds }