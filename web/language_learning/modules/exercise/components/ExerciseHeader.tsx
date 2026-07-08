import {
  Headphones,
  BookOpen,
  Mic,
  PenTool,
  Languages,
  BookA,
  Volume2,
  MessageSquare,
  TextCursorInput,
  ListChecks,
  ArrowRightLeft,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ExerciseDTO } from '@/types';
import { ExerciseType } from '@/types';

interface ExerciseHeaderProps {
  exercise: ExerciseDTO;
}

const typeIcons: Record<ExerciseType, React.ElementType> = {
  [ExerciseType.Listening]: Headphones,
  [ExerciseType.Reading]: BookOpen,
  [ExerciseType.Speaking]: Mic,
  [ExerciseType.Writing]: PenTool,
  [ExerciseType.Grammar]: Languages,
  [ExerciseType.Vocabulary]: BookA,
  [ExerciseType.Pronunciation]: Volume2,
  [ExerciseType.Dialogue]: MessageSquare,
  [ExerciseType.FillInTheBlank]: TextCursorInput,
  [ExerciseType.MultipleChoice]: ListChecks,
  [ExerciseType.Matching]: ArrowRightLeft,
  [ExerciseType.TrueFalse]: CheckCircle2,
};

export function ExerciseHeader({ exercise }: ExerciseHeaderProps) {
  const Icon = typeIcons[exercise.type] ?? BookOpen;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Exercise {exercise.number} · {exercise.type}
          </p>
          <h2 className="text-lg font-bold text-foreground">
            {exercise.title}
          </h2>
        </div>
      </div>

      {exercise.instruction && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {exercise.instruction}
        </p>
      )}
    </div>
  );
}
