import PropTypes from 'prop-types'
import ConnectButton from './ConnectButton'
import BasicMenu from './BasicMenu'
import logo from '../../public/apple-touch-icon.png'
import Spotify from '../assets/spotify.svg'
import { useSpotifyAuthContext } from '../context/useSpotifyAuthContext'

const NavigationBar = () => {

    const { user } = useSpotifyAuthContext()

    return (
        <div className='relative mx-auto p-3 text-textLighter bg-spotifyDarkGrey border-b-2 border-darkGreen'>
            <div className='flex items-center justify-between nunito-sans-bold'>
                <div className='flex'>
                    <a href="/">
                        <img src={logo} alt="logo" className='w-10 h-10'/>
                    </a>
                    {user && (
                        <div className='hidden sm:block flex flex-row'>
                            <a href="/" className='text-3xl font-bold ml-6'>Playlistify</a>
                        </div>
                    )}

                    {!user && (
                        <div className='flex flex-row'>
                            <a href="/" className='hidden sm:block text-2xl ml-6 md:text-3xl ml-6'>Playlistify</a>
                        </div>
                    )}
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <ConnectButton
                        title="Spotify"
                        source={Spotify}
                        destination='spotify'
                        alt="Spotify Logo"
                        background="bg-spotifyGreen"
                    />
                    { user && (
                        <BasicMenu>Options</BasicMenu>
                    )}
                </div>
            </div>
        </div>
    )
}

NavigationBar.propTypes = {
    user: PropTypes.string,
    profilePicture: PropTypes.string,
    profileUrl: PropTypes.string
};

export default NavigationBar