'use client';

import { useState, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VocabularyAudioProps {
  word: string;
  audioUrl?: string;
}

export function VocabularyAudio({ word, audioUrl }: VocabularyAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = useCallback(() => {
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

  if (!audioUrl) {
    return (
      <button
        type="button"
        disabled
        className={cn(
          'flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5',
          'text-xs text-muted-foreground opacity-50',
        )}
      >
        <VolumeX className="h-3.5 w-3.5" />
        <span>{word}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={cn(
        'flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5',
        'text-xs font-medium transition-colors hover:bg-muted',
        isPlaying && 'border-primary/30 bg-primary/5 text-primary',
      )}
    >
      {isLoading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Volume2 className="h-3.5 w-3.5" />
      )}
      <span>{word}</span>
    </button>
  );
}
