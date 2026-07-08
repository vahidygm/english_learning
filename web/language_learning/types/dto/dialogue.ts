import type { BaseEntity } from "../common";

export interface DialogueLineDTO extends BaseEntity {
  dialogueId: number;
  speaker: string;
  text: string;
  order: number;
}

export interface DialogueDTO extends BaseEntity {
  exerciseId: number;
  title: string;
  lines?: DialogueLineDTO[];
}
