import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a mock user for bypassing authentication
const mockUser = {
  uid: 'mock-user-123',
  email: 'demo@example.com',
  displayName: 'Demo User',
};

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(mockUser); // Always logged in with mock user
  const [loading, setLoading] = useState(false); // No loading state needed

  // Mock authentication functions
  function signup(email, password) {
    return Promise.resolve({ user: mockUser });
  }

  function login(email, password) {
    return Promise.resolve({ user: mockUser });
  }

  function logout() {
    // In the bypass version, logout doesn't actually log out
    return Promise.resolve();
  }

  function resetPassword(email) {
    return Promise.resolve();
  }

  // No auth state listener needed in bypass version
  useEffect(() => {
    setLoading(false);
  }, []);

  const value = {
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
