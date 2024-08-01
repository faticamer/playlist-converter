import axios from 'axios';
import React, { useState, useEffect } from 'react'

export const GoogleAuthContext = React.createContext({
    user: null,
    setUser: () => {},
});

// eslint-disable-next-line react/prop-types
export const GoogleAuthProvider = ({ children }) => {
    const [userGoogle, setUserGoogle] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5555/auth/spotify/login/success', {
                    withCredentials: true,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                setUserGoogle(response.data)
            } catch (error) {
                console.error('Error fetching user data: ', error)
            }
        };

        fetchUserData();
    }, []);

    return (
        <GoogleAuthContext.Provider value={{ userGoogle, setUserGoogle }} >
            {children}
        </GoogleAuthContext.Provider>
    )
}