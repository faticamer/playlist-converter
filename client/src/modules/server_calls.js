import axios from 'axios'

function formChunkedArray(originalArray, chunkSize) {
    const chunkedArray = []
    for(let i = 0; i < originalArray.length; i += chunkSize) {
        const chunk = originalArray.slice(i, i + chunkSize)
        chunkedArray.push(chunk)
    }
    return chunkedArray
}

// Performs an API call to the youtube route and returns the list of titles from
// a YouTube playlist
async function fetchTitlesFromYoutube (youtubePlaylistId) {
    try {
        const response = await axios.get(`http://localhost:5555/youtube/playlists`, {
            params : {
                playlistId : youtubePlaylistId
            }
        })
        return response.data.titles
    } catch (error) {
        console.error('There was a problem witch fetching playlist titles', error.message)
        return []
    }
}

// Performs an API call to the Spotify route. Firstly, it will handle the creation of
// the playlist on user's Spotify account. The return value is the ID of the newly created playlist
async function createSpotifyPlaylist() {
    try {
        const response = await axios.get('http://localhost:5555/spotify/playlist/create', {
            withCredentials: true
        })            
        return response.data.data.id
    } catch (error) {
        console.log(error);
    }
}

// Takes the titles that were prevoiusly extracted from a YouTube
// playlist, separate them into two parts, storing track artist and track name into 
// two separate arrays, and afterwards returning both artists and titles
async function separateArtistAndTitle (titlesForwarded) {
    var artistArray = []
    var titleArray = []

    if(titlesForwarded.length !== 0) {            
        titlesForwarded.forEach(title => {
            var result = title.split(/[(-]/).map(str => str.trim());
            artistArray.push(result[0])
            titleArray.push(result[1])
        });

        // setSongArtist(artistArray)
        // setSongTitle(titleArray)

        return [artistArray, titleArray]
    } else {            
        console.log('Extraction not possible since title array is empty');
        return []
    }
}

// Searched the Spotify database based on the track tuple ([artist, title])
// It will return a whole response containing the data about the songs that matched the 
// criteria. The response is later used to extract the spotify:track:{id} from it
// Routine is limited to single result
async function searchTrackOnSpotify (songTitles, songArtists) {
    try {
        const spotifyIds = []                      
        if(songTitles.length != 0 && songArtists.length != 0) {
            console.log('Condition satisfied');
            for(let i = 0; i < songTitles.length; i++) {
                const response = await axios.get('http://localhost:5555/spotify/search', {
                    params : {
                        track : songTitles[i],
                        artist : songArtists[i]
                    }
                })
                if(response.data.data.tracks.items.length > 0) {
                    const trackUri = response.data.data.tracks.items[0].uri
                    spotifyIds.push(trackUri)
                }
            }                
            return spotifyIds
        } else {
            console.log('Condition NOT satisfied');
            return []
        }            
    } catch (error) {
        console.error(error)
    }
}

// Adds the list of Spotify tracks to the user's Spotify playlist that 
// was previously programatically generated
async function addTracksToPlaylistModified(playlistId, trackUris) {    
    try {
        if (trackUris.length <= 100) {
            const response = await axios.get(`http://localhost:5555/spotify/playlist/convert`, {
                withCredentials: true,
                params: {
                    playlistId: playlistId,
                    uri: trackUris
                },                    
            });
            console.log(response);                
        } else {
            const chunk = formChunkedArray(trackUris, 100)
            const iterations = Math.ceil(trackUris.length / 100)
            for(let i = 0; i < iterations; i++) {
                await axios.get('http://localhost:5555/spotify/playlist/convert', {
                    withCredentials : true,
                    params : {
                        playlistId : playlistId,
                        uri: chunk[i]
                    }
                })                                
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function convert (youtubePlaylistId) {
    try {
        const playlistId = await createSpotifyPlaylist()
        console.log('Playlist id: ', playlistId);
        const youtubeTitles = await fetchTitlesFromYoutube(youtubePlaylistId)
        console.log('Titles: ', youtubeTitles);
        const [artists, titles] = await separateArtistAndTitle(youtubeTitles)
        console.log(`Artists: ${artists} and Titles: ${titles}`);
        const spotifyIds = await searchTrackOnSpotify(artists, titles)
        console.log('Spotify ids: ', spotifyIds);            
        await addTracksToPlaylistModified(playlistId, spotifyIds)
        console.log('Completed');
    } catch (error) {
        console.error('There was an error in some module. ', error.message)
    }
}

// module.exports = { formChunkedArray, fetchTitlesFromYoutube, createSpotifyPlaylist, separateArtistAndTitle, searchTrackOnSpotify, addTracksToPlaylistModified, convert }
export default convert