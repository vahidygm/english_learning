import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  count?: number;
}

export function SectionTitle({ title, count }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {count !== undefined && (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full',
            'bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground'
          )}
        >
          {count}
        </span>
      )}
    </div>
  );
}
