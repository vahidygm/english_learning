export interface AudioPlayerState {
  isPlaying: boolean;
  currentTrackUrl: string | null;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
}
