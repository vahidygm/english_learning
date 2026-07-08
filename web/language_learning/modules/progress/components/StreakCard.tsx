import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCardProps {
  streak: number;
  bestStreak?: number;
}

export function StreakCard({ streak, bestStreak }: StreakCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full',
            streak > 0
              ? 'bg-orange-100 text-orange-500 dark:bg-orange-500/10'
              : 'bg-muted text-muted-foreground',
          )}
        >
          <Flame className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Current Streak</p>
          <p className="text-2xl font-bold text-foreground">
            {streak} <span className="text-sm font-normal">days</span>
          </p>
        </div>
      </div>

      {bestStreak !== undefined && (
        <div className="mt-3 border-t pt-3">
          <p className="text-xs text-muted-foreground">
            Best streak:{' '}
            <span className="font-medium text-foreground">
              {bestStreak} days
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
