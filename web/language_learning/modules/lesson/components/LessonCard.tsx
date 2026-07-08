'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LessonSummaryDTO } from '@/types';

interface LessonCardProps {
  lesson: LessonSummaryDTO;
  href?: string;
}

export function LessonCard({ lesson, href }: LessonCardProps) {
  const linkHref = href ?? `/lessons/${lesson.id}`;

  return (
    <Link href={linkHref} className="block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          'group overflow-hidden rounded-xl bg-card shadow-sm',
          'border border-border transition-shadow hover:shadow-md',
        )}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <BookOpen className="h-12 w-12 text-primary/40" />
          </div>
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              Lesson {lesson.number}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-base font-semibold text-foreground">
            {lesson.title}
          </h3>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>
              {lesson.unitCount} {lesson.unitCount === 1 ? 'unit' : 'units'}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
