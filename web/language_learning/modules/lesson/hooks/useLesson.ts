'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { fetchLesson, fetchLessonWithUnits } from '../api/lesson.api';

interface UseLessonOptions {
  includeUnits?: boolean;
  enabled?: boolean;
}

export function useLesson(id: number, options: UseLessonOptions = {}) {
  const { includeUnits = false, enabled = true } = options;

  const query = useQuery({
    queryKey: queryKeys.lessons.detail(id),
    queryFn: () =>
      includeUnits ? fetchLessonWithUnits(id) : fetchLesson(id),
    enabled: enabled && id > 0,
  });

  return {
    ...query,
    lesson: query.data,
  };
}
