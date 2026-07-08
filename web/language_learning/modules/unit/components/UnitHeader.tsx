'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

interface UnitHeaderProps {
  unit: {
    id: number;
    code: string;
    title: string;
  };
  lessonId: number;
}

export function UnitHeader({ unit, lessonId }: UnitHeaderProps) {
  return (
    <div className="mb-6">
      <Link
        href={ROUTES.LESSON_DETAIL(lessonId)}
        className={cn(
          'mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground',
          'transition-colors hover:text-foreground',
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Lesson
      </Link>

      <div className="flex items-center gap-3">
        <span
          className={cn(
            'inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold',
            'bg-primary/10 text-primary',
          )}
        >
          {unit.code}
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {unit.title}
        </h1>
      </div>
    </div>
  );
}
