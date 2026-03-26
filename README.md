# 🎮 GameConveyor

Система управления игровыми проектами — отслеживание игр на игровых площадках, управление размещениями, сбор статистики и контроль монетизации.

## 🏗️ Архитектура

```
GameConveyor/               # Основной проект (этот репозиторий)
├── app/                    # Next.js App Router
│   ├── api/                # API endpoints
│   ├── games/              # Управление играми
│   ├── platforms/          # Управление площадками
│   ├── statistics/         # Аналитика
│   ├── builds/             # Сборки игр
│   ├── deploy/             # Деплой на площадки
│   └── settings/           # Настройки и API-ключи
├── components/             # React компоненты
├── lib/                    # Утилиты, Prisma клиент
├── prisma/                 # База данных (PostgreSQL)
│   └── schema.prisma       # Схема данных
└── docker-compose.yml      # Docker конфигурация

games/
├── my-game-1/              # Отдельный репозиторий для каждой игры
├── my-game-2/
└── ...
```

## 🎯 Возможности

- **Управление играми** — добавление, редактирование, отслеживание статуса разработки
- **Площадки** — Яндекс Игры, VK Play, CrazyGames, GameDistribution, Poki
- **Требования площадок** — чек-листы соответствия правилам каждой платформы
- **Размещения** — отслеживание статуса публикации на каждой площадке
- **Билды** — версионирование сборок для разных платформ
- **Статистика** — показы, клики, доход от рекламы
- **Монетизация** — конфигурация рекламы для каждой платформы (SDK-специфичная)

## 🛠️ Технологии

| Компонент | Технология |
|-----------|-----------|
| Frontend | Next.js 15 + React 19 + TypeScript |
| UI | Tailwind CSS |
| База данных | PostgreSQL 16 |
| ORM | Prisma |
| Деплой | Docker Compose |

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 20+
- Docker & Docker Compose
- npm

### Локальная разработка

```bash
# Клонировать репозиторий
git clone https://github.com/AndyVoronov/GameConveyor.git
cd GameConveyor

# Установить зависимости
npm install

# Запустить PostgreSQL через Docker
docker compose up -d db

# Сгенерировать Prisma клиент
npx prisma generate

# Применить схему к базе
npx prisma db push

# Загрузить начальные данные (площадки + требования)
npx tsx prisma/seed.ts

# Запустить dev-сервер
npm run dev
```

Открыть http://localhost:3000

### Полный запуск через Docker

```bash
# Собрать и запустить всё
docker compose up -d --build

# Посмотреть логи
docker compose logs -f app
```

## 📊 Поддерживаемые площадки

| Платформа | SDK | Статус |
|-----------|-----|--------|
| Яндекс Игры | YaGames SDK | ✅ |
| VK Play | VK Ads SDK | ✅ |
| CrazyGames | CrazyGames SDK | ✅ |
| GameDistribution | GD SDK | ✅ |
| Poki | Poki SDK | ✅ |

## 📁 Структура данных

- **Game** — игры (название, статус, тех. стек, жанр)
- **Platform** — площадки (Яндекс, VK, и т.д.)
- **GamePlatform** — размещение игры на площадке (статус, external ID, конфиг рекламы)
- **GameBuild** — билды игр (версия, размер, тип)
- **GameStat** — статистика (показы, клики, доход)
- **PlatformRequirement** — требования площадок (технические, юридические, монетизация)
- **ApiKey** — API-ключи для интеграций
- **AuditLog** — аудит всех изменений

## 🔧 Полезные команды

```bash
npm run dev          # Dev-сервер
npm run build        # Production билд
npm run db:studio    # Prisma Studio (GUI для БД)
npm run db:seed      # Загрузить начальные данные
npm run docker:up    # Запустить Docker
npm run docker:down  # Остановить Docker
```

## 📄 Лицензия

MIT
