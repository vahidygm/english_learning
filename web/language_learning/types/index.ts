// Common
export type {
  BaseEntity,
  PaginatedResponse,
  PaginationParams,
  SortParams,
  Timestamps,
  WithId,
} from "./common";

// Enums
export { ExerciseType, MediaType, SectionName } from "./enums";

// DTOs
export type { DialogueDTO, DialogueLineDTO } from "./dto/dialogue";
export type { ExerciseDTO } from "./dto/exercise";
export type { GrammarDTO } from "./dto/grammar";
export type { LessonDTO, LessonSummaryDTO } from "./dto/lesson";
export type { MediaDTO } from "./dto/media";
export type { ObjectiveDTO } from "./dto/objective";
export type {
  ExerciseProgressDTO,
  LessonProgressDTO,
} from "./dto/progress";
export type { PronunciationDTO } from "./dto/pronunciation";
export type { QuestionDTO } from "./dto/question";
export type { SectionDTO } from "./dto/section";
export type { UnitDTO } from "./dto/unit";
export type { VocabularyDTO } from "./dto/vocabulary";

// API
export { ApiError } from "./api/error";
export type {
  GetExercisesRequest,
  GetLessonRequest,
  GetLessonsRequest,
  GetUnitRequest,
  SubmitAnswerRequest,
} from "./api/request";
export type {
  ApiErrorResponse,
  ApiListResponse,
  ApiResponse,
} from "./api/response";

// UI
export type { ExerciseAttemptState, ExerciseViewState } from "./ui/exercise";
export type { LessonFilterState, LessonViewState } from "./ui/lesson";
export type { AudioPlayerState } from "./ui/player";
export type { ProgressViewState } from "./ui/progress";
