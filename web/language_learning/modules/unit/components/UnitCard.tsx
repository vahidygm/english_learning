'use client';

import Link from 'next/link';
import { BookOpen, Languages, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

interface UnitCardProps {
  unit: {
    id: number;
    code: string;
    title: string;
    grammarSummary: string | null;
    vocabularySummary: string | null;
    pronunciationSummary: string | null;
  };
  lessonId: number;
}

export function UnitCard({ unit, lessonId }: UnitCardProps) {
  return (
    <Link href={ROUTES.UNIT_DETAIL(lessonId, unit.id)}>
      <div
        className={cn(
          'group rounded-xl border border-border bg-card p-5',
          'transition-all duration-200',
          'hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5',
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {unit.title}
          </h3>
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
              'bg-primary/10 text-primary',
            )}
          >
            {unit.code}
          </span>
        </div>

        <div className="space-y-2">
          {unit.grammarSummary && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
              <span className="line-clamp-2">{unit.grammarSummary}</span>
            </div>
          )}
          {unit.vocabularySummary && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Languages className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
              <span className="line-clamp-2">{unit.vocabularySummary}</span>
            </div>
          )}
          {unit.pronunciationSummary && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Volume2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
              <span className="line-clamp-2">{unit.pronunciationSummary}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
