'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Beralih ke tema terang' : 'Beralih ke tema gelap'}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:border-gold hover:bg-gold/5 hover:text-gold-600 dark:border-slate-700 dark:bg-black dark:text-neutral-300 dark:hover:border-gold/50 dark:hover:bg-neutral-900 dark:hover:text-gold"
    >
      <span className="sr-only">Toggle tema</span>
      <Sun className="h-4 w-4 transition-all dark:hidden dark:scale-0" />
      <Moon className="absolute h-4 w-4 transition-all hidden dark:block dark:scale-100" />
    </button>
  );
}
