import axios from 'axios'

// Performs an API call to the youtube route and returns the list of titles from
// a YouTube playlist
async function fetchTitlesFromYoutube (youtubePlaylistId) {
    try {
        const response = await axios.get(`http://localhost:5555/youtube/playlist`, {
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

async function fetchChannelObjects (youtubePlaylistId) {
    try {
        const response = await axios.get(`http://localhost:5555/youtube/playlist/channels`, {
            params : {
                playlistId : youtubePlaylistId
            }
        })
        return response.data
    } catch (error) {
        console.error('There was a problem.', error.message)
        return []
    }
}

async function extractChannels (channelObjArray) {
    try {   
        const channelIds = channelObjArray.map(obj => {
            if(obj.snippet) {
                return obj.snippet.videoOwnerChannelTitle
            } else {
                return null
            }
        })
        const parsedChannelIds = channelIds.filter(element => element !== undefined);
        // console.log(parsedChannelIds);

        if(parsedChannelIds.length !== 0) {
            return parsedChannelIds
        } else return []
    } catch (error) {
        console.error('There was an issue with the parser', error.message)
    }
}

const filterYoutubeTitles = (titles) => {
    const filterKeywords = ['Deleted video', 'Private video'];

    // Filter out titles that contain any of the filterKeywords    

    const filteredTitles = titles.filter(title => {
        // Check if the title includes any of the filterKeywords
        return !filterKeywords.some(keyword => title.includes(keyword));
    });

    return filteredTitles;
};


// Takes the titles that were prevoiusly extracted from a YouTube
// playlist, separate them into two parts, storing track artist and track name into 
// two separate arrays, and afterwards returning both artists and titles
async function separateArtistAndTitle(titlesForwarded, youtubePlaylistId) {
    const artistArray = [];
    const titleArray = [];

    const channelObject = await fetchChannelObjects(youtubePlaylistId)
    const channelObjArray = channelObject.data        
    const channelIds = await extractChannels(channelObjArray)
    // console.log('Channel IDs before processing: ', channelIds);
    // const finalChannelIds = channelIds.map(title => stripDelimiters(title));

    if (titlesForwarded.length !== 0) {
        titlesForwarded.forEach(title => {
            if (title.includes('-')) {
                const result = title.split('-').map(str => str.trim());
                artistArray.push(result[0]);
                titleArray.push(result[1]);
            } else {
                // Note : this only handles the format that only has a title, but not
                // the rest of potential formats.
                // Update : Temporary solution, I still need to find a way to find a proper song 
                // since there might be many songs with the same title (but different artist)
                artistArray.push('')
                titleArray.push(title)
            }
        })

        // Iterate over the newly created arrays and find which arr index has an empty space
        // add nth element from the imported channel name to the artist array
        for(let i = 0; i < artistArray.length; i++) {
            if(artistArray[i] === '') {
                artistArray[i] = channelIds[i]
            }
        }

        const finalArtists = artistArray.map(title => stripDelimiters(title));
        const finalTitles = titleArray.map(title => stripDelimiters(title));

        // console.log('Final artists: ', finalArtists);
        // console.log('Final titles: ', finalTitles);

        return [finalArtists, finalTitles];
    } else {
        console.log('Extraction not possible since title array is empty');
        return [];
    }
}

function stripDelimiters (stringToParse) {
    // Carefully plan the set of delimiters, there are specific song title formats
    // and delimiters separating artist and title, for instance
    // DMX x X Gon give it to ya'.
    // In this case the delimiter is 'x', but 'x' is located in both title and artist,
    // and having this in mind the strip will not behave properly.
    const delimiters = ['&', 'ft', '-', '(']
    for (const delimiter of delimiters) {
        const index = stringToParse.indexOf(delimiter)
        if(index != -1) {
            return stringToParse.substring(0, index).trim()
        }
        // Otherwise no action is performed
    }
    return stringToParse
}

function formChunkedArray(originalArray, chunkSize) {
    const chunkedArray = []
    for(let i = 0; i < originalArray.length; i += chunkSize) {
        const chunk = originalArray.slice(i, i + chunkSize)
        chunkedArray.push(chunk)
    }
    return chunkedArray
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

// Search the Spotify database based on the track tuple ([artist, title])
// It will return a whole response containing the data about the songs that matched the 
// criteria. The response is later used to extract the spotify:track:{id} from it
// Routine is limited to single result
async function searchTrackOnSpotify (songArtists, songTitles) {
    try {
        const spotifyIds = []                      
        if(songTitles.length != 0 && songArtists.length != 0) {
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
        }

        return spotifyIds
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

async function getPlaylistItems(playlistId) {
    try {
        const response = await axios.get(`http://localhost:5555/spotify/playlist/get-items`, {
            withCredentials : true,
            params : {
                playlistId : playlistId
            }
        })

        // De-structure response items into an array
        const list = response.data.response

        return list
    } catch (error) {
        console.error('Error', error)
    }
}

export async function getTracksInfo(trackIds) {
    try {
        const response = await axios.get(`http://localhost:5555/spotify/playlist/get-tracksinfo`, {
            withCredentials : true,
            params : {
                ids : trackIds
            }
        })

        const arrayList = response.data
        const finalList = arrayList.data
        return finalList
    } catch (error) {
        console.error('Error', error)
    }
}

export async function getLibrary() {
    try {
        const response = await axios.get(`http://localhost:5555/spotify/playlist/get-library`, {
            withCredentials : true
        })
        
        return response.data
    } catch (error) {
        console.error('Error', error)        
    }
}

export function insertMarker(target, marker) {
        // Create a copy of the original array
    const newArray = [...target];
    
    // Insert the marker object at the beginning of the new array
    newArray.unshift({ marker });

    // Return the new array with the marker object inserted
    return newArray;
}

export function removeMarker(target) {
    // Create a copy of the original array
    const newArray = [...target];
    
    // Remove the first element (marker object) from the new array
    newArray.shift();

    // Return the new array without the marker object
    return newArray;
}

async function convert (youtubePlaylistId) {    
    try {
        const playlistId = await createSpotifyPlaylist()
        console.log('Playlist id: ', playlistId);
        const youtubeTitles = await fetchTitlesFromYoutube(youtubePlaylistId)
        const filteredTitles = filterYoutubeTitles(youtubeTitles)
        // console.log('Titles: ', filteredTitles);
        const [artists, titles] = await separateArtistAndTitle(filteredTitles, youtubePlaylistId)
         
        const spotifyIds = await searchTrackOnSpotify(artists, titles)
        // console.log('Spotify ids: ', spotifyIds);
        await addTracksToPlaylistModified(playlistId, spotifyIds)
        console.log('Completed');
        const playlistItems = await getPlaylistItems(playlistId)

        const data = {
            id : playlistId,
            items : playlistItems,
            success : true
        }

        localStorage.setItem('spotifyAssets', JSON.stringify(data))

        // I need to see if this is acceptable solution instead of throwing an error
        return true
    } catch (error) {
        console.error('There was an error in some module. ', error.message)
        return false
    } 
}

export default convert