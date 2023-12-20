// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const clearLoginStatus = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
    } catch (error) {
      console.error('Error clearing login status:', error);
    }
  };

  const isUserLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      return value === 'true';
    } catch (error) {
      console.error('Error retrieving login status:', error);
      return false;
    }
  };

  const contextValue = {
    isLoggedIn,
    login,
    logout,
    clearLoginStatus,
    isUserLoggedIn,
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(value === 'true');
      } catch (error) {
        console.error('Error retrieving login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
