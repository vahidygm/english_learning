import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  lines?: number;
  className?: string;
}

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
    />
  );
}

export function SkeletonCard({ lines = 3, className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 shadow-sm',
        className
      )}
    >
      {/* Title skeleton */}
      <SkeletonPulse className="mb-4 h-5 w-2/5" />

      {/* Content lines */}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonPulse
            key={i}
            className={cn(
              'h-3.5',
              i === lines - 1 ? 'w-3/5' : 'w-full'
            )}
          />
        ))}
      </div>

      {/* Footer skeleton */}
      <div className="mt-6 flex items-center justify-between">
        <SkeletonPulse className="h-8 w-24 rounded-lg" />
        <SkeletonPulse className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  );
}
