import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Chip,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Edit, Delete, FileDownload } from "@mui/icons-material";
import type { Member } from "../../types/data";
import type { FilterMembers } from "../../types/filters";
import type { DataResponse } from "../../types/response";
import { ESTATUS_OPTIONS, RANGO_OPTIONS, CARGO_OPTIONS } from "../../types/constants";
import useMember from "../../hooks/useMember";
import { useSnackbar } from "notistack";

interface MembersTableProps {
  userRole: "admin" | "miembro";
  onEdit?: (member: Member) => void;
  onDelete?: (member: Member) => void;
  onExport?: () => void;
}

/**
 * Componente de tabla para mostrar miembros con:
 * - Paginación
 * - Filtros por estatus, rango y cargo
 * - Acciones de editar/eliminar (solo para admin)
 * - Botón de exportar
 * 
 * Explicación del funcionamiento:
 * 1. Usa el hook useMember para obtener los datos
 * 2. Maneja el estado de paginación y filtros
 * 3. Cuando cambian los filtros o la página, hace una nueva petición a la API
 */
export const MembersTable = ({
  userRole,
  onEdit,
  onDelete,
  onExport,
}: MembersTableProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { getMembers } = useMember();

  // Estado de los datos
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<DataResponse<Member>>({
    data: [],
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  // Estado de los filtros
  const [filters, setFilters] = useState<FilterMembers>({
    page: 1,
    pageSize: 10,
    estatus: undefined,
    rango: undefined,
    cargo: undefined,
  });

  /**
   * Función que carga los miembros desde la API
   * Se ejecuta cuando cambian los filtros o la página
   */
  const loadMembers = async () => {
    setLoading(true);
    try {
      const response = await getMembers(filters);
      
      if (response.success && response.data) {
        setMembers(response.data.data);
        setPagination(response.data);
      } else {
        enqueueSnackbar(response.message || "Error al cargar los miembros", {
          variant: "error",
        });
        setMembers([]);
      }
    } catch (error) {
      enqueueSnackbar("Error inesperado al cargar los miembros", {
        variant: "error",
      });
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar miembros cuando cambian los filtros
  useEffect(() => {
    loadMembers();
  }, [filters.page, filters.pageSize, filters.estatus, filters.rango, filters.cargo]);

  /**
   * Maneja el cambio de página
   */
  const handleChangePage = (_event: unknown, newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage + 1 })); // MUI usa índice 0, API usa índice 1
  };

  /**
   * Maneja el cambio de tamaño de página
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    setFilters((prev) => ({ ...prev, pageSize: newPageSize, page: 1 })); // Reset a página 1
  };

  /**
   * Maneja el cambio de filtros
   */
  const handleFilterChange = (key: keyof FilterMembers, value: string | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined, page: 1 })); // Reset a página 1
  };

  /**
   * Limpia todos los filtros
   */
  const handleClearFilters = () => {
    setFilters({
      page: 1,
      pageSize: 10,
      estatus: undefined,
      rango: undefined,
      cargo: undefined,
    });
  };

  const showActions = userRole === "admin";

  return (
    <Box>
      {/* Barra de filtros */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Filtros
          </Typography>

          <TextField
            select
            label="Estatus"
            value={filters.estatus || ""}
            onChange={(e) => handleFilterChange("estatus", e.target.value)}
            sx={{ minWidth: 150 }}
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            {ESTATUS_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Rango"
            value={filters.rango || ""}
            onChange={(e) => handleFilterChange("rango", e.target.value)}
            sx={{ minWidth: 150 }}
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            {RANGO_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Cargo"
            value={filters.cargo || ""}
            onChange={(e) => handleFilterChange("cargo", e.target.value)}
            sx={{ minWidth: 150 }}
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            {CARGO_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="outlined" onClick={handleClearFilters} size="small">
            Limpiar
          </Button>

          {showActions && onExport && (
            <Button
              variant="contained"
              startIcon={<FileDownload />}
              onClick={onExport}
              size="small"
            >
              Exportar CSV
            </Button>
          )}
        </Stack>
      </Paper>

      {/* Tabla */}
      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Celular</TableCell>
                  <TableCell>Cargo</TableCell>
                  <TableCell>Rango</TableCell>
                  <TableCell>Estatus</TableCell>
                  {showActions && <TableCell align="right">Acciones</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={showActions ? 9 : 8} align="center">
                      <Typography color="text.secondary" sx={{ py: 2 }}>
                        No se encontraron miembros
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member) => (
                    <TableRow key={member.id} hover>
                      <TableCell>{member.id}</TableCell>
                      <TableCell>{member.nombre || "-"}</TableCell>
                      <TableCell>{member.apellido || "-"}</TableCell>
                      <TableCell>{member.correoElectronico || "-"}</TableCell>
                      <TableCell>{member.celular || "-"}</TableCell>
                      <TableCell>
                        {member.cargo ? (
                          <Chip label={member.cargo} size="small" />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {member.rango ? (
                          <Chip label={member.rango} size="small" color="secondary" />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {member.estatus ? (
                          <Chip
                            label={member.estatus}
                            size="small"
                            color={
                              member.estatus === "Activo"
                                ? "success"
                                : member.estatus === "Inactivo"
                                ? "error"
                                : "default"
                            }
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      {showActions && (
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => onEdit?.(member)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete?.(member)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Paginación */}
            <TablePagination
              component="div"
              count={pagination.totalCount}
              page={pagination.page - 1} // MUI usa índice 0, API usa índice 1
              onPageChange={handleChangePage}
              rowsPerPage={pagination.pageSize}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
              }
            />
          </>
        )}
      </TableContainer>
    </Box>
  );
};

