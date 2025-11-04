import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithSocial: (provider: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          // TODO: Validate token and get user info
          // For now, just set loading to false
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoading(false);
      }
    };

    // Handle unauthorized events from API client
    const handleUnauthorized = () => {
      setUser(null);
      localStorage.removeItem('accessToken');
    };

    window.addEventListener('unauthorized', handleUnauthorized);
    checkAuth();

    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // TODO: Implement login logic with API
      console.log('Login with:', email, password);
      
      // Mock user for now
      const mockUser: User = {
        id: '1',
        email,
        name: 'Test User',
        role: 'member',
      };
      
      setUser(mockUser);
      localStorage.setItem('accessToken', 'mock-token');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const loginWithSocial = async (provider: string): Promise<void> => {
    try {
      // TODO: Implement Azure AD B2C social login
      console.log('Login with social provider:', provider);
      
      // This will be implemented with Azure AD B2C
      throw new Error('Social login not yet implemented');
    } catch (error) {
      console.error('Social login failed:', error);
      throw error;
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    loginWithSocial,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
