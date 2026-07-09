'use client';

import { useMemo, type ComponentType } from 'react';
import {
  BookOpen,
  Headphones,
  MessageSquare,
  Mic,
  PenLine,
  CircleDot,
  Link2,
  CheckCircle2,
  Lightbulb,
  Volume2,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { ExerciseType } from '@/types';
import type { ExerciseDTO } from '@/types';

import { MediaGallery } from './MediaGallery';
import { TableRenderer } from './TableRenderer';
import { Instruction } from './Instruction';
import { DefaultExercise } from './renderers/DefaultExercise';
import { DialogueExercise } from './renderers/DialogueExercise';
import { VocabularyExercise } from './renderers/VocabularyExercise';
import { GrammarExercise } from './renderers/GrammarExercise';
import { ListeningExercise } from './renderers/ListeningExercise';
import { FillBlankExercise } from './renderers/FillBlankExercise';
import { MultipleChoiceExercise } from './renderers/MultipleChoiceExercise';
import { MatchingExercise } from './renderers/MatchingExercise';

// ---------------------------------------------------------------------------
// Type badge configuration
// ---------------------------------------------------------------------------

const TYPE_CONFIG: Record<
  string,
  { label: string; icon: ComponentType<{ className?: string }>; color: string }
> = {
  [ExerciseType.Listening]: {
    label: 'Listening',
    icon: Headphones,
    color: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  },
  [ExerciseType.Reading]: {
    label: 'Reading',
    icon: BookOpen,
    color:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  [ExerciseType.Speaking]: {
    label: 'Speaking',
    icon: Mic,
    color:
      'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  },
  [ExerciseType.Writing]: {
    label: 'Writing',
    icon: PenLine,
    color:
      'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  },
  [ExerciseType.Grammar]: {
    label: 'Grammar',
    icon: Lightbulb,
    color:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  },
  [ExerciseType.Vocabulary]: {
    label: 'Vocabulary',
    icon: BookOpen,
    color:
      'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  },
  [ExerciseType.Pronunciation]: {
    label: 'Pronunciation',
    icon: Volume2,
    color:
      'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  },
  [ExerciseType.Dialogue]: {
    label: 'Dialogue',
    icon: MessageSquare,
    color:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  },
  [ExerciseType.FillInTheBlank]: {
    label: 'Fill in the Blank',
    icon: PenLine,
    color:
      'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  },
  [ExerciseType.MultipleChoice]: {
    label: 'Multiple Choice',
    icon: CircleDot,
    color:
      'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  },
  [ExerciseType.Matching]: {
    label: 'Matching',
    icon: Link2,
    color:
      'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  },
  [ExerciseType.TrueFalse]: {
    label: 'True / False',
    icon: CheckCircle2,
    color:
      'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
  },
};

// ---------------------------------------------------------------------------
// Renderer plugin registry
// ---------------------------------------------------------------------------

const RENDERER_REGISTRY: Partial<
  Record<ExerciseType, ComponentType<{ exercise: ExerciseDTO }>>
> = {
  [ExerciseType.Dialogue]: DialogueExercise,
  [ExerciseType.Vocabulary]: VocabularyExercise,
  [ExerciseType.Grammar]: GrammarExercise,
  [ExerciseType.Listening]: ListeningExercise,
  [ExerciseType.FillInTheBlank]: FillBlankExercise,
  [ExerciseType.MultipleChoice]: MultipleChoiceExercise,
  [ExerciseType.Matching]: MatchingExercise,
};

// ---------------------------------------------------------------------------
// ExerciseRenderer
// ---------------------------------------------------------------------------

interface ExerciseRendererProps {
  exercise: ExerciseDTO;
  className?: string;
}

export function ExerciseRenderer({ exercise, className }: ExerciseRendererProps) {
  const config = TYPE_CONFIG[exercise.type] ?? {
    label: exercise.type,
    icon: HelpCircle,
    color: 'bg-muted text-muted-foreground',
  };

  const Icon = config.icon;
  const Renderer = RENDERER_REGISTRY[exercise.type] ?? DefaultExercise;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/40 px-5 py-3.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
          {exercise.number}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {exercise.title}
          </h3>
        </div>

        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide',
            config.color
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {config.label}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <Renderer exercise={exercise} />
      </div>
    </motion.div>
  );
}
