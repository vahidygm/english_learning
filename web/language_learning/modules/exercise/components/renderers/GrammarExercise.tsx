'use client';

import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { ExerciseDTO } from '@/types';
import { Instruction } from '../Instruction';
import { MediaGallery } from '../MediaGallery';
import { TableRenderer } from '../TableRenderer';
import { QuestionList } from '../QuestionList';

interface GrammarExerciseProps {
  exercise: ExerciseDTO;
}

export function GrammarExercise({ exercise }: GrammarExerciseProps) {
  const sorted = [...exercise.grammar].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <Instruction text={exercise.instruction} />

      {exercise.media.length > 0 && <MediaGallery media={exercise.media} />}

      {sorted.map((grammar, i) => (
        <motion.div
          key={grammar.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: i * 0.05 }}
          className="space-y-3"
        >
          <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            {grammar.topic}
          </h4>

          <div className="rounded-xl border border-amber-200/60 dark:border-amber-800/30 bg-amber-50/60 dark:bg-amber-950/20 px-4 py-3">
            <p className="text-sm text-foreground leading-relaxed">
              {grammar.rule}
            </p>
          </div>

          {grammar.example && (
            <div className="ml-4 border-l-2 border-muted-foreground/20 pl-4">
              <p className="text-sm italic text-muted-foreground leading-relaxed">
                {grammar.example}
              </p>
            </div>
          )}
        </motion.div>
      ))}

      {exercise.tables.length > 0 && (
        <TableRenderer tables={exercise.tables} />
      )}

      {exercise.questions.length > 0 && (
        <QuestionList questions={exercise.questions} />
      )}
    </div>
  );
}
