import { LessonCard } from './LessonCard';
import type { LessonSummaryDTO } from '@/types';

interface LessonGridProps {
  lessons: LessonSummaryDTO[];
}

export function LessonGrid({ lessons }: LessonGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
