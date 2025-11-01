import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../config/api';
import * as secureStorage from '../utils/secureStorage';

interface User {
  id: string;
  email: string;
  username: string;
  profile_image?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await secureStorage.getItem('access_token');
      if (token) {
        const response = await api.get('/auth/me');
        setUser(response.data);
      }
    } catch (error) {
      console.log('Not authenticated');
      await secureStorage.deleteItem('access_token');
      await secureStorage.deleteItem('refresh_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // const response = await api.post('/auth/login', { email, password });
      const response = {
        data: {
          access_token: 'test',
          refresh_token: 'test',
        },
      };
      const { access_token, refresh_token } = response.data;

      await secureStorage.setItem('access_token', access_token);
      await secureStorage.setItem('refresh_token', refresh_token);

      // Get user info
      // const userResponse = await api.get('/auth/me');
      // setUser(userResponse.data);

      setUser({
        id: 'string',
        email: 'string',
        username: 'string',
        created_at: 'string',
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const response = await api.post('/auth/register', { email, password, username });
      const { access_token, refresh_token } = response.data;

      await secureStorage.setItem('access_token', access_token);
      await secureStorage.setItem('refresh_token', refresh_token);

      // Get user info
      const userResponse = await api.get('/auth/me');
      setUser(userResponse.data);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      await secureStorage.deleteItem('access_token');
      await secureStorage.deleteItem('refresh_token');
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.log('Failed to refresh user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
