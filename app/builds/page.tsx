import Sidebar from '@/components/layout/Sidebar';
import { Layers } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Sidebar>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">Билды</h1>
        <p className="text-gray-500 mt-1">Управление сборками игр</p>
        <div className="bg-white rounded-xl border border-gray-200 p-12 mt-8 text-center">
          <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Модуль билдов</h3>
          <p className="text-gray-500">
            Здесь будут отображаться все сборки игр с возможностью загрузки, версионирования и деплоя на площадки.
          </p>
        </div>
      </div>
    </Sidebar>
  );
}
