import NavigationBar from "../components/Navigation"
import Footer from "../components/Footer"
import ConnectButton from "../components/ConnectButton"
import PropTypes from 'prop-types'

const InfoWindow = ({user}) => {
    return (
        <div className="flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black min-h-screen">
            <div>
                <NavigationBar user={user}/>
            </div>
            <div className="flex flex-col items-center justify-center h-[75vh] w-full nunito-sans-regular">
                <h1 className="text-white text-2xl pb-3">About Playlistify</h1>
                {user ? <div></div> : <ConnectButton user={user}/>}
                <p className="px-12 pt-6 md:w-3/4 w-full text-center text-zinc-300">
                    Disclaimer (Spotify): Spotify will ask for lots of permissions to your account. 
                    All permissions are related to features on Playlistify will not store your
                    Spotify data. All of your Spotify related data is viewed by your eyes only. 
                    Read the Privacy Policy if you feel uneasy.
                </p>
                <p className="px-12 pt-6 md:w-3/4 w-full text-center text-zinc-300">
                    Disclaimer (YouTube): To use services related to YouTube, 
                    Playlistify will perform authentication via Google. 
                    All permissions granted by Google are strictly related to YouTube.
                    Your profile details are not necessary for Playlistify to work.
                    Any YouTube data that is displayed within Playlistify application will
                    only be related to your YouTube library and the current login session.
                </p>
                <p className="px-12 pt-6 md:w-3/4 w-full text-center text-zinc-300">
                    Playlistify views your Spotify user account data to check whether 
                    the app works correctly, and to automatically fill in the name of
                    your account in the welcome message on the Home page.</p>
                <p className="px-12 pt-6 md:w-3/4 w-full text-center text-zinc-300">
                    Playlistify views your library, individual playlists (including ones
                    that you have generated in Playlistify) and items in playlists.</p>
                <p className="px-12 pt-6 md:w-3/4 w-full text-center text-zinc-300">
                    Playlistify asks for permission to create and edit playlists.
                    Playlistify is allowed to read any newly generated playlist from
                    your Spotify or YouTube library.
                </p>
                <p className="px-12 pt-5 md:w-3/4 w-full text-center text-zinc-300">
                    Playlistify will work seamlessly after all permissions are granted
                    and will not ask you for permissions more than once. Additionally,
                    Playlistify will not ask you for permissions that are not required
                    for the application to work. This applies to both Spotify and YouTube.
                </p>
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