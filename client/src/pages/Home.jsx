import NavigationBar from '../components/Navigation'
import Footer from '../components/Footer'
import splash2 from '../assets/undraw_mello_otq1.svg'
import { Link } from 'react-router-dom'
import styles from '../External.module.css'

const Home = () => {
    const infoPath = '/info'

    return (
        <div className="flex flex-col min-h-screen bg-spotifyBlack nunito-sans-regular">
            <div>
                <NavigationBar />
            </div>
            <div className='flex-1 flex justify-center items-center'>
                <div className='flex flex-col items-center justify-center h-[75vh] w-3/4 sm:w-2/3 mx-auto'>
                    <h1 className={`${styles.gradientText} text-transparent text-3xl rubik-mono-one-regular animate-gradient pb-6 md:text-4xl mt-6`}>Playlistify</h1>
                    <p className='text-white text-xl text-center nunito-sans-bold p-1 rounded-lg mb-5'>Convert your favorite playlists from
                        <span className={`${styles.gradientText} text-transparent animate-gradient font-bold`}> YouTube to Spotify!</span> 
                    </p>
                    <div className='w-3/4 h-3/5 '>
                        <img src={splash2} alt="Splash Art" className='object-fill h-full w-full'/>
                    </div>

                    <div className='flex flex-col w-3/4 sm:flex-row md:w-full justify-center'>
                        <Link to='/convert' className='mt-6 mx-4 py-2 px-8 text-zinc-300 text-lg font-bold text-center rounded-full border border-zinc-600 shadow-md shadow-zinc-700 bg-green-600 hover:bg-spotifyGreen transition-all duration-300 ease-in-out md:text-xl'>Get Started</Link>
                        <Link to={infoPath} className='mt-6 mx-4 py-2 px-8 text-zinc-200 text-lg font-bold text-center rounded-full border border-zinc-600 shadow-md shadow-zinc-700 bg-learnMore hover:bg-learnMoreHover transition-all duration-300 ease-in-out md:text-xl'>Learn More</Link>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );     
}

export default Home