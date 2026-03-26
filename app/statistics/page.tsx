import Sidebar from '@/components/layout/Sidebar';
import { BarChart3 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Sidebar>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">Статистика</h1>
        <p className="text-gray-500 mt-1">Аналитика по играм и площадкам</p>
        <div className="bg-white rounded-xl border border-gray-200 p-12 mt-8 text-center">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Модуль статистики
          </h3>
          <p className="text-gray-500">
            После размещения первых игр здесь появится аналитика:
            показы, клики, доход от рекламы, retention и другие метрики.
          </p>
        </div>
      </div>
    </Sidebar>
  );
}
