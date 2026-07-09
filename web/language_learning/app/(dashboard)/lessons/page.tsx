'use client';

import { motion } from 'motion/react';
import { useLessons } from '@/modules/lesson';
import { LessonCard } from '@/modules/lesson';
import { SkeletonCard } from '@/components/common/SkeletonCard';
import { EmptyState } from '@/components/common/EmptyState';
import { BookOpen } from 'lucide-react';

export default function LessonsPage() {
  const { data: lessons, isLoading } = useLessons();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Lessons
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm ml-[52px]">
          Explore all available lessons. Each lesson covers grammar, vocabulary, pronunciation, and more.
        </p>
      </motion.div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} className="h-60 rounded-2xl" />
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && (!lessons || lessons.length === 0) && (
        <EmptyState
          icon={<BookOpen className="w-10 h-10 text-slate-400" />}
          title="No lessons yet"
          description="Lessons will appear here once they're available."
        />
      )}

      {/* Grid */}
      {!isLoading && lessons && lessons.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons.map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <LessonCard lesson={lesson} index={i} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
