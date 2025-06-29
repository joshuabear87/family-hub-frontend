import React, { createContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  login: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  logout: () => {},
  login: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/'; // force reload to home
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
