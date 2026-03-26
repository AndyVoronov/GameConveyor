import { Gamepad2, Globe2, Rocket, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { GAME_STATUS_CONFIG, PLACEMENT_STATUS_CONFIG } from '@/lib/constants';

interface DashboardPageProps {
  gamesCount: number;
  platformsCount: number;
  publishedCount: number;
  totalRevenue: number;
  recentGames: any[];
  recentPlacements: any[];
}

export default function DashboardPage({
  gamesCount,
  platformsCount,
  publishedCount,
  totalRevenue,
  recentGames,
  recentPlacements,
}: DashboardPageProps) {
  const stats = [
    {
      name: 'Всего игр',
      value: gamesCount,
      icon: Gamepad2,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
    },
    {
      name: 'Активные площадки',
      value: platformsCount,
      icon: Globe2,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
    },
    {
      name: 'Опубликовано',
      value: publishedCount,
      icon: Rocket,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
    },
    {
      name: 'Доход (всего)',
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
        <p className="text-gray-500 mt-1">Обзор игровых проектов и площадок</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.lightColor} p-3 rounded-xl`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Games */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-gray-400" />
              Последние игры
            </h2>
            <a href="/games" className="text-sm text-brand-600 hover:text-brand-700">
              Все →
            </a>
          </div>
          <div className="divide-y divide-gray-100">
            {recentGames.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400">
                <p>Игр пока нет</p>
                <a href="/games/new" className="text-sm text-brand-600 hover:text-brand-700 mt-1 block">
                  Создать первую игру
                </a>
              </div>
            ) : (
              recentGames.map((game: any) => {
                const statusConfig = GAME_STATUS_CONFIG[game.status as keyof typeof GAME_STATUS_CONFIG];
                return (
                  <div key={game.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{game.title}</p>
                      <p className="text-sm text-gray-500">{game.techStack || '—'}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Placements */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              Последние размещения
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentPlacements.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400">
                <p>Размещений пока нет</p>
              </div>
            ) : (
              recentPlacements.map((placement: any) => {
                const statusConfig = PLACEMENT_STATUS_CONFIG[placement.status as keyof typeof PLACEMENT_STATUS_CONFIG];
                return (
                  <div key={placement.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{placement.game.title}</p>
                      <p className="text-sm text-gray-500">
                        {placement.platform.name}
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Быстрые действия</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="/games/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            <Gamepad2 className="w-4 h-4" />
            Добавить игру
          </a>
          <a
            href="/platforms"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Globe2 className="w-4 h-4" />
            Управление площадками
          </a>
        </div>
      </div>
    </div>
  );
}
