'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { TableDTO } from '@/types';

interface TableRendererProps {
  tables: TableDTO[];
}

export function TableRenderer({ tables }: TableRendererProps) {
  if (!tables || tables.length === 0) return null;

  return (
    <div className="space-y-4">
      {tables.map((table) => (
        <motion.div
          key={table.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden rounded-xl border border-border/60"
        >
          {table.title && (
            <div className="bg-muted/50 px-4 py-2.5 border-b border-border/60">
              <h4 className="text-sm font-semibold text-foreground">
                {table.title}
              </h4>
            </div>
          )}
          <div
            className={cn(
              'overflow-x-auto',
              '[&_table]:w-full [&_table]:border-collapse',
              '[&_th]:bg-muted/40 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-foreground [&_th]:border-b [&_th]:border-border/50',
              '[&_td]:px-4 [&_td]:py-2.5 [&_td]:text-sm [&_td]:text-foreground/90 [&_td]:border-b [&_td]:border-border/30',
              '[&_tr:nth-child(even)_td]:bg-muted/20',
              '[&_tr:last-child_td]:border-b-0',
              '[&_tr:hover_td]:bg-primary/5 [&_tr]:transition-colors'
            )}
            dangerouslySetInnerHTML={{ __html: table.html }}
          />
        </motion.div>
      ))}
    </div>
  );
}
