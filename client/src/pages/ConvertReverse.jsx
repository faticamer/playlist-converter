import NavigationBar from "../components/Navigation";
import Footer from '../components/Footer'
import InfoPane from "../components/InfoPane";
import PropTypes from 'prop-types'
import { useEffect, useState } from "react";
import { getPlaylistItems, getTracksInfo, insertMarker } from '../modules/server_calls'
import styles from '../Spinner.module.css'


const ConvertReverse = ({user}) => {
    const [spotifyPlaylistId, setSpotifyPlaylistId] = useState('')    
    const [tracks, setTracks] = useState([])

    const handleInputField = async (event) => {
        const valueToParse = event.target.value

        if (valueToParse) {
            const playlistId = extractPlaylistId(valueToParse)
            setSpotifyPlaylistId(playlistId)

            try {
                const response = await getPlaylistItems(playlistId)
                const parsedResponse = response.replace('[', '').replace(']', '')
                const trackArray = parsedResponse.split(',')
                const trackDetailsResponse = await getTracksInfo(trackArray)

                // Prepare trackDetailResponse for InfoWindow
                const finalTracksWithMarker = insertMarker(trackDetailsResponse, 'tracks')

                setTracks(finalTracksWithMarker)
            } catch (error) {
                console.error('Error fetching playlist items: ', error)
            }
        } else {
            console.error('Playlist ID not found in the URL')
        }
    }

    // For handling Name input field
    const handleNameInputChange = (event) => {
        console.log('Hello')
    }

    function extractPlaylistId (url) {
        const lastSlashIndex = url.lastIndexOf('/')
        const queryStringIndex = url.indexOf('?')

        if(lastSlashIndex < 0 || queryStringIndex <= lastSlashIndex) {
            return null
        }

        return url.substring(lastSlashIndex + 1, queryStringIndex)
    }

    return (
        <div className="flex flex-col bg-spotifyBg min-h-screen">
            <div>
                <NavigationBar user={user}/>
            </div>
            <div className='flex flex-row items-center justify-center'>
            <div className='text-white w-1/3 h-[70vh] border-2 border-zinc-700 bg-spotifyDarkGrey rounded-2xl mt-6 ml-6 p-3 overflow-auto'>
                <h1 className='pb-3 text-2xl border-b-2 border-green-800'>Playlist content</h1>
                <div>
                {(tracks.length > 0) ?  <InfoPane list={tracks} /> 
                : 
                    <div className='flex flex-col justify-center items-center h-[50vh]'>
                        <h1>Waiting for URL...</h1>
                        <span className={styles.loader}></span>
                    </div>}
                </div>
            </div>
            <div className='flex flex-col items-center justify-center h-[75vh] md:w-1/2 sm:w-1/2'>
              <div className='flex flex-col items-center justify-center w-3/5'>
                <h1 className='font-light dark:text-white text-2xl pb-8 font-normal'>Paste Spotify Playlist URL!</h1>
                  <input onChange={handleInputField} type='text' placeholder='Place your URL' className='p-4 w-full rounded-md bg-zinc-800 text-white text-center border border-green-800 focus:outline-none focus:bg-zinc-700 onfocus="this' id='convertInput' />
                  <input onChange={handleNameInputChange} type='text' placeholder='Name' className='p-4 w-full rounded-md bg-zinc-800 text-white text-center border border-green-800 focus:outline-none focus:bg-zinc-700 onfocus="this' id='convertInput' />
              </div>
              <div className='flex flex-col items-center justify-center w-2/5 m-5 pt-4'>
                <button className='text-center font-normal p-3 border-0 rounded-full dark:text-white hover:bg-zinc-600 transition-all duration-300 ease-in-out'>Click me</button>
              </div>
              <div>
                {/* */}
              </div>
            </div>
            <div className='text-white w-1/3 h-[70vh] border-2 border-zinc-700 bg-spotifyDarkGrey rounded-2xl mt-6 mr-6 p-3 overflow-auto'>
              <h1 className='pb-3 text-2xl border-b-2 border-green-800'>New Playlist</h1>
              {/* (tracks.length > 0) ?  <InfoPane list={tracks} /> : <div className = 'text-lg pt-3'>No data currently available</div> */}
            </div>
          </div>
            <Footer />
        </div>
    )
}

ConvertReverse.propTypes = {
    user: PropTypes.string
}

export default ConvertReverse