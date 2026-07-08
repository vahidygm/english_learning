import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { ApiListResponse } from '@/types';
import type { PronunciationDTO } from '@/types';

export async function fetchPronunciation(
  exerciseId: number,
): Promise<PronunciationDTO[]> {
  const response = await apiClient.get<ApiListResponse<PronunciationDTO>>(
    `${API_ENDPOINTS.EXERCISE(exerciseId)}/pronunciations`,
  );
  return response.data.data;
}
