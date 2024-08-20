import { useContext } from 'react'
import { SpotifyAuthContext } from './SpotifyAuthContext'

export const useSpotifyAuthContext = () => {
    const context = useContext(SpotifyAuthContext)

    if(!context) {
        throw new Error('useSpotifyAuthContext must be used within SpotifyAuthContextProvider')
    }

    return context
}