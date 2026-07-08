import type { UnitDTO } from '@/types';
import { UnitCard } from './UnitCard';

interface UnitGridProps {
  units: UnitDTO[];
  lessonId: number;
}

export function UnitGrid({ units, lessonId }: UnitGridProps) {
  if (units.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          No units available
        </p>
        <p className="mt-1 text-sm text-muted-foreground/70">
          Units for this lesson haven&apos;t been added yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {units.map((unit) => (
        <UnitCard key={unit.id} unit={unit} lessonId={lessonId} />
      ))}
    </div>
  );
}
