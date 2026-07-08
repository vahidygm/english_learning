import type { AxiosInstance, AxiosError } from "axios";

import { ApiError } from "@/types/api/error";

export function setupInterceptors(instance: AxiosInstance): void {
  instance.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string; details?: unknown }>) => {
      if (error.response) {
        const { status, data } = error.response;
        throw new ApiError(
          status,
          data?.message ?? error.message ?? "An unexpected error occurred",
          data?.details,
        );
      }

      if (error.request) {
        throw new ApiError(
          0,
          "Network error. Please check your connection and try again.",
        );
      }

      throw new ApiError(0, error.message ?? "An unexpected error occurred");
    },
  );
}
