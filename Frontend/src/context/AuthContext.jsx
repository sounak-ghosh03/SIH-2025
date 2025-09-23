import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock authentication - replace with real API call
      if (email && password) {
        const mockUser = {
          id: 1,
          email: email,
          name: email.split('@')[0],
          role: 'user',
          permissions: ['read', 'write']
        };

        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { success: true, message: t('auth.loginSuccess') };
      } else {
        return { success: false, message: t('auth.loginError') };
      }
    } catch (error) {
      return { success: false, message: t('auth.loginError') };
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration - replace with real API call
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        role: 'user',
        permissions: ['read', 'write']
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true, message: t('auth.registerSuccess') };
    } catch (error) {
      return { success: false, message: t('auth.registerError') };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    hasPermission,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
