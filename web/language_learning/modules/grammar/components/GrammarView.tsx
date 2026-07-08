'use client';

import { BookText } from 'lucide-react';
import type { GrammarDTO } from '@/types';

interface GrammarViewProps {
  items: GrammarDTO[];
}

export function GrammarView({ items }: GrammarViewProps) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      {sorted.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-800 dark:bg-blue-950/50"
        >
          <div className="flex items-center gap-2">
            <BookText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">
              {item.topic}
            </h4>
          </div>
          <p className="mt-2 text-sm text-blue-800 dark:text-blue-200">
            {item.rule}
          </p>
          {item.example && (
            <div className="mt-2 rounded bg-white/60 px-3 py-2 dark:bg-blue-900/30">
              <p className="text-sm italic text-blue-700 dark:text-blue-300">
                Example: {item.example}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
