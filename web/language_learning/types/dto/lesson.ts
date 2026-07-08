import type { BaseEntity } from "../common";
import type { ObjectiveDTO } from "./objective";
import type { UnitDTO } from "./unit";

export interface LessonDTO extends BaseEntity {
  number: number;
  title: string;
  coverImage: string | null;
  objectives?: ObjectiveDTO[];
  units?: UnitDTO[];
}

export interface LessonSummaryDTO {
  id: number;
  number: number;
  title: string;
  coverImage: string | null;
  unitCount: number;
}
