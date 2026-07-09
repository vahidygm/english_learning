'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { ExerciseDTO } from '@/types';
import { Instruction } from '../Instruction';
import { MediaGallery } from '../MediaGallery';
import { QuestionList } from '../QuestionList';

interface DialogueExerciseProps {
  exercise: ExerciseDTO;
}

const SPEAKER_COLORS = [
  {
    bg: 'bg-blue-100 dark:bg-blue-900/40',
    border: 'border-blue-200/60 dark:border-blue-800/40',
    text: 'text-blue-900 dark:text-blue-100',
    label: 'text-blue-600 dark:text-blue-400',
    align: 'items-start',
  },
  {
    bg: 'bg-emerald-100 dark:bg-emerald-900/40',
    border: 'border-emerald-200/60 dark:border-emerald-800/40',
    text: 'text-emerald-900 dark:text-emerald-100',
    label: 'text-emerald-600 dark:text-emerald-400',
    align: 'items-end',
  },
  {
    bg: 'bg-purple-100 dark:bg-purple-900/40',
    border: 'border-purple-200/60 dark:border-purple-800/40',
    text: 'text-purple-900 dark:text-purple-100',
    label: 'text-purple-600 dark:text-purple-400',
    align: 'items-start',
  },
  {
    bg: 'bg-amber-100 dark:bg-amber-900/40',
    border: 'border-amber-200/60 dark:border-amber-800/40',
    text: 'text-amber-900 dark:text-amber-100',
    label: 'text-amber-600 dark:text-amber-400',
    align: 'items-end',
  },
];

export function DialogueExercise({ exercise }: DialogueExerciseProps) {
  const speakerMap = new Map<string, number>();

  const getSpeakerColor = (speaker: string) => {
    if (!speakerMap.has(speaker)) {
      speakerMap.set(speaker, speakerMap.size);
    }
    const idx = speakerMap.get(speaker)!;
    return SPEAKER_COLORS[idx % SPEAKER_COLORS.length];
  };

  return (
    <div className="space-y-4">
      <Instruction text={exercise.instruction} />

      {exercise.media.length > 0 && <MediaGallery media={exercise.media} />}

      {exercise.dialogues.map((dialogue) => (
        <div key={dialogue.id} className="space-y-3">
          {dialogue.title && (
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {dialogue.title}
            </h4>
          )}

          <div className="space-y-2">
            {[...dialogue.lines]
              .sort((a, b) => a.order - b.order)
              .map((line, i) => {
                const color = getSpeakerColor(line.speaker);
                const isEven = (speakerMap.get(line.speaker) ?? 0) % 2 === 1;

                return (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, x: isEven ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className={cn('flex flex-col', color.align)}
                  >
                    <span
                      className={cn(
                        'text-xs font-medium mb-1 px-1',
                        color.label
                      )}
                    >
                      {line.speaker}
                    </span>
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl border px-4 py-2.5',
                        color.bg,
                        color.border,
                        isEven ? 'rounded-tr-sm' : 'rounded-tl-sm'
                      )}
                    >
                      <p className={cn('text-sm leading-relaxed', color.text)}>
                        {line.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      ))}

      {exercise.questions.length > 0 && (
        <QuestionList questions={exercise.questions} />
      )}
    </div>
  );
}
