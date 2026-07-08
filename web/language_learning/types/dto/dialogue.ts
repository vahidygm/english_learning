export interface DialogueLineDTO {
  id: number;
  speaker: string;
  text: string;
  order: number;
}

export interface DialogueDTO {
  id: number;
  title: string;
  lines: DialogueLineDTO[];
}
