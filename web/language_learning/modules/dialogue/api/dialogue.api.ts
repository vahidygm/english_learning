import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { ApiListResponse } from '@/types';
import type { DialogueDTO } from '@/types';

export async function fetchDialogue(
  exerciseId: number,
): Promise<DialogueDTO[]> {
  const response = await apiClient.get<ApiListResponse<DialogueDTO>>(
    `${API_ENDPOINTS.EXERCISE(exerciseId)}/dialogues`,
  );
  return response.data.data;
}
