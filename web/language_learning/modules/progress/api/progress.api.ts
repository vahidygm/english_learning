import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { ApiResponse } from '@/types';

export interface LessonProgressDTO {
  lessonId: number;
  completedExercises: number;
  totalExercises: number;
  percentage: number;
}

export interface OverallProgressDTO {
  streak: number;
  xp: number;
  completedLessons: number;
  totalLessons: number;
  level: number;
}

export async function fetchLessonProgress(
  lessonId: number,
): Promise<LessonProgressDTO> {
  const response = await apiClient.get<ApiResponse<LessonProgressDTO>>(
    `${API_ENDPOINTS.LESSON(lessonId)}/progress`,
  );
  return response.data.data;
}

export async function fetchOverallProgress(): Promise<OverallProgressDTO> {
  const response = await apiClient.get<ApiResponse<OverallProgressDTO>>(
    '/progress',
  );
  return response.data.data;
}
