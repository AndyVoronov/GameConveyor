import prisma from '@/lib/prisma';
import Sidebar from '@/components/layout/Sidebar';
import PlatformsPage from './PlatformsPage';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const platforms = await prisma.platform.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { games: true },
      },
    },
  });

  return (
    <Sidebar>
      <PlatformsPage platforms={platforms} />
    </Sidebar>
  );
}
