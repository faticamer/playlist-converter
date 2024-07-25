import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthContextProvider>
            <App /> 
        </AuthContextProvider>
    </StrictMode>     
)
