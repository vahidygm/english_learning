'use client';

import { Menu, X } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { useUIStore } from '@/stores/ui-store';

export function Header() {
  const sidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      <button
        onClick={toggleSidebar}
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:hidden"
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      <h1 className="text-lg font-semibold tracking-tight">{APP_NAME}</h1>
    </header>
  );
}
