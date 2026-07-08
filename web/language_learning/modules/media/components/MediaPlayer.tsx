'use client';

import Image from 'next/image';
import type { MediaDTO } from '@/types';

interface MediaPlayerProps {
  media: MediaDTO;
}

export function MediaPlayer({ media }: MediaPlayerProps) {
  const renderMedia = () => {
    switch (media.type.toLowerCase()) {
      case 'image':
        return (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={media.url}
              alt={media.caption ?? 'Media image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        );

      case 'audio':
        return (
          <div className="rounded-lg bg-muted p-4">
            <audio controls className="w-full" preload="metadata">
              <source src={media.url} />
              Your browser does not support the audio element.
            </audio>
          </div>
        );

      case 'video':
        return (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <video
              controls
              className="h-full w-full"
              preload="metadata"
            >
              <source src={media.url} />
              Your browser does not support the video element.
            </video>
          </div>
        );

      default:
        return (
          <div className="rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
            Unsupported media type: {media.type}
          </div>
        );
    }
  };

  return (
    <div>
      {renderMedia()}
      {media.caption && (
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {media.caption}
        </p>
      )}
    </div>
  );
}
