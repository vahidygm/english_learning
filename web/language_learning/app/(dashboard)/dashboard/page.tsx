'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useLessons, LessonCard } from '@/modules/lesson';
import { ROUTES } from '@/lib/constants';

export default function DashboardPage() {
  const { data: lessons, isLoading } = useLessons({ page: 1, pageSize: 4 });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back! Continue your learning journey.
        </p>
      </div>

      {/* Recent Lessons */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Recent Lessons
            </h2>
          </div>
          <Link
            href={ROUTES.LESSONS}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-xl border border-border bg-card shadow-sm"
              >
                <div className="aspect-[16/10] w-full bg-muted" />
                <div className="space-y-3 p-4">
                  <div className="h-5 w-3/4 rounded bg-muted" />
                  <div className="h-4 w-1/3 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && lessons && lessons.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}

        {!isLoading && lessons && lessons.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">
              No lessons available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
