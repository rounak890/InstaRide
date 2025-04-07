import { useAuth } from "@/context/AuthContext";

export const AuthDebug = () => {
  const { user, isAuthenticated } = useAuth();

  console.log("Auth Debug:", {
    isAuthenticated,
    user,
    token: localStorage.getItem("token"),
    timestamp: new Date().toISOString(),
  });

  return null; // This component doesn't render anything
};