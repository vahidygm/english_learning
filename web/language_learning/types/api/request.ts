import type { PaginationParams, SortParams } from "../common";

export interface GetLessonsRequest extends PaginationParams, SortParams {
  search?: string;
}

export interface GetLessonRequest {
  lessonId: number;
  includeUnits?: boolean;
  includeObjectives?: boolean;
}

export interface GetUnitRequest {
  unitId: number;
  includeSections?: boolean;
}

export interface GetExercisesRequest extends PaginationParams {
  sectionId: number;
}

export interface SubmitAnswerRequest {
  exerciseId: number;
  questionId: number;
  answer: string;
}
