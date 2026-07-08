'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Layers, BookText, Languages, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UnitSummaryDTO } from '@/types';

interface UnitCardProps {
  unit: UnitSummaryDTO;
  lessonId: number;
}

export function UnitCard({ unit, lessonId }: UnitCardProps) {
  return (
    <Link href={`/lessons/${lessonId}/units/${unit.id}`} className="block">
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          'overflow-hidden rounded-lg bg-card shadow-sm',
          'border border-border transition-shadow hover:shadow-md',
        )}
      >
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                {unit.code}
              </span>
              <h3 className="text-base font-semibold text-foreground">
                {unit.title}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Layers className="h-4 w-4" />
              <span>
                {unit.sectionCount}{' '}
                {unit.sectionCount === 1 ? 'section' : 'sections'}
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {unit.grammarSummary && (
              <div className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <BookText className="h-3 w-3" />
                <span className="line-clamp-1">{unit.grammarSummary}</span>
              </div>
            )}
            {unit.vocabularySummary && (
              <div className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs text-green-700 dark:bg-green-950 dark:text-green-300">
                <Languages className="h-3 w-3" />
                <span className="line-clamp-1">{unit.vocabularySummary}</span>
              </div>
            )}
            {unit.pronunciationSummary && (
              <div className="flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                <Volume2 className="h-3 w-3" />
                <span className="line-clamp-1">
                  {unit.pronunciationSummary}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
