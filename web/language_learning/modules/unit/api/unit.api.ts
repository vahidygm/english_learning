import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { ApiResponse, UnitDetailDTO } from '@/types';

export async function fetchUnit(id: number): Promise<UnitDetailDTO> {
  const response = await apiClient.get<ApiResponse<UnitDetailDTO>>(
    API_ENDPOINTS.UNIT(id),
  );
  return response.data.data;
}
