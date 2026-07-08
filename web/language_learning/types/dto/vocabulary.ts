export interface VocabularyDTO {
  id: number;
  category: string | null;
  word: string;
  meaning: string;
  example: string | null;
  order: number;
}
