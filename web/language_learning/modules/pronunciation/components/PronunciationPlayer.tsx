'use client';

import { useState, useRef, useCallback } from 'react';
import { Play, Pause, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PronunciationPlayerProps {
  audioId?: number;
  text: string;
}

export function PronunciationPlayer({
  audioId,
  text,
}: PronunciationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioUrl = audioId ? `/api/audio/${audioId}` : undefined;

  const handleToggle = useCallback(() => {
    if (!audioUrl) return;

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => {
      setIsLoading(false);
      setIsPlaying(true);
      audio.play();
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    audio.addEventListener('error', () => {
      setIsLoading(false);
      setIsPlaying(false);
    });

    audio.load();
  }, [audioUrl, isPlaying]);

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={!audioUrl}
      title={audioUrl ? `Play "${text}"` : 'No audio available'}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full border border-border',
        'text-muted-foreground transition-colors',
        audioUrl
          ? 'hover:border-primary/30 hover:bg-primary/5 hover:text-primary'
          : 'cursor-not-allowed opacity-50',
        isPlaying && 'border-primary/30 bg-primary/5 text-primary',
      )}
    >
      {isLoading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : isPlaying ? (
        <Pause className="h-3.5 w-3.5" />
      ) : (
        <Play className="h-3.5 w-3.5 pl-0.5" />
      )}
    </button>
  );
}
