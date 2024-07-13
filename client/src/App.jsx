import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios'
import InfoWindow from './pages/InfoWindow'
import Convert from './pages/Convert'
import ConvertReverse from './pages/ConvertReverse'
import Report from './pages/Report'
import PlatformPage from './pages/PlatformPage'

const App = () => {
  const [user, setUser] = useState ('')

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

return (
  <BrowserRouter>
    <div>
        <Routes>
            <Route path='/' element={<Home user={user}/>} />
            <Route path='/info' element={<InfoWindow user={user}/>} />
            <Route path='/convert' element={<Convert user={user} />} />
            <Route path='/convert-youtube' element={<ConvertReverse user={user} />} />
            <Route path='/report-bug' element={<Report user={user} />} />
            <Route path='/select-platform' element={<PlatformPage user={user} />} />
        </Routes>
    </div>  
  </BrowserRouter>      
)};

export default App