import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { ApiListResponse } from '@/types';
import type { GrammarDTO } from '@/types';

export async function fetchGrammar(
  exerciseId: number,
): Promise<GrammarDTO[]> {
  const response = await apiClient.get<ApiListResponse<GrammarDTO>>(
    `${API_ENDPOINTS.EXERCISE(exerciseId)}/grammars`,
  );
  return response.data.data;
}
