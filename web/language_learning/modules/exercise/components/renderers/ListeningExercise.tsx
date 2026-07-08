'use client';

import type { ExerciseDTO } from '@/types';
import { MediaPlayer } from '@/modules/media';
import { QuestionList } from '../QuestionList';

interface ListeningExerciseProps {
  exercise: ExerciseDTO;
}

export function ListeningExercise({ exercise }: ListeningExerciseProps) {
  return (
    <div>
      {exercise.instruction && (
        <p className="mb-4 text-sm text-muted-foreground">
          {exercise.instruction}
        </p>
      )}
      {exercise.media.length > 0 && (
        <div className="mb-4 space-y-3">
          {exercise.media
            .sort((a, b) => a.order - b.order)
            .map((media) => (
              <MediaPlayer key={media.id} media={media} />
            ))}
        </div>
      )}
      {exercise.questions.length > 0 && (
        <QuestionList questions={exercise.questions} />
      )}
    </div>
  );
}
