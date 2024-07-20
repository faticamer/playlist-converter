import PropTypes from 'prop-types'

const ConnectButton = (props) => {
    const logout = () => {
        window.open('http://localhost:5555/auth/spotify/logout', '_self')
    }

    const openLoginPage = () => {
        window.open('http://localhost:5555/auth/spotify', '_self')
    }

    // The condition will have to be slightly modified
    // 1. Both buttons should be active when the user isn't authenticated at all
    // 2. Single Button should be active when the user is authenticated with the single service
    // 3. Log out button should be displayed when the user is authenticated with both services

    // When it comes to the InfoWindow page, only from there it will be possible to open the window where both options 
    // will be shown in one additional window, and from the Home page, there will be only two buttons that will work based
    // on the comments above

    return (
        <div>
            { props.userSpotify && props.userG ?
            (
                <div className='flex flex-row justify-between items-center gap-3'>
                    <div onClick={logout} className='flex flex-row justify-between items-center gap-3 nunito-sans-regular outline outline-2 outline-red-500 rounded-full text-white cursor-pointer hover:bg-red-500  hover:transition-all duration-400 ease-in-out'>
                        <p className='px-5 py-2 text-justify font-bold'>Log Out</p>
                    </div>
                </div>
            )
            :
            (
                <div onClick={openLoginPage} className={`flex flex-row justify-between items-center gap-3 nunito-sans-regular outline outline-1 rounded-full p-1 text-black cursor-pointer ${props.background}`}>
                    <img src={props.source} alt={props.alt} className='w-8 h-8'/>
                    <p>Connect with {props.title}</p>
                </div>
            )}
        </div>        
    )
}

ConnectButton.propTypes = {
    user : PropTypes.string,
    title : PropTypes.string,
    source : PropTypes.string,
    alt : PropTypes.string,
    background : PropTypes.string
}

export default ConnectButton