'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/queryKeys';
import { fetchLessons } from '../api/lesson.api';

export function useLessons(params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: queryKeys.lessons.list(params ?? {}),
    queryFn: () => fetchLessons(params),
  });
}
