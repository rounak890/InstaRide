
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define user type
type User = {
  id: string;
  name: string;
  email: string;
  userType: "rider" | "driver";
};

// Define auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll simulate a successful login
    if (email && password) {
      setUser({
        id: "user-123",
        name: email.split("@")[0],
        email,
        userType: "rider"
      });
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to register the user
    // For demo purposes, we'll simulate a successful signup
    if (name && email && password) {
      setUser({
        id: "user-" + Math.floor(Math.random() * 1000),
        name,
        email,
        userType: "rider"
      });
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
