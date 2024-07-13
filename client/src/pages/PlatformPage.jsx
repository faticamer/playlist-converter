import PropTypes from 'prop-types'
import Footer from '../components/Footer';
import NavigationBar from '../components/Navigation'
import Card from '../components/Card'
import SpotifyNeon from '../assets/spotify-neon.png'
import YoutubeNeon from '../assets/youtubee-neon.png'
import styles from '../External.module.css'

const PlatformPage = ({user}) => {
    return (
        <div className="flex flex-col min-h-screen bg-spotifyBlack h-full">
            <div>
                <NavigationBar user={user}/>
            </div>
            <div className='flex m-auto'>
                <Card 
                    path='/convert'
                    link={SpotifyNeon}
                    alt='Spotify Logo'
                    destination='Spotify'
                    border='border-2 border-green-600'
                    hover='hover:bg-green-500 transition-all duration-300 ease-in-out'
                    gradient={styles.gradientText}
                />
                <Card 
                    path='/convert-youtube'
                    link={YoutubeNeon}
                    alt='Spotify Logo'
                    destination='YouTube'
                    border='border-2 border-red-600'
                    hover='hover:bg-red-500 transition-all duration-300 ease-in-out'
                    gradient={styles.youtubeToSpotifyGradient}
                />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

PlatformPage.propTypes = {
    user: PropTypes.string
}

export default PlatformPage;