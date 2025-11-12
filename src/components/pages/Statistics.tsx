import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { Header } from "../organisms/Header";
import { PieChartComponent, BarChartComponent } from "../organisms/StatisticsCharts";
import useMember from "../../hooks/useMember";
import type { Member } from "../../types/data";
import {
  getMembersByCargo,
  getMembersByRango,
  getMembersByEstatus,
  getTotalMembers,
  getNewMembers,
  getLongevosMembers,
  getMembersWithSOATExpiring,
  getMembersWithLicenseExpiring,
  getMotosByCilindraje,
  getMembersWithBirthdayComing,
} from "../../utils/statistics";

/**
 * Página de estadísticas de miembros
 * 
 * Muestra:
 * - Gráficos de torta (cargo, rango)
 * - Gráfico de barras (estatus)
 * - Métricas (total, nuevos, longevos)
 * - Listados (SOAT, licencia, cumpleaños)
 * - Gráfico de proporción de motos por cilindraje
 */
const Statistics = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { getAllMembers } = useMember();

  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState<"admin" | "miembro">("miembro");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación y cargar datos
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const role = localStorage.getItem("userRole") as "admin" | "miembro";

    if (!email) {
      navigate("/");
      return;
    }

    setUserEmail(email);
    setUserRole(role);

    // Cargar todos los miembros para las estadísticas
    loadMembers();
  }, [navigate]);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const response = await getAllMembers();
      if (response.success && response.data) {
        setMembers(response.data);
      } else {
        enqueueSnackbar(response.message || "Error al cargar los miembros", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Error inesperado al cargar los miembros", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const userName = userEmail.split("@")[0];

  // Calcular estadísticas
  const membersByCargo = getMembersByCargo(members);
  const membersByRango = getMembersByRango(members);
  const membersByEstatus = getMembersByEstatus(members);
  const totalMembers = getTotalMembers(members);
  const newMembers = getNewMembers(members);
  const longevosMembers = getLongevosMembers(members);
  const soatExpiring = getMembersWithSOATExpiring(members);
  const licenseExpiring = getMembersWithLicenseExpiring(members);
  const motosByCilindraje = getMotosByCilindraje(members);
  const birthdayComing = getMembersWithBirthdayComing(members);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100dvh",
          minWidth: "100dvw",
          bgcolor: "background.default",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        minWidth: "100dvw",
        bgcolor: "background.default",
        maxWidth: "100vw",
      }}
    >
      <Header userName={userName} userEmail={userEmail} userRole={userRole} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/home")}
              variant="outlined"
              size="small"
            >
              Volver
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box>
              <Typography 
                variant="h3" 
                component="h1" 
                fontWeight={800}
                sx={{ 
                  background: "linear-gradient(135deg, #0078D4 0%, #8B5CF6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1
                }}
              >
                Dashboard de Estadísticas
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Análisis completo y métricas en tiempo real del equipo L.A.M.A
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Métricas principales */}
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: "100%",
              background: "linear-gradient(135deg, rgba(0, 136, 254, 0.1) 0%, rgba(0, 120, 212, 0.05) 100%)",
              border: "1px solid rgba(0, 120, 212, 0.2)",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(0, 120, 212, 0.15)",
                transform: "translateY(-2px)"
              }
            }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="body2" fontWeight={600}>
                  Total de Miembros
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#0078D4", my: 1 }}>
                  {totalMembers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: "100%",
              background: "linear-gradient(135deg, rgba(0, 196, 159, 0.1) 0%, rgba(0, 176, 140, 0.05) 100%)",
              border: "1px solid rgba(0, 196, 159, 0.2)",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(0, 196, 159, 0.15)",
                transform: "translateY(-2px)"
              }
            }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="body2" fontWeight={600}>
                  Miembros Nuevos
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#00C49F", my: 1 }}>
                  {newMembers}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Último mes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: "100%",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(139, 92, 246, 0.15)",
                transform: "translateY(-2px)"
              }
            }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="body2" fontWeight={600}>
                  Miembros Longevos
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#8B5CF6", my: 1 }}>
                  {longevosMembers}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Más de 1 año
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: "100%",
              background: "linear-gradient(135deg, rgba(255, 187, 40, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)",
              border: "1px solid rgba(255, 187, 40, 0.2)",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(255, 187, 40, 0.15)",
                transform: "translateY(-2px)"
              }
            }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="body2" fontWeight={600}>
                  SOAT por Vencer
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#FFBB28", my: 1 }}>
                  {soatExpiring.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Próximos 30 días
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Gráficos de torta */}
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
          <Grid item xs={12} md={6}>
            <PieChartComponent title="Miembros por Cargo" data={membersByCargo} />
          </Grid>

          {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
          <Grid item xs={12} md={6}>
            <PieChartComponent title="Miembros por Rango" data={membersByRango} />
          </Grid>
        </Grid>

        {/* Gráficos de barras */}
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
          <Grid item xs={12} md={6} >
            <BarChartComponent title="Miembros por Estatus" data={membersByEstatus} />
          </Grid>

          {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
          <Grid item xs={12} md={6}>
            <BarChartComponent 
              title="Proporción de Motos por Cilindraje" 
              data={motosByCilindraje}
              color="#00C49F"
            />
          </Grid>
        </Grid>

        {/* Listados */}
        <Grid container spacing={2.5}>
          {/* SOAT por vencer */}
          {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: "12px", border: "1px solid rgba(255, 187, 40, 0.2)" }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: "#333" }}>
                🛣️ Miembros con SOAT por Vencer
              </Typography>
              {soatExpiring.length === 0 ? (
                <Alert severity="success">No hay SOAT por vencer en los próximos 30 días</Alert>
              ) : (
                <List>
                  {soatExpiring.map((member, index) => (
                    <div key={member.id}>
                      <ListItem>
                        <ListItemText
                          primary={`${member.nombre || ""} ${member.apellido || ""}`}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {member.placaMatricula && `Placa: ${member.placaMatricula} - `}
                              </Typography>
                              <Typography component="span" variant="body2" color="text.secondary">
                                {member.fechaExpedicionSOAT &&
                                  `SOAT: ${new Date(member.fechaExpedicionSOAT).toLocaleDateString()}`}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < soatExpiring.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>

          {/* Licencia por vencer */}
          {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: "12px", border: "1px solid rgba(139, 92, 246, 0.2)" }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: "#333" }}>
                📋 Miembros con Licencia por Vencer
              </Typography>
              {licenseExpiring.length === 0 ? (
                <Alert severity="success">No hay licencias por vencer en los próximos 30 días</Alert>
              ) : (
                <List>
                  {licenseExpiring.map((member, index) => (
                    <div key={member.id}>
                      <ListItem>
                        <ListItemText
                          primary={`${member.nombre || ""} ${member.apellido || ""}`}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {member.cedula && `Cédula: ${member.cedula} - `}
                              </Typography>
                              <Typography component="span" variant="body2" color="text.secondary">
                                {member.fechaExpedicionLicenciaConduccion &&
                                  `Licencia: ${new Date(member.fechaExpedicionLicenciaConduccion).toLocaleDateString()}`}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < licenseExpiring.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>

          {/* Próximos cumpleaños */}
          {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: "12px", border: "1px solid rgba(0, 196, 159, 0.2)" }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: "#333" }}>
                🎂 Miembros Próximos a Cumplir Años
              </Typography>
              {birthdayComing.length === 0 ? (
                <Alert severity="info">No hay cumpleaños en los próximos 30 días</Alert>
              ) : (
                <List>
                  {birthdayComing.map((member, index) => (
                    <div key={member.id}>
                      <ListItem>
                        <ListItemText
                          primary={`${member.nombre || ""} ${member.apellido || ""}`}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {member.fechaNacimiento &&
                                  `Cumpleaños: ${new Date(member.fechaNacimiento).toLocaleDateString("es-ES", {
                                    month: "long",
                                    day: "numeric",
                                  })}`}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < birthdayComing.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Statistics;

