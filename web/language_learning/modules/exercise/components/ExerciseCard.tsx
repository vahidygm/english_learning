'use client';

import {
  Headphones,
  BookOpen,
  Mic,
  PenTool,
  Languages,
  BookA,
  Volume2,
  MessageSquare,
  TextCursorInput,
  ListChecks,
  ArrowRightLeft,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ExerciseDTO } from '@/types';
import { ExerciseType } from '@/types';

interface ExerciseCardProps {
  exercise: ExerciseDTO;
  onClick: (exercise: ExerciseDTO) => void;
}

const exerciseTypeConfig: Record<
  ExerciseType,
  { icon: React.ElementType; color: string; bg: string }
> = {
  [ExerciseType.Listening]: {
    icon: Headphones,
    color: 'text-violet-700 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-900/40',
  },
  [ExerciseType.Reading]: {
    icon: BookOpen,
    color: 'text-blue-700 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
  },
  [ExerciseType.Speaking]: {
    icon: Mic,
    color: 'text-rose-700 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-900/40',
  },
  [ExerciseType.Writing]: {
    icon: PenTool,
    color: 'text-amber-700 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/40',
  },
  [ExerciseType.Grammar]: {
    icon: Languages,
    color: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-900/40',
  },
  [ExerciseType.Vocabulary]: {
    icon: BookA,
    color: 'text-cyan-700 dark:text-cyan-400',
    bg: 'bg-cyan-100 dark:bg-cyan-900/40',
  },
  [ExerciseType.Pronunciation]: {
    icon: Volume2,
    color: 'text-pink-700 dark:text-pink-400',
    bg: 'bg-pink-100 dark:bg-pink-900/40',
  },
  [ExerciseType.Dialogue]: {
    icon: MessageSquare,
    color: 'text-indigo-700 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-900/40',
  },
  [ExerciseType.FillInTheBlank]: {
    icon: TextCursorInput,
    color: 'text-orange-700 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/40',
  },
  [ExerciseType.MultipleChoice]: {
    icon: ListChecks,
    color: 'text-teal-700 dark:text-teal-400',
    bg: 'bg-teal-100 dark:bg-teal-900/40',
  },
  [ExerciseType.Matching]: {
    icon: ArrowRightLeft,
    color: 'text-fuchsia-700 dark:text-fuchsia-400',
    bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/40',
  },
  [ExerciseType.TrueFalse]: {
    icon: CheckCircle2,
    color: 'text-lime-700 dark:text-lime-400',
    bg: 'bg-lime-100 dark:bg-lime-900/40',
  },
};

export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  const config = exerciseTypeConfig[exercise.type] ?? {
    icon: BookOpen,
    color: 'text-muted-foreground',
    bg: 'bg-muted',
  };
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={() => onClick(exercise)}
      className={cn(
        'group flex w-full items-start gap-4 rounded-lg border border-border bg-card p-4',
        'text-left transition-all hover:border-primary/30 hover:shadow-sm',
      )}
    >
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
          config.bg,
        )}
      >
        <Icon className={cn('h-5 w-5', config.color)} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            #{exercise.number}
          </span>
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
              config.bg,
              config.color,
            )}
          >
            {exercise.type}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">
          {exercise.title}
        </h3>

        {exercise.instruction && (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {exercise.instruction}
          </p>
        )}
      </div>
    </button>
  );
}
