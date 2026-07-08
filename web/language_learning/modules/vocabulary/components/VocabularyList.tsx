'use client';

import { BookOpen } from 'lucide-react';
import type { VocabularyDTO } from '@/types';

interface VocabularyListProps {
  items: VocabularyDTO[];
}

export function VocabularyList({ items }: VocabularyListProps) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {sorted.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-border bg-card p-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
              <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">{item.word}</h4>
                {item.category && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {item.category}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.meaning}
              </p>
              {item.example && (
                <p className="mt-1.5 text-sm italic text-muted-foreground/80">
                  &ldquo;{item.example}&rdquo;
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
