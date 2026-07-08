import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
} as const;

export function ProgressBar({ value, label, size = 'md' }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      {(label || clampedValue > 0) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && (
            <span className="font-medium text-foreground">{label}</span>
          )}
          <span className="text-muted-foreground">
            {Math.round(clampedValue)}%
          </span>
        </div>
      )}

      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-muted',
          sizeClasses[size],
        )}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn(
            'h-full rounded-full bg-primary transition-[width] duration-500 ease-out',
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
