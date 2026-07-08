import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface XPCardProps {
  xp: number;
  level?: number;
}

export function XPCard({ xp, level }: XPCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-500 dark:bg-yellow-500/10">
          <Star className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Total XP</p>
          <p className="text-2xl font-bold text-foreground">
            {xp.toLocaleString()}
          </p>
        </div>
      </div>

      {level !== undefined && (
        <div className="mt-3 border-t pt-3">
          <p className="text-xs text-muted-foreground">
            Level:{' '}
            <span className="font-medium text-foreground">{level}</span>
          </p>
        </div>
      )}
    </div>
  );
}
