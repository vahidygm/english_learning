export interface ExerciseAttemptState {
  exerciseId: number;
  answers: Record<number, string>;
  isSubmitting: boolean;
  isCompleted: boolean;
}

export interface ExerciseViewState {
  currentExerciseIndex: number;
  showAnswer: boolean;
}
