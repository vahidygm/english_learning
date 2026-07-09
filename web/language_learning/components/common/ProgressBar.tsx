'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  animated?: boolean;
}

const sizeClasses: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

const colorClasses: Record<string, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

export function ProgressBar({
  value,
  size = 'md',
  color = 'primary',
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="flex w-full items-center gap-3">
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-muted',
          sizeClasses[size]
        )}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {animated ? (
          <motion.div
            className={cn('h-full rounded-full', colorClasses[color])}
            initial={{ width: 0 }}
            animate={{ width: `${clampedValue}%` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        ) : (
          <div
            className={cn('h-full rounded-full', colorClasses[color])}
            style={{ width: `${clampedValue}%` }}
          />
        )}
      </div>
      {showLabel && (
        <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
}
