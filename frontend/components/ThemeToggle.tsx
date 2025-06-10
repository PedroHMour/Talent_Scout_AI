'use client';

import { Moon, Sun } from 'lucide-react';
import { useUI } from '../context/UIContext'; // Usaremos nosso novo Context

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUI();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-400 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
