"use client";

import { useLessons } from "@/hooks/useLessons";
import { useLessonStore } from "@/stores/lessonStore";
import { LessonHeader } from "@/components/lessons/LessonHeader";
import { LessonGrid } from "@/components/lessons/LessonGrid";
import { LessonList } from "@/components/lessons/LessonList";
import { LessonCard } from "@/components/lessons/LessonCard";
import { LessonSkeleton } from "@/components/lessons/LessonSkeleton";
import { LessonEmpty } from "@/components/lessons/LessonEmpty";
import { ROUTES } from "@/lib/constants";

export default function LessonsPage() {
  const { viewMode, filters } = useLessonStore();
  const { data: lessons, isLoading } = useLessons(filters);

  return (
    <div className="space-y-6">
      <LessonHeader />

      {isLoading ? (
        <LessonSkeleton count={8} />
      ) : !lessons || lessons.length === 0 ? (
        <LessonEmpty />
      ) : viewMode === "grid" ? (
        <LessonGrid>
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              href={ROUTES.LESSON(lesson.id)}
            />
          ))}
        </LessonGrid>
      ) : (
        <LessonList>
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              href={ROUTES.LESSON(lesson.id)}
            />
          ))}
        </LessonList>
      )}
    </div>
  );
}
