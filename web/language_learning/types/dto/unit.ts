import type { SectionDTO } from './section';

export interface UnitSummaryDTO {
  id: number;
  code: string;
  title: string;
  grammarSummary: string | null;
  vocabularySummary: string | null;
  pronunciationSummary: string | null;
  sectionCount: number;
}

export interface UnitDetailDTO {
  id: number;
  lessonId: number;
  code: string;
  title: string;
  grammarSummary: string | null;
  vocabularySummary: string | null;
  pronunciationSummary: string | null;
  sections: SectionDTO[];
}
