import type { Member } from "../types/data";
import type { ApiResponse, DataResponse, ApiErrorResponse } from "../types/response";
import type { FilterMembers } from "../types/filters";

// URL base de la API (debe estar en .env como VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5275";

/**
 * Hook personalizado para manejar todas las operaciones CRUD de miembros
 * 
 * Explicación:
 * - Todas las funciones son async porque fetch es asíncrono
 * - Retornan Promises que se resuelven con la respuesta de la API
 * - Manejan errores de red y errores de la API
 */
const useMember = () => {
  /**
   * Construye los parámetros de consulta (query params) para la URL
   * Ejemplo: { page: 1, estatus: "Activo" } -> "page=1&estatus=Activo"
   */
  function buildQueryParams(params: FilterMembers): string {
    const query = new URLSearchParams();
    for (const key in params) {
      const value = params[key as keyof FilterMembers];
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, String(value));
      }
    }
    return query.toString();
  }

  /**
   * Obtiene miembros con paginación y filtros
   * GET /api/Miembros?page=1&pageSize=100&estatus=Pendiente&rango=Oro&cargo=Secretario
   */
  const getMembers = async (
    filters: FilterMembers = {}
  ): Promise<ApiResponse<DataResponse<Member>>> => {
    try {
      const queryString = buildQueryParams(filters);
      const url = `${API_URL}/api/Miembros${queryString ? `?${queryString}` : ""}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Si la respuesta no es exitosa, intenta parsear el error
        const errorData: ApiErrorResponse = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse<DataResponse<Member>> = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los miembros:", error);
      // Retornamos una respuesta de error estructurada
      return {
        success: false,
        message: error instanceof Error ? error.message : "Error desconocido al obtener miembros",
        data: null,
        timestamp: new Date().toISOString(),
        traceId: null,
      };
    }
  };

  /**
   * Obtiene TODOS los miembros (sin paginación)
   * Útil para exportación y estadísticas
   * GET /api/Miembros/GetAll
   */
  const getAllMembers = async (): Promise<ApiResponse<Member[]>> => {
    try {
      const url = `${API_URL}/api/Miembros/GetAll`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse<Member[]> = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener todos los miembros:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Error desconocido al obtener todos los miembros",
        data: null,
        timestamp: new Date().toISOString(),
        traceId: null,
      };
    }
  };

  /**
   * Obtiene un miembro por su ID
   * GET /api/Miembros/13
   */
  const getMember = async (id: number): Promise<ApiResponse<Member>> => {
    try {
      const url = `${API_URL}/api/Miembros/${id}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse<Member> = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el miembro:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Error desconocido al obtener el miembro",
        data: null,
        timestamp: new Date().toISOString(),
        traceId: null,
      };
    }
  };

  /**
   * Crea un nuevo miembro
   * POST /api/Miembros
   * Body: Member (sin el id, ya que se genera automáticamente)
   */
  const createMember = async (member: Omit<Member, "id">): Promise<ApiResponse<Member>> => {
    try {
      const url = `${API_URL}/api/Miembros`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
      });

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse<Member> = await response.json();
      return data;
    } catch (error) {
      console.error("Error al crear el miembro:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Error desconocido al crear el miembro",
        data: null,
        timestamp: new Date().toISOString(),
        traceId: null,
      };
    }
  };

  /**
   * Actualiza un miembro existente
   * PUT /api/Miembros/12
   * Body: { id: 12, dto: { ...member sin id } }
   */
  const updateMember = async (member: Member): Promise<ApiResponse<Member>> => {
    try {
      const { id, ...dto } = member;
      const url = `${API_URL}/api/Miembros/${id}`;
      
      // Según tu API, el body debe tener esta estructura
      const body = {
        id,
        dto,
      };

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse<Member> = await response.json();
      return data;
    } catch (error) {
      console.error("Error al actualizar el miembro:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Error desconocido al actualizar el miembro",
        data: null,
        timestamp: new Date().toISOString(),
        traceId: null,
      };
    }
  };

  /**
   * Elimina un miembro
   * DELETE /api/Miembros/12
   */
  const deleteMember = async (id: number): Promise<ApiResponse<null>> => {
    try {
      const url = `${API_URL}/api/Miembros/${id}`;
      
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      // Algunas APIs retornan contenido, otras no
      let data: ApiResponse<null>;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = {
          success: true,
          message: "Miembro eliminado exitosamente",
          data: null,
          timestamp: new Date().toISOString(),
          traceId: null,
        };
      }

      return data;
    } catch (error) {
      console.error("Error al eliminar el miembro:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Error desconocido al eliminar el miembro",
        data: null,
        timestamp: new Date().toISOString(),
        traceId: null,
      };
    }
  };

  return {
    getMembers,
    getAllMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember,
  };
};

export default useMember;
