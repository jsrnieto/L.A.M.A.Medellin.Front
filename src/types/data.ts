// Interfaz que coincide con el modelo de BD
// Todos los campos son opcionales excepto Id (que se genera automáticamente)
export interface Member {
  id: number;
  nombre?: string | null;
  apellido?: string | null;
  celular?: string | null;
  correoElectronico?: string | null;
  fechaIngreso?: string | null; // Formato: YYYY-MM-DD
  direccion?: string | null;
  memberNumber?: number | null;
  cargo?: string | null;
  rango?: string | null;
  estatus?: string | null;
  fechaNacimiento?: string | null; // Formato: YYYY-MM-DD
  cedula?: string | null;
  rh?: string | null;
  eps?: string | null;
  padrino?: string | null;
  foto?: string | null;
  contactoEmergencia?: string | null;
  ciudad?: string | null;
  moto?: string | null;
  anoModelo?: number | null;
  marca?: string | null;
  cilindrajeCC?: number | null;
  placaMatricula?: string | null;
  fechaExpedicionLicenciaConduccion?: string | null; // Formato: YYYY-MM-DD
  fechaExpedicionSOAT?: string | null; // Formato: YYYY-MM-DD
}
