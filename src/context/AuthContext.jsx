import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure Demo User is seeded into storage
    authService.init();
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = (identifier, password) => {
    const res = authService.login(identifier, password);
    if (res.success) {
      setCurrentUser(res.user);
    }
    return res;
  };

  const register = (formData) => {
    const res = authService.register(formData);
    if (res.success) {
      setCurrentUser(res.user);
    }
    return res;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const updateProfile = (details) => {
    if (!currentUser) return { success: false, error: 'Not authenticated' };
    const res = authService.updateProfile(currentUser.id, details);
    if (res.success) {
      setCurrentUser(res.user);
    }
    return res;
  };

  const changePassword = (passwords) => {
    if (!currentUser) return { success: false, error: 'Not authenticated' };
    return authService.changePassword(currentUser.id, passwords);
  };

  const updateSettings = (settings) => {
    if (!currentUser) return;
    authService.updateSettings(currentUser.id, settings);
    setCurrentUser(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }));
  };

  const refreshUser = () => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    return user;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        loading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        updateSettings,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
