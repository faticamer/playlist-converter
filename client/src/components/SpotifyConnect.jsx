import PropTypes from 'prop-types'
import { useSpotifyAuthContext } from '../context/useSpotifyAuthContext'

const SpotifyConnect = (props) => {
    const { user } = useSpotifyAuthContext()

    const logout = () => {
        window.open('http://localhost:5555/auth/spotify/logout', '_self');
    }

    const openLoginPage = () => {
        window.open('http://localhost:5555/auth/spotify', '_self')
    }

    return (
        <div className='px-2'>
            {user && (
                <div className='flex flex-row justify-between items-center gap-3'>
                    <div onClick={logout} className='flex flex-row justify-between items-center gap-3 nunito-sans-regular outline outline-2 outline-red-500 rounded-full p-1 text-white cursor-pointer hover:bg-red-500  hover:transition-all duration-400 ease-in-out'>
                        <img src={user.profilePicture} alt="Spotify Profile Picture" className='w-9 h-9 rounded-full'/>
                        <p className='px-5 py-2 text-justify font-bold'>Log Out</p>
                    </div>
                </div>
            )}
            {!user && (
                <div onClick={openLoginPage} className={`flex flex-row justify-between items-center gap-3 nunito-sans-regular outline outline-1 rounded-full p-1 text-black cursor-pointer ${props.background}`}>
                    <img src={props.source} alt={props.alt} className='w-8 h-8'/>
                    <p>Sign in with {props.title}</p>
                </div>
            )}
        </div>        
    )
}

SpotifyConnect.propTypes = {
    title : PropTypes.string,
    source : PropTypes.string,
    destination : PropTypes.string,
    alt : PropTypes.string,
    background : PropTypes.string
}

export default SpotifyConnect