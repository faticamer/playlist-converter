import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios'
import InfoWindow from './pages/InfoWindow'
import Convert from './pages/Convert'
import ConvertReverse from './pages/ConvertReverse'
import PlatformPage from './pages/PlatformPage'
import Login from './pages/Login'

const App = () => {
  // Spotify User Details
  const [user, setUser] = useState ('')
  const [userProfilePicture, setUserProfilePicture] = useState('')
  const [userProfileUrl, setUserProfileUrl] = useState('')

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('/auth/spotify/login/success', {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          setUser(response.data.username)
          setUserProfilePicture(response.data.profilePicture)
          setUserProfileUrl(response.data.profileUrl)
        } else {
          throw new Error('Authentication has failed');
        }
      } catch (error) {
        console.log(error)
      }
    };
    getUser()
  }, [])

return (
  <BrowserRouter>
    <div>
        <Routes>
            <Route path='/' element={<Home 
              user={user} 
              profilePicture={userProfilePicture}
              profileUrl={userProfileUrl}/>} 
            />
            <Route path='/info' element={<InfoWindow
              user={user}
              profilePicture={userProfilePicture}
              profileUrl={userProfileUrl}/>} 
            />
            <Route path='/convert' element={<Convert 
              user={user} 
              profilePicture={userProfilePicture}
              profileUrl={userProfileUrl} />}
            />
            <Route path='/convert-youtube' element={<ConvertReverse 
              user={user}  
              profilePicture={userProfilePicture}
              profileUrl={userProfileUrl} />}
            />
            <Route path='/select-platform' element={<PlatformPage 
              user={user}  
              profilePicture={userProfilePicture}
              profileUrl={userProfileUrl} />}
            />
            <Route path='/login' element={<Login
              user={user}
              profilePicture={userProfilePicture}
              profileUrl={userProfileUrl} />}
            />
        </Routes>
    </div>  
  </BrowserRouter>      
)};

export default App