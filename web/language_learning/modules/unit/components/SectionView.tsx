'use client';

import { Layers } from 'lucide-react';
import type { SectionDTO } from '@/types';
import { ExerciseRenderer } from '@/modules/exercise';

interface SectionViewProps {
  section: SectionDTO;
}

export function SectionView({ section }: SectionViewProps) {
  const sortedExercises = [...section.exercises].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <Layers className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">
          {section.name}
        </h2>
      </div>
      <div className="space-y-6">
        {sortedExercises.map((exercise) => (
          <ExerciseRenderer key={exercise.id} exercise={exercise} />
        ))}
        {sortedExercises.length === 0 && (
          <p className="py-4 text-sm text-muted-foreground">
            No exercises in this section.
          </p>
        )}
      </div>
    </div>
  );
}
