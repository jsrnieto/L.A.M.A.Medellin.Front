/**
 * User-facing messages
 * TODO: Replace with i18n library for multi-language support
 */
export const MESSAGES = {
  // Members page
  MEMBERS_LOADING: 'Cargando miembros...',
  MEMBERS_LOAD_ERROR: 'No se pudieron cargar los miembros. Por favor, conecte la API.',
  MEMBERS_NO_DATA: 'No hay miembros registrados',
  MEMBERS_FETCH_ERROR: 'Failed to fetch members:',
  
  // Auth
  LOGIN_ERROR: 'Failed to login. Please check your credentials.',
  LOGOUT_SUCCESS: 'Sesión cerrada exitosamente',
  
  // General
  ERROR_GENERIC: 'Ocurrió un error. Por favor, inténtelo de nuevo.',
} as const;
