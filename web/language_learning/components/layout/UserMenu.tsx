'use client';

import { useState, useRef, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { cn } from '@/lib/utils';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = user?.name ?? 'User';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-full p-1 transition-colors',
          'hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full',
            'bg-primary text-xs font-medium text-primary-foreground'
          )}
        >
          {initials}
        </div>
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full z-50 mt-2 w-56 rounded-md border',
            'bg-popover p-1 shadow-md'
          )}
        >
          <div className="px-3 py-2 border-b mb-1">
            <p className="text-sm font-medium">{displayName}</p>
            {user?.email && (
              <p className="text-xs text-muted-foreground">{user.email}</p>
            )}
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className={cn(
              'flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm',
              'text-destructive hover:bg-destructive/10 transition-colors'
            )}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
