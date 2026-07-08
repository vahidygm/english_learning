import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type {
  ApiListResponse,
  ApiResponse,
  GetLessonsRequest,
  LessonDTO,
  LessonSummaryDTO,
} from '@/types';

export async function fetchLessons(
  params?: GetLessonsRequest,
): Promise<ApiListResponse<LessonSummaryDTO>> {
  const response = await apiClient.get<ApiListResponse<LessonSummaryDTO>>(
    API_ENDPOINTS.LESSONS,
    { params },
  );
  return response.data;
}

export async function fetchLesson(
  id: number,
): Promise<ApiResponse<LessonDTO>> {
  const response = await apiClient.get<ApiResponse<LessonDTO>>(
    `${API_ENDPOINTS.LESSONS}/${id}`,
  );
  return response.data;
}

export async function fetchLessonWithUnits(
  id: number,
): Promise<ApiResponse<LessonDTO>> {
  const response = await apiClient.get<ApiResponse<LessonDTO>>(
    `${API_ENDPOINTS.LESSONS}/${id}`,
    { params: { includeUnits: true } },
  );
  return response.data;
}
