'use client';

import { usePathname } from 'next/navigation';
import { Menu, ChevronRight } from 'lucide-react';
import { useUIStore } from '@/stores/ui-store';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/lessons': 'Lessons',
  '/review': 'Review',
  '/profile': 'Profile',
  '/settings': 'Settings',
};

function getPageTitle(pathname: string): { section: string; sub?: string } {
  // Direct match
  if (pageTitles[pathname]) {
    return { section: pageTitles[pathname] };
  }

  // Nested route — find parent
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length >= 1) {
    const parentPath = '/' + segments[0];
    const section = pageTitles[parentPath] || segments[0];
    const sub = segments.length > 1 ? segments.slice(1).join(' / ') : undefined;
    return { section, sub };
  }

  return { section: 'Home' };
}

export function Header() {
  const pathname = usePathname();
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const { section, sub } = getPageTitle(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card/80 px-4 backdrop-blur-sm sm:px-6">
      {/* Menu toggle */}
      <button
        onClick={toggleSidebar}
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Breadcrumb / Page title */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-foreground">{section}</span>
        {sub && (
          <>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{sub}</span>
          </>
        )}
      </div>

      {/* Right side — placeholder for streak/XP */}
      <div className="ml-auto flex items-center gap-3">
        {/* Streak / XP placeholder */}
        {/* <div className="flex items-center gap-1.5 text-sm font-medium text-warning">
          <Flame className="h-4 w-4" />
          <span>7</span>
        </div> */}
      </div>
    </header>
  );
}
