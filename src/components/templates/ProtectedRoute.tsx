import { Navigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { InteractionStatus } from "@azure/msal-browser";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress, instance } = useMsal();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Wait for MSAL to finish initializing
      if (inProgress === InteractionStatus.None) {
        // Check if there are any accounts
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
          // Ensure account info is in localStorage for compatibility
          const account = accounts[0];
          const email = account.username || account.name || "";
          const userRole =
            email === "admin@empresa.com" ||
            email.toLowerCase().includes("admin")
              ? "admin"
              : "miembro";

          if (!localStorage.getItem("userEmail")) {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userRole", userRole);
            localStorage.setItem("msalAccount", JSON.stringify(account));
          }
        }
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [inProgress, instance]);

  // Show loading while checking authentication
  if (isChecking || inProgress !== InteractionStatus.None) {
    return null; // Or a loading spinner
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
