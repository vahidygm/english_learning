'use client';

import { useState } from 'react';
import { ImageIcon, Volume2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import type { MediaDTO } from '@/types';

interface MediaGalleryProps {
  media: MediaDTO[];
}

function MediaImage({ item }: { item: MediaDTO }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-muted/50 border border-dashed border-muted-foreground/30 p-8 text-muted-foreground">
        <AlertCircle className="h-8 w-8 mb-2 opacity-50" />
        <span className="text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-xl"
    >
      <img
        src={item.url}
        alt={item.caption || 'Exercise image'}
        className={cn(
          'w-full h-auto rounded-xl object-cover transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </motion.div>
  );
}

export function MediaGallery({ media }: MediaGalleryProps) {
  if (!media || media.length === 0) return null;

  const sortedMedia = [...media].sort((a, b) => a.order - b.order);
  const images = sortedMedia.filter((m) => m.type === 'image');
  const audio = sortedMedia.filter((m) => m.type === 'audio');

  return (
    <div className="space-y-4">
      {/* Images */}
      {images.length > 0 && (
        <div
          className={cn(
            'gap-3',
            images.length === 1 ? 'flex flex-col' : 'grid grid-cols-2'
          )}
        >
          {images.map((item) => (
            <div key={item.id} className="flex flex-col gap-1.5">
              <MediaImage item={item} />
              {item.caption && (
                <p className="text-xs text-muted-foreground text-center px-2">
                  {item.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Audio */}
      {audio.length > 0 && (
        <div className="space-y-3">
          {audio.map((item) => (
            <div key={item.id} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3 rounded-xl bg-muted/40 border border-border/50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Volume2 className="h-5 w-5" />
                </div>
                <audio controls className="w-full h-8" preload="metadata">
                  <source src={item.url} />
                  Your browser does not support the audio element.
                </audio>
              </div>
              {item.caption && (
                <p className="text-xs text-muted-foreground text-center px-2">
                  {item.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
