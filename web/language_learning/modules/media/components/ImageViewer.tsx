'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageViewerProps {
  src: string;
  alt?: string;
  caption?: string;
}

export function ImageViewer({ src, alt = '', caption }: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = useCallback(() => setIsOpen(true), []);
  const closeLightbox = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <figure className="group overflow-hidden rounded-xl border bg-card">
        <button
          type="button"
          onClick={openLightbox}
          className="relative block w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image
            src={src}
            alt={alt || caption || ''}
            width={600}
            height={400}
            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        {caption && (
          <figcaption className="px-4 py-2.5 text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={alt || caption || 'Image lightbox'}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className={cn(
              'absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full',
              'bg-background/80 text-foreground transition-colors hover:bg-background',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            )}
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt || caption || ''}
              width={1200}
              height={800}
              className="h-auto max-h-[90vh] w-auto rounded-lg object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
