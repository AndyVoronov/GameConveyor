import Sidebar from '@/components/layout/Sidebar';
import { Rocket } from 'lucide-react';

export default function Page() {
  return (
    <Sidebar>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">Деплой</h1>
        <p className="text-gray-500 mt-1">Развертывание на серверы площадок</p>
        <div className="bg-white rounded-xl border border-gray-200 p-12 mt-8 text-center">
          <Rocket className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Модуль деплоя</h3>
          <p className="text-gray-500">
            Автоматизированная публикация билдов на игровые площадки. Интеграция с API Яндекса, VK и других платформ.
          </p>
        </div>
      </div>
    </Sidebar>
  );
}
