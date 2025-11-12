// Respuesta exitosa de la API (ApiResponse<T>)
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  timestamp: string; // DateTime en formato ISO
  traceId?: string | null;
}

// Respuesta de error de la API (ApiErrorResponse)
export interface ApiErrorResponse {
  success: boolean; // Siempre false
  message: string;
  detail?: string | null;
  errors?: Record<string, string[]> | null;
  traceId?: string | null;
  timestamp: string;
  type?: string | null;
}

// Respuesta paginada (cuando Data es DataResponse<T>)
export interface DataResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Alias para compatibilidad con código existente
export type Response<T> = ApiResponse<T>;
