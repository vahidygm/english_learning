'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Target } from 'lucide-react';
import { useLesson, LessonHeader } from '@/modules/lesson';
import { UnitCard } from '@/modules/unit';
import { ROUTES } from '@/lib/constants';

interface LessonDetailPageProps {
  params: Promise<{ lessonId: string }>;
}

export default function LessonDetailPage(props: LessonDetailPageProps) {
  const params = use(props.params);
  const lessonId = Number(params.lessonId);
  const { data: lesson, isLoading, error } = useLesson(lessonId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-lg border border-border bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="space-y-4">
        <Link
          href={ROUTES.LESSONS}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Lessons
        </Link>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          Failed to load lesson. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        href={ROUTES.LESSONS}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Lessons
      </Link>

      <LessonHeader lesson={lesson} />

      {/* Objectives */}
      {lesson.objectives.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Learning Objectives
            </h2>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                    Unit
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                    Skill
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                    Grammar
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                    Vocabulary
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                    Pronunciation
                  </th>
                </tr>
              </thead>
              <tbody>
                {lesson.objectives.map((obj) => (
                  <tr key={obj.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 font-medium text-foreground">
                      {obj.unitCode}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {obj.skill ?? '—'}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {obj.grammar ?? '—'}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {obj.vocabulary ?? '—'}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {obj.pronunciation ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Units */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Units ({lesson.units.length})
        </h2>
        {lesson.units.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No units available for this lesson.
          </p>
        ) : (
          <div className="space-y-3">
            {lesson.units.map((unit) => (
              <UnitCard key={unit.id} unit={unit} lessonId={lesson.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
