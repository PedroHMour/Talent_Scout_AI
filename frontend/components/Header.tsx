'use client';

import { Menu, Search, Bell } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useUI } from '../context/UIContext'; // Importando o contexto UI

export default function Header({ pageTitle }: { pageTitle: string }) {
  const { toggleSidebar } = useUI();

  return (
    <header className="sticky top-0 z-10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-b border-gray-200 dark:border-slate-800 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
          <Menu size={22} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-100 dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <ThemeToggle />
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-700 dark:text-gray-400">
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
}