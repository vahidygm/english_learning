'use client';

import { BookOpen, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { ExerciseDTO } from '@/types';
import { Instruction } from '../Instruction';
import { MediaGallery } from '../MediaGallery';
import { QuestionList } from '../QuestionList';

interface VocabularyExerciseProps {
  exercise: ExerciseDTO;
}

export function VocabularyExercise({ exercise }: VocabularyExerciseProps) {
  const sorted = [...exercise.vocabulary].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <Instruction text={exercise.instruction} />

      {exercise.media.length > 0 && <MediaGallery media={exercise.media} />}

      {sorted.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sorted.map((vocab, i) => (
            <motion.div
              key={vocab.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="group rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-md transition-all p-4 space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {vocab.word}
                </h4>
                {vocab.category && (
                  <span className="inline-flex items-center gap-1 shrink-0 rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    <Tag className="h-3 w-3" />
                    {vocab.category}
                  </span>
                )}
              </div>

              <p className="text-sm font-medium text-foreground/80">
                {vocab.meaning}
              </p>

              {vocab.example && (
                <div className="flex items-start gap-2 rounded-lg bg-muted/30 px-3 py-2">
                  <BookOpen className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground/60" />
                  <p className="text-xs text-muted-foreground italic leading-relaxed">
                    {vocab.example}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {exercise.questions.length > 0 && (
        <QuestionList questions={exercise.questions} />
      )}
    </div>
  );
}
