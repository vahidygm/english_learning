import type { BaseEntity } from "../common";
import type { ExerciseDTO } from "./exercise";

export interface SectionDTO extends BaseEntity {
  unitId: number;
  name: string;
  order: number;
  exercises?: ExerciseDTO[];
}
