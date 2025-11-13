import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { Business, Microsoft } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../../auth/authConfig";
import { InteractionStatus } from "@azure/msal-browser";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to home if already authenticated
  useEffect(() => {
    if (inProgress === InteractionStatus.None && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, inProgress, navigate]);

  // Show loading while checking authentication status
  if (inProgress !== InteractionStatus.None) {
    return (
      <Box
        sx={{
          minHeight: "100dvh",
          minWidth: "100dvw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0078D4 0%, #50A7E8 100%)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redirect if authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleMicrosoftLogin = async () => {
    try {
      setIsLoading(true);

      // Trigger MSAL login popup
      const response = await instance.loginPopup({
        ...loginRequest,
        prompt: "select_account", // Force account selection
      });

      // Get user information from the response
      const account = response.account;
      if (account) {
        // Extract email from account (username is typically the UPN/email)
        const email =
          account.username || account.name || account.homeAccountId || "";

        // Determine user role based on email (you can customize this logic)
        const userRole =
          email === "admin@empresa.com" || email.toLowerCase().includes("admin")
            ? "admin"
            : "miembro";

        // Store user information in localStorage for compatibility with existing app
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("msalAccount", JSON.stringify(account));

        enqueueSnackbar(`¡Bienvenido! Sesión iniciada como ${userRole}`, {
          variant: "success",
        });

        navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);

      // Handle user cancellation
      if (
        error.errorCode === "user_cancelled" ||
        error.errorCode === "consent_required"
      ) {
        enqueueSnackbar("Inicio de sesión cancelado", {
          variant: "info",
        });
      } else {
        enqueueSnackbar(
          "Error al iniciar sesión. Por favor intenta nuevamente.",
          {
            variant: "error",
          }
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        minWidth: "100dvw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0078D4 0%, #50A7E8 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Business sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              <Typography variant="h4" component="h1" gutterBottom>
                Portal Empresarial
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Autenticación Azure B2C
              </Typography>
            </Box>

            <Box>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleMicrosoftLogin}
                disabled={isLoading}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <Microsoft />
                  )
                }
                sx={{
                  mt: 2,
                  mb: 2,
                  py: 1.5,
                  backgroundColor: "#0078D4",
                  "&:hover": {
                    backgroundColor: "#106EBE",
                  },
                }}
              >
                {isLoading
                  ? "Iniciando sesión..."
                  : "Iniciar sesión con Microsoft"}
              </Button>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  backgroundColor: "info.light",
                  borderRadius: 2,
                  color: "info.contrastText",
                }}
              >
                <Typography variant="body2" display="block" sx={{ mb: 1 }}>
                  <strong>Autenticación segura</strong>
                </Typography>
                <Typography variant="caption" display="block">
                  Utiliza tu cuenta de Microsoft para acceder al portal
                  empresarial. Tus credenciales son manejadas de forma segura
                  por Microsoft Azure AD.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
