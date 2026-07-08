import type { PaginatedResponse } from "@/types/api/response";

export function getNextPageParam<T>(
  lastPage: PaginatedResponse<T>,
): number | undefined {
  const { page, totalPages } = lastPage.meta;
  return page < totalPages ? page + 1 : undefined;
}

export function getPreviousPageParam<T>(
  firstPage: PaginatedResponse<T>,
): number | undefined {
  const { page } = firstPage.meta;
  return page > 1 ? page - 1 : undefined;
}
