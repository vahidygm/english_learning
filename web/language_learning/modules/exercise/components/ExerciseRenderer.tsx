'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ExerciseDTO, QuestionDTO } from '@/types';
import { ExerciseType } from '@/types';
import { ExerciseHeader } from './ExerciseHeader';
import { Instruction } from './Instruction';
import { QuestionList } from './QuestionList';

interface ExerciseRendererProps {
  exercise: ExerciseDTO;
  answers: Record<number, string>;
  onAnswerChange: (questionId: number, answer: string) => void;
}

export function ExerciseRenderer({
  exercise,
  answers,
  onAnswerChange,
}: ExerciseRendererProps) {
  return (
    <div className="space-y-6">
      <ExerciseHeader exercise={exercise} />

      {exercise.instruction && (
        <Instruction text={exercise.instruction} />
      )}

      {renderContent(exercise, answers, onAnswerChange)}
    </div>
  );
}

function renderContent(
  exercise: ExerciseDTO,
  answers: Record<number, string>,
  onAnswerChange: (questionId: number, answer: string) => void,
) {
  switch (exercise.type) {
    case ExerciseType.FillInTheBlank:
    case ExerciseType.MultipleChoice:
    case ExerciseType.TrueFalse:
    case ExerciseType.Reading:
    case ExerciseType.Listening:
    case ExerciseType.Writing:
    case ExerciseType.Grammar:
      return exercise.questions && exercise.questions.length > 0 ? (
        <QuestionList
          questions={exercise.questions}
          answers={answers}
          onAnswerChange={onAnswerChange}
          exerciseType={exercise.type}
        />
      ) : (
        <EmptyState message="No questions available for this exercise." />
      );

    case ExerciseType.Dialogue:
      return exercise.dialogues && exercise.dialogues.length > 0 ? (
        <DialogueContent dialogues={exercise.dialogues} />
      ) : (
        <EmptyState message="No dialogues available." />
      );

    case ExerciseType.Vocabulary:
      return exercise.vocabularies && exercise.vocabularies.length > 0 ? (
        <VocabularyContent vocabularies={exercise.vocabularies} />
      ) : (
        <EmptyState message="No vocabulary items available." />
      );

    case ExerciseType.Pronunciation:
      return exercise.pronunciations && exercise.pronunciations.length > 0 ? (
        <PronunciationContent pronunciations={exercise.pronunciations} />
      ) : (
        <EmptyState message="No pronunciation items available." />
      );

    case ExerciseType.Speaking:
      return (
        <div className="space-y-4">
          {exercise.questions && exercise.questions.length > 0 ? (
            <QuestionList
              questions={exercise.questions}
              answers={answers}
              onAnswerChange={onAnswerChange}
              exerciseType={exercise.type}
            />
          ) : (
            <EmptyState message="No speaking prompts available." />
          )}
        </div>
      );

    case ExerciseType.Matching:
      return exercise.questions && exercise.questions.length > 0 ? (
        <QuestionList
          questions={exercise.questions}
          answers={answers}
          onAnswerChange={onAnswerChange}
          exerciseType={exercise.type}
        />
      ) : (
        <EmptyState message="No matching items available." />
      );

    default:
      return <EmptyState message="Unsupported exercise type." />;
  }
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/30 px-6 py-10 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function DialogueContent({
  dialogues,
}: {
  dialogues: NonNullable<ExerciseDTO['dialogues']>;
}) {
  return (
    <div className="space-y-6">
      {dialogues.map((dialogue) => (
        <div key={dialogue.id} className="space-y-3">
          {dialogue.title && (
            <h4 className="text-sm font-semibold text-foreground">
              {dialogue.title}
            </h4>
          )}
          <div className="space-y-2">
            {dialogue.lines?.map((line, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex gap-3 rounded-lg p-3',
                  idx % 2 === 0
                    ? 'bg-primary/5'
                    : 'bg-muted/50',
                )}
              >
                <span className="shrink-0 text-sm font-semibold text-primary">
                  {line.speaker}:
                </span>
                <span className="text-sm text-foreground">{line.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function VocabularyContent({
  vocabularies,
}: {
  vocabularies: NonNullable<ExerciseDTO['vocabularies']>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {vocabularies.map((vocab) => (
        <div
          key={vocab.id}
          className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
        >
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-base font-bold text-foreground">
              {vocab.word}
            </span>
            {vocab.category && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {vocab.category}
              </span>
            )}
          </div>
          <p className="text-sm text-primary">{vocab.meaning}</p>
          {vocab.example && (
            <p className="mt-2 text-xs italic text-muted-foreground">
              &ldquo;{vocab.example}&rdquo;
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function PronunciationContent({
  pronunciations,
}: {
  pronunciations: NonNullable<ExerciseDTO['pronunciations']>;
}) {
  return (
    <div className="space-y-3">
      {pronunciations.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
        >
          <div className="min-w-0 flex-1">
            {item.topic && (
              <p className="mb-1 text-xs font-medium text-muted-foreground">
                {item.topic}
              </p>
            )}
            <p className="text-sm font-medium text-foreground">{item.text}</p>
            {item.ipa && (
              <p className="mt-0.5 font-mono text-sm text-primary">
                /{item.ipa}/
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
