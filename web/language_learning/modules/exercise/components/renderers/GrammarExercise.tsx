'use client';

import type { ExerciseDTO } from '@/types';
import { GrammarView } from '@/modules/grammar';

interface GrammarExerciseProps {
  exercise: ExerciseDTO;
}

export function GrammarExercise({ exercise }: GrammarExerciseProps) {
  return (
    <div>
      {exercise.instruction && (
        <p className="mb-4 text-sm text-muted-foreground">
          {exercise.instruction}
        </p>
      )}
      {exercise.grammar.length > 0 && (
        <GrammarView items={exercise.grammar} />
      )}
    </div>
  );
}
