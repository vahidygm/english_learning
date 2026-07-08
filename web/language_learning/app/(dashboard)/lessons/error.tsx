"use client";

import { ErrorDisplay } from "@/components/common/Error";

export default function LessonsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <ErrorDisplay error={error} onRetry={reset} />
    </div>
  );
}
