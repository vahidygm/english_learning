export interface LessonFilterState {
  search: string;
  page: number;
  limit: number;
}

export interface LessonViewState {
  viewMode: "grid" | "list";
  selectedLessonId: number | null;
}
