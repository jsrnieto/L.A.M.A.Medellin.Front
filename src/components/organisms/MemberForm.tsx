import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Box,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { type Dayjs } from "dayjs";
import type { Member } from "../../types/data";
import { ESTATUS_OPTIONS, RANGO_OPTIONS, CARGO_OPTIONS, RH_OPTIONS } from "../../types/constants";
import { validateMember, type ValidationErrors } from "../../utils/validation";

interface MemberFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (member: Omit<Member, "id">) => Promise<void>;
  member?: Member | null; // Si existe, es edición; si no, es creación
  title?: string;
}

/**
 * Formulario reutilizable para crear o editar miembros
 * 
 * Explicación:
 * - Si se pasa `member`, es modo edición
 * - Si no se pasa `member`, es modo creación
 * - Valida todos los campos antes de enviar
 * - Maneja fechas con dayjs (compatible con DatePicker de MUI)
 */
export const MemberForm = ({
  open,
  onClose,
  onSubmit,
  member,
  title,
}: MemberFormProps) => {
  const isEditMode = !!member;

  // Estado del formulario
  const [formData, setFormData] = useState<Partial<Member>>({
    nombre: "",
    apellido: "",
    celular: "",
    correoElectronico: "",
    fechaIngreso: null,
    direccion: "",
    memberNumber: null,
    cargo: "",
    rango: "",
    estatus: "",
    fechaNacimiento: null,
    cedula: "",
    rh: "",
    eps: "",
    padrino: "",
    foto: "",
    contactoEmergencia: "",
    ciudad: "",
    moto: "",
    anoModelo: null,
    marca: "",
    cilindrajeCC: null,
    placaMatricula: "",
    fechaExpedicionLicenciaConduccion: null,
    fechaExpedicionSOAT: null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Cargar datos del miembro cuando se abre en modo edición
  useEffect(() => {
    if (member && open) {
      setFormData({
        nombre: member.nombre || "",
        apellido: member.apellido || "",
        celular: member.celular || "",
        correoElectronico: member.correoElectronico || "",
        fechaIngreso: member.fechaIngreso || null,
        direccion: member.direccion || "",
        memberNumber: member.memberNumber || null,
        cargo: member.cargo || "",
        rango: member.rango || "",
        estatus: member.estatus || "",
        fechaNacimiento: member.fechaNacimiento || null,
        cedula: member.cedula || "",
        rh: member.rh || "",
        eps: member.eps || "",
        padrino: member.padrino || "",
        foto: member.foto || "",
        contactoEmergencia: member.contactoEmergencia || "",
        ciudad: member.ciudad || "",
        moto: member.moto || "",
        anoModelo: member.anoModelo || null,
        marca: member.marca || "",
        cilindrajeCC: member.cilindrajeCC || null,
        placaMatricula: member.placaMatricula || "",
        fechaExpedicionLicenciaConduccion: member.fechaExpedicionLicenciaConduccion || null,
        fechaExpedicionSOAT: member.fechaExpedicionSOAT || null,
      });
      setErrors({});
      setSubmitError(null);
    } else if (!member && open) {
      // Resetear formulario en modo creación
      setFormData({
        nombre: "",
        apellido: "",
        celular: "",
        correoElectronico: "",
        fechaIngreso: null,
        direccion: "",
        memberNumber: null,
        cargo: "",
        rango: "",
        estatus: "",
        fechaNacimiento: null,
        cedula: "",
        rh: "",
        eps: "",
        padrino: "",
        foto: "",
        contactoEmergencia: "",
        ciudad: "",
        moto: "",
        anoModelo: null,
        marca: "",
        cilindrajeCC: null,
        placaMatricula: "",
        fechaExpedicionLicenciaConduccion: null,
        fechaExpedicionSOAT: null,
      });
      setErrors({});
      setSubmitError(null);
    }
  }, [member, open]);

  /**
   * Convierte una fecha de string a Dayjs para el DatePicker
   * Acepta múltiples formatos: YYYY-MM-DD, DD/MM/YYYY, ISO strings, etc.
   */
  const stringToDayjs = (dateString: string | null | undefined): Dayjs | null => {
    if (!dateString) return null;
    const parsed = dayjs(dateString);
    if (!parsed.isValid()) return null;
    return parsed;
  };

  /**
   * Convierte Dayjs a string en formato ISO completo para la API
   * Formato: YYYY-MM-DDTHH:mm:ss
   */
  const dayjsToString = (date: Dayjs | null): string | null => {
    if (!date || !date.isValid()) return null;
    // Retornar en formato ISO con hora establecida a medianoche UTC
    return date.format("YYYY-MM-DDTHH:mm:ss");
  };

  /**
   * Maneja el cambio de cualquier campo del formulario
   */
  const handleChange = (field: keyof Member, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async () => {
    // Validar formulario
    const validationErrors = validateMember(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitError("Por favor corrige los errores en el formulario");
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      // Helper para convertir fechas - mantiene valores originales, no los convierte a null
      const convertDate = (dateValue: any): string | null => {
        if (!dateValue) return null;
        const converted = dayjsToString(stringToDayjs(dateValue));
        return converted;
      };

      // En modo edición, enviamos los valores exactamente como están en formData
      // formData ya contiene los valores originales para campos no modificados
      // y los valores nuevos para campos que sí fueron modificados
      const dataToSubmit: Omit<Member, "id"> = {
        nombre: formData.nombre || null,
        apellido: formData.apellido || null,
        celular: formData.celular || null,
        correoElectronico: formData.correoElectronico || null,
        fechaIngreso: convertDate(formData.fechaIngreso),
        direccion: formData.direccion || null,
        memberNumber: formData.memberNumber || null,
        cargo: formData.cargo || null,
        rango: formData.rango || null,
        estatus: formData.estatus || null,
        fechaNacimiento: convertDate(formData.fechaNacimiento),
        cedula: formData.cedula || null,
        rh: formData.rh || null,
        eps: formData.eps || null,
        padrino: formData.padrino || null,
        foto: formData.foto || null,
        contactoEmergencia: formData.contactoEmergencia || null,
        ciudad: formData.ciudad || null,
        moto: formData.moto || null,
        anoModelo: formData.anoModelo || null,
        marca: formData.marca || null,
        cilindrajeCC: formData.cilindrajeCC || null,
        placaMatricula: formData.placaMatricula || null,
        fechaExpedicionLicenciaConduccion: convertDate(formData.fechaExpedicionLicenciaConduccion),
        fechaExpedicionSOAT: convertDate(formData.fechaExpedicionSOAT),
      };

      console.log("Datos a enviar:", dataToSubmit);
      await onSubmit(dataToSubmit);
      onClose();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Error al guardar el miembro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title || (isEditMode ? "Editar Miembro" : "Crear Nuevo Miembro")}</DialogTitle>
      <DialogContent dividers>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <Box sx={{ pt: 1 }}>
          <Typography variant="h6" gutterBottom>
            Información Personal
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                value={formData.nombre || ""}
                onChange={(e) => handleChange("nombre", e.target.value)}
                error={!!errors.nombre}
                helperText={errors.nombre}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                value={formData.apellido || ""}
                onChange={(e) => handleChange("apellido", e.target.value)}
                error={!!errors.apellido}
                helperText={errors.apellido}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cédula"
                value={formData.cedula || ""}
                onChange={(e) => handleChange("cedula", e.target.value)}
                error={!!errors.cedula}
                helperText={errors.cedula}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Fecha de Nacimiento"
                value={stringToDayjs(formData.fechaNacimiento || null)}
                onChange={(date) => handleChange("fechaNacimiento", dayjsToString(date as Dayjs | null))}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    error: !!errors.fechaNacimiento,
                    helperText: errors.fechaNacimiento,
                  },
                }}
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                type="email"
                value={formData.correoElectronico || ""}
                onChange={(e) => handleChange("correoElectronico", e.target.value)}
                error={!!errors.correoElectronico}
                helperText={errors.correoElectronico}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Celular"
                value={formData.celular || ""}
                onChange={(e) => handleChange("celular", e.target.value)}
                error={!!errors.celular}
                helperText={errors.celular}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                value={formData.direccion || ""}
                onChange={(e) => handleChange("direccion", e.target.value)}
                error={!!errors.direccion}
                helperText={errors.direccion}
                size="small"
                multiline
                rows={2}
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ciudad"
                value={formData.ciudad || ""}
                onChange={(e) => handleChange("ciudad", e.target.value)}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="RH"
                value={formData.rh || ""}
                onChange={(e) => handleChange("rh", e.target.value)}
                size="small"
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {RH_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="EPS"
                value={formData.eps || ""}
                onChange={(e) => handleChange("eps", e.target.value)}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contacto de Emergencia"
                value={formData.contactoEmergencia || ""}
                onChange={(e) => handleChange("contactoEmergencia", e.target.value)}
                size="small"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Información Organizacional
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número de Miembro"
                type="number"
                value={formData.memberNumber || ""}
                onChange={(e) => handleChange("memberNumber", e.target.value ? parseInt(e.target.value) : null)}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Fecha de Ingreso"
                value={stringToDayjs(formData.fechaIngreso || null)}
                onChange={(date) => handleChange("fechaIngreso", dayjsToString(date as Dayjs | null))}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    error: !!errors.fechaIngreso,
                    helperText: errors.fechaIngreso,
                  },
                }}
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                label="Cargo"
                value={formData.cargo || ""}
                onChange={(e) => handleChange("cargo", e.target.value)}
                size="small"
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {CARGO_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                label="Rango"
                value={formData.rango || ""}
                onChange={(e) => handleChange("rango", e.target.value)}
                size="small"
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {RANGO_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                label="Estatus"
                value={formData.estatus || ""}
                onChange={(e) => handleChange("estatus", e.target.value)}
                size="small"
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {ESTATUS_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Padrino"
                value={formData.padrino || ""}
                onChange={(e) => handleChange("padrino", e.target.value)}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL de Foto"
                value={formData.foto || ""}
                onChange={(e) => handleChange("foto", e.target.value)}
                size="small"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Información de Moto
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Moto"
                value={formData.moto || ""}
                onChange={(e) => handleChange("moto", e.target.value)}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Marca"
                value={formData.marca || ""}
                onChange={(e) => handleChange("marca", e.target.value)}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Año del Modelo"
                type="number"
                value={formData.anoModelo || ""}
                onChange={(e) => handleChange("anoModelo", e.target.value ? parseInt(e.target.value) : null)}
                error={!!errors.anoModelo}
                helperText={errors.anoModelo}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Cilindraje (CC)"
                type="number"
                value={formData.cilindrajeCC || ""}
                onChange={(e) => handleChange("cilindrajeCC", e.target.value ? parseInt(e.target.value) : null)}
                error={!!errors.cilindrajeCC}
                helperText={errors.cilindrajeCC}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Placa/Matrícula"
                value={formData.placaMatricula || ""}
                onChange={(e) => handleChange("placaMatricula", e.target.value)}
                size="small"
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Fecha Expedición Licencia"
                value={stringToDayjs(formData.fechaExpedicionLicenciaConduccion || null)}
                onChange={(date) => handleChange("fechaExpedicionLicenciaConduccion", dayjsToString(date as Dayjs | null))}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    error: !!errors.fechaExpedicionLicenciaConduccion,
                    helperText: errors.fechaExpedicionLicenciaConduccion,
                  },
                }}
              />
            </Grid>
            {/* @ts-expect-error - MUI v7 Grid types issue, but works at runtime */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Fecha Expedición SOAT"
                value={stringToDayjs(formData.fechaExpedicionSOAT || null)}
                onChange={(date) => handleChange("fechaExpedicionSOAT", dayjsToString(date as Dayjs | null))}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    error: !!errors.fechaExpedicionSOAT,
                    helperText: errors.fechaExpedicionSOAT,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "Guardando..." : isEditMode ? "Actualizar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

