import type { VocabularyDTO } from '@/types';
import { VocabularyCard } from './VocabularyCard';

interface VocabularyGridProps {
  items: VocabularyDTO[];
}

export function VocabularyGrid({ items }: VocabularyGridProps) {
  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No vocabulary items available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((vocabulary) => (
        <VocabularyCard key={vocabulary.id} vocabulary={vocabulary} />
      ))}
    </div>
  );
}
