'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/queryKeys';
import { fetchUnit } from '../api/unit.api';

export function useUnit(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.units.detail(id),
    queryFn: () => fetchUnit(id),
    enabled: (options?.enabled ?? true) && id > 0,
  });
}
