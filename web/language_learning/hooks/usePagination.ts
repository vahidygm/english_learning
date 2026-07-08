"use client";

import { useCallback, useMemo, useState } from "react";

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  total?: number;
}

export function usePagination({
  initialPage = 1,
  initialLimit = 12,
  total = 0,
}: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimitState] = useState(initialLimit);

  const totalPages = useMemo(
    () => (total > 0 ? Math.ceil(total / limit) : 0),
    [total, limit],
  );

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const nextPage = useCallback(() => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const goToPage = useCallback(
    (target: number) => {
      const clamped = Math.max(1, Math.min(target, totalPages || 1));
      setPage(clamped);
    },
    [totalPages],
  );

  const setLimit = useCallback((newLimit: number) => {
    setLimitState(newLimit);
    setPage(1);
  }, []);

  return {
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage,
    setLimit,
  };
}
