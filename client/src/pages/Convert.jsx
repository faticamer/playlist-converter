import { useEffect, useState } from 'react'
// import axios from 'axios'
import Footer from "../components/Footer"
import PropTypes from 'prop-types'
import NavigationBar from "../components/Navigation"
import convert from '../modules/server_calls'


const Convert = ({user}) => {
    const [youtubePlaylistId, setyoutubePlaylistId] = useState('')

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
                  <button onClick={() => convert(youtubePlaylistId)} className='rounded-full w-full bg-spotifyGreen p-3 text-black'>Start Converting!</button>
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