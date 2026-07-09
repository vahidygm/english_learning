'use client';

import { CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { ExerciseDTO } from '@/types';
import { Instruction } from '../Instruction';
import { MediaGallery } from '../MediaGallery';
import { TableRenderer } from '../TableRenderer';
import { QuestionList } from '../QuestionList';

interface MultipleChoiceExerciseProps {
  exercise: ExerciseDTO;
}

export function MultipleChoiceExercise({
  exercise,
}: MultipleChoiceExerciseProps) {
  return (
    <div className="space-y-4">
      <Instruction text={exercise.instruction} />

      {exercise.media.length > 0 && <MediaGallery media={exercise.media} />}

      {exercise.tables.length > 0 && (
        <TableRenderer tables={exercise.tables} />
      )}

      {exercise.questions.length > 0 && (
        <div className="space-y-3">
          {[...exercise.questions]
            .sort((a, b) => a.order - b.order)
            .map((q, i) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                className="rounded-xl border border-border/50 bg-card p-4 space-y-2"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/40 text-xs font-bold text-violet-700 dark:text-violet-300 mt-0.5">
                    {q.number}
                  </span>
                  <p className="text-sm text-foreground leading-relaxed">
                    {q.text}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
}
