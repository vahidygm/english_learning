import { BookOpen } from 'lucide-react';
import { Empty } from '@/components/common/Empty';

export function LessonEmpty() {
  return (
    <Empty
      icon={BookOpen}
      title="No lessons found"
      description="There are no lessons matching your search. Try adjusting your filters or check back later for new content."
    />
  );
}
