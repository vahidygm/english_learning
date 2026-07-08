'use client';

import type { ExerciseDTO } from '@/types';
import { QuestionList } from '../QuestionList';

interface MatchingExerciseProps {
  exercise: ExerciseDTO;
}

export function MatchingExercise({ exercise }: MatchingExerciseProps) {
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
