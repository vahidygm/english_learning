import { cn } from '@/lib/utils';

interface UnitProgressProps {
  completedSections: number;
  totalSections: number;
}

export function UnitProgress({
  completedSections,
  totalSections,
}: UnitProgressProps) {
  const percentage =
    totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            percentage === 100 ? 'bg-green-500' : 'bg-primary',
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="shrink-0 text-sm font-medium text-muted-foreground">
        {completedSections}/{totalSections}
      </span>
    </div>
  );
}
