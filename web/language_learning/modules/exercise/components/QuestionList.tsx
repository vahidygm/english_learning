'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { QuestionDTO } from '@/types';

interface QuestionListProps {
  questions: QuestionDTO[];
}

export function QuestionList({ questions }: QuestionListProps) {
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(
    new Set(),
  );

  const toggleAnswer = (id: number) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const sorted = [...questions].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-3">
      {sorted.map((question) => (
        <div
          key={question.id}
          className="rounded-lg border border-border bg-card p-4"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {question.number}
            </span>
            <div className="flex-1">
              <p className="text-sm text-foreground">{question.text}</p>
              {question.answer && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => toggleAnswer(question.id)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    {revealedAnswers.has(question.id) ? (
                      <>
                        <EyeOff className="h-3 w-3" />
                        Hide Answer
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3" />
                        Show Answer
                      </>
                    )}
                  </button>
                  {revealedAnswers.has(question.id) && (
                    <p className="mt-1 rounded bg-green-50 px-3 py-2 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
                      {question.answer}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
