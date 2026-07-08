import { Quote } from 'lucide-react';

interface GrammarExampleProps {
  example: string;
}

export function GrammarExample({ example }: GrammarExampleProps) {
  return (
    <div className="flex items-start gap-2 rounded-md bg-muted/50 px-4 py-3">
      <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <p className="text-sm italic leading-relaxed text-muted-foreground">
        {example}
      </p>
    </div>
  );
}
