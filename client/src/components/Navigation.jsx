import github from '../assets/github-mark-white.svg'
import PropTypes from 'prop-types'
import ConnectButton from './ConnectButton'
import BasicMenu from './BasicMenu'
import logo from '../../public/favicon-32x32.png'

const NavigationBar = ({user}) => {

    const openSourceCode = () => {
        window.open('https://github.com/faticamer/playlist-converter/tree/main')
    }
    return (        
        <nav className='relative mx-auto p-3 text-white bg-spotifyDarkGrey'>
            <div className='flex items-center justify-between'>
                <div className='flex'>
                    <img src={logo} alt="logo" className='pl-2'/>
                    {user ? <a href="/" className='text-3xl font-bold nunito-sans-bold ml-6'>Playlistify <span className='pl-2 text-md font-normal text-stone-500'> | </span><span className='pl-2 text-2xl font-normal'>Welcome, <span className='text-spotifyGreen'>{user}!</span></span></a> : 
                    <a href="/" className='text-3xl font-bold nunito-sans-bold ml-6'>Playlistify <span className='pl-2 text-md font-normal text-stone-500'> | </span><span className='pl-2 text-2xl font-normal'>Welcome, Guest!</span></a>}
                </div>
                <div className='flex flex-row justify-between items-center gap-5 nunito-sans-regular'>
                    <div onClick={openSourceCode}>
                        <button className='flex flex-row justify-center items-center rounded-full outline outline-1 hover:outline-2 p-1'><img src={github} alt="GitHub Logo" className='w-8 h-8 mr-3'/>Source Code</button>
                    </div>
                    <ConnectButton user={user} />
                    {user ? <BasicMenu>Options</BasicMenu> : <div></div>}
                </div>
            </div>
        </nav>
    )
}

NavigationBar.propTypes = {
    user: PropTypes.string,
    profilePicture: PropTypes.string
};
  

export default NavigationBar