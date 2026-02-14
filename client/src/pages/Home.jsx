import NavigationBar from '../components/Navigation'
import Footer from '../components/Footer'
import splash2 from '../assets/undraw_mello_otq1.svg'
import {Link} from 'react-router-dom'
import styles from '../External.module.css'

const Home = () => {
  const infoPath = '/info'
  const selectPlatformPath = '/select-platform'

  return (
    <div className="flex flex-col min-h-screen bg-spotifyBlack">
      <div>
        <NavigationBar />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center h-[75vh] w-3/4 sm:w-2/3 mx-auto">
          <h1
            className={`${styles.gradientText} text-transparent text-5xl font-bold animate-gradient pb-6`}
          >
            Playlistify
          </h1>
          <p className="text-textLight text-2xl text-center mb-5">
            Convert your favorite playlists across streaming services!
          </p>
          <div className="w-3/4 h-3/5 ">
            <img
              src={splash2}
              alt="Splash Art"
              className="object-fill h-full w-full"
            />
          </div>

          <div className="flex flex-row w-1/4 items-center justify-evenly">
            <Link
              to={selectPlatformPath}
              className="mt-10 p-4 text-white text-xl font-bold text-center rounded-full bg-green-600 hover:bg-spotifyGreen transition-all duration-300 ease-in-out"
            >
              Get Started!
            </Link>
            <Link
              to={infoPath}
              className="mt-10 p-4 text-textLight text-xl font-bold text-center rounded-full bg-darkBorder hover:bg-blue-700 transition-all duration-300 ease-in-out"
            >
              Learn More!
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home

