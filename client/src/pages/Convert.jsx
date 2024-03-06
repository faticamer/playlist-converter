import { useEffect, useState } from 'react'
import axios from 'axios'
import Footer from "../components/Footer"
import PropTypes from 'prop-types'
import NavigationBar from "../components/Navigation"


const Convert = ({user}) => {
    const [youtubePlaylistId, setyoutubePlaylistId] = useState('')
    // const [titles, setTitles] = useState([]) 
    // const [songTitle, setSongTitle] = useState([])
    // const [songArtist, setSongArtist] = useState([])

    const handleInputChange = (event) => {
        const regex = /list=([\w-]+)/;
        const match = event.target.value.match(regex);
    
        if (match && match[1]) {
            const playlistId = match[1];
            setyoutubePlaylistId(playlistId);
        } else {
            console.error('Playlist ID not found in the URL');
            // Handle the case where the playlist ID is not found
        }
    };
    

    function formChunkedArray(originalArray, chunkSize) {
        const chunkedArray = []
        for(let i = 0; i < originalArray.length; i += chunkSize) {
            const chunk = originalArray.slice(i, i + chunkSize)
            chunkedArray.push(chunk)
        }
        return chunkedArray
    }

    // Routine that performs an API call to the youtube route and returns the list of titles from
    // a YouTube playlist
    async function fetchTitlesFromYoutube () {
        try {
            const response = await axios.get(`http://localhost:5555/youtube/playlists`, {
                params : {
                    playlistId : youtubePlaylistId
                }
            })
            // setTitles(response.data.titles)
            return response.data.titles
        } catch (error) {
            console.error('There was a problem witch fetching playlist titles', error.message)
            return []
        }
    }

    // Routine that performs an API call to the spotify route. Firstly, it will handle creation of
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

    // This routine will take the titles that were prevoiusly extracted from a YouTube
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
    
    // This routine searches the Spotify database based on the track tuple ([artist, title])
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

    // Routine that adds the list of Spotify tracks to the user's Spotify playlist that 
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

    async function convert () {
        try {
            const playlistId = await createSpotifyPlaylist()
            console.log('Playlist id: ', playlistId);
            const youtubeTitles = await fetchTitlesFromYoutube()
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

    // Executed every time our application re-renders or re-renders some of its components
    useEffect(() => {
        console.log('Rendered')
      }, []);

    return (
        <div className="flex flex-col bg-spotifyBg min-h-screen">
            <div>
                <NavigationBar user={user}/>
            </div>           
            <div className='flex flex-col items-center justify-center h-[75vh] w-3/4 sm:w-2/3 mx-auto'>
                <div>
                  <input onChange={handleInputChange} type='text' placeholder='Place your URL' className='p-4 w-full rounded-full bg-spotifyDarkGrey text-white' />                                        
                </div>
                <div className='m-5'>
                  <button onClick={convert} className='rounded-full w-full bg-spotifyGreen p-3 text-black'>Start Converting!</button>
                </div>
              </div> 

            <Footer />
        </div>
    )
}

Convert.propTypes = {
    user: PropTypes.string
}

export default Convert