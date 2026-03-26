'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Gamepad2,
  Globe2,
  BarChart3,
  Settings,
  Layers,
  Rocket,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Дашборд', href: '/', icon: LayoutDashboard },
  { name: 'Игры', href: '/games', icon: Gamepad2 },
  { name: 'Платформы', href: '/platforms', icon: Globe2 },
  { name: 'Статистика', href: '/statistics', icon: BarChart3 },
  { name: 'Билды', href: '/builds', icon: Layers },
  { name: 'Деплой', href: '/deploy', icon: Rocket },
  { name: 'Настройки', href: '/settings', icon: Settings },
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">
              Game<span className="text-brand-600">Conveyor</span>
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive ? 'text-brand-600' : 'text-gray-400')} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            GameConveyor v0.1.0
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
