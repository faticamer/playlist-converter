import { useContext } from "react";
import { GoogleAuthContext } from "./GoogleAuthContext";

export const useGoogleAuthContext = () => {
    const context = useContext(GoogleAuthContext)

    if(!context) {
        throw new Error('useGoogleAuthContext must be used within GoogleAuthContextProvider')
    }

    return context
}