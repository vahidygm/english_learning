import type { ObjectiveDTO } from './objective';
import type { UnitSummaryDTO } from './unit';

export interface LessonSummaryDTO {
  id: number;
  number: number;
  title: string;
  coverImage: string | null;
  unitCount: number;
}

export interface LessonDetailDTO {
  id: number;
  number: number;
  title: string;
  coverImage: string | null;
  objectives: ObjectiveDTO[];
  units: UnitSummaryDTO[];
}
