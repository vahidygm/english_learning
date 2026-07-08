import { Lightbulb } from 'lucide-react';

interface GrammarRuleProps {
  rule: string;
  topic: string;
}

export function GrammarRule({ rule, topic }: GrammarRuleProps) {
  return (
    <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800 dark:bg-emerald-950/30">
      <div className="mb-1.5 flex items-center gap-1.5">
        <Lightbulb className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Rule — {topic}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-emerald-900 dark:text-emerald-100">
        {rule}
      </p>
    </div>
  );
}
