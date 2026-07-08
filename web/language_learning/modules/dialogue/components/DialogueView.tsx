'use client';

import { cn } from '@/lib/utils';
import type { DialogueDTO } from '@/types';

interface DialogueViewProps {
  dialogue: DialogueDTO;
}

export function DialogueView({ dialogue }: DialogueViewProps) {
  const sortedLines = [...dialogue.lines].sort((a, b) => a.order - b.order);
  const speakers = [...new Set(sortedLines.map((l) => l.speaker))];

  return (
    <div className="mb-4">
      {dialogue.title && (
        <h4 className="mb-3 text-sm font-semibold text-foreground">
          {dialogue.title}
        </h4>
      )}
      <div className="space-y-3">
        {sortedLines.map((line) => {
          const isFirst = speakers.indexOf(line.speaker) === 0;
          return (
            <div
              key={line.id}
              className={cn('flex', isFirst ? 'justify-start' : 'justify-end')}
            >
              <div
                className={cn(
                  'max-w-[75%] rounded-2xl px-4 py-2.5',
                  isFirst
                    ? 'rounded-bl-sm bg-muted text-foreground'
                    : 'rounded-br-sm bg-primary text-primary-foreground',
                )}
              >
                <p className="mb-1 text-xs font-semibold opacity-70">
                  {line.speaker}
                </p>
                <p className="text-sm">{line.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
