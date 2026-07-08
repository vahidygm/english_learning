'use client';

import type { ExerciseDTO } from '@/types';
import { QuestionList } from '../QuestionList';

interface MultipleChoiceExerciseProps {
  exercise: ExerciseDTO;
}

export function MultipleChoiceExercise({
  exercise,
}: MultipleChoiceExerciseProps) {
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
