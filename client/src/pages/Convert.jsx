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

    const [playlistName, setPlaylistName] = useState('')

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

    const handleNameInputChange = (event) => {
      const name = event.target.value;
      if(name) {
        setPlaylistName(name);
      }
      else {
        setPlaylistName('PLAYLISTIFY - Converted');
      }
    }

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
          await convert(youtubePlaylistId, playlistName);

          ids = retrieveFromLocalStorage('items')
          const parsedIdsFromLocalStorage = ids.replace('[', '').replace(']', '');
          const idArray = parsedIdsFromLocalStorage.split(',') // this created an array
          const response = await getTracksInfo(idArray)

          // marker is added to avoid creating separate .jsx for windows
          // this way, we check the marker in InfoPane.jsx before returning the component content
          const finalTracksWithMarker = insertMarker(response, 'tracks')

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
      setPlaylistName('PLAYLISTIFY - Converted')
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

          if(finalLibraryWithMarker !== null) {
            setLibrary(finalLibraryWithMarker)
          }          
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
          <div className='text-white w-1/3 h-[70vh] border-2 border-zinc-700 bg-spotifyDarkGrey rounded-2xl mt-6 ml-6 p-3 overflow-auto'>
            <h1 className='pb-3 text-2xl border-b-2 border-green-800'>Songs in your New Playlist</h1>
            <div>
              {(items.length > 0) ?  <InfoPane list={items} /> : <div className = 'text-lg pt-3'>No data currently available</div>}
            </div>
          </div>
            <div className='flex flex-col items-center justify-center h-[75vh] md:w-1/2 sm:w-1/2'>
              <div className='flex flex-col items-center justify-center w-3/5'>
                <h1 className='font-light dark:text-white text-2xl pb-8 font-normal'>Paste YouTube URL in the field below!</h1>
                  <input onChange={handleInputChange} type='text' placeholder='Place your URL' className='p-4 w-full rounded-md bg-zinc-800 text-white text-center border border-green-800 focus:outline-none focus:bg-zinc-700 onfocus="this' id='convertInput' />
                  
                  <input onChange={handleNameInputChange} type='text' placeholder='Write playlist name' className='mt-5 p-4 w-full rounded-md bg-zinc-800 text-white text-center border border-green-800 focus:outline-none focus:bg-zinc-700 onfocus="this' maxLength={100} id='convertInput' /> 
              </div>
              <div className='flex flex-col items-center justify-center w-2/5 m-5 pt-4'>
                <button onClick={callConvert} disabled={isLoading} className='rounded-full font-normal border-2 border-green-800 p-3 dark:text-white hover:bg-zinc-600 transition-all duration-300 ease-in-out'>{ isLoading ? 'Loading...' :<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='size-10'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1db954" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg><path fill="#1db954" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg> }</button>
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
            <div className='text-white w-1/3 h-[70vh] border-2 border-zinc-700 bg-spotifyDarkGrey rounded-2xl mt-6 mr-6 p-3 overflow-auto'>
              <h1 className='pb-3 text-2xl border-b-2 border-green-800'>Your library</h1>
              {(library.length > 0) ?  <InfoPane list={library} /> : <div className = 'text-lg pt-3'>No data currently available</div>}
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