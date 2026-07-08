import { cn } from '@/lib/utils';

interface SpeakerProps {
  name: string;
  side: 'left' | 'right';
}

export function Speaker({ name, side }: SpeakerProps) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        'flex shrink-0 flex-col items-center gap-1',
        side === 'right' && 'items-center',
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold',
          side === 'left'
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
        )}
      >
        {initials}
      </div>
      <span className="max-w-[60px] truncate text-[10px] font-medium text-muted-foreground">
        {name}
      </span>
    </div>
  );
}
