'use client';

import { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div
        className={cn(
          'flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
        )}
      >
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
