import { Link } from 'react-router-dom';
import SpotifyLogo from '../assets/Spotify_Logo_White.png'

const Footer = () => {
    const path = '/info'

    return (
        <div className='flex flex-col items-center justify-center h-32'>
            <p className='text-center text-sm font-light dark:text-white w-full'>Made with ❤️ by <a href='#' className='text-blue-500 dark:text-blue-400 hover:underline'>HAAA Group</a> ☕</p>
            <div className='flex items-center justify-center text-link gap-3 p-1 pb-3'>
                <Link to={path} className='text-blue-500 dark:text-color-400 text-sm hover:underline'>About Playlistify</Link>
                <Link className='text-blue-500 dark:text-color-400 text-sm hover:underline'>Privacy Policy</Link>
                <Link className='text-blue-500 dark:text-color-400 text-sm hover:underline'>Report Problem</Link>
            </div>
            <div>
                <img src={SpotifyLogo} alt="Spotify Logo" className='h-7 mx-auto mt-2'/>
            </div>
        </div>
    );
}

export default Footer