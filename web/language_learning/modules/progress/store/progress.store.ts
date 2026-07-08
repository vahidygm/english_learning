import { create } from 'zustand';

interface ProgressState {
  streak: number;
  xp: number;
  completedLessons: number;
  totalLessons: number;
}

interface ProgressActions {
  updateProgress: (data: Partial<ProgressState>) => void;
}

type ProgressStore = ProgressState & ProgressActions;

export const useProgressStore = create<ProgressStore>((set) => ({
  streak: 0,
  xp: 0,
  completedLessons: 0,
  totalLessons: 0,

  updateProgress: (data) => set((state) => ({ ...state, ...data })),
}));
