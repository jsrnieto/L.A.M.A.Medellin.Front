import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { People, Description, BarChart, Settings } from "@mui/icons-material";
import { Header } from "../organisms/Header";
import { NavigationCard } from "../molecules/NavigationCard";

const Home = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState<"admin" | "miembro">("miembro");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const role = localStorage.getItem("userRole") as "admin" | "miembro";

    if (!email) {
      navigate("/");
      return;
    }

    setUserEmail(email);
    setUserRole(role);
  }, [navigate]);

  const userName = userEmail.split("@")[0];

  const navigationItems = [
    {
      title: "Miembros",
      description:
        "Gestiona y visualiza la información de los miembros del equipo",
      icon: People,
      path: "/members",
    },
    {
      title: "Estadísticas",
      description: "Accede a estadísticas y análisis del equipo",
      icon: BarChart,
      path: "/statistics",
    },
    {
      title: "Documentos",
      description: "Consulta y gestiona documentos corporativos",
      icon: Description,
      path: "/documents",
    },
    {
      title: "Configuración",
      description: "Ajusta las preferencias y configuración del sistema",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100dvh",
        minWidth: "100dvw",
      }}
    >
      <Header userName={userName} userEmail={userEmail} userRole={userRole} />

      <Container sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
            Bienvenido, {userName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Selecciona una opción para comenzar
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {navigationItems.map((item) => (
            <NavigationCard key={item.path} {...item} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
