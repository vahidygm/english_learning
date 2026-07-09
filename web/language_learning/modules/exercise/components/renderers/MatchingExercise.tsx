'use client';

import { Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { ExerciseDTO } from '@/types';
import { Instruction } from '../Instruction';
import { MediaGallery } from '../MediaGallery';
import { TableRenderer } from '../TableRenderer';
import { QuestionList } from '../QuestionList';

interface MatchingExerciseProps {
  exercise: ExerciseDTO;
}

export function MatchingExercise({ exercise }: MatchingExerciseProps) {
  return (
    <div className="space-y-4">
      <Instruction text={exercise.instruction} />

      {exercise.media.length > 0 && <MediaGallery media={exercise.media} />}

      {exercise.tables.length > 0 && (
        <TableRenderer tables={exercise.tables} />
      )}

      {exercise.questions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Link2 className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Match the items
            </span>
          </div>
          <QuestionList questions={exercise.questions} />
        </div>
      )}
    </div>
  );
}
