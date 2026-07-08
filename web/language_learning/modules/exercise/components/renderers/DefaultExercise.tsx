'use client';

import type { ExerciseDTO } from '@/types';
import { QuestionList } from '../QuestionList';

interface DefaultExerciseProps {
  exercise: ExerciseDTO;
}

export function DefaultExercise({ exercise }: DefaultExerciseProps) {
  return (
    <div>
      {exercise.instruction && (
        <p className="mb-4 text-sm text-muted-foreground">
          {exercise.instruction}
        </p>
      )}
      {exercise.questions.length > 0 && (
        <QuestionList questions={exercise.questions} />
      )}
    </div>
  );
}
