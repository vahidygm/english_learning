'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import { BookOpen, Mic, Type, Layers, ArrowRight } from 'lucide-react';

interface UnitCardProps {
  unit: {
    id: number;
    code: string;
    title: string;
    grammarSummary: string | null;
    vocabularySummary: string | null;
    pronunciationSummary: string | null;
    sectionCount: number;
  };
  lessonId: number;
  index?: number;
}

const categoryConfig = [
  {
    key: 'grammarSummary' as const,
    label: 'Grammar',
    icon: BookOpen,
    color: 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400',
  },
  {
    key: 'vocabularySummary' as const,
    label: 'Vocabulary',
    icon: Type,
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  {
    key: 'pronunciationSummary' as const,
    label: 'Pronunciation',
    icon: Mic,
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  },
];

export function UnitCard({ unit, lessonId, index = 0 }: UnitCardProps) {
  const activeTags = categoryConfig.filter((c) => unit[c.key]);

  return (
    <Link href={ROUTES.UNIT_DETAIL(lessonId, unit.id)}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {unit.code}
            </span>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug mt-1">
              {unit.title}
            </h3>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
          {activeTags.map(({ key, label, icon: Icon, color }) => (
            <span
              key={key}
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium',
                color
              )}
            >
              <Icon className="w-3 h-3" />
              {label}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Layers className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">
            {unit.sectionCount} {unit.sectionCount === 1 ? 'section' : 'sections'}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
