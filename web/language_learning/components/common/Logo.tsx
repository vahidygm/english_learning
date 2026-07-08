import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const sizeConfig = {
  sm: { icon: 'h-5 w-5', text: 'text-base' },
  md: { icon: 'h-6 w-6', text: 'text-lg' },
  lg: { icon: 'h-8 w-8', text: 'text-xl' },
} as const;

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <div className="flex items-center gap-2">
      <BookOpen className={cn(config.icon, 'text-primary')} />
      {showText && (
        <span className={cn(config.text, 'font-semibold tracking-tight')}>
          English Learning
        </span>
      )}
    </div>
  );
}
