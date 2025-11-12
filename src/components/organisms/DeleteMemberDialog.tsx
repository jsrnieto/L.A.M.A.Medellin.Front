import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { Warning } from "@mui/icons-material";
import type { Member } from "../../types/data";

interface DeleteMemberDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  member: Member | null;
  loading?: boolean;
}

/**
 * Diálogo de confirmación para eliminar un miembro
 * 
 * Explicación:
 * - Muestra información del miembro a eliminar
 * - Requiere confirmación explícita del usuario
 * - Maneja el estado de carga durante la eliminación
 */
export const DeleteMemberDialog = ({
  open,
  onClose,
  onConfirm,
  member,
  loading = false,
}: DeleteMemberDialogProps) => {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="span">
          Confirmar Eliminación
        </Typography>
      </DialogTitle>
      <DialogContent>
        {member && (
          <>
            <Alert severity="warning" icon={<Warning />} sx={{ mb: 2 }}>
              Esta acción no se puede deshacer
            </Alert>
            <Typography variant="body1" gutterBottom>
              ¿Estás seguro de que deseas eliminar al miembro?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              <strong>Nombre:</strong> {member.nombre || "-"} {member.apellido || ""}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>ID:</strong> {member.id}
            </Typography>
            {member.correoElectronico && (
              <Typography variant="body2" color="text.secondary">
                <strong>Email:</strong> {member.correoElectronico}
              </Typography>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained" disabled={loading}>
          {loading ? "Eliminando..." : "Eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

