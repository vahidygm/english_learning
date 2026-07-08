import { QueryClient } from "@tanstack/react-query";

import { QUERY_STALE_TIME, QUERY_CACHE_TIME } from "@/lib/constants";

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME,
        gcTime: QUERY_CACHE_TIME,
        retry: 2,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
