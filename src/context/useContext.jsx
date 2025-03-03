

import React, { createContext, useContext, useState } from "react";

// 1. Create User Context
export const AuthContext = createContext();

// 2. Create Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const signIn = (userData, accessToken, refreshToken) => {
    setUser(userData);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  // Function to log out a user
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken')
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};







