import NavigationBar from '../components/Navigation'
import Footer from '../components/Footer'
import splash from '../assets/Commute-read_green.png'
import {Link} from 'react-router-dom'
import styles from '../External.module.css'

const Home = () => {
  const infoPath = '/info'
  const selectPlatformPath = '/select-platform'

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-neutral-800 to-neutral-950 poppins-bold">
      <div>
        <NavigationBar />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center h-[75vh] w-3/4 sm:w-2/3 mx-auto">
          <h1
            className={`${styles.gradientText} text-transparent text-5xl animate-gradient pb-6`}
          >
            Playlistify
          </h1>
          <h2 className="text-3xl text-neutral-300 poppins-black mb-8">
            Your lightweight conversion tool
          </h2>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 max-w-4xl mx-auto px-4 py-2 sm:px-0">
            <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all duration-300 border border-neutral-700 w-fit bg-gray-700/50 hover:bg-gray-600/50 dark:shadow-none">
              <div className="p-2 bg-sky-900 rounded-lg transition-colors duration-300 dark:bg-green-600">
                <svg
                  className="size-8"
                  viewBox="0 0 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <title>spotify [#162]</title>{' '}
                    <desc>Created with Sketch.</desc> <defs> </defs>{' '}
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      {' '}
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-140.000000, -7479.000000)"
                        fill="#000000"
                      >
                        {' '}
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          {' '}
                          <path
                            d="M99.915,7327.865 C96.692,7325.951 91.375,7325.775 88.297,7326.709 C87.803,7326.858 87.281,7326.58 87.131,7326.085 C86.981,7325.591 87.26,7325.069 87.754,7324.919 C91.287,7323.846 97.159,7324.053 100.87,7326.256 C101.314,7326.52 101.46,7327.094 101.196,7327.538 C100.934,7327.982 100.358,7328.129 99.915,7327.865 L99.915,7327.865 Z M99.81,7330.7 C99.584,7331.067 99.104,7331.182 98.737,7330.957 C96.05,7329.305 91.952,7328.827 88.773,7329.792 C88.36,7329.916 87.925,7329.684 87.8,7329.272 C87.676,7328.86 87.908,7328.425 88.32,7328.3 C91.951,7327.198 96.466,7327.732 99.553,7329.629 C99.92,7329.854 100.035,7330.334 99.81,7330.7 L99.81,7330.7 Z M98.586,7333.423 C98.406,7333.717 98.023,7333.81 97.729,7333.63 C95.381,7332.195 92.425,7331.871 88.944,7332.666 C88.609,7332.743 88.274,7332.533 88.198,7332.197 C88.121,7331.862 88.33,7331.528 88.667,7331.451 C92.476,7330.58 95.743,7330.955 98.379,7332.566 C98.673,7332.746 98.766,7333.129 98.586,7333.423 L98.586,7333.423 Z M94,7319 C88.477,7319 84,7323.477 84,7329 C84,7334.523 88.477,7339 94,7339 C99.523,7339 104,7334.523 104,7329 C104,7323.478 99.523,7319.001 94,7319.001 L94,7319 Z"
                            id="spotify-[#162]"
                          >
                            {' '}
                          </path>{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>
                </svg>
              </div>
              <div className="flex flex-col w-fit text-left">
                <h3 className="text-white">Spotify</h3>
                <p className="text-xs text-gray-100 transition-colors duration-300 dark:text-gray-300 md:text-base">
                  Convert to Spotify
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-neutral-700 w-fit bg-gray-700/50 border-black/10 hover:bg-gray-600/50 dark:shadow-none">
              <div className="p-2 bg-sky-900 rounded-lg transition-colors duration-300 dark:bg-red-600">
                <svg
                  className="size-8"
                  viewBox="0 -3 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <title>youtube [#168]</title>{' '}
                    <desc>Created with Sketch.</desc> <defs> </defs>{' '}
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      {' '}
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-300.000000, -7442.000000)"
                        fill="#000000"
                      >
                        {' '}
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          {' '}
                          <path
                            d="M251.988432,7291.58588 L251.988432,7285.97425 C253.980638,7286.91168 255.523602,7287.8172 257.348463,7288.79353 C255.843351,7289.62824 253.980638,7290.56468 251.988432,7291.58588 M263.090998,7283.18289 C262.747343,7282.73013 262.161634,7282.37809 261.538073,7282.26141 C259.705243,7281.91336 248.270974,7281.91237 246.439141,7282.26141 C245.939097,7282.35515 245.493839,7282.58153 245.111335,7282.93357 C243.49964,7284.42947 244.004664,7292.45151 244.393145,7293.75096 C244.556505,7294.31342 244.767679,7294.71931 245.033639,7294.98558 C245.376298,7295.33761 245.845463,7295.57995 246.384355,7295.68865 C247.893451,7296.0008 255.668037,7296.17532 261.506198,7295.73552 C262.044094,7295.64178 262.520231,7295.39147 262.895762,7295.02447 C264.385932,7293.53455 264.28433,7285.06174 263.090998,7283.18289"
                            id="youtube-[#168]"
                          >
                            {' '}
                          </path>{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>
                </svg>
              </div>
              <div className="flex flex-col w-fit text-left">
                <h3 className="text-white">YouTube</h3>
                <p className="text-xs text-gray-100 transition-colors duration-300 dark:text-gray-300 md:text-base">
                  Convert to YouTube
                </p>
              </div>
            </div>
          </div>

          <p className="text-neutral-400 text-xl text-center mb-6">
            Convert your favorite playlists across{' '}
            <span className="text-green-600 underline">digital</span> streaming
            services!
          </p>

          <div className="w-3/4 h-3/5">
            <img
              src={splash}
              alt="Splash Art"
              className="flex-shrink-0 object-scale-down h-full w-full"
            />
          </div>

          <div className="flex flex-row w-1/4 items-center justify-evenly">
            <Link
              to={selectPlatformPath}
              className="mt-10 p-4 text-white text-xl font-bold text-center rounded-xl bg-green-600 hover:bg-spotifyGreen transition-all duration-300 ease-in-out"
            >
              Get Started!
            </Link>
            <Link
              to={infoPath}
              className="mt-10 p-4 text-neutral-300 text-xl font-bold text-center rounded-xl bg-neutral-700 transition-all duration-300 ease-in-out"
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
