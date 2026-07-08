import type { BaseEntity } from "../common";

export interface ObjectiveDTO extends BaseEntity {
  lessonId: number;
  unitCode: string;
  skill: string | null;
  grammar: string | null;
  vocabulary: string | null;
  pronunciation: string | null;
  writing: string | null;
}
