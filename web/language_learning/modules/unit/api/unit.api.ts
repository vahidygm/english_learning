import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { ApiListResponse, ApiResponse } from '@/types';
import type { UnitDTO } from '@/types';

export async function fetchUnits(lessonId: number): Promise<UnitDTO[]> {
  const response = await apiClient.get<ApiListResponse<UnitDTO>>(
    API_ENDPOINTS.UNITS(lessonId),
  );
  return response.data.data;
}

export async function fetchUnit(id: number): Promise<UnitDTO> {
  const response = await apiClient.get<ApiResponse<UnitDTO>>(
    API_ENDPOINTS.UNIT(id),
  );
  return response.data.data;
}

export async function fetchUnitWithSections(id: number): Promise<UnitDTO> {
  const response = await apiClient.get<ApiResponse<UnitDTO>>(
    API_ENDPOINTS.UNIT(id),
    { params: { include: 'sections' } },
  );
  return response.data.data;
}
