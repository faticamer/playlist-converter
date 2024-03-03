import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios'
import InfoWindow from './pages/InfoWindow'
import Convert from './pages/Convert'

const App = () => {
  const [user, setUser] = useState ('')
  const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:5555/auth/spotify/login/success', {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          setAccessToken(response.data.accessToken)
          setUserId(response.data.userId)
          setUser(response.data.username)
        } else {
          throw new Error('Authentication has failed');
        }
      } catch (error) {
        console.log(error)
      }
    };
    getUser()
  }, [])

  // TODO: We need to figure out why wrapping everything inside browser router causes issues
// Explanation for Navigate: If there is a user, there is no need to visit the login page, instead, redirect him to home
// Otherwise, send the user to login page

return (
  <BrowserRouter>
    <div>      
        <Routes>
            <Route path='/' element={<Home accessToken = {accessToken} userId={userId} user={user}/>} />
            <Route path='/info' element={<InfoWindow user={user}/>} />
            <Route path='/convert' element={<Convert user={user} />} />
        </Routes>
    </div>  
  </BrowserRouter>      
)};

export default App