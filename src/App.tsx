import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import { useEffect, useState } from "react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "./auth/authConfig";
import IndexRouter from "./routes";
import Unauthorized from "./components/pages/Unauthorized";

const queryClient = new QueryClient();

function App() {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (inProgress === InteractionStatus.None) {
          const result = await instance.handleRedirectPromise();

          if (!result) {
            const accounts = instance.getAllAccounts();
            if (accounts.length === 0 && !isAuthenticated) {
              // Combine default scopes with any additional scopes
              const authRequest = {
                ...loginRequest,
                scopes: [...loginRequest.scopes],
              };

              console.log("Initiating login with scopes:", authRequest.scopes);
              await instance.loginRedirect(authRequest);
            }
          }
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [instance, inProgress, isAuthenticated]);

  return (
    <div className="App" style={{ width: "100%" }}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <AuthenticatedTemplate>
            <RouterProvider router={IndexRouter} />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Unauthorized />
          </UnauthenticatedTemplate>
        </SnackbarProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
