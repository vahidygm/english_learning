'use client';

import { cn } from '@/lib/utils';
import type { QuestionDTO } from '@/types';
import { ExerciseType } from '@/types';

interface QuestionListProps {
  questions: QuestionDTO[];
  answers: Record<number, string>;
  onAnswerChange: (questionId: number, answer: string) => void;
  exerciseType?: ExerciseType;
}

export function QuestionList({
  questions,
  answers,
  onAnswerChange,
  exerciseType,
}: QuestionListProps) {
  return (
    <div className="space-y-4">
      {questions.map((question, idx) => (
        <div
          key={question.id}
          className="rounded-lg border border-border bg-card p-4"
        >
          <p className="mb-3 text-sm font-medium text-foreground">
            <span className="mr-2 text-muted-foreground">
              {question.number || idx + 1}.
            </span>
            {question.text}
          </p>

          {renderInput(question, answers[question.id] ?? '', onAnswerChange, exerciseType)}
        </div>
      ))}
    </div>
  );
}

function renderInput(
  question: QuestionDTO,
  currentAnswer: string,
  onAnswerChange: (questionId: number, answer: string) => void,
  exerciseType?: ExerciseType,
) {
  if (exerciseType === ExerciseType.TrueFalse) {
    return (
      <TrueFalseInput
        questionId={question.id}
        value={currentAnswer}
        onChange={onAnswerChange}
      />
    );
  }

  if (exerciseType === ExerciseType.MultipleChoice) {
    const options = parseOptions(question.text);
    if (options.length > 0) {
      return (
        <MultipleChoiceInput
          questionId={question.id}
          options={options}
          value={currentAnswer}
          onChange={onAnswerChange}
        />
      );
    }
  }

  return (
    <FillInBlankInput
      questionId={question.id}
      value={currentAnswer}
      onChange={onAnswerChange}
    />
  );
}

function parseOptions(text: string): string[] {
  // Match patterns like: A) option / A. option / (A) option
  const pattern = /(?:^|\n)\s*(?:\(?[A-Da-d]\)?[.)]\s*)(.+)/g;
  const matches: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    matches.push(match[1].trim());
  }

  return matches;
}

function FillInBlankInput({
  questionId,
  value,
  onChange,
}: {
  questionId: number;
  value: string;
  onChange: (questionId: number, answer: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(questionId, e.target.value)}
      placeholder="Type your answer…"
      className={cn(
        'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground',
        'placeholder:text-muted-foreground/60',
        'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
      )}
    />
  );
}

function MultipleChoiceInput({
  questionId,
  options,
  value,
  onChange,
}: {
  questionId: number;
  options: string[];
  value: string;
  onChange: (questionId: number, answer: string) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map((option, idx) => {
        const label = String.fromCharCode(65 + idx);
        const isSelected = value === label || value === option;

        return (
          <label
            key={idx}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors',
              isSelected
                ? 'border-primary bg-primary/5 text-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-muted/50',
            )}
          >
            <input
              type="radio"
              name={`question-${questionId}`}
              value={label}
              checked={isSelected}
              onChange={() => onChange(questionId, label)}
              className="sr-only"
            />
            <span
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium',
                isSelected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground',
              )}
            >
              {label}
            </span>
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}

function TrueFalseInput({
  questionId,
  value,
  onChange,
}: {
  questionId: number;
  value: string;
  onChange: (questionId: number, answer: string) => void;
}) {
  return (
    <div className="flex gap-3">
      {(['True', 'False'] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(questionId, option)}
          className={cn(
            'flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors',
            value === option
              ? option === 'True'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                : 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400'
              : 'border-border text-muted-foreground hover:bg-muted/50',
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
