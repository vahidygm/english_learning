import type { MediaType } from '../enums';

export interface MediaDTO {
  id: number;
  type: MediaType;
  url: string;
  caption: string | null;
  order: number;
}
