import Link from 'next/link';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LessonSummaryDTO } from '@/types';

interface LessonListProps {
  lessons: LessonSummaryDTO[];
}

export function LessonList({ lessons }: LessonListProps) {
  return (
    <div className="flex flex-col gap-3">
      {lessons.map((lesson) => (
        <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="block">
          <div
            className={cn(
              'flex flex-row items-center gap-4 rounded-xl border border-border bg-card p-3',
              'shadow-sm transition-shadow hover:shadow-md',
            )}
          >
            <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg">
              {lesson.coverImage ? (
                <Image
                  src={lesson.coverImage}
                  alt={lesson.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <BookOpen className="h-6 w-6 text-primary/40" />
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Lesson {lesson.lessonNumber}
                </span>
              </div>
              <h3 className="mt-1 truncate text-sm font-semibold text-foreground">
                {lesson.title}
              </h3>
            </div>

            <div className="flex flex-shrink-0 items-center gap-1.5 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>
                {lesson.unitCount} {lesson.unitCount === 1 ? 'unit' : 'units'}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
