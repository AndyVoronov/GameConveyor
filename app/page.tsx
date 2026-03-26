import prisma from '@/lib/prisma';
import Sidebar from '@/components/layout/Sidebar';
import DashboardPage from './DashboardPage';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const [
    gamesCount,
    platformsCount,
    publishedCount,
    totalRevenue,
    recentGames,
    recentPlacements,
  ] = await Promise.all([
    prisma.game.count(),
    prisma.platform.count({ where: { isActive: true } }),
    prisma.gamePlatform.count({ where: { status: 'PUBLISHED' } }),
    prisma.gameStat.aggregate({
      _sum: { adRevenue: true },
    }),
    prisma.game.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        platforms: {
          include: { platform: true },
        },
      },
    }),
    prisma.gamePlatform.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: { game: true, platform: true },
    }),
  ]);

  return (
    <Sidebar>
      <DashboardPage
        gamesCount={gamesCount}
        platformsCount={platformsCount}
        publishedCount={publishedCount}
        totalRevenue={totalRevenue._sum.adRevenue ?? 0}
        recentGames={recentGames}
        recentPlacements={recentPlacements}
      />
    </Sidebar>
  );
}
