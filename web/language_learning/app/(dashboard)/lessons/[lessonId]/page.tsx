'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useLesson } from '@/modules/lesson';
import { UnitCard } from '@/modules/unit';
import { ProgressBar } from '@/components/common/ProgressBar';
import { SkeletonCard } from '@/components/common/SkeletonCard';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import {
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Target,
  Layers,
  Play,
  Pen,
  MessageSquare,
  Mic,
  GraduationCap,
} from 'lucide-react';

const objectiveChipConfig: Record<string, { label: string; color: string }> = {
  skill: { label: 'Skill', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' },
  grammar: { label: 'Grammar', color: 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400' },
  vocabulary: { label: 'Vocabulary', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
  pronunciation: { label: 'Pronunciation', color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' },
  writing: { label: 'Writing', color: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' },
};

const gradients = [
  'from-violet-600 to-indigo-600',
  'from-rose-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
];

export default function LessonDetailPage(props: { params: Promise<{ lessonId: string }> }) {
  const params = use(props.params);
  const lessonId = Number(params.lessonId);
  const { data: lesson, isLoading, error } = useLesson(lessonId);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <SkeletonCard className="h-48 rounded-2xl" />
        <SkeletonCard className="h-8 w-48 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-slate-500 dark:text-slate-400">Lesson not found.</p>
      </div>
    );
  }

  const gradient = gradients[lesson.number % gradients.length];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"
      >
        <Link href={ROUTES.LESSONS} className="hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Lessons
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-medium truncate">Lesson {lesson.number}</span>
      </motion.nav>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl shadow-lg"
      >
        {lesson.coverImage ? (
          <div className="relative h-56 sm:h-64">
            <img src={lesson.coverImage} alt={lesson.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="px-3 py-1 rounded-lg bg-white/20 backdrop-blur-sm text-white text-xs font-bold inline-block mb-3">
                Lesson {lesson.number}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{lesson.title}</h1>
            </div>
          </div>
        ) : (
          <div className={cn('p-8 sm:p-10 bg-gradient-to-br', gradient)}>
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
            <div className="relative z-10">
              <div className="px-3 py-1 rounded-lg bg-white/20 backdrop-blur-sm text-white text-xs font-bold inline-block mb-3">
                Lesson {lesson.number}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{lesson.title}</h1>
            </div>
          </div>
        )}
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-900 dark:text-white">Progress</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">0%</span>
        </div>
        <ProgressBar value={0} />
        <div className="mt-4 flex items-center gap-3">
          <Link
            href={lesson.units.length > 0 ? ROUTES.UNIT_DETAIL(lesson.id, lesson.units[0].id) : '#'}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-colors shadow-sm"
          >
            <Play className="w-4 h-4" />
            Start Lesson
          </Link>
        </div>
      </motion.div>

      {/* Objectives */}
      {lesson.objectives.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-violet-500" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Learning Objectives</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lesson.objectives.map((obj, i) => (
              <motion.div
                key={obj.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {obj.unitCode}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(objectiveChipConfig).map(([key, config]) => {
                    const value = obj[key as keyof typeof obj] as string;
                    if (!value) return null;
                    return (
                      <span
                        key={key}
                        title={value}
                        className={cn(
                          'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium truncate max-w-[200px]',
                          config.color
                        )}
                      >
                        {config.label}: {value}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Units */}
      {lesson.units.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Units ({lesson.units.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lesson.units.map((unit, i) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
              >
                <UnitCard unit={unit} lessonId={lesson.id} index={i} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
