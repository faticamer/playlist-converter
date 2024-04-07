import { useEffect, useState } from 'react'
import Footer from "../components/Footer"
import PropTypes from 'prop-types'
import NavigationBar from "../components/Navigation"
import convert from '../modules/server_calls'
import CircularProgress from '@mui/material/CircularProgress'


const Convert = ({user}) => {
    const [youtubePlaylistId, setyoutubePlaylistId] = useState('')
    const [isLoading, setIsLoading] = useState(false);

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
    
    const callConvert = async () => {
      setIsLoading(true);
      try {
        const data = await convert(youtubePlaylistId);
        console.log('Status: ', data);        
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
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
                  <button onClick={callConvert} disabled={isLoading} className='rounded-full w-full bg-spotifyGreen p-3 text-black'>{ isLoading ? 'Loading...' : 'Start Converting' }</button>
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

            <Footer />
        </div>
    )
}

Convert.propTypes = {
    user: PropTypes.string
}

export default Convert