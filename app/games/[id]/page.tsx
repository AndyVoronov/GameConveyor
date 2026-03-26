import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import GameDetailPage from './GameDetailPage';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const game = await prisma.game.findUnique({
    where: { id },
    include: {
      platforms: {
        include: { platform: true },
        orderBy: { updatedAt: 'desc' },
      },
      builds: {
        orderBy: { builtAt: 'desc' },
        take: 10,
      },
    },
  });

  if (!game) {
    notFound();
  }

  const allPlatforms = await prisma.platform.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  });

  return (
    <Sidebar>
      <GameDetailPage game={game} allPlatforms={allPlatforms} />
    </Sidebar>
  );
}
