'use client';

import type { ExerciseDTO } from '@/types';
import { Instruction } from '../Instruction';
import { QuestionList } from '../QuestionList';
import { MediaGallery } from '../MediaGallery';
import { TableRenderer } from '../TableRenderer';

interface DefaultExerciseProps {
  exercise: ExerciseDTO;
}

export function DefaultExercise({ exercise }: DefaultExerciseProps) {
  return (
    <div className="space-y-4">
      <Instruction text={exercise.instruction} />

      {exercise.media.length > 0 && <MediaGallery media={exercise.media} />}

      {exercise.tables.length > 0 && (
        <TableRenderer tables={exercise.tables} />
      )}

      {exercise.questions.length > 0 && (
        <QuestionList questions={exercise.questions} />
      )}
    </div>
  );
}
