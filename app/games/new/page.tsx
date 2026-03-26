import Sidebar from '@/components/layout/Sidebar';
import NewGamePage from './NewGamePage';

export const dynamic = 'force-dynamic';

// Platforms will be fetched client-side
export default function Page() {
  return (
    <Sidebar>
      <NewGamePage platforms={[]} />
    </Sidebar>
  );
}
