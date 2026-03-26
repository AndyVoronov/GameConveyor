'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Globe2 } from 'lucide-react';
import { GAME_STATUS_CONFIG } from '@/lib/constants';
import type { GameStatus } from '@prisma/client';

interface Platform {
  id: string;
  name: string;
  slug: string;
  color: string | null;
}

export default function NewGamePage({ platforms }: { platforms: Platform[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [techStack, setTechStack] = useState('');
  const [genre, setGenre] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [status, setStatus] = useState<GameStatus>('DRAFT');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Название обязательно');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          shortDesc: shortDesc.trim() || null,
          techStack: techStack.trim() || null,
          genre: genre.trim() || null,
          repoUrl: repoUrl.trim() || null,
          status,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Ошибка создания');
      }

      const game = await res.json();
      router.push(`/games/${game.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const genres = [
    'Puzzle', 'Arcade', 'Strategy', 'RPG', 'Shooter',
    'Racing', 'Sports', 'Board', 'Card', 'Idle',
    'Simulation', 'Adventure', 'Action', 'Casual', 'Other'
  ];

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push('/games')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Новая игра</h1>
          <p className="text-gray-500 mt-1">Добавьте игру в систему для отслеживания</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Основная информация</h2>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Название *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Game"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              required
            />
          </div>

          <div>
            <label htmlFor="shortDesc" className="block text-sm font-medium text-gray-700 mb-1">
              Краткое описание
            </label>
            <input
              id="shortDesc"
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Одна строка о чём игра"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Полное описание
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Подробное описание игры..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                Жанр
              </label>
              <select
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              >
                <option value="">Выбрать жанр</option>
                {genres.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Статус
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as GameStatus)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              >
                {Object.entries(GAME_STATUS_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Техническая информация</h2>

          <div>
            <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 mb-1">
              Технологии
            </label>
            <input
              id="techStack"
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="HTML5/Canvas, Phaser.js, Unity WebGL..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          <div>
            <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700 mb-1">
              GitHub репозиторий
            </label>
            <input
              id="repoUrl"
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/AndyVoronov/my-game"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push('/games')}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Создание...' : 'Создать игру'}
          </button>
        </div>
      </form>
    </div>
  );
}
