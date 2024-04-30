import PropTypes from 'prop-types'
import spotify from '../assets/spotify.svg'

const ConnectButton = ({user}) => {
    const logout = () => {
        window.open('http://localhost:5555/auth/spotify/logout', '_self')
    }

    const openLoginPage = () => {
        window.open('http://localhost:5555/auth/spotify', '_self')
    }

    return (
        <div>
            { user ?
            (
                <div onClick={logout} className='flex flex-row justify-between items-center gap-3 nunito-sans-regular outline outline-1 rounded-full p-1 text-black bg-spotifyGreen cursor-pointer'>
                    <img src={spotify} alt="Spotify Logo" className='w-8 h-8'/>
                    <p>Hello, {user} (Log out)</p>
                </div>
            )
            :
            (
                <div onClick={openLoginPage} className='flex flex-row justify-between items-center gap-3 nunito-sans-regular outline outline-1 rounded-full p-1 text-black bg-spotifyGreen cursor-pointer'>
                    <img src={spotify} alt="Spotify Logo" className='w-8 h-8'/>
                    <p>Connect with Spotify</p>
                </div>
            )}
        </div>        
    )
}

ConnectButton.propTypes = {
    user : PropTypes.string
}

export default ConnectButton