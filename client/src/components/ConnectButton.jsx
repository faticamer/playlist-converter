import spotify from '../assets/spotify.svg'

const openLoginPage = () => {
    window.open('http://localhost:5555/auth/spotify', '_self')
}

const ConnectButton = () => {
    return (
    <div onClick={openLoginPage} className='flex flex-row justify-between items-center gap-3 nunito-sans-regular outline outline-1 rounded-full p-2 text-black bg-spotifyGreen cursor-pointer'>
        <img src={spotify} alt="Spotify Logo" className='w-8 h-8'/>
        <p>Connect with Spotify</p>
    </div>
    )
}

export default ConnectButton