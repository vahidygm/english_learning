import { create } from "zustand";

import type { AudioPlayerState } from "@/types/audio";

interface PlayerActions {
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTrackUrl: (url: string | null) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (currentTime: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  reset: () => void;
}

type PlayerStore = AudioPlayerState & PlayerActions;

const initialState: AudioPlayerState = {
  isPlaying: false,
  currentTrackUrl: null,
  duration: 0,
  currentTime: 0,
  volume: 1,
  isMuted: false,
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  ...initialState,

  setIsPlaying: (isPlaying) => set({ isPlaying }),

  setCurrentTrackUrl: (currentTrackUrl) => set({ currentTrackUrl }),

  setDuration: (duration) => set({ duration }),

  setCurrentTime: (currentTime) => set({ currentTime }),

  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  reset: () => set(initialState),
}));
