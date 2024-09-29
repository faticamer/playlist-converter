import { useEffect, useState, useRef } from 'react'
import { useMobileDetect } from '../hooks/useMobileDetect'
import Footer from "../components/Footer"
import NavigationBar from "../components/Navigation"
import convert from '../modules/server_calls'
import { getLibrary, getTracksInfo } from '../modules/server_calls'
import { useSpotifyAuthContext } from '../context/useSpotifyAuthContext'
import AnimatedLibrary from '../components/AnimatedLibrary'
import AnimatedTracks from '../components/AnimatedTracks'
import styles from '../External.module.css'

const Convert = () => {
    const [youtubePlaylistId, setyoutubePlaylistId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState([])
    const [library, setLibrary] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [playlistName, setPlaylistName] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [isPresent, setIsPresent] = useState(false)
    const inputRef = useRef(null)
    const isMobile = useMobileDetect()

    const { user } = useSpotifyAuthContext()
    let ids = []

    /** Rendering classNames conditionally for two input fields, and convert button */    
    let urlInputClass = ''
    if(!isValid) urlInputClass = styles.gradientBorderNeutral
    else if (isValid) urlInputClass = 'border border-gradientGreen rounded-xl delay-100 transition ease-in-out duration-500'

    let playlistNameInputClass = ''
    if(!isPresent) playlistNameInputClass = styles.gradientBorderNeutral
    else if (isPresent) playlistNameInputClass = 'border border-gradientGreen rounded-xl delay-100 transition ease-in-out duration-500'

    let btnClass = ''
    if(isValid && isPresent) btnClass = styles.gradientBorderGreen + ' transition ease-in-out delay-100'
    else if(!isValid || !isPresent) btnClass = 'border rounded-xl border-zinc-400 transition ease-in-out duration-50 hover:border-zinc-100'

    let libraryPaneClass = ''
    if(library.length === 0) libraryPaneClass = styles.gradientBorderNeutralPane
    else if(library.length !== 0) libraryPaneClass = ''
    
    let songPaneClass = ''
    if(isLoading) songPaneClass = styles.gradientBorderNeutralPane
    else if (!isLoading) songPaneClass = ''

    // Clear all items from the localStorage
    const resetLocalStorage = () => localStorage.clear()

    const handleInputChange = (event) => {
        const regex = /list=([\w-]+)/;
        const match = event.target.value.match(regex)
        setInputValue(match)
    
        if (match && match[1]) {
          const playlistId = match[1];
          setyoutubePlaylistId(playlistId);
          setIsValid(true)
        } else {
          console.error('Playlist ID not found in the URL');     
          setInputValue("")
          // Handle the case where the playlist ID is not found
        }

        if(event.target.value.trim() === "") {
            setyoutubePlaylistId("")
            setIsValid(false)
        }
    };

    const handleNameInputChange = (event) => {
      const name = event.target.value;
      if(name) {
        setPlaylistName(name);
        setIsPresent(true)
      }
      else {
        setPlaylistName('PLAYLISTIFY - Converted');
        setIsPresent(false)
      }
    }

    const scrollToTop = () => {
        if (isMobile && inputRef.current) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
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
      // For any new data that is to be stored in local storage, add another case in
      // the switch statement
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
      if(!user) {
        alert('You are not authenticated!')
        return
      }

      if(youtubePlaylistId.trim() === '') {
        alert('Input field is empty! Make sure to paste the URL first!')
      } else {
        setIsLoading(true); // Reset the button state
        scrollToTop() // Scroll to top if on mobile
        setItems([]) // Reset the Pane view

        try {        
          resetLocalStorage()

          // Main call
          await convert(youtubePlaylistId, playlistName);

          ids = retrieveFromLocalStorage('items')
          const parsedIdsFromLocalStorage = ids.replace('[', '').replace(']', '');
          const idArray = parsedIdsFromLocalStorage.split(',')
          const tracksInfo = await getTracksInfo(idArray)

          await getLibraryItems()
          setItems(tracksInfo)
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
        if(result !== null) {
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
          setLibrary(library)
        } else {
          console.log('Cannot fetch library items. Please authenticate first.')
        }
      } catch (error) {
        console.error('Error fetching the library')
      }
    }

    useEffect(() => {      
      console.log('Rendered!')
      setPlaylistName('PLAYLISTIFY - Converted')
      // Since there is no reason (at least for now) to keep storing 
      // conversion data in localStorage, we will reset it with each
      // render      
      if(isMobile && inputRef.current) {
        // Scroll logic
        const scrollPosition = inputRef.current.offsetTop + inputRef.current.offsetHeight / 2 - window.innerHeight / 2
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
      }
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

          const library = removeKeysFromObjects(libraryObjects, keysToRemove)
          setLibrary(library)
        } catch (error) {
          setLibrary("")
          console.error('Error fetching playlists: ', error)
        }
      }

      setTimeout(fetchLibrary, "1000")
      resetLocalStorage()
    }, [isMobile]);

    return (
        <div ref={inputRef} className="flex flex-col bg-spotifyBlack min-h-screen">
          <div>
            <NavigationBar />
          </div>
          <div className='flex flex-col items-center justify-center lg:flex-row'>
          <div className={`${songPaneClass} text-white w-11/12 h-[70vh] bg-spotifyDarkGrey shadow shadow-zinc-600 rounded-2xl mt-6 p-3 overflow-auto md:w-5/6 mx-6 lg:w-3/4 xl:w-1/2`}>
            <h1 className='w-full p-2 text-lg text-center text-textLighter rounded-lg border-b-2 nunito-sans-regular border-zinc-800 shadow-md shadow-zinc-600 lg:text-xl xl:text-2xl'>Songs in your New Playlist</h1>
            <div>
                {(items.length > 0) ?  <AnimatedTracks list={items} /> 
                : 
                  <div className='flex flex-col justify-center items-center h-[50vh]'>
                    {inputValue.length > 0 ?
                      <div>
                        {isLoading ? 
                        <div className='flex flex-col justify-center items-center'>
                          <h1 className='nunito-sans-regular p-4'>List is being generated. Please wait...</h1>
                        { isMobile ? <span className={styles.mobileLoader} /> : <></> }
                        </div>
                        : 
                        <div />}
                      </div>
                      :
                      <div>
                          <h1 className='text-zinc-400 nunito-sans-regular'>Waiting for URL input...</h1> 
                      </div>
                    }
                  </div>
                }
              </div>
              <div></div>
            </div>
            <div className='flex flex-col w-5/6 items-center justify-center h-[75vh] md:w-3/4 lg:w-1/2'>
              <div className='flex flex-col items-center justify-center w-full xl:w-5/6'>
                <h1 className='bg-gradient-to-r from-emerald-500 to-green-700 text-transparent bg-clip-text text-2xl text-center nunito-sans-bold pb-8'>Fill in your playlist details!</h1>
                <input onChange={handleInputChange} type='text' placeholder='Playlist URL' className={`p-4 w-full rounded-lg ${urlInputClass} text-white text-center nunito-sans-regular bg-spotifyDarkGrey focus:outline-none onfocus="this" md:rounded-lg lg:rounded-2xl' id='convertInput`} />
                <input onChange={handleNameInputChange} type='text' placeholder='Playlist name' className={`mt-5 p-4 w-full rounded-lg ${playlistNameInputClass} text-white nunito-sans-regular bg-spotifyDarkGrey text-center focus:outline-none onfocus="this" md:rounded-lg lg:rounded-2xl' maxLength={100} id='playlistName`} /> 
              </div>
              <div className='flex flex-col items-center justify-center w-3/5 m-8'>
                <button onClick={callConvert} className={`${btnClass} nunito-sans-bold bg-[#1a1a1a] text-zinc-300 tracking-widest w-full p-3 mx-4 my-4 xl:w-3/4`}>CONVERT</button>
              </div>
              <div>
                { isLoading ? 
                  <div className='flex flex-col items-center justify-center mx-auto'>
                    <p className='text-zinc-400 text-center nunito-sans-bold'>Please wait for conversion to complete. This may take a while...</p>
                  </div>
                :
                  <></>
                }
              </div>
            </div>
            <div className={`${libraryPaneClass} text-white w-11/12 h-[70vh] bg-spotifyDarkGrey shadow shadow-zinc-600 rounded-2xl mt-6 p-3 overflow-auto md:w-5/6 mx-6 lg:3/4 xl:w-1/2`}>
              <h1 className='p-2 text-lg text-center text-textLighter nunito-sans-regular rounded-lg border-zinc-800 shadow-md shadow-zinc-600 lg:text-xl xl:text-2xl'>Your Spotify library</h1>
              {(library.length > 0) ?  <AnimatedLibrary list={library} />
              : 
              <div className='flex flex-col justify-center items-center h-[50vh]'>
                {user && (
                  <div>
                    <h1 className='text-zinc-400 nunito-sans-regular'>Fetching Spotify library...</h1>
                  </div>
                )}
                {!user && (
                  <h1 className='text-zinc-400 text-center nunito-sans-regular'>You should be signed in to enable this feature!</h1>
                )}
              </div>}
            </div>
          </div>
          <div className='mt-auto'>
            <Footer /> 
          </div>
        </div>
    )
}

export default Convert