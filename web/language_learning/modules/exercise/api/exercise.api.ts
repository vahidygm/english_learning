import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { ApiListResponse, ApiResponse } from '@/types';
import type { ExerciseDTO } from '@/types';

export async function fetchExercises(
  sectionId: number,
): Promise<ExerciseDTO[]> {
  const response = await apiClient.get<ApiListResponse<ExerciseDTO>>(
    API_ENDPOINTS.EXERCISES(sectionId),
  );
  return response.data.data;
}

export async function fetchExercise(id: number): Promise<ExerciseDTO> {
  const response = await apiClient.get<ApiResponse<ExerciseDTO>>(
    API_ENDPOINTS.EXERCISE(id),
  );
  return response.data.data;
}

export async function submitAnswer(
  exerciseId: number,
  questionId: number,
  answer: string,
): Promise<{ correct: boolean; feedback?: string }> {
  const response = await apiClient.post<
    ApiResponse<{ correct: boolean; feedback?: string }>
  >(`${API_ENDPOINTS.EXERCISE(exerciseId)}/questions/${questionId}/submit`, {
    answer,
  });
  return response.data.data;
}
