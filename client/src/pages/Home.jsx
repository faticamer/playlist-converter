import PropTypes from 'prop-types'
import NavigationBar from '../components/Navigation'
import Footer from '../components/Footer'
import splash from '../assets/splash2.png'
import { Link } from 'react-router-dom'

const Home = ({ user }) => {
    const path = user ? '/convert' : '/info'

    return (
        <div className="flex flex-col bg-spotifyBg min-h-screen">
            <div>
            <NavigationBar user={user} />
            </div>
            <div className='flex-1 flex justify-center items-center'>            
                <div className='flex flex-col items-center justify-center h-[75vh] w-3/4 sm:w-2/3 mx-auto'>
                <h1 className='text-2xl text-white font-bold'>Playlistify</h1>
                <p className='text-textDark text-md mb-5 text-center'>Playlist Converter</p>
                <p className='text-textLight text-md text-center mb-5'>Take any playlist from YouTube and convert it to Spotify.</p>
                <div className='w-3/4 border-t-4 border-b-4 border-zinc-400'>
                    <img src={splash} alt="Splash Art" className=' w-full h-full'/>
                </div>

                <Link to={path} className='pt-6 text-blue-400 text-xl text-center'>Start Converting</Link>
                </div>            
            </div>
            <div>
            <Footer />
            </div>
        </div>
    );     
}

Home.propTypes = {
    user: PropTypes.string,
};

export default Home