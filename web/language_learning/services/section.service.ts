import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { ApiResponse, ApiListResponse } from '@/types';
import type { SectionDto } from '@/types/dto/section';

export const sectionService = {
  async fetchSections(unitId: number | string): Promise<SectionDto[]> {
    const response = await apiClient.get<ApiListResponse<SectionDto>>(
      API_ENDPOINTS.SECTIONS(unitId)
    );
    return response.data.data;
  },

  async fetchSection(id: number | string): Promise<SectionDto> {
    const response = await apiClient.get<ApiResponse<SectionDto>>(
      API_ENDPOINTS.SECTION(id)
    );
    return response.data.data;
  },
};
