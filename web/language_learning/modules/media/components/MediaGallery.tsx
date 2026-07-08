'use client';

import type { MediaDTO } from '@/types';
import { MediaType } from '@/types';
import { AudioPlayer } from './AudioPlayer';
import { ImageViewer } from './ImageViewer';

interface MediaGalleryProps {
  items: MediaDTO[];
}

export function MediaGallery({ items }: MediaGalleryProps) {
  if (items.length === 0) return null;

  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {sortedItems.map((item) => {
        switch (item.type) {
          case MediaType.Audio:
            return (
              <AudioPlayer
                key={item.id}
                src={item.url}
                caption={item.caption}
              />
            );

          case MediaType.Image:
            return (
              <ImageViewer
                key={item.id}
                src={item.url}
                caption={item.caption}
              />
            );

          case MediaType.Video:
            return (
              <div key={item.id} className="overflow-hidden rounded-xl border bg-card">
                <video
                  src={item.url}
                  controls
                  className="h-auto w-full"
                  preload="metadata"
                >
                  <track kind="captions" />
                  Your browser does not support the video element.
                </video>
                {item.caption && (
                  <p className="px-4 py-2.5 text-sm text-muted-foreground">
                    {item.caption}
                  </p>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
