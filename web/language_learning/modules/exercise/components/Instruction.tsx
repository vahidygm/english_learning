import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InstructionProps {
  text: string | null;
  className?: string;
}

export function Instruction({ text, className }: InstructionProps) {
  if (!text) return null;

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 px-4 py-3',
        className
      )}
    >
      <Info className="h-5 w-5 mt-0.5 shrink-0 text-blue-500 dark:text-blue-400" />
      <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
