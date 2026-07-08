export const queryKeys = {
  lessons: {
    all: ['lessons'] as const,
    lists: () => [...queryKeys.lessons.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.lessons.lists(), params] as const,
    details: () => [...queryKeys.lessons.all, 'detail'] as const,
    detail: (id: number | string) =>
      [...queryKeys.lessons.details(), id] as const,
  },
  units: {
    all: ['units'] as const,
    lists: () => [...queryKeys.units.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.units.lists(), params] as const,
    details: () => [...queryKeys.units.all, 'detail'] as const,
    detail: (id: number | string) =>
      [...queryKeys.units.details(), id] as const,
  },
  sections: {
    all: ['sections'] as const,
    details: () => [...queryKeys.sections.all, 'detail'] as const,
    detail: (id: number | string) =>
      [...queryKeys.sections.details(), id] as const,
  },
  exercises: {
    all: ['exercises'] as const,
    details: () => [...queryKeys.exercises.all, 'detail'] as const,
    detail: (id: number | string) =>
      [...queryKeys.exercises.details(), id] as const,
  },
} as const;
