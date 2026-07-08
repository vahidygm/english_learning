export const APP_NAME = 'English Learning';

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export const QUERY_STALE_TIME = 5 * 60 * 1000; // 5 minutes
export const QUERY_CACHE_TIME = 10 * 60 * 1000; // 10 minutes

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LESSONS: '/lessons',
  LESSON_DETAIL: (id: number | string) => `/lessons/${id}`,
  UNIT_DETAIL: (lessonId: number | string, unitId: number | string) =>
    `/lessons/${lessonId}/units/${unitId}`,
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export const API_ENDPOINTS = {
  HEALTH: '/api/v1/health',
  LESSONS: '/api/v1/lessons',
  LESSON: (id: number | string) => `/api/v1/lessons/${id}`,
  UNITS: '/api/v1/units',
  UNIT: (id: number | string) => `/api/v1/units/${id}`,
  MEDIA: (id: number | string) => `/api/v1/media/${id}`,
} as const;
