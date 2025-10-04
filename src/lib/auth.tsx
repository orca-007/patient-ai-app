import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>({
    uid: 'mock-user-123',
    email: 'demo@example.com',
    displayName: 'Demo User',
  });
  const [loading, setLoading] = useState(false);

  function signup(email: string, password: string) {
    return Promise.resolve({ user: currentUser });
  }

  function login(email: string, password: string) {
    return Promise.resolve({ user: currentUser });
  }

  function logout() {
    return Promise.resolve();
  }

  function resetPassword(email: string) {
    return Promise.resolve();
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  const value: AuthContextType = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
