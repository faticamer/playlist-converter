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
                <div className='flex flex-row justify-between items-center gap-3'>
                    
                    <div onClick={logout} className='flex flex-row justify-between items-center gap-3 nunito-sans-regular outline outline-2 outline-red-800 rounded-full text-white cursor-pointer hover:bg-red-900'>
                        <p className='px-5 py-2 text-justify font-bold'>Log Out</p>
                    </div>
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