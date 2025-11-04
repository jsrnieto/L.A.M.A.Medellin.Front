/**
 * User type definition
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
}

/**
 * Member type definition
 */
export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

/**
 * API Response type
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}
