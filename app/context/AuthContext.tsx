'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  name: string;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
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

  const login = async (username: string, password: string): Promise<boolean> => {
    // Untuk demo, kita akan menerima kombinasi username/password apa pun
    // Dalam aplikasi sebenarnya, ini akan berkomunikasi dengan API
    try {
      // Simulasi panggilan API dengan timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set user untuk demo
      setUser({
        username,
        name: username.charAt(0).toUpperCase() + username.slice(1), // Kapitalisasi nama
        isLoggedIn: true
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 