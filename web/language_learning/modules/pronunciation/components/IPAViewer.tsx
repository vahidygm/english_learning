import { cn } from '@/lib/utils';

interface IPAViewerProps {
  ipa: string;
}

export function IPAViewer({ ipa }: IPAViewerProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-muted px-2.5 py-1',
        'font-mono text-sm tracking-wide text-foreground',
      )}
    >
      /{ipa}/
    </span>
  );
}
