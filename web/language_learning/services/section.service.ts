import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { ApiResponse, ApiListResponse } from '@/types';
import type { SectionDTO } from '@/types/dto/section';

export const sectionService = {
  async fetchSections(unitId: number | string): Promise<SectionDTO[]> {
    const response = await apiClient.get<ApiListResponse<SectionDTO>>(
      API_ENDPOINTS.SECTIONS(unitId)
    );
    return response.data.data;
  },

  async fetchSection(id: number | string): Promise<SectionDTO> {
    const response = await apiClient.get<ApiResponse<SectionDTO>>(
      API_ENDPOINTS.SECTION(id)
    );
    return response.data.data;
  },
};
