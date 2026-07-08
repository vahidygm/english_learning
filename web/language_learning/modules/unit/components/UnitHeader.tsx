'use client';

import { BookText, Languages, Volume2 } from 'lucide-react';
import type { UnitDetailDTO } from '@/types';

interface UnitHeaderProps {
  unit: UnitDetailDTO;
}

export function UnitHeader({ unit }: UnitHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
          {unit.code}
        </span>
        <h1 className="text-2xl font-bold text-foreground">{unit.title}</h1>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {unit.grammarSummary && (
          <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
            <BookText className="mt-0.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                Grammar
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {unit.grammarSummary}
              </p>
            </div>
          </div>
        )}
        {unit.vocabularySummary && (
          <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
            <Languages className="mt-0.5 h-4 w-4 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-xs font-medium text-green-600 dark:text-green-400">
                Vocabulary
              </p>
              <p className="text-sm text-green-800 dark:text-green-200">
                {unit.vocabularySummary}
              </p>
            </div>
          </div>
        )}
        {unit.pronunciationSummary && (
          <div className="flex items-start gap-2 rounded-lg border border-purple-200 bg-purple-50 p-3 dark:border-purple-800 dark:bg-purple-950">
            <Volume2 className="mt-0.5 h-4 w-4 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-xs font-medium text-purple-600 dark:text-purple-400">
                Pronunciation
              </p>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                {unit.pronunciationSummary}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
