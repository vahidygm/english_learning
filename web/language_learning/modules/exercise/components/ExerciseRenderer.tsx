'use client';

import type { ComponentType } from 'react';
import { ClipboardList } from 'lucide-react';
import type { ExerciseDTO } from '@/types';
import { DefaultExercise } from './renderers/DefaultExercise';
import { MultipleChoiceExercise } from './renderers/MultipleChoiceExercise';
import { FillBlankExercise } from './renderers/FillBlankExercise';
import { DialogueExercise } from './renderers/DialogueExercise';
import { VocabularyExercise } from './renderers/VocabularyExercise';
import { GrammarExercise } from './renderers/GrammarExercise';
import { ListeningExercise } from './renderers/ListeningExercise';
import { MatchingExercise } from './renderers/MatchingExercise';

const rendererRegistry = new Map<
  string,
  ComponentType<{ exercise: ExerciseDTO }>
>([
  ['multiple_choice', MultipleChoiceExercise],
  ['fill_blank', FillBlankExercise],
  ['fill_in_the_blank', FillBlankExercise],
  ['dialogue', DialogueExercise],
  ['conversation', DialogueExercise],
  ['vocabulary', VocabularyExercise],
  ['grammar', GrammarExercise],
  ['listening', ListeningExercise],
  ['matching', MatchingExercise],
]);

interface ExerciseRendererProps {
  exercise: ExerciseDTO;
}

export function ExerciseRenderer({ exercise }: ExerciseRendererProps) {
  const Renderer =
    rendererRegistry.get(exercise.type.toLowerCase()) ?? DefaultExercise;

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <ClipboardList className="h-5 w-5 text-primary" />
        <h3 className="text-base font-semibold text-foreground">
          {exercise.number}. {exercise.title}
        </h3>
        <span className="ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {exercise.type}
        </span>
      </div>
      <Renderer exercise={exercise} />
    </div>
  );
}
