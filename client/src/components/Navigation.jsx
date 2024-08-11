import BasicMenu from './BasicMenu'
import logo from '../assets/favicon-32x32.png'
import { useSpotifyAuthContext } from '../context/useSpotifyAuthContext'
import { useGoogleAuthContext } from '../context/useGoogleAuthContext'
import SpotifyConnect from './SpotifyConnect'
import GoogleConnect from './GoogleConnect'
import Spotify from '../assets/spotify.svg'
import Google from '../assets/google.png'

const NavigationBar = () => {
    const { user } = useSpotifyAuthContext()
    const { userGoogle } = useGoogleAuthContext()
    
    return (
        <nav className='relative mx-auto p-3 text-white bg-spotifyDarkGrey'>
            <div className='flex items-center justify-between'>
                <div className='flex'>
                    <img src={logo} alt="logo" className='pl-2'/>
                    <div className='flex flex-row'>
                        {!user && userGoogle && (
                            <div className='flex flex-row'>
                                <a href="/" className='text-3xl font-bold nunito-sans-bold ml-6'>Playlistify <span className='pl-2 text-md font-normal text-stone-500'> | </span><span className='pl-2 text-2xl font-normal'>Welcome, <span className='text-red-600'>{userGoogle.username}</span></span></a>
                            </div>
                        )}
                        {user && !userGoogle && (
                            <div className='flex flex-row'>
                                <a href="/" className='text-3xl font-bold nunito-sans-bold ml-6'>Playlistify <span className='pl-2 text-md font-normal text-stone-500'> | </span><span className='pl-2 text-2xl font-normal'>Welcome, <span className='text-spotifyGreen'>{user.username}</span></span></a>
                            </div>
                        )}
                    </div>
                    {!user && !userGoogle && (
                        <a href="/" className='text-3xl font-bold nunito-sans-bold ml-6'>Playlistify <span className='pl-2 text-md font-normal text-stone-500'> | </span><span className='pl-2 text-2xl font-normal'>Welcome, Guest!</span></a>
                    )}
                </div>
                <div className='flex flex-row justify-between items-center gap-5 nunito-sans-regular'>
                    {user === null && userGoogle === null && (
                        <div className='flex-1 flex justify-center items-center'>
                            <SpotifyConnect
                                title="Spotify"
                                source={Spotify}
                                destination='spotify'
                                alt="Spotify Logo"
                                background="bg-spotifyGreen"
                            />
                            <GoogleConnect
                                title="Google"
                                source={Google}
                                destination='google'
                                alt="Google Logo"
                                background="bg-zinc-200"
                            />
                        </div>
                    )}
                    {user === null && userGoogle !== null && (
                        <GoogleConnect
                            title="Google"
                            source={Google}
                            destination='google'
                            alt="Google Logo"
                            background="bg-zinc-200"
                        />
                    )}
                    {user !== null && userGoogle === null && (
                        <SpotifyConnect
                            title="Spotify"
                            source={Spotify}
                            destination='spotify'
                            alt="Spotify Logo"
                            background="bg-spotifyGreen"
                        />
                    )}
                    {(user !== null || userGoogle !== null) && (
                        <BasicMenu>Options</BasicMenu>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavigationBar