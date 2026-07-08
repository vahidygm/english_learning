import type { BaseEntity } from "../common";
import type { DialogueDTO } from "./dialogue";
import type { GrammarDTO } from "./grammar";
import type { MediaDTO } from "./media";
import type { PronunciationDTO } from "./pronunciation";
import type { QuestionDTO } from "./question";
import type { VocabularyDTO } from "./vocabulary";

export interface ExerciseDTO extends BaseEntity {
  sectionId: number;
  number: string;
  title: string;
  type: string;
  instruction?: string;
  order: number;
  questions?: QuestionDTO[];
  dialogues?: DialogueDTO[];
  vocabulary?: VocabularyDTO[];
  grammar?: GrammarDTO[];
  pronunciation?: PronunciationDTO[];
  media?: MediaDTO[];
}
