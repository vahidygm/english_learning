import type { BaseEntity } from "../common";

export interface GrammarDTO extends BaseEntity {
  exerciseId: number;
  topic: string;
  rule: string;
  example: string | null;
  order: number;
}
