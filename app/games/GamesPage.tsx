'use client';

import Link from 'next/link';
import { Plus, Search, Gamepad2, Globe2, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { GAME_STATUS_CONFIG, PLACEMENT_STATUS_CONFIG } from '@/lib/constants';
import type { GameStatus } from '@prisma/client';

interface Game {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  techStack: string | null;
  genre: string | null;
  status: GameStatus;
  platforms: {
    id: string;
    status: string;
    platform: {
      name: string;
      color: string | null;
    };
  }[];
  updatedAt: Date;
}

export default function GamesPage({ games }: { games: Game[] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const filteredGames = games.filter((game) => {
    const matchesSearch = !search ||
      game.title.toLowerCase().includes(search.toLowerCase()) ||
      (game.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesStatus = !statusFilter || game.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Игры</h1>
          <p className="text-gray-500 mt-1">{games.length} игр в системе</p>
        </div>
        <Link
          href="/games/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить игру
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск игр..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          >
            <option value="">Все статусы</option>
            {Object.entries(GAME_STATUS_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Gamepad2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Игр пока нет</h3>
          <p className="text-gray-500 mb-4">Добавьте первую игру для отслеживания</p>
          <Link
            href="/games/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Создать игру
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map((game) => {
            const statusConfig = GAME_STATUS_CONFIG[game.status];
            const publishedPlatforms = game.platforms.filter(
              (p) => p.status === 'PUBLISHED'
            ).length;

            return (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:border-brand-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{game.title}</h3>
                    {game.genre && (
                      <p className="text-sm text-gray-500">{game.genre}</p>
                    )}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>

                {game.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {game.description}
                  </p>
                )}

                {game.techStack && (
                  <p className="text-xs text-gray-400 mb-3">{game.techStack}</p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Globe2 className="w-4 h-4" />
                    <span>{game.platforms.length} площадок</span>
                    {publishedPlatforms > 0 && (
                      <span className="text-green-600">
                        ({publishedPlatforms} опубл.)
                      </span>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
