import { apiClient } from './apiClient';
import type { Member, ApiResponse, PaginatedResponse } from '../../types';

/**
 * Member Service - API calls for member management
 */
export const memberService = {
  /**
   * Get all members
   */
  getMembers: async (page = 1, limit = 10): Promise<PaginatedResponse<Member>> => {
    return apiClient.get<PaginatedResponse<Member>>(`/members?page=${page}&limit=${limit}`);
  },

  /**
   * Get member by ID
   */
  getMemberById: async (id: string): Promise<ApiResponse<Member>> => {
    return apiClient.get<ApiResponse<Member>>(`/members/${id}`);
  },

  /**
   * Create new member
   */
  createMember: async (member: Omit<Member, 'id'>): Promise<ApiResponse<Member>> => {
    return apiClient.post<ApiResponse<Member>>('/members', member);
  },

  /**
   * Update member
   */
  updateMember: async (id: string, member: Partial<Member>): Promise<ApiResponse<Member>> => {
    return apiClient.put<ApiResponse<Member>>(`/members/${id}`, member);
  },

  /**
   * Delete member
   */
  deleteMember: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/members/${id}`);
  },

  /**
   * Search members
   */
  searchMembers: async (query: string): Promise<ApiResponse<Member[]>> => {
    return apiClient.get<ApiResponse<Member[]>>(`/members/search?q=${encodeURIComponent(query)}`);
  },
};
