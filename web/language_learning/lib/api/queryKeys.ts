export const queryKeys = {
  lessons: {
    all: ["lessons"] as const,
    lists: () => [...queryKeys.lessons.all, "list"] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.lessons.lists(), params] as const,
    details: () => [...queryKeys.lessons.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.lessons.details(), id] as const,
  },
  units: {
    all: ["units"] as const,
    byLesson: (lessonId: string) =>
      [...queryKeys.units.all, "lesson", lessonId] as const,
    details: () => [...queryKeys.units.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.units.details(), id] as const,
  },
  sections: {
    all: ["sections"] as const,
    byUnit: (unitId: string) =>
      [...queryKeys.sections.all, "unit", unitId] as const,
  },
  exercises: {
    all: ["exercises"] as const,
    bySection: (sectionId: string) =>
      [...queryKeys.exercises.all, "section", sectionId] as const,
    details: () => [...queryKeys.exercises.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.exercises.details(), id] as const,
  },
} as const;
