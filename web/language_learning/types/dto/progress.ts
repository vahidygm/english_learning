export interface LessonProgressDTO {
  lessonId: number;
  completedUnits: number;
  totalUnits: number;
  completedExercises: number;
  totalExercises: number;
  percentage: number;
}

export interface ExerciseProgressDTO {
  exerciseId: number;
  completed: boolean;
  score: number | null;
  attempts: number;
  lastAttemptAt: string | null;
}
