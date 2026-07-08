"use client";

import { useCallback, useEffect, useRef } from "react";
import { Howl } from "howler";

import { usePlayerStore } from "@/stores/player.store";

export function useAudio() {
  const howlRef = useRef<Howl | null>(null);
  const {
    setIsPlaying,
    setCurrentTrackUrl,
    setDuration,
    setCurrentTime,
    reset,
  } = usePlayerStore();

  const destroyHowl = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.unload();
      howlRef.current = null;
    }
  }, []);

  const play = useCallback(
    (url: string) => {
      destroyHowl();

      const howl = new Howl({
        src: [url],
        html5: true,
        onplay: () => {
          setIsPlaying(true);
          setDuration(howl.duration());

          const updateTime = () => {
            if (howl.playing()) {
              setCurrentTime(howl.seek());
              requestAnimationFrame(updateTime);
            }
          };
          requestAnimationFrame(updateTime);
        },
        onpause: () => {
          setIsPlaying(false);
        },
        onstop: () => {
          setIsPlaying(false);
          setCurrentTime(0);
        },
        onend: () => {
          setIsPlaying(false);
          setCurrentTime(0);
        },
        onload: () => {
          setDuration(howl.duration());
        },
      });

      howlRef.current = howl;
      setCurrentTrackUrl(url);
      howl.play();
    },
    [destroyHowl, setIsPlaying, setCurrentTrackUrl, setDuration, setCurrentTime],
  );

  const pause = useCallback(() => {
    howlRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    howlRef.current?.stop();
  }, []);

  const toggle = useCallback(
    (url?: string) => {
      if (howlRef.current?.playing()) {
        pause();
      } else if (url) {
        play(url);
      } else {
        howlRef.current?.play();
        setIsPlaying(true);
      }
    },
    [pause, play, setIsPlaying],
  );

  useEffect(() => {
    return () => {
      destroyHowl();
      reset();
    };
  }, [destroyHowl, reset]);

  return { play, pause, stop, toggle };
}
