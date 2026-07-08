'use client';

import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseToolbarProps {
  currentIndex: number;
  totalExercises: number;
  onHint: () => void;
}

export function ExerciseToolbar({
  currentIndex,
  totalExercises,
  onHint,
}: ExerciseToolbarProps) {
  const progress =
    totalExercises > 0
      ? Math.round(((currentIndex + 1) / totalExercises) * 100)
      : 0;

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-2.5">
      <span className="text-sm font-medium text-foreground">
        {currentIndex + 1}{' '}
        <span className="text-muted-foreground">/ {totalExercises}</span>
      </span>

      <div className="flex-1">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <span className="text-xs font-medium text-muted-foreground">
        {progress}%
      </span>

      <button
        type="button"
        onClick={onHint}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium',
          'text-amber-700 transition-colors hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/40',
        )}
      >
        <Lightbulb className="h-4 w-4" />
        Hint
      </button>
    </div>
  );
}
