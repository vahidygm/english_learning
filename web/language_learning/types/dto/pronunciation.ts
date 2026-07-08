export interface PronunciationDTO {
  id: number;
  topic: string;
  text: string;
  ipa: string | null;
  audioId: number | null;
  order: number;
}
