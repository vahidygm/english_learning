import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type {
  ApiPaginatedResponse,
  ApiResponse,
  LessonSummaryDTO,
  LessonDetailDTO,
} from '@/types';

export async function fetchLessons(
  params?: { page?: number; pageSize?: number },
): Promise<LessonSummaryDTO[]> {
  const response = await apiClient.get<ApiPaginatedResponse<LessonSummaryDTO>>(
    API_ENDPOINTS.LESSONS,
    { params },
  );
  return response.data.data.items;
}

export async function fetchLesson(id: number): Promise<LessonDetailDTO> {
  const response = await apiClient.get<ApiResponse<LessonDetailDTO>>(
    API_ENDPOINTS.LESSON(id),
  );
  return response.data.data;
}
