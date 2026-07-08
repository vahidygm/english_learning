import { Volume2 } from 'lucide-react';
import type { PronunciationDTO } from '@/types';
import { IPAViewer } from './IPAViewer';
import { PronunciationPlayer } from './PronunciationPlayer';

interface PronunciationCardProps {
  pronunciation: PronunciationDTO;
}

export function PronunciationCard({ pronunciation }: PronunciationCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/40">
          <Volume2 className="h-4 w-4 text-pink-700 dark:text-pink-400" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">
          {pronunciation.topic}
        </h3>
      </div>

      <p className="mb-3 text-sm text-foreground">{pronunciation.text}</p>

      <div className="flex items-center gap-3">
        <IPAViewer ipa={pronunciation.ipa} />
        <PronunciationPlayer
          audioId={pronunciation.audioId}
          text={pronunciation.text}
        />
      </div>
    </div>
  );
}
