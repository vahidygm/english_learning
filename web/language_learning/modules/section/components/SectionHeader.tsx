import {
  BookOpen,
  Languages,
  Volume2,
  MessageSquare,
  PenLine,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  name: string;
  exerciseCount: number;
}

const sectionIcons: Record<string, React.ElementType> = {
  grammar: BookOpen,
  vocabulary: Languages,
  pronunciation: Volume2,
  conversation: MessageSquare,
  writing: PenLine,
  reading: FileText,
};

const sectionColors: Record<string, string> = {
  grammar: 'text-blue-500',
  vocabulary: 'text-green-500',
  pronunciation: 'text-orange-500',
  conversation: 'text-purple-500',
  writing: 'text-pink-500',
  reading: 'text-cyan-500',
};

export function SectionHeader({ name, exerciseCount }: SectionHeaderProps) {
  const normalizedName = name.toLowerCase();
  const Icon = sectionIcons[normalizedName] ?? FileText;
  const iconColor = sectionColors[normalizedName] ?? 'text-muted-foreground';

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg bg-muted',
        )}
      >
        <Icon className={cn('h-4 w-4', iconColor)} />
      </div>
      <div>
        <h3 className="text-sm font-semibold capitalize text-card-foreground">
          {name}
        </h3>
        <p className="text-xs text-muted-foreground">
          {exerciseCount} {exerciseCount === 1 ? 'exercise' : 'exercises'}
        </p>
      </div>
    </div>
  );
}
