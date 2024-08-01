import LoginButton from './LoginButton'
import BasicMenu from './BasicMenu'
import logo from '../assets/favicon-32x32.png'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/useAuthContext'

const NavigationBar = () => {
    const { user } = useAuthContext()

    return (        
        <nav className='relative mx-auto p-3 text-white bg-spotifyDarkGrey'>
            <div className='flex items-center justify-between'>
                <div className='flex'>
                    <img src={logo} alt="logo" className='pl-2'/>
                    {user && (
                        <div className='flex flex-row'>
                            <a href="/" className='text-3xl font-bold nunito-sans-bold ml-6'>Playlistify <span className='pl-2 text-md font-normal text-stone-500'> | </span><span className='pl-2 text-2xl font-normal'>Welcome, <span className='text-spotifyGreen'>{user.username}!</span></span></a>
                        </div>
                    )}
                    {!user && (
                        <a href="/" className='text-3xl font-bold nunito-sans-bold ml-6'>Playlistify <span className='pl-2 text-md font-normal text-stone-500'> | </span><span className='pl-2 text-2xl font-normal'>Welcome, Guest!</span></a>
                    )}
                </div>
                <div className='flex flex-row justify-between items-center gap-5 nunito-sans-regular'>

                    {user && (
                        <Link to={user.profileUrl} target={`_blank`}>
                            <img src={user.profilePicture} alt="User Profile Picture" className='rounded-full mx-4 border-2 border-zinc-600'/>
                        </Link> 
                    )}
                    <LoginButton/>
                    {user && (
                        <BasicMenu>Options</BasicMenu>
                    )}
                    {!user && (
                        <></>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavigationBar