import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../../flags/services/flagService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await authService.getCurrentUser();
          setUser(response.data.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('authToken');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
