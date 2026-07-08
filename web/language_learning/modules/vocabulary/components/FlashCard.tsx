'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VocabularyDTO } from '@/types';

interface FlashCardProps {
  vocabulary: VocabularyDTO;
}

export function FlashCard({ vocabulary }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-[1000px] h-48 w-full cursor-pointer"
      onClick={() => setIsFlipped((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Front - Word */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6',
            'backface-hidden',
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="mb-2 inline-flex items-center rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-medium text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400">
            {vocabulary.category}
          </span>
          <h3 className="text-xl font-bold text-foreground">
            {vocabulary.word}
          </h3>
          <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
            <RotateCcw className="h-3 w-3" />
            Tap to flip
          </p>
        </div>

        {/* Back - Meaning + Example */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-border bg-primary/5 p-6',
            'backface-hidden',
          )}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-center text-base font-semibold text-foreground">
            {vocabulary.meaning}
          </p>
          {vocabulary.example && (
            <p className="mt-3 text-center text-sm italic text-muted-foreground">
              &ldquo;{vocabulary.example}&rdquo;
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
