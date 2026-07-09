'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { Layers } from 'lucide-react';

interface LessonCardProps {
  lesson: {
    id: number;
    number: number;
    title: string;
    coverImage: string | null;
    unitCount: number;
  };
  index?: number;
}

const gradients = [
  'from-rose-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-amber-500 to-yellow-500',
  'from-indigo-500 to-violet-500',
  'from-pink-500 to-rose-500',
  'from-teal-500 to-emerald-500',
];

export function LessonCard({ lesson, index = 0 }: LessonCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <Link href={ROUTES.LESSON_DETAIL(lesson.id)}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col"
      >
        {/* Cover */}
        <div className="relative h-40 overflow-hidden">
          {lesson.coverImage ? (
            <img
              src={lesson.coverImage}
              alt={lesson.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div
              className={cn(
                'w-full h-full bg-gradient-to-br flex items-center justify-center',
                gradient
              )}
            >
              <span className="text-6xl font-black text-white/20 select-none">
                {lesson.number}
              </span>
            </div>
          )}
          {/* Lesson number badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-bold shadow">
            Lesson {lesson.number}
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-snug mb-3">
            {lesson.title}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Layers className="w-4 h-4" />
            <span className="text-xs font-medium">
              {lesson.unitCount} {lesson.unitCount === 1 ? 'unit' : 'units'}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
