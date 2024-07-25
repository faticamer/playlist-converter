import PropTypes from 'prop-types'
import LoginButton from './LoginButton'
import BasicMenu from './BasicMenu'
import logo from '../assets/favicon-32x32.png'
import { Link } from 'react-router-dom'

const NavigationBar = (props) => {

    return (        
        <nav className='relative mx-auto p-3 text-white bg-spotifyDarkGrey'>
            <div className='flex items-center justify-between'>
                <div className='flex'>
                    <img src={logo} alt="logo" className='pl-2'/>
                    {props.user ?
                        <div className='flex flex-row'>
                            <a href="/" className='text-3xl font-bold nunito-sans-bold ml-6'>Playlistify <span className='pl-2 text-md font-normal text-stone-500'> | </span><span className='pl-2 text-2xl font-normal'>Welcome, <span className='text-spotifyGreen'>{props.user}!</span></span></a>
                        </div>
                        :
                        <a href="/" className='text-3xl font-bold nunito-sans-bold ml-6'>Playlistify <span className='pl-2 text-md font-normal text-stone-500'> | </span><span className='pl-2 text-2xl font-normal'>Welcome, Guest!</span></a>
                    }
                </div>
                <div className='flex flex-row justify-between items-center gap-5 nunito-sans-regular'>
                    {props.profilePicture ?
                        <Link to={props.profileUrl} target={`_blank`}>
                            <img src={props.profilePicture} alt="User Profile Picture" className='rounded-full mx-4 border-2 border-zinc-600'/>
                        </Link> 
                    :
                        <div></div>
                    }
                    <LoginButton/>
                    {props.user ? <BasicMenu>Options</BasicMenu> : <div></div>}
                </div>
            </div>
        </nav>
    )
}

NavigationBar.propTypes = {
    user: PropTypes.string,
    profilePicture: PropTypes.string,
    profileUrl: PropTypes.string
};

export default NavigationBar