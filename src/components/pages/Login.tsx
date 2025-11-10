import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Business } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      enqueueSnackbar("Por favor completa todos los campos", { variant: "warning" });
      return;
    }

    const userRole = email === "admin@empresa.com" ? "admin" : "miembro";
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", userRole);
    
    enqueueSnackbar(`¡Bienvenido! Sesión iniciada como ${userRole}`, { variant: "success" });
    navigate("/home");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="usuario@empresa.com"
              />

              <TextField
                fullWidth
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  backgroundColor: "primary.light",
                  borderRadius: 2,
                  color: "primary.contrastText",
                }}
              >
                <Typography variant="caption" display="block">
                  <strong>Demo:</strong>
                </Typography>
                <Typography variant="caption" display="block">
                  Admin: admin@empresa.com
                </Typography>
                <Typography variant="caption">
                  Miembro: cualquier otro email
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
