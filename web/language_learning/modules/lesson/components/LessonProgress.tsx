'use client';

interface LessonProgressProps {
  current: number;
  total: number;
}

export function LessonProgress({ current, total }: LessonProgressProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-muted-foreground">
        {percentage}%
      </span>
    </div>
  );
}
