export const APP_NAME = 'English Learning';

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

export const QUERY_STALE_TIME = 5 * 60 * 1000; // 5 minutes
export const QUERY_CACHE_TIME = 30 * 60 * 1000; // 30 minutes

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LESSONS: '/lessons',
  LESSON_DETAIL: (id: number | string) => `/lessons/${id}`,
  UNIT_DETAIL: (lessonId: number | string, unitId: number | string) =>
    `/lessons/${lessonId}/units/${unitId}`,
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  LESSONS: '/lessons',
  LESSON: (id: number | string) => `/lessons/${id}`,
  UNITS: (lessonId: number | string) => `/lessons/${lessonId}/units`,
  UNIT: (id: number | string) => `/units/${id}`,
  SECTIONS: (unitId: number | string) => `/units/${unitId}/sections`,
  SECTION: (id: number | string) => `/sections/${id}`,
  EXERCISES: (sectionId: number | string) => `/sections/${sectionId}/exercises`,
  EXERCISE: (id: number | string) => `/exercises/${id}`,
} as const;
