import { Link } from 'react-router-dom';
import SpotifyLogo from '../assets/Spotify_Logo_White.png'

const Footer = () => {
    const path = '/info'

    return (
        <div className='flex items-center justify-center h-32 space-x-4'>
  <p className='text-center text-sm font-light dark:text-white'>
    Made with ❤️ by <a href='#' className='text-blue-500 dark:text-blue-400 hover:underline'>HAAA Group</a> ☕
  </p>
  <Link to={path} className='text-blue-500 dark:text-color-400 text-sm hover:underline mx-1'>About Playlistify</Link>
  <Link className='text-blue-500 dark:text-color-400 text-sm hover:underline mx-1'>Privacy Policy</Link>
  <Link className='text-blue-500 dark:text-color-400 text-sm hover:underline mx-1'>Report Problem</Link>
  <div>
    <img src={SpotifyLogo} alt="Spotify Logo" className='h-7 mx-2'/>
  </div>
</div>
    );
}

export default Footer