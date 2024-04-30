import { useEffect, useState } from 'react'
import Footer from "../components/Footer"
import PropTypes from 'prop-types'
import NavigationBar from "../components/Navigation"
import convert from '../modules/server_calls'
import { getLibrary, getTracksInfo, insertMarker } from '../modules/server_calls'
import CircularProgress from '@mui/material/CircularProgress'
import InfoPane from '../components/InfoPane'

const Convert = ({user}) => {
    const [youtubePlaylistId, setyoutubePlaylistId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState([])
    const [library, setLibrary] = useState([])

    let ids = []

    // Clear all items from the localStorage
    const resetLocalStorage = () => localStorage.clear()

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

    function retrieveFromLocalStorage(key) {
      if (typeof key !== 'string') {
        console.log('Parameter must be a string');
        return null;
      }

      const parsedKey = key.toLocaleLowerCase()
      const localStorageData = localStorage.getItem('spotifyAssets')

      if(!localStorageData) {
        console.log(`Browser's local storage for this application is empty`);
        return null;
      }
      // For any new data that is to be stored in local storage, just add another case in
      // the switch statement, without modifying anything else
      try {
        const parsedData = JSON.parse(localStorageData)
        switch (parsedKey) {
          case 'id':
            return parsedData.id
          case 'items':
            return parsedData.items
          default:
            console.log('Invalid key');
            return null
        }
      } catch (error) {
        console.error('Error parsing data from local storage')
        return null
      }
    }


    function extractTrackId (strings) {
      return strings.map(str => {
        // Split the string by ':' and get the last part
        const parts = str.split(':');
        return parts[parts.length - 1].replace('"', '');
      });
    }

    const callConvert = async () => {
      // First check if user is authenticated
      if(!user) {
        alert('You are not authenticated!')
        return // Terminate the call if not authenticated
      }

      // Check if the input field is empty - warn the user
      if(youtubePlaylistId.trim() === '') {
        alert('Input field is empty! Make sure to paste the URL first!')
      } else {
        setIsLoading(true);

        try {        
          resetLocalStorage()

          // MAIN CALL
          await convert(youtubePlaylistId);

          ids = retrieveFromLocalStorage('items')
          const parsedIdsFromLocalStorage = ids.replace('[', '').replace(']', '');        
          const idArray = parsedIdsFromLocalStorage.split(',') // this created an array

          // Destructure the idArray into necessary data set (artist, track, icon, duration_ms)
          const trackIds = extractTrackId(idArray)
          
          // Merge back into array
          const mergedString = trackIds.join(',')

          // Perform server_call to get the response with necessary data
          const response = await getTracksInfo(mergedString)        

          // Response received, separate into array of objects
          const tracks = response.data.tracks

          // Array formed, clear unnecessary keys from objects
          // logic...
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

          // New array formed, keys removed
          const finalTracks = removeKeysFromObjects(tracks, keysToRemove)        

          // marker is added to avoid creating separate .jsx for windows
          // this way, we check the marker in InfoPane.jsx before returning the component content
          const finalTracksWithMarker = insertMarker(finalTracks, 'tracks')

          // Get library Items
          await getLibraryItems()

          // set the state variable to the final array
          setItems(finalTracksWithMarker)

        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    function removeKeysFromObjects(objects, keys) {
      return objects.map(obj => {
        keys.forEach(key => delete obj[key])
        return obj
      })
    }    

    async function getLibraryItems() {
      try {
        const result = await getLibrary()
        const libraryObjects = result.data.items
        
        const keysToRemove = [
          'collaborative', 
          'description', 
          'external_urls',
          'id', 
          'primary_color', 
          'public',
          'href',
          'snapshot_id',
          'tracks',
          'uri'
        ]

        // Data retrieved, now insert marker to indicate which item set this is
        const library = removeKeysFromObjects(libraryObjects, keysToRemove)

        const finalLibraryWithMarker = insertMarker(library, 'library')
        setLibrary(finalLibraryWithMarker)
      } catch (error) {
        console.error('Error fetching the library')
      }
    }

    useEffect(() => {      
      console.log('Rendered')
      // Since there is no reason (at least for now) to keep storing 
      // conversion data in localStorage, we will reset it with each
      // render
      const fetchLibrary = async () => {
        try {
          const result = await getLibrary()
          const libraryObjects = result.data.items
          const keysToRemove = [
            'collaborative', 
            'description', 
            'external_urls',
            'id', 
            'primary_color', 
            'public',
            'href',
            'snapshot_id',
            'tracks',
            'uri'
          ]

          // Data retrieved, now insert marker to indicate which item set this is
          const library = removeKeysFromObjects(libraryObjects, keysToRemove)

          // Item set marked
          const finalLibraryWithMarker = insertMarker(library, 'library')

          setLibrary(finalLibraryWithMarker)
        } catch (error) {
          console.error('Error fetching playlists: ', error)
        }
      }

      fetchLibrary()
      resetLocalStorage()
    }, []);

    return (
        <div className="flex flex-col bg-spotifyBg min-h-screen">
          <div>
            <NavigationBar user={user}/>
          </div>
          <div className='flex flex-row items-center justify-center'>
          <div className='text-white w-1/3 h-[55vh] border-2 border-spotifyDarkGrey bg-spotifyDarkGrey rounded-2xl mt-6 ml-6 overflow-auto'>
            <h1 className='pb-3'>Songs in your New Playlist</h1>
            <div>
              {(items.length > 0) ?  <InfoPane list={items} /> : <div>No data currently available</div>}
            </div>
          </div>
            <div className='flex flex-col items-center justify-center h-[75vh] md:w-1/2 sm:w-1/2'>
              <div className='flex flex-col items-center justify-center w-3/5'>
                <h1 className='font-light dark:text-white text-2xl pb-8'>Paste YouTube URL in the field below!</h1>
                  <input onChange={handleInputChange} type='text' placeholder='Place your URL' className='p-4 w-full rounded-md bg-zinc-800 text-white text-center border border-green-800 focus:outline-none focus:bg-zinc-700 onfocus="this' id='convertInput' />
              </div>
              <div className='flex flex-col items-center justify-center w-2/5 m-5 pt-4'>
                <button onClick={callConvert} disabled={isLoading} className='rounded-2xl w-1/2 font-normal border-2 border-green-800 p-3 dark:text-white hover:bg-zinc-600'>{ isLoading ? 'Loading...' : 'Start Converting' }</button>                
              </div>
              <div>
                { isLoading ? 
                  <div className='flex flex-col items-center justify-center mx-auto'>
                    <div>
                      <CircularProgress color='success'/>                                                        
                    </div>
                    <p 
                    className='text-white'>Please wait for conversion to complete. This may take a while...</p>
                  </div>
                :
                  <div></div>
                }
              </div>
            </div>
            <div className='text-white w-1/3 h-[55vh] border-2 border-spotifyDarkGrey bg-spotifyDarkGrey rounded-2xl mt-6 mr-6 overflow-auto'>
              <h1 className='pb-3'>Your library</h1>
              {(library.length > 0) ?  <InfoPane list={library} /> : <div>No data currently available</div>}
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