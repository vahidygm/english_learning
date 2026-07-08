import type { BaseEntity } from "../common";

export interface MediaDTO extends BaseEntity {
  exerciseId: number;
  type: string;
  url: string;
  caption: string | null;
  order: number;
}
