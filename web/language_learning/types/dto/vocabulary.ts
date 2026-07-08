import type { BaseEntity } from "../common";

export interface VocabularyDTO extends BaseEntity {
  exerciseId: number;
  category: string | null;
  word: string;
  meaning: string;
  example: string | null;
  order: number;
}
