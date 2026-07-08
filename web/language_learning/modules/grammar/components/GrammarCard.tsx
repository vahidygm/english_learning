import { Languages } from 'lucide-react';
import type { GrammarDTO } from '@/types';
import { GrammarRule } from './GrammarRule';
import { GrammarExample } from './GrammarExample';

interface GrammarCardProps {
  grammar: GrammarDTO;
}

export function GrammarCard({ grammar }: GrammarCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
          <Languages className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">
          {grammar.topic}
        </h3>
      </div>

      <GrammarRule rule={grammar.rule} topic={grammar.topic} />

      {grammar.example && (
        <div className="mt-3">
          <GrammarExample example={grammar.example} />
        </div>
      )}
    </div>
  );
}
