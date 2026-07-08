import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { ApiListResponse } from '@/types';
import type { MediaDTO } from '@/types';

export async function fetchMedia(exerciseId: number): Promise<MediaDTO[]> {
  const response = await apiClient.get<ApiListResponse<MediaDTO>>(
    `${API_ENDPOINTS.EXERCISE(exerciseId)}/media`,
  );
  return response.data.data;
}
