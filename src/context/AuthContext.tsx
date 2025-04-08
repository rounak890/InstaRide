import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from '@/config.js';


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
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = !!token;

  // Fetch user info when token changes
  useEffect(() => {
    const fetchUser = async () => {
      console.log("Token being sent to /users/me:", token); // Log the token

      if (token) {
        try {
          const response = await fetch(`${config.backendUrl}/users/me?token=${token}`); 
          // const response = await fetch(`${ config.backendUrl}/users/me`, {
          //   headers: {
          //     token: `${token}`,
          //   },
          // });
          if (response.ok) {
            const userData = await response.json();
            console.log("User data fetched successfully:", userData); // Log user data for debugging
            setUser(userData);
          } else {
            console.error("Failed to fetch user info:-(inside) ", await response.json());
            logout(); // If token is invalid, log out
          }
        } catch (error) {
          console.error("Failed to fetch user info(outside): ", error);
          logout();
        }
      }
    };

    fetchUser();
  }, [token]);

  // Login function
  const login = async (email: string, password: string) => {
    // console.log("meow meow"+process.env.BACKEND_URL);
    console.log("here in authcontext im in login : - " + config.backendUrl);
    try {
      const response = await fetch(`${config.backendUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();
      console.log("Login successful, token:", data.access_token); // Log the token for debugging

      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      navigate("/explore"); // Redirect to home after login
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${config.backendUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, user_type: "rider" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Signup failed");
      }

      navigate("/login"); // Redirect to login after successful signup
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
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