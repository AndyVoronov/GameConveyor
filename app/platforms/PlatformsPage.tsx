'use client';

import { Globe2, ExternalLink, Settings, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Platform {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
  baseUrl: string | null;
  docsUrl: string | null;
  adSdkType: string | null;
  isActive: boolean;
  description: string | null;
  _count: {
    games: number;
  };
}

export default function PlatformsPage({ platforms }: { platforms: Platform[] }) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Платформы</h1>
        <p className="text-gray-500 mt-1">
          Управление игровыми площадками и их требованиями
        </p>
      </div>

      {platforms.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Globe2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Площадок пока нет
          </h3>
          <p className="text-gray-500 mb-4">
            Добавьте первую площадку для отслеживания
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <Link
              key={platform.id}
              href={`/platforms/${platform.id}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-brand-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                  style={{ backgroundColor: platform.color || '#6B7280' }}
                >
                  {platform.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                  {platform.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {platform.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-gray-400">
                      {platform._count.games} игр
                    </span>
                    {platform.adSdkType && (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        💰 {platform.adSdkType}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                {platform.docsUrl && (
                  <a
                    href={platform.docsUrl}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    Документация
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
