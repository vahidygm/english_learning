'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { fetchLessons } from '../api/lesson.api';
import type { GetLessonsRequest } from '@/types';

export function useLessons(params?: GetLessonsRequest) {
  const query = useQuery({
    queryKey: queryKeys.lessons.list(params),
    queryFn: () => fetchLessons(params),
  });

  return {
    ...query,
    lessons: query.data,
  };
}
