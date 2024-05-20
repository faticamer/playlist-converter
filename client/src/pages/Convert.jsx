import { useEffect, useState } from 'react'
// import axios from 'axios'
import Footer from "../components/Footer"
import PropTypes from 'prop-types'
import NavigationBar from "../components/Navigation"
import convert from '../modules/server_calls'
<<<<<<< Updated upstream

=======
import { getLibrary, getTracksInfo, insertMarker } from '../modules/server_calls'
import CircularProgress from '@mui/material/CircularProgress'
import splash from '../assets/splash3.png'
import InfoPane from '../components/InfoPane'
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
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
=======
        <div className="flex flex-col bg-black min-h-screen fixed top-0 left-0 right-0 z-50 p-4">
          <div>
            <NavigationBar user={user}/>
          </div>
          
          {/* <div className='text-white w-1/3 h-[55vh] border-2 border-spotifyDarkGrey bg-black rounded-2xl mt-6 ml-6 overflow-auto'>
            <h1 className='pb-3'>Songs in your New Playlist</h1>
            <div> */}
              {/* {(items.length > 0) ?  <InfoPane list={items} /> : <div>No data currently available</div>}
            </div>
          </div> */}
            <div className='bg-[#10013C] flex h-screen'>
            <div className='bg-black w-1/2 flex justify-start items-center'>
              <div className='bg-black items-start mb-12 flex flex-col items-start justify-center h-[50vh] w-3/4 sm:w-2/3 mx-auto space-y-6'>
                <h1 className='text-8xl leading-none text-white font-extrabold mt-0 mb-0' style={{ marginBottom: '0px' }}>Let's begin</h1>
                <div className='w-[500px]'>
                <p className='text-textLight text-2xl text-left' style={{ marginBottom: '24px' }}>Choose a YouTube playlist you like and paste it in the field below</p>
                  <input onChange={handleInputChange} type='text' style={{ marginBottom: '0px' }} placeholder='Paste YouTube URL' className='p-4 w-full rounded-md bg-zinc-800 text-white text-left border border-green-800 focus:outline-none focus:bg-zinc-700 onfocus="this' id='convertInput' />
                  </div>
              <div className='flex flex-col items-left justify-center w-2/5 pt-4'>
                <button onClick={callConvert} disabled={isLoading} className='text-black font-bold text-2xl text-center pb-4 pt-4 pl-6 pr-6 bg-green-300 rounded-full cursor-pointer hover:bg-green-500 transition-colors duration-300'>{ isLoading ? 'Loading...' : 'Convert' }</button>                
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
            
        </div>
        <div className='w-fit flex justify-end'>
    <img src={splash} alt="Splash Art" className='w-fit h-screen mr-0 object-cover'/>
        </div>
            {/* <div className='text-white w-1/3 h-[55vh] border-2 border-spotifyDarkGrey bg-spotifyDarkGrey rounded-2xl mt-6 mr-6 overflow-auto'>
              <h1 className='pb-3'>Your library</h1>
              {(library.length > 0) ?  <InfoPane list={library} /> : <div>No data currently available</div>}
            </div> */}
          
          <div className="fixed bottom-0 left-0 right-0 z-50 p-1">
          <Footer />
            </div>
          </div>
      </div>
>>>>>>> Stashed changes
    )
}

Convert.propTypes = {
    user: PropTypes.string
}

export default Convert