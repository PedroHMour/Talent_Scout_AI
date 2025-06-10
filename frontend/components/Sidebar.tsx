'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUI } from '../context/UIContext';
import { LayoutDashboard, Briefcase, Users, Settings, BotMessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useUI();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Candidates", href: "/candidates", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside
      className={`bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex-col shrink-0 hidden md:flex transition-all duration-300 ease-in-out
      ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className={`p-4 flex items-center border-b border-gray-200 dark:border-slate-800 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isSidebarCollapsed && <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">Talent Scout</h1>}
        <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
          {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    isSidebarCollapsed ? 'justify-center' : ''
                  } ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title={isSidebarCollapsed ? item.name : ''}
                >
                  <item.icon size={22} />
                  {!isSidebarCollapsed && <span className="font-semibold text-sm">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* User profile section remains the same */}
    </aside>
  );
}
