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

        setUser(response.data); 
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