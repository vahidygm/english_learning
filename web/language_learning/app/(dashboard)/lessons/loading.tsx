import { LessonSkeleton } from "@/modules/lesson";

export default function LessonsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-muted" />
      <LessonSkeleton />
    </div>
  );
}
