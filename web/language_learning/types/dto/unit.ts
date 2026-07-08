import type { BaseEntity } from "../common";
import type { SectionDTO } from "./section";

export interface UnitDTO extends BaseEntity {
  lessonId: number;
  code: string;
  title: string;
  grammarSummary: string | null;
  vocabularySummary: string | null;
  pronunciationSummary: string | null;
  sections?: SectionDTO[];
}
