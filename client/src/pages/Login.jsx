import NavigationBar from '../components/Navigation'
import Footer from '../components/Footer'
import ConnectButton from '../components/ConnectButton'
import Spotify from '../assets/spotify.svg'
import Google from '../assets/google.png'
import PropTypes from 'prop-types'

const Login = (props) => {
    return (
        <div className='flex flex-col min-h-screen bg-spotifyBlack'>
            <div>
                <NavigationBar user={props.user} profilePicture={props.profilePicture} profileUrl={props.profileUrl} />
            </div>
            {!props.user ? 
            <div className='flex-1 flex justify-center items-center'>
                <ConnectButton
                    user={props.user} 
                    title="Spotify"
                    source={Spotify}
                    destination='spotify'
                    alt="Spotify Logo"
                    background="bg-spotifyGreen"
                />
                <ConnectButton 
                    user={props.user}
                    title="Google" 
                    source={Google}
                    destination='google'
                    alt="Google Logo"
                    background="bg-zinc-200"
                />
            </div>
            : 
            <div className='text-white'>
                <h1 className=''>You are already logged in</h1>
            </div>
            }
            <div>
                <Footer />
            </div>
        </div>
    )
}

Login.propTypes = {
    user : PropTypes.string,
    profilePicture : PropTypes.string,
    profileUrl : PropTypes.string,
}

export default Login