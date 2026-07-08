'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/queryKeys';
import { fetchLesson } from '../api/lesson.api';

export function useLesson(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.lessons.detail(id),
    queryFn: () => fetchLesson(id),
    enabled: (options?.enabled ?? true) && id > 0,
  });
}
