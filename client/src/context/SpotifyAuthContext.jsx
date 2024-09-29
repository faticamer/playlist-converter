import React, { useState, useEffect } from 'react'
import axios from 'axios';

export const SpotifyAuthContext = React.createContext({
  user: null,
  setUser: () => {},
});

// eslint-disable-next-line react/prop-types
export const SpotifyAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

        if(response) {
          setUser(response.data)
          // Store the exact time when user logged in.
          // We could've stored the time when user pressed the button to connect, but that does not necessarily
          // mean that the user would be successfully authenticated
          localStorage.setItem('loginEntryTimeframe', JSON.stringify(Date.now()))
        } else {
          setUser("")
        }
      } catch (error) {
          console.error('Error: ', error)
      }
    };

    fetchUserData();
  }, []);

  return (
    <SpotifyAuthContext.Provider value={{ user, setUser }}>
      {children}
    </SpotifyAuthContext.Provider>
  );
};