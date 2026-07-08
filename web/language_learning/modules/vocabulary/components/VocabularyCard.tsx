import { BookA } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VocabularyDTO } from '@/types';

interface VocabularyCardProps {
  vocabulary: VocabularyDTO;
}

export function VocabularyCard({ vocabulary }: VocabularyCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-100 dark:bg-cyan-900/40">
            <BookA className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-400" />
          </div>
          <h4 className="text-sm font-bold text-foreground">
            {vocabulary.word}
          </h4>
        </div>
        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {vocabulary.category}
        </span>
      </div>

      <p className="mb-2 text-sm text-foreground">{vocabulary.meaning}</p>

      {vocabulary.example && (
        <p className="rounded-md bg-muted/50 px-3 py-2 text-xs italic text-muted-foreground">
          {vocabulary.example}
        </p>
      )}
    </div>
  );
}
