import PropTypes from 'prop-types'
import ConnectButton from './ConnectButton'
import BasicMenu from './BasicMenu'
import logo from '../assets/favicon-32x32.png'
import Spotify from '../assets/spotify.svg'
import { useSpotifyAuthContext } from '../context/useSpotifyAuthContext'

const NavigationBar = () => {

    const { user } = useSpotifyAuthContext()

    return (
        <nav className='relative mx-auto p-3 text-textLighter bg-spotifyDarkGrey border-b-2 border-darkGreen'>
            <div className='flex items-center justify-between nunito-sans-bold'>
                <div className='flex'>
                    <img src={logo} alt="logo" className=''/>
                    {user && (
                        <div className='flex flex-row'>
                            <a href="/" className='text-3xl font-bold ml-6'>Playlistify <span className='pl-2 text-md font-normal text-stone-500'> | </span><span className='pl-2 text-2xl font-normal'>Welcome, <span className='text-spotifyGreen'>{user.username}!</span></span></a>
                        </div>
                    )}

                    {!user && (
                        <a href="/" className='text-3xl font-bold ml-6'>Playlistify <span className='pl-2 text-md font-normal text-stone-500'> | </span><span className='pl-2 text-2xl font-normal'>Welcome, Guest!</span></a>
                    )}
                </div>
                <div className='flex flex-row justify-between items-center gap-5'>
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
        </nav>
    )
}

NavigationBar.propTypes = {
    user: PropTypes.string,
    profilePicture: PropTypes.string,
    profileUrl: PropTypes.string
};

export default NavigationBar