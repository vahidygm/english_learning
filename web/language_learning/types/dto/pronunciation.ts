import type { BaseEntity } from "../common";

export interface PronunciationDTO extends BaseEntity {
  exerciseId: number;
  topic: string;
  text: string;
  ipa: string | null;
  audioId: number | null;
  order: number;
}
