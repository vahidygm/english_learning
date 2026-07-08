'use client';

import type { ExerciseDTO } from '@/types';
import { DialogueView } from '@/modules/dialogue';

interface DialogueExerciseProps {
  exercise: ExerciseDTO;
}

export function DialogueExercise({ exercise }: DialogueExerciseProps) {
  return (
    <div>
      {exercise.instruction && (
        <p className="mb-4 text-sm text-muted-foreground">
          {exercise.instruction}
        </p>
      )}
      {exercise.dialogues.map((dialogue) => (
        <DialogueView key={dialogue.id} dialogue={dialogue} />
      ))}
    </div>
  );
}
