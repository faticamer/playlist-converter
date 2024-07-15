import PropTypes from 'prop-types'
import NavigationBar from '../components/Navigation'
import Footer from '../components/Footer'
import splash2 from '../assets/undraw_mello_otq1.svg'
import { Link } from 'react-router-dom'
import styles from '../External.module.css'

const Home = (props) => {
    const generalPath = props.user ? '/select-platform' : '/info'
    const infoPath = '/info'

    return (
        <div className="flex flex-col min-h-screen bg-spotifyBlack">
            <div>
            <NavigationBar user={props.user} profilePicture={props.profilePicture} profileUrl={props.profileUrl}/>
            </div>
            <div className='flex-1 flex justify-center items-center'>
                <div className='flex flex-col items-center justify-center h-[75vh] w-3/4 sm:w-2/3 mx-auto'>
                    <h1 className={`${styles.gradientText} text-transparent text-3xl font-bold animate-gradient pb-6`}>Playlistify</h1>
                    <p className='text-textLight text-xl text-center mb-5'>Convert your favorite playlists across streaming services!</p>
                    <div className='w-3/4 h-3/5 '>
                        <img src={splash2} alt="Splash Art" className='object-fill h-full w-full'/>
                    </div>

                    <div className='flex flex-row w-1/3 items-center justify-evenly'>
                        <Link to={generalPath} className='mt-6 p-4 text-white text-xl font-bold text-center rounded-full border-2 border-spotifyGreen bg-green-600 hover:bg-spotifyGreen transition-all duration-300 ease-in-out'>Get Started!</Link>
                        <Link to={infoPath} className='mt-6 p-4 text-textLight text-xl font-medium text-center rounded-full border-2 border-blue-800 hover:bg-blue-700 transition-all duration-300 ease-in-out'>Learn More!</Link>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );     
}

Home.propTypes = {
    user : PropTypes.string,
    profilePicture : PropTypes.string,
    profileUrl : PropTypes.string,
    
};

export default Home