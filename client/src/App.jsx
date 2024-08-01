import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { GoogleAuthProvider } from './context/GoogleAuthContext'
import Home from './pages/Home'
import InfoWindow from './pages/InfoWindow'
import Convert from './pages/Convert'
import ConvertReverse from './pages/ConvertReverse'
import PlatformPage from './pages/PlatformPage'
import Login from './pages/Login'

const App = () => {

return (
  <BrowserRouter>
    <div> 
      <AuthProvider>
        <GoogleAuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/info' element={<InfoWindow/>} />
            <Route path='/convert' element={<Convert />} />
            <Route path='/convert-youtube' element={<ConvertReverse />} />
            <Route path='/select-platform' element={<PlatformPage />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </GoogleAuthProvider>
     </AuthProvider>
    </div>  
  </BrowserRouter>      
)};

export default App