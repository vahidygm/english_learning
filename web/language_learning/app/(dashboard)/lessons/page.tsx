'use client';

import { BookOpen } from 'lucide-react';
import {
  useLessons,
  LessonGrid,
  LessonSkeleton,
  LessonEmpty,
} from '@/modules/lesson';

export default function LessonsPage() {
  const { data: lessons, isLoading, error } = useLessons();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lessons</h1>
          <p className="text-sm text-muted-foreground">
            Browse and start learning
          </p>
        </div>
      </div>

      {isLoading && <LessonSkeleton />}

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          Failed to load lessons. Please try again later.
        </div>
      )}

      {!isLoading && !error && lessons && lessons.length === 0 && (
        <LessonEmpty />
      )}

      {!isLoading && !error && lessons && lessons.length > 0 && (
        <LessonGrid lessons={lessons} />
      )}
    </div>
  );
}
