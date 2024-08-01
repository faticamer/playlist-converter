import React, { useState, useEffect } from 'react'
import axios from 'axios';

export const AuthContext = React.createContext({
  user: null,
  setUser: () => {},
});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
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
        console.log(response.data)
        setUser(response.data); 
      } catch (error) {
          console.error('Error: ', error)
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};