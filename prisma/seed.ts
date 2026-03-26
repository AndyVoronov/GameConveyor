import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const KNOWN_PLATFORMS = [
  {
    name: 'Яндекс Игры',
    slug: 'yandex-games',
    baseUrl: 'https://yandex.ru/games/',
    docsUrl: 'https://yandex.ru/dev/games/',
    adSdkType: 'yandex-ads-sdk',
    color: '#FC3F1D',
    description: 'Игровая платформа Яндекса — крупнейшая в России',
    authType: 'oauth2',
    requirements: [
      { category: 'technical', title: 'HTML5 / WebGL игра', description: 'Игра должна работать в браузере без плагинов', priority: 10 },
      { category: 'technical', title: 'Максимальный размер: 50MB', description: 'ZIP-архив игры не должен превышать 50МБ', priority: 9 },
      { category: 'technical', title: 'Адаптивный дизайн', description: 'Игра должна работать на мобильных и десктопах', priority: 8 },
      { category: 'content', title: 'Запрет на контент 18+', description: 'Запрещён откровенный контент, насилие, наркотики', priority: 10 },
      { category: 'legal', title: 'Соглашение с пользователем', description: 'Необходимо наличие пользовательского соглашения', priority: 7 },
      { category: 'monetization', title: 'Реклама только через YaGames SDK', description: 'Использовать только встроенный рекламный SDK Яндекса', priority: 10 },
      { category: 'performance', title: 'Загрузка до интерактива: < 3с', description: 'Игра должна загружаться быстро на мобильных устройствах', priority: 8 },
    ],
  },
  {
    name: 'VK Play',
    slug: 'vk-play',
    baseUrl: 'https://vk.com/play',
    docsUrl: 'https://dev.vk.com/mini-apps/overview',
    adSdkType: 'vk-ads',
    color: '#0077FF',
    description: 'Игровая платформа ВКонтакте',
    authType: 'oauth2',
    requirements: [
      { category: 'technical', title: 'Поддержка VK Mini Apps API', description: 'Интеграция с VK Bridge для работы на платформе', priority: 10 },
      { category: 'technical', title: 'HTTPS только', description: 'Все ресурсы должны загружаться по HTTPS', priority: 9 },
      { category: 'content', title: 'Соответствие правилам VK', description: 'Контент должен соответствовать правилам сообщества VK', priority: 10 },
      { category: 'monetization', title: 'VK Ads SDK', description: 'Монетизация через рекламный SDK VK', priority: 10 },
    ],
  },
  {
    name: 'CrazyGames',
    slug: 'crazygames',
    baseUrl: 'https://www.crazygames.com/',
    docsUrl: 'https://docs.crazygames.com/',
    adSdkType: 'crazygames-sdk',
    color: '#FF6B00',
    description: 'Международная HTML5 игровая платформа',
    authType: 'api-key',
    requirements: [
      { category: 'technical', title: 'HTML5 без плагинов', description: 'Чистый HTML5 без требований Flash, Unity Player и т.д.', priority: 10 },
      { category: 'technical', title: 'Максимальный размер: 100MB', description: 'Большие игры обрабатываются индивидуально', priority: 8 },
      { category: 'technical', title: 'CrazyGames SDK обязателен', description: 'Интегрировать CrazyGames SDK для рекламы и аналитики', priority: 10 },
      { category: 'content', title: 'Отсутствие брендов-конкурентов', description: 'Не содержать ссылки на другие игровые платформы', priority: 9 },
      { category: 'legal', title: 'Права на контент', description: 'Все ассеты должны принадлежать разработчику или быть лицензированы', priority: 10 },
    ],
  },
  {
    name: 'GameDistribution',
    slug: 'game-distribution',
    baseUrl: 'https://gamedistribution.com/',
    docsUrl: 'https://developers.gamedistribution.com/',
    adSdkType: 'gd-sdk',
    color: '#4CAF50',
    description: 'Платформа для дистрибуции HTML5 игр',
    authType: 'api-key',
    requirements: [
      { category: 'technical', title: 'GD SDK интеграция', description: 'Обязательная интеграция GameDistribution SDK', priority: 10 },
      { category: 'technical', title: 'HTML5 формат', description: 'Игра в формате HTML5, работающая в современных браузерах', priority: 10 },
    ],
  },
  {
    name: 'Poki',
    slug: 'poki',
    baseUrl: 'https://poki.com/',
    docsUrl: 'https://developers.poki.com/',
    adSdkType: 'poki-sdk',
    color: '#E5323D',
    description: 'Крупнейший портал браузерных игр',
    authType: 'none',
    requirements: [
      { category: 'technical', title: 'Poki SDK', description: 'Интегрировать Poki SDK для аналитики и рекламы', priority: 10 },
      { category: 'performance', title: 'Быстрая загрузка', description: 'Оптимизированная загрузка для хорошего UX', priority: 9 },
      { category: 'content', title: 'Уникальность', description: 'Игра должна быть уникальной, не клон существующей', priority: 9 },
    ],
  },
];

