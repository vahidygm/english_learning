'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/stores/ui-store';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}
