import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, Fab } from "@mui/material";
import { ArrowBack, Add } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import type { Member } from "../../types/data";
import { Header } from "../organisms/Header";
import { MembersTable } from "../organisms/MembersTable";
import { MemberForm } from "../organisms/MemberForm";
import { DeleteMemberDialog } from "../organisms/DeleteMemberDialog";
import useMember from "../../hooks/useMember";
import { exportMembersToCSV } from "../../utils/export";

/**
 * Página principal de gestión de miembros
 * 
 * Funcionalidades:
 * - Tabla con paginación y filtros
 * - Crear nuevos miembros
 * - Editar miembros existentes
 * - Eliminar miembros
 * - Exportar a CSV
 */
const Members = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { createMember, updateMember, deleteMember, getAllMembers } = useMember();

  // Estado de autenticación
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState<"admin" | "miembro">("miembro");

  // Estado de los diálogos
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Verificar autenticación al cargar
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

  /**
   * Maneja la apertura del formulario en modo creación
   */
  const handleCreate = () => {
    setSelectedMember(null);
    setIsEditMode(false);
    setFormOpen(true);
  };

  /**
   * Maneja la apertura del formulario en modo edición
   */
  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setIsEditMode(true);
    setFormOpen(true);
  };

  /**
   * Maneja el cierre del formulario
   */
  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedMember(null);
  };

  /**
   * Maneja el envío del formulario (crear o editar)
   */
  const handleFormSubmit = async (memberData: Omit<Member, "id">) => {
    try {
      if (isEditMode && selectedMember) {
        // Modo edición
        const response = await updateMember({
          ...memberData,
          id: selectedMember.id,
        });

        if (response.success) {
          enqueueSnackbar("Miembro actualizado exitosamente", { variant: "success" });
          handleFormClose();
          // Recargar la página para actualizar la tabla
          window.location.reload();
        } else {
          throw new Error(response.message || "Error al actualizar el miembro");
        }
      } else {
        // Modo creación
        const response = await createMember(memberData);

        if (response.success) {
          enqueueSnackbar("Miembro creado exitosamente", { variant: "success" });
          handleFormClose();
          // Recargar la página para actualizar la tabla
          window.location.reload();
        } else {
          throw new Error(response.message || "Error al crear el miembro");
        }
      }
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : "Error al guardar el miembro",
        { variant: "error" }
      );
      throw error; // Re-lanzar para que el formulario maneje el error
    }
  };

  /**
   * Maneja la apertura del diálogo de eliminación
   */
  const handleDelete = (member: Member) => {
    setSelectedMember(member);
    setDeleteDialogOpen(true);
  };

  /**
   * Maneja la confirmación de eliminación
   */
  const handleDeleteConfirm = async () => {
    if (!selectedMember) return;

    try {
      const response = await deleteMember(selectedMember.id);

      if (response.success) {
        enqueueSnackbar("Miembro eliminado exitosamente", { variant: "success" });
        setDeleteDialogOpen(false);
        setSelectedMember(null);
        // Recargar la página para actualizar la tabla
        window.location.reload();
      } else {
        throw new Error(response.message || "Error al eliminar el miembro");
      }
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : "Error al eliminar el miembro",
        { variant: "error" }
      );
    }
  };

  /**
   * Maneja la exportación a CSV
   */
  const handleExport = async () => {
    try {
      enqueueSnackbar("Obteniendo miembros para exportar...", { variant: "info" });
      
      const response = await getAllMembers();

      if (response.success && response.data) {
        exportMembersToCSV(response.data);
        enqueueSnackbar("Exportación completada exitosamente", { variant: "success" });
      } else {
        throw new Error(response.message || "Error al obtener los miembros para exportar");
      }
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : "Error al exportar los miembros",
        { variant: "error" }
      );
    }
  };

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
            <Box sx={{ flexGrow: 1 }}>
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
                Gestión de Miembros
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {userRole === "admin"
                  ? "Administra la información del equipo L.A.M.A"
                  : "Consulta la información de los miembros del equipo"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Tabla de miembros */}
        <MembersTable
          userRole={userRole}
          onEdit={userRole === "admin" ? handleEdit : undefined}
          onDelete={userRole === "admin" ? handleDelete : undefined}
          onExport={userRole === "admin" ? handleExport : undefined}
        />

        {/* Botón flotante para crear (solo admin) */}
        {userRole === "admin" && (
          <Fab
            color="primary"
            aria-label="crear miembro"
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
            }}
            onClick={handleCreate}
          >
            <Add />
          </Fab>
        )}

        {/* Formulario de crear/editar */}
        <MemberForm
          open={formOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          member={isEditMode ? selectedMember : null}
          title={isEditMode ? "Editar Miembro" : "Crear Nuevo Miembro"}
        />

        {/* Diálogo de confirmación de eliminación */}
        <DeleteMemberDialog
          open={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setSelectedMember(null);
          }}
          onConfirm={handleDeleteConfirm}
          member={selectedMember}
        />
      </Container>
    </Box>
  );
};

export default Members;
