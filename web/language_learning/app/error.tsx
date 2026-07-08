"use client";

import { ErrorDisplay } from "@/components/common/Error";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <ErrorDisplay error={error} onRetry={reset} />
    </div>
  );
}
