import { cn } from '@/lib/utils';
import type { DialogueLineDTO } from '@/types';
import { Speaker } from './Speaker';

interface DialogueBubbleProps {
  line: DialogueLineDTO;
  isLeft: boolean;
}

export function DialogueBubble({ line, isLeft }: DialogueBubbleProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isLeft ? 'flex-row' : 'flex-row-reverse',
      )}
    >
      <Speaker name={line.speaker} side={isLeft ? 'left' : 'right'} />

      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isLeft
            ? 'rounded-tl-sm bg-muted text-foreground'
            : 'rounded-tr-sm bg-primary text-primary-foreground',
        )}
      >
        {line.text}
      </div>
    </div>
  );
}
