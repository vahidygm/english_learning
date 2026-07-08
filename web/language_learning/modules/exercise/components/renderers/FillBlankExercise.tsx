'use client';

import type { ExerciseDTO } from '@/types';
import { QuestionList } from '../QuestionList';

interface FillBlankExerciseProps {
  exercise: ExerciseDTO;
}

export function FillBlankExercise({ exercise }: FillBlankExerciseProps) {
  return (
    <div>
      {exercise.instruction && (
        <p className="mb-4 text-sm italic text-muted-foreground">
          {exercise.instruction}
        </p>
      )}
      {exercise.questions.length > 0 && (
        <QuestionList questions={exercise.questions} />
      )}
    </div>
  );
}
