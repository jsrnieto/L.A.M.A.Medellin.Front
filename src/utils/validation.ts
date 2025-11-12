/**
 * Funciones de validación para el formulario de miembros
 * Basadas en el modelo de BD y las restricciones de SQL Server
 */

export interface ValidationErrors {
  [key: string]: string;
}

/**
 * Valida un email
 */
export const validateEmail = (email: string | null | undefined): string | null => {
  if (!email || email.trim() === "") return null; // Email es opcional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "El formato del email no es válido";
  }
  if (email.length > 100) {
    return "El email no puede tener más de 100 caracteres";
  }
  return null;
};

/**
 * Valida un teléfono (celular)
 */
export const validatePhone = (phone: string | null | undefined): string | null => {
  if (!phone || phone.trim() === "") return null; // Teléfono es opcional
  // Solo números, espacios, guiones y paréntesis
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  if (!phoneRegex.test(phone)) {
    return "El teléfono solo puede contener números, espacios, guiones y paréntesis";
  }
  if (phone.length > 20) {
    return "El teléfono no puede tener más de 20 caracteres";
  }
  return null;
};

/**
 * Valida una cédula
 */
export const validateCedula = (cedula: string | null | undefined): string | null => {
  if (!cedula || cedula.trim() === "") return null; // Cédula es opcional
  // Solo números
  const cedulaRegex = /^\d+$/;
  if (!cedulaRegex.test(cedula)) {
    return "La cédula solo puede contener números";
  }
  if (cedula.length > 20) {
    return "La cédula no puede tener más de 20 caracteres";
  }
  return null;
};

/**
 * Valida una fecha
 * Acepta formatos: YYYY-MM-DD, YYYY-MM-DDTHH:mm:ss, DD/MM/YYYY, o cualquier fecha válida
 */
export const validateDate = (date: string | null | undefined): string | null => {
  if (!date || (typeof date === 'string' && date.trim() === "")) return null; // Fecha es opcional
  
  if (typeof date !== 'string') return null;
  
  // Intentar parsear con formato YYYY-MM-DD (simple)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(date)) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return "La fecha no es válida";
    }
    return null;
  }
  
  // Intentar parsear con formato ISO completo: YYYY-MM-DDTHH:mm:ss
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  if (isoRegex.test(date)) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return "La fecha no es válida";
    }
    return null;
  }
  
  // Intentar parsear con formato DD/MM/YYYY
  const ddmmyyyyRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (ddmmyyyyRegex.test(date)) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return "La fecha no es válida";
    }
    return null;
  }
  
  // Intentar parsear como cualquier fecha válida de JavaScript
  const dateObj = new Date(date);
  if (!isNaN(dateObj.getTime())) {
    return null; // Es una fecha válida
  }
  
  return "El formato de fecha debe ser YYYY-MM-DD, ISO o DD/MM/YYYY";
};

/**
 * Valida un campo de texto con longitud máxima
 */
export const validateText = (
  text: string | null | undefined,
  maxLength: number,
  fieldName: string
): string | null => {
  if (!text || text.trim() === "") return null; // Texto es opcional
  if (text.length > maxLength) {
    return `${fieldName} no puede tener más de ${maxLength} caracteres`;
  }
  return null;
};

/**
 * Valida un número
 */
export const validateNumber = (
  value: number | null | undefined,
  min?: number,
  max?: number,
  fieldName?: string
): string | null => {
  if (value === null || value === undefined) return null; // Número es opcional
  if (min !== undefined && value < min) {
    return `${fieldName || "El valor"} debe ser mayor o igual a ${min}`;
  }
  if (max !== undefined && value > max) {
    return `${fieldName || "El valor"} debe ser menor o igual a ${max}`;
  }
  return null;
};

/**
 * Valida un miembro completo
 */
export const validateMember = (member: Partial<import("../types/data").Member>): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validar email
  const emailError = validateEmail(member.correoElectronico);
  if (emailError) errors.correoElectronico = emailError;

  // Validar celular
  const phoneError = validatePhone(member.celular);
  if (phoneError) errors.celular = phoneError;

  // Validar cédula
  const cedulaError = validateCedula(member.cedula);
  if (cedulaError) errors.cedula = cedulaError;

  // Validar fechas
  const fechaIngresoError = validateDate(member.fechaIngreso || undefined);
  if (fechaIngresoError) errors.fechaIngreso = fechaIngresoError;

  const fechaNacimientoError = validateDate(member.fechaNacimiento || undefined);
  if (fechaNacimientoError) errors.fechaNacimiento = fechaNacimientoError;

  const fechaLicenciaError = validateDate(member.fechaExpedicionLicenciaConduccion || undefined);
  if (fechaLicenciaError) errors.fechaExpedicionLicenciaConduccion = fechaLicenciaError;

  const fechaSOATError = validateDate(member.fechaExpedicionSOAT || undefined);
  if (fechaSOATError) errors.fechaExpedicionSOAT = fechaSOATError;

  // Validar longitudes de texto
  const nombreError = validateText(member.nombre, 100, "El nombre");
  if (nombreError) errors.nombre = nombreError;

  const apellidoError = validateText(member.apellido, 100, "El apellido");
  if (apellidoError) errors.apellido = apellidoError;

  const direccionError = validateText(member.direccion, 255, "La dirección");
  if (direccionError) errors.direccion = direccionError;

  // Validar números
  const anoModeloError = validateNumber(member.anoModelo || undefined, 1900, new Date().getFullYear() + 1, "El año del modelo");
  if (anoModeloError) errors.anoModelo = anoModeloError;

  const cilindrajeError = validateNumber(member.cilindrajeCC || undefined, 0, undefined, "El cilindraje");
  if (cilindrajeError) errors.cilindrajeCC = cilindrajeError;

  return errors;
};

