import PropTypes from 'prop-types'
import spotify from '../assets/spotify.svg'

const GreetMessage = ({user}) => {
    const logout = () => {
        window.open('http://localhost:5555/auth/spotify/logout', '_self')
    }

    return (
        <div onClick={logout} className='flex flex-row justify-between items-center gap-3 nunito-sans-regular outline outline-1 rounded-full p-2 text-black bg-spotifyGreen cursor-pointer'>
            <img src={spotify} alt="Spotify Logo" className='w-8 h-8'/>
            <p>Hello, {user} (Log out)</p>
        </div>
    )
}

GreetMessage.propTypes = {
    user: PropTypes.string
}

export default GreetMessage