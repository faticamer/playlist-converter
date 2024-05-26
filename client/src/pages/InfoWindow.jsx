import NavigationBar from "../components/Navigation"
import Footer from "../components/Footer"
import ConnectButton from "../components/ConnectButton"
import PropTypes from 'prop-types'

const InfoWindow = ({user}) => {
    return (
        <div className="flex flex-col bg-spotifyBg min-h-screen">
            <div>
                <NavigationBar user={user}/>
            </div>
            <div className="flex flex-col items-center justify-center h-[75vh] w-full nunito-sans-regular">
                <h1 className="text-white text-2xl pb-3">About Playlistify</h1>
                {user ? <div></div> : <ConnectButton user={user}/>}
                <p className="px-12 pt-6 md:w-3/4 w-full text-center text-zinc-300">Disclaimer: Spotify will ask for lots of permissions to your account. All permissions are related to features on Playlistify will not store your Spotify data. All of your Spotify related data is viewed by your eyes only. Read the Privacy Policy if you feel uneasy.</p>                
                <p className="px-12 pt-6 md:w-3/4 w-full text-center text-zinc-300">Playlistify views your Spotify user account data to check whether the app works correctly, and to automatically fill in the name of your account in the welcome message. Spotify will ask you for other data too, but this app only uses the name.</p>
                <p className="px-12 pt-6 md:w-3/4 w-full text-center text-zinc-300">Playlistify views your library, individual playlists (ones that you also made and generated), items in playlists</p>
                <p className="px-12 pt-6 md:w-3/4 w-full text-center text-zinc-300">Playlistify asks for permission to create and edit playlists in terms of naming</p>
                <p className="px-12 pt-5 md:w-3/4 w-full text-center text-zinc-300">Playlistify will work seamlessly after all permissions are granted.</p>
            </div>
            <div className="pt-6">
                <Footer />
            </div>
        </div>
    )
}

InfoWindow.propTypes = {
    user : PropTypes.string
}

export default InfoWindow