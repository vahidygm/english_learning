'use client';

import { BookOpen } from 'lucide-react';
import type { LessonDetailDTO } from '@/types';

interface LessonHeaderProps {
  lesson: LessonDetailDTO;
}

export function LessonHeader({ lesson }: LessonHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Lesson {lesson.number}
          </p>
          <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
        </div>
      </div>
    </div>
  );
}
