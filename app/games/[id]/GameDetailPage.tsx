'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Edit2,
  Globe2,
  ExternalLink,
  Plus,
  Clock,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { GAME_STATUS_CONFIG, PLACEMENT_STATUS_CONFIG } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import type { GameStatus, PlacementStatus } from '@prisma/client';

interface Platform {
  id: string;
  name: string;
  slug: string;
  color: string | null;
}

interface GamePlatform {
  id: string;
  platformId: string;
  status: PlacementStatus;
  externalId: string | null;
  externalUrl: string | null;
  adEnabled: boolean;
  complianceChecked: boolean;
  submittedAt: Date | string | null;
  publishedAt: Date | string | null;
  platform: Platform;
}

interface GameBuild {
  id: string;
  version: string;
  buildType: string;
  fileSize: number | null;
  status: string;
  builtAt: Date | string;
  platformId: string | null;
}

interface Game {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  shortDesc: string | null;
  techStack: string | null;
  genre: string | null;
  repoUrl: string | null;
  status: GameStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  platforms: GamePlatform[];
  builds: GameBuild[];
}

export default function GameDetailPage({
  game,
  allPlatforms,
}: {
  game: Game;
  allPlatforms: Platform[];
}) {
  const router = useRouter();
  const statusConfig = GAME_STATUS_CONFIG[game.status];

  const unpublishedPlatforms = allPlatforms.filter(
    (p) => !game.platforms.some((gp) => gp.platformId === p.id)
  );

  const publishedCount = game.platforms.filter(
    (gp) => gp.status === 'PUBLISHED'
  ).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push('/games')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{game.title}</h1>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-1">
            {game.genre && <span className="text-sm text-gray-500">{game.genre}</span>}
            {game.techStack && <span className="text-sm text-gray-400">• {game.techStack}</span>}
            {game.repoUrl && (
              <a
                href={game.repoUrl}
                target="_blank"
                className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {game.description && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <p className="text-gray-700">{game.description}</p>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Globe2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Площадок</p>
              <p className="text-xl font-bold text-gray-900">
                {game.platforms.length}
                {publishedCount > 0 && (
                  <span className="text-sm font-normal text-green-600 ml-1">
                    ({publishedCount} опубл.)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Билдов</p>
              <p className="text-xl font-bold text-gray-900">{game.builds.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Обновлено</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(game.updatedAt).toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Placements */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-gray-400" />
            Размещения на площадках
          </h2>
          {unpublishedPlatforms.length > 0 && (
            <AddPlatformDropdown
              gameId={game.id}
              platforms={unpublishedPlatforms}
            />
          )}
        </div>

        {game.platforms.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-400">
            <p>Игра ещё не размещена ни на одной площадке</p>
            {unpublishedPlatforms.length > 0 && (
              <p className="text-sm mt-1">
                Нажмите &quot;Добавить площадку&quot; чтобы начать
              </p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {game.platforms.map((gp: GamePlatform) => {
              const placementStatus = PLACEMENT_STATUS_CONFIG[gp.status];
              return (
                <div key={gp.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: gp.platform.color || '#6B7280' }}
                    >
                      {gp.platform.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{gp.platform.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-gray-500">
                          ID: {gp.externalId || '—'}
                        </span>
                        {gp.adEnabled && (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            💰 Реклама
                          </span>
                        )}
                        {gp.complianceChecked && (
                          <span className="text-xs text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Соответствует
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${placementStatus.bgColor} ${placementStatus.color}`}>
                      {placementStatus.label}
                    </span>
                    {gp.externalUrl && (
                      <a
                        href={gp.externalUrl}
                        target="_blank"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Builds */}
      {game.builds.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-400" />
              Последние билды
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {game.builds.map((build: GameBuild) => (
              <div key={build.id} className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-medium text-gray-900">
                    v{build.version}
                  </span>
                  <span className="text-xs text-gray-400">{build.buildType}</span>
                  {build.fileSize && (
                    <span className="text-xs text-gray-400">
                      {(build.fileSize / 1024 / 1024).toFixed(1)} MB
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(build.builtAt).toLocaleDateString('ru-RU')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Add Platform dropdown
function AddPlatformDropdown({
  gameId,
  platforms,
}: {
  gameId: string;
  platforms: Platform[];
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (platformId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/game-platforms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, platformId }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch {}
    setLoading(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" />
        Добавить площадку
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => handleAdd(p.id)}
              disabled={loading}
              className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
            >
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: p.color || '#6B7280' }}
              />
              {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
