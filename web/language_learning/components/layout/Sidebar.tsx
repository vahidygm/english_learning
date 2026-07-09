'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  BookOpen,
  RotateCcw,
  User,
  Settings,
  X,
  Sun,
  Moon,
  GraduationCap,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/ui-store';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/lessons', label: 'Lessons', icon: BookOpen },
  { href: '/review', label: 'Review', icon: RotateCcw },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
];

function SidebarContent() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-sm">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-sidebar-foreground">
          LangLearn
        </span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="ml-auto rounded-md p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-sidebar-primary/10 text-sidebar-primary'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-y-1 left-0 w-[3px] rounded-full bg-sidebar-primary"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon
                className={cn(
                  'h-[18px] w-[18px] shrink-0 transition-colors',
                  isActive
                    ? 'text-sidebar-primary'
                    : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70'
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section — Theme toggle */}
      <div className="border-t border-sidebar-border px-3 py-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          {theme === 'dark' ? (
            <Sun className="h-[18px] w-[18px] shrink-0" />
          ) : (
            <Moon className="h-[18px] w-[18px] shrink-0" />
          )}
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:block',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r border-sidebar-border shadow-xl lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
