'use client';

import { BookOpen } from 'lucide-react';

export function LessonEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <BookOpen className="h-16 w-16 text-muted-foreground/40" />
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        No lessons yet
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Lessons will appear here once they are available.
      </p>
    </div>
  );
}
