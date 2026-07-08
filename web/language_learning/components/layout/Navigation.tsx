import { BookOpen, GraduationCap, LayoutDashboard, Settings } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Lessons', href: ROUTES.LESSONS, icon: BookOpen },
  { label: 'Progress', href: '/progress', icon: GraduationCap },
  { label: 'Settings', href: '/settings', icon: Settings },
];
