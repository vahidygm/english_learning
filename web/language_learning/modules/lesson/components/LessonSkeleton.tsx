import { cn } from '@/lib/utils';

interface LessonSkeletonProps {
  count?: number;
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="aspect-[16/10] w-full animate-pulse bg-muted" />
      <div className="p-4">
        <div className="h-5 w-3/4 animate-pulse rounded-md bg-muted" />
        <div className="mt-3 h-4 w-1/3 animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}

export function LessonSkeleton({ count = 8 }: LessonSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
