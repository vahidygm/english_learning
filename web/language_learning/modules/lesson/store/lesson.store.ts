import { create } from 'zustand';

interface LessonFilterState {
  search: string;
  page: number;
  limit: number;
}

interface LessonViewState {
  viewMode: 'grid' | 'list';
  selectedLessonId: number | null;
}

interface LessonStoreActions {
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setViewMode: (viewMode: 'grid' | 'list') => void;
  setSelectedLesson: (id: number | null) => void;
  resetFilters: () => void;
}

type LessonStore = LessonFilterState & LessonViewState & LessonStoreActions;

const initialFilterState: LessonFilterState = {
  search: '',
  page: 1,
  limit: 12,
};

const initialViewState: LessonViewState = {
  viewMode: 'grid',
  selectedLessonId: null,
};

export const useLessonStore = create<LessonStore>((set) => ({
  ...initialFilterState,
  ...initialViewState,

  setSearch: (search: string) => set({ search, page: 1 }),
  setPage: (page: number) => set({ page }),
  setViewMode: (viewMode: 'grid' | 'list') => set({ viewMode }),
  setSelectedLesson: (id: number | null) => set({ selectedLessonId: id }),
  resetFilters: () => set({ ...initialFilterState }),
}));
