import prisma from '@/lib/prisma';
import Sidebar from '@/components/layout/Sidebar';
import GamesPage from './GamesPage';

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const where: any = {};

  if (params.status) {
    where.status = params.status;
  }
  if (params.q) {
    where.OR = [
      { title: { contains: params.q, mode: 'insensitive' } },
      { description: { contains: params.q, mode: 'insensitive' } },
    ];
  }

  const games = await prisma.game.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    include: {
      platforms: {
        include: { platform: true },
      },
    },
  });

  return (
    <Sidebar>
      <GamesPage games={games} />
    </Sidebar>
  );
}
