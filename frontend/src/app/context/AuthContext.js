import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(null)

  const login = (token, username, isAdmin) => {
    setToken(token);
    setUsername(username);
    setIsAdmin(isAdmin);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('isAdmin', isAdmin);
  };

  const logout = () => {
    setToken(null);
    setUsername('');
    setIsAdmin(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');

  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedIsAdmin = localStorage.getItem('isAdmin');

    if (storedToken != undefined) {
      setToken(storedToken);
    }
    if (storedUsername != undefined) {
      setUsername(storedUsername);
    }
    if (storedIsAdmin != undefined) {
      setIsAdmin(storedIsAdmin);
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ token, username, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
