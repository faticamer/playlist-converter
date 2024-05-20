import PropTypes from 'prop-types'
import NavigationBar from '../components/Navigation'
import Footer from '../components/Footer'
import splash from '../assets/splash2.png'
import { Link } from 'react-router-dom'

const Home = ({ user }) => {
    const path = user ? '/convert' : '/info'

    return (
        <div className="flex flex-col bg-black min-h-screen">
            <div className='fixed bg-black top-0 left-0 right-0 z-50 p-4'>
            <NavigationBar user={user} />
            </div>


            <div className='flex h-screen'>
                <div className='bg-black w-1/2 flex justify-start items-center'>
                    <div className='flex flex-col items-start justify-center h-[75vh] w-3/4 sm:w-2/3 mx-auto space-y-6'>
                        <p className='text-textDark tracking-[.25em] text-xl text-center mt-6 mb-0'>Playlist Converter</p>
                        <h1 className='text-8xl leading-none text-white font-extrabold mt-0 mb-0' style={{ marginTop: '8px' }}>Playlistify</h1>
                <div className='w-[555px]'>
                    <p className='text-textLight text-2xl text-left mb-5'>Easily convert your YouTube playlist to Spotify with just a link! Let's upgrade your listening experience effortlessly.</p>
                    </div>
                <Link to={path} className='block text-center'>
                <div className='text-black font-bold text-2xl text-center pb-4 pt-4 pl-6 pr-6 bg-green-300 rounded-full cursor-pointer hover:bg-green-500 transition-colors duration-300'>Start Converting</div>
                </Link> 
            </div>
    </div>

  <div className='bg-black w-1/2 flex justify-end items-center'>
  <div className='w-fit flex justify-end'>
    <img src={splash} alt="Splash Art" className='w-fit h-screen mr-0 object-cover'/>
  </div>
</div>
  </div>

            <div className="fixed bottom-0 left-0 right-0 z-50">
            <Footer/>
            </div>
        </div>
    );     
}

Home.propTypes = {
    user: PropTypes.string,
};

export default Home