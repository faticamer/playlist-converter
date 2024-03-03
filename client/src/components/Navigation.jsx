import github from '../assets/github-mark-white.svg'
import PropTypes from 'prop-types'
import ConnectButton from './ConnectButton'
import GreetMessage from './GreetMessage'

const NavigationBar = ({user}) => {
    return (        
        <nav className='relative mx-auto p-4 text-white bg-spotifyDarkGrey'>
            <div className='flex items-center justify-between'>
                <div className='pt-2'>
                    <a href="/" className='text-2xl font-bold nunito-sans-bold'>Playlistify</a>
                </div>
                <div className='flex flex-row justify-between items-center gap-5 nunito-sans-regular'>
                    <div>
                        <button className='flex flex-row justify-center items-center rounded-full outline outline-1 hover:outline-2 p-2'><img src={github} alt="GitHub Logo" className='w-8 h-8 mr-3'/>Source Code</button>
                    </div>
                    { user ? (
                        <GreetMessage user={user}/>
                    ) : 
                    (
                        <ConnectButton />
                    )}
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