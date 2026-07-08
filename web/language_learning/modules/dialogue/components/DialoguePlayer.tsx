'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DialogueLineDTO } from '@/types';
import { DialogueBubble } from './DialogueBubble';

interface DialoguePlayerProps {
  lines: DialogueLineDTO[];
}

export function DialoguePlayer({ lines }: DialoguePlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleLines = lines.slice(0, currentIndex + 1);
  const isComplete = currentIndex >= lines.length - 1;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= lines.length - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, [lines.length]);

  useEffect(() => {
    if (isPlaying && !isComplete) {
      timerRef.current = setTimeout(advance, 2000);
    }
    return clearTimer;
  }, [isPlaying, currentIndex, isComplete, advance, clearTimer]);

  const togglePlay = () => {
    if (isComplete) {
      setCurrentIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleSkip = () => {
    clearTimer();
    advance();
  };

  const handleReset = () => {
    clearTimer();
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  return (
    <div className="space-y-4">
      <div className="min-h-[200px] space-y-3 rounded-lg border border-border bg-card p-4">
        {visibleLines.map((line, index) => (
          <div
            key={line.id}
            className={cn(
              'transition-opacity duration-300',
              index === currentIndex ? 'animate-in fade-in' : 'opacity-100',
            )}
          >
            <DialogueBubble line={line} isLeft={index % 2 === 0} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={handleReset}
          disabled={currentIndex === 0 && !isPlaying}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full border border-border',
            'text-muted-foreground transition-colors hover:bg-muted',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={togglePlay}
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full',
            'bg-primary text-primary-foreground transition-colors hover:bg-primary/90',
          )}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 pl-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={handleSkip}
          disabled={isComplete}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full border border-border',
            'text-muted-foreground transition-colors hover:bg-muted',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          <SkipForward className="h-4 w-4" />
        </button>
      </div>

      <div className="flex justify-center">
        <span className="text-xs text-muted-foreground">
          {currentIndex + 1} / {lines.length}
        </span>
      </div>
    </div>
  );
}
