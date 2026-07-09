import type { ApiPaginatedResponse } from "@/types/api/response";

export function getNextPageParam<T>(
  lastPage: ApiPaginatedResponse<T>,
): number | undefined {
  const { page, totalPages } = lastPage.data;
  return page < totalPages ? page + 1 : undefined;
}

export function getPreviousPageParam<T>(
  firstPage: ApiPaginatedResponse<T>,
): number | undefined {
  const { page } = firstPage.data;
  return page > 1 ? page - 1 : undefined;
}
