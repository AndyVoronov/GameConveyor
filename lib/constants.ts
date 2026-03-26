// Status configs for consistent display
import { GameStatus, PlacementStatus } from '@prisma/client';

export const GAME_STATUS_CONFIG: Record<GameStatus, { label: string; color: string; bgColor: string }> = {
  [GameStatus.DRAFT]: { label: 'Черновик', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  [GameStatus.IN_DEVELOPMENT]: { label: 'Разработка', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  [GameStatus.TESTING]: { label: 'Тестирование', color: 'text-amber-700', bgColor: 'bg-amber-100' },
  [GameStatus.READY_TO_PUBLISH]: { label: 'Готово к публикации', color: 'text-emerald-700', bgColor: 'bg-emerald-100' },
  [GameStatus.PUBLISHED]: { label: 'Опубликована', color: 'text-green-700', bgColor: 'bg-green-100' },
  [GameStatus.ARCHIVED]: { label: 'Архив', color: 'text-stone-600', bgColor: 'bg-stone-100' },
};

export const PLACEMENT_STATUS_CONFIG: Record<PlacementStatus, { label: string; color: string; bgColor: string }> = {
  [PlacementStatus.NOT_STARTED]: { label: 'Не начато', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  [PlacementStatus.IN_PREPARATION]: { label: 'Подготовка', color: 'text-indigo-700', bgColor: 'bg-indigo-100' },
  [PlacementStatus.PENDING_REVIEW]: { label: 'На модерации', color: 'text-amber-700', bgColor: 'bg-amber-100' },
  [PlacementStatus.REJECTED]: { label: 'Отклонено', color: 'text-red-700', bgColor: 'bg-red-100' },
  [PlacementStatus.PUBLISHED]: { label: 'Опубликовано', color: 'text-green-700', bgColor: 'bg-green-100' },
  [PlacementStatus.SUSPENDED]: { label: 'Приостановлено', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  [PlacementStatus.DELISTED]: { label: 'Удалено', color: 'text-stone-600', bgColor: 'bg-stone-100' },
};

// Known platforms for quick reference
export const KNOWN_PLATFORMS = [
  {
    name: 'Яндекс Игры',
    slug: 'yandex-games',
    baseUrl: 'https://yandex.ru/games/',
    docsUrl: 'https://yandex.ru/dev/games/',
    adSdkType: 'yandex-ads-sdk',
    color: '#FC3F1D',
    description: 'Игровая платформа Яндекса — крупнейшая в России',
  },
  {
    name: 'VK Play',
    slug: 'vk-play',
    baseUrl: 'https://vk.com/play',
    docsUrl: 'https://dev.vk.com/mini-apps/overview',
    adSdkType: 'vk-ads',
    color: '#0077FF',
    description: 'Игровая платформа ВКонтакте',
  },
  {
    name: 'CrazyGames',
    slug: 'crazygames',
    baseUrl: 'https://www.crazygames.com/',
    docsUrl: 'https://docs.crazygames.com/',
    adSdkType: 'crazygames-sdk',
    color: '#FF6B00',
    description: 'Международная HTML5 игровая платформа',
  },
  {
    name: 'GameDistribution',
    slug: 'game-distribution',
    baseUrl: 'https://gamedistribution.com/',
    docsUrl: 'https://developers.gamedistribution.com/',
    adSdkType: 'gd-sdk',
    color: '#4CAF50',
    description: 'Платформа для дистрибуции HTML5 игр',
  },
  {
    name: 'Poki',
    slug: 'poki',
    baseUrl: 'https://poki.com/',
    docsUrl: 'https://developers.poki.com/',
    adSdkType: 'poki-sdk',
    color: '#E5323D',
    description: 'Крупнейший портал браузерных игр',
  },
] as const;

// Platform requirement categories
export const REQUIREMENT_CATEGORIES = {
  technical: { label: 'Технические', icon: '⚙️' },
  content: { label: 'Контент', icon: '📝' },
  legal: { label: 'Юридические', icon: '⚖️' },
  monetization: { label: 'Монетизация', icon: '💰' },
  performance: { label: 'Производительность', icon: '⚡' },
} as const;
