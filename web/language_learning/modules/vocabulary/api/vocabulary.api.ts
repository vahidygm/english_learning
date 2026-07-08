import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { ApiListResponse } from '@/types';
import type { VocabularyDTO } from '@/types';

export async function fetchVocabulary(
  exerciseId: number,
): Promise<VocabularyDTO[]> {
  const response = await apiClient.get<ApiListResponse<VocabularyDTO>>(
    `${API_ENDPOINTS.EXERCISE(exerciseId)}/vocabularies`,
  );
  return response.data.data;
}
