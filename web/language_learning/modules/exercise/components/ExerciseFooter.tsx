'use client';

import { ChevronLeft, ChevronRight, Loader2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseFooterProps {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  isSubmitting: boolean;
}

export function ExerciseFooter({
  onPrev,
  onNext,
  onSubmit,
  hasPrev,
  hasNext,
  isSubmitting,
}: ExerciseFooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-border bg-card px-4 py-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={!hasPrev}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
          hasPrev
            ? 'text-foreground hover:bg-muted'
            : 'cursor-not-allowed text-muted-foreground/50',
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors',
          isSubmitting
            ? 'cursor-not-allowed opacity-70'
            : 'hover:bg-primary/90',
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
          hasNext
            ? 'text-foreground hover:bg-muted'
            : 'cursor-not-allowed text-muted-foreground/50',
        )}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
