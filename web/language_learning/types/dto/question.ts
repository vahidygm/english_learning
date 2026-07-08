import type { BaseEntity } from "../common";

export interface QuestionDTO extends BaseEntity {
  exerciseId: number;
  number: string;
  text: string;
  answer: string | null;
  order: number;
}
