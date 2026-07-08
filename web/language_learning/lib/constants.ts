export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;
export const QUERY_STALE_TIME = 5 * 60 * 1000;
export const QUERY_CACHE_TIME = 10 * 60 * 1000;

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  LESSONS: "/lessons",
  LESSON: (id: string) => `/lessons/${id}` as const,
  UNIT: (lessonId: string, unitId: string) =>
    `/lessons/${lessonId}/units/${unitId}` as const,
  PROFILE: "/profile",
  SETTINGS: "/settings",
  LOGIN: "/login",
  REGISTER: "/register",
} as const;

export const API_ENDPOINTS = {
  LESSONS: "/lessons",
  LESSON: (id: string) => `/lessons/${id}` as const,
  UNITS: (lessonId: string) => `/lessons/${lessonId}/units` as const,
  UNIT: (id: string) => `/units/${id}` as const,
  SECTIONS: (unitId: string) => `/units/${unitId}/sections` as const,
  EXERCISES: (sectionId: string) =>
    `/sections/${sectionId}/exercises` as const,
  EXERCISE: (id: string) => `/exercises/${id}` as const,
} as const;
