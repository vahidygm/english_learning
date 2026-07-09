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
        const message =
          data?.message ?? error.message ?? "An unexpected error occurred";
        throw new ApiError(
          message,
          status,
          message,
          data?.details as Record<string, unknown> | undefined,
        );
      }

      if (error.request) {
        throw new ApiError(
          "Network error. Please check your connection and try again.",
          0,
          "Network error",
        );
      }

      const message = error.message ?? "An unexpected error occurred";
      throw new ApiError(message, 0, message);
    },
  );
}
