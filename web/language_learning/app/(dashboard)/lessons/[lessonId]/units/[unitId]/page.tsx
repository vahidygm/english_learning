'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useUnit, UnitHeader, SectionView } from '@/modules/unit';
import { ROUTES } from '@/lib/constants';

interface UnitDetailPageProps {
  params: Promise<{ lessonId: string; unitId: string }>;
}

export default function UnitDetailPage(props: UnitDetailPageProps) {
  const params = use(props.params);
  const lessonId = Number(params.lessonId);
  const unitId = Number(params.unitId);
  const { data: unit, isLoading, error } = useUnit(unitId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-6 w-64 animate-pulse rounded bg-muted" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-lg border border-border bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || !unit) {
    return (
      <div className="space-y-4">
        <Link
          href={ROUTES.LESSON_DETAIL(lessonId)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Lesson
        </Link>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          Failed to load unit. Please try again later.
        </div>
      </div>
    );
  }

  const sortedSections = [...unit.sections].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="space-y-8">
      <Link
        href={ROUTES.LESSON_DETAIL(lessonId)}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Lesson
      </Link>

      <UnitHeader unit={unit} />

      {sortedSections.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No sections available for this unit.
        </p>
      ) : (
        <div className="space-y-8">
          {sortedSections.map((section) => (
            <SectionView key={section.id} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}
