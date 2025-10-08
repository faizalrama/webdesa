import React, { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { authApi, AuthResponse  } from '@/lib/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    console.log('🔍 AuthProvider useEffect - Checking auth status', { 
      hasToken: !!token, 
      hasUserData: !!userData 
    });

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
  try {
    const response = await authApi.login(username, password);
    const { access_token, user: userData } = response.data;

    // Mapping agar sesuai tipe User
    const userParsed: User = {
      id: Number(userData.id),        // pastikan number
      username: userData.username,
      email: userData.email,
      role: userData.role || 'admin', // default 'admin' kalau tidak ada dari backend
      created_at: userData.created_at
    };

    // Simpan di localStorage
    localStorage.setItem('auth_token', access_token);
    localStorage.setItem('user_data', JSON.stringify(userParsed));

    // Set user state
    setUser(userParsed);

  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
  

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    authApi.logout().catch(() => {}); // Silent fail for logout API call
  };
const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };
  console.log('🔄 AuthProvider rendering', { 
    user: user?.username, 
    isAuthenticated: !!user,
    isLoading 
  });

  return React.createElement(AuthContext.Provider, { value }, children);
};