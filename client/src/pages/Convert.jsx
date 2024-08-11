import { useEffect, useState } from 'react'
import Footer from "../components/Footer"
import NavigationBar from "../components/Navigation"
import convert from '../service/server_calls'
import { getLibrary, getTracksInfo, insertMarker } from '../service/server_calls'
import InfoPane from '../components/InfoPane'
import styles from '../External.module.css'
import { useSpotifyAuthContext } from '../context/useSpotifyAuthContext'

const Convert = () => {
    const [youtubePlaylistId, setyoutubePlaylistId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState([])
    const [library, setLibrary] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [playlistName, setPlaylistName] = useState('')
    const { user } = useSpotifyAuthContext()

    let ids = []

    // Clear all items from the localStorage
    const resetLocalStorage = () => localStorage.clear()

    const handleInputChange = (event) => {
        const regex = /list=([\w-]+)/;
        const match = event.target.value.match(regex)
        setInputValue(match)
    
        if (match && match[1]) {
          const playlistId = match[1];
          setyoutubePlaylistId(playlistId);
        } else {
          console.error('Playlist ID not found in the URL');         
          setInputValue("") 
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
      if(user === null) {
        alert('Please log in with your Spotify account to continue!')
        return
      }

      // Check if the input field is empty - warn the user
      if(youtubePlaylistId.trim() === '') {
        alert('Input field is empty! Make sure to paste the URL first!')
      } else {
        setIsLoading(true);

        try {        
          resetLocalStorage()

          // Call that performs conversion to Spotify streaming service
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
      console.log('Rendered!')
      setPlaylistName('PLAYLISTIFY - Converted')
      // Since there is no reason (at least for now) to keep storing 
      // conversion data in localStorage, we will reset it with each
      // render of the application
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

      if(user !== null) {
        setTimeout(fetchLibrary, "1000")
      }
      resetLocalStorage()
    }, []);

    return (
        <div className="flex flex-col bg-spotifyBg min-h-screen">
          <div>
            <NavigationBar />
          </div>
          <div className='flex flex-row items-center justify-center'>
          <div className='text-white w-1/3 h-[70vh] border-2 border-zinc-700 bg-spotifyDarkGrey rounded-2xl mt-6 ml-6 p-3 overflow-auto'>
            <h1 className='pb-3 text-2xl border-b-2 border-green-800'>Songs in your New Playlist</h1>
            <div>
                {(items.length > 0) ?  <InfoPane list={items} /> 
                : 
                    <div className='flex flex-col justify-center items-center h-[50vh]'>                        
                        {inputValue.length > 0 ?
                            <div>
                              {isLoading ? 
                              <div>
                                <h1>List is being generated. Please wait...</h1>
                              </div>
                              : 
                              <div />}
                            </div>
                            :
                            <div>
                                <h1>Waiting for URL...</h1> 
                                <span className={styles.staticLoader}></span>
                            </div>
                        }
                    </div>}
                </div>
          </div>
            <div className='flex flex-col items-center justify-center h-[75vh] md:w-1/2 sm:w-1/2'>
              <div className='flex flex-col items-center justify-center w-3/5'>
                <h1 className='font-light dark:text-white text-2xl pb-8 font-normal'>Paste YouTube URL in the field below!</h1>
                <input onChange={handleInputChange} type='text' placeholder='Place your URL' className='p-4 w-full rounded-md bg-zinc-800 text-white text-center border border-green-800 focus:outline-none focus:bg-zinc-700 onfocus="this' id='convertInput' />
                <input onChange={handleNameInputChange} type='text' placeholder='Playlist name' className='mt-5 p-4 w-full rounded-md bg-zinc-800 text-white text-center border border-green-800 focus:outline-none focus:bg-zinc-700 onfocus="this' maxLength={100} id='convertInput' /> 
              </div>
              <div className='flex flex-col items-center justify-center w-2/5 m-5 pt-4'>
                <button className={styles.convertBtn} onClick={callConvert} disabled={isLoading}>
                  <span> Convert </span>
                </button>
              </div>
              <div>
                { isLoading ? 
                  <div className='flex flex-col items-center justify-center mx-auto'>
                    <div>
                      <span className={styles.convertLoader}></span>
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
              {(library.length > 0) ?  <InfoPane list={library} />
              : 
              <div className='flex flex-col justify-center items-center h-[50vh]'>
                <h1>Fetching library...</h1>
                <span className={styles.helperLoader}></span>
              </div>}
            </div>
          </div>
          <Footer />
        </div>
    )
}

export default Convert