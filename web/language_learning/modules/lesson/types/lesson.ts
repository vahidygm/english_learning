import type { Unit } from "@/types/dto/unit";

/**
 * Main lesson entity.
 *
 * Mirrors backend:
 * ParsedLesson / models.Lesson
 */
export interface Lesson {
  id: string;

  number: number;

  title: string;

  description?: string;

  coverImage?: string;

  units: Unit[];

  objectives: LessonObjective[];

  createdAt?: string;

  updatedAt?: string;
}


/**
 * Learning objectives extracted from textbook metadata.
 *
 * Example:
 *
 * Grammar:
 *   Present simple
 *
 * Vocabulary:
 *   Greetings
 */
export interface LessonObjective {
  id?: string;

  unitCode?: string;

  skill?: string;

  grammar?: string;

  vocabulary?: string;

  pronunciation?: string;

  writing?: string;
}


/**
 * Lightweight lesson card model.
 *
 * Used in:
 * - dashboard
 * - lesson list
 * - search results
 */
export interface LessonSummary {
  id: string;

  number: number;

  title: string;

  coverImage?: string;

  unitCount: number;

  completedUnits: number;

  progress: number;
}


/**
 * User lesson progress.
 */
export interface LessonProgress {
  lessonId: string;

  completedUnits: number;

  totalUnits: number;

  completedExercises: number;

  totalExercises: number;

  percentage: number;

  lastVisitedAt?: string;
}


/**
 * API response for lesson list.
 */
export interface LessonListResponse {
  items: LessonSummary[];

  total: number;

  page: number;

  pageSize: number;
}


/**
 * API response for single lesson.
 */
export interface LessonResponse {
  data: Lesson;
}