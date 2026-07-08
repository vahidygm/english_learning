"use client";

import { useCallback, useMemo } from "react";

import { apiClient } from "@/lib/api";
import type { HttpRequestConfig } from "@/lib/http/types";

export function useApi() {
  const get = useCallback(
    async <T>(url: string, config?: HttpRequestConfig): Promise<T> => {
      const response = await apiClient.get<T>(url, {
        params: config?.params,
        headers: config?.headers,
        signal: config?.signal,
      });
      return response.data;
    },
    [],
  );

  const post = useCallback(
    async <T, D = unknown>(
      url: string,
      data?: D,
      config?: HttpRequestConfig,
    ): Promise<T> => {
      const response = await apiClient.post<T>(url, data, {
        params: config?.params,
        headers: config?.headers,
        signal: config?.signal,
      });
      return response.data;
    },
    [],
  );

  const put = useCallback(
    async <T, D = unknown>(
      url: string,
      data?: D,
      config?: HttpRequestConfig,
    ): Promise<T> => {
      const response = await apiClient.put<T>(url, data, {
        params: config?.params,
        headers: config?.headers,
        signal: config?.signal,
      });
      return response.data;
    },
    [],
  );

  const del = useCallback(
    async <T>(url: string, config?: HttpRequestConfig): Promise<T> => {
      const response = await apiClient.delete<T>(url, {
        params: config?.params,
        headers: config?.headers,
        signal: config?.signal,
      });
      return response.data;
    },
    [],
  );

  return useMemo(() => ({ get, post, put, del }), [get, post, put, del]);
}
