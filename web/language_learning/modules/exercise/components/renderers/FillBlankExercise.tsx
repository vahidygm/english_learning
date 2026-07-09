'use client';

import { PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { ExerciseDTO } from '@/types';
import { Instruction } from '../Instruction';
import { MediaGallery } from '../MediaGallery';
import { TableRenderer } from '../TableRenderer';
import { QuestionList } from '../QuestionList';

interface FillBlankExerciseProps {
  exercise: ExerciseDTO;
}

export function FillBlankExercise({ exercise }: FillBlankExerciseProps) {
  const sorted = [...exercise.questions].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <Instruction text={exercise.instruction} />

      {exercise.media.length > 0 && <MediaGallery media={exercise.media} />}

      {exercise.tables.length > 0 && (
        <TableRenderer tables={exercise.tables} />
      )}

      {sorted.length > 0 && (
        <div className="space-y-3">
          {sorted.map((q, i) => {
            // Replace underscores/blanks with styled placeholder
            const parts = q.text.split(/(_+|\.{3,}|\[[\s_]*\])/g);

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                className="flex items-start gap-3 rounded-lg border border-border/40 bg-card/50 px-4 py-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                  {q.number}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-foreground leading-relaxed">
                    {parts.map((part, idx) =>
                      /^(_+|\.{3,}|\[[\s_]*\])$/.test(part) ? (
                        <span
                          key={idx}
                          className="inline-flex items-center mx-1"
                        >
                          <span className="inline-flex items-center gap-1 rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 px-4 py-0.5 text-xs text-primary/60">
                            <PenLine className="h-3 w-3" />
                          </span>
                        </span>
                      ) : (
                        <span key={idx}>{part}</span>
                      )
                    )}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
