import PropTypes from 'prop-types'

const ConnectButton = (props) => {
    const logout = (destination) => {
        switch (destination) {
            case 'spotify':
                window.open('/auth/spotify/logout', '_self');
                break;
            case 'google':
                window.open('/auth/google/logout', '_self');
                break;
            default:
                console.log('Error');
                break;
        }
    }

    const openLoginPage = (destination) => {
        switch (destination) {
            case 'spotify':
                window.open('/auth/spotify', '_self');
                break;
            case 'google':
                window.open('/auth/google', '_self');
                break;
            default:
                console.log('Error');
                break;
        }
    }

    return (
        <div>
            { props.user ?
            (
                <div className='flex flex-row justify-between items-center gap-3'>
                    <div onClick={() => logout(props.destination)} className='flex flex-row justify-between items-center gap-3 nunito-sans-regular outline outline-2 outline-red-500 rounded-full text-white cursor-pointer hover:bg-red-500  hover:transition-all duration-400 ease-in-out'>
                        <p className='px-5 py-2 text-justify font-bold'>Log Out</p>
                    </div>
                </div>
            )
            :
            (
                <div onClick={() => openLoginPage(props.destination)} className={`flex flex-row justify-between items-center gap-3 nunito-sans-regular outline outline-1 rounded-full p-1 text-black cursor-pointer ${props.background}`}>
                    <img src={props.source} alt={props.alt} className='w-8 h-8'/>
                    <p>Sign in with {props.title}</p>
                </div>
            )}
        </div>        
    )
}

ConnectButton.propTypes = {
    user : PropTypes.string,
    userG : PropTypes.string,
    title : PropTypes.string,
    source : PropTypes.string,
    destination : PropTypes.string,
    alt : PropTypes.string,
    background : PropTypes.string
}

export default ConnectButton