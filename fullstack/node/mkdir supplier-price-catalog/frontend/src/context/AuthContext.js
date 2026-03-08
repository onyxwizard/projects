import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../utils/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // Set default header (axios instance already handles, but for consistency)
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/auth/profile'); // We need to add this endpoint
      setUser(response.data);
    } catch (err) {
      console.error('Failed to fetch user');
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });
    const { token, supplier } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(supplier);
  };

  const register = async (name, email, password) => {
    const response = await axios.post('/auth/register', { name, email, password });
    const { token, supplier } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(supplier);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};