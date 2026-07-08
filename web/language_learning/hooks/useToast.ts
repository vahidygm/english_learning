"use client";

import { useCallback, useMemo } from "react";
import { toast } from "sonner";

export function useToast() {
  const success = useCallback((message: string, description?: string) => {
    return toast.success(message, { description });
  }, []);

  const error = useCallback((message: string, description?: string) => {
    return toast.error(message, { description });
  }, []);

  const info = useCallback((message: string, description?: string) => {
    return toast.info(message, { description });
  }, []);

  const warning = useCallback((message: string, description?: string) => {
    return toast.warning(message, { description });
  }, []);

  const loading = useCallback((message: string, description?: string) => {
    return toast.loading(message, { description });
  }, []);

  const dismiss = useCallback((toastId?: string | number) => {
    toast.dismiss(toastId);
  }, []);

  return useMemo(
    () => ({ success, error, info, warning, loading, dismiss }),
    [success, error, info, warning, loading, dismiss],
  );
}
