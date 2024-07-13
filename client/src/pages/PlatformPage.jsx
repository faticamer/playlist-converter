import PropTypes from 'prop-types'
import Footer from '../components/Footer';
import NavigationBar from '../components/Navigation'
import Card from '../components/Card'
import Spotify from '../assets/Spotify_Primary_Logo_RGB_Green.png'
import YouTube from '../assets/youtube_social_circle_red.png'
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
                    link={Spotify}
                    alt='Spotify Logo'
                    source='Spotify'
                    destination='YouTube'
                    border='border-2 border-green-600'
                    hover='hover:bg-green-500 transition-all duration-300 ease-in-out'
                    gradient={styles.gradientText}
                />
                <Card 
                    path='/convert-youtube'
                    link={YouTube}
                    alt='Spotify Logo'
                    source='YouTube'
                    destination='Spotify'
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