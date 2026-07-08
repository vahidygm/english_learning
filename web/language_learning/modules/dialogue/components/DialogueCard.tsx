import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DialogueDTO } from '@/types';
import { DialogueBubble } from './DialogueBubble';

interface DialogueCardProps {
  dialogue: DialogueDTO;
}

export function DialogueCard({ dialogue }: DialogueCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/40">
          <MessageSquare className="h-4 w-4 text-indigo-700 dark:text-indigo-400" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">
          {dialogue.title}
        </h3>
      </div>

      <div className="space-y-3">
        {dialogue.lines?.map((line, index) => (
          <DialogueBubble
            key={line.id}
            line={line}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
