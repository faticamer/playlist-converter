import NavigationBar from '../components/Navigation'
import Footer from '../components/Footer'
import ConnectButton from '../components/ConnectButton'
import Spotify from '../assets/spotify.svg'
import Google from '../assets/google.png'
import { useAuthContext } from '../context/useAuthContext'

const Login = () => {
    const { user } = useAuthContext()

    return (
        <div className='flex flex-col min-h-screen bg-spotifyBlack'>
            <div>
                <NavigationBar />
            </div>

            {!user && (
            <div className='flex-1 flex justify-center items-center'>
                <ConnectButton
                    title="Spotify"
                    source={Spotify}
                    destination='spotify'
                    alt="Spotify Logo"
                    background="bg-spotifyGreen"
                />
                <ConnectButton 
                    title="Google" 
                    source={Google}
                    destination='google'
                    alt="Google Logo"
                    background="bg-zinc-200"
                />
            </div>
            )}
            {user && (
                <div className='text-white'>
                    <h1 className=''>You are already logged in</h1>
                </div>
            )}
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Login