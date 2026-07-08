import type { ExerciseDTO } from './exercise';

export interface SectionDTO {
  id: number;
  name: string;
  order: number;
  exercises: ExerciseDTO[];
}
