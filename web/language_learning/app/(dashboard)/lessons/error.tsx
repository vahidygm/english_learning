"use client";

import ErrorDisplay from "@/components/common/Error";

export default function LessonsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const message = error.message || "An unexpected error occurred. Please try again.";

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <ErrorDisplay message={message} onRetry={reset} />
    </div>
  );
}
