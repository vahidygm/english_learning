'use client';

import { Headphones, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { ExerciseDTO } from '@/types';
import { Instruction } from '../Instruction';
import { MediaGallery } from '../MediaGallery';
import { QuestionList } from '../QuestionList';
import { TableRenderer } from '../TableRenderer';

interface ListeningExerciseProps {
  exercise: ExerciseDTO;
}

export function ListeningExercise({ exercise }: ListeningExerciseProps) {
  const hasAudioMedia = exercise.media.some((m) => m.type === 'audio');

  return (
    <div className="space-y-4">
      <Instruction text={exercise.instruction} />

      {exercise.media.length > 0 && <MediaGallery media={exercise.media} />}

      {!hasAudioMedia && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Headphones className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              Audio Track
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Listen to the audio to complete this exercise
            </p>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <Play className="h-5 w-5 ml-0.5" />
          </button>
        </motion.div>
      )}

      {exercise.tables.length > 0 && (
        <TableRenderer tables={exercise.tables} />
      )}

      {exercise.questions.length > 0 && (
        <QuestionList questions={exercise.questions} />
      )}
    </div>
  );
}