async function main() {
  console.log('🌱 Seeding database...\n');

  for (const platform of KNOWN_PLATFORMS) {
    const { requirements, ...platformData } = platform;

    // Upsert platform
    const created = await prisma.platform.upsert({
      where: { slug: platformData.slug },
      update: platformData,
      create: platformData,
    });

    // Upsert requirements
    for (const req of requirements) {
      await prisma.platformRequirement.upsert({
        where: {
          platformId_title: {
            platformId: created.id,
            title: req.title,
          },
        },
        update: req,
        create: {
          platformId: created.id,
          ...req,
        },
      });
    }

    console.log(`  ✅ ${created.name} (${requirements.length} требований)`);
  }

  // ── Seed Games ──
  console.log('\n🎮 Seeding games...');

  const games = [
    {
      title: 'LuminaClash',
      slug: 'luminaclash',
      description: 'Territory control game. Move your light orb across a grid — cells you illuminate become yours. Place walls, grab power-ups, outmaneuver AI opponents, and control the most territory before time runs out.',
      shortDesc: 'Real-time territory capture with light & shadow mechanics',
      techStack: 'Phaser 3 + TypeScript + Vite',
      genre: 'Arcade / Strategy',
      targetAudience: 'casual',
      repoUrl: 'https://github.com/AndyVoronov/LuminaClash',
      status: 'READY_TO_PUBLISH' as const,
      priority: 10,
      platforms: [
        { platformSlug: 'yandex-games', status: 'NOT_STARTED' as const },
        { platformSlug: 'vk-play', status: 'NOT_STARTED' as const },
        { platformSlug: 'crazygames', status: 'NOT_STARTED' as const },
        { platformSlug: 'poki', status: 'NOT_STARTED' as const },
        { platformSlug: 'game-distribution', status: 'NOT_STARTED' as const },
      ],
      builds: [
        { version: '1.0.0', buildType: 'production', buildNotes: 'Full release: 7 milestones complete — core gameplay, advanced mechanics, campaign (15 levels), audio & juice, mobile & platforms, polish & launch' },
      ],
    },
    {
      title: 'JunkTowers',
      slug: 'junktowers',
      description: 'Tower Defense в сеттинге Warhammer 40K. Орк-мекбой ловит падающие обломки космического корабля и строит из них башни. 5 типов обломков → 5 типов башен, волновая система, WAAAGH!-метр.',
      shortDesc: 'Ork tower defense — catch debris, build towers, WAAAGH!',
      techStack: 'Phaser 3 + TypeScript + Vite',
      genre: 'Tower Defense / Arcade',
      targetAudience: 'casual',
      repoUrl: 'https://github.com/AndyVoronov/JunkTowers',
      status: 'IN_DEVELOPMENT' as const,
      priority: 9,
      platforms: [
        { platformSlug: 'yandex-games', status: 'NOT_STARTED' as const },
        { platformSlug: 'vk-play', status: 'NOT_STARTED' as const },
        { platformSlug: 'crazygames', status: 'NOT_STARTED' as const },
        { platformSlug: 'poki', status: 'NOT_STARTED' as const },
        { platformSlug: 'game-distribution', status: 'NOT_STARTED' as const },
      ],
      builds: [
        { version: '0.1.0', buildType: 'development', buildNotes: 'M1 core: ork player, falling debris (5 types), build slots, towers, enemies, WAAAGH! meter, wave system, HUD, game over' },
      ],
    },
  ];

  for (const game of games) {
    const created = await prisma.game.upsert({
      where: { slug: game.slug },
      update: {
        title: game.title,
        description: game.description,
        shortDesc: game.shortDesc,
        techStack: game.techStack,
        genre: game.genre,
        targetAudience: game.targetAudience,
        repoUrl: game.repoUrl,
        status: game.status,
        priority: game.priority,
      },
      create: {
        title: game.title,
        slug: game.slug,
        description: game.description,
        shortDesc: game.shortDesc,
        techStack: game.techStack,
        genre: game.genre,
        targetAudience: game.targetAudience,
        repoUrl: game.repoUrl,
        status: game.status,
        priority: game.priority,
      },
    });

    // Link platforms
    for (const pl of game.platforms) {
      const platform = await prisma.platform.findUnique({ where: { slug: pl.platformSlug } });
      if (platform) {
        await prisma.gamePlatform.upsert({
          where: {
            gameId_platformId: {
              gameId: created.id,
              platformId: platform.id,
            },
          },
          update: { status: pl.status },
          create: {
            gameId: created.id,
            platformId: platform.id,
            status: pl.status,
          },
        });
      }
    }

    // Add build
    for (const b of game.builds) {
      await prisma.gameBuild.upsert({
        where: {
          gameId_version: {
            gameId: created.id,
            version: b.version,
          },
        },
        update: { buildNotes: b.buildNotes, buildType: b.buildType },
        create: {
          gameId: created.id,
          version: b.version,
          buildType: b.buildType,
          buildNotes: b.buildNotes,
        },
      });
    }

    console.log(`  ✅ ${created.title} (${game.platforms.length} площадок, status: ${game.status})`);
  }

  console.log('\n✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
