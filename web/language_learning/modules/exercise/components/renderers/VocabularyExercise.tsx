'use client';

import type { ExerciseDTO } from '@/types';
import { VocabularyList } from '@/modules/vocabulary';

interface VocabularyExerciseProps {
  exercise: ExerciseDTO;
}

export function VocabularyExercise({ exercise }: VocabularyExerciseProps) {
  return (
    <div>
      {exercise.instruction && (
        <p className="mb-4 text-sm text-muted-foreground">
          {exercise.instruction}
        </p>
      )}
      {exercise.vocabulary.length > 0 && (
        <VocabularyList items={exercise.vocabulary} />
      )}
    </div>
  );
}
