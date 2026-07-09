'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useLessons } from '@/modules/lesson';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { SkeletonCard } from '@/components/common/SkeletonCard';
import {
  BookOpen,
  Layers,
  ArrowRight,
  Sparkles,
  GraduationCap,
  BookMarked,
  Clock,
} from 'lucide-react';

function ContinueLearningHero({
  lesson,
}: {
  lesson: { id: number; number: number; title: string; coverImage: string | null; unitCount: number };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={ROUTES.LESSON_DETAIL(lesson.id)}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-600 p-8 sm:p-10 shadow-xl shadow-violet-500/15 cursor-pointer"
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5 blur-xl" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-medium mb-4">
                <Clock className="w-3.5 h-3.5" />
                Continue Learning
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Lesson {lesson.number}: {lesson.title}
              </h2>
              <p className="text-indigo-100 text-sm">
                {lesson.unitCount} {lesson.unitCount === 1 ? 'unit' : 'units'} to explore
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow">
                Continue
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center gap-4"
    >
      <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', color)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</p>
      </div>
    </motion.div>
  );
}

function RecentLessonCard({
  lesson,
  index,
}: {
  lesson: { id: number; number: number; title: string; coverImage: string | null; unitCount: number };
  index: number;
}) {
  const gradients = [
    'from-rose-500 to-orange-500',
    'from-emerald-500 to-teal-500',
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-amber-500 to-yellow-500',
    'from-indigo-500 to-violet-500',
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
    >
      <Link href={ROUTES.LESSON_DETAIL(lesson.id)}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
        >
          {/* Cover */}
          <div className="relative h-32 overflow-hidden">
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
                <span className="text-4xl font-black text-white/30">{lesson.number}</span>
              </div>
            )}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-bold">
              Lesson {lesson.number}
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate mb-1">
              {lesson.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lesson.unitCount} {lesson.unitCount === 1 ? 'unit' : 'units'}
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { data: lessons, isLoading } = useLessons();

  const totalUnits = lessons?.reduce((sum, l) => sum + l.unitCount, 0) ?? 0;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <SkeletonCard className="h-44 rounded-2xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} className="h-52 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const firstLesson = lessons?.[0];
  const recentLessons = lessons?.slice(0, 4) ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Welcome back 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Pick up where you left off or explore new lessons.
        </p>
      </motion.div>

      {/* Continue Learning Hero */}
      {firstLesson && <ContinueLearningHero lesson={firstLesson} />}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={BookOpen}
          label="Lessons Available"
          value={lessons?.length ?? 0}
          color="bg-violet-500"
          delay={0.05}
        />
        <StatCard
          icon={Layers}
          label="Total Units"
          value={totalUnits}
          color="bg-indigo-500"
          delay={0.1}
        />
        <StatCard
          icon={GraduationCap}
          label="Completed"
          value={0}
          color="bg-emerald-500"
          delay={0.15}
        />
        <StatCard
          icon={BookMarked}
          label="In Progress"
          value={0}
          color="bg-amber-500"
          delay={0.2}
        />
      </div>

      {/* Recent Lessons */}
      {recentLessons.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Lessons</h2>
            <Link
              href={ROUTES.LESSONS}
              className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentLessons.map((lesson, i) => (
              <RecentLessonCard key={lesson.id} lesson={lesson} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Vocabulary Review CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-8 text-center"
      >
        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Vocabulary Review</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Spaced repetition flashcards to lock in what you&apos;ve learned. Coming soon.
        </p>
      </motion.div>
    </div>
  );
}
