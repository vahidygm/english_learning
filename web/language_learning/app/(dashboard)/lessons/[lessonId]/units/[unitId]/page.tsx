'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useUnit } from '@/modules/unit';
import { ExerciseRenderer } from '@/modules/exercise';
import { SkeletonCard } from '@/components/common/SkeletonCard';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import {
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Mic,
  Type,
  Headphones,
  Pen,
  MessageSquare,
  Layers,
  FileText,
} from 'lucide-react';

const sectionIconMap: Record<string, React.ElementType> = {
  grammar: BookOpen,
  vocabulary: Type,
  pronunciation: Mic,
  listening: Headphones,
  writing: Pen,
  dialogue: MessageSquare,
  reading: FileText,
};

const sectionColorMap: Record<string, string> = {
  grammar: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400 border-violet-200 dark:border-violet-500/20',
  vocabulary: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
  pronunciation: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
  listening: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
  writing: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 border-rose-200 dark:border-rose-500/20',
  dialogue: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20',
  reading: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20',
};

const defaultColor = 'bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-400 border-slate-200 dark:border-slate-500/20';

function getSectionKey(name: string): string {
  const lower = name.toLowerCase();
  for (const key of Object.keys(sectionIconMap)) {
    if (lower.includes(key)) return key;
  }
  return 'default';
}

export default function UnitDetailPage(
  props: { params: Promise<{ lessonId: string; unitId: string }> }
) {
  const params = use(props.params);
  const lessonId = Number(params.lessonId);
  const unitId = Number(params.unitId);
  const { data: unit, isLoading, error } = useUnit(unitId);
  const [activeSection, setActiveSection] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <SkeletonCard className="h-10 w-64 rounded-xl" />
        <SkeletonCard className="h-48 rounded-2xl" />
        <SkeletonCard className="h-48 rounded-2xl" />
      </div>
    );
  }

  if (error || !unit) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-slate-500 dark:text-slate-400">Unit not found.</p>
      </div>
    );
  }

  const sections = [...unit.sections].sort((a, b) => a.order - b.order);
  const currentSectionId = activeSection ?? (sections.length > 0 ? sections[0].id : null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 flex-wrap"
      >
        <Link
          href={ROUTES.LESSON_DETAIL(lessonId)}
          className="hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lesson
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-medium truncate">{unit.code}</span>
      </motion.nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
          {unit.code}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-4">
          {unit.title}
        </h1>

        {/* Category summary chips */}
        <div className="flex flex-wrap gap-2">
          {unit.grammarSummary && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-xs font-medium">
              <BookOpen className="w-3.5 h-3.5" />
              {unit.grammarSummary}
            </div>
          )}
          {unit.vocabularySummary && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
              <Type className="w-3.5 h-3.5" />
              {unit.vocabularySummary}
            </div>
          )}
          {unit.pronunciationSummary && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-medium">
              <Mic className="w-3.5 h-3.5" />
              {unit.pronunciationSummary}
            </div>
          )}
        </div>
      </motion.div>

      {/* Section tabs */}
      {sections.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 flex-wrap"
        >
          {sections.map((section) => {
            const sectionKey = getSectionKey(section.name);
            const Icon = sectionIconMap[sectionKey] ?? Layers;
            const isActive = section.id === currentSectionId;

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all border',
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                )}
              >
                <Icon className="w-4 h-4" />
                {section.name}
              </button>
            );
          })}
        </motion.div>
      )}

      {/* Section content */}
      <AnimatePresence mode="wait">
        {sections
          .filter((s) => (sections.length <= 1 ? true : s.id === currentSectionId))
          .map((section) => {
            const sectionKey = getSectionKey(section.name);
            const Icon = sectionIconMap[sectionKey] ?? Layers;
            const colorClass = sectionColorMap[sectionKey] ?? defaultColor;
            const sortedExercises = [...section.exercises].sort((a, b) => a.order - b.order);

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Section header (visible when showing all sections) */}
                {sections.length <= 1 && (
                  <div className="flex items-center gap-2">
                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', colorClass)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {section.name}
                    </h2>
                  </div>
                )}

                {/* Exercises */}
                {sortedExercises.map((exercise, i) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                  >
                    {/* Exercise header */}
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                        {exercise.number}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {exercise.title}
                        </h3>
                        {exercise.instruction && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {exercise.instruction}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Exercise content */}
                    <div className="p-6">
                      <ExerciseRenderer exercise={exercise} />
                    </div>

                    {/* Media */}
                    {exercise.media.length > 0 && (
                      <div className="px-6 pb-6 flex flex-wrap gap-3">
                        {exercise.media
                          .filter((m) => m.type === 'image')
                          .map((m) => (
                            <figure key={m.id} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                              <img
                                src={m.url}
                                alt={m.caption || ''}
                                className="max-h-64 object-contain"
                              />
                              {m.caption && (
                                <figcaption className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800">
                                  {m.caption}
                                </figcaption>
                              )}
                            </figure>
                          ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {sortedExercises.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    No exercises in this section yet.
                  </div>
                )}
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}
