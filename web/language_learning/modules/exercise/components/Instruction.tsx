import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface InstructionProps {
  text: string;
}

export function Instruction({ text }: InstructionProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-blue-200 bg-blue-50 px-4 py-3',
        'dark:border-blue-900/50 dark:bg-blue-950/30',
      )}
    >
      <div className="prose prose-sm max-w-none text-blue-900 dark:prose-invert dark:text-blue-200">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}
