import type { ExerciseType } from '../enums';
import type { QuestionDTO } from './question';
import type { DialogueDTO } from './dialogue';
import type { VocabularyDTO } from './vocabulary';
import type { GrammarDTO } from './grammar';
import type { PronunciationDTO } from './pronunciation';
import type { MediaDTO } from './media';

export interface TableDTO {
  id: number;
  title: string;
  html: string;
}

export interface ExerciseDTO {
  id: number;
  number: number;
  title: string;
  type: ExerciseType;
  instruction: string | null;
  order: number;
  questions: QuestionDTO[];
  dialogues: DialogueDTO[];
  vocabulary: VocabularyDTO[];
  grammar: GrammarDTO[];
  pronunciation: PronunciationDTO[];
  tables: TableDTO[];
  media: MediaDTO[];
}
