import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { SpotifyAuthProvider } from './context/SpotifyAuthContext'
import Home from './pages/Home'
import InfoWindow from './pages/InfoWindow'
import Convert from './pages/Convert'
import ConvertClone from './pages/ConvertClone'

const App = () => {

  return (
    <BrowserRouter>
      <div>
        <SpotifyAuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/info' element={<InfoWindow />} />
            <Route path='/convert' element={<Convert />} />
            <Route path='/convert-clone' element={<ConvertClone />} />
          </Routes>
        </SpotifyAuthProvider>
      </div>
    </BrowserRouter>      
  )
};

export default App