import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react'

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    // Throw an error if AuthContext is used outside of its scope
    if(!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    // Destructure the user credentials using context object 
    // context carries Spotify + Google credentials
    return context
}