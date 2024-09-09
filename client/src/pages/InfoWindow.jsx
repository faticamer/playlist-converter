import NavigationBar from "../components/Navigation"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

const InfoWindow = () => {
    return (
        
        <div className="flex flex-col bg-spotifyBlack min-h-screen overflow-y-auto">
            <div>
                <NavigationBar />
            </div>
            <div className="flex flex-col items-center justify-center mt-6">
                <div className="flex flex-col items-center justify-center w-3/4 nunito-sans-regular">
                    <h1 className="text-white text-2xl pb-3">About Playlistify</h1>
                    <p className="px-12 pt-6 md:w-3/4 w-full text-center text-zinc-300">
                        Disclaimer (Spotify): Spotify will ask for lots of permissions to your account. 
                        All permissions are related to features on Playlistify will not store your
                        Spotify data. All of your Spotify related data is viewed by your eyes only. 
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
                        your Spotify library.
                    </p>
                    <p className="px-12 pt-5 md:w-3/4 w-full text-center text-zinc-300">
                        Playlistify will work seamlessly after all permissions are granted
                        and will not ask you for permissions more than once. Additionally,
                        Playlistify will not ask you for permissions that are not required
                        for the application to work.
                    </p>
                    <p className="px-12 pt-5 md:w-3/4 w-full text-center text-zinc-300">
                        Playlistify is not able to read the content of a private YouTube playlist.
                        There is a limited set of YouTube API calls that can be utilized without
                        authentication. Due to this, you should not provide the URL to private
                        YouTube playlist, as the conversion will not work.
                    </p>
                    <p className="px-12 pt-5 md:w-3/4 w-full text-center text-zinc-300">
                        It is advisable to avoid playlists within which there are videos that might
                        not be in Spotify. Playlistify will still be able to pass the video title to 
                        {/*eslint-disable-next-line react/no-unescaped-entities */}
                        the Spotify's search functionality, but Spotify will not be able to find the
                        video. More specifically, any non-musical videos, remixes, mixes, etc. should
                        be avoided, as Spotify does not store those in its database.
                    </p>
                    <p className="px-12 pt-5 md:w-3/4 w-full text-center text-zinc-300">
                        Playlistify asserts that the user will provide the valid URL of a YouTube playlist.
                        In this case, Playlistify should successfully convert all the songs in the playlist,
                        without any errors. If any error occurs, you will be able to inspect it in the 
                        {/*eslint-disable-next-line react/no-unescaped-entities */}
                        Browser's Developer Tools.
                    </p>
                    <p className="px-12 pt-5 md:w-3/4 w-full text-center text-zinc-300">
                        Playlistify is a hobby project that is not designed for heavy use, 
                        and with that in mind, some of the more advanced functionalities like
                        token rotation, load balancers, etc. are not implemented.
                    </p>
                    <div className="mt-8 mb-12">
                        <Link to="/" className="cursor-pointer bg-zinc-200 p-2 rounded-full nunito-sans-bold">Back to Home Page</Link>
                    </div>
                </div>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}

export default InfoWindow