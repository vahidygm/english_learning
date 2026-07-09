"use client";

import ErrorDisplay from "@/components/common/Error";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const message = error.message || "An unexpected error occurred. Please try again.";

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <ErrorDisplay message={message} onRetry={reset} />
    </div>
  );
}
