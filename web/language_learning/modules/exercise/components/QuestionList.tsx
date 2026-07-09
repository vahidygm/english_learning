'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import type { QuestionDTO } from '@/types';

interface QuestionListProps {
  questions: QuestionDTO[];
  className?: string;
}

export function QuestionList({ questions, className }: QuestionListProps) {
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(
    new Set()
  );

  if (!questions || questions.length === 0) return null;

  const sorted = [...questions].sort((a, b) => a.order - b.order);

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

  return (
    <div className={cn('space-y-3', className)}>
      {sorted.map((q) => {
        const isRevealed = revealedAnswers.has(q.id);

        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="group flex flex-col gap-2 rounded-lg border border-border/40 bg-card/50 px-4 py-3 hover:border-border/70 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                  {q.number}
                </span>
                <p className="text-sm text-foreground leading-relaxed">
                  {q.text}
                </p>
              </div>

              {q.answer && (
                <button
                  onClick={() => toggleAnswer(q.id)}
                  className="shrink-0 mt-0.5 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  aria-label={isRevealed ? 'Hide answer' : 'Show answer'}
                >
                  {isRevealed ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>

            <AnimatePresence>
              {isRevealed && q.answer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 px-3 py-2">
                    <p className="text-sm text-emerald-800 dark:text-emerald-200">
                      {q.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
