'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from './SectionHeader';

interface SectionCardProps {
  section: {
    id: number;
    name: string;
    order: number;
    exercises?: { id: number; title: string; type: string }[];
  };
}

export function SectionCard({ section }: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const exerciseCount = section.exercises?.length ?? 0;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-card transition-colors',
        isExpanded && 'border-primary/30',
      )}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'flex w-full items-center justify-between px-4 py-3',
          'text-left transition-colors hover:bg-muted/50',
        )}
      >
        <SectionHeader name={section.name} exerciseCount={exerciseCount} />
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
            isExpanded && 'rotate-180',
          )}
        />
      </button>

      {isExpanded && (
        <div className="border-t border-border px-4 py-3">
          {exerciseCount > 0 ? (
            <ul className="space-y-2">
              {section.exercises!.map((exercise) => (
                <li
                  key={exercise.id}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                  <span>{exercise.title}</span>
                  <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs capitalize">
                    {exercise.type}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground/70">
              No exercises in this section yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
